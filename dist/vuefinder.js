import { inject as ut, reactive as _t, watch as ve, ref as P, shallowRef as an, computed as j, markRaw as Vn, defineComponent as Z, onMounted as me, nextTick as Le, createElementBlock as m, openBlock as u, withKeys as lt, unref as s, createElementVNode as i, createCommentVNode as I, withModifiers as le, renderSlot as De, toDisplayString as y, createBlock as R, resolveDynamicComponent as rn, withCtx as ae, createVNode as B, Fragment as he, renderList as ye, withDirectives as we, vModelText as dt, onUnmounted as Fe, useTemplateRef as Qe, createTextVNode as ue, resolveComponent as ln, normalizeClass as te, vModelCheckbox as Pt, customRef as Rn, Teleport as pt, normalizeStyle as je, isRef as Nn, vModelSelect as St, onBeforeUnmount as dn, vModelRadio as $t, mergeProps as Be, toHandlers as qe, vShow as Ue, normalizeProps as Ge, guardReactiveProps as We, onUpdated as Un, mergeModels as jn, useModel as cn, Transition as Hn, provide as Kn } from "vue";
import qn from "mitt";
import { toast as de, Toaster as Gn } from "vue-sonner";
import { persistentAtom as Wn } from "@nanostores/persistent";
import { atom as Ee, computed as Ke } from "nanostores";
import { useStore as Y } from "@nanostores/vue";
import { QueryClient as Yn } from "@tanstack/vue-query";
import Qn from "@uppy/core";
import { Cropper as Xn } from "vue-advanced-cropper";
import un from "vanilla-lazyload";
import { OverlayScrollbars as nt, SizeObserverPlugin as Jn } from "overlayscrollbars";
import { computePosition as Xe, offset as ot, flip as st, shift as it, autoUpdate as Et } from "@floating-ui/dom";
import Zn from "@viselect/vanilla";
import eo from "@uppy/xhr-upload";
const Tt = /* @__PURE__ */ new Map(), Ct = Symbol("ServiceContainerId");
function to(o, e) {
  Tt.set(o, e);
}
function no(o) {
  Tt.delete(o);
}
function ne(o) {
  const e = ut(Ct);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = Tt.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function oo(o) {
  const e = localStorage.getItem(o + "_storage"), t = _t(JSON.parse(e ?? "{}"));
  ve(t, n);
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
function Te(o, e = "An error occurred") {
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
async function so(o, e) {
  const t = e[o];
  return typeof t == "function" ? (await t()).default : t;
}
function io(o, e, t, n) {
  const { getStore: a, setStore: d } = o, l = P({}), r = P(a("locale", e)), c = (w, v = e) => {
    so(w, n).then((k) => {
      l.value = k, d("locale", w), r.value = w, d("translations", k), Object.values(n).length > 1 && (de.success("The language is set to " + w), t.emit("vf-language-saved"));
    }).catch((k) => {
      if (v)
        de.error("The selected locale is not yet supported!"), c(v, null);
      else {
        const x = Te(k, "Locale cannot be loaded!");
        de.error(x);
      }
    });
  };
  ve(r, (w) => {
    c(w);
  }), !a("locale") && !Object.keys(n).length ? c(e) : l.value = a("translations");
  const _ = (w, ...v) => v.length ? _(w = w.replace("%s", String(v.shift())), ...v) : w;
  function g(w, ...v) {
    return l.value && Object.prototype.hasOwnProperty.call(l.value, w) ? _(l.value[w] || w, ...v) : _(w, ...v);
  }
  return _t({ t: g, locale: r });
}
const ao = [
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
], vn = {
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
  advanced: ao.reduce((o, e) => (o[e] = !0, o), {})
};
function Gt() {
  return vn.advanced;
}
function fn(o) {
  return o ? o === "simple" || o === "advanced" ? { ...vn[o] } : { ...Gt(), ...o } : Gt();
}
const ro = "4.0.19";
function Mt(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1024, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function _n(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1e3, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function lo(o) {
  if (typeof o == "number") return o;
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(o);
  if (!n) return 0;
  const a = parseFloat(n[1] || "0"), d = (n[2] || "").toLowerCase(), l = e[d] ?? 0;
  return Math.round(a * Math.pow(1024, l));
}
function co(o) {
  const e = an(null), t = P(!1), n = P(), a = P(!1);
  return { visible: t, type: e, data: n, open: (c, _ = null) => {
    o.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = c, n.value = _;
  }, close: () => {
    o.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null;
  }, setEditMode: (c) => {
    a.value = c;
  }, editMode: a };
}
const vt = {
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
}, ft = {
  initialPath: null,
  maxFileSize: null,
  loadingIndicator: "circular"
}, uo = new Set(
  Object.keys(ft)
);
function vo(o) {
  return o || "silver";
}
function pn(o) {
  return uo.has(o);
}
function Wt(o) {
  const e = {}, t = {}, n = o;
  for (const a in n)
    if (pn(a))
      t[a] = n[a];
    else if (a in vt) {
      const d = a;
      e[d] = n[a];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function Yt(o, e) {
  const t = { ...vt, ...o, ...e };
  return t.theme = vo(t.theme), t;
}
function Qt(o, e) {
  return { ...ft, ...e, ...o };
}
const fo = (o, e = {}) => {
  const t = `vuefinder_config_${o}`, { persistenceConfig: n, nonPersistenceConfig: a } = Wt(e), d = Yt(
    n,
    vt
  ), l = Qt(
    a,
    ft
  ), r = Wn(
    t,
    d,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = Ee(l), _ = Ke(
    [r, c],
    (p, h) => ({
      ...p,
      ...h
    })
  ), g = (p = {}) => {
    const h = r.get(), f = c.get(), { persistenceConfig: b, nonPersistenceConfig: S } = Wt(p), C = Yt(b, h), A = Qt(
      S,
      f
    );
    r.set(C), c.set(A);
  }, w = (p) => pn(p) ? c.get()[p] : r.get()[p], v = () => ({
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
      r.set({ ...vt }), c.set({ ...ft });
    }
  };
};
function _o(o, e) {
  if (typeof o == "string" && typeof e == "string")
    return o.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(o) || 0, n = Number(e) || 0;
  return t === n ? 0 : t < n ? -1 : 1;
}
const po = () => {
  const o = Ee(""), e = Ee([]), t = Ee(!1), n = Ee([]), a = Ee({ active: !1, column: "", order: "" }), d = Ee({
    kind: "all",
    showHidden: !1
  }), l = Ee(/* @__PURE__ */ new Set()), r = Ee({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Ee(null), _ = Ee(0), g = Ee(!1), w = Ee([]), v = Ee(-1), k = Ke([o], (z) => {
    const U = (z ?? "").trim(), J = U.indexOf("://"), re = J >= 0 ? U.slice(0, J) : "", Ve = (J >= 0 ? U.slice(J + 3) : U).split("/").filter(Boolean);
    let Ne = "";
    const kt = Ve.map((Ae) => (Ne = Ne ? `${Ne}/${Ae}` : Ae, {
      basename: Ae,
      name: Ae,
      path: re ? `${re}://${Ne}` : Ne,
      type: "dir"
    }));
    return { storage: re, breadcrumb: kt, path: U };
  }), x = Ke([n, a, d], (z, U, J) => {
    let re = z;
    J.kind === "files" ? re = re.filter((Ae) => Ae.type === "file") : J.kind === "folders" && (re = re.filter((Ae) => Ae.type === "dir")), J.showHidden || (re = re.filter((Ae) => !Ae.basename.startsWith(".")));
    const { active: He, column: Ve, order: Ne } = U;
    if (!He || !Ve) return re;
    const kt = Ne === "asc" ? 1 : -1;
    return re.slice().sort((Ae, zn) => _o(Ae[Ve], zn[Ve]) * kt);
  }), $ = Ke([n, l], (z, U) => U.size === 0 ? [] : z.filter((J) => U.has(J.path))), p = (z, U) => {
    const J = o.get();
    if ((U ?? !0) && J !== z) {
      const re = w.get(), He = v.get();
      He < re.length - 1 && re.splice(He + 1), re.length === 0 && J && re.push(J), re.push(z), w.set([...re]), v.set(re.length - 1);
    }
    o.set(z);
  }, h = (z) => {
    n.set(z ?? []);
  }, f = (z) => {
    e.set(z ?? []);
  }, b = (z, U) => {
    a.set({ active: !0, column: z, order: U });
  }, S = (z) => {
    const U = a.get();
    U.active && U.column === z ? a.set({
      active: U.order === "asc",
      column: z,
      order: "desc"
    }) : a.set({
      active: !0,
      column: z,
      order: "asc"
    });
  }, C = () => {
    a.set({ active: !1, column: "", order: "" });
  }, A = (z, U) => {
    d.set({ kind: z, showHidden: U });
  }, V = () => {
    d.set({ kind: "all", showHidden: !1 });
  }, X = (z, U = "multiple") => {
    const J = new Set(l.get());
    U === "single" && J.clear(), J.add(z), l.set(J);
  }, q = (z, U = "multiple") => {
    const J = new Set(l.get());
    U === "single" && J.clear(), z.forEach((re) => J.add(re)), l.set(J);
  }, oe = (z) => {
    const U = new Set(l.get());
    U.delete(z), l.set(U);
  }, N = (z) => l.get().has(z), se = (z, U = "multiple") => {
    const J = new Set(l.get());
    J.has(z) ? J.delete(z) : (U === "single" && J.clear(), J.add(z)), l.set(J);
  }, T = (z = "multiple", U) => {
    if (z === "single") {
      const J = n.get()[0];
      if (J) {
        const re = J.path;
        l.set(/* @__PURE__ */ new Set([re])), _.set(1);
      }
    } else {
      if (U?.selectionFilterType || U?.selectionFilterMimeIncludes && U.selectionFilterMimeIncludes.length > 0) {
        const J = n.get().filter((re) => {
          const He = U.selectionFilterType, Ve = U.selectionFilterMimeIncludes;
          return He === "files" && re.type === "dir" || He === "dirs" && re.type === "file" ? !1 : Ve && Array.isArray(Ve) && Ve.length > 0 && re.type !== "dir" ? re.mime_type ? Ve.some((Ne) => re.mime_type?.startsWith(Ne)) : !1 : !0;
        }).map((re) => re.path);
        l.set(new Set(J));
      } else {
        const J = new Set(n.get().map((re) => re.path));
        l.set(J);
      }
      L(l.get().size);
    }
  }, ee = () => {
    l.set(/* @__PURE__ */ new Set()), _.set(0);
  }, K = (z) => {
    const U = new Set(z ?? []);
    l.set(U), _.set(U.size);
  }, L = (z) => {
    _.set(z);
  }, E = (z) => {
    g.set(!!z);
  }, F = () => g.get(), M = (z, U) => {
    const J = n.get().filter((re) => U.has(re.path));
    r.set({
      type: z,
      path: k.get().path,
      items: new Set(J)
    });
  }, D = (z) => Ke([r], (U) => U.type === "cut" && Array.from(U.items).some((J) => J.path === z)), O = (z) => Ke([r], (U) => U.type === "copy" && Array.from(U.items).some((J) => J.path === z)), G = (z) => {
    const U = D(z);
    return Y(U).value ?? !1;
  }, W = (z) => {
    const U = O(z);
    return Y(U).value ?? !1;
  }, Q = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ie = () => r.get(), _e = (z) => {
    c.set(z);
  }, xe = () => c.get(), Ie = () => {
    c.set(null);
  }, fe = () => {
    const z = w.get(), U = v.get();
    if (U > 0) {
      const J = U - 1, re = z[J];
      re && (v.set(J), p(re, !1));
    }
  }, H = () => {
    const z = w.get(), U = v.get();
    if (U < z.length - 1) {
      const J = U + 1, re = z[J];
      re && (v.set(J), p(re, !1));
    }
  }, pe = Ke([v], (z) => z > 0), ge = Ke(
    [w, v],
    (z, U) => U < z.length - 1
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
    sortedFiles: x,
    selectedItems: $,
    // Actions
    setPath: p,
    setFiles: h,
    setStorages: f,
    setSort: b,
    toggleSort: S,
    clearSort: C,
    setFilter: A,
    clearFilter: V,
    select: X,
    selectMultiple: q,
    deselect: oe,
    toggleSelect: se,
    selectAll: T,
    isSelected: N,
    clearSelection: ee,
    setSelection: K,
    setSelectedCount: L,
    setLoading: E,
    isLoading: F,
    setClipboard: M,
    createIsCut: D,
    createIsCopied: O,
    isCut: G,
    isCopied: W,
    clearClipboard: Q,
    getClipboard: ie,
    setDraggedItem: _e,
    getDraggedItem: xe,
    clearDraggedItem: Ie,
    setReadOnly: (z) => {
      t.set(z);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (z) => t.get() ? !0 : z.read_only ?? !1,
    // Navigation
    goBack: fe,
    goForward: H,
    canGoBack: pe,
    canGoForward: ge,
    navigationHistory: w,
    historyIndex: v
  };
};
class It {
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
class rf extends It {
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
          const k = v.path.slice(g.length), x = k.includes("/") ? k.slice(0, k.lastIndexOf("/")) : "", $ = x ? this.join(_.path, x) : _.path;
          if (v.type === "dir")
            d(v, $);
          else {
            const p = this.uniqueName($, v.basename, n), h = this.makeFileEntry(
              $,
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
            const x = g + v.slice(c.length);
            this.contentStore.set(x, k);
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
function Xt(o, e, t) {
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
class hn extends It {
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
      ...hn.DEFAULT_URLS,
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
    delete n["Content-Type"], e.use(eo, {
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
      const l = await a.text(), r = Xt(l, a.status, a.statusText);
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
      const l = await a.text(), r = Xt(l, a.status, a.statusText);
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
class lf extends It {
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
          const k = (await this.getDB()).transaction(["content"], "readwrite"), x = k.objectStore("content"), $ = x.get(c.path);
          $.onsuccess = () => {
            const p = $.result;
            p && (x.delete(c.path), x.put({ path: _, content: p.content }));
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
          const k = v.path.slice(g.length), x = k.includes("/") ? k.slice(0, k.lastIndexOf("/")) : "", $ = x ? this.join(_.path, x) : _.path;
          if (v.type === "dir")
            await d(v, $);
          else {
            const p = await this.uniqueName($, v.basename, a), h = this.makeFileEntry(
              $,
              p,
              v.file_size || 0,
              v.mime_type
            );
            a.add(h.path), await this.upsert(h);
            const b = (await this.getDB()).transaction(["content"], "readwrite"), S = b.objectStore("content"), C = S.get(v.path);
            C.onsuccess = () => {
              const A = C.result;
              A && S.put({ path: h.path, content: A.content });
            }, await new Promise((A) => {
              b.oncomplete = () => A(void 0);
            });
          }
        }
      } else {
        const c = await this.uniqueName(r, l.basename, a), _ = this.makeFileEntry(r, c, l.file_size || 0, l.mime_type);
        a.add(_.path), await this.upsert(_);
        const w = (await this.getDB()).transaction(["content"], "readwrite"), v = w.objectStore("content"), k = v.get(l.path);
        k.onsuccess = () => {
          const x = k.result;
          x && v.put({ path: _.path, content: x.content });
        }, await new Promise((x) => {
          w.oncomplete = () => x(void 0);
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
          const k = g + v.path.slice(c.length), x = this.parent(k), $ = this.cloneEntry(v, {
            path: k,
            dir: x,
            basename: v.path === c ? _ : v.basename,
            last_modified: Date.now()
          });
          await this.upsert($);
          const h = (await this.getDB()).transaction(["content"], "readwrite"), f = h.objectStore("content"), b = f.get(v.path);
          b.onsuccess = () => {
            const S = b.result;
            S && (f.delete(v.path), f.put({ path: k, content: S.content }));
          }, await new Promise((S) => {
            h.oncomplete = () => S(void 0);
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
        const v = (await this.getDB()).transaction(["content"], "readwrite"), k = v.objectStore("content"), x = k.get(l.path);
        x.onsuccess = () => {
          const $ = x.result;
          $ && (k.delete(l.path), k.put({ path: _, content: $.content }));
        }, await new Promise(($) => {
          v.oncomplete = () => $(void 0);
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
            for (let x = 0; x < w.length; x++) v += String.fromCharCode(w[x]);
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
          v.objectStore("content").put({ path: _.path, content: g }), await new Promise((x) => {
            v.oncomplete = () => x(void 0);
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
const Jt = {
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
class ho {
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
    const t = Jt.list(e);
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
    const t = Jt.search(e.path, e.filter, e.deep, e.size);
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
function mo(o) {
  const e = Y(o.state);
  return {
    current: j(() => e.value.theme || "silver"),
    set: (a) => {
      o.set("theme", a);
    }
  };
}
const go = (o, e) => {
  const t = oo(o.id ?? "vf"), n = qn(), a = e.i18n, d = o.locale ?? e.locale, l = fo(o.id ?? "vf", o.config ?? {}), r = po();
  if (!o.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new ho(o.driver);
  return _t({
    // app version
    version: ro,
    // config store
    config: l,
    // Theme
    theme: (() => {
      const _ = mo(l);
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
    i18n: io(
      t,
      d,
      n,
      a
    ),
    // modal state
    modal: co(l),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Vn(c),
    // active features
    features: fn(o.features),
    // selection mode
    selectionMode: o.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: j(() => o.selectionFilterType || "both"),
    selectionFilterMimeIncludes: j(() => o.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: l.get("metricUnits") ? _n : Mt,
    // possible items of the context menu
    contextMenuItems: o.contextMenuItems,
    // expose custom uploader if provided
    customUploader: o.customUploader
  });
}, wo = ["data-theme"], yo = { class: "vuefinder__modal-layout__container" }, bo = { class: "vuefinder__modal-layout__content" }, ko = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, $o = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, xo = { class: "vuefinder__modal-drag-message" }, Me = /* @__PURE__ */ Z({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(o) {
    const e = P(null), t = ne();
    t.config;
    const n = o;
    me(() => {
      const d = document.querySelector(".v-f-modal input");
      d && d.focus(), Le(() => {
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
      onKeyup: l[1] || (l[1] = lt((r) => s(t).modal.close(), ["esc"]))
    }, [
      l[2] || (l[2] = i("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      i("div", yo, [
        i("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: a,
          onMousedown: l[0] || (l[0] = le((r) => s(t).modal.close(), ["self"]))
        }, [
          i("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            i("div", bo, [
              De(d.$slots, "default")
            ]),
            d.$slots.buttons ? (u(), m("div", ko, [
              De(d.$slots, "buttons")
            ])) : I("", !0)
          ], 512)
        ], 32)
      ]),
      n.showDragOverlay ? (u(), m("div", $o, [
        i("div", xo, y(n.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : I("", !0)
    ], 40, wo));
  }
}), So = { class: "vuefinder__modal-header" }, Co = { class: "vuefinder__modal-header__icon-container" }, Fo = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Oe = /* @__PURE__ */ Z({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(o) {
    return (e, t) => (u(), m("div", So, [
      i("div", Co, [
        (u(), R(rn(o.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      i("div", Fo, y(o.title), 1)
    ]));
  }
}), Do = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Po(o, e) {
  return u(), m("svg", Do, [...e[0] || (e[0] = [
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
const mn = { render: Po }, Eo = { class: "vuefinder__about-modal__content" }, To = { class: "vuefinder__about-modal__main" }, Mo = { class: "vuefinder__about-modal__tab-content" }, Io = { class: "vuefinder__about-modal__lead" }, Ao = { class: "vuefinder__about-modal__description" }, Oo = { class: "vuefinder__about-modal__links" }, Bo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Lo = { class: "vuefinder__about-modal__meta" }, zo = { class: "vuefinder__about-modal__meta-item" }, Vo = { class: "vuefinder__about-modal__meta-label" }, Ro = { class: "vuefinder__about-modal__meta-value" }, No = { class: "vuefinder__about-modal__meta-item" }, Uo = { class: "vuefinder__about-modal__meta-label" }, gn = /* @__PURE__ */ Z({
  __name: "ModalAbout",
  setup(o) {
    const e = ne(), { t } = e.i18n;
    return (n, a) => (u(), R(Me, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: a[0] || (a[0] = (d) => s(e).modal.close())
        }, y(s(t)("Close")), 1)
      ]),
      default: ae(() => [
        i("div", Eo, [
          B(Oe, {
            icon: s(mn),
            title: "Vuefinder " + s(e).version
          }, null, 8, ["icon", "title"]),
          i("div", To, [
            i("div", Mo, [
              i("div", Io, y(s(t)("A modern, customizable file manager component built for Vue.")), 1),
              i("div", Ao, y(s(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              i("div", Oo, [
                i("a", Bo, y(s(t)("Project Home")), 1),
                a[1] || (a[1] = i("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              i("div", Lo, [
                i("div", zo, [
                  i("span", Vo, y(s(t)("Version")), 1),
                  i("span", Ro, y(s(e).version), 1)
                ]),
                i("div", No, [
                  i("span", Uo, y(s(t)("License")), 1),
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
function Ho(o, e) {
  return u(), m("svg", jo, [...e[0] || (e[0] = [
    i("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const wn = { render: Ho }, Ko = { class: "vuefinder__delete-modal__content" }, qo = { class: "vuefinder__delete-modal__form" }, Go = { class: "vuefinder__delete-modal__description" }, Wo = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Yo = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qo = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xo = { class: "vuefinder__delete-modal__file-name" }, Jo = { class: "vuefinder__delete-modal__warning" }, ht = /* @__PURE__ */ Z({
  __name: "ModalDelete",
  setup(o) {
    const e = ne(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = P(e.modal.data.items), l = () => {
      d.value.length && e.adapter.delete({
        path: a.value.path,
        items: d.value.map(({ path: r, type: c }) => ({
          path: r,
          type: c
        }))
      }).then((r) => {
        de.success(t("Files deleted.")), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(Te(r, t("Failed to delete files")));
      });
    };
    return (r, c) => (u(), R(Me, null, {
      buttons: ae(() => [
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
        i("div", Jo, y(s(t)("This action cannot be undone.")), 1)
      ]),
      default: ae(() => [
        i("div", null, [
          B(Oe, {
            icon: s(wn),
            title: s(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          i("div", Ko, [
            i("div", qo, [
              i("p", Go, y(s(t)("Are you sure you want to delete these files?")), 1),
              i("div", Wo, [
                (u(!0), m(he, null, ye(d.value, (_) => (u(), m("p", {
                  key: _.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  _.type === "dir" ? (u(), m("svg", Yo, [...c[1] || (c[1] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), m("svg", Qo, [...c[2] || (c[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Xo, y(_.basename), 1)
                ]))), 128))
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
function es(o, e) {
  return u(), m("svg", Zo, [...e[0] || (e[0] = [
    i("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const yn = { render: es }, ts = { class: "vuefinder__rename-modal__content" }, ns = { class: "vuefinder__rename-modal__item" }, os = { class: "vuefinder__rename-modal__item-info" }, ss = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, is = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, as = { class: "vuefinder__rename-modal__item-name" }, mt = /* @__PURE__ */ Z({
  __name: "ModalRename",
  setup(o) {
    const e = ne(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = P(e.modal.data.items[0]), l = P(d.value.basename), r = () => {
      l.value != d.value.basename && e.adapter.rename({
        path: a.value.path,
        item: d.value.path,
        name: l.value
      }).then((c) => {
        de.success(t("%s is renamed.", l.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(Te(c, t("Failed to rename")));
      });
    };
    return (c, _) => (u(), R(Me, null, {
      buttons: ae(() => [
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
      default: ae(() => [
        i("div", null, [
          B(Oe, {
            icon: s(yn),
            title: s(t)("Rename")
          }, null, 8, ["icon", "title"]),
          i("div", ts, [
            i("div", ns, [
              i("p", os, [
                d.value.type === "dir" ? (u(), m("svg", ss, [..._[2] || (_[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), m("svg", is, [..._[3] || (_[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", as, y(d.value.basename), 1)
              ]),
              we(i("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (g) => l.value = g),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: lt(r, ["enter"])
              }, null, 544), [
                [dt, l.value]
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
  const o = ne(), e = j(() => o.features);
  return {
    enabled: (n) => e.value[n] ?? !1
  };
}
const rs = { class: "vuefinder__text-preview" }, ls = { class: "vuefinder__text-preview__header" }, ds = ["title"], cs = { class: "vuefinder__text-preview__actions" }, us = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, vs = { key: 1 }, fs = /* @__PURE__ */ Z({
  __name: "Text",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = P(""), a = P(""), d = P(null), l = P(!1), r = ne(), { enabled: c } = ze(), { t: _ } = r.i18n;
    me(async () => {
      try {
        const v = await r.adapter.getContent({ path: r.modal.data.item.path });
        n.value = v.content, t("success");
      } catch (v) {
        Te(v, "Failed to load text content"), t("success");
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
        de.error(Te(v, _("Failed to save file")));
      }
    };
    return (v, k) => (u(), m("div", rs, [
      i("div", ls, [
        i("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: s(r).modal.data.item.path
        }, y(s(r).modal.data.item.basename), 9, ds),
        i("div", cs, [
          l.value ? (u(), m("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: w
          }, y(s(_)("Save")), 1)) : I("", !0),
          s(c)("edit") ? (u(), m("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: k[0] || (k[0] = (x) => g())
          }, y(l.value ? s(_)("Cancel") : s(_)("Edit")), 1)) : I("", !0)
        ])
      ]),
      i("div", null, [
        l.value ? (u(), m("div", vs, [
          we(i("textarea", {
            ref_key: "editInput",
            ref: d,
            "onUpdate:modelValue": k[1] || (k[1] = (x) => a.value = x),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [dt, a.value]
          ])
        ])) : (u(), m("pre", us, y(n.value), 1))
      ])
    ]));
  }
}), At = async (o, e) => {
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
        await At(o, a);
    }
  }
}, $e = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function bn(o) {
  const e = ne(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = e.config, l = P({ QUEUE_ENTRY_STATUS: $e }), r = P(null), c = P(null), _ = P(null), g = P(null), w = P(null), v = P([]), k = P(""), x = P(!1), $ = P(!1), p = P(null);
  let h;
  const f = (E) => {
    E.preventDefault(), E.stopPropagation(), $.value = !0;
  }, b = (E) => {
    E.preventDefault(), E.stopPropagation(), $.value = !0;
  }, S = (E) => {
    E.preventDefault(), E.stopPropagation(), (!E.relatedTarget || E.relatedTarget === document.body) && ($.value = !1);
  }, C = (E) => {
    E.preventDefault(), E.stopPropagation(), $.value = !1;
    const F = /^[/\\](.+)/, M = E.dataTransfer;
    M && (M.items && M.items.length ? Array.from(M.items).forEach((D) => {
      if (D.kind === "file") {
        const O = D.webkitGetAsEntry?.();
        if (O)
          At((G, W) => {
            const Q = F.exec(G?.fullPath || "");
            V(W, Q ? Q[1] : W.name);
          }, O);
        else {
          const G = D.getAsFile?.();
          G && V(G);
        }
      }
    }) : M.files && M.files.length && Array.from(M.files).forEach((D) => V(D)));
  }, A = (E) => v.value.findIndex((F) => F.id === E), V = (E, F) => h.addFile({ name: F || E.name, type: E.type, data: E, source: "Local" }), X = (E) => E.status === $e.DONE ? "text-green-600" : E.status === $e.ERROR || E.status === $e.CANCELED ? "text-red-600" : "", q = (E) => E.status === $e.DONE ? "✓" : E.status === $e.ERROR || E.status === $e.CANCELED ? "!" : "...", oe = () => g.value?.click(), N = () => e.modal.close(), se = (E) => {
    if (x.value || !v.value.filter((F) => F.status !== $e.DONE).length) {
      x.value || (k.value = t("Please select file to upload first."));
      return;
    }
    k.value = "", p.value = E || a.value, h.upload();
  }, T = () => {
    h.cancelAll(), v.value.forEach((E) => {
      E.status !== $e.DONE && (E.status = $e.CANCELED, E.statusName = t("Canceled"));
    }), x.value = !1;
  }, ee = (E) => {
    x.value || (h.removeFile(E.id), v.value.splice(A(E.id), 1));
  }, K = (E) => {
    if (!x.value)
      if (h.cancelAll(), E) {
        const F = v.value.filter((M) => M.status !== $e.DONE);
        v.value = [], F.forEach((M) => V(M.originalFile, M.name));
      } else
        v.value = [];
  }, L = (E) => {
    E.forEach((F) => {
      V(F);
    });
  };
  return me(() => {
    h = new Qn({
      debug: e.debug,
      restrictions: { maxFileSize: lo(d.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (D, O) => {
        if (O[D.id] != null) {
          const W = A(D.id);
          v.value[W]?.status === $e.PENDING && (k.value = h.i18n("noDuplicates", { fileName: D.name })), v.value = v.value.filter((Q) => Q.id !== D.id);
        }
        return v.value.push({
          id: D.id,
          name: D.name,
          size: e.filesize(D.size),
          status: $e.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: D.data
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
    h.on("restriction-failed", (D, O) => {
      const G = v.value[A(D.id)];
      G && ee(G), k.value = O.message;
    }), h.on("upload-progress", (D, O) => {
      const G = O.bytesTotal ?? 1, W = Math.floor(O.bytesUploaded / G * 100), Q = A(D.id);
      Q !== -1 && v.value[Q] && (v.value[Q].percent = `${W}%`);
    }), h.on("upload-success", (D) => {
      const O = v.value[A(D.id)];
      O && (O.status = $e.DONE, O.statusName = t("Done"));
    }), h.on("upload-error", (D, O) => {
      const G = v.value[A(D.id)];
      G && (G.percent = null, G.status = $e.ERROR, G.statusName = O?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : O?.message || t("Unknown Error"));
    }), h.on("error", (D) => {
      k.value = D.message, x.value = !1, e.adapter.open(a.value.path);
    }), h.on("complete", () => {
      x.value = !1;
      const D = p.value || a.value;
      e.adapter.invalidateListQuery(D.path), e.adapter.open(D.path);
      const O = v.value.filter((G) => G.status === $e.DONE).map((G) => G.name);
      e.emitter.emit("vf-upload-complete", O);
    }), g.value?.addEventListener("click", () => c.value?.click()), w.value?.addEventListener("click", () => _.value?.click());
    const F = { capture: !0 };
    document.addEventListener("dragover", f, F), document.addEventListener("dragenter", b, F), document.addEventListener("dragleave", S, F), document.addEventListener("drop", C, F);
    const M = (D) => {
      const O = D.target, G = O.files;
      if (G) {
        for (const W of G) V(W);
        O.value = "";
      }
    };
    c.value?.addEventListener("change", M), _.value?.addEventListener("change", M);
  }), Fe(() => {
    const E = { capture: !0 };
    document.removeEventListener("dragover", f, E), document.removeEventListener("dragenter", b, E), document.removeEventListener("dragleave", S, E), document.removeEventListener("drop", C, E);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: _,
    pickFiles: g,
    pickFolders: w,
    queue: v,
    message: k,
    uploading: x,
    hasFilesInDropArea: $,
    definitions: l,
    openFileSelector: oe,
    upload: se,
    cancel: T,
    remove: ee,
    clear: K,
    close: N,
    getClassNameForEntry: X,
    getIconForEntry: q,
    addExternalFiles: L
  };
}
const _s = { class: "vuefinder__image-preview" }, ps = { class: "vuefinder__image-preview__header" }, hs = ["title"], ms = { class: "vuefinder__image-preview__actions" }, gs = { class: "vuefinder__image-preview__image-container" }, ws = ["src"], ys = /* @__PURE__ */ Z({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = ne(), { enabled: a } = ze(), { t: d } = n.i18n, l = P(!1), r = P(
      n.modal.data.item.previewUrl ?? n.adapter.getPreviewUrl({ path: n.modal.data.item.path })
    ), c = P(r.value), { addExternalFiles: _, upload: g, queue: w } = bn(n.customUploader), v = n.fs, k = Y(v.path), x = Qe("cropperRef"), $ = async () => {
      l.value = !l.value, n.modal.setEditMode(l.value);
    }, p = async () => {
      const f = x.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!f) return;
      let b = f;
      if (f.width > 1200 || f.height > 1200) {
        const X = Math.min(1200 / f.width, 1200 / f.height), q = document.createElement("canvas");
        q.width = Math.floor(f.width * X), q.height = Math.floor(f.height * X);
        const oe = q.getContext("2d");
        oe && (oe.drawImage(f, 0, 0, q.width, q.height), b = q);
      }
      const S = n.modal.data.item.basename, C = S.split(".").pop()?.toLowerCase() || "jpg", A = C === "png" ? "image/png" : C === "gif" ? "image/gif" : "image/jpeg", V = await new Promise((X) => {
        b.toBlob((q) => X(q), A);
      });
      if (!V) {
        de.error(d("Failed to save image"));
        return;
      }
      try {
        const X = new File([V], S, { type: A }), oe = n.modal.data.item.path.split("/");
        oe.pop();
        const se = {
          path: oe.join("/") || (k.value?.path ?? "")
        };
        _([X]), await new Promise((L) => setTimeout(L, 100));
        const T = w.value.find((L) => L.name === X.name);
        if (!T)
          throw new Error("File was not added to upload queue");
        g(se);
        let ee = 0;
        for (; ee < 150; ) {
          await new Promise((E) => setTimeout(E, 200));
          const L = w.value.find((E) => E.id === T.id);
          if (L?.status === $e.DONE) break;
          if (L?.status === $e.ERROR)
            throw new Error(L.statusName || "Upload failed");
          ee++;
        }
        de.success(d("Updated.")), await fetch(r.value, { cache: "reload", mode: "no-cors" });
        const K = n.root?.querySelector?.('[data-src="' + r.value + '"]');
        K && K instanceof HTMLElement && un.resetStatus(K), n.emitter.emit("vf-refresh-thumbnails"), await $(), t("success");
      } catch (X) {
        de.error(Te(X, d("Failed to save image")));
      }
    };
    return me(() => {
      t("success");
    }), (h, f) => (u(), m("div", _s, [
      i("div", ps, [
        i("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: s(n).modal.data.item.path
        }, y(s(n).modal.data.item.basename), 9, hs),
        i("div", ms, [
          l.value ? (u(), m("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: p
          }, y(s(d)("Crop")), 1)) : I("", !0),
          s(a)("edit") ? (u(), m("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: f[0] || (f[0] = (b) => $())
          }, y(l.value ? s(d)("Cancel") : s(d)("Edit")), 1)) : I("", !0)
        ])
      ]),
      i("div", gs, [
        l.value ? (u(), R(s(Xn), {
          key: 1,
          ref_key: "cropperRef",
          ref: x,
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
        }, null, 8, ws))
      ])
    ]));
  }
}), bs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ks(o, e) {
  return u(), m("svg", bs, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const at = { render: ks }, $s = { class: "vuefinder__default-preview" }, xs = { class: "vuefinder__default-preview__content" }, Ss = { class: "vuefinder__default-preview__header" }, Cs = ["title"], Fs = { class: "vuefinder__default-preview__icon-container" }, Ds = ["title"], Ps = /* @__PURE__ */ Z({
  __name: "Default",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = ne(), n = e;
    return me(() => {
      n("success");
    }), (a, d) => (u(), m("div", $s, [
      i("div", xs, [
        i("div", Ss, [
          i("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Cs)
        ]),
        i("div", Fs, [
          B(s(at), { class: "vuefinder__default-preview__file-icon" }),
          i("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Ds)
        ])
      ])
    ]));
  }
}), Es = { class: "vuefinder__video-preview" }, Ts = ["title"], Ms = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Is = ["src"], As = /* @__PURE__ */ Z({
  __name: "Video",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = ne(), n = e, a = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return me(() => {
      n("success");
    }), (d, l) => (u(), m("div", Es, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Ts),
      i("div", null, [
        i("video", Ms, [
          i("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Is),
          l[0] || (l[0] = ue(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Os = { class: "vuefinder__audio-preview" }, Bs = ["title"], Ls = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, zs = ["src"], Vs = /* @__PURE__ */ Z({
  __name: "Audio",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = ne(), a = () => {
      const d = ne();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return me(() => {
      t("success");
    }), (d, l) => (u(), m("div", Os, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: s(n).modal.data.item.path
      }, y(s(n).modal.data.item.basename), 9, Bs),
      i("div", null, [
        i("audio", Ls, [
          i("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, zs),
          l[0] || (l[0] = ue(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Rs = { class: "vuefinder__pdf-preview" }, Ns = ["title"], Us = ["data"], js = ["src"], Hs = /* @__PURE__ */ Z({
  __name: "Pdf",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = ne(), n = e, a = () => {
      const d = ne();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return me(() => {
      n("success");
    }), (d, l) => (u(), m("div", Rs, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Ns),
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
          }, " Your browser does not support PDFs ", 8, js)
        ], 8, Us)
      ])
    ]));
  }
});
function Ks(o, e = null) {
  return new Date(o * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const qs = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Gs = ["disabled", "title"], Ws = ["disabled", "title"], Ys = { class: "vuefinder__preview-modal__content" }, Qs = { key: 0 }, Xs = { class: "vuefinder__preview-modal__loading" }, Js = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Zs = { class: "vuefinder__preview-modal__details" }, ei = { class: "font-bold" }, ti = { class: "pl-2 font-bold" }, ni = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, oi = ["download", "href"], gt = /* @__PURE__ */ Z({
  __name: "ModalPreview",
  setup(o) {
    const e = ne(), { enabled: t } = ze(), { t: n } = e.i18n, a = P(!1), d = (f) => {
      const b = (f || "").split("/").pop() || "", S = b.lastIndexOf(".");
      return S >= 0 ? b.slice(S + 1).toLowerCase() : "";
    }, l = (f, b) => {
      if (!b) return !1;
      const S = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), C = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), A = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), V = /* @__PURE__ */ new Set([
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
      return f === "image" ? S.has(b) : f === "video" ? C.has(b) : f === "audio" ? A.has(b) : f === "text" ? V.has(b) : f === "application/pdf" ? b === "pdf" : !1;
    }, r = (f) => {
      const b = e.modal.data.item.mime_type;
      if (b && typeof b == "string") return b.startsWith(f);
      const S = d(e.modal.data.item.path);
      return l(f, S);
    }, c = t("preview");
    c || (a.value = !0);
    const _ = j(() => e.modal.data.item), g = Y(e.fs.sortedFiles), w = j(() => g.value.filter((f) => f.type === "file")), v = j(
      () => w.value.findIndex((f) => f.path === _.value.path)
    ), k = j(() => v.value > 0), x = j(() => v.value < w.value.length - 1), $ = () => {
      if (e.modal.editMode || !k.value) return;
      const f = w.value[v.value - 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, p = () => {
      if (e.modal.editMode || !x.value) return;
      const f = w.value[v.value + 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, h = (f) => {
      if (f.key === "Escape") {
        f.preventDefault(), f.stopPropagation(), e.modal.close();
        return;
      }
      (f.key === "ArrowLeft" || f.key === "ArrowRight") && (f.preventDefault(), f.stopPropagation(), f.key === "ArrowLeft" ? $() : p());
    };
    return me(() => {
      const f = document.querySelector(".vuefinder__preview-modal");
      f && f.focus();
    }), (f, b) => (u(), R(Me, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[6] || (b[6] = (S) => s(e).modal.close())
        }, y(s(n)("Close")), 1),
        s(t)("download") ? (u(), m("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path }),
          href: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path })
        }, y(s(n)("Download")), 9, oi)) : I("", !0)
      ]),
      default: ae(() => [
        i("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: h
        }, [
          s(e).modal.editMode ? I("", !0) : (u(), m("div", qs, [
            i("button", {
              disabled: !k.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: s(n)("Previous file"),
              onClick: $
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
            ])], 8, Gs),
            i("button", {
              disabled: !x.value,
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
            ])], 8, Ws)
          ])),
          i("div", Ys, [
            s(c) ? (u(), m("div", Qs, [
              r("text") ? (u(), R(fs, {
                key: `text-${_.value.path}`,
                onSuccess: b[0] || (b[0] = (S) => a.value = !0)
              })) : r("image") ? (u(), R(ys, {
                key: `image-${_.value.path}`,
                onSuccess: b[1] || (b[1] = (S) => a.value = !0)
              })) : r("video") ? (u(), R(As, {
                key: `video-${_.value.path}`,
                onSuccess: b[2] || (b[2] = (S) => a.value = !0)
              })) : r("audio") ? (u(), R(Vs, {
                key: `audio-${_.value.path}`,
                onSuccess: b[3] || (b[3] = (S) => a.value = !0)
              })) : r("application/pdf") ? (u(), R(Hs, {
                key: `pdf-${_.value.path}`,
                onSuccess: b[4] || (b[4] = (S) => a.value = !0)
              })) : (u(), R(Ps, {
                key: `default-${_.value.path}`,
                onSuccess: b[5] || (b[5] = (S) => a.value = !0)
              }))
            ])) : I("", !0),
            i("div", Xs, [
              a.value === !1 ? (u(), m("div", Js, [
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
              ])) : I("", !0)
            ])
          ])
        ], 32),
        i("div", Zs, [
          i("div", null, [
            i("span", ei, y(s(n)("File Size")) + ": ", 1),
            ue(y(s(e).filesize(s(e).modal.data.item.file_size)), 1)
          ]),
          i("div", null, [
            i("span", ti, y(s(n)("Last Modified")) + ": ", 1),
            ue(" " + y(s(Ks)(s(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        s(t)("download") ? (u(), m("div", ni, [
          i("span", null, y(s(n)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : I("", !0)
      ]),
      _: 1
    }));
  }
}), si = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function ii(o, e) {
  return u(), m("svg", si, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const ai = { render: ii }, ri = {
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
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ot = { render: li }, di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ci(o, e) {
  return u(), m("svg", di, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Re = { render: ci }, ui = {
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
    i("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const wt = { render: vi }, fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function _i(o, e) {
  return u(), m("svg", fi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const yt = { render: _i }, pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function hi(o, e) {
  return u(), m("svg", pi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const Bt = { render: hi }, mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function gi(o, e) {
  return u(), m("svg", mi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const Lt = { render: gi }, wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function yi(o, e) {
  return u(), m("svg", wi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const zt = { render: yi }, bi = { class: "vuefinder__modal-tree__folder-item" }, ki = { class: "vuefinder__modal-tree__folder-content" }, $i = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, xi = { class: "vuefinder__modal-tree__folder-text" }, Si = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Ci = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Fi = 300, Di = /* @__PURE__ */ Z({
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
    const t = ne(), { t: n } = t.i18n, a = t.fs, d = P({}), l = o, r = e;
    Y(a.path);
    const c = j(() => {
      const V = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[V] || !1;
    }), _ = j(() => l.modelValue?.path === l.folder.path), g = j(() => l.currentPath?.path === l.folder.path), w = j(() => l.modalTreeData[l.folder.path] || []), v = j(() => {
      const V = w.value, X = d.value[l.folder.path] || 50;
      return V.length > X ? V.slice(0, X) : V;
    }), k = j(() => w.value.length), x = j(() => d.value[l.folder.path] || 50), $ = j(() => k.value > x.value), p = () => {
      d.value[l.folder.path] = (x.value || 50) + 50;
    }, h = j(() => w.value.length > 0 || l.folder.type === "dir"), f = () => {
      r("toggleFolder", l.storage, l.folder.path);
    }, b = () => {
      r("update:modelValue", l.folder);
    }, S = () => {
      r("update:modelValue", l.folder), r("selectAndClose", l.folder);
    };
    let C = 0;
    const A = () => {
      const V = Date.now();
      V - C < Fi ? S() : b(), C = V;
    };
    return (V, X) => {
      const q = ln("ModalTreeFolderItem", !0);
      return u(), m("div", bi, [
        i("div", ki, [
          h.value ? (u(), m("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: f
          }, [
            c.value ? (u(), R(s(yt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), R(s(wt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), m("div", $i)),
          i("div", {
            class: te(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": _.value,
              "vuefinder__modal-tree__folder-link--current": g.value
            }]),
            onClick: b,
            onDblclick: S,
            onTouchend: A
          }, [
            c.value ? (u(), R(s(zt), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), R(s(Re), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            i("span", xi, y(o.folder.basename), 1)
          ], 34)
        ]),
        c.value && h.value ? (u(), m("div", Si, [
          (u(!0), m(he, null, ye(v.value, (oe) => (u(), R(q, {
            key: oe.path,
            folder: oe,
            storage: o.storage,
            "model-value": o.modelValue,
            "expanded-folders": o.expandedFolders,
            "modal-tree-data": o.modalTreeData,
            "current-path": o.currentPath,
            "onUpdate:modelValue": X[0] || (X[0] = (N) => V.$emit("update:modelValue", N)),
            onSelectAndClose: X[1] || (X[1] = (N) => V.$emit("selectAndClose", N)),
            onToggleFolder: X[2] || (X[2] = (N, se) => V.$emit("toggleFolder", N, se))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          $.value ? (u(), m("div", Ci, [
            i("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: p
            }, y(s(n)("load more")), 1)
          ])) : I("", !0)
        ])) : I("", !0)
      ]);
    };
  }
}), Pi = { class: "vuefinder__modal-tree" }, Ei = { class: "vuefinder__modal-tree__header" }, Ti = { class: "vuefinder__modal-tree__title" }, Mi = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Ii = { class: "vuefinder__modal-tree__section-title" }, Ai = { class: "vuefinder__modal-tree__list" }, Oi = ["onClick", "onDblclick", "onTouchend"], Bi = { class: "vuefinder__modal-tree__text" }, Li = { class: "vuefinder__modal-tree__text-storage" }, zi = { class: "vuefinder__modal-tree__section-title" }, Vi = { class: "vuefinder__modal-tree__list" }, Ri = { class: "vuefinder__modal-tree__storage-item" }, Ni = { class: "vuefinder__modal-tree__storage-content" }, Ui = ["onClick"], ji = ["onClick", "onDblclick", "onTouchend"], Hi = { class: "vuefinder__modal-tree__storage-text" }, Ki = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, qi = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Gi = ["onClick"], Zt = 300, Vt = /* @__PURE__ */ Z({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(o, { emit: e }) {
    const t = ne(), { t: n } = t.i18n, a = t.fs, d = t.config, l = e, r = Y(a.sortedFiles), c = Y(a.storages), _ = j(() => c.value || []), g = Y(a.path), w = P(null), v = P({}), k = P({}), x = P({});
    ve(r, (T) => {
      const ee = T.filter((L) => L.type === "dir"), K = g.value?.path || "";
      K && (k.value[K] = ee.map((L) => ({
        ...L,
        type: "dir"
      })));
    });
    const $ = (T, ee) => {
      const K = `${T}:${ee}`;
      v.value = {
        ...v.value,
        [K]: !v.value[K]
      }, v.value[K] && !k.value[ee] && t.adapter.list(ee).then((L) => {
        const F = (L.files || []).filter((M) => M.type === "dir");
        k.value[ee] = F.map((M) => ({
          ...M,
          type: "dir"
        }));
      });
    }, p = (T) => k.value[T] || [], h = (T) => x.value[T] || 50, f = (T) => {
      const ee = p(T), K = h(T);
      return ee.length > K ? ee.slice(0, K) : ee;
    }, b = (T) => p(T).length, S = (T) => b(T) > h(T), C = (T) => {
      x.value[T] = h(T) + 50;
    }, A = (T) => {
      T && l("update:modelValue", T);
    }, V = (T) => {
      T && (l("update:modelValue", T), l("selectAndClose", T));
    }, X = (T) => {
      const ee = {
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
      l("update:modelValue", ee);
    }, q = (T) => {
      const ee = {
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
      l("update:modelValue", ee), l("selectAndClose", ee);
    };
    let oe = 0;
    const N = (T) => {
      if (!T) return;
      const ee = Date.now();
      ee - oe < Zt ? V(T) : A(T), oe = ee;
    }, se = (T) => {
      const ee = Date.now();
      ee - oe < Zt ? q(T) : X(T), oe = ee;
    };
    return me(() => {
      w.value && nt(w.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (T, ee) => (u(), m("div", Pi, [
      i("div", Ei, [
        i("div", Ti, y(s(n)("Select Target Folder")), 1)
      ]),
      i("div", {
        ref_key: "modalContentElement",
        ref: w,
        class: "vuefinder__modal-tree__content"
      }, [
        o.showPinnedFolders && s(t).features.pinned && s(d).get("pinnedFolders").length ? (u(), m("div", Mi, [
          i("div", Ii, y(s(n)("Pinned Folders")), 1),
          i("div", Ai, [
            (u(!0), m(he, null, ye(s(d).get("pinnedFolders"), (K) => (u(), m("div", {
              key: K.path,
              class: te(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": o.modelValue?.path === K.path }]),
              onClick: (L) => A(K),
              onDblclick: (L) => V(K),
              onTouchend: (L) => N(K)
            }, [
              B(s(Re), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              i("div", Bi, y(K.basename), 1),
              i("div", Li, y(K.storage), 1),
              B(s(Bt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Oi))), 128))
          ])
        ])) : I("", !0),
        i("div", zi, y(s(n)("Storages")), 1),
        (u(!0), m(he, null, ye(_.value, (K) => (u(), m("div", {
          key: K,
          class: "vuefinder__modal-tree__section"
        }, [
          i("div", Vi, [
            i("div", Ri, [
              i("div", Ni, [
                i("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: le((L) => $(K, K + "://"), ["stop"])
                }, [
                  v.value[`${K}:${K}://`] ? (u(), R(s(yt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), R(s(wt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Ui),
                i("div", {
                  class: te(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": o.modelValue?.path === K + "://"
                  }]),
                  onClick: (L) => X(K),
                  onDblclick: (L) => q(K),
                  onTouchend: (L) => se(K)
                }, [
                  B(s(Lt), { class: "vuefinder__modal-tree__storage-icon" }),
                  i("span", Hi, y(K), 1)
                ], 42, ji)
              ]),
              v.value[`${K}:${K}://`] ? (u(), m("div", Ki, [
                (u(!0), m(he, null, ye(f(K + "://"), (L) => (u(), R(Di, {
                  key: L.path,
                  folder: L,
                  storage: K,
                  "model-value": o.modelValue,
                  "expanded-folders": v.value,
                  "modal-tree-data": k.value,
                  "current-path": o.currentPath,
                  "onUpdate:modelValue": A,
                  onSelectAndClose: V,
                  onToggleFolder: $
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                S(K + "://") ? (u(), m("div", qi, [
                  i("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (L) => C(K + "://")
                  }, y(s(n)("load more")), 9, Gi)
                ])) : I("", !0)
              ])) : I("", !0)
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
  setup(o, { emit: e }) {
    const t = e, n = ne(), { t: a } = n.i18n, d = P(!1), l = P(null), r = P(l.value?.innerHTML);
    ve(r, () => d.value = !1);
    const c = () => {
      t("hidden"), d.value = !0;
    };
    return (_, g) => (u(), m("div", null, [
      d.value ? I("", !0) : (u(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: te(["vuefinder__message", o.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        De(_.$slots, "default"),
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
        ])], 8, Wi)
      ], 2))
    ]));
  }
}), Yi = { class: "vuefinder__move-modal__content" }, Qi = { class: "vuefinder__move-modal__description" }, Xi = { class: "vuefinder__move-modal__files vf-scrollbar" }, Ji = { class: "vuefinder__move-modal__file-name" }, Zi = { class: "vuefinder__move-modal__target-title" }, ea = { class: "vuefinder__move-modal__target-container" }, ta = { class: "vuefinder__move-modal__target-path" }, na = { class: "vuefinder__move-modal__target-storage" }, oa = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, sa = { class: "vuefinder__move-modal__target-badge" }, ia = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, aa = { class: "vuefinder__move-modal__checkbox-label" }, ra = { class: "vuefinder__move-modal__checkbox-text" }, la = ["disabled"], da = { class: "vuefinder__move-modal__selected-items" }, kn = /* @__PURE__ */ Z({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(o) {
    const e = ne(), { enabled: t } = ze(), { t: n } = e.i18n, a = o, d = P(e.modal.data.items.from), l = P(e.modal.data.items.to), r = P(""), c = P(a.copy || !t("move")), _ = j(() => c.value ? "copy" : "move"), g = P(!1), w = Y(e.fs.path), v = j(() => c.value ? n("Copy files") : n("Move files")), k = j(
      () => c.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), x = j(() => c.value ? n("Yes, Copy!") : n("Yes, Move!"));
    j(() => c.value ? n("Files copied.") : n("Files moved."));
    const $ = (C) => {
      C && (l.value = C);
    }, p = (C) => {
      C && (l.value = C, g.value = !1);
    }, h = j(() => {
      const C = l.value;
      return C ? d.value.some((A) => !!(C.path === A.path || A.path.startsWith(C.path + "/") || A.type === "dir" && C.path.startsWith(A.path + "/"))) : !0;
    }), f = j(() => {
      if (!h.value)
        return "";
      const C = l.value;
      return C ? d.value.find((V) => C.path === V.path || V.path.startsWith(C.path + "/") || V.type === "dir" && C.path.startsWith(V.path + "/")) ? n("Cannot move/copy item to itself or its parent/child directory") : n("Invalid destination directory") : n("Please select a destination directory");
    }), b = () => {
      const C = l.value.path;
      if (!C) return { storage: "local", path: "" };
      if (C.endsWith("://"))
        return { storage: C.replace("://", ""), path: "" };
      const A = C.split("://");
      return {
        storage: A[0] || "local",
        path: A[1] || ""
      };
    }, S = async () => {
      if (d.value.length)
        try {
          const { files: C } = await e.adapter[_.value]({
            path: w.value.path,
            sources: d.value.map(({ path: A }) => A),
            destination: l.value.path
          });
          e.fs.setFiles(C), e.modal.close();
        } catch (C) {
          de.error(Te(C, n("Failed to transfer files")));
        }
    };
    return (C, A) => (u(), R(Me, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: S
        }, y(x.value), 9, la),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: A[4] || (A[4] = (V) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1),
        i("div", da, y(s(n)("%s item(s) selected.", d.value.length)), 1)
      ]),
      default: ae(() => [
        i("div", null, [
          B(Oe, {
            icon: c.value ? s(Ot) : s(ai),
            title: v.value
          }, null, 8, ["icon", "title"]),
          i("div", Yi, [
            i("p", Qi, y(k.value), 1),
            i("div", Xi, [
              (u(!0), m(he, null, ye(d.value, (V) => (u(), m("div", {
                key: V.path,
                class: "vuefinder__move-modal__file"
              }, [
                i("div", null, [
                  V.type === "dir" ? (u(), R(s(Re), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), R(s(at), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                i("div", Ji, y(V.path), 1)
              ]))), 128))
            ]),
            i("h4", Zi, y(s(n)("Target Directory")), 1),
            i("div", ea, [
              i("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: A[0] || (A[0] = (V) => g.value = !g.value)
              }, [
                i("div", ta, [
                  i("span", na, y(b().storage) + "://", 1),
                  b().path ? (u(), m("span", oa, y(b().path), 1)) : I("", !0)
                ]),
                i("span", sa, y(s(n)("Browse")), 1)
              ])
            ]),
            i("div", {
              class: te([
                "vuefinder__move-modal__tree-selector",
                g.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              B(Vt, {
                modelValue: l.value,
                "onUpdate:modelValue": [
                  A[1] || (A[1] = (V) => l.value = V),
                  $
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: p
              }, null, 8, ["modelValue"])
            ], 2),
            s(t)("copy") && s(t)("move") ? (u(), m("div", ia, [
              i("label", aa, [
                we(i("input", {
                  "onUpdate:modelValue": A[2] || (A[2] = (V) => c.value = V),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Pt, c.value]
                ]),
                i("span", ra, y(s(n)("Create a copy instead of moving")), 1)
              ])
            ])) : I("", !0),
            f.value ? (u(), R(Ft, {
              key: 1,
              error: ""
            }, {
              default: ae(() => [
                ue(y(f.value), 1)
              ]),
              _: 1
            })) : I("", !0),
            r.value.length && !f.value ? (u(), R(Ft, {
              key: 2,
              error: "",
              onHidden: A[3] || (A[3] = (V) => r.value = "")
            }, {
              default: ae(() => [
                ue(y(r.value), 1)
              ]),
              _: 1
            })) : I("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Je = /* @__PURE__ */ Z({
  __name: "ModalMove",
  setup(o) {
    return (e, t) => (u(), R(kn, { copy: !1 }));
  }
}), Rt = /* @__PURE__ */ Z({
  __name: "ModalCopy",
  setup(o) {
    return (e, t) => (u(), R(kn, { copy: !0 }));
  }
}), ca = (o, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && o(...a), clearTimeout(n), n = setTimeout(() => {
      o(...a);
    }, e);
  };
}, $n = (o, e, t) => {
  const n = P(o);
  return Rn((a, d) => ({
    get() {
      return a(), n.value;
    },
    set: ca(
      (l) => {
        n.value = l, d();
      },
      e,
      !1
    )
  }));
}, ua = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function va(o, e) {
  return u(), m("svg", ua, [...e[0] || (e[0] = [
    i("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Nt = { render: va }, fa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function _a(o, e) {
  return u(), m("svg", fa, [...e[0] || (e[0] = [
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
const bt = { render: _a }, pa = { class: "vuefinder__search-modal__search-input" }, ha = ["value", "placeholder", "disabled"], ma = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, ga = /* @__PURE__ */ Z({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(o, { expose: e, emit: t }) {
    const n = t, a = ne(), { t: d } = a.i18n, l = P(null), r = (_) => {
      const g = _.target;
      n("update:modelValue", g.value);
    }, c = (_) => {
      n("keydown", _);
    };
    return e({
      focus: () => {
        l.value && l.value.focus();
      }
    }), (_, g) => (u(), m("div", pa, [
      B(s(Nt), { class: "vuefinder__search-modal__search-icon" }),
      i("input", {
        ref_key: "searchInput",
        ref: l,
        value: o.modelValue,
        type: "text",
        placeholder: s(d)("Search Files"),
        disabled: o.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: g[0] || (g[0] = le(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, ha),
      o.isSearching ? (u(), m("div", ma, [
        B(s(bt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : I("", !0)
    ]));
  }
}), wa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ya(o, e) {
  return u(), m("svg", wa, [...e[0] || (e[0] = [
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
const xn = { render: ya }, ba = ["disabled", "title"], ka = ["data-theme"], $a = { class: "vuefinder__search-modal__dropdown-content" }, xa = { class: "vuefinder__search-modal__dropdown-section" }, Sa = { class: "vuefinder__search-modal__dropdown-title" }, Ca = { class: "vuefinder__search-modal__dropdown-options" }, Fa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Da = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Pa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ea = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ta = /* @__PURE__ */ Z({
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
    const n = o, a = t, d = ne(), { t: l } = d.i18n, r = P(null), c = P(null);
    let _ = null;
    const g = ($) => {
      if (a("update:selectedOption", $), $.startsWith("size-")) {
        const p = $.split("-")[1];
        a("update:sizeFilter", p);
      }
    }, w = async () => {
      n.disabled || (n.visible ? (a("update:visible", !1), _ && (_(), _ = null)) : (a("update:visible", !0), await Le(), await v()));
    }, v = async () => {
      if (!(!r.value || !c.value) && (await Le(), !(!r.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: $, y: p } = await Xe(r.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [ot(8), st({ padding: 16 }), it({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${$}px`,
            top: `${p}px`
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
          _ = Et(r.value, c.value, async () => {
            if (!(!r.value || !c.value))
              try {
                const { x: $, y: p } = await Xe(
                  r.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [ot(8), st({ padding: 16 }), it({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${$}px`,
                  top: `${p}px`
                });
              } catch ($) {
                console.warn("Floating UI positioning error:", $);
              }
          });
        } catch ($) {
          console.warn("Floating UI autoUpdate setup error:", $), _ = null;
        }
      }
    }, k = ($) => {
      if (!n.visible) return;
      const p = ["size-all", "size-small", "size-medium", "size-large"], h = p.findIndex((f) => f === n.selectedOption);
      if ($.key === "ArrowDown") {
        $.preventDefault();
        const f = (h + 1) % p.length;
        a("update:selectedOption", p[f] || null);
      } else if ($.key === "ArrowUp") {
        $.preventDefault();
        const f = h <= 0 ? p.length - 1 : h - 1;
        a("update:selectedOption", p[f] || null);
      } else $.key === "Enter" ? ($.preventDefault(), n.selectedOption?.startsWith("size-") && a(
        "update:sizeFilter",
        n.selectedOption.split("-")[1]
      )) : $.key === "Escape" && ($.preventDefault(), a("update:visible", !1), _ && (_(), _ = null));
    }, x = () => {
      _ && (_(), _ = null);
    };
    return ve(
      () => n.visible,
      ($) => {
        !$ && _ && (_(), _ = null);
      }
    ), Fe(() => {
      x();
    }), e({
      cleanup: x
    }), ($, p) => (u(), m(he, null, [
      i("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: te(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": o.visible }]),
        disabled: o.disabled,
        title: s(l)("Search Options"),
        onClick: le(w, ["stop"])
      }, [
        B(s(xn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, ba),
      (u(), R(pt, { to: "body" }, [
        o.visible ? (u(), m("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": s(d).theme.current,
          tabindex: "-1",
          onClick: p[4] || (p[4] = le(() => {
          }, ["stop"])),
          onKeydown: k
        }, [
          i("div", $a, [
            i("div", xa, [
              i("div", Sa, y(s(l)("File Size")), 1),
              i("div", Ca, [
                i("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "all"
                  }]),
                  onClick: p[0] || (p[0] = le((h) => g("size-all"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("All Files")), 1),
                  o.sizeFilter === "all" ? (u(), m("div", Fa, [...p[5] || (p[5] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : I("", !0)
                ], 2),
                i("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "small"
                  }]),
                  onClick: p[1] || (p[1] = le((h) => g("size-small"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Small (< 1MB)")), 1),
                  o.sizeFilter === "small" ? (u(), m("div", Da, [...p[6] || (p[6] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : I("", !0)
                ], 2),
                i("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "medium"
                  }]),
                  onClick: p[2] || (p[2] = le((h) => g("size-medium"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Medium (1-10MB)")), 1),
                  o.sizeFilter === "medium" ? (u(), m("div", Pa, [...p[7] || (p[7] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : I("", !0)
                ], 2),
                i("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "large"
                  }]),
                  onClick: p[3] || (p[3] = le((h) => g("size-large"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Large (> 10MB)")), 1),
                  o.sizeFilter === "large" ? (u(), m("div", Ea, [...p[8] || (p[8] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : I("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, ka)) : I("", !0)
      ]))
    ], 64));
  }
});
function Sn(o, e = 40) {
  const t = o.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return o;
  const n = t[1], a = t[2] ?? "", d = a.split("/").filter(Boolean), l = d.pop();
  if (!l) return n + a;
  let r = `${n}${d.join("/")}${d.length ? "/" : ""}${l}`;
  if (r.length <= e) return r;
  const c = l.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", g = c[1] ?? "", w = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, v = g ? `${w}.${g}` : w;
  return r = `${n}${d.join("/")}${d.length ? "/" : ""}${v}`, r.length > e && (r = `${n}.../${v}`), r;
}
async function Cn(o) {
  try {
    await navigator.clipboard.writeText(o);
  } catch {
    const e = document.createElement("textarea");
    e.value = o, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function rt(o) {
  await Cn(o);
}
async function Ma(o) {
  await Cn(o);
}
const Ia = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Aa(o, e) {
  return u(), m("svg", Ia, [...e[0] || (e[0] = [
    i("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Fn = { render: Aa }, Oa = ["title"], Ba = { class: "vuefinder__search-modal__result-icon" }, La = { class: "vuefinder__search-modal__result-content" }, za = { class: "vuefinder__search-modal__result-name" }, Va = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Ra = ["title"], Na = ["title"], Ua = ["data-item-dropdown", "data-theme"], ja = { class: "vuefinder__search-modal__item-dropdown-content" }, Ha = /* @__PURE__ */ Z({
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
    const t = o, n = e, a = ne(), { t: d } = a.i18n, l = P(null);
    let r = null;
    ve(
      () => t.activeDropdown,
      (h) => {
        r && (r(), r = null), h === t.item.path && l.value && Le(() => {
          w(t.item.path, l.value);
        });
      }
    ), Fe(() => {
      r && (r(), r = null);
    });
    const c = (h) => t.expandedPaths.has(h), _ = (h) => h.type === "dir" || !h.file_size ? "" : Mt(h.file_size), g = (h, f) => {
      f.stopPropagation(), n("toggleItemDropdown", h, f);
    }, w = async (h, f) => {
      const b = document.querySelector(
        `[data-item-dropdown="${h}"]`
      );
      if (!(!b || !f) && (await Le(), !(!b || !f))) {
        Object.assign(b.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: S, y: C } = await Xe(f, b, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [ot(8), st({ padding: 16 }), it({ padding: 16 })]
          });
          Object.assign(b.style, {
            left: `${S}px`,
            top: `${C}px`
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
          r = Et(f, b, async () => {
            if (!(!f || !b))
              try {
                const { x: S, y: C } = await Xe(f, b, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [ot(8), st({ padding: 16 }), it({ padding: 16 })]
                });
                Object.assign(b.style, {
                  left: `${S}px`,
                  top: `${C}px`
                });
              } catch (S) {
                console.warn("Floating UI positioning error:", S);
              }
          });
        } catch (S) {
          console.warn("Floating UI autoUpdate setup error:", S), r = null;
        }
      }
    }, v = (h) => {
      n("update:selectedItemDropdownOption", h);
    }, k = async (h) => {
      await rt(h.path), n("copyPath", h);
    }, x = (h) => {
      n("openContainingFolder", h);
    }, $ = (h) => {
      n("preview", h);
    }, p = (h) => {
      if (!t.activeDropdown) return;
      const f = ["copy-path", "open-folder", "preview"], b = t.selectedItemDropdownOption, S = f.findIndex((C) => b?.includes(C));
      if (h.key === "ArrowDown") {
        h.preventDefault();
        const C = (S + 1) % f.length;
        n(
          "update:selectedItemDropdownOption",
          `${f[C] || ""}-${t.activeDropdown}`
        );
      } else if (h.key === "ArrowUp") {
        h.preventDefault();
        const C = S <= 0 ? f.length - 1 : S - 1;
        n(
          "update:selectedItemDropdownOption",
          `${f[C] || ""}-${t.activeDropdown}`
        );
      } else h.key === "Enter" ? (h.preventDefault(), b && (b.includes("copy-path") ? k(t.item) : b.includes("open-folder") ? x(t.item) : b.includes("preview") && $(t.item))) : h.key === "Escape" && (h.preventDefault(), n("update:selectedItemDropdownOption", null));
    };
    return (h, f) => (u(), m("div", {
      class: te(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": o.index === o.selectedIndex }]),
      title: o.item.basename,
      onClick: f[9] || (f[9] = (b) => n("select", o.index))
    }, [
      i("div", Ba, [
        o.item.type === "dir" ? (u(), R(s(Re), { key: 0 })) : (u(), R(s(at), { key: 1 }))
      ]),
      i("div", La, [
        i("div", za, [
          ue(y(o.item.basename) + " ", 1),
          _(o.item) ? (u(), m("span", Va, y(_(o.item)), 1)) : I("", !0)
        ]),
        i("div", {
          class: "vuefinder__search-modal__result-path",
          title: o.item.path,
          onClick: f[0] || (f[0] = le((b) => {
            n("select", o.index), n("togglePathExpansion", o.item.path);
          }, ["stop"]))
        }, y(c(o.item.path) ? o.item.path : s(Sn)(o.item.path)), 9, Ra)
      ]),
      i("button", {
        ref_key: "buttonElementRef",
        ref: l,
        class: "vuefinder__search-modal__result-actions",
        title: s(d)("More actions"),
        onClick: f[1] || (f[1] = (b) => {
          n("selectWithDropdown", o.index), g(o.item.path, b);
        })
      }, [
        B(s(Fn), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Na),
      (u(), R(pt, { to: "body" }, [
        o.activeDropdown === o.item.path ? (u(), m("div", {
          key: 0,
          "data-item-dropdown": o.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": s(a).theme.current,
          tabindex: "-1",
          onClick: f[8] || (f[8] = le(() => {
          }, ["stop"])),
          onKeydown: p
        }, [
          i("div", ja, [
            i("div", {
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `copy-path-${o.item.path}`
              }]),
              onClick: f[2] || (f[2] = (b) => {
                v(`copy-path-${o.item.path}`), k(o.item);
              }),
              onFocus: f[3] || (f[3] = (b) => v(`copy-path-${o.item.path}`))
            }, [
              B(s(Ot), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Copy Path")), 1)
            ], 34),
            i("div", {
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `open-folder-${o.item.path}`
              }]),
              onClick: f[4] || (f[4] = (b) => {
                v(`open-folder-${o.item.path}`), x(o.item);
              }),
              onFocus: f[5] || (f[5] = (b) => v(`open-folder-${o.item.path}`))
            }, [
              B(s(Re), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Open Containing Folder")), 1)
            ], 34),
            i("div", {
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `preview-${o.item.path}`
              }]),
              onClick: f[6] || (f[6] = (b) => {
                v(`preview-${o.item.path}`), $(o.item);
              }),
              onFocus: f[7] || (f[7] = (b) => v(`preview-${o.item.path}`))
            }, [
              B(s(at), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Preview")), 1)
            ], 34)
          ])
        ], 40, Ua)) : I("", !0)
      ]))
    ], 10, Oa));
  }
}), Ka = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, qa = { class: "vuefinder__search-modal__loading-icon" }, Ga = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Wa = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, Ya = { class: "vuefinder__search-modal__results-header" }, Ye = 60, en = 5, Qa = /* @__PURE__ */ Z({
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
    const n = o, a = t, d = ne(), { t: l } = d.i18n, r = Qe("scrollableContainer"), c = j(() => n.searchResults.length > 0), _ = j(() => n.searchResults.length), g = P(0), w = P(600), v = j(() => n.searchResults.length * Ye), k = j(() => {
      const b = Math.max(0, Math.floor(g.value / Ye) - en), S = Math.min(
        n.searchResults.length,
        Math.ceil((g.value + w.value) / Ye) + en
      );
      return { start: b, end: S };
    }), x = j(() => {
      const { start: b, end: S } = k.value;
      return n.searchResults.slice(b, S).map((C, A) => ({
        item: C,
        index: b + A,
        top: (b + A) * Ye
      }));
    }), $ = (b) => {
      const S = b.target;
      g.value = S.scrollTop;
    }, p = () => {
      r.value && (w.value = r.value.clientHeight);
    }, h = () => {
      if (n.selectedIndex >= 0 && r.value) {
        const b = n.selectedIndex * Ye, S = b + Ye, C = r.value.scrollTop, A = r.value.clientHeight, V = C + A;
        let X = C;
        b < C ? X = b : S > V && (X = S - A), X !== C && r.value.scrollTo({
          top: X,
          behavior: "smooth"
        });
      }
    }, f = () => {
      r.value && (r.value.scrollTop = 0, g.value = 0);
    };
    return me(() => {
      p(), window.addEventListener("resize", p);
    }), Fe(() => {
      window.removeEventListener("resize", p);
    }), ve(
      () => r.value,
      () => {
        p();
      }
    ), e({
      scrollSelectedIntoView: h,
      resetScroll: f,
      getContainerHeight: () => w.value,
      scrollTop: () => g.value
    }), (b, S) => (u(), m("div", {
      class: te(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": o.resultsEnter }])
    }, [
      o.isSearching ? (u(), m("div", Ka, [
        i("div", qa, [
          B(s(bt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        i("span", null, y(s(l)("Searching...")), 1)
      ])) : c.value ? (u(), m("div", Wa, [
        i("div", Ya, [
          i("span", null, y(s(l)("Found %s results", _.value)), 1)
        ]),
        i("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: $
        }, [
          i("div", {
            class: "vuefinder__search-modal__results-items",
            style: je({ height: `${v.value}px`, position: "relative" })
          }, [
            (u(!0), m(he, null, ye(x.value, (C) => (u(), m("div", {
              key: C.item.path,
              style: je({
                position: "absolute",
                top: `${C.top}px`,
                left: "0",
                width: "100%",
                height: `${Ye}px`
              })
            }, [
              B(Ha, {
                item: C.item,
                index: C.index,
                "selected-index": o.selectedIndex,
                "expanded-paths": o.expandedPaths,
                "active-dropdown": o.activeDropdown,
                "selected-item-dropdown-option": o.selectedItemDropdownOption,
                onSelect: S[0] || (S[0] = (A) => a("selectResultItem", A)),
                onSelectWithDropdown: S[1] || (S[1] = (A) => a("selectResultItemWithDropdown", A)),
                onTogglePathExpansion: S[2] || (S[2] = (A) => a("togglePathExpansion", A)),
                onToggleItemDropdown: S[3] || (S[3] = (A, V) => a("toggleItemDropdown", A, V)),
                "onUpdate:selectedItemDropdownOption": S[4] || (S[4] = (A) => a("update:selectedItemDropdownOption", A)),
                onCopyPath: S[5] || (S[5] = (A) => a("copyPath", A)),
                onOpenContainingFolder: S[6] || (S[6] = (A) => a("openContainingFolder", A)),
                onPreview: S[7] || (S[7] = (A) => a("preview", A))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), m("div", Ga, [
        i("span", null, y(s(l)("No results found")), 1)
      ]))
    ], 2));
  }
}), Xa = { class: "vuefinder__search-modal" }, Ja = { class: "vuefinder__search-modal__content" }, Za = { class: "vuefinder__search-modal__search-bar" }, er = { class: "vuefinder__search-modal__search-location" }, tr = ["title"], nr = ["disabled"], or = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, sr = { class: "vuefinder__search-modal__folder-selector-content" }, ir = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ar = { class: "vuefinder__search-modal__instructions-text" }, Ut = /* @__PURE__ */ Z({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(o) {
    const e = ne(), { t } = e.i18n, n = e.fs, a = P(null), d = P(null), l = P(null), r = $n("", 300), c = P([]), _ = P(!1), g = P(-1), w = P(!1), v = P(!1), k = P(null), x = P("all"), $ = P(!1), p = P(`size-${x.value}`), h = P(null), f = P(/* @__PURE__ */ new Set()), b = P(null), S = Y(n.path), C = (F) => {
      f.value.has(F) ? f.value.delete(F) : f.value.add(F);
    }, A = (F, M) => {
      M && typeof M.stopPropagation == "function" && M.stopPropagation(), b.value === F ? b.value = null : b.value = F;
    }, V = () => {
      b.value = null;
    }, X = (F) => {
      try {
        const M = F.dir || `${F.storage}://`;
        e.adapter.open(M), e.modal.close(), V();
      } catch {
        de.error(t("Failed to open containing folder"));
      }
    }, q = (F) => {
      e.modal.open(gt, {
        storage: S?.value?.storage ?? "local",
        item: F
      }), V();
    }, oe = (F) => {
      g.value = F, V();
    }, N = (F) => {
      g.value = F;
    }, se = async (F) => {
      await rt(F.path), V();
    };
    ve(r, async (F) => {
      F.trim() ? (await T(F.trim()), g.value = 0) : (c.value = [], _.value = !1, g.value = -1);
    }), ve(x, async (F) => {
      p.value = `size-${F}`, r.value.trim() && !v.value && (await T(r.value.trim()), g.value = 0);
    }), ve($, async () => {
      r.value.trim() && !v.value && (await T(r.value.trim()), g.value = 0);
    });
    const T = async (F) => {
      if (F) {
        _.value = !0;
        try {
          const M = k.value?.path || S?.value?.path, D = await e.adapter.search({
            path: M,
            filter: F,
            deep: $.value,
            size: x.value
          });
          c.value = D || [], _.value = !1;
        } catch (M) {
          de.error(Te(M, t("Search failed"))), c.value = [], _.value = !1;
        }
      }
    };
    me(() => {
      document.addEventListener("click", E), p.value = `size-${x.value}`, Le(() => {
        a.value && a.value.focus();
      });
    });
    const ee = () => {
      v.value ? (v.value = !1, r.value.trim() && (T(r.value.trim()), g.value = 0)) : (w.value = !1, v.value = !0);
    }, K = (F) => {
      F && (k.value = F);
    }, L = (F) => {
      F && (K(F), v.value = !1, r.value.trim() && (T(r.value.trim()), g.value = 0));
    };
    Fe(() => {
      document.removeEventListener("click", E), d.value && d.value.cleanup();
    });
    const E = (F) => {
      const M = F.target;
      if (w.value && (M.closest(".vuefinder__search-modal__dropdown") || (w.value = !1, Le(() => {
        a.value && a.value.focus();
      }))), b.value) {
        const D = M.closest(".vuefinder__search-modal__item-dropdown"), O = M.closest(".vuefinder__search-modal__result-item");
        !D && !O && V();
      }
    };
    return (F, M) => (u(), R(Me, { class: "vuefinder__search-modal-layout" }, {
      default: ae(() => [
        i("div", Xa, [
          B(Oe, {
            icon: s(Nt),
            title: s(t)("Search files")
          }, null, 8, ["icon", "title"]),
          i("div", Ja, [
            i("div", Za, [
              B(ga, {
                ref_key: "searchInputRef",
                ref: a,
                modelValue: s(r),
                "onUpdate:modelValue": M[0] || (M[0] = (D) => Nn(r) ? r.value = D : null),
                "is-searching": _.value,
                disabled: v.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              B(Ta, {
                ref_key: "searchOptionsDropdownRef",
                ref: d,
                visible: w.value,
                "onUpdate:visible": M[1] || (M[1] = (D) => w.value = D),
                "size-filter": x.value,
                "onUpdate:sizeFilter": M[2] || (M[2] = (D) => x.value = D),
                "selected-option": p.value,
                "onUpdate:selectedOption": M[3] || (M[3] = (D) => p.value = D),
                disabled: v.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            i("div", {
              class: "vuefinder__search-modal__options",
              onClick: M[7] || (M[7] = le(() => {
              }, ["stop"]))
            }, [
              i("div", er, [
                i("button", {
                  class: te(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": v.value }]),
                  onClick: le(ee, ["stop"])
                }, [
                  B(s(Re), { class: "vuefinder__search-modal__location-icon" }),
                  i("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: k.value?.path || s(S).path
                  }, y(s(Sn)(k.value?.path || s(S).path)), 9, tr),
                  M[10] || (M[10] = i("svg", {
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
                onClick: M[6] || (M[6] = le(() => {
                }, ["stop"]))
              }, [
                we(i("input", {
                  "onUpdate:modelValue": M[4] || (M[4] = (D) => $.value = D),
                  type: "checkbox",
                  disabled: v.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: M[5] || (M[5] = le(() => {
                  }, ["stop"]))
                }, null, 8, nr), [
                  [Pt, $.value]
                ]),
                i("span", null, y(s(t)("Include subfolders")), 1)
              ])
            ]),
            v.value ? (u(), m("div", or, [
              i("div", sr, [
                B(Vt, {
                  modelValue: k.value,
                  "onUpdate:modelValue": [
                    M[8] || (M[8] = (D) => k.value = D),
                    K
                  ],
                  "show-pinned-folders": !0,
                  "current-path": s(S),
                  onSelectAndClose: L
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : I("", !0),
            !s(r).trim() && !v.value ? (u(), m("div", ir, [
              i("p", ar, y(s(t)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : I("", !0),
            s(r).trim() && !v.value ? (u(), R(Qa, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: l,
              "search-results": c.value,
              "is-searching": _.value,
              "selected-index": g.value,
              "expanded-paths": f.value,
              "active-dropdown": b.value,
              "selected-item-dropdown-option": h.value,
              "results-enter": !0,
              onSelectResultItem: oe,
              onSelectResultItemWithDropdown: N,
              onTogglePathExpansion: C,
              onToggleItemDropdown: A,
              "onUpdate:selectedItemDropdownOption": M[9] || (M[9] = (D) => h.value = D),
              onCopyPath: se,
              onOpenContainingFolder: X,
              onPreview: q
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : I("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), rr = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(o, { emit: e, slots: t }) {
    const n = ne(), a = P(!1), { t: d } = n.i18n;
    let l = null;
    const r = () => {
      l && clearTimeout(l), a.value = !0, l = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return me(() => {
      n.emitter.on(o.on, r);
    }), Fe(() => {
      l && clearTimeout(l);
    }), {
      shown: a,
      t: d
    };
  }
}, lr = (o, e) => {
  const t = o.__vccOpts || o;
  for (const [n, a] of e)
    t[n] = a;
  return t;
}, dr = { key: 1 };
function cr(o, e, t, n, a, d) {
  return u(), m("div", {
    class: te(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    o.$slots.default ? De(o.$slots, "default", { key: 0 }) : (u(), m("span", dr, y(n.t("Saved.")), 1))
  ], 2);
}
const Ze = /* @__PURE__ */ lr(rr, [["render", cr]]), ur = [
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
], vr = { class: "vuefinder__about-modal__content" }, fr = { class: "vuefinder__about-modal__main" }, _r = { class: "vuefinder__about-modal__description" }, pr = { class: "vuefinder__about-modal__settings" }, hr = { class: "vuefinder__about-modal__settings__fieldset" }, mr = { class: "vuefinder__about-modal__settings__section-title" }, gr = { class: "vuefinder__about-modal__setting" }, wr = { class: "vuefinder__about-modal__setting-label" }, yr = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, br = { class: "vuefinder__about-modal__setting-input justify-end" }, kr = ["checked"], $r = { class: "vuefinder__about-modal__setting" }, xr = { class: "vuefinder__about-modal__setting-label" }, Sr = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Cr = { class: "vuefinder__about-modal__setting-input justify-end" }, Fr = ["checked"], Dr = { class: "vuefinder__about-modal__setting" }, Pr = { class: "vuefinder__about-modal__setting-label" }, Er = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Tr = { class: "vuefinder__about-modal__setting-input justify-end" }, Mr = ["checked"], Ir = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, Ar = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, Or = { class: "vuefinder__about-modal__setting-input justify-end" }, Br = ["value"], Lr = ["label"], zr = ["value"], Vr = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, Rr = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, Nr = { class: "vuefinder__about-modal__setting-input justify-end" }, Ur = ["label"], jr = ["value"], Hr = { class: "vuefinder__about-modal__tab-content" }, Kr = { class: "vuefinder__about-modal__settings__section-title" }, qr = { class: "vuefinder__about-modal__description" }, Dn = /* @__PURE__ */ Z({
  __name: "ModalSettings",
  setup(o) {
    const e = ne(), { enabled: t } = ze(), n = e.config, { clearStore: a } = e.storage, { t: d } = e.i18n, l = Y(n.state), r = j(() => l.value.theme || "silver"), c = async () => {
      n.reset(), a(), location.reload();
    }, _ = (p) => {
      n.set("theme", p), e.emitter.emit("vf-theme-saved");
    }, g = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? _n : Mt, e.emitter.emit("vf-metric-units-saved");
    }, w = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, v = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: k } = ut("VueFinderOptions"), $ = Object.fromEntries(
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
    return (p, h) => (u(), R(Me, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[2] || (h[2] = (f) => s(e).modal.close())
        }, y(s(d)("Close")), 1)
      ]),
      default: ae(() => [
        i("div", vr, [
          B(Oe, {
            icon: s(xn),
            title: s(d)("Settings")
          }, null, 8, ["icon", "title"]),
          i("div", fr, [
            i("div", _r, y(s(d)("Customize your experience with the following settings")), 1),
            i("div", pr, [
              i("fieldset", hr, [
                i("div", mr, y(s(d)("General")), 1),
                i("div", gr, [
                  i("div", wr, [
                    i("label", yr, y(s(d)("Use Metric Units")), 1)
                  ]),
                  i("div", br, [
                    i("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: s(n).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: g
                    }, null, 40, kr),
                    B(Ze, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: ae(() => [
                        ue(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", $r, [
                  i("div", xr, [
                    i("label", Sr, y(s(d)("Compact list view")), 1)
                  ]),
                  i("div", Cr, [
                    i("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: s(n).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: w
                    }, null, 40, Fr),
                    B(Ze, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: ae(() => [
                        ue(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", Dr, [
                  i("div", Pr, [
                    i("label", Er, y(s(d)("Persist path on reload")), 1)
                  ]),
                  i("div", Tr, [
                    i("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: s(n).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: v
                    }, null, 40, Mr),
                    B(Ze, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: ae(() => [
                        ue(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s(t)("theme") ? (u(), m("div", Ir, y(s(d)("Theme")), 1)) : I("", !0),
                s(t)("theme") ? (u(), m("div", Ar, [
                  i("div", Or, [
                    i("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: h[0] || (h[0] = (f) => _(f.target?.value))
                    }, [
                      i("optgroup", {
                        label: s(d)("Theme")
                      }, [
                        (u(!0), m(he, null, ye(s(ur), (f) => (u(), m("option", {
                          key: f.name,
                          value: f.name
                        }, y(f.displayName), 9, zr))), 128))
                      ], 8, Lr)
                    ], 40, Br),
                    B(Ze, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: ae(() => [
                        ue(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : I("", !0),
                s(t)("language") && Object.keys(s($)).length > 1 ? (u(), m("div", Vr, y(s(d)("Language")), 1)) : I("", !0),
                s(t)("language") && Object.keys(s($)).length > 1 ? (u(), m("div", Rr, [
                  i("div", Nr, [
                    we(i("select", {
                      id: "language",
                      "onUpdate:modelValue": h[1] || (h[1] = (f) => s(e).i18n.locale = f),
                      class: "vuefinder__about-modal__select"
                    }, [
                      i("optgroup", {
                        label: s(d)("Language")
                      }, [
                        (u(!0), m(he, null, ye(s($), (f, b) => (u(), m("option", {
                          key: b,
                          value: b
                        }, y(f), 9, jr))), 128))
                      ], 8, Ur)
                    ], 512), [
                      [St, s(e).i18n.locale]
                    ]),
                    B(Ze, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: ae(() => [
                        ue(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : I("", !0)
              ])
            ]),
            i("div", Hr, [
              i("div", Kr, y(s(d)("Reset")), 1),
              i("div", qr, y(s(d)("Reset all settings to default")), 1),
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
}), Pe = {
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
function Gr() {
  const o = ne(), e = o.fs, t = o.config, { enabled: n } = ze(), a = Y(e.path), d = Y(e.selectedItems), l = (r) => {
    if (r.code === Pe.ESCAPE && (o.modal.close(), o.root.focus()), !o.modal.visible) {
      if (r.metaKey && r.code === Pe.KEY_R && !r.shiftKey && (o.adapter.invalidateListQuery(a.value.path), o.adapter.open(a.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === Pe.KEY_R && n("rename") && d.value.length === 1 && (o.modal.open(mt, { items: d.value }), r.preventDefault()), r.code === Pe.DELETE && d.value.length !== 0 && o.modal.open(ht, { items: d.value }), r.metaKey && r.code === Pe.BACKSLASH && o.modal.open(gn), r.metaKey && r.code === Pe.KEY_F && n("search") && (o.modal.open(Ut), r.preventDefault()), r.metaKey && r.code === Pe.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === Pe.KEY_S && (o.modal.open(Dn), r.preventDefault()), r.metaKey && r.code === Pe.ENTER && (t.toggle("fullScreen"), o.root.focus()), r.metaKey && r.code === Pe.KEY_A && (e.selectAll(o.selectionMode || "multiple", o), r.preventDefault()), r.code === Pe.SPACE && d.value.length === 1 && d.value[0]?.type !== "dir" && o.modal.open(gt, {
        storage: e.path.get().storage,
        item: d.value[0]
      }), r.metaKey && r.code === Pe.KEY_C && n("copy")) {
        if (d.value.length === 0) {
          de.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("copy", new Set(d.value.map((c) => c.path))), de.success(
          d.value.length === 1 ? o.i18n.t("Item copied to clipboard") : o.i18n.t("%s items copied to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Pe.KEY_X && n("copy")) {
        if (d.value.length === 0) {
          de.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("cut", new Set(d.value.map((c) => c.path))), de.success(
          d.value.length === 1 ? o.i18n.t("Item cut to clipboard") : o.i18n.t("%s items cut to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Pe.KEY_V && n("copy")) {
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
          o.modal.open(Rt, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  me(async () => {
    if (await Le(), !o.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    o.root.addEventListener("keydown", l);
  }), dn(() => {
    o.root && o.root.removeEventListener("keydown", l);
  });
}
function Wr() {
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
              await At((v, k) => {
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
const Yr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Qr(o, e) {
  return u(), m("svg", Yr, [...e[0] || (e[0] = [
    i("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Pn = { render: Qr }, Xr = { class: "vuefinder__new-folder-modal__content" }, Jr = { class: "vuefinder__new-folder-modal__form" }, Zr = { class: "vuefinder__new-folder-modal__description" }, el = ["placeholder"], jt = /* @__PURE__ */ Z({
  __name: "ModalNewFolder",
  setup(o) {
    const e = ne(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = P(""), l = () => {
      d.value !== "" && e.adapter.createFolder({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        de.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(Te(r, t("Failed to create folder")));
      });
    };
    return (r, c) => (u(), R(Me, null, {
      buttons: ae(() => [
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
      default: ae(() => [
        i("div", null, [
          B(Oe, {
            icon: s(Pn),
            title: s(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          i("div", Xr, [
            i("div", Jr, [
              i("p", Zr, y(s(t)("Create a new folder")), 1),
              we(i("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => d.value = _),
                class: "vuefinder__new-folder-modal__input",
                placeholder: s(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: lt(l, ["enter"])
              }, null, 40, el), [
                [dt, d.value]
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
function nl(o, e) {
  return u(), m("svg", tl, [...e[0] || (e[0] = [
    i("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const En = { render: nl }, ol = { class: "vuefinder__new-file-modal__content" }, sl = { class: "vuefinder__new-file-modal__form" }, il = { class: "vuefinder__new-file-modal__description" }, al = ["placeholder"], Tn = /* @__PURE__ */ Z({
  __name: "ModalNewFile",
  setup(o) {
    const e = ne(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = P(""), l = () => {
      d.value !== "" && e.adapter.createFile({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        de.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(Te(r, t("Failed to create file")));
      });
    };
    return (r, c) => (u(), R(Me, null, {
      buttons: ae(() => [
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
      default: ae(() => [
        i("div", null, [
          B(Oe, {
            icon: s(En),
            title: s(t)("New File")
          }, null, 8, ["icon", "title"]),
          i("div", ol, [
            i("div", sl, [
              i("p", il, y(s(t)("Create a new file")), 1),
              we(i("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => d.value = _),
                class: "vuefinder__new-file-modal__input",
                placeholder: s(t)("File Name"),
                type: "text",
                onKeyup: lt(l, ["enter"])
              }, null, 40, al), [
                [dt, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Dt(o, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return o.replace(new RegExp(t), "$2..$4");
}
const rl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ll(o, e) {
  return u(), m("svg", rl, [...e[0] || (e[0] = [
    i("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Mn = { render: ll }, dl = { class: "vuefinder__upload-modal__content relative" }, cl = { class: "vuefinder__upload-modal__target-section" }, ul = { class: "vuefinder__upload-modal__target-label" }, vl = { class: "vuefinder__upload-modal__target-container" }, fl = { class: "vuefinder__upload-modal__target-path" }, _l = { class: "vuefinder__upload-modal__target-storage" }, pl = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, hl = { class: "vuefinder__upload-modal__target-badge" }, ml = { class: "vuefinder__upload-modal__drag-hint" }, gl = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, wl = ["textContent"], yl = { class: "vuefinder__upload-modal__file-info" }, bl = { class: "vuefinder__upload-modal__file-name hidden md:block" }, kl = { class: "vuefinder__upload-modal__file-name md:hidden" }, $l = {
  key: 0,
  class: "ml-auto"
}, xl = ["title", "disabled", "onClick"], Sl = {
  key: 0,
  class: "py-2"
}, Cl = ["aria-expanded"], Fl = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, Dl = ["disabled"], Pl = ["aria-expanded"], El = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Ht = /* @__PURE__ */ Z({
  __name: "ModalUpload",
  setup(o) {
    const e = ne(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = P(a.value), l = P(!1), r = () => {
      const E = d.value.path;
      if (!E) return { storage: "local", path: "" };
      if (E.endsWith("://"))
        return { storage: E.replace("://", ""), path: "" };
      const F = E.split("://");
      return {
        storage: F[0] || "local",
        path: F[1] || ""
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
      queue: x,
      message: $,
      uploading: p,
      hasFilesInDropArea: h,
      definitions: f,
      openFileSelector: b,
      upload: S,
      cancel: C,
      remove: A,
      clear: V,
      close: X,
      getClassNameForEntry: q,
      getIconForEntry: oe,
      addExternalFiles: N
    } = bn(e.customUploader), se = () => {
      S(d.value);
    };
    me(() => {
      e.emitter.on("vf-external-files-dropped", (E) => {
        N(E);
      });
    }), Fe(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const T = P(!1), ee = P(null), K = P(null), L = (E) => {
      if (!T.value) return;
      const F = E.target, M = ee.value?.contains(F) ?? !1, D = K.value?.contains(F) ?? !1;
      !M && !D && (T.value = !1);
    };
    return me(() => document.addEventListener("click", L)), Fe(() => document.removeEventListener("click", L)), (E, F) => (u(), R(Me, {
      "show-drag-overlay": s(h),
      "drag-overlay-text": s(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: ae(() => [
        i("div", {
          ref_key: "actionsMenuMobileRef",
          ref: ee,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          i("div", {
            class: te([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              T.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: F[3] || (F[3] = (M) => s(b)())
            }, y(s(t)("Select Files")), 1),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": T.value ? "true" : "false",
              onClick: F[4] || (F[4] = le((M) => T.value = !T.value, ["stop"]))
            }, [...F[17] || (F[17] = [
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
          T.value ? (u(), m("div", Fl, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: F[5] || (F[5] = (M) => {
                s(b)(), T.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: F[6] || (F[6] = (M) => {
                s(v)?.click(), T.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            F[18] || (F[18] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: te(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: F[7] || (F[7] = (M) => s(p) ? null : (s(V)(!1), T.value = !1))
            }, y(s(t)("Clear all")), 3),
            i("div", {
              class: te(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: F[8] || (F[8] = (M) => s(p) ? null : (s(V)(!0), T.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : I("", !0)
        ], 512),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: s(p) || !s(x).length,
          onClick: le(se, ["prevent"])
        }, y(s(t)("Upload")), 9, Dl),
        s(p) ? (u(), m("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: F[9] || (F[9] = le(
            //@ts-ignore
            (...M) => s(C) && s(C)(...M),
            ["prevent"]
          ))
        }, y(s(t)("Cancel")), 1)) : (u(), m("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: F[10] || (F[10] = le(
            //@ts-ignore
            (...M) => s(X) && s(X)(...M),
            ["prevent"]
          ))
        }, y(s(t)("Close")), 1)),
        i("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: K,
          class: "relative mr-auto hidden sm:block"
        }, [
          i("div", {
            class: te(["vuefinder__upload-actions", T.value ? "vuefinder__upload-actions--ring" : ""])
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
              onClick: F[11] || (F[11] = le((M) => T.value = !T.value, ["stop"]))
            }, [...F[19] || (F[19] = [
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
            ])], 8, Pl)
          ], 2),
          T.value ? (u(), m("div", El, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: F[12] || (F[12] = (M) => {
                s(b)(), T.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: F[13] || (F[13] = (M) => {
                s(v)?.click(), T.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            F[20] || (F[20] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: te(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: F[14] || (F[14] = (M) => s(p) ? null : (s(V)(!1), T.value = !1))
            }, y(s(t)("Clear all")), 3),
            i("div", {
              class: te(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: F[15] || (F[15] = (M) => s(p) ? null : (s(V)(!0), T.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : I("", !0)
        ], 512)
      ]),
      default: ae(() => [
        i("div", null, [
          B(Oe, {
            icon: s(Mn),
            title: s(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          i("div", dl, [
            i("div", cl, [
              i("div", ul, y(s(t)("Hedef Klasör")), 1),
              i("div", vl, [
                i("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: F[0] || (F[0] = (M) => l.value = !l.value)
                }, [
                  i("div", fl, [
                    i("span", _l, y(r().storage) + "://", 1),
                    r().path ? (u(), m("span", pl, y(r().path), 1)) : I("", !0)
                  ]),
                  i("span", hl, y(s(t)("Browse")), 1)
                ])
              ]),
              i("div", {
                class: te([
                  "vuefinder__upload-modal__tree-selector",
                  l.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                B(Vt, {
                  modelValue: d.value,
                  "onUpdate:modelValue": [
                    F[1] || (F[1] = (M) => d.value = M),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            i("div", ml, y(s(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            i("div", {
              ref_key: "container",
              ref: g,
              class: "hidden"
            }, null, 512),
            i("div", gl, [
              (u(!0), m(he, null, ye(s(x), (M) => (u(), m("div", {
                key: M.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                i("span", {
                  class: te(["vuefinder__upload-modal__file-icon", s(q)(M)])
                }, [
                  i("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(s(oe)(M))
                  }, null, 8, wl)
                ], 2),
                i("div", yl, [
                  i("div", bl, y(s(Dt)(M.name, 40)) + " (" + y(M.size) + ") ", 1),
                  i("div", kl, y(s(Dt)(M.name, 16)) + " (" + y(M.size) + ") ", 1),
                  i("div", {
                    class: te(["vuefinder__upload-modal__file-status", s(q)(M)])
                  }, [
                    ue(y(M.statusName) + " ", 1),
                    M.status === s(f).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), m("b", $l, y(M.percent), 1)) : I("", !0)
                  ], 2)
                ]),
                i("button", {
                  type: "button",
                  class: te(["vuefinder__upload-modal__file-remove", s(p) ? "disabled" : ""]),
                  title: s(t)("Delete"),
                  disabled: s(p),
                  onClick: (D) => s(A)(M)
                }, [...F[16] || (F[16] = [
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
                ])], 10, xl)
              ]))), 128)),
              s(x).length ? I("", !0) : (u(), m("div", Sl, y(s(t)("No files selected!")), 1))
            ]),
            s($).length ? (u(), R(Ft, {
              key: 0,
              error: "",
              onHidden: F[2] || (F[2] = (M) => $.value = "")
            }, {
              default: ae(() => [
                ue(y(s($)), 1)
              ]),
              _: 1
            })) : I("", !0)
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
}), Tl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ml(o, e) {
  return u(), m("svg", Tl, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const In = { render: Ml }, Il = { class: "vuefinder__unarchive-modal__content" }, Al = { class: "vuefinder__unarchive-modal__items" }, Ol = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bl = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ll = { class: "vuefinder__unarchive-modal__item-name" }, zl = { class: "vuefinder__unarchive-modal__info" }, Kt = /* @__PURE__ */ Z({
  __name: "ModalUnarchive",
  setup(o) {
    const e = ne(), t = e.fs, n = Y(t.path), { t: a } = e.i18n, d = P(e.modal.data.items[0]), l = P([]), r = () => {
      e.adapter.unarchive({
        item: d.value.path,
        path: n.value.path
      }).then((c) => {
        de.success(a("The file unarchived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(Te(c, a("Failed to unarchive")));
      });
    };
    return (c, _) => (u(), R(Me, null, {
      buttons: ae(() => [
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
      default: ae(() => [
        i("div", null, [
          B(Oe, {
            icon: s(In),
            title: s(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          i("div", Il, [
            i("div", Al, [
              (u(!0), m(he, null, ye(l.value, (g) => (u(), m("p", {
                key: g.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                g.type === "dir" ? (u(), m("svg", Ol, [..._[1] || (_[1] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), m("svg", Bl, [..._[2] || (_[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", Ll, y(g.basename), 1)
              ]))), 128)),
              i("p", zl, y(s(a)("The archive will be unarchived at")) + " (" + y(s(n).path) + ") ", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Vl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Rl(o, e) {
  return u(), m("svg", Vl, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const An = { render: Rl }, Nl = { class: "vuefinder__archive-modal__content" }, Ul = { class: "vuefinder__archive-modal__form" }, jl = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Hl = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kl = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ql = { class: "vuefinder__archive-modal__file-name" }, Gl = ["placeholder"], qt = /* @__PURE__ */ Z({
  __name: "ModalArchive",
  setup(o) {
    const e = ne(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = P(""), l = P(e.modal.data.items), r = () => {
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
        de.error(Te(c, t("Failed to archive files")));
      });
    };
    return (c, _) => (u(), R(Me, null, {
      buttons: ae(() => [
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
      default: ae(() => [
        i("div", null, [
          B(Oe, {
            icon: s(An),
            title: s(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          i("div", Nl, [
            i("div", Ul, [
              i("div", jl, [
                (u(!0), m(he, null, ye(l.value, (g) => (u(), m("p", {
                  key: g.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  g.type === "dir" ? (u(), m("svg", Hl, [..._[2] || (_[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), m("svg", Kl, [..._[3] || (_[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", ql, y(g.basename), 1)
                ]))), 128))
              ]),
              we(i("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (g) => d.value = g),
                class: "vuefinder__archive-modal__input",
                placeholder: s(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: lt(r, ["enter"])
              }, null, 40, Gl), [
                [dt, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Wl = { class: "vuefinder__about-modal__content" }, Yl = { class: "vuefinder__about-modal__main" }, Ql = { class: "vuefinder__about-modal__shortcuts" }, Xl = { class: "vuefinder__about-modal__shortcut" }, Jl = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Zl = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, ed = { class: "vuefinder__about-modal__shortcut" }, td = { class: "vuefinder__about-modal__shortcut" }, nd = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, od = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, sd = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, id = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, ad = { class: "vuefinder__about-modal__shortcut" }, rd = { class: "vuefinder__about-modal__shortcut" }, ld = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, dd = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, cd = /* @__PURE__ */ Z({
  __name: "ModalShortcuts",
  setup(o) {
    const e = ne(), { enabled: t } = ze(), { t: n } = e.i18n;
    return (a, d) => (u(), R(Me, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: d[0] || (d[0] = (l) => s(e).modal.close())
        }, y(s(n)("Close")), 1)
      ]),
      default: ae(() => [
        i("div", Wl, [
          B(Oe, {
            icon: s(mn),
            title: s(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          i("div", Yl, [
            i("div", Ql, [
              i("div", Xl, [
                i("div", null, y(s(n)("Refresh")), 1),
                d[1] || (d[1] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "R")
                ], -1))
              ]),
              s(t)("rename") ? (u(), m("div", Jl, [
                i("div", null, y(s(n)("Rename")), 1),
                d[2] || (d[2] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "Shift"),
                  ue(" + "),
                  i("kbd", null, "R")
                ], -1))
              ])) : I("", !0),
              s(t)("delete") ? (u(), m("div", Zl, [
                i("div", null, y(s(n)("Delete")), 1),
                d[3] || (d[3] = i("kbd", null, "Del", -1))
              ])) : I("", !0),
              i("div", ed, [
                i("div", null, y(s(n)("Escape")), 1),
                d[4] || (d[4] = i("kbd", null, "Esc", -1))
              ]),
              i("div", td, [
                i("div", null, y(s(n)("Select All")), 1),
                d[5] || (d[5] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "A")
                ], -1))
              ]),
              s(t)("copy") ? (u(), m("div", nd, [
                i("div", null, y(s(n)("Cut")), 1),
                d[6] || (d[6] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "X")
                ], -1))
              ])) : I("", !0),
              s(t)("copy") ? (u(), m("div", od, [
                i("div", null, y(s(n)("Copy")), 1),
                d[7] || (d[7] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "C")
                ], -1))
              ])) : I("", !0),
              s(t)("copy") ? (u(), m("div", sd, [
                i("div", null, y(s(n)("Paste")), 1),
                d[8] || (d[8] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "V")
                ], -1))
              ])) : I("", !0),
              s(t)("search") ? (u(), m("div", id, [
                i("div", null, y(s(n)("Search")), 1),
                d[9] || (d[9] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "F")
                ], -1))
              ])) : I("", !0),
              i("div", ad, [
                i("div", null, y(s(n)("Toggle Sidebar")), 1),
                d[10] || (d[10] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "E")
                ], -1))
              ]),
              i("div", rd, [
                i("div", null, y(s(n)("Open Settings")), 1),
                d[11] || (d[11] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "S")
                ], -1))
              ]),
              s(t)("fullscreen") ? (u(), m("div", ld, [
                i("div", null, y(s(n)("Toggle Full Screen")), 1),
                d[12] || (d[12] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "Enter")
                ], -1))
              ])) : I("", !0),
              s(t)("preview") ? (u(), m("div", dd, [
                i("div", null, y(s(n)("Preview")), 1),
                d[13] || (d[13] = i("kbd", null, "Space", -1))
              ])) : I("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ud = { class: "vuefinder__menubar__container" }, vd = ["onClick", "onMouseenter"], fd = { class: "vuefinder__menubar__label" }, _d = ["onMouseenter"], pd = ["onClick"], hd = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, md = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, gd = /* @__PURE__ */ Z({
  __name: "MenuBar",
  setup(o) {
    const e = ne(), { enabled: t } = ze(), { t: n } = e?.i18n || { t: (f) => f }, a = e?.fs, d = e?.config, l = Y(d.state), r = Y(a.selectedItems), c = Y(a?.storages || []), _ = P(null), g = P(!1), w = j(() => window.opener !== null || window.name !== "" || window.history.length <= 1), v = j(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(jt, { items: r.value }),
            enabled: () => t("newfolder")
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(Tn, { items: r.value }),
            enabled: () => t("newfile")
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(Ht, { items: r.value }),
            enabled: () => t("upload")
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(Ut),
            enabled: () => t("search")
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(qt, { items: r.value });
            },
            enabled: () => r.value.length > 0 && t("archive")
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(Kt, { items: r.value });
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
                f?.items?.size > 0 && e?.modal?.open(f.type === "cut" ? Je : Rt, {
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
                  e?.modal?.open(Je, { items: { from: r.value, to: b } });
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
                await rt(f.path);
              } else {
                const f = a?.path?.get();
                f?.path && await rt(f.path);
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
                } catch (C) {
                  const A = Te(C, n("Failed to navigate to folder"));
                  de.error(A), e.fs.setLoading(!1);
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
            action: () => e?.modal?.open(cd),
            enabled: () => !0
          },
          {
            id: "about",
            label: n("About"),
            action: () => e?.modal?.open(gn),
            enabled: () => !0
          }
        ]
      }
    ]), k = (f) => {
      _.value === f ? $() : (_.value = f, g.value = !0);
    }, x = (f) => {
      g.value && (_.value = f);
    }, $ = () => {
      _.value = null, g.value = !1;
    }, p = (f) => {
      $(), f();
    }, h = (f) => {
      f.target.closest(".vuefinder__menubar") || $();
    };
    return me(() => {
      document.addEventListener("click", h);
    }), Fe(() => {
      document.removeEventListener("click", h);
    }), (f, b) => (u(), m("div", {
      class: "vuefinder__menubar",
      onClick: b[0] || (b[0] = le(() => {
      }, ["stop"]))
    }, [
      i("div", ud, [
        (u(!0), m(he, null, ye(v.value, (S) => (u(), m("div", {
          key: S.id,
          class: te(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": _.value === S.id }]),
          onClick: (C) => k(S.id),
          onMouseenter: (C) => x(S.id)
        }, [
          i("span", fd, y(S.label), 1),
          _.value === S.id ? (u(), m("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (C) => x(S.id)
          }, [
            (u(!0), m(he, null, ye(S.items, (C) => (u(), m("div", {
              key: C.id || C.type,
              class: te(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": C.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": C.enabled && !C.enabled(),
                "vuefinder__menubar__dropdown__item--checked": C.checked && C.checked()
              }]),
              onClick: le((A) => C.type !== "separator" && C.enabled && C.enabled() ? p(C.action) : null, ["stop"])
            }, [
              C.type !== "separator" ? (u(), m("span", hd, y(C.label), 1)) : I("", !0),
              C.checked && C.checked() ? (u(), m("span", md, " ✓ ")) : I("", !0)
            ], 10, pd))), 128))
          ], 40, _d)) : I("", !0)
        ], 42, vd))), 128))
      ])
    ]));
  }
}), wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function yd(o, e) {
  return u(), m("svg", wd, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const bd = { render: yd }, kd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function $d(o, e) {
  return u(), m("svg", kd, [...e[0] || (e[0] = [
    i("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
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
  return u(), m("svg", Sd, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Fd = { render: Cd }, Dd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Pd(o, e) {
  return u(), m("svg", Dd, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Ed = { render: Pd }, Td = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Md(o, e) {
  return u(), m("svg", Td, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Id = { render: Md }, Ad = { class: "vuefinder__toolbar" }, Od = { class: "vuefinder__toolbar__actions" }, Bd = ["title"], Ld = ["title"], zd = ["title"], Vd = ["title"], Rd = ["title"], Nd = ["title"], Ud = ["title"], jd = { class: "vuefinder__toolbar__controls" }, Hd = ["title"], Kd = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, qd = ["title"], Gd = { class: "relative" }, Wd = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Yd = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Qd = { class: "vuefinder__toolbar__dropdown-content" }, Xd = { class: "vuefinder__toolbar__dropdown-section" }, Jd = { class: "vuefinder__toolbar__dropdown-label" }, Zd = { class: "vuefinder__toolbar__dropdown-row" }, ec = { value: "name" }, tc = { value: "size" }, nc = { value: "modified" }, oc = { value: "" }, sc = { value: "asc" }, ic = { value: "desc" }, ac = { class: "vuefinder__toolbar__dropdown-section" }, rc = { class: "vuefinder__toolbar__dropdown-label" }, lc = { class: "vuefinder__toolbar__dropdown-options" }, dc = { class: "vuefinder__toolbar__dropdown-option" }, cc = { class: "vuefinder__toolbar__option-text" }, uc = { class: "vuefinder__toolbar__dropdown-option" }, vc = { class: "vuefinder__toolbar__option-text" }, fc = { class: "vuefinder__toolbar__dropdown-option" }, _c = { class: "vuefinder__toolbar__option-text" }, pc = { class: "vuefinder__toolbar__dropdown-toggle" }, hc = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, mc = { class: "vuefinder__toolbar__dropdown-reset" }, gc = ["title"], wc = ["title"], yc = /* @__PURE__ */ Z({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(o) {
    const e = ne(), { enabled: t } = ze(), { t: n } = e.i18n, a = e.fs, d = e.config, l = Y(d.state), r = Y(a.selectedItems), c = Y(a.sort), _ = Y(a.filter);
    ve(
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
    me(() => {
      const p = document.querySelector("body");
      p && l.value.fullScreen && setTimeout(() => p.style.overflow = "hidden"), document.addEventListener("click", w);
    }), Fe(() => {
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
    ve(
      () => v.value.sortBy,
      (p) => {
        if (!v.value.sortOrder) {
          a.clearSort();
          return;
        }
        p === "name" ? a.setSort("basename", v.value.sortOrder) : p === "size" ? a.setSort("file_size", v.value.sortOrder) : p === "modified" && a.setSort("last_modified", v.value.sortOrder);
      }
    ), ve(
      () => v.value.sortOrder,
      (p) => {
        if (!p) {
          a.clearSort();
          return;
        }
        v.value.sortBy === "name" ? a.setSort("basename", p) : v.value.sortBy === "size" ? a.setSort("file_size", p) : v.value.sortBy === "modified" && a.setSort("last_modified", p);
      }
    ), ve(
      c,
      (p) => {
        p.active ? (p.column === "basename" ? v.value.sortBy = "name" : p.column === "file_size" ? v.value.sortBy = "size" : p.column === "last_modified" && (v.value.sortBy = "modified"), v.value.sortOrder = p.order) : v.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ve(
      () => v.value.filterKind,
      (p) => {
        a.setFilter(p, l.value.showHiddenFiles);
      }
    ), ve(
      () => v.value.showHidden,
      (p) => {
        d.set("showHiddenFiles", p), a.setFilter(v.value.filterKind, p);
      }
    ), ve(
      _,
      (p) => {
        v.value.filterKind = p.kind;
      },
      { immediate: !0 }
    ), ve(
      () => l.value.showHiddenFiles,
      (p) => {
        v.value.showHidden = p, a.setFilter(v.value.filterKind, p);
      },
      { immediate: !0 }
    );
    const k = () => d.set("view", l.value.view === "grid" ? "list" : "grid"), x = j(() => _.value.kind !== "all" || !l.value.showHiddenFiles || c.value.active), $ = () => {
      v.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, d.set("showHiddenFiles", !0), a.clearSort(), a.clearFilter();
    };
    return (p, h) => (u(), m("div", Ad, [
      i("div", Od, [
        s(t)("newfolder") ? (u(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("New Folder"),
          onClick: h[0] || (h[0] = (f) => s(e).modal.open(jt, { items: s(r) }))
        }, [
          B(s(Pn))
        ], 8, Bd)) : I("", !0),
        s(t)("newfile") ? (u(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("New File"),
          onClick: h[1] || (h[1] = (f) => s(e).modal.open(Tn, { items: s(r) }))
        }, [
          B(s(En))
        ], 8, Ld)) : I("", !0),
        s(t)("rename") ? (u(), m("div", {
          key: 2,
          class: "mx-1.5",
          title: s(n)("Rename"),
          onClick: h[2] || (h[2] = (f) => s(r).length !== 1 || s(e).modal.open(mt, { items: s(r) }))
        }, [
          B(s(yn), {
            class: te(s(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, zd)) : I("", !0),
        s(t)("delete") ? (u(), m("div", {
          key: 3,
          class: "mx-1.5",
          title: s(n)("Delete"),
          onClick: h[3] || (h[3] = (f) => !s(r).length || s(e).modal.open(ht, { items: s(r) }))
        }, [
          B(s(wn), {
            class: te(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Vd)) : I("", !0),
        s(t)("upload") ? (u(), m("div", {
          key: 4,
          class: "mx-1.5",
          title: s(n)("Upload"),
          onClick: h[4] || (h[4] = (f) => s(e).modal.open(Ht, { items: s(r) }))
        }, [
          B(s(Mn))
        ], 8, Rd)) : I("", !0),
        s(t)("unarchive") && s(r).length === 1 && s(r)[0].mime_type === "application/zip" ? (u(), m("div", {
          key: 5,
          class: "mx-1.5",
          title: s(n)("Unarchive"),
          onClick: h[5] || (h[5] = (f) => !s(r).length || s(e).modal.open(Kt, { items: s(r) }))
        }, [
          B(s(In), {
            class: te(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Nd)) : I("", !0),
        s(t)("archive") ? (u(), m("div", {
          key: 6,
          class: "mx-1.5",
          title: s(n)("Archive"),
          onClick: h[6] || (h[6] = (f) => !s(r).length || s(e).modal.open(qt, { items: s(r) }))
        }, [
          B(s(An), {
            class: te(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ud)) : I("", !0)
      ]),
      i("div", jd, [
        s(t)("search") ? (u(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("Search Files"),
          onClick: h[7] || (h[7] = (f) => s(e).modal.open(Ut))
        }, [
          B(s(Nt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Hd)) : I("", !0),
        i("div", Kd, [
          i("div", {
            title: s(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: h[8] || (h[8] = (f) => g.value = !g.value)
          }, [
            i("div", Gd, [
              B(s(Id), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              x.value ? (u(), m("div", Wd)) : I("", !0)
            ])
          ], 8, qd),
          g.value ? (u(), m("div", Yd, [
            i("div", Qd, [
              i("div", Xd, [
                i("div", Jd, y(s(n)("Sorting")), 1),
                i("div", Zd, [
                  we(i("select", {
                    "onUpdate:modelValue": h[9] || (h[9] = (f) => v.value.sortBy = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", ec, y(s(n)("Name")), 1),
                    i("option", tc, y(s(n)("Size")), 1),
                    i("option", nc, y(s(n)("Date")), 1)
                  ], 512), [
                    [St, v.value.sortBy]
                  ]),
                  we(i("select", {
                    "onUpdate:modelValue": h[10] || (h[10] = (f) => v.value.sortOrder = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", oc, y(s(n)("None")), 1),
                    i("option", sc, y(s(n)("Asc")), 1),
                    i("option", ic, y(s(n)("Desc")), 1)
                  ], 512), [
                    [St, v.value.sortOrder]
                  ])
                ])
              ]),
              i("div", ac, [
                i("div", rc, y(s(n)("Show")), 1),
                i("div", lc, [
                  i("label", dc, [
                    we(i("input", {
                      "onUpdate:modelValue": h[11] || (h[11] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [$t, v.value.filterKind]
                    ]),
                    i("span", cc, y(s(n)("All items")), 1)
                  ]),
                  i("label", uc, [
                    we(i("input", {
                      "onUpdate:modelValue": h[12] || (h[12] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [$t, v.value.filterKind]
                    ]),
                    i("span", vc, y(s(n)("Files only")), 1)
                  ]),
                  i("label", fc, [
                    we(i("input", {
                      "onUpdate:modelValue": h[13] || (h[13] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [$t, v.value.filterKind]
                    ]),
                    i("span", _c, y(s(n)("Folders only")), 1)
                  ])
                ])
              ]),
              i("div", pc, [
                i("label", hc, y(s(n)("Show hidden files")), 1),
                we(i("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": h[14] || (h[14] = (f) => v.value.showHidden = f),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Pt, v.value.showHidden]
                ])
              ]),
              i("div", mc, [
                i("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: $
                }, y(s(n)("Reset")), 1)
              ])
            ])
          ])) : I("", !0)
        ]),
        s(t)("fullscreen") ? (u(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("Toggle Full Screen"),
          onClick: h[15] || (h[15] = (f) => s(d).toggle("fullScreen"))
        }, [
          s(l).fullScreen ? (u(), R(s(xd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), R(s(bd), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, gc)) : I("", !0),
        i("div", {
          class: "mx-1.5",
          title: s(n)("Change View"),
          onClick: h[16] || (h[16] = (f) => k())
        }, [
          s(l).view === "grid" ? (u(), R(s(Fd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : I("", !0),
          s(l).view === "list" ? (u(), R(s(Ed), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : I("", !0)
        ], 8, wc)
      ])
    ]));
  }
}), bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function kc(o, e) {
  return u(), m("svg", bc, [...e[0] || (e[0] = [
    i("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const $c = { render: kc }, xc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Sc(o, e) {
  return u(), m("svg", xc, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Cc = { render: Sc }, Fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Dc(o, e) {
  return u(), m("svg", Fc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Pc = { render: Dc }, Ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Tc(o, e) {
  return u(), m("svg", Ec, [...e[0] || (e[0] = [
    i("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Mc = { render: Tc }, Ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ac(o, e) {
  return u(), m("svg", Ic, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Oc = { render: Ac }, Bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Lc(o, e) {
  return u(), m("svg", Bc, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const zc = { render: Lc }, Vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Rc(o, e) {
  return u(), m("svg", Vc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Nc = { render: Rc };
function ct(o, e = []) {
  const t = "vfDragEnterCounter", n = o.fs, a = Y(n.selectedItems);
  function d(w, v) {
    return !!(!w || w.type !== "dir" || w.path.startsWith(v) || a.value.some((x) => x.path === v ? !1 : !!w.path.startsWith(x.path)));
  }
  function l(w, v) {
    if (w.isExternalDrag)
      return;
    if (!(o.features?.move ?? !1)) {
      w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
      return;
    }
    w.preventDefault();
    const x = n.getDraggedItem();
    d(v, x) ? w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : (w.dataTransfer && (w.dataTransfer.dropEffect = "copy", w.dataTransfer.effectAllowed = "all"), w.currentTarget.classList.add(...e));
  }
  function r(w) {
    if (w.isExternalDrag || !(o.features?.move ?? !1))
      return;
    w.preventDefault();
    const k = w.currentTarget, x = Number(k.dataset[t] || 0);
    k.dataset[t] = String(x + 1);
  }
  function c(w) {
    if (w.isExternalDrag || !(o.features?.move ?? !1))
      return;
    w.preventDefault();
    const k = w.currentTarget, $ = Number(k.dataset[t] || 0) - 1;
    $ <= 0 ? (delete k.dataset[t], k.classList.remove(...e)) : k.dataset[t] = String($);
  }
  function _(w, v) {
    if (w.isExternalDrag || !(o.features?.move ?? !1) || !v) return;
    w.preventDefault();
    const x = w.currentTarget;
    delete x.dataset[t], x.classList.remove(...e);
    const $ = w.dataTransfer?.getData("items") || "[]", h = JSON.parse($).map(
      (f) => n.sortedFiles.get().find((b) => b.path === f)
    );
    n.clearDraggedItem(), o.modal.open(Je, { items: { from: h, to: v } });
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
const Uc = { class: "vuefinder__breadcrumb__container" }, jc = ["title"], Hc = ["title"], Kc = ["title"], qc = ["title"], Gc = { class: "vuefinder__breadcrumb__path-container" }, Wc = { class: "vuefinder__breadcrumb__list" }, Yc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Qc = { class: "relative" }, Xc = ["title", "onClick"], Jc = ["title"], Zc = { class: "vuefinder__breadcrumb__path-mode" }, eu = { class: "vuefinder__breadcrumb__path-mode-content" }, tu = ["title"], nu = { class: "vuefinder__breadcrumb__path-text" }, ou = ["title"], su = ["data-theme"], iu = ["onClick"], au = { class: "vuefinder__breadcrumb__hidden-item-content" }, ru = { class: "vuefinder__breadcrumb__hidden-item-text" }, lu = /* @__PURE__ */ Z({
  __name: "Breadcrumb",
  setup(o) {
    const e = ne(), { t } = e.i18n, n = e.fs, a = e.config, d = Y(a.state), l = Y(n.path), r = Y(n.loading), c = P(null), _ = $n(0, 100), g = P(5), w = P(!1), v = P(!1), k = j(() => l.value?.breadcrumb ?? []);
    function x(L, E) {
      return L.length > E ? [L.slice(-E), L.slice(0, -E)] : [L, []];
    }
    const $ = j(
      () => x(k.value, g.value)[0]
    ), p = j(
      () => x(k.value, g.value)[1]
    );
    ve(_, () => {
      if (!c.value) return;
      const L = c.value.children;
      let E = 0, F = 0;
      const M = 5, D = 1;
      g.value = M, Le(() => {
        for (let O = L.length - 1; O >= 0; O--) {
          const G = L[O];
          if (E + G.offsetWidth > _.value - 40)
            break;
          E += parseInt(G.offsetWidth.toString(), 10), F++;
        }
        F < D && (F = D), F > M && (F = M), g.value = F;
      });
    });
    const h = () => {
      c.value && (_.value = c.value.offsetWidth);
    }, f = P(null);
    me(() => {
      f.value = new ResizeObserver(h), c.value && f.value.observe(c.value);
    }), Fe(() => {
      f.value && f.value.disconnect();
    });
    const b = ct(e, ["vuefinder__drag-over"]);
    function S(L = null) {
      L ??= k.value.length - 2;
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
      return k.value[L] ?? E;
    }
    const C = () => {
      e.adapter.invalidateListQuery(l.value.path), e.adapter.open(l.value.path);
    }, A = () => {
      $.value.length > 0 && e.adapter.open(
        k.value[k.value.length - 2]?.path ?? (l.value?.storage ?? "local") + "://"
      );
    }, V = (L) => {
      e.adapter.open(L.path), w.value = !1;
    }, X = () => {
      w.value && (w.value = !1);
    }, q = {
      mounted(L, E) {
        L.clickOutsideEvent = function(F) {
          L === F.target || L.contains(F.target) || E.value();
        }, document.body.addEventListener("click", L.clickOutsideEvent);
      },
      beforeUnmount(L) {
        document.body.removeEventListener("click", L.clickOutsideEvent);
      }
    }, oe = () => {
      a.toggle("showTreeView");
    }, N = P({
      x: 0,
      y: 0
    }), se = (L, E = null) => {
      if (L.currentTarget instanceof HTMLElement) {
        const { x: F, y: M, height: D } = L.currentTarget.getBoundingClientRect();
        N.value = { x: F, y: M + D };
      }
      w.value = E ?? !w.value;
    }, T = () => {
      v.value = !v.value;
    }, ee = async () => {
      await rt(l.value?.path || ""), de.success(t("Path copied to clipboard"));
    }, K = () => {
      v.value = !1;
    };
    return (L, E) => (u(), m("div", Uc, [
      i("span", {
        title: s(t)("Toggle Tree View")
      }, [
        B(s(zc), {
          class: te(["vuefinder__breadcrumb__toggle-tree", s(d).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: oe
        }, null, 8, ["class"])
      ], 8, jc),
      i("span", {
        title: s(t)("Go up a directory")
      }, [
        B(s(Cc), Be({
          class: k.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, qe(k.value.length ? s(b).events(S()) : {}), { onClick: A }), null, 16, ["class"])
      ], 8, Hc),
      s(n).isLoading() ? (u(), m("span", {
        key: 1,
        title: s(t)("Cancel")
      }, [
        B(s(Pc), {
          onClick: E[0] || (E[0] = (F) => s(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, qc)) : (u(), m("span", {
        key: 0,
        title: s(t)("Refresh")
      }, [
        B(s($c), { onClick: C })
      ], 8, Kc)),
      we(i("div", Gc, [
        i("div", null, [
          B(s(Mc), Be({ class: "vuefinder__breadcrumb__home-icon" }, qe(s(b).events(S(-1))), {
            onClick: E[1] || (E[1] = le((F) => s(e).adapter.open(s(l).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        i("div", Wc, [
          p.value.length ? we((u(), m("div", Yc, [
            E[3] || (E[3] = i("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("div", Qc, [
              i("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: E[2] || (E[2] = (F) => se(F, !0)),
                onClick: le(se, ["stop"])
              }, [
                B(s(Fn), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [q, X]
          ]) : I("", !0)
        ]),
        i("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), m(he, null, ye($.value, (F, M) => (u(), m("div", { key: M }, [
            E[4] || (E[4] = i("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("span", Be({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: F.basename
            }, qe(s(b).events(F), !0), {
              onClick: le((D) => s(e).adapter.open(F.path), ["stop"])
            }), y(F.name), 17, Xc)
          ]))), 128))
        ], 512),
        s(a).get("loadingIndicator") === "circular" && s(r) ? (u(), R(s(bt), { key: 0 })) : I("", !0),
        i("span", {
          title: s(t)("Toggle Path Copy Mode"),
          onClick: T
        }, [
          B(s(Nc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Jc)
      ], 512), [
        [Ue, !v.value]
      ]),
      we(i("div", Zc, [
        i("div", eu, [
          i("div", {
            title: s(t)("Copy Path")
          }, [
            B(s(Ot), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: ee
            })
          ], 8, tu),
          i("div", nu, y(s(l).path), 1),
          i("div", {
            title: s(t)("Exit")
          }, [
            B(s(Oc), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: K
            })
          ], 8, ou)
        ])
      ], 512), [
        [Ue, v.value]
      ]),
      (u(), R(pt, { to: "body" }, [
        i("div", null, [
          we(i("div", {
            style: je({
              position: "absolute",
              top: N.value.y + "px",
              left: N.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": s(e).theme.current
          }, [
            (u(!0), m(he, null, ye(p.value, (F, M) => (u(), m("div", Be({
              key: M,
              class: "vuefinder__breadcrumb__hidden-item"
            }, qe(s(b).events(F), !0), {
              onClick: (D) => V(F)
            }), [
              i("div", au, [
                i("span", null, [
                  B(s(Re), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                i("span", ru, y(F.name), 1)
              ])
            ], 16, iu))), 128))
          ], 12, su), [
            [Ue, w.value]
          ])
        ])
      ]))
    ]));
  }
}), du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function cu(o, e) {
  return u(), m("svg", du, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const tn = { render: cu }, uu = { class: "vuefinder__drag-item__container" }, vu = { class: "vuefinder__drag-item__count" }, fu = /* @__PURE__ */ Z({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(o) {
    const e = o;
    return (t, n) => (u(), m("div", uu, [
      e.count > 1 ? (u(), R(s(tn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : I("", !0),
      B(s(tn), { class: "vuefinder__drag-item__icon" }),
      i("div", vu, y(e.count), 1)
    ]));
  }
}), _u = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, nn = /* @__PURE__ */ Z({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(o) {
    const e = o, t = ne(), n = Y(t.config.state), a = {
      app: t,
      config: n.value,
      item: e.item
    };
    return (d, l) => (u(), m("div", {
      class: te(["vuefinder__item-icon", o.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      De(d.$slots, "icon", Ge(We(a)), () => [
        o.item.type === "dir" ? (u(), R(s(Re), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), R(s(at), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        o.ext && o.item.type !== "dir" && o.item.extension ? (u(), m("div", _u, y(o.item.extension.substring(0, 3)), 1)) : I("", !0)
      ])
    ], 2));
  }
}), pu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function hu(o, e) {
  return u(), m("svg", pu, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const on = { render: hu }, mu = ["data-key", "data-row", "data-col", "draggable"], gu = { key: 0 }, wu = { class: "vuefinder__explorer__item-grid-content" }, yu = ["data-src", "alt"], bu = { class: "vuefinder__explorer__item-title" }, ku = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, $u = { class: "vuefinder__explorer__item-list-name" }, xu = { class: "vuefinder__explorer__item-list-icon" }, Su = { class: "vuefinder__explorer__item-name" }, Cu = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Fu = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Du = { key: 0 }, Pu = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Eu = /* @__PURE__ */ Z({
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
    const t = o, n = e, a = ne(), d = a.fs, l = a.config, r = j(() => {
      const N = a.selectionFilterType;
      return !N || N === "both" ? !0 : N === "files" && t.item.type === "file" || N === "dirs" && t.item.type === "dir";
    }), c = j(() => {
      const N = a.selectionFilterMimeIncludes;
      return !N || !N.length || t.item.type === "dir" ? !0 : t.item.mime_type ? N.some((se) => t.item.mime_type?.startsWith(se)) : !1;
    }), _ = j(() => r.value && c.value), g = j(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), w = j(() => ({
      opacity: t.isDragging || d.isCut(t.item.path) || !_.value ? 0.5 : ""
    })), v = P(null);
    let k = !1, x = null, $ = null, p = !1;
    const { enabled: h } = ze(), f = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), b = j(() => f ? !1 : h("move")), S = () => {
      x && (clearTimeout(x), x = null), $ = null;
    }, C = (N) => {
      S(), $ = N, p = !1, N.stopPropagation(), x = setTimeout(() => {
        !$ || x === null || (p = !0, $.cancelable && $.preventDefault(), $.stopPropagation(), n("contextmenu", $), S());
      }, 500);
    }, A = (N) => {
      if (p) {
        N.preventDefault(), N.stopPropagation(), S();
        return;
      }
      setTimeout(() => {
        p || (S(), oe(N));
      }, 100);
    }, V = (N) => {
      if (!$) return;
      const se = $.touches[0] || $.changedTouches[0], T = N.touches[0] || N.changedTouches[0];
      if (se && T) {
        const ee = Math.abs(T.clientX - se.clientX), K = Math.abs(T.clientY - se.clientY);
        (ee > 15 || K > 15) && S();
      }
    }, X = (N) => {
      f || n("click", N);
    }, q = (N) => {
      if (p)
        return N.preventDefault(), N.stopPropagation(), !1;
      n("dragstart", N);
    }, oe = (N) => {
      if (!k)
        k = !0, n("click", N), v.value = setTimeout(() => {
          k = !1;
        }, 300);
      else
        return k = !1, n("dblclick", N), !1;
    };
    return (N, se) => (u(), m("div", {
      class: te(g.value),
      style: je(w.value),
      "data-key": o.item.path,
      "data-row": o.rowIndex,
      "data-col": o.colIndex,
      draggable: b.value,
      onTouchstartCapture: se[1] || (se[1] = (T) => C(T)),
      onTouchendCapture: se[2] || (se[2] = (T) => A(T)),
      onTouchmoveCapture: V,
      onTouchcancelCapture: se[3] || (se[3] = () => S()),
      onClick: X,
      onDblclick: se[4] || (se[4] = (T) => n("dblclick", T)),
      onContextmenu: se[5] || (se[5] = le((T) => n("contextmenu", T), ["prevent", "stop"])),
      onDragstart: q,
      onDragend: se[6] || (se[6] = (T) => n("dragend", T))
    }, [
      o.view === "grid" ? (u(), m("div", gu, [
        s(d).isReadOnly(o.item) ? (u(), R(s(on), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : I("", !0),
        i("div", wu, [
          (o.item.mime_type ?? "").startsWith("image") && o.showThumbnails ? (u(), m("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": o.item.previewUrl ?? s(a).adapter.getPreviewUrl({ path: o.item.path }),
            alt: o.item.basename,
            onTouchstart: se[0] || (se[0] = (T) => T.preventDefault())
          }, null, 40, yu)) : (u(), R(nn, {
            key: 1,
            item: o.item,
            ext: !0
          }, {
            icon: ae((T) => [
              De(N.$slots, "icon", Ge(We(T)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        i("span", bu, y(s(Dt)(o.item.basename)), 1)
      ])) : (u(), m("div", ku, [
        i("div", $u, [
          i("div", xu, [
            B(nn, {
              item: o.item,
              small: o.compact
            }, {
              icon: ae((T) => [
                De(N.$slots, "icon", Ge(We(T)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          i("span", Su, y(o.item.basename), 1),
          i("div", null, [
            s(d).isReadOnly(o.item) ? (u(), R(s(on), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : I("", !0)
          ])
        ]),
        o.showPath ? (u(), m("div", Cu, y(o.item.path), 1)) : I("", !0),
        o.showPath ? I("", !0) : (u(), m("div", Fu, [
          o.item.file_size ? (u(), m("div", Du, y(s(a).filesize(o.item.file_size)), 1)) : I("", !0)
        ])),
        !o.showPath && o.item.last_modified ? (u(), m("div", Pu, y(new Date(o.item.last_modified * 1e3).toLocaleString()), 1)) : I("", !0)
      ])),
      s(h)("pinned") && s(l).get("pinnedFolders").find((T) => T.path === o.item.path) ? (u(), R(s(Bt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : I("", !0)
    ], 46, mu));
  }
}), Tu = ["data-row"], sn = /* @__PURE__ */ Z({
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
      class: te(a.value),
      "data-row": o.rowIndex,
      style: je(d.value)
    }, [
      i("div", {
        class: te(["grid justify-self-start", { "w-full": o.view === "list" }]),
        style: je(l.value)
      }, [
        (u(!0), m(he, null, ye(o.items, (_, g) => (u(), R(Eu, Be({
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
        }, qe(o.dragNDropEvents(_)), {
          onClick: c[0] || (c[0] = (w) => n("click", w)),
          onDblclick: c[1] || (c[1] = (w) => n("dblclick", w)),
          onContextmenu: c[2] || (c[2] = (w) => n("contextmenu", w)),
          onDragstart: c[3] || (c[3] = (w) => n("dragstart", w)),
          onDragend: c[4] || (c[4] = (w) => n("dragend", w))
        }), {
          icon: ae((w) => [
            De(r.$slots, "icon", Be({ ref_for: !0 }, w))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Tu));
  }
}), Mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
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
const Au = { render: Iu }, Ou = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Bu(o, e) {
  return u(), m("svg", Ou, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Lu = { render: Bu }, xt = /* @__PURE__ */ Z({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(o) {
    return (e, t) => (u(), m("div", null, [
      o.direction === "asc" ? (u(), R(s(Au), { key: 0 })) : I("", !0),
      o.direction === "desc" ? (u(), R(s(Lu), { key: 1 })) : I("", !0)
    ]));
  }
}), zu = { class: "vuefinder__explorer__header" }, Vu = /* @__PURE__ */ Z({
  __name: "ExplorerHeader",
  props: {
    fs: {},
    fsSortState: {},
    t: { type: Function }
  },
  setup(o) {
    const e = o, { fs: t, fsSortState: n, t: a } = e;
    return (d, l) => (u(), m("div", zu, [
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: l[0] || (l[0] = (r) => s(t).toggleSort("basename"))
      }, [
        ue(y(s(a)("Name")) + " ", 1),
        we(B(xt, {
          direction: s(n).order
        }, null, 8, ["direction"]), [
          [Ue, s(n).active && s(n).column === "basename"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: l[1] || (l[1] = (r) => s(t).toggleSort("file_size"))
      }, [
        ue(y(s(a)("Size")) + " ", 1),
        we(B(xt, {
          direction: s(n).order
        }, null, 8, ["direction"]), [
          [Ue, s(n).active && s(n).column === "file_size"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: l[2] || (l[2] = (r) => s(t).toggleSort("last_modified"))
      }, [
        ue(y(s(a)("Date")) + " ", 1),
        we(B(xt, {
          direction: s(n).order
        }, null, 8, ["direction"]), [
          [Ue, s(n).active && s(n).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function Ru(o, e) {
  const {
    scrollContainer: t,
    itemWidth: n = 100,
    rowHeight: a,
    overscan: d = 2,
    containerPadding: l = 48,
    lockItemsPerRow: r
  } = e, c = o, _ = () => typeof a == "number" ? a : a.value, g = P(0), w = P(6), v = P(600);
  let k = null;
  const x = j(() => Math.ceil(c.value.length / w.value)), $ = j(() => x.value * _()), p = j(() => {
    const q = _(), oe = Math.max(0, Math.floor(g.value / q) - d), N = Math.min(
      x.value,
      Math.ceil((g.value + v.value) / q) + d
    );
    return { start: oe, end: N };
  }), h = j(() => {
    const { start: q, end: oe } = p.value;
    return Array.from({ length: oe - q }, (N, se) => q + se);
  }), f = () => v.value, b = () => r.value, S = () => {
    if (b()) {
      w.value = 1;
      return;
    }
    if (t.value) {
      const q = t.value.clientWidth - l;
      w.value = Math.max(Math.floor(q / n), 2);
    }
  }, C = (q) => {
    const oe = q.target;
    g.value = oe.scrollTop;
  };
  ve(
    () => c.value.length,
    () => {
      S();
    }
  );
  const A = (q, oe) => {
    if (!q || !Array.isArray(q))
      return [];
    const N = oe * w.value;
    return q.slice(N, N + w.value);
  }, V = (q, oe, N, se, T) => {
    if (!q || !Array.isArray(q))
      return [];
    const ee = [];
    for (let K = oe; K <= N; K++)
      for (let L = se; L <= T; L++) {
        const E = K * w.value + L;
        E < q.length && q[E] && ee.push(q[E]);
      }
    return ee;
  }, X = (q) => ({
    row: Math.floor(q / w.value),
    col: q % w.value
  });
  return me(async () => {
    await Le(), t.value && (v.value = t.value.clientHeight || 600), S(), window.addEventListener("resize", () => {
      t.value && (v.value = t.value.clientHeight || 600), S();
    }), t.value && "ResizeObserver" in window && (k = new ResizeObserver((q) => {
      const oe = q[0];
      oe && (v.value = Math.round(oe.contentRect.height)), S();
    }), k.observe(t.value));
  }), Fe(() => {
    window.removeEventListener("resize", S), k && (k.disconnect(), k = null);
  }), {
    scrollTop: g,
    itemsPerRow: w,
    totalRows: x,
    totalHeight: $,
    visibleRange: p,
    visibleRows: h,
    updateItemsPerRow: S,
    handleScroll: C,
    getRowItems: A,
    getItemsInRange: V,
    getItemPosition: X,
    getContainerHeight: f
  };
}
function Nu(o) {
  const {
    getItemPosition: e,
    getItemsInRange: t,
    getKey: n,
    selectionObject: a,
    rowHeight: d,
    itemWidth: l,
    osInstance: r
  } = o, c = Math.floor(Math.random() * 2 ** 32).toString(), _ = ne(), g = _.fs, w = Y(g.selectedKeys), v = Y(g.sortedFiles), k = j(() => {
    const D = /* @__PURE__ */ new Map();
    return v.value && v.value.forEach((O) => {
      D.set(n(O), O);
    }), D;
  }), x = P(/* @__PURE__ */ new Set()), $ = P(!1), p = P(!1), h = P(null), f = P(null), b = (D) => D.map((O) => O.getAttribute("data-key")).filter((O) => !!O), S = (D) => {
    D.selection.clearSelection(!0, !0);
  }, C = (D) => {
    if (w.value && w.value.size > 0) {
      const O = document.querySelectorAll(`.file-item-${c}[data-key]`), G = /* @__PURE__ */ new Map();
      O.forEach((Q) => {
        const ie = Q.getAttribute("data-key");
        ie && G.set(ie, Q);
      });
      const W = [];
      w.value.forEach((Q) => {
        const ie = G.get(Q);
        ie && A(Q) && W.push(ie);
      }), W.forEach((Q) => {
        D.selection.select(Q, !0);
      });
    }
  }, A = (D) => {
    const O = k.value.get(D);
    if (!O) return !1;
    const G = _.selectionFilterType, W = _.selectionFilterMimeIncludes;
    return G === "files" && O.type === "dir" || G === "dirs" && O.type === "file" ? !1 : W && Array.isArray(W) && W.length > 0 ? O.type === "dir" ? !0 : O.mime_type ? W.some((Q) => O.mime_type?.startsWith(Q)) : !1 : !0;
  }, V = (D) => {
    if (D.size === 0)
      return null;
    const O = /* @__PURE__ */ new Map();
    v.value && v.value.forEach((fe, H) => {
      O.set(n(fe), H);
    });
    const W = Array.from(D).map((fe) => {
      const H = O.get(fe) ?? -1;
      return H >= 0 ? e(H) : null;
    }).filter((fe) => fe !== null);
    if (W.length === 0)
      return null;
    const Q = W[0], ie = W.reduce((fe, H) => H.row < fe ? H.row : fe, Q.row), _e = W.reduce((fe, H) => H.row > fe ? H.row : fe, Q.row), xe = W.reduce((fe, H) => H.col < fe ? H.col : fe, Q.col), Ie = W.reduce((fe, H) => H.col > fe ? H.col : fe, Q.col);
    return { minRow: ie, maxRow: _e, minCol: xe, maxCol: Ie };
  }, X = (D) => {
    if (_.selectionMode === "single")
      return !1;
    $.value = !1, !D.event?.metaKey && !D.event?.ctrlKey && (p.value = !0), D.selection.resolveSelectables(), S(D), C(D);
  }, q = P(0), oe = (D) => {
    const O = D;
    if (O && "touches" in O) {
      const G = O.touches?.[0];
      if (G) return { x: G.clientX, y: G.clientY };
    }
    if (O && "changedTouches" in O) {
      const G = O.changedTouches?.[0];
      if (G) return { x: G.clientX, y: G.clientY };
    }
    if (O && "clientX" in O && "clientY" in O) {
      const G = O;
      return { x: G.clientX, y: G.clientY };
    }
    return null;
  }, N = ({ event: D, selection: O }) => {
    q.value = (a.value?.getAreaLocation().y1 ?? 0) - (_.root.getBoundingClientRect().top ?? 0);
    const G = document.querySelector(
      ".selection-area-container"
    );
    if (G && (G.dataset.theme = _.theme.current), _.selectionMode === "single")
      return;
    const W = D;
    W && "type" in W && W.type === "touchend" && W.preventDefault();
    const Q = D;
    if (!Q?.ctrlKey && !Q?.metaKey && (g.clearSelection(), O.clearSelection(!0, !0)), x.value.clear(), a.value) {
      const ie = a.value.getSelectables()[0]?.closest(".scroller-" + c);
      if (ie) {
        const _e = ie.getBoundingClientRect(), xe = oe(D);
        if (xe) {
          const Ie = xe.y - _e.top + ie.scrollTop, fe = xe.x - _e.left, H = Math.floor(Ie / d.value), pe = Math.floor(fe / l);
          h.value = { row: H, col: pe, relativeX: fe };
        }
      }
    }
  }, se = (D) => {
    if (_.selectionMode === "single")
      return;
    const O = b(D.store.changed.added), G = b(D.store.changed.removed);
    if (p.value = !1, $.value = !0, O.forEach((W) => {
      w.value && !w.value.has(W) && A(W) && (x.value.add(W), g.select(W, _.selectionMode || "multiple"));
    }), G.forEach((W) => {
      document.querySelector(`[data-key="${W}"]`) && k.value.has(W) && x.value.delete(W), g.deselect(W);
    }), D.selection.resolveSelectables(), a.value && D.event) {
      const W = a.value.getSelectables()[0]?.closest(".scroller-" + c);
      if (W) {
        const Q = W.getBoundingClientRect(), ie = oe(D.event);
        if (ie) {
          const _e = ie.y - Q.top + W.scrollTop, xe = ie.x - Q.left, Ie = Math.floor(_e / d.value), fe = Math.floor(xe / l);
          f.value = { row: Ie, col: fe };
        }
      }
    }
    C(D);
  }, T = () => {
    x.value.clear();
  }, ee = (D) => {
    if (D.event && h.value && x.value.size > 0) {
      const O = /* @__PURE__ */ new Map();
      v.value && v.value.forEach((Q, ie) => {
        O.set(n(Q), ie);
      });
      const W = Array.from(x.value).map((Q) => {
        const ie = O.get(Q) ?? -1;
        return ie >= 0 ? e(ie) : null;
      }).filter((Q) => Q !== null);
      if (W.length > 0) {
        let Q = h.value.col, ie = h.value.col;
        if (f.value) {
          const ce = h.value.col, be = f.value.col, z = h.value.relativeX - ce * l;
          be > ce ? (Q = z < l / 2 ? ce : ce + 1, ie = be) : be < ce ? (Q = be, ie = z >= l / 2 ? ce : ce - 1) : (Q = ce, ie = ce);
        } else {
          const ce = [
            ...W,
            { row: h.value.row, col: h.value.col }
          ], be = ce[0];
          Q = ce.reduce((z, U) => U.col < z ? U.col : z, be.col), ie = ce.reduce((z, U) => U.col > z ? U.col : z, be.col);
        }
        Q = Math.max(0, Q), ie = Math.max(Q, ie);
        const _e = [
          ...W,
          { row: h.value.row, col: h.value.col }
        ], xe = _e[0], Ie = _e.reduce((ce, be) => be.row < ce ? be.row : ce, xe.row), fe = _e.reduce((ce, be) => be.row > ce ? be.row : ce, xe.row), H = t(
          v.value || [],
          Ie,
          fe,
          Q,
          ie
        ), pe = document.querySelectorAll(`.file-item-${c}[data-key]`), ge = /* @__PURE__ */ new Map();
        pe.forEach((ce) => {
          const be = ce.getAttribute("data-key");
          be && ge.set(be, ce);
        });
        const Se = [];
        if (H.forEach((ce) => {
          const be = n(ce);
          ge.get(be) || Se.push(be);
        }), Se.length > 0) {
          const ce = _.selectionMode || "multiple";
          g.selectMultiple(Se, ce);
        }
      }
    }
  }, K = (D) => {
    if (!f.value && a.value && D.event) {
      const O = a.value.getSelectables()[0]?.closest(".scroller-" + c);
      if (O) {
        const G = O.getBoundingClientRect(), W = oe(D.event);
        if (W) {
          const Q = W.y - G.top + O.scrollTop, ie = W.x - G.left, _e = Math.floor(Q / d.value), xe = Math.floor(ie / l);
          f.value = { row: _e, col: xe };
        }
      }
    }
    ee(D), S(D), C(D), g.setSelectedCount(w.value?.size || 0), $.value = !1, h.value = null, f.value = null;
  }, L = () => {
    let D = [".scroller-" + c];
    if (r?.value) {
      const { viewport: O } = r.value.elements();
      O && (D = O);
    }
    a.value = new Zn({
      selectables: [".file-item-" + c + ":not(.vf-explorer-item--unselectable)"],
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
    }), a.value.on("beforestart", X), a.value.on("start", N), a.value.on("move", se), a.value.on("stop", K);
  }, E = () => {
    a.value && (a.value.destroy(), a.value = null);
  }, F = () => {
    a.value && (Array.from(
      w.value ?? /* @__PURE__ */ new Set()
    ).forEach((O) => {
      A(O) || g.deselect(O);
    }), E(), L());
  }, M = (D) => {
    p.value && (a.value?.clearSelection(), T(), p.value = !1);
    const O = D;
    !x.value.size && !p.value && !O?.ctrlKey && !O?.metaKey && (g.clearSelection(), a.value?.clearSelection());
  };
  return me(() => {
    const D = (O) => {
      !O.buttons && $.value && ($.value = !1);
    };
    document.addEventListener("dragleave", D), Fe(() => {
      document.removeEventListener("dragleave", D);
    });
  }), {
    isDragging: $,
    selectionStarted: p,
    explorerId: c,
    extractIds: b,
    cleanupSelection: S,
    refreshSelection: C,
    getSelectionRange: V,
    selectSelectionRange: ee,
    initializeSelectionArea: L,
    destroySelectionArea: E,
    updateSelectionArea: F,
    handleContentClick: M
  };
}
function Uu(o) {
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
function ju(o) {
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
  const r = o.fs, { canSelectItem: c } = Uu(o), { openItem: _ } = ju(o), g = (p) => {
    const h = p.target?.closest(".file-item-" + e);
    if (!h) return null;
    const f = String(h.getAttribute("data-key")), b = t.value?.find((S) => S.path === f);
    return { key: f, item: b };
  }, w = () => {
    const p = n.value;
    return t.value?.filter((h) => p?.has(h.path)) || [];
  };
  return {
    handleItemClick: (p) => {
      const h = g(p);
      if (!h) return;
      const { key: f, item: b } = h, S = p;
      if (!c(b))
        return;
      const C = o.selectionMode || "multiple";
      !S?.ctrlKey && !S?.metaKey && (p.type !== "touchstart" || !r.isSelected(f)) && (r.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), p.type === "touchstart" && r.isSelected(f) ? r.select(f, C) : r.toggleSelect(f, C), r.setSelectedCount(n.value?.size || 0);
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
      const { key: f, item: b } = h;
      c(b) && (n.value?.has(f) || (r.clearSelection(), r.select(f)), o.emitter.emit("vf-contextmenu-show", {
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
function Ku(o, e) {
  const t = P(null);
  return me(() => {
    if (nt.plugin([Jn]), o.value) {
      const n = nt(
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
  }), Fe(() => {
    if (t.value) {
      const { viewport: n } = t.value.elements();
      n && n.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
function qu(o, e) {
  const t = P(null);
  return me(() => {
    o.value && (t.value = new un({
      elements_selector: ".lazy",
      container: o.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), Un(() => {
    t.value && t.value.update();
  }), Fe(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const Gu = { class: "vuefinder__explorer__container" }, Wu = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Yu = /* @__PURE__ */ Z({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(o) {
    const e = o, t = ne(), n = ct(t, ["vuefinder__drag-over"]), a = Qe("dragImage"), d = an(null), l = Qe("scrollContainer"), r = Qe("scrollContent"), c = t.fs, _ = t.config, g = Y(_.state), w = Y(c.sort), v = Y(c.sortedFiles), k = Y(c.selectedKeys), x = Y(c.loading), $ = (H) => k.value?.has(H) ?? !1, p = j(() => {
      const H = g.value.view, pe = g.value.compactListView;
      return H === "grid" ? 88 : pe ? 24 : 50;
    }), { t: h } = t.i18n, {
      itemsPerRow: f,
      totalHeight: b,
      visibleRows: S,
      handleScroll: C,
      getRowItems: A,
      getItemsInRange: V,
      getItemPosition: X,
      updateItemsPerRow: q
    } = Ru(
      j(() => v.value ?? []),
      {
        scrollContainer: l,
        itemWidth: 104,
        rowHeight: p,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: j(() => g.value.view === "list")
      }
    ), { osInstance: oe } = Ku(l, C), {
      explorerId: N,
      isDragging: se,
      initializeSelectionArea: T,
      updateSelectionArea: ee,
      handleContentClick: K
    } = Nu({
      getItemPosition: X,
      getItemsInRange: V,
      getKey: (H) => H.path,
      selectionObject: d,
      rowHeight: p,
      itemWidth: 104,
      osInstance: oe
    }), L = P(null), E = (H) => {
      if (!H || !L.value) return !1;
      const pe = k.value?.has(L.value) ?? !1;
      return se.value && (pe ? k.value?.has(H) ?? !1 : H === L.value);
    };
    ve(
      () => _.get("view"),
      (H) => {
        H === "list" ? f.value = 1 : q();
      },
      { immediate: !0 }
    ), ve(f, (H) => {
      _.get("view") === "list" && H !== 1 && (f.value = 1);
    });
    const F = (H) => v.value?.[H];
    qu(l, t);
    const { handleItemClick: M, handleItemDblClick: D, handleItemContextMenu: O, handleContentContextMenu: G } = Hu(
      t,
      N,
      v,
      k,
      d,
      e.onFileDclick,
      e.onFolderDclick
    );
    me(() => {
      const H = () => {
        d.value || T(), d.value && d.value.on("beforestart", ({ event: pe }) => {
          const ge = pe?.target === r.value;
          if (!pe?.metaKey && !pe?.ctrlKey && !pe?.altKey && !ge)
            return !1;
        });
      };
      if (oe.value)
        H();
      else {
        const pe = setInterval(() => {
          oe.value && (clearInterval(pe), H());
        }, 50);
        setTimeout(() => {
          clearInterval(pe), d.value || H();
        }, 500);
      }
      ve(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], ee, {
        deep: !0
      });
    });
    const W = (H) => {
      if (!(t.features?.move ?? !1) || H.altKey || H.ctrlKey || H.metaKey)
        return H.preventDefault(), !1;
      se.value = !0;
      const ge = H.target?.closest(
        ".file-item-" + N
      );
      if (L.value = ge ? String(ge.dataset.key) : null, H.dataTransfer && L.value) {
        H.dataTransfer.setDragImage(a.value, 0, 15), H.dataTransfer.effectAllowed = "all", H.dataTransfer.dropEffect = "copy";
        const Se = k.value?.has(L.value) ? Array.from(k.value) : [L.value];
        H.dataTransfer.setData("items", JSON.stringify(Se)), c.setDraggedItem(L.value);
      }
    }, Q = () => {
      L.value = null;
    };
    let ie = null, _e = null;
    const xe = (H) => {
      H.target?.closest(".file-item-" + N) || (_e = H, ie && clearTimeout(ie), ie = setTimeout(() => {
        _e && (_e.cancelable && _e.preventDefault(), _e.stopPropagation(), G(_e)), _e = null, ie = null;
      }, 500));
    }, Ie = (H) => {
      ie && (clearTimeout(ie), ie = null), _e = null;
    }, fe = (H) => {
      if (!_e) return;
      const pe = _e.touches[0] || _e.changedTouches[0], ge = H.touches[0] || H.changedTouches[0];
      if (pe && ge) {
        const Se = Math.abs(ge.clientX - pe.clientX), ce = Math.abs(ge.clientY - pe.clientY);
        (Se > 15 || ce > 15) && (ie && (clearTimeout(ie), ie = null), _e = null);
      }
    };
    return (H, pe) => (u(), m("div", Gu, [
      s(g).view === "list" ? (u(), R(Vu, {
        key: 0,
        fs: s(c),
        "fs-sort-state": s(w),
        t: s(h)
      }, null, 8, ["fs", "fs-sort-state", "t"])) : I("", !0),
      i("div", {
        ref_key: "scrollContainer",
        ref: l,
        class: te(["vuefinder__explorer__selector-area", "scroller-" + s(N)])
      }, [
        s(_).get("loadingIndicator") === "linear" && s(x) ? (u(), m("div", Wu)) : I("", !0),
        i("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: je({ height: `${s(b)}px`, position: "relative", width: "100%" }),
          onContextmenu: pe[0] || (pe[0] = le(
            //@ts-ignore
            (...ge) => s(G) && s(G)(...ge),
            ["self", "prevent"]
          )),
          onClick: pe[1] || (pe[1] = le(
            //@ts-ignore
            (...ge) => s(K) && s(K)(...ge),
            ["self"]
          )),
          onTouchstartCapture: le(xe, ["self"]),
          onTouchendCapture: le(Ie, ["self"]),
          onTouchmoveCapture: le(fe, ["self"]),
          onTouchcancelCapture: le(Ie, ["self"])
        }, [
          i("div", {
            ref_key: "dragImage",
            ref: a,
            class: "vuefinder__explorer__drag-item"
          }, [
            B(fu, {
              count: L.value && s(k).has(L.value) ? s(k).size : 1
            }, null, 8, ["count"])
          ], 512),
          s(g).view === "grid" ? (u(!0), m(he, { key: 0 }, ye(s(S), (ge) => (u(), R(sn, {
            key: ge,
            "row-index": ge,
            "row-height": p.value,
            view: "grid",
            "items-per-row": s(f),
            items: s(A)(s(v), ge),
            "show-thumbnails": s(g).showThumbnails,
            "is-dragging-item": E,
            "is-selected": $,
            "drag-n-drop-events": (Se) => s(n).events(Se),
            "explorer-id": s(N),
            onClick: s(M),
            onDblclick: s(D),
            onContextmenu: s(O),
            onDragstart: W,
            onDragend: Q
          }, {
            icon: ae((Se) => [
              De(H.$slots, "icon", Be({ ref_for: !0 }, Se))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), m(he, { key: 1 }, ye(s(S), (ge) => (u(), R(sn, {
            key: ge,
            "row-index": ge,
            "row-height": p.value,
            view: "list",
            items: F(ge) ? [F(ge)] : [],
            compact: s(g).compactListView,
            "is-dragging-item": E,
            "is-selected": $,
            "drag-n-drop-events": (Se) => s(n).events(Se),
            "explorer-id": s(N),
            onClick: s(M),
            onDblclick: s(D),
            onContextmenu: s(O),
            onDragstart: W,
            onDragend: Q
          }, {
            icon: ae((Se) => [
              De(H.$slots, "icon", Be({ ref_for: !0 }, Se))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), Qu = ["href", "download"], Xu = ["onClick"], Ju = /* @__PURE__ */ Z({
  __name: "ContextMenu",
  setup(o) {
    const e = ne(), t = P(null), n = P([]);
    let a = null, d = null;
    const l = _t({
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
      l.items = (e.contextMenuItems || []).filter((x) => x.show(e, {
        items: v,
        target: k
      })).sort((x, $) => {
        const p = x.order ?? 1 / 0, h = $.order ?? 1 / 0;
        return p - h;
      }), k ? v.length > 1 && v.some((x) => x.path === k.path) ? e.emitter.emit("vf-context-selected", v) : e.emitter.emit("vf-context-selected", [k]) : e.emitter.emit("vf-context-selected", []), _(w);
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
      }, l.active = !0, await Le(), !t.value || !d) return;
      await new Promise((p) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(p);
        });
      });
      const k = [
        ot(8),
        st({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        it({ padding: 16 })
      ];
      let x = 0, $ = 0;
      try {
        const p = await Xe(d, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: k
        });
        x = p.x, $ = p.y;
      } catch (p) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", p);
        return;
      }
      l.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${x}px`,
        top: `${$}px`,
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
            a = Et(d, t.value, async () => {
              if (!(!d || !t.value))
                try {
                  const { x: p, y: h } = await Xe(d, t.value, {
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
    return Fe(() => {
      a && (a(), a = null), d = null;
    }), (g, w) => we((u(), m("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: te([{
        "vuefinder__context-menu--active": l.active,
        "vuefinder__context-menu--inactive": !l.active
      }, "vuefinder__context-menu"]),
      style: je(l.positions)
    }, [
      (u(!0), m(he, null, ye(l.items, (v) => (u(), m("li", {
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
        ], 8, Qu)) : (u(), m("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (k) => c(v)
        }, [
          i("span", null, y(v.title(s(e).i18n)), 1)
        ], 8, Xu))
      ]))), 128))
    ], 6)), [
      [Ue, l.active]
    ]);
  }
}), Zu = { class: "vuefinder__status-bar__wrapper" }, ev = { class: "vuefinder__status-bar__storage" }, tv = ["title"], nv = { class: "vuefinder__status-bar__storage-icon" }, ov = ["value"], sv = ["value"], iv = { class: "vuefinder__status-bar__info space-x-2" }, av = { key: 0 }, rv = { key: 1 }, lv = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, dv = { class: "vuefinder__status-bar__actions" }, cv = /* @__PURE__ */ Z({
  __name: "Statusbar",
  setup(o) {
    const e = ne(), { t } = e.i18n, n = e.fs, a = Y(n.sortedFiles), d = Y(n.path), l = Y(n.selectedCount), r = Y(n.storages), c = Y(n.selectedItems), _ = Y(n.path), g = (p) => {
      const h = p.target.value;
      e.adapter.open(h + "://");
    }, w = j(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((p, h) => p + (h.file_size || 0), 0)), v = j(() => r.value), k = j(() => a.value), x = j(() => l.value || 0), $ = j(() => c.value || []);
    return (p, h) => (u(), m("div", Zu, [
      i("div", ev, [
        i("div", {
          class: "vuefinder__status-bar__storage-container",
          title: s(t)("Storage")
        }, [
          i("div", nv, [
            B(s(Lt))
          ]),
          i("select", {
            name: "vuefinder-media-selector",
            value: s(d).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: g
          }, [
            (u(!0), m(he, null, ye(v.value, (f) => (u(), m("option", {
              key: f,
              value: f
            }, y(f), 9, sv))), 128))
          ], 40, ov),
          h[0] || (h[0] = i("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, tv),
        i("div", iv, [
          x.value === 0 ? (u(), m("span", av, y(k.value.length) + " " + y(s(t)("items")), 1)) : (u(), m("span", rv, [
            ue(y(x.value) + " " + y(s(t)("selected")) + " ", 1),
            w.value ? (u(), m("span", lv, y(s(e).filesize(w.value)), 1)) : I("", !0)
          ]))
        ])
      ]),
      i("div", dv, [
        De(p.$slots, "actions", {
          path: s(_).path,
          count: x.value || 0,
          selected: $.value
        })
      ])
    ]));
  }
}), uv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function vv(o, e) {
  return u(), m("svg", uv, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const fv = { render: vv };
function On(o, e) {
  const t = o.findIndex((n) => n.path === e.path);
  t > -1 ? o[t] = e : o.push(e);
}
const _v = { class: "vuefinder__folder-loader-indicator" }, pv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Bn = /* @__PURE__ */ Z({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ jn({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o) {
    const e = o, t = ne(), n = cn(o, "modelValue"), a = P(!1);
    ve(
      () => n.value,
      () => d()
    );
    const d = async () => {
      a.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        On(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (l) {
        Te(l, "Failed to fetch subfolders");
      } finally {
        a.value = !1;
      }
    };
    return (l, r) => (u(), m("div", _v, [
      a.value ? (u(), R(s(bt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), m("div", pv, [
        n.value ? (u(), R(s(yt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : I("", !0),
        n.value ? I("", !0) : (u(), R(s(wt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), hv = { key: 0 }, mv = { class: "vuefinder__treesubfolderlist__no-folders" }, gv = { class: "vuefinder__treesubfolderlist__item-content" }, wv = ["onClick"], yv = ["title", "onDblclick", "onClick"], bv = { class: "vuefinder__treesubfolderlist__item-icon" }, kv = { class: "vuefinder__treesubfolderlist__subfolder" }, $v = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, xv = /* @__PURE__ */ Z({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(o) {
    const e = ne(), t = e.fs, n = ct(e, ["vuefinder__drag-over"]), a = P({}), { t: d } = e.i18n, l = Y(t.path), r = o, c = P(null), _ = P(50);
    me(() => {
      r.path === r.storage + "://" && c.value && nt(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const g = j(() => {
      const $ = e.treeViewData.find((p) => p.path === r.path)?.folders || [];
      return $.length > _.value ? $.slice(0, _.value) : $;
    }), w = j(() => e.treeViewData.find(($) => $.path === r.path)?.folders?.length || 0), v = j(() => w.value > _.value), k = () => {
      _.value += 50;
    };
    return (x, $) => {
      const p = ln("TreeSubfolderList", !0);
      return u(), m("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        g.value.length ? I("", !0) : (u(), m("li", hv, [
          i("div", mv, y(s(d)("No folders")), 1)
        ])),
        (u(!0), m(he, null, ye(g.value, (h) => (u(), m("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          i("div", gv, [
            i("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (f) => a.value[h.path] = !a.value[h.path]
            }, [
              B(Bn, {
                modelValue: a.value[h.path],
                "onUpdate:modelValue": (f) => a.value[h.path] = f,
                storage: o.storage,
                path: h.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, wv),
            i("div", Be({
              class: "vuefinder__treesubfolderlist__item-link",
              title: h.path
            }, qe(
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
              i("div", bv, [
                s(l)?.path === h.path ? (u(), R(s(zt), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), R(s(Re), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              i("div", {
                class: te(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": s(l).path === h.path
                }])
              }, y(h.basename), 3)
            ], 16, yv)
          ]),
          i("div", kv, [
            we(B(p, {
              storage: r.storage,
              path: h.path
            }, null, 8, ["storage", "path"]), [
              [Ue, a.value[h.path]]
            ])
          ])
        ]))), 128)),
        v.value ? (u(), m("li", $v, [
          i("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: k
          }, y(s(d)("load more")), 1)
        ])) : I("", !0)
      ], 512);
    };
  }
}), Sv = /* @__PURE__ */ Z({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(o) {
    const e = ne(), t = e.fs, n = P(!1), a = o, d = ct(e, ["vuefinder__drag-over"]), l = Y(t.path), r = j(() => a.storage === l.value?.storage), c = {
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
    return (g, w) => (u(), m(he, null, [
      i("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: w[2] || (w[2] = (v) => _(o.storage))
      }, [
        i("div", Be({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, qe(s(d).events(c), !0)), [
          i("div", {
            class: te(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            B(s(Lt))
          ], 2),
          i("div", null, y(o.storage), 1)
        ], 16),
        i("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: w[1] || (w[1] = le((v) => n.value = !n.value, ["stop"]))
        }, [
          B(Bn, {
            modelValue: n.value,
            "onUpdate:modelValue": w[0] || (w[0] = (v) => n.value = v),
            storage: o.storage,
            path: o.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      we(B(xv, {
        storage: o.storage,
        path: o.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ue, n.value]
      ])
    ], 64));
  }
}), Cv = { class: "vuefinder__folder-indicator" }, Fv = { class: "vuefinder__folder-indicator--icon" }, Dv = /* @__PURE__ */ Z({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const e = cn(o, "modelValue");
    return (t, n) => (u(), m("div", Cv, [
      i("div", Fv, [
        e.value ? (u(), R(s(yt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : I("", !0),
        e.value ? I("", !0) : (u(), R(s(wt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Pv = {
  key: 0,
  class: "vuefinder__treeview__header"
}, Ev = { class: "vuefinder__treeview__pinned-label" }, Tv = { class: "vuefinder__treeview__pin-text text-nowrap" }, Mv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Iv = ["onClick"], Av = ["title"], Ov = ["onClick"], Bv = { key: 0 }, Lv = { class: "vuefinder__treeview__no-pinned" }, zv = /* @__PURE__ */ Z({
  __name: "TreeView",
  setup(o) {
    const e = ne(), { enabled: t } = ze(), { t: n } = e.i18n, { getStore: a, setStore: d } = e.storage, l = e.fs, r = e.config, c = Y(r.state), _ = Y(l.sortedFiles), g = Y(l.storages), w = j(() => g.value || []), v = Y(l.path), k = ct(e, ["vuefinder__drag-over"]), x = P(190), $ = P(a("pinned-folders-opened", !0));
    ve($, (b) => d("pinned-folders-opened", b));
    const p = (b) => {
      const S = r.get("pinnedFolders");
      r.set("pinnedFolders", S.filter((C) => C.path !== b.path));
    }, h = (b) => {
      const S = b.clientX, C = b.target.parentElement;
      if (!C) return;
      const A = C.getBoundingClientRect().width;
      C.classList.remove("transition-[width]"), C.classList.add("transition-none");
      const V = (q) => {
        x.value = A + q.clientX - S, x.value < 50 && (x.value = 0, r.set("showTreeView", !1)), x.value > 50 && r.set("showTreeView", !0);
      }, X = () => {
        const q = C.getBoundingClientRect();
        x.value = q.width, C.classList.add("transition-[width]"), C.classList.remove("transition-none"), window.removeEventListener("mousemove", V), window.removeEventListener("mouseup", X);
      };
      window.addEventListener("mousemove", V), window.addEventListener("mouseup", X);
    }, f = P(null);
    return me(() => {
      f.value && nt(f.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ve(_, (b) => {
      const S = b.filter((C) => C.type === "dir");
      On(e.treeViewData, {
        path: v.value.path || "",
        folders: S.map((C) => ({
          storage: C.storage,
          path: C.path,
          basename: C.basename,
          type: "dir"
        }))
      });
    }), (b, S) => (u(), m(he, null, [
      i("div", {
        class: te(["vuefinder__treeview__overlay", s(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: S[0] || (S[0] = (C) => s(r).toggle("showTreeView"))
      }, null, 2),
      i("div", {
        style: je(
          s(c).showTreeView ? "min-width:100px;max-width:75%; width: " + x.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        i("div", {
          ref_key: "treeViewScrollElement",
          ref: f,
          class: "vuefinder__treeview__scroll"
        }, [
          s(t)("pinned") ? (u(), m("div", Pv, [
            i("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: S[2] || (S[2] = (C) => $.value = !$.value)
            }, [
              i("div", Ev, [
                B(s(Bt), { class: "vuefinder__treeview__pin-icon" }),
                i("div", Tv, y(s(n)("Pinned Folders")), 1)
              ]),
              B(Dv, {
                modelValue: $.value,
                "onUpdate:modelValue": S[1] || (S[1] = (C) => $.value = C)
              }, null, 8, ["modelValue"])
            ]),
            $.value ? (u(), m("ul", Mv, [
              (u(!0), m(he, null, ye(s(c).pinnedFolders, (C) => (u(), m("li", {
                key: C.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                i("div", Be({ class: "vuefinder__treeview__pinned-folder" }, qe(s(k).events(C), !0), {
                  onClick: (A) => s(e).adapter.open(C.path)
                }), [
                  s(v).path !== C.path ? (u(), R(s(Re), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : I("", !0),
                  s(v).path === C.path ? (u(), R(s(zt), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : I("", !0),
                  i("div", {
                    title: C.path,
                    class: te(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": s(v).path === C.path
                    }])
                  }, y(C.basename), 11, Av)
                ], 16, Iv),
                i("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (A) => p(C)
                }, [
                  B(s(fv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Ov)
              ]))), 128)),
              s(c).pinnedFolders.length ? I("", !0) : (u(), m("li", Bv, [
                i("div", Lv, y(s(n)("No folders pinned")), 1)
              ]))
            ])) : I("", !0)
          ])) : I("", !0),
          (u(!0), m(he, null, ye(w.value, (C) => (u(), m("div", {
            key: C,
            class: "vuefinder__treeview__storage"
          }, [
            B(Sv, { storage: C }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        i("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: h
        }, null, 32)
      ], 4)
    ], 64));
  }
}), Ce = {
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
function Vv(o) {
  return o.items.length > 1 && o.items.some((e) => e.path === o.target?.path) ? "many" : o.target ? "one" : "none";
}
function ke(o) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    o
  );
  return (t, n) => !(e.needsSearchQuery !== !!n.searchQuery || e.target !== void 0 && e.target !== Vv(n) || e.targetType !== void 0 && e.targetType !== n.target?.type || e.mimeType !== void 0 && e.mimeType !== n.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function et(...o) {
  return (e, t) => o.some((n) => n(e, t));
}
function tt(...o) {
  return (e, t) => o.every((n) => n(e, t));
}
const Ln = [
  {
    id: Ce.openDir,
    title: ({ t: o }) => o("Open containing folder"),
    action: (o, e) => {
      const t = e[0];
      t && o.adapter.open(t.dir);
    },
    show: ke({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: Ce.refresh,
    title: ({ t: o }) => o("Refresh"),
    action: (o) => {
      const e = o.fs;
      o.adapter.invalidateListQuery(e.path.get().path), o.adapter.open(e.path.get().path);
    },
    show: et(ke({ target: "none" }), ke({ target: "many" })),
    order: 20
  },
  {
    id: Ce.selectAll,
    title: ({ t: o }) => o("Select All"),
    action: (o) => {
      o.fs.selectAll(o.selectionMode || "multiple");
    },
    show: (o, e) => o.selectionMode === "multiple" && ke({ target: "none" })(o, e),
    order: 30
  },
  {
    id: Ce.new_folder,
    title: ({ t: o }) => o("New Folder"),
    action: (o) => o.modal.open(jt),
    show: ke({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: Ce.open,
    title: ({ t: o }) => o("Open"),
    action: (o, e) => {
      e[0] && o.adapter.open(e[0].path);
    },
    show: ke({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: Ce.pinFolder,
    title: ({ t: o }) => o("Pin Folder"),
    action: (o, e) => {
      const t = o.config, n = t.get("pinnedFolders"), a = n.concat(
        e.filter(
          (d) => n.findIndex((l) => l.path === d.path) === -1
        )
      );
      t.set("pinnedFolders", a);
    },
    show: tt(ke({ target: "one", targetType: "dir", feature: "pinned" }), (o, e) => o.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: Ce.unpinFolder,
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
    show: tt(ke({ target: "one", targetType: "dir", feature: "pinned" }), (o, e) => o.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: Ce.preview,
    title: ({ t: o }) => o("Preview"),
    action: (o, e) => o.modal.open(gt, { storage: e[0]?.storage, item: e[0] }),
    show: tt(
      ke({ target: "one", feature: "preview" }),
      (o, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: Ce.download,
    link: (o, e) => {
      if (e[0])
        return o.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: o }) => o("Download"),
    action: () => {
    },
    show: tt(
      ke({ target: "one", feature: "download" }),
      (o, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: Ce.rename,
    title: ({ t: o }) => o("Rename"),
    action: (o, e) => o.modal.open(mt, { items: e }),
    show: ke({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: Ce.move,
    title: ({ t: o }) => o("Move"),
    action: (o, e) => {
      const t = o.fs, n = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      o.modal.open(Je, { items: { from: e, to: n } });
    },
    show: et(
      ke({ target: "one", feature: "move" }),
      ke({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: Ce.copy,
    title: ({ t: o }) => o("Copy"),
    action: (o, e) => {
      e.length > 0 && o.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: et(
      ke({ target: "one", feature: "copy" }),
      ke({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: Ce.paste,
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
        o.modal.open(t.type === "cut" ? Je : Rt, {
          items: { from: Array.from(t.items), to: r }
        });
      }
    },
    show: (o, e) => o.features?.copy ?? !1 ? o.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: Ce.archive,
    title: ({ t: o }) => o("Archive"),
    action: (o, e) => o.modal.open(qt, { items: e }),
    show: et(
      ke({ target: "many", feature: "archive" }),
      tt(
        ke({ target: "one", feature: "archive" }),
        (o, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: Ce.unarchive,
    title: ({ t: o }) => o("Unarchive"),
    action: (o, e) => o.modal.open(Kt, { items: e }),
    show: ke({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: Ce.delete,
    title: ({ t: o }) => o("Delete"),
    action: (o, e) => {
      o.modal.open(ht, { items: e });
    },
    show: et(
      ke({ feature: "delete", target: "one" }),
      ke({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], Rv = ["data-theme"], Nv = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Uv = { class: "vuefinder__external-drop-message" }, jv = { class: "vuefinder__main__content" }, Hv = /* @__PURE__ */ Z({
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
    const t = e, n = o, a = ne(), d = Qe("root"), l = a.config;
    ve(
      () => n.features,
      (p) => {
        const h = fn(p);
        Object.keys(a.features).forEach((f) => {
          delete a.features[f];
        }), Object.assign(a.features, h);
      },
      { deep: !0 }
    );
    const r = a.fs, c = Y(l.state);
    Gr();
    const { isDraggingExternal: _, handleDragEnter: g, handleDragOver: w, handleDragLeave: v, handleDrop: k } = Wr();
    function x(p) {
      r.setPath(p.dirname), l.get("persist") && l.set("path", p.dirname), r.setReadOnly(p.read_only ?? !1), a.modal.close(), r.setFiles(p.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(p.storages);
    }
    a.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, a.adapter.onAfterOpen = (p) => {
      x(p), r.setLoading(!1);
    }, a.emitter.on("vf-upload-complete", (p) => {
      t("upload-complete", p);
    }), a.emitter.on("vf-delete-complete", (p) => {
      t("delete-complete", p);
    }), a.emitter.on("vf-file-dclick", (p) => {
      t("file-dclick", p);
    }), a.emitter.on("vf-folder-dclick", (p) => {
      t("folder-dclick", p);
    }), ve(
      () => n.config?.theme,
      (p) => {
        p && l.set("theme", s(p));
      },
      { immediate: !0 }
    ), me(() => {
      a.root = d.value, ve(
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
    const $ = async (p) => {
      const h = await k(p);
      h.length > 0 && (a.modal.open(Ht), setTimeout(() => {
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
      class: te(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": s(_) }]),
      "data-theme": s(a).theme.current,
      onDragenter: h[2] || (h[2] = //@ts-ignore
      (...f) => s(g) && s(g)(...f)),
      onDragover: h[3] || (h[3] = //@ts-ignore
      (...f) => s(w) && s(w)(...f)),
      onDragleave: h[4] || (h[4] = //@ts-ignore
      (...f) => s(v) && s(v)(...f)),
      onDrop: $
    }, [
      i("div", {
        class: te(s(a).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        i("div", {
          class: te([
            s(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: h[0] || (h[0] = (f) => s(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (f) => s(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          s(_) ? (u(), m("div", Nv, [
            i("div", Uv, y(s(a).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : I("", !0),
          B(gd),
          B(yc),
          B(lu),
          i("div", jv, [
            B(zv),
            B(Yu, {
              "on-file-dclick": n.onFileDclick,
              "on-folder-dclick": n.onFolderDclick
            }, {
              icon: ae((f) => [
                De(p.$slots, "icon", Ge(We(f)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          B(cv, null, {
            actions: ae((f) => [
              De(p.$slots, "status-bar", Ge(We(f)))
            ]),
            _: 3
          })
        ], 34),
        (u(), R(pt, { to: "body" }, [
          B(Hn, { name: "fade" }, {
            default: ae(() => [
              s(a).modal.visible ? (u(), R(rn(s(a).modal.type), { key: 0 })) : I("", !0)
            ]),
            _: 1
          })
        ])),
        B(Ju, { items: s(Ln) }, null, 8, ["items"]),
        B(s(Gn), { position: "bottom-center" })
      ], 2)
    ], 42, Rv));
  }
}), Kv = /* @__PURE__ */ Z({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => Ln },
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
    const e = o, t = e.id ?? ut(Ct);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const n = go(e, ut("VueFinderOptions") || {});
    return to(t, n), Kn(Ct, t), dn(() => {
      no(t);
    }), (a, d) => (u(), R(Hv, Ge(We(e)), {
      icon: ae((l) => [
        De(a.$slots, "icon", Ge(We(l)))
      ]),
      "status-bar": ae((l) => [
        De(a.$slots, "status-bar", Ge(We(l)))
      ]),
      _: 3
    }, 16));
  }
}), df = {
  install(o, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", o.provide("VueFinderOptions", e), o.component("VueFinder", Kv);
  }
};
export {
  rf as ArrayDriver,
  Ce as ContextMenuIds,
  lf as IndexedDBDriver,
  hn as RemoteDriver,
  Kv as VueFinder,
  df as VueFinderPlugin,
  Kv as VueFinderProvider,
  Ln as contextMenuItems,
  df as default
};
