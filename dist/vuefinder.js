import { inject as at, reactive as ft, watch as de, ref as M, shallowRef as on, computed as H, markRaw as zn, defineComponent as Z, onMounted as _e, nextTick as Ve, createElementBlock as p, openBlock as u, withKeys as nt, unref as s, createElementVNode as o, createCommentVNode as T, withModifiers as ce, renderSlot as Ce, toDisplayString as y, createBlock as z, resolveDynamicComponent as sn, withCtx as ne, createVNode as V, Fragment as fe, renderList as ge, withDirectives as me, vModelText as ot, onUnmounted as Pe, useTemplateRef as je, createTextVNode as le, resolveComponent as an, normalizeClass as J, vModelCheckbox as Pt, customRef as Rn, Teleport as _t, normalizeStyle as Ue, isRef as Nn, vModelSelect as St, onBeforeUnmount as rn, vModelRadio as $t, mergeProps as Be, toHandlers as Ke, vShow as Ne, normalizeProps as qe, guardReactiveProps as We, onUpdated as Un, mergeModels as Hn, useModel as ln, Transition as jn, provide as Kn } from "vue";
import qn from "mitt";
import { toast as re, Toaster as Wn } from "vue-sonner";
import { persistentAtom as Gn } from "@nanostores/persistent";
import { atom as De, computed as He } from "nanostores";
import { useStore as G } from "@nanostores/vue";
import { QueryClient as Yn } from "@tanstack/vue-query";
import Qn from "@uppy/core";
import { Cropper as Xn } from "vue-advanced-cropper";
import dn from "vanilla-lazyload";
import { OverlayScrollbars as pt } from "overlayscrollbars";
import { computePosition as rt, offset as lt, flip as dt, shift as ct, autoUpdate as cn } from "@floating-ui/dom";
import Jn from "@viselect/vanilla";
import Zn from "@uppy/xhr-upload";
const Et = /* @__PURE__ */ new Map(), Ct = Symbol("ServiceContainerId");
function eo(i, e) {
  Et.set(i, e);
}
function to(i) {
  Et.delete(i);
}
function ee(i) {
  const e = at(Ct);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = Et.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function no(i) {
  const e = localStorage.getItem(i + "_storage"), t = ft(JSON.parse(e ?? "{}"));
  de(t, n);
  function n() {
    Object.keys(t).length ? localStorage.setItem(i + "_storage", JSON.stringify(t)) : localStorage.removeItem(i + "_storage");
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
function Ee(i, e = "An error occurred") {
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
async function oo(i, e) {
  const t = e[i];
  return typeof t == "function" ? (await t()).default : t;
}
function so(i, e, t, n) {
  const { getStore: a, setStore: d } = i, l = M({}), r = M(a("locale", e)), c = (h, v = e) => {
    oo(h, n).then(($) => {
      l.value = $, d("locale", h), r.value = h, d("translations", $), Object.values(n).length > 1 && (re.success("The language is set to " + h), t.emit("vf-language-saved"));
    }).catch(($) => {
      if (v)
        re.error("The selected locale is not yet supported!"), c(v, null);
      else {
        const F = Ee($, "Locale cannot be loaded!");
        re.error(F);
      }
    });
  };
  de(r, (h) => {
    c(h);
  }), !a("locale") && !Object.keys(n).length ? c(e) : l.value = a("translations");
  const _ = (h, ...v) => v.length ? _(h = h.replace("%s", String(v.shift())), ...v) : h;
  function g(h, ...v) {
    return l.value && Object.prototype.hasOwnProperty.call(l.value, h) ? _(l.value[h] || h, ...v) : _(h, ...v);
  }
  return ft({ t: g, locale: r });
}
const io = [
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
], un = {
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
  advanced: io.reduce((i, e) => (i[e] = !0, i), {})
};
function Kt() {
  return un.advanced;
}
function vn(i) {
  return i ? i === "simple" || i === "advanced" ? { ...un[i] } : { ...Kt(), ...i } : Kt();
}
const ao = "4.0.11";
function Mt(i, e, t, n, a) {
  return e = Math, t = e.log, n = 1024, a = t(i) / t(n) | 0, (i / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function fn(i, e, t, n, a) {
  return e = Math, t = e.log, n = 1e3, a = t(i) / t(n) | 0, (i / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function ro(i) {
  if (typeof i == "number") return i;
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(i);
  if (!n) return 0;
  const a = parseFloat(n[1] || "0"), d = (n[2] || "").toLowerCase(), l = e[d] ?? 0;
  return Math.round(a * Math.pow(1024, l));
}
function lo() {
  const i = on(null), e = M(!1), t = M(), n = M(!1);
  return { visible: e, type: i, data: t, open: (r, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, i.value = r, t.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, i.value = null;
  }, setEditMode: (r) => {
    n.value = r;
  }, editMode: n };
}
const ut = {
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
}, vt = {
  initialPath: null,
  maxFileSize: null,
  loadingIndicator: "circular"
}, co = new Set(
  Object.keys(vt)
);
function uo(i) {
  return i || "silver";
}
function _n(i) {
  return co.has(i);
}
function qt(i) {
  const e = {}, t = {}, n = i;
  for (const a in n)
    if (_n(a))
      t[a] = n[a];
    else if (a in ut) {
      const d = a;
      e[d] = n[a];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function Wt(i, e) {
  const t = { ...ut, ...i, ...e };
  return t.theme = uo(t.theme), t;
}
function Gt(i, e) {
  return { ...vt, ...e, ...i };
}
const vo = (i, e = {}) => {
  const t = `vuefinder_config_${i}`, { persistenceConfig: n, nonPersistenceConfig: a } = qt(e), d = Wt(
    n,
    ut
  ), l = Gt(
    a,
    vt
  ), r = Gn(
    t,
    d,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = De(l), _ = He(
    [r, c],
    (w, m) => ({
      ...w,
      ...m
    })
  ), g = (w = {}) => {
    const m = r.get(), f = c.get(), { persistenceConfig: b, nonPersistenceConfig: S } = qt(w), x = Wt(b, m), I = Gt(
      S,
      f
    );
    r.set(x), c.set(I);
  }, h = (w) => _n(w) ? c.get()[w] : r.get()[w], v = () => ({
    ...r.get(),
    ...c.get()
  }), $ = (w, m) => {
    const f = r.get();
    typeof w == "object" && w !== null ? r.set({ ...f, ...w }) : r.set({
      ...f,
      [w]: m
    });
  };
  return {
    // Store atom (combined)
    state: _,
    // Methods
    init: g,
    get: h,
    set: $,
    toggle: (w) => {
      const m = r.get();
      $(w, !m[w]);
    },
    all: v,
    reset: () => {
      r.set({ ...ut }), c.set({ ...vt });
    }
  };
};
function fo(i, e) {
  if (typeof i == "string" && typeof e == "string")
    return i.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(i) || 0, n = Number(e) || 0;
  return t === n ? 0 : t < n ? -1 : 1;
}
const _o = () => {
  const i = De(""), e = De([]), t = De(!1), n = De([]), a = De({ active: !1, column: "", order: "" }), d = De({
    kind: "all",
    showHidden: !1
  }), l = De(/* @__PURE__ */ new Set()), r = De({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = De(null), _ = De(0), g = De(!1), h = De([]), v = De(-1), $ = He([i], (O) => {
    const L = (O ?? "").trim(), q = L.indexOf("://"), W = q >= 0 ? L.slice(0, q) : "", Me = (q >= 0 ? L.slice(q + 3) : L).split("/").filter(Boolean);
    let Te = "";
    const kt = Me.map((Ae) => (Te = Te ? `${Te}/${Ae}` : Ae, {
      basename: Ae,
      name: Ae,
      path: W ? `${W}://${Te}` : Te,
      type: "dir"
    }));
    return { storage: W, breadcrumb: kt, path: L };
  }), F = He([n, a, d], (O, L, q) => {
    let W = O;
    q.kind === "files" ? W = W.filter((Ae) => Ae.type === "file") : q.kind === "folders" && (W = W.filter((Ae) => Ae.type === "dir")), q.showHidden || (W = W.filter((Ae) => !Ae.basename.startsWith(".")));
    const { active: be, column: Me, order: Te } = L;
    if (!be || !Me) return W;
    const kt = Te === "asc" ? 1 : -1;
    return W.slice().sort((Ae, Ln) => fo(Ae[Me], Ln[Me]) * kt);
  }), D = He([n, l], (O, L) => L.size === 0 ? [] : O.filter((q) => L.has(q.path))), w = (O, L) => {
    const q = i.get();
    if ((L ?? !0) && q !== O) {
      const W = h.get(), be = v.get();
      be < W.length - 1 && W.splice(be + 1), W.length === 0 && q && W.push(q), W.push(O), h.set([...W]), v.set(W.length - 1);
    }
    i.set(O);
  }, m = (O) => {
    n.set(O ?? []);
  }, f = (O) => {
    e.set(O ?? []);
  }, b = (O, L) => {
    a.set({ active: !0, column: O, order: L });
  }, S = (O) => {
    const L = a.get();
    L.active && L.column === O ? a.set({
      active: L.order === "asc",
      column: O,
      order: "desc"
    }) : a.set({
      active: !0,
      column: O,
      order: "asc"
    });
  }, x = () => {
    a.set({ active: !1, column: "", order: "" });
  }, I = (O, L) => {
    d.set({ kind: O, showHidden: L });
  }, B = () => {
    d.set({ kind: "all", showHidden: !1 });
  }, Q = (O, L = "multiple") => {
    const q = new Set(l.get());
    L === "single" && q.clear(), q.add(O), l.set(q);
  }, j = (O, L = "multiple") => {
    const q = new Set(l.get());
    L === "single" && q.clear(), O.forEach((W) => q.add(W)), l.set(q);
  }, oe = (O) => {
    const L = new Set(l.get());
    L.delete(O), l.set(L);
  }, ie = (O) => l.get().has(O), he = (O, L = "multiple") => {
    const q = new Set(l.get());
    q.has(O) ? q.delete(O) : (L === "single" && q.clear(), q.add(O)), l.set(q);
  }, A = (O = "multiple", L) => {
    if (O === "single") {
      const q = n.get()[0];
      if (q) {
        const W = q.path;
        l.set(/* @__PURE__ */ new Set([W])), _.set(1);
      }
    } else {
      if (L?.selectionFilterType || L?.selectionFilterMimeIncludes && L.selectionFilterMimeIncludes.length > 0) {
        const q = n.get().filter((W) => {
          const be = L.selectionFilterType, Me = L.selectionFilterMimeIncludes;
          return be === "files" && W.type === "dir" || be === "dirs" && W.type === "file" ? !1 : Me && Array.isArray(Me) && Me.length > 0 && W.type !== "dir" ? W.mime_type ? Me.some((Te) => W.mime_type?.startsWith(Te)) : !1 : !0;
        }).map((W) => W.path);
        l.set(new Set(q));
      } else {
        const q = new Set(n.get().map((W) => W.path));
        l.set(q);
      }
      N(l.get().size);
    }
  }, Y = () => {
    l.set(/* @__PURE__ */ new Set()), _.set(0);
  }, K = (O) => {
    const L = new Set(O ?? []);
    l.set(L), _.set(L.size);
  }, N = (O) => {
    _.set(O);
  }, C = (O) => {
    g.set(!!O);
  }, k = () => g.get(), P = (O, L) => {
    const q = n.get().filter((W) => L.has(W.path));
    r.set({
      type: O,
      path: $.get().path,
      items: new Set(q)
    });
  }, E = (O) => He([r], (L) => L.type === "cut" && Array.from(L.items).some((q) => q.path === O)), U = (O) => He([r], (L) => L.type === "copy" && Array.from(L.items).some((q) => q.path === O)), X = (O) => {
    const L = E(O);
    return G(L).value ?? !1;
  }, we = (O) => {
    const L = U(O);
    return G(L).value ?? !1;
  }, ke = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, Re = () => r.get(), ue = (O) => {
    c.set(O);
  }, ve = () => c.get(), pe = () => {
    c.set(null);
  }, ye = () => {
    const O = h.get(), L = v.get();
    if (L > 0) {
      const q = L - 1, W = O[q];
      W && (v.set(q), w(W, !1));
    }
  }, Qe = () => {
    const O = h.get(), L = v.get();
    if (L < O.length - 1) {
      const q = L + 1, W = O[q];
      W && (v.set(q), w(W, !1));
    }
  }, it = He([v], (O) => O > 0), R = He(
    [h, v],
    (O, L) => L < O.length - 1
  );
  return {
    // Atoms (state)
    files: n,
    storages: e,
    currentPath: i,
    sort: a,
    filter: d,
    selectedKeys: l,
    selectedCount: _,
    loading: g,
    draggedItem: c,
    clipboardItems: r,
    // Computed values
    path: $,
    sortedFiles: F,
    selectedItems: D,
    // Actions
    setPath: w,
    setFiles: m,
    setStorages: f,
    setSort: b,
    toggleSort: S,
    clearSort: x,
    setFilter: I,
    clearFilter: B,
    select: Q,
    selectMultiple: j,
    deselect: oe,
    toggleSelect: he,
    selectAll: A,
    isSelected: ie,
    clearSelection: Y,
    setSelection: K,
    setSelectedCount: N,
    setLoading: C,
    isLoading: k,
    setClipboard: P,
    createIsCut: E,
    createIsCopied: U,
    isCut: X,
    isCopied: we,
    clearClipboard: ke,
    getClipboard: Re,
    setDraggedItem: ue,
    getDraggedItem: ve,
    clearDraggedItem: pe,
    setReadOnly: (O) => {
      t.set(O);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (O) => t.get() ? !0 : O.read_only ?? !1,
    // Navigation
    goBack: ye,
    goForward: Qe,
    canGoBack: it,
    canGoForward: R,
    navigationHistory: h,
    historyIndex: v
  };
};
class Tt {
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
class ef extends Tt {
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
        const g = l.path + "/", h = this.files.filter(
          (v) => v.storage === this.storage && v.path.startsWith(g)
        );
        for (const v of h) {
          const $ = v.path.slice(g.length), F = $.includes("/") ? $.slice(0, $.lastIndexOf("/")) : "", D = F ? this.join(_.path, F) : _.path;
          if (v.type === "dir")
            d(v, D);
          else {
            const w = this.uniqueName(D, v.basename, n), m = this.makeFileEntry(
              D,
              w,
              v.file_size || 0,
              v.mime_type
            );
            a.push(m), n.add(m.path);
            const f = this.contentStore.get(v.path);
            f !== void 0 && this.contentStore.set(m.path, f);
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
            const $ = g + v.path.slice(c.length);
            return this.cloneEntry(v, {
              path: $,
              dir: this.parent($),
              basename: v.path === c ? _ : v.basename
            });
          }
          return v;
        });
        for (const [v, $] of Array.from(this.contentStore.entries()))
          if (v === c || v.startsWith(c + "/")) {
            this.contentStore.delete(v);
            const F = g + v.slice(c.length);
            this.contentStore.set(F, $);
          }
      } else {
        const c = this.uniqueName(r, l.basename, n), _ = this.join(r, c);
        a = a.map(
          (h) => h === l ? this.cloneEntry(h, {
            path: _,
            dir: r,
            basename: c,
            extension: this.getExtension(c),
            last_modified: Date.now()
          }) : h
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
function Yt(i, e, t) {
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
      const d = a.errors.map((l) => l.message).filter((l) => !!l);
      if (d.length > 0)
        return d.join(", ");
    }
    return a.detail ? a.detail : a.title ? a.title : i;
  } catch {
    return i || n;
  }
}
class pn extends Tt {
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
      ...pn.DEFAULT_URLS,
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
    delete n["Content-Type"], e.use(Zn, {
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
class tf extends Tt {
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
          const _ = r + c.path.slice(l.length), g = this.parent(_), h = this.cloneEntry(c, {
            path: _,
            dir: g,
            basename: c.path === l ? e.name : c.basename,
            last_modified: Date.now()
          });
          await this.upsert(h);
          const $ = (await this.getDB()).transaction(["content"], "readwrite"), F = $.objectStore("content"), D = F.get(c.path);
          D.onsuccess = () => {
            const w = D.result;
            w && (F.delete(c.path), F.put({ path: _, content: w.content }));
          }, await new Promise((w) => {
            $.oncomplete = () => w(void 0);
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
        const g = l.path + "/", h = n.filter(
          (v) => v.storage === this.storage && v.path.startsWith(g)
        );
        for (const v of h) {
          const $ = v.path.slice(g.length), F = $.includes("/") ? $.slice(0, $.lastIndexOf("/")) : "", D = F ? this.join(_.path, F) : _.path;
          if (v.type === "dir")
            await d(v, D);
          else {
            const w = await this.uniqueName(D, v.basename, a), m = this.makeFileEntry(
              D,
              w,
              v.file_size || 0,
              v.mime_type
            );
            a.add(m.path), await this.upsert(m);
            const b = (await this.getDB()).transaction(["content"], "readwrite"), S = b.objectStore("content"), x = S.get(v.path);
            x.onsuccess = () => {
              const I = x.result;
              I && S.put({ path: m.path, content: I.content });
            }, await new Promise((I) => {
              b.oncomplete = () => I(void 0);
            });
          }
        }
      } else {
        const c = await this.uniqueName(r, l.basename, a), _ = this.makeFileEntry(r, c, l.file_size || 0, l.mime_type);
        a.add(_.path), await this.upsert(_);
        const h = (await this.getDB()).transaction(["content"], "readwrite"), v = h.objectStore("content"), $ = v.get(l.path);
        $.onsuccess = () => {
          const F = $.result;
          F && v.put({ path: _.path, content: F.content });
        }, await new Promise((F) => {
          h.oncomplete = () => F(void 0);
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
        const c = l.path, _ = await this.uniqueName(r, l.basename, a), g = this.join(r, _), h = n.filter(
          (v) => v.storage === this.storage && (v.path === c || v.path.startsWith(c + "/"))
        );
        for (const v of h) {
          const $ = g + v.path.slice(c.length), F = this.parent($), D = this.cloneEntry(v, {
            path: $,
            dir: F,
            basename: v.path === c ? _ : v.basename,
            last_modified: Date.now()
          });
          await this.upsert(D);
          const m = (await this.getDB()).transaction(["content"], "readwrite"), f = m.objectStore("content"), b = f.get(v.path);
          b.onsuccess = () => {
            const S = b.result;
            S && (f.delete(v.path), f.put({ path: $, content: S.content }));
          }, await new Promise((S) => {
            m.oncomplete = () => S(void 0);
          }), v.path !== $ && await this.removeExact(v.path);
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
        const v = (await this.getDB()).transaction(["content"], "readwrite"), $ = v.objectStore("content"), F = $.get(l.path);
        F.onsuccess = () => {
          const D = F.result;
          D && ($.delete(l.path), $.put({ path: _, content: D.content }));
        }, await new Promise((D) => {
          v.oncomplete = () => D(void 0);
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
            const h = new Uint8Array(g);
            let v = "";
            for (let F = 0; F < h.length; F++) v += String.fromCharCode(h[F]);
            const $ = btoa(v);
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
          const g = await r.arrayBuffer(), v = (await this.getDB()).transaction(["content"], "readwrite");
          v.objectStore("content").put({ path: _.path, content: g }), await new Promise((F) => {
            v.oncomplete = () => F(void 0);
          });
        } catch {
          const h = (await this.getDB()).transaction(["content"], "readwrite");
          h.objectStore("content").put({ path: _.path, content: "" }), await new Promise(($) => {
            h.oncomplete = () => $(void 0);
          });
        }
      else {
        const h = (await this.getDB()).transaction(["content"], "readwrite");
        h.objectStore("content").put({ path: _.path, content: "" }), await new Promise(($) => {
          h.oncomplete = () => $(void 0);
        });
      }
    });
  }
}
const Qt = {
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
class po {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new Yn({
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
function ho(i) {
  const e = G(i.state);
  return {
    current: H(() => e.value.theme || "silver"),
    set: (a) => {
      i.set("theme", a);
    }
  };
}
const mo = (i, e) => {
  const t = no(i.id ?? "vf"), n = qn(), a = e.i18n, d = i.locale ?? e.locale, l = vo(i.id ?? "vf", i.config ?? {}), r = _o();
  if (!i.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new po(i.driver);
  return ft({
    // app version
    version: ao,
    // config store
    config: l,
    // Theme
    theme: (() => {
      const _ = ho(l);
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
    i18n: so(
      t,
      d,
      n,
      a
    ),
    // modal state
    modal: lo(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: zn(c),
    // active features
    features: vn(i.features),
    // selection mode
    selectionMode: i.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: H(() => i.selectionFilterType || "both"),
    selectionFilterMimeIncludes: H(() => i.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: l.get("metricUnits") ? fn : Mt,
    // possible items of the context menu
    contextMenuItems: i.contextMenuItems,
    // expose custom uploader if provided
    customUploader: i.customUploader
  });
}, go = ["data-theme"], wo = { class: "vuefinder__modal-layout__container" }, yo = { class: "vuefinder__modal-layout__content" }, bo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, ko = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, $o = { class: "vuefinder__modal-drag-message" }, Ie = /* @__PURE__ */ Z({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(i) {
    const e = M(null), t = ee();
    t.config;
    const n = i;
    _e(() => {
      const d = document.querySelector(".v-f-modal input");
      d && d.focus(), Ve(() => {
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
    return (d, l) => (u(), p("div", {
      "data-theme": s(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: l[1] || (l[1] = nt((r) => s(t).modal.close(), ["esc"]))
    }, [
      l[2] || (l[2] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", wo, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: a,
          onMousedown: l[0] || (l[0] = ce((r) => s(t).modal.close(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            o("div", yo, [
              Ce(d.$slots, "default")
            ]),
            d.$slots.buttons ? (u(), p("div", bo, [
              Ce(d.$slots, "buttons")
            ])) : T("", !0)
          ], 512)
        ], 32)
      ]),
      n.showDragOverlay ? (u(), p("div", ko, [
        o("div", $o, y(n.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : T("", !0)
    ], 40, go));
  }
}), xo = { class: "vuefinder__modal-header" }, So = { class: "vuefinder__modal-header__icon-container" }, Co = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Oe = /* @__PURE__ */ Z({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(i) {
    return (e, t) => (u(), p("div", xo, [
      o("div", So, [
        (u(), z(sn(i.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("div", Co, y(i.title), 1)
    ]));
  }
}), Fo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Do(i, e) {
  return u(), p("svg", Fo, [...e[0] || (e[0] = [
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
const hn = { render: Do }, Po = { class: "vuefinder__about-modal__content" }, Eo = { class: "vuefinder__about-modal__main" }, Mo = { class: "vuefinder__about-modal__tab-content" }, To = { class: "vuefinder__about-modal__lead" }, Io = { class: "vuefinder__about-modal__description" }, Ao = { class: "vuefinder__about-modal__links" }, Oo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Bo = { class: "vuefinder__about-modal__meta" }, Vo = { class: "vuefinder__about-modal__meta-item" }, Lo = { class: "vuefinder__about-modal__meta-label" }, zo = { class: "vuefinder__about-modal__meta-value" }, Ro = { class: "vuefinder__about-modal__meta-item" }, No = { class: "vuefinder__about-modal__meta-label" }, mn = /* @__PURE__ */ Z({
  __name: "ModalAbout",
  setup(i) {
    const e = ee(), { t } = e.i18n;
    return (n, a) => (u(), z(Ie, null, {
      buttons: ne(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: a[0] || (a[0] = (d) => s(e).modal.close())
        }, y(s(t)("Close")), 1)
      ]),
      default: ne(() => [
        o("div", Po, [
          V(Oe, {
            icon: s(hn),
            title: "Vuefinder " + s(e).version
          }, null, 8, ["icon", "title"]),
          o("div", Eo, [
            o("div", Mo, [
              o("div", To, y(s(t)("A modern, customizable file manager component built for Vue.")), 1),
              o("div", Io, y(s(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              o("div", Ao, [
                o("a", Oo, y(s(t)("Project Home")), 1),
                a[1] || (a[1] = o("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              o("div", Bo, [
                o("div", Vo, [
                  o("span", Lo, y(s(t)("Version")), 1),
                  o("span", zo, y(s(e).version), 1)
                ]),
                o("div", Ro, [
                  o("span", No, y(s(t)("License")), 1),
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
}), Uo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ho(i, e) {
  return u(), p("svg", Uo, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const gn = { render: Ho }, jo = { class: "vuefinder__delete-modal__content" }, Ko = { class: "vuefinder__delete-modal__form" }, qo = { class: "vuefinder__delete-modal__description" }, Wo = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Go = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yo = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qo = { class: "vuefinder__delete-modal__file-name" }, Xo = { class: "vuefinder__delete-modal__warning" }, ht = /* @__PURE__ */ Z({
  __name: "ModalDelete",
  setup(i) {
    const e = ee(), { t } = e.i18n, n = e.fs, a = G(n.path), d = M(e.modal.data.items), l = () => {
      d.value.length && e.adapter.delete({
        path: a.value.path,
        items: d.value.map(({ path: r, type: c }) => ({
          path: r,
          type: c
        }))
      }).then((r) => {
        re.success(t("Files deleted.")), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        re.error(Ee(r, t("Failed to delete files")));
      });
    };
    return (r, c) => (u(), z(Ie, null, {
      buttons: ne(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          onClick: l
        }, y(s(t)("Yes, Delete!")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[0] || (c[0] = (_) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1),
        o("div", Xo, y(s(t)("This action cannot be undone.")), 1)
      ]),
      default: ne(() => [
        o("div", null, [
          V(Oe, {
            icon: s(gn),
            title: s(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", jo, [
            o("div", Ko, [
              o("p", qo, y(s(t)("Are you sure you want to delete these files?")), 1),
              o("div", Wo, [
                (u(!0), p(fe, null, ge(d.value, (_) => (u(), p("p", {
                  key: _.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  _.type === "dir" ? (u(), p("svg", Go, [...c[1] || (c[1] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), p("svg", Yo, [...c[2] || (c[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Qo, y(_.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Jo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Zo(i, e) {
  return u(), p("svg", Jo, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const wn = { render: Zo }, es = { class: "vuefinder__rename-modal__content" }, ts = { class: "vuefinder__rename-modal__item" }, ns = { class: "vuefinder__rename-modal__item-info" }, os = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ss = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, is = { class: "vuefinder__rename-modal__item-name" }, mt = /* @__PURE__ */ Z({
  __name: "ModalRename",
  setup(i) {
    const e = ee(), { t } = e.i18n, n = e.fs, a = G(n.path), d = M(e.modal.data.items[0]), l = M(d.value.basename), r = () => {
      l.value != d.value.basename && e.adapter.rename({
        path: a.value.path,
        item: d.value.path,
        name: l.value
      }).then((c) => {
        re.success(t("%s is renamed.", l.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        re.error(Ee(c, t("Failed to rename")));
      });
    };
    return (c, _) => (u(), z(Ie, null, {
      buttons: ne(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(t)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (g) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: ne(() => [
        o("div", null, [
          V(Oe, {
            icon: s(wn),
            title: s(t)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", es, [
            o("div", ts, [
              o("p", ns, [
                d.value.type === "dir" ? (u(), p("svg", os, [..._[2] || (_[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), p("svg", ss, [..._[3] || (_[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", is, y(d.value.basename), 1)
              ]),
              me(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (g) => l.value = g),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: nt(r, ["enter"])
              }, null, 544), [
                [ot, l.value]
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
  const i = ee(), e = H(() => i.features);
  return {
    enabled: (n) => e.value[n] ?? !1
  };
}
const as = { class: "vuefinder__text-preview" }, rs = { class: "vuefinder__text-preview__header" }, ls = ["title"], ds = { class: "vuefinder__text-preview__actions" }, cs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, us = { key: 1 }, vs = /* @__PURE__ */ Z({
  __name: "Text",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = e, n = M(""), a = M(""), d = M(null), l = M(!1), r = ee(), { enabled: c } = Le(), { t: _ } = r.i18n;
    _e(async () => {
      try {
        const v = await r.adapter.getContent({ path: r.modal.data.item.path });
        n.value = v.content, t("success");
      } catch (v) {
        Ee(v, "Failed to load text content"), t("success");
      }
    });
    const g = () => {
      l.value = !l.value, a.value = n.value, r.modal.setEditMode(l.value);
    }, h = async () => {
      try {
        const v = r.modal.data.item.path;
        await r.adapter.save({
          path: v,
          content: a.value
        }), n.value = a.value, re.success(_("Updated.")), t("success"), l.value = !l.value;
      } catch (v) {
        re.error(Ee(v, _("Failed to save file")));
      }
    };
    return (v, $) => (u(), p("div", as, [
      o("div", rs, [
        o("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: s(r).modal.data.item.path
        }, y(s(r).modal.data.item.basename), 9, ls),
        o("div", ds, [
          l.value ? (u(), p("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: h
          }, y(s(_)("Save")), 1)) : T("", !0),
          s(c)("edit") ? (u(), p("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: $[0] || ($[0] = (F) => g())
          }, y(l.value ? s(_)("Cancel") : s(_)("Edit")), 1)) : T("", !0)
        ])
      ]),
      o("div", null, [
        l.value ? (u(), p("div", us, [
          me(o("textarea", {
            ref_key: "editInput",
            ref: d,
            "onUpdate:modelValue": $[1] || ($[1] = (F) => a.value = F),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ot, a.value]
          ])
        ])) : (u(), p("pre", cs, y(n.value), 1))
      ])
    ]));
  }
}), It = async (i, e) => {
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
        await It(i, a);
    }
  }
}, xe = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function yn(i) {
  const e = ee(), { t } = e.i18n, n = e.fs, a = G(n.path), d = e.config, l = M({ QUEUE_ENTRY_STATUS: xe }), r = M(null), c = M(null), _ = M(null), g = M(null), h = M(null), v = M([]), $ = M(""), F = M(!1), D = M(!1), w = M(null);
  let m;
  const f = (C) => {
    C.preventDefault(), C.stopPropagation(), D.value = !0;
  }, b = (C) => {
    C.preventDefault(), C.stopPropagation(), D.value = !0;
  }, S = (C) => {
    C.preventDefault(), C.stopPropagation(), (!C.relatedTarget || C.relatedTarget === document.body) && (D.value = !1);
  }, x = (C) => {
    C.preventDefault(), C.stopPropagation(), D.value = !1;
    const k = /^[/\\](.+)/, P = C.dataTransfer;
    P && (P.items && P.items.length ? Array.from(P.items).forEach((E) => {
      if (E.kind === "file") {
        const U = E.webkitGetAsEntry?.();
        if (U)
          It((X, we) => {
            const ke = k.exec(X?.fullPath || "");
            B(we, ke ? ke[1] : we.name);
          }, U);
        else {
          const X = E.getAsFile?.();
          X && B(X);
        }
      }
    }) : P.files && P.files.length && Array.from(P.files).forEach((E) => B(E)));
  }, I = (C) => v.value.findIndex((k) => k.id === C), B = (C, k) => m.addFile({ name: k || C.name, type: C.type, data: C, source: "Local" }), Q = (C) => C.status === xe.DONE ? "text-green-600" : C.status === xe.ERROR || C.status === xe.CANCELED ? "text-red-600" : "", j = (C) => C.status === xe.DONE ? "✓" : C.status === xe.ERROR || C.status === xe.CANCELED ? "!" : "...", oe = () => g.value?.click(), ie = () => e.modal.close(), he = (C) => {
    if (F.value || !v.value.filter((k) => k.status !== xe.DONE).length) {
      F.value || ($.value = t("Please select file to upload first."));
      return;
    }
    $.value = "", w.value = C || a.value, m.upload();
  }, A = () => {
    m.cancelAll(), v.value.forEach((C) => {
      C.status !== xe.DONE && (C.status = xe.CANCELED, C.statusName = t("Canceled"));
    }), F.value = !1;
  }, Y = (C) => {
    F.value || (m.removeFile(C.id), v.value.splice(I(C.id), 1));
  }, K = (C) => {
    if (!F.value)
      if (m.cancelAll(), C) {
        const k = v.value.filter((P) => P.status !== xe.DONE);
        v.value = [], k.forEach((P) => B(P.originalFile, P.name));
      } else
        v.value = [];
  }, N = (C) => {
    C.forEach((k) => {
      B(k);
    });
  };
  return _e(() => {
    m = new Qn({
      debug: e.debug,
      restrictions: { maxFileSize: ro(d.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (E, U) => {
        if (U[E.id] != null) {
          const we = I(E.id);
          v.value[we]?.status === xe.PENDING && ($.value = m.i18n("noDuplicates", { fileName: E.name })), v.value = v.value.filter((ke) => ke.id !== E.id);
        }
        return v.value.push({
          id: E.id,
          name: E.name,
          size: e.filesize(E.size),
          status: xe.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: E.data
        }), !0;
      }
    });
    const C = {
      getTargetPath: () => (w.value || a.value).path
    };
    if (i)
      i(m, C);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(m, C);
    else
      throw new Error("No uploader configured");
    m.on("restriction-failed", (E, U) => {
      const X = v.value[I(E.id)];
      X && Y(X), $.value = U.message;
    }), m.on("upload-progress", (E, U) => {
      const X = U.bytesTotal ?? 1, we = Math.floor(U.bytesUploaded / X * 100), ke = I(E.id);
      ke !== -1 && v.value[ke] && (v.value[ke].percent = `${we}%`);
    }), m.on("upload-success", (E) => {
      const U = v.value[I(E.id)];
      U && (U.status = xe.DONE, U.statusName = t("Done"));
    }), m.on("upload-error", (E, U) => {
      const X = v.value[I(E.id)];
      X && (X.percent = null, X.status = xe.ERROR, X.statusName = U?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : U?.message || t("Unknown Error"));
    }), m.on("error", (E) => {
      $.value = E.message, F.value = !1, e.adapter.open(a.value.path);
    }), m.on("complete", () => {
      F.value = !1;
      const E = w.value || a.value;
      e.adapter.invalidateListQuery(E.path), e.adapter.open(E.path);
      const U = v.value.filter((X) => X.status === xe.DONE).map((X) => X.name);
      e.emitter.emit("vf-upload-complete", U);
    }), g.value?.addEventListener("click", () => c.value?.click()), h.value?.addEventListener("click", () => _.value?.click());
    const k = { capture: !0 };
    document.addEventListener("dragover", f, k), document.addEventListener("dragenter", b, k), document.addEventListener("dragleave", S, k), document.addEventListener("drop", x, k);
    const P = (E) => {
      const U = E.target, X = U.files;
      if (X) {
        for (const we of X) B(we);
        U.value = "";
      }
    };
    c.value?.addEventListener("change", P), _.value?.addEventListener("change", P);
  }), Pe(() => {
    const C = { capture: !0 };
    document.removeEventListener("dragover", f, C), document.removeEventListener("dragenter", b, C), document.removeEventListener("dragleave", S, C), document.removeEventListener("drop", x, C);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: _,
    pickFiles: g,
    pickFolders: h,
    queue: v,
    message: $,
    uploading: F,
    hasFilesInDropArea: D,
    definitions: l,
    openFileSelector: oe,
    upload: he,
    cancel: A,
    remove: Y,
    clear: K,
    close: ie,
    getClassNameForEntry: Q,
    getIconForEntry: j,
    addExternalFiles: N
  };
}
const fs = { class: "vuefinder__image-preview" }, _s = { class: "vuefinder__image-preview__header" }, ps = ["title"], hs = { class: "vuefinder__image-preview__actions" }, ms = { class: "vuefinder__image-preview__image-container" }, gs = ["src"], ws = /* @__PURE__ */ Z({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = e, n = ee(), { enabled: a } = Le(), { t: d } = n.i18n, l = M(!1), r = M(
      n.modal.data.item.previewUrl ?? n.adapter.getPreviewUrl({ path: n.modal.data.item.path })
    ), c = M(r.value), { addExternalFiles: _, upload: g, queue: h } = yn(n.customUploader), v = n.fs, $ = G(v.path), F = je("cropperRef"), D = async () => {
      l.value = !l.value, n.modal.setEditMode(l.value);
    }, w = async () => {
      const f = F.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!f) return;
      let b = f;
      if (f.width > 1200 || f.height > 1200) {
        const Q = Math.min(1200 / f.width, 1200 / f.height), j = document.createElement("canvas");
        j.width = Math.floor(f.width * Q), j.height = Math.floor(f.height * Q);
        const oe = j.getContext("2d");
        oe && (oe.drawImage(f, 0, 0, j.width, j.height), b = j);
      }
      const S = n.modal.data.item.basename, x = S.split(".").pop()?.toLowerCase() || "jpg", I = x === "png" ? "image/png" : x === "gif" ? "image/gif" : "image/jpeg", B = await new Promise((Q) => {
        b.toBlob((j) => Q(j), I);
      });
      if (!B) {
        re.error(d("Failed to save image"));
        return;
      }
      try {
        const Q = new File([B], S, { type: I }), oe = n.modal.data.item.path.split("/");
        oe.pop();
        const he = {
          path: oe.join("/") || ($.value?.path ?? "")
        };
        _([Q]), await new Promise((N) => setTimeout(N, 100));
        const A = h.value.find((N) => N.name === Q.name);
        if (!A)
          throw new Error("File was not added to upload queue");
        g(he);
        let Y = 0;
        for (; Y < 150; ) {
          await new Promise((C) => setTimeout(C, 200));
          const N = h.value.find((C) => C.id === A.id);
          if (N?.status === xe.DONE) break;
          if (N?.status === xe.ERROR)
            throw new Error(N.statusName || "Upload failed");
          Y++;
        }
        re.success(d("Updated.")), await fetch(r.value, { cache: "reload", mode: "no-cors" });
        const K = n.root?.querySelector?.('[data-src="' + r.value + '"]');
        K && K instanceof HTMLElement && dn.resetStatus(K), n.emitter.emit("vf-refresh-thumbnails"), await D(), t("success");
      } catch (Q) {
        re.error(Ee(Q, d("Failed to save image")));
      }
    };
    return _e(() => {
      t("success");
    }), (m, f) => (u(), p("div", fs, [
      o("div", _s, [
        o("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: s(n).modal.data.item.path
        }, y(s(n).modal.data.item.basename), 9, ps),
        o("div", hs, [
          l.value ? (u(), p("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: w
          }, y(s(d)("Crop")), 1)) : T("", !0),
          s(a)("edit") ? (u(), p("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: f[0] || (f[0] = (b) => D())
          }, y(l.value ? s(d)("Cancel") : s(d)("Edit")), 1)) : T("", !0)
        ])
      ]),
      o("div", ms, [
        l.value ? (u(), z(s(Xn), {
          key: 1,
          ref_key: "cropperRef",
          ref: F,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: c.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (u(), p("img", {
          key: 0,
          style: {},
          src: s(n).modal.data.item.previewUrl ?? s(n).adapter.getPreviewUrl({ path: s(n).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, gs))
      ])
    ]));
  }
}), ys = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function bs(i, e) {
  return u(), p("svg", ys, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const et = { render: bs }, ks = { class: "vuefinder__default-preview" }, $s = { class: "vuefinder__default-preview__content" }, xs = { class: "vuefinder__default-preview__header" }, Ss = ["title"], Cs = { class: "vuefinder__default-preview__icon-container" }, Fs = ["title"], Ds = /* @__PURE__ */ Z({
  __name: "Default",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = ee(), n = e;
    return _e(() => {
      n("success");
    }), (a, d) => (u(), p("div", ks, [
      o("div", $s, [
        o("div", xs, [
          o("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Ss)
        ]),
        o("div", Cs, [
          V(s(et), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Fs)
        ])
      ])
    ]));
  }
}), Ps = { class: "vuefinder__video-preview" }, Es = ["title"], Ms = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Ts = ["src"], Is = /* @__PURE__ */ Z({
  __name: "Video",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = ee(), n = e, a = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return _e(() => {
      n("success");
    }), (d, l) => (u(), p("div", Ps, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Es),
      o("div", null, [
        o("video", Ms, [
          o("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Ts),
          l[0] || (l[0] = le(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), As = { class: "vuefinder__audio-preview" }, Os = ["title"], Bs = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Vs = ["src"], Ls = /* @__PURE__ */ Z({
  __name: "Audio",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = e, n = ee(), a = () => {
      const d = ee();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return _e(() => {
      t("success");
    }), (d, l) => (u(), p("div", As, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: s(n).modal.data.item.path
      }, y(s(n).modal.data.item.basename), 9, Os),
      o("div", null, [
        o("audio", Bs, [
          o("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Vs),
          l[0] || (l[0] = le(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), zs = { class: "vuefinder__pdf-preview" }, Rs = ["title"], Ns = ["data"], Us = ["src"], Hs = /* @__PURE__ */ Z({
  __name: "Pdf",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = ee(), n = e, a = () => {
      const d = ee();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return _e(() => {
      n("success");
    }), (d, l) => (u(), p("div", zs, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Rs),
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
          }, " Your browser does not support PDFs ", 8, Us)
        ], 8, Ns)
      ])
    ]));
  }
});
function js(i, e = null) {
  return new Date(i * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Ks = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, qs = ["disabled", "title"], Ws = ["disabled", "title"], Gs = { class: "vuefinder__preview-modal__content" }, Ys = { key: 0 }, Qs = { class: "vuefinder__preview-modal__loading" }, Xs = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Js = { class: "vuefinder__preview-modal__details" }, Zs = { class: "font-bold" }, ei = { class: "pl-2 font-bold" }, ti = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, ni = ["download", "href"], gt = /* @__PURE__ */ Z({
  __name: "ModalPreview",
  setup(i) {
    const e = ee(), { enabled: t } = Le(), { t: n } = e.i18n, a = M(!1), d = (f) => {
      const b = (f || "").split("/").pop() || "", S = b.lastIndexOf(".");
      return S >= 0 ? b.slice(S + 1).toLowerCase() : "";
    }, l = (f, b) => {
      if (!b) return !1;
      const S = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), x = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), I = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), B = /* @__PURE__ */ new Set([
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
      return f === "image" ? S.has(b) : f === "video" ? x.has(b) : f === "audio" ? I.has(b) : f === "text" ? B.has(b) : f === "application/pdf" ? b === "pdf" : !1;
    }, r = (f) => {
      const b = e.modal.data.item.mime_type;
      if (b && typeof b == "string") return b.startsWith(f);
      const S = d(e.modal.data.item.path);
      return l(f, S);
    }, c = t("preview");
    c || (a.value = !0);
    const _ = H(() => e.modal.data.item), g = G(e.fs.sortedFiles), h = H(() => g.value.filter((f) => f.type === "file")), v = H(
      () => h.value.findIndex((f) => f.path === _.value.path)
    ), $ = H(() => v.value > 0), F = H(() => v.value < h.value.length - 1), D = () => {
      if (e.modal.editMode || !$.value) return;
      const f = h.value[v.value - 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, w = () => {
      if (e.modal.editMode || !F.value) return;
      const f = h.value[v.value + 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, m = (f) => {
      if (f.key === "Escape") {
        f.preventDefault(), f.stopPropagation(), e.modal.close();
        return;
      }
      (f.key === "ArrowLeft" || f.key === "ArrowRight") && (f.preventDefault(), f.stopPropagation(), f.key === "ArrowLeft" ? D() : w());
    };
    return _e(() => {
      const f = document.querySelector(".vuefinder__preview-modal");
      f && f.focus();
    }), (f, b) => (u(), z(Ie, null, {
      buttons: ne(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[6] || (b[6] = (S) => s(e).modal.close())
        }, y(s(n)("Close")), 1),
        s(t)("download") ? (u(), p("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path }),
          href: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path })
        }, y(s(n)("Download")), 9, ni)) : T("", !0)
      ]),
      default: ne(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: m
        }, [
          s(e).modal.editMode ? T("", !0) : (u(), p("div", Ks, [
            o("button", {
              disabled: !$.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: s(n)("Previous file"),
              onClick: D
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
            ])], 8, qs),
            o("button", {
              disabled: !F.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: s(n)("Next file"),
              onClick: w
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
            ])], 8, Ws)
          ])),
          o("div", Gs, [
            s(c) ? (u(), p("div", Ys, [
              r("text") ? (u(), z(vs, {
                key: `text-${_.value.path}`,
                onSuccess: b[0] || (b[0] = (S) => a.value = !0)
              })) : r("image") ? (u(), z(ws, {
                key: `image-${_.value.path}`,
                onSuccess: b[1] || (b[1] = (S) => a.value = !0)
              })) : r("video") ? (u(), z(Is, {
                key: `video-${_.value.path}`,
                onSuccess: b[2] || (b[2] = (S) => a.value = !0)
              })) : r("audio") ? (u(), z(Ls, {
                key: `audio-${_.value.path}`,
                onSuccess: b[3] || (b[3] = (S) => a.value = !0)
              })) : r("application/pdf") ? (u(), z(Hs, {
                key: `pdf-${_.value.path}`,
                onSuccess: b[4] || (b[4] = (S) => a.value = !0)
              })) : (u(), z(Ds, {
                key: `default-${_.value.path}`,
                onSuccess: b[5] || (b[5] = (S) => a.value = !0)
              }))
            ])) : T("", !0),
            o("div", Qs, [
              a.value === !1 ? (u(), p("div", Xs, [
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
              ])) : T("", !0)
            ])
          ])
        ], 32),
        o("div", Js, [
          o("div", null, [
            o("span", Zs, y(s(n)("File Size")) + ": ", 1),
            le(y(s(e).filesize(s(e).modal.data.item.file_size)), 1)
          ]),
          o("div", null, [
            o("span", ei, y(s(n)("Last Modified")) + ": ", 1),
            le(" " + y(s(js)(s(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        s(t)("download") ? (u(), p("div", ti, [
          o("span", null, y(s(n)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : T("", !0)
      ]),
      _: 1
    }));
  }
}), oi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function si(i, e) {
  return u(), p("svg", oi, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const ii = { render: si }, ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ri(i, e) {
  return u(), p("svg", ai, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const bn = { render: ri }, li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function di(i, e) {
  return u(), p("svg", li, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const ze = { render: di }, ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ui(i, e) {
  return u(), p("svg", ci, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const wt = { render: ui }, vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function fi(i, e) {
  return u(), p("svg", vi, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const yt = { render: fi }, _i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function pi(i, e) {
  return u(), p("svg", _i, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const At = { render: pi }, hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function mi(i, e) {
  return u(), p("svg", hi, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const Ot = { render: mi }, gi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function wi(i, e) {
  return u(), p("svg", gi, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Bt = { render: wi }, yi = { class: "vuefinder__modal-tree__folder-item" }, bi = { class: "vuefinder__modal-tree__folder-content" }, ki = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, $i = { class: "vuefinder__modal-tree__folder-text" }, xi = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Si = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Ci = 300, Fi = /* @__PURE__ */ Z({
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
    const t = ee(), { t: n } = t.i18n, a = t.fs, d = M({}), l = i, r = e;
    G(a.path);
    const c = H(() => {
      const B = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[B] || !1;
    }), _ = H(() => l.modelValue?.path === l.folder.path), g = H(() => l.currentPath?.path === l.folder.path), h = H(() => l.modalTreeData[l.folder.path] || []), v = H(() => {
      const B = h.value, Q = d.value[l.folder.path] || 50;
      return B.length > Q ? B.slice(0, Q) : B;
    }), $ = H(() => h.value.length), F = H(() => d.value[l.folder.path] || 50), D = H(() => $.value > F.value), w = () => {
      d.value[l.folder.path] = (F.value || 50) + 50;
    }, m = H(() => h.value.length > 0 || l.folder.type === "dir"), f = () => {
      r("toggleFolder", l.storage, l.folder.path);
    }, b = () => {
      r("update:modelValue", l.folder);
    }, S = () => {
      r("update:modelValue", l.folder), r("selectAndClose", l.folder);
    };
    let x = 0;
    const I = () => {
      const B = Date.now();
      B - x < Ci ? S() : b(), x = B;
    };
    return (B, Q) => {
      const j = an("ModalTreeFolderItem", !0);
      return u(), p("div", yi, [
        o("div", bi, [
          m.value ? (u(), p("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: f
          }, [
            c.value ? (u(), z(s(yt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), z(s(wt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), p("div", ki)),
          o("div", {
            class: J(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": _.value,
              "vuefinder__modal-tree__folder-link--current": g.value
            }]),
            onClick: b,
            onDblclick: S,
            onTouchend: I
          }, [
            c.value ? (u(), z(s(Bt), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), z(s(ze), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", $i, y(i.folder.basename), 1)
          ], 34)
        ]),
        c.value && m.value ? (u(), p("div", xi, [
          (u(!0), p(fe, null, ge(v.value, (oe) => (u(), z(j, {
            key: oe.path,
            folder: oe,
            storage: i.storage,
            "model-value": i.modelValue,
            "expanded-folders": i.expandedFolders,
            "modal-tree-data": i.modalTreeData,
            "current-path": i.currentPath,
            "onUpdate:modelValue": Q[0] || (Q[0] = (ie) => B.$emit("update:modelValue", ie)),
            onSelectAndClose: Q[1] || (Q[1] = (ie) => B.$emit("selectAndClose", ie)),
            onToggleFolder: Q[2] || (Q[2] = (ie, he) => B.$emit("toggleFolder", ie, he))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          D.value ? (u(), p("div", Si, [
            o("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: w
            }, y(s(n)("load more")), 1)
          ])) : T("", !0)
        ])) : T("", !0)
      ]);
    };
  }
}), Di = { class: "vuefinder__modal-tree" }, Pi = { class: "vuefinder__modal-tree__header" }, Ei = { class: "vuefinder__modal-tree__title" }, Mi = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Ti = { class: "vuefinder__modal-tree__section-title" }, Ii = { class: "vuefinder__modal-tree__list" }, Ai = ["onClick", "onDblclick", "onTouchend"], Oi = { class: "vuefinder__modal-tree__text" }, Bi = { class: "vuefinder__modal-tree__text-storage" }, Vi = { class: "vuefinder__modal-tree__section-title" }, Li = { class: "vuefinder__modal-tree__list" }, zi = { class: "vuefinder__modal-tree__storage-item" }, Ri = { class: "vuefinder__modal-tree__storage-content" }, Ni = ["onClick"], Ui = ["onClick", "onDblclick", "onTouchend"], Hi = { class: "vuefinder__modal-tree__storage-text" }, ji = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Ki = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, qi = ["onClick"], Xt = 300, Vt = /* @__PURE__ */ Z({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(i, { emit: e }) {
    const t = ee(), { t: n } = t.i18n, a = t.fs, d = t.config, l = e, r = G(a.sortedFiles), c = G(a.storages), _ = H(() => c.value || []), g = G(a.path), h = M(null), v = M({}), $ = M({}), F = M({});
    de(r, (A) => {
      const Y = A.filter((N) => N.type === "dir"), K = g.value?.path || "";
      K && ($.value[K] = Y.map((N) => ({
        ...N,
        type: "dir"
      })));
    });
    const D = (A, Y) => {
      const K = `${A}:${Y}`;
      v.value = {
        ...v.value,
        [K]: !v.value[K]
      }, v.value[K] && !$.value[Y] && t.adapter.list(Y).then((N) => {
        const k = (N.files || []).filter((P) => P.type === "dir");
        $.value[Y] = k.map((P) => ({
          ...P,
          type: "dir"
        }));
      });
    }, w = (A) => $.value[A] || [], m = (A) => F.value[A] || 50, f = (A) => {
      const Y = w(A), K = m(A);
      return Y.length > K ? Y.slice(0, K) : Y;
    }, b = (A) => w(A).length, S = (A) => b(A) > m(A), x = (A) => {
      F.value[A] = m(A) + 50;
    }, I = (A) => {
      A && l("update:modelValue", A);
    }, B = (A) => {
      A && (l("update:modelValue", A), l("selectAndClose", A));
    }, Q = (A) => {
      const Y = {
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
      l("update:modelValue", Y);
    }, j = (A) => {
      const Y = {
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
      l("update:modelValue", Y), l("selectAndClose", Y);
    };
    let oe = 0;
    const ie = (A) => {
      if (!A) return;
      const Y = Date.now();
      Y - oe < Xt ? B(A) : I(A), oe = Y;
    }, he = (A) => {
      const Y = Date.now();
      Y - oe < Xt ? j(A) : Q(A), oe = Y;
    };
    return _e(() => {
      h.value && pt(h.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (A, Y) => (u(), p("div", Di, [
      o("div", Pi, [
        o("div", Ei, y(s(n)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: h,
        class: "vuefinder__modal-tree__content"
      }, [
        i.showPinnedFolders && s(t).features.pinned && s(d).get("pinnedFolders").length ? (u(), p("div", Mi, [
          o("div", Ti, y(s(n)("Pinned Folders")), 1),
          o("div", Ii, [
            (u(!0), p(fe, null, ge(s(d).get("pinnedFolders"), (K) => (u(), p("div", {
              key: K.path,
              class: J(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": i.modelValue?.path === K.path }]),
              onClick: (N) => I(K),
              onDblclick: (N) => B(K),
              onTouchend: (N) => ie(K)
            }, [
              V(s(ze), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", Oi, y(K.basename), 1),
              o("div", Bi, y(K.storage), 1),
              V(s(At), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ai))), 128))
          ])
        ])) : T("", !0),
        o("div", Vi, y(s(n)("Storages")), 1),
        (u(!0), p(fe, null, ge(_.value, (K) => (u(), p("div", {
          key: K,
          class: "vuefinder__modal-tree__section"
        }, [
          o("div", Li, [
            o("div", zi, [
              o("div", Ri, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ce((N) => D(K, K + "://"), ["stop"])
                }, [
                  v.value[`${K}:${K}://`] ? (u(), z(s(yt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), z(s(wt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Ni),
                o("div", {
                  class: J(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": i.modelValue?.path === K + "://"
                  }]),
                  onClick: (N) => Q(K),
                  onDblclick: (N) => j(K),
                  onTouchend: (N) => he(K)
                }, [
                  V(s(Ot), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", Hi, y(K), 1)
                ], 42, Ui)
              ]),
              v.value[`${K}:${K}://`] ? (u(), p("div", ji, [
                (u(!0), p(fe, null, ge(f(K + "://"), (N) => (u(), z(Fi, {
                  key: N.path,
                  folder: N,
                  storage: K,
                  "model-value": i.modelValue,
                  "expanded-folders": v.value,
                  "modal-tree-data": $.value,
                  "current-path": i.currentPath,
                  "onUpdate:modelValue": I,
                  onSelectAndClose: B,
                  onToggleFolder: D
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                S(K + "://") ? (u(), p("div", Ki, [
                  o("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (N) => x(K + "://")
                  }, y(s(n)("load more")), 9, qi)
                ])) : T("", !0)
              ])) : T("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Wi = ["title"], Ft = /* @__PURE__ */ Z({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(i, { emit: e }) {
    const t = e, n = ee(), { t: a } = n.i18n, d = M(!1), l = M(null), r = M(l.value?.innerHTML);
    de(r, () => d.value = !1);
    const c = () => {
      t("hidden"), d.value = !0;
    };
    return (_, g) => (u(), p("div", null, [
      d.value ? T("", !0) : (u(), p("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: J(["vuefinder__message", i.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ce(_.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          title: s(a)("Close"),
          onClick: c
        }, [...g[0] || (g[0] = [
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
        ])], 8, Wi)
      ], 2))
    ]));
  }
}), Gi = { class: "vuefinder__move-modal__content" }, Yi = { class: "vuefinder__move-modal__description" }, Qi = { class: "vuefinder__move-modal__files vf-scrollbar" }, Xi = { class: "vuefinder__move-modal__file-name" }, Ji = { class: "vuefinder__move-modal__target-title" }, Zi = { class: "vuefinder__move-modal__target-container" }, ea = { class: "vuefinder__move-modal__target-path" }, ta = { class: "vuefinder__move-modal__target-storage" }, na = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, oa = { class: "vuefinder__move-modal__target-badge" }, sa = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, ia = { class: "vuefinder__move-modal__checkbox-label" }, aa = { class: "vuefinder__move-modal__checkbox-text" }, ra = ["disabled"], la = { class: "vuefinder__move-modal__selected-items" }, kn = /* @__PURE__ */ Z({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(i) {
    const e = ee(), { enabled: t } = Le(), { t: n } = e.i18n, a = i, d = M(e.modal.data.items.from), l = M(e.modal.data.items.to), r = M(""), c = M(a.copy || !t("move")), _ = H(() => c.value ? "copy" : "move"), g = M(!1), h = G(e.fs.path), v = H(() => c.value ? n("Copy files") : n("Move files")), $ = H(
      () => c.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), F = H(() => c.value ? n("Yes, Copy!") : n("Yes, Move!"));
    H(() => c.value ? n("Files copied.") : n("Files moved."));
    const D = (x) => {
      x && (l.value = x);
    }, w = (x) => {
      x && (l.value = x, g.value = !1);
    }, m = H(() => {
      const x = l.value;
      return x ? d.value.some((I) => !!(x.path === I.path || I.path.startsWith(x.path + "/") || I.type === "dir" && x.path.startsWith(I.path + "/"))) : !0;
    }), f = H(() => {
      if (!m.value)
        return "";
      const x = l.value;
      return x ? d.value.find((B) => x.path === B.path || B.path.startsWith(x.path + "/") || B.type === "dir" && x.path.startsWith(B.path + "/")) ? n("Cannot move/copy item to itself or its parent/child directory") : n("Invalid destination directory") : n("Please select a destination directory");
    }), b = () => {
      const x = l.value.path;
      if (!x) return { storage: "local", path: "" };
      if (x.endsWith("://"))
        return { storage: x.replace("://", ""), path: "" };
      const I = x.split("://");
      return {
        storage: I[0] || "local",
        path: I[1] || ""
      };
    }, S = async () => {
      if (d.value.length)
        try {
          const { files: x } = await e.adapter[_.value]({
            path: h.value.path,
            sources: d.value.map(({ path: I }) => I),
            destination: l.value.path
          });
          e.fs.setFiles(x), e.modal.close();
        } catch (x) {
          re.error(Ee(x, n("Failed to transfer files")));
        }
    };
    return (x, I) => (u(), z(Ie, null, {
      buttons: ne(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: m.value,
          onClick: S
        }, y(F.value), 9, ra),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: I[4] || (I[4] = (B) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1),
        o("div", la, y(s(n)("%s item(s) selected.", d.value.length)), 1)
      ]),
      default: ne(() => [
        o("div", null, [
          V(Oe, {
            icon: c.value ? s(bn) : s(ii),
            title: v.value
          }, null, 8, ["icon", "title"]),
          o("div", Gi, [
            o("p", Yi, y($.value), 1),
            o("div", Qi, [
              (u(!0), p(fe, null, ge(d.value, (B) => (u(), p("div", {
                key: B.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  B.type === "dir" ? (u(), z(s(ze), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), z(s(et), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                o("div", Xi, y(B.path), 1)
              ]))), 128))
            ]),
            o("h4", Ji, y(s(n)("Target Directory")), 1),
            o("div", Zi, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: I[0] || (I[0] = (B) => g.value = !g.value)
              }, [
                o("div", ea, [
                  o("span", ta, y(b().storage) + "://", 1),
                  b().path ? (u(), p("span", na, y(b().path), 1)) : T("", !0)
                ]),
                o("span", oa, y(s(n)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: J([
                "vuefinder__move-modal__tree-selector",
                g.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              V(Vt, {
                modelValue: l.value,
                "onUpdate:modelValue": [
                  I[1] || (I[1] = (B) => l.value = B),
                  D
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: w
              }, null, 8, ["modelValue"])
            ], 2),
            s(t)("copy") && s(t)("move") ? (u(), p("div", sa, [
              o("label", ia, [
                me(o("input", {
                  "onUpdate:modelValue": I[2] || (I[2] = (B) => c.value = B),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Pt, c.value]
                ]),
                o("span", aa, y(s(n)("Create a copy instead of moving")), 1)
              ])
            ])) : T("", !0),
            f.value ? (u(), z(Ft, {
              key: 1,
              error: ""
            }, {
              default: ne(() => [
                le(y(f.value), 1)
              ]),
              _: 1
            })) : T("", !0),
            r.value.length && !f.value ? (u(), z(Ft, {
              key: 2,
              error: "",
              onHidden: I[3] || (I[3] = (B) => r.value = "")
            }, {
              default: ne(() => [
                le(y(r.value), 1)
              ]),
              _: 1
            })) : T("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ye = /* @__PURE__ */ Z({
  __name: "ModalMove",
  setup(i) {
    return (e, t) => (u(), z(kn, { copy: !1 }));
  }
}), Lt = /* @__PURE__ */ Z({
  __name: "ModalCopy",
  setup(i) {
    return (e, t) => (u(), z(kn, { copy: !0 }));
  }
}), da = (i, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && i(...a), clearTimeout(n), n = setTimeout(() => {
      i(...a);
    }, e);
  };
}, $n = (i, e, t) => {
  const n = M(i);
  return Rn((a, d) => ({
    get() {
      return a(), n.value;
    },
    set: da(
      (l) => {
        n.value = l, d();
      },
      e,
      !1
    )
  }));
}, ca = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function ua(i, e) {
  return u(), p("svg", ca, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const zt = { render: ua }, va = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function fa(i, e) {
  return u(), p("svg", va, [...e[0] || (e[0] = [
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
const bt = { render: fa }, _a = { class: "vuefinder__search-modal__search-input" }, pa = ["value", "placeholder", "disabled"], ha = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, ma = /* @__PURE__ */ Z({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(i, { expose: e, emit: t }) {
    const n = t, a = ee(), { t: d } = a.i18n, l = M(null), r = (_) => {
      const g = _.target;
      n("update:modelValue", g.value);
    }, c = (_) => {
      n("keydown", _);
    };
    return e({
      focus: () => {
        l.value && l.value.focus();
      }
    }), (_, g) => (u(), p("div", _a, [
      V(s(zt), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: l,
        value: i.modelValue,
        type: "text",
        placeholder: s(d)("Search Files"),
        disabled: i.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: g[0] || (g[0] = ce(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, pa),
      i.isSearching ? (u(), p("div", ha, [
        V(s(bt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : T("", !0)
    ]));
  }
}), ga = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function wa(i, e) {
  return u(), p("svg", ga, [...e[0] || (e[0] = [
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
const xn = { render: wa }, ya = ["disabled", "title"], ba = ["data-theme"], ka = { class: "vuefinder__search-modal__dropdown-content" }, $a = { class: "vuefinder__search-modal__dropdown-section" }, xa = { class: "vuefinder__search-modal__dropdown-title" }, Sa = { class: "vuefinder__search-modal__dropdown-options" }, Ca = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Fa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Da = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Pa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ea = /* @__PURE__ */ Z({
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
    const n = i, a = t, d = ee(), { t: l } = d.i18n, r = M(null), c = M(null);
    let _ = null;
    const g = (D) => {
      if (a("update:selectedOption", D), D.startsWith("size-")) {
        const w = D.split("-")[1];
        a("update:sizeFilter", w);
      }
    }, h = async () => {
      n.disabled || (n.visible ? (a("update:visible", !1), _ && (_(), _ = null)) : (a("update:visible", !0), await Ve(), await v()));
    }, v = async () => {
      if (!(!r.value || !c.value) && (await Ve(), !(!r.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: D, y: w } = await rt(r.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [lt(8), dt({ padding: 16 }), ct({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${D}px`,
            top: `${w}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (D) {
          console.warn("Floating UI initial positioning error:", D);
          return;
        }
        try {
          _ = cn(r.value, c.value, async () => {
            if (!(!r.value || !c.value))
              try {
                const { x: D, y: w } = await rt(
                  r.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [lt(8), dt({ padding: 16 }), ct({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${D}px`,
                  top: `${w}px`
                });
              } catch (D) {
                console.warn("Floating UI positioning error:", D);
              }
          });
        } catch (D) {
          console.warn("Floating UI autoUpdate setup error:", D), _ = null;
        }
      }
    }, $ = (D) => {
      if (!n.visible) return;
      const w = ["size-all", "size-small", "size-medium", "size-large"], m = w.findIndex((f) => f === n.selectedOption);
      if (D.key === "ArrowDown") {
        D.preventDefault();
        const f = (m + 1) % w.length;
        a("update:selectedOption", w[f] || null);
      } else if (D.key === "ArrowUp") {
        D.preventDefault();
        const f = m <= 0 ? w.length - 1 : m - 1;
        a("update:selectedOption", w[f] || null);
      } else D.key === "Enter" ? (D.preventDefault(), n.selectedOption?.startsWith("size-") && a(
        "update:sizeFilter",
        n.selectedOption.split("-")[1]
      )) : D.key === "Escape" && (D.preventDefault(), a("update:visible", !1), _ && (_(), _ = null));
    }, F = () => {
      _ && (_(), _ = null);
    };
    return de(
      () => n.visible,
      (D) => {
        !D && _ && (_(), _ = null);
      }
    ), Pe(() => {
      F();
    }), e({
      cleanup: F
    }), (D, w) => (u(), p(fe, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: J(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": i.visible }]),
        disabled: i.disabled,
        title: s(l)("Search Options"),
        onClick: ce(h, ["stop"])
      }, [
        V(s(xn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, ya),
      (u(), z(_t, { to: "body" }, [
        i.visible ? (u(), p("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": s(d).theme.current,
          tabindex: "-1",
          onClick: w[4] || (w[4] = ce(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          o("div", ka, [
            o("div", $a, [
              o("div", xa, y(s(l)("File Size")), 1),
              o("div", Sa, [
                o("div", {
                  class: J(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": i.sizeFilter === "all"
                  }]),
                  onClick: w[0] || (w[0] = ce((m) => g("size-all"), ["stop"]))
                }, [
                  o("span", null, y(s(l)("All Files")), 1),
                  i.sizeFilter === "all" ? (u(), p("div", Ca, [...w[5] || (w[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2),
                o("div", {
                  class: J(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": i.sizeFilter === "small"
                  }]),
                  onClick: w[1] || (w[1] = ce((m) => g("size-small"), ["stop"]))
                }, [
                  o("span", null, y(s(l)("Small (< 1MB)")), 1),
                  i.sizeFilter === "small" ? (u(), p("div", Fa, [...w[6] || (w[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2),
                o("div", {
                  class: J(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": i.sizeFilter === "medium"
                  }]),
                  onClick: w[2] || (w[2] = ce((m) => g("size-medium"), ["stop"]))
                }, [
                  o("span", null, y(s(l)("Medium (1-10MB)")), 1),
                  i.sizeFilter === "medium" ? (u(), p("div", Da, [...w[7] || (w[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2),
                o("div", {
                  class: J(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": i.sizeFilter === "large"
                  }]),
                  onClick: w[3] || (w[3] = ce((m) => g("size-large"), ["stop"]))
                }, [
                  o("span", null, y(s(l)("Large (> 10MB)")), 1),
                  i.sizeFilter === "large" ? (u(), p("div", Pa, [...w[8] || (w[8] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, ba)) : T("", !0)
      ]))
    ], 64));
  }
});
function Sn(i, e = 40) {
  const t = i.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return i;
  const n = t[1], a = t[2] ?? "", d = a.split("/").filter(Boolean), l = d.pop();
  if (!l) return n + a;
  let r = `${n}${d.join("/")}${d.length ? "/" : ""}${l}`;
  if (r.length <= e) return r;
  const c = l.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", g = c[1] ?? "", h = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, v = g ? `${h}.${g}` : h;
  return r = `${n}${d.join("/")}${d.length ? "/" : ""}${v}`, r.length > e && (r = `${n}.../${v}`), r;
}
async function Cn(i) {
  try {
    await navigator.clipboard.writeText(i);
  } catch {
    const e = document.createElement("textarea");
    e.value = i, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function tt(i) {
  await Cn(i);
}
async function Ma(i) {
  await Cn(i);
}
const Ta = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Ia(i, e) {
  return u(), p("svg", Ta, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Fn = { render: Ia }, Aa = ["title"], Oa = { class: "vuefinder__search-modal__result-icon" }, Ba = { class: "vuefinder__search-modal__result-content" }, Va = { class: "vuefinder__search-modal__result-name" }, La = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, za = ["title"], Ra = ["title"], Na = ["data-item-dropdown", "data-theme"], Ua = { class: "vuefinder__search-modal__item-dropdown-content" }, Ha = /* @__PURE__ */ Z({
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
    const t = i, n = e, a = ee(), { t: d } = a.i18n, l = M(null);
    let r = null;
    de(
      () => t.activeDropdown,
      (m) => {
        r && (r(), r = null), m === t.item.path && l.value && Ve(() => {
          h(t.item.path, l.value);
        });
      }
    ), Pe(() => {
      r && (r(), r = null);
    });
    const c = (m) => t.expandedPaths.has(m), _ = (m) => m.type === "dir" || !m.file_size ? "" : Mt(m.file_size), g = (m, f) => {
      f.stopPropagation(), n("toggleItemDropdown", m, f);
    }, h = async (m, f) => {
      const b = document.querySelector(
        `[data-item-dropdown="${m}"]`
      );
      if (!(!b || !f) && (await Ve(), !(!b || !f))) {
        Object.assign(b.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: S, y: x } = await rt(f, b, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [lt(8), dt({ padding: 16 }), ct({ padding: 16 })]
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
          r = cn(f, b, async () => {
            if (!(!f || !b))
              try {
                const { x: S, y: x } = await rt(f, b, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [lt(8), dt({ padding: 16 }), ct({ padding: 16 })]
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
    }, v = (m) => {
      n("update:selectedItemDropdownOption", m);
    }, $ = async (m) => {
      await tt(m.path), n("copyPath", m);
    }, F = (m) => {
      n("openContainingFolder", m);
    }, D = (m) => {
      n("preview", m);
    }, w = (m) => {
      if (!t.activeDropdown) return;
      const f = ["copy-path", "open-folder", "preview"], b = t.selectedItemDropdownOption, S = f.findIndex((x) => b?.includes(x));
      if (m.key === "ArrowDown") {
        m.preventDefault();
        const x = (S + 1) % f.length;
        n(
          "update:selectedItemDropdownOption",
          `${f[x] || ""}-${t.activeDropdown}`
        );
      } else if (m.key === "ArrowUp") {
        m.preventDefault();
        const x = S <= 0 ? f.length - 1 : S - 1;
        n(
          "update:selectedItemDropdownOption",
          `${f[x] || ""}-${t.activeDropdown}`
        );
      } else m.key === "Enter" ? (m.preventDefault(), b && (b.includes("copy-path") ? $(t.item) : b.includes("open-folder") ? F(t.item) : b.includes("preview") && D(t.item))) : m.key === "Escape" && (m.preventDefault(), n("update:selectedItemDropdownOption", null));
    };
    return (m, f) => (u(), p("div", {
      class: J(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": i.index === i.selectedIndex }]),
      title: i.item.basename,
      onClick: f[9] || (f[9] = (b) => n("select", i.index))
    }, [
      o("div", Oa, [
        i.item.type === "dir" ? (u(), z(s(ze), { key: 0 })) : (u(), z(s(et), { key: 1 }))
      ]),
      o("div", Ba, [
        o("div", Va, [
          le(y(i.item.basename) + " ", 1),
          _(i.item) ? (u(), p("span", La, y(_(i.item)), 1)) : T("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: i.item.path,
          onClick: f[0] || (f[0] = ce((b) => {
            n("select", i.index), n("togglePathExpansion", i.item.path);
          }, ["stop"]))
        }, y(c(i.item.path) ? i.item.path : s(Sn)(i.item.path)), 9, za)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: l,
        class: "vuefinder__search-modal__result-actions",
        title: s(d)("More actions"),
        onClick: f[1] || (f[1] = (b) => {
          n("selectWithDropdown", i.index), g(i.item.path, b);
        })
      }, [
        V(s(Fn), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Ra),
      (u(), z(_t, { to: "body" }, [
        i.activeDropdown === i.item.path ? (u(), p("div", {
          key: 0,
          "data-item-dropdown": i.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": s(a).theme.current,
          tabindex: "-1",
          onClick: f[8] || (f[8] = ce(() => {
          }, ["stop"])),
          onKeydown: w
        }, [
          o("div", Ua, [
            o("div", {
              class: J(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": i.selectedItemDropdownOption === `copy-path-${i.item.path}`
              }]),
              onClick: f[2] || (f[2] = (b) => {
                v(`copy-path-${i.item.path}`), $(i.item);
              }),
              onFocus: f[3] || (f[3] = (b) => v(`copy-path-${i.item.path}`))
            }, [
              f[10] || (f[10] = o("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                o("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                o("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              o("span", null, y(s(d)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: J(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": i.selectedItemDropdownOption === `open-folder-${i.item.path}`
              }]),
              onClick: f[4] || (f[4] = (b) => {
                v(`open-folder-${i.item.path}`), F(i.item);
              }),
              onFocus: f[5] || (f[5] = (b) => v(`open-folder-${i.item.path}`))
            }, [
              V(s(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(s(d)("Open Containing Folder")), 1)
            ], 34),
            o("div", {
              class: J(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": i.selectedItemDropdownOption === `preview-${i.item.path}`
              }]),
              onClick: f[6] || (f[6] = (b) => {
                v(`preview-${i.item.path}`), D(i.item);
              }),
              onFocus: f[7] || (f[7] = (b) => v(`preview-${i.item.path}`))
            }, [
              V(s(et), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(s(d)("Preview")), 1)
            ], 34)
          ])
        ], 40, Na)) : T("", !0)
      ]))
    ], 10, Aa));
  }
}), ja = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Ka = { class: "vuefinder__search-modal__loading-icon" }, qa = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Wa = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, Ga = { class: "vuefinder__search-modal__results-header" }, Ge = 60, Jt = 5, Ya = /* @__PURE__ */ Z({
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
    const n = i, a = t, d = ee(), { t: l } = d.i18n, r = je("scrollableContainer"), c = H(() => n.searchResults.length > 0), _ = H(() => n.searchResults.length), g = M(0), h = M(600), v = H(() => n.searchResults.length * Ge), $ = H(() => {
      const b = Math.max(0, Math.floor(g.value / Ge) - Jt), S = Math.min(
        n.searchResults.length,
        Math.ceil((g.value + h.value) / Ge) + Jt
      );
      return { start: b, end: S };
    }), F = H(() => {
      const { start: b, end: S } = $.value;
      return n.searchResults.slice(b, S).map((x, I) => ({
        item: x,
        index: b + I,
        top: (b + I) * Ge
      }));
    }), D = (b) => {
      const S = b.target;
      g.value = S.scrollTop;
    }, w = () => {
      r.value && (h.value = r.value.clientHeight);
    }, m = () => {
      if (n.selectedIndex >= 0 && r.value) {
        const b = n.selectedIndex * Ge, S = b + Ge, x = r.value.scrollTop, I = r.value.clientHeight, B = x + I;
        let Q = x;
        b < x ? Q = b : S > B && (Q = S - I), Q !== x && r.value.scrollTo({
          top: Q,
          behavior: "smooth"
        });
      }
    }, f = () => {
      r.value && (r.value.scrollTop = 0, g.value = 0);
    };
    return _e(() => {
      w(), window.addEventListener("resize", w);
    }), Pe(() => {
      window.removeEventListener("resize", w);
    }), de(
      () => r.value,
      () => {
        w();
      }
    ), e({
      scrollSelectedIntoView: m,
      resetScroll: f,
      getContainerHeight: () => h.value,
      scrollTop: () => g.value
    }), (b, S) => (u(), p("div", {
      class: J(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": i.resultsEnter }])
    }, [
      i.isSearching ? (u(), p("div", ja, [
        o("div", Ka, [
          V(s(bt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, y(s(l)("Searching...")), 1)
      ])) : c.value ? (u(), p("div", Wa, [
        o("div", Ga, [
          o("span", null, y(s(l)("Found %s results", _.value)), 1)
        ]),
        o("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: D
        }, [
          o("div", {
            class: "vuefinder__search-modal__results-items",
            style: Ue({ height: `${v.value}px`, position: "relative" })
          }, [
            (u(!0), p(fe, null, ge(F.value, (x) => (u(), p("div", {
              key: x.item.path,
              style: Ue({
                position: "absolute",
                top: `${x.top}px`,
                left: "0",
                width: "100%",
                height: `${Ge}px`
              })
            }, [
              V(Ha, {
                item: x.item,
                index: x.index,
                "selected-index": i.selectedIndex,
                "expanded-paths": i.expandedPaths,
                "active-dropdown": i.activeDropdown,
                "selected-item-dropdown-option": i.selectedItemDropdownOption,
                onSelect: S[0] || (S[0] = (I) => a("selectResultItem", I)),
                onSelectWithDropdown: S[1] || (S[1] = (I) => a("selectResultItemWithDropdown", I)),
                onTogglePathExpansion: S[2] || (S[2] = (I) => a("togglePathExpansion", I)),
                onToggleItemDropdown: S[3] || (S[3] = (I, B) => a("toggleItemDropdown", I, B)),
                "onUpdate:selectedItemDropdownOption": S[4] || (S[4] = (I) => a("update:selectedItemDropdownOption", I)),
                onCopyPath: S[5] || (S[5] = (I) => a("copyPath", I)),
                onOpenContainingFolder: S[6] || (S[6] = (I) => a("openContainingFolder", I)),
                onPreview: S[7] || (S[7] = (I) => a("preview", I))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), p("div", qa, [
        o("span", null, y(s(l)("No results found")), 1)
      ]))
    ], 2));
  }
}), Qa = { class: "vuefinder__search-modal" }, Xa = { class: "vuefinder__search-modal__content" }, Ja = { class: "vuefinder__search-modal__search-bar" }, Za = { class: "vuefinder__search-modal__search-location" }, er = ["title"], tr = ["disabled"], nr = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, or = { class: "vuefinder__search-modal__folder-selector-content" }, sr = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ir = { class: "vuefinder__search-modal__instructions-text" }, Rt = /* @__PURE__ */ Z({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(i) {
    const e = ee(), { t } = e.i18n, n = e.fs, a = M(null), d = M(null), l = M(null), r = $n("", 300), c = M([]), _ = M(!1), g = M(-1), h = M(!1), v = M(!1), $ = M(null), F = M("all"), D = M(!1), w = M(`size-${F.value}`), m = M(null), f = M(/* @__PURE__ */ new Set()), b = M(null), S = G(n.path), x = (k) => {
      f.value.has(k) ? f.value.delete(k) : f.value.add(k);
    }, I = (k, P) => {
      P && typeof P.stopPropagation == "function" && P.stopPropagation(), b.value === k ? b.value = null : b.value = k;
    }, B = () => {
      b.value = null;
    }, Q = (k) => {
      try {
        const P = k.dir || `${k.storage}://`;
        e.adapter.open(P), e.modal.close(), B();
      } catch {
        re.error(t("Failed to open containing folder"));
      }
    }, j = (k) => {
      e.modal.open(gt, {
        storage: S?.value?.storage ?? "local",
        item: k
      }), B();
    }, oe = (k) => {
      g.value = k, B();
    }, ie = (k) => {
      g.value = k;
    }, he = async (k) => {
      await tt(k.path), B();
    };
    de(r, async (k) => {
      k.trim() ? (await A(k.trim()), g.value = 0) : (c.value = [], _.value = !1, g.value = -1);
    }), de(F, async (k) => {
      w.value = `size-${k}`, r.value.trim() && !v.value && (await A(r.value.trim()), g.value = 0);
    }), de(D, async () => {
      r.value.trim() && !v.value && (await A(r.value.trim()), g.value = 0);
    });
    const A = async (k) => {
      if (k) {
        _.value = !0;
        try {
          const P = $.value?.path || S?.value?.path, E = await e.adapter.search({
            path: P,
            filter: k,
            deep: D.value,
            size: F.value
          });
          c.value = E || [], _.value = !1;
        } catch (P) {
          re.error(Ee(P, t("Search failed"))), c.value = [], _.value = !1;
        }
      }
    };
    _e(() => {
      document.addEventListener("click", C), w.value = `size-${F.value}`, Ve(() => {
        a.value && a.value.focus();
      });
    });
    const Y = () => {
      v.value ? (v.value = !1, r.value.trim() && (A(r.value.trim()), g.value = 0)) : (h.value = !1, v.value = !0);
    }, K = (k) => {
      k && ($.value = k);
    }, N = (k) => {
      k && (K(k), v.value = !1, r.value.trim() && (A(r.value.trim()), g.value = 0));
    };
    Pe(() => {
      document.removeEventListener("click", C), d.value && d.value.cleanup();
    });
    const C = (k) => {
      const P = k.target;
      if (h.value && (P.closest(".vuefinder__search-modal__dropdown") || (h.value = !1, Ve(() => {
        a.value && a.value.focus();
      }))), b.value) {
        const E = P.closest(".vuefinder__search-modal__item-dropdown"), U = P.closest(".vuefinder__search-modal__result-item");
        !E && !U && B();
      }
    };
    return (k, P) => (u(), z(Ie, { class: "vuefinder__search-modal-layout" }, {
      default: ne(() => [
        o("div", Qa, [
          V(Oe, {
            icon: s(zt),
            title: s(t)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", Xa, [
            o("div", Ja, [
              V(ma, {
                ref_key: "searchInputRef",
                ref: a,
                modelValue: s(r),
                "onUpdate:modelValue": P[0] || (P[0] = (E) => Nn(r) ? r.value = E : null),
                "is-searching": _.value,
                disabled: v.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              V(Ea, {
                ref_key: "searchOptionsDropdownRef",
                ref: d,
                visible: h.value,
                "onUpdate:visible": P[1] || (P[1] = (E) => h.value = E),
                "size-filter": F.value,
                "onUpdate:sizeFilter": P[2] || (P[2] = (E) => F.value = E),
                "selected-option": w.value,
                "onUpdate:selectedOption": P[3] || (P[3] = (E) => w.value = E),
                disabled: v.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: P[7] || (P[7] = ce(() => {
              }, ["stop"]))
            }, [
              o("div", Za, [
                o("button", {
                  class: J(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": v.value }]),
                  onClick: ce(Y, ["stop"])
                }, [
                  V(s(ze), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: $.value?.path || s(S).path
                  }, y(s(Sn)($.value?.path || s(S).path)), 9, er),
                  P[10] || (P[10] = o("svg", {
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
                onClick: P[6] || (P[6] = ce(() => {
                }, ["stop"]))
              }, [
                me(o("input", {
                  "onUpdate:modelValue": P[4] || (P[4] = (E) => D.value = E),
                  type: "checkbox",
                  disabled: v.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: P[5] || (P[5] = ce(() => {
                  }, ["stop"]))
                }, null, 8, tr), [
                  [Pt, D.value]
                ]),
                o("span", null, y(s(t)("Include subfolders")), 1)
              ])
            ]),
            v.value ? (u(), p("div", nr, [
              o("div", or, [
                V(Vt, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [
                    P[8] || (P[8] = (E) => $.value = E),
                    K
                  ],
                  "show-pinned-folders": !0,
                  "current-path": s(S),
                  onSelectAndClose: N
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : T("", !0),
            !s(r).trim() && !v.value ? (u(), p("div", sr, [
              o("p", ir, y(s(t)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : T("", !0),
            s(r).trim() && !v.value ? (u(), z(Ya, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: l,
              "search-results": c.value,
              "is-searching": _.value,
              "selected-index": g.value,
              "expanded-paths": f.value,
              "active-dropdown": b.value,
              "selected-item-dropdown-option": m.value,
              "results-enter": !0,
              onSelectResultItem: oe,
              onSelectResultItemWithDropdown: ie,
              onTogglePathExpansion: x,
              onToggleItemDropdown: I,
              "onUpdate:selectedItemDropdownOption": P[9] || (P[9] = (E) => m.value = E),
              onCopyPath: he,
              onOpenContainingFolder: Q,
              onPreview: j
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : T("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ar = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(i, { emit: e, slots: t }) {
    const n = ee(), a = M(!1), { t: d } = n.i18n;
    let l = null;
    const r = () => {
      l && clearTimeout(l), a.value = !0, l = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return _e(() => {
      n.emitter.on(i.on, r);
    }), Pe(() => {
      l && clearTimeout(l);
    }), {
      shown: a,
      t: d
    };
  }
}, rr = (i, e) => {
  const t = i.__vccOpts || i;
  for (const [n, a] of e)
    t[n] = a;
  return t;
}, lr = { key: 1 };
function dr(i, e, t, n, a, d) {
  return u(), p("div", {
    class: J(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    i.$slots.default ? Ce(i.$slots, "default", { key: 0 }) : (u(), p("span", lr, y(n.t("Saved.")), 1))
  ], 2);
}
const Xe = /* @__PURE__ */ rr(ar, [["render", dr]]), cr = [
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
], ur = { class: "vuefinder__about-modal__content" }, vr = { class: "vuefinder__about-modal__main" }, fr = { class: "vuefinder__about-modal__description" }, _r = { class: "vuefinder__about-modal__settings" }, pr = { class: "vuefinder__about-modal__settings__fieldset" }, hr = { class: "vuefinder__about-modal__settings__section-title" }, mr = { class: "vuefinder__about-modal__setting" }, gr = { class: "vuefinder__about-modal__setting-label" }, wr = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, yr = { class: "vuefinder__about-modal__setting-input justify-end" }, br = ["checked"], kr = { class: "vuefinder__about-modal__setting" }, $r = { class: "vuefinder__about-modal__setting-label" }, xr = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Sr = { class: "vuefinder__about-modal__setting-input justify-end" }, Cr = ["checked"], Fr = { class: "vuefinder__about-modal__setting" }, Dr = { class: "vuefinder__about-modal__setting-label" }, Pr = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Er = { class: "vuefinder__about-modal__setting-input justify-end" }, Mr = ["checked"], Tr = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, Ir = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, Ar = { class: "vuefinder__about-modal__setting-input justify-end" }, Or = ["value"], Br = ["label"], Vr = ["value"], Lr = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, zr = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, Rr = { class: "vuefinder__about-modal__setting-input justify-end" }, Nr = ["label"], Ur = ["value"], Hr = { class: "vuefinder__about-modal__tab-content" }, jr = { class: "vuefinder__about-modal__settings__section-title" }, Kr = { class: "vuefinder__about-modal__description" }, Dn = /* @__PURE__ */ Z({
  __name: "ModalSettings",
  setup(i) {
    const e = ee(), { enabled: t } = Le(), n = e.config, { clearStore: a } = e.storage, { t: d } = e.i18n, l = G(n.state), r = H(() => l.value.theme || "silver"), c = async () => {
      n.reset(), a(), location.reload();
    }, _ = (w) => {
      n.set("theme", w), e.emitter.emit("vf-theme-saved");
    }, g = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? fn : Mt, e.emitter.emit("vf-metric-units-saved");
    }, h = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, v = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: $ } = at("VueFinderOptions"), D = Object.fromEntries(
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
      }).filter(([w]) => Object.keys($).includes(w))
    );
    return (w, m) => (u(), z(Ie, null, {
      buttons: ne(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[2] || (m[2] = (f) => s(e).modal.close())
        }, y(s(d)("Close")), 1)
      ]),
      default: ne(() => [
        o("div", ur, [
          V(Oe, {
            icon: s(xn),
            title: s(d)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", vr, [
            o("div", fr, y(s(d)("Customize your experience with the following settings")), 1),
            o("div", _r, [
              o("fieldset", pr, [
                o("div", hr, y(s(d)("General")), 1),
                o("div", mr, [
                  o("div", gr, [
                    o("label", wr, y(s(d)("Use Metric Units")), 1)
                  ]),
                  o("div", yr, [
                    o("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: s(n).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: g
                    }, null, 40, br),
                    V(Xe, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: ne(() => [
                        le(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o("div", kr, [
                  o("div", $r, [
                    o("label", xr, y(s(d)("Compact list view")), 1)
                  ]),
                  o("div", Sr, [
                    o("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: s(n).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: h
                    }, null, 40, Cr),
                    V(Xe, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: ne(() => [
                        le(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o("div", Fr, [
                  o("div", Dr, [
                    o("label", Pr, y(s(d)("Persist path on reload")), 1)
                  ]),
                  o("div", Er, [
                    o("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: s(n).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: v
                    }, null, 40, Mr),
                    V(Xe, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: ne(() => [
                        le(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s(t)("theme") ? (u(), p("div", Tr, y(s(d)("Theme")), 1)) : T("", !0),
                s(t)("theme") ? (u(), p("div", Ir, [
                  o("div", Ar, [
                    o("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: m[0] || (m[0] = (f) => _(f.target?.value))
                    }, [
                      o("optgroup", {
                        label: s(d)("Theme")
                      }, [
                        (u(!0), p(fe, null, ge(s(cr), (f) => (u(), p("option", {
                          key: f.name,
                          value: f.name
                        }, y(f.displayName), 9, Vr))), 128))
                      ], 8, Br)
                    ], 40, Or),
                    V(Xe, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: ne(() => [
                        le(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : T("", !0),
                s(t)("language") && Object.keys(s(D)).length > 1 ? (u(), p("div", Lr, y(s(d)("Language")), 1)) : T("", !0),
                s(t)("language") && Object.keys(s(D)).length > 1 ? (u(), p("div", zr, [
                  o("div", Rr, [
                    me(o("select", {
                      id: "language",
                      "onUpdate:modelValue": m[1] || (m[1] = (f) => s(e).i18n.locale = f),
                      class: "vuefinder__about-modal__select"
                    }, [
                      o("optgroup", {
                        label: s(d)("Language")
                      }, [
                        (u(!0), p(fe, null, ge(s(D), (f, b) => (u(), p("option", {
                          key: b,
                          value: b
                        }, y(f), 9, Ur))), 128))
                      ], 8, Nr)
                    ], 512), [
                      [St, s(e).i18n.locale]
                    ]),
                    V(Xe, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: ne(() => [
                        le(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : T("", !0)
              ])
            ]),
            o("div", Hr, [
              o("div", jr, y(s(d)("Reset")), 1),
              o("div", Kr, y(s(d)("Reset all settings to default")), 1),
              o("button", {
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
  const i = ee(), e = i.fs, t = i.config, { enabled: n } = Le(), a = G(e.path), d = G(e.selectedItems), l = (r) => {
    if (r.code === Fe.ESCAPE && (i.modal.close(), i.root.focus()), !i.modal.visible) {
      if (r.metaKey && r.code === Fe.KEY_R && !r.shiftKey && (i.adapter.invalidateListQuery(a.value.path), i.adapter.open(a.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === Fe.KEY_R && n("rename") && d.value.length === 1 && (i.modal.open(mt, { items: d.value }), r.preventDefault()), r.code === Fe.DELETE && d.value.length !== 0 && i.modal.open(ht, { items: d.value }), r.metaKey && r.code === Fe.BACKSLASH && i.modal.open(mn), r.metaKey && r.code === Fe.KEY_F && n("search") && (i.modal.open(Rt), r.preventDefault()), r.metaKey && r.code === Fe.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === Fe.KEY_S && (i.modal.open(Dn), r.preventDefault()), r.metaKey && r.code === Fe.ENTER && (t.toggle("fullScreen"), i.root.focus()), r.metaKey && r.code === Fe.KEY_A && (e.selectAll(i.selectionMode || "multiple", i), r.preventDefault()), r.code === Fe.SPACE && d.value.length === 1 && d.value[0]?.type !== "dir" && i.modal.open(gt, {
        storage: e.path.get().storage,
        item: d.value[0]
      }), r.metaKey && r.code === Fe.KEY_C && n("copy")) {
        if (d.value.length === 0) {
          re.error(i.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("copy", new Set(d.value.map((c) => c.path))), re.success(
          d.value.length === 1 ? i.i18n.t("Item copied to clipboard") : i.i18n.t("%s items copied to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Fe.KEY_X && n("copy")) {
        if (d.value.length === 0) {
          re.error(i.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("cut", new Set(d.value.map((c) => c.path))), re.success(
          d.value.length === 1 ? i.i18n.t("Item cut to clipboard") : i.i18n.t("%s items cut to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Fe.KEY_V && n("copy")) {
        if (e.getClipboard().items.size === 0) {
          re.error(i.i18n.t("No items in clipboard"));
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          re.error(i.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (e.getClipboard().type === "cut") {
          i.modal.open(Ye, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          i.modal.open(Lt, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  _e(async () => {
    if (await Ve(), !i.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    i.root.addEventListener("keydown", l);
  }), rn(() => {
    i.root && i.root.removeEventListener("keydown", l);
  });
}
function Wr() {
  const i = M(!1), e = M([]);
  return {
    isDraggingExternal: i,
    externalFiles: e,
    handleDragEnter: (r) => {
      r.preventDefault(), r.stopPropagation();
      const c = r.dataTransfer?.items;
      c && Array.from(c).some((g) => g.kind === "file") && (i.value = !0, r.isExternalDrag = !0);
    },
    handleDragOver: (r) => {
      i.value && r.dataTransfer && (r.dataTransfer.dropEffect = "copy", r.preventDefault(), r.stopPropagation());
    },
    handleDragLeave: (r) => {
      r.preventDefault();
      const c = r.currentTarget.getBoundingClientRect(), _ = r.clientX, g = r.clientY;
      (_ < c.left || _ > c.right || g < c.top || g > c.bottom) && (i.value = !1);
    },
    handleDrop: async (r) => {
      r.preventDefault(), r.stopPropagation(), i.value = !1;
      const c = r.dataTransfer?.items;
      if (c) {
        const _ = Array.from(c).filter((g) => g.kind === "file");
        if (_.length > 0) {
          e.value = [];
          for (const g of _) {
            const h = g.webkitGetAsEntry?.();
            if (h)
              await It((v, $) => {
                e.value.push({
                  name: $.name,
                  size: $.size,
                  type: $.type,
                  lastModified: new Date($.lastModified),
                  file: $
                });
              }, h);
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
function Yr(i, e) {
  return u(), p("svg", Gr, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Pn = { render: Yr }, Qr = { class: "vuefinder__new-folder-modal__content" }, Xr = { class: "vuefinder__new-folder-modal__form" }, Jr = { class: "vuefinder__new-folder-modal__description" }, Zr = ["placeholder"], Nt = /* @__PURE__ */ Z({
  __name: "ModalNewFolder",
  setup(i) {
    const e = ee(), { t } = e.i18n, n = e.fs, a = G(n.path), d = M(""), l = () => {
      d.value !== "" && e.adapter.createFolder({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        re.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        re.error(Ee(r, t("Failed to create folder")));
      });
    };
    return (r, c) => (u(), z(Ie, null, {
      buttons: ne(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: l
        }, y(s(t)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[1] || (c[1] = (_) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: ne(() => [
        o("div", null, [
          V(Oe, {
            icon: s(Pn),
            title: s(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", Qr, [
            o("div", Xr, [
              o("p", Jr, y(s(t)("Create a new folder")), 1),
              me(o("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => d.value = _),
                class: "vuefinder__new-folder-modal__input",
                placeholder: s(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: nt(l, ["enter"])
              }, null, 40, Zr), [
                [ot, d.value]
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
function tl(i, e) {
  return u(), p("svg", el, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const En = { render: tl }, nl = { class: "vuefinder__new-file-modal__content" }, ol = { class: "vuefinder__new-file-modal__form" }, sl = { class: "vuefinder__new-file-modal__description" }, il = ["placeholder"], Mn = /* @__PURE__ */ Z({
  __name: "ModalNewFile",
  setup(i) {
    const e = ee(), { t } = e.i18n, n = e.fs, a = G(n.path), d = M(""), l = () => {
      d.value !== "" && e.adapter.createFile({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        re.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        re.error(Ee(r, t("Failed to create file")));
      });
    };
    return (r, c) => (u(), z(Ie, null, {
      buttons: ne(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: l
        }, y(s(t)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[1] || (c[1] = (_) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: ne(() => [
        o("div", null, [
          V(Oe, {
            icon: s(En),
            title: s(t)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", nl, [
            o("div", ol, [
              o("p", sl, y(s(t)("Create a new file")), 1),
              me(o("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => d.value = _),
                class: "vuefinder__new-file-modal__input",
                placeholder: s(t)("File Name"),
                type: "text",
                onKeyup: nt(l, ["enter"])
              }, null, 40, il), [
                [ot, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Dt(i, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return i.replace(new RegExp(t), "$2..$4");
}
const al = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function rl(i, e) {
  return u(), p("svg", al, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Tn = { render: rl }, ll = { class: "vuefinder__upload-modal__content relative" }, dl = { class: "vuefinder__upload-modal__target-section" }, cl = { class: "vuefinder__upload-modal__target-label" }, ul = { class: "vuefinder__upload-modal__target-container" }, vl = { class: "vuefinder__upload-modal__target-path" }, fl = { class: "vuefinder__upload-modal__target-storage" }, _l = {
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
}, Fl = ["disabled"], Dl = ["aria-expanded"], Pl = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Ut = /* @__PURE__ */ Z({
  __name: "ModalUpload",
  setup(i) {
    const e = ee(), { t } = e.i18n, n = e.fs, a = G(n.path), d = M(a.value), l = M(!1), r = () => {
      const C = d.value.path;
      if (!C) return { storage: "local", path: "" };
      if (C.endsWith("://"))
        return { storage: C.replace("://", ""), path: "" };
      const k = C.split("://");
      return {
        storage: k[0] || "local",
        path: k[1] || ""
      };
    }, c = (C) => {
      C && (d.value = C);
    }, _ = (C) => {
      C && (d.value = C, l.value = !1);
    }, {
      container: g,
      internalFileInput: h,
      internalFolderInput: v,
      pickFiles: $,
      queue: F,
      message: D,
      uploading: w,
      hasFilesInDropArea: m,
      definitions: f,
      openFileSelector: b,
      upload: S,
      cancel: x,
      remove: I,
      clear: B,
      close: Q,
      getClassNameForEntry: j,
      getIconForEntry: oe,
      addExternalFiles: ie
    } = yn(e.customUploader), he = () => {
      S(d.value);
    };
    _e(() => {
      e.emitter.on("vf-external-files-dropped", (C) => {
        ie(C);
      });
    }), Pe(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const A = M(!1), Y = M(null), K = M(null), N = (C) => {
      if (!A.value) return;
      const k = C.target, P = Y.value?.contains(k) ?? !1, E = K.value?.contains(k) ?? !1;
      !P && !E && (A.value = !1);
    };
    return _e(() => document.addEventListener("click", N)), Pe(() => document.removeEventListener("click", N)), (C, k) => (u(), z(Ie, {
      "show-drag-overlay": s(m),
      "drag-overlay-text": s(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: ne(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: Y,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          o("div", {
            class: J([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              A.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: k[3] || (k[3] = (P) => s(b)())
            }, y(s(t)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": A.value ? "true" : "false",
              onClick: k[4] || (k[4] = ce((P) => A.value = !A.value, ["stop"]))
            }, [...k[17] || (k[17] = [
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
            ])], 8, Sl)
          ], 2),
          A.value ? (u(), p("div", Cl, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: k[5] || (k[5] = (P) => {
                s(b)(), A.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: k[6] || (k[6] = (P) => {
                s(v)?.click(), A.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            k[18] || (k[18] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: J(["vuefinder__upload-actions__item", s(w) ? "disabled" : ""]),
              onClick: k[7] || (k[7] = (P) => s(w) ? null : (s(B)(!1), A.value = !1))
            }, y(s(t)("Clear all")), 3),
            o("div", {
              class: J(["vuefinder__upload-actions__item", s(w) ? "disabled" : ""]),
              onClick: k[8] || (k[8] = (P) => s(w) ? null : (s(B)(!0), A.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : T("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: s(w) || !s(F).length,
          onClick: ce(he, ["prevent"])
        }, y(s(t)("Upload")), 9, Fl),
        s(w) ? (u(), p("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[9] || (k[9] = ce(
            //@ts-ignore
            (...P) => s(x) && s(x)(...P),
            ["prevent"]
          ))
        }, y(s(t)("Cancel")), 1)) : (u(), p("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[10] || (k[10] = ce(
            //@ts-ignore
            (...P) => s(Q) && s(Q)(...P),
            ["prevent"]
          ))
        }, y(s(t)("Close")), 1)),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: K,
          class: "relative mr-auto hidden sm:block"
        }, [
          o("div", {
            class: J(["vuefinder__upload-actions", A.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            o("button", {
              ref_key: "pickFiles",
              ref: $,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, y(s(t)("Select Files")), 513),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": A.value ? "true" : "false",
              onClick: k[11] || (k[11] = ce((P) => A.value = !A.value, ["stop"]))
            }, [...k[19] || (k[19] = [
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
            ])], 8, Dl)
          ], 2),
          A.value ? (u(), p("div", Pl, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: k[12] || (k[12] = (P) => {
                s(b)(), A.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: k[13] || (k[13] = (P) => {
                s(v)?.click(), A.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            k[20] || (k[20] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: J(["vuefinder__upload-actions__item", s(w) ? "disabled" : ""]),
              onClick: k[14] || (k[14] = (P) => s(w) ? null : (s(B)(!1), A.value = !1))
            }, y(s(t)("Clear all")), 3),
            o("div", {
              class: J(["vuefinder__upload-actions__item", s(w) ? "disabled" : ""]),
              onClick: k[15] || (k[15] = (P) => s(w) ? null : (s(B)(!0), A.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : T("", !0)
        ], 512)
      ]),
      default: ne(() => [
        o("div", null, [
          V(Oe, {
            icon: s(Tn),
            title: s(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", ll, [
            o("div", dl, [
              o("div", cl, y(s(t)("Hedef Klasör")), 1),
              o("div", ul, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: k[0] || (k[0] = (P) => l.value = !l.value)
                }, [
                  o("div", vl, [
                    o("span", fl, y(r().storage) + "://", 1),
                    r().path ? (u(), p("span", _l, y(r().path), 1)) : T("", !0)
                  ]),
                  o("span", pl, y(s(t)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: J([
                  "vuefinder__upload-modal__tree-selector",
                  l.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                V(Vt, {
                  modelValue: d.value,
                  "onUpdate:modelValue": [
                    k[1] || (k[1] = (P) => d.value = P),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", hl, y(s(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: g,
              class: "hidden"
            }, null, 512),
            o("div", ml, [
              (u(!0), p(fe, null, ge(s(F), (P) => (u(), p("div", {
                key: P.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: J(["vuefinder__upload-modal__file-icon", s(j)(P)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(s(oe)(P))
                  }, null, 8, gl)
                ], 2),
                o("div", wl, [
                  o("div", yl, y(s(Dt)(P.name, 40)) + " (" + y(P.size) + ") ", 1),
                  o("div", bl, y(s(Dt)(P.name, 16)) + " (" + y(P.size) + ") ", 1),
                  o("div", {
                    class: J(["vuefinder__upload-modal__file-status", s(j)(P)])
                  }, [
                    le(y(P.statusName) + " ", 1),
                    P.status === s(f).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), p("b", kl, y(P.percent), 1)) : T("", !0)
                  ], 2)
                ]),
                o("button", {
                  type: "button",
                  class: J(["vuefinder__upload-modal__file-remove", s(w) ? "disabled" : ""]),
                  title: s(t)("Delete"),
                  disabled: s(w),
                  onClick: (E) => s(I)(P)
                }, [...k[16] || (k[16] = [
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
                ])], 10, $l)
              ]))), 128)),
              s(F).length ? T("", !0) : (u(), p("div", xl, y(s(t)("No files selected!")), 1))
            ]),
            s(D).length ? (u(), z(Ft, {
              key: 0,
              error: "",
              onHidden: k[2] || (k[2] = (P) => D.value = "")
            }, {
              default: ne(() => [
                le(y(s(D)), 1)
              ]),
              _: 1
            })) : T("", !0)
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
}), El = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ml(i, e) {
  return u(), p("svg", El, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const In = { render: Ml }, Tl = { class: "vuefinder__unarchive-modal__content" }, Il = { class: "vuefinder__unarchive-modal__items" }, Al = {
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
}, Bl = { class: "vuefinder__unarchive-modal__item-name" }, Vl = { class: "vuefinder__unarchive-modal__info" }, Ht = /* @__PURE__ */ Z({
  __name: "ModalUnarchive",
  setup(i) {
    const e = ee(), t = e.fs, n = G(t.path), { t: a } = e.i18n, d = M(e.modal.data.items[0]), l = M([]), r = () => {
      e.adapter.unarchive({
        item: d.value.path,
        path: n.value.path
      }).then((c) => {
        re.success(a("The file unarchived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        re.error(Ee(c, a("Failed to unarchive")));
      });
    };
    return (c, _) => (u(), z(Ie, null, {
      buttons: ne(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(a)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[0] || (_[0] = (g) => s(e).modal.close())
        }, y(s(a)("Cancel")), 1)
      ]),
      default: ne(() => [
        o("div", null, [
          V(Oe, {
            icon: s(In),
            title: s(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", Tl, [
            o("div", Il, [
              (u(!0), p(fe, null, ge(l.value, (g) => (u(), p("p", {
                key: g.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                g.type === "dir" ? (u(), p("svg", Al, [..._[1] || (_[1] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), p("svg", Ol, [..._[2] || (_[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Bl, y(g.basename), 1)
              ]))), 128)),
              o("p", Vl, y(s(a)("The archive will be unarchived at")) + " (" + y(s(n).path) + ") ", 1)
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
function zl(i, e) {
  return u(), p("svg", Ll, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const An = { render: zl }, Rl = { class: "vuefinder__archive-modal__content" }, Nl = { class: "vuefinder__archive-modal__form" }, Ul = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Hl = {
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
}, Kl = { class: "vuefinder__archive-modal__file-name" }, ql = ["placeholder"], jt = /* @__PURE__ */ Z({
  __name: "ModalArchive",
  setup(i) {
    const e = ee(), { t } = e.i18n, n = e.fs, a = G(n.path), d = M(""), l = M(e.modal.data.items), r = () => {
      l.value.length && e.adapter.archive({
        path: a.value.path,
        items: l.value.map(({ path: c, type: _ }) => ({
          path: c,
          type: _
        })),
        name: d.value
      }).then((c) => {
        re.success(t("The file(s) archived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        re.error(Ee(c, t("Failed to archive files")));
      });
    };
    return (c, _) => (u(), z(Ie, null, {
      buttons: ne(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(t)("Archive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (g) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: ne(() => [
        o("div", null, [
          V(Oe, {
            icon: s(An),
            title: s(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", Rl, [
            o("div", Nl, [
              o("div", Ul, [
                (u(!0), p(fe, null, ge(l.value, (g) => (u(), p("p", {
                  key: g.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  g.type === "dir" ? (u(), p("svg", Hl, [..._[2] || (_[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), p("svg", jl, [..._[3] || (_[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Kl, y(g.basename), 1)
                ]))), 128))
              ]),
              me(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (g) => d.value = g),
                class: "vuefinder__archive-modal__input",
                placeholder: s(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: nt(r, ["enter"])
              }, null, 40, ql), [
                [ot, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Wl = { class: "vuefinder__about-modal__content" }, Gl = { class: "vuefinder__about-modal__main" }, Yl = { class: "vuefinder__about-modal__shortcuts" }, Ql = { class: "vuefinder__about-modal__shortcut" }, Xl = {
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
  setup(i) {
    const e = ee(), { enabled: t } = Le(), { t: n } = e.i18n;
    return (a, d) => (u(), z(Ie, null, {
      buttons: ne(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: d[0] || (d[0] = (l) => s(e).modal.close())
        }, y(s(n)("Close")), 1)
      ]),
      default: ne(() => [
        o("div", Wl, [
          V(Oe, {
            icon: s(hn),
            title: s(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          o("div", Gl, [
            o("div", Yl, [
              o("div", Ql, [
                o("div", null, y(s(n)("Refresh")), 1),
                d[1] || (d[1] = o("div", null, [
                  o("kbd", null, "⌘"),
                  le(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              s(t)("rename") ? (u(), p("div", Xl, [
                o("div", null, y(s(n)("Rename")), 1),
                d[2] || (d[2] = o("div", null, [
                  o("kbd", null, "⌘"),
                  le(" + "),
                  o("kbd", null, "Shift"),
                  le(" + "),
                  o("kbd", null, "R")
                ], -1))
              ])) : T("", !0),
              s(t)("delete") ? (u(), p("div", Jl, [
                o("div", null, y(s(n)("Delete")), 1),
                d[3] || (d[3] = o("kbd", null, "Del", -1))
              ])) : T("", !0),
              o("div", Zl, [
                o("div", null, y(s(n)("Escape")), 1),
                d[4] || (d[4] = o("kbd", null, "Esc", -1))
              ]),
              o("div", ed, [
                o("div", null, y(s(n)("Select All")), 1),
                d[5] || (d[5] = o("div", null, [
                  o("kbd", null, "⌘"),
                  le(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              s(t)("copy") ? (u(), p("div", td, [
                o("div", null, y(s(n)("Cut")), 1),
                d[6] || (d[6] = o("div", null, [
                  o("kbd", null, "⌘"),
                  le(" + "),
                  o("kbd", null, "X")
                ], -1))
              ])) : T("", !0),
              s(t)("copy") ? (u(), p("div", nd, [
                o("div", null, y(s(n)("Copy")), 1),
                d[7] || (d[7] = o("div", null, [
                  o("kbd", null, "⌘"),
                  le(" + "),
                  o("kbd", null, "C")
                ], -1))
              ])) : T("", !0),
              s(t)("copy") ? (u(), p("div", od, [
                o("div", null, y(s(n)("Paste")), 1),
                d[8] || (d[8] = o("div", null, [
                  o("kbd", null, "⌘"),
                  le(" + "),
                  o("kbd", null, "V")
                ], -1))
              ])) : T("", !0),
              s(t)("search") ? (u(), p("div", sd, [
                o("div", null, y(s(n)("Search")), 1),
                d[9] || (d[9] = o("div", null, [
                  o("kbd", null, "⌘"),
                  le(" + "),
                  o("kbd", null, "F")
                ], -1))
              ])) : T("", !0),
              o("div", id, [
                o("div", null, y(s(n)("Toggle Sidebar")), 1),
                d[10] || (d[10] = o("div", null, [
                  o("kbd", null, "⌘"),
                  le(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", ad, [
                o("div", null, y(s(n)("Open Settings")), 1),
                d[11] || (d[11] = o("div", null, [
                  o("kbd", null, "⌘"),
                  le(" + "),
                  o("kbd", null, "S")
                ], -1))
              ]),
              s(t)("fullscreen") ? (u(), p("div", rd, [
                o("div", null, y(s(n)("Toggle Full Screen")), 1),
                d[12] || (d[12] = o("div", null, [
                  o("kbd", null, "⌘"),
                  le(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ])) : T("", !0),
              s(t)("preview") ? (u(), p("div", ld, [
                o("div", null, y(s(n)("Preview")), 1),
                d[13] || (d[13] = o("kbd", null, "Space", -1))
              ])) : T("", !0)
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
  setup(i) {
    const e = ee(), { enabled: t } = Le(), { t: n } = e?.i18n || { t: (f) => f }, a = e?.fs, d = e?.config, l = G(d.state), r = G(a.selectedItems), c = G(a?.storages || []), _ = M(null), g = M(!1), h = H(() => window.opener !== null || window.name !== "" || window.history.length <= 1), v = H(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(Nt, { items: r.value }),
            enabled: () => t("newfolder")
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(Mn, { items: r.value }),
            enabled: () => t("newfile")
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(Ut, { items: r.value }),
            enabled: () => t("upload")
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(Rt),
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
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(Ht, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && t("unarchive")
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(gt, {
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
                  const f = e?.fs, b = {
                    storage: f?.path?.get()?.storage || "",
                    path: f?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(Ye, { items: { from: r.value, to: b } });
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
                await tt(f.path);
              } else {
                const f = a?.path?.get();
                f?.path && await tt(f.path);
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
                b && await Ma(b);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(mt, { items: r.value });
            },
            enabled: () => r.value.length === 1 && t("rename")
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(ht, { items: r.value });
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
                  const I = Ee(x, n("Failed to navigate to folder"));
                  re.error(I), e.fs.setLoading(!1);
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
            action: () => e?.modal?.open(Dn),
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
            action: () => e?.modal?.open(mn),
            enabled: () => !0
          }
        ]
      }
    ]), $ = (f) => {
      _.value === f ? D() : (_.value = f, g.value = !0);
    }, F = (f) => {
      g.value && (_.value = f);
    }, D = () => {
      _.value = null, g.value = !1;
    }, w = (f) => {
      D(), f();
    }, m = (f) => {
      f.target.closest(".vuefinder__menubar") || D();
    };
    return _e(() => {
      document.addEventListener("click", m);
    }), Pe(() => {
      document.removeEventListener("click", m);
    }), (f, b) => (u(), p("div", {
      class: "vuefinder__menubar",
      onClick: b[0] || (b[0] = ce(() => {
      }, ["stop"]))
    }, [
      o("div", cd, [
        (u(!0), p(fe, null, ge(v.value, (S) => (u(), p("div", {
          key: S.id,
          class: J(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": _.value === S.id }]),
          onClick: (x) => $(S.id),
          onMouseenter: (x) => F(S.id)
        }, [
          o("span", vd, y(S.label), 1),
          _.value === S.id ? (u(), p("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (x) => F(S.id)
          }, [
            (u(!0), p(fe, null, ge(S.items, (x) => (u(), p("div", {
              key: x.id || x.type,
              class: J(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": x.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": x.enabled && !x.enabled(),
                "vuefinder__menubar__dropdown__item--checked": x.checked && x.checked()
              }]),
              onClick: ce((I) => x.type !== "separator" && x.enabled && x.enabled() ? w(x.action) : null, ["stop"])
            }, [
              x.type !== "separator" ? (u(), p("span", pd, y(x.label), 1)) : T("", !0),
              x.checked && x.checked() ? (u(), p("span", hd, " ✓ ")) : T("", !0)
            ], 10, _d))), 128))
          ], 40, fd)) : T("", !0)
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
function wd(i, e) {
  return u(), p("svg", gd, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const yd = { render: wd }, bd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function kd(i, e) {
  return u(), p("svg", bd, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const $d = { render: kd }, xd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Sd(i, e) {
  return u(), p("svg", xd, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Cd = { render: Sd }, Fd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Dd(i, e) {
  return u(), p("svg", Fd, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Pd = { render: Dd }, Ed = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Md(i, e) {
  return u(), p("svg", Ed, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Td = { render: Md }, Id = { class: "vuefinder__toolbar" }, Ad = { class: "vuefinder__toolbar__actions" }, Od = ["title"], Bd = ["title"], Vd = ["title"], Ld = ["title"], zd = ["title"], Rd = ["title"], Nd = ["title"], Ud = { class: "vuefinder__toolbar__controls" }, Hd = ["title"], jd = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Kd = ["title"], qd = { class: "relative" }, Wd = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Gd = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Yd = { class: "vuefinder__toolbar__dropdown-content" }, Qd = { class: "vuefinder__toolbar__dropdown-section" }, Xd = { class: "vuefinder__toolbar__dropdown-label" }, Jd = { class: "vuefinder__toolbar__dropdown-row" }, Zd = { value: "name" }, ec = { value: "size" }, tc = { value: "modified" }, nc = { value: "" }, oc = { value: "asc" }, sc = { value: "desc" }, ic = { class: "vuefinder__toolbar__dropdown-section" }, ac = { class: "vuefinder__toolbar__dropdown-label" }, rc = { class: "vuefinder__toolbar__dropdown-options" }, lc = { class: "vuefinder__toolbar__dropdown-option" }, dc = { class: "vuefinder__toolbar__option-text" }, cc = { class: "vuefinder__toolbar__dropdown-option" }, uc = { class: "vuefinder__toolbar__option-text" }, vc = { class: "vuefinder__toolbar__dropdown-option" }, fc = { class: "vuefinder__toolbar__option-text" }, _c = { class: "vuefinder__toolbar__dropdown-toggle" }, pc = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, hc = { class: "vuefinder__toolbar__dropdown-reset" }, mc = ["title"], gc = ["title"], wc = /* @__PURE__ */ Z({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(i) {
    const e = ee(), { enabled: t } = Le(), { t: n } = e.i18n, a = e.fs, d = e.config, l = G(d.state), r = G(a.selectedItems), c = G(a.sort), _ = G(a.filter);
    de(
      () => l.value.fullScreen,
      () => {
        if (l.value.fullScreen) {
          const w = document.querySelector("body");
          w && (w.style.overflow = "hidden");
        } else {
          const w = document.querySelector("body");
          w && (w.style.overflow = "");
        }
        e.emitter.emit("vf-fullscreen-toggle");
      }
    );
    const g = M(!1), h = (w) => {
      w.target.closest(".vuefinder__toolbar__dropdown-container") || (g.value = !1);
    };
    _e(() => {
      document.addEventListener("click", h);
    }), Pe(() => {
      document.removeEventListener("click", h);
    });
    const v = M({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: l.value.showHiddenFiles
      // Initialize with config store default
    });
    de(
      () => v.value.sortBy,
      (w) => {
        if (!v.value.sortOrder) {
          a.clearSort();
          return;
        }
        w === "name" ? a.setSort("basename", v.value.sortOrder) : w === "size" ? a.setSort("file_size", v.value.sortOrder) : w === "modified" && a.setSort("last_modified", v.value.sortOrder);
      }
    ), de(
      () => v.value.sortOrder,
      (w) => {
        if (!w) {
          a.clearSort();
          return;
        }
        v.value.sortBy === "name" ? a.setSort("basename", w) : v.value.sortBy === "size" ? a.setSort("file_size", w) : v.value.sortBy === "modified" && a.setSort("last_modified", w);
      }
    ), de(
      c,
      (w) => {
        w.active ? (w.column === "basename" ? v.value.sortBy = "name" : w.column === "file_size" ? v.value.sortBy = "size" : w.column === "last_modified" && (v.value.sortBy = "modified"), v.value.sortOrder = w.order) : v.value.sortOrder = "";
      },
      { immediate: !0 }
    ), de(
      () => v.value.filterKind,
      (w) => {
        a.setFilter(w, l.value.showHiddenFiles);
      }
    ), de(
      () => v.value.showHidden,
      (w) => {
        d.set("showHiddenFiles", w), a.setFilter(v.value.filterKind, w);
      }
    ), de(
      _,
      (w) => {
        v.value.filterKind = w.kind;
      },
      { immediate: !0 }
    ), de(
      () => l.value.showHiddenFiles,
      (w) => {
        v.value.showHidden = w, a.setFilter(v.value.filterKind, w);
      },
      { immediate: !0 }
    );
    const $ = () => d.set("view", l.value.view === "grid" ? "list" : "grid"), F = H(() => _.value.kind !== "all" || !l.value.showHiddenFiles || c.value.active), D = () => {
      v.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, d.set("showHiddenFiles", !0), a.clearSort(), a.clearFilter();
    };
    return (w, m) => (u(), p("div", Id, [
      o("div", Ad, [
        s(t)("newfolder") ? (u(), p("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("New Folder"),
          onClick: m[0] || (m[0] = (f) => s(e).modal.open(Nt, { items: s(r) }))
        }, [
          V(s(Pn))
        ], 8, Od)) : T("", !0),
        s(t)("newfile") ? (u(), p("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("New File"),
          onClick: m[1] || (m[1] = (f) => s(e).modal.open(Mn, { items: s(r) }))
        }, [
          V(s(En))
        ], 8, Bd)) : T("", !0),
        s(t)("rename") ? (u(), p("div", {
          key: 2,
          class: "mx-1.5",
          title: s(n)("Rename"),
          onClick: m[2] || (m[2] = (f) => s(r).length !== 1 || s(e).modal.open(mt, { items: s(r) }))
        }, [
          V(s(wn), {
            class: J(s(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Vd)) : T("", !0),
        s(t)("delete") ? (u(), p("div", {
          key: 3,
          class: "mx-1.5",
          title: s(n)("Delete"),
          onClick: m[3] || (m[3] = (f) => !s(r).length || s(e).modal.open(ht, { items: s(r) }))
        }, [
          V(s(gn), {
            class: J(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ld)) : T("", !0),
        s(t)("upload") ? (u(), p("div", {
          key: 4,
          class: "mx-1.5",
          title: s(n)("Upload"),
          onClick: m[4] || (m[4] = (f) => s(e).modal.open(Ut, { items: s(r) }))
        }, [
          V(s(Tn))
        ], 8, zd)) : T("", !0),
        s(t)("unarchive") && s(r).length === 1 && s(r)[0].mime_type === "application/zip" ? (u(), p("div", {
          key: 5,
          class: "mx-1.5",
          title: s(n)("Unarchive"),
          onClick: m[5] || (m[5] = (f) => !s(r).length || s(e).modal.open(Ht, { items: s(r) }))
        }, [
          V(s(In), {
            class: J(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Rd)) : T("", !0),
        s(t)("archive") ? (u(), p("div", {
          key: 6,
          class: "mx-1.5",
          title: s(n)("Archive"),
          onClick: m[6] || (m[6] = (f) => !s(r).length || s(e).modal.open(jt, { items: s(r) }))
        }, [
          V(s(An), {
            class: J(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Nd)) : T("", !0)
      ]),
      o("div", Ud, [
        s(t)("search") ? (u(), p("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("Search Files"),
          onClick: m[7] || (m[7] = (f) => s(e).modal.open(Rt))
        }, [
          V(s(zt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Hd)) : T("", !0),
        o("div", jd, [
          o("div", {
            title: s(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: m[8] || (m[8] = (f) => g.value = !g.value)
          }, [
            o("div", qd, [
              V(s(Td), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              F.value ? (u(), p("div", Wd)) : T("", !0)
            ])
          ], 8, Kd),
          g.value ? (u(), p("div", Gd, [
            o("div", Yd, [
              o("div", Qd, [
                o("div", Xd, y(s(n)("Sorting")), 1),
                o("div", Jd, [
                  me(o("select", {
                    "onUpdate:modelValue": m[9] || (m[9] = (f) => v.value.sortBy = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", Zd, y(s(n)("Name")), 1),
                    o("option", ec, y(s(n)("Size")), 1),
                    o("option", tc, y(s(n)("Date")), 1)
                  ], 512), [
                    [St, v.value.sortBy]
                  ]),
                  me(o("select", {
                    "onUpdate:modelValue": m[10] || (m[10] = (f) => v.value.sortOrder = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", nc, y(s(n)("None")), 1),
                    o("option", oc, y(s(n)("Asc")), 1),
                    o("option", sc, y(s(n)("Desc")), 1)
                  ], 512), [
                    [St, v.value.sortOrder]
                  ])
                ])
              ]),
              o("div", ic, [
                o("div", ac, y(s(n)("Show")), 1),
                o("div", rc, [
                  o("label", lc, [
                    me(o("input", {
                      "onUpdate:modelValue": m[11] || (m[11] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [$t, v.value.filterKind]
                    ]),
                    o("span", dc, y(s(n)("All items")), 1)
                  ]),
                  o("label", cc, [
                    me(o("input", {
                      "onUpdate:modelValue": m[12] || (m[12] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [$t, v.value.filterKind]
                    ]),
                    o("span", uc, y(s(n)("Files only")), 1)
                  ]),
                  o("label", vc, [
                    me(o("input", {
                      "onUpdate:modelValue": m[13] || (m[13] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [$t, v.value.filterKind]
                    ]),
                    o("span", fc, y(s(n)("Folders only")), 1)
                  ])
                ])
              ]),
              o("div", _c, [
                o("label", pc, y(s(n)("Show hidden files")), 1),
                me(o("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": m[14] || (m[14] = (f) => v.value.showHidden = f),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Pt, v.value.showHidden]
                ])
              ]),
              o("div", hc, [
                o("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: D
                }, y(s(n)("Reset")), 1)
              ])
            ])
          ])) : T("", !0)
        ]),
        s(t)("fullscreen") ? (u(), p("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("Toggle Full Screen"),
          onClick: m[15] || (m[15] = (f) => s(d).toggle("fullScreen"))
        }, [
          s(l).fullScreen ? (u(), z(s($d), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), z(s(yd), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, mc)) : T("", !0),
        o("div", {
          class: "mx-1.5",
          title: s(n)("Change View"),
          onClick: m[16] || (m[16] = (f) => $())
        }, [
          s(l).view === "grid" ? (u(), z(s(Cd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : T("", !0),
          s(l).view === "list" ? (u(), z(s(Pd), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : T("", !0)
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
function bc(i, e) {
  return u(), p("svg", yc, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const kc = { render: bc }, $c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function xc(i, e) {
  return u(), p("svg", $c, [...e[0] || (e[0] = [
    o("path", {
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
function Fc(i, e) {
  return u(), p("svg", Cc, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Dc = { render: Fc }, Pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Ec(i, e) {
  return u(), p("svg", Pc, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Mc = { render: Ec }, Tc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ic(i, e) {
  return u(), p("svg", Tc, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ac = { render: Ic }, Oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Bc(i, e) {
  return u(), p("svg", Oc, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Vc = { render: Bc }, Lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function zc(i, e) {
  return u(), p("svg", Lc, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Rc = { render: zc };
function st(i, e = []) {
  const t = "vfDragEnterCounter", n = i.fs, a = G(n.selectedItems);
  function d(h, v) {
    return !!(!h || h.type !== "dir" || h.path.startsWith(v) || a.value.some((F) => F.path === v ? !1 : !!h.path.startsWith(F.path)));
  }
  function l(h, v) {
    if (h.isExternalDrag)
      return;
    if (!(i.features?.move ?? !1)) {
      h.dataTransfer && (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none");
      return;
    }
    h.preventDefault();
    const F = n.getDraggedItem();
    d(v, F) ? h.dataTransfer && (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none") : (h.dataTransfer && (h.dataTransfer.dropEffect = "copy", h.dataTransfer.effectAllowed = "all"), h.currentTarget.classList.add(...e));
  }
  function r(h) {
    if (h.isExternalDrag || !(i.features?.move ?? !1))
      return;
    h.preventDefault();
    const $ = h.currentTarget, F = Number($.dataset[t] || 0);
    $.dataset[t] = String(F + 1);
  }
  function c(h) {
    if (h.isExternalDrag || !(i.features?.move ?? !1))
      return;
    h.preventDefault();
    const $ = h.currentTarget, D = Number($.dataset[t] || 0) - 1;
    D <= 0 ? (delete $.dataset[t], $.classList.remove(...e)) : $.dataset[t] = String(D);
  }
  function _(h, v) {
    if (h.isExternalDrag || !(i.features?.move ?? !1) || !v) return;
    h.preventDefault();
    const F = h.currentTarget;
    delete F.dataset[t], F.classList.remove(...e);
    const D = h.dataTransfer?.getData("items") || "[]", m = JSON.parse(D).map(
      (f) => n.sortedFiles.get().find((b) => b.path === f)
    );
    n.clearDraggedItem(), i.modal.open(Ye, { items: { from: m, to: v } });
  }
  function g(h) {
    return {
      dragover: (v) => l(v, h),
      dragenter: r,
      dragleave: c,
      drop: (v) => _(v, h)
    };
  }
  return { events: g };
}
const Nc = { class: "vuefinder__breadcrumb__container" }, Uc = ["title"], Hc = ["title"], jc = ["title"], Kc = ["title"], qc = { class: "vuefinder__breadcrumb__path-container" }, Wc = { class: "vuefinder__breadcrumb__list" }, Gc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Yc = { class: "relative" }, Qc = ["title", "onClick"], Xc = ["title"], Jc = { class: "vuefinder__breadcrumb__path-mode" }, Zc = { class: "vuefinder__breadcrumb__path-mode-content" }, eu = ["title"], tu = { class: "vuefinder__breadcrumb__path-text" }, nu = ["title"], ou = ["data-theme"], su = ["onClick"], iu = { class: "vuefinder__breadcrumb__hidden-item-content" }, au = { class: "vuefinder__breadcrumb__hidden-item-text" }, ru = /* @__PURE__ */ Z({
  __name: "Breadcrumb",
  setup(i) {
    const e = ee(), { t } = e.i18n, n = e.fs, a = e.config, d = G(a.state), l = G(n.path), r = G(n.loading), c = M(null), _ = $n(0, 100), g = M(5), h = M(!1), v = M(!1), $ = H(() => l.value?.breadcrumb ?? []);
    function F(N, C) {
      return N.length > C ? [N.slice(-C), N.slice(0, -C)] : [N, []];
    }
    const D = H(
      () => F($.value, g.value)[0]
    ), w = H(
      () => F($.value, g.value)[1]
    );
    de(_, () => {
      if (!c.value) return;
      const N = c.value.children;
      let C = 0, k = 0;
      const P = 5, E = 1;
      g.value = P, Ve(() => {
        for (let U = N.length - 1; U >= 0; U--) {
          const X = N[U];
          if (C + X.offsetWidth > _.value - 40)
            break;
          C += parseInt(X.offsetWidth.toString(), 10), k++;
        }
        k < E && (k = E), k > P && (k = P), g.value = k;
      });
    });
    const m = () => {
      c.value && (_.value = c.value.offsetWidth);
    }, f = M(null);
    _e(() => {
      f.value = new ResizeObserver(m), c.value && f.value.observe(c.value);
    }), Pe(() => {
      f.value && f.value.disconnect();
    });
    const b = st(e, ["vuefinder__drag-over"]);
    function S(N = null) {
      N ??= $.value.length - 2;
      const C = {
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
      return $.value[N] ?? C;
    }
    const x = () => {
      e.adapter.invalidateListQuery(l.value.path), e.adapter.open(l.value.path);
    }, I = () => {
      D.value.length > 0 && e.adapter.open(
        $.value[$.value.length - 2]?.path ?? (l.value?.storage ?? "local") + "://"
      );
    }, B = (N) => {
      e.adapter.open(N.path), h.value = !1;
    }, Q = () => {
      h.value && (h.value = !1);
    }, j = {
      mounted(N, C) {
        N.clickOutsideEvent = function(k) {
          N === k.target || N.contains(k.target) || C.value();
        }, document.body.addEventListener("click", N.clickOutsideEvent);
      },
      beforeUnmount(N) {
        document.body.removeEventListener("click", N.clickOutsideEvent);
      }
    }, oe = () => {
      a.toggle("showTreeView");
    }, ie = M({
      x: 0,
      y: 0
    }), he = (N, C = null) => {
      if (N.currentTarget instanceof HTMLElement) {
        const { x: k, y: P, height: E } = N.currentTarget.getBoundingClientRect();
        ie.value = { x: k, y: P + E };
      }
      h.value = C ?? !h.value;
    }, A = () => {
      v.value = !v.value;
    }, Y = async () => {
      await tt(l.value?.path || ""), re.success(t("Path copied to clipboard"));
    }, K = () => {
      v.value = !1;
    };
    return (N, C) => (u(), p("div", Nc, [
      o("span", {
        title: s(t)("Toggle Tree View")
      }, [
        V(s(Vc), {
          class: J(["vuefinder__breadcrumb__toggle-tree", s(d).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: oe
        }, null, 8, ["class"])
      ], 8, Uc),
      o("span", {
        title: s(t)("Go up a directory")
      }, [
        V(s(Sc), Be({
          class: $.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, Ke($.value.length ? s(b).events(S()) : {}), { onClick: I }), null, 16, ["class"])
      ], 8, Hc),
      s(n).isLoading() ? (u(), p("span", {
        key: 1,
        title: s(t)("Cancel")
      }, [
        V(s(Dc), {
          onClick: C[0] || (C[0] = (k) => s(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Kc)) : (u(), p("span", {
        key: 0,
        title: s(t)("Refresh")
      }, [
        V(s(kc), { onClick: x })
      ], 8, jc)),
      me(o("div", qc, [
        o("div", null, [
          V(s(Mc), Be({ class: "vuefinder__breadcrumb__home-icon" }, Ke(s(b).events(S(-1))), {
            onClick: C[1] || (C[1] = ce((k) => s(e).adapter.open(s(l).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", Wc, [
          w.value.length ? me((u(), p("div", Gc, [
            C[3] || (C[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", Yc, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: C[2] || (C[2] = (k) => he(k, !0)),
                onClick: ce(he, ["stop"])
              }, [
                V(s(Fn), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [j, Q]
          ]) : T("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), p(fe, null, ge(D.value, (k, P) => (u(), p("div", { key: P }, [
            C[4] || (C[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", Be({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: k.basename
            }, Ke(s(b).events(k), !0), {
              onClick: ce((E) => s(e).adapter.open(k.path), ["stop"])
            }), y(k.name), 17, Qc)
          ]))), 128))
        ], 512),
        s(a).get("loadingIndicator") === "circular" && s(r) ? (u(), z(s(bt), { key: 0 })) : T("", !0),
        o("span", {
          title: s(t)("Toggle Path Copy Mode"),
          onClick: A
        }, [
          V(s(Rc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Xc)
      ], 512), [
        [Ne, !v.value]
      ]),
      me(o("div", Jc, [
        o("div", Zc, [
          o("div", {
            title: s(t)("Copy Path")
          }, [
            V(s(bn), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: Y
            })
          ], 8, eu),
          o("div", tu, y(s(l).path), 1),
          o("div", {
            title: s(t)("Exit")
          }, [
            V(s(Ac), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: K
            })
          ], 8, nu)
        ])
      ], 512), [
        [Ne, v.value]
      ]),
      (u(), z(_t, { to: "body" }, [
        o("div", null, [
          me(o("div", {
            style: Ue({
              position: "absolute",
              top: ie.value.y + "px",
              left: ie.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": s(e).theme.current
          }, [
            (u(!0), p(fe, null, ge(w.value, (k, P) => (u(), p("div", Be({
              key: P,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Ke(s(b).events(k), !0), {
              onClick: (E) => B(k)
            }), [
              o("div", iu, [
                o("span", null, [
                  V(s(ze), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", au, y(k.name), 1)
              ])
            ], 16, su))), 128))
          ], 12, ou), [
            [Ne, h.value]
          ])
        ])
      ]))
    ]));
  }
});
function lu(i, e) {
  const {
    scrollContainer: t,
    itemWidth: n = 100,
    rowHeight: a,
    overscan: d = 2,
    containerPadding: l = 48,
    lockItemsPerRow: r
  } = e, c = i, _ = () => typeof a == "number" ? a : a.value, g = M(0), h = M(6), v = M(600);
  let $ = null;
  const F = H(() => Math.ceil(c.value.length / h.value)), D = H(() => F.value * _()), w = H(() => {
    const j = _(), oe = Math.max(0, Math.floor(g.value / j) - d), ie = Math.min(
      F.value,
      Math.ceil((g.value + v.value) / j) + d
    );
    return { start: oe, end: ie };
  }), m = H(() => {
    const { start: j, end: oe } = w.value;
    return Array.from({ length: oe - j }, (ie, he) => j + he);
  }), f = () => v.value, b = () => r.value, S = () => {
    if (b()) {
      h.value = 1;
      return;
    }
    if (t.value) {
      const j = t.value.clientWidth - l;
      h.value = Math.max(Math.floor(j / n), 2);
    }
  }, x = (j) => {
    const oe = j.target;
    g.value = oe.scrollTop;
  };
  de(
    () => c.value.length,
    () => {
      S();
    }
  );
  const I = (j, oe) => {
    if (!j || !Array.isArray(j))
      return [];
    const ie = oe * h.value;
    return j.slice(ie, ie + h.value);
  }, B = (j, oe, ie, he, A) => {
    if (!j || !Array.isArray(j))
      return [];
    const Y = [];
    for (let K = oe; K <= ie; K++)
      for (let N = he; N <= A; N++) {
        const C = K * h.value + N;
        C < j.length && j[C] && Y.push(j[C]);
      }
    return Y;
  }, Q = (j) => ({
    row: Math.floor(j / h.value),
    col: j % h.value
  });
  return _e(async () => {
    await Ve(), t.value && (v.value = t.value.clientHeight || 600), S(), window.addEventListener("resize", () => {
      t.value && (v.value = t.value.clientHeight || 600), S();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((j) => {
      const oe = j[0];
      oe && (v.value = Math.round(oe.contentRect.height)), S();
    }), $.observe(t.value));
  }), Pe(() => {
    window.removeEventListener("resize", S), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: g,
    itemsPerRow: h,
    totalRows: F,
    totalHeight: D,
    visibleRange: w,
    visibleRows: m,
    updateItemsPerRow: S,
    handleScroll: x,
    getRowItems: I,
    getItemsInRange: B,
    getItemPosition: Q,
    getContainerHeight: f
  };
}
function du(i) {
  const { getItemPosition: e, getItemsInRange: t, getKey: n, selectionObject: a, rowHeight: d, itemWidth: l } = i, r = Math.floor(Math.random() * 2 ** 32).toString(), c = ee(), _ = c.fs, g = G(_.selectedKeys), h = G(_.sortedFiles), v = M(/* @__PURE__ */ new Set()), $ = M(!1), F = M(!1), D = M(null), w = (C) => C.map((k) => k.getAttribute("data-key")).filter((k) => !!k), m = (C) => {
    C.selection.clearSelection(!0, !0);
  }, f = (C) => {
    if (g.value && g.value.size > 0) {
      const k = document.querySelectorAll(`.file-item-${r}[data-key]`), P = /* @__PURE__ */ new Map();
      k.forEach((E) => {
        const U = E.getAttribute("data-key");
        U && P.set(U, E);
      }), g.value.forEach((E) => {
        const U = P.get(E);
        U && b(E) && C.selection.select(U, !0);
      });
    }
  }, b = (C) => {
    const k = h.value?.find((U) => n(U) === C);
    if (!k) return !1;
    const P = c.selectionFilterType, E = c.selectionFilterMimeIncludes;
    return P === "files" && k.type === "dir" || P === "dirs" && k.type === "file" ? !1 : E && Array.isArray(E) && E.length > 0 ? k.type === "dir" ? !0 : k.mime_type ? E.some((U) => k.mime_type?.startsWith(U)) : !1 : !0;
  }, S = (C) => {
    if (C.size === 0)
      return null;
    const k = /* @__PURE__ */ new Map();
    h.value && h.value.forEach((ue, ve) => {
      k.set(n(ue), ve);
    });
    const E = Array.from(C).map((ue) => {
      const ve = k.get(ue) ?? -1;
      return ve >= 0 ? e(ve) : null;
    }).filter((ue) => ue !== null);
    if (E.length === 0)
      return null;
    const U = E[0], X = E.reduce((ue, ve) => ve.row < ue ? ve.row : ue, U.row), we = E.reduce((ue, ve) => ve.row > ue ? ve.row : ue, U.row), ke = E.reduce((ue, ve) => ve.col < ue ? ve.col : ue, U.col), Re = E.reduce((ue, ve) => ve.col > ue ? ve.col : ue, U.col);
    return { minRow: X, maxRow: we, minCol: ke, maxCol: Re };
  }, x = (C) => {
    if (c.selectionMode === "single")
      return !1;
    $.value = !1, !C.event?.metaKey && !C.event?.ctrlKey && (F.value = !0), C.selection.resolveSelectables(), m(C), f(C);
  }, I = M(0), B = (C) => {
    const k = C;
    if (k && "touches" in k) {
      const P = k.touches?.[0];
      if (P) return { x: P.clientX, y: P.clientY };
    }
    if (k && "changedTouches" in k) {
      const P = k.changedTouches?.[0];
      if (P) return { x: P.clientX, y: P.clientY };
    }
    if (k && "clientX" in k && "clientY" in k) {
      const P = k;
      return { x: P.clientX, y: P.clientY };
    }
    return null;
  }, Q = ({ event: C, selection: k }) => {
    I.value = (a.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const P = document.querySelector(
      ".selection-area-container"
    );
    if (P && (P.dataset.theme = c.theme.current), c.selectionMode === "single")
      return;
    const E = C;
    E && "type" in E && E.type === "touchend" && E.preventDefault();
    const U = C;
    if (!U?.ctrlKey && !U?.metaKey && (_.clearSelection(), k.clearSelection(!0, !0)), v.value.clear(), a.value) {
      const X = a.value.getSelectables()[0]?.closest(".scroller-" + r);
      if (X) {
        const we = X.getBoundingClientRect(), ke = B(C);
        if (ke) {
          const Re = ke.y - we.top + X.scrollTop, ue = ke.x - we.left, ve = Math.floor(Re / d.value), pe = Math.floor(ue / l);
          D.value = { row: ve, col: pe };
        }
      }
    }
  }, j = (C) => {
    if (c.selectionMode === "single")
      return;
    const k = w(C.store.changed.added), P = w(C.store.changed.removed);
    F.value = !1, $.value = !0, k.forEach((E) => {
      g.value && !g.value.has(E) && b(E) && (v.value.add(E), _.select(E, c.selectionMode || "multiple"));
    }), P.forEach((E) => {
      document.querySelector(`[data-key="${E}"]`) && h.value?.find((X) => n(X) === E) && v.value.delete(E), _.deselect(E);
    }), C.selection.resolveSelectables(), f(C);
  }, oe = () => {
    v.value.clear();
  }, ie = (C) => {
    if (C.event && D.value && v.value.size > 0) {
      const k = /* @__PURE__ */ new Map();
      h.value && h.value.forEach((U, X) => {
        k.set(n(U), X);
      });
      const E = Array.from(v.value).map((U) => {
        const X = k.get(U) ?? -1;
        return X >= 0 ? e(X) : null;
      }).filter((U) => U !== null);
      if (E.length > 0) {
        const U = [...E, D.value], X = U[0], we = {
          minRow: U.reduce((pe, ye) => ye.row < pe ? ye.row : pe, X.row),
          maxRow: U.reduce((pe, ye) => ye.row > pe ? ye.row : pe, X.row),
          minCol: U.reduce((pe, ye) => ye.col < pe ? ye.col : pe, X.col),
          maxCol: U.reduce((pe, ye) => ye.col > pe ? ye.col : pe, X.col)
        }, ke = t(
          h.value || [],
          we.minRow,
          we.maxRow,
          we.minCol,
          we.maxCol
        ), Re = document.querySelectorAll(`.file-item-${r}[data-key]`), ue = /* @__PURE__ */ new Map();
        Re.forEach((pe) => {
          const ye = pe.getAttribute("data-key");
          ye && ue.set(ye, pe);
        });
        const ve = [];
        if (ke.forEach((pe) => {
          const ye = n(pe);
          ue.get(ye) || ve.push(ye);
        }), ve.length > 0) {
          const pe = c.selectionMode || "multiple";
          _.selectMultiple(ve, pe);
        }
      }
    }
  }, he = (C) => {
    ie(C), m(C), f(C), _.setSelectedCount(g.value?.size || 0), $.value = !1, D.value = null;
  }, A = () => {
    a.value = new Jn({
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
    }), a.value.on("beforestart", x), a.value.on("start", Q), a.value.on("move", j), a.value.on("stop", he);
  }, Y = () => {
    a.value && (a.value.destroy(), a.value = null);
  }, K = () => {
    a.value && (Array.from(
      g.value ?? /* @__PURE__ */ new Set()
    ).forEach((k) => {
      b(k) || _.deselect(k);
    }), Y(), A());
  }, N = (C) => {
    F.value && (a.value?.clearSelection(), oe(), F.value = !1);
    const k = C;
    !v.value.size && !F.value && !k?.ctrlKey && !k?.metaKey && (_.clearSelection(), a.value?.clearSelection());
  };
  return _e(() => {
    const C = (k) => {
      !k.buttons && $.value && ($.value = !1);
    };
    document.addEventListener("dragleave", C), Pe(() => {
      document.removeEventListener("dragleave", C);
    });
  }), {
    isDragging: $,
    selectionStarted: F,
    explorerId: r,
    extractIds: w,
    cleanupSelection: m,
    refreshSelection: f,
    getSelectionRange: S,
    selectSelectionRange: ie,
    initializeSelectionArea: A,
    destroySelectionArea: Y,
    updateSelectionArea: K,
    handleContentClick: N
  };
}
const cu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function uu(i, e) {
  return u(), p("svg", cu, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const vu = { render: uu }, fu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function _u(i, e) {
  return u(), p("svg", fu, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const pu = { render: _u }, xt = /* @__PURE__ */ Z({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(i) {
    return (e, t) => (u(), p("div", null, [
      i.direction === "asc" ? (u(), z(s(vu), { key: 0 })) : T("", !0),
      i.direction === "desc" ? (u(), z(s(pu), { key: 1 })) : T("", !0)
    ]));
  }
}), hu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function mu(i, e) {
  return u(), p("svg", hu, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Zt = { render: mu }, gu = { class: "vuefinder__drag-item__container" }, wu = { class: "vuefinder__drag-item__count" }, yu = /* @__PURE__ */ Z({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(i) {
    const e = i;
    return (t, n) => (u(), p("div", gu, [
      e.count > 1 ? (u(), z(s(Zt), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : T("", !0),
      V(s(Zt), { class: "vuefinder__drag-item__icon" }),
      o("div", wu, y(e.count), 1)
    ]));
  }
}), bu = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, en = /* @__PURE__ */ Z({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(i) {
    const e = i, t = ee(), n = G(t.config.state), a = {
      app: t,
      config: n.value,
      item: e.item
    };
    return (d, l) => (u(), p("div", {
      class: J(["vuefinder__item-icon", i.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      Ce(d.$slots, "icon", qe(We(a)), () => [
        i.item.type === "dir" ? (u(), z(s(ze), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), z(s(et), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        i.ext && i.item.type !== "dir" && i.item.extension ? (u(), p("div", bu, y(i.item.extension.substring(0, 3)), 1)) : T("", !0)
      ])
    ], 2));
  }
}), ku = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function $u(i, e) {
  return u(), p("svg", ku, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const tn = { render: $u }, xu = ["data-key", "data-row", "data-col", "draggable"], Su = { key: 0 }, Cu = { class: "vuefinder__explorer__item-grid-content" }, Fu = ["data-src", "alt"], Du = { class: "vuefinder__explorer__item-title" }, Pu = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Eu = { class: "vuefinder__explorer__item-list-name" }, Mu = { class: "vuefinder__explorer__item-list-icon" }, Tu = { class: "vuefinder__explorer__item-name" }, Iu = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Au = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Ou = { key: 0 }, Bu = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Vu = /* @__PURE__ */ Z({
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
    const t = i, n = e, a = ee(), d = a.fs, l = a.config, r = H(() => {
      const b = a.selectionFilterType;
      return !b || b === "both" ? !0 : b === "files" && t.item.type === "file" || b === "dirs" && t.item.type === "dir";
    }), c = H(() => {
      const b = a.selectionFilterMimeIncludes;
      return !b || !b.length || t.item.type === "dir" ? !0 : t.item.mime_type ? b.some((S) => t.item.mime_type?.startsWith(S)) : !1;
    }), _ = H(() => r.value && c.value), g = H(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), h = H(() => ({
      opacity: t.isDragging || d.isCut(t.item.path) || !_.value ? 0.5 : ""
    }));
    let v = null;
    const $ = M(null);
    let F = !1;
    const { enabled: D } = Le(), w = H(() => D("move")), m = () => {
      v && clearTimeout(v);
    }, f = (b) => {
      if (v && (b.preventDefault(), clearTimeout(v)), !F)
        F = !0, n("click", b), $.value = setTimeout(() => {
          F = !1;
        }, 300);
      else
        return F = !1, n("dblclick", b), v && clearTimeout(v), !1;
      if (b.currentTarget && b.currentTarget instanceof HTMLElement) {
        const S = b.currentTarget.getBoundingClientRect();
        b.preventDefault(), v = setTimeout(() => {
          let B = S.y + S.height;
          B + 146 > window.innerHeight - 10 && (B = S.y - 146), B < 10 && (B = 10);
          const Q = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: S.x,
            clientY: B
          });
          b.target?.dispatchEvent(Q);
        }, 300);
      }
    };
    return (b, S) => (u(), p("div", {
      class: J(g.value),
      style: Ue(h.value),
      "data-key": i.item.path,
      "data-row": i.rowIndex,
      "data-col": i.colIndex,
      draggable: w.value,
      onTouchstart: S[1] || (S[1] = (x) => f(x)),
      onTouchend: S[2] || (S[2] = (x) => m()),
      onClick: S[3] || (S[3] = (x) => n("click", x)),
      onDblclick: S[4] || (S[4] = (x) => n("dblclick", x)),
      onContextmenu: S[5] || (S[5] = ce((x) => n("contextmenu", x), ["prevent", "stop"])),
      onDragstart: S[6] || (S[6] = (x) => n("dragstart", x)),
      onDragend: S[7] || (S[7] = (x) => n("dragend", x))
    }, [
      i.view === "grid" ? (u(), p("div", Su, [
        s(d).isReadOnly(i.item) ? (u(), z(s(tn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : T("", !0),
        o("div", Cu, [
          (i.item.mime_type ?? "").startsWith("image") && i.showThumbnails ? (u(), p("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": i.item.previewUrl ?? s(a).adapter.getPreviewUrl({ path: i.item.path }),
            alt: i.item.basename,
            onTouchstart: S[0] || (S[0] = (x) => x.preventDefault())
          }, null, 40, Fu)) : (u(), z(en, {
            key: 1,
            item: i.item,
            ext: !0
          }, {
            icon: ne((x) => [
              Ce(b.$slots, "icon", qe(We(x)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        o("span", Du, y(s(Dt)(i.item.basename)), 1)
      ])) : (u(), p("div", Pu, [
        o("div", Eu, [
          o("div", Mu, [
            V(en, {
              item: i.item,
              small: i.compact
            }, {
              icon: ne((x) => [
                Ce(b.$slots, "icon", qe(We(x)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          o("span", Tu, y(i.item.basename), 1),
          o("div", null, [
            s(d).isReadOnly(i.item) ? (u(), z(s(tn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : T("", !0)
          ])
        ]),
        i.showPath ? (u(), p("div", Iu, y(i.item.path), 1)) : T("", !0),
        i.showPath ? T("", !0) : (u(), p("div", Au, [
          i.item.file_size ? (u(), p("div", Ou, y(s(a).filesize(i.item.file_size)), 1)) : T("", !0)
        ])),
        !i.showPath && i.item.last_modified ? (u(), p("div", Bu, y(new Date(i.item.last_modified * 1e3).toLocaleString()), 1)) : T("", !0)
      ])),
      s(D)("pinned") && s(l).get("pinnedFolders").find((x) => x.path === i.item.path) ? (u(), z(s(At), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : T("", !0)
    ], 46, xu));
  }
}), Lu = ["data-row"], nn = /* @__PURE__ */ Z({
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
    ]), d = H(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), l = H(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (r, c) => (u(), p("div", {
      class: J(a.value),
      "data-row": i.rowIndex,
      style: Ue(d.value)
    }, [
      o("div", {
        class: J(["grid justify-self-start", { "w-full": i.view === "list" }]),
        style: Ue(l.value)
      }, [
        (u(!0), p(fe, null, ge(i.items, (_, g) => (u(), z(Vu, Be({
          key: _.path,
          item: _,
          view: i.view,
          compact: i.compact,
          "show-thumbnails": i.showThumbnails,
          "show-path": i.showPath,
          "is-selected": i.isSelected(_.path),
          "is-dragging": i.isDraggingItem(_.path),
          "row-index": i.rowIndex,
          "col-index": g,
          "explorer-id": i.explorerId
        }, Ke(i.dragNDropEvents(_)), {
          onClick: c[0] || (c[0] = (h) => n("click", h)),
          onDblclick: c[1] || (c[1] = (h) => n("dblclick", h)),
          onContextmenu: c[2] || (c[2] = (h) => n("contextmenu", h)),
          onDragstart: c[3] || (c[3] = (h) => n("dragstart", h)),
          onDragend: c[4] || (c[4] = (h) => n("dragend", h))
        }), {
          icon: ne((h) => [
            Ce(r.$slots, "icon", Be({ ref_for: !0 }, h))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Lu));
  }
}), zu = { class: "vuefinder__explorer__container" }, Ru = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, Nu = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Uu = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Hu = /* @__PURE__ */ Z({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(i) {
    const e = i, t = ee(), n = st(t, ["vuefinder__drag-over"]), a = je("dragImage"), d = on(null), l = je("scrollContainer"), r = je("scrollContent"), c = t.fs, _ = t.config, g = G(_.state), h = G(c.sort), v = G(c.sortedFiles), $ = G(c.selectedKeys), F = G(c.loading), D = (R) => $.value?.has(R) ?? !1;
    let w = null;
    const m = M(null), f = je("customScrollBar"), b = je("customScrollBarContainer"), S = H(() => {
      const R = g.value.view, te = g.value.compactListView;
      return R === "grid" ? 88 : te ? 24 : 50;
    }), { t: x } = t.i18n, {
      itemsPerRow: I,
      totalHeight: B,
      visibleRows: Q,
      handleScroll: j,
      getRowItems: oe,
      getItemsInRange: ie,
      getItemPosition: he,
      updateItemsPerRow: A
    } = lu(
      H(() => v.value ?? []),
      {
        scrollContainer: l,
        itemWidth: 104,
        rowHeight: S,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: H(() => g.value.view === "list")
      }
    ), {
      explorerId: Y,
      isDragging: K,
      initializeSelectionArea: N,
      destroySelectionArea: C,
      updateSelectionArea: k,
      handleContentClick: P
    } = du({
      getItemPosition: he,
      getItemsInRange: ie,
      getKey: (R) => R.path,
      selectionObject: d,
      rowHeight: S,
      itemWidth: 104
    }), E = M(null), U = (R) => {
      if (!R || !E.value) return !1;
      const te = $.value?.has(E.value) ?? !1;
      return K.value && (te ? $.value?.has(R) ?? !1 : R === E.value);
    };
    de(
      () => _.get("view"),
      (R) => {
        R === "list" ? I.value = 1 : A();
      },
      { immediate: !0 }
    ), de(I, (R) => {
      _.get("view") === "list" && R !== 1 && (I.value = 1);
    });
    const X = (R) => v.value?.[R];
    _e(() => {
      if (N(), d.value && d.value.on("beforestart", ({ event: R }) => {
        const te = R?.target === r.value;
        if (!R?.metaKey && !R?.ctrlKey && !R?.altKey && !te)
          return !1;
      }), l.value && (w = new dn({
        elements_selector: ".lazy",
        container: l.value
      })), de(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], k, {
        deep: !0
      }), b.value) {
        const R = pt(
          b.value,
          {
            scrollbars: { theme: "vf-scrollbars-theme" }
          },
          {
            initialized: (te) => {
              m.value = te;
            },
            scroll: (te) => {
              const { scrollOffsetElement: se } = te.elements();
              l.value && l.value.scrollTo({
                top: se.scrollTop,
                left: 0
              });
            }
          }
        );
        m.value = R;
      }
      l.value && l.value.addEventListener("scroll", () => {
        const R = m.value;
        if (!R) return;
        const { scrollOffsetElement: te } = R.elements();
        te.scrollTo({
          top: l.value.scrollTop,
          left: 0
        });
      });
    }), _e(() => {
      t.emitter.on("vf-refresh-thumbnails", () => {
        w && w.update();
      });
    }), Un(() => {
      if (w && w.update(), m.value && f.value && l.value) {
        const te = l.value.scrollHeight > l.value.clientHeight, se = f.value;
        se.style.display = te ? "block" : "none", se.style.height = `${B.value}px`;
      }
    }), Pe(() => {
      C(), w && (w.destroy(), w = null), m.value && (m.value.destroy(), m.value = null);
    });
    const we = (R) => {
      const te = R.target?.closest(".file-item-" + Y), se = R;
      if (te) {
        const ae = String(te.getAttribute("data-key")), O = v.value?.find((Te) => Te.path === ae), L = t.selectionFilterType, q = t.selectionFilterMimeIncludes, W = !L || L === "both" || L === "files" && O?.type === "file" || L === "dirs" && O?.type === "dir";
        let be = !0;
        if (q && Array.isArray(q) && q.length > 0 && (O?.type === "dir" ? be = !0 : O?.mime_type ? be = q.some((Te) => (O?.mime_type).startsWith(Te)) : be = !1), !W || !be)
          return;
        const Me = t.selectionMode || "multiple";
        !se?.ctrlKey && !se?.metaKey && (R.type !== "touchstart" || !c.isSelected(ae)) && (c.clearSelection(), d.value?.clearSelection(!0, !0)), d.value?.resolveSelectables(), R.type === "touchstart" && c.isSelected(ae) ? c.select(ae, Me) : c.toggleSelect(ae, Me);
      }
      c.setSelectedCount($.value?.size || 0);
    };
    function ke(R) {
      return {
        item: R,
        defaultPrevented: !1,
        preventDefault() {
          this.defaultPrevented = !0;
        }
      };
    }
    const Re = (R) => {
      const te = ke(R);
      if (R.type === "file" && e.onFileDclick) {
        if (t.emitter.emit("vf-file-dclick", te), te.defaultPrevented) return;
      } else if (R.type === "dir" && e.onFolderDclick && (t.emitter.emit("vf-folder-dclick", te), te.defaultPrevented))
        return;
      const se = t.contextMenuItems?.find((ae) => ae.show(t, {
        items: [R],
        target: R,
        searchQuery: ""
      }));
      se && se.action(t, [R]);
    }, ue = (R) => {
      const te = R.target?.closest(
        ".file-item-" + Y
      ), se = te ? String(te.getAttribute("data-key")) : null;
      if (!se) return;
      const ae = v.value?.find((be) => be.path === se), O = t.selectionFilterType, L = t.selectionFilterMimeIncludes, q = !O || O === "both" || O === "files" && ae?.type === "file" || O === "dirs" && ae?.type === "dir";
      let W = !0;
      L && Array.isArray(L) && L.length > 0 && (ae?.type === "dir" ? W = !0 : ae?.mime_type ? W = L.some((be) => (ae?.mime_type).startsWith(be)) : W = !1), !(!q || !W) && ae && Re(ae);
    }, ve = () => {
      const R = $.value;
      return v.value?.filter((te) => R?.has(te.path)) || [];
    }, pe = (R) => {
      R.preventDefault();
      const te = R.target?.closest(
        ".file-item-" + Y
      );
      if (te) {
        const se = String(te.getAttribute("data-key")), ae = v.value?.find((be) => be.path === se), O = t.selectionFilterType, L = t.selectionFilterMimeIncludes, q = !O || O === "both" || O === "files" && ae?.type === "file" || O === "dirs" && ae?.type === "dir";
        let W = !0;
        if (L && Array.isArray(L) && L.length > 0 && (ae?.type === "dir" ? W = !0 : ae?.mime_type ? W = L.some(
          (be) => (ae?.mime_type).startsWith(be)
        ) : W = !1), !q || !W)
          return;
        $.value?.has(se) || (c.clearSelection(), c.select(se)), t.emitter.emit("vf-contextmenu-show", {
          event: R,
          items: ve(),
          target: ae
        });
      }
    }, ye = (R) => {
      R.preventDefault(), t.emitter.emit("vf-contextmenu-show", { event: R, items: ve() });
    }, Qe = (R) => {
      if (!(t.features?.move ?? !1) || R.altKey || R.ctrlKey || R.metaKey)
        return R.preventDefault(), !1;
      K.value = !0;
      const se = R.target?.closest(
        ".file-item-" + Y
      );
      if (E.value = se ? String(se.dataset.key) : null, R.dataTransfer && E.value) {
        R.dataTransfer.setDragImage(a.value, 0, 15), R.dataTransfer.effectAllowed = "all", R.dataTransfer.dropEffect = "copy";
        const ae = $.value?.has(E.value) ? Array.from($.value) : [E.value];
        R.dataTransfer.setData("items", JSON.stringify(ae)), c.setDraggedItem(E.value);
      }
    }, it = () => {
      E.value = null;
    };
    return (R, te) => (u(), p("div", zu, [
      o("div", {
        ref: "customScrollBarContainer",
        class: J(["vuefinder__explorer__scrollbar-container", [{ "grid-view": s(g).view === "grid" }]])
      }, [
        o("div", Ru, null, 512)
      ], 2),
      s(g).view === "list" ? (u(), p("div", Nu, [
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
          onClick: te[0] || (te[0] = (se) => s(c).toggleSort("basename"))
        }, [
          le(y(s(x)("Name")) + " ", 1),
          me(V(xt, {
            direction: s(h).order
          }, null, 8, ["direction"]), [
            [Ne, s(h).active && s(h).column === "basename"]
          ])
        ]),
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
          onClick: te[1] || (te[1] = (se) => s(c).toggleSort("file_size"))
        }, [
          le(y(s(x)("Size")) + " ", 1),
          me(V(xt, {
            direction: s(h).order
          }, null, 8, ["direction"]), [
            [Ne, s(h).active && s(h).column === "file_size"]
          ])
        ]),
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
          onClick: te[2] || (te[2] = (se) => s(c).toggleSort("last_modified"))
        }, [
          le(y(s(x)("Date")) + " ", 1),
          me(V(xt, {
            direction: s(h).order
          }, null, 8, ["direction"]), [
            [Ne, s(h).active && s(h).column === "last_modified"]
          ])
        ])
      ])) : T("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: l,
        class: J(["vuefinder__explorer__selector-area", "scroller-" + s(Y)]),
        onScroll: te[4] || (te[4] = //@ts-ignore
        (...se) => s(j) && s(j)(...se))
      }, [
        s(_).get("loadingIndicator") === "linear" && s(F) ? (u(), p("div", Uu)) : T("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Ue({ height: `${s(B)}px`, position: "relative", width: "100%" }),
          onContextmenu: ce(ye, ["self", "prevent"]),
          onClick: te[3] || (te[3] = ce(
            //@ts-ignore
            (...se) => s(P) && s(P)(...se),
            ["self"]
          ))
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: a,
            class: "vuefinder__explorer__drag-item"
          }, [
            V(yu, {
              count: E.value && s($).has(E.value) ? s($).size : 1
            }, null, 8, ["count"])
          ], 512),
          s(g).view === "grid" ? (u(!0), p(fe, { key: 0 }, ge(s(Q), (se) => (u(), z(nn, {
            key: se,
            "row-index": se,
            "row-height": S.value,
            view: "grid",
            "items-per-row": s(I),
            items: s(oe)(s(v), se),
            "show-thumbnails": s(g).showThumbnails,
            "is-dragging-item": U,
            "is-selected": D,
            "drag-n-drop-events": (ae) => s(n).events(ae),
            "explorer-id": s(Y),
            onClick: we,
            onDblclick: ue,
            onContextmenu: pe,
            onDragstart: Qe,
            onDragend: it
          }, {
            icon: ne((ae) => [
              Ce(R.$slots, "icon", Be({ ref_for: !0 }, ae))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id"]))), 128)) : (u(!0), p(fe, { key: 1 }, ge(s(Q), (se) => (u(), z(nn, {
            key: se,
            "row-index": se,
            "row-height": S.value,
            view: "list",
            items: X(se) ? [X(se)] : [],
            compact: s(g).compactListView,
            "is-dragging-item": U,
            "is-selected": D,
            "drag-n-drop-events": (ae) => s(n).events(ae),
            "explorer-id": s(Y),
            onClick: we,
            onDblclick: ue,
            onContextmenu: pe,
            onDragstart: Qe,
            onDragend: it
          }, {
            icon: ne((ae) => [
              Ce(R.$slots, "icon", Be({ ref_for: !0 }, ae))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id"]))), 128))
        ], 36)
      ], 34)
    ]));
  }
}), ju = ["href", "download"], Ku = ["onClick"], qu = /* @__PURE__ */ Z({
  __name: "ContextMenu",
  setup(i) {
    const e = ee(), t = M(null), n = M([]), a = ft({
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
    const d = (c) => c.link(e, n.value), l = (c) => {
      e.emitter.emit("vf-contextmenu-hide"), c.action(e, n.value);
    };
    e.emitter.on("vf-contextmenu-show", (c) => {
      const { event: _, items: g, target: h = null } = c || {};
      a.items = (e.contextMenuItems || []).filter((v) => v.show(e, {
        items: g,
        target: h
      })), h ? g.length > 1 && g.some((v) => v.path === h.path) ? e.emitter.emit("vf-context-selected", g) : e.emitter.emit("vf-context-selected", [h]) : e.emitter.emit("vf-context-selected", []), r(_);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      a.active = !1;
    });
    const r = (c) => {
      const _ = e.root, g = _?.getBoundingClientRect?.(), h = _?.getBoundingClientRect?.();
      let v = c.clientX - (g?.left ?? 0), $ = c.clientY - (g?.top ?? 0);
      a.active = !0, Ve(() => {
        const F = t.value?.getBoundingClientRect(), D = F?.height ?? 0, w = F?.width ?? 0;
        v = h && h.right - c.pageX + window.scrollX < w ? v - w : v, $ = h && h.bottom - c.pageY + window.scrollY < D ? $ - D : $, a.positions = {
          left: String(v) + "px",
          top: String($) + "px"
        };
      });
    };
    return (c, _) => me((u(), p("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: J([{
        "vuefinder__context-menu--active": a.active,
        "vuefinder__context-menu--inactive": !a.active
      }, "vuefinder__context-menu"]),
      style: Ue(a.positions)
    }, [
      (u(!0), p(fe, null, ge(a.items, (g) => (u(), p("li", {
        key: g.title,
        class: "vuefinder__context-menu__item"
      }, [
        g.link ? (u(), p("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: d(g),
          download: d(g),
          onClick: _[0] || (_[0] = (h) => s(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, y(g.title(s(e).i18n)), 1)
        ], 8, ju)) : (u(), p("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => l(g)
        }, [
          o("span", null, y(g.title(s(e).i18n)), 1)
        ], 8, Ku))
      ]))), 128))
    ], 6)), [
      [Ne, a.active]
    ]);
  }
}), Wu = { class: "vuefinder__status-bar__wrapper" }, Gu = { class: "vuefinder__status-bar__storage" }, Yu = ["title"], Qu = { class: "vuefinder__status-bar__storage-icon" }, Xu = ["value"], Ju = ["value"], Zu = { class: "vuefinder__status-bar__info space-x-2" }, ev = { key: 0 }, tv = { key: 1 }, nv = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, ov = { class: "vuefinder__status-bar__actions" }, sv = /* @__PURE__ */ Z({
  __name: "Statusbar",
  setup(i) {
    const e = ee(), { t } = e.i18n, n = e.fs, a = G(n.sortedFiles), d = G(n.path), l = G(n.selectedCount), r = G(n.storages), c = G(n.selectedItems), _ = G(n.path), g = (w) => {
      const m = w.target.value;
      e.adapter.open(m + "://");
    }, h = H(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((w, m) => w + (m.file_size || 0), 0)), v = H(() => r.value), $ = H(() => a.value), F = H(() => l.value || 0), D = H(() => c.value || []);
    return (w, m) => (u(), p("div", Wu, [
      o("div", Gu, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: s(t)("Storage")
        }, [
          o("div", Qu, [
            V(s(Ot))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: s(d).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: g
          }, [
            (u(!0), p(fe, null, ge(v.value, (f) => (u(), p("option", {
              key: f,
              value: f
            }, y(f), 9, Ju))), 128))
          ], 40, Xu),
          m[0] || (m[0] = o("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, Yu),
        o("div", Zu, [
          F.value === 0 ? (u(), p("span", ev, y($.value.length) + " " + y(s(t)("items")), 1)) : (u(), p("span", tv, [
            le(y(F.value) + " " + y(s(t)("selected")) + " ", 1),
            h.value ? (u(), p("span", nv, y(s(e).filesize(h.value)), 1)) : T("", !0)
          ]))
        ])
      ]),
      o("div", ov, [
        Ce(w.$slots, "actions", {
          path: s(_).path,
          count: F.value || 0,
          selected: D.value
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
function av(i, e) {
  return u(), p("svg", iv, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const rv = { render: av };
function On(i, e) {
  const t = i.findIndex((n) => n.path === e.path);
  t > -1 ? i[t] = e : i.push(e);
}
const lv = { class: "vuefinder__folder-loader-indicator" }, dv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Bn = /* @__PURE__ */ Z({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Hn({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(i) {
    const e = i, t = ee(), n = ln(i, "modelValue"), a = M(!1);
    de(
      () => n.value,
      () => d()
    );
    const d = async () => {
      a.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        On(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (l) {
        Ee(l, "Failed to fetch subfolders");
      } finally {
        a.value = !1;
      }
    };
    return (l, r) => (u(), p("div", lv, [
      a.value ? (u(), z(s(bt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), p("div", dv, [
        n.value ? (u(), z(s(yt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : T("", !0),
        n.value ? T("", !0) : (u(), z(s(wt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), cv = { key: 0 }, uv = { class: "vuefinder__treesubfolderlist__no-folders" }, vv = { class: "vuefinder__treesubfolderlist__item-content" }, fv = ["onClick"], _v = ["title", "onDblclick", "onClick"], pv = { class: "vuefinder__treesubfolderlist__item-icon" }, hv = { class: "vuefinder__treesubfolderlist__subfolder" }, mv = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, gv = /* @__PURE__ */ Z({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(i) {
    const e = ee(), t = e.fs, n = st(e, ["vuefinder__drag-over"]), a = M({}), { t: d } = e.i18n, l = G(t.path), r = i, c = M(null), _ = M(50);
    _e(() => {
      r.path === r.storage + "://" && c.value && pt(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const g = H(() => {
      const D = e.treeViewData.find((w) => w.path === r.path)?.folders || [];
      return D.length > _.value ? D.slice(0, _.value) : D;
    }), h = H(() => e.treeViewData.find((D) => D.path === r.path)?.folders?.length || 0), v = H(() => h.value > _.value), $ = () => {
      _.value += 50;
    };
    return (F, D) => {
      const w = an("TreeSubfolderList", !0);
      return u(), p("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        g.value.length ? T("", !0) : (u(), p("li", cv, [
          o("div", uv, y(s(d)("No folders")), 1)
        ])),
        (u(!0), p(fe, null, ge(g.value, (m) => (u(), p("li", {
          key: m.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", vv, [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (f) => a.value[m.path] = !a.value[m.path]
            }, [
              V(Bn, {
                modelValue: a.value[m.path],
                "onUpdate:modelValue": (f) => a.value[m.path] = f,
                storage: i.storage,
                path: m.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, fv),
            o("div", Be({
              class: "vuefinder__treesubfolderlist__item-link",
              title: m.path
            }, Ke(
              s(n).events({
                ...m,
                dir: m.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (f) => a.value[m.path] = !a.value[m.path],
              onClick: (f) => s(e).adapter.open(m.path)
            }), [
              o("div", pv, [
                s(l)?.path === m.path ? (u(), z(s(Bt), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), z(s(ze), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: J(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": s(l).path === m.path
                }])
              }, y(m.basename), 3)
            ], 16, _v)
          ]),
          o("div", hv, [
            me(V(w, {
              storage: r.storage,
              path: m.path
            }, null, 8, ["storage", "path"]), [
              [Ne, a.value[m.path]]
            ])
          ])
        ]))), 128)),
        v.value ? (u(), p("li", mv, [
          o("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: $
          }, y(s(d)("load more")), 1)
        ])) : T("", !0)
      ], 512);
    };
  }
}), wv = /* @__PURE__ */ Z({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(i) {
    const e = ee(), t = e.fs, n = M(!1), a = i, d = st(e, ["vuefinder__drag-over"]), l = G(t.path), r = H(() => a.storage === l.value?.storage), c = {
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
    return (g, h) => (u(), p(fe, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: h[2] || (h[2] = (v) => _(i.storage))
      }, [
        o("div", Be({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Ke(s(d).events(c), !0)), [
          o("div", {
            class: J(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            V(s(Ot))
          ], 2),
          o("div", null, y(i.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: h[1] || (h[1] = ce((v) => n.value = !n.value, ["stop"]))
        }, [
          V(Bn, {
            modelValue: n.value,
            "onUpdate:modelValue": h[0] || (h[0] = (v) => n.value = v),
            storage: i.storage,
            path: i.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      me(V(gv, {
        storage: i.storage,
        path: i.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ne, n.value]
      ])
    ], 64));
  }
}), yv = { class: "vuefinder__folder-indicator" }, bv = { class: "vuefinder__folder-indicator--icon" }, kv = /* @__PURE__ */ Z({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(i) {
    const e = ln(i, "modelValue");
    return (t, n) => (u(), p("div", yv, [
      o("div", bv, [
        e.value ? (u(), z(s(yt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : T("", !0),
        e.value ? T("", !0) : (u(), z(s(wt), {
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
}, Fv = ["onClick"], Dv = ["title"], Pv = ["onClick"], Ev = { key: 0 }, Mv = { class: "vuefinder__treeview__no-pinned" }, Tv = /* @__PURE__ */ Z({
  __name: "TreeView",
  setup(i) {
    const e = ee(), { enabled: t } = Le(), { t: n } = e.i18n, { getStore: a, setStore: d } = e.storage, l = e.fs, r = e.config, c = G(r.state), _ = G(l.sortedFiles), g = G(l.storages), h = H(() => g.value || []), v = G(l.path), $ = st(e, ["vuefinder__drag-over"]), F = M(190), D = M(a("pinned-folders-opened", !0));
    de(D, (b) => d("pinned-folders-opened", b));
    const w = (b) => {
      const S = r.get("pinnedFolders");
      r.set("pinnedFolders", S.filter((x) => x.path !== b.path));
    }, m = (b) => {
      const S = b.clientX, x = b.target.parentElement;
      if (!x) return;
      const I = x.getBoundingClientRect().width;
      x.classList.remove("transition-[width]"), x.classList.add("transition-none");
      const B = (j) => {
        F.value = I + j.clientX - S, F.value < 50 && (F.value = 0, r.set("showTreeView", !1)), F.value > 50 && r.set("showTreeView", !0);
      }, Q = () => {
        const j = x.getBoundingClientRect();
        F.value = j.width, x.classList.add("transition-[width]"), x.classList.remove("transition-none"), window.removeEventListener("mousemove", B), window.removeEventListener("mouseup", Q);
      };
      window.addEventListener("mousemove", B), window.addEventListener("mouseup", Q);
    }, f = M(null);
    return _e(() => {
      f.value && pt(f.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), de(_, (b) => {
      const S = b.filter((x) => x.type === "dir");
      On(e.treeViewData, {
        path: v.value.path || "",
        folders: S.map((x) => ({
          storage: x.storage,
          path: x.path,
          basename: x.basename,
          type: "dir"
        }))
      });
    }), (b, S) => (u(), p(fe, null, [
      o("div", {
        class: J(["vuefinder__treeview__overlay", s(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: S[0] || (S[0] = (x) => s(r).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: Ue(
          s(c).showTreeView ? "min-width:100px;max-width:75%; width: " + F.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: f,
          class: "vuefinder__treeview__scroll"
        }, [
          s(t)("pinned") ? (u(), p("div", $v, [
            o("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: S[2] || (S[2] = (x) => D.value = !D.value)
            }, [
              o("div", xv, [
                V(s(At), { class: "vuefinder__treeview__pin-icon" }),
                o("div", Sv, y(s(n)("Pinned Folders")), 1)
              ]),
              V(kv, {
                modelValue: D.value,
                "onUpdate:modelValue": S[1] || (S[1] = (x) => D.value = x)
              }, null, 8, ["modelValue"])
            ]),
            D.value ? (u(), p("ul", Cv, [
              (u(!0), p(fe, null, ge(s(c).pinnedFolders, (x) => (u(), p("li", {
                key: x.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", Be({ class: "vuefinder__treeview__pinned-folder" }, Ke(s($).events(x), !0), {
                  onClick: (I) => s(e).adapter.open(x.path)
                }), [
                  s(v).path !== x.path ? (u(), z(s(ze), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : T("", !0),
                  s(v).path === x.path ? (u(), z(s(Bt), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : T("", !0),
                  o("div", {
                    title: x.path,
                    class: J(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": s(v).path === x.path
                    }])
                  }, y(x.basename), 11, Dv)
                ], 16, Fv),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (I) => w(x)
                }, [
                  V(s(rv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Pv)
              ]))), 128)),
              s(c).pinnedFolders.length ? T("", !0) : (u(), p("li", Ev, [
                o("div", Mv, y(s(n)("No folders pinned")), 1)
              ]))
            ])) : T("", !0)
          ])) : T("", !0),
          (u(!0), p(fe, null, ge(h.value, (x) => (u(), p("div", {
            key: x,
            class: "vuefinder__treeview__storage"
          }, [
            V(wv, { storage: x }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        o("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: m
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
function Iv(i) {
  return i.items.length > 1 && i.items.some((e) => e.path === i.target?.path) ? "many" : i.target ? "one" : "none";
}
function $e(i) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    i
  );
  return (t, n) => !(e.needsSearchQuery !== !!n.searchQuery || e.target !== void 0 && e.target !== Iv(n) || e.targetType !== void 0 && e.targetType !== n.target?.type || e.mimeType !== void 0 && e.mimeType !== n.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function Je(...i) {
  return (e, t) => i.some((n) => n(e, t));
}
function Ze(...i) {
  return (e, t) => i.every((n) => n(e, t));
}
const Vn = [
  {
    id: Se.openDir,
    title: ({ t: i }) => i("Open containing folder"),
    action: (i, e) => {
      const t = e[0];
      t && i.adapter.open(t.dir);
    },
    show: $e({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: Se.refresh,
    title: ({ t: i }) => i("Refresh"),
    action: (i) => {
      const e = i.fs;
      i.adapter.invalidateListQuery(e.path.get().path), i.adapter.open(e.path.get().path);
    },
    show: Je($e({ target: "none" }), $e({ target: "many" }))
  },
  {
    id: Se.selectAll,
    title: ({ t: i }) => i("Select All"),
    action: (i) => {
      i.fs.selectAll(i.selectionMode || "multiple");
    },
    show: (i, e) => i.selectionMode === "multiple" && $e({ target: "none" })(i, e)
  },
  {
    id: Se.new_folder,
    title: ({ t: i }) => i("New Folder"),
    action: (i) => i.modal.open(Nt),
    show: $e({ target: "none", feature: "newfolder" })
  },
  {
    id: Se.open,
    title: ({ t: i }) => i("Open"),
    action: (i, e) => {
      e[0] && i.adapter.open(e[0].path);
    },
    show: $e({ target: "one", targetType: "dir" })
  },
  {
    id: Se.pinFolder,
    title: ({ t: i }) => i("Pin Folder"),
    action: (i, e) => {
      const t = i.config, n = t.get("pinnedFolders"), a = n.concat(
        e.filter(
          (d) => n.findIndex((l) => l.path === d.path) === -1
        )
      );
      t.set("pinnedFolders", a);
    },
    show: Ze($e({ target: "one", targetType: "dir", feature: "pinned" }), (i, e) => i.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1)
  },
  {
    id: Se.unpinFolder,
    title: ({ t: i }) => i("Unpin Folder"),
    action: (i, e) => {
      const t = i.config, n = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        n.filter(
          (a) => !e.find((d) => d.path === a.path)
        )
      );
    },
    show: Ze($e({ target: "one", targetType: "dir", feature: "pinned" }), (i, e) => i.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1)
  },
  {
    id: Se.preview,
    title: ({ t: i }) => i("Preview"),
    action: (i, e) => i.modal.open(gt, { storage: e[0]?.storage, item: e[0] }),
    show: Ze(
      $e({ target: "one", feature: "preview" }),
      (i, e) => e.target?.type !== "dir"
    )
  },
  {
    id: Se.download,
    link: (i, e) => {
      if (e[0])
        return i.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: i }) => i("Download"),
    action: () => {
    },
    show: Ze(
      $e({ target: "one", feature: "download" }),
      (i, e) => e.target?.type !== "dir"
    )
  },
  {
    id: Se.rename,
    title: ({ t: i }) => i("Rename"),
    action: (i, e) => i.modal.open(mt, { items: e }),
    show: $e({ target: "one", feature: "rename" })
  },
  {
    id: Se.move,
    title: ({ t: i }) => i("Move"),
    action: (i, e) => {
      const t = i.fs, n = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      i.modal.open(Ye, { items: { from: e, to: n } });
    },
    show: Je(
      $e({ target: "one", feature: "move" }),
      $e({ target: "many", feature: "move" })
    )
  },
  {
    id: Se.copy,
    title: ({ t: i }) => i("Copy"),
    action: (i, e) => {
      e.length > 0 && i.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: Je(
      $e({ target: "one", feature: "copy" }),
      $e({ target: "many", feature: "copy" })
    )
  },
  {
    id: Se.paste,
    title: ({ t: i }) => i("Paste"),
    action: (i, e) => {
      const t = i.fs.getClipboard();
      if (t?.items?.size > 0) {
        const a = i.fs.path.get();
        let d = a.path, l = a.storage;
        e.length === 1 && e[0]?.type === "dir" && (d = e[0].path, l = e[0].storage);
        const r = {
          storage: l || "",
          path: d || "",
          type: "dir"
        };
        i.modal.open(t.type === "cut" ? Ye : Lt, {
          items: { from: Array.from(t.items), to: r }
        });
      }
    },
    show: (i, e) => i.features?.copy ?? !1 ? i.fs.getClipboard()?.items?.size > 0 : !1
  },
  {
    id: Se.archive,
    title: ({ t: i }) => i("Archive"),
    action: (i, e) => i.modal.open(jt, { items: e }),
    show: Je(
      $e({ target: "many", feature: "archive" }),
      Ze(
        $e({ target: "one", feature: "archive" }),
        (i, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: Se.unarchive,
    title: ({ t: i }) => i("Unarchive"),
    action: (i, e) => i.modal.open(Ht, { items: e }),
    show: $e({ target: "one", feature: "unarchive", mimeType: "application/zip" })
  },
  {
    id: Se.delete,
    title: ({ t: i }) => i("Delete"),
    action: (i, e) => {
      i.modal.open(ht, { items: e });
    },
    show: Je(
      $e({ feature: "delete", target: "one" }),
      $e({ feature: "delete", target: "many" })
    )
  }
], Av = ["data-theme"], Ov = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Bv = { class: "vuefinder__external-drop-message" }, Vv = { class: "vuefinder__main__content" }, Lv = /* @__PURE__ */ Z({
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
    const t = e, n = i, a = ee(), d = je("root"), l = a.config;
    de(
      () => n.features,
      (w) => {
        const m = vn(w);
        Object.keys(a.features).forEach((f) => {
          delete a.features[f];
        }), Object.assign(a.features, m);
      },
      { deep: !0 }
    );
    const r = a.fs, c = G(l.state);
    qr();
    const { isDraggingExternal: _, handleDragEnter: g, handleDragOver: h, handleDragLeave: v, handleDrop: $ } = Wr();
    function F(w) {
      r.setPath(w.dirname), l.get("persist") && l.set("path", w.dirname), r.setReadOnly(w.read_only ?? !1), a.modal.close(), r.setFiles(w.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(w.storages);
    }
    a.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, a.adapter.onAfterOpen = (w) => {
      F(w), r.setLoading(!1);
    }, a.emitter.on("vf-upload-complete", (w) => {
      t("upload-complete", w);
    }), a.emitter.on("vf-delete-complete", (w) => {
      t("delete-complete", w);
    }), a.emitter.on("vf-file-dclick", (w) => {
      t("file-dclick", w);
    }), a.emitter.on("vf-folder-dclick", (w) => {
      t("folder-dclick", w);
    }), de(
      () => n.config?.theme,
      (w) => {
        w && l.set("theme", s(w));
      },
      { immediate: !0 }
    ), _e(() => {
      a.root = d.value, de(
        () => l.get("path"),
        (m) => {
          a.adapter.open(m);
        }
      );
      const w = l.get("persist") ? l.get("path") : l.get("initialPath") ?? "";
      r.setPath(w), a.adapter.open(w), r.path.listen((m) => {
        t("path-change", m.path);
      }), r.selectedItems.listen((m) => {
        t("select", m);
      }), t("ready");
    });
    const D = async (w) => {
      const m = await $(w);
      m.length > 0 && (a.modal.open(Ut), setTimeout(() => {
        a.emitter.emit(
          "vf-external-files-dropped",
          m.map((f) => f.file)
        );
      }, 100));
    };
    return (w, m) => (u(), p("div", {
      ref_key: "root",
      ref: d,
      tabindex: "0",
      class: J(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": s(_) }]),
      "data-theme": s(a).theme.current,
      onDragenter: m[2] || (m[2] = //@ts-ignore
      (...f) => s(g) && s(g)(...f)),
      onDragover: m[3] || (m[3] = //@ts-ignore
      (...f) => s(h) && s(h)(...f)),
      onDragleave: m[4] || (m[4] = //@ts-ignore
      (...f) => s(v) && s(v)(...f)),
      onDrop: D
    }, [
      o("div", {
        class: J(s(a).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: J([
            s(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: m[0] || (m[0] = (f) => s(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: m[1] || (m[1] = (f) => s(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          s(_) ? (u(), p("div", Ov, [
            o("div", Bv, y(s(a).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : T("", !0),
          V(md),
          V(wc),
          V(ru),
          o("div", Vv, [
            V(Tv),
            V(Hu, {
              "on-file-dclick": n.onFileDclick,
              "on-folder-dclick": n.onFolderDclick
            }, {
              icon: ne((f) => [
                Ce(w.$slots, "icon", qe(We(f)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          V(sv, null, {
            actions: ne((f) => [
              Ce(w.$slots, "status-bar", qe(We(f)))
            ]),
            _: 3
          })
        ], 34),
        (u(), z(_t, { to: "body" }, [
          V(jn, { name: "fade" }, {
            default: ne(() => [
              s(a).modal.visible ? (u(), z(sn(s(a).modal.type), { key: 0 })) : T("", !0)
            ]),
            _: 1
          })
        ])),
        V(qu, { items: s(Vn) }, null, 8, ["items"]),
        V(s(Wn), { position: "bottom-center" })
      ], 2)
    ], 42, Av));
  }
}), zv = /* @__PURE__ */ Z({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => Vn },
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
    const e = i, t = e.id ?? at(Ct);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const n = mo(e, at("VueFinderOptions") || {});
    return eo(t, n), Kn(Ct, t), rn(() => {
      to(t);
    }), (a, d) => (u(), z(Lv, qe(We(e)), {
      icon: ne((l) => [
        Ce(a.$slots, "icon", qe(We(l)))
      ]),
      "status-bar": ne((l) => [
        Ce(a.$slots, "status-bar", qe(We(l)))
      ]),
      _: 3
    }, 16));
  }
}), nf = {
  install(i, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", i.provide("VueFinderOptions", e), i.component("VueFinder", zv);
  }
};
export {
  ef as ArrayDriver,
  Se as ContextMenuIds,
  tf as IndexedDBDriver,
  pn as RemoteDriver,
  zv as VueFinder,
  nf as VueFinderPlugin,
  zv as VueFinderProvider,
  Vn as contextMenuItems,
  nf as default
};
