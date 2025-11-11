import { inject as rt, reactive as _t, watch as ue, ref as E, shallowRef as sn, computed as j, markRaw as zn, defineComponent as Q, onMounted as he, nextTick as Le, createElementBlock as p, openBlock as u, withKeys as st, unref as s, createElementVNode as o, createCommentVNode as M, withModifiers as ve, renderSlot as Ce, toDisplayString as y, createBlock as R, resolveDynamicComponent as an, withCtx as te, createVNode as B, Fragment as _e, renderList as we, withDirectives as ge, vModelText as it, onUnmounted as Pe, useTemplateRef as Qe, createTextVNode as ce, resolveComponent as rn, normalizeClass as X, vModelCheckbox as Pt, customRef as Rn, Teleport as pt, normalizeStyle as He, isRef as Nn, vModelSelect as St, onBeforeUnmount as ln, vModelRadio as $t, mergeProps as Be, toHandlers as qe, vShow as je, normalizeProps as We, guardReactiveProps as Ge, onUpdated as Un, mergeModels as jn, useModel as dn, Transition as Hn, provide as Kn } from "vue";
import qn from "mitt";
import { toast as de, Toaster as Wn } from "vue-sonner";
import { persistentAtom as Gn } from "@nanostores/persistent";
import { atom as De, computed as Ke } from "nanostores";
import { useStore as G } from "@nanostores/vue";
import { QueryClient as Yn } from "@tanstack/vue-query";
import Qn from "@uppy/core";
import { Cropper as Xn } from "vue-advanced-cropper";
import cn from "vanilla-lazyload";
import { OverlayScrollbars as tt, SizeObserverPlugin as Jn } from "overlayscrollbars";
import { computePosition as lt, offset as dt, flip as ct, shift as ut, autoUpdate as un } from "@floating-ui/dom";
import Zn from "@viselect/vanilla";
import eo from "@uppy/xhr-upload";
const Et = /* @__PURE__ */ new Map(), Ct = Symbol("ServiceContainerId");
function to(i, e) {
  Et.set(i, e);
}
function no(i) {
  Et.delete(i);
}
function J(i) {
  const e = rt(Ct);
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
function oo(i) {
  const e = localStorage.getItem(i + "_storage"), t = _t(JSON.parse(e ?? "{}"));
  ue(t, n);
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
async function so(i, e) {
  const t = e[i];
  return typeof t == "function" ? (await t()).default : t;
}
function io(i, e, t, n) {
  const { getStore: a, setStore: l } = i, d = E({}), r = E(a("locale", e)), c = (h, v = e) => {
    so(h, n).then(($) => {
      d.value = $, l("locale", h), r.value = h, l("translations", $), Object.values(n).length > 1 && (de.success("The language is set to " + h), t.emit("vf-language-saved"));
    }).catch(($) => {
      if (v)
        de.error("The selected locale is not yet supported!"), c(v, null);
      else {
        const F = Ee($, "Locale cannot be loaded!");
        de.error(F);
      }
    });
  };
  ue(r, (h) => {
    c(h);
  }), !a("locale") && !Object.keys(n).length ? c(e) : d.value = a("translations");
  const _ = (h, ...v) => v.length ? _(h = h.replace("%s", String(v.shift())), ...v) : h;
  function w(h, ...v) {
    return d.value && Object.prototype.hasOwnProperty.call(d.value, h) ? _(d.value[h] || h, ...v) : _(h, ...v);
  }
  return _t({ t: w, locale: r });
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
  advanced: ao.reduce((i, e) => (i[e] = !0, i), {})
};
function qt() {
  return vn.advanced;
}
function fn(i) {
  return i ? i === "simple" || i === "advanced" ? { ...vn[i] } : { ...qt(), ...i } : qt();
}
const ro = "4.0.14";
function Mt(i, e, t, n, a) {
  return e = Math, t = e.log, n = 1024, a = t(i) / t(n) | 0, (i / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function _n(i, e, t, n, a) {
  return e = Math, t = e.log, n = 1e3, a = t(i) / t(n) | 0, (i / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function lo(i) {
  if (typeof i == "number") return i;
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(i);
  if (!n) return 0;
  const a = parseFloat(n[1] || "0"), l = (n[2] || "").toLowerCase(), d = e[l] ?? 0;
  return Math.round(a * Math.pow(1024, d));
}
function co(i) {
  const e = sn(null), t = E(!1), n = E(), a = E(!1);
  return { visible: t, type: e, data: n, open: (c, _ = null) => {
    i.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = c, n.value = _;
  }, close: () => {
    i.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null;
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
function vo(i) {
  return i || "silver";
}
function pn(i) {
  return uo.has(i);
}
function Wt(i) {
  const e = {}, t = {}, n = i;
  for (const a in n)
    if (pn(a))
      t[a] = n[a];
    else if (a in vt) {
      const l = a;
      e[l] = n[a];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function Gt(i, e) {
  const t = { ...vt, ...i, ...e };
  return t.theme = vo(t.theme), t;
}
function Yt(i, e) {
  return { ...ft, ...e, ...i };
}
const fo = (i, e = {}) => {
  const t = `vuefinder_config_${i}`, { persistenceConfig: n, nonPersistenceConfig: a } = Wt(e), l = Gt(
    n,
    vt
  ), d = Yt(
    a,
    ft
  ), r = Gn(
    t,
    l,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = De(d), _ = Ke(
    [r, c],
    (m, g) => ({
      ...m,
      ...g
    })
  ), w = (m = {}) => {
    const g = r.get(), f = c.get(), { persistenceConfig: k, nonPersistenceConfig: x } = Wt(m), S = Gt(k, g), T = Yt(
      x,
      f
    );
    r.set(S), c.set(T);
  }, h = (m) => pn(m) ? c.get()[m] : r.get()[m], v = () => ({
    ...r.get(),
    ...c.get()
  }), $ = (m, g) => {
    const f = r.get();
    typeof m == "object" && m !== null ? r.set({ ...f, ...m }) : r.set({
      ...f,
      [m]: g
    });
  };
  return {
    // Store atom (combined)
    state: _,
    // Methods
    init: w,
    get: h,
    set: $,
    toggle: (m) => {
      const g = r.get();
      $(m, !g[m]);
    },
    all: v,
    reset: () => {
      r.set({ ...vt }), c.set({ ...ft });
    }
  };
};
function _o(i, e) {
  if (typeof i == "string" && typeof e == "string")
    return i.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(i) || 0, n = Number(e) || 0;
  return t === n ? 0 : t < n ? -1 : 1;
}
const po = () => {
  const i = De(""), e = De([]), t = De(!1), n = De([]), a = De({ active: !1, column: "", order: "" }), l = De({
    kind: "all",
    showHidden: !1
  }), d = De(/* @__PURE__ */ new Set()), r = De({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = De(null), _ = De(0), w = De(!1), h = De([]), v = De(-1), $ = Ke([i], (V) => {
    const z = (V ?? "").trim(), H = z.indexOf("://"), ee = H >= 0 ? z.slice(0, H) : "", Re = (H >= 0 ? z.slice(H + 3) : z).split("/").filter(Boolean);
    let Ue = "";
    const kt = Re.map((Ae) => (Ue = Ue ? `${Ue}/${Ae}` : Ae, {
      basename: Ae,
      name: Ae,
      path: ee ? `${ee}://${Ue}` : Ue,
      type: "dir"
    }));
    return { storage: ee, breadcrumb: kt, path: z };
  }), F = Ke([n, a, l], (V, z, H) => {
    let ee = V;
    H.kind === "files" ? ee = ee.filter((Ae) => Ae.type === "file") : H.kind === "folders" && (ee = ee.filter((Ae) => Ae.type === "dir")), H.showHidden || (ee = ee.filter((Ae) => !Ae.basename.startsWith(".")));
    const { active: Ie, column: Re, order: Ue } = z;
    if (!Ie || !Re) return ee;
    const kt = Ue === "asc" ? 1 : -1;
    return ee.slice().sort((Ae, Vn) => _o(Ae[Re], Vn[Re]) * kt);
  }), D = Ke([n, d], (V, z) => z.size === 0 ? [] : V.filter((H) => z.has(H.path))), m = (V, z) => {
    const H = i.get();
    if ((z ?? !0) && H !== V) {
      const ee = h.get(), Ie = v.get();
      Ie < ee.length - 1 && ee.splice(Ie + 1), ee.length === 0 && H && ee.push(H), ee.push(V), h.set([...ee]), v.set(ee.length - 1);
    }
    i.set(V);
  }, g = (V) => {
    n.set(V ?? []);
  }, f = (V) => {
    e.set(V ?? []);
  }, k = (V, z) => {
    a.set({ active: !0, column: V, order: z });
  }, x = (V) => {
    const z = a.get();
    z.active && z.column === V ? a.set({
      active: z.order === "asc",
      column: V,
      order: "desc"
    }) : a.set({
      active: !0,
      column: V,
      order: "asc"
    });
  }, S = () => {
    a.set({ active: !1, column: "", order: "" });
  }, T = (V, z) => {
    l.set({ kind: V, showHidden: z });
  }, L = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, Y = (V, z = "multiple") => {
    const H = new Set(d.get());
    z === "single" && H.clear(), H.add(V), d.set(H);
  }, W = (V, z = "multiple") => {
    const H = new Set(d.get());
    z === "single" && H.clear(), V.forEach((ee) => H.add(ee)), d.set(H);
  }, ne = (V) => {
    const z = new Set(d.get());
    z.delete(V), d.set(z);
  }, re = (V) => d.get().has(V), le = (V, z = "multiple") => {
    const H = new Set(d.get());
    H.has(V) ? H.delete(V) : (z === "single" && H.clear(), H.add(V)), d.set(H);
  }, A = (V = "multiple", z) => {
    if (V === "single") {
      const H = n.get()[0];
      if (H) {
        const ee = H.path;
        d.set(/* @__PURE__ */ new Set([ee])), _.set(1);
      }
    } else {
      if (z?.selectionFilterType || z?.selectionFilterMimeIncludes && z.selectionFilterMimeIncludes.length > 0) {
        const H = n.get().filter((ee) => {
          const Ie = z.selectionFilterType, Re = z.selectionFilterMimeIncludes;
          return Ie === "files" && ee.type === "dir" || Ie === "dirs" && ee.type === "file" ? !1 : Re && Array.isArray(Re) && Re.length > 0 && ee.type !== "dir" ? ee.mime_type ? Re.some((Ue) => ee.mime_type?.startsWith(Ue)) : !1 : !0;
        }).map((ee) => ee.path);
        d.set(new Set(H));
      } else {
        const H = new Set(n.get().map((ee) => ee.path));
        d.set(H);
      }
      N(d.get().size);
    }
  }, Z = () => {
    d.set(/* @__PURE__ */ new Set()), _.set(0);
  }, q = (V) => {
    const z = new Set(V ?? []);
    d.set(z), _.set(z.size);
  }, N = (V) => {
    _.set(V);
  }, P = (V) => {
    w.set(!!V);
  }, b = () => w.get(), C = (V, z) => {
    const H = n.get().filter((ee) => z.has(ee.path));
    r.set({
      type: V,
      path: $.get().path,
      items: new Set(H)
    });
  }, I = (V) => Ke([r], (z) => z.type === "cut" && Array.from(z.items).some((H) => H.path === V)), U = (V) => Ke([r], (z) => z.type === "copy" && Array.from(z.items).some((H) => H.path === V)), K = (V) => {
    const z = I(V);
    return G(z).value ?? !1;
  }, ie = (V) => {
    const z = U(V);
    return G(z).value ?? !1;
  }, ye = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, Te = () => r.get(), ze = (V) => {
    c.set(V);
  }, pe = () => c.get(), fe = () => {
    c.set(null);
  }, me = () => {
    const V = h.get(), z = v.get();
    if (z > 0) {
      const H = z - 1, ee = V[H];
      ee && (v.set(H), m(ee, !1));
    }
  }, O = () => {
    const V = h.get(), z = v.get();
    if (z < V.length - 1) {
      const H = z + 1, ee = V[H];
      ee && (v.set(H), m(ee, !1));
    }
  }, oe = Ke([v], (V) => V > 0), se = Ke(
    [h, v],
    (V, z) => z < V.length - 1
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
    loading: w,
    draggedItem: c,
    clipboardItems: r,
    // Computed values
    path: $,
    sortedFiles: F,
    selectedItems: D,
    // Actions
    setPath: m,
    setFiles: g,
    setStorages: f,
    setSort: k,
    toggleSort: x,
    clearSort: S,
    setFilter: T,
    clearFilter: L,
    select: Y,
    selectMultiple: W,
    deselect: ne,
    toggleSelect: le,
    selectAll: A,
    isSelected: re,
    clearSelection: Z,
    setSelection: q,
    setSelectedCount: N,
    setLoading: P,
    isLoading: b,
    setClipboard: C,
    createIsCut: I,
    createIsCopied: U,
    isCut: K,
    isCopied: ie,
    clearClipboard: ye,
    getClipboard: Te,
    setDraggedItem: ze,
    getDraggedItem: pe,
    clearDraggedItem: fe,
    setReadOnly: (V) => {
      t.set(V);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (V) => t.get() ? !0 : V.read_only ?? !1,
    // Navigation
    goBack: me,
    goForward: O,
    canGoBack: oe,
    canGoForward: se,
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
          const _ = d + c.path.slice(l.length), w = this.parent(_);
          return this.cloneEntry(c, {
            path: _,
            dir: w,
            basename: c.path === l ? e.name : c.basename
          });
        }
        return c;
      });
      for (const [c, _] of Array.from(this.contentStore.entries()))
        if (c === l || c.startsWith(l + "/")) {
          this.contentStore.delete(c);
          const w = d + c.slice(l.length);
          this.contentStore.set(w, _);
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
        const w = d.path + "/", h = this.files.filter(
          (v) => v.storage === this.storage && v.path.startsWith(w)
        );
        for (const v of h) {
          const $ = v.path.slice(w.length), F = $.includes("/") ? $.slice(0, $.lastIndexOf("/")) : "", D = F ? this.join(_.path, F) : _.path;
          if (v.type === "dir")
            l(v, D);
          else {
            const m = this.uniqueName(D, v.basename, n), g = this.makeFileEntry(
              D,
              m,
              v.file_size || 0,
              v.mime_type
            );
            a.push(g), n.add(g.path);
            const f = this.contentStore.get(v.path);
            f !== void 0 && this.contentStore.set(g.path, f);
          }
        }
      } else {
        const c = this.uniqueName(r, d.basename, n), _ = this.makeFileEntry(r, c, d.file_size || 0, d.mime_type);
        a.push(_), n.add(_.path);
        const w = this.contentStore.get(d.path);
        w !== void 0 && this.contentStore.set(_.path, w);
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
        const c = d.path, _ = this.uniqueName(r, d.basename, n), w = this.join(r, _);
        a = a.map((v) => {
          if (v.storage !== this.storage) return v;
          if (v.path === c || v.path.startsWith(c + "/")) {
            const $ = w + v.path.slice(c.length);
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
            const F = w + v.slice(c.length);
            this.contentStore.set(F, $);
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
        const w = this.contentStore.get(d.path);
        w !== void 0 && (this.contentStore.delete(d.path), this.contentStore.set(_, w));
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
          const w = await r.arrayBuffer();
          this.contentStore.set(_.path, w);
        } catch {
          this.contentStore.set(_.path, "");
        }
      else
        this.contentStore.set(_.path, "");
    });
  }
}
function Qt(i, e, t) {
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
class hn extends Tt {
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
      const d = await a.text(), r = Qt(d, a.status, a.statusText);
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
      const d = await a.text(), r = Qt(d, a.status, a.statusText);
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
          (w) => w.storage === this.storage && w.dir === e
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
      for (const w of n)
        c.delete(w.path), _.delete(w.path);
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
          const _ = r + c.path.slice(d.length), w = this.parent(_), h = this.cloneEntry(c, {
            path: _,
            dir: w,
            basename: c.path === d ? e.name : c.basename,
            last_modified: Date.now()
          });
          await this.upsert(h);
          const $ = (await this.getDB()).transaction(["content"], "readwrite"), F = $.objectStore("content"), D = F.get(c.path);
          D.onsuccess = () => {
            const m = D.result;
            m && (F.delete(c.path), F.put({ path: _, content: m.content }));
          }, await new Promise((m) => {
            $.oncomplete = () => m(void 0);
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
        const w = _.result;
        w && (c.delete(t.path), c.put({ path: a, content: w.content }));
      }, await new Promise((w) => {
        r.oncomplete = () => w(void 0);
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
      const _ = `${d} copy ${c}${r}`, w = this.join(e, _);
      if (!n.has(w)) return _;
      c++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, n = await this.getAllFiles(), a = new Set(n.map((d) => d.path)), l = async (d, r) => {
      if (d.type === "dir") {
        const c = await this.uniqueName(r, d.basename, a), _ = this.makeDirEntry(r, c);
        a.add(_.path), await this.upsert(_);
        const w = d.path + "/", h = n.filter(
          (v) => v.storage === this.storage && v.path.startsWith(w)
        );
        for (const v of h) {
          const $ = v.path.slice(w.length), F = $.includes("/") ? $.slice(0, $.lastIndexOf("/")) : "", D = F ? this.join(_.path, F) : _.path;
          if (v.type === "dir")
            await l(v, D);
          else {
            const m = await this.uniqueName(D, v.basename, a), g = this.makeFileEntry(
              D,
              m,
              v.file_size || 0,
              v.mime_type
            );
            a.add(g.path), await this.upsert(g);
            const k = (await this.getDB()).transaction(["content"], "readwrite"), x = k.objectStore("content"), S = x.get(v.path);
            S.onsuccess = () => {
              const T = S.result;
              T && x.put({ path: g.path, content: T.content });
            }, await new Promise((T) => {
              k.oncomplete = () => T(void 0);
            });
          }
        }
      } else {
        const c = await this.uniqueName(r, d.basename, a), _ = this.makeFileEntry(r, c, d.file_size || 0, d.mime_type);
        a.add(_.path), await this.upsert(_);
        const h = (await this.getDB()).transaction(["content"], "readwrite"), v = h.objectStore("content"), $ = v.get(d.path);
        $.onsuccess = () => {
          const F = $.result;
          F && v.put({ path: _.path, content: F.content });
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
        const c = d.path, _ = await this.uniqueName(r, d.basename, a), w = this.join(r, _), h = n.filter(
          (v) => v.storage === this.storage && (v.path === c || v.path.startsWith(c + "/"))
        );
        for (const v of h) {
          const $ = w + v.path.slice(c.length), F = this.parent($), D = this.cloneEntry(v, {
            path: $,
            dir: F,
            basename: v.path === c ? _ : v.basename,
            last_modified: Date.now()
          });
          await this.upsert(D);
          const g = (await this.getDB()).transaction(["content"], "readwrite"), f = g.objectStore("content"), k = f.get(v.path);
          k.onsuccess = () => {
            const x = k.result;
            x && (f.delete(v.path), f.put({ path: $, content: x.content }));
          }, await new Promise((x) => {
            g.oncomplete = () => x(void 0);
          }), v.path !== $ && await this.removeExact(v.path);
        }
      } else {
        const c = await this.uniqueName(r, d.basename, a), _ = this.join(r, c), w = this.cloneEntry(d, {
          path: _,
          dir: r,
          basename: c,
          extension: this.getExtension(c),
          last_modified: Date.now()
        });
        await this.upsert(w);
        const v = (await this.getDB()).transaction(["content"], "readwrite"), $ = v.objectStore("content"), F = $.get(d.path);
        F.onsuccess = () => {
          const D = F.result;
          D && ($.delete(d.path), $.put({ path: _, content: D.content }));
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
          const w = c.content;
          if (typeof w == "string")
            n({
              content: w,
              mimeType: _?.mime_type || void 0
            });
          else {
            const h = new Uint8Array(w);
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
          const w = await r.arrayBuffer(), v = (await this.getDB()).transaction(["content"], "readwrite");
          v.objectStore("content").put({ path: _.path, content: w }), await new Promise((F) => {
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
const Xt = {
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
function mo(i) {
  const e = G(i.state);
  return {
    current: j(() => e.value.theme || "silver"),
    set: (a) => {
      i.set("theme", a);
    }
  };
}
const go = (i, e) => {
  const t = oo(i.id ?? "vf"), n = qn(), a = e.i18n, l = i.locale ?? e.locale, d = fo(i.id ?? "vf", i.config ?? {}), r = po();
  if (!i.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new ho(i.driver);
  return _t({
    // app version
    version: ro,
    // config store
    config: d,
    // Theme
    theme: (() => {
      const _ = mo(d);
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
    i18n: io(
      t,
      l,
      n,
      a
    ),
    // modal state
    modal: co(d),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: zn(c),
    // active features
    features: fn(i.features),
    // selection mode
    selectionMode: i.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: j(() => i.selectionFilterType || "both"),
    selectionFilterMimeIncludes: j(() => i.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: d.get("metricUnits") ? _n : Mt,
    // possible items of the context menu
    contextMenuItems: i.contextMenuItems,
    // expose custom uploader if provided
    customUploader: i.customUploader
  });
}, wo = ["data-theme"], yo = { class: "vuefinder__modal-layout__container" }, bo = { class: "vuefinder__modal-layout__content" }, ko = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, $o = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, xo = { class: "vuefinder__modal-drag-message" }, Me = /* @__PURE__ */ Q({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(i) {
    const e = E(null), t = J();
    t.config;
    const n = i;
    he(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Le(() => {
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
    return (l, d) => (u(), p("div", {
      "data-theme": s(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: d[1] || (d[1] = st((r) => s(t).modal.close(), ["esc"]))
    }, [
      d[2] || (d[2] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", yo, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: a,
          onMousedown: d[0] || (d[0] = ve((r) => s(t).modal.close(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            o("div", bo, [
              Ce(l.$slots, "default")
            ]),
            l.$slots.buttons ? (u(), p("div", ko, [
              Ce(l.$slots, "buttons")
            ])) : M("", !0)
          ], 512)
        ], 32)
      ]),
      n.showDragOverlay ? (u(), p("div", $o, [
        o("div", xo, y(n.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : M("", !0)
    ], 40, wo));
  }
}), So = { class: "vuefinder__modal-header" }, Co = { class: "vuefinder__modal-header__icon-container" }, Fo = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Oe = /* @__PURE__ */ Q({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(i) {
    return (e, t) => (u(), p("div", So, [
      o("div", Co, [
        (u(), R(an(i.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("div", Fo, y(i.title), 1)
    ]));
  }
}), Do = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Po(i, e) {
  return u(), p("svg", Do, [...e[0] || (e[0] = [
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
const mn = { render: Po }, Eo = { class: "vuefinder__about-modal__content" }, Mo = { class: "vuefinder__about-modal__main" }, To = { class: "vuefinder__about-modal__tab-content" }, Io = { class: "vuefinder__about-modal__lead" }, Ao = { class: "vuefinder__about-modal__description" }, Oo = { class: "vuefinder__about-modal__links" }, Bo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Lo = { class: "vuefinder__about-modal__meta" }, Vo = { class: "vuefinder__about-modal__meta-item" }, zo = { class: "vuefinder__about-modal__meta-label" }, Ro = { class: "vuefinder__about-modal__meta-value" }, No = { class: "vuefinder__about-modal__meta-item" }, Uo = { class: "vuefinder__about-modal__meta-label" }, gn = /* @__PURE__ */ Q({
  __name: "ModalAbout",
  setup(i) {
    const e = J(), { t } = e.i18n;
    return (n, a) => (u(), R(Me, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: a[0] || (a[0] = (l) => s(e).modal.close())
        }, y(s(t)("Close")), 1)
      ]),
      default: te(() => [
        o("div", Eo, [
          B(Oe, {
            icon: s(mn),
            title: "Vuefinder " + s(e).version
          }, null, 8, ["icon", "title"]),
          o("div", Mo, [
            o("div", To, [
              o("div", Io, y(s(t)("A modern, customizable file manager component built for Vue.")), 1),
              o("div", Ao, y(s(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              o("div", Oo, [
                o("a", Bo, y(s(t)("Project Home")), 1),
                a[1] || (a[1] = o("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              o("div", Lo, [
                o("div", Vo, [
                  o("span", zo, y(s(t)("Version")), 1),
                  o("span", Ro, y(s(e).version), 1)
                ]),
                o("div", No, [
                  o("span", Uo, y(s(t)("License")), 1),
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
}), jo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ho(i, e) {
  return u(), p("svg", jo, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const wn = { render: Ho }, Ko = { class: "vuefinder__delete-modal__content" }, qo = { class: "vuefinder__delete-modal__form" }, Wo = { class: "vuefinder__delete-modal__description" }, Go = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Yo = {
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
}, Xo = { class: "vuefinder__delete-modal__file-name" }, Jo = { class: "vuefinder__delete-modal__warning" }, ht = /* @__PURE__ */ Q({
  __name: "ModalDelete",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = E(e.modal.data.items), d = () => {
      l.value.length && e.adapter.delete({
        path: a.value.path,
        items: l.value.map(({ path: r, type: c }) => ({
          path: r,
          type: c
        }))
      }).then((r) => {
        de.success(t("Files deleted.")), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(Ee(r, t("Failed to delete files")));
      });
    };
    return (r, c) => (u(), R(Me, null, {
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
        o("div", Jo, y(s(t)("This action cannot be undone.")), 1)
      ]),
      default: te(() => [
        o("div", null, [
          B(Oe, {
            icon: s(wn),
            title: s(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", Ko, [
            o("div", qo, [
              o("p", Wo, y(s(t)("Are you sure you want to delete these files?")), 1),
              o("div", Go, [
                (u(!0), p(_e, null, we(l.value, (_) => (u(), p("p", {
                  key: _.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  _.type === "dir" ? (u(), p("svg", Yo, [...c[1] || (c[1] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), p("svg", Qo, [...c[2] || (c[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Xo, y(_.basename), 1)
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
function es(i, e) {
  return u(), p("svg", Zo, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
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
}, as = { class: "vuefinder__rename-modal__item-name" }, mt = /* @__PURE__ */ Q({
  __name: "ModalRename",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = E(e.modal.data.items[0]), d = E(l.value.basename), r = () => {
      d.value != l.value.basename && e.adapter.rename({
        path: a.value.path,
        item: l.value.path,
        name: d.value
      }).then((c) => {
        de.success(t("%s is renamed.", d.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(Ee(c, t("Failed to rename")));
      });
    };
    return (c, _) => (u(), R(Me, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(t)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (w) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: te(() => [
        o("div", null, [
          B(Oe, {
            icon: s(yn),
            title: s(t)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", ts, [
            o("div", ns, [
              o("p", os, [
                l.value.type === "dir" ? (u(), p("svg", ss, [..._[2] || (_[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), p("svg", is, [..._[3] || (_[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", as, y(l.value.basename), 1)
              ]),
              ge(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (w) => d.value = w),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: st(r, ["enter"])
              }, null, 544), [
                [it, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Ve() {
  const i = J(), e = j(() => i.features);
  return {
    enabled: (n) => e.value[n] ?? !1
  };
}
const rs = { class: "vuefinder__text-preview" }, ls = { class: "vuefinder__text-preview__header" }, ds = ["title"], cs = { class: "vuefinder__text-preview__actions" }, us = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, vs = { key: 1 }, fs = /* @__PURE__ */ Q({
  __name: "Text",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = e, n = E(""), a = E(""), l = E(null), d = E(!1), r = J(), { enabled: c } = Ve(), { t: _ } = r.i18n;
    he(async () => {
      try {
        const v = await r.adapter.getContent({ path: r.modal.data.item.path });
        n.value = v.content, t("success");
      } catch (v) {
        Ee(v, "Failed to load text content"), t("success");
      }
    });
    const w = () => {
      d.value = !d.value, a.value = n.value, r.modal.setEditMode(d.value);
    }, h = async () => {
      try {
        const v = r.modal.data.item.path;
        await r.adapter.save({
          path: v,
          content: a.value
        }), n.value = a.value, de.success(_("Updated.")), t("success"), d.value = !d.value;
      } catch (v) {
        de.error(Ee(v, _("Failed to save file")));
      }
    };
    return (v, $) => (u(), p("div", rs, [
      o("div", ls, [
        o("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: s(r).modal.data.item.path
        }, y(s(r).modal.data.item.basename), 9, ds),
        o("div", cs, [
          d.value ? (u(), p("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: h
          }, y(s(_)("Save")), 1)) : M("", !0),
          s(c)("edit") ? (u(), p("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: $[0] || ($[0] = (F) => w())
          }, y(d.value ? s(_)("Cancel") : s(_)("Edit")), 1)) : M("", !0)
        ])
      ]),
      o("div", null, [
        d.value ? (u(), p("div", vs, [
          ge(o("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": $[1] || ($[1] = (F) => a.value = F),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [it, a.value]
          ])
        ])) : (u(), p("pre", us, y(n.value), 1))
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
}, ke = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function bn(i) {
  const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = e.config, d = E({ QUEUE_ENTRY_STATUS: ke }), r = E(null), c = E(null), _ = E(null), w = E(null), h = E(null), v = E([]), $ = E(""), F = E(!1), D = E(!1), m = E(null);
  let g;
  const f = (P) => {
    P.preventDefault(), P.stopPropagation(), D.value = !0;
  }, k = (P) => {
    P.preventDefault(), P.stopPropagation(), D.value = !0;
  }, x = (P) => {
    P.preventDefault(), P.stopPropagation(), (!P.relatedTarget || P.relatedTarget === document.body) && (D.value = !1);
  }, S = (P) => {
    P.preventDefault(), P.stopPropagation(), D.value = !1;
    const b = /^[/\\](.+)/, C = P.dataTransfer;
    C && (C.items && C.items.length ? Array.from(C.items).forEach((I) => {
      if (I.kind === "file") {
        const U = I.webkitGetAsEntry?.();
        if (U)
          It((K, ie) => {
            const ye = b.exec(K?.fullPath || "");
            L(ie, ye ? ye[1] : ie.name);
          }, U);
        else {
          const K = I.getAsFile?.();
          K && L(K);
        }
      }
    }) : C.files && C.files.length && Array.from(C.files).forEach((I) => L(I)));
  }, T = (P) => v.value.findIndex((b) => b.id === P), L = (P, b) => g.addFile({ name: b || P.name, type: P.type, data: P, source: "Local" }), Y = (P) => P.status === ke.DONE ? "text-green-600" : P.status === ke.ERROR || P.status === ke.CANCELED ? "text-red-600" : "", W = (P) => P.status === ke.DONE ? "✓" : P.status === ke.ERROR || P.status === ke.CANCELED ? "!" : "...", ne = () => w.value?.click(), re = () => e.modal.close(), le = (P) => {
    if (F.value || !v.value.filter((b) => b.status !== ke.DONE).length) {
      F.value || ($.value = t("Please select file to upload first."));
      return;
    }
    $.value = "", m.value = P || a.value, g.upload();
  }, A = () => {
    g.cancelAll(), v.value.forEach((P) => {
      P.status !== ke.DONE && (P.status = ke.CANCELED, P.statusName = t("Canceled"));
    }), F.value = !1;
  }, Z = (P) => {
    F.value || (g.removeFile(P.id), v.value.splice(T(P.id), 1));
  }, q = (P) => {
    if (!F.value)
      if (g.cancelAll(), P) {
        const b = v.value.filter((C) => C.status !== ke.DONE);
        v.value = [], b.forEach((C) => L(C.originalFile, C.name));
      } else
        v.value = [];
  }, N = (P) => {
    P.forEach((b) => {
      L(b);
    });
  };
  return he(() => {
    g = new Qn({
      debug: e.debug,
      restrictions: { maxFileSize: lo(l.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (I, U) => {
        if (U[I.id] != null) {
          const ie = T(I.id);
          v.value[ie]?.status === ke.PENDING && ($.value = g.i18n("noDuplicates", { fileName: I.name })), v.value = v.value.filter((ye) => ye.id !== I.id);
        }
        return v.value.push({
          id: I.id,
          name: I.name,
          size: e.filesize(I.size),
          status: ke.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: I.data
        }), !0;
      }
    });
    const P = {
      getTargetPath: () => (m.value || a.value).path
    };
    if (i)
      i(g, P);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(g, P);
    else
      throw new Error("No uploader configured");
    g.on("restriction-failed", (I, U) => {
      const K = v.value[T(I.id)];
      K && Z(K), $.value = U.message;
    }), g.on("upload-progress", (I, U) => {
      const K = U.bytesTotal ?? 1, ie = Math.floor(U.bytesUploaded / K * 100), ye = T(I.id);
      ye !== -1 && v.value[ye] && (v.value[ye].percent = `${ie}%`);
    }), g.on("upload-success", (I) => {
      const U = v.value[T(I.id)];
      U && (U.status = ke.DONE, U.statusName = t("Done"));
    }), g.on("upload-error", (I, U) => {
      const K = v.value[T(I.id)];
      K && (K.percent = null, K.status = ke.ERROR, K.statusName = U?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : U?.message || t("Unknown Error"));
    }), g.on("error", (I) => {
      $.value = I.message, F.value = !1, e.adapter.open(a.value.path);
    }), g.on("complete", () => {
      F.value = !1;
      const I = m.value || a.value;
      e.adapter.invalidateListQuery(I.path), e.adapter.open(I.path);
      const U = v.value.filter((K) => K.status === ke.DONE).map((K) => K.name);
      e.emitter.emit("vf-upload-complete", U);
    }), w.value?.addEventListener("click", () => c.value?.click()), h.value?.addEventListener("click", () => _.value?.click());
    const b = { capture: !0 };
    document.addEventListener("dragover", f, b), document.addEventListener("dragenter", k, b), document.addEventListener("dragleave", x, b), document.addEventListener("drop", S, b);
    const C = (I) => {
      const U = I.target, K = U.files;
      if (K) {
        for (const ie of K) L(ie);
        U.value = "";
      }
    };
    c.value?.addEventListener("change", C), _.value?.addEventListener("change", C);
  }), Pe(() => {
    const P = { capture: !0 };
    document.removeEventListener("dragover", f, P), document.removeEventListener("dragenter", k, P), document.removeEventListener("dragleave", x, P), document.removeEventListener("drop", S, P);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: _,
    pickFiles: w,
    pickFolders: h,
    queue: v,
    message: $,
    uploading: F,
    hasFilesInDropArea: D,
    definitions: d,
    openFileSelector: ne,
    upload: le,
    cancel: A,
    remove: Z,
    clear: q,
    close: re,
    getClassNameForEntry: Y,
    getIconForEntry: W,
    addExternalFiles: N
  };
}
const _s = { class: "vuefinder__image-preview" }, ps = { class: "vuefinder__image-preview__header" }, hs = ["title"], ms = { class: "vuefinder__image-preview__actions" }, gs = { class: "vuefinder__image-preview__image-container" }, ws = ["src"], ys = /* @__PURE__ */ Q({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = e, n = J(), { enabled: a } = Ve(), { t: l } = n.i18n, d = E(!1), r = E(
      n.modal.data.item.previewUrl ?? n.adapter.getPreviewUrl({ path: n.modal.data.item.path })
    ), c = E(r.value), { addExternalFiles: _, upload: w, queue: h } = bn(n.customUploader), v = n.fs, $ = G(v.path), F = Qe("cropperRef"), D = async () => {
      d.value = !d.value, n.modal.setEditMode(d.value);
    }, m = async () => {
      const f = F.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!f) return;
      let k = f;
      if (f.width > 1200 || f.height > 1200) {
        const Y = Math.min(1200 / f.width, 1200 / f.height), W = document.createElement("canvas");
        W.width = Math.floor(f.width * Y), W.height = Math.floor(f.height * Y);
        const ne = W.getContext("2d");
        ne && (ne.drawImage(f, 0, 0, W.width, W.height), k = W);
      }
      const x = n.modal.data.item.basename, S = x.split(".").pop()?.toLowerCase() || "jpg", T = S === "png" ? "image/png" : S === "gif" ? "image/gif" : "image/jpeg", L = await new Promise((Y) => {
        k.toBlob((W) => Y(W), T);
      });
      if (!L) {
        de.error(l("Failed to save image"));
        return;
      }
      try {
        const Y = new File([L], x, { type: T }), ne = n.modal.data.item.path.split("/");
        ne.pop();
        const le = {
          path: ne.join("/") || ($.value?.path ?? "")
        };
        _([Y]), await new Promise((N) => setTimeout(N, 100));
        const A = h.value.find((N) => N.name === Y.name);
        if (!A)
          throw new Error("File was not added to upload queue");
        w(le);
        let Z = 0;
        for (; Z < 150; ) {
          await new Promise((P) => setTimeout(P, 200));
          const N = h.value.find((P) => P.id === A.id);
          if (N?.status === ke.DONE) break;
          if (N?.status === ke.ERROR)
            throw new Error(N.statusName || "Upload failed");
          Z++;
        }
        de.success(l("Updated.")), await fetch(r.value, { cache: "reload", mode: "no-cors" });
        const q = n.root?.querySelector?.('[data-src="' + r.value + '"]');
        q && q instanceof HTMLElement && cn.resetStatus(q), n.emitter.emit("vf-refresh-thumbnails"), await D(), t("success");
      } catch (Y) {
        de.error(Ee(Y, l("Failed to save image")));
      }
    };
    return he(() => {
      t("success");
    }), (g, f) => (u(), p("div", _s, [
      o("div", ps, [
        o("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: s(n).modal.data.item.path
        }, y(s(n).modal.data.item.basename), 9, hs),
        o("div", ms, [
          d.value ? (u(), p("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: m
          }, y(s(l)("Crop")), 1)) : M("", !0),
          s(a)("edit") ? (u(), p("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: f[0] || (f[0] = (k) => D())
          }, y(d.value ? s(l)("Cancel") : s(l)("Edit")), 1)) : M("", !0)
        ])
      ]),
      o("div", gs, [
        d.value ? (u(), R(s(Xn), {
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
function ks(i, e) {
  return u(), p("svg", bs, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const nt = { render: ks }, $s = { class: "vuefinder__default-preview" }, xs = { class: "vuefinder__default-preview__content" }, Ss = { class: "vuefinder__default-preview__header" }, Cs = ["title"], Fs = { class: "vuefinder__default-preview__icon-container" }, Ds = ["title"], Ps = /* @__PURE__ */ Q({
  __name: "Default",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = J(), n = e;
    return he(() => {
      n("success");
    }), (a, l) => (u(), p("div", $s, [
      o("div", xs, [
        o("div", Ss, [
          o("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Cs)
        ]),
        o("div", Fs, [
          B(s(nt), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Ds)
        ])
      ])
    ]));
  }
}), Es = { class: "vuefinder__video-preview" }, Ms = ["title"], Ts = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Is = ["src"], As = /* @__PURE__ */ Q({
  __name: "Video",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = J(), n = e, a = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return he(() => {
      n("success");
    }), (l, d) => (u(), p("div", Es, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Ms),
      o("div", null, [
        o("video", Ts, [
          o("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Is),
          d[0] || (d[0] = ce(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Os = { class: "vuefinder__audio-preview" }, Bs = ["title"], Ls = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Vs = ["src"], zs = /* @__PURE__ */ Q({
  __name: "Audio",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = e, n = J(), a = () => {
      const l = J();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return he(() => {
      t("success");
    }), (l, d) => (u(), p("div", Os, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: s(n).modal.data.item.path
      }, y(s(n).modal.data.item.basename), 9, Bs),
      o("div", null, [
        o("audio", Ls, [
          o("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Vs),
          d[0] || (d[0] = ce(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Rs = { class: "vuefinder__pdf-preview" }, Ns = ["title"], Us = ["data"], js = ["src"], Hs = /* @__PURE__ */ Q({
  __name: "Pdf",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = J(), n = e, a = () => {
      const l = J();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return he(() => {
      n("success");
    }), (l, d) => (u(), p("div", Rs, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Ns),
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
          }, " Your browser does not support PDFs ", 8, js)
        ], 8, Us)
      ])
    ]));
  }
});
function Ks(i, e = null) {
  return new Date(i * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const qs = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Ws = ["disabled", "title"], Gs = ["disabled", "title"], Ys = { class: "vuefinder__preview-modal__content" }, Qs = { key: 0 }, Xs = { class: "vuefinder__preview-modal__loading" }, Js = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Zs = { class: "vuefinder__preview-modal__details" }, ei = { class: "font-bold" }, ti = { class: "pl-2 font-bold" }, ni = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, oi = ["download", "href"], gt = /* @__PURE__ */ Q({
  __name: "ModalPreview",
  setup(i) {
    const e = J(), { enabled: t } = Ve(), { t: n } = e.i18n, a = E(!1), l = (f) => {
      const k = (f || "").split("/").pop() || "", x = k.lastIndexOf(".");
      return x >= 0 ? k.slice(x + 1).toLowerCase() : "";
    }, d = (f, k) => {
      if (!k) return !1;
      const x = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), S = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), T = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), L = /* @__PURE__ */ new Set([
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
      return f === "image" ? x.has(k) : f === "video" ? S.has(k) : f === "audio" ? T.has(k) : f === "text" ? L.has(k) : f === "application/pdf" ? k === "pdf" : !1;
    }, r = (f) => {
      const k = e.modal.data.item.mime_type;
      if (k && typeof k == "string") return k.startsWith(f);
      const x = l(e.modal.data.item.path);
      return d(f, x);
    }, c = t("preview");
    c || (a.value = !0);
    const _ = j(() => e.modal.data.item), w = G(e.fs.sortedFiles), h = j(() => w.value.filter((f) => f.type === "file")), v = j(
      () => h.value.findIndex((f) => f.path === _.value.path)
    ), $ = j(() => v.value > 0), F = j(() => v.value < h.value.length - 1), D = () => {
      if (e.modal.editMode || !$.value) return;
      const f = h.value[v.value - 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, m = () => {
      if (e.modal.editMode || !F.value) return;
      const f = h.value[v.value + 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, g = (f) => {
      if (f.key === "Escape") {
        f.preventDefault(), f.stopPropagation(), e.modal.close();
        return;
      }
      (f.key === "ArrowLeft" || f.key === "ArrowRight") && (f.preventDefault(), f.stopPropagation(), f.key === "ArrowLeft" ? D() : m());
    };
    return he(() => {
      const f = document.querySelector(".vuefinder__preview-modal");
      f && f.focus();
    }), (f, k) => (u(), R(Me, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[6] || (k[6] = (x) => s(e).modal.close())
        }, y(s(n)("Close")), 1),
        s(t)("download") ? (u(), p("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path }),
          href: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path })
        }, y(s(n)("Download")), 9, oi)) : M("", !0)
      ]),
      default: te(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: g
        }, [
          s(e).modal.editMode ? M("", !0) : (u(), p("div", qs, [
            o("button", {
              disabled: !$.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: s(n)("Previous file"),
              onClick: D
            }, [...k[7] || (k[7] = [
              o("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                o("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, Ws),
            o("button", {
              disabled: !F.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: s(n)("Next file"),
              onClick: m
            }, [...k[8] || (k[8] = [
              o("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                o("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, Gs)
          ])),
          o("div", Ys, [
            s(c) ? (u(), p("div", Qs, [
              r("text") ? (u(), R(fs, {
                key: `text-${_.value.path}`,
                onSuccess: k[0] || (k[0] = (x) => a.value = !0)
              })) : r("image") ? (u(), R(ys, {
                key: `image-${_.value.path}`,
                onSuccess: k[1] || (k[1] = (x) => a.value = !0)
              })) : r("video") ? (u(), R(As, {
                key: `video-${_.value.path}`,
                onSuccess: k[2] || (k[2] = (x) => a.value = !0)
              })) : r("audio") ? (u(), R(zs, {
                key: `audio-${_.value.path}`,
                onSuccess: k[3] || (k[3] = (x) => a.value = !0)
              })) : r("application/pdf") ? (u(), R(Hs, {
                key: `pdf-${_.value.path}`,
                onSuccess: k[4] || (k[4] = (x) => a.value = !0)
              })) : (u(), R(Ps, {
                key: `default-${_.value.path}`,
                onSuccess: k[5] || (k[5] = (x) => a.value = !0)
              }))
            ])) : M("", !0),
            o("div", Xs, [
              a.value === !1 ? (u(), p("div", Js, [
                k[9] || (k[9] = o("svg", {
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
              ])) : M("", !0)
            ])
          ])
        ], 32),
        o("div", Zs, [
          o("div", null, [
            o("span", ei, y(s(n)("File Size")) + ": ", 1),
            ce(y(s(e).filesize(s(e).modal.data.item.file_size)), 1)
          ]),
          o("div", null, [
            o("span", ti, y(s(n)("Last Modified")) + ": ", 1),
            ce(" " + y(s(Ks)(s(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        s(t)("download") ? (u(), p("div", ni, [
          o("span", null, y(s(n)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : M("", !0)
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
function ii(i, e) {
  return u(), p("svg", si, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const ai = { render: ii }, ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function li(i, e) {
  return u(), p("svg", ri, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const At = { render: li }, di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ci(i, e) {
  return u(), p("svg", di, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ne = { render: ci }, ui = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function vi(i, e) {
  return u(), p("svg", ui, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 5v14M5 12h14" }, null, -1)
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
function _i(i, e) {
  return u(), p("svg", fi, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M5 12h14" }, null, -1)
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
function hi(i, e) {
  return u(), p("svg", pi, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const Ot = { render: hi }, mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function gi(i, e) {
  return u(), p("svg", mi, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const Bt = { render: gi }, wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function yi(i, e) {
  return u(), p("svg", wi, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Lt = { render: yi }, bi = { class: "vuefinder__modal-tree__folder-item" }, ki = { class: "vuefinder__modal-tree__folder-content" }, $i = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, xi = { class: "vuefinder__modal-tree__folder-text" }, Si = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Ci = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Fi = 300, Di = /* @__PURE__ */ Q({
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
    const t = J(), { t: n } = t.i18n, a = t.fs, l = E({}), d = i, r = e;
    G(a.path);
    const c = j(() => {
      const L = `${d.storage}:${d.folder.path}`;
      return d.expandedFolders[L] || !1;
    }), _ = j(() => d.modelValue?.path === d.folder.path), w = j(() => d.currentPath?.path === d.folder.path), h = j(() => d.modalTreeData[d.folder.path] || []), v = j(() => {
      const L = h.value, Y = l.value[d.folder.path] || 50;
      return L.length > Y ? L.slice(0, Y) : L;
    }), $ = j(() => h.value.length), F = j(() => l.value[d.folder.path] || 50), D = j(() => $.value > F.value), m = () => {
      l.value[d.folder.path] = (F.value || 50) + 50;
    }, g = j(() => h.value.length > 0 || d.folder.type === "dir"), f = () => {
      r("toggleFolder", d.storage, d.folder.path);
    }, k = () => {
      r("update:modelValue", d.folder);
    }, x = () => {
      r("update:modelValue", d.folder), r("selectAndClose", d.folder);
    };
    let S = 0;
    const T = () => {
      const L = Date.now();
      L - S < Fi ? x() : k(), S = L;
    };
    return (L, Y) => {
      const W = rn("ModalTreeFolderItem", !0);
      return u(), p("div", bi, [
        o("div", ki, [
          g.value ? (u(), p("div", {
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
          ])) : (u(), p("div", $i)),
          o("div", {
            class: X(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": _.value,
              "vuefinder__modal-tree__folder-link--current": w.value
            }]),
            onClick: k,
            onDblclick: x,
            onTouchend: T
          }, [
            c.value ? (u(), R(s(Lt), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), R(s(Ne), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", xi, y(i.folder.basename), 1)
          ], 34)
        ]),
        c.value && g.value ? (u(), p("div", Si, [
          (u(!0), p(_e, null, we(v.value, (ne) => (u(), R(W, {
            key: ne.path,
            folder: ne,
            storage: i.storage,
            "model-value": i.modelValue,
            "expanded-folders": i.expandedFolders,
            "modal-tree-data": i.modalTreeData,
            "current-path": i.currentPath,
            "onUpdate:modelValue": Y[0] || (Y[0] = (re) => L.$emit("update:modelValue", re)),
            onSelectAndClose: Y[1] || (Y[1] = (re) => L.$emit("selectAndClose", re)),
            onToggleFolder: Y[2] || (Y[2] = (re, le) => L.$emit("toggleFolder", re, le))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          D.value ? (u(), p("div", Ci, [
            o("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: m
            }, y(s(n)("load more")), 1)
          ])) : M("", !0)
        ])) : M("", !0)
      ]);
    };
  }
}), Pi = { class: "vuefinder__modal-tree" }, Ei = { class: "vuefinder__modal-tree__header" }, Mi = { class: "vuefinder__modal-tree__title" }, Ti = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Ii = { class: "vuefinder__modal-tree__section-title" }, Ai = { class: "vuefinder__modal-tree__list" }, Oi = ["onClick", "onDblclick", "onTouchend"], Bi = { class: "vuefinder__modal-tree__text" }, Li = { class: "vuefinder__modal-tree__text-storage" }, Vi = { class: "vuefinder__modal-tree__section-title" }, zi = { class: "vuefinder__modal-tree__list" }, Ri = { class: "vuefinder__modal-tree__storage-item" }, Ni = { class: "vuefinder__modal-tree__storage-content" }, Ui = ["onClick"], ji = ["onClick", "onDblclick", "onTouchend"], Hi = { class: "vuefinder__modal-tree__storage-text" }, Ki = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, qi = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Wi = ["onClick"], Jt = 300, Vt = /* @__PURE__ */ Q({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(i, { emit: e }) {
    const t = J(), { t: n } = t.i18n, a = t.fs, l = t.config, d = e, r = G(a.sortedFiles), c = G(a.storages), _ = j(() => c.value || []), w = G(a.path), h = E(null), v = E({}), $ = E({}), F = E({});
    ue(r, (A) => {
      const Z = A.filter((N) => N.type === "dir"), q = w.value?.path || "";
      q && ($.value[q] = Z.map((N) => ({
        ...N,
        type: "dir"
      })));
    });
    const D = (A, Z) => {
      const q = `${A}:${Z}`;
      v.value = {
        ...v.value,
        [q]: !v.value[q]
      }, v.value[q] && !$.value[Z] && t.adapter.list(Z).then((N) => {
        const b = (N.files || []).filter((C) => C.type === "dir");
        $.value[Z] = b.map((C) => ({
          ...C,
          type: "dir"
        }));
      });
    }, m = (A) => $.value[A] || [], g = (A) => F.value[A] || 50, f = (A) => {
      const Z = m(A), q = g(A);
      return Z.length > q ? Z.slice(0, q) : Z;
    }, k = (A) => m(A).length, x = (A) => k(A) > g(A), S = (A) => {
      F.value[A] = g(A) + 50;
    }, T = (A) => {
      A && d("update:modelValue", A);
    }, L = (A) => {
      A && (d("update:modelValue", A), d("selectAndClose", A));
    }, Y = (A) => {
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
      d("update:modelValue", Z);
    }, W = (A) => {
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
      d("update:modelValue", Z), d("selectAndClose", Z);
    };
    let ne = 0;
    const re = (A) => {
      if (!A) return;
      const Z = Date.now();
      Z - ne < Jt ? L(A) : T(A), ne = Z;
    }, le = (A) => {
      const Z = Date.now();
      Z - ne < Jt ? W(A) : Y(A), ne = Z;
    };
    return he(() => {
      h.value && tt(h.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (A, Z) => (u(), p("div", Pi, [
      o("div", Ei, [
        o("div", Mi, y(s(n)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: h,
        class: "vuefinder__modal-tree__content"
      }, [
        i.showPinnedFolders && s(t).features.pinned && s(l).get("pinnedFolders").length ? (u(), p("div", Ti, [
          o("div", Ii, y(s(n)("Pinned Folders")), 1),
          o("div", Ai, [
            (u(!0), p(_e, null, we(s(l).get("pinnedFolders"), (q) => (u(), p("div", {
              key: q.path,
              class: X(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": i.modelValue?.path === q.path }]),
              onClick: (N) => T(q),
              onDblclick: (N) => L(q),
              onTouchend: (N) => re(q)
            }, [
              B(s(Ne), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", Bi, y(q.basename), 1),
              o("div", Li, y(q.storage), 1),
              B(s(Ot), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Oi))), 128))
          ])
        ])) : M("", !0),
        o("div", Vi, y(s(n)("Storages")), 1),
        (u(!0), p(_e, null, we(_.value, (q) => (u(), p("div", {
          key: q,
          class: "vuefinder__modal-tree__section"
        }, [
          o("div", zi, [
            o("div", Ri, [
              o("div", Ni, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ve((N) => D(q, q + "://"), ["stop"])
                }, [
                  v.value[`${q}:${q}://`] ? (u(), R(s(yt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), R(s(wt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Ui),
                o("div", {
                  class: X(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": i.modelValue?.path === q + "://"
                  }]),
                  onClick: (N) => Y(q),
                  onDblclick: (N) => W(q),
                  onTouchend: (N) => le(q)
                }, [
                  B(s(Bt), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", Hi, y(q), 1)
                ], 42, ji)
              ]),
              v.value[`${q}:${q}://`] ? (u(), p("div", Ki, [
                (u(!0), p(_e, null, we(f(q + "://"), (N) => (u(), R(Di, {
                  key: N.path,
                  folder: N,
                  storage: q,
                  "model-value": i.modelValue,
                  "expanded-folders": v.value,
                  "modal-tree-data": $.value,
                  "current-path": i.currentPath,
                  "onUpdate:modelValue": T,
                  onSelectAndClose: L,
                  onToggleFolder: D
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                x(q + "://") ? (u(), p("div", qi, [
                  o("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (N) => S(q + "://")
                  }, y(s(n)("load more")), 9, Wi)
                ])) : M("", !0)
              ])) : M("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Gi = ["title"], Ft = /* @__PURE__ */ Q({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(i, { emit: e }) {
    const t = e, n = J(), { t: a } = n.i18n, l = E(!1), d = E(null), r = E(d.value?.innerHTML);
    ue(r, () => l.value = !1);
    const c = () => {
      t("hidden"), l.value = !0;
    };
    return (_, w) => (u(), p("div", null, [
      l.value ? M("", !0) : (u(), p("div", {
        key: 0,
        ref_key: "strMessage",
        ref: d,
        class: X(["vuefinder__message", i.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ce(_.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          title: s(a)("Close"),
          onClick: c
        }, [...w[0] || (w[0] = [
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
        ])], 8, Gi)
      ], 2))
    ]));
  }
}), Yi = { class: "vuefinder__move-modal__content" }, Qi = { class: "vuefinder__move-modal__description" }, Xi = { class: "vuefinder__move-modal__files vf-scrollbar" }, Ji = { class: "vuefinder__move-modal__file-name" }, Zi = { class: "vuefinder__move-modal__target-title" }, ea = { class: "vuefinder__move-modal__target-container" }, ta = { class: "vuefinder__move-modal__target-path" }, na = { class: "vuefinder__move-modal__target-storage" }, oa = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, sa = { class: "vuefinder__move-modal__target-badge" }, ia = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, aa = { class: "vuefinder__move-modal__checkbox-label" }, ra = { class: "vuefinder__move-modal__checkbox-text" }, la = ["disabled"], da = { class: "vuefinder__move-modal__selected-items" }, kn = /* @__PURE__ */ Q({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(i) {
    const e = J(), { enabled: t } = Ve(), { t: n } = e.i18n, a = i, l = E(e.modal.data.items.from), d = E(e.modal.data.items.to), r = E(""), c = E(a.copy || !t("move")), _ = j(() => c.value ? "copy" : "move"), w = E(!1), h = G(e.fs.path), v = j(() => c.value ? n("Copy files") : n("Move files")), $ = j(
      () => c.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), F = j(() => c.value ? n("Yes, Copy!") : n("Yes, Move!"));
    j(() => c.value ? n("Files copied.") : n("Files moved."));
    const D = (S) => {
      S && (d.value = S);
    }, m = (S) => {
      S && (d.value = S, w.value = !1);
    }, g = j(() => {
      const S = d.value;
      return S ? l.value.some((T) => !!(S.path === T.path || T.path.startsWith(S.path + "/") || T.type === "dir" && S.path.startsWith(T.path + "/"))) : !0;
    }), f = j(() => {
      if (!g.value)
        return "";
      const S = d.value;
      return S ? l.value.find((L) => S.path === L.path || L.path.startsWith(S.path + "/") || L.type === "dir" && S.path.startsWith(L.path + "/")) ? n("Cannot move/copy item to itself or its parent/child directory") : n("Invalid destination directory") : n("Please select a destination directory");
    }), k = () => {
      const S = d.value.path;
      if (!S) return { storage: "local", path: "" };
      if (S.endsWith("://"))
        return { storage: S.replace("://", ""), path: "" };
      const T = S.split("://");
      return {
        storage: T[0] || "local",
        path: T[1] || ""
      };
    }, x = async () => {
      if (l.value.length)
        try {
          const { files: S } = await e.adapter[_.value]({
            path: h.value.path,
            sources: l.value.map(({ path: T }) => T),
            destination: d.value.path
          });
          e.fs.setFiles(S), e.modal.close();
        } catch (S) {
          de.error(Ee(S, n("Failed to transfer files")));
        }
    };
    return (S, T) => (u(), R(Me, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: x
        }, y(F.value), 9, la),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: T[4] || (T[4] = (L) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1),
        o("div", da, y(s(n)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: te(() => [
        o("div", null, [
          B(Oe, {
            icon: c.value ? s(At) : s(ai),
            title: v.value
          }, null, 8, ["icon", "title"]),
          o("div", Yi, [
            o("p", Qi, y($.value), 1),
            o("div", Xi, [
              (u(!0), p(_e, null, we(l.value, (L) => (u(), p("div", {
                key: L.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  L.type === "dir" ? (u(), R(s(Ne), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), R(s(nt), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                o("div", Ji, y(L.path), 1)
              ]))), 128))
            ]),
            o("h4", Zi, y(s(n)("Target Directory")), 1),
            o("div", ea, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: T[0] || (T[0] = (L) => w.value = !w.value)
              }, [
                o("div", ta, [
                  o("span", na, y(k().storage) + "://", 1),
                  k().path ? (u(), p("span", oa, y(k().path), 1)) : M("", !0)
                ]),
                o("span", sa, y(s(n)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: X([
                "vuefinder__move-modal__tree-selector",
                w.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              B(Vt, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  T[1] || (T[1] = (L) => d.value = L),
                  D
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: m
              }, null, 8, ["modelValue"])
            ], 2),
            s(t)("copy") && s(t)("move") ? (u(), p("div", ia, [
              o("label", aa, [
                ge(o("input", {
                  "onUpdate:modelValue": T[2] || (T[2] = (L) => c.value = L),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Pt, c.value]
                ]),
                o("span", ra, y(s(n)("Create a copy instead of moving")), 1)
              ])
            ])) : M("", !0),
            f.value ? (u(), R(Ft, {
              key: 1,
              error: ""
            }, {
              default: te(() => [
                ce(y(f.value), 1)
              ]),
              _: 1
            })) : M("", !0),
            r.value.length && !f.value ? (u(), R(Ft, {
              key: 2,
              error: "",
              onHidden: T[3] || (T[3] = (L) => r.value = "")
            }, {
              default: te(() => [
                ce(y(r.value), 1)
              ]),
              _: 1
            })) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Xe = /* @__PURE__ */ Q({
  __name: "ModalMove",
  setup(i) {
    return (e, t) => (u(), R(kn, { copy: !1 }));
  }
}), zt = /* @__PURE__ */ Q({
  __name: "ModalCopy",
  setup(i) {
    return (e, t) => (u(), R(kn, { copy: !0 }));
  }
}), ca = (i, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && i(...a), clearTimeout(n), n = setTimeout(() => {
      i(...a);
    }, e);
  };
}, $n = (i, e, t) => {
  const n = E(i);
  return Rn((a, l) => ({
    get() {
      return a(), n.value;
    },
    set: ca(
      (d) => {
        n.value = d, l();
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
function va(i, e) {
  return u(), p("svg", ua, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Rt = { render: va }, fa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function _a(i, e) {
  return u(), p("svg", fa, [...e[0] || (e[0] = [
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
const bt = { render: _a }, pa = { class: "vuefinder__search-modal__search-input" }, ha = ["value", "placeholder", "disabled"], ma = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, ga = /* @__PURE__ */ Q({
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
      const w = _.target;
      n("update:modelValue", w.value);
    }, c = (_) => {
      n("keydown", _);
    };
    return e({
      focus: () => {
        d.value && d.value.focus();
      }
    }), (_, w) => (u(), p("div", pa, [
      B(s(Rt), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: d,
        value: i.modelValue,
        type: "text",
        placeholder: s(l)("Search Files"),
        disabled: i.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: w[0] || (w[0] = ve(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, ha),
      i.isSearching ? (u(), p("div", ma, [
        B(s(bt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : M("", !0)
    ]));
  }
}), wa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ya(i, e) {
  return u(), p("svg", wa, [...e[0] || (e[0] = [
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
}, Ma = /* @__PURE__ */ Q({
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
    const w = (D) => {
      if (a("update:selectedOption", D), D.startsWith("size-")) {
        const m = D.split("-")[1];
        a("update:sizeFilter", m);
      }
    }, h = async () => {
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
          const { x: D, y: m } = await lt(r.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [dt(8), ct({ padding: 16 }), ut({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${D}px`,
            top: `${m}px`
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
          _ = un(r.value, c.value, async () => {
            if (!(!r.value || !c.value))
              try {
                const { x: D, y: m } = await lt(
                  r.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [dt(8), ct({ padding: 16 }), ut({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${D}px`,
                  top: `${m}px`
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
      const m = ["size-all", "size-small", "size-medium", "size-large"], g = m.findIndex((f) => f === n.selectedOption);
      if (D.key === "ArrowDown") {
        D.preventDefault();
        const f = (g + 1) % m.length;
        a("update:selectedOption", m[f] || null);
      } else if (D.key === "ArrowUp") {
        D.preventDefault();
        const f = g <= 0 ? m.length - 1 : g - 1;
        a("update:selectedOption", m[f] || null);
      } else D.key === "Enter" ? (D.preventDefault(), n.selectedOption?.startsWith("size-") && a(
        "update:sizeFilter",
        n.selectedOption.split("-")[1]
      )) : D.key === "Escape" && (D.preventDefault(), a("update:visible", !1), _ && (_(), _ = null));
    }, F = () => {
      _ && (_(), _ = null);
    };
    return ue(
      () => n.visible,
      (D) => {
        !D && _ && (_(), _ = null);
      }
    ), Pe(() => {
      F();
    }), e({
      cleanup: F
    }), (D, m) => (u(), p(_e, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: X(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": i.visible }]),
        disabled: i.disabled,
        title: s(d)("Search Options"),
        onClick: ve(h, ["stop"])
      }, [
        B(s(xn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, ba),
      (u(), R(pt, { to: "body" }, [
        i.visible ? (u(), p("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": s(l).theme.current,
          tabindex: "-1",
          onClick: m[4] || (m[4] = ve(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          o("div", $a, [
            o("div", xa, [
              o("div", Sa, y(s(d)("File Size")), 1),
              o("div", Ca, [
                o("div", {
                  class: X(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": i.sizeFilter === "all"
                  }]),
                  onClick: m[0] || (m[0] = ve((g) => w("size-all"), ["stop"]))
                }, [
                  o("span", null, y(s(d)("All Files")), 1),
                  i.sizeFilter === "all" ? (u(), p("div", Fa, [...m[5] || (m[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                o("div", {
                  class: X(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": i.sizeFilter === "small"
                  }]),
                  onClick: m[1] || (m[1] = ve((g) => w("size-small"), ["stop"]))
                }, [
                  o("span", null, y(s(d)("Small (< 1MB)")), 1),
                  i.sizeFilter === "small" ? (u(), p("div", Da, [...m[6] || (m[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                o("div", {
                  class: X(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": i.sizeFilter === "medium"
                  }]),
                  onClick: m[2] || (m[2] = ve((g) => w("size-medium"), ["stop"]))
                }, [
                  o("span", null, y(s(d)("Medium (1-10MB)")), 1),
                  i.sizeFilter === "medium" ? (u(), p("div", Pa, [...m[7] || (m[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                o("div", {
                  class: X(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": i.sizeFilter === "large"
                  }]),
                  onClick: m[3] || (m[3] = ve((g) => w("size-large"), ["stop"]))
                }, [
                  o("span", null, y(s(d)("Large (> 10MB)")), 1),
                  i.sizeFilter === "large" ? (u(), p("div", Ea, [...m[8] || (m[8] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, ka)) : M("", !0)
      ]))
    ], 64));
  }
});
function Sn(i, e = 40) {
  const t = i.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return i;
  const n = t[1], a = t[2] ?? "", l = a.split("/").filter(Boolean), d = l.pop();
  if (!d) return n + a;
  let r = `${n}${l.join("/")}${l.length ? "/" : ""}${d}`;
  if (r.length <= e) return r;
  const c = d.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", w = c[1] ?? "", h = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, v = w ? `${h}.${w}` : h;
  return r = `${n}${l.join("/")}${l.length ? "/" : ""}${v}`, r.length > e && (r = `${n}.../${v}`), r;
}
async function Cn(i) {
  try {
    await navigator.clipboard.writeText(i);
  } catch {
    const e = document.createElement("textarea");
    e.value = i, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function ot(i) {
  await Cn(i);
}
async function Ta(i) {
  await Cn(i);
}
const Ia = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Aa(i, e) {
  return u(), p("svg", Ia, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Fn = { render: Aa }, Oa = ["title"], Ba = { class: "vuefinder__search-modal__result-icon" }, La = { class: "vuefinder__search-modal__result-content" }, Va = { class: "vuefinder__search-modal__result-name" }, za = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Ra = ["title"], Na = ["title"], Ua = ["data-item-dropdown", "data-theme"], ja = { class: "vuefinder__search-modal__item-dropdown-content" }, Ha = /* @__PURE__ */ Q({
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
    ue(
      () => t.activeDropdown,
      (g) => {
        r && (r(), r = null), g === t.item.path && d.value && Le(() => {
          h(t.item.path, d.value);
        });
      }
    ), Pe(() => {
      r && (r(), r = null);
    });
    const c = (g) => t.expandedPaths.has(g), _ = (g) => g.type === "dir" || !g.file_size ? "" : Mt(g.file_size), w = (g, f) => {
      f.stopPropagation(), n("toggleItemDropdown", g, f);
    }, h = async (g, f) => {
      const k = document.querySelector(
        `[data-item-dropdown="${g}"]`
      );
      if (!(!k || !f) && (await Le(), !(!k || !f))) {
        Object.assign(k.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x, y: S } = await lt(f, k, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [dt(8), ct({ padding: 16 }), ut({ padding: 16 })]
          });
          Object.assign(k.style, {
            left: `${x}px`,
            top: `${S}px`
          }), requestAnimationFrame(() => {
            k && Object.assign(k.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (x) {
          console.warn("Floating UI initial positioning error:", x);
          return;
        }
        try {
          r = un(f, k, async () => {
            if (!(!f || !k))
              try {
                const { x, y: S } = await lt(f, k, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [dt(8), ct({ padding: 16 }), ut({ padding: 16 })]
                });
                Object.assign(k.style, {
                  left: `${x}px`,
                  top: `${S}px`
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
      n("update:selectedItemDropdownOption", g);
    }, $ = async (g) => {
      await ot(g.path), n("copyPath", g);
    }, F = (g) => {
      n("openContainingFolder", g);
    }, D = (g) => {
      n("preview", g);
    }, m = (g) => {
      if (!t.activeDropdown) return;
      const f = ["copy-path", "open-folder", "preview"], k = t.selectedItemDropdownOption, x = f.findIndex((S) => k?.includes(S));
      if (g.key === "ArrowDown") {
        g.preventDefault();
        const S = (x + 1) % f.length;
        n(
          "update:selectedItemDropdownOption",
          `${f[S] || ""}-${t.activeDropdown}`
        );
      } else if (g.key === "ArrowUp") {
        g.preventDefault();
        const S = x <= 0 ? f.length - 1 : x - 1;
        n(
          "update:selectedItemDropdownOption",
          `${f[S] || ""}-${t.activeDropdown}`
        );
      } else g.key === "Enter" ? (g.preventDefault(), k && (k.includes("copy-path") ? $(t.item) : k.includes("open-folder") ? F(t.item) : k.includes("preview") && D(t.item))) : g.key === "Escape" && (g.preventDefault(), n("update:selectedItemDropdownOption", null));
    };
    return (g, f) => (u(), p("div", {
      class: X(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": i.index === i.selectedIndex }]),
      title: i.item.basename,
      onClick: f[9] || (f[9] = (k) => n("select", i.index))
    }, [
      o("div", Ba, [
        i.item.type === "dir" ? (u(), R(s(Ne), { key: 0 })) : (u(), R(s(nt), { key: 1 }))
      ]),
      o("div", La, [
        o("div", Va, [
          ce(y(i.item.basename) + " ", 1),
          _(i.item) ? (u(), p("span", za, y(_(i.item)), 1)) : M("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: i.item.path,
          onClick: f[0] || (f[0] = ve((k) => {
            n("select", i.index), n("togglePathExpansion", i.item.path);
          }, ["stop"]))
        }, y(c(i.item.path) ? i.item.path : s(Sn)(i.item.path)), 9, Ra)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: d,
        class: "vuefinder__search-modal__result-actions",
        title: s(l)("More actions"),
        onClick: f[1] || (f[1] = (k) => {
          n("selectWithDropdown", i.index), w(i.item.path, k);
        })
      }, [
        B(s(Fn), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Na),
      (u(), R(pt, { to: "body" }, [
        i.activeDropdown === i.item.path ? (u(), p("div", {
          key: 0,
          "data-item-dropdown": i.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": s(a).theme.current,
          tabindex: "-1",
          onClick: f[8] || (f[8] = ve(() => {
          }, ["stop"])),
          onKeydown: m
        }, [
          o("div", ja, [
            o("div", {
              class: X(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": i.selectedItemDropdownOption === `copy-path-${i.item.path}`
              }]),
              onClick: f[2] || (f[2] = (k) => {
                v(`copy-path-${i.item.path}`), $(i.item);
              }),
              onFocus: f[3] || (f[3] = (k) => v(`copy-path-${i.item.path}`))
            }, [
              B(s(At), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(s(l)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: X(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": i.selectedItemDropdownOption === `open-folder-${i.item.path}`
              }]),
              onClick: f[4] || (f[4] = (k) => {
                v(`open-folder-${i.item.path}`), F(i.item);
              }),
              onFocus: f[5] || (f[5] = (k) => v(`open-folder-${i.item.path}`))
            }, [
              B(s(Ne), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(s(l)("Open Containing Folder")), 1)
            ], 34),
            o("div", {
              class: X(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": i.selectedItemDropdownOption === `preview-${i.item.path}`
              }]),
              onClick: f[6] || (f[6] = (k) => {
                v(`preview-${i.item.path}`), D(i.item);
              }),
              onFocus: f[7] || (f[7] = (k) => v(`preview-${i.item.path}`))
            }, [
              B(s(nt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(s(l)("Preview")), 1)
            ], 34)
          ])
        ], 40, Ua)) : M("", !0)
      ]))
    ], 10, Oa));
  }
}), Ka = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, qa = { class: "vuefinder__search-modal__loading-icon" }, Wa = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Ga = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, Ya = { class: "vuefinder__search-modal__results-header" }, Ye = 60, Zt = 5, Qa = /* @__PURE__ */ Q({
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
    const n = i, a = t, l = J(), { t: d } = l.i18n, r = Qe("scrollableContainer"), c = j(() => n.searchResults.length > 0), _ = j(() => n.searchResults.length), w = E(0), h = E(600), v = j(() => n.searchResults.length * Ye), $ = j(() => {
      const k = Math.max(0, Math.floor(w.value / Ye) - Zt), x = Math.min(
        n.searchResults.length,
        Math.ceil((w.value + h.value) / Ye) + Zt
      );
      return { start: k, end: x };
    }), F = j(() => {
      const { start: k, end: x } = $.value;
      return n.searchResults.slice(k, x).map((S, T) => ({
        item: S,
        index: k + T,
        top: (k + T) * Ye
      }));
    }), D = (k) => {
      const x = k.target;
      w.value = x.scrollTop;
    }, m = () => {
      r.value && (h.value = r.value.clientHeight);
    }, g = () => {
      if (n.selectedIndex >= 0 && r.value) {
        const k = n.selectedIndex * Ye, x = k + Ye, S = r.value.scrollTop, T = r.value.clientHeight, L = S + T;
        let Y = S;
        k < S ? Y = k : x > L && (Y = x - T), Y !== S && r.value.scrollTo({
          top: Y,
          behavior: "smooth"
        });
      }
    }, f = () => {
      r.value && (r.value.scrollTop = 0, w.value = 0);
    };
    return he(() => {
      m(), window.addEventListener("resize", m);
    }), Pe(() => {
      window.removeEventListener("resize", m);
    }), ue(
      () => r.value,
      () => {
        m();
      }
    ), e({
      scrollSelectedIntoView: g,
      resetScroll: f,
      getContainerHeight: () => h.value,
      scrollTop: () => w.value
    }), (k, x) => (u(), p("div", {
      class: X(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": i.resultsEnter }])
    }, [
      i.isSearching ? (u(), p("div", Ka, [
        o("div", qa, [
          B(s(bt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, y(s(d)("Searching...")), 1)
      ])) : c.value ? (u(), p("div", Ga, [
        o("div", Ya, [
          o("span", null, y(s(d)("Found %s results", _.value)), 1)
        ]),
        o("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: D
        }, [
          o("div", {
            class: "vuefinder__search-modal__results-items",
            style: He({ height: `${v.value}px`, position: "relative" })
          }, [
            (u(!0), p(_e, null, we(F.value, (S) => (u(), p("div", {
              key: S.item.path,
              style: He({
                position: "absolute",
                top: `${S.top}px`,
                left: "0",
                width: "100%",
                height: `${Ye}px`
              })
            }, [
              B(Ha, {
                item: S.item,
                index: S.index,
                "selected-index": i.selectedIndex,
                "expanded-paths": i.expandedPaths,
                "active-dropdown": i.activeDropdown,
                "selected-item-dropdown-option": i.selectedItemDropdownOption,
                onSelect: x[0] || (x[0] = (T) => a("selectResultItem", T)),
                onSelectWithDropdown: x[1] || (x[1] = (T) => a("selectResultItemWithDropdown", T)),
                onTogglePathExpansion: x[2] || (x[2] = (T) => a("togglePathExpansion", T)),
                onToggleItemDropdown: x[3] || (x[3] = (T, L) => a("toggleItemDropdown", T, L)),
                "onUpdate:selectedItemDropdownOption": x[4] || (x[4] = (T) => a("update:selectedItemDropdownOption", T)),
                onCopyPath: x[5] || (x[5] = (T) => a("copyPath", T)),
                onOpenContainingFolder: x[6] || (x[6] = (T) => a("openContainingFolder", T)),
                onPreview: x[7] || (x[7] = (T) => a("preview", T))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), p("div", Wa, [
        o("span", null, y(s(d)("No results found")), 1)
      ]))
    ], 2));
  }
}), Xa = { class: "vuefinder__search-modal" }, Ja = { class: "vuefinder__search-modal__content" }, Za = { class: "vuefinder__search-modal__search-bar" }, er = { class: "vuefinder__search-modal__search-location" }, tr = ["title"], nr = ["disabled"], or = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, sr = { class: "vuefinder__search-modal__folder-selector-content" }, ir = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ar = { class: "vuefinder__search-modal__instructions-text" }, Nt = /* @__PURE__ */ Q({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = E(null), l = E(null), d = E(null), r = $n("", 300), c = E([]), _ = E(!1), w = E(-1), h = E(!1), v = E(!1), $ = E(null), F = E("all"), D = E(!1), m = E(`size-${F.value}`), g = E(null), f = E(/* @__PURE__ */ new Set()), k = E(null), x = G(n.path), S = (b) => {
      f.value.has(b) ? f.value.delete(b) : f.value.add(b);
    }, T = (b, C) => {
      C && typeof C.stopPropagation == "function" && C.stopPropagation(), k.value === b ? k.value = null : k.value = b;
    }, L = () => {
      k.value = null;
    }, Y = (b) => {
      try {
        const C = b.dir || `${b.storage}://`;
        e.adapter.open(C), e.modal.close(), L();
      } catch {
        de.error(t("Failed to open containing folder"));
      }
    }, W = (b) => {
      e.modal.open(gt, {
        storage: x?.value?.storage ?? "local",
        item: b
      }), L();
    }, ne = (b) => {
      w.value = b, L();
    }, re = (b) => {
      w.value = b;
    }, le = async (b) => {
      await ot(b.path), L();
    };
    ue(r, async (b) => {
      b.trim() ? (await A(b.trim()), w.value = 0) : (c.value = [], _.value = !1, w.value = -1);
    }), ue(F, async (b) => {
      m.value = `size-${b}`, r.value.trim() && !v.value && (await A(r.value.trim()), w.value = 0);
    }), ue(D, async () => {
      r.value.trim() && !v.value && (await A(r.value.trim()), w.value = 0);
    });
    const A = async (b) => {
      if (b) {
        _.value = !0;
        try {
          const C = $.value?.path || x?.value?.path, I = await e.adapter.search({
            path: C,
            filter: b,
            deep: D.value,
            size: F.value
          });
          c.value = I || [], _.value = !1;
        } catch (C) {
          de.error(Ee(C, t("Search failed"))), c.value = [], _.value = !1;
        }
      }
    };
    he(() => {
      document.addEventListener("click", P), m.value = `size-${F.value}`, Le(() => {
        a.value && a.value.focus();
      });
    });
    const Z = () => {
      v.value ? (v.value = !1, r.value.trim() && (A(r.value.trim()), w.value = 0)) : (h.value = !1, v.value = !0);
    }, q = (b) => {
      b && ($.value = b);
    }, N = (b) => {
      b && (q(b), v.value = !1, r.value.trim() && (A(r.value.trim()), w.value = 0));
    };
    Pe(() => {
      document.removeEventListener("click", P), l.value && l.value.cleanup();
    });
    const P = (b) => {
      const C = b.target;
      if (h.value && (C.closest(".vuefinder__search-modal__dropdown") || (h.value = !1, Le(() => {
        a.value && a.value.focus();
      }))), k.value) {
        const I = C.closest(".vuefinder__search-modal__item-dropdown"), U = C.closest(".vuefinder__search-modal__result-item");
        !I && !U && L();
      }
    };
    return (b, C) => (u(), R(Me, { class: "vuefinder__search-modal-layout" }, {
      default: te(() => [
        o("div", Xa, [
          B(Oe, {
            icon: s(Rt),
            title: s(t)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", Ja, [
            o("div", Za, [
              B(ga, {
                ref_key: "searchInputRef",
                ref: a,
                modelValue: s(r),
                "onUpdate:modelValue": C[0] || (C[0] = (I) => Nn(r) ? r.value = I : null),
                "is-searching": _.value,
                disabled: v.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              B(Ma, {
                ref_key: "searchOptionsDropdownRef",
                ref: l,
                visible: h.value,
                "onUpdate:visible": C[1] || (C[1] = (I) => h.value = I),
                "size-filter": F.value,
                "onUpdate:sizeFilter": C[2] || (C[2] = (I) => F.value = I),
                "selected-option": m.value,
                "onUpdate:selectedOption": C[3] || (C[3] = (I) => m.value = I),
                disabled: v.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: C[7] || (C[7] = ve(() => {
              }, ["stop"]))
            }, [
              o("div", er, [
                o("button", {
                  class: X(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": v.value }]),
                  onClick: ve(Z, ["stop"])
                }, [
                  B(s(Ne), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: $.value?.path || s(x).path
                  }, y(s(Sn)($.value?.path || s(x).path)), 9, tr),
                  C[10] || (C[10] = o("svg", {
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
                onClick: C[6] || (C[6] = ve(() => {
                }, ["stop"]))
              }, [
                ge(o("input", {
                  "onUpdate:modelValue": C[4] || (C[4] = (I) => D.value = I),
                  type: "checkbox",
                  disabled: v.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: C[5] || (C[5] = ve(() => {
                  }, ["stop"]))
                }, null, 8, nr), [
                  [Pt, D.value]
                ]),
                o("span", null, y(s(t)("Include subfolders")), 1)
              ])
            ]),
            v.value ? (u(), p("div", or, [
              o("div", sr, [
                B(Vt, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [
                    C[8] || (C[8] = (I) => $.value = I),
                    q
                  ],
                  "show-pinned-folders": !0,
                  "current-path": s(x),
                  onSelectAndClose: N
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : M("", !0),
            !s(r).trim() && !v.value ? (u(), p("div", ir, [
              o("p", ar, y(s(t)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : M("", !0),
            s(r).trim() && !v.value ? (u(), R(Qa, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": c.value,
              "is-searching": _.value,
              "selected-index": w.value,
              "expanded-paths": f.value,
              "active-dropdown": k.value,
              "selected-item-dropdown-option": g.value,
              "results-enter": !0,
              onSelectResultItem: ne,
              onSelectResultItemWithDropdown: re,
              onTogglePathExpansion: S,
              onToggleItemDropdown: T,
              "onUpdate:selectedItemDropdownOption": C[9] || (C[9] = (I) => g.value = I),
              onCopyPath: le,
              onOpenContainingFolder: Y,
              onPreview: W
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : M("", !0)
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
  setup(i, { emit: e, slots: t }) {
    const n = J(), a = E(!1), { t: l } = n.i18n;
    let d = null;
    const r = () => {
      d && clearTimeout(d), a.value = !0, d = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return he(() => {
      n.emitter.on(i.on, r);
    }), Pe(() => {
      d && clearTimeout(d);
    }), {
      shown: a,
      t: l
    };
  }
}, lr = (i, e) => {
  const t = i.__vccOpts || i;
  for (const [n, a] of e)
    t[n] = a;
  return t;
}, dr = { key: 1 };
function cr(i, e, t, n, a, l) {
  return u(), p("div", {
    class: X(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    i.$slots.default ? Ce(i.$slots, "default", { key: 0 }) : (u(), p("span", dr, y(n.t("Saved.")), 1))
  ], 2);
}
const Je = /* @__PURE__ */ lr(rr, [["render", cr]]), ur = [
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
}, Mr = { class: "vuefinder__about-modal__setting-input justify-end" }, Tr = ["checked"], Ir = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, Ar = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, Or = { class: "vuefinder__about-modal__setting-input justify-end" }, Br = ["value"], Lr = ["label"], Vr = ["value"], zr = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, Rr = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, Nr = { class: "vuefinder__about-modal__setting-input justify-end" }, Ur = ["label"], jr = ["value"], Hr = { class: "vuefinder__about-modal__tab-content" }, Kr = { class: "vuefinder__about-modal__settings__section-title" }, qr = { class: "vuefinder__about-modal__description" }, Dn = /* @__PURE__ */ Q({
  __name: "ModalSettings",
  setup(i) {
    const e = J(), { enabled: t } = Ve(), n = e.config, { clearStore: a } = e.storage, { t: l } = e.i18n, d = G(n.state), r = j(() => d.value.theme || "silver"), c = async () => {
      n.reset(), a(), location.reload();
    }, _ = (m) => {
      n.set("theme", m), e.emitter.emit("vf-theme-saved");
    }, w = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? _n : Mt, e.emitter.emit("vf-metric-units-saved");
    }, h = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, v = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: $ } = rt("VueFinderOptions"), D = Object.fromEntries(
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
      }).filter(([m]) => Object.keys($).includes(m))
    );
    return (m, g) => (u(), R(Me, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[2] || (g[2] = (f) => s(e).modal.close())
        }, y(s(l)("Close")), 1)
      ]),
      default: te(() => [
        o("div", vr, [
          B(Oe, {
            icon: s(xn),
            title: s(l)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", fr, [
            o("div", _r, y(s(l)("Customize your experience with the following settings")), 1),
            o("div", pr, [
              o("fieldset", hr, [
                o("div", mr, y(s(l)("General")), 1),
                o("div", gr, [
                  o("div", wr, [
                    o("label", yr, y(s(l)("Use Metric Units")), 1)
                  ]),
                  o("div", br, [
                    o("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: s(n).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: w
                    }, null, 40, kr),
                    B(Je, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: te(() => [
                        ce(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o("div", $r, [
                  o("div", xr, [
                    o("label", Sr, y(s(l)("Compact list view")), 1)
                  ]),
                  o("div", Cr, [
                    o("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: s(n).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: h
                    }, null, 40, Fr),
                    B(Je, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: te(() => [
                        ce(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o("div", Dr, [
                  o("div", Pr, [
                    o("label", Er, y(s(l)("Persist path on reload")), 1)
                  ]),
                  o("div", Mr, [
                    o("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: s(n).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: v
                    }, null, 40, Tr),
                    B(Je, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: te(() => [
                        ce(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s(t)("theme") ? (u(), p("div", Ir, y(s(l)("Theme")), 1)) : M("", !0),
                s(t)("theme") ? (u(), p("div", Ar, [
                  o("div", Or, [
                    o("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: g[0] || (g[0] = (f) => _(f.target?.value))
                    }, [
                      o("optgroup", {
                        label: s(l)("Theme")
                      }, [
                        (u(!0), p(_e, null, we(s(ur), (f) => (u(), p("option", {
                          key: f.name,
                          value: f.name
                        }, y(f.displayName), 9, Vr))), 128))
                      ], 8, Lr)
                    ], 40, Br),
                    B(Je, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: te(() => [
                        ce(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : M("", !0),
                s(t)("language") && Object.keys(s(D)).length > 1 ? (u(), p("div", zr, y(s(l)("Language")), 1)) : M("", !0),
                s(t)("language") && Object.keys(s(D)).length > 1 ? (u(), p("div", Rr, [
                  o("div", Nr, [
                    ge(o("select", {
                      id: "language",
                      "onUpdate:modelValue": g[1] || (g[1] = (f) => s(e).i18n.locale = f),
                      class: "vuefinder__about-modal__select"
                    }, [
                      o("optgroup", {
                        label: s(l)("Language")
                      }, [
                        (u(!0), p(_e, null, we(s(D), (f, k) => (u(), p("option", {
                          key: k,
                          value: k
                        }, y(f), 9, jr))), 128))
                      ], 8, Ur)
                    ], 512), [
                      [St, s(e).i18n.locale]
                    ]),
                    B(Je, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: te(() => [
                        ce(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : M("", !0)
              ])
            ]),
            o("div", Hr, [
              o("div", Kr, y(s(l)("Reset")), 1),
              o("div", qr, y(s(l)("Reset all settings to default")), 1),
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
function Wr() {
  const i = J(), e = i.fs, t = i.config, { enabled: n } = Ve(), a = G(e.path), l = G(e.selectedItems), d = (r) => {
    if (r.code === Fe.ESCAPE && (i.modal.close(), i.root.focus()), !i.modal.visible) {
      if (r.metaKey && r.code === Fe.KEY_R && !r.shiftKey && (i.adapter.invalidateListQuery(a.value.path), i.adapter.open(a.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === Fe.KEY_R && n("rename") && l.value.length === 1 && (i.modal.open(mt, { items: l.value }), r.preventDefault()), r.code === Fe.DELETE && l.value.length !== 0 && i.modal.open(ht, { items: l.value }), r.metaKey && r.code === Fe.BACKSLASH && i.modal.open(gn), r.metaKey && r.code === Fe.KEY_F && n("search") && (i.modal.open(Nt), r.preventDefault()), r.metaKey && r.code === Fe.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === Fe.KEY_S && (i.modal.open(Dn), r.preventDefault()), r.metaKey && r.code === Fe.ENTER && (t.toggle("fullScreen"), i.root.focus()), r.metaKey && r.code === Fe.KEY_A && (e.selectAll(i.selectionMode || "multiple", i), r.preventDefault()), r.code === Fe.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && i.modal.open(gt, {
        storage: e.path.get().storage,
        item: l.value[0]
      }), r.metaKey && r.code === Fe.KEY_C && n("copy")) {
        if (l.value.length === 0) {
          de.error(i.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("copy", new Set(l.value.map((c) => c.path))), de.success(
          l.value.length === 1 ? i.i18n.t("Item copied to clipboard") : i.i18n.t("%s items copied to clipboard", l.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Fe.KEY_X && n("copy")) {
        if (l.value.length === 0) {
          de.error(i.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("cut", new Set(l.value.map((c) => c.path))), de.success(
          l.value.length === 1 ? i.i18n.t("Item cut to clipboard") : i.i18n.t("%s items cut to clipboard", l.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Fe.KEY_V && n("copy")) {
        if (e.getClipboard().items.size === 0) {
          de.error(i.i18n.t("No items in clipboard"));
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          de.error(i.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (e.getClipboard().type === "cut") {
          i.modal.open(Xe, {
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
  he(async () => {
    if (await Le(), !i.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    i.root.addEventListener("keydown", d);
  }), ln(() => {
    i.root && i.root.removeEventListener("keydown", d);
  });
}
function Gr() {
  const i = E(!1), e = E([]);
  return {
    isDraggingExternal: i,
    externalFiles: e,
    handleDragEnter: (r) => {
      r.preventDefault(), r.stopPropagation();
      const c = r.dataTransfer?.items;
      c && Array.from(c).some((w) => w.kind === "file") && (i.value = !0, r.isExternalDrag = !0);
    },
    handleDragOver: (r) => {
      i.value && r.dataTransfer && (r.dataTransfer.dropEffect = "copy", r.preventDefault(), r.stopPropagation());
    },
    handleDragLeave: (r) => {
      r.preventDefault();
      const c = r.currentTarget.getBoundingClientRect(), _ = r.clientX, w = r.clientY;
      (_ < c.left || _ > c.right || w < c.top || w > c.bottom) && (i.value = !1);
    },
    handleDrop: async (r) => {
      r.preventDefault(), r.stopPropagation(), i.value = !1;
      const c = r.dataTransfer?.items;
      if (c) {
        const _ = Array.from(c).filter((w) => w.kind === "file");
        if (_.length > 0) {
          e.value = [];
          for (const w of _) {
            const h = w.webkitGetAsEntry?.();
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
              const v = w.getAsFile();
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
function Qr(i, e) {
  return u(), p("svg", Yr, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Pn = { render: Qr }, Xr = { class: "vuefinder__new-folder-modal__content" }, Jr = { class: "vuefinder__new-folder-modal__form" }, Zr = { class: "vuefinder__new-folder-modal__description" }, el = ["placeholder"], Ut = /* @__PURE__ */ Q({
  __name: "ModalNewFolder",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = E(""), d = () => {
      l.value !== "" && e.adapter.createFolder({
        path: a.value.path,
        name: l.value
      }).then((r) => {
        de.success(t("%s is created.", l.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(Ee(r, t("Failed to create folder")));
      });
    };
    return (r, c) => (u(), R(Me, null, {
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
          B(Oe, {
            icon: s(Pn),
            title: s(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", Xr, [
            o("div", Jr, [
              o("p", Zr, y(s(t)("Create a new folder")), 1),
              ge(o("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => l.value = _),
                class: "vuefinder__new-folder-modal__input",
                placeholder: s(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: st(d, ["enter"])
              }, null, 40, el), [
                [it, l.value]
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
function nl(i, e) {
  return u(), p("svg", tl, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const En = { render: nl }, ol = { class: "vuefinder__new-file-modal__content" }, sl = { class: "vuefinder__new-file-modal__form" }, il = { class: "vuefinder__new-file-modal__description" }, al = ["placeholder"], Mn = /* @__PURE__ */ Q({
  __name: "ModalNewFile",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = E(""), d = () => {
      l.value !== "" && e.adapter.createFile({
        path: a.value.path,
        name: l.value
      }).then((r) => {
        de.success(t("%s is created.", l.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(Ee(r, t("Failed to create file")));
      });
    };
    return (r, c) => (u(), R(Me, null, {
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
          B(Oe, {
            icon: s(En),
            title: s(t)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", ol, [
            o("div", sl, [
              o("p", il, y(s(t)("Create a new file")), 1),
              ge(o("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => l.value = _),
                class: "vuefinder__new-file-modal__input",
                placeholder: s(t)("File Name"),
                type: "text",
                onKeyup: st(d, ["enter"])
              }, null, 40, al), [
                [it, l.value]
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
const rl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ll(i, e) {
  return u(), p("svg", rl, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Tn = { render: ll }, dl = { class: "vuefinder__upload-modal__content relative" }, cl = { class: "vuefinder__upload-modal__target-section" }, ul = { class: "vuefinder__upload-modal__target-label" }, vl = { class: "vuefinder__upload-modal__target-container" }, fl = { class: "vuefinder__upload-modal__target-path" }, _l = { class: "vuefinder__upload-modal__target-storage" }, pl = {
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
}, jt = /* @__PURE__ */ Q({
  __name: "ModalUpload",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = E(a.value), d = E(!1), r = () => {
      const P = l.value.path;
      if (!P) return { storage: "local", path: "" };
      if (P.endsWith("://"))
        return { storage: P.replace("://", ""), path: "" };
      const b = P.split("://");
      return {
        storage: b[0] || "local",
        path: b[1] || ""
      };
    }, c = (P) => {
      P && (l.value = P);
    }, _ = (P) => {
      P && (l.value = P, d.value = !1);
    }, {
      container: w,
      internalFileInput: h,
      internalFolderInput: v,
      pickFiles: $,
      queue: F,
      message: D,
      uploading: m,
      hasFilesInDropArea: g,
      definitions: f,
      openFileSelector: k,
      upload: x,
      cancel: S,
      remove: T,
      clear: L,
      close: Y,
      getClassNameForEntry: W,
      getIconForEntry: ne,
      addExternalFiles: re
    } = bn(e.customUploader), le = () => {
      x(l.value);
    };
    he(() => {
      e.emitter.on("vf-external-files-dropped", (P) => {
        re(P);
      });
    }), Pe(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const A = E(!1), Z = E(null), q = E(null), N = (P) => {
      if (!A.value) return;
      const b = P.target, C = Z.value?.contains(b) ?? !1, I = q.value?.contains(b) ?? !1;
      !C && !I && (A.value = !1);
    };
    return he(() => document.addEventListener("click", N)), Pe(() => document.removeEventListener("click", N)), (P, b) => (u(), R(Me, {
      "show-drag-overlay": s(g),
      "drag-overlay-text": s(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: te(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: Z,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          o("div", {
            class: X([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              A.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: b[3] || (b[3] = (C) => s(k)())
            }, y(s(t)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": A.value ? "true" : "false",
              onClick: b[4] || (b[4] = ve((C) => A.value = !A.value, ["stop"]))
            }, [...b[17] || (b[17] = [
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
            ])], 8, Cl)
          ], 2),
          A.value ? (u(), p("div", Fl, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[5] || (b[5] = (C) => {
                s(k)(), A.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[6] || (b[6] = (C) => {
                s(v)?.click(), A.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            b[18] || (b[18] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: X(["vuefinder__upload-actions__item", s(m) ? "disabled" : ""]),
              onClick: b[7] || (b[7] = (C) => s(m) ? null : (s(L)(!1), A.value = !1))
            }, y(s(t)("Clear all")), 3),
            o("div", {
              class: X(["vuefinder__upload-actions__item", s(m) ? "disabled" : ""]),
              onClick: b[8] || (b[8] = (C) => s(m) ? null : (s(L)(!0), A.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: s(m) || !s(F).length,
          onClick: ve(le, ["prevent"])
        }, y(s(t)("Upload")), 9, Dl),
        s(m) ? (u(), p("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[9] || (b[9] = ve(
            //@ts-ignore
            (...C) => s(S) && s(S)(...C),
            ["prevent"]
          ))
        }, y(s(t)("Cancel")), 1)) : (u(), p("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[10] || (b[10] = ve(
            //@ts-ignore
            (...C) => s(Y) && s(Y)(...C),
            ["prevent"]
          ))
        }, y(s(t)("Close")), 1)),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: q,
          class: "relative mr-auto hidden sm:block"
        }, [
          o("div", {
            class: X(["vuefinder__upload-actions", A.value ? "vuefinder__upload-actions--ring" : ""])
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
              onClick: b[11] || (b[11] = ve((C) => A.value = !A.value, ["stop"]))
            }, [...b[19] || (b[19] = [
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
            ])], 8, Pl)
          ], 2),
          A.value ? (u(), p("div", El, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[12] || (b[12] = (C) => {
                s(k)(), A.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[13] || (b[13] = (C) => {
                s(v)?.click(), A.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            b[20] || (b[20] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: X(["vuefinder__upload-actions__item", s(m) ? "disabled" : ""]),
              onClick: b[14] || (b[14] = (C) => s(m) ? null : (s(L)(!1), A.value = !1))
            }, y(s(t)("Clear all")), 3),
            o("div", {
              class: X(["vuefinder__upload-actions__item", s(m) ? "disabled" : ""]),
              onClick: b[15] || (b[15] = (C) => s(m) ? null : (s(L)(!0), A.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512)
      ]),
      default: te(() => [
        o("div", null, [
          B(Oe, {
            icon: s(Tn),
            title: s(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", dl, [
            o("div", cl, [
              o("div", ul, y(s(t)("Hedef Klasör")), 1),
              o("div", vl, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: b[0] || (b[0] = (C) => d.value = !d.value)
                }, [
                  o("div", fl, [
                    o("span", _l, y(r().storage) + "://", 1),
                    r().path ? (u(), p("span", pl, y(r().path), 1)) : M("", !0)
                  ]),
                  o("span", hl, y(s(t)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: X([
                  "vuefinder__upload-modal__tree-selector",
                  d.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                B(Vt, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    b[1] || (b[1] = (C) => l.value = C),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", ml, y(s(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: w,
              class: "hidden"
            }, null, 512),
            o("div", gl, [
              (u(!0), p(_e, null, we(s(F), (C) => (u(), p("div", {
                key: C.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: X(["vuefinder__upload-modal__file-icon", s(W)(C)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(s(ne)(C))
                  }, null, 8, wl)
                ], 2),
                o("div", yl, [
                  o("div", bl, y(s(Dt)(C.name, 40)) + " (" + y(C.size) + ") ", 1),
                  o("div", kl, y(s(Dt)(C.name, 16)) + " (" + y(C.size) + ") ", 1),
                  o("div", {
                    class: X(["vuefinder__upload-modal__file-status", s(W)(C)])
                  }, [
                    ce(y(C.statusName) + " ", 1),
                    C.status === s(f).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), p("b", $l, y(C.percent), 1)) : M("", !0)
                  ], 2)
                ]),
                o("button", {
                  type: "button",
                  class: X(["vuefinder__upload-modal__file-remove", s(m) ? "disabled" : ""]),
                  title: s(t)("Delete"),
                  disabled: s(m),
                  onClick: (I) => s(T)(C)
                }, [...b[16] || (b[16] = [
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
                ])], 10, xl)
              ]))), 128)),
              s(F).length ? M("", !0) : (u(), p("div", Sl, y(s(t)("No files selected!")), 1))
            ]),
            s(D).length ? (u(), R(Ft, {
              key: 0,
              error: "",
              onHidden: b[2] || (b[2] = (C) => D.value = "")
            }, {
              default: te(() => [
                ce(y(s(D)), 1)
              ]),
              _: 1
            })) : M("", !0)
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
}), Ml = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Tl(i, e) {
  return u(), p("svg", Ml, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const In = { render: Tl }, Il = { class: "vuefinder__unarchive-modal__content" }, Al = { class: "vuefinder__unarchive-modal__items" }, Ol = {
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
}, Ll = { class: "vuefinder__unarchive-modal__item-name" }, Vl = { class: "vuefinder__unarchive-modal__info" }, Ht = /* @__PURE__ */ Q({
  __name: "ModalUnarchive",
  setup(i) {
    const e = J(), t = e.fs, n = G(t.path), { t: a } = e.i18n, l = E(e.modal.data.items[0]), d = E([]), r = () => {
      e.adapter.unarchive({
        item: l.value.path,
        path: n.value.path
      }).then((c) => {
        de.success(a("The file unarchived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(Ee(c, a("Failed to unarchive")));
      });
    };
    return (c, _) => (u(), R(Me, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(a)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[0] || (_[0] = (w) => s(e).modal.close())
        }, y(s(a)("Cancel")), 1)
      ]),
      default: te(() => [
        o("div", null, [
          B(Oe, {
            icon: s(In),
            title: s(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", Il, [
            o("div", Al, [
              (u(!0), p(_e, null, we(d.value, (w) => (u(), p("p", {
                key: w.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                w.type === "dir" ? (u(), p("svg", Ol, [..._[1] || (_[1] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), p("svg", Bl, [..._[2] || (_[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Ll, y(w.basename), 1)
              ]))), 128)),
              o("p", Vl, y(s(a)("The archive will be unarchived at")) + " (" + y(s(n).path) + ") ", 1)
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
function Rl(i, e) {
  return u(), p("svg", zl, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
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
}, ql = { class: "vuefinder__archive-modal__file-name" }, Wl = ["placeholder"], Kt = /* @__PURE__ */ Q({
  __name: "ModalArchive",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), l = E(""), d = E(e.modal.data.items), r = () => {
      d.value.length && e.adapter.archive({
        path: a.value.path,
        items: d.value.map(({ path: c, type: _ }) => ({
          path: c,
          type: _
        })),
        name: l.value
      }).then((c) => {
        de.success(t("The file(s) archived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(Ee(c, t("Failed to archive files")));
      });
    };
    return (c, _) => (u(), R(Me, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(t)("Archive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (w) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: te(() => [
        o("div", null, [
          B(Oe, {
            icon: s(An),
            title: s(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", Nl, [
            o("div", Ul, [
              o("div", jl, [
                (u(!0), p(_e, null, we(d.value, (w) => (u(), p("p", {
                  key: w.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  w.type === "dir" ? (u(), p("svg", Hl, [..._[2] || (_[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), p("svg", Kl, [..._[3] || (_[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", ql, y(w.basename), 1)
                ]))), 128))
              ]),
              ge(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (w) => l.value = w),
                class: "vuefinder__archive-modal__input",
                placeholder: s(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: st(r, ["enter"])
              }, null, 40, Wl), [
                [it, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Gl = { class: "vuefinder__about-modal__content" }, Yl = { class: "vuefinder__about-modal__main" }, Ql = { class: "vuefinder__about-modal__shortcuts" }, Xl = { class: "vuefinder__about-modal__shortcut" }, Jl = {
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
}, cd = /* @__PURE__ */ Q({
  __name: "ModalShortcuts",
  setup(i) {
    const e = J(), { enabled: t } = Ve(), { t: n } = e.i18n;
    return (a, l) => (u(), R(Me, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (d) => s(e).modal.close())
        }, y(s(n)("Close")), 1)
      ]),
      default: te(() => [
        o("div", Gl, [
          B(Oe, {
            icon: s(mn),
            title: s(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          o("div", Yl, [
            o("div", Ql, [
              o("div", Xl, [
                o("div", null, y(s(n)("Refresh")), 1),
                l[1] || (l[1] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ce(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              s(t)("rename") ? (u(), p("div", Jl, [
                o("div", null, y(s(n)("Rename")), 1),
                l[2] || (l[2] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ce(" + "),
                  o("kbd", null, "Shift"),
                  ce(" + "),
                  o("kbd", null, "R")
                ], -1))
              ])) : M("", !0),
              s(t)("delete") ? (u(), p("div", Zl, [
                o("div", null, y(s(n)("Delete")), 1),
                l[3] || (l[3] = o("kbd", null, "Del", -1))
              ])) : M("", !0),
              o("div", ed, [
                o("div", null, y(s(n)("Escape")), 1),
                l[4] || (l[4] = o("kbd", null, "Esc", -1))
              ]),
              o("div", td, [
                o("div", null, y(s(n)("Select All")), 1),
                l[5] || (l[5] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ce(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              s(t)("copy") ? (u(), p("div", nd, [
                o("div", null, y(s(n)("Cut")), 1),
                l[6] || (l[6] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ce(" + "),
                  o("kbd", null, "X")
                ], -1))
              ])) : M("", !0),
              s(t)("copy") ? (u(), p("div", od, [
                o("div", null, y(s(n)("Copy")), 1),
                l[7] || (l[7] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ce(" + "),
                  o("kbd", null, "C")
                ], -1))
              ])) : M("", !0),
              s(t)("copy") ? (u(), p("div", sd, [
                o("div", null, y(s(n)("Paste")), 1),
                l[8] || (l[8] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ce(" + "),
                  o("kbd", null, "V")
                ], -1))
              ])) : M("", !0),
              s(t)("search") ? (u(), p("div", id, [
                o("div", null, y(s(n)("Search")), 1),
                l[9] || (l[9] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ce(" + "),
                  o("kbd", null, "F")
                ], -1))
              ])) : M("", !0),
              o("div", ad, [
                o("div", null, y(s(n)("Toggle Sidebar")), 1),
                l[10] || (l[10] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ce(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", rd, [
                o("div", null, y(s(n)("Open Settings")), 1),
                l[11] || (l[11] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ce(" + "),
                  o("kbd", null, "S")
                ], -1))
              ]),
              s(t)("fullscreen") ? (u(), p("div", ld, [
                o("div", null, y(s(n)("Toggle Full Screen")), 1),
                l[12] || (l[12] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ce(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ])) : M("", !0),
              s(t)("preview") ? (u(), p("div", dd, [
                o("div", null, y(s(n)("Preview")), 1),
                l[13] || (l[13] = o("kbd", null, "Space", -1))
              ])) : M("", !0)
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
}, gd = /* @__PURE__ */ Q({
  __name: "MenuBar",
  setup(i) {
    const e = J(), { enabled: t } = Ve(), { t: n } = e?.i18n || { t: (f) => f }, a = e?.fs, l = e?.config, d = G(l.state), r = G(a.selectedItems), c = G(a?.storages || []), _ = E(null), w = E(!1), h = j(() => window.opener !== null || window.name !== "" || window.history.length <= 1), v = j(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(Ut, { items: r.value }),
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
            action: () => e?.modal?.open(jt, { items: r.value }),
            enabled: () => t("upload")
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(Nt),
            enabled: () => t("search")
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(Kt, { items: r.value });
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
                f?.items?.size > 0 && e?.modal?.open(f.type === "cut" ? Xe : zt, {
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
                  const f = e?.fs, k = {
                    storage: f?.path?.get()?.storage || "",
                    path: f?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(Xe, { items: { from: r.value, to: k } });
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
                await ot(f.path);
              } else {
                const f = a?.path?.get();
                f?.path && await ot(f.path);
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
                k && await Ta(k);
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
                const x = f.breadcrumb[f.breadcrumb.length - 2]?.path ?? `${f.storage}://`;
                e?.adapter.open(x);
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
              a?.setPath(k), e?.adapter.list(k);
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
                const k = f.indexOf("://"), x = f.slice(0, k);
                if (!c.value || !c.value.includes(x)) {
                  alert(n('Invalid storage. Storage "%s" is not available.', x));
                  return;
                }
                try {
                  await e?.adapter.open(f);
                } catch (S) {
                  const T = Ee(S, n("Failed to navigate to folder"));
                  de.error(T), e.fs.setLoading(!1);
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
    ]), $ = (f) => {
      _.value === f ? D() : (_.value = f, w.value = !0);
    }, F = (f) => {
      w.value && (_.value = f);
    }, D = () => {
      _.value = null, w.value = !1;
    }, m = (f) => {
      D(), f();
    }, g = (f) => {
      f.target.closest(".vuefinder__menubar") || D();
    };
    return he(() => {
      document.addEventListener("click", g);
    }), Pe(() => {
      document.removeEventListener("click", g);
    }), (f, k) => (u(), p("div", {
      class: "vuefinder__menubar",
      onClick: k[0] || (k[0] = ve(() => {
      }, ["stop"]))
    }, [
      o("div", ud, [
        (u(!0), p(_e, null, we(v.value, (x) => (u(), p("div", {
          key: x.id,
          class: X(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": _.value === x.id }]),
          onClick: (S) => $(x.id),
          onMouseenter: (S) => F(x.id)
        }, [
          o("span", fd, y(x.label), 1),
          _.value === x.id ? (u(), p("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (S) => F(x.id)
          }, [
            (u(!0), p(_e, null, we(x.items, (S) => (u(), p("div", {
              key: S.id || S.type,
              class: X(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": S.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": S.enabled && !S.enabled(),
                "vuefinder__menubar__dropdown__item--checked": S.checked && S.checked()
              }]),
              onClick: ve((T) => S.type !== "separator" && S.enabled && S.enabled() ? m(S.action) : null, ["stop"])
            }, [
              S.type !== "separator" ? (u(), p("span", hd, y(S.label), 1)) : M("", !0),
              S.checked && S.checked() ? (u(), p("span", md, " ✓ ")) : M("", !0)
            ], 10, pd))), 128))
          ], 40, _d)) : M("", !0)
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
function yd(i, e) {
  return u(), p("svg", wd, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const bd = { render: yd }, kd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function $d(i, e) {
  return u(), p("svg", kd, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const xd = { render: $d }, Sd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Cd(i, e) {
  return u(), p("svg", Sd, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Fd = { render: Cd }, Dd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Pd(i, e) {
  return u(), p("svg", Dd, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Ed = { render: Pd }, Md = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Td(i, e) {
  return u(), p("svg", Md, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Id = { render: Td }, Ad = { class: "vuefinder__toolbar" }, Od = { class: "vuefinder__toolbar__actions" }, Bd = ["title"], Ld = ["title"], Vd = ["title"], zd = ["title"], Rd = ["title"], Nd = ["title"], Ud = ["title"], jd = { class: "vuefinder__toolbar__controls" }, Hd = ["title"], Kd = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, qd = ["title"], Wd = { class: "relative" }, Gd = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Yd = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Qd = { class: "vuefinder__toolbar__dropdown-content" }, Xd = { class: "vuefinder__toolbar__dropdown-section" }, Jd = { class: "vuefinder__toolbar__dropdown-label" }, Zd = { class: "vuefinder__toolbar__dropdown-row" }, ec = { value: "name" }, tc = { value: "size" }, nc = { value: "modified" }, oc = { value: "" }, sc = { value: "asc" }, ic = { value: "desc" }, ac = { class: "vuefinder__toolbar__dropdown-section" }, rc = { class: "vuefinder__toolbar__dropdown-label" }, lc = { class: "vuefinder__toolbar__dropdown-options" }, dc = { class: "vuefinder__toolbar__dropdown-option" }, cc = { class: "vuefinder__toolbar__option-text" }, uc = { class: "vuefinder__toolbar__dropdown-option" }, vc = { class: "vuefinder__toolbar__option-text" }, fc = { class: "vuefinder__toolbar__dropdown-option" }, _c = { class: "vuefinder__toolbar__option-text" }, pc = { class: "vuefinder__toolbar__dropdown-toggle" }, hc = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, mc = { class: "vuefinder__toolbar__dropdown-reset" }, gc = ["title"], wc = ["title"], yc = /* @__PURE__ */ Q({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(i) {
    const e = J(), { enabled: t } = Ve(), { t: n } = e.i18n, a = e.fs, l = e.config, d = G(l.state), r = G(a.selectedItems), c = G(a.sort), _ = G(a.filter);
    ue(
      () => d.value.fullScreen,
      () => {
        const m = document.querySelector("body");
        m && (m.style.overflow = d.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const w = E(!1), h = (m) => {
      m.target.closest(".vuefinder__toolbar__dropdown-container") || (w.value = !1);
    };
    he(() => {
      const m = document.querySelector("body");
      m && d.value.fullScreen && setTimeout(() => m.style.overflow = "hidden"), document.addEventListener("click", h);
    }), Pe(() => {
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
    ue(
      () => v.value.sortBy,
      (m) => {
        if (!v.value.sortOrder) {
          a.clearSort();
          return;
        }
        m === "name" ? a.setSort("basename", v.value.sortOrder) : m === "size" ? a.setSort("file_size", v.value.sortOrder) : m === "modified" && a.setSort("last_modified", v.value.sortOrder);
      }
    ), ue(
      () => v.value.sortOrder,
      (m) => {
        if (!m) {
          a.clearSort();
          return;
        }
        v.value.sortBy === "name" ? a.setSort("basename", m) : v.value.sortBy === "size" ? a.setSort("file_size", m) : v.value.sortBy === "modified" && a.setSort("last_modified", m);
      }
    ), ue(
      c,
      (m) => {
        m.active ? (m.column === "basename" ? v.value.sortBy = "name" : m.column === "file_size" ? v.value.sortBy = "size" : m.column === "last_modified" && (v.value.sortBy = "modified"), v.value.sortOrder = m.order) : v.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ue(
      () => v.value.filterKind,
      (m) => {
        a.setFilter(m, d.value.showHiddenFiles);
      }
    ), ue(
      () => v.value.showHidden,
      (m) => {
        l.set("showHiddenFiles", m), a.setFilter(v.value.filterKind, m);
      }
    ), ue(
      _,
      (m) => {
        v.value.filterKind = m.kind;
      },
      { immediate: !0 }
    ), ue(
      () => d.value.showHiddenFiles,
      (m) => {
        v.value.showHidden = m, a.setFilter(v.value.filterKind, m);
      },
      { immediate: !0 }
    );
    const $ = () => l.set("view", d.value.view === "grid" ? "list" : "grid"), F = j(() => _.value.kind !== "all" || !d.value.showHiddenFiles || c.value.active), D = () => {
      v.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), a.clearSort(), a.clearFilter();
    };
    return (m, g) => (u(), p("div", Ad, [
      o("div", Od, [
        s(t)("newfolder") ? (u(), p("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("New Folder"),
          onClick: g[0] || (g[0] = (f) => s(e).modal.open(Ut, { items: s(r) }))
        }, [
          B(s(Pn))
        ], 8, Bd)) : M("", !0),
        s(t)("newfile") ? (u(), p("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("New File"),
          onClick: g[1] || (g[1] = (f) => s(e).modal.open(Mn, { items: s(r) }))
        }, [
          B(s(En))
        ], 8, Ld)) : M("", !0),
        s(t)("rename") ? (u(), p("div", {
          key: 2,
          class: "mx-1.5",
          title: s(n)("Rename"),
          onClick: g[2] || (g[2] = (f) => s(r).length !== 1 || s(e).modal.open(mt, { items: s(r) }))
        }, [
          B(s(yn), {
            class: X(s(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Vd)) : M("", !0),
        s(t)("delete") ? (u(), p("div", {
          key: 3,
          class: "mx-1.5",
          title: s(n)("Delete"),
          onClick: g[3] || (g[3] = (f) => !s(r).length || s(e).modal.open(ht, { items: s(r) }))
        }, [
          B(s(wn), {
            class: X(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, zd)) : M("", !0),
        s(t)("upload") ? (u(), p("div", {
          key: 4,
          class: "mx-1.5",
          title: s(n)("Upload"),
          onClick: g[4] || (g[4] = (f) => s(e).modal.open(jt, { items: s(r) }))
        }, [
          B(s(Tn))
        ], 8, Rd)) : M("", !0),
        s(t)("unarchive") && s(r).length === 1 && s(r)[0].mime_type === "application/zip" ? (u(), p("div", {
          key: 5,
          class: "mx-1.5",
          title: s(n)("Unarchive"),
          onClick: g[5] || (g[5] = (f) => !s(r).length || s(e).modal.open(Ht, { items: s(r) }))
        }, [
          B(s(In), {
            class: X(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Nd)) : M("", !0),
        s(t)("archive") ? (u(), p("div", {
          key: 6,
          class: "mx-1.5",
          title: s(n)("Archive"),
          onClick: g[6] || (g[6] = (f) => !s(r).length || s(e).modal.open(Kt, { items: s(r) }))
        }, [
          B(s(An), {
            class: X(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ud)) : M("", !0)
      ]),
      o("div", jd, [
        s(t)("search") ? (u(), p("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("Search Files"),
          onClick: g[7] || (g[7] = (f) => s(e).modal.open(Nt))
        }, [
          B(s(Rt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Hd)) : M("", !0),
        o("div", Kd, [
          o("div", {
            title: s(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: g[8] || (g[8] = (f) => w.value = !w.value)
          }, [
            o("div", Wd, [
              B(s(Id), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              F.value ? (u(), p("div", Gd)) : M("", !0)
            ])
          ], 8, qd),
          w.value ? (u(), p("div", Yd, [
            o("div", Qd, [
              o("div", Xd, [
                o("div", Jd, y(s(n)("Sorting")), 1),
                o("div", Zd, [
                  ge(o("select", {
                    "onUpdate:modelValue": g[9] || (g[9] = (f) => v.value.sortBy = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", ec, y(s(n)("Name")), 1),
                    o("option", tc, y(s(n)("Size")), 1),
                    o("option", nc, y(s(n)("Date")), 1)
                  ], 512), [
                    [St, v.value.sortBy]
                  ]),
                  ge(o("select", {
                    "onUpdate:modelValue": g[10] || (g[10] = (f) => v.value.sortOrder = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", oc, y(s(n)("None")), 1),
                    o("option", sc, y(s(n)("Asc")), 1),
                    o("option", ic, y(s(n)("Desc")), 1)
                  ], 512), [
                    [St, v.value.sortOrder]
                  ])
                ])
              ]),
              o("div", ac, [
                o("div", rc, y(s(n)("Show")), 1),
                o("div", lc, [
                  o("label", dc, [
                    ge(o("input", {
                      "onUpdate:modelValue": g[11] || (g[11] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [$t, v.value.filterKind]
                    ]),
                    o("span", cc, y(s(n)("All items")), 1)
                  ]),
                  o("label", uc, [
                    ge(o("input", {
                      "onUpdate:modelValue": g[12] || (g[12] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [$t, v.value.filterKind]
                    ]),
                    o("span", vc, y(s(n)("Files only")), 1)
                  ]),
                  o("label", fc, [
                    ge(o("input", {
                      "onUpdate:modelValue": g[13] || (g[13] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [$t, v.value.filterKind]
                    ]),
                    o("span", _c, y(s(n)("Folders only")), 1)
                  ])
                ])
              ]),
              o("div", pc, [
                o("label", hc, y(s(n)("Show hidden files")), 1),
                ge(o("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": g[14] || (g[14] = (f) => v.value.showHidden = f),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Pt, v.value.showHidden]
                ])
              ]),
              o("div", mc, [
                o("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: D
                }, y(s(n)("Reset")), 1)
              ])
            ])
          ])) : M("", !0)
        ]),
        s(t)("fullscreen") ? (u(), p("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("Toggle Full Screen"),
          onClick: g[15] || (g[15] = (f) => s(l).toggle("fullScreen"))
        }, [
          s(d).fullScreen ? (u(), R(s(xd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), R(s(bd), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, gc)) : M("", !0),
        o("div", {
          class: "mx-1.5",
          title: s(n)("Change View"),
          onClick: g[16] || (g[16] = (f) => $())
        }, [
          s(d).view === "grid" ? (u(), R(s(Fd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : M("", !0),
          s(d).view === "list" ? (u(), R(s(Ed), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : M("", !0)
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
function kc(i, e) {
  return u(), p("svg", bc, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const $c = { render: kc }, xc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Sc(i, e) {
  return u(), p("svg", xc, [...e[0] || (e[0] = [
    o("path", {
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
function Dc(i, e) {
  return u(), p("svg", Fc, [...e[0] || (e[0] = [
    o("path", {
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
function Mc(i, e) {
  return u(), p("svg", Ec, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Tc = { render: Mc }, Ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ac(i, e) {
  return u(), p("svg", Ic, [...e[0] || (e[0] = [
    o("path", {
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
function Lc(i, e) {
  return u(), p("svg", Bc, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Vc = { render: Lc }, zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Rc(i, e) {
  return u(), p("svg", zc, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Nc = { render: Rc };
function at(i, e = []) {
  const t = "vfDragEnterCounter", n = i.fs, a = G(n.selectedItems);
  function l(h, v) {
    return !!(!h || h.type !== "dir" || h.path.startsWith(v) || a.value.some((F) => F.path === v ? !1 : !!h.path.startsWith(F.path)));
  }
  function d(h, v) {
    if (h.isExternalDrag)
      return;
    if (!(i.features?.move ?? !1)) {
      h.dataTransfer && (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none");
      return;
    }
    h.preventDefault();
    const F = n.getDraggedItem();
    l(v, F) ? h.dataTransfer && (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none") : (h.dataTransfer && (h.dataTransfer.dropEffect = "copy", h.dataTransfer.effectAllowed = "all"), h.currentTarget.classList.add(...e));
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
    const D = h.dataTransfer?.getData("items") || "[]", g = JSON.parse(D).map(
      (f) => n.sortedFiles.get().find((k) => k.path === f)
    );
    n.clearDraggedItem(), i.modal.open(Xe, { items: { from: g, to: v } });
  }
  function w(h) {
    return {
      dragover: (v) => d(v, h),
      dragenter: r,
      dragleave: c,
      drop: (v) => _(v, h)
    };
  }
  return { events: w };
}
const Uc = { class: "vuefinder__breadcrumb__container" }, jc = ["title"], Hc = ["title"], Kc = ["title"], qc = ["title"], Wc = { class: "vuefinder__breadcrumb__path-container" }, Gc = { class: "vuefinder__breadcrumb__list" }, Yc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Qc = { class: "relative" }, Xc = ["title", "onClick"], Jc = ["title"], Zc = { class: "vuefinder__breadcrumb__path-mode" }, eu = { class: "vuefinder__breadcrumb__path-mode-content" }, tu = ["title"], nu = { class: "vuefinder__breadcrumb__path-text" }, ou = ["title"], su = ["data-theme"], iu = ["onClick"], au = { class: "vuefinder__breadcrumb__hidden-item-content" }, ru = { class: "vuefinder__breadcrumb__hidden-item-text" }, lu = /* @__PURE__ */ Q({
  __name: "Breadcrumb",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = e.config, l = G(a.state), d = G(n.path), r = G(n.loading), c = E(null), _ = $n(0, 100), w = E(5), h = E(!1), v = E(!1), $ = j(() => d.value?.breadcrumb ?? []);
    function F(N, P) {
      return N.length > P ? [N.slice(-P), N.slice(0, -P)] : [N, []];
    }
    const D = j(
      () => F($.value, w.value)[0]
    ), m = j(
      () => F($.value, w.value)[1]
    );
    ue(_, () => {
      if (!c.value) return;
      const N = c.value.children;
      let P = 0, b = 0;
      const C = 5, I = 1;
      w.value = C, Le(() => {
        for (let U = N.length - 1; U >= 0; U--) {
          const K = N[U];
          if (P + K.offsetWidth > _.value - 40)
            break;
          P += parseInt(K.offsetWidth.toString(), 10), b++;
        }
        b < I && (b = I), b > C && (b = C), w.value = b;
      });
    });
    const g = () => {
      c.value && (_.value = c.value.offsetWidth);
    }, f = E(null);
    he(() => {
      f.value = new ResizeObserver(g), c.value && f.value.observe(c.value);
    }), Pe(() => {
      f.value && f.value.disconnect();
    });
    const k = at(e, ["vuefinder__drag-over"]);
    function x(N = null) {
      N ??= $.value.length - 2;
      const P = {
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
      return $.value[N] ?? P;
    }
    const S = () => {
      e.adapter.invalidateListQuery(d.value.path), e.adapter.open(d.value.path);
    }, T = () => {
      D.value.length > 0 && e.adapter.open(
        $.value[$.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
      );
    }, L = (N) => {
      e.adapter.open(N.path), h.value = !1;
    }, Y = () => {
      h.value && (h.value = !1);
    }, W = {
      mounted(N, P) {
        N.clickOutsideEvent = function(b) {
          N === b.target || N.contains(b.target) || P.value();
        }, document.body.addEventListener("click", N.clickOutsideEvent);
      },
      beforeUnmount(N) {
        document.body.removeEventListener("click", N.clickOutsideEvent);
      }
    }, ne = () => {
      a.toggle("showTreeView");
    }, re = E({
      x: 0,
      y: 0
    }), le = (N, P = null) => {
      if (N.currentTarget instanceof HTMLElement) {
        const { x: b, y: C, height: I } = N.currentTarget.getBoundingClientRect();
        re.value = { x: b, y: C + I };
      }
      h.value = P ?? !h.value;
    }, A = () => {
      v.value = !v.value;
    }, Z = async () => {
      await ot(d.value?.path || ""), de.success(t("Path copied to clipboard"));
    }, q = () => {
      v.value = !1;
    };
    return (N, P) => (u(), p("div", Uc, [
      o("span", {
        title: s(t)("Toggle Tree View")
      }, [
        B(s(Vc), {
          class: X(["vuefinder__breadcrumb__toggle-tree", s(l).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: ne
        }, null, 8, ["class"])
      ], 8, jc),
      o("span", {
        title: s(t)("Go up a directory")
      }, [
        B(s(Cc), Be({
          class: $.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, qe($.value.length ? s(k).events(x()) : {}), { onClick: T }), null, 16, ["class"])
      ], 8, Hc),
      s(n).isLoading() ? (u(), p("span", {
        key: 1,
        title: s(t)("Cancel")
      }, [
        B(s(Pc), {
          onClick: P[0] || (P[0] = (b) => s(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, qc)) : (u(), p("span", {
        key: 0,
        title: s(t)("Refresh")
      }, [
        B(s($c), { onClick: S })
      ], 8, Kc)),
      ge(o("div", Wc, [
        o("div", null, [
          B(s(Tc), Be({ class: "vuefinder__breadcrumb__home-icon" }, qe(s(k).events(x(-1))), {
            onClick: P[1] || (P[1] = ve((b) => s(e).adapter.open(s(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", Gc, [
          m.value.length ? ge((u(), p("div", Yc, [
            P[3] || (P[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", Qc, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: P[2] || (P[2] = (b) => le(b, !0)),
                onClick: ve(le, ["stop"])
              }, [
                B(s(Fn), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [W, Y]
          ]) : M("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), p(_e, null, we(D.value, (b, C) => (u(), p("div", { key: C }, [
            P[4] || (P[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", Be({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: b.basename
            }, qe(s(k).events(b), !0), {
              onClick: ve((I) => s(e).adapter.open(b.path), ["stop"])
            }), y(b.name), 17, Xc)
          ]))), 128))
        ], 512),
        s(a).get("loadingIndicator") === "circular" && s(r) ? (u(), R(s(bt), { key: 0 })) : M("", !0),
        o("span", {
          title: s(t)("Toggle Path Copy Mode"),
          onClick: A
        }, [
          B(s(Nc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Jc)
      ], 512), [
        [je, !v.value]
      ]),
      ge(o("div", Zc, [
        o("div", eu, [
          o("div", {
            title: s(t)("Copy Path")
          }, [
            B(s(At), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: Z
            })
          ], 8, tu),
          o("div", nu, y(s(d).path), 1),
          o("div", {
            title: s(t)("Exit")
          }, [
            B(s(Oc), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: q
            })
          ], 8, ou)
        ])
      ], 512), [
        [je, v.value]
      ]),
      (u(), R(pt, { to: "body" }, [
        o("div", null, [
          ge(o("div", {
            style: He({
              position: "absolute",
              top: re.value.y + "px",
              left: re.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": s(e).theme.current
          }, [
            (u(!0), p(_e, null, we(m.value, (b, C) => (u(), p("div", Be({
              key: C,
              class: "vuefinder__breadcrumb__hidden-item"
            }, qe(s(k).events(b), !0), {
              onClick: (I) => L(b)
            }), [
              o("div", au, [
                o("span", null, [
                  B(s(Ne), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", ru, y(b.name), 1)
              ])
            ], 16, iu))), 128))
          ], 12, su), [
            [je, h.value]
          ])
        ])
      ]))
    ]));
  }
});
function du(i, e) {
  const {
    scrollContainer: t,
    itemWidth: n = 100,
    rowHeight: a,
    overscan: l = 2,
    containerPadding: d = 48,
    lockItemsPerRow: r
  } = e, c = i, _ = () => typeof a == "number" ? a : a.value, w = E(0), h = E(6), v = E(600);
  let $ = null;
  const F = j(() => Math.ceil(c.value.length / h.value)), D = j(() => F.value * _()), m = j(() => {
    const W = _(), ne = Math.max(0, Math.floor(w.value / W) - l), re = Math.min(
      F.value,
      Math.ceil((w.value + v.value) / W) + l
    );
    return { start: ne, end: re };
  }), g = j(() => {
    const { start: W, end: ne } = m.value;
    return Array.from({ length: ne - W }, (re, le) => W + le);
  }), f = () => v.value, k = () => r.value, x = () => {
    if (k()) {
      h.value = 1;
      return;
    }
    if (t.value) {
      const W = t.value.clientWidth - d;
      h.value = Math.max(Math.floor(W / n), 2);
    }
  }, S = (W) => {
    const ne = W.target;
    w.value = ne.scrollTop;
  };
  ue(
    () => c.value.length,
    () => {
      x();
    }
  );
  const T = (W, ne) => {
    if (!W || !Array.isArray(W))
      return [];
    const re = ne * h.value;
    return W.slice(re, re + h.value);
  }, L = (W, ne, re, le, A) => {
    if (!W || !Array.isArray(W))
      return [];
    const Z = [];
    for (let q = ne; q <= re; q++)
      for (let N = le; N <= A; N++) {
        const P = q * h.value + N;
        P < W.length && W[P] && Z.push(W[P]);
      }
    return Z;
  }, Y = (W) => ({
    row: Math.floor(W / h.value),
    col: W % h.value
  });
  return he(async () => {
    await Le(), t.value && (v.value = t.value.clientHeight || 600), x(), window.addEventListener("resize", () => {
      t.value && (v.value = t.value.clientHeight || 600), x();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((W) => {
      const ne = W[0];
      ne && (v.value = Math.round(ne.contentRect.height)), x();
    }), $.observe(t.value));
  }), Pe(() => {
    window.removeEventListener("resize", x), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: w,
    itemsPerRow: h,
    totalRows: F,
    totalHeight: D,
    visibleRange: m,
    visibleRows: g,
    updateItemsPerRow: x,
    handleScroll: S,
    getRowItems: T,
    getItemsInRange: L,
    getItemPosition: Y,
    getContainerHeight: f
  };
}
function cu(i) {
  const { getItemPosition: e, getItemsInRange: t, getKey: n, selectionObject: a, rowHeight: l, itemWidth: d } = i, r = Math.floor(Math.random() * 2 ** 32).toString(), c = J(), _ = c.fs, w = G(_.selectedKeys), h = G(_.sortedFiles), v = j(() => {
    const b = /* @__PURE__ */ new Map();
    return h.value && h.value.forEach((C) => {
      b.set(n(C), C);
    }), b;
  }), $ = E(/* @__PURE__ */ new Set()), F = E(!1), D = E(!1), m = E(null), g = (b) => b.map((C) => C.getAttribute("data-key")).filter((C) => !!C), f = (b) => {
    b.selection.clearSelection(!0, !0);
  }, k = (b) => {
    if (w.value && w.value.size > 0) {
      const C = document.querySelectorAll(`.file-item-${r}[data-key]`), I = /* @__PURE__ */ new Map();
      C.forEach((K) => {
        const ie = K.getAttribute("data-key");
        ie && I.set(ie, K);
      });
      const U = [];
      w.value.forEach((K) => {
        const ie = I.get(K);
        ie && x(K) && U.push(ie);
      }), U.forEach((K) => {
        b.selection.select(K, !0);
      });
    }
  }, x = (b) => {
    const C = v.value.get(b);
    if (!C) return !1;
    const I = c.selectionFilterType, U = c.selectionFilterMimeIncludes;
    return I === "files" && C.type === "dir" || I === "dirs" && C.type === "file" ? !1 : U && Array.isArray(U) && U.length > 0 ? C.type === "dir" ? !0 : C.mime_type ? U.some((K) => C.mime_type?.startsWith(K)) : !1 : !0;
  }, S = (b) => {
    if (b.size === 0)
      return null;
    const C = /* @__PURE__ */ new Map();
    h.value && h.value.forEach((pe, fe) => {
      C.set(n(pe), fe);
    });
    const U = Array.from(b).map((pe) => {
      const fe = C.get(pe) ?? -1;
      return fe >= 0 ? e(fe) : null;
    }).filter((pe) => pe !== null);
    if (U.length === 0)
      return null;
    const K = U[0], ie = U.reduce((pe, fe) => fe.row < pe ? fe.row : pe, K.row), ye = U.reduce((pe, fe) => fe.row > pe ? fe.row : pe, K.row), Te = U.reduce((pe, fe) => fe.col < pe ? fe.col : pe, K.col), ze = U.reduce((pe, fe) => fe.col > pe ? fe.col : pe, K.col);
    return { minRow: ie, maxRow: ye, minCol: Te, maxCol: ze };
  }, T = (b) => {
    if (c.selectionMode === "single")
      return !1;
    F.value = !1, !b.event?.metaKey && !b.event?.ctrlKey && (D.value = !0), b.selection.resolveSelectables(), f(b), k(b);
  }, L = E(0), Y = (b) => {
    const C = b;
    if (C && "touches" in C) {
      const I = C.touches?.[0];
      if (I) return { x: I.clientX, y: I.clientY };
    }
    if (C && "changedTouches" in C) {
      const I = C.changedTouches?.[0];
      if (I) return { x: I.clientX, y: I.clientY };
    }
    if (C && "clientX" in C && "clientY" in C) {
      const I = C;
      return { x: I.clientX, y: I.clientY };
    }
    return null;
  }, W = ({ event: b, selection: C }) => {
    L.value = (a.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const I = document.querySelector(
      ".selection-area-container"
    );
    if (I && (I.dataset.theme = c.theme.current), c.selectionMode === "single")
      return;
    const U = b;
    U && "type" in U && U.type === "touchend" && U.preventDefault();
    const K = b;
    if (!K?.ctrlKey && !K?.metaKey && (_.clearSelection(), C.clearSelection(!0, !0)), $.value.clear(), a.value) {
      const ie = a.value.getSelectables()[0]?.closest(".scroller-" + r);
      if (ie) {
        const ye = ie.getBoundingClientRect(), Te = Y(b);
        if (Te) {
          const ze = Te.y - ye.top + ie.scrollTop, pe = Te.x - ye.left, fe = Math.floor(ze / l.value), me = Math.floor(pe / d);
          m.value = { row: fe, col: me };
        }
      }
    }
  }, ne = (b) => {
    if (c.selectionMode === "single")
      return;
    const C = g(b.store.changed.added), I = g(b.store.changed.removed);
    D.value = !1, F.value = !0, C.forEach((U) => {
      w.value && !w.value.has(U) && x(U) && ($.value.add(U), _.select(U, c.selectionMode || "multiple"));
    }), I.forEach((U) => {
      document.querySelector(`[data-key="${U}"]`) && v.value.has(U) && $.value.delete(U), _.deselect(U);
    }), b.selection.resolveSelectables(), k(b);
  }, re = () => {
    $.value.clear();
  }, le = (b) => {
    if (b.event && m.value && $.value.size > 0) {
      const C = /* @__PURE__ */ new Map();
      h.value && h.value.forEach((K, ie) => {
        C.set(n(K), ie);
      });
      const U = Array.from($.value).map((K) => {
        const ie = C.get(K) ?? -1;
        return ie >= 0 ? e(ie) : null;
      }).filter((K) => K !== null);
      if (U.length > 0) {
        const K = [...U, m.value], ie = K[0], ye = {
          minRow: K.reduce((me, O) => O.row < me ? O.row : me, ie.row),
          maxRow: K.reduce((me, O) => O.row > me ? O.row : me, ie.row),
          minCol: K.reduce((me, O) => O.col < me ? O.col : me, ie.col),
          maxCol: K.reduce((me, O) => O.col > me ? O.col : me, ie.col)
        }, Te = t(
          h.value || [],
          ye.minRow,
          ye.maxRow,
          ye.minCol,
          ye.maxCol
        ), ze = document.querySelectorAll(`.file-item-${r}[data-key]`), pe = /* @__PURE__ */ new Map();
        ze.forEach((me) => {
          const O = me.getAttribute("data-key");
          O && pe.set(O, me);
        });
        const fe = [];
        if (Te.forEach((me) => {
          const O = n(me);
          pe.get(O) || fe.push(O);
        }), fe.length > 0) {
          const me = c.selectionMode || "multiple";
          _.selectMultiple(fe, me);
        }
      }
    }
  }, A = (b) => {
    le(b), f(b), k(b), _.setSelectedCount(w.value?.size || 0), F.value = !1, m.value = null;
  }, Z = () => {
    a.value = new Zn({
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
    }), a.value.on("beforestart", T), a.value.on("start", W), a.value.on("move", ne), a.value.on("stop", A);
  }, q = () => {
    a.value && (a.value.destroy(), a.value = null);
  }, N = () => {
    a.value && (Array.from(
      w.value ?? /* @__PURE__ */ new Set()
    ).forEach((C) => {
      x(C) || _.deselect(C);
    }), q(), Z());
  }, P = (b) => {
    D.value && (a.value?.clearSelection(), re(), D.value = !1);
    const C = b;
    !$.value.size && !D.value && !C?.ctrlKey && !C?.metaKey && (_.clearSelection(), a.value?.clearSelection());
  };
  return he(() => {
    const b = (C) => {
      !C.buttons && F.value && (F.value = !1);
    };
    document.addEventListener("dragleave", b), Pe(() => {
      document.removeEventListener("dragleave", b);
    });
  }), {
    isDragging: F,
    selectionStarted: D,
    explorerId: r,
    extractIds: g,
    cleanupSelection: f,
    refreshSelection: k,
    getSelectionRange: S,
    selectSelectionRange: le,
    initializeSelectionArea: Z,
    destroySelectionArea: q,
    updateSelectionArea: N,
    handleContentClick: P
  };
}
const uu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function vu(i, e) {
  return u(), p("svg", uu, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const fu = { render: vu }, _u = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function pu(i, e) {
  return u(), p("svg", _u, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const hu = { render: pu }, xt = /* @__PURE__ */ Q({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(i) {
    return (e, t) => (u(), p("div", null, [
      i.direction === "asc" ? (u(), R(s(fu), { key: 0 })) : M("", !0),
      i.direction === "desc" ? (u(), R(s(hu), { key: 1 })) : M("", !0)
    ]));
  }
}), mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function gu(i, e) {
  return u(), p("svg", mu, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const en = { render: gu }, wu = { class: "vuefinder__drag-item__container" }, yu = { class: "vuefinder__drag-item__count" }, bu = /* @__PURE__ */ Q({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(i) {
    const e = i;
    return (t, n) => (u(), p("div", wu, [
      e.count > 1 ? (u(), R(s(en), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : M("", !0),
      B(s(en), { class: "vuefinder__drag-item__icon" }),
      o("div", yu, y(e.count), 1)
    ]));
  }
}), ku = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, tn = /* @__PURE__ */ Q({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(i) {
    const e = i, t = J(), n = G(t.config.state), a = {
      app: t,
      config: n.value,
      item: e.item
    };
    return (l, d) => (u(), p("div", {
      class: X(["vuefinder__item-icon", i.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      Ce(l.$slots, "icon", We(Ge(a)), () => [
        i.item.type === "dir" ? (u(), R(s(Ne), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), R(s(nt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        i.ext && i.item.type !== "dir" && i.item.extension ? (u(), p("div", ku, y(i.item.extension.substring(0, 3)), 1)) : M("", !0)
      ])
    ], 2));
  }
}), $u = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function xu(i, e) {
  return u(), p("svg", $u, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const nn = { render: xu }, Su = ["data-key", "data-row", "data-col", "draggable"], Cu = { key: 0 }, Fu = { class: "vuefinder__explorer__item-grid-content" }, Du = ["data-src", "alt"], Pu = { class: "vuefinder__explorer__item-title" }, Eu = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Mu = { class: "vuefinder__explorer__item-list-name" }, Tu = { class: "vuefinder__explorer__item-list-icon" }, Iu = { class: "vuefinder__explorer__item-name" }, Au = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Ou = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Bu = { key: 0 }, Lu = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Vu = /* @__PURE__ */ Q({
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
    const t = i, n = e, a = J(), l = a.fs, d = a.config, r = j(() => {
      const k = a.selectionFilterType;
      return !k || k === "both" ? !0 : k === "files" && t.item.type === "file" || k === "dirs" && t.item.type === "dir";
    }), c = j(() => {
      const k = a.selectionFilterMimeIncludes;
      return !k || !k.length || t.item.type === "dir" ? !0 : t.item.mime_type ? k.some((x) => t.item.mime_type?.startsWith(x)) : !1;
    }), _ = j(() => r.value && c.value), w = j(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), h = j(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !_.value ? 0.5 : ""
    }));
    let v = null;
    const $ = E(null);
    let F = !1;
    const { enabled: D } = Ve(), m = j(() => D("move")), g = () => {
      v && clearTimeout(v);
    }, f = (k) => {
      if (v && (k.preventDefault(), clearTimeout(v)), !F)
        F = !0, n("click", k), $.value = setTimeout(() => {
          F = !1;
        }, 300);
      else
        return F = !1, n("dblclick", k), v && clearTimeout(v), !1;
      if (k.currentTarget && k.currentTarget instanceof HTMLElement) {
        const x = k.currentTarget.getBoundingClientRect();
        k.preventDefault(), v = setTimeout(() => {
          let L = x.y + x.height;
          L + 146 > window.innerHeight - 10 && (L = x.y - 146), L < 10 && (L = 10);
          const Y = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: x.x,
            clientY: L
          });
          k.target?.dispatchEvent(Y);
        }, 300);
      }
    };
    return (k, x) => (u(), p("div", {
      class: X(w.value),
      style: He(h.value),
      "data-key": i.item.path,
      "data-row": i.rowIndex,
      "data-col": i.colIndex,
      draggable: m.value,
      onTouchstart: x[1] || (x[1] = (S) => f(S)),
      onTouchend: x[2] || (x[2] = (S) => g()),
      onClick: x[3] || (x[3] = (S) => n("click", S)),
      onDblclick: x[4] || (x[4] = (S) => n("dblclick", S)),
      onContextmenu: x[5] || (x[5] = ve((S) => n("contextmenu", S), ["prevent", "stop"])),
      onDragstart: x[6] || (x[6] = (S) => n("dragstart", S)),
      onDragend: x[7] || (x[7] = (S) => n("dragend", S))
    }, [
      i.view === "grid" ? (u(), p("div", Cu, [
        s(l).isReadOnly(i.item) ? (u(), R(s(nn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : M("", !0),
        o("div", Fu, [
          (i.item.mime_type ?? "").startsWith("image") && i.showThumbnails ? (u(), p("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": i.item.previewUrl ?? s(a).adapter.getPreviewUrl({ path: i.item.path }),
            alt: i.item.basename,
            onTouchstart: x[0] || (x[0] = (S) => S.preventDefault())
          }, null, 40, Du)) : (u(), R(tn, {
            key: 1,
            item: i.item,
            ext: !0
          }, {
            icon: te((S) => [
              Ce(k.$slots, "icon", We(Ge(S)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        o("span", Pu, y(s(Dt)(i.item.basename)), 1)
      ])) : (u(), p("div", Eu, [
        o("div", Mu, [
          o("div", Tu, [
            B(tn, {
              item: i.item,
              small: i.compact
            }, {
              icon: te((S) => [
                Ce(k.$slots, "icon", We(Ge(S)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          o("span", Iu, y(i.item.basename), 1),
          o("div", null, [
            s(l).isReadOnly(i.item) ? (u(), R(s(nn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : M("", !0)
          ])
        ]),
        i.showPath ? (u(), p("div", Au, y(i.item.path), 1)) : M("", !0),
        i.showPath ? M("", !0) : (u(), p("div", Ou, [
          i.item.file_size ? (u(), p("div", Bu, y(s(a).filesize(i.item.file_size)), 1)) : M("", !0)
        ])),
        !i.showPath && i.item.last_modified ? (u(), p("div", Lu, y(new Date(i.item.last_modified * 1e3).toLocaleString()), 1)) : M("", !0)
      ])),
      s(D)("pinned") && s(d).get("pinnedFolders").find((S) => S.path === i.item.path) ? (u(), R(s(Ot), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : M("", !0)
    ], 46, Su));
  }
}), zu = ["data-row"], on = /* @__PURE__ */ Q({
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
    const t = i, n = e, a = j(() => [
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
    return (r, c) => (u(), p("div", {
      class: X(a.value),
      "data-row": i.rowIndex,
      style: He(l.value)
    }, [
      o("div", {
        class: X(["grid justify-self-start", { "w-full": i.view === "list" }]),
        style: He(d.value)
      }, [
        (u(!0), p(_e, null, we(i.items, (_, w) => (u(), R(Vu, Be({
          key: _.path,
          item: _,
          view: i.view,
          compact: i.compact,
          "show-thumbnails": i.showThumbnails,
          "show-path": i.showPath,
          "is-selected": i.isSelected(_.path),
          "is-dragging": i.isDraggingItem(_.path),
          "row-index": i.rowIndex,
          "col-index": w,
          "explorer-id": i.explorerId
        }, qe(i.dragNDropEvents(_)), {
          onClick: c[0] || (c[0] = (h) => n("click", h)),
          onDblclick: c[1] || (c[1] = (h) => n("dblclick", h)),
          onContextmenu: c[2] || (c[2] = (h) => n("contextmenu", h)),
          onDragstart: c[3] || (c[3] = (h) => n("dragstart", h)),
          onDragend: c[4] || (c[4] = (h) => n("dragend", h))
        }), {
          icon: te((h) => [
            Ce(r.$slots, "icon", Be({ ref_for: !0 }, h))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, zu));
  }
}), Ru = { class: "vuefinder__explorer__container" }, Nu = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Uu = {
  key: 0,
  class: "vuefinder__linear-loader"
}, ju = /* @__PURE__ */ Q({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(i) {
    const e = i, t = J(), n = at(t, ["vuefinder__drag-over"]), a = Qe("dragImage"), l = sn(null), d = Qe("scrollContainer"), r = Qe("scrollContent"), c = t.fs, _ = t.config, w = G(_.state), h = G(c.sort), v = G(c.sortedFiles), $ = G(c.selectedKeys), F = G(c.loading), D = (O) => $.value?.has(O) ?? !1;
    let m = null;
    const g = E(null), f = j(() => {
      const O = w.value.view, oe = w.value.compactListView;
      return O === "grid" ? 88 : oe ? 24 : 50;
    }), { t: k } = t.i18n, {
      itemsPerRow: x,
      totalHeight: S,
      visibleRows: T,
      handleScroll: L,
      getRowItems: Y,
      getItemsInRange: W,
      getItemPosition: ne,
      updateItemsPerRow: re
    } = du(
      j(() => v.value ?? []),
      {
        scrollContainer: d,
        itemWidth: 104,
        rowHeight: f,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: j(() => w.value.view === "list")
      }
    ), {
      explorerId: le,
      isDragging: A,
      initializeSelectionArea: Z,
      destroySelectionArea: q,
      updateSelectionArea: N,
      handleContentClick: P
    } = cu({
      getItemPosition: ne,
      getItemsInRange: W,
      getKey: (O) => O.path,
      selectionObject: l,
      rowHeight: f,
      itemWidth: 104
    }), b = E(null), C = (O) => {
      if (!O || !b.value) return !1;
      const oe = $.value?.has(b.value) ?? !1;
      return A.value && (oe ? $.value?.has(O) ?? !1 : O === b.value);
    };
    ue(
      () => _.get("view"),
      (O) => {
        O === "list" ? x.value = 1 : re();
      },
      { immediate: !0 }
    ), ue(x, (O) => {
      _.get("view") === "list" && O !== 1 && (x.value = 1);
    });
    const I = (O) => v.value?.[O];
    he(() => {
      if (Z(), l.value && l.value.on("beforestart", ({ event: O }) => {
        const oe = O?.target === r.value;
        if (!O?.metaKey && !O?.ctrlKey && !O?.altKey && !oe)
          return !1;
      }), d.value && (m = new cn({
        elements_selector: ".lazy",
        container: d.value
      })), ue(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], N, {
        deep: !0
      }), tt.plugin([Jn]), d.value) {
        const O = tt(
          d.value,
          {
            scrollbars: { theme: "vf-scrollbars-theme" }
          },
          {
            initialized: (oe) => {
              g.value = oe;
              const { viewport: se } = oe.elements();
              se && se.addEventListener("scroll", L);
            },
            updated: (oe) => {
              const { viewport: se } = oe.elements();
            }
          }
        );
        g.value = O;
      }
    }), he(() => {
      t.emitter.on("vf-refresh-thumbnails", () => {
        m && m.update();
      });
    }), Un(() => {
      m && m.update();
    }), Pe(() => {
      if (q(), m && (m.destroy(), m = null), g.value) {
        const { viewport: O } = g.value.elements();
        O && O.removeEventListener("scroll", L), g.value.destroy(), g.value = null;
      }
    });
    const U = (O) => {
      const oe = O.target?.closest(".file-item-" + le), se = O;
      if (oe) {
        const ae = String(oe.getAttribute("data-key")), $e = v.value?.find((Ie) => Ie.path === ae), Se = t.selectionFilterType, V = t.selectionFilterMimeIncludes, z = !Se || Se === "both" || Se === "files" && $e?.type === "file" || Se === "dirs" && $e?.type === "dir";
        let H = !0;
        if (V && Array.isArray(V) && V.length > 0 && ($e?.type === "dir" ? H = !0 : $e?.mime_type ? H = V.some((Ie) => ($e?.mime_type).startsWith(Ie)) : H = !1), !z || !H)
          return;
        const ee = t.selectionMode || "multiple";
        !se?.ctrlKey && !se?.metaKey && (O.type !== "touchstart" || !c.isSelected(ae)) && (c.clearSelection(), l.value?.clearSelection(!0, !0)), l.value?.resolveSelectables(), O.type === "touchstart" && c.isSelected(ae) ? c.select(ae, ee) : c.toggleSelect(ae, ee);
      }
      c.setSelectedCount($.value?.size || 0);
    };
    function K(O) {
      return {
        item: O,
        defaultPrevented: !1,
        preventDefault() {
          this.defaultPrevented = !0;
        }
      };
    }
    const ie = (O) => {
      const oe = K(O);
      if (O.type === "file" && e.onFileDclick) {
        if (t.emitter.emit("vf-file-dclick", oe), oe.defaultPrevented) return;
      } else if (O.type === "dir" && e.onFolderDclick && (t.emitter.emit("vf-folder-dclick", oe), oe.defaultPrevented))
        return;
      const se = t.contextMenuItems?.find((ae) => ae.show(t, {
        items: [O],
        target: O,
        searchQuery: ""
      }));
      se && se.action(t, [O]);
    }, ye = (O) => {
      const oe = O.target?.closest(
        ".file-item-" + le
      ), se = oe ? String(oe.getAttribute("data-key")) : null;
      if (!se) return;
      const ae = v.value?.find((H) => H.path === se), $e = t.selectionFilterType, Se = t.selectionFilterMimeIncludes, V = !$e || $e === "both" || $e === "files" && ae?.type === "file" || $e === "dirs" && ae?.type === "dir";
      let z = !0;
      Se && Array.isArray(Se) && Se.length > 0 && (ae?.type === "dir" ? z = !0 : ae?.mime_type ? z = Se.some((H) => (ae?.mime_type).startsWith(H)) : z = !1), !(!V || !z) && ae && ie(ae);
    }, Te = () => {
      const O = $.value;
      return v.value?.filter((oe) => O?.has(oe.path)) || [];
    }, ze = (O) => {
      O.preventDefault();
      const oe = O.target?.closest(
        ".file-item-" + le
      );
      if (oe) {
        const se = String(oe.getAttribute("data-key")), ae = v.value?.find((H) => H.path === se), $e = t.selectionFilterType, Se = t.selectionFilterMimeIncludes, V = !$e || $e === "both" || $e === "files" && ae?.type === "file" || $e === "dirs" && ae?.type === "dir";
        let z = !0;
        if (Se && Array.isArray(Se) && Se.length > 0 && (ae?.type === "dir" ? z = !0 : ae?.mime_type ? z = Se.some(
          (H) => (ae?.mime_type).startsWith(H)
        ) : z = !1), !V || !z)
          return;
        $.value?.has(se) || (c.clearSelection(), c.select(se)), t.emitter.emit("vf-contextmenu-show", {
          event: O,
          items: Te(),
          target: ae
        });
      }
    }, pe = (O) => {
      O.preventDefault(), t.emitter.emit("vf-contextmenu-show", { event: O, items: Te() });
    }, fe = (O) => {
      if (!(t.features?.move ?? !1) || O.altKey || O.ctrlKey || O.metaKey)
        return O.preventDefault(), !1;
      A.value = !0;
      const se = O.target?.closest(
        ".file-item-" + le
      );
      if (b.value = se ? String(se.dataset.key) : null, O.dataTransfer && b.value) {
        O.dataTransfer.setDragImage(a.value, 0, 15), O.dataTransfer.effectAllowed = "all", O.dataTransfer.dropEffect = "copy";
        const ae = $.value?.has(b.value) ? Array.from($.value) : [b.value];
        O.dataTransfer.setData("items", JSON.stringify(ae)), c.setDraggedItem(b.value);
      }
    }, me = () => {
      b.value = null;
    };
    return (O, oe) => (u(), p("div", Ru, [
      s(w).view === "list" ? (u(), p("div", Nu, [
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
          onClick: oe[0] || (oe[0] = (se) => s(c).toggleSort("basename"))
        }, [
          ce(y(s(k)("Name")) + " ", 1),
          ge(B(xt, {
            direction: s(h).order
          }, null, 8, ["direction"]), [
            [je, s(h).active && s(h).column === "basename"]
          ])
        ]),
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
          onClick: oe[1] || (oe[1] = (se) => s(c).toggleSort("file_size"))
        }, [
          ce(y(s(k)("Size")) + " ", 1),
          ge(B(xt, {
            direction: s(h).order
          }, null, 8, ["direction"]), [
            [je, s(h).active && s(h).column === "file_size"]
          ])
        ]),
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
          onClick: oe[2] || (oe[2] = (se) => s(c).toggleSort("last_modified"))
        }, [
          ce(y(s(k)("Date")) + " ", 1),
          ge(B(xt, {
            direction: s(h).order
          }, null, 8, ["direction"]), [
            [je, s(h).active && s(h).column === "last_modified"]
          ])
        ])
      ])) : M("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: d,
        class: X(["vuefinder__explorer__selector-area", "scroller-" + s(le)])
      }, [
        s(_).get("loadingIndicator") === "linear" && s(F) ? (u(), p("div", Uu)) : M("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: He({ height: `${s(S)}px`, position: "relative", width: "100%" }),
          onContextmenu: ve(pe, ["self", "prevent"]),
          onClick: oe[3] || (oe[3] = ve(
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
            B(bu, {
              count: b.value && s($).has(b.value) ? s($).size : 1
            }, null, 8, ["count"])
          ], 512),
          s(w).view === "grid" ? (u(!0), p(_e, { key: 0 }, we(s(T), (se) => (u(), R(on, {
            key: se,
            "row-index": se,
            "row-height": f.value,
            view: "grid",
            "items-per-row": s(x),
            items: s(Y)(s(v), se),
            "show-thumbnails": s(w).showThumbnails,
            "is-dragging-item": C,
            "is-selected": D,
            "drag-n-drop-events": (ae) => s(n).events(ae),
            "explorer-id": s(le),
            onClick: U,
            onDblclick: ye,
            onContextmenu: ze,
            onDragstart: fe,
            onDragend: me
          }, {
            icon: te((ae) => [
              Ce(O.$slots, "icon", Be({ ref_for: !0 }, ae))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id"]))), 128)) : (u(!0), p(_e, { key: 1 }, we(s(T), (se) => (u(), R(on, {
            key: se,
            "row-index": se,
            "row-height": f.value,
            view: "list",
            items: I(se) ? [I(se)] : [],
            compact: s(w).compactListView,
            "is-dragging-item": C,
            "is-selected": D,
            "drag-n-drop-events": (ae) => s(n).events(ae),
            "explorer-id": s(le),
            onClick: U,
            onDblclick: ye,
            onContextmenu: ze,
            onDragstart: fe,
            onDragend: me
          }, {
            icon: te((ae) => [
              Ce(O.$slots, "icon", Be({ ref_for: !0 }, ae))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), Hu = ["href", "download"], Ku = ["onClick"], qu = /* @__PURE__ */ Q({
  __name: "ContextMenu",
  setup(i) {
    const e = J(), t = E(null), n = E([]), a = _t({
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
      const { event: _, items: w, target: h = null } = c || {};
      a.items = (e.contextMenuItems || []).filter((v) => v.show(e, {
        items: w,
        target: h
      })), h ? w.length > 1 && w.some((v) => v.path === h.path) ? e.emitter.emit("vf-context-selected", w) : e.emitter.emit("vf-context-selected", [h]) : e.emitter.emit("vf-context-selected", []), r(_);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      a.active = !1;
    });
    const r = (c) => {
      const _ = e.root, w = _?.getBoundingClientRect?.(), h = _?.getBoundingClientRect?.();
      let v = c.clientX - (w?.left ?? 0), $ = c.clientY - (w?.top ?? 0);
      a.active = !0, Le(() => {
        const F = t.value?.getBoundingClientRect(), D = F?.height ?? 0, m = F?.width ?? 0;
        v = h && h.right - c.pageX + window.scrollX < m ? v - m : v, $ = h && h.bottom - c.pageY + window.scrollY < D ? $ - D : $, a.positions = {
          left: String(v) + "px",
          top: String($) + "px"
        };
      });
    };
    return (c, _) => ge((u(), p("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: X([{
        "vuefinder__context-menu--active": a.active,
        "vuefinder__context-menu--inactive": !a.active
      }, "vuefinder__context-menu"]),
      style: He(a.positions)
    }, [
      (u(!0), p(_e, null, we(a.items, (w) => (u(), p("li", {
        key: w.title,
        class: "vuefinder__context-menu__item"
      }, [
        w.link ? (u(), p("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: l(w),
          download: l(w),
          onClick: _[0] || (_[0] = (h) => s(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, y(w.title(s(e).i18n)), 1)
        ], 8, Hu)) : (u(), p("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => d(w)
        }, [
          o("span", null, y(w.title(s(e).i18n)), 1)
        ], 8, Ku))
      ]))), 128))
    ], 6)), [
      [je, a.active]
    ]);
  }
}), Wu = { class: "vuefinder__status-bar__wrapper" }, Gu = { class: "vuefinder__status-bar__storage" }, Yu = ["title"], Qu = { class: "vuefinder__status-bar__storage-icon" }, Xu = ["value"], Ju = ["value"], Zu = { class: "vuefinder__status-bar__info space-x-2" }, ev = { key: 0 }, tv = { key: 1 }, nv = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, ov = { class: "vuefinder__status-bar__actions" }, sv = /* @__PURE__ */ Q({
  __name: "Statusbar",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.sortedFiles), l = G(n.path), d = G(n.selectedCount), r = G(n.storages), c = G(n.selectedItems), _ = G(n.path), w = (m) => {
      const g = m.target.value;
      e.adapter.open(g + "://");
    }, h = j(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((m, g) => m + (g.file_size || 0), 0)), v = j(() => r.value), $ = j(() => a.value), F = j(() => d.value || 0), D = j(() => c.value || []);
    return (m, g) => (u(), p("div", Wu, [
      o("div", Gu, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: s(t)("Storage")
        }, [
          o("div", Qu, [
            B(s(Bt))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: s(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: w
          }, [
            (u(!0), p(_e, null, we(v.value, (f) => (u(), p("option", {
              key: f,
              value: f
            }, y(f), 9, Ju))), 128))
          ], 40, Xu),
          g[0] || (g[0] = o("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, Yu),
        o("div", Zu, [
          F.value === 0 ? (u(), p("span", ev, y($.value.length) + " " + y(s(t)("items")), 1)) : (u(), p("span", tv, [
            ce(y(F.value) + " " + y(s(t)("selected")) + " ", 1),
            h.value ? (u(), p("span", nv, y(s(e).filesize(h.value)), 1)) : M("", !0)
          ]))
        ])
      ]),
      o("div", ov, [
        Ce(m.$slots, "actions", {
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
}, Bn = /* @__PURE__ */ Q({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ jn({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(i) {
    const e = i, t = J(), n = dn(i, "modelValue"), a = E(!1);
    ue(
      () => n.value,
      () => l()
    );
    const l = async () => {
      a.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        On(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (d) {
        Ee(d, "Failed to fetch subfolders");
      } finally {
        a.value = !1;
      }
    };
    return (d, r) => (u(), p("div", lv, [
      a.value ? (u(), R(s(bt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), p("div", dv, [
        n.value ? (u(), R(s(yt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : M("", !0),
        n.value ? M("", !0) : (u(), R(s(wt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), cv = { key: 0 }, uv = { class: "vuefinder__treesubfolderlist__no-folders" }, vv = { class: "vuefinder__treesubfolderlist__item-content" }, fv = ["onClick"], _v = ["title", "onDblclick", "onClick"], pv = { class: "vuefinder__treesubfolderlist__item-icon" }, hv = { class: "vuefinder__treesubfolderlist__subfolder" }, mv = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, gv = /* @__PURE__ */ Q({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(i) {
    const e = J(), t = e.fs, n = at(e, ["vuefinder__drag-over"]), a = E({}), { t: l } = e.i18n, d = G(t.path), r = i, c = E(null), _ = E(50);
    he(() => {
      r.path === r.storage + "://" && c.value && tt(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const w = j(() => {
      const D = e.treeViewData.find((m) => m.path === r.path)?.folders || [];
      return D.length > _.value ? D.slice(0, _.value) : D;
    }), h = j(() => e.treeViewData.find((D) => D.path === r.path)?.folders?.length || 0), v = j(() => h.value > _.value), $ = () => {
      _.value += 50;
    };
    return (F, D) => {
      const m = rn("TreeSubfolderList", !0);
      return u(), p("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        w.value.length ? M("", !0) : (u(), p("li", cv, [
          o("div", uv, y(s(l)("No folders")), 1)
        ])),
        (u(!0), p(_e, null, we(w.value, (g) => (u(), p("li", {
          key: g.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", vv, [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (f) => a.value[g.path] = !a.value[g.path]
            }, [
              B(Bn, {
                modelValue: a.value[g.path],
                "onUpdate:modelValue": (f) => a.value[g.path] = f,
                storage: i.storage,
                path: g.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, fv),
            o("div", Be({
              class: "vuefinder__treesubfolderlist__item-link",
              title: g.path
            }, qe(
              s(n).events({
                ...g,
                dir: g.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (f) => a.value[g.path] = !a.value[g.path],
              onClick: (f) => s(e).adapter.open(g.path)
            }), [
              o("div", pv, [
                s(d)?.path === g.path ? (u(), R(s(Lt), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), R(s(Ne), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: X(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": s(d).path === g.path
                }])
              }, y(g.basename), 3)
            ], 16, _v)
          ]),
          o("div", hv, [
            ge(B(m, {
              storage: r.storage,
              path: g.path
            }, null, 8, ["storage", "path"]), [
              [je, a.value[g.path]]
            ])
          ])
        ]))), 128)),
        v.value ? (u(), p("li", mv, [
          o("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: $
          }, y(s(l)("load more")), 1)
        ])) : M("", !0)
      ], 512);
    };
  }
}), wv = /* @__PURE__ */ Q({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(i) {
    const e = J(), t = e.fs, n = E(!1), a = i, l = at(e, ["vuefinder__drag-over"]), d = G(t.path), r = j(() => a.storage === d.value?.storage), c = {
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
    function _(w) {
      w === d.value?.storage ? n.value = !n.value : e.adapter.open(w + "://");
    }
    return (w, h) => (u(), p(_e, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: h[2] || (h[2] = (v) => _(i.storage))
      }, [
        o("div", Be({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, qe(s(l).events(c), !0)), [
          o("div", {
            class: X(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            B(s(Bt))
          ], 2),
          o("div", null, y(i.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: h[1] || (h[1] = ve((v) => n.value = !n.value, ["stop"]))
        }, [
          B(Bn, {
            modelValue: n.value,
            "onUpdate:modelValue": h[0] || (h[0] = (v) => n.value = v),
            storage: i.storage,
            path: i.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      ge(B(gv, {
        storage: i.storage,
        path: i.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [je, n.value]
      ])
    ], 64));
  }
}), yv = { class: "vuefinder__folder-indicator" }, bv = { class: "vuefinder__folder-indicator--icon" }, kv = /* @__PURE__ */ Q({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(i) {
    const e = dn(i, "modelValue");
    return (t, n) => (u(), p("div", yv, [
      o("div", bv, [
        e.value ? (u(), R(s(yt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : M("", !0),
        e.value ? M("", !0) : (u(), R(s(wt), {
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
}, Fv = ["onClick"], Dv = ["title"], Pv = ["onClick"], Ev = { key: 0 }, Mv = { class: "vuefinder__treeview__no-pinned" }, Tv = /* @__PURE__ */ Q({
  __name: "TreeView",
  setup(i) {
    const e = J(), { enabled: t } = Ve(), { t: n } = e.i18n, { getStore: a, setStore: l } = e.storage, d = e.fs, r = e.config, c = G(r.state), _ = G(d.sortedFiles), w = G(d.storages), h = j(() => w.value || []), v = G(d.path), $ = at(e, ["vuefinder__drag-over"]), F = E(190), D = E(a("pinned-folders-opened", !0));
    ue(D, (k) => l("pinned-folders-opened", k));
    const m = (k) => {
      const x = r.get("pinnedFolders");
      r.set("pinnedFolders", x.filter((S) => S.path !== k.path));
    }, g = (k) => {
      const x = k.clientX, S = k.target.parentElement;
      if (!S) return;
      const T = S.getBoundingClientRect().width;
      S.classList.remove("transition-[width]"), S.classList.add("transition-none");
      const L = (W) => {
        F.value = T + W.clientX - x, F.value < 50 && (F.value = 0, r.set("showTreeView", !1)), F.value > 50 && r.set("showTreeView", !0);
      }, Y = () => {
        const W = S.getBoundingClientRect();
        F.value = W.width, S.classList.add("transition-[width]"), S.classList.remove("transition-none"), window.removeEventListener("mousemove", L), window.removeEventListener("mouseup", Y);
      };
      window.addEventListener("mousemove", L), window.addEventListener("mouseup", Y);
    }, f = E(null);
    return he(() => {
      f.value && tt(f.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ue(_, (k) => {
      const x = k.filter((S) => S.type === "dir");
      On(e.treeViewData, {
        path: v.value.path || "",
        folders: x.map((S) => ({
          storage: S.storage,
          path: S.path,
          basename: S.basename,
          type: "dir"
        }))
      });
    }), (k, x) => (u(), p(_e, null, [
      o("div", {
        class: X(["vuefinder__treeview__overlay", s(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: x[0] || (x[0] = (S) => s(r).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: He(
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
              onClick: x[2] || (x[2] = (S) => D.value = !D.value)
            }, [
              o("div", xv, [
                B(s(Ot), { class: "vuefinder__treeview__pin-icon" }),
                o("div", Sv, y(s(n)("Pinned Folders")), 1)
              ]),
              B(kv, {
                modelValue: D.value,
                "onUpdate:modelValue": x[1] || (x[1] = (S) => D.value = S)
              }, null, 8, ["modelValue"])
            ]),
            D.value ? (u(), p("ul", Cv, [
              (u(!0), p(_e, null, we(s(c).pinnedFolders, (S) => (u(), p("li", {
                key: S.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", Be({ class: "vuefinder__treeview__pinned-folder" }, qe(s($).events(S), !0), {
                  onClick: (T) => s(e).adapter.open(S.path)
                }), [
                  s(v).path !== S.path ? (u(), R(s(Ne), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : M("", !0),
                  s(v).path === S.path ? (u(), R(s(Lt), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : M("", !0),
                  o("div", {
                    title: S.path,
                    class: X(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": s(v).path === S.path
                    }])
                  }, y(S.basename), 11, Dv)
                ], 16, Fv),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (T) => m(S)
                }, [
                  B(s(rv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Pv)
              ]))), 128)),
              s(c).pinnedFolders.length ? M("", !0) : (u(), p("li", Ev, [
                o("div", Mv, y(s(n)("No folders pinned")), 1)
              ]))
            ])) : M("", !0)
          ])) : M("", !0),
          (u(!0), p(_e, null, we(h.value, (S) => (u(), p("div", {
            key: S,
            class: "vuefinder__treeview__storage"
          }, [
            B(wv, { storage: S }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        o("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: g
        }, null, 32)
      ], 4)
    ], 64));
  }
}), xe = {
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
function be(i) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    i
  );
  return (t, n) => !(e.needsSearchQuery !== !!n.searchQuery || e.target !== void 0 && e.target !== Iv(n) || e.targetType !== void 0 && e.targetType !== n.target?.type || e.mimeType !== void 0 && e.mimeType !== n.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function Ze(...i) {
  return (e, t) => i.some((n) => n(e, t));
}
function et(...i) {
  return (e, t) => i.every((n) => n(e, t));
}
const Ln = [
  {
    id: xe.openDir,
    title: ({ t: i }) => i("Open containing folder"),
    action: (i, e) => {
      const t = e[0];
      t && i.adapter.open(t.dir);
    },
    show: be({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: xe.refresh,
    title: ({ t: i }) => i("Refresh"),
    action: (i) => {
      const e = i.fs;
      i.adapter.invalidateListQuery(e.path.get().path), i.adapter.open(e.path.get().path);
    },
    show: Ze(be({ target: "none" }), be({ target: "many" }))
  },
  {
    id: xe.selectAll,
    title: ({ t: i }) => i("Select All"),
    action: (i) => {
      i.fs.selectAll(i.selectionMode || "multiple");
    },
    show: (i, e) => i.selectionMode === "multiple" && be({ target: "none" })(i, e)
  },
  {
    id: xe.new_folder,
    title: ({ t: i }) => i("New Folder"),
    action: (i) => i.modal.open(Ut),
    show: be({ target: "none", feature: "newfolder" })
  },
  {
    id: xe.open,
    title: ({ t: i }) => i("Open"),
    action: (i, e) => {
      e[0] && i.adapter.open(e[0].path);
    },
    show: be({ target: "one", targetType: "dir" })
  },
  {
    id: xe.pinFolder,
    title: ({ t: i }) => i("Pin Folder"),
    action: (i, e) => {
      const t = i.config, n = t.get("pinnedFolders"), a = n.concat(
        e.filter(
          (l) => n.findIndex((d) => d.path === l.path) === -1
        )
      );
      t.set("pinnedFolders", a);
    },
    show: et(be({ target: "one", targetType: "dir", feature: "pinned" }), (i, e) => i.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1)
  },
  {
    id: xe.unpinFolder,
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
    show: et(be({ target: "one", targetType: "dir", feature: "pinned" }), (i, e) => i.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1)
  },
  {
    id: xe.preview,
    title: ({ t: i }) => i("Preview"),
    action: (i, e) => i.modal.open(gt, { storage: e[0]?.storage, item: e[0] }),
    show: et(
      be({ target: "one", feature: "preview" }),
      (i, e) => e.target?.type !== "dir"
    )
  },
  {
    id: xe.download,
    link: (i, e) => {
      if (e[0])
        return i.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: i }) => i("Download"),
    action: () => {
    },
    show: et(
      be({ target: "one", feature: "download" }),
      (i, e) => e.target?.type !== "dir"
    )
  },
  {
    id: xe.rename,
    title: ({ t: i }) => i("Rename"),
    action: (i, e) => i.modal.open(mt, { items: e }),
    show: be({ target: "one", feature: "rename" })
  },
  {
    id: xe.move,
    title: ({ t: i }) => i("Move"),
    action: (i, e) => {
      const t = i.fs, n = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      i.modal.open(Xe, { items: { from: e, to: n } });
    },
    show: Ze(
      be({ target: "one", feature: "move" }),
      be({ target: "many", feature: "move" })
    )
  },
  {
    id: xe.copy,
    title: ({ t: i }) => i("Copy"),
    action: (i, e) => {
      e.length > 0 && i.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: Ze(
      be({ target: "one", feature: "copy" }),
      be({ target: "many", feature: "copy" })
    )
  },
  {
    id: xe.paste,
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
        i.modal.open(t.type === "cut" ? Xe : zt, {
          items: { from: Array.from(t.items), to: r }
        });
      }
    },
    show: (i, e) => i.features?.copy ?? !1 ? i.fs.getClipboard()?.items?.size > 0 : !1
  },
  {
    id: xe.archive,
    title: ({ t: i }) => i("Archive"),
    action: (i, e) => i.modal.open(Kt, { items: e }),
    show: Ze(
      be({ target: "many", feature: "archive" }),
      et(
        be({ target: "one", feature: "archive" }),
        (i, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: xe.unarchive,
    title: ({ t: i }) => i("Unarchive"),
    action: (i, e) => i.modal.open(Ht, { items: e }),
    show: be({ target: "one", feature: "unarchive", mimeType: "application/zip" })
  },
  {
    id: xe.delete,
    title: ({ t: i }) => i("Delete"),
    action: (i, e) => {
      i.modal.open(ht, { items: e });
    },
    show: Ze(
      be({ feature: "delete", target: "one" }),
      be({ feature: "delete", target: "many" })
    )
  }
], Av = ["data-theme"], Ov = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Bv = { class: "vuefinder__external-drop-message" }, Lv = { class: "vuefinder__main__content" }, Vv = /* @__PURE__ */ Q({
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
    const t = e, n = i, a = J(), l = Qe("root"), d = a.config;
    ue(
      () => n.features,
      (m) => {
        const g = fn(m);
        Object.keys(a.features).forEach((f) => {
          delete a.features[f];
        }), Object.assign(a.features, g);
      },
      { deep: !0 }
    );
    const r = a.fs, c = G(d.state);
    Wr();
    const { isDraggingExternal: _, handleDragEnter: w, handleDragOver: h, handleDragLeave: v, handleDrop: $ } = Gr();
    function F(m) {
      r.setPath(m.dirname), d.get("persist") && d.set("path", m.dirname), r.setReadOnly(m.read_only ?? !1), a.modal.close(), r.setFiles(m.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(m.storages);
    }
    a.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, a.adapter.onAfterOpen = (m) => {
      F(m), r.setLoading(!1);
    }, a.emitter.on("vf-upload-complete", (m) => {
      t("upload-complete", m);
    }), a.emitter.on("vf-delete-complete", (m) => {
      t("delete-complete", m);
    }), a.emitter.on("vf-file-dclick", (m) => {
      t("file-dclick", m);
    }), a.emitter.on("vf-folder-dclick", (m) => {
      t("folder-dclick", m);
    }), ue(
      () => n.config?.theme,
      (m) => {
        m && d.set("theme", s(m));
      },
      { immediate: !0 }
    ), he(() => {
      a.root = l.value, ue(
        () => d.get("path"),
        (g) => {
          a.adapter.open(g);
        }
      );
      const m = d.get("persist") ? d.get("path") : d.get("initialPath") ?? "";
      r.setPath(m), a.adapter.open(m), r.path.listen((g) => {
        t("path-change", g.path);
      }), r.selectedItems.listen((g) => {
        t("select", g);
      }), t("ready");
    });
    const D = async (m) => {
      const g = await $(m);
      g.length > 0 && (a.modal.open(jt), setTimeout(() => {
        a.emitter.emit(
          "vf-external-files-dropped",
          g.map((f) => f.file)
        );
      }, 100));
    };
    return (m, g) => (u(), p("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: X(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": s(_) }]),
      "data-theme": s(a).theme.current,
      onDragenter: g[2] || (g[2] = //@ts-ignore
      (...f) => s(w) && s(w)(...f)),
      onDragover: g[3] || (g[3] = //@ts-ignore
      (...f) => s(h) && s(h)(...f)),
      onDragleave: g[4] || (g[4] = //@ts-ignore
      (...f) => s(v) && s(v)(...f)),
      onDrop: D
    }, [
      o("div", {
        class: X(s(a).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: X([
            s(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: g[0] || (g[0] = (f) => s(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: g[1] || (g[1] = (f) => s(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          s(_) ? (u(), p("div", Ov, [
            o("div", Bv, y(s(a).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : M("", !0),
          B(gd),
          B(yc),
          B(lu),
          o("div", Lv, [
            B(Tv),
            B(ju, {
              "on-file-dclick": n.onFileDclick,
              "on-folder-dclick": n.onFolderDclick
            }, {
              icon: te((f) => [
                Ce(m.$slots, "icon", We(Ge(f)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          B(sv, null, {
            actions: te((f) => [
              Ce(m.$slots, "status-bar", We(Ge(f)))
            ]),
            _: 3
          })
        ], 34),
        (u(), R(pt, { to: "body" }, [
          B(Hn, { name: "fade" }, {
            default: te(() => [
              s(a).modal.visible ? (u(), R(an(s(a).modal.type), { key: 0 })) : M("", !0)
            ]),
            _: 1
          })
        ])),
        B(qu, { items: s(Ln) }, null, 8, ["items"]),
        B(s(Wn), { position: "bottom-center" })
      ], 2)
    ], 42, Av));
  }
}), zv = /* @__PURE__ */ Q({
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
  setup(i) {
    const e = i, t = e.id ?? rt(Ct);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const n = go(e, rt("VueFinderOptions") || {});
    return to(t, n), Kn(Ct, t), ln(() => {
      no(t);
    }), (a, l) => (u(), R(Vv, We(Ge(e)), {
      icon: te((d) => [
        Ce(a.$slots, "icon", We(Ge(d)))
      ]),
      "status-bar": te((d) => [
        Ce(a.$slots, "status-bar", We(Ge(d)))
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
  xe as ContextMenuIds,
  tf as IndexedDBDriver,
  hn as RemoteDriver,
  zv as VueFinder,
  nf as VueFinderPlugin,
  zv as VueFinderProvider,
  Ln as contextMenuItems,
  nf as default
};
