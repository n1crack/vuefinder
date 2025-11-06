import { inject as wt, reactive as Pt, watch as le, ref as E, shallowRef as Rn, computed as j, markRaw as Fo, defineComponent as Z, onMounted as ve, nextTick as Me, createElementBlock as w, openBlock as p, withKeys as vt, unref as a, createElementVNode as i, createCommentVNode as T, withModifiers as de, renderSlot as be, toDisplayString as x, createBlock as L, resolveDynamicComponent as Ln, withCtx as Y, createVNode as O, Fragment as ue, renderList as pe, createTextVNode as se, withDirectives as he, vModelText as pt, onUnmounted as $e, useTemplateRef as Ke, resolveComponent as Bn, normalizeClass as Q, vModelCheckbox as en, customRef as Do, Teleport as Et, normalizeStyle as Ue, isRef as Po, vModelSelect as Yt, onBeforeUnmount as Vn, vModelRadio as Kt, mergeProps as Te, toHandlers as qe, vShow as Ne, normalizeProps as Ge, guardReactiveProps as Ye, TransitionGroup as Eo, onUpdated as To, mergeModels as Mo, useModel as zn, Transition as Ao, provide as Io } from "vue";
import Oo from "mitt";
import { persistentAtom as Ro } from "@nanostores/persistent";
import { atom as Se, computed as Xe } from "nanostores";
import { useStore as K } from "@nanostores/vue";
import { QueryClient as Lo } from "@tanstack/vue-query";
import Bo from "@uppy/core";
import { Cropper as Vo } from "vue-advanced-cropper";
import { OverlayScrollbars as Tt } from "overlayscrollbars";
import zo from "@viselect/vanilla";
import No from "@uppy/xhr-upload";
const tn = /* @__PURE__ */ new Map(), Qt = Symbol("ServiceContainerId");
function Uo(n, e) {
  tn.set(n, e);
}
function Ho(n) {
  tn.delete(n);
}
function ee(n) {
  const e = wt(Qt);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = tn.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function jo(n) {
  const e = localStorage.getItem(n + "_storage"), t = Pt(JSON.parse(e ?? "{}"));
  le(t, o);
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
async function Ko(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function qo(n, e, t, o) {
  const { getStore: s, setStore: l } = n, d = E({}), r = E(s("locale", e)), c = (h, v = e) => {
    Ko(h, o).then((_) => {
      d.value = _, l("locale", h), r.value = h, l("translations", _), Object.values(o).length > 1 && (t.emit("vf-toast-push", { label: "The language is set to " + h }), t.emit("vf-language-saved"));
    }).catch((_) => {
      v ? (t.emit("vf-toast-push", {
        label: "The selected locale is not yet supported!",
        type: "error"
      }), c(v, null)) : (console.error(_), t.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  le(r, (h) => {
    c(h);
  }), !s("locale") && !Object.keys(o).length ? c(e) : d.value = s("translations");
  const u = (h, ...v) => v.length ? u(h = h.replace("%s", String(v.shift())), ...v) : h;
  function f(h, ...v) {
    return d.value && Object.prototype.hasOwnProperty.call(d.value, h) ? u(d.value[h] || h, ...v) : u(h, ...v);
  }
  return Pt({ t: f, locale: r });
}
const Wo = [
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
], Nn = {
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
  advanced: Wo.reduce((n, e) => (n[e] = !0, n), {})
};
function yn() {
  return Nn.advanced;
}
function Un(n) {
  return n ? n === "simple" || n === "advanced" ? { ...Nn[n] } : { ...yn(), ...n } : yn();
}
const Go = "4.0.6";
function nn(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1024, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Hn(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1e3, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function Yo(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!o) return 0;
  const s = parseFloat(o[1] || "0"), l = (o[2] || "").toLowerCase(), d = e[l] ?? 0;
  return Math.round(s * Math.pow(1024, d));
}
function Qo() {
  const n = Rn(null), e = E(!1), t = E(), o = E(!1);
  return { visible: e, type: n, data: t, open: (r, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, n.value = r, t.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, n.value = null;
  }, setEditMode: (r) => {
    o.value = r;
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
}, Xo = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, o = { ...qt, ...e };
  o.theme || (o.theme = "light");
  const s = Ro(t, o, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), l = (h = {}) => {
    const v = s.get(), _ = { ...qt, ...h, ...v };
    _.theme || (_.theme = "light"), s.set(_);
  }, d = (h) => s.get()[h], r = () => s.get(), c = (h, v) => {
    const _ = s.get();
    typeof h == "object" && h !== null ? s.set({ ..._, ...h }) : s.set({ ..._, [h]: v });
  };
  return {
    // Store atom
    state: s,
    // Methods
    init: l,
    get: d,
    set: c,
    toggle: (h) => {
      const v = s.get();
      c(h, !v[h]);
    },
    all: r,
    reset: () => {
      s.set({ ...qt });
    }
  };
};
function Jo(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(n) || 0, o = Number(e) || 0;
  return t === o ? 0 : t < o ? -1 : 1;
}
const Zo = () => {
  const n = Se(""), e = Se([]), t = Se(!1), o = Se([]), s = Se({ active: !1, column: "", order: "" }), l = Se({
    kind: "all",
    showHidden: !1
  }), d = Se(/* @__PURE__ */ new Set()), r = Se({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Se(null), u = Se(0), f = Se(!1), h = Se([]), v = Se(-1), _ = Xe([n], (R) => {
    const z = (R ?? "").trim(), N = z.indexOf("://"), G = N >= 0 ? z.slice(0, N) : "", xe = (N >= 0 ? z.slice(N + 3) : z).split("/").filter(Boolean);
    let ze = "";
    const jt = xe.map((De) => (ze = ze ? `${ze}/${De}` : De, {
      basename: De,
      name: De,
      path: G ? `${G}://${ze}` : ze,
      type: "dir"
    }));
    return { storage: G, breadcrumb: jt, path: z };
  }), S = Xe([o, s, l], (R, z, N) => {
    let G = R;
    N.kind === "files" ? G = G.filter((De) => De.type === "file") : N.kind === "folders" && (G = G.filter((De) => De.type === "dir")), N.showHidden || (G = G.filter((De) => !De.basename.startsWith(".")));
    const { active: Ee, column: xe, order: ze } = z;
    if (!Ee || !xe) return G;
    const jt = ze === "asc" ? 1 : -1;
    return G.slice().sort((De, Co) => Jo(De[xe], Co[xe]) * jt);
  }), D = Xe([o, d], (R, z) => z.size === 0 ? [] : R.filter((N) => z.has(N.path))), g = (R, z) => {
    const N = n.get();
    if ((z ?? !0) && N !== R) {
      const G = h.get(), Ee = v.get();
      Ee < G.length - 1 && G.splice(Ee + 1), G.length === 0 && N && G.push(N), G.push(R), h.set([...G]), v.set(G.length - 1);
    }
    n.set(R);
  }, y = (R) => {
    o.set(R ?? []);
  }, m = (R) => {
    e.set(R ?? []);
  }, b = (R, z) => {
    s.set({ active: !0, column: R, order: z });
  }, k = (R) => {
    const z = s.get();
    z.active && z.column === R ? s.set({
      active: z.order === "asc",
      column: R,
      order: "desc"
    }) : s.set({
      active: !0,
      column: R,
      order: "asc"
    });
  }, C = () => {
    s.set({ active: !1, column: "", order: "" });
  }, B = (R, z) => {
    l.set({ kind: R, showHidden: z });
  }, A = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, q = (R, z = "multiple") => {
    const N = new Set(d.get());
    z === "single" && N.clear(), N.add(R), d.set(N), u.set(N.size);
  }, I = (R) => {
    const z = new Set(d.get());
    z.delete(R), d.set(z), u.set(z.size);
  }, U = (R) => d.get().has(R), ne = (R, z = "multiple") => {
    const N = new Set(d.get());
    N.has(R) ? N.delete(R) : (z === "single" && N.clear(), N.add(R)), d.set(N), u.set(N.size);
  }, re = (R = "multiple", z) => {
    if (R === "single") {
      const N = o.get()[0];
      if (N) {
        const G = N.path;
        d.set(/* @__PURE__ */ new Set([G])), u.set(1);
      }
    } else if (z?.selectionFilterType || z?.selectionFilterMimeIncludes && z.selectionFilterMimeIncludes.length > 0) {
      const N = o.get().filter((G) => {
        const Ee = z.selectionFilterType, xe = z.selectionFilterMimeIncludes;
        return Ee === "files" && G.type === "dir" || Ee === "dirs" && G.type === "file" ? !1 : xe && Array.isArray(xe) && xe.length > 0 && G.type !== "dir" ? G.mime_type ? xe.some((ze) => G.mime_type?.startsWith(ze)) : !1 : !0;
      }).map((G) => G.path);
      d.set(new Set(N)), u.set(N.length);
    } else {
      const N = new Set(o.get().map((G) => G.path));
      d.set(N), u.set(N.size);
    }
  }, W = () => {
    d.set(/* @__PURE__ */ new Set()), u.set(0);
  }, ae = (R) => {
    const z = new Set(R ?? []);
    d.set(z), u.set(z.size);
  }, fe = (R) => {
    u.set(R);
  }, X = (R) => {
    f.set(!!R);
  }, F = () => f.get(), $ = (R, z) => {
    const N = o.get().filter((G) => z.has(G.path));
    r.set({
      type: R,
      path: _.get().path,
      items: new Set(N)
    });
  }, P = (R) => Xe([r], (z) => z.type === "cut" && Array.from(z.items).some((N) => N.path === R)), M = (R) => Xe([r], (z) => z.type === "copy" && Array.from(z.items).some((N) => N.path === R)), H = (R) => {
    const z = P(R);
    return K(z).value ?? !1;
  }, J = (R) => {
    const z = M(R);
    return K(z).value ?? !1;
  }, me = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ce = () => r.get(), Ve = (R) => {
    c.set(R);
  }, je = () => c.get(), rt = () => {
    c.set(null);
  }, nt = () => {
    const R = h.get(), z = v.get();
    if (z > 0) {
      const N = z - 1, G = R[N];
      G && (v.set(N), g(G, !1));
    }
  }, _t = () => {
    const R = h.get(), z = v.get();
    if (z < R.length - 1) {
      const N = z + 1, G = R[N];
      G && (v.set(N), g(G, !1));
    }
  }, V = Xe([v], (R) => R > 0), te = Xe(
    [h, v],
    (R, z) => z < R.length - 1
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
    path: _,
    sortedFiles: S,
    selectedItems: D,
    // Actions
    setPath: g,
    setFiles: y,
    setStorages: m,
    setSort: b,
    toggleSort: k,
    clearSort: C,
    setFilter: B,
    clearFilter: A,
    select: q,
    deselect: I,
    toggleSelect: ne,
    selectAll: re,
    isSelected: U,
    clearSelection: W,
    setSelection: ae,
    setSelectedCount: fe,
    setLoading: X,
    isLoading: F,
    setClipboard: $,
    createIsCut: P,
    createIsCopied: M,
    isCut: H,
    isCopied: J,
    clearClipboard: me,
    getClipboard: ce,
    setDraggedItem: Ve,
    getDraggedItem: je,
    clearDraggedItem: rt,
    setReadOnly: (R) => {
      t.set(R);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (R) => t.get() ? !0 : R.read_only ?? !1,
    // Navigation
    goBack: nt,
    goForward: _t,
    canGoBack: V,
    canGoForward: te,
    navigationHistory: h,
    historyIndex: v
  };
};
class on {
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
class Dp extends on {
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
          const _ = v.path.slice(f.length), S = _.includes("/") ? _.slice(0, _.lastIndexOf("/")) : "", D = S ? this.join(u.path, S) : u.path;
          if (v.type === "dir")
            l(v, D);
          else {
            const g = this.uniqueName(D, v.basename, o), y = this.makeFileEntry(
              D,
              g,
              v.file_size || 0,
              v.mime_type
            );
            s.push(y), o.add(y.path);
            const m = this.contentStore.get(v.path);
            m !== void 0 && this.contentStore.set(y.path, m);
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
            const _ = f + v.path.slice(c.length);
            return this.cloneEntry(v, {
              path: _,
              dir: this.parent(_),
              basename: v.path === c ? u : v.basename
            });
          }
          return v;
        });
        for (const [v, _] of Array.from(this.contentStore.entries()))
          if (v === c || v.startsWith(c + "/")) {
            this.contentStore.delete(v);
            const S = f + v.slice(c.length);
            this.contentStore.set(S, _);
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
class jn extends on {
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
      ...jn.DEFAULT_URLS,
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
    delete o["Content-Type"], e.use(No, {
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
class Pp extends on {
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
          const _ = (await this.getDB()).transaction(["content"], "readwrite"), S = _.objectStore("content"), D = S.get(c.path);
          D.onsuccess = () => {
            const g = D.result;
            g && (S.delete(c.path), S.put({ path: u, content: g.content }));
          }, await new Promise((g) => {
            _.oncomplete = () => g(void 0);
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
          const _ = v.path.slice(f.length), S = _.includes("/") ? _.slice(0, _.lastIndexOf("/")) : "", D = S ? this.join(u.path, S) : u.path;
          if (v.type === "dir")
            await l(v, D);
          else {
            const g = await this.uniqueName(D, v.basename, s), y = this.makeFileEntry(
              D,
              g,
              v.file_size || 0,
              v.mime_type
            );
            s.add(y.path), await this.upsert(y);
            const b = (await this.getDB()).transaction(["content"], "readwrite"), k = b.objectStore("content"), C = k.get(v.path);
            C.onsuccess = () => {
              const B = C.result;
              B && k.put({ path: y.path, content: B.content });
            }, await new Promise((B) => {
              b.oncomplete = () => B(void 0);
            });
          }
        }
      } else {
        const c = await this.uniqueName(r, d.basename, s), u = this.makeFileEntry(r, c, d.file_size || 0, d.mime_type);
        s.add(u.path), await this.upsert(u);
        const h = (await this.getDB()).transaction(["content"], "readwrite"), v = h.objectStore("content"), _ = v.get(d.path);
        _.onsuccess = () => {
          const S = _.result;
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
          const _ = f + v.path.slice(c.length), S = this.parent(_), D = this.cloneEntry(v, {
            path: _,
            dir: S,
            basename: v.path === c ? u : v.basename,
            last_modified: Date.now()
          });
          await this.upsert(D);
          const y = (await this.getDB()).transaction(["content"], "readwrite"), m = y.objectStore("content"), b = m.get(v.path);
          b.onsuccess = () => {
            const k = b.result;
            k && (m.delete(v.path), m.put({ path: _, content: k.content }));
          }, await new Promise((k) => {
            y.oncomplete = () => k(void 0);
          }), v.path !== _ && await this.removeExact(v.path);
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
        const v = (await this.getDB()).transaction(["content"], "readwrite"), _ = v.objectStore("content"), S = _.get(d.path);
        S.onsuccess = () => {
          const D = S.result;
          D && (_.delete(d.path), _.put({ path: u, content: D.content }));
        }, await new Promise((D) => {
          v.oncomplete = () => D(void 0);
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
            const _ = btoa(v);
            o({
              content: _,
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
          h.objectStore("content").put({ path: u.path, content: "" }), await new Promise((_) => {
            h.oncomplete = () => _(void 0);
          });
        }
      else {
        const h = (await this.getDB()).transaction(["content"], "readwrite");
        h.objectStore("content").put({ path: u.path, content: "" }), await new Promise((_) => {
          h.oncomplete = () => _(void 0);
        });
      }
    });
  }
}
const bn = {
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
class es {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new Lo({
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
    const t = bn.list(e);
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
    const t = bn.search(e.path, e.filter, e.deep, e.size);
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
function ts(n) {
  const e = K(n.state);
  return {
    current: j(() => e.value.theme || "light"),
    set: (s) => {
      n.set("theme", s);
    }
  };
}
const ns = (n, e) => {
  const t = jo(n.id ?? "vf"), o = Oo(), s = e.i18n, l = n.locale ?? e.locale, d = Xo(n.id ?? "vf", n.config ?? {}), r = Zo();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new es(n.driver);
  return Pt({
    // app version
    version: Go,
    // config store
    config: d,
    // Theme
    theme: (() => {
      const u = ts(d);
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
    i18n: qo(
      t,
      l,
      o,
      s
    ),
    // modal state
    modal: Qo(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Fo(c),
    // active features
    features: Un(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: j(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: j(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: d.get("metricUnits") ? Hn : nn,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // expose custom uploader if provided
    customUploader: n.customUploader
  });
}, os = ["data-theme"], ss = { class: "vuefinder__modal-layout__container" }, is = { class: "vuefinder__modal-layout__content" }, as = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, rs = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, ls = { class: "vuefinder__modal-drag-message" }, Fe = /* @__PURE__ */ Z({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(n) {
    const e = E(null), t = ee();
    t.config;
    const o = n;
    ve(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Me(() => {
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
    return (l, d) => (p(), w("div", {
      "data-theme": a(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: d[1] || (d[1] = vt((r) => a(t).modal.close(), ["esc"]))
    }, [
      d[2] || (d[2] = i("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      i("div", ss, [
        i("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: s,
          onMousedown: d[0] || (d[0] = de((r) => a(t).modal.close(), ["self"]))
        }, [
          i("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            i("div", is, [
              be(l.$slots, "default")
            ]),
            l.$slots.buttons ? (p(), w("div", as, [
              be(l.$slots, "buttons")
            ])) : T("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (p(), w("div", rs, [
        i("div", ls, x(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : T("", !0)
    ], 40, os));
  }
}), ds = { class: "vuefinder__modal-header" }, cs = { class: "vuefinder__modal-header__icon-container" }, us = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Pe = /* @__PURE__ */ Z({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (p(), w("div", ds, [
      i("div", cs, [
        (p(), L(Ln(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      i("div", us, x(n.title), 1)
    ]));
  }
}), fs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function vs(n, e) {
  return p(), w("svg", fs, [...e[0] || (e[0] = [
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
const Kn = { render: vs }, ps = { class: "vuefinder__about-modal__content" }, hs = { class: "vuefinder__about-modal__main" }, ms = { class: "vuefinder__about-modal__tab-content" }, _s = { class: "vuefinder__about-modal__lead" }, gs = { class: "vuefinder__about-modal__description" }, ws = { class: "vuefinder__about-modal__links" }, ys = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, bs = { class: "vuefinder__about-modal__meta" }, xs = { class: "vuefinder__about-modal__meta-item" }, ks = { class: "vuefinder__about-modal__meta-label" }, $s = { class: "vuefinder__about-modal__meta-value" }, Ss = { class: "vuefinder__about-modal__meta-item" }, Cs = { class: "vuefinder__about-modal__meta-label" }, qn = /* @__PURE__ */ Z({
  __name: "ModalAbout",
  setup(n) {
    const e = ee(), { t } = e.i18n;
    return (o, s) => (p(), L(Fe, null, {
      buttons: Y(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: s[0] || (s[0] = (l) => a(e).modal.close())
        }, x(a(t)("Close")), 1)
      ]),
      default: Y(() => [
        i("div", ps, [
          O(Pe, {
            icon: a(Kn),
            title: "Vuefinder " + a(e).version
          }, null, 8, ["icon", "title"]),
          i("div", hs, [
            i("div", ms, [
              i("div", _s, x(a(t)("A modern, customizable file manager component built for Vue.")), 1),
              i("div", gs, x(a(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              i("div", ws, [
                i("a", ys, x(a(t)("Project Home")), 1),
                s[1] || (s[1] = i("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              i("div", bs, [
                i("div", xs, [
                  i("span", ks, x(a(t)("Version")), 1),
                  i("span", $s, x(a(e).version), 1)
                ]),
                i("div", Ss, [
                  i("span", Cs, x(a(t)("License")), 1),
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
}), Fs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ds(n, e) {
  return p(), w("svg", Fs, [...e[0] || (e[0] = [
    i("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Wn = { render: Ds }, Ps = { class: "vuefinder__delete-modal__content" }, Es = { class: "vuefinder__delete-modal__form" }, Ts = { class: "vuefinder__delete-modal__description" }, Ms = { class: "vuefinder__delete-modal__files vf-scrollbar" }, As = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Is = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Os = { class: "vuefinder__delete-modal__file-name" }, Rs = { class: "vuefinder__delete-modal__warning" }, Mt = /* @__PURE__ */ Z({
  __name: "ModalDelete",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = K(o.path), l = E(e.modal.data.items), d = E(""), r = () => {
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
    return (c, u) => (p(), L(Fe, null, {
      buttons: Y(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          onClick: r
        }, x(a(t)("Yes, Delete!")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[1] || (u[1] = (f) => a(e).modal.close())
        }, x(a(t)("Cancel")), 1),
        i("div", Rs, x(a(t)("This action cannot be undone.")), 1)
      ]),
      default: Y(() => [
        i("div", null, [
          O(Pe, {
            icon: a(Wn),
            title: a(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          i("div", Ps, [
            i("div", Es, [
              i("p", Ts, x(a(t)("Are you sure you want to delete these files?")), 1),
              i("div", Ms, [
                (p(!0), w(ue, null, pe(l.value, (f) => (p(), w("p", {
                  key: f.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  f.type === "dir" ? (p(), w("svg", As, [...u[2] || (u[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (p(), w("svg", Is, [...u[3] || (u[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Os, x(f.basename), 1)
                ]))), 128))
              ]),
              d.value.length ? (p(), L(a(d), {
                key: 0,
                error: "",
                onHidden: u[0] || (u[0] = (f) => d.value = "")
              }, {
                default: Y(() => [
                  se(x(d.value), 1)
                ]),
                _: 1
              })) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ls = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Bs(n, e) {
  return p(), w("svg", Ls, [...e[0] || (e[0] = [
    i("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Gn = { render: Bs }, Vs = { class: "vuefinder__rename-modal__content" }, zs = { class: "vuefinder__rename-modal__item" }, Ns = { class: "vuefinder__rename-modal__item-info" }, Us = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hs = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, js = { class: "vuefinder__rename-modal__item-name" }, At = /* @__PURE__ */ Z({
  __name: "ModalRename",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = K(o.path), l = E(e.modal.data.items[0]), d = E(l.value.basename), r = E(""), c = () => {
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
    return (u, f) => (p(), L(Fe, null, {
      buttons: Y(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, x(a(t)("Rename")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[2] || (f[2] = (h) => a(e).modal.close())
        }, x(a(t)("Cancel")), 1)
      ]),
      default: Y(() => [
        i("div", null, [
          O(Pe, {
            icon: a(Gn),
            title: a(t)("Rename")
          }, null, 8, ["icon", "title"]),
          i("div", Vs, [
            i("div", zs, [
              i("p", Ns, [
                l.value.type === "dir" ? (p(), w("svg", Us, [...f[3] || (f[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (p(), w("svg", Hs, [...f[4] || (f[4] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", js, x(l.value.basename), 1)
              ]),
              he(i("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (h) => d.value = h),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: vt(c, ["enter"])
              }, null, 544), [
                [pt, d.value]
              ]),
              r.value.length ? (p(), L(a(r), {
                key: 0,
                error: "",
                onHidden: f[1] || (f[1] = (h) => r.value = "")
              }, {
                default: Y(() => [
                  se(x(r.value), 1)
                ]),
                _: 1
              })) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Oe() {
  const n = ee(), e = j(() => n.features);
  return {
    enabled: (o) => e.value[o] ?? !1
  };
}
const Ks = { class: "vuefinder__text-preview" }, qs = { class: "vuefinder__text-preview__header" }, Ws = ["title"], Gs = { class: "vuefinder__text-preview__actions" }, Ys = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Qs = { key: 1 }, Xs = /* @__PURE__ */ Z({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = E(""), s = E(""), l = E(null), d = E(!1), r = E(""), c = E(!1), u = ee(), { enabled: f } = Oe(), { t: h } = u.i18n;
    ve(async () => {
      try {
        const S = await u.adapter.getContent({ path: u.modal.data.item.path });
        o.value = S.content, t("success");
      } catch (S) {
        console.error("Failed to load text content:", S), t("success");
      }
    });
    const v = () => {
      d.value = !d.value, s.value = o.value, u.modal.setEditMode(d.value);
    }, _ = async () => {
      r.value = "", c.value = !1;
      try {
        const S = u.modal.data.item.path;
        await u.adapter.save({
          path: S,
          content: s.value
        }), o.value = s.value, r.value = h("Updated."), t("success"), d.value = !d.value;
      } catch (S) {
        const D = S;
        r.value = h(D.message || "Error"), c.value = !0;
      }
    };
    return (S, D) => (p(), w("div", Ks, [
      i("div", qs, [
        i("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: a(u).modal.data.item.path
        }, x(a(u).modal.data.item.basename), 9, Ws),
        i("div", Gs, [
          d.value ? (p(), w("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: _
          }, x(a(h)("Save")), 1)) : T("", !0),
          a(f)("edit") ? (p(), w("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: D[0] || (D[0] = (g) => v())
          }, x(d.value ? a(h)("Cancel") : a(h)("Edit")), 1)) : T("", !0)
        ])
      ]),
      i("div", null, [
        d.value ? (p(), w("div", Qs, [
          he(i("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": D[1] || (D[1] = (g) => s.value = g),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [pt, s.value]
          ])
        ])) : (p(), w("pre", Ys, x(o.value), 1)),
        r.value.length ? (p(), L(a(r), {
          key: 2,
          error: c.value,
          onHidden: D[2] || (D[2] = (g) => r.value = "")
        }, {
          default: Y(() => [
            se(x(r.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : T("", !0)
      ])
    ]));
  }
}), sn = async (n, e) => {
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
        await sn(n, s);
    }
  }
}, ge = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Yn(n) {
  const e = ee(), { t } = e.i18n, o = e.fs, s = K(o.path), l = e.config, d = E({ QUEUE_ENTRY_STATUS: ge }), r = E(null), c = E(null), u = E(null), f = E(null), h = E(null), v = E([]), _ = E(""), S = E(!1), D = E(!1), g = E(null);
  let y;
  const m = (F) => {
    F.preventDefault(), F.stopPropagation(), D.value = !0;
  }, b = (F) => {
    F.preventDefault(), F.stopPropagation(), D.value = !0;
  }, k = (F) => {
    F.preventDefault(), F.stopPropagation(), (!F.relatedTarget || F.relatedTarget === document.body) && (D.value = !1);
  }, C = (F) => {
    F.preventDefault(), F.stopPropagation(), D.value = !1;
    const $ = /^[/\\](.+)/, P = F.dataTransfer;
    P && (P.items && P.items.length ? Array.from(P.items).forEach((M) => {
      if (M.kind === "file") {
        const H = M.webkitGetAsEntry?.();
        if (H)
          sn((J, me) => {
            const ce = $.exec(J?.fullPath || "");
            A(me, ce ? ce[1] : me.name);
          }, H);
        else {
          const J = M.getAsFile?.();
          J && A(J);
        }
      }
    }) : P.files && P.files.length && Array.from(P.files).forEach((M) => A(M)));
  }, B = (F) => v.value.findIndex(($) => $.id === F), A = (F, $) => y.addFile({ name: $ || F.name, type: F.type, data: F, source: "Local" }), q = (F) => F.status === ge.DONE ? "text-green-600" : F.status === ge.ERROR || F.status === ge.CANCELED ? "text-red-600" : "", I = (F) => F.status === ge.DONE ? "✓" : F.status === ge.ERROR || F.status === ge.CANCELED ? "!" : "...", U = () => f.value?.click(), ne = () => e.modal.close(), re = (F) => {
    if (S.value || !v.value.filter(($) => $.status !== ge.DONE).length) {
      S.value || (_.value = t("Please select file to upload first."));
      return;
    }
    _.value = "", g.value = F || s.value, y.upload();
  }, W = () => {
    y.cancelAll(), v.value.forEach((F) => {
      F.status !== ge.DONE && (F.status = ge.CANCELED, F.statusName = t("Canceled"));
    }), S.value = !1;
  }, ae = (F) => {
    S.value || (y.removeFile(F.id), v.value.splice(B(F.id), 1));
  }, fe = (F) => {
    if (!S.value)
      if (y.cancelAll(), F) {
        const $ = v.value.filter((P) => P.status !== ge.DONE);
        v.value = [], $.forEach((P) => A(P.originalFile, P.name));
      } else
        v.value = [];
  }, X = (F) => {
    F.forEach(($) => {
      A($);
    });
  };
  return ve(() => {
    y = new Bo({
      debug: e.debug,
      restrictions: { maxFileSize: Yo(l.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (M, H) => {
        if (H[M.id] != null) {
          const me = B(M.id);
          v.value[me]?.status === ge.PENDING && (_.value = y.i18n("noDuplicates", { fileName: M.name })), v.value = v.value.filter((ce) => ce.id !== M.id);
        }
        return v.value.push({
          id: M.id,
          name: M.name,
          size: e.filesize(M.size),
          status: ge.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: M.data
        }), !0;
      }
    });
    const F = {
      getTargetPath: () => (g.value || s.value).path
    };
    if (n)
      n(y, F);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(y, F);
    else
      throw new Error("No uploader configured");
    y.on("restriction-failed", (M, H) => {
      const J = v.value[B(M.id)];
      J && ae(J), _.value = H.message;
    }), y.on("upload-progress", (M, H) => {
      const J = H.bytesTotal ?? 1, me = Math.floor(H.bytesUploaded / J * 100), ce = B(M.id);
      ce !== -1 && v.value[ce] && (v.value[ce].percent = `${me}%`);
    }), y.on("upload-success", (M) => {
      const H = v.value[B(M.id)];
      H && (H.status = ge.DONE, H.statusName = t("Done"));
    }), y.on("upload-error", (M, H) => {
      const J = v.value[B(M.id)];
      J && (J.percent = null, J.status = ge.ERROR, J.statusName = H?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : H?.message || t("Unknown Error"));
    }), y.on("error", (M) => {
      _.value = M.message, S.value = !1, e.adapter.open(s.value.path);
    }), y.on("complete", () => {
      S.value = !1;
      const M = g.value || s.value;
      e.adapter.invalidateListQuery(M.path), e.adapter.open(M.path);
      const H = v.value.filter((J) => J.status === ge.DONE).map((J) => J.name);
      e.emitter.emit("vf-upload-complete", H);
    }), f.value?.addEventListener("click", () => c.value?.click()), h.value?.addEventListener("click", () => u.value?.click());
    const $ = { capture: !0 };
    document.addEventListener("dragover", m, $), document.addEventListener("dragenter", b, $), document.addEventListener("dragleave", k, $), document.addEventListener("drop", C, $);
    const P = (M) => {
      const H = M.target, J = H.files;
      if (J) {
        for (const me of J) A(me);
        H.value = "";
      }
    };
    c.value?.addEventListener("change", P), u.value?.addEventListener("change", P);
  }), $e(() => {
    const F = { capture: !0 };
    document.removeEventListener("dragover", m, F), document.removeEventListener("dragenter", b, F), document.removeEventListener("dragleave", k, F), document.removeEventListener("drop", C, F);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: u,
    pickFiles: f,
    pickFolders: h,
    queue: v,
    message: _,
    uploading: S,
    hasFilesInDropArea: D,
    definitions: d,
    openFileSelector: U,
    upload: re,
    cancel: W,
    remove: ae,
    clear: fe,
    close: ne,
    getClassNameForEntry: q,
    getIconForEntry: I,
    addExternalFiles: X
  };
}
const Js = { class: "vuefinder__image-preview" }, Zs = { class: "vuefinder__image-preview__header" }, ei = ["title"], ti = { class: "vuefinder__image-preview__actions" }, ni = { class: "vuefinder__image-preview__image-container" }, oi = ["src"], si = /* @__PURE__ */ Z({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = ee(), { enabled: s } = Oe(), { t: l } = o.i18n, d = E(!1), r = E(""), c = E(!1), u = E(o.adapter.getPreviewUrl({ path: o.modal.data.item.path })), f = E(u.value), { addExternalFiles: h, upload: v, queue: _ } = Yn(o.customUploader), S = o.fs, D = K(S.path), g = Ke("cropperRef"), y = async () => {
      d.value = !d.value, o.modal.setEditMode(d.value);
    }, m = async () => {
      const k = g.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!k) return;
      let C = k;
      if (k.width > 1200 || k.height > 1200) {
        const U = Math.min(1200 / k.width, 1200 / k.height), ne = document.createElement("canvas");
        ne.width = Math.floor(k.width * U), ne.height = Math.floor(k.height * U);
        const re = ne.getContext("2d");
        re && (re.drawImage(k, 0, 0, ne.width, ne.height), C = ne);
      }
      const B = o.modal.data.item.basename, A = B.split(".").pop()?.toLowerCase() || "jpg", q = A === "png" ? "image/png" : A === "gif" ? "image/gif" : "image/jpeg", I = await new Promise((U) => {
        C.toBlob((ne) => U(ne), q);
      });
      if (!I) {
        r.value = l("Failed to save image"), c.value = !0;
        return;
      }
      r.value = "", c.value = !1;
      try {
        const U = new File([I], B, { type: q }), re = o.modal.data.item.path.split("/");
        re.pop();
        const ae = {
          path: re.join("/") || (D.value?.path ?? "")
        };
        h([U]), await new Promise((F) => setTimeout(F, 100));
        const fe = _.value.find((F) => F.name === U.name);
        if (!fe)
          throw new Error("File was not added to upload queue");
        v(ae);
        let X = 0;
        for (; X < 150; ) {
          await new Promise(($) => setTimeout($, 200));
          const F = _.value.find(($) => $.id === fe.id);
          if (F?.status === ge.DONE) break;
          if (F?.status === ge.ERROR)
            throw new Error(F.statusName || "Upload failed");
          X++;
        }
        r.value = l("Updated."), o.emitter.emit("vf-refresh-thumbnails"), await y(), t("success");
      } catch (U) {
        const ne = U?.message ?? "Error";
        r.value = l(ne), c.value = !0;
      }
    };
    return ve(() => {
      t("success");
    }), (b, k) => (p(), w("div", Js, [
      i("div", Zs, [
        i("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: a(o).modal.data.item.path
        }, x(a(o).modal.data.item.basename), 9, ei),
        i("div", ti, [
          d.value ? (p(), w("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: m
          }, x(a(l)("Crop")), 1)) : T("", !0),
          a(s)("edit") ? (p(), w("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: k[0] || (k[0] = (C) => y())
          }, x(d.value ? a(l)("Cancel") : a(l)("Edit")), 1)) : T("", !0)
        ])
      ]),
      i("div", ni, [
        d.value ? (p(), L(a(Vo), {
          key: 1,
          ref_key: "cropperRef",
          ref: g,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: f.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (p(), w("img", {
          key: 0,
          style: {},
          src: a(o).adapter.getPreviewUrl({ path: a(o).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, oi))
      ]),
      r.value.length ? (p(), L(a(r), {
        key: 0,
        error: c.value,
        onHidden: k[1] || (k[1] = (C) => r.value = "")
      }, {
        default: Y(() => [
          se(x(r.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : T("", !0)
    ]));
  }
}), ii = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ai(n, e) {
  return p(), w("svg", ii, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const yt = { render: ai }, ri = { class: "vuefinder__default-preview" }, li = { class: "vuefinder__default-preview__content" }, di = { class: "vuefinder__default-preview__header" }, ci = ["title"], ui = { class: "vuefinder__default-preview__icon-container" }, fi = ["title"], vi = /* @__PURE__ */ Z({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), o = e;
    return ve(() => {
      o("success");
    }), (s, l) => (p(), w("div", ri, [
      i("div", li, [
        i("div", di, [
          i("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: a(t).modal.data.item.path
          }, x(a(t).modal.data.item.basename), 9, ci)
        ]),
        i("div", ui, [
          O(a(yt), { class: "vuefinder__default-preview__file-icon" }),
          i("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: a(t).modal.data.item.path
          }, x(a(t).modal.data.item.basename), 9, fi)
        ])
      ])
    ]));
  }
}), pi = { class: "vuefinder__video-preview" }, hi = ["title"], mi = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, _i = ["src"], gi = /* @__PURE__ */ Z({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), o = e, s = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return ve(() => {
      o("success");
    }), (l, d) => (p(), w("div", pi, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: a(t).modal.data.item.path
      }, x(a(t).modal.data.item.basename), 9, hi),
      i("div", null, [
        i("video", mi, [
          i("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, _i),
          d[0] || (d[0] = se(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), wi = { class: "vuefinder__audio-preview" }, yi = ["title"], bi = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, xi = ["src"], ki = /* @__PURE__ */ Z({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = ee(), s = () => {
      const l = ee();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ve(() => {
      t("success");
    }), (l, d) => (p(), w("div", wi, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: a(o).modal.data.item.path
      }, x(a(o).modal.data.item.basename), 9, yi),
      i("div", null, [
        i("audio", bi, [
          i("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, xi),
          d[0] || (d[0] = se(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), $i = { class: "vuefinder__pdf-preview" }, Si = ["title"], Ci = ["data"], Fi = ["src"], Di = /* @__PURE__ */ Z({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), o = e, s = () => {
      const l = ee();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ve(() => {
      o("success");
    }), (l, d) => (p(), w("div", $i, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: a(t).modal.data.item.path
      }, x(a(t).modal.data.item.basename), 9, Si),
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
          }, " Your browser does not support PDFs ", 8, Fi)
        ], 8, Ci)
      ])
    ]));
  }
});
function Pi(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Ei = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Ti = ["disabled", "title"], Mi = ["disabled", "title"], Ai = { class: "vuefinder__preview-modal__content" }, Ii = { key: 0 }, Oi = { class: "vuefinder__preview-modal__loading" }, Ri = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Li = { class: "vuefinder__preview-modal__details" }, Bi = { class: "font-bold" }, Vi = { class: "pl-2 font-bold" }, zi = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Ni = ["download", "href"], It = /* @__PURE__ */ Z({
  __name: "ModalPreview",
  setup(n) {
    const e = ee(), { enabled: t } = Oe(), { t: o } = e.i18n, s = E(!1), l = (m) => {
      const b = (m || "").split("/").pop() || "", k = b.lastIndexOf(".");
      return k >= 0 ? b.slice(k + 1).toLowerCase() : "";
    }, d = (m, b) => {
      if (!b) return !1;
      const k = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), C = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), B = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), A = /* @__PURE__ */ new Set([
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
      return m === "image" ? k.has(b) : m === "video" ? C.has(b) : m === "audio" ? B.has(b) : m === "text" ? A.has(b) : m === "application/pdf" ? b === "pdf" : !1;
    }, r = (m) => {
      const b = e.modal.data.item.mime_type;
      if (b && typeof b == "string") return b.startsWith(m);
      const k = l(e.modal.data.item.path);
      return d(m, k);
    }, c = t("preview");
    c || (s.value = !0);
    const u = j(() => e.modal.data.item), f = K(e.fs.sortedFiles), h = j(() => f.value.filter((m) => m.type === "file")), v = j(
      () => h.value.findIndex((m) => m.path === u.value.path)
    ), _ = j(() => v.value > 0), S = j(() => v.value < h.value.length - 1), D = () => {
      if (e.modal.editMode || !_.value) return;
      const m = h.value[v.value - 1];
      m && (e.fs.clearSelection(), e.fs.select(m.path), e.modal.data.item = m);
    }, g = () => {
      if (e.modal.editMode || !S.value) return;
      const m = h.value[v.value + 1];
      m && (e.fs.clearSelection(), e.fs.select(m.path), e.modal.data.item = m);
    }, y = (m) => {
      if (m.key === "Escape") {
        m.preventDefault(), m.stopPropagation(), e.modal.close();
        return;
      }
      (m.key === "ArrowLeft" || m.key === "ArrowRight") && (m.preventDefault(), m.stopPropagation(), m.key === "ArrowLeft" ? D() : g());
    };
    return ve(() => {
      const m = document.querySelector(".vuefinder__preview-modal");
      m && m.focus();
    }), (m, b) => (p(), L(Fe, null, {
      buttons: Y(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[6] || (b[6] = (k) => a(e).modal.close())
        }, x(a(o)("Close")), 1),
        a(t)("download") ? (p(), w("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: a(e).adapter.getDownloadUrl({ path: a(e).modal.data.item.path }),
          href: a(e).adapter.getDownloadUrl({ path: a(e).modal.data.item.path })
        }, x(a(o)("Download")), 9, Ni)) : T("", !0)
      ]),
      default: Y(() => [
        i("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: y
        }, [
          a(e).modal.editMode ? T("", !0) : (p(), w("div", Ei, [
            i("button", {
              disabled: !_.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: a(o)("Previous file"),
              onClick: D
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
            ])], 8, Ti),
            i("button", {
              disabled: !S.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: a(o)("Next file"),
              onClick: g
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
            ])], 8, Mi)
          ])),
          i("div", Ai, [
            a(c) ? (p(), w("div", Ii, [
              r("text") ? (p(), L(Xs, {
                key: `text-${u.value.path}`,
                onSuccess: b[0] || (b[0] = (k) => s.value = !0)
              })) : r("image") ? (p(), L(si, {
                key: `image-${u.value.path}`,
                onSuccess: b[1] || (b[1] = (k) => s.value = !0)
              })) : r("video") ? (p(), L(gi, {
                key: `video-${u.value.path}`,
                onSuccess: b[2] || (b[2] = (k) => s.value = !0)
              })) : r("audio") ? (p(), L(ki, {
                key: `audio-${u.value.path}`,
                onSuccess: b[3] || (b[3] = (k) => s.value = !0)
              })) : r("application/pdf") ? (p(), L(Di, {
                key: `pdf-${u.value.path}`,
                onSuccess: b[4] || (b[4] = (k) => s.value = !0)
              })) : (p(), L(vi, {
                key: `default-${u.value.path}`,
                onSuccess: b[5] || (b[5] = (k) => s.value = !0)
              }))
            ])) : T("", !0),
            i("div", Oi, [
              s.value === !1 ? (p(), w("div", Ri, [
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
                i("span", null, x(a(o)("Loading")), 1)
              ])) : T("", !0)
            ])
          ])
        ], 32),
        i("div", Li, [
          i("div", null, [
            i("span", Bi, x(a(o)("File Size")) + ": ", 1),
            se(x(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          i("div", null, [
            i("span", Vi, x(a(o)("Last Modified")) + ": ", 1),
            se(" " + x(a(Pi)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(t)("download") ? (p(), w("div", zi, [
          i("span", null, x(a(o)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : T("", !0)
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
function Hi(n, e) {
  return p(), w("svg", Ui, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const ji = { render: Hi }, Ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function qi(n, e) {
  return p(), w("svg", Ki, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const He = { render: qi }, Wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Gi(n, e) {
  return p(), w("svg", Wi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Ot = { render: Gi }, Yi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Qi(n, e) {
  return p(), w("svg", Yi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Rt = { render: Qi }, Xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ji(n, e) {
  return p(), w("svg", Xi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const an = { render: Ji }, Zi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ea(n, e) {
  return p(), w("svg", Zi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const rn = { render: ea }, ta = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function na(n, e) {
  return p(), w("svg", ta, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const ln = { render: na }, oa = { class: "vuefinder__modal-tree__folder-item" }, sa = { class: "vuefinder__modal-tree__folder-content" }, ia = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, aa = { class: "vuefinder__modal-tree__folder-text" }, ra = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, la = 300, da = /* @__PURE__ */ Z({
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
    const t = ee(), { t: o } = t.i18n, s = t.fs, l = n, d = e;
    K(s.path);
    const r = j(() => {
      const y = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[y] || !1;
    }), c = j(() => l.modelValue?.path === l.folder.path), u = j(() => l.currentPath?.path === l.folder.path), f = j(() => l.modalTreeData[l.folder.path] || []), h = j(() => f.value.length > 0 || l.folder.type === "dir"), v = () => {
      d("toggleFolder", l.storage, l.folder.path);
    }, _ = () => {
      d("update:modelValue", l.folder);
    }, S = () => {
      d("update:modelValue", l.folder), d("selectAndClose", l.folder);
    };
    let D = 0;
    const g = () => {
      const y = Date.now();
      y - D < la ? S() : _(), D = y;
    };
    return (y, m) => {
      const b = Bn("ModalTreeFolderItem", !0);
      return p(), w("div", oa, [
        i("div", sa, [
          h.value ? (p(), w("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: v
          }, [
            r.value ? (p(), L(a(Rt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (p(), L(a(Ot), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (p(), w("div", ia)),
          i("div", {
            class: Q(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": c.value,
              "vuefinder__modal-tree__folder-link--current": u.value
            }]),
            onClick: _,
            onDblclick: S,
            onTouchend: g
          }, [
            r.value ? (p(), L(a(ln), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (p(), L(a(He), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            i("span", aa, x(n.folder.basename), 1)
          ], 34)
        ]),
        r.value && h.value ? (p(), w("div", ra, [
          (p(!0), w(ue, null, pe(f.value, (k) => (p(), L(b, {
            key: k.path,
            folder: k,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": m[0] || (m[0] = (C) => y.$emit("update:modelValue", C)),
            onSelectAndClose: m[1] || (m[1] = (C) => y.$emit("selectAndClose", C)),
            onToggleFolder: m[2] || (m[2] = (C, B) => y.$emit("toggleFolder", C, B))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
        ])) : T("", !0)
      ]);
    };
  }
}), ca = { class: "vuefinder__modal-tree" }, ua = { class: "vuefinder__modal-tree__header" }, fa = { class: "vuefinder__modal-tree__title" }, va = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, pa = { class: "vuefinder__modal-tree__section-title" }, ha = { class: "vuefinder__modal-tree__list" }, ma = ["onClick", "onDblclick", "onTouchend"], _a = { class: "vuefinder__modal-tree__text" }, ga = { class: "vuefinder__modal-tree__text-storage" }, wa = { class: "vuefinder__modal-tree__section-title" }, ya = { class: "vuefinder__modal-tree__list" }, ba = { class: "vuefinder__modal-tree__storage-item" }, xa = { class: "vuefinder__modal-tree__storage-content" }, ka = ["onClick"], $a = ["onClick", "onDblclick", "onTouchend"], Sa = { class: "vuefinder__modal-tree__storage-text" }, Ca = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, xn = 300, dn = /* @__PURE__ */ Z({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = ee(), { t: o } = t.i18n, s = t.fs, l = t.config, d = e, r = K(s.sortedFiles), c = K(s.storages), u = j(() => c.value || []), f = K(s.path), h = E(null), v = E({}), _ = E({});
    le(r, (A) => {
      const q = A.filter((U) => U.type === "dir"), I = f.value?.path || "";
      I && (_.value[I] = q.map((U) => ({
        ...U,
        type: "dir"
      })));
    });
    const S = (A, q) => {
      const I = `${A}:${q}`;
      v.value = {
        ...v.value,
        [I]: !v.value[I]
      }, v.value[I] && !_.value[q] && t.adapter.list(q).then((U) => {
        const re = (U.files || []).filter((W) => W.type === "dir");
        _.value[q] = re.map((W) => ({
          ...W,
          type: "dir"
        }));
      });
    }, D = (A) => _.value[A] || [], g = (A) => {
      A && d("update:modelValue", A);
    }, y = (A) => {
      A && (d("update:modelValue", A), d("selectAndClose", A));
    }, m = (A) => {
      const q = {
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
      d("update:modelValue", q);
    }, b = (A) => {
      const q = {
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
      d("update:modelValue", q), d("selectAndClose", q);
    };
    let k = 0;
    const C = (A) => {
      if (!A) return;
      const q = Date.now();
      q - k < xn ? y(A) : g(A), k = q;
    }, B = (A) => {
      const q = Date.now();
      q - k < xn ? b(A) : m(A), k = q;
    };
    return ve(() => {
      h.value && Tt(h.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (A, q) => (p(), w("div", ca, [
      i("div", ua, [
        i("div", fa, x(a(o)("Select Target Folder")), 1)
      ]),
      i("div", {
        ref_key: "modalContentElement",
        ref: h,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && a(t).features.pinned && a(l).get("pinnedFolders").length ? (p(), w("div", va, [
          i("div", pa, x(a(o)("Pinned Folders")), 1),
          i("div", ha, [
            (p(!0), w(ue, null, pe(a(l).get("pinnedFolders"), (I) => (p(), w("div", {
              key: I.path,
              class: Q(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === I.path }]),
              onClick: (U) => g(I),
              onDblclick: (U) => y(I),
              onTouchend: (U) => C(I)
            }, [
              O(a(He), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              i("div", _a, x(I.basename), 1),
              i("div", ga, x(I.storage), 1),
              O(a(an), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, ma))), 128))
          ])
        ])) : T("", !0),
        i("div", wa, x(a(o)("Storages")), 1),
        (p(!0), w(ue, null, pe(u.value, (I) => (p(), w("div", {
          key: I,
          class: "vuefinder__modal-tree__section"
        }, [
          i("div", ya, [
            i("div", ba, [
              i("div", xa, [
                i("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: de((U) => S(I, I + "://"), ["stop"])
                }, [
                  v.value[`${I}:${I}://`] ? (p(), L(a(Rt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (p(), L(a(Ot), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, ka),
                i("div", {
                  class: Q(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === I + "://"
                  }]),
                  onClick: (U) => m(I),
                  onDblclick: (U) => b(I),
                  onTouchend: (U) => B(I)
                }, [
                  O(a(rn), { class: "vuefinder__modal-tree__storage-icon" }),
                  i("span", Sa, x(I), 1)
                ], 42, $a)
              ]),
              v.value[`${I}:${I}://`] ? (p(), w("div", Ca, [
                (p(!0), w(ue, null, pe(D(I + "://"), (U) => (p(), L(da, {
                  key: U.path,
                  folder: U,
                  storage: I,
                  "model-value": n.modelValue,
                  "expanded-folders": v.value,
                  "modal-tree-data": _.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": g,
                  onSelectAndClose: y,
                  onToggleFolder: S
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
              ])) : T("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Fa = { class: "vuefinder__move-modal__content" }, Da = { class: "vuefinder__move-modal__description" }, Pa = { class: "vuefinder__move-modal__files vf-scrollbar" }, Ea = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ta = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ma = { class: "vuefinder__move-modal__file-name" }, Aa = { class: "vuefinder__move-modal__target-title" }, Ia = { class: "vuefinder__move-modal__target-container" }, Oa = { class: "vuefinder__move-modal__target-path" }, Ra = { class: "vuefinder__move-modal__target-storage" }, La = {
  key: 0,
  class: "vuefinder__move-modal__Destination-folder"
}, Ba = { class: "vuefinder__move-modal__target-badge" }, Va = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, za = { class: "vuefinder__move-modal__checkbox-label" }, Na = { class: "vuefinder__move-modal__checkbox-text" }, Ua = { class: "vuefinder__move-modal__selected-items" }, Qn = /* @__PURE__ */ Z({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = ee(), { enabled: t } = Oe(), { t: o } = e.i18n, s = n, l = E(e.modal.data.items.from), d = E(e.modal.data.items.to), r = E(""), c = E(s.copy || !t("move")), u = j(() => c.value ? "copy" : "move"), f = E(!1), h = K(e.fs.path), v = j(() => c.value ? o("Copy files") : o("Move files")), _ = j(
      () => c.value ? o("Are you sure you want to copy these files?") : o("Are you sure you want to move these files?")
    ), S = j(() => c.value ? o("Yes, Copy!") : o("Yes, Move!"));
    j(() => c.value ? o("Files copied.") : o("Files moved."));
    const D = (b) => {
      b && (d.value = b);
    }, g = (b) => {
      b && (d.value = b, f.value = !1);
    }, y = () => {
      const b = d.value.path;
      if (!b) return { storage: "local", path: "" };
      if (b.endsWith("://"))
        return { storage: b.replace("://", ""), path: "" };
      const k = b.split("://");
      return {
        storage: k[0] || "local",
        path: k[1] || ""
      };
    }, m = async () => {
      if (l.value.length) {
        const { files: b } = await e.adapter[u.value]({
          path: h.value.path,
          sources: l.value.map(({ path: k }) => k),
          destination: d.value.path
        });
        e.fs.setFiles(b), e.modal.close();
      }
    };
    return (b, k) => (p(), L(Fe, null, {
      buttons: Y(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: m
        }, x(S.value), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[4] || (k[4] = (C) => a(e).modal.close())
        }, x(a(o)("Cancel")), 1),
        i("div", Ua, x(a(o)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: Y(() => [
        i("div", null, [
          O(Pe, {
            icon: a(ji),
            title: v.value
          }, null, 8, ["icon", "title"]),
          i("div", Fa, [
            i("p", Da, x(_.value), 1),
            i("div", Pa, [
              (p(!0), w(ue, null, pe(l.value, (C) => (p(), w("div", {
                key: C.path,
                class: "vuefinder__move-modal__file"
              }, [
                i("div", null, [
                  C.type === "dir" ? (p(), w("svg", Ea, [...k[5] || (k[5] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (p(), w("svg", Ta, [...k[6] || (k[6] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                i("div", Ma, x(C.path), 1)
              ]))), 128))
            ]),
            i("h4", Aa, x(a(o)("Target Directory")), 1),
            i("div", Ia, [
              i("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: k[0] || (k[0] = (C) => f.value = !f.value)
              }, [
                i("div", Oa, [
                  i("span", Ra, x(y().storage) + "://", 1),
                  y().path ? (p(), w("span", La, x(y().path), 1)) : T("", !0)
                ]),
                i("span", Ba, x(a(o)("Browse")), 1)
              ])
            ]),
            i("div", {
              class: Q([
                "vuefinder__move-modal__tree-selector",
                f.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              O(dn, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  k[1] || (k[1] = (C) => d.value = C),
                  D
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: g
              }, null, 8, ["modelValue"])
            ], 2),
            a(t)("copy") && a(t)("move") ? (p(), w("div", Va, [
              i("label", za, [
                he(i("input", {
                  "onUpdate:modelValue": k[2] || (k[2] = (C) => c.value = C),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [en, c.value]
                ]),
                i("span", Na, x(a(o)("Create a copy instead of moving")), 1)
              ])
            ])) : T("", !0),
            r.value.length ? (p(), L(a(r), {
              key: 1,
              error: "",
              onHidden: k[3] || (k[3] = (C) => r.value = "")
            }, {
              default: Y(() => [
                se(x(r.value), 1)
              ]),
              _: 1
            })) : T("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), st = /* @__PURE__ */ Z({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (p(), L(Qn, { copy: !1 }));
  }
}), cn = /* @__PURE__ */ Z({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (p(), L(Qn, { copy: !0 }));
  }
}), Ha = (n, e = 0, t = !1) => {
  let o;
  return (...s) => {
    t && !o && n(...s), clearTimeout(o), o = setTimeout(() => {
      n(...s);
    }, e);
  };
}, Xn = (n, e, t) => {
  const o = E(n);
  return Do((s, l) => ({
    get() {
      return s(), o.value;
    },
    set: Ha(
      (d) => {
        o.value = d, l();
      },
      e,
      !1
    )
  }));
}, ja = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Ka(n, e) {
  return p(), w("svg", ja, [...e[0] || (e[0] = [
    i("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const un = { render: Ka }, qa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Wa(n, e) {
  return p(), w("svg", qa, [...e[0] || (e[0] = [
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
const Lt = { render: Wa }, Ga = { class: "vuefinder__search-modal__search-input" }, Ya = ["value", "placeholder", "disabled"], Qa = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Xa = /* @__PURE__ */ Z({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = t, s = ee(), { t: l } = s.i18n, d = E(null), r = (u) => {
      const f = u.target;
      o("update:modelValue", f.value);
    }, c = (u) => {
      o("keydown", u);
    };
    return e({
      focus: () => {
        d.value && d.value.focus();
      }
    }), (u, f) => (p(), w("div", Ga, [
      O(a(un), { class: "vuefinder__search-modal__search-icon" }),
      i("input", {
        ref_key: "searchInput",
        ref: d,
        value: n.modelValue,
        type: "text",
        placeholder: a(l)("Search Files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: f[0] || (f[0] = de(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, Ya),
      n.isSearching ? (p(), w("div", Qa, [
        O(a(Lt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : T("", !0)
    ]));
  }
}), bt = Math.min, Ze = Math.max, xt = Math.round, gt = Math.floor, Re = (n) => ({
  x: n,
  y: n
}), Ja = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Za = {
  start: "end",
  end: "start"
};
function kn(n, e, t) {
  return Ze(n, bt(e, t));
}
function Bt(n, e) {
  return typeof n == "function" ? n(e) : n;
}
function et(n) {
  return n.split("-")[0];
}
function Vt(n) {
  return n.split("-")[1];
}
function Jn(n) {
  return n === "x" ? "y" : "x";
}
function Zn(n) {
  return n === "y" ? "height" : "width";
}
const er = /* @__PURE__ */ new Set(["top", "bottom"]);
function We(n) {
  return er.has(et(n)) ? "y" : "x";
}
function eo(n) {
  return Jn(We(n));
}
function tr(n, e, t) {
  t === void 0 && (t = !1);
  const o = Vt(n), s = eo(n), l = Zn(s);
  let d = s === "x" ? o === (t ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[l] > e.floating[l] && (d = kt(d)), [d, kt(d)];
}
function nr(n) {
  const e = kt(n);
  return [Xt(n), e, Xt(e)];
}
function Xt(n) {
  return n.replace(/start|end/g, (e) => Za[e]);
}
const $n = ["left", "right"], Sn = ["right", "left"], or = ["top", "bottom"], sr = ["bottom", "top"];
function ir(n, e, t) {
  switch (n) {
    case "top":
    case "bottom":
      return t ? e ? Sn : $n : e ? $n : Sn;
    case "left":
    case "right":
      return e ? or : sr;
    default:
      return [];
  }
}
function ar(n, e, t, o) {
  const s = Vt(n);
  let l = ir(et(n), t === "start", o);
  return s && (l = l.map((d) => d + "-" + s), e && (l = l.concat(l.map(Xt)))), l;
}
function kt(n) {
  return n.replace(/left|right|bottom|top/g, (e) => Ja[e]);
}
function rr(n) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...n
  };
}
function lr(n) {
  return typeof n != "number" ? rr(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function $t(n) {
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
function Cn(n, e, t) {
  let {
    reference: o,
    floating: s
  } = n;
  const l = We(e), d = eo(e), r = Zn(d), c = et(e), u = l === "y", f = o.x + o.width / 2 - s.width / 2, h = o.y + o.height / 2 - s.height / 2, v = o[r] / 2 - s[r] / 2;
  let _;
  switch (c) {
    case "top":
      _ = {
        x: f,
        y: o.y - s.height
      };
      break;
    case "bottom":
      _ = {
        x: f,
        y: o.y + o.height
      };
      break;
    case "right":
      _ = {
        x: o.x + o.width,
        y: h
      };
      break;
    case "left":
      _ = {
        x: o.x - s.width,
        y: h
      };
      break;
    default:
      _ = {
        x: o.x,
        y: o.y
      };
  }
  switch (Vt(e)) {
    case "start":
      _[d] -= v * (t && u ? -1 : 1);
      break;
    case "end":
      _[d] += v * (t && u ? -1 : 1);
      break;
  }
  return _;
}
const dr = async (n, e, t) => {
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
  } = Cn(u, o, c), v = o, _ = {}, S = 0;
  for (let D = 0; D < r.length; D++) {
    const {
      name: g,
      fn: y
    } = r[D], {
      x: m,
      y: b,
      data: k,
      reset: C
    } = await y({
      x: f,
      y: h,
      initialPlacement: o,
      placement: v,
      strategy: s,
      middlewareData: _,
      rects: u,
      platform: d,
      elements: {
        reference: n,
        floating: e
      }
    });
    f = m ?? f, h = b ?? h, _ = {
      ..._,
      [g]: {
        ..._[g],
        ...k
      }
    }, C && S <= 50 && (S++, typeof C == "object" && (C.placement && (v = C.placement), C.rects && (u = C.rects === !0 ? await d.getElementRects({
      reference: n,
      floating: e,
      strategy: s
    }) : C.rects), {
      x: f,
      y: h
    } = Cn(u, v, c)), D = -1);
  }
  return {
    x: f,
    y: h,
    placement: v,
    strategy: s,
    middlewareData: _
  };
};
async function to(n, e) {
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
    padding: _ = 0
  } = Bt(e, n), S = lr(_), g = r[v ? h === "floating" ? "reference" : "floating" : h], y = $t(await l.getClippingRect({
    element: (t = await (l.isElement == null ? void 0 : l.isElement(g))) == null || t ? g : g.contextElement || await (l.getDocumentElement == null ? void 0 : l.getDocumentElement(r.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: c
  })), m = h === "floating" ? {
    x: o,
    y: s,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, b = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(r.floating)), k = await (l.isElement == null ? void 0 : l.isElement(b)) ? await (l.getScale == null ? void 0 : l.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, C = $t(l.convertOffsetParentRelativeRectToViewportRelativeRect ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: r,
    rect: m,
    offsetParent: b,
    strategy: c
  }) : m);
  return {
    top: (y.top - C.top + S.top) / k.y,
    bottom: (C.bottom - y.bottom + S.bottom) / k.y,
    left: (y.left - C.left + S.left) / k.x,
    right: (C.right - y.right + S.right) / k.x
  };
}
const cr = function(n) {
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
        fallbackStrategy: _ = "bestFit",
        fallbackAxisSideDirection: S = "none",
        flipAlignment: D = !0,
        ...g
      } = Bt(n, e);
      if ((t = l.arrow) != null && t.alignmentOffset)
        return {};
      const y = et(s), m = We(r), b = et(r) === r, k = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), C = v || (b || !D ? [kt(r)] : nr(r)), B = S !== "none";
      !v && B && C.push(...ar(r, D, S, k));
      const A = [r, ...C], q = await to(e, g), I = [];
      let U = ((o = l.flip) == null ? void 0 : o.overflows) || [];
      if (f && I.push(q[y]), h) {
        const ae = tr(s, d, k);
        I.push(q[ae[0]], q[ae[1]]);
      }
      if (U = [...U, {
        placement: s,
        overflows: I
      }], !I.every((ae) => ae <= 0)) {
        var ne, re;
        const ae = (((ne = l.flip) == null ? void 0 : ne.index) || 0) + 1, fe = A[ae];
        if (fe && (!(h === "alignment" ? m !== We(fe) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        U.every(($) => We($.placement) === m ? $.overflows[0] > 0 : !0)))
          return {
            data: {
              index: ae,
              overflows: U
            },
            reset: {
              placement: fe
            }
          };
        let X = (re = U.filter((F) => F.overflows[0] <= 0).sort((F, $) => F.overflows[1] - $.overflows[1])[0]) == null ? void 0 : re.placement;
        if (!X)
          switch (_) {
            case "bestFit": {
              var W;
              const F = (W = U.filter(($) => {
                if (B) {
                  const P = We($.placement);
                  return P === m || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  P === "y";
                }
                return !0;
              }).map(($) => [$.placement, $.overflows.filter((P) => P > 0).reduce((P, M) => P + M, 0)]).sort(($, P) => $[1] - P[1])[0]) == null ? void 0 : W[0];
              F && (X = F);
              break;
            }
            case "initialPlacement":
              X = r;
              break;
          }
        if (s !== X)
          return {
            reset: {
              placement: X
            }
          };
      }
      return {};
    }
  };
}, ur = /* @__PURE__ */ new Set(["left", "top"]);
async function fr(n, e) {
  const {
    placement: t,
    platform: o,
    elements: s
  } = n, l = await (o.isRTL == null ? void 0 : o.isRTL(s.floating)), d = et(t), r = Vt(t), c = We(t) === "y", u = ur.has(d) ? -1 : 1, f = l && c ? -1 : 1, h = Bt(e, n);
  let {
    mainAxis: v,
    crossAxis: _,
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
  return r && typeof S == "number" && (_ = r === "end" ? S * -1 : S), c ? {
    x: _ * f,
    y: v * u
  } : {
    x: v * u,
    y: _ * f
  };
}
const vr = function(n) {
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
      } = e, c = await fr(e, n);
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
}, pr = function(n) {
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
          fn: (g) => {
            let {
              x: y,
              y: m
            } = g;
            return {
              x: y,
              y: m
            };
          }
        },
        ...c
      } = Bt(n, e), u = {
        x: t,
        y: o
      }, f = await to(e, c), h = We(et(s)), v = Jn(h);
      let _ = u[v], S = u[h];
      if (l) {
        const g = v === "y" ? "top" : "left", y = v === "y" ? "bottom" : "right", m = _ + f[g], b = _ - f[y];
        _ = kn(m, _, b);
      }
      if (d) {
        const g = h === "y" ? "top" : "left", y = h === "y" ? "bottom" : "right", m = S + f[g], b = S - f[y];
        S = kn(m, S, b);
      }
      const D = r.fn({
        ...e,
        [v]: _,
        [h]: S
      });
      return {
        ...D,
        data: {
          x: D.x - t,
          y: D.y - o,
          enabled: {
            [v]: l,
            [h]: d
          }
        }
      };
    }
  };
};
function zt() {
  return typeof window < "u";
}
function at(n) {
  return no(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function Ce(n) {
  var e;
  return (n == null || (e = n.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Be(n) {
  var e;
  return (e = (no(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : e.documentElement;
}
function no(n) {
  return zt() ? n instanceof Node || n instanceof Ce(n).Node : !1;
}
function Ae(n) {
  return zt() ? n instanceof Element || n instanceof Ce(n).Element : !1;
}
function Le(n) {
  return zt() ? n instanceof HTMLElement || n instanceof Ce(n).HTMLElement : !1;
}
function Fn(n) {
  return !zt() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof Ce(n).ShadowRoot;
}
const hr = /* @__PURE__ */ new Set(["inline", "contents"]);
function ht(n) {
  const {
    overflow: e,
    overflowX: t,
    overflowY: o,
    display: s
  } = Ie(n);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + t) && !hr.has(s);
}
const mr = /* @__PURE__ */ new Set(["table", "td", "th"]);
function _r(n) {
  return mr.has(at(n));
}
const gr = [":popover-open", ":modal"];
function Nt(n) {
  return gr.some((e) => {
    try {
      return n.matches(e);
    } catch {
      return !1;
    }
  });
}
const wr = ["transform", "translate", "scale", "rotate", "perspective"], yr = ["transform", "translate", "scale", "rotate", "perspective", "filter"], br = ["paint", "layout", "strict", "content"];
function fn(n) {
  const e = vn(), t = Ae(n) ? Ie(n) : n;
  return wr.some((o) => t[o] ? t[o] !== "none" : !1) || (t.containerType ? t.containerType !== "normal" : !1) || !e && (t.backdropFilter ? t.backdropFilter !== "none" : !1) || !e && (t.filter ? t.filter !== "none" : !1) || yr.some((o) => (t.willChange || "").includes(o)) || br.some((o) => (t.contain || "").includes(o));
}
function xr(n) {
  let e = Qe(n);
  for (; Le(e) && !it(e); ) {
    if (fn(e))
      return e;
    if (Nt(e))
      return null;
    e = Qe(e);
  }
  return null;
}
function vn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const kr = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function it(n) {
  return kr.has(at(n));
}
function Ie(n) {
  return Ce(n).getComputedStyle(n);
}
function Ut(n) {
  return Ae(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function Qe(n) {
  if (at(n) === "html")
    return n;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    Fn(n) && n.host || // Fallback.
    Be(n)
  );
  return Fn(e) ? e.host : e;
}
function oo(n) {
  const e = Qe(n);
  return it(e) ? n.ownerDocument ? n.ownerDocument.body : n.body : Le(e) && ht(e) ? e : oo(e);
}
function ut(n, e, t) {
  var o;
  e === void 0 && (e = []), t === void 0 && (t = !0);
  const s = oo(n), l = s === ((o = n.ownerDocument) == null ? void 0 : o.body), d = Ce(s);
  if (l) {
    const r = Jt(d);
    return e.concat(d, d.visualViewport || [], ht(s) ? s : [], r && t ? ut(r) : []);
  }
  return e.concat(s, ut(s, [], t));
}
function Jt(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function so(n) {
  const e = Ie(n);
  let t = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const s = Le(n), l = s ? n.offsetWidth : t, d = s ? n.offsetHeight : o, r = xt(t) !== l || xt(o) !== d;
  return r && (t = l, o = d), {
    width: t,
    height: o,
    $: r
  };
}
function pn(n) {
  return Ae(n) ? n : n.contextElement;
}
function ot(n) {
  const e = pn(n);
  if (!Le(e))
    return Re(1);
  const t = e.getBoundingClientRect(), {
    width: o,
    height: s,
    $: l
  } = so(e);
  let d = (l ? xt(t.width) : t.width) / o, r = (l ? xt(t.height) : t.height) / s;
  return (!d || !Number.isFinite(d)) && (d = 1), (!r || !Number.isFinite(r)) && (r = 1), {
    x: d,
    y: r
  };
}
const $r = /* @__PURE__ */ Re(0);
function io(n) {
  const e = Ce(n);
  return !vn() || !e.visualViewport ? $r : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Sr(n, e, t) {
  return e === void 0 && (e = !1), !t || e && t !== Ce(n) ? !1 : e;
}
function tt(n, e, t, o) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  const s = n.getBoundingClientRect(), l = pn(n);
  let d = Re(1);
  e && (o ? Ae(o) && (d = ot(o)) : d = ot(n));
  const r = Sr(l, t, o) ? io(l) : Re(0);
  let c = (s.left + r.x) / d.x, u = (s.top + r.y) / d.y, f = s.width / d.x, h = s.height / d.y;
  if (l) {
    const v = Ce(l), _ = o && Ae(o) ? Ce(o) : o;
    let S = v, D = Jt(S);
    for (; D && o && _ !== S; ) {
      const g = ot(D), y = D.getBoundingClientRect(), m = Ie(D), b = y.left + (D.clientLeft + parseFloat(m.paddingLeft)) * g.x, k = y.top + (D.clientTop + parseFloat(m.paddingTop)) * g.y;
      c *= g.x, u *= g.y, f *= g.x, h *= g.y, c += b, u += k, S = Ce(D), D = Jt(S);
    }
  }
  return $t({
    width: f,
    height: h,
    x: c,
    y: u
  });
}
function Ht(n, e) {
  const t = Ut(n).scrollLeft;
  return e ? e.left + t : tt(Be(n)).left + t;
}
function ao(n, e) {
  const t = n.getBoundingClientRect(), o = t.left + e.scrollLeft - Ht(n, t), s = t.top + e.scrollTop;
  return {
    x: o,
    y: s
  };
}
function Cr(n) {
  let {
    elements: e,
    rect: t,
    offsetParent: o,
    strategy: s
  } = n;
  const l = s === "fixed", d = Be(o), r = e ? Nt(e.floating) : !1;
  if (o === d || r && l)
    return t;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Re(1);
  const f = Re(0), h = Le(o);
  if ((h || !h && !l) && ((at(o) !== "body" || ht(d)) && (c = Ut(o)), Le(o))) {
    const _ = tt(o);
    u = ot(o), f.x = _.x + o.clientLeft, f.y = _.y + o.clientTop;
  }
  const v = d && !h && !l ? ao(d, c) : Re(0);
  return {
    width: t.width * u.x,
    height: t.height * u.y,
    x: t.x * u.x - c.scrollLeft * u.x + f.x + v.x,
    y: t.y * u.y - c.scrollTop * u.y + f.y + v.y
  };
}
function Fr(n) {
  return Array.from(n.getClientRects());
}
function Dr(n) {
  const e = Be(n), t = Ut(n), o = n.ownerDocument.body, s = Ze(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), l = Ze(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let d = -t.scrollLeft + Ht(n);
  const r = -t.scrollTop;
  return Ie(o).direction === "rtl" && (d += Ze(e.clientWidth, o.clientWidth) - s), {
    width: s,
    height: l,
    x: d,
    y: r
  };
}
const Dn = 25;
function Pr(n, e) {
  const t = Ce(n), o = Be(n), s = t.visualViewport;
  let l = o.clientWidth, d = o.clientHeight, r = 0, c = 0;
  if (s) {
    l = s.width, d = s.height;
    const f = vn();
    (!f || f && e === "fixed") && (r = s.offsetLeft, c = s.offsetTop);
  }
  const u = Ht(o);
  if (u <= 0) {
    const f = o.ownerDocument, h = f.body, v = getComputedStyle(h), _ = f.compatMode === "CSS1Compat" && parseFloat(v.marginLeft) + parseFloat(v.marginRight) || 0, S = Math.abs(o.clientWidth - h.clientWidth - _);
    S <= Dn && (l -= S);
  } else u <= Dn && (l += u);
  return {
    width: l,
    height: d,
    x: r,
    y: c
  };
}
const Er = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Tr(n, e) {
  const t = tt(n, !0, e === "fixed"), o = t.top + n.clientTop, s = t.left + n.clientLeft, l = Le(n) ? ot(n) : Re(1), d = n.clientWidth * l.x, r = n.clientHeight * l.y, c = s * l.x, u = o * l.y;
  return {
    width: d,
    height: r,
    x: c,
    y: u
  };
}
function Pn(n, e, t) {
  let o;
  if (e === "viewport")
    o = Pr(n, t);
  else if (e === "document")
    o = Dr(Be(n));
  else if (Ae(e))
    o = Tr(e, t);
  else {
    const s = io(n);
    o = {
      x: e.x - s.x,
      y: e.y - s.y,
      width: e.width,
      height: e.height
    };
  }
  return $t(o);
}
function ro(n, e) {
  const t = Qe(n);
  return t === e || !Ae(t) || it(t) ? !1 : Ie(t).position === "fixed" || ro(t, e);
}
function Mr(n, e) {
  const t = e.get(n);
  if (t)
    return t;
  let o = ut(n, [], !1).filter((r) => Ae(r) && at(r) !== "body"), s = null;
  const l = Ie(n).position === "fixed";
  let d = l ? Qe(n) : n;
  for (; Ae(d) && !it(d); ) {
    const r = Ie(d), c = fn(d);
    !c && r.position === "fixed" && (s = null), (l ? !c && !s : !c && r.position === "static" && !!s && Er.has(s.position) || ht(d) && !c && ro(n, d)) ? o = o.filter((f) => f !== d) : s = r, d = Qe(d);
  }
  return e.set(n, o), o;
}
function Ar(n) {
  let {
    element: e,
    boundary: t,
    rootBoundary: o,
    strategy: s
  } = n;
  const d = [...t === "clippingAncestors" ? Nt(e) ? [] : Mr(e, this._c) : [].concat(t), o], r = d[0], c = d.reduce((u, f) => {
    const h = Pn(e, f, s);
    return u.top = Ze(h.top, u.top), u.right = bt(h.right, u.right), u.bottom = bt(h.bottom, u.bottom), u.left = Ze(h.left, u.left), u;
  }, Pn(e, r, s));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Ir(n) {
  const {
    width: e,
    height: t
  } = so(n);
  return {
    width: e,
    height: t
  };
}
function Or(n, e, t) {
  const o = Le(e), s = Be(e), l = t === "fixed", d = tt(n, !0, l, e);
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Re(0);
  function u() {
    c.x = Ht(s);
  }
  if (o || !o && !l)
    if ((at(e) !== "body" || ht(s)) && (r = Ut(e)), o) {
      const _ = tt(e, !0, l, e);
      c.x = _.x + e.clientLeft, c.y = _.y + e.clientTop;
    } else s && u();
  l && !o && s && u();
  const f = s && !o && !l ? ao(s, r) : Re(0), h = d.left + r.scrollLeft - c.x - f.x, v = d.top + r.scrollTop - c.y - f.y;
  return {
    x: h,
    y: v,
    width: d.width,
    height: d.height
  };
}
function Wt(n) {
  return Ie(n).position === "static";
}
function En(n, e) {
  if (!Le(n) || Ie(n).position === "fixed")
    return null;
  if (e)
    return e(n);
  let t = n.offsetParent;
  return Be(n) === t && (t = t.ownerDocument.body), t;
}
function lo(n, e) {
  const t = Ce(n);
  if (Nt(n))
    return t;
  if (!Le(n)) {
    let s = Qe(n);
    for (; s && !it(s); ) {
      if (Ae(s) && !Wt(s))
        return s;
      s = Qe(s);
    }
    return t;
  }
  let o = En(n, e);
  for (; o && _r(o) && Wt(o); )
    o = En(o, e);
  return o && it(o) && Wt(o) && !fn(o) ? t : o || xr(n) || t;
}
const Rr = async function(n) {
  const e = this.getOffsetParent || lo, t = this.getDimensions, o = await t(n.floating);
  return {
    reference: Or(n.reference, await e(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Lr(n) {
  return Ie(n).direction === "rtl";
}
const Br = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Cr,
  getDocumentElement: Be,
  getClippingRect: Ar,
  getOffsetParent: lo,
  getElementRects: Rr,
  getClientRects: Fr,
  getDimensions: Ir,
  getScale: ot,
  isElement: Ae,
  isRTL: Lr
};
function co(n, e) {
  return n.x === e.x && n.y === e.y && n.width === e.width && n.height === e.height;
}
function Vr(n, e) {
  let t = null, o;
  const s = Be(n);
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
      height: _
    } = u;
    if (r || e(), !v || !_)
      return;
    const S = gt(h), D = gt(s.clientWidth - (f + v)), g = gt(s.clientHeight - (h + _)), y = gt(f), b = {
      rootMargin: -S + "px " + -D + "px " + -g + "px " + -y + "px",
      threshold: Ze(0, bt(1, c)) || 1
    };
    let k = !0;
    function C(B) {
      const A = B[0].intersectionRatio;
      if (A !== c) {
        if (!k)
          return d();
        A ? d(!1, A) : o = setTimeout(() => {
          d(!1, 1e-7);
        }, 1e3);
      }
      A === 1 && !co(u, n.getBoundingClientRect()) && d(), k = !1;
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
function uo(n, e, t, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: s = !0,
    ancestorResize: l = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: r = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = o, u = pn(n), f = s || l ? [...u ? ut(u) : [], ...ut(e)] : [];
  f.forEach((y) => {
    s && y.addEventListener("scroll", t, {
      passive: !0
    }), l && y.addEventListener("resize", t);
  });
  const h = u && r ? Vr(u, t) : null;
  let v = -1, _ = null;
  d && (_ = new ResizeObserver((y) => {
    let [m] = y;
    m && m.target === u && _ && (_.unobserve(e), cancelAnimationFrame(v), v = requestAnimationFrame(() => {
      var b;
      (b = _) == null || b.observe(e);
    })), t();
  }), u && !c && _.observe(u), _.observe(e));
  let S, D = c ? tt(n) : null;
  c && g();
  function g() {
    const y = tt(n);
    D && !co(D, y) && t(), D = y, S = requestAnimationFrame(g);
  }
  return t(), () => {
    var y;
    f.forEach((m) => {
      s && m.removeEventListener("scroll", t), l && m.removeEventListener("resize", t);
    }), h?.(), (y = _) == null || y.disconnect(), _ = null, c && cancelAnimationFrame(S);
  };
}
const St = vr, Ct = pr, Ft = cr, Dt = (n, e, t) => {
  const o = /* @__PURE__ */ new Map(), s = {
    platform: Br,
    ...t
  }, l = {
    ...s.platform,
    _c: o
  };
  return dr(n, e, {
    ...s,
    platform: l
  });
}, zr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Nr(n, e) {
  return p(), w("svg", zr, [...e[0] || (e[0] = [
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
const fo = { render: Nr }, Ur = ["disabled", "title"], Hr = ["data-theme"], jr = { class: "vuefinder__search-modal__dropdown-content" }, Kr = { class: "vuefinder__search-modal__dropdown-section" }, qr = { class: "vuefinder__search-modal__dropdown-title" }, Wr = { class: "vuefinder__search-modal__dropdown-options" }, Gr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Yr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Qr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Xr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Jr = /* @__PURE__ */ Z({
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
    const o = n, s = t, l = ee(), { t: d } = l.i18n, r = E(null), c = E(null);
    let u = null;
    const f = (D) => {
      if (s("update:selectedOption", D), D.startsWith("size-")) {
        const g = D.split("-")[1];
        s("update:sizeFilter", g);
      }
    }, h = async () => {
      o.disabled || (o.visible ? (s("update:visible", !1), u && (u(), u = null)) : (s("update:visible", !0), await Me(), await v()));
    }, v = async () => {
      if (!(!r.value || !c.value) && (await Me(), !(!r.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: D, y: g } = await Dt(r.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [St(8), Ft({ padding: 16 }), Ct({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${D}px`,
            top: `${g}px`
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
          u = uo(r.value, c.value, async () => {
            if (!(!r.value || !c.value))
              try {
                const { x: D, y: g } = await Dt(
                  r.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [St(8), Ft({ padding: 16 }), Ct({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${D}px`,
                  top: `${g}px`
                });
              } catch (D) {
                console.warn("Floating UI positioning error:", D);
              }
          });
        } catch (D) {
          console.warn("Floating UI autoUpdate setup error:", D), u = null;
        }
      }
    }, _ = (D) => {
      if (!o.visible) return;
      const g = ["size-all", "size-small", "size-medium", "size-large"], y = g.findIndex((m) => m === o.selectedOption);
      if (D.key === "ArrowDown") {
        D.preventDefault();
        const m = (y + 1) % g.length;
        s("update:selectedOption", g[m] || null);
      } else if (D.key === "ArrowUp") {
        D.preventDefault();
        const m = y <= 0 ? g.length - 1 : y - 1;
        s("update:selectedOption", g[m] || null);
      } else D.key === "Enter" ? (D.preventDefault(), o.selectedOption?.startsWith("size-") && s(
        "update:sizeFilter",
        o.selectedOption.split("-")[1]
      )) : D.key === "Escape" && (D.preventDefault(), s("update:visible", !1), u && (u(), u = null));
    }, S = () => {
      u && (u(), u = null);
    };
    return le(
      () => o.visible,
      (D) => {
        !D && u && (u(), u = null);
      }
    ), $e(() => {
      S();
    }), e({
      cleanup: S
    }), (D, g) => (p(), w(ue, null, [
      i("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: Q(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: a(d)("Search Options"),
        onClick: de(h, ["stop"])
      }, [
        O(a(fo), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Ur),
      (p(), L(Et, { to: "body" }, [
        n.visible ? (p(), w("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": a(l).theme.current,
          tabindex: "-1",
          onClick: g[4] || (g[4] = de(() => {
          }, ["stop"])),
          onKeydown: _
        }, [
          i("div", jr, [
            i("div", Kr, [
              i("div", qr, x(a(d)("File Size")), 1),
              i("div", Wr, [
                i("div", {
                  class: Q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: g[0] || (g[0] = de((y) => f("size-all"), ["stop"]))
                }, [
                  i("span", null, x(a(d)("All Files")), 1),
                  n.sizeFilter === "all" ? (p(), w("div", Gr, [...g[5] || (g[5] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2),
                i("div", {
                  class: Q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: g[1] || (g[1] = de((y) => f("size-small"), ["stop"]))
                }, [
                  i("span", null, x(a(d)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (p(), w("div", Yr, [...g[6] || (g[6] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2),
                i("div", {
                  class: Q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: g[2] || (g[2] = de((y) => f("size-medium"), ["stop"]))
                }, [
                  i("span", null, x(a(d)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (p(), w("div", Qr, [...g[7] || (g[7] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2),
                i("div", {
                  class: Q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: g[3] || (g[3] = de((y) => f("size-large"), ["stop"]))
                }, [
                  i("span", null, x(a(d)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (p(), w("div", Xr, [...g[8] || (g[8] = [
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
        ], 40, Hr)) : T("", !0)
      ]))
    ], 64));
  }
});
function Zr(n) {
  const [e, t] = el(n);
  if (!t || t === "/") return e + "://";
  const o = t.replace(/\/+$/, ""), s = o.lastIndexOf("/");
  return s === 0 ? e + "://" : e + ":/" + o.slice(0, s);
}
function el(n) {
  const e = n.indexOf(":/");
  return e === -1 ? [void 0, n] : [n.slice(0, e), n.slice(e + 2) || "/"];
}
function vo(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const o = t[1], s = t[2] ?? "", l = s.split("/").filter(Boolean), d = l.pop();
  if (!d) return o + s;
  let r = `${o}${l.join("/")}${l.length ? "/" : ""}${d}`;
  if (r.length <= e) return r;
  const c = d.split(/\.(?=[^\.]+$)/), u = c[0] ?? "", f = c[1] ?? "", h = u.length > 10 ? `${u.slice(0, 6)}...${u.slice(-5)}` : u, v = f ? `${h}.${f}` : h;
  return r = `${o}${l.join("/")}${l.length ? "/" : ""}${v}`, r.length > e && (r = `${o}.../${v}`), r;
}
async function po(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function ft(n) {
  await po(n);
}
async function tl(n) {
  await po(n);
}
const nl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function ol(n, e) {
  return p(), w("svg", nl, [...e[0] || (e[0] = [
    i("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const ho = { render: ol }, sl = ["title"], il = { class: "vuefinder__search-modal__result-icon" }, al = { class: "vuefinder__search-modal__result-content" }, rl = { class: "vuefinder__search-modal__result-name" }, ll = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, dl = ["title"], cl = ["title"], ul = ["data-item-dropdown", "data-theme"], fl = { class: "vuefinder__search-modal__item-dropdown-content" }, vl = /* @__PURE__ */ Z({
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
    const t = n, o = e, s = ee(), { t: l } = s.i18n, d = E(null);
    let r = null;
    le(
      () => t.activeDropdown,
      (y) => {
        r && (r(), r = null), y === t.item.path && d.value && Me(() => {
          h(t.item.path, d.value);
        });
      }
    ), $e(() => {
      r && (r(), r = null);
    });
    const c = (y) => t.expandedPaths.has(y), u = (y) => y.type === "dir" || !y.file_size ? "" : nn(y.file_size), f = (y, m) => {
      m.stopPropagation(), o("toggleItemDropdown", y, m);
    }, h = async (y, m) => {
      const b = document.querySelector(
        `[data-item-dropdown="${y}"]`
      );
      if (!(!b || !m) && (await Me(), !(!b || !m))) {
        Object.assign(b.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: k, y: C } = await Dt(m, b, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [St(8), Ft({ padding: 16 }), Ct({ padding: 16 })]
          });
          Object.assign(b.style, {
            left: `${k}px`,
            top: `${C}px`
          }), requestAnimationFrame(() => {
            b && Object.assign(b.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (k) {
          console.warn("Floating UI initial positioning error:", k);
          return;
        }
        try {
          r = uo(m, b, async () => {
            if (!(!m || !b))
              try {
                const { x: k, y: C } = await Dt(m, b, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [St(8), Ft({ padding: 16 }), Ct({ padding: 16 })]
                });
                Object.assign(b.style, {
                  left: `${k}px`,
                  top: `${C}px`
                });
              } catch (k) {
                console.warn("Floating UI positioning error:", k);
              }
          });
        } catch (k) {
          console.warn("Floating UI autoUpdate setup error:", k), r = null;
        }
      }
    }, v = (y) => {
      o("update:selectedItemDropdownOption", y);
    }, _ = async (y) => {
      await ft(y.path), o("copyPath", y);
    }, S = (y) => {
      o("openContainingFolder", y);
    }, D = (y) => {
      o("preview", y);
    }, g = (y) => {
      if (!t.activeDropdown) return;
      const m = ["copy-path", "open-folder", "preview"], b = t.selectedItemDropdownOption, k = m.findIndex((C) => b?.includes(C));
      if (y.key === "ArrowDown") {
        y.preventDefault();
        const C = (k + 1) % m.length;
        o(
          "update:selectedItemDropdownOption",
          `${m[C] || ""}-${t.activeDropdown}`
        );
      } else if (y.key === "ArrowUp") {
        y.preventDefault();
        const C = k <= 0 ? m.length - 1 : k - 1;
        o(
          "update:selectedItemDropdownOption",
          `${m[C] || ""}-${t.activeDropdown}`
        );
      } else y.key === "Enter" ? (y.preventDefault(), b && (b.includes("copy-path") ? _(t.item) : b.includes("open-folder") ? S(t.item) : b.includes("preview") && D(t.item))) : y.key === "Escape" && (y.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return (y, m) => (p(), w("div", {
      class: Q(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: m[9] || (m[9] = (b) => o("select", n.index))
    }, [
      i("div", il, [
        n.item.type === "dir" ? (p(), L(a(He), { key: 0 })) : (p(), L(a(yt), { key: 1 }))
      ]),
      i("div", al, [
        i("div", rl, [
          se(x(n.item.basename) + " ", 1),
          u(n.item) ? (p(), w("span", ll, x(u(n.item)), 1)) : T("", !0)
        ]),
        i("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: m[0] || (m[0] = de((b) => {
            o("select", n.index), o("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, x(c(n.item.path) ? n.item.path : a(vo)(n.item.path)), 9, dl)
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
        O(a(ho), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, cl),
      (p(), L(Et, { to: "body" }, [
        n.activeDropdown === n.item.path ? (p(), w("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": a(s).theme.current,
          tabindex: "-1",
          onClick: m[8] || (m[8] = de(() => {
          }, ["stop"])),
          onKeydown: g
        }, [
          i("div", fl, [
            i("div", {
              class: Q(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: m[2] || (m[2] = (b) => {
                v(`copy-path-${n.item.path}`), _(n.item);
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
              i("span", null, x(a(l)("Copy Path")), 1)
            ], 34),
            i("div", {
              class: Q(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: m[4] || (m[4] = (b) => {
                v(`open-folder-${n.item.path}`), S(n.item);
              }),
              onFocus: m[5] || (m[5] = (b) => v(`open-folder-${n.item.path}`))
            }, [
              O(a(He), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, x(a(l)("Open Containing Folder")), 1)
            ], 34),
            i("div", {
              class: Q(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: m[6] || (m[6] = (b) => {
                v(`preview-${n.item.path}`), D(n.item);
              }),
              onFocus: m[7] || (m[7] = (b) => v(`preview-${n.item.path}`))
            }, [
              O(a(yt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, x(a(l)("Preview")), 1)
            ], 34)
          ])
        ], 40, ul)) : T("", !0)
      ]))
    ], 10, sl));
  }
}), pl = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, hl = { class: "vuefinder__search-modal__loading-icon" }, ml = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, _l = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, gl = { class: "vuefinder__search-modal__results-header" }, Je = 60, Tn = 5, wl = /* @__PURE__ */ Z({
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
    const o = n, s = t, l = ee(), { t: d } = l.i18n, r = Ke("scrollableContainer"), c = j(() => o.searchResults.length > 0), u = j(() => o.searchResults.length), f = E(0), h = E(600), v = j(() => o.searchResults.length * Je), _ = j(() => {
      const b = Math.max(0, Math.floor(f.value / Je) - Tn), k = Math.min(
        o.searchResults.length,
        Math.ceil((f.value + h.value) / Je) + Tn
      );
      return { start: b, end: k };
    }), S = j(() => {
      const { start: b, end: k } = _.value;
      return o.searchResults.slice(b, k).map((C, B) => ({
        item: C,
        index: b + B,
        top: (b + B) * Je
      }));
    }), D = (b) => {
      const k = b.target;
      f.value = k.scrollTop;
    }, g = () => {
      r.value && (h.value = r.value.clientHeight);
    }, y = () => {
      if (o.selectedIndex >= 0 && r.value) {
        const b = o.selectedIndex * Je, k = b + Je, C = r.value.scrollTop, B = r.value.clientHeight, A = C + B;
        let q = C;
        b < C ? q = b : k > A && (q = k - B), q !== C && r.value.scrollTo({
          top: q,
          behavior: "smooth"
        });
      }
    }, m = () => {
      r.value && (r.value.scrollTop = 0, f.value = 0);
    };
    return ve(() => {
      g(), window.addEventListener("resize", g);
    }), $e(() => {
      window.removeEventListener("resize", g);
    }), le(
      () => r.value,
      () => {
        g();
      }
    ), e({
      scrollSelectedIntoView: y,
      resetScroll: m,
      getContainerHeight: () => h.value,
      scrollTop: () => f.value
    }), (b, k) => (p(), w("div", {
      class: Q(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (p(), w("div", pl, [
        i("div", hl, [
          O(a(Lt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        i("span", null, x(a(d)("Searching...")), 1)
      ])) : c.value ? (p(), w("div", _l, [
        i("div", gl, [
          i("span", null, x(a(d)("Found %s results", u.value)), 1)
        ]),
        i("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: D
        }, [
          i("div", {
            class: "vuefinder__search-modal__results-items",
            style: Ue({ height: `${v.value}px`, position: "relative" })
          }, [
            (p(!0), w(ue, null, pe(S.value, (C) => (p(), w("div", {
              key: C.item.path,
              style: Ue({
                position: "absolute",
                top: `${C.top}px`,
                left: "0",
                width: "100%",
                height: `${Je}px`
              })
            }, [
              O(vl, {
                item: C.item,
                index: C.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: k[0] || (k[0] = (B) => s("selectResultItem", B)),
                onSelectWithDropdown: k[1] || (k[1] = (B) => s("selectResultItemWithDropdown", B)),
                onTogglePathExpansion: k[2] || (k[2] = (B) => s("togglePathExpansion", B)),
                onToggleItemDropdown: k[3] || (k[3] = (B, A) => s("toggleItemDropdown", B, A)),
                "onUpdate:selectedItemDropdownOption": k[4] || (k[4] = (B) => s("update:selectedItemDropdownOption", B)),
                onCopyPath: k[5] || (k[5] = (B) => s("copyPath", B)),
                onOpenContainingFolder: k[6] || (k[6] = (B) => s("openContainingFolder", B)),
                onPreview: k[7] || (k[7] = (B) => s("preview", B))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (p(), w("div", ml, [
        i("span", null, x(a(d)("No results found")), 1)
      ]))
    ], 2));
  }
}), yl = { class: "vuefinder__search-modal" }, bl = { class: "vuefinder__search-modal__content" }, xl = { class: "vuefinder__search-modal__search-bar" }, kl = { class: "vuefinder__search-modal__search-location" }, $l = ["title"], Sl = ["disabled"], Cl = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, Fl = { class: "vuefinder__search-modal__folder-selector-content" }, Dl = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, Pl = { class: "vuefinder__search-modal__instructions-text" }, hn = /* @__PURE__ */ Z({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = E(null), l = E(null), d = E(null), r = Xn("", 300), c = E([]), u = E(!1), f = E(-1), h = E(!1), v = E(!1), _ = E(null), S = E("all"), D = E(!1), g = E(`size-${S.value}`), y = E(null), m = E(/* @__PURE__ */ new Set()), b = E(null), k = K(o.path), C = ($) => {
      m.value.has($) ? m.value.delete($) : m.value.add($);
    }, B = ($, P) => {
      P && typeof P.stopPropagation == "function" && P.stopPropagation(), b.value === $ ? b.value = null : b.value = $;
    }, A = () => {
      b.value = null;
    }, q = ($) => {
      try {
        const P = $.dir || `${$.storage}://`;
        e.adapter.open(P), e.modal.close(), A();
      } catch {
        e.emitter.emit("vf-toast-push", { label: t("Failed to open containing folder") });
      }
    }, I = ($) => {
      e.modal.open(It, {
        storage: k?.value?.storage ?? "local",
        item: $
      }), A();
    }, U = ($) => {
      f.value = $, A();
    }, ne = ($) => {
      f.value = $;
    }, re = async ($) => {
      await ft($.path), A();
    };
    le(r, async ($) => {
      $.trim() ? (await W($.trim()), f.value = 0) : (c.value = [], u.value = !1, f.value = -1);
    }), le(S, async ($) => {
      g.value = `size-${$}`, r.value.trim() && !v.value && (await W(r.value.trim()), f.value = 0);
    }), le(D, async () => {
      r.value.trim() && !v.value && (await W(r.value.trim()), f.value = 0);
    });
    const W = async ($) => {
      if ($) {
        u.value = !0;
        try {
          const P = _.value?.path || k?.value?.path, M = await e.adapter.search({
            path: P,
            filter: $,
            deep: D.value,
            size: S.value
          });
          c.value = M || [], u.value = !1;
        } catch (P) {
          console.error("Search error:", P), c.value = [], u.value = !1;
        }
      }
    };
    ve(() => {
      document.addEventListener("click", F), g.value = `size-${S.value}`, Me(() => {
        s.value && s.value.focus();
      });
    });
    const ae = () => {
      v.value ? (v.value = !1, r.value.trim() && (W(r.value.trim()), f.value = 0)) : (h.value = !1, v.value = !0);
    }, fe = ($) => {
      $ && (_.value = $);
    }, X = ($) => {
      $ && (fe($), v.value = !1, r.value.trim() && (W(r.value.trim()), f.value = 0));
    };
    $e(() => {
      document.removeEventListener("click", F), l.value && l.value.cleanup();
    });
    const F = ($) => {
      const P = $.target;
      if (h.value && (P.closest(".vuefinder__search-modal__dropdown") || (h.value = !1, Me(() => {
        s.value && s.value.focus();
      }))), b.value) {
        const M = P.closest(".vuefinder__search-modal__item-dropdown"), H = P.closest(".vuefinder__search-modal__result-item");
        !M && !H && A();
      }
    };
    return ($, P) => (p(), L(Fe, { class: "vuefinder__search-modal-layout" }, {
      default: Y(() => [
        i("div", yl, [
          O(Pe, {
            icon: a(un),
            title: a(t)("Search files")
          }, null, 8, ["icon", "title"]),
          i("div", bl, [
            i("div", xl, [
              O(Xa, {
                ref_key: "searchInputRef",
                ref: s,
                modelValue: a(r),
                "onUpdate:modelValue": P[0] || (P[0] = (M) => Po(r) ? r.value = M : null),
                "is-searching": u.value,
                disabled: v.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              O(Jr, {
                ref_key: "searchOptionsDropdownRef",
                ref: l,
                visible: h.value,
                "onUpdate:visible": P[1] || (P[1] = (M) => h.value = M),
                "size-filter": S.value,
                "onUpdate:sizeFilter": P[2] || (P[2] = (M) => S.value = M),
                "selected-option": g.value,
                "onUpdate:selectedOption": P[3] || (P[3] = (M) => g.value = M),
                disabled: v.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            i("div", {
              class: "vuefinder__search-modal__options",
              onClick: P[7] || (P[7] = de(() => {
              }, ["stop"]))
            }, [
              i("div", kl, [
                i("button", {
                  class: Q(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": v.value }]),
                  onClick: de(ae, ["stop"])
                }, [
                  O(a(He), { class: "vuefinder__search-modal__location-icon" }),
                  i("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: _.value?.path || a(k).path
                  }, x(a(vo)(_.value?.path || a(k).path)), 9, $l),
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
                onClick: P[6] || (P[6] = de(() => {
                }, ["stop"]))
              }, [
                he(i("input", {
                  "onUpdate:modelValue": P[4] || (P[4] = (M) => D.value = M),
                  type: "checkbox",
                  disabled: v.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: P[5] || (P[5] = de(() => {
                  }, ["stop"]))
                }, null, 8, Sl), [
                  [en, D.value]
                ]),
                i("span", null, x(a(t)("Include subfolders")), 1)
              ])
            ]),
            v.value ? (p(), w("div", Cl, [
              i("div", Fl, [
                O(dn, {
                  modelValue: _.value,
                  "onUpdate:modelValue": [
                    P[8] || (P[8] = (M) => _.value = M),
                    fe
                  ],
                  "show-pinned-folders": !0,
                  "current-path": a(k),
                  onSelectAndClose: X
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : T("", !0),
            !a(r).trim() && !v.value ? (p(), w("div", Dl, [
              i("p", Pl, x(a(t)("Search helper text")), 1)
            ])) : T("", !0),
            a(r).trim() && !v.value ? (p(), L(wl, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": c.value,
              "is-searching": u.value,
              "selected-index": f.value,
              "expanded-paths": m.value,
              "active-dropdown": b.value,
              "selected-item-dropdown-option": y.value,
              "results-enter": !0,
              onSelectResultItem: U,
              onSelectResultItemWithDropdown: ne,
              onTogglePathExpansion: C,
              onToggleItemDropdown: B,
              "onUpdate:selectedItemDropdownOption": P[9] || (P[9] = (M) => y.value = M),
              onCopyPath: re,
              onOpenContainingFolder: q,
              onPreview: I
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : T("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), El = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: t }) {
    const o = ee(), s = E(!1), { t: l } = o.i18n;
    let d = null;
    const r = () => {
      d && clearTimeout(d), s.value = !0, d = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return ve(() => {
      o.emitter.on(n.on, r);
    }), $e(() => {
      d && clearTimeout(d);
    }), {
      shown: s,
      t: l
    };
  }
}, Tl = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [o, s] of e)
    t[o] = s;
  return t;
}, Ml = { key: 1 };
function Al(n, e, t, o, s, l) {
  return p(), w("div", {
    class: Q(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    n.$slots.default ? be(n.$slots, "default", { key: 0 }) : (p(), w("span", Ml, x(o.t("Saved.")), 1))
  ], 2);
}
const lt = /* @__PURE__ */ Tl(El, [["render", Al]]), Il = [
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
], Ol = { class: "vuefinder__about-modal__content" }, Rl = { class: "vuefinder__about-modal__main" }, Ll = { class: "vuefinder__about-modal__description" }, Bl = { class: "vuefinder__about-modal__settings" }, Vl = { class: "vuefinder__about-modal__settings__fieldset" }, zl = { class: "vuefinder__about-modal__settings__section-title" }, Nl = { class: "vuefinder__about-modal__setting" }, Ul = { class: "vuefinder__about-modal__setting-label" }, Hl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, jl = { class: "vuefinder__about-modal__setting-input justify-end" }, Kl = ["checked"], ql = { class: "vuefinder__about-modal__setting" }, Wl = { class: "vuefinder__about-modal__setting-label" }, Gl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Yl = { class: "vuefinder__about-modal__setting-input justify-end" }, Ql = ["checked"], Xl = { class: "vuefinder__about-modal__setting" }, Jl = { class: "vuefinder__about-modal__setting-label" }, Zl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, ed = { class: "vuefinder__about-modal__setting-input justify-end" }, td = ["checked"], nd = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, od = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, sd = { class: "vuefinder__about-modal__setting-input justify-end" }, id = ["value"], ad = ["label"], rd = ["value"], ld = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, dd = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, cd = { class: "vuefinder__about-modal__setting-input justify-end" }, ud = ["label"], fd = ["value"], vd = { class: "vuefinder__about-modal__tab-content" }, pd = { class: "vuefinder__about-modal__settings__section-title" }, hd = { class: "vuefinder__about-modal__description" }, mo = /* @__PURE__ */ Z({
  __name: "ModalSettings",
  setup(n) {
    const e = ee(), { enabled: t } = Oe(), o = e.config, { clearStore: s } = e.storage, { t: l } = e.i18n, d = K(o.state), r = j(() => d.value.theme || "light"), c = async () => {
      o.reset(), s(), location.reload();
    }, u = (g) => {
      o.set("theme", g), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? Hn : nn, e.emitter.emit("vf-metric-units-saved");
    }, h = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, v = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: _ } = wt("VueFinderOptions"), D = Object.fromEntries(
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
      }).filter(([g]) => Object.keys(_).includes(g))
    );
    return (g, y) => (p(), L(Fe, null, {
      buttons: Y(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: y[2] || (y[2] = (m) => a(e).modal.close())
        }, x(a(l)("Close")), 1)
      ]),
      default: Y(() => [
        i("div", Ol, [
          O(Pe, {
            icon: a(fo),
            title: a(l)("Settings")
          }, null, 8, ["icon", "title"]),
          i("div", Rl, [
            i("div", Ll, x(a(l)("Customize your experience with the following settings")), 1),
            i("div", Bl, [
              i("fieldset", Vl, [
                i("div", zl, x(a(l)("General")), 1),
                i("div", Nl, [
                  i("div", Ul, [
                    i("label", Hl, x(a(l)("Use Metric Units")), 1)
                  ]),
                  i("div", jl, [
                    i("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: a(o).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: f
                    }, null, 40, Kl),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: Y(() => [
                        se(x(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", ql, [
                  i("div", Wl, [
                    i("label", Gl, x(a(l)("Compact list view")), 1)
                  ]),
                  i("div", Yl, [
                    i("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: a(o).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: h
                    }, null, 40, Ql),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: Y(() => [
                        se(x(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", Xl, [
                  i("div", Jl, [
                    i("label", Zl, x(a(l)("Persist path on reload")), 1)
                  ]),
                  i("div", ed, [
                    i("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: a(o).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: v
                    }, null, 40, td),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: Y(() => [
                        se(x(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                a(t)("theme") ? (p(), w("div", nd, x(a(l)("Theme")), 1)) : T("", !0),
                a(t)("theme") ? (p(), w("div", od, [
                  i("div", sd, [
                    i("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: y[0] || (y[0] = (m) => u(m.target?.value))
                    }, [
                      i("optgroup", {
                        label: a(l)("Theme")
                      }, [
                        (p(!0), w(ue, null, pe(a(Il), (m) => (p(), w("option", {
                          key: m.name,
                          value: m.name
                        }, x(m.displayName), 9, rd))), 128))
                      ], 8, ad)
                    ], 40, id),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: Y(() => [
                        se(x(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : T("", !0),
                a(t)("language") && Object.keys(a(D)).length > 1 ? (p(), w("div", ld, x(a(l)("Language")), 1)) : T("", !0),
                a(t)("language") && Object.keys(a(D)).length > 1 ? (p(), w("div", dd, [
                  i("div", cd, [
                    he(i("select", {
                      id: "language",
                      "onUpdate:modelValue": y[1] || (y[1] = (m) => a(e).i18n.locale = m),
                      class: "vuefinder__about-modal__select"
                    }, [
                      i("optgroup", {
                        label: a(l)("Language")
                      }, [
                        (p(!0), w(ue, null, pe(a(D), (m, b) => (p(), w("option", {
                          key: b,
                          value: b
                        }, x(m), 9, fd))), 128))
                      ], 8, ud)
                    ], 512), [
                      [Yt, a(e).i18n.locale]
                    ]),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: Y(() => [
                        se(x(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : T("", !0)
              ])
            ]),
            i("div", vd, [
              i("div", pd, x(a(l)("Reset")), 1),
              i("div", hd, x(a(l)("Reset all settings to default")), 1),
              i("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                onClick: c
              }, x(a(l)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ke = {
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
function md() {
  const n = ee(), e = n.fs, t = n.config, { enabled: o } = Oe(), s = K(e.path), l = K(e.selectedItems), d = (r) => {
    if (r.code === ke.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (r.metaKey && r.code === ke.KEY_R && !r.shiftKey && (n.adapter.invalidateListQuery(s.value.path), n.adapter.open(s.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === ke.KEY_R && o("rename") && l.value.length === 1 && (n.modal.open(At, { items: l.value }), r.preventDefault()), r.code === ke.DELETE && l.value.length !== 0 && n.modal.open(Mt, { items: l.value }), r.metaKey && r.code === ke.BACKSLASH && n.modal.open(qn), r.metaKey && r.code === ke.KEY_F && o("search") && (n.modal.open(hn), r.preventDefault()), r.metaKey && r.code === ke.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === ke.KEY_S && (n.modal.open(mo), r.preventDefault()), r.metaKey && r.code === ke.ENTER && (t.toggle("fullScreen"), n.root.focus()), r.metaKey && r.code === ke.KEY_A && (e.selectAll(n.selectionMode || "multiple", n), r.preventDefault()), r.code === ke.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && n.modal.open(It, {
        storage: e.path.get().storage,
        item: l.value[0]
      }), r.metaKey && r.code === ke.KEY_C && o("copy")) {
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
      if (r.metaKey && r.code === ke.KEY_X && o("copy")) {
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
      if (r.metaKey && r.code === ke.KEY_V && o("copy")) {
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
          n.modal.open(cn, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  ve(async () => {
    if (await Me(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", d);
  }), Vn(() => {
    n.root && n.root.removeEventListener("keydown", d);
  });
}
function _d() {
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
              await sn((v, _) => {
                e.value.push({
                  name: _.name,
                  size: _.size,
                  type: _.type,
                  lastModified: new Date(_.lastModified),
                  file: _
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
const gd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function wd(n, e) {
  return p(), w("svg", gd, [...e[0] || (e[0] = [
    i("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const _o = { render: wd }, yd = { class: "vuefinder__new-folder-modal__content" }, bd = { class: "vuefinder__new-folder-modal__form" }, xd = { class: "vuefinder__new-folder-modal__description" }, kd = ["placeholder"], mn = /* @__PURE__ */ Z({
  __name: "ModalNewFolder",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = K(o.path), l = E(""), d = E(""), r = () => {
      l.value !== "" && e.adapter.createFolder({
        path: s.value.path,
        name: l.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: t("%s is created.", l.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: t(c.message), type: "error" });
      });
    };
    return (c, u) => (p(), L(Fe, null, {
      buttons: Y(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, x(a(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[2] || (u[2] = (f) => a(e).modal.close())
        }, x(a(t)("Cancel")), 1)
      ]),
      default: Y(() => [
        i("div", null, [
          O(Pe, {
            icon: a(_o),
            title: a(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          i("div", yd, [
            i("div", bd, [
              i("p", xd, x(a(t)("Create a new folder")), 1),
              he(i("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (f) => l.value = f),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: vt(r, ["enter"])
              }, null, 40, kd), [
                [pt, l.value]
              ]),
              d.value.length ? (p(), L(a(d), {
                key: 0,
                error: "",
                onHidden: u[1] || (u[1] = (f) => d.value = "")
              }, {
                default: Y(() => [
                  se(x(d.value), 1)
                ]),
                _: 1
              })) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), $d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Sd(n, e) {
  return p(), w("svg", $d, [...e[0] || (e[0] = [
    i("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const go = { render: Sd }, Cd = { class: "vuefinder__new-file-modal__content" }, Fd = { class: "vuefinder__new-file-modal__form" }, Dd = { class: "vuefinder__new-file-modal__description" }, Pd = ["placeholder"], wo = /* @__PURE__ */ Z({
  __name: "ModalNewFile",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = K(o.path), l = E(""), d = E(""), r = () => {
      l.value !== "" && e.adapter.createFile({
        path: s.value.path,
        name: l.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: t("%s is created.", l.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: t(c.message), type: "error" });
      });
    };
    return (c, u) => (p(), L(Fe, null, {
      buttons: Y(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, x(a(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[2] || (u[2] = (f) => a(e).modal.close())
        }, x(a(t)("Cancel")), 1)
      ]),
      default: Y(() => [
        i("div", null, [
          O(Pe, {
            icon: a(go),
            title: a(t)("New File")
          }, null, 8, ["icon", "title"]),
          i("div", Cd, [
            i("div", Fd, [
              i("p", Dd, x(a(t)("Create a new file")), 1),
              he(i("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (f) => l.value = f),
                class: "vuefinder__new-file-modal__input",
                placeholder: a(t)("File Name"),
                type: "text",
                onKeyup: vt(r, ["enter"])
              }, null, 40, Pd), [
                [pt, l.value]
              ]),
              d.value.length ? (p(), L(a(d), {
                key: 0,
                error: "",
                onHidden: u[1] || (u[1] = (f) => d.value = "")
              }, {
                default: Y(() => [
                  se(x(d.value), 1)
                ]),
                _: 1
              })) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ed = ["title"], Td = /* @__PURE__ */ Z({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, o = ee(), { t: s } = o.i18n, l = E(!1), d = E(null), r = E(d.value?.innerHTML);
    le(r, () => l.value = !1);
    const c = () => {
      t("hidden"), l.value = !0;
    };
    return (u, f) => (p(), w("div", null, [
      l.value ? T("", !0) : (p(), w("div", {
        key: 0,
        ref_key: "strMessage",
        ref: d,
        class: Q(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
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
        ])], 8, Ed)
      ], 2))
    ]));
  }
});
function Zt(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const Md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ad(n, e) {
  return p(), w("svg", Md, [...e[0] || (e[0] = [
    i("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const yo = { render: Ad }, Id = { class: "vuefinder__upload-modal__content relative" }, Od = { class: "vuefinder__upload-modal__target-section" }, Rd = { class: "vuefinder__upload-modal__target-label" }, Ld = { class: "vuefinder__upload-modal__target-container" }, Bd = { class: "vuefinder__upload-modal__target-path" }, Vd = { class: "vuefinder__upload-modal__target-storage" }, zd = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Nd = { class: "vuefinder__upload-modal__target-badge" }, Ud = { class: "vuefinder__upload-modal__drag-hint" }, Hd = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, jd = ["textContent"], Kd = { class: "vuefinder__upload-modal__file-info" }, qd = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Wd = { class: "vuefinder__upload-modal__file-name md:hidden" }, Gd = {
  key: 0,
  class: "ml-auto"
}, Yd = ["title", "disabled", "onClick"], Qd = {
  key: 0,
  class: "py-2"
}, Xd = ["aria-expanded"], Jd = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, Zd = ["disabled"], ec = ["aria-expanded"], tc = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, _n = /* @__PURE__ */ Z({
  __name: "ModalUpload",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = K(o.path), l = E(s.value), d = E(!1), r = () => {
      const F = l.value.path;
      if (!F) return { storage: "local", path: "" };
      if (F.endsWith("://"))
        return { storage: F.replace("://", ""), path: "" };
      const $ = F.split("://");
      return {
        storage: $[0] || "local",
        path: $[1] || ""
      };
    }, c = (F) => {
      F && (l.value = F);
    }, u = (F) => {
      F && (l.value = F, d.value = !1);
    }, {
      container: f,
      internalFileInput: h,
      internalFolderInput: v,
      pickFiles: _,
      queue: S,
      message: D,
      uploading: g,
      hasFilesInDropArea: y,
      definitions: m,
      openFileSelector: b,
      upload: k,
      cancel: C,
      remove: B,
      clear: A,
      close: q,
      getClassNameForEntry: I,
      getIconForEntry: U,
      addExternalFiles: ne
    } = Yn(e.customUploader), re = () => {
      k(l.value);
    };
    ve(() => {
      e.emitter.on("vf-external-files-dropped", (F) => {
        ne(F);
      });
    }), $e(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const W = E(!1), ae = E(null), fe = E(null), X = (F) => {
      if (!W.value) return;
      const $ = F.target, P = ae.value?.contains($) ?? !1, M = fe.value?.contains($) ?? !1;
      !P && !M && (W.value = !1);
    };
    return ve(() => document.addEventListener("click", X)), $e(() => document.removeEventListener("click", X)), (F, $) => (p(), L(Fe, {
      "show-drag-overlay": a(y),
      "drag-overlay-text": a(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: Y(() => [
        i("div", {
          ref_key: "actionsMenuMobileRef",
          ref: ae,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          i("div", {
            class: Q([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              W.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: $[3] || ($[3] = (P) => a(b)())
            }, x(a(t)("Select Files")), 1),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": W.value ? "true" : "false",
              onClick: $[4] || ($[4] = de((P) => W.value = !W.value, ["stop"]))
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
            ])], 8, Xd)
          ], 2),
          W.value ? (p(), w("div", Jd, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[5] || ($[5] = (P) => {
                a(b)(), W.value = !1;
              })
            }, x(a(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[6] || ($[6] = (P) => {
                a(v)?.click(), W.value = !1;
              })
            }, x(a(t)("Select Folders")), 1),
            $[18] || ($[18] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: Q(["vuefinder__upload-actions__item", a(g) ? "disabled" : ""]),
              onClick: $[7] || ($[7] = (P) => a(g) ? null : (a(A)(!1), W.value = !1))
            }, x(a(t)("Clear all")), 3),
            i("div", {
              class: Q(["vuefinder__upload-actions__item", a(g) ? "disabled" : ""]),
              onClick: $[8] || ($[8] = (P) => a(g) ? null : (a(A)(!0), W.value = !1))
            }, x(a(t)("Clear only successful")), 3)
          ])) : T("", !0)
        ], 512),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: a(g) || !a(S).length,
          onClick: de(re, ["prevent"])
        }, x(a(t)("Upload")), 9, Zd),
        a(g) ? (p(), w("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[9] || ($[9] = de(
            //@ts-ignore
            (...P) => a(C) && a(C)(...P),
            ["prevent"]
          ))
        }, x(a(t)("Cancel")), 1)) : (p(), w("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[10] || ($[10] = de(
            //@ts-ignore
            (...P) => a(q) && a(q)(...P),
            ["prevent"]
          ))
        }, x(a(t)("Close")), 1)),
        i("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: fe,
          class: "relative mr-auto hidden sm:block"
        }, [
          i("div", {
            class: Q(["vuefinder__upload-actions", W.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            i("button", {
              ref_key: "pickFiles",
              ref: _,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, x(a(t)("Select Files")), 513),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": W.value ? "true" : "false",
              onClick: $[11] || ($[11] = de((P) => W.value = !W.value, ["stop"]))
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
            ])], 8, ec)
          ], 2),
          W.value ? (p(), w("div", tc, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[12] || ($[12] = (P) => {
                a(b)(), W.value = !1;
              })
            }, x(a(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[13] || ($[13] = (P) => {
                a(v)?.click(), W.value = !1;
              })
            }, x(a(t)("Select Folders")), 1),
            $[20] || ($[20] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: Q(["vuefinder__upload-actions__item", a(g) ? "disabled" : ""]),
              onClick: $[14] || ($[14] = (P) => a(g) ? null : (a(A)(!1), W.value = !1))
            }, x(a(t)("Clear all")), 3),
            i("div", {
              class: Q(["vuefinder__upload-actions__item", a(g) ? "disabled" : ""]),
              onClick: $[15] || ($[15] = (P) => a(g) ? null : (a(A)(!0), W.value = !1))
            }, x(a(t)("Clear only successful")), 3)
          ])) : T("", !0)
        ], 512)
      ]),
      default: Y(() => [
        i("div", null, [
          O(Pe, {
            icon: a(yo),
            title: a(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          i("div", Id, [
            i("div", Od, [
              i("div", Rd, x(a(t)("Hedef Klasör")), 1),
              i("div", Ld, [
                i("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: $[0] || ($[0] = (P) => d.value = !d.value)
                }, [
                  i("div", Bd, [
                    i("span", Vd, x(r().storage) + "://", 1),
                    r().path ? (p(), w("span", zd, x(r().path), 1)) : T("", !0)
                  ]),
                  i("span", Nd, x(a(t)("Browse")), 1)
                ])
              ]),
              i("div", {
                class: Q([
                  "vuefinder__upload-modal__tree-selector",
                  d.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                O(dn, {
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
            i("div", Ud, x(a(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            i("div", {
              ref_key: "container",
              ref: f,
              class: "hidden"
            }, null, 512),
            i("div", Hd, [
              (p(!0), w(ue, null, pe(a(S), (P) => (p(), w("div", {
                key: P.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                i("span", {
                  class: Q(["vuefinder__upload-modal__file-icon", a(I)(P)])
                }, [
                  i("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: x(a(U)(P))
                  }, null, 8, jd)
                ], 2),
                i("div", Kd, [
                  i("div", qd, x(a(Zt)(P.name, 40)) + " (" + x(P.size) + ") ", 1),
                  i("div", Wd, x(a(Zt)(P.name, 16)) + " (" + x(P.size) + ") ", 1),
                  i("div", {
                    class: Q(["vuefinder__upload-modal__file-status", a(I)(P)])
                  }, [
                    se(x(P.statusName) + " ", 1),
                    P.status === a(m).QUEUE_ENTRY_STATUS.UPLOADING ? (p(), w("b", Gd, x(P.percent), 1)) : T("", !0)
                  ], 2)
                ]),
                i("button", {
                  type: "button",
                  class: Q(["vuefinder__upload-modal__file-remove", a(g) ? "disabled" : ""]),
                  title: a(t)("Delete"),
                  disabled: a(g),
                  onClick: (M) => a(B)(P)
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
                ])], 10, Yd)
              ]))), 128)),
              a(S).length ? T("", !0) : (p(), w("div", Qd, x(a(t)("No files selected!")), 1))
            ]),
            a(D).length ? (p(), L(Td, {
              key: 0,
              error: "",
              onHidden: $[2] || ($[2] = (P) => D.value = "")
            }, {
              default: Y(() => [
                se(x(a(D)), 1)
              ]),
              _: 1
            })) : T("", !0)
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
}), nc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function oc(n, e) {
  return p(), w("svg", nc, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const bo = { render: oc }, sc = { class: "vuefinder__unarchive-modal__content" }, ic = { class: "vuefinder__unarchive-modal__items" }, ac = {
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
}, lc = { class: "vuefinder__unarchive-modal__item-name" }, dc = { class: "vuefinder__unarchive-modal__info" }, gn = /* @__PURE__ */ Z({
  __name: "ModalUnarchive",
  setup(n) {
    const e = ee(), t = e.fs, o = K(t.path), { t: s } = e.i18n, l = E(e.modal.data.items[0]), d = E(""), r = E([]), c = () => {
      e.adapter.unarchive({
        item: l.value.path,
        path: o.value.path
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: s("The file unarchived.") }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: s(u.message), type: "error" });
      });
    };
    return (u, f) => (p(), L(Fe, null, {
      buttons: Y(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, x(a(s)("Unarchive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (h) => a(e).modal.close())
        }, x(a(s)("Cancel")), 1)
      ]),
      default: Y(() => [
        i("div", null, [
          O(Pe, {
            icon: a(bo),
            title: a(s)("Unarchive")
          }, null, 8, ["icon", "title"]),
          i("div", sc, [
            i("div", ic, [
              (p(!0), w(ue, null, pe(r.value, (h) => (p(), w("p", {
                key: h.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                h.type === "dir" ? (p(), w("svg", ac, [...f[2] || (f[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (p(), w("svg", rc, [...f[3] || (f[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", lc, x(h.basename), 1)
              ]))), 128)),
              i("p", dc, x(a(s)("The archive will be unarchived at")) + " (" + x(a(o).path) + ") ", 1),
              d.value.length ? (p(), L(a(d), {
                key: 0,
                error: "",
                onHidden: f[0] || (f[0] = (h) => d.value = "")
              }, {
                default: Y(() => [
                  se(x(d.value), 1)
                ]),
                _: 1
              })) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), cc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function uc(n, e) {
  return p(), w("svg", cc, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const xo = { render: uc }, fc = { class: "vuefinder__archive-modal__content" }, vc = { class: "vuefinder__archive-modal__form" }, pc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, hc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, _c = { class: "vuefinder__archive-modal__file-name" }, gc = ["placeholder"], wn = /* @__PURE__ */ Z({
  __name: "ModalArchive",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = K(o.path), l = E(""), d = E(""), r = E(e.modal.data.items), c = () => {
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
    return (u, f) => (p(), L(Fe, null, {
      buttons: Y(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, x(a(t)("Archive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[2] || (f[2] = (h) => a(e).modal.close())
        }, x(a(t)("Cancel")), 1)
      ]),
      default: Y(() => [
        i("div", null, [
          O(Pe, {
            icon: a(xo),
            title: a(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          i("div", fc, [
            i("div", vc, [
              i("div", pc, [
                (p(!0), w(ue, null, pe(r.value, (h) => (p(), w("p", {
                  key: h.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  h.type === "dir" ? (p(), w("svg", hc, [...f[3] || (f[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (p(), w("svg", mc, [...f[4] || (f[4] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", _c, x(h.basename), 1)
                ]))), 128))
              ]),
              he(i("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (h) => l.value = h),
                class: "vuefinder__archive-modal__input",
                placeholder: a(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: vt(c, ["enter"])
              }, null, 40, gc), [
                [pt, l.value]
              ]),
              d.value.length ? (p(), L(a(d), {
                key: 0,
                error: "",
                onHidden: f[1] || (f[1] = (h) => d.value = "")
              }, {
                default: Y(() => [
                  se(x(d.value), 1)
                ]),
                _: 1
              })) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), wc = { class: "vuefinder__about-modal__content" }, yc = { class: "vuefinder__about-modal__main" }, bc = { class: "vuefinder__about-modal__shortcuts" }, xc = { class: "vuefinder__about-modal__shortcut" }, kc = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, $c = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Sc = { class: "vuefinder__about-modal__shortcut" }, Cc = { class: "vuefinder__about-modal__shortcut" }, Fc = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, Dc = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, Pc = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, Ec = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, Tc = { class: "vuefinder__about-modal__shortcut" }, Mc = { class: "vuefinder__about-modal__shortcut" }, Ac = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, Ic = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, Oc = /* @__PURE__ */ Z({
  __name: "ModalShortcuts",
  setup(n) {
    const e = ee(), { enabled: t } = Oe(), { t: o } = e.i18n;
    return (s, l) => (p(), L(Fe, null, {
      buttons: Y(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (d) => a(e).modal.close())
        }, x(a(o)("Close")), 1)
      ]),
      default: Y(() => [
        i("div", wc, [
          O(Pe, {
            icon: a(Kn),
            title: a(o)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          i("div", yc, [
            i("div", bc, [
              i("div", xc, [
                i("div", null, x(a(o)("Refresh")), 1),
                l[1] || (l[1] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "R")
                ], -1))
              ]),
              a(t)("rename") ? (p(), w("div", kc, [
                i("div", null, x(a(o)("Rename")), 1),
                l[2] || (l[2] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "Shift"),
                  se(" + "),
                  i("kbd", null, "R")
                ], -1))
              ])) : T("", !0),
              a(t)("delete") ? (p(), w("div", $c, [
                i("div", null, x(a(o)("Delete")), 1),
                l[3] || (l[3] = i("kbd", null, "Del", -1))
              ])) : T("", !0),
              i("div", Sc, [
                i("div", null, x(a(o)("Escape")), 1),
                l[4] || (l[4] = i("kbd", null, "Esc", -1))
              ]),
              i("div", Cc, [
                i("div", null, x(a(o)("Select All")), 1),
                l[5] || (l[5] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "A")
                ], -1))
              ]),
              a(t)("copy") ? (p(), w("div", Fc, [
                i("div", null, x(a(o)("Cut")), 1),
                l[6] || (l[6] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "X")
                ], -1))
              ])) : T("", !0),
              a(t)("copy") ? (p(), w("div", Dc, [
                i("div", null, x(a(o)("Copy")), 1),
                l[7] || (l[7] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "C")
                ], -1))
              ])) : T("", !0),
              a(t)("copy") ? (p(), w("div", Pc, [
                i("div", null, x(a(o)("Paste")), 1),
                l[8] || (l[8] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "V")
                ], -1))
              ])) : T("", !0),
              a(t)("search") ? (p(), w("div", Ec, [
                i("div", null, x(a(o)("Search")), 1),
                l[9] || (l[9] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "F")
                ], -1))
              ])) : T("", !0),
              i("div", Tc, [
                i("div", null, x(a(o)("Toggle Sidebar")), 1),
                l[10] || (l[10] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "E")
                ], -1))
              ]),
              i("div", Mc, [
                i("div", null, x(a(o)("Open Settings")), 1),
                l[11] || (l[11] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "S")
                ], -1))
              ]),
              a(t)("fullscreen") ? (p(), w("div", Ac, [
                i("div", null, x(a(o)("Toggle Full Screen")), 1),
                l[12] || (l[12] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "Enter")
                ], -1))
              ])) : T("", !0),
              a(t)("preview") ? (p(), w("div", Ic, [
                i("div", null, x(a(o)("Preview")), 1),
                l[13] || (l[13] = i("kbd", null, "Space", -1))
              ])) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Rc = { class: "vuefinder__menubar__container" }, Lc = ["onClick", "onMouseenter"], Bc = { class: "vuefinder__menubar__label" }, Vc = ["onMouseenter"], zc = ["onClick"], Nc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Uc = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Hc = /* @__PURE__ */ Z({
  __name: "MenuBar",
  setup(n) {
    const e = ee(), { enabled: t } = Oe(), { t: o } = e?.i18n || { t: (m) => m }, s = e?.fs, l = e?.config, d = K(l.state), r = K(s.selectedItems), c = K(s?.storages || []), u = E(null), f = E(!1), h = j(() => window.opener !== null || window.name !== "" || window.history.length <= 1), v = j(() => [
      {
        id: "file",
        label: o("File"),
        items: [
          {
            id: "new-folder",
            label: o("New Folder"),
            action: () => e?.modal?.open(mn, { items: r.value }),
            enabled: () => t("newfolder")
          },
          {
            id: "new-file",
            label: o("New File"),
            action: () => e?.modal?.open(wo, { items: r.value }),
            enabled: () => t("newfile")
          },
          { type: "separator" },
          {
            id: "upload",
            label: o("Upload"),
            action: () => e?.modal?.open(_n, { items: r.value }),
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
              r.value.length > 0 && e?.modal?.open(wn, { items: r.value });
            },
            enabled: () => r.value.length > 0 && t("archive")
          },
          {
            id: "unarchive",
            label: o("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(gn, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && t("unarchive")
          },
          { type: "separator" },
          {
            id: "preview",
            label: o("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(It, {
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
                m?.items?.size > 0 && e?.modal?.open(m.type === "cut" ? st : cn, {
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
                await ft(m.path);
              } else {
                const m = s?.path?.get();
                m?.path && await ft(m.path);
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
                b && await tl(b);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: o("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(At, { items: r.value });
            },
            enabled: () => r.value.length === 1 && t("rename")
          },
          {
            id: "delete",
            label: o("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(Mt, { items: r.value });
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
                const k = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
                e?.adapter.open(k);
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
            action: () => e?.modal?.open(mo),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: o("Shortcuts"),
            action: () => e?.modal?.open(Oc),
            enabled: () => !0
          },
          {
            id: "about",
            label: o("About"),
            action: () => e?.modal?.open(qn),
            enabled: () => !0
          }
        ]
      }
    ]), _ = (m) => {
      u.value === m ? D() : (u.value = m, f.value = !0);
    }, S = (m) => {
      f.value && (u.value = m);
    }, D = () => {
      u.value = null, f.value = !1;
    }, g = (m) => {
      D(), m();
    }, y = (m) => {
      m.target.closest(".vuefinder__menubar") || D();
    };
    return ve(() => {
      document.addEventListener("click", y);
    }), $e(() => {
      document.removeEventListener("click", y);
    }), (m, b) => (p(), w("div", {
      class: "vuefinder__menubar",
      onClick: b[0] || (b[0] = de(() => {
      }, ["stop"]))
    }, [
      i("div", Rc, [
        (p(!0), w(ue, null, pe(v.value, (k) => (p(), w("div", {
          key: k.id,
          class: Q(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": u.value === k.id }]),
          onClick: (C) => _(k.id),
          onMouseenter: (C) => S(k.id)
        }, [
          i("span", Bc, x(k.label), 1),
          u.value === k.id ? (p(), w("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (C) => S(k.id)
          }, [
            (p(!0), w(ue, null, pe(k.items, (C) => (p(), w("div", {
              key: C.id || C.type,
              class: Q(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": C.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": C.enabled && !C.enabled(),
                "vuefinder__menubar__dropdown__item--checked": C.checked && C.checked()
              }]),
              onClick: de((B) => C.type !== "separator" && C.enabled && C.enabled() ? g(C.action) : null, ["stop"])
            }, [
              C.type !== "separator" ? (p(), w("span", Nc, x(C.label), 1)) : T("", !0),
              C.checked && C.checked() ? (p(), w("span", Uc, " ✓ ")) : T("", !0)
            ], 10, zc))), 128))
          ], 40, Vc)) : T("", !0)
        ], 42, Lc))), 128))
      ])
    ]));
  }
}), jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Kc(n, e) {
  return p(), w("svg", jc, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const qc = { render: Kc }, Wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Gc(n, e) {
  return p(), w("svg", Wc, [...e[0] || (e[0] = [
    i("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Yc = { render: Gc }, Qc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Xc(n, e) {
  return p(), w("svg", Qc, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Jc = { render: Xc }, Zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function eu(n, e) {
  return p(), w("svg", Zc, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const tu = { render: eu }, nu = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ou(n, e) {
  return p(), w("svg", nu, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const su = { render: ou }, iu = { class: "vuefinder__toolbar" }, au = { class: "vuefinder__toolbar__actions" }, ru = ["title"], lu = ["title"], du = ["title"], cu = ["title"], uu = ["title"], fu = ["title"], vu = ["title"], pu = { class: "vuefinder__toolbar__controls" }, hu = ["title"], mu = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, _u = ["title"], gu = { class: "relative" }, wu = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, yu = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, bu = { class: "vuefinder__toolbar__dropdown-content" }, xu = { class: "vuefinder__toolbar__dropdown-section" }, ku = { class: "vuefinder__toolbar__dropdown-label" }, $u = { class: "vuefinder__toolbar__dropdown-row" }, Su = { value: "name" }, Cu = { value: "size" }, Fu = { value: "modified" }, Du = { value: "" }, Pu = { value: "asc" }, Eu = { value: "desc" }, Tu = { class: "vuefinder__toolbar__dropdown-section" }, Mu = { class: "vuefinder__toolbar__dropdown-label" }, Au = { class: "vuefinder__toolbar__dropdown-options" }, Iu = { class: "vuefinder__toolbar__dropdown-option" }, Ou = { class: "vuefinder__toolbar__option-text" }, Ru = { class: "vuefinder__toolbar__dropdown-option" }, Lu = { class: "vuefinder__toolbar__option-text" }, Bu = { class: "vuefinder__toolbar__dropdown-option" }, Vu = { class: "vuefinder__toolbar__option-text" }, zu = { class: "vuefinder__toolbar__dropdown-toggle" }, Nu = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Uu = { class: "vuefinder__toolbar__dropdown-reset" }, Hu = ["title"], ju = ["title"], Ku = /* @__PURE__ */ Z({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = ee(), { enabled: t } = Oe(), { t: o } = e.i18n, s = e.fs, l = e.config, d = K(l.state), r = K(s.selectedItems), c = K(s.sort), u = K(s.filter);
    le(
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
    const f = E(!1), h = (g) => {
      g.target.closest(".vuefinder__toolbar__dropdown-container") || (f.value = !1);
    };
    ve(() => {
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
    le(
      () => v.value.sortBy,
      (g) => {
        if (!v.value.sortOrder) {
          s.clearSort();
          return;
        }
        g === "name" ? s.setSort("basename", v.value.sortOrder) : g === "size" ? s.setSort("file_size", v.value.sortOrder) : g === "modified" && s.setSort("last_modified", v.value.sortOrder);
      }
    ), le(
      () => v.value.sortOrder,
      (g) => {
        if (!g) {
          s.clearSort();
          return;
        }
        v.value.sortBy === "name" ? s.setSort("basename", g) : v.value.sortBy === "size" ? s.setSort("file_size", g) : v.value.sortBy === "modified" && s.setSort("last_modified", g);
      }
    ), le(
      c,
      (g) => {
        g.active ? (g.column === "basename" ? v.value.sortBy = "name" : g.column === "file_size" ? v.value.sortBy = "size" : g.column === "last_modified" && (v.value.sortBy = "modified"), v.value.sortOrder = g.order) : v.value.sortOrder = "";
      },
      { immediate: !0 }
    ), le(
      () => v.value.filterKind,
      (g) => {
        s.setFilter(g, d.value.showHiddenFiles);
      }
    ), le(
      () => v.value.showHidden,
      (g) => {
        l.set("showHiddenFiles", g), s.setFilter(v.value.filterKind, g);
      }
    ), le(
      u,
      (g) => {
        v.value.filterKind = g.kind;
      },
      { immediate: !0 }
    ), le(
      () => d.value.showHiddenFiles,
      (g) => {
        v.value.showHidden = g, s.setFilter(v.value.filterKind, g);
      },
      { immediate: !0 }
    );
    const _ = () => l.set("view", d.value.view === "grid" ? "list" : "grid"), S = j(() => u.value.kind !== "all" || !d.value.showHiddenFiles || c.value.active), D = () => {
      v.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), s.clearSort(), s.clearFilter();
    };
    return (g, y) => (p(), w("div", iu, [
      i("div", au, [
        a(t)("newfolder") ? (p(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: a(o)("New Folder"),
          onClick: y[0] || (y[0] = (m) => a(e).modal.open(mn, { items: a(r) }))
        }, [
          O(a(_o))
        ], 8, ru)) : T("", !0),
        a(t)("newfile") ? (p(), w("div", {
          key: 1,
          class: "mx-1.5",
          title: a(o)("New File"),
          onClick: y[1] || (y[1] = (m) => a(e).modal.open(wo, { items: a(r) }))
        }, [
          O(a(go))
        ], 8, lu)) : T("", !0),
        a(t)("rename") ? (p(), w("div", {
          key: 2,
          class: "mx-1.5",
          title: a(o)("Rename"),
          onClick: y[2] || (y[2] = (m) => a(r).length !== 1 || a(e).modal.open(At, { items: a(r) }))
        }, [
          O(a(Gn), {
            class: Q(a(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, du)) : T("", !0),
        a(t)("delete") ? (p(), w("div", {
          key: 3,
          class: "mx-1.5",
          title: a(o)("Delete"),
          onClick: y[3] || (y[3] = (m) => !a(r).length || a(e).modal.open(Mt, { items: a(r) }))
        }, [
          O(a(Wn), {
            class: Q(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, cu)) : T("", !0),
        a(t)("upload") ? (p(), w("div", {
          key: 4,
          class: "mx-1.5",
          title: a(o)("Upload"),
          onClick: y[4] || (y[4] = (m) => a(e).modal.open(_n, { items: a(r) }))
        }, [
          O(a(yo))
        ], 8, uu)) : T("", !0),
        a(t)("unarchive") && a(r).length === 1 && a(r)[0].mime_type === "application/zip" ? (p(), w("div", {
          key: 5,
          class: "mx-1.5",
          title: a(o)("Unarchive"),
          onClick: y[5] || (y[5] = (m) => !a(r).length || a(e).modal.open(gn, { items: a(r) }))
        }, [
          O(a(bo), {
            class: Q(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, fu)) : T("", !0),
        a(t)("archive") ? (p(), w("div", {
          key: 6,
          class: "mx-1.5",
          title: a(o)("Archive"),
          onClick: y[6] || (y[6] = (m) => !a(r).length || a(e).modal.open(wn, { items: a(r) }))
        }, [
          O(a(xo), {
            class: Q(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, vu)) : T("", !0)
      ]),
      i("div", pu, [
        a(t)("search") ? (p(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: a(o)("Search Files"),
          onClick: y[7] || (y[7] = (m) => a(e).modal.open(hn))
        }, [
          O(a(un), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, hu)) : T("", !0),
        i("div", mu, [
          i("div", {
            title: a(o)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: y[8] || (y[8] = (m) => f.value = !f.value)
          }, [
            i("div", gu, [
              O(a(su), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              S.value ? (p(), w("div", wu)) : T("", !0)
            ])
          ], 8, _u),
          f.value ? (p(), w("div", yu, [
            i("div", bu, [
              i("div", xu, [
                i("div", ku, x(a(o)("Sorting")), 1),
                i("div", $u, [
                  he(i("select", {
                    "onUpdate:modelValue": y[9] || (y[9] = (m) => v.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", Su, x(a(o)("Name")), 1),
                    i("option", Cu, x(a(o)("Size")), 1),
                    i("option", Fu, x(a(o)("Date")), 1)
                  ], 512), [
                    [Yt, v.value.sortBy]
                  ]),
                  he(i("select", {
                    "onUpdate:modelValue": y[10] || (y[10] = (m) => v.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", Du, x(a(o)("None")), 1),
                    i("option", Pu, x(a(o)("Asc")), 1),
                    i("option", Eu, x(a(o)("Desc")), 1)
                  ], 512), [
                    [Yt, v.value.sortOrder]
                  ])
                ])
              ]),
              i("div", Tu, [
                i("div", Mu, x(a(o)("Show")), 1),
                i("div", Au, [
                  i("label", Iu, [
                    he(i("input", {
                      "onUpdate:modelValue": y[11] || (y[11] = (m) => v.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, v.value.filterKind]
                    ]),
                    i("span", Ou, x(a(o)("All items")), 1)
                  ]),
                  i("label", Ru, [
                    he(i("input", {
                      "onUpdate:modelValue": y[12] || (y[12] = (m) => v.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, v.value.filterKind]
                    ]),
                    i("span", Lu, x(a(o)("Files only")), 1)
                  ]),
                  i("label", Bu, [
                    he(i("input", {
                      "onUpdate:modelValue": y[13] || (y[13] = (m) => v.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, v.value.filterKind]
                    ]),
                    i("span", Vu, x(a(o)("Folders only")), 1)
                  ])
                ])
              ]),
              i("div", zu, [
                i("label", Nu, x(a(o)("Show hidden files")), 1),
                he(i("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": y[14] || (y[14] = (m) => v.value.showHidden = m),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [en, v.value.showHidden]
                ])
              ]),
              i("div", Uu, [
                i("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: D
                }, x(a(o)("Reset")), 1)
              ])
            ])
          ])) : T("", !0)
        ]),
        a(t)("fullscreen") ? (p(), w("div", {
          key: 1,
          class: "mx-1.5",
          title: a(o)("Toggle Full Screen"),
          onClick: y[15] || (y[15] = (m) => a(l).toggle("fullScreen"))
        }, [
          a(d).fullScreen ? (p(), L(a(Yc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (p(), L(a(qc), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Hu)) : T("", !0),
        i("div", {
          class: "mx-1.5",
          title: a(o)("Change View"),
          onClick: y[16] || (y[16] = (m) => _())
        }, [
          a(d).view === "grid" ? (p(), L(a(Jc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : T("", !0),
          a(d).view === "list" ? (p(), L(a(tu), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : T("", !0)
        ], 8, ju)
      ])
    ]));
  }
}), qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Wu(n, e) {
  return p(), w("svg", qu, [...e[0] || (e[0] = [
    i("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Gu = { render: Wu }, Yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Qu(n, e) {
  return p(), w("svg", Yu, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Xu = { render: Qu }, Ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Zu(n, e) {
  return p(), w("svg", Ju, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const ef = { render: Zu }, tf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function nf(n, e) {
  return p(), w("svg", tf, [...e[0] || (e[0] = [
    i("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const of = { render: nf }, sf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function af(n, e) {
  return p(), w("svg", sf, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const rf = { render: af }, lf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function df(n, e) {
  return p(), w("svg", lf, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const cf = { render: df }, uf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ff(n, e) {
  return p(), w("svg", uf, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const vf = { render: ff }, pf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function hf(n, e) {
  return p(), w("svg", pf, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const mf = { render: hf };
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
      (S) => S.path === h.path || Zr(S.path) === h.path
    ) ? f.dataTransfer && (f.dataTransfer.dropEffect = "none", f.dataTransfer.effectAllowed = "none") : (f.dataTransfer && (f.dataTransfer.dropEffect = "copy", f.dataTransfer.effectAllowed = "all"), f.currentTarget.classList.add(...e));
  }
  function d(f) {
    if (f.isExternalDrag || !(n.features?.move ?? !1))
      return;
    f.preventDefault();
    const v = f.currentTarget, _ = Number(v.dataset[t] || 0);
    v.dataset[t] = String(_ + 1);
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
    const _ = f.currentTarget;
    delete _.dataset[t], _.classList.remove(...e);
    const S = f.dataTransfer?.getData("items") || "[]", g = JSON.parse(S).map(
      (y) => o.sortedFiles.get().find((m) => m.path === y)
    );
    o.clearDraggedItem(), n.modal.open(st, { items: { from: g, to: h } });
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
const _f = { class: "vuefinder__breadcrumb__container" }, gf = ["title"], wf = ["title"], yf = ["title"], bf = ["title"], xf = { class: "vuefinder__breadcrumb__path-container" }, kf = { class: "vuefinder__breadcrumb__list" }, $f = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Sf = { class: "relative" }, Cf = ["title", "onClick"], Ff = ["title"], Df = { class: "vuefinder__breadcrumb__path-mode" }, Pf = { class: "vuefinder__breadcrumb__path-mode-content" }, Ef = ["title"], Tf = { class: "vuefinder__breadcrumb__path-text" }, Mf = ["title"], Af = ["data-theme"], If = ["onClick"], Of = { class: "vuefinder__breadcrumb__hidden-item-content" }, Rf = { class: "vuefinder__breadcrumb__hidden-item-text" }, Lf = /* @__PURE__ */ Z({
  __name: "Breadcrumb",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = e.config, l = K(s.state), d = K(o.path), r = K(o.loading), c = E(null), u = Xn(0, 100), f = E(5), h = E(!1), v = E(!1), _ = j(() => d.value?.breadcrumb ?? []);
    function S(X, F) {
      return X.length > F ? [X.slice(-F), X.slice(0, -F)] : [X, []];
    }
    const D = j(
      () => S(_.value, f.value)[0]
    ), g = j(
      () => S(_.value, f.value)[1]
    );
    le(u, () => {
      if (!c.value) return;
      const X = c.value.children;
      let F = 0, $ = 0;
      const P = 5, M = 1;
      f.value = P, Me(() => {
        for (let H = X.length - 1; H >= 0; H--) {
          const J = X[H];
          if (F + J.offsetWidth > u.value - 40)
            break;
          F += parseInt(J.offsetWidth.toString(), 10), $++;
        }
        $ < M && ($ = M), $ > P && ($ = P), f.value = $;
      });
    });
    const y = () => {
      c.value && (u.value = c.value.offsetWidth);
    }, m = E(null);
    ve(() => {
      m.value = new ResizeObserver(y), c.value && m.value.observe(c.value);
    }), $e(() => {
      m.value && m.value.disconnect();
    });
    const b = mt(e, ["vuefinder__drag-over"]);
    function k(X = null) {
      X ??= _.value.length - 2;
      const F = {
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
      return _.value[X] ?? F;
    }
    const C = () => {
      e.adapter.invalidateListQuery(d.value.path), e.adapter.open(d.value.path);
    }, B = () => {
      D.value.length > 0 && e.adapter.open(
        _.value[_.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
      );
    }, A = (X) => {
      e.adapter.open(X.path), h.value = !1;
    }, q = () => {
      h.value && (h.value = !1);
    }, I = {
      mounted(X, F) {
        X.clickOutsideEvent = function($) {
          X === $.target || X.contains($.target) || F.value();
        }, document.body.addEventListener("click", X.clickOutsideEvent);
      },
      beforeUnmount(X) {
        document.body.removeEventListener("click", X.clickOutsideEvent);
      }
    }, U = () => {
      s.toggle("showTreeView");
    }, ne = E({
      x: 0,
      y: 0
    }), re = (X, F = null) => {
      if (X.currentTarget instanceof HTMLElement) {
        const { x: $, y: P, height: M } = X.currentTarget.getBoundingClientRect();
        ne.value = { x: $, y: P + M };
      }
      h.value = F ?? !h.value;
    }, W = () => {
      v.value = !v.value;
    }, ae = async () => {
      await ft(d.value?.path || ""), e.emitter.emit("vf-toast-push", { label: t("Path copied to clipboard") });
    }, fe = () => {
      v.value = !1;
    };
    return (X, F) => (p(), w("div", _f, [
      i("span", {
        title: a(t)("Toggle Tree View")
      }, [
        O(a(cf), {
          class: Q(["vuefinder__breadcrumb__toggle-tree", a(l).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: U
        }, null, 8, ["class"])
      ], 8, gf),
      i("span", {
        title: a(t)("Go up a directory")
      }, [
        O(a(Xu), Te({
          class: _.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, qe(_.value.length ? a(b).events(k()) : {}), { onClick: B }), null, 16, ["class"])
      ], 8, wf),
      a(o).isLoading() ? (p(), w("span", {
        key: 1,
        title: a(t)("Cancel")
      }, [
        O(a(ef), {
          onClick: F[0] || (F[0] = ($) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, bf)) : (p(), w("span", {
        key: 0,
        title: a(t)("Refresh")
      }, [
        O(a(Gu), { onClick: C })
      ], 8, yf)),
      he(i("div", xf, [
        i("div", null, [
          O(a(of), Te({ class: "vuefinder__breadcrumb__home-icon" }, qe(a(b).events(k(-1))), {
            onClick: F[1] || (F[1] = de(($) => a(e).adapter.open(a(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        i("div", kf, [
          g.value.length ? he((p(), w("div", $f, [
            F[3] || (F[3] = i("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("div", Sf, [
              i("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: F[2] || (F[2] = ($) => re($, !0)),
                onClick: de(re, ["stop"])
              }, [
                O(a(ho), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [I, q]
          ]) : T("", !0)
        ]),
        i("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (p(!0), w(ue, null, pe(D.value, ($, P) => (p(), w("div", { key: P }, [
            F[4] || (F[4] = i("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("span", Te({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: $.basename
            }, qe(a(b).events($), !0), {
              onClick: de((M) => a(e).adapter.open($.path), ["stop"])
            }), x($.name), 17, Cf)
          ]))), 128))
        ], 512),
        a(s).get("loadingIndicator") === "circular" && a(r) ? (p(), L(a(Lt), { key: 0 })) : T("", !0),
        i("span", {
          title: a(t)("Toggle Path Copy Mode"),
          onClick: W
        }, [
          O(a(mf), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Ff)
      ], 512), [
        [Ne, !v.value]
      ]),
      he(i("div", Df, [
        i("div", Pf, [
          i("div", {
            title: a(t)("Copy Path")
          }, [
            O(a(vf), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: ae
            })
          ], 8, Ef),
          i("div", Tf, x(a(d).path), 1),
          i("div", {
            title: a(t)("Exit")
          }, [
            O(a(rf), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: fe
            })
          ], 8, Mf)
        ])
      ], 512), [
        [Ne, v.value]
      ]),
      (p(), L(Et, { to: "body" }, [
        i("div", null, [
          he(i("div", {
            style: Ue({
              position: "absolute",
              top: ne.value.y + "px",
              left: ne.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": a(e).theme.current
          }, [
            (p(!0), w(ue, null, pe(g.value, ($, P) => (p(), w("div", Te({
              key: P,
              class: "vuefinder__breadcrumb__hidden-item"
            }, qe(a(b).events($), !0), {
              onClick: (M) => A($)
            }), [
              i("div", Of, [
                i("span", null, [
                  O(a(He), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                i("span", Rf, x($.name), 1)
              ])
            ], 16, If))), 128))
          ], 12, Af), [
            [Ne, h.value]
          ])
        ])
      ]))
    ]));
  }
});
function Bf(n, e) {
  const {
    scrollContainer: t,
    itemWidth: o = 100,
    rowHeight: s,
    overscan: l = 2,
    containerPadding: d = 48,
    lockItemsPerRow: r
  } = e, c = n, u = () => typeof s == "number" ? s : s.value, f = E(0), h = E(6), v = E(600);
  let _ = null;
  const S = j(() => Math.ceil(c.value.length / h.value)), D = j(() => S.value * u()), g = j(() => {
    const I = u(), U = Math.max(0, Math.floor(f.value / I) - l), ne = Math.min(
      S.value,
      Math.ceil((f.value + v.value) / I) + l
    );
    return { start: U, end: ne };
  }), y = j(() => {
    const { start: I, end: U } = g.value;
    return Array.from({ length: U - I }, (ne, re) => I + re);
  }), m = () => v.value, b = () => r.value, k = () => {
    if (b()) {
      h.value = 1;
      return;
    }
    if (t.value) {
      const I = t.value.clientWidth - d;
      h.value = Math.max(Math.floor(I / o), 2);
    }
  }, C = (I) => {
    const U = I.target;
    f.value = U.scrollTop;
  };
  le(
    () => c.value.length,
    () => {
      k();
    }
  );
  const B = (I, U) => {
    if (!I || !Array.isArray(I))
      return [];
    const ne = U * h.value;
    return I.slice(ne, ne + h.value);
  }, A = (I, U, ne, re, W) => {
    if (!I || !Array.isArray(I))
      return [];
    const ae = [];
    for (let fe = U; fe <= ne; fe++)
      for (let X = re; X <= W; X++) {
        const F = fe * h.value + X;
        F < I.length && I[F] && ae.push(I[F]);
      }
    return ae;
  }, q = (I) => ({
    row: Math.floor(I / h.value),
    col: I % h.value
  });
  return ve(async () => {
    await Me(), t.value && (v.value = t.value.clientHeight || 600), k(), window.addEventListener("resize", () => {
      t.value && (v.value = t.value.clientHeight || 600), k();
    }), t.value && "ResizeObserver" in window && (_ = new ResizeObserver((I) => {
      const U = I[0];
      U && (v.value = Math.round(U.contentRect.height)), k();
    }), _.observe(t.value));
  }), $e(() => {
    window.removeEventListener("resize", k), _ && (_.disconnect(), _ = null);
  }), {
    scrollTop: f,
    itemsPerRow: h,
    totalRows: S,
    totalHeight: D,
    visibleRange: g,
    visibleRows: y,
    updateItemsPerRow: k,
    handleScroll: C,
    getRowItems: B,
    getItemsInRange: A,
    getItemPosition: q,
    getContainerHeight: m
  };
}
function Vf(n) {
  const { getItemPosition: e, getItemsInRange: t, getKey: o, selectionObject: s, rowHeight: l, itemWidth: d } = n, r = Math.floor(Math.random() * 2 ** 32).toString(), c = ee(), u = c.fs, f = K(u.selectedKeys), h = K(u.sortedFiles), v = E(/* @__PURE__ */ new Set()), _ = E(!1), S = E(!1), D = E(null), g = (F) => F.map(($) => $.getAttribute("data-key")).filter(($) => !!$), y = (F) => {
    F.selection.getSelection().forEach(($) => {
      F.selection.deselect($, !0);
    });
  }, m = (F) => {
    f.value && f.value.forEach(($) => {
      const P = document.querySelector(`[data-key="${$}"]`);
      P && b($) && F.selection.select(P, !0);
    });
  }, b = (F) => {
    const $ = h.value?.find((H) => o(H) === F);
    if (!$) return !1;
    const P = c.selectionFilterType, M = c.selectionFilterMimeIncludes;
    return P === "files" && $.type === "dir" || P === "dirs" && $.type === "file" ? !1 : M && Array.isArray(M) && M.length > 0 ? $.type === "dir" ? !0 : $.mime_type ? M.some((H) => $.mime_type?.startsWith(H)) : !1 : !0;
  }, k = (F) => {
    if (F.size === 0) return null;
    const P = Array.from(F).map((ce) => {
      const Ve = h.value?.findIndex((je) => o(je) === ce) ?? -1;
      return e(Ve >= 0 ? Ve : 0);
    }), M = Math.min(...P.map((ce) => ce.row)), H = Math.max(...P.map((ce) => ce.row)), J = Math.min(...P.map((ce) => ce.col)), me = Math.max(...P.map((ce) => ce.col));
    return { minRow: M, maxRow: H, minCol: J, maxCol: me };
  }, C = (F) => {
    if (c.selectionMode === "single")
      return !1;
    _.value = !1, !F.event?.metaKey && !F.event?.ctrlKey && (S.value = !0), F.selection.resolveSelectables(), y(F), m(F);
  }, B = E(0), A = (F) => {
    const $ = F;
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
  }, q = ({ event: F, selection: $ }) => {
    B.value = (s.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const P = document.querySelector(
      ".selection-area-container"
    );
    if (P && (P.dataset.theme = c.theme.current), c.selectionMode === "single")
      return;
    const M = F;
    M && "type" in M && M.type === "touchend" && M.preventDefault();
    const H = F;
    if (!H?.ctrlKey && !H?.metaKey && (u.clearSelection(), $.clearSelection(!0, !0)), v.value.clear(), s.value) {
      const J = s.value.getSelectables()[0]?.closest(".scroller-" + r);
      if (J) {
        const me = J.getBoundingClientRect(), ce = A(F);
        if (ce) {
          const Ve = ce.y - me.top + J.scrollTop, je = ce.x - me.left, rt = Math.floor(Ve / l.value), nt = Math.floor(je / d);
          D.value = { row: rt, col: nt };
        }
      }
    }
  }, I = (F) => {
    if (c.selectionMode === "single")
      return;
    const $ = F.selection, P = g(F.store.changed.added), M = g(F.store.changed.removed);
    S.value = !1, _.value = !0, P.forEach((H) => {
      f.value && !f.value.has(H) && b(H) && (v.value.add(H), u.select(H, c.selectionMode || "multiple"));
    }), M.forEach((H) => {
      document.querySelector(`[data-key="${H}"]`) && h.value?.find((me) => o(me) === H) && v.value.delete(H), u.deselect(H);
    }), $.resolveSelectables(), m(F);
  }, U = () => {
    v.value.clear();
  }, ne = (F) => {
    if (F.event && D.value && v.value.size > 0) {
      const P = Array.from(v.value).map((M) => {
        const H = h.value?.findIndex((J) => o(J) === M) ?? -1;
        return H >= 0 ? e(H) : null;
      }).filter((M) => M !== null);
      if (P.length > 0) {
        const M = [...P, D.value], H = {
          minRow: Math.min(...M.map((J) => J.row)),
          maxRow: Math.max(...M.map((J) => J.row)),
          minCol: Math.min(...M.map((J) => J.col)),
          maxCol: Math.max(...M.map((J) => J.col))
        };
        t(
          h.value || [],
          H.minRow,
          H.maxRow,
          H.minCol,
          H.maxCol
        ).forEach((J) => {
          const me = o(J);
          document.querySelector(`[data-key="${me}"]`) || u.select(me, c.selectionMode || "multiple");
        });
      }
    }
  }, re = (F) => {
    ne(F), y(F), m(F), u.setSelectedCount(f.value?.size || 0), _.value = !1, D.value = null;
  }, W = () => {
    s.value = new zo({
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
    }), s.value.on("beforestart", C), s.value.on("start", q), s.value.on("move", I), s.value.on("stop", re);
  }, ae = () => {
    s.value && (s.value.destroy(), s.value = null);
  }, fe = () => {
    s.value && (Array.from(
      f.value ?? /* @__PURE__ */ new Set()
    ).forEach(($) => {
      b($) || u.deselect($);
    }), ae(), W());
  }, X = (F) => {
    S.value && (s.value?.clearSelection(), U(), S.value = !1);
    const $ = F;
    !v.value.size && !S.value && !$?.ctrlKey && !$?.metaKey && (u.clearSelection(), s.value?.clearSelection());
  };
  return ve(() => {
    const F = ($) => {
      !$.buttons && _.value && (_.value = !1);
    };
    document.addEventListener("dragleave", F), $e(() => {
      document.removeEventListener("dragleave", F);
    });
  }), {
    isDragging: _,
    selectionStarted: S,
    explorerId: r,
    extractIds: g,
    cleanupSelection: y,
    refreshSelection: m,
    getSelectionRange: k,
    selectSelectionRange: ne,
    initializeSelectionArea: W,
    destroySelectionArea: ae,
    updateSelectionArea: fe,
    handleContentClick: X
  };
}
const zf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Nf(n, e) {
  return p(), w("svg", zf, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Uf = { render: Nf }, Hf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function jf(n, e) {
  return p(), w("svg", Hf, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Kf = { render: jf }, Gt = /* @__PURE__ */ Z({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (p(), w("div", null, [
      n.direction === "asc" ? (p(), L(a(Uf), { key: 0 })) : T("", !0),
      n.direction === "desc" ? (p(), L(a(Kf), { key: 1 })) : T("", !0)
    ]));
  }
}), qf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Wf(n, e) {
  return p(), w("svg", qf, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Mn = { render: Wf }, Gf = { class: "vuefinder__drag-item__container" }, Yf = { class: "vuefinder__drag-item__count" }, Qf = /* @__PURE__ */ Z({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, o) => (p(), w("div", Gf, [
      e.count > 1 ? (p(), L(a(Mn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : T("", !0),
      O(a(Mn), { class: "vuefinder__drag-item__icon" }),
      i("div", Yf, x(e.count), 1)
    ]));
  }
}), Xf = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, An = /* @__PURE__ */ Z({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(n) {
    const e = n, t = ee(), o = K(t.config.state), s = {
      app: t,
      config: o.value,
      item: e.item
    };
    return (l, d) => (p(), w("div", {
      class: Q(["vuefinder__item-icon", n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      be(l.$slots, "icon", Ge(Ye(s)), () => [
        n.item.type === "dir" ? (p(), L(a(He), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (p(), L(a(yt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (p(), w("div", Xf, x(n.item.extension.substring(0, 3)), 1)) : T("", !0)
      ])
    ], 2));
  }
}), Jf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Zf(n, e) {
  return p(), w("svg", Jf, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const In = { render: Zf }, ev = ["data-key", "data-row", "data-col", "draggable"], tv = { key: 0 }, nv = { class: "vuefinder__explorer__item-grid-content" }, ov = ["src", "alt"], sv = { class: "vuefinder__explorer__item-title" }, iv = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, av = { class: "vuefinder__explorer__item-list-name" }, rv = { class: "vuefinder__explorer__item-list-icon" }, lv = { class: "vuefinder__explorer__item-name" }, dv = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, cv = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, uv = { key: 0 }, fv = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, vv = /* @__PURE__ */ Z({
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
    const t = n, o = e, s = ee(), l = s.fs, d = s.config, r = j(() => {
      const b = s.selectionFilterType;
      return !b || b === "both" ? !0 : b === "files" && t.item.type === "file" || b === "dirs" && t.item.type === "dir";
    }), c = j(() => {
      const b = s.selectionFilterMimeIncludes;
      return !b || !b.length || t.item.type === "dir" ? !0 : t.item.mime_type ? b.some((k) => t.item.mime_type?.startsWith(k)) : !1;
    }), u = j(() => r.value && c.value), f = j(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      u.value ? "" : "vf-explorer-item--unselectable"
    ]), h = j(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !u.value ? 0.5 : ""
    }));
    let v = null;
    const _ = E(null);
    let S = !1;
    const { enabled: D } = Oe(), g = j(() => D("move")), y = () => {
      v && clearTimeout(v);
    }, m = (b) => {
      if (v && (b.preventDefault(), clearTimeout(v)), !S)
        S = !0, o("click", b), _.value = setTimeout(() => {
          S = !1;
        }, 300);
      else
        return S = !1, o("dblclick", b), v && clearTimeout(v), !1;
      if (b.currentTarget && b.currentTarget instanceof HTMLElement) {
        const k = b.currentTarget.getBoundingClientRect();
        b.preventDefault(), v = setTimeout(() => {
          let A = k.y + k.height;
          A + 146 > window.innerHeight - 10 && (A = k.y - 146), A < 10 && (A = 10);
          const q = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: k.x,
            clientY: A
          });
          b.target?.dispatchEvent(q);
        }, 300);
      }
    };
    return (b, k) => (p(), w("div", {
      class: Q(f.value),
      style: Ue(h.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: g.value,
      onTouchstart: k[1] || (k[1] = (C) => m(C)),
      onTouchend: k[2] || (k[2] = (C) => y()),
      onClick: k[3] || (k[3] = (C) => o("click", C)),
      onDblclick: k[4] || (k[4] = (C) => o("dblclick", C)),
      onContextmenu: k[5] || (k[5] = de((C) => o("contextmenu", C), ["prevent", "stop"])),
      onDragstart: k[6] || (k[6] = (C) => o("dragstart", C)),
      onDragend: k[7] || (k[7] = (C) => o("dragend", C))
    }, [
      n.view === "grid" ? (p(), w("div", tv, [
        a(l).isReadOnly(n.item) ? (p(), L(a(In), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : T("", !0),
        i("div", nv, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (p(), w("img", {
            key: 0,
            src: a(s).adapter.getPreviewUrl({ path: n.item.path }),
            class: "vuefinder__explorer__item-thumbnail",
            alt: n.item.basename,
            onTouchstart: k[0] || (k[0] = (C) => C.preventDefault())
          }, null, 40, ov)) : (p(), L(An, {
            key: 1,
            item: n.item,
            ext: !0
          }, {
            icon: Y((C) => [
              be(b.$slots, "icon", Ge(Ye(C)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        i("span", sv, x(a(Zt)(n.item.basename)), 1)
      ])) : (p(), w("div", iv, [
        i("div", av, [
          i("div", rv, [
            O(An, {
              item: n.item,
              small: n.compact
            }, {
              icon: Y((C) => [
                be(b.$slots, "icon", Ge(Ye(C)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          i("span", lv, x(n.item.basename), 1),
          i("div", null, [
            a(l).isReadOnly(n.item) ? (p(), L(a(In), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : T("", !0)
          ])
        ]),
        n.showPath ? (p(), w("div", dv, x(n.item.path), 1)) : T("", !0),
        n.showPath ? T("", !0) : (p(), w("div", cv, [
          n.item.file_size ? (p(), w("div", uv, x(a(s).filesize(n.item.file_size)), 1)) : T("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (p(), w("div", fv, x(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : T("", !0)
      ])),
      a(D)("pinned") && a(d).get("pinnedFolders").find((C) => C.path === n.item.path) ? (p(), L(a(an), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : T("", !0)
    ], 46, ev));
  }
}), pv = ["data-row"], On = /* @__PURE__ */ Z({
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
    return (r, c) => (p(), w("div", {
      class: Q(s.value),
      "data-row": n.rowIndex,
      style: Ue(l.value)
    }, [
      i("div", {
        class: Q(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Ue(d.value)
      }, [
        (p(!0), w(ue, null, pe(n.items, (u, f) => (p(), L(vv, Te({
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
        }, qe(n.dragNDropEvents(u)), {
          onClick: c[0] || (c[0] = (h) => o("click", h)),
          onDblclick: c[1] || (c[1] = (h) => o("dblclick", h)),
          onContextmenu: c[2] || (c[2] = (h) => o("contextmenu", h)),
          onDragstart: c[3] || (c[3] = (h) => o("dragstart", h)),
          onDragend: c[4] || (c[4] = (h) => o("dragend", h))
        }), {
          icon: Y((h) => [
            be(r.$slots, "icon", Te({ ref_for: !0 }, h))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, pv));
  }
}), hv = ["onClick"], mv = /* @__PURE__ */ Z({
  __name: "Toast",
  setup(n) {
    const e = ee(), { getStore: t } = e.storage, o = E(t("full-screen", !1)), s = E([]), l = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", d = (c) => {
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
    }), (c, u) => (p(), w("div", {
      class: Q([
        "vuefinder__toast",
        o.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"
      ])
    }, [
      O(Eo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Y(() => [
          (p(!0), w(ue, null, pe(s.value, (f, h) => (p(), w("div", {
            key: h,
            class: Q(["vuefinder__toast__message", l(f.type)]),
            onClick: (v) => d(h)
          }, x(f.label), 11, hv))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), _v = { class: "vuefinder__explorer__container" }, gv = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, wv = {
  key: 0,
  class: "vuefinder__explorer__header"
}, yv = {
  key: 0,
  class: "vuefinder__linear-loader"
}, bv = /* @__PURE__ */ Z({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = ee(), o = mt(t, ["vuefinder__drag-over"]), s = Ke("dragImage"), l = Rn(null), d = Ke("scrollContainer"), r = Ke("scrollContent"), c = t.fs, u = t.config, f = K(u.state), h = K(c.sort), v = K(c.sortedFiles), _ = K(c.selectedKeys), S = K(c.loading), D = (V) => _.value?.has(V) ?? !1, g = E(null), y = Ke("customScrollBar"), m = Ke("customScrollBarContainer"), b = j(() => {
      const V = f.value.view, te = f.value.compactListView;
      return V === "grid" ? 88 : te ? 24 : 50;
    }), { t: k } = t.i18n, {
      itemsPerRow: C,
      totalHeight: B,
      visibleRows: A,
      handleScroll: q,
      getRowItems: I,
      getItemsInRange: U,
      getItemPosition: ne,
      updateItemsPerRow: re
    } = Bf(
      j(() => v.value ?? []),
      {
        scrollContainer: d,
        itemWidth: 104,
        rowHeight: b,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: j(() => f.value.view === "list")
      }
    ), {
      explorerId: W,
      isDragging: ae,
      initializeSelectionArea: fe,
      destroySelectionArea: X,
      updateSelectionArea: F,
      handleContentClick: $
    } = Vf({
      getItemPosition: ne,
      getItemsInRange: U,
      getKey: (V) => V.path,
      selectionObject: l,
      rowHeight: b,
      itemWidth: 104
    }), P = E(null), M = (V) => {
      if (!V || !P.value) return !1;
      const te = _.value?.has(P.value) ?? !1;
      return ae.value && (te ? _.value?.has(V) ?? !1 : V === P.value);
    };
    le(
      () => u.get("view"),
      (V) => {
        V === "list" ? C.value = 1 : re();
      },
      { immediate: !0 }
    ), le(C, (V) => {
      u.get("view") === "list" && V !== 1 && (C.value = 1);
    });
    const H = (V) => v.value?.[V];
    ve(() => {
      if (fe(), l.value && l.value.on("beforestart", ({ event: V }) => {
        const te = V?.target === r.value;
        if (!V?.metaKey && !V?.ctrlKey && !V?.altKey && !te)
          return !1;
      }), le(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], F, {
        deep: !0
      }), m.value) {
        const V = Tt(
          m.value,
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
        g.value = V;
      }
      d.value && d.value.addEventListener("scroll", () => {
        const V = g.value;
        if (!V) return;
        const { scrollOffsetElement: te } = V.elements();
        te.scrollTo({
          top: d.value.scrollTop,
          left: 0
        });
      });
    }), ve(() => {
      t.emitter.on("vf-refresh-thumbnails", () => {
      });
    }), To(() => {
      if (g.value && y.value && d.value) {
        const te = d.value.scrollHeight > d.value.clientHeight, oe = y.value;
        oe.style.display = te ? "block" : "none", oe.style.height = `${B.value}px`;
      }
    }), $e(() => {
      X(), g.value && (g.value.destroy(), g.value = null);
    });
    const J = (V) => {
      const te = V.target?.closest(".file-item-" + W), oe = V;
      if (te) {
        const ie = String(te.getAttribute("data-key")), we = v.value?.find((xe) => xe.path === ie), R = t.selectionFilterType, z = t.selectionFilterMimeIncludes, N = !R || R === "both" || R === "files" && we?.type === "file" || R === "dirs" && we?.type === "dir";
        let G = !0;
        if (z && Array.isArray(z) && z.length > 0 && (we?.type === "dir" ? G = !0 : we?.mime_type ? G = z.some((xe) => (we?.mime_type).startsWith(xe)) : G = !1), !N || !G)
          return;
        const Ee = t.selectionMode || "multiple";
        !oe?.ctrlKey && !oe?.metaKey && (V.type !== "touchstart" || !c.isSelected(ie)) && (c.clearSelection(), l.value?.clearSelection(!0, !0)), l.value?.resolveSelectables(), V.type === "touchstart" && c.isSelected(ie) ? c.select(ie, Ee) : c.toggleSelect(ie, Ee);
      }
      c.setSelectedCount(_.value?.size || 0);
    }, me = (V) => {
      if (V.type === "file" && e.onFileDclick) {
        t.emitter.emit("vf-file-dclick", V);
        return;
      }
      if (V.type === "dir" && e.onFolderDclick) {
        t.emitter.emit("vf-folder-dclick", V);
        return;
      }
      const te = t.contextMenuItems?.find((oe) => oe.show(t, {
        items: [V],
        target: V,
        searchQuery: ""
      }));
      te && te.action(t, [V]);
    }, ce = (V) => {
      const te = V.target?.closest(
        ".file-item-" + W
      ), oe = te ? String(te.getAttribute("data-key")) : null;
      if (!oe) return;
      const ie = v.value?.find((G) => G.path === oe), we = t.selectionFilterType, R = t.selectionFilterMimeIncludes, z = !we || we === "both" || we === "files" && ie?.type === "file" || we === "dirs" && ie?.type === "dir";
      let N = !0;
      R && Array.isArray(R) && R.length > 0 && (ie?.type === "dir" ? N = !0 : ie?.mime_type ? N = R.some((G) => (ie?.mime_type).startsWith(G)) : N = !1), !(!z || !N) && ie && me(ie);
    }, Ve = () => {
      const V = _.value;
      return v.value?.filter((te) => V?.has(te.path)) || [];
    }, je = (V) => {
      V.preventDefault();
      const te = V.target?.closest(
        ".file-item-" + W
      );
      if (te) {
        const oe = String(te.getAttribute("data-key")), ie = v.value?.find((G) => G.path === oe), we = t.selectionFilterType, R = t.selectionFilterMimeIncludes, z = !we || we === "both" || we === "files" && ie?.type === "file" || we === "dirs" && ie?.type === "dir";
        let N = !0;
        if (R && Array.isArray(R) && R.length > 0 && (ie?.type === "dir" ? N = !0 : ie?.mime_type ? N = R.some(
          (G) => (ie?.mime_type).startsWith(G)
        ) : N = !1), !z || !N)
          return;
        _.value?.has(oe) || (c.clearSelection(), c.select(oe)), t.emitter.emit("vf-contextmenu-show", {
          event: V,
          items: Ve(),
          target: ie
        });
      }
    }, rt = (V) => {
      V.preventDefault(), t.emitter.emit("vf-contextmenu-show", { event: V, items: Ve() });
    }, nt = (V) => {
      if (!(t.features?.move ?? !1) || V.altKey || V.ctrlKey || V.metaKey)
        return V.preventDefault(), !1;
      ae.value = !0;
      const oe = V.target?.closest(
        ".file-item-" + W
      );
      if (P.value = oe ? String(oe.dataset.key) : null, V.dataTransfer && P.value) {
        V.dataTransfer.setDragImage(s.value, 0, 15), V.dataTransfer.effectAllowed = "all", V.dataTransfer.dropEffect = "copy";
        const ie = _.value?.has(P.value) ? Array.from(_.value) : [P.value];
        V.dataTransfer.setData("items", JSON.stringify(ie)), c.setDraggedItem(P.value);
      }
    }, _t = () => {
      P.value = null;
    };
    return (V, te) => (p(), w("div", _v, [
      i("div", {
        ref: "customScrollBarContainer",
        class: Q(["vuefinder__explorer__scrollbar-container", [{ "grid-view": a(f).view === "grid" }]])
      }, [
        i("div", gv, null, 512)
      ], 2),
      a(f).view === "list" ? (p(), w("div", wv, [
        i("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
          onClick: te[0] || (te[0] = (oe) => a(c).toggleSort("basename"))
        }, [
          se(x(a(k)("Name")) + " ", 1),
          he(O(Gt, {
            direction: a(h).order
          }, null, 8, ["direction"]), [
            [Ne, a(h).active && a(h).column === "basename"]
          ])
        ]),
        i("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
          onClick: te[1] || (te[1] = (oe) => a(c).toggleSort("file_size"))
        }, [
          se(x(a(k)("Size")) + " ", 1),
          he(O(Gt, {
            direction: a(h).order
          }, null, 8, ["direction"]), [
            [Ne, a(h).active && a(h).column === "file_size"]
          ])
        ]),
        i("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
          onClick: te[2] || (te[2] = (oe) => a(c).toggleSort("last_modified"))
        }, [
          se(x(a(k)("Date")) + " ", 1),
          he(O(Gt, {
            direction: a(h).order
          }, null, 8, ["direction"]), [
            [Ne, a(h).active && a(h).column === "last_modified"]
          ])
        ])
      ])) : T("", !0),
      i("div", {
        ref_key: "scrollContainer",
        ref: d,
        class: Q(["vuefinder__explorer__selector-area", "scroller-" + a(W)]),
        onScroll: te[4] || (te[4] = //@ts-ignore
        (...oe) => a(q) && a(q)(...oe))
      }, [
        a(u).get("loadingIndicator") === "linear" && a(S) ? (p(), w("div", yv)) : T("", !0),
        i("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Ue({ height: `${a(B)}px`, position: "relative", width: "100%" }),
          onContextmenu: de(rt, ["self", "prevent"]),
          onClick: te[3] || (te[3] = de(
            //@ts-ignore
            (...oe) => a($) && a($)(...oe),
            ["self"]
          ))
        }, [
          i("div", {
            ref_key: "dragImage",
            ref: s,
            class: "vuefinder__explorer__drag-item"
          }, [
            O(Qf, {
              count: P.value && a(_).has(P.value) ? a(_).size : 1
            }, null, 8, ["count"])
          ], 512),
          a(f).view === "grid" ? (p(!0), w(ue, { key: 0 }, pe(a(A), (oe) => (p(), L(On, {
            key: oe,
            "row-index": oe,
            "row-height": b.value,
            view: "grid",
            "items-per-row": a(C),
            items: a(I)(a(v), oe),
            "show-thumbnails": a(f).showThumbnails,
            "is-dragging-item": M,
            "is-selected": D,
            "drag-n-drop-events": (ie) => a(o).events(ie),
            "explorer-id": a(W),
            onClick: J,
            onDblclick: ce,
            onContextmenu: je,
            onDragstart: nt,
            onDragend: _t
          }, {
            icon: Y((ie) => [
              be(V.$slots, "icon", Te({ ref_for: !0 }, ie))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id"]))), 128)) : (p(!0), w(ue, { key: 1 }, pe(a(A), (oe) => (p(), L(On, {
            key: oe,
            "row-index": oe,
            "row-height": b.value,
            view: "list",
            items: H(oe) ? [H(oe)] : [],
            compact: a(f).compactListView,
            "is-dragging-item": M,
            "is-selected": D,
            "drag-n-drop-events": (ie) => a(o).events(ie),
            "explorer-id": a(W),
            onClick: J,
            onDblclick: ce,
            onContextmenu: je,
            onDragstart: nt,
            onDragend: _t
          }, {
            icon: Y((ie) => [
              be(V.$slots, "icon", Te({ ref_for: !0 }, ie))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id"]))), 128))
        ], 36)
      ], 34),
      O(mv)
    ]));
  }
}), xv = ["href", "download"], kv = ["onClick"], $v = /* @__PURE__ */ Z({
  __name: "ContextMenu",
  setup(n) {
    const e = ee(), t = E(null), o = E([]), s = Pt({
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
      let v = c.clientX - (f?.left ?? 0), _ = c.clientY - (f?.top ?? 0);
      s.active = !0, Me(() => {
        const S = t.value?.getBoundingClientRect(), D = S?.height ?? 0, g = S?.width ?? 0;
        v = h && h.right - c.pageX + window.scrollX < g ? v - g : v, _ = h && h.bottom - c.pageY + window.scrollY < D ? _ - D : _, s.positions = {
          left: String(v) + "px",
          top: String(_) + "px"
        };
      });
    };
    return (c, u) => he((p(), w("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: Q([{
        "vuefinder__context-menu--active": s.active,
        "vuefinder__context-menu--inactive": !s.active
      }, "vuefinder__context-menu"]),
      style: Ue(s.positions)
    }, [
      (p(!0), w(ue, null, pe(s.items, (f) => (p(), w("li", {
        key: f.title,
        class: "vuefinder__context-menu__item"
      }, [
        f.link ? (p(), w("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: l(f),
          download: l(f),
          onClick: u[0] || (u[0] = (h) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          i("span", null, x(f.title(a(e).i18n)), 1)
        ], 8, xv)) : (p(), w("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => d(f)
        }, [
          i("span", null, x(f.title(a(e).i18n)), 1)
        ], 8, kv))
      ]))), 128))
    ], 6)), [
      [Ne, s.active]
    ]);
  }
}), Sv = { class: "vuefinder__status-bar__wrapper" }, Cv = { class: "vuefinder__status-bar__storage" }, Fv = ["title"], Dv = { class: "vuefinder__status-bar__storage-icon" }, Pv = ["value"], Ev = ["value"], Tv = { class: "vuefinder__status-bar__info space-x-2" }, Mv = { key: 0 }, Av = { key: 1 }, Iv = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Ov = { class: "vuefinder__status-bar__actions" }, Rv = /* @__PURE__ */ Z({
  __name: "Statusbar",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = K(o.sortedFiles), l = K(o.path), d = K(o.selectedCount), r = K(o.storages), c = K(o.selectedItems), u = K(o.path), f = (g) => {
      const y = g.target.value;
      e.adapter.open(y + "://");
    }, h = j(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((g, y) => g + (y.file_size || 0), 0)), v = j(() => r.value), _ = j(() => s.value), S = j(() => d.value || 0), D = j(() => c.value || []);
    return (g, y) => (p(), w("div", Sv, [
      i("div", Cv, [
        i("div", {
          class: "vuefinder__status-bar__storage-container",
          title: a(t)("Storage")
        }, [
          i("div", Dv, [
            O(a(rn))
          ]),
          i("select", {
            name: "vuefinder-media-selector",
            value: a(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: f
          }, [
            (p(!0), w(ue, null, pe(v.value, (m) => (p(), w("option", {
              key: m,
              value: m
            }, x(m), 9, Ev))), 128))
          ], 40, Pv),
          y[0] || (y[0] = i("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, Fv),
        i("div", Tv, [
          S.value === 0 ? (p(), w("span", Mv, x(_.value.length) + " " + x(a(t)("items")), 1)) : (p(), w("span", Av, [
            se(x(S.value) + " " + x(a(t)("selected")) + " ", 1),
            h.value ? (p(), w("span", Iv, x(a(e).filesize(h.value)), 1)) : T("", !0)
          ]))
        ])
      ]),
      i("div", Ov, [
        be(g.$slots, "actions", {
          path: a(u).path,
          count: S.value || 0,
          selected: D.value
        })
      ])
    ]));
  }
}), Lv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Bv(n, e) {
  return p(), w("svg", Lv, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Vv = { render: Bv };
function ko(n, e) {
  const t = n.findIndex((o) => o.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const zv = { class: "vuefinder__folder-loader-indicator" }, Nv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, $o = /* @__PURE__ */ Z({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Mo({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, t = ee(), o = zn(n, "modelValue"), s = E(!1);
    le(
      () => o.value,
      () => l()
    );
    const l = async () => {
      s.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        ko(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (d) {
        console.error("Failed to fetch subfolders:", d);
      } finally {
        s.value = !1;
      }
    };
    return (d, r) => (p(), w("div", zv, [
      s.value ? (p(), L(a(Lt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (p(), w("div", Nv, [
        o.value ? (p(), L(a(Rt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : T("", !0),
        o.value ? T("", !0) : (p(), L(a(Ot), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Uv = { key: 0 }, Hv = { class: "vuefinder__treesubfolderlist__no-folders" }, jv = { class: "vuefinder__treesubfolderlist__item-content" }, Kv = ["onClick"], qv = ["title", "onDblclick", "onClick"], Wv = { class: "vuefinder__treesubfolderlist__item-icon" }, Gv = { class: "vuefinder__treesubfolderlist__subfolder" }, Yv = /* @__PURE__ */ Z({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = ee(), t = e.fs, o = mt(e, ["vuefinder__drag-over"]), s = E({}), { t: l } = e.i18n, d = K(t.path), r = n, c = E(null);
    ve(() => {
      r.path === r.storage + "://" && c.value && Tt(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const u = j(() => e.treeViewData.find((h) => h.path === r.path)?.folders || []);
    return (f, h) => {
      const v = Bn("TreeSubfolderList", !0);
      return p(), w("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        u.value.length ? T("", !0) : (p(), w("li", Uv, [
          i("div", Hv, x(a(l)("No folders")), 1)
        ])),
        (p(!0), w(ue, null, pe(u.value, (_) => (p(), w("li", {
          key: _.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          i("div", jv, [
            i("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (S) => s.value[_.path] = !s.value[_.path]
            }, [
              O($o, {
                modelValue: s.value[_.path],
                "onUpdate:modelValue": (S) => s.value[_.path] = S,
                storage: n.storage,
                path: _.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, Kv),
            i("div", Te({
              class: "vuefinder__treesubfolderlist__item-link",
              title: _.path
            }, qe(
              a(o).events({
                ..._,
                dir: _.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (S) => s.value[_.path] = !s.value[_.path],
              onClick: (S) => a(e).adapter.open(_.path)
            }), [
              i("div", Wv, [
                a(d)?.path === _.path ? (p(), L(a(ln), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (p(), L(a(He), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              i("div", {
                class: Q(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(d).path === _.path
                }])
              }, x(_.basename), 3)
            ], 16, qv)
          ]),
          i("div", Gv, [
            he(O(v, {
              storage: r.storage,
              path: _.path
            }, null, 8, ["storage", "path"]), [
              [Ne, s.value[_.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Qv = /* @__PURE__ */ Z({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = ee(), t = e.fs, o = E(!1), s = n, l = mt(e, ["vuefinder__drag-over"]), d = K(t.path), r = j(() => s.storage === d.value?.storage), c = {
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
    return (f, h) => (p(), w(ue, null, [
      i("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: h[2] || (h[2] = (v) => u(n.storage))
      }, [
        i("div", Te({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, qe(a(l).events(c), !0)), [
          i("div", {
            class: Q(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            O(a(rn))
          ], 2),
          i("div", null, x(n.storage), 1)
        ], 16),
        i("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: h[1] || (h[1] = de((v) => o.value = !o.value, ["stop"]))
        }, [
          O($o, {
            modelValue: o.value,
            "onUpdate:modelValue": h[0] || (h[0] = (v) => o.value = v),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      he(O(Yv, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ne, o.value]
      ])
    ], 64));
  }
}), Xv = { class: "vuefinder__folder-indicator" }, Jv = { class: "vuefinder__folder-indicator--icon" }, Zv = /* @__PURE__ */ Z({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = zn(n, "modelValue");
    return (t, o) => (p(), w("div", Xv, [
      i("div", Jv, [
        e.value ? (p(), L(a(Rt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : T("", !0),
        e.value ? T("", !0) : (p(), L(a(Ot), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), ep = {
  key: 0,
  class: "vuefinder__treeview__header"
}, tp = { class: "vuefinder__treeview__pinned-label" }, np = { class: "vuefinder__treeview__pin-text text-nowrap" }, op = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, sp = ["onClick"], ip = ["title"], ap = ["onClick"], rp = { key: 0 }, lp = { class: "vuefinder__treeview__no-pinned" }, dp = /* @__PURE__ */ Z({
  __name: "TreeView",
  setup(n) {
    const e = ee(), { enabled: t } = Oe(), { t: o } = e.i18n, { getStore: s, setStore: l } = e.storage, d = e.fs, r = e.config, c = K(r.state), u = K(d.sortedFiles), f = K(d.storages), h = j(() => f.value || []), v = K(d.path), _ = mt(e, ["vuefinder__drag-over"]), S = E(190), D = E(s("pinned-folders-opened", !0));
    le(D, (b) => l("pinned-folders-opened", b));
    const g = (b) => {
      const k = r.get("pinnedFolders");
      r.set("pinnedFolders", k.filter((C) => C.path !== b.path));
    }, y = (b) => {
      const k = b.clientX, C = b.target.parentElement;
      if (!C) return;
      const B = C.getBoundingClientRect().width;
      C.classList.remove("transition-[width]"), C.classList.add("transition-none");
      const A = (I) => {
        S.value = B + I.clientX - k, S.value < 50 && (S.value = 0, r.set("showTreeView", !1)), S.value > 50 && r.set("showTreeView", !0);
      }, q = () => {
        const I = C.getBoundingClientRect();
        S.value = I.width, C.classList.add("transition-[width]"), C.classList.remove("transition-none"), window.removeEventListener("mousemove", A), window.removeEventListener("mouseup", q);
      };
      window.addEventListener("mousemove", A), window.addEventListener("mouseup", q);
    }, m = E(null);
    return ve(() => {
      m.value && Tt(m.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), le(u, (b) => {
      const k = b.filter((C) => C.type === "dir");
      ko(e.treeViewData, {
        path: v.value.path || "",
        folders: k.map((C) => ({
          storage: C.storage,
          path: C.path,
          basename: C.basename,
          type: "dir"
        }))
      });
    }), (b, k) => (p(), w(ue, null, [
      i("div", {
        class: Q(["vuefinder__treeview__overlay", a(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: k[0] || (k[0] = (C) => a(r).toggle("showTreeView"))
      }, null, 2),
      i("div", {
        style: Ue(
          a(c).showTreeView ? "min-width:100px;max-width:75%; width: " + S.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        i("div", {
          ref_key: "treeViewScrollElement",
          ref: m,
          class: "vuefinder__treeview__scroll"
        }, [
          a(t)("pinned") ? (p(), w("div", ep, [
            i("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: k[2] || (k[2] = (C) => D.value = !D.value)
            }, [
              i("div", tp, [
                O(a(an), { class: "vuefinder__treeview__pin-icon" }),
                i("div", np, x(a(o)("Pinned Folders")), 1)
              ]),
              O(Zv, {
                modelValue: D.value,
                "onUpdate:modelValue": k[1] || (k[1] = (C) => D.value = C)
              }, null, 8, ["modelValue"])
            ]),
            D.value ? (p(), w("ul", op, [
              (p(!0), w(ue, null, pe(a(c).pinnedFolders, (C) => (p(), w("li", {
                key: C.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                i("div", Te({ class: "vuefinder__treeview__pinned-folder" }, qe(a(_).events(C), !0), {
                  onClick: (B) => a(e).adapter.open(C.path)
                }), [
                  a(v).path !== C.path ? (p(), L(a(He), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : T("", !0),
                  a(v).path === C.path ? (p(), L(a(ln), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : T("", !0),
                  i("div", {
                    title: C.path,
                    class: Q(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": a(v).path === C.path
                    }])
                  }, x(C.basename), 11, ip)
                ], 16, sp),
                i("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (B) => g(C)
                }, [
                  O(a(Vv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, ap)
              ]))), 128)),
              a(c).pinnedFolders.length ? T("", !0) : (p(), w("li", rp, [
                i("div", lp, x(a(o)("No folders pinned")), 1)
              ]))
            ])) : T("", !0)
          ])) : T("", !0),
          (p(!0), w(ue, null, pe(h.value, (C) => (p(), w("div", {
            key: C,
            class: "vuefinder__treeview__storage"
          }, [
            O(Qv, { storage: C }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        i("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: y
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
function cp(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function _e(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, o) => !(e.needsSearchQuery !== !!o.searchQuery || e.target !== void 0 && e.target !== cp(o) || e.targetType !== void 0 && e.targetType !== o.target?.type || e.mimeType !== void 0 && e.mimeType !== o.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function dt(...n) {
  return (e, t) => n.some((o) => o(e, t));
}
function ct(...n) {
  return (e, t) => n.every((o) => o(e, t));
}
const So = [
  {
    id: ye.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: _e({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: ye.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: dt(_e({ target: "none" }), _e({ target: "many" }))
  },
  {
    id: ye.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && _e({ target: "none" })(n, e)
  },
  {
    id: ye.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(mn),
    show: _e({ target: "none", feature: "newfolder" })
  },
  {
    id: ye.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: _e({ target: "one", targetType: "dir" })
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
    show: ct(_e({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) === -1)
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
    show: ct(_e({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) !== -1)
  },
  {
    id: ye.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(It, { storage: e[0]?.storage, item: e[0] }),
    show: ct(
      _e({ target: "one", feature: "preview" }),
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
    show: ct(
      _e({ target: "one", feature: "download" }),
      (n, e) => e.target?.type !== "dir"
    )
  },
  {
    id: ye.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(At, { items: e }),
    show: _e({ target: "one", feature: "rename" })
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
    show: dt(
      _e({ target: "one", feature: "move" }),
      _e({ target: "many", feature: "move" })
    )
  },
  {
    id: ye.copy,
    title: ({ t: n }) => n("Copy"),
    action: (n, e) => {
      e.length > 0 && n.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: dt(
      _e({ target: "one", feature: "copy" }),
      _e({ target: "many", feature: "copy" })
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
        n.modal.open(t.type === "cut" ? st : cn, {
          items: { from: Array.from(t.items), to: r }
        });
      }
    },
    show: (n, e) => n.features?.copy ?? !1 ? n.fs.getClipboard()?.items?.size > 0 : !1
  },
  {
    id: ye.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(wn, { items: e }),
    show: dt(
      _e({ target: "many", feature: "archive" }),
      ct(
        _e({ target: "one", feature: "archive" }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: ye.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(gn, { items: e }),
    show: _e({ target: "one", feature: "unarchive", mimeType: "application/zip" })
  },
  {
    id: ye.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(Mt, { items: e });
    },
    show: dt(
      _e({ feature: "delete", target: "one" }),
      _e({ feature: "delete", target: "many" })
    )
  }
], up = ["data-theme"], fp = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, vp = { class: "vuefinder__external-drop-message" }, pp = { class: "vuefinder__main__content" }, hp = /* @__PURE__ */ Z({
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
    const t = e, o = n, s = ee(), l = Ke("root"), d = s.config;
    le(
      () => o.features,
      (g) => {
        const y = Un(g);
        Object.keys(s.features).forEach((m) => {
          delete s.features[m];
        }), Object.assign(s.features, y);
      },
      { deep: !0 }
    );
    const r = s.fs, c = K(d.state);
    md();
    const { isDraggingExternal: u, handleDragEnter: f, handleDragOver: h, handleDragLeave: v, handleDrop: _ } = _d();
    function S(g) {
      r.setPath(g.dirname), d.get("persist") && d.set("path", g.dirname), r.setReadOnly(g.read_only ?? !1), s.modal.close(), r.setFiles(g.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(g.storages);
    }
    s.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, s.adapter.onAfterOpen = (g) => {
      S(g), r.setLoading(!1);
    }, s.emitter.on("vf-upload-complete", (g) => {
      t("upload-complete", g);
    }), s.emitter.on("vf-delete-complete", (g) => {
      t("delete-complete", g);
    }), s.emitter.on("vf-file-dclick", (g) => {
      t("file-dclick", g);
    }), s.emitter.on("vf-folder-dclick", (g) => {
      t("folder-dclick", g);
    }), le(
      () => o.config?.theme,
      (g) => {
        g && d.set("theme", a(g));
      },
      { immediate: !0 }
    ), ve(() => {
      s.root = l.value, le(
        () => d.get("path"),
        (y) => {
          s.adapter.open(y);
        }
      );
      const g = d.get("persist") ? d.get("path") : d.get("initialPath") ?? "";
      r.setPath(g), s.adapter.open(g), r.path.listen((y) => {
        t("path-change", y.path);
      }), r.selectedItems.listen((y) => {
        t("select", y);
      }), t("ready");
    });
    const D = async (g) => {
      const y = await _(g);
      y.length > 0 && (s.modal.open(_n), setTimeout(() => {
        s.emitter.emit(
          "vf-external-files-dropped",
          y.map((m) => m.file)
        );
      }, 100));
    };
    return (g, y) => (p(), w("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: Q(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": a(u) }]),
      "data-theme": a(s).theme.current,
      onDragenter: y[2] || (y[2] = //@ts-ignore
      (...m) => a(f) && a(f)(...m)),
      onDragover: y[3] || (y[3] = //@ts-ignore
      (...m) => a(h) && a(h)(...m)),
      onDragleave: y[4] || (y[4] = //@ts-ignore
      (...m) => a(v) && a(v)(...m)),
      onDrop: D
    }, [
      i("div", {
        class: Q(a(s).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        i("div", {
          class: Q([
            a(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: y[0] || (y[0] = (m) => a(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: y[1] || (y[1] = (m) => a(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          a(u) ? (p(), w("div", fp, [
            i("div", vp, x(a(s).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : T("", !0),
          O(Hc),
          O(Ku),
          O(Lf),
          i("div", pp, [
            O(dp),
            O(bv, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: Y((m) => [
                be(g.$slots, "icon", Ge(Ye(m)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          O(Rv, null, {
            actions: Y((m) => [
              be(g.$slots, "status-bar", Ge(Ye(m)))
            ]),
            _: 3
          })
        ], 34),
        (p(), L(Et, { to: "body" }, [
          O(Ao, { name: "fade" }, {
            default: Y(() => [
              a(s).modal.visible ? (p(), L(Ln(a(s).modal.type), { key: 0 })) : T("", !0)
            ]),
            _: 1
          })
        ])),
        O($v, { items: a(So) }, null, 8, ["items"])
      ], 2)
    ], 42, up));
  }
}), mp = /* @__PURE__ */ Z({
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
  setup(n) {
    const e = n, t = e.id ?? wt(Qt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const o = ns(e, wt("VueFinderOptions") || {});
    return Uo(t, o), Io(Qt, t), Vn(() => {
      Ho(t);
    }), (s, l) => (p(), L(hp, Ge(Ye(e)), {
      icon: Y((d) => [
        be(s.$slots, "icon", Ge(Ye(d)))
      ]),
      "status-bar": Y((d) => [
        be(s.$slots, "status-bar", Ge(Ye(d)))
      ]),
      _: 3
    }, 16));
  }
}), Ep = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", mp);
  }
};
export {
  Dp as ArrayDriver,
  ye as ContextMenuIds,
  Pp as IndexedDBDriver,
  jn as RemoteDriver,
  mp as VueFinder,
  Ep as VueFinderPlugin,
  mp as VueFinderProvider,
  So as contextMenuItems,
  Ep as default
};
