import { reactive as Ue, watch as ve, ref as b, shallowRef as rt, useTemplateRef as De, defineComponent as G, inject as Y, onMounted as de, nextTick as Be, createElementBlock as f, openBlock as i, withKeys as Ve, unref as t, createElementVNode as s, withModifiers as we, renderSlot as Pe, createBlock as I, resolveDynamicComponent as Qe, toDisplayString as p, onUnmounted as He, normalizeClass as X, computed as se, withCtx as j, createVNode as D, createCommentVNode as T, Fragment as ne, renderList as re, createTextVNode as P, withDirectives as ae, vModelSelect as tt, vModelText as Le, onBeforeUnmount as It, customRef as Ft, mergeProps as ke, toHandlers as Ee, vShow as ge, isRef as Vt, Teleport as Lt, normalizeStyle as Me, normalizeProps as Rt, TransitionGroup as Bt, onUpdated as Ht, mergeModels as qt, useModel as lt, resolveComponent as Nt, provide as Pt, Transition as Ut } from "vue";
import { useStore as O } from "@nanostores/vue";
import Ot from "mitt";
import { persistentAtom as zt } from "@nanostores/persistent";
import { atom as pe, computed as Fe } from "nanostores";
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
        o.body != null && Object.entries(this.config.body).forEach(([a, h]) => {
          d.append(a, String(h));
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
  const { getStore: r, setStore: v } = n, c = b({}), m = b(r("locale", e)), u = (a, h = e) => {
    Jt(a, l).then((g) => {
      c.value = g, v("locale", a), m.value = a, v("translations", g), Object.values(l).length > 1 && (o.emit("vf-toast-push", { label: "The language is set to " + a }), o.emit("vf-language-saved"));
    }).catch(() => {
      h ? (o.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), u(h, null)) : o.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  ve(m, (a) => {
    u(a);
  }), !r("locale") && !Object.keys(l).length ? u(e) : c.value = r("translations");
  const _ = (a, ...h) => h.length ? _(a = a.replace("%s", String(h.shift())), ...h) : a;
  function d(a, ...h) {
    return c.value && Object.prototype.hasOwnProperty.call(c.value, a) ? _(c.value[a] || a, ...h) : _(a, ...h);
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
  const o = b(Ce.SYSTEM), l = b(Ce.LIGHT);
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
  const n = rt(null), e = b(!1), o = b();
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
    const d = o.get(), a = { ...je, ..._, ...d };
    o.set(a);
  }, r = (_) => o.get()[_], v = () => o.get(), c = (_, d) => {
    const a = o.get();
    typeof _ == "object" && _ !== null ? o.set({ ...a, ..._ }) : o.set({ ...a, [_]: d });
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
  const n = pe(""), e = pe([]), o = pe([]), l = pe({ active: !1, column: "", order: "" }), r = pe(/* @__PURE__ */ new Set()), v = pe({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = pe(null), m = pe(0), u = pe(!1), _ = Fe([n], (w) => {
    const M = (w || "local://").trim(), te = M.indexOf("://"), ce = te >= 0 ? M.slice(0, te) : "", Te = (te >= 0 ? M.slice(te + 3) : M).split("/").filter(Boolean);
    let ye = "";
    const Ae = Te.map(($e) => (ye = ye ? `${ye}/${$e}` : $e, { basename: $e, name: $e, path: ce ? `${ce}://${ye}` : ye, type: "dir" }));
    return { storage: ce, breadcrumb: Ae, path: M };
  }), d = Fe([o, l], (w, M) => {
    const { active: te, column: ce, order: Se } = M;
    if (!te || !ce) return w;
    const Te = Se === "asc" ? 1 : -1;
    return w.slice().sort((ye, Ae) => ln(ye[ce], Ae[ce]) * Te);
  }), a = Fe([o, r], (w, M) => M.size === 0 ? [] : w.filter((te) => M.has(te.path))), h = (w) => {
    n.set(w);
  }, g = (w) => {
    o.set(w ?? []);
  }, C = (w) => {
    e.set(w ?? []);
  }, k = (w, M) => {
    l.set({ active: !0, column: w, order: M });
  }, S = (w) => {
    const M = l.get();
    M.active && M.column === w ? l.set({
      active: M.order === "asc",
      column: w,
      order: "desc"
    }) : l.set({
      active: !0,
      column: w,
      order: "asc"
    });
  }, y = () => {
    l.set({ active: !1, column: "", order: "" });
  }, $ = (w) => {
    const M = new Set(r.get());
    M.add(w), r.set(M), m.set(M.size);
  }, F = (w) => {
    const M = new Set(r.get());
    M.delete(w), r.set(M), m.set(M.size);
  }, U = (w) => {
    const M = new Set(r.get());
    M.has(w) ? M.delete(w) : M.add(w), r.set(M), m.set(M.size);
  }, J = () => {
    const w = new Set(o.get().map((M) => M.path));
    r.set(w), m.set(w.size);
  }, oe = () => {
    r.set(/* @__PURE__ */ new Set()), m.set(0);
  }, B = (w) => {
    const M = new Set(w ?? []);
    r.set(M), m.set(M.size);
  }, L = (w) => {
    m.set(w);
  }, le = (w) => {
    u.set(!!w);
  }, z = () => u.get(), ie = (w, M) => {
    const te = o.get().filter((ce) => M.has(ce.path));
    v.set({
      type: w,
      path: _.get().path,
      items: new Set(te)
    });
  }, V = (w) => Fe([v], (M) => M.type === "cut" && Array.from(M.items).some((te) => te.path === w)), x = (w) => Fe([v], (M) => M.type === "copy" && Array.from(M.items).some((te) => te.path === w));
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
    selectedItems: a,
    // Actions
    setPath: h,
    setFiles: g,
    setStorages: C,
    setSort: k,
    toggleSort: S,
    clearSort: y,
    select: $,
    deselect: F,
    toggleSelect: U,
    selectAll: J,
    clearSelection: oe,
    setSelection: B,
    setSelectedCount: L,
    setLoading: le,
    isLoading: z,
    setClipboard: ie,
    createIsCut: V,
    createIsCopied: x,
    isCut: (w) => {
      const M = V(w);
      return O(M).value ?? !1;
    },
    isCopied: (w) => {
      const M = x(w);
      return O(M).value ?? !1;
    },
    clearClipboard: () => {
      v.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
    },
    getClipboard: () => v.get(),
    setDraggedItem: (w) => {
      c.set(w);
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
  const n = pe(nt), e = Fe(n, (_) => _.query.length > 0);
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
      const a = n.get();
      typeof _ == "object" && _ !== null ? n.set({ ...a, ..._ }) : n.set({ ...a, [_]: d });
    },
    all: () => n.get(),
    reset: () => {
      n.set({ ...nt });
    }
  };
}, cn = (n, e) => {
  const o = Xt(n.id), l = Ot(), r = on(o, n.theme), v = e.i18n, c = n.locale ?? e.locale, m = rn(n.id), u = an(), _ = dn(), d = (a) => Array.isArray(a) ? a : en;
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
    const e = b(null), o = Y("ServiceContainer");
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
    }), (l, r) => (i(), f("div", {
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
}), mn = { class: "vuefinder__modal-header" }, fn = { class: "vuefinder__modal-header__icon-container" }, hn = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, xe = /* @__PURE__ */ G({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, o) => (i(), f("div", mn, [
      s("div", fn, [
        (i(), I(Qe(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("h3", hn, p(n.title), 1)
    ]));
  }
}), pn = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: o }) {
    const l = Y("ServiceContainer"), r = b(!1), { t: v } = l.i18n;
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
  return i(), f("div", {
    class: X(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    n.$slots.default ? Pe(n.$slots, "default", { key: 0 }) : (i(), f("span", wn, p(l.t("Saved.")), 1))
  ], 2);
}
const Ie = /* @__PURE__ */ gn(pn, [["render", bn]]), yn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function kn(n, e) {
  return i(), f("svg", yn, [...e[0] || (e[0] = [
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
}, fo = { class: "vuefinder__about-modal__shortcuts" }, ho = { class: "vuefinder__about-modal__shortcut" }, po = { class: "vuefinder__about-modal__shortcut" }, go = { class: "vuefinder__about-modal__shortcut" }, wo = { class: "vuefinder__about-modal__shortcut" }, bo = { class: "vuefinder__about-modal__shortcut" }, yo = { class: "vuefinder__about-modal__shortcut" }, ko = { class: "vuefinder__about-modal__shortcut" }, xo = { class: "vuefinder__about-modal__shortcut" }, So = { class: "vuefinder__about-modal__shortcut" }, $o = { class: "vuefinder__about-modal__shortcut" }, Co = {
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
    }, c = se(() => [
      { name: r("About"), key: v.ABOUT, current: !1 },
      { name: r("Settings"), key: v.SETTINGS, current: !1 },
      { name: r("Shortcuts"), key: v.SHORTCUTS, current: !1 },
      { name: r("Reset"), key: v.RESET, current: !1 }
    ]), m = b("about"), u = async () => {
      o.reset(), l(), location.reload();
    }, _ = ($) => {
      e.theme.set($), e.emitter.emit("vf-theme-saved");
    }, d = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? dt : it, e.emitter.emit("vf-metric-units-saved");
    }, a = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, h = () => {
      o.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, g = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: C } = Y("VueFinderOptions"), S = Object.fromEntries(
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
      }).filter(([$]) => Object.keys(C).includes($))
    ), y = se(() => ({
      system: r("System"),
      light: r("Light"),
      dark: r("Dark")
    }));
    return ($, F) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: F[3] || (F[3] = (U) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(r)("Close")), 1)
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
                  (i(!0), f(ne, null, re(c.value, (U) => (i(), f("button", {
                    key: U.name,
                    onClick: (J) => m.value = U.key,
                    class: X([U.key === m.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": U.current ? "page" : void 0
                  }, p(U.name), 11, En))), 128))
                ])
              ])
            ]),
            m.value === v.ABOUT ? (i(), f("div", Mn, [
              s("div", Tn, p(t(r)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              s("a", An, p(t(r)("Project home")), 1),
              s("a", Dn, p(t(r)("Follow on GitHub")), 1)
            ])) : T("", !0),
            m.value === v.SETTINGS ? (i(), f("div", In, [
              s("div", Fn, p(t(r)("Customize your experience with the following settings")), 1),
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
                        P(p(t(r)("Use Metric Units")) + " ", 1),
                        D(Ie, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: j(() => [
                            P(p(t(r)("Saved.")), 1)
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
                        onChange: a,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Un)
                    ]),
                    s("div", On, [
                      s("label", zn, [
                        P(p(t(r)("Compact list view")) + " ", 1),
                        D(Ie, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: j(() => [
                            P(p(t(r)("Saved.")), 1)
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
                        P(p(t(r)("Persist path on reload")) + " ", 1),
                        D(Ie, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: j(() => [
                            P(p(t(r)("Saved.")), 1)
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
                        onChange: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Jn)
                    ]),
                    s("div", Zn, [
                      s("label", eo, [
                        P(p(t(r)("Show thumbnails")) + " ", 1),
                        D(Ie, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: j(() => [
                            P(p(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", to, [
                    s("div", no, [
                      s("label", oo, p(t(r)("Theme")), 1)
                    ]),
                    s("div", so, [
                      ae(s("select", {
                        id: "theme",
                        "onUpdate:modelValue": F[0] || (F[0] = (U) => t(e).theme.value = U),
                        onChange: F[1] || (F[1] = (U) => _(U.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Theme")
                        }, [
                          (i(!0), f(ne, null, re(y.value, (U, J) => (i(), f("option", { value: J }, p(U), 9, lo))), 256))
                        ], 8, ro)
                      ], 544), [
                        [tt, t(e).theme.value]
                      ]),
                      D(Ie, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: j(() => [
                          P(p(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t(e).features.includes(t(ee).LANGUAGE) && Object.keys(t(S)).length > 1 ? (i(), f("div", ao, [
                    s("div", io, [
                      s("label", co, p(t(r)("Language")), 1)
                    ]),
                    s("div", uo, [
                      ae(s("select", {
                        id: "language",
                        "onUpdate:modelValue": F[2] || (F[2] = (U) => t(e).i18n.locale = U),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Language")
                        }, [
                          (i(!0), f(ne, null, re(t(S), (U, J) => (i(), f("option", { value: J }, p(U), 9, _o))), 256))
                        ], 8, vo)
                      ], 512), [
                        [tt, t(e).i18n.locale]
                      ]),
                      D(Ie, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: j(() => [
                          P(p(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : T("", !0)
                ])
              ])
            ])) : T("", !0),
            m.value === v.SHORTCUTS ? (i(), f("div", mo, [
              s("div", fo, [
                s("div", ho, [
                  s("div", null, p(t(r)("Rename")), 1),
                  F[4] || (F[4] = s("kbd", null, "F2", -1))
                ]),
                s("div", po, [
                  s("div", null, p(t(r)("Refresh")), 1),
                  F[5] || (F[5] = s("kbd", null, "F5", -1))
                ]),
                s("div", go, [
                  P(p(t(r)("Delete")) + " ", 1),
                  F[6] || (F[6] = s("kbd", null, "Del", -1))
                ]),
                s("div", wo, [
                  P(p(t(r)("Escape")) + " ", 1),
                  F[7] || (F[7] = s("div", null, [
                    s("kbd", null, "Esc")
                  ], -1))
                ]),
                s("div", bo, [
                  P(p(t(r)("Select All")) + " ", 1),
                  F[8] || (F[8] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    P(" + "),
                    s("kbd", null, "A")
                  ], -1))
                ]),
                s("div", yo, [
                  P(p(t(r)("Search")) + " ", 1),
                  F[9] || (F[9] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    P(" + "),
                    s("kbd", null, "F")
                  ], -1))
                ]),
                s("div", ko, [
                  P(p(t(r)("Toggle Sidebar")) + " ", 1),
                  F[10] || (F[10] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    P(" + "),
                    s("kbd", null, "E")
                  ], -1))
                ]),
                s("div", xo, [
                  P(p(t(r)("Open Settings")) + " ", 1),
                  F[11] || (F[11] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    P(" + "),
                    s("kbd", null, ",")
                  ], -1))
                ]),
                s("div", So, [
                  P(p(t(r)("Toggle Full Screen")) + " ", 1),
                  F[12] || (F[12] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    P(" + "),
                    s("kbd", null, "Enter")
                  ], -1))
                ]),
                s("div", $o, [
                  P(p(t(r)("Preview")) + " ", 1),
                  F[13] || (F[13] = s("div", null, [
                    s("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : T("", !0),
            m.value === v.RESET ? (i(), f("div", Co, [
              s("div", Eo, p(t(r)("Reset all settings to default")), 1),
              s("button", {
                onClick: u,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, p(t(r)("Reset Settings")), 1)
            ])) : T("", !0)
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
  return i(), f("svg", Mo, [...e[0] || (e[0] = [
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
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = O(l.path), v = b(e.modal.data.items), c = b(""), m = () => {
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
    return (u, _) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-danger"
        }, p(t(o)("Yes, Delete!")), 1),
        s("button", {
          type: "button",
          onClick: _[1] || (_[1] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(o)("Cancel")), 1),
        s("div", Ho, p(t(o)("This action cannot be undone.")), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(ut),
            title: t(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", Ao, [
            s("div", Do, [
              s("p", Io, p(t(o)("Are you sure you want to delete these files?")), 1),
              s("div", Fo, [
                (i(!0), f(ne, null, re(v.value, (d) => (i(), f("p", Vo, [
                  d.type === "dir" ? (i(), f("svg", Lo, [..._[2] || (_[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (i(), f("svg", Ro, [..._[3] || (_[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", Bo, p(d.basename), 1)
                ]))), 256))
              ]),
              c.value.length ? (i(), I(t(c), {
                key: 0,
                onHidden: _[0] || (_[0] = (d) => c.value = ""),
                error: ""
              }, {
                default: j(() => [
                  P(p(c.value), 1)
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
}), qo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function No(n, e) {
  return i(), f("svg", qo, [...e[0] || (e[0] = [
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
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = O(l.path), v = b(e.modal.data.items[0]), c = b(e.modal.data.items[0].basename), m = b(""), u = () => {
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
    return (_, d) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, p(t(o)("Rename")), 1),
        s("button", {
          type: "button",
          onClick: d[2] || (d[2] = (a) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(o)("Cancel")), 1)
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
                v.value.type === "dir" ? (i(), f("svg", zo, [...d[3] || (d[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (i(), f("svg", Ko, [...d[4] || (d[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", jo, p(v.value.basename), 1)
              ]),
              ae(s("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => c.value = a),
                onKeyup: Ve(u, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Le, c.value]
              ]),
              m.value.length ? (i(), I(t(m), {
                key: 0,
                onHidden: d[1] || (d[1] = (a) => m.value = ""),
                error: ""
              }, {
                default: j(() => [
                  P(p(m.value), 1)
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
}), Go = ["title"], _t = /* @__PURE__ */ G({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const o = e, l = Y("ServiceContainer"), { t: r } = l.i18n, v = b(!1), c = b(null), m = b(c.value?.innerHTML);
    ve(m, () => v.value = !1);
    const u = () => {
      o("hidden"), v.value = !0;
    };
    return (_, d) => (i(), f("div", null, [
      v.value ? T("", !0) : (i(), f("div", {
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
    const o = e, l = b(""), r = b(""), v = b(null), c = b(!1), m = b(""), u = b(!1), _ = Y("ServiceContainer"), { t: d } = _.i18n;
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
    const a = () => {
      c.value = !c.value, r.value = l.value;
    }, h = () => {
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
    return (g, C) => (i(), f("div", Yo, [
      s("div", Wo, [
        s("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(_).modal.data.item.path
        }, p(t(_).modal.data.item.basename), 9, Qo),
        s("div", Xo, [
          c.value ? (i(), f("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__text-preview__save-button"
          }, p(t(d)("Save")), 1)) : T("", !0),
          t(_).features.includes(t(ee).EDIT) ? (i(), f("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: C[0] || (C[0] = (k) => a())
          }, p(c.value ? t(d)("Cancel") : t(d)("Edit")), 1)) : T("", !0)
        ])
      ]),
      s("div", null, [
        c.value ? (i(), f("div", Zo, [
          ae(s("textarea", {
            ref_key: "editInput",
            ref: v,
            "onUpdate:modelValue": C[1] || (C[1] = (k) => r.value = k),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Le, r.value]
          ])
        ])) : (i(), f("pre", Jo, p(l.value), 1)),
        m.value.length ? (i(), I(_t, {
          key: 2,
          onHidden: C[2] || (C[2] = (k) => m.value = ""),
          error: u.value
        }, {
          default: j(() => [
            P(p(m.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : T("", !0)
      ])
    ]));
  }
}), ts = { class: "vuefinder__image-preview" }, ns = { class: "vuefinder__image-preview__header" }, os = ["title"], ss = { class: "vuefinder__image-preview__actions" }, rs = { class: "vuefinder__image-preview__image-container h-[50vh] w-full" }, ls = ["src"], as = /* @__PURE__ */ G({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = Y("ServiceContainer"), { t: r } = l.i18n, v = b(!1), c = b(""), m = b(!1), u = b(l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item)), _ = b(u.value), d = De("cropperRef"), a = async () => {
      v.value = !v.value;
    }, h = async () => {
      const C = d.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      C && C.toBlob((k) => {
        if (!k) return;
        c.value = "", m.value = !1;
        const S = new FormData();
        S.set("file", k), l.requester.send({
          url: "",
          method: "post",
          params: {
            q: "upload",
            storage: l.modal.data.storage,
            adapter: l.modal.data.storage,
            path: l.modal.data.item.path
          },
          body: S
        }).then(() => {
          c.value = r("Updated."), fetch(u.value, { cache: "reload", mode: "no-cors" });
          const y = l.root.querySelector('[data-src="' + u.value + '"]');
          at.resetStatus(y), l.emitter.emit("vf-refresh-thumbnails"), a(), o("success");
        }).catch((y) => {
          const $ = y?.message ?? "Error";
          c.value = r($), m.value = !0;
        });
      });
    };
    return de(() => {
      o("success");
    }), (g, C) => (i(), f("div", ts, [
      s("div", ns, [
        s("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, p(t(l).modal.data.item.basename), 9, os),
        s("div", ss, [
          v.value ? (i(), f("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__image-preview__crop-button"
          }, p(t(r)("Crop")), 1)) : T("", !0),
          t(l).features.includes(t(ee).EDIT) ? (i(), f("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: C[0] || (C[0] = (k) => a())
          }, p(v.value ? t(r)("Cancel") : t(r)("Edit")), 1)) : T("", !0)
        ])
      ]),
      s("div", rs, [
        v.value ? (i(), I(t(Kt), {
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
        }, null, 8, ["src"])) : (i(), f("img", {
          key: 0,
          style: { width: "100%", height: "100%" },
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, ls))
      ]),
      c.value.length ? (i(), I(t(c), {
        key: 0,
        onHidden: C[1] || (C[1] = (k) => c.value = ""),
        error: m.value
      }, {
        default: j(() => [
          P(p(c.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : T("", !0)
    ]));
  }
}), is = { class: "vuefinder__default-preview" }, ds = { class: "vuefinder__default-preview__header" }, cs = ["title"], us = /* @__PURE__ */ G({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = Y("ServiceContainer"), l = e;
    return de(() => {
      l("success");
    }), (r, v) => (i(), f("div", is, [
      s("div", ds, [
        s("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: t(o).modal.data.item.path
        }, p(t(o).modal.data.item.basename), 9, cs)
      ]),
      v[0] || (v[0] = s("div", null, null, -1))
    ]));
  }
}), vs = { class: "vuefinder__video-preview" }, _s = ["title"], ms = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, fs = ["src"], hs = /* @__PURE__ */ G({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = Y("ServiceContainer"), l = e, r = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return de(() => {
      l("success");
    }), (v, c) => (i(), f("div", vs, [
      s("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, p(t(o).modal.data.item.basename), 9, _s),
      s("div", null, [
        s("video", ms, [
          s("source", {
            src: r(),
            type: "video/mp4"
          }, null, 8, fs),
          c[0] || (c[0] = P(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), ps = { class: "vuefinder__audio-preview" }, gs = ["title"], ws = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, bs = ["src"], ys = /* @__PURE__ */ G({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = Y("ServiceContainer"), r = () => l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item);
    return de(() => {
      o("success");
    }), (v, c) => (i(), f("div", ps, [
      s("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: t(l).modal.data.item.path
      }, p(t(l).modal.data.item.basename), 9, gs),
      s("div", null, [
        s("audio", ws, [
          s("source", {
            src: r(),
            type: "audio/mpeg"
          }, null, 8, bs),
          c[0] || (c[0] = P(" Your browser does not support the audio element. ", -1))
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
    }), (v, c) => (i(), f("div", ks, [
      s("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, p(t(o).modal.data.item.basename), 9, xs),
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
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = b(!1), r = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), v = e.features.includes(ee.PREVIEW);
    return v || (l.value = !0), (c, m) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: m[6] || (m[6] = (u) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(o)("Close")), 1),
        t(e).features.includes(t(ee).DOWNLOAD) ? (i(), f("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item),
          href: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item)
        }, p(t(o)("Download")), 9, Rs)) : T("", !0)
      ]),
      default: j(() => [
        s("div", null, [
          s("div", Ms, [
            t(v) ? (i(), f("div", Ts, [
              r("text") ? (i(), I(es, {
                key: 0,
                onSuccess: m[0] || (m[0] = (u) => l.value = !0)
              })) : r("image") ? (i(), I(as, {
                key: 1,
                onSuccess: m[1] || (m[1] = (u) => l.value = !0)
              })) : r("video") ? (i(), I(hs, {
                key: 2,
                onSuccess: m[2] || (m[2] = (u) => l.value = !0)
              })) : r("audio") ? (i(), I(ys, {
                key: 3,
                onSuccess: m[3] || (m[3] = (u) => l.value = !0)
              })) : r("application/pdf") ? (i(), I(Cs, {
                key: 4,
                onSuccess: m[4] || (m[4] = (u) => l.value = !0)
              })) : (i(), I(us, {
                key: 5,
                onSuccess: m[5] || (m[5] = (u) => l.value = !0)
              }))
            ])) : T("", !0),
            s("div", As, [
              l.value === !1 ? (i(), f("div", Ds, [
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
                s("span", null, p(t(o)("Loading")), 1)
              ])) : T("", !0)
            ])
          ])
        ]),
        s("div", Is, [
          s("div", null, [
            s("span", Fs, p(t(o)("File Size")) + ": ", 1),
            P(p(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", Vs, p(t(o)("Last Modified")) + ": ", 1),
            P(" " + p(t(Es)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(ee).DOWNLOAD) ? (i(), f("div", Ls, [
          s("span", null, p(t(o)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : T("", !0)
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
  return i(), f("svg", Bs, [...e[0] || (e[0] = [
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
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = O(l.path), v = n, c = b(e.modal.data.items.from), m = e.modal.data.items.to, u = b("");
    console.log(m.value.path);
    const _ = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: v.q,
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: c.value.map(({ path: d, type: a }) => ({ path: d, type: a })),
          item: m.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: v.successText });
        },
        onError: (d) => {
          u.value = o(d.message);
        }
      });
    };
    return (d, a) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: _,
          class: "vf-btn vf-btn-primary"
        }, p(v.successBtn), 1),
        s("button", {
          type: "button",
          onClick: a[1] || (a[1] = (h) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(o)("Cancel")), 1),
        s("div", Ws, p(t(o)("%s item(s) selected.", c.value.size)), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(qs),
            title: v.title
          }, null, 8, ["icon", "title"]),
          s("div", Ns, [
            s("p", Ps, p(v.body), 1),
            s("div", Us, [
              (i(!0), f(ne, null, re(c.value, (h) => (i(), f("div", {
                class: "vuefinder__move-modal__file",
                key: h.path
              }, [
                s("div", null, [
                  h.type === "dir" ? (i(), f("svg", Os, [...a[2] || (a[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (i(), f("svg", zs, [...a[3] || (a[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", Ks, p(h.path), 1)
              ]))), 128))
            ]),
            s("h4", js, p(t(o)("Target Directory")), 1),
            s("p", Gs, [
              a[4] || (a[4] = s("svg", {
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
              s("span", Ys, p(t(m).value.path), 1)
            ]),
            u.value.length ? (i(), I(t(u), {
              key: 0,
              onHidden: a[0] || (a[0] = (h) => u.value = ""),
              error: ""
            }, {
              default: j(() => [
                P(p(u.value), 1)
              ]),
              _: 1
            })) : T("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ht = /* @__PURE__ */ G({
  __name: "ModalMove",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n;
    return (l, r) => (i(), I(ft, {
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
    return (l, r) => (i(), I(ft, {
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
  const e = n.search, o = n.fs, l = n.config, r = O(e.state), v = O(o.selectedItems), c = (m) => {
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
          n.modal.open(ht, { items: { from: o.getClipboard().items, to: o.path } }), o.clearClipboard();
          return;
        }
        if (o.getClipboard().type === "copy") {
          n.modal.open(Qs, { items: { from: o.getClipboard().items, to: o.path } });
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
  return i(), f("svg", Js, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const pt = { render: Zs }, er = { class: "vuefinder__new-folder-modal__content" }, tr = { class: "vuefinder__new-folder-modal__form" }, nr = { class: "vuefinder__new-folder-modal__description" }, or = ["placeholder"], gt = /* @__PURE__ */ G({
  __name: "ModalNewFolder",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = O(l.path), v = b(""), c = b(""), m = () => {
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
    return (u, _) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-primary"
        }, p(t(o)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(o)("Cancel")), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(pt),
            title: t(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", er, [
            s("div", tr, [
              s("p", nr, p(t(o)("Create a new folder")), 1),
              ae(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => v.value = d),
                onKeyup: Ve(m, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(o)("Folder Name"),
                type: "text"
              }, null, 40, or), [
                [Le, v.value]
              ]),
              c.value.length ? (i(), I(t(c), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: j(() => [
                  P(p(c.value), 1)
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
}), sr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function rr(n, e) {
  return i(), f("svg", sr, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const wt = { render: rr }, lr = { class: "vuefinder__new-file-modal__content" }, ar = { class: "vuefinder__new-file-modal__form" }, ir = { class: "vuefinder__new-file-modal__description" }, dr = ["placeholder"], cr = /* @__PURE__ */ G({
  __name: "ModalNewFile",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = O(l.path), v = b(""), c = b(""), m = () => {
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
    return (u, _) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-primary"
        }, p(t(o)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(o)("Cancel")), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(wt),
            title: t(o)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", lr, [
            s("div", ar, [
              s("p", ir, p(t(o)("Create a new file")), 1),
              ae(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => v.value = d),
                onKeyup: Ve(m, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(o)("File Name"),
                type: "text"
              }, null, 40, dr), [
                [Le, v.value]
              ]),
              c.value.length ? (i(), I(t(c), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: j(() => [
                  P(p(c.value), 1)
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
}), ue = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function ur() {
  const n = Y("ServiceContainer"), { t: e } = n.i18n, o = n.fs, l = n.config, r = b({ QUEUE_ENTRY_STATUS: ue }), v = b(null), c = b(null), m = b(null), u = b(null), _ = b(null), d = b(null), a = b([]), h = b(""), g = b(!1), C = b(!1);
  let k;
  const S = (z) => a.value.findIndex((ie) => ie.id === z), y = (z, ie) => k.addFile({ name: ie || z.name, type: z.type, data: z, source: "Local" }), $ = (z) => z.status === ue.DONE ? "text-green-600" : z.status === ue.ERROR || z.status === ue.CANCELED ? "text-red-600" : "", F = (z) => z.status === ue.DONE ? "✓" : z.status === ue.ERROR || z.status === ue.CANCELED ? "!" : "...", U = () => u.value?.click(), J = () => n.modal.close(), oe = () => {
    if (g.value || !a.value.filter((z) => z.status !== ue.DONE).length) {
      g.value || (h.value = e("Please select file to upload first."));
      return;
    }
    h.value = "", k.retryAll(), k.upload();
  }, B = () => {
    k.cancelAll(), a.value.forEach((z) => {
      z.status !== ue.DONE && (z.status = ue.CANCELED, z.statusName = e("Canceled"));
    }), g.value = !1;
  }, L = (z) => {
    g.value || (k.removeFile(z.id), a.value.splice(S(z.id), 1));
  }, le = (z) => {
    if (!g.value)
      if (k.cancelAll(), z) {
        const ie = a.value.filter((V) => V.status !== ue.DONE);
        a.value = [], ie.forEach((V) => y(V.originalFile, V.name));
      } else
        a.value = [];
  };
  return de(() => {
    k = new jt({
      debug: n.debug,
      restrictions: { maxFileSize: nn(l.maxFileSize ?? "10mb") },
      locale: n.i18n.t("uppy"),
      onBeforeFileAdded: (V, x) => {
        if (x[V.id] != null) {
          const K = S(V.id);
          a.value[K]?.status === ue.PENDING && (h.value = k.i18n("noDuplicates", { fileName: V.name })), a.value = a.value.filter((W) => W.id !== V.id);
        }
        return a.value.push({
          id: V.id,
          name: V.name,
          size: n.filesize(V.size),
          status: ue.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: V.data
        }), !0;
      }
    }), k.use(Gt, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), k.on("restriction-failed", (V, x) => {
      const E = a.value[S(V.id)];
      E && L(E), h.value = x.message;
    }), k.on("upload", () => {
      const V = n.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", storage: o.path.storage, path: o.path.path }
      });
      k.setMeta({ ...V.body });
      const x = k.getPlugin("XHRUpload");
      x && (x.opts.method = V.method, x.opts.endpoint = V.url + "?" + new URLSearchParams(V.params), x.opts.headers = V.headers), delete V.headers["Content-Type"], g.value = !0, a.value.forEach((E) => {
        E.status !== ue.DONE && (E.percent = null, E.status = ue.UPLOADING, E.statusName = e("Pending upload"));
      });
    }), k.on("upload-progress", (V, x) => {
      const E = x.bytesTotal ?? 1, K = Math.floor(x.bytesUploaded / E * 100), W = S(V.id);
      W !== -1 && a.value[W] && (a.value[W].percent = `${K}%`);
    }), k.on("upload-success", (V) => {
      const x = a.value[S(V.id)];
      x && (x.status = ue.DONE, x.statusName = e("Done"));
    }), k.on("upload-error", (V, x) => {
      const E = a.value[S(V.id)];
      E && (E.percent = null, E.status = ue.ERROR, E.statusName = x?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : x?.message || e("Unknown Error"));
    }), k.on("error", (V) => {
      h.value = V.message, g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), k.on("complete", () => {
      g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), u.value?.addEventListener("click", () => c.value?.click()), _.value?.addEventListener("click", () => m.value?.click()), d.value?.addEventListener("dragover", (V) => {
      V.preventDefault(), C.value = !0;
    }), d.value?.addEventListener("dragleave", (V) => {
      V.preventDefault(), C.value = !1;
    });
    const z = (V, x) => {
      x.isFile && x.file((E) => V(x, E)), x.isDirectory && x.createReader().readEntries((E) => E.forEach((K) => z(V, K)));
    };
    d.value?.addEventListener("drop", (V) => {
      V.preventDefault(), C.value = !1;
      const x = /^[/\\](.+)/, E = V.dataTransfer?.items;
      E && Array.from(E).forEach((K) => {
        K.kind === "file" && z((W, Q) => {
          const Z = x.exec(W.fullPath);
          y(Q, Z ? Z[1] : Q.name);
        }, K.webkitGetAsEntry());
      });
    });
    const ie = (V) => {
      const x = V.target, E = x.files;
      if (E) {
        for (const K of E) y(K);
        x.value = "";
      }
    };
    c.value?.addEventListener("change", ie), m.value?.addEventListener("change", ie);
  }), {
    container: v,
    internalFileInput: c,
    internalFolderInput: m,
    pickFiles: u,
    pickFolders: _,
    dropArea: d,
    queue: a,
    message: h,
    uploading: g,
    hasFilesInDropArea: C,
    definitions: r,
    openFileSelector: U,
    upload: oe,
    cancel: B,
    remove: L,
    clear: le,
    close: J,
    getClassNameForEntry: $,
    getIconForEntry: F
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
  return i(), f("svg", vr, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const bt = { render: _r }, mr = { class: "vuefinder__upload-modal__content" }, fr = {
  key: 0,
  class: "pointer-events-none"
}, hr = {
  key: 1,
  class: "pointer-events-none"
}, pr = ["disabled"], gr = ["disabled"], wr = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, br = ["textContent"], yr = { class: "vuefinder__upload-modal__file-info" }, kr = { class: "vuefinder__upload-modal__file-name hidden md:block" }, xr = { class: "vuefinder__upload-modal__file-name md:hidden" }, Sr = {
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
      uploading: a,
      hasFilesInDropArea: h,
      definitions: g,
      openFileSelector: C,
      upload: k,
      cancel: S,
      remove: y,
      clear: $,
      close: F,
      getClassNameForEntry: U,
      getIconForEntry: J
    } = ur();
    return (oe, B) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: t(a),
          onClick: B[4] || (B[4] = we(
            //@ts-ignore
            (...L) => t(k) && t(k)(...L),
            ["prevent"]
          ))
        }, p(t(o)("Upload")), 9, Er),
        t(a) ? (i(), f("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: B[5] || (B[5] = we(
            //@ts-ignore
            (...L) => t(S) && t(S)(...L),
            ["prevent"]
          ))
        }, p(t(o)("Cancel")), 1)) : (i(), f("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: B[6] || (B[6] = we(
            //@ts-ignore
            (...L) => t(F) && t(F)(...L),
            ["prevent"]
          ))
        }, p(t(o)("Close")), 1))
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
              onClick: B[0] || (B[0] = //@ts-ignore
              (...L) => t(C) && t(C)(...L))
            }, [
              t(h) ? (i(), f("div", fr, p(t(o)("Release to drop these files.")), 1)) : (i(), f("div", hr, p(t(o)("Drag and drop the files/folders to here or click here.")), 1))
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
              }, p(t(o)("Select Files")), 513),
              s("button", {
                ref_key: "pickFolders",
                ref: m,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, p(t(o)("Select Folders")), 513),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(a),
                onClick: B[1] || (B[1] = (L) => t($)(!1))
              }, p(t(o)("Clear all")), 9, pr),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(a),
                onClick: B[2] || (B[2] = (L) => t($)(!0))
              }, p(t(o)("Clear only successful")), 9, gr)
            ], 512),
            s("div", wr, [
              (i(!0), f(ne, null, re(t(_), (L) => (i(), f("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: L.id
              }, [
                s("span", {
                  class: X(["vuefinder__upload-modal__file-icon", t(U)(L)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: p(t(J)(L))
                  }, null, 8, br)
                ], 2),
                s("div", yr, [
                  s("div", kr, p(t(We)(L.name, 40)) + " (" + p(L.size) + ") ", 1),
                  s("div", xr, p(t(We)(L.name, 16)) + " (" + p(L.size) + ") ", 1),
                  s("div", {
                    class: X(["vuefinder__upload-modal__file-status", t(U)(L)])
                  }, [
                    P(p(L.statusName) + " ", 1),
                    L.status === t(g).QUEUE_ENTRY_STATUS.UPLOADING ? (i(), f("b", Sr, p(L.percent), 1)) : T("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: X(["vuefinder__upload-modal__file-remove", t(a) ? "disabled" : ""]),
                  title: t(o)("Delete"),
                  disabled: t(a),
                  onClick: (le) => t(y)(L)
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
                ])], 10, $r)
              ]))), 128)),
              t(_).length ? T("", !0) : (i(), f("div", Cr, p(t(o)("No files selected!")), 1))
            ]),
            t(d).length ? (i(), I(_t, {
              key: 0,
              onHidden: B[3] || (B[3] = (L) => d.value = ""),
              error: ""
            }, {
              default: j(() => [
                P(p(t(d)), 1)
              ]),
              _: 1
            })) : T("", !0)
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
  return i(), f("svg", Tr, [...e[0] || (e[0] = [
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
    const e = Y("ServiceContainer"), o = e.fs, l = O(o.path), { t: r } = e.i18n, v = b(e.modal.data.items[0]), c = b(""), m = b([]), u = () => {
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
    return (_, d) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, p(t(r)("Unarchive")), 1),
        s("button", {
          type: "button",
          onClick: d[1] || (d[1] = (a) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(r)("Cancel")), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(yt),
            title: t(r)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", Dr, [
            s("div", Ir, [
              (i(!0), f(ne, null, re(m.value, (a) => (i(), f("p", {
                class: "vuefinder__unarchive-modal__item",
                key: a.path
              }, [
                a.type === "dir" ? (i(), f("svg", Fr, [...d[2] || (d[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (i(), f("svg", Vr, [...d[3] || (d[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Lr, p(a.basename), 1)
              ]))), 128)),
              s("p", Rr, p(t(r)("The archive will be unarchived at")) + " (" + p(t(o).path.path) + ")", 1),
              c.value.length ? (i(), I(t(c), {
                key: 0,
                onHidden: d[0] || (d[0] = (a) => c.value = ""),
                error: ""
              }, {
                default: j(() => [
                  P(p(c.value), 1)
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
}), Br = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Hr(n, e) {
  return i(), f("svg", Br, [...e[0] || (e[0] = [
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
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = O(l.path), v = b(""), c = b(""), m = b(e.modal.data.items), u = () => {
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
    return (_, d) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, p(t(o)("Archive")), 1),
        s("button", {
          type: "button",
          onClick: d[2] || (d[2] = (a) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(o)("Cancel")), 1)
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
                (i(!0), f(ne, null, re(m.value, (a) => (i(), f("p", Ur, [
                  a.type === "dir" ? (i(), f("svg", Or, [...d[3] || (d[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (i(), f("svg", zr, [...d[4] || (d[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", Kr, p(a.basename), 1)
                ]))), 256))
              ]),
              ae(s("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => v.value = a),
                onKeyup: Ve(u, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(o)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, jr), [
                [Le, v.value]
              ]),
              c.value.length ? (i(), I(t(c), {
                key: 0,
                onHidden: d[1] || (d[1] = (a) => c.value = ""),
                error: ""
              }, {
                default: j(() => [
                  P(p(c.value), 1)
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
}), Gr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Yr(n, e) {
  return i(), f("svg", Gr, [...e[0] || (e[0] = [
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
  return i(), f("svg", Wr, [...e[0] || (e[0] = [
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
  return i(), f("svg", Jr, [...e[0] || (e[0] = [
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
  return i(), f("svg", tl, [...e[0] || (e[0] = [
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
  return i(), f("svg", sl, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const ll = { render: rl }, al = { class: "vuefinder__toolbar" }, il = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, dl = ["title"], cl = ["title"], ul = ["title"], vl = ["title"], _l = ["title"], ml = ["title"], fl = ["title"], hl = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, pl = { class: "pl-2" }, gl = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, wl = { class: "vuefinder__toolbar__controls" }, bl = ["title"], yl = ["title"], kl = /* @__PURE__ */ G({
  __name: "Toolbar",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = e.config, v = e.search, c = O(r.state), m = O(v.state), u = O(l.selectedItems);
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
    return (d, a) => (i(), f("div", al, [
      t(m).query.length ? (i(), f("div", hl, [
        s("div", pl, [
          P(p(t(o)("Search results for")) + " ", 1),
          s("span", gl, p(t(m).query), 1)
        ]),
        t(r).get("loadingIndicator") === "circular" && t(l).isLoading() ? (i(), I(t(et), { key: 0 })) : T("", !0)
      ])) : (i(), f("div", il, [
        t(e).features.includes(t(ee).NEW_FOLDER) ? (i(), f("div", {
          key: 0,
          class: "mx-1.5",
          title: t(o)("New Folder"),
          onClick: a[0] || (a[0] = (h) => t(e).modal.open(gt, { items: t(u) }))
        }, [
          D(t(pt))
        ], 8, dl)) : T("", !0),
        t(e).features.includes(t(ee).NEW_FILE) ? (i(), f("div", {
          key: 1,
          class: "mx-1.5",
          title: t(o)("New File"),
          onClick: a[1] || (a[1] = (h) => t(e).modal.open(cr, { items: t(u) }))
        }, [
          D(t(wt))
        ], 8, cl)) : T("", !0),
        t(e).features.includes(t(ee).RENAME) ? (i(), f("div", {
          key: 2,
          class: "mx-1.5",
          title: t(o)("Rename"),
          onClick: a[2] || (a[2] = (h) => t(u).length !== 1 || t(e).modal.open(Ze, { items: t(u) }))
        }, [
          D(t(vt), {
            class: X(t(u).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ul)) : T("", !0),
        t(e).features.includes(t(ee).DELETE) ? (i(), f("div", {
          key: 3,
          class: "mx-1.5",
          title: t(o)("Delete"),
          onClick: a[3] || (a[3] = (h) => !t(u).length || t(e).modal.open(Je, { items: t(u) }))
        }, [
          D(t(ut), {
            class: X(t(u).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, vl)) : T("", !0),
        t(e).features.includes(t(ee).UPLOAD) ? (i(), f("div", {
          key: 4,
          class: "mx-1.5",
          title: t(o)("Upload"),
          onClick: a[4] || (a[4] = (h) => t(e).modal.open(Mr, { items: t(u) }))
        }, [
          D(t(bt))
        ], 8, _l)) : T("", !0),
        t(e).features.includes(t(ee).UNARCHIVE) && t(u).length === 1 && t(u)[0].mime_type === "application/zip" ? (i(), f("div", {
          key: 5,
          class: "mx-1.5",
          title: t(o)("Unarchive"),
          onClick: a[5] || (a[5] = (h) => !t(u).length || t(e).modal.open(kt, { items: t(u) }))
        }, [
          D(t(yt), {
            class: X(t(u).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ml)) : T("", !0),
        t(e).features.includes(t(ee).ARCHIVE) ? (i(), f("div", {
          key: 6,
          class: "mx-1.5",
          title: t(o)("Archive"),
          onClick: a[6] || (a[6] = (h) => !t(u).length || t(e).modal.open(St, { items: t(u) }))
        }, [
          D(t(xt), {
            class: X(t(u).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, fl)) : T("", !0)
      ])),
      s("div", wl, [
        t(e).features.includes(t(ee).FULL_SCREEN) ? (i(), f("div", {
          key: 0,
          onClick: a[7] || (a[7] = (h) => t(r).toggle("fullScreen")),
          class: "mx-1.5",
          title: t(o)("Toggle Full Screen")
        }, [
          t(c).fullScreen ? (i(), I(t(el), { key: 0 })) : (i(), I(t(Xr), { key: 1 }))
        ], 8, bl)) : T("", !0),
        s("div", {
          class: "mx-1.5",
          title: t(o)("Change View"),
          onClick: a[8] || (a[8] = (h) => t(m).query.length || _())
        }, [
          t(c).view === "grid" ? (i(), I(t(ol), {
            key: 0,
            class: X(["vf-toolbar-icon", t(m).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : T("", !0),
          t(c).view === "list" ? (i(), I(t(ll), {
            key: 1,
            class: X(["vf-toolbar-icon", t(m).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : T("", !0)
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
  const l = b(n);
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
  return i(), f("svg", Sl, [...e[0] || (e[0] = [
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
  return i(), f("svg", El, [...e[0] || (e[0] = [
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
  return i(), f("svg", Al, [...e[0] || (e[0] = [
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
  return i(), f("svg", Fl, [...e[0] || (e[0] = [
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
  return i(), f("svg", Rl, [...e[0] || (e[0] = [
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
  return i(), f("svg", ql, [...e[0] || (e[0] = [
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
  return i(), f("svg", Ul, [...e[0] || (e[0] = [
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
  return i(), f("svg", zl, [...e[0] || (e[0] = [
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
  return i(), f("svg", Gl, [...e[0] || (e[0] = [
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
  const o = "vfDragEnterCounter", l = n.fs, r = O(l.selectedItems);
  function v(d, a) {
    d.preventDefault(), l.getDraggedItem() === a.path || !a || a.type !== "dir" || r.value.some((g) => g.path === a.path || Ql(g.path) === a.path) ? d.dataTransfer && (d.dataTransfer.dropEffect = "none", d.dataTransfer.effectAllowed = "none") : (d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.dataTransfer.effectAllowed = "all"), d.currentTarget.classList.add(...e));
  }
  function c(d) {
    d.preventDefault();
    const a = d.currentTarget, h = Number(a.dataset[o] || 0);
    a.dataset[o] = String(h + 1);
  }
  function m(d) {
    d.preventDefault();
    const a = d.currentTarget, g = Number(a.dataset[o] || 0) - 1;
    g <= 0 ? (delete a.dataset[o], a.classList.remove(...e)) : a.dataset[o] = String(g);
  }
  function u(d, a) {
    if (!a) return;
    d.preventDefault();
    const h = d.currentTarget;
    delete h.dataset[o], h.classList.remove(...e);
    const g = d.dataTransfer?.getData("items") || "[]", k = JSON.parse(g).map((S) => l.sortedFiles.get().find((y) => y.path === S));
    l.clearDraggedItem(), n.modal.open(ht, { items: { from: k, to: a } });
  }
  function _(d) {
    return {
      dragover: (a) => v(a, d),
      dragenter: c,
      dragleave: m,
      drop: (a) => u(a, d)
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
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.search, r = e.fs, v = e.config, c = O(v.state), m = O(l.state), u = O(r.path), _ = O(r.loading), d = se(() => m.value?.searchMode ?? !1), a = b(null), h = ot(0, 100), g = b(5), C = b(!1), k = se(() => u.value?.breadcrumb ?? []);
    function S(R, H) {
      return R.length > H ? [R.slice(-H), R.slice(0, -H)] : [R, []];
    }
    const y = se(() => S(k.value, g.value)[0]), $ = se(() => S(k.value, g.value)[1]);
    ve(h, () => {
      if (!a.value) return;
      const R = a.value.children;
      let H = 0, w = 0;
      const M = 5, te = 1;
      g.value = M, Be(() => {
        for (let ce = R.length - 1; ce >= 0; ce--) {
          const Se = R[ce];
          if (H + Se.offsetWidth > h.value - 40)
            break;
          H += parseInt(Se.offsetWidth.toString(), 10), w++;
        }
        w < te && (w = te), w > M && (w = M), g.value = w;
      });
    });
    const F = () => {
      a.value && (h.value = a.value.offsetWidth);
    }, U = b(null);
    de(() => {
      U.value = new ResizeObserver(F), a.value && U.value.observe(a.value);
    }), He(() => {
      U.value && U.value.disconnect();
    });
    const J = qe(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function oe(R = null) {
      R ??= k.value.length - 2;
      const H = {
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
      return k.value[R] ?? H;
    }
    const B = () => {
      W(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: u.value?.storage, path: u.value?.path } });
    }, L = () => {
      l.exitSearchMode(), y.value.length > 0 && !d.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: u.value?.storage ?? "local",
          path: k.value[k.value.length - 2]?.path ?? (u.value?.storage ?? "local") + "://"
        }
      });
    }, le = (R) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: u.value?.storage, path: R.path } }), C.value = !1;
    }, z = () => {
      C.value && (C.value = !1);
    }, ie = {
      mounted(R, H) {
        R.clickOutsideEvent = function(w) {
          R === w.target || R.contains(w.target) || H.value();
        }, document.body.addEventListener("click", R.clickOutsideEvent);
      },
      beforeUnmount(R) {
        document.body.removeEventListener("click", R.clickOutsideEvent);
      }
    }, V = () => {
      v.toggle("showTreeView");
    }, x = b(null), E = ot("", 400);
    ve(E, (R) => {
      e.emitter.emit("vf-toast-clear"), l.setQuery(R);
    }), ve(d, (R) => {
      R && Be(() => {
        x.value && x.value.focus();
      });
    }), e.emitter.on("vf-search-exit", () => {
      l.exitSearchMode();
    });
    const K = () => {
      E.value === "" && l.exitSearchMode();
    }, W = () => {
      E.value = "", l.exitSearchMode();
    }, Q = b({
      x: 0,
      y: 0
    }), Z = (R) => {
      if (R.currentTarget instanceof HTMLElement) {
        const { x: H, y: w, height: M } = R.currentTarget.getBoundingClientRect();
        Q.value = { x: H, y: w + M };
      }
      C.value = !C.value;
    };
    return (R, H) => (i(), f("div", Jl, [
      s("span", {
        title: t(o)("Toggle Tree View")
      }, [
        D(t(jl), {
          onClick: V,
          class: X(["vuefinder__breadcrumb__toggle-tree", t(c).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Zl),
      s("span", {
        title: t(o)("Go up a directory")
      }, [
        D(t(Tl), ke(Ee(k.value.length && !d.value ? t(J).events(oe()) : {}), {
          onClick: L,
          class: k.value.length && !d.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, ea),
      t(r).isLoading() ? (i(), f("span", {
        key: 1,
        title: t(o)("Cancel")
      }, [
        D(t(Il), {
          onClick: H[0] || (H[0] = (w) => t(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, na)) : (i(), f("span", {
        key: 0,
        title: t(o)("Refresh")
      }, [
        D(t(Cl), { onClick: B })
      ], 8, ta)),
      ae(s("div", {
        class: "group vuefinder__breadcrumb__search-container",
        onClick: H[3] || (H[3] = //@ts-ignore
        (...w) => t(l).enterSearchMode && t(l).enterSearchMode(...w))
      }, [
        s("div", null, [
          D(t(Ll), ke(Ee(t(J).events(oe(-1))), {
            onClick: H[1] || (H[1] = we((w) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(u).value?.storage ?? "local" } }), ["stop"]))
          }), null, 16)
        ]),
        s("div", oa, [
          $.value.length ? ae((i(), f("div", sa, [
            H[5] || (H[5] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", ra, [
              s("span", {
                onDragenter: H[2] || (H[2] = (w) => C.value = !0),
                onClick: Z,
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                D(t(Wl), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [ie, z]
          ]) : T("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: a,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (i(!0), f(ne, null, re(y.value, (w, M) => (i(), f("div", { key: M }, [
            H[6] || (H[6] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", ke(Ee(t(J).events(w), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: w.basename,
              onClick: we((te) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(u)?.storage, path: w.path } }), ["stop"])
            }), p(w.name), 17, la)
          ]))), 128))
        ], 512),
        t(v).get("loadingIndicator") === "circular" && t(_) ? (i(), I(t(et), { key: 0 })) : T("", !0)
      ], 512), [
        [ge, !d.value]
      ]),
      ae(s("div", aa, [
        s("div", null, [
          D(t(Hl))
        ]),
        ae(s("input", {
          ref_key: "searchInput",
          ref: x,
          onKeydown: Ve(W, ["esc"]),
          onBlur: K,
          "onUpdate:modelValue": H[4] || (H[4] = (w) => Vt(E) ? E.value = w : null),
          placeholder: t(o)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, ia), [
          [Le, t(E)]
        ]),
        D(t(Pl), { onClick: W })
      ], 512), [
        [ge, d.value]
      ]),
      (i(), I(Lt, { to: "body" }, [
        ae(s("div", {
          style: Me({ position: "absolute", top: Q.value.y + "px", left: Q.value.x + "px" }),
          class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
        }, [
          (i(!0), f(ne, null, re($.value, (w, M) => (i(), f("div", ke({ key: M }, Ee(t(J).events(w), !0), {
            onClick: (te) => le(w),
            class: "vuefinder__breadcrumb__hidden-item"
          }), [
            s("div", ca, [
              s("span", null, [
                D(t(Oe), { class: "vuefinder__breadcrumb__hidden-item-icon" })
              ]),
              H[7] || (H[7] = P()),
              s("span", ua, p(w.name), 1)
            ])
          ], 16, da))), 128))
        ], 4), [
          [ge, C.value]
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
    containerPadding: c = 48
  } = e, m = n && typeof n.get == "function" ? O(n) : n, u = () => typeof r == "number" ? r : r.value, _ = b(0), d = b(6), a = b(600);
  let h = null;
  const g = se(() => Math.ceil(m.value.length / d.value)), C = se(() => g.value * u()), k = se(() => {
    const B = u(), L = Math.max(0, Math.floor(_.value / B) - v), le = Math.min(g.value, Math.ceil((_.value + a.value) / B) + v);
    return { start: L, end: le };
  }), S = se(() => {
    const { start: B, end: L } = k.value;
    return Array.from({ length: L - B }, (le, z) => B + z);
  }), y = () => a.value, $ = () => {
    if (o.value) {
      const B = o.value.clientWidth - c;
      d.value = Math.max(Math.floor(B / l), 2);
    }
  }, F = (B) => {
    const L = B.target;
    _.value = L.scrollTop;
  };
  ve(() => m.value.length, () => {
    $();
  });
  const U = (B, L) => {
    const le = L * d.value;
    return B.slice(le, le + d.value);
  }, J = (B, L, le, z, ie) => {
    const V = [];
    for (let x = L; x <= le; x++)
      for (let E = z; E <= ie; E++) {
        const K = x * d.value + E;
        K < B.length && B[K] && V.push(B[K]);
      }
    return V;
  }, oe = (B) => ({
    row: Math.floor(B / d.value),
    col: B % d.value
  });
  return de(async () => {
    await Be(), o.value && (a.value = o.value.clientHeight || 600), $(), window.addEventListener("resize", () => {
      o.value && (a.value = o.value.clientHeight || 600), $();
    }), o.value && "ResizeObserver" in window && (h = new ResizeObserver((B) => {
      const L = B[0];
      L && (a.value = Math.round(L.contentRect.height)), $();
    }), h.observe(o.value));
  }), He(() => {
    window.removeEventListener("resize", $), h && (h.disconnect(), h = null);
  }), {
    scrollTop: _,
    itemsPerRow: d,
    totalRows: g,
    totalHeight: C,
    visibleRange: k,
    visibleRows: S,
    updateItemsPerRow: $,
    handleScroll: F,
    getRowItems: U,
    getItemsInRange: J,
    getItemPosition: oe,
    getContainerHeight: y
  };
}
function ma(n) {
  const { getItemPosition: e, getItemsInRange: o, getKey: l, selectionObject: r, rowHeight: v, itemWidth: c } = n, m = Math.floor(Math.random() * 2 ** 32).toString(), _ = Y("ServiceContainer").fs, d = O(_.selectedKeys), a = O(_.sortedFiles);
  O(_.selectedCount);
  const h = b(/* @__PURE__ */ new Set()), g = b(!1), C = b(!1), k = b(null), S = (x) => x.map((E) => E.getAttribute("data-key")).filter((E) => !!E), y = (x) => {
    x.selection.getSelection().forEach((E) => {
      x.selection.deselect(E, !0);
    });
  }, $ = (x) => {
    d.value && d.value.forEach((E) => {
      const K = document.querySelector(`[data-key="${E}"]`);
      K && x.selection.select(K, !0);
    });
  }, F = (x) => {
    if (x.size === 0) return null;
    const K = Array.from(x).map((H) => {
      const w = a.value?.findIndex((M) => l(M) === H) ?? -1;
      return e(w >= 0 ? w : 0);
    }), W = Math.min(...K.map((H) => H.row)), Q = Math.max(...K.map((H) => H.row)), Z = Math.min(...K.map((H) => H.col)), R = Math.max(...K.map((H) => H.col));
    return { minRow: W, maxRow: Q, minCol: Z, maxCol: R };
  }, U = (x) => {
    g.value = !1, !x.event?.metaKey && !x.event?.ctrlKey && (C.value = !0), x.selection.resolveSelectables(), y(x), $(x);
  }, J = ({ event: x, selection: E }) => {
    const K = x;
    K && "type" in K && K.type === "touchend" && K.preventDefault();
    const W = x;
    if (!W?.ctrlKey && !W?.metaKey && (_.clearSelection(), E.clearSelection(!0, !0)), h.value.clear(), W && r.value) {
      const Q = r.value.getSelectables()[0]?.closest(".scroller-" + m);
      if (Q) {
        const Z = Q.getBoundingClientRect(), R = W.clientY - Z.top + Q.scrollTop, H = W.clientX - Z.left, w = Math.floor(R / v.value), M = Math.floor(H / c);
        k.value = { row: w, col: M };
      }
    }
  }, oe = (x) => {
    const E = x.selection, K = S(x.store.changed.added), W = S(x.store.changed.removed);
    C.value = !1, g.value = !0, K.forEach((Q) => {
      d.value && !d.value.has(Q) && h.value.add(Q), _.select(Q);
    }), W.forEach((Q) => {
      document.querySelector(`[data-key="${Q}"]`) && a.value?.find((R) => l(R) === Q) && h.value.delete(Q), _.deselect(Q);
    }), E.resolveSelectables(), $(x);
  }, B = () => {
    h.value.clear();
  }, L = (x) => {
    if (x.event && k.value && h.value.size > 0) {
      const K = Array.from(h.value).map((W) => {
        const Q = a.value?.findIndex((Z) => l(Z) === W) ?? -1;
        return Q >= 0 ? e(Q) : null;
      }).filter((W) => W !== null);
      if (K.length > 0) {
        const W = [...K, k.value], Q = {
          minRow: Math.min(...W.map((Z) => Z.row)),
          maxRow: Math.max(...W.map((Z) => Z.row)),
          minCol: Math.min(...W.map((Z) => Z.col)),
          maxCol: Math.max(...W.map((Z) => Z.col))
        };
        o(a.value || [], Q.minRow, Q.maxRow, Q.minCol, Q.maxCol).forEach(
          (Z) => {
            const R = l(Z);
            document.querySelector(`[data-key="${R}"]`) || _.select(R);
          }
        );
      }
    }
  }, le = (x) => {
    L(x), y(x), $(x), _.setSelectedCount(d.value?.size || 0), g.value = !1, k.value = null;
  }, z = () => {
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
    }), r.value.on("beforestart", U), r.value.on("start", J), r.value.on("move", oe), r.value.on("stop", le);
  }, ie = () => {
    r.value && (r.value.destroy(), r.value = null);
  }, V = (x) => {
    C.value && (r.value?.clearSelection(), B(), C.value = !1);
    const E = x;
    !h.value.size && !C.value && !E?.ctrlKey && !E?.metaKey && (_.clearSelection(), r.value?.clearSelection());
  };
  return de(() => {
    const x = (E) => {
      !E.buttons && g.value && (g.value = !1);
    };
    document.addEventListener("dragleave", x), He(() => {
      document.removeEventListener("dragleave", x);
    });
  }), {
    isDragging: g,
    selectionStarted: C,
    explorerId: m,
    extractIds: S,
    cleanupSelection: y,
    refreshSelection: $,
    getSelectionRange: F,
    selectSelectionRange: L,
    initializeSelectionArea: z,
    destroySelectionArea: ie,
    handleContentClick: V
  };
}
const fa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function ha(n, e) {
  return i(), f("svg", fa, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const pa = { render: ha }, ga = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function wa(n, e) {
  return i(), f("svg", ga, [...e[0] || (e[0] = [
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
    return (e, o) => (i(), f("div", null, [
      n.direction === "asc" ? (i(), I(t(pa), { key: 0 })) : T("", !0),
      n.direction === "desc" ? (i(), I(t(ba), { key: 1 })) : T("", !0)
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
  return i(), f("svg", ya, [...e[0] || (e[0] = [
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
    return (o, l) => (i(), f("div", Sa, [
      D(t(xa)),
      s("div", $a, p(e.count), 1)
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
  return i(), f("svg", Ea, [...e[0] || (e[0] = [
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
    const e = n, o = Y("ServiceContainer"), l = o.customIcon?.(o, e.item);
    return (r, v) => (i(), f("div", {
      class: X(["vuefinder__item-icon", n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      t(l) ? (i(), I(Qe(t(l).is), Rt(ke({ key: 0 }, t(l).props || {})), null, 16)) : n.item.type === "dir" ? (i(), I(t(Oe), { key: 1 })) : (i(), I(t(Ta), { key: 2 })),
      !t(l) && n.ext && n.item.type !== "dir" && n.item.extension ? (i(), f("div", Aa, p(n.item.extension.substring(0, 3)), 1)) : T("", !0)
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
  return i(), f("svg", Da, [...e[0] || (e[0] = [
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
    const o = n, l = e, r = Y("ServiceContainer"), v = r.fs, c = r.config, m = se(() => [
      "file-item-" + o.explorerId,
      o.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      o.isSelected ? "vf-explorer-selected" : ""
    ]), u = se(() => ({
      opacity: o.isDragging || v.isCut(o.item.path) ? 0.5 : ""
    }));
    let _ = null;
    const d = b(null);
    let a = !1;
    const h = () => {
      _ && clearTimeout(_), g.value = !0;
    }, g = b(!0), C = (k) => {
      if (g.value = !1, _ && (k.preventDefault(), clearTimeout(_)), !a)
        a = !0, l("click", k), d.value = setTimeout(() => a = !1, 300);
      else
        return a = !1, l("dblclick", k), _ && clearTimeout(_), !1;
      if (k.currentTarget && k.currentTarget instanceof HTMLElement) {
        const S = k.currentTarget.getBoundingClientRect();
        k.preventDefault(), _ = setTimeout(() => {
          let F = S.y + S.height;
          F + 146 > window.innerHeight - 10 && (F = S.y - 146), F < 10 && (F = 10);
          const U = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: S.x,
            clientY: F
          });
          k.target?.dispatchEvent(U);
        }, 300);
      }
    };
    return (k, S) => (i(), f("div", {
      class: X(m.value),
      style: Me(u.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: g.value,
      onTouchstart: S[1] || (S[1] = (y) => C(y)),
      onTouchend: S[2] || (S[2] = (y) => h()),
      onClick: S[3] || (S[3] = (y) => l("click", y)),
      onDblclick: S[4] || (S[4] = (y) => l("dblclick", y)),
      onContextmenu: S[5] || (S[5] = we((y) => l("contextmenu", y), ["prevent", "stop"])),
      onDragstart: S[6] || (S[6] = (y) => l("dragstart", y)),
      onDragend: S[7] || (S[7] = (y) => l("dragend", y))
    }, [
      n.view === "grid" ? (i(), f("div", Va, [
        s("div", La, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (i(), f("img", {
            key: 0,
            onTouchstart: S[0] || (S[0] = (y) => y.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": t(r).requester.getPreviewUrl(n.item.storage, n.item),
            alt: n.item.basename
          }, null, 40, Ra)) : (i(), I(st, {
            key: 1,
            item: n.item,
            ext: !0
          }, null, 8, ["item"]))
        ]),
        s("span", Ba, p(t(We)(n.item.basename)), 1)
      ])) : (i(), f("div", Ha, [
        s("div", qa, [
          s("div", Na, [
            D(st, {
              item: n.item,
              small: n.compact
            }, null, 8, ["item", "small"])
          ]),
          s("span", Pa, p(n.item.basename), 1)
        ]),
        n.showPath ? (i(), f("div", Ua, p(n.item.path), 1)) : T("", !0),
        n.showPath ? T("", !0) : (i(), f("div", Oa, [
          n.item.file_size ? (i(), f("div", za, p(t(r).filesize(n.item.file_size)), 1)) : T("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (i(), f("div", Ka, p(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : T("", !0)
      ])),
      t(c).get("pinnedFolders").find((y) => y.path === n.item.path) ? (i(), I(t($t), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : T("", !0)
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
    const o = n, l = e, r = se(() => [
      o.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), v = se(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${o.rowHeight}px`,
      transform: `translateY(${o.rowIndex * o.rowHeight}px)`
    })), c = se(() => o.view === "grid" ? {
      gridTemplateColumns: `repeat(${o.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (m, u) => (i(), f("div", {
      class: X(r.value),
      "data-row": n.rowIndex,
      style: Me(v.value)
    }, [
      s("div", {
        class: X(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Me(c.value)
      }, [
        (i(!0), f(ne, null, re(n.items, (_, d) => (i(), I(ja, ke({
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
          onClick: u[0] || (u[0] = (a) => l("click", a)),
          onDblclick: u[1] || (u[1] = (a) => l("dblclick", a)),
          onContextmenu: u[2] || (u[2] = (a) => l("contextmenu", a)),
          onDragstart: u[3] || (u[3] = (a) => l("dragstart", a)),
          onDragend: u[4] || (u[4] = (a) => l("dragend", a)),
          explorerId: n.explorerId
        }), null, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Ga));
  }
}), Ya = ["onClick"], Wa = /* @__PURE__ */ G({
  __name: "Toast",
  setup(n) {
    const e = Y("ServiceContainer"), { getStore: o } = e.storage, l = b(o("full-screen", !1)), r = b([]), v = (u) => u === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (u) => {
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
    }), (u, _) => (i(), f("div", {
      class: X(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      D(Bt, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: j(() => [
          (i(!0), f(ne, null, re(r.value, (d, a) => (i(), f("div", {
            key: a,
            onClick: (h) => c(a),
            class: X(["vuefinder__toast__message", v(d.type)])
          }, p(d.label), 11, Ya))), 128))
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
}, ei = {
  key: 1,
  class: "vuefinder__circular-loader"
}, ti = /* @__PURE__ */ G({
  __name: "Explorer",
  setup(n) {
    const e = Y("ServiceContainer"), o = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), l = De("dragImage"), r = rt(null), v = De("scrollContainer"), c = De("scrollContent"), m = e.search, u = e.fs, _ = e.config, d = O(_.state), a = O(m.state), h = O(u.sortedFiles), g = O(u.selectedKeys), C = O(u.loading), k = (A) => g.value?.has(A) ?? !1;
    let S = null;
    const y = b(null), $ = De("customScrollBar"), F = De("customScrollBarContainer"), U = se(() => {
      const A = d.value.view, q = d.value.compactListView;
      return A === "grid" && !(a.value.searchMode && a.value.query.length) ? 88 : q ? 24 : 50;
    }), { t: J } = e.i18n, {
      itemsPerRow: oe,
      totalHeight: B,
      visibleRows: L,
      handleScroll: le,
      getRowItems: z,
      getItemsInRange: ie,
      getItemPosition: V,
      updateItemsPerRow: x
    } = _a(
      se(() => h.value ?? []),
      {
        scrollContainer: v,
        itemWidth: 104,
        rowHeight: U,
        overscan: 2,
        containerPadding: 0
      }
    ), {
      explorerId: E,
      isDragging: K,
      initializeSelectionArea: W,
      destroySelectionArea: Q,
      handleContentClick: Z
    } = ma({
      getItemPosition: V,
      getItemsInRange: ie,
      getKey: (A) => A.path,
      selectionObject: r,
      rowHeight: U,
      itemWidth: 104
    }), R = b(null), H = (A) => {
      if (!A || !R.value) return !1;
      const q = g.value?.has(R.value) ?? !1;
      return K.value && (q ? g.value?.has(A) ?? !1 : A === R.value);
    };
    ve(() => _.get("view"), (A) => {
      A === "list" ? oe.value = 1 : x();
    }, { immediate: !0 }), ve(oe, (A) => {
      _.get("view") === "list" && A !== 1 && (oe.value = 1);
    });
    const w = (A) => h.value?.[A];
    de(() => {
      if (W(), r.value && r.value.on("beforestart", ({ event: A }) => {
        const q = A?.target === c.value;
        if (!A?.metaKey && !A?.ctrlKey && !A?.altKey && !q)
          return !1;
      }), v.value && (S = new at({
        elements_selector: ".lazy",
        container: v.value
      })), ve(() => a.value.query, (A) => {
        const q = u.path.get().storage, N = u.path.get().path;
        !q || !N || (A ? e.emitter.emit("vf-fetch", {
          params: {
            q: "search",
            storage: q,
            path: N,
            filter: A
          },
          onSuccess: (me) => {
            me.files.length || e.emitter.emit("vf-toast-push", { label: J("No search result found.") });
          }
        }) : e.emitter.emit("vf-fetch", { params: { q: "index", storage: q, path: N } }));
      }), F.value) {
        const A = Xe(F.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (q) => {
            y.value = q;
          },
          scroll: (q) => {
            const { scrollOffsetElement: N } = q.elements();
            v.value && v.value.scrollTo({ top: N.scrollTop, left: 0 });
          }
        });
        y.value = A;
      }
      v.value && v.value.addEventListener("scroll", () => {
        const A = y.value;
        if (!A) return;
        const { scrollOffsetElement: q } = A.elements();
        q.scrollTo({ top: v.value.scrollTop, left: 0 });
      });
    }), de(() => {
      e.emitter.on("vf-refresh-thumbnails", () => {
        S && S.update();
      });
    }), Ht(() => {
      if (S && S.update(), y.value && $.value && v.value) {
        const q = v.value.scrollHeight > v.value.clientHeight, N = $.value;
        N.style.display = q ? "block" : "none", N.style.height = `${B.value}px`;
      }
    }), He(() => {
      Q(), S && (S.destroy(), S = null), y.value && (y.value.destroy(), y.value = null);
    });
    const M = (A) => {
      const q = A.target?.closest(".file-item-" + E), N = A;
      if (!N?.ctrlKey && !N?.metaKey && (u.clearSelection(), r.value?.clearSelection(!0, !0)), q) {
        const me = String(q.getAttribute("data-key"));
        r.value?.resolveSelectables(), u.toggleSelect(me);
      }
      u.setSelectedCount(g.value?.size || 0);
    }, te = (A) => {
      const q = e.contextMenuItems.find((N) => N.show(e, {
        searchQuery: "",
        items: [A],
        target: A
      }));
      q && q.action(e, [A]);
    }, ce = (A) => {
      const q = A.target?.closest(".file-item-" + E), N = q ? String(q.getAttribute("data-key")) : null;
      if (!N) return;
      const me = h.value?.find((ze) => ze.path === N);
      me && te(me);
    }, Se = () => {
      const A = g.value;
      return h.value?.filter((q) => A?.has(q.path)) || [];
    }, Te = (A) => {
      A.preventDefault();
      const q = A.target?.closest(".file-item-" + E);
      if (q) {
        const N = String(q.getAttribute("data-key")), me = h.value?.find((ze) => ze.path === N);
        g.value?.has(N) || (u.clearSelection(), u.select(N)), e.emitter.emit("vf-contextmenu-show", { event: A, items: Se(), target: me });
      }
    }, ye = (A) => {
      A.preventDefault(), e.emitter.emit("vf-contextmenu-show", { event: A, items: Se() });
    }, Ae = (A) => {
      if (A.altKey || A.ctrlKey || A.metaKey)
        return A.preventDefault(), !1;
      K.value = !0;
      const q = A.target?.closest(".file-item-" + E);
      if (R.value = q ? String(q.dataset.key) : null, A.dataTransfer && R.value) {
        A.dataTransfer.setDragImage(l.value, 0, 15), A.dataTransfer.effectAllowed = "all", A.dataTransfer.dropEffect = "copy";
        const N = g.value?.has(R.value) ? Array.from(g.value) : [R.value];
        A.dataTransfer.setData("items", JSON.stringify(N)), u.setDraggedItem(R.value);
      }
    }, $e = () => {
      R.value = null;
    };
    return (A, q) => (i(), f("div", Qa, [
      s("div", {
        ref: "customScrollBarContainer",
        class: X(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(d).view === "grid" }, { "search-active": t(a).hasQuery }]])
      }, [
        s("div", Xa, null, 512)
      ], 2),
      t(d).view === "list" || t(a).query.length ? (i(), f("div", Ja, [
        s("div", {
          onClick: q[0] || (q[0] = (N) => t(u).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          P(p(t(J)("Name")) + " ", 1),
          ae(D(Ne, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "basename"]
          ])
        ]),
        t(a).query.length ? T("", !0) : (i(), f("div", {
          key: 0,
          onClick: q[1] || (q[1] = (N) => t(u).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          P(p(t(J)("Size")) + " ", 1),
          ae(D(Ne, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "file_size"]
          ])
        ])),
        t(a).query.length ? (i(), f("div", {
          key: 1,
          onClick: q[2] || (q[2] = (N) => t(u).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          P(p(t(J)("Filepath")) + " ", 1),
          ae(D(Ne, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "path"]
          ])
        ])) : T("", !0),
        t(a).query.length ? T("", !0) : (i(), f("div", {
          key: 2,
          onClick: q[3] || (q[3] = (N) => t(u).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          P(p(t(J)("Date")) + " ", 1),
          ae(D(Ne, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "last_modified"]
          ])
        ]))
      ])) : T("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: v,
        class: X(["vuefinder__explorer__selector-area", "scroller-" + t(E)]),
        onScroll: q[5] || (q[5] = //@ts-ignore
        (...N) => t(le) && t(le)(...N))
      }, [
        t(_).get("loadingIndicator") === "linear" && t(C) ? (i(), f("div", Za)) : T("", !0),
        t(_).get("loadingIndicator") === "circular" && t(C) ? (i(), f("div", ei)) : T("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: c,
          class: "scrollContent min-h-full",
          style: Me({ height: `${t(B)}px`, position: "relative", width: "100%" }),
          onContextmenu: we(ye, ["self", "prevent"]),
          onClick: q[4] || (q[4] = we(
            //@ts-ignore
            (...N) => t(Z) && t(Z)(...N),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: l,
            class: "vuefinder__explorer__drag-item"
          }, [
            D(Ca, {
              count: R.value && t(g)?.has(R.value) ? t(g)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          t(a).query.length ? (i(!0), f(ne, { key: 0 }, re(t(L), (N) => (i(), I(Ge, {
            key: N,
            "row-index": N,
            "row-height": U.value,
            view: "list",
            items: w(N) ? [w(N)] : [],
            compact: t(d).compactListView,
            "show-path": !0,
            "is-dragging-item": H,
            "is-selected": k,
            "drag-n-drop-events": (me) => t(o).events(me),
            explorerId: t(E),
            onClick: M,
            onDblclick: ce,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(d).view === "grid" ? (i(!0), f(ne, { key: 1 }, re(t(L), (N) => (i(), I(Ge, {
            key: N,
            "row-index": N,
            "row-height": U.value,
            view: "grid",
            "items-per-row": t(oe),
            items: t(z)(t(h), N),
            "show-thumbnails": t(d).showThumbnails,
            "is-dragging-item": H,
            "is-selected": k,
            "drag-n-drop-events": (me) => t(o).events(me),
            explorerId: t(E),
            onClick: M,
            onDblclick: ce,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (i(!0), f(ne, { key: 2 }, re(t(L), (N) => (i(), I(Ge, {
            key: N,
            "row-index": N,
            "row-height": U.value,
            view: "list",
            items: w(N) ? [w(N)] : [],
            compact: t(d).compactListView,
            "is-dragging-item": H,
            "is-selected": k,
            "drag-n-drop-events": (me) => t(o).events(me),
            explorerId: t(E),
            onClick: M,
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
}), ni = ["href", "download"], oi = ["onClick"], si = /* @__PURE__ */ G({
  __name: "ContextMenu",
  setup(n) {
    const e = Y("ServiceContainer"), o = e.search, l = O(o.state), r = b(null), v = b([]), c = Ue({
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
    e.emitter.on("vf-contextmenu-show", ({ event: d, items: a, target: h = null }) => {
      if (c.items = e.contextMenuItems.filter((g) => g.show(e, {
        searchQuery: l.query,
        items: a,
        target: h
      })), l.query)
        if (h)
          e.emitter.emit("vf-context-selected", [h]);
        else
          return;
      else !h && !l.query ? e.emitter.emit("vf-context-selected", []) : a.length > 1 && a.some((g) => g.path === h.path) ? e.emitter.emit("vf-context-selected", a) : e.emitter.emit("vf-context-selected", [h]);
      _(d);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const _ = (d) => {
      const a = e.root, h = e.root.getBoundingClientRect(), g = a.getBoundingClientRect();
      let C = d.clientX - h.left, k = d.clientY - h.top;
      c.active = !0, Be(() => {
        const S = r.value?.getBoundingClientRect();
        let y = S?.height ?? 0, $ = S?.width ?? 0;
        C = g.right - d.pageX + window.scrollX < $ ? C - $ : C, k = g.bottom - d.pageY + window.scrollY < y ? k - y : k, c.positions = {
          left: String(C) + "px",
          top: String(k) + "px"
        };
      });
    };
    return (d, a) => ae((i(), f("ul", {
      ref_key: "contextmenu",
      ref: r,
      class: X([c.active ? "vuefinder__context-menu--active" : "vuefinder__context-menu--inactive", "vuefinder__context-menu"]),
      style: Me(c.positions)
    }, [
      (i(!0), f(ne, null, re(c.items, (h) => (i(), f("li", {
        class: "vuefinder__context-menu__item",
        key: h.title
      }, [
        h.link ? (i(), f("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: m(h),
          download: m(h),
          onClick: a[0] || (a[0] = (g) => t(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, p(h.title(t(e).i18n)), 1)
        ], 8, ni)) : (i(), f("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => u(h)
        }, [
          s("span", null, p(h.title(t(e).i18n)), 1)
        ], 8, oi))
      ]))), 128))
    ], 6)), [
      [ge, c.active]
    ]);
  }
}), ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function li(n, e) {
  return i(), f("svg", ri, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const Ct = { render: li }, ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function ii(n, e) {
  return i(), f("svg", ai, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const di = { render: ii }, ci = { class: "vuefinder__status-bar__wrapper" }, ui = { class: "vuefinder__status-bar__storage" }, vi = ["title"], _i = { class: "vuefinder__status-bar__storage-icon" }, mi = ["value"], fi = ["value"], hi = { class: "vuefinder__status-bar__info" }, pi = { key: 0 }, gi = { class: "vuefinder__status-bar__selected-count" }, wi = { class: "vuefinder__status-bar__actions" }, bi = ["disabled"], yi = ["title"], ki = /* @__PURE__ */ G({
  __name: "Statusbar",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = e.search, v = O(r.state), c = O(l.sortedFiles), m = O(l.path), u = O(l.selectedCount), _ = O(l.storages), d = (h) => {
      const g = h.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: g } });
    }, a = se(() => {
      const h = e.selectButton.multiple ? u.value > 0 : u.value === 1;
      return e.selectButton.active && h;
    });
    return (h, g) => (i(), f("div", ci, [
      s("div", ui, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: t(o)("Storage")
        }, [
          s("div", _i, [
            D(t(Ct))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: t(m)?.storage,
            onChange: d,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (i(!0), f(ne, null, re(t(_), (C) => (i(), f("option", {
              value: C,
              key: C
            }, p(C), 9, fi))), 128))
          ], 40, mi)
        ], 8, vi),
        s("div", hi, [
          t(v).hasQuery ? (i(), f("span", pi, p(t(c).value.length) + " items found. ", 1)) : T("", !0),
          s("span", gi, p(t(u) > 0 ? `${t(u)} item(s) selected.` : ""), 1)
        ])
      ]),
      s("div", wi, [
        t(e).selectButton.active ? (i(), f("button", {
          key: 0,
          class: X(["vf-btn vf-btn-primary vf-btn-small", { disabled: !a.value }]),
          disabled: !a.value,
          onClick: g[0] || (g[0] = (C) => t(e).selectButton.click(t(l).selectedItems, C))
        }, p(t(o)("Select")), 11, bi)) : T("", !0),
        s("span", {
          class: "vuefinder__status-bar__about",
          title: t(o)("About"),
          onClick: g[1] || (g[1] = (C) => t(e).modal.open(ct))
        }, [
          D(t(di))
        ], 8, yi)
      ])
    ]));
  }
}), xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function Si(n, e) {
  return i(), f("svg", xi, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Et = { render: Si }, $i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ci(n, e) {
  return i(), f("svg", $i, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Ei = { render: Ci }, Mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ti(n, e) {
  return i(), f("svg", Mi, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ])]);
}
const Mt = { render: Ti }, Ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Di(n, e) {
  return i(), f("svg", Ai, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 12h6" }, null, -1)
  ])]);
}
const Tt = { render: Di };
function At(n, e) {
  const o = n.findIndex((l) => l.path === e.path);
  o > -1 ? n[o] = e : n.push(e);
}
const Ii = { class: "vuefinder__folder-loader-indicator" }, Fi = {
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
    const e = n, o = Y("ServiceContainer"), { t: l } = o.i18n, r = lt(n, "modelValue"), v = b(!1);
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
          path: e.path
        }
      }).then((u) => {
        At(o.treeViewData, { path: e.path, type: "dir", ...u });
      }).catch((u) => {
      }).finally(() => {
        v.value = !1;
      });
    };
    return (u, _) => (i(), f("div", Ii, [
      v.value ? (i(), I(t(et), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (i(), f("div", Fi, [
        r.value && c()?.folders.length ? (i(), I(t(Tt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : T("", !0),
        r.value ? T("", !0) : (i(), I(t(Mt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Vi = ["onClick"], Li = ["title", "onDblclick", "onClick"], Ri = { class: "vuefinder__treesubfolderlist__item-icon" }, Bi = { class: "vuefinder__treesubfolderlist__subfolder" }, Hi = /* @__PURE__ */ G({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = Y("ServiceContainer"), o = e.fs, l = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), r = b({}), v = O(o.path), c = n, m = b(null);
    de(() => {
      c.path === c.storage + "://" && m.value && Xe(m.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const u = se(() => e.treeViewData.find((_) => _.path === c.path)?.folders || []);
    return (_, d) => {
      const a = Nt("TreeSubfolderList", !0);
      return i(), f("ul", {
        ref_key: "parentSubfolderList",
        ref: m,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (i(!0), f(ne, null, re(u.value, (h) => (i(), f("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", ke(Ee(t(l).events({ ...h, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (g) => r.value[h.path] = !r.value[h.path]
            }, [
              D(Dt, {
                storage: n.storage,
                path: h.path,
                modelValue: r.value[h.path],
                "onUpdate:modelValue": (g) => r.value[h.path] = g
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Vi),
            s("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: h.path,
              onDblclick: (g) => r.value[h.path] = !r.value[h.path],
              onClick: (g) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: c.storage, path: h.path } })
            }, [
              s("div", Ri, [
                t(v)?.path === h.path ? (i(), I(t(Et), { key: 0 })) : (i(), I(t(Oe), { key: 1 }))
              ]),
              s("div", {
                class: X(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(v)?.path === h.path
                }])
              }, p(h.basename), 3)
            ], 40, Li)
          ], 16),
          s("div", Bi, [
            ae(D(a, {
              storage: c.storage,
              path: h.path
            }, null, 8, ["storage", "path"]), [
              [ge, r.value[h.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), qi = /* @__PURE__ */ G({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = Y("ServiceContainer"), o = e.fs, l = b(!1), r = n, v = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), c = O(o.path), m = se(() => r.storage === c.value?.storage), u = {
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
      d === c.value?.storage ? l.value = !l.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: d } }));
    }
    return (d, a) => (i(), f(ne, null, [
      s("div", {
        onClick: a[2] || (a[2] = (h) => _(n.storage)),
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
          s("div", null, p(n.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: a[1] || (a[1] = we((h) => l.value = !l.value, ["stop"]))
        }, [
          D(Dt, {
            storage: n.storage,
            path: n.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": a[0] || (a[0] = (h) => l.value = h)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      ae(D(Hi, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ge, l.value]
      ])
    ], 64));
  }
}), Ni = { class: "vuefinder__folder-indicator" }, Pi = { class: "vuefinder__folder-indicator--icon" }, Ui = /* @__PURE__ */ G({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = lt(n, "modelValue");
    return (o, l) => (i(), f("div", Ni, [
      s("div", Pi, [
        e.value ? (i(), I(t(Tt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : T("", !0),
        e.value ? T("", !0) : (i(), I(t(Mt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Oi = { class: "vuefinder__treeview__header" }, zi = { class: "vuefinder__treeview__pinned-label" }, Ki = { class: "vuefinder__treeview__pin-text text-nowrap" }, ji = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Gi = ["onClick"], Yi = ["title"], Wi = ["onClick"], Qi = { key: 0 }, Xi = { class: "vuefinder__treeview__no-pinned" }, Ji = /* @__PURE__ */ G({
  __name: "TreeView",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, { getStore: l, setStore: r } = e.storage, v = e.fs, c = e.config, m = O(c.state), u = O(v.sortedFiles), _ = O(v.path), d = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), a = b(190), h = b(l("pinned-folders-opened", !0));
    ve(h, (S) => r("pinned-folders-opened", S));
    const g = (S) => {
      c.set("pinnedFolders", c.get("pinnedFolders").filter((y) => y.path !== S.path));
    }, C = (S) => {
      const y = S.clientX, $ = S.target.parentElement;
      if (!$) return;
      const F = $.getBoundingClientRect().width;
      $.classList.remove("transition-[width]"), $.classList.add("transition-none");
      const U = (oe) => {
        a.value = F + oe.clientX - y, a.value < 50 && (a.value = 0, c.set("showTreeView", !1)), a.value > 50 && c.set("showTreeView", !0);
      }, J = () => {
        const oe = $.getBoundingClientRect();
        a.value = oe.width, $.classList.add("transition-[width]"), $.classList.remove("transition-none"), window.removeEventListener("mousemove", U), window.removeEventListener("mouseup", J);
      };
      window.addEventListener("mousemove", U), window.addEventListener("mouseup", J);
    }, k = b(null);
    return de(() => {
      k.value && Xe(k.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), ve(u, (S) => {
      const y = S.filter(($) => $.type === "dir");
      At(e.treeViewData, {
        path: _.value?.path || "",
        folders: y.map(($) => ({
          storage: $.storage,
          path: $.path,
          basename: $.basename,
          type: "dir"
        }))
      });
    }), (S, y) => (i(), f(ne, null, [
      s("div", {
        onClick: y[0] || (y[0] = ($) => t(c).toggle("showTreeView")),
        class: X(["vuefinder__treeview__overlay", t(m).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      s("div", {
        style: Me(t(m).showTreeView ? "min-width:100px;max-width:75%; width: " + a.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: k,
          class: "vuefinder__treeview__scroll"
        }, [
          s("div", Oi, [
            s("div", {
              onClick: y[2] || (y[2] = ($) => h.value = !h.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              s("div", zi, [
                D(t($t), { class: "vuefinder__treeview__pin-icon" }),
                s("div", Ki, p(t(o)("Pinned Folders")), 1)
              ]),
              D(Ui, {
                modelValue: h.value,
                "onUpdate:modelValue": y[1] || (y[1] = ($) => h.value = $)
              }, null, 8, ["modelValue"])
            ]),
            h.value ? (i(), f("ul", ji, [
              (i(!0), f(ne, null, re(t(m).pinnedFolders, ($) => (i(), f("li", {
                key: $.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", ke(Ee(t(d).events($), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (F) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: $.storage, path: $.path } })
                }), [
                  t(_)?.path !== $.path ? (i(), I(t(Oe), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : T("", !0),
                  t(_)?.path === $.path ? (i(), I(t(Et), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : T("", !0),
                  s("div", {
                    title: $.path,
                    class: X(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": t(_)?.path === $.path
                    }])
                  }, p($.basename), 11, Yi)
                ], 16, Gi),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (F) => g($)
                }, [
                  D(t(Ei), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Wi)
              ]))), 128)),
              t(m).pinnedFolders.length ? T("", !0) : (i(), f("li", Qi, [
                s("div", Xi, p(t(o)("No folders pinned")), 1)
              ]))
            ])) : T("", !0)
          ]),
          (i(!0), f(ne, null, re(t(v).storages.get(), ($) => (i(), f("div", {
            class: "vuefinder__treeview__storage",
            key: $
          }, [
            D(qi, { storage: $ }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        s("div", {
          onMousedown: C,
          class: "vuefinder__treeview__resize-handle"
        }, null, 32)
      ], 4)
    ], 64));
  }
}), he = {
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
function Zi(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function _e(n) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, n);
  return (o, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== Zi(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !o.features.includes(e.feature));
}
function Ye(...n) {
  return (e, o) => n.some((l) => l(e, o));
}
function Re(...n) {
  return (e, o) => n.every((l) => l(e, o));
}
const ed = [
  {
    id: he.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      n.emitter.emit("vf-search-exit"), n.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0]?.storage, path: e[0]?.path }
      });
    },
    show: _e({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: he.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.emitter.emit("vf-fetch", { params: { q: "index", storage: e.path.get().storage, path: e.path.get().path } });
    },
    show: Ye(_e({ target: "none" }), _e({ target: "many" }))
  },
  {
    id: he.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll();
    },
    show: _e({ target: "none" })
  },
  {
    id: he.newfolder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(gt),
    show: _e({ target: "none", feature: ee.NEW_FOLDER })
  },
  {
    id: he.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      n.emitter.emit("vf-search-exit"), e[0] && n.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0].storage, path: e[0].path }
      });
    },
    show: _e({ target: "one", targetType: "dir" })
  },
  {
    id: he.pinFolder,
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
    id: he.unpinFolder,
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
    id: he.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(mt, { storage: e[0]?.storage, item: e[0] }),
    show: Re(
      _e({ target: "one", feature: ee.PREVIEW }),
      (n, e) => e.target?.type !== "dir"
    )
  },
  {
    id: he.download,
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
    id: he.rename,
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
    id: he.archive,
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
    id: he.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(kt, { items: e }),
    show: _e({ target: "one", feature: ee.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: he.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(Je, { items: e });
    },
    show: Ye(
      _e({ feature: ee.DELETE, target: "one" }),
      _e({ feature: ee.DELETE, target: "many" })
    )
  }
], td = {
  class: "vuefinder",
  ref: "root",
  tabindex: "0"
}, nd = { class: "vuefinder__main__content" }, od = /* @__PURE__ */ G({
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
    contextMenuItems: { default: () => ed },
    onError: {},
    onSelect: {},
    "onUpdate:path": {},
    icon: {}
  },
  emits: ["select", "update:path"],
  setup(n, { emit: e }) {
    const o = e, l = n, r = cn(l, Y("VueFinderOptions"));
    Pt("ServiceContainer", r);
    const v = r.config, c = r.fs, m = O(v.state), u = O(c.selectedItems);
    Xs(r);
    let _ = null;
    r.emitter.on("vf-fetch-abort", () => {
      _ && _.abort(), c.setLoading(!1);
    }), r.emitter.on("vf-fetch", ({ params: a, body: h = null, onSuccess: g = null, onError: C = null, noCloseModal: k = !1 }) => {
      ["index", "search"].includes(a.q) && (_ && _.abort(), c.setLoading(!0)), a.adapter = a.storage, _ = new AbortController();
      const S = _.signal;
      r.requester.send({
        url: "",
        method: a.m || "get",
        params: a,
        body: h,
        abortSignal: S
      }).then((y) => {
        c.setPath(y.dirname), v.get("persist") && v.set("path", y.dirname), k || r.modal.close(), c.setFiles(y.files), c.clearSelection(), c.setSelectedCount(0), c.setStorages(y.storages), g && g(y);
      }).catch((y) => {
        console.error(y), C ? C(y) : y && typeof y == "object" && "message" in y && r.emitter.emit("vf-toast-push", { label: y.message, type: "error" });
      }).finally(() => {
        ["index", "search"].includes(a.q) && c.setLoading(!1);
      });
    });
    function d(a) {
      let h = {};
      a && a.includes("://") && (h = {
        storage: a.split("://")[0],
        path: a
      }), r.emitter.emit("vf-fetch", {
        params: { q: "index", storage: c.path.get().storage, ...h },
        onError: l.onError ?? ((g) => {
          g && typeof g == "object" && "message" in g && r.emitter.emit("vf-toast-push", { label: g.message, type: "error" });
        })
      });
    }
    return de(() => {
      ve(() => l.path, (h) => {
        d(h);
      });
      const a = v.get("persist") ? v.get("path") : l.path;
      c.setPath(a), d(a), r.emitter.on("vf-select", (h) => {
        r.selectedItems = h, o("select", h);
      }), ve(() => c.path.get().path, (h) => {
        o("update:path", h);
      }), ve(u, (h) => {
        o("select", h);
      });
    }), (a, h) => (i(), f("div", td, [
      s("div", {
        class: X(t(r).theme.actualValue)
      }, [
        s("div", {
          class: X([t(m).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: Me(t(m).fullScreen ? "" : "max-height: " + n.maxHeight),
          onMousedown: h[0] || (h[0] = (g) => t(r).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (g) => t(r).emitter.emit("vf-contextmenu-hide"))
        }, [
          D(kl),
          D(va),
          s("div", nd, [
            D(Ji),
            D(ti)
          ]),
          D(ki)
        ], 38),
        D(Ut, { name: "fade" }, {
          default: j(() => [
            t(r).modal.visible ? (i(), I(Qe(t(r).modal.type), { key: 0 })) : T("", !0)
          ]),
          _: 1
        }),
        D(si)
      ], 2)
    ], 512));
  }
}), fd = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    let [o] = Object.keys(e.i18n);
    e.locale = e.locale ?? o ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", od);
  }
};
export {
  he as ContextMenuIds,
  od as VueFinder,
  fd as VueFinderPlugin,
  ed as contextMenuItems,
  fd as default
};
