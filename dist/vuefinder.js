import { inject as wt, reactive as Tt, watch as re, ref as E, shallowRef as On, computed as K, markRaw as Do, defineComponent as J, onMounted as ve, nextTick as Ae, createElementBlock as w, openBlock as f, withKeys as ft, unref as i, createElementVNode as s, createCommentVNode as A, withModifiers as de, renderSlot as Fe, toDisplayString as b, createBlock as R, resolveDynamicComponent as Ln, withCtx as X, createVNode as L, Fragment as ce, renderList as _e, createTextVNode as se, withDirectives as pe, vModelText as vt, onUnmounted as ke, useTemplateRef as Ke, resolveComponent as Rn, normalizeClass as G, vModelCheckbox as en, customRef as To, Teleport as Et, normalizeStyle as He, isRef as Eo, vModelSelect as Yt, onBeforeUnmount as Vn, vModelRadio as jt, mergeProps as Me, toHandlers as je, vShow as ze, normalizeProps as tt, guardReactiveProps as nt, TransitionGroup as Mo, onUpdated as Ao, mergeModels as Po, useModel as Bn, Transition as Io, provide as Oo } from "vue";
import Lo from "mitt";
import { persistentAtom as Ro } from "@nanostores/persistent";
import { atom as Ce, computed as Ge } from "nanostores";
import { useStore as j } from "@nanostores/vue";
import { QueryClient as Vo } from "@tanstack/vue-query";
import Bo from "@uppy/core";
import { Cropper as zo } from "vue-advanced-cropper";
import zn from "vanilla-lazyload";
import { OverlayScrollbars as Mt } from "overlayscrollbars";
import Ho from "@viselect/vanilla";
import No from "@uppy/xhr-upload";
const tn = /* @__PURE__ */ new Map(), Qt = Symbol("ServiceContainerId");
function Uo(t, e) {
  tn.set(t, e);
}
function Ko(t) {
  tn.delete(t);
}
function Z(t) {
  const e = wt(Qt);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const n = tn.get(e);
  if (!n)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return n;
}
function jo(t) {
  const e = localStorage.getItem(t + "_storage"), n = Tt(JSON.parse(e ?? "{}"));
  re(n, o);
  function o() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function l(c, u) {
    n[c] = u;
  }
  function r(c) {
    delete n[c];
  }
  function d() {
    Object.keys(n).forEach((c) => r(c));
  }
  return { getStore: (c, u = null) => c in n ? n[c] : u, setStore: l, removeStore: r, clearStore: d };
}
async function qo(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Wo(t, e, n, o) {
  const { getStore: l, setStore: r } = t, d = E({}), a = E(l("locale", e)), c = (p, _ = e) => {
    qo(p, o).then((y) => {
      d.value = y, r("locale", p), a.value = p, r("translations", y), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + p }), n.emit("vf-language-saved"));
    }).catch((y) => {
      _ ? (n.emit("vf-toast-push", {
        label: "The selected locale is not yet supported!",
        type: "error"
      }), c(_, null)) : (console.error(y), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  re(a, (p) => {
    c(p);
  }), !l("locale") && !Object.keys(o).length ? c(e) : d.value = l("translations");
  const u = (p, ..._) => _.length ? u(p = p.replace("%s", String(_.shift())), ..._) : p;
  function v(p, ..._) {
    return d.value && Object.prototype.hasOwnProperty.call(d.value, p) ? u(d.value[p] || p, ..._) : u(p, ..._);
  }
  return Tt({ t: v, locale: a });
}
const Go = [
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
], Hn = {
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
  advanced: Go.reduce((t, e) => (t[e] = !0, t), {})
};
function wn() {
  return Hn.advanced;
}
function Nn(t) {
  return t ? t === "simple" || t === "advanced" ? { ...Hn[t] } : { ...wn(), ...t } : wn();
}
const Yo = "4.0.2";
function nn(t, e, n, o, l) {
  return e = Math, n = e.log, o = 1024, l = n(t) / n(o) | 0, (t / e.pow(o, l)).toFixed(0) + " " + (l ? "KMGTPEZY"[--l] + "iB" : "B");
}
function Un(t, e, n, o, l) {
  return e = Math, n = e.log, o = 1e3, l = n(t) / n(o) | 0, (t / e.pow(o, l)).toFixed(0) + " " + (l ? "KMGTPEZY"[--l] + "B" : "B");
}
function Qo(t) {
  if (typeof t == "number") return t;
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  if (!o) return 0;
  const l = parseFloat(o[1] || "0"), r = (o[2] || "").toLowerCase(), d = e[r] ?? 0;
  return Math.round(l * Math.pow(1024, d));
}
function Xo() {
  const t = On(null), e = E(!1), n = E(), o = E(!1);
  return { visible: e, type: t, data: n, open: (a, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = a, n.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  }, setEditMode: (a) => {
    o.value = a;
  }, editMode: o };
}
const qt = {
  view: "grid",
  theme: "light",
  fullScreen: !1,
  showTreeView: !1,
  showHiddenFiles: !0,
  compactListView: !0,
  metricUnits: !1,
  showThumbnails: !0,
  persist: !1,
  path: "",
  initialPath: null,
  loadingIndicator: "circular",
  maxFileSize: null,
  pinnedFolders: []
}, Jo = (t, e = {}) => {
  const n = `vuefinder_config_${t}`, o = { ...qt, ...e };
  o.theme || (o.theme = "light");
  const l = Ro(n, o, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), r = (p = {}) => {
    const _ = l.get(), y = { ...qt, ...p, ..._ };
    y.theme || (y.theme = "light"), l.set(y);
  }, d = (p) => l.get()[p], a = () => l.get(), c = (p, _) => {
    const y = l.get();
    typeof p == "object" && p !== null ? l.set({ ...y, ...p }) : l.set({ ...y, [p]: _ });
  };
  return {
    // Store atom
    state: l,
    // Methods
    init: r,
    get: d,
    set: c,
    toggle: (p) => {
      const _ = l.get();
      c(p, !_[p]);
    },
    all: a,
    reset: () => {
      l.set({ ...qt });
    }
  };
};
function Zo(t, e) {
  if (typeof t == "string" && typeof e == "string")
    return t.toLowerCase().localeCompare(e.toLowerCase());
  const n = Number(t) || 0, o = Number(e) || 0;
  return n === o ? 0 : n < o ? -1 : 1;
}
const es = () => {
  const t = Ce(""), e = Ce([]), n = Ce(!1), o = Ce([]), l = Ce({ active: !1, column: "", order: "" }), r = Ce({
    kind: "all",
    showHidden: !1
  }), d = Ce(/* @__PURE__ */ new Set()), a = Ce({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Ce(null), u = Ce(0), v = Ce(!1), p = Ce([]), _ = Ce(-1), y = Ge([t], (O) => {
    const V = (O ?? "").trim(), U = V.indexOf("://"), W = U >= 0 ? V.slice(0, U) : "", xe = (U >= 0 ? V.slice(U + 3) : V).split("/").filter(Boolean);
    let $e = "";
    const Kt = xe.map((Te) => ($e = $e ? `${$e}/${Te}` : Te, {
      basename: Te,
      name: Te,
      path: W ? `${W}://${$e}` : $e,
      type: "dir"
    }));
    return { storage: W, breadcrumb: Kt, path: V };
  }), F = Ge([o, l, r], (O, V, U) => {
    let W = O;
    U.kind === "files" ? W = W.filter((Te) => Te.type === "file") : U.kind === "folders" && (W = W.filter((Te) => Te.type === "dir")), U.showHidden || (W = W.filter((Te) => !Te.basename.startsWith(".")));
    const { active: he, column: xe, order: $e } = V;
    if (!he || !xe) return W;
    const Kt = $e === "asc" ? 1 : -1;
    return W.slice().sort((Te, Fo) => Zo(Te[xe], Fo[xe]) * Kt);
  }), T = Ge([o, d], (O, V) => V.size === 0 ? [] : O.filter((U) => V.has(U.path))), h = (O, V) => {
    const U = t.get();
    if ((V ?? !0) && U !== O) {
      const W = p.get(), he = _.get();
      he < W.length - 1 && W.splice(he + 1), W.length === 0 && U && W.push(U), W.push(O), p.set([...W]), _.set(W.length - 1);
    }
    t.set(O);
  }, g = (O) => {
    o.set(O ?? []);
  }, m = (O) => {
    e.set(O ?? []);
  }, $ = (O, V) => {
    l.set({ active: !0, column: O, order: V });
  }, x = (O) => {
    const V = l.get();
    V.active && V.column === O ? l.set({
      active: V.order === "asc",
      column: O,
      order: "desc"
    }) : l.set({
      active: !0,
      column: O,
      order: "asc"
    });
  }, C = () => {
    l.set({ active: !1, column: "", order: "" });
  }, z = (O, V) => {
    r.set({ kind: O, showHidden: V });
  }, P = () => {
    r.set({ kind: "all", showHidden: !1 });
  }, q = (O, V = "multiple") => {
    const U = new Set(d.get());
    V === "single" && U.clear(), U.add(O), d.set(U), u.set(U.size);
  }, I = (O) => {
    const V = new Set(d.get());
    V.delete(O), d.set(V), u.set(V.size);
  }, H = (O) => d.get().has(O), te = (O, V = "multiple") => {
    const U = new Set(d.get());
    U.has(O) ? U.delete(O) : (V === "single" && U.clear(), U.add(O)), d.set(U), u.set(U.size);
  }, ae = (O = "multiple", V) => {
    if (O === "single") {
      const U = o.get()[0];
      if (U) {
        const W = U.path;
        d.set(/* @__PURE__ */ new Set([W])), u.set(1);
      }
    } else if (V?.selectionFilterType || V?.selectionFilterMimeIncludes && V.selectionFilterMimeIncludes.length > 0) {
      const U = o.get().filter((W) => {
        const he = V.selectionFilterType, xe = V.selectionFilterMimeIncludes;
        return he === "files" && W.type === "dir" || he === "dirs" && W.type === "file" ? !1 : xe && Array.isArray(xe) && xe.length > 0 && W.type !== "dir" ? W.mime_type ? xe.some(($e) => W.mime_type?.startsWith($e)) : !1 : !0;
      }).map((W) => W.path);
      d.set(new Set(U)), u.set(U.length);
    } else {
      const U = new Set(o.get().map((W) => W.path));
      d.set(U), u.set(U.size);
    }
  }, ee = () => {
    d.set(/* @__PURE__ */ new Set()), u.set(0);
  }, ie = (O) => {
    const V = new Set(O ?? []);
    d.set(V), u.set(V.size);
  }, ue = (O) => {
    u.set(O);
  }, Y = (O) => {
    v.set(!!O);
  }, S = () => v.get(), k = (O, V) => {
    const U = o.get().filter((W) => V.has(W.path));
    a.set({
      type: O,
      path: y.get().path,
      items: new Set(U)
    });
  }, D = (O) => Ge([a], (V) => V.type === "cut" && Array.from(V.items).some((U) => U.path === O)), M = (O) => Ge([a], (V) => V.type === "copy" && Array.from(V.items).some((U) => U.path === O)), N = (O) => {
    const V = D(O);
    return j(V).value ?? !1;
  }, Q = (O) => {
    const V = M(O);
    return j(V).value ?? !1;
  }, me = () => {
    a.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, fe = () => a.get(), Be = (O) => {
    c.set(O);
  }, Ue = () => c.get(), Ze = () => {
    c.set(null);
  }, lt = () => {
    const O = p.get(), V = _.get();
    if (V > 0) {
      const U = V - 1, W = O[U];
      W && (_.set(U), h(W, !1));
    }
  }, mt = () => {
    const O = p.get(), V = _.get();
    if (V < O.length - 1) {
      const U = V + 1, W = O[U];
      W && (_.set(U), h(W, !1));
    }
  }, ht = Ge([_], (O) => O > 0), B = Ge(
    [p, _],
    (O, V) => V < O.length - 1
  );
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: t,
    sort: l,
    filter: r,
    selectedKeys: d,
    selectedCount: u,
    loading: v,
    draggedItem: c,
    clipboardItems: a,
    // Computed values
    path: y,
    sortedFiles: F,
    selectedItems: T,
    // Actions
    setPath: h,
    setFiles: g,
    setStorages: m,
    setSort: $,
    toggleSort: x,
    clearSort: C,
    setFilter: z,
    clearFilter: P,
    select: q,
    deselect: I,
    toggleSelect: te,
    selectAll: ae,
    isSelected: H,
    clearSelection: ee,
    setSelection: ie,
    setSelectedCount: ue,
    setLoading: Y,
    isLoading: S,
    setClipboard: k,
    createIsCut: D,
    createIsCopied: M,
    isCut: N,
    isCopied: Q,
    clearClipboard: me,
    getClipboard: fe,
    setDraggedItem: Be,
    getDraggedItem: Ue,
    clearDraggedItem: Ze,
    setReadOnly: (O) => {
      n.set(O);
    },
    getReadOnly: () => n.get(),
    isReadOnly: (O) => n.get() ? !0 : O.read_only ?? !1,
    // Navigation
    goBack: lt,
    goForward: mt,
    canGoBack: ht,
    canGoForward: B,
    navigationHistory: p,
    historyIndex: _
  };
};
class Kn {
  /**
   * Validate that required parameters are provided
   */
  validateParam(e, n) {
    if (e == null)
      throw new Error(`${n} is required`);
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
      const [n, ...o] = e.split("://");
      return { storage: n, path: o.join("://") };
    }
    return { path: e };
  }
  /**
   * Combine storage and path into a single path string
   */
  combinePath(e, n) {
    return e && n ? `${e}://${n}` : n || "";
  }
}
class E_ extends Kn {
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
    const n = e ?? "";
    return n === "" ? `${this.storage}://` : `${this.storage}://${n}`;
  }
  split(e) {
    return this.parsePath(e);
  }
  parent(e) {
    const { path: n } = this.split(e);
    if (!n) return this.combine("");
    const o = n.replace(/\/+$/g, "").replace(/^\/+/, ""), l = o.lastIndexOf("/");
    return l <= 0 ? this.combine("") : this.combine(o.slice(0, l));
  }
  join(e, n) {
    const { path: o } = this.split(e), l = (o ?? "").replace(/\/$/, ""), r = l ? `${l}/${n}` : n;
    return this.combine(r);
  }
  getExtension(e) {
    const n = e.lastIndexOf(".");
    return n > 0 ? e.slice(n + 1) : "";
  }
  cloneEntry(e, n = {}) {
    return { ...e, ...n };
  }
  findByPath(e) {
    const n = e;
    return this.files.find((o) => o.storage === this.storage && o.path === n);
  }
  listChildren(e) {
    const n = e;
    return this.files.filter((o) => o.storage === this.storage && o.dir === n);
  }
  replaceAll(e) {
    this.files = e;
  }
  upsert(e) {
    const n = this.files.slice(), o = n.findIndex((l) => l.storage === this.storage && l.path === e.path);
    o === -1 ? n.push(e) : n[o] = e, this.replaceAll(n);
  }
  removeExact(e) {
    const n = this.files.filter((o) => !(o.storage === this.storage && o.path === e));
    this.replaceAll(n);
  }
  removeTree(e) {
    const n = [], o = [];
    for (const l of this.files) {
      if (l.storage !== this.storage) {
        o.push(l);
        continue;
      }
      l.path === e || l.path.startsWith(e + "/") ? n.push(l) : o.push(l);
    }
    return this.replaceAll(o), n;
  }
  makeDirEntry(e, n) {
    const o = this.join(e, n);
    return {
      storage: this.storage,
      dir: e,
      basename: n,
      extension: "",
      path: o,
      type: "dir",
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: "public"
    };
  }
  makeFileEntry(e, n, o = 0, l = null) {
    const r = this.join(e, n);
    return {
      storage: this.storage,
      dir: e,
      basename: n,
      extension: this.getExtension(n),
      path: r,
      type: "file",
      file_size: o,
      last_modified: Date.now(),
      mime_type: l,
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
    const n = e?.path ?? this.combine(""), { path: o } = this.split(n), l = this.combine(o ?? ""), { storage: r } = this.split(l);
    return {
      storages: [r || ""],
      dirname: l,
      files: this.listChildren(l),
      read_only: this.readOnly
    };
  }
  async delete(e) {
    this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    const n = [];
    for (const l of e.items) {
      const r = this.findByPath(l.path);
      r && (r.type === "dir" ? n.push(...this.removeTree(r.path)) : (this.removeExact(r.path), n.push(r)), this.contentStore.delete(r.path));
    }
    return { ...this.resultForDir(e.path), deleted: n };
  }
  async rename(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const n = this.findByPath(e.path);
    if (!n) throw new Error("Item not found");
    const o = n.dir, l = this.join(o, e.name);
    if (n.type === "dir") {
      const r = n.path, d = l, a = this.files.map((c) => {
        if (c.storage !== this.storage) return c;
        if (c.path === r || c.path.startsWith(r + "/")) {
          const u = d + c.path.slice(r.length), v = this.parent(u);
          return this.cloneEntry(c, {
            path: u,
            dir: v,
            basename: c.path === r ? e.name : c.basename
          });
        }
        return c;
      });
      for (const [c, u] of Array.from(this.contentStore.entries()))
        if (c === r || c.startsWith(r + "/")) {
          this.contentStore.delete(c);
          const v = d + c.slice(r.length);
          this.contentStore.set(v, u);
        }
      this.replaceAll(a);
    } else {
      const r = this.cloneEntry(n, {
        path: l,
        dir: o,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(r);
      const d = this.contentStore.get(n.path);
      d !== void 0 && (this.contentStore.delete(n.path), this.contentStore.set(r.path, d));
    }
    return this.resultForDir(o);
  }
  uniqueName(e, n, o) {
    if (!o.has(this.join(e, n))) return n;
    const l = n.lastIndexOf("."), r = l > 0 ? n.slice(0, l) : n, d = l > 0 ? n.slice(l) : "";
    let a = 1;
    for (; ; ) {
      const c = `${r} copy ${a}${d}`, u = this.join(e, c);
      if (!o.has(u)) return c;
      a++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const n = e.destination, o = new Set(this.files.map((d) => d.path)), l = [], r = (d, a) => {
      if (d.type === "dir") {
        const c = this.uniqueName(a, d.basename, o), u = this.makeDirEntry(a, c);
        o.add(u.path), l.push(u);
        const v = d.path + "/", p = this.files.filter(
          (_) => _.storage === this.storage && _.path.startsWith(v)
        );
        for (const _ of p) {
          const y = _.path.slice(v.length), F = y.includes("/") ? y.slice(0, y.lastIndexOf("/")) : "", T = F ? this.join(u.path, F) : u.path;
          if (_.type === "dir")
            r(_, T);
          else {
            const h = this.uniqueName(T, _.basename, o), g = this.makeFileEntry(
              T,
              h,
              _.file_size || 0,
              _.mime_type
            );
            l.push(g), o.add(g.path);
            const m = this.contentStore.get(_.path);
            m !== void 0 && this.contentStore.set(g.path, m);
          }
        }
      } else {
        const c = this.uniqueName(a, d.basename, o), u = this.makeFileEntry(a, c, d.file_size || 0, d.mime_type);
        l.push(u), o.add(u.path);
        const v = this.contentStore.get(d.path);
        v !== void 0 && this.contentStore.set(u.path, v);
      }
    };
    for (const d of e.sources) {
      const a = this.findByPath(d);
      a && r(a, n);
    }
    return this.replaceAll(this.files.concat(l)), this.resultForDir(n);
  }
  async move(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const n = e.destination, o = new Set(this.files.map((d) => d.path));
    let l = this.files.slice();
    const r = (d, a) => {
      if (d.type === "dir") {
        const c = d.path, u = this.uniqueName(a, d.basename, o), v = this.join(a, u);
        l = l.map((_) => {
          if (_.storage !== this.storage) return _;
          if (_.path === c || _.path.startsWith(c + "/")) {
            const y = v + _.path.slice(c.length);
            return this.cloneEntry(_, {
              path: y,
              dir: this.parent(y),
              basename: _.path === c ? u : _.basename
            });
          }
          return _;
        });
        for (const [_, y] of Array.from(this.contentStore.entries()))
          if (_ === c || _.startsWith(c + "/")) {
            this.contentStore.delete(_);
            const F = v + _.slice(c.length);
            this.contentStore.set(F, y);
          }
      } else {
        const c = this.uniqueName(a, d.basename, o), u = this.join(a, c);
        l = l.map(
          (p) => p === d ? this.cloneEntry(p, {
            path: u,
            dir: a,
            basename: c,
            extension: this.getExtension(c),
            last_modified: Date.now()
          }) : p
        );
        const v = this.contentStore.get(d.path);
        v !== void 0 && (this.contentStore.delete(d.path), this.contentStore.set(u, v));
      }
    };
    for (const d of e.sources) {
      const a = this.findByPath(d);
      a && r(a, n);
    }
    return this.replaceAll(l), this.resultForDir(n);
  }
  async archive(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const n = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, o = this.makeFileEntry(e.path, n, 0, "application/zip");
    return this.upsert(o), this.resultForDir(e.path);
  }
  async unarchive(e) {
    this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const n = this.findByPath(e.item);
    if (!n) throw new Error("Archive not found");
    const o = n.basename.replace(/\.zip$/i, ""), l = this.makeDirEntry(e.path, o);
    return this.upsert(l), this.resultForDir(e.path);
  }
  async createFile(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const n = this.makeFileEntry(e.path, e.name, 0, null);
    return this.upsert(n), this.contentStore.set(n.path, ""), this.resultForDir(e.path);
  }
  async createFolder(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const n = this.makeDirEntry(e.path, e.name);
    return this.upsert(n), this.resultForDir(e.path);
  }
  getPreviewUrl(e) {
    return "";
  }
  async getContent(e) {
    this.validatePath(e.path);
    const n = this.contentStore.get(e.path);
    if (typeof n == "string" || n === void 0)
      return {
        content: n ?? "",
        mimeType: this.findByPath(e.path)?.mime_type || void 0
      };
    const o = new Uint8Array(n);
    let l = "";
    for (let d = 0; d < o.length; d++) l += String.fromCharCode(o[d]);
    return { content: btoa(l), mimeType: this.findByPath(e.path)?.mime_type || void 0 };
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const n = (e.filter || "").toLowerCase(), o = e.path;
    return this.files.filter((l) => {
      if (l.storage !== this.storage) return !1;
      if (o) {
        if (e.deep) {
          if (!(l.path === o || l.path.startsWith(o + "/"))) return !1;
        } else if (l.dir !== o)
          return !1;
      }
      return l.basename.toLowerCase().includes(n) || l.path.toLowerCase().includes(n);
    });
  }
  async save(e) {
    this.validateParam(e.path, "path");
    const n = this.findByPath(e.path);
    if (!n) throw new Error("File not found");
    if (n.type !== "file") throw new Error("Can only save file content");
    return this.contentStore.set(e.path, e.content), this.upsert(
      this.cloneEntry(n, { file_size: e.content.length, last_modified: Date.now() })
    ), e.path;
  }
  configureUploader(e, n) {
    e && e.on("upload-success", async (o) => {
      const l = n.getTargetPath(), r = o?.name || "file", d = o?.type || null, a = o?.data, c = o?.size || 0, u = this.makeFileEntry(l, r, c, d);
      if (this.upsert(u), a)
        try {
          const v = await a.arrayBuffer();
          this.contentStore.set(u.path, v);
        } catch {
          this.contentStore.set(u.path, "");
        }
      else
        this.contentStore.set(u.path, "");
    });
  }
}
class jn extends Kn {
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
    const n = {
      ...jn.DEFAULT_URLS,
      ...e.url || {}
    };
    this.config = {
      ...e,
      baseURL: e.baseURL || "",
      url: n
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
  configureUploader(e, n) {
    const o = this.getHeaders();
    delete o["Content-Type"], e.use(No, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: o,
      formData: !0
    }), e.on("upload", () => {
      const l = n.getTargetPath();
      e.getFiles().forEach((d) => {
        e.setFileMeta(d.id, { path: l });
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
  async request(e, n = {}) {
    const o = `${this.config.baseURL}${e}`, l = await fetch(o, {
      ...n,
      headers: {
        ...this.getHeaders(),
        ...n.headers
      }
    });
    if (!l.ok)
      try {
        const d = await l.json();
        throw new Error(
          d && (d.message || d.error) || `HTTP ${l.status}: ${l.statusText}`
        );
      } catch {
        const d = await l.text();
        throw new Error(d || `HTTP ${l.status}: ${l.statusText}`);
      }
    return (l.headers.get("content-type") || "").includes("application/json") ? await l.json() : await l.text();
  }
  async list(e) {
    const n = new URLSearchParams();
    e?.path && n.append("path", e.path);
    const o = n.toString() ? `${this.config.url.list}?${n.toString()}` : this.config.url.list;
    return await this.request(o, { method: "GET" });
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
    const n = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.preview}?${n.toString()}`;
  }
  async getContent(e) {
    this.validatePath(e.path);
    const n = new URLSearchParams({ path: e.path }), o = `${this.config.baseURL}${this.config.url.preview}?${n.toString()}`, l = await fetch(o, { headers: this.getHeaders() });
    if (!l.ok) throw new Error(`Failed to get content: ${l.statusText}`);
    return { content: await l.text(), mimeType: l.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const n = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${n.toString()}`;
  }
  async search(e) {
    const n = this.config.url.search, o = new URLSearchParams();
    e.path && o.set("path", e.path), e.filter && o.set("filter", e.filter), e.deep && o.set("deep", "1"), e.size && e.size !== "all" && o.set("size", e.size);
    const l = o.toString() ? `${n}?${o.toString()}` : n;
    return (await this.request(l, {
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
const yn = {
  list: (t) => ["adapter", "list", t],
  search: (t, e, n, o) => ["adapter", "search", t, e, n, o],
  delete: (t) => ["adapter", "delete", t],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class ts {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, n = {}) {
    this.driver = e, this.onBeforeOpen = n.onBeforeOpen, this.onAfterOpen = n.onAfterOpen, this.queryClient = n.queryClient || new Vo({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: n.refetchOnWindowFocus ?? !1,
          staleTime: n.staleTime ?? 300 * 1e3,
          retry: n.retry ?? 2
        },
        mutations: {
          retry: n.retry ?? 1
        }
      }
    }), this.config = {
      queryClient: this.queryClient,
      refetchOnWindowFocus: n.refetchOnWindowFocus ?? !1,
      staleTime: n.staleTime ?? 300 * 1e3,
      cacheTime: n.cacheTime ?? 600 * 1e3,
      retry: n.retry ?? 2,
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
    const n = yn.list(e);
    return await this.queryClient.fetchQuery({
      queryKey: n,
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
    const n = await this.list(e);
    return this.onAfterOpen && this.onAfterOpen(n), n;
  }
  /**
   * Delete files with optimistic updates
   */
  async delete(e) {
    const n = await this.driver.delete(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Rename a file or folder
   */
  async rename(e) {
    const n = await this.driver.rename(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Copy files to a destination
   */
  async copy(e) {
    const n = await this.driver.copy(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Move files to a destination
   */
  async move(e) {
    const n = await this.driver.move(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Create a zip archive
   */
  async archive(e) {
    const n = await this.driver.archive(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Extract files from a zip archive
   */
  async unarchive(e) {
    const n = await this.driver.unarchive(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Create a new file
   */
  async createFile(e) {
    const n = await this.driver.createFile(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Create a new folder
   */
  async createFolder(e) {
    const n = await this.driver.createFolder(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Get file content (cached)
   */
  async getContent(e) {
    const n = ["adapter", "content", e.path];
    return await this.queryClient.fetchQuery({
      queryKey: n,
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
    const n = yn.search(e.path, e.filter, e.deep, e.size);
    return await this.queryClient.fetchQuery({
      queryKey: n,
      queryFn: () => this.driver.search(e),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Save content to file (and invalidate list cache)
   */
  async save(e) {
    const n = await this.driver.save(e);
    return this.invalidateListQueries(), n;
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
function ns(t) {
  const e = j(t.state);
  return {
    current: K(() => e.value.theme || "light"),
    set: (l) => {
      t.set("theme", l);
    }
  };
}
const os = (t, e) => {
  const n = jo(t.id ?? "vf"), o = Lo(), l = e.i18n, r = t.locale ?? e.locale, d = Jo(t.id ?? "vf", t.config ?? {}), a = es();
  if (!t.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new ts(t.driver);
  return Tt({
    // app version
    version: Yo,
    // config store
    config: d,
    // Theme
    theme: (() => {
      const u = ns(d);
      return {
        current: u.current,
        set: u.set
      };
    })(),
    // files store
    fs: a,
    // root element
    root: null,
    // app id
    debug: t.debug ?? !1,
    // Event Bus
    emitter: o,
    // storage
    storage: n,
    // localization object
    i18n: Wo(
      n,
      r,
      o,
      l
    ),
    // modal state
    modal: Xo(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Do(c),
    // active features
    features: Nn(t.features),
    // selection mode
    selectionMode: t.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: K(() => t.selectionFilterType || "both"),
    selectionFilterMimeIncludes: K(() => t.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: d.get("metricUnits") ? Un : nn,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems,
    // expose custom uploader if provided
    customUploader: t.customUploader
  });
}, ss = ["data-theme"], is = { class: "vuefinder__modal-layout__container" }, ls = { class: "vuefinder__modal-layout__content" }, as = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, rs = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, ds = { class: "vuefinder__modal-drag-message" }, De = /* @__PURE__ */ J({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(t) {
    const e = E(null), n = Z();
    n.config;
    const o = t;
    ve(() => {
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
    return (r, d) => (f(), w("div", {
      "data-theme": i(n).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: d[1] || (d[1] = ft((a) => i(n).modal.close(), ["esc"]))
    }, [
      d[2] || (d[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", is, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: l,
          onMousedown: d[0] || (d[0] = de((a) => i(n).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", ls, [
              Fe(r.$slots, "default")
            ]),
            r.$slots.buttons ? (f(), w("div", as, [
              Fe(r.$slots, "buttons")
            ])) : A("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (f(), w("div", rs, [
        s("div", ds, b(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : A("", !0)
    ], 40, ss));
  }
}), cs = { class: "vuefinder__modal-header" }, us = { class: "vuefinder__modal-header__icon-container" }, fs = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Ee = /* @__PURE__ */ J({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(t) {
    return (e, n) => (f(), w("div", cs, [
      s("div", us, [
        (f(), R(Ln(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("div", fs, b(t.title), 1)
    ]));
  }
}), vs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function _s(t, e) {
  return f(), w("svg", vs, [...e[0] || (e[0] = [
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
const qn = { render: _s }, ps = { class: "vuefinder__about-modal__content" }, ms = { class: "vuefinder__about-modal__main" }, hs = { class: "vuefinder__about-modal__tab-content" }, gs = { class: "vuefinder__about-modal__lead" }, ws = { class: "vuefinder__about-modal__description" }, ys = { class: "vuefinder__about-modal__links" }, bs = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, ks = { class: "vuefinder__about-modal__meta" }, xs = { class: "vuefinder__about-modal__meta-item" }, $s = { class: "vuefinder__about-modal__meta-label" }, Cs = { class: "vuefinder__about-modal__meta-value" }, Ss = { class: "vuefinder__about-modal__meta-item" }, Fs = { class: "vuefinder__about-modal__meta-label" }, Wn = /* @__PURE__ */ J({
  __name: "ModalAbout",
  setup(t) {
    const e = Z(), { t: n } = e.i18n;
    return (o, l) => (f(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (r) => i(e).modal.close())
        }, b(i(n)("Close")), 1)
      ]),
      default: X(() => [
        s("div", ps, [
          L(Ee, {
            icon: i(qn),
            title: "Vuefinder " + i(e).version
          }, null, 8, ["icon", "title"]),
          s("div", ms, [
            s("div", hs, [
              s("div", gs, b(i(n)("A modern, customizable file manager component built for Vue.")), 1),
              s("div", ws, b(i(n)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              s("div", ys, [
                s("a", bs, b(i(n)("Project Home")), 1),
                l[1] || (l[1] = s("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              s("div", ks, [
                s("div", xs, [
                  s("span", $s, b(i(n)("Version")), 1),
                  s("span", Cs, b(i(e).version), 1)
                ]),
                s("div", Ss, [
                  s("span", Fs, b(i(n)("License")), 1),
                  l[2] || (l[2] = s("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ds = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ts(t, e) {
  return f(), w("svg", Ds, [...e[0] || (e[0] = [
    s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Gn = { render: Ts }, Es = { class: "vuefinder__delete-modal__content" }, Ms = { class: "vuefinder__delete-modal__form" }, As = { class: "vuefinder__delete-modal__description" }, Ps = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Is = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Os = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ls = { class: "vuefinder__delete-modal__file-name" }, Rs = { class: "vuefinder__delete-modal__warning" }, At = /* @__PURE__ */ J({
  __name: "ModalDelete",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, l = j(o.path), r = E(e.modal.data.items), d = E(""), a = () => {
      console.log(
        r.value.map(({ path: c, type: u }) => ({ path: c, type: u }))
      ), r.value.length && e.adapter.delete({
        path: l.value.path,
        items: r.value.map(({ path: c, type: u }) => ({
          path: c,
          type: u
        }))
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("Files deleted.") }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, u) => (f(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          onClick: a
        }, b(i(n)("Yes, Delete!")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[1] || (u[1] = (v) => i(e).modal.close())
        }, b(i(n)("Cancel")), 1),
        s("div", Rs, b(i(n)("This action cannot be undone.")), 1)
      ]),
      default: X(() => [
        s("div", null, [
          L(Ee, {
            icon: i(Gn),
            title: i(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", Es, [
            s("div", Ms, [
              s("p", As, b(i(n)("Are you sure you want to delete these files?")), 1),
              s("div", Ps, [
                (f(!0), w(ce, null, _e(r.value, (v) => (f(), w("p", {
                  key: v.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  v.type === "dir" ? (f(), w("svg", Is, [...u[2] || (u[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), w("svg", Os, [...u[3] || (u[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", Ls, b(v.basename), 1)
                ]))), 128))
              ]),
              d.value.length ? (f(), R(i(d), {
                key: 0,
                error: "",
                onHidden: u[0] || (u[0] = (v) => d.value = "")
              }, {
                default: X(() => [
                  se(b(d.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Vs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Bs(t, e) {
  return f(), w("svg", Vs, [...e[0] || (e[0] = [
    s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Yn = { render: Bs }, zs = { class: "vuefinder__rename-modal__content" }, Hs = { class: "vuefinder__rename-modal__item" }, Ns = { class: "vuefinder__rename-modal__item-info" }, Us = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ks = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, js = { class: "vuefinder__rename-modal__item-name" }, Pt = /* @__PURE__ */ J({
  __name: "ModalRename",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, l = j(o.path), r = E(e.modal.data.items[0]), d = E(r.value.basename), a = E(""), c = () => {
      d.value != r.value.basename && e.adapter.rename({
        path: l.value.path,
        item: r.value.path,
        name: d.value
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", d.value) }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: n(u.message), type: "error" });
      });
    };
    return (u, v) => (f(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(i(n)("Rename")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[2] || (v[2] = (p) => i(e).modal.close())
        }, b(i(n)("Cancel")), 1)
      ]),
      default: X(() => [
        s("div", null, [
          L(Ee, {
            icon: i(Yn),
            title: i(n)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", zs, [
            s("div", Hs, [
              s("p", Ns, [
                r.value.type === "dir" ? (f(), w("svg", Us, [...v[3] || (v[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (f(), w("svg", Ks, [...v[4] || (v[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", js, b(r.value.basename), 1)
              ]),
              pe(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (p) => d.value = p),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: ft(c, ["enter"])
              }, null, 544), [
                [vt, d.value]
              ]),
              a.value.length ? (f(), R(i(a), {
                key: 0,
                error: "",
                onHidden: v[1] || (v[1] = (p) => a.value = "")
              }, {
                default: X(() => [
                  se(b(a.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Oe() {
  const t = Z(), e = K(() => t.features);
  return {
    enabled: (o) => e.value[o] ?? !1
  };
}
const qs = { class: "vuefinder__text-preview" }, Ws = { class: "vuefinder__text-preview__header" }, Gs = ["title"], Ys = { class: "vuefinder__text-preview__actions" }, Qs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Xs = { key: 1 }, Js = /* @__PURE__ */ J({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = E(""), l = E(""), r = E(null), d = E(!1), a = E(""), c = E(!1), u = Z(), { enabled: v } = Oe(), { t: p } = u.i18n;
    ve(async () => {
      try {
        const F = await u.adapter.getContent({ path: u.modal.data.item.path });
        o.value = F.content, n("success");
      } catch (F) {
        console.error("Failed to load text content:", F), n("success");
      }
    });
    const _ = () => {
      d.value = !d.value, l.value = o.value, u.modal.setEditMode(d.value);
    }, y = async () => {
      a.value = "", c.value = !1;
      try {
        const F = u.modal.data.item.path;
        await u.adapter.save({
          path: F,
          content: l.value
        }), o.value = l.value, a.value = p("Updated."), n("success"), d.value = !d.value;
      } catch (F) {
        const T = F;
        a.value = p(T.message || "Error"), c.value = !0;
      }
    };
    return (F, T) => (f(), w("div", qs, [
      s("div", Ws, [
        s("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: i(u).modal.data.item.path
        }, b(i(u).modal.data.item.basename), 9, Gs),
        s("div", Ys, [
          d.value ? (f(), w("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: y
          }, b(i(p)("Save")), 1)) : A("", !0),
          i(v)("edit") ? (f(), w("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: T[0] || (T[0] = (h) => _())
          }, b(d.value ? i(p)("Cancel") : i(p)("Edit")), 1)) : A("", !0)
        ])
      ]),
      s("div", null, [
        d.value ? (f(), w("div", Xs, [
          pe(s("textarea", {
            ref_key: "editInput",
            ref: r,
            "onUpdate:modelValue": T[1] || (T[1] = (h) => l.value = h),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [vt, l.value]
          ])
        ])) : (f(), w("pre", Qs, b(o.value), 1)),
        a.value.length ? (f(), R(i(a), {
          key: 2,
          error: c.value,
          onHidden: T[2] || (T[2] = (h) => a.value = "")
        }, {
          default: X(() => [
            se(b(a.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : A("", !0)
      ])
    ]));
  }
}), on = async (t, e) => {
  if (e) {
    if (e.isFile) {
      const n = await new Promise((o) => {
        e.file(o);
      });
      t(e, n);
    }
    if (e.isDirectory) {
      const n = e.createReader(), o = await new Promise((l) => {
        n.readEntries(l);
      });
      for (const l of o)
        await on(t, l);
    }
  }
}, we = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Qn(t) {
  const e = Z(), { t: n } = e.i18n, o = e.fs, l = j(o.path), r = e.config, d = E({ QUEUE_ENTRY_STATUS: we }), a = E(null), c = E(null), u = E(null), v = E(null), p = E(null), _ = E([]), y = E(""), F = E(!1), T = E(!1), h = E(null);
  let g;
  const m = (S) => {
    S.preventDefault(), S.stopPropagation(), T.value = !0;
  }, $ = (S) => {
    S.preventDefault(), S.stopPropagation(), T.value = !0;
  }, x = (S) => {
    S.preventDefault(), S.stopPropagation(), (!S.relatedTarget || S.relatedTarget === document.body) && (T.value = !1);
  }, C = (S) => {
    S.preventDefault(), S.stopPropagation(), T.value = !1;
    const k = /^[/\\](.+)/, D = S.dataTransfer;
    D && (D.items && D.items.length ? Array.from(D.items).forEach((M) => {
      if (M.kind === "file") {
        const N = M.webkitGetAsEntry?.();
        if (N)
          on((Q, me) => {
            const fe = k.exec(Q?.fullPath || "");
            P(me, fe ? fe[1] : me.name);
          }, N);
        else {
          const Q = M.getAsFile?.();
          Q && P(Q);
        }
      }
    }) : D.files && D.files.length && Array.from(D.files).forEach((M) => P(M)));
  }, z = (S) => _.value.findIndex((k) => k.id === S), P = (S, k) => g.addFile({ name: k || S.name, type: S.type, data: S, source: "Local" }), q = (S) => S.status === we.DONE ? "text-green-600" : S.status === we.ERROR || S.status === we.CANCELED ? "text-red-600" : "", I = (S) => S.status === we.DONE ? "✓" : S.status === we.ERROR || S.status === we.CANCELED ? "!" : "...", H = () => v.value?.click(), te = () => e.modal.close(), ae = (S) => {
    if (F.value || !_.value.filter((k) => k.status !== we.DONE).length) {
      F.value || (y.value = n("Please select file to upload first."));
      return;
    }
    y.value = "", h.value = S || l.value, g.upload();
  }, ee = () => {
    g.cancelAll(), _.value.forEach((S) => {
      S.status !== we.DONE && (S.status = we.CANCELED, S.statusName = n("Canceled"));
    }), F.value = !1;
  }, ie = (S) => {
    F.value || (g.removeFile(S.id), _.value.splice(z(S.id), 1));
  }, ue = (S) => {
    if (!F.value)
      if (g.cancelAll(), S) {
        const k = _.value.filter((D) => D.status !== we.DONE);
        _.value = [], k.forEach((D) => P(D.originalFile, D.name));
      } else
        _.value = [];
  }, Y = (S) => {
    S.forEach((k) => {
      P(k);
    });
  };
  return ve(() => {
    g = new Bo({
      debug: e.debug,
      restrictions: { maxFileSize: Qo(r.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (M, N) => {
        if (N[M.id] != null) {
          const me = z(M.id);
          _.value[me]?.status === we.PENDING && (y.value = g.i18n("noDuplicates", { fileName: M.name })), _.value = _.value.filter((fe) => fe.id !== M.id);
        }
        return _.value.push({
          id: M.id,
          name: M.name,
          size: e.filesize(M.size),
          status: we.PENDING,
          statusName: n("Pending upload"),
          percent: null,
          originalFile: M.data
        }), !0;
      }
    });
    const S = {
      getTargetPath: () => (h.value || l.value).path
    };
    if (t)
      t(g, S);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(g, S);
    else
      throw new Error("No uploader configured");
    g.on("restriction-failed", (M, N) => {
      const Q = _.value[z(M.id)];
      Q && ie(Q), y.value = N.message;
    }), g.on("upload-progress", (M, N) => {
      const Q = N.bytesTotal ?? 1, me = Math.floor(N.bytesUploaded / Q * 100), fe = z(M.id);
      fe !== -1 && _.value[fe] && (_.value[fe].percent = `${me}%`);
    }), g.on("upload-success", (M) => {
      const N = _.value[z(M.id)];
      N && (N.status = we.DONE, N.statusName = n("Done"));
    }), g.on("upload-error", (M, N) => {
      const Q = _.value[z(M.id)];
      Q && (Q.percent = null, Q.status = we.ERROR, Q.statusName = N?.isNetworkError ? n("Network Error, Unable establish connection to the server or interrupted.") : N?.message || n("Unknown Error"));
    }), g.on("error", (M) => {
      y.value = M.message, F.value = !1, e.adapter.open(l.value.path);
    }), g.on("complete", () => {
      F.value = !1;
      const M = h.value || l.value;
      e.adapter.invalidateListQuery(M.path), e.adapter.open(M.path);
      const N = _.value.filter((Q) => Q.status === we.DONE).map((Q) => Q.name);
      e.emitter.emit("vf-upload-complete", N);
    }), v.value?.addEventListener("click", () => c.value?.click()), p.value?.addEventListener("click", () => u.value?.click());
    const k = { capture: !0 };
    document.addEventListener("dragover", m, k), document.addEventListener("dragenter", $, k), document.addEventListener("dragleave", x, k), document.addEventListener("drop", C, k);
    const D = (M) => {
      const N = M.target, Q = N.files;
      if (Q) {
        for (const me of Q) P(me);
        N.value = "";
      }
    };
    c.value?.addEventListener("change", D), u.value?.addEventListener("change", D);
  }), ke(() => {
    const S = { capture: !0 };
    document.removeEventListener("dragover", m, S), document.removeEventListener("dragenter", $, S), document.removeEventListener("dragleave", x, S), document.removeEventListener("drop", C, S);
  }), {
    container: a,
    internalFileInput: c,
    internalFolderInput: u,
    pickFiles: v,
    pickFolders: p,
    queue: _,
    message: y,
    uploading: F,
    hasFilesInDropArea: T,
    definitions: d,
    openFileSelector: H,
    upload: ae,
    cancel: ee,
    remove: ie,
    clear: ue,
    close: te,
    getClassNameForEntry: q,
    getIconForEntry: I,
    addExternalFiles: Y
  };
}
const Zs = { class: "vuefinder__image-preview" }, ei = { class: "vuefinder__image-preview__header" }, ti = ["title"], ni = { class: "vuefinder__image-preview__actions" }, oi = { class: "vuefinder__image-preview__image-container" }, si = ["src"], ii = /* @__PURE__ */ J({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = Z(), { enabled: l } = Oe(), { t: r } = o.i18n, d = E(!1), a = E(""), c = E(!1), u = E(o.adapter.getPreviewUrl({ path: o.modal.data.item.path })), v = E(u.value), { addExternalFiles: p, upload: _, queue: y } = Qn(o.customUploader), F = o.fs, T = j(F.path), h = Ke("cropperRef"), g = async () => {
      d.value = !d.value, o.modal.setEditMode(d.value);
    }, m = async () => {
      const x = h.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!x) return;
      let C = x;
      if (x.width > 1200 || x.height > 1200) {
        const H = Math.min(1200 / x.width, 1200 / x.height), te = document.createElement("canvas");
        te.width = Math.floor(x.width * H), te.height = Math.floor(x.height * H);
        const ae = te.getContext("2d");
        ae && (ae.drawImage(x, 0, 0, te.width, te.height), C = te);
      }
      const z = o.modal.data.item.basename, P = z.split(".").pop()?.toLowerCase() || "jpg", q = P === "png" ? "image/png" : P === "gif" ? "image/gif" : "image/jpeg", I = await new Promise((H) => {
        C.toBlob((te) => H(te), q);
      });
      if (!I) {
        a.value = r("Failed to save image"), c.value = !0;
        return;
      }
      a.value = "", c.value = !1;
      try {
        const H = new File([I], z, { type: q }), ae = o.modal.data.item.path.split("/");
        ae.pop();
        const ie = {
          path: ae.join("/") || (T.value?.path ?? "")
        };
        p([H]), await new Promise((k) => setTimeout(k, 100));
        const ue = y.value.find((k) => k.name === H.name);
        if (!ue)
          throw new Error("File was not added to upload queue");
        _(ie);
        let Y = 0;
        for (; Y < 150; ) {
          await new Promise((D) => setTimeout(D, 200));
          const k = y.value.find((D) => D.id === ue.id);
          if (k?.status === we.DONE) break;
          if (k?.status === we.ERROR)
            throw new Error(k.statusName || "Upload failed");
          Y++;
        }
        a.value = r("Updated."), await fetch(u.value, { cache: "reload", mode: "no-cors" });
        const S = o.root?.querySelector?.('[data-src="' + u.value + '"]');
        S && S instanceof HTMLElement && zn.resetStatus(S), o.emitter.emit("vf-refresh-thumbnails"), await g(), n("success");
      } catch (H) {
        const te = H?.message ?? "Error";
        a.value = r(te), c.value = !0;
      }
    };
    return ve(() => {
      n("success");
    }), ($, x) => (f(), w("div", Zs, [
      s("div", ei, [
        s("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: i(o).modal.data.item.path
        }, b(i(o).modal.data.item.basename), 9, ti),
        s("div", ni, [
          d.value ? (f(), w("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: m
          }, b(i(r)("Crop")), 1)) : A("", !0),
          i(l)("edit") ? (f(), w("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: x[0] || (x[0] = (C) => g())
          }, b(d.value ? i(r)("Cancel") : i(r)("Edit")), 1)) : A("", !0)
        ])
      ]),
      s("div", oi, [
        d.value ? (f(), R(i(zo), {
          key: 1,
          ref_key: "cropperRef",
          ref: h,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: v.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (f(), w("img", {
          key: 0,
          style: {},
          src: i(o).adapter.getPreviewUrl({ path: i(o).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, si))
      ]),
      a.value.length ? (f(), R(i(a), {
        key: 0,
        error: c.value,
        onHidden: x[1] || (x[1] = (C) => a.value = "")
      }, {
        default: X(() => [
          se(b(a.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : A("", !0)
    ]));
  }
}), li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ai(t, e) {
  return f(), w("svg", li, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const yt = { render: ai }, ri = { class: "vuefinder__default-preview" }, di = { class: "vuefinder__default-preview__content" }, ci = { class: "vuefinder__default-preview__header" }, ui = ["title"], fi = { class: "vuefinder__default-preview__icon-container" }, vi = ["title"], _i = /* @__PURE__ */ J({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Z(), o = e;
    return ve(() => {
      o("success");
    }), (l, r) => (f(), w("div", ri, [
      s("div", di, [
        s("div", ci, [
          s("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: i(n).modal.data.item.path
          }, b(i(n).modal.data.item.basename), 9, ui)
        ]),
        s("div", fi, [
          L(i(yt), { class: "vuefinder__default-preview__file-icon" }),
          s("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: i(n).modal.data.item.path
          }, b(i(n).modal.data.item.basename), 9, vi)
        ])
      ])
    ]));
  }
}), pi = { class: "vuefinder__video-preview" }, mi = ["title"], hi = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, gi = ["src"], wi = /* @__PURE__ */ J({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Z(), o = e, l = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return ve(() => {
      o("success");
    }), (r, d) => (f(), w("div", pi, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: i(n).modal.data.item.path
      }, b(i(n).modal.data.item.basename), 9, mi),
      s("div", null, [
        s("video", hi, [
          s("source", {
            src: l(),
            type: "video/mp4"
          }, null, 8, gi),
          d[0] || (d[0] = se(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), yi = { class: "vuefinder__audio-preview" }, bi = ["title"], ki = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, xi = ["src"], $i = /* @__PURE__ */ J({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = Z(), l = () => {
      const r = Z();
      return r.adapter.getPreviewUrl({ path: r.modal.data.item.path });
    };
    return ve(() => {
      n("success");
    }), (r, d) => (f(), w("div", yi, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: i(o).modal.data.item.path
      }, b(i(o).modal.data.item.basename), 9, bi),
      s("div", null, [
        s("audio", ki, [
          s("source", {
            src: l(),
            type: "audio/mpeg"
          }, null, 8, xi),
          d[0] || (d[0] = se(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Ci = { class: "vuefinder__pdf-preview" }, Si = ["title"], Fi = ["data"], Di = ["src"], Ti = /* @__PURE__ */ J({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Z(), o = e, l = () => {
      const r = Z();
      return r.adapter.getPreviewUrl({ path: r.modal.data.item.path });
    };
    return ve(() => {
      o("success");
    }), (r, d) => (f(), w("div", Ci, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: i(n).modal.data.item.path
      }, b(i(n).modal.data.item.basename), 9, Si),
      s("div", null, [
        s("object", {
          class: "vuefinder__pdf-preview__object",
          data: l(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          s("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: l(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Di)
        ], 8, Fi)
      ])
    ]));
  }
});
function Ei(t, e = null) {
  return new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Mi = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Ai = ["disabled", "title"], Pi = ["disabled", "title"], Ii = { class: "vuefinder__preview-modal__content" }, Oi = { key: 0 }, Li = { class: "vuefinder__preview-modal__loading" }, Ri = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Vi = { class: "vuefinder__preview-modal__details" }, Bi = { class: "font-bold" }, zi = { class: "pl-2 font-bold" }, Hi = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Ni = ["download", "href"], It = /* @__PURE__ */ J({
  __name: "ModalPreview",
  setup(t) {
    const e = Z(), { enabled: n } = Oe(), { t: o } = e.i18n, l = E(!1), r = (h) => (e.modal.data.item.mime_type ?? "").startsWith(h), d = n("preview");
    d || (l.value = !0);
    const a = K(() => e.modal.data.item), c = j(e.fs.sortedFiles), u = K(() => c.value.filter((h) => h.type === "file")), v = K(
      () => u.value.findIndex((h) => h.path === a.value.path)
    ), p = K(() => v.value > 0), _ = K(() => v.value < u.value.length - 1), y = () => {
      if (e.modal.editMode || !p.value) return;
      const h = u.value[v.value - 1];
      h && (e.fs.clearSelection(), e.fs.select(h.path), e.modal.data.item = h);
    }, F = () => {
      if (e.modal.editMode || !_.value) return;
      const h = u.value[v.value + 1];
      h && (e.fs.clearSelection(), e.fs.select(h.path), e.modal.data.item = h);
    }, T = (h) => {
      if (h.key === "Escape") {
        h.preventDefault(), h.stopPropagation(), e.modal.close();
        return;
      }
      (h.key === "ArrowLeft" || h.key === "ArrowRight") && (h.preventDefault(), h.stopPropagation(), h.key === "ArrowLeft" ? y() : F());
    };
    return ve(() => {
      const h = document.querySelector(".vuefinder__preview-modal");
      h && h.focus();
    }), (h, g) => (f(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[6] || (g[6] = (m) => i(e).modal.close())
        }, b(i(o)("Close")), 1),
        i(n)("download") ? (f(), w("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: i(e).adapter.getDownloadUrl({ path: i(e).modal.data.item.path }),
          href: i(e).adapter.getDownloadUrl({ path: i(e).modal.data.item.path })
        }, b(i(o)("Download")), 9, Ni)) : A("", !0)
      ]),
      default: X(() => [
        s("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: T
        }, [
          i(e).modal.editMode ? A("", !0) : (f(), w("div", Mi, [
            s("button", {
              disabled: !p.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: i(o)("Previous file"),
              onClick: y
            }, [...g[7] || (g[7] = [
              s("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                s("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, Ai),
            s("button", {
              disabled: !_.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: i(o)("Next file"),
              onClick: F
            }, [...g[8] || (g[8] = [
              s("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                s("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, Pi)
          ])),
          s("div", Ii, [
            i(d) ? (f(), w("div", Oi, [
              r("text") ? (f(), R(Js, {
                key: `text-${a.value.path}`,
                onSuccess: g[0] || (g[0] = (m) => l.value = !0)
              })) : r("image") ? (f(), R(ii, {
                key: `image-${a.value.path}`,
                onSuccess: g[1] || (g[1] = (m) => l.value = !0)
              })) : r("video") ? (f(), R(wi, {
                key: `video-${a.value.path}`,
                onSuccess: g[2] || (g[2] = (m) => l.value = !0)
              })) : r("audio") ? (f(), R($i, {
                key: `audio-${a.value.path}`,
                onSuccess: g[3] || (g[3] = (m) => l.value = !0)
              })) : r("application/pdf") ? (f(), R(Ti, {
                key: `pdf-${a.value.path}`,
                onSuccess: g[4] || (g[4] = (m) => l.value = !0)
              })) : (f(), R(_i, {
                key: `default-${a.value.path}`,
                onSuccess: g[5] || (g[5] = (m) => l.value = !0)
              }))
            ])) : A("", !0),
            s("div", Li, [
              l.value === !1 ? (f(), w("div", Ri, [
                g[9] || (g[9] = s("svg", {
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
                s("span", null, b(i(o)("Loading")), 1)
              ])) : A("", !0)
            ])
          ])
        ], 32),
        s("div", Vi, [
          s("div", null, [
            s("span", Bi, b(i(o)("File Size")) + ": ", 1),
            se(b(i(e).filesize(i(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", zi, b(i(o)("Last Modified")) + ": ", 1),
            se(" " + b(i(Ei)(i(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        i(n)("download") ? (f(), w("div", Hi, [
          s("span", null, b(i(o)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : A("", !0)
      ]),
      _: 1
    }));
  }
}), Ui = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Ki(t, e) {
  return f(), w("svg", Ui, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const ji = { render: Ki }, qi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Wi(t, e) {
  return f(), w("svg", qi, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ne = { render: Wi }, Gi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Yi(t, e) {
  return f(), w("svg", Gi, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Ot = { render: Yi }, Qi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Xi(t, e) {
  return f(), w("svg", Qi, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Lt = { render: Xi }, Ji = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Zi(t, e) {
  return f(), w("svg", Ji, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const sn = { render: Zi }, el = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function tl(t, e) {
  return f(), w("svg", el, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const ln = { render: tl }, nl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ol(t, e) {
  return f(), w("svg", nl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const an = { render: ol }, sl = { class: "vuefinder__modal-tree__folder-item" }, il = { class: "vuefinder__modal-tree__folder-content" }, ll = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, al = { class: "vuefinder__modal-tree__folder-text" }, rl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, dl = 300, cl = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = Z(), { t: o } = n.i18n, l = n.fs, r = t, d = e;
    j(l.path);
    const a = K(() => {
      const g = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[g] || !1;
    }), c = K(() => r.modelValue?.path === r.folder.path), u = K(() => r.currentPath?.path === r.folder.path), v = K(() => r.modalTreeData[r.folder.path] || []), p = K(() => v.value.length > 0 || r.folder.type === "dir"), _ = () => {
      d("toggleFolder", r.storage, r.folder.path);
    }, y = () => {
      d("update:modelValue", r.folder);
    }, F = () => {
      d("update:modelValue", r.folder), d("selectAndClose", r.folder);
    };
    let T = 0;
    const h = () => {
      const g = Date.now();
      g - T < dl ? F() : y(), T = g;
    };
    return (g, m) => {
      const $ = Rn("ModalTreeFolderItem", !0);
      return f(), w("div", sl, [
        s("div", il, [
          p.value ? (f(), w("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: _
          }, [
            a.value ? (f(), R(i(Lt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (f(), R(i(Ot), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (f(), w("div", ll)),
          s("div", {
            class: G(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": c.value,
              "vuefinder__modal-tree__folder-link--current": u.value
            }]),
            onClick: y,
            onDblclick: F,
            onTouchend: h
          }, [
            a.value ? (f(), R(i(an), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (f(), R(i(Ne), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            s("span", al, b(t.folder.basename), 1)
          ], 34)
        ]),
        a.value && p.value ? (f(), w("div", rl, [
          (f(!0), w(ce, null, _e(v.value, (x) => (f(), R($, {
            key: x.path,
            folder: x,
            storage: t.storage,
            "model-value": t.modelValue,
            "expanded-folders": t.expandedFolders,
            "modal-tree-data": t.modalTreeData,
            "current-path": t.currentPath,
            "onUpdate:modelValue": m[0] || (m[0] = (C) => g.$emit("update:modelValue", C)),
            onSelectAndClose: m[1] || (m[1] = (C) => g.$emit("selectAndClose", C)),
            onToggleFolder: m[2] || (m[2] = (C, z) => g.$emit("toggleFolder", C, z))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
        ])) : A("", !0)
      ]);
    };
  }
}), ul = { class: "vuefinder__modal-tree" }, fl = { class: "vuefinder__modal-tree__header" }, vl = { class: "vuefinder__modal-tree__title" }, _l = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, pl = { class: "vuefinder__modal-tree__section-title" }, ml = { class: "vuefinder__modal-tree__list" }, hl = ["onClick", "onDblclick", "onTouchend"], gl = { class: "vuefinder__modal-tree__text" }, wl = { class: "vuefinder__modal-tree__text-storage" }, yl = { class: "vuefinder__modal-tree__section-title" }, bl = { class: "vuefinder__modal-tree__list" }, kl = { class: "vuefinder__modal-tree__storage-item" }, xl = { class: "vuefinder__modal-tree__storage-content" }, $l = ["onClick"], Cl = ["onClick", "onDblclick", "onTouchend"], Sl = { class: "vuefinder__modal-tree__storage-text" }, Fl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, bn = 300, rn = /* @__PURE__ */ J({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(t, { emit: e }) {
    const n = Z(), { t: o } = n.i18n, l = n.fs, r = n.config, d = e, a = j(l.sortedFiles), c = j(l.storages), u = K(() => c.value || []), v = j(l.path), p = E(null), _ = E({}), y = E({});
    re(a, (P) => {
      const q = P.filter((H) => H.type === "dir"), I = v.value?.path || "";
      I && (y.value[I] = q.map((H) => ({
        ...H,
        type: "dir"
      })));
    });
    const F = (P, q) => {
      const I = `${P}:${q}`;
      _.value = {
        ..._.value,
        [I]: !_.value[I]
      }, _.value[I] && !y.value[q] && n.adapter.list(q).then((H) => {
        const ae = (H.files || []).filter((ee) => ee.type === "dir");
        y.value[q] = ae.map((ee) => ({
          ...ee,
          type: "dir"
        }));
      });
    }, T = (P) => y.value[P] || [], h = (P) => {
      P && d("update:modelValue", P);
    }, g = (P) => {
      P && (d("update:modelValue", P), d("selectAndClose", P));
    }, m = (P) => {
      const q = {
        storage: P,
        path: P + "://",
        basename: P,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: P + "://"
      };
      d("update:modelValue", q);
    }, $ = (P) => {
      const q = {
        storage: P,
        path: P + "://",
        basename: P,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: P + "://"
      };
      d("update:modelValue", q), d("selectAndClose", q);
    };
    let x = 0;
    const C = (P) => {
      if (!P) return;
      const q = Date.now();
      q - x < bn ? g(P) : h(P), x = q;
    }, z = (P) => {
      const q = Date.now();
      q - x < bn ? $(P) : m(P), x = q;
    };
    return ve(() => {
      p.value && Mt(p.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (P, q) => (f(), w("div", ul, [
      s("div", fl, [
        s("div", vl, b(i(o)("Select Target Folder")), 1)
      ]),
      s("div", {
        ref_key: "modalContentElement",
        ref: p,
        class: "vuefinder__modal-tree__content"
      }, [
        t.showPinnedFolders && i(n).features.pinned && i(r).get("pinnedFolders").length ? (f(), w("div", _l, [
          s("div", pl, b(i(o)("Pinned Folders")), 1),
          s("div", ml, [
            (f(!0), w(ce, null, _e(i(r).get("pinnedFolders"), (I) => (f(), w("div", {
              key: I.path,
              class: G(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": t.modelValue?.path === I.path }]),
              onClick: (H) => h(I),
              onDblclick: (H) => g(I),
              onTouchend: (H) => C(I)
            }, [
              L(i(Ne), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              s("div", gl, b(I.basename), 1),
              s("div", wl, b(I.storage), 1),
              L(i(sn), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, hl))), 128))
          ])
        ])) : A("", !0),
        s("div", yl, b(i(o)("Storages")), 1),
        (f(!0), w(ce, null, _e(u.value, (I) => (f(), w("div", {
          key: I,
          class: "vuefinder__modal-tree__section"
        }, [
          s("div", bl, [
            s("div", kl, [
              s("div", xl, [
                s("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: de((H) => F(I, I + "://"), ["stop"])
                }, [
                  _.value[`${I}:${I}://`] ? (f(), R(i(Lt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (f(), R(i(Ot), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, $l),
                s("div", {
                  class: G(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": t.modelValue?.path === I + "://"
                  }]),
                  onClick: (H) => m(I),
                  onDblclick: (H) => $(I),
                  onTouchend: (H) => z(I)
                }, [
                  L(i(ln), { class: "vuefinder__modal-tree__storage-icon" }),
                  s("span", Sl, b(I), 1)
                ], 42, Cl)
              ]),
              _.value[`${I}:${I}://`] ? (f(), w("div", Fl, [
                (f(!0), w(ce, null, _e(T(I + "://"), (H) => (f(), R(cl, {
                  key: H.path,
                  folder: H,
                  storage: I,
                  "model-value": t.modelValue,
                  "expanded-folders": _.value,
                  "modal-tree-data": y.value,
                  "current-path": t.currentPath,
                  "onUpdate:modelValue": h,
                  onSelectAndClose: g,
                  onToggleFolder: F
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
              ])) : A("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Dl = { class: "vuefinder__move-modal__content" }, Tl = { class: "vuefinder__move-modal__description" }, El = { class: "vuefinder__move-modal__files vf-scrollbar" }, Ml = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Al = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pl = { class: "vuefinder__move-modal__file-name" }, Il = { class: "vuefinder__move-modal__target-title" }, Ol = { class: "vuefinder__move-modal__target-container" }, Ll = { class: "vuefinder__move-modal__target-path" }, Rl = { class: "vuefinder__move-modal__target-storage" }, Vl = {
  key: 0,
  class: "vuefinder__move-modal__Destination-folder"
}, Bl = { class: "vuefinder__move-modal__target-badge" }, zl = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, Hl = { class: "vuefinder__move-modal__checkbox-label" }, Nl = { class: "vuefinder__move-modal__checkbox-text" }, Ul = { class: "vuefinder__move-modal__selected-items" }, Xn = /* @__PURE__ */ J({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(t) {
    const e = Z(), { enabled: n } = Oe(), { t: o } = e.i18n, l = t, r = E(e.modal.data.items.from), d = E(e.modal.data.items.to), a = E(""), c = E(l.copy || !n("move")), u = K(() => c.value ? "copy" : "move"), v = E(!1), p = j(e.fs.path), _ = K(() => c.value ? o("Copy files") : o("Move files")), y = K(
      () => c.value ? o("Are you sure you want to copy these files?") : o("Are you sure you want to move these files?")
    ), F = K(() => c.value ? o("Yes, Copy!") : o("Yes, Move!"));
    K(() => c.value ? o("Files copied.") : o("Files moved."));
    const T = ($) => {
      $ && (d.value = $);
    }, h = ($) => {
      $ && (d.value = $, v.value = !1);
    }, g = () => {
      const $ = d.value.path;
      if (!$) return { storage: "local", path: "" };
      if ($.endsWith("://"))
        return { storage: $.replace("://", ""), path: "" };
      const x = $.split("://");
      return {
        storage: x[0] || "local",
        path: x[1] || ""
      };
    }, m = async () => {
      if (r.value.length) {
        const { files: $ } = await e.adapter[u.value]({
          path: p.value.path,
          sources: r.value.map(({ path: x }) => x),
          destination: d.value.path
        });
        e.fs.setFiles($), e.modal.close();
      }
    };
    return ($, x) => (f(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: m
        }, b(F.value), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[4] || (x[4] = (C) => i(e).modal.close())
        }, b(i(o)("Cancel")), 1),
        s("div", Ul, b(i(o)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: X(() => [
        s("div", null, [
          L(Ee, {
            icon: i(ji),
            title: _.value
          }, null, 8, ["icon", "title"]),
          s("div", Dl, [
            s("p", Tl, b(y.value), 1),
            s("div", El, [
              (f(!0), w(ce, null, _e(r.value, (C) => (f(), w("div", {
                key: C.path,
                class: "vuefinder__move-modal__file"
              }, [
                s("div", null, [
                  C.type === "dir" ? (f(), w("svg", Ml, [...x[5] || (x[5] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), w("svg", Al, [...x[6] || (x[6] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", Pl, b(C.path), 1)
              ]))), 128))
            ]),
            s("h4", Il, b(i(o)("Target Directory")), 1),
            s("div", Ol, [
              s("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: x[0] || (x[0] = (C) => v.value = !v.value)
              }, [
                s("div", Ll, [
                  s("span", Rl, b(g().storage) + "://", 1),
                  g().path ? (f(), w("span", Vl, b(g().path), 1)) : A("", !0)
                ]),
                s("span", Bl, b(i(o)("Browse")), 1)
              ])
            ]),
            s("div", {
              class: G([
                "vuefinder__move-modal__tree-selector",
                v.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              L(rn, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  x[1] || (x[1] = (C) => d.value = C),
                  T
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: h
              }, null, 8, ["modelValue"])
            ], 2),
            i(n)("copy") && i(n)("move") ? (f(), w("div", zl, [
              s("label", Hl, [
                pe(s("input", {
                  "onUpdate:modelValue": x[2] || (x[2] = (C) => c.value = C),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [en, c.value]
                ]),
                s("span", Nl, b(i(o)("Create a copy instead of moving")), 1)
              ])
            ])) : A("", !0),
            a.value.length ? (f(), R(i(a), {
              key: 1,
              error: "",
              onHidden: x[3] || (x[3] = (C) => a.value = "")
            }, {
              default: X(() => [
                se(b(a.value), 1)
              ]),
              _: 1
            })) : A("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ot = /* @__PURE__ */ J({
  __name: "ModalMove",
  setup(t) {
    return (e, n) => (f(), R(Xn, { copy: !1 }));
  }
}), dn = /* @__PURE__ */ J({
  __name: "ModalCopy",
  setup(t) {
    return (e, n) => (f(), R(Xn, { copy: !0 }));
  }
}), Kl = (t, e = 0, n = !1) => {
  let o;
  return (...l) => {
    n && !o && t(...l), clearTimeout(o), o = setTimeout(() => {
      t(...l);
    }, e);
  };
}, Jn = (t, e, n) => {
  const o = E(t);
  return To((l, r) => ({
    get() {
      return l(), o.value;
    },
    set: Kl(
      (d) => {
        o.value = d, r();
      },
      e,
      !1
    )
  }));
}, jl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function ql(t, e) {
  return f(), w("svg", jl, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const cn = { render: ql }, Wl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Gl(t, e) {
  return f(), w("svg", Wl, [...e[0] || (e[0] = [
    s("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    s("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const Rt = { render: Gl }, Yl = { class: "vuefinder__search-modal__search-input" }, Ql = ["value", "placeholder", "disabled"], Xl = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Jl = /* @__PURE__ */ J({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const o = n, l = Z(), { t: r } = l.i18n, d = E(null), a = (u) => {
      const v = u.target;
      o("update:modelValue", v.value);
    }, c = (u) => {
      o("keydown", u);
    };
    return e({
      focus: () => {
        d.value && d.value.focus();
      }
    }), (u, v) => (f(), w("div", Yl, [
      L(i(cn), { class: "vuefinder__search-modal__search-icon" }),
      s("input", {
        ref_key: "searchInput",
        ref: d,
        value: t.modelValue,
        type: "text",
        placeholder: i(r)("Search Files"),
        disabled: t.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: v[0] || (v[0] = de(() => {
        }, ["stop"])),
        onInput: a
      }, null, 40, Ql),
      t.isSearching ? (f(), w("div", Xl, [
        L(i(Rt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : A("", !0)
    ]));
  }
}), bt = Math.min, Qe = Math.max, kt = Math.round, gt = Math.floor, Le = (t) => ({
  x: t,
  y: t
}), Zl = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, ea = {
  start: "end",
  end: "start"
};
function kn(t, e, n) {
  return Qe(t, bt(e, n));
}
function Vt(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Xe(t) {
  return t.split("-")[0];
}
function Bt(t) {
  return t.split("-")[1];
}
function Zn(t) {
  return t === "x" ? "y" : "x";
}
function eo(t) {
  return t === "y" ? "height" : "width";
}
const ta = /* @__PURE__ */ new Set(["top", "bottom"]);
function qe(t) {
  return ta.has(Xe(t)) ? "y" : "x";
}
function to(t) {
  return Zn(qe(t));
}
function na(t, e, n) {
  n === void 0 && (n = !1);
  const o = Bt(t), l = to(t), r = eo(l);
  let d = l === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (d = xt(d)), [d, xt(d)];
}
function oa(t) {
  const e = xt(t);
  return [Xt(t), e, Xt(e)];
}
function Xt(t) {
  return t.replace(/start|end/g, (e) => ea[e]);
}
const xn = ["left", "right"], $n = ["right", "left"], sa = ["top", "bottom"], ia = ["bottom", "top"];
function la(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? $n : xn : e ? xn : $n;
    case "left":
    case "right":
      return e ? sa : ia;
    default:
      return [];
  }
}
function aa(t, e, n, o) {
  const l = Bt(t);
  let r = la(Xe(t), n === "start", o);
  return l && (r = r.map((d) => d + "-" + l), e && (r = r.concat(r.map(Xt)))), r;
}
function xt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Zl[e]);
}
function ra(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function da(t) {
  return typeof t != "number" ? ra(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function $t(t) {
  const {
    x: e,
    y: n,
    width: o,
    height: l
  } = t;
  return {
    width: o,
    height: l,
    top: n,
    left: e,
    right: e + o,
    bottom: n + l,
    x: e,
    y: n
  };
}
function Cn(t, e, n) {
  let {
    reference: o,
    floating: l
  } = t;
  const r = qe(e), d = to(e), a = eo(d), c = Xe(e), u = r === "y", v = o.x + o.width / 2 - l.width / 2, p = o.y + o.height / 2 - l.height / 2, _ = o[a] / 2 - l[a] / 2;
  let y;
  switch (c) {
    case "top":
      y = {
        x: v,
        y: o.y - l.height
      };
      break;
    case "bottom":
      y = {
        x: v,
        y: o.y + o.height
      };
      break;
    case "right":
      y = {
        x: o.x + o.width,
        y: p
      };
      break;
    case "left":
      y = {
        x: o.x - l.width,
        y: p
      };
      break;
    default:
      y = {
        x: o.x,
        y: o.y
      };
  }
  switch (Bt(e)) {
    case "start":
      y[d] -= _ * (n && u ? -1 : 1);
      break;
    case "end":
      y[d] += _ * (n && u ? -1 : 1);
      break;
  }
  return y;
}
const ca = async (t, e, n) => {
  const {
    placement: o = "bottom",
    strategy: l = "absolute",
    middleware: r = [],
    platform: d
  } = n, a = r.filter(Boolean), c = await (d.isRTL == null ? void 0 : d.isRTL(e));
  let u = await d.getElementRects({
    reference: t,
    floating: e,
    strategy: l
  }), {
    x: v,
    y: p
  } = Cn(u, o, c), _ = o, y = {}, F = 0;
  for (let T = 0; T < a.length; T++) {
    const {
      name: h,
      fn: g
    } = a[T], {
      x: m,
      y: $,
      data: x,
      reset: C
    } = await g({
      x: v,
      y: p,
      initialPlacement: o,
      placement: _,
      strategy: l,
      middlewareData: y,
      rects: u,
      platform: d,
      elements: {
        reference: t,
        floating: e
      }
    });
    v = m ?? v, p = $ ?? p, y = {
      ...y,
      [h]: {
        ...y[h],
        ...x
      }
    }, C && F <= 50 && (F++, typeof C == "object" && (C.placement && (_ = C.placement), C.rects && (u = C.rects === !0 ? await d.getElementRects({
      reference: t,
      floating: e,
      strategy: l
    }) : C.rects), {
      x: v,
      y: p
    } = Cn(u, _, c)), T = -1);
  }
  return {
    x: v,
    y: p,
    placement: _,
    strategy: l,
    middlewareData: y
  };
};
async function no(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: o,
    y: l,
    platform: r,
    rects: d,
    elements: a,
    strategy: c
  } = t, {
    boundary: u = "clippingAncestors",
    rootBoundary: v = "viewport",
    elementContext: p = "floating",
    altBoundary: _ = !1,
    padding: y = 0
  } = Vt(e, t), F = da(y), h = a[_ ? p === "floating" ? "reference" : "floating" : p], g = $t(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(h))) == null || n ? h : h.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(a.floating)),
    boundary: u,
    rootBoundary: v,
    strategy: c
  })), m = p === "floating" ? {
    x: o,
    y: l,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, $ = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(a.floating)), x = await (r.isElement == null ? void 0 : r.isElement($)) ? await (r.getScale == null ? void 0 : r.getScale($)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, C = $t(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: m,
    offsetParent: $,
    strategy: c
  }) : m);
  return {
    top: (g.top - C.top + F.top) / x.y,
    bottom: (C.bottom - g.bottom + F.bottom) / x.y,
    left: (g.left - C.left + F.left) / x.x,
    right: (C.right - g.right + F.right) / x.x
  };
}
const ua = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, o;
      const {
        placement: l,
        middlewareData: r,
        rects: d,
        initialPlacement: a,
        platform: c,
        elements: u
      } = e, {
        mainAxis: v = !0,
        crossAxis: p = !0,
        fallbackPlacements: _,
        fallbackStrategy: y = "bestFit",
        fallbackAxisSideDirection: F = "none",
        flipAlignment: T = !0,
        ...h
      } = Vt(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const g = Xe(l), m = qe(a), $ = Xe(a) === a, x = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), C = _ || ($ || !T ? [xt(a)] : oa(a)), z = F !== "none";
      !_ && z && C.push(...aa(a, T, F, x));
      const P = [a, ...C], q = await no(e, h), I = [];
      let H = ((o = r.flip) == null ? void 0 : o.overflows) || [];
      if (v && I.push(q[g]), p) {
        const ie = na(l, d, x);
        I.push(q[ie[0]], q[ie[1]]);
      }
      if (H = [...H, {
        placement: l,
        overflows: I
      }], !I.every((ie) => ie <= 0)) {
        var te, ae;
        const ie = (((te = r.flip) == null ? void 0 : te.index) || 0) + 1, ue = P[ie];
        if (ue && (!(p === "alignment" ? m !== qe(ue) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        H.every((k) => qe(k.placement) === m ? k.overflows[0] > 0 : !0)))
          return {
            data: {
              index: ie,
              overflows: H
            },
            reset: {
              placement: ue
            }
          };
        let Y = (ae = H.filter((S) => S.overflows[0] <= 0).sort((S, k) => S.overflows[1] - k.overflows[1])[0]) == null ? void 0 : ae.placement;
        if (!Y)
          switch (y) {
            case "bestFit": {
              var ee;
              const S = (ee = H.filter((k) => {
                if (z) {
                  const D = qe(k.placement);
                  return D === m || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  D === "y";
                }
                return !0;
              }).map((k) => [k.placement, k.overflows.filter((D) => D > 0).reduce((D, M) => D + M, 0)]).sort((k, D) => k[1] - D[1])[0]) == null ? void 0 : ee[0];
              S && (Y = S);
              break;
            }
            case "initialPlacement":
              Y = a;
              break;
          }
        if (l !== Y)
          return {
            reset: {
              placement: Y
            }
          };
      }
      return {};
    }
  };
}, fa = /* @__PURE__ */ new Set(["left", "top"]);
async function va(t, e) {
  const {
    placement: n,
    platform: o,
    elements: l
  } = t, r = await (o.isRTL == null ? void 0 : o.isRTL(l.floating)), d = Xe(n), a = Bt(n), c = qe(n) === "y", u = fa.has(d) ? -1 : 1, v = r && c ? -1 : 1, p = Vt(e, t);
  let {
    mainAxis: _,
    crossAxis: y,
    alignmentAxis: F
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: p.mainAxis || 0,
    crossAxis: p.crossAxis || 0,
    alignmentAxis: p.alignmentAxis
  };
  return a && typeof F == "number" && (y = a === "end" ? F * -1 : F), c ? {
    x: y * v,
    y: _ * u
  } : {
    x: _ * u,
    y: y * v
  };
}
const _a = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, o;
      const {
        x: l,
        y: r,
        placement: d,
        middlewareData: a
      } = e, c = await va(e, t);
      return d === ((n = a.offset) == null ? void 0 : n.placement) && (o = a.arrow) != null && o.alignmentOffset ? {} : {
        x: l + c.x,
        y: r + c.y,
        data: {
          ...c,
          placement: d
        }
      };
    }
  };
}, pa = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: o,
        placement: l
      } = e, {
        mainAxis: r = !0,
        crossAxis: d = !1,
        limiter: a = {
          fn: (h) => {
            let {
              x: g,
              y: m
            } = h;
            return {
              x: g,
              y: m
            };
          }
        },
        ...c
      } = Vt(t, e), u = {
        x: n,
        y: o
      }, v = await no(e, c), p = qe(Xe(l)), _ = Zn(p);
      let y = u[_], F = u[p];
      if (r) {
        const h = _ === "y" ? "top" : "left", g = _ === "y" ? "bottom" : "right", m = y + v[h], $ = y - v[g];
        y = kn(m, y, $);
      }
      if (d) {
        const h = p === "y" ? "top" : "left", g = p === "y" ? "bottom" : "right", m = F + v[h], $ = F - v[g];
        F = kn(m, F, $);
      }
      const T = a.fn({
        ...e,
        [_]: y,
        [p]: F
      });
      return {
        ...T,
        data: {
          x: T.x - n,
          y: T.y - o,
          enabled: {
            [_]: r,
            [p]: d
          }
        }
      };
    }
  };
};
function zt() {
  return typeof window < "u";
}
function it(t) {
  return oo(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Se(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Ve(t) {
  var e;
  return (e = (oo(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function oo(t) {
  return zt() ? t instanceof Node || t instanceof Se(t).Node : !1;
}
function Pe(t) {
  return zt() ? t instanceof Element || t instanceof Se(t).Element : !1;
}
function Re(t) {
  return zt() ? t instanceof HTMLElement || t instanceof Se(t).HTMLElement : !1;
}
function Sn(t) {
  return !zt() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Se(t).ShadowRoot;
}
const ma = /* @__PURE__ */ new Set(["inline", "contents"]);
function _t(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: l
  } = Ie(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && !ma.has(l);
}
const ha = /* @__PURE__ */ new Set(["table", "td", "th"]);
function ga(t) {
  return ha.has(it(t));
}
const wa = [":popover-open", ":modal"];
function Ht(t) {
  return wa.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const ya = ["transform", "translate", "scale", "rotate", "perspective"], ba = ["transform", "translate", "scale", "rotate", "perspective", "filter"], ka = ["paint", "layout", "strict", "content"];
function un(t) {
  const e = fn(), n = Pe(t) ? Ie(t) : t;
  return ya.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ba.some((o) => (n.willChange || "").includes(o)) || ka.some((o) => (n.contain || "").includes(o));
}
function xa(t) {
  let e = We(t);
  for (; Re(e) && !st(e); ) {
    if (un(e))
      return e;
    if (Ht(e))
      return null;
    e = We(e);
  }
  return null;
}
function fn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const $a = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function st(t) {
  return $a.has(it(t));
}
function Ie(t) {
  return Se(t).getComputedStyle(t);
}
function Nt(t) {
  return Pe(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function We(t) {
  if (it(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Sn(t) && t.host || // Fallback.
    Ve(t)
  );
  return Sn(e) ? e.host : e;
}
function so(t) {
  const e = We(t);
  return st(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Re(e) && _t(e) ? e : so(e);
}
function ct(t, e, n) {
  var o;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const l = so(t), r = l === ((o = t.ownerDocument) == null ? void 0 : o.body), d = Se(l);
  if (r) {
    const a = Jt(d);
    return e.concat(d, d.visualViewport || [], _t(l) ? l : [], a && n ? ct(a) : []);
  }
  return e.concat(l, ct(l, [], n));
}
function Jt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function io(t) {
  const e = Ie(t);
  let n = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const l = Re(t), r = l ? t.offsetWidth : n, d = l ? t.offsetHeight : o, a = kt(n) !== r || kt(o) !== d;
  return a && (n = r, o = d), {
    width: n,
    height: o,
    $: a
  };
}
function vn(t) {
  return Pe(t) ? t : t.contextElement;
}
function et(t) {
  const e = vn(t);
  if (!Re(e))
    return Le(1);
  const n = e.getBoundingClientRect(), {
    width: o,
    height: l,
    $: r
  } = io(e);
  let d = (r ? kt(n.width) : n.width) / o, a = (r ? kt(n.height) : n.height) / l;
  return (!d || !Number.isFinite(d)) && (d = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: d,
    y: a
  };
}
const Ca = /* @__PURE__ */ Le(0);
function lo(t) {
  const e = Se(t);
  return !fn() || !e.visualViewport ? Ca : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Sa(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Se(t) ? !1 : e;
}
function Je(t, e, n, o) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const l = t.getBoundingClientRect(), r = vn(t);
  let d = Le(1);
  e && (o ? Pe(o) && (d = et(o)) : d = et(t));
  const a = Sa(r, n, o) ? lo(r) : Le(0);
  let c = (l.left + a.x) / d.x, u = (l.top + a.y) / d.y, v = l.width / d.x, p = l.height / d.y;
  if (r) {
    const _ = Se(r), y = o && Pe(o) ? Se(o) : o;
    let F = _, T = Jt(F);
    for (; T && o && y !== F; ) {
      const h = et(T), g = T.getBoundingClientRect(), m = Ie(T), $ = g.left + (T.clientLeft + parseFloat(m.paddingLeft)) * h.x, x = g.top + (T.clientTop + parseFloat(m.paddingTop)) * h.y;
      c *= h.x, u *= h.y, v *= h.x, p *= h.y, c += $, u += x, F = Se(T), T = Jt(F);
    }
  }
  return $t({
    width: v,
    height: p,
    x: c,
    y: u
  });
}
function Ut(t, e) {
  const n = Nt(t).scrollLeft;
  return e ? e.left + n : Je(Ve(t)).left + n;
}
function ao(t, e) {
  const n = t.getBoundingClientRect(), o = n.left + e.scrollLeft - Ut(t, n), l = n.top + e.scrollTop;
  return {
    x: o,
    y: l
  };
}
function Fa(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: o,
    strategy: l
  } = t;
  const r = l === "fixed", d = Ve(o), a = e ? Ht(e.floating) : !1;
  if (o === d || a && r)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Le(1);
  const v = Le(0), p = Re(o);
  if ((p || !p && !r) && ((it(o) !== "body" || _t(d)) && (c = Nt(o)), Re(o))) {
    const y = Je(o);
    u = et(o), v.x = y.x + o.clientLeft, v.y = y.y + o.clientTop;
  }
  const _ = d && !p && !r ? ao(d, c) : Le(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - c.scrollLeft * u.x + v.x + _.x,
    y: n.y * u.y - c.scrollTop * u.y + v.y + _.y
  };
}
function Da(t) {
  return Array.from(t.getClientRects());
}
function Ta(t) {
  const e = Ve(t), n = Nt(t), o = t.ownerDocument.body, l = Qe(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), r = Qe(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let d = -n.scrollLeft + Ut(t);
  const a = -n.scrollTop;
  return Ie(o).direction === "rtl" && (d += Qe(e.clientWidth, o.clientWidth) - l), {
    width: l,
    height: r,
    x: d,
    y: a
  };
}
const Fn = 25;
function Ea(t, e) {
  const n = Se(t), o = Ve(t), l = n.visualViewport;
  let r = o.clientWidth, d = o.clientHeight, a = 0, c = 0;
  if (l) {
    r = l.width, d = l.height;
    const v = fn();
    (!v || v && e === "fixed") && (a = l.offsetLeft, c = l.offsetTop);
  }
  const u = Ut(o);
  if (u <= 0) {
    const v = o.ownerDocument, p = v.body, _ = getComputedStyle(p), y = v.compatMode === "CSS1Compat" && parseFloat(_.marginLeft) + parseFloat(_.marginRight) || 0, F = Math.abs(o.clientWidth - p.clientWidth - y);
    F <= Fn && (r -= F);
  } else u <= Fn && (r += u);
  return {
    width: r,
    height: d,
    x: a,
    y: c
  };
}
const Ma = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Aa(t, e) {
  const n = Je(t, !0, e === "fixed"), o = n.top + t.clientTop, l = n.left + t.clientLeft, r = Re(t) ? et(t) : Le(1), d = t.clientWidth * r.x, a = t.clientHeight * r.y, c = l * r.x, u = o * r.y;
  return {
    width: d,
    height: a,
    x: c,
    y: u
  };
}
function Dn(t, e, n) {
  let o;
  if (e === "viewport")
    o = Ea(t, n);
  else if (e === "document")
    o = Ta(Ve(t));
  else if (Pe(e))
    o = Aa(e, n);
  else {
    const l = lo(t);
    o = {
      x: e.x - l.x,
      y: e.y - l.y,
      width: e.width,
      height: e.height
    };
  }
  return $t(o);
}
function ro(t, e) {
  const n = We(t);
  return n === e || !Pe(n) || st(n) ? !1 : Ie(n).position === "fixed" || ro(n, e);
}
function Pa(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = ct(t, [], !1).filter((a) => Pe(a) && it(a) !== "body"), l = null;
  const r = Ie(t).position === "fixed";
  let d = r ? We(t) : t;
  for (; Pe(d) && !st(d); ) {
    const a = Ie(d), c = un(d);
    !c && a.position === "fixed" && (l = null), (r ? !c && !l : !c && a.position === "static" && !!l && Ma.has(l.position) || _t(d) && !c && ro(t, d)) ? o = o.filter((v) => v !== d) : l = a, d = We(d);
  }
  return e.set(t, o), o;
}
function Ia(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: o,
    strategy: l
  } = t;
  const d = [...n === "clippingAncestors" ? Ht(e) ? [] : Pa(e, this._c) : [].concat(n), o], a = d[0], c = d.reduce((u, v) => {
    const p = Dn(e, v, l);
    return u.top = Qe(p.top, u.top), u.right = bt(p.right, u.right), u.bottom = bt(p.bottom, u.bottom), u.left = Qe(p.left, u.left), u;
  }, Dn(e, a, l));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Oa(t) {
  const {
    width: e,
    height: n
  } = io(t);
  return {
    width: e,
    height: n
  };
}
function La(t, e, n) {
  const o = Re(e), l = Ve(e), r = n === "fixed", d = Je(t, !0, r, e);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Le(0);
  function u() {
    c.x = Ut(l);
  }
  if (o || !o && !r)
    if ((it(e) !== "body" || _t(l)) && (a = Nt(e)), o) {
      const y = Je(e, !0, r, e);
      c.x = y.x + e.clientLeft, c.y = y.y + e.clientTop;
    } else l && u();
  r && !o && l && u();
  const v = l && !o && !r ? ao(l, a) : Le(0), p = d.left + a.scrollLeft - c.x - v.x, _ = d.top + a.scrollTop - c.y - v.y;
  return {
    x: p,
    y: _,
    width: d.width,
    height: d.height
  };
}
function Wt(t) {
  return Ie(t).position === "static";
}
function Tn(t, e) {
  if (!Re(t) || Ie(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return Ve(t) === n && (n = n.ownerDocument.body), n;
}
function co(t, e) {
  const n = Se(t);
  if (Ht(t))
    return n;
  if (!Re(t)) {
    let l = We(t);
    for (; l && !st(l); ) {
      if (Pe(l) && !Wt(l))
        return l;
      l = We(l);
    }
    return n;
  }
  let o = Tn(t, e);
  for (; o && ga(o) && Wt(o); )
    o = Tn(o, e);
  return o && st(o) && Wt(o) && !un(o) ? n : o || xa(t) || n;
}
const Ra = async function(t) {
  const e = this.getOffsetParent || co, n = this.getDimensions, o = await n(t.floating);
  return {
    reference: La(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Va(t) {
  return Ie(t).direction === "rtl";
}
const Ba = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Fa,
  getDocumentElement: Ve,
  getClippingRect: Ia,
  getOffsetParent: co,
  getElementRects: Ra,
  getClientRects: Da,
  getDimensions: Oa,
  getScale: et,
  isElement: Pe,
  isRTL: Va
};
function uo(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function za(t, e) {
  let n = null, o;
  const l = Ve(t);
  function r() {
    var a;
    clearTimeout(o), (a = n) == null || a.disconnect(), n = null;
  }
  function d(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), r();
    const u = t.getBoundingClientRect(), {
      left: v,
      top: p,
      width: _,
      height: y
    } = u;
    if (a || e(), !_ || !y)
      return;
    const F = gt(p), T = gt(l.clientWidth - (v + _)), h = gt(l.clientHeight - (p + y)), g = gt(v), $ = {
      rootMargin: -F + "px " + -T + "px " + -h + "px " + -g + "px",
      threshold: Qe(0, bt(1, c)) || 1
    };
    let x = !0;
    function C(z) {
      const P = z[0].intersectionRatio;
      if (P !== c) {
        if (!x)
          return d();
        P ? d(!1, P) : o = setTimeout(() => {
          d(!1, 1e-7);
        }, 1e3);
      }
      P === 1 && !uo(u, t.getBoundingClientRect()) && d(), x = !1;
    }
    try {
      n = new IntersectionObserver(C, {
        ...$,
        // Handle <iframe>s
        root: l.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(C, $);
    }
    n.observe(t);
  }
  return d(!0), r;
}
function fo(t, e, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: l = !0,
    ancestorResize: r = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = o, u = vn(t), v = l || r ? [...u ? ct(u) : [], ...ct(e)] : [];
  v.forEach((g) => {
    l && g.addEventListener("scroll", n, {
      passive: !0
    }), r && g.addEventListener("resize", n);
  });
  const p = u && a ? za(u, n) : null;
  let _ = -1, y = null;
  d && (y = new ResizeObserver((g) => {
    let [m] = g;
    m && m.target === u && y && (y.unobserve(e), cancelAnimationFrame(_), _ = requestAnimationFrame(() => {
      var $;
      ($ = y) == null || $.observe(e);
    })), n();
  }), u && !c && y.observe(u), y.observe(e));
  let F, T = c ? Je(t) : null;
  c && h();
  function h() {
    const g = Je(t);
    T && !uo(T, g) && n(), T = g, F = requestAnimationFrame(h);
  }
  return n(), () => {
    var g;
    v.forEach((m) => {
      l && m.removeEventListener("scroll", n), r && m.removeEventListener("resize", n);
    }), p?.(), (g = y) == null || g.disconnect(), y = null, c && cancelAnimationFrame(F);
  };
}
const Ct = _a, St = pa, Ft = ua, Dt = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), l = {
    platform: Ba,
    ...n
  }, r = {
    ...l.platform,
    _c: o
  };
  return ca(t, e, {
    ...l,
    platform: r
  });
}, Ha = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Na(t, e) {
  return f(), w("svg", Ha, [...e[0] || (e[0] = [
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
const vo = { render: Na }, Ua = ["disabled", "title"], Ka = ["data-theme"], ja = { class: "vuefinder__search-modal__dropdown-content" }, qa = { class: "vuefinder__search-modal__dropdown-section" }, Wa = { class: "vuefinder__search-modal__dropdown-title" }, Ga = { class: "vuefinder__search-modal__dropdown-options" }, Ya = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Qa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Xa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ja = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Za = /* @__PURE__ */ J({
  name: "SearchOptionsDropdown",
  __name: "SearchOptionsDropdown",
  props: {
    visible: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    sizeFilter: {},
    selectedOption: {}
  },
  emits: ["update:visible", "update:sizeFilter", "update:selectedOption", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const o = t, l = n, r = Z(), { t: d } = r.i18n, a = E(null), c = E(null);
    let u = null;
    const v = (T) => {
      if (l("update:selectedOption", T), T.startsWith("size-")) {
        const h = T.split("-")[1];
        l("update:sizeFilter", h);
      }
    }, p = async () => {
      o.disabled || (o.visible ? (l("update:visible", !1), u && (u(), u = null)) : (l("update:visible", !0), await Ae(), await _()));
    }, _ = async () => {
      if (!(!a.value || !c.value) && (await Ae(), !(!a.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: T, y: h } = await Dt(a.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [Ct(8), Ft({ padding: 16 }), St({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${T}px`,
            top: `${h}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (T) {
          console.warn("Floating UI initial positioning error:", T);
          return;
        }
        try {
          u = fo(a.value, c.value, async () => {
            if (!(!a.value || !c.value))
              try {
                const { x: T, y: h } = await Dt(
                  a.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [Ct(8), Ft({ padding: 16 }), St({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${T}px`,
                  top: `${h}px`
                });
              } catch (T) {
                console.warn("Floating UI positioning error:", T);
              }
          });
        } catch (T) {
          console.warn("Floating UI autoUpdate setup error:", T), u = null;
        }
      }
    }, y = (T) => {
      if (!o.visible) return;
      const h = ["size-all", "size-small", "size-medium", "size-large"], g = h.findIndex((m) => m === o.selectedOption);
      if (T.key === "ArrowDown") {
        T.preventDefault();
        const m = (g + 1) % h.length;
        l("update:selectedOption", h[m] || null);
      } else if (T.key === "ArrowUp") {
        T.preventDefault();
        const m = g <= 0 ? h.length - 1 : g - 1;
        l("update:selectedOption", h[m] || null);
      } else T.key === "Enter" ? (T.preventDefault(), o.selectedOption?.startsWith("size-") && l(
        "update:sizeFilter",
        o.selectedOption.split("-")[1]
      )) : T.key === "Escape" && (T.preventDefault(), l("update:visible", !1), u && (u(), u = null));
    }, F = () => {
      u && (u(), u = null);
    };
    return re(
      () => o.visible,
      (T) => {
        !T && u && (u(), u = null);
      }
    ), ke(() => {
      F();
    }), e({
      cleanup: F
    }), (T, h) => (f(), w(ce, null, [
      s("button", {
        ref_key: "dropdownBtn",
        ref: a,
        class: G(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": t.visible }]),
        disabled: t.disabled,
        title: i(d)("Search Options"),
        onClick: de(p, ["stop"])
      }, [
        L(i(vo), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Ua),
      (f(), R(Et, { to: "body" }, [
        t.visible ? (f(), w("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": i(r).theme.current,
          tabindex: "-1",
          onClick: h[4] || (h[4] = de(() => {
          }, ["stop"])),
          onKeydown: y
        }, [
          s("div", ja, [
            s("div", qa, [
              s("div", Wa, b(i(d)("File Size")), 1),
              s("div", Ga, [
                s("div", {
                  class: G(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "all"
                  }]),
                  onClick: h[0] || (h[0] = de((g) => v("size-all"), ["stop"]))
                }, [
                  s("span", null, b(i(d)("All Files")), 1),
                  t.sizeFilter === "all" ? (f(), w("div", Ya, [...h[5] || (h[5] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2),
                s("div", {
                  class: G(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "small"
                  }]),
                  onClick: h[1] || (h[1] = de((g) => v("size-small"), ["stop"]))
                }, [
                  s("span", null, b(i(d)("Small (< 1MB)")), 1),
                  t.sizeFilter === "small" ? (f(), w("div", Qa, [...h[6] || (h[6] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2),
                s("div", {
                  class: G(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "medium"
                  }]),
                  onClick: h[2] || (h[2] = de((g) => v("size-medium"), ["stop"]))
                }, [
                  s("span", null, b(i(d)("Medium (1-10MB)")), 1),
                  t.sizeFilter === "medium" ? (f(), w("div", Xa, [...h[7] || (h[7] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2),
                s("div", {
                  class: G(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "large"
                  }]),
                  onClick: h[3] || (h[3] = de((g) => v("size-large"), ["stop"]))
                }, [
                  s("span", null, b(i(d)("Large (> 10MB)")), 1),
                  t.sizeFilter === "large" ? (f(), w("div", Ja, [...h[8] || (h[8] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, Ka)) : A("", !0)
      ]))
    ], 64));
  }
});
function er(t) {
  const [e, n] = tr(t);
  if (!n || n === "/") return e + "://";
  const o = n.replace(/\/+$/, ""), l = o.lastIndexOf("/");
  return l === 0 ? e + "://" : e + ":/" + o.slice(0, l);
}
function tr(t) {
  const e = t.indexOf(":/");
  return e === -1 ? [void 0, t] : [t.slice(0, e), t.slice(e + 2) || "/"];
}
function _o(t, e = 40) {
  const n = t.match(/^([^:]+:\/\/)(.*)$/);
  if (!n) return t;
  const o = n[1], l = n[2] ?? "", r = l.split("/").filter(Boolean), d = r.pop();
  if (!d) return o + l;
  let a = `${o}${r.join("/")}${r.length ? "/" : ""}${d}`;
  if (a.length <= e) return a;
  const c = d.split(/\.(?=[^\.]+$)/), u = c[0] ?? "", v = c[1] ?? "", p = u.length > 10 ? `${u.slice(0, 6)}...${u.slice(-5)}` : u, _ = v ? `${p}.${v}` : p;
  return a = `${o}${r.join("/")}${r.length ? "/" : ""}${_}`, a.length > e && (a = `${o}.../${_}`), a;
}
async function po(t) {
  try {
    await navigator.clipboard.writeText(t);
  } catch {
    const e = document.createElement("textarea");
    e.value = t, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function ut(t) {
  await po(t);
}
async function nr(t) {
  await po(t);
}
const or = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function sr(t, e) {
  return f(), w("svg", or, [...e[0] || (e[0] = [
    s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const mo = { render: sr }, ir = ["title"], lr = { class: "vuefinder__search-modal__result-icon" }, ar = { class: "vuefinder__search-modal__result-content" }, rr = { class: "vuefinder__search-modal__result-name" }, dr = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, cr = ["title"], ur = ["title"], fr = ["data-item-dropdown", "data-theme"], vr = { class: "vuefinder__search-modal__item-dropdown-content" }, _r = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, o = e, l = Z(), { t: r } = l.i18n, d = E(null);
    let a = null;
    re(
      () => n.activeDropdown,
      (g) => {
        a && (a(), a = null), g === n.item.path && d.value && Ae(() => {
          p(n.item.path, d.value);
        });
      }
    ), ke(() => {
      a && (a(), a = null);
    });
    const c = (g) => n.expandedPaths.has(g), u = (g) => g.type === "dir" || !g.file_size ? "" : nn(g.file_size), v = (g, m) => {
      m.stopPropagation(), o("toggleItemDropdown", g, m);
    }, p = async (g, m) => {
      const $ = document.querySelector(
        `[data-item-dropdown="${g}"]`
      );
      if (!(!$ || !m) && (await Ae(), !(!$ || !m))) {
        Object.assign($.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x, y: C } = await Dt(m, $, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [Ct(8), Ft({ padding: 16 }), St({ padding: 16 })]
          });
          Object.assign($.style, {
            left: `${x}px`,
            top: `${C}px`
          }), requestAnimationFrame(() => {
            $ && Object.assign($.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (x) {
          console.warn("Floating UI initial positioning error:", x);
          return;
        }
        try {
          a = fo(m, $, async () => {
            if (!(!m || !$))
              try {
                const { x, y: C } = await Dt(m, $, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [Ct(8), Ft({ padding: 16 }), St({ padding: 16 })]
                });
                Object.assign($.style, {
                  left: `${x}px`,
                  top: `${C}px`
                });
              } catch (x) {
                console.warn("Floating UI positioning error:", x);
              }
          });
        } catch (x) {
          console.warn("Floating UI autoUpdate setup error:", x), a = null;
        }
      }
    }, _ = (g) => {
      o("update:selectedItemDropdownOption", g);
    }, y = async (g) => {
      await ut(g.path), o("copyPath", g);
    }, F = (g) => {
      o("openContainingFolder", g);
    }, T = (g) => {
      o("preview", g);
    }, h = (g) => {
      if (!n.activeDropdown) return;
      const m = ["copy-path", "open-folder", "preview"], $ = n.selectedItemDropdownOption, x = m.findIndex((C) => $?.includes(C));
      if (g.key === "ArrowDown") {
        g.preventDefault();
        const C = (x + 1) % m.length;
        o(
          "update:selectedItemDropdownOption",
          `${m[C] || ""}-${n.activeDropdown}`
        );
      } else if (g.key === "ArrowUp") {
        g.preventDefault();
        const C = x <= 0 ? m.length - 1 : x - 1;
        o(
          "update:selectedItemDropdownOption",
          `${m[C] || ""}-${n.activeDropdown}`
        );
      } else g.key === "Enter" ? (g.preventDefault(), $ && ($.includes("copy-path") ? y(n.item) : $.includes("open-folder") ? F(n.item) : $.includes("preview") && T(n.item))) : g.key === "Escape" && (g.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return (g, m) => (f(), w("div", {
      class: G(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": t.index === t.selectedIndex }]),
      title: t.item.basename,
      onClick: m[9] || (m[9] = ($) => o("select", t.index))
    }, [
      s("div", lr, [
        t.item.type === "dir" ? (f(), R(i(Ne), { key: 0 })) : (f(), R(i(yt), { key: 1 }))
      ]),
      s("div", ar, [
        s("div", rr, [
          se(b(t.item.basename) + " ", 1),
          u(t.item) ? (f(), w("span", dr, b(u(t.item)), 1)) : A("", !0)
        ]),
        s("div", {
          class: "vuefinder__search-modal__result-path",
          title: t.item.path,
          onClick: m[0] || (m[0] = de(($) => {
            o("select", t.index), o("togglePathExpansion", t.item.path);
          }, ["stop"]))
        }, b(c(t.item.path) ? t.item.path : i(_o)(t.item.path)), 9, cr)
      ]),
      s("button", {
        ref_key: "buttonElementRef",
        ref: d,
        class: "vuefinder__search-modal__result-actions",
        title: i(r)("More actions"),
        onClick: m[1] || (m[1] = ($) => {
          o("selectWithDropdown", t.index), v(t.item.path, $);
        })
      }, [
        L(i(mo), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, ur),
      (f(), R(Et, { to: "body" }, [
        t.activeDropdown === t.item.path ? (f(), w("div", {
          key: 0,
          "data-item-dropdown": t.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": i(l).theme.current,
          tabindex: "-1",
          onClick: m[8] || (m[8] = de(() => {
          }, ["stop"])),
          onKeydown: h
        }, [
          s("div", vr, [
            s("div", {
              class: G(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `copy-path-${t.item.path}`
              }]),
              onClick: m[2] || (m[2] = ($) => {
                _(`copy-path-${t.item.path}`), y(t.item);
              }),
              onFocus: m[3] || (m[3] = ($) => _(`copy-path-${t.item.path}`))
            }, [
              m[10] || (m[10] = s("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                s("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                s("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              s("span", null, b(i(r)("Copy Path")), 1)
            ], 34),
            s("div", {
              class: G(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `open-folder-${t.item.path}`
              }]),
              onClick: m[4] || (m[4] = ($) => {
                _(`open-folder-${t.item.path}`), F(t.item);
              }),
              onFocus: m[5] || (m[5] = ($) => _(`open-folder-${t.item.path}`))
            }, [
              L(i(Ne), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, b(i(r)("Open Containing Folder")), 1)
            ], 34),
            s("div", {
              class: G(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `preview-${t.item.path}`
              }]),
              onClick: m[6] || (m[6] = ($) => {
                _(`preview-${t.item.path}`), T(t.item);
              }),
              onFocus: m[7] || (m[7] = ($) => _(`preview-${t.item.path}`))
            }, [
              L(i(yt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, b(i(r)("Preview")), 1)
            ], 34)
          ])
        ], 40, fr)) : A("", !0)
      ]))
    ], 10, ir));
  }
}), pr = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, mr = { class: "vuefinder__search-modal__loading-icon" }, hr = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, gr = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, wr = { class: "vuefinder__search-modal__results-header" }, Ye = 60, En = 5, yr = /* @__PURE__ */ J({
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
  setup(t, { expose: e, emit: n }) {
    const o = t, l = n, r = Z(), { t: d } = r.i18n, a = Ke("scrollableContainer"), c = K(() => o.searchResults.length > 0), u = K(() => o.searchResults.length), v = E(0), p = E(600), _ = K(() => o.searchResults.length * Ye), y = K(() => {
      const $ = Math.max(0, Math.floor(v.value / Ye) - En), x = Math.min(
        o.searchResults.length,
        Math.ceil((v.value + p.value) / Ye) + En
      );
      return { start: $, end: x };
    }), F = K(() => {
      const { start: $, end: x } = y.value;
      return o.searchResults.slice($, x).map((C, z) => ({
        item: C,
        index: $ + z,
        top: ($ + z) * Ye
      }));
    }), T = ($) => {
      const x = $.target;
      v.value = x.scrollTop;
    }, h = () => {
      a.value && (p.value = a.value.clientHeight);
    }, g = () => {
      if (o.selectedIndex >= 0 && a.value) {
        const $ = o.selectedIndex * Ye, x = $ + Ye, C = a.value.scrollTop, z = a.value.clientHeight, P = C + z;
        let q = C;
        $ < C ? q = $ : x > P && (q = x - z), q !== C && a.value.scrollTo({
          top: q,
          behavior: "smooth"
        });
      }
    }, m = () => {
      a.value && (a.value.scrollTop = 0, v.value = 0);
    };
    return ve(() => {
      h(), window.addEventListener("resize", h);
    }), ke(() => {
      window.removeEventListener("resize", h);
    }), re(
      () => a.value,
      () => {
        h();
      }
    ), e({
      scrollSelectedIntoView: g,
      resetScroll: m,
      getContainerHeight: () => p.value,
      scrollTop: () => v.value
    }), ($, x) => (f(), w("div", {
      class: G(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": t.resultsEnter }])
    }, [
      t.isSearching ? (f(), w("div", pr, [
        s("div", mr, [
          L(i(Rt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        s("span", null, b(i(d)("Searching...")), 1)
      ])) : c.value ? (f(), w("div", gr, [
        s("div", wr, [
          s("span", null, b(i(d)("Found %s results", u.value)), 1)
        ]),
        s("div", {
          ref_key: "scrollableContainer",
          ref: a,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: T
        }, [
          s("div", {
            class: "vuefinder__search-modal__results-items",
            style: He({ height: `${_.value}px`, position: "relative" })
          }, [
            (f(!0), w(ce, null, _e(F.value, (C) => (f(), w("div", {
              key: C.item.path,
              style: He({
                position: "absolute",
                top: `${C.top}px`,
                left: "0",
                width: "100%",
                height: `${Ye}px`
              })
            }, [
              L(_r, {
                item: C.item,
                index: C.index,
                "selected-index": t.selectedIndex,
                "expanded-paths": t.expandedPaths,
                "active-dropdown": t.activeDropdown,
                "selected-item-dropdown-option": t.selectedItemDropdownOption,
                onSelect: x[0] || (x[0] = (z) => l("selectResultItem", z)),
                onSelectWithDropdown: x[1] || (x[1] = (z) => l("selectResultItemWithDropdown", z)),
                onTogglePathExpansion: x[2] || (x[2] = (z) => l("togglePathExpansion", z)),
                onToggleItemDropdown: x[3] || (x[3] = (z, P) => l("toggleItemDropdown", z, P)),
                "onUpdate:selectedItemDropdownOption": x[4] || (x[4] = (z) => l("update:selectedItemDropdownOption", z)),
                onCopyPath: x[5] || (x[5] = (z) => l("copyPath", z)),
                onOpenContainingFolder: x[6] || (x[6] = (z) => l("openContainingFolder", z)),
                onPreview: x[7] || (x[7] = (z) => l("preview", z))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (f(), w("div", hr, [
        s("span", null, b(i(d)("No results found")), 1)
      ]))
    ], 2));
  }
}), br = { class: "vuefinder__search-modal" }, kr = { class: "vuefinder__search-modal__content" }, xr = { class: "vuefinder__search-modal__search-bar" }, $r = { class: "vuefinder__search-modal__search-location" }, Cr = ["title"], Sr = ["disabled"], Fr = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, Dr = { class: "vuefinder__search-modal__folder-selector-content" }, Tr = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, Er = { class: "vuefinder__search-modal__instructions-text" }, _n = /* @__PURE__ */ J({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, l = E(null), r = E(null), d = E(null), a = Jn("", 300), c = E([]), u = E(!1), v = E(-1), p = E(!1), _ = E(!1), y = E(null), F = E("all"), T = E(!1), h = E(`size-${F.value}`), g = E(null), m = E(/* @__PURE__ */ new Set()), $ = E(null), x = j(o.path), C = (k) => {
      m.value.has(k) ? m.value.delete(k) : m.value.add(k);
    }, z = (k, D) => {
      D && typeof D.stopPropagation == "function" && D.stopPropagation(), $.value === k ? $.value = null : $.value = k;
    }, P = () => {
      $.value = null;
    }, q = (k) => {
      try {
        const D = k.dir || `${k.storage}://`;
        e.adapter.open(D), e.modal.close(), P();
      } catch {
        e.emitter.emit("vf-toast-push", { label: n("Failed to open containing folder") });
      }
    }, I = (k) => {
      e.modal.open(It, {
        storage: x?.value?.storage ?? "local",
        item: k
      }), P();
    }, H = (k) => {
      v.value = k, P();
    }, te = (k) => {
      v.value = k;
    }, ae = async (k) => {
      await ut(k.path), P();
    };
    re(a, async (k) => {
      k.trim() ? (await ee(k.trim()), v.value = 0) : (c.value = [], u.value = !1, v.value = -1);
    }), re(F, async (k) => {
      h.value = `size-${k}`, a.value.trim() && !_.value && (await ee(a.value.trim()), v.value = 0);
    }), re(T, async () => {
      a.value.trim() && !_.value && (await ee(a.value.trim()), v.value = 0);
    });
    const ee = async (k) => {
      if (k) {
        u.value = !0;
        try {
          const D = y.value?.path || x?.value?.path, M = await e.adapter.search({
            path: D,
            filter: k,
            deep: T.value,
            size: F.value
          });
          c.value = M || [], u.value = !1;
        } catch (D) {
          console.error("Search error:", D), c.value = [], u.value = !1;
        }
      }
    };
    ve(() => {
      document.addEventListener("click", S), h.value = `size-${F.value}`, Ae(() => {
        l.value && l.value.focus();
      });
    });
    const ie = () => {
      _.value ? (_.value = !1, a.value.trim() && (ee(a.value.trim()), v.value = 0)) : (p.value = !1, _.value = !0);
    }, ue = (k) => {
      k && (y.value = k);
    }, Y = (k) => {
      k && (ue(k), _.value = !1, a.value.trim() && (ee(a.value.trim()), v.value = 0));
    };
    ke(() => {
      document.removeEventListener("click", S), r.value && r.value.cleanup();
    });
    const S = (k) => {
      const D = k.target;
      if (p.value && (D.closest(".vuefinder__search-modal__dropdown") || (p.value = !1, Ae(() => {
        l.value && l.value.focus();
      }))), $.value) {
        const M = D.closest(".vuefinder__search-modal__item-dropdown"), N = D.closest(".vuefinder__search-modal__result-item");
        !M && !N && P();
      }
    };
    return (k, D) => (f(), R(De, { class: "vuefinder__search-modal-layout" }, {
      default: X(() => [
        s("div", br, [
          L(Ee, {
            icon: i(cn),
            title: i(n)("Search files")
          }, null, 8, ["icon", "title"]),
          s("div", kr, [
            s("div", xr, [
              L(Jl, {
                ref_key: "searchInputRef",
                ref: l,
                modelValue: i(a),
                "onUpdate:modelValue": D[0] || (D[0] = (M) => Eo(a) ? a.value = M : null),
                "is-searching": u.value,
                disabled: _.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              L(Za, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: p.value,
                "onUpdate:visible": D[1] || (D[1] = (M) => p.value = M),
                "size-filter": F.value,
                "onUpdate:sizeFilter": D[2] || (D[2] = (M) => F.value = M),
                "selected-option": h.value,
                "onUpdate:selectedOption": D[3] || (D[3] = (M) => h.value = M),
                disabled: _.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            s("div", {
              class: "vuefinder__search-modal__options",
              onClick: D[7] || (D[7] = de(() => {
              }, ["stop"]))
            }, [
              s("div", $r, [
                s("button", {
                  class: G(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": _.value }]),
                  onClick: de(ie, ["stop"])
                }, [
                  L(i(Ne), { class: "vuefinder__search-modal__location-icon" }),
                  s("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: y.value?.path || i(x).path
                  }, b(i(_o)(y.value?.path || i(x).path)), 9, Cr),
                  D[10] || (D[10] = s("svg", {
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
                onClick: D[6] || (D[6] = de(() => {
                }, ["stop"]))
              }, [
                pe(s("input", {
                  "onUpdate:modelValue": D[4] || (D[4] = (M) => T.value = M),
                  type: "checkbox",
                  disabled: _.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: D[5] || (D[5] = de(() => {
                  }, ["stop"]))
                }, null, 8, Sr), [
                  [en, T.value]
                ]),
                s("span", null, b(i(n)("Include subfolders")), 1)
              ])
            ]),
            _.value ? (f(), w("div", Fr, [
              s("div", Dr, [
                L(rn, {
                  modelValue: y.value,
                  "onUpdate:modelValue": [
                    D[8] || (D[8] = (M) => y.value = M),
                    ue
                  ],
                  "show-pinned-folders": !0,
                  "current-path": i(x),
                  onSelectAndClose: Y
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : A("", !0),
            !i(a).trim() && !_.value ? (f(), w("div", Tr, [
              s("p", Er, b(i(n)("Search helper text")), 1)
            ])) : A("", !0),
            i(a).trim() && !_.value ? (f(), R(yr, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": c.value,
              "is-searching": u.value,
              "selected-index": v.value,
              "expanded-paths": m.value,
              "active-dropdown": $.value,
              "selected-item-dropdown-option": g.value,
              "results-enter": !0,
              onSelectResultItem: H,
              onSelectResultItemWithDropdown: te,
              onTogglePathExpansion: C,
              onToggleItemDropdown: z,
              "onUpdate:selectedItemDropdownOption": D[9] || (D[9] = (M) => g.value = M),
              onCopyPath: ae,
              onOpenContainingFolder: q,
              onPreview: I
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : A("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Mr = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const o = Z(), l = E(!1), { t: r } = o.i18n;
    let d = null;
    const a = () => {
      d && clearTimeout(d), l.value = !0, d = setTimeout(() => {
        l.value = !1;
      }, 2e3);
    };
    return ve(() => {
      o.emitter.on(t.on, a);
    }), ke(() => {
      d && clearTimeout(d);
    }), {
      shown: l,
      t: r
    };
  }
}, Ar = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, l] of e)
    n[o] = l;
  return n;
}, Pr = { key: 1 };
function Ir(t, e, n, o, l, r) {
  return f(), w("div", {
    class: G(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Fe(t.$slots, "default", { key: 0 }) : (f(), w("span", Pr, b(o.t("Saved.")), 1))
  ], 2);
}
const at = /* @__PURE__ */ Ar(Mr, [["render", Ir]]), Or = [
  { name: "light", displayName: "Light" },
  { name: "dark", displayName: "Dark" },
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
], Lr = { class: "vuefinder__about-modal__content" }, Rr = { class: "vuefinder__about-modal__main" }, Vr = { class: "vuefinder__about-modal__description" }, Br = { class: "vuefinder__about-modal__settings" }, zr = { class: "vuefinder__about-modal__settings__fieldset" }, Hr = { class: "vuefinder__about-modal__settings__section-title" }, Nr = { class: "vuefinder__about-modal__setting" }, Ur = { class: "vuefinder__about-modal__setting-label" }, Kr = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, jr = { class: "vuefinder__about-modal__setting-input justify-end" }, qr = ["checked"], Wr = { class: "vuefinder__about-modal__setting" }, Gr = { class: "vuefinder__about-modal__setting-label" }, Yr = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Qr = { class: "vuefinder__about-modal__setting-input justify-end" }, Xr = ["checked"], Jr = { class: "vuefinder__about-modal__setting" }, Zr = { class: "vuefinder__about-modal__setting-label" }, ed = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, td = { class: "vuefinder__about-modal__setting-input justify-end" }, nd = ["checked"], od = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, sd = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, id = { class: "vuefinder__about-modal__setting-input justify-end" }, ld = ["value"], ad = ["label"], rd = ["value"], dd = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, cd = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, ud = { class: "vuefinder__about-modal__setting-input justify-end" }, fd = ["label"], vd = ["value"], _d = { class: "vuefinder__about-modal__tab-content" }, pd = { class: "vuefinder__about-modal__settings__section-title" }, md = { class: "vuefinder__about-modal__description" }, ho = /* @__PURE__ */ J({
  __name: "ModalSettings",
  setup(t) {
    const e = Z(), { enabled: n } = Oe(), o = e.config, { clearStore: l } = e.storage, { t: r } = e.i18n, d = j(o.state), a = K(() => d.value.theme || "light"), c = async () => {
      o.reset(), l(), location.reload();
    }, u = (h) => {
      o.set("theme", h), e.emitter.emit("vf-theme-saved");
    }, v = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? Un : nn, e.emitter.emit("vf-metric-units-saved");
    }, p = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, _ = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: y } = wt("VueFinderOptions"), T = Object.fromEntries(
      Object.entries({
        ar: "Arabic (العربيّة)",
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        fa: "Persian (فارسی)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        pl: "Polish (Polski)",
        ru: "Russian (Pусский)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)",
        nl: "Dutch (Nederlands)",
        zhCN: "Simplified Chinese (简体中文)",
        zhTW: "Traditional Chinese (繁體中文)"
      }).filter(([h]) => Object.keys(y).includes(h))
    );
    return (h, g) => (f(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[2] || (g[2] = (m) => i(e).modal.close())
        }, b(i(r)("Close")), 1)
      ]),
      default: X(() => [
        s("div", Lr, [
          L(Ee, {
            icon: i(vo),
            title: i(r)("Settings")
          }, null, 8, ["icon", "title"]),
          s("div", Rr, [
            s("div", Vr, b(i(r)("Customize your experience with the following settings")), 1),
            s("div", Br, [
              s("fieldset", zr, [
                s("div", Hr, b(i(r)("General")), 1),
                s("div", Nr, [
                  s("div", Ur, [
                    s("label", Kr, b(i(r)("Use Metric Units")), 1)
                  ]),
                  s("div", jr, [
                    s("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: i(o).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: v
                    }, null, 40, qr),
                    L(at, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: X(() => [
                        se(b(i(r)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s("div", Wr, [
                  s("div", Gr, [
                    s("label", Yr, b(i(r)("Compact list view")), 1)
                  ]),
                  s("div", Qr, [
                    s("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: i(o).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: p
                    }, null, 40, Xr),
                    L(at, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: X(() => [
                        se(b(i(r)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s("div", Jr, [
                  s("div", Zr, [
                    s("label", ed, b(i(r)("Persist path on reload")), 1)
                  ]),
                  s("div", td, [
                    s("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: i(o).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: _
                    }, null, 40, nd),
                    L(at, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: X(() => [
                        se(b(i(r)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i(n)("theme") ? (f(), w("div", od, b(i(r)("Theme")), 1)) : A("", !0),
                i(n)("theme") ? (f(), w("div", sd, [
                  s("div", id, [
                    s("select", {
                      id: "theme",
                      value: a.value,
                      class: "vuefinder__about-modal__select",
                      onChange: g[0] || (g[0] = (m) => u(m.target?.value))
                    }, [
                      s("optgroup", {
                        label: i(r)("Theme")
                      }, [
                        (f(!0), w(ce, null, _e(i(Or), (m) => (f(), w("option", {
                          key: m.name,
                          value: m.name
                        }, b(m.displayName), 9, rd))), 128))
                      ], 8, ad)
                    ], 40, ld),
                    L(at, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: X(() => [
                        se(b(i(r)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : A("", !0),
                i(n)("language") && Object.keys(i(T)).length > 1 ? (f(), w("div", dd, b(i(r)("Language")), 1)) : A("", !0),
                i(n)("language") && Object.keys(i(T)).length > 1 ? (f(), w("div", cd, [
                  s("div", ud, [
                    pe(s("select", {
                      id: "language",
                      "onUpdate:modelValue": g[1] || (g[1] = (m) => i(e).i18n.locale = m),
                      class: "vuefinder__about-modal__select"
                    }, [
                      s("optgroup", {
                        label: i(r)("Language")
                      }, [
                        (f(!0), w(ce, null, _e(i(T), (m, $) => (f(), w("option", {
                          key: $,
                          value: $
                        }, b(m), 9, vd))), 128))
                      ], 8, fd)
                    ], 512), [
                      [Yt, i(e).i18n.locale]
                    ]),
                    L(at, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: X(() => [
                        se(b(i(r)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : A("", !0)
              ])
            ]),
            s("div", _d, [
              s("div", pd, b(i(r)("Reset")), 1),
              s("div", md, b(i(r)("Reset all settings to default")), 1),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                onClick: c
              }, b(i(r)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), be = {
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
function hd() {
  const t = Z(), e = t.fs, n = t.config, { enabled: o } = Oe(), l = j(e.path), r = j(e.selectedItems), d = (a) => {
    if (a.code === be.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible) {
      if (a.metaKey && a.code === be.KEY_R && !a.shiftKey && (t.adapter.invalidateListQuery(l.value.path), t.adapter.open(l.value.path), a.preventDefault()), a.metaKey && a.shiftKey && a.code === be.KEY_R && o("rename") && r.value.length === 1 && (t.modal.open(Pt, { items: r.value }), a.preventDefault()), a.code === be.DELETE && r.value.length !== 0 && t.modal.open(At, { items: r.value }), a.metaKey && a.code === be.BACKSLASH && t.modal.open(Wn), a.metaKey && a.code === be.KEY_F && o("search") && (t.modal.open(_n), a.preventDefault()), a.metaKey && a.code === be.KEY_E && (n.toggle("showTreeView"), a.preventDefault()), a.metaKey && a.code === be.KEY_S && (t.modal.open(ho), a.preventDefault()), a.metaKey && a.code === be.ENTER && (n.toggle("fullScreen"), t.root.focus()), a.metaKey && a.code === be.KEY_A && (e.selectAll(t.selectionMode || "multiple", t), a.preventDefault()), a.code === be.SPACE && r.value.length === 1 && r.value[0]?.type !== "dir" && t.modal.open(It, {
        storage: e.path.get().storage,
        item: r.value[0]
      }), a.metaKey && a.code === be.KEY_C && o("copy")) {
        if (r.value.length === 0) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("No items selected")
          });
          return;
        }
        e.setClipboard("copy", new Set(r.value.map((c) => c.path))), t.emitter.emit("vf-toast-push", {
          label: r.value.length === 1 ? t.i18n.t("Item copied to clipboard") : t.i18n.t("%s items copied to clipboard", r.value.length)
        }), a.preventDefault();
      }
      if (a.metaKey && a.code === be.KEY_X && o("copy")) {
        if (r.value.length === 0) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("No items selected")
          });
          return;
        }
        e.setClipboard("cut", new Set(r.value.map((c) => c.path))), t.emitter.emit("vf-toast-push", {
          label: r.value.length === 1 ? t.i18n.t("Item cut to clipboard") : t.i18n.t("%s items cut to clipboard", r.value.length)
        }), a.preventDefault();
      }
      if (a.metaKey && a.code === be.KEY_V && o("copy")) {
        if (e.getClipboard().items.size === 0) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("No items in clipboard")
          });
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("Cannot paste items to the same directory")
          });
          return;
        }
        if (e.getClipboard().type === "cut") {
          t.modal.open(ot, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          t.modal.open(dn, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        a.preventDefault();
      }
    }
  };
  ve(async () => {
    if (await Ae(), !t.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    t.root.addEventListener("keydown", d);
  }), Vn(() => {
    t.root && t.root.removeEventListener("keydown", d);
  });
}
function gd() {
  const t = E(!1), e = E([]);
  return {
    isDraggingExternal: t,
    externalFiles: e,
    handleDragEnter: (a) => {
      a.preventDefault(), a.stopPropagation();
      const c = a.dataTransfer?.items;
      c && Array.from(c).some((v) => v.kind === "file") && (t.value = !0, a.isExternalDrag = !0);
    },
    handleDragOver: (a) => {
      t.value && a.dataTransfer && (a.dataTransfer.dropEffect = "copy", a.preventDefault(), a.stopPropagation());
    },
    handleDragLeave: (a) => {
      a.preventDefault();
      const c = a.currentTarget.getBoundingClientRect(), u = a.clientX, v = a.clientY;
      (u < c.left || u > c.right || v < c.top || v > c.bottom) && (t.value = !1);
    },
    handleDrop: async (a) => {
      a.preventDefault(), a.stopPropagation(), t.value = !1;
      const c = a.dataTransfer?.items;
      if (c) {
        const u = Array.from(c).filter((v) => v.kind === "file");
        if (u.length > 0) {
          e.value = [];
          for (const v of u) {
            const p = v.webkitGetAsEntry?.();
            if (p)
              await on((_, y) => {
                e.value.push({
                  name: y.name,
                  size: y.size,
                  type: y.type,
                  lastModified: new Date(y.lastModified),
                  file: y
                });
              }, p);
            else {
              const _ = v.getAsFile();
              _ && e.value.push({
                name: _.name,
                size: _.size,
                type: _.type,
                lastModified: new Date(_.lastModified),
                file: _
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
const wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function yd(t, e) {
  return f(), w("svg", wd, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const go = { render: yd }, bd = { class: "vuefinder__new-folder-modal__content" }, kd = { class: "vuefinder__new-folder-modal__form" }, xd = { class: "vuefinder__new-folder-modal__description" }, $d = ["placeholder"], pn = /* @__PURE__ */ J({
  __name: "ModalNewFolder",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, l = j(o.path), r = E(""), d = E(""), a = () => {
      r.value !== "" && e.adapter.createFolder({
        path: l.value.path,
        name: r.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, u) => (f(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: a
        }, b(i(n)("Create")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[2] || (u[2] = (v) => i(e).modal.close())
        }, b(i(n)("Cancel")), 1)
      ]),
      default: X(() => [
        s("div", null, [
          L(Ee, {
            icon: i(go),
            title: i(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", bd, [
            s("div", kd, [
              s("p", xd, b(i(n)("Create a new folder")), 1),
              pe(s("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (v) => r.value = v),
                class: "vuefinder__new-folder-modal__input",
                placeholder: i(n)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: ft(a, ["enter"])
              }, null, 40, $d), [
                [vt, r.value]
              ]),
              d.value.length ? (f(), R(i(d), {
                key: 0,
                error: "",
                onHidden: u[1] || (u[1] = (v) => d.value = "")
              }, {
                default: X(() => [
                  se(b(d.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Cd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Sd(t, e) {
  return f(), w("svg", Cd, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const wo = { render: Sd }, Fd = { class: "vuefinder__new-file-modal__content" }, Dd = { class: "vuefinder__new-file-modal__form" }, Td = { class: "vuefinder__new-file-modal__description" }, Ed = ["placeholder"], yo = /* @__PURE__ */ J({
  __name: "ModalNewFile",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, l = j(o.path), r = E(""), d = E(""), a = () => {
      r.value !== "" && e.adapter.createFile({
        path: l.value.path,
        name: r.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, u) => (f(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: a
        }, b(i(n)("Create")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[2] || (u[2] = (v) => i(e).modal.close())
        }, b(i(n)("Cancel")), 1)
      ]),
      default: X(() => [
        s("div", null, [
          L(Ee, {
            icon: i(wo),
            title: i(n)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", Fd, [
            s("div", Dd, [
              s("p", Td, b(i(n)("Create a new file")), 1),
              pe(s("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (v) => r.value = v),
                class: "vuefinder__new-file-modal__input",
                placeholder: i(n)("File Name"),
                type: "text",
                onKeyup: ft(a, ["enter"])
              }, null, 40, Ed), [
                [vt, r.value]
              ]),
              d.value.length ? (f(), R(i(d), {
                key: 0,
                error: "",
                onHidden: u[1] || (u[1] = (v) => d.value = "")
              }, {
                default: X(() => [
                  se(b(d.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Md = ["title"], Ad = /* @__PURE__ */ J({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, o = Z(), { t: l } = o.i18n, r = E(!1), d = E(null), a = E(d.value?.innerHTML);
    re(a, () => r.value = !1);
    const c = () => {
      n("hidden"), r.value = !0;
    };
    return (u, v) => (f(), w("div", null, [
      r.value ? A("", !0) : (f(), w("div", {
        key: 0,
        ref_key: "strMessage",
        ref: d,
        class: G(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Fe(u.$slots, "default"),
        s("div", {
          class: "vuefinder__message__close",
          title: i(l)("Close"),
          onClick: c
        }, [...v[0] || (v[0] = [
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
        ])], 8, Md)
      ], 2))
    ]));
  }
});
function Zt(t, e = 14) {
  const n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const Pd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Id(t, e) {
  return f(), w("svg", Pd, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const bo = { render: Id }, Od = { class: "vuefinder__upload-modal__content relative" }, Ld = { class: "vuefinder__upload-modal__target-section" }, Rd = { class: "vuefinder__upload-modal__target-label" }, Vd = { class: "vuefinder__upload-modal__target-container" }, Bd = { class: "vuefinder__upload-modal__target-path" }, zd = { class: "vuefinder__upload-modal__target-storage" }, Hd = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Nd = { class: "vuefinder__upload-modal__target-badge" }, Ud = { class: "vuefinder__upload-modal__drag-hint" }, Kd = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, jd = ["textContent"], qd = { class: "vuefinder__upload-modal__file-info" }, Wd = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Gd = { class: "vuefinder__upload-modal__file-name md:hidden" }, Yd = {
  key: 0,
  class: "ml-auto"
}, Qd = ["title", "disabled", "onClick"], Xd = {
  key: 0,
  class: "py-2"
}, Jd = ["aria-expanded"], Zd = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, ec = ["disabled"], tc = ["aria-expanded"], nc = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, mn = /* @__PURE__ */ J({
  __name: "ModalUpload",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, l = j(o.path), r = E(l.value), d = E(!1), a = () => {
      const S = r.value.path;
      if (!S) return { storage: "local", path: "" };
      if (S.endsWith("://"))
        return { storage: S.replace("://", ""), path: "" };
      const k = S.split("://");
      return {
        storage: k[0] || "local",
        path: k[1] || ""
      };
    }, c = (S) => {
      S && (r.value = S);
    }, u = (S) => {
      S && (r.value = S, d.value = !1);
    }, {
      container: v,
      internalFileInput: p,
      internalFolderInput: _,
      pickFiles: y,
      queue: F,
      message: T,
      uploading: h,
      hasFilesInDropArea: g,
      definitions: m,
      openFileSelector: $,
      upload: x,
      cancel: C,
      remove: z,
      clear: P,
      close: q,
      getClassNameForEntry: I,
      getIconForEntry: H,
      addExternalFiles: te
    } = Qn(e.customUploader), ae = () => {
      x(r.value);
    };
    ve(() => {
      e.emitter.on("vf-external-files-dropped", (S) => {
        te(S);
      });
    }), ke(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const ee = E(!1), ie = E(null), ue = E(null), Y = (S) => {
      if (!ee.value) return;
      const k = S.target, D = ie.value?.contains(k) ?? !1, M = ue.value?.contains(k) ?? !1;
      !D && !M && (ee.value = !1);
    };
    return ve(() => document.addEventListener("click", Y)), ke(() => document.removeEventListener("click", Y)), (S, k) => (f(), R(De, {
      "show-drag-overlay": i(g),
      "drag-overlay-text": i(n)("Drag and drop the files/folders to here.")
    }, {
      buttons: X(() => [
        s("div", {
          ref_key: "actionsMenuMobileRef",
          ref: ie,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          s("div", {
            class: G([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              ee.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: k[3] || (k[3] = (D) => i($)())
            }, b(i(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": ee.value ? "true" : "false",
              onClick: k[4] || (k[4] = de((D) => ee.value = !ee.value, ["stop"]))
            }, [...k[17] || (k[17] = [
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
            ])], 8, Jd)
          ], 2),
          ee.value ? (f(), w("div", Zd, [
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: k[5] || (k[5] = (D) => {
                i($)(), ee.value = !1;
              })
            }, b(i(n)("Select Files")), 1),
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: k[6] || (k[6] = (D) => {
                i(_)?.click(), ee.value = !1;
              })
            }, b(i(n)("Select Folders")), 1),
            k[18] || (k[18] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("div", {
              class: G(["vuefinder__upload-actions__item", i(h) ? "disabled" : ""]),
              onClick: k[7] || (k[7] = (D) => i(h) ? null : (i(P)(!1), ee.value = !1))
            }, b(i(n)("Clear all")), 3),
            s("div", {
              class: G(["vuefinder__upload-actions__item", i(h) ? "disabled" : ""]),
              onClick: k[8] || (k[8] = (D) => i(h) ? null : (i(P)(!0), ee.value = !1))
            }, b(i(n)("Clear only successful")), 3)
          ])) : A("", !0)
        ], 512),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: i(h) || !i(F).length,
          onClick: de(ae, ["prevent"])
        }, b(i(n)("Upload")), 9, ec),
        i(h) ? (f(), w("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[9] || (k[9] = de(
            //@ts-ignore
            (...D) => i(C) && i(C)(...D),
            ["prevent"]
          ))
        }, b(i(n)("Cancel")), 1)) : (f(), w("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[10] || (k[10] = de(
            //@ts-ignore
            (...D) => i(q) && i(q)(...D),
            ["prevent"]
          ))
        }, b(i(n)("Close")), 1)),
        s("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: ue,
          class: "relative mr-auto hidden sm:block"
        }, [
          s("div", {
            class: G(["vuefinder__upload-actions", ee.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            s("button", {
              ref_key: "pickFiles",
              ref: y,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, b(i(n)("Select Files")), 513),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": ee.value ? "true" : "false",
              onClick: k[11] || (k[11] = de((D) => ee.value = !ee.value, ["stop"]))
            }, [...k[19] || (k[19] = [
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
            ])], 8, tc)
          ], 2),
          ee.value ? (f(), w("div", nc, [
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: k[12] || (k[12] = (D) => {
                i($)(), ee.value = !1;
              })
            }, b(i(n)("Select Files")), 1),
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: k[13] || (k[13] = (D) => {
                i(_)?.click(), ee.value = !1;
              })
            }, b(i(n)("Select Folders")), 1),
            k[20] || (k[20] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("div", {
              class: G(["vuefinder__upload-actions__item", i(h) ? "disabled" : ""]),
              onClick: k[14] || (k[14] = (D) => i(h) ? null : (i(P)(!1), ee.value = !1))
            }, b(i(n)("Clear all")), 3),
            s("div", {
              class: G(["vuefinder__upload-actions__item", i(h) ? "disabled" : ""]),
              onClick: k[15] || (k[15] = (D) => i(h) ? null : (i(P)(!0), ee.value = !1))
            }, b(i(n)("Clear only successful")), 3)
          ])) : A("", !0)
        ], 512)
      ]),
      default: X(() => [
        s("div", null, [
          L(Ee, {
            icon: i(bo),
            title: i(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", Od, [
            s("div", Ld, [
              s("div", Rd, b(i(n)("Hedef Klasör")), 1),
              s("div", Vd, [
                s("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: k[0] || (k[0] = (D) => d.value = !d.value)
                }, [
                  s("div", Bd, [
                    s("span", zd, b(a().storage) + "://", 1),
                    a().path ? (f(), w("span", Hd, b(a().path), 1)) : A("", !0)
                  ]),
                  s("span", Nd, b(i(n)("Browse")), 1)
                ])
              ]),
              s("div", {
                class: G([
                  "vuefinder__upload-modal__tree-selector",
                  d.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                L(rn, {
                  modelValue: r.value,
                  "onUpdate:modelValue": [
                    k[1] || (k[1] = (D) => r.value = D),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: u
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            s("div", Ud, b(i(n)("You can drag & drop files anywhere while this modal is open.")), 1),
            s("div", {
              ref_key: "container",
              ref: v,
              class: "hidden"
            }, null, 512),
            s("div", Kd, [
              (f(!0), w(ce, null, _e(i(F), (D) => (f(), w("div", {
                key: D.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                s("span", {
                  class: G(["vuefinder__upload-modal__file-icon", i(I)(D)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(i(H)(D))
                  }, null, 8, jd)
                ], 2),
                s("div", qd, [
                  s("div", Wd, b(i(Zt)(D.name, 40)) + " (" + b(D.size) + ") ", 1),
                  s("div", Gd, b(i(Zt)(D.name, 16)) + " (" + b(D.size) + ") ", 1),
                  s("div", {
                    class: G(["vuefinder__upload-modal__file-status", i(I)(D)])
                  }, [
                    se(b(D.statusName) + " ", 1),
                    D.status === i(m).QUEUE_ENTRY_STATUS.UPLOADING ? (f(), w("b", Yd, b(D.percent), 1)) : A("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: G(["vuefinder__upload-modal__file-remove", i(h) ? "disabled" : ""]),
                  title: i(n)("Delete"),
                  disabled: i(h),
                  onClick: (M) => i(z)(D)
                }, [...k[16] || (k[16] = [
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
                ])], 10, Qd)
              ]))), 128)),
              i(F).length ? A("", !0) : (f(), w("div", Xd, b(i(n)("No files selected!")), 1))
            ]),
            i(T).length ? (f(), R(Ad, {
              key: 0,
              error: "",
              onHidden: k[2] || (k[2] = (D) => T.value = "")
            }, {
              default: X(() => [
                se(b(i(T)), 1)
              ]),
              _: 1
            })) : A("", !0)
          ])
        ]),
        s("input", {
          ref_key: "internalFileInput",
          ref: p,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        s("input", {
          ref_key: "internalFolderInput",
          ref: _,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["show-drag-overlay", "drag-overlay-text"]));
  }
}), oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function sc(t, e) {
  return f(), w("svg", oc, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const ko = { render: sc }, ic = { class: "vuefinder__unarchive-modal__content" }, lc = { class: "vuefinder__unarchive-modal__items" }, ac = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, rc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, dc = { class: "vuefinder__unarchive-modal__item-name" }, cc = { class: "vuefinder__unarchive-modal__info" }, hn = /* @__PURE__ */ J({
  __name: "ModalUnarchive",
  setup(t) {
    const e = Z(), n = e.fs, o = j(n.path), { t: l } = e.i18n, r = E(e.modal.data.items[0]), d = E(""), a = E([]), c = () => {
      e.adapter.unarchive({
        item: r.value.path,
        path: o.value.path
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: l("The file unarchived.") }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: l(u.message), type: "error" });
      });
    };
    return (u, v) => (f(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(i(l)("Unarchive")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (p) => i(e).modal.close())
        }, b(i(l)("Cancel")), 1)
      ]),
      default: X(() => [
        s("div", null, [
          L(Ee, {
            icon: i(ko),
            title: i(l)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", ic, [
            s("div", lc, [
              (f(!0), w(ce, null, _e(a.value, (p) => (f(), w("p", {
                key: p.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                p.type === "dir" ? (f(), w("svg", ac, [...v[2] || (v[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (f(), w("svg", rc, [...v[3] || (v[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", dc, b(p.basename), 1)
              ]))), 128)),
              s("p", cc, b(i(l)("The archive will be unarchived at")) + " (" + b(i(o).path) + ") ", 1),
              d.value.length ? (f(), R(i(d), {
                key: 0,
                error: "",
                onHidden: v[0] || (v[0] = (p) => d.value = "")
              }, {
                default: X(() => [
                  se(b(d.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function fc(t, e) {
  return f(), w("svg", uc, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const xo = { render: fc }, vc = { class: "vuefinder__archive-modal__content" }, _c = { class: "vuefinder__archive-modal__form" }, pc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, mc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gc = { class: "vuefinder__archive-modal__file-name" }, wc = ["placeholder"], gn = /* @__PURE__ */ J({
  __name: "ModalArchive",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, l = j(o.path), r = E(""), d = E(""), a = E(e.modal.data.items), c = () => {
      a.value.length && e.adapter.archive({
        path: l.value.path,
        items: a.value.map(({ path: u, type: v }) => ({
          path: u,
          type: v
        })),
        name: r.value
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: n(u.message), type: "error" });
      });
    };
    return (u, v) => (f(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(i(n)("Archive")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[2] || (v[2] = (p) => i(e).modal.close())
        }, b(i(n)("Cancel")), 1)
      ]),
      default: X(() => [
        s("div", null, [
          L(Ee, {
            icon: i(xo),
            title: i(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", vc, [
            s("div", _c, [
              s("div", pc, [
                (f(!0), w(ce, null, _e(a.value, (p) => (f(), w("p", {
                  key: p.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  p.type === "dir" ? (f(), w("svg", mc, [...v[3] || (v[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), w("svg", hc, [...v[4] || (v[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", gc, b(p.basename), 1)
                ]))), 128))
              ]),
              pe(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (p) => r.value = p),
                class: "vuefinder__archive-modal__input",
                placeholder: i(n)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: ft(c, ["enter"])
              }, null, 40, wc), [
                [vt, r.value]
              ]),
              d.value.length ? (f(), R(i(d), {
                key: 0,
                error: "",
                onHidden: v[1] || (v[1] = (p) => d.value = "")
              }, {
                default: X(() => [
                  se(b(d.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), yc = { class: "vuefinder__about-modal__content" }, bc = { class: "vuefinder__about-modal__main" }, kc = { class: "vuefinder__about-modal__shortcuts" }, xc = { class: "vuefinder__about-modal__shortcut" }, $c = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Cc = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Sc = { class: "vuefinder__about-modal__shortcut" }, Fc = { class: "vuefinder__about-modal__shortcut" }, Dc = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, Tc = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, Ec = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, Mc = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, Ac = { class: "vuefinder__about-modal__shortcut" }, Pc = { class: "vuefinder__about-modal__shortcut" }, Ic = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, Oc = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, Lc = /* @__PURE__ */ J({
  __name: "ModalShortcuts",
  setup(t) {
    const e = Z(), { enabled: n } = Oe(), { t: o } = e.i18n;
    return (l, r) => (f(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: r[0] || (r[0] = (d) => i(e).modal.close())
        }, b(i(o)("Close")), 1)
      ]),
      default: X(() => [
        s("div", yc, [
          L(Ee, {
            icon: i(qn),
            title: i(o)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          s("div", bc, [
            s("div", kc, [
              s("div", xc, [
                s("div", null, b(i(o)("Refresh")), 1),
                r[1] || (r[1] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "R")
                ], -1))
              ]),
              i(n)("rename") ? (f(), w("div", $c, [
                s("div", null, b(i(o)("Rename")), 1),
                r[2] || (r[2] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "Shift"),
                  se(" + "),
                  s("kbd", null, "R")
                ], -1))
              ])) : A("", !0),
              i(n)("delete") ? (f(), w("div", Cc, [
                s("div", null, b(i(o)("Delete")), 1),
                r[3] || (r[3] = s("kbd", null, "Del", -1))
              ])) : A("", !0),
              s("div", Sc, [
                s("div", null, b(i(o)("Escape")), 1),
                r[4] || (r[4] = s("kbd", null, "Esc", -1))
              ]),
              s("div", Fc, [
                s("div", null, b(i(o)("Select All")), 1),
                r[5] || (r[5] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "A")
                ], -1))
              ]),
              i(n)("copy") ? (f(), w("div", Dc, [
                s("div", null, b(i(o)("Cut")), 1),
                r[6] || (r[6] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "X")
                ], -1))
              ])) : A("", !0),
              i(n)("copy") ? (f(), w("div", Tc, [
                s("div", null, b(i(o)("Copy")), 1),
                r[7] || (r[7] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "C")
                ], -1))
              ])) : A("", !0),
              i(n)("copy") ? (f(), w("div", Ec, [
                s("div", null, b(i(o)("Paste")), 1),
                r[8] || (r[8] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "V")
                ], -1))
              ])) : A("", !0),
              i(n)("search") ? (f(), w("div", Mc, [
                s("div", null, b(i(o)("Search")), 1),
                r[9] || (r[9] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "F")
                ], -1))
              ])) : A("", !0),
              s("div", Ac, [
                s("div", null, b(i(o)("Toggle Sidebar")), 1),
                r[10] || (r[10] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "E")
                ], -1))
              ]),
              s("div", Pc, [
                s("div", null, b(i(o)("Open Settings")), 1),
                r[11] || (r[11] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "S")
                ], -1))
              ]),
              i(n)("fullscreen") ? (f(), w("div", Ic, [
                s("div", null, b(i(o)("Toggle Full Screen")), 1),
                r[12] || (r[12] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "Enter")
                ], -1))
              ])) : A("", !0),
              i(n)("preview") ? (f(), w("div", Oc, [
                s("div", null, b(i(o)("Preview")), 1),
                r[13] || (r[13] = s("kbd", null, "Space", -1))
              ])) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Rc = { class: "vuefinder__menubar__container" }, Vc = ["onClick", "onMouseenter"], Bc = { class: "vuefinder__menubar__label" }, zc = ["onMouseenter"], Hc = ["onClick"], Nc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Uc = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Kc = /* @__PURE__ */ J({
  __name: "MenuBar",
  setup(t) {
    const e = Z(), { enabled: n } = Oe(), { t: o } = e?.i18n || { t: (m) => m }, l = e?.fs, r = e?.config, d = j(r.state), a = j(l.selectedItems), c = j(l?.storages || []), u = E(null), v = E(!1), p = K(() => window.opener !== null || window.name !== "" || window.history.length <= 1), _ = K(() => [
      {
        id: "file",
        label: o("File"),
        items: [
          {
            id: "new-folder",
            label: o("New Folder"),
            action: () => e?.modal?.open(pn, { items: a.value }),
            enabled: () => n("newfolder")
          },
          {
            id: "new-file",
            label: o("New File"),
            action: () => e?.modal?.open(yo, { items: a.value }),
            enabled: () => n("newfile")
          },
          { type: "separator" },
          {
            id: "upload",
            label: o("Upload"),
            action: () => e?.modal?.open(mn, { items: a.value }),
            enabled: () => n("upload")
          },
          { type: "separator" },
          {
            id: "search",
            label: o("Search"),
            action: () => e.modal.open(_n),
            enabled: () => n("search")
          },
          { type: "separator" },
          {
            id: "archive",
            label: o("Archive"),
            action: () => {
              a.value.length > 0 && e?.modal?.open(gn, { items: a.value });
            },
            enabled: () => a.value.length > 0 && n("archive")
          },
          {
            id: "unarchive",
            label: o("Unarchive"),
            action: () => {
              a.value.length === 1 && a.value[0]?.mime_type === "application/zip" && e?.modal?.open(hn, { items: a.value });
            },
            enabled: () => a.value.length === 1 && a.value[0]?.mime_type === "application/zip" && n("unarchive")
          },
          { type: "separator" },
          {
            id: "preview",
            label: o("Preview"),
            action: () => {
              a.value.length === 1 && a.value[0]?.type !== "dir" && e?.modal?.open(It, {
                storage: l?.path?.get()?.storage,
                item: a.value[0]
              });
            },
            enabled: () => a.value.length === 1 && a.value[0]?.type !== "dir" && n("preview")
          },
          // Only show exit option if we can actually close the window
          ...p.value ? [
            { type: "separator" },
            {
              id: "exit",
              label: o("Exit"),
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
        label: o("Edit"),
        items: [
          // Only show Select All and Deselect All in multiple selection mode
          ...e?.selectionMode === "multiple" ? [
            {
              id: "select-all",
              label: o("Select All"),
              action: () => l?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: o("Deselect All"),
              action: () => l?.clearSelection(),
              enabled: () => a.value.length > 0
            },
            { type: "separator" }
          ] : [],
          ...n("copy") ? [
            {
              id: "cut",
              label: o("Cut"),
              action: () => {
                a.value.length > 0 && l?.setClipboard(
                  "cut",
                  new Set(a.value.map((m) => m.path))
                );
              },
              enabled: () => a.value.length > 0
            },
            {
              id: "copy",
              label: o("Copy"),
              action: () => {
                a.value.length > 0 && l?.setClipboard(
                  "copy",
                  new Set(a.value.map((m) => m.path))
                );
              },
              enabled: () => a.value.length > 0
            },
            {
              id: "paste",
              label: o("Paste"),
              action: () => {
                const m = l?.getClipboard();
                m?.items?.size > 0 && e?.modal?.open(m.type === "cut" ? ot : dn, {
                  items: { from: Array.from(m.items), to: l?.path?.get() }
                });
              },
              enabled: () => l?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...n("move") ? [
            {
              id: "move",
              label: o("Move"),
              action: () => {
                if (a.value.length > 0) {
                  const m = e?.fs, $ = {
                    storage: m?.path?.get()?.storage || "",
                    path: m?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(ot, { items: { from: a.value, to: $ } });
                }
              },
              enabled: () => a.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "copy-path",
            label: o("Copy Path"),
            action: async () => {
              if (a.value.length === 1) {
                const m = a.value[0];
                await ut(m.path);
              } else {
                const m = l?.path?.get();
                m?.path && await ut(m.path);
              }
            },
            enabled: () => !0
            // Her zaman aktif
          },
          {
            id: "copy-download-url",
            label: o("Copy Download URL"),
            action: async () => {
              if (a.value.length === 1) {
                const m = a.value[0];
                l?.path?.get()?.storage;
                const $ = e?.adapter?.getDownloadUrl({ path: m.path });
                $ && await nr($);
              }
            },
            enabled: () => a.value.length === 1 && a.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: o("Rename"),
            action: () => {
              a.value.length === 1 && e?.modal?.open(Pt, { items: a.value });
            },
            enabled: () => a.value.length === 1 && n("rename")
          },
          {
            id: "delete",
            label: o("Delete"),
            action: () => {
              a.value.length > 0 && e?.modal?.open(At, { items: a.value });
            },
            enabled: () => a.value.length > 0 && n("delete")
          }
        ]
      },
      {
        id: "view",
        label: o("View"),
        items: [
          {
            id: "refresh",
            label: o("Refresh"),
            action: () => {
              e?.adapter.list(l?.path?.get()?.path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: o("Grid View"),
            action: () => r?.set("view", "grid"),
            enabled: () => !0,
            checked: () => d.value?.view === "grid"
          },
          {
            id: "list-view",
            label: o("List View"),
            action: () => r?.set("view", "list"),
            enabled: () => !0,
            checked: () => d.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: o("Tree View"),
            action: () => r?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => d.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: o("Show Thumbnails"),
            action: () => r?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => d.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: o("Show Hidden Files"),
            action: () => r?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => d.value?.showHiddenFiles
          },
          { type: "separator" },
          {
            id: "fullscreen",
            label: o("Full Screen"),
            action: () => r?.toggle("fullScreen"),
            enabled: () => n("fullscreen"),
            checked: () => d.value?.fullScreen
          }
        ]
      },
      {
        id: "go",
        label: o("Go"),
        items: [
          ...n("history") ? [
            {
              id: "forward",
              label: o("Forward"),
              action: () => {
                l?.goForward();
                const m = l?.path?.get();
                m?.path && e?.adapter.open(m.path);
              },
              enabled: () => l?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: o("Back"),
              action: () => {
                l?.goBack();
                const m = l?.path?.get();
                m?.path && e?.adapter.open(m.path);
              },
              enabled: () => l?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: o("Open containing folder"),
            action: () => {
              const m = l?.path?.get();
              if (m?.breadcrumb && m.breadcrumb.length > 1) {
                const x = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
                e?.adapter.open(x);
              }
            },
            enabled: () => {
              const m = l?.path?.get();
              return m?.breadcrumb && m.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(c.value || []).map((m) => ({
            id: `storage-${m}`,
            label: m,
            action: () => {
              const $ = `${m}://`;
              l?.setPath($), e?.adapter.list($);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: o("Go to Folder"),
            action: () => {
              const m = prompt(o("Enter folder path:"));
              m && (l?.setPath(m), e?.adapter.list(m));
            },
            enabled: () => !0
          }
        ]
      },
      {
        id: "help",
        label: o("Help"),
        items: [
          {
            id: "settings",
            label: o("Settings"),
            action: () => e?.modal?.open(ho),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: o("Shortcuts"),
            action: () => e?.modal?.open(Lc),
            enabled: () => !0
          },
          {
            id: "about",
            label: o("About"),
            action: () => e?.modal?.open(Wn),
            enabled: () => !0
          }
        ]
      }
    ]), y = (m) => {
      u.value === m ? T() : (u.value = m, v.value = !0);
    }, F = (m) => {
      v.value && (u.value = m);
    }, T = () => {
      u.value = null, v.value = !1;
    }, h = (m) => {
      T(), m();
    }, g = (m) => {
      m.target.closest(".vuefinder__menubar") || T();
    };
    return ve(() => {
      document.addEventListener("click", g);
    }), ke(() => {
      document.removeEventListener("click", g);
    }), (m, $) => (f(), w("div", {
      class: "vuefinder__menubar",
      onClick: $[0] || ($[0] = de(() => {
      }, ["stop"]))
    }, [
      s("div", Rc, [
        (f(!0), w(ce, null, _e(_.value, (x) => (f(), w("div", {
          key: x.id,
          class: G(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": u.value === x.id }]),
          onClick: (C) => y(x.id),
          onMouseenter: (C) => F(x.id)
        }, [
          s("span", Bc, b(x.label), 1),
          u.value === x.id ? (f(), w("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (C) => F(x.id)
          }, [
            (f(!0), w(ce, null, _e(x.items, (C) => (f(), w("div", {
              key: C.id || C.type,
              class: G(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": C.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": C.enabled && !C.enabled(),
                "vuefinder__menubar__dropdown__item--checked": C.checked && C.checked()
              }]),
              onClick: de((z) => C.type !== "separator" && C.enabled && C.enabled() ? h(C.action) : null, ["stop"])
            }, [
              C.type !== "separator" ? (f(), w("span", Nc, b(C.label), 1)) : A("", !0),
              C.checked && C.checked() ? (f(), w("span", Uc, " ✓ ")) : A("", !0)
            ], 10, Hc))), 128))
          ], 40, zc)) : A("", !0)
        ], 42, Vc))), 128))
      ])
    ]));
  }
}), jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function qc(t, e) {
  return f(), w("svg", jc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Wc = { render: qc }, Gc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Yc(t, e) {
  return f(), w("svg", Gc, [...e[0] || (e[0] = [
    s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Qc = { render: Yc }, Xc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Jc(t, e) {
  return f(), w("svg", Xc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Zc = { render: Jc }, eu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function tu(t, e) {
  return f(), w("svg", eu, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const nu = { render: tu }, ou = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function su(t, e) {
  return f(), w("svg", ou, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const iu = { render: su }, lu = { class: "vuefinder__toolbar" }, au = { class: "vuefinder__toolbar__actions" }, ru = ["title"], du = ["title"], cu = ["title"], uu = ["title"], fu = ["title"], vu = ["title"], _u = ["title"], pu = { class: "vuefinder__toolbar__controls" }, mu = ["title"], hu = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, gu = ["title"], wu = { class: "relative" }, yu = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, bu = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, ku = { class: "vuefinder__toolbar__dropdown-content" }, xu = { class: "vuefinder__toolbar__dropdown-section" }, $u = { class: "vuefinder__toolbar__dropdown-label" }, Cu = { class: "vuefinder__toolbar__dropdown-row" }, Su = { value: "name" }, Fu = { value: "size" }, Du = { value: "modified" }, Tu = { value: "" }, Eu = { value: "asc" }, Mu = { value: "desc" }, Au = { class: "vuefinder__toolbar__dropdown-section" }, Pu = { class: "vuefinder__toolbar__dropdown-label" }, Iu = { class: "vuefinder__toolbar__dropdown-options" }, Ou = { class: "vuefinder__toolbar__dropdown-option" }, Lu = { class: "vuefinder__toolbar__option-text" }, Ru = { class: "vuefinder__toolbar__dropdown-option" }, Vu = { class: "vuefinder__toolbar__option-text" }, Bu = { class: "vuefinder__toolbar__dropdown-option" }, zu = { class: "vuefinder__toolbar__option-text" }, Hu = { class: "vuefinder__toolbar__dropdown-toggle" }, Nu = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Uu = { class: "vuefinder__toolbar__dropdown-reset" }, Ku = ["title"], ju = ["title"], qu = /* @__PURE__ */ J({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(t) {
    const e = Z(), { enabled: n } = Oe(), { t: o } = e.i18n, l = e.fs, r = e.config, d = j(r.state), a = j(l.selectedItems), c = j(l.sort), u = j(l.filter);
    re(
      () => d.value.fullScreen,
      () => {
        if (d.value.fullScreen) {
          const h = document.querySelector("body");
          h && (h.style.overflow = "hidden");
        } else {
          const h = document.querySelector("body");
          h && (h.style.overflow = "");
        }
        e.emitter.emit("vf-fullscreen-toggle");
      }
    );
    const v = E(!1), p = (h) => {
      h.target.closest(".vuefinder__toolbar__dropdown-container") || (v.value = !1);
    };
    ve(() => {
      document.addEventListener("click", p);
    }), ke(() => {
      document.removeEventListener("click", p);
    });
    const _ = E({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: d.value.showHiddenFiles
      // Initialize with config store default
    });
    re(
      () => _.value.sortBy,
      (h) => {
        if (!_.value.sortOrder) {
          l.clearSort();
          return;
        }
        h === "name" ? l.setSort("basename", _.value.sortOrder) : h === "size" ? l.setSort("file_size", _.value.sortOrder) : h === "modified" && l.setSort("last_modified", _.value.sortOrder);
      }
    ), re(
      () => _.value.sortOrder,
      (h) => {
        if (!h) {
          l.clearSort();
          return;
        }
        _.value.sortBy === "name" ? l.setSort("basename", h) : _.value.sortBy === "size" ? l.setSort("file_size", h) : _.value.sortBy === "modified" && l.setSort("last_modified", h);
      }
    ), re(
      c,
      (h) => {
        h.active ? (h.column === "basename" ? _.value.sortBy = "name" : h.column === "file_size" ? _.value.sortBy = "size" : h.column === "last_modified" && (_.value.sortBy = "modified"), _.value.sortOrder = h.order) : _.value.sortOrder = "";
      },
      { immediate: !0 }
    ), re(
      () => _.value.filterKind,
      (h) => {
        l.setFilter(h, d.value.showHiddenFiles);
      }
    ), re(
      () => _.value.showHidden,
      (h) => {
        r.set("showHiddenFiles", h), l.setFilter(_.value.filterKind, h);
      }
    ), re(
      u,
      (h) => {
        _.value.filterKind = h.kind;
      },
      { immediate: !0 }
    ), re(
      () => d.value.showHiddenFiles,
      (h) => {
        _.value.showHidden = h, l.setFilter(_.value.filterKind, h);
      },
      { immediate: !0 }
    );
    const y = () => r.set("view", d.value.view === "grid" ? "list" : "grid"), F = K(() => u.value.kind !== "all" || !d.value.showHiddenFiles || c.value.active), T = () => {
      _.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, r.set("showHiddenFiles", !0), l.clearSort(), l.clearFilter();
    };
    return (h, g) => (f(), w("div", lu, [
      s("div", au, [
        i(n)("newfolder") ? (f(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: i(o)("New Folder"),
          onClick: g[0] || (g[0] = (m) => i(e).modal.open(pn, { items: i(a) }))
        }, [
          L(i(go))
        ], 8, ru)) : A("", !0),
        i(n)("newfile") ? (f(), w("div", {
          key: 1,
          class: "mx-1.5",
          title: i(o)("New File"),
          onClick: g[1] || (g[1] = (m) => i(e).modal.open(yo, { items: i(a) }))
        }, [
          L(i(wo))
        ], 8, du)) : A("", !0),
        i(n)("rename") ? (f(), w("div", {
          key: 2,
          class: "mx-1.5",
          title: i(o)("Rename"),
          onClick: g[2] || (g[2] = (m) => i(a).length !== 1 || i(e).modal.open(Pt, { items: i(a) }))
        }, [
          L(i(Yn), {
            class: G(i(a).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, cu)) : A("", !0),
        i(n)("delete") ? (f(), w("div", {
          key: 3,
          class: "mx-1.5",
          title: i(o)("Delete"),
          onClick: g[3] || (g[3] = (m) => !i(a).length || i(e).modal.open(At, { items: i(a) }))
        }, [
          L(i(Gn), {
            class: G(i(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, uu)) : A("", !0),
        i(n)("upload") ? (f(), w("div", {
          key: 4,
          class: "mx-1.5",
          title: i(o)("Upload"),
          onClick: g[4] || (g[4] = (m) => i(e).modal.open(mn, { items: i(a) }))
        }, [
          L(i(bo))
        ], 8, fu)) : A("", !0),
        i(n)("unarchive") && i(a).length === 1 && i(a)[0].mime_type === "application/zip" ? (f(), w("div", {
          key: 5,
          class: "mx-1.5",
          title: i(o)("Unarchive"),
          onClick: g[5] || (g[5] = (m) => !i(a).length || i(e).modal.open(hn, { items: i(a) }))
        }, [
          L(i(ko), {
            class: G(i(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, vu)) : A("", !0),
        i(n)("archive") ? (f(), w("div", {
          key: 6,
          class: "mx-1.5",
          title: i(o)("Archive"),
          onClick: g[6] || (g[6] = (m) => !i(a).length || i(e).modal.open(gn, { items: i(a) }))
        }, [
          L(i(xo), {
            class: G(i(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, _u)) : A("", !0)
      ]),
      s("div", pu, [
        i(n)("search") ? (f(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: i(o)("Search Files"),
          onClick: g[7] || (g[7] = (m) => i(e).modal.open(_n))
        }, [
          L(i(cn), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, mu)) : A("", !0),
        s("div", hu, [
          s("div", {
            title: i(o)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: g[8] || (g[8] = (m) => v.value = !v.value)
          }, [
            s("div", wu, [
              L(i(iu), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              F.value ? (f(), w("div", yu)) : A("", !0)
            ])
          ], 8, gu),
          v.value ? (f(), w("div", bu, [
            s("div", ku, [
              s("div", xu, [
                s("div", $u, b(i(o)("Sorting")), 1),
                s("div", Cu, [
                  pe(s("select", {
                    "onUpdate:modelValue": g[9] || (g[9] = (m) => _.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", Su, b(i(o)("Name")), 1),
                    s("option", Fu, b(i(o)("Size")), 1),
                    s("option", Du, b(i(o)("Date")), 1)
                  ], 512), [
                    [Yt, _.value.sortBy]
                  ]),
                  pe(s("select", {
                    "onUpdate:modelValue": g[10] || (g[10] = (m) => _.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", Tu, b(i(o)("None")), 1),
                    s("option", Eu, b(i(o)("Asc")), 1),
                    s("option", Mu, b(i(o)("Desc")), 1)
                  ], 512), [
                    [Yt, _.value.sortOrder]
                  ])
                ])
              ]),
              s("div", Au, [
                s("div", Pu, b(i(o)("Show")), 1),
                s("div", Iu, [
                  s("label", Ou, [
                    pe(s("input", {
                      "onUpdate:modelValue": g[11] || (g[11] = (m) => _.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [jt, _.value.filterKind]
                    ]),
                    s("span", Lu, b(i(o)("All items")), 1)
                  ]),
                  s("label", Ru, [
                    pe(s("input", {
                      "onUpdate:modelValue": g[12] || (g[12] = (m) => _.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [jt, _.value.filterKind]
                    ]),
                    s("span", Vu, b(i(o)("Files only")), 1)
                  ]),
                  s("label", Bu, [
                    pe(s("input", {
                      "onUpdate:modelValue": g[13] || (g[13] = (m) => _.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [jt, _.value.filterKind]
                    ]),
                    s("span", zu, b(i(o)("Folders only")), 1)
                  ])
                ])
              ]),
              s("div", Hu, [
                s("label", Nu, b(i(o)("Show hidden files")), 1),
                pe(s("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": g[14] || (g[14] = (m) => _.value.showHidden = m),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [en, _.value.showHidden]
                ])
              ]),
              s("div", Uu, [
                s("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: T
                }, b(i(o)("Reset")), 1)
              ])
            ])
          ])) : A("", !0)
        ]),
        i(n)("fullscreen") ? (f(), w("div", {
          key: 1,
          class: "mx-1.5",
          title: i(o)("Toggle Full Screen"),
          onClick: g[15] || (g[15] = (m) => i(r).toggle("fullScreen"))
        }, [
          i(d).fullScreen ? (f(), R(i(Qc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (f(), R(i(Wc), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Ku)) : A("", !0),
        s("div", {
          class: "mx-1.5",
          title: i(o)("Change View"),
          onClick: g[16] || (g[16] = (m) => y())
        }, [
          i(d).view === "grid" ? (f(), R(i(Zc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : A("", !0),
          i(d).view === "list" ? (f(), R(i(nu), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : A("", !0)
        ], 8, ju)
      ])
    ]));
  }
}), Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Gu(t, e) {
  return f(), w("svg", Wu, [...e[0] || (e[0] = [
    s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Yu = { render: Gu }, Qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Xu(t, e) {
  return f(), w("svg", Qu, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ju = { render: Xu }, Zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function ef(t, e) {
  return f(), w("svg", Zu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const tf = { render: ef }, nf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function of(t, e) {
  return f(), w("svg", nf, [...e[0] || (e[0] = [
    s("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const sf = { render: of }, lf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function af(t, e) {
  return f(), w("svg", lf, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const rf = { render: af }, df = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function cf(t, e) {
  return f(), w("svg", df, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const uf = { render: cf }, ff = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function vf(t, e) {
  return f(), w("svg", ff, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const _f = { render: vf }, pf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function mf(t, e) {
  return f(), w("svg", pf, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const hf = { render: mf };
function pt(t, e = []) {
  const n = "vfDragEnterCounter", o = t.fs, l = j(o.selectedItems);
  function r(v, p) {
    if (v.isExternalDrag)
      return;
    if (!(t.features?.move ?? !1)) {
      v.dataTransfer && (v.dataTransfer.dropEffect = "none", v.dataTransfer.effectAllowed = "none");
      return;
    }
    v.preventDefault(), o.getDraggedItem() === p.path || !p || p.type !== "dir" || l.value.some(
      (F) => F.path === p.path || er(F.path) === p.path
    ) ? v.dataTransfer && (v.dataTransfer.dropEffect = "none", v.dataTransfer.effectAllowed = "none") : (v.dataTransfer && (v.dataTransfer.dropEffect = "copy", v.dataTransfer.effectAllowed = "all"), v.currentTarget.classList.add(...e));
  }
  function d(v) {
    if (v.isExternalDrag || !(t.features?.move ?? !1))
      return;
    v.preventDefault();
    const _ = v.currentTarget, y = Number(_.dataset[n] || 0);
    _.dataset[n] = String(y + 1);
  }
  function a(v) {
    if (v.isExternalDrag || !(t.features?.move ?? !1))
      return;
    v.preventDefault();
    const _ = v.currentTarget, F = Number(_.dataset[n] || 0) - 1;
    F <= 0 ? (delete _.dataset[n], _.classList.remove(...e)) : _.dataset[n] = String(F);
  }
  function c(v, p) {
    if (v.isExternalDrag || !(t.features?.move ?? !1) || !p) return;
    v.preventDefault();
    const y = v.currentTarget;
    delete y.dataset[n], y.classList.remove(...e);
    const F = v.dataTransfer?.getData("items") || "[]", h = JSON.parse(F).map(
      (g) => o.sortedFiles.get().find((m) => m.path === g)
    );
    o.clearDraggedItem(), t.modal.open(ot, { items: { from: h, to: p } });
  }
  function u(v) {
    return {
      dragover: (p) => r(p, v),
      dragenter: d,
      dragleave: a,
      drop: (p) => c(p, v)
    };
  }
  return { events: u };
}
const gf = { class: "vuefinder__breadcrumb__container" }, wf = ["title"], yf = ["title"], bf = ["title"], kf = ["title"], xf = { class: "vuefinder__breadcrumb__path-container" }, $f = { class: "vuefinder__breadcrumb__list" }, Cf = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Sf = { class: "relative" }, Ff = ["title", "onClick"], Df = ["title"], Tf = { class: "vuefinder__breadcrumb__path-mode" }, Ef = { class: "vuefinder__breadcrumb__path-mode-content" }, Mf = ["title"], Af = { class: "vuefinder__breadcrumb__path-text" }, Pf = ["title"], If = ["data-theme"], Of = ["onClick"], Lf = { class: "vuefinder__breadcrumb__hidden-item-content" }, Rf = { class: "vuefinder__breadcrumb__hidden-item-text" }, Vf = /* @__PURE__ */ J({
  __name: "Breadcrumb",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, l = e.config, r = j(l.state), d = j(o.path), a = j(o.loading), c = E(null), u = Jn(0, 100), v = E(5), p = E(!1), _ = E(!1), y = K(() => d.value?.breadcrumb ?? []);
    function F(Y, S) {
      return Y.length > S ? [Y.slice(-S), Y.slice(0, -S)] : [Y, []];
    }
    const T = K(
      () => F(y.value, v.value)[0]
    ), h = K(
      () => F(y.value, v.value)[1]
    );
    re(u, () => {
      if (!c.value) return;
      const Y = c.value.children;
      let S = 0, k = 0;
      const D = 5, M = 1;
      v.value = D, Ae(() => {
        for (let N = Y.length - 1; N >= 0; N--) {
          const Q = Y[N];
          if (S + Q.offsetWidth > u.value - 40)
            break;
          S += parseInt(Q.offsetWidth.toString(), 10), k++;
        }
        k < M && (k = M), k > D && (k = D), v.value = k;
      });
    });
    const g = () => {
      c.value && (u.value = c.value.offsetWidth);
    }, m = E(null);
    ve(() => {
      m.value = new ResizeObserver(g), c.value && m.value.observe(c.value);
    }), ke(() => {
      m.value && m.value.disconnect();
    });
    const $ = pt(e, ["vuefinder__drag-over"]);
    function x(Y = null) {
      Y ??= y.value.length - 2;
      const S = {
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
      return y.value[Y] ?? S;
    }
    const C = () => {
      e.adapter.invalidateListQuery(d.value.path), e.adapter.open(d.value.path);
    }, z = () => {
      T.value.length > 0 && e.adapter.open(
        y.value[y.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
      );
    }, P = (Y) => {
      e.adapter.open(Y.path), p.value = !1;
    }, q = () => {
      p.value && (p.value = !1);
    }, I = {
      mounted(Y, S) {
        Y.clickOutsideEvent = function(k) {
          Y === k.target || Y.contains(k.target) || S.value();
        }, document.body.addEventListener("click", Y.clickOutsideEvent);
      },
      beforeUnmount(Y) {
        document.body.removeEventListener("click", Y.clickOutsideEvent);
      }
    }, H = () => {
      l.toggle("showTreeView");
    }, te = E({
      x: 0,
      y: 0
    }), ae = (Y, S = null) => {
      if (Y.currentTarget instanceof HTMLElement) {
        const { x: k, y: D, height: M } = Y.currentTarget.getBoundingClientRect();
        te.value = { x: k, y: D + M };
      }
      p.value = S ?? !p.value;
    }, ee = () => {
      _.value = !_.value;
    }, ie = async () => {
      await ut(d.value?.path || ""), e.emitter.emit("vf-toast-push", { label: n("Path copied to clipboard") });
    }, ue = () => {
      _.value = !1;
    };
    return (Y, S) => (f(), w("div", gf, [
      s("span", {
        title: i(n)("Toggle Tree View")
      }, [
        L(i(uf), {
          class: G(["vuefinder__breadcrumb__toggle-tree", i(r).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: H
        }, null, 8, ["class"])
      ], 8, wf),
      s("span", {
        title: i(n)("Go up a directory")
      }, [
        L(i(Ju), Me({
          class: y.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, je(y.value.length ? i($).events(x()) : {}), { onClick: z }), null, 16, ["class"])
      ], 8, yf),
      i(o).isLoading() ? (f(), w("span", {
        key: 1,
        title: i(n)("Cancel")
      }, [
        L(i(tf), {
          onClick: S[0] || (S[0] = (k) => i(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, kf)) : (f(), w("span", {
        key: 0,
        title: i(n)("Refresh")
      }, [
        L(i(Yu), { onClick: C })
      ], 8, bf)),
      pe(s("div", xf, [
        s("div", null, [
          L(i(sf), Me({ class: "vuefinder__breadcrumb__home-icon" }, je(i($).events(x(-1))), {
            onClick: S[1] || (S[1] = de((k) => i(e).adapter.open(i(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        s("div", $f, [
          h.value.length ? pe((f(), w("div", Cf, [
            S[3] || (S[3] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", Sf, [
              s("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: S[2] || (S[2] = (k) => ae(k, !0)),
                onClick: de(ae, ["stop"])
              }, [
                L(i(mo), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [I, q]
          ]) : A("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (f(!0), w(ce, null, _e(T.value, (k, D) => (f(), w("div", { key: D }, [
            S[4] || (S[4] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", Me({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: k.basename
            }, je(i($).events(k), !0), {
              onClick: de((M) => i(e).adapter.open(k.path), ["stop"])
            }), b(k.name), 17, Ff)
          ]))), 128))
        ], 512),
        i(l).get("loadingIndicator") === "circular" && i(a) ? (f(), R(i(Rt), { key: 0 })) : A("", !0),
        s("span", {
          title: i(n)("Toggle Path Copy Mode"),
          onClick: ee
        }, [
          L(i(hf), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Df)
      ], 512), [
        [ze, !_.value]
      ]),
      pe(s("div", Tf, [
        s("div", Ef, [
          s("div", {
            title: i(n)("Copy Path")
          }, [
            L(i(_f), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: ie
            })
          ], 8, Mf),
          s("div", Af, b(i(d).path), 1),
          s("div", {
            title: i(n)("Exit")
          }, [
            L(i(rf), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: ue
            })
          ], 8, Pf)
        ])
      ], 512), [
        [ze, _.value]
      ]),
      (f(), R(Et, { to: "body" }, [
        s("div", null, [
          pe(s("div", {
            style: He({
              position: "absolute",
              top: te.value.y + "px",
              left: te.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": i(e).theme.current
          }, [
            (f(!0), w(ce, null, _e(h.value, (k, D) => (f(), w("div", Me({
              key: D,
              class: "vuefinder__breadcrumb__hidden-item"
            }, je(i($).events(k), !0), {
              onClick: (M) => P(k)
            }), [
              s("div", Lf, [
                s("span", null, [
                  L(i(Ne), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                s("span", Rf, b(k.name), 1)
              ])
            ], 16, Of))), 128))
          ], 12, If), [
            [ze, p.value]
          ])
        ])
      ]))
    ]));
  }
});
function Bf(t, e) {
  const {
    scrollContainer: n,
    itemWidth: o = 100,
    rowHeight: l,
    overscan: r = 2,
    containerPadding: d = 48,
    lockItemsPerRow: a
  } = e, c = t, u = () => typeof l == "number" ? l : l.value, v = E(0), p = E(6), _ = E(600);
  let y = null;
  const F = K(() => Math.ceil(c.value.length / p.value)), T = K(() => F.value * u()), h = K(() => {
    const I = u(), H = Math.max(0, Math.floor(v.value / I) - r), te = Math.min(
      F.value,
      Math.ceil((v.value + _.value) / I) + r
    );
    return { start: H, end: te };
  }), g = K(() => {
    const { start: I, end: H } = h.value;
    return Array.from({ length: H - I }, (te, ae) => I + ae);
  }), m = () => _.value, $ = () => a.value, x = () => {
    if ($()) {
      p.value = 1;
      return;
    }
    if (n.value) {
      const I = n.value.clientWidth - d;
      p.value = Math.max(Math.floor(I / o), 2);
    }
  }, C = (I) => {
    const H = I.target;
    v.value = H.scrollTop;
  };
  re(
    () => c.value.length,
    () => {
      x();
    }
  );
  const z = (I, H) => {
    if (!I || !Array.isArray(I))
      return [];
    const te = H * p.value;
    return I.slice(te, te + p.value);
  }, P = (I, H, te, ae, ee) => {
    if (!I || !Array.isArray(I))
      return [];
    const ie = [];
    for (let ue = H; ue <= te; ue++)
      for (let Y = ae; Y <= ee; Y++) {
        const S = ue * p.value + Y;
        S < I.length && I[S] && ie.push(I[S]);
      }
    return ie;
  }, q = (I) => ({
    row: Math.floor(I / p.value),
    col: I % p.value
  });
  return ve(async () => {
    await Ae(), n.value && (_.value = n.value.clientHeight || 600), x(), window.addEventListener("resize", () => {
      n.value && (_.value = n.value.clientHeight || 600), x();
    }), n.value && "ResizeObserver" in window && (y = new ResizeObserver((I) => {
      const H = I[0];
      H && (_.value = Math.round(H.contentRect.height)), x();
    }), y.observe(n.value));
  }), ke(() => {
    window.removeEventListener("resize", x), y && (y.disconnect(), y = null);
  }), {
    scrollTop: v,
    itemsPerRow: p,
    totalRows: F,
    totalHeight: T,
    visibleRange: h,
    visibleRows: g,
    updateItemsPerRow: x,
    handleScroll: C,
    getRowItems: z,
    getItemsInRange: P,
    getItemPosition: q,
    getContainerHeight: m
  };
}
function zf(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: o, selectionObject: l, rowHeight: r, itemWidth: d } = t, a = Math.floor(Math.random() * 2 ** 32).toString(), c = Z(), u = c.fs, v = j(u.selectedKeys), p = j(u.sortedFiles), _ = E(/* @__PURE__ */ new Set()), y = E(!1), F = E(!1), T = E(null), h = (S) => S.map((k) => k.getAttribute("data-key")).filter((k) => !!k), g = (S) => {
    S.selection.getSelection().forEach((k) => {
      S.selection.deselect(k, !0);
    });
  }, m = (S) => {
    v.value && v.value.forEach((k) => {
      const D = document.querySelector(`[data-key="${k}"]`);
      D && $(k) && S.selection.select(D, !0);
    });
  }, $ = (S) => {
    const k = p.value?.find((N) => o(N) === S);
    if (!k) return !1;
    const D = c.selectionFilterType, M = c.selectionFilterMimeIncludes;
    return D === "files" && k.type === "dir" || D === "dirs" && k.type === "file" ? !1 : M && Array.isArray(M) && M.length > 0 ? k.type === "dir" ? !0 : k.mime_type ? M.some((N) => k.mime_type?.startsWith(N)) : !1 : !0;
  }, x = (S) => {
    if (S.size === 0) return null;
    const D = Array.from(S).map((fe) => {
      const Be = p.value?.findIndex((Ue) => o(Ue) === fe) ?? -1;
      return e(Be >= 0 ? Be : 0);
    }), M = Math.min(...D.map((fe) => fe.row)), N = Math.max(...D.map((fe) => fe.row)), Q = Math.min(...D.map((fe) => fe.col)), me = Math.max(...D.map((fe) => fe.col));
    return { minRow: M, maxRow: N, minCol: Q, maxCol: me };
  }, C = (S) => {
    if (c.selectionMode === "single")
      return !1;
    y.value = !1, !S.event?.metaKey && !S.event?.ctrlKey && (F.value = !0), S.selection.resolveSelectables(), g(S), m(S);
  }, z = E(0), P = (S) => {
    const k = S;
    if (k && "touches" in k) {
      const D = k.touches?.[0];
      if (D) return { x: D.clientX, y: D.clientY };
    }
    if (k && "changedTouches" in k) {
      const D = k.changedTouches?.[0];
      if (D) return { x: D.clientX, y: D.clientY };
    }
    if (k && "clientX" in k && "clientY" in k) {
      const D = k;
      return { x: D.clientX, y: D.clientY };
    }
    return null;
  }, q = ({ event: S, selection: k }) => {
    z.value = (l.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const D = document.querySelector(
      ".selection-area-container"
    );
    if (D && (D.dataset.theme = c.theme.current), c.selectionMode === "single")
      return;
    const M = S;
    M && "type" in M && M.type === "touchend" && M.preventDefault();
    const N = S;
    if (!N?.ctrlKey && !N?.metaKey && (u.clearSelection(), k.clearSelection(!0, !0)), _.value.clear(), l.value) {
      const Q = l.value.getSelectables()[0]?.closest(".scroller-" + a);
      if (Q) {
        const me = Q.getBoundingClientRect(), fe = P(S);
        if (fe) {
          const Be = fe.y - me.top + Q.scrollTop, Ue = fe.x - me.left, Ze = Math.floor(Be / r.value), lt = Math.floor(Ue / d);
          T.value = { row: Ze, col: lt };
        }
      }
    }
  }, I = (S) => {
    if (c.selectionMode === "single")
      return;
    const k = S.selection, D = h(S.store.changed.added), M = h(S.store.changed.removed);
    F.value = !1, y.value = !0, D.forEach((N) => {
      v.value && !v.value.has(N) && $(N) && (_.value.add(N), u.select(N, c.selectionMode || "multiple"));
    }), M.forEach((N) => {
      document.querySelector(`[data-key="${N}"]`) && p.value?.find((me) => o(me) === N) && _.value.delete(N), u.deselect(N);
    }), k.resolveSelectables(), m(S);
  }, H = () => {
    _.value.clear();
  }, te = (S) => {
    if (S.event && T.value && _.value.size > 0) {
      const D = Array.from(_.value).map((M) => {
        const N = p.value?.findIndex((Q) => o(Q) === M) ?? -1;
        return N >= 0 ? e(N) : null;
      }).filter((M) => M !== null);
      if (D.length > 0) {
        const M = [...D, T.value], N = {
          minRow: Math.min(...M.map((Q) => Q.row)),
          maxRow: Math.max(...M.map((Q) => Q.row)),
          minCol: Math.min(...M.map((Q) => Q.col)),
          maxCol: Math.max(...M.map((Q) => Q.col))
        };
        n(
          p.value || [],
          N.minRow,
          N.maxRow,
          N.minCol,
          N.maxCol
        ).forEach((Q) => {
          const me = o(Q);
          document.querySelector(`[data-key="${me}"]`) || u.select(me, c.selectionMode || "multiple");
        });
      }
    }
  }, ae = (S) => {
    te(S), g(S), m(S), u.setSelectedCount(v.value?.size || 0), y.value = !1, T.value = null;
  }, ee = () => {
    l.value = new Ho({
      selectables: [".file-item-" + a + ":not(.vf-explorer-item--unselectable)"],
      boundaries: [".scroller-" + a],
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
    }), l.value.on("beforestart", C), l.value.on("start", q), l.value.on("move", I), l.value.on("stop", ae);
  }, ie = () => {
    l.value && (l.value.destroy(), l.value = null);
  }, ue = () => {
    l.value && (Array.from(
      v.value ?? /* @__PURE__ */ new Set()
    ).forEach((k) => {
      $(k) || u.deselect(k);
    }), ie(), ee());
  }, Y = (S) => {
    F.value && (l.value?.clearSelection(), H(), F.value = !1);
    const k = S;
    !_.value.size && !F.value && !k?.ctrlKey && !k?.metaKey && (u.clearSelection(), l.value?.clearSelection());
  };
  return ve(() => {
    const S = (k) => {
      !k.buttons && y.value && (y.value = !1);
    };
    document.addEventListener("dragleave", S), ke(() => {
      document.removeEventListener("dragleave", S);
    });
  }), {
    isDragging: y,
    selectionStarted: F,
    explorerId: a,
    extractIds: h,
    cleanupSelection: g,
    refreshSelection: m,
    getSelectionRange: x,
    selectSelectionRange: te,
    initializeSelectionArea: ee,
    destroySelectionArea: ie,
    updateSelectionArea: ue,
    handleContentClick: Y
  };
}
const Hf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Nf(t, e) {
  return f(), w("svg", Hf, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Uf = { render: Nf }, Kf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function jf(t, e) {
  return f(), w("svg", Kf, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const qf = { render: jf }, Gt = /* @__PURE__ */ J({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (f(), w("div", null, [
      t.direction === "asc" ? (f(), R(i(Uf), { key: 0 })) : A("", !0),
      t.direction === "desc" ? (f(), R(i(qf), { key: 1 })) : A("", !0)
    ]));
  }
}), Wf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Gf(t, e) {
  return f(), w("svg", Wf, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Mn = { render: Gf }, Yf = { class: "vuefinder__drag-item__container" }, Qf = { class: "vuefinder__drag-item__count" }, Xf = /* @__PURE__ */ J({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, o) => (f(), w("div", Yf, [
      e.count > 1 ? (f(), R(i(Mn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : A("", !0),
      L(i(Mn), { class: "vuefinder__drag-item__icon" }),
      s("div", Qf, b(e.count), 1)
    ]));
  }
}), Jf = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, An = /* @__PURE__ */ J({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(t) {
    const e = t, n = Z(), o = j(n.config.state), l = {
      app: n,
      config: o.value,
      item: e.item
    };
    return (r, d) => (f(), w("div", {
      class: G(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      Fe(r.$slots, "icon", tt(nt(l)), () => [
        t.item.type === "dir" ? (f(), R(i(Ne), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (f(), R(i(yt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        t.ext && t.item.type !== "dir" && t.item.extension ? (f(), w("div", Jf, b(t.item.extension.substring(0, 3)), 1)) : A("", !0)
      ])
    ], 2));
  }
}), Zf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function ev(t, e) {
  return f(), w("svg", Zf, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const Pn = { render: ev }, tv = ["data-key", "data-row", "data-col", "draggable"], nv = { key: 0 }, ov = { class: "vuefinder__explorer__item-grid-content" }, sv = ["data-src", "alt"], iv = { class: "vuefinder__explorer__item-title" }, lv = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, av = { class: "vuefinder__explorer__item-list-name" }, rv = { class: "vuefinder__explorer__item-list-icon" }, dv = { class: "vuefinder__explorer__item-name" }, cv = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, uv = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, fv = { key: 0 }, vv = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, _v = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, o = e, l = Z(), r = l.fs, d = l.config, a = K(() => {
      const $ = l.selectionFilterType;
      return !$ || $ === "both" ? !0 : $ === "files" && n.item.type === "file" || $ === "dirs" && n.item.type === "dir";
    }), c = K(() => {
      const $ = l.selectionFilterMimeIncludes;
      return !$ || !$.length || n.item.type === "dir" ? !0 : n.item.mime_type ? $.some((x) => n.item.mime_type?.startsWith(x)) : !1;
    }), u = K(() => a.value && c.value), v = K(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : "",
      u.value ? "" : "vf-explorer-item--unselectable"
    ]), p = K(() => ({
      opacity: n.isDragging || r.isCut(n.item.path) || !u.value ? 0.5 : ""
    }));
    let _ = null;
    const y = E(null);
    let F = !1;
    const { enabled: T } = Oe(), h = K(() => T("move")), g = () => {
      _ && clearTimeout(_);
    }, m = ($) => {
      if (_ && ($.preventDefault(), clearTimeout(_)), !F)
        F = !0, o("click", $), y.value = setTimeout(() => {
          F = !1;
        }, 300);
      else
        return F = !1, o("dblclick", $), _ && clearTimeout(_), !1;
      if ($.currentTarget && $.currentTarget instanceof HTMLElement) {
        const x = $.currentTarget.getBoundingClientRect();
        $.preventDefault(), _ = setTimeout(() => {
          let P = x.y + x.height;
          P + 146 > window.innerHeight - 10 && (P = x.y - 146), P < 10 && (P = 10);
          const q = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: x.x,
            clientY: P
          });
          $.target?.dispatchEvent(q);
        }, 300);
      }
    };
    return ($, x) => (f(), w("div", {
      class: G(v.value),
      style: He(p.value),
      "data-key": t.item.path,
      "data-row": t.rowIndex,
      "data-col": t.colIndex,
      draggable: h.value,
      onTouchstart: x[1] || (x[1] = (C) => m(C)),
      onTouchend: x[2] || (x[2] = (C) => g()),
      onClick: x[3] || (x[3] = (C) => o("click", C)),
      onDblclick: x[4] || (x[4] = (C) => o("dblclick", C)),
      onContextmenu: x[5] || (x[5] = de((C) => o("contextmenu", C), ["prevent", "stop"])),
      onDragstart: x[6] || (x[6] = (C) => o("dragstart", C)),
      onDragend: x[7] || (x[7] = (C) => o("dragend", C))
    }, [
      t.view === "grid" ? (f(), w("div", nv, [
        i(r).isReadOnly(t.item) ? (f(), R(i(Pn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : A("", !0),
        s("div", ov, [
          (t.item.mime_type ?? "").startsWith("image") && t.showThumbnails ? (f(), w("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": i(l).adapter.getPreviewUrl({ path: t.item.path }),
            alt: t.item.basename,
            onTouchstart: x[0] || (x[0] = (C) => C.preventDefault())
          }, null, 40, sv)) : (f(), R(An, {
            key: 1,
            item: t.item,
            ext: !0
          }, {
            icon: X((C) => [
              Fe($.$slots, "icon", tt(nt(C)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        s("span", iv, b(i(Zt)(t.item.basename)), 1)
      ])) : (f(), w("div", lv, [
        s("div", av, [
          s("div", rv, [
            L(An, {
              item: t.item,
              small: t.compact
            }, {
              icon: X((C) => [
                Fe($.$slots, "icon", tt(nt(C)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          s("span", dv, b(t.item.basename), 1),
          s("div", null, [
            i(r).isReadOnly(t.item) ? (f(), R(i(Pn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : A("", !0)
          ])
        ]),
        t.showPath ? (f(), w("div", cv, b(t.item.path), 1)) : A("", !0),
        t.showPath ? A("", !0) : (f(), w("div", uv, [
          t.item.file_size ? (f(), w("div", fv, b(i(l).filesize(t.item.file_size)), 1)) : A("", !0)
        ])),
        !t.showPath && t.item.last_modified ? (f(), w("div", vv, b(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : A("", !0)
      ])),
      i(T)("pinned") && i(d).get("pinnedFolders").find((C) => C.path === t.item.path) ? (f(), R(i(sn), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : A("", !0)
    ], 46, tv));
  }
}), pv = ["data-row"], In = /* @__PURE__ */ J({
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
  setup(t, { emit: e }) {
    const n = t, o = e, l = K(() => [
      n.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), r = K(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${n.rowHeight}px`,
      transform: `translateY(${n.rowIndex * n.rowHeight}px)`
    })), d = K(() => n.view === "grid" ? {
      gridTemplateColumns: `repeat(${n.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (a, c) => (f(), w("div", {
      class: G(l.value),
      "data-row": t.rowIndex,
      style: He(r.value)
    }, [
      s("div", {
        class: G(["grid justify-self-start", { "w-full": t.view === "list" }]),
        style: He(d.value)
      }, [
        (f(!0), w(ce, null, _e(t.items, (u, v) => (f(), R(_v, Me({
          key: u.path,
          item: u,
          view: t.view,
          compact: t.compact,
          "show-thumbnails": t.showThumbnails,
          "show-path": t.showPath,
          "is-selected": t.isSelected(u.path),
          "is-dragging": t.isDraggingItem(u.path),
          "row-index": t.rowIndex,
          "col-index": v,
          "explorer-id": t.explorerId
        }, je(t.dragNDropEvents(u)), {
          onClick: c[0] || (c[0] = (p) => o("click", p)),
          onDblclick: c[1] || (c[1] = (p) => o("dblclick", p)),
          onContextmenu: c[2] || (c[2] = (p) => o("contextmenu", p)),
          onDragstart: c[3] || (c[3] = (p) => o("dragstart", p)),
          onDragend: c[4] || (c[4] = (p) => o("dragend", p))
        }), {
          icon: X((p) => [
            Fe(a.$slots, "icon", Me({ ref_for: !0 }, p))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, pv));
  }
}), mv = ["onClick"], hv = /* @__PURE__ */ J({
  __name: "Toast",
  setup(t) {
    const e = Z(), { getStore: n } = e.storage, o = E(n("full-screen", !1)), l = E([]), r = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", d = (c) => {
      l.value.splice(c, 1);
    }, a = (c) => {
      const u = l.value.findIndex((v) => v.id === c);
      u !== -1 && d(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      l.value = [];
    }), e.emitter.on("vf-toast-push", (c) => {
      const u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      c.id = u, l.value.push(c), setTimeout(() => {
        a(u);
      }, 5e3);
    }), (c, u) => (f(), w("div", {
      class: G([
        "vuefinder__toast",
        o.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"
      ])
    }, [
      L(Mo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: X(() => [
          (f(!0), w(ce, null, _e(l.value, (v, p) => (f(), w("div", {
            key: p,
            class: G(["vuefinder__toast__message", r(v.type)]),
            onClick: (_) => d(p)
          }, b(v.label), 11, mv))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), gv = { class: "vuefinder__explorer__container" }, wv = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, yv = {
  key: 0,
  class: "vuefinder__explorer__header"
}, bv = {
  key: 0,
  class: "vuefinder__linear-loader"
}, kv = /* @__PURE__ */ J({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(t) {
    const e = t, n = Z(), o = pt(n, ["vuefinder__drag-over"]), l = Ke("dragImage"), r = On(null), d = Ke("scrollContainer"), a = Ke("scrollContent"), c = n.fs, u = n.config, v = j(u.state), p = j(c.sort), _ = j(c.sortedFiles), y = j(c.selectedKeys), F = j(c.loading), T = (B) => y.value?.has(B) ?? !1;
    let h = null;
    const g = E(null), m = Ke("customScrollBar"), $ = Ke("customScrollBarContainer"), x = K(() => {
      const B = v.value.view, ne = v.value.compactListView;
      return B === "grid" ? 88 : ne ? 24 : 50;
    }), { t: C } = n.i18n, {
      itemsPerRow: z,
      totalHeight: P,
      visibleRows: q,
      handleScroll: I,
      getRowItems: H,
      getItemsInRange: te,
      getItemPosition: ae,
      updateItemsPerRow: ee
    } = Bf(
      K(() => _.value ?? []),
      {
        scrollContainer: d,
        itemWidth: 104,
        rowHeight: x,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: K(() => v.value.view === "list")
      }
    ), {
      explorerId: ie,
      isDragging: ue,
      initializeSelectionArea: Y,
      destroySelectionArea: S,
      updateSelectionArea: k,
      handleContentClick: D
    } = zf({
      getItemPosition: ae,
      getItemsInRange: te,
      getKey: (B) => B.path,
      selectionObject: r,
      rowHeight: x,
      itemWidth: 104
    }), M = E(null), N = (B) => {
      if (!B || !M.value) return !1;
      const ne = y.value?.has(M.value) ?? !1;
      return ue.value && (ne ? y.value?.has(B) ?? !1 : B === M.value);
    };
    re(
      () => u.get("view"),
      (B) => {
        B === "list" ? z.value = 1 : ee();
      },
      { immediate: !0 }
    ), re(z, (B) => {
      u.get("view") === "list" && B !== 1 && (z.value = 1);
    });
    const Q = (B) => _.value?.[B];
    ve(() => {
      if (Y(), r.value && r.value.on("beforestart", ({ event: B }) => {
        const ne = B?.target === a.value;
        if (!B?.metaKey && !B?.ctrlKey && !B?.altKey && !ne)
          return !1;
      }), d.value && (h = new zn({
        elements_selector: ".lazy",
        container: d.value
      })), re(() => [n.selectionFilterType, n.selectionFilterMimeIncludes], k, {
        deep: !0
      }), $.value) {
        const B = Mt(
          $.value,
          {
            scrollbars: { theme: "vf-scrollbars-theme" }
          },
          {
            initialized: (ne) => {
              g.value = ne;
            },
            scroll: (ne) => {
              const { scrollOffsetElement: oe } = ne.elements();
              d.value && d.value.scrollTo({
                top: oe.scrollTop,
                left: 0
              });
            }
          }
        );
        g.value = B;
      }
      d.value && d.value.addEventListener("scroll", () => {
        const B = g.value;
        if (!B) return;
        const { scrollOffsetElement: ne } = B.elements();
        ne.scrollTo({
          top: d.value.scrollTop,
          left: 0
        });
      });
    }), ve(() => {
      n.emitter.on("vf-refresh-thumbnails", () => {
        h && h.update();
      });
    }), Ao(() => {
      if (h && h.update(), g.value && m.value && d.value) {
        const ne = d.value.scrollHeight > d.value.clientHeight, oe = m.value;
        oe.style.display = ne ? "block" : "none", oe.style.height = `${P.value}px`;
      }
    }), ke(() => {
      S(), h && (h.destroy(), h = null), g.value && (g.value.destroy(), g.value = null);
    });
    const me = (B) => {
      const ne = B.target?.closest(".file-item-" + ie), oe = B;
      if (ne) {
        const le = String(ne.getAttribute("data-key")), O = _.value?.find(($e) => $e.path === le), V = n.selectionFilterType, U = n.selectionFilterMimeIncludes, W = !V || V === "both" || V === "files" && O?.type === "file" || V === "dirs" && O?.type === "dir";
        let he = !0;
        if (U && Array.isArray(U) && U.length > 0 && (O?.type === "dir" ? he = !0 : O?.mime_type ? he = U.some(($e) => (O?.mime_type).startsWith($e)) : he = !1), !W || !he)
          return;
        const xe = n.selectionMode || "multiple";
        !oe?.ctrlKey && !oe?.metaKey && (B.type !== "touchstart" || !c.isSelected(le)) && (c.clearSelection(), r.value?.clearSelection(!0, !0)), r.value?.resolveSelectables(), B.type === "touchstart" && c.isSelected(le) ? c.select(le, xe) : c.toggleSelect(le, xe);
      }
      c.setSelectedCount(y.value?.size || 0);
    }, fe = (B) => {
      if (B.type === "file" && e.onFileDclick) {
        n.emitter.emit("vf-file-dclick", B);
        return;
      }
      if (B.type === "dir" && e.onFolderDclick) {
        n.emitter.emit("vf-folder-dclick", B);
        return;
      }
      const ne = n.contextMenuItems?.find((oe) => oe.show(n, {
        items: [B],
        target: B,
        searchQuery: ""
      }));
      ne && ne.action(n, [B]);
    }, Be = (B) => {
      const ne = B.target?.closest(
        ".file-item-" + ie
      ), oe = ne ? String(ne.getAttribute("data-key")) : null;
      if (!oe) return;
      const le = _.value?.find((he) => he.path === oe), O = n.selectionFilterType, V = n.selectionFilterMimeIncludes, U = !O || O === "both" || O === "files" && le?.type === "file" || O === "dirs" && le?.type === "dir";
      let W = !0;
      V && Array.isArray(V) && V.length > 0 && (le?.type === "dir" ? W = !0 : le?.mime_type ? W = V.some((he) => (le?.mime_type).startsWith(he)) : W = !1), !(!U || !W) && le && fe(le);
    }, Ue = () => {
      const B = y.value;
      return _.value?.filter((ne) => B?.has(ne.path)) || [];
    }, Ze = (B) => {
      B.preventDefault();
      const ne = B.target?.closest(
        ".file-item-" + ie
      );
      if (ne) {
        const oe = String(ne.getAttribute("data-key")), le = _.value?.find((he) => he.path === oe), O = n.selectionFilterType, V = n.selectionFilterMimeIncludes, U = !O || O === "both" || O === "files" && le?.type === "file" || O === "dirs" && le?.type === "dir";
        let W = !0;
        if (V && Array.isArray(V) && V.length > 0 && (le?.type === "dir" ? W = !0 : le?.mime_type ? W = V.some(
          (he) => (le?.mime_type).startsWith(he)
        ) : W = !1), !U || !W)
          return;
        y.value?.has(oe) || (c.clearSelection(), c.select(oe)), n.emitter.emit("vf-contextmenu-show", {
          event: B,
          items: Ue(),
          target: le
        });
      }
    }, lt = (B) => {
      B.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: B, items: Ue() });
    }, mt = (B) => {
      if (!(n.features?.move ?? !1) || B.altKey || B.ctrlKey || B.metaKey)
        return B.preventDefault(), !1;
      ue.value = !0;
      const oe = B.target?.closest(
        ".file-item-" + ie
      );
      if (M.value = oe ? String(oe.dataset.key) : null, B.dataTransfer && M.value) {
        B.dataTransfer.setDragImage(l.value, 0, 15), B.dataTransfer.effectAllowed = "all", B.dataTransfer.dropEffect = "copy";
        const le = y.value?.has(M.value) ? Array.from(y.value) : [M.value];
        B.dataTransfer.setData("items", JSON.stringify(le)), c.setDraggedItem(M.value);
      }
    }, ht = () => {
      M.value = null;
    };
    return (B, ne) => (f(), w("div", gv, [
      s("div", {
        ref: "customScrollBarContainer",
        class: G(["vuefinder__explorer__scrollbar-container", [{ "grid-view": i(v).view === "grid" }]])
      }, [
        s("div", wv, null, 512)
      ], 2),
      i(v).view === "list" ? (f(), w("div", yv, [
        s("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
          onClick: ne[0] || (ne[0] = (oe) => i(c).toggleSort("basename"))
        }, [
          se(b(i(C)("Name")) + " ", 1),
          pe(L(Gt, {
            direction: i(p).order
          }, null, 8, ["direction"]), [
            [ze, i(p).active && i(p).column === "basename"]
          ])
        ]),
        s("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
          onClick: ne[1] || (ne[1] = (oe) => i(c).toggleSort("file_size"))
        }, [
          se(b(i(C)("Size")) + " ", 1),
          pe(L(Gt, {
            direction: i(p).order
          }, null, 8, ["direction"]), [
            [ze, i(p).active && i(p).column === "file_size"]
          ])
        ]),
        s("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
          onClick: ne[2] || (ne[2] = (oe) => i(c).toggleSort("last_modified"))
        }, [
          se(b(i(C)("Date")) + " ", 1),
          pe(L(Gt, {
            direction: i(p).order
          }, null, 8, ["direction"]), [
            [ze, i(p).active && i(p).column === "last_modified"]
          ])
        ])
      ])) : A("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: d,
        class: G(["vuefinder__explorer__selector-area", "scroller-" + i(ie)]),
        onScroll: ne[4] || (ne[4] = //@ts-ignore
        (...oe) => i(I) && i(I)(...oe))
      }, [
        i(u).get("loadingIndicator") === "linear" && i(F) ? (f(), w("div", bv)) : A("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: a,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: He({ height: `${i(P)}px`, position: "relative", width: "100%" }),
          onContextmenu: de(lt, ["self", "prevent"]),
          onClick: ne[3] || (ne[3] = de(
            //@ts-ignore
            (...oe) => i(D) && i(D)(...oe),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: l,
            class: "vuefinder__explorer__drag-item"
          }, [
            L(Xf, {
              count: M.value && i(y).has(M.value) ? i(y).size : 1
            }, null, 8, ["count"])
          ], 512),
          i(v).view === "grid" ? (f(!0), w(ce, { key: 0 }, _e(i(q), (oe) => (f(), R(In, {
            key: oe,
            "row-index": oe,
            "row-height": x.value,
            view: "grid",
            "items-per-row": i(z),
            items: i(H)(i(_), oe),
            "show-thumbnails": i(v).showThumbnails,
            "is-dragging-item": N,
            "is-selected": T,
            "drag-n-drop-events": (le) => i(o).events(le),
            "explorer-id": i(ie),
            onClick: me,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: mt,
            onDragend: ht
          }, {
            icon: X((le) => [
              Fe(B.$slots, "icon", Me({ ref_for: !0 }, le))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id"]))), 128)) : (f(!0), w(ce, { key: 1 }, _e(i(q), (oe) => (f(), R(In, {
            key: oe,
            "row-index": oe,
            "row-height": x.value,
            view: "list",
            items: Q(oe) ? [Q(oe)] : [],
            compact: i(v).compactListView,
            "is-dragging-item": N,
            "is-selected": T,
            "drag-n-drop-events": (le) => i(o).events(le),
            "explorer-id": i(ie),
            onClick: me,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: mt,
            onDragend: ht
          }, {
            icon: X((le) => [
              Fe(B.$slots, "icon", Me({ ref_for: !0 }, le))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id"]))), 128))
        ], 36)
      ], 34),
      L(hv)
    ]));
  }
}), xv = ["href", "download"], $v = ["onClick"], Cv = /* @__PURE__ */ J({
  __name: "ContextMenu",
  setup(t) {
    const e = Z(), n = E(null), o = E([]), l = Tt({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (c) => {
      o.value = c;
    });
    const r = (c) => c.link(e, o.value), d = (c) => {
      e.emitter.emit("vf-contextmenu-hide"), c.action(e, o.value);
    };
    e.emitter.on("vf-contextmenu-show", (c) => {
      const { event: u, items: v, target: p = null } = c || {};
      l.items = (e.contextMenuItems || []).filter((_) => _.show(e, {
        items: v,
        target: p
      })), p ? v.length > 1 && v.some((_) => _.path === p.path) ? e.emitter.emit("vf-context-selected", v) : e.emitter.emit("vf-context-selected", [p]) : e.emitter.emit("vf-context-selected", []), a(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      l.active = !1;
    });
    const a = (c) => {
      const u = e.root, v = u?.getBoundingClientRect?.(), p = u?.getBoundingClientRect?.();
      let _ = c.clientX - (v?.left ?? 0), y = c.clientY - (v?.top ?? 0);
      l.active = !0, Ae(() => {
        const F = n.value?.getBoundingClientRect(), T = F?.height ?? 0, h = F?.width ?? 0;
        _ = p && p.right - c.pageX + window.scrollX < h ? _ - h : _, y = p && p.bottom - c.pageY + window.scrollY < T ? y - T : y, l.positions = {
          left: String(_) + "px",
          top: String(y) + "px"
        };
      });
    };
    return (c, u) => pe((f(), w("ul", {
      ref_key: "contextmenu",
      ref: n,
      class: G([{
        "vuefinder__context-menu--active": l.active,
        "vuefinder__context-menu--inactive": !l.active
      }, "vuefinder__context-menu"]),
      style: He(l.positions)
    }, [
      (f(!0), w(ce, null, _e(l.items, (v) => (f(), w("li", {
        key: v.title,
        class: "vuefinder__context-menu__item"
      }, [
        v.link ? (f(), w("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: r(v),
          download: r(v),
          onClick: u[0] || (u[0] = (p) => i(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, b(v.title(i(e).i18n)), 1)
        ], 8, xv)) : (f(), w("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (p) => d(v)
        }, [
          s("span", null, b(v.title(i(e).i18n)), 1)
        ], 8, $v))
      ]))), 128))
    ], 6)), [
      [ze, l.active]
    ]);
  }
}), Sv = { class: "vuefinder__status-bar__wrapper" }, Fv = { class: "vuefinder__status-bar__storage" }, Dv = ["title"], Tv = { class: "vuefinder__status-bar__storage-icon" }, Ev = ["value"], Mv = ["value"], Av = { class: "vuefinder__status-bar__info space-x-2" }, Pv = { key: 0 }, Iv = { key: 1 }, Ov = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Lv = { class: "vuefinder__status-bar__actions" }, Rv = /* @__PURE__ */ J({
  __name: "Statusbar",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, l = j(o.sortedFiles), r = j(o.path), d = j(o.selectedCount), a = j(o.storages), c = j(o.selectedItems), u = j(o.path), v = (h) => {
      const g = h.target.value;
      e.adapter.open(g + "://");
    }, p = K(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((h, g) => h + (g.file_size || 0), 0)), _ = K(() => a.value), y = K(() => l.value), F = K(() => d.value || 0), T = K(() => c.value || []);
    return (h, g) => (f(), w("div", Sv, [
      s("div", Fv, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: i(n)("Storage")
        }, [
          s("div", Tv, [
            L(i(ln))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: i(r).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: v
          }, [
            (f(!0), w(ce, null, _e(_.value, (m) => (f(), w("option", {
              key: m,
              value: m
            }, b(m), 9, Mv))), 128))
          ], 40, Ev)
        ], 8, Dv),
        s("div", Av, [
          F.value === 0 ? (f(), w("span", Pv, b(y.value.length) + " " + b(i(n)("items")), 1)) : (f(), w("span", Iv, [
            se(b(F.value) + " " + b(i(n)("selected")) + " ", 1),
            p.value ? (f(), w("span", Ov, b(i(e).filesize(p.value)), 1)) : A("", !0)
          ]))
        ])
      ]),
      s("div", Lv, [
        Fe(h.$slots, "actions", {
          path: i(u).path,
          count: F.value || 0,
          selected: T.value
        })
      ])
    ]));
  }
}), Vv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Bv(t, e) {
  return f(), w("svg", Vv, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const zv = { render: Bv };
function $o(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Hv = { class: "vuefinder__folder-loader-indicator" }, Nv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Co = /* @__PURE__ */ J({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Po({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = Z(), o = Bn(t, "modelValue"), l = E(!1);
    re(
      () => o.value,
      () => r()
    );
    const r = async () => {
      l.value = !0;
      try {
        const a = (await n.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        $o(n.treeViewData, { path: e.path, type: "dir", folders: a });
      } catch (d) {
        console.error("Failed to fetch subfolders:", d);
      } finally {
        l.value = !1;
      }
    };
    return (d, a) => (f(), w("div", Hv, [
      l.value ? (f(), R(i(Rt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (f(), w("div", Nv, [
        o.value ? (f(), R(i(Lt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : A("", !0),
        o.value ? A("", !0) : (f(), R(i(Ot), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Uv = { key: 0 }, Kv = { class: "vuefinder__treesubfolderlist__no-folders" }, jv = { class: "vuefinder__treesubfolderlist__item-content" }, qv = ["onClick"], Wv = ["title", "onDblclick", "onClick"], Gv = { class: "vuefinder__treesubfolderlist__item-icon" }, Yv = { class: "vuefinder__treesubfolderlist__subfolder" }, Qv = /* @__PURE__ */ J({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = Z(), n = e.fs, o = pt(e, ["vuefinder__drag-over"]), l = E({}), { t: r } = e.i18n, d = j(n.path), a = t, c = E(null);
    ve(() => {
      a.path === a.storage + "://" && c.value && Mt(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const u = K(() => e.treeViewData.find((p) => p.path === a.path)?.folders || []);
    return (v, p) => {
      const _ = Rn("TreeSubfolderList", !0);
      return f(), w("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        u.value.length ? A("", !0) : (f(), w("li", Uv, [
          s("div", Kv, b(i(r)("No folders")), 1)
        ])),
        (f(!0), w(ce, null, _e(u.value, (y) => (f(), w("li", {
          key: y.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", jv, [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (F) => l.value[y.path] = !l.value[y.path]
            }, [
              L(Co, {
                modelValue: l.value[y.path],
                "onUpdate:modelValue": (F) => l.value[y.path] = F,
                storage: t.storage,
                path: y.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, qv),
            s("div", Me({
              class: "vuefinder__treesubfolderlist__item-link",
              title: y.path
            }, je(
              i(o).events({
                ...y,
                dir: y.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (F) => l.value[y.path] = !l.value[y.path],
              onClick: (F) => i(e).adapter.open(y.path)
            }), [
              s("div", Gv, [
                i(d)?.path === y.path ? (f(), R(i(an), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (f(), R(i(Ne), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              s("div", {
                class: G(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": i(d).path === y.path
                }])
              }, b(y.basename), 3)
            ], 16, Wv)
          ]),
          s("div", Yv, [
            pe(L(_, {
              storage: a.storage,
              path: y.path
            }, null, 8, ["storage", "path"]), [
              [ze, l.value[y.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Xv = /* @__PURE__ */ J({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(t) {
    const e = Z(), n = e.fs, o = E(!1), l = t, r = pt(e, ["vuefinder__drag-over"]), d = j(n.path), a = K(() => l.storage === d.value?.storage), c = {
      storage: l.storage,
      path: l.storage + "://",
      dir: l.storage + "://",
      type: "dir",
      basename: l.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function u(v) {
      v === d.value?.storage ? o.value = !o.value : e.adapter.open(v + "://");
    }
    return (v, p) => (f(), w(ce, null, [
      s("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: p[2] || (p[2] = (_) => u(t.storage))
      }, [
        s("div", Me({
          class: ["vuefinder__treestorageitem__info", a.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, je(i(r).events(c), !0)), [
          s("div", {
            class: G(["vuefinder__treestorageitem__icon", a.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            L(i(ln))
          ], 2),
          s("div", null, b(t.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: p[1] || (p[1] = de((_) => o.value = !o.value, ["stop"]))
        }, [
          L(Co, {
            modelValue: o.value,
            "onUpdate:modelValue": p[0] || (p[0] = (_) => o.value = _),
            storage: t.storage,
            path: t.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      pe(L(Qv, {
        storage: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ze, o.value]
      ])
    ], 64));
  }
}), Jv = { class: "vuefinder__folder-indicator" }, Zv = { class: "vuefinder__folder-indicator--icon" }, e_ = /* @__PURE__ */ J({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Bn(t, "modelValue");
    return (n, o) => (f(), w("div", Jv, [
      s("div", Zv, [
        e.value ? (f(), R(i(Lt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : A("", !0),
        e.value ? A("", !0) : (f(), R(i(Ot), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), t_ = {
  key: 0,
  class: "vuefinder__treeview__header"
}, n_ = { class: "vuefinder__treeview__pinned-label" }, o_ = { class: "vuefinder__treeview__pin-text text-nowrap" }, s_ = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, i_ = ["onClick"], l_ = ["title"], a_ = ["onClick"], r_ = { key: 0 }, d_ = { class: "vuefinder__treeview__no-pinned" }, c_ = /* @__PURE__ */ J({
  __name: "TreeView",
  setup(t) {
    const e = Z(), { enabled: n } = Oe(), { t: o } = e.i18n, { getStore: l, setStore: r } = e.storage, d = e.fs, a = e.config, c = j(a.state), u = j(d.sortedFiles), v = j(d.storages), p = K(() => v.value || []), _ = j(d.path), y = pt(e, ["vuefinder__drag-over"]), F = E(190), T = E(l("pinned-folders-opened", !0));
    re(T, ($) => r("pinned-folders-opened", $));
    const h = ($) => {
      const x = a.get("pinnedFolders");
      a.set("pinnedFolders", x.filter((C) => C.path !== $.path));
    }, g = ($) => {
      const x = $.clientX, C = $.target.parentElement;
      if (!C) return;
      const z = C.getBoundingClientRect().width;
      C.classList.remove("transition-[width]"), C.classList.add("transition-none");
      const P = (I) => {
        F.value = z + I.clientX - x, F.value < 50 && (F.value = 0, a.set("showTreeView", !1)), F.value > 50 && a.set("showTreeView", !0);
      }, q = () => {
        const I = C.getBoundingClientRect();
        F.value = I.width, C.classList.add("transition-[width]"), C.classList.remove("transition-none"), window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", q);
      };
      window.addEventListener("mousemove", P), window.addEventListener("mouseup", q);
    }, m = E(null);
    return ve(() => {
      m.value && Mt(m.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), re(u, ($) => {
      const x = $.filter((C) => C.type === "dir");
      $o(e.treeViewData, {
        path: _.value.path || "",
        folders: x.map((C) => ({
          storage: C.storage,
          path: C.path,
          basename: C.basename,
          type: "dir"
        }))
      });
    }), ($, x) => (f(), w(ce, null, [
      s("div", {
        class: G(["vuefinder__treeview__overlay", i(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: x[0] || (x[0] = (C) => i(a).toggle("showTreeView"))
      }, null, 2),
      s("div", {
        style: He(
          i(c).showTreeView ? "min-width:100px;max-width:75%; width: " + F.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: m,
          class: "vuefinder__treeview__scroll"
        }, [
          i(n)("pinned") ? (f(), w("div", t_, [
            s("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: x[2] || (x[2] = (C) => T.value = !T.value)
            }, [
              s("div", n_, [
                L(i(sn), { class: "vuefinder__treeview__pin-icon" }),
                s("div", o_, b(i(o)("Pinned Folders")), 1)
              ]),
              L(e_, {
                modelValue: T.value,
                "onUpdate:modelValue": x[1] || (x[1] = (C) => T.value = C)
              }, null, 8, ["modelValue"])
            ]),
            T.value ? (f(), w("ul", s_, [
              (f(!0), w(ce, null, _e(i(c).pinnedFolders, (C) => (f(), w("li", {
                key: C.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", Me({ class: "vuefinder__treeview__pinned-folder" }, je(i(y).events(C), !0), {
                  onClick: (z) => i(e).adapter.open(C.path)
                }), [
                  i(_).path !== C.path ? (f(), R(i(Ne), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : A("", !0),
                  i(_).path === C.path ? (f(), R(i(an), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : A("", !0),
                  s("div", {
                    title: C.path,
                    class: G(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": i(_).path === C.path
                    }])
                  }, b(C.basename), 11, l_)
                ], 16, i_),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (z) => h(C)
                }, [
                  L(i(zv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, a_)
              ]))), 128)),
              i(c).pinnedFolders.length ? A("", !0) : (f(), w("li", r_, [
                s("div", d_, b(i(o)("No folders pinned")), 1)
              ]))
            ])) : A("", !0)
          ])) : A("", !0),
          (f(!0), w(ce, null, _e(p.value, (C) => (f(), w("div", {
            key: C,
            class: "vuefinder__treeview__storage"
          }, [
            L(Xv, { storage: C }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        s("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: g
        }, null, 32)
      ], 4)
    ], 64));
  }
}), ye = {
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
function u_(t) {
  return t.items.length > 1 && t.items.some((e) => e.path === t.target?.path) ? "many" : t.target ? "one" : "none";
}
function ge(t) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    t
  );
  return (n, o) => !(e.needsSearchQuery !== !!o.searchQuery || e.target !== void 0 && e.target !== u_(o) || e.targetType !== void 0 && e.targetType !== o.target?.type || e.mimeType !== void 0 && e.mimeType !== o.target?.mime_type || e.feature !== void 0 && !(n.features[e.feature] ?? !1));
}
function rt(...t) {
  return (e, n) => t.some((o) => o(e, n));
}
function dt(...t) {
  return (e, n) => t.every((o) => o(e, n));
}
const So = [
  {
    id: ye.openDir,
    title: ({ t }) => t("Open containing folder"),
    action: (t, e) => {
      const n = e[0];
      n && t.adapter.open(n.dir);
    },
    show: ge({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: ye.refresh,
    title: ({ t }) => t("Refresh"),
    action: (t) => {
      const e = t.fs;
      t.adapter.invalidateListQuery(e.path.get().path), t.adapter.open(e.path.get().path);
    },
    show: rt(ge({ target: "none" }), ge({ target: "many" }))
  },
  {
    id: ye.selectAll,
    title: ({ t }) => t("Select All"),
    action: (t) => {
      t.fs.selectAll(t.selectionMode || "multiple");
    },
    show: (t, e) => t.selectionMode === "multiple" && ge({ target: "none" })(t, e)
  },
  {
    id: ye.new_folder,
    title: ({ t }) => t("New Folder"),
    action: (t) => t.modal.open(pn),
    show: ge({ target: "none", feature: "newfolder" })
  },
  {
    id: ye.open,
    title: ({ t }) => t("Open"),
    action: (t, e) => {
      e[0] && t.adapter.open(e[0].path);
    },
    show: ge({ target: "one", targetType: "dir" })
  },
  {
    id: ye.pinFolder,
    title: ({ t }) => t("Pin Folder"),
    action: (t, e) => {
      const n = t.config, o = n.get("pinnedFolders"), l = o.concat(
        e.filter(
          (r) => o.findIndex((d) => d.path === r.path) === -1
        )
      );
      n.set("pinnedFolders", l);
    },
    show: dt(ge({ target: "one", targetType: "dir", feature: "pinned" }), (t, e) => t.config.get("pinnedFolders").findIndex((l) => l.path === e.target?.path) === -1)
  },
  {
    id: ye.unpinFolder,
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      const n = t.config, o = n.get("pinnedFolders");
      n.set(
        "pinnedFolders",
        o.filter(
          (l) => !e.find((r) => r.path === l.path)
        )
      );
    },
    show: dt(ge({ target: "one", targetType: "dir", feature: "pinned" }), (t, e) => t.config.get("pinnedFolders").findIndex((l) => l.path === e.target?.path) !== -1)
  },
  {
    id: ye.preview,
    title: ({ t }) => t("Preview"),
    action: (t, e) => t.modal.open(It, { storage: e[0]?.storage, item: e[0] }),
    show: dt(
      ge({ target: "one", feature: "preview" }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: ye.download,
    link: (t, e) => {
      if (e[0])
        return t.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t }) => t("Download"),
    action: () => {
    },
    show: dt(
      ge({ target: "one", feature: "download" }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: ye.rename,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(Pt, { items: e }),
    show: ge({ target: "one", feature: "rename" })
  },
  {
    id: ye.move,
    title: ({ t }) => t("Move"),
    action: (t, e) => {
      const n = t.fs, o = {
        storage: n.path.get().storage || "",
        path: n.path.get().path || "",
        type: "dir"
      };
      t.modal.open(ot, { items: { from: e, to: o } });
    },
    show: rt(
      ge({ target: "one", feature: "move" }),
      ge({ target: "many", feature: "move" })
    )
  },
  {
    id: ye.copy,
    title: ({ t }) => t("Copy"),
    action: (t, e) => {
      e.length > 0 && t.fs.setClipboard("copy", new Set(e.map((n) => n.path)));
    },
    show: rt(
      ge({ target: "one", feature: "copy" }),
      ge({ target: "many", feature: "copy" })
    )
  },
  {
    id: ye.paste,
    title: ({ t }) => t("Paste"),
    action: (t, e) => {
      const n = t.fs.getClipboard();
      if (n?.items?.size > 0) {
        const l = t.fs.path.get();
        let r = l.path, d = l.storage;
        e.length === 1 && e[0]?.type === "dir" && (r = e[0].path, d = e[0].storage);
        const a = {
          storage: d || "",
          path: r || "",
          type: "dir"
        };
        t.modal.open(n.type === "cut" ? ot : dn, {
          items: { from: Array.from(n.items), to: a }
        });
      }
    },
    show: (t, e) => t.features?.copy ?? !1 ? t.fs.getClipboard()?.items?.size > 0 : !1
  },
  {
    id: ye.archive,
    title: ({ t }) => t("Archive"),
    action: (t, e) => t.modal.open(gn, { items: e }),
    show: rt(
      ge({ target: "many", feature: "archive" }),
      dt(
        ge({ target: "one", feature: "archive" }),
        (t, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: ye.unarchive,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(hn, { items: e }),
    show: ge({ target: "one", feature: "unarchive", mimeType: "application/zip" })
  },
  {
    id: ye.delete,
    title: ({ t }) => t("Delete"),
    action: (t, e) => {
      t.modal.open(At, { items: e });
    },
    show: rt(
      ge({ feature: "delete", target: "one" }),
      ge({ feature: "delete", target: "many" })
    )
  }
], f_ = ["data-theme"], v_ = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, __ = { class: "vuefinder__external-drop-message" }, p_ = { class: "vuefinder__main__content" }, m_ = /* @__PURE__ */ J({
  __name: "VueFinder",
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
  setup(t, { emit: e }) {
    const n = e, o = t, l = Z(), r = Ke("root"), d = l.config;
    re(
      () => o.features,
      (h) => {
        const g = Nn(h);
        Object.keys(l.features).forEach((m) => {
          delete l.features[m];
        }), Object.assign(l.features, g);
      },
      { deep: !0 }
    );
    const a = l.fs, c = j(d.state);
    hd();
    const { isDraggingExternal: u, handleDragEnter: v, handleDragOver: p, handleDragLeave: _, handleDrop: y } = gd();
    function F(h) {
      a.setPath(h.dirname), d.get("persist") && d.set("path", h.dirname), a.setReadOnly(h.read_only ?? !1), l.modal.close(), a.setFiles(h.files), a.clearSelection(), a.setSelectedCount(0), a.setStorages(h.storages);
    }
    l.adapter.onBeforeOpen = () => {
      a.setLoading(!0);
    }, l.adapter.onAfterOpen = (h) => {
      F(h), a.setLoading(!1);
    }, l.emitter.on("vf-upload-complete", (h) => {
      n("upload-complete", h);
    }), l.emitter.on("vf-delete-complete", (h) => {
      n("delete-complete", h);
    }), l.emitter.on("vf-file-dclick", (h) => {
      n("file-dclick", h);
    }), l.emitter.on("vf-folder-dclick", (h) => {
      n("folder-dclick", h);
    }), re(
      () => o.config?.theme,
      (h) => {
        h && d.set("theme", i(h));
      },
      { immediate: !0 }
    ), ve(() => {
      l.root = r.value, re(
        () => d.get("path"),
        (g) => {
          l.adapter.open(g);
        }
      );
      const h = d.get("persist") ? d.get("path") : d.get("initialPath") ?? "";
      a.setPath(h), l.adapter.open(h), a.path.listen((g) => {
        n("path-change", g.path);
      }), a.selectedItems.listen((g) => {
        n("select", g);
      }), n("ready");
    });
    const T = async (h) => {
      const g = await y(h);
      g.length > 0 && (l.modal.open(mn), setTimeout(() => {
        l.emitter.emit(
          "vf-external-files-dropped",
          g.map((m) => m.file)
        );
      }, 100));
    };
    return (h, g) => (f(), w("div", {
      ref_key: "root",
      ref: r,
      tabindex: "0",
      class: G(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": i(u) }]),
      "data-theme": i(l).theme.current,
      onDragenter: g[2] || (g[2] = //@ts-ignore
      (...m) => i(v) && i(v)(...m)),
      onDragover: g[3] || (g[3] = //@ts-ignore
      (...m) => i(p) && i(p)(...m)),
      onDragleave: g[4] || (g[4] = //@ts-ignore
      (...m) => i(_) && i(_)(...m)),
      onDrop: T
    }, [
      s("div", {
        class: G(i(l).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        s("div", {
          class: G([
            i(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: g[0] || (g[0] = (m) => i(l).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: g[1] || (g[1] = (m) => i(l).emitter.emit("vf-contextmenu-hide"))
        }, [
          i(u) ? (f(), w("div", v_, [
            s("div", __, b(i(l).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : A("", !0),
          L(Kc),
          L(qu),
          L(Vf),
          s("div", p_, [
            L(c_),
            L(kv, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: X((m) => [
                Fe(h.$slots, "icon", tt(nt(m)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          L(Rv, null, {
            actions: X((m) => [
              Fe(h.$slots, "status-bar", tt(nt(m)))
            ]),
            _: 3
          })
        ], 34),
        (f(), R(Et, { to: "body" }, [
          L(Io, { name: "fade" }, {
            default: X(() => [
              i(l).modal.visible ? (f(), R(Ln(i(l).modal.type), { key: 0 })) : A("", !0)
            ]),
            _: 1
          })
        ])),
        L(Cv, { items: i(So) }, null, 8, ["items"])
      ], 2)
    ], 42, f_));
  }
}), h_ = /* @__PURE__ */ J({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => So },
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
  setup(t) {
    const e = t, n = e.id ?? wt(Qt);
    if (!n)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const o = os(e, wt("VueFinderOptions") || {});
    return Uo(n, o), Oo(Qt, n), Vn(() => {
      Ko(n);
    }), (l, r) => (f(), R(m_, tt(nt(e)), null, 16));
  }
}), M_ = {
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    const [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", h_);
  }
};
export {
  ye as ContextMenuIds,
  E_ as LocalDriver,
  jn as RemoteDriver,
  h_ as VueFinder,
  M_ as VueFinderPlugin,
  h_ as VueFinderProvider,
  So as contextMenuItems,
  M_ as default
};
