import { reactive as Ue, watch as de, ref as y, shallowRef as at, useTemplateRef as De, defineComponent as K, inject as j, onMounted as ce, nextTick as Ve, createElementBlock as f, openBlock as a, withKeys as Ie, unref as t, createElementVNode as s, withModifiers as xe, renderSlot as Ne, createBlock as I, resolveDynamicComponent as Je, toDisplayString as h, onUnmounted as Re, normalizeClass as Q, computed as ne, withCtx as z, createVNode as D, createCommentVNode as M, Fragment as te, renderList as oe, createTextVNode as N, withDirectives as re, vModelSelect as ot, vModelText as Fe, onBeforeUnmount as At, customRef as Dt, mergeProps as ke, toHandlers as Ce, vShow as ge, isRef as It, Teleport as Ft, normalizeStyle as Ee, normalizeProps as Lt, TransitionGroup as Vt, onUpdated as Rt, mergeModels as Bt, useModel as it, resolveComponent as Ht, provide as qt, Transition as Nt } from "vue";
import { useStore as W } from "@nanostores/vue";
import Ut from "mitt";
import { persistentAtom as Pt } from "@nanostores/persistent";
import { atom as pe, computed as qe } from "nanostores";
import Ot from "cropperjs";
import zt from "@uppy/core";
import Kt from "@uppy/xhr-upload";
import jt from "@viselect/vanilla";
import Gt from "vanilla-lazyload";
import { OverlayScrollbars as Ze } from "overlayscrollbars";
const je = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
class Yt {
  config;
  constructor(e) {
    this.config = Object.assign({
      baseUrl: "",
      headers: {},
      params: {},
      body: {},
      xsrfHeaderName: "X-CSRF-Token",
      fetchParams: {}
    }, e);
  }
  customFetch = async (...e) => {
    let [o, l] = e;
    this.config.fetchRequestInterceptor && (l = this.config.fetchRequestInterceptor(l));
    let r = await fetch(o, l);
    return this.config.fetchResponseInterceptor && (r = await this.config.fetchResponseInterceptor(r)), r;
  };
  transformRequestParams(e) {
    const o = this.config, l = {};
    je != null && je !== "" && o.xsrfHeaderName && (l[o.xsrfHeaderName] = je);
    const r = Object.assign({}, o.headers, l, e.headers), v = Object.assign({}, o.params, e.params), m = o.baseUrl + e.url, _ = e.method;
    let u;
    if (_ !== "get")
      if (e.body instanceof FormData) {
        const d = e.body;
        o.body != null && Object.entries(this.config.body).forEach(([c, p]) => {
          d.append(c, String(p));
        }), u = d;
      } else {
        const d = Object.assign({}, e.body ?? {});
        o.body != null && Object.assign(d, this.config.body), u = d;
      }
    const i = { url: m, method: _, headers: r, params: v, body: u };
    if (o.transformRequest != null) {
      const d = o.transformRequest({ url: m, method: _, headers: r, params: v, body: u ?? null });
      d.url != null && (i.url = d.url), d.method != null && (i.method = d.method), d.params != null && (i.params = d.params), d.headers != null && (i.headers = d.headers), d.body != null && (i.body = d.body);
    }
    return i;
  }
  getDownloadUrl(e, o) {
    if (o.url != null) return o.url;
    const l = this.transformRequestParams({ url: "", method: "get", params: { q: "download", storage: e, path: o.path } });
    return l.url + "?" + new URLSearchParams(l.params).toString();
  }
  getPreviewUrl(e, o) {
    if (o.url != null) return o.url;
    const l = this.transformRequestParams({ url: "", method: "get", params: { q: "preview", storage: e, path: o.path } });
    return l.url + "?" + new URLSearchParams(l.params).toString();
  }
  async send(e) {
    const o = this.transformRequestParams(e), l = e.responseType || "json", r = { method: e.method, headers: o.headers, signal: e.abortSignal }, v = o.url + "?" + new URLSearchParams(o.params);
    if (o.method !== "get" && o.body != null) {
      let _;
      o.body instanceof FormData ? _ = e.body : (_ = JSON.stringify(o.body), r.headers["Content-Type"] = "application/json"), r.body = _;
    }
    this.config.fetchParams && Object.assign(r, this.config.fetchParams);
    const m = await this.customFetch(v, r);
    if (m.ok) return await m[l]();
    throw await m.json();
  }
}
function Wt(n) {
  const e = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof n == "string" ? Object.assign(e, { baseUrl: n }) : Object.assign(e, n), new Yt(e);
}
function Qt(n) {
  let e = localStorage.getItem(n + "_storage");
  const o = Ue(JSON.parse(e ?? "{}"));
  de(o, l);
  function l() {
    Object.keys(o).length ? localStorage.setItem(n + "_storage", JSON.stringify(o)) : localStorage.removeItem(n + "_storage");
  }
  function r(u, i) {
    o[u] = i;
  }
  function v(u) {
    delete o[u];
  }
  function m() {
    Object.keys(o).forEach((u) => v(u));
  }
  return { getStore: (u, i = null) => u in o ? o[u] : i, setStore: r, removeStore: v, clearStore: m };
}
async function Xt(n, e) {
  const o = e[n];
  return typeof o == "function" ? (await o()).default : o;
}
function Jt(n, e, o, l) {
  const { getStore: r, setStore: v } = n, m = y({}), _ = y(r("locale", e)), u = (c, p = e) => {
    Xt(c, l).then((g) => {
      m.value = g, v("locale", c), _.value = c, v("translations", g), Object.values(l).length > 1 && (o.emit("vf-toast-push", { label: "The language is set to " + c }), o.emit("vf-language-saved"));
    }).catch(() => {
      p ? (o.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), u(p, null)) : o.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  de(_, (c) => {
    u(c);
  }), !r("locale") && !Object.keys(l).length ? u(e) : m.value = r("translations");
  const i = (c, ...p) => p.length ? i(c = c.replace("%s", String(p.shift())), ...p) : c;
  function d(c, ...p) {
    return m.value && Object.prototype.hasOwnProperty.call(m.value, c) ? i(m.value[c] || c, ...p) : i(c, ...p);
  }
  return Ue({ t: d, locale: _ });
}
const ee = {
  EDIT: "edit",
  NEW_FILE: "newfile",
  NEW_FOLDER: "newfolder",
  PREVIEW: "preview",
  ARCHIVE: "archive",
  UNARCHIVE: "unarchive",
  SEARCH: "search",
  RENAME: "rename",
  UPLOAD: "upload",
  DELETE: "delete",
  FULL_SCREEN: "fullscreen",
  DOWNLOAD: "download",
  LANGUAGE: "language"
}, Zt = Object.values(ee), en = "3.0.0-dev";
function dt(n, e, o, l, r) {
  return e = Math, o = e.log, l = 1024, r = o(n) / o(l) | 0, (n / e.pow(l, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "iB" : "B");
}
function ct(n, e, o, l, r) {
  return e = Math, o = e.log, l = 1e3, r = o(n) / o(l) | 0, (n / e.pow(l, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "B" : "B");
}
function tn(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!l) return 0;
  const r = parseFloat(l[1] || "0"), v = (l[2] || "").toLowerCase(), m = e[v] ?? 0;
  return Math.round(r * Math.pow(1024, m));
}
const $e = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function nn(n, e) {
  const o = y($e.SYSTEM), l = y($e.LIGHT);
  o.value = n.getStore("theme", e ?? $e.SYSTEM);
  const r = window.matchMedia("(prefers-color-scheme: dark)"), v = (m) => {
    o.value === $e.DARK || o.value === $e.SYSTEM && m.matches ? l.value = $e.DARK : l.value = $e.LIGHT;
  };
  return v(r), r.addEventListener("change", v), {
    value: o,
    actualValue: l,
    set(m) {
      o.value = m, m !== $e.SYSTEM ? n.setStore("theme", m) : n.removeStore("theme"), v(r);
    }
  };
}
function on() {
  const n = at(null), e = y(!1), o = y();
  return { visible: e, type: n, data: o, open: (v, m = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, n.value = v, o.value = m;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, n.value = null;
  } };
}
const Ge = {
  view: "grid",
  fullScreen: !1,
  showTreeView: !1,
  compactListView: !0,
  metricUnits: !1,
  showThumbnails: !0,
  persist: !1,
  path: "",
  loadingIndicator: "circular",
  maxFileSize: null,
  pinnedFolders: [],
  customIcon: void 0,
  selectButton: !1
}, sn = (n) => {
  const e = `vuefinder_config_${n}`, o = Pt(e, Ge, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), l = (i = {}) => {
    const d = o.get(), c = { ...Ge, ...i, ...d };
    o.set(c);
  }, r = (i) => o.get()[i], v = () => o.get(), m = (i, d) => {
    const c = o.get();
    typeof i == "object" && i !== null ? o.set({ ...c, ...i }) : o.set({ ...c, [i]: d });
  };
  return {
    // Store atom
    state: o,
    // Methods
    init: l,
    get: r,
    set: m,
    toggle: (i) => {
      const d = o.get();
      m(i, !d[i]);
    },
    all: v,
    reset: () => {
      o.set({ ...Ge });
    }
  };
};
function rn(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const o = Number(n) || 0, l = Number(e) || 0;
  return o === l ? 0 : o < l ? -1 : 1;
}
const ln = () => {
  const n = pe(""), e = pe([]), o = pe([]), l = pe({ active: !1, column: "", order: "" }), r = pe(/* @__PURE__ */ new Set()), v = pe({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), m = pe(null), _ = pe(0), u = pe(!1), i = qe([n], (w) => {
    const b = (w || "local://").trim(), V = b.indexOf("://"), J = V >= 0 ? b.slice(0, V) : "", he = (V >= 0 ? b.slice(V + 3) : b).split("/").filter(Boolean);
    let _e = "";
    const Me = he.map((Te) => (_e = _e ? `${_e}/${Te}` : Te, { basename: Te, name: Te, path: J ? `${J}://${_e}` : _e, type: "dir" }));
    return { storage: J, breadcrumb: Me, path: b };
  }), d = qe([o, l], (w, b) => {
    const { active: V, column: J, order: ye } = b;
    if (!V || !J) return w;
    const he = ye === "asc" ? 1 : -1;
    return w.slice().sort((_e, Me) => rn(_e[J], Me[J]) * he);
  }), c = qe([o, r], (w, b) => b.size === 0 ? [] : w.filter((V) => b.has(V.path)));
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: n,
    sort: l,
    selectedKeys: r,
    selectedCount: _,
    loading: u,
    draggedItem: m,
    clipboardItems: v,
    // Computed values
    path: i,
    sortedFiles: d,
    selectedItems: c,
    // Actions
    setPath: (w) => {
      n.set(w);
    },
    setFiles: (w) => {
      o.set(w ?? []);
    },
    setStorages: (w) => {
      e.set(w ?? []);
    },
    setSort: (w, b) => {
      l.set({ active: !0, column: w, order: b });
    },
    toggleSort: (w) => {
      const b = l.get();
      b.active && b.column === w ? l.set({
        active: b.order === "asc",
        column: w,
        order: "desc"
      }) : l.set({
        active: !0,
        column: w,
        order: "asc"
      });
    },
    clearSort: () => {
      l.set({ active: !1, column: "", order: "" });
    },
    select: (w) => {
      const b = new Set(r.get());
      b.add(w), r.set(b), _.set(b.size);
    },
    deselect: (w) => {
      const b = new Set(r.get());
      b.delete(w), r.set(b), _.set(b.size);
    },
    toggleSelect: (w) => {
      const b = new Set(r.get());
      b.has(w) ? b.delete(w) : b.add(w), r.set(b), _.set(b.size);
    },
    selectAll: () => {
      const w = new Set(o.get().map((b) => b.path));
      r.set(w), _.set(w.size);
    },
    clearSelection: () => {
      r.set(/* @__PURE__ */ new Set()), _.set(0);
    },
    setSelection: (w) => {
      const b = new Set(w ?? []);
      r.set(b), _.set(b.size);
    },
    setSelectedCount: (w) => {
      _.set(w);
    },
    setLoading: (w) => {
      u.set(!!w);
    },
    isLoading: () => u.get(),
    setClipboard: (w, b) => {
      const V = o.get().filter((J) => b.has(J.path));
      v.set({
        type: w,
        path: i.get().path,
        items: new Set(V)
      });
    },
    isCut: (w) => {
      const b = v.get();
      return b.type === "cut" && Array.from(b.items).some((V) => V.path === w);
    },
    isCopied: (w) => {
      const b = v.get();
      return b.type === "copy" && Array.from(b.items).some((V) => V.path === w);
    },
    clearClipboard: () => {
      v.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
    },
    getClipboard: () => v.get(),
    setDraggedItem: (w) => {
      m.set(w);
    },
    getDraggedItem: () => m.get(),
    clearDraggedItem: () => {
      m.set(null);
    }
  };
}, st = {
  query: "",
  searchMode: !1
}, an = () => {
  const n = pe(st), e = qe(n, (i) => i.query.length > 0);
  return {
    // Store atom
    state: n,
    // Computed values
    hasQuery: e,
    // Methods
    setQuery: (i) => {
      const d = n.get();
      n.set({ ...d, query: i ?? "" });
    },
    enterSearchMode: () => {
      const i = n.get();
      n.set({ ...i, searchMode: !0 });
    },
    exitSearchMode: () => {
      n.set({ query: "", searchMode: !1 });
    },
    get: (i) => n.get()[i],
    set: (i, d) => {
      const c = n.get();
      typeof i == "object" && i !== null ? n.set({ ...c, ...i }) : n.set({ ...c, [i]: d });
    },
    all: () => n.get(),
    reset: () => {
      n.set({ ...st });
    }
  };
}, dn = (n, e) => {
  const o = Qt(n.id), l = Ut(), r = nn(o, n.theme), v = e.i18n, m = n.locale ?? e.locale, _ = sn(n.id), u = ln(), i = an(), d = (c) => Array.isArray(c) ? c : Zt;
  return Ue({
    // app version
    version: en,
    // config store
    config: _,
    // files store
    fs: u,
    // search store
    search: i,
    // root element
    root: De("root"),
    // app id
    debug: n.debug,
    // Event Bus
    emitter: l,
    // storage
    storage: o,
    // localization object
    i18n: Jt(o, m, l, v),
    // modal state
    modal: on(),
    // http object
    requester: Wt(n.request),
    // active features
    features: d(n.features),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // theme state
    theme: r,
    // human readable file sizes
    filesize: _.get("metricUnits") ? ct : dt,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // custom icon
    customIcon: n.icon,
    // selectButton state
    selectButton: n.selectButton
  });
}, cn = { class: "vuefinder__modal-layout__container" }, un = { class: "vuefinder__modal-layout__content" }, vn = { class: "vuefinder__modal-layout__footer" }, we = /* @__PURE__ */ K({
  __name: "ModalLayout",
  setup(n) {
    const e = y(null), o = j("ServiceContainer");
    return ce(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Ve(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const r = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: r,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (l, r) => (a(), f("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: r[1] || (r[1] = Ie((v) => t(o).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      r[2] || (r[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", cn, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: r[0] || (r[0] = xe((v) => t(o).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", un, [
              Ne(l.$slots, "default")
            ]),
            s("div", vn, [
              Ne(l.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}), _n = { class: "vuefinder__modal-header" }, mn = { class: "vuefinder__modal-header__icon-container" }, fn = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Se = /* @__PURE__ */ K({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, o) => (a(), f("div", _n, [
      s("div", mn, [
        (a(), I(Je(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("h3", fn, h(n.title), 1)
    ]));
  }
}), hn = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: o }) {
    const l = j("ServiceContainer"), r = y(!1), { t: v } = l.i18n;
    let m = null;
    const _ = () => {
      clearTimeout(m), r.value = !0, m = setTimeout(() => {
        r.value = !1;
      }, 2e3);
    };
    return ce(() => {
      l.emitter.on(n.on, _);
    }), Re(() => {
      clearTimeout(m);
    }), {
      shown: r,
      t: v
    };
  }
}, pn = (n, e) => {
  const o = n.__vccOpts || n;
  for (const [l, r] of e)
    o[l] = r;
  return o;
}, gn = { key: 1 };
function wn(n, e, o, l, r, v) {
  return a(), f("div", {
    class: Q(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    n.$slots.default ? Ne(n.$slots, "default", { key: 0 }) : (a(), f("span", gn, h(l.t("Saved.")), 1))
  ], 2);
}
const Ae = /* @__PURE__ */ pn(hn, [["render", wn]]), bn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function yn(n, e) {
  return a(), f("svg", bn, [...e[0] || (e[0] = [
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
const kn = { render: yn }, xn = { class: "vuefinder__about-modal__content" }, Sn = { class: "vuefinder__about-modal__main" }, $n = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Cn = ["onClick", "aria-current"], En = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Mn = { class: "vuefinder__about-modal__description" }, Tn = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, An = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Dn = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, In = { class: "vuefinder__about-modal__description" }, Fn = { class: "vuefinder__about-modal__settings" }, Ln = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Vn = { class: "vuefinder__about-modal__setting-input" }, Rn = ["checked"], Bn = { class: "vuefinder__about-modal__setting-label" }, Hn = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, qn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Nn = { class: "vuefinder__about-modal__setting-input" }, Un = ["checked"], Pn = { class: "vuefinder__about-modal__setting-label" }, On = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, zn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Kn = { class: "vuefinder__about-modal__setting-input" }, jn = ["checked"], Gn = { class: "vuefinder__about-modal__setting-label" }, Yn = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Wn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Qn = { class: "vuefinder__about-modal__setting-input" }, Xn = ["checked"], Jn = { class: "vuefinder__about-modal__setting-label" }, Zn = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, eo = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, to = { class: "vuefinder__about-modal__setting-input" }, no = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, oo = { class: "vuefinder__about-modal__setting-label" }, so = ["label"], ro = ["value"], lo = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, ao = { class: "vuefinder__about-modal__setting-input" }, io = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, co = { class: "vuefinder__about-modal__setting-label" }, uo = ["label"], vo = ["value"], _o = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, mo = { class: "vuefinder__about-modal__shortcuts" }, fo = { class: "vuefinder__about-modal__shortcut" }, ho = { class: "vuefinder__about-modal__shortcut" }, po = { class: "vuefinder__about-modal__shortcut" }, go = { class: "vuefinder__about-modal__shortcut" }, wo = { class: "vuefinder__about-modal__shortcut" }, bo = { class: "vuefinder__about-modal__shortcut" }, yo = { class: "vuefinder__about-modal__shortcut" }, ko = { class: "vuefinder__about-modal__shortcut" }, xo = { class: "vuefinder__about-modal__shortcut" }, So = { class: "vuefinder__about-modal__shortcut" }, $o = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Co = { class: "vuefinder__about-modal__description" }, ut = /* @__PURE__ */ K({
  __name: "ModalAbout",
  setup(n) {
    const e = j("ServiceContainer"), o = e.config, { clearStore: l } = e.storage, { t: r } = e.i18n, v = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, m = ne(() => [
      { name: r("About"), key: v.ABOUT, current: !1 },
      { name: r("Settings"), key: v.SETTINGS, current: !1 },
      { name: r("Shortcuts"), key: v.SHORTCUTS, current: !1 },
      { name: r("Reset"), key: v.RESET, current: !1 }
    ]), _ = y("about"), u = async () => {
      o.reset(), l(), location.reload();
    }, i = (E) => {
      e.theme.set(E), e.emitter.emit("vf-theme-saved");
    }, d = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? ct : dt, e.emitter.emit("vf-metric-units-saved");
    }, c = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      o.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, g = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: T } = j("VueFinderOptions"), $ = Object.fromEntries(
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
      }).filter(([E]) => Object.keys(T).includes(E))
    ), x = ne(() => ({
      system: r("System"),
      light: r("Light"),
      dark: r("Dark")
    }));
    return (E, F) => (a(), I(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: F[3] || (F[3] = (U) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(r)("Close")), 1)
      ]),
      default: z(() => [
        s("div", xn, [
          D(Se, {
            icon: t(kn),
            title: "Vuefinder " + t(e).version
          }, null, 8, ["icon", "title"]),
          s("div", Sn, [
            s("div", null, [
              s("div", null, [
                s("nav", $n, [
                  (a(!0), f(te, null, oe(m.value, (U) => (a(), f("button", {
                    key: U.name,
                    onClick: (X) => _.value = U.key,
                    class: Q([U.key === _.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": U.current ? "page" : void 0
                  }, h(U.name), 11, Cn))), 128))
                ])
              ])
            ]),
            _.value === v.ABOUT ? (a(), f("div", En, [
              s("div", Mn, h(t(r)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              s("a", Tn, h(t(r)("Project home")), 1),
              s("a", An, h(t(r)("Follow on GitHub")), 1)
            ])) : M("", !0),
            _.value === v.SETTINGS ? (a(), f("div", Dn, [
              s("div", In, h(t(r)("Customize your experience with the following settings")), 1),
              s("div", Fn, [
                s("fieldset", null, [
                  s("div", Ln, [
                    s("div", Vn, [
                      s("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: t(o).get("metricUnits"),
                        onChange: d,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Rn)
                    ]),
                    s("div", Bn, [
                      s("label", Hn, [
                        N(h(t(r)("Use Metric Units")) + " ", 1),
                        D(Ae, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: z(() => [
                            N(h(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", qn, [
                    s("div", Nn, [
                      s("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: t(o).get("compactListView"),
                        onChange: c,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Un)
                    ]),
                    s("div", Pn, [
                      s("label", On, [
                        N(h(t(r)("Compact list view")) + " ", 1),
                        D(Ae, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: z(() => [
                            N(h(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", zn, [
                    s("div", Kn, [
                      s("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: t(o).get("persist"),
                        onChange: g,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, jn)
                    ]),
                    s("div", Gn, [
                      s("label", Yn, [
                        N(h(t(r)("Persist path on reload")) + " ", 1),
                        D(Ae, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: z(() => [
                            N(h(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Wn, [
                    s("div", Qn, [
                      s("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: t(o).get("showThumbnails"),
                        onChange: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Xn)
                    ]),
                    s("div", Jn, [
                      s("label", Zn, [
                        N(h(t(r)("Show thumbnails")) + " ", 1),
                        D(Ae, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: z(() => [
                            N(h(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", eo, [
                    s("div", to, [
                      s("label", no, h(t(r)("Theme")), 1)
                    ]),
                    s("div", oo, [
                      re(s("select", {
                        id: "theme",
                        "onUpdate:modelValue": F[0] || (F[0] = (U) => t(e).theme.value = U),
                        onChange: F[1] || (F[1] = (U) => i(U.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Theme")
                        }, [
                          (a(!0), f(te, null, oe(x.value, (U, X) => (a(), f("option", { value: X }, h(U), 9, ro))), 256))
                        ], 8, so)
                      ], 544), [
                        [ot, t(e).theme.value]
                      ]),
                      D(Ae, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: z(() => [
                          N(h(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t(e).features.includes(t(ee).LANGUAGE) && Object.keys(t($)).length > 1 ? (a(), f("div", lo, [
                    s("div", ao, [
                      s("label", io, h(t(r)("Language")), 1)
                    ]),
                    s("div", co, [
                      re(s("select", {
                        id: "language",
                        "onUpdate:modelValue": F[2] || (F[2] = (U) => t(e).i18n.locale = U),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Language")
                        }, [
                          (a(!0), f(te, null, oe(t($), (U, X) => (a(), f("option", { value: X }, h(U), 9, vo))), 256))
                        ], 8, uo)
                      ], 512), [
                        [ot, t(e).i18n.locale]
                      ]),
                      D(Ae, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: z(() => [
                          N(h(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : M("", !0)
                ])
              ])
            ])) : M("", !0),
            _.value === v.SHORTCUTS ? (a(), f("div", _o, [
              s("div", mo, [
                s("div", fo, [
                  s("div", null, h(t(r)("Rename")), 1),
                  F[4] || (F[4] = s("kbd", null, "F2", -1))
                ]),
                s("div", ho, [
                  s("div", null, h(t(r)("Refresh")), 1),
                  F[5] || (F[5] = s("kbd", null, "F5", -1))
                ]),
                s("div", po, [
                  N(h(t(r)("Delete")) + " ", 1),
                  F[6] || (F[6] = s("kbd", null, "Del", -1))
                ]),
                s("div", go, [
                  N(h(t(r)("Escape")) + " ", 1),
                  F[7] || (F[7] = s("div", null, [
                    s("kbd", null, "Esc")
                  ], -1))
                ]),
                s("div", wo, [
                  N(h(t(r)("Select All")) + " ", 1),
                  F[8] || (F[8] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "A")
                  ], -1))
                ]),
                s("div", bo, [
                  N(h(t(r)("Search")) + " ", 1),
                  F[9] || (F[9] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "F")
                  ], -1))
                ]),
                s("div", yo, [
                  N(h(t(r)("Toggle Sidebar")) + " ", 1),
                  F[10] || (F[10] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "E")
                  ], -1))
                ]),
                s("div", ko, [
                  N(h(t(r)("Open Settings")) + " ", 1),
                  F[11] || (F[11] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, ",")
                  ], -1))
                ]),
                s("div", xo, [
                  N(h(t(r)("Toggle Full Screen")) + " ", 1),
                  F[12] || (F[12] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "Enter")
                  ], -1))
                ]),
                s("div", So, [
                  N(h(t(r)("Preview")) + " ", 1),
                  F[13] || (F[13] = s("div", null, [
                    s("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : M("", !0),
            _.value === v.RESET ? (a(), f("div", $o, [
              s("div", Co, h(t(r)("Reset all settings to default")), 1),
              s("button", {
                onClick: u,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, h(t(r)("Reset Settings")), 1)
            ])) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Eo = ["title"], be = /* @__PURE__ */ K({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const o = e, l = j("ServiceContainer"), { t: r } = l.i18n, v = y(!1), m = y(null), _ = y(m.value?.innerHTML);
    de(_, () => v.value = !1);
    const u = () => {
      o("hidden"), v.value = !0;
    };
    return (i, d) => (a(), f("div", null, [
      v.value ? M("", !0) : (a(), f("div", {
        key: 0,
        ref_key: "strMessage",
        ref: m,
        class: Q(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ne(i.$slots, "default"),
        s("div", {
          class: "vuefinder__message__close",
          onClick: u,
          title: t(r)("Close")
        }, [...d[0] || (d[0] = [
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
        ])], 8, Eo)
      ], 2))
    ]));
  }
}), Mo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function To(n, e) {
  return a(), f("svg", Mo, [...e[0] || (e[0] = [
    s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const vt = { render: To }, Ao = { class: "vuefinder__delete-modal__content" }, Do = { class: "vuefinder__delete-modal__form" }, Io = { class: "vuefinder__delete-modal__description" }, Fo = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Lo = { class: "vuefinder__delete-modal__file" }, Vo = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ro = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bo = { class: "vuefinder__delete-modal__file-name" }, Ho = { class: "vuefinder__delete-modal__warning" }, et = /* @__PURE__ */ K({
  __name: "ModalDelete",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = y(e.modal.data.items), v = y(""), m = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: l.path.storage,
          path: l.path.path
        },
        body: {
          items: r.value.map(({ path: _, type: u }) => ({ path: _, type: u }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("Files deleted.") });
        },
        onError: (_) => {
          v.value = o(_.message);
        }
      });
    };
    return (_, u) => (a(), I(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-danger"
        }, h(t(o)("Yes, Delete!")), 1),
        s("button", {
          type: "button",
          onClick: u[1] || (u[1] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1),
        s("div", Ho, h(t(o)("This action cannot be undone.")), 1)
      ]),
      default: z(() => [
        s("div", null, [
          D(Se, {
            icon: t(vt),
            title: t(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", Ao, [
            s("div", Do, [
              s("p", Io, h(t(o)("Are you sure you want to delete these files?")), 1),
              s("div", Fo, [
                (a(!0), f(te, null, oe(r.value, (i) => (a(), f("p", Lo, [
                  i.type === "dir" ? (a(), f("svg", Vo, [...u[2] || (u[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), f("svg", Ro, [...u[3] || (u[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", Bo, h(i.basename), 1)
                ]))), 256))
              ]),
              v.value.length ? (a(), I(be, {
                key: 0,
                onHidden: u[0] || (u[0] = (i) => v.value = ""),
                error: ""
              }, {
                default: z(() => [
                  N(h(v.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), qo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function No(n, e) {
  return a(), f("svg", qo, [...e[0] || (e[0] = [
    s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const _t = { render: No }, Uo = { class: "vuefinder__rename-modal__content" }, Po = { class: "vuefinder__rename-modal__item" }, Oo = { class: "vuefinder__rename-modal__item-info" }, zo = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ko = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jo = { class: "vuefinder__rename-modal__item-name" }, tt = /* @__PURE__ */ K({
  __name: "ModalRename",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = y(e.modal.data.items[0]), v = y(e.modal.data.items[0].basename), m = y(""), _ = () => {
      v.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          storage: l.path.storage,
          path: l.path.path
        },
        body: {
          item: r.value.path,
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("%s is renamed.", v.value) });
        },
        onError: (u) => {
          m.value = o(u.message);
        }
      });
    };
    return (u, i) => (a(), I(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: _,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Rename")), 1),
        s("button", {
          type: "button",
          onClick: i[2] || (i[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1)
      ]),
      default: z(() => [
        s("div", null, [
          D(Se, {
            icon: t(_t),
            title: t(o)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", Uo, [
            s("div", Po, [
              s("p", Oo, [
                r.value.type === "dir" ? (a(), f("svg", zo, [...i[3] || (i[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (a(), f("svg", Ko, [...i[4] || (i[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", jo, h(r.value.basename), 1)
              ]),
              re(s("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (d) => v.value = d),
                onKeyup: Ie(_, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Fe, v.value]
              ]),
              m.value.length ? (a(), I(be, {
                key: 0,
                onHidden: i[1] || (i[1] = (d) => m.value = ""),
                error: ""
              }, {
                default: z(() => [
                  N(h(m.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Go = { class: "vuefinder__text-preview" }, Yo = { class: "vuefinder__text-preview__header" }, Wo = ["title"], Qo = { class: "vuefinder__text-preview__actions" }, Xo = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Jo = { key: 1 }, Zo = /* @__PURE__ */ K({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = y(""), r = y(""), v = y(null), m = y(!1), _ = y(""), u = y(!1), i = j("ServiceContainer"), { t: d } = i.i18n;
    ce(() => {
      i.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", storage: i.modal.data.storage, path: i.modal.data.item.path },
        responseType: "text"
      }).then((g) => {
        l.value = g, o("success");
      });
    });
    const c = () => {
      m.value = !m.value, r.value = l.value;
    }, p = () => {
      _.value = "", u.value = !1, i.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          storage: i.modal.data.storage,
          path: i.modal.data.item.path
        },
        body: {
          content: r.value
        },
        responseType: "text"
      }).then((g) => {
        _.value = d("Updated."), l.value = g, o("success"), m.value = !m.value;
      }).catch((g) => {
        _.value = d(g.message), u.value = !0;
      });
    };
    return (g, T) => (a(), f("div", Go, [
      s("div", Yo, [
        s("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(i).modal.data.item.path
        }, h(t(i).modal.data.item.basename), 9, Wo),
        s("div", Qo, [
          m.value ? (a(), f("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, h(t(d)("Save")), 1)) : M("", !0),
          t(i).features.includes(t(ee).EDIT) ? (a(), f("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: T[0] || (T[0] = (S) => c())
          }, h(m.value ? t(d)("Cancel") : t(d)("Edit")), 1)) : M("", !0)
        ])
      ]),
      s("div", null, [
        m.value ? (a(), f("div", Jo, [
          re(s("textarea", {
            ref_key: "editInput",
            ref: v,
            "onUpdate:modelValue": T[1] || (T[1] = (S) => r.value = S),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Fe, r.value]
          ])
        ])) : (a(), f("pre", Xo, h(l.value), 1)),
        _.value.length ? (a(), I(be, {
          key: 2,
          onHidden: T[2] || (T[2] = (S) => _.value = ""),
          error: u.value
        }, {
          default: z(() => [
            N(h(_.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : M("", !0)
      ])
    ]));
  }
}), es = { class: "vuefinder__image-preview" }, ts = { class: "vuefinder__image-preview__header" }, ns = ["title"], os = { class: "vuefinder__image-preview__actions" }, ss = { class: "vuefinder__image-preview__image-container" }, rs = ["src"], ls = /* @__PURE__ */ K({
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = j("ServiceContainer"), { t: r } = l.i18n, v = y(null), m = y(null), _ = y(!1), u = y(""), i = y(!1), d = () => {
      _.value = !_.value, _.value && v.value ? m.value = new Ot(v.value, {
        crop(p) {
        }
      }) : m.value && m.value.destroy();
    }, c = () => {
      m.value && m.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          u.value = "", i.value = !1;
          const g = new FormData();
          g.set("file", p), l.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              storage: l.modal.data.storage,
              path: l.modal.data.item.path
            },
            body: g
          }).then((T) => {
            u.value = r("Updated."), v.value && (v.value.src = l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item)), d(), o("success");
          }).catch((T) => {
            u.value = r(T.message), i.value = !0;
          });
        }
      );
    };
    return ce(() => {
      o("success");
    }), (p, g) => (a(), f("div", es, [
      s("div", ts, [
        s("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, h(t(l).modal.data.item.basename), 9, ns),
        s("div", os, [
          _.value ? (a(), f("button", {
            key: 0,
            onClick: c,
            class: "vuefinder__image-preview__crop-button"
          }, h(t(r)("Crop")), 1)) : M("", !0),
          t(l).features.includes(t(ee).EDIT) ? (a(), f("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: g[0] || (g[0] = (T) => d())
          }, h(_.value ? t(r)("Cancel") : t(r)("Edit")), 1)) : M("", !0)
        ])
      ]),
      s("div", ss, [
        s("img", {
          ref_key: "image",
          ref: v,
          class: "vuefinder__image-preview__image",
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          alt: ""
        }, null, 8, rs)
      ]),
      u.value.length ? (a(), I(be, {
        key: 0,
        onHidden: g[1] || (g[1] = (T) => u.value = ""),
        error: i.value
      }, {
        default: z(() => [
          N(h(u.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : M("", !0)
    ]));
  }
}), as = { class: "vuefinder__default-preview" }, is = { class: "vuefinder__default-preview__header" }, ds = ["title"], cs = /* @__PURE__ */ K({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = j("ServiceContainer"), l = e;
    return ce(() => {
      l("success");
    }), (r, v) => (a(), f("div", as, [
      s("div", is, [
        s("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: t(o).modal.data.item.path
        }, h(t(o).modal.data.item.basename), 9, ds)
      ]),
      v[0] || (v[0] = s("div", null, null, -1))
    ]));
  }
}), us = { class: "vuefinder__video-preview" }, vs = ["title"], _s = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, ms = ["src"], fs = /* @__PURE__ */ K({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = j("ServiceContainer"), l = e, r = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ce(() => {
      l("success");
    }), (v, m) => (a(), f("div", us, [
      s("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, h(t(o).modal.data.item.basename), 9, vs),
      s("div", null, [
        s("video", _s, [
          s("source", {
            src: r(),
            type: "video/mp4"
          }, null, 8, ms),
          m[0] || (m[0] = N(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), hs = { class: "vuefinder__audio-preview" }, ps = ["title"], gs = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, ws = ["src"], bs = /* @__PURE__ */ K({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = j("ServiceContainer"), r = () => l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item);
    return ce(() => {
      o("success");
    }), (v, m) => (a(), f("div", hs, [
      s("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: t(l).modal.data.item.path
      }, h(t(l).modal.data.item.basename), 9, ps),
      s("div", null, [
        s("audio", gs, [
          s("source", {
            src: r(),
            type: "audio/mpeg"
          }, null, 8, ws),
          m[0] || (m[0] = N(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), ys = { class: "vuefinder__pdf-preview" }, ks = ["title"], xs = ["data"], Ss = ["src"], $s = /* @__PURE__ */ K({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = j("ServiceContainer"), l = e, r = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ce(() => {
      l("success");
    }), (v, m) => (a(), f("div", ys, [
      s("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, h(t(o).modal.data.item.basename), 9, ks),
      s("div", null, [
        s("object", {
          class: "vuefinder__pdf-preview__object",
          data: r(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          s("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: r(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Ss)
        ], 8, xs)
      ])
    ]));
  }
});
function Cs(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Es = { class: "vuefinder__preview-modal__content" }, Ms = { key: 0 }, Ts = { class: "vuefinder__preview-modal__loading" }, As = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Ds = { class: "vuefinder__preview-modal__details" }, Is = { class: "font-bold" }, Fs = { class: "font-bold pl-2" }, Ls = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Vs = ["download", "href"], mt = /* @__PURE__ */ K({
  __name: "ModalPreview",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = y(!1), r = (m) => (e.modal.data.item.mime_type ?? "").startsWith(m), v = e.features.includes(ee.PREVIEW);
    return v || (l.value = !0), (m, _) => (a(), I(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: _[6] || (_[6] = (u) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Close")), 1),
        t(e).features.includes(t(ee).DOWNLOAD) ? (a(), f("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item),
          href: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item)
        }, h(t(o)("Download")), 9, Vs)) : M("", !0)
      ]),
      default: z(() => [
        s("div", null, [
          s("div", Es, [
            t(v) ? (a(), f("div", Ms, [
              r("text") ? (a(), I(Zo, {
                key: 0,
                onSuccess: _[0] || (_[0] = (u) => l.value = !0)
              })) : r("image") ? (a(), I(ls, {
                key: 1,
                onSuccess: _[1] || (_[1] = (u) => l.value = !0)
              })) : r("video") ? (a(), I(fs, {
                key: 2,
                onSuccess: _[2] || (_[2] = (u) => l.value = !0)
              })) : r("audio") ? (a(), I(bs, {
                key: 3,
                onSuccess: _[3] || (_[3] = (u) => l.value = !0)
              })) : r("application/pdf") ? (a(), I($s, {
                key: 4,
                onSuccess: _[4] || (_[4] = (u) => l.value = !0)
              })) : (a(), I(cs, {
                key: 5,
                onSuccess: _[5] || (_[5] = (u) => l.value = !0)
              }))
            ])) : M("", !0),
            s("div", Ts, [
              l.value === !1 ? (a(), f("div", As, [
                _[7] || (_[7] = s("svg", {
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
                s("span", null, h(t(o)("Loading")), 1)
              ])) : M("", !0)
            ])
          ])
        ]),
        s("div", Ds, [
          s("div", null, [
            s("span", Is, h(t(o)("File Size")) + ": ", 1),
            N(h(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", Fs, h(t(o)("Last Modified")) + ": ", 1),
            N(" " + h(t(Cs)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(ee).DOWNLOAD) ? (a(), f("div", Ls, [
          s("span", null, h(t(o)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : M("", !0)
      ]),
      _: 1
    }));
  }
}), Rs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Bs(n, e) {
  return a(), f("svg", Rs, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Hs = { render: Bs }, qs = { class: "vuefinder__move-modal__content" }, Ns = { class: "vuefinder__move-modal__description" }, Us = { class: "vuefinder__move-modal__files vf-scrollbar" }, Ps = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Os = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zs = { class: "vuefinder__move-modal__file-name" }, Ks = { class: "vuefinder__move-modal__target-title" }, js = { class: "vuefinder__move-modal__target-directory" }, Gs = { class: "vuefinder__move-modal__target-path" }, Ys = { class: "vuefinder__move-modal__selected-items" }, Ws = /* @__PURE__ */ K({
  __name: "ModalTransfer",
  props: {
    q: {},
    title: {},
    body: {},
    successBtn: {},
    successText: {}
  },
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = n, v = y(e.modal.data.items.from), m = e.modal.data.items.to, _ = y(""), u = () => {
      v.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: r.q,
          m: "post",
          storage: l.path.get().storage,
          path: l.path.get().path
        },
        body: {
          items: v.value.map(({ path: i, type: d }) => ({ path: i, type: d })),
          item: m.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: r.successText });
        },
        onError: (i) => {
          _.value = o(i.message);
        }
      });
    };
    return (i, d) => (a(), I(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, h(r.successBtn), 1),
        s("button", {
          type: "button",
          onClick: d[1] || (d[1] = (c) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1),
        s("div", Ys, h(t(o)("%s item(s) selected.", v.value.length)), 1)
      ]),
      default: z(() => [
        s("div", null, [
          D(Se, {
            icon: t(Hs),
            title: r.title
          }, null, 8, ["icon", "title"]),
          s("div", qs, [
            s("p", Ns, h(r.body), 1),
            s("div", Us, [
              (a(!0), f(te, null, oe(v.value, (c) => (a(), f("div", {
                class: "vuefinder__move-modal__file",
                key: c.path
              }, [
                s("div", null, [
                  c.type === "dir" ? (a(), f("svg", Ps, [...d[2] || (d[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), f("svg", Os, [...d[3] || (d[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", zs, h(c.path), 1)
              ]))), 128))
            ]),
            s("h4", Ks, h(t(o)("Target Directory")), 1),
            s("p", js, [
              d[4] || (d[4] = s("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "1"
              }, [
                s("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                })
              ], -1)),
              s("span", Gs, h(t(m).path), 1)
            ]),
            _.value.length ? (a(), I(be, {
              key: 0,
              onHidden: d[0] || (d[0] = (c) => _.value = ""),
              error: ""
            }, {
              default: z(() => [
                N(h(_.value), 1)
              ]),
              _: 1
            })) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Qe = /* @__PURE__ */ K({
  __name: "ModalMove",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n;
    return (l, r) => (a(), I(Ws, {
      title: t(o)("Move files"),
      body: t(o)("Are you sure you want to move these files"),
      "success-btn": t(o)("Yes, Move!"),
      "success-text": t(o)("Files moved.")
    }, null, 8, ["title", "body", "success-btn", "success-text"]));
  }
}), me = {
  ESCAPE: "Escape",
  F2: "F2",
  F5: "F5",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF",
  SPACE: "Space",
  KEY_C: "KeyC",
  KEY_X: "KeyX",
  KEY_V: "KeyV"
};
function Qs(n) {
  const e = n.search, o = n.fs, l = n.config, r = W(e.state), v = W(o.selectedItems), m = (_) => {
    if (_.code === me.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible && !r.value?.searchMode) {
      if (_.code === me.F2 && n.features.includes(ee.RENAME) && v.value.length === 1 && n.modal.open(tt, { items: v.value }), _.code === me.F5 && n.emitter.emit("vf-fetch", { params: { q: "index", storage: o.path.get().storage, path: o.path.get().path } }), _.code === me.DELETE && v.value.length === 0 && n.modal.open(et, { items: v.value }), _.ctrlKey && _.code === me.BACKSLASH && n.modal.open(ut), _.ctrlKey && _.code === me.KEY_F && n.features.includes(ee.SEARCH) && (e.enterSearchMode(), _.preventDefault()), _.ctrlKey && _.code === me.KEY_E && (l.toggle("showTreeView"), _.preventDefault()), _.ctrlKey && _.code === me.ENTER && (l.toggle("fullScreen"), n.root.focus()), _.ctrlKey && _.code === me.KEY_A && (o.selectAll(), _.preventDefault()), _.code === me.SPACE && v.value.length === 1 && v.value[0]?.type !== "dir" && n.modal.open(mt, { storage: o.path.get().storage, item: v.value[0] }), _.metaKey && _.code === me.KEY_C) {
        if (v.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("copy", new Set(v.value.map((u) => u.path))), n.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", v.value.length) }), _.preventDefault();
      }
      if (_.metaKey && _.code === me.KEY_X) {
        if (v.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("cut", new Set(v.value.map((u) => u.path))), n.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", v.value.length) }), _.preventDefault();
      }
      if (_.metaKey && _.code === me.KEY_V) {
        if (o.getClipboard().items.size === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items in clipboard") });
          return;
        }
        if (o.getClipboard().path === o.path.get().path) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("Cannot paste items to the same directory") });
          return;
        }
        if (o.getClipboard().type === "cut") {
          n.modal.open(Qe, { items: { from: o.getClipboard().items, to: o.path } }), o.clearClipboard();
          return;
        }
        if (o.getClipboard().type === "copy") {
          n.modal.open(Qe, { items: { from: o.getClipboard().items, to: o.path } });
          return;
        }
        _.preventDefault();
      }
    }
  };
  ce(() => {
    n.root.addEventListener("keydown", m);
  }), At(() => {
    n.root.removeEventListener("keydown", m);
  });
}
const Xs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Js(n, e) {
  return a(), f("svg", Xs, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ft = { render: Js }, Zs = { class: "vuefinder__new-folder-modal__content" }, er = { class: "vuefinder__new-folder-modal__form" }, tr = { class: "vuefinder__new-folder-modal__description" }, nr = ["placeholder"], ht = /* @__PURE__ */ K({
  __name: "ModalNewFolder",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = y(""), v = y(""), m = () => {
      r.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          storage: l.path.storage,
          path: l.path.path
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("%s is created.", r.value) });
        },
        onError: (_) => {
          v.value = o(_.message);
        }
      });
    };
    return (_, u) => (a(), I(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Create")), 1),
        s("button", {
          type: "button",
          onClick: u[2] || (u[2] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1)
      ]),
      default: z(() => [
        s("div", null, [
          D(Se, {
            icon: t(ft),
            title: t(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", Zs, [
            s("div", er, [
              s("p", tr, h(t(o)("Create a new folder")), 1),
              re(s("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (i) => r.value = i),
                onKeyup: Ie(m, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(o)("Folder Name"),
                type: "text"
              }, null, 40, nr), [
                [Fe, r.value]
              ]),
              v.value.length ? (a(), I(be, {
                key: 0,
                onHidden: u[1] || (u[1] = (i) => v.value = ""),
                error: ""
              }, {
                default: z(() => [
                  N(h(v.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), or = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function sr(n, e) {
  return a(), f("svg", or, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const pt = { render: sr }, rr = { class: "vuefinder__new-file-modal__content" }, lr = { class: "vuefinder__new-file-modal__form" }, ar = { class: "vuefinder__new-file-modal__description" }, ir = ["placeholder"], dr = /* @__PURE__ */ K({
  __name: "ModalNewFile",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = y(""), v = y(""), m = () => {
      r.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          storage: l.path.storage,
          path: l.path.path
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("%s is created.", r.value) });
        },
        onError: (_) => {
          v.value = o(_.message);
        }
      });
    };
    return (_, u) => (a(), I(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Create")), 1),
        s("button", {
          type: "button",
          onClick: u[2] || (u[2] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1)
      ]),
      default: z(() => [
        s("div", null, [
          D(Se, {
            icon: t(pt),
            title: t(o)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", rr, [
            s("div", lr, [
              s("p", ar, h(t(o)("Create a new file")), 1),
              re(s("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (i) => r.value = i),
                onKeyup: Ie(m, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(o)("File Name"),
                type: "text"
              }, null, 40, ir), [
                [Fe, r.value]
              ]),
              v.value.length ? (a(), I(be, {
                key: 0,
                onHidden: u[1] || (u[1] = (i) => v.value = ""),
                error: ""
              }, {
                default: z(() => [
                  N(h(v.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ie = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function cr() {
  const n = j("ServiceContainer"), { t: e } = n.i18n, o = n.fs, l = n.config, r = y({ QUEUE_ENTRY_STATUS: ie }), v = y(null), m = y(null), _ = y(null), u = y(null), i = y(null), d = y(null), c = y([]), p = y(""), g = y(!1), T = y(!1);
  let S;
  const $ = (O) => c.value.findIndex((ae) => ae.id === O), x = (O, ae) => S.addFile({ name: ae || O.name, type: O.type, data: O, source: "Local" }), E = (O) => O.status === ie.DONE ? "text-green-600" : O.status === ie.ERROR || O.status === ie.CANCELED ? "text-red-600" : "", F = (O) => O.status === ie.DONE ? "✓" : O.status === ie.ERROR || O.status === ie.CANCELED ? "!" : "...", U = () => u.value?.click(), X = () => n.modal.close(), se = () => {
    if (g.value || !c.value.filter((O) => O.status !== ie.DONE).length) {
      g.value || (p.value = e("Please select file to upload first."));
      return;
    }
    p.value = "", S.retryAll(), S.upload();
  }, B = () => {
    S.cancelAll(), c.value.forEach((O) => {
      O.status !== ie.DONE && (O.status = ie.CANCELED, O.statusName = e("Canceled"));
    }), g.value = !1;
  }, R = (O) => {
    g.value || (S.removeFile(O.id), c.value.splice($(O.id), 1));
  }, le = (O) => {
    if (!g.value)
      if (S.cancelAll(), O) {
        const ae = c.value.filter((L) => L.status !== ie.DONE);
        c.value = [], ae.forEach((L) => x(L.originalFile, L.name));
      } else
        c.value = [];
  };
  return ce(() => {
    S = new zt({
      debug: n.debug,
      restrictions: { maxFileSize: tn(l.maxFileSize ?? "10mb") },
      locale: n.i18n.t("uppy"),
      onBeforeFileAdded: (L, k) => {
        if (k[L.id] != null) {
          const P = $(L.id);
          c.value[P]?.status === ie.PENDING && (p.value = S.i18n("noDuplicates", { fileName: L.name })), c.value = c.value.filter((G) => G.id !== L.id);
        }
        return c.value.push({
          id: L.id,
          name: L.name,
          size: n.filesize(L.size),
          status: ie.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: L.data
        }), !0;
      }
    }), S.use(Kt, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), S.on("restriction-failed", (L, k) => {
      const C = c.value[$(L.id)];
      C && R(C), p.value = k.message;
    }), S.on("upload", () => {
      const L = n.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", storage: o.path.storage, path: o.path.path }
      });
      S.setMeta({ ...L.body });
      const k = S.getPlugin("XHRUpload");
      k && (k.opts.method = L.method, k.opts.endpoint = L.url + "?" + new URLSearchParams(L.params), k.opts.headers = L.headers), delete L.headers["Content-Type"], g.value = !0, c.value.forEach((C) => {
        C.status !== ie.DONE && (C.percent = null, C.status = ie.UPLOADING, C.statusName = e("Pending upload"));
      });
    }), S.on("upload-progress", (L, k) => {
      const C = k.bytesTotal ?? 1, P = Math.floor(k.bytesUploaded / C * 100), G = $(L.id);
      G !== -1 && c.value[G] && (c.value[G].percent = `${P}%`);
    }), S.on("upload-success", (L) => {
      const k = c.value[$(L.id)];
      k && (k.status = ie.DONE, k.statusName = e("Done"));
    }), S.on("upload-error", (L, k) => {
      const C = c.value[$(L.id)];
      C && (C.percent = null, C.status = ie.ERROR, C.statusName = k?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : k?.message || e("Unknown Error"));
    }), S.on("error", (L) => {
      p.value = L.message, g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), S.on("complete", () => {
      g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), u.value?.addEventListener("click", () => m.value?.click()), i.value?.addEventListener("click", () => _.value?.click()), d.value?.addEventListener("dragover", (L) => {
      L.preventDefault(), T.value = !0;
    }), d.value?.addEventListener("dragleave", (L) => {
      L.preventDefault(), T.value = !1;
    });
    const O = (L, k) => {
      k.isFile && k.file((C) => L(k, C)), k.isDirectory && k.createReader().readEntries((C) => C.forEach((P) => O(L, P)));
    };
    d.value?.addEventListener("drop", (L) => {
      L.preventDefault(), T.value = !1;
      const k = /^[/\\](.+)/, C = L.dataTransfer?.items;
      C && Array.from(C).forEach((P) => {
        P.kind === "file" && O((G, Y) => {
          const Z = k.exec(G.fullPath);
          x(Y, Z ? Z[1] : Y.name);
        }, P.webkitGetAsEntry());
      });
    });
    const ae = (L) => {
      const k = L.target, C = k.files;
      if (C) {
        for (const P of C) x(P);
        k.value = "";
      }
    };
    m.value?.addEventListener("change", ae), _.value?.addEventListener("change", ae);
  }), {
    container: v,
    internalFileInput: m,
    internalFolderInput: _,
    pickFiles: u,
    pickFolders: i,
    dropArea: d,
    queue: c,
    message: p,
    uploading: g,
    hasFilesInDropArea: T,
    definitions: r,
    openFileSelector: U,
    upload: se,
    cancel: B,
    remove: R,
    clear: le,
    close: X,
    getClassNameForEntry: E,
    getIconForEntry: F
  };
}
function Xe(n, e = 14) {
  const o = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(o), "$2..$4");
}
const ur = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function vr(n, e) {
  return a(), f("svg", ur, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const gt = { render: vr }, _r = { class: "vuefinder__upload-modal__content" }, mr = {
  key: 0,
  class: "pointer-events-none"
}, fr = {
  key: 1,
  class: "pointer-events-none"
}, hr = ["disabled"], pr = ["disabled"], gr = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, wr = ["textContent"], br = { class: "vuefinder__upload-modal__file-info" }, yr = { class: "vuefinder__upload-modal__file-name hidden md:block" }, kr = { class: "vuefinder__upload-modal__file-name md:hidden" }, xr = {
  key: 0,
  class: "ml-auto"
}, Sr = ["title", "disabled", "onClick"], $r = {
  key: 0,
  class: "py-2"
}, Cr = ["disabled"], Er = /* @__PURE__ */ K({
  __name: "ModalUpload",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, {
      container: l,
      internalFileInput: r,
      internalFolderInput: v,
      pickFiles: m,
      pickFolders: _,
      dropArea: u,
      queue: i,
      message: d,
      uploading: c,
      hasFilesInDropArea: p,
      definitions: g,
      openFileSelector: T,
      upload: S,
      cancel: $,
      remove: x,
      clear: E,
      close: F,
      getClassNameForEntry: U,
      getIconForEntry: X
    } = cr();
    return (se, B) => (a(), I(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: t(c),
          onClick: B[4] || (B[4] = xe(
            //@ts-ignore
            (...R) => t(S) && t(S)(...R),
            ["prevent"]
          ))
        }, h(t(o)("Upload")), 9, Cr),
        t(c) ? (a(), f("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: B[5] || (B[5] = xe(
            //@ts-ignore
            (...R) => t($) && t($)(...R),
            ["prevent"]
          ))
        }, h(t(o)("Cancel")), 1)) : (a(), f("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: B[6] || (B[6] = xe(
            //@ts-ignore
            (...R) => t(F) && t(F)(...R),
            ["prevent"]
          ))
        }, h(t(o)("Close")), 1))
      ]),
      default: z(() => [
        s("div", null, [
          D(Se, {
            icon: t(gt),
            title: t(o)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", _r, [
            s("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: u,
              onClick: B[0] || (B[0] = //@ts-ignore
              (...R) => t(T) && t(T)(...R))
            }, [
              t(p) ? (a(), f("div", mr, h(t(o)("Release to drop these files.")), 1)) : (a(), f("div", fr, h(t(o)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            s("div", {
              ref_key: "container",
              ref: l,
              class: "vuefinder__upload-modal__buttons"
            }, [
              s("button", {
                ref_key: "pickFiles",
                ref: m,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, h(t(o)("Select Files")), 513),
              s("button", {
                ref_key: "pickFolders",
                ref: _,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, h(t(o)("Select Folders")), 513),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(c),
                onClick: B[1] || (B[1] = (R) => t(E)(!1))
              }, h(t(o)("Clear all")), 9, hr),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(c),
                onClick: B[2] || (B[2] = (R) => t(E)(!0))
              }, h(t(o)("Clear only successful")), 9, pr)
            ], 512),
            s("div", gr, [
              (a(!0), f(te, null, oe(t(i), (R) => (a(), f("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: R.id
              }, [
                s("span", {
                  class: Q(["vuefinder__upload-modal__file-icon", t(U)(R)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: h(t(X)(R))
                  }, null, 8, wr)
                ], 2),
                s("div", br, [
                  s("div", yr, h(t(Xe)(R.name, 40)) + " (" + h(R.size) + ") ", 1),
                  s("div", kr, h(t(Xe)(R.name, 16)) + " (" + h(R.size) + ") ", 1),
                  s("div", {
                    class: Q(["vuefinder__upload-modal__file-status", t(U)(R)])
                  }, [
                    N(h(R.statusName) + " ", 1),
                    R.status === t(g).QUEUE_ENTRY_STATUS.UPLOADING ? (a(), f("b", xr, h(R.percent), 1)) : M("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: Q(["vuefinder__upload-modal__file-remove", t(c) ? "disabled" : ""]),
                  title: t(o)("Delete"),
                  disabled: t(c),
                  onClick: (le) => t(x)(R)
                }, [...B[7] || (B[7] = [
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
                ])], 10, Sr)
              ]))), 128)),
              t(i).length ? M("", !0) : (a(), f("div", $r, h(t(o)("No files selected!")), 1))
            ]),
            t(d).length ? (a(), I(be, {
              key: 0,
              onHidden: B[3] || (B[3] = (R) => d.value = ""),
              error: ""
            }, {
              default: z(() => [
                N(h(t(d)), 1)
              ]),
              _: 1
            })) : M("", !0)
          ])
        ]),
        s("input", {
          ref_key: "internalFileInput",
          ref: r,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        s("input", {
          ref_key: "internalFolderInput",
          ref: v,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}), Mr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Tr(n, e) {
  return a(), f("svg", Mr, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const wt = { render: Tr }, Ar = { class: "vuefinder__unarchive-modal__content" }, Dr = { class: "vuefinder__unarchive-modal__items" }, Ir = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fr = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Lr = { class: "vuefinder__unarchive-modal__item-name" }, Vr = { class: "vuefinder__unarchive-modal__info" }, bt = /* @__PURE__ */ K({
  __name: "ModalUnarchive",
  setup(n) {
    const e = j("ServiceContainer"), o = e.fs, { t: l } = e.i18n, r = y(e.modal.data.items[0]), v = y(""), m = y([]), _ = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          storage: o.path.storage,
          path: o.path.path
        },
        body: {
          item: r.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: l("The file unarchived.") });
        },
        onError: (u) => {
          v.value = l(u.message);
        }
      });
    };
    return (u, i) => (a(), I(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: _,
          class: "vf-btn vf-btn-primary"
        }, h(t(l)("Unarchive")), 1),
        s("button", {
          type: "button",
          onClick: i[1] || (i[1] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(l)("Cancel")), 1)
      ]),
      default: z(() => [
        s("div", null, [
          D(Se, {
            icon: t(wt),
            title: t(l)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", Ar, [
            s("div", Dr, [
              (a(!0), f(te, null, oe(m.value, (d) => (a(), f("p", {
                class: "vuefinder__unarchive-modal__item",
                key: d.path
              }, [
                d.type === "dir" ? (a(), f("svg", Ir, [...i[2] || (i[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (a(), f("svg", Fr, [...i[3] || (i[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Lr, h(d.basename), 1)
              ]))), 128)),
              s("p", Vr, h(t(l)("The archive will be unarchived at")) + " (" + h(t(o).path.path) + ")", 1),
              v.value.length ? (a(), I(be, {
                key: 0,
                onHidden: i[0] || (i[0] = (d) => v.value = ""),
                error: ""
              }, {
                default: z(() => [
                  N(h(v.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Rr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Br(n, e) {
  return a(), f("svg", Rr, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const yt = { render: Br }, Hr = { class: "vuefinder__archive-modal__content" }, qr = { class: "vuefinder__archive-modal__form" }, Nr = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Ur = { class: "vuefinder__archive-modal__file" }, Pr = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Or = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zr = { class: "vuefinder__archive-modal__file-name" }, Kr = ["placeholder"], kt = /* @__PURE__ */ K({
  __name: "ModalArchive",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = y(""), v = y(""), m = y(e.modal.data.items), _ = () => {
      m.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: l.path.storage,
          path: l.path.path
        },
        body: {
          items: m.value.map(({ path: u, type: i }) => ({ path: u, type: i })),
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("The file(s) archived.") });
        },
        onError: (u) => {
          v.value = o(u.message);
        }
      });
    };
    return (u, i) => (a(), I(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: _,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Archive")), 1),
        s("button", {
          type: "button",
          onClick: i[2] || (i[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1)
      ]),
      default: z(() => [
        s("div", null, [
          D(Se, {
            icon: t(yt),
            title: t(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", Hr, [
            s("div", qr, [
              s("div", Nr, [
                (a(!0), f(te, null, oe(m.value, (d) => (a(), f("p", Ur, [
                  d.type === "dir" ? (a(), f("svg", Pr, [...i[3] || (i[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), f("svg", Or, [...i[4] || (i[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", zr, h(d.basename), 1)
                ]))), 256))
              ]),
              re(s("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (d) => r.value = d),
                onKeyup: Ie(_, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(o)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Kr), [
                [Fe, r.value]
              ]),
              v.value.length ? (a(), I(be, {
                key: 0,
                onHidden: i[1] || (i[1] = (d) => v.value = ""),
                error: ""
              }, {
                default: z(() => [
                  N(h(v.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), jr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Gr(n, e) {
  return a(), f("svg", jr, [...e[0] || (e[0] = [
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
const nt = { render: Gr }, Yr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Wr(n, e) {
  return a(), f("svg", Yr, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Qr = { render: Wr }, Xr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Jr(n, e) {
  return a(), f("svg", Xr, [...e[0] || (e[0] = [
    s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Zr = { render: Jr }, el = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function tl(n, e) {
  return a(), f("svg", el, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const nl = { render: tl }, ol = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function sl(n, e) {
  return a(), f("svg", ol, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const rl = { render: sl }, ll = { class: "vuefinder__toolbar" }, al = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, il = ["title"], dl = ["title"], cl = ["title"], ul = ["title"], vl = ["title"], _l = ["title"], ml = ["title"], fl = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, hl = { class: "pl-2" }, pl = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, gl = { class: "vuefinder__toolbar__controls" }, wl = ["title"], bl = ["title"], yl = /* @__PURE__ */ K({
  __name: "Toolbar",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = e.config, v = e.search, m = W(r.state), _ = W(v.state);
    de(() => m.value.fullScreen, () => {
      if (m.value.fullScreen) {
        const i = document.querySelector("body");
        i && (i.style.overflow = "hidden");
      } else {
        const i = document.querySelector("body");
        i && (i.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const u = () => {
      r.set("view", m.value.view === "list" ? "grid" : "list");
    };
    return (i, d) => (a(), f("div", ll, [
      t(_).query.length ? (a(), f("div", fl, [
        s("div", hl, [
          N(h(t(o)("Search results for")) + " ", 1),
          s("span", pl, h(t(_).query), 1)
        ]),
        t(r).get("loadingIndicator") === "circular" && t(l).isLoading() ? (a(), I(t(nt), { key: 0 })) : M("", !0)
      ])) : (a(), f("div", al, [
        t(e).features.includes(t(ee).NEW_FOLDER) ? (a(), f("div", {
          key: 0,
          class: "mx-1.5",
          title: t(o)("New Folder"),
          onClick: d[0] || (d[0] = (c) => t(e).modal.open(ht, { items: t(l).selectedItems }))
        }, [
          D(t(ft))
        ], 8, il)) : M("", !0),
        t(e).features.includes(t(ee).NEW_FILE) ? (a(), f("div", {
          key: 1,
          class: "mx-1.5",
          title: t(o)("New File"),
          onClick: d[1] || (d[1] = (c) => t(e).modal.open(dr, { items: t(l).selectedItems }))
        }, [
          D(t(pt))
        ], 8, dl)) : M("", !0),
        t(e).features.includes(t(ee).RENAME) ? (a(), f("div", {
          key: 2,
          class: "mx-1.5",
          title: t(o)("Rename"),
          onClick: d[2] || (d[2] = (c) => t(l).selectedItems.length !== 1 || t(e).modal.open(tt, { items: t(l).selectedItems }))
        }, [
          D(t(_t), {
            class: Q(t(l).selectedItems.length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, cl)) : M("", !0),
        t(e).features.includes(t(ee).DELETE) ? (a(), f("div", {
          key: 3,
          class: "mx-1.5",
          title: t(o)("Delete"),
          onClick: d[3] || (d[3] = (c) => !t(l).selectedItems.length || t(e).modal.open(et, { items: t(l).selectedItems }))
        }, [
          D(t(vt), {
            class: Q(t(l).selectedItems.length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ul)) : M("", !0),
        t(e).features.includes(t(ee).UPLOAD) ? (a(), f("div", {
          key: 4,
          class: "mx-1.5",
          title: t(o)("Upload"),
          onClick: d[4] || (d[4] = (c) => t(e).modal.open(Er, { items: t(l).selectedItems }))
        }, [
          D(t(gt))
        ], 8, vl)) : M("", !0),
        t(e).features.includes(t(ee).UNARCHIVE) && t(l).selectedItems.length === 1 && t(l).selectedItems[0].mime_type === "application/zip" ? (a(), f("div", {
          key: 5,
          class: "mx-1.5",
          title: t(o)("Unarchive"),
          onClick: d[5] || (d[5] = (c) => !t(l).selectedItems.length || t(e).modal.open(bt, { items: t(l).selectedItems }))
        }, [
          D(t(wt), {
            class: Q(t(l).selectedItems.length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, _l)) : M("", !0),
        t(e).features.includes(t(ee).ARCHIVE) ? (a(), f("div", {
          key: 6,
          class: "mx-1.5",
          title: t(o)("Archive"),
          onClick: d[6] || (d[6] = (c) => !t(l).selectedItems.length || t(e).modal.open(kt, { items: t(l).selectedItems }))
        }, [
          D(t(yt), {
            class: Q(t(l).selectedItems.length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ml)) : M("", !0)
      ])),
      s("div", gl, [
        t(e).features.includes(t(ee).FULL_SCREEN) ? (a(), f("div", {
          key: 0,
          onClick: d[7] || (d[7] = (c) => t(r).toggle("fullScreen")),
          class: "mx-1.5",
          title: t(o)("Toggle Full Screen")
        }, [
          t(m).fullScreen ? (a(), I(t(Zr), { key: 0 })) : (a(), I(t(Qr), { key: 1 }))
        ], 8, wl)) : M("", !0),
        s("div", {
          class: "mx-1.5",
          title: t(o)("Change View"),
          onClick: d[8] || (d[8] = (c) => t(_).query.length || u())
        }, [
          t(m).view === "grid" ? (a(), I(t(nl), {
            key: 0,
            class: Q(["vf-toolbar-icon", t(_).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : M("", !0),
          t(m).view === "list" ? (a(), I(t(rl), {
            key: 1,
            class: Q(["vf-toolbar-icon", t(_).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : M("", !0)
        ], 8, bl)
      ])
    ]));
  }
}), kl = (n, e = 0, o = !1) => {
  let l;
  return (...r) => {
    o && !l && n(...r), clearTimeout(l), l = setTimeout(() => {
      n(...r);
    }, e);
  };
}, rt = (n, e, o) => {
  const l = y(n);
  return Dt((r, v) => ({
    get() {
      return r(), l.value;
    },
    set: kl((m) => {
      l.value = m, v();
    }, e, !1)
  }));
}, xl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function Sl(n, e) {
  return a(), f("svg", xl, [...e[0] || (e[0] = [
    s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const $l = { render: Sl }, Cl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function El(n, e) {
  return a(), f("svg", Cl, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ml = { render: El }, Tl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Al(n, e) {
  return a(), f("svg", Tl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Dl = { render: Al }, Il = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function Fl(n, e) {
  return a(), f("svg", Il, [...e[0] || (e[0] = [
    s("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Ll = { render: Fl }, Vl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function Rl(n, e) {
  return a(), f("svg", Vl, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Bl = { render: Rl }, Hl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function ql(n, e) {
  return a(), f("svg", Hl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Nl = { render: ql }, Ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function Pl(n, e) {
  return a(), f("svg", Ul, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Pe = { render: Pl }, Ol = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function zl(n, e) {
  return a(), f("svg", Ol, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Kl = { render: zl }, jl = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function Gl(n, e) {
  return a(), f("svg", jl, [...e[0] || (e[0] = [
    s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Yl = { render: Gl };
function Wl(n) {
  const [e, o] = Ql(n);
  if (!o || o === "/") return e + "://";
  const l = o.replace(/\/+$/, ""), r = l.lastIndexOf("/");
  return r === 0 ? e + "://" : e + ":/" + l.slice(0, r);
}
function Ql(n) {
  const e = n.indexOf(":/");
  return e === -1 ? [void 0, n] : [n.slice(0, e), n.slice(e + 2) || "/"];
}
function Be(n, e = []) {
  const o = "vfDragEnterCounter", l = n.fs, r = W(l.selectedItems);
  function v(d, c) {
    d.preventDefault(), l.getDraggedItem() === c.path || !c || c.type !== "dir" || r.value.some((g) => g.path === c.path || Wl(g.path) === c.path) ? d.dataTransfer && (d.dataTransfer.dropEffect = "none", d.dataTransfer.effectAllowed = "none") : (d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.dataTransfer.effectAllowed = "all"), d.currentTarget.classList.add(...e));
  }
  function m(d) {
    d.preventDefault();
    const c = d.currentTarget, p = Number(c.dataset[o] || 0);
    c.dataset[o] = String(p + 1);
  }
  function _(d) {
    d.preventDefault();
    const c = d.currentTarget, g = Number(c.dataset[o] || 0) - 1;
    g <= 0 ? (delete c.dataset[o], c.classList.remove(...e)) : c.dataset[o] = String(g);
  }
  function u(d, c) {
    if (!c) return;
    d.preventDefault();
    const p = d.currentTarget;
    delete p.dataset[o], p.classList.remove(...e);
    const g = d.dataTransfer?.getData("items") || "[]", S = JSON.parse(g).map(($) => l.sortedFiles.get().find((x) => x.path === $));
    l.clearDraggedItem(), n.modal.open(Qe, { items: { from: S, to: c } });
  }
  function i(d) {
    return {
      dragover: (c) => v(c, d),
      dragenter: m,
      dragleave: _,
      drop: (c) => u(c, d)
    };
  }
  return { events: i };
}
const Xl = { class: "vuefinder__breadcrumb__container" }, Jl = ["title"], Zl = ["title"], ea = ["title"], ta = ["title"], na = { class: "vuefinder__breadcrumb__list" }, oa = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, sa = { class: "relative" }, ra = ["title", "onClick"], la = { class: "vuefinder__breadcrumb__search-mode" }, aa = ["placeholder"], ia = ["onClick"], da = { class: "vuefinder__breadcrumb__hidden-item-content" }, ca = { class: "vuefinder__breadcrumb__hidden-item-text" }, ua = /* @__PURE__ */ K({
  __name: "Breadcrumb",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.search, r = e.fs, v = e.config, m = W(v.state), _ = W(l.state), u = W(r.path), i = W(r.loading), d = ne(() => _.value?.searchMode ?? !1), c = y(null), p = rt(0, 100), g = y(5), T = y(!1), S = ne(() => u.value?.breadcrumb ?? []);
    function $(w, b) {
      return w.length > b ? [w.slice(-b), w.slice(0, -b)] : [w, []];
    }
    const x = ne(() => $(S.value, g.value)[0]), E = ne(() => $(S.value, g.value)[1]);
    de(p, () => {
      if (!c.value) return;
      const w = c.value.children;
      let b = 0, V = 0;
      const J = 5, ye = 1;
      g.value = J, Ve(() => {
        for (let he = w.length - 1; he >= 0; he--) {
          const _e = w[he];
          if (b + _e.offsetWidth > p.value - 40)
            break;
          b += parseInt(_e.offsetWidth.toString(), 10), V++;
        }
        V < ye && (V = ye), V > J && (V = J), g.value = V;
      });
    });
    const F = () => {
      c.value && (p.value = c.value.offsetWidth);
    }, U = y(null);
    ce(() => {
      U.value = new ResizeObserver(F), c.value && U.value.observe(c.value);
    }), Re(() => {
      U.value && U.value.disconnect();
    });
    const X = Be(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function se(w = null) {
      w ??= S.value.length - 2;
      const b = {
        basename: u.value?.storage ?? "local",
        extension: "",
        path: (u.value?.storage ?? "local") + "://",
        storage: u.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return S.value[w] ?? b;
    }
    const B = () => {
      G(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: u.value?.storage, path: u.value?.path } });
    }, R = () => {
      l.exitSearchMode(), x.value.length > 0 && !d.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: u.value?.storage ?? "local",
          path: S.value[S.value.length - 2]?.path ?? (u.value?.storage ?? "local") + "://"
        }
      });
    }, le = (w) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: u.value?.storage, path: w.path } }), T.value = !1;
    }, O = () => {
      T.value && (T.value = !1);
    }, ae = {
      mounted(w, b) {
        w.clickOutsideEvent = function(V) {
          w === V.target || w.contains(V.target) || b.value();
        }, document.body.addEventListener("click", w.clickOutsideEvent);
      },
      beforeUnmount(w) {
        document.body.removeEventListener("click", w.clickOutsideEvent);
      }
    }, L = () => {
      v.toggle("showTreeView");
    }, k = y(null), C = rt("", 400);
    de(C, (w) => {
      e.emitter.emit("vf-toast-clear"), l.setQuery(w);
    }), de(d, (w) => {
      w && Ve(() => {
        k.value && k.value.focus();
      });
    }), e.emitter.on("vf-search-exit", () => {
      l.exitSearchMode();
    });
    const P = () => {
      C.value === "" && l.exitSearchMode();
    }, G = () => {
      C.value = "", l.exitSearchMode();
    }, Y = y({
      x: 0,
      y: 0
    }), Z = (w) => {
      if (w.currentTarget instanceof HTMLElement) {
        const { x: b, y: V, height: J } = w.currentTarget.getBoundingClientRect();
        Y.value = { x: b, y: V + J };
      }
      T.value = !T.value;
    };
    return (w, b) => (a(), f("div", Xl, [
      s("span", {
        title: t(o)("Toggle Tree View")
      }, [
        D(t(Kl), {
          onClick: L,
          class: Q(["vuefinder__breadcrumb__toggle-tree", t(m).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Jl),
      s("span", {
        title: t(o)("Go up a directory")
      }, [
        D(t(Ml), ke(Ce(S.value.length && !d.value ? t(X).events(se()) : {}), {
          onClick: R,
          class: S.value.length && !d.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, Zl),
      t(r).isLoading() ? (a(), f("span", {
        key: 1,
        title: t(o)("Cancel")
      }, [
        D(t(Dl), {
          onClick: b[0] || (b[0] = (V) => t(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, ta)) : (a(), f("span", {
        key: 0,
        title: t(o)("Refresh")
      }, [
        D(t($l), { onClick: B })
      ], 8, ea)),
      re(s("div", {
        class: "group vuefinder__breadcrumb__search-container",
        onClick: b[3] || (b[3] = //@ts-ignore
        (...V) => t(l).enterSearchMode && t(l).enterSearchMode(...V))
      }, [
        s("div", null, [
          D(t(Ll), ke(Ce(t(X).events(se(-1))), {
            onClick: b[1] || (b[1] = (V) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(u).value?.storage ?? "local" } }))
          }), null, 16)
        ]),
        s("div", na, [
          E.value.length ? re((a(), f("div", oa, [
            b[5] || (b[5] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", sa, [
              s("span", {
                onDragenter: b[2] || (b[2] = (V) => T.value = !0),
                onClick: Z,
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                D(t(Yl), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [ae, O]
          ]) : M("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (a(!0), f(te, null, oe(x.value, (V, J) => (a(), f("div", { key: J }, [
            b[6] || (b[6] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", ke(Ce(t(X).events(V), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: V.basename,
              onClick: xe((ye) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(u)?.storage, path: V.path } }), ["stop"])
            }), h(V.name), 17, ra)
          ]))), 128))
        ], 512),
        t(v).get("loadingIndicator") === "circular" && t(i) ? (a(), I(t(nt), { key: 0 })) : M("", !0)
      ], 512), [
        [ge, !d.value]
      ]),
      re(s("div", la, [
        s("div", null, [
          D(t(Bl))
        ]),
        re(s("input", {
          ref_key: "searchInput",
          ref: k,
          onKeydown: Ie(G, ["esc"]),
          onBlur: P,
          "onUpdate:modelValue": b[4] || (b[4] = (V) => It(C) ? C.value = V : null),
          placeholder: t(o)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, aa), [
          [Fe, t(C)]
        ]),
        D(t(Nl), { onClick: G })
      ], 512), [
        [ge, d.value]
      ]),
      (a(), I(Ft, { to: "body" }, [
        re(s("div", {
          style: Ee({ position: "absolute", top: Y.value.y + "px", left: Y.value.x + "px" }),
          class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
        }, [
          (a(!0), f(te, null, oe(E.value, (V, J) => (a(), f("div", ke({ key: J }, Ce(t(X).events(V), !0), {
            onClick: (ye) => le(V),
            class: "vuefinder__breadcrumb__hidden-item"
          }), [
            s("div", da, [
              s("span", null, [
                D(t(Pe), { class: "vuefinder__breadcrumb__hidden-item-icon" })
              ]),
              b[7] || (b[7] = N()),
              s("span", ca, h(V.name), 1)
            ])
          ], 16, ia))), 128))
        ], 4), [
          [ge, T.value]
        ])
      ]))
    ]));
  }
});
function va(n, e) {
  const {
    scrollContainer: o,
    itemWidth: l = 100,
    rowHeight: r,
    overscan: v = 2,
    containerPadding: m = 48
  } = e, _ = n && typeof n.get == "function" ? W(n) : n, u = () => typeof r == "number" ? r : r.value, i = y(0), d = y(6), c = y(600);
  let p = null;
  const g = ne(() => Math.ceil(_.value.length / d.value)), T = ne(() => g.value * u()), S = ne(() => {
    const B = u(), R = Math.max(0, Math.floor(i.value / B) - v), le = Math.min(g.value, Math.ceil((i.value + c.value) / B) + v);
    return { start: R, end: le };
  }), $ = ne(() => {
    const { start: B, end: R } = S.value;
    return Array.from({ length: R - B }, (le, O) => B + O);
  }), x = () => c.value, E = () => {
    if (o.value) {
      const B = o.value.clientWidth - m;
      d.value = Math.max(Math.floor(B / l), 2);
    }
  }, F = (B) => {
    const R = B.target;
    i.value = R.scrollTop;
  };
  de(() => _.value.length, () => {
    E();
  });
  const U = (B, R) => {
    const le = R * d.value;
    return B.slice(le, le + d.value);
  }, X = (B, R, le, O, ae) => {
    const L = [];
    for (let k = R; k <= le; k++)
      for (let C = O; C <= ae; C++) {
        const P = k * d.value + C;
        P < B.length && B[P] && L.push(B[P]);
      }
    return L;
  }, se = (B) => ({
    row: Math.floor(B / d.value),
    col: B % d.value
  });
  return ce(async () => {
    await Ve(), o.value && (c.value = o.value.clientHeight || 600), E(), window.addEventListener("resize", () => {
      o.value && (c.value = o.value.clientHeight || 600), E();
    }), o.value && "ResizeObserver" in window && (p = new ResizeObserver((B) => {
      const R = B[0];
      R && (c.value = Math.round(R.contentRect.height)), E();
    }), p.observe(o.value));
  }), Re(() => {
    window.removeEventListener("resize", E), p && (p.disconnect(), p = null);
  }), {
    scrollTop: i,
    itemsPerRow: d,
    totalRows: g,
    totalHeight: T,
    visibleRange: S,
    visibleRows: $,
    updateItemsPerRow: E,
    handleScroll: F,
    getRowItems: U,
    getItemsInRange: X,
    getItemPosition: se,
    getContainerHeight: x
  };
}
function _a(n) {
  const { getItemPosition: e, getItemsInRange: o, getKey: l, selectionObject: r, rowHeight: v, itemWidth: m } = n, _ = Math.floor(Math.random() * 2 ** 32).toString(), i = j("ServiceContainer").fs, d = W(i.selectedKeys), c = W(i.sortedFiles);
  W(i.selectedCount);
  const p = y(/* @__PURE__ */ new Set()), g = y(!1), T = y(!1), S = y(null), $ = (k) => k.map((C) => C.getAttribute("data-key")).filter((C) => !!C), x = (k) => {
    k.selection.getSelection().forEach((C) => {
      k.selection.deselect(C, !0);
    });
  }, E = (k) => {
    d.value && d.value.forEach((C) => {
      const P = document.querySelector(`[data-key="${C}"]`);
      P && k.selection.select(P, !0);
    });
  }, F = (k) => {
    if (k.size === 0) return null;
    const P = Array.from(k).map((b) => {
      const V = c.value?.findIndex((J) => l(J) === b) ?? -1;
      return e(V >= 0 ? V : 0);
    }), G = Math.min(...P.map((b) => b.row)), Y = Math.max(...P.map((b) => b.row)), Z = Math.min(...P.map((b) => b.col)), w = Math.max(...P.map((b) => b.col));
    return { minRow: G, maxRow: Y, minCol: Z, maxCol: w };
  }, U = (k) => {
    g.value = !1, !k.event?.metaKey && !k.event?.ctrlKey && (T.value = !0), k.selection.resolveSelectables(), x(k), E(k);
  }, X = ({ event: k, selection: C }) => {
    const P = k;
    P && "type" in P && P.type === "touchend" && P.preventDefault();
    const G = k;
    if (!G?.ctrlKey && !G?.metaKey && (i.clearSelection(), C.clearSelection(!0, !0)), p.value.clear(), G && r.value) {
      const Y = r.value.getSelectables()[0]?.closest(".scroller-" + _);
      if (Y) {
        const Z = Y.getBoundingClientRect(), w = G.clientY - Z.top + Y.scrollTop, b = G.clientX - Z.left, V = Math.floor(w / v.value), J = Math.floor(b / m);
        S.value = { row: V, col: J };
      }
    }
  }, se = (k) => {
    const C = k.selection, P = $(k.store.changed.added), G = $(k.store.changed.removed);
    T.value = !1, g.value = !0, P.forEach((Y) => {
      d.value && !d.value.has(Y) && p.value.add(Y), i.select(Y);
    }), G.forEach((Y) => {
      document.querySelector(`[data-key="${Y}"]`) && c.value?.find((w) => l(w) === Y) && p.value.delete(Y), i.deselect(Y);
    }), C.resolveSelectables(), E(k);
  }, B = () => {
    p.value.clear();
  }, R = (k) => {
    if (k.event && S.value && p.value.size > 0) {
      const P = Array.from(p.value).map((G) => {
        const Y = c.value?.findIndex((Z) => l(Z) === G) ?? -1;
        return Y >= 0 ? e(Y) : null;
      }).filter((G) => G !== null);
      if (P.length > 0) {
        const G = [...P, S.value], Y = {
          minRow: Math.min(...G.map((Z) => Z.row)),
          maxRow: Math.max(...G.map((Z) => Z.row)),
          minCol: Math.min(...G.map((Z) => Z.col)),
          maxCol: Math.max(...G.map((Z) => Z.col))
        };
        o(c.value || [], Y.minRow, Y.maxRow, Y.minCol, Y.maxCol).forEach(
          (Z) => {
            const w = l(Z);
            document.querySelector(`[data-key="${w}"]`) || i.select(w);
          }
        );
      }
    }
  }, le = (k) => {
    R(k), x(k), E(k), i.setSelectedCount(d.value?.size || 0), g.value = !1, S.value = null;
  }, O = () => {
    r.value = new jt({
      selectables: [".file-item-" + _],
      boundaries: [".scroller-" + _],
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
    }), r.value.on("beforestart", U), r.value.on("start", X), r.value.on("move", se), r.value.on("stop", le);
  }, ae = () => {
    r.value && (r.value.destroy(), r.value = null);
  }, L = (k) => {
    T.value && (r.value?.clearSelection(), B(), T.value = !1);
    const C = k;
    !p.value.size && !T.value && !C?.ctrlKey && !C?.metaKey && (i.clearSelection(), r.value?.clearSelection());
  };
  return ce(() => {
    const k = (C) => {
      !C.buttons && g.value && (g.value = !1);
    };
    document.addEventListener("dragleave", k), Re(() => {
      document.removeEventListener("dragleave", k);
    });
  }), {
    isDragging: g,
    selectionStarted: T,
    explorerId: _,
    extractIds: $,
    cleanupSelection: x,
    refreshSelection: E,
    getSelectionRange: F,
    selectSelectionRange: R,
    initializeSelectionArea: O,
    destroySelectionArea: ae,
    handleContentClick: L
  };
}
const ma = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function fa(n, e) {
  return a(), f("svg", ma, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const ha = { render: fa }, pa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function ga(n, e) {
  return a(), f("svg", pa, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const wa = { render: ga }, He = /* @__PURE__ */ K({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, o) => (a(), f("div", null, [
      n.direction === "asc" ? (a(), I(t(ha), { key: 0 })) : M("", !0),
      n.direction === "desc" ? (a(), I(t(wa), { key: 1 })) : M("", !0)
    ]));
  }
}), ba = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function ya(n, e) {
  return a(), f("svg", ba, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const ka = { render: ya }, xa = { class: "vuefinder__drag-item__container" }, Sa = { class: "vuefinder__drag-item__count" }, $a = /* @__PURE__ */ K({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (o, l) => (a(), f("div", xa, [
      D(t(ka)),
      s("div", Sa, h(e.count), 1)
    ]));
  }
}), Ca = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Ea(n, e) {
  return a(), f("svg", Ca, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ma = { render: Ea }, Ta = {
  key: 3,
  class: "vuefinder__item-icon__extension"
}, lt = /* @__PURE__ */ K({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(n) {
    const e = n, o = j("ServiceContainer"), l = o.customIcon?.(o, e.item);
    return (r, v) => (a(), f("div", {
      class: Q(["vuefinder__item-icon", n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      t(l) ? (a(), I(Je(t(l).is), Lt(ke({ key: 0 }, t(l).props || {})), null, 16)) : n.item.type === "dir" ? (a(), I(t(Pe), { key: 1 })) : (a(), I(t(Ma), { key: 2 })),
      !t(l) && n.ext && n.item.type !== "dir" && n.item.extension ? (a(), f("div", Ta, h(n.item.extension.substring(0, 3)), 1)) : M("", !0)
    ], 2));
  }
}), Aa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Da(n, e) {
  return a(), f("svg", Aa, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const xt = { render: Da }, Ia = ["data-key", "data-row", "data-col", "draggable"], Fa = { key: 0 }, La = { class: "vuefinder__explorer__item-grid-content" }, Va = ["data-src", "alt"], Ra = { class: "vuefinder__explorer__item-title" }, Ba = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Ha = { class: "vuefinder__explorer__item-list-name" }, qa = { class: "vuefinder__explorer__item-list-icon" }, Na = { class: "vuefinder__explorer__item-name" }, Ua = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Pa = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Oa = { key: 0 }, za = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Ka = /* @__PURE__ */ K({
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
    const o = n, l = e, r = j("ServiceContainer"), v = r.fs, m = r.config, _ = ne(() => [
      "file-item-" + o.explorerId,
      o.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      o.isSelected ? "vf-explorer-selected" : ""
    ]), u = ne(() => ({
      opacity: o.isDragging || v.isCut(o.item.path) ? 0.5 : ""
    }));
    let i = null;
    const d = y(null);
    let c = !1;
    const p = () => {
      i && clearTimeout(i), g.value = !0;
    }, g = y(!0), T = (S) => {
      if (g.value = !1, i && (S.preventDefault(), clearTimeout(i)), !c)
        c = !0, l("click", S), d.value = setTimeout(() => c = !1, 300);
      else
        return c = !1, l("dblclick", S), clearTimeout(i), !1;
      if (S.currentTarget && S.currentTarget instanceof HTMLElement) {
        const $ = S.currentTarget.getBoundingClientRect();
        S.preventDefault(), i = setTimeout(() => {
          let F = $.y + $.height;
          F + 146 > window.innerHeight - 10 && (F = $.y - 146), F < 10 && (F = 10);
          const U = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: $.x,
            clientY: F
          });
          S.target?.dispatchEvent(U);
        }, 300);
      }
    };
    return (S, $) => (a(), f("div", {
      class: Q(_.value),
      style: Ee(u.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: g.value,
      onTouchstart: $[1] || ($[1] = (x) => T(x)),
      onTouchend: $[2] || ($[2] = (x) => p()),
      onClick: $[3] || ($[3] = (x) => l("click", x)),
      onDblclick: $[4] || ($[4] = (x) => l("dblclick", x)),
      onContextmenu: $[5] || ($[5] = xe((x) => l("contextmenu", x), ["prevent", "stop"])),
      onDragstart: $[6] || ($[6] = (x) => l("dragstart", x)),
      onDragend: $[7] || ($[7] = (x) => l("dragend", x))
    }, [
      n.view === "grid" ? (a(), f("div", Fa, [
        s("div", La, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (a(), f("img", {
            key: 0,
            onTouchstart: $[0] || ($[0] = (x) => x.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": t(r).requester.getPreviewUrl(n.item.storage, n.item),
            alt: n.item.basename
          }, null, 40, Va)) : (a(), I(lt, {
            key: 1,
            item: n.item,
            ext: !0
          }, null, 8, ["item"]))
        ]),
        s("span", Ra, h(t(Xe)(n.item.basename)), 1)
      ])) : (a(), f("div", Ba, [
        s("div", Ha, [
          s("div", qa, [
            D(lt, {
              item: n.item,
              small: n.compact
            }, null, 8, ["item", "small"])
          ]),
          s("span", Na, h(n.item.basename), 1)
        ]),
        n.showPath ? (a(), f("div", Ua, h(n.item.path), 1)) : M("", !0),
        n.showPath ? M("", !0) : (a(), f("div", Pa, [
          n.item.file_size ? (a(), f("div", Oa, h(t(r).filesize(n.item.file_size)), 1)) : M("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (a(), f("div", za, h(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : M("", !0)
      ])),
      t(m).get("pinnedFolders").find((x) => x.path === n.item.path) ? (a(), I(t(xt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : M("", !0)
    ], 46, Ia));
  }
}), ja = ["data-row"], Ye = /* @__PURE__ */ K({
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
    const o = n, l = e, r = ne(() => [
      o.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), v = ne(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${o.rowHeight}px`,
      transform: `translateY(${o.rowIndex * o.rowHeight}px)`
    })), m = ne(() => o.view === "grid" ? {
      gridTemplateColumns: `repeat(${o.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (_, u) => (a(), f("div", {
      class: Q(r.value),
      "data-row": n.rowIndex,
      style: Ee(v.value)
    }, [
      s("div", {
        class: Q(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Ee(m.value)
      }, [
        (a(!0), f(te, null, oe(n.items, (i, d) => (a(), I(Ka, ke({
          key: i.path,
          item: i,
          view: n.view,
          compact: n.compact,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(i.path),
          "is-dragging": n.isDraggingItem(i.path),
          "row-index": n.rowIndex,
          "col-index": d
        }, Ce(n.dragNDropEvents(i)), {
          onClick: u[0] || (u[0] = (c) => l("click", c)),
          onDblclick: u[1] || (u[1] = (c) => l("dblclick", c)),
          onContextmenu: u[2] || (u[2] = (c) => l("contextmenu", c)),
          onDragstart: u[3] || (u[3] = (c) => l("dragstart", c)),
          onDragend: u[4] || (u[4] = (c) => l("dragend", c)),
          explorerId: n.explorerId
        }), null, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, ja));
  }
}), Ga = ["onClick"], Ya = /* @__PURE__ */ K({
  __name: "Toast",
  setup(n) {
    const e = j("ServiceContainer"), { getStore: o } = e.storage, l = y(o("full-screen", !1)), r = y([]), v = (u) => u === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", m = (u) => {
      r.value.splice(u, 1);
    }, _ = (u) => {
      let i = r.value.findIndex((d) => d.id === u);
      i !== -1 && m(i);
    };
    return e.emitter.on("vf-toast-clear", () => {
      r.value = [];
    }), e.emitter.on("vf-toast-push", (u) => {
      let i = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      u.id = i, r.value.push(u), setTimeout(() => {
        _(i);
      }, 5e3);
    }), (u, i) => (a(), f("div", {
      class: Q(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      D(Vt, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: z(() => [
          (a(!0), f(te, null, oe(r.value, (d, c) => (a(), f("div", {
            key: c,
            onClick: (p) => m(c),
            class: Q(["vuefinder__toast__message", v(d.type)])
          }, h(d.label), 11, Ga))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Wa = { class: "vuefinder__explorer__container" }, Qa = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, Xa = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Ja = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Za = {
  key: 1,
  class: "vuefinder__circular-loader"
}, ei = /* @__PURE__ */ K({
  __name: "Explorer",
  setup(n) {
    const e = j("ServiceContainer"), o = Be(e, ["bg-blue-200", "dark:bg-slate-600"]), l = De("dragImage"), r = at(null), v = De("scrollContainer"), m = De("scrollContent"), _ = e.search, u = e.fs, i = e.config, d = W(i.state), c = W(_.state), p = W(u.sortedFiles), g = W(u.selectedKeys), T = W(u.loading), S = (A) => g.value?.has(A) ?? !1;
    let $ = null;
    const x = y(null), E = De("customScrollBar"), F = De("customScrollBarContainer"), U = ne(() => {
      const A = d.value.view, H = d.value.compactListView;
      return A === "grid" && !(c.value.searchMode && c.value.query.length) ? 88 : H ? 24 : 50;
    }), { t: X } = e.i18n, {
      itemsPerRow: se,
      totalHeight: B,
      visibleRows: R,
      handleScroll: le,
      getRowItems: O,
      getItemsInRange: ae,
      getItemPosition: L,
      updateItemsPerRow: k
    } = va(
      ne(() => p.value ?? []),
      {
        scrollContainer: v,
        itemWidth: 104,
        rowHeight: U,
        overscan: 2,
        containerPadding: 0
      }
    ), {
      explorerId: C,
      isDragging: P,
      initializeSelectionArea: G,
      destroySelectionArea: Y,
      handleContentClick: Z
    } = _a({
      getItemPosition: L,
      getItemsInRange: ae,
      getKey: (A) => A.path,
      selectionObject: r,
      rowHeight: U,
      itemWidth: 104
    }), w = y(null), b = (A) => {
      if (!A || !w.value) return !1;
      const H = g.value?.has(w.value) ?? !1;
      return P.value && (H ? g.value?.has(A) ?? !1 : A === w.value);
    };
    de(() => i.get("view"), (A) => {
      A === "list" ? se.value = 1 : k();
    }, { immediate: !0 }), de(se, (A) => {
      i.get("view") === "list" && A !== 1 && (se.value = 1);
    });
    const V = (A) => p.value?.[A];
    ce(() => {
      if (G(), r.value && r.value.on("beforestart", ({ event: A }) => {
        const H = A?.target === m.value;
        if (!A?.metaKey && !A?.ctrlKey && !A?.altKey && !H)
          return !1;
      }), v.value && ($ = new Gt({
        elements_selector: ".lazy",
        container: v.value
      })), de(() => c.value.query, (A) => {
        const H = u.path.get().storage, q = u.path.get().path;
        !H || !q || (A ? e.emitter.emit("vf-fetch", {
          params: {
            q: "search",
            storage: H,
            path: q,
            filter: A
          },
          onSuccess: (ve) => {
            ve.files.length || e.emitter.emit("vf-toast-push", { label: X("No search result found.") });
          }
        }) : e.emitter.emit("vf-fetch", { params: { q: "index", storage: H, path: q } }));
      }), F.value) {
        const A = Ze(F.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (H) => {
            x.value = H;
          },
          scroll: (H) => {
            const { scrollOffsetElement: q } = H.elements();
            v.value && v.value.scrollTo({ top: q.scrollTop, left: 0 });
          }
        });
        x.value = A;
      }
      v.value && v.value.addEventListener("scroll", () => {
        const A = x.value;
        if (!A) return;
        const { scrollOffsetElement: H } = A.elements();
        H.scrollTo({ top: v.value.scrollTop, left: 0 });
      });
    }), Rt(() => {
      if ($ && $.update(), x.value && E.value && v.value) {
        const H = v.value.scrollHeight > v.value.clientHeight, q = E.value;
        q.style.display = H ? "block" : "none", q.style.height = `${B.value}px`;
      }
    }), Re(() => {
      Y(), $ && ($.destroy(), $ = null), x.value && (x.value.destroy(), x.value = null);
    });
    const J = (A) => {
      const H = A.target?.closest(".file-item-" + C), q = A;
      if (!q?.ctrlKey && !q?.metaKey && (u.clearSelection(), r.value?.clearSelection(!0, !0)), H) {
        const ve = String(H.getAttribute("data-key"));
        r.value?.resolveSelectables(), u.toggleSelect(ve);
      }
      u.setSelectedCount(g.value?.size || 0);
    }, ye = (A) => {
      const H = e.contextMenuItems.find((q) => q.show(e, {
        searchQuery: "",
        items: [A],
        target: A
      }));
      H && H.action(e, [A]);
    }, he = (A) => {
      const H = A.target?.closest(".file-item-" + C), q = H ? String(H.getAttribute("data-key")) : null;
      if (!q) return;
      const ve = p.value?.find((Ke) => Ke.path === q);
      ve && ye(ve);
    }, _e = () => {
      const A = g.value;
      return p.value?.filter((H) => A?.has(H.path)) || [];
    }, Me = (A) => {
      A.preventDefault();
      const H = A.target?.closest(".file-item-" + C);
      if (H) {
        const q = String(H.getAttribute("data-key")), ve = p.value?.find((Ke) => Ke.path === q);
        g.value?.has(q) || (u.clearSelection(), u.select(q)), e.emitter.emit("vf-contextmenu-show", { event: A, items: _e(), target: ve });
      }
    }, Te = (A) => {
      A.preventDefault(), e.emitter.emit("vf-contextmenu-show", { event: A, items: _e() });
    }, Oe = (A) => {
      if (A.altKey || A.ctrlKey || A.metaKey)
        return A.preventDefault(), !1;
      P.value = !0;
      const H = A.target?.closest(".file-item-" + C);
      if (w.value = H ? String(H.dataset.key) : null, A.dataTransfer && w.value) {
        A.dataTransfer.setDragImage(l.value, 0, 15), A.dataTransfer.effectAllowed = "all", A.dataTransfer.dropEffect = "copy";
        const q = g.value?.has(w.value) ? Array.from(g.value) : [w.value];
        A.dataTransfer.setData("items", JSON.stringify(q)), u.setDraggedItem(w.value);
      }
    }, ze = () => {
      w.value = null;
    };
    return (A, H) => (a(), f("div", Wa, [
      s("div", {
        ref: "customScrollBarContainer",
        class: Q(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(d).view === "grid" }, { "search-active": t(c).hasQuery }]])
      }, [
        s("div", Qa, null, 512)
      ], 2),
      t(d).view === "list" || t(c).query.length ? (a(), f("div", Xa, [
        s("div", {
          onClick: H[0] || (H[0] = (q) => t(u).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          N(h(t(X)("Name")) + " ", 1),
          re(D(He, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "basename"]
          ])
        ]),
        t(c).query.length ? M("", !0) : (a(), f("div", {
          key: 0,
          onClick: H[1] || (H[1] = (q) => t(u).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          N(h(t(X)("Size")) + " ", 1),
          re(D(He, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "file_size"]
          ])
        ])),
        t(c).query.length ? (a(), f("div", {
          key: 1,
          onClick: H[2] || (H[2] = (q) => t(u).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          N(h(t(X)("Filepath")) + " ", 1),
          re(D(He, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "path"]
          ])
        ])) : M("", !0),
        t(c).query.length ? M("", !0) : (a(), f("div", {
          key: 2,
          onClick: H[3] || (H[3] = (q) => t(u).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          N(h(t(X)("Date")) + " ", 1),
          re(D(He, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "last_modified"]
          ])
        ]))
      ])) : M("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: v,
        class: Q(["vuefinder__explorer__selector-area", "scroller-" + t(C)]),
        onScroll: H[5] || (H[5] = //@ts-ignore
        (...q) => t(le) && t(le)(...q))
      }, [
        t(i).get("loadingIndicator") === "linear" && t(T) ? (a(), f("div", Ja)) : M("", !0),
        t(i).get("loadingIndicator") === "circular" && t(T) ? (a(), f("div", Za)) : M("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: m,
          class: "scrollContent min-h-full",
          style: Ee({ height: `${t(B)}px`, position: "relative", width: "100%" }),
          onContextmenu: xe(Te, ["self", "prevent"]),
          onClick: H[4] || (H[4] = xe(
            //@ts-ignore
            (...q) => t(Z) && t(Z)(...q),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: l,
            class: "vuefinder__explorer__drag-item"
          }, [
            D($a, {
              count: w.value && t(g)?.has(w.value) ? t(g)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          t(c).query.length ? (a(!0), f(te, { key: 0 }, oe(t(R), (q) => (a(), I(Ye, {
            key: q,
            "row-index": q,
            "row-height": U.value,
            view: "list",
            items: V(q) ? [V(q)] : [],
            compact: t(d).compactListView,
            "show-path": !0,
            "is-dragging-item": b,
            "is-selected": S,
            "drag-n-drop-events": (ve) => t(o).events(ve),
            explorerId: t(C),
            onClick: J,
            onDblclick: he,
            onContextmenu: Me,
            onDragstart: Oe,
            onDragend: ze
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(d).view === "grid" ? (a(!0), f(te, { key: 1 }, oe(t(R), (q) => (a(), I(Ye, {
            key: q,
            "row-index": q,
            "row-height": U.value,
            view: "grid",
            "items-per-row": t(se),
            items: t(O)(t(p), q),
            "show-thumbnails": t(d).showThumbnails,
            "is-dragging-item": b,
            "is-selected": S,
            "drag-n-drop-events": (ve) => t(o).events(ve),
            explorerId: t(C),
            onClick: J,
            onDblclick: he,
            onContextmenu: Me,
            onDragstart: Oe,
            onDragend: ze
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (a(!0), f(te, { key: 2 }, oe(t(R), (q) => (a(), I(Ye, {
            key: q,
            "row-index": q,
            "row-height": U.value,
            view: "list",
            items: V(q) ? [V(q)] : [],
            compact: t(d).compactListView,
            "is-dragging-item": b,
            "is-selected": S,
            "drag-n-drop-events": (ve) => t(o).events(ve),
            explorerId: t(C),
            onClick: J,
            onDblclick: he,
            onContextmenu: Me,
            onDragstart: Oe,
            onDragend: ze
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      D(Ya)
    ]));
  }
}), ti = ["href", "download"], ni = ["onClick"], oi = /* @__PURE__ */ K({
  __name: "ContextMenu",
  setup(n) {
    const e = j("ServiceContainer"), o = e.search, l = W(o.state), r = y(null), v = y([]), m = Ue({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (d) => {
      v.value = d;
    });
    const _ = (d) => d.link(e, v.value), u = (d) => {
      e.emitter.emit("vf-contextmenu-hide"), d.action(e, v.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: d, items: c, target: p = null }) => {
      if (m.items = e.contextMenuItems.filter((g) => g.show(e, {
        searchQuery: l.query,
        items: c,
        target: p
      })), l.query)
        if (p)
          e.emitter.emit("vf-context-selected", [p]);
        else
          return;
      else !p && !l.query ? e.emitter.emit("vf-context-selected", []) : c.length > 1 && c.some((g) => g.path === p.path) ? e.emitter.emit("vf-context-selected", c) : e.emitter.emit("vf-context-selected", [p]);
      i(d);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      m.active = !1;
    });
    const i = (d) => {
      const c = e.root, p = e.root.getBoundingClientRect(), g = c.getBoundingClientRect();
      let T = d.clientX - p.left, S = d.clientY - p.top;
      m.active = !0, Ve(() => {
        const $ = r.value?.getBoundingClientRect();
        let x = $?.height ?? 0, E = $?.width ?? 0;
        T = g.right - d.pageX + window.scrollX < E ? T - E : T, S = g.bottom - d.pageY + window.scrollY < x ? S - x : S, m.positions = {
          left: String(T) + "px",
          top: String(S) + "px"
        };
      });
    };
    return (d, c) => re((a(), f("ul", {
      ref_key: "contextmenu",
      ref: r,
      class: Q([m.active ? "vuefinder__context-menu--active" : "vuefinder__context-menu--inactive", "vuefinder__context-menu"]),
      style: Ee(m.positions)
    }, [
      (a(!0), f(te, null, oe(m.items, (p) => (a(), f("li", {
        class: "vuefinder__context-menu__item",
        key: p.title
      }, [
        p.link ? (a(), f("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: _(p),
          download: _(p),
          onClick: c[0] || (c[0] = (g) => t(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, h(p.title(t(e).i18n)), 1)
        ], 8, ti)) : (a(), f("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => u(p)
        }, [
          s("span", null, h(p.title(t(e).i18n)), 1)
        ], 8, ni))
      ]))), 128))
    ], 6)), [
      [ge, m.active]
    ]);
  }
}), si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function ri(n, e) {
  return a(), f("svg", si, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const St = { render: ri }, li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function ai(n, e) {
  return a(), f("svg", li, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const ii = { render: ai }, di = { class: "vuefinder__status-bar__wrapper" }, ci = { class: "vuefinder__status-bar__storage" }, ui = ["title"], vi = { class: "vuefinder__status-bar__storage-icon" }, _i = ["value"], mi = ["value"], fi = { class: "vuefinder__status-bar__info" }, hi = { key: 0 }, pi = { class: "vuefinder__status-bar__selected-count" }, gi = { class: "vuefinder__status-bar__actions" }, wi = ["disabled"], bi = ["title"], yi = /* @__PURE__ */ K({
  __name: "Statusbar",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = e.search, v = W(r.state), m = W(l.sortedFiles), _ = W(l.path), u = W(l.selectedCount), i = W(l.storages), d = (p) => {
      const g = p.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: g } });
    }, c = ne(() => {
      const p = e.selectButton.multiple ? u.value > 0 : u.value === 1;
      return e.selectButton.active && p;
    });
    return (p, g) => (a(), f("div", di, [
      s("div", ci, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: t(o)("Storage")
        }, [
          s("div", vi, [
            D(t(St))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: t(_)?.storage,
            onChange: d,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (a(!0), f(te, null, oe(t(i), (T) => (a(), f("option", {
              value: T,
              key: T
            }, h(T), 9, mi))), 128))
          ], 40, _i)
        ], 8, ui),
        s("div", fi, [
          t(v).hasQuery ? (a(), f("span", hi, h(t(m).value.length) + " items found. ", 1)) : M("", !0),
          s("span", pi, h(t(u) > 0 ? `${t(u)} item(s) selected.` : ""), 1)
        ])
      ]),
      s("div", gi, [
        t(e).selectButton.active ? (a(), f("button", {
          key: 0,
          class: Q(["vf-btn vf-btn-primary vf-btn-small", { disabled: !c.value }]),
          disabled: !c.value,
          onClick: g[0] || (g[0] = (T) => t(e).selectButton.click(t(l).selectedItems, T))
        }, h(t(o)("Select")), 11, wi)) : M("", !0),
        s("span", {
          class: "vuefinder__status-bar__about",
          title: t(o)("About"),
          onClick: g[1] || (g[1] = (T) => t(e).modal.open(ut))
        }, [
          D(t(ii))
        ], 8, bi)
      ])
    ]));
  }
}), ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function xi(n, e) {
  return a(), f("svg", ki, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const $t = { render: xi }, Si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function $i(n, e) {
  return a(), f("svg", Si, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Ci = { render: $i }, Ei = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Mi(n, e) {
  return a(), f("svg", Ei, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ])]);
}
const Ct = { render: Mi }, Ti = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ai(n, e) {
  return a(), f("svg", Ti, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 12h6" }, null, -1)
  ])]);
}
const Et = { render: Ai };
function Mt(n, e) {
  const o = n.findIndex((l) => l.path === e.path);
  o > -1 ? n[o] = e : n.push(e);
}
const Di = { class: "vuefinder__folder-loader-indicator" }, Ii = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Tt = /* @__PURE__ */ K({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Bt({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, o = j("ServiceContainer"), { t: l } = o.i18n, r = it(n, "modelValue"), v = y(!1);
    de(
      () => r.value,
      () => m()?.folders.length || _()
    );
    function m() {
      return o.treeViewData.find((u) => u.path === e.path);
    }
    const _ = () => {
      v.value = !0, o.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          storage: e.storage,
          path: e.path
        }
      }).then((u) => {
        Mt(o.treeViewData, { path: e.path, type: "dir", ...u });
      }).catch((u) => {
      }).finally(() => {
        v.value = !1;
      });
    };
    return (u, i) => (a(), f("div", Di, [
      v.value ? (a(), I(t(nt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (a(), f("div", Ii, [
        r.value && m()?.folders.length ? (a(), I(t(Et), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : M("", !0),
        r.value ? M("", !0) : (a(), I(t(Ct), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Fi = ["onClick"], Li = ["title", "onDblclick", "onClick"], Vi = { class: "vuefinder__treesubfolderlist__item-icon" }, Ri = { class: "vuefinder__treesubfolderlist__subfolder" }, Bi = /* @__PURE__ */ K({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = j("ServiceContainer"), o = e.fs, l = Be(e, ["bg-blue-200", "dark:bg-slate-600"]), r = y({}), v = W(o.path), m = n, _ = y(null);
    ce(() => {
      m.path === m.storage + "://" && _.value && Ze(_.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const u = ne(() => e.treeViewData.find((i) => i.path === m.path)?.folders || []);
    return (i, d) => {
      const c = Ht("TreeSubfolderList", !0);
      return a(), f("ul", {
        ref_key: "parentSubfolderList",
        ref: _,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (a(!0), f(te, null, oe(u.value, (p) => (a(), f("li", {
          key: p.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", ke(Ce(t(l).events({ ...p, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (g) => r.value[p.path] = !r.value[p.path]
            }, [
              D(Tt, {
                storage: n.storage,
                path: p.path,
                modelValue: r.value[p.path],
                "onUpdate:modelValue": (g) => r.value[p.path] = g
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Fi),
            s("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: p.path,
              onDblclick: (g) => r.value[p.path] = !r.value[p.path],
              onClick: (g) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: m.storage, path: p.path } })
            }, [
              s("div", Vi, [
                t(v)?.path === p.path ? (a(), I(t($t), { key: 0 })) : (a(), I(t(Pe), { key: 1 }))
              ]),
              s("div", {
                class: Q(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(v)?.path === p.path
                }])
              }, h(p.basename), 3)
            ], 40, Li)
          ], 16),
          s("div", Ri, [
            re(D(c, {
              storage: m.storage,
              path: p.path
            }, null, 8, ["storage", "path"]), [
              [ge, r.value[p.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Hi = /* @__PURE__ */ K({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = j("ServiceContainer"), o = e.fs, l = y(!1), r = n, v = Be(e, ["bg-blue-200", "dark:bg-slate-600"]), m = W(o.path), _ = ne(() => r.storage === m.value?.storage), u = {
      storage: r.storage,
      path: r.storage + "://",
      type: "dir",
      basename: r.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function i(d) {
      d === m.value?.storage ? l.value = !l.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: d } }));
    }
    return (d, c) => (a(), f(te, null, [
      s("div", {
        onClick: c[2] || (c[2] = (p) => i(n.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        s("div", ke(Ce(t(v).events(u), !0), {
          class: ["vuefinder__treestorageitem__info", _.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          s("div", {
            class: Q(["vuefinder__treestorageitem__icon", _.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            D(t(St))
          ], 2),
          s("div", null, h(n.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: c[1] || (c[1] = xe((p) => l.value = !l.value, ["stop"]))
        }, [
          D(Tt, {
            storage: n.storage,
            path: n.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": c[0] || (c[0] = (p) => l.value = p)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      re(D(Bi, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ge, l.value]
      ])
    ], 64));
  }
}), qi = { class: "vuefinder__folder-indicator" }, Ni = { class: "vuefinder__folder-indicator--icon" }, Ui = /* @__PURE__ */ K({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = it(n, "modelValue");
    return (o, l) => (a(), f("div", qi, [
      s("div", Ni, [
        e.value ? (a(), I(t(Et), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : M("", !0),
        e.value ? M("", !0) : (a(), I(t(Ct), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Pi = { class: "vuefinder__treeview__header" }, Oi = { class: "vuefinder__treeview__pinned-label" }, zi = { class: "vuefinder__treeview__pin-text text-nowrap" }, Ki = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, ji = ["onClick"], Gi = ["title"], Yi = ["onClick"], Wi = { key: 0 }, Qi = { class: "vuefinder__treeview__no-pinned" }, Xi = /* @__PURE__ */ K({
  __name: "TreeView",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, { getStore: l, setStore: r } = e.storage, v = e.fs, m = e.config, _ = W(m.state), u = W(v.sortedFiles), i = W(v.path), d = Be(e, ["bg-blue-200", "dark:bg-slate-600"]), c = y(190), p = y(l("pinned-folders-opened", !0));
    de(p, ($) => r("pinned-folders-opened", $));
    const g = ($) => {
      m.set("pinnedFolders", m.get("pinnedFolders").filter((x) => x.path !== $.path));
    }, T = ($) => {
      const x = $.clientX, E = $.target.parentElement;
      if (!E) return;
      const F = E.getBoundingClientRect().width;
      E.classList.remove("transition-[width]"), E.classList.add("transition-none");
      const U = (se) => {
        c.value = F + se.clientX - x, c.value < 50 && (c.value = 0, m.set("showTreeView", !1)), c.value > 50 && m.set("showTreeView", !0);
      }, X = () => {
        const se = E.getBoundingClientRect();
        c.value = se.width, E.classList.add("transition-[width]"), E.classList.remove("transition-none"), window.removeEventListener("mousemove", U), window.removeEventListener("mouseup", X);
      };
      window.addEventListener("mousemove", U), window.addEventListener("mouseup", X);
    }, S = y(null);
    return ce(() => {
      S.value && Ze(S.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), de(u, ($) => {
      const x = $.filter((E) => E.type === "dir");
      Mt(e.treeViewData, {
        path: i.value?.path || "",
        folders: x.map((E) => ({
          storage: E.storage,
          path: E.path,
          basename: E.basename,
          type: "dir"
        }))
      });
    }), ($, x) => (a(), f(te, null, [
      s("div", {
        onClick: x[0] || (x[0] = (E) => t(m).toggle("showTreeView")),
        class: Q(["vuefinder__treeview__overlay", t(_).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      s("div", {
        style: Ee(t(_).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: S,
          class: "vuefinder__treeview__scroll"
        }, [
          s("div", Pi, [
            s("div", {
              onClick: x[2] || (x[2] = (E) => p.value = !p.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              s("div", Oi, [
                D(t(xt), { class: "vuefinder__treeview__pin-icon" }),
                s("div", zi, h(t(o)("Pinned Folders")), 1)
              ]),
              D(Ui, {
                modelValue: p.value,
                "onUpdate:modelValue": x[1] || (x[1] = (E) => p.value = E)
              }, null, 8, ["modelValue"])
            ]),
            p.value ? (a(), f("ul", Ki, [
              (a(!0), f(te, null, oe(t(_).pinnedFolders, (E) => (a(), f("li", {
                key: E.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", ke(Ce(t(d).events(E), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (F) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: E.storage, path: E.path } })
                }), [
                  t(i)?.path !== E.path ? (a(), I(t(Pe), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : M("", !0),
                  t(i)?.path === E.path ? (a(), I(t($t), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : M("", !0),
                  s("div", {
                    title: E.path,
                    class: Q(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": t(i)?.path === E.path
                    }])
                  }, h(E.basename), 11, Gi)
                ], 16, ji),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (F) => g(E)
                }, [
                  D(t(Ci), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Yi)
              ]))), 128)),
              t(_).pinnedFolders.length ? M("", !0) : (a(), f("li", Wi, [
                s("div", Qi, h(t(o)("No folders pinned")), 1)
              ]))
            ])) : M("", !0)
          ]),
          (a(!0), f(te, null, oe(t(v).storages.get(), (E) => (a(), f("div", {
            class: "vuefinder__treeview__storage",
            key: E
          }, [
            D(Hi, { storage: E }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        s("div", {
          onMousedown: T,
          class: "vuefinder__treeview__resize-handle"
        }, null, 32)
      ], 4)
    ], 64));
  }
}), fe = {
  newfolder: "newfolder",
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
  move: "move"
};
function Ji(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function ue(n) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, n);
  return (o, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== Ji(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !o.features.includes(e.feature));
}
function We(...n) {
  return (e, o) => n.some((l) => l(e, o));
}
function Le(...n) {
  return (e, o) => n.every((l) => l(e, o));
}
const Zi = [
  {
    id: fe.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      n.emitter.emit("vf-search-exit"), n.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0]?.storage, path: e[0]?.path }
      });
    },
    show: ue({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: fe.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.emitter.emit("vf-fetch", { params: { q: "index", storage: e.path.get().storage, path: e.path.get().path } });
    },
    show: We(ue({ target: "none" }), ue({ target: "many" }))
  },
  {
    id: fe.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll();
    },
    show: ue({ target: "none" })
  },
  {
    id: fe.newfolder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(ht),
    show: ue({ target: "none", feature: ee.NEW_FOLDER })
  },
  {
    id: fe.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      n.emitter.emit("vf-search-exit"), e[0] && n.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0].storage, path: e[0].path }
      });
    },
    show: ue({ target: "one", targetType: "dir" })
  },
  {
    id: fe.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const o = n.config, l = o.get("pinnedFolders"), r = l.concat(e.filter((v) => l.findIndex((m) => m.path === v.path) === -1));
      o.set("pinnedFolders", r);
    },
    show: Le(
      ue({ target: "one", targetType: "dir" }),
      (n, e) => n.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) === -1
    )
  },
  {
    id: fe.unpinFolder,
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      const o = n.config, l = o.get("pinnedFolders");
      o.set("pinnedFolders", l.filter((r) => !e.find((v) => v.path === r.path)));
    },
    show: Le(
      ue({ target: "one", targetType: "dir" }),
      (n, e) => n.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) !== -1
    )
  },
  {
    id: fe.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(mt, { storage: e[0]?.storage, item: e[0] }),
    show: Le(
      ue({ target: "one", feature: ee.PREVIEW }),
      (n, e) => e.target?.type !== "dir"
    )
  },
  {
    id: fe.download,
    link: (n, e) => n.requester.getDownloadUrl(e[0]?.storage, e[0]),
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: Le(
      ue({ target: "one", feature: ee.DOWNLOAD }),
      (n, e) => e.target?.type !== "dir"
    )
  },
  {
    id: fe.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(tt, { items: e }),
    show: ue({ target: "one", feature: ee.RENAME })
  },
  //   {
  //     id: ContextMenuIds.move,
  //     title: ({t}) => t('Move'),
  //     action: (app, selectedItems) => {
  //       const fs = app.fs;
  //       const target = { storage: fs.path.storage || '', path: fs.path.path || '', type: 'dir' as const };
  //       app.modal.open(ModalMove, { items: { from: selectedItems, to: target } });
  //     },
  //     show: showIfAny(
  //       showIf({target: 'one', feature: FEATURES.MOVE}),
  //       showIf({target: 'many', feature: FEATURES.MOVE})
  //     )
  //   },
  {
    id: fe.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(kt, { items: e }),
    show: We(
      ue({ target: "many", feature: ee.ARCHIVE }),
      Le(
        ue({ target: "one", feature: ee.ARCHIVE }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: fe.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(bt, { items: e }),
    show: ue({ target: "one", feature: ee.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: fe.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(et, { items: e });
    },
    show: We(
      ue({ feature: ee.DELETE, target: "one" }),
      ue({ feature: ee.DELETE, target: "many" })
    )
  }
], ed = {
  class: "vuefinder",
  ref: "root",
  tabindex: "0"
}, td = { class: "vuefinder__main__content" }, nd = /* @__PURE__ */ K({
  __name: "VueFinder",
  props: {
    id: { default: "vf" },
    request: {},
    persist: { type: Boolean, default: !1 },
    path: { default: "" },
    features: { type: [Boolean, Array], default: !0 },
    debug: { type: Boolean, default: !1 },
    theme: { default: "system" },
    locale: { default: void 0 },
    maxHeight: { default: "600px" },
    maxFileSize: { default: "10mb" },
    fullScreen: { type: Boolean, default: !1 },
    showTreeView: { type: Boolean, default: !1 },
    pinnedFolders: { default: () => [] },
    showThumbnails: { type: Boolean, default: !0 },
    selectButton: { default: () => ({
      active: !1,
      multiple: !1,
      click: () => {
      }
    }) },
    loadingIndicator: { default: "linear" },
    contextMenuItems: { default: () => Zi },
    onError: {},
    onSelect: {},
    "onUpdate:path": {},
    icon: {}
  },
  emits: ["select", "update:path"],
  setup(n, { emit: e }) {
    const o = e, l = n, r = dn(l, j("VueFinderOptions"));
    qt("ServiceContainer", r);
    const v = r.config, m = r.fs, _ = W(v.state), u = W(m.selectedItems);
    Qs(r);
    let i = null;
    r.emitter.on("vf-fetch-abort", () => {
      i && i.abort(), m.setLoading(!1);
    }), r.emitter.on("vf-fetch", ({ params: c, body: p = null, onSuccess: g = null, onError: T = null, noCloseModal: S = !1 }) => {
      ["index", "search"].includes(c.q) && (i && i.abort(), m.setLoading(!0)), i = new AbortController();
      const $ = i.signal;
      r.requester.send({
        url: "",
        method: c.m || "get",
        params: c,
        body: p,
        abortSignal: $
      }).then((x) => {
        m.setPath(x.dirname), v.get("persist") && v.set("path", x.dirname), S || r.modal.close(), m.setFiles(x.files), m.clearSelection(), m.setSelectedCount(0), m.setStorages(x.storages), g && g(x);
      }).catch((x) => {
        console.error(x), T ? T(x) : x && typeof x == "object" && "message" in x && r.emitter.emit("vf-toast-push", { label: x.message, type: "error" });
      }).finally(() => {
        ["index", "search"].includes(c.q) && m.setLoading(!1);
      });
    });
    function d(c) {
      let p = {};
      c && c.includes("://") && (p = {
        storage: c.split("://")[0],
        path: c
      }), r.emitter.emit("vf-fetch", {
        params: { q: "index", storage: m.path.get().storage, ...p },
        onError: l.onError ?? ((g) => {
          g && typeof g == "object" && "message" in g && r.emitter.emit("vf-toast-push", { label: g.message, type: "error" });
        })
      });
    }
    return ce(() => {
      de(() => l.path, (p) => {
        d(p);
      });
      const c = v.get("persist") ? v.get("path") : l.path;
      m.setPath(c), d(c), r.emitter.on("vf-select", (p) => {
        r.selectedItems = p, o("select", p);
      }), de(() => m.path.get().path, (p) => {
        o("update:path", p);
      }), de(u, (p) => {
        o("select", p);
      });
    }), (c, p) => (a(), f("div", ed, [
      s("div", {
        class: Q(t(r).theme.actualValue)
      }, [
        s("div", {
          class: Q([t(_).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: Ee(t(_).fullScreen ? "" : "max-height: " + n.maxHeight),
          onMousedown: p[0] || (p[0] = (g) => t(r).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (g) => t(r).emitter.emit("vf-contextmenu-hide"))
        }, [
          D(yl),
          D(ua),
          s("div", td, [
            D(Xi),
            D(ei)
          ]),
          D(yi)
        ], 38),
        D(Nt, { name: "fade" }, {
          default: z(() => [
            t(r).modal.visible ? (a(), I(Je(t(r).modal.type), { key: 0 })) : M("", !0)
          ]),
          _: 1
        }),
        D(oi)
      ], 2)
    ], 512));
  }
}), md = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    let [o] = Object.keys(e.i18n);
    e.locale = e.locale ?? o ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", nd);
  }
};
export {
  fe as ContextMenuIds,
  nd as VueFinder,
  md as VueFinderPlugin,
  Zi as contextMenuItems,
  md as default
};
