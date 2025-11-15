import { inject as dt, reactive as vt, watch as ue, ref as E, shallowRef as sn, computed as N, markRaw as zn, defineComponent as X, onMounted as _e, nextTick as Ae, createElementBlock as m, openBlock as u, withKeys as at, unref as s, createElementVNode as i, createCommentVNode as I, withModifiers as le, renderSlot as Se, toDisplayString as y, createBlock as z, resolveDynamicComponent as an, withCtx as se, createVNode as O, Fragment as fe, renderList as ge, withDirectives as me, vModelText as rt, onUnmounted as xe, useTemplateRef as We, createTextVNode as ce, resolveComponent as rn, normalizeClass as J, vModelCheckbox as Ft, customRef as Vn, Teleport as ft, normalizeStyle as Ne, isRef as Rn, vModelSelect as $t, onBeforeUnmount as ln, vModelRadio as bt, mergeProps as Ie, toHandlers as He, vShow as Re, normalizeProps as Ke, guardReactiveProps as qe, onUpdated as Nn, mergeModels as Un, useModel as dn, Transition as jn, provide as Hn } from "vue";
import Kn from "mitt";
import { toast as de, Toaster as qn } from "vue-sonner";
import { persistentAtom as Gn } from "@nanostores/persistent";
import { atom as Fe, computed as je } from "nanostores";
import { useStore as W } from "@nanostores/vue";
import { QueryClient as Wn } from "@tanstack/vue-query";
import Yn from "@uppy/core";
import { Cropper as Qn } from "vue-advanced-cropper";
import cn from "vanilla-lazyload";
import { OverlayScrollbars as et, SizeObserverPlugin as Xn } from "overlayscrollbars";
import { computePosition as Ye, offset as tt, flip as nt, shift as ot, autoUpdate as Dt } from "@floating-ui/dom";
import Jn from "@viselect/vanilla";
import Zn from "@uppy/xhr-upload";
const Pt = /* @__PURE__ */ new Map(), xt = Symbol("ServiceContainerId");
function eo(o, e) {
  Pt.set(o, e);
}
function to(o) {
  Pt.delete(o);
}
function Z(o) {
  const e = dt(xt);
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
function no(o) {
  const e = localStorage.getItem(o + "_storage"), t = vt(JSON.parse(e ?? "{}"));
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
function De(o, e = "An error occurred") {
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
async function oo(o, e) {
  const t = e[o];
  return typeof t == "function" ? (await t()).default : t;
}
function so(o, e, t, n) {
  const { getStore: a, setStore: d } = o, l = E({}), r = E(a("locale", e)), c = (w, v = e) => {
    oo(w, n).then((k) => {
      l.value = k, d("locale", w), r.value = w, d("translations", k), Object.values(n).length > 1 && (de.success("The language is set to " + w), t.emit("vf-language-saved"));
    }).catch((k) => {
      if (v)
        de.error("The selected locale is not yet supported!"), c(v, null);
      else {
        const S = De(k, "Locale cannot be loaded!");
        de.error(S);
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
  return vt({ t: g, locale: r });
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
  advanced: io.reduce((o, e) => (o[e] = !0, o), {})
};
function qt() {
  return un.advanced;
}
function vn(o) {
  return o ? o === "simple" || o === "advanced" ? { ...un[o] } : { ...qt(), ...o } : qt();
}
const ao = "4.0.18";
function Et(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1024, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function fn(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1e3, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function ro(o) {
  if (typeof o == "number") return o;
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(o);
  if (!n) return 0;
  const a = parseFloat(n[1] || "0"), d = (n[2] || "").toLowerCase(), l = e[d] ?? 0;
  return Math.round(a * Math.pow(1024, l));
}
function lo(o) {
  const e = sn(null), t = E(!1), n = E(), a = E(!1);
  return { visible: t, type: e, data: n, open: (c, _ = null) => {
    o.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = c, n.value = _;
  }, close: () => {
    o.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null;
  }, setEditMode: (c) => {
    a.value = c;
  }, editMode: a };
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
}, co = new Set(
  Object.keys(ut)
);
function uo(o) {
  return o || "silver";
}
function _n(o) {
  return co.has(o);
}
function Gt(o) {
  const e = {}, t = {}, n = o;
  for (const a in n)
    if (_n(a))
      t[a] = n[a];
    else if (a in ct) {
      const d = a;
      e[d] = n[a];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function Wt(o, e) {
  const t = { ...ct, ...o, ...e };
  return t.theme = uo(t.theme), t;
}
function Yt(o, e) {
  return { ...ut, ...e, ...o };
}
const vo = (o, e = {}) => {
  const t = `vuefinder_config_${o}`, { persistenceConfig: n, nonPersistenceConfig: a } = Gt(e), d = Wt(
    n,
    ct
  ), l = Yt(
    a,
    ut
  ), r = Gn(
    t,
    d,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = Fe(l), _ = je(
    [r, c],
    (p, h) => ({
      ...p,
      ...h
    })
  ), g = (p = {}) => {
    const h = r.get(), f = c.get(), { persistenceConfig: b, nonPersistenceConfig: C } = Gt(p), F = Wt(b, h), A = Yt(
      C,
      f
    );
    r.set(F), c.set(A);
  }, w = (p) => _n(p) ? c.get()[p] : r.get()[p], v = () => ({
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
      r.set({ ...ct }), c.set({ ...ut });
    }
  };
};
function fo(o, e) {
  if (typeof o == "string" && typeof e == "string")
    return o.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(o) || 0, n = Number(e) || 0;
  return t === n ? 0 : t < n ? -1 : 1;
}
const _o = () => {
  const o = Fe(""), e = Fe([]), t = Fe(!1), n = Fe([]), a = Fe({ active: !1, column: "", order: "" }), d = Fe({
    kind: "all",
    showHidden: !1
  }), l = Fe(/* @__PURE__ */ new Set()), r = Fe({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Fe(null), _ = Fe(0), g = Fe(!1), w = Fe([]), v = Fe(-1), k = je([o], (R) => {
    const q = (R ?? "").trim(), Q = q.indexOf("://"), ie = Q >= 0 ? q.slice(0, Q) : "", Be = (Q >= 0 ? q.slice(Q + 3) : q).split("/").filter(Boolean);
    let Ve = "";
    const yt = Be.map((Te) => (Ve = Ve ? `${Ve}/${Te}` : Te, {
      basename: Te,
      name: Te,
      path: ie ? `${ie}://${Ve}` : Ve,
      type: "dir"
    }));
    return { storage: ie, breadcrumb: yt, path: q };
  }), S = je([n, a, d], (R, q, Q) => {
    let ie = R;
    Q.kind === "files" ? ie = ie.filter((Te) => Te.type === "file") : Q.kind === "folders" && (ie = ie.filter((Te) => Te.type === "dir")), Q.showHidden || (ie = ie.filter((Te) => !Te.basename.startsWith(".")));
    const { active: Ue, column: Be, order: Ve } = q;
    if (!Ue || !Be) return ie;
    const yt = Ve === "asc" ? 1 : -1;
    return ie.slice().sort((Te, Ln) => fo(Te[Be], Ln[Be]) * yt);
  }), x = je([n, l], (R, q) => q.size === 0 ? [] : R.filter((Q) => q.has(Q.path))), p = (R, q) => {
    const Q = o.get();
    if ((q ?? !0) && Q !== R) {
      const ie = w.get(), Ue = v.get();
      Ue < ie.length - 1 && ie.splice(Ue + 1), ie.length === 0 && Q && ie.push(Q), ie.push(R), w.set([...ie]), v.set(ie.length - 1);
    }
    o.set(R);
  }, h = (R) => {
    n.set(R ?? []);
  }, f = (R) => {
    e.set(R ?? []);
  }, b = (R, q) => {
    a.set({ active: !0, column: R, order: q });
  }, C = (R) => {
    const q = a.get();
    q.active && q.column === R ? a.set({
      active: q.order === "asc",
      column: R,
      order: "desc"
    }) : a.set({
      active: !0,
      column: R,
      order: "asc"
    });
  }, F = () => {
    a.set({ active: !1, column: "", order: "" });
  }, A = (R, q) => {
    d.set({ kind: R, showHidden: q });
  }, L = () => {
    d.set({ kind: "all", showHidden: !1 });
  }, Y = (R, q = "multiple") => {
    const Q = new Set(l.get());
    q === "single" && Q.clear(), Q.add(R), l.set(Q);
  }, K = (R, q = "multiple") => {
    const Q = new Set(l.get());
    q === "single" && Q.clear(), R.forEach((ie) => Q.add(ie)), l.set(Q);
  }, ne = (R) => {
    const q = new Set(l.get());
    q.delete(R), l.set(q);
  }, V = (R) => l.get().has(R), ee = (R, q = "multiple") => {
    const Q = new Set(l.get());
    Q.has(R) ? Q.delete(R) : (q === "single" && Q.clear(), Q.add(R)), l.set(Q);
  }, T = (R = "multiple", q) => {
    if (R === "single") {
      const Q = n.get()[0];
      if (Q) {
        const ie = Q.path;
        l.set(/* @__PURE__ */ new Set([ie])), _.set(1);
      }
    } else {
      if (q?.selectionFilterType || q?.selectionFilterMimeIncludes && q.selectionFilterMimeIncludes.length > 0) {
        const Q = n.get().filter((ie) => {
          const Ue = q.selectionFilterType, Be = q.selectionFilterMimeIncludes;
          return Ue === "files" && ie.type === "dir" || Ue === "dirs" && ie.type === "file" ? !1 : Be && Array.isArray(Be) && Be.length > 0 && ie.type !== "dir" ? ie.mime_type ? Be.some((Ve) => ie.mime_type?.startsWith(Ve)) : !1 : !0;
        }).map((ie) => ie.path);
        l.set(new Set(Q));
      } else {
        const Q = new Set(n.get().map((ie) => ie.path));
        l.set(Q);
      }
      B(l.get().size);
    }
  }, te = () => {
    l.set(/* @__PURE__ */ new Set()), _.set(0);
  }, H = (R) => {
    const q = new Set(R ?? []);
    l.set(q), _.set(q.size);
  }, B = (R) => {
    _.set(R);
  }, M = (R) => {
    g.set(!!R);
  }, D = () => g.get(), $ = (R, q) => {
    const Q = n.get().filter((ie) => q.has(ie.path));
    r.set({
      type: R,
      path: k.get().path,
      items: new Set(Q)
    });
  }, P = (R) => je([r], (q) => q.type === "cut" && Array.from(q.items).some((Q) => Q.path === R)), G = (R) => je([r], (q) => q.type === "copy" && Array.from(q.items).some((Q) => Q.path === R)), U = (R) => {
    const q = P(R);
    return W(q).value ?? !1;
  }, oe = (R) => {
    const q = G(R);
    return W(q).value ?? !1;
  }, re = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, we = () => r.get(), ye = (R) => {
    c.set(R);
  }, ze = () => c.get(), ve = () => {
    c.set(null);
  }, pe = () => {
    const R = w.get(), q = v.get();
    if (q > 0) {
      const Q = q - 1, ie = R[Q];
      ie && (v.set(Q), p(ie, !1));
    }
  }, j = () => {
    const R = w.get(), q = v.get();
    if (q < R.length - 1) {
      const Q = q + 1, ie = R[Q];
      ie && (v.set(Q), p(ie, !1));
    }
  }, ae = je([v], (R) => R > 0), he = je(
    [w, v],
    (R, q) => q < R.length - 1
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
    sortedFiles: S,
    selectedItems: x,
    // Actions
    setPath: p,
    setFiles: h,
    setStorages: f,
    setSort: b,
    toggleSort: C,
    clearSort: F,
    setFilter: A,
    clearFilter: L,
    select: Y,
    selectMultiple: K,
    deselect: ne,
    toggleSelect: ee,
    selectAll: T,
    isSelected: V,
    clearSelection: te,
    setSelection: H,
    setSelectedCount: B,
    setLoading: M,
    isLoading: D,
    setClipboard: $,
    createIsCut: P,
    createIsCopied: G,
    isCut: U,
    isCopied: oe,
    clearClipboard: re,
    getClipboard: we,
    setDraggedItem: ye,
    getDraggedItem: ze,
    clearDraggedItem: ve,
    setReadOnly: (R) => {
      t.set(R);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (R) => t.get() ? !0 : R.read_only ?? !1,
    // Navigation
    goBack: pe,
    goForward: j,
    canGoBack: ae,
    canGoForward: he,
    navigationHistory: w,
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
class rf extends Tt {
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
          const k = v.path.slice(g.length), S = k.includes("/") ? k.slice(0, k.lastIndexOf("/")) : "", x = S ? this.join(_.path, S) : _.path;
          if (v.type === "dir")
            d(v, x);
          else {
            const p = this.uniqueName(x, v.basename, n), h = this.makeFileEntry(
              x,
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
            const S = g + v.slice(c.length);
            this.contentStore.set(S, k);
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
function Qt(o, e, t) {
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
      const l = await a.text(), r = Qt(l, a.status, a.statusText);
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
      const l = await a.text(), r = Qt(l, a.status, a.statusText);
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
class lf extends Tt {
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
          const k = (await this.getDB()).transaction(["content"], "readwrite"), S = k.objectStore("content"), x = S.get(c.path);
          x.onsuccess = () => {
            const p = x.result;
            p && (S.delete(c.path), S.put({ path: _, content: p.content }));
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
          const k = v.path.slice(g.length), S = k.includes("/") ? k.slice(0, k.lastIndexOf("/")) : "", x = S ? this.join(_.path, S) : _.path;
          if (v.type === "dir")
            await d(v, x);
          else {
            const p = await this.uniqueName(x, v.basename, a), h = this.makeFileEntry(
              x,
              p,
              v.file_size || 0,
              v.mime_type
            );
            a.add(h.path), await this.upsert(h);
            const b = (await this.getDB()).transaction(["content"], "readwrite"), C = b.objectStore("content"), F = C.get(v.path);
            F.onsuccess = () => {
              const A = F.result;
              A && C.put({ path: h.path, content: A.content });
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
          const S = k.result;
          S && v.put({ path: _.path, content: S.content });
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
          (v) => v.storage === this.storage && (v.path === c || v.path.startsWith(c + "/"))
        );
        for (const v of w) {
          const k = g + v.path.slice(c.length), S = this.parent(k), x = this.cloneEntry(v, {
            path: k,
            dir: S,
            basename: v.path === c ? _ : v.basename,
            last_modified: Date.now()
          });
          await this.upsert(x);
          const h = (await this.getDB()).transaction(["content"], "readwrite"), f = h.objectStore("content"), b = f.get(v.path);
          b.onsuccess = () => {
            const C = b.result;
            C && (f.delete(v.path), f.put({ path: k, content: C.content }));
          }, await new Promise((C) => {
            h.oncomplete = () => C(void 0);
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
        const v = (await this.getDB()).transaction(["content"], "readwrite"), k = v.objectStore("content"), S = k.get(l.path);
        S.onsuccess = () => {
          const x = S.result;
          x && (k.delete(l.path), k.put({ path: _, content: x.content }));
        }, await new Promise((x) => {
          v.oncomplete = () => x(void 0);
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
            for (let S = 0; S < w.length; S++) v += String.fromCharCode(w[S]);
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
          v.objectStore("content").put({ path: _.path, content: g }), await new Promise((S) => {
            v.oncomplete = () => S(void 0);
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
const Xt = {
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
class po {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new Wn({
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
    const t = Xt.list(e);
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
    const t = Xt.search(e.path, e.filter, e.deep, e.size);
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
function ho(o) {
  const e = W(o.state);
  return {
    current: N(() => e.value.theme || "silver"),
    set: (a) => {
      o.set("theme", a);
    }
  };
}
const mo = (o, e) => {
  const t = no(o.id ?? "vf"), n = Kn(), a = e.i18n, d = o.locale ?? e.locale, l = vo(o.id ?? "vf", o.config ?? {}), r = _o();
  if (!o.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new po(o.driver);
  return vt({
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
    debug: o.debug ?? !1,
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
    modal: lo(l),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: zn(c),
    // active features
    features: vn(o.features),
    // selection mode
    selectionMode: o.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: N(() => o.selectionFilterType || "both"),
    selectionFilterMimeIncludes: N(() => o.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: l.get("metricUnits") ? fn : Et,
    // possible items of the context menu
    contextMenuItems: o.contextMenuItems,
    // expose custom uploader if provided
    customUploader: o.customUploader
  });
}, go = ["data-theme"], wo = { class: "vuefinder__modal-layout__container" }, yo = { class: "vuefinder__modal-layout__content" }, bo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, ko = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, $o = { class: "vuefinder__modal-drag-message" }, Pe = /* @__PURE__ */ X({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(o) {
    const e = E(null), t = Z();
    t.config;
    const n = o;
    _e(() => {
      const d = document.querySelector(".v-f-modal input");
      d && d.focus(), Ae(() => {
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
      onKeyup: l[1] || (l[1] = at((r) => s(t).modal.close(), ["esc"]))
    }, [
      l[2] || (l[2] = i("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      i("div", wo, [
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
            i("div", yo, [
              Se(d.$slots, "default")
            ]),
            d.$slots.buttons ? (u(), m("div", bo, [
              Se(d.$slots, "buttons")
            ])) : I("", !0)
          ], 512)
        ], 32)
      ]),
      n.showDragOverlay ? (u(), m("div", ko, [
        i("div", $o, y(n.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : I("", !0)
    ], 40, go));
  }
}), xo = { class: "vuefinder__modal-header" }, So = { class: "vuefinder__modal-header__icon-container" }, Co = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Me = /* @__PURE__ */ X({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(o) {
    return (e, t) => (u(), m("div", xo, [
      i("div", So, [
        (u(), z(an(o.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      i("div", Co, y(o.title), 1)
    ]));
  }
}), Fo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Do(o, e) {
  return u(), m("svg", Fo, [...e[0] || (e[0] = [
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
const hn = { render: Do }, Po = { class: "vuefinder__about-modal__content" }, Eo = { class: "vuefinder__about-modal__main" }, To = { class: "vuefinder__about-modal__tab-content" }, Mo = { class: "vuefinder__about-modal__lead" }, Io = { class: "vuefinder__about-modal__description" }, Ao = { class: "vuefinder__about-modal__links" }, Oo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Bo = { class: "vuefinder__about-modal__meta" }, Lo = { class: "vuefinder__about-modal__meta-item" }, zo = { class: "vuefinder__about-modal__meta-label" }, Vo = { class: "vuefinder__about-modal__meta-value" }, Ro = { class: "vuefinder__about-modal__meta-item" }, No = { class: "vuefinder__about-modal__meta-label" }, mn = /* @__PURE__ */ X({
  __name: "ModalAbout",
  setup(o) {
    const e = Z(), { t } = e.i18n;
    return (n, a) => (u(), z(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: a[0] || (a[0] = (d) => s(e).modal.close())
        }, y(s(t)("Close")), 1)
      ]),
      default: se(() => [
        i("div", Po, [
          O(Me, {
            icon: s(hn),
            title: "Vuefinder " + s(e).version
          }, null, 8, ["icon", "title"]),
          i("div", Eo, [
            i("div", To, [
              i("div", Mo, y(s(t)("A modern, customizable file manager component built for Vue.")), 1),
              i("div", Io, y(s(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              i("div", Ao, [
                i("a", Oo, y(s(t)("Project Home")), 1),
                a[1] || (a[1] = i("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              i("div", Bo, [
                i("div", Lo, [
                  i("span", zo, y(s(t)("Version")), 1),
                  i("span", Vo, y(s(e).version), 1)
                ]),
                i("div", Ro, [
                  i("span", No, y(s(t)("License")), 1),
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
}), Uo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function jo(o, e) {
  return u(), m("svg", Uo, [...e[0] || (e[0] = [
    i("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const gn = { render: jo }, Ho = { class: "vuefinder__delete-modal__content" }, Ko = { class: "vuefinder__delete-modal__form" }, qo = { class: "vuefinder__delete-modal__description" }, Go = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Wo = {
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
}, Qo = { class: "vuefinder__delete-modal__file-name" }, Xo = { class: "vuefinder__delete-modal__warning" }, _t = /* @__PURE__ */ X({
  __name: "ModalDelete",
  setup(o) {
    const e = Z(), { t } = e.i18n, n = e.fs, a = W(n.path), d = E(e.modal.data.items), l = () => {
      d.value.length && e.adapter.delete({
        path: a.value.path,
        items: d.value.map(({ path: r, type: c }) => ({
          path: r,
          type: c
        }))
      }).then((r) => {
        de.success(t("Files deleted.")), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(De(r, t("Failed to delete files")));
      });
    };
    return (r, c) => (u(), z(Pe, null, {
      buttons: se(() => [
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
        i("div", Xo, y(s(t)("This action cannot be undone.")), 1)
      ]),
      default: se(() => [
        i("div", null, [
          O(Me, {
            icon: s(gn),
            title: s(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          i("div", Ho, [
            i("div", Ko, [
              i("p", qo, y(s(t)("Are you sure you want to delete these files?")), 1),
              i("div", Go, [
                (u(!0), m(fe, null, ge(d.value, (_) => (u(), m("p", {
                  key: _.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  _.type === "dir" ? (u(), m("svg", Wo, [...c[1] || (c[1] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), m("svg", Yo, [...c[2] || (c[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Qo, y(_.basename), 1)
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
function Zo(o, e) {
  return u(), m("svg", Jo, [...e[0] || (e[0] = [
    i("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
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
}, is = { class: "vuefinder__rename-modal__item-name" }, pt = /* @__PURE__ */ X({
  __name: "ModalRename",
  setup(o) {
    const e = Z(), { t } = e.i18n, n = e.fs, a = W(n.path), d = E(e.modal.data.items[0]), l = E(d.value.basename), r = () => {
      l.value != d.value.basename && e.adapter.rename({
        path: a.value.path,
        item: d.value.path,
        name: l.value
      }).then((c) => {
        de.success(t("%s is renamed.", l.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(De(c, t("Failed to rename")));
      });
    };
    return (c, _) => (u(), z(Pe, null, {
      buttons: se(() => [
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
      default: se(() => [
        i("div", null, [
          O(Me, {
            icon: s(wn),
            title: s(t)("Rename")
          }, null, 8, ["icon", "title"]),
          i("div", es, [
            i("div", ts, [
              i("p", ns, [
                d.value.type === "dir" ? (u(), m("svg", os, [..._[2] || (_[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), m("svg", ss, [..._[3] || (_[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", is, y(d.value.basename), 1)
              ]),
              me(i("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (g) => l.value = g),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: at(r, ["enter"])
              }, null, 544), [
                [rt, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Oe() {
  const o = Z(), e = N(() => o.features);
  return {
    enabled: (n) => e.value[n] ?? !1
  };
}
const as = { class: "vuefinder__text-preview" }, rs = { class: "vuefinder__text-preview__header" }, ls = ["title"], ds = { class: "vuefinder__text-preview__actions" }, cs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, us = { key: 1 }, vs = /* @__PURE__ */ X({
  __name: "Text",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = E(""), a = E(""), d = E(null), l = E(!1), r = Z(), { enabled: c } = Oe(), { t: _ } = r.i18n;
    _e(async () => {
      try {
        const v = await r.adapter.getContent({ path: r.modal.data.item.path });
        n.value = v.content, t("success");
      } catch (v) {
        De(v, "Failed to load text content"), t("success");
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
        de.error(De(v, _("Failed to save file")));
      }
    };
    return (v, k) => (u(), m("div", as, [
      i("div", rs, [
        i("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: s(r).modal.data.item.path
        }, y(s(r).modal.data.item.basename), 9, ls),
        i("div", ds, [
          l.value ? (u(), m("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: w
          }, y(s(_)("Save")), 1)) : I("", !0),
          s(c)("edit") ? (u(), m("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: k[0] || (k[0] = (S) => g())
          }, y(l.value ? s(_)("Cancel") : s(_)("Edit")), 1)) : I("", !0)
        ])
      ]),
      i("div", null, [
        l.value ? (u(), m("div", us, [
          me(i("textarea", {
            ref_key: "editInput",
            ref: d,
            "onUpdate:modelValue": k[1] || (k[1] = (S) => a.value = S),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [rt, a.value]
          ])
        ])) : (u(), m("pre", cs, y(n.value), 1))
      ])
    ]));
  }
}), Mt = async (o, e) => {
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
        await Mt(o, a);
    }
  }
}, ke = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function yn(o) {
  const e = Z(), { t } = e.i18n, n = e.fs, a = W(n.path), d = e.config, l = E({ QUEUE_ENTRY_STATUS: ke }), r = E(null), c = E(null), _ = E(null), g = E(null), w = E(null), v = E([]), k = E(""), S = E(!1), x = E(!1), p = E(null);
  let h;
  const f = (M) => {
    M.preventDefault(), M.stopPropagation(), x.value = !0;
  }, b = (M) => {
    M.preventDefault(), M.stopPropagation(), x.value = !0;
  }, C = (M) => {
    M.preventDefault(), M.stopPropagation(), (!M.relatedTarget || M.relatedTarget === document.body) && (x.value = !1);
  }, F = (M) => {
    M.preventDefault(), M.stopPropagation(), x.value = !1;
    const D = /^[/\\](.+)/, $ = M.dataTransfer;
    $ && ($.items && $.items.length ? Array.from($.items).forEach((P) => {
      if (P.kind === "file") {
        const G = P.webkitGetAsEntry?.();
        if (G)
          Mt((U, oe) => {
            const re = D.exec(U?.fullPath || "");
            L(oe, re ? re[1] : oe.name);
          }, G);
        else {
          const U = P.getAsFile?.();
          U && L(U);
        }
      }
    }) : $.files && $.files.length && Array.from($.files).forEach((P) => L(P)));
  }, A = (M) => v.value.findIndex((D) => D.id === M), L = (M, D) => h.addFile({ name: D || M.name, type: M.type, data: M, source: "Local" }), Y = (M) => M.status === ke.DONE ? "text-green-600" : M.status === ke.ERROR || M.status === ke.CANCELED ? "text-red-600" : "", K = (M) => M.status === ke.DONE ? "✓" : M.status === ke.ERROR || M.status === ke.CANCELED ? "!" : "...", ne = () => g.value?.click(), V = () => e.modal.close(), ee = (M) => {
    if (S.value || !v.value.filter((D) => D.status !== ke.DONE).length) {
      S.value || (k.value = t("Please select file to upload first."));
      return;
    }
    k.value = "", p.value = M || a.value, h.upload();
  }, T = () => {
    h.cancelAll(), v.value.forEach((M) => {
      M.status !== ke.DONE && (M.status = ke.CANCELED, M.statusName = t("Canceled"));
    }), S.value = !1;
  }, te = (M) => {
    S.value || (h.removeFile(M.id), v.value.splice(A(M.id), 1));
  }, H = (M) => {
    if (!S.value)
      if (h.cancelAll(), M) {
        const D = v.value.filter(($) => $.status !== ke.DONE);
        v.value = [], D.forEach(($) => L($.originalFile, $.name));
      } else
        v.value = [];
  }, B = (M) => {
    M.forEach((D) => {
      L(D);
    });
  };
  return _e(() => {
    h = new Yn({
      debug: e.debug,
      restrictions: { maxFileSize: ro(d.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (P, G) => {
        if (G[P.id] != null) {
          const oe = A(P.id);
          v.value[oe]?.status === ke.PENDING && (k.value = h.i18n("noDuplicates", { fileName: P.name })), v.value = v.value.filter((re) => re.id !== P.id);
        }
        return v.value.push({
          id: P.id,
          name: P.name,
          size: e.filesize(P.size),
          status: ke.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: P.data
        }), !0;
      }
    });
    const M = {
      getTargetPath: () => (p.value || a.value).path
    };
    if (o)
      o(h, M);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(h, M);
    else
      throw new Error("No uploader configured");
    h.on("restriction-failed", (P, G) => {
      const U = v.value[A(P.id)];
      U && te(U), k.value = G.message;
    }), h.on("upload-progress", (P, G) => {
      const U = G.bytesTotal ?? 1, oe = Math.floor(G.bytesUploaded / U * 100), re = A(P.id);
      re !== -1 && v.value[re] && (v.value[re].percent = `${oe}%`);
    }), h.on("upload-success", (P) => {
      const G = v.value[A(P.id)];
      G && (G.status = ke.DONE, G.statusName = t("Done"));
    }), h.on("upload-error", (P, G) => {
      const U = v.value[A(P.id)];
      U && (U.percent = null, U.status = ke.ERROR, U.statusName = G?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : G?.message || t("Unknown Error"));
    }), h.on("error", (P) => {
      k.value = P.message, S.value = !1, e.adapter.open(a.value.path);
    }), h.on("complete", () => {
      S.value = !1;
      const P = p.value || a.value;
      e.adapter.invalidateListQuery(P.path), e.adapter.open(P.path);
      const G = v.value.filter((U) => U.status === ke.DONE).map((U) => U.name);
      e.emitter.emit("vf-upload-complete", G);
    }), g.value?.addEventListener("click", () => c.value?.click()), w.value?.addEventListener("click", () => _.value?.click());
    const D = { capture: !0 };
    document.addEventListener("dragover", f, D), document.addEventListener("dragenter", b, D), document.addEventListener("dragleave", C, D), document.addEventListener("drop", F, D);
    const $ = (P) => {
      const G = P.target, U = G.files;
      if (U) {
        for (const oe of U) L(oe);
        G.value = "";
      }
    };
    c.value?.addEventListener("change", $), _.value?.addEventListener("change", $);
  }), xe(() => {
    const M = { capture: !0 };
    document.removeEventListener("dragover", f, M), document.removeEventListener("dragenter", b, M), document.removeEventListener("dragleave", C, M), document.removeEventListener("drop", F, M);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: _,
    pickFiles: g,
    pickFolders: w,
    queue: v,
    message: k,
    uploading: S,
    hasFilesInDropArea: x,
    definitions: l,
    openFileSelector: ne,
    upload: ee,
    cancel: T,
    remove: te,
    clear: H,
    close: V,
    getClassNameForEntry: Y,
    getIconForEntry: K,
    addExternalFiles: B
  };
}
const fs = { class: "vuefinder__image-preview" }, _s = { class: "vuefinder__image-preview__header" }, ps = ["title"], hs = { class: "vuefinder__image-preview__actions" }, ms = { class: "vuefinder__image-preview__image-container" }, gs = ["src"], ws = /* @__PURE__ */ X({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = Z(), { enabled: a } = Oe(), { t: d } = n.i18n, l = E(!1), r = E(
      n.modal.data.item.previewUrl ?? n.adapter.getPreviewUrl({ path: n.modal.data.item.path })
    ), c = E(r.value), { addExternalFiles: _, upload: g, queue: w } = yn(n.customUploader), v = n.fs, k = W(v.path), S = We("cropperRef"), x = async () => {
      l.value = !l.value, n.modal.setEditMode(l.value);
    }, p = async () => {
      const f = S.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!f) return;
      let b = f;
      if (f.width > 1200 || f.height > 1200) {
        const Y = Math.min(1200 / f.width, 1200 / f.height), K = document.createElement("canvas");
        K.width = Math.floor(f.width * Y), K.height = Math.floor(f.height * Y);
        const ne = K.getContext("2d");
        ne && (ne.drawImage(f, 0, 0, K.width, K.height), b = K);
      }
      const C = n.modal.data.item.basename, F = C.split(".").pop()?.toLowerCase() || "jpg", A = F === "png" ? "image/png" : F === "gif" ? "image/gif" : "image/jpeg", L = await new Promise((Y) => {
        b.toBlob((K) => Y(K), A);
      });
      if (!L) {
        de.error(d("Failed to save image"));
        return;
      }
      try {
        const Y = new File([L], C, { type: A }), ne = n.modal.data.item.path.split("/");
        ne.pop();
        const ee = {
          path: ne.join("/") || (k.value?.path ?? "")
        };
        _([Y]), await new Promise((B) => setTimeout(B, 100));
        const T = w.value.find((B) => B.name === Y.name);
        if (!T)
          throw new Error("File was not added to upload queue");
        g(ee);
        let te = 0;
        for (; te < 150; ) {
          await new Promise((M) => setTimeout(M, 200));
          const B = w.value.find((M) => M.id === T.id);
          if (B?.status === ke.DONE) break;
          if (B?.status === ke.ERROR)
            throw new Error(B.statusName || "Upload failed");
          te++;
        }
        de.success(d("Updated.")), await fetch(r.value, { cache: "reload", mode: "no-cors" });
        const H = n.root?.querySelector?.('[data-src="' + r.value + '"]');
        H && H instanceof HTMLElement && cn.resetStatus(H), n.emitter.emit("vf-refresh-thumbnails"), await x(), t("success");
      } catch (Y) {
        de.error(De(Y, d("Failed to save image")));
      }
    };
    return _e(() => {
      t("success");
    }), (h, f) => (u(), m("div", fs, [
      i("div", _s, [
        i("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: s(n).modal.data.item.path
        }, y(s(n).modal.data.item.basename), 9, ps),
        i("div", hs, [
          l.value ? (u(), m("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: p
          }, y(s(d)("Crop")), 1)) : I("", !0),
          s(a)("edit") ? (u(), m("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: f[0] || (f[0] = (b) => x())
          }, y(l.value ? s(d)("Cancel") : s(d)("Edit")), 1)) : I("", !0)
        ])
      ]),
      i("div", ms, [
        l.value ? (u(), z(s(Qn), {
          key: 1,
          ref_key: "cropperRef",
          ref: S,
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
function bs(o, e) {
  return u(), m("svg", ys, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const st = { render: bs }, ks = { class: "vuefinder__default-preview" }, $s = { class: "vuefinder__default-preview__content" }, xs = { class: "vuefinder__default-preview__header" }, Ss = ["title"], Cs = { class: "vuefinder__default-preview__icon-container" }, Fs = ["title"], Ds = /* @__PURE__ */ X({
  __name: "Default",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = Z(), n = e;
    return _e(() => {
      n("success");
    }), (a, d) => (u(), m("div", ks, [
      i("div", $s, [
        i("div", xs, [
          i("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Ss)
        ]),
        i("div", Cs, [
          O(s(st), { class: "vuefinder__default-preview__file-icon" }),
          i("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Fs)
        ])
      ])
    ]));
  }
}), Ps = { class: "vuefinder__video-preview" }, Es = ["title"], Ts = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Ms = ["src"], Is = /* @__PURE__ */ X({
  __name: "Video",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = Z(), n = e, a = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return _e(() => {
      n("success");
    }), (d, l) => (u(), m("div", Ps, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Es),
      i("div", null, [
        i("video", Ts, [
          i("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Ms),
          l[0] || (l[0] = ce(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), As = { class: "vuefinder__audio-preview" }, Os = ["title"], Bs = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Ls = ["src"], zs = /* @__PURE__ */ X({
  __name: "Audio",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = Z(), a = () => {
      const d = Z();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return _e(() => {
      t("success");
    }), (d, l) => (u(), m("div", As, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: s(n).modal.data.item.path
      }, y(s(n).modal.data.item.basename), 9, Os),
      i("div", null, [
        i("audio", Bs, [
          i("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Ls),
          l[0] || (l[0] = ce(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Vs = { class: "vuefinder__pdf-preview" }, Rs = ["title"], Ns = ["data"], Us = ["src"], js = /* @__PURE__ */ X({
  __name: "Pdf",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = Z(), n = e, a = () => {
      const d = Z();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return _e(() => {
      n("success");
    }), (d, l) => (u(), m("div", Vs, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Rs),
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
          }, " Your browser does not support PDFs ", 8, Us)
        ], 8, Ns)
      ])
    ]));
  }
});
function Hs(o, e = null) {
  return new Date(o * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Ks = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, qs = ["disabled", "title"], Gs = ["disabled", "title"], Ws = { class: "vuefinder__preview-modal__content" }, Ys = { key: 0 }, Qs = { class: "vuefinder__preview-modal__loading" }, Xs = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Js = { class: "vuefinder__preview-modal__details" }, Zs = { class: "font-bold" }, ei = { class: "pl-2 font-bold" }, ti = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, ni = ["download", "href"], ht = /* @__PURE__ */ X({
  __name: "ModalPreview",
  setup(o) {
    const e = Z(), { enabled: t } = Oe(), { t: n } = e.i18n, a = E(!1), d = (f) => {
      const b = (f || "").split("/").pop() || "", C = b.lastIndexOf(".");
      return C >= 0 ? b.slice(C + 1).toLowerCase() : "";
    }, l = (f, b) => {
      if (!b) return !1;
      const C = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), F = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), A = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), L = /* @__PURE__ */ new Set([
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
      return f === "image" ? C.has(b) : f === "video" ? F.has(b) : f === "audio" ? A.has(b) : f === "text" ? L.has(b) : f === "application/pdf" ? b === "pdf" : !1;
    }, r = (f) => {
      const b = e.modal.data.item.mime_type;
      if (b && typeof b == "string") return b.startsWith(f);
      const C = d(e.modal.data.item.path);
      return l(f, C);
    }, c = t("preview");
    c || (a.value = !0);
    const _ = N(() => e.modal.data.item), g = W(e.fs.sortedFiles), w = N(() => g.value.filter((f) => f.type === "file")), v = N(
      () => w.value.findIndex((f) => f.path === _.value.path)
    ), k = N(() => v.value > 0), S = N(() => v.value < w.value.length - 1), x = () => {
      if (e.modal.editMode || !k.value) return;
      const f = w.value[v.value - 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, p = () => {
      if (e.modal.editMode || !S.value) return;
      const f = w.value[v.value + 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, h = (f) => {
      if (f.key === "Escape") {
        f.preventDefault(), f.stopPropagation(), e.modal.close();
        return;
      }
      (f.key === "ArrowLeft" || f.key === "ArrowRight") && (f.preventDefault(), f.stopPropagation(), f.key === "ArrowLeft" ? x() : p());
    };
    return _e(() => {
      const f = document.querySelector(".vuefinder__preview-modal");
      f && f.focus();
    }), (f, b) => (u(), z(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[6] || (b[6] = (C) => s(e).modal.close())
        }, y(s(n)("Close")), 1),
        s(t)("download") ? (u(), m("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path }),
          href: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path })
        }, y(s(n)("Download")), 9, ni)) : I("", !0)
      ]),
      default: se(() => [
        i("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: h
        }, [
          s(e).modal.editMode ? I("", !0) : (u(), m("div", Ks, [
            i("button", {
              disabled: !k.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: s(n)("Previous file"),
              onClick: x
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
            ])], 8, qs),
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
            ])], 8, Gs)
          ])),
          i("div", Ws, [
            s(c) ? (u(), m("div", Ys, [
              r("text") ? (u(), z(vs, {
                key: `text-${_.value.path}`,
                onSuccess: b[0] || (b[0] = (C) => a.value = !0)
              })) : r("image") ? (u(), z(ws, {
                key: `image-${_.value.path}`,
                onSuccess: b[1] || (b[1] = (C) => a.value = !0)
              })) : r("video") ? (u(), z(Is, {
                key: `video-${_.value.path}`,
                onSuccess: b[2] || (b[2] = (C) => a.value = !0)
              })) : r("audio") ? (u(), z(zs, {
                key: `audio-${_.value.path}`,
                onSuccess: b[3] || (b[3] = (C) => a.value = !0)
              })) : r("application/pdf") ? (u(), z(js, {
                key: `pdf-${_.value.path}`,
                onSuccess: b[4] || (b[4] = (C) => a.value = !0)
              })) : (u(), z(Ds, {
                key: `default-${_.value.path}`,
                onSuccess: b[5] || (b[5] = (C) => a.value = !0)
              }))
            ])) : I("", !0),
            i("div", Qs, [
              a.value === !1 ? (u(), m("div", Xs, [
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
        i("div", Js, [
          i("div", null, [
            i("span", Zs, y(s(n)("File Size")) + ": ", 1),
            ce(y(s(e).filesize(s(e).modal.data.item.file_size)), 1)
          ]),
          i("div", null, [
            i("span", ei, y(s(n)("Last Modified")) + ": ", 1),
            ce(" " + y(s(Hs)(s(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        s(t)("download") ? (u(), m("div", ti, [
          i("span", null, y(s(n)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : I("", !0)
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
function si(o, e) {
  return u(), m("svg", oi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const ii = { render: si }, ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ri(o, e) {
  return u(), m("svg", ai, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const It = { render: ri }, li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function di(o, e) {
  return u(), m("svg", li, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Le = { render: di }, ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ui(o, e) {
  return u(), m("svg", ci, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const mt = { render: ui }, vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function fi(o, e) {
  return u(), m("svg", vi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const gt = { render: fi }, _i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function pi(o, e) {
  return u(), m("svg", _i, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const At = { render: pi }, hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function mi(o, e) {
  return u(), m("svg", hi, [...e[0] || (e[0] = [
    i("path", {
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
function wi(o, e) {
  return u(), m("svg", gi, [...e[0] || (e[0] = [
    i("path", {
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
}, Ci = 300, Fi = /* @__PURE__ */ X({
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
    const t = Z(), { t: n } = t.i18n, a = t.fs, d = E({}), l = o, r = e;
    W(a.path);
    const c = N(() => {
      const L = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[L] || !1;
    }), _ = N(() => l.modelValue?.path === l.folder.path), g = N(() => l.currentPath?.path === l.folder.path), w = N(() => l.modalTreeData[l.folder.path] || []), v = N(() => {
      const L = w.value, Y = d.value[l.folder.path] || 50;
      return L.length > Y ? L.slice(0, Y) : L;
    }), k = N(() => w.value.length), S = N(() => d.value[l.folder.path] || 50), x = N(() => k.value > S.value), p = () => {
      d.value[l.folder.path] = (S.value || 50) + 50;
    }, h = N(() => w.value.length > 0 || l.folder.type === "dir"), f = () => {
      r("toggleFolder", l.storage, l.folder.path);
    }, b = () => {
      r("update:modelValue", l.folder);
    }, C = () => {
      r("update:modelValue", l.folder), r("selectAndClose", l.folder);
    };
    let F = 0;
    const A = () => {
      const L = Date.now();
      L - F < Ci ? C() : b(), F = L;
    };
    return (L, Y) => {
      const K = rn("ModalTreeFolderItem", !0);
      return u(), m("div", yi, [
        i("div", bi, [
          h.value ? (u(), m("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: f
          }, [
            c.value ? (u(), z(s(gt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), z(s(mt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), m("div", ki)),
          i("div", {
            class: J(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": _.value,
              "vuefinder__modal-tree__folder-link--current": g.value
            }]),
            onClick: b,
            onDblclick: C,
            onTouchend: A
          }, [
            c.value ? (u(), z(s(Bt), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), z(s(Le), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            i("span", $i, y(o.folder.basename), 1)
          ], 34)
        ]),
        c.value && h.value ? (u(), m("div", xi, [
          (u(!0), m(fe, null, ge(v.value, (ne) => (u(), z(K, {
            key: ne.path,
            folder: ne,
            storage: o.storage,
            "model-value": o.modelValue,
            "expanded-folders": o.expandedFolders,
            "modal-tree-data": o.modalTreeData,
            "current-path": o.currentPath,
            "onUpdate:modelValue": Y[0] || (Y[0] = (V) => L.$emit("update:modelValue", V)),
            onSelectAndClose: Y[1] || (Y[1] = (V) => L.$emit("selectAndClose", V)),
            onToggleFolder: Y[2] || (Y[2] = (V, ee) => L.$emit("toggleFolder", V, ee))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          x.value ? (u(), m("div", Si, [
            i("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: p
            }, y(s(n)("load more")), 1)
          ])) : I("", !0)
        ])) : I("", !0)
      ]);
    };
  }
}), Di = { class: "vuefinder__modal-tree" }, Pi = { class: "vuefinder__modal-tree__header" }, Ei = { class: "vuefinder__modal-tree__title" }, Ti = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Mi = { class: "vuefinder__modal-tree__section-title" }, Ii = { class: "vuefinder__modal-tree__list" }, Ai = ["onClick", "onDblclick", "onTouchend"], Oi = { class: "vuefinder__modal-tree__text" }, Bi = { class: "vuefinder__modal-tree__text-storage" }, Li = { class: "vuefinder__modal-tree__section-title" }, zi = { class: "vuefinder__modal-tree__list" }, Vi = { class: "vuefinder__modal-tree__storage-item" }, Ri = { class: "vuefinder__modal-tree__storage-content" }, Ni = ["onClick"], Ui = ["onClick", "onDblclick", "onTouchend"], ji = { class: "vuefinder__modal-tree__storage-text" }, Hi = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Ki = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, qi = ["onClick"], Jt = 300, Lt = /* @__PURE__ */ X({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(o, { emit: e }) {
    const t = Z(), { t: n } = t.i18n, a = t.fs, d = t.config, l = e, r = W(a.sortedFiles), c = W(a.storages), _ = N(() => c.value || []), g = W(a.path), w = E(null), v = E({}), k = E({}), S = E({});
    ue(r, (T) => {
      const te = T.filter((B) => B.type === "dir"), H = g.value?.path || "";
      H && (k.value[H] = te.map((B) => ({
        ...B,
        type: "dir"
      })));
    });
    const x = (T, te) => {
      const H = `${T}:${te}`;
      v.value = {
        ...v.value,
        [H]: !v.value[H]
      }, v.value[H] && !k.value[te] && t.adapter.list(te).then((B) => {
        const D = (B.files || []).filter(($) => $.type === "dir");
        k.value[te] = D.map(($) => ({
          ...$,
          type: "dir"
        }));
      });
    }, p = (T) => k.value[T] || [], h = (T) => S.value[T] || 50, f = (T) => {
      const te = p(T), H = h(T);
      return te.length > H ? te.slice(0, H) : te;
    }, b = (T) => p(T).length, C = (T) => b(T) > h(T), F = (T) => {
      S.value[T] = h(T) + 50;
    }, A = (T) => {
      T && l("update:modelValue", T);
    }, L = (T) => {
      T && (l("update:modelValue", T), l("selectAndClose", T));
    }, Y = (T) => {
      const te = {
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
      l("update:modelValue", te);
    }, K = (T) => {
      const te = {
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
      l("update:modelValue", te), l("selectAndClose", te);
    };
    let ne = 0;
    const V = (T) => {
      if (!T) return;
      const te = Date.now();
      te - ne < Jt ? L(T) : A(T), ne = te;
    }, ee = (T) => {
      const te = Date.now();
      te - ne < Jt ? K(T) : Y(T), ne = te;
    };
    return _e(() => {
      w.value && et(w.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (T, te) => (u(), m("div", Di, [
      i("div", Pi, [
        i("div", Ei, y(s(n)("Select Target Folder")), 1)
      ]),
      i("div", {
        ref_key: "modalContentElement",
        ref: w,
        class: "vuefinder__modal-tree__content"
      }, [
        o.showPinnedFolders && s(t).features.pinned && s(d).get("pinnedFolders").length ? (u(), m("div", Ti, [
          i("div", Mi, y(s(n)("Pinned Folders")), 1),
          i("div", Ii, [
            (u(!0), m(fe, null, ge(s(d).get("pinnedFolders"), (H) => (u(), m("div", {
              key: H.path,
              class: J(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": o.modelValue?.path === H.path }]),
              onClick: (B) => A(H),
              onDblclick: (B) => L(H),
              onTouchend: (B) => V(H)
            }, [
              O(s(Le), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              i("div", Oi, y(H.basename), 1),
              i("div", Bi, y(H.storage), 1),
              O(s(At), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ai))), 128))
          ])
        ])) : I("", !0),
        i("div", Li, y(s(n)("Storages")), 1),
        (u(!0), m(fe, null, ge(_.value, (H) => (u(), m("div", {
          key: H,
          class: "vuefinder__modal-tree__section"
        }, [
          i("div", zi, [
            i("div", Vi, [
              i("div", Ri, [
                i("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: le((B) => x(H, H + "://"), ["stop"])
                }, [
                  v.value[`${H}:${H}://`] ? (u(), z(s(gt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), z(s(mt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Ni),
                i("div", {
                  class: J(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": o.modelValue?.path === H + "://"
                  }]),
                  onClick: (B) => Y(H),
                  onDblclick: (B) => K(H),
                  onTouchend: (B) => ee(H)
                }, [
                  O(s(Ot), { class: "vuefinder__modal-tree__storage-icon" }),
                  i("span", ji, y(H), 1)
                ], 42, Ui)
              ]),
              v.value[`${H}:${H}://`] ? (u(), m("div", Hi, [
                (u(!0), m(fe, null, ge(f(H + "://"), (B) => (u(), z(Fi, {
                  key: B.path,
                  folder: B,
                  storage: H,
                  "model-value": o.modelValue,
                  "expanded-folders": v.value,
                  "modal-tree-data": k.value,
                  "current-path": o.currentPath,
                  "onUpdate:modelValue": A,
                  onSelectAndClose: L,
                  onToggleFolder: x
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                C(H + "://") ? (u(), m("div", Ki, [
                  i("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (B) => F(H + "://")
                  }, y(s(n)("load more")), 9, qi)
                ])) : I("", !0)
              ])) : I("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Gi = ["title"], St = /* @__PURE__ */ X({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(o, { emit: e }) {
    const t = e, n = Z(), { t: a } = n.i18n, d = E(!1), l = E(null), r = E(l.value?.innerHTML);
    ue(r, () => d.value = !1);
    const c = () => {
      t("hidden"), d.value = !0;
    };
    return (_, g) => (u(), m("div", null, [
      d.value ? I("", !0) : (u(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: J(["vuefinder__message", o.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Se(_.$slots, "default"),
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
        ])], 8, Gi)
      ], 2))
    ]));
  }
}), Wi = { class: "vuefinder__move-modal__content" }, Yi = { class: "vuefinder__move-modal__description" }, Qi = { class: "vuefinder__move-modal__files vf-scrollbar" }, Xi = { class: "vuefinder__move-modal__file-name" }, Ji = { class: "vuefinder__move-modal__target-title" }, Zi = { class: "vuefinder__move-modal__target-container" }, ea = { class: "vuefinder__move-modal__target-path" }, ta = { class: "vuefinder__move-modal__target-storage" }, na = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, oa = { class: "vuefinder__move-modal__target-badge" }, sa = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, ia = { class: "vuefinder__move-modal__checkbox-label" }, aa = { class: "vuefinder__move-modal__checkbox-text" }, ra = ["disabled"], la = { class: "vuefinder__move-modal__selected-items" }, bn = /* @__PURE__ */ X({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(o) {
    const e = Z(), { enabled: t } = Oe(), { t: n } = e.i18n, a = o, d = E(e.modal.data.items.from), l = E(e.modal.data.items.to), r = E(""), c = E(a.copy || !t("move")), _ = N(() => c.value ? "copy" : "move"), g = E(!1), w = W(e.fs.path), v = N(() => c.value ? n("Copy files") : n("Move files")), k = N(
      () => c.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), S = N(() => c.value ? n("Yes, Copy!") : n("Yes, Move!"));
    N(() => c.value ? n("Files copied.") : n("Files moved."));
    const x = (F) => {
      F && (l.value = F);
    }, p = (F) => {
      F && (l.value = F, g.value = !1);
    }, h = N(() => {
      const F = l.value;
      return F ? d.value.some((A) => !!(F.path === A.path || A.path.startsWith(F.path + "/") || A.type === "dir" && F.path.startsWith(A.path + "/"))) : !0;
    }), f = N(() => {
      if (!h.value)
        return "";
      const F = l.value;
      return F ? d.value.find((L) => F.path === L.path || L.path.startsWith(F.path + "/") || L.type === "dir" && F.path.startsWith(L.path + "/")) ? n("Cannot move/copy item to itself or its parent/child directory") : n("Invalid destination directory") : n("Please select a destination directory");
    }), b = () => {
      const F = l.value.path;
      if (!F) return { storage: "local", path: "" };
      if (F.endsWith("://"))
        return { storage: F.replace("://", ""), path: "" };
      const A = F.split("://");
      return {
        storage: A[0] || "local",
        path: A[1] || ""
      };
    }, C = async () => {
      if (d.value.length)
        try {
          const { files: F } = await e.adapter[_.value]({
            path: w.value.path,
            sources: d.value.map(({ path: A }) => A),
            destination: l.value.path
          });
          e.fs.setFiles(F), e.modal.close();
        } catch (F) {
          de.error(De(F, n("Failed to transfer files")));
        }
    };
    return (F, A) => (u(), z(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: C
        }, y(S.value), 9, ra),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: A[4] || (A[4] = (L) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1),
        i("div", la, y(s(n)("%s item(s) selected.", d.value.length)), 1)
      ]),
      default: se(() => [
        i("div", null, [
          O(Me, {
            icon: c.value ? s(It) : s(ii),
            title: v.value
          }, null, 8, ["icon", "title"]),
          i("div", Wi, [
            i("p", Yi, y(k.value), 1),
            i("div", Qi, [
              (u(!0), m(fe, null, ge(d.value, (L) => (u(), m("div", {
                key: L.path,
                class: "vuefinder__move-modal__file"
              }, [
                i("div", null, [
                  L.type === "dir" ? (u(), z(s(Le), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), z(s(st), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                i("div", Xi, y(L.path), 1)
              ]))), 128))
            ]),
            i("h4", Ji, y(s(n)("Target Directory")), 1),
            i("div", Zi, [
              i("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: A[0] || (A[0] = (L) => g.value = !g.value)
              }, [
                i("div", ea, [
                  i("span", ta, y(b().storage) + "://", 1),
                  b().path ? (u(), m("span", na, y(b().path), 1)) : I("", !0)
                ]),
                i("span", oa, y(s(n)("Browse")), 1)
              ])
            ]),
            i("div", {
              class: J([
                "vuefinder__move-modal__tree-selector",
                g.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              O(Lt, {
                modelValue: l.value,
                "onUpdate:modelValue": [
                  A[1] || (A[1] = (L) => l.value = L),
                  x
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: p
              }, null, 8, ["modelValue"])
            ], 2),
            s(t)("copy") && s(t)("move") ? (u(), m("div", sa, [
              i("label", ia, [
                me(i("input", {
                  "onUpdate:modelValue": A[2] || (A[2] = (L) => c.value = L),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Ft, c.value]
                ]),
                i("span", aa, y(s(n)("Create a copy instead of moving")), 1)
              ])
            ])) : I("", !0),
            f.value ? (u(), z(St, {
              key: 1,
              error: ""
            }, {
              default: se(() => [
                ce(y(f.value), 1)
              ]),
              _: 1
            })) : I("", !0),
            r.value.length && !f.value ? (u(), z(St, {
              key: 2,
              error: "",
              onHidden: A[3] || (A[3] = (L) => r.value = "")
            }, {
              default: se(() => [
                ce(y(r.value), 1)
              ]),
              _: 1
            })) : I("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Qe = /* @__PURE__ */ X({
  __name: "ModalMove",
  setup(o) {
    return (e, t) => (u(), z(bn, { copy: !1 }));
  }
}), zt = /* @__PURE__ */ X({
  __name: "ModalCopy",
  setup(o) {
    return (e, t) => (u(), z(bn, { copy: !0 }));
  }
}), da = (o, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && o(...a), clearTimeout(n), n = setTimeout(() => {
      o(...a);
    }, e);
  };
}, kn = (o, e, t) => {
  const n = E(o);
  return Vn((a, d) => ({
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
function ua(o, e) {
  return u(), m("svg", ca, [...e[0] || (e[0] = [
    i("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Vt = { render: ua }, va = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function fa(o, e) {
  return u(), m("svg", va, [...e[0] || (e[0] = [
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
const wt = { render: fa }, _a = { class: "vuefinder__search-modal__search-input" }, pa = ["value", "placeholder", "disabled"], ha = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, ma = /* @__PURE__ */ X({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(o, { expose: e, emit: t }) {
    const n = t, a = Z(), { t: d } = a.i18n, l = E(null), r = (_) => {
      const g = _.target;
      n("update:modelValue", g.value);
    }, c = (_) => {
      n("keydown", _);
    };
    return e({
      focus: () => {
        l.value && l.value.focus();
      }
    }), (_, g) => (u(), m("div", _a, [
      O(s(Vt), { class: "vuefinder__search-modal__search-icon" }),
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
      }, null, 40, pa),
      o.isSearching ? (u(), m("div", ha, [
        O(s(wt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : I("", !0)
    ]));
  }
}), ga = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function wa(o, e) {
  return u(), m("svg", ga, [...e[0] || (e[0] = [
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
const $n = { render: wa }, ya = ["disabled", "title"], ba = ["data-theme"], ka = { class: "vuefinder__search-modal__dropdown-content" }, $a = { class: "vuefinder__search-modal__dropdown-section" }, xa = { class: "vuefinder__search-modal__dropdown-title" }, Sa = { class: "vuefinder__search-modal__dropdown-options" }, Ca = {
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
}, Ea = /* @__PURE__ */ X({
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
    const n = o, a = t, d = Z(), { t: l } = d.i18n, r = E(null), c = E(null);
    let _ = null;
    const g = (x) => {
      if (a("update:selectedOption", x), x.startsWith("size-")) {
        const p = x.split("-")[1];
        a("update:sizeFilter", p);
      }
    }, w = async () => {
      n.disabled || (n.visible ? (a("update:visible", !1), _ && (_(), _ = null)) : (a("update:visible", !0), await Ae(), await v()));
    }, v = async () => {
      if (!(!r.value || !c.value) && (await Ae(), !(!r.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x, y: p } = await Ye(r.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [tt(8), nt({ padding: 16 }), ot({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${x}px`,
            top: `${p}px`
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
          _ = Dt(r.value, c.value, async () => {
            if (!(!r.value || !c.value))
              try {
                const { x, y: p } = await Ye(
                  r.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [tt(8), nt({ padding: 16 }), ot({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${x}px`,
                  top: `${p}px`
                });
              } catch (x) {
                console.warn("Floating UI positioning error:", x);
              }
          });
        } catch (x) {
          console.warn("Floating UI autoUpdate setup error:", x), _ = null;
        }
      }
    }, k = (x) => {
      if (!n.visible) return;
      const p = ["size-all", "size-small", "size-medium", "size-large"], h = p.findIndex((f) => f === n.selectedOption);
      if (x.key === "ArrowDown") {
        x.preventDefault();
        const f = (h + 1) % p.length;
        a("update:selectedOption", p[f] || null);
      } else if (x.key === "ArrowUp") {
        x.preventDefault();
        const f = h <= 0 ? p.length - 1 : h - 1;
        a("update:selectedOption", p[f] || null);
      } else x.key === "Enter" ? (x.preventDefault(), n.selectedOption?.startsWith("size-") && a(
        "update:sizeFilter",
        n.selectedOption.split("-")[1]
      )) : x.key === "Escape" && (x.preventDefault(), a("update:visible", !1), _ && (_(), _ = null));
    }, S = () => {
      _ && (_(), _ = null);
    };
    return ue(
      () => n.visible,
      (x) => {
        !x && _ && (_(), _ = null);
      }
    ), xe(() => {
      S();
    }), e({
      cleanup: S
    }), (x, p) => (u(), m(fe, null, [
      i("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: J(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": o.visible }]),
        disabled: o.disabled,
        title: s(l)("Search Options"),
        onClick: le(w, ["stop"])
      }, [
        O(s($n), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, ya),
      (u(), z(ft, { to: "body" }, [
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
          i("div", ka, [
            i("div", $a, [
              i("div", xa, y(s(l)("File Size")), 1),
              i("div", Sa, [
                i("div", {
                  class: J(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "all"
                  }]),
                  onClick: p[0] || (p[0] = le((h) => g("size-all"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("All Files")), 1),
                  o.sizeFilter === "all" ? (u(), m("div", Ca, [...p[5] || (p[5] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : I("", !0)
                ], 2),
                i("div", {
                  class: J(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "small"
                  }]),
                  onClick: p[1] || (p[1] = le((h) => g("size-small"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Small (< 1MB)")), 1),
                  o.sizeFilter === "small" ? (u(), m("div", Fa, [...p[6] || (p[6] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : I("", !0)
                ], 2),
                i("div", {
                  class: J(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "medium"
                  }]),
                  onClick: p[2] || (p[2] = le((h) => g("size-medium"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Medium (1-10MB)")), 1),
                  o.sizeFilter === "medium" ? (u(), m("div", Da, [...p[7] || (p[7] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : I("", !0)
                ], 2),
                i("div", {
                  class: J(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "large"
                  }]),
                  onClick: p[3] || (p[3] = le((h) => g("size-large"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Large (> 10MB)")), 1),
                  o.sizeFilter === "large" ? (u(), m("div", Pa, [...p[8] || (p[8] = [
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
        ], 40, ba)) : I("", !0)
      ]))
    ], 64));
  }
});
function xn(o, e = 40) {
  const t = o.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return o;
  const n = t[1], a = t[2] ?? "", d = a.split("/").filter(Boolean), l = d.pop();
  if (!l) return n + a;
  let r = `${n}${d.join("/")}${d.length ? "/" : ""}${l}`;
  if (r.length <= e) return r;
  const c = l.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", g = c[1] ?? "", w = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, v = g ? `${w}.${g}` : w;
  return r = `${n}${d.join("/")}${d.length ? "/" : ""}${v}`, r.length > e && (r = `${n}.../${v}`), r;
}
async function Sn(o) {
  try {
    await navigator.clipboard.writeText(o);
  } catch {
    const e = document.createElement("textarea");
    e.value = o, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function it(o) {
  await Sn(o);
}
async function Ta(o) {
  await Sn(o);
}
const Ma = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Ia(o, e) {
  return u(), m("svg", Ma, [...e[0] || (e[0] = [
    i("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Cn = { render: Ia }, Aa = ["title"], Oa = { class: "vuefinder__search-modal__result-icon" }, Ba = { class: "vuefinder__search-modal__result-content" }, La = { class: "vuefinder__search-modal__result-name" }, za = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Va = ["title"], Ra = ["title"], Na = ["data-item-dropdown", "data-theme"], Ua = { class: "vuefinder__search-modal__item-dropdown-content" }, ja = /* @__PURE__ */ X({
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
    const t = o, n = e, a = Z(), { t: d } = a.i18n, l = E(null);
    let r = null;
    ue(
      () => t.activeDropdown,
      (h) => {
        r && (r(), r = null), h === t.item.path && l.value && Ae(() => {
          w(t.item.path, l.value);
        });
      }
    ), xe(() => {
      r && (r(), r = null);
    });
    const c = (h) => t.expandedPaths.has(h), _ = (h) => h.type === "dir" || !h.file_size ? "" : Et(h.file_size), g = (h, f) => {
      f.stopPropagation(), n("toggleItemDropdown", h, f);
    }, w = async (h, f) => {
      const b = document.querySelector(
        `[data-item-dropdown="${h}"]`
      );
      if (!(!b || !f) && (await Ae(), !(!b || !f))) {
        Object.assign(b.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: C, y: F } = await Ye(f, b, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [tt(8), nt({ padding: 16 }), ot({ padding: 16 })]
          });
          Object.assign(b.style, {
            left: `${C}px`,
            top: `${F}px`
          }), requestAnimationFrame(() => {
            b && Object.assign(b.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (C) {
          console.warn("Floating UI initial positioning error:", C);
          return;
        }
        try {
          r = Dt(f, b, async () => {
            if (!(!f || !b))
              try {
                const { x: C, y: F } = await Ye(f, b, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [tt(8), nt({ padding: 16 }), ot({ padding: 16 })]
                });
                Object.assign(b.style, {
                  left: `${C}px`,
                  top: `${F}px`
                });
              } catch (C) {
                console.warn("Floating UI positioning error:", C);
              }
          });
        } catch (C) {
          console.warn("Floating UI autoUpdate setup error:", C), r = null;
        }
      }
    }, v = (h) => {
      n("update:selectedItemDropdownOption", h);
    }, k = async (h) => {
      await it(h.path), n("copyPath", h);
    }, S = (h) => {
      n("openContainingFolder", h);
    }, x = (h) => {
      n("preview", h);
    }, p = (h) => {
      if (!t.activeDropdown) return;
      const f = ["copy-path", "open-folder", "preview"], b = t.selectedItemDropdownOption, C = f.findIndex((F) => b?.includes(F));
      if (h.key === "ArrowDown") {
        h.preventDefault();
        const F = (C + 1) % f.length;
        n(
          "update:selectedItemDropdownOption",
          `${f[F] || ""}-${t.activeDropdown}`
        );
      } else if (h.key === "ArrowUp") {
        h.preventDefault();
        const F = C <= 0 ? f.length - 1 : C - 1;
        n(
          "update:selectedItemDropdownOption",
          `${f[F] || ""}-${t.activeDropdown}`
        );
      } else h.key === "Enter" ? (h.preventDefault(), b && (b.includes("copy-path") ? k(t.item) : b.includes("open-folder") ? S(t.item) : b.includes("preview") && x(t.item))) : h.key === "Escape" && (h.preventDefault(), n("update:selectedItemDropdownOption", null));
    };
    return (h, f) => (u(), m("div", {
      class: J(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": o.index === o.selectedIndex }]),
      title: o.item.basename,
      onClick: f[9] || (f[9] = (b) => n("select", o.index))
    }, [
      i("div", Oa, [
        o.item.type === "dir" ? (u(), z(s(Le), { key: 0 })) : (u(), z(s(st), { key: 1 }))
      ]),
      i("div", Ba, [
        i("div", La, [
          ce(y(o.item.basename) + " ", 1),
          _(o.item) ? (u(), m("span", za, y(_(o.item)), 1)) : I("", !0)
        ]),
        i("div", {
          class: "vuefinder__search-modal__result-path",
          title: o.item.path,
          onClick: f[0] || (f[0] = le((b) => {
            n("select", o.index), n("togglePathExpansion", o.item.path);
          }, ["stop"]))
        }, y(c(o.item.path) ? o.item.path : s(xn)(o.item.path)), 9, Va)
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
        O(s(Cn), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Ra),
      (u(), z(ft, { to: "body" }, [
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
          i("div", Ua, [
            i("div", {
              class: J(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `copy-path-${o.item.path}`
              }]),
              onClick: f[2] || (f[2] = (b) => {
                v(`copy-path-${o.item.path}`), k(o.item);
              }),
              onFocus: f[3] || (f[3] = (b) => v(`copy-path-${o.item.path}`))
            }, [
              O(s(It), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Copy Path")), 1)
            ], 34),
            i("div", {
              class: J(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `open-folder-${o.item.path}`
              }]),
              onClick: f[4] || (f[4] = (b) => {
                v(`open-folder-${o.item.path}`), S(o.item);
              }),
              onFocus: f[5] || (f[5] = (b) => v(`open-folder-${o.item.path}`))
            }, [
              O(s(Le), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Open Containing Folder")), 1)
            ], 34),
            i("div", {
              class: J(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `preview-${o.item.path}`
              }]),
              onClick: f[6] || (f[6] = (b) => {
                v(`preview-${o.item.path}`), x(o.item);
              }),
              onFocus: f[7] || (f[7] = (b) => v(`preview-${o.item.path}`))
            }, [
              O(s(st), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Preview")), 1)
            ], 34)
          ])
        ], 40, Na)) : I("", !0)
      ]))
    ], 10, Aa));
  }
}), Ha = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Ka = { class: "vuefinder__search-modal__loading-icon" }, qa = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Ga = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, Wa = { class: "vuefinder__search-modal__results-header" }, Ge = 60, Zt = 5, Ya = /* @__PURE__ */ X({
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
    const n = o, a = t, d = Z(), { t: l } = d.i18n, r = We("scrollableContainer"), c = N(() => n.searchResults.length > 0), _ = N(() => n.searchResults.length), g = E(0), w = E(600), v = N(() => n.searchResults.length * Ge), k = N(() => {
      const b = Math.max(0, Math.floor(g.value / Ge) - Zt), C = Math.min(
        n.searchResults.length,
        Math.ceil((g.value + w.value) / Ge) + Zt
      );
      return { start: b, end: C };
    }), S = N(() => {
      const { start: b, end: C } = k.value;
      return n.searchResults.slice(b, C).map((F, A) => ({
        item: F,
        index: b + A,
        top: (b + A) * Ge
      }));
    }), x = (b) => {
      const C = b.target;
      g.value = C.scrollTop;
    }, p = () => {
      r.value && (w.value = r.value.clientHeight);
    }, h = () => {
      if (n.selectedIndex >= 0 && r.value) {
        const b = n.selectedIndex * Ge, C = b + Ge, F = r.value.scrollTop, A = r.value.clientHeight, L = F + A;
        let Y = F;
        b < F ? Y = b : C > L && (Y = C - A), Y !== F && r.value.scrollTo({
          top: Y,
          behavior: "smooth"
        });
      }
    }, f = () => {
      r.value && (r.value.scrollTop = 0, g.value = 0);
    };
    return _e(() => {
      p(), window.addEventListener("resize", p);
    }), xe(() => {
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
    }), (b, C) => (u(), m("div", {
      class: J(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": o.resultsEnter }])
    }, [
      o.isSearching ? (u(), m("div", Ha, [
        i("div", Ka, [
          O(s(wt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        i("span", null, y(s(l)("Searching...")), 1)
      ])) : c.value ? (u(), m("div", Ga, [
        i("div", Wa, [
          i("span", null, y(s(l)("Found %s results", _.value)), 1)
        ]),
        i("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: x
        }, [
          i("div", {
            class: "vuefinder__search-modal__results-items",
            style: Ne({ height: `${v.value}px`, position: "relative" })
          }, [
            (u(!0), m(fe, null, ge(S.value, (F) => (u(), m("div", {
              key: F.item.path,
              style: Ne({
                position: "absolute",
                top: `${F.top}px`,
                left: "0",
                width: "100%",
                height: `${Ge}px`
              })
            }, [
              O(ja, {
                item: F.item,
                index: F.index,
                "selected-index": o.selectedIndex,
                "expanded-paths": o.expandedPaths,
                "active-dropdown": o.activeDropdown,
                "selected-item-dropdown-option": o.selectedItemDropdownOption,
                onSelect: C[0] || (C[0] = (A) => a("selectResultItem", A)),
                onSelectWithDropdown: C[1] || (C[1] = (A) => a("selectResultItemWithDropdown", A)),
                onTogglePathExpansion: C[2] || (C[2] = (A) => a("togglePathExpansion", A)),
                onToggleItemDropdown: C[3] || (C[3] = (A, L) => a("toggleItemDropdown", A, L)),
                "onUpdate:selectedItemDropdownOption": C[4] || (C[4] = (A) => a("update:selectedItemDropdownOption", A)),
                onCopyPath: C[5] || (C[5] = (A) => a("copyPath", A)),
                onOpenContainingFolder: C[6] || (C[6] = (A) => a("openContainingFolder", A)),
                onPreview: C[7] || (C[7] = (A) => a("preview", A))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), m("div", qa, [
        i("span", null, y(s(l)("No results found")), 1)
      ]))
    ], 2));
  }
}), Qa = { class: "vuefinder__search-modal" }, Xa = { class: "vuefinder__search-modal__content" }, Ja = { class: "vuefinder__search-modal__search-bar" }, Za = { class: "vuefinder__search-modal__search-location" }, er = ["title"], tr = ["disabled"], nr = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, or = { class: "vuefinder__search-modal__folder-selector-content" }, sr = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ir = { class: "vuefinder__search-modal__instructions-text" }, Rt = /* @__PURE__ */ X({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(o) {
    const e = Z(), { t } = e.i18n, n = e.fs, a = E(null), d = E(null), l = E(null), r = kn("", 300), c = E([]), _ = E(!1), g = E(-1), w = E(!1), v = E(!1), k = E(null), S = E("all"), x = E(!1), p = E(`size-${S.value}`), h = E(null), f = E(/* @__PURE__ */ new Set()), b = E(null), C = W(n.path), F = (D) => {
      f.value.has(D) ? f.value.delete(D) : f.value.add(D);
    }, A = (D, $) => {
      $ && typeof $.stopPropagation == "function" && $.stopPropagation(), b.value === D ? b.value = null : b.value = D;
    }, L = () => {
      b.value = null;
    }, Y = (D) => {
      try {
        const $ = D.dir || `${D.storage}://`;
        e.adapter.open($), e.modal.close(), L();
      } catch {
        de.error(t("Failed to open containing folder"));
      }
    }, K = (D) => {
      e.modal.open(ht, {
        storage: C?.value?.storage ?? "local",
        item: D
      }), L();
    }, ne = (D) => {
      g.value = D, L();
    }, V = (D) => {
      g.value = D;
    }, ee = async (D) => {
      await it(D.path), L();
    };
    ue(r, async (D) => {
      D.trim() ? (await T(D.trim()), g.value = 0) : (c.value = [], _.value = !1, g.value = -1);
    }), ue(S, async (D) => {
      p.value = `size-${D}`, r.value.trim() && !v.value && (await T(r.value.trim()), g.value = 0);
    }), ue(x, async () => {
      r.value.trim() && !v.value && (await T(r.value.trim()), g.value = 0);
    });
    const T = async (D) => {
      if (D) {
        _.value = !0;
        try {
          const $ = k.value?.path || C?.value?.path, P = await e.adapter.search({
            path: $,
            filter: D,
            deep: x.value,
            size: S.value
          });
          c.value = P || [], _.value = !1;
        } catch ($) {
          de.error(De($, t("Search failed"))), c.value = [], _.value = !1;
        }
      }
    };
    _e(() => {
      document.addEventListener("click", M), p.value = `size-${S.value}`, Ae(() => {
        a.value && a.value.focus();
      });
    });
    const te = () => {
      v.value ? (v.value = !1, r.value.trim() && (T(r.value.trim()), g.value = 0)) : (w.value = !1, v.value = !0);
    }, H = (D) => {
      D && (k.value = D);
    }, B = (D) => {
      D && (H(D), v.value = !1, r.value.trim() && (T(r.value.trim()), g.value = 0));
    };
    xe(() => {
      document.removeEventListener("click", M), d.value && d.value.cleanup();
    });
    const M = (D) => {
      const $ = D.target;
      if (w.value && ($.closest(".vuefinder__search-modal__dropdown") || (w.value = !1, Ae(() => {
        a.value && a.value.focus();
      }))), b.value) {
        const P = $.closest(".vuefinder__search-modal__item-dropdown"), G = $.closest(".vuefinder__search-modal__result-item");
        !P && !G && L();
      }
    };
    return (D, $) => (u(), z(Pe, { class: "vuefinder__search-modal-layout" }, {
      default: se(() => [
        i("div", Qa, [
          O(Me, {
            icon: s(Vt),
            title: s(t)("Search files")
          }, null, 8, ["icon", "title"]),
          i("div", Xa, [
            i("div", Ja, [
              O(ma, {
                ref_key: "searchInputRef",
                ref: a,
                modelValue: s(r),
                "onUpdate:modelValue": $[0] || ($[0] = (P) => Rn(r) ? r.value = P : null),
                "is-searching": _.value,
                disabled: v.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              O(Ea, {
                ref_key: "searchOptionsDropdownRef",
                ref: d,
                visible: w.value,
                "onUpdate:visible": $[1] || ($[1] = (P) => w.value = P),
                "size-filter": S.value,
                "onUpdate:sizeFilter": $[2] || ($[2] = (P) => S.value = P),
                "selected-option": p.value,
                "onUpdate:selectedOption": $[3] || ($[3] = (P) => p.value = P),
                disabled: v.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            i("div", {
              class: "vuefinder__search-modal__options",
              onClick: $[7] || ($[7] = le(() => {
              }, ["stop"]))
            }, [
              i("div", Za, [
                i("button", {
                  class: J(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": v.value }]),
                  onClick: le(te, ["stop"])
                }, [
                  O(s(Le), { class: "vuefinder__search-modal__location-icon" }),
                  i("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: k.value?.path || s(C).path
                  }, y(s(xn)(k.value?.path || s(C).path)), 9, er),
                  $[10] || ($[10] = i("svg", {
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
                onClick: $[6] || ($[6] = le(() => {
                }, ["stop"]))
              }, [
                me(i("input", {
                  "onUpdate:modelValue": $[4] || ($[4] = (P) => x.value = P),
                  type: "checkbox",
                  disabled: v.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: $[5] || ($[5] = le(() => {
                  }, ["stop"]))
                }, null, 8, tr), [
                  [Ft, x.value]
                ]),
                i("span", null, y(s(t)("Include subfolders")), 1)
              ])
            ]),
            v.value ? (u(), m("div", nr, [
              i("div", or, [
                O(Lt, {
                  modelValue: k.value,
                  "onUpdate:modelValue": [
                    $[8] || ($[8] = (P) => k.value = P),
                    H
                  ],
                  "show-pinned-folders": !0,
                  "current-path": s(C),
                  onSelectAndClose: B
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : I("", !0),
            !s(r).trim() && !v.value ? (u(), m("div", sr, [
              i("p", ir, y(s(t)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : I("", !0),
            s(r).trim() && !v.value ? (u(), z(Ya, {
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
              onSelectResultItem: ne,
              onSelectResultItemWithDropdown: V,
              onTogglePathExpansion: F,
              onToggleItemDropdown: A,
              "onUpdate:selectedItemDropdownOption": $[9] || ($[9] = (P) => h.value = P),
              onCopyPath: ee,
              onOpenContainingFolder: Y,
              onPreview: K
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : I("", !0)
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
  setup(o, { emit: e, slots: t }) {
    const n = Z(), a = E(!1), { t: d } = n.i18n;
    let l = null;
    const r = () => {
      l && clearTimeout(l), a.value = !0, l = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return _e(() => {
      n.emitter.on(o.on, r);
    }), xe(() => {
      l && clearTimeout(l);
    }), {
      shown: a,
      t: d
    };
  }
}, rr = (o, e) => {
  const t = o.__vccOpts || o;
  for (const [n, a] of e)
    t[n] = a;
  return t;
}, lr = { key: 1 };
function dr(o, e, t, n, a, d) {
  return u(), m("div", {
    class: J(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    o.$slots.default ? Se(o.$slots, "default", { key: 0 }) : (u(), m("span", lr, y(n.t("Saved.")), 1))
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
}, Er = { class: "vuefinder__about-modal__setting-input justify-end" }, Tr = ["checked"], Mr = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, Ir = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, Ar = { class: "vuefinder__about-modal__setting-input justify-end" }, Or = ["value"], Br = ["label"], Lr = ["value"], zr = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, Vr = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, Rr = { class: "vuefinder__about-modal__setting-input justify-end" }, Nr = ["label"], Ur = ["value"], jr = { class: "vuefinder__about-modal__tab-content" }, Hr = { class: "vuefinder__about-modal__settings__section-title" }, Kr = { class: "vuefinder__about-modal__description" }, Fn = /* @__PURE__ */ X({
  __name: "ModalSettings",
  setup(o) {
    const e = Z(), { enabled: t } = Oe(), n = e.config, { clearStore: a } = e.storage, { t: d } = e.i18n, l = W(n.state), r = N(() => l.value.theme || "silver"), c = async () => {
      n.reset(), a(), location.reload();
    }, _ = (p) => {
      n.set("theme", p), e.emitter.emit("vf-theme-saved");
    }, g = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? fn : Et, e.emitter.emit("vf-metric-units-saved");
    }, w = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, v = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: k } = dt("VueFinderOptions"), x = Object.fromEntries(
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
    return (p, h) => (u(), z(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[2] || (h[2] = (f) => s(e).modal.close())
        }, y(s(d)("Close")), 1)
      ]),
      default: se(() => [
        i("div", ur, [
          O(Me, {
            icon: s($n),
            title: s(d)("Settings")
          }, null, 8, ["icon", "title"]),
          i("div", vr, [
            i("div", fr, y(s(d)("Customize your experience with the following settings")), 1),
            i("div", _r, [
              i("fieldset", pr, [
                i("div", hr, y(s(d)("General")), 1),
                i("div", mr, [
                  i("div", gr, [
                    i("label", wr, y(s(d)("Use Metric Units")), 1)
                  ]),
                  i("div", yr, [
                    i("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: s(n).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: g
                    }, null, 40, br),
                    O(Xe, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: se(() => [
                        ce(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", kr, [
                  i("div", $r, [
                    i("label", xr, y(s(d)("Compact list view")), 1)
                  ]),
                  i("div", Sr, [
                    i("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: s(n).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: w
                    }, null, 40, Cr),
                    O(Xe, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: se(() => [
                        ce(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", Fr, [
                  i("div", Dr, [
                    i("label", Pr, y(s(d)("Persist path on reload")), 1)
                  ]),
                  i("div", Er, [
                    i("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: s(n).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: v
                    }, null, 40, Tr),
                    O(Xe, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: se(() => [
                        ce(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s(t)("theme") ? (u(), m("div", Mr, y(s(d)("Theme")), 1)) : I("", !0),
                s(t)("theme") ? (u(), m("div", Ir, [
                  i("div", Ar, [
                    i("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: h[0] || (h[0] = (f) => _(f.target?.value))
                    }, [
                      i("optgroup", {
                        label: s(d)("Theme")
                      }, [
                        (u(!0), m(fe, null, ge(s(cr), (f) => (u(), m("option", {
                          key: f.name,
                          value: f.name
                        }, y(f.displayName), 9, Lr))), 128))
                      ], 8, Br)
                    ], 40, Or),
                    O(Xe, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: se(() => [
                        ce(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : I("", !0),
                s(t)("language") && Object.keys(s(x)).length > 1 ? (u(), m("div", zr, y(s(d)("Language")), 1)) : I("", !0),
                s(t)("language") && Object.keys(s(x)).length > 1 ? (u(), m("div", Vr, [
                  i("div", Rr, [
                    me(i("select", {
                      id: "language",
                      "onUpdate:modelValue": h[1] || (h[1] = (f) => s(e).i18n.locale = f),
                      class: "vuefinder__about-modal__select"
                    }, [
                      i("optgroup", {
                        label: s(d)("Language")
                      }, [
                        (u(!0), m(fe, null, ge(s(x), (f, b) => (u(), m("option", {
                          key: b,
                          value: b
                        }, y(f), 9, Ur))), 128))
                      ], 8, Nr)
                    ], 512), [
                      [$t, s(e).i18n.locale]
                    ]),
                    O(Xe, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: se(() => [
                        ce(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : I("", !0)
              ])
            ]),
            i("div", jr, [
              i("div", Hr, y(s(d)("Reset")), 1),
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
function qr() {
  const o = Z(), e = o.fs, t = o.config, { enabled: n } = Oe(), a = W(e.path), d = W(e.selectedItems), l = (r) => {
    if (r.code === Ce.ESCAPE && (o.modal.close(), o.root.focus()), !o.modal.visible) {
      if (r.metaKey && r.code === Ce.KEY_R && !r.shiftKey && (o.adapter.invalidateListQuery(a.value.path), o.adapter.open(a.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === Ce.KEY_R && n("rename") && d.value.length === 1 && (o.modal.open(pt, { items: d.value }), r.preventDefault()), r.code === Ce.DELETE && d.value.length !== 0 && o.modal.open(_t, { items: d.value }), r.metaKey && r.code === Ce.BACKSLASH && o.modal.open(mn), r.metaKey && r.code === Ce.KEY_F && n("search") && (o.modal.open(Rt), r.preventDefault()), r.metaKey && r.code === Ce.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === Ce.KEY_S && (o.modal.open(Fn), r.preventDefault()), r.metaKey && r.code === Ce.ENTER && (t.toggle("fullScreen"), o.root.focus()), r.metaKey && r.code === Ce.KEY_A && (e.selectAll(o.selectionMode || "multiple", o), r.preventDefault()), r.code === Ce.SPACE && d.value.length === 1 && d.value[0]?.type !== "dir" && o.modal.open(ht, {
        storage: e.path.get().storage,
        item: d.value[0]
      }), r.metaKey && r.code === Ce.KEY_C && n("copy")) {
        if (d.value.length === 0) {
          de.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("copy", new Set(d.value.map((c) => c.path))), de.success(
          d.value.length === 1 ? o.i18n.t("Item copied to clipboard") : o.i18n.t("%s items copied to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Ce.KEY_X && n("copy")) {
        if (d.value.length === 0) {
          de.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("cut", new Set(d.value.map((c) => c.path))), de.success(
          d.value.length === 1 ? o.i18n.t("Item cut to clipboard") : o.i18n.t("%s items cut to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Ce.KEY_V && n("copy")) {
        if (e.getClipboard().items.size === 0) {
          de.error(o.i18n.t("No items in clipboard"));
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          de.error(o.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (e.getClipboard().type === "cut") {
          o.modal.open(Qe, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          o.modal.open(zt, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  _e(async () => {
    if (await Ae(), !o.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    o.root.addEventListener("keydown", l);
  }), ln(() => {
    o.root && o.root.removeEventListener("keydown", l);
  });
}
function Gr() {
  const o = E(!1), e = E([]);
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
              await Mt((v, k) => {
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
const Dn = { render: Yr }, Qr = { class: "vuefinder__new-folder-modal__content" }, Xr = { class: "vuefinder__new-folder-modal__form" }, Jr = { class: "vuefinder__new-folder-modal__description" }, Zr = ["placeholder"], Nt = /* @__PURE__ */ X({
  __name: "ModalNewFolder",
  setup(o) {
    const e = Z(), { t } = e.i18n, n = e.fs, a = W(n.path), d = E(""), l = () => {
      d.value !== "" && e.adapter.createFolder({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        de.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(De(r, t("Failed to create folder")));
      });
    };
    return (r, c) => (u(), z(Pe, null, {
      buttons: se(() => [
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
      default: se(() => [
        i("div", null, [
          O(Me, {
            icon: s(Dn),
            title: s(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          i("div", Qr, [
            i("div", Xr, [
              i("p", Jr, y(s(t)("Create a new folder")), 1),
              me(i("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => d.value = _),
                class: "vuefinder__new-folder-modal__input",
                placeholder: s(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: at(l, ["enter"])
              }, null, 40, Zr), [
                [rt, d.value]
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
const Pn = { render: tl }, nl = { class: "vuefinder__new-file-modal__content" }, ol = { class: "vuefinder__new-file-modal__form" }, sl = { class: "vuefinder__new-file-modal__description" }, il = ["placeholder"], En = /* @__PURE__ */ X({
  __name: "ModalNewFile",
  setup(o) {
    const e = Z(), { t } = e.i18n, n = e.fs, a = W(n.path), d = E(""), l = () => {
      d.value !== "" && e.adapter.createFile({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        de.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(De(r, t("Failed to create file")));
      });
    };
    return (r, c) => (u(), z(Pe, null, {
      buttons: se(() => [
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
      default: se(() => [
        i("div", null, [
          O(Me, {
            icon: s(Pn),
            title: s(t)("New File")
          }, null, 8, ["icon", "title"]),
          i("div", nl, [
            i("div", ol, [
              i("p", sl, y(s(t)("Create a new file")), 1),
              me(i("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => d.value = _),
                class: "vuefinder__new-file-modal__input",
                placeholder: s(t)("File Name"),
                type: "text",
                onKeyup: at(l, ["enter"])
              }, null, 40, il), [
                [rt, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Ct(o, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return o.replace(new RegExp(t), "$2..$4");
}
const al = {
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
}, Ut = /* @__PURE__ */ X({
  __name: "ModalUpload",
  setup(o) {
    const e = Z(), { t } = e.i18n, n = e.fs, a = W(n.path), d = E(a.value), l = E(!1), r = () => {
      const M = d.value.path;
      if (!M) return { storage: "local", path: "" };
      if (M.endsWith("://"))
        return { storage: M.replace("://", ""), path: "" };
      const D = M.split("://");
      return {
        storage: D[0] || "local",
        path: D[1] || ""
      };
    }, c = (M) => {
      M && (d.value = M);
    }, _ = (M) => {
      M && (d.value = M, l.value = !1);
    }, {
      container: g,
      internalFileInput: w,
      internalFolderInput: v,
      pickFiles: k,
      queue: S,
      message: x,
      uploading: p,
      hasFilesInDropArea: h,
      definitions: f,
      openFileSelector: b,
      upload: C,
      cancel: F,
      remove: A,
      clear: L,
      close: Y,
      getClassNameForEntry: K,
      getIconForEntry: ne,
      addExternalFiles: V
    } = yn(e.customUploader), ee = () => {
      C(d.value);
    };
    _e(() => {
      e.emitter.on("vf-external-files-dropped", (M) => {
        V(M);
      });
    }), xe(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const T = E(!1), te = E(null), H = E(null), B = (M) => {
      if (!T.value) return;
      const D = M.target, $ = te.value?.contains(D) ?? !1, P = H.value?.contains(D) ?? !1;
      !$ && !P && (T.value = !1);
    };
    return _e(() => document.addEventListener("click", B)), xe(() => document.removeEventListener("click", B)), (M, D) => (u(), z(Pe, {
      "show-drag-overlay": s(h),
      "drag-overlay-text": s(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: se(() => [
        i("div", {
          ref_key: "actionsMenuMobileRef",
          ref: te,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          i("div", {
            class: J([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              T.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: D[3] || (D[3] = ($) => s(b)())
            }, y(s(t)("Select Files")), 1),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": T.value ? "true" : "false",
              onClick: D[4] || (D[4] = le(($) => T.value = !T.value, ["stop"]))
            }, [...D[17] || (D[17] = [
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
          T.value ? (u(), m("div", Cl, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[5] || (D[5] = ($) => {
                s(b)(), T.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[6] || (D[6] = ($) => {
                s(v)?.click(), T.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            D[18] || (D[18] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: J(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: D[7] || (D[7] = ($) => s(p) ? null : (s(L)(!1), T.value = !1))
            }, y(s(t)("Clear all")), 3),
            i("div", {
              class: J(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: D[8] || (D[8] = ($) => s(p) ? null : (s(L)(!0), T.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : I("", !0)
        ], 512),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: s(p) || !s(S).length,
          onClick: le(ee, ["prevent"])
        }, y(s(t)("Upload")), 9, Fl),
        s(p) ? (u(), m("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[9] || (D[9] = le(
            //@ts-ignore
            (...$) => s(F) && s(F)(...$),
            ["prevent"]
          ))
        }, y(s(t)("Cancel")), 1)) : (u(), m("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[10] || (D[10] = le(
            //@ts-ignore
            (...$) => s(Y) && s(Y)(...$),
            ["prevent"]
          ))
        }, y(s(t)("Close")), 1)),
        i("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: H,
          class: "relative mr-auto hidden sm:block"
        }, [
          i("div", {
            class: J(["vuefinder__upload-actions", T.value ? "vuefinder__upload-actions--ring" : ""])
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
              onClick: D[11] || (D[11] = le(($) => T.value = !T.value, ["stop"]))
            }, [...D[19] || (D[19] = [
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
          T.value ? (u(), m("div", Pl, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[12] || (D[12] = ($) => {
                s(b)(), T.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[13] || (D[13] = ($) => {
                s(v)?.click(), T.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            D[20] || (D[20] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: J(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: D[14] || (D[14] = ($) => s(p) ? null : (s(L)(!1), T.value = !1))
            }, y(s(t)("Clear all")), 3),
            i("div", {
              class: J(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: D[15] || (D[15] = ($) => s(p) ? null : (s(L)(!0), T.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : I("", !0)
        ], 512)
      ]),
      default: se(() => [
        i("div", null, [
          O(Me, {
            icon: s(Tn),
            title: s(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          i("div", ll, [
            i("div", dl, [
              i("div", cl, y(s(t)("Hedef Klasör")), 1),
              i("div", ul, [
                i("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: D[0] || (D[0] = ($) => l.value = !l.value)
                }, [
                  i("div", vl, [
                    i("span", fl, y(r().storage) + "://", 1),
                    r().path ? (u(), m("span", _l, y(r().path), 1)) : I("", !0)
                  ]),
                  i("span", pl, y(s(t)("Browse")), 1)
                ])
              ]),
              i("div", {
                class: J([
                  "vuefinder__upload-modal__tree-selector",
                  l.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                O(Lt, {
                  modelValue: d.value,
                  "onUpdate:modelValue": [
                    D[1] || (D[1] = ($) => d.value = $),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            i("div", hl, y(s(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            i("div", {
              ref_key: "container",
              ref: g,
              class: "hidden"
            }, null, 512),
            i("div", ml, [
              (u(!0), m(fe, null, ge(s(S), ($) => (u(), m("div", {
                key: $.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                i("span", {
                  class: J(["vuefinder__upload-modal__file-icon", s(K)($)])
                }, [
                  i("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(s(ne)($))
                  }, null, 8, gl)
                ], 2),
                i("div", wl, [
                  i("div", yl, y(s(Ct)($.name, 40)) + " (" + y($.size) + ") ", 1),
                  i("div", bl, y(s(Ct)($.name, 16)) + " (" + y($.size) + ") ", 1),
                  i("div", {
                    class: J(["vuefinder__upload-modal__file-status", s(K)($)])
                  }, [
                    ce(y($.statusName) + " ", 1),
                    $.status === s(f).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), m("b", kl, y($.percent), 1)) : I("", !0)
                  ], 2)
                ]),
                i("button", {
                  type: "button",
                  class: J(["vuefinder__upload-modal__file-remove", s(p) ? "disabled" : ""]),
                  title: s(t)("Delete"),
                  disabled: s(p),
                  onClick: (P) => s(A)($)
                }, [...D[16] || (D[16] = [
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
              s(S).length ? I("", !0) : (u(), m("div", xl, y(s(t)("No files selected!")), 1))
            ]),
            s(x).length ? (u(), z(St, {
              key: 0,
              error: "",
              onHidden: D[2] || (D[2] = ($) => x.value = "")
            }, {
              default: se(() => [
                ce(y(s(x)), 1)
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
}), El = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Tl(o, e) {
  return u(), m("svg", El, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Mn = { render: Tl }, Ml = { class: "vuefinder__unarchive-modal__content" }, Il = { class: "vuefinder__unarchive-modal__items" }, Al = {
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
}, Bl = { class: "vuefinder__unarchive-modal__item-name" }, Ll = { class: "vuefinder__unarchive-modal__info" }, jt = /* @__PURE__ */ X({
  __name: "ModalUnarchive",
  setup(o) {
    const e = Z(), t = e.fs, n = W(t.path), { t: a } = e.i18n, d = E(e.modal.data.items[0]), l = E([]), r = () => {
      e.adapter.unarchive({
        item: d.value.path,
        path: n.value.path
      }).then((c) => {
        de.success(a("The file unarchived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(De(c, a("Failed to unarchive")));
      });
    };
    return (c, _) => (u(), z(Pe, null, {
      buttons: se(() => [
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
      default: se(() => [
        i("div", null, [
          O(Me, {
            icon: s(Mn),
            title: s(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          i("div", Ml, [
            i("div", Il, [
              (u(!0), m(fe, null, ge(l.value, (g) => (u(), m("p", {
                key: g.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                g.type === "dir" ? (u(), m("svg", Al, [..._[1] || (_[1] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), m("svg", Ol, [..._[2] || (_[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", Bl, y(g.basename), 1)
              ]))), 128)),
              i("p", Ll, y(s(a)("The archive will be unarchived at")) + " (" + y(s(n).path) + ") ", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), zl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Vl(o, e) {
  return u(), m("svg", zl, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const In = { render: Vl }, Rl = { class: "vuefinder__archive-modal__content" }, Nl = { class: "vuefinder__archive-modal__form" }, Ul = { class: "vuefinder__archive-modal__files vf-scrollbar" }, jl = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hl = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kl = { class: "vuefinder__archive-modal__file-name" }, ql = ["placeholder"], Ht = /* @__PURE__ */ X({
  __name: "ModalArchive",
  setup(o) {
    const e = Z(), { t } = e.i18n, n = e.fs, a = W(n.path), d = E(""), l = E(e.modal.data.items), r = () => {
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
        de.error(De(c, t("Failed to archive files")));
      });
    };
    return (c, _) => (u(), z(Pe, null, {
      buttons: se(() => [
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
      default: se(() => [
        i("div", null, [
          O(Me, {
            icon: s(In),
            title: s(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          i("div", Rl, [
            i("div", Nl, [
              i("div", Ul, [
                (u(!0), m(fe, null, ge(l.value, (g) => (u(), m("p", {
                  key: g.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  g.type === "dir" ? (u(), m("svg", jl, [..._[2] || (_[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), m("svg", Hl, [..._[3] || (_[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Kl, y(g.basename), 1)
                ]))), 128))
              ]),
              me(i("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (g) => d.value = g),
                class: "vuefinder__archive-modal__input",
                placeholder: s(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: at(r, ["enter"])
              }, null, 40, ql), [
                [rt, d.value]
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
}, dd = /* @__PURE__ */ X({
  __name: "ModalShortcuts",
  setup(o) {
    const e = Z(), { enabled: t } = Oe(), { t: n } = e.i18n;
    return (a, d) => (u(), z(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: d[0] || (d[0] = (l) => s(e).modal.close())
        }, y(s(n)("Close")), 1)
      ]),
      default: se(() => [
        i("div", Gl, [
          O(Me, {
            icon: s(hn),
            title: s(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          i("div", Wl, [
            i("div", Yl, [
              i("div", Ql, [
                i("div", null, y(s(n)("Refresh")), 1),
                d[1] || (d[1] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "R")
                ], -1))
              ]),
              s(t)("rename") ? (u(), m("div", Xl, [
                i("div", null, y(s(n)("Rename")), 1),
                d[2] || (d[2] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "Shift"),
                  ce(" + "),
                  i("kbd", null, "R")
                ], -1))
              ])) : I("", !0),
              s(t)("delete") ? (u(), m("div", Jl, [
                i("div", null, y(s(n)("Delete")), 1),
                d[3] || (d[3] = i("kbd", null, "Del", -1))
              ])) : I("", !0),
              i("div", Zl, [
                i("div", null, y(s(n)("Escape")), 1),
                d[4] || (d[4] = i("kbd", null, "Esc", -1))
              ]),
              i("div", ed, [
                i("div", null, y(s(n)("Select All")), 1),
                d[5] || (d[5] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "A")
                ], -1))
              ]),
              s(t)("copy") ? (u(), m("div", td, [
                i("div", null, y(s(n)("Cut")), 1),
                d[6] || (d[6] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "X")
                ], -1))
              ])) : I("", !0),
              s(t)("copy") ? (u(), m("div", nd, [
                i("div", null, y(s(n)("Copy")), 1),
                d[7] || (d[7] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "C")
                ], -1))
              ])) : I("", !0),
              s(t)("copy") ? (u(), m("div", od, [
                i("div", null, y(s(n)("Paste")), 1),
                d[8] || (d[8] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "V")
                ], -1))
              ])) : I("", !0),
              s(t)("search") ? (u(), m("div", sd, [
                i("div", null, y(s(n)("Search")), 1),
                d[9] || (d[9] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "F")
                ], -1))
              ])) : I("", !0),
              i("div", id, [
                i("div", null, y(s(n)("Toggle Sidebar")), 1),
                d[10] || (d[10] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "E")
                ], -1))
              ]),
              i("div", ad, [
                i("div", null, y(s(n)("Open Settings")), 1),
                d[11] || (d[11] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "S")
                ], -1))
              ]),
              s(t)("fullscreen") ? (u(), m("div", rd, [
                i("div", null, y(s(n)("Toggle Full Screen")), 1),
                d[12] || (d[12] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "Enter")
                ], -1))
              ])) : I("", !0),
              s(t)("preview") ? (u(), m("div", ld, [
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
}), cd = { class: "vuefinder__menubar__container" }, ud = ["onClick", "onMouseenter"], vd = { class: "vuefinder__menubar__label" }, fd = ["onMouseenter"], _d = ["onClick"], pd = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, hd = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, md = /* @__PURE__ */ X({
  __name: "MenuBar",
  setup(o) {
    const e = Z(), { enabled: t } = Oe(), { t: n } = e?.i18n || { t: (f) => f }, a = e?.fs, d = e?.config, l = W(d.state), r = W(a.selectedItems), c = W(a?.storages || []), _ = E(null), g = E(!1), w = N(() => window.opener !== null || window.name !== "" || window.history.length <= 1), v = N(() => [
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
            action: () => e?.modal?.open(En, { items: r.value }),
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
              r.value.length > 0 && e?.modal?.open(Ht, { items: r.value });
            },
            enabled: () => r.value.length > 0 && t("archive")
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(jt, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && t("unarchive")
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(ht, {
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
                f?.items?.size > 0 && e?.modal?.open(f.type === "cut" ? Qe : zt, {
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
                  e?.modal?.open(Qe, { items: { from: r.value, to: b } });
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
                await it(f.path);
              } else {
                const f = a?.path?.get();
                f?.path && await it(f.path);
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
                b && await Ta(b);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(pt, { items: r.value });
            },
            enabled: () => r.value.length === 1 && t("rename")
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(_t, { items: r.value });
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
                const C = f.breadcrumb[f.breadcrumb.length - 2]?.path ?? `${f.storage}://`;
                e?.adapter.open(C);
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
                const b = f.indexOf("://"), C = f.slice(0, b);
                if (!c.value || !c.value.includes(C)) {
                  alert(n('Invalid storage. Storage "%s" is not available.', C));
                  return;
                }
                try {
                  await e?.adapter.open(f);
                } catch (F) {
                  const A = De(F, n("Failed to navigate to folder"));
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
            action: () => e?.modal?.open(Fn),
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
    ]), k = (f) => {
      _.value === f ? x() : (_.value = f, g.value = !0);
    }, S = (f) => {
      g.value && (_.value = f);
    }, x = () => {
      _.value = null, g.value = !1;
    }, p = (f) => {
      x(), f();
    }, h = (f) => {
      f.target.closest(".vuefinder__menubar") || x();
    };
    return _e(() => {
      document.addEventListener("click", h);
    }), xe(() => {
      document.removeEventListener("click", h);
    }), (f, b) => (u(), m("div", {
      class: "vuefinder__menubar",
      onClick: b[0] || (b[0] = le(() => {
      }, ["stop"]))
    }, [
      i("div", cd, [
        (u(!0), m(fe, null, ge(v.value, (C) => (u(), m("div", {
          key: C.id,
          class: J(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": _.value === C.id }]),
          onClick: (F) => k(C.id),
          onMouseenter: (F) => S(C.id)
        }, [
          i("span", vd, y(C.label), 1),
          _.value === C.id ? (u(), m("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (F) => S(C.id)
          }, [
            (u(!0), m(fe, null, ge(C.items, (F) => (u(), m("div", {
              key: F.id || F.type,
              class: J(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": F.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": F.enabled && !F.enabled(),
                "vuefinder__menubar__dropdown__item--checked": F.checked && F.checked()
              }]),
              onClick: le((A) => F.type !== "separator" && F.enabled && F.enabled() ? p(F.action) : null, ["stop"])
            }, [
              F.type !== "separator" ? (u(), m("span", pd, y(F.label), 1)) : I("", !0),
              F.checked && F.checked() ? (u(), m("span", hd, " ✓ ")) : I("", !0)
            ], 10, _d))), 128))
          ], 40, fd)) : I("", !0)
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
const Pd = { render: Dd }, Ed = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Td(o, e) {
  return u(), m("svg", Ed, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Md = { render: Td }, Id = { class: "vuefinder__toolbar" }, Ad = { class: "vuefinder__toolbar__actions" }, Od = ["title"], Bd = ["title"], Ld = ["title"], zd = ["title"], Vd = ["title"], Rd = ["title"], Nd = ["title"], Ud = { class: "vuefinder__toolbar__controls" }, jd = ["title"], Hd = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Kd = ["title"], qd = { class: "relative" }, Gd = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Wd = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Yd = { class: "vuefinder__toolbar__dropdown-content" }, Qd = { class: "vuefinder__toolbar__dropdown-section" }, Xd = { class: "vuefinder__toolbar__dropdown-label" }, Jd = { class: "vuefinder__toolbar__dropdown-row" }, Zd = { value: "name" }, ec = { value: "size" }, tc = { value: "modified" }, nc = { value: "" }, oc = { value: "asc" }, sc = { value: "desc" }, ic = { class: "vuefinder__toolbar__dropdown-section" }, ac = { class: "vuefinder__toolbar__dropdown-label" }, rc = { class: "vuefinder__toolbar__dropdown-options" }, lc = { class: "vuefinder__toolbar__dropdown-option" }, dc = { class: "vuefinder__toolbar__option-text" }, cc = { class: "vuefinder__toolbar__dropdown-option" }, uc = { class: "vuefinder__toolbar__option-text" }, vc = { class: "vuefinder__toolbar__dropdown-option" }, fc = { class: "vuefinder__toolbar__option-text" }, _c = { class: "vuefinder__toolbar__dropdown-toggle" }, pc = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, hc = { class: "vuefinder__toolbar__dropdown-reset" }, mc = ["title"], gc = ["title"], wc = /* @__PURE__ */ X({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(o) {
    const e = Z(), { enabled: t } = Oe(), { t: n } = e.i18n, a = e.fs, d = e.config, l = W(d.state), r = W(a.selectedItems), c = W(a.sort), _ = W(a.filter);
    ue(
      () => l.value.fullScreen,
      () => {
        const p = document.querySelector("body");
        p && (p.style.overflow = l.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const g = E(!1), w = (p) => {
      p.target.closest(".vuefinder__toolbar__dropdown-container") || (g.value = !1);
    };
    _e(() => {
      const p = document.querySelector("body");
      p && l.value.fullScreen && setTimeout(() => p.style.overflow = "hidden"), document.addEventListener("click", w);
    }), xe(() => {
      document.removeEventListener("click", w);
    });
    const v = E({
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
    const k = () => d.set("view", l.value.view === "grid" ? "list" : "grid"), S = N(() => _.value.kind !== "all" || !l.value.showHiddenFiles || c.value.active), x = () => {
      v.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, d.set("showHiddenFiles", !0), a.clearSort(), a.clearFilter();
    };
    return (p, h) => (u(), m("div", Id, [
      i("div", Ad, [
        s(t)("newfolder") ? (u(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("New Folder"),
          onClick: h[0] || (h[0] = (f) => s(e).modal.open(Nt, { items: s(r) }))
        }, [
          O(s(Dn))
        ], 8, Od)) : I("", !0),
        s(t)("newfile") ? (u(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("New File"),
          onClick: h[1] || (h[1] = (f) => s(e).modal.open(En, { items: s(r) }))
        }, [
          O(s(Pn))
        ], 8, Bd)) : I("", !0),
        s(t)("rename") ? (u(), m("div", {
          key: 2,
          class: "mx-1.5",
          title: s(n)("Rename"),
          onClick: h[2] || (h[2] = (f) => s(r).length !== 1 || s(e).modal.open(pt, { items: s(r) }))
        }, [
          O(s(wn), {
            class: J(s(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ld)) : I("", !0),
        s(t)("delete") ? (u(), m("div", {
          key: 3,
          class: "mx-1.5",
          title: s(n)("Delete"),
          onClick: h[3] || (h[3] = (f) => !s(r).length || s(e).modal.open(_t, { items: s(r) }))
        }, [
          O(s(gn), {
            class: J(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, zd)) : I("", !0),
        s(t)("upload") ? (u(), m("div", {
          key: 4,
          class: "mx-1.5",
          title: s(n)("Upload"),
          onClick: h[4] || (h[4] = (f) => s(e).modal.open(Ut, { items: s(r) }))
        }, [
          O(s(Tn))
        ], 8, Vd)) : I("", !0),
        s(t)("unarchive") && s(r).length === 1 && s(r)[0].mime_type === "application/zip" ? (u(), m("div", {
          key: 5,
          class: "mx-1.5",
          title: s(n)("Unarchive"),
          onClick: h[5] || (h[5] = (f) => !s(r).length || s(e).modal.open(jt, { items: s(r) }))
        }, [
          O(s(Mn), {
            class: J(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Rd)) : I("", !0),
        s(t)("archive") ? (u(), m("div", {
          key: 6,
          class: "mx-1.5",
          title: s(n)("Archive"),
          onClick: h[6] || (h[6] = (f) => !s(r).length || s(e).modal.open(Ht, { items: s(r) }))
        }, [
          O(s(In), {
            class: J(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Nd)) : I("", !0)
      ]),
      i("div", Ud, [
        s(t)("search") ? (u(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("Search Files"),
          onClick: h[7] || (h[7] = (f) => s(e).modal.open(Rt))
        }, [
          O(s(Vt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, jd)) : I("", !0),
        i("div", Hd, [
          i("div", {
            title: s(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: h[8] || (h[8] = (f) => g.value = !g.value)
          }, [
            i("div", qd, [
              O(s(Md), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              S.value ? (u(), m("div", Gd)) : I("", !0)
            ])
          ], 8, Kd),
          g.value ? (u(), m("div", Wd, [
            i("div", Yd, [
              i("div", Qd, [
                i("div", Xd, y(s(n)("Sorting")), 1),
                i("div", Jd, [
                  me(i("select", {
                    "onUpdate:modelValue": h[9] || (h[9] = (f) => v.value.sortBy = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", Zd, y(s(n)("Name")), 1),
                    i("option", ec, y(s(n)("Size")), 1),
                    i("option", tc, y(s(n)("Date")), 1)
                  ], 512), [
                    [$t, v.value.sortBy]
                  ]),
                  me(i("select", {
                    "onUpdate:modelValue": h[10] || (h[10] = (f) => v.value.sortOrder = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", nc, y(s(n)("None")), 1),
                    i("option", oc, y(s(n)("Asc")), 1),
                    i("option", sc, y(s(n)("Desc")), 1)
                  ], 512), [
                    [$t, v.value.sortOrder]
                  ])
                ])
              ]),
              i("div", ic, [
                i("div", ac, y(s(n)("Show")), 1),
                i("div", rc, [
                  i("label", lc, [
                    me(i("input", {
                      "onUpdate:modelValue": h[11] || (h[11] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [bt, v.value.filterKind]
                    ]),
                    i("span", dc, y(s(n)("All items")), 1)
                  ]),
                  i("label", cc, [
                    me(i("input", {
                      "onUpdate:modelValue": h[12] || (h[12] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [bt, v.value.filterKind]
                    ]),
                    i("span", uc, y(s(n)("Files only")), 1)
                  ]),
                  i("label", vc, [
                    me(i("input", {
                      "onUpdate:modelValue": h[13] || (h[13] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [bt, v.value.filterKind]
                    ]),
                    i("span", fc, y(s(n)("Folders only")), 1)
                  ])
                ])
              ]),
              i("div", _c, [
                i("label", pc, y(s(n)("Show hidden files")), 1),
                me(i("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": h[14] || (h[14] = (f) => v.value.showHidden = f),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Ft, v.value.showHidden]
                ])
              ]),
              i("div", hc, [
                i("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: x
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
          s(l).fullScreen ? (u(), z(s($d), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), z(s(yd), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, mc)) : I("", !0),
        i("div", {
          class: "mx-1.5",
          title: s(n)("Change View"),
          onClick: h[16] || (h[16] = (f) => k())
        }, [
          s(l).view === "grid" ? (u(), z(s(Cd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : I("", !0),
          s(l).view === "list" ? (u(), z(s(Pd), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : I("", !0)
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
const Dc = { render: Fc }, Pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Ec(o, e) {
  return u(), m("svg", Pc, [...e[0] || (e[0] = [
    i("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Tc = { render: Ec }, Mc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ic(o, e) {
  return u(), m("svg", Mc, [...e[0] || (e[0] = [
    i("path", {
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
function Bc(o, e) {
  return u(), m("svg", Oc, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Lc = { render: Bc }, zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Vc(o, e) {
  return u(), m("svg", zc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Rc = { render: Vc };
function lt(o, e = []) {
  const t = "vfDragEnterCounter", n = o.fs, a = W(n.selectedItems);
  function d(w, v) {
    return !!(!w || w.type !== "dir" || w.path.startsWith(v) || a.value.some((S) => S.path === v ? !1 : !!w.path.startsWith(S.path)));
  }
  function l(w, v) {
    if (w.isExternalDrag)
      return;
    if (!(o.features?.move ?? !1)) {
      w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
      return;
    }
    w.preventDefault();
    const S = n.getDraggedItem();
    d(v, S) ? w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : (w.dataTransfer && (w.dataTransfer.dropEffect = "copy", w.dataTransfer.effectAllowed = "all"), w.currentTarget.classList.add(...e));
  }
  function r(w) {
    if (w.isExternalDrag || !(o.features?.move ?? !1))
      return;
    w.preventDefault();
    const k = w.currentTarget, S = Number(k.dataset[t] || 0);
    k.dataset[t] = String(S + 1);
  }
  function c(w) {
    if (w.isExternalDrag || !(o.features?.move ?? !1))
      return;
    w.preventDefault();
    const k = w.currentTarget, x = Number(k.dataset[t] || 0) - 1;
    x <= 0 ? (delete k.dataset[t], k.classList.remove(...e)) : k.dataset[t] = String(x);
  }
  function _(w, v) {
    if (w.isExternalDrag || !(o.features?.move ?? !1) || !v) return;
    w.preventDefault();
    const S = w.currentTarget;
    delete S.dataset[t], S.classList.remove(...e);
    const x = w.dataTransfer?.getData("items") || "[]", h = JSON.parse(x).map(
      (f) => n.sortedFiles.get().find((b) => b.path === f)
    );
    n.clearDraggedItem(), o.modal.open(Qe, { items: { from: h, to: v } });
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
const Nc = { class: "vuefinder__breadcrumb__container" }, Uc = ["title"], jc = ["title"], Hc = ["title"], Kc = ["title"], qc = { class: "vuefinder__breadcrumb__path-container" }, Gc = { class: "vuefinder__breadcrumb__list" }, Wc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Yc = { class: "relative" }, Qc = ["title", "onClick"], Xc = ["title"], Jc = { class: "vuefinder__breadcrumb__path-mode" }, Zc = { class: "vuefinder__breadcrumb__path-mode-content" }, eu = ["title"], tu = { class: "vuefinder__breadcrumb__path-text" }, nu = ["title"], ou = ["data-theme"], su = ["onClick"], iu = { class: "vuefinder__breadcrumb__hidden-item-content" }, au = { class: "vuefinder__breadcrumb__hidden-item-text" }, ru = /* @__PURE__ */ X({
  __name: "Breadcrumb",
  setup(o) {
    const e = Z(), { t } = e.i18n, n = e.fs, a = e.config, d = W(a.state), l = W(n.path), r = W(n.loading), c = E(null), _ = kn(0, 100), g = E(5), w = E(!1), v = E(!1), k = N(() => l.value?.breadcrumb ?? []);
    function S(B, M) {
      return B.length > M ? [B.slice(-M), B.slice(0, -M)] : [B, []];
    }
    const x = N(
      () => S(k.value, g.value)[0]
    ), p = N(
      () => S(k.value, g.value)[1]
    );
    ue(_, () => {
      if (!c.value) return;
      const B = c.value.children;
      let M = 0, D = 0;
      const $ = 5, P = 1;
      g.value = $, Ae(() => {
        for (let G = B.length - 1; G >= 0; G--) {
          const U = B[G];
          if (M + U.offsetWidth > _.value - 40)
            break;
          M += parseInt(U.offsetWidth.toString(), 10), D++;
        }
        D < P && (D = P), D > $ && (D = $), g.value = D;
      });
    });
    const h = () => {
      c.value && (_.value = c.value.offsetWidth);
    }, f = E(null);
    _e(() => {
      f.value = new ResizeObserver(h), c.value && f.value.observe(c.value);
    }), xe(() => {
      f.value && f.value.disconnect();
    });
    const b = lt(e, ["vuefinder__drag-over"]);
    function C(B = null) {
      B ??= k.value.length - 2;
      const M = {
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
      return k.value[B] ?? M;
    }
    const F = () => {
      e.adapter.invalidateListQuery(l.value.path), e.adapter.open(l.value.path);
    }, A = () => {
      x.value.length > 0 && e.adapter.open(
        k.value[k.value.length - 2]?.path ?? (l.value?.storage ?? "local") + "://"
      );
    }, L = (B) => {
      e.adapter.open(B.path), w.value = !1;
    }, Y = () => {
      w.value && (w.value = !1);
    }, K = {
      mounted(B, M) {
        B.clickOutsideEvent = function(D) {
          B === D.target || B.contains(D.target) || M.value();
        }, document.body.addEventListener("click", B.clickOutsideEvent);
      },
      beforeUnmount(B) {
        document.body.removeEventListener("click", B.clickOutsideEvent);
      }
    }, ne = () => {
      a.toggle("showTreeView");
    }, V = E({
      x: 0,
      y: 0
    }), ee = (B, M = null) => {
      if (B.currentTarget instanceof HTMLElement) {
        const { x: D, y: $, height: P } = B.currentTarget.getBoundingClientRect();
        V.value = { x: D, y: $ + P };
      }
      w.value = M ?? !w.value;
    }, T = () => {
      v.value = !v.value;
    }, te = async () => {
      await it(l.value?.path || ""), de.success(t("Path copied to clipboard"));
    }, H = () => {
      v.value = !1;
    };
    return (B, M) => (u(), m("div", Nc, [
      i("span", {
        title: s(t)("Toggle Tree View")
      }, [
        O(s(Lc), {
          class: J(["vuefinder__breadcrumb__toggle-tree", s(d).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: ne
        }, null, 8, ["class"])
      ], 8, Uc),
      i("span", {
        title: s(t)("Go up a directory")
      }, [
        O(s(Sc), Ie({
          class: k.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, He(k.value.length ? s(b).events(C()) : {}), { onClick: A }), null, 16, ["class"])
      ], 8, jc),
      s(n).isLoading() ? (u(), m("span", {
        key: 1,
        title: s(t)("Cancel")
      }, [
        O(s(Dc), {
          onClick: M[0] || (M[0] = (D) => s(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Kc)) : (u(), m("span", {
        key: 0,
        title: s(t)("Refresh")
      }, [
        O(s(kc), { onClick: F })
      ], 8, Hc)),
      me(i("div", qc, [
        i("div", null, [
          O(s(Tc), Ie({ class: "vuefinder__breadcrumb__home-icon" }, He(s(b).events(C(-1))), {
            onClick: M[1] || (M[1] = le((D) => s(e).adapter.open(s(l).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        i("div", Gc, [
          p.value.length ? me((u(), m("div", Wc, [
            M[3] || (M[3] = i("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("div", Yc, [
              i("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: M[2] || (M[2] = (D) => ee(D, !0)),
                onClick: le(ee, ["stop"])
              }, [
                O(s(Cn), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [K, Y]
          ]) : I("", !0)
        ]),
        i("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), m(fe, null, ge(x.value, (D, $) => (u(), m("div", { key: $ }, [
            M[4] || (M[4] = i("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("span", Ie({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: D.basename
            }, He(s(b).events(D), !0), {
              onClick: le((P) => s(e).adapter.open(D.path), ["stop"])
            }), y(D.name), 17, Qc)
          ]))), 128))
        ], 512),
        s(a).get("loadingIndicator") === "circular" && s(r) ? (u(), z(s(wt), { key: 0 })) : I("", !0),
        i("span", {
          title: s(t)("Toggle Path Copy Mode"),
          onClick: T
        }, [
          O(s(Rc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Xc)
      ], 512), [
        [Re, !v.value]
      ]),
      me(i("div", Jc, [
        i("div", Zc, [
          i("div", {
            title: s(t)("Copy Path")
          }, [
            O(s(It), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: te
            })
          ], 8, eu),
          i("div", tu, y(s(l).path), 1),
          i("div", {
            title: s(t)("Exit")
          }, [
            O(s(Ac), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: H
            })
          ], 8, nu)
        ])
      ], 512), [
        [Re, v.value]
      ]),
      (u(), z(ft, { to: "body" }, [
        i("div", null, [
          me(i("div", {
            style: Ne({
              position: "absolute",
              top: V.value.y + "px",
              left: V.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": s(e).theme.current
          }, [
            (u(!0), m(fe, null, ge(p.value, (D, $) => (u(), m("div", Ie({
              key: $,
              class: "vuefinder__breadcrumb__hidden-item"
            }, He(s(b).events(D), !0), {
              onClick: (P) => L(D)
            }), [
              i("div", iu, [
                i("span", null, [
                  O(s(Le), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                i("span", au, y(D.name), 1)
              ])
            ], 16, su))), 128))
          ], 12, ou), [
            [Re, w.value]
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
const en = { render: du }, cu = { class: "vuefinder__drag-item__container" }, uu = { class: "vuefinder__drag-item__count" }, vu = /* @__PURE__ */ X({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(o) {
    const e = o;
    return (t, n) => (u(), m("div", cu, [
      e.count > 1 ? (u(), z(s(en), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : I("", !0),
      O(s(en), { class: "vuefinder__drag-item__icon" }),
      i("div", uu, y(e.count), 1)
    ]));
  }
}), fu = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, tn = /* @__PURE__ */ X({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(o) {
    const e = o, t = Z(), n = W(t.config.state), a = {
      app: t,
      config: n.value,
      item: e.item
    };
    return (d, l) => (u(), m("div", {
      class: J(["vuefinder__item-icon", o.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      Se(d.$slots, "icon", Ke(qe(a)), () => [
        o.item.type === "dir" ? (u(), z(s(Le), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), z(s(st), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        o.ext && o.item.type !== "dir" && o.item.extension ? (u(), m("div", fu, y(o.item.extension.substring(0, 3)), 1)) : I("", !0)
      ])
    ], 2));
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
const nn = { render: pu }, hu = ["data-key", "data-row", "data-col", "draggable"], mu = { key: 0 }, gu = { class: "vuefinder__explorer__item-grid-content" }, wu = ["data-src", "alt"], yu = { class: "vuefinder__explorer__item-title" }, bu = {
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
}, Pu = /* @__PURE__ */ X({
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
    const t = o, n = e, a = Z(), d = a.fs, l = a.config, r = N(() => {
      const V = a.selectionFilterType;
      return !V || V === "both" ? !0 : V === "files" && t.item.type === "file" || V === "dirs" && t.item.type === "dir";
    }), c = N(() => {
      const V = a.selectionFilterMimeIncludes;
      return !V || !V.length || t.item.type === "dir" ? !0 : t.item.mime_type ? V.some((ee) => t.item.mime_type?.startsWith(ee)) : !1;
    }), _ = N(() => r.value && c.value), g = N(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), w = N(() => ({
      opacity: t.isDragging || d.isCut(t.item.path) || !_.value ? 0.5 : ""
    })), v = E(null);
    let k = !1, S = null, x = null, p = !1;
    const { enabled: h } = Oe(), f = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), b = N(() => f ? !1 : h("move")), C = () => {
      S && (clearTimeout(S), S = null), x = null;
    }, F = (V) => {
      C(), x = V, p = !1, V.stopPropagation(), S = setTimeout(() => {
        !x || S === null || (p = !0, x.cancelable && x.preventDefault(), x.stopPropagation(), n("contextmenu", x), C());
      }, 500);
    }, A = (V) => {
      if (p) {
        V.preventDefault(), V.stopPropagation(), C();
        return;
      }
      setTimeout(() => {
        p || (C(), ne(V));
      }, 100);
    }, L = (V) => {
      if (!x) return;
      const ee = x.touches[0] || x.changedTouches[0], T = V.touches[0] || V.changedTouches[0];
      if (ee && T) {
        const te = Math.abs(T.clientX - ee.clientX), H = Math.abs(T.clientY - ee.clientY);
        (te > 15 || H > 15) && C();
      }
    }, Y = (V) => {
      f || n("click", V);
    }, K = (V) => {
      if (p)
        return V.preventDefault(), V.stopPropagation(), !1;
      n("dragstart", V);
    }, ne = (V) => {
      if (!k)
        k = !0, n("click", V), v.value = setTimeout(() => {
          k = !1;
        }, 300);
      else
        return k = !1, n("dblclick", V), !1;
    };
    return (V, ee) => (u(), m("div", {
      class: J(g.value),
      style: Ne(w.value),
      "data-key": o.item.path,
      "data-row": o.rowIndex,
      "data-col": o.colIndex,
      draggable: b.value,
      onTouchstartCapture: ee[1] || (ee[1] = (T) => F(T)),
      onTouchendCapture: ee[2] || (ee[2] = (T) => A(T)),
      onTouchmoveCapture: L,
      onTouchcancelCapture: ee[3] || (ee[3] = () => C()),
      onClick: Y,
      onDblclick: ee[4] || (ee[4] = (T) => n("dblclick", T)),
      onContextmenu: ee[5] || (ee[5] = le((T) => n("contextmenu", T), ["prevent", "stop"])),
      onDragstart: K,
      onDragend: ee[6] || (ee[6] = (T) => n("dragend", T))
    }, [
      o.view === "grid" ? (u(), m("div", mu, [
        s(d).isReadOnly(o.item) ? (u(), z(s(nn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : I("", !0),
        i("div", gu, [
          (o.item.mime_type ?? "").startsWith("image") && o.showThumbnails ? (u(), m("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": o.item.previewUrl ?? s(a).adapter.getPreviewUrl({ path: o.item.path }),
            alt: o.item.basename,
            onTouchstart: ee[0] || (ee[0] = (T) => T.preventDefault())
          }, null, 40, wu)) : (u(), z(tn, {
            key: 1,
            item: o.item,
            ext: !0
          }, {
            icon: se((T) => [
              Se(V.$slots, "icon", Ke(qe(T)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        i("span", yu, y(s(Ct)(o.item.basename)), 1)
      ])) : (u(), m("div", bu, [
        i("div", ku, [
          i("div", $u, [
            O(tn, {
              item: o.item,
              small: o.compact
            }, {
              icon: se((T) => [
                Se(V.$slots, "icon", Ke(qe(T)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          i("span", xu, y(o.item.basename), 1),
          i("div", null, [
            s(d).isReadOnly(o.item) ? (u(), z(s(nn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : I("", !0)
          ])
        ]),
        o.showPath ? (u(), m("div", Su, y(o.item.path), 1)) : I("", !0),
        o.showPath ? I("", !0) : (u(), m("div", Cu, [
          o.item.file_size ? (u(), m("div", Fu, y(s(a).filesize(o.item.file_size)), 1)) : I("", !0)
        ])),
        !o.showPath && o.item.last_modified ? (u(), m("div", Du, y(new Date(o.item.last_modified * 1e3).toLocaleString()), 1)) : I("", !0)
      ])),
      s(h)("pinned") && s(l).get("pinnedFolders").find((T) => T.path === o.item.path) ? (u(), z(s(At), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : I("", !0)
    ], 46, hu));
  }
}), Eu = ["data-row"], on = /* @__PURE__ */ X({
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
    const t = o, n = e, a = N(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), d = N(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), l = N(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (r, c) => (u(), m("div", {
      class: J(a.value),
      "data-row": o.rowIndex,
      style: Ne(d.value)
    }, [
      i("div", {
        class: J(["grid justify-self-start", { "w-full": o.view === "list" }]),
        style: Ne(l.value)
      }, [
        (u(!0), m(fe, null, ge(o.items, (_, g) => (u(), z(Pu, Ie({
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
        }, He(o.dragNDropEvents(_)), {
          onClick: c[0] || (c[0] = (w) => n("click", w)),
          onDblclick: c[1] || (c[1] = (w) => n("dblclick", w)),
          onContextmenu: c[2] || (c[2] = (w) => n("contextmenu", w)),
          onDragstart: c[3] || (c[3] = (w) => n("dragstart", w)),
          onDragend: c[4] || (c[4] = (w) => n("dragend", w))
        }), {
          icon: se((w) => [
            Se(r.$slots, "icon", Ie({ ref_for: !0 }, w))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Eu));
  }
}), Tu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Mu(o, e) {
  return u(), m("svg", Tu, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Iu = { render: Mu }, Au = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
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
const Bu = { render: Ou }, kt = /* @__PURE__ */ X({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(o) {
    return (e, t) => (u(), m("div", null, [
      o.direction === "asc" ? (u(), z(s(Iu), { key: 0 })) : I("", !0),
      o.direction === "desc" ? (u(), z(s(Bu), { key: 1 })) : I("", !0)
    ]));
  }
}), Lu = { class: "vuefinder__explorer__header" }, zu = /* @__PURE__ */ X({
  __name: "ExplorerHeader",
  props: {
    fs: {},
    fsSortState: {},
    t: { type: Function }
  },
  setup(o) {
    const e = o, { fs: t, fsSortState: n, t: a } = e;
    return (d, l) => (u(), m("div", Lu, [
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: l[0] || (l[0] = (r) => s(t).toggleSort("basename"))
      }, [
        ce(y(s(a)("Name")) + " ", 1),
        me(O(kt, {
          direction: s(n).order
        }, null, 8, ["direction"]), [
          [Re, s(n).active && s(n).column === "basename"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: l[1] || (l[1] = (r) => s(t).toggleSort("file_size"))
      }, [
        ce(y(s(a)("Size")) + " ", 1),
        me(O(kt, {
          direction: s(n).order
        }, null, 8, ["direction"]), [
          [Re, s(n).active && s(n).column === "file_size"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: l[2] || (l[2] = (r) => s(t).toggleSort("last_modified"))
      }, [
        ce(y(s(a)("Date")) + " ", 1),
        me(O(kt, {
          direction: s(n).order
        }, null, 8, ["direction"]), [
          [Re, s(n).active && s(n).column === "last_modified"]
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
  } = e, c = o, _ = () => typeof a == "number" ? a : a.value, g = E(0), w = E(6), v = E(600);
  let k = null;
  const S = N(() => Math.ceil(c.value.length / w.value)), x = N(() => S.value * _()), p = N(() => {
    const K = _(), ne = Math.max(0, Math.floor(g.value / K) - d), V = Math.min(
      S.value,
      Math.ceil((g.value + v.value) / K) + d
    );
    return { start: ne, end: V };
  }), h = N(() => {
    const { start: K, end: ne } = p.value;
    return Array.from({ length: ne - K }, (V, ee) => K + ee);
  }), f = () => v.value, b = () => r.value, C = () => {
    if (b()) {
      w.value = 1;
      return;
    }
    if (t.value) {
      const K = t.value.clientWidth - l;
      w.value = Math.max(Math.floor(K / n), 2);
    }
  }, F = (K) => {
    const ne = K.target;
    g.value = ne.scrollTop;
  };
  ue(
    () => c.value.length,
    () => {
      C();
    }
  );
  const A = (K, ne) => {
    if (!K || !Array.isArray(K))
      return [];
    const V = ne * w.value;
    return K.slice(V, V + w.value);
  }, L = (K, ne, V, ee, T) => {
    if (!K || !Array.isArray(K))
      return [];
    const te = [];
    for (let H = ne; H <= V; H++)
      for (let B = ee; B <= T; B++) {
        const M = H * w.value + B;
        M < K.length && K[M] && te.push(K[M]);
      }
    return te;
  }, Y = (K) => ({
    row: Math.floor(K / w.value),
    col: K % w.value
  });
  return _e(async () => {
    await Ae(), t.value && (v.value = t.value.clientHeight || 600), C(), window.addEventListener("resize", () => {
      t.value && (v.value = t.value.clientHeight || 600), C();
    }), t.value && "ResizeObserver" in window && (k = new ResizeObserver((K) => {
      const ne = K[0];
      ne && (v.value = Math.round(ne.contentRect.height)), C();
    }), k.observe(t.value));
  }), xe(() => {
    window.removeEventListener("resize", C), k && (k.disconnect(), k = null);
  }), {
    scrollTop: g,
    itemsPerRow: w,
    totalRows: S,
    totalHeight: x,
    visibleRange: p,
    visibleRows: h,
    updateItemsPerRow: C,
    handleScroll: F,
    getRowItems: A,
    getItemsInRange: L,
    getItemPosition: Y,
    getContainerHeight: f
  };
}
function Ru(o) {
  const { getItemPosition: e, getItemsInRange: t, getKey: n, selectionObject: a, rowHeight: d, itemWidth: l, osInstance: r } = o, c = Math.floor(Math.random() * 2 ** 32).toString(), _ = Z(), g = _.fs, w = W(g.selectedKeys), v = W(g.sortedFiles), k = N(() => {
    const $ = /* @__PURE__ */ new Map();
    return v.value && v.value.forEach((P) => {
      $.set(n(P), P);
    }), $;
  }), S = E(/* @__PURE__ */ new Set()), x = E(!1), p = E(!1), h = E(null), f = ($) => $.map((P) => P.getAttribute("data-key")).filter((P) => !!P), b = ($) => {
    $.selection.clearSelection(!0, !0);
  }, C = ($) => {
    if (w.value && w.value.size > 0) {
      const P = document.querySelectorAll(`.file-item-${c}[data-key]`), G = /* @__PURE__ */ new Map();
      P.forEach((oe) => {
        const re = oe.getAttribute("data-key");
        re && G.set(re, oe);
      });
      const U = [];
      w.value.forEach((oe) => {
        const re = G.get(oe);
        re && F(oe) && U.push(re);
      }), U.forEach((oe) => {
        $.selection.select(oe, !0);
      });
    }
  }, F = ($) => {
    const P = k.value.get($);
    if (!P) return !1;
    const G = _.selectionFilterType, U = _.selectionFilterMimeIncludes;
    return G === "files" && P.type === "dir" || G === "dirs" && P.type === "file" ? !1 : U && Array.isArray(U) && U.length > 0 ? P.type === "dir" ? !0 : P.mime_type ? U.some((oe) => P.mime_type?.startsWith(oe)) : !1 : !0;
  }, A = ($) => {
    if ($.size === 0)
      return null;
    const P = /* @__PURE__ */ new Map();
    v.value && v.value.forEach((ve, pe) => {
      P.set(n(ve), pe);
    });
    const U = Array.from($).map((ve) => {
      const pe = P.get(ve) ?? -1;
      return pe >= 0 ? e(pe) : null;
    }).filter((ve) => ve !== null);
    if (U.length === 0)
      return null;
    const oe = U[0], re = U.reduce((ve, pe) => pe.row < ve ? pe.row : ve, oe.row), we = U.reduce((ve, pe) => pe.row > ve ? pe.row : ve, oe.row), ye = U.reduce((ve, pe) => pe.col < ve ? pe.col : ve, oe.col), ze = U.reduce((ve, pe) => pe.col > ve ? pe.col : ve, oe.col);
    return { minRow: re, maxRow: we, minCol: ye, maxCol: ze };
  }, L = ($) => {
    if (_.selectionMode === "single")
      return !1;
    x.value = !1, !$.event?.metaKey && !$.event?.ctrlKey && (p.value = !0), $.selection.resolveSelectables(), b($), C($);
  }, Y = E(0), K = ($) => {
    const P = $;
    if (P && "touches" in P) {
      const G = P.touches?.[0];
      if (G) return { x: G.clientX, y: G.clientY };
    }
    if (P && "changedTouches" in P) {
      const G = P.changedTouches?.[0];
      if (G) return { x: G.clientX, y: G.clientY };
    }
    if (P && "clientX" in P && "clientY" in P) {
      const G = P;
      return { x: G.clientX, y: G.clientY };
    }
    return null;
  }, ne = ({ event: $, selection: P }) => {
    Y.value = (a.value?.getAreaLocation().y1 ?? 0) - (_.root.getBoundingClientRect().top ?? 0);
    const G = document.querySelector(
      ".selection-area-container"
    );
    if (G && (G.dataset.theme = _.theme.current), _.selectionMode === "single")
      return;
    const U = $;
    U && "type" in U && U.type === "touchend" && U.preventDefault();
    const oe = $;
    if (!oe?.ctrlKey && !oe?.metaKey && (g.clearSelection(), P.clearSelection(!0, !0)), S.value.clear(), a.value) {
      const re = a.value.getSelectables()[0]?.closest(".scroller-" + c);
      if (re) {
        const we = re.getBoundingClientRect(), ye = K($);
        if (ye) {
          const ze = ye.y - we.top + re.scrollTop, ve = ye.x - we.left, pe = Math.floor(ze / d.value), j = Math.floor(ve / l);
          h.value = { row: pe, col: j };
        }
      }
    }
  }, V = ($) => {
    if (_.selectionMode === "single")
      return;
    const P = f($.store.changed.added), G = f($.store.changed.removed);
    p.value = !1, x.value = !0, P.forEach((U) => {
      w.value && !w.value.has(U) && F(U) && (S.value.add(U), g.select(U, _.selectionMode || "multiple"));
    }), G.forEach((U) => {
      document.querySelector(`[data-key="${U}"]`) && k.value.has(U) && S.value.delete(U), g.deselect(U);
    }), $.selection.resolveSelectables(), C($);
  }, ee = () => {
    S.value.clear();
  }, T = ($) => {
    if ($.event && h.value && S.value.size > 0) {
      const P = /* @__PURE__ */ new Map();
      v.value && v.value.forEach((oe, re) => {
        P.set(n(oe), re);
      });
      const U = Array.from(S.value).map((oe) => {
        const re = P.get(oe) ?? -1;
        return re >= 0 ? e(re) : null;
      }).filter((oe) => oe !== null);
      if (U.length > 0) {
        const oe = [...U, h.value], re = oe[0], we = {
          minRow: oe.reduce((j, ae) => ae.row < j ? ae.row : j, re.row),
          maxRow: oe.reduce((j, ae) => ae.row > j ? ae.row : j, re.row),
          minCol: oe.reduce((j, ae) => ae.col < j ? ae.col : j, re.col),
          maxCol: oe.reduce((j, ae) => ae.col > j ? ae.col : j, re.col)
        }, ye = t(
          v.value || [],
          we.minRow,
          we.maxRow,
          we.minCol,
          we.maxCol
        ), ze = document.querySelectorAll(`.file-item-${c}[data-key]`), ve = /* @__PURE__ */ new Map();
        ze.forEach((j) => {
          const ae = j.getAttribute("data-key");
          ae && ve.set(ae, j);
        });
        const pe = [];
        if (ye.forEach((j) => {
          const ae = n(j);
          ve.get(ae) || pe.push(ae);
        }), pe.length > 0) {
          const j = _.selectionMode || "multiple";
          g.selectMultiple(pe, j);
        }
      }
    }
  }, te = ($) => {
    T($), b($), C($), g.setSelectedCount(w.value?.size || 0), x.value = !1, h.value = null;
  }, H = () => {
    let $ = [".scroller-" + c];
    if (r?.value) {
      const { viewport: P } = r.value.elements();
      P && ($ = P);
    }
    a.value = new Jn({
      selectables: [".file-item-" + c + ":not(.vf-explorer-item--unselectable)"],
      boundaries: $,
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
    }), a.value.on("beforestart", L), a.value.on("start", ne), a.value.on("move", V), a.value.on("stop", te);
  }, B = () => {
    a.value && (a.value.destroy(), a.value = null);
  }, M = () => {
    a.value && (Array.from(
      w.value ?? /* @__PURE__ */ new Set()
    ).forEach((P) => {
      F(P) || g.deselect(P);
    }), B(), H());
  }, D = ($) => {
    p.value && (a.value?.clearSelection(), ee(), p.value = !1);
    const P = $;
    !S.value.size && !p.value && !P?.ctrlKey && !P?.metaKey && (g.clearSelection(), a.value?.clearSelection());
  };
  return _e(() => {
    const $ = (P) => {
      !P.buttons && x.value && (x.value = !1);
    };
    document.addEventListener("dragleave", $), xe(() => {
      document.removeEventListener("dragleave", $);
    });
  }), {
    isDragging: x,
    selectionStarted: p,
    explorerId: c,
    extractIds: f,
    cleanupSelection: b,
    refreshSelection: C,
    getSelectionRange: A,
    selectSelectionRange: T,
    initializeSelectionArea: H,
    destroySelectionArea: B,
    updateSelectionArea: M,
    handleContentClick: D
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
function ju(o, e, t, n, a, d, l) {
  const r = o.fs, { canSelectItem: c } = Nu(o), { openItem: _ } = Uu(o), g = (p) => {
    const h = p.target?.closest(".file-item-" + e);
    if (!h) return null;
    const f = String(h.getAttribute("data-key")), b = t.value?.find((C) => C.path === f);
    return { key: f, item: b };
  }, w = () => {
    const p = n.value;
    return t.value?.filter((h) => p?.has(h.path)) || [];
  };
  return {
    handleItemClick: (p) => {
      const h = g(p);
      if (!h) return;
      const { key: f, item: b } = h, C = p;
      if (!c(b))
        return;
      const F = o.selectionMode || "multiple";
      !C?.ctrlKey && !C?.metaKey && (p.type !== "touchstart" || !r.isSelected(f)) && (r.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), p.type === "touchstart" && r.isSelected(f) ? r.select(f, F) : r.toggleSelect(f, F), r.setSelectedCount(n.value?.size || 0);
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
function Hu(o, e) {
  const t = E(null);
  return _e(() => {
    if (et.plugin([Xn]), o.value) {
      const n = et(
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
  }), xe(() => {
    if (t.value) {
      const { viewport: n } = t.value.elements();
      n && n.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
function Ku(o, e) {
  const t = E(null);
  return _e(() => {
    o.value && (t.value = new cn({
      elements_selector: ".lazy",
      container: o.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), Nn(() => {
    t.value && t.value.update();
  }), xe(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const qu = { class: "vuefinder__explorer__container" }, Gu = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Wu = /* @__PURE__ */ X({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(o) {
    const e = o, t = Z(), n = lt(t, ["vuefinder__drag-over"]), a = We("dragImage"), d = sn(null), l = We("scrollContainer"), r = We("scrollContent"), c = t.fs, _ = t.config, g = W(_.state), w = W(c.sort), v = W(c.sortedFiles), k = W(c.selectedKeys), S = W(c.loading), x = (j) => k.value?.has(j) ?? !1, p = N(() => {
      const j = g.value.view, ae = g.value.compactListView;
      return j === "grid" ? 88 : ae ? 24 : 50;
    }), { t: h } = t.i18n, {
      itemsPerRow: f,
      totalHeight: b,
      visibleRows: C,
      handleScroll: F,
      getRowItems: A,
      getItemsInRange: L,
      getItemPosition: Y,
      updateItemsPerRow: K
    } = Vu(
      N(() => v.value ?? []),
      {
        scrollContainer: l,
        itemWidth: 104,
        rowHeight: p,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: N(() => g.value.view === "list")
      }
    ), { osInstance: ne } = Hu(l, F), {
      explorerId: V,
      isDragging: ee,
      initializeSelectionArea: T,
      updateSelectionArea: te,
      handleContentClick: H
    } = Ru({
      getItemPosition: Y,
      getItemsInRange: L,
      getKey: (j) => j.path,
      selectionObject: d,
      rowHeight: p,
      itemWidth: 104,
      osInstance: ne
    }), B = E(null), M = (j) => {
      if (!j || !B.value) return !1;
      const ae = k.value?.has(B.value) ?? !1;
      return ee.value && (ae ? k.value?.has(j) ?? !1 : j === B.value);
    };
    ue(
      () => _.get("view"),
      (j) => {
        j === "list" ? f.value = 1 : K();
      },
      { immediate: !0 }
    ), ue(f, (j) => {
      _.get("view") === "list" && j !== 1 && (f.value = 1);
    });
    const D = (j) => v.value?.[j];
    Ku(l, t);
    const { handleItemClick: $, handleItemDblClick: P, handleItemContextMenu: G, handleContentContextMenu: U } = ju(
      t,
      V,
      v,
      k,
      d,
      e.onFileDclick,
      e.onFolderDclick
    );
    _e(() => {
      const j = () => {
        d.value || T(), d.value && d.value.on("beforestart", ({ event: ae }) => {
          const he = ae?.target === r.value;
          if (!ae?.metaKey && !ae?.ctrlKey && !ae?.altKey && !he)
            return !1;
        });
      };
      if (ne.value)
        j();
      else {
        const ae = setInterval(() => {
          ne.value && (clearInterval(ae), j());
        }, 50);
        setTimeout(() => {
          clearInterval(ae), d.value || j();
        }, 500);
      }
      ue(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], te, {
        deep: !0
      });
    });
    const oe = (j) => {
      if (!(t.features?.move ?? !1) || j.altKey || j.ctrlKey || j.metaKey)
        return j.preventDefault(), !1;
      ee.value = !0;
      const he = j.target?.closest(
        ".file-item-" + V
      );
      if (B.value = he ? String(he.dataset.key) : null, j.dataTransfer && B.value) {
        j.dataTransfer.setDragImage(a.value, 0, 15), j.dataTransfer.effectAllowed = "all", j.dataTransfer.dropEffect = "copy";
        const Ee = k.value?.has(B.value) ? Array.from(k.value) : [B.value];
        j.dataTransfer.setData("items", JSON.stringify(Ee)), c.setDraggedItem(B.value);
      }
    }, re = () => {
      B.value = null;
    };
    let we = null, ye = null;
    const ze = (j) => {
      j.target?.closest(".file-item-" + V) || (ye = j, we && clearTimeout(we), we = setTimeout(() => {
        ye && (ye.cancelable && ye.preventDefault(), ye.stopPropagation(), U(ye)), ye = null, we = null;
      }, 500));
    }, ve = (j) => {
      we && (clearTimeout(we), we = null), ye = null;
    }, pe = (j) => {
      if (!ye) return;
      const ae = ye.touches[0] || ye.changedTouches[0], he = j.touches[0] || j.changedTouches[0];
      if (ae && he) {
        const Ee = Math.abs(he.clientX - ae.clientX), Kt = Math.abs(he.clientY - ae.clientY);
        (Ee > 15 || Kt > 15) && (we && (clearTimeout(we), we = null), ye = null);
      }
    };
    return (j, ae) => (u(), m("div", qu, [
      s(g).view === "list" ? (u(), z(zu, {
        key: 0,
        fs: s(c),
        "fs-sort-state": s(w),
        t: s(h)
      }, null, 8, ["fs", "fs-sort-state", "t"])) : I("", !0),
      i("div", {
        ref_key: "scrollContainer",
        ref: l,
        class: J(["vuefinder__explorer__selector-area", "scroller-" + s(V)])
      }, [
        s(_).get("loadingIndicator") === "linear" && s(S) ? (u(), m("div", Gu)) : I("", !0),
        i("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Ne({ height: `${s(b)}px`, position: "relative", width: "100%" }),
          onContextmenu: ae[0] || (ae[0] = le(
            //@ts-ignore
            (...he) => s(U) && s(U)(...he),
            ["self", "prevent"]
          )),
          onClick: ae[1] || (ae[1] = le(
            //@ts-ignore
            (...he) => s(H) && s(H)(...he),
            ["self"]
          )),
          onTouchstartCapture: le(ze, ["self"]),
          onTouchendCapture: le(ve, ["self"]),
          onTouchmoveCapture: le(pe, ["self"]),
          onTouchcancelCapture: le(ve, ["self"])
        }, [
          i("div", {
            ref_key: "dragImage",
            ref: a,
            class: "vuefinder__explorer__drag-item"
          }, [
            O(vu, {
              count: B.value && s(k).has(B.value) ? s(k).size : 1
            }, null, 8, ["count"])
          ], 512),
          s(g).view === "grid" ? (u(!0), m(fe, { key: 0 }, ge(s(C), (he) => (u(), z(on, {
            key: he,
            "row-index": he,
            "row-height": p.value,
            view: "grid",
            "items-per-row": s(f),
            items: s(A)(s(v), he),
            "show-thumbnails": s(g).showThumbnails,
            "is-dragging-item": M,
            "is-selected": x,
            "drag-n-drop-events": (Ee) => s(n).events(Ee),
            "explorer-id": s(V),
            onClick: s($),
            onDblclick: s(P),
            onContextmenu: s(G),
            onDragstart: oe,
            onDragend: re
          }, {
            icon: se((Ee) => [
              Se(j.$slots, "icon", Ie({ ref_for: !0 }, Ee))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), m(fe, { key: 1 }, ge(s(C), (he) => (u(), z(on, {
            key: he,
            "row-index": he,
            "row-height": p.value,
            view: "list",
            items: D(he) ? [D(he)] : [],
            compact: s(g).compactListView,
            "is-dragging-item": M,
            "is-selected": x,
            "drag-n-drop-events": (Ee) => s(n).events(Ee),
            "explorer-id": s(V),
            onClick: s($),
            onDblclick: s(P),
            onContextmenu: s(G),
            onDragstart: oe,
            onDragend: re
          }, {
            icon: se((Ee) => [
              Se(j.$slots, "icon", Ie({ ref_for: !0 }, Ee))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), Yu = ["href", "download"], Qu = ["onClick"], Xu = /* @__PURE__ */ X({
  __name: "ContextMenu",
  setup(o) {
    const e = Z(), t = E(null), n = E([]);
    let a = null, d = null;
    const l = vt({
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
      l.items = (e.contextMenuItems || []).filter((S) => S.show(e, {
        items: v,
        target: k
      })).sort((S, x) => {
        const p = S.order ?? 1 / 0, h = x.order ?? 1 / 0;
        return p - h;
      }), k ? v.length > 1 && v.some((S) => S.path === k.path) ? e.emitter.emit("vf-context-selected", v) : e.emitter.emit("vf-context-selected", [k]) : e.emitter.emit("vf-context-selected", []), _(w);
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
      }, l.active = !0, await Ae(), !t.value || !d) return;
      await new Promise((p) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(p);
        });
      });
      const k = [
        tt(8),
        nt({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        ot({ padding: 16 })
      ];
      let S = 0, x = 0;
      try {
        const p = await Ye(d, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: k
        });
        S = p.x, x = p.y;
      } catch (p) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", p);
        return;
      }
      l.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${S}px`,
        top: `${x}px`,
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
            a = Dt(d, t.value, async () => {
              if (!(!d || !t.value))
                try {
                  const { x: p, y: h } = await Ye(d, t.value, {
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
    return xe(() => {
      a && (a(), a = null), d = null;
    }), (g, w) => me((u(), m("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: J([{
        "vuefinder__context-menu--active": l.active,
        "vuefinder__context-menu--inactive": !l.active
      }, "vuefinder__context-menu"]),
      style: Ne(l.positions)
    }, [
      (u(!0), m(fe, null, ge(l.items, (v) => (u(), m("li", {
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
        ], 8, Yu)) : (u(), m("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (k) => c(v)
        }, [
          i("span", null, y(v.title(s(e).i18n)), 1)
        ], 8, Qu))
      ]))), 128))
    ], 6)), [
      [Re, l.active]
    ]);
  }
}), Ju = { class: "vuefinder__status-bar__wrapper" }, Zu = { class: "vuefinder__status-bar__storage" }, ev = ["title"], tv = { class: "vuefinder__status-bar__storage-icon" }, nv = ["value"], ov = ["value"], sv = { class: "vuefinder__status-bar__info space-x-2" }, iv = { key: 0 }, av = { key: 1 }, rv = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, lv = { class: "vuefinder__status-bar__actions" }, dv = /* @__PURE__ */ X({
  __name: "Statusbar",
  setup(o) {
    const e = Z(), { t } = e.i18n, n = e.fs, a = W(n.sortedFiles), d = W(n.path), l = W(n.selectedCount), r = W(n.storages), c = W(n.selectedItems), _ = W(n.path), g = (p) => {
      const h = p.target.value;
      e.adapter.open(h + "://");
    }, w = N(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((p, h) => p + (h.file_size || 0), 0)), v = N(() => r.value), k = N(() => a.value), S = N(() => l.value || 0), x = N(() => c.value || []);
    return (p, h) => (u(), m("div", Ju, [
      i("div", Zu, [
        i("div", {
          class: "vuefinder__status-bar__storage-container",
          title: s(t)("Storage")
        }, [
          i("div", tv, [
            O(s(Ot))
          ]),
          i("select", {
            name: "vuefinder-media-selector",
            value: s(d).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: g
          }, [
            (u(!0), m(fe, null, ge(v.value, (f) => (u(), m("option", {
              key: f,
              value: f
            }, y(f), 9, ov))), 128))
          ], 40, nv),
          h[0] || (h[0] = i("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, ev),
        i("div", sv, [
          S.value === 0 ? (u(), m("span", iv, y(k.value.length) + " " + y(s(t)("items")), 1)) : (u(), m("span", av, [
            ce(y(S.value) + " " + y(s(t)("selected")) + " ", 1),
            w.value ? (u(), m("span", rv, y(s(e).filesize(w.value)), 1)) : I("", !0)
          ]))
        ])
      ]),
      i("div", lv, [
        Se(p.$slots, "actions", {
          path: s(_).path,
          count: S.value || 0,
          selected: x.value
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
function An(o, e) {
  const t = o.findIndex((n) => n.path === e.path);
  t > -1 ? o[t] = e : o.push(e);
}
const fv = { class: "vuefinder__folder-loader-indicator" }, _v = {
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
  setup(o) {
    const e = o, t = Z(), n = dn(o, "modelValue"), a = E(!1);
    ue(
      () => n.value,
      () => d()
    );
    const d = async () => {
      a.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        An(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (l) {
        De(l, "Failed to fetch subfolders");
      } finally {
        a.value = !1;
      }
    };
    return (l, r) => (u(), m("div", fv, [
      a.value ? (u(), z(s(wt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), m("div", _v, [
        n.value ? (u(), z(s(gt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : I("", !0),
        n.value ? I("", !0) : (u(), z(s(mt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), pv = { key: 0 }, hv = { class: "vuefinder__treesubfolderlist__no-folders" }, mv = { class: "vuefinder__treesubfolderlist__item-content" }, gv = ["onClick"], wv = ["title", "onDblclick", "onClick"], yv = { class: "vuefinder__treesubfolderlist__item-icon" }, bv = { class: "vuefinder__treesubfolderlist__subfolder" }, kv = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, $v = /* @__PURE__ */ X({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(o) {
    const e = Z(), t = e.fs, n = lt(e, ["vuefinder__drag-over"]), a = E({}), { t: d } = e.i18n, l = W(t.path), r = o, c = E(null), _ = E(50);
    _e(() => {
      r.path === r.storage + "://" && c.value && et(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const g = N(() => {
      const x = e.treeViewData.find((p) => p.path === r.path)?.folders || [];
      return x.length > _.value ? x.slice(0, _.value) : x;
    }), w = N(() => e.treeViewData.find((x) => x.path === r.path)?.folders?.length || 0), v = N(() => w.value > _.value), k = () => {
      _.value += 50;
    };
    return (S, x) => {
      const p = rn("TreeSubfolderList", !0);
      return u(), m("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        g.value.length ? I("", !0) : (u(), m("li", pv, [
          i("div", hv, y(s(d)("No folders")), 1)
        ])),
        (u(!0), m(fe, null, ge(g.value, (h) => (u(), m("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          i("div", mv, [
            i("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (f) => a.value[h.path] = !a.value[h.path]
            }, [
              O(On, {
                modelValue: a.value[h.path],
                "onUpdate:modelValue": (f) => a.value[h.path] = f,
                storage: o.storage,
                path: h.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, gv),
            i("div", Ie({
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
              onDblclick: (f) => a.value[h.path] = !a.value[h.path],
              onClick: (f) => s(e).adapter.open(h.path)
            }), [
              i("div", yv, [
                s(l)?.path === h.path ? (u(), z(s(Bt), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), z(s(Le), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              i("div", {
                class: J(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": s(l).path === h.path
                }])
              }, y(h.basename), 3)
            ], 16, wv)
          ]),
          i("div", bv, [
            me(O(p, {
              storage: r.storage,
              path: h.path
            }, null, 8, ["storage", "path"]), [
              [Re, a.value[h.path]]
            ])
          ])
        ]))), 128)),
        v.value ? (u(), m("li", kv, [
          i("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: k
          }, y(s(d)("load more")), 1)
        ])) : I("", !0)
      ], 512);
    };
  }
}), xv = /* @__PURE__ */ X({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(o) {
    const e = Z(), t = e.fs, n = E(!1), a = o, d = lt(e, ["vuefinder__drag-over"]), l = W(t.path), r = N(() => a.storage === l.value?.storage), c = {
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
        i("div", Ie({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, He(s(d).events(c), !0)), [
          i("div", {
            class: J(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            O(s(Ot))
          ], 2),
          i("div", null, y(o.storage), 1)
        ], 16),
        i("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: w[1] || (w[1] = le((v) => n.value = !n.value, ["stop"]))
        }, [
          O(On, {
            modelValue: n.value,
            "onUpdate:modelValue": w[0] || (w[0] = (v) => n.value = v),
            storage: o.storage,
            path: o.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      me(O($v, {
        storage: o.storage,
        path: o.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Re, n.value]
      ])
    ], 64));
  }
}), Sv = { class: "vuefinder__folder-indicator" }, Cv = { class: "vuefinder__folder-indicator--icon" }, Fv = /* @__PURE__ */ X({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const e = dn(o, "modelValue");
    return (t, n) => (u(), m("div", Sv, [
      i("div", Cv, [
        e.value ? (u(), z(s(gt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : I("", !0),
        e.value ? I("", !0) : (u(), z(s(mt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Dv = {
  key: 0,
  class: "vuefinder__treeview__header"
}, Pv = { class: "vuefinder__treeview__pinned-label" }, Ev = { class: "vuefinder__treeview__pin-text text-nowrap" }, Tv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Mv = ["onClick"], Iv = ["title"], Av = ["onClick"], Ov = { key: 0 }, Bv = { class: "vuefinder__treeview__no-pinned" }, Lv = /* @__PURE__ */ X({
  __name: "TreeView",
  setup(o) {
    const e = Z(), { enabled: t } = Oe(), { t: n } = e.i18n, { getStore: a, setStore: d } = e.storage, l = e.fs, r = e.config, c = W(r.state), _ = W(l.sortedFiles), g = W(l.storages), w = N(() => g.value || []), v = W(l.path), k = lt(e, ["vuefinder__drag-over"]), S = E(190), x = E(a("pinned-folders-opened", !0));
    ue(x, (b) => d("pinned-folders-opened", b));
    const p = (b) => {
      const C = r.get("pinnedFolders");
      r.set("pinnedFolders", C.filter((F) => F.path !== b.path));
    }, h = (b) => {
      const C = b.clientX, F = b.target.parentElement;
      if (!F) return;
      const A = F.getBoundingClientRect().width;
      F.classList.remove("transition-[width]"), F.classList.add("transition-none");
      const L = (K) => {
        S.value = A + K.clientX - C, S.value < 50 && (S.value = 0, r.set("showTreeView", !1)), S.value > 50 && r.set("showTreeView", !0);
      }, Y = () => {
        const K = F.getBoundingClientRect();
        S.value = K.width, F.classList.add("transition-[width]"), F.classList.remove("transition-none"), window.removeEventListener("mousemove", L), window.removeEventListener("mouseup", Y);
      };
      window.addEventListener("mousemove", L), window.addEventListener("mouseup", Y);
    }, f = E(null);
    return _e(() => {
      f.value && et(f.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ue(_, (b) => {
      const C = b.filter((F) => F.type === "dir");
      An(e.treeViewData, {
        path: v.value.path || "",
        folders: C.map((F) => ({
          storage: F.storage,
          path: F.path,
          basename: F.basename,
          type: "dir"
        }))
      });
    }), (b, C) => (u(), m(fe, null, [
      i("div", {
        class: J(["vuefinder__treeview__overlay", s(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: C[0] || (C[0] = (F) => s(r).toggle("showTreeView"))
      }, null, 2),
      i("div", {
        style: Ne(
          s(c).showTreeView ? "min-width:100px;max-width:75%; width: " + S.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        i("div", {
          ref_key: "treeViewScrollElement",
          ref: f,
          class: "vuefinder__treeview__scroll"
        }, [
          s(t)("pinned") ? (u(), m("div", Dv, [
            i("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: C[2] || (C[2] = (F) => x.value = !x.value)
            }, [
              i("div", Pv, [
                O(s(At), { class: "vuefinder__treeview__pin-icon" }),
                i("div", Ev, y(s(n)("Pinned Folders")), 1)
              ]),
              O(Fv, {
                modelValue: x.value,
                "onUpdate:modelValue": C[1] || (C[1] = (F) => x.value = F)
              }, null, 8, ["modelValue"])
            ]),
            x.value ? (u(), m("ul", Tv, [
              (u(!0), m(fe, null, ge(s(c).pinnedFolders, (F) => (u(), m("li", {
                key: F.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                i("div", Ie({ class: "vuefinder__treeview__pinned-folder" }, He(s(k).events(F), !0), {
                  onClick: (A) => s(e).adapter.open(F.path)
                }), [
                  s(v).path !== F.path ? (u(), z(s(Le), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : I("", !0),
                  s(v).path === F.path ? (u(), z(s(Bt), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : I("", !0),
                  i("div", {
                    title: F.path,
                    class: J(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": s(v).path === F.path
                    }])
                  }, y(F.basename), 11, Iv)
                ], 16, Mv),
                i("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (A) => p(F)
                }, [
                  O(s(vv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Av)
              ]))), 128)),
              s(c).pinnedFolders.length ? I("", !0) : (u(), m("li", Ov, [
                i("div", Bv, y(s(n)("No folders pinned")), 1)
              ]))
            ])) : I("", !0)
          ])) : I("", !0),
          (u(!0), m(fe, null, ge(w.value, (F) => (u(), m("div", {
            key: F,
            class: "vuefinder__treeview__storage"
          }, [
            O(xv, { storage: F }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        i("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: h
        }, null, 32)
      ], 4)
    ], 64));
  }
}), $e = {
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
function zv(o) {
  return o.items.length > 1 && o.items.some((e) => e.path === o.target?.path) ? "many" : o.target ? "one" : "none";
}
function be(o) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    o
  );
  return (t, n) => !(e.needsSearchQuery !== !!n.searchQuery || e.target !== void 0 && e.target !== zv(n) || e.targetType !== void 0 && e.targetType !== n.target?.type || e.mimeType !== void 0 && e.mimeType !== n.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function Je(...o) {
  return (e, t) => o.some((n) => n(e, t));
}
function Ze(...o) {
  return (e, t) => o.every((n) => n(e, t));
}
const Bn = [
  {
    id: $e.openDir,
    title: ({ t: o }) => o("Open containing folder"),
    action: (o, e) => {
      const t = e[0];
      t && o.adapter.open(t.dir);
    },
    show: be({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: $e.refresh,
    title: ({ t: o }) => o("Refresh"),
    action: (o) => {
      const e = o.fs;
      o.adapter.invalidateListQuery(e.path.get().path), o.adapter.open(e.path.get().path);
    },
    show: Je(be({ target: "none" }), be({ target: "many" })),
    order: 20
  },
  {
    id: $e.selectAll,
    title: ({ t: o }) => o("Select All"),
    action: (o) => {
      o.fs.selectAll(o.selectionMode || "multiple");
    },
    show: (o, e) => o.selectionMode === "multiple" && be({ target: "none" })(o, e),
    order: 30
  },
  {
    id: $e.new_folder,
    title: ({ t: o }) => o("New Folder"),
    action: (o) => o.modal.open(Nt),
    show: be({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: $e.open,
    title: ({ t: o }) => o("Open"),
    action: (o, e) => {
      e[0] && o.adapter.open(e[0].path);
    },
    show: be({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: $e.pinFolder,
    title: ({ t: o }) => o("Pin Folder"),
    action: (o, e) => {
      const t = o.config, n = t.get("pinnedFolders"), a = n.concat(
        e.filter(
          (d) => n.findIndex((l) => l.path === d.path) === -1
        )
      );
      t.set("pinnedFolders", a);
    },
    show: Ze(be({ target: "one", targetType: "dir", feature: "pinned" }), (o, e) => o.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: $e.unpinFolder,
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
    show: Ze(be({ target: "one", targetType: "dir", feature: "pinned" }), (o, e) => o.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: $e.preview,
    title: ({ t: o }) => o("Preview"),
    action: (o, e) => o.modal.open(ht, { storage: e[0]?.storage, item: e[0] }),
    show: Ze(
      be({ target: "one", feature: "preview" }),
      (o, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: $e.download,
    link: (o, e) => {
      if (e[0])
        return o.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: o }) => o("Download"),
    action: () => {
    },
    show: Ze(
      be({ target: "one", feature: "download" }),
      (o, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: $e.rename,
    title: ({ t: o }) => o("Rename"),
    action: (o, e) => o.modal.open(pt, { items: e }),
    show: be({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: $e.move,
    title: ({ t: o }) => o("Move"),
    action: (o, e) => {
      const t = o.fs, n = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      o.modal.open(Qe, { items: { from: e, to: n } });
    },
    show: Je(
      be({ target: "one", feature: "move" }),
      be({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: $e.copy,
    title: ({ t: o }) => o("Copy"),
    action: (o, e) => {
      e.length > 0 && o.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: Je(
      be({ target: "one", feature: "copy" }),
      be({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: $e.paste,
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
        o.modal.open(t.type === "cut" ? Qe : zt, {
          items: { from: Array.from(t.items), to: r }
        });
      }
    },
    show: (o, e) => o.features?.copy ?? !1 ? o.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: $e.archive,
    title: ({ t: o }) => o("Archive"),
    action: (o, e) => o.modal.open(Ht, { items: e }),
    show: Je(
      be({ target: "many", feature: "archive" }),
      Ze(
        be({ target: "one", feature: "archive" }),
        (o, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: $e.unarchive,
    title: ({ t: o }) => o("Unarchive"),
    action: (o, e) => o.modal.open(jt, { items: e }),
    show: be({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: $e.delete,
    title: ({ t: o }) => o("Delete"),
    action: (o, e) => {
      o.modal.open(_t, { items: e });
    },
    show: Je(
      be({ feature: "delete", target: "one" }),
      be({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], Vv = ["data-theme"], Rv = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Nv = { class: "vuefinder__external-drop-message" }, Uv = { class: "vuefinder__main__content" }, jv = /* @__PURE__ */ X({
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
    const t = e, n = o, a = Z(), d = We("root"), l = a.config;
    ue(
      () => n.features,
      (p) => {
        const h = vn(p);
        Object.keys(a.features).forEach((f) => {
          delete a.features[f];
        }), Object.assign(a.features, h);
      },
      { deep: !0 }
    );
    const r = a.fs, c = W(l.state);
    qr();
    const { isDraggingExternal: _, handleDragEnter: g, handleDragOver: w, handleDragLeave: v, handleDrop: k } = Gr();
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
    const x = async (p) => {
      const h = await k(p);
      h.length > 0 && (a.modal.open(Ut), setTimeout(() => {
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
      class: J(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": s(_) }]),
      "data-theme": s(a).theme.current,
      onDragenter: h[2] || (h[2] = //@ts-ignore
      (...f) => s(g) && s(g)(...f)),
      onDragover: h[3] || (h[3] = //@ts-ignore
      (...f) => s(w) && s(w)(...f)),
      onDragleave: h[4] || (h[4] = //@ts-ignore
      (...f) => s(v) && s(v)(...f)),
      onDrop: x
    }, [
      i("div", {
        class: J(s(a).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        i("div", {
          class: J([
            s(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: h[0] || (h[0] = (f) => s(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (f) => s(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          s(_) ? (u(), m("div", Rv, [
            i("div", Nv, y(s(a).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : I("", !0),
          O(md),
          O(wc),
          O(ru),
          i("div", Uv, [
            O(Lv),
            O(Wu, {
              "on-file-dclick": n.onFileDclick,
              "on-folder-dclick": n.onFolderDclick
            }, {
              icon: se((f) => [
                Se(p.$slots, "icon", Ke(qe(f)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          O(dv, null, {
            actions: se((f) => [
              Se(p.$slots, "status-bar", Ke(qe(f)))
            ]),
            _: 3
          })
        ], 34),
        (u(), z(ft, { to: "body" }, [
          O(jn, { name: "fade" }, {
            default: se(() => [
              s(a).modal.visible ? (u(), z(an(s(a).modal.type), { key: 0 })) : I("", !0)
            ]),
            _: 1
          })
        ])),
        O(Xu, { items: s(Bn) }, null, 8, ["items"]),
        O(s(qn), { position: "bottom-center" })
      ], 2)
    ], 42, Vv));
  }
}), Hv = /* @__PURE__ */ X({
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
  setup(o) {
    const e = o, t = e.id ?? dt(xt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const n = mo(e, dt("VueFinderOptions") || {});
    return eo(t, n), Hn(xt, t), ln(() => {
      to(t);
    }), (a, d) => (u(), z(jv, Ke(qe(e)), {
      icon: se((l) => [
        Se(a.$slots, "icon", Ke(qe(l)))
      ]),
      "status-bar": se((l) => [
        Se(a.$slots, "status-bar", Ke(qe(l)))
      ]),
      _: 3
    }, 16));
  }
}), df = {
  install(o, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", o.provide("VueFinderOptions", e), o.component("VueFinder", Hv);
  }
};
export {
  rf as ArrayDriver,
  $e as ContextMenuIds,
  lf as IndexedDBDriver,
  pn as RemoteDriver,
  Hv as VueFinder,
  df as VueFinderPlugin,
  Hv as VueFinderProvider,
  Bn as contextMenuItems,
  df as default
};
