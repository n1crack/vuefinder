import { inject as wt, reactive as Et, watch as le, ref as P, shallowRef as Ln, computed as j, markRaw as Do, defineComponent as J, onMounted as ve, nextTick as Ae, createElementBlock as y, openBlock as p, withKeys as ft, unref as a, createElementVNode as i, createCommentVNode as A, withModifiers as de, renderSlot as Fe, toDisplayString as b, createBlock as R, resolveDynamicComponent as Rn, withCtx as X, createVNode as L, Fragment as ce, renderList as pe, createTextVNode as se, withDirectives as he, vModelText as vt, onUnmounted as xe, useTemplateRef as je, resolveComponent as Bn, normalizeClass as G, vModelCheckbox as en, customRef as Eo, Teleport as Pt, normalizeStyle as Ne, isRef as Po, vModelSelect as Yt, onBeforeUnmount as Vn, vModelRadio as Kt, mergeProps as Te, toHandlers as Ke, vShow as ze, normalizeProps as tt, guardReactiveProps as nt, TransitionGroup as To, onUpdated as Ao, mergeModels as Mo, useModel as zn, Transition as Io, provide as Oo } from "vue";
import Lo from "mitt";
import { persistentAtom as Ro } from "@nanostores/persistent";
import { atom as Se, computed as Ge } from "nanostores";
import { useStore as K } from "@nanostores/vue";
import { QueryClient as Bo } from "@tanstack/vue-query";
import Vo from "@uppy/core";
import { Cropper as zo } from "vue-advanced-cropper";
import Nn from "vanilla-lazyload";
import { OverlayScrollbars as Tt } from "overlayscrollbars";
import No from "@viselect/vanilla";
import Uo from "@uppy/xhr-upload";
const tn = /* @__PURE__ */ new Map(), Qt = Symbol("ServiceContainerId");
function Ho(n, e) {
  tn.set(n, e);
}
function jo(n) {
  tn.delete(n);
}
function Z(n) {
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
function Ko(n) {
  const e = localStorage.getItem(n + "_storage"), t = Et(JSON.parse(e ?? "{}"));
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
async function qo(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function Wo(n, e, t, o) {
  const { getStore: s, setStore: l } = n, d = P({}), r = P(s("locale", e)), c = (h, v = e) => {
    qo(h, o).then((w) => {
      d.value = w, l("locale", h), r.value = h, l("translations", w), Object.values(o).length > 1 && (t.emit("vf-toast-push", { label: "The language is set to " + h }), t.emit("vf-language-saved"));
    }).catch((w) => {
      v ? (t.emit("vf-toast-push", {
        label: "The selected locale is not yet supported!",
        type: "error"
      }), c(v, null)) : (console.error(w), t.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  le(r, (h) => {
    c(h);
  }), !s("locale") && !Object.keys(o).length ? c(e) : d.value = s("translations");
  const u = (h, ...v) => v.length ? u(h = h.replace("%s", String(v.shift())), ...v) : h;
  function f(h, ...v) {
    return d.value && Object.prototype.hasOwnProperty.call(d.value, h) ? u(d.value[h] || h, ...v) : u(h, ...v);
  }
  return Et({ t: f, locale: r });
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
], Un = {
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
  advanced: Go.reduce((n, e) => (n[e] = !0, n), {})
};
function yn() {
  return Un.advanced;
}
function Hn(n) {
  return n ? n === "simple" || n === "advanced" ? { ...Un[n] } : { ...yn(), ...n } : yn();
}
const Yo = "4.0.5";
function nn(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1024, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function jn(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1e3, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function Qo(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!o) return 0;
  const s = parseFloat(o[1] || "0"), l = (o[2] || "").toLowerCase(), d = e[l] ?? 0;
  return Math.round(s * Math.pow(1024, d));
}
function Xo() {
  const n = Ln(null), e = P(!1), t = P(), o = P(!1);
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
}, Jo = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, o = { ...qt, ...e };
  o.theme || (o.theme = "light");
  const s = Ro(t, o, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), l = (h = {}) => {
    const v = s.get(), w = { ...qt, ...h, ...v };
    w.theme || (w.theme = "light"), s.set(w);
  }, d = (h) => s.get()[h], r = () => s.get(), c = (h, v) => {
    const w = s.get();
    typeof h == "object" && h !== null ? s.set({ ...w, ...h }) : s.set({ ...w, [h]: v });
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
function Zo(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(n) || 0, o = Number(e) || 0;
  return t === o ? 0 : t < o ? -1 : 1;
}
const es = () => {
  const n = Se(""), e = Se([]), t = Se(!1), o = Se([]), s = Se({ active: !1, column: "", order: "" }), l = Se({
    kind: "all",
    showHidden: !1
  }), d = Se(/* @__PURE__ */ new Set()), r = Se({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Se(null), u = Se(0), f = Se(!1), h = Se([]), v = Se(-1), w = Ge([n], (O) => {
    const B = (O ?? "").trim(), H = B.indexOf("://"), W = H >= 0 ? B.slice(0, H) : "", ke = (H >= 0 ? B.slice(H + 3) : B).split("/").filter(Boolean);
    let $e = "";
    const jt = ke.map((Ee) => ($e = $e ? `${$e}/${Ee}` : Ee, {
      basename: Ee,
      name: Ee,
      path: W ? `${W}://${$e}` : $e,
      type: "dir"
    }));
    return { storage: W, breadcrumb: jt, path: B };
  }), $ = Ge([o, s, l], (O, B, H) => {
    let W = O;
    H.kind === "files" ? W = W.filter((Ee) => Ee.type === "file") : H.kind === "folders" && (W = W.filter((Ee) => Ee.type === "dir")), H.showHidden || (W = W.filter((Ee) => !Ee.basename.startsWith(".")));
    const { active: me, column: ke, order: $e } = B;
    if (!me || !ke) return W;
    const jt = $e === "asc" ? 1 : -1;
    return W.slice().sort((Ee, Fo) => Zo(Ee[ke], Fo[ke]) * jt);
  }), F = Ge([o, d], (O, B) => B.size === 0 ? [] : O.filter((H) => B.has(H.path))), _ = (O, B) => {
    const H = n.get();
    if ((B ?? !0) && H !== O) {
      const W = h.get(), me = v.get();
      me < W.length - 1 && W.splice(me + 1), W.length === 0 && H && W.push(H), W.push(O), h.set([...W]), v.set(W.length - 1);
    }
    n.set(O);
  }, g = (O) => {
    o.set(O ?? []);
  }, m = (O) => {
    e.set(O ?? []);
  }, S = (O, B) => {
    s.set({ active: !0, column: O, order: B });
  }, k = (O) => {
    const B = s.get();
    B.active && B.column === O ? s.set({
      active: B.order === "asc",
      column: O,
      order: "desc"
    }) : s.set({
      active: !0,
      column: O,
      order: "asc"
    });
  }, C = () => {
    s.set({ active: !1, column: "", order: "" });
  }, V = (O, B) => {
    l.set({ kind: O, showHidden: B });
  }, M = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, q = (O, B = "multiple") => {
    const H = new Set(d.get());
    B === "single" && H.clear(), H.add(O), d.set(H), u.set(H.size);
  }, I = (O) => {
    const B = new Set(d.get());
    B.delete(O), d.set(B), u.set(B.size);
  }, N = (O) => d.get().has(O), te = (O, B = "multiple") => {
    const H = new Set(d.get());
    H.has(O) ? H.delete(O) : (B === "single" && H.clear(), H.add(O)), d.set(H), u.set(H.size);
  }, re = (O = "multiple", B) => {
    if (O === "single") {
      const H = o.get()[0];
      if (H) {
        const W = H.path;
        d.set(/* @__PURE__ */ new Set([W])), u.set(1);
      }
    } else if (B?.selectionFilterType || B?.selectionFilterMimeIncludes && B.selectionFilterMimeIncludes.length > 0) {
      const H = o.get().filter((W) => {
        const me = B.selectionFilterType, ke = B.selectionFilterMimeIncludes;
        return me === "files" && W.type === "dir" || me === "dirs" && W.type === "file" ? !1 : ke && Array.isArray(ke) && ke.length > 0 && W.type !== "dir" ? W.mime_type ? ke.some(($e) => W.mime_type?.startsWith($e)) : !1 : !0;
      }).map((W) => W.path);
      d.set(new Set(H)), u.set(H.length);
    } else {
      const H = new Set(o.get().map((W) => W.path));
      d.set(H), u.set(H.size);
    }
  }, ee = () => {
    d.set(/* @__PURE__ */ new Set()), u.set(0);
  }, ie = (O) => {
    const B = new Set(O ?? []);
    d.set(B), u.set(B.size);
  }, ue = (O) => {
    u.set(O);
  }, Y = (O) => {
    f.set(!!O);
  }, D = () => f.get(), x = (O, B) => {
    const H = o.get().filter((W) => B.has(W.path));
    r.set({
      type: O,
      path: w.get().path,
      items: new Set(H)
    });
  }, E = (O) => Ge([r], (B) => B.type === "cut" && Array.from(B.items).some((H) => H.path === O)), T = (O) => Ge([r], (B) => B.type === "copy" && Array.from(B.items).some((H) => H.path === O)), U = (O) => {
    const B = E(O);
    return K(B).value ?? !1;
  }, Q = (O) => {
    const B = T(O);
    return K(B).value ?? !1;
  }, _e = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, fe = () => r.get(), Ve = (O) => {
    c.set(O);
  }, He = () => c.get(), Ze = () => {
    c.set(null);
  }, at = () => {
    const O = h.get(), B = v.get();
    if (B > 0) {
      const H = B - 1, W = O[H];
      W && (v.set(H), _(W, !1));
    }
  }, _t = () => {
    const O = h.get(), B = v.get();
    if (B < O.length - 1) {
      const H = B + 1, W = O[H];
      W && (v.set(H), _(W, !1));
    }
  }, mt = Ge([v], (O) => O > 0), z = Ge(
    [h, v],
    (O, B) => B < O.length - 1
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
    sortedFiles: $,
    selectedItems: F,
    // Actions
    setPath: _,
    setFiles: g,
    setStorages: m,
    setSort: S,
    toggleSort: k,
    clearSort: C,
    setFilter: V,
    clearFilter: M,
    select: q,
    deselect: I,
    toggleSelect: te,
    selectAll: re,
    isSelected: N,
    clearSelection: ee,
    setSelection: ie,
    setSelectedCount: ue,
    setLoading: Y,
    isLoading: D,
    setClipboard: x,
    createIsCut: E,
    createIsCopied: T,
    isCut: U,
    isCopied: Q,
    clearClipboard: _e,
    getClipboard: fe,
    setDraggedItem: Ve,
    getDraggedItem: He,
    clearDraggedItem: Ze,
    setReadOnly: (O) => {
      t.set(O);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (O) => t.get() ? !0 : O.read_only ?? !1,
    // Navigation
    goBack: at,
    goForward: _t,
    canGoBack: mt,
    canGoForward: z,
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
class Pp extends on {
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
          const w = v.path.slice(f.length), $ = w.includes("/") ? w.slice(0, w.lastIndexOf("/")) : "", F = $ ? this.join(u.path, $) : u.path;
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
            const $ = f + v.slice(c.length);
            this.contentStore.set($, w);
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
class Kn extends on {
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
      ...Kn.DEFAULT_URLS,
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
    delete o["Content-Type"], e.use(Uo, {
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
class Tp extends on {
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
          const w = (await this.getDB()).transaction(["content"], "readwrite"), $ = w.objectStore("content"), F = $.get(c.path);
          F.onsuccess = () => {
            const _ = F.result;
            _ && ($.delete(c.path), $.put({ path: u, content: _.content }));
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
          const w = v.path.slice(f.length), $ = w.includes("/") ? w.slice(0, w.lastIndexOf("/")) : "", F = $ ? this.join(u.path, $) : u.path;
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
            const S = (await this.getDB()).transaction(["content"], "readwrite"), k = S.objectStore("content"), C = k.get(v.path);
            C.onsuccess = () => {
              const V = C.result;
              V && k.put({ path: g.path, content: V.content });
            }, await new Promise((V) => {
              S.oncomplete = () => V(void 0);
            });
          }
        }
      } else {
        const c = await this.uniqueName(r, d.basename, s), u = this.makeFileEntry(r, c, d.file_size || 0, d.mime_type);
        s.add(u.path), await this.upsert(u);
        const h = (await this.getDB()).transaction(["content"], "readwrite"), v = h.objectStore("content"), w = v.get(d.path);
        w.onsuccess = () => {
          const $ = w.result;
          $ && v.put({ path: u.path, content: $.content });
        }, await new Promise(($) => {
          h.oncomplete = () => $(void 0);
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
          const w = f + v.path.slice(c.length), $ = this.parent(w), F = this.cloneEntry(v, {
            path: w,
            dir: $,
            basename: v.path === c ? u : v.basename,
            last_modified: Date.now()
          });
          await this.upsert(F);
          const g = (await this.getDB()).transaction(["content"], "readwrite"), m = g.objectStore("content"), S = m.get(v.path);
          S.onsuccess = () => {
            const k = S.result;
            k && (m.delete(v.path), m.put({ path: w, content: k.content }));
          }, await new Promise((k) => {
            g.oncomplete = () => k(void 0);
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
        const v = (await this.getDB()).transaction(["content"], "readwrite"), w = v.objectStore("content"), $ = w.get(d.path);
        $.onsuccess = () => {
          const F = $.result;
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
            for (let $ = 0; $ < h.length; $++) v += String.fromCharCode(h[$]);
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
          v.objectStore("content").put({ path: u.path, content: f }), await new Promise(($) => {
            v.oncomplete = () => $(void 0);
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
class ts {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new Bo({
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
function ns(n) {
  const e = K(n.state);
  return {
    current: j(() => e.value.theme || "light"),
    set: (s) => {
      n.set("theme", s);
    }
  };
}
const os = (n, e) => {
  const t = Ko(n.id ?? "vf"), o = Lo(), s = e.i18n, l = n.locale ?? e.locale, d = Jo(n.id ?? "vf", n.config ?? {}), r = es();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new ts(n.driver);
  return Et({
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
    i18n: Wo(
      t,
      l,
      o,
      s
    ),
    // modal state
    modal: Xo(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Do(c),
    // active features
    features: Hn(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: j(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: j(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: d.get("metricUnits") ? jn : nn,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // expose custom uploader if provided
    customUploader: n.customUploader
  });
}, ss = ["data-theme"], is = { class: "vuefinder__modal-layout__container" }, as = { class: "vuefinder__modal-layout__content" }, rs = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, ls = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, ds = { class: "vuefinder__modal-drag-message" }, De = /* @__PURE__ */ J({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(n) {
    const e = P(null), t = Z();
    t.config;
    const o = n;
    ve(() => {
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
      i("div", is, [
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
            i("div", as, [
              Fe(l.$slots, "default")
            ]),
            l.$slots.buttons ? (p(), y("div", rs, [
              Fe(l.$slots, "buttons")
            ])) : A("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (p(), y("div", ls, [
        i("div", ds, b(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : A("", !0)
    ], 40, ss));
  }
}), cs = { class: "vuefinder__modal-header" }, us = { class: "vuefinder__modal-header__icon-container" }, fs = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Pe = /* @__PURE__ */ J({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (p(), y("div", cs, [
      i("div", us, [
        (p(), R(Rn(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      i("div", fs, b(n.title), 1)
    ]));
  }
}), vs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function ps(n, e) {
  return p(), y("svg", vs, [...e[0] || (e[0] = [
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
const qn = { render: ps }, hs = { class: "vuefinder__about-modal__content" }, _s = { class: "vuefinder__about-modal__main" }, ms = { class: "vuefinder__about-modal__tab-content" }, gs = { class: "vuefinder__about-modal__lead" }, ws = { class: "vuefinder__about-modal__description" }, ys = { class: "vuefinder__about-modal__links" }, bs = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, xs = { class: "vuefinder__about-modal__meta" }, ks = { class: "vuefinder__about-modal__meta-item" }, $s = { class: "vuefinder__about-modal__meta-label" }, Ss = { class: "vuefinder__about-modal__meta-value" }, Cs = { class: "vuefinder__about-modal__meta-item" }, Fs = { class: "vuefinder__about-modal__meta-label" }, Wn = /* @__PURE__ */ J({
  __name: "ModalAbout",
  setup(n) {
    const e = Z(), { t } = e.i18n;
    return (o, s) => (p(), R(De, null, {
      buttons: X(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: s[0] || (s[0] = (l) => a(e).modal.close())
        }, b(a(t)("Close")), 1)
      ]),
      default: X(() => [
        i("div", hs, [
          L(Pe, {
            icon: a(qn),
            title: "Vuefinder " + a(e).version
          }, null, 8, ["icon", "title"]),
          i("div", _s, [
            i("div", ms, [
              i("div", gs, b(a(t)("A modern, customizable file manager component built for Vue.")), 1),
              i("div", ws, b(a(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              i("div", ys, [
                i("a", bs, b(a(t)("Project Home")), 1),
                s[1] || (s[1] = i("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              i("div", xs, [
                i("div", ks, [
                  i("span", $s, b(a(t)("Version")), 1),
                  i("span", Ss, b(a(e).version), 1)
                ]),
                i("div", Cs, [
                  i("span", Fs, b(a(t)("License")), 1),
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
}), Ds = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Es(n, e) {
  return p(), y("svg", Ds, [...e[0] || (e[0] = [
    i("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Gn = { render: Es }, Ps = { class: "vuefinder__delete-modal__content" }, Ts = { class: "vuefinder__delete-modal__form" }, As = { class: "vuefinder__delete-modal__description" }, Ms = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Is = {
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
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = P(e.modal.data.items), d = P(""), r = () => {
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
    return (c, u) => (p(), R(De, null, {
      buttons: X(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          onClick: r
        }, b(a(t)("Yes, Delete!")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[1] || (u[1] = (f) => a(e).modal.close())
        }, b(a(t)("Cancel")), 1),
        i("div", Rs, b(a(t)("This action cannot be undone.")), 1)
      ]),
      default: X(() => [
        i("div", null, [
          L(Pe, {
            icon: a(Gn),
            title: a(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          i("div", Ps, [
            i("div", Ts, [
              i("p", As, b(a(t)("Are you sure you want to delete these files?")), 1),
              i("div", Ms, [
                (p(!0), y(ce, null, pe(l.value, (f) => (p(), y("p", {
                  key: f.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  f.type === "dir" ? (p(), y("svg", Is, [...u[2] || (u[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (p(), y("svg", Os, [...u[3] || (u[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Ls, b(f.basename), 1)
                ]))), 128))
              ]),
              d.value.length ? (p(), R(a(d), {
                key: 0,
                error: "",
                onHidden: u[0] || (u[0] = (f) => d.value = "")
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
}), Bs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Vs(n, e) {
  return p(), y("svg", Bs, [...e[0] || (e[0] = [
    i("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Yn = { render: Vs }, zs = { class: "vuefinder__rename-modal__content" }, Ns = { class: "vuefinder__rename-modal__item" }, Us = { class: "vuefinder__rename-modal__item-info" }, Hs = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, js = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ks = { class: "vuefinder__rename-modal__item-name" }, Mt = /* @__PURE__ */ J({
  __name: "ModalRename",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = P(e.modal.data.items[0]), d = P(l.value.basename), r = P(""), c = () => {
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
    return (u, f) => (p(), R(De, null, {
      buttons: X(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(a(t)("Rename")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[2] || (f[2] = (h) => a(e).modal.close())
        }, b(a(t)("Cancel")), 1)
      ]),
      default: X(() => [
        i("div", null, [
          L(Pe, {
            icon: a(Yn),
            title: a(t)("Rename")
          }, null, 8, ["icon", "title"]),
          i("div", zs, [
            i("div", Ns, [
              i("p", Us, [
                l.value.type === "dir" ? (p(), y("svg", Hs, [...f[3] || (f[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (p(), y("svg", js, [...f[4] || (f[4] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", Ks, b(l.value.basename), 1)
              ]),
              he(i("input", {
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
                default: X(() => [
                  se(b(r.value), 1)
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
  const n = Z(), e = j(() => n.features);
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
  setup(n, { emit: e }) {
    const t = e, o = P(""), s = P(""), l = P(null), d = P(!1), r = P(""), c = P(!1), u = Z(), { enabled: f } = Oe(), { t: h } = u.i18n;
    ve(async () => {
      try {
        const $ = await u.adapter.getContent({ path: u.modal.data.item.path });
        o.value = $.content, t("success");
      } catch ($) {
        console.error("Failed to load text content:", $), t("success");
      }
    });
    const v = () => {
      d.value = !d.value, s.value = o.value, u.modal.setEditMode(d.value);
    }, w = async () => {
      r.value = "", c.value = !1;
      try {
        const $ = u.modal.data.item.path;
        await u.adapter.save({
          path: $,
          content: s.value
        }), o.value = s.value, r.value = h("Updated."), t("success"), d.value = !d.value;
      } catch ($) {
        const F = $;
        r.value = h(F.message || "Error"), c.value = !0;
      }
    };
    return ($, F) => (p(), y("div", qs, [
      i("div", Ws, [
        i("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: a(u).modal.data.item.path
        }, b(a(u).modal.data.item.basename), 9, Gs),
        i("div", Ys, [
          d.value ? (p(), y("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: w
          }, b(a(h)("Save")), 1)) : A("", !0),
          a(f)("edit") ? (p(), y("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: F[0] || (F[0] = (_) => v())
          }, b(d.value ? a(h)("Cancel") : a(h)("Edit")), 1)) : A("", !0)
        ])
      ]),
      i("div", null, [
        d.value ? (p(), y("div", Xs, [
          he(i("textarea", {
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
        ])) : (p(), y("pre", Qs, b(o.value), 1)),
        r.value.length ? (p(), R(a(r), {
          key: 2,
          error: c.value,
          onHidden: F[2] || (F[2] = (_) => r.value = "")
        }, {
          default: X(() => [
            se(b(r.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : A("", !0)
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
}, we = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Qn(n) {
  const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = e.config, d = P({ QUEUE_ENTRY_STATUS: we }), r = P(null), c = P(null), u = P(null), f = P(null), h = P(null), v = P([]), w = P(""), $ = P(!1), F = P(!1), _ = P(null);
  let g;
  const m = (D) => {
    D.preventDefault(), D.stopPropagation(), F.value = !0;
  }, S = (D) => {
    D.preventDefault(), D.stopPropagation(), F.value = !0;
  }, k = (D) => {
    D.preventDefault(), D.stopPropagation(), (!D.relatedTarget || D.relatedTarget === document.body) && (F.value = !1);
  }, C = (D) => {
    D.preventDefault(), D.stopPropagation(), F.value = !1;
    const x = /^[/\\](.+)/, E = D.dataTransfer;
    E && (E.items && E.items.length ? Array.from(E.items).forEach((T) => {
      if (T.kind === "file") {
        const U = T.webkitGetAsEntry?.();
        if (U)
          sn((Q, _e) => {
            const fe = x.exec(Q?.fullPath || "");
            M(_e, fe ? fe[1] : _e.name);
          }, U);
        else {
          const Q = T.getAsFile?.();
          Q && M(Q);
        }
      }
    }) : E.files && E.files.length && Array.from(E.files).forEach((T) => M(T)));
  }, V = (D) => v.value.findIndex((x) => x.id === D), M = (D, x) => g.addFile({ name: x || D.name, type: D.type, data: D, source: "Local" }), q = (D) => D.status === we.DONE ? "text-green-600" : D.status === we.ERROR || D.status === we.CANCELED ? "text-red-600" : "", I = (D) => D.status === we.DONE ? "✓" : D.status === we.ERROR || D.status === we.CANCELED ? "!" : "...", N = () => f.value?.click(), te = () => e.modal.close(), re = (D) => {
    if ($.value || !v.value.filter((x) => x.status !== we.DONE).length) {
      $.value || (w.value = t("Please select file to upload first."));
      return;
    }
    w.value = "", _.value = D || s.value, g.upload();
  }, ee = () => {
    g.cancelAll(), v.value.forEach((D) => {
      D.status !== we.DONE && (D.status = we.CANCELED, D.statusName = t("Canceled"));
    }), $.value = !1;
  }, ie = (D) => {
    $.value || (g.removeFile(D.id), v.value.splice(V(D.id), 1));
  }, ue = (D) => {
    if (!$.value)
      if (g.cancelAll(), D) {
        const x = v.value.filter((E) => E.status !== we.DONE);
        v.value = [], x.forEach((E) => M(E.originalFile, E.name));
      } else
        v.value = [];
  }, Y = (D) => {
    D.forEach((x) => {
      M(x);
    });
  };
  return ve(() => {
    g = new Vo({
      debug: e.debug,
      restrictions: { maxFileSize: Qo(l.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (T, U) => {
        if (U[T.id] != null) {
          const _e = V(T.id);
          v.value[_e]?.status === we.PENDING && (w.value = g.i18n("noDuplicates", { fileName: T.name })), v.value = v.value.filter((fe) => fe.id !== T.id);
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
    g.on("restriction-failed", (T, U) => {
      const Q = v.value[V(T.id)];
      Q && ie(Q), w.value = U.message;
    }), g.on("upload-progress", (T, U) => {
      const Q = U.bytesTotal ?? 1, _e = Math.floor(U.bytesUploaded / Q * 100), fe = V(T.id);
      fe !== -1 && v.value[fe] && (v.value[fe].percent = `${_e}%`);
    }), g.on("upload-success", (T) => {
      const U = v.value[V(T.id)];
      U && (U.status = we.DONE, U.statusName = t("Done"));
    }), g.on("upload-error", (T, U) => {
      const Q = v.value[V(T.id)];
      Q && (Q.percent = null, Q.status = we.ERROR, Q.statusName = U?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : U?.message || t("Unknown Error"));
    }), g.on("error", (T) => {
      w.value = T.message, $.value = !1, e.adapter.open(s.value.path);
    }), g.on("complete", () => {
      $.value = !1;
      const T = _.value || s.value;
      e.adapter.invalidateListQuery(T.path), e.adapter.open(T.path);
      const U = v.value.filter((Q) => Q.status === we.DONE).map((Q) => Q.name);
      e.emitter.emit("vf-upload-complete", U);
    }), f.value?.addEventListener("click", () => c.value?.click()), h.value?.addEventListener("click", () => u.value?.click());
    const x = { capture: !0 };
    document.addEventListener("dragover", m, x), document.addEventListener("dragenter", S, x), document.addEventListener("dragleave", k, x), document.addEventListener("drop", C, x);
    const E = (T) => {
      const U = T.target, Q = U.files;
      if (Q) {
        for (const _e of Q) M(_e);
        U.value = "";
      }
    };
    c.value?.addEventListener("change", E), u.value?.addEventListener("change", E);
  }), xe(() => {
    const D = { capture: !0 };
    document.removeEventListener("dragover", m, D), document.removeEventListener("dragenter", S, D), document.removeEventListener("dragleave", k, D), document.removeEventListener("drop", C, D);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: u,
    pickFiles: f,
    pickFolders: h,
    queue: v,
    message: w,
    uploading: $,
    hasFilesInDropArea: F,
    definitions: d,
    openFileSelector: N,
    upload: re,
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
  setup(n, { emit: e }) {
    const t = e, o = Z(), { enabled: s } = Oe(), { t: l } = o.i18n, d = P(!1), r = P(""), c = P(!1), u = P(o.adapter.getPreviewUrl({ path: o.modal.data.item.path })), f = P(u.value), { addExternalFiles: h, upload: v, queue: w } = Qn(o.customUploader), $ = o.fs, F = K($.path), _ = je("cropperRef"), g = async () => {
      d.value = !d.value, o.modal.setEditMode(d.value);
    }, m = async () => {
      const k = _.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!k) return;
      let C = k;
      if (k.width > 1200 || k.height > 1200) {
        const N = Math.min(1200 / k.width, 1200 / k.height), te = document.createElement("canvas");
        te.width = Math.floor(k.width * N), te.height = Math.floor(k.height * N);
        const re = te.getContext("2d");
        re && (re.drawImage(k, 0, 0, te.width, te.height), C = te);
      }
      const V = o.modal.data.item.basename, M = V.split(".").pop()?.toLowerCase() || "jpg", q = M === "png" ? "image/png" : M === "gif" ? "image/gif" : "image/jpeg", I = await new Promise((N) => {
        C.toBlob((te) => N(te), q);
      });
      if (!I) {
        r.value = l("Failed to save image"), c.value = !0;
        return;
      }
      r.value = "", c.value = !1;
      try {
        const N = new File([I], V, { type: q }), re = o.modal.data.item.path.split("/");
        re.pop();
        const ie = {
          path: re.join("/") || (F.value?.path ?? "")
        };
        h([N]), await new Promise((x) => setTimeout(x, 100));
        const ue = w.value.find((x) => x.name === N.name);
        if (!ue)
          throw new Error("File was not added to upload queue");
        v(ie);
        let Y = 0;
        for (; Y < 150; ) {
          await new Promise((E) => setTimeout(E, 200));
          const x = w.value.find((E) => E.id === ue.id);
          if (x?.status === we.DONE) break;
          if (x?.status === we.ERROR)
            throw new Error(x.statusName || "Upload failed");
          Y++;
        }
        r.value = l("Updated."), await fetch(u.value, { cache: "reload", mode: "no-cors" });
        const D = o.root?.querySelector?.('[data-src="' + u.value + '"]');
        D && D instanceof HTMLElement && Nn.resetStatus(D), o.emitter.emit("vf-refresh-thumbnails"), await g(), t("success");
      } catch (N) {
        const te = N?.message ?? "Error";
        r.value = l(te), c.value = !0;
      }
    };
    return ve(() => {
      t("success");
    }), (S, k) => (p(), y("div", Zs, [
      i("div", ei, [
        i("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: a(o).modal.data.item.path
        }, b(a(o).modal.data.item.basename), 9, ti),
        i("div", ni, [
          d.value ? (p(), y("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: m
          }, b(a(l)("Crop")), 1)) : A("", !0),
          a(s)("edit") ? (p(), y("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: k[0] || (k[0] = (C) => g())
          }, b(d.value ? a(l)("Cancel") : a(l)("Edit")), 1)) : A("", !0)
        ])
      ]),
      i("div", oi, [
        d.value ? (p(), R(a(zo), {
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
        }, null, 8, si))
      ]),
      r.value.length ? (p(), R(a(r), {
        key: 0,
        error: c.value,
        onHidden: k[1] || (k[1] = (C) => r.value = "")
      }, {
        default: X(() => [
          se(b(r.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : A("", !0)
    ]));
  }
}), ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ri(n, e) {
  return p(), y("svg", ai, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const yt = { render: ri }, li = { class: "vuefinder__default-preview" }, di = { class: "vuefinder__default-preview__content" }, ci = { class: "vuefinder__default-preview__header" }, ui = ["title"], fi = { class: "vuefinder__default-preview__icon-container" }, vi = ["title"], pi = /* @__PURE__ */ J({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Z(), o = e;
    return ve(() => {
      o("success");
    }), (s, l) => (p(), y("div", li, [
      i("div", di, [
        i("div", ci, [
          i("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: a(t).modal.data.item.path
          }, b(a(t).modal.data.item.basename), 9, ui)
        ]),
        i("div", fi, [
          L(a(yt), { class: "vuefinder__default-preview__file-icon" }),
          i("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: a(t).modal.data.item.path
          }, b(a(t).modal.data.item.basename), 9, vi)
        ])
      ])
    ]));
  }
}), hi = { class: "vuefinder__video-preview" }, _i = ["title"], mi = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, gi = ["src"], wi = /* @__PURE__ */ J({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Z(), o = e, s = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return ve(() => {
      o("success");
    }), (l, d) => (p(), y("div", hi, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: a(t).modal.data.item.path
      }, b(a(t).modal.data.item.basename), 9, _i),
      i("div", null, [
        i("video", mi, [
          i("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, gi),
          d[0] || (d[0] = se(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), yi = { class: "vuefinder__audio-preview" }, bi = ["title"], xi = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, ki = ["src"], $i = /* @__PURE__ */ J({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = Z(), s = () => {
      const l = Z();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ve(() => {
      t("success");
    }), (l, d) => (p(), y("div", yi, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: a(o).modal.data.item.path
      }, b(a(o).modal.data.item.basename), 9, bi),
      i("div", null, [
        i("audio", xi, [
          i("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, ki),
          d[0] || (d[0] = se(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Si = { class: "vuefinder__pdf-preview" }, Ci = ["title"], Fi = ["data"], Di = ["src"], Ei = /* @__PURE__ */ J({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Z(), o = e, s = () => {
      const l = Z();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ve(() => {
      o("success");
    }), (l, d) => (p(), y("div", Si, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: a(t).modal.data.item.path
      }, b(a(t).modal.data.item.basename), 9, Ci),
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
          }, " Your browser does not support PDFs ", 8, Di)
        ], 8, Fi)
      ])
    ]));
  }
});
function Pi(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Ti = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Ai = ["disabled", "title"], Mi = ["disabled", "title"], Ii = { class: "vuefinder__preview-modal__content" }, Oi = { key: 0 }, Li = { class: "vuefinder__preview-modal__loading" }, Ri = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Bi = { class: "vuefinder__preview-modal__details" }, Vi = { class: "font-bold" }, zi = { class: "pl-2 font-bold" }, Ni = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Ui = ["download", "href"], It = /* @__PURE__ */ J({
  __name: "ModalPreview",
  setup(n) {
    const e = Z(), { enabled: t } = Oe(), { t: o } = e.i18n, s = P(!1), l = (_) => (e.modal.data.item.mime_type ?? "").startsWith(_), d = t("preview");
    d || (s.value = !0);
    const r = j(() => e.modal.data.item), c = K(e.fs.sortedFiles), u = j(() => c.value.filter((_) => _.type === "file")), f = j(
      () => u.value.findIndex((_) => _.path === r.value.path)
    ), h = j(() => f.value > 0), v = j(() => f.value < u.value.length - 1), w = () => {
      if (e.modal.editMode || !h.value) return;
      const _ = u.value[f.value - 1];
      _ && (e.fs.clearSelection(), e.fs.select(_.path), e.modal.data.item = _);
    }, $ = () => {
      if (e.modal.editMode || !v.value) return;
      const _ = u.value[f.value + 1];
      _ && (e.fs.clearSelection(), e.fs.select(_.path), e.modal.data.item = _);
    }, F = (_) => {
      if (_.key === "Escape") {
        _.preventDefault(), _.stopPropagation(), e.modal.close();
        return;
      }
      (_.key === "ArrowLeft" || _.key === "ArrowRight") && (_.preventDefault(), _.stopPropagation(), _.key === "ArrowLeft" ? w() : $());
    };
    return ve(() => {
      const _ = document.querySelector(".vuefinder__preview-modal");
      _ && _.focus();
    }), (_, g) => (p(), R(De, null, {
      buttons: X(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[6] || (g[6] = (m) => a(e).modal.close())
        }, b(a(o)("Close")), 1),
        a(t)("download") ? (p(), y("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: a(e).adapter.getDownloadUrl({ path: a(e).modal.data.item.path }),
          href: a(e).adapter.getDownloadUrl({ path: a(e).modal.data.item.path })
        }, b(a(o)("Download")), 9, Ui)) : A("", !0)
      ]),
      default: X(() => [
        i("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: F
        }, [
          a(e).modal.editMode ? A("", !0) : (p(), y("div", Ti, [
            i("button", {
              disabled: !h.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: a(o)("Previous file"),
              onClick: w
            }, [...g[7] || (g[7] = [
              i("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, Ai),
            i("button", {
              disabled: !v.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: a(o)("Next file"),
              onClick: $
            }, [...g[8] || (g[8] = [
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
          i("div", Ii, [
            a(d) ? (p(), y("div", Oi, [
              l("text") ? (p(), R(Js, {
                key: `text-${r.value.path}`,
                onSuccess: g[0] || (g[0] = (m) => s.value = !0)
              })) : l("image") ? (p(), R(ii, {
                key: `image-${r.value.path}`,
                onSuccess: g[1] || (g[1] = (m) => s.value = !0)
              })) : l("video") ? (p(), R(wi, {
                key: `video-${r.value.path}`,
                onSuccess: g[2] || (g[2] = (m) => s.value = !0)
              })) : l("audio") ? (p(), R($i, {
                key: `audio-${r.value.path}`,
                onSuccess: g[3] || (g[3] = (m) => s.value = !0)
              })) : l("application/pdf") ? (p(), R(Ei, {
                key: `pdf-${r.value.path}`,
                onSuccess: g[4] || (g[4] = (m) => s.value = !0)
              })) : (p(), R(pi, {
                key: `default-${r.value.path}`,
                onSuccess: g[5] || (g[5] = (m) => s.value = !0)
              }))
            ])) : A("", !0),
            i("div", Li, [
              s.value === !1 ? (p(), y("div", Ri, [
                g[9] || (g[9] = i("svg", {
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
                i("span", null, b(a(o)("Loading")), 1)
              ])) : A("", !0)
            ])
          ])
        ], 32),
        i("div", Bi, [
          i("div", null, [
            i("span", Vi, b(a(o)("File Size")) + ": ", 1),
            se(b(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          i("div", null, [
            i("span", zi, b(a(o)("Last Modified")) + ": ", 1),
            se(" " + b(a(Pi)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(t)("download") ? (p(), y("div", Ni, [
          i("span", null, b(a(o)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : A("", !0)
      ]),
      _: 1
    }));
  }
}), Hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function ji(n, e) {
  return p(), y("svg", Hi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Ki = { render: ji }, qi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Wi(n, e) {
  return p(), y("svg", qi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ue = { render: Wi }, Gi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Yi(n, e) {
  return p(), y("svg", Gi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 5v14M5 12h14" }, null, -1)
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
function Xi(n, e) {
  return p(), y("svg", Qi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M5 12h14" }, null, -1)
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
function Zi(n, e) {
  return p(), y("svg", Ji, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const an = { render: Zi }, ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ta(n, e) {
  return p(), y("svg", ea, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const rn = { render: ta }, na = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function oa(n, e) {
  return p(), y("svg", na, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const ln = { render: oa }, sa = { class: "vuefinder__modal-tree__folder-item" }, ia = { class: "vuefinder__modal-tree__folder-content" }, aa = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, ra = { class: "vuefinder__modal-tree__folder-text" }, la = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, da = 300, ca = /* @__PURE__ */ J({
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
    }, $ = () => {
      d("update:modelValue", l.folder), d("selectAndClose", l.folder);
    };
    let F = 0;
    const _ = () => {
      const g = Date.now();
      g - F < da ? $() : w(), F = g;
    };
    return (g, m) => {
      const S = Bn("ModalTreeFolderItem", !0);
      return p(), y("div", sa, [
        i("div", ia, [
          h.value ? (p(), y("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: v
          }, [
            r.value ? (p(), R(a(Lt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (p(), R(a(Ot), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (p(), y("div", aa)),
          i("div", {
            class: G(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": c.value,
              "vuefinder__modal-tree__folder-link--current": u.value
            }]),
            onClick: w,
            onDblclick: $,
            onTouchend: _
          }, [
            r.value ? (p(), R(a(ln), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (p(), R(a(Ue), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            i("span", ra, b(n.folder.basename), 1)
          ], 34)
        ]),
        r.value && h.value ? (p(), y("div", la, [
          (p(!0), y(ce, null, pe(f.value, (k) => (p(), R(S, {
            key: k.path,
            folder: k,
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
}), ua = { class: "vuefinder__modal-tree" }, fa = { class: "vuefinder__modal-tree__header" }, va = { class: "vuefinder__modal-tree__title" }, pa = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, ha = { class: "vuefinder__modal-tree__section-title" }, _a = { class: "vuefinder__modal-tree__list" }, ma = ["onClick", "onDblclick", "onTouchend"], ga = { class: "vuefinder__modal-tree__text" }, wa = { class: "vuefinder__modal-tree__text-storage" }, ya = { class: "vuefinder__modal-tree__section-title" }, ba = { class: "vuefinder__modal-tree__list" }, xa = { class: "vuefinder__modal-tree__storage-item" }, ka = { class: "vuefinder__modal-tree__storage-content" }, $a = ["onClick"], Sa = ["onClick", "onDblclick", "onTouchend"], Ca = { class: "vuefinder__modal-tree__storage-text" }, Fa = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, xn = 300, dn = /* @__PURE__ */ J({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = Z(), { t: o } = t.i18n, s = t.fs, l = t.config, d = e, r = K(s.sortedFiles), c = K(s.storages), u = j(() => c.value || []), f = K(s.path), h = P(null), v = P({}), w = P({});
    le(r, (M) => {
      const q = M.filter((N) => N.type === "dir"), I = f.value?.path || "";
      I && (w.value[I] = q.map((N) => ({
        ...N,
        type: "dir"
      })));
    });
    const $ = (M, q) => {
      const I = `${M}:${q}`;
      v.value = {
        ...v.value,
        [I]: !v.value[I]
      }, v.value[I] && !w.value[q] && t.adapter.list(q).then((N) => {
        const re = (N.files || []).filter((ee) => ee.type === "dir");
        w.value[q] = re.map((ee) => ({
          ...ee,
          type: "dir"
        }));
      });
    }, F = (M) => w.value[M] || [], _ = (M) => {
      M && d("update:modelValue", M);
    }, g = (M) => {
      M && (d("update:modelValue", M), d("selectAndClose", M));
    }, m = (M) => {
      const q = {
        storage: M,
        path: M + "://",
        basename: M,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: M + "://"
      };
      d("update:modelValue", q);
    }, S = (M) => {
      const q = {
        storage: M,
        path: M + "://",
        basename: M,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: M + "://"
      };
      d("update:modelValue", q), d("selectAndClose", q);
    };
    let k = 0;
    const C = (M) => {
      if (!M) return;
      const q = Date.now();
      q - k < xn ? g(M) : _(M), k = q;
    }, V = (M) => {
      const q = Date.now();
      q - k < xn ? S(M) : m(M), k = q;
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
    }), (M, q) => (p(), y("div", ua, [
      i("div", fa, [
        i("div", va, b(a(o)("Select Target Folder")), 1)
      ]),
      i("div", {
        ref_key: "modalContentElement",
        ref: h,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && a(t).features.pinned && a(l).get("pinnedFolders").length ? (p(), y("div", pa, [
          i("div", ha, b(a(o)("Pinned Folders")), 1),
          i("div", _a, [
            (p(!0), y(ce, null, pe(a(l).get("pinnedFolders"), (I) => (p(), y("div", {
              key: I.path,
              class: G(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === I.path }]),
              onClick: (N) => _(I),
              onDblclick: (N) => g(I),
              onTouchend: (N) => C(I)
            }, [
              L(a(Ue), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              i("div", ga, b(I.basename), 1),
              i("div", wa, b(I.storage), 1),
              L(a(an), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, ma))), 128))
          ])
        ])) : A("", !0),
        i("div", ya, b(a(o)("Storages")), 1),
        (p(!0), y(ce, null, pe(u.value, (I) => (p(), y("div", {
          key: I,
          class: "vuefinder__modal-tree__section"
        }, [
          i("div", ba, [
            i("div", xa, [
              i("div", ka, [
                i("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: de((N) => $(I, I + "://"), ["stop"])
                }, [
                  v.value[`${I}:${I}://`] ? (p(), R(a(Lt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (p(), R(a(Ot), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, $a),
                i("div", {
                  class: G(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === I + "://"
                  }]),
                  onClick: (N) => m(I),
                  onDblclick: (N) => S(I),
                  onTouchend: (N) => V(I)
                }, [
                  L(a(rn), { class: "vuefinder__modal-tree__storage-icon" }),
                  i("span", Ca, b(I), 1)
                ], 42, Sa)
              ]),
              v.value[`${I}:${I}://`] ? (p(), y("div", Fa, [
                (p(!0), y(ce, null, pe(F(I + "://"), (N) => (p(), R(ca, {
                  key: N.path,
                  folder: N,
                  storage: I,
                  "model-value": n.modelValue,
                  "expanded-folders": v.value,
                  "modal-tree-data": w.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": _,
                  onSelectAndClose: g,
                  onToggleFolder: $
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
              ])) : A("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Da = { class: "vuefinder__move-modal__content" }, Ea = { class: "vuefinder__move-modal__description" }, Pa = { class: "vuefinder__move-modal__files vf-scrollbar" }, Ta = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Aa = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ma = { class: "vuefinder__move-modal__file-name" }, Ia = { class: "vuefinder__move-modal__target-title" }, Oa = { class: "vuefinder__move-modal__target-container" }, La = { class: "vuefinder__move-modal__target-path" }, Ra = { class: "vuefinder__move-modal__target-storage" }, Ba = {
  key: 0,
  class: "vuefinder__move-modal__Destination-folder"
}, Va = { class: "vuefinder__move-modal__target-badge" }, za = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, Na = { class: "vuefinder__move-modal__checkbox-label" }, Ua = { class: "vuefinder__move-modal__checkbox-text" }, Ha = { class: "vuefinder__move-modal__selected-items" }, Xn = /* @__PURE__ */ J({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = Z(), { enabled: t } = Oe(), { t: o } = e.i18n, s = n, l = P(e.modal.data.items.from), d = P(e.modal.data.items.to), r = P(""), c = P(s.copy || !t("move")), u = j(() => c.value ? "copy" : "move"), f = P(!1), h = K(e.fs.path), v = j(() => c.value ? o("Copy files") : o("Move files")), w = j(
      () => c.value ? o("Are you sure you want to copy these files?") : o("Are you sure you want to move these files?")
    ), $ = j(() => c.value ? o("Yes, Copy!") : o("Yes, Move!"));
    j(() => c.value ? o("Files copied.") : o("Files moved."));
    const F = (S) => {
      S && (d.value = S);
    }, _ = (S) => {
      S && (d.value = S, f.value = !1);
    }, g = () => {
      const S = d.value.path;
      if (!S) return { storage: "local", path: "" };
      if (S.endsWith("://"))
        return { storage: S.replace("://", ""), path: "" };
      const k = S.split("://");
      return {
        storage: k[0] || "local",
        path: k[1] || ""
      };
    }, m = async () => {
      if (l.value.length) {
        const { files: S } = await e.adapter[u.value]({
          path: h.value.path,
          sources: l.value.map(({ path: k }) => k),
          destination: d.value.path
        });
        e.fs.setFiles(S), e.modal.close();
      }
    };
    return (S, k) => (p(), R(De, null, {
      buttons: X(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: m
        }, b($.value), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[4] || (k[4] = (C) => a(e).modal.close())
        }, b(a(o)("Cancel")), 1),
        i("div", Ha, b(a(o)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: X(() => [
        i("div", null, [
          L(Pe, {
            icon: a(Ki),
            title: v.value
          }, null, 8, ["icon", "title"]),
          i("div", Da, [
            i("p", Ea, b(w.value), 1),
            i("div", Pa, [
              (p(!0), y(ce, null, pe(l.value, (C) => (p(), y("div", {
                key: C.path,
                class: "vuefinder__move-modal__file"
              }, [
                i("div", null, [
                  C.type === "dir" ? (p(), y("svg", Ta, [...k[5] || (k[5] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (p(), y("svg", Aa, [...k[6] || (k[6] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                i("div", Ma, b(C.path), 1)
              ]))), 128))
            ]),
            i("h4", Ia, b(a(o)("Target Directory")), 1),
            i("div", Oa, [
              i("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: k[0] || (k[0] = (C) => f.value = !f.value)
              }, [
                i("div", La, [
                  i("span", Ra, b(g().storage) + "://", 1),
                  g().path ? (p(), y("span", Ba, b(g().path), 1)) : A("", !0)
                ]),
                i("span", Va, b(a(o)("Browse")), 1)
              ])
            ]),
            i("div", {
              class: G([
                "vuefinder__move-modal__tree-selector",
                f.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              L(dn, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  k[1] || (k[1] = (C) => d.value = C),
                  F
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: _
              }, null, 8, ["modelValue"])
            ], 2),
            a(t)("copy") && a(t)("move") ? (p(), y("div", za, [
              i("label", Na, [
                he(i("input", {
                  "onUpdate:modelValue": k[2] || (k[2] = (C) => c.value = C),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [en, c.value]
                ]),
                i("span", Ua, b(a(o)("Create a copy instead of moving")), 1)
              ])
            ])) : A("", !0),
            r.value.length ? (p(), R(a(r), {
              key: 1,
              error: "",
              onHidden: k[3] || (k[3] = (C) => r.value = "")
            }, {
              default: X(() => [
                se(b(r.value), 1)
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
  setup(n) {
    return (e, t) => (p(), R(Xn, { copy: !1 }));
  }
}), cn = /* @__PURE__ */ J({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (p(), R(Xn, { copy: !0 }));
  }
}), ja = (n, e = 0, t = !1) => {
  let o;
  return (...s) => {
    t && !o && n(...s), clearTimeout(o), o = setTimeout(() => {
      n(...s);
    }, e);
  };
}, Jn = (n, e, t) => {
  const o = P(n);
  return Eo((s, l) => ({
    get() {
      return s(), o.value;
    },
    set: ja(
      (d) => {
        o.value = d, l();
      },
      e,
      !1
    )
  }));
}, Ka = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function qa(n, e) {
  return p(), y("svg", Ka, [...e[0] || (e[0] = [
    i("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const un = { render: qa }, Wa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Ga(n, e) {
  return p(), y("svg", Wa, [...e[0] || (e[0] = [
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
const Rt = { render: Ga }, Ya = { class: "vuefinder__search-modal__search-input" }, Qa = ["value", "placeholder", "disabled"], Xa = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Ja = /* @__PURE__ */ J({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = t, s = Z(), { t: l } = s.i18n, d = P(null), r = (u) => {
      const f = u.target;
      o("update:modelValue", f.value);
    }, c = (u) => {
      o("keydown", u);
    };
    return e({
      focus: () => {
        d.value && d.value.focus();
      }
    }), (u, f) => (p(), y("div", Ya, [
      L(a(un), { class: "vuefinder__search-modal__search-icon" }),
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
      }, null, 40, Qa),
      n.isSearching ? (p(), y("div", Xa, [
        L(a(Rt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : A("", !0)
    ]));
  }
}), bt = Math.min, Qe = Math.max, xt = Math.round, gt = Math.floor, Le = (n) => ({
  x: n,
  y: n
}), Za = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, er = {
  start: "end",
  end: "start"
};
function kn(n, e, t) {
  return Qe(n, bt(e, t));
}
function Bt(n, e) {
  return typeof n == "function" ? n(e) : n;
}
function Xe(n) {
  return n.split("-")[0];
}
function Vt(n) {
  return n.split("-")[1];
}
function Zn(n) {
  return n === "x" ? "y" : "x";
}
function eo(n) {
  return n === "y" ? "height" : "width";
}
const tr = /* @__PURE__ */ new Set(["top", "bottom"]);
function qe(n) {
  return tr.has(Xe(n)) ? "y" : "x";
}
function to(n) {
  return Zn(qe(n));
}
function nr(n, e, t) {
  t === void 0 && (t = !1);
  const o = Vt(n), s = to(n), l = eo(s);
  let d = s === "x" ? o === (t ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[l] > e.floating[l] && (d = kt(d)), [d, kt(d)];
}
function or(n) {
  const e = kt(n);
  return [Xt(n), e, Xt(e)];
}
function Xt(n) {
  return n.replace(/start|end/g, (e) => er[e]);
}
const $n = ["left", "right"], Sn = ["right", "left"], sr = ["top", "bottom"], ir = ["bottom", "top"];
function ar(n, e, t) {
  switch (n) {
    case "top":
    case "bottom":
      return t ? e ? Sn : $n : e ? $n : Sn;
    case "left":
    case "right":
      return e ? sr : ir;
    default:
      return [];
  }
}
function rr(n, e, t, o) {
  const s = Vt(n);
  let l = ar(Xe(n), t === "start", o);
  return s && (l = l.map((d) => d + "-" + s), e && (l = l.concat(l.map(Xt)))), l;
}
function kt(n) {
  return n.replace(/left|right|bottom|top/g, (e) => Za[e]);
}
function lr(n) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...n
  };
}
function dr(n) {
  return typeof n != "number" ? lr(n) : {
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
  const l = qe(e), d = to(e), r = eo(d), c = Xe(e), u = l === "y", f = o.x + o.width / 2 - s.width / 2, h = o.y + o.height / 2 - s.height / 2, v = o[r] / 2 - s[r] / 2;
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
  switch (Vt(e)) {
    case "start":
      w[d] -= v * (t && u ? -1 : 1);
      break;
    case "end":
      w[d] += v * (t && u ? -1 : 1);
      break;
  }
  return w;
}
const cr = async (n, e, t) => {
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
  } = Cn(u, o, c), v = o, w = {}, $ = 0;
  for (let F = 0; F < r.length; F++) {
    const {
      name: _,
      fn: g
    } = r[F], {
      x: m,
      y: S,
      data: k,
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
    f = m ?? f, h = S ?? h, w = {
      ...w,
      [_]: {
        ...w[_],
        ...k
      }
    }, C && $ <= 50 && ($++, typeof C == "object" && (C.placement && (v = C.placement), C.rects && (u = C.rects === !0 ? await d.getElementRects({
      reference: n,
      floating: e,
      strategy: s
    }) : C.rects), {
      x: f,
      y: h
    } = Cn(u, v, c)), F = -1);
  }
  return {
    x: f,
    y: h,
    placement: v,
    strategy: s,
    middlewareData: w
  };
};
async function no(n, e) {
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
  } = Bt(e, n), $ = dr(w), _ = r[v ? h === "floating" ? "reference" : "floating" : h], g = $t(await l.getClippingRect({
    element: (t = await (l.isElement == null ? void 0 : l.isElement(_))) == null || t ? _ : _.contextElement || await (l.getDocumentElement == null ? void 0 : l.getDocumentElement(r.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: c
  })), m = h === "floating" ? {
    x: o,
    y: s,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, S = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(r.floating)), k = await (l.isElement == null ? void 0 : l.isElement(S)) ? await (l.getScale == null ? void 0 : l.getScale(S)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, C = $t(l.convertOffsetParentRelativeRectToViewportRelativeRect ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: r,
    rect: m,
    offsetParent: S,
    strategy: c
  }) : m);
  return {
    top: (g.top - C.top + $.top) / k.y,
    bottom: (C.bottom - g.bottom + $.bottom) / k.y,
    left: (g.left - C.left + $.left) / k.x,
    right: (C.right - g.right + $.right) / k.x
  };
}
const ur = function(n) {
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
        fallbackAxisSideDirection: $ = "none",
        flipAlignment: F = !0,
        ..._
      } = Bt(n, e);
      if ((t = l.arrow) != null && t.alignmentOffset)
        return {};
      const g = Xe(s), m = qe(r), S = Xe(r) === r, k = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), C = v || (S || !F ? [kt(r)] : or(r)), V = $ !== "none";
      !v && V && C.push(...rr(r, F, $, k));
      const M = [r, ...C], q = await no(e, _), I = [];
      let N = ((o = l.flip) == null ? void 0 : o.overflows) || [];
      if (f && I.push(q[g]), h) {
        const ie = nr(s, d, k);
        I.push(q[ie[0]], q[ie[1]]);
      }
      if (N = [...N, {
        placement: s,
        overflows: I
      }], !I.every((ie) => ie <= 0)) {
        var te, re;
        const ie = (((te = l.flip) == null ? void 0 : te.index) || 0) + 1, ue = M[ie];
        if (ue && (!(h === "alignment" ? m !== qe(ue) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        N.every((x) => qe(x.placement) === m ? x.overflows[0] > 0 : !0)))
          return {
            data: {
              index: ie,
              overflows: N
            },
            reset: {
              placement: ue
            }
          };
        let Y = (re = N.filter((D) => D.overflows[0] <= 0).sort((D, x) => D.overflows[1] - x.overflows[1])[0]) == null ? void 0 : re.placement;
        if (!Y)
          switch (w) {
            case "bestFit": {
              var ee;
              const D = (ee = N.filter((x) => {
                if (V) {
                  const E = qe(x.placement);
                  return E === m || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  E === "y";
                }
                return !0;
              }).map((x) => [x.placement, x.overflows.filter((E) => E > 0).reduce((E, T) => E + T, 0)]).sort((x, E) => x[1] - E[1])[0]) == null ? void 0 : ee[0];
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
}, fr = /* @__PURE__ */ new Set(["left", "top"]);
async function vr(n, e) {
  const {
    placement: t,
    platform: o,
    elements: s
  } = n, l = await (o.isRTL == null ? void 0 : o.isRTL(s.floating)), d = Xe(t), r = Vt(t), c = qe(t) === "y", u = fr.has(d) ? -1 : 1, f = l && c ? -1 : 1, h = Bt(e, n);
  let {
    mainAxis: v,
    crossAxis: w,
    alignmentAxis: $
  } = typeof h == "number" ? {
    mainAxis: h,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: h.mainAxis || 0,
    crossAxis: h.crossAxis || 0,
    alignmentAxis: h.alignmentAxis
  };
  return r && typeof $ == "number" && (w = r === "end" ? $ * -1 : $), c ? {
    x: w * f,
    y: v * u
  } : {
    x: v * u,
    y: w * f
  };
}
const pr = function(n) {
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
      } = e, c = await vr(e, n);
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
}, hr = function(n) {
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
      } = Bt(n, e), u = {
        x: t,
        y: o
      }, f = await no(e, c), h = qe(Xe(s)), v = Zn(h);
      let w = u[v], $ = u[h];
      if (l) {
        const _ = v === "y" ? "top" : "left", g = v === "y" ? "bottom" : "right", m = w + f[_], S = w - f[g];
        w = kn(m, w, S);
      }
      if (d) {
        const _ = h === "y" ? "top" : "left", g = h === "y" ? "bottom" : "right", m = $ + f[_], S = $ - f[g];
        $ = kn(m, $, S);
      }
      const F = r.fn({
        ...e,
        [v]: w,
        [h]: $
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
function zt() {
  return typeof window < "u";
}
function it(n) {
  return oo(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function Ce(n) {
  var e;
  return (n == null || (e = n.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Be(n) {
  var e;
  return (e = (oo(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : e.documentElement;
}
function oo(n) {
  return zt() ? n instanceof Node || n instanceof Ce(n).Node : !1;
}
function Me(n) {
  return zt() ? n instanceof Element || n instanceof Ce(n).Element : !1;
}
function Re(n) {
  return zt() ? n instanceof HTMLElement || n instanceof Ce(n).HTMLElement : !1;
}
function Fn(n) {
  return !zt() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof Ce(n).ShadowRoot;
}
const _r = /* @__PURE__ */ new Set(["inline", "contents"]);
function pt(n) {
  const {
    overflow: e,
    overflowX: t,
    overflowY: o,
    display: s
  } = Ie(n);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + t) && !_r.has(s);
}
const mr = /* @__PURE__ */ new Set(["table", "td", "th"]);
function gr(n) {
  return mr.has(it(n));
}
const wr = [":popover-open", ":modal"];
function Nt(n) {
  return wr.some((e) => {
    try {
      return n.matches(e);
    } catch {
      return !1;
    }
  });
}
const yr = ["transform", "translate", "scale", "rotate", "perspective"], br = ["transform", "translate", "scale", "rotate", "perspective", "filter"], xr = ["paint", "layout", "strict", "content"];
function fn(n) {
  const e = vn(), t = Me(n) ? Ie(n) : n;
  return yr.some((o) => t[o] ? t[o] !== "none" : !1) || (t.containerType ? t.containerType !== "normal" : !1) || !e && (t.backdropFilter ? t.backdropFilter !== "none" : !1) || !e && (t.filter ? t.filter !== "none" : !1) || br.some((o) => (t.willChange || "").includes(o)) || xr.some((o) => (t.contain || "").includes(o));
}
function kr(n) {
  let e = We(n);
  for (; Re(e) && !st(e); ) {
    if (fn(e))
      return e;
    if (Nt(e))
      return null;
    e = We(e);
  }
  return null;
}
function vn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const $r = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function st(n) {
  return $r.has(it(n));
}
function Ie(n) {
  return Ce(n).getComputedStyle(n);
}
function Ut(n) {
  return Me(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function We(n) {
  if (it(n) === "html")
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
function so(n) {
  const e = We(n);
  return st(e) ? n.ownerDocument ? n.ownerDocument.body : n.body : Re(e) && pt(e) ? e : so(e);
}
function ct(n, e, t) {
  var o;
  e === void 0 && (e = []), t === void 0 && (t = !0);
  const s = so(n), l = s === ((o = n.ownerDocument) == null ? void 0 : o.body), d = Ce(s);
  if (l) {
    const r = Jt(d);
    return e.concat(d, d.visualViewport || [], pt(s) ? s : [], r && t ? ct(r) : []);
  }
  return e.concat(s, ct(s, [], t));
}
function Jt(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function io(n) {
  const e = Ie(n);
  let t = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const s = Re(n), l = s ? n.offsetWidth : t, d = s ? n.offsetHeight : o, r = xt(t) !== l || xt(o) !== d;
  return r && (t = l, o = d), {
    width: t,
    height: o,
    $: r
  };
}
function pn(n) {
  return Me(n) ? n : n.contextElement;
}
function et(n) {
  const e = pn(n);
  if (!Re(e))
    return Le(1);
  const t = e.getBoundingClientRect(), {
    width: o,
    height: s,
    $: l
  } = io(e);
  let d = (l ? xt(t.width) : t.width) / o, r = (l ? xt(t.height) : t.height) / s;
  return (!d || !Number.isFinite(d)) && (d = 1), (!r || !Number.isFinite(r)) && (r = 1), {
    x: d,
    y: r
  };
}
const Sr = /* @__PURE__ */ Le(0);
function ao(n) {
  const e = Ce(n);
  return !vn() || !e.visualViewport ? Sr : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Cr(n, e, t) {
  return e === void 0 && (e = !1), !t || e && t !== Ce(n) ? !1 : e;
}
function Je(n, e, t, o) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  const s = n.getBoundingClientRect(), l = pn(n);
  let d = Le(1);
  e && (o ? Me(o) && (d = et(o)) : d = et(n));
  const r = Cr(l, t, o) ? ao(l) : Le(0);
  let c = (s.left + r.x) / d.x, u = (s.top + r.y) / d.y, f = s.width / d.x, h = s.height / d.y;
  if (l) {
    const v = Ce(l), w = o && Me(o) ? Ce(o) : o;
    let $ = v, F = Jt($);
    for (; F && o && w !== $; ) {
      const _ = et(F), g = F.getBoundingClientRect(), m = Ie(F), S = g.left + (F.clientLeft + parseFloat(m.paddingLeft)) * _.x, k = g.top + (F.clientTop + parseFloat(m.paddingTop)) * _.y;
      c *= _.x, u *= _.y, f *= _.x, h *= _.y, c += S, u += k, $ = Ce(F), F = Jt($);
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
  return e ? e.left + t : Je(Be(n)).left + t;
}
function ro(n, e) {
  const t = n.getBoundingClientRect(), o = t.left + e.scrollLeft - Ht(n, t), s = t.top + e.scrollTop;
  return {
    x: o,
    y: s
  };
}
function Fr(n) {
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
  }, u = Le(1);
  const f = Le(0), h = Re(o);
  if ((h || !h && !l) && ((it(o) !== "body" || pt(d)) && (c = Ut(o)), Re(o))) {
    const w = Je(o);
    u = et(o), f.x = w.x + o.clientLeft, f.y = w.y + o.clientTop;
  }
  const v = d && !h && !l ? ro(d, c) : Le(0);
  return {
    width: t.width * u.x,
    height: t.height * u.y,
    x: t.x * u.x - c.scrollLeft * u.x + f.x + v.x,
    y: t.y * u.y - c.scrollTop * u.y + f.y + v.y
  };
}
function Dr(n) {
  return Array.from(n.getClientRects());
}
function Er(n) {
  const e = Be(n), t = Ut(n), o = n.ownerDocument.body, s = Qe(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), l = Qe(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let d = -t.scrollLeft + Ht(n);
  const r = -t.scrollTop;
  return Ie(o).direction === "rtl" && (d += Qe(e.clientWidth, o.clientWidth) - s), {
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
    const f = o.ownerDocument, h = f.body, v = getComputedStyle(h), w = f.compatMode === "CSS1Compat" && parseFloat(v.marginLeft) + parseFloat(v.marginRight) || 0, $ = Math.abs(o.clientWidth - h.clientWidth - w);
    $ <= Dn && (l -= $);
  } else u <= Dn && (l += u);
  return {
    width: l,
    height: d,
    x: r,
    y: c
  };
}
const Tr = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Ar(n, e) {
  const t = Je(n, !0, e === "fixed"), o = t.top + n.clientTop, s = t.left + n.clientLeft, l = Re(n) ? et(n) : Le(1), d = n.clientWidth * l.x, r = n.clientHeight * l.y, c = s * l.x, u = o * l.y;
  return {
    width: d,
    height: r,
    x: c,
    y: u
  };
}
function En(n, e, t) {
  let o;
  if (e === "viewport")
    o = Pr(n, t);
  else if (e === "document")
    o = Er(Be(n));
  else if (Me(e))
    o = Ar(e, t);
  else {
    const s = ao(n);
    o = {
      x: e.x - s.x,
      y: e.y - s.y,
      width: e.width,
      height: e.height
    };
  }
  return $t(o);
}
function lo(n, e) {
  const t = We(n);
  return t === e || !Me(t) || st(t) ? !1 : Ie(t).position === "fixed" || lo(t, e);
}
function Mr(n, e) {
  const t = e.get(n);
  if (t)
    return t;
  let o = ct(n, [], !1).filter((r) => Me(r) && it(r) !== "body"), s = null;
  const l = Ie(n).position === "fixed";
  let d = l ? We(n) : n;
  for (; Me(d) && !st(d); ) {
    const r = Ie(d), c = fn(d);
    !c && r.position === "fixed" && (s = null), (l ? !c && !s : !c && r.position === "static" && !!s && Tr.has(s.position) || pt(d) && !c && lo(n, d)) ? o = o.filter((f) => f !== d) : s = r, d = We(d);
  }
  return e.set(n, o), o;
}
function Ir(n) {
  let {
    element: e,
    boundary: t,
    rootBoundary: o,
    strategy: s
  } = n;
  const d = [...t === "clippingAncestors" ? Nt(e) ? [] : Mr(e, this._c) : [].concat(t), o], r = d[0], c = d.reduce((u, f) => {
    const h = En(e, f, s);
    return u.top = Qe(h.top, u.top), u.right = bt(h.right, u.right), u.bottom = bt(h.bottom, u.bottom), u.left = Qe(h.left, u.left), u;
  }, En(e, r, s));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Or(n) {
  const {
    width: e,
    height: t
  } = io(n);
  return {
    width: e,
    height: t
  };
}
function Lr(n, e, t) {
  const o = Re(e), s = Be(e), l = t === "fixed", d = Je(n, !0, l, e);
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Le(0);
  function u() {
    c.x = Ht(s);
  }
  if (o || !o && !l)
    if ((it(e) !== "body" || pt(s)) && (r = Ut(e)), o) {
      const w = Je(e, !0, l, e);
      c.x = w.x + e.clientLeft, c.y = w.y + e.clientTop;
    } else s && u();
  l && !o && s && u();
  const f = s && !o && !l ? ro(s, r) : Le(0), h = d.left + r.scrollLeft - c.x - f.x, v = d.top + r.scrollTop - c.y - f.y;
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
function Pn(n, e) {
  if (!Re(n) || Ie(n).position === "fixed")
    return null;
  if (e)
    return e(n);
  let t = n.offsetParent;
  return Be(n) === t && (t = t.ownerDocument.body), t;
}
function co(n, e) {
  const t = Ce(n);
  if (Nt(n))
    return t;
  if (!Re(n)) {
    let s = We(n);
    for (; s && !st(s); ) {
      if (Me(s) && !Wt(s))
        return s;
      s = We(s);
    }
    return t;
  }
  let o = Pn(n, e);
  for (; o && gr(o) && Wt(o); )
    o = Pn(o, e);
  return o && st(o) && Wt(o) && !fn(o) ? t : o || kr(n) || t;
}
const Rr = async function(n) {
  const e = this.getOffsetParent || co, t = this.getDimensions, o = await t(n.floating);
  return {
    reference: Lr(n.reference, await e(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Br(n) {
  return Ie(n).direction === "rtl";
}
const Vr = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Fr,
  getDocumentElement: Be,
  getClippingRect: Ir,
  getOffsetParent: co,
  getElementRects: Rr,
  getClientRects: Dr,
  getDimensions: Or,
  getScale: et,
  isElement: Me,
  isRTL: Br
};
function uo(n, e) {
  return n.x === e.x && n.y === e.y && n.width === e.width && n.height === e.height;
}
function zr(n, e) {
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
      height: w
    } = u;
    if (r || e(), !v || !w)
      return;
    const $ = gt(h), F = gt(s.clientWidth - (f + v)), _ = gt(s.clientHeight - (h + w)), g = gt(f), S = {
      rootMargin: -$ + "px " + -F + "px " + -_ + "px " + -g + "px",
      threshold: Qe(0, bt(1, c)) || 1
    };
    let k = !0;
    function C(V) {
      const M = V[0].intersectionRatio;
      if (M !== c) {
        if (!k)
          return d();
        M ? d(!1, M) : o = setTimeout(() => {
          d(!1, 1e-7);
        }, 1e3);
      }
      M === 1 && !uo(u, n.getBoundingClientRect()) && d(), k = !1;
    }
    try {
      t = new IntersectionObserver(C, {
        ...S,
        // Handle <iframe>s
        root: s.ownerDocument
      });
    } catch {
      t = new IntersectionObserver(C, S);
    }
    t.observe(n);
  }
  return d(!0), l;
}
function fo(n, e, t, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: s = !0,
    ancestorResize: l = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: r = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = o, u = pn(n), f = s || l ? [...u ? ct(u) : [], ...ct(e)] : [];
  f.forEach((g) => {
    s && g.addEventListener("scroll", t, {
      passive: !0
    }), l && g.addEventListener("resize", t);
  });
  const h = u && r ? zr(u, t) : null;
  let v = -1, w = null;
  d && (w = new ResizeObserver((g) => {
    let [m] = g;
    m && m.target === u && w && (w.unobserve(e), cancelAnimationFrame(v), v = requestAnimationFrame(() => {
      var S;
      (S = w) == null || S.observe(e);
    })), t();
  }), u && !c && w.observe(u), w.observe(e));
  let $, F = c ? Je(n) : null;
  c && _();
  function _() {
    const g = Je(n);
    F && !uo(F, g) && t(), F = g, $ = requestAnimationFrame(_);
  }
  return t(), () => {
    var g;
    f.forEach((m) => {
      s && m.removeEventListener("scroll", t), l && m.removeEventListener("resize", t);
    }), h?.(), (g = w) == null || g.disconnect(), w = null, c && cancelAnimationFrame($);
  };
}
const St = pr, Ct = hr, Ft = ur, Dt = (n, e, t) => {
  const o = /* @__PURE__ */ new Map(), s = {
    platform: Vr,
    ...t
  }, l = {
    ...s.platform,
    _c: o
  };
  return cr(n, e, {
    ...s,
    platform: l
  });
}, Nr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ur(n, e) {
  return p(), y("svg", Nr, [...e[0] || (e[0] = [
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
const vo = { render: Ur }, Hr = ["disabled", "title"], jr = ["data-theme"], Kr = { class: "vuefinder__search-modal__dropdown-content" }, qr = { class: "vuefinder__search-modal__dropdown-section" }, Wr = { class: "vuefinder__search-modal__dropdown-title" }, Gr = { class: "vuefinder__search-modal__dropdown-options" }, Yr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Qr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Xr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Jr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Zr = /* @__PURE__ */ J({
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
    const o = n, s = t, l = Z(), { t: d } = l.i18n, r = P(null), c = P(null);
    let u = null;
    const f = (F) => {
      if (s("update:selectedOption", F), F.startsWith("size-")) {
        const _ = F.split("-")[1];
        s("update:sizeFilter", _);
      }
    }, h = async () => {
      o.disabled || (o.visible ? (s("update:visible", !1), u && (u(), u = null)) : (s("update:visible", !0), await Ae(), await v()));
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
          const { x: F, y: _ } = await Dt(r.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [St(8), Ft({ padding: 16 }), Ct({ padding: 16 })]
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
          u = fo(r.value, c.value, async () => {
            if (!(!r.value || !c.value))
              try {
                const { x: F, y: _ } = await Dt(
                  r.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [St(8), Ft({ padding: 16 }), Ct({ padding: 16 })]
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
    }, $ = () => {
      u && (u(), u = null);
    };
    return le(
      () => o.visible,
      (F) => {
        !F && u && (u(), u = null);
      }
    ), xe(() => {
      $();
    }), e({
      cleanup: $
    }), (F, _) => (p(), y(ce, null, [
      i("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: G(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: a(d)("Search Options"),
        onClick: de(h, ["stop"])
      }, [
        L(a(vo), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Hr),
      (p(), R(Pt, { to: "body" }, [
        n.visible ? (p(), y("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": a(l).theme.current,
          tabindex: "-1",
          onClick: _[4] || (_[4] = de(() => {
          }, ["stop"])),
          onKeydown: w
        }, [
          i("div", Kr, [
            i("div", qr, [
              i("div", Wr, b(a(d)("File Size")), 1),
              i("div", Gr, [
                i("div", {
                  class: G(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: _[0] || (_[0] = de((g) => f("size-all"), ["stop"]))
                }, [
                  i("span", null, b(a(d)("All Files")), 1),
                  n.sizeFilter === "all" ? (p(), y("div", Yr, [..._[5] || (_[5] = [
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
                  onClick: _[1] || (_[1] = de((g) => f("size-small"), ["stop"]))
                }, [
                  i("span", null, b(a(d)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (p(), y("div", Qr, [..._[6] || (_[6] = [
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
                  onClick: _[2] || (_[2] = de((g) => f("size-medium"), ["stop"]))
                }, [
                  i("span", null, b(a(d)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (p(), y("div", Xr, [..._[7] || (_[7] = [
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
                  onClick: _[3] || (_[3] = de((g) => f("size-large"), ["stop"]))
                }, [
                  i("span", null, b(a(d)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (p(), y("div", Jr, [..._[8] || (_[8] = [
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
        ], 40, jr)) : A("", !0)
      ]))
    ], 64));
  }
});
function el(n) {
  const [e, t] = tl(n);
  if (!t || t === "/") return e + "://";
  const o = t.replace(/\/+$/, ""), s = o.lastIndexOf("/");
  return s === 0 ? e + "://" : e + ":/" + o.slice(0, s);
}
function tl(n) {
  const e = n.indexOf(":/");
  return e === -1 ? [void 0, n] : [n.slice(0, e), n.slice(e + 2) || "/"];
}
function po(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const o = t[1], s = t[2] ?? "", l = s.split("/").filter(Boolean), d = l.pop();
  if (!d) return o + s;
  let r = `${o}${l.join("/")}${l.length ? "/" : ""}${d}`;
  if (r.length <= e) return r;
  const c = d.split(/\.(?=[^\.]+$)/), u = c[0] ?? "", f = c[1] ?? "", h = u.length > 10 ? `${u.slice(0, 6)}...${u.slice(-5)}` : u, v = f ? `${h}.${f}` : h;
  return r = `${o}${l.join("/")}${l.length ? "/" : ""}${v}`, r.length > e && (r = `${o}.../${v}`), r;
}
async function ho(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function ut(n) {
  await ho(n);
}
async function nl(n) {
  await ho(n);
}
const ol = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function sl(n, e) {
  return p(), y("svg", ol, [...e[0] || (e[0] = [
    i("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const _o = { render: sl }, il = ["title"], al = { class: "vuefinder__search-modal__result-icon" }, rl = { class: "vuefinder__search-modal__result-content" }, ll = { class: "vuefinder__search-modal__result-name" }, dl = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, cl = ["title"], ul = ["title"], fl = ["data-item-dropdown", "data-theme"], vl = { class: "vuefinder__search-modal__item-dropdown-content" }, pl = /* @__PURE__ */ J({
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
    const t = n, o = e, s = Z(), { t: l } = s.i18n, d = P(null);
    let r = null;
    le(
      () => t.activeDropdown,
      (g) => {
        r && (r(), r = null), g === t.item.path && d.value && Ae(() => {
          h(t.item.path, d.value);
        });
      }
    ), xe(() => {
      r && (r(), r = null);
    });
    const c = (g) => t.expandedPaths.has(g), u = (g) => g.type === "dir" || !g.file_size ? "" : nn(g.file_size), f = (g, m) => {
      m.stopPropagation(), o("toggleItemDropdown", g, m);
    }, h = async (g, m) => {
      const S = document.querySelector(
        `[data-item-dropdown="${g}"]`
      );
      if (!(!S || !m) && (await Ae(), !(!S || !m))) {
        Object.assign(S.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: k, y: C } = await Dt(m, S, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [St(8), Ft({ padding: 16 }), Ct({ padding: 16 })]
          });
          Object.assign(S.style, {
            left: `${k}px`,
            top: `${C}px`
          }), requestAnimationFrame(() => {
            S && Object.assign(S.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (k) {
          console.warn("Floating UI initial positioning error:", k);
          return;
        }
        try {
          r = fo(m, S, async () => {
            if (!(!m || !S))
              try {
                const { x: k, y: C } = await Dt(m, S, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [St(8), Ft({ padding: 16 }), Ct({ padding: 16 })]
                });
                Object.assign(S.style, {
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
    }, v = (g) => {
      o("update:selectedItemDropdownOption", g);
    }, w = async (g) => {
      await ut(g.path), o("copyPath", g);
    }, $ = (g) => {
      o("openContainingFolder", g);
    }, F = (g) => {
      o("preview", g);
    }, _ = (g) => {
      if (!t.activeDropdown) return;
      const m = ["copy-path", "open-folder", "preview"], S = t.selectedItemDropdownOption, k = m.findIndex((C) => S?.includes(C));
      if (g.key === "ArrowDown") {
        g.preventDefault();
        const C = (k + 1) % m.length;
        o(
          "update:selectedItemDropdownOption",
          `${m[C] || ""}-${t.activeDropdown}`
        );
      } else if (g.key === "ArrowUp") {
        g.preventDefault();
        const C = k <= 0 ? m.length - 1 : k - 1;
        o(
          "update:selectedItemDropdownOption",
          `${m[C] || ""}-${t.activeDropdown}`
        );
      } else g.key === "Enter" ? (g.preventDefault(), S && (S.includes("copy-path") ? w(t.item) : S.includes("open-folder") ? $(t.item) : S.includes("preview") && F(t.item))) : g.key === "Escape" && (g.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return (g, m) => (p(), y("div", {
      class: G(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: m[9] || (m[9] = (S) => o("select", n.index))
    }, [
      i("div", al, [
        n.item.type === "dir" ? (p(), R(a(Ue), { key: 0 })) : (p(), R(a(yt), { key: 1 }))
      ]),
      i("div", rl, [
        i("div", ll, [
          se(b(n.item.basename) + " ", 1),
          u(n.item) ? (p(), y("span", dl, b(u(n.item)), 1)) : A("", !0)
        ]),
        i("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: m[0] || (m[0] = de((S) => {
            o("select", n.index), o("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, b(c(n.item.path) ? n.item.path : a(po)(n.item.path)), 9, cl)
      ]),
      i("button", {
        ref_key: "buttonElementRef",
        ref: d,
        class: "vuefinder__search-modal__result-actions",
        title: a(l)("More actions"),
        onClick: m[1] || (m[1] = (S) => {
          o("selectWithDropdown", n.index), f(n.item.path, S);
        })
      }, [
        L(a(_o), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, ul),
      (p(), R(Pt, { to: "body" }, [
        n.activeDropdown === n.item.path ? (p(), y("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": a(s).theme.current,
          tabindex: "-1",
          onClick: m[8] || (m[8] = de(() => {
          }, ["stop"])),
          onKeydown: _
        }, [
          i("div", vl, [
            i("div", {
              class: G(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: m[2] || (m[2] = (S) => {
                v(`copy-path-${n.item.path}`), w(n.item);
              }),
              onFocus: m[3] || (m[3] = (S) => v(`copy-path-${n.item.path}`))
            }, [
              m[10] || (m[10] = i("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                i("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                i("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              i("span", null, b(a(l)("Copy Path")), 1)
            ], 34),
            i("div", {
              class: G(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: m[4] || (m[4] = (S) => {
                v(`open-folder-${n.item.path}`), $(n.item);
              }),
              onFocus: m[5] || (m[5] = (S) => v(`open-folder-${n.item.path}`))
            }, [
              L(a(Ue), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, b(a(l)("Open Containing Folder")), 1)
            ], 34),
            i("div", {
              class: G(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: m[6] || (m[6] = (S) => {
                v(`preview-${n.item.path}`), F(n.item);
              }),
              onFocus: m[7] || (m[7] = (S) => v(`preview-${n.item.path}`))
            }, [
              L(a(yt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, b(a(l)("Preview")), 1)
            ], 34)
          ])
        ], 40, fl)) : A("", !0)
      ]))
    ], 10, il));
  }
}), hl = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, _l = { class: "vuefinder__search-modal__loading-icon" }, ml = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, gl = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, wl = { class: "vuefinder__search-modal__results-header" }, Ye = 60, Tn = 5, yl = /* @__PURE__ */ J({
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
    const o = n, s = t, l = Z(), { t: d } = l.i18n, r = je("scrollableContainer"), c = j(() => o.searchResults.length > 0), u = j(() => o.searchResults.length), f = P(0), h = P(600), v = j(() => o.searchResults.length * Ye), w = j(() => {
      const S = Math.max(0, Math.floor(f.value / Ye) - Tn), k = Math.min(
        o.searchResults.length,
        Math.ceil((f.value + h.value) / Ye) + Tn
      );
      return { start: S, end: k };
    }), $ = j(() => {
      const { start: S, end: k } = w.value;
      return o.searchResults.slice(S, k).map((C, V) => ({
        item: C,
        index: S + V,
        top: (S + V) * Ye
      }));
    }), F = (S) => {
      const k = S.target;
      f.value = k.scrollTop;
    }, _ = () => {
      r.value && (h.value = r.value.clientHeight);
    }, g = () => {
      if (o.selectedIndex >= 0 && r.value) {
        const S = o.selectedIndex * Ye, k = S + Ye, C = r.value.scrollTop, V = r.value.clientHeight, M = C + V;
        let q = C;
        S < C ? q = S : k > M && (q = k - V), q !== C && r.value.scrollTo({
          top: q,
          behavior: "smooth"
        });
      }
    }, m = () => {
      r.value && (r.value.scrollTop = 0, f.value = 0);
    };
    return ve(() => {
      _(), window.addEventListener("resize", _);
    }), xe(() => {
      window.removeEventListener("resize", _);
    }), le(
      () => r.value,
      () => {
        _();
      }
    ), e({
      scrollSelectedIntoView: g,
      resetScroll: m,
      getContainerHeight: () => h.value,
      scrollTop: () => f.value
    }), (S, k) => (p(), y("div", {
      class: G(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (p(), y("div", hl, [
        i("div", _l, [
          L(a(Rt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        i("span", null, b(a(d)("Searching...")), 1)
      ])) : c.value ? (p(), y("div", gl, [
        i("div", wl, [
          i("span", null, b(a(d)("Found %s results", u.value)), 1)
        ]),
        i("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: F
        }, [
          i("div", {
            class: "vuefinder__search-modal__results-items",
            style: Ne({ height: `${v.value}px`, position: "relative" })
          }, [
            (p(!0), y(ce, null, pe($.value, (C) => (p(), y("div", {
              key: C.item.path,
              style: Ne({
                position: "absolute",
                top: `${C.top}px`,
                left: "0",
                width: "100%",
                height: `${Ye}px`
              })
            }, [
              L(pl, {
                item: C.item,
                index: C.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: k[0] || (k[0] = (V) => s("selectResultItem", V)),
                onSelectWithDropdown: k[1] || (k[1] = (V) => s("selectResultItemWithDropdown", V)),
                onTogglePathExpansion: k[2] || (k[2] = (V) => s("togglePathExpansion", V)),
                onToggleItemDropdown: k[3] || (k[3] = (V, M) => s("toggleItemDropdown", V, M)),
                "onUpdate:selectedItemDropdownOption": k[4] || (k[4] = (V) => s("update:selectedItemDropdownOption", V)),
                onCopyPath: k[5] || (k[5] = (V) => s("copyPath", V)),
                onOpenContainingFolder: k[6] || (k[6] = (V) => s("openContainingFolder", V)),
                onPreview: k[7] || (k[7] = (V) => s("preview", V))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (p(), y("div", ml, [
        i("span", null, b(a(d)("No results found")), 1)
      ]))
    ], 2));
  }
}), bl = { class: "vuefinder__search-modal" }, xl = { class: "vuefinder__search-modal__content" }, kl = { class: "vuefinder__search-modal__search-bar" }, $l = { class: "vuefinder__search-modal__search-location" }, Sl = ["title"], Cl = ["disabled"], Fl = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, Dl = { class: "vuefinder__search-modal__folder-selector-content" }, El = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, Pl = { class: "vuefinder__search-modal__instructions-text" }, hn = /* @__PURE__ */ J({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = P(null), l = P(null), d = P(null), r = Jn("", 300), c = P([]), u = P(!1), f = P(-1), h = P(!1), v = P(!1), w = P(null), $ = P("all"), F = P(!1), _ = P(`size-${$.value}`), g = P(null), m = P(/* @__PURE__ */ new Set()), S = P(null), k = K(o.path), C = (x) => {
      m.value.has(x) ? m.value.delete(x) : m.value.add(x);
    }, V = (x, E) => {
      E && typeof E.stopPropagation == "function" && E.stopPropagation(), S.value === x ? S.value = null : S.value = x;
    }, M = () => {
      S.value = null;
    }, q = (x) => {
      try {
        const E = x.dir || `${x.storage}://`;
        e.adapter.open(E), e.modal.close(), M();
      } catch {
        e.emitter.emit("vf-toast-push", { label: t("Failed to open containing folder") });
      }
    }, I = (x) => {
      e.modal.open(It, {
        storage: k?.value?.storage ?? "local",
        item: x
      }), M();
    }, N = (x) => {
      f.value = x, M();
    }, te = (x) => {
      f.value = x;
    }, re = async (x) => {
      await ut(x.path), M();
    };
    le(r, async (x) => {
      x.trim() ? (await ee(x.trim()), f.value = 0) : (c.value = [], u.value = !1, f.value = -1);
    }), le($, async (x) => {
      _.value = `size-${x}`, r.value.trim() && !v.value && (await ee(r.value.trim()), f.value = 0);
    }), le(F, async () => {
      r.value.trim() && !v.value && (await ee(r.value.trim()), f.value = 0);
    });
    const ee = async (x) => {
      if (x) {
        u.value = !0;
        try {
          const E = w.value?.path || k?.value?.path, T = await e.adapter.search({
            path: E,
            filter: x,
            deep: F.value,
            size: $.value
          });
          c.value = T || [], u.value = !1;
        } catch (E) {
          console.error("Search error:", E), c.value = [], u.value = !1;
        }
      }
    };
    ve(() => {
      document.addEventListener("click", D), _.value = `size-${$.value}`, Ae(() => {
        s.value && s.value.focus();
      });
    });
    const ie = () => {
      v.value ? (v.value = !1, r.value.trim() && (ee(r.value.trim()), f.value = 0)) : (h.value = !1, v.value = !0);
    }, ue = (x) => {
      x && (w.value = x);
    }, Y = (x) => {
      x && (ue(x), v.value = !1, r.value.trim() && (ee(r.value.trim()), f.value = 0));
    };
    xe(() => {
      document.removeEventListener("click", D), l.value && l.value.cleanup();
    });
    const D = (x) => {
      const E = x.target;
      if (h.value && (E.closest(".vuefinder__search-modal__dropdown") || (h.value = !1, Ae(() => {
        s.value && s.value.focus();
      }))), S.value) {
        const T = E.closest(".vuefinder__search-modal__item-dropdown"), U = E.closest(".vuefinder__search-modal__result-item");
        !T && !U && M();
      }
    };
    return (x, E) => (p(), R(De, { class: "vuefinder__search-modal-layout" }, {
      default: X(() => [
        i("div", bl, [
          L(Pe, {
            icon: a(un),
            title: a(t)("Search files")
          }, null, 8, ["icon", "title"]),
          i("div", xl, [
            i("div", kl, [
              L(Ja, {
                ref_key: "searchInputRef",
                ref: s,
                modelValue: a(r),
                "onUpdate:modelValue": E[0] || (E[0] = (T) => Po(r) ? r.value = T : null),
                "is-searching": u.value,
                disabled: v.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              L(Zr, {
                ref_key: "searchOptionsDropdownRef",
                ref: l,
                visible: h.value,
                "onUpdate:visible": E[1] || (E[1] = (T) => h.value = T),
                "size-filter": $.value,
                "onUpdate:sizeFilter": E[2] || (E[2] = (T) => $.value = T),
                "selected-option": _.value,
                "onUpdate:selectedOption": E[3] || (E[3] = (T) => _.value = T),
                disabled: v.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            i("div", {
              class: "vuefinder__search-modal__options",
              onClick: E[7] || (E[7] = de(() => {
              }, ["stop"]))
            }, [
              i("div", $l, [
                i("button", {
                  class: G(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": v.value }]),
                  onClick: de(ie, ["stop"])
                }, [
                  L(a(Ue), { class: "vuefinder__search-modal__location-icon" }),
                  i("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: w.value?.path || a(k).path
                  }, b(a(po)(w.value?.path || a(k).path)), 9, Sl),
                  E[10] || (E[10] = i("svg", {
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
                onClick: E[6] || (E[6] = de(() => {
                }, ["stop"]))
              }, [
                he(i("input", {
                  "onUpdate:modelValue": E[4] || (E[4] = (T) => F.value = T),
                  type: "checkbox",
                  disabled: v.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: E[5] || (E[5] = de(() => {
                  }, ["stop"]))
                }, null, 8, Cl), [
                  [en, F.value]
                ]),
                i("span", null, b(a(t)("Include subfolders")), 1)
              ])
            ]),
            v.value ? (p(), y("div", Fl, [
              i("div", Dl, [
                L(dn, {
                  modelValue: w.value,
                  "onUpdate:modelValue": [
                    E[8] || (E[8] = (T) => w.value = T),
                    ue
                  ],
                  "show-pinned-folders": !0,
                  "current-path": a(k),
                  onSelectAndClose: Y
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : A("", !0),
            !a(r).trim() && !v.value ? (p(), y("div", El, [
              i("p", Pl, b(a(t)("Search helper text")), 1)
            ])) : A("", !0),
            a(r).trim() && !v.value ? (p(), R(yl, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": c.value,
              "is-searching": u.value,
              "selected-index": f.value,
              "expanded-paths": m.value,
              "active-dropdown": S.value,
              "selected-item-dropdown-option": g.value,
              "results-enter": !0,
              onSelectResultItem: N,
              onSelectResultItemWithDropdown: te,
              onTogglePathExpansion: C,
              onToggleItemDropdown: V,
              "onUpdate:selectedItemDropdownOption": E[9] || (E[9] = (T) => g.value = T),
              onCopyPath: re,
              onOpenContainingFolder: q,
              onPreview: I
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : A("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Tl = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: t }) {
    const o = Z(), s = P(!1), { t: l } = o.i18n;
    let d = null;
    const r = () => {
      d && clearTimeout(d), s.value = !0, d = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return ve(() => {
      o.emitter.on(n.on, r);
    }), xe(() => {
      d && clearTimeout(d);
    }), {
      shown: s,
      t: l
    };
  }
}, Al = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [o, s] of e)
    t[o] = s;
  return t;
}, Ml = { key: 1 };
function Il(n, e, t, o, s, l) {
  return p(), y("div", {
    class: G(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    n.$slots.default ? Fe(n.$slots, "default", { key: 0 }) : (p(), y("span", Ml, b(o.t("Saved.")), 1))
  ], 2);
}
const rt = /* @__PURE__ */ Al(Tl, [["render", Il]]), Ol = [
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
], Ll = { class: "vuefinder__about-modal__content" }, Rl = { class: "vuefinder__about-modal__main" }, Bl = { class: "vuefinder__about-modal__description" }, Vl = { class: "vuefinder__about-modal__settings" }, zl = { class: "vuefinder__about-modal__settings__fieldset" }, Nl = { class: "vuefinder__about-modal__settings__section-title" }, Ul = { class: "vuefinder__about-modal__setting" }, Hl = { class: "vuefinder__about-modal__setting-label" }, jl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Kl = { class: "vuefinder__about-modal__setting-input justify-end" }, ql = ["checked"], Wl = { class: "vuefinder__about-modal__setting" }, Gl = { class: "vuefinder__about-modal__setting-label" }, Yl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Ql = { class: "vuefinder__about-modal__setting-input justify-end" }, Xl = ["checked"], Jl = { class: "vuefinder__about-modal__setting" }, Zl = { class: "vuefinder__about-modal__setting-label" }, ed = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, td = { class: "vuefinder__about-modal__setting-input justify-end" }, nd = ["checked"], od = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, sd = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, id = { class: "vuefinder__about-modal__setting-input justify-end" }, ad = ["value"], rd = ["label"], ld = ["value"], dd = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, cd = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, ud = { class: "vuefinder__about-modal__setting-input justify-end" }, fd = ["label"], vd = ["value"], pd = { class: "vuefinder__about-modal__tab-content" }, hd = { class: "vuefinder__about-modal__settings__section-title" }, _d = { class: "vuefinder__about-modal__description" }, mo = /* @__PURE__ */ J({
  __name: "ModalSettings",
  setup(n) {
    const e = Z(), { enabled: t } = Oe(), o = e.config, { clearStore: s } = e.storage, { t: l } = e.i18n, d = K(o.state), r = j(() => d.value.theme || "light"), c = async () => {
      o.reset(), s(), location.reload();
    }, u = (_) => {
      o.set("theme", _), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? jn : nn, e.emitter.emit("vf-metric-units-saved");
    }, h = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, v = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: w } = wt("VueFinderOptions"), F = Object.fromEntries(
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
      }).filter(([_]) => Object.keys(w).includes(_))
    );
    return (_, g) => (p(), R(De, null, {
      buttons: X(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[2] || (g[2] = (m) => a(e).modal.close())
        }, b(a(l)("Close")), 1)
      ]),
      default: X(() => [
        i("div", Ll, [
          L(Pe, {
            icon: a(vo),
            title: a(l)("Settings")
          }, null, 8, ["icon", "title"]),
          i("div", Rl, [
            i("div", Bl, b(a(l)("Customize your experience with the following settings")), 1),
            i("div", Vl, [
              i("fieldset", zl, [
                i("div", Nl, b(a(l)("General")), 1),
                i("div", Ul, [
                  i("div", Hl, [
                    i("label", jl, b(a(l)("Use Metric Units")), 1)
                  ]),
                  i("div", Kl, [
                    i("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: a(o).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: f
                    }, null, 40, ql),
                    L(rt, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: X(() => [
                        se(b(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", Wl, [
                  i("div", Gl, [
                    i("label", Yl, b(a(l)("Compact list view")), 1)
                  ]),
                  i("div", Ql, [
                    i("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: a(o).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: h
                    }, null, 40, Xl),
                    L(rt, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: X(() => [
                        se(b(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", Jl, [
                  i("div", Zl, [
                    i("label", ed, b(a(l)("Persist path on reload")), 1)
                  ]),
                  i("div", td, [
                    i("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: a(o).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: v
                    }, null, 40, nd),
                    L(rt, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: X(() => [
                        se(b(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                a(t)("theme") ? (p(), y("div", od, b(a(l)("Theme")), 1)) : A("", !0),
                a(t)("theme") ? (p(), y("div", sd, [
                  i("div", id, [
                    i("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: g[0] || (g[0] = (m) => u(m.target?.value))
                    }, [
                      i("optgroup", {
                        label: a(l)("Theme")
                      }, [
                        (p(!0), y(ce, null, pe(a(Ol), (m) => (p(), y("option", {
                          key: m.name,
                          value: m.name
                        }, b(m.displayName), 9, ld))), 128))
                      ], 8, rd)
                    ], 40, ad),
                    L(rt, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: X(() => [
                        se(b(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : A("", !0),
                a(t)("language") && Object.keys(a(F)).length > 1 ? (p(), y("div", dd, b(a(l)("Language")), 1)) : A("", !0),
                a(t)("language") && Object.keys(a(F)).length > 1 ? (p(), y("div", cd, [
                  i("div", ud, [
                    he(i("select", {
                      id: "language",
                      "onUpdate:modelValue": g[1] || (g[1] = (m) => a(e).i18n.locale = m),
                      class: "vuefinder__about-modal__select"
                    }, [
                      i("optgroup", {
                        label: a(l)("Language")
                      }, [
                        (p(!0), y(ce, null, pe(a(F), (m, S) => (p(), y("option", {
                          key: S,
                          value: S
                        }, b(m), 9, vd))), 128))
                      ], 8, fd)
                    ], 512), [
                      [Yt, a(e).i18n.locale]
                    ]),
                    L(rt, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: X(() => [
                        se(b(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : A("", !0)
              ])
            ]),
            i("div", pd, [
              i("div", hd, b(a(l)("Reset")), 1),
              i("div", _d, b(a(l)("Reset all settings to default")), 1),
              i("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                onClick: c
              }, b(a(l)("Reset Settings")), 1)
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
function md() {
  const n = Z(), e = n.fs, t = n.config, { enabled: o } = Oe(), s = K(e.path), l = K(e.selectedItems), d = (r) => {
    if (r.code === be.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (r.metaKey && r.code === be.KEY_R && !r.shiftKey && (n.adapter.invalidateListQuery(s.value.path), n.adapter.open(s.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === be.KEY_R && o("rename") && l.value.length === 1 && (n.modal.open(Mt, { items: l.value }), r.preventDefault()), r.code === be.DELETE && l.value.length !== 0 && n.modal.open(At, { items: l.value }), r.metaKey && r.code === be.BACKSLASH && n.modal.open(Wn), r.metaKey && r.code === be.KEY_F && o("search") && (n.modal.open(hn), r.preventDefault()), r.metaKey && r.code === be.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === be.KEY_S && (n.modal.open(mo), r.preventDefault()), r.metaKey && r.code === be.ENTER && (t.toggle("fullScreen"), n.root.focus()), r.metaKey && r.code === be.KEY_A && (e.selectAll(n.selectionMode || "multiple", n), r.preventDefault()), r.code === be.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && n.modal.open(It, {
        storage: e.path.get().storage,
        item: l.value[0]
      }), r.metaKey && r.code === be.KEY_C && o("copy")) {
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
      if (r.metaKey && r.code === be.KEY_X && o("copy")) {
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
      if (r.metaKey && r.code === be.KEY_V && o("copy")) {
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
          n.modal.open(ot, {
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
    if (await Ae(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", d);
  }), Vn(() => {
    n.root && n.root.removeEventListener("keydown", d);
  });
}
function gd() {
  const n = P(!1), e = P([]);
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
              await sn((v, w) => {
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
const wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function yd(n, e) {
  return p(), y("svg", wd, [...e[0] || (e[0] = [
    i("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const go = { render: yd }, bd = { class: "vuefinder__new-folder-modal__content" }, xd = { class: "vuefinder__new-folder-modal__form" }, kd = { class: "vuefinder__new-folder-modal__description" }, $d = ["placeholder"], _n = /* @__PURE__ */ J({
  __name: "ModalNewFolder",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = P(""), d = P(""), r = () => {
      l.value !== "" && e.adapter.createFolder({
        path: s.value.path,
        name: l.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: t("%s is created.", l.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: t(c.message), type: "error" });
      });
    };
    return (c, u) => (p(), R(De, null, {
      buttons: X(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, b(a(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[2] || (u[2] = (f) => a(e).modal.close())
        }, b(a(t)("Cancel")), 1)
      ]),
      default: X(() => [
        i("div", null, [
          L(Pe, {
            icon: a(go),
            title: a(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          i("div", bd, [
            i("div", xd, [
              i("p", kd, b(a(t)("Create a new folder")), 1),
              he(i("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (f) => l.value = f),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: ft(r, ["enter"])
              }, null, 40, $d), [
                [vt, l.value]
              ]),
              d.value.length ? (p(), R(a(d), {
                key: 0,
                error: "",
                onHidden: u[1] || (u[1] = (f) => d.value = "")
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
}), Sd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Cd(n, e) {
  return p(), y("svg", Sd, [...e[0] || (e[0] = [
    i("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const wo = { render: Cd }, Fd = { class: "vuefinder__new-file-modal__content" }, Dd = { class: "vuefinder__new-file-modal__form" }, Ed = { class: "vuefinder__new-file-modal__description" }, Pd = ["placeholder"], yo = /* @__PURE__ */ J({
  __name: "ModalNewFile",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = P(""), d = P(""), r = () => {
      l.value !== "" && e.adapter.createFile({
        path: s.value.path,
        name: l.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: t("%s is created.", l.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: t(c.message), type: "error" });
      });
    };
    return (c, u) => (p(), R(De, null, {
      buttons: X(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, b(a(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[2] || (u[2] = (f) => a(e).modal.close())
        }, b(a(t)("Cancel")), 1)
      ]),
      default: X(() => [
        i("div", null, [
          L(Pe, {
            icon: a(wo),
            title: a(t)("New File")
          }, null, 8, ["icon", "title"]),
          i("div", Fd, [
            i("div", Dd, [
              i("p", Ed, b(a(t)("Create a new file")), 1),
              he(i("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (f) => l.value = f),
                class: "vuefinder__new-file-modal__input",
                placeholder: a(t)("File Name"),
                type: "text",
                onKeyup: ft(r, ["enter"])
              }, null, 40, Pd), [
                [vt, l.value]
              ]),
              d.value.length ? (p(), R(a(d), {
                key: 0,
                error: "",
                onHidden: u[1] || (u[1] = (f) => d.value = "")
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
}), Td = ["title"], Ad = /* @__PURE__ */ J({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, o = Z(), { t: s } = o.i18n, l = P(!1), d = P(null), r = P(d.value?.innerHTML);
    le(r, () => l.value = !1);
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
        Fe(u.$slots, "default"),
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
        ])], 8, Td)
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
function Id(n, e) {
  return p(), y("svg", Md, [...e[0] || (e[0] = [
    i("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const bo = { render: Id }, Od = { class: "vuefinder__upload-modal__content relative" }, Ld = { class: "vuefinder__upload-modal__target-section" }, Rd = { class: "vuefinder__upload-modal__target-label" }, Bd = { class: "vuefinder__upload-modal__target-container" }, Vd = { class: "vuefinder__upload-modal__target-path" }, zd = { class: "vuefinder__upload-modal__target-storage" }, Nd = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Ud = { class: "vuefinder__upload-modal__target-badge" }, Hd = { class: "vuefinder__upload-modal__drag-hint" }, jd = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Kd = ["textContent"], qd = { class: "vuefinder__upload-modal__file-info" }, Wd = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Gd = { class: "vuefinder__upload-modal__file-name md:hidden" }, Yd = {
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
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = P(s.value), d = P(!1), r = () => {
      const D = l.value.path;
      if (!D) return { storage: "local", path: "" };
      if (D.endsWith("://"))
        return { storage: D.replace("://", ""), path: "" };
      const x = D.split("://");
      return {
        storage: x[0] || "local",
        path: x[1] || ""
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
      queue: $,
      message: F,
      uploading: _,
      hasFilesInDropArea: g,
      definitions: m,
      openFileSelector: S,
      upload: k,
      cancel: C,
      remove: V,
      clear: M,
      close: q,
      getClassNameForEntry: I,
      getIconForEntry: N,
      addExternalFiles: te
    } = Qn(e.customUploader), re = () => {
      k(l.value);
    };
    ve(() => {
      e.emitter.on("vf-external-files-dropped", (D) => {
        te(D);
      });
    }), xe(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const ee = P(!1), ie = P(null), ue = P(null), Y = (D) => {
      if (!ee.value) return;
      const x = D.target, E = ie.value?.contains(x) ?? !1, T = ue.value?.contains(x) ?? !1;
      !E && !T && (ee.value = !1);
    };
    return ve(() => document.addEventListener("click", Y)), xe(() => document.removeEventListener("click", Y)), (D, x) => (p(), R(De, {
      "show-drag-overlay": a(g),
      "drag-overlay-text": a(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: X(() => [
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
              onClick: x[3] || (x[3] = (E) => a(S)())
            }, b(a(t)("Select Files")), 1),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": ee.value ? "true" : "false",
              onClick: x[4] || (x[4] = de((E) => ee.value = !ee.value, ["stop"]))
            }, [...x[17] || (x[17] = [
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
            ])], 8, Jd)
          ], 2),
          ee.value ? (p(), y("div", Zd, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[5] || (x[5] = (E) => {
                a(S)(), ee.value = !1;
              })
            }, b(a(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[6] || (x[6] = (E) => {
                a(v)?.click(), ee.value = !1;
              })
            }, b(a(t)("Select Folders")), 1),
            x[18] || (x[18] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: G(["vuefinder__upload-actions__item", a(_) ? "disabled" : ""]),
              onClick: x[7] || (x[7] = (E) => a(_) ? null : (a(M)(!1), ee.value = !1))
            }, b(a(t)("Clear all")), 3),
            i("div", {
              class: G(["vuefinder__upload-actions__item", a(_) ? "disabled" : ""]),
              onClick: x[8] || (x[8] = (E) => a(_) ? null : (a(M)(!0), ee.value = !1))
            }, b(a(t)("Clear only successful")), 3)
          ])) : A("", !0)
        ], 512),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: a(_) || !a($).length,
          onClick: de(re, ["prevent"])
        }, b(a(t)("Upload")), 9, ec),
        a(_) ? (p(), y("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[9] || (x[9] = de(
            //@ts-ignore
            (...E) => a(C) && a(C)(...E),
            ["prevent"]
          ))
        }, b(a(t)("Cancel")), 1)) : (p(), y("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[10] || (x[10] = de(
            //@ts-ignore
            (...E) => a(q) && a(q)(...E),
            ["prevent"]
          ))
        }, b(a(t)("Close")), 1)),
        i("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: ue,
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
            }, b(a(t)("Select Files")), 513),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": ee.value ? "true" : "false",
              onClick: x[11] || (x[11] = de((E) => ee.value = !ee.value, ["stop"]))
            }, [...x[19] || (x[19] = [
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
            ])], 8, tc)
          ], 2),
          ee.value ? (p(), y("div", nc, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[12] || (x[12] = (E) => {
                a(S)(), ee.value = !1;
              })
            }, b(a(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[13] || (x[13] = (E) => {
                a(v)?.click(), ee.value = !1;
              })
            }, b(a(t)("Select Folders")), 1),
            x[20] || (x[20] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: G(["vuefinder__upload-actions__item", a(_) ? "disabled" : ""]),
              onClick: x[14] || (x[14] = (E) => a(_) ? null : (a(M)(!1), ee.value = !1))
            }, b(a(t)("Clear all")), 3),
            i("div", {
              class: G(["vuefinder__upload-actions__item", a(_) ? "disabled" : ""]),
              onClick: x[15] || (x[15] = (E) => a(_) ? null : (a(M)(!0), ee.value = !1))
            }, b(a(t)("Clear only successful")), 3)
          ])) : A("", !0)
        ], 512)
      ]),
      default: X(() => [
        i("div", null, [
          L(Pe, {
            icon: a(bo),
            title: a(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          i("div", Od, [
            i("div", Ld, [
              i("div", Rd, b(a(t)("Hedef Klasör")), 1),
              i("div", Bd, [
                i("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: x[0] || (x[0] = (E) => d.value = !d.value)
                }, [
                  i("div", Vd, [
                    i("span", zd, b(r().storage) + "://", 1),
                    r().path ? (p(), y("span", Nd, b(r().path), 1)) : A("", !0)
                  ]),
                  i("span", Ud, b(a(t)("Browse")), 1)
                ])
              ]),
              i("div", {
                class: G([
                  "vuefinder__upload-modal__tree-selector",
                  d.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                L(dn, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    x[1] || (x[1] = (E) => l.value = E),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: u
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            i("div", Hd, b(a(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            i("div", {
              ref_key: "container",
              ref: f,
              class: "hidden"
            }, null, 512),
            i("div", jd, [
              (p(!0), y(ce, null, pe(a($), (E) => (p(), y("div", {
                key: E.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                i("span", {
                  class: G(["vuefinder__upload-modal__file-icon", a(I)(E)])
                }, [
                  i("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(a(N)(E))
                  }, null, 8, Kd)
                ], 2),
                i("div", qd, [
                  i("div", Wd, b(a(Zt)(E.name, 40)) + " (" + b(E.size) + ") ", 1),
                  i("div", Gd, b(a(Zt)(E.name, 16)) + " (" + b(E.size) + ") ", 1),
                  i("div", {
                    class: G(["vuefinder__upload-modal__file-status", a(I)(E)])
                  }, [
                    se(b(E.statusName) + " ", 1),
                    E.status === a(m).QUEUE_ENTRY_STATUS.UPLOADING ? (p(), y("b", Yd, b(E.percent), 1)) : A("", !0)
                  ], 2)
                ]),
                i("button", {
                  type: "button",
                  class: G(["vuefinder__upload-modal__file-remove", a(_) ? "disabled" : ""]),
                  title: a(t)("Delete"),
                  disabled: a(_),
                  onClick: (T) => a(V)(E)
                }, [...x[16] || (x[16] = [
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
                ])], 10, Qd)
              ]))), 128)),
              a($).length ? A("", !0) : (p(), y("div", Xd, b(a(t)("No files selected!")), 1))
            ]),
            a(F).length ? (p(), R(Ad, {
              key: 0,
              error: "",
              onHidden: x[2] || (x[2] = (E) => F.value = "")
            }, {
              default: X(() => [
                se(b(a(F)), 1)
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
}), oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function sc(n, e) {
  return p(), y("svg", oc, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const xo = { render: sc }, ic = { class: "vuefinder__unarchive-modal__content" }, ac = { class: "vuefinder__unarchive-modal__items" }, rc = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, lc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, dc = { class: "vuefinder__unarchive-modal__item-name" }, cc = { class: "vuefinder__unarchive-modal__info" }, gn = /* @__PURE__ */ J({
  __name: "ModalUnarchive",
  setup(n) {
    const e = Z(), t = e.fs, o = K(t.path), { t: s } = e.i18n, l = P(e.modal.data.items[0]), d = P(""), r = P([]), c = () => {
      e.adapter.unarchive({
        item: l.value.path,
        path: o.value.path
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: s("The file unarchived.") }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: s(u.message), type: "error" });
      });
    };
    return (u, f) => (p(), R(De, null, {
      buttons: X(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(a(s)("Unarchive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (h) => a(e).modal.close())
        }, b(a(s)("Cancel")), 1)
      ]),
      default: X(() => [
        i("div", null, [
          L(Pe, {
            icon: a(xo),
            title: a(s)("Unarchive")
          }, null, 8, ["icon", "title"]),
          i("div", ic, [
            i("div", ac, [
              (p(!0), y(ce, null, pe(r.value, (h) => (p(), y("p", {
                key: h.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                h.type === "dir" ? (p(), y("svg", rc, [...f[2] || (f[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (p(), y("svg", lc, [...f[3] || (f[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", dc, b(h.basename), 1)
              ]))), 128)),
              i("p", cc, b(a(s)("The archive will be unarchived at")) + " (" + b(a(o).path) + ") ", 1),
              d.value.length ? (p(), R(a(d), {
                key: 0,
                error: "",
                onHidden: f[0] || (f[0] = (h) => d.value = "")
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
function fc(n, e) {
  return p(), y("svg", uc, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const ko = { render: fc }, vc = { class: "vuefinder__archive-modal__content" }, pc = { class: "vuefinder__archive-modal__form" }, hc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, _c = {
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
}, gc = { class: "vuefinder__archive-modal__file-name" }, wc = ["placeholder"], wn = /* @__PURE__ */ J({
  __name: "ModalArchive",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.path), l = P(""), d = P(""), r = P(e.modal.data.items), c = () => {
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
    return (u, f) => (p(), R(De, null, {
      buttons: X(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(a(t)("Archive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[2] || (f[2] = (h) => a(e).modal.close())
        }, b(a(t)("Cancel")), 1)
      ]),
      default: X(() => [
        i("div", null, [
          L(Pe, {
            icon: a(ko),
            title: a(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          i("div", vc, [
            i("div", pc, [
              i("div", hc, [
                (p(!0), y(ce, null, pe(r.value, (h) => (p(), y("p", {
                  key: h.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  h.type === "dir" ? (p(), y("svg", _c, [...f[3] || (f[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (p(), y("svg", mc, [...f[4] || (f[4] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", gc, b(h.basename), 1)
                ]))), 128))
              ]),
              he(i("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (h) => l.value = h),
                class: "vuefinder__archive-modal__input",
                placeholder: a(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: ft(c, ["enter"])
              }, null, 40, wc), [
                [vt, l.value]
              ]),
              d.value.length ? (p(), R(a(d), {
                key: 0,
                error: "",
                onHidden: f[1] || (f[1] = (h) => d.value = "")
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
}), yc = { class: "vuefinder__about-modal__content" }, bc = { class: "vuefinder__about-modal__main" }, xc = { class: "vuefinder__about-modal__shortcuts" }, kc = { class: "vuefinder__about-modal__shortcut" }, $c = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Sc = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Cc = { class: "vuefinder__about-modal__shortcut" }, Fc = { class: "vuefinder__about-modal__shortcut" }, Dc = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, Ec = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, Pc = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, Tc = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, Ac = { class: "vuefinder__about-modal__shortcut" }, Mc = { class: "vuefinder__about-modal__shortcut" }, Ic = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, Oc = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, Lc = /* @__PURE__ */ J({
  __name: "ModalShortcuts",
  setup(n) {
    const e = Z(), { enabled: t } = Oe(), { t: o } = e.i18n;
    return (s, l) => (p(), R(De, null, {
      buttons: X(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (d) => a(e).modal.close())
        }, b(a(o)("Close")), 1)
      ]),
      default: X(() => [
        i("div", yc, [
          L(Pe, {
            icon: a(qn),
            title: a(o)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          i("div", bc, [
            i("div", xc, [
              i("div", kc, [
                i("div", null, b(a(o)("Refresh")), 1),
                l[1] || (l[1] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "R")
                ], -1))
              ]),
              a(t)("rename") ? (p(), y("div", $c, [
                i("div", null, b(a(o)("Rename")), 1),
                l[2] || (l[2] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "Shift"),
                  se(" + "),
                  i("kbd", null, "R")
                ], -1))
              ])) : A("", !0),
              a(t)("delete") ? (p(), y("div", Sc, [
                i("div", null, b(a(o)("Delete")), 1),
                l[3] || (l[3] = i("kbd", null, "Del", -1))
              ])) : A("", !0),
              i("div", Cc, [
                i("div", null, b(a(o)("Escape")), 1),
                l[4] || (l[4] = i("kbd", null, "Esc", -1))
              ]),
              i("div", Fc, [
                i("div", null, b(a(o)("Select All")), 1),
                l[5] || (l[5] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "A")
                ], -1))
              ]),
              a(t)("copy") ? (p(), y("div", Dc, [
                i("div", null, b(a(o)("Cut")), 1),
                l[6] || (l[6] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "X")
                ], -1))
              ])) : A("", !0),
              a(t)("copy") ? (p(), y("div", Ec, [
                i("div", null, b(a(o)("Copy")), 1),
                l[7] || (l[7] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "C")
                ], -1))
              ])) : A("", !0),
              a(t)("copy") ? (p(), y("div", Pc, [
                i("div", null, b(a(o)("Paste")), 1),
                l[8] || (l[8] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "V")
                ], -1))
              ])) : A("", !0),
              a(t)("search") ? (p(), y("div", Tc, [
                i("div", null, b(a(o)("Search")), 1),
                l[9] || (l[9] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "F")
                ], -1))
              ])) : A("", !0),
              i("div", Ac, [
                i("div", null, b(a(o)("Toggle Sidebar")), 1),
                l[10] || (l[10] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "E")
                ], -1))
              ]),
              i("div", Mc, [
                i("div", null, b(a(o)("Open Settings")), 1),
                l[11] || (l[11] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "S")
                ], -1))
              ]),
              a(t)("fullscreen") ? (p(), y("div", Ic, [
                i("div", null, b(a(o)("Toggle Full Screen")), 1),
                l[12] || (l[12] = i("div", null, [
                  i("kbd", null, "⌘"),
                  se(" + "),
                  i("kbd", null, "Enter")
                ], -1))
              ])) : A("", !0),
              a(t)("preview") ? (p(), y("div", Oc, [
                i("div", null, b(a(o)("Preview")), 1),
                l[13] || (l[13] = i("kbd", null, "Space", -1))
              ])) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Rc = { class: "vuefinder__menubar__container" }, Bc = ["onClick", "onMouseenter"], Vc = { class: "vuefinder__menubar__label" }, zc = ["onMouseenter"], Nc = ["onClick"], Uc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Hc = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, jc = /* @__PURE__ */ J({
  __name: "MenuBar",
  setup(n) {
    const e = Z(), { enabled: t } = Oe(), { t: o } = e?.i18n || { t: (m) => m }, s = e?.fs, l = e?.config, d = K(l.state), r = K(s.selectedItems), c = K(s?.storages || []), u = P(null), f = P(!1), h = j(() => window.opener !== null || window.name !== "" || window.history.length <= 1), v = j(() => [
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
            action: () => e?.modal?.open(yo, { items: r.value }),
            enabled: () => t("newfile")
          },
          { type: "separator" },
          {
            id: "upload",
            label: o("Upload"),
            action: () => e?.modal?.open(mn, { items: r.value }),
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
                m?.items?.size > 0 && e?.modal?.open(m.type === "cut" ? ot : cn, {
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
                  const m = e?.fs, S = {
                    storage: m?.path?.get()?.storage || "",
                    path: m?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(ot, { items: { from: r.value, to: S } });
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
                const S = e?.adapter?.getDownloadUrl({ path: m.path });
                S && await nl(S);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: o("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(Mt, { items: r.value });
            },
            enabled: () => r.value.length === 1 && t("rename")
          },
          {
            id: "delete",
            label: o("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(At, { items: r.value });
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
              const S = `${m}://`;
              s?.setPath(S), e?.adapter.list(S);
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
    ]), w = (m) => {
      u.value === m ? F() : (u.value = m, f.value = !0);
    }, $ = (m) => {
      f.value && (u.value = m);
    }, F = () => {
      u.value = null, f.value = !1;
    }, _ = (m) => {
      F(), m();
    }, g = (m) => {
      m.target.closest(".vuefinder__menubar") || F();
    };
    return ve(() => {
      document.addEventListener("click", g);
    }), xe(() => {
      document.removeEventListener("click", g);
    }), (m, S) => (p(), y("div", {
      class: "vuefinder__menubar",
      onClick: S[0] || (S[0] = de(() => {
      }, ["stop"]))
    }, [
      i("div", Rc, [
        (p(!0), y(ce, null, pe(v.value, (k) => (p(), y("div", {
          key: k.id,
          class: G(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": u.value === k.id }]),
          onClick: (C) => w(k.id),
          onMouseenter: (C) => $(k.id)
        }, [
          i("span", Vc, b(k.label), 1),
          u.value === k.id ? (p(), y("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (C) => $(k.id)
          }, [
            (p(!0), y(ce, null, pe(k.items, (C) => (p(), y("div", {
              key: C.id || C.type,
              class: G(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": C.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": C.enabled && !C.enabled(),
                "vuefinder__menubar__dropdown__item--checked": C.checked && C.checked()
              }]),
              onClick: de((V) => C.type !== "separator" && C.enabled && C.enabled() ? _(C.action) : null, ["stop"])
            }, [
              C.type !== "separator" ? (p(), y("span", Uc, b(C.label), 1)) : A("", !0),
              C.checked && C.checked() ? (p(), y("span", Hc, " ✓ ")) : A("", !0)
            ], 10, Nc))), 128))
          ], 40, zc)) : A("", !0)
        ], 42, Bc))), 128))
      ])
    ]));
  }
}), Kc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function qc(n, e) {
  return p(), y("svg", Kc, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Wc = { render: qc }, Gc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Yc(n, e) {
  return p(), y("svg", Gc, [...e[0] || (e[0] = [
    i("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Qc = { render: Yc }, Xc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Jc(n, e) {
  return p(), y("svg", Xc, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Zc = { render: Jc }, eu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function tu(n, e) {
  return p(), y("svg", eu, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const nu = { render: tu }, ou = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function su(n, e) {
  return p(), y("svg", ou, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const iu = { render: su }, au = { class: "vuefinder__toolbar" }, ru = { class: "vuefinder__toolbar__actions" }, lu = ["title"], du = ["title"], cu = ["title"], uu = ["title"], fu = ["title"], vu = ["title"], pu = ["title"], hu = { class: "vuefinder__toolbar__controls" }, _u = ["title"], mu = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, gu = ["title"], wu = { class: "relative" }, yu = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, bu = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, xu = { class: "vuefinder__toolbar__dropdown-content" }, ku = { class: "vuefinder__toolbar__dropdown-section" }, $u = { class: "vuefinder__toolbar__dropdown-label" }, Su = { class: "vuefinder__toolbar__dropdown-row" }, Cu = { value: "name" }, Fu = { value: "size" }, Du = { value: "modified" }, Eu = { value: "" }, Pu = { value: "asc" }, Tu = { value: "desc" }, Au = { class: "vuefinder__toolbar__dropdown-section" }, Mu = { class: "vuefinder__toolbar__dropdown-label" }, Iu = { class: "vuefinder__toolbar__dropdown-options" }, Ou = { class: "vuefinder__toolbar__dropdown-option" }, Lu = { class: "vuefinder__toolbar__option-text" }, Ru = { class: "vuefinder__toolbar__dropdown-option" }, Bu = { class: "vuefinder__toolbar__option-text" }, Vu = { class: "vuefinder__toolbar__dropdown-option" }, zu = { class: "vuefinder__toolbar__option-text" }, Nu = { class: "vuefinder__toolbar__dropdown-toggle" }, Uu = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Hu = { class: "vuefinder__toolbar__dropdown-reset" }, ju = ["title"], Ku = ["title"], qu = /* @__PURE__ */ J({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = Z(), { enabled: t } = Oe(), { t: o } = e.i18n, s = e.fs, l = e.config, d = K(l.state), r = K(s.selectedItems), c = K(s.sort), u = K(s.filter);
    le(
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
    const f = P(!1), h = (_) => {
      _.target.closest(".vuefinder__toolbar__dropdown-container") || (f.value = !1);
    };
    ve(() => {
      document.addEventListener("click", h);
    }), xe(() => {
      document.removeEventListener("click", h);
    });
    const v = P({
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
      (_) => {
        if (!v.value.sortOrder) {
          s.clearSort();
          return;
        }
        _ === "name" ? s.setSort("basename", v.value.sortOrder) : _ === "size" ? s.setSort("file_size", v.value.sortOrder) : _ === "modified" && s.setSort("last_modified", v.value.sortOrder);
      }
    ), le(
      () => v.value.sortOrder,
      (_) => {
        if (!_) {
          s.clearSort();
          return;
        }
        v.value.sortBy === "name" ? s.setSort("basename", _) : v.value.sortBy === "size" ? s.setSort("file_size", _) : v.value.sortBy === "modified" && s.setSort("last_modified", _);
      }
    ), le(
      c,
      (_) => {
        _.active ? (_.column === "basename" ? v.value.sortBy = "name" : _.column === "file_size" ? v.value.sortBy = "size" : _.column === "last_modified" && (v.value.sortBy = "modified"), v.value.sortOrder = _.order) : v.value.sortOrder = "";
      },
      { immediate: !0 }
    ), le(
      () => v.value.filterKind,
      (_) => {
        s.setFilter(_, d.value.showHiddenFiles);
      }
    ), le(
      () => v.value.showHidden,
      (_) => {
        l.set("showHiddenFiles", _), s.setFilter(v.value.filterKind, _);
      }
    ), le(
      u,
      (_) => {
        v.value.filterKind = _.kind;
      },
      { immediate: !0 }
    ), le(
      () => d.value.showHiddenFiles,
      (_) => {
        v.value.showHidden = _, s.setFilter(v.value.filterKind, _);
      },
      { immediate: !0 }
    );
    const w = () => l.set("view", d.value.view === "grid" ? "list" : "grid"), $ = j(() => u.value.kind !== "all" || !d.value.showHiddenFiles || c.value.active), F = () => {
      v.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), s.clearSort(), s.clearFilter();
    };
    return (_, g) => (p(), y("div", au, [
      i("div", ru, [
        a(t)("newfolder") ? (p(), y("div", {
          key: 0,
          class: "mx-1.5",
          title: a(o)("New Folder"),
          onClick: g[0] || (g[0] = (m) => a(e).modal.open(_n, { items: a(r) }))
        }, [
          L(a(go))
        ], 8, lu)) : A("", !0),
        a(t)("newfile") ? (p(), y("div", {
          key: 1,
          class: "mx-1.5",
          title: a(o)("New File"),
          onClick: g[1] || (g[1] = (m) => a(e).modal.open(yo, { items: a(r) }))
        }, [
          L(a(wo))
        ], 8, du)) : A("", !0),
        a(t)("rename") ? (p(), y("div", {
          key: 2,
          class: "mx-1.5",
          title: a(o)("Rename"),
          onClick: g[2] || (g[2] = (m) => a(r).length !== 1 || a(e).modal.open(Mt, { items: a(r) }))
        }, [
          L(a(Yn), {
            class: G(a(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, cu)) : A("", !0),
        a(t)("delete") ? (p(), y("div", {
          key: 3,
          class: "mx-1.5",
          title: a(o)("Delete"),
          onClick: g[3] || (g[3] = (m) => !a(r).length || a(e).modal.open(At, { items: a(r) }))
        }, [
          L(a(Gn), {
            class: G(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, uu)) : A("", !0),
        a(t)("upload") ? (p(), y("div", {
          key: 4,
          class: "mx-1.5",
          title: a(o)("Upload"),
          onClick: g[4] || (g[4] = (m) => a(e).modal.open(mn, { items: a(r) }))
        }, [
          L(a(bo))
        ], 8, fu)) : A("", !0),
        a(t)("unarchive") && a(r).length === 1 && a(r)[0].mime_type === "application/zip" ? (p(), y("div", {
          key: 5,
          class: "mx-1.5",
          title: a(o)("Unarchive"),
          onClick: g[5] || (g[5] = (m) => !a(r).length || a(e).modal.open(gn, { items: a(r) }))
        }, [
          L(a(xo), {
            class: G(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, vu)) : A("", !0),
        a(t)("archive") ? (p(), y("div", {
          key: 6,
          class: "mx-1.5",
          title: a(o)("Archive"),
          onClick: g[6] || (g[6] = (m) => !a(r).length || a(e).modal.open(wn, { items: a(r) }))
        }, [
          L(a(ko), {
            class: G(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, pu)) : A("", !0)
      ]),
      i("div", hu, [
        a(t)("search") ? (p(), y("div", {
          key: 0,
          class: "mx-1.5",
          title: a(o)("Search Files"),
          onClick: g[7] || (g[7] = (m) => a(e).modal.open(hn))
        }, [
          L(a(un), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, _u)) : A("", !0),
        i("div", mu, [
          i("div", {
            title: a(o)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: g[8] || (g[8] = (m) => f.value = !f.value)
          }, [
            i("div", wu, [
              L(a(iu), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              $.value ? (p(), y("div", yu)) : A("", !0)
            ])
          ], 8, gu),
          f.value ? (p(), y("div", bu, [
            i("div", xu, [
              i("div", ku, [
                i("div", $u, b(a(o)("Sorting")), 1),
                i("div", Su, [
                  he(i("select", {
                    "onUpdate:modelValue": g[9] || (g[9] = (m) => v.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", Cu, b(a(o)("Name")), 1),
                    i("option", Fu, b(a(o)("Size")), 1),
                    i("option", Du, b(a(o)("Date")), 1)
                  ], 512), [
                    [Yt, v.value.sortBy]
                  ]),
                  he(i("select", {
                    "onUpdate:modelValue": g[10] || (g[10] = (m) => v.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", Eu, b(a(o)("None")), 1),
                    i("option", Pu, b(a(o)("Asc")), 1),
                    i("option", Tu, b(a(o)("Desc")), 1)
                  ], 512), [
                    [Yt, v.value.sortOrder]
                  ])
                ])
              ]),
              i("div", Au, [
                i("div", Mu, b(a(o)("Show")), 1),
                i("div", Iu, [
                  i("label", Ou, [
                    he(i("input", {
                      "onUpdate:modelValue": g[11] || (g[11] = (m) => v.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, v.value.filterKind]
                    ]),
                    i("span", Lu, b(a(o)("All items")), 1)
                  ]),
                  i("label", Ru, [
                    he(i("input", {
                      "onUpdate:modelValue": g[12] || (g[12] = (m) => v.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, v.value.filterKind]
                    ]),
                    i("span", Bu, b(a(o)("Files only")), 1)
                  ]),
                  i("label", Vu, [
                    he(i("input", {
                      "onUpdate:modelValue": g[13] || (g[13] = (m) => v.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, v.value.filterKind]
                    ]),
                    i("span", zu, b(a(o)("Folders only")), 1)
                  ])
                ])
              ]),
              i("div", Nu, [
                i("label", Uu, b(a(o)("Show hidden files")), 1),
                he(i("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": g[14] || (g[14] = (m) => v.value.showHidden = m),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [en, v.value.showHidden]
                ])
              ]),
              i("div", Hu, [
                i("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: F
                }, b(a(o)("Reset")), 1)
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
          a(d).fullScreen ? (p(), R(a(Qc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (p(), R(a(Wc), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, ju)) : A("", !0),
        i("div", {
          class: "mx-1.5",
          title: a(o)("Change View"),
          onClick: g[16] || (g[16] = (m) => w())
        }, [
          a(d).view === "grid" ? (p(), R(a(Zc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : A("", !0),
          a(d).view === "list" ? (p(), R(a(nu), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : A("", !0)
        ], 8, Ku)
      ])
    ]));
  }
}), Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Gu(n, e) {
  return p(), y("svg", Wu, [...e[0] || (e[0] = [
    i("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Yu = { render: Gu }, Qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Xu(n, e) {
  return p(), y("svg", Qu, [...e[0] || (e[0] = [
    i("path", {
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
function ef(n, e) {
  return p(), y("svg", Zu, [...e[0] || (e[0] = [
    i("path", {
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
function of(n, e) {
  return p(), y("svg", nf, [...e[0] || (e[0] = [
    i("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const sf = { render: of }, af = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function rf(n, e) {
  return p(), y("svg", af, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const lf = { render: rf }, df = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function cf(n, e) {
  return p(), y("svg", df, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const uf = { render: cf }, ff = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function vf(n, e) {
  return p(), y("svg", ff, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const pf = { render: vf }, hf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function _f(n, e) {
  return p(), y("svg", hf, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const mf = { render: _f };
function ht(n, e = []) {
  const t = "vfDragEnterCounter", o = n.fs, s = K(o.selectedItems);
  function l(f, h) {
    if (f.isExternalDrag)
      return;
    if (!(n.features?.move ?? !1)) {
      f.dataTransfer && (f.dataTransfer.dropEffect = "none", f.dataTransfer.effectAllowed = "none");
      return;
    }
    f.preventDefault(), o.getDraggedItem() === h.path || !h || h.type !== "dir" || s.value.some(
      ($) => $.path === h.path || el($.path) === h.path
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
    const v = f.currentTarget, $ = Number(v.dataset[t] || 0) - 1;
    $ <= 0 ? (delete v.dataset[t], v.classList.remove(...e)) : v.dataset[t] = String($);
  }
  function c(f, h) {
    if (f.isExternalDrag || !(n.features?.move ?? !1) || !h) return;
    f.preventDefault();
    const w = f.currentTarget;
    delete w.dataset[t], w.classList.remove(...e);
    const $ = f.dataTransfer?.getData("items") || "[]", _ = JSON.parse($).map(
      (g) => o.sortedFiles.get().find((m) => m.path === g)
    );
    o.clearDraggedItem(), n.modal.open(ot, { items: { from: _, to: h } });
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
const gf = { class: "vuefinder__breadcrumb__container" }, wf = ["title"], yf = ["title"], bf = ["title"], xf = ["title"], kf = { class: "vuefinder__breadcrumb__path-container" }, $f = { class: "vuefinder__breadcrumb__list" }, Sf = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Cf = { class: "relative" }, Ff = ["title", "onClick"], Df = ["title"], Ef = { class: "vuefinder__breadcrumb__path-mode" }, Pf = { class: "vuefinder__breadcrumb__path-mode-content" }, Tf = ["title"], Af = { class: "vuefinder__breadcrumb__path-text" }, Mf = ["title"], If = ["data-theme"], Of = ["onClick"], Lf = { class: "vuefinder__breadcrumb__hidden-item-content" }, Rf = { class: "vuefinder__breadcrumb__hidden-item-text" }, Bf = /* @__PURE__ */ J({
  __name: "Breadcrumb",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = e.config, l = K(s.state), d = K(o.path), r = K(o.loading), c = P(null), u = Jn(0, 100), f = P(5), h = P(!1), v = P(!1), w = j(() => d.value?.breadcrumb ?? []);
    function $(Y, D) {
      return Y.length > D ? [Y.slice(-D), Y.slice(0, -D)] : [Y, []];
    }
    const F = j(
      () => $(w.value, f.value)[0]
    ), _ = j(
      () => $(w.value, f.value)[1]
    );
    le(u, () => {
      if (!c.value) return;
      const Y = c.value.children;
      let D = 0, x = 0;
      const E = 5, T = 1;
      f.value = E, Ae(() => {
        for (let U = Y.length - 1; U >= 0; U--) {
          const Q = Y[U];
          if (D + Q.offsetWidth > u.value - 40)
            break;
          D += parseInt(Q.offsetWidth.toString(), 10), x++;
        }
        x < T && (x = T), x > E && (x = E), f.value = x;
      });
    });
    const g = () => {
      c.value && (u.value = c.value.offsetWidth);
    }, m = P(null);
    ve(() => {
      m.value = new ResizeObserver(g), c.value && m.value.observe(c.value);
    }), xe(() => {
      m.value && m.value.disconnect();
    });
    const S = ht(e, ["vuefinder__drag-over"]);
    function k(Y = null) {
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
    }, M = (Y) => {
      e.adapter.open(Y.path), h.value = !1;
    }, q = () => {
      h.value && (h.value = !1);
    }, I = {
      mounted(Y, D) {
        Y.clickOutsideEvent = function(x) {
          Y === x.target || Y.contains(x.target) || D.value();
        }, document.body.addEventListener("click", Y.clickOutsideEvent);
      },
      beforeUnmount(Y) {
        document.body.removeEventListener("click", Y.clickOutsideEvent);
      }
    }, N = () => {
      s.toggle("showTreeView");
    }, te = P({
      x: 0,
      y: 0
    }), re = (Y, D = null) => {
      if (Y.currentTarget instanceof HTMLElement) {
        const { x, y: E, height: T } = Y.currentTarget.getBoundingClientRect();
        te.value = { x, y: E + T };
      }
      h.value = D ?? !h.value;
    }, ee = () => {
      v.value = !v.value;
    }, ie = async () => {
      await ut(d.value?.path || ""), e.emitter.emit("vf-toast-push", { label: t("Path copied to clipboard") });
    }, ue = () => {
      v.value = !1;
    };
    return (Y, D) => (p(), y("div", gf, [
      i("span", {
        title: a(t)("Toggle Tree View")
      }, [
        L(a(uf), {
          class: G(["vuefinder__breadcrumb__toggle-tree", a(l).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: N
        }, null, 8, ["class"])
      ], 8, wf),
      i("span", {
        title: a(t)("Go up a directory")
      }, [
        L(a(Ju), Te({
          class: w.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, Ke(w.value.length ? a(S).events(k()) : {}), { onClick: V }), null, 16, ["class"])
      ], 8, yf),
      a(o).isLoading() ? (p(), y("span", {
        key: 1,
        title: a(t)("Cancel")
      }, [
        L(a(tf), {
          onClick: D[0] || (D[0] = (x) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, xf)) : (p(), y("span", {
        key: 0,
        title: a(t)("Refresh")
      }, [
        L(a(Yu), { onClick: C })
      ], 8, bf)),
      he(i("div", kf, [
        i("div", null, [
          L(a(sf), Te({ class: "vuefinder__breadcrumb__home-icon" }, Ke(a(S).events(k(-1))), {
            onClick: D[1] || (D[1] = de((x) => a(e).adapter.open(a(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        i("div", $f, [
          _.value.length ? he((p(), y("div", Sf, [
            D[3] || (D[3] = i("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("div", Cf, [
              i("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: D[2] || (D[2] = (x) => re(x, !0)),
                onClick: de(re, ["stop"])
              }, [
                L(a(_o), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [I, q]
          ]) : A("", !0)
        ]),
        i("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (p(!0), y(ce, null, pe(F.value, (x, E) => (p(), y("div", { key: E }, [
            D[4] || (D[4] = i("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("span", Te({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: x.basename
            }, Ke(a(S).events(x), !0), {
              onClick: de((T) => a(e).adapter.open(x.path), ["stop"])
            }), b(x.name), 17, Ff)
          ]))), 128))
        ], 512),
        a(s).get("loadingIndicator") === "circular" && a(r) ? (p(), R(a(Rt), { key: 0 })) : A("", !0),
        i("span", {
          title: a(t)("Toggle Path Copy Mode"),
          onClick: ee
        }, [
          L(a(mf), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Df)
      ], 512), [
        [ze, !v.value]
      ]),
      he(i("div", Ef, [
        i("div", Pf, [
          i("div", {
            title: a(t)("Copy Path")
          }, [
            L(a(pf), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: ie
            })
          ], 8, Tf),
          i("div", Af, b(a(d).path), 1),
          i("div", {
            title: a(t)("Exit")
          }, [
            L(a(lf), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: ue
            })
          ], 8, Mf)
        ])
      ], 512), [
        [ze, v.value]
      ]),
      (p(), R(Pt, { to: "body" }, [
        i("div", null, [
          he(i("div", {
            style: Ne({
              position: "absolute",
              top: te.value.y + "px",
              left: te.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": a(e).theme.current
          }, [
            (p(!0), y(ce, null, pe(_.value, (x, E) => (p(), y("div", Te({
              key: E,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Ke(a(S).events(x), !0), {
              onClick: (T) => M(x)
            }), [
              i("div", Lf, [
                i("span", null, [
                  L(a(Ue), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                i("span", Rf, b(x.name), 1)
              ])
            ], 16, Of))), 128))
          ], 12, If), [
            [ze, h.value]
          ])
        ])
      ]))
    ]));
  }
});
function Vf(n, e) {
  const {
    scrollContainer: t,
    itemWidth: o = 100,
    rowHeight: s,
    overscan: l = 2,
    containerPadding: d = 48,
    lockItemsPerRow: r
  } = e, c = n, u = () => typeof s == "number" ? s : s.value, f = P(0), h = P(6), v = P(600);
  let w = null;
  const $ = j(() => Math.ceil(c.value.length / h.value)), F = j(() => $.value * u()), _ = j(() => {
    const I = u(), N = Math.max(0, Math.floor(f.value / I) - l), te = Math.min(
      $.value,
      Math.ceil((f.value + v.value) / I) + l
    );
    return { start: N, end: te };
  }), g = j(() => {
    const { start: I, end: N } = _.value;
    return Array.from({ length: N - I }, (te, re) => I + re);
  }), m = () => v.value, S = () => r.value, k = () => {
    if (S()) {
      h.value = 1;
      return;
    }
    if (t.value) {
      const I = t.value.clientWidth - d;
      h.value = Math.max(Math.floor(I / o), 2);
    }
  }, C = (I) => {
    const N = I.target;
    f.value = N.scrollTop;
  };
  le(
    () => c.value.length,
    () => {
      k();
    }
  );
  const V = (I, N) => {
    if (!I || !Array.isArray(I))
      return [];
    const te = N * h.value;
    return I.slice(te, te + h.value);
  }, M = (I, N, te, re, ee) => {
    if (!I || !Array.isArray(I))
      return [];
    const ie = [];
    for (let ue = N; ue <= te; ue++)
      for (let Y = re; Y <= ee; Y++) {
        const D = ue * h.value + Y;
        D < I.length && I[D] && ie.push(I[D]);
      }
    return ie;
  }, q = (I) => ({
    row: Math.floor(I / h.value),
    col: I % h.value
  });
  return ve(async () => {
    await Ae(), t.value && (v.value = t.value.clientHeight || 600), k(), window.addEventListener("resize", () => {
      t.value && (v.value = t.value.clientHeight || 600), k();
    }), t.value && "ResizeObserver" in window && (w = new ResizeObserver((I) => {
      const N = I[0];
      N && (v.value = Math.round(N.contentRect.height)), k();
    }), w.observe(t.value));
  }), xe(() => {
    window.removeEventListener("resize", k), w && (w.disconnect(), w = null);
  }), {
    scrollTop: f,
    itemsPerRow: h,
    totalRows: $,
    totalHeight: F,
    visibleRange: _,
    visibleRows: g,
    updateItemsPerRow: k,
    handleScroll: C,
    getRowItems: V,
    getItemsInRange: M,
    getItemPosition: q,
    getContainerHeight: m
  };
}
function zf(n) {
  const { getItemPosition: e, getItemsInRange: t, getKey: o, selectionObject: s, rowHeight: l, itemWidth: d } = n, r = Math.floor(Math.random() * 2 ** 32).toString(), c = Z(), u = c.fs, f = K(u.selectedKeys), h = K(u.sortedFiles), v = P(/* @__PURE__ */ new Set()), w = P(!1), $ = P(!1), F = P(null), _ = (D) => D.map((x) => x.getAttribute("data-key")).filter((x) => !!x), g = (D) => {
    D.selection.getSelection().forEach((x) => {
      D.selection.deselect(x, !0);
    });
  }, m = (D) => {
    f.value && f.value.forEach((x) => {
      const E = document.querySelector(`[data-key="${x}"]`);
      E && S(x) && D.selection.select(E, !0);
    });
  }, S = (D) => {
    const x = h.value?.find((U) => o(U) === D);
    if (!x) return !1;
    const E = c.selectionFilterType, T = c.selectionFilterMimeIncludes;
    return E === "files" && x.type === "dir" || E === "dirs" && x.type === "file" ? !1 : T && Array.isArray(T) && T.length > 0 ? x.type === "dir" ? !0 : x.mime_type ? T.some((U) => x.mime_type?.startsWith(U)) : !1 : !0;
  }, k = (D) => {
    if (D.size === 0) return null;
    const E = Array.from(D).map((fe) => {
      const Ve = h.value?.findIndex((He) => o(He) === fe) ?? -1;
      return e(Ve >= 0 ? Ve : 0);
    }), T = Math.min(...E.map((fe) => fe.row)), U = Math.max(...E.map((fe) => fe.row)), Q = Math.min(...E.map((fe) => fe.col)), _e = Math.max(...E.map((fe) => fe.col));
    return { minRow: T, maxRow: U, minCol: Q, maxCol: _e };
  }, C = (D) => {
    if (c.selectionMode === "single")
      return !1;
    w.value = !1, !D.event?.metaKey && !D.event?.ctrlKey && ($.value = !0), D.selection.resolveSelectables(), g(D), m(D);
  }, V = P(0), M = (D) => {
    const x = D;
    if (x && "touches" in x) {
      const E = x.touches?.[0];
      if (E) return { x: E.clientX, y: E.clientY };
    }
    if (x && "changedTouches" in x) {
      const E = x.changedTouches?.[0];
      if (E) return { x: E.clientX, y: E.clientY };
    }
    if (x && "clientX" in x && "clientY" in x) {
      const E = x;
      return { x: E.clientX, y: E.clientY };
    }
    return null;
  }, q = ({ event: D, selection: x }) => {
    V.value = (s.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const E = document.querySelector(
      ".selection-area-container"
    );
    if (E && (E.dataset.theme = c.theme.current), c.selectionMode === "single")
      return;
    const T = D;
    T && "type" in T && T.type === "touchend" && T.preventDefault();
    const U = D;
    if (!U?.ctrlKey && !U?.metaKey && (u.clearSelection(), x.clearSelection(!0, !0)), v.value.clear(), s.value) {
      const Q = s.value.getSelectables()[0]?.closest(".scroller-" + r);
      if (Q) {
        const _e = Q.getBoundingClientRect(), fe = M(D);
        if (fe) {
          const Ve = fe.y - _e.top + Q.scrollTop, He = fe.x - _e.left, Ze = Math.floor(Ve / l.value), at = Math.floor(He / d);
          F.value = { row: Ze, col: at };
        }
      }
    }
  }, I = (D) => {
    if (c.selectionMode === "single")
      return;
    const x = D.selection, E = _(D.store.changed.added), T = _(D.store.changed.removed);
    $.value = !1, w.value = !0, E.forEach((U) => {
      f.value && !f.value.has(U) && S(U) && (v.value.add(U), u.select(U, c.selectionMode || "multiple"));
    }), T.forEach((U) => {
      document.querySelector(`[data-key="${U}"]`) && h.value?.find((_e) => o(_e) === U) && v.value.delete(U), u.deselect(U);
    }), x.resolveSelectables(), m(D);
  }, N = () => {
    v.value.clear();
  }, te = (D) => {
    if (D.event && F.value && v.value.size > 0) {
      const E = Array.from(v.value).map((T) => {
        const U = h.value?.findIndex((Q) => o(Q) === T) ?? -1;
        return U >= 0 ? e(U) : null;
      }).filter((T) => T !== null);
      if (E.length > 0) {
        const T = [...E, F.value], U = {
          minRow: Math.min(...T.map((Q) => Q.row)),
          maxRow: Math.max(...T.map((Q) => Q.row)),
          minCol: Math.min(...T.map((Q) => Q.col)),
          maxCol: Math.max(...T.map((Q) => Q.col))
        };
        t(
          h.value || [],
          U.minRow,
          U.maxRow,
          U.minCol,
          U.maxCol
        ).forEach((Q) => {
          const _e = o(Q);
          document.querySelector(`[data-key="${_e}"]`) || u.select(_e, c.selectionMode || "multiple");
        });
      }
    }
  }, re = (D) => {
    te(D), g(D), m(D), u.setSelectedCount(f.value?.size || 0), w.value = !1, F.value = null;
  }, ee = () => {
    s.value = new No({
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
  }, ie = () => {
    s.value && (s.value.destroy(), s.value = null);
  }, ue = () => {
    s.value && (Array.from(
      f.value ?? /* @__PURE__ */ new Set()
    ).forEach((x) => {
      S(x) || u.deselect(x);
    }), ie(), ee());
  }, Y = (D) => {
    $.value && (s.value?.clearSelection(), N(), $.value = !1);
    const x = D;
    !v.value.size && !$.value && !x?.ctrlKey && !x?.metaKey && (u.clearSelection(), s.value?.clearSelection());
  };
  return ve(() => {
    const D = (x) => {
      !x.buttons && w.value && (w.value = !1);
    };
    document.addEventListener("dragleave", D), xe(() => {
      document.removeEventListener("dragleave", D);
    });
  }), {
    isDragging: w,
    selectionStarted: $,
    explorerId: r,
    extractIds: _,
    cleanupSelection: g,
    refreshSelection: m,
    getSelectionRange: k,
    selectSelectionRange: te,
    initializeSelectionArea: ee,
    destroySelectionArea: ie,
    updateSelectionArea: ue,
    handleContentClick: Y
  };
}
const Nf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Uf(n, e) {
  return p(), y("svg", Nf, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Hf = { render: Uf }, jf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Kf(n, e) {
  return p(), y("svg", jf, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const qf = { render: Kf }, Gt = /* @__PURE__ */ J({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (p(), y("div", null, [
      n.direction === "asc" ? (p(), R(a(Hf), { key: 0 })) : A("", !0),
      n.direction === "desc" ? (p(), R(a(qf), { key: 1 })) : A("", !0)
    ]));
  }
}), Wf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Gf(n, e) {
  return p(), y("svg", Wf, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const An = { render: Gf }, Yf = { class: "vuefinder__drag-item__container" }, Qf = { class: "vuefinder__drag-item__count" }, Xf = /* @__PURE__ */ J({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, o) => (p(), y("div", Yf, [
      e.count > 1 ? (p(), R(a(An), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : A("", !0),
      L(a(An), { class: "vuefinder__drag-item__icon" }),
      i("div", Qf, b(e.count), 1)
    ]));
  }
}), Jf = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Mn = /* @__PURE__ */ J({
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
      Fe(l.$slots, "icon", tt(nt(s)), () => [
        n.item.type === "dir" ? (p(), R(a(Ue), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (p(), R(a(yt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (p(), y("div", Jf, b(n.item.extension.substring(0, 3)), 1)) : A("", !0)
      ])
    ], 2));
  }
}), Zf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function ev(n, e) {
  return p(), y("svg", Zf, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const In = { render: ev }, tv = ["data-key", "data-row", "data-col", "draggable"], nv = { key: 0 }, ov = { class: "vuefinder__explorer__item-grid-content" }, sv = ["data-src", "alt"], iv = { class: "vuefinder__explorer__item-title" }, av = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, rv = { class: "vuefinder__explorer__item-list-name" }, lv = { class: "vuefinder__explorer__item-list-icon" }, dv = { class: "vuefinder__explorer__item-name" }, cv = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, uv = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, fv = { key: 0 }, vv = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, pv = /* @__PURE__ */ J({
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
      const S = s.selectionFilterType;
      return !S || S === "both" ? !0 : S === "files" && t.item.type === "file" || S === "dirs" && t.item.type === "dir";
    }), c = j(() => {
      const S = s.selectionFilterMimeIncludes;
      return !S || !S.length || t.item.type === "dir" ? !0 : t.item.mime_type ? S.some((k) => t.item.mime_type?.startsWith(k)) : !1;
    }), u = j(() => r.value && c.value), f = j(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      u.value ? "" : "vf-explorer-item--unselectable"
    ]), h = j(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !u.value ? 0.5 : ""
    }));
    let v = null;
    const w = P(null);
    let $ = !1;
    const { enabled: F } = Oe(), _ = j(() => F("move")), g = () => {
      v && clearTimeout(v);
    }, m = (S) => {
      if (v && (S.preventDefault(), clearTimeout(v)), !$)
        $ = !0, o("click", S), w.value = setTimeout(() => {
          $ = !1;
        }, 300);
      else
        return $ = !1, o("dblclick", S), v && clearTimeout(v), !1;
      if (S.currentTarget && S.currentTarget instanceof HTMLElement) {
        const k = S.currentTarget.getBoundingClientRect();
        S.preventDefault(), v = setTimeout(() => {
          let M = k.y + k.height;
          M + 146 > window.innerHeight - 10 && (M = k.y - 146), M < 10 && (M = 10);
          const q = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: k.x,
            clientY: M
          });
          S.target?.dispatchEvent(q);
        }, 300);
      }
    };
    return (S, k) => (p(), y("div", {
      class: G(f.value),
      style: Ne(h.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: _.value,
      onTouchstart: k[1] || (k[1] = (C) => m(C)),
      onTouchend: k[2] || (k[2] = (C) => g()),
      onClick: k[3] || (k[3] = (C) => o("click", C)),
      onDblclick: k[4] || (k[4] = (C) => o("dblclick", C)),
      onContextmenu: k[5] || (k[5] = de((C) => o("contextmenu", C), ["prevent", "stop"])),
      onDragstart: k[6] || (k[6] = (C) => o("dragstart", C)),
      onDragend: k[7] || (k[7] = (C) => o("dragend", C))
    }, [
      n.view === "grid" ? (p(), y("div", nv, [
        a(l).isReadOnly(n.item) ? (p(), R(a(In), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : A("", !0),
        i("div", ov, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (p(), y("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": a(s).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: k[0] || (k[0] = (C) => C.preventDefault())
          }, null, 40, sv)) : (p(), R(Mn, {
            key: 1,
            item: n.item,
            ext: !0
          }, {
            icon: X((C) => [
              Fe(S.$slots, "icon", tt(nt(C)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        i("span", iv, b(a(Zt)(n.item.basename)), 1)
      ])) : (p(), y("div", av, [
        i("div", rv, [
          i("div", lv, [
            L(Mn, {
              item: n.item,
              small: n.compact
            }, {
              icon: X((C) => [
                Fe(S.$slots, "icon", tt(nt(C)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          i("span", dv, b(n.item.basename), 1),
          i("div", null, [
            a(l).isReadOnly(n.item) ? (p(), R(a(In), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : A("", !0)
          ])
        ]),
        n.showPath ? (p(), y("div", cv, b(n.item.path), 1)) : A("", !0),
        n.showPath ? A("", !0) : (p(), y("div", uv, [
          n.item.file_size ? (p(), y("div", fv, b(a(s).filesize(n.item.file_size)), 1)) : A("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (p(), y("div", vv, b(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : A("", !0)
      ])),
      a(F)("pinned") && a(d).get("pinnedFolders").find((C) => C.path === n.item.path) ? (p(), R(a(an), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : A("", !0)
    ], 46, tv));
  }
}), hv = ["data-row"], On = /* @__PURE__ */ J({
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
      style: Ne(l.value)
    }, [
      i("div", {
        class: G(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Ne(d.value)
      }, [
        (p(!0), y(ce, null, pe(n.items, (u, f) => (p(), R(pv, Te({
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
          icon: X((h) => [
            Fe(r.$slots, "icon", Te({ ref_for: !0 }, h))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, hv));
  }
}), _v = ["onClick"], mv = /* @__PURE__ */ J({
  __name: "Toast",
  setup(n) {
    const e = Z(), { getStore: t } = e.storage, o = P(t("full-screen", !1)), s = P([]), l = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", d = (c) => {
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
      L(To, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: X(() => [
          (p(!0), y(ce, null, pe(s.value, (f, h) => (p(), y("div", {
            key: h,
            class: G(["vuefinder__toast__message", l(f.type)]),
            onClick: (v) => d(h)
          }, b(f.label), 11, _v))), 128))
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
}, xv = /* @__PURE__ */ J({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = Z(), o = ht(t, ["vuefinder__drag-over"]), s = je("dragImage"), l = Ln(null), d = je("scrollContainer"), r = je("scrollContent"), c = t.fs, u = t.config, f = K(u.state), h = K(c.sort), v = K(c.sortedFiles), w = K(c.selectedKeys), $ = K(c.loading), F = (z) => w.value?.has(z) ?? !1;
    let _ = null;
    const g = P(null), m = je("customScrollBar"), S = je("customScrollBarContainer"), k = j(() => {
      const z = f.value.view, ne = f.value.compactListView;
      return z === "grid" ? 88 : ne ? 24 : 50;
    }), { t: C } = t.i18n, {
      itemsPerRow: V,
      totalHeight: M,
      visibleRows: q,
      handleScroll: I,
      getRowItems: N,
      getItemsInRange: te,
      getItemPosition: re,
      updateItemsPerRow: ee
    } = Vf(
      j(() => v.value ?? []),
      {
        scrollContainer: d,
        itemWidth: 104,
        rowHeight: k,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: j(() => f.value.view === "list")
      }
    ), {
      explorerId: ie,
      isDragging: ue,
      initializeSelectionArea: Y,
      destroySelectionArea: D,
      updateSelectionArea: x,
      handleContentClick: E
    } = zf({
      getItemPosition: re,
      getItemsInRange: te,
      getKey: (z) => z.path,
      selectionObject: l,
      rowHeight: k,
      itemWidth: 104
    }), T = P(null), U = (z) => {
      if (!z || !T.value) return !1;
      const ne = w.value?.has(T.value) ?? !1;
      return ue.value && (ne ? w.value?.has(z) ?? !1 : z === T.value);
    };
    le(
      () => u.get("view"),
      (z) => {
        z === "list" ? V.value = 1 : ee();
      },
      { immediate: !0 }
    ), le(V, (z) => {
      u.get("view") === "list" && z !== 1 && (V.value = 1);
    });
    const Q = (z) => v.value?.[z];
    ve(() => {
      if (Y(), l.value && l.value.on("beforestart", ({ event: z }) => {
        const ne = z?.target === r.value;
        if (!z?.metaKey && !z?.ctrlKey && !z?.altKey && !ne)
          return !1;
      }), d.value && (_ = new Nn({
        elements_selector: ".lazy",
        container: d.value
      })), le(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], x, {
        deep: !0
      }), S.value) {
        const z = Tt(
          S.value,
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
        g.value = z;
      }
      d.value && d.value.addEventListener("scroll", () => {
        const z = g.value;
        if (!z) return;
        const { scrollOffsetElement: ne } = z.elements();
        ne.scrollTo({
          top: d.value.scrollTop,
          left: 0
        });
      });
    }), ve(() => {
      t.emitter.on("vf-refresh-thumbnails", () => {
        _ && _.update();
      });
    }), Ao(() => {
      if (_ && _.update(), g.value && m.value && d.value) {
        const ne = d.value.scrollHeight > d.value.clientHeight, oe = m.value;
        oe.style.display = ne ? "block" : "none", oe.style.height = `${M.value}px`;
      }
    }), xe(() => {
      D(), _ && (_.destroy(), _ = null), g.value && (g.value.destroy(), g.value = null);
    });
    const _e = (z) => {
      const ne = z.target?.closest(".file-item-" + ie), oe = z;
      if (ne) {
        const ae = String(ne.getAttribute("data-key")), O = v.value?.find(($e) => $e.path === ae), B = t.selectionFilterType, H = t.selectionFilterMimeIncludes, W = !B || B === "both" || B === "files" && O?.type === "file" || B === "dirs" && O?.type === "dir";
        let me = !0;
        if (H && Array.isArray(H) && H.length > 0 && (O?.type === "dir" ? me = !0 : O?.mime_type ? me = H.some(($e) => (O?.mime_type).startsWith($e)) : me = !1), !W || !me)
          return;
        const ke = t.selectionMode || "multiple";
        !oe?.ctrlKey && !oe?.metaKey && (z.type !== "touchstart" || !c.isSelected(ae)) && (c.clearSelection(), l.value?.clearSelection(!0, !0)), l.value?.resolveSelectables(), z.type === "touchstart" && c.isSelected(ae) ? c.select(ae, ke) : c.toggleSelect(ae, ke);
      }
      c.setSelectedCount(w.value?.size || 0);
    }, fe = (z) => {
      if (z.type === "file" && e.onFileDclick) {
        t.emitter.emit("vf-file-dclick", z);
        return;
      }
      if (z.type === "dir" && e.onFolderDclick) {
        t.emitter.emit("vf-folder-dclick", z);
        return;
      }
      const ne = t.contextMenuItems?.find((oe) => oe.show(t, {
        items: [z],
        target: z,
        searchQuery: ""
      }));
      ne && ne.action(t, [z]);
    }, Ve = (z) => {
      const ne = z.target?.closest(
        ".file-item-" + ie
      ), oe = ne ? String(ne.getAttribute("data-key")) : null;
      if (!oe) return;
      const ae = v.value?.find((me) => me.path === oe), O = t.selectionFilterType, B = t.selectionFilterMimeIncludes, H = !O || O === "both" || O === "files" && ae?.type === "file" || O === "dirs" && ae?.type === "dir";
      let W = !0;
      B && Array.isArray(B) && B.length > 0 && (ae?.type === "dir" ? W = !0 : ae?.mime_type ? W = B.some((me) => (ae?.mime_type).startsWith(me)) : W = !1), !(!H || !W) && ae && fe(ae);
    }, He = () => {
      const z = w.value;
      return v.value?.filter((ne) => z?.has(ne.path)) || [];
    }, Ze = (z) => {
      z.preventDefault();
      const ne = z.target?.closest(
        ".file-item-" + ie
      );
      if (ne) {
        const oe = String(ne.getAttribute("data-key")), ae = v.value?.find((me) => me.path === oe), O = t.selectionFilterType, B = t.selectionFilterMimeIncludes, H = !O || O === "both" || O === "files" && ae?.type === "file" || O === "dirs" && ae?.type === "dir";
        let W = !0;
        if (B && Array.isArray(B) && B.length > 0 && (ae?.type === "dir" ? W = !0 : ae?.mime_type ? W = B.some(
          (me) => (ae?.mime_type).startsWith(me)
        ) : W = !1), !H || !W)
          return;
        w.value?.has(oe) || (c.clearSelection(), c.select(oe)), t.emitter.emit("vf-contextmenu-show", {
          event: z,
          items: He(),
          target: ae
        });
      }
    }, at = (z) => {
      z.preventDefault(), t.emitter.emit("vf-contextmenu-show", { event: z, items: He() });
    }, _t = (z) => {
      if (!(t.features?.move ?? !1) || z.altKey || z.ctrlKey || z.metaKey)
        return z.preventDefault(), !1;
      ue.value = !0;
      const oe = z.target?.closest(
        ".file-item-" + ie
      );
      if (T.value = oe ? String(oe.dataset.key) : null, z.dataTransfer && T.value) {
        z.dataTransfer.setDragImage(s.value, 0, 15), z.dataTransfer.effectAllowed = "all", z.dataTransfer.dropEffect = "copy";
        const ae = w.value?.has(T.value) ? Array.from(w.value) : [T.value];
        z.dataTransfer.setData("items", JSON.stringify(ae)), c.setDraggedItem(T.value);
      }
    }, mt = () => {
      T.value = null;
    };
    return (z, ne) => (p(), y("div", gv, [
      i("div", {
        ref: "customScrollBarContainer",
        class: G(["vuefinder__explorer__scrollbar-container", [{ "grid-view": a(f).view === "grid" }]])
      }, [
        i("div", wv, null, 512)
      ], 2),
      a(f).view === "list" ? (p(), y("div", yv, [
        i("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
          onClick: ne[0] || (ne[0] = (oe) => a(c).toggleSort("basename"))
        }, [
          se(b(a(C)("Name")) + " ", 1),
          he(L(Gt, {
            direction: a(h).order
          }, null, 8, ["direction"]), [
            [ze, a(h).active && a(h).column === "basename"]
          ])
        ]),
        i("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
          onClick: ne[1] || (ne[1] = (oe) => a(c).toggleSort("file_size"))
        }, [
          se(b(a(C)("Size")) + " ", 1),
          he(L(Gt, {
            direction: a(h).order
          }, null, 8, ["direction"]), [
            [ze, a(h).active && a(h).column === "file_size"]
          ])
        ]),
        i("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
          onClick: ne[2] || (ne[2] = (oe) => a(c).toggleSort("last_modified"))
        }, [
          se(b(a(C)("Date")) + " ", 1),
          he(L(Gt, {
            direction: a(h).order
          }, null, 8, ["direction"]), [
            [ze, a(h).active && a(h).column === "last_modified"]
          ])
        ])
      ])) : A("", !0),
      i("div", {
        ref_key: "scrollContainer",
        ref: d,
        class: G(["vuefinder__explorer__selector-area", "scroller-" + a(ie)]),
        onScroll: ne[4] || (ne[4] = //@ts-ignore
        (...oe) => a(I) && a(I)(...oe))
      }, [
        a(u).get("loadingIndicator") === "linear" && a($) ? (p(), y("div", bv)) : A("", !0),
        i("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Ne({ height: `${a(M)}px`, position: "relative", width: "100%" }),
          onContextmenu: de(at, ["self", "prevent"]),
          onClick: ne[3] || (ne[3] = de(
            //@ts-ignore
            (...oe) => a(E) && a(E)(...oe),
            ["self"]
          ))
        }, [
          i("div", {
            ref_key: "dragImage",
            ref: s,
            class: "vuefinder__explorer__drag-item"
          }, [
            L(Xf, {
              count: T.value && a(w).has(T.value) ? a(w).size : 1
            }, null, 8, ["count"])
          ], 512),
          a(f).view === "grid" ? (p(!0), y(ce, { key: 0 }, pe(a(q), (oe) => (p(), R(On, {
            key: oe,
            "row-index": oe,
            "row-height": k.value,
            view: "grid",
            "items-per-row": a(V),
            items: a(N)(a(v), oe),
            "show-thumbnails": a(f).showThumbnails,
            "is-dragging-item": U,
            "is-selected": F,
            "drag-n-drop-events": (ae) => a(o).events(ae),
            "explorer-id": a(ie),
            onClick: _e,
            onDblclick: Ve,
            onContextmenu: Ze,
            onDragstart: _t,
            onDragend: mt
          }, {
            icon: X((ae) => [
              Fe(z.$slots, "icon", Te({ ref_for: !0 }, ae))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id"]))), 128)) : (p(!0), y(ce, { key: 1 }, pe(a(q), (oe) => (p(), R(On, {
            key: oe,
            "row-index": oe,
            "row-height": k.value,
            view: "list",
            items: Q(oe) ? [Q(oe)] : [],
            compact: a(f).compactListView,
            "is-dragging-item": U,
            "is-selected": F,
            "drag-n-drop-events": (ae) => a(o).events(ae),
            "explorer-id": a(ie),
            onClick: _e,
            onDblclick: Ve,
            onContextmenu: Ze,
            onDragstart: _t,
            onDragend: mt
          }, {
            icon: X((ae) => [
              Fe(z.$slots, "icon", Te({ ref_for: !0 }, ae))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id"]))), 128))
        ], 36)
      ], 34),
      L(mv)
    ]));
  }
}), kv = ["href", "download"], $v = ["onClick"], Sv = /* @__PURE__ */ J({
  __name: "ContextMenu",
  setup(n) {
    const e = Z(), t = P(null), o = P([]), s = Et({
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
      s.active = !0, Ae(() => {
        const $ = t.value?.getBoundingClientRect(), F = $?.height ?? 0, _ = $?.width ?? 0;
        v = h && h.right - c.pageX + window.scrollX < _ ? v - _ : v, w = h && h.bottom - c.pageY + window.scrollY < F ? w - F : w, s.positions = {
          left: String(v) + "px",
          top: String(w) + "px"
        };
      });
    };
    return (c, u) => he((p(), y("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: G([{
        "vuefinder__context-menu--active": s.active,
        "vuefinder__context-menu--inactive": !s.active
      }, "vuefinder__context-menu"]),
      style: Ne(s.positions)
    }, [
      (p(!0), y(ce, null, pe(s.items, (f) => (p(), y("li", {
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
          i("span", null, b(f.title(a(e).i18n)), 1)
        ], 8, kv)) : (p(), y("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => d(f)
        }, [
          i("span", null, b(f.title(a(e).i18n)), 1)
        ], 8, $v))
      ]))), 128))
    ], 6)), [
      [ze, s.active]
    ]);
  }
}), Cv = { class: "vuefinder__status-bar__wrapper" }, Fv = { class: "vuefinder__status-bar__storage" }, Dv = ["title"], Ev = { class: "vuefinder__status-bar__storage-icon" }, Pv = ["value"], Tv = ["value"], Av = { class: "vuefinder__status-bar__info space-x-2" }, Mv = { key: 0 }, Iv = { key: 1 }, Ov = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Lv = { class: "vuefinder__status-bar__actions" }, Rv = /* @__PURE__ */ J({
  __name: "Statusbar",
  setup(n) {
    const e = Z(), { t } = e.i18n, o = e.fs, s = K(o.sortedFiles), l = K(o.path), d = K(o.selectedCount), r = K(o.storages), c = K(o.selectedItems), u = K(o.path), f = (_) => {
      const g = _.target.value;
      e.adapter.open(g + "://");
    }, h = j(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((_, g) => _ + (g.file_size || 0), 0)), v = j(() => r.value), w = j(() => s.value), $ = j(() => d.value || 0), F = j(() => c.value || []);
    return (_, g) => (p(), y("div", Cv, [
      i("div", Fv, [
        i("div", {
          class: "vuefinder__status-bar__storage-container",
          title: a(t)("Storage")
        }, [
          i("div", Ev, [
            L(a(rn))
          ]),
          i("select", {
            name: "vuefinder-media-selector",
            value: a(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: f
          }, [
            (p(!0), y(ce, null, pe(v.value, (m) => (p(), y("option", {
              key: m,
              value: m
            }, b(m), 9, Tv))), 128))
          ], 40, Pv)
        ], 8, Dv),
        i("div", Av, [
          $.value === 0 ? (p(), y("span", Mv, b(w.value.length) + " " + b(a(t)("items")), 1)) : (p(), y("span", Iv, [
            se(b($.value) + " " + b(a(t)("selected")) + " ", 1),
            h.value ? (p(), y("span", Ov, b(a(e).filesize(h.value)), 1)) : A("", !0)
          ]))
        ])
      ]),
      i("div", Lv, [
        Fe(_.$slots, "actions", {
          path: a(u).path,
          count: $.value || 0,
          selected: F.value
        })
      ])
    ]));
  }
}), Bv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Vv(n, e) {
  return p(), y("svg", Bv, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const zv = { render: Vv };
function $o(n, e) {
  const t = n.findIndex((o) => o.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const Nv = { class: "vuefinder__folder-loader-indicator" }, Uv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, So = /* @__PURE__ */ J({
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
    const e = n, t = Z(), o = zn(n, "modelValue"), s = P(!1);
    le(
      () => o.value,
      () => l()
    );
    const l = async () => {
      s.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        $o(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (d) {
        console.error("Failed to fetch subfolders:", d);
      } finally {
        s.value = !1;
      }
    };
    return (d, r) => (p(), y("div", Nv, [
      s.value ? (p(), R(a(Rt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (p(), y("div", Uv, [
        o.value ? (p(), R(a(Lt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : A("", !0),
        o.value ? A("", !0) : (p(), R(a(Ot), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Hv = { key: 0 }, jv = { class: "vuefinder__treesubfolderlist__no-folders" }, Kv = { class: "vuefinder__treesubfolderlist__item-content" }, qv = ["onClick"], Wv = ["title", "onDblclick", "onClick"], Gv = { class: "vuefinder__treesubfolderlist__item-icon" }, Yv = { class: "vuefinder__treesubfolderlist__subfolder" }, Qv = /* @__PURE__ */ J({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = Z(), t = e.fs, o = ht(e, ["vuefinder__drag-over"]), s = P({}), { t: l } = e.i18n, d = K(t.path), r = n, c = P(null);
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
      return p(), y("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        u.value.length ? A("", !0) : (p(), y("li", Hv, [
          i("div", jv, b(a(l)("No folders")), 1)
        ])),
        (p(!0), y(ce, null, pe(u.value, (w) => (p(), y("li", {
          key: w.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          i("div", Kv, [
            i("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: ($) => s.value[w.path] = !s.value[w.path]
            }, [
              L(So, {
                modelValue: s.value[w.path],
                "onUpdate:modelValue": ($) => s.value[w.path] = $,
                storage: n.storage,
                path: w.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, qv),
            i("div", Te({
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
              onDblclick: ($) => s.value[w.path] = !s.value[w.path],
              onClick: ($) => a(e).adapter.open(w.path)
            }), [
              i("div", Gv, [
                a(d)?.path === w.path ? (p(), R(a(ln), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (p(), R(a(Ue), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              i("div", {
                class: G(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(d).path === w.path
                }])
              }, b(w.basename), 3)
            ], 16, Wv)
          ]),
          i("div", Yv, [
            he(L(v, {
              storage: r.storage,
              path: w.path
            }, null, 8, ["storage", "path"]), [
              [ze, s.value[w.path]]
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
  setup(n) {
    const e = Z(), t = e.fs, o = P(!1), s = n, l = ht(e, ["vuefinder__drag-over"]), d = K(t.path), r = j(() => s.storage === d.value?.storage), c = {
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
    return (f, h) => (p(), y(ce, null, [
      i("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: h[2] || (h[2] = (v) => u(n.storage))
      }, [
        i("div", Te({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Ke(a(l).events(c), !0)), [
          i("div", {
            class: G(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            L(a(rn))
          ], 2),
          i("div", null, b(n.storage), 1)
        ], 16),
        i("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: h[1] || (h[1] = de((v) => o.value = !o.value, ["stop"]))
        }, [
          L(So, {
            modelValue: o.value,
            "onUpdate:modelValue": h[0] || (h[0] = (v) => o.value = v),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      he(L(Qv, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ze, o.value]
      ])
    ], 64));
  }
}), Jv = { class: "vuefinder__folder-indicator" }, Zv = { class: "vuefinder__folder-indicator--icon" }, ep = /* @__PURE__ */ J({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = zn(n, "modelValue");
    return (t, o) => (p(), y("div", Jv, [
      i("div", Zv, [
        e.value ? (p(), R(a(Lt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : A("", !0),
        e.value ? A("", !0) : (p(), R(a(Ot), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), tp = {
  key: 0,
  class: "vuefinder__treeview__header"
}, np = { class: "vuefinder__treeview__pinned-label" }, op = { class: "vuefinder__treeview__pin-text text-nowrap" }, sp = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, ip = ["onClick"], ap = ["title"], rp = ["onClick"], lp = { key: 0 }, dp = { class: "vuefinder__treeview__no-pinned" }, cp = /* @__PURE__ */ J({
  __name: "TreeView",
  setup(n) {
    const e = Z(), { enabled: t } = Oe(), { t: o } = e.i18n, { getStore: s, setStore: l } = e.storage, d = e.fs, r = e.config, c = K(r.state), u = K(d.sortedFiles), f = K(d.storages), h = j(() => f.value || []), v = K(d.path), w = ht(e, ["vuefinder__drag-over"]), $ = P(190), F = P(s("pinned-folders-opened", !0));
    le(F, (S) => l("pinned-folders-opened", S));
    const _ = (S) => {
      const k = r.get("pinnedFolders");
      r.set("pinnedFolders", k.filter((C) => C.path !== S.path));
    }, g = (S) => {
      const k = S.clientX, C = S.target.parentElement;
      if (!C) return;
      const V = C.getBoundingClientRect().width;
      C.classList.remove("transition-[width]"), C.classList.add("transition-none");
      const M = (I) => {
        $.value = V + I.clientX - k, $.value < 50 && ($.value = 0, r.set("showTreeView", !1)), $.value > 50 && r.set("showTreeView", !0);
      }, q = () => {
        const I = C.getBoundingClientRect();
        $.value = I.width, C.classList.add("transition-[width]"), C.classList.remove("transition-none"), window.removeEventListener("mousemove", M), window.removeEventListener("mouseup", q);
      };
      window.addEventListener("mousemove", M), window.addEventListener("mouseup", q);
    }, m = P(null);
    return ve(() => {
      m.value && Tt(m.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), le(u, (S) => {
      const k = S.filter((C) => C.type === "dir");
      $o(e.treeViewData, {
        path: v.value.path || "",
        folders: k.map((C) => ({
          storage: C.storage,
          path: C.path,
          basename: C.basename,
          type: "dir"
        }))
      });
    }), (S, k) => (p(), y(ce, null, [
      i("div", {
        class: G(["vuefinder__treeview__overlay", a(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: k[0] || (k[0] = (C) => a(r).toggle("showTreeView"))
      }, null, 2),
      i("div", {
        style: Ne(
          a(c).showTreeView ? "min-width:100px;max-width:75%; width: " + $.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        i("div", {
          ref_key: "treeViewScrollElement",
          ref: m,
          class: "vuefinder__treeview__scroll"
        }, [
          a(t)("pinned") ? (p(), y("div", tp, [
            i("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: k[2] || (k[2] = (C) => F.value = !F.value)
            }, [
              i("div", np, [
                L(a(an), { class: "vuefinder__treeview__pin-icon" }),
                i("div", op, b(a(o)("Pinned Folders")), 1)
              ]),
              L(ep, {
                modelValue: F.value,
                "onUpdate:modelValue": k[1] || (k[1] = (C) => F.value = C)
              }, null, 8, ["modelValue"])
            ]),
            F.value ? (p(), y("ul", sp, [
              (p(!0), y(ce, null, pe(a(c).pinnedFolders, (C) => (p(), y("li", {
                key: C.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                i("div", Te({ class: "vuefinder__treeview__pinned-folder" }, Ke(a(w).events(C), !0), {
                  onClick: (V) => a(e).adapter.open(C.path)
                }), [
                  a(v).path !== C.path ? (p(), R(a(Ue), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : A("", !0),
                  a(v).path === C.path ? (p(), R(a(ln), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : A("", !0),
                  i("div", {
                    title: C.path,
                    class: G(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": a(v).path === C.path
                    }])
                  }, b(C.basename), 11, ap)
                ], 16, ip),
                i("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (V) => _(C)
                }, [
                  L(a(zv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, rp)
              ]))), 128)),
              a(c).pinnedFolders.length ? A("", !0) : (p(), y("li", lp, [
                i("div", dp, b(a(o)("No folders pinned")), 1)
              ]))
            ])) : A("", !0)
          ])) : A("", !0),
          (p(!0), y(ce, null, pe(h.value, (C) => (p(), y("div", {
            key: C,
            class: "vuefinder__treeview__storage"
          }, [
            L(Xv, { storage: C }, null, 8, ["storage"])
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
function up(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function ge(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, o) => !(e.needsSearchQuery !== !!o.searchQuery || e.target !== void 0 && e.target !== up(o) || e.targetType !== void 0 && e.targetType !== o.target?.type || e.mimeType !== void 0 && e.mimeType !== o.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function lt(...n) {
  return (e, t) => n.some((o) => o(e, t));
}
function dt(...n) {
  return (e, t) => n.every((o) => o(e, t));
}
const Co = [
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
    action: (n, e) => n.modal.open(It, { storage: e[0]?.storage, item: e[0] }),
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
    action: (n, e) => n.modal.open(Mt, { items: e }),
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
      n.modal.open(ot, { items: { from: e, to: o } });
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
        n.modal.open(t.type === "cut" ? ot : cn, {
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
    action: (n, e) => n.modal.open(gn, { items: e }),
    show: ge({ target: "one", feature: "unarchive", mimeType: "application/zip" })
  },
  {
    id: ye.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(At, { items: e });
    },
    show: lt(
      ge({ feature: "delete", target: "one" }),
      ge({ feature: "delete", target: "many" })
    )
  }
], fp = ["data-theme"], vp = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, pp = { class: "vuefinder__external-drop-message" }, hp = { class: "vuefinder__main__content" }, _p = /* @__PURE__ */ J({
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
    le(
      () => o.features,
      (_) => {
        const g = Hn(_);
        Object.keys(s.features).forEach((m) => {
          delete s.features[m];
        }), Object.assign(s.features, g);
      },
      { deep: !0 }
    );
    const r = s.fs, c = K(d.state);
    md();
    const { isDraggingExternal: u, handleDragEnter: f, handleDragOver: h, handleDragLeave: v, handleDrop: w } = gd();
    function $(_) {
      r.setPath(_.dirname), d.get("persist") && d.set("path", _.dirname), r.setReadOnly(_.read_only ?? !1), s.modal.close(), r.setFiles(_.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(_.storages);
    }
    s.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, s.adapter.onAfterOpen = (_) => {
      $(_), r.setLoading(!1);
    }, s.emitter.on("vf-upload-complete", (_) => {
      t("upload-complete", _);
    }), s.emitter.on("vf-delete-complete", (_) => {
      t("delete-complete", _);
    }), s.emitter.on("vf-file-dclick", (_) => {
      t("file-dclick", _);
    }), s.emitter.on("vf-folder-dclick", (_) => {
      t("folder-dclick", _);
    }), le(
      () => o.config?.theme,
      (_) => {
        _ && d.set("theme", a(_));
      },
      { immediate: !0 }
    ), ve(() => {
      s.root = l.value, le(
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
      g.length > 0 && (s.modal.open(mn), setTimeout(() => {
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
          a(u) ? (p(), y("div", vp, [
            i("div", pp, b(a(s).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : A("", !0),
          L(jc),
          L(qu),
          L(Bf),
          i("div", hp, [
            L(cp),
            L(xv, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: X((m) => [
                Fe(_.$slots, "icon", tt(nt(m)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          L(Rv, null, {
            actions: X((m) => [
              Fe(_.$slots, "status-bar", tt(nt(m)))
            ]),
            _: 3
          })
        ], 34),
        (p(), R(Pt, { to: "body" }, [
          L(Io, { name: "fade" }, {
            default: X(() => [
              a(s).modal.visible ? (p(), R(Rn(a(s).modal.type), { key: 0 })) : A("", !0)
            ]),
            _: 1
          })
        ])),
        L(Sv, { items: a(Co) }, null, 8, ["items"])
      ], 2)
    ], 42, fp));
  }
}), mp = /* @__PURE__ */ J({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => Co },
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
    const o = os(e, wt("VueFinderOptions") || {});
    return Ho(t, o), Oo(Qt, t), Vn(() => {
      jo(t);
    }), (s, l) => (p(), R(_p, tt(nt(e)), null, 16));
  }
}), Ap = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", mp);
  }
};
export {
  Pp as ArrayDriver,
  ye as ContextMenuIds,
  Tp as IndexedDBDriver,
  Kn as RemoteDriver,
  mp as VueFinder,
  Ap as VueFinderPlugin,
  mp as VueFinderProvider,
  Co as contextMenuItems,
  Ap as default
};
