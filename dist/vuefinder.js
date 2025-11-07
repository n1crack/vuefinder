import { inject as wt, reactive as Tt, watch as re, ref as E, shallowRef as zn, computed as j, markRaw as Mo, defineComponent as J, onMounted as fe, nextTick as Te, createElementBlock as y, openBlock as p, withKeys as ft, unref as a, createElementVNode as i, createCommentVNode as A, withModifiers as le, renderSlot as be, toDisplayString as k, createBlock as R, resolveDynamicComponent as Nn, withCtx as W, createVNode as L, Fragment as de, renderList as ve, createTextVNode as se, withDirectives as pe, vModelText as vt, onUnmounted as $e, useTemplateRef as je, resolveComponent as Un, normalizeClass as G, vModelCheckbox as tn, customRef as Io, Teleport as At, normalizeStyle as Ve, isRef as Oo, vModelSelect as Qt, onBeforeUnmount as Hn, vModelRadio as Wt, mergeProps as Ee, toHandlers as Ke, vShow as Be, normalizeProps as We, guardReactiveProps as Ge, TransitionGroup as Lo, onUpdated as Ro, mergeModels as Bo, useModel as jn, Transition as Vo, provide as zo } from "vue";
import No from "mitt";
import { persistentAtom as Uo } from "@nanostores/persistent";
import { atom as ke, computed as He } from "nanostores";
import { useStore as K } from "@nanostores/vue";
import { QueryClient as Ho } from "@tanstack/vue-query";
import jo from "@uppy/core";
import { Cropper as Ko } from "vue-advanced-cropper";
import Kn from "vanilla-lazyload";
import { OverlayScrollbars as Mt } from "overlayscrollbars";
import qo from "@viselect/vanilla";
import Wo from "@uppy/xhr-upload";
const nn = /* @__PURE__ */ new Map(), Xt = Symbol("ServiceContainerId");
function Go(n, e) {
  nn.set(n, e);
}
function Yo(n) {
  nn.delete(n);
}
function Z(n) {
  const e = wt(Xt);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = nn.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function Qo(n) {
  const e = localStorage.getItem(n + "_storage"), t = Tt(JSON.parse(e ?? "{}"));
  re(t, o);
  function o() {
    Object.keys(t).length ? localStorage.setItem(n + "_storage", JSON.stringify(t)) : localStorage.removeItem(n + "_storage");
  }
  function s(c, u) {
    t[c] = u;
  }
  function l(c) {
    delete t[c];
  }
  function d() {
    Object.keys(t).forEach((c) => l(c));
  }
  return { getStore: (c, u = null) => c in t ? t[c] : u, setStore: s, removeStore: l, clearStore: d };
}
async function Xo(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function Jo(n, e, t, o) {
  const { getStore: s, setStore: l } = n, d = E({}), r = E(s("locale", e)), c = (h, v = e) => {
    Xo(h, o).then((w) => {
      d.value = w, l("locale", h), r.value = h, l("translations", w), Object.values(o).length > 1 && (t.emit("vf-toast-push", { label: "The language is set to " + h }), t.emit("vf-language-saved"));
    }).catch((w) => {
      v ? (t.emit("vf-toast-push", {
        label: "The selected locale is not yet supported!",
        type: "error"
      }), c(v, null)) : (console.error(w), t.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  re(r, (h) => {
    c(h);
  }), !s("locale") && !Object.keys(o).length ? c(e) : d.value = s("translations");
  const u = (h, ...v) => v.length ? u(h = h.replace("%s", String(v.shift())), ...v) : h;
  function f(h, ...v) {
    return d.value && Object.prototype.hasOwnProperty.call(d.value, h) ? u(d.value[h] || h, ...v) : u(h, ...v);
  }
  return Tt({ t: f, locale: r });
}
const Zo = [
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
], qn = {
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
  advanced: Zo.reduce((n, e) => (n[e] = !0, n), {})
};
function bn() {
  return qn.advanced;
}
function Wn(n) {
  return n ? n === "simple" || n === "advanced" ? { ...qn[n] } : { ...bn(), ...n } : bn();
}
const es = "4.0.6";
function on(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1024, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Gn(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1e3, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function ts(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!o) return 0;
  const s = parseFloat(o[1] || "0"), l = (o[2] || "").toLowerCase(), d = e[l] ?? 0;
  return Math.round(s * Math.pow(1024, d));
}
function ns() {
  const n = zn(null), e = E(!1), t = E(), o = E(!1);
  return { visible: e, type: n, data: t, open: (r, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, n.value = r, t.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, n.value = null;
  }, setEditMode: (r) => {
    o.value = r;
  }, editMode: o };
}
const yt = {
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
  loadingIndicator: "circular",
  maxFileSize: null,
  pinnedFolders: []
}, bt = {
  initialPath: null
}, os = new Set(
  Object.keys(bt)
);
function ss(n) {
  return n || "light";
}
function Yn(n) {
  return os.has(n);
}
function xn(n) {
  const e = {}, t = {}, o = n;
  for (const s in o)
    if (Yn(s))
      t[s] = o[s];
    else if (s in yt) {
      const l = s, d = o[s];
      e[l] = d;
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function kn(n, e) {
  const t = { ...yt, ...n, ...e };
  return t.theme = ss(t.theme), t;
}
function $n(n, e) {
  return { ...bt, ...e, ...n };
}
const is = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, { persistenceConfig: o, nonPersistenceConfig: s } = xn(e), l = kn(
    o,
    yt
  ), d = $n(
    s,
    bt
  ), r = Uo(
    t,
    l,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = ke(d), u = He(
    [r, c],
    (_, g) => ({
      ..._,
      ...g
    })
  ), f = (_ = {}) => {
    const g = r.get(), m = c.get(), { persistenceConfig: b, nonPersistenceConfig: x } = xn(_), C = kn(b, g), V = $n(
      x,
      m
    );
    r.set(C), c.set(V);
  }, h = (_) => Yn(_) ? c.get()[_] : r.get()[_], v = () => ({
    ...r.get(),
    ...c.get()
  }), w = (_, g) => {
    const m = r.get();
    typeof _ == "object" && _ !== null ? r.set({ ...m, ..._ }) : r.set({
      ...m,
      [_]: g
    });
  };
  return {
    // Store atom (combined)
    state: u,
    // Methods
    init: f,
    get: h,
    set: w,
    toggle: (_) => {
      const g = r.get();
      w(_, !g[_]);
    },
    all: v,
    reset: () => {
      r.set({ ...yt }), c.set({ ...bt });
    }
  };
};
function as(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(n) || 0, o = Number(e) || 0;
  return t === o ? 0 : t < o ? -1 : 1;
}
const rs = () => {
  const n = ke(""), e = ke([]), t = ke(!1), o = ke([]), s = ke({ active: !1, column: "", order: "" }), l = ke({
    kind: "all",
    showHidden: !1
  }), d = ke(/* @__PURE__ */ new Set()), r = ke({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = ke(null), u = ke(0), f = ke(!1), h = ke([]), v = ke(-1), w = He([n], (M) => {
    const B = (M ?? "").trim(), N = B.indexOf("://"), X = N >= 0 ? B.slice(0, N) : "", he = (N >= 0 ? B.slice(N + 3) : B).split("/").filter(Boolean);
    let Fe = "";
    const Qe = he.map((De) => (Fe = Fe ? `${Fe}/${De}` : De, {
      basename: De,
      name: De,
      path: X ? `${X}://${Fe}` : Fe,
      type: "dir"
    }));
    return { storage: X, breadcrumb: Qe, path: B };
  }), S = He([o, s, l], (M, B, N) => {
    let X = M;
    N.kind === "files" ? X = X.filter((De) => De.type === "file") : N.kind === "folders" && (X = X.filter((De) => De.type === "dir")), N.showHidden || (X = X.filter((De) => !De.basename.startsWith(".")));
    const { active: _e, column: he, order: Fe } = B;
    if (!_e || !he) return X;
    const Qe = Fe === "asc" ? 1 : -1;
    return X.slice().sort((De, Ao) => as(De[he], Ao[he]) * Qe);
  }), F = He([o, d], (M, B) => B.size === 0 ? [] : M.filter((N) => B.has(N.path))), _ = (M, B) => {
    const N = n.get();
    if ((B ?? !0) && N !== M) {
      const X = h.get(), _e = v.get();
      _e < X.length - 1 && X.splice(_e + 1), X.length === 0 && N && X.push(N), X.push(M), h.set([...X]), v.set(X.length - 1);
    }
    n.set(M);
  }, g = (M) => {
    o.set(M ?? []);
  }, m = (M) => {
    e.set(M ?? []);
  }, b = (M, B) => {
    s.set({ active: !0, column: M, order: B });
  }, x = (M) => {
    const B = s.get();
    B.active && B.column === M ? s.set({
      active: B.order === "asc",
      column: M,
      order: "desc"
    }) : s.set({
      active: !0,
      column: M,
      order: "asc"
    });
  }, C = () => {
    s.set({ active: !1, column: "", order: "" });
  }, V = (M, B) => {
    l.set({ kind: M, showHidden: B });
  }, I = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, q = (M, B = "multiple") => {
    const N = new Set(d.get());
    B === "single" && N.clear(), N.add(M), d.set(N), u.set(N.size);
  }, O = (M) => {
    const B = new Set(d.get());
    B.delete(M), d.set(B), u.set(B.size);
  }, U = (M) => d.get().has(M), ne = (M, B = "multiple") => {
    const N = new Set(d.get());
    N.has(M) ? N.delete(M) : (B === "single" && N.clear(), N.add(M)), d.set(N), u.set(N.size);
  }, ae = (M = "multiple", B) => {
    if (M === "single") {
      const N = o.get()[0];
      if (N) {
        const X = N.path;
        d.set(/* @__PURE__ */ new Set([X])), u.set(1);
      }
    } else if (B?.selectionFilterType || B?.selectionFilterMimeIncludes && B.selectionFilterMimeIncludes.length > 0) {
      const N = o.get().filter((X) => {
        const _e = B.selectionFilterType, he = B.selectionFilterMimeIncludes;
        return _e === "files" && X.type === "dir" || _e === "dirs" && X.type === "file" ? !1 : he && Array.isArray(he) && he.length > 0 && X.type !== "dir" ? X.mime_type ? he.some((Fe) => X.mime_type?.startsWith(Fe)) : !1 : !0;
      }).map((X) => X.path);
      d.set(new Set(N)), u.set(N.length);
    } else {
      const N = new Set(o.get().map((X) => X.path));
      d.set(N), u.set(N.size);
    }
  }, ee = () => {
    d.set(/* @__PURE__ */ new Set()), u.set(0);
  }, ie = (M) => {
    const B = new Set(M ?? []);
    d.set(B), u.set(B.size);
  }, ce = (M) => {
    u.set(M);
  }, Y = (M) => {
    f.set(!!M);
  }, D = () => f.get(), $ = (M, B) => {
    const N = o.get().filter((X) => B.has(X.path));
    r.set({
      type: M,
      path: w.get().path,
      items: new Set(N)
    });
  }, P = (M) => He([r], (B) => B.type === "cut" && Array.from(B.items).some((N) => N.path === M)), T = (M) => He([r], (B) => B.type === "copy" && Array.from(B.items).some((N) => N.path === M)), H = (M) => {
    const B = P(M);
    return K(B).value ?? !1;
  }, Q = (M) => {
    const B = T(M);
    return K(B).value ?? !1;
  }, me = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ue = () => r.get(), Ne = (M) => {
    c.set(M);
  }, Ue = () => c.get(), tt = () => {
    c.set(null);
  }, nt = () => {
    const M = h.get(), B = v.get();
    if (B > 0) {
      const N = B - 1, X = M[N];
      X && (v.set(N), _(X, !1));
    }
  }, qt = () => {
    const M = h.get(), B = v.get();
    if (B < M.length - 1) {
      const N = B + 1, X = M[N];
      X && (v.set(N), _(X, !1));
    }
  }, ht = He([v], (M) => M > 0), _t = He(
    [h, v],
    (M, B) => B < M.length - 1
  );
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: n,
    sort: s,
    filter: l,
    selectedKeys: d,
    selectedCount: u,
    loading: f,
    draggedItem: c,
    clipboardItems: r,
    // Computed values
    path: w,
    sortedFiles: S,
    selectedItems: F,
    // Actions
    setPath: _,
    setFiles: g,
    setStorages: m,
    setSort: b,
    toggleSort: x,
    clearSort: C,
    setFilter: V,
    clearFilter: I,
    select: q,
    deselect: O,
    toggleSelect: ne,
    selectAll: ae,
    isSelected: U,
    clearSelection: ee,
    setSelection: ie,
    setSelectedCount: ce,
    setLoading: Y,
    isLoading: D,
    setClipboard: $,
    createIsCut: P,
    createIsCopied: T,
    isCut: H,
    isCopied: Q,
    clearClipboard: me,
    getClipboard: ue,
    setDraggedItem: Ne,
    getDraggedItem: Ue,
    clearDraggedItem: tt,
    setReadOnly: (M) => {
      t.set(M);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (M) => t.get() ? !0 : M.read_only ?? !1,
    // Navigation
    goBack: nt,
    goForward: qt,
    canGoBack: ht,
    canGoForward: _t,
    navigationHistory: h,
    historyIndex: v
  };
};
class sn {
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
      const [t, ...o] = e.split("://");
      return { storage: t, path: o.join("://") };
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
class Rp extends sn {
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
    const o = t.replace(/\/+$/g, "").replace(/^\/+/, ""), s = o.lastIndexOf("/");
    return s <= 0 ? this.combine("") : this.combine(o.slice(0, s));
  }
  join(e, t) {
    const { path: o } = this.split(e), s = (o ?? "").replace(/\/$/, ""), l = s ? `${s}/${t}` : t;
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
    return this.files.find((o) => o.storage === this.storage && o.path === t);
  }
  listChildren(e) {
    const t = e;
    return this.files.filter((o) => o.storage === this.storage && o.dir === t);
  }
  replaceAll(e) {
    this.files = e;
  }
  upsert(e) {
    const t = this.files.slice(), o = t.findIndex((s) => s.storage === this.storage && s.path === e.path);
    o === -1 ? t.push(e) : t[o] = e, this.replaceAll(t);
  }
  removeExact(e) {
    const t = this.files.filter((o) => !(o.storage === this.storage && o.path === e));
    this.replaceAll(t);
  }
  removeTree(e) {
    const t = [], o = [];
    for (const s of this.files) {
      if (s.storage !== this.storage) {
        o.push(s);
        continue;
      }
      s.path === e || s.path.startsWith(e + "/") ? t.push(s) : o.push(s);
    }
    return this.replaceAll(o), t;
  }
  makeDirEntry(e, t) {
    const o = this.join(e, t);
    return {
      storage: this.storage,
      dir: e,
      basename: t,
      extension: "",
      path: o,
      type: "dir",
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: "public"
    };
  }
  makeFileEntry(e, t, o = 0, s = null) {
    const l = this.join(e, t);
    return {
      storage: this.storage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: l,
      type: "file",
      file_size: o,
      last_modified: Date.now(),
      mime_type: s,
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
    const t = e?.path ?? this.combine(""), { path: o } = this.split(t), s = this.combine(o ?? ""), { storage: l } = this.split(s);
    return {
      storages: [l || ""],
      dirname: s,
      files: this.listChildren(s),
      read_only: this.readOnly
    };
  }
  async delete(e) {
    this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    const t = [];
    for (const s of e.items) {
      const l = this.findByPath(s.path);
      l && (l.type === "dir" ? t.push(...this.removeTree(l.path)) : (this.removeExact(l.path), t.push(l)), this.contentStore.delete(l.path));
    }
    return { ...this.resultForDir(e.path), deleted: t };
  }
  async rename(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.findByPath(e.path);
    if (!t) throw new Error("Item not found");
    const o = t.dir, s = this.join(o, e.name);
    if (t.type === "dir") {
      const l = t.path, d = s, r = this.files.map((c) => {
        if (c.storage !== this.storage) return c;
        if (c.path === l || c.path.startsWith(l + "/")) {
          const u = d + c.path.slice(l.length), f = this.parent(u);
          return this.cloneEntry(c, {
            path: u,
            dir: f,
            basename: c.path === l ? e.name : c.basename
          });
        }
        return c;
      });
      for (const [c, u] of Array.from(this.contentStore.entries()))
        if (c === l || c.startsWith(l + "/")) {
          this.contentStore.delete(c);
          const f = d + c.slice(l.length);
          this.contentStore.set(f, u);
        }
      this.replaceAll(r);
    } else {
      const l = this.cloneEntry(t, {
        path: s,
        dir: o,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(l);
      const d = this.contentStore.get(t.path);
      d !== void 0 && (this.contentStore.delete(t.path), this.contentStore.set(l.path, d));
    }
    return this.resultForDir(o);
  }
  uniqueName(e, t, o) {
    if (!o.has(this.join(e, t))) return t;
    const s = t.lastIndexOf("."), l = s > 0 ? t.slice(0, s) : t, d = s > 0 ? t.slice(s) : "";
    let r = 1;
    for (; ; ) {
      const c = `${l} copy ${r}${d}`, u = this.join(e, c);
      if (!o.has(u)) return c;
      r++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, o = new Set(this.files.map((d) => d.path)), s = [], l = (d, r) => {
      if (d.type === "dir") {
        const c = this.uniqueName(r, d.basename, o), u = this.makeDirEntry(r, c);
        o.add(u.path), s.push(u);
        const f = d.path + "/", h = this.files.filter(
          (v) => v.storage === this.storage && v.path.startsWith(f)
        );
        for (const v of h) {
          const w = v.path.slice(f.length), S = w.includes("/") ? w.slice(0, w.lastIndexOf("/")) : "", F = S ? this.join(u.path, S) : u.path;
          if (v.type === "dir")
            l(v, F);
          else {
            const _ = this.uniqueName(F, v.basename, o), g = this.makeFileEntry(
              F,
              _,
              v.file_size || 0,
              v.mime_type
            );
            s.push(g), o.add(g.path);
            const m = this.contentStore.get(v.path);
            m !== void 0 && this.contentStore.set(g.path, m);
          }
        }
      } else {
        const c = this.uniqueName(r, d.basename, o), u = this.makeFileEntry(r, c, d.file_size || 0, d.mime_type);
        s.push(u), o.add(u.path);
        const f = this.contentStore.get(d.path);
        f !== void 0 && this.contentStore.set(u.path, f);
      }
    };
    for (const d of e.sources) {
      const r = this.findByPath(d);
      r && l(r, t);
    }
    return this.replaceAll(this.files.concat(s)), this.resultForDir(t);
  }
  async move(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, o = new Set(this.files.map((d) => d.path));
    let s = this.files.slice();
    const l = (d, r) => {
      if (d.type === "dir") {
        const c = d.path, u = this.uniqueName(r, d.basename, o), f = this.join(r, u);
        s = s.map((v) => {
          if (v.storage !== this.storage) return v;
          if (v.path === c || v.path.startsWith(c + "/")) {
            const w = f + v.path.slice(c.length);
            return this.cloneEntry(v, {
              path: w,
              dir: this.parent(w),
              basename: v.path === c ? u : v.basename
            });
          }
          return v;
        });
        for (const [v, w] of Array.from(this.contentStore.entries()))
          if (v === c || v.startsWith(c + "/")) {
            this.contentStore.delete(v);
            const S = f + v.slice(c.length);
            this.contentStore.set(S, w);
          }
      } else {
        const c = this.uniqueName(r, d.basename, o), u = this.join(r, c);
        s = s.map(
          (h) => h === d ? this.cloneEntry(h, {
            path: u,
            dir: r,
            basename: c,
            extension: this.getExtension(c),
            last_modified: Date.now()
          }) : h
        );
        const f = this.contentStore.get(d.path);
        f !== void 0 && (this.contentStore.delete(d.path), this.contentStore.set(u, f));
      }
    };
    for (const d of e.sources) {
      const r = this.findByPath(d);
      r && l(r, t);
    }
    return this.replaceAll(s), this.resultForDir(t);
  }
  async archive(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, o = this.makeFileEntry(e.path, t, 0, "application/zip");
    return this.upsert(o), this.resultForDir(e.path);
  }
  async unarchive(e) {
    this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = this.findByPath(e.item);
    if (!t) throw new Error("Archive not found");
    const o = t.basename.replace(/\.zip$/i, ""), s = this.makeDirEntry(e.path, o);
    return this.upsert(s), this.resultForDir(e.path);
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
    const o = new Uint8Array(t);
    let s = "";
    for (let d = 0; d < o.length; d++) s += String.fromCharCode(o[d]);
    return { content: btoa(s), mimeType: this.findByPath(e.path)?.mime_type || void 0 };
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), o = e.path;
    return this.files.filter((s) => {
      if (s.storage !== this.storage) return !1;
      if (o) {
        if (e.deep) {
          if (!(s.path === o || s.path.startsWith(o + "/"))) return !1;
        } else if (s.dir !== o)
          return !1;
      }
      return s.basename.toLowerCase().includes(t) || s.path.toLowerCase().includes(t);
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
    e && e.on("upload-success", async (o) => {
      const s = t.getTargetPath(), l = o?.name || "file", d = o?.type || null, r = o?.data, c = o?.size || 0, u = this.makeFileEntry(s, l, c, d);
      if (this.upsert(u), r)
        try {
          const f = await r.arrayBuffer();
          this.contentStore.set(u.path, f);
        } catch {
          this.contentStore.set(u.path, "");
        }
      else
        this.contentStore.set(u.path, "");
    });
  }
}
class Qn extends sn {
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
      ...Qn.DEFAULT_URLS,
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
    const o = this.getHeaders();
    delete o["Content-Type"], e.use(Wo, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: o,
      formData: !0
    }), e.on("upload", () => {
      const s = t.getTargetPath();
      e.getFiles().forEach((d) => {
        e.setFileMeta(d.id, { path: s });
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
    const o = `${this.config.baseURL}${e}`, s = await fetch(o, {
      ...t,
      headers: {
        ...this.getHeaders(),
        ...t.headers
      }
    });
    if (!s.ok)
      try {
        const d = await s.json();
        throw new Error(
          d && (d.message || d.error) || `HTTP ${s.status}: ${s.statusText}`
        );
      } catch {
        const d = await s.text();
        throw new Error(d || `HTTP ${s.status}: ${s.statusText}`);
      }
    return (s.headers.get("content-type") || "").includes("application/json") ? await s.json() : await s.text();
  }
  async list(e) {
    const t = new URLSearchParams();
    e?.path && t.append("path", e.path);
    const o = t.toString() ? `${this.config.url.list}?${t.toString()}` : this.config.url.list;
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
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`;
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path }), o = `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`, s = await fetch(o, { headers: this.getHeaders() });
    if (!s.ok) throw new Error(`Failed to get content: ${s.statusText}`);
    return { content: await s.text(), mimeType: s.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${t.toString()}`;
  }
  async search(e) {
    const t = this.config.url.search, o = new URLSearchParams();
    e.path && o.set("path", e.path), e.filter && o.set("filter", e.filter), e.deep && o.set("deep", "1"), e.size && e.size !== "all" && o.set("size", e.size);
    const s = o.toString() ? `${t}?${o.toString()}` : t;
    return (await this.request(s, {
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
class Bp extends sn {
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
      const o = indexedDB.open(this.dbName, this.version);
      o.onerror = () => t(o.error), o.onsuccess = () => {
        this.db = o.result, e(this.db);
      }, o.onupgradeneeded = (s) => {
        const l = s.target.result;
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
    const o = t.replace(/\/+$/g, "").replace(/^\/+/, ""), s = o.lastIndexOf("/");
    return s <= 0 ? this.combine("") : this.combine(o.slice(0, s));
  }
  join(e, t) {
    const { path: o } = this.split(e), s = (o ?? "").replace(/\/$/, ""), l = s ? `${s}/${t}` : t;
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
    return new Promise((o, s) => {
      const r = t.transaction(["files"], "readonly").objectStore("files").get(e);
      r.onsuccess = () => {
        const c = r.result;
        c && c.storage === this.storage ? o(c) : o(void 0);
      }, r.onerror = () => s(r.error);
    });
  }
  async listChildren(e) {
    const t = await this.getDB();
    return new Promise((o, s) => {
      const c = t.transaction(["files"], "readonly").objectStore("files").index("dir").getAll(e);
      c.onsuccess = () => {
        const u = c.result.filter(
          (f) => f.storage === this.storage && f.dir === e
        );
        o(u);
      }, c.onerror = () => s(c.error);
    });
  }
  async getAllFiles() {
    const e = await this.getDB();
    return new Promise((t, o) => {
      const r = e.transaction(["files"], "readonly").objectStore("files").index("storage").getAll(this.storage);
      r.onsuccess = () => t(r.result), r.onerror = () => o(r.error);
    });
  }
  async upsert(e) {
    if (this.readOnly) throw new Error("Driver is read-only");
    const t = await this.getDB();
    return new Promise((o, s) => {
      const r = t.transaction(["files"], "readwrite").objectStore("files").put(e);
      r.onsuccess = () => o(), r.onerror = () => s(r.error);
    });
  }
  async removeExact(e) {
    if (this.readOnly) throw new Error("Driver is read-only");
    const t = await this.getDB();
    return new Promise((o, s) => {
      const l = t.transaction(["files", "content"], "readwrite"), d = l.objectStore("files"), r = l.objectStore("content"), c = d.delete(e);
      r.delete(e), c.onsuccess = () => o(), c.onerror = () => s(c.error);
    });
  }
  async removeTree(e) {
    if (this.readOnly) throw new Error("Driver is read-only");
    const t = await this.getAllFiles(), o = [];
    for (const l of t)
      l.storage === this.storage && (l.path === e || l.path.startsWith(e + "/")) && o.push(l);
    const s = await this.getDB();
    return new Promise((l, d) => {
      const r = s.transaction(["files", "content"], "readwrite"), c = r.objectStore("files"), u = r.objectStore("content");
      for (const f of o)
        c.delete(f.path), u.delete(f.path);
      r.oncomplete = () => l(o), r.onerror = () => d(r.error);
    });
  }
  makeDirEntry(e, t) {
    const o = this.join(e, t);
    return {
      storage: this.storage,
      dir: e,
      basename: t,
      extension: "",
      path: o,
      type: "dir",
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: "public"
    };
  }
  makeFileEntry(e, t, o = 0, s = null) {
    const l = this.join(e, t);
    return {
      storage: this.storage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: l,
      type: "file",
      file_size: o,
      last_modified: Date.now(),
      mime_type: s,
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
    const t = e?.path ?? this.combine(""), { path: o } = this.split(t), s = this.combine(o ?? ""), { storage: l } = this.split(s), d = await this.listChildren(s);
    return {
      storages: [l || ""],
      dirname: s,
      files: d,
      read_only: this.readOnly
    };
  }
  async delete(e) {
    this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    const t = [];
    for (const s of e.items) {
      const l = await this.findByPath(s.path);
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
    const o = t.dir, s = this.join(o, e.name);
    if (t.type === "dir") {
      const l = await this.getAllFiles(), d = t.path, r = s;
      for (const c of l)
        if (c.storage === this.storage && (c.path === d || c.path.startsWith(d + "/"))) {
          const u = r + c.path.slice(d.length), f = this.parent(u), h = this.cloneEntry(c, {
            path: u,
            dir: f,
            basename: c.path === d ? e.name : c.basename,
            last_modified: Date.now()
          });
          await this.upsert(h);
          const w = (await this.getDB()).transaction(["content"], "readwrite"), S = w.objectStore("content"), F = S.get(c.path);
          F.onsuccess = () => {
            const _ = F.result;
            _ && (S.delete(c.path), S.put({ path: u, content: _.content }));
          }, await new Promise((_) => {
            w.oncomplete = () => _(void 0);
          }), c.path !== u && await this.removeExact(c.path);
        }
    } else {
      const l = this.cloneEntry(t, {
        path: s,
        dir: o,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      await this.upsert(l);
      const r = (await this.getDB()).transaction(["content"], "readwrite"), c = r.objectStore("content"), u = c.get(t.path);
      u.onsuccess = () => {
        const f = u.result;
        f && (c.delete(t.path), c.put({ path: s, content: f.content }));
      }, await new Promise((f) => {
        r.oncomplete = () => f(void 0);
      }), await this.removeExact(t.path);
    }
    return this.resultForDir(o);
  }
  async uniqueName(e, t, o) {
    const s = this.join(e, t);
    if (!o.has(s)) return t;
    const l = t.lastIndexOf("."), d = l > 0 ? t.slice(0, l) : t, r = l > 0 ? t.slice(l) : "";
    let c = 1;
    for (; ; ) {
      const u = `${d} copy ${c}${r}`, f = this.join(e, u);
      if (!o.has(f)) return u;
      c++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, o = await this.getAllFiles(), s = new Set(o.map((d) => d.path)), l = async (d, r) => {
      if (d.type === "dir") {
        const c = await this.uniqueName(r, d.basename, s), u = this.makeDirEntry(r, c);
        s.add(u.path), await this.upsert(u);
        const f = d.path + "/", h = o.filter(
          (v) => v.storage === this.storage && v.path.startsWith(f)
        );
        for (const v of h) {
          const w = v.path.slice(f.length), S = w.includes("/") ? w.slice(0, w.lastIndexOf("/")) : "", F = S ? this.join(u.path, S) : u.path;
          if (v.type === "dir")
            await l(v, F);
          else {
            const _ = await this.uniqueName(F, v.basename, s), g = this.makeFileEntry(
              F,
              _,
              v.file_size || 0,
              v.mime_type
            );
            s.add(g.path), await this.upsert(g);
            const b = (await this.getDB()).transaction(["content"], "readwrite"), x = b.objectStore("content"), C = x.get(v.path);
            C.onsuccess = () => {
              const V = C.result;
              V && x.put({ path: g.path, content: V.content });
            }, await new Promise((V) => {
              b.oncomplete = () => V(void 0);
            });
          }
        }
      } else {
        const c = await this.uniqueName(r, d.basename, s), u = this.makeFileEntry(r, c, d.file_size || 0, d.mime_type);
        s.add(u.path), await this.upsert(u);
        const h = (await this.getDB()).transaction(["content"], "readwrite"), v = h.objectStore("content"), w = v.get(d.path);
        w.onsuccess = () => {
          const S = w.result;
          S && v.put({ path: u.path, content: S.content });
        }, await new Promise((S) => {
          h.oncomplete = () => S(void 0);
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
    const t = e.destination, o = await this.getAllFiles(), s = new Set(o.map((d) => d.path)), l = async (d, r) => {
      if (d.type === "dir") {
        const c = d.path, u = await this.uniqueName(r, d.basename, s), f = this.join(r, u), h = o.filter(
          (v) => v.storage === this.storage && (v.path === c || v.path.startsWith(c + "/"))
        );
        for (const v of h) {
          const w = f + v.path.slice(c.length), S = this.parent(w), F = this.cloneEntry(v, {
            path: w,
            dir: S,
            basename: v.path === c ? u : v.basename,
            last_modified: Date.now()
          });
          await this.upsert(F);
          const g = (await this.getDB()).transaction(["content"], "readwrite"), m = g.objectStore("content"), b = m.get(v.path);
          b.onsuccess = () => {
            const x = b.result;
            x && (m.delete(v.path), m.put({ path: w, content: x.content }));
          }, await new Promise((x) => {
            g.oncomplete = () => x(void 0);
          }), v.path !== w && await this.removeExact(v.path);
        }
      } else {
        const c = await this.uniqueName(r, d.basename, s), u = this.join(r, c), f = this.cloneEntry(d, {
          path: u,
          dir: r,
          basename: c,
          extension: this.getExtension(c),
          last_modified: Date.now()
        });
        await this.upsert(f);
        const v = (await this.getDB()).transaction(["content"], "readwrite"), w = v.objectStore("content"), S = w.get(d.path);
        S.onsuccess = () => {
          const F = S.result;
          F && (w.delete(d.path), w.put({ path: u, content: F.content }));
        }, await new Promise((F) => {
          v.oncomplete = () => F(void 0);
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
    const t = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, o = this.makeFileEntry(e.path, t, 0, "application/zip");
    return await this.upsert(o), this.resultForDir(e.path);
  }
  async unarchive(e) {
    this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = await this.findByPath(e.item);
    if (!t) throw new Error("Archive not found");
    const o = t.basename.replace(/\.zip$/i, ""), s = this.makeDirEntry(e.path, o);
    return await this.upsert(s), this.resultForDir(e.path);
  }
  async createFile(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.makeFileEntry(e.path, e.name, 0, null);
    await this.upsert(t);
    const s = (await this.getDB()).transaction(["content"], "readwrite");
    return s.objectStore("content").put({ path: t.path, content: "" }), await new Promise((d) => {
      s.oncomplete = () => d(void 0);
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
    return new Promise((o, s) => {
      const r = t.transaction(["content"], "readonly").objectStore("content").get(e.path);
      r.onsuccess = async () => {
        const c = r.result, u = await this.findByPath(e.path);
        if (c && c.content) {
          const f = c.content;
          if (typeof f == "string")
            o({
              content: f,
              mimeType: u?.mime_type || void 0
            });
          else {
            const h = new Uint8Array(f);
            let v = "";
            for (let S = 0; S < h.length; S++) v += String.fromCharCode(h[S]);
            const w = btoa(v);
            o({
              content: w,
              mimeType: u?.mime_type || void 0
            });
          }
        } else
          o({
            content: "",
            mimeType: u?.mime_type || void 0
          });
      }, r.onerror = () => s(r.error);
    });
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), o = e.path;
    return (await this.getAllFiles()).filter((l) => {
      if (l.storage !== this.storage) return !1;
      if (o) {
        if (e.deep) {
          if (!(l.path === o || l.path.startsWith(o + "/"))) return !1;
        } else if (l.dir !== o)
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
    const o = this.cloneEntry(t, {
      file_size: e.content.length,
      last_modified: Date.now()
    });
    await this.upsert(o);
    const l = (await this.getDB()).transaction(["content"], "readwrite");
    return l.objectStore("content").put({ path: e.path, content: e.content }), await new Promise((r) => {
      l.oncomplete = () => r(void 0);
    }), e.path;
  }
  configureUploader(e, t) {
    e && e.on("upload-success", async (o) => {
      const s = t.getTargetPath(), l = o?.name || "file", d = o?.type || null, r = o?.data, c = o?.size || 0, u = this.makeFileEntry(s, l, c, d);
      if (await this.upsert(u), r)
        try {
          const f = await r.arrayBuffer(), v = (await this.getDB()).transaction(["content"], "readwrite");
          v.objectStore("content").put({ path: u.path, content: f }), await new Promise((S) => {
            v.oncomplete = () => S(void 0);
          });
        } catch {
          const h = (await this.getDB()).transaction(["content"], "readwrite");
          h.objectStore("content").put({ path: u.path, content: "" }), await new Promise((w) => {
            h.oncomplete = () => w(void 0);
          });
        }
      else {
        const h = (await this.getDB()).transaction(["content"], "readwrite");
        h.objectStore("content").put({ path: u.path, content: "" }), await new Promise((w) => {
          h.oncomplete = () => w(void 0);
        });
      }
    });
  }
}
const Sn = {
  list: (n) => ["adapter", "list", n],
  search: (n, e, t, o) => ["adapter", "search", n, e, t, o],
  delete: (n) => ["adapter", "delete", n],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class ls {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new Ho({
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
    const t = Sn.list(e);
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
    const t = Sn.search(e.path, e.filter, e.deep, e.size);
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
function ds(n) {
  const e = K(n.state);
  return {
    current: j(() => e.value.theme || "light"),
    set: (s) => {
      n.set("theme", s);
    }
  };
}
const cs = (n, e) => {
  const t = Qo(n.id ?? "vf"), o = No(), s = e.i18n, l = n.locale ?? e.locale, d = is(n.id ?? "vf", n.config ?? {}), r = rs();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new ls(n.driver);
  return Tt({
    // app version
    version: es,
    // config store
    config: d,
    // Theme
    theme: (() => {
      const u = ds(d);
      return {
        current: u.current,
        set: u.set
      };
    })(),
    // files store
    fs: r,
    // root element
    root: null,
    // app id
    debug: n.debug ?? !1,
    // Event Bus
    emitter: o,
    // storage
    storage: t,
    // localization object
    i18n: Jo(
      t,
      l,
      o,
      s
    ),
    // modal state
    modal: ns(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Mo(c),
    // active features
    features: Wn(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: j(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: j(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: d.get("metricUnits") ? Gn : on,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // expose custom uploader if provided
    customUploader: n.customUploader
  });
}, us = ["data-theme"], fs = { class: "vuefinder__modal-layout__container" }, vs = { class: "vuefinder__modal-layout__content" }, ps = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, ms = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, hs = { class: "vuefinder__modal-drag-message" }, Ce = /* @__PURE__ */ J({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(n) {
    const e = E(null), t = Z();
    t.config;
    const o = n;
    fe(() => {
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
    const s = (l) => {
      l.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (l.preventDefault(), l.stopPropagation());
    };
    return (l, d) => (p(), y("div", {
      "data-theme": a(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: d[1] || (d[1] = ft((r) => a(t).modal.close(), ["esc"]))
    }, [
      d[2] || (d[2] = i("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      i("div", fs, [
        i("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: s,
          onMousedown: d[0] || (d[0] = le((r) => a(t).modal.close(), ["self"]))
        }, [
          i("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            i("div", vs, [
              be(l.$slots, "default")
            ]),
            l.$slots.buttons ? (p(), y("div", ps, [
              be(l.$slots, "buttons")
            ])) : A("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (p(), y("div", ms, [
        i("div", hs, k(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : A("", !0)
    ], 40, us));
  }
}), _s = { class: "vuefinder__modal-header" }, gs = { class: "vuefinder__modal-header__icon-container" }, ws = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Pe = /* @__PURE__ */ J({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (p(), y("div", _s, [
      i("div", gs, [
        (p(), R(Nn(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      i("div", ws, k(n.title), 1)
    ]));
  }
}), ys = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function bs(n, e) {
  return p(), y("svg", ys, [...e[0] || (e[0] = [
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
const Xn = { render: bs }, xs = { class: "vuefinder__about-modal__content" }, ks = { class: "vuefinder__about-modal__main" }, $s = { class: "vuefinder__about-modal__tab-content" }, Ss = { class: "vuefinder__about-modal__lead" }, Cs = { class: "vuefinder__about-modal__description" }, Fs = { class: "vuefinder__about-modal__links" }, Ds = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Ps = { class: "vuefinder__about-modal__meta" }, Es = { class: "vuefinder__about-modal__meta-item" }, Ts = { class: "vuefinder__about-modal__meta-label" }, As = { class: "vuefinder__about-modal__meta-value" }, Ms = { class: "vuefinder__about-modal__meta-item" }, Is = { class: "vuefinder__about-modal__meta-label" }, Jn = /* @__PURE__ */ J({
  __name: "ModalAbout",
  setup(n) {
    const e = Z(), { t } = e.i18n;
    return (o, s) => (p(), R(Ce, null, {
      buttons: W(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: s[0] || (s[0] = (l) => a(e).modal.close())
        }, k(a(t)("Close")), 1)
      ]),
      default: W(() => [
        i("div", xs, [
          L(Pe, {
            icon: a(Xn),
            title: "Vuefinder " + a(e).version
          }, null, 8, ["icon", "title"]),
          i("div", ks, [
            i("div", $s, [
              i("div", Ss, k(a(t)("A modern, customizable file manager component built for Vue.")), 1),
              i("div", Cs, k(a(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              i("div", Fs, [
                i("a", Ds, k(a(t)("Project Home")), 1),
                s[1] || (s[1] = i("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              i("div", Ps, [
                i("div", Es, [
                  i("span", Ts, k(a(t)("Version")), 1),
                  i("span", As, k(a(e).version), 1)
                ]),
                i("div", Ms, [
                  i("span", Is, k(a(t)("License")), 1),
                  s[2] || (s[2] = i("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Os = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ls(n, e) {
  return p(), y("svg", Os, [...e[0] || (e[0] = [
    i("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Zn = { render: Ls }, Rs = { class: "vuefinder__delete-modal__content" }, Bs = { class: "vuefinder__delete-modal__form" }, Vs = { class: "vuefinder__delete-modal__description" }, zs = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Ns = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Us = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hs = { class: "vuefinder__delete-modal__file-name" }, js = { class: "vuefinder__delete-modal__warning" }, It = /* @__PURE__ */ J({
  __name: "ModalDelete",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = E(e.modal.data.items), d = E(""), r = () => {
      console.log(
        l.value.map(({ path: c, type: u }) => ({ path: c, type: u }))
      ), l.value.length && e.adapter.delete({
        path: s.value.path,
        items: l.value.map(({ path: c, type: u }) => ({
          path: c,
          type: u
        }))
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: t("Files deleted.") }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: t(c.message), type: "error" });
      });
    };
    return (c, u) => (p(), R(Ce, null, {
      buttons: W(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          onClick: r
        }, k(a(t)("Yes, Delete!")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[1] || (u[1] = (f) => a(e).modal.close())
        }, k(a(t)("Cancel")), 1),
        i("div", js, k(a(t)("This action cannot be undone.")), 1)
      ]),
      default: W(() => [
        i("div", null, [
          L(Pe, {
            icon: a(Zn),
            title: a(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          i("div", Rs, [
            i("div", Bs, [
              i("p", Vs, k(a(t)("Are you sure you want to delete these files?")), 1),
              i("div", zs, [
                (p(!0), y(de, null, ve(l.value, (f) => (p(), y("p", {
                  key: f.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  f.type === "dir" ? (p(), y("svg", Ns, [...u[2] || (u[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (p(), y("svg", Us, [...u[3] || (u[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Hs, k(f.basename), 1)
                ]))), 128))
              ]),
              d.value.length ? (p(), R(a(d), {
                key: 0,
                error: "",
                onHidden: u[0] || (u[0] = (f) => d.value = "")
              }, {
                default: W(() => [
                  se(k(d.value), 1)
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
}), Ks = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function qs(n, e) {
  return p(), y("svg", Ks, [...e[0] || (e[0] = [
    i("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const eo = { render: qs }, Ws = { class: "vuefinder__rename-modal__content" }, Gs = { class: "vuefinder__rename-modal__item" }, Ys = { class: "vuefinder__rename-modal__item-info" }, Qs = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xs = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Js = { class: "vuefinder__rename-modal__item-name" }, Ot = /* @__PURE__ */ J({
  __name: "ModalRename",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = E(e.modal.data.items[0]), d = E(l.value.basename), r = E(""), c = () => {
      d.value != l.value.basename && e.adapter.rename({
        path: s.value.path,
        item: l.value.path,
        name: d.value
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: t("%s is renamed.", d.value) }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: t(u.message), type: "error" });
      });
    };
    return (u, f) => (p(), R(Ce, null, {
      buttons: W(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, k(a(t)("Rename")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[2] || (f[2] = (h) => a(e).modal.close())
        }, k(a(t)("Cancel")), 1)
      ]),
      default: W(() => [
        i("div", null, [
          L(Pe, {
            icon: a(eo),
            title: a(t)("Rename")
          }, null, 8, ["icon", "title"]),
          i("div", Ws, [
            i("div", Gs, [
              i("p", Ys, [
                l.value.type === "dir" ? (p(), y("svg", Qs, [...f[3] || (f[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (p(), y("svg", Xs, [...f[4] || (f[4] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", Js, k(l.value.basename), 1)
              ]),
              pe(i("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (h) => d.value = h),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: ft(c, ["enter"])
              }, null, 544), [
                [vt, d.value]
              ]),
              r.value.length ? (p(), R(a(r), {
                key: 0,
                error: "",
                onHidden: f[1] || (f[1] = (h) => r.value = "")
              }, {
                default: W(() => [
                  se(k(r.value), 1)
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
function Ie() {
  const n = Z(), e = j(() => n.features);
  return {
    enabled: (o) => e.value[o] ?? !1
  };
}
const Zs = { class: "vuefinder__text-preview" }, ei = { class: "vuefinder__text-preview__header" }, ti = ["title"], ni = { class: "vuefinder__text-preview__actions" }, oi = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, si = { key: 1 }, ii = /* @__PURE__ */ J({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = E(""), s = E(""), l = E(null), d = E(!1), r = E(""), c = E(!1), u = Z(), { enabled: f } = Ie(), { t: h } = u.i18n;
    fe(async () => {
      try {
        const S = await u.adapter.getContent({ path: u.modal.data.item.path });
        o.value = S.content, t("success");
      } catch (S) {
        console.error("Failed to load text content:", S), t("success");
      }
    });
    const v = () => {
      d.value = !d.value, s.value = o.value, u.modal.setEditMode(d.value);
    }, w = async () => {
      r.value = "", c.value = !1;
      try {
        const S = u.modal.data.item.path;
        await u.adapter.save({
          path: S,
          content: s.value
        }), o.value = s.value, r.value = h("Updated."), t("success"), d.value = !d.value;
      } catch (S) {
        const F = S;
        r.value = h(F.message || "Error"), c.value = !0;
      }
    };
    return (S, F) => (p(), y("div", Zs, [
      i("div", ei, [
        i("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: a(u).modal.data.item.path
        }, k(a(u).modal.data.item.basename), 9, ti),
        i("div", ni, [
          d.value ? (p(), y("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: w
          }, k(a(h)("Save")), 1)) : A("", !0),
          a(f)("edit") ? (p(), y("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: F[0] || (F[0] = (_) => v())
          }, k(d.value ? a(h)("Cancel") : a(h)("Edit")), 1)) : A("", !0)
        ])
      ]),
      i("div", null, [
        d.value ? (p(), y("div", si, [
          pe(i("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": F[1] || (F[1] = (_) => s.value = _),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [vt, s.value]
          ])
        ])) : (p(), y("pre", oi, k(o.value), 1)),
        r.value.length ? (p(), R(a(r), {
          key: 2,
          error: c.value,
          onHidden: F[2] || (F[2] = (_) => r.value = "")
        }, {
          default: W(() => [
            se(k(r.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : A("", !0)
      ])
    ]));
  }
}), an = async (n, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((o) => {
        e.file(o);
      });
      n(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader(), o = await new Promise((s) => {
        t.readEntries(s);
      });
      for (const s of o)
        await an(n, s);
    }
  }
}, we = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function to(n) {
  const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = e.config, d = E({ QUEUE_ENTRY_STATUS: we }), r = E(null), c = E(null), u = E(null), f = E(null), h = E(null), v = E([]), w = E(""), S = E(!1), F = E(!1), _ = E(null);
  let g;
  const m = (D) => {
    D.preventDefault(), D.stopPropagation(), F.value = !0;
  }, b = (D) => {
    D.preventDefault(), D.stopPropagation(), F.value = !0;
  }, x = (D) => {
    D.preventDefault(), D.stopPropagation(), (!D.relatedTarget || D.relatedTarget === document.body) && (F.value = !1);
  }, C = (D) => {
    D.preventDefault(), D.stopPropagation(), F.value = !1;
    const $ = /^[/\\](.+)/, P = D.dataTransfer;
    P && (P.items && P.items.length ? Array.from(P.items).forEach((T) => {
      if (T.kind === "file") {
        const H = T.webkitGetAsEntry?.();
        if (H)
          an((Q, me) => {
            const ue = $.exec(Q?.fullPath || "");
            I(me, ue ? ue[1] : me.name);
          }, H);
        else {
          const Q = T.getAsFile?.();
          Q && I(Q);
        }
      }
    }) : P.files && P.files.length && Array.from(P.files).forEach((T) => I(T)));
  }, V = (D) => v.value.findIndex(($) => $.id === D), I = (D, $) => g.addFile({ name: $ || D.name, type: D.type, data: D, source: "Local" }), q = (D) => D.status === we.DONE ? "text-green-600" : D.status === we.ERROR || D.status === we.CANCELED ? "text-red-600" : "", O = (D) => D.status === we.DONE ? "✓" : D.status === we.ERROR || D.status === we.CANCELED ? "!" : "...", U = () => f.value?.click(), ne = () => e.modal.close(), ae = (D) => {
    if (S.value || !v.value.filter(($) => $.status !== we.DONE).length) {
      S.value || (w.value = t("Please select file to upload first."));
      return;
    }
    w.value = "", _.value = D || s.value, g.upload();
  }, ee = () => {
    g.cancelAll(), v.value.forEach((D) => {
      D.status !== we.DONE && (D.status = we.CANCELED, D.statusName = t("Canceled"));
    }), S.value = !1;
  }, ie = (D) => {
    S.value || (g.removeFile(D.id), v.value.splice(V(D.id), 1));
  }, ce = (D) => {
    if (!S.value)
      if (g.cancelAll(), D) {
        const $ = v.value.filter((P) => P.status !== we.DONE);
        v.value = [], $.forEach((P) => I(P.originalFile, P.name));
      } else
        v.value = [];
  }, Y = (D) => {
    D.forEach(($) => {
      I($);
    });
  };
  return fe(() => {
    g = new jo({
      debug: e.debug,
      restrictions: { maxFileSize: ts(l.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (T, H) => {
        if (H[T.id] != null) {
          const me = V(T.id);
          v.value[me]?.status === we.PENDING && (w.value = g.i18n("noDuplicates", { fileName: T.name })), v.value = v.value.filter((ue) => ue.id !== T.id);
        }
        return v.value.push({
          id: T.id,
          name: T.name,
          size: e.filesize(T.size),
          status: we.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: T.data
        }), !0;
      }
    });
    const D = {
      getTargetPath: () => (_.value || s.value).path
    };
    if (n)
      n(g, D);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(g, D);
    else
      throw new Error("No uploader configured");
    g.on("restriction-failed", (T, H) => {
      const Q = v.value[V(T.id)];
      Q && ie(Q), w.value = H.message;
    }), g.on("upload-progress", (T, H) => {
      const Q = H.bytesTotal ?? 1, me = Math.floor(H.bytesUploaded / Q * 100), ue = V(T.id);
      ue !== -1 && v.value[ue] && (v.value[ue].percent = `${me}%`);
    }), g.on("upload-success", (T) => {
      const H = v.value[V(T.id)];
      H && (H.status = we.DONE, H.statusName = t("Done"));
    }), g.on("upload-error", (T, H) => {
      const Q = v.value[V(T.id)];
      Q && (Q.percent = null, Q.status = we.ERROR, Q.statusName = H?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : H?.message || t("Unknown Error"));
    }), g.on("error", (T) => {
      w.value = T.message, S.value = !1, e.adapter.open(s.value.path);
    }), g.on("complete", () => {
      S.value = !1;
      const T = _.value || s.value;
      e.adapter.invalidateListQuery(T.path), e.adapter.open(T.path);
      const H = v.value.filter((Q) => Q.status === we.DONE).map((Q) => Q.name);
      e.emitter.emit("vf-upload-complete", H);
    }), f.value?.addEventListener("click", () => c.value?.click()), h.value?.addEventListener("click", () => u.value?.click());
    const $ = { capture: !0 };
    document.addEventListener("dragover", m, $), document.addEventListener("dragenter", b, $), document.addEventListener("dragleave", x, $), document.addEventListener("drop", C, $);
    const P = (T) => {
      const H = T.target, Q = H.files;
      if (Q) {
        for (const me of Q) I(me);
        H.value = "";
      }
    };
    c.value?.addEventListener("change", P), u.value?.addEventListener("change", P);
  }), $e(() => {
    const D = { capture: !0 };
    document.removeEventListener("dragover", m, D), document.removeEventListener("dragenter", b, D), document.removeEventListener("dragleave", x, D), document.removeEventListener("drop", C, D);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: u,
    pickFiles: f,
    pickFolders: h,
    queue: v,
    message: w,
    uploading: S,
    hasFilesInDropArea: F,
    definitions: d,
    openFileSelector: U,
    upload: ae,
    cancel: ee,
    remove: ie,
    clear: ce,
    close: ne,
    getClassNameForEntry: q,
    getIconForEntry: O,
    addExternalFiles: Y
  };
}
const ai = { class: "vuefinder__image-preview" }, ri = { class: "vuefinder__image-preview__header" }, li = ["title"], di = { class: "vuefinder__image-preview__actions" }, ci = { class: "vuefinder__image-preview__image-container" }, ui = ["src"], fi = /* @__PURE__ */ J({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = Z(), { enabled: s } = Ie(), { t: l } = o.i18n, d = E(!1), r = E(""), c = E(!1), u = E(o.adapter.getPreviewUrl({ path: o.modal.data.item.path })), f = E(u.value), { addExternalFiles: h, upload: v, queue: w } = to(o.customUploader), S = o.fs, F = K(S.path), _ = je("cropperRef"), g = async () => {
      d.value = !d.value, o.modal.setEditMode(d.value);
    }, m = async () => {
      const x = _.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!x) return;
      let C = x;
      if (x.width > 1200 || x.height > 1200) {
        const U = Math.min(1200 / x.width, 1200 / x.height), ne = document.createElement("canvas");
        ne.width = Math.floor(x.width * U), ne.height = Math.floor(x.height * U);
        const ae = ne.getContext("2d");
        ae && (ae.drawImage(x, 0, 0, ne.width, ne.height), C = ne);
      }
      const V = o.modal.data.item.basename, I = V.split(".").pop()?.toLowerCase() || "jpg", q = I === "png" ? "image/png" : I === "gif" ? "image/gif" : "image/jpeg", O = await new Promise((U) => {
        C.toBlob((ne) => U(ne), q);
      });
      if (!O) {
        r.value = l("Failed to save image"), c.value = !0;
        return;
      }
      r.value = "", c.value = !1;
      try {
        const U = new File([O], V, { type: q }), ae = o.modal.data.item.path.split("/");
        ae.pop();
        const ie = {
          path: ae.join("/") || (F.value?.path ?? "")
        };
        h([U]), await new Promise(($) => setTimeout($, 100));
        const ce = w.value.find(($) => $.name === U.name);
        if (!ce)
          throw new Error("File was not added to upload queue");
        v(ie);
        let Y = 0;
        for (; Y < 150; ) {
          await new Promise((P) => setTimeout(P, 200));
          const $ = w.value.find((P) => P.id === ce.id);
          if ($?.status === we.DONE) break;
          if ($?.status === we.ERROR)
            throw new Error($.statusName || "Upload failed");
          Y++;
        }
        r.value = l("Updated."), await fetch(u.value, { cache: "reload", mode: "no-cors" });
        const D = o.root?.querySelector?.('[data-src="' + u.value + '"]');
        D && D instanceof HTMLElement && Kn.resetStatus(D), o.emitter.emit("vf-refresh-thumbnails"), await g(), t("success");
      } catch (U) {
        const ne = U?.message ?? "Error";
        r.value = l(ne), c.value = !0;
      }
    };
    return fe(() => {
      t("success");
    }), (b, x) => (p(), y("div", ai, [
      i("div", ri, [
        i("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: a(o).modal.data.item.path
        }, k(a(o).modal.data.item.basename), 9, li),
        i("div", di, [
          d.value ? (p(), y("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: m
          }, k(a(l)("Crop")), 1)) : A("", !0),
          a(s)("edit") ? (p(), y("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: x[0] || (x[0] = (C) => g())
          }, k(d.value ? a(l)("Cancel") : a(l)("Edit")), 1)) : A("", !0)
        ])
      ]),
      i("div", ci, [
        d.value ? (p(), R(a(Ko), {
          key: 1,
          ref_key: "cropperRef",
          ref: _,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: f.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (p(), y("img", {
          key: 0,
          style: {},
          src: a(o).adapter.getPreviewUrl({ path: a(o).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, ui))
      ]),
      r.value.length ? (p(), R(a(r), {
        key: 0,
        error: c.value,
        onHidden: x[1] || (x[1] = (C) => r.value = "")
      }, {
        default: W(() => [
          se(k(r.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : A("", !0)
    ]));
  }
}), vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function pi(n, e) {
  return p(), y("svg", vi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const xt = { render: pi }, mi = { class: "vuefinder__default-preview" }, hi = { class: "vuefinder__default-preview__content" }, _i = { class: "vuefinder__default-preview__header" }, gi = ["title"], wi = { class: "vuefinder__default-preview__icon-container" }, yi = ["title"], bi = /* @__PURE__ */ J({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Z(), o = e;
    return fe(() => {
      o("success");
    }), (s, l) => (p(), y("div", mi, [
      i("div", hi, [
        i("div", _i, [
          i("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: a(t).modal.data.item.path
          }, k(a(t).modal.data.item.basename), 9, gi)
        ]),
        i("div", wi, [
          L(a(xt), { class: "vuefinder__default-preview__file-icon" }),
          i("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: a(t).modal.data.item.path
          }, k(a(t).modal.data.item.basename), 9, yi)
        ])
      ])
    ]));
  }
}), xi = { class: "vuefinder__video-preview" }, ki = ["title"], $i = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Si = ["src"], Ci = /* @__PURE__ */ J({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Z(), o = e, s = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return fe(() => {
      o("success");
    }), (l, d) => (p(), y("div", xi, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: a(t).modal.data.item.path
      }, k(a(t).modal.data.item.basename), 9, ki),
      i("div", null, [
        i("video", $i, [
          i("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Si),
          d[0] || (d[0] = se(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Fi = { class: "vuefinder__audio-preview" }, Di = ["title"], Pi = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Ei = ["src"], Ti = /* @__PURE__ */ J({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = Z(), s = () => {
      const l = Z();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return fe(() => {
      t("success");
    }), (l, d) => (p(), y("div", Fi, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: a(o).modal.data.item.path
      }, k(a(o).modal.data.item.basename), 9, Di),
      i("div", null, [
        i("audio", Pi, [
          i("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Ei),
          d[0] || (d[0] = se(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Ai = { class: "vuefinder__pdf-preview" }, Mi = ["title"], Ii = ["data"], Oi = ["src"], Li = /* @__PURE__ */ J({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Z(), o = e, s = () => {
      const l = Z();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return fe(() => {
      o("success");
    }), (l, d) => (p(), y("div", Ai, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: a(t).modal.data.item.path
      }, k(a(t).modal.data.item.basename), 9, Mi),
      i("div", null, [
        i("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          i("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Oi)
        ], 8, Ii)
      ])
    ]));
  }
});
function Ri(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Bi = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Vi = ["disabled", "title"], zi = ["disabled", "title"], Ni = { class: "vuefinder__preview-modal__content" }, Ui = { key: 0 }, Hi = { class: "vuefinder__preview-modal__loading" }, ji = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Ki = { class: "vuefinder__preview-modal__details" }, qi = { class: "font-bold" }, Wi = { class: "pl-2 font-bold" }, Gi = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Yi = ["download", "href"], Lt = /* @__PURE__ */ J({
  __name: "ModalPreview",
  setup(n) {
    const e = Z(), { enabled: t } = Ie(), { t: o } = e.i18n, s = E(!1), l = (m) => {
      const b = (m || "").split("/").pop() || "", x = b.lastIndexOf(".");
      return x >= 0 ? b.slice(x + 1).toLowerCase() : "";
    }, d = (m, b) => {
      if (!b) return !1;
      const x = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), C = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), V = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), I = /* @__PURE__ */ new Set([
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
      return m === "image" ? x.has(b) : m === "video" ? C.has(b) : m === "audio" ? V.has(b) : m === "text" ? I.has(b) : m === "application/pdf" ? b === "pdf" : !1;
    }, r = (m) => {
      const b = e.modal.data.item.mime_type;
      if (b && typeof b == "string") return b.startsWith(m);
      const x = l(e.modal.data.item.path);
      return d(m, x);
    }, c = t("preview");
    c || (s.value = !0);
    const u = j(() => e.modal.data.item), f = K(e.fs.sortedFiles), h = j(() => f.value.filter((m) => m.type === "file")), v = j(
      () => h.value.findIndex((m) => m.path === u.value.path)
    ), w = j(() => v.value > 0), S = j(() => v.value < h.value.length - 1), F = () => {
      if (e.modal.editMode || !w.value) return;
      const m = h.value[v.value - 1];
      m && (e.fs.clearSelection(), e.fs.select(m.path), e.modal.data.item = m);
    }, _ = () => {
      if (e.modal.editMode || !S.value) return;
      const m = h.value[v.value + 1];
      m && (e.fs.clearSelection(), e.fs.select(m.path), e.modal.data.item = m);
    }, g = (m) => {
      if (m.key === "Escape") {
        m.preventDefault(), m.stopPropagation(), e.modal.close();
        return;
      }
      (m.key === "ArrowLeft" || m.key === "ArrowRight") && (m.preventDefault(), m.stopPropagation(), m.key === "ArrowLeft" ? F() : _());
    };
    return fe(() => {
      const m = document.querySelector(".vuefinder__preview-modal");
      m && m.focus();
    }), (m, b) => (p(), R(Ce, null, {
      buttons: W(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[6] || (b[6] = (x) => a(e).modal.close())
        }, k(a(o)("Close")), 1),
        a(t)("download") ? (p(), y("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: a(e).adapter.getDownloadUrl({ path: a(e).modal.data.item.path }),
          href: a(e).adapter.getDownloadUrl({ path: a(e).modal.data.item.path })
        }, k(a(o)("Download")), 9, Yi)) : A("", !0)
      ]),
      default: W(() => [
        i("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: g
        }, [
          a(e).modal.editMode ? A("", !0) : (p(), y("div", Bi, [
            i("button", {
              disabled: !w.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: a(o)("Previous file"),
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
            ])], 8, Vi),
            i("button", {
              disabled: !S.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: a(o)("Next file"),
              onClick: _
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
            ])], 8, zi)
          ])),
          i("div", Ni, [
            a(c) ? (p(), y("div", Ui, [
              r("text") ? (p(), R(ii, {
                key: `text-${u.value.path}`,
                onSuccess: b[0] || (b[0] = (x) => s.value = !0)
              })) : r("image") ? (p(), R(fi, {
                key: `image-${u.value.path}`,
                onSuccess: b[1] || (b[1] = (x) => s.value = !0)
              })) : r("video") ? (p(), R(Ci, {
                key: `video-${u.value.path}`,
                onSuccess: b[2] || (b[2] = (x) => s.value = !0)
              })) : r("audio") ? (p(), R(Ti, {
                key: `audio-${u.value.path}`,
                onSuccess: b[3] || (b[3] = (x) => s.value = !0)
              })) : r("application/pdf") ? (p(), R(Li, {
                key: `pdf-${u.value.path}`,
                onSuccess: b[4] || (b[4] = (x) => s.value = !0)
              })) : (p(), R(bi, {
                key: `default-${u.value.path}`,
                onSuccess: b[5] || (b[5] = (x) => s.value = !0)
              }))
            ])) : A("", !0),
            i("div", Hi, [
              s.value === !1 ? (p(), y("div", ji, [
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
                i("span", null, k(a(o)("Loading")), 1)
              ])) : A("", !0)
            ])
          ])
        ], 32),
        i("div", Ki, [
          i("div", null, [
            i("span", qi, k(a(o)("File Size")) + ": ", 1),
            se(k(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          i("div", null, [
            i("span", Wi, k(a(o)("Last Modified")) + ": ", 1),
            se(" " + k(a(Ri)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(t)("download") ? (p(), y("div", Gi, [
          i("span", null, k(a(o)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : A("", !0)
      ]),
      _: 1
    }));
  }
}), Qi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Xi(n, e) {
  return p(), y("svg", Qi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Ji = { render: Xi }, Zi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ea(n, e) {
  return p(), y("svg", Zi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const ze = { render: ea }, ta = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function na(n, e) {
  return p(), y("svg", ta, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Rt = { render: na }, oa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function sa(n, e) {
  return p(), y("svg", oa, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Bt = { render: sa }, ia = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function aa(n, e) {
  return p(), y("svg", ia, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const rn = { render: aa }, ra = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function la(n, e) {
  return p(), y("svg", ra, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const ln = { render: la }, da = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ca(n, e) {
  return p(), y("svg", da, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const dn = { render: ca }, ua = { class: "vuefinder__modal-tree__folder-item" }, fa = { class: "vuefinder__modal-tree__folder-content" }, va = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, pa = { class: "vuefinder__modal-tree__folder-text" }, ma = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, ha = 300, _a = /* @__PURE__ */ J({
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
  setup(n, { emit: e }) {
    const t = Z(), { t: o } = t.i18n, s = t.fs, l = n, d = e;
    K(s.path);
    const r = j(() => {
      const g = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[g] || !1;
    }), c = j(() => l.modelValue?.path === l.folder.path), u = j(() => l.currentPath?.path === l.folder.path), f = j(() => l.modalTreeData[l.folder.path] || []), h = j(() => f.value.length > 0 || l.folder.type === "dir"), v = () => {
      d("toggleFolder", l.storage, l.folder.path);
    }, w = () => {
      d("update:modelValue", l.folder);
    }, S = () => {
      d("update:modelValue", l.folder), d("selectAndClose", l.folder);
    };
    let F = 0;
    const _ = () => {
      const g = Date.now();
      g - F < ha ? S() : w(), F = g;
    };
    return (g, m) => {
      const b = Un("ModalTreeFolderItem", !0);
      return p(), y("div", ua, [
        i("div", fa, [
          h.value ? (p(), y("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: v
          }, [
            r.value ? (p(), R(a(Bt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (p(), R(a(Rt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (p(), y("div", va)),
          i("div", {
            class: G(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": c.value,
              "vuefinder__modal-tree__folder-link--current": u.value
            }]),
            onClick: w,
            onDblclick: S,
            onTouchend: _
          }, [
            r.value ? (p(), R(a(dn), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (p(), R(a(ze), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            i("span", pa, k(n.folder.basename), 1)
          ], 34)
        ]),
        r.value && h.value ? (p(), y("div", ma, [
          (p(!0), y(de, null, ve(f.value, (x) => (p(), R(b, {
            key: x.path,
            folder: x,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": m[0] || (m[0] = (C) => g.$emit("update:modelValue", C)),
            onSelectAndClose: m[1] || (m[1] = (C) => g.$emit("selectAndClose", C)),
            onToggleFolder: m[2] || (m[2] = (C, V) => g.$emit("toggleFolder", C, V))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
        ])) : A("", !0)
      ]);
    };
  }
}), ga = { class: "vuefinder__modal-tree" }, wa = { class: "vuefinder__modal-tree__header" }, ya = { class: "vuefinder__modal-tree__title" }, ba = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, xa = { class: "vuefinder__modal-tree__section-title" }, ka = { class: "vuefinder__modal-tree__list" }, $a = ["onClick", "onDblclick", "onTouchend"], Sa = { class: "vuefinder__modal-tree__text" }, Ca = { class: "vuefinder__modal-tree__text-storage" }, Fa = { class: "vuefinder__modal-tree__section-title" }, Da = { class: "vuefinder__modal-tree__list" }, Pa = { class: "vuefinder__modal-tree__storage-item" }, Ea = { class: "vuefinder__modal-tree__storage-content" }, Ta = ["onClick"], Aa = ["onClick", "onDblclick", "onTouchend"], Ma = { class: "vuefinder__modal-tree__storage-text" }, Ia = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Cn = 300, cn = /* @__PURE__ */ J({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = Z(), { t: o } = t.i18n, s = t.fs, l = t.config, d = e, r = K(s.sortedFiles), c = K(s.storages), u = j(() => c.value || []), f = K(s.path), h = E(null), v = E({}), w = E({});
    re(r, (I) => {
      const q = I.filter((U) => U.type === "dir"), O = f.value?.path || "";
      O && (w.value[O] = q.map((U) => ({
        ...U,
        type: "dir"
      })));
    });
    const S = (I, q) => {
      const O = `${I}:${q}`;
      v.value = {
        ...v.value,
        [O]: !v.value[O]
      }, v.value[O] && !w.value[q] && t.adapter.list(q).then((U) => {
        const ae = (U.files || []).filter((ee) => ee.type === "dir");
        w.value[q] = ae.map((ee) => ({
          ...ee,
          type: "dir"
        }));
      });
    }, F = (I) => w.value[I] || [], _ = (I) => {
      I && d("update:modelValue", I);
    }, g = (I) => {
      I && (d("update:modelValue", I), d("selectAndClose", I));
    }, m = (I) => {
      const q = {
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
      d("update:modelValue", q);
    }, b = (I) => {
      const q = {
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
      d("update:modelValue", q), d("selectAndClose", q);
    };
    let x = 0;
    const C = (I) => {
      if (!I) return;
      const q = Date.now();
      q - x < Cn ? g(I) : _(I), x = q;
    }, V = (I) => {
      const q = Date.now();
      q - x < Cn ? b(I) : m(I), x = q;
    };
    return fe(() => {
      h.value && Mt(h.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (I, q) => (p(), y("div", ga, [
      i("div", wa, [
        i("div", ya, k(a(o)("Select Target Folder")), 1)
      ]),
      i("div", {
        ref_key: "modalContentElement",
        ref: h,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && a(t).features.pinned && a(l).get("pinnedFolders").length ? (p(), y("div", ba, [
          i("div", xa, k(a(o)("Pinned Folders")), 1),
          i("div", ka, [
            (p(!0), y(de, null, ve(a(l).get("pinnedFolders"), (O) => (p(), y("div", {
              key: O.path,
              class: G(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === O.path }]),
              onClick: (U) => _(O),
              onDblclick: (U) => g(O),
              onTouchend: (U) => C(O)
            }, [
              L(a(ze), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              i("div", Sa, k(O.basename), 1),
              i("div", Ca, k(O.storage), 1),
              L(a(rn), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, $a))), 128))
          ])
        ])) : A("", !0),
        i("div", Fa, k(a(o)("Storages")), 1),
        (p(!0), y(de, null, ve(u.value, (O) => (p(), y("div", {
          key: O,
          class: "vuefinder__modal-tree__section"
        }, [
          i("div", Da, [
            i("div", Pa, [
              i("div", Ea, [
                i("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: le((U) => S(O, O + "://"), ["stop"])
                }, [
                  v.value[`${O}:${O}://`] ? (p(), R(a(Bt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (p(), R(a(Rt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Ta),
                i("div", {
                  class: G(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === O + "://"
                  }]),
                  onClick: (U) => m(O),
                  onDblclick: (U) => b(O),
                  onTouchend: (U) => V(O)
                }, [
                  L(a(ln), { class: "vuefinder__modal-tree__storage-icon" }),
                  i("span", Ma, k(O), 1)
                ], 42, Aa)
              ]),
              v.value[`${O}:${O}://`] ? (p(), y("div", Ia, [
                (p(!0), y(de, null, ve(F(O + "://"), (U) => (p(), R(_a, {
                  key: U.path,
                  folder: U,
                  storage: O,
                  "model-value": n.modelValue,
                  "expanded-folders": v.value,
                  "modal-tree-data": w.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": _,
                  onSelectAndClose: g,
                  onToggleFolder: S
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
              ])) : A("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Oa = { class: "vuefinder__move-modal__content" }, La = { class: "vuefinder__move-modal__description" }, Ra = { class: "vuefinder__move-modal__files vf-scrollbar" }, Ba = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Va = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, za = { class: "vuefinder__move-modal__file-name" }, Na = { class: "vuefinder__move-modal__target-title" }, Ua = { class: "vuefinder__move-modal__target-container" }, Ha = { class: "vuefinder__move-modal__target-path" }, ja = { class: "vuefinder__move-modal__target-storage" }, Ka = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, qa = { class: "vuefinder__move-modal__target-badge" }, Wa = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, Ga = { class: "vuefinder__move-modal__checkbox-label" }, Ya = { class: "vuefinder__move-modal__checkbox-text" }, Qa = { class: "vuefinder__move-modal__selected-items" }, no = /* @__PURE__ */ J({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = Z(), { enabled: t } = Ie(), { t: o } = e.i18n, s = n, l = E(e.modal.data.items.from), d = E(e.modal.data.items.to), r = E(""), c = E(s.copy || !t("move")), u = j(() => c.value ? "copy" : "move"), f = E(!1), h = K(e.fs.path), v = j(() => c.value ? o("Copy files") : o("Move files")), w = j(
      () => c.value ? o("Are you sure you want to copy these files?") : o("Are you sure you want to move these files?")
    ), S = j(() => c.value ? o("Yes, Copy!") : o("Yes, Move!"));
    j(() => c.value ? o("Files copied.") : o("Files moved."));
    const F = (b) => {
      b && (d.value = b);
    }, _ = (b) => {
      b && (d.value = b, f.value = !1);
    }, g = () => {
      const b = d.value.path;
      if (!b) return { storage: "local", path: "" };
      if (b.endsWith("://"))
        return { storage: b.replace("://", ""), path: "" };
      const x = b.split("://");
      return {
        storage: x[0] || "local",
        path: x[1] || ""
      };
    }, m = async () => {
      if (l.value.length) {
        const { files: b } = await e.adapter[u.value]({
          path: h.value.path,
          sources: l.value.map(({ path: x }) => x),
          destination: d.value.path
        });
        e.fs.setFiles(b), e.modal.close();
      }
    };
    return (b, x) => (p(), R(Ce, null, {
      buttons: W(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: m
        }, k(S.value), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[4] || (x[4] = (C) => a(e).modal.close())
        }, k(a(o)("Cancel")), 1),
        i("div", Qa, k(a(o)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: W(() => [
        i("div", null, [
          L(Pe, {
            icon: a(Ji),
            title: v.value
          }, null, 8, ["icon", "title"]),
          i("div", Oa, [
            i("p", La, k(w.value), 1),
            i("div", Ra, [
              (p(!0), y(de, null, ve(l.value, (C) => (p(), y("div", {
                key: C.path,
                class: "vuefinder__move-modal__file"
              }, [
                i("div", null, [
                  C.type === "dir" ? (p(), y("svg", Ba, [...x[5] || (x[5] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (p(), y("svg", Va, [...x[6] || (x[6] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                i("div", za, k(C.path), 1)
              ]))), 128))
            ]),
            i("h4", Na, k(a(o)("Target Directory")), 1),
            i("div", Ua, [
              i("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: x[0] || (x[0] = (C) => f.value = !f.value)
              }, [
                i("div", Ha, [
                  i("span", ja, k(g().storage) + "://", 1),
                  g().path ? (p(), y("span", Ka, k(g().path), 1)) : A("", !0)
                ]),
                i("span", qa, k(a(o)("Browse")), 1)
              ])
            ]),
            i("div", {
              class: G([
                "vuefinder__move-modal__tree-selector",
                f.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              L(cn, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  x[1] || (x[1] = (C) => d.value = C),
                  F
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: _
              }, null, 8, ["modelValue"])
            ], 2),
            a(t)("copy") && a(t)("move") ? (p(), y("div", Wa, [
              i("label", Ga, [
                pe(i("input", {
                  "onUpdate:modelValue": x[2] || (x[2] = (C) => c.value = C),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [tn, c.value]
                ]),
                i("span", Ya, k(a(o)("Create a copy instead of moving")), 1)
              ])
            ])) : A("", !0),
            r.value.length ? (p(), R(a(r), {
              key: 1,
              error: "",
              onHidden: x[3] || (x[3] = (C) => r.value = "")
            }, {
              default: W(() => [
                se(k(r.value), 1)
              ]),
              _: 1
            })) : A("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), st = /* @__PURE__ */ J({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (p(), R(no, { copy: !1 }));
  }
}), un = /* @__PURE__ */ J({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (p(), R(no, { copy: !0 }));
  }
}), Xa = (n, e = 0, t = !1) => {
  let o;
  return (...s) => {
    t && !o && n(...s), clearTimeout(o), o = setTimeout(() => {
      n(...s);
    }, e);
  };
}, oo = (n, e, t) => {
  const o = E(n);
  return Io((s, l) => ({
    get() {
      return s(), o.value;
    },
    set: Xa(
      (d) => {
        o.value = d, l();
      },
      e,
      !1
    )
  }));
}, Ja = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Za(n, e) {
  return p(), y("svg", Ja, [...e[0] || (e[0] = [
    i("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const fn = { render: Za }, er = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function tr(n, e) {
  return p(), y("svg", er, [...e[0] || (e[0] = [
    i("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    i("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const Vt = { render: tr }, nr = { class: "vuefinder__search-modal__search-input" }, or = ["value", "placeholder", "disabled"], sr = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, ir = /* @__PURE__ */ J({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = t, s = Z(), { t: l } = s.i18n, d = E(null), r = (u) => {
      const f = u.target;
      o("update:modelValue", f.value);
    }, c = (u) => {
      o("keydown", u);
    };
    return e({
      focus: () => {
        d.value && d.value.focus();
      }
    }), (u, f) => (p(), y("div", nr, [
      L(a(fn), { class: "vuefinder__search-modal__search-icon" }),
      i("input", {
        ref_key: "searchInput",
        ref: d,
        value: n.modelValue,
        type: "text",
        placeholder: a(l)("Search Files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: f[0] || (f[0] = le(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, or),
      n.isSearching ? (p(), y("div", sr, [
        L(a(Vt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : A("", !0)
    ]));
  }
}), kt = Math.min, Je = Math.max, $t = Math.round, gt = Math.floor, Oe = (n) => ({
  x: n,
  y: n
}), ar = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, rr = {
  start: "end",
  end: "start"
};
function Fn(n, e, t) {
  return Je(n, kt(e, t));
}
function zt(n, e) {
  return typeof n == "function" ? n(e) : n;
}
function Ze(n) {
  return n.split("-")[0];
}
function Nt(n) {
  return n.split("-")[1];
}
function so(n) {
  return n === "x" ? "y" : "x";
}
function io(n) {
  return n === "y" ? "height" : "width";
}
const lr = /* @__PURE__ */ new Set(["top", "bottom"]);
function qe(n) {
  return lr.has(Ze(n)) ? "y" : "x";
}
function ao(n) {
  return so(qe(n));
}
function dr(n, e, t) {
  t === void 0 && (t = !1);
  const o = Nt(n), s = ao(n), l = io(s);
  let d = s === "x" ? o === (t ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[l] > e.floating[l] && (d = St(d)), [d, St(d)];
}
function cr(n) {
  const e = St(n);
  return [Jt(n), e, Jt(e)];
}
function Jt(n) {
  return n.replace(/start|end/g, (e) => rr[e]);
}
const Dn = ["left", "right"], Pn = ["right", "left"], ur = ["top", "bottom"], fr = ["bottom", "top"];
function vr(n, e, t) {
  switch (n) {
    case "top":
    case "bottom":
      return t ? e ? Pn : Dn : e ? Dn : Pn;
    case "left":
    case "right":
      return e ? ur : fr;
    default:
      return [];
  }
}
function pr(n, e, t, o) {
  const s = Nt(n);
  let l = vr(Ze(n), t === "start", o);
  return s && (l = l.map((d) => d + "-" + s), e && (l = l.concat(l.map(Jt)))), l;
}
function St(n) {
  return n.replace(/left|right|bottom|top/g, (e) => ar[e]);
}
function mr(n) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...n
  };
}
function hr(n) {
  return typeof n != "number" ? mr(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function Ct(n) {
  const {
    x: e,
    y: t,
    width: o,
    height: s
  } = n;
  return {
    width: o,
    height: s,
    top: t,
    left: e,
    right: e + o,
    bottom: t + s,
    x: e,
    y: t
  };
}
function En(n, e, t) {
  let {
    reference: o,
    floating: s
  } = n;
  const l = qe(e), d = ao(e), r = io(d), c = Ze(e), u = l === "y", f = o.x + o.width / 2 - s.width / 2, h = o.y + o.height / 2 - s.height / 2, v = o[r] / 2 - s[r] / 2;
  let w;
  switch (c) {
    case "top":
      w = {
        x: f,
        y: o.y - s.height
      };
      break;
    case "bottom":
      w = {
        x: f,
        y: o.y + o.height
      };
      break;
    case "right":
      w = {
        x: o.x + o.width,
        y: h
      };
      break;
    case "left":
      w = {
        x: o.x - s.width,
        y: h
      };
      break;
    default:
      w = {
        x: o.x,
        y: o.y
      };
  }
  switch (Nt(e)) {
    case "start":
      w[d] -= v * (t && u ? -1 : 1);
      break;
    case "end":
      w[d] += v * (t && u ? -1 : 1);
      break;
  }
  return w;
}
const _r = async (n, e, t) => {
  const {
    placement: o = "bottom",
    strategy: s = "absolute",
    middleware: l = [],
    platform: d
  } = t, r = l.filter(Boolean), c = await (d.isRTL == null ? void 0 : d.isRTL(e));
  let u = await d.getElementRects({
    reference: n,
    floating: e,
    strategy: s
  }), {
    x: f,
    y: h
  } = En(u, o, c), v = o, w = {}, S = 0;
  for (let F = 0; F < r.length; F++) {
    const {
      name: _,
      fn: g
    } = r[F], {
      x: m,
      y: b,
      data: x,
      reset: C
    } = await g({
      x: f,
      y: h,
      initialPlacement: o,
      placement: v,
      strategy: s,
      middlewareData: w,
      rects: u,
      platform: d,
      elements: {
        reference: n,
        floating: e
      }
    });
    f = m ?? f, h = b ?? h, w = {
      ...w,
      [_]: {
        ...w[_],
        ...x
      }
    }, C && S <= 50 && (S++, typeof C == "object" && (C.placement && (v = C.placement), C.rects && (u = C.rects === !0 ? await d.getElementRects({
      reference: n,
      floating: e,
      strategy: s
    }) : C.rects), {
      x: f,
      y: h
    } = En(u, v, c)), F = -1);
  }
  return {
    x: f,
    y: h,
    placement: v,
    strategy: s,
    middlewareData: w
  };
};
async function ro(n, e) {
  var t;
  e === void 0 && (e = {});
  const {
    x: o,
    y: s,
    platform: l,
    rects: d,
    elements: r,
    strategy: c
  } = n, {
    boundary: u = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: h = "floating",
    altBoundary: v = !1,
    padding: w = 0
  } = zt(e, n), S = hr(w), _ = r[v ? h === "floating" ? "reference" : "floating" : h], g = Ct(await l.getClippingRect({
    element: (t = await (l.isElement == null ? void 0 : l.isElement(_))) == null || t ? _ : _.contextElement || await (l.getDocumentElement == null ? void 0 : l.getDocumentElement(r.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: c
  })), m = h === "floating" ? {
    x: o,
    y: s,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, b = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(r.floating)), x = await (l.isElement == null ? void 0 : l.isElement(b)) ? await (l.getScale == null ? void 0 : l.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, C = Ct(l.convertOffsetParentRelativeRectToViewportRelativeRect ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: r,
    rect: m,
    offsetParent: b,
    strategy: c
  }) : m);
  return {
    top: (g.top - C.top + S.top) / x.y,
    bottom: (C.bottom - g.bottom + S.bottom) / x.y,
    left: (g.left - C.left + S.left) / x.x,
    right: (C.right - g.right + S.right) / x.x
  };
}
const gr = function(n) {
  return n === void 0 && (n = {}), {
    name: "flip",
    options: n,
    async fn(e) {
      var t, o;
      const {
        placement: s,
        middlewareData: l,
        rects: d,
        initialPlacement: r,
        platform: c,
        elements: u
      } = e, {
        mainAxis: f = !0,
        crossAxis: h = !0,
        fallbackPlacements: v,
        fallbackStrategy: w = "bestFit",
        fallbackAxisSideDirection: S = "none",
        flipAlignment: F = !0,
        ..._
      } = zt(n, e);
      if ((t = l.arrow) != null && t.alignmentOffset)
        return {};
      const g = Ze(s), m = qe(r), b = Ze(r) === r, x = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), C = v || (b || !F ? [St(r)] : cr(r)), V = S !== "none";
      !v && V && C.push(...pr(r, F, S, x));
      const I = [r, ...C], q = await ro(e, _), O = [];
      let U = ((o = l.flip) == null ? void 0 : o.overflows) || [];
      if (f && O.push(q[g]), h) {
        const ie = dr(s, d, x);
        O.push(q[ie[0]], q[ie[1]]);
      }
      if (U = [...U, {
        placement: s,
        overflows: O
      }], !O.every((ie) => ie <= 0)) {
        var ne, ae;
        const ie = (((ne = l.flip) == null ? void 0 : ne.index) || 0) + 1, ce = I[ie];
        if (ce && (!(h === "alignment" ? m !== qe(ce) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        U.every(($) => qe($.placement) === m ? $.overflows[0] > 0 : !0)))
          return {
            data: {
              index: ie,
              overflows: U
            },
            reset: {
              placement: ce
            }
          };
        let Y = (ae = U.filter((D) => D.overflows[0] <= 0).sort((D, $) => D.overflows[1] - $.overflows[1])[0]) == null ? void 0 : ae.placement;
        if (!Y)
          switch (w) {
            case "bestFit": {
              var ee;
              const D = (ee = U.filter(($) => {
                if (V) {
                  const P = qe($.placement);
                  return P === m || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  P === "y";
                }
                return !0;
              }).map(($) => [$.placement, $.overflows.filter((P) => P > 0).reduce((P, T) => P + T, 0)]).sort(($, P) => $[1] - P[1])[0]) == null ? void 0 : ee[0];
              D && (Y = D);
              break;
            }
            case "initialPlacement":
              Y = r;
              break;
          }
        if (s !== Y)
          return {
            reset: {
              placement: Y
            }
          };
      }
      return {};
    }
  };
}, wr = /* @__PURE__ */ new Set(["left", "top"]);
async function yr(n, e) {
  const {
    placement: t,
    platform: o,
    elements: s
  } = n, l = await (o.isRTL == null ? void 0 : o.isRTL(s.floating)), d = Ze(t), r = Nt(t), c = qe(t) === "y", u = wr.has(d) ? -1 : 1, f = l && c ? -1 : 1, h = zt(e, n);
  let {
    mainAxis: v,
    crossAxis: w,
    alignmentAxis: S
  } = typeof h == "number" ? {
    mainAxis: h,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: h.mainAxis || 0,
    crossAxis: h.crossAxis || 0,
    alignmentAxis: h.alignmentAxis
  };
  return r && typeof S == "number" && (w = r === "end" ? S * -1 : S), c ? {
    x: w * f,
    y: v * u
  } : {
    x: v * u,
    y: w * f
  };
}
const br = function(n) {
  return n === void 0 && (n = 0), {
    name: "offset",
    options: n,
    async fn(e) {
      var t, o;
      const {
        x: s,
        y: l,
        placement: d,
        middlewareData: r
      } = e, c = await yr(e, n);
      return d === ((t = r.offset) == null ? void 0 : t.placement) && (o = r.arrow) != null && o.alignmentOffset ? {} : {
        x: s + c.x,
        y: l + c.y,
        data: {
          ...c,
          placement: d
        }
      };
    }
  };
}, xr = function(n) {
  return n === void 0 && (n = {}), {
    name: "shift",
    options: n,
    async fn(e) {
      const {
        x: t,
        y: o,
        placement: s
      } = e, {
        mainAxis: l = !0,
        crossAxis: d = !1,
        limiter: r = {
          fn: (_) => {
            let {
              x: g,
              y: m
            } = _;
            return {
              x: g,
              y: m
            };
          }
        },
        ...c
      } = zt(n, e), u = {
        x: t,
        y: o
      }, f = await ro(e, c), h = qe(Ze(s)), v = so(h);
      let w = u[v], S = u[h];
      if (l) {
        const _ = v === "y" ? "top" : "left", g = v === "y" ? "bottom" : "right", m = w + f[_], b = w - f[g];
        w = Fn(m, w, b);
      }
      if (d) {
        const _ = h === "y" ? "top" : "left", g = h === "y" ? "bottom" : "right", m = S + f[_], b = S - f[g];
        S = Fn(m, S, b);
      }
      const F = r.fn({
        ...e,
        [v]: w,
        [h]: S
      });
      return {
        ...F,
        data: {
          x: F.x - t,
          y: F.y - o,
          enabled: {
            [v]: l,
            [h]: d
          }
        }
      };
    }
  };
};
function Ut() {
  return typeof window < "u";
}
function at(n) {
  return lo(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function Se(n) {
  var e;
  return (n == null || (e = n.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Re(n) {
  var e;
  return (e = (lo(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : e.documentElement;
}
function lo(n) {
  return Ut() ? n instanceof Node || n instanceof Se(n).Node : !1;
}
function Ae(n) {
  return Ut() ? n instanceof Element || n instanceof Se(n).Element : !1;
}
function Le(n) {
  return Ut() ? n instanceof HTMLElement || n instanceof Se(n).HTMLElement : !1;
}
function Tn(n) {
  return !Ut() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof Se(n).ShadowRoot;
}
const kr = /* @__PURE__ */ new Set(["inline", "contents"]);
function pt(n) {
  const {
    overflow: e,
    overflowX: t,
    overflowY: o,
    display: s
  } = Me(n);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + t) && !kr.has(s);
}
const $r = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Sr(n) {
  return $r.has(at(n));
}
const Cr = [":popover-open", ":modal"];
function Ht(n) {
  return Cr.some((e) => {
    try {
      return n.matches(e);
    } catch {
      return !1;
    }
  });
}
const Fr = ["transform", "translate", "scale", "rotate", "perspective"], Dr = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Pr = ["paint", "layout", "strict", "content"];
function vn(n) {
  const e = pn(), t = Ae(n) ? Me(n) : n;
  return Fr.some((o) => t[o] ? t[o] !== "none" : !1) || (t.containerType ? t.containerType !== "normal" : !1) || !e && (t.backdropFilter ? t.backdropFilter !== "none" : !1) || !e && (t.filter ? t.filter !== "none" : !1) || Dr.some((o) => (t.willChange || "").includes(o)) || Pr.some((o) => (t.contain || "").includes(o));
}
function Er(n) {
  let e = Ye(n);
  for (; Le(e) && !it(e); ) {
    if (vn(e))
      return e;
    if (Ht(e))
      return null;
    e = Ye(e);
  }
  return null;
}
function pn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Tr = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function it(n) {
  return Tr.has(at(n));
}
function Me(n) {
  return Se(n).getComputedStyle(n);
}
function jt(n) {
  return Ae(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function Ye(n) {
  if (at(n) === "html")
    return n;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    Tn(n) && n.host || // Fallback.
    Re(n)
  );
  return Tn(e) ? e.host : e;
}
function co(n) {
  const e = Ye(n);
  return it(e) ? n.ownerDocument ? n.ownerDocument.body : n.body : Le(e) && pt(e) ? e : co(e);
}
function ct(n, e, t) {
  var o;
  e === void 0 && (e = []), t === void 0 && (t = !0);
  const s = co(n), l = s === ((o = n.ownerDocument) == null ? void 0 : o.body), d = Se(s);
  if (l) {
    const r = Zt(d);
    return e.concat(d, d.visualViewport || [], pt(s) ? s : [], r && t ? ct(r) : []);
  }
  return e.concat(s, ct(s, [], t));
}
function Zt(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function uo(n) {
  const e = Me(n);
  let t = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const s = Le(n), l = s ? n.offsetWidth : t, d = s ? n.offsetHeight : o, r = $t(t) !== l || $t(o) !== d;
  return r && (t = l, o = d), {
    width: t,
    height: o,
    $: r
  };
}
function mn(n) {
  return Ae(n) ? n : n.contextElement;
}
function ot(n) {
  const e = mn(n);
  if (!Le(e))
    return Oe(1);
  const t = e.getBoundingClientRect(), {
    width: o,
    height: s,
    $: l
  } = uo(e);
  let d = (l ? $t(t.width) : t.width) / o, r = (l ? $t(t.height) : t.height) / s;
  return (!d || !Number.isFinite(d)) && (d = 1), (!r || !Number.isFinite(r)) && (r = 1), {
    x: d,
    y: r
  };
}
const Ar = /* @__PURE__ */ Oe(0);
function fo(n) {
  const e = Se(n);
  return !pn() || !e.visualViewport ? Ar : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Mr(n, e, t) {
  return e === void 0 && (e = !1), !t || e && t !== Se(n) ? !1 : e;
}
function et(n, e, t, o) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  const s = n.getBoundingClientRect(), l = mn(n);
  let d = Oe(1);
  e && (o ? Ae(o) && (d = ot(o)) : d = ot(n));
  const r = Mr(l, t, o) ? fo(l) : Oe(0);
  let c = (s.left + r.x) / d.x, u = (s.top + r.y) / d.y, f = s.width / d.x, h = s.height / d.y;
  if (l) {
    const v = Se(l), w = o && Ae(o) ? Se(o) : o;
    let S = v, F = Zt(S);
    for (; F && o && w !== S; ) {
      const _ = ot(F), g = F.getBoundingClientRect(), m = Me(F), b = g.left + (F.clientLeft + parseFloat(m.paddingLeft)) * _.x, x = g.top + (F.clientTop + parseFloat(m.paddingTop)) * _.y;
      c *= _.x, u *= _.y, f *= _.x, h *= _.y, c += b, u += x, S = Se(F), F = Zt(S);
    }
  }
  return Ct({
    width: f,
    height: h,
    x: c,
    y: u
  });
}
function Kt(n, e) {
  const t = jt(n).scrollLeft;
  return e ? e.left + t : et(Re(n)).left + t;
}
function vo(n, e) {
  const t = n.getBoundingClientRect(), o = t.left + e.scrollLeft - Kt(n, t), s = t.top + e.scrollTop;
  return {
    x: o,
    y: s
  };
}
function Ir(n) {
  let {
    elements: e,
    rect: t,
    offsetParent: o,
    strategy: s
  } = n;
  const l = s === "fixed", d = Re(o), r = e ? Ht(e.floating) : !1;
  if (o === d || r && l)
    return t;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Oe(1);
  const f = Oe(0), h = Le(o);
  if ((h || !h && !l) && ((at(o) !== "body" || pt(d)) && (c = jt(o)), Le(o))) {
    const w = et(o);
    u = ot(o), f.x = w.x + o.clientLeft, f.y = w.y + o.clientTop;
  }
  const v = d && !h && !l ? vo(d, c) : Oe(0);
  return {
    width: t.width * u.x,
    height: t.height * u.y,
    x: t.x * u.x - c.scrollLeft * u.x + f.x + v.x,
    y: t.y * u.y - c.scrollTop * u.y + f.y + v.y
  };
}
function Or(n) {
  return Array.from(n.getClientRects());
}
function Lr(n) {
  const e = Re(n), t = jt(n), o = n.ownerDocument.body, s = Je(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), l = Je(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let d = -t.scrollLeft + Kt(n);
  const r = -t.scrollTop;
  return Me(o).direction === "rtl" && (d += Je(e.clientWidth, o.clientWidth) - s), {
    width: s,
    height: l,
    x: d,
    y: r
  };
}
const An = 25;
function Rr(n, e) {
  const t = Se(n), o = Re(n), s = t.visualViewport;
  let l = o.clientWidth, d = o.clientHeight, r = 0, c = 0;
  if (s) {
    l = s.width, d = s.height;
    const f = pn();
    (!f || f && e === "fixed") && (r = s.offsetLeft, c = s.offsetTop);
  }
  const u = Kt(o);
  if (u <= 0) {
    const f = o.ownerDocument, h = f.body, v = getComputedStyle(h), w = f.compatMode === "CSS1Compat" && parseFloat(v.marginLeft) + parseFloat(v.marginRight) || 0, S = Math.abs(o.clientWidth - h.clientWidth - w);
    S <= An && (l -= S);
  } else u <= An && (l += u);
  return {
    width: l,
    height: d,
    x: r,
    y: c
  };
}
const Br = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Vr(n, e) {
  const t = et(n, !0, e === "fixed"), o = t.top + n.clientTop, s = t.left + n.clientLeft, l = Le(n) ? ot(n) : Oe(1), d = n.clientWidth * l.x, r = n.clientHeight * l.y, c = s * l.x, u = o * l.y;
  return {
    width: d,
    height: r,
    x: c,
    y: u
  };
}
function Mn(n, e, t) {
  let o;
  if (e === "viewport")
    o = Rr(n, t);
  else if (e === "document")
    o = Lr(Re(n));
  else if (Ae(e))
    o = Vr(e, t);
  else {
    const s = fo(n);
    o = {
      x: e.x - s.x,
      y: e.y - s.y,
      width: e.width,
      height: e.height
    };
  }
  return Ct(o);
}
function po(n, e) {
  const t = Ye(n);
  return t === e || !Ae(t) || it(t) ? !1 : Me(t).position === "fixed" || po(t, e);
}
function zr(n, e) {
  const t = e.get(n);
  if (t)
    return t;
  let o = ct(n, [], !1).filter((r) => Ae(r) && at(r) !== "body"), s = null;
  const l = Me(n).position === "fixed";
  let d = l ? Ye(n) : n;
  for (; Ae(d) && !it(d); ) {
    const r = Me(d), c = vn(d);
    !c && r.position === "fixed" && (s = null), (l ? !c && !s : !c && r.position === "static" && !!s && Br.has(s.position) || pt(d) && !c && po(n, d)) ? o = o.filter((f) => f !== d) : s = r, d = Ye(d);
  }
  return e.set(n, o), o;
}
function Nr(n) {
  let {
    element: e,
    boundary: t,
    rootBoundary: o,
    strategy: s
  } = n;
  const d = [...t === "clippingAncestors" ? Ht(e) ? [] : zr(e, this._c) : [].concat(t), o], r = d[0], c = d.reduce((u, f) => {
    const h = Mn(e, f, s);
    return u.top = Je(h.top, u.top), u.right = kt(h.right, u.right), u.bottom = kt(h.bottom, u.bottom), u.left = Je(h.left, u.left), u;
  }, Mn(e, r, s));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Ur(n) {
  const {
    width: e,
    height: t
  } = uo(n);
  return {
    width: e,
    height: t
  };
}
function Hr(n, e, t) {
  const o = Le(e), s = Re(e), l = t === "fixed", d = et(n, !0, l, e);
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Oe(0);
  function u() {
    c.x = Kt(s);
  }
  if (o || !o && !l)
    if ((at(e) !== "body" || pt(s)) && (r = jt(e)), o) {
      const w = et(e, !0, l, e);
      c.x = w.x + e.clientLeft, c.y = w.y + e.clientTop;
    } else s && u();
  l && !o && s && u();
  const f = s && !o && !l ? vo(s, r) : Oe(0), h = d.left + r.scrollLeft - c.x - f.x, v = d.top + r.scrollTop - c.y - f.y;
  return {
    x: h,
    y: v,
    width: d.width,
    height: d.height
  };
}
function Gt(n) {
  return Me(n).position === "static";
}
function In(n, e) {
  if (!Le(n) || Me(n).position === "fixed")
    return null;
  if (e)
    return e(n);
  let t = n.offsetParent;
  return Re(n) === t && (t = t.ownerDocument.body), t;
}
function mo(n, e) {
  const t = Se(n);
  if (Ht(n))
    return t;
  if (!Le(n)) {
    let s = Ye(n);
    for (; s && !it(s); ) {
      if (Ae(s) && !Gt(s))
        return s;
      s = Ye(s);
    }
    return t;
  }
  let o = In(n, e);
  for (; o && Sr(o) && Gt(o); )
    o = In(o, e);
  return o && it(o) && Gt(o) && !vn(o) ? t : o || Er(n) || t;
}
const jr = async function(n) {
  const e = this.getOffsetParent || mo, t = this.getDimensions, o = await t(n.floating);
  return {
    reference: Hr(n.reference, await e(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Kr(n) {
  return Me(n).direction === "rtl";
}
const qr = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ir,
  getDocumentElement: Re,
  getClippingRect: Nr,
  getOffsetParent: mo,
  getElementRects: jr,
  getClientRects: Or,
  getDimensions: Ur,
  getScale: ot,
  isElement: Ae,
  isRTL: Kr
};
function ho(n, e) {
  return n.x === e.x && n.y === e.y && n.width === e.width && n.height === e.height;
}
function Wr(n, e) {
  let t = null, o;
  const s = Re(n);
  function l() {
    var r;
    clearTimeout(o), (r = t) == null || r.disconnect(), t = null;
  }
  function d(r, c) {
    r === void 0 && (r = !1), c === void 0 && (c = 1), l();
    const u = n.getBoundingClientRect(), {
      left: f,
      top: h,
      width: v,
      height: w
    } = u;
    if (r || e(), !v || !w)
      return;
    const S = gt(h), F = gt(s.clientWidth - (f + v)), _ = gt(s.clientHeight - (h + w)), g = gt(f), b = {
      rootMargin: -S + "px " + -F + "px " + -_ + "px " + -g + "px",
      threshold: Je(0, kt(1, c)) || 1
    };
    let x = !0;
    function C(V) {
      const I = V[0].intersectionRatio;
      if (I !== c) {
        if (!x)
          return d();
        I ? d(!1, I) : o = setTimeout(() => {
          d(!1, 1e-7);
        }, 1e3);
      }
      I === 1 && !ho(u, n.getBoundingClientRect()) && d(), x = !1;
    }
    try {
      t = new IntersectionObserver(C, {
        ...b,
        // Handle <iframe>s
        root: s.ownerDocument
      });
    } catch {
      t = new IntersectionObserver(C, b);
    }
    t.observe(n);
  }
  return d(!0), l;
}
function _o(n, e, t, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: s = !0,
    ancestorResize: l = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: r = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = o, u = mn(n), f = s || l ? [...u ? ct(u) : [], ...ct(e)] : [];
  f.forEach((g) => {
    s && g.addEventListener("scroll", t, {
      passive: !0
    }), l && g.addEventListener("resize", t);
  });
  const h = u && r ? Wr(u, t) : null;
  let v = -1, w = null;
  d && (w = new ResizeObserver((g) => {
    let [m] = g;
    m && m.target === u && w && (w.unobserve(e), cancelAnimationFrame(v), v = requestAnimationFrame(() => {
      var b;
      (b = w) == null || b.observe(e);
    })), t();
  }), u && !c && w.observe(u), w.observe(e));
  let S, F = c ? et(n) : null;
  c && _();
  function _() {
    const g = et(n);
    F && !ho(F, g) && t(), F = g, S = requestAnimationFrame(_);
  }
  return t(), () => {
    var g;
    f.forEach((m) => {
      s && m.removeEventListener("scroll", t), l && m.removeEventListener("resize", t);
    }), h?.(), (g = w) == null || g.disconnect(), w = null, c && cancelAnimationFrame(S);
  };
}
const Ft = br, Dt = xr, Pt = gr, Et = (n, e, t) => {
  const o = /* @__PURE__ */ new Map(), s = {
    platform: qr,
    ...t
  }, l = {
    ...s.platform,
    _c: o
  };
  return _r(n, e, {
    ...s,
    platform: l
  });
}, Gr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Yr(n, e) {
  return p(), y("svg", Gr, [...e[0] || (e[0] = [
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
const go = { render: Yr }, Qr = ["disabled", "title"], Xr = ["data-theme"], Jr = { class: "vuefinder__search-modal__dropdown-content" }, Zr = { class: "vuefinder__search-modal__dropdown-section" }, el = { class: "vuefinder__search-modal__dropdown-title" }, tl = { class: "vuefinder__search-modal__dropdown-options" }, nl = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, ol = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, sl = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, il = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, al = /* @__PURE__ */ J({
  name: "SearchOptionsDropdown",
  __name: "SearchOptionsDropdown",
  props: {
    visible: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    sizeFilter: {},
    selectedOption: {}
  },
  emits: ["update:visible", "update:sizeFilter", "update:selectedOption", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = n, s = t, l = Z(), { t: d } = l.i18n, r = E(null), c = E(null);
    let u = null;
    const f = (F) => {
      if (s("update:selectedOption", F), F.startsWith("size-")) {
        const _ = F.split("-")[1];
        s("update:sizeFilter", _);
      }
    }, h = async () => {
      o.disabled || (o.visible ? (s("update:visible", !1), u && (u(), u = null)) : (s("update:visible", !0), await Te(), await v()));
    }, v = async () => {
      if (!(!r.value || !c.value) && (await Te(), !(!r.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: F, y: _ } = await Et(r.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [Ft(8), Pt({ padding: 16 }), Dt({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${F}px`,
            top: `${_}px`
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
          u = _o(r.value, c.value, async () => {
            if (!(!r.value || !c.value))
              try {
                const { x: F, y: _ } = await Et(
                  r.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [Ft(8), Pt({ padding: 16 }), Dt({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${F}px`,
                  top: `${_}px`
                });
              } catch (F) {
                console.warn("Floating UI positioning error:", F);
              }
          });
        } catch (F) {
          console.warn("Floating UI autoUpdate setup error:", F), u = null;
        }
      }
    }, w = (F) => {
      if (!o.visible) return;
      const _ = ["size-all", "size-small", "size-medium", "size-large"], g = _.findIndex((m) => m === o.selectedOption);
      if (F.key === "ArrowDown") {
        F.preventDefault();
        const m = (g + 1) % _.length;
        s("update:selectedOption", _[m] || null);
      } else if (F.key === "ArrowUp") {
        F.preventDefault();
        const m = g <= 0 ? _.length - 1 : g - 1;
        s("update:selectedOption", _[m] || null);
      } else F.key === "Enter" ? (F.preventDefault(), o.selectedOption?.startsWith("size-") && s(
        "update:sizeFilter",
        o.selectedOption.split("-")[1]
      )) : F.key === "Escape" && (F.preventDefault(), s("update:visible", !1), u && (u(), u = null));
    }, S = () => {
      u && (u(), u = null);
    };
    return re(
      () => o.visible,
      (F) => {
        !F && u && (u(), u = null);
      }
    ), $e(() => {
      S();
    }), e({
      cleanup: S
    }), (F, _) => (p(), y(de, null, [
      i("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: G(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: a(d)("Search Options"),
        onClick: le(h, ["stop"])
      }, [
        L(a(go), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Qr),
      (p(), R(At, { to: "body" }, [
        n.visible ? (p(), y("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": a(l).theme.current,
          tabindex: "-1",
          onClick: _[4] || (_[4] = le(() => {
          }, ["stop"])),
          onKeydown: w
        }, [
          i("div", Jr, [
            i("div", Zr, [
              i("div", el, k(a(d)("File Size")), 1),
              i("div", tl, [
                i("div", {
                  class: G(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: _[0] || (_[0] = le((g) => f("size-all"), ["stop"]))
                }, [
                  i("span", null, k(a(d)("All Files")), 1),
                  n.sizeFilter === "all" ? (p(), y("div", nl, [..._[5] || (_[5] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2),
                i("div", {
                  class: G(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: _[1] || (_[1] = le((g) => f("size-small"), ["stop"]))
                }, [
                  i("span", null, k(a(d)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (p(), y("div", ol, [..._[6] || (_[6] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2),
                i("div", {
                  class: G(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: _[2] || (_[2] = le((g) => f("size-medium"), ["stop"]))
                }, [
                  i("span", null, k(a(d)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (p(), y("div", sl, [..._[7] || (_[7] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2),
                i("div", {
                  class: G(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: _[3] || (_[3] = le((g) => f("size-large"), ["stop"]))
                }, [
                  i("span", null, k(a(d)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (p(), y("div", il, [..._[8] || (_[8] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, Xr)) : A("", !0)
      ]))
    ], 64));
  }
});
function rl(n) {
  const [e, t] = ll(n);
  if (!t || t === "/") return e + "://";
  const o = t.replace(/\/+$/, ""), s = o.lastIndexOf("/");
  return s === 0 ? e + "://" : e + ":/" + o.slice(0, s);
}
function ll(n) {
  const e = n.indexOf(":/");
  return e === -1 ? [void 0, n] : [n.slice(0, e), n.slice(e + 2) || "/"];
}
function wo(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const o = t[1], s = t[2] ?? "", l = s.split("/").filter(Boolean), d = l.pop();
  if (!d) return o + s;
  let r = `${o}${l.join("/")}${l.length ? "/" : ""}${d}`;
  if (r.length <= e) return r;
  const c = d.split(/\.(?=[^\.]+$)/), u = c[0] ?? "", f = c[1] ?? "", h = u.length > 10 ? `${u.slice(0, 6)}...${u.slice(-5)}` : u, v = f ? `${h}.${f}` : h;
  return r = `${o}${l.join("/")}${l.length ? "/" : ""}${v}`, r.length > e && (r = `${o}.../${v}`), r;
}
async function yo(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function ut(n) {
  await yo(n);
}
async function dl(n) {
  await yo(n);
}
const cl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function ul(n, e) {
  return p(), y("svg", cl, [...e[0] || (e[0] = [
    i("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const bo = { render: ul }, fl = ["title"], vl = { class: "vuefinder__search-modal__result-icon" }, pl = { class: "vuefinder__search-modal__result-content" }, ml = { class: "vuefinder__search-modal__result-name" }, hl = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, _l = ["title"], gl = ["title"], wl = ["data-item-dropdown", "data-theme"], yl = { class: "vuefinder__search-modal__item-dropdown-content" }, bl = /* @__PURE__ */ J({
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
  setup(n, { emit: e }) {
    const t = n, o = e, s = Z(), { t: l } = s.i18n, d = E(null);
    let r = null;
    re(
      () => t.activeDropdown,
      (g) => {
        r && (r(), r = null), g === t.item.path && d.value && Te(() => {
          h(t.item.path, d.value);
        });
      }
    ), $e(() => {
      r && (r(), r = null);
    });
    const c = (g) => t.expandedPaths.has(g), u = (g) => g.type === "dir" || !g.file_size ? "" : on(g.file_size), f = (g, m) => {
      m.stopPropagation(), o("toggleItemDropdown", g, m);
    }, h = async (g, m) => {
      const b = document.querySelector(
        `[data-item-dropdown="${g}"]`
      );
      if (!(!b || !m) && (await Te(), !(!b || !m))) {
        Object.assign(b.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x, y: C } = await Et(m, b, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [Ft(8), Pt({ padding: 16 }), Dt({ padding: 16 })]
          });
          Object.assign(b.style, {
            left: `${x}px`,
            top: `${C}px`
          }), requestAnimationFrame(() => {
            b && Object.assign(b.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (x) {
          console.warn("Floating UI initial positioning error:", x);
          return;
        }
        try {
          r = _o(m, b, async () => {
            if (!(!m || !b))
              try {
                const { x, y: C } = await Et(m, b, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [Ft(8), Pt({ padding: 16 }), Dt({ padding: 16 })]
                });
                Object.assign(b.style, {
                  left: `${x}px`,
                  top: `${C}px`
                });
              } catch (x) {
                console.warn("Floating UI positioning error:", x);
              }
          });
        } catch (x) {
          console.warn("Floating UI autoUpdate setup error:", x), r = null;
        }
      }
    }, v = (g) => {
      o("update:selectedItemDropdownOption", g);
    }, w = async (g) => {
      await ut(g.path), o("copyPath", g);
    }, S = (g) => {
      o("openContainingFolder", g);
    }, F = (g) => {
      o("preview", g);
    }, _ = (g) => {
      if (!t.activeDropdown) return;
      const m = ["copy-path", "open-folder", "preview"], b = t.selectedItemDropdownOption, x = m.findIndex((C) => b?.includes(C));
      if (g.key === "ArrowDown") {
        g.preventDefault();
        const C = (x + 1) % m.length;
        o(
          "update:selectedItemDropdownOption",
          `${m[C] || ""}-${t.activeDropdown}`
        );
      } else if (g.key === "ArrowUp") {
        g.preventDefault();
        const C = x <= 0 ? m.length - 1 : x - 1;
        o(
          "update:selectedItemDropdownOption",
          `${m[C] || ""}-${t.activeDropdown}`
        );
      } else g.key === "Enter" ? (g.preventDefault(), b && (b.includes("copy-path") ? w(t.item) : b.includes("open-folder") ? S(t.item) : b.includes("preview") && F(t.item))) : g.key === "Escape" && (g.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return (g, m) => (p(), y("div", {
      class: G(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: m[9] || (m[9] = (b) => o("select", n.index))
    }, [
      i("div", vl, [
        n.item.type === "dir" ? (p(), R(a(ze), { key: 0 })) : (p(), R(a(xt), { key: 1 }))
      ]),
      i("div", pl, [
        i("div", ml, [
          se(k(n.item.basename) + " ", 1),
          u(n.item) ? (p(), y("span", hl, k(u(n.item)), 1)) : A("", !0)
        ]),
        i("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: m[0] || (m[0] = le((b) => {
            o("select", n.index), o("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, k(c(n.item.path) ? n.item.path : a(wo)(n.item.path)), 9, _l)
      ]),
      i("button", {
        ref_key: "buttonElementRef",
        ref: d,
        class: "vuefinder__search-modal__result-actions",
        title: a(l)("More actions"),
        onClick: m[1] || (m[1] = (b) => {
          o("selectWithDropdown", n.index), f(n.item.path, b);
        })
      }, [
        L(a(bo), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, gl),
      (p(), R(At, { to: "body" }, [
        n.activeDropdown === n.item.path ? (p(), y("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": a(s).theme.current,
          tabindex: "-1",
          onClick: m[8] || (m[8] = le(() => {
          }, ["stop"])),
          onKeydown: _
        }, [
          i("div", yl, [
            i("div", {
              class: G(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: m[2] || (m[2] = (b) => {
                v(`copy-path-${n.item.path}`), w(n.item);
              }),
              onFocus: m[3] || (m[3] = (b) => v(`copy-path-${n.item.path}`))
            }, [
              m[10] || (m[10] = i("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                i("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                i("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              i("span", null, k(a(l)("Copy Path")), 1)
            ], 34),
            i("div", {
              class: G(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: m[4] || (m[4] = (b) => {
                v(`open-folder-${n.item.path}`), S(n.item);
              }),
              onFocus: m[5] || (m[5] = (b) => v(`open-folder-${n.item.path}`))
            }, [
              L(a(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, k(a(l)("Open Containing Folder")), 1)
            ], 34),
            i("div", {
              class: G(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: m[6] || (m[6] = (b) => {
                v(`preview-${n.item.path}`), F(n.item);
              }),
              onFocus: m[7] || (m[7] = (b) => v(`preview-${n.item.path}`))
            }, [
              L(a(xt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, k(a(l)("Preview")), 1)
            ], 34)
          ])
        ], 40, wl)) : A("", !0)
      ]))
    ], 10, fl));
  }
}), xl = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, kl = { class: "vuefinder__search-modal__loading-icon" }, $l = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Sl = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, Cl = { class: "vuefinder__search-modal__results-header" }, Xe = 60, On = 5, Fl = /* @__PURE__ */ J({
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
  setup(n, { expose: e, emit: t }) {
    const o = n, s = t, l = Z(), { t: d } = l.i18n, r = je("scrollableContainer"), c = j(() => o.searchResults.length > 0), u = j(() => o.searchResults.length), f = E(0), h = E(600), v = j(() => o.searchResults.length * Xe), w = j(() => {
      const b = Math.max(0, Math.floor(f.value / Xe) - On), x = Math.min(
        o.searchResults.length,
        Math.ceil((f.value + h.value) / Xe) + On
      );
      return { start: b, end: x };
    }), S = j(() => {
      const { start: b, end: x } = w.value;
      return o.searchResults.slice(b, x).map((C, V) => ({
        item: C,
        index: b + V,
        top: (b + V) * Xe
      }));
    }), F = (b) => {
      const x = b.target;
      f.value = x.scrollTop;
    }, _ = () => {
      r.value && (h.value = r.value.clientHeight);
    }, g = () => {
      if (o.selectedIndex >= 0 && r.value) {
        const b = o.selectedIndex * Xe, x = b + Xe, C = r.value.scrollTop, V = r.value.clientHeight, I = C + V;
        let q = C;
        b < C ? q = b : x > I && (q = x - V), q !== C && r.value.scrollTo({
          top: q,
          behavior: "smooth"
        });
      }
    }, m = () => {
      r.value && (r.value.scrollTop = 0, f.value = 0);
    };
    return fe(() => {
      _(), window.addEventListener("resize", _);
    }), $e(() => {
      window.removeEventListener("resize", _);
    }), re(
      () => r.value,
      () => {
        _();
      }
    ), e({
      scrollSelectedIntoView: g,
      resetScroll: m,
      getContainerHeight: () => h.value,
      scrollTop: () => f.value
    }), (b, x) => (p(), y("div", {
      class: G(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (p(), y("div", xl, [
        i("div", kl, [
          L(a(Vt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        i("span", null, k(a(d)("Searching...")), 1)
      ])) : c.value ? (p(), y("div", Sl, [
        i("div", Cl, [
          i("span", null, k(a(d)("Found %s results", u.value)), 1)
        ]),
        i("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: F
        }, [
          i("div", {
            class: "vuefinder__search-modal__results-items",
            style: Ve({ height: `${v.value}px`, position: "relative" })
          }, [
            (p(!0), y(de, null, ve(S.value, (C) => (p(), y("div", {
              key: C.item.path,
              style: Ve({
                position: "absolute",
                top: `${C.top}px`,
                left: "0",
                width: "100%",
                height: `${Xe}px`
              })
            }, [
              L(bl, {
                item: C.item,
                index: C.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: x[0] || (x[0] = (V) => s("selectResultItem", V)),
                onSelectWithDropdown: x[1] || (x[1] = (V) => s("selectResultItemWithDropdown", V)),
                onTogglePathExpansion: x[2] || (x[2] = (V) => s("togglePathExpansion", V)),
                onToggleItemDropdown: x[3] || (x[3] = (V, I) => s("toggleItemDropdown", V, I)),
                "onUpdate:selectedItemDropdownOption": x[4] || (x[4] = (V) => s("update:selectedItemDropdownOption", V)),
                onCopyPath: x[5] || (x[5] = (V) => s("copyPath", V)),
                onOpenContainingFolder: x[6] || (x[6] = (V) => s("openContainingFolder", V)),
                onPreview: x[7] || (x[7] = (V) => s("preview", V))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (p(), y("div", $l, [
        i("span", null, k(a(d)("No results found")), 1)
      ]))
    ], 2));
  }
}), Dl = { class: "vuefinder__search-modal" }, Pl = { class: "vuefinder__search-modal__content" }, El = { class: "vuefinder__search-modal__search-bar" }, Tl = { class: "vuefinder__search-modal__search-location" }, Al = ["title"], Ml = ["disabled"], Il = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, Ol = { class: "vuefinder__search-modal__folder-selector-content" }, Ll = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, Rl = { class: "vuefinder__search-modal__instructions-text" }, hn = /* @__PURE__ */ J({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = E(null), l = E(null), d = E(null), r = oo("", 300), c = E([]), u = E(!1), f = E(-1), h = E(!1), v = E(!1), w = E(null), S = E("all"), F = E(!1), _ = E(`size-${S.value}`), g = E(null), m = E(/* @__PURE__ */ new Set()), b = E(null), x = K(o.path), C = ($) => {
      m.value.has($) ? m.value.delete($) : m.value.add($);
    }, V = ($, P) => {
      P && typeof P.stopPropagation == "function" && P.stopPropagation(), b.value === $ ? b.value = null : b.value = $;
    }, I = () => {
      b.value = null;
    }, q = ($) => {
      try {
        const P = $.dir || `${$.storage}://`;
        e.adapter.open(P), e.modal.close(), I();
      } catch {
        e.emitter.emit("vf-toast-push", { label: t("Failed to open containing folder") });
      }
    }, O = ($) => {
      e.modal.open(Lt, {
        storage: x?.value?.storage ?? "local",
        item: $
      }), I();
    }, U = ($) => {
      f.value = $, I();
    }, ne = ($) => {
      f.value = $;
    }, ae = async ($) => {
      await ut($.path), I();
    };
    re(r, async ($) => {
      $.trim() ? (await ee($.trim()), f.value = 0) : (c.value = [], u.value = !1, f.value = -1);
    }), re(S, async ($) => {
      _.value = `size-${$}`, r.value.trim() && !v.value && (await ee(r.value.trim()), f.value = 0);
    }), re(F, async () => {
      r.value.trim() && !v.value && (await ee(r.value.trim()), f.value = 0);
    });
    const ee = async ($) => {
      if ($) {
        u.value = !0;
        try {
          const P = w.value?.path || x?.value?.path, T = await e.adapter.search({
            path: P,
            filter: $,
            deep: F.value,
            size: S.value
          });
          c.value = T || [], u.value = !1;
        } catch (P) {
          console.error("Search error:", P), c.value = [], u.value = !1;
        }
      }
    };
    fe(() => {
      document.addEventListener("click", D), _.value = `size-${S.value}`, Te(() => {
        s.value && s.value.focus();
      });
    });
    const ie = () => {
      v.value ? (v.value = !1, r.value.trim() && (ee(r.value.trim()), f.value = 0)) : (h.value = !1, v.value = !0);
    }, ce = ($) => {
      $ && (w.value = $);
    }, Y = ($) => {
      $ && (ce($), v.value = !1, r.value.trim() && (ee(r.value.trim()), f.value = 0));
    };
    $e(() => {
      document.removeEventListener("click", D), l.value && l.value.cleanup();
    });
    const D = ($) => {
      const P = $.target;
      if (h.value && (P.closest(".vuefinder__search-modal__dropdown") || (h.value = !1, Te(() => {
        s.value && s.value.focus();
      }))), b.value) {
        const T = P.closest(".vuefinder__search-modal__item-dropdown"), H = P.closest(".vuefinder__search-modal__result-item");
        !T && !H && I();
      }
    };
    return ($, P) => (p(), R(Ce, { class: "vuefinder__search-modal-layout" }, {
      default: W(() => [
        i("div", Dl, [
          L(Pe, {
            icon: a(fn),
            title: a(t)("Search files")
          }, null, 8, ["icon", "title"]),
          i("div", Pl, [
            i("div", El, [
              L(ir, {
                ref_key: "searchInputRef",
                ref: s,
                modelValue: a(r),
                "onUpdate:modelValue": P[0] || (P[0] = (T) => Oo(r) ? r.value = T : null),
                "is-searching": u.value,
                disabled: v.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              L(al, {
                ref_key: "searchOptionsDropdownRef",
                ref: l,
                visible: h.value,
                "onUpdate:visible": P[1] || (P[1] = (T) => h.value = T),
                "size-filter": S.value,
                "onUpdate:sizeFilter": P[2] || (P[2] = (T) => S.value = T),
                "selected-option": _.value,
                "onUpdate:selectedOption": P[3] || (P[3] = (T) => _.value = T),
                disabled: v.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            i("div", {
              class: "vuefinder__search-modal__options",
              onClick: P[7] || (P[7] = le(() => {
              }, ["stop"]))
            }, [
              i("div", Tl, [
                i("button", {
                  class: G(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": v.value }]),
                  onClick: le(ie, ["stop"])
                }, [
                  L(a(ze), { class: "vuefinder__search-modal__location-icon" }),
                  i("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: w.value?.path || a(x).path
                  }, k(a(wo)(w.value?.path || a(x).path)), 9, Al),
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
                onClick: P[6] || (P[6] = le(() => {
                }, ["stop"]))
              }, [
                pe(i("input", {
                  "onUpdate:modelValue": P[4] || (P[4] = (T) => F.value = T),
                  type: "checkbox",
                  disabled: v.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: P[5] || (P[5] = le(() => {
                  }, ["stop"]))
                }, null, 8, Ml), [
                  [tn, F.value]
                ]),
                i("span", null, k(a(t)("Include subfolders")), 1)
              ])
            ]),
            v.value ? (p(), y("div", Il, [
              i("div", Ol, [
                L(cn, {
                  modelValue: w.value,
                  "onUpdate:modelValue": [
                    P[8] || (P[8] = (T) => w.value = T),
                    ce
                  ],
                  "show-pinned-folders": !0,
                  "current-path": a(x),
                  onSelectAndClose: Y
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : A("", !0),
            !a(r).trim() && !v.value ? (p(), y("div", Ll, [
              i("p", Rl, k(a(t)("Search helper text")), 1)
            ])) : A("", !0),
            a(r).trim() && !v.value ? (p(), R(Fl, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": c.value,
              "is-searching": u.value,
              "selected-index": f.value,
              "expanded-paths": m.value,
              "active-dropdown": b.value,
              "selected-item-dropdown-option": g.value,
              "results-enter": !0,
              onSelectResultItem: U,
              onSelectResultItemWithDropdown: ne,
              onTogglePathExpansion: C,
              onToggleItemDropdown: V,
              "onUpdate:selectedItemDropdownOption": P[9] || (P[9] = (T) => g.value = T),
              onCopyPath: ae,
              onOpenContainingFolder: q,
              onPreview: O
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : A("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Bl = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: t }) {
    const o = Z(), s = E(!1), { t: l } = o.i18n;
    let d = null;
    const r = () => {
      d && clearTimeout(d), s.value = !0, d = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return fe(() => {
      o.emitter.on(n.on, r);
    }), $e(() => {
      d && clearTimeout(d);
    }), {
      shown: s,
      t: l
    };
  }
}, Vl = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [o, s] of e)
    t[o] = s;
  return t;
}, zl = { key: 1 };
function Nl(n, e, t, o, s, l) {
  return p(), y("div", {
    class: G(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    n.$slots.default ? be(n.$slots, "default", { key: 0 }) : (p(), y("span", zl, k(o.t("Saved.")), 1))
  ], 2);
}
const rt = /* @__PURE__ */ Vl(Bl, [["render", Nl]]), Ul = [
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
], Hl = { class: "vuefinder__about-modal__content" }, jl = { class: "vuefinder__about-modal__main" }, Kl = { class: "vuefinder__about-modal__description" }, ql = { class: "vuefinder__about-modal__settings" }, Wl = { class: "vuefinder__about-modal__settings__fieldset" }, Gl = { class: "vuefinder__about-modal__settings__section-title" }, Yl = { class: "vuefinder__about-modal__setting" }, Ql = { class: "vuefinder__about-modal__setting-label" }, Xl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Jl = { class: "vuefinder__about-modal__setting-input justify-end" }, Zl = ["checked"], ed = { class: "vuefinder__about-modal__setting" }, td = { class: "vuefinder__about-modal__setting-label" }, nd = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, od = { class: "vuefinder__about-modal__setting-input justify-end" }, sd = ["checked"], id = { class: "vuefinder__about-modal__setting" }, ad = { class: "vuefinder__about-modal__setting-label" }, rd = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, ld = { class: "vuefinder__about-modal__setting-input justify-end" }, dd = ["checked"], cd = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, ud = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, fd = { class: "vuefinder__about-modal__setting-input justify-end" }, vd = ["value"], pd = ["label"], md = ["value"], hd = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, _d = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, gd = { class: "vuefinder__about-modal__setting-input justify-end" }, wd = ["label"], yd = ["value"], bd = { class: "vuefinder__about-modal__tab-content" }, xd = { class: "vuefinder__about-modal__settings__section-title" }, kd = { class: "vuefinder__about-modal__description" }, xo = /* @__PURE__ */ J({
  __name: "ModalSettings",
  setup(n) {
    const e = Z(), { enabled: t } = Ie(), o = e.config, { clearStore: s } = e.storage, { t: l } = e.i18n, d = K(o.state), r = j(() => d.value.theme || "light"), c = async () => {
      o.reset(), s(), location.reload();
    }, u = (_) => {
      o.set("theme", _), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? Gn : on, e.emitter.emit("vf-metric-units-saved");
    }, h = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, v = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: w } = wt("VueFinderOptions"), F = Object.fromEntries(
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
      }).filter(([_]) => Object.keys(w).includes(_))
    );
    return (_, g) => (p(), R(Ce, null, {
      buttons: W(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[2] || (g[2] = (m) => a(e).modal.close())
        }, k(a(l)("Close")), 1)
      ]),
      default: W(() => [
        i("div", Hl, [
          L(Pe, {
            icon: a(go),
            title: a(l)("Settings")
          }, null, 8, ["icon", "title"]),
          i("div", jl, [
            i("div", Kl, k(a(l)("Customize your experience with the following settings")), 1),
            i("div", ql, [
              i("fieldset", Wl, [
                i("div", Gl, k(a(l)("General")), 1),
                i("div", Yl, [
                  i("div", Ql, [
                    i("label", Xl, k(a(l)("Use Metric Units")), 1)
                  ]),
                  i("div", Jl, [
                    i("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: a(o).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: f
                    }, null, 40, Zl),
                    L(rt, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: W(() => [
                        se(k(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", ed, [
                  i("div", td, [
                    i("label", nd, k(a(l)("Compact list view")), 1)
                  ]),
                  i("div", od, [
                    i("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: a(o).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: h
                    }, null, 40, sd),
                    L(rt, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: W(() => [
                        se(k(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", id, [
                  i("div", ad, [
                    i("label", rd, k(a(l)("Persist path on reload")), 1)
                  ]),
                  i("div", ld, [
                    i("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: a(o).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: v
                    }, null, 40, dd),
                    L(rt, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: W(() => [
                        se(k(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                a(t)("theme") ? (p(), y("div", cd, k(a(l)("Theme")), 1)) : A("", !0),
                a(t)("theme") ? (p(), y("div", ud, [
                  i("div", fd, [
                    i("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: g[0] || (g[0] = (m) => u(m.target?.value))
                    }, [
                      i("optgroup", {
                        label: a(l)("Theme")
                      }, [
                        (p(!0), y(de, null, ve(a(Ul), (m) => (p(), y("option", {
                          key: m.name,
                          value: m.name
                        }, k(m.displayName), 9, md))), 128))
                      ], 8, pd)
                    ], 40, vd),
                    L(rt, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: W(() => [
                        se(k(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : A("", !0),
                a(t)("language") && Object.keys(a(F)).length > 1 ? (p(), y("div", hd, k(a(l)("Language")), 1)) : A("", !0),
                a(t)("language") && Object.keys(a(F)).length > 1 ? (p(), y("div", _d, [
                  i("div", gd, [
                    pe(i("select", {
                      id: "language",
                      "onUpdate:modelValue": g[1] || (g[1] = (m) => a(e).i18n.locale = m),
                      class: "vuefinder__about-modal__select"
                    }, [
                      i("optgroup", {
                        label: a(l)("Language")
                      }, [
                        (p(!0), y(de, null, ve(a(F), (m, b) => (p(), y("option", {
                          key: b,
                          value: b
                        }, k(m), 9, yd))), 128))
                      ], 8, wd)
                    ], 512), [
                      [Qt, a(e).i18n.locale]
                    ]),
                    L(rt, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: W(() => [
                        se(k(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : A("", !0)
              ])
            ]),
            i("div", bd, [
              i("div", xd, k(a(l)("Reset")), 1),
              i("div", kd, k(a(l)("Reset all settings to default")), 1),
              i("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                onClick: c
              }, k(a(l)("Reset Settings")), 1)
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
function $d() {
  const n = Z(), e = n.fs, t = n.config, { enabled: o } = Ie(), s = K(e.path), l = K(e.selectedItems), d = (r) => {
    if (r.code === xe.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (r.metaKey && r.code === xe.KEY_R && !r.shiftKey && (n.adapter.invalidateListQuery(s.value.path), n.adapter.open(s.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === xe.KEY_R && o("rename") && l.value.length === 1 && (n.modal.open(Ot, { items: l.value }), r.preventDefault()), r.code === xe.DELETE && l.value.length !== 0 && n.modal.open(It, { items: l.value }), r.metaKey && r.code === xe.BACKSLASH && n.modal.open(Jn), r.metaKey && r.code === xe.KEY_F && o("search") && (n.modal.open(hn), r.preventDefault()), r.metaKey && r.code === xe.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === xe.KEY_S && (n.modal.open(xo), r.preventDefault()), r.metaKey && r.code === xe.ENTER && (t.toggle("fullScreen"), n.root.focus()), r.metaKey && r.code === xe.KEY_A && (e.selectAll(n.selectionMode || "multiple", n), r.preventDefault()), r.code === xe.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && n.modal.open(Lt, {
        storage: e.path.get().storage,
        item: l.value[0]
      }), r.metaKey && r.code === xe.KEY_C && o("copy")) {
        if (l.value.length === 0) {
          n.emitter.emit("vf-toast-push", {
            type: "error",
            label: n.i18n.t("No items selected")
          });
          return;
        }
        e.setClipboard("copy", new Set(l.value.map((c) => c.path))), n.emitter.emit("vf-toast-push", {
          label: l.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", l.value.length)
        }), r.preventDefault();
      }
      if (r.metaKey && r.code === xe.KEY_X && o("copy")) {
        if (l.value.length === 0) {
          n.emitter.emit("vf-toast-push", {
            type: "error",
            label: n.i18n.t("No items selected")
          });
          return;
        }
        e.setClipboard("cut", new Set(l.value.map((c) => c.path))), n.emitter.emit("vf-toast-push", {
          label: l.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", l.value.length)
        }), r.preventDefault();
      }
      if (r.metaKey && r.code === xe.KEY_V && o("copy")) {
        if (e.getClipboard().items.size === 0) {
          n.emitter.emit("vf-toast-push", {
            type: "error",
            label: n.i18n.t("No items in clipboard")
          });
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          n.emitter.emit("vf-toast-push", {
            type: "error",
            label: n.i18n.t("Cannot paste items to the same directory")
          });
          return;
        }
        if (e.getClipboard().type === "cut") {
          n.modal.open(st, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          n.modal.open(un, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  fe(async () => {
    if (await Te(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", d);
  }), Hn(() => {
    n.root && n.root.removeEventListener("keydown", d);
  });
}
function Sd() {
  const n = E(!1), e = E([]);
  return {
    isDraggingExternal: n,
    externalFiles: e,
    handleDragEnter: (r) => {
      r.preventDefault(), r.stopPropagation();
      const c = r.dataTransfer?.items;
      c && Array.from(c).some((f) => f.kind === "file") && (n.value = !0, r.isExternalDrag = !0);
    },
    handleDragOver: (r) => {
      n.value && r.dataTransfer && (r.dataTransfer.dropEffect = "copy", r.preventDefault(), r.stopPropagation());
    },
    handleDragLeave: (r) => {
      r.preventDefault();
      const c = r.currentTarget.getBoundingClientRect(), u = r.clientX, f = r.clientY;
      (u < c.left || u > c.right || f < c.top || f > c.bottom) && (n.value = !1);
    },
    handleDrop: async (r) => {
      r.preventDefault(), r.stopPropagation(), n.value = !1;
      const c = r.dataTransfer?.items;
      if (c) {
        const u = Array.from(c).filter((f) => f.kind === "file");
        if (u.length > 0) {
          e.value = [];
          for (const f of u) {
            const h = f.webkitGetAsEntry?.();
            if (h)
              await an((v, w) => {
                e.value.push({
                  name: w.name,
                  size: w.size,
                  type: w.type,
                  lastModified: new Date(w.lastModified),
                  file: w
                });
              }, h);
            else {
              const v = f.getAsFile();
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
const Cd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Fd(n, e) {
  return p(), y("svg", Cd, [...e[0] || (e[0] = [
    i("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ko = { render: Fd }, Dd = { class: "vuefinder__new-folder-modal__content" }, Pd = { class: "vuefinder__new-folder-modal__form" }, Ed = { class: "vuefinder__new-folder-modal__description" }, Td = ["placeholder"], _n = /* @__PURE__ */ J({
  __name: "ModalNewFolder",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = E(""), d = E(""), r = () => {
      l.value !== "" && e.adapter.createFolder({
        path: s.value.path,
        name: l.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: t("%s is created.", l.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: t(c.message), type: "error" });
      });
    };
    return (c, u) => (p(), R(Ce, null, {
      buttons: W(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, k(a(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[2] || (u[2] = (f) => a(e).modal.close())
        }, k(a(t)("Cancel")), 1)
      ]),
      default: W(() => [
        i("div", null, [
          L(Pe, {
            icon: a(ko),
            title: a(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          i("div", Dd, [
            i("div", Pd, [
              i("p", Ed, k(a(t)("Create a new folder")), 1),
              pe(i("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (f) => l.value = f),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: ft(r, ["enter"])
              }, null, 40, Td), [
                [vt, l.value]
              ]),
              d.value.length ? (p(), R(a(d), {
                key: 0,
                error: "",
                onHidden: u[1] || (u[1] = (f) => d.value = "")
              }, {
                default: W(() => [
                  se(k(d.value), 1)
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
}), Ad = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Md(n, e) {
  return p(), y("svg", Ad, [...e[0] || (e[0] = [
    i("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const $o = { render: Md }, Id = { class: "vuefinder__new-file-modal__content" }, Od = { class: "vuefinder__new-file-modal__form" }, Ld = { class: "vuefinder__new-file-modal__description" }, Rd = ["placeholder"], So = /* @__PURE__ */ J({
  __name: "ModalNewFile",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = E(""), d = E(""), r = () => {
      l.value !== "" && e.adapter.createFile({
        path: s.value.path,
        name: l.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: t("%s is created.", l.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: t(c.message), type: "error" });
      });
    };
    return (c, u) => (p(), R(Ce, null, {
      buttons: W(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, k(a(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[2] || (u[2] = (f) => a(e).modal.close())
        }, k(a(t)("Cancel")), 1)
      ]),
      default: W(() => [
        i("div", null, [
          L(Pe, {
            icon: a($o),
            title: a(t)("New File")
          }, null, 8, ["icon", "title"]),
          i("div", Id, [
            i("div", Od, [
              i("p", Ld, k(a(t)("Create a new file")), 1),
              pe(i("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (f) => l.value = f),
                class: "vuefinder__new-file-modal__input",
                placeholder: a(t)("File Name"),
                type: "text",
                onKeyup: ft(r, ["enter"])
              }, null, 40, Rd), [
                [vt, l.value]
              ]),
              d.value.length ? (p(), R(a(d), {
                key: 0,
                error: "",
                onHidden: u[1] || (u[1] = (f) => d.value = "")
              }, {
                default: W(() => [
                  se(k(d.value), 1)
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
}), Bd = ["title"], Vd = /* @__PURE__ */ J({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, o = Z(), { t: s } = o.i18n, l = E(!1), d = E(null), r = E(d.value?.innerHTML);
    re(r, () => l.value = !1);
    const c = () => {
      t("hidden"), l.value = !0;
    };
    return (u, f) => (p(), y("div", null, [
      l.value ? A("", !0) : (p(), y("div", {
        key: 0,
        ref_key: "strMessage",
        ref: d,
        class: G(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        be(u.$slots, "default"),
        i("div", {
          class: "vuefinder__message__close",
          title: a(s)("Close"),
          onClick: c
        }, [...f[0] || (f[0] = [
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
        ])], 8, Bd)
      ], 2))
    ]));
  }
});
function en(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const zd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Nd(n, e) {
  return p(), y("svg", zd, [...e[0] || (e[0] = [
    i("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Co = { render: Nd }, Ud = { class: "vuefinder__upload-modal__content relative" }, Hd = { class: "vuefinder__upload-modal__target-section" }, jd = { class: "vuefinder__upload-modal__target-label" }, Kd = { class: "vuefinder__upload-modal__target-container" }, qd = { class: "vuefinder__upload-modal__target-path" }, Wd = { class: "vuefinder__upload-modal__target-storage" }, Gd = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Yd = { class: "vuefinder__upload-modal__target-badge" }, Qd = { class: "vuefinder__upload-modal__drag-hint" }, Xd = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Jd = ["textContent"], Zd = { class: "vuefinder__upload-modal__file-info" }, ec = { class: "vuefinder__upload-modal__file-name hidden md:block" }, tc = { class: "vuefinder__upload-modal__file-name md:hidden" }, nc = {
  key: 0,
  class: "ml-auto"
}, oc = ["title", "disabled", "onClick"], sc = {
  key: 0,
  class: "py-2"
}, ic = ["aria-expanded"], ac = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, rc = ["disabled"], lc = ["aria-expanded"], dc = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, gn = /* @__PURE__ */ J({
  __name: "ModalUpload",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = E(s.value), d = E(!1), r = () => {
      const D = l.value.path;
      if (!D) return { storage: "local", path: "" };
      if (D.endsWith("://"))
        return { storage: D.replace("://", ""), path: "" };
      const $ = D.split("://");
      return {
        storage: $[0] || "local",
        path: $[1] || ""
      };
    }, c = (D) => {
      D && (l.value = D);
    }, u = (D) => {
      D && (l.value = D, d.value = !1);
    }, {
      container: f,
      internalFileInput: h,
      internalFolderInput: v,
      pickFiles: w,
      queue: S,
      message: F,
      uploading: _,
      hasFilesInDropArea: g,
      definitions: m,
      openFileSelector: b,
      upload: x,
      cancel: C,
      remove: V,
      clear: I,
      close: q,
      getClassNameForEntry: O,
      getIconForEntry: U,
      addExternalFiles: ne
    } = to(e.customUploader), ae = () => {
      x(l.value);
    };
    fe(() => {
      e.emitter.on("vf-external-files-dropped", (D) => {
        ne(D);
      });
    }), $e(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const ee = E(!1), ie = E(null), ce = E(null), Y = (D) => {
      if (!ee.value) return;
      const $ = D.target, P = ie.value?.contains($) ?? !1, T = ce.value?.contains($) ?? !1;
      !P && !T && (ee.value = !1);
    };
    return fe(() => document.addEventListener("click", Y)), $e(() => document.removeEventListener("click", Y)), (D, $) => (p(), R(Ce, {
      "show-drag-overlay": a(g),
      "drag-overlay-text": a(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: W(() => [
        i("div", {
          ref_key: "actionsMenuMobileRef",
          ref: ie,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          i("div", {
            class: G([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              ee.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: $[3] || ($[3] = (P) => a(b)())
            }, k(a(t)("Select Files")), 1),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": ee.value ? "true" : "false",
              onClick: $[4] || ($[4] = le((P) => ee.value = !ee.value, ["stop"]))
            }, [...$[17] || ($[17] = [
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
            ])], 8, ic)
          ], 2),
          ee.value ? (p(), y("div", ac, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[5] || ($[5] = (P) => {
                a(b)(), ee.value = !1;
              })
            }, k(a(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[6] || ($[6] = (P) => {
                a(v)?.click(), ee.value = !1;
              })
            }, k(a(t)("Select Folders")), 1),
            $[18] || ($[18] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: G(["vuefinder__upload-actions__item", a(_) ? "disabled" : ""]),
              onClick: $[7] || ($[7] = (P) => a(_) ? null : (a(I)(!1), ee.value = !1))
            }, k(a(t)("Clear all")), 3),
            i("div", {
              class: G(["vuefinder__upload-actions__item", a(_) ? "disabled" : ""]),
              onClick: $[8] || ($[8] = (P) => a(_) ? null : (a(I)(!0), ee.value = !1))
            }, k(a(t)("Clear only successful")), 3)
          ])) : A("", !0)
        ], 512),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: a(_) || !a(S).length,
          onClick: le(ae, ["prevent"])
        }, k(a(t)("Upload")), 9, rc),
        a(_) ? (p(), y("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[9] || ($[9] = le(
            //@ts-ignore
            (...P) => a(C) && a(C)(...P),
            ["prevent"]
          ))
        }, k(a(t)("Cancel")), 1)) : (p(), y("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[10] || ($[10] = le(
            //@ts-ignore
            (...P) => a(q) && a(q)(...P),
            ["prevent"]
          ))
        }, k(a(t)("Close")), 1)),
        i("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: ce,
          class: "relative mr-auto hidden sm:block"
        }, [
          i("div", {
            class: G(["vuefinder__upload-actions", ee.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            i("button", {
              ref_key: "pickFiles",
              ref: w,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, k(a(t)("Select Files")), 513),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": ee.value ? "true" : "false",
              onClick: $[11] || ($[11] = le((P) => ee.value = !ee.value, ["stop"]))
            }, [...$[19] || ($[19] = [
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
            ])], 8, lc)
          ], 2),
          ee.value ? (p(), y("div", dc, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[12] || ($[12] = (P) => {
                a(b)(), ee.value = !1;
              })
            }, k(a(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[13] || ($[13] = (P) => {
                a(v)?.click(), ee.value = !1;
              })
            }, k(a(t)("Select Folders")), 1),
            $[20] || ($[20] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: G(["vuefinder__upload-actions__item", a(_) ? "disabled" : ""]),
              onClick: $[14] || ($[14] = (P) => a(_) ? null : (a(I)(!1), ee.value = !1))
            }, k(a(t)("Clear all")), 3),
            i("div", {
              class: G(["vuefinder__upload-actions__item", a(_) ? "disabled" : ""]),
              onClick: $[15] || ($[15] = (P) => a(_) ? null : (a(I)(!0), ee.value = !1))
            }, k(a(t)("Clear only successful")), 3)
          ])) : A("", !0)
        ], 512)
      ]),
      default: W(() => [
        i("div", null, [
          L(Pe, {
            icon: a(Co),
            title: a(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          i("div", Ud, [
            i("div", Hd, [
              i("div", jd, k(a(t)("Hedef Klasör")), 1),
              i("div", Kd, [
                i("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: $[0] || ($[0] = (P) => d.value = !d.value)
                }, [
                  i("div", qd, [
                    i("span", Wd, k(r().storage) + "://", 1),
                    r().path ? (p(), y("span", Gd, k(r().path), 1)) : A("", !0)
                  ]),
                  i("span", Yd, k(a(t)("Browse")), 1)
                ])
              ]),
              i("div", {
                class: G([
                  "vuefinder__upload-modal__tree-selector",
                  d.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                L(cn, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    $[1] || ($[1] = (P) => l.value = P),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: u
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            i("div", Qd, k(a(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            i("div", {
              ref_key: "container",
              ref: f,
              class: "hidden"
            }, null, 512),
            i("div", Xd, [
              (p(!0), y(de, null, ve(a(S), (P) => (p(), y("div", {
                key: P.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                i("span", {
                  class: G(["vuefinder__upload-modal__file-icon", a(O)(P)])
                }, [
                  i("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: k(a(U)(P))
                  }, null, 8, Jd)
                ], 2),
                i("div", Zd, [
                  i("div", ec, k(a(en)(P.name, 40)) + " (" + k(P.size) + ") ", 1),
                  i("div", tc, k(a(en)(P.name, 16)) + " (" + k(P.size) + ") ", 1),
                  i("div", {
                    class: G(["vuefinder__upload-modal__file-status", a(O)(P)])
                  }, [
                    se(k(P.statusName) + " ", 1),
                    P.status === a(m).QUEUE_ENTRY_STATUS.UPLOADING ? (p(), y("b", nc, k(P.percent), 1)) : A("", !0)
                  ], 2)
                ]),
                i("button", {
                  type: "button",
                  class: G(["vuefinder__upload-modal__file-remove", a(_) ? "disabled" : ""]),
                  title: a(t)("Delete"),
                  disabled: a(_),
                  onClick: (T) => a(V)(P)
                }, [...$[16] || ($[16] = [
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
                ])], 10, oc)
              ]))), 128)),
              a(S).length ? A("", !0) : (p(), y("div", sc, k(a(t)("No files selected!")), 1))
            ]),
            a(F).length ? (p(), R(Vd, {
              key: 0,
              error: "",
              onHidden: $[2] || ($[2] = (P) => F.value = "")
            }, {
              default: W(() => [
                se(k(a(F)), 1)
              ]),
              _: 1
            })) : A("", !0)
          ])
        ]),
        i("input", {
          ref_key: "internalFileInput",
          ref: h,
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
}), cc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function uc(n, e) {
  return p(), y("svg", cc, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Fo = { render: uc }, fc = { class: "vuefinder__unarchive-modal__content" }, vc = { class: "vuefinder__unarchive-modal__items" }, pc = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hc = { class: "vuefinder__unarchive-modal__item-name" }, _c = { class: "vuefinder__unarchive-modal__info" }, wn = /* @__PURE__ */ J({
  __name: "ModalUnarchive",
  setup(n) {
    const e = Z(), t = e.fs, o = K(t.path), { t: s } = e.i18n, l = E(e.modal.data.items[0]), d = E(""), r = E([]), c = () => {
      e.adapter.unarchive({
        item: l.value.path,
        path: o.value.path
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: s("The file unarchived.") }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: s(u.message), type: "error" });
      });
    };
    return (u, f) => (p(), R(Ce, null, {
      buttons: W(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, k(a(s)("Unarchive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (h) => a(e).modal.close())
        }, k(a(s)("Cancel")), 1)
      ]),
      default: W(() => [
        i("div", null, [
          L(Pe, {
            icon: a(Fo),
            title: a(s)("Unarchive")
          }, null, 8, ["icon", "title"]),
          i("div", fc, [
            i("div", vc, [
              (p(!0), y(de, null, ve(r.value, (h) => (p(), y("p", {
                key: h.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                h.type === "dir" ? (p(), y("svg", pc, [...f[2] || (f[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (p(), y("svg", mc, [...f[3] || (f[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", hc, k(h.basename), 1)
              ]))), 128)),
              i("p", _c, k(a(s)("The archive will be unarchived at")) + " (" + k(a(o).path) + ") ", 1),
              d.value.length ? (p(), R(a(d), {
                key: 0,
                error: "",
                onHidden: f[0] || (f[0] = (h) => d.value = "")
              }, {
                default: W(() => [
                  se(k(d.value), 1)
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
}), gc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function wc(n, e) {
  return p(), y("svg", gc, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Do = { render: wc }, yc = { class: "vuefinder__archive-modal__content" }, bc = { class: "vuefinder__archive-modal__form" }, xc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, kc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $c = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Sc = { class: "vuefinder__archive-modal__file-name" }, Cc = ["placeholder"], yn = /* @__PURE__ */ J({
  __name: "ModalArchive",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = E(""), d = E(""), r = E(e.modal.data.items), c = () => {
      r.value.length && e.adapter.archive({
        path: s.value.path,
        items: r.value.map(({ path: u, type: f }) => ({
          path: u,
          type: f
        })),
        name: l.value
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: t("The file(s) archived.") }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: t(u.message), type: "error" });
      });
    };
    return (u, f) => (p(), R(Ce, null, {
      buttons: W(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, k(a(t)("Archive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[2] || (f[2] = (h) => a(e).modal.close())
        }, k(a(t)("Cancel")), 1)
      ]),
      default: W(() => [
        i("div", null, [
          L(Pe, {
            icon: a(Do),
            title: a(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          i("div", yc, [
            i("div", bc, [
              i("div", xc, [
                (p(!0), y(de, null, ve(r.value, (h) => (p(), y("p", {
                  key: h.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  h.type === "dir" ? (p(), y("svg", kc, [...f[3] || (f[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (p(), y("svg", $c, [...f[4] || (f[4] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Sc, k(h.basename), 1)
                ]))), 128))
              ]),
              pe(i("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (h) => l.value = h),
                class: "vuefinder__archive-modal__input",
                placeholder: a(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: ft(c, ["enter"])
              }, null, 40, Cc), [
                [vt, l.value]
              ]),
              d.value.length ? (p(), R(a(d), {
                key: 0,
                error: "",
                onHidden: f[1] || (f[1] = (h) => d.value = "")
              }, {
                default: W(() => [
                  se(k(d.value), 1)
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
}), Fc = { class: "vuefinder__about-modal__content" }, Dc = { class: "vuefinder__about-modal__main" }, Pc = { class: "vuefinder__about-modal__shortcuts" }, Ec = { class: "vuefinder__about-modal__shortcut" }, Tc = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Ac = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Mc = { class: "vuefinder__about-modal__shortcut" }, Ic = { class: "vuefinder__about-modal__shortcut" }, Oc = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, Lc = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, Rc = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, Bc = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, Vc = { class: "vuefinder__about-modal__shortcut" }, zc = { class: "vuefinder__about-modal__shortcut" }, Nc = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, Uc = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, Hc = /* @__PURE__ */ J({
  __name: "ModalShortcuts",
  setup(n) {
    const e = Z(), { enabled: t } = Ie(), { t: o } = e.i18n;
    return (s, l) => (p(), R(Ce, null, {
      buttons: W(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (d) => a(e).modal.close())
        }, k(a(o)("Close")), 1)
      ]),
      default: W(() => [
        i("div", Fc, [
          L(Pe, {
            icon: a(Xn),
            title: a(o)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          i("div", Dc, [
            i("div", Pc, [
              i("div", Ec, [
                i("div", null, k(a(o)("Refresh")), 1),
                l[1] || (l[1] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "R")
                ], -1))
              ]),
              a(t)("rename") ? (p(), y("div", Tc, [
                i("div", null, k(a(o)("Rename")), 1),
                l[2] || (l[2] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "Shift"),
                  se(" + "),
                  i("kbd", null, "R")
                ], -1))
              ])) : A("", !0),
              a(t)("delete") ? (p(), y("div", Ac, [
                i("div", null, k(a(o)("Delete")), 1),
                l[3] || (l[3] = i("kbd", null, "Del", -1))
              ])) : A("", !0),
              i("div", Mc, [
                i("div", null, k(a(o)("Escape")), 1),
                l[4] || (l[4] = i("kbd", null, "Esc", -1))
              ]),
              i("div", Ic, [
                i("div", null, k(a(o)("Select All")), 1),
                l[5] || (l[5] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "A")
                ], -1))
              ]),
              a(t)("copy") ? (p(), y("div", Oc, [
                i("div", null, k(a(o)("Cut")), 1),
                l[6] || (l[6] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "X")
                ], -1))
              ])) : A("", !0),
              a(t)("copy") ? (p(), y("div", Lc, [
                i("div", null, k(a(o)("Copy")), 1),
                l[7] || (l[7] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "C")
                ], -1))
              ])) : A("", !0),
              a(t)("copy") ? (p(), y("div", Rc, [
                i("div", null, k(a(o)("Paste")), 1),
                l[8] || (l[8] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "V")
                ], -1))
              ])) : A("", !0),
              a(t)("search") ? (p(), y("div", Bc, [
                i("div", null, k(a(o)("Search")), 1),
                l[9] || (l[9] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "F")
                ], -1))
              ])) : A("", !0),
              i("div", Vc, [
                i("div", null, k(a(o)("Toggle Sidebar")), 1),
                l[10] || (l[10] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "E")
                ], -1))
              ]),
              i("div", zc, [
                i("div", null, k(a(o)("Open Settings")), 1),
                l[11] || (l[11] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "S")
                ], -1))
              ]),
              a(t)("fullscreen") ? (p(), y("div", Nc, [
                i("div", null, k(a(o)("Toggle Full Screen")), 1),
                l[12] || (l[12] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "Enter")
                ], -1))
              ])) : A("", !0),
              a(t)("preview") ? (p(), y("div", Uc, [
                i("div", null, k(a(o)("Preview")), 1),
                l[13] || (l[13] = i("kbd", null, "Space", -1))
              ])) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), jc = { class: "vuefinder__menubar__container" }, Kc = ["onClick", "onMouseenter"], qc = { class: "vuefinder__menubar__label" }, Wc = ["onMouseenter"], Gc = ["onClick"], Yc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Qc = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Xc = /* @__PURE__ */ J({
  __name: "MenuBar",
  setup(n) {
    const e = Z(), { enabled: t } = Ie(), { t: o } = e?.i18n || { t: (m) => m }, s = e?.fs, l = e?.config, d = K(l.state), r = K(s.selectedItems), c = K(s?.storages || []), u = E(null), f = E(!1), h = j(() => window.opener !== null || window.name !== "" || window.history.length <= 1), v = j(() => [
      {
        id: "file",
        label: o("File"),
        items: [
          {
            id: "new-folder",
            label: o("New Folder"),
            action: () => e?.modal?.open(_n, { items: r.value }),
            enabled: () => t("newfolder")
          },
          {
            id: "new-file",
            label: o("New File"),
            action: () => e?.modal?.open(So, { items: r.value }),
            enabled: () => t("newfile")
          },
          { type: "separator" },
          {
            id: "upload",
            label: o("Upload"),
            action: () => e?.modal?.open(gn, { items: r.value }),
            enabled: () => t("upload")
          },
          { type: "separator" },
          {
            id: "search",
            label: o("Search"),
            action: () => e.modal.open(hn),
            enabled: () => t("search")
          },
          { type: "separator" },
          {
            id: "archive",
            label: o("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(yn, { items: r.value });
            },
            enabled: () => r.value.length > 0 && t("archive")
          },
          {
            id: "unarchive",
            label: o("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(wn, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && t("unarchive")
          },
          { type: "separator" },
          {
            id: "preview",
            label: o("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(Lt, {
                storage: s?.path?.get()?.storage,
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
              action: () => s?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: o("Deselect All"),
              action: () => s?.clearSelection(),
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          ...t("copy") ? [
            {
              id: "cut",
              label: o("Cut"),
              action: () => {
                r.value.length > 0 && s?.setClipboard(
                  "cut",
                  new Set(r.value.map((m) => m.path))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "copy",
              label: o("Copy"),
              action: () => {
                r.value.length > 0 && s?.setClipboard(
                  "copy",
                  new Set(r.value.map((m) => m.path))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "paste",
              label: o("Paste"),
              action: () => {
                const m = s?.getClipboard();
                m?.items?.size > 0 && e?.modal?.open(m.type === "cut" ? st : un, {
                  items: { from: Array.from(m.items), to: s?.path?.get() }
                });
              },
              enabled: () => s?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...t("move") ? [
            {
              id: "move",
              label: o("Move"),
              action: () => {
                if (r.value.length > 0) {
                  const m = e?.fs, b = {
                    storage: m?.path?.get()?.storage || "",
                    path: m?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(st, { items: { from: r.value, to: b } });
                }
              },
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "copy-path",
            label: o("Copy Path"),
            action: async () => {
              if (r.value.length === 1) {
                const m = r.value[0];
                await ut(m.path);
              } else {
                const m = s?.path?.get();
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
              if (r.value.length === 1) {
                const m = r.value[0];
                s?.path?.get()?.storage;
                const b = e?.adapter?.getDownloadUrl({ path: m.path });
                b && await dl(b);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: o("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(Ot, { items: r.value });
            },
            enabled: () => r.value.length === 1 && t("rename")
          },
          {
            id: "delete",
            label: o("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(It, { items: r.value });
            },
            enabled: () => r.value.length > 0 && t("delete")
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
              e?.adapter.list(s?.path?.get()?.path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: o("Grid View"),
            action: () => l?.set("view", "grid"),
            enabled: () => !0,
            checked: () => d.value?.view === "grid"
          },
          {
            id: "list-view",
            label: o("List View"),
            action: () => l?.set("view", "list"),
            enabled: () => !0,
            checked: () => d.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: o("Tree View"),
            action: () => l?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => d.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: o("Show Thumbnails"),
            action: () => l?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => d.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: o("Show Hidden Files"),
            action: () => l?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => d.value?.showHiddenFiles
          },
          { type: "separator" },
          {
            id: "fullscreen",
            label: o("Full Screen"),
            action: () => l?.toggle("fullScreen"),
            enabled: () => t("fullscreen"),
            checked: () => d.value?.fullScreen
          }
        ]
      },
      {
        id: "go",
        label: o("Go"),
        items: [
          ...t("history") ? [
            {
              id: "forward",
              label: o("Forward"),
              action: () => {
                s?.goForward();
                const m = s?.path?.get();
                m?.path && e?.adapter.open(m.path);
              },
              enabled: () => s?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: o("Back"),
              action: () => {
                s?.goBack();
                const m = s?.path?.get();
                m?.path && e?.adapter.open(m.path);
              },
              enabled: () => s?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: o("Open containing folder"),
            action: () => {
              const m = s?.path?.get();
              if (m?.breadcrumb && m.breadcrumb.length > 1) {
                const x = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
                e?.adapter.open(x);
              }
            },
            enabled: () => {
              const m = s?.path?.get();
              return m?.breadcrumb && m.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(c.value || []).map((m) => ({
            id: `storage-${m}`,
            label: m,
            action: () => {
              const b = `${m}://`;
              s?.setPath(b), e?.adapter.list(b);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: o("Go to Folder"),
            action: () => {
              const m = prompt(o("Enter folder path:"));
              m && (s?.setPath(m), e?.adapter.list(m));
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
            action: () => e?.modal?.open(xo),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: o("Shortcuts"),
            action: () => e?.modal?.open(Hc),
            enabled: () => !0
          },
          {
            id: "about",
            label: o("About"),
            action: () => e?.modal?.open(Jn),
            enabled: () => !0
          }
        ]
      }
    ]), w = (m) => {
      u.value === m ? F() : (u.value = m, f.value = !0);
    }, S = (m) => {
      f.value && (u.value = m);
    }, F = () => {
      u.value = null, f.value = !1;
    }, _ = (m) => {
      F(), m();
    }, g = (m) => {
      m.target.closest(".vuefinder__menubar") || F();
    };
    return fe(() => {
      document.addEventListener("click", g);
    }), $e(() => {
      document.removeEventListener("click", g);
    }), (m, b) => (p(), y("div", {
      class: "vuefinder__menubar",
      onClick: b[0] || (b[0] = le(() => {
      }, ["stop"]))
    }, [
      i("div", jc, [
        (p(!0), y(de, null, ve(v.value, (x) => (p(), y("div", {
          key: x.id,
          class: G(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": u.value === x.id }]),
          onClick: (C) => w(x.id),
          onMouseenter: (C) => S(x.id)
        }, [
          i("span", qc, k(x.label), 1),
          u.value === x.id ? (p(), y("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (C) => S(x.id)
          }, [
            (p(!0), y(de, null, ve(x.items, (C) => (p(), y("div", {
              key: C.id || C.type,
              class: G(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": C.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": C.enabled && !C.enabled(),
                "vuefinder__menubar__dropdown__item--checked": C.checked && C.checked()
              }]),
              onClick: le((V) => C.type !== "separator" && C.enabled && C.enabled() ? _(C.action) : null, ["stop"])
            }, [
              C.type !== "separator" ? (p(), y("span", Yc, k(C.label), 1)) : A("", !0),
              C.checked && C.checked() ? (p(), y("span", Qc, " ✓ ")) : A("", !0)
            ], 10, Gc))), 128))
          ], 40, Wc)) : A("", !0)
        ], 42, Kc))), 128))
      ])
    ]));
  }
}), Jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Zc(n, e) {
  return p(), y("svg", Jc, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const eu = { render: Zc }, tu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function nu(n, e) {
  return p(), y("svg", tu, [...e[0] || (e[0] = [
    i("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const ou = { render: nu }, su = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function iu(n, e) {
  return p(), y("svg", su, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const au = { render: iu }, ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function lu(n, e) {
  return p(), y("svg", ru, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const du = { render: lu }, cu = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function uu(n, e) {
  return p(), y("svg", cu, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const fu = { render: uu }, vu = { class: "vuefinder__toolbar" }, pu = { class: "vuefinder__toolbar__actions" }, mu = ["title"], hu = ["title"], _u = ["title"], gu = ["title"], wu = ["title"], yu = ["title"], bu = ["title"], xu = { class: "vuefinder__toolbar__controls" }, ku = ["title"], $u = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Su = ["title"], Cu = { class: "relative" }, Fu = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Du = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Pu = { class: "vuefinder__toolbar__dropdown-content" }, Eu = { class: "vuefinder__toolbar__dropdown-section" }, Tu = { class: "vuefinder__toolbar__dropdown-label" }, Au = { class: "vuefinder__toolbar__dropdown-row" }, Mu = { value: "name" }, Iu = { value: "size" }, Ou = { value: "modified" }, Lu = { value: "" }, Ru = { value: "asc" }, Bu = { value: "desc" }, Vu = { class: "vuefinder__toolbar__dropdown-section" }, zu = { class: "vuefinder__toolbar__dropdown-label" }, Nu = { class: "vuefinder__toolbar__dropdown-options" }, Uu = { class: "vuefinder__toolbar__dropdown-option" }, Hu = { class: "vuefinder__toolbar__option-text" }, ju = { class: "vuefinder__toolbar__dropdown-option" }, Ku = { class: "vuefinder__toolbar__option-text" }, qu = { class: "vuefinder__toolbar__dropdown-option" }, Wu = { class: "vuefinder__toolbar__option-text" }, Gu = { class: "vuefinder__toolbar__dropdown-toggle" }, Yu = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Qu = { class: "vuefinder__toolbar__dropdown-reset" }, Xu = ["title"], Ju = ["title"], Zu = /* @__PURE__ */ J({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = Z(), { enabled: t } = Ie(), { t: o } = e.i18n, s = e.fs, l = e.config, d = K(l.state), r = K(s.selectedItems), c = K(s.sort), u = K(s.filter);
    re(
      () => d.value.fullScreen,
      () => {
        if (d.value.fullScreen) {
          const _ = document.querySelector("body");
          _ && (_.style.overflow = "hidden");
        } else {
          const _ = document.querySelector("body");
          _ && (_.style.overflow = "");
        }
        e.emitter.emit("vf-fullscreen-toggle");
      }
    );
    const f = E(!1), h = (_) => {
      _.target.closest(".vuefinder__toolbar__dropdown-container") || (f.value = !1);
    };
    fe(() => {
      document.addEventListener("click", h);
    }), $e(() => {
      document.removeEventListener("click", h);
    });
    const v = E({
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
      () => v.value.sortBy,
      (_) => {
        if (!v.value.sortOrder) {
          s.clearSort();
          return;
        }
        _ === "name" ? s.setSort("basename", v.value.sortOrder) : _ === "size" ? s.setSort("file_size", v.value.sortOrder) : _ === "modified" && s.setSort("last_modified", v.value.sortOrder);
      }
    ), re(
      () => v.value.sortOrder,
      (_) => {
        if (!_) {
          s.clearSort();
          return;
        }
        v.value.sortBy === "name" ? s.setSort("basename", _) : v.value.sortBy === "size" ? s.setSort("file_size", _) : v.value.sortBy === "modified" && s.setSort("last_modified", _);
      }
    ), re(
      c,
      (_) => {
        _.active ? (_.column === "basename" ? v.value.sortBy = "name" : _.column === "file_size" ? v.value.sortBy = "size" : _.column === "last_modified" && (v.value.sortBy = "modified"), v.value.sortOrder = _.order) : v.value.sortOrder = "";
      },
      { immediate: !0 }
    ), re(
      () => v.value.filterKind,
      (_) => {
        s.setFilter(_, d.value.showHiddenFiles);
      }
    ), re(
      () => v.value.showHidden,
      (_) => {
        l.set("showHiddenFiles", _), s.setFilter(v.value.filterKind, _);
      }
    ), re(
      u,
      (_) => {
        v.value.filterKind = _.kind;
      },
      { immediate: !0 }
    ), re(
      () => d.value.showHiddenFiles,
      (_) => {
        v.value.showHidden = _, s.setFilter(v.value.filterKind, _);
      },
      { immediate: !0 }
    );
    const w = () => l.set("view", d.value.view === "grid" ? "list" : "grid"), S = j(() => u.value.kind !== "all" || !d.value.showHiddenFiles || c.value.active), F = () => {
      v.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), s.clearSort(), s.clearFilter();
    };
    return (_, g) => (p(), y("div", vu, [
      i("div", pu, [
        a(t)("newfolder") ? (p(), y("div", {
          key: 0,
          class: "mx-1.5",
          title: a(o)("New Folder"),
          onClick: g[0] || (g[0] = (m) => a(e).modal.open(_n, { items: a(r) }))
        }, [
          L(a(ko))
        ], 8, mu)) : A("", !0),
        a(t)("newfile") ? (p(), y("div", {
          key: 1,
          class: "mx-1.5",
          title: a(o)("New File"),
          onClick: g[1] || (g[1] = (m) => a(e).modal.open(So, { items: a(r) }))
        }, [
          L(a($o))
        ], 8, hu)) : A("", !0),
        a(t)("rename") ? (p(), y("div", {
          key: 2,
          class: "mx-1.5",
          title: a(o)("Rename"),
          onClick: g[2] || (g[2] = (m) => a(r).length !== 1 || a(e).modal.open(Ot, { items: a(r) }))
        }, [
          L(a(eo), {
            class: G(a(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, _u)) : A("", !0),
        a(t)("delete") ? (p(), y("div", {
          key: 3,
          class: "mx-1.5",
          title: a(o)("Delete"),
          onClick: g[3] || (g[3] = (m) => !a(r).length || a(e).modal.open(It, { items: a(r) }))
        }, [
          L(a(Zn), {
            class: G(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, gu)) : A("", !0),
        a(t)("upload") ? (p(), y("div", {
          key: 4,
          class: "mx-1.5",
          title: a(o)("Upload"),
          onClick: g[4] || (g[4] = (m) => a(e).modal.open(gn, { items: a(r) }))
        }, [
          L(a(Co))
        ], 8, wu)) : A("", !0),
        a(t)("unarchive") && a(r).length === 1 && a(r)[0].mime_type === "application/zip" ? (p(), y("div", {
          key: 5,
          class: "mx-1.5",
          title: a(o)("Unarchive"),
          onClick: g[5] || (g[5] = (m) => !a(r).length || a(e).modal.open(wn, { items: a(r) }))
        }, [
          L(a(Fo), {
            class: G(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, yu)) : A("", !0),
        a(t)("archive") ? (p(), y("div", {
          key: 6,
          class: "mx-1.5",
          title: a(o)("Archive"),
          onClick: g[6] || (g[6] = (m) => !a(r).length || a(e).modal.open(yn, { items: a(r) }))
        }, [
          L(a(Do), {
            class: G(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, bu)) : A("", !0)
      ]),
      i("div", xu, [
        a(t)("search") ? (p(), y("div", {
          key: 0,
          class: "mx-1.5",
          title: a(o)("Search Files"),
          onClick: g[7] || (g[7] = (m) => a(e).modal.open(hn))
        }, [
          L(a(fn), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, ku)) : A("", !0),
        i("div", $u, [
          i("div", {
            title: a(o)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: g[8] || (g[8] = (m) => f.value = !f.value)
          }, [
            i("div", Cu, [
              L(a(fu), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              S.value ? (p(), y("div", Fu)) : A("", !0)
            ])
          ], 8, Su),
          f.value ? (p(), y("div", Du, [
            i("div", Pu, [
              i("div", Eu, [
                i("div", Tu, k(a(o)("Sorting")), 1),
                i("div", Au, [
                  pe(i("select", {
                    "onUpdate:modelValue": g[9] || (g[9] = (m) => v.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", Mu, k(a(o)("Name")), 1),
                    i("option", Iu, k(a(o)("Size")), 1),
                    i("option", Ou, k(a(o)("Date")), 1)
                  ], 512), [
                    [Qt, v.value.sortBy]
                  ]),
                  pe(i("select", {
                    "onUpdate:modelValue": g[10] || (g[10] = (m) => v.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", Lu, k(a(o)("None")), 1),
                    i("option", Ru, k(a(o)("Asc")), 1),
                    i("option", Bu, k(a(o)("Desc")), 1)
                  ], 512), [
                    [Qt, v.value.sortOrder]
                  ])
                ])
              ]),
              i("div", Vu, [
                i("div", zu, k(a(o)("Show")), 1),
                i("div", Nu, [
                  i("label", Uu, [
                    pe(i("input", {
                      "onUpdate:modelValue": g[11] || (g[11] = (m) => v.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Wt, v.value.filterKind]
                    ]),
                    i("span", Hu, k(a(o)("All items")), 1)
                  ]),
                  i("label", ju, [
                    pe(i("input", {
                      "onUpdate:modelValue": g[12] || (g[12] = (m) => v.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Wt, v.value.filterKind]
                    ]),
                    i("span", Ku, k(a(o)("Files only")), 1)
                  ]),
                  i("label", qu, [
                    pe(i("input", {
                      "onUpdate:modelValue": g[13] || (g[13] = (m) => v.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Wt, v.value.filterKind]
                    ]),
                    i("span", Wu, k(a(o)("Folders only")), 1)
                  ])
                ])
              ]),
              i("div", Gu, [
                i("label", Yu, k(a(o)("Show hidden files")), 1),
                pe(i("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": g[14] || (g[14] = (m) => v.value.showHidden = m),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [tn, v.value.showHidden]
                ])
              ]),
              i("div", Qu, [
                i("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: F
                }, k(a(o)("Reset")), 1)
              ])
            ])
          ])) : A("", !0)
        ]),
        a(t)("fullscreen") ? (p(), y("div", {
          key: 1,
          class: "mx-1.5",
          title: a(o)("Toggle Full Screen"),
          onClick: g[15] || (g[15] = (m) => a(l).toggle("fullScreen"))
        }, [
          a(d).fullScreen ? (p(), R(a(ou), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (p(), R(a(eu), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Xu)) : A("", !0),
        i("div", {
          class: "mx-1.5",
          title: a(o)("Change View"),
          onClick: g[16] || (g[16] = (m) => w())
        }, [
          a(d).view === "grid" ? (p(), R(a(au), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : A("", !0),
          a(d).view === "list" ? (p(), R(a(du), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : A("", !0)
        ], 8, Ju)
      ])
    ]));
  }
}), ef = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function tf(n, e) {
  return p(), y("svg", ef, [...e[0] || (e[0] = [
    i("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const nf = { render: tf }, of = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function sf(n, e) {
  return p(), y("svg", of, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const af = { render: sf }, rf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function lf(n, e) {
  return p(), y("svg", rf, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const df = { render: lf }, cf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function uf(n, e) {
  return p(), y("svg", cf, [...e[0] || (e[0] = [
    i("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const ff = { render: uf }, vf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function pf(n, e) {
  return p(), y("svg", vf, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const mf = { render: pf }, hf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function _f(n, e) {
  return p(), y("svg", hf, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const gf = { render: _f }, wf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function yf(n, e) {
  return p(), y("svg", wf, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const bf = { render: yf }, xf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function kf(n, e) {
  return p(), y("svg", xf, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const $f = { render: kf };
function mt(n, e = []) {
  const t = "vfDragEnterCounter", o = n.fs, s = K(o.selectedItems);
  function l(f, h) {
    if (f.isExternalDrag)
      return;
    if (!(n.features?.move ?? !1)) {
      f.dataTransfer && (f.dataTransfer.dropEffect = "none", f.dataTransfer.effectAllowed = "none");
      return;
    }
    f.preventDefault(), o.getDraggedItem() === h.path || !h || h.type !== "dir" || s.value.some(
      (S) => S.path === h.path || rl(S.path) === h.path
    ) ? f.dataTransfer && (f.dataTransfer.dropEffect = "none", f.dataTransfer.effectAllowed = "none") : (f.dataTransfer && (f.dataTransfer.dropEffect = "copy", f.dataTransfer.effectAllowed = "all"), f.currentTarget.classList.add(...e));
  }
  function d(f) {
    if (f.isExternalDrag || !(n.features?.move ?? !1))
      return;
    f.preventDefault();
    const v = f.currentTarget, w = Number(v.dataset[t] || 0);
    v.dataset[t] = String(w + 1);
  }
  function r(f) {
    if (f.isExternalDrag || !(n.features?.move ?? !1))
      return;
    f.preventDefault();
    const v = f.currentTarget, S = Number(v.dataset[t] || 0) - 1;
    S <= 0 ? (delete v.dataset[t], v.classList.remove(...e)) : v.dataset[t] = String(S);
  }
  function c(f, h) {
    if (f.isExternalDrag || !(n.features?.move ?? !1) || !h) return;
    f.preventDefault();
    const w = f.currentTarget;
    delete w.dataset[t], w.classList.remove(...e);
    const S = f.dataTransfer?.getData("items") || "[]", _ = JSON.parse(S).map(
      (g) => o.sortedFiles.get().find((m) => m.path === g)
    );
    o.clearDraggedItem(), n.modal.open(st, { items: { from: _, to: h } });
  }
  function u(f) {
    return {
      dragover: (h) => l(h, f),
      dragenter: d,
      dragleave: r,
      drop: (h) => c(h, f)
    };
  }
  return { events: u };
}
const Sf = { class: "vuefinder__breadcrumb__container" }, Cf = ["title"], Ff = ["title"], Df = ["title"], Pf = ["title"], Ef = { class: "vuefinder__breadcrumb__path-container" }, Tf = { class: "vuefinder__breadcrumb__list" }, Af = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Mf = { class: "relative" }, If = ["title", "onClick"], Of = ["title"], Lf = { class: "vuefinder__breadcrumb__path-mode" }, Rf = { class: "vuefinder__breadcrumb__path-mode-content" }, Bf = ["title"], Vf = { class: "vuefinder__breadcrumb__path-text" }, zf = ["title"], Nf = ["data-theme"], Uf = ["onClick"], Hf = { class: "vuefinder__breadcrumb__hidden-item-content" }, jf = { class: "vuefinder__breadcrumb__hidden-item-text" }, Kf = /* @__PURE__ */ J({
  __name: "Breadcrumb",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = e.config, l = K(s.state), d = K(o.path), r = K(o.loading), c = E(null), u = oo(0, 100), f = E(5), h = E(!1), v = E(!1), w = j(() => d.value?.breadcrumb ?? []);
    function S(Y, D) {
      return Y.length > D ? [Y.slice(-D), Y.slice(0, -D)] : [Y, []];
    }
    const F = j(
      () => S(w.value, f.value)[0]
    ), _ = j(
      () => S(w.value, f.value)[1]
    );
    re(u, () => {
      if (!c.value) return;
      const Y = c.value.children;
      let D = 0, $ = 0;
      const P = 5, T = 1;
      f.value = P, Te(() => {
        for (let H = Y.length - 1; H >= 0; H--) {
          const Q = Y[H];
          if (D + Q.offsetWidth > u.value - 40)
            break;
          D += parseInt(Q.offsetWidth.toString(), 10), $++;
        }
        $ < T && ($ = T), $ > P && ($ = P), f.value = $;
      });
    });
    const g = () => {
      c.value && (u.value = c.value.offsetWidth);
    }, m = E(null);
    fe(() => {
      m.value = new ResizeObserver(g), c.value && m.value.observe(c.value);
    }), $e(() => {
      m.value && m.value.disconnect();
    });
    const b = mt(e, ["vuefinder__drag-over"]);
    function x(Y = null) {
      Y ??= w.value.length - 2;
      const D = {
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
      return w.value[Y] ?? D;
    }
    const C = () => {
      e.adapter.invalidateListQuery(d.value.path), e.adapter.open(d.value.path);
    }, V = () => {
      F.value.length > 0 && e.adapter.open(
        w.value[w.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
      );
    }, I = (Y) => {
      e.adapter.open(Y.path), h.value = !1;
    }, q = () => {
      h.value && (h.value = !1);
    }, O = {
      mounted(Y, D) {
        Y.clickOutsideEvent = function($) {
          Y === $.target || Y.contains($.target) || D.value();
        }, document.body.addEventListener("click", Y.clickOutsideEvent);
      },
      beforeUnmount(Y) {
        document.body.removeEventListener("click", Y.clickOutsideEvent);
      }
    }, U = () => {
      s.toggle("showTreeView");
    }, ne = E({
      x: 0,
      y: 0
    }), ae = (Y, D = null) => {
      if (Y.currentTarget instanceof HTMLElement) {
        const { x: $, y: P, height: T } = Y.currentTarget.getBoundingClientRect();
        ne.value = { x: $, y: P + T };
      }
      h.value = D ?? !h.value;
    }, ee = () => {
      v.value = !v.value;
    }, ie = async () => {
      await ut(d.value?.path || ""), e.emitter.emit("vf-toast-push", { label: t("Path copied to clipboard") });
    }, ce = () => {
      v.value = !1;
    };
    return (Y, D) => (p(), y("div", Sf, [
      i("span", {
        title: a(t)("Toggle Tree View")
      }, [
        L(a(gf), {
          class: G(["vuefinder__breadcrumb__toggle-tree", a(l).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: U
        }, null, 8, ["class"])
      ], 8, Cf),
      i("span", {
        title: a(t)("Go up a directory")
      }, [
        L(a(af), Ee({
          class: w.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, Ke(w.value.length ? a(b).events(x()) : {}), { onClick: V }), null, 16, ["class"])
      ], 8, Ff),
      a(o).isLoading() ? (p(), y("span", {
        key: 1,
        title: a(t)("Cancel")
      }, [
        L(a(df), {
          onClick: D[0] || (D[0] = ($) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Pf)) : (p(), y("span", {
        key: 0,
        title: a(t)("Refresh")
      }, [
        L(a(nf), { onClick: C })
      ], 8, Df)),
      pe(i("div", Ef, [
        i("div", null, [
          L(a(ff), Ee({ class: "vuefinder__breadcrumb__home-icon" }, Ke(a(b).events(x(-1))), {
            onClick: D[1] || (D[1] = le(($) => a(e).adapter.open(a(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        i("div", Tf, [
          _.value.length ? pe((p(), y("div", Af, [
            D[3] || (D[3] = i("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("div", Mf, [
              i("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: D[2] || (D[2] = ($) => ae($, !0)),
                onClick: le(ae, ["stop"])
              }, [
                L(a(bo), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [O, q]
          ]) : A("", !0)
        ]),
        i("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (p(!0), y(de, null, ve(F.value, ($, P) => (p(), y("div", { key: P }, [
            D[4] || (D[4] = i("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("span", Ee({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: $.basename
            }, Ke(a(b).events($), !0), {
              onClick: le((T) => a(e).adapter.open($.path), ["stop"])
            }), k($.name), 17, If)
          ]))), 128))
        ], 512),
        a(s).get("loadingIndicator") === "circular" && a(r) ? (p(), R(a(Vt), { key: 0 })) : A("", !0),
        i("span", {
          title: a(t)("Toggle Path Copy Mode"),
          onClick: ee
        }, [
          L(a($f), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Of)
      ], 512), [
        [Be, !v.value]
      ]),
      pe(i("div", Lf, [
        i("div", Rf, [
          i("div", {
            title: a(t)("Copy Path")
          }, [
            L(a(bf), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: ie
            })
          ], 8, Bf),
          i("div", Vf, k(a(d).path), 1),
          i("div", {
            title: a(t)("Exit")
          }, [
            L(a(mf), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: ce
            })
          ], 8, zf)
        ])
      ], 512), [
        [Be, v.value]
      ]),
      (p(), R(At, { to: "body" }, [
        i("div", null, [
          pe(i("div", {
            style: Ve({
              position: "absolute",
              top: ne.value.y + "px",
              left: ne.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": a(e).theme.current
          }, [
            (p(!0), y(de, null, ve(_.value, ($, P) => (p(), y("div", Ee({
              key: P,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Ke(a(b).events($), !0), {
              onClick: (T) => I($)
            }), [
              i("div", Hf, [
                i("span", null, [
                  L(a(ze), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                i("span", jf, k($.name), 1)
              ])
            ], 16, Uf))), 128))
          ], 12, Nf), [
            [Be, h.value]
          ])
        ])
      ]))
    ]));
  }
});
function qf(n, e) {
  const {
    scrollContainer: t,
    itemWidth: o = 100,
    rowHeight: s,
    overscan: l = 2,
    containerPadding: d = 48,
    lockItemsPerRow: r
  } = e, c = n, u = () => typeof s == "number" ? s : s.value, f = E(0), h = E(6), v = E(600);
  let w = null;
  const S = j(() => Math.ceil(c.value.length / h.value)), F = j(() => S.value * u()), _ = j(() => {
    const O = u(), U = Math.max(0, Math.floor(f.value / O) - l), ne = Math.min(
      S.value,
      Math.ceil((f.value + v.value) / O) + l
    );
    return { start: U, end: ne };
  }), g = j(() => {
    const { start: O, end: U } = _.value;
    return Array.from({ length: U - O }, (ne, ae) => O + ae);
  }), m = () => v.value, b = () => r.value, x = () => {
    if (b()) {
      h.value = 1;
      return;
    }
    if (t.value) {
      const O = t.value.clientWidth - d;
      h.value = Math.max(Math.floor(O / o), 2);
    }
  }, C = (O) => {
    const U = O.target;
    f.value = U.scrollTop;
  };
  re(
    () => c.value.length,
    () => {
      x();
    }
  );
  const V = (O, U) => {
    if (!O || !Array.isArray(O))
      return [];
    const ne = U * h.value;
    return O.slice(ne, ne + h.value);
  }, I = (O, U, ne, ae, ee) => {
    if (!O || !Array.isArray(O))
      return [];
    const ie = [];
    for (let ce = U; ce <= ne; ce++)
      for (let Y = ae; Y <= ee; Y++) {
        const D = ce * h.value + Y;
        D < O.length && O[D] && ie.push(O[D]);
      }
    return ie;
  }, q = (O) => ({
    row: Math.floor(O / h.value),
    col: O % h.value
  });
  return fe(async () => {
    await Te(), t.value && (v.value = t.value.clientHeight || 600), x(), window.addEventListener("resize", () => {
      t.value && (v.value = t.value.clientHeight || 600), x();
    }), t.value && "ResizeObserver" in window && (w = new ResizeObserver((O) => {
      const U = O[0];
      U && (v.value = Math.round(U.contentRect.height)), x();
    }), w.observe(t.value));
  }), $e(() => {
    window.removeEventListener("resize", x), w && (w.disconnect(), w = null);
  }), {
    scrollTop: f,
    itemsPerRow: h,
    totalRows: S,
    totalHeight: F,
    visibleRange: _,
    visibleRows: g,
    updateItemsPerRow: x,
    handleScroll: C,
    getRowItems: V,
    getItemsInRange: I,
    getItemPosition: q,
    getContainerHeight: m
  };
}
function Wf(n) {
  const { getItemPosition: e, getItemsInRange: t, getKey: o, selectionObject: s, rowHeight: l, itemWidth: d } = n, r = Math.floor(Math.random() * 2 ** 32).toString(), c = Z(), u = c.fs, f = K(u.selectedKeys), h = K(u.sortedFiles), v = E(/* @__PURE__ */ new Set()), w = E(!1), S = E(!1), F = E(null), _ = (D) => D.map(($) => $.getAttribute("data-key")).filter(($) => !!$), g = (D) => {
    D.selection.getSelection().forEach(($) => {
      D.selection.deselect($, !0);
    });
  }, m = (D) => {
    f.value && f.value.forEach(($) => {
      const P = document.querySelector(`[data-key="${$}"]`);
      P && b($) && D.selection.select(P, !0);
    });
  }, b = (D) => {
    const $ = h.value?.find((H) => o(H) === D);
    if (!$) return !1;
    const P = c.selectionFilterType, T = c.selectionFilterMimeIncludes;
    return P === "files" && $.type === "dir" || P === "dirs" && $.type === "file" ? !1 : T && Array.isArray(T) && T.length > 0 ? $.type === "dir" ? !0 : $.mime_type ? T.some((H) => $.mime_type?.startsWith(H)) : !1 : !0;
  }, x = (D) => {
    if (D.size === 0) return null;
    const P = Array.from(D).map((ue) => {
      const Ne = h.value?.findIndex((Ue) => o(Ue) === ue) ?? -1;
      return e(Ne >= 0 ? Ne : 0);
    }), T = Math.min(...P.map((ue) => ue.row)), H = Math.max(...P.map((ue) => ue.row)), Q = Math.min(...P.map((ue) => ue.col)), me = Math.max(...P.map((ue) => ue.col));
    return { minRow: T, maxRow: H, minCol: Q, maxCol: me };
  }, C = (D) => {
    if (c.selectionMode === "single")
      return !1;
    w.value = !1, !D.event?.metaKey && !D.event?.ctrlKey && (S.value = !0), D.selection.resolveSelectables(), g(D), m(D);
  }, V = E(0), I = (D) => {
    const $ = D;
    if ($ && "touches" in $) {
      const P = $.touches?.[0];
      if (P) return { x: P.clientX, y: P.clientY };
    }
    if ($ && "changedTouches" in $) {
      const P = $.changedTouches?.[0];
      if (P) return { x: P.clientX, y: P.clientY };
    }
    if ($ && "clientX" in $ && "clientY" in $) {
      const P = $;
      return { x: P.clientX, y: P.clientY };
    }
    return null;
  }, q = ({ event: D, selection: $ }) => {
    V.value = (s.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const P = document.querySelector(
      ".selection-area-container"
    );
    if (P && (P.dataset.theme = c.theme.current), c.selectionMode === "single")
      return;
    const T = D;
    T && "type" in T && T.type === "touchend" && T.preventDefault();
    const H = D;
    if (!H?.ctrlKey && !H?.metaKey && (u.clearSelection(), $.clearSelection(!0, !0)), v.value.clear(), s.value) {
      const Q = s.value.getSelectables()[0]?.closest(".scroller-" + r);
      if (Q) {
        const me = Q.getBoundingClientRect(), ue = I(D);
        if (ue) {
          const Ne = ue.y - me.top + Q.scrollTop, Ue = ue.x - me.left, tt = Math.floor(Ne / l.value), nt = Math.floor(Ue / d);
          F.value = { row: tt, col: nt };
        }
      }
    }
  }, O = (D) => {
    if (c.selectionMode === "single")
      return;
    const $ = D.selection, P = _(D.store.changed.added), T = _(D.store.changed.removed);
    S.value = !1, w.value = !0, P.forEach((H) => {
      f.value && !f.value.has(H) && b(H) && (v.value.add(H), u.select(H, c.selectionMode || "multiple"));
    }), T.forEach((H) => {
      document.querySelector(`[data-key="${H}"]`) && h.value?.find((me) => o(me) === H) && v.value.delete(H), u.deselect(H);
    }), $.resolveSelectables(), m(D);
  }, U = () => {
    v.value.clear();
  }, ne = (D) => {
    if (D.event && F.value && v.value.size > 0) {
      const P = Array.from(v.value).map((T) => {
        const H = h.value?.findIndex((Q) => o(Q) === T) ?? -1;
        return H >= 0 ? e(H) : null;
      }).filter((T) => T !== null);
      if (P.length > 0) {
        const T = [...P, F.value], H = {
          minRow: Math.min(...T.map((Q) => Q.row)),
          maxRow: Math.max(...T.map((Q) => Q.row)),
          minCol: Math.min(...T.map((Q) => Q.col)),
          maxCol: Math.max(...T.map((Q) => Q.col))
        };
        t(
          h.value || [],
          H.minRow,
          H.maxRow,
          H.minCol,
          H.maxCol
        ).forEach((Q) => {
          const me = o(Q);
          document.querySelector(`[data-key="${me}"]`) || u.select(me, c.selectionMode || "multiple");
        });
      }
    }
  }, ae = (D) => {
    ne(D), g(D), m(D), u.setSelectedCount(f.value?.size || 0), w.value = !1, F.value = null;
  }, ee = () => {
    s.value = new qo({
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
    }), s.value.on("beforestart", C), s.value.on("start", q), s.value.on("move", O), s.value.on("stop", ae);
  }, ie = () => {
    s.value && (s.value.destroy(), s.value = null);
  }, ce = () => {
    s.value && (Array.from(
      f.value ?? /* @__PURE__ */ new Set()
    ).forEach(($) => {
      b($) || u.deselect($);
    }), ie(), ee());
  }, Y = (D) => {
    S.value && (s.value?.clearSelection(), U(), S.value = !1);
    const $ = D;
    !v.value.size && !S.value && !$?.ctrlKey && !$?.metaKey && (u.clearSelection(), s.value?.clearSelection());
  };
  return fe(() => {
    const D = ($) => {
      !$.buttons && w.value && (w.value = !1);
    };
    document.addEventListener("dragleave", D), $e(() => {
      document.removeEventListener("dragleave", D);
    });
  }), {
    isDragging: w,
    selectionStarted: S,
    explorerId: r,
    extractIds: _,
    cleanupSelection: g,
    refreshSelection: m,
    getSelectionRange: x,
    selectSelectionRange: ne,
    initializeSelectionArea: ee,
    destroySelectionArea: ie,
    updateSelectionArea: ce,
    handleContentClick: Y
  };
}
const Gf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Yf(n, e) {
  return p(), y("svg", Gf, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Qf = { render: Yf }, Xf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Jf(n, e) {
  return p(), y("svg", Xf, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Zf = { render: Jf }, Yt = /* @__PURE__ */ J({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (p(), y("div", null, [
      n.direction === "asc" ? (p(), R(a(Qf), { key: 0 })) : A("", !0),
      n.direction === "desc" ? (p(), R(a(Zf), { key: 1 })) : A("", !0)
    ]));
  }
}), ev = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function tv(n, e) {
  return p(), y("svg", ev, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ln = { render: tv }, nv = { class: "vuefinder__drag-item__container" }, ov = { class: "vuefinder__drag-item__count" }, sv = /* @__PURE__ */ J({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, o) => (p(), y("div", nv, [
      e.count > 1 ? (p(), R(a(Ln), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : A("", !0),
      L(a(Ln), { class: "vuefinder__drag-item__icon" }),
      i("div", ov, k(e.count), 1)
    ]));
  }
}), iv = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Rn = /* @__PURE__ */ J({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(n) {
    const e = n, t = Z(), o = K(t.config.state), s = {
      app: t,
      config: o.value,
      item: e.item
    };
    return (l, d) => (p(), y("div", {
      class: G(["vuefinder__item-icon", n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      be(l.$slots, "icon", We(Ge(s)), () => [
        n.item.type === "dir" ? (p(), R(a(ze), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (p(), R(a(xt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (p(), y("div", iv, k(n.item.extension.substring(0, 3)), 1)) : A("", !0)
      ])
    ], 2));
  }
}), av = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function rv(n, e) {
  return p(), y("svg", av, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const Bn = { render: rv }, lv = ["data-key", "data-row", "data-col", "draggable"], dv = { key: 0 }, cv = { class: "vuefinder__explorer__item-grid-content" }, uv = ["data-src", "alt"], fv = { class: "vuefinder__explorer__item-title" }, vv = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, pv = { class: "vuefinder__explorer__item-list-name" }, mv = { class: "vuefinder__explorer__item-list-icon" }, hv = { class: "vuefinder__explorer__item-name" }, _v = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, gv = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, wv = { key: 0 }, yv = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, bv = /* @__PURE__ */ J({
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
  setup(n, { emit: e }) {
    const t = n, o = e, s = Z(), l = s.fs, d = s.config, r = j(() => {
      const b = s.selectionFilterType;
      return !b || b === "both" ? !0 : b === "files" && t.item.type === "file" || b === "dirs" && t.item.type === "dir";
    }), c = j(() => {
      const b = s.selectionFilterMimeIncludes;
      return !b || !b.length || t.item.type === "dir" ? !0 : t.item.mime_type ? b.some((x) => t.item.mime_type?.startsWith(x)) : !1;
    }), u = j(() => r.value && c.value), f = j(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      u.value ? "" : "vf-explorer-item--unselectable"
    ]), h = j(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !u.value ? 0.5 : ""
    }));
    let v = null;
    const w = E(null);
    let S = !1;
    const { enabled: F } = Ie(), _ = j(() => F("move")), g = () => {
      v && clearTimeout(v);
    }, m = (b) => {
      if (v && (b.preventDefault(), clearTimeout(v)), !S)
        S = !0, o("click", b), w.value = setTimeout(() => {
          S = !1;
        }, 300);
      else
        return S = !1, o("dblclick", b), v && clearTimeout(v), !1;
      if (b.currentTarget && b.currentTarget instanceof HTMLElement) {
        const x = b.currentTarget.getBoundingClientRect();
        b.preventDefault(), v = setTimeout(() => {
          let I = x.y + x.height;
          I + 146 > window.innerHeight - 10 && (I = x.y - 146), I < 10 && (I = 10);
          const q = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: x.x,
            clientY: I
          });
          b.target?.dispatchEvent(q);
        }, 300);
      }
    };
    return (b, x) => (p(), y("div", {
      class: G(f.value),
      style: Ve(h.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: _.value,
      onTouchstart: x[1] || (x[1] = (C) => m(C)),
      onTouchend: x[2] || (x[2] = (C) => g()),
      onClick: x[3] || (x[3] = (C) => o("click", C)),
      onDblclick: x[4] || (x[4] = (C) => o("dblclick", C)),
      onContextmenu: x[5] || (x[5] = le((C) => o("contextmenu", C), ["prevent", "stop"])),
      onDragstart: x[6] || (x[6] = (C) => o("dragstart", C)),
      onDragend: x[7] || (x[7] = (C) => o("dragend", C))
    }, [
      n.view === "grid" ? (p(), y("div", dv, [
        a(l).isReadOnly(n.item) ? (p(), R(a(Bn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : A("", !0),
        i("div", cv, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (p(), y("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": a(s).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: x[0] || (x[0] = (C) => C.preventDefault())
          }, null, 40, uv)) : (p(), R(Rn, {
            key: 1,
            item: n.item,
            ext: !0
          }, {
            icon: W((C) => [
              be(b.$slots, "icon", We(Ge(C)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        i("span", fv, k(a(en)(n.item.basename)), 1)
      ])) : (p(), y("div", vv, [
        i("div", pv, [
          i("div", mv, [
            L(Rn, {
              item: n.item,
              small: n.compact
            }, {
              icon: W((C) => [
                be(b.$slots, "icon", We(Ge(C)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          i("span", hv, k(n.item.basename), 1),
          i("div", null, [
            a(l).isReadOnly(n.item) ? (p(), R(a(Bn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : A("", !0)
          ])
        ]),
        n.showPath ? (p(), y("div", _v, k(n.item.path), 1)) : A("", !0),
        n.showPath ? A("", !0) : (p(), y("div", gv, [
          n.item.file_size ? (p(), y("div", wv, k(a(s).filesize(n.item.file_size)), 1)) : A("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (p(), y("div", yv, k(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : A("", !0)
      ])),
      a(F)("pinned") && a(d).get("pinnedFolders").find((C) => C.path === n.item.path) ? (p(), R(a(rn), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : A("", !0)
    ], 46, lv));
  }
}), xv = ["data-row"], Vn = /* @__PURE__ */ J({
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
  setup(n, { emit: e }) {
    const t = n, o = e, s = j(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), l = j(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), d = j(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (r, c) => (p(), y("div", {
      class: G(s.value),
      "data-row": n.rowIndex,
      style: Ve(l.value)
    }, [
      i("div", {
        class: G(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Ve(d.value)
      }, [
        (p(!0), y(de, null, ve(n.items, (u, f) => (p(), R(bv, Ee({
          key: u.path,
          item: u,
          view: n.view,
          compact: n.compact,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(u.path),
          "is-dragging": n.isDraggingItem(u.path),
          "row-index": n.rowIndex,
          "col-index": f,
          "explorer-id": n.explorerId
        }, Ke(n.dragNDropEvents(u)), {
          onClick: c[0] || (c[0] = (h) => o("click", h)),
          onDblclick: c[1] || (c[1] = (h) => o("dblclick", h)),
          onContextmenu: c[2] || (c[2] = (h) => o("contextmenu", h)),
          onDragstart: c[3] || (c[3] = (h) => o("dragstart", h)),
          onDragend: c[4] || (c[4] = (h) => o("dragend", h))
        }), {
          icon: W((h) => [
            be(r.$slots, "icon", Ee({ ref_for: !0 }, h))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, xv));
  }
}), kv = ["onClick"], $v = /* @__PURE__ */ J({
  __name: "Toast",
  setup(n) {
    const e = Z(), { getStore: t } = e.storage, o = E(t("full-screen", !1)), s = E([]), l = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", d = (c) => {
      s.value.splice(c, 1);
    }, r = (c) => {
      const u = s.value.findIndex((f) => f.id === c);
      u !== -1 && d(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (c) => {
      const u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      c.id = u, s.value.push(c), setTimeout(() => {
        r(u);
      }, 5e3);
    }), (c, u) => (p(), y("div", {
      class: G([
        "vuefinder__toast",
        o.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"
      ])
    }, [
      L(Lo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: W(() => [
          (p(!0), y(de, null, ve(s.value, (f, h) => (p(), y("div", {
            key: h,
            class: G(["vuefinder__toast__message", l(f.type)]),
            onClick: (v) => d(h)
          }, k(f.label), 11, kv))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Sv = { class: "vuefinder__explorer__container" }, Cv = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, Fv = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Dv = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Pv = /* @__PURE__ */ J({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = Z(), o = mt(t, ["vuefinder__drag-over"]), s = je("dragImage"), l = zn(null), d = je("scrollContainer"), r = je("scrollContent"), c = t.fs, u = t.config, f = K(u.state), h = K(c.sort), v = K(c.sortedFiles), w = K(c.selectedKeys), S = K(c.loading), F = (z) => w.value?.has(z) ?? !1;
    let _ = null;
    const g = E(null), m = je("customScrollBar"), b = je("customScrollBarContainer"), x = j(() => {
      const z = f.value.view, te = f.value.compactListView;
      return z === "grid" ? 88 : te ? 24 : 50;
    }), { t: C } = t.i18n, {
      itemsPerRow: V,
      totalHeight: I,
      visibleRows: q,
      handleScroll: O,
      getRowItems: U,
      getItemsInRange: ne,
      getItemPosition: ae,
      updateItemsPerRow: ee
    } = qf(
      j(() => v.value ?? []),
      {
        scrollContainer: d,
        itemWidth: 104,
        rowHeight: x,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: j(() => f.value.view === "list")
      }
    ), {
      explorerId: ie,
      isDragging: ce,
      initializeSelectionArea: Y,
      destroySelectionArea: D,
      updateSelectionArea: $,
      handleContentClick: P
    } = Wf({
      getItemPosition: ae,
      getItemsInRange: ne,
      getKey: (z) => z.path,
      selectionObject: l,
      rowHeight: x,
      itemWidth: 104
    }), T = E(null), H = (z) => {
      if (!z || !T.value) return !1;
      const te = w.value?.has(T.value) ?? !1;
      return ce.value && (te ? w.value?.has(z) ?? !1 : z === T.value);
    };
    re(
      () => u.get("view"),
      (z) => {
        z === "list" ? V.value = 1 : ee();
      },
      { immediate: !0 }
    ), re(V, (z) => {
      u.get("view") === "list" && z !== 1 && (V.value = 1);
    });
    const Q = (z) => v.value?.[z];
    fe(() => {
      if (Y(), l.value && l.value.on("beforestart", ({ event: z }) => {
        const te = z?.target === r.value;
        if (!z?.metaKey && !z?.ctrlKey && !z?.altKey && !te)
          return !1;
      }), d.value && (_ = new Kn({
        elements_selector: ".lazy",
        container: d.value
      })), re(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], $, {
        deep: !0
      }), b.value) {
        const z = Mt(
          b.value,
          {
            scrollbars: { theme: "vf-scrollbars-theme" }
          },
          {
            initialized: (te) => {
              g.value = te;
            },
            scroll: (te) => {
              const { scrollOffsetElement: oe } = te.elements();
              d.value && d.value.scrollTo({
                top: oe.scrollTop,
                left: 0
              });
            }
          }
        );
        g.value = z;
      }
      d.value && d.value.addEventListener("scroll", () => {
        const z = g.value;
        if (!z) return;
        const { scrollOffsetElement: te } = z.elements();
        te.scrollTo({
          top: d.value.scrollTop,
          left: 0
        });
      });
    }), fe(() => {
      t.emitter.on("vf-refresh-thumbnails", () => {
        _ && _.update();
      });
    }), Ro(() => {
      if (_ && _.update(), g.value && m.value && d.value) {
        const te = d.value.scrollHeight > d.value.clientHeight, oe = m.value;
        oe.style.display = te ? "block" : "none", oe.style.height = `${I.value}px`;
      }
    }), $e(() => {
      D(), _ && (_.destroy(), _ = null), g.value && (g.value.destroy(), g.value = null);
    });
    const me = (z) => {
      const te = z.target?.closest(".file-item-" + ie), oe = z;
      if (te) {
        const M = String(te.getAttribute("data-key")), B = v.value?.find((Qe) => Qe.path === M), N = t.selectionFilterType, X = t.selectionFilterMimeIncludes, _e = !N || N === "both" || N === "files" && B?.type === "file" || N === "dirs" && B?.type === "dir";
        let he = !0;
        if (X && Array.isArray(X) && X.length > 0 && (B?.type === "dir" ? he = !0 : B?.mime_type ? he = X.some((Qe) => (B?.mime_type).startsWith(Qe)) : he = !1), !_e || !he)
          return;
        const Fe = t.selectionMode || "multiple";
        !oe?.ctrlKey && !oe?.metaKey && (z.type !== "touchstart" || !c.isSelected(M)) && (c.clearSelection(), l.value?.clearSelection(!0, !0)), l.value?.resolveSelectables(), z.type === "touchstart" && c.isSelected(M) ? c.select(M, Fe) : c.toggleSelect(M, Fe);
      }
      c.setSelectedCount(w.value?.size || 0);
    };
    function ue(z) {
      return {
        item: z,
        defaultPrevented: !1,
        preventDefault() {
          this.defaultPrevented = !0;
        }
      };
    }
    const Ne = (z) => {
      const te = ue(z);
      if (z.type === "file" && e.onFileDclick) {
        if (t.emitter.emit("vf-file-dclick", te), te.defaultPrevented) return;
      } else if (z.type === "dir" && e.onFolderDclick && (t.emitter.emit("vf-folder-dclick", te), te.defaultPrevented))
        return;
      const oe = t.contextMenuItems?.find((M) => M.show(t, {
        items: [z],
        target: z,
        searchQuery: ""
      }));
      oe && oe.action(t, [z]);
    }, Ue = (z) => {
      const te = z.target?.closest(
        ".file-item-" + ie
      ), oe = te ? String(te.getAttribute("data-key")) : null;
      if (!oe) return;
      const M = v.value?.find((he) => he.path === oe), B = t.selectionFilterType, N = t.selectionFilterMimeIncludes, X = !B || B === "both" || B === "files" && M?.type === "file" || B === "dirs" && M?.type === "dir";
      let _e = !0;
      N && Array.isArray(N) && N.length > 0 && (M?.type === "dir" ? _e = !0 : M?.mime_type ? _e = N.some((he) => (M?.mime_type).startsWith(he)) : _e = !1), !(!X || !_e) && M && Ne(M);
    }, tt = () => {
      const z = w.value;
      return v.value?.filter((te) => z?.has(te.path)) || [];
    }, nt = (z) => {
      z.preventDefault();
      const te = z.target?.closest(
        ".file-item-" + ie
      );
      if (te) {
        const oe = String(te.getAttribute("data-key")), M = v.value?.find((he) => he.path === oe), B = t.selectionFilterType, N = t.selectionFilterMimeIncludes, X = !B || B === "both" || B === "files" && M?.type === "file" || B === "dirs" && M?.type === "dir";
        let _e = !0;
        if (N && Array.isArray(N) && N.length > 0 && (M?.type === "dir" ? _e = !0 : M?.mime_type ? _e = N.some(
          (he) => (M?.mime_type).startsWith(he)
        ) : _e = !1), !X || !_e)
          return;
        w.value?.has(oe) || (c.clearSelection(), c.select(oe)), t.emitter.emit("vf-contextmenu-show", {
          event: z,
          items: tt(),
          target: M
        });
      }
    }, qt = (z) => {
      z.preventDefault(), t.emitter.emit("vf-contextmenu-show", { event: z, items: tt() });
    }, ht = (z) => {
      if (!(t.features?.move ?? !1) || z.altKey || z.ctrlKey || z.metaKey)
        return z.preventDefault(), !1;
      ce.value = !0;
      const oe = z.target?.closest(
        ".file-item-" + ie
      );
      if (T.value = oe ? String(oe.dataset.key) : null, z.dataTransfer && T.value) {
        z.dataTransfer.setDragImage(s.value, 0, 15), z.dataTransfer.effectAllowed = "all", z.dataTransfer.dropEffect = "copy";
        const M = w.value?.has(T.value) ? Array.from(w.value) : [T.value];
        z.dataTransfer.setData("items", JSON.stringify(M)), c.setDraggedItem(T.value);
      }
    }, _t = () => {
      T.value = null;
    };
    return (z, te) => (p(), y("div", Sv, [
      i("div", {
        ref: "customScrollBarContainer",
        class: G(["vuefinder__explorer__scrollbar-container", [{ "grid-view": a(f).view === "grid" }]])
      }, [
        i("div", Cv, null, 512)
      ], 2),
      a(f).view === "list" ? (p(), y("div", Fv, [
        i("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
          onClick: te[0] || (te[0] = (oe) => a(c).toggleSort("basename"))
        }, [
          se(k(a(C)("Name")) + " ", 1),
          pe(L(Yt, {
            direction: a(h).order
          }, null, 8, ["direction"]), [
            [Be, a(h).active && a(h).column === "basename"]
          ])
        ]),
        i("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
          onClick: te[1] || (te[1] = (oe) => a(c).toggleSort("file_size"))
        }, [
          se(k(a(C)("Size")) + " ", 1),
          pe(L(Yt, {
            direction: a(h).order
          }, null, 8, ["direction"]), [
            [Be, a(h).active && a(h).column === "file_size"]
          ])
        ]),
        i("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
          onClick: te[2] || (te[2] = (oe) => a(c).toggleSort("last_modified"))
        }, [
          se(k(a(C)("Date")) + " ", 1),
          pe(L(Yt, {
            direction: a(h).order
          }, null, 8, ["direction"]), [
            [Be, a(h).active && a(h).column === "last_modified"]
          ])
        ])
      ])) : A("", !0),
      i("div", {
        ref_key: "scrollContainer",
        ref: d,
        class: G(["vuefinder__explorer__selector-area", "scroller-" + a(ie)]),
        onScroll: te[4] || (te[4] = //@ts-ignore
        (...oe) => a(O) && a(O)(...oe))
      }, [
        a(u).get("loadingIndicator") === "linear" && a(S) ? (p(), y("div", Dv)) : A("", !0),
        i("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Ve({ height: `${a(I)}px`, position: "relative", width: "100%" }),
          onContextmenu: le(qt, ["self", "prevent"]),
          onClick: te[3] || (te[3] = le(
            //@ts-ignore
            (...oe) => a(P) && a(P)(...oe),
            ["self"]
          ))
        }, [
          i("div", {
            ref_key: "dragImage",
            ref: s,
            class: "vuefinder__explorer__drag-item"
          }, [
            L(sv, {
              count: T.value && a(w).has(T.value) ? a(w).size : 1
            }, null, 8, ["count"])
          ], 512),
          a(f).view === "grid" ? (p(!0), y(de, { key: 0 }, ve(a(q), (oe) => (p(), R(Vn, {
            key: oe,
            "row-index": oe,
            "row-height": x.value,
            view: "grid",
            "items-per-row": a(V),
            items: a(U)(a(v), oe),
            "show-thumbnails": a(f).showThumbnails,
            "is-dragging-item": H,
            "is-selected": F,
            "drag-n-drop-events": (M) => a(o).events(M),
            "explorer-id": a(ie),
            onClick: me,
            onDblclick: Ue,
            onContextmenu: nt,
            onDragstart: ht,
            onDragend: _t
          }, {
            icon: W((M) => [
              be(z.$slots, "icon", Ee({ ref_for: !0 }, M))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id"]))), 128)) : (p(!0), y(de, { key: 1 }, ve(a(q), (oe) => (p(), R(Vn, {
            key: oe,
            "row-index": oe,
            "row-height": x.value,
            view: "list",
            items: Q(oe) ? [Q(oe)] : [],
            compact: a(f).compactListView,
            "is-dragging-item": H,
            "is-selected": F,
            "drag-n-drop-events": (M) => a(o).events(M),
            "explorer-id": a(ie),
            onClick: me,
            onDblclick: Ue,
            onContextmenu: nt,
            onDragstart: ht,
            onDragend: _t
          }, {
            icon: W((M) => [
              be(z.$slots, "icon", Ee({ ref_for: !0 }, M))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id"]))), 128))
        ], 36)
      ], 34),
      L($v)
    ]));
  }
}), Ev = ["href", "download"], Tv = ["onClick"], Av = /* @__PURE__ */ J({
  __name: "ContextMenu",
  setup(n) {
    const e = Z(), t = E(null), o = E([]), s = Tt({
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
    const l = (c) => c.link(e, o.value), d = (c) => {
      e.emitter.emit("vf-contextmenu-hide"), c.action(e, o.value);
    };
    e.emitter.on("vf-contextmenu-show", (c) => {
      const { event: u, items: f, target: h = null } = c || {};
      s.items = (e.contextMenuItems || []).filter((v) => v.show(e, {
        items: f,
        target: h
      })), h ? f.length > 1 && f.some((v) => v.path === h.path) ? e.emitter.emit("vf-context-selected", f) : e.emitter.emit("vf-context-selected", [h]) : e.emitter.emit("vf-context-selected", []), r(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      s.active = !1;
    });
    const r = (c) => {
      const u = e.root, f = u?.getBoundingClientRect?.(), h = u?.getBoundingClientRect?.();
      let v = c.clientX - (f?.left ?? 0), w = c.clientY - (f?.top ?? 0);
      s.active = !0, Te(() => {
        const S = t.value?.getBoundingClientRect(), F = S?.height ?? 0, _ = S?.width ?? 0;
        v = h && h.right - c.pageX + window.scrollX < _ ? v - _ : v, w = h && h.bottom - c.pageY + window.scrollY < F ? w - F : w, s.positions = {
          left: String(v) + "px",
          top: String(w) + "px"
        };
      });
    };
    return (c, u) => pe((p(), y("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: G([{
        "vuefinder__context-menu--active": s.active,
        "vuefinder__context-menu--inactive": !s.active
      }, "vuefinder__context-menu"]),
      style: Ve(s.positions)
    }, [
      (p(!0), y(de, null, ve(s.items, (f) => (p(), y("li", {
        key: f.title,
        class: "vuefinder__context-menu__item"
      }, [
        f.link ? (p(), y("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: l(f),
          download: l(f),
          onClick: u[0] || (u[0] = (h) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          i("span", null, k(f.title(a(e).i18n)), 1)
        ], 8, Ev)) : (p(), y("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => d(f)
        }, [
          i("span", null, k(f.title(a(e).i18n)), 1)
        ], 8, Tv))
      ]))), 128))
    ], 6)), [
      [Be, s.active]
    ]);
  }
}), Mv = { class: "vuefinder__status-bar__wrapper" }, Iv = { class: "vuefinder__status-bar__storage" }, Ov = ["title"], Lv = { class: "vuefinder__status-bar__storage-icon" }, Rv = ["value"], Bv = ["value"], Vv = { class: "vuefinder__status-bar__info space-x-2" }, zv = { key: 0 }, Nv = { key: 1 }, Uv = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Hv = { class: "vuefinder__status-bar__actions" }, jv = /* @__PURE__ */ J({
  __name: "Statusbar",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.sortedFiles), l = K(o.path), d = K(o.selectedCount), r = K(o.storages), c = K(o.selectedItems), u = K(o.path), f = (_) => {
      const g = _.target.value;
      e.adapter.open(g + "://");
    }, h = j(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((_, g) => _ + (g.file_size || 0), 0)), v = j(() => r.value), w = j(() => s.value), S = j(() => d.value || 0), F = j(() => c.value || []);
    return (_, g) => (p(), y("div", Mv, [
      i("div", Iv, [
        i("div", {
          class: "vuefinder__status-bar__storage-container",
          title: a(t)("Storage")
        }, [
          i("div", Lv, [
            L(a(ln))
          ]),
          i("select", {
            name: "vuefinder-media-selector",
            value: a(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: f
          }, [
            (p(!0), y(de, null, ve(v.value, (m) => (p(), y("option", {
              key: m,
              value: m
            }, k(m), 9, Bv))), 128))
          ], 40, Rv),
          g[0] || (g[0] = i("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, Ov),
        i("div", Vv, [
          S.value === 0 ? (p(), y("span", zv, k(w.value.length) + " " + k(a(t)("items")), 1)) : (p(), y("span", Nv, [
            se(k(S.value) + " " + k(a(t)("selected")) + " ", 1),
            h.value ? (p(), y("span", Uv, k(a(e).filesize(h.value)), 1)) : A("", !0)
          ]))
        ])
      ]),
      i("div", Hv, [
        be(_.$slots, "actions", {
          path: a(u).path,
          count: S.value || 0,
          selected: F.value
        })
      ])
    ]));
  }
}), Kv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function qv(n, e) {
  return p(), y("svg", Kv, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Wv = { render: qv };
function Po(n, e) {
  const t = n.findIndex((o) => o.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const Gv = { class: "vuefinder__folder-loader-indicator" }, Yv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Eo = /* @__PURE__ */ J({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Bo({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, t = Z(), o = jn(n, "modelValue"), s = E(!1);
    re(
      () => o.value,
      () => l()
    );
    const l = async () => {
      s.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        Po(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (d) {
        console.error("Failed to fetch subfolders:", d);
      } finally {
        s.value = !1;
      }
    };
    return (d, r) => (p(), y("div", Gv, [
      s.value ? (p(), R(a(Vt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (p(), y("div", Yv, [
        o.value ? (p(), R(a(Bt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : A("", !0),
        o.value ? A("", !0) : (p(), R(a(Rt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Qv = { key: 0 }, Xv = { class: "vuefinder__treesubfolderlist__no-folders" }, Jv = { class: "vuefinder__treesubfolderlist__item-content" }, Zv = ["onClick"], ep = ["title", "onDblclick", "onClick"], tp = { class: "vuefinder__treesubfolderlist__item-icon" }, np = { class: "vuefinder__treesubfolderlist__subfolder" }, op = /* @__PURE__ */ J({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = Z(), t = e.fs, o = mt(e, ["vuefinder__drag-over"]), s = E({}), { t: l } = e.i18n, d = K(t.path), r = n, c = E(null);
    fe(() => {
      r.path === r.storage + "://" && c.value && Mt(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const u = j(() => e.treeViewData.find((h) => h.path === r.path)?.folders || []);
    return (f, h) => {
      const v = Un("TreeSubfolderList", !0);
      return p(), y("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        u.value.length ? A("", !0) : (p(), y("li", Qv, [
          i("div", Xv, k(a(l)("No folders")), 1)
        ])),
        (p(!0), y(de, null, ve(u.value, (w) => (p(), y("li", {
          key: w.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          i("div", Jv, [
            i("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (S) => s.value[w.path] = !s.value[w.path]
            }, [
              L(Eo, {
                modelValue: s.value[w.path],
                "onUpdate:modelValue": (S) => s.value[w.path] = S,
                storage: n.storage,
                path: w.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, Zv),
            i("div", Ee({
              class: "vuefinder__treesubfolderlist__item-link",
              title: w.path
            }, Ke(
              a(o).events({
                ...w,
                dir: w.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (S) => s.value[w.path] = !s.value[w.path],
              onClick: (S) => a(e).adapter.open(w.path)
            }), [
              i("div", tp, [
                a(d)?.path === w.path ? (p(), R(a(dn), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (p(), R(a(ze), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              i("div", {
                class: G(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(d).path === w.path
                }])
              }, k(w.basename), 3)
            ], 16, ep)
          ]),
          i("div", np, [
            pe(L(v, {
              storage: r.storage,
              path: w.path
            }, null, 8, ["storage", "path"]), [
              [Be, s.value[w.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), sp = /* @__PURE__ */ J({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = Z(), t = e.fs, o = E(!1), s = n, l = mt(e, ["vuefinder__drag-over"]), d = K(t.path), r = j(() => s.storage === d.value?.storage), c = {
      storage: s.storage,
      path: s.storage + "://",
      dir: s.storage + "://",
      type: "dir",
      basename: s.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function u(f) {
      f === d.value?.storage ? o.value = !o.value : e.adapter.open(f + "://");
    }
    return (f, h) => (p(), y(de, null, [
      i("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: h[2] || (h[2] = (v) => u(n.storage))
      }, [
        i("div", Ee({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Ke(a(l).events(c), !0)), [
          i("div", {
            class: G(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            L(a(ln))
          ], 2),
          i("div", null, k(n.storage), 1)
        ], 16),
        i("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: h[1] || (h[1] = le((v) => o.value = !o.value, ["stop"]))
        }, [
          L(Eo, {
            modelValue: o.value,
            "onUpdate:modelValue": h[0] || (h[0] = (v) => o.value = v),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      pe(L(op, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Be, o.value]
      ])
    ], 64));
  }
}), ip = { class: "vuefinder__folder-indicator" }, ap = { class: "vuefinder__folder-indicator--icon" }, rp = /* @__PURE__ */ J({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = jn(n, "modelValue");
    return (t, o) => (p(), y("div", ip, [
      i("div", ap, [
        e.value ? (p(), R(a(Bt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : A("", !0),
        e.value ? A("", !0) : (p(), R(a(Rt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), lp = {
  key: 0,
  class: "vuefinder__treeview__header"
}, dp = { class: "vuefinder__treeview__pinned-label" }, cp = { class: "vuefinder__treeview__pin-text text-nowrap" }, up = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, fp = ["onClick"], vp = ["title"], pp = ["onClick"], mp = { key: 0 }, hp = { class: "vuefinder__treeview__no-pinned" }, _p = /* @__PURE__ */ J({
  __name: "TreeView",
  setup(n) {
    const e = Z(), { enabled: t } = Ie(), { t: o } = e.i18n, { getStore: s, setStore: l } = e.storage, d = e.fs, r = e.config, c = K(r.state), u = K(d.sortedFiles), f = K(d.storages), h = j(() => f.value || []), v = K(d.path), w = mt(e, ["vuefinder__drag-over"]), S = E(190), F = E(s("pinned-folders-opened", !0));
    re(F, (b) => l("pinned-folders-opened", b));
    const _ = (b) => {
      const x = r.get("pinnedFolders");
      r.set("pinnedFolders", x.filter((C) => C.path !== b.path));
    }, g = (b) => {
      const x = b.clientX, C = b.target.parentElement;
      if (!C) return;
      const V = C.getBoundingClientRect().width;
      C.classList.remove("transition-[width]"), C.classList.add("transition-none");
      const I = (O) => {
        S.value = V + O.clientX - x, S.value < 50 && (S.value = 0, r.set("showTreeView", !1)), S.value > 50 && r.set("showTreeView", !0);
      }, q = () => {
        const O = C.getBoundingClientRect();
        S.value = O.width, C.classList.add("transition-[width]"), C.classList.remove("transition-none"), window.removeEventListener("mousemove", I), window.removeEventListener("mouseup", q);
      };
      window.addEventListener("mousemove", I), window.addEventListener("mouseup", q);
    }, m = E(null);
    return fe(() => {
      m.value && Mt(m.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), re(u, (b) => {
      const x = b.filter((C) => C.type === "dir");
      Po(e.treeViewData, {
        path: v.value.path || "",
        folders: x.map((C) => ({
          storage: C.storage,
          path: C.path,
          basename: C.basename,
          type: "dir"
        }))
      });
    }), (b, x) => (p(), y(de, null, [
      i("div", {
        class: G(["vuefinder__treeview__overlay", a(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: x[0] || (x[0] = (C) => a(r).toggle("showTreeView"))
      }, null, 2),
      i("div", {
        style: Ve(
          a(c).showTreeView ? "min-width:100px;max-width:75%; width: " + S.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        i("div", {
          ref_key: "treeViewScrollElement",
          ref: m,
          class: "vuefinder__treeview__scroll"
        }, [
          a(t)("pinned") ? (p(), y("div", lp, [
            i("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: x[2] || (x[2] = (C) => F.value = !F.value)
            }, [
              i("div", dp, [
                L(a(rn), { class: "vuefinder__treeview__pin-icon" }),
                i("div", cp, k(a(o)("Pinned Folders")), 1)
              ]),
              L(rp, {
                modelValue: F.value,
                "onUpdate:modelValue": x[1] || (x[1] = (C) => F.value = C)
              }, null, 8, ["modelValue"])
            ]),
            F.value ? (p(), y("ul", up, [
              (p(!0), y(de, null, ve(a(c).pinnedFolders, (C) => (p(), y("li", {
                key: C.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                i("div", Ee({ class: "vuefinder__treeview__pinned-folder" }, Ke(a(w).events(C), !0), {
                  onClick: (V) => a(e).adapter.open(C.path)
                }), [
                  a(v).path !== C.path ? (p(), R(a(ze), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : A("", !0),
                  a(v).path === C.path ? (p(), R(a(dn), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : A("", !0),
                  i("div", {
                    title: C.path,
                    class: G(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": a(v).path === C.path
                    }])
                  }, k(C.basename), 11, vp)
                ], 16, fp),
                i("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (V) => _(C)
                }, [
                  L(a(Wv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, pp)
              ]))), 128)),
              a(c).pinnedFolders.length ? A("", !0) : (p(), y("li", mp, [
                i("div", hp, k(a(o)("No folders pinned")), 1)
              ]))
            ])) : A("", !0)
          ])) : A("", !0),
          (p(!0), y(de, null, ve(h.value, (C) => (p(), y("div", {
            key: C,
            class: "vuefinder__treeview__storage"
          }, [
            L(sp, { storage: C }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        i("div", {
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
function gp(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function ge(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, o) => !(e.needsSearchQuery !== !!o.searchQuery || e.target !== void 0 && e.target !== gp(o) || e.targetType !== void 0 && e.targetType !== o.target?.type || e.mimeType !== void 0 && e.mimeType !== o.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function lt(...n) {
  return (e, t) => n.some((o) => o(e, t));
}
function dt(...n) {
  return (e, t) => n.every((o) => o(e, t));
}
const To = [
  {
    id: ye.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: ge({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: ye.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: lt(ge({ target: "none" }), ge({ target: "many" }))
  },
  {
    id: ye.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && ge({ target: "none" })(n, e)
  },
  {
    id: ye.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(_n),
    show: ge({ target: "none", feature: "newfolder" })
  },
  {
    id: ye.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: ge({ target: "one", targetType: "dir" })
  },
  {
    id: ye.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const t = n.config, o = t.get("pinnedFolders"), s = o.concat(
        e.filter(
          (l) => o.findIndex((d) => d.path === l.path) === -1
        )
      );
      t.set("pinnedFolders", s);
    },
    show: dt(ge({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) === -1)
  },
  {
    id: ye.unpinFolder,
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      const t = n.config, o = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        o.filter(
          (s) => !e.find((l) => l.path === s.path)
        )
      );
    },
    show: dt(ge({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) !== -1)
  },
  {
    id: ye.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(Lt, { storage: e[0]?.storage, item: e[0] }),
    show: dt(
      ge({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    )
  },
  {
    id: ye.download,
    link: (n, e) => {
      if (e[0])
        return n.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: dt(
      ge({ target: "one", feature: "download" }),
      (n, e) => e.target?.type !== "dir"
    )
  },
  {
    id: ye.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(Ot, { items: e }),
    show: ge({ target: "one", feature: "rename" })
  },
  {
    id: ye.move,
    title: ({ t: n }) => n("Move"),
    action: (n, e) => {
      const t = n.fs, o = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      n.modal.open(st, { items: { from: e, to: o } });
    },
    show: lt(
      ge({ target: "one", feature: "move" }),
      ge({ target: "many", feature: "move" })
    )
  },
  {
    id: ye.copy,
    title: ({ t: n }) => n("Copy"),
    action: (n, e) => {
      e.length > 0 && n.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: lt(
      ge({ target: "one", feature: "copy" }),
      ge({ target: "many", feature: "copy" })
    )
  },
  {
    id: ye.paste,
    title: ({ t: n }) => n("Paste"),
    action: (n, e) => {
      const t = n.fs.getClipboard();
      if (t?.items?.size > 0) {
        const s = n.fs.path.get();
        let l = s.path, d = s.storage;
        e.length === 1 && e[0]?.type === "dir" && (l = e[0].path, d = e[0].storage);
        const r = {
          storage: d || "",
          path: l || "",
          type: "dir"
        };
        n.modal.open(t.type === "cut" ? st : un, {
          items: { from: Array.from(t.items), to: r }
        });
      }
    },
    show: (n, e) => n.features?.copy ?? !1 ? n.fs.getClipboard()?.items?.size > 0 : !1
  },
  {
    id: ye.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(yn, { items: e }),
    show: lt(
      ge({ target: "many", feature: "archive" }),
      dt(
        ge({ target: "one", feature: "archive" }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: ye.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(wn, { items: e }),
    show: ge({ target: "one", feature: "unarchive", mimeType: "application/zip" })
  },
  {
    id: ye.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(It, { items: e });
    },
    show: lt(
      ge({ feature: "delete", target: "one" }),
      ge({ feature: "delete", target: "many" })
    )
  }
], wp = ["data-theme"], yp = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, bp = { class: "vuefinder__external-drop-message" }, xp = { class: "vuefinder__main__content" }, kp = /* @__PURE__ */ J({
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
  setup(n, { emit: e }) {
    const t = e, o = n, s = Z(), l = je("root"), d = s.config;
    re(
      () => o.features,
      (_) => {
        const g = Wn(_);
        Object.keys(s.features).forEach((m) => {
          delete s.features[m];
        }), Object.assign(s.features, g);
      },
      { deep: !0 }
    );
    const r = s.fs, c = K(d.state);
    $d();
    const { isDraggingExternal: u, handleDragEnter: f, handleDragOver: h, handleDragLeave: v, handleDrop: w } = Sd();
    function S(_) {
      r.setPath(_.dirname), d.get("persist") && d.set("path", _.dirname), r.setReadOnly(_.read_only ?? !1), s.modal.close(), r.setFiles(_.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(_.storages);
    }
    s.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, s.adapter.onAfterOpen = (_) => {
      S(_), r.setLoading(!1);
    }, s.emitter.on("vf-upload-complete", (_) => {
      t("upload-complete", _);
    }), s.emitter.on("vf-delete-complete", (_) => {
      t("delete-complete", _);
    }), s.emitter.on("vf-file-dclick", (_) => {
      t("file-dclick", _);
    }), s.emitter.on("vf-folder-dclick", (_) => {
      t("folder-dclick", _);
    }), re(
      () => o.config?.theme,
      (_) => {
        _ && d.set("theme", a(_));
      },
      { immediate: !0 }
    ), fe(() => {
      s.root = l.value, re(
        () => d.get("path"),
        (g) => {
          s.adapter.open(g);
        }
      );
      const _ = d.get("persist") ? d.get("path") : d.get("initialPath") ?? "";
      r.setPath(_), s.adapter.open(_), r.path.listen((g) => {
        t("path-change", g.path);
      }), r.selectedItems.listen((g) => {
        t("select", g);
      }), t("ready");
    });
    const F = async (_) => {
      const g = await w(_);
      g.length > 0 && (s.modal.open(gn), setTimeout(() => {
        s.emitter.emit(
          "vf-external-files-dropped",
          g.map((m) => m.file)
        );
      }, 100));
    };
    return (_, g) => (p(), y("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: G(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": a(u) }]),
      "data-theme": a(s).theme.current,
      onDragenter: g[2] || (g[2] = //@ts-ignore
      (...m) => a(f) && a(f)(...m)),
      onDragover: g[3] || (g[3] = //@ts-ignore
      (...m) => a(h) && a(h)(...m)),
      onDragleave: g[4] || (g[4] = //@ts-ignore
      (...m) => a(v) && a(v)(...m)),
      onDrop: F
    }, [
      i("div", {
        class: G(a(s).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        i("div", {
          class: G([
            a(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: g[0] || (g[0] = (m) => a(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: g[1] || (g[1] = (m) => a(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          a(u) ? (p(), y("div", yp, [
            i("div", bp, k(a(s).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : A("", !0),
          L(Xc),
          L(Zu),
          L(Kf),
          i("div", xp, [
            L(_p),
            L(Pv, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: W((m) => [
                be(_.$slots, "icon", We(Ge(m)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          L(jv, null, {
            actions: W((m) => [
              be(_.$slots, "status-bar", We(Ge(m)))
            ]),
            _: 3
          })
        ], 34),
        (p(), R(At, { to: "body" }, [
          L(Vo, { name: "fade" }, {
            default: W(() => [
              a(s).modal.visible ? (p(), R(Nn(a(s).modal.type), { key: 0 })) : A("", !0)
            ]),
            _: 1
          })
        ])),
        L(Av, { items: a(To) }, null, 8, ["items"])
      ], 2)
    ], 42, wp));
  }
}), $p = /* @__PURE__ */ J({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => To },
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
  setup(n) {
    const e = n, t = e.id ?? wt(Xt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const o = cs(e, wt("VueFinderOptions") || {});
    return Go(t, o), zo(Xt, t), Hn(() => {
      Yo(t);
    }), (s, l) => (p(), R(kp, We(Ge(e)), {
      icon: W((d) => [
        be(s.$slots, "icon", We(Ge(d)))
      ]),
      "status-bar": W((d) => [
        be(s.$slots, "status-bar", We(Ge(d)))
      ]),
      _: 3
    }, 16));
  }
}), Vp = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", $p);
  }
};
export {
  Rp as ArrayDriver,
  ye as ContextMenuIds,
  Bp as IndexedDBDriver,
  Qn as RemoteDriver,
  $p as VueFinder,
  Vp as VueFinderPlugin,
  $p as VueFinderProvider,
  To as contextMenuItems,
  Vp as default
};
