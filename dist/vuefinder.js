import { reactive as Ue, watch as ve, ref as x, shallowRef as rt, useTemplateRef as De, defineComponent as G, inject as Y, onMounted as de, nextTick as Be, createElementBlock as f, openBlock as a, withKeys as Ve, unref as t, createElementVNode as s, withModifiers as we, renderSlot as Pe, createBlock as I, resolveDynamicComponent as Qe, toDisplayString as h, onUnmounted as He, normalizeClass as X, computed as re, withCtx as j, createVNode as D, createCommentVNode as M, Fragment as oe, renderList as ae, createTextVNode as N, withDirectives as ie, vModelSelect as tt, vModelText as Le, onBeforeUnmount as It, customRef as Ft, mergeProps as ke, toHandlers as Ee, vShow as ge, isRef as Vt, Teleport as Lt, normalizeStyle as Me, normalizeProps as Rt, TransitionGroup as Bt, onUpdated as Ht, mergeModels as qt, useModel as lt, resolveComponent as Nt, provide as Pt, Transition as Ut } from "vue";
import { useStore as U } from "@nanostores/vue";
import Ot from "mitt";
import { persistentAtom as zt } from "@nanostores/persistent";
import { atom as he, computed as Fe } from "nanostores";
import { Cropper as Kt } from "vue-advanced-cropper";
import at from "vanilla-lazyload";
import jt from "@uppy/core";
import Gt from "@uppy/xhr-upload";
import Yt from "@viselect/vanilla";
import { OverlayScrollbars as Xe } from "overlayscrollbars";
const Ke = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
class Wt {
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
    Ke != null && Ke !== "" && o.xsrfHeaderName && (l[o.xsrfHeaderName] = Ke);
    const r = Object.assign({}, o.headers, l, e.headers), v = Object.assign({}, o.params, e.params), c = o.baseUrl + e.url, m = e.method;
    let u;
    if (m !== "get")
      if (e.body instanceof FormData) {
        const d = e.body;
        o.body != null && Object.entries(this.config.body).forEach(([i, p]) => {
          d.append(i, String(p));
        }), u = d;
      } else {
        const d = Object.assign({}, e.body ?? {});
        o.body != null && Object.assign(d, this.config.body), u = d;
      }
    const _ = { url: c, method: m, headers: r, params: v, body: u };
    if (o.transformRequest != null) {
      const d = o.transformRequest({ url: c, method: m, headers: r, params: v, body: u ?? null });
      d.url != null && (_.url = d.url), d.method != null && (_.method = d.method), d.params != null && (_.params = d.params), d.headers != null && (_.headers = d.headers), d.body != null && (_.body = d.body);
    }
    return _;
  }
  getDownloadUrl(e, o) {
    if (o.url != null) return o.url;
    const l = this.transformRequestParams({ url: "", method: "get", params: { q: "download", storage: e, adapter: e, path: o.path } });
    return l.url + "?" + new URLSearchParams(l.params).toString();
  }
  getPreviewUrl(e, o) {
    if (o.url != null) return o.url;
    const l = this.transformRequestParams({ url: "", method: "get", params: { q: "preview", storage: e, adapter: e, path: o.path } });
    return l.url + "?" + new URLSearchParams(l.params).toString();
  }
  async send(e) {
    const o = this.transformRequestParams(e), l = e.responseType || "json", r = { method: e.method, headers: o.headers, signal: e.abortSignal }, v = o.url + "?" + new URLSearchParams(o.params);
    if (o.method !== "get" && o.body != null) {
      let m;
      o.body instanceof FormData ? m = e.body : (m = JSON.stringify(o.body), r.headers["Content-Type"] = "application/json"), r.body = m;
    }
    this.config.fetchParams && Object.assign(r, this.config.fetchParams);
    const c = await this.customFetch(v, r);
    if (c.ok) return await c[l]();
    throw await c.json();
  }
}
function Qt(n) {
  const e = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof n == "string" ? Object.assign(e, { baseUrl: n }) : Object.assign(e, n), new Wt(e);
}
function Xt(n) {
  let e = localStorage.getItem(n + "_storage");
  const o = Ue(JSON.parse(e ?? "{}"));
  ve(o, l);
  function l() {
    Object.keys(o).length ? localStorage.setItem(n + "_storage", JSON.stringify(o)) : localStorage.removeItem(n + "_storage");
  }
  function r(u, _) {
    o[u] = _;
  }
  function v(u) {
    delete o[u];
  }
  function c() {
    Object.keys(o).forEach((u) => v(u));
  }
  return { getStore: (u, _ = null) => u in o ? o[u] : _, setStore: r, removeStore: v, clearStore: c };
}
async function Jt(n, e) {
  const o = e[n];
  return typeof o == "function" ? (await o()).default : o;
}
function Zt(n, e, o, l) {
  const { getStore: r, setStore: v } = n, c = x({}), m = x(r("locale", e)), u = (i, p = e) => {
    Jt(i, l).then((g) => {
      c.value = g, v("locale", i), m.value = i, v("translations", g), Object.values(l).length > 1 && (o.emit("vf-toast-push", { label: "The language is set to " + i }), o.emit("vf-language-saved"));
    }).catch(() => {
      p ? (o.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), u(p, null)) : o.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  ve(m, (i) => {
    u(i);
  }), !r("locale") && !Object.keys(l).length ? u(e) : c.value = r("translations");
  const _ = (i, ...p) => p.length ? _(i = i.replace("%s", String(p.shift())), ...p) : i;
  function d(i, ...p) {
    return c.value && Object.prototype.hasOwnProperty.call(c.value, i) ? _(c.value[i] || i, ...p) : _(i, ...p);
  }
  return Ue({ t: d, locale: m });
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
}, en = Object.values(ee), tn = "3.0.0-dev";
function it(n, e, o, l, r) {
  return e = Math, o = e.log, l = 1024, r = o(n) / o(l) | 0, (n / e.pow(l, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "iB" : "B");
}
function dt(n, e, o, l, r) {
  return e = Math, o = e.log, l = 1e3, r = o(n) / o(l) | 0, (n / e.pow(l, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "B" : "B");
}
function nn(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!l) return 0;
  const r = parseFloat(l[1] || "0"), v = (l[2] || "").toLowerCase(), c = e[v] ?? 0;
  return Math.round(r * Math.pow(1024, c));
}
const Ce = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function on(n, e) {
  const o = x(Ce.SYSTEM), l = x(Ce.LIGHT);
  o.value = n.getStore("theme", e ?? Ce.SYSTEM);
  const r = window.matchMedia("(prefers-color-scheme: dark)"), v = (c) => {
    o.value === Ce.DARK || o.value === Ce.SYSTEM && c.matches ? l.value = Ce.DARK : l.value = Ce.LIGHT;
  };
  return v(r), r.addEventListener("change", v), {
    value: o,
    actualValue: l,
    set(c) {
      o.value = c, c !== Ce.SYSTEM ? n.setStore("theme", c) : n.removeStore("theme"), v(r);
    }
  };
}
function sn() {
  const n = rt(null), e = x(!1), o = x();
  return { visible: e, type: n, data: o, open: (v, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, n.value = v, o.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, n.value = null;
  } };
}
const je = {
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
}, rn = (n) => {
  const e = `vuefinder_config_${n}`, o = zt(e, je, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), l = (_ = {}) => {
    const d = o.get(), i = { ...je, ..._, ...d };
    o.set(i);
  }, r = (_) => o.get()[_], v = () => o.get(), c = (_, d) => {
    const i = o.get();
    typeof _ == "object" && _ !== null ? o.set({ ...i, ..._ }) : o.set({ ...i, [_]: d });
  };
  return {
    // Store atom
    state: o,
    // Methods
    init: l,
    get: r,
    set: c,
    toggle: (_) => {
      const d = o.get();
      c(_, !d[_]);
    },
    all: v,
    reset: () => {
      o.set({ ...je });
    }
  };
};
function ln(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const o = Number(n) || 0, l = Number(e) || 0;
  return o === l ? 0 : o < l ? -1 : 1;
}
const an = () => {
  const n = he(""), e = he([]), o = he([]), l = he({ active: !1, column: "", order: "" }), r = he(/* @__PURE__ */ new Set()), v = he({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = he(null), m = he(0), u = he(!1), _ = Fe([n], (y) => {
    const C = (y || "local://").trim(), te = C.indexOf("://"), ce = te >= 0 ? C.slice(0, te) : "", Te = (te >= 0 ? C.slice(te + 3) : C).split("/").filter(Boolean);
    let ye = "";
    const Ae = Te.map(($e) => (ye = ye ? `${ye}/${$e}` : $e, { basename: $e, name: $e, path: ce ? `${ce}://${ye}` : ye, type: "dir" }));
    return { storage: ce, breadcrumb: Ae, path: C };
  }), d = Fe([o, l], (y, C) => {
    const { active: te, column: ce, order: Se } = C;
    if (!te || !ce) return y;
    const Te = Se === "asc" ? 1 : -1;
    return y.slice().sort((ye, Ae) => ln(ye[ce], Ae[ce]) * Te);
  }), i = Fe([o, r], (y, C) => C.size === 0 ? [] : y.filter((te) => C.has(te.path))), p = (y) => {
    n.set(y);
  }, g = (y) => {
    o.set(y ?? []);
  }, S = (y) => {
    e.set(y ?? []);
  }, T = (y, C) => {
    l.set({ active: !0, column: y, order: C });
  }, b = (y) => {
    const C = l.get();
    C.active && C.column === y ? l.set({
      active: C.order === "asc",
      column: y,
      order: "desc"
    }) : l.set({
      active: !0,
      column: y,
      order: "asc"
    });
  }, k = () => {
    l.set({ active: !1, column: "", order: "" });
  }, E = (y) => {
    const C = new Set(r.get());
    C.add(y), r.set(C), m.set(C.size);
  }, F = (y) => {
    const C = new Set(r.get());
    C.delete(y), r.set(C), m.set(C.size);
  }, R = (y) => {
    const C = new Set(r.get());
    C.has(y) ? C.delete(y) : C.add(y), r.set(C), m.set(C.size);
  }, J = () => {
    const y = new Set(o.get().map((C) => C.path));
    r.set(y), m.set(y.size);
  }, le = () => {
    r.set(/* @__PURE__ */ new Set()), m.set(0);
  }, Q = (y) => {
    const C = new Set(y ?? []);
    r.set(C), m.set(C.size);
  }, K = (y) => {
    m.set(y);
  }, W = (y) => {
    u.set(!!y);
  }, ne = () => u.get(), P = (y, C) => {
    const te = o.get().filter((ce) => C.has(ce.path));
    v.set({
      type: y,
      path: _.get().path,
      items: new Set(te)
    });
  }, se = (y) => Fe([v], (C) => C.type === "cut" && Array.from(C.items).some((te) => te.path === y)), w = (y) => Fe([v], (C) => C.type === "copy" && Array.from(C.items).some((te) => te.path === y));
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: n,
    sort: l,
    selectedKeys: r,
    selectedCount: m,
    loading: u,
    draggedItem: c,
    clipboardItems: v,
    // Computed values
    path: _,
    sortedFiles: d,
    selectedItems: i,
    // Actions
    setPath: p,
    setFiles: g,
    setStorages: S,
    setSort: T,
    toggleSort: b,
    clearSort: k,
    select: E,
    deselect: F,
    toggleSelect: R,
    selectAll: J,
    clearSelection: le,
    setSelection: Q,
    setSelectedCount: K,
    setLoading: W,
    isLoading: ne,
    setClipboard: P,
    createIsCut: se,
    createIsCopied: w,
    isCut: (y) => {
      const C = se(y);
      return U(C).value ?? !1;
    },
    isCopied: (y) => {
      const C = w(y);
      return U(C).value ?? !1;
    },
    clearClipboard: () => {
      v.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
    },
    getClipboard: () => v.get(),
    setDraggedItem: (y) => {
      c.set(y);
    },
    getDraggedItem: () => c.get(),
    clearDraggedItem: () => {
      c.set(null);
    }
  };
}, nt = {
  query: "",
  searchMode: !1
}, dn = () => {
  const n = he(nt), e = Fe(n, (_) => _.query.length > 0);
  return {
    // Store atom
    state: n,
    // Computed values
    hasQuery: e,
    // Methods
    setQuery: (_) => {
      const d = n.get();
      n.set({ ...d, query: _ ?? "" });
    },
    enterSearchMode: () => {
      const _ = n.get();
      n.set({ ..._, searchMode: !0 });
    },
    exitSearchMode: () => {
      n.set({ query: "", searchMode: !1 });
    },
    get: (_) => n.get()[_],
    set: (_, d) => {
      const i = n.get();
      typeof _ == "object" && _ !== null ? n.set({ ...i, ..._ }) : n.set({ ...i, [_]: d });
    },
    all: () => n.get(),
    reset: () => {
      n.set({ ...nt });
    }
  };
}, cn = (n, e) => {
  const o = Xt(n.id), l = Ot(), r = on(o, n.theme), v = e.i18n, c = n.locale ?? e.locale, m = rn(n.id), u = an(), _ = dn(), d = (i) => Array.isArray(i) ? i : en;
  return Ue({
    // app version
    version: tn,
    // config store
    config: m,
    // files store
    fs: u,
    // search store
    search: _,
    // root element
    root: De("root"),
    // app id
    debug: n.debug,
    // Event Bus
    emitter: l,
    // storage
    storage: o,
    // localization object
    i18n: Zt(o, c, l, v),
    // modal state
    modal: sn(),
    // http object
    requester: Qt(n.request),
    // active features
    features: d(n.features),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // theme state
    theme: r,
    // human readable file sizes
    filesize: m.get("metricUnits") ? dt : it,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // custom icon
    customIcon: n.icon,
    // selectButton state
    selectButton: n.selectButton
  });
}, un = { class: "vuefinder__modal-layout__container" }, vn = { class: "vuefinder__modal-layout__content" }, _n = { class: "vuefinder__modal-layout__footer" }, be = /* @__PURE__ */ G({
  __name: "ModalLayout",
  setup(n) {
    const e = x(null), o = Y("ServiceContainer");
    return de(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Be(() => {
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
      onKeyup: r[1] || (r[1] = Ve((v) => t(o).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      r[2] || (r[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", un, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: r[0] || (r[0] = we((v) => t(o).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", vn, [
              Pe(l.$slots, "default")
            ]),
            s("div", _n, [
              Pe(l.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}), mn = { class: "vuefinder__modal-header" }, fn = { class: "vuefinder__modal-header__icon-container" }, pn = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, xe = /* @__PURE__ */ G({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, o) => (a(), f("div", mn, [
      s("div", fn, [
        (a(), I(Qe(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("h3", pn, h(n.title), 1)
    ]));
  }
}), hn = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: o }) {
    const l = Y("ServiceContainer"), r = x(!1), { t: v } = l.i18n;
    let c = null;
    const m = () => {
      clearTimeout(c), r.value = !0, c = setTimeout(() => {
        r.value = !1;
      }, 2e3);
    };
    return de(() => {
      l.emitter.on(n.on, m);
    }), He(() => {
      clearTimeout(c);
    }), {
      shown: r,
      t: v
    };
  }
}, gn = (n, e) => {
  const o = n.__vccOpts || n;
  for (const [l, r] of e)
    o[l] = r;
  return o;
}, wn = { key: 1 };
function bn(n, e, o, l, r, v) {
  return a(), f("div", {
    class: X(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    n.$slots.default ? Pe(n.$slots, "default", { key: 0 }) : (a(), f("span", wn, h(l.t("Saved.")), 1))
  ], 2);
}
const Ie = /* @__PURE__ */ gn(hn, [["render", bn]]), yn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function kn(n, e) {
  return a(), f("svg", yn, [...e[0] || (e[0] = [
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
const xn = { render: kn }, Sn = { class: "vuefinder__about-modal__content" }, $n = { class: "vuefinder__about-modal__main" }, Cn = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, En = ["onClick", "aria-current"], Mn = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Tn = { class: "vuefinder__about-modal__description" }, An = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Dn = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, In = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Fn = { class: "vuefinder__about-modal__description" }, Vn = { class: "vuefinder__about-modal__settings" }, Ln = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Rn = { class: "vuefinder__about-modal__setting-input" }, Bn = ["checked"], Hn = { class: "vuefinder__about-modal__setting-label" }, qn = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Nn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Pn = { class: "vuefinder__about-modal__setting-input" }, Un = ["checked"], On = { class: "vuefinder__about-modal__setting-label" }, zn = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Kn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, jn = { class: "vuefinder__about-modal__setting-input" }, Gn = ["checked"], Yn = { class: "vuefinder__about-modal__setting-label" }, Wn = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Qn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Xn = { class: "vuefinder__about-modal__setting-input" }, Jn = ["checked"], Zn = { class: "vuefinder__about-modal__setting-label" }, eo = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, to = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, no = { class: "vuefinder__about-modal__setting-input" }, oo = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, so = { class: "vuefinder__about-modal__setting-label" }, ro = ["label"], lo = ["value"], ao = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, io = { class: "vuefinder__about-modal__setting-input" }, co = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, uo = { class: "vuefinder__about-modal__setting-label" }, vo = ["label"], _o = ["value"], mo = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, fo = { class: "vuefinder__about-modal__shortcuts" }, po = { class: "vuefinder__about-modal__shortcut" }, ho = { class: "vuefinder__about-modal__shortcut" }, go = { class: "vuefinder__about-modal__shortcut" }, wo = { class: "vuefinder__about-modal__shortcut" }, bo = { class: "vuefinder__about-modal__shortcut" }, yo = { class: "vuefinder__about-modal__shortcut" }, ko = { class: "vuefinder__about-modal__shortcut" }, xo = { class: "vuefinder__about-modal__shortcut" }, So = { class: "vuefinder__about-modal__shortcut" }, $o = { class: "vuefinder__about-modal__shortcut" }, Co = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Eo = { class: "vuefinder__about-modal__description" }, ct = /* @__PURE__ */ G({
  __name: "ModalAbout",
  setup(n) {
    const e = Y("ServiceContainer"), o = e.config, { clearStore: l } = e.storage, { t: r } = e.i18n, v = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = re(() => [
      { name: r("About"), key: v.ABOUT, current: !1 },
      { name: r("Settings"), key: v.SETTINGS, current: !1 },
      { name: r("Shortcuts"), key: v.SHORTCUTS, current: !1 },
      { name: r("Reset"), key: v.RESET, current: !1 }
    ]), m = x("about"), u = async () => {
      o.reset(), l(), location.reload();
    }, _ = (E) => {
      e.theme.set(E), e.emitter.emit("vf-theme-saved");
    }, d = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? dt : it, e.emitter.emit("vf-metric-units-saved");
    }, i = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      o.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, g = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: S } = Y("VueFinderOptions"), b = Object.fromEntries(
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
      }).filter(([E]) => Object.keys(S).includes(E))
    ), k = re(() => ({
      system: r("System"),
      light: r("Light"),
      dark: r("Dark")
    }));
    return (E, F) => (a(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: F[3] || (F[3] = (R) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(r)("Close")), 1)
      ]),
      default: j(() => [
        s("div", Sn, [
          D(xe, {
            icon: t(xn),
            title: "Vuefinder " + t(e).version
          }, null, 8, ["icon", "title"]),
          s("div", $n, [
            s("div", null, [
              s("div", null, [
                s("nav", Cn, [
                  (a(!0), f(oe, null, ae(c.value, (R) => (a(), f("button", {
                    key: R.name,
                    onClick: (J) => m.value = R.key,
                    class: X([R.key === m.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": R.current ? "page" : void 0
                  }, h(R.name), 11, En))), 128))
                ])
              ])
            ]),
            m.value === v.ABOUT ? (a(), f("div", Mn, [
              s("div", Tn, h(t(r)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              s("a", An, h(t(r)("Project home")), 1),
              s("a", Dn, h(t(r)("Follow on GitHub")), 1)
            ])) : M("", !0),
            m.value === v.SETTINGS ? (a(), f("div", In, [
              s("div", Fn, h(t(r)("Customize your experience with the following settings")), 1),
              s("div", Vn, [
                s("fieldset", null, [
                  s("div", Ln, [
                    s("div", Rn, [
                      s("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: t(o).get("metricUnits"),
                        onChange: d,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Bn)
                    ]),
                    s("div", Hn, [
                      s("label", qn, [
                        N(h(t(r)("Use Metric Units")) + " ", 1),
                        D(Ie, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: j(() => [
                            N(h(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Nn, [
                    s("div", Pn, [
                      s("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: t(o).get("compactListView"),
                        onChange: i,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Un)
                    ]),
                    s("div", On, [
                      s("label", zn, [
                        N(h(t(r)("Compact list view")) + " ", 1),
                        D(Ie, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: j(() => [
                            N(h(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Kn, [
                    s("div", jn, [
                      s("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: t(o).get("persist"),
                        onChange: g,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Gn)
                    ]),
                    s("div", Yn, [
                      s("label", Wn, [
                        N(h(t(r)("Persist path on reload")) + " ", 1),
                        D(Ie, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: j(() => [
                            N(h(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Qn, [
                    s("div", Xn, [
                      s("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: t(o).get("showThumbnails"),
                        onChange: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Jn)
                    ]),
                    s("div", Zn, [
                      s("label", eo, [
                        N(h(t(r)("Show thumbnails")) + " ", 1),
                        D(Ie, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: j(() => [
                            N(h(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", to, [
                    s("div", no, [
                      s("label", oo, h(t(r)("Theme")), 1)
                    ]),
                    s("div", so, [
                      ie(s("select", {
                        id: "theme",
                        "onUpdate:modelValue": F[0] || (F[0] = (R) => t(e).theme.value = R),
                        onChange: F[1] || (F[1] = (R) => _(R.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Theme")
                        }, [
                          (a(!0), f(oe, null, ae(k.value, (R, J) => (a(), f("option", { value: J }, h(R), 9, lo))), 256))
                        ], 8, ro)
                      ], 544), [
                        [tt, t(e).theme.value]
                      ]),
                      D(Ie, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: j(() => [
                          N(h(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t(e).features.includes(t(ee).LANGUAGE) && Object.keys(t(b)).length > 1 ? (a(), f("div", ao, [
                    s("div", io, [
                      s("label", co, h(t(r)("Language")), 1)
                    ]),
                    s("div", uo, [
                      ie(s("select", {
                        id: "language",
                        "onUpdate:modelValue": F[2] || (F[2] = (R) => t(e).i18n.locale = R),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Language")
                        }, [
                          (a(!0), f(oe, null, ae(t(b), (R, J) => (a(), f("option", { value: J }, h(R), 9, _o))), 256))
                        ], 8, vo)
                      ], 512), [
                        [tt, t(e).i18n.locale]
                      ]),
                      D(Ie, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: j(() => [
                          N(h(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : M("", !0)
                ])
              ])
            ])) : M("", !0),
            m.value === v.SHORTCUTS ? (a(), f("div", mo, [
              s("div", fo, [
                s("div", po, [
                  s("div", null, h(t(r)("Rename")), 1),
                  F[4] || (F[4] = s("kbd", null, "F2", -1))
                ]),
                s("div", ho, [
                  s("div", null, h(t(r)("Refresh")), 1),
                  F[5] || (F[5] = s("kbd", null, "F5", -1))
                ]),
                s("div", go, [
                  N(h(t(r)("Delete")) + " ", 1),
                  F[6] || (F[6] = s("kbd", null, "Del", -1))
                ]),
                s("div", wo, [
                  N(h(t(r)("Escape")) + " ", 1),
                  F[7] || (F[7] = s("div", null, [
                    s("kbd", null, "Esc")
                  ], -1))
                ]),
                s("div", bo, [
                  N(h(t(r)("Select All")) + " ", 1),
                  F[8] || (F[8] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "A")
                  ], -1))
                ]),
                s("div", yo, [
                  N(h(t(r)("Search")) + " ", 1),
                  F[9] || (F[9] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "F")
                  ], -1))
                ]),
                s("div", ko, [
                  N(h(t(r)("Toggle Sidebar")) + " ", 1),
                  F[10] || (F[10] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "E")
                  ], -1))
                ]),
                s("div", xo, [
                  N(h(t(r)("Open Settings")) + " ", 1),
                  F[11] || (F[11] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, ",")
                  ], -1))
                ]),
                s("div", So, [
                  N(h(t(r)("Toggle Full Screen")) + " ", 1),
                  F[12] || (F[12] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "Enter")
                  ], -1))
                ]),
                s("div", $o, [
                  N(h(t(r)("Preview")) + " ", 1),
                  F[13] || (F[13] = s("div", null, [
                    s("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : M("", !0),
            m.value === v.RESET ? (a(), f("div", Co, [
              s("div", Eo, h(t(r)("Reset all settings to default")), 1),
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
const ut = { render: To }, Ao = { class: "vuefinder__delete-modal__content" }, Do = { class: "vuefinder__delete-modal__form" }, Io = { class: "vuefinder__delete-modal__description" }, Fo = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Vo = { class: "vuefinder__delete-modal__file" }, Lo = {
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
}, Bo = { class: "vuefinder__delete-modal__file-name" }, Ho = { class: "vuefinder__delete-modal__warning" }, Je = /* @__PURE__ */ G({
  __name: "ModalDelete",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = U(l.path), v = x(e.modal.data.items), c = x(""), m = () => {
      v.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: v.value.map(({ path: u, type: _ }) => ({ path: u, type: _ }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("Files deleted.") });
        },
        onError: (u) => {
          c.value = o(u.message);
        }
      });
    };
    return (u, _) => (a(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-danger"
        }, h(t(o)("Yes, Delete!")), 1),
        s("button", {
          type: "button",
          onClick: _[1] || (_[1] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1),
        s("div", Ho, h(t(o)("This action cannot be undone.")), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(ut),
            title: t(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", Ao, [
            s("div", Do, [
              s("p", Io, h(t(o)("Are you sure you want to delete these files?")), 1),
              s("div", Fo, [
                (a(!0), f(oe, null, ae(v.value, (d) => (a(), f("p", Vo, [
                  d.type === "dir" ? (a(), f("svg", Lo, [..._[2] || (_[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), f("svg", Ro, [..._[3] || (_[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", Bo, h(d.basename), 1)
                ]))), 256))
              ]),
              c.value.length ? (a(), I(t(c), {
                key: 0,
                onHidden: _[0] || (_[0] = (d) => c.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(h(c.value), 1)
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
const vt = { render: No }, Po = { class: "vuefinder__rename-modal__content" }, Uo = { class: "vuefinder__rename-modal__item" }, Oo = { class: "vuefinder__rename-modal__item-info" }, zo = {
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
}, jo = { class: "vuefinder__rename-modal__item-name" }, Ze = /* @__PURE__ */ G({
  __name: "ModalRename",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = U(l.path), v = x(e.modal.data.items[0]), c = x(e.modal.data.items[0].basename), m = x(""), u = () => {
      c.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          item: v.value.path,
          name: c.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("%s is renamed.", c.value) });
        },
        onError: (_) => {
          m.value = o(_.message);
        }
      });
    };
    return (_, d) => (a(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Rename")), 1),
        s("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(vt),
            title: t(o)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", Po, [
            s("div", Uo, [
              s("p", Oo, [
                v.value.type === "dir" ? (a(), f("svg", zo, [...d[3] || (d[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (a(), f("svg", Ko, [...d[4] || (d[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", jo, h(v.value.basename), 1)
              ]),
              ie(s("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => c.value = i),
                onKeyup: Ve(u, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Le, c.value]
              ]),
              m.value.length ? (a(), I(t(m), {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => m.value = ""),
                error: ""
              }, {
                default: j(() => [
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
}), Go = ["title"], _t = /* @__PURE__ */ G({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const o = e, l = Y("ServiceContainer"), { t: r } = l.i18n, v = x(!1), c = x(null), m = x(c.value?.innerHTML);
    ve(m, () => v.value = !1);
    const u = () => {
      o("hidden"), v.value = !0;
    };
    return (_, d) => (a(), f("div", null, [
      v.value ? M("", !0) : (a(), f("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: X(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Pe(_.$slots, "default"),
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
        ])], 8, Go)
      ], 2))
    ]));
  }
}), Yo = { class: "vuefinder__text-preview" }, Wo = { class: "vuefinder__text-preview__header" }, Qo = ["title"], Xo = { class: "vuefinder__text-preview__actions" }, Jo = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Zo = { key: 1 }, es = /* @__PURE__ */ G({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = x(""), r = x(""), v = x(null), c = x(!1), m = x(""), u = x(!1), _ = Y("ServiceContainer"), { t: d } = _.i18n;
    de(() => {
      _.requester.send({
        url: "",
        method: "get",
        params: {
          q: "preview",
          storage: _.modal.data.storage,
          adapter: _.modal.data.storage,
          path: _.modal.data.item.path
        },
        responseType: "text"
      }).then((g) => {
        l.value = g, o("success");
      });
    });
    const i = () => {
      c.value = !c.value, r.value = l.value;
    }, p = () => {
      m.value = "", u.value = !1, _.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          storage: _.modal.data.storage,
          adapter: _.modal.data.storage,
          path: _.modal.data.item.path
        },
        body: {
          content: r.value
        },
        responseType: "text"
      }).then((g) => {
        m.value = d("Updated."), l.value = g, o("success"), c.value = !c.value;
      }).catch((g) => {
        m.value = d(g.message), u.value = !0;
      });
    };
    return (g, S) => (a(), f("div", Yo, [
      s("div", Wo, [
        s("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(_).modal.data.item.path
        }, h(t(_).modal.data.item.basename), 9, Qo),
        s("div", Xo, [
          c.value ? (a(), f("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, h(t(d)("Save")), 1)) : M("", !0),
          t(_).features.includes(t(ee).EDIT) ? (a(), f("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: S[0] || (S[0] = (T) => i())
          }, h(c.value ? t(d)("Cancel") : t(d)("Edit")), 1)) : M("", !0)
        ])
      ]),
      s("div", null, [
        c.value ? (a(), f("div", Zo, [
          ie(s("textarea", {
            ref_key: "editInput",
            ref: v,
            "onUpdate:modelValue": S[1] || (S[1] = (T) => r.value = T),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Le, r.value]
          ])
        ])) : (a(), f("pre", Jo, h(l.value), 1)),
        m.value.length ? (a(), I(_t, {
          key: 2,
          onHidden: S[2] || (S[2] = (T) => m.value = ""),
          error: u.value
        }, {
          default: j(() => [
            N(h(m.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : M("", !0)
      ])
    ]));
  }
}), ts = { class: "vuefinder__image-preview" }, ns = { class: "vuefinder__image-preview__header" }, os = ["title"], ss = { class: "vuefinder__image-preview__actions" }, rs = { class: "vuefinder__image-preview__image-container h-[50vh] w-full" }, ls = ["src"], as = /* @__PURE__ */ G({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = Y("ServiceContainer"), { t: r } = l.i18n, v = x(!1), c = x(""), m = x(!1), u = x(l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item)), _ = x(u.value), d = De("cropperRef"), i = async () => {
      v.value = !v.value;
    }, p = async () => {
      const S = d.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      S && S.toBlob((T) => {
        if (!T) return;
        c.value = "", m.value = !1;
        const b = new FormData();
        b.set("file", T), l.requester.send({
          url: "",
          method: "post",
          params: {
            q: "upload",
            storage: l.modal.data.storage,
            adapter: l.modal.data.storage,
            path: l.modal.data.item.path
          },
          body: b
        }).then(() => {
          c.value = r("Updated."), fetch(u.value, { cache: "reload", mode: "no-cors" });
          const k = l.root.querySelector('[data-src="' + u.value + '"]');
          k && at.resetStatus(k), l.emitter.emit("vf-refresh-thumbnails"), i(), o("success");
        }).catch((k) => {
          const E = k?.message ?? "Error";
          c.value = r(E), m.value = !0;
        });
      });
    };
    return de(() => {
      o("success");
    }), (g, S) => (a(), f("div", ts, [
      s("div", ns, [
        s("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, h(t(l).modal.data.item.basename), 9, os),
        s("div", ss, [
          v.value ? (a(), f("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__image-preview__crop-button"
          }, h(t(r)("Crop")), 1)) : M("", !0),
          t(l).features.includes(t(ee).EDIT) ? (a(), f("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: S[0] || (S[0] = (T) => i())
          }, h(v.value ? t(r)("Cancel") : t(r)("Edit")), 1)) : M("", !0)
        ])
      ]),
      s("div", rs, [
        v.value ? (a(), I(t(Kt), {
          key: 1,
          ref_key: "cropperRef",
          ref: d,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: _.value,
          "stencil-props": { aspectRatio: 795 / 341 },
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (a(), f("img", {
          key: 0,
          style: { width: "100%", height: "100%" },
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, ls))
      ]),
      c.value.length ? (a(), I(t(c), {
        key: 0,
        onHidden: S[1] || (S[1] = (T) => c.value = ""),
        error: m.value
      }, {
        default: j(() => [
          N(h(c.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : M("", !0)
    ]));
  }
}), is = { class: "vuefinder__default-preview" }, ds = { class: "vuefinder__default-preview__header" }, cs = ["title"], us = /* @__PURE__ */ G({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = Y("ServiceContainer"), l = e;
    return de(() => {
      l("success");
    }), (r, v) => (a(), f("div", is, [
      s("div", ds, [
        s("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: t(o).modal.data.item.path
        }, h(t(o).modal.data.item.basename), 9, cs)
      ]),
      v[0] || (v[0] = s("div", null, null, -1))
    ]));
  }
}), vs = { class: "vuefinder__video-preview" }, _s = ["title"], ms = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, fs = ["src"], ps = /* @__PURE__ */ G({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = Y("ServiceContainer"), l = e, r = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return de(() => {
      l("success");
    }), (v, c) => (a(), f("div", vs, [
      s("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, h(t(o).modal.data.item.basename), 9, _s),
      s("div", null, [
        s("video", ms, [
          s("source", {
            src: r(),
            type: "video/mp4"
          }, null, 8, fs),
          c[0] || (c[0] = N(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), hs = { class: "vuefinder__audio-preview" }, gs = ["title"], ws = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, bs = ["src"], ys = /* @__PURE__ */ G({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = Y("ServiceContainer"), r = () => l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item);
    return de(() => {
      o("success");
    }), (v, c) => (a(), f("div", hs, [
      s("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: t(l).modal.data.item.path
      }, h(t(l).modal.data.item.basename), 9, gs),
      s("div", null, [
        s("audio", ws, [
          s("source", {
            src: r(),
            type: "audio/mpeg"
          }, null, 8, bs),
          c[0] || (c[0] = N(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), ks = { class: "vuefinder__pdf-preview" }, xs = ["title"], Ss = ["data"], $s = ["src"], Cs = /* @__PURE__ */ G({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = Y("ServiceContainer"), l = e, r = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return de(() => {
      l("success");
    }), (v, c) => (a(), f("div", ks, [
      s("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, h(t(o).modal.data.item.basename), 9, xs),
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
          }, " Your browser does not support PDFs ", 8, $s)
        ], 8, Ss)
      ])
    ]));
  }
});
function Es(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Ms = { class: "vuefinder__preview-modal__content" }, Ts = { key: 0 }, As = { class: "vuefinder__preview-modal__loading" }, Ds = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Is = { class: "vuefinder__preview-modal__details" }, Fs = { class: "font-bold" }, Vs = { class: "font-bold pl-2" }, Ls = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Rs = ["download", "href"], mt = /* @__PURE__ */ G({
  __name: "ModalPreview",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = x(!1), r = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), v = e.features.includes(ee.PREVIEW);
    return v || (l.value = !0), (c, m) => (a(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: m[6] || (m[6] = (u) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Close")), 1),
        t(e).features.includes(t(ee).DOWNLOAD) ? (a(), f("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item),
          href: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item)
        }, h(t(o)("Download")), 9, Rs)) : M("", !0)
      ]),
      default: j(() => [
        s("div", null, [
          s("div", Ms, [
            t(v) ? (a(), f("div", Ts, [
              r("text") ? (a(), I(es, {
                key: 0,
                onSuccess: m[0] || (m[0] = (u) => l.value = !0)
              })) : r("image") ? (a(), I(as, {
                key: 1,
                onSuccess: m[1] || (m[1] = (u) => l.value = !0)
              })) : r("video") ? (a(), I(ps, {
                key: 2,
                onSuccess: m[2] || (m[2] = (u) => l.value = !0)
              })) : r("audio") ? (a(), I(ys, {
                key: 3,
                onSuccess: m[3] || (m[3] = (u) => l.value = !0)
              })) : r("application/pdf") ? (a(), I(Cs, {
                key: 4,
                onSuccess: m[4] || (m[4] = (u) => l.value = !0)
              })) : (a(), I(us, {
                key: 5,
                onSuccess: m[5] || (m[5] = (u) => l.value = !0)
              }))
            ])) : M("", !0),
            s("div", As, [
              l.value === !1 ? (a(), f("div", Ds, [
                m[7] || (m[7] = s("svg", {
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
        s("div", Is, [
          s("div", null, [
            s("span", Fs, h(t(o)("File Size")) + ": ", 1),
            N(h(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", Vs, h(t(o)("Last Modified")) + ": ", 1),
            N(" " + h(t(Es)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(ee).DOWNLOAD) ? (a(), f("div", Ls, [
          s("span", null, h(t(o)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : M("", !0)
      ]),
      _: 1
    }));
  }
}), Bs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Hs(n, e) {
  return a(), f("svg", Bs, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const qs = { render: Hs }, Ns = { class: "vuefinder__move-modal__content" }, Ps = { class: "vuefinder__move-modal__description" }, Us = { class: "vuefinder__move-modal__files vf-scrollbar" }, Os = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zs = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ks = { class: "vuefinder__move-modal__file-name" }, js = { class: "vuefinder__move-modal__target-title" }, Gs = { class: "vuefinder__move-modal__target-directory" }, Ys = { class: "vuefinder__move-modal__target-path" }, Ws = { class: "vuefinder__move-modal__selected-items" }, ft = /* @__PURE__ */ G({
  __name: "ModalTransfer",
  props: {
    q: {},
    title: {},
    body: {},
    successBtn: {},
    successText: {}
  },
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = U(l.path), v = n, c = x(e.modal.data.items.from), m = e.modal.data.items.to, u = x(""), _ = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: v.q,
          m: "post",
          storage: r.value.storage,
          adapter: r.value.storage,
          path: r.value.path
        },
        body: {
          items: c.value.map(({ path: d, type: i }) => ({ path: d, type: i })),
          item: m.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: v.successText });
        },
        onError: (d) => {
          u.value = o(d.message);
        }
      });
    };
    return (d, i) => (a(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: _,
          class: "vf-btn vf-btn-primary"
        }, h(v.successBtn), 1),
        s("button", {
          type: "button",
          onClick: i[1] || (i[1] = (p) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1),
        s("div", Ws, h(t(o)("%s item(s) selected.", c.value.length)), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(qs),
            title: v.title
          }, null, 8, ["icon", "title"]),
          s("div", Ns, [
            s("p", Ps, h(v.body), 1),
            s("div", Us, [
              (a(!0), f(oe, null, ae(c.value, (p) => (a(), f("div", {
                class: "vuefinder__move-modal__file",
                key: p.path
              }, [
                s("div", null, [
                  p.type === "dir" ? (a(), f("svg", Os, [...i[2] || (i[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), f("svg", zs, [...i[3] || (i[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", Ks, h(p.path), 1)
              ]))), 128))
            ]),
            s("h4", js, h(t(o)("Target Directory")), 1),
            s("p", Gs, [
              i[4] || (i[4] = s("svg", {
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
              s("span", Ys, h(t(m).path), 1)
            ]),
            u.value.length ? (a(), I(t(u), {
              key: 0,
              onHidden: i[0] || (i[0] = (p) => u.value = ""),
              error: ""
            }, {
              default: j(() => [
                N(h(u.value), 1)
              ]),
              _: 1
            })) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), pt = /* @__PURE__ */ G({
  __name: "ModalMove",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n;
    return (l, r) => (a(), I(ft, {
      q: "move",
      title: t(o)("Move files"),
      body: t(o)("Are you sure you want to move these files"),
      "success-btn": t(o)("Yes, Move!"),
      "success-text": t(o)("Files moved.")
    }, null, 8, ["title", "body", "success-btn", "success-text"]));
  }
}), Qs = /* @__PURE__ */ G({
  __name: "ModalCopy",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n;
    return (l, r) => (a(), I(ft, {
      q: "copy",
      title: t(o)("Copy files"),
      body: t(o)("Are you sure you want to copy these files"),
      "success-btn": t(o)("Yes, Copy!"),
      "success-text": t(o)("Files copied.")
    }, null, 8, ["title", "body", "success-btn", "success-text"]));
  }
}), fe = {
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
function Xs(n) {
  const e = n.search, o = n.fs, l = n.config, r = U(e.state), v = U(o.selectedItems), c = (m) => {
    if (m.code === fe.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible && !r.value?.searchMode) {
      if (m.code === fe.F2 && n.features.includes(ee.RENAME) && v.value.length === 1 && n.modal.open(Ze, { items: v.value }), m.code === fe.F5 && n.emitter.emit("vf-fetch", { params: { q: "index", storage: o.path.get().storage, path: o.path.get().path } }), m.code === fe.DELETE && v.value.length === 0 && n.modal.open(Je, { items: v.value }), m.ctrlKey && m.code === fe.BACKSLASH && n.modal.open(ct), m.ctrlKey && m.code === fe.KEY_F && n.features.includes(ee.SEARCH) && (e.enterSearchMode(), m.preventDefault()), m.ctrlKey && m.code === fe.KEY_E && (l.toggle("showTreeView"), m.preventDefault()), m.ctrlKey && m.code === fe.ENTER && (l.toggle("fullScreen"), n.root.focus()), m.ctrlKey && m.code === fe.KEY_A && (o.selectAll(), m.preventDefault()), m.code === fe.SPACE && v.value.length === 1 && v.value[0]?.type !== "dir" && n.modal.open(mt, { storage: o.path.get().storage, item: v.value[0] }), m.metaKey && m.code === fe.KEY_C) {
        if (v.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("copy", new Set(v.value.map((u) => u.path))), n.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", v.value.length) }), m.preventDefault();
      }
      if (m.metaKey && m.code === fe.KEY_X) {
        if (v.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("cut", new Set(v.value.map((u) => u.path))), n.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", v.value.length) }), m.preventDefault();
      }
      if (m.metaKey && m.code === fe.KEY_V) {
        if (o.getClipboard().items.size === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items in clipboard") });
          return;
        }
        if (o.getClipboard().path === o.path.get().path) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("Cannot paste items to the same directory") });
          return;
        }
        if (o.getClipboard().type === "cut") {
          n.modal.open(pt, { items: { from: Array.from(o.getClipboard().items), to: o.path.get() } }), o.clearClipboard();
          return;
        }
        if (o.getClipboard().type === "copy") {
          n.modal.open(Qs, { items: { from: Array.from(o.getClipboard().items), to: o.path.get() } });
          return;
        }
        m.preventDefault();
      }
    }
  };
  de(() => {
    n.root.addEventListener("keydown", c);
  }), It(() => {
    n.root.removeEventListener("keydown", c);
  });
}
const Js = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Zs(n, e) {
  return a(), f("svg", Js, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ht = { render: Zs }, er = { class: "vuefinder__new-folder-modal__content" }, tr = { class: "vuefinder__new-folder-modal__form" }, nr = { class: "vuefinder__new-folder-modal__description" }, or = ["placeholder"], gt = /* @__PURE__ */ G({
  __name: "ModalNewFolder",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = U(l.path), v = x(""), c = x(""), m = () => {
      v.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("%s is created.", v.value) });
        },
        onError: (u) => {
          c.value = o(u.message);
        }
      });
    };
    return (u, _) => (a(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(ht),
            title: t(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", er, [
            s("div", tr, [
              s("p", nr, h(t(o)("Create a new folder")), 1),
              ie(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => v.value = d),
                onKeyup: Ve(m, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(o)("Folder Name"),
                type: "text"
              }, null, 40, or), [
                [Le, v.value]
              ]),
              c.value.length ? (a(), I(t(c), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(h(c.value), 1)
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
}), sr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function rr(n, e) {
  return a(), f("svg", sr, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const wt = { render: rr }, lr = { class: "vuefinder__new-file-modal__content" }, ar = { class: "vuefinder__new-file-modal__form" }, ir = { class: "vuefinder__new-file-modal__description" }, dr = ["placeholder"], cr = /* @__PURE__ */ G({
  __name: "ModalNewFile",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = U(l.path), v = x(""), c = x(""), m = () => {
      v.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("%s is created.", v.value) });
        },
        onError: (u) => {
          c.value = o(u.message);
        }
      });
    };
    return (u, _) => (a(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(wt),
            title: t(o)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", lr, [
            s("div", ar, [
              s("p", ir, h(t(o)("Create a new file")), 1),
              ie(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => v.value = d),
                onKeyup: Ve(m, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(o)("File Name"),
                type: "text"
              }, null, 40, dr), [
                [Le, v.value]
              ]),
              c.value.length ? (a(), I(t(c), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(h(c.value), 1)
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
}), ue = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function ur() {
  const n = Y("ServiceContainer"), { t: e } = n.i18n, o = n.fs, l = U(o.path), r = n.config, v = x({ QUEUE_ENTRY_STATUS: ue }), c = x(null), m = x(null), u = x(null), _ = x(null), d = x(null), i = x(null), p = x([]), g = x(""), S = x(!1), T = x(!1);
  let b;
  const k = (P) => p.value.findIndex((se) => se.id === P), E = (P, se) => b.addFile({ name: se || P.name, type: P.type, data: P, source: "Local" }), F = (P) => P.status === ue.DONE ? "text-green-600" : P.status === ue.ERROR || P.status === ue.CANCELED ? "text-red-600" : "", R = (P) => P.status === ue.DONE ? "✓" : P.status === ue.ERROR || P.status === ue.CANCELED ? "!" : "...", J = () => _.value?.click(), le = () => n.modal.close(), Q = () => {
    if (S.value || !p.value.filter((P) => P.status !== ue.DONE).length) {
      S.value || (g.value = e("Please select file to upload first."));
      return;
    }
    g.value = "", b.retryAll(), b.upload();
  }, K = () => {
    b.cancelAll(), p.value.forEach((P) => {
      P.status !== ue.DONE && (P.status = ue.CANCELED, P.statusName = e("Canceled"));
    }), S.value = !1;
  }, W = (P) => {
    S.value || (b.removeFile(P.id), p.value.splice(k(P.id), 1));
  }, ne = (P) => {
    if (!S.value)
      if (b.cancelAll(), P) {
        const se = p.value.filter((w) => w.status !== ue.DONE);
        p.value = [], se.forEach((w) => E(w.originalFile, w.name));
      } else
        p.value = [];
  };
  return de(() => {
    b = new jt({
      debug: n.debug,
      restrictions: { maxFileSize: nn(r.maxFileSize ?? "10mb") },
      locale: n.i18n.t("uppy"),
      onBeforeFileAdded: (w, $) => {
        if ($[w.id] != null) {
          const z = k(w.id);
          p.value[z]?.status === ue.PENDING && (g.value = b.i18n("noDuplicates", { fileName: w.name })), p.value = p.value.filter((O) => O.id !== w.id);
        }
        return p.value.push({
          id: w.id,
          name: w.name,
          size: n.filesize(w.size),
          status: ue.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: w.data
        }), !0;
      }
    }), b.use(Gt, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), b.on("restriction-failed", (w, $) => {
      const V = p.value[k(w.id)];
      V && W(V), g.value = $.message;
    }), b.on("upload", () => {
      const w = n.requester.transformRequestParams({
        url: "",
        method: "post",
        params: {
          q: "upload",
          storage: l.value.storage,
          adapter: l.value.storage,
          path: l.value.path
        }
      });
      b.setMeta({ ...w.body });
      const $ = b.getPlugin("XHRUpload");
      $ && ($.opts.method = w.method, $.opts.endpoint = w.url + "?" + new URLSearchParams(w.params), $.opts.headers = w.headers), delete w.headers["Content-Type"], S.value = !0, p.value.forEach((V) => {
        V.status !== ue.DONE && (V.percent = null, V.status = ue.UPLOADING, V.statusName = e("Pending upload"));
      });
    }), b.on("upload-progress", (w, $) => {
      const V = $.bytesTotal ?? 1, z = Math.floor($.bytesUploaded / V * 100), O = k(w.id);
      O !== -1 && p.value[O] && (p.value[O].percent = `${z}%`);
    }), b.on("upload-success", (w) => {
      const $ = p.value[k(w.id)];
      $ && ($.status = ue.DONE, $.statusName = e("Done"));
    }), b.on("upload-error", (w, $) => {
      const V = p.value[k(w.id)];
      V && (V.percent = null, V.status = ue.ERROR, V.statusName = $?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : $?.message || e("Unknown Error"));
    }), b.on("error", (w) => {
      g.value = w.message, S.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), b.on("complete", () => {
      S.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index", path: l.value.path, storage: l.value.storage, adapter: l.value.storage }, noCloseModal: !0 });
    }), _.value?.addEventListener("click", () => m.value?.click()), d.value?.addEventListener("click", () => u.value?.click()), i.value?.addEventListener("dragover", (w) => {
      w.preventDefault(), T.value = !0;
    }), i.value?.addEventListener("dragleave", (w) => {
      w.preventDefault(), T.value = !1;
    });
    const P = (w, $) => {
      $.isFile && $.file((V) => w($, V)), $.isDirectory && $.createReader().readEntries((V) => V.forEach((z) => P(w, z)));
    };
    i.value?.addEventListener("drop", (w) => {
      w.preventDefault(), T.value = !1;
      const $ = /^[/\\](.+)/, V = w.dataTransfer?.items;
      V && Array.from(V).forEach((z) => {
        z.kind === "file" && P((O, Z) => {
          const L = $.exec(O.fullPath);
          E(Z, L ? L[1] : Z.name);
        }, z.webkitGetAsEntry());
      });
    });
    const se = (w) => {
      const $ = w.target, V = $.files;
      if (V) {
        for (const z of V) E(z);
        $.value = "";
      }
    };
    m.value?.addEventListener("change", se), u.value?.addEventListener("change", se);
  }), {
    container: c,
    internalFileInput: m,
    internalFolderInput: u,
    pickFiles: _,
    pickFolders: d,
    dropArea: i,
    queue: p,
    message: g,
    uploading: S,
    hasFilesInDropArea: T,
    definitions: v,
    openFileSelector: J,
    upload: Q,
    cancel: K,
    remove: W,
    clear: ne,
    close: le,
    getClassNameForEntry: F,
    getIconForEntry: R
  };
}
function We(n, e = 14) {
  const o = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(o), "$2..$4");
}
const vr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function _r(n, e) {
  return a(), f("svg", vr, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const bt = { render: _r }, mr = { class: "vuefinder__upload-modal__content" }, fr = {
  key: 0,
  class: "pointer-events-none"
}, pr = {
  key: 1,
  class: "pointer-events-none"
}, hr = ["disabled"], gr = ["disabled"], wr = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, br = ["textContent"], yr = { class: "vuefinder__upload-modal__file-info" }, kr = { class: "vuefinder__upload-modal__file-name hidden md:block" }, xr = { class: "vuefinder__upload-modal__file-name md:hidden" }, Sr = {
  key: 0,
  class: "ml-auto"
}, $r = ["title", "disabled", "onClick"], Cr = {
  key: 0,
  class: "py-2"
}, Er = ["disabled"], Mr = /* @__PURE__ */ G({
  __name: "ModalUpload",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, {
      container: l,
      internalFileInput: r,
      internalFolderInput: v,
      pickFiles: c,
      pickFolders: m,
      dropArea: u,
      queue: _,
      message: d,
      uploading: i,
      hasFilesInDropArea: p,
      definitions: g,
      openFileSelector: S,
      upload: T,
      cancel: b,
      remove: k,
      clear: E,
      close: F,
      getClassNameForEntry: R,
      getIconForEntry: J
    } = ur();
    return (le, Q) => (a(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: t(i),
          onClick: Q[4] || (Q[4] = we(
            //@ts-ignore
            (...K) => t(T) && t(T)(...K),
            ["prevent"]
          ))
        }, h(t(o)("Upload")), 9, Er),
        t(i) ? (a(), f("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Q[5] || (Q[5] = we(
            //@ts-ignore
            (...K) => t(b) && t(b)(...K),
            ["prevent"]
          ))
        }, h(t(o)("Cancel")), 1)) : (a(), f("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Q[6] || (Q[6] = we(
            //@ts-ignore
            (...K) => t(F) && t(F)(...K),
            ["prevent"]
          ))
        }, h(t(o)("Close")), 1))
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(bt),
            title: t(o)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", mr, [
            s("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: u,
              onClick: Q[0] || (Q[0] = //@ts-ignore
              (...K) => t(S) && t(S)(...K))
            }, [
              t(p) ? (a(), f("div", fr, h(t(o)("Release to drop these files.")), 1)) : (a(), f("div", pr, h(t(o)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            s("div", {
              ref_key: "container",
              ref: l,
              class: "vuefinder__upload-modal__buttons"
            }, [
              s("button", {
                ref_key: "pickFiles",
                ref: c,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, h(t(o)("Select Files")), 513),
              s("button", {
                ref_key: "pickFolders",
                ref: m,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, h(t(o)("Select Folders")), 513),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(i),
                onClick: Q[1] || (Q[1] = (K) => t(E)(!1))
              }, h(t(o)("Clear all")), 9, hr),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(i),
                onClick: Q[2] || (Q[2] = (K) => t(E)(!0))
              }, h(t(o)("Clear only successful")), 9, gr)
            ], 512),
            s("div", wr, [
              (a(!0), f(oe, null, ae(t(_), (K) => (a(), f("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: K.id
              }, [
                s("span", {
                  class: X(["vuefinder__upload-modal__file-icon", t(R)(K)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: h(t(J)(K))
                  }, null, 8, br)
                ], 2),
                s("div", yr, [
                  s("div", kr, h(t(We)(K.name, 40)) + " (" + h(K.size) + ") ", 1),
                  s("div", xr, h(t(We)(K.name, 16)) + " (" + h(K.size) + ") ", 1),
                  s("div", {
                    class: X(["vuefinder__upload-modal__file-status", t(R)(K)])
                  }, [
                    N(h(K.statusName) + " ", 1),
                    K.status === t(g).QUEUE_ENTRY_STATUS.UPLOADING ? (a(), f("b", Sr, h(K.percent), 1)) : M("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: X(["vuefinder__upload-modal__file-remove", t(i) ? "disabled" : ""]),
                  title: t(o)("Delete"),
                  disabled: t(i),
                  onClick: (W) => t(k)(K)
                }, [...Q[7] || (Q[7] = [
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
                ])], 10, $r)
              ]))), 128)),
              t(_).length ? M("", !0) : (a(), f("div", Cr, h(t(o)("No files selected!")), 1))
            ]),
            t(d).length ? (a(), I(_t, {
              key: 0,
              onHidden: Q[3] || (Q[3] = (K) => d.value = ""),
              error: ""
            }, {
              default: j(() => [
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
}), Tr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ar(n, e) {
  return a(), f("svg", Tr, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const yt = { render: Ar }, Dr = { class: "vuefinder__unarchive-modal__content" }, Ir = { class: "vuefinder__unarchive-modal__items" }, Fr = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vr = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Lr = { class: "vuefinder__unarchive-modal__item-name" }, Rr = { class: "vuefinder__unarchive-modal__info" }, kt = /* @__PURE__ */ G({
  __name: "ModalUnarchive",
  setup(n) {
    const e = Y("ServiceContainer"), o = e.fs, l = U(o.path), { t: r } = e.i18n, v = x(e.modal.data.items[0]), c = x(""), m = x([]), u = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          storage: l.value.storage,
          path: l.value.path
        },
        body: {
          item: v.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: r("The file unarchived.") });
        },
        onError: (_) => {
          c.value = r(_.message);
        }
      });
    };
    return (_, d) => (a(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, h(t(r)("Unarchive")), 1),
        s("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(r)("Cancel")), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(yt),
            title: t(r)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", Dr, [
            s("div", Ir, [
              (a(!0), f(oe, null, ae(m.value, (i) => (a(), f("p", {
                class: "vuefinder__unarchive-modal__item",
                key: i.path
              }, [
                i.type === "dir" ? (a(), f("svg", Fr, [...d[2] || (d[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (a(), f("svg", Vr, [...d[3] || (d[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Lr, h(i.basename), 1)
              ]))), 128)),
              s("p", Rr, h(t(r)("The archive will be unarchived at")) + " (" + h(t(l).path) + ")", 1),
              c.value.length ? (a(), I(t(c), {
                key: 0,
                onHidden: d[0] || (d[0] = (i) => c.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(h(c.value), 1)
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
}), Br = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Hr(n, e) {
  return a(), f("svg", Br, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const xt = { render: Hr }, qr = { class: "vuefinder__archive-modal__content" }, Nr = { class: "vuefinder__archive-modal__form" }, Pr = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Ur = { class: "vuefinder__archive-modal__file" }, Or = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zr = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kr = { class: "vuefinder__archive-modal__file-name" }, jr = ["placeholder"], St = /* @__PURE__ */ G({
  __name: "ModalArchive",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = U(l.path), v = x(""), c = x(""), m = x(e.modal.data.items), u = () => {
      m.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: m.value.map(({ path: _, type: d }) => ({ path: _, type: d })),
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("The file(s) archived.") });
        },
        onError: (_) => {
          c.value = o(_.message);
        }
      });
    };
    return (_, d) => (a(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Archive")), 1),
        s("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(xt),
            title: t(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", qr, [
            s("div", Nr, [
              s("div", Pr, [
                (a(!0), f(oe, null, ae(m.value, (i) => (a(), f("p", Ur, [
                  i.type === "dir" ? (a(), f("svg", Or, [...d[3] || (d[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), f("svg", zr, [...d[4] || (d[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", Kr, h(i.basename), 1)
                ]))), 256))
              ]),
              ie(s("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => v.value = i),
                onKeyup: Ve(u, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(o)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, jr), [
                [Le, v.value]
              ]),
              c.value.length ? (a(), I(t(c), {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => c.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(h(c.value), 1)
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
}), Gr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Yr(n, e) {
  return a(), f("svg", Gr, [...e[0] || (e[0] = [
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
const et = { render: Yr }, Wr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Qr(n, e) {
  return a(), f("svg", Wr, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Xr = { render: Qr }, Jr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Zr(n, e) {
  return a(), f("svg", Jr, [...e[0] || (e[0] = [
    s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const el = { render: Zr }, tl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function nl(n, e) {
  return a(), f("svg", tl, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const ol = { render: nl }, sl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function rl(n, e) {
  return a(), f("svg", sl, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const ll = { render: rl }, al = { class: "vuefinder__toolbar" }, il = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, dl = ["title"], cl = ["title"], ul = ["title"], vl = ["title"], _l = ["title"], ml = ["title"], fl = ["title"], pl = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, hl = { class: "pl-2" }, gl = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, wl = { class: "vuefinder__toolbar__controls" }, bl = ["title"], yl = ["title"], kl = /* @__PURE__ */ G({
  __name: "Toolbar",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = e.config, v = e.search, c = U(r.state), m = U(v.state), u = U(l.selectedItems);
    ve(() => c.value.fullScreen, () => {
      if (c.value.fullScreen) {
        const d = document.querySelector("body");
        d && (d.style.overflow = "hidden");
      } else {
        const d = document.querySelector("body");
        d && (d.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const _ = () => {
      r.set("view", c.value.view === "list" ? "grid" : "list");
    };
    return (d, i) => (a(), f("div", al, [
      t(m).query.length ? (a(), f("div", pl, [
        s("div", hl, [
          N(h(t(o)("Search results for")) + " ", 1),
          s("span", gl, h(t(m).query), 1)
        ]),
        t(r).get("loadingIndicator") === "circular" && t(l).isLoading() ? (a(), I(t(et), { key: 0 })) : M("", !0)
      ])) : (a(), f("div", il, [
        t(e).features.includes(t(ee).NEW_FOLDER) ? (a(), f("div", {
          key: 0,
          class: "mx-1.5",
          title: t(o)("New Folder"),
          onClick: i[0] || (i[0] = (p) => t(e).modal.open(gt, { items: t(u) }))
        }, [
          D(t(ht))
        ], 8, dl)) : M("", !0),
        t(e).features.includes(t(ee).NEW_FILE) ? (a(), f("div", {
          key: 1,
          class: "mx-1.5",
          title: t(o)("New File"),
          onClick: i[1] || (i[1] = (p) => t(e).modal.open(cr, { items: t(u) }))
        }, [
          D(t(wt))
        ], 8, cl)) : M("", !0),
        t(e).features.includes(t(ee).RENAME) ? (a(), f("div", {
          key: 2,
          class: "mx-1.5",
          title: t(o)("Rename"),
          onClick: i[2] || (i[2] = (p) => t(u).length !== 1 || t(e).modal.open(Ze, { items: t(u) }))
        }, [
          D(t(vt), {
            class: X(t(u).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ul)) : M("", !0),
        t(e).features.includes(t(ee).DELETE) ? (a(), f("div", {
          key: 3,
          class: "mx-1.5",
          title: t(o)("Delete"),
          onClick: i[3] || (i[3] = (p) => !t(u).length || t(e).modal.open(Je, { items: t(u) }))
        }, [
          D(t(ut), {
            class: X(t(u).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, vl)) : M("", !0),
        t(e).features.includes(t(ee).UPLOAD) ? (a(), f("div", {
          key: 4,
          class: "mx-1.5",
          title: t(o)("Upload"),
          onClick: i[4] || (i[4] = (p) => t(e).modal.open(Mr, { items: t(u) }))
        }, [
          D(t(bt))
        ], 8, _l)) : M("", !0),
        t(e).features.includes(t(ee).UNARCHIVE) && t(u).length === 1 && t(u)[0].mime_type === "application/zip" ? (a(), f("div", {
          key: 5,
          class: "mx-1.5",
          title: t(o)("Unarchive"),
          onClick: i[5] || (i[5] = (p) => !t(u).length || t(e).modal.open(kt, { items: t(u) }))
        }, [
          D(t(yt), {
            class: X(t(u).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ml)) : M("", !0),
        t(e).features.includes(t(ee).ARCHIVE) ? (a(), f("div", {
          key: 6,
          class: "mx-1.5",
          title: t(o)("Archive"),
          onClick: i[6] || (i[6] = (p) => !t(u).length || t(e).modal.open(St, { items: t(u) }))
        }, [
          D(t(xt), {
            class: X(t(u).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, fl)) : M("", !0)
      ])),
      s("div", wl, [
        t(e).features.includes(t(ee).FULL_SCREEN) ? (a(), f("div", {
          key: 0,
          onClick: i[7] || (i[7] = (p) => t(r).toggle("fullScreen")),
          class: "mx-1.5",
          title: t(o)("Toggle Full Screen")
        }, [
          t(c).fullScreen ? (a(), I(t(el), { key: 0 })) : (a(), I(t(Xr), { key: 1 }))
        ], 8, bl)) : M("", !0),
        s("div", {
          class: "mx-1.5",
          title: t(o)("Change View"),
          onClick: i[8] || (i[8] = (p) => t(m).query.length || _())
        }, [
          t(c).view === "grid" ? (a(), I(t(ol), {
            key: 0,
            class: X(["vf-toolbar-icon", t(m).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : M("", !0),
          t(c).view === "list" ? (a(), I(t(ll), {
            key: 1,
            class: X(["vf-toolbar-icon", t(m).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : M("", !0)
        ], 8, yl)
      ])
    ]));
  }
}), xl = (n, e = 0, o = !1) => {
  let l;
  return (...r) => {
    o && !l && n(...r), clearTimeout(l), l = setTimeout(() => {
      n(...r);
    }, e);
  };
}, ot = (n, e, o) => {
  const l = x(n);
  return Ft((r, v) => ({
    get() {
      return r(), l.value;
    },
    set: xl((c) => {
      l.value = c, v();
    }, e, !1)
  }));
}, Sl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function $l(n, e) {
  return a(), f("svg", Sl, [...e[0] || (e[0] = [
    s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Cl = { render: $l }, El = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Ml(n, e) {
  return a(), f("svg", El, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Tl = { render: Ml }, Al = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Dl(n, e) {
  return a(), f("svg", Al, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Il = { render: Dl }, Fl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function Vl(n, e) {
  return a(), f("svg", Fl, [...e[0] || (e[0] = [
    s("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Ll = { render: Vl }, Rl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function Bl(n, e) {
  return a(), f("svg", Rl, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Hl = { render: Bl }, ql = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Nl(n, e) {
  return a(), f("svg", ql, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Pl = { render: Nl }, Ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function Ol(n, e) {
  return a(), f("svg", Ul, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Oe = { render: Ol }, zl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Kl(n, e) {
  return a(), f("svg", zl, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const jl = { render: Kl }, Gl = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function Yl(n, e) {
  return a(), f("svg", Gl, [...e[0] || (e[0] = [
    s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Wl = { render: Yl };
function Ql(n) {
  const [e, o] = Xl(n);
  if (!o || o === "/") return e + "://";
  const l = o.replace(/\/+$/, ""), r = l.lastIndexOf("/");
  return r === 0 ? e + "://" : e + ":/" + l.slice(0, r);
}
function Xl(n) {
  const e = n.indexOf(":/");
  return e === -1 ? [void 0, n] : [n.slice(0, e), n.slice(e + 2) || "/"];
}
function qe(n, e = []) {
  const o = "vfDragEnterCounter", l = n.fs, r = U(l.selectedItems);
  function v(d, i) {
    d.preventDefault(), l.getDraggedItem() === i.path || !i || i.type !== "dir" || r.value.some((g) => g.path === i.path || Ql(g.path) === i.path) ? d.dataTransfer && (d.dataTransfer.dropEffect = "none", d.dataTransfer.effectAllowed = "none") : (d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.dataTransfer.effectAllowed = "all"), d.currentTarget.classList.add(...e));
  }
  function c(d) {
    d.preventDefault();
    const i = d.currentTarget, p = Number(i.dataset[o] || 0);
    i.dataset[o] = String(p + 1);
  }
  function m(d) {
    d.preventDefault();
    const i = d.currentTarget, g = Number(i.dataset[o] || 0) - 1;
    g <= 0 ? (delete i.dataset[o], i.classList.remove(...e)) : i.dataset[o] = String(g);
  }
  function u(d, i) {
    if (!i) return;
    d.preventDefault();
    const p = d.currentTarget;
    delete p.dataset[o], p.classList.remove(...e);
    const g = d.dataTransfer?.getData("items") || "[]", T = JSON.parse(g).map((b) => l.sortedFiles.get().find((k) => k.path === b));
    l.clearDraggedItem(), n.modal.open(pt, { items: { from: T, to: i } });
  }
  function _(d) {
    return {
      dragover: (i) => v(i, d),
      dragenter: c,
      dragleave: m,
      drop: (i) => u(i, d)
    };
  }
  return { events: _ };
}
const Jl = { class: "vuefinder__breadcrumb__container" }, Zl = ["title"], ea = ["title"], ta = ["title"], na = ["title"], oa = { class: "vuefinder__breadcrumb__list" }, sa = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, ra = { class: "relative" }, la = ["title", "onClick"], aa = { class: "vuefinder__breadcrumb__search-mode" }, ia = ["placeholder"], da = ["onClick"], ca = { class: "vuefinder__breadcrumb__hidden-item-content" }, ua = { class: "vuefinder__breadcrumb__hidden-item-text" }, va = /* @__PURE__ */ G({
  __name: "Breadcrumb",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.search, r = e.fs, v = e.config, c = U(v.state), m = U(l.state), u = U(r.path), _ = U(r.loading), d = re(() => m.value?.searchMode ?? !1), i = x(null), p = ot(0, 100), g = x(5), S = x(!1), T = re(() => u.value?.breadcrumb ?? []);
    function b(L, B) {
      return L.length > B ? [L.slice(-B), L.slice(0, -B)] : [L, []];
    }
    const k = re(() => b(T.value, g.value)[0]), E = re(() => b(T.value, g.value)[1]);
    ve(p, () => {
      if (!i.value) return;
      const L = i.value.children;
      let B = 0, y = 0;
      const C = 5, te = 1;
      g.value = C, Be(() => {
        for (let ce = L.length - 1; ce >= 0; ce--) {
          const Se = L[ce];
          if (B + Se.offsetWidth > p.value - 40)
            break;
          B += parseInt(Se.offsetWidth.toString(), 10), y++;
        }
        y < te && (y = te), y > C && (y = C), g.value = y;
      });
    });
    const F = () => {
      i.value && (p.value = i.value.offsetWidth);
    }, R = x(null);
    de(() => {
      R.value = new ResizeObserver(F), i.value && R.value.observe(i.value);
    }), He(() => {
      R.value && R.value.disconnect();
    });
    const J = qe(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function le(L = null) {
      L ??= T.value.length - 2;
      const B = {
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
      return T.value[L] ?? B;
    }
    const Q = () => {
      z(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: u.value?.storage, path: u.value?.path } });
    }, K = () => {
      l.exitSearchMode(), k.value.length > 0 && !d.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: u.value?.storage ?? "local",
          path: T.value[T.value.length - 2]?.path ?? (u.value?.storage ?? "local") + "://"
        }
      });
    }, W = (L) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: u.value?.storage, path: L.path } }), S.value = !1;
    }, ne = () => {
      S.value && (S.value = !1);
    }, P = {
      mounted(L, B) {
        L.clickOutsideEvent = function(y) {
          L === y.target || L.contains(y.target) || B.value();
        }, document.body.addEventListener("click", L.clickOutsideEvent);
      },
      beforeUnmount(L) {
        document.body.removeEventListener("click", L.clickOutsideEvent);
      }
    }, se = () => {
      v.toggle("showTreeView");
    }, w = x(null), $ = ot("", 400);
    ve($, (L) => {
      e.emitter.emit("vf-toast-clear"), l.setQuery(L);
    }), ve(d, (L) => {
      L && Be(() => {
        w.value && w.value.focus();
      });
    }), e.emitter.on("vf-search-exit", () => {
      l.exitSearchMode();
    });
    const V = () => {
      $.value === "" && l.exitSearchMode();
    }, z = () => {
      $.value = "", l.exitSearchMode();
    }, O = x({
      x: 0,
      y: 0
    }), Z = (L) => {
      if (L.currentTarget instanceof HTMLElement) {
        const { x: B, y, height: C } = L.currentTarget.getBoundingClientRect();
        O.value = { x: B, y: y + C };
      }
      S.value = !S.value;
    };
    return (L, B) => (a(), f("div", Jl, [
      s("span", {
        title: t(o)("Toggle Tree View")
      }, [
        D(t(jl), {
          onClick: se,
          class: X(["vuefinder__breadcrumb__toggle-tree", t(c).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Zl),
      s("span", {
        title: t(o)("Go up a directory")
      }, [
        D(t(Tl), ke(Ee(T.value.length && !d.value ? t(J).events(le()) : {}), {
          onClick: K,
          class: T.value.length && !d.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, ea),
      t(r).isLoading() ? (a(), f("span", {
        key: 1,
        title: t(o)("Cancel")
      }, [
        D(t(Il), {
          onClick: B[0] || (B[0] = (y) => t(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, na)) : (a(), f("span", {
        key: 0,
        title: t(o)("Refresh")
      }, [
        D(t(Cl), { onClick: Q })
      ], 8, ta)),
      ie(s("div", {
        class: "group vuefinder__breadcrumb__search-container",
        onClick: B[3] || (B[3] = //@ts-ignore
        (...y) => t(l).enterSearchMode && t(l).enterSearchMode(...y))
      }, [
        s("div", null, [
          D(t(Ll), ke(Ee(t(J).events(le(-1))), {
            onClick: B[1] || (B[1] = we((y) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(u).value?.storage ?? "local" } }), ["stop"]))
          }), null, 16)
        ]),
        s("div", oa, [
          E.value.length ? ie((a(), f("div", sa, [
            B[5] || (B[5] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", ra, [
              s("span", {
                onDragenter: B[2] || (B[2] = (y) => S.value = !0),
                onClick: Z,
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                D(t(Wl), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [P, ne]
          ]) : M("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: i,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (a(!0), f(oe, null, ae(k.value, (y, C) => (a(), f("div", { key: C }, [
            B[6] || (B[6] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", ke(Ee(t(J).events(y), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: y.basename,
              onClick: we((te) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(u)?.storage, path: y.path } }), ["stop"])
            }), h(y.name), 17, la)
          ]))), 128))
        ], 512),
        t(v).get("loadingIndicator") === "circular" && t(_) ? (a(), I(t(et), { key: 0 })) : M("", !0)
      ], 512), [
        [ge, !d.value]
      ]),
      ie(s("div", aa, [
        s("div", null, [
          D(t(Hl))
        ]),
        ie(s("input", {
          ref_key: "searchInput",
          ref: w,
          onKeydown: Ve(z, ["esc"]),
          onBlur: V,
          "onUpdate:modelValue": B[4] || (B[4] = (y) => Vt($) ? $.value = y : null),
          placeholder: t(o)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, ia), [
          [Le, t($)]
        ]),
        D(t(Pl), { onClick: z })
      ], 512), [
        [ge, d.value]
      ]),
      (a(), I(Lt, { to: "body" }, [
        ie(s("div", {
          style: Me({ position: "absolute", top: O.value.y + "px", left: O.value.x + "px" }),
          class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
        }, [
          (a(!0), f(oe, null, ae(E.value, (y, C) => (a(), f("div", ke({ key: C }, Ee(t(J).events(y), !0), {
            onClick: (te) => W(y),
            class: "vuefinder__breadcrumb__hidden-item"
          }), [
            s("div", ca, [
              s("span", null, [
                D(t(Oe), { class: "vuefinder__breadcrumb__hidden-item-icon" })
              ]),
              B[7] || (B[7] = N()),
              s("span", ua, h(y.name), 1)
            ])
          ], 16, da))), 128))
        ], 4), [
          [ge, S.value]
        ])
      ]))
    ]));
  }
});
function _a(n, e) {
  const {
    scrollContainer: o,
    itemWidth: l = 100,
    rowHeight: r,
    overscan: v = 2,
    containerPadding: c = 48,
    lockItemsPerRow: m
  } = e, u = n, _ = () => typeof r == "number" ? r : r.value, d = x(0), i = x(6), p = x(600);
  let g = null;
  const S = re(() => Math.ceil(u.value.length / i.value)), T = re(() => S.value * _()), b = re(() => {
    const W = _(), ne = Math.max(0, Math.floor(d.value / W) - v), P = Math.min(S.value, Math.ceil((d.value + p.value) / W) + v);
    return { start: ne, end: P };
  }), k = re(() => {
    const { start: W, end: ne } = b.value;
    return Array.from({ length: ne - W }, (P, se) => W + se);
  }), E = () => p.value, F = () => m.value, R = () => {
    if (F()) {
      i.value = 1;
      return;
    }
    if (o.value) {
      const W = o.value.clientWidth - c;
      i.value = Math.max(Math.floor(W / l), 2);
    }
  }, J = (W) => {
    const ne = W.target;
    d.value = ne.scrollTop;
  };
  ve(() => u.value.length, () => {
    R();
  });
  const le = (W, ne) => {
    const P = ne * i.value;
    return W.slice(P, P + i.value);
  }, Q = (W, ne, P, se, w) => {
    const $ = [];
    for (let V = ne; V <= P; V++)
      for (let z = se; z <= w; z++) {
        const O = V * i.value + z;
        O < W.length && W[O] && $.push(W[O]);
      }
    return $;
  }, K = (W) => ({
    row: Math.floor(W / i.value),
    col: W % i.value
  });
  return de(async () => {
    await Be(), o.value && (p.value = o.value.clientHeight || 600), R(), window.addEventListener("resize", () => {
      o.value && (p.value = o.value.clientHeight || 600), R();
    }), o.value && "ResizeObserver" in window && (g = new ResizeObserver((W) => {
      const ne = W[0];
      ne && (p.value = Math.round(ne.contentRect.height)), R();
    }), g.observe(o.value));
  }), He(() => {
    window.removeEventListener("resize", R), g && (g.disconnect(), g = null);
  }), {
    scrollTop: d,
    itemsPerRow: i,
    totalRows: S,
    totalHeight: T,
    visibleRange: b,
    visibleRows: k,
    updateItemsPerRow: R,
    handleScroll: J,
    getRowItems: le,
    getItemsInRange: Q,
    getItemPosition: K,
    getContainerHeight: E
  };
}
function ma(n) {
  const { getItemPosition: e, getItemsInRange: o, getKey: l, selectionObject: r, rowHeight: v, itemWidth: c } = n, m = Math.floor(Math.random() * 2 ** 32).toString(), _ = Y("ServiceContainer").fs, d = U(_.selectedKeys), i = U(_.sortedFiles);
  U(_.selectedCount);
  const p = x(/* @__PURE__ */ new Set()), g = x(!1), S = x(!1), T = x(null), b = (w) => w.map(($) => $.getAttribute("data-key")).filter(($) => !!$), k = (w) => {
    w.selection.getSelection().forEach(($) => {
      w.selection.deselect($, !0);
    });
  }, E = (w) => {
    d.value && d.value.forEach(($) => {
      const V = document.querySelector(`[data-key="${$}"]`);
      V && w.selection.select(V, !0);
    });
  }, F = (w) => {
    if (w.size === 0) return null;
    const V = Array.from(w).map((B) => {
      const y = i.value?.findIndex((C) => l(C) === B) ?? -1;
      return e(y >= 0 ? y : 0);
    }), z = Math.min(...V.map((B) => B.row)), O = Math.max(...V.map((B) => B.row)), Z = Math.min(...V.map((B) => B.col)), L = Math.max(...V.map((B) => B.col));
    return { minRow: z, maxRow: O, minCol: Z, maxCol: L };
  }, R = (w) => {
    g.value = !1, !w.event?.metaKey && !w.event?.ctrlKey && (S.value = !0), w.selection.resolveSelectables(), k(w), E(w);
  }, J = ({ event: w, selection: $ }) => {
    const V = w;
    V && "type" in V && V.type === "touchend" && V.preventDefault();
    const z = w;
    if (!z?.ctrlKey && !z?.metaKey && (_.clearSelection(), $.clearSelection(!0, !0)), p.value.clear(), z && r.value) {
      const O = r.value.getSelectables()[0]?.closest(".scroller-" + m);
      if (O) {
        const Z = O.getBoundingClientRect(), L = z.clientY - Z.top + O.scrollTop, B = z.clientX - Z.left, y = Math.floor(L / v.value), C = Math.floor(B / c);
        T.value = { row: y, col: C };
      }
    }
  }, le = (w) => {
    const $ = w.selection, V = b(w.store.changed.added), z = b(w.store.changed.removed);
    S.value = !1, g.value = !0, V.forEach((O) => {
      d.value && !d.value.has(O) && p.value.add(O), _.select(O);
    }), z.forEach((O) => {
      document.querySelector(`[data-key="${O}"]`) && i.value?.find((L) => l(L) === O) && p.value.delete(O), _.deselect(O);
    }), $.resolveSelectables(), E(w);
  }, Q = () => {
    p.value.clear();
  }, K = (w) => {
    if (w.event && T.value && p.value.size > 0) {
      const V = Array.from(p.value).map((z) => {
        const O = i.value?.findIndex((Z) => l(Z) === z) ?? -1;
        return O >= 0 ? e(O) : null;
      }).filter((z) => z !== null);
      if (V.length > 0) {
        const z = [...V, T.value], O = {
          minRow: Math.min(...z.map((Z) => Z.row)),
          maxRow: Math.max(...z.map((Z) => Z.row)),
          minCol: Math.min(...z.map((Z) => Z.col)),
          maxCol: Math.max(...z.map((Z) => Z.col))
        };
        o(i.value || [], O.minRow, O.maxRow, O.minCol, O.maxCol).forEach(
          (Z) => {
            const L = l(Z);
            document.querySelector(`[data-key="${L}"]`) || _.select(L);
          }
        );
      }
    }
  }, W = (w) => {
    K(w), k(w), E(w), _.setSelectedCount(d.value?.size || 0), g.value = !1, T.value = null;
  }, ne = () => {
    r.value = new Yt({
      selectables: [".file-item-" + m],
      boundaries: [".scroller-" + m],
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
    }), r.value.on("beforestart", R), r.value.on("start", J), r.value.on("move", le), r.value.on("stop", W);
  }, P = () => {
    r.value && (r.value.destroy(), r.value = null);
  }, se = (w) => {
    S.value && (r.value?.clearSelection(), Q(), S.value = !1);
    const $ = w;
    !p.value.size && !S.value && !$?.ctrlKey && !$?.metaKey && (_.clearSelection(), r.value?.clearSelection());
  };
  return de(() => {
    const w = ($) => {
      !$.buttons && g.value && (g.value = !1);
    };
    document.addEventListener("dragleave", w), He(() => {
      document.removeEventListener("dragleave", w);
    });
  }), {
    isDragging: g,
    selectionStarted: S,
    explorerId: m,
    extractIds: b,
    cleanupSelection: k,
    refreshSelection: E,
    getSelectionRange: F,
    selectSelectionRange: K,
    initializeSelectionArea: ne,
    destroySelectionArea: P,
    handleContentClick: se
  };
}
const fa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function pa(n, e) {
  return a(), f("svg", fa, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const ha = { render: pa }, ga = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function wa(n, e) {
  return a(), f("svg", ga, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const ba = { render: wa }, Ne = /* @__PURE__ */ G({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, o) => (a(), f("div", null, [
      n.direction === "asc" ? (a(), I(t(ha), { key: 0 })) : M("", !0),
      n.direction === "desc" ? (a(), I(t(ba), { key: 1 })) : M("", !0)
    ]));
  }
}), ya = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function ka(n, e) {
  return a(), f("svg", ya, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const xa = { render: ka }, Sa = { class: "vuefinder__drag-item__container" }, $a = { class: "vuefinder__drag-item__count" }, Ca = /* @__PURE__ */ G({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (o, l) => (a(), f("div", Sa, [
      D(t(xa)),
      s("div", $a, h(e.count), 1)
    ]));
  }
}), Ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Ma(n, e) {
  return a(), f("svg", Ea, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ta = { render: Ma }, Aa = {
  key: 3,
  class: "vuefinder__item-icon__extension"
}, st = /* @__PURE__ */ G({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(n) {
    const e = n, o = Y("ServiceContainer"), l = U(o.config.state), r = o.customIcon?.(o, l, e.item);
    return (v, c) => (a(), f("div", {
      class: X(["vuefinder__item-icon", n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      t(r) ? (a(), I(Qe(t(r).is), Rt(ke({ key: 0 }, t(r).props || {})), null, 16)) : n.item.type === "dir" ? (a(), I(t(Oe), { key: 1 })) : (a(), I(t(Ta), { key: 2 })),
      !t(r) && n.ext && n.item.type !== "dir" && n.item.extension ? (a(), f("div", Aa, h(n.item.extension.substring(0, 3)), 1)) : M("", !0)
    ], 2));
  }
}), Da = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ia(n, e) {
  return a(), f("svg", Da, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const $t = { render: Ia }, Fa = ["data-key", "data-row", "data-col", "draggable"], Va = { key: 0 }, La = { class: "vuefinder__explorer__item-grid-content" }, Ra = ["data-src", "alt"], Ba = { class: "vuefinder__explorer__item-title" }, Ha = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, qa = { class: "vuefinder__explorer__item-list-name" }, Na = { class: "vuefinder__explorer__item-list-icon" }, Pa = { class: "vuefinder__explorer__item-name" }, Ua = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Oa = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, za = { key: 0 }, Ka = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, ja = /* @__PURE__ */ G({
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
    const o = n, l = e, r = Y("ServiceContainer"), v = r.fs, c = r.config, m = re(() => [
      "file-item-" + o.explorerId,
      o.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      o.isSelected ? "vf-explorer-selected" : ""
    ]), u = re(() => ({
      opacity: o.isDragging || v.isCut(o.item.path) ? 0.5 : ""
    }));
    let _ = null;
    const d = x(null);
    let i = !1;
    const p = () => {
      _ && clearTimeout(_), g.value = !0;
    }, g = x(!0), S = (T) => {
      if (g.value = !1, _ && (T.preventDefault(), clearTimeout(_)), !i)
        i = !0, l("click", T), d.value = setTimeout(() => i = !1, 300);
      else
        return i = !1, l("dblclick", T), _ && clearTimeout(_), !1;
      if (T.currentTarget && T.currentTarget instanceof HTMLElement) {
        const b = T.currentTarget.getBoundingClientRect();
        T.preventDefault(), _ = setTimeout(() => {
          let F = b.y + b.height;
          F + 146 > window.innerHeight - 10 && (F = b.y - 146), F < 10 && (F = 10);
          const R = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: b.x,
            clientY: F
          });
          T.target?.dispatchEvent(R);
        }, 300);
      }
    };
    return (T, b) => (a(), f("div", {
      class: X(m.value),
      style: Me(u.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: g.value,
      onTouchstart: b[1] || (b[1] = (k) => S(k)),
      onTouchend: b[2] || (b[2] = (k) => p()),
      onClick: b[3] || (b[3] = (k) => l("click", k)),
      onDblclick: b[4] || (b[4] = (k) => l("dblclick", k)),
      onContextmenu: b[5] || (b[5] = we((k) => l("contextmenu", k), ["prevent", "stop"])),
      onDragstart: b[6] || (b[6] = (k) => l("dragstart", k)),
      onDragend: b[7] || (b[7] = (k) => l("dragend", k))
    }, [
      n.view === "grid" ? (a(), f("div", Va, [
        s("div", La, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (a(), f("img", {
            key: 0,
            onTouchstart: b[0] || (b[0] = (k) => k.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": t(r).requester.getPreviewUrl(n.item.storage, n.item),
            alt: n.item.basename
          }, null, 40, Ra)) : (a(), I(st, {
            key: 1,
            item: n.item,
            ext: !0
          }, null, 8, ["item"]))
        ]),
        s("span", Ba, h(t(We)(n.item.basename)), 1)
      ])) : (a(), f("div", Ha, [
        s("div", qa, [
          s("div", Na, [
            D(st, {
              item: n.item,
              small: n.compact
            }, null, 8, ["item", "small"])
          ]),
          s("span", Pa, h(n.item.basename), 1)
        ]),
        n.showPath ? (a(), f("div", Ua, h(n.item.path), 1)) : M("", !0),
        n.showPath ? M("", !0) : (a(), f("div", Oa, [
          n.item.file_size ? (a(), f("div", za, h(t(r).filesize(n.item.file_size)), 1)) : M("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (a(), f("div", Ka, h(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : M("", !0)
      ])),
      t(c).get("pinnedFolders").find((k) => k.path === n.item.path) ? (a(), I(t($t), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : M("", !0)
    ], 46, Fa));
  }
}), Ga = ["data-row"], Ge = /* @__PURE__ */ G({
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
    const o = n, l = e, r = re(() => [
      o.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), v = re(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${o.rowHeight}px`,
      transform: `translateY(${o.rowIndex * o.rowHeight}px)`
    })), c = re(() => o.view === "grid" ? {
      gridTemplateColumns: `repeat(${o.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (m, u) => (a(), f("div", {
      class: X(r.value),
      "data-row": n.rowIndex,
      style: Me(v.value)
    }, [
      s("div", {
        class: X(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Me(c.value)
      }, [
        (a(!0), f(oe, null, ae(n.items, (_, d) => (a(), I(ja, ke({
          key: _.path,
          item: _,
          view: n.view,
          compact: n.compact,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(_.path),
          "is-dragging": n.isDraggingItem(_.path),
          "row-index": n.rowIndex,
          "col-index": d
        }, Ee(n.dragNDropEvents(_)), {
          onClick: u[0] || (u[0] = (i) => l("click", i)),
          onDblclick: u[1] || (u[1] = (i) => l("dblclick", i)),
          onContextmenu: u[2] || (u[2] = (i) => l("contextmenu", i)),
          onDragstart: u[3] || (u[3] = (i) => l("dragstart", i)),
          onDragend: u[4] || (u[4] = (i) => l("dragend", i)),
          explorerId: n.explorerId
        }), null, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Ga));
  }
}), Ya = ["onClick"], Wa = /* @__PURE__ */ G({
  __name: "Toast",
  setup(n) {
    const e = Y("ServiceContainer"), { getStore: o } = e.storage, l = x(o("full-screen", !1)), r = x([]), v = (u) => u === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (u) => {
      r.value.splice(u, 1);
    }, m = (u) => {
      let _ = r.value.findIndex((d) => d.id === u);
      _ !== -1 && c(_);
    };
    return e.emitter.on("vf-toast-clear", () => {
      r.value = [];
    }), e.emitter.on("vf-toast-push", (u) => {
      let _ = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      u.id = _, r.value.push(u), setTimeout(() => {
        m(_);
      }, 5e3);
    }), (u, _) => (a(), f("div", {
      class: X(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      D(Bt, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: j(() => [
          (a(!0), f(oe, null, ae(r.value, (d, i) => (a(), f("div", {
            key: i,
            onClick: (p) => c(i),
            class: X(["vuefinder__toast__message", v(d.type)])
          }, h(d.label), 11, Ya))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Qa = { class: "vuefinder__explorer__container" }, Xa = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, Ja = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Za = {
  key: 0,
  class: "vuefinder__linear-loader"
}, ei = /* @__PURE__ */ G({
  __name: "Explorer",
  setup(n) {
    const e = Y("ServiceContainer"), o = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), l = De("dragImage"), r = rt(null), v = De("scrollContainer"), c = De("scrollContent"), m = e.search, u = e.fs, _ = e.config, d = U(_.state), i = U(m.state), p = U(u.sortedFiles), g = U(u.selectedKeys), S = U(u.loading), T = (A) => g.value?.has(A) ?? !1;
    let b = null;
    const k = x(null), E = De("customScrollBar"), F = De("customScrollBarContainer"), R = re(() => {
      const A = d.value.view, H = d.value.compactListView;
      return A === "grid" && !(i.value.searchMode && i.value.query.length) ? 88 : H ? 24 : 50;
    }), { t: J } = e.i18n, {
      itemsPerRow: le,
      totalHeight: Q,
      visibleRows: K,
      handleScroll: W,
      getRowItems: ne,
      getItemsInRange: P,
      getItemPosition: se,
      updateItemsPerRow: w
    } = _a(
      re(() => p.value ?? []),
      {
        scrollContainer: v,
        itemWidth: 104,
        rowHeight: R,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: re(() => d.value.view === "list" || !!i.value.query.length)
      }
    ), {
      explorerId: $,
      isDragging: V,
      initializeSelectionArea: z,
      destroySelectionArea: O,
      handleContentClick: Z
    } = ma({
      getItemPosition: se,
      getItemsInRange: P,
      getKey: (A) => A.path,
      selectionObject: r,
      rowHeight: R,
      itemWidth: 104
    }), L = x(null), B = (A) => {
      if (!A || !L.value) return !1;
      const H = g.value?.has(L.value) ?? !1;
      return V.value && (H ? g.value?.has(A) ?? !1 : A === L.value);
    };
    ve(() => _.get("view"), (A) => {
      A === "list" ? le.value = 1 : w();
    }, { immediate: !0 }), ve(le, (A) => {
      _.get("view") === "list" && A !== 1 && (le.value = 1);
    });
    const y = (A) => p.value?.[A];
    de(() => {
      if (z(), r.value && r.value.on("beforestart", ({ event: A }) => {
        const H = A?.target === c.value;
        if (!A?.metaKey && !A?.ctrlKey && !A?.altKey && !H)
          return !1;
      }), v.value && (b = new at({
        elements_selector: ".lazy",
        container: v.value
      })), ve(() => i.value.query, (A) => {
        const H = u.path.get().storage, q = u.path.get().path;
        !H || !q || (A ? e.emitter.emit("vf-fetch", {
          params: {
            q: "search",
            storage: H,
            path: q,
            filter: A
          },
          onSuccess: (me) => {
            me.files.length || e.emitter.emit("vf-toast-push", { label: J("No search result found.") });
          }
        }) : e.emitter.emit("vf-fetch", { params: { q: "index", storage: H, path: q } }));
      }), F.value) {
        const A = Xe(F.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (H) => {
            k.value = H;
          },
          scroll: (H) => {
            const { scrollOffsetElement: q } = H.elements();
            v.value && v.value.scrollTo({ top: q.scrollTop, left: 0 });
          }
        });
        k.value = A;
      }
      v.value && v.value.addEventListener("scroll", () => {
        const A = k.value;
        if (!A) return;
        const { scrollOffsetElement: H } = A.elements();
        H.scrollTo({ top: v.value.scrollTop, left: 0 });
      });
    }), de(() => {
      e.emitter.on("vf-refresh-thumbnails", () => {
        b && b.update();
      });
    }), Ht(() => {
      if (b && b.update(), k.value && E.value && v.value) {
        const H = v.value.scrollHeight > v.value.clientHeight, q = E.value;
        q.style.display = H ? "block" : "none", q.style.height = `${Q.value}px`;
      }
    }), He(() => {
      O(), b && (b.destroy(), b = null), k.value && (k.value.destroy(), k.value = null);
    });
    const C = (A) => {
      const H = A.target?.closest(".file-item-" + $), q = A;
      if (!q?.ctrlKey && !q?.metaKey && A.type !== "touchstart" && (u.clearSelection(), r.value?.clearSelection(!0, !0)), H && A.type !== "touchstart") {
        const me = String(H.getAttribute("data-key"));
        r.value?.resolveSelectables(), u.toggleSelect(me);
      }
      u.setSelectedCount(g.value?.size || 0);
    }, te = (A) => {
      const H = e.contextMenuItems.find((q) => q.show(e, {
        searchQuery: "",
        items: [A],
        target: A
      }));
      H && H.action(e, [A]);
    }, ce = (A) => {
      const H = A.target?.closest(".file-item-" + $), q = H ? String(H.getAttribute("data-key")) : null;
      if (!q) return;
      const me = p.value?.find((ze) => ze.path === q);
      me && te(me);
    }, Se = () => {
      const A = g.value;
      return p.value?.filter((H) => A?.has(H.path)) || [];
    }, Te = (A) => {
      A.preventDefault();
      const H = A.target?.closest(".file-item-" + $);
      if (H) {
        const q = String(H.getAttribute("data-key")), me = p.value?.find((ze) => ze.path === q);
        g.value?.has(q) || (u.clearSelection(), u.select(q)), e.emitter.emit("vf-contextmenu-show", { event: A, items: Se(), target: me });
      }
    }, ye = (A) => {
      A.preventDefault(), e.emitter.emit("vf-contextmenu-show", { event: A, items: Se() });
    }, Ae = (A) => {
      if (A.altKey || A.ctrlKey || A.metaKey)
        return A.preventDefault(), !1;
      V.value = !0;
      const H = A.target?.closest(".file-item-" + $);
      if (L.value = H ? String(H.dataset.key) : null, A.dataTransfer && L.value) {
        A.dataTransfer.setDragImage(l.value, 0, 15), A.dataTransfer.effectAllowed = "all", A.dataTransfer.dropEffect = "copy";
        const q = g.value?.has(L.value) ? Array.from(g.value) : [L.value];
        A.dataTransfer.setData("items", JSON.stringify(q)), u.setDraggedItem(L.value);
      }
    }, $e = () => {
      L.value = null;
    };
    return (A, H) => (a(), f("div", Qa, [
      s("div", {
        ref: "customScrollBarContainer",
        class: X(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(d).view === "grid" }, { "search-active": t(i).hasQuery }]])
      }, [
        s("div", Xa, null, 512)
      ], 2),
      t(d).view === "list" || t(i).query.length ? (a(), f("div", Ja, [
        s("div", {
          onClick: H[0] || (H[0] = (q) => t(u).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          N(h(t(J)("Name")) + " ", 1),
          ie(D(Ne, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "basename"]
          ])
        ]),
        t(i).query.length ? M("", !0) : (a(), f("div", {
          key: 0,
          onClick: H[1] || (H[1] = (q) => t(u).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          N(h(t(J)("Size")) + " ", 1),
          ie(D(Ne, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "file_size"]
          ])
        ])),
        t(i).query.length ? (a(), f("div", {
          key: 1,
          onClick: H[2] || (H[2] = (q) => t(u).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          N(h(t(J)("Filepath")) + " ", 1),
          ie(D(Ne, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "path"]
          ])
        ])) : M("", !0),
        t(i).query.length ? M("", !0) : (a(), f("div", {
          key: 2,
          onClick: H[3] || (H[3] = (q) => t(u).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          N(h(t(J)("Date")) + " ", 1),
          ie(D(Ne, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "last_modified"]
          ])
        ]))
      ])) : M("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: v,
        class: X(["vuefinder__explorer__selector-area", "scroller-" + t($)]),
        onScroll: H[5] || (H[5] = //@ts-ignore
        (...q) => t(W) && t(W)(...q))
      }, [
        t(_).get("loadingIndicator") === "linear" && t(S) ? (a(), f("div", Za)) : M("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: c,
          class: "scrollContent min-h-full",
          style: Me({ height: `${t(Q)}px`, position: "relative", width: "100%" }),
          onContextmenu: we(ye, ["self", "prevent"]),
          onClick: H[4] || (H[4] = we(
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
            D(Ca, {
              count: L.value && t(g)?.has(L.value) ? t(g)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          t(i).query.length ? (a(!0), f(oe, { key: 0 }, ae(t(K), (q) => (a(), I(Ge, {
            key: q,
            "row-index": q,
            "row-height": R.value,
            view: "list",
            items: y(q) ? [y(q)] : [],
            compact: t(d).compactListView,
            "show-path": !0,
            "is-dragging-item": B,
            "is-selected": T,
            "drag-n-drop-events": (me) => t(o).events(me),
            explorerId: t($),
            onClick: C,
            onDblclick: ce,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(d).view === "grid" ? (a(!0), f(oe, { key: 1 }, ae(t(K), (q) => (a(), I(Ge, {
            key: q,
            "row-index": q,
            "row-height": R.value,
            view: "grid",
            "items-per-row": t(le),
            items: t(ne)(t(p), q),
            "show-thumbnails": t(d).showThumbnails,
            "is-dragging-item": B,
            "is-selected": T,
            "drag-n-drop-events": (me) => t(o).events(me),
            explorerId: t($),
            onClick: C,
            onDblclick: ce,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (a(!0), f(oe, { key: 2 }, ae(t(K), (q) => (a(), I(Ge, {
            key: q,
            "row-index": q,
            "row-height": R.value,
            view: "list",
            items: y(q) ? [y(q)] : [],
            compact: t(d).compactListView,
            "is-dragging-item": B,
            "is-selected": T,
            "drag-n-drop-events": (me) => t(o).events(me),
            explorerId: t($),
            onClick: C,
            onDblclick: ce,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      D(Wa)
    ]));
  }
}), ti = ["href", "download"], ni = ["onClick"], oi = /* @__PURE__ */ G({
  __name: "ContextMenu",
  setup(n) {
    const e = Y("ServiceContainer"), o = e.search, l = U(o.state), r = x(null), v = x([]), c = Ue({
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
    const m = (d) => d.link(e, v.value), u = (d) => {
      e.emitter.emit("vf-contextmenu-hide"), d.action(e, v.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: d, items: i, target: p = null }) => {
      if (c.items = e.contextMenuItems.filter((g) => g.show(e, {
        searchQuery: l.query,
        items: i,
        target: p
      })), l.query)
        if (p)
          e.emitter.emit("vf-context-selected", [p]);
        else
          return;
      else !p && !l.query ? e.emitter.emit("vf-context-selected", []) : i.length > 1 && i.some((g) => g.path === p.path) ? e.emitter.emit("vf-context-selected", i) : e.emitter.emit("vf-context-selected", [p]);
      _(d);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const _ = (d) => {
      const i = e.root, p = e.root.getBoundingClientRect(), g = i.getBoundingClientRect();
      let S = d.clientX - p.left, T = d.clientY - p.top;
      c.active = !0, Be(() => {
        const b = r.value?.getBoundingClientRect();
        let k = b?.height ?? 0, E = b?.width ?? 0;
        S = g.right - d.pageX + window.scrollX < E ? S - E : S, T = g.bottom - d.pageY + window.scrollY < k ? T - k : T, c.positions = {
          left: String(S) + "px",
          top: String(T) + "px"
        };
      });
    };
    return (d, i) => ie((a(), f("ul", {
      ref_key: "contextmenu",
      ref: r,
      class: X([c.active ? "vuefinder__context-menu--active" : "vuefinder__context-menu--inactive", "vuefinder__context-menu"]),
      style: Me(c.positions)
    }, [
      (a(!0), f(oe, null, ae(c.items, (p) => (a(), f("li", {
        class: "vuefinder__context-menu__item",
        key: p.title
      }, [
        p.link ? (a(), f("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: m(p),
          download: m(p),
          onClick: i[0] || (i[0] = (g) => t(e).emitter.emit("vf-contextmenu-hide"))
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
      [ge, c.active]
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
const Ct = { render: ri }, li = {
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
const ii = { render: ai }, di = { class: "vuefinder__status-bar__wrapper" }, ci = { class: "vuefinder__status-bar__storage" }, ui = ["title"], vi = { class: "vuefinder__status-bar__storage-icon" }, _i = ["value"], mi = ["value"], fi = { class: "vuefinder__status-bar__info" }, pi = { key: 0 }, hi = { class: "vuefinder__status-bar__selected-count" }, gi = { class: "vuefinder__status-bar__actions" }, wi = ["disabled"], bi = ["title"], yi = /* @__PURE__ */ G({
  __name: "Statusbar",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = e.search, v = U(r.state), c = U(l.sortedFiles), m = U(l.path), u = U(l.selectedCount), _ = U(l.storages), d = (p) => {
      const g = p.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: g } });
    }, i = re(() => {
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
            D(t(Ct))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: t(m)?.storage,
            onChange: d,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (a(!0), f(oe, null, ae(t(_), (S) => (a(), f("option", {
              value: S,
              key: S
            }, h(S), 9, mi))), 128))
          ], 40, _i)
        ], 8, ui),
        s("div", fi, [
          t(v).hasQuery ? (a(), f("span", pi, h(t(c).value.length) + " items found. ", 1)) : M("", !0),
          s("span", hi, h(t(u) > 0 ? `${t(u)} item(s) selected.` : ""), 1)
        ])
      ]),
      s("div", gi, [
        t(e).selectButton.active ? (a(), f("button", {
          key: 0,
          class: X(["vf-btn vf-btn-primary vf-btn-small", { disabled: !i.value }]),
          disabled: !i.value,
          onClick: g[0] || (g[0] = (S) => t(e).selectButton.click(t(l).selectedItems, S))
        }, h(t(o)("Select")), 11, wi)) : M("", !0),
        s("span", {
          class: "vuefinder__status-bar__about",
          title: t(o)("About"),
          onClick: g[1] || (g[1] = (S) => t(e).modal.open(ct))
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
const Et = { render: xi }, Si = {
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
const Mt = { render: Mi }, Ti = {
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
const Tt = { render: Ai };
function At(n, e) {
  const o = n.findIndex((l) => l.path === e.path);
  o > -1 ? n[o] = e : n.push(e);
}
const Di = { class: "vuefinder__folder-loader-indicator" }, Ii = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Dt = /* @__PURE__ */ G({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ qt({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, o = Y("ServiceContainer"), { t: l } = o.i18n, r = lt(n, "modelValue"), v = x(!1);
    ve(
      () => r.value,
      () => c()?.folders.length || m()
    );
    function c() {
      return o.treeViewData.find((u) => u.path === e.path);
    }
    const m = () => {
      v.value = !0, o.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          storage: e.storage,
          adapter: e.storage,
          path: e.path
        }
      }).then((u) => {
        At(o.treeViewData, { path: e.path, type: "dir", ...u });
      }).catch((u) => {
      }).finally(() => {
        v.value = !1;
      });
    };
    return (u, _) => (a(), f("div", Di, [
      v.value ? (a(), I(t(et), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (a(), f("div", Ii, [
        r.value && c()?.folders.length ? (a(), I(t(Tt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : M("", !0),
        r.value ? M("", !0) : (a(), I(t(Mt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Fi = ["onClick"], Vi = ["title", "onDblclick", "onClick"], Li = { class: "vuefinder__treesubfolderlist__item-icon" }, Ri = { class: "vuefinder__treesubfolderlist__subfolder" }, Bi = /* @__PURE__ */ G({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = Y("ServiceContainer"), o = e.fs, l = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), r = x({}), v = U(o.path), c = n, m = x(null);
    de(() => {
      c.path === c.storage + "://" && m.value && Xe(m.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const u = re(() => e.treeViewData.find((_) => _.path === c.path)?.folders || []);
    return (_, d) => {
      const i = Nt("TreeSubfolderList", !0);
      return a(), f("ul", {
        ref_key: "parentSubfolderList",
        ref: m,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (a(!0), f(oe, null, ae(u.value, (p) => (a(), f("li", {
          key: p.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", ke(Ee(t(l).events({ ...p, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (g) => r.value[p.path] = !r.value[p.path]
            }, [
              D(Dt, {
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
              onClick: (g) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: c.storage, path: p.path } })
            }, [
              s("div", Li, [
                t(v)?.path === p.path ? (a(), I(t(Et), { key: 0 })) : (a(), I(t(Oe), { key: 1 }))
              ]),
              s("div", {
                class: X(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(v)?.path === p.path
                }])
              }, h(p.basename), 3)
            ], 40, Vi)
          ], 16),
          s("div", Ri, [
            ie(D(i, {
              storage: c.storage,
              path: p.path
            }, null, 8, ["storage", "path"]), [
              [ge, r.value[p.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Hi = /* @__PURE__ */ G({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = Y("ServiceContainer"), o = e.fs, l = x(!1), r = n, v = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), c = U(o.path), m = re(() => r.storage === c.value?.storage), u = {
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
    function _(d) {
      d === c.value?.storage ? l.value = !l.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: d, adapter: d } }));
    }
    return (d, i) => (a(), f(oe, null, [
      s("div", {
        onClick: i[2] || (i[2] = (p) => _(n.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        s("div", ke(Ee(t(v).events(u), !0), {
          class: ["vuefinder__treestorageitem__info", m.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          s("div", {
            class: X(["vuefinder__treestorageitem__icon", m.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            D(t(Ct))
          ], 2),
          s("div", null, h(n.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: i[1] || (i[1] = we((p) => l.value = !l.value, ["stop"]))
        }, [
          D(Dt, {
            storage: n.storage,
            path: n.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": i[0] || (i[0] = (p) => l.value = p)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      ie(D(Bi, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ge, l.value]
      ])
    ], 64));
  }
}), qi = { class: "vuefinder__folder-indicator" }, Ni = { class: "vuefinder__folder-indicator--icon" }, Pi = /* @__PURE__ */ G({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = lt(n, "modelValue");
    return (o, l) => (a(), f("div", qi, [
      s("div", Ni, [
        e.value ? (a(), I(t(Tt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : M("", !0),
        e.value ? M("", !0) : (a(), I(t(Mt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Ui = { class: "vuefinder__treeview__header" }, Oi = { class: "vuefinder__treeview__pinned-label" }, zi = { class: "vuefinder__treeview__pin-text text-nowrap" }, Ki = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, ji = ["onClick"], Gi = ["title"], Yi = ["onClick"], Wi = { key: 0 }, Qi = { class: "vuefinder__treeview__no-pinned" }, Xi = /* @__PURE__ */ G({
  __name: "TreeView",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, { getStore: l, setStore: r } = e.storage, v = e.fs, c = e.config, m = U(c.state), u = U(v.sortedFiles), _ = U(v.path), d = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), i = x(190), p = x(l("pinned-folders-opened", !0));
    ve(p, (b) => r("pinned-folders-opened", b));
    const g = (b) => {
      c.set("pinnedFolders", c.get("pinnedFolders").filter((k) => k.path !== b.path));
    }, S = (b) => {
      const k = b.clientX, E = b.target.parentElement;
      if (!E) return;
      const F = E.getBoundingClientRect().width;
      E.classList.remove("transition-[width]"), E.classList.add("transition-none");
      const R = (le) => {
        i.value = F + le.clientX - k, i.value < 50 && (i.value = 0, c.set("showTreeView", !1)), i.value > 50 && c.set("showTreeView", !0);
      }, J = () => {
        const le = E.getBoundingClientRect();
        i.value = le.width, E.classList.add("transition-[width]"), E.classList.remove("transition-none"), window.removeEventListener("mousemove", R), window.removeEventListener("mouseup", J);
      };
      window.addEventListener("mousemove", R), window.addEventListener("mouseup", J);
    }, T = x(null);
    return de(() => {
      T.value && Xe(T.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), ve(u, (b) => {
      const k = b.filter((E) => E.type === "dir");
      At(e.treeViewData, {
        path: _.value?.path || "",
        folders: k.map((E) => ({
          storage: E.storage,
          path: E.path,
          basename: E.basename,
          type: "dir"
        }))
      });
    }), (b, k) => (a(), f(oe, null, [
      s("div", {
        onClick: k[0] || (k[0] = (E) => t(c).toggle("showTreeView")),
        class: X(["vuefinder__treeview__overlay", t(m).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      s("div", {
        style: Me(t(m).showTreeView ? "min-width:100px;max-width:75%; width: " + i.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: T,
          class: "vuefinder__treeview__scroll"
        }, [
          s("div", Ui, [
            s("div", {
              onClick: k[2] || (k[2] = (E) => p.value = !p.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              s("div", Oi, [
                D(t($t), { class: "vuefinder__treeview__pin-icon" }),
                s("div", zi, h(t(o)("Pinned Folders")), 1)
              ]),
              D(Pi, {
                modelValue: p.value,
                "onUpdate:modelValue": k[1] || (k[1] = (E) => p.value = E)
              }, null, 8, ["modelValue"])
            ]),
            p.value ? (a(), f("ul", Ki, [
              (a(!0), f(oe, null, ae(t(m).pinnedFolders, (E) => (a(), f("li", {
                key: E.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", ke(Ee(t(d).events(E), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (F) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: E.storage, path: E.path } })
                }), [
                  t(_)?.path !== E.path ? (a(), I(t(Oe), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : M("", !0),
                  t(_)?.path === E.path ? (a(), I(t(Et), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : M("", !0),
                  s("div", {
                    title: E.path,
                    class: X(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": t(_)?.path === E.path
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
              t(m).pinnedFolders.length ? M("", !0) : (a(), f("li", Wi, [
                s("div", Qi, h(t(o)("No folders pinned")), 1)
              ]))
            ])) : M("", !0)
          ]),
          (a(!0), f(oe, null, ae(t(v).storages.get(), (E) => (a(), f("div", {
            class: "vuefinder__treeview__storage",
            key: E
          }, [
            D(Hi, { storage: E }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        s("div", {
          onMousedown: S,
          class: "vuefinder__treeview__resize-handle"
        }, null, 32)
      ], 4)
    ], 64));
  }
}), pe = {
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
function _e(n) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, n);
  return (o, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== Ji(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !o.features.includes(e.feature));
}
function Ye(...n) {
  return (e, o) => n.some((l) => l(e, o));
}
function Re(...n) {
  return (e, o) => n.every((l) => l(e, o));
}
const Zi = [
  {
    id: pe.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      n.emitter.emit("vf-search-exit"), n.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0]?.storage, path: e[0]?.path }
      });
    },
    show: _e({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: pe.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.emitter.emit("vf-fetch", { params: { q: "index", storage: e.path.get().storage, path: e.path.get().path } });
    },
    show: Ye(_e({ target: "none" }), _e({ target: "many" }))
  },
  {
    id: pe.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll();
    },
    show: _e({ target: "none" })
  },
  {
    id: pe.newfolder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(gt),
    show: _e({ target: "none", feature: ee.NEW_FOLDER })
  },
  {
    id: pe.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      n.emitter.emit("vf-search-exit"), e[0] && n.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0].storage, path: e[0].path }
      });
    },
    show: _e({ target: "one", targetType: "dir" })
  },
  {
    id: pe.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const o = n.config, l = o.get("pinnedFolders"), r = l.concat(e.filter((v) => l.findIndex((c) => c.path === v.path) === -1));
      o.set("pinnedFolders", r);
    },
    show: Re(
      _e({ target: "one", targetType: "dir" }),
      (n, e) => n.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) === -1
    )
  },
  {
    id: pe.unpinFolder,
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      const o = n.config, l = o.get("pinnedFolders");
      o.set("pinnedFolders", l.filter((r) => !e.find((v) => v.path === r.path)));
    },
    show: Re(
      _e({ target: "one", targetType: "dir" }),
      (n, e) => n.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) !== -1
    )
  },
  {
    id: pe.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(mt, { storage: e[0]?.storage, item: e[0] }),
    show: Re(
      _e({ target: "one", feature: ee.PREVIEW }),
      (n, e) => e.target?.type !== "dir"
    )
  },
  {
    id: pe.download,
    link: (n, e) => n.requester.getDownloadUrl(e[0]?.storage, e[0]),
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: Re(
      _e({ target: "one", feature: ee.DOWNLOAD }),
      (n, e) => e.target?.type !== "dir"
    )
  },
  {
    id: pe.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(Ze, { items: e }),
    show: _e({ target: "one", feature: ee.RENAME })
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
    id: pe.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(St, { items: e }),
    show: Ye(
      _e({ target: "many", feature: ee.ARCHIVE }),
      Re(
        _e({ target: "one", feature: ee.ARCHIVE }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: pe.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(kt, { items: e }),
    show: _e({ target: "one", feature: ee.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: pe.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(Je, { items: e });
    },
    show: Ye(
      _e({ feature: ee.DELETE, target: "one" }),
      _e({ feature: ee.DELETE, target: "many" })
    )
  }
], ed = {
  class: "vuefinder",
  ref: "root",
  tabindex: "0"
}, td = { class: "vuefinder__main__content" }, nd = /* @__PURE__ */ G({
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
    const o = e, l = n, r = cn(l, Y("VueFinderOptions"));
    Pt("ServiceContainer", r);
    const v = r.config, c = r.fs, m = U(v.state), u = U(c.selectedItems);
    Xs(r);
    let _ = null;
    r.emitter.on("vf-fetch-abort", () => {
      _ && _.abort(), c.setLoading(!1);
    }), r.emitter.on("vf-fetch", ({ params: i, body: p = null, onSuccess: g = null, onError: S = null, noCloseModal: T = !1 }) => {
      ["index", "search"].includes(i.q) && (_ && _.abort(), c.setLoading(!0)), i.adapter = i.storage, _ = new AbortController();
      const b = _.signal;
      r.requester.send({
        url: "",
        method: i.m || "get",
        params: i,
        body: p,
        abortSignal: b
      }).then((k) => {
        c.setPath(k.dirname), v.get("persist") && v.set("path", k.dirname), T || r.modal.close(), c.setFiles(k.files), c.clearSelection(), c.setSelectedCount(0), c.setStorages(k.storages), g && g(k);
      }).catch((k) => {
        console.error(k), S ? S(k) : k && typeof k == "object" && "message" in k && r.emitter.emit("vf-toast-push", { label: k.message, type: "error" });
      }).finally(() => {
        ["index", "search"].includes(i.q) && c.setLoading(!1);
      });
    });
    function d(i) {
      let p = {};
      i && i.includes("://") && (p = {
        storage: i.split("://")[0],
        path: i
      }), r.emitter.emit("vf-fetch", {
        params: { q: "index", storage: c.path.get().storage, ...p },
        onError: l.onError ?? ((g) => {
          g && typeof g == "object" && "message" in g && r.emitter.emit("vf-toast-push", { label: g.message, type: "error" });
        })
      });
    }
    return de(() => {
      ve(() => l.path, (p) => {
        d(p);
      });
      const i = v.get("persist") ? v.get("path") : l.path;
      c.setPath(i), d(i), r.emitter.on("vf-select", (p) => {
        r.selectedItems = p, o("select", p);
      }), ve(() => c.path.get().path, (p) => {
        o("update:path", p);
      }), ve(u, (p) => {
        o("select", p);
      });
    }), (i, p) => (a(), f("div", ed, [
      s("div", {
        class: X(t(r).theme.actualValue)
      }, [
        s("div", {
          class: X([t(m).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: Me(t(m).fullScreen ? "" : "max-height: " + n.maxHeight),
          onMousedown: p[0] || (p[0] = (g) => t(r).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (g) => t(r).emitter.emit("vf-contextmenu-hide"))
        }, [
          D(kl),
          D(va),
          s("div", td, [
            D(Xi),
            D(ei)
          ]),
          D(yi)
        ], 38),
        D(Ut, { name: "fade" }, {
          default: j(() => [
            t(r).modal.visible ? (a(), I(Qe(t(r).modal.type), { key: 0 })) : M("", !0)
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
  pe as ContextMenuIds,
  nd as VueFinder,
  md as VueFinderPlugin,
  Zi as contextMenuItems,
  md as default
};
