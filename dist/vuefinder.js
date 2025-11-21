import { inject as ft, reactive as ht, watch as le, ref as M, shallowRef as dn, computed as N, markRaw as Nn, defineComponent as X, onMounted as fe, nextTick as Ae, createElementBlock as g, openBlock as v, withKeys as ct, unref as s, createElementVNode as i, createCommentVNode as T, withModifiers as ie, renderSlot as $e, toDisplayString as y, createBlock as L, resolveDynamicComponent as cn, withCtx as oe, createVNode as O, Fragment as ve, renderList as he, withDirectives as pe, vModelCheckbox as mt, vModelText as ut, onUnmounted as ye, useTemplateRef as Ge, createTextVNode as de, resolveComponent as un, normalizeClass as Z, customRef as Un, Teleport as gt, normalizeStyle as Ve, isRef as jn, vModelSelect as Ft, onBeforeUnmount as vn, vModelRadio as St, mergeProps as Me, toHandlers as Re, vShow as Le, normalizeProps as Ne, guardReactiveProps as Ue, onUpdated as Hn, mergeModels as Kn, useModel as fn, Transition as qn, provide as Gn } from "vue";
import Wn from "mitt";
import { toast as re, Toaster as Yn } from "vue-sonner";
import { persistentAtom as Qn } from "@nanostores/persistent";
import { atom as Se, computed as ze } from "nanostores";
import { useStore as G } from "@nanostores/vue";
import { QueryClient as Xn } from "@tanstack/vue-query";
import Jn from "@uppy/core";
import { Cropper as Zn } from "vue-advanced-cropper";
import _n from "vanilla-lazyload";
import { OverlayScrollbars as st, SizeObserverPlugin as eo } from "overlayscrollbars";
import { computePosition as We, offset as it, flip as at, shift as rt, autoUpdate as Mt } from "@floating-ui/dom";
import to from "@viselect/vanilla";
import no from "@uppy/xhr-upload";
const Tt = /* @__PURE__ */ new Map(), Dt = Symbol("ServiceContainerId");
function oo(o, e) {
  Tt.set(o, e);
}
function so(o) {
  Tt.delete(o);
}
function J(o) {
  const e = ft(Dt);
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
function io(o) {
  const e = localStorage.getItem(o + "_storage"), t = ht(JSON.parse(e ?? "{}"));
  le(t, n);
  function n() {
    Object.keys(t).length ? localStorage.setItem(o + "_storage", JSON.stringify(t)) : localStorage.removeItem(o + "_storage");
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
function Ce(o, e = "An error occurred") {
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
  const { getStore: a, setStore: l } = o, d = M({}), r = M(a("locale", e)), c = (w, u = e) => {
    ao(w, n).then(($) => {
      d.value = $, l("locale", w), r.value = w, l("translations", $), Object.values(n).length > 1 && (re.success("The language is set to " + w), t.emit("vf-language-saved"));
    }).catch(($) => {
      if (u)
        re.error("The selected locale is not yet supported!"), c(u, null);
      else {
        const D = Ce($, "Locale cannot be loaded!");
        re.error(D);
      }
    });
  };
  le(r, (w) => {
    c(w);
  }), !a("locale") && !Object.keys(n).length ? c(e) : d.value = a("translations");
  const _ = (w, ...u) => u.length ? _(w = w.replace("%s", String(u.shift())), ...u) : w;
  function m(w, ...u) {
    return d.value && Object.prototype.hasOwnProperty.call(d.value, w) ? _(d.value[w] || w, ...u) : _(w, ...u);
  }
  return ht({ t: m, locale: r });
}
const lo = [
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
], pn = {
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
  advanced: lo.reduce((o, e) => (o[e] = !0, o), {})
};
function Qt() {
  return pn.advanced;
}
function hn(o) {
  return o ? o === "simple" || o === "advanced" ? { ...pn[o] } : { ...Qt(), ...o } : Qt();
}
const co = "4.0.24";
function It(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1024, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function mn(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1e3, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function uo(o) {
  if (typeof o == "number") return o;
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(o);
  if (!n) return 0;
  const a = parseFloat(n[1] || "0"), l = (n[2] || "").toLowerCase(), d = e[l] ?? 0;
  return Math.round(a * Math.pow(1024, d));
}
function vo(o) {
  const e = dn(null), t = M(!1), n = M(), a = M(!1);
  return { visible: t, type: e, data: n, open: (c, _ = null) => {
    o.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = c, n.value = _;
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
  compactListView: !0,
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
  showToolbar: !0
}, fo = new Set(
  Object.keys(pt)
);
function _o(o) {
  return o || "silver";
}
function gn(o) {
  return fo.has(o);
}
function Xt(o) {
  const e = {}, t = {}, n = o;
  for (const a in n)
    if (gn(a))
      t[a] = n[a];
    else if (a in _t) {
      const l = a;
      e[l] = n[a];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function Jt(o, e) {
  const t = { ..._t, ...o, ...e };
  return t.theme = _o(t.theme), t;
}
function Zt(o, e) {
  return { ...pt, ...e, ...o };
}
const po = (o, e = {}) => {
  const t = `vuefinder_config_${o}`, { persistenceConfig: n, nonPersistenceConfig: a } = Xt(e), l = Jt(
    n,
    _t
  ), d = Zt(
    a,
    pt
  ), r = Qn(
    t,
    l,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = Se(d), _ = ze(
    [r, c],
    (p, h) => ({
      ...p,
      ...h
    })
  ), m = (p = {}) => {
    const h = r.get(), f = c.get(), { persistenceConfig: k, nonPersistenceConfig: C } = Xt(p), F = Jt(k, h), A = Zt(
      C,
      f
    );
    r.set(F), c.set(A);
  }, w = (p) => gn(p) ? c.get()[p] : r.get()[p], u = () => ({
    ...r.get(),
    ...c.get()
  }), $ = (p, h) => {
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
    init: m,
    get: w,
    set: $,
    toggle: (p) => {
      const h = r.get();
      $(p, !h[p]);
    },
    all: u,
    reset: () => {
      r.set({ ..._t }), c.set({ ...pt });
    }
  };
};
function ho(o, e) {
  if (typeof o == "string" && typeof e == "string")
    return o.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(o) || 0, n = Number(e) || 0;
  return t === n ? 0 : t < n ? -1 : 1;
}
const mo = () => {
  const o = Se(""), e = Se([]), t = Se(!1), n = Se([]), a = Se({ active: !1, column: "", order: "" }), l = Se({
    kind: "all",
    showHidden: !1
  }), d = Se(/* @__PURE__ */ new Set()), r = Se({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Se(null), _ = Se(0), m = Se(!1), w = Se([]), u = Se(-1), $ = ze([o], (V) => {
    const H = (V ?? "").trim(), Q = H.indexOf("://"), te = Q >= 0 ? H.slice(0, Q) : "", De = (Q >= 0 ? H.slice(Q + 3) : H).split("/").filter(Boolean);
    let Ee = "";
    const Je = De.map((ke) => (Ee = Ee ? `${Ee}/${ke}` : ke, {
      basename: ke,
      name: ke,
      path: te ? `${te}://${Ee}` : Ee,
      type: "dir"
    }));
    return { storage: te, breadcrumb: Je, path: H };
  }), D = ze([n, a, l], (V, H, Q) => {
    let te = V;
    Q.kind === "files" ? te = te.filter((ke) => ke.type === "file") : Q.kind === "folders" && (te = te.filter((ke) => ke.type === "dir")), Q.showHidden || (te = te.filter((ke) => !ke.basename.startsWith(".")));
    const { active: Ie, column: De, order: Ee } = H;
    if (!Ie || !De) return te;
    const Je = Ee === "asc" ? 1 : -1;
    return te.slice().sort((ke, Ze) => ho(ke[De], Ze[De]) * Je);
  }), S = ze([n, d], (V, H) => H.size === 0 ? [] : V.filter((Q) => H.has(Q.path))), p = (V, H) => {
    const Q = o.get();
    if ((H ?? !0) && Q !== V) {
      const te = w.get(), Ie = u.get();
      Ie < te.length - 1 && te.splice(Ie + 1), te.length === 0 && Q && te.push(Q), te.push(V), w.set([...te]), u.set(te.length - 1);
    }
    o.set(V);
  }, h = (V) => {
    n.set(V ?? []);
  }, f = (V) => {
    e.set(V ?? []);
  }, k = (V, H) => {
    a.set({ active: !0, column: V, order: H });
  }, C = (V) => {
    const H = a.get();
    H.active && H.column === V ? a.set({
      active: H.order === "asc",
      column: V,
      order: "desc"
    }) : a.set({
      active: !0,
      column: V,
      order: "asc"
    });
  }, F = () => {
    a.set({ active: !1, column: "", order: "" });
  }, A = (V, H) => {
    l.set({ kind: V, showHidden: H });
  }, B = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, Y = (V, H = "multiple") => {
    const Q = new Set(d.get());
    H === "single" && Q.clear(), Q.add(V), d.set(Q);
  }, R = (V, H = "multiple") => {
    const Q = new Set(d.get());
    H === "single" && Q.clear(), V.forEach((te) => Q.add(te)), d.set(Q);
  }, ne = (V) => {
    const H = new Set(d.get());
    H.delete(V), d.set(H);
  }, U = (V) => d.get().has(V), ee = (V, H = "multiple") => {
    const Q = new Set(d.get());
    Q.has(V) ? Q.delete(V) : (H === "single" && Q.clear(), Q.add(V)), d.set(Q);
  }, E = (V = "multiple", H) => {
    if (V === "single") {
      const Q = n.get()[0];
      if (Q) {
        const te = Q.path;
        d.set(/* @__PURE__ */ new Set([te])), _.set(1);
      }
    } else {
      if (H?.selectionFilterType || H?.selectionFilterMimeIncludes && H.selectionFilterMimeIncludes.length > 0) {
        const Q = n.get().filter((te) => {
          const Ie = H.selectionFilterType, De = H.selectionFilterMimeIncludes;
          return Ie === "files" && te.type === "dir" || Ie === "dirs" && te.type === "file" ? !1 : De && Array.isArray(De) && De.length > 0 && te.type !== "dir" ? te.mime_type ? De.some((Ee) => te.mime_type?.startsWith(Ee)) : !1 : !0;
        }).map((te) => te.path);
        d.set(new Set(Q));
      } else {
        const Q = new Set(n.get().map((te) => te.path));
        d.set(Q);
      }
      z(d.get().size);
    }
  }, q = () => {
    d.set(/* @__PURE__ */ new Set()), _.set(0);
  }, j = (V) => {
    const H = new Set(V ?? []);
    d.set(H), _.set(H.size);
  }, z = (V) => {
    _.set(V);
  }, x = (V) => {
    m.set(!!V);
  }, b = () => m.get(), P = (V, H) => {
    const Q = n.get().filter((te) => H.has(te.path));
    r.set({
      type: V,
      path: $.get().path,
      items: new Set(Q)
    });
  }, I = (V) => ze([r], (H) => H.type === "cut" && Array.from(H.items).some((Q) => Q.path === V)), W = (V) => ze([r], (H) => H.type === "copy" && Array.from(H.items).some((Q) => Q.path === V)), se = (V) => {
    const H = I(V);
    return G(H).value ?? !1;
  }, ae = (V) => {
    const H = W(V);
    return G(H).value ?? !1;
  }, _e = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, Ke = () => r.get(), je = (V) => {
    c.set(V);
  }, qe = () => c.get(), K = () => {
    c.set(null);
  }, ce = () => {
    const V = w.get(), H = u.get();
    if (H > 0) {
      const Q = H - 1, te = V[Q];
      te && (u.set(Q), p(te, !1));
    }
  }, ue = () => {
    const V = w.get(), H = u.get();
    if (H < V.length - 1) {
      const Q = H + 1, te = V[Q];
      te && (u.set(Q), p(te, !1));
    }
  }, be = ze([u], (V) => V > 0), Qe = ze(
    [w, u],
    (V, H) => H < V.length - 1
  );
  return {
    // Atoms (state)
    files: n,
    storages: e,
    currentPath: o,
    sort: a,
    filter: l,
    selectedKeys: d,
    selectedCount: _,
    loading: m,
    draggedItem: c,
    clipboardItems: r,
    // Computed values
    path: $,
    sortedFiles: D,
    selectedItems: S,
    // Actions
    setPath: p,
    setFiles: h,
    setStorages: f,
    setSort: k,
    toggleSort: C,
    clearSort: F,
    setFilter: A,
    clearFilter: B,
    select: Y,
    selectMultiple: R,
    deselect: ne,
    toggleSelect: ee,
    selectAll: E,
    isSelected: U,
    clearSelection: q,
    setSelection: j,
    setSelectedCount: z,
    setLoading: x,
    isLoading: b,
    setClipboard: P,
    createIsCut: I,
    createIsCopied: W,
    isCut: se,
    isCopied: ae,
    clearClipboard: _e,
    getClipboard: Ke,
    setDraggedItem: je,
    getDraggedItem: qe,
    clearDraggedItem: K,
    setReadOnly: (V) => {
      t.set(V);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (V) => t.get() ? !0 : V.read_only ?? !1,
    // Navigation
    goBack: ce,
    goForward: ue,
    canGoBack: be,
    canGoForward: Qe,
    navigationHistory: w,
    historyIndex: u
  };
};
class At {
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
class ff extends At {
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
        const m = d.path + "/", w = this.files.filter(
          (u) => u.storage === this.storage && u.path.startsWith(m)
        );
        for (const u of w) {
          const $ = u.path.slice(m.length), D = $.includes("/") ? $.slice(0, $.lastIndexOf("/")) : "", S = D ? this.join(_.path, D) : _.path;
          if (u.type === "dir")
            l(u, S);
          else {
            const p = this.uniqueName(S, u.basename, n), h = this.makeFileEntry(
              S,
              p,
              u.file_size || 0,
              u.mime_type
            );
            a.push(h), n.add(h.path);
            const f = this.contentStore.get(u.path);
            f !== void 0 && this.contentStore.set(h.path, f);
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
            const $ = m + u.path.slice(c.length);
            return this.cloneEntry(u, {
              path: $,
              dir: this.parent($),
              basename: u.path === c ? _ : u.basename
            });
          }
          return u;
        });
        for (const [u, $] of Array.from(this.contentStore.entries()))
          if (u === c || u.startsWith(c + "/")) {
            this.contentStore.delete(u);
            const D = m + u.slice(c.length);
            this.contentStore.set(D, $);
          }
      } else {
        const c = this.uniqueName(r, d.basename, n), _ = this.join(r, c);
        a = a.map(
          (w) => w === d ? this.cloneEntry(w, {
            path: _,
            dir: r,
            basename: c,
            extension: this.getExtension(c),
            last_modified: Date.now()
          }) : w
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
function en(o, e, t) {
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
      const l = a.errors.map((d) => d.message).filter((d) => !!d);
      if (l.length > 0)
        return l.join(", ");
    }
    return a.detail ? a.detail : a.title ? a.title : o;
  } catch {
    return o || n;
  }
}
class wn extends At {
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
      const d = await a.text(), r = en(d, a.status, a.statusText);
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
      const d = await a.text(), r = en(d, a.status, a.statusText);
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
class _f extends At {
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
          const _ = r + c.path.slice(d.length), m = this.parent(_), w = this.cloneEntry(c, {
            path: _,
            dir: m,
            basename: c.path === d ? e.name : c.basename,
            last_modified: Date.now()
          });
          await this.upsert(w);
          const $ = (await this.getDB()).transaction(["content"], "readwrite"), D = $.objectStore("content"), S = D.get(c.path);
          S.onsuccess = () => {
            const p = S.result;
            p && (D.delete(c.path), D.put({ path: _, content: p.content }));
          }, await new Promise((p) => {
            $.oncomplete = () => p(void 0);
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
        const m = d.path + "/", w = n.filter(
          (u) => u.storage === this.storage && u.path.startsWith(m)
        );
        for (const u of w) {
          const $ = u.path.slice(m.length), D = $.includes("/") ? $.slice(0, $.lastIndexOf("/")) : "", S = D ? this.join(_.path, D) : _.path;
          if (u.type === "dir")
            await l(u, S);
          else {
            const p = await this.uniqueName(S, u.basename, a), h = this.makeFileEntry(
              S,
              p,
              u.file_size || 0,
              u.mime_type
            );
            a.add(h.path), await this.upsert(h);
            const k = (await this.getDB()).transaction(["content"], "readwrite"), C = k.objectStore("content"), F = C.get(u.path);
            F.onsuccess = () => {
              const A = F.result;
              A && C.put({ path: h.path, content: A.content });
            }, await new Promise((A) => {
              k.oncomplete = () => A(void 0);
            });
          }
        }
      } else {
        const c = await this.uniqueName(r, d.basename, a), _ = this.makeFileEntry(r, c, d.file_size || 0, d.mime_type);
        a.add(_.path), await this.upsert(_);
        const w = (await this.getDB()).transaction(["content"], "readwrite"), u = w.objectStore("content"), $ = u.get(d.path);
        $.onsuccess = () => {
          const D = $.result;
          D && u.put({ path: _.path, content: D.content });
        }, await new Promise((D) => {
          w.oncomplete = () => D(void 0);
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
        const c = d.path, _ = await this.uniqueName(r, d.basename, a), m = this.join(r, _), w = n.filter(
          (u) => u.storage === this.storage && (u.path === c || u.path.startsWith(c + "/"))
        );
        for (const u of w) {
          const $ = m + u.path.slice(c.length), D = this.parent($), S = this.cloneEntry(u, {
            path: $,
            dir: D,
            basename: u.path === c ? _ : u.basename,
            last_modified: Date.now()
          });
          await this.upsert(S);
          const h = (await this.getDB()).transaction(["content"], "readwrite"), f = h.objectStore("content"), k = f.get(u.path);
          k.onsuccess = () => {
            const C = k.result;
            C && (f.delete(u.path), f.put({ path: $, content: C.content }));
          }, await new Promise((C) => {
            h.oncomplete = () => C(void 0);
          }), u.path !== $ && await this.removeExact(u.path);
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
        const u = (await this.getDB()).transaction(["content"], "readwrite"), $ = u.objectStore("content"), D = $.get(d.path);
        D.onsuccess = () => {
          const S = D.result;
          S && ($.delete(d.path), $.put({ path: _, content: S.content }));
        }, await new Promise((S) => {
          u.oncomplete = () => S(void 0);
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
            const w = new Uint8Array(m);
            let u = "";
            for (let D = 0; D < w.length; D++) u += String.fromCharCode(w[D]);
            const $ = btoa(u);
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
          u.objectStore("content").put({ path: _.path, content: m }), await new Promise((D) => {
            u.oncomplete = () => D(void 0);
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
const tn = {
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
class go {
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
    const t = tn.list(e);
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
    const t = tn.search(e.path, e.filter, e.deep, e.size);
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
function wo(o) {
  const e = G(o.state);
  return {
    current: N(() => e.value.theme || "silver"),
    set: (a) => {
      o.set("theme", a);
    }
  };
}
const yo = (o, e) => {
  const t = io(o.id ?? "vf"), n = Wn(), a = e.i18n, l = o.locale ?? e.locale, d = po(o.id ?? "vf", o.config ?? {}), r = mo();
  if (!o.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new go(o.driver);
  return ht({
    // app version
    version: co,
    // config store
    config: d,
    // Theme
    theme: (() => {
      const _ = wo(d);
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
    i18n: ro(
      t,
      l,
      n,
      a
    ),
    // modal state
    modal: vo(d),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Nn(c),
    // active features
    features: hn(o.features),
    // selection mode
    selectionMode: o.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: N(() => o.selectionFilterType || "both"),
    selectionFilterMimeIncludes: N(() => o.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: d.get("metricUnits") ? mn : It,
    // possible items of the context menu
    contextMenuItems: o.contextMenuItems,
    // expose custom uploader if provided
    customUploader: o.customUploader
  });
}, bo = ["data-theme"], ko = { class: "vuefinder__modal-layout__container" }, $o = { class: "vuefinder__modal-layout__content" }, xo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, So = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Co = { class: "vuefinder__modal-drag-message" }, Fe = /* @__PURE__ */ X({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(o) {
    const e = M(null), t = J();
    t.config;
    const n = o;
    fe(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Ae(() => {
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
    return (l, d) => (v(), g("div", {
      "data-theme": s(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: d[1] || (d[1] = ct((r) => s(t).modal.close(), ["esc"]))
    }, [
      d[2] || (d[2] = i("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      i("div", ko, [
        i("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: a,
          onMousedown: d[0] || (d[0] = ie((r) => s(t).modal.close(), ["self"]))
        }, [
          i("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            i("div", $o, [
              $e(l.$slots, "default")
            ]),
            l.$slots.buttons ? (v(), g("div", xo, [
              $e(l.$slots, "buttons")
            ])) : T("", !0)
          ], 512)
        ], 32)
      ]),
      n.showDragOverlay ? (v(), g("div", So, [
        i("div", Co, y(n.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : T("", !0)
    ], 40, bo));
  }
}), Fo = { class: "vuefinder__modal-header" }, Do = { class: "vuefinder__modal-header__icon-container" }, Po = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Pe = /* @__PURE__ */ X({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(o) {
    return (e, t) => (v(), g("div", Fo, [
      i("div", Do, [
        (v(), L(cn(o.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      i("div", Po, y(o.title), 1)
    ]));
  }
}), Eo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Mo(o, e) {
  return v(), g("svg", Eo, [...e[0] || (e[0] = [
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
const yn = { render: Mo }, To = { class: "vuefinder__about-modal__content" }, Io = { class: "vuefinder__about-modal__main" }, Ao = { class: "vuefinder__about-modal__tab-content" }, Oo = { class: "vuefinder__about-modal__lead" }, Bo = { class: "vuefinder__about-modal__description" }, Lo = { class: "vuefinder__about-modal__links" }, Vo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, zo = { class: "vuefinder__about-modal__meta" }, Ro = { class: "vuefinder__about-modal__meta-item" }, No = { class: "vuefinder__about-modal__meta-label" }, Uo = { class: "vuefinder__about-modal__meta-value" }, jo = { class: "vuefinder__about-modal__meta-item" }, Ho = { class: "vuefinder__about-modal__meta-label" }, bn = /* @__PURE__ */ X({
  __name: "ModalAbout",
  setup(o) {
    const e = J(), { t } = e.i18n;
    return (n, a) => (v(), L(Fe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: a[0] || (a[0] = (l) => s(e).modal.close())
        }, y(s(t)("Close")), 1)
      ]),
      default: oe(() => [
        i("div", To, [
          O(Pe, {
            icon: s(yn),
            title: "Vuefinder " + s(e).version
          }, null, 8, ["icon", "title"]),
          i("div", Io, [
            i("div", Ao, [
              i("div", Oo, y(s(t)("A modern, customizable file manager component built for Vue.")), 1),
              i("div", Bo, y(s(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              i("div", Lo, [
                i("a", Vo, y(s(t)("Project Home")), 1),
                a[1] || (a[1] = i("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              i("div", zo, [
                i("div", Ro, [
                  i("span", No, y(s(t)("Version")), 1),
                  i("span", Uo, y(s(e).version), 1)
                ]),
                i("div", jo, [
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
}), Ko = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function qo(o, e) {
  return v(), g("svg", Ko, [...e[0] || (e[0] = [
    i("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const kn = { render: qo }, Go = { class: "vuefinder__delete-modal__content" }, Wo = { class: "vuefinder__delete-modal__form" }, Yo = { class: "vuefinder__delete-modal__description" }, Qo = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Xo = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jo = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zo = { class: "vuefinder__delete-modal__file-name" }, es = { class: "vuefinder__delete-modal__confirmation" }, ts = { class: "vuefinder__delete-modal__confirmation-label" }, ns = { class: "vuefinder__delete-modal__confirmation-text" }, os = ["disabled"], wt = /* @__PURE__ */ X({
  __name: "ModalDelete",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = M(e.modal.data.items), d = M(!1), r = () => {
      l.value.length && d.value && e.adapter.delete({
        path: a.value.path,
        items: l.value.map(({ path: c, type: _ }) => ({
          path: c,
          type: _
        }))
      }).then((c) => {
        re.success(t("Files deleted.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        re.error(Ce(c, t("Failed to delete files")));
      });
    };
    return (c, _) => (v(), L(Fe, null, {
      buttons: oe(() => [
        i("div", es, [
          i("label", ts, [
            pe(i("input", {
              "onUpdate:modelValue": _[0] || (_[0] = (m) => d.value = m),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [mt, d.value]
            ]),
            i("span", ns, y(s(t)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !d.value,
          onClick: r
        }, y(s(t)("Yes, Delete!")), 9, os),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (m) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Pe, {
            icon: s(kn),
            title: s(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          i("div", Go, [
            i("div", Wo, [
              i("p", Yo, y(s(t)("Are you sure you want to delete these files?")), 1),
              i("div", Qo, [
                (v(!0), g(ve, null, he(l.value, (m) => (v(), g("p", {
                  key: m.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  m.type === "dir" ? (v(), g("svg", Xo, [..._[2] || (_[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), g("svg", Jo, [..._[3] || (_[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Zo, y(m.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ss = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function is(o, e) {
  return v(), g("svg", ss, [...e[0] || (e[0] = [
    i("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const $n = { render: is }, as = { class: "vuefinder__rename-modal__content" }, rs = { class: "vuefinder__rename-modal__item" }, ls = { class: "vuefinder__rename-modal__item-info" }, ds = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, cs = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, us = { class: "vuefinder__rename-modal__item-name" }, yt = /* @__PURE__ */ X({
  __name: "ModalRename",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = M(e.modal.data.items[0]), d = M(l.value.basename), r = () => {
      d.value != l.value.basename && e.adapter.rename({
        path: a.value.path,
        item: l.value.path,
        name: d.value
      }).then((c) => {
        re.success(t("%s is renamed.", d.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        re.error(Ce(c, t("Failed to rename")));
      });
    };
    return (c, _) => (v(), L(Fe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(t)("Rename")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (m) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Pe, {
            icon: s($n),
            title: s(t)("Rename")
          }, null, 8, ["icon", "title"]),
          i("div", as, [
            i("div", rs, [
              i("p", ls, [
                l.value.type === "dir" ? (v(), g("svg", ds, [..._[2] || (_[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (v(), g("svg", cs, [..._[3] || (_[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", us, y(l.value.basename), 1)
              ]),
              pe(i("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (m) => d.value = m),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: ct(r, ["enter"])
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
function Te() {
  const o = J(), e = N(() => o.features);
  return {
    enabled: (n) => e.value[n] ?? !1
  };
}
const vs = { class: "vuefinder__text-preview" }, fs = { class: "vuefinder__text-preview__header" }, _s = ["title"], ps = { class: "vuefinder__text-preview__actions" }, hs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, ms = { key: 1 }, gs = /* @__PURE__ */ X({
  __name: "Text",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = M(""), a = M(""), l = M(null), d = M(!1), r = J(), { enabled: c } = Te(), { t: _ } = r.i18n;
    fe(async () => {
      try {
        const u = await r.adapter.getContent({ path: r.modal.data.item.path });
        n.value = u.content, t("success");
      } catch (u) {
        Ce(u, "Failed to load text content"), t("success");
      }
    });
    const m = () => {
      d.value = !d.value, a.value = n.value, r.modal.setEditMode(d.value);
    }, w = async () => {
      try {
        const u = r.modal.data.item.path;
        await r.adapter.save({
          path: u,
          content: a.value
        }), n.value = a.value, re.success(_("Updated.")), t("success"), d.value = !d.value;
      } catch (u) {
        re.error(Ce(u, _("Failed to save file")));
      }
    };
    return (u, $) => (v(), g("div", vs, [
      i("div", fs, [
        i("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: s(r).modal.data.item.path
        }, y(s(r).modal.data.item.basename), 9, _s),
        i("div", ps, [
          d.value ? (v(), g("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: w
          }, y(s(_)("Save")), 1)) : T("", !0),
          s(c)("edit") ? (v(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: $[0] || ($[0] = (D) => m())
          }, y(d.value ? s(_)("Cancel") : s(_)("Edit")), 1)) : T("", !0)
        ])
      ]),
      i("div", null, [
        d.value ? (v(), g("div", ms, [
          pe(i("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": $[1] || ($[1] = (D) => a.value = D),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ut, a.value]
          ])
        ])) : (v(), g("pre", hs, y(n.value), 1))
      ])
    ]));
  }
}), Ot = async (o, e) => {
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
        await Ot(o, a);
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
  const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = e.config, d = M({ QUEUE_ENTRY_STATUS: ge }), r = M(null), c = M(null), _ = M(null), m = M(null), w = M(null), u = M([]), $ = M(""), D = M(!1), S = M(!1), p = M(null);
  let h;
  const f = (x) => {
    x.preventDefault(), x.stopPropagation(), S.value = !0;
  }, k = (x) => {
    x.preventDefault(), x.stopPropagation(), S.value = !0;
  }, C = (x) => {
    x.preventDefault(), x.stopPropagation(), (!x.relatedTarget || x.relatedTarget === document.body) && (S.value = !1);
  }, F = (x) => {
    x.preventDefault(), x.stopPropagation(), S.value = !1;
    const b = /^[/\\](.+)/, P = x.dataTransfer;
    P && (P.items && P.items.length ? Array.from(P.items).forEach((I) => {
      if (I.kind === "file") {
        const W = I.webkitGetAsEntry?.();
        if (W)
          Ot((se, ae) => {
            const _e = b.exec(se?.fullPath || "");
            B(ae, _e ? _e[1] : ae.name);
          }, W);
        else {
          const se = I.getAsFile?.();
          se && B(se);
        }
      }
    }) : P.files && P.files.length && Array.from(P.files).forEach((I) => B(I)));
  }, A = (x) => u.value.findIndex((b) => b.id === x), B = (x, b) => h.addFile({ name: b || x.name, type: x.type, data: x, source: "Local" }), Y = (x) => x.status === ge.DONE ? "text-green-600" : x.status === ge.ERROR || x.status === ge.CANCELED ? "text-red-600" : "", R = (x) => x.status === ge.DONE ? "✓" : x.status === ge.ERROR || x.status === ge.CANCELED ? "!" : "...", ne = () => m.value?.click(), U = () => e.modal.close(), ee = (x) => {
    if (D.value || !u.value.filter((b) => b.status !== ge.DONE).length) {
      D.value || ($.value = t("Please select file to upload first."));
      return;
    }
    $.value = "", p.value = x || a.value, h.upload();
  }, E = () => {
    h.cancelAll(), u.value.forEach((x) => {
      x.status !== ge.DONE && (x.status = ge.CANCELED, x.statusName = t("Canceled"));
    }), D.value = !1;
  }, q = (x) => {
    D.value || (h.removeFile(x.id), u.value.splice(A(x.id), 1));
  }, j = (x) => {
    if (!D.value)
      if (h.cancelAll(), x) {
        const b = u.value.filter((P) => P.status !== ge.DONE);
        u.value = [], b.forEach((P) => B(P.originalFile, P.name));
      } else
        u.value = [];
  }, z = (x) => {
    x.forEach((b) => {
      B(b);
    });
  };
  return fe(() => {
    h = new Jn({
      debug: e.debug,
      restrictions: { maxFileSize: uo(l.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (I, W) => {
        if (W[I.id] != null) {
          const ae = A(I.id);
          u.value[ae]?.status === ge.PENDING && ($.value = h.i18n("noDuplicates", { fileName: I.name })), u.value = u.value.filter((_e) => _e.id !== I.id);
        }
        return u.value.push({
          id: I.id,
          name: I.name,
          size: e.filesize(I.size),
          status: ge.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: I.data
        }), !0;
      }
    });
    const x = {
      getTargetPath: () => (p.value || a.value).path
    };
    if (o)
      o(h, x);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(h, x);
    else
      throw new Error("No uploader configured");
    h.on("restriction-failed", (I, W) => {
      const se = u.value[A(I.id)];
      se && q(se), $.value = W.message;
    }), h.on("upload-progress", (I, W) => {
      const se = W.bytesTotal ?? 1, ae = Math.floor(W.bytesUploaded / se * 100), _e = A(I.id);
      _e !== -1 && u.value[_e] && (u.value[_e].percent = `${ae}%`);
    }), h.on("upload-success", (I) => {
      const W = u.value[A(I.id)];
      W && (W.status = ge.DONE, W.statusName = t("Done"));
    }), h.on("upload-error", (I, W) => {
      const se = u.value[A(I.id)];
      se && (se.percent = null, se.status = ge.ERROR, se.statusName = W?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : W?.message || t("Unknown Error"));
    }), h.on("error", (I) => {
      $.value = I.message, D.value = !1, e.adapter.open(a.value.path);
    }), h.on("complete", () => {
      D.value = !1;
      const I = p.value || a.value;
      e.adapter.invalidateListQuery(I.path), e.adapter.open(I.path);
      const W = u.value.filter((se) => se.status === ge.DONE).map((se) => se.name);
      e.emitter.emit("vf-upload-complete", W);
    }), m.value?.addEventListener("click", () => c.value?.click()), w.value?.addEventListener("click", () => _.value?.click());
    const b = { capture: !0 };
    document.addEventListener("dragover", f, b), document.addEventListener("dragenter", k, b), document.addEventListener("dragleave", C, b), document.addEventListener("drop", F, b);
    const P = (I) => {
      const W = I.target, se = W.files;
      if (se) {
        for (const ae of se) B(ae);
        W.value = "";
      }
    };
    c.value?.addEventListener("change", P), _.value?.addEventListener("change", P);
  }), ye(() => {
    const x = { capture: !0 };
    document.removeEventListener("dragover", f, x), document.removeEventListener("dragenter", k, x), document.removeEventListener("dragleave", C, x), document.removeEventListener("drop", F, x);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: _,
    pickFiles: m,
    pickFolders: w,
    queue: u,
    message: $,
    uploading: D,
    hasFilesInDropArea: S,
    definitions: d,
    openFileSelector: ne,
    upload: ee,
    cancel: E,
    remove: q,
    clear: j,
    close: U,
    getClassNameForEntry: Y,
    getIconForEntry: R,
    addExternalFiles: z
  };
}
const ws = { class: "vuefinder__image-preview" }, ys = { class: "vuefinder__image-preview__header" }, bs = ["title"], ks = { class: "vuefinder__image-preview__actions" }, $s = { class: "vuefinder__image-preview__image-container" }, xs = ["src"], Ss = /* @__PURE__ */ X({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = J(), { enabled: a } = Te(), { t: l } = n.i18n, d = M(!1), r = M(
      n.modal.data.item.previewUrl ?? n.adapter.getPreviewUrl({ path: n.modal.data.item.path })
    ), c = M(r.value), { addExternalFiles: _, upload: m, queue: w } = xn(n.customUploader), u = n.fs, $ = G(u.path), D = Ge("cropperRef"), S = async () => {
      d.value = !d.value, n.modal.setEditMode(d.value);
    }, p = async () => {
      const f = D.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!f) return;
      let k = f;
      if (f.width > 1200 || f.height > 1200) {
        const Y = Math.min(1200 / f.width, 1200 / f.height), R = document.createElement("canvas");
        R.width = Math.floor(f.width * Y), R.height = Math.floor(f.height * Y);
        const ne = R.getContext("2d");
        ne && (ne.drawImage(f, 0, 0, R.width, R.height), k = R);
      }
      const C = n.modal.data.item.basename, F = C.split(".").pop()?.toLowerCase() || "jpg", A = F === "png" ? "image/png" : F === "gif" ? "image/gif" : "image/jpeg", B = await new Promise((Y) => {
        k.toBlob((R) => Y(R), A);
      });
      if (!B) {
        re.error(l("Failed to save image"));
        return;
      }
      try {
        const Y = new File([B], C, { type: A }), ne = n.modal.data.item.path.split("/");
        ne.pop();
        const ee = {
          path: ne.join("/") || ($.value?.path ?? "")
        };
        _([Y]), await new Promise((z) => setTimeout(z, 100));
        const E = w.value.find((z) => z.name === Y.name);
        if (!E)
          throw new Error("File was not added to upload queue");
        m(ee);
        let q = 0;
        for (; q < 150; ) {
          await new Promise((x) => setTimeout(x, 200));
          const z = w.value.find((x) => x.id === E.id);
          if (z?.status === ge.DONE) break;
          if (z?.status === ge.ERROR)
            throw new Error(z.statusName || "Upload failed");
          q++;
        }
        re.success(l("Updated.")), await fetch(r.value, { cache: "reload", mode: "no-cors" });
        const j = n.root?.querySelector?.('[data-src="' + r.value + '"]');
        j && j instanceof HTMLElement && _n.resetStatus(j), n.emitter.emit("vf-refresh-thumbnails"), await S(), t("success");
      } catch (Y) {
        re.error(Ce(Y, l("Failed to save image")));
      }
    };
    return fe(() => {
      t("success");
    }), (h, f) => (v(), g("div", ws, [
      i("div", ys, [
        i("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: s(n).modal.data.item.path
        }, y(s(n).modal.data.item.basename), 9, bs),
        i("div", ks, [
          d.value ? (v(), g("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: p
          }, y(s(l)("Crop")), 1)) : T("", !0),
          s(a)("edit") ? (v(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: f[0] || (f[0] = (k) => S())
          }, y(d.value ? s(l)("Cancel") : s(l)("Edit")), 1)) : T("", !0)
        ])
      ]),
      i("div", $s, [
        d.value ? (v(), L(s(Zn), {
          key: 1,
          ref_key: "cropperRef",
          ref: D,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: c.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (v(), g("img", {
          key: 0,
          style: {},
          src: s(n).modal.data.item.previewUrl ?? s(n).adapter.getPreviewUrl({ path: s(n).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, xs))
      ])
    ]));
  }
}), Cs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Fs(o, e) {
  return v(), g("svg", Cs, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const lt = { render: Fs }, Ds = { class: "vuefinder__default-preview" }, Ps = { class: "vuefinder__default-preview__content" }, Es = { class: "vuefinder__default-preview__header" }, Ms = ["title"], Ts = { class: "vuefinder__default-preview__icon-container" }, Is = ["title"], As = /* @__PURE__ */ X({
  __name: "Default",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = J(), n = e;
    return fe(() => {
      n("success");
    }), (a, l) => (v(), g("div", Ds, [
      i("div", Ps, [
        i("div", Es, [
          i("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Ms)
        ]),
        i("div", Ts, [
          O(s(lt), { class: "vuefinder__default-preview__file-icon" }),
          i("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Is)
        ])
      ])
    ]));
  }
}), Os = { class: "vuefinder__video-preview" }, Bs = ["title"], Ls = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Vs = ["src"], zs = /* @__PURE__ */ X({
  __name: "Video",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = J(), n = e, a = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return fe(() => {
      n("success");
    }), (l, d) => (v(), g("div", Os, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Bs),
      i("div", null, [
        i("video", Ls, [
          i("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Vs),
          d[0] || (d[0] = de(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Rs = { class: "vuefinder__audio-preview" }, Ns = ["title"], Us = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, js = ["src"], Hs = /* @__PURE__ */ X({
  __name: "Audio",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = J(), a = () => {
      const l = J();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return fe(() => {
      t("success");
    }), (l, d) => (v(), g("div", Rs, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: s(n).modal.data.item.path
      }, y(s(n).modal.data.item.basename), 9, Ns),
      i("div", null, [
        i("audio", Us, [
          i("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, js),
          d[0] || (d[0] = de(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Ks = { class: "vuefinder__pdf-preview" }, qs = ["title"], Gs = ["data"], Ws = ["src"], Ys = /* @__PURE__ */ X({
  __name: "Pdf",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = J(), n = e, a = () => {
      const l = J();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return fe(() => {
      n("success");
    }), (l, d) => (v(), g("div", Ks, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, qs),
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
          }, " Your browser does not support PDFs ", 8, Ws)
        ], 8, Gs)
      ])
    ]));
  }
});
function Qs(o, e = null) {
  return new Date(o * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Xs = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Js = ["disabled", "title"], Zs = ["disabled", "title"], ei = { class: "vuefinder__preview-modal__content" }, ti = { key: 0 }, ni = { class: "vuefinder__preview-modal__loading" }, oi = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, si = { class: "vuefinder__preview-modal__details" }, ii = { class: "font-bold" }, ai = { class: "pl-2 font-bold" }, ri = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, li = ["download", "href"], bt = /* @__PURE__ */ X({
  __name: "ModalPreview",
  setup(o) {
    const e = J(), { enabled: t } = Te(), { t: n } = e.i18n, a = M(!1), l = (f) => {
      const k = (f || "").split("/").pop() || "", C = k.lastIndexOf(".");
      return C >= 0 ? k.slice(C + 1).toLowerCase() : "";
    }, d = (f, k) => {
      if (!k) return !1;
      const C = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), F = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), A = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), B = /* @__PURE__ */ new Set([
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
      return f === "image" ? C.has(k) : f === "video" ? F.has(k) : f === "audio" ? A.has(k) : f === "text" ? B.has(k) : f === "application/pdf" ? k === "pdf" : !1;
    }, r = (f) => {
      const k = e.modal.data.item.mime_type;
      if (k && typeof k == "string") return k.startsWith(f);
      const C = l(e.modal.data.item.path);
      return d(f, C);
    }, c = t("preview");
    c || (a.value = !0);
    const _ = N(() => e.modal.data.item), m = G(e.fs.sortedFiles), w = N(() => m.value.filter((f) => f.type === "file")), u = N(
      () => w.value.findIndex((f) => f.path === _.value.path)
    ), $ = N(() => u.value > 0), D = N(() => u.value < w.value.length - 1), S = () => {
      if (e.modal.editMode || !$.value) return;
      const f = w.value[u.value - 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, p = () => {
      if (e.modal.editMode || !D.value) return;
      const f = w.value[u.value + 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, h = (f) => {
      if (f.key === "Escape") {
        f.preventDefault(), f.stopPropagation(), e.modal.close();
        return;
      }
      (f.key === "ArrowLeft" || f.key === "ArrowRight") && (f.preventDefault(), f.stopPropagation(), f.key === "ArrowLeft" ? S() : p());
    };
    return fe(() => {
      const f = document.querySelector(".vuefinder__preview-modal");
      f && f.focus();
    }), (f, k) => (v(), L(Fe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[6] || (k[6] = (C) => s(e).modal.close())
        }, y(s(n)("Close")), 1),
        s(t)("download") ? (v(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path }),
          href: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path })
        }, y(s(n)("Download")), 9, li)) : T("", !0)
      ]),
      default: oe(() => [
        i("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: h
        }, [
          s(e).modal.editMode ? T("", !0) : (v(), g("div", Xs, [
            i("button", {
              disabled: !$.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: s(n)("Previous file"),
              onClick: S
            }, [...k[7] || (k[7] = [
              i("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, Js),
            i("button", {
              disabled: !D.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: s(n)("Next file"),
              onClick: p
            }, [...k[8] || (k[8] = [
              i("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, Zs)
          ])),
          i("div", ei, [
            s(c) ? (v(), g("div", ti, [
              r("text") ? (v(), L(gs, {
                key: `text-${_.value.path}`,
                onSuccess: k[0] || (k[0] = (C) => a.value = !0)
              })) : r("image") ? (v(), L(Ss, {
                key: `image-${_.value.path}`,
                onSuccess: k[1] || (k[1] = (C) => a.value = !0)
              })) : r("video") ? (v(), L(zs, {
                key: `video-${_.value.path}`,
                onSuccess: k[2] || (k[2] = (C) => a.value = !0)
              })) : r("audio") ? (v(), L(Hs, {
                key: `audio-${_.value.path}`,
                onSuccess: k[3] || (k[3] = (C) => a.value = !0)
              })) : r("application/pdf") ? (v(), L(Ys, {
                key: `pdf-${_.value.path}`,
                onSuccess: k[4] || (k[4] = (C) => a.value = !0)
              })) : (v(), L(As, {
                key: `default-${_.value.path}`,
                onSuccess: k[5] || (k[5] = (C) => a.value = !0)
              }))
            ])) : T("", !0),
            i("div", ni, [
              a.value === !1 ? (v(), g("div", oi, [
                k[9] || (k[9] = i("svg", {
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
              ])) : T("", !0)
            ])
          ])
        ], 32),
        i("div", si, [
          i("div", null, [
            i("span", ii, y(s(n)("File Size")) + ": ", 1),
            de(y(s(e).filesize(s(e).modal.data.item.file_size)), 1)
          ]),
          i("div", null, [
            i("span", ai, y(s(n)("Last Modified")) + ": ", 1),
            de(" " + y(s(Qs)(s(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        s(t)("download") ? (v(), g("div", ri, [
          i("span", null, y(s(n)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : T("", !0)
      ]),
      _: 1
    }));
  }
}), di = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function ci(o, e) {
  return v(), g("svg", di, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const ui = { render: ci }, vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function fi(o, e) {
  return v(), g("svg", vi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Bt = { render: fi }, _i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function pi(o, e) {
  return v(), g("svg", _i, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Oe = { render: pi }, hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function mi(o, e) {
  return v(), g("svg", hi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const kt = { render: mi }, gi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function wi(o, e) {
  return v(), g("svg", gi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const $t = { render: wi }, yi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function bi(o, e) {
  return v(), g("svg", yi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const Lt = { render: bi }, ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function $i(o, e) {
  return v(), g("svg", ki, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const Vt = { render: $i }, xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Si(o, e) {
  return v(), g("svg", xi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const zt = { render: Si }, Ci = { class: "vuefinder__modal-tree__folder-item" }, Fi = { class: "vuefinder__modal-tree__folder-content" }, Di = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Pi = { class: "vuefinder__modal-tree__folder-text" }, Ei = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Mi = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Ti = 300, Ii = /* @__PURE__ */ X({
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
    const t = J(), { t: n } = t.i18n, a = t.fs, l = M({}), d = o, r = e;
    G(a.path);
    const c = N(() => {
      const B = `${d.storage}:${d.folder.path}`;
      return d.expandedFolders[B] || !1;
    }), _ = N(() => d.modelValue?.path === d.folder.path), m = N(() => d.currentPath?.path === d.folder.path), w = N(() => d.modalTreeData[d.folder.path] || []), u = N(() => {
      const B = w.value, Y = l.value[d.folder.path] || 50;
      return B.length > Y ? B.slice(0, Y) : B;
    }), $ = N(() => w.value.length), D = N(() => l.value[d.folder.path] || 50), S = N(() => $.value > D.value), p = () => {
      l.value[d.folder.path] = (D.value || 50) + 50;
    }, h = N(() => w.value.length > 0 || d.folder.type === "dir"), f = () => {
      r("toggleFolder", d.storage, d.folder.path);
    }, k = () => {
      r("update:modelValue", d.folder);
    }, C = () => {
      r("update:modelValue", d.folder), r("selectAndClose", d.folder);
    };
    let F = 0;
    const A = () => {
      const B = Date.now();
      B - F < Ti ? C() : k(), F = B;
    };
    return (B, Y) => {
      const R = un("ModalTreeFolderItem", !0);
      return v(), g("div", Ci, [
        i("div", Fi, [
          h.value ? (v(), g("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: f
          }, [
            c.value ? (v(), L(s($t), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (v(), L(s(kt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (v(), g("div", Di)),
          i("div", {
            class: Z(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": _.value,
              "vuefinder__modal-tree__folder-link--current": m.value
            }]),
            onClick: k,
            onDblclick: C,
            onTouchend: A
          }, [
            c.value ? (v(), L(s(zt), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (v(), L(s(Oe), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            i("span", Pi, y(o.folder.basename), 1)
          ], 34)
        ]),
        c.value && h.value ? (v(), g("div", Ei, [
          (v(!0), g(ve, null, he(u.value, (ne) => (v(), L(R, {
            key: ne.path,
            folder: ne,
            storage: o.storage,
            "model-value": o.modelValue,
            "expanded-folders": o.expandedFolders,
            "modal-tree-data": o.modalTreeData,
            "current-path": o.currentPath,
            "onUpdate:modelValue": Y[0] || (Y[0] = (U) => B.$emit("update:modelValue", U)),
            onSelectAndClose: Y[1] || (Y[1] = (U) => B.$emit("selectAndClose", U)),
            onToggleFolder: Y[2] || (Y[2] = (U, ee) => B.$emit("toggleFolder", U, ee))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          S.value ? (v(), g("div", Mi, [
            i("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: p
            }, y(s(n)("load more")), 1)
          ])) : T("", !0)
        ])) : T("", !0)
      ]);
    };
  }
}), Ai = { class: "vuefinder__modal-tree" }, Oi = { class: "vuefinder__modal-tree__header" }, Bi = { class: "vuefinder__modal-tree__title" }, Li = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Vi = { class: "vuefinder__modal-tree__section-title" }, zi = { class: "vuefinder__modal-tree__list" }, Ri = ["onClick", "onDblclick", "onTouchend"], Ni = { class: "vuefinder__modal-tree__text" }, Ui = { class: "vuefinder__modal-tree__text-storage" }, ji = { class: "vuefinder__modal-tree__section-title" }, Hi = { class: "vuefinder__modal-tree__list" }, Ki = { class: "vuefinder__modal-tree__storage-item" }, qi = { class: "vuefinder__modal-tree__storage-content" }, Gi = ["onClick"], Wi = ["onClick", "onDblclick", "onTouchend"], Yi = { class: "vuefinder__modal-tree__storage-text" }, Qi = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Xi = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Ji = ["onClick"], nn = 300, Rt = /* @__PURE__ */ X({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(o, { emit: e }) {
    const t = J(), { t: n } = t.i18n, a = t.fs, l = t.config, d = e, r = G(a.sortedFiles), c = G(a.storages), _ = N(() => c.value || []), m = G(a.path), w = M(null), u = M({}), $ = M({}), D = M({});
    le(r, (E) => {
      const q = E.filter((z) => z.type === "dir"), j = m.value?.path || "";
      j && ($.value[j] = q.map((z) => ({
        ...z,
        type: "dir"
      })));
    });
    const S = (E, q) => {
      const j = `${E}:${q}`;
      u.value = {
        ...u.value,
        [j]: !u.value[j]
      }, u.value[j] && !$.value[q] && t.adapter.list(q).then((z) => {
        const b = (z.files || []).filter((P) => P.type === "dir");
        $.value[q] = b.map((P) => ({
          ...P,
          type: "dir"
        }));
      });
    }, p = (E) => $.value[E] || [], h = (E) => D.value[E] || 50, f = (E) => {
      const q = p(E), j = h(E);
      return q.length > j ? q.slice(0, j) : q;
    }, k = (E) => p(E).length, C = (E) => k(E) > h(E), F = (E) => {
      D.value[E] = h(E) + 50;
    }, A = (E) => {
      E && d("update:modelValue", E);
    }, B = (E) => {
      E && (d("update:modelValue", E), d("selectAndClose", E));
    }, Y = (E) => {
      const q = {
        storage: E,
        path: E + "://",
        basename: E,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: E + "://"
      };
      d("update:modelValue", q);
    }, R = (E) => {
      const q = {
        storage: E,
        path: E + "://",
        basename: E,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: E + "://"
      };
      d("update:modelValue", q), d("selectAndClose", q);
    };
    let ne = 0;
    const U = (E) => {
      if (!E) return;
      const q = Date.now();
      q - ne < nn ? B(E) : A(E), ne = q;
    }, ee = (E) => {
      const q = Date.now();
      q - ne < nn ? R(E) : Y(E), ne = q;
    };
    return fe(() => {
      w.value && st(w.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (E, q) => (v(), g("div", Ai, [
      i("div", Oi, [
        i("div", Bi, y(s(n)("Select Target Folder")), 1)
      ]),
      i("div", {
        ref_key: "modalContentElement",
        ref: w,
        class: "vuefinder__modal-tree__content"
      }, [
        o.showPinnedFolders && s(t).features.pinned && s(l).get("pinnedFolders").length ? (v(), g("div", Li, [
          i("div", Vi, y(s(n)("Pinned Folders")), 1),
          i("div", zi, [
            (v(!0), g(ve, null, he(s(l).get("pinnedFolders"), (j) => (v(), g("div", {
              key: j.path,
              class: Z(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": o.modelValue?.path === j.path }]),
              onClick: (z) => A(j),
              onDblclick: (z) => B(j),
              onTouchend: (z) => U(j)
            }, [
              O(s(Oe), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              i("div", Ni, y(j.basename), 1),
              i("div", Ui, y(j.storage), 1),
              O(s(Lt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ri))), 128))
          ])
        ])) : T("", !0),
        i("div", ji, y(s(n)("Storages")), 1),
        (v(!0), g(ve, null, he(_.value, (j) => (v(), g("div", {
          key: j,
          class: "vuefinder__modal-tree__section"
        }, [
          i("div", Hi, [
            i("div", Ki, [
              i("div", qi, [
                i("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ie((z) => S(j, j + "://"), ["stop"])
                }, [
                  u.value[`${j}:${j}://`] ? (v(), L(s($t), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (v(), L(s(kt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Gi),
                i("div", {
                  class: Z(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": o.modelValue?.path === j + "://"
                  }]),
                  onClick: (z) => Y(j),
                  onDblclick: (z) => R(j),
                  onTouchend: (z) => ee(j)
                }, [
                  O(s(Vt), { class: "vuefinder__modal-tree__storage-icon" }),
                  i("span", Yi, y(j), 1)
                ], 42, Wi)
              ]),
              u.value[`${j}:${j}://`] ? (v(), g("div", Qi, [
                (v(!0), g(ve, null, he(f(j + "://"), (z) => (v(), L(Ii, {
                  key: z.path,
                  folder: z,
                  storage: j,
                  "model-value": o.modelValue,
                  "expanded-folders": u.value,
                  "modal-tree-data": $.value,
                  "current-path": o.currentPath,
                  "onUpdate:modelValue": A,
                  onSelectAndClose: B,
                  onToggleFolder: S
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                C(j + "://") ? (v(), g("div", Xi, [
                  i("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (z) => F(j + "://")
                  }, y(s(n)("load more")), 9, Ji)
                ])) : T("", !0)
              ])) : T("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Zi = ["title"], Pt = /* @__PURE__ */ X({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(o, { emit: e }) {
    const t = e, n = J(), { t: a } = n.i18n, l = M(!1), d = M(null), r = M(d.value?.innerHTML);
    le(r, () => l.value = !1);
    const c = () => {
      t("hidden"), l.value = !0;
    };
    return (_, m) => (v(), g("div", null, [
      l.value ? T("", !0) : (v(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: d,
        class: Z(["vuefinder__message", o.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        $e(_.$slots, "default"),
        i("div", {
          class: "vuefinder__message__close",
          title: s(a)("Close"),
          onClick: c
        }, [...m[0] || (m[0] = [
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
        ])], 8, Zi)
      ], 2))
    ]));
  }
}), ea = { class: "vuefinder__move-modal__content" }, ta = { class: "vuefinder__move-modal__description" }, na = { class: "vuefinder__move-modal__files vf-scrollbar" }, oa = { class: "vuefinder__move-modal__file-name" }, sa = { class: "vuefinder__move-modal__target-title" }, ia = { class: "vuefinder__move-modal__target-container" }, aa = { class: "vuefinder__move-modal__target-path" }, ra = { class: "vuefinder__move-modal__target-storage" }, la = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, da = { class: "vuefinder__move-modal__target-badge" }, ca = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, ua = { class: "vuefinder__move-modal__checkbox-label" }, va = { class: "vuefinder__move-modal__checkbox-text" }, fa = ["disabled"], _a = { class: "vuefinder__move-modal__selected-items" }, Sn = /* @__PURE__ */ X({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(o) {
    const e = J(), { enabled: t } = Te(), { t: n } = e.i18n, a = o, l = M(e.modal.data.items.from), d = M(e.modal.data.items.to), r = M(""), c = M(a.copy || !t("move")), _ = N(() => c.value ? "copy" : "move"), m = M(!1), w = G(e.fs.path), u = N(() => c.value ? n("Copy files") : n("Move files")), $ = N(
      () => c.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), D = N(() => c.value ? n("Yes, Copy!") : n("Yes, Move!"));
    N(() => c.value ? n("Files copied.") : n("Files moved."));
    const S = (F) => {
      F && (d.value = F);
    }, p = (F) => {
      F && (d.value = F, m.value = !1);
    }, h = N(() => {
      const F = d.value;
      return F ? l.value.some((A) => !!(F.path === A.path || A.path.startsWith(F.path + "/") || A.type === "dir" && F.path.startsWith(A.path + "/"))) : !0;
    }), f = N(() => {
      if (!h.value)
        return "";
      const F = d.value;
      return F ? l.value.find((B) => F.path === B.path || B.path.startsWith(F.path + "/") || B.type === "dir" && F.path.startsWith(B.path + "/")) ? n("Cannot move/copy item to itself or its parent/child directory") : n("Invalid destination directory") : n("Please select a destination directory");
    }), k = () => {
      const F = d.value.path;
      if (!F) return { storage: "local", path: "" };
      if (F.endsWith("://"))
        return { storage: F.replace("://", ""), path: "" };
      const A = F.split("://");
      return {
        storage: A[0] || "local",
        path: A[1] || ""
      };
    }, C = async () => {
      if (l.value.length)
        try {
          const { files: F } = await e.adapter[_.value]({
            path: w.value.path,
            sources: l.value.map(({ path: A }) => A),
            destination: d.value.path
          });
          e.fs.setFiles(F), e.modal.close();
        } catch (F) {
          re.error(Ce(F, n("Failed to transfer files")));
        }
    };
    return (F, A) => (v(), L(Fe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: C
        }, y(D.value), 9, fa),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: A[4] || (A[4] = (B) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1),
        i("div", _a, y(s(n)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Pe, {
            icon: c.value ? s(Bt) : s(ui),
            title: u.value
          }, null, 8, ["icon", "title"]),
          i("div", ea, [
            i("p", ta, y($.value), 1),
            i("div", na, [
              (v(!0), g(ve, null, he(l.value, (B) => (v(), g("div", {
                key: B.path,
                class: "vuefinder__move-modal__file"
              }, [
                i("div", null, [
                  B.type === "dir" ? (v(), L(s(Oe), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (v(), L(s(lt), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                i("div", oa, y(B.path), 1)
              ]))), 128))
            ]),
            i("h4", sa, y(s(n)("Target Directory")), 1),
            i("div", ia, [
              i("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: A[0] || (A[0] = (B) => m.value = !m.value)
              }, [
                i("div", aa, [
                  i("span", ra, y(k().storage) + "://", 1),
                  k().path ? (v(), g("span", la, y(k().path), 1)) : T("", !0)
                ]),
                i("span", da, y(s(n)("Browse")), 1)
              ])
            ]),
            i("div", {
              class: Z([
                "vuefinder__move-modal__tree-selector",
                m.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              O(Rt, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  A[1] || (A[1] = (B) => d.value = B),
                  S
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: p
              }, null, 8, ["modelValue"])
            ], 2),
            s(t)("copy") && s(t)("move") ? (v(), g("div", ca, [
              i("label", ua, [
                pe(i("input", {
                  "onUpdate:modelValue": A[2] || (A[2] = (B) => c.value = B),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [mt, c.value]
                ]),
                i("span", va, y(s(n)("Create a copy instead of moving")), 1)
              ])
            ])) : T("", !0),
            f.value ? (v(), L(Pt, {
              key: 1,
              error: ""
            }, {
              default: oe(() => [
                de(y(f.value), 1)
              ]),
              _: 1
            })) : T("", !0),
            r.value.length && !f.value ? (v(), L(Pt, {
              key: 2,
              error: "",
              onHidden: A[3] || (A[3] = (B) => r.value = "")
            }, {
              default: oe(() => [
                de(y(r.value), 1)
              ]),
              _: 1
            })) : T("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ye = /* @__PURE__ */ X({
  __name: "ModalMove",
  setup(o) {
    return (e, t) => (v(), L(Sn, { copy: !1 }));
  }
}), Nt = /* @__PURE__ */ X({
  __name: "ModalCopy",
  setup(o) {
    return (e, t) => (v(), L(Sn, { copy: !0 }));
  }
}), pa = (o, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && o(...a), clearTimeout(n), n = setTimeout(() => {
      o(...a);
    }, e);
  };
}, Cn = (o, e, t) => {
  const n = M(o);
  return Un((a, l) => ({
    get() {
      return a(), n.value;
    },
    set: pa(
      (d) => {
        n.value = d, l();
      },
      e,
      !1
    )
  }));
}, ha = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function ma(o, e) {
  return v(), g("svg", ha, [...e[0] || (e[0] = [
    i("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Ut = { render: ma }, ga = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function wa(o, e) {
  return v(), g("svg", ga, [...e[0] || (e[0] = [
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
const xt = { render: wa }, ya = { class: "vuefinder__search-modal__search-input" }, ba = ["value", "placeholder", "disabled"], ka = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, $a = /* @__PURE__ */ X({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(o, { expose: e, emit: t }) {
    const n = t, a = J(), { t: l } = a.i18n, d = M(null), r = (_) => {
      const m = _.target;
      n("update:modelValue", m.value);
    }, c = (_) => {
      n("keydown", _);
    };
    return e({
      focus: () => {
        d.value && d.value.focus();
      }
    }), (_, m) => (v(), g("div", ya, [
      O(s(Ut), { class: "vuefinder__search-modal__search-icon" }),
      i("input", {
        ref_key: "searchInput",
        ref: d,
        value: o.modelValue,
        type: "text",
        placeholder: s(l)("Search files"),
        disabled: o.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: m[0] || (m[0] = ie(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, ba),
      o.isSearching ? (v(), g("div", ka, [
        O(s(xt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : T("", !0)
    ]));
  }
}), xa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Sa(o, e) {
  return v(), g("svg", xa, [...e[0] || (e[0] = [
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
const Fn = { render: Sa }, Ca = ["disabled", "title"], Fa = ["data-theme"], Da = { class: "vuefinder__search-modal__dropdown-content" }, Pa = { class: "vuefinder__search-modal__dropdown-section" }, Ea = { class: "vuefinder__search-modal__dropdown-title" }, Ma = { class: "vuefinder__search-modal__dropdown-options" }, Ta = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ia = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Aa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Oa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ba = /* @__PURE__ */ X({
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
    const n = o, a = t, l = J(), { t: d } = l.i18n, r = M(null), c = M(null);
    let _ = null;
    const m = (S) => {
      if (a("update:selectedOption", S), S.startsWith("size-")) {
        const p = S.split("-")[1];
        a("update:sizeFilter", p);
      }
    }, w = async () => {
      n.disabled || (n.visible ? (a("update:visible", !1), _ && (_(), _ = null)) : (a("update:visible", !0), await Ae(), await u()));
    }, u = async () => {
      if (!(!r.value || !c.value) && (await Ae(), !(!r.value || !c.value))) {
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
            middleware: [it(8), at({ padding: 16 }), rt({ padding: 16 })]
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
          _ = Mt(r.value, c.value, async () => {
            if (!(!r.value || !c.value))
              try {
                const { x: S, y: p } = await We(
                  r.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [it(8), at({ padding: 16 }), rt({ padding: 16 })]
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
    }, $ = (S) => {
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
    }, D = () => {
      _ && (_(), _ = null);
    };
    return le(
      () => n.visible,
      (S) => {
        !S && _ && (_(), _ = null);
      }
    ), ye(() => {
      D();
    }), e({
      cleanup: D
    }), (S, p) => (v(), g(ve, null, [
      i("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: Z(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": o.visible }]),
        disabled: o.disabled,
        title: s(d)("Search Options"),
        onClick: ie(w, ["stop"])
      }, [
        O(s(Fn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Ca),
      (v(), L(gt, { to: "body" }, [
        o.visible ? (v(), g("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": s(l).theme.current,
          tabindex: "-1",
          onClick: p[4] || (p[4] = ie(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          i("div", Da, [
            i("div", Pa, [
              i("div", Ea, y(s(d)("File Size")), 1),
              i("div", Ma, [
                i("div", {
                  class: Z(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "all"
                  }]),
                  onClick: p[0] || (p[0] = ie((h) => m("size-all"), ["stop"]))
                }, [
                  i("span", null, y(s(d)("All Files")), 1),
                  o.sizeFilter === "all" ? (v(), g("div", Ta, [...p[5] || (p[5] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2),
                i("div", {
                  class: Z(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "small"
                  }]),
                  onClick: p[1] || (p[1] = ie((h) => m("size-small"), ["stop"]))
                }, [
                  i("span", null, y(s(d)("Small (< 1MB)")), 1),
                  o.sizeFilter === "small" ? (v(), g("div", Ia, [...p[6] || (p[6] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2),
                i("div", {
                  class: Z(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "medium"
                  }]),
                  onClick: p[2] || (p[2] = ie((h) => m("size-medium"), ["stop"]))
                }, [
                  i("span", null, y(s(d)("Medium (1-10MB)")), 1),
                  o.sizeFilter === "medium" ? (v(), g("div", Aa, [...p[7] || (p[7] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2),
                i("div", {
                  class: Z(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "large"
                  }]),
                  onClick: p[3] || (p[3] = ie((h) => m("size-large"), ["stop"]))
                }, [
                  i("span", null, y(s(d)("Large (> 10MB)")), 1),
                  o.sizeFilter === "large" ? (v(), g("div", Oa, [...p[8] || (p[8] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, Fa)) : T("", !0)
      ]))
    ], 64));
  }
});
function Dn(o, e = 40) {
  const t = o.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return o;
  const n = t[1], a = t[2] ?? "", l = a.split("/").filter(Boolean), d = l.pop();
  if (!d) return n + a;
  let r = `${n}${l.join("/")}${l.length ? "/" : ""}${d}`;
  if (r.length <= e) return r;
  const c = d.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", m = c[1] ?? "", w = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, u = m ? `${w}.${m}` : w;
  return r = `${n}${l.join("/")}${l.length ? "/" : ""}${u}`, r.length > e && (r = `${n}.../${u}`), r;
}
async function Pn(o) {
  try {
    await navigator.clipboard.writeText(o);
  } catch {
    const e = document.createElement("textarea");
    e.value = o, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function dt(o) {
  await Pn(o);
}
async function La(o) {
  await Pn(o);
}
const Va = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function za(o, e) {
  return v(), g("svg", Va, [...e[0] || (e[0] = [
    i("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const En = { render: za }, Ra = ["title"], Na = { class: "vuefinder__search-modal__result-icon" }, Ua = { class: "vuefinder__search-modal__result-content" }, ja = { class: "vuefinder__search-modal__result-name" }, Ha = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Ka = ["title"], qa = ["title"], Ga = ["data-item-dropdown", "data-theme"], Wa = { class: "vuefinder__search-modal__item-dropdown-content" }, Ya = /* @__PURE__ */ X({
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
    const t = o, n = e, a = J(), { t: l } = a.i18n, d = M(null);
    let r = null;
    le(
      () => t.activeDropdown,
      (h) => {
        r && (r(), r = null), h === t.item.path && d.value && Ae(() => {
          w(t.item.path, d.value);
        });
      }
    ), ye(() => {
      r && (r(), r = null);
    });
    const c = (h) => t.expandedPaths.has(h), _ = (h) => h.type === "dir" || !h.file_size ? "" : It(h.file_size), m = (h, f) => {
      f.stopPropagation(), n("toggleItemDropdown", h, f);
    }, w = async (h, f) => {
      const k = document.querySelector(
        `[data-item-dropdown="${h}"]`
      );
      if (!(!k || !f) && (await Ae(), !(!k || !f))) {
        Object.assign(k.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: C, y: F } = await We(f, k, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [it(8), at({ padding: 16 }), rt({ padding: 16 })]
          });
          Object.assign(k.style, {
            left: `${C}px`,
            top: `${F}px`
          }), requestAnimationFrame(() => {
            k && Object.assign(k.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (C) {
          console.warn("Floating UI initial positioning error:", C);
          return;
        }
        try {
          r = Mt(f, k, async () => {
            if (!(!f || !k))
              try {
                const { x: C, y: F } = await We(f, k, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [it(8), at({ padding: 16 }), rt({ padding: 16 })]
                });
                Object.assign(k.style, {
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
    }, u = (h) => {
      n("update:selectedItemDropdownOption", h);
    }, $ = async (h) => {
      await dt(h.path), n("copyPath", h);
    }, D = (h) => {
      n("openContainingFolder", h);
    }, S = (h) => {
      n("preview", h);
    }, p = (h) => {
      if (!t.activeDropdown) return;
      const f = ["copy-path", "open-folder", "preview"], k = t.selectedItemDropdownOption, C = f.findIndex((F) => k?.includes(F));
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
      } else h.key === "Enter" ? (h.preventDefault(), k && (k.includes("copy-path") ? $(t.item) : k.includes("open-folder") ? D(t.item) : k.includes("preview") && S(t.item))) : h.key === "Escape" && (h.preventDefault(), n("update:selectedItemDropdownOption", null));
    };
    return (h, f) => (v(), g("div", {
      class: Z(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": o.index === o.selectedIndex }]),
      title: o.item.basename,
      onClick: f[9] || (f[9] = (k) => n("select", o.index))
    }, [
      i("div", Na, [
        o.item.type === "dir" ? (v(), L(s(Oe), { key: 0 })) : (v(), L(s(lt), { key: 1 }))
      ]),
      i("div", Ua, [
        i("div", ja, [
          de(y(o.item.basename) + " ", 1),
          _(o.item) ? (v(), g("span", Ha, y(_(o.item)), 1)) : T("", !0)
        ]),
        i("div", {
          class: "vuefinder__search-modal__result-path",
          title: o.item.path,
          onClick: f[0] || (f[0] = ie((k) => {
            n("select", o.index), n("togglePathExpansion", o.item.path);
          }, ["stop"]))
        }, y(c(o.item.path) ? o.item.path : s(Dn)(o.item.path)), 9, Ka)
      ]),
      i("button", {
        ref_key: "buttonElementRef",
        ref: d,
        class: "vuefinder__search-modal__result-actions",
        title: s(l)("More actions"),
        onClick: f[1] || (f[1] = (k) => {
          n("selectWithDropdown", o.index), m(o.item.path, k);
        })
      }, [
        O(s(En), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, qa),
      (v(), L(gt, { to: "body" }, [
        o.activeDropdown === o.item.path ? (v(), g("div", {
          key: 0,
          "data-item-dropdown": o.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": s(a).theme.current,
          tabindex: "-1",
          onClick: f[8] || (f[8] = ie(() => {
          }, ["stop"])),
          onKeydown: p
        }, [
          i("div", Wa, [
            i("div", {
              class: Z(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `copy-path-${o.item.path}`
              }]),
              onClick: f[2] || (f[2] = (k) => {
                u(`copy-path-${o.item.path}`), $(o.item);
              }),
              onFocus: f[3] || (f[3] = (k) => u(`copy-path-${o.item.path}`))
            }, [
              O(s(Bt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(l)("Copy Path")), 1)
            ], 34),
            i("div", {
              class: Z(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `open-folder-${o.item.path}`
              }]),
              onClick: f[4] || (f[4] = (k) => {
                u(`open-folder-${o.item.path}`), D(o.item);
              }),
              onFocus: f[5] || (f[5] = (k) => u(`open-folder-${o.item.path}`))
            }, [
              O(s(Oe), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(l)("Open Containing Folder")), 1)
            ], 34),
            i("div", {
              class: Z(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `preview-${o.item.path}`
              }]),
              onClick: f[6] || (f[6] = (k) => {
                u(`preview-${o.item.path}`), S(o.item);
              }),
              onFocus: f[7] || (f[7] = (k) => u(`preview-${o.item.path}`))
            }, [
              O(s(lt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(l)("Preview")), 1)
            ], 34)
          ])
        ], 40, Ga)) : T("", !0)
      ]))
    ], 10, Ra));
  }
}), Qa = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Xa = { class: "vuefinder__search-modal__loading-icon" }, Ja = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Za = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, er = { class: "vuefinder__search-modal__results-header" }, He = 60, on = 5, tr = /* @__PURE__ */ X({
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
    const n = o, a = t, l = J(), { t: d } = l.i18n, r = Ge("scrollableContainer"), c = N(() => n.searchResults.length > 0), _ = N(() => n.searchResults.length), m = M(0), w = M(600), u = N(() => n.searchResults.length * He), $ = N(() => {
      const k = Math.max(0, Math.floor(m.value / He) - on), C = Math.min(
        n.searchResults.length,
        Math.ceil((m.value + w.value) / He) + on
      );
      return { start: k, end: C };
    }), D = N(() => {
      const { start: k, end: C } = $.value;
      return n.searchResults.slice(k, C).map((F, A) => ({
        item: F,
        index: k + A,
        top: (k + A) * He
      }));
    }), S = (k) => {
      const C = k.target;
      m.value = C.scrollTop;
    }, p = () => {
      r.value && (w.value = r.value.clientHeight);
    }, h = () => {
      if (n.selectedIndex >= 0 && r.value) {
        const k = n.selectedIndex * He, C = k + He, F = r.value.scrollTop, A = r.value.clientHeight, B = F + A;
        let Y = F;
        k < F ? Y = k : C > B && (Y = C - A), Y !== F && r.value.scrollTo({
          top: Y,
          behavior: "smooth"
        });
      }
    }, f = () => {
      r.value && (r.value.scrollTop = 0, m.value = 0);
    };
    return fe(() => {
      p(), window.addEventListener("resize", p);
    }), ye(() => {
      window.removeEventListener("resize", p);
    }), le(
      () => r.value,
      () => {
        p();
      }
    ), e({
      scrollSelectedIntoView: h,
      resetScroll: f,
      getContainerHeight: () => w.value,
      scrollTop: () => m.value
    }), (k, C) => (v(), g("div", {
      class: Z(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": o.resultsEnter }])
    }, [
      o.isSearching ? (v(), g("div", Qa, [
        i("div", Xa, [
          O(s(xt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        i("span", null, y(s(d)("Searching...")), 1)
      ])) : c.value ? (v(), g("div", Za, [
        i("div", er, [
          i("span", null, y(s(d)("Found %s results", _.value)), 1)
        ]),
        i("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: S
        }, [
          i("div", {
            class: "vuefinder__search-modal__results-items",
            style: Ve({ height: `${u.value}px`, position: "relative" })
          }, [
            (v(!0), g(ve, null, he(D.value, (F) => (v(), g("div", {
              key: F.item.path,
              style: Ve({
                position: "absolute",
                top: `${F.top}px`,
                left: "0",
                width: "100%",
                height: `${He}px`
              })
            }, [
              O(Ya, {
                item: F.item,
                index: F.index,
                "selected-index": o.selectedIndex,
                "expanded-paths": o.expandedPaths,
                "active-dropdown": o.activeDropdown,
                "selected-item-dropdown-option": o.selectedItemDropdownOption,
                onSelect: C[0] || (C[0] = (A) => a("selectResultItem", A)),
                onSelectWithDropdown: C[1] || (C[1] = (A) => a("selectResultItemWithDropdown", A)),
                onTogglePathExpansion: C[2] || (C[2] = (A) => a("togglePathExpansion", A)),
                onToggleItemDropdown: C[3] || (C[3] = (A, B) => a("toggleItemDropdown", A, B)),
                "onUpdate:selectedItemDropdownOption": C[4] || (C[4] = (A) => a("update:selectedItemDropdownOption", A)),
                onCopyPath: C[5] || (C[5] = (A) => a("copyPath", A)),
                onOpenContainingFolder: C[6] || (C[6] = (A) => a("openContainingFolder", A)),
                onPreview: C[7] || (C[7] = (A) => a("preview", A))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (v(), g("div", Ja, [
        i("span", null, y(s(d)("No results found")), 1)
      ]))
    ], 2));
  }
}), nr = { class: "vuefinder__search-modal" }, or = { class: "vuefinder__search-modal__content" }, sr = { class: "vuefinder__search-modal__search-bar" }, ir = { class: "vuefinder__search-modal__search-location" }, ar = ["title"], rr = ["disabled"], lr = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, dr = { class: "vuefinder__search-modal__folder-selector-content" }, cr = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ur = { class: "vuefinder__search-modal__instructions-text" }, jt = /* @__PURE__ */ X({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = M(null), l = M(null), d = M(null), r = Cn("", 300), c = M([]), _ = M(!1), m = M(-1), w = M(!1), u = M(!1), $ = M(null), D = M("all"), S = M(!1), p = M(`size-${D.value}`), h = M(null), f = M(/* @__PURE__ */ new Set()), k = M(null), C = G(n.path), F = (b) => {
      f.value.has(b) ? f.value.delete(b) : f.value.add(b);
    }, A = (b, P) => {
      P && typeof P.stopPropagation == "function" && P.stopPropagation(), k.value === b ? k.value = null : k.value = b;
    }, B = () => {
      k.value = null;
    }, Y = (b) => {
      try {
        const P = b.dir || `${b.storage}://`;
        e.adapter.open(P), e.modal.close(), B();
      } catch {
        re.error(t("Failed to open containing folder"));
      }
    }, R = (b) => {
      e.modal.open(bt, {
        storage: C?.value?.storage ?? "local",
        item: b
      }), B();
    }, ne = (b) => {
      m.value = b, B();
    }, U = (b) => {
      m.value = b;
    }, ee = async (b) => {
      await dt(b.path), B();
    };
    le(r, async (b) => {
      b.trim() ? (await E(b.trim()), m.value = 0) : (c.value = [], _.value = !1, m.value = -1);
    }), le(D, async (b) => {
      p.value = `size-${b}`, r.value.trim() && !u.value && (await E(r.value.trim()), m.value = 0);
    }), le(S, async () => {
      r.value.trim() && !u.value && (await E(r.value.trim()), m.value = 0);
    });
    const E = async (b) => {
      if (b) {
        _.value = !0;
        try {
          const P = $.value?.path || C?.value?.path, I = await e.adapter.search({
            path: P,
            filter: b,
            deep: S.value,
            size: D.value
          });
          c.value = I || [], _.value = !1;
        } catch (P) {
          re.error(Ce(P, t("Search failed"))), c.value = [], _.value = !1;
        }
      }
    };
    fe(() => {
      document.addEventListener("click", x), p.value = `size-${D.value}`;
    });
    const q = () => {
      u.value ? (u.value = !1, r.value.trim() && (E(r.value.trim()), m.value = 0)) : (w.value = !1, u.value = !0);
    }, j = (b) => {
      b && ($.value = b);
    }, z = (b) => {
      b && (j(b), u.value = !1, r.value.trim() && (E(r.value.trim()), m.value = 0));
    };
    ye(() => {
      document.removeEventListener("click", x), l.value && l.value.cleanup();
    });
    const x = (b) => {
      const P = b.target;
      if (w.value && (P.closest(".vuefinder__search-modal__dropdown") || (w.value = !1, Ae(() => {
        a.value && a.value.focus();
      }))), k.value) {
        const I = P.closest(".vuefinder__search-modal__item-dropdown"), W = P.closest(".vuefinder__search-modal__result-item");
        !I && !W && B();
      }
    };
    return (b, P) => (v(), L(Fe, { class: "vuefinder__search-modal-layout" }, {
      default: oe(() => [
        i("div", nr, [
          O(Pe, {
            icon: s(Ut),
            title: s(t)("Search files")
          }, null, 8, ["icon", "title"]),
          i("div", or, [
            i("div", sr, [
              O($a, {
                ref_key: "searchInputRef",
                ref: a,
                modelValue: s(r),
                "onUpdate:modelValue": P[0] || (P[0] = (I) => jn(r) ? r.value = I : null),
                "is-searching": _.value,
                disabled: u.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              O(Ba, {
                ref_key: "searchOptionsDropdownRef",
                ref: l,
                visible: w.value,
                "onUpdate:visible": P[1] || (P[1] = (I) => w.value = I),
                "size-filter": D.value,
                "onUpdate:sizeFilter": P[2] || (P[2] = (I) => D.value = I),
                "selected-option": p.value,
                "onUpdate:selectedOption": P[3] || (P[3] = (I) => p.value = I),
                disabled: u.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            i("div", {
              class: "vuefinder__search-modal__options",
              onClick: P[7] || (P[7] = ie(() => {
              }, ["stop"]))
            }, [
              i("div", ir, [
                i("button", {
                  class: Z(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": u.value }]),
                  onClick: ie(q, ["stop"])
                }, [
                  O(s(Oe), { class: "vuefinder__search-modal__location-icon" }),
                  i("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: $.value?.path || s(C).path
                  }, y(s(Dn)($.value?.path || s(C).path)), 9, ar),
                  P[10] || (P[10] = i("svg", {
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
                onClick: P[6] || (P[6] = ie(() => {
                }, ["stop"]))
              }, [
                pe(i("input", {
                  "onUpdate:modelValue": P[4] || (P[4] = (I) => S.value = I),
                  type: "checkbox",
                  disabled: u.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: P[5] || (P[5] = ie(() => {
                  }, ["stop"]))
                }, null, 8, rr), [
                  [mt, S.value]
                ]),
                i("span", null, y(s(t)("Include subfolders")), 1)
              ])
            ]),
            u.value ? (v(), g("div", lr, [
              i("div", dr, [
                O(Rt, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [
                    P[8] || (P[8] = (I) => $.value = I),
                    j
                  ],
                  "show-pinned-folders": !0,
                  "current-path": s(C),
                  onSelectAndClose: z
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : T("", !0),
            !s(r).trim() && !u.value ? (v(), g("div", cr, [
              i("p", ur, y(s(t)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : T("", !0),
            s(r).trim() && !u.value ? (v(), L(tr, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": c.value,
              "is-searching": _.value,
              "selected-index": m.value,
              "expanded-paths": f.value,
              "active-dropdown": k.value,
              "selected-item-dropdown-option": h.value,
              "results-enter": !0,
              onSelectResultItem: ne,
              onSelectResultItemWithDropdown: U,
              onTogglePathExpansion: F,
              onToggleItemDropdown: A,
              "onUpdate:selectedItemDropdownOption": P[9] || (P[9] = (I) => h.value = I),
              onCopyPath: ee,
              onOpenContainingFolder: Y,
              onPreview: R
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : T("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), vr = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(o, { emit: e, slots: t }) {
    const n = J(), a = M(!1), { t: l } = n.i18n;
    let d = null;
    const r = () => {
      d && clearTimeout(d), a.value = !0, d = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return fe(() => {
      n.emitter.on(o.on, r);
    }), ye(() => {
      d && clearTimeout(d);
    }), {
      shown: a,
      t: l
    };
  }
}, fr = (o, e) => {
  const t = o.__vccOpts || o;
  for (const [n, a] of e)
    t[n] = a;
  return t;
}, _r = { key: 1 };
function pr(o, e, t, n, a, l) {
  return v(), g("div", {
    class: Z(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    o.$slots.default ? $e(o.$slots, "default", { key: 0 }) : (v(), g("span", _r, y(n.t("Saved.")), 1))
  ], 2);
}
const tt = /* @__PURE__ */ fr(vr, [["render", pr]]), hr = [
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
], mr = { class: "vuefinder__about-modal__content" }, gr = { class: "vuefinder__about-modal__main" }, wr = { class: "vuefinder__about-modal__description" }, yr = { class: "vuefinder__about-modal__settings" }, br = { class: "vuefinder__about-modal__settings__fieldset" }, kr = { class: "vuefinder__about-modal__settings__section-title" }, $r = { class: "vuefinder__about-modal__setting" }, xr = { class: "vuefinder__about-modal__setting-label" }, Sr = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Cr = { class: "vuefinder__about-modal__setting-input justify-end" }, Fr = ["checked"], Dr = { class: "vuefinder__about-modal__setting" }, Pr = { class: "vuefinder__about-modal__setting-label" }, Er = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Mr = { class: "vuefinder__about-modal__setting-input justify-end" }, Tr = ["checked"], Ir = { class: "vuefinder__about-modal__setting" }, Ar = { class: "vuefinder__about-modal__setting-label" }, Or = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Br = { class: "vuefinder__about-modal__setting-input justify-end" }, Lr = ["checked"], Vr = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, zr = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, Rr = { class: "vuefinder__about-modal__setting-input justify-end" }, Nr = ["value"], Ur = ["label"], jr = ["value"], Hr = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, Kr = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, qr = { class: "vuefinder__about-modal__setting-input justify-end" }, Gr = ["label"], Wr = ["value"], Yr = { class: "vuefinder__about-modal__tab-content" }, Qr = { class: "vuefinder__about-modal__settings__section-title" }, Xr = { class: "vuefinder__about-modal__description" }, Mn = /* @__PURE__ */ X({
  __name: "ModalSettings",
  setup(o) {
    const e = J(), { enabled: t } = Te(), n = e.config, { clearStore: a } = e.storage, { t: l } = e.i18n, d = G(n.state), r = N(() => d.value.theme || "silver"), c = async () => {
      n.reset(), a(), location.reload();
    }, _ = (p) => {
      n.set("theme", p), e.emitter.emit("vf-theme-saved");
    }, m = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? mn : It, e.emitter.emit("vf-metric-units-saved");
    }, w = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, u = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: $ } = ft("VueFinderOptions"), S = Object.fromEntries(
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
    return (p, h) => (v(), L(Fe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[2] || (h[2] = (f) => s(e).modal.close())
        }, y(s(l)("Close")), 1)
      ]),
      default: oe(() => [
        i("div", mr, [
          O(Pe, {
            icon: s(Fn),
            title: s(l)("Settings")
          }, null, 8, ["icon", "title"]),
          i("div", gr, [
            i("div", wr, y(s(l)("Customize your experience with the following settings")), 1),
            i("div", yr, [
              i("fieldset", br, [
                i("div", kr, y(s(l)("General")), 1),
                i("div", $r, [
                  i("div", xr, [
                    i("label", Sr, y(s(l)("Use Metric Units")), 1)
                  ]),
                  i("div", Cr, [
                    i("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: s(n).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: m
                    }, null, 40, Fr),
                    O(tt, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: oe(() => [
                        de(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", Dr, [
                  i("div", Pr, [
                    i("label", Er, y(s(l)("Compact list view")), 1)
                  ]),
                  i("div", Mr, [
                    i("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: s(n).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: w
                    }, null, 40, Tr),
                    O(tt, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: oe(() => [
                        de(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", Ir, [
                  i("div", Ar, [
                    i("label", Or, y(s(l)("Persist path on reload")), 1)
                  ]),
                  i("div", Br, [
                    i("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: s(n).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: u
                    }, null, 40, Lr),
                    O(tt, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: oe(() => [
                        de(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s(t)("theme") ? (v(), g("div", Vr, y(s(l)("Theme")), 1)) : T("", !0),
                s(t)("theme") ? (v(), g("div", zr, [
                  i("div", Rr, [
                    i("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: h[0] || (h[0] = (f) => _(f.target?.value))
                    }, [
                      i("optgroup", {
                        label: s(l)("Theme")
                      }, [
                        (v(!0), g(ve, null, he(s(hr), (f) => (v(), g("option", {
                          key: f.name,
                          value: f.name
                        }, y(f.displayName), 9, jr))), 128))
                      ], 8, Ur)
                    ], 40, Nr),
                    O(tt, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: oe(() => [
                        de(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : T("", !0),
                s(t)("language") && Object.keys(s(S)).length > 1 ? (v(), g("div", Hr, y(s(l)("Language")), 1)) : T("", !0),
                s(t)("language") && Object.keys(s(S)).length > 1 ? (v(), g("div", Kr, [
                  i("div", qr, [
                    pe(i("select", {
                      id: "language",
                      "onUpdate:modelValue": h[1] || (h[1] = (f) => s(e).i18n.locale = f),
                      class: "vuefinder__about-modal__select"
                    }, [
                      i("optgroup", {
                        label: s(l)("Language")
                      }, [
                        (v(!0), g(ve, null, he(s(S), (f, k) => (v(), g("option", {
                          key: k,
                          value: k
                        }, y(f), 9, Wr))), 128))
                      ], 8, Gr)
                    ], 512), [
                      [Ft, s(e).i18n.locale]
                    ]),
                    O(tt, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: oe(() => [
                        de(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : T("", !0)
              ])
            ]),
            i("div", Yr, [
              i("div", Qr, y(s(l)("Reset")), 1),
              i("div", Xr, y(s(l)("Reset all settings to default")), 1),
              i("button", {
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
}), xe = {
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
function Jr() {
  const o = J(), e = o.fs, t = o.config, { enabled: n } = Te(), a = G(e.path), l = G(e.selectedItems), d = (r) => {
    if (r.code === xe.ESCAPE && (o.modal.close(), o.root.focus()), !o.modal.visible) {
      if (r.metaKey && r.code === xe.KEY_R && !r.shiftKey && (o.adapter.invalidateListQuery(a.value.path), o.adapter.open(a.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === xe.KEY_R && n("rename") && l.value.length === 1 && (o.modal.open(yt, { items: l.value }), r.preventDefault()), r.code === xe.DELETE && l.value.length !== 0 && o.modal.open(wt, { items: l.value }), r.metaKey && r.code === xe.BACKSLASH && o.modal.open(bn), r.metaKey && r.code === xe.KEY_F && n("search") && (o.modal.open(jt), r.preventDefault()), r.metaKey && r.code === xe.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === xe.KEY_S && (o.modal.open(Mn), r.preventDefault()), r.metaKey && r.code === xe.ENTER && (t.toggle("fullScreen"), o.root.focus()), r.metaKey && r.code === xe.KEY_A && (e.selectAll(o.selectionMode || "multiple", o), r.preventDefault()), r.code === xe.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && o.modal.open(bt, {
        storage: e.path.get().storage,
        item: l.value[0]
      }), r.metaKey && r.code === xe.KEY_C && n("copy")) {
        if (l.value.length === 0) {
          re.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("copy", new Set(l.value.map((c) => c.path))), re.success(
          l.value.length === 1 ? o.i18n.t("Item copied to clipboard") : o.i18n.t("%s items copied to clipboard", l.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === xe.KEY_X && n("copy")) {
        if (l.value.length === 0) {
          re.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("cut", new Set(l.value.map((c) => c.path))), re.success(
          l.value.length === 1 ? o.i18n.t("Item cut to clipboard") : o.i18n.t("%s items cut to clipboard", l.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === xe.KEY_V && n("copy")) {
        if (e.getClipboard().items.size === 0) {
          re.error(o.i18n.t("No items in clipboard"));
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          re.error(o.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (e.getClipboard().type === "cut") {
          o.modal.open(Ye, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          o.modal.open(Nt, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  fe(async () => {
    if (await Ae(), !o.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    o.root.addEventListener("keydown", d);
  }), vn(() => {
    o.root && o.root.removeEventListener("keydown", d);
  });
}
function Zr() {
  const o = M(!1), e = M([]);
  return {
    isDraggingExternal: o,
    externalFiles: e,
    handleDragEnter: (r) => {
      r.preventDefault(), r.stopPropagation();
      const c = r.dataTransfer?.items;
      c && Array.from(c).some((m) => m.kind === "file") && (o.value = !0, r.isExternalDrag = !0);
    },
    handleDragOver: (r) => {
      o.value && r.dataTransfer && (r.dataTransfer.dropEffect = "copy", r.preventDefault(), r.stopPropagation());
    },
    handleDragLeave: (r) => {
      r.preventDefault();
      const c = r.currentTarget.getBoundingClientRect(), _ = r.clientX, m = r.clientY;
      (_ < c.left || _ > c.right || m < c.top || m > c.bottom) && (o.value = !1);
    },
    handleDrop: async (r) => {
      r.preventDefault(), r.stopPropagation(), o.value = !1;
      const c = r.dataTransfer?.items;
      if (c) {
        const _ = Array.from(c).filter((m) => m.kind === "file");
        if (_.length > 0) {
          e.value = [];
          for (const m of _) {
            const w = m.webkitGetAsEntry?.();
            if (w)
              await Ot((u, $) => {
                e.value.push({
                  name: $.name,
                  size: $.size,
                  type: $.type,
                  lastModified: new Date($.lastModified),
                  file: $
                });
              }, w);
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
const el = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function tl(o, e) {
  return v(), g("svg", el, [...e[0] || (e[0] = [
    i("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Tn = { render: tl }, nl = { class: "vuefinder__new-folder-modal__content" }, ol = { class: "vuefinder__new-folder-modal__form" }, sl = { class: "vuefinder__new-folder-modal__description" }, il = ["placeholder"], Ht = /* @__PURE__ */ X({
  __name: "ModalNewFolder",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = M(""), d = () => {
      l.value !== "" && e.adapter.createFolder({
        path: a.value.path,
        name: l.value
      }).then((r) => {
        re.success(t("%s is created.", l.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        re.error(Ce(r, t("Failed to create folder")));
      });
    };
    return (r, c) => (v(), L(Fe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(s(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[1] || (c[1] = (_) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Pe, {
            icon: s(Tn),
            title: s(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          i("div", nl, [
            i("div", ol, [
              i("p", sl, y(s(t)("Create a new folder")), 1),
              pe(i("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => l.value = _),
                class: "vuefinder__new-folder-modal__input",
                placeholder: s(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: ct(d, ["enter"])
              }, null, 40, il), [
                [ut, l.value]
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
  return v(), g("svg", al, [...e[0] || (e[0] = [
    i("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const In = { render: rl }, ll = { class: "vuefinder__new-file-modal__content" }, dl = { class: "vuefinder__new-file-modal__form" }, cl = { class: "vuefinder__new-file-modal__description" }, ul = ["placeholder"], An = /* @__PURE__ */ X({
  __name: "ModalNewFile",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = M(""), d = () => {
      l.value !== "" && e.adapter.createFile({
        path: a.value.path,
        name: l.value
      }).then((r) => {
        re.success(t("%s is created.", l.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        re.error(Ce(r, t("Failed to create file")));
      });
    };
    return (r, c) => (v(), L(Fe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(s(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[1] || (c[1] = (_) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Pe, {
            icon: s(In),
            title: s(t)("New File")
          }, null, 8, ["icon", "title"]),
          i("div", ll, [
            i("div", dl, [
              i("p", cl, y(s(t)("Create a new file")), 1),
              pe(i("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => l.value = _),
                class: "vuefinder__new-file-modal__input",
                placeholder: s(t)("File Name"),
                type: "text",
                onKeyup: ct(d, ["enter"])
              }, null, 40, ul), [
                [ut, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Et(o, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return o.replace(new RegExp(t), "$2..$4");
}
const vl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function fl(o, e) {
  return v(), g("svg", vl, [...e[0] || (e[0] = [
    i("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const On = { render: fl }, _l = { class: "vuefinder__upload-modal__content relative" }, pl = { class: "vuefinder__upload-modal__target-section" }, hl = { class: "vuefinder__upload-modal__target-label" }, ml = { class: "vuefinder__upload-modal__target-container" }, gl = { class: "vuefinder__upload-modal__target-path" }, wl = { class: "vuefinder__upload-modal__target-storage" }, yl = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, bl = { class: "vuefinder__upload-modal__target-badge" }, kl = { class: "vuefinder__upload-modal__drag-hint" }, $l = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, xl = ["textContent"], Sl = { class: "vuefinder__upload-modal__file-info" }, Cl = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Fl = { class: "vuefinder__upload-modal__file-name md:hidden" }, Dl = {
  key: 0,
  class: "ml-auto"
}, Pl = ["title", "disabled", "onClick"], El = {
  key: 0,
  class: "py-2"
}, Ml = ["aria-expanded"], Tl = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, Il = ["disabled"], Al = ["aria-expanded"], Ol = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Kt = /* @__PURE__ */ X({
  __name: "ModalUpload",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = M(a.value), d = M(!1), r = () => {
      const x = l.value.path;
      if (!x) return { storage: "local", path: "" };
      if (x.endsWith("://"))
        return { storage: x.replace("://", ""), path: "" };
      const b = x.split("://");
      return {
        storage: b[0] || "local",
        path: b[1] || ""
      };
    }, c = (x) => {
      x && (l.value = x);
    }, _ = (x) => {
      x && (l.value = x, d.value = !1);
    }, {
      container: m,
      internalFileInput: w,
      internalFolderInput: u,
      pickFiles: $,
      queue: D,
      message: S,
      uploading: p,
      hasFilesInDropArea: h,
      definitions: f,
      openFileSelector: k,
      upload: C,
      cancel: F,
      remove: A,
      clear: B,
      close: Y,
      getClassNameForEntry: R,
      getIconForEntry: ne,
      addExternalFiles: U
    } = xn(e.customUploader), ee = () => {
      C(l.value);
    };
    fe(() => {
      e.emitter.on("vf-external-files-dropped", (x) => {
        U(x);
      });
    }), ye(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const E = M(!1), q = M(null), j = M(null), z = (x) => {
      if (!E.value) return;
      const b = x.target, P = q.value?.contains(b) ?? !1, I = j.value?.contains(b) ?? !1;
      !P && !I && (E.value = !1);
    };
    return fe(() => document.addEventListener("click", z)), ye(() => document.removeEventListener("click", z)), (x, b) => (v(), L(Fe, {
      "show-drag-overlay": s(h),
      "drag-overlay-text": s(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: oe(() => [
        i("div", {
          ref_key: "actionsMenuMobileRef",
          ref: q,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          i("div", {
            class: Z([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              E.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: b[3] || (b[3] = (P) => s(k)())
            }, y(s(t)("Select Files")), 1),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": E.value ? "true" : "false",
              onClick: b[4] || (b[4] = ie((P) => E.value = !E.value, ["stop"]))
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
            ])], 8, Ml)
          ], 2),
          E.value ? (v(), g("div", Tl, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[5] || (b[5] = (P) => {
                s(k)(), E.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[6] || (b[6] = (P) => {
                s(u)?.click(), E.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            b[18] || (b[18] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: Z(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: b[7] || (b[7] = (P) => s(p) ? null : (s(B)(!1), E.value = !1))
            }, y(s(t)("Clear all")), 3),
            i("div", {
              class: Z(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: b[8] || (b[8] = (P) => s(p) ? null : (s(B)(!0), E.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : T("", !0)
        ], 512),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: s(p) || !s(D).length,
          onClick: ie(ee, ["prevent"])
        }, y(s(t)("Upload")), 9, Il),
        s(p) ? (v(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[9] || (b[9] = ie(
            //@ts-ignore
            (...P) => s(F) && s(F)(...P),
            ["prevent"]
          ))
        }, y(s(t)("Cancel")), 1)) : (v(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[10] || (b[10] = ie(
            //@ts-ignore
            (...P) => s(Y) && s(Y)(...P),
            ["prevent"]
          ))
        }, y(s(t)("Close")), 1)),
        i("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: j,
          class: "relative mr-auto hidden sm:block"
        }, [
          i("div", {
            class: Z(["vuefinder__upload-actions", E.value ? "vuefinder__upload-actions--ring" : ""])
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
              "aria-expanded": E.value ? "true" : "false",
              onClick: b[11] || (b[11] = ie((P) => E.value = !E.value, ["stop"]))
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
            ])], 8, Al)
          ], 2),
          E.value ? (v(), g("div", Ol, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[12] || (b[12] = (P) => {
                s(k)(), E.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[13] || (b[13] = (P) => {
                s(u)?.click(), E.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            b[20] || (b[20] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: Z(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: b[14] || (b[14] = (P) => s(p) ? null : (s(B)(!1), E.value = !1))
            }, y(s(t)("Clear all")), 3),
            i("div", {
              class: Z(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: b[15] || (b[15] = (P) => s(p) ? null : (s(B)(!0), E.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : T("", !0)
        ], 512)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Pe, {
            icon: s(On),
            title: s(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          i("div", _l, [
            i("div", pl, [
              i("div", hl, y(s(t)("Target Directory")), 1),
              i("div", ml, [
                i("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: b[0] || (b[0] = (P) => d.value = !d.value)
                }, [
                  i("div", gl, [
                    i("span", wl, y(r().storage) + "://", 1),
                    r().path ? (v(), g("span", yl, y(r().path), 1)) : T("", !0)
                  ]),
                  i("span", bl, y(s(t)("Browse")), 1)
                ])
              ]),
              i("div", {
                class: Z([
                  "vuefinder__upload-modal__tree-selector",
                  d.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                O(Rt, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    b[1] || (b[1] = (P) => l.value = P),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            i("div", kl, y(s(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            i("div", {
              ref_key: "container",
              ref: m,
              class: "hidden"
            }, null, 512),
            i("div", $l, [
              (v(!0), g(ve, null, he(s(D), (P) => (v(), g("div", {
                key: P.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                i("span", {
                  class: Z(["vuefinder__upload-modal__file-icon", s(R)(P)])
                }, [
                  i("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(s(ne)(P))
                  }, null, 8, xl)
                ], 2),
                i("div", Sl, [
                  i("div", Cl, y(s(Et)(P.name, 40)) + " (" + y(P.size) + ") ", 1),
                  i("div", Fl, y(s(Et)(P.name, 16)) + " (" + y(P.size) + ") ", 1),
                  i("div", {
                    class: Z(["vuefinder__upload-modal__file-status", s(R)(P)])
                  }, [
                    de(y(P.statusName) + " ", 1),
                    P.status === s(f).QUEUE_ENTRY_STATUS.UPLOADING ? (v(), g("b", Dl, y(P.percent), 1)) : T("", !0)
                  ], 2)
                ]),
                i("button", {
                  type: "button",
                  class: Z(["vuefinder__upload-modal__file-remove", s(p) ? "disabled" : ""]),
                  title: s(t)("Delete"),
                  disabled: s(p),
                  onClick: (I) => s(A)(P)
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
                ])], 10, Pl)
              ]))), 128)),
              s(D).length ? T("", !0) : (v(), g("div", El, y(s(t)("No files selected!")), 1))
            ]),
            s(S).length ? (v(), L(Pt, {
              key: 0,
              error: "",
              onHidden: b[2] || (b[2] = (P) => S.value = "")
            }, {
              default: oe(() => [
                de(y(s(S)), 1)
              ]),
              _: 1
            })) : T("", !0)
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
}), Bl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ll(o, e) {
  return v(), g("svg", Bl, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Bn = { render: Ll }, Vl = { class: "vuefinder__unarchive-modal__content" }, zl = { class: "vuefinder__unarchive-modal__items" }, Rl = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nl = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ul = { class: "vuefinder__unarchive-modal__item-name" }, jl = { class: "vuefinder__unarchive-modal__info" }, qt = /* @__PURE__ */ X({
  __name: "ModalUnarchive",
  setup(o) {
    const e = J(), t = e.fs, n = G(t.path), { t: a } = e.i18n, l = M(e.modal.data.items[0]), d = M([]), r = () => {
      e.adapter.unarchive({
        item: l.value.path,
        path: n.value.path
      }).then((c) => {
        re.success(a("The file unarchived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        re.error(Ce(c, a("Failed to unarchive")));
      });
    };
    return (c, _) => (v(), L(Fe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(a)("Unarchive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[0] || (_[0] = (m) => s(e).modal.close())
        }, y(s(a)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Pe, {
            icon: s(Bn),
            title: s(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          i("div", Vl, [
            i("div", zl, [
              (v(!0), g(ve, null, he(d.value, (m) => (v(), g("p", {
                key: m.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                m.type === "dir" ? (v(), g("svg", Rl, [..._[1] || (_[1] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (v(), g("svg", Nl, [..._[2] || (_[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", Ul, y(m.basename), 1)
              ]))), 128)),
              i("p", jl, y(s(a)("The archive will be unarchived at")) + " (" + y(s(n).path) + ") ", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Hl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Kl(o, e) {
  return v(), g("svg", Hl, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Ln = { render: Kl }, ql = { class: "vuefinder__archive-modal__content" }, Gl = { class: "vuefinder__archive-modal__form" }, Wl = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Yl = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ql = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xl = { class: "vuefinder__archive-modal__file-name" }, Jl = ["placeholder"], Gt = /* @__PURE__ */ X({
  __name: "ModalArchive",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = M(""), d = M(e.modal.data.items), r = () => {
      d.value.length && e.adapter.archive({
        path: a.value.path,
        items: d.value.map(({ path: c, type: _ }) => ({
          path: c,
          type: _
        })),
        name: l.value
      }).then((c) => {
        re.success(t("The file(s) archived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        re.error(Ce(c, t("Failed to archive files")));
      });
    };
    return (c, _) => (v(), L(Fe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(t)("Archive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (m) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Pe, {
            icon: s(Ln),
            title: s(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          i("div", ql, [
            i("div", Gl, [
              i("div", Wl, [
                (v(!0), g(ve, null, he(d.value, (m) => (v(), g("p", {
                  key: m.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  m.type === "dir" ? (v(), g("svg", Yl, [..._[2] || (_[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), g("svg", Ql, [..._[3] || (_[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Xl, y(m.basename), 1)
                ]))), 128))
              ]),
              pe(i("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (m) => l.value = m),
                class: "vuefinder__archive-modal__input",
                placeholder: s(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: ct(r, ["enter"])
              }, null, 40, Jl), [
                [ut, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Zl = { class: "vuefinder__about-modal__content" }, ed = { class: "vuefinder__about-modal__main" }, td = { class: "vuefinder__about-modal__shortcuts" }, nd = { class: "vuefinder__about-modal__shortcut" }, od = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, sd = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, id = { class: "vuefinder__about-modal__shortcut" }, ad = { class: "vuefinder__about-modal__shortcut" }, rd = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, ld = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, dd = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, cd = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, ud = { class: "vuefinder__about-modal__shortcut" }, vd = { class: "vuefinder__about-modal__shortcut" }, fd = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, _d = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, pd = /* @__PURE__ */ X({
  __name: "ModalShortcuts",
  setup(o) {
    const e = J(), { enabled: t } = Te(), { t: n } = e.i18n;
    return (a, l) => (v(), L(Fe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (d) => s(e).modal.close())
        }, y(s(n)("Close")), 1)
      ]),
      default: oe(() => [
        i("div", Zl, [
          O(Pe, {
            icon: s(yn),
            title: s(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          i("div", ed, [
            i("div", td, [
              i("div", nd, [
                i("div", null, y(s(n)("Refresh")), 1),
                l[1] || (l[1] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "R")
                ], -1))
              ]),
              s(t)("rename") ? (v(), g("div", od, [
                i("div", null, y(s(n)("Rename")), 1),
                l[2] || (l[2] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "Shift"),
                  de(" + "),
                  i("kbd", null, "R")
                ], -1))
              ])) : T("", !0),
              s(t)("delete") ? (v(), g("div", sd, [
                i("div", null, y(s(n)("Delete")), 1),
                l[3] || (l[3] = i("kbd", null, "Del", -1))
              ])) : T("", !0),
              i("div", id, [
                i("div", null, y(s(n)("Escape")), 1),
                l[4] || (l[4] = i("kbd", null, "Esc", -1))
              ]),
              i("div", ad, [
                i("div", null, y(s(n)("Select All")), 1),
                l[5] || (l[5] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "A")
                ], -1))
              ]),
              s(t)("copy") ? (v(), g("div", rd, [
                i("div", null, y(s(n)("Cut")), 1),
                l[6] || (l[6] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "X")
                ], -1))
              ])) : T("", !0),
              s(t)("copy") ? (v(), g("div", ld, [
                i("div", null, y(s(n)("Copy")), 1),
                l[7] || (l[7] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "C")
                ], -1))
              ])) : T("", !0),
              s(t)("copy") ? (v(), g("div", dd, [
                i("div", null, y(s(n)("Paste")), 1),
                l[8] || (l[8] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "V")
                ], -1))
              ])) : T("", !0),
              s(t)("search") ? (v(), g("div", cd, [
                i("div", null, y(s(n)("Search")), 1),
                l[9] || (l[9] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "F")
                ], -1))
              ])) : T("", !0),
              i("div", ud, [
                i("div", null, y(s(n)("Toggle Sidebar")), 1),
                l[10] || (l[10] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "E")
                ], -1))
              ]),
              i("div", vd, [
                i("div", null, y(s(n)("Open Settings")), 1),
                l[11] || (l[11] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "S")
                ], -1))
              ]),
              s(t)("fullscreen") ? (v(), g("div", fd, [
                i("div", null, y(s(n)("Toggle Full Screen")), 1),
                l[12] || (l[12] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "Enter")
                ], -1))
              ])) : T("", !0),
              s(t)("preview") ? (v(), g("div", _d, [
                i("div", null, y(s(n)("Preview")), 1),
                l[13] || (l[13] = i("kbd", null, "Space", -1))
              ])) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), hd = { class: "vuefinder__menubar__container" }, md = ["onClick", "onMouseenter"], gd = { class: "vuefinder__menubar__label" }, wd = ["onMouseenter"], yd = ["onClick"], bd = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, kd = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, $d = /* @__PURE__ */ X({
  __name: "MenuBar",
  setup(o) {
    const e = J(), { enabled: t } = Te(), { t: n } = e?.i18n || { t: (f) => f }, a = e?.fs, l = e?.config, d = G(l.state), r = G(a.selectedItems), c = G(a?.storages || []), _ = M(null), m = M(!1), w = N(() => window.opener !== null || window.name !== "" || window.history.length <= 1), u = N(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(Ht, { items: r.value }),
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
            action: () => e?.modal?.open(Kt, { items: r.value }),
            enabled: () => t("upload")
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(jt),
            enabled: () => t("search")
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(Gt, { items: r.value });
            },
            enabled: () => r.value.length > 0 && t("archive")
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(qt, { items: r.value });
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
                f?.items?.size > 0 && e?.modal?.open(f.type === "cut" ? Ye : Nt, {
                  items: { from: Array.from(f.items), to: a?.path?.get() }
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
                  const f = e?.fs, k = {
                    storage: f?.path?.get()?.storage || "",
                    path: f?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(Ye, { items: { from: r.value, to: k } });
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
                await dt(f.path);
              } else {
                const f = a?.path?.get();
                f?.path && await dt(f.path);
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
                const k = e?.adapter?.getDownloadUrl({ path: f.path });
                k && await La(k);
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
              const k = `${f}://`;
              e?.adapter.open(k);
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
                const k = f.indexOf("://"), C = f.slice(0, k);
                if (!c.value || !c.value.includes(C)) {
                  alert(n('Invalid storage. Storage "%s" is not available.', C));
                  return;
                }
                try {
                  await e?.adapter.open(f);
                } catch (F) {
                  const A = Ce(F, n("Failed to navigate to folder"));
                  re.error(A), e.fs.setLoading(!1);
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
            action: () => e?.modal?.open(pd),
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
    ]), $ = (f) => {
      _.value === f ? S() : (_.value = f, m.value = !0);
    }, D = (f) => {
      m.value && (_.value = f);
    }, S = () => {
      _.value = null, m.value = !1;
    }, p = (f) => {
      S(), f();
    }, h = (f) => {
      f.target.closest(".vuefinder__menubar") || S();
    };
    return fe(() => {
      document.addEventListener("click", h);
    }), ye(() => {
      document.removeEventListener("click", h);
    }), (f, k) => (v(), g("div", {
      class: "vuefinder__menubar",
      onClick: k[0] || (k[0] = ie(() => {
      }, ["stop"]))
    }, [
      i("div", hd, [
        (v(!0), g(ve, null, he(u.value, (C) => (v(), g("div", {
          key: C.id,
          class: Z(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": _.value === C.id }]),
          onClick: (F) => $(C.id),
          onMouseenter: (F) => D(C.id)
        }, [
          i("span", gd, y(C.label), 1),
          _.value === C.id ? (v(), g("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (F) => D(C.id)
          }, [
            (v(!0), g(ve, null, he(C.items, (F) => (v(), g("div", {
              key: F.id || F.type,
              class: Z(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": F.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": F.enabled && !F.enabled(),
                "vuefinder__menubar__dropdown__item--checked": F.checked && F.checked()
              }]),
              onClick: ie((A) => F.type !== "separator" && F.enabled && F.enabled() ? p(F.action) : null, ["stop"])
            }, [
              F.type !== "separator" ? (v(), g("span", bd, y(F.label), 1)) : T("", !0),
              F.checked && F.checked() ? (v(), g("span", kd, " ✓ ")) : T("", !0)
            ], 10, yd))), 128))
          ], 40, wd)) : T("", !0)
        ], 42, md))), 128))
      ])
    ]));
  }
}), xd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Sd(o, e) {
  return v(), g("svg", xd, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Cd = { render: Sd }, Fd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Dd(o, e) {
  return v(), g("svg", Fd, [...e[0] || (e[0] = [
    i("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Pd = { render: Dd }, Ed = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Md(o, e) {
  return v(), g("svg", Ed, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Td = { render: Md }, Id = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ad(o, e) {
  return v(), g("svg", Id, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Od = { render: Ad }, Bd = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ld(o, e) {
  return v(), g("svg", Bd, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Vd = { render: Ld }, zd = { class: "vuefinder__toolbar" }, Rd = { class: "vuefinder__toolbar__actions" }, Nd = ["title"], Ud = ["title"], jd = ["title"], Hd = ["title"], Kd = ["title"], qd = ["title"], Gd = ["title"], Wd = { class: "vuefinder__toolbar__controls" }, Yd = ["title"], Qd = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Xd = ["title"], Jd = { class: "relative" }, Zd = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, ec = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, tc = { class: "vuefinder__toolbar__dropdown-content" }, nc = { class: "vuefinder__toolbar__dropdown-section" }, oc = { class: "vuefinder__toolbar__dropdown-label" }, sc = { class: "vuefinder__toolbar__dropdown-row" }, ic = { value: "name" }, ac = { value: "size" }, rc = { value: "modified" }, lc = { value: "" }, dc = { value: "asc" }, cc = { value: "desc" }, uc = { class: "vuefinder__toolbar__dropdown-section" }, vc = { class: "vuefinder__toolbar__dropdown-label" }, fc = { class: "vuefinder__toolbar__dropdown-options" }, _c = { class: "vuefinder__toolbar__dropdown-option" }, pc = { class: "vuefinder__toolbar__option-text" }, hc = { class: "vuefinder__toolbar__dropdown-option" }, mc = { class: "vuefinder__toolbar__option-text" }, gc = { class: "vuefinder__toolbar__dropdown-option" }, wc = { class: "vuefinder__toolbar__option-text" }, yc = { class: "vuefinder__toolbar__dropdown-toggle" }, bc = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, kc = { class: "vuefinder__toolbar__dropdown-reset" }, $c = ["title"], xc = ["title"], Sc = /* @__PURE__ */ X({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(o) {
    const e = J(), { enabled: t } = Te(), { t: n } = e.i18n, a = e.fs, l = e.config, d = G(l.state), r = G(a.selectedItems), c = G(a.sort), _ = G(a.filter);
    le(
      () => d.value.fullScreen,
      () => {
        const p = document.querySelector("body");
        p && (p.style.overflow = d.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const m = M(!1), w = (p) => {
      p.target.closest(".vuefinder__toolbar__dropdown-container") || (m.value = !1);
    };
    fe(() => {
      const p = document.querySelector("body");
      p && d.value.fullScreen && setTimeout(() => p.style.overflow = "hidden"), document.addEventListener("click", w);
    }), ye(() => {
      document.removeEventListener("click", w);
    });
    const u = M({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: d.value.showHiddenFiles
      // Initialize with config store default
    });
    le(
      () => u.value.sortBy,
      (p) => {
        if (!u.value.sortOrder) {
          a.clearSort();
          return;
        }
        p === "name" ? a.setSort("basename", u.value.sortOrder) : p === "size" ? a.setSort("file_size", u.value.sortOrder) : p === "modified" && a.setSort("last_modified", u.value.sortOrder);
      }
    ), le(
      () => u.value.sortOrder,
      (p) => {
        if (!p) {
          a.clearSort();
          return;
        }
        u.value.sortBy === "name" ? a.setSort("basename", p) : u.value.sortBy === "size" ? a.setSort("file_size", p) : u.value.sortBy === "modified" && a.setSort("last_modified", p);
      }
    ), le(
      c,
      (p) => {
        p.active ? (p.column === "basename" ? u.value.sortBy = "name" : p.column === "file_size" ? u.value.sortBy = "size" : p.column === "last_modified" && (u.value.sortBy = "modified"), u.value.sortOrder = p.order) : u.value.sortOrder = "";
      },
      { immediate: !0 }
    ), le(
      () => u.value.filterKind,
      (p) => {
        a.setFilter(p, d.value.showHiddenFiles);
      }
    ), le(
      () => u.value.showHidden,
      (p) => {
        l.set("showHiddenFiles", p), a.setFilter(u.value.filterKind, p);
      }
    ), le(
      _,
      (p) => {
        u.value.filterKind = p.kind;
      },
      { immediate: !0 }
    ), le(
      () => d.value.showHiddenFiles,
      (p) => {
        u.value.showHidden = p, a.setFilter(u.value.filterKind, p);
      },
      { immediate: !0 }
    );
    const $ = () => l.set("view", d.value.view === "grid" ? "list" : "grid"), D = N(() => _.value.kind !== "all" || !d.value.showHiddenFiles || c.value.active), S = () => {
      u.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), a.clearSort(), a.clearFilter();
    };
    return (p, h) => (v(), g("div", zd, [
      i("div", Rd, [
        s(t)("newfolder") ? (v(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("New Folder"),
          onClick: h[0] || (h[0] = (f) => s(e).modal.open(Ht, { items: s(r) }))
        }, [
          O(s(Tn))
        ], 8, Nd)) : T("", !0),
        s(t)("newfile") ? (v(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("New File"),
          onClick: h[1] || (h[1] = (f) => s(e).modal.open(An, { items: s(r) }))
        }, [
          O(s(In))
        ], 8, Ud)) : T("", !0),
        s(t)("rename") ? (v(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: s(n)("Rename"),
          onClick: h[2] || (h[2] = (f) => s(r).length !== 1 || s(e).modal.open(yt, { items: s(r) }))
        }, [
          O(s($n), {
            class: Z(s(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, jd)) : T("", !0),
        s(t)("delete") ? (v(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: s(n)("Delete"),
          onClick: h[3] || (h[3] = (f) => !s(r).length || s(e).modal.open(wt, { items: s(r) }))
        }, [
          O(s(kn), {
            class: Z(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Hd)) : T("", !0),
        s(t)("upload") ? (v(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: s(n)("Upload"),
          onClick: h[4] || (h[4] = (f) => s(e).modal.open(Kt, { items: s(r) }))
        }, [
          O(s(On))
        ], 8, Kd)) : T("", !0),
        s(t)("unarchive") && s(r).length === 1 && s(r)[0].mime_type === "application/zip" ? (v(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: s(n)("Unarchive"),
          onClick: h[5] || (h[5] = (f) => !s(r).length || s(e).modal.open(qt, { items: s(r) }))
        }, [
          O(s(Bn), {
            class: Z(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, qd)) : T("", !0),
        s(t)("archive") ? (v(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: s(n)("Archive"),
          onClick: h[6] || (h[6] = (f) => !s(r).length || s(e).modal.open(Gt, { items: s(r) }))
        }, [
          O(s(Ln), {
            class: Z(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Gd)) : T("", !0)
      ]),
      i("div", Wd, [
        s(t)("search") ? (v(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("Search Files"),
          onClick: h[7] || (h[7] = (f) => s(e).modal.open(jt))
        }, [
          O(s(Ut), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Yd)) : T("", !0),
        i("div", Qd, [
          i("div", {
            title: s(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: h[8] || (h[8] = (f) => m.value = !m.value)
          }, [
            i("div", Jd, [
              O(s(Vd), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              D.value ? (v(), g("div", Zd)) : T("", !0)
            ])
          ], 8, Xd),
          m.value ? (v(), g("div", ec, [
            i("div", tc, [
              i("div", nc, [
                i("div", oc, y(s(n)("Sorting")), 1),
                i("div", sc, [
                  pe(i("select", {
                    "onUpdate:modelValue": h[9] || (h[9] = (f) => u.value.sortBy = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", ic, y(s(n)("Name")), 1),
                    i("option", ac, y(s(n)("Size")), 1),
                    i("option", rc, y(s(n)("Date")), 1)
                  ], 512), [
                    [Ft, u.value.sortBy]
                  ]),
                  pe(i("select", {
                    "onUpdate:modelValue": h[10] || (h[10] = (f) => u.value.sortOrder = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", lc, y(s(n)("None")), 1),
                    i("option", dc, y(s(n)("Asc")), 1),
                    i("option", cc, y(s(n)("Desc")), 1)
                  ], 512), [
                    [Ft, u.value.sortOrder]
                  ])
                ])
              ]),
              i("div", uc, [
                i("div", vc, y(s(n)("Show")), 1),
                i("div", fc, [
                  i("label", _c, [
                    pe(i("input", {
                      "onUpdate:modelValue": h[11] || (h[11] = (f) => u.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [St, u.value.filterKind]
                    ]),
                    i("span", pc, y(s(n)("All items")), 1)
                  ]),
                  i("label", hc, [
                    pe(i("input", {
                      "onUpdate:modelValue": h[12] || (h[12] = (f) => u.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [St, u.value.filterKind]
                    ]),
                    i("span", mc, y(s(n)("Files only")), 1)
                  ]),
                  i("label", gc, [
                    pe(i("input", {
                      "onUpdate:modelValue": h[13] || (h[13] = (f) => u.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [St, u.value.filterKind]
                    ]),
                    i("span", wc, y(s(n)("Folders only")), 1)
                  ])
                ])
              ]),
              i("div", yc, [
                i("label", bc, y(s(n)("Show hidden files")), 1),
                pe(i("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": h[14] || (h[14] = (f) => u.value.showHidden = f),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [mt, u.value.showHidden]
                ])
              ]),
              i("div", kc, [
                i("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: S
                }, y(s(n)("Reset")), 1)
              ])
            ])
          ])) : T("", !0)
        ]),
        s(t)("fullscreen") ? (v(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("Toggle Full Screen"),
          onClick: h[15] || (h[15] = (f) => s(l).toggle("fullScreen"))
        }, [
          s(d).fullScreen ? (v(), L(s(Pd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (v(), L(s(Cd), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, $c)) : T("", !0),
        i("div", {
          class: "mx-1.5",
          title: s(n)("Change View"),
          onClick: h[16] || (h[16] = (f) => $())
        }, [
          s(d).view === "grid" ? (v(), L(s(Td), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : T("", !0),
          s(d).view === "list" ? (v(), L(s(Od), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : T("", !0)
        ], 8, xc)
      ])
    ]));
  }
}), Cc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Fc(o, e) {
  return v(), g("svg", Cc, [...e[0] || (e[0] = [
    i("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Dc = { render: Fc }, Pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Ec(o, e) {
  return v(), g("svg", Pc, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Mc = { render: Ec }, Tc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Ic(o, e) {
  return v(), g("svg", Tc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ac = { render: Ic }, Oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Bc(o, e) {
  return v(), g("svg", Oc, [...e[0] || (e[0] = [
    i("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Lc = { render: Bc }, Vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function zc(o, e) {
  return v(), g("svg", Vc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Rc = { render: zc }, Nc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Uc(o, e) {
  return v(), g("svg", Nc, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const jc = { render: Uc }, Hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Kc(o, e) {
  return v(), g("svg", Hc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const qc = { render: Kc };
function vt(o, e = []) {
  const t = "vfDragEnterCounter", n = o.fs, a = G(n.selectedItems);
  function l(w, u) {
    return !!(!w || w.type !== "dir" || w.path.startsWith(u) || a.value.some((D) => D.path === u ? !1 : !!w.path.startsWith(D.path)));
  }
  function d(w, u) {
    if (w.isExternalDrag)
      return;
    if (!(o.features?.move ?? !1)) {
      w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
      return;
    }
    w.preventDefault();
    const D = n.getDraggedItem();
    l(u, D) ? w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : (w.dataTransfer && (w.dataTransfer.dropEffect = "copy", w.dataTransfer.effectAllowed = "all"), w.currentTarget.classList.add(...e));
  }
  function r(w) {
    if (w.isExternalDrag || !(o.features?.move ?? !1))
      return;
    w.preventDefault();
    const $ = w.currentTarget, D = Number($.dataset[t] || 0);
    $.dataset[t] = String(D + 1);
  }
  function c(w) {
    if (w.isExternalDrag || !(o.features?.move ?? !1))
      return;
    w.preventDefault();
    const $ = w.currentTarget, S = Number($.dataset[t] || 0) - 1;
    S <= 0 ? (delete $.dataset[t], $.classList.remove(...e)) : $.dataset[t] = String(S);
  }
  function _(w, u) {
    if (w.isExternalDrag || !(o.features?.move ?? !1) || !u) return;
    w.preventDefault();
    const D = w.currentTarget;
    delete D.dataset[t], D.classList.remove(...e);
    const S = w.dataTransfer?.getData("items") || "[]", h = JSON.parse(S).map(
      (f) => n.sortedFiles.get().find((k) => k.path === f)
    );
    n.clearDraggedItem(), o.modal.open(Ye, { items: { from: h, to: u } });
  }
  function m(w) {
    return {
      dragover: (u) => d(u, w),
      dragenter: r,
      dragleave: c,
      drop: (u) => _(u, w)
    };
  }
  return { events: m };
}
const Gc = { class: "vuefinder__breadcrumb__container" }, Wc = ["title"], Yc = ["title"], Qc = ["title"], Xc = ["title"], Jc = { class: "vuefinder__breadcrumb__path-container" }, Zc = { class: "vuefinder__breadcrumb__list" }, eu = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, tu = { class: "relative" }, nu = ["title", "onClick"], ou = ["title"], su = { class: "vuefinder__breadcrumb__path-mode" }, iu = { class: "vuefinder__breadcrumb__path-mode-content" }, au = ["title"], ru = { class: "vuefinder__breadcrumb__path-text" }, lu = ["title"], du = ["data-theme"], cu = ["onClick"], uu = { class: "vuefinder__breadcrumb__hidden-item-content" }, vu = { class: "vuefinder__breadcrumb__hidden-item-text" }, fu = /* @__PURE__ */ X({
  __name: "Breadcrumb",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = e.config, l = G(a.state), d = G(n.path), r = G(n.loading), c = M(null), _ = Cn(0, 100), m = M(5), w = M(!1), u = M(!1), $ = N(() => d.value?.breadcrumb ?? []);
    function D(z, x) {
      return z.length > x ? [z.slice(-x), z.slice(0, -x)] : [z, []];
    }
    const S = N(
      () => D($.value, m.value)[0]
    ), p = N(
      () => D($.value, m.value)[1]
    );
    le(_, () => {
      if (!c.value) return;
      const z = c.value.children;
      let x = 0, b = 0;
      const P = 5, I = 1;
      m.value = P, Ae(() => {
        for (let W = z.length - 1; W >= 0; W--) {
          const se = z[W];
          if (x + se.offsetWidth > _.value - 40)
            break;
          x += parseInt(se.offsetWidth.toString(), 10), b++;
        }
        b < I && (b = I), b > P && (b = P), m.value = b;
      });
    });
    const h = () => {
      c.value && (_.value = c.value.offsetWidth);
    }, f = M(null);
    fe(() => {
      f.value = new ResizeObserver(h), c.value && f.value.observe(c.value);
    }), ye(() => {
      f.value && f.value.disconnect();
    });
    const k = vt(e, ["vuefinder__drag-over"]);
    function C(z = null) {
      z ??= $.value.length - 2;
      const x = {
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
      return $.value[z] ?? x;
    }
    const F = () => {
      e.adapter.invalidateListQuery(d.value.path), e.adapter.open(d.value.path);
    }, A = () => {
      S.value.length > 0 && e.adapter.open(
        $.value[$.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
      );
    }, B = (z) => {
      e.adapter.open(z.path), w.value = !1;
    }, Y = () => {
      w.value && (w.value = !1);
    }, R = {
      mounted(z, x) {
        z.clickOutsideEvent = function(b) {
          z === b.target || z.contains(b.target) || x.value();
        }, document.body.addEventListener("click", z.clickOutsideEvent);
      },
      beforeUnmount(z) {
        document.body.removeEventListener("click", z.clickOutsideEvent);
      }
    }, ne = () => {
      a.toggle("showTreeView");
    }, U = M({
      x: 0,
      y: 0
    }), ee = (z, x = null) => {
      if (z.currentTarget instanceof HTMLElement) {
        const { x: b, y: P, height: I } = z.currentTarget.getBoundingClientRect();
        U.value = { x: b, y: P + I };
      }
      w.value = x ?? !w.value;
    }, E = () => {
      u.value = !u.value;
    }, q = async () => {
      await dt(d.value?.path || ""), re.success(t("Path copied to clipboard"));
    }, j = () => {
      u.value = !1;
    };
    return (z, x) => (v(), g("div", Gc, [
      i("span", {
        title: s(t)("Toggle Tree View")
      }, [
        O(s(jc), {
          class: Z(["vuefinder__breadcrumb__toggle-tree", s(l).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: ne
        }, null, 8, ["class"])
      ], 8, Wc),
      i("span", {
        title: s(t)("Go up a directory")
      }, [
        O(s(Mc), Me({
          class: $.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, Re($.value.length ? s(k).events(C()) : {}), { onClick: A }), null, 16, ["class"])
      ], 8, Yc),
      s(n).isLoading() ? (v(), g("span", {
        key: 1,
        title: s(t)("Cancel")
      }, [
        O(s(Ac), {
          onClick: x[0] || (x[0] = (b) => s(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Xc)) : (v(), g("span", {
        key: 0,
        title: s(t)("Refresh")
      }, [
        O(s(Dc), { onClick: F })
      ], 8, Qc)),
      pe(i("div", Jc, [
        i("div", null, [
          O(s(Lc), Me({ class: "vuefinder__breadcrumb__home-icon" }, Re(s(k).events(C(-1))), {
            onClick: x[1] || (x[1] = ie((b) => s(e).adapter.open(s(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        i("div", Zc, [
          p.value.length ? pe((v(), g("div", eu, [
            x[3] || (x[3] = i("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("div", tu, [
              i("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: x[2] || (x[2] = (b) => ee(b, !0)),
                onClick: ie(ee, ["stop"])
              }, [
                O(s(En), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [R, Y]
          ]) : T("", !0)
        ]),
        i("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (v(!0), g(ve, null, he(S.value, (b, P) => (v(), g("div", { key: P }, [
            x[4] || (x[4] = i("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("span", Me({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: b.basename
            }, Re(s(k).events(b), !0), {
              onClick: ie((I) => s(e).adapter.open(b.path), ["stop"])
            }), y(b.name), 17, nu)
          ]))), 128))
        ], 512),
        s(a).get("loadingIndicator") === "circular" && s(r) ? (v(), L(s(xt), { key: 0 })) : T("", !0),
        i("span", {
          title: s(t)("Toggle Path Copy Mode"),
          onClick: E
        }, [
          O(s(qc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, ou)
      ], 512), [
        [Le, !u.value]
      ]),
      pe(i("div", su, [
        i("div", iu, [
          i("div", {
            title: s(t)("Copy Path")
          }, [
            O(s(Bt), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: q
            })
          ], 8, au),
          i("div", ru, y(s(d).path), 1),
          i("div", {
            title: s(t)("Exit")
          }, [
            O(s(Rc), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: j
            })
          ], 8, lu)
        ])
      ], 512), [
        [Le, u.value]
      ]),
      (v(), L(gt, { to: "body" }, [
        i("div", null, [
          pe(i("div", {
            style: Ve({
              position: "absolute",
              top: U.value.y + "px",
              left: U.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": s(e).theme.current
          }, [
            (v(!0), g(ve, null, he(p.value, (b, P) => (v(), g("div", Me({
              key: P,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Re(s(k).events(b), !0), {
              onClick: (I) => B(b)
            }), [
              i("div", uu, [
                i("span", null, [
                  O(s(Oe), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                i("span", vu, y(b.name), 1)
              ])
            ], 16, cu))), 128))
          ], 12, du), [
            [Le, w.value]
          ])
        ])
      ]))
    ]));
  }
}), _u = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function pu(o, e) {
  return v(), g("svg", _u, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const sn = { render: pu }, hu = { class: "vuefinder__drag-item__container" }, mu = { class: "vuefinder__drag-item__count" }, gu = /* @__PURE__ */ X({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(o) {
    const e = o;
    return (t, n) => (v(), g("div", hu, [
      e.count > 1 ? (v(), L(s(sn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : T("", !0),
      O(s(sn), { class: "vuefinder__drag-item__icon" }),
      i("div", mu, y(e.count), 1)
    ]));
  }
}), wu = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, an = /* @__PURE__ */ X({
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
    return (l, d) => (v(), g("div", {
      class: Z(["vuefinder__item-icon", o.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      $e(l.$slots, "icon", Ne(Ue(a)), () => [
        o.item.type === "dir" ? (v(), L(s(Oe), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (v(), L(s(lt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        o.ext && o.item.type !== "dir" && o.item.extension ? (v(), g("div", wu, y(o.item.extension.substring(0, 3)), 1)) : T("", !0)
      ])
    ], 2));
  }
}), yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function bu(o, e) {
  return v(), g("svg", yu, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const rn = { render: bu }, ku = ["data-key", "data-row", "data-col", "draggable"], $u = { key: 0 }, xu = { class: "vuefinder__explorer__item-grid-content" }, Su = ["data-src", "alt"], Cu = { class: "vuefinder__explorer__item-title" }, Fu = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Du = { class: "vuefinder__explorer__item-list-name" }, Pu = { class: "vuefinder__explorer__item-list-icon" }, Eu = { class: "vuefinder__explorer__item-name" }, Mu = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Tu = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Iu = { key: 0 }, Au = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Ou = /* @__PURE__ */ X({
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
    const t = o, n = e, a = J(), l = a.fs, d = a.config, r = N(() => {
      const U = a.selectionFilterType;
      return !U || U === "both" ? !0 : U === "files" && t.item.type === "file" || U === "dirs" && t.item.type === "dir";
    }), c = N(() => {
      const U = a.selectionFilterMimeIncludes;
      return !U || !U.length || t.item.type === "dir" ? !0 : t.item.mime_type ? U.some((ee) => t.item.mime_type?.startsWith(ee)) : !1;
    }), _ = N(() => r.value && c.value), m = N(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), w = N(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !_.value ? 0.5 : ""
    })), u = M(null);
    let $ = !1, D = null, S = null, p = !1;
    const { enabled: h } = Te(), f = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), k = N(() => f ? !1 : h("move")), C = () => {
      D && (clearTimeout(D), D = null), S = null;
    }, F = (U) => {
      C(), S = U, p = !1, U.stopPropagation(), D = setTimeout(() => {
        !S || D === null || (p = !0, S.cancelable && S.preventDefault(), S.stopPropagation(), n("contextmenu", S), C());
      }, 500);
    }, A = (U) => {
      if (p) {
        U.preventDefault(), U.stopPropagation(), C();
        return;
      }
      setTimeout(() => {
        p || (C(), ne(U));
      }, 100);
    }, B = (U) => {
      if (!S) return;
      const ee = S.touches[0] || S.changedTouches[0], E = U.touches[0] || U.changedTouches[0];
      if (ee && E) {
        const q = Math.abs(E.clientX - ee.clientX), j = Math.abs(E.clientY - ee.clientY);
        (q > 15 || j > 15) && C();
      }
    }, Y = (U) => {
      f || n("click", U);
    }, R = (U) => {
      if (p)
        return U.preventDefault(), U.stopPropagation(), !1;
      n("dragstart", U);
    }, ne = (U) => {
      if (!$)
        $ = !0, n("click", U), u.value = setTimeout(() => {
          $ = !1;
        }, 300);
      else
        return $ = !1, n("dblclick", U), !1;
    };
    return (U, ee) => (v(), g("div", {
      class: Z(m.value),
      style: Ve(w.value),
      "data-key": o.item.path,
      "data-row": o.rowIndex,
      "data-col": o.colIndex,
      draggable: k.value,
      onTouchstartCapture: ee[1] || (ee[1] = (E) => F(E)),
      onTouchendCapture: ee[2] || (ee[2] = (E) => A(E)),
      onTouchmoveCapture: B,
      onTouchcancelCapture: ee[3] || (ee[3] = () => C()),
      onClick: Y,
      onDblclick: ee[4] || (ee[4] = (E) => n("dblclick", E)),
      onContextmenu: ee[5] || (ee[5] = ie((E) => n("contextmenu", E), ["prevent", "stop"])),
      onDragstart: R,
      onDragend: ee[6] || (ee[6] = (E) => n("dragend", E))
    }, [
      o.view === "grid" ? (v(), g("div", $u, [
        s(l).isReadOnly(o.item) ? (v(), L(s(rn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : T("", !0),
        i("div", xu, [
          (o.item.mime_type ?? "").startsWith("image") && o.showThumbnails ? (v(), g("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": o.item.previewUrl ?? s(a).adapter.getPreviewUrl({ path: o.item.path }),
            alt: o.item.basename,
            onTouchstart: ee[0] || (ee[0] = (E) => E.preventDefault())
          }, null, 40, Su)) : (v(), L(an, {
            key: 1,
            item: o.item,
            ext: !0
          }, {
            icon: oe((E) => [
              $e(U.$slots, "icon", Ne(Ue(E)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        i("span", Cu, y(s(Et)(o.item.basename)), 1)
      ])) : (v(), g("div", Fu, [
        i("div", Du, [
          i("div", Pu, [
            O(an, {
              item: o.item,
              small: o.compact
            }, {
              icon: oe((E) => [
                $e(U.$slots, "icon", Ne(Ue(E)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          i("span", Eu, y(o.item.basename), 1),
          i("div", null, [
            s(l).isReadOnly(o.item) ? (v(), L(s(rn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : T("", !0)
          ])
        ]),
        o.showPath ? (v(), g("div", Mu, y(o.item.path), 1)) : T("", !0),
        o.showPath ? T("", !0) : (v(), g("div", Tu, [
          o.item.file_size ? (v(), g("div", Iu, y(s(a).filesize(o.item.file_size)), 1)) : T("", !0)
        ])),
        !o.showPath && o.item.last_modified ? (v(), g("div", Au, y(new Date(o.item.last_modified * 1e3).toLocaleString()), 1)) : T("", !0)
      ])),
      s(h)("pinned") && s(d).get("pinnedFolders").find((E) => E.path === o.item.path) ? (v(), L(s(Lt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : T("", !0)
    ], 46, ku));
  }
}), Bu = ["data-row"], ln = /* @__PURE__ */ X({
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
    ]), l = N(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), d = N(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (r, c) => (v(), g("div", {
      class: Z(a.value),
      "data-row": o.rowIndex,
      style: Ve(l.value)
    }, [
      i("div", {
        class: Z(["grid justify-self-start", { "w-full": o.view === "list" }]),
        style: Ve(d.value)
      }, [
        (v(!0), g(ve, null, he(o.items, (_, m) => (v(), L(Ou, Me({
          key: _.path,
          item: _,
          view: o.view,
          compact: o.compact,
          "show-thumbnails": o.showThumbnails,
          "show-path": o.showPath,
          "is-selected": o.isSelected(_.path),
          "is-dragging": o.isDraggingItem(_.path),
          "row-index": o.rowIndex,
          "col-index": m,
          "explorer-id": o.explorerId
        }, Re(o.dragNDropEvents(_)), {
          onClick: c[0] || (c[0] = (w) => n("click", w)),
          onDblclick: c[1] || (c[1] = (w) => n("dblclick", w)),
          onContextmenu: c[2] || (c[2] = (w) => n("contextmenu", w)),
          onDragstart: c[3] || (c[3] = (w) => n("dragstart", w)),
          onDragend: c[4] || (c[4] = (w) => n("dragend", w))
        }), {
          icon: oe((w) => [
            $e(r.$slots, "icon", Me({ ref_for: !0 }, w))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Bu));
  }
}), Lu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Vu(o, e) {
  return v(), g("svg", Lu, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const zu = { render: Vu }, Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Nu(o, e) {
  return v(), g("svg", Ru, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Uu = { render: Nu }, Ct = /* @__PURE__ */ X({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(o) {
    return (e, t) => (v(), g("div", null, [
      o.direction === "asc" ? (v(), L(s(zu), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : T("", !0),
      o.direction === "desc" ? (v(), L(s(Uu), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : T("", !0)
    ]));
  }
}), ju = { class: "vuefinder__explorer__header" }, Hu = /* @__PURE__ */ X({
  __name: "ExplorerHeader",
  setup(o) {
    const e = J(), t = e.fs, { t: n } = e.i18n, a = G(t.sort);
    return (l, d) => (v(), g("div", ju, [
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: d[0] || (d[0] = (r) => s(t).toggleSort("basename"))
      }, [
        de(y(s(n)("Name")) + " ", 1),
        pe(O(Ct, {
          direction: s(a).order
        }, null, 8, ["direction"]), [
          [Le, s(a).active && s(a).column === "basename"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: d[1] || (d[1] = (r) => s(t).toggleSort("file_size"))
      }, [
        de(y(s(n)("Size")) + " ", 1),
        pe(O(Ct, {
          direction: s(a).order
        }, null, 8, ["direction"]), [
          [Le, s(a).active && s(a).column === "file_size"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: d[2] || (d[2] = (r) => s(t).toggleSort("last_modified"))
      }, [
        de(y(s(n)("Date")) + " ", 1),
        pe(O(Ct, {
          direction: s(a).order
        }, null, 8, ["direction"]), [
          [Le, s(a).active && s(a).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function Ku(o, e) {
  const {
    scrollContainer: t,
    itemWidth: n = 100,
    rowHeight: a,
    overscan: l = 2,
    containerPadding: d = 48,
    lockItemsPerRow: r
  } = e, c = o, _ = () => typeof a == "number" ? a : a.value, m = M(0), w = M(6), u = M(600);
  let $ = null;
  const D = N(() => Math.ceil(c.value.length / w.value)), S = N(() => D.value * _()), p = N(() => {
    const R = _(), ne = Math.max(0, Math.floor(m.value / R) - l), U = Math.min(
      D.value,
      Math.ceil((m.value + u.value) / R) + l
    );
    return { start: ne, end: U };
  }), h = N(() => {
    const { start: R, end: ne } = p.value;
    return Array.from({ length: ne - R }, (U, ee) => R + ee);
  }), f = () => u.value, k = () => r.value, C = () => {
    if (k()) {
      w.value = 1;
      return;
    }
    if (t.value) {
      const R = t.value.clientWidth - d;
      w.value = Math.max(Math.floor(R / n), 2);
    }
  }, F = (R) => {
    const ne = R.target;
    m.value = ne.scrollTop;
  };
  le(
    () => c.value.length,
    () => {
      C();
    }
  );
  const A = (R, ne) => {
    if (!R || !Array.isArray(R))
      return [];
    const U = ne * w.value;
    return R.slice(U, U + w.value);
  }, B = (R, ne, U, ee, E) => {
    if (!R || !Array.isArray(R))
      return [];
    const q = [];
    for (let j = ne; j <= U; j++)
      for (let z = ee; z <= E; z++) {
        const x = j * w.value + z;
        x < R.length && R[x] && q.push(R[x]);
      }
    return q;
  }, Y = (R) => ({
    row: Math.floor(R / w.value),
    col: R % w.value
  });
  return fe(async () => {
    await Ae(), t.value && (u.value = t.value.clientHeight || 600), C(), window.addEventListener("resize", () => {
      t.value && (u.value = t.value.clientHeight || 600), C();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((R) => {
      const ne = R[0];
      ne && (u.value = Math.round(ne.contentRect.height)), C();
    }), $.observe(t.value));
  }), ye(() => {
    window.removeEventListener("resize", C), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: m,
    itemsPerRow: w,
    totalRows: D,
    totalHeight: S,
    visibleRange: p,
    visibleRows: h,
    updateItemsPerRow: C,
    handleScroll: F,
    getRowItems: A,
    getItemsInRange: B,
    getItemPosition: Y,
    getContainerHeight: f
  };
}
function qu(o) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: n,
    getKey: a,
    selectionObject: l,
    rowHeight: d,
    itemWidth: r,
    osInstance: c
  } = o, _ = Math.floor(Math.random() * 2 ** 32).toString(), m = J(), w = m.fs, u = G(w.selectedKeys), $ = G(w.sortedFiles), D = N(() => {
    const x = /* @__PURE__ */ new Map();
    return $.value && $.value.forEach((b) => {
      x.set(a(b), b);
    }), x;
  }), S = M(/* @__PURE__ */ new Set()), p = M(!1), h = M(!1), f = (x) => x.map((b) => b.getAttribute("data-key")).filter((b) => !!b), k = (x) => {
    x.selection.clearSelection(!0, !0);
  }, C = (x) => {
    if (u.value && u.value.size > 0) {
      const b = document.querySelectorAll(`.file-item-${_}[data-key]`), P = /* @__PURE__ */ new Map();
      b.forEach((W) => {
        const se = W.getAttribute("data-key");
        se && P.set(se, W);
      });
      const I = [];
      u.value.forEach((W) => {
        const se = P.get(W);
        se && F(W) && I.push(se);
      }), I.forEach((W) => {
        x.selection.select(W, !0);
      });
    }
  }, F = (x) => {
    const b = D.value.get(x);
    if (!b) return !1;
    const P = m.selectionFilterType, I = m.selectionFilterMimeIncludes;
    return P === "files" && b.type === "dir" || P === "dirs" && b.type === "file" ? !1 : I && Array.isArray(I) && I.length > 0 ? b.type === "dir" ? !0 : b.mime_type ? I.some((W) => b.mime_type?.startsWith(W)) : !1 : !0;
  }, A = (x) => {
    if (m.selectionMode === "single")
      return !1;
    p.value = !1, !x.event?.metaKey && !x.event?.ctrlKey && (h.value = !0), x.selection.resolveSelectables(), k(x), C(x);
  }, B = M(0), Y = ({ event: x, selection: b }) => {
    B.value = (l.value?.getAreaLocation().y1 ?? 0) - (m.root.getBoundingClientRect().top ?? 0);
    const P = document.querySelector(
      ".selection-area-container"
    );
    if (P && (P.dataset.theme = m.theme.current), m.selectionMode === "single")
      return;
    const I = x;
    I && "type" in I && I.type === "touchend" && I.preventDefault();
    const W = x;
    !W?.ctrlKey && !W?.metaKey && (w.clearSelection(), b.clearSelection(!0, !0)), S.value.clear();
  }, R = (x) => {
    if (m.selectionMode === "single")
      return;
    const b = f(x.store.changed.added), P = f(x.store.changed.removed);
    h.value = !1, p.value = !0, b.forEach((I) => {
      u.value && !u.value.has(I) && F(I) && (S.value.add(I), w.select(I, m.selectionMode || "multiple"));
    }), P.forEach((I) => {
      document.querySelector(`[data-key="${I}"]`) && D.value.has(I) && S.value.delete(I), w.deselect(I);
    }), x.selection.resolveSelectables(), C(x);
  }, ne = () => {
    S.value.clear();
  }, U = (x) => {
    if (!x.event)
      return;
    const b = document.querySelector(".scroller-" + _);
    if (!b)
      return;
    const P = b.getBoundingClientRect(), I = P.left, W = P.top;
    let se = b.scrollTop;
    if (c?.value) {
      const { viewport: Be } = c.value.elements();
      Be && (se = Be.scrollTop);
    }
    const ae = l.value?.getAreaLocation();
    if (!ae)
      return;
    const _e = Math.min(ae.x1, ae.x2), Ke = se + Math.min(ae.y1, ae.y2), je = Math.max(ae.x1, ae.x2), qe = se + Math.max(ae.y1, ae.y2), K = 4;
    let ce = Math.floor((_e - I - K) / r), ue = Math.floor((je - I - K) / r);
    const be = _e - I - K - ce * r, Qe = je - I - K - ue * r;
    be > r - K && (ce = ce + 1), Qe < K && (ue = ue - 1);
    const Wt = Math.max(0, ce), Yt = Math.min(e.value - 1, ue);
    let Xe = Math.floor((Ke - W - K) / d.value), V = Math.floor((qe - W - K) / d.value);
    const H = Ke - W - K - Xe * d.value, Q = qe - W - K - V * d.value, te = Math.floor((t.value - K) / d.value);
    H > d.value - K && (Xe = Xe + 1), Q < K && (V = V - 1);
    const Ie = Math.max(0, Xe), De = Math.min(V, te), Ee = n(
      $.value,
      Ie,
      De,
      Wt,
      Yt
    ), Je = document.querySelectorAll(`.file-item-${_}[data-key]`), ke = /* @__PURE__ */ new Map();
    Je.forEach((Be) => {
      const et = Be.getAttribute("data-key");
      et && ke.set(et, Be);
    });
    const Ze = [];
    if (Ee.forEach((Be) => {
      const et = a(Be);
      ke.get(et) || Ze.push(et);
    }), Ze.length > 0) {
      const Be = m.selectionMode || "multiple";
      w.selectMultiple(Ze, Be);
    }
  }, ee = (x) => {
    U(x), k(x), C(x), w.setSelectedCount(u.value?.size || 0), p.value = !1;
  }, E = () => {
    let x = [".scroller-" + _];
    if (c?.value) {
      const { viewport: b } = c.value.elements();
      b && (x = b);
    }
    l.value = new to({
      selectables: [".file-item-" + _ + ":not(.vf-explorer-item--unselectable)"],
      boundaries: x,
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
    }), l.value.on("beforestart", A), l.value.on("start", Y), l.value.on("move", R), l.value.on("stop", ee);
  }, q = () => {
    l.value && (l.value.destroy(), l.value = null);
  }, j = () => {
    l.value && (Array.from(
      u.value ?? /* @__PURE__ */ new Set()
    ).forEach((b) => {
      F(b) || w.deselect(b);
    }), q(), E());
  }, z = (x) => {
    h.value && (l.value?.clearSelection(), ne(), h.value = !1);
    const b = x;
    !S.value.size && !h.value && !b?.ctrlKey && !b?.metaKey && (w.clearSelection(), l.value?.clearSelection());
  };
  return fe(() => {
    const x = (b) => {
      !b.buttons && p.value && (p.value = !1);
    };
    document.addEventListener("dragleave", x), ye(() => {
      document.removeEventListener("dragleave", x);
    });
  }), {
    explorerId: _,
    isDragging: p,
    initializeSelectionArea: E,
    updateSelectionArea: j,
    handleContentClick: z
  };
}
function Gu(o) {
  const e = (n) => {
    if (!n)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const a = o.selectionFilterType, l = o.selectionFilterMimeIncludes, d = !a || a === "both" || a === "files" && n.type === "file" || a === "dirs" && n.type === "dir";
    let r = !0;
    return l && Array.isArray(l) && l.length > 0 && (n.type === "dir" ? r = !0 : n.mime_type ? r = l.some((c) => n.mime_type.startsWith(c)) : r = !1), { typeAllowed: d, mimeAllowed: r };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (n) => {
      const { typeAllowed: a, mimeAllowed: l } = e(n);
      return a && l;
    }
  };
}
function Wu(o) {
  const e = (n) => ({
    item: n,
    defaultPrevented: !1,
    preventDefault() {
      this.defaultPrevented = !0;
    }
  });
  return {
    createCancelableEvent: e,
    openItem: (n, a, l) => {
      const d = e(n);
      if (n.type === "file" && a) {
        if (o.emitter.emit("vf-file-dclick", d), d.defaultPrevented) return;
      } else if (n.type === "dir" && l && (o.emitter.emit("vf-folder-dclick", d), d.defaultPrevented))
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
function Yu(o, e, t, n, a, l, d) {
  const r = o.fs, { canSelectItem: c } = Gu(o), { openItem: _ } = Wu(o), m = (p) => {
    const h = p.target?.closest(".file-item-" + e);
    if (!h) return null;
    const f = String(h.getAttribute("data-key")), k = t.value?.find((C) => C.path === f);
    return { key: f, item: k };
  }, w = () => {
    const p = n.value;
    return t.value?.filter((h) => p?.has(h.path)) || [];
  };
  return {
    handleItemClick: (p) => {
      const h = m(p);
      if (!h) return;
      const { key: f, item: k } = h, C = p;
      if (!c(k))
        return;
      const F = o.selectionMode || "multiple";
      !C?.ctrlKey && !C?.metaKey && (p.type !== "touchstart" || !r.isSelected(f)) && (r.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), p.type === "touchstart" && r.isSelected(f) ? r.select(f, F) : r.toggleSelect(f, F), r.setSelectedCount(n.value?.size || 0);
    },
    handleItemDblClick: (p) => {
      const h = m(p);
      if (!h) return;
      const { item: f } = h;
      c(f) && f && _(f, l, d);
    },
    handleItemContextMenu: (p) => {
      p.preventDefault(), p.stopPropagation();
      const h = m(p);
      if (!h) return;
      const { key: f, item: k } = h;
      c(k) && (n.value?.has(f) || (r.clearSelection(), r.select(f)), o.emitter.emit("vf-contextmenu-show", {
        event: p,
        items: w(),
        target: k
      }));
    },
    handleContentContextMenu: (p) => {
      p.preventDefault(), o.emitter.emit("vf-contextmenu-show", { event: p, items: w() });
    },
    getSelectedItems: w
  };
}
function Qu(o, e) {
  const t = M(null);
  return fe(() => {
    if (st.plugin([eo]), o.value) {
      const n = st(
        o.value,
        {
          scrollbars: { theme: "vf-scrollbars-theme" }
        },
        {
          initialized: (a) => {
            t.value = a;
            const { viewport: l } = a.elements();
            l && l.addEventListener("scroll", e);
          },
          updated: (a) => {
            const { viewport: l } = a.elements();
          }
        }
      );
      t.value = n;
    }
  }), ye(() => {
    if (t.value) {
      const { viewport: n } = t.value.elements();
      n && n.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
function Xu(o, e) {
  const t = M(null);
  return fe(() => {
    o.value && (t.value = new _n({
      elements_selector: ".lazy",
      container: o.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), Hn(() => {
    t.value && t.value.update();
  }), ye(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const Ju = { class: "vuefinder__explorer__container" }, Zu = {
  key: 0,
  class: "vuefinder__linear-loader"
}, ev = /* @__PURE__ */ X({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(o) {
    const e = o, t = J(), n = vt(t, ["vuefinder__drag-over"]), a = Ge("dragImage"), l = dn(null), d = Ge("scrollContainer"), r = Ge("scrollContent"), c = t.fs, _ = t.config, m = G(_.state), w = G(c.sortedFiles), u = G(c.selectedKeys), $ = G(c.loading), D = (K) => u.value?.has(K) ?? !1, S = N(() => {
      const K = m.value.view, ce = m.value.compactListView;
      return K === "grid" ? 88 : ce ? 24 : 50;
    }), { t: p } = t.i18n, {
      itemsPerRow: h,
      totalHeight: f,
      visibleRows: k,
      handleScroll: C,
      getRowItems: F,
      getItemsInRange: A,
      updateItemsPerRow: B
    } = Ku(
      N(() => w.value ?? []),
      {
        scrollContainer: d,
        itemWidth: 104,
        rowHeight: S,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: N(() => m.value.view === "list")
      }
    ), { osInstance: Y } = Qu(d, C), { explorerId: R, isDragging: ne, initializeSelectionArea: U, updateSelectionArea: ee, handleContentClick: E } = qu({
      itemsPerRow: h,
      totalHeight: f,
      getItemsInRange: A,
      getKey: (K) => K.path,
      selectionObject: l,
      rowHeight: S,
      itemWidth: 104,
      osInstance: Y
    }), q = M(null), j = (K) => {
      if (!K || !q.value) return !1;
      const ce = u.value?.has(q.value) ?? !1;
      return ne.value && (ce ? u.value?.has(K) ?? !1 : K === q.value);
    };
    le(
      () => _.get("view"),
      (K) => {
        K === "list" ? h.value = 1 : B();
      },
      { immediate: !0 }
    ), le(h, (K) => {
      _.get("view") === "list" && K !== 1 && (h.value = 1);
    });
    const z = (K) => w.value?.[K];
    Xu(d, t);
    const { handleItemClick: x, handleItemDblClick: b, handleItemContextMenu: P, handleContentContextMenu: I } = Yu(
      t,
      R,
      w,
      u,
      l,
      e.onFileDclick,
      e.onFolderDclick
    );
    fe(() => {
      const K = () => {
        l.value || U(), l.value && l.value.on("beforestart", ({ event: ce }) => {
          const ue = ce?.target === r.value;
          if (!ce?.metaKey && !ce?.ctrlKey && !ce?.altKey && !ue)
            return !1;
        });
      };
      if (Y.value)
        K();
      else {
        const ce = setInterval(() => {
          Y.value && (clearInterval(ce), K());
        }, 50);
        setTimeout(() => {
          clearInterval(ce), l.value || K();
        }, 500);
      }
      le(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], ee, {
        deep: !0
      });
    });
    const W = (K) => {
      if (!(t.features?.move ?? !1) || K.altKey || K.ctrlKey || K.metaKey)
        return K.preventDefault(), !1;
      ne.value = !0;
      const ue = K.target?.closest(
        ".file-item-" + R
      );
      if (q.value = ue ? String(ue.dataset.key) : null, K.dataTransfer && q.value) {
        K.dataTransfer.setDragImage(a.value, 0, 15), K.dataTransfer.effectAllowed = "all", K.dataTransfer.dropEffect = "copy";
        const be = u.value?.has(q.value) ? Array.from(u.value) : [q.value];
        K.dataTransfer.setData("items", JSON.stringify(be)), c.setDraggedItem(q.value);
      }
    }, se = () => {
      q.value = null;
    };
    let ae = null, _e = null;
    const Ke = (K) => {
      K.target?.closest(".file-item-" + R) || (_e = K, ae && clearTimeout(ae), ae = setTimeout(() => {
        _e && (_e.cancelable && _e.preventDefault(), _e.stopPropagation(), I(_e)), _e = null, ae = null;
      }, 500));
    }, je = (K) => {
      ae && (clearTimeout(ae), ae = null), _e = null;
    }, qe = (K) => {
      if (!_e) return;
      const ce = _e.touches[0] || _e.changedTouches[0], ue = K.touches[0] || K.changedTouches[0];
      if (ce && ue) {
        const be = Math.abs(ue.clientX - ce.clientX), Qe = Math.abs(ue.clientY - ce.clientY);
        (be > 15 || Qe > 15) && (ae && (clearTimeout(ae), ae = null), _e = null);
      }
    };
    return (K, ce) => (v(), g("div", Ju, [
      s(m).view === "list" ? (v(), L(Hu, { key: 0 })) : T("", !0),
      i("div", {
        ref_key: "scrollContainer",
        ref: d,
        class: Z(["vuefinder__explorer__selector-area", "scroller-" + s(R)])
      }, [
        s(_).get("loadingIndicator") === "linear" && s($) ? (v(), g("div", Zu)) : T("", !0),
        i("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Ve({ height: `${s(f)}px`, position: "relative", width: "100%" }),
          onContextmenu: ce[0] || (ce[0] = ie(
            //@ts-ignore
            (...ue) => s(I) && s(I)(...ue),
            ["self", "prevent"]
          )),
          onClick: ce[1] || (ce[1] = ie(
            //@ts-ignore
            (...ue) => s(E) && s(E)(...ue),
            ["self"]
          )),
          onTouchstartCapture: ie(Ke, ["self"]),
          onTouchendCapture: ie(je, ["self"]),
          onTouchmoveCapture: ie(qe, ["self"]),
          onTouchcancelCapture: ie(je, ["self"])
        }, [
          i("div", {
            ref_key: "dragImage",
            ref: a,
            class: "vuefinder__explorer__drag-item"
          }, [
            O(gu, {
              count: q.value && s(u).has(q.value) ? s(u).size : 1
            }, null, 8, ["count"])
          ], 512),
          s(m).view === "grid" ? (v(!0), g(ve, { key: 0 }, he(s(k), (ue) => (v(), L(ln, {
            key: ue,
            "row-index": ue,
            "row-height": S.value,
            view: "grid",
            "items-per-row": s(h),
            items: s(F)(s(w), ue),
            "show-thumbnails": s(m).showThumbnails,
            "is-dragging-item": j,
            "is-selected": D,
            "drag-n-drop-events": (be) => s(n).events(be),
            "explorer-id": s(R),
            onClick: s(x),
            onDblclick: s(b),
            onContextmenu: s(P),
            onDragstart: W,
            onDragend: se
          }, {
            icon: oe((be) => [
              $e(K.$slots, "icon", Me({ ref_for: !0 }, be))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (v(!0), g(ve, { key: 1 }, he(s(k), (ue) => (v(), L(ln, {
            key: ue,
            "row-index": ue,
            "row-height": S.value,
            view: "list",
            items: z(ue) ? [z(ue)] : [],
            compact: s(m).compactListView,
            "is-dragging-item": j,
            "is-selected": D,
            "drag-n-drop-events": (be) => s(n).events(be),
            "explorer-id": s(R),
            onClick: s(x),
            onDblclick: s(b),
            onContextmenu: s(P),
            onDragstart: W,
            onDragend: se
          }, {
            icon: oe((be) => [
              $e(K.$slots, "icon", Me({ ref_for: !0 }, be))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), tv = ["href", "download"], nv = ["onClick"], ov = /* @__PURE__ */ X({
  __name: "ContextMenu",
  setup(o) {
    const e = J(), t = M(null), n = M([]);
    let a = null, l = null;
    const d = ht({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (m) => {
      n.value = m;
    });
    const r = (m) => m.link(e, n.value), c = (m) => {
      e.emitter.emit("vf-contextmenu-hide"), m.action(e, n.value);
    };
    e.emitter.on("vf-contextmenu-show", (m) => {
      const { event: w, items: u, target: $ = null } = m || {};
      d.items = (e.contextMenuItems || []).filter((D) => D.show(e, {
        items: u,
        target: $
      })).sort((D, S) => {
        const p = D.order ?? 1 / 0, h = S.order ?? 1 / 0;
        return p - h;
      }), $ ? u.length > 1 && u.some((D) => D.path === $.path) ? e.emitter.emit("vf-context-selected", u) : e.emitter.emit("vf-context-selected", [$]) : e.emitter.emit("vf-context-selected", []), _(w);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      d.active = !1, a && (a(), a = null), l = null, d.positions = {};
    });
    const _ = async (m) => {
      a && (a(), a = null);
      const u = ((p) => {
        if ("clientX" in p && "clientY" in p)
          return { x: p.clientX, y: p.clientY };
        const h = "touches" in p && p.touches[0] || "changedTouches" in p && p.changedTouches[0];
        return h ? { x: h.clientX, y: h.clientY } : { x: 0, y: 0 };
      })(m);
      if (l = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: u.x,
          y: u.y,
          top: u.y,
          left: u.x,
          right: u.x,
          bottom: u.y
        })
      }, d.positions = {
        position: "fixed",
        zIndex: "10001",
        opacity: "0",
        visibility: "hidden",
        left: "-9999px",
        top: "-9999px"
      }, d.active = !0, await Ae(), !t.value || !l) return;
      await new Promise((p) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(p);
        });
      });
      const $ = [
        it(8),
        at({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        rt({ padding: 16 })
      ];
      let D = 0, S = 0;
      try {
        const p = await We(l, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: $
        });
        D = p.x, S = p.y;
      } catch (p) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", p);
        return;
      }
      d.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${D}px`,
        top: `${S}px`,
        opacity: "0",
        visibility: "visible",
        transform: "translateY(-8px)",
        transition: "opacity 150ms ease-out, transform 150ms ease-out"
      }, requestAnimationFrame(() => {
        t.value && (d.positions = {
          ...d.positions,
          opacity: "1",
          transform: "translateY(0)"
        });
      }), setTimeout(() => {
        if (!(!t.value || !l))
          try {
            a = Mt(l, t.value, async () => {
              if (!(!l || !t.value))
                try {
                  const { x: p, y: h } = await We(l, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: $
                  });
                  d.positions = {
                    ...d.positions,
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
    return ye(() => {
      a && (a(), a = null), l = null;
    }), (m, w) => pe((v(), g("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: Z([{
        "vuefinder__context-menu--active": d.active,
        "vuefinder__context-menu--inactive": !d.active
      }, "vuefinder__context-menu"]),
      style: Ve(d.positions)
    }, [
      (v(!0), g(ve, null, he(d.items, (u) => (v(), g("li", {
        key: u.title,
        class: "vuefinder__context-menu__item"
      }, [
        u.link ? (v(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: r(u),
          download: r(u),
          onClick: w[0] || (w[0] = ($) => s(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          i("span", null, y(u.title(s(e).i18n)), 1)
        ], 8, tv)) : (v(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: ($) => c(u)
        }, [
          i("span", null, y(u.title(s(e).i18n)), 1)
        ], 8, nv))
      ]))), 128))
    ], 6)), [
      [Le, d.active]
    ]);
  }
}), sv = { class: "vuefinder__status-bar__wrapper" }, iv = { class: "vuefinder__status-bar__storage" }, av = ["title"], rv = { class: "vuefinder__status-bar__storage-icon" }, lv = ["value"], dv = ["value"], cv = { class: "vuefinder__status-bar__info space-x-2" }, uv = { key: 0 }, vv = { key: 1 }, fv = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, _v = { class: "vuefinder__status-bar__actions" }, pv = /* @__PURE__ */ X({
  __name: "Statusbar",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.sortedFiles), l = G(n.path), d = G(n.selectedCount), r = G(n.storages), c = G(n.selectedItems), _ = G(n.path), m = (p) => {
      const h = p.target.value;
      e.adapter.open(h + "://");
    }, w = N(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((p, h) => p + (h.file_size || 0), 0)), u = N(() => r.value), $ = N(() => a.value), D = N(() => d.value || 0), S = N(() => c.value || []);
    return (p, h) => (v(), g("div", sv, [
      i("div", iv, [
        i("div", {
          class: "vuefinder__status-bar__storage-container",
          title: s(t)("Storage")
        }, [
          i("div", rv, [
            O(s(Vt))
          ]),
          i("select", {
            name: "vuefinder-media-selector",
            value: s(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: m
          }, [
            (v(!0), g(ve, null, he(u.value, (f) => (v(), g("option", {
              key: f,
              value: f
            }, y(f), 9, dv))), 128))
          ], 40, lv),
          h[0] || (h[0] = i("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, av),
        i("div", cv, [
          D.value === 0 ? (v(), g("span", uv, y($.value.length) + " " + y(s(t)("items")), 1)) : (v(), g("span", vv, [
            de(y(D.value) + " " + y(s(t)("selected")) + " ", 1),
            w.value ? (v(), g("span", fv, y(s(e).filesize(w.value)), 1)) : T("", !0)
          ]))
        ])
      ]),
      i("div", _v, [
        $e(p.$slots, "actions", {
          path: s(_).path,
          count: D.value || 0,
          selected: S.value
        })
      ])
    ]));
  }
}), hv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function mv(o, e) {
  return v(), g("svg", hv, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const gv = { render: mv };
function Vn(o, e) {
  const t = o.findIndex((n) => n.path === e.path);
  t > -1 ? o[t] = e : o.push(e);
}
const wv = { class: "vuefinder__folder-loader-indicator" }, yv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, zn = /* @__PURE__ */ X({
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
    const e = o, t = J(), n = fn(o, "modelValue"), a = M(!1);
    le(
      () => n.value,
      () => l()
    );
    const l = async () => {
      a.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        Vn(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (d) {
        Ce(d, "Failed to fetch subfolders");
      } finally {
        a.value = !1;
      }
    };
    return (d, r) => (v(), g("div", wv, [
      a.value ? (v(), L(s(xt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (v(), g("div", yv, [
        n.value ? (v(), L(s($t), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : T("", !0),
        n.value ? T("", !0) : (v(), L(s(kt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), bv = { key: 0 }, kv = { class: "vuefinder__treesubfolderlist__no-folders" }, $v = { class: "vuefinder__treesubfolderlist__item-content" }, xv = ["onClick"], Sv = ["title", "onDblclick", "onClick"], Cv = { class: "vuefinder__treesubfolderlist__item-icon" }, Fv = { class: "vuefinder__treesubfolderlist__subfolder" }, Dv = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, Pv = /* @__PURE__ */ X({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(o) {
    const e = J(), t = e.fs, n = vt(e, ["vuefinder__drag-over"]), a = M({}), { t: l } = e.i18n, d = G(t.path), r = o, c = M(null), _ = M(50);
    fe(() => {
      r.path === r.storage + "://" && c.value && st(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const m = N(() => {
      const S = e.treeViewData.find((p) => p.path === r.path)?.folders || [];
      return S.length > _.value ? S.slice(0, _.value) : S;
    }), w = N(() => e.treeViewData.find((S) => S.path === r.path)?.folders?.length || 0), u = N(() => w.value > _.value), $ = () => {
      _.value += 50;
    };
    return (D, S) => {
      const p = un("TreeSubfolderList", !0);
      return v(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        m.value.length ? T("", !0) : (v(), g("li", bv, [
          i("div", kv, y(s(l)("No folders")), 1)
        ])),
        (v(!0), g(ve, null, he(m.value, (h) => (v(), g("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          i("div", $v, [
            i("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (f) => a.value[h.path] = !a.value[h.path]
            }, [
              O(zn, {
                modelValue: a.value[h.path],
                "onUpdate:modelValue": (f) => a.value[h.path] = f,
                storage: o.storage,
                path: h.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, xv),
            i("div", Me({
              class: "vuefinder__treesubfolderlist__item-link",
              title: h.path
            }, Re(
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
              i("div", Cv, [
                s(d)?.path === h.path ? (v(), L(s(zt), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (v(), L(s(Oe), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              i("div", {
                class: Z(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": s(d).path === h.path
                }])
              }, y(h.basename), 3)
            ], 16, Sv)
          ]),
          i("div", Fv, [
            pe(O(p, {
              storage: r.storage,
              path: h.path
            }, null, 8, ["storage", "path"]), [
              [Le, a.value[h.path]]
            ])
          ])
        ]))), 128)),
        u.value ? (v(), g("li", Dv, [
          i("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: $
          }, y(s(l)("load more")), 1)
        ])) : T("", !0)
      ], 512);
    };
  }
}), Ev = /* @__PURE__ */ X({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(o) {
    const e = J(), t = e.fs, n = M(!1), a = o, l = vt(e, ["vuefinder__drag-over"]), d = G(t.path), r = N(() => a.storage === d.value?.storage), c = {
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
    return (m, w) => (v(), g(ve, null, [
      i("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: w[2] || (w[2] = (u) => _(o.storage))
      }, [
        i("div", Me({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Re(s(l).events(c), !0)), [
          i("div", {
            class: Z(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            O(s(Vt))
          ], 2),
          i("div", null, y(o.storage), 1)
        ], 16),
        i("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: w[1] || (w[1] = ie((u) => n.value = !n.value, ["stop"]))
        }, [
          O(zn, {
            modelValue: n.value,
            "onUpdate:modelValue": w[0] || (w[0] = (u) => n.value = u),
            storage: o.storage,
            path: o.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      pe(O(Pv, {
        storage: o.storage,
        path: o.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Le, n.value]
      ])
    ], 64));
  }
}), Mv = { class: "vuefinder__folder-indicator" }, Tv = { class: "vuefinder__folder-indicator--icon" }, Iv = /* @__PURE__ */ X({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const e = fn(o, "modelValue");
    return (t, n) => (v(), g("div", Mv, [
      i("div", Tv, [
        e.value ? (v(), L(s($t), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : T("", !0),
        e.value ? T("", !0) : (v(), L(s(kt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Av = {
  key: 0,
  class: "vuefinder__treeview__header"
}, Ov = { class: "vuefinder__treeview__pinned-label" }, Bv = { class: "vuefinder__treeview__pin-text text-nowrap" }, Lv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Vv = ["onClick"], zv = ["title"], Rv = ["onClick"], Nv = { key: 0 }, Uv = { class: "vuefinder__treeview__no-pinned" }, jv = /* @__PURE__ */ X({
  __name: "TreeView",
  setup(o) {
    const e = J(), { enabled: t } = Te(), { t: n } = e.i18n, { getStore: a, setStore: l } = e.storage, d = e.fs, r = e.config, c = G(r.state), _ = G(d.sortedFiles), m = G(d.storages), w = N(() => m.value || []), u = G(d.path), $ = vt(e, ["vuefinder__drag-over"]), D = M(190), S = M(a("pinned-folders-opened", !0));
    le(S, (k) => l("pinned-folders-opened", k));
    const p = (k) => {
      const C = r.get("pinnedFolders");
      r.set("pinnedFolders", C.filter((F) => F.path !== k.path));
    }, h = (k) => {
      const C = k.clientX, F = k.target.parentElement;
      if (!F) return;
      const A = F.getBoundingClientRect().width;
      F.classList.remove("transition-[width]"), F.classList.add("transition-none");
      const B = (R) => {
        D.value = A + R.clientX - C, D.value < 50 && (D.value = 0, r.set("showTreeView", !1)), D.value > 50 && r.set("showTreeView", !0);
      }, Y = () => {
        const R = F.getBoundingClientRect();
        D.value = R.width, F.classList.add("transition-[width]"), F.classList.remove("transition-none"), window.removeEventListener("mousemove", B), window.removeEventListener("mouseup", Y);
      };
      window.addEventListener("mousemove", B), window.addEventListener("mouseup", Y);
    }, f = M(null);
    return fe(() => {
      f.value && st(f.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), le(_, (k) => {
      const C = k.filter((F) => F.type === "dir");
      Vn(e.treeViewData, {
        path: u.value.path || "",
        folders: C.map((F) => ({
          storage: F.storage,
          path: F.path,
          basename: F.basename,
          type: "dir"
        }))
      });
    }), (k, C) => (v(), g(ve, null, [
      i("div", {
        class: Z(["vuefinder__treeview__overlay", s(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: C[0] || (C[0] = (F) => s(r).toggle("showTreeView"))
      }, null, 2),
      i("div", {
        style: Ve(
          s(c).showTreeView ? "min-width:100px;max-width:75%; width: " + D.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        i("div", {
          ref_key: "treeViewScrollElement",
          ref: f,
          class: "vuefinder__treeview__scroll"
        }, [
          s(t)("pinned") ? (v(), g("div", Av, [
            i("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: C[2] || (C[2] = (F) => S.value = !S.value)
            }, [
              i("div", Ov, [
                O(s(Lt), { class: "vuefinder__treeview__pin-icon" }),
                i("div", Bv, y(s(n)("Pinned Folders")), 1)
              ]),
              O(Iv, {
                modelValue: S.value,
                "onUpdate:modelValue": C[1] || (C[1] = (F) => S.value = F)
              }, null, 8, ["modelValue"])
            ]),
            S.value ? (v(), g("ul", Lv, [
              (v(!0), g(ve, null, he(s(c).pinnedFolders, (F) => (v(), g("li", {
                key: F.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                i("div", Me({ class: "vuefinder__treeview__pinned-folder" }, Re(s($).events(F), !0), {
                  onClick: (A) => s(e).adapter.open(F.path)
                }), [
                  s(u).path !== F.path ? (v(), L(s(Oe), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : T("", !0),
                  s(u).path === F.path ? (v(), L(s(zt), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : T("", !0),
                  i("div", {
                    title: F.path,
                    class: Z(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": s(u).path === F.path
                    }])
                  }, y(F.basename), 11, zv)
                ], 16, Vv),
                i("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (A) => p(F)
                }, [
                  O(s(gv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Rv)
              ]))), 128)),
              s(c).pinnedFolders.length ? T("", !0) : (v(), g("li", Nv, [
                i("div", Uv, y(s(n)("No folders pinned")), 1)
              ]))
            ])) : T("", !0)
          ])) : T("", !0),
          (v(!0), g(ve, null, he(w.value, (F) => (v(), g("div", {
            key: F,
            class: "vuefinder__treeview__storage"
          }, [
            O(Ev, { storage: F }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        i("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: h
        }, null, 32)
      ], 4)
    ], 64));
  }
}), we = {
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
function Hv(o) {
  return o.items.length > 1 && o.items.some((e) => e.path === o.target?.path) ? "many" : o.target ? "one" : "none";
}
function me(o) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    o
  );
  return (t, n) => !(e.needsSearchQuery !== !!n.searchQuery || e.target !== void 0 && e.target !== Hv(n) || e.targetType !== void 0 && e.targetType !== n.target?.type || e.mimeType !== void 0 && e.mimeType !== n.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function nt(...o) {
  return (e, t) => o.some((n) => n(e, t));
}
function ot(...o) {
  return (e, t) => o.every((n) => n(e, t));
}
const Rn = [
  {
    id: we.openDir,
    title: ({ t: o }) => o("Open containing folder"),
    action: (o, e) => {
      const t = e[0];
      t && o.adapter.open(t.dir);
    },
    show: me({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: we.refresh,
    title: ({ t: o }) => o("Refresh"),
    action: (o) => {
      const e = o.fs;
      o.adapter.invalidateListQuery(e.path.get().path), o.adapter.open(e.path.get().path);
    },
    show: nt(me({ target: "none" }), me({ target: "many" })),
    order: 20
  },
  {
    id: we.selectAll,
    title: ({ t: o }) => o("Select All"),
    action: (o) => {
      o.fs.selectAll(o.selectionMode || "multiple");
    },
    show: (o, e) => o.selectionMode === "multiple" && me({ target: "none" })(o, e),
    order: 30
  },
  {
    id: we.new_folder,
    title: ({ t: o }) => o("New Folder"),
    action: (o) => o.modal.open(Ht),
    show: me({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: we.open,
    title: ({ t: o }) => o("Open"),
    action: (o, e) => {
      e[0] && o.adapter.open(e[0].path);
    },
    show: me({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: we.pinFolder,
    title: ({ t: o }) => o("Pin Folder"),
    action: (o, e) => {
      const t = o.config, n = t.get("pinnedFolders"), a = n.concat(
        e.filter(
          (l) => n.findIndex((d) => d.path === l.path) === -1
        )
      );
      t.set("pinnedFolders", a);
    },
    show: ot(me({ target: "one", targetType: "dir", feature: "pinned" }), (o, e) => o.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: we.unpinFolder,
    title: ({ t: o }) => o("Unpin Folder"),
    action: (o, e) => {
      const t = o.config, n = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        n.filter(
          (a) => !e.find((l) => l.path === a.path)
        )
      );
    },
    show: ot(me({ target: "one", targetType: "dir", feature: "pinned" }), (o, e) => o.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: we.preview,
    title: ({ t: o }) => o("Preview"),
    action: (o, e) => o.modal.open(bt, { storage: e[0]?.storage, item: e[0] }),
    show: ot(
      me({ target: "one", feature: "preview" }),
      (o, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: we.download,
    link: (o, e) => {
      if (e[0])
        return o.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: o }) => o("Download"),
    action: () => {
    },
    show: ot(
      me({ target: "one", feature: "download" }),
      (o, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: we.rename,
    title: ({ t: o }) => o("Rename"),
    action: (o, e) => o.modal.open(yt, { items: e }),
    show: me({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: we.move,
    title: ({ t: o }) => o("Move files"),
    action: (o, e) => {
      const t = o.fs, n = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      o.modal.open(Ye, { items: { from: e, to: n } });
    },
    show: nt(
      me({ target: "one", feature: "move" }),
      me({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: we.copy,
    title: ({ t: o }) => o("Copy"),
    action: (o, e) => {
      e.length > 0 && o.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: nt(
      me({ target: "one", feature: "copy" }),
      me({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: we.paste,
    title: ({ t: o }) => o("Paste"),
    action: (o, e) => {
      const t = o.fs.getClipboard();
      if (t?.items?.size > 0) {
        const a = o.fs.path.get();
        let l = a.path, d = a.storage;
        e.length === 1 && e[0]?.type === "dir" && (l = e[0].path, d = e[0].storage);
        const r = {
          storage: d || "",
          path: l || "",
          type: "dir"
        };
        o.modal.open(t.type === "cut" ? Ye : Nt, {
          items: { from: Array.from(t.items), to: r }
        });
      }
    },
    show: (o, e) => o.features?.copy ?? !1 ? o.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: we.archive,
    title: ({ t: o }) => o("Archive"),
    action: (o, e) => o.modal.open(Gt, { items: e }),
    show: nt(
      me({ target: "many", feature: "archive" }),
      ot(
        me({ target: "one", feature: "archive" }),
        (o, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: we.unarchive,
    title: ({ t: o }) => o("Unarchive"),
    action: (o, e) => o.modal.open(qt, { items: e }),
    show: me({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: we.delete,
    title: ({ t: o }) => o("Delete"),
    action: (o, e) => {
      o.modal.open(wt, { items: e });
    },
    show: nt(
      me({ feature: "delete", target: "one" }),
      me({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], Kv = ["data-theme"], qv = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Gv = { class: "vuefinder__external-drop-message" }, Wv = { class: "vuefinder__main__content" }, Yv = /* @__PURE__ */ X({
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
    const t = e, n = o, a = J(), l = Ge("root"), d = a.config;
    le(
      () => n.features,
      (p) => {
        const h = hn(p);
        Object.keys(a.features).forEach((f) => {
          delete a.features[f];
        }), Object.assign(a.features, h);
      },
      { deep: !0 }
    );
    const r = a.fs, c = G(d.state);
    Jr();
    const { isDraggingExternal: _, handleDragEnter: m, handleDragOver: w, handleDragLeave: u, handleDrop: $ } = Zr();
    function D(p) {
      r.setPath(p.dirname), d.get("persist") && d.set("path", p.dirname), r.setReadOnly(p.read_only ?? !1), a.modal.close(), r.setFiles(p.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(p.storages);
    }
    a.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, a.adapter.onAfterOpen = (p) => {
      D(p), r.setLoading(!1);
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
        p && d.set("theme", s(p));
      },
      { immediate: !0 }
    ), fe(() => {
      a.root = l.value, le(
        () => d.get("path"),
        (h) => {
          a.adapter.open(h);
        }
      );
      const p = d.get("persist") ? d.get("path") : d.get("initialPath") ?? "";
      r.setPath(p), a.adapter.open(p), r.path.listen((h) => {
        t("path-change", h.path);
      }), r.selectedItems.listen((h) => {
        t("select", h);
      }), t("ready");
    });
    const S = async (p) => {
      const h = await $(p);
      h.length > 0 && (a.modal.open(Kt), setTimeout(() => {
        a.emitter.emit(
          "vf-external-files-dropped",
          h.map((f) => f.file)
        );
      }, 100));
    };
    return (p, h) => (v(), g("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: Z(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": s(_) }]),
      "data-theme": s(a).theme.current,
      onDragenter: h[2] || (h[2] = //@ts-ignore
      (...f) => s(m) && s(m)(...f)),
      onDragover: h[3] || (h[3] = //@ts-ignore
      (...f) => s(w) && s(w)(...f)),
      onDragleave: h[4] || (h[4] = //@ts-ignore
      (...f) => s(u) && s(u)(...f)),
      onDrop: S
    }, [
      i("div", {
        class: Z(s(a).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        i("div", {
          class: Z([
            s(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: h[0] || (h[0] = (f) => s(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (f) => s(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          s(_) ? (v(), g("div", qv, [
            i("div", Gv, y(s(a).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : T("", !0),
          s(c).showMenuBar ? (v(), L($d, { key: 1 })) : T("", !0),
          s(c).showToolbar ? (v(), L(Sc, { key: 2 })) : T("", !0),
          O(fu),
          i("div", Wv, [
            O(jv),
            O(ev, {
              "on-file-dclick": n.onFileDclick,
              "on-folder-dclick": n.onFolderDclick
            }, {
              icon: oe((f) => [
                $e(p.$slots, "icon", Ne(Ue(f)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          O(pv, null, {
            actions: oe((f) => [
              $e(p.$slots, "status-bar", Ne(Ue(f)))
            ]),
            _: 3
          })
        ], 34),
        (v(), L(gt, { to: "body" }, [
          O(qn, { name: "fade" }, {
            default: oe(() => [
              s(a).modal.visible ? (v(), L(cn(s(a).modal.type), { key: 0 })) : T("", !0)
            ]),
            _: 1
          })
        ])),
        O(ov, { items: s(Rn) }, null, 8, ["items"]),
        O(s(Yn), { position: "bottom-center" })
      ], 2)
    ], 42, Kv));
  }
}), Qv = /* @__PURE__ */ X({
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
    const e = o, t = e.id ?? ft(Dt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const n = yo(e, ft("VueFinderOptions") || {});
    return le(
      () => e.config,
      (a) => {
        if (a) {
          const l = {};
          for (const d in a)
            l[d] = s(a[d]);
          n.config.init(l);
        }
      },
      { deep: !0, immediate: !0 }
    ), oo(t, n), Gn(Dt, t), vn(() => {
      so(t);
    }), (a, l) => (v(), L(Yv, Ne(Ue(e)), {
      icon: oe((d) => [
        $e(a.$slots, "icon", Ne(Ue(d)))
      ]),
      "status-bar": oe((d) => [
        $e(a.$slots, "status-bar", Ne(Ue(d)))
      ]),
      _: 3
    }, 16));
  }
}), pf = {
  install(o, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", o.provide("VueFinderOptions", e), o.component("VueFinder", Qv);
  }
};
export {
  ff as ArrayDriver,
  At as BaseAdapter,
  we as ContextMenuIds,
  _f as IndexedDBDriver,
  wn as RemoteDriver,
  Qv as VueFinder,
  pf as VueFinderPlugin,
  Qv as VueFinderProvider,
  Rn as contextMenuItems,
  pf as default,
  en as parseBackendError
};
