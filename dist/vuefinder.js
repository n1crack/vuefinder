import { reactive as ze, watch as de, ref as b, shallowRef as rt, useTemplateRef as Ie, defineComponent as j, inject as Y, onMounted as ce, nextTick as Ve, createElementBlock as f, openBlock as i, withKeys as Le, unref as t, createElementVNode as o, withModifiers as we, renderSlot as Pe, createBlock as I, resolveDynamicComponent as Qe, toDisplayString as h, onUnmounted as He, normalizeClass as X, computed as se, withCtx as G, createVNode as D, createCommentVNode as $, Fragment as ne, renderList as re, createTextVNode as P, withDirectives as ae, vModelSelect as tt, vModelText as Re, onBeforeUnmount as lt, customRef as It, mergeProps as ke, toHandlers as Ee, vShow as ge, isRef as Ft, Teleport as Vt, normalizeStyle as Me, normalizeProps as Lt, TransitionGroup as Rt, onUpdated as Bt, mergeModels as Ht, useModel as at, resolveComponent as qt, provide as Nt, Transition as Pt } from "vue";
import { useStore as U } from "@nanostores/vue";
import zt from "mitt";
import { persistentAtom as Ut } from "@nanostores/persistent";
import { atom as he, computed as Fe } from "nanostores";
import Ot from "cropperjs";
import Kt from "@uppy/core";
import jt from "@uppy/xhr-upload";
import Gt from "@viselect/vanilla";
import Yt from "vanilla-lazyload";
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
    let [s, l] = e;
    this.config.fetchRequestInterceptor && (l = this.config.fetchRequestInterceptor(l));
    let r = await fetch(s, l);
    return this.config.fetchResponseInterceptor && (r = await this.config.fetchResponseInterceptor(r)), r;
  };
  transformRequestParams(e) {
    const s = this.config, l = {};
    Ke != null && Ke !== "" && s.xsrfHeaderName && (l[s.xsrfHeaderName] = Ke);
    const r = Object.assign({}, s.headers, l, e.headers), m = Object.assign({}, s.params, e.params), u = s.baseUrl + e.url, v = e.method;
    let c;
    if (v !== "get")
      if (e.body instanceof FormData) {
        const d = e.body;
        s.body != null && Object.entries(this.config.body).forEach(([a, p]) => {
          d.append(a, String(p));
        }), c = d;
      } else {
        const d = Object.assign({}, e.body ?? {});
        s.body != null && Object.assign(d, this.config.body), c = d;
      }
    const _ = { url: u, method: v, headers: r, params: m, body: c };
    if (s.transformRequest != null) {
      const d = s.transformRequest({ url: u, method: v, headers: r, params: m, body: c ?? null });
      d.url != null && (_.url = d.url), d.method != null && (_.method = d.method), d.params != null && (_.params = d.params), d.headers != null && (_.headers = d.headers), d.body != null && (_.body = d.body);
    }
    return _;
  }
  getDownloadUrl(e, s) {
    if (s.url != null) return s.url;
    const l = this.transformRequestParams({ url: "", method: "get", params: { q: "download", storage: e, adapter: e, path: s.path } });
    return l.url + "?" + new URLSearchParams(l.params).toString();
  }
  getPreviewUrl(e, s) {
    if (s.url != null) return s.url;
    const l = this.transformRequestParams({ url: "", method: "get", params: { q: "preview", storage: e, adapter: e, path: s.path } });
    return l.url + "?" + new URLSearchParams(l.params).toString();
  }
  async send(e) {
    const s = this.transformRequestParams(e), l = e.responseType || "json", r = { method: e.method, headers: s.headers, signal: e.abortSignal }, m = s.url + "?" + new URLSearchParams(s.params);
    if (s.method !== "get" && s.body != null) {
      let v;
      s.body instanceof FormData ? v = e.body : (v = JSON.stringify(s.body), r.headers["Content-Type"] = "application/json"), r.body = v;
    }
    this.config.fetchParams && Object.assign(r, this.config.fetchParams);
    const u = await this.customFetch(m, r);
    if (u.ok) return await u[l]();
    throw await u.json();
  }
}
function Qt(n) {
  const e = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof n == "string" ? Object.assign(e, { baseUrl: n }) : Object.assign(e, n), new Wt(e);
}
function Xt(n) {
  let e = localStorage.getItem(n + "_storage");
  const s = ze(JSON.parse(e ?? "{}"));
  de(s, l);
  function l() {
    Object.keys(s).length ? localStorage.setItem(n + "_storage", JSON.stringify(s)) : localStorage.removeItem(n + "_storage");
  }
  function r(c, _) {
    s[c] = _;
  }
  function m(c) {
    delete s[c];
  }
  function u() {
    Object.keys(s).forEach((c) => m(c));
  }
  return { getStore: (c, _ = null) => c in s ? s[c] : _, setStore: r, removeStore: m, clearStore: u };
}
async function Jt(n, e) {
  const s = e[n];
  return typeof s == "function" ? (await s()).default : s;
}
function Zt(n, e, s, l) {
  const { getStore: r, setStore: m } = n, u = b({}), v = b(r("locale", e)), c = (a, p = e) => {
    Jt(a, l).then((g) => {
      u.value = g, m("locale", a), v.value = a, m("translations", g), Object.values(l).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + a }), s.emit("vf-language-saved"));
    }).catch(() => {
      p ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), c(p, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  de(v, (a) => {
    c(a);
  }), !r("locale") && !Object.keys(l).length ? c(e) : u.value = r("translations");
  const _ = (a, ...p) => p.length ? _(a = a.replace("%s", String(p.shift())), ...p) : a;
  function d(a, ...p) {
    return u.value && Object.prototype.hasOwnProperty.call(u.value, a) ? _(u.value[a] || a, ...p) : _(a, ...p);
  }
  return ze({ t: d, locale: v });
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
function it(n, e, s, l, r) {
  return e = Math, s = e.log, l = 1024, r = s(n) / s(l) | 0, (n / e.pow(l, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "iB" : "B");
}
function dt(n, e, s, l, r) {
  return e = Math, s = e.log, l = 1e3, r = s(n) / s(l) | 0, (n / e.pow(l, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "B" : "B");
}
function nn(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!l) return 0;
  const r = parseFloat(l[1] || "0"), m = (l[2] || "").toLowerCase(), u = e[m] ?? 0;
  return Math.round(r * Math.pow(1024, u));
}
const Ce = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function on(n, e) {
  const s = b(Ce.SYSTEM), l = b(Ce.LIGHT);
  s.value = n.getStore("theme", e ?? Ce.SYSTEM);
  const r = window.matchMedia("(prefers-color-scheme: dark)"), m = (u) => {
    s.value === Ce.DARK || s.value === Ce.SYSTEM && u.matches ? l.value = Ce.DARK : l.value = Ce.LIGHT;
  };
  return m(r), r.addEventListener("change", m), {
    value: s,
    actualValue: l,
    set(u) {
      s.value = u, u !== Ce.SYSTEM ? n.setStore("theme", u) : n.removeStore("theme"), m(r);
    }
  };
}
function sn() {
  const n = rt(null), e = b(!1), s = b();
  return { visible: e, type: n, data: s, open: (m, u = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, n.value = m, s.value = u;
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
  const e = `vuefinder_config_${n}`, s = Ut(e, je, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), l = (_ = {}) => {
    const d = s.get(), a = { ...je, ..._, ...d };
    s.set(a);
  }, r = (_) => s.get()[_], m = () => s.get(), u = (_, d) => {
    const a = s.get();
    typeof _ == "object" && _ !== null ? s.set({ ...a, ..._ }) : s.set({ ...a, [_]: d });
  };
  return {
    // Store atom
    state: s,
    // Methods
    init: l,
    get: r,
    set: u,
    toggle: (_) => {
      const d = s.get();
      u(_, !d[_]);
    },
    all: m,
    reset: () => {
      s.set({ ...je });
    }
  };
};
function ln(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const s = Number(n) || 0, l = Number(e) || 0;
  return s === l ? 0 : s < l ? -1 : 1;
}
const an = () => {
  const n = he(""), e = he([]), s = he([]), l = he({ active: !1, column: "", order: "" }), r = he(/* @__PURE__ */ new Set()), m = he({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), u = he(null), v = he(0), c = he(!1), _ = Fe([n], (w) => {
    const M = (w || "local://").trim(), te = M.indexOf("://"), ue = te >= 0 ? M.slice(0, te) : "", Te = (te >= 0 ? M.slice(te + 3) : M).split("/").filter(Boolean);
    let ye = "";
    const Ae = Te.map(($e) => (ye = ye ? `${ye}/${$e}` : $e, { basename: $e, name: $e, path: ue ? `${ue}://${ye}` : ye, type: "dir" }));
    return { storage: ue, breadcrumb: Ae, path: M };
  }), d = Fe([s, l], (w, M) => {
    const { active: te, column: ue, order: Se } = M;
    if (!te || !ue) return w;
    const Te = Se === "asc" ? 1 : -1;
    return w.slice().sort((ye, Ae) => ln(ye[ue], Ae[ue]) * Te);
  }), a = Fe([s, r], (w, M) => M.size === 0 ? [] : w.filter((te) => M.has(te.path))), p = (w) => {
    n.set(w);
  }, g = (w) => {
    s.set(w ?? []);
  }, T = (w) => {
    e.set(w ?? []);
  }, x = (w, M) => {
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
  }, k = () => {
    l.set({ active: !1, column: "", order: "" });
  }, C = (w) => {
    const M = new Set(r.get());
    M.add(w), r.set(M), v.set(M.size);
  }, F = (w) => {
    const M = new Set(r.get());
    M.delete(w), r.set(M), v.set(M.size);
  }, z = (w) => {
    const M = new Set(r.get());
    M.has(w) ? M.delete(w) : M.add(w), r.set(M), v.set(M.size);
  }, J = () => {
    const w = new Set(s.get().map((M) => M.path));
    r.set(w), v.set(w.size);
  }, oe = () => {
    r.set(/* @__PURE__ */ new Set()), v.set(0);
  }, B = (w) => {
    const M = new Set(w ?? []);
    r.set(M), v.set(M.size);
  }, L = (w) => {
    v.set(w);
  }, le = (w) => {
    c.set(!!w);
  }, O = () => c.get(), ie = (w, M) => {
    const te = s.get().filter((ue) => M.has(ue.path));
    m.set({
      type: w,
      path: _.get().path,
      items: new Set(te)
    });
  }, V = (w) => Fe([m], (M) => M.type === "cut" && Array.from(M.items).some((te) => te.path === w)), y = (w) => Fe([m], (M) => M.type === "copy" && Array.from(M.items).some((te) => te.path === w));
  return {
    // Atoms (state)
    files: s,
    storages: e,
    currentPath: n,
    sort: l,
    selectedKeys: r,
    selectedCount: v,
    loading: c,
    draggedItem: u,
    clipboardItems: m,
    // Computed values
    path: _,
    sortedFiles: d,
    selectedItems: a,
    // Actions
    setPath: p,
    setFiles: g,
    setStorages: T,
    setSort: x,
    toggleSort: S,
    clearSort: k,
    select: C,
    deselect: F,
    toggleSelect: z,
    selectAll: J,
    clearSelection: oe,
    setSelection: B,
    setSelectedCount: L,
    setLoading: le,
    isLoading: O,
    setClipboard: ie,
    createIsCut: V,
    createIsCopied: y,
    isCut: (w) => {
      const M = V(w);
      return U(M).value ?? !1;
    },
    isCopied: (w) => {
      const M = y(w);
      return U(M).value ?? !1;
    },
    clearClipboard: () => {
      m.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
    },
    getClipboard: () => m.get(),
    setDraggedItem: (w) => {
      u.set(w);
    },
    getDraggedItem: () => u.get(),
    clearDraggedItem: () => {
      u.set(null);
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
      const a = n.get();
      typeof _ == "object" && _ !== null ? n.set({ ...a, ..._ }) : n.set({ ...a, [_]: d });
    },
    all: () => n.get(),
    reset: () => {
      n.set({ ...nt });
    }
  };
}, cn = (n, e) => {
  const s = Xt(n.id), l = zt(), r = on(s, n.theme), m = e.i18n, u = n.locale ?? e.locale, v = rn(n.id), c = an(), _ = dn(), d = (a) => Array.isArray(a) ? a : en;
  return ze({
    // app version
    version: tn,
    // config store
    config: v,
    // files store
    fs: c,
    // search store
    search: _,
    // root element
    root: Ie("root"),
    // app id
    debug: n.debug,
    // Event Bus
    emitter: l,
    // storage
    storage: s,
    // localization object
    i18n: Zt(s, u, l, m),
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
    filesize: v.get("metricUnits") ? dt : it,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // custom icon
    customIcon: n.icon,
    // selectButton state
    selectButton: n.selectButton
  });
}, un = { class: "vuefinder__modal-layout__container" }, vn = { class: "vuefinder__modal-layout__content" }, _n = { class: "vuefinder__modal-layout__footer" }, be = /* @__PURE__ */ j({
  __name: "ModalLayout",
  setup(n) {
    const e = b(null), s = Y("ServiceContainer");
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
    }), (l, r) => (i(), f("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: r[1] || (r[1] = Le((m) => t(s).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      r[2] || (r[2] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", un, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: r[0] || (r[0] = we((m) => t(s).modal.close(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            o("div", vn, [
              Pe(l.$slots, "default")
            ]),
            o("div", _n, [
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
}, xe = /* @__PURE__ */ j({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, s) => (i(), f("div", mn, [
      o("div", fn, [
        (i(), I(Qe(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("h3", pn, h(n.title), 1)
    ]));
  }
}), hn = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: s }) {
    const l = Y("ServiceContainer"), r = b(!1), { t: m } = l.i18n;
    let u = null;
    const v = () => {
      clearTimeout(u), r.value = !0, u = setTimeout(() => {
        r.value = !1;
      }, 2e3);
    };
    return ce(() => {
      l.emitter.on(n.on, v);
    }), He(() => {
      clearTimeout(u);
    }), {
      shown: r,
      t: m
    };
  }
}, gn = (n, e) => {
  const s = n.__vccOpts || n;
  for (const [l, r] of e)
    s[l] = r;
  return s;
}, wn = { key: 1 };
function bn(n, e, s, l, r, m) {
  return i(), f("div", {
    class: X(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    n.$slots.default ? Pe(n.$slots, "default", { key: 0 }) : (i(), f("span", wn, h(l.t("Saved.")), 1))
  ], 2);
}
const De = /* @__PURE__ */ gn(hn, [["render", bn]]), yn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function kn(n, e) {
  return i(), f("svg", yn, [...e[0] || (e[0] = [
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
}, Nn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Pn = { class: "vuefinder__about-modal__setting-input" }, zn = ["checked"], Un = { class: "vuefinder__about-modal__setting-label" }, On = {
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
}, Eo = { class: "vuefinder__about-modal__description" }, ct = /* @__PURE__ */ j({
  __name: "ModalAbout",
  setup(n) {
    const e = Y("ServiceContainer"), s = e.config, { clearStore: l } = e.storage, { t: r } = e.i18n, m = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, u = se(() => [
      { name: r("About"), key: m.ABOUT, current: !1 },
      { name: r("Settings"), key: m.SETTINGS, current: !1 },
      { name: r("Shortcuts"), key: m.SHORTCUTS, current: !1 },
      { name: r("Reset"), key: m.RESET, current: !1 }
    ]), v = b("about"), c = async () => {
      s.reset(), l(), location.reload();
    }, _ = (C) => {
      e.theme.set(C), e.emitter.emit("vf-theme-saved");
    }, d = () => {
      s.toggle("metricUnits"), e.filesize = s.get("metricUnits") ? dt : it, e.emitter.emit("vf-metric-units-saved");
    }, a = () => {
      s.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      s.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, g = () => {
      s.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: T } = Y("VueFinderOptions"), S = Object.fromEntries(
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
      }).filter(([C]) => Object.keys(T).includes(C))
    ), k = se(() => ({
      system: r("System"),
      light: r("Light"),
      dark: r("Dark")
    }));
    return (C, F) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: F[3] || (F[3] = (z) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(r)("Close")), 1)
      ]),
      default: G(() => [
        o("div", Sn, [
          D(xe, {
            icon: t(xn),
            title: "Vuefinder " + t(e).version
          }, null, 8, ["icon", "title"]),
          o("div", $n, [
            o("div", null, [
              o("div", null, [
                o("nav", Cn, [
                  (i(!0), f(ne, null, re(u.value, (z) => (i(), f("button", {
                    key: z.name,
                    onClick: (J) => v.value = z.key,
                    class: X([z.key === v.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": z.current ? "page" : void 0
                  }, h(z.name), 11, En))), 128))
                ])
              ])
            ]),
            v.value === m.ABOUT ? (i(), f("div", Mn, [
              o("div", Tn, h(t(r)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              o("a", An, h(t(r)("Project home")), 1),
              o("a", Dn, h(t(r)("Follow on GitHub")), 1)
            ])) : $("", !0),
            v.value === m.SETTINGS ? (i(), f("div", In, [
              o("div", Fn, h(t(r)("Customize your experience with the following settings")), 1),
              o("div", Vn, [
                o("fieldset", null, [
                  o("div", Ln, [
                    o("div", Rn, [
                      o("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: t(s).get("metricUnits"),
                        onChange: d,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Bn)
                    ]),
                    o("div", Hn, [
                      o("label", qn, [
                        P(h(t(r)("Use Metric Units")) + " ", 1),
                        D(De, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: G(() => [
                            P(h(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  o("div", Nn, [
                    o("div", Pn, [
                      o("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: t(s).get("compactListView"),
                        onChange: a,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, zn)
                    ]),
                    o("div", Un, [
                      o("label", On, [
                        P(h(t(r)("Compact list view")) + " ", 1),
                        D(De, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: G(() => [
                            P(h(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  o("div", Kn, [
                    o("div", jn, [
                      o("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: t(s).get("persist"),
                        onChange: g,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Gn)
                    ]),
                    o("div", Yn, [
                      o("label", Wn, [
                        P(h(t(r)("Persist path on reload")) + " ", 1),
                        D(De, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: G(() => [
                            P(h(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  o("div", Qn, [
                    o("div", Xn, [
                      o("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: t(s).get("showThumbnails"),
                        onChange: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Jn)
                    ]),
                    o("div", Zn, [
                      o("label", eo, [
                        P(h(t(r)("Show thumbnails")) + " ", 1),
                        D(De, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: G(() => [
                            P(h(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  o("div", to, [
                    o("div", no, [
                      o("label", oo, h(t(r)("Theme")), 1)
                    ]),
                    o("div", so, [
                      ae(o("select", {
                        id: "theme",
                        "onUpdate:modelValue": F[0] || (F[0] = (z) => t(e).theme.value = z),
                        onChange: F[1] || (F[1] = (z) => _(z.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        o("optgroup", {
                          label: t(r)("Theme")
                        }, [
                          (i(!0), f(ne, null, re(k.value, (z, J) => (i(), f("option", { value: J }, h(z), 9, lo))), 256))
                        ], 8, ro)
                      ], 544), [
                        [tt, t(e).theme.value]
                      ]),
                      D(De, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: G(() => [
                          P(h(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t(e).features.includes(t(ee).LANGUAGE) && Object.keys(t(S)).length > 1 ? (i(), f("div", ao, [
                    o("div", io, [
                      o("label", co, h(t(r)("Language")), 1)
                    ]),
                    o("div", uo, [
                      ae(o("select", {
                        id: "language",
                        "onUpdate:modelValue": F[2] || (F[2] = (z) => t(e).i18n.locale = z),
                        class: "vuefinder__about-modal__select"
                      }, [
                        o("optgroup", {
                          label: t(r)("Language")
                        }, [
                          (i(!0), f(ne, null, re(t(S), (z, J) => (i(), f("option", { value: J }, h(z), 9, _o))), 256))
                        ], 8, vo)
                      ], 512), [
                        [tt, t(e).i18n.locale]
                      ]),
                      D(De, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: G(() => [
                          P(h(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : $("", !0)
                ])
              ])
            ])) : $("", !0),
            v.value === m.SHORTCUTS ? (i(), f("div", mo, [
              o("div", fo, [
                o("div", po, [
                  o("div", null, h(t(r)("Rename")), 1),
                  F[4] || (F[4] = o("kbd", null, "F2", -1))
                ]),
                o("div", ho, [
                  o("div", null, h(t(r)("Refresh")), 1),
                  F[5] || (F[5] = o("kbd", null, "F5", -1))
                ]),
                o("div", go, [
                  P(h(t(r)("Delete")) + " ", 1),
                  F[6] || (F[6] = o("kbd", null, "Del", -1))
                ]),
                o("div", wo, [
                  P(h(t(r)("Escape")) + " ", 1),
                  F[7] || (F[7] = o("div", null, [
                    o("kbd", null, "Esc")
                  ], -1))
                ]),
                o("div", bo, [
                  P(h(t(r)("Select All")) + " ", 1),
                  F[8] || (F[8] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    P(" + "),
                    o("kbd", null, "A")
                  ], -1))
                ]),
                o("div", yo, [
                  P(h(t(r)("Search")) + " ", 1),
                  F[9] || (F[9] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    P(" + "),
                    o("kbd", null, "F")
                  ], -1))
                ]),
                o("div", ko, [
                  P(h(t(r)("Toggle Sidebar")) + " ", 1),
                  F[10] || (F[10] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    P(" + "),
                    o("kbd", null, "E")
                  ], -1))
                ]),
                o("div", xo, [
                  P(h(t(r)("Open Settings")) + " ", 1),
                  F[11] || (F[11] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    P(" + "),
                    o("kbd", null, ",")
                  ], -1))
                ]),
                o("div", So, [
                  P(h(t(r)("Toggle Full Screen")) + " ", 1),
                  F[12] || (F[12] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    P(" + "),
                    o("kbd", null, "Enter")
                  ], -1))
                ]),
                o("div", $o, [
                  P(h(t(r)("Preview")) + " ", 1),
                  F[13] || (F[13] = o("div", null, [
                    o("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : $("", !0),
            v.value === m.RESET ? (i(), f("div", Co, [
              o("div", Eo, h(t(r)("Reset all settings to default")), 1),
              o("button", {
                onClick: c,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, h(t(r)("Reset Settings")), 1)
            ])) : $("", !0)
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
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
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
}, Bo = { class: "vuefinder__delete-modal__file-name" }, Ho = { class: "vuefinder__delete-modal__warning" }, Je = /* @__PURE__ */ j({
  __name: "ModalDelete",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = U(l.path), m = b(e.modal.data.items), u = b(""), v = () => {
      m.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: m.value.map(({ path: c, type: _ }) => ({ path: c, type: _ }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files deleted.") });
        },
        onError: (c) => {
          u.value = s(c.message);
        }
      });
    };
    return (c, _) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-danger"
        }, h(t(s)("Yes, Delete!")), 1),
        o("button", {
          type: "button",
          onClick: _[1] || (_[1] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(s)("Cancel")), 1),
        o("div", Ho, h(t(s)("This action cannot be undone.")), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(ut),
            title: t(s)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", Ao, [
            o("div", Do, [
              o("p", Io, h(t(s)("Are you sure you want to delete these files?")), 1),
              o("div", Fo, [
                (i(!0), f(ne, null, re(m.value, (d) => (i(), f("p", Vo, [
                  d.type === "dir" ? (i(), f("svg", Lo, [..._[2] || (_[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (i(), f("svg", Ro, [..._[3] || (_[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Bo, h(d.basename), 1)
                ]))), 256))
              ]),
              u.value.length ? (i(), I(t(u), {
                key: 0,
                onHidden: _[0] || (_[0] = (d) => u.value = ""),
                error: ""
              }, {
                default: G(() => [
                  P(h(u.value), 1)
                ]),
                _: 1
              })) : $("", !0)
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
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const vt = { render: No }, Po = { class: "vuefinder__rename-modal__content" }, zo = { class: "vuefinder__rename-modal__item" }, Uo = { class: "vuefinder__rename-modal__item-info" }, Oo = {
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
}, jo = { class: "vuefinder__rename-modal__item-name" }, Ze = /* @__PURE__ */ j({
  __name: "ModalRename",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = U(l.path), m = b(e.modal.data.items[0]), u = b(e.modal.data.items[0].basename), v = b(""), c = () => {
      u.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          item: m.value.path,
          name: u.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is renamed.", u.value) });
        },
        onError: (_) => {
          v.value = s(_.message);
        }
      });
    };
    return (_, d) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, h(t(s)("Rename")), 1),
        o("button", {
          type: "button",
          onClick: d[2] || (d[2] = (a) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(s)("Cancel")), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(vt),
            title: t(s)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", Po, [
            o("div", zo, [
              o("p", Uo, [
                m.value.type === "dir" ? (i(), f("svg", Oo, [...d[3] || (d[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (i(), f("svg", Ko, [...d[4] || (d[4] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", jo, h(m.value.basename), 1)
              ]),
              ae(o("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => u.value = a),
                onKeyup: Le(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Re, u.value]
              ]),
              v.value.length ? (i(), I(t(v), {
                key: 0,
                onHidden: d[1] || (d[1] = (a) => v.value = ""),
                error: ""
              }, {
                default: G(() => [
                  P(h(v.value), 1)
                ]),
                _: 1
              })) : $("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Go = ["title"], _t = /* @__PURE__ */ j({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const s = e, l = Y("ServiceContainer"), { t: r } = l.i18n, m = b(!1), u = b(null), v = b(u.value?.innerHTML);
    de(v, () => m.value = !1);
    const c = () => {
      s("hidden"), m.value = !0;
    };
    return (_, d) => (i(), f("div", null, [
      m.value ? $("", !0) : (i(), f("div", {
        key: 0,
        ref_key: "strMessage",
        ref: u,
        class: X(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Pe(_.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          onClick: c,
          title: t(r)("Close")
        }, [...d[0] || (d[0] = [
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
        ])], 8, Go)
      ], 2))
    ]));
  }
}), Yo = { class: "vuefinder__text-preview" }, Wo = { class: "vuefinder__text-preview__header" }, Qo = ["title"], Xo = { class: "vuefinder__text-preview__actions" }, Jo = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Zo = { key: 1 }, es = /* @__PURE__ */ j({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, l = b(""), r = b(""), m = b(null), u = b(!1), v = b(""), c = b(!1), _ = Y("ServiceContainer"), { t: d } = _.i18n;
    ce(() => {
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
        l.value = g, s("success");
      });
    });
    const a = () => {
      u.value = !u.value, r.value = l.value;
    }, p = () => {
      v.value = "", c.value = !1, _.requester.send({
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
        v.value = d("Updated."), l.value = g, s("success"), u.value = !u.value;
      }).catch((g) => {
        v.value = d(g.message), c.value = !0;
      });
    };
    return (g, T) => (i(), f("div", Yo, [
      o("div", Wo, [
        o("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(_).modal.data.item.path
        }, h(t(_).modal.data.item.basename), 9, Qo),
        o("div", Xo, [
          u.value ? (i(), f("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, h(t(d)("Save")), 1)) : $("", !0),
          t(_).features.includes(t(ee).EDIT) ? (i(), f("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: T[0] || (T[0] = (x) => a())
          }, h(u.value ? t(d)("Cancel") : t(d)("Edit")), 1)) : $("", !0)
        ])
      ]),
      o("div", null, [
        u.value ? (i(), f("div", Zo, [
          ae(o("textarea", {
            ref_key: "editInput",
            ref: m,
            "onUpdate:modelValue": T[1] || (T[1] = (x) => r.value = x),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Re, r.value]
          ])
        ])) : (i(), f("pre", Jo, h(l.value), 1)),
        v.value.length ? (i(), I(_t, {
          key: 2,
          onHidden: T[2] || (T[2] = (x) => v.value = ""),
          error: c.value
        }, {
          default: G(() => [
            P(h(v.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : $("", !0)
      ])
    ]));
  }
}), ts = ["src"], ns = /* @__PURE__ */ j({
  __name: "CropperCanvas",
  props: {
    src: {},
    class: {}
  },
  setup(n, { expose: e }) {
    const s = n, l = b(null), r = b(null), m = async () => {
      if (!l.value) return;
      await Ve();
      const v = new Image();
      v.crossOrigin = "anonymous", v.src = s.src, await new Promise((_, d) => {
        v.onload = () => _(), v.onerror = () => d(new Error("Image load failed"));
      });
      const c = l.value.getContext("2d");
      c && (l.value.width = v.naturalWidth || v.width, l.value.height = v.naturalHeight || v.height, c.drawImage(v, 0, 0), r.value = new Ot(l.value, {}));
    };
    return ce(() => {
      m().catch(() => {
      });
    }), lt(() => {
      r.value && (r.value.destroy(), r.value = null);
    }), de(() => s.src, () => {
      r.value && (r.value.destroy(), r.value = null), m().catch(() => {
      });
    }), e({ getCroppedBlob: (v) => new Promise((c) => {
      if (!r.value) return c(null);
      const _ = r.value.getCroppedCanvas?.(v);
      if (!_) return c(null);
      _.toBlob((d) => c(d));
    }) }), (v, c) => (i(), f("cropper-canvas", {
      background: "",
      ref_key: "canvasEl",
      ref: l,
      class: X(s.class)
    }, [
      o("cropper-image", {
        src: n.src,
        alt: "Picture",
        style: { width: "100%" },
        rotatable: "",
        scalable: "",
        skewable: "",
        translatable: ""
      }, null, 8, ts),
      c[0] || (c[0] = o("cropper-shade", { hidden: "" }, null, -1)),
      c[1] || (c[1] = o("cropper-handle", {
        action: "select",
        plain: ""
      }, null, -1)),
      c[2] || (c[2] = o("cropper-selection", {
        "initial-coverage": "0.5",
        movable: "",
        resizable: ""
      }, [
        o("cropper-grid", {
          role: "grid",
          covered: ""
        }),
        o("cropper-crosshair", { centered: "" }),
        o("cropper-handle", {
          action: "move",
          "theme-color": "rgba(255, 255, 255, 0.35)"
        }),
        o("cropper-handle", { action: "n-resize" }),
        o("cropper-handle", { action: "e-resize" }),
        o("cropper-handle", { action: "s-resize" }),
        o("cropper-handle", { action: "w-resize" }),
        o("cropper-handle", { action: "ne-resize" }),
        o("cropper-handle", { action: "nw-resize" }),
        o("cropper-handle", { action: "se-resize" }),
        o("cropper-handle", { action: "sw-resize" })
      ], -1))
    ], 2));
  }
}), os = { class: "vuefinder__image-preview" }, ss = { class: "vuefinder__image-preview__header" }, rs = ["title"], ls = { class: "vuefinder__image-preview__actions" }, as = { class: "vuefinder__image-preview__image-container h-[50vh]" }, is = ["src"], ds = /* @__PURE__ */ j({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, l = Y("ServiceContainer"), { t: r } = l.i18n, m = b(null), u = b(!1), v = b(""), c = b(!1), _ = () => {
      u.value = !u.value;
    }, d = () => {
      m.value?.getCroppedBlob({ width: 795, height: 341 }).then((a) => {
        if (!a) return;
        v.value = "", c.value = !1;
        const p = new FormData();
        p.set("file", a), l.requester.send({
          url: "",
          method: "post",
          params: {
            q: "upload",
            storage: l.modal.data.storage,
            path: l.modal.data.item.path
          },
          body: p
        }).then(() => {
          v.value = r("Updated."), _(), s("success");
        }).catch((g) => {
          const T = g?.message ?? "Error";
          v.value = r(T), c.value = !0;
        });
      });
    };
    return ce(() => {
      s("success");
    }), (a, p) => (i(), f("div", os, [
      o("div", ss, [
        o("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, h(t(l).modal.data.item.basename), 9, rs),
        o("div", ls, [
          u.value ? (i(), f("button", {
            key: 0,
            onClick: d,
            class: "vuefinder__image-preview__crop-button"
          }, h(t(r)("Crop")), 1)) : $("", !0),
          t(l).features.includes(t(ee).EDIT) ? (i(), f("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: p[0] || (p[0] = (g) => _())
          }, h(u.value ? t(r)("Cancel") : t(r)("Edit")), 1)) : $("", !0)
        ])
      ]),
      o("div", as, [
        u.value ? $("", !0) : (i(), f("img", {
          key: 0,
          class: "vuefinder__image-preview__image w-full h-full object-contain",
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          alt: ""
        }, null, 8, is)),
        u.value ? (i(), I(ns, {
          key: 1,
          ref_key: "cropperRef",
          ref: m,
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, ["src"])) : $("", !0)
      ]),
      v.value.length ? (i(), I(t(v), {
        key: 0,
        onHidden: p[1] || (p[1] = (g) => v.value = ""),
        error: c.value
      }, {
        default: G(() => [
          P(h(v.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : $("", !0)
    ]));
  }
}), cs = { class: "vuefinder__default-preview" }, us = { class: "vuefinder__default-preview__header" }, vs = ["title"], _s = /* @__PURE__ */ j({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = Y("ServiceContainer"), l = e;
    return ce(() => {
      l("success");
    }), (r, m) => (i(), f("div", cs, [
      o("div", us, [
        o("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: t(s).modal.data.item.path
        }, h(t(s).modal.data.item.basename), 9, vs)
      ]),
      m[0] || (m[0] = o("div", null, null, -1))
    ]));
  }
}), ms = { class: "vuefinder__video-preview" }, fs = ["title"], ps = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, hs = ["src"], gs = /* @__PURE__ */ j({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = Y("ServiceContainer"), l = e, r = () => s.requester.getPreviewUrl(s.modal.data.storage, s.modal.data.item);
    return ce(() => {
      l("success");
    }), (m, u) => (i(), f("div", ms, [
      o("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: t(s).modal.data.item.path
      }, h(t(s).modal.data.item.basename), 9, fs),
      o("div", null, [
        o("video", ps, [
          o("source", {
            src: r(),
            type: "video/mp4"
          }, null, 8, hs),
          u[0] || (u[0] = P(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), ws = { class: "vuefinder__audio-preview" }, bs = ["title"], ys = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, ks = ["src"], xs = /* @__PURE__ */ j({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, l = Y("ServiceContainer"), r = () => l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item);
    return ce(() => {
      s("success");
    }), (m, u) => (i(), f("div", ws, [
      o("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: t(l).modal.data.item.path
      }, h(t(l).modal.data.item.basename), 9, bs),
      o("div", null, [
        o("audio", ys, [
          o("source", {
            src: r(),
            type: "audio/mpeg"
          }, null, 8, ks),
          u[0] || (u[0] = P(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Ss = { class: "vuefinder__pdf-preview" }, $s = ["title"], Cs = ["data"], Es = ["src"], Ms = /* @__PURE__ */ j({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = Y("ServiceContainer"), l = e, r = () => s.requester.getPreviewUrl(s.modal.data.storage, s.modal.data.item);
    return ce(() => {
      l("success");
    }), (m, u) => (i(), f("div", Ss, [
      o("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: t(s).modal.data.item.path
      }, h(t(s).modal.data.item.basename), 9, $s),
      o("div", null, [
        o("object", {
          class: "vuefinder__pdf-preview__object",
          data: r(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          o("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: r(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Es)
        ], 8, Cs)
      ])
    ]));
  }
});
function Ts(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const As = { class: "vuefinder__preview-modal__content" }, Ds = { key: 0 }, Is = { class: "vuefinder__preview-modal__loading" }, Fs = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Vs = { class: "vuefinder__preview-modal__details" }, Ls = { class: "font-bold" }, Rs = { class: "font-bold pl-2" }, Bs = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Hs = ["download", "href"], mt = /* @__PURE__ */ j({
  __name: "ModalPreview",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = b(!1), r = (u) => (e.modal.data.item.mime_type ?? "").startsWith(u), m = e.features.includes(ee.PREVIEW);
    return m || (l.value = !0), (u, v) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: v[6] || (v[6] = (c) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(s)("Close")), 1),
        t(e).features.includes(t(ee).DOWNLOAD) ? (i(), f("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item),
          href: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item)
        }, h(t(s)("Download")), 9, Hs)) : $("", !0)
      ]),
      default: G(() => [
        o("div", null, [
          o("div", As, [
            t(m) ? (i(), f("div", Ds, [
              r("text") ? (i(), I(es, {
                key: 0,
                onSuccess: v[0] || (v[0] = (c) => l.value = !0)
              })) : r("image") ? (i(), I(ds, {
                key: 1,
                onSuccess: v[1] || (v[1] = (c) => l.value = !0)
              })) : r("video") ? (i(), I(gs, {
                key: 2,
                onSuccess: v[2] || (v[2] = (c) => l.value = !0)
              })) : r("audio") ? (i(), I(xs, {
                key: 3,
                onSuccess: v[3] || (v[3] = (c) => l.value = !0)
              })) : r("application/pdf") ? (i(), I(Ms, {
                key: 4,
                onSuccess: v[4] || (v[4] = (c) => l.value = !0)
              })) : (i(), I(_s, {
                key: 5,
                onSuccess: v[5] || (v[5] = (c) => l.value = !0)
              }))
            ])) : $("", !0),
            o("div", Is, [
              l.value === !1 ? (i(), f("div", Fs, [
                v[7] || (v[7] = o("svg", {
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
                o("span", null, h(t(s)("Loading")), 1)
              ])) : $("", !0)
            ])
          ])
        ]),
        o("div", Vs, [
          o("div", null, [
            o("span", Ls, h(t(s)("File Size")) + ": ", 1),
            P(h(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          o("div", null, [
            o("span", Rs, h(t(s)("Last Modified")) + ": ", 1),
            P(" " + h(t(Ts)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(ee).DOWNLOAD) ? (i(), f("div", Bs, [
          o("span", null, h(t(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : $("", !0)
      ]),
      _: 1
    }));
  }
}), qs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Ns(n, e) {
  return i(), f("svg", qs, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Ps = { render: Ns }, zs = { class: "vuefinder__move-modal__content" }, Us = { class: "vuefinder__move-modal__description" }, Os = { class: "vuefinder__move-modal__files vf-scrollbar" }, Ks = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, js = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gs = { class: "vuefinder__move-modal__file-name" }, Ys = { class: "vuefinder__move-modal__target-title" }, Ws = { class: "vuefinder__move-modal__target-directory" }, Qs = { class: "vuefinder__move-modal__target-path" }, Xs = { class: "vuefinder__move-modal__selected-items" }, ft = /* @__PURE__ */ j({
  __name: "ModalTransfer",
  props: {
    q: {},
    title: {},
    body: {},
    successBtn: {},
    successText: {}
  },
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = U(l.path), m = n, u = b(e.modal.data.items.from), v = e.modal.data.items.to, c = b("");
    console.log(v.value.path);
    const _ = () => {
      u.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: m.q,
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: u.value.map(({ path: d, type: a }) => ({ path: d, type: a })),
          item: v.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: m.successText });
        },
        onError: (d) => {
          c.value = s(d.message);
        }
      });
    };
    return (d, a) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: _,
          class: "vf-btn vf-btn-primary"
        }, h(m.successBtn), 1),
        o("button", {
          type: "button",
          onClick: a[1] || (a[1] = (p) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(s)("Cancel")), 1),
        o("div", Xs, h(t(s)("%s item(s) selected.", u.value.size)), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(Ps),
            title: m.title
          }, null, 8, ["icon", "title"]),
          o("div", zs, [
            o("p", Us, h(m.body), 1),
            o("div", Os, [
              (i(!0), f(ne, null, re(u.value, (p) => (i(), f("div", {
                class: "vuefinder__move-modal__file",
                key: p.path
              }, [
                o("div", null, [
                  p.type === "dir" ? (i(), f("svg", Ks, [...a[2] || (a[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (i(), f("svg", js, [...a[3] || (a[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                o("div", Gs, h(p.path), 1)
              ]))), 128))
            ]),
            o("h4", Ys, h(t(s)("Target Directory")), 1),
            o("p", Ws, [
              a[4] || (a[4] = o("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "1"
              }, [
                o("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                })
              ], -1)),
              o("span", Qs, h(t(v).value.path), 1)
            ]),
            c.value.length ? (i(), I(t(c), {
              key: 0,
              onHidden: a[0] || (a[0] = (p) => c.value = ""),
              error: ""
            }, {
              default: G(() => [
                P(h(c.value), 1)
              ]),
              _: 1
            })) : $("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), pt = /* @__PURE__ */ j({
  __name: "ModalMove",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n;
    return (l, r) => (i(), I(ft, {
      q: "move",
      title: t(s)("Move files"),
      body: t(s)("Are you sure you want to move these files"),
      "success-btn": t(s)("Yes, Move!"),
      "success-text": t(s)("Files moved.")
    }, null, 8, ["title", "body", "success-btn", "success-text"]));
  }
}), Js = /* @__PURE__ */ j({
  __name: "ModalCopy",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n;
    return (l, r) => (i(), I(ft, {
      q: "copy",
      title: t(s)("Copy files"),
      body: t(s)("Are you sure you want to copy these files"),
      "success-btn": t(s)("Yes, Copy!"),
      "success-text": t(s)("Files copied.")
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
function Zs(n) {
  const e = n.search, s = n.fs, l = n.config, r = U(e.state), m = U(s.selectedItems), u = (v) => {
    if (v.code === fe.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible && !r.value?.searchMode) {
      if (v.code === fe.F2 && n.features.includes(ee.RENAME) && m.value.length === 1 && n.modal.open(Ze, { items: m.value }), v.code === fe.F5 && n.emitter.emit("vf-fetch", { params: { q: "index", storage: s.path.get().storage, path: s.path.get().path } }), v.code === fe.DELETE && m.value.length === 0 && n.modal.open(Je, { items: m.value }), v.ctrlKey && v.code === fe.BACKSLASH && n.modal.open(ct), v.ctrlKey && v.code === fe.KEY_F && n.features.includes(ee.SEARCH) && (e.enterSearchMode(), v.preventDefault()), v.ctrlKey && v.code === fe.KEY_E && (l.toggle("showTreeView"), v.preventDefault()), v.ctrlKey && v.code === fe.ENTER && (l.toggle("fullScreen"), n.root.focus()), v.ctrlKey && v.code === fe.KEY_A && (s.selectAll(), v.preventDefault()), v.code === fe.SPACE && m.value.length === 1 && m.value[0]?.type !== "dir" && n.modal.open(mt, { storage: s.path.get().storage, item: m.value[0] }), v.metaKey && v.code === fe.KEY_C) {
        if (m.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        s.setClipboard("copy", new Set(m.value.map((c) => c.path))), n.emitter.emit("vf-toast-push", { label: m.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", m.value.length) }), v.preventDefault();
      }
      if (v.metaKey && v.code === fe.KEY_X) {
        if (m.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        s.setClipboard("cut", new Set(m.value.map((c) => c.path))), n.emitter.emit("vf-toast-push", { label: m.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", m.value.length) }), v.preventDefault();
      }
      if (v.metaKey && v.code === fe.KEY_V) {
        if (s.getClipboard().items.size === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items in clipboard") });
          return;
        }
        if (s.getClipboard().path === s.path.get().path) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("Cannot paste items to the same directory") });
          return;
        }
        if (s.getClipboard().type === "cut") {
          n.modal.open(pt, { items: { from: s.getClipboard().items, to: s.path } }), s.clearClipboard();
          return;
        }
        if (s.getClipboard().type === "copy") {
          n.modal.open(Js, { items: { from: s.getClipboard().items, to: s.path } });
          return;
        }
        v.preventDefault();
      }
    }
  };
  ce(() => {
    n.root.addEventListener("keydown", u);
  }), lt(() => {
    n.root.removeEventListener("keydown", u);
  });
}
const er = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function tr(n, e) {
  return i(), f("svg", er, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ht = { render: tr }, nr = { class: "vuefinder__new-folder-modal__content" }, or = { class: "vuefinder__new-folder-modal__form" }, sr = { class: "vuefinder__new-folder-modal__description" }, rr = ["placeholder"], gt = /* @__PURE__ */ j({
  __name: "ModalNewFolder",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = U(l.path), m = b(""), u = b(""), v = () => {
      m.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          name: m.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", m.value) });
        },
        onError: (c) => {
          u.value = s(c.message);
        }
      });
    };
    return (c, _) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, h(t(s)("Create")), 1),
        o("button", {
          type: "button",
          onClick: _[2] || (_[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(s)("Cancel")), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(ht),
            title: t(s)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", nr, [
            o("div", or, [
              o("p", sr, h(t(s)("Create a new folder")), 1),
              ae(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => m.value = d),
                onKeyup: Le(v, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(s)("Folder Name"),
                type: "text"
              }, null, 40, rr), [
                [Re, m.value]
              ]),
              u.value.length ? (i(), I(t(u), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => u.value = ""),
                error: ""
              }, {
                default: G(() => [
                  P(h(u.value), 1)
                ]),
                _: 1
              })) : $("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), lr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ar(n, e) {
  return i(), f("svg", lr, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const wt = { render: ar }, ir = { class: "vuefinder__new-file-modal__content" }, dr = { class: "vuefinder__new-file-modal__form" }, cr = { class: "vuefinder__new-file-modal__description" }, ur = ["placeholder"], vr = /* @__PURE__ */ j({
  __name: "ModalNewFile",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = U(l.path), m = b(""), u = b(""), v = () => {
      m.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          name: m.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", m.value) });
        },
        onError: (c) => {
          u.value = s(c.message);
        }
      });
    };
    return (c, _) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, h(t(s)("Create")), 1),
        o("button", {
          type: "button",
          onClick: _[2] || (_[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(s)("Cancel")), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(wt),
            title: t(s)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", ir, [
            o("div", dr, [
              o("p", cr, h(t(s)("Create a new file")), 1),
              ae(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => m.value = d),
                onKeyup: Le(v, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(s)("File Name"),
                type: "text"
              }, null, 40, ur), [
                [Re, m.value]
              ]),
              u.value.length ? (i(), I(t(u), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => u.value = ""),
                error: ""
              }, {
                default: G(() => [
                  P(h(u.value), 1)
                ]),
                _: 1
              })) : $("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ve = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function _r() {
  const n = Y("ServiceContainer"), { t: e } = n.i18n, s = n.fs, l = n.config, r = b({ QUEUE_ENTRY_STATUS: ve }), m = b(null), u = b(null), v = b(null), c = b(null), _ = b(null), d = b(null), a = b([]), p = b(""), g = b(!1), T = b(!1);
  let x;
  const S = (O) => a.value.findIndex((ie) => ie.id === O), k = (O, ie) => x.addFile({ name: ie || O.name, type: O.type, data: O, source: "Local" }), C = (O) => O.status === ve.DONE ? "text-green-600" : O.status === ve.ERROR || O.status === ve.CANCELED ? "text-red-600" : "", F = (O) => O.status === ve.DONE ? "✓" : O.status === ve.ERROR || O.status === ve.CANCELED ? "!" : "...", z = () => c.value?.click(), J = () => n.modal.close(), oe = () => {
    if (g.value || !a.value.filter((O) => O.status !== ve.DONE).length) {
      g.value || (p.value = e("Please select file to upload first."));
      return;
    }
    p.value = "", x.retryAll(), x.upload();
  }, B = () => {
    x.cancelAll(), a.value.forEach((O) => {
      O.status !== ve.DONE && (O.status = ve.CANCELED, O.statusName = e("Canceled"));
    }), g.value = !1;
  }, L = (O) => {
    g.value || (x.removeFile(O.id), a.value.splice(S(O.id), 1));
  }, le = (O) => {
    if (!g.value)
      if (x.cancelAll(), O) {
        const ie = a.value.filter((V) => V.status !== ve.DONE);
        a.value = [], ie.forEach((V) => k(V.originalFile, V.name));
      } else
        a.value = [];
  };
  return ce(() => {
    x = new Kt({
      debug: n.debug,
      restrictions: { maxFileSize: nn(l.maxFileSize ?? "10mb") },
      locale: n.i18n.t("uppy"),
      onBeforeFileAdded: (V, y) => {
        if (y[V.id] != null) {
          const K = S(V.id);
          a.value[K]?.status === ve.PENDING && (p.value = x.i18n("noDuplicates", { fileName: V.name })), a.value = a.value.filter((W) => W.id !== V.id);
        }
        return a.value.push({
          id: V.id,
          name: V.name,
          size: n.filesize(V.size),
          status: ve.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: V.data
        }), !0;
      }
    }), x.use(jt, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), x.on("restriction-failed", (V, y) => {
      const E = a.value[S(V.id)];
      E && L(E), p.value = y.message;
    }), x.on("upload", () => {
      const V = n.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", storage: s.path.storage, path: s.path.path }
      });
      x.setMeta({ ...V.body });
      const y = x.getPlugin("XHRUpload");
      y && (y.opts.method = V.method, y.opts.endpoint = V.url + "?" + new URLSearchParams(V.params), y.opts.headers = V.headers), delete V.headers["Content-Type"], g.value = !0, a.value.forEach((E) => {
        E.status !== ve.DONE && (E.percent = null, E.status = ve.UPLOADING, E.statusName = e("Pending upload"));
      });
    }), x.on("upload-progress", (V, y) => {
      const E = y.bytesTotal ?? 1, K = Math.floor(y.bytesUploaded / E * 100), W = S(V.id);
      W !== -1 && a.value[W] && (a.value[W].percent = `${K}%`);
    }), x.on("upload-success", (V) => {
      const y = a.value[S(V.id)];
      y && (y.status = ve.DONE, y.statusName = e("Done"));
    }), x.on("upload-error", (V, y) => {
      const E = a.value[S(V.id)];
      E && (E.percent = null, E.status = ve.ERROR, E.statusName = y?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : y?.message || e("Unknown Error"));
    }), x.on("error", (V) => {
      p.value = V.message, g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), x.on("complete", () => {
      g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), c.value?.addEventListener("click", () => u.value?.click()), _.value?.addEventListener("click", () => v.value?.click()), d.value?.addEventListener("dragover", (V) => {
      V.preventDefault(), T.value = !0;
    }), d.value?.addEventListener("dragleave", (V) => {
      V.preventDefault(), T.value = !1;
    });
    const O = (V, y) => {
      y.isFile && y.file((E) => V(y, E)), y.isDirectory && y.createReader().readEntries((E) => E.forEach((K) => O(V, K)));
    };
    d.value?.addEventListener("drop", (V) => {
      V.preventDefault(), T.value = !1;
      const y = /^[/\\](.+)/, E = V.dataTransfer?.items;
      E && Array.from(E).forEach((K) => {
        K.kind === "file" && O((W, Q) => {
          const Z = y.exec(W.fullPath);
          k(Q, Z ? Z[1] : Q.name);
        }, K.webkitGetAsEntry());
      });
    });
    const ie = (V) => {
      const y = V.target, E = y.files;
      if (E) {
        for (const K of E) k(K);
        y.value = "";
      }
    };
    u.value?.addEventListener("change", ie), v.value?.addEventListener("change", ie);
  }), {
    container: m,
    internalFileInput: u,
    internalFolderInput: v,
    pickFiles: c,
    pickFolders: _,
    dropArea: d,
    queue: a,
    message: p,
    uploading: g,
    hasFilesInDropArea: T,
    definitions: r,
    openFileSelector: z,
    upload: oe,
    cancel: B,
    remove: L,
    clear: le,
    close: J,
    getClassNameForEntry: C,
    getIconForEntry: F
  };
}
function We(n, e = 14) {
  const s = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(s), "$2..$4");
}
const mr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function fr(n, e) {
  return i(), f("svg", mr, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const bt = { render: fr }, pr = { class: "vuefinder__upload-modal__content" }, hr = {
  key: 0,
  class: "pointer-events-none"
}, gr = {
  key: 1,
  class: "pointer-events-none"
}, wr = ["disabled"], br = ["disabled"], yr = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, kr = ["textContent"], xr = { class: "vuefinder__upload-modal__file-info" }, Sr = { class: "vuefinder__upload-modal__file-name hidden md:block" }, $r = { class: "vuefinder__upload-modal__file-name md:hidden" }, Cr = {
  key: 0,
  class: "ml-auto"
}, Er = ["title", "disabled", "onClick"], Mr = {
  key: 0,
  class: "py-2"
}, Tr = ["disabled"], Ar = /* @__PURE__ */ j({
  __name: "ModalUpload",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, {
      container: l,
      internalFileInput: r,
      internalFolderInput: m,
      pickFiles: u,
      pickFolders: v,
      dropArea: c,
      queue: _,
      message: d,
      uploading: a,
      hasFilesInDropArea: p,
      definitions: g,
      openFileSelector: T,
      upload: x,
      cancel: S,
      remove: k,
      clear: C,
      close: F,
      getClassNameForEntry: z,
      getIconForEntry: J
    } = _r();
    return (oe, B) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: t(a),
          onClick: B[4] || (B[4] = we(
            //@ts-ignore
            (...L) => t(x) && t(x)(...L),
            ["prevent"]
          ))
        }, h(t(s)("Upload")), 9, Tr),
        t(a) ? (i(), f("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: B[5] || (B[5] = we(
            //@ts-ignore
            (...L) => t(S) && t(S)(...L),
            ["prevent"]
          ))
        }, h(t(s)("Cancel")), 1)) : (i(), f("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: B[6] || (B[6] = we(
            //@ts-ignore
            (...L) => t(F) && t(F)(...L),
            ["prevent"]
          ))
        }, h(t(s)("Close")), 1))
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(bt),
            title: t(s)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", pr, [
            o("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: c,
              onClick: B[0] || (B[0] = //@ts-ignore
              (...L) => t(T) && t(T)(...L))
            }, [
              t(p) ? (i(), f("div", hr, h(t(s)("Release to drop these files.")), 1)) : (i(), f("div", gr, h(t(s)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            o("div", {
              ref_key: "container",
              ref: l,
              class: "vuefinder__upload-modal__buttons"
            }, [
              o("button", {
                ref_key: "pickFiles",
                ref: u,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, h(t(s)("Select Files")), 513),
              o("button", {
                ref_key: "pickFolders",
                ref: v,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, h(t(s)("Select Folders")), 513),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(a),
                onClick: B[1] || (B[1] = (L) => t(C)(!1))
              }, h(t(s)("Clear all")), 9, wr),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(a),
                onClick: B[2] || (B[2] = (L) => t(C)(!0))
              }, h(t(s)("Clear only successful")), 9, br)
            ], 512),
            o("div", yr, [
              (i(!0), f(ne, null, re(t(_), (L) => (i(), f("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: L.id
              }, [
                o("span", {
                  class: X(["vuefinder__upload-modal__file-icon", t(z)(L)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: h(t(J)(L))
                  }, null, 8, kr)
                ], 2),
                o("div", xr, [
                  o("div", Sr, h(t(We)(L.name, 40)) + " (" + h(L.size) + ") ", 1),
                  o("div", $r, h(t(We)(L.name, 16)) + " (" + h(L.size) + ") ", 1),
                  o("div", {
                    class: X(["vuefinder__upload-modal__file-status", t(z)(L)])
                  }, [
                    P(h(L.statusName) + " ", 1),
                    L.status === t(g).QUEUE_ENTRY_STATUS.UPLOADING ? (i(), f("b", Cr, h(L.percent), 1)) : $("", !0)
                  ], 2)
                ]),
                o("button", {
                  type: "button",
                  class: X(["vuefinder__upload-modal__file-remove", t(a) ? "disabled" : ""]),
                  title: t(s)("Delete"),
                  disabled: t(a),
                  onClick: (le) => t(k)(L)
                }, [...B[7] || (B[7] = [
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
                ])], 10, Er)
              ]))), 128)),
              t(_).length ? $("", !0) : (i(), f("div", Mr, h(t(s)("No files selected!")), 1))
            ]),
            t(d).length ? (i(), I(_t, {
              key: 0,
              onHidden: B[3] || (B[3] = (L) => d.value = ""),
              error: ""
            }, {
              default: G(() => [
                P(h(t(d)), 1)
              ]),
              _: 1
            })) : $("", !0)
          ])
        ]),
        o("input", {
          ref_key: "internalFileInput",
          ref: r,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        o("input", {
          ref_key: "internalFolderInput",
          ref: m,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}), Dr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ir(n, e) {
  return i(), f("svg", Dr, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const yt = { render: Ir }, Fr = { class: "vuefinder__unarchive-modal__content" }, Vr = { class: "vuefinder__unarchive-modal__items" }, Lr = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Rr = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Br = { class: "vuefinder__unarchive-modal__item-name" }, Hr = { class: "vuefinder__unarchive-modal__info" }, kt = /* @__PURE__ */ j({
  __name: "ModalUnarchive",
  setup(n) {
    const e = Y("ServiceContainer"), s = e.fs, l = U(s.path), { t: r } = e.i18n, m = b(e.modal.data.items[0]), u = b(""), v = b([]), c = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          storage: l.value.storage,
          path: l.value.path
        },
        body: {
          item: m.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: r("The file unarchived.") });
        },
        onError: (_) => {
          u.value = r(_.message);
        }
      });
    };
    return (_, d) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, h(t(r)("Unarchive")), 1),
        o("button", {
          type: "button",
          onClick: d[1] || (d[1] = (a) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(r)("Cancel")), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(yt),
            title: t(r)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", Fr, [
            o("div", Vr, [
              (i(!0), f(ne, null, re(v.value, (a) => (i(), f("p", {
                class: "vuefinder__unarchive-modal__item",
                key: a.path
              }, [
                a.type === "dir" ? (i(), f("svg", Lr, [...d[2] || (d[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (i(), f("svg", Rr, [...d[3] || (d[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Br, h(a.basename), 1)
              ]))), 128)),
              o("p", Hr, h(t(r)("The archive will be unarchived at")) + " (" + h(t(s).path.path) + ")", 1),
              u.value.length ? (i(), I(t(u), {
                key: 0,
                onHidden: d[0] || (d[0] = (a) => u.value = ""),
                error: ""
              }, {
                default: G(() => [
                  P(h(u.value), 1)
                ]),
                _: 1
              })) : $("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), qr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Nr(n, e) {
  return i(), f("svg", qr, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const xt = { render: Nr }, Pr = { class: "vuefinder__archive-modal__content" }, zr = { class: "vuefinder__archive-modal__form" }, Ur = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Or = { class: "vuefinder__archive-modal__file" }, Kr = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jr = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gr = { class: "vuefinder__archive-modal__file-name" }, Yr = ["placeholder"], St = /* @__PURE__ */ j({
  __name: "ModalArchive",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = U(l.path), m = b(""), u = b(""), v = b(e.modal.data.items), c = () => {
      v.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: v.value.map(({ path: _, type: d }) => ({ path: _, type: d })),
          name: m.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file(s) archived.") });
        },
        onError: (_) => {
          u.value = s(_.message);
        }
      });
    };
    return (_, d) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, h(t(s)("Archive")), 1),
        o("button", {
          type: "button",
          onClick: d[2] || (d[2] = (a) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(s)("Cancel")), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(xt),
            title: t(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", Pr, [
            o("div", zr, [
              o("div", Ur, [
                (i(!0), f(ne, null, re(v.value, (a) => (i(), f("p", Or, [
                  a.type === "dir" ? (i(), f("svg", Kr, [...d[3] || (d[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (i(), f("svg", jr, [...d[4] || (d[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Gr, h(a.basename), 1)
                ]))), 256))
              ]),
              ae(o("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => m.value = a),
                onKeyup: Le(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Yr), [
                [Re, m.value]
              ]),
              u.value.length ? (i(), I(t(u), {
                key: 0,
                onHidden: d[1] || (d[1] = (a) => u.value = ""),
                error: ""
              }, {
                default: G(() => [
                  P(h(u.value), 1)
                ]),
                _: 1
              })) : $("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Wr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Qr(n, e) {
  return i(), f("svg", Wr, [...e[0] || (e[0] = [
    o("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    o("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const et = { render: Qr }, Xr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Jr(n, e) {
  return i(), f("svg", Xr, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Zr = { render: Jr }, el = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function tl(n, e) {
  return i(), f("svg", el, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
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
  return i(), f("svg", ol, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const rl = { render: sl }, ll = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function al(n, e) {
  return i(), f("svg", ll, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const il = { render: al }, dl = { class: "vuefinder__toolbar" }, cl = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, ul = ["title"], vl = ["title"], _l = ["title"], ml = ["title"], fl = ["title"], pl = ["title"], hl = ["title"], gl = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, wl = { class: "pl-2" }, bl = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, yl = { class: "vuefinder__toolbar__controls" }, kl = ["title"], xl = ["title"], Sl = /* @__PURE__ */ j({
  __name: "Toolbar",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = e.config, m = e.search, u = U(r.state), v = U(m.state), c = U(l.selectedItems);
    de(() => u.value.fullScreen, () => {
      if (u.value.fullScreen) {
        const d = document.querySelector("body");
        d && (d.style.overflow = "hidden");
      } else {
        const d = document.querySelector("body");
        d && (d.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const _ = () => {
      r.set("view", u.value.view === "list" ? "grid" : "list");
    };
    return (d, a) => (i(), f("div", dl, [
      t(v).query.length ? (i(), f("div", gl, [
        o("div", wl, [
          P(h(t(s)("Search results for")) + " ", 1),
          o("span", bl, h(t(v).query), 1)
        ]),
        t(r).get("loadingIndicator") === "circular" && t(l).isLoading() ? (i(), I(t(et), { key: 0 })) : $("", !0)
      ])) : (i(), f("div", cl, [
        t(e).features.includes(t(ee).NEW_FOLDER) ? (i(), f("div", {
          key: 0,
          class: "mx-1.5",
          title: t(s)("New Folder"),
          onClick: a[0] || (a[0] = (p) => t(e).modal.open(gt, { items: t(c) }))
        }, [
          D(t(ht))
        ], 8, ul)) : $("", !0),
        t(e).features.includes(t(ee).NEW_FILE) ? (i(), f("div", {
          key: 1,
          class: "mx-1.5",
          title: t(s)("New File"),
          onClick: a[1] || (a[1] = (p) => t(e).modal.open(vr, { items: t(c) }))
        }, [
          D(t(wt))
        ], 8, vl)) : $("", !0),
        t(e).features.includes(t(ee).RENAME) ? (i(), f("div", {
          key: 2,
          class: "mx-1.5",
          title: t(s)("Rename"),
          onClick: a[2] || (a[2] = (p) => t(c).length !== 1 || t(e).modal.open(Ze, { items: t(c) }))
        }, [
          D(t(vt), {
            class: X(t(c).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, _l)) : $("", !0),
        t(e).features.includes(t(ee).DELETE) ? (i(), f("div", {
          key: 3,
          class: "mx-1.5",
          title: t(s)("Delete"),
          onClick: a[3] || (a[3] = (p) => !t(c).length || t(e).modal.open(Je, { items: t(c) }))
        }, [
          D(t(ut), {
            class: X(t(c).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ml)) : $("", !0),
        t(e).features.includes(t(ee).UPLOAD) ? (i(), f("div", {
          key: 4,
          class: "mx-1.5",
          title: t(s)("Upload"),
          onClick: a[4] || (a[4] = (p) => t(e).modal.open(Ar, { items: t(c) }))
        }, [
          D(t(bt))
        ], 8, fl)) : $("", !0),
        t(e).features.includes(t(ee).UNARCHIVE) && t(c).length === 1 && t(c)[0].mime_type === "application/zip" ? (i(), f("div", {
          key: 5,
          class: "mx-1.5",
          title: t(s)("Unarchive"),
          onClick: a[5] || (a[5] = (p) => !t(c).length || t(e).modal.open(kt, { items: t(c) }))
        }, [
          D(t(yt), {
            class: X(t(c).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, pl)) : $("", !0),
        t(e).features.includes(t(ee).ARCHIVE) ? (i(), f("div", {
          key: 6,
          class: "mx-1.5",
          title: t(s)("Archive"),
          onClick: a[6] || (a[6] = (p) => !t(c).length || t(e).modal.open(St, { items: t(c) }))
        }, [
          D(t(xt), {
            class: X(t(c).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, hl)) : $("", !0)
      ])),
      o("div", yl, [
        t(e).features.includes(t(ee).FULL_SCREEN) ? (i(), f("div", {
          key: 0,
          onClick: a[7] || (a[7] = (p) => t(r).toggle("fullScreen")),
          class: "mx-1.5",
          title: t(s)("Toggle Full Screen")
        }, [
          t(u).fullScreen ? (i(), I(t(nl), { key: 0 })) : (i(), I(t(Zr), { key: 1 }))
        ], 8, kl)) : $("", !0),
        o("div", {
          class: "mx-1.5",
          title: t(s)("Change View"),
          onClick: a[8] || (a[8] = (p) => t(v).query.length || _())
        }, [
          t(u).view === "grid" ? (i(), I(t(rl), {
            key: 0,
            class: X(["vf-toolbar-icon", t(v).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : $("", !0),
          t(u).view === "list" ? (i(), I(t(il), {
            key: 1,
            class: X(["vf-toolbar-icon", t(v).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : $("", !0)
        ], 8, xl)
      ])
    ]));
  }
}), $l = (n, e = 0, s = !1) => {
  let l;
  return (...r) => {
    s && !l && n(...r), clearTimeout(l), l = setTimeout(() => {
      n(...r);
    }, e);
  };
}, ot = (n, e, s) => {
  const l = b(n);
  return It((r, m) => ({
    get() {
      return r(), l.value;
    },
    set: $l((u) => {
      l.value = u, m();
    }, e, !1)
  }));
}, Cl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function El(n, e) {
  return i(), f("svg", Cl, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Ml = { render: El }, Tl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Al(n, e) {
  return i(), f("svg", Tl, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Dl = { render: Al }, Il = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Fl(n, e) {
  return i(), f("svg", Il, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Vl = { render: Fl }, Ll = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function Rl(n, e) {
  return i(), f("svg", Ll, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Bl = { render: Rl }, Hl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function ql(n, e) {
  return i(), f("svg", Hl, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Nl = { render: ql }, Pl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function zl(n, e) {
  return i(), f("svg", Pl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ul = { render: zl }, Ol = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function Kl(n, e) {
  return i(), f("svg", Ol, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ue = { render: Kl }, jl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Gl(n, e) {
  return i(), f("svg", jl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Yl = { render: Gl }, Wl = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function Ql(n, e) {
  return i(), f("svg", Wl, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Xl = { render: Ql };
function Jl(n) {
  const [e, s] = Zl(n);
  if (!s || s === "/") return e + "://";
  const l = s.replace(/\/+$/, ""), r = l.lastIndexOf("/");
  return r === 0 ? e + "://" : e + ":/" + l.slice(0, r);
}
function Zl(n) {
  const e = n.indexOf(":/");
  return e === -1 ? [void 0, n] : [n.slice(0, e), n.slice(e + 2) || "/"];
}
function qe(n, e = []) {
  const s = "vfDragEnterCounter", l = n.fs, r = U(l.selectedItems);
  function m(d, a) {
    d.preventDefault(), l.getDraggedItem() === a.path || !a || a.type !== "dir" || r.value.some((g) => g.path === a.path || Jl(g.path) === a.path) ? d.dataTransfer && (d.dataTransfer.dropEffect = "none", d.dataTransfer.effectAllowed = "none") : (d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.dataTransfer.effectAllowed = "all"), d.currentTarget.classList.add(...e));
  }
  function u(d) {
    d.preventDefault();
    const a = d.currentTarget, p = Number(a.dataset[s] || 0);
    a.dataset[s] = String(p + 1);
  }
  function v(d) {
    d.preventDefault();
    const a = d.currentTarget, g = Number(a.dataset[s] || 0) - 1;
    g <= 0 ? (delete a.dataset[s], a.classList.remove(...e)) : a.dataset[s] = String(g);
  }
  function c(d, a) {
    if (!a) return;
    d.preventDefault();
    const p = d.currentTarget;
    delete p.dataset[s], p.classList.remove(...e);
    const g = d.dataTransfer?.getData("items") || "[]", x = JSON.parse(g).map((S) => l.sortedFiles.get().find((k) => k.path === S));
    l.clearDraggedItem(), n.modal.open(pt, { items: { from: x, to: a } });
  }
  function _(d) {
    return {
      dragover: (a) => m(a, d),
      dragenter: u,
      dragleave: v,
      drop: (a) => c(a, d)
    };
  }
  return { events: _ };
}
const ea = { class: "vuefinder__breadcrumb__container" }, ta = ["title"], na = ["title"], oa = ["title"], sa = ["title"], ra = { class: "vuefinder__breadcrumb__list" }, la = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, aa = { class: "relative" }, ia = ["title", "onClick"], da = { class: "vuefinder__breadcrumb__search-mode" }, ca = ["placeholder"], ua = ["onClick"], va = { class: "vuefinder__breadcrumb__hidden-item-content" }, _a = { class: "vuefinder__breadcrumb__hidden-item-text" }, ma = /* @__PURE__ */ j({
  __name: "Breadcrumb",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.search, r = e.fs, m = e.config, u = U(m.state), v = U(l.state), c = U(r.path), _ = U(r.loading), d = se(() => v.value?.searchMode ?? !1), a = b(null), p = ot(0, 100), g = b(5), T = b(!1), x = se(() => c.value?.breadcrumb ?? []);
    function S(R, H) {
      return R.length > H ? [R.slice(-H), R.slice(0, -H)] : [R, []];
    }
    const k = se(() => S(x.value, g.value)[0]), C = se(() => S(x.value, g.value)[1]);
    de(p, () => {
      if (!a.value) return;
      const R = a.value.children;
      let H = 0, w = 0;
      const M = 5, te = 1;
      g.value = M, Ve(() => {
        for (let ue = R.length - 1; ue >= 0; ue--) {
          const Se = R[ue];
          if (H + Se.offsetWidth > p.value - 40)
            break;
          H += parseInt(Se.offsetWidth.toString(), 10), w++;
        }
        w < te && (w = te), w > M && (w = M), g.value = w;
      });
    });
    const F = () => {
      a.value && (p.value = a.value.offsetWidth);
    }, z = b(null);
    ce(() => {
      z.value = new ResizeObserver(F), a.value && z.value.observe(a.value);
    }), He(() => {
      z.value && z.value.disconnect();
    });
    const J = qe(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function oe(R = null) {
      R ??= x.value.length - 2;
      const H = {
        basename: c.value?.storage ?? "local",
        extension: "",
        path: (c.value?.storage ?? "local") + "://",
        storage: c.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return x.value[R] ?? H;
    }
    const B = () => {
      W(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: c.value?.storage, path: c.value?.path } });
    }, L = () => {
      l.exitSearchMode(), k.value.length > 0 && !d.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: c.value?.storage ?? "local",
          path: x.value[x.value.length - 2]?.path ?? (c.value?.storage ?? "local") + "://"
        }
      });
    }, le = (R) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: c.value?.storage, path: R.path } }), T.value = !1;
    }, O = () => {
      T.value && (T.value = !1);
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
      m.toggle("showTreeView");
    }, y = b(null), E = ot("", 400);
    de(E, (R) => {
      e.emitter.emit("vf-toast-clear"), l.setQuery(R);
    }), de(d, (R) => {
      R && Ve(() => {
        y.value && y.value.focus();
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
      T.value = !T.value;
    };
    return (R, H) => (i(), f("div", ea, [
      o("span", {
        title: t(s)("Toggle Tree View")
      }, [
        D(t(Yl), {
          onClick: V,
          class: X(["vuefinder__breadcrumb__toggle-tree", t(u).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, ta),
      o("span", {
        title: t(s)("Go up a directory")
      }, [
        D(t(Dl), ke(Ee(x.value.length && !d.value ? t(J).events(oe()) : {}), {
          onClick: L,
          class: x.value.length && !d.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, na),
      t(r).isLoading() ? (i(), f("span", {
        key: 1,
        title: t(s)("Cancel")
      }, [
        D(t(Vl), {
          onClick: H[0] || (H[0] = (w) => t(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, sa)) : (i(), f("span", {
        key: 0,
        title: t(s)("Refresh")
      }, [
        D(t(Ml), { onClick: B })
      ], 8, oa)),
      ae(o("div", {
        class: "group vuefinder__breadcrumb__search-container",
        onClick: H[3] || (H[3] = //@ts-ignore
        (...w) => t(l).enterSearchMode && t(l).enterSearchMode(...w))
      }, [
        o("div", null, [
          D(t(Bl), ke(Ee(t(J).events(oe(-1))), {
            onClick: H[1] || (H[1] = we((w) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(c).value?.storage ?? "local" } }), ["stop"]))
          }), null, 16)
        ]),
        o("div", ra, [
          C.value.length ? ae((i(), f("div", la, [
            H[5] || (H[5] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", aa, [
              o("span", {
                onDragenter: H[2] || (H[2] = (w) => T.value = !0),
                onClick: Z,
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                D(t(Xl), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [ie, O]
          ]) : $("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: a,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (i(!0), f(ne, null, re(k.value, (w, M) => (i(), f("div", { key: M }, [
            H[6] || (H[6] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", ke(Ee(t(J).events(w), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: w.basename,
              onClick: we((te) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(c)?.storage, path: w.path } }), ["stop"])
            }), h(w.name), 17, ia)
          ]))), 128))
        ], 512),
        t(m).get("loadingIndicator") === "circular" && t(_) ? (i(), I(t(et), { key: 0 })) : $("", !0)
      ], 512), [
        [ge, !d.value]
      ]),
      ae(o("div", da, [
        o("div", null, [
          D(t(Nl))
        ]),
        ae(o("input", {
          ref_key: "searchInput",
          ref: y,
          onKeydown: Le(W, ["esc"]),
          onBlur: K,
          "onUpdate:modelValue": H[4] || (H[4] = (w) => Ft(E) ? E.value = w : null),
          placeholder: t(s)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, ca), [
          [Re, t(E)]
        ]),
        D(t(Ul), { onClick: W })
      ], 512), [
        [ge, d.value]
      ]),
      (i(), I(Vt, { to: "body" }, [
        ae(o("div", {
          style: Me({ position: "absolute", top: Q.value.y + "px", left: Q.value.x + "px" }),
          class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
        }, [
          (i(!0), f(ne, null, re(C.value, (w, M) => (i(), f("div", ke({ key: M }, Ee(t(J).events(w), !0), {
            onClick: (te) => le(w),
            class: "vuefinder__breadcrumb__hidden-item"
          }), [
            o("div", va, [
              o("span", null, [
                D(t(Ue), { class: "vuefinder__breadcrumb__hidden-item-icon" })
              ]),
              H[7] || (H[7] = P()),
              o("span", _a, h(w.name), 1)
            ])
          ], 16, ua))), 128))
        ], 4), [
          [ge, T.value]
        ])
      ]))
    ]));
  }
});
function fa(n, e) {
  const {
    scrollContainer: s,
    itemWidth: l = 100,
    rowHeight: r,
    overscan: m = 2,
    containerPadding: u = 48
  } = e, v = n && typeof n.get == "function" ? U(n) : n, c = () => typeof r == "number" ? r : r.value, _ = b(0), d = b(6), a = b(600);
  let p = null;
  const g = se(() => Math.ceil(v.value.length / d.value)), T = se(() => g.value * c()), x = se(() => {
    const B = c(), L = Math.max(0, Math.floor(_.value / B) - m), le = Math.min(g.value, Math.ceil((_.value + a.value) / B) + m);
    return { start: L, end: le };
  }), S = se(() => {
    const { start: B, end: L } = x.value;
    return Array.from({ length: L - B }, (le, O) => B + O);
  }), k = () => a.value, C = () => {
    if (s.value) {
      const B = s.value.clientWidth - u;
      d.value = Math.max(Math.floor(B / l), 2);
    }
  }, F = (B) => {
    const L = B.target;
    _.value = L.scrollTop;
  };
  de(() => v.value.length, () => {
    C();
  });
  const z = (B, L) => {
    const le = L * d.value;
    return B.slice(le, le + d.value);
  }, J = (B, L, le, O, ie) => {
    const V = [];
    for (let y = L; y <= le; y++)
      for (let E = O; E <= ie; E++) {
        const K = y * d.value + E;
        K < B.length && B[K] && V.push(B[K]);
      }
    return V;
  }, oe = (B) => ({
    row: Math.floor(B / d.value),
    col: B % d.value
  });
  return ce(async () => {
    await Ve(), s.value && (a.value = s.value.clientHeight || 600), C(), window.addEventListener("resize", () => {
      s.value && (a.value = s.value.clientHeight || 600), C();
    }), s.value && "ResizeObserver" in window && (p = new ResizeObserver((B) => {
      const L = B[0];
      L && (a.value = Math.round(L.contentRect.height)), C();
    }), p.observe(s.value));
  }), He(() => {
    window.removeEventListener("resize", C), p && (p.disconnect(), p = null);
  }), {
    scrollTop: _,
    itemsPerRow: d,
    totalRows: g,
    totalHeight: T,
    visibleRange: x,
    visibleRows: S,
    updateItemsPerRow: C,
    handleScroll: F,
    getRowItems: z,
    getItemsInRange: J,
    getItemPosition: oe,
    getContainerHeight: k
  };
}
function pa(n) {
  const { getItemPosition: e, getItemsInRange: s, getKey: l, selectionObject: r, rowHeight: m, itemWidth: u } = n, v = Math.floor(Math.random() * 2 ** 32).toString(), _ = Y("ServiceContainer").fs, d = U(_.selectedKeys), a = U(_.sortedFiles);
  U(_.selectedCount);
  const p = b(/* @__PURE__ */ new Set()), g = b(!1), T = b(!1), x = b(null), S = (y) => y.map((E) => E.getAttribute("data-key")).filter((E) => !!E), k = (y) => {
    y.selection.getSelection().forEach((E) => {
      y.selection.deselect(E, !0);
    });
  }, C = (y) => {
    d.value && d.value.forEach((E) => {
      const K = document.querySelector(`[data-key="${E}"]`);
      K && y.selection.select(K, !0);
    });
  }, F = (y) => {
    if (y.size === 0) return null;
    const K = Array.from(y).map((H) => {
      const w = a.value?.findIndex((M) => l(M) === H) ?? -1;
      return e(w >= 0 ? w : 0);
    }), W = Math.min(...K.map((H) => H.row)), Q = Math.max(...K.map((H) => H.row)), Z = Math.min(...K.map((H) => H.col)), R = Math.max(...K.map((H) => H.col));
    return { minRow: W, maxRow: Q, minCol: Z, maxCol: R };
  }, z = (y) => {
    g.value = !1, !y.event?.metaKey && !y.event?.ctrlKey && (T.value = !0), y.selection.resolveSelectables(), k(y), C(y);
  }, J = ({ event: y, selection: E }) => {
    const K = y;
    K && "type" in K && K.type === "touchend" && K.preventDefault();
    const W = y;
    if (!W?.ctrlKey && !W?.metaKey && (_.clearSelection(), E.clearSelection(!0, !0)), p.value.clear(), W && r.value) {
      const Q = r.value.getSelectables()[0]?.closest(".scroller-" + v);
      if (Q) {
        const Z = Q.getBoundingClientRect(), R = W.clientY - Z.top + Q.scrollTop, H = W.clientX - Z.left, w = Math.floor(R / m.value), M = Math.floor(H / u);
        x.value = { row: w, col: M };
      }
    }
  }, oe = (y) => {
    const E = y.selection, K = S(y.store.changed.added), W = S(y.store.changed.removed);
    T.value = !1, g.value = !0, K.forEach((Q) => {
      d.value && !d.value.has(Q) && p.value.add(Q), _.select(Q);
    }), W.forEach((Q) => {
      document.querySelector(`[data-key="${Q}"]`) && a.value?.find((R) => l(R) === Q) && p.value.delete(Q), _.deselect(Q);
    }), E.resolveSelectables(), C(y);
  }, B = () => {
    p.value.clear();
  }, L = (y) => {
    if (y.event && x.value && p.value.size > 0) {
      const K = Array.from(p.value).map((W) => {
        const Q = a.value?.findIndex((Z) => l(Z) === W) ?? -1;
        return Q >= 0 ? e(Q) : null;
      }).filter((W) => W !== null);
      if (K.length > 0) {
        const W = [...K, x.value], Q = {
          minRow: Math.min(...W.map((Z) => Z.row)),
          maxRow: Math.max(...W.map((Z) => Z.row)),
          minCol: Math.min(...W.map((Z) => Z.col)),
          maxCol: Math.max(...W.map((Z) => Z.col))
        };
        s(a.value || [], Q.minRow, Q.maxRow, Q.minCol, Q.maxCol).forEach(
          (Z) => {
            const R = l(Z);
            document.querySelector(`[data-key="${R}"]`) || _.select(R);
          }
        );
      }
    }
  }, le = (y) => {
    L(y), k(y), C(y), _.setSelectedCount(d.value?.size || 0), g.value = !1, x.value = null;
  }, O = () => {
    r.value = new Gt({
      selectables: [".file-item-" + v],
      boundaries: [".scroller-" + v],
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
    }), r.value.on("beforestart", z), r.value.on("start", J), r.value.on("move", oe), r.value.on("stop", le);
  }, ie = () => {
    r.value && (r.value.destroy(), r.value = null);
  }, V = (y) => {
    T.value && (r.value?.clearSelection(), B(), T.value = !1);
    const E = y;
    !p.value.size && !T.value && !E?.ctrlKey && !E?.metaKey && (_.clearSelection(), r.value?.clearSelection());
  };
  return ce(() => {
    const y = (E) => {
      !E.buttons && g.value && (g.value = !1);
    };
    document.addEventListener("dragleave", y), He(() => {
      document.removeEventListener("dragleave", y);
    });
  }), {
    isDragging: g,
    selectionStarted: T,
    explorerId: v,
    extractIds: S,
    cleanupSelection: k,
    refreshSelection: C,
    getSelectionRange: F,
    selectSelectionRange: L,
    initializeSelectionArea: O,
    destroySelectionArea: ie,
    handleContentClick: V
  };
}
const ha = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function ga(n, e) {
  return i(), f("svg", ha, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const wa = { render: ga }, ba = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function ya(n, e) {
  return i(), f("svg", ba, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const ka = { render: ya }, Ne = /* @__PURE__ */ j({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, s) => (i(), f("div", null, [
      n.direction === "asc" ? (i(), I(t(wa), { key: 0 })) : $("", !0),
      n.direction === "desc" ? (i(), I(t(ka), { key: 1 })) : $("", !0)
    ]));
  }
}), xa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function Sa(n, e) {
  return i(), f("svg", xa, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const $a = { render: Sa }, Ca = { class: "vuefinder__drag-item__container" }, Ea = { class: "vuefinder__drag-item__count" }, Ma = /* @__PURE__ */ j({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (s, l) => (i(), f("div", Ca, [
      D(t($a)),
      o("div", Ea, h(e.count), 1)
    ]));
  }
}), Ta = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Aa(n, e) {
  return i(), f("svg", Ta, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Da = { render: Aa }, Ia = {
  key: 3,
  class: "vuefinder__item-icon__extension"
}, st = /* @__PURE__ */ j({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(n) {
    const e = n, s = Y("ServiceContainer"), l = s.customIcon?.(s, e.item);
    return (r, m) => (i(), f("div", {
      class: X(["vuefinder__item-icon", n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      t(l) ? (i(), I(Qe(t(l).is), Lt(ke({ key: 0 }, t(l).props || {})), null, 16)) : n.item.type === "dir" ? (i(), I(t(Ue), { key: 1 })) : (i(), I(t(Da), { key: 2 })),
      !t(l) && n.ext && n.item.type !== "dir" && n.item.extension ? (i(), f("div", Ia, h(n.item.extension.substring(0, 3)), 1)) : $("", !0)
    ], 2));
  }
}), Fa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Va(n, e) {
  return i(), f("svg", Fa, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const $t = { render: Va }, La = ["data-key", "data-row", "data-col", "draggable"], Ra = { key: 0 }, Ba = { class: "vuefinder__explorer__item-grid-content" }, Ha = ["data-src", "alt"], qa = { class: "vuefinder__explorer__item-title" }, Na = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Pa = { class: "vuefinder__explorer__item-list-name" }, za = { class: "vuefinder__explorer__item-list-icon" }, Ua = { class: "vuefinder__explorer__item-name" }, Oa = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Ka = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, ja = { key: 0 }, Ga = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Ya = /* @__PURE__ */ j({
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
    const s = n, l = e, r = Y("ServiceContainer"), m = r.fs, u = r.config, v = se(() => [
      "file-item-" + s.explorerId,
      s.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      s.isSelected ? "vf-explorer-selected" : ""
    ]), c = se(() => ({
      opacity: s.isDragging || m.isCut(s.item.path) ? 0.5 : ""
    }));
    let _ = null;
    const d = b(null);
    let a = !1;
    const p = () => {
      _ && clearTimeout(_), g.value = !0;
    }, g = b(!0), T = (x) => {
      if (g.value = !1, _ && (x.preventDefault(), clearTimeout(_)), !a)
        a = !0, l("click", x), d.value = setTimeout(() => a = !1, 300);
      else
        return a = !1, l("dblclick", x), _ && clearTimeout(_), !1;
      if (x.currentTarget && x.currentTarget instanceof HTMLElement) {
        const S = x.currentTarget.getBoundingClientRect();
        x.preventDefault(), _ = setTimeout(() => {
          let F = S.y + S.height;
          F + 146 > window.innerHeight - 10 && (F = S.y - 146), F < 10 && (F = 10);
          const z = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: S.x,
            clientY: F
          });
          x.target?.dispatchEvent(z);
        }, 300);
      }
    };
    return (x, S) => (i(), f("div", {
      class: X(v.value),
      style: Me(c.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: g.value,
      onTouchstart: S[1] || (S[1] = (k) => T(k)),
      onTouchend: S[2] || (S[2] = (k) => p()),
      onClick: S[3] || (S[3] = (k) => l("click", k)),
      onDblclick: S[4] || (S[4] = (k) => l("dblclick", k)),
      onContextmenu: S[5] || (S[5] = we((k) => l("contextmenu", k), ["prevent", "stop"])),
      onDragstart: S[6] || (S[6] = (k) => l("dragstart", k)),
      onDragend: S[7] || (S[7] = (k) => l("dragend", k))
    }, [
      n.view === "grid" ? (i(), f("div", Ra, [
        o("div", Ba, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (i(), f("img", {
            key: 0,
            onTouchstart: S[0] || (S[0] = (k) => k.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": t(r).requester.getPreviewUrl(n.item.storage, n.item),
            alt: n.item.basename
          }, null, 40, Ha)) : (i(), I(st, {
            key: 1,
            item: n.item,
            ext: !0
          }, null, 8, ["item"]))
        ]),
        o("span", qa, h(t(We)(n.item.basename)), 1)
      ])) : (i(), f("div", Na, [
        o("div", Pa, [
          o("div", za, [
            D(st, {
              item: n.item,
              small: n.compact
            }, null, 8, ["item", "small"])
          ]),
          o("span", Ua, h(n.item.basename), 1)
        ]),
        n.showPath ? (i(), f("div", Oa, h(n.item.path), 1)) : $("", !0),
        n.showPath ? $("", !0) : (i(), f("div", Ka, [
          n.item.file_size ? (i(), f("div", ja, h(t(r).filesize(n.item.file_size)), 1)) : $("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (i(), f("div", Ga, h(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : $("", !0)
      ])),
      t(u).get("pinnedFolders").find((k) => k.path === n.item.path) ? (i(), I(t($t), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : $("", !0)
    ], 46, La));
  }
}), Wa = ["data-row"], Ge = /* @__PURE__ */ j({
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
    const s = n, l = e, r = se(() => [
      s.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), m = se(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${s.rowHeight}px`,
      transform: `translateY(${s.rowIndex * s.rowHeight}px)`
    })), u = se(() => s.view === "grid" ? {
      gridTemplateColumns: `repeat(${s.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (v, c) => (i(), f("div", {
      class: X(r.value),
      "data-row": n.rowIndex,
      style: Me(m.value)
    }, [
      o("div", {
        class: X(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Me(u.value)
      }, [
        (i(!0), f(ne, null, re(n.items, (_, d) => (i(), I(Ya, ke({
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
          onClick: c[0] || (c[0] = (a) => l("click", a)),
          onDblclick: c[1] || (c[1] = (a) => l("dblclick", a)),
          onContextmenu: c[2] || (c[2] = (a) => l("contextmenu", a)),
          onDragstart: c[3] || (c[3] = (a) => l("dragstart", a)),
          onDragend: c[4] || (c[4] = (a) => l("dragend", a)),
          explorerId: n.explorerId
        }), null, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Wa));
  }
}), Qa = ["onClick"], Xa = /* @__PURE__ */ j({
  __name: "Toast",
  setup(n) {
    const e = Y("ServiceContainer"), { getStore: s } = e.storage, l = b(s("full-screen", !1)), r = b([]), m = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", u = (c) => {
      r.value.splice(c, 1);
    }, v = (c) => {
      let _ = r.value.findIndex((d) => d.id === c);
      _ !== -1 && u(_);
    };
    return e.emitter.on("vf-toast-clear", () => {
      r.value = [];
    }), e.emitter.on("vf-toast-push", (c) => {
      let _ = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      c.id = _, r.value.push(c), setTimeout(() => {
        v(_);
      }, 5e3);
    }), (c, _) => (i(), f("div", {
      class: X(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      D(Rt, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: G(() => [
          (i(!0), f(ne, null, re(r.value, (d, a) => (i(), f("div", {
            key: a,
            onClick: (p) => u(a),
            class: X(["vuefinder__toast__message", m(d.type)])
          }, h(d.label), 11, Qa))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Ja = { class: "vuefinder__explorer__container" }, Za = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, ei = {
  key: 0,
  class: "vuefinder__explorer__header"
}, ti = {
  key: 0,
  class: "vuefinder__linear-loader"
}, ni = {
  key: 1,
  class: "vuefinder__circular-loader"
}, oi = /* @__PURE__ */ j({
  __name: "Explorer",
  setup(n) {
    const e = Y("ServiceContainer"), s = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), l = Ie("dragImage"), r = rt(null), m = Ie("scrollContainer"), u = Ie("scrollContent"), v = e.search, c = e.fs, _ = e.config, d = U(_.state), a = U(v.state), p = U(c.sortedFiles), g = U(c.selectedKeys), T = U(c.loading), x = (A) => g.value?.has(A) ?? !1;
    let S = null;
    const k = b(null), C = Ie("customScrollBar"), F = Ie("customScrollBarContainer"), z = se(() => {
      const A = d.value.view, q = d.value.compactListView;
      return A === "grid" && !(a.value.searchMode && a.value.query.length) ? 88 : q ? 24 : 50;
    }), { t: J } = e.i18n, {
      itemsPerRow: oe,
      totalHeight: B,
      visibleRows: L,
      handleScroll: le,
      getRowItems: O,
      getItemsInRange: ie,
      getItemPosition: V,
      updateItemsPerRow: y
    } = fa(
      se(() => p.value ?? []),
      {
        scrollContainer: m,
        itemWidth: 104,
        rowHeight: z,
        overscan: 2,
        containerPadding: 0
      }
    ), {
      explorerId: E,
      isDragging: K,
      initializeSelectionArea: W,
      destroySelectionArea: Q,
      handleContentClick: Z
    } = pa({
      getItemPosition: V,
      getItemsInRange: ie,
      getKey: (A) => A.path,
      selectionObject: r,
      rowHeight: z,
      itemWidth: 104
    }), R = b(null), H = (A) => {
      if (!A || !R.value) return !1;
      const q = g.value?.has(R.value) ?? !1;
      return K.value && (q ? g.value?.has(A) ?? !1 : A === R.value);
    };
    de(() => _.get("view"), (A) => {
      A === "list" ? oe.value = 1 : y();
    }, { immediate: !0 }), de(oe, (A) => {
      _.get("view") === "list" && A !== 1 && (oe.value = 1);
    });
    const w = (A) => p.value?.[A];
    ce(() => {
      if (W(), r.value && r.value.on("beforestart", ({ event: A }) => {
        const q = A?.target === u.value;
        if (!A?.metaKey && !A?.ctrlKey && !A?.altKey && !q)
          return !1;
      }), m.value && (S = new Yt({
        elements_selector: ".lazy",
        container: m.value
      })), de(() => a.value.query, (A) => {
        const q = c.path.get().storage, N = c.path.get().path;
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
            k.value = q;
          },
          scroll: (q) => {
            const { scrollOffsetElement: N } = q.elements();
            m.value && m.value.scrollTo({ top: N.scrollTop, left: 0 });
          }
        });
        k.value = A;
      }
      m.value && m.value.addEventListener("scroll", () => {
        const A = k.value;
        if (!A) return;
        const { scrollOffsetElement: q } = A.elements();
        q.scrollTo({ top: m.value.scrollTop, left: 0 });
      });
    }), Bt(() => {
      if (S && S.update(), k.value && C.value && m.value) {
        const q = m.value.scrollHeight > m.value.clientHeight, N = C.value;
        N.style.display = q ? "block" : "none", N.style.height = `${B.value}px`;
      }
    }), He(() => {
      Q(), S && (S.destroy(), S = null), k.value && (k.value.destroy(), k.value = null);
    });
    const M = (A) => {
      const q = A.target?.closest(".file-item-" + E), N = A;
      if (!N?.ctrlKey && !N?.metaKey && (c.clearSelection(), r.value?.clearSelection(!0, !0)), q) {
        const me = String(q.getAttribute("data-key"));
        r.value?.resolveSelectables(), c.toggleSelect(me);
      }
      c.setSelectedCount(g.value?.size || 0);
    }, te = (A) => {
      const q = e.contextMenuItems.find((N) => N.show(e, {
        searchQuery: "",
        items: [A],
        target: A
      }));
      q && q.action(e, [A]);
    }, ue = (A) => {
      const q = A.target?.closest(".file-item-" + E), N = q ? String(q.getAttribute("data-key")) : null;
      if (!N) return;
      const me = p.value?.find((Oe) => Oe.path === N);
      me && te(me);
    }, Se = () => {
      const A = g.value;
      return p.value?.filter((q) => A?.has(q.path)) || [];
    }, Te = (A) => {
      A.preventDefault();
      const q = A.target?.closest(".file-item-" + E);
      if (q) {
        const N = String(q.getAttribute("data-key")), me = p.value?.find((Oe) => Oe.path === N);
        g.value?.has(N) || (c.clearSelection(), c.select(N)), e.emitter.emit("vf-contextmenu-show", { event: A, items: Se(), target: me });
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
        A.dataTransfer.setData("items", JSON.stringify(N)), c.setDraggedItem(R.value);
      }
    }, $e = () => {
      R.value = null;
    };
    return (A, q) => (i(), f("div", Ja, [
      o("div", {
        ref: "customScrollBarContainer",
        class: X(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(d).view === "grid" }, { "search-active": t(a).hasQuery }]])
      }, [
        o("div", Za, null, 512)
      ], 2),
      t(d).view === "list" || t(a).query.length ? (i(), f("div", ei, [
        o("div", {
          onClick: q[0] || (q[0] = (N) => t(c).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          P(h(t(J)("Name")) + " ", 1),
          ae(D(Ne, {
            direction: t(c).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(c).sort.active && t(c).sort.column === "basename"]
          ])
        ]),
        t(a).query.length ? $("", !0) : (i(), f("div", {
          key: 0,
          onClick: q[1] || (q[1] = (N) => t(c).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          P(h(t(J)("Size")) + " ", 1),
          ae(D(Ne, {
            direction: t(c).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(c).sort.active && t(c).sort.column === "file_size"]
          ])
        ])),
        t(a).query.length ? (i(), f("div", {
          key: 1,
          onClick: q[2] || (q[2] = (N) => t(c).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          P(h(t(J)("Filepath")) + " ", 1),
          ae(D(Ne, {
            direction: t(c).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(c).sort.active && t(c).sort.column === "path"]
          ])
        ])) : $("", !0),
        t(a).query.length ? $("", !0) : (i(), f("div", {
          key: 2,
          onClick: q[3] || (q[3] = (N) => t(c).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          P(h(t(J)("Date")) + " ", 1),
          ae(D(Ne, {
            direction: t(c).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(c).sort.active && t(c).sort.column === "last_modified"]
          ])
        ]))
      ])) : $("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: m,
        class: X(["vuefinder__explorer__selector-area", "scroller-" + t(E)]),
        onScroll: q[5] || (q[5] = //@ts-ignore
        (...N) => t(le) && t(le)(...N))
      }, [
        t(_).get("loadingIndicator") === "linear" && t(T) ? (i(), f("div", ti)) : $("", !0),
        t(_).get("loadingIndicator") === "circular" && t(T) ? (i(), f("div", ni)) : $("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: u,
          class: "scrollContent min-h-full",
          style: Me({ height: `${t(B)}px`, position: "relative", width: "100%" }),
          onContextmenu: we(ye, ["self", "prevent"]),
          onClick: q[4] || (q[4] = we(
            //@ts-ignore
            (...N) => t(Z) && t(Z)(...N),
            ["self"]
          ))
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: l,
            class: "vuefinder__explorer__drag-item"
          }, [
            D(Ma, {
              count: R.value && t(g)?.has(R.value) ? t(g)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          t(a).query.length ? (i(!0), f(ne, { key: 0 }, re(t(L), (N) => (i(), I(Ge, {
            key: N,
            "row-index": N,
            "row-height": z.value,
            view: "list",
            items: w(N) ? [w(N)] : [],
            compact: t(d).compactListView,
            "show-path": !0,
            "is-dragging-item": H,
            "is-selected": x,
            "drag-n-drop-events": (me) => t(s).events(me),
            explorerId: t(E),
            onClick: M,
            onDblclick: ue,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(d).view === "grid" ? (i(!0), f(ne, { key: 1 }, re(t(L), (N) => (i(), I(Ge, {
            key: N,
            "row-index": N,
            "row-height": z.value,
            view: "grid",
            "items-per-row": t(oe),
            items: t(O)(t(p), N),
            "show-thumbnails": t(d).showThumbnails,
            "is-dragging-item": H,
            "is-selected": x,
            "drag-n-drop-events": (me) => t(s).events(me),
            explorerId: t(E),
            onClick: M,
            onDblclick: ue,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (i(!0), f(ne, { key: 2 }, re(t(L), (N) => (i(), I(Ge, {
            key: N,
            "row-index": N,
            "row-height": z.value,
            view: "list",
            items: w(N) ? [w(N)] : [],
            compact: t(d).compactListView,
            "is-dragging-item": H,
            "is-selected": x,
            "drag-n-drop-events": (me) => t(s).events(me),
            explorerId: t(E),
            onClick: M,
            onDblclick: ue,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      D(Xa)
    ]));
  }
}), si = ["href", "download"], ri = ["onClick"], li = /* @__PURE__ */ j({
  __name: "ContextMenu",
  setup(n) {
    const e = Y("ServiceContainer"), s = e.search, l = U(s.state), r = b(null), m = b([]), u = ze({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (d) => {
      m.value = d;
    });
    const v = (d) => d.link(e, m.value), c = (d) => {
      e.emitter.emit("vf-contextmenu-hide"), d.action(e, m.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: d, items: a, target: p = null }) => {
      if (u.items = e.contextMenuItems.filter((g) => g.show(e, {
        searchQuery: l.query,
        items: a,
        target: p
      })), l.query)
        if (p)
          e.emitter.emit("vf-context-selected", [p]);
        else
          return;
      else !p && !l.query ? e.emitter.emit("vf-context-selected", []) : a.length > 1 && a.some((g) => g.path === p.path) ? e.emitter.emit("vf-context-selected", a) : e.emitter.emit("vf-context-selected", [p]);
      _(d);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      u.active = !1;
    });
    const _ = (d) => {
      const a = e.root, p = e.root.getBoundingClientRect(), g = a.getBoundingClientRect();
      let T = d.clientX - p.left, x = d.clientY - p.top;
      u.active = !0, Ve(() => {
        const S = r.value?.getBoundingClientRect();
        let k = S?.height ?? 0, C = S?.width ?? 0;
        T = g.right - d.pageX + window.scrollX < C ? T - C : T, x = g.bottom - d.pageY + window.scrollY < k ? x - k : x, u.positions = {
          left: String(T) + "px",
          top: String(x) + "px"
        };
      });
    };
    return (d, a) => ae((i(), f("ul", {
      ref_key: "contextmenu",
      ref: r,
      class: X([u.active ? "vuefinder__context-menu--active" : "vuefinder__context-menu--inactive", "vuefinder__context-menu"]),
      style: Me(u.positions)
    }, [
      (i(!0), f(ne, null, re(u.items, (p) => (i(), f("li", {
        class: "vuefinder__context-menu__item",
        key: p.title
      }, [
        p.link ? (i(), f("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: v(p),
          download: v(p),
          onClick: a[0] || (a[0] = (g) => t(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, h(p.title(t(e).i18n)), 1)
        ], 8, si)) : (i(), f("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => c(p)
        }, [
          o("span", null, h(p.title(t(e).i18n)), 1)
        ], 8, ri))
      ]))), 128))
    ], 6)), [
      [ge, u.active]
    ]);
  }
}), ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function ii(n, e) {
  return i(), f("svg", ai, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const Ct = { render: ii }, di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function ci(n, e) {
  return i(), f("svg", di, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const ui = { render: ci }, vi = { class: "vuefinder__status-bar__wrapper" }, _i = { class: "vuefinder__status-bar__storage" }, mi = ["title"], fi = { class: "vuefinder__status-bar__storage-icon" }, pi = ["value"], hi = ["value"], gi = { class: "vuefinder__status-bar__info" }, wi = { key: 0 }, bi = { class: "vuefinder__status-bar__selected-count" }, yi = { class: "vuefinder__status-bar__actions" }, ki = ["disabled"], xi = ["title"], Si = /* @__PURE__ */ j({
  __name: "Statusbar",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = e.search, m = U(r.state), u = U(l.sortedFiles), v = U(l.path), c = U(l.selectedCount), _ = U(l.storages), d = (p) => {
      const g = p.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: g } });
    }, a = se(() => {
      const p = e.selectButton.multiple ? c.value > 0 : c.value === 1;
      return e.selectButton.active && p;
    });
    return (p, g) => (i(), f("div", vi, [
      o("div", _i, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: t(s)("Storage")
        }, [
          o("div", fi, [
            D(t(Ct))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: t(v)?.storage,
            onChange: d,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (i(!0), f(ne, null, re(t(_), (T) => (i(), f("option", {
              value: T,
              key: T
            }, h(T), 9, hi))), 128))
          ], 40, pi)
        ], 8, mi),
        o("div", gi, [
          t(m).hasQuery ? (i(), f("span", wi, h(t(u).value.length) + " items found. ", 1)) : $("", !0),
          o("span", bi, h(t(c) > 0 ? `${t(c)} item(s) selected.` : ""), 1)
        ])
      ]),
      o("div", yi, [
        t(e).selectButton.active ? (i(), f("button", {
          key: 0,
          class: X(["vf-btn vf-btn-primary vf-btn-small", { disabled: !a.value }]),
          disabled: !a.value,
          onClick: g[0] || (g[0] = (T) => t(e).selectButton.click(t(l).selectedItems, T))
        }, h(t(s)("Select")), 11, ki)) : $("", !0),
        o("span", {
          class: "vuefinder__status-bar__about",
          title: t(s)("About"),
          onClick: g[1] || (g[1] = (T) => t(e).modal.open(ct))
        }, [
          D(t(ui))
        ], 8, xi)
      ])
    ]));
  }
}), $i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function Ci(n, e) {
  return i(), f("svg", $i, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Et = { render: Ci }, Ei = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Mi(n, e) {
  return i(), f("svg", Ei, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Ti = { render: Mi }, Ai = {
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
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ])]);
}
const Mt = { render: Di }, Ii = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Fi(n, e) {
  return i(), f("svg", Ii, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 12h6" }, null, -1)
  ])]);
}
const Tt = { render: Fi };
function At(n, e) {
  const s = n.findIndex((l) => l.path === e.path);
  s > -1 ? n[s] = e : n.push(e);
}
const Vi = { class: "vuefinder__folder-loader-indicator" }, Li = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Dt = /* @__PURE__ */ j({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Ht({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, s = Y("ServiceContainer"), { t: l } = s.i18n, r = at(n, "modelValue"), m = b(!1);
    de(
      () => r.value,
      () => u()?.folders.length || v()
    );
    function u() {
      return s.treeViewData.find((c) => c.path === e.path);
    }
    const v = () => {
      m.value = !0, s.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          storage: e.storage,
          path: e.path
        }
      }).then((c) => {
        At(s.treeViewData, { path: e.path, type: "dir", ...c });
      }).catch((c) => {
      }).finally(() => {
        m.value = !1;
      });
    };
    return (c, _) => (i(), f("div", Vi, [
      m.value ? (i(), I(t(et), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (i(), f("div", Li, [
        r.value && u()?.folders.length ? (i(), I(t(Tt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : $("", !0),
        r.value ? $("", !0) : (i(), I(t(Mt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Ri = ["onClick"], Bi = ["title", "onDblclick", "onClick"], Hi = { class: "vuefinder__treesubfolderlist__item-icon" }, qi = { class: "vuefinder__treesubfolderlist__subfolder" }, Ni = /* @__PURE__ */ j({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = Y("ServiceContainer"), s = e.fs, l = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), r = b({}), m = U(s.path), u = n, v = b(null);
    ce(() => {
      u.path === u.storage + "://" && v.value && Xe(v.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = se(() => e.treeViewData.find((_) => _.path === u.path)?.folders || []);
    return (_, d) => {
      const a = qt("TreeSubfolderList", !0);
      return i(), f("ul", {
        ref_key: "parentSubfolderList",
        ref: v,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (i(!0), f(ne, null, re(c.value, (p) => (i(), f("li", {
          key: p.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", ke(Ee(t(l).events({ ...p, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (g) => r.value[p.path] = !r.value[p.path]
            }, [
              D(Dt, {
                storage: n.storage,
                path: p.path,
                modelValue: r.value[p.path],
                "onUpdate:modelValue": (g) => r.value[p.path] = g
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Ri),
            o("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: p.path,
              onDblclick: (g) => r.value[p.path] = !r.value[p.path],
              onClick: (g) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: u.storage, path: p.path } })
            }, [
              o("div", Hi, [
                t(m)?.path === p.path ? (i(), I(t(Et), { key: 0 })) : (i(), I(t(Ue), { key: 1 }))
              ]),
              o("div", {
                class: X(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(m)?.path === p.path
                }])
              }, h(p.basename), 3)
            ], 40, Bi)
          ], 16),
          o("div", qi, [
            ae(D(a, {
              storage: u.storage,
              path: p.path
            }, null, 8, ["storage", "path"]), [
              [ge, r.value[p.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Pi = /* @__PURE__ */ j({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = Y("ServiceContainer"), s = e.fs, l = b(!1), r = n, m = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), u = U(s.path), v = se(() => r.storage === u.value?.storage), c = {
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
      d === u.value?.storage ? l.value = !l.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: d } }));
    }
    return (d, a) => (i(), f(ne, null, [
      o("div", {
        onClick: a[2] || (a[2] = (p) => _(n.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        o("div", ke(Ee(t(m).events(c), !0), {
          class: ["vuefinder__treestorageitem__info", v.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          o("div", {
            class: X(["vuefinder__treestorageitem__icon", v.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            D(t(Ct))
          ], 2),
          o("div", null, h(n.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: a[1] || (a[1] = we((p) => l.value = !l.value, ["stop"]))
        }, [
          D(Dt, {
            storage: n.storage,
            path: n.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": a[0] || (a[0] = (p) => l.value = p)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      ae(D(Ni, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ge, l.value]
      ])
    ], 64));
  }
}), zi = { class: "vuefinder__folder-indicator" }, Ui = { class: "vuefinder__folder-indicator--icon" }, Oi = /* @__PURE__ */ j({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = at(n, "modelValue");
    return (s, l) => (i(), f("div", zi, [
      o("div", Ui, [
        e.value ? (i(), I(t(Tt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : $("", !0),
        e.value ? $("", !0) : (i(), I(t(Mt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Ki = { class: "vuefinder__treeview__header" }, ji = { class: "vuefinder__treeview__pinned-label" }, Gi = { class: "vuefinder__treeview__pin-text text-nowrap" }, Yi = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Wi = ["onClick"], Qi = ["title"], Xi = ["onClick"], Ji = { key: 0 }, Zi = { class: "vuefinder__treeview__no-pinned" }, ed = /* @__PURE__ */ j({
  __name: "TreeView",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, { getStore: l, setStore: r } = e.storage, m = e.fs, u = e.config, v = U(u.state), c = U(m.sortedFiles), _ = U(m.path), d = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), a = b(190), p = b(l("pinned-folders-opened", !0));
    de(p, (S) => r("pinned-folders-opened", S));
    const g = (S) => {
      u.set("pinnedFolders", u.get("pinnedFolders").filter((k) => k.path !== S.path));
    }, T = (S) => {
      const k = S.clientX, C = S.target.parentElement;
      if (!C) return;
      const F = C.getBoundingClientRect().width;
      C.classList.remove("transition-[width]"), C.classList.add("transition-none");
      const z = (oe) => {
        a.value = F + oe.clientX - k, a.value < 50 && (a.value = 0, u.set("showTreeView", !1)), a.value > 50 && u.set("showTreeView", !0);
      }, J = () => {
        const oe = C.getBoundingClientRect();
        a.value = oe.width, C.classList.add("transition-[width]"), C.classList.remove("transition-none"), window.removeEventListener("mousemove", z), window.removeEventListener("mouseup", J);
      };
      window.addEventListener("mousemove", z), window.addEventListener("mouseup", J);
    }, x = b(null);
    return ce(() => {
      x.value && Xe(x.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), de(c, (S) => {
      const k = S.filter((C) => C.type === "dir");
      At(e.treeViewData, {
        path: _.value?.path || "",
        folders: k.map((C) => ({
          storage: C.storage,
          path: C.path,
          basename: C.basename,
          type: "dir"
        }))
      });
    }), (S, k) => (i(), f(ne, null, [
      o("div", {
        onClick: k[0] || (k[0] = (C) => t(u).toggle("showTreeView")),
        class: X(["vuefinder__treeview__overlay", t(v).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      o("div", {
        style: Me(t(v).showTreeView ? "min-width:100px;max-width:75%; width: " + a.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: x,
          class: "vuefinder__treeview__scroll"
        }, [
          o("div", Ki, [
            o("div", {
              onClick: k[2] || (k[2] = (C) => p.value = !p.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              o("div", ji, [
                D(t($t), { class: "vuefinder__treeview__pin-icon" }),
                o("div", Gi, h(t(s)("Pinned Folders")), 1)
              ]),
              D(Oi, {
                modelValue: p.value,
                "onUpdate:modelValue": k[1] || (k[1] = (C) => p.value = C)
              }, null, 8, ["modelValue"])
            ]),
            p.value ? (i(), f("ul", Yi, [
              (i(!0), f(ne, null, re(t(v).pinnedFolders, (C) => (i(), f("li", {
                key: C.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", ke(Ee(t(d).events(C), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (F) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: C.storage, path: C.path } })
                }), [
                  t(_)?.path !== C.path ? (i(), I(t(Ue), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : $("", !0),
                  t(_)?.path === C.path ? (i(), I(t(Et), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : $("", !0),
                  o("div", {
                    title: C.path,
                    class: X(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": t(_)?.path === C.path
                    }])
                  }, h(C.basename), 11, Qi)
                ], 16, Wi),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (F) => g(C)
                }, [
                  D(t(Ti), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Xi)
              ]))), 128)),
              t(v).pinnedFolders.length ? $("", !0) : (i(), f("li", Ji, [
                o("div", Zi, h(t(s)("No folders pinned")), 1)
              ]))
            ])) : $("", !0)
          ]),
          (i(!0), f(ne, null, re(t(m).storages.get(), (C) => (i(), f("div", {
            class: "vuefinder__treeview__storage",
            key: C
          }, [
            D(Pi, { storage: C }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        o("div", {
          onMousedown: T,
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
function td(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function _e(n) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, n);
  return (s, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== td(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !s.features.includes(e.feature));
}
function Ye(...n) {
  return (e, s) => n.some((l) => l(e, s));
}
function Be(...n) {
  return (e, s) => n.every((l) => l(e, s));
}
const nd = [
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
      const s = n.config, l = s.get("pinnedFolders"), r = l.concat(e.filter((m) => l.findIndex((u) => u.path === m.path) === -1));
      s.set("pinnedFolders", r);
    },
    show: Be(
      _e({ target: "one", targetType: "dir" }),
      (n, e) => n.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) === -1
    )
  },
  {
    id: pe.unpinFolder,
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      const s = n.config, l = s.get("pinnedFolders");
      s.set("pinnedFolders", l.filter((r) => !e.find((m) => m.path === r.path)));
    },
    show: Be(
      _e({ target: "one", targetType: "dir" }),
      (n, e) => n.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) !== -1
    )
  },
  {
    id: pe.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(mt, { storage: e[0]?.storage, item: e[0] }),
    show: Be(
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
    show: Be(
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
      Be(
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
], od = {
  class: "vuefinder",
  ref: "root",
  tabindex: "0"
}, sd = { class: "vuefinder__main__content" }, rd = /* @__PURE__ */ j({
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
    contextMenuItems: { default: () => nd },
    onError: {},
    onSelect: {},
    "onUpdate:path": {},
    icon: {}
  },
  emits: ["select", "update:path"],
  setup(n, { emit: e }) {
    const s = e, l = n, r = cn(l, Y("VueFinderOptions"));
    Nt("ServiceContainer", r);
    const m = r.config, u = r.fs, v = U(m.state), c = U(u.selectedItems);
    Zs(r);
    let _ = null;
    r.emitter.on("vf-fetch-abort", () => {
      _ && _.abort(), u.setLoading(!1);
    }), r.emitter.on("vf-fetch", ({ params: a, body: p = null, onSuccess: g = null, onError: T = null, noCloseModal: x = !1 }) => {
      ["index", "search"].includes(a.q) && (_ && _.abort(), u.setLoading(!0)), a.adapter = a.storage, _ = new AbortController();
      const S = _.signal;
      r.requester.send({
        url: "",
        method: a.m || "get",
        params: a,
        body: p,
        abortSignal: S
      }).then((k) => {
        u.setPath(k.dirname), m.get("persist") && m.set("path", k.dirname), x || r.modal.close(), u.setFiles(k.files), u.clearSelection(), u.setSelectedCount(0), u.setStorages(k.storages), g && g(k);
      }).catch((k) => {
        console.error(k), T ? T(k) : k && typeof k == "object" && "message" in k && r.emitter.emit("vf-toast-push", { label: k.message, type: "error" });
      }).finally(() => {
        ["index", "search"].includes(a.q) && u.setLoading(!1);
      });
    });
    function d(a) {
      let p = {};
      a && a.includes("://") && (p = {
        storage: a.split("://")[0],
        path: a
      }), r.emitter.emit("vf-fetch", {
        params: { q: "index", storage: u.path.get().storage, ...p },
        onError: l.onError ?? ((g) => {
          g && typeof g == "object" && "message" in g && r.emitter.emit("vf-toast-push", { label: g.message, type: "error" });
        })
      });
    }
    return ce(() => {
      de(() => l.path, (p) => {
        d(p);
      });
      const a = m.get("persist") ? m.get("path") : l.path;
      u.setPath(a), d(a), r.emitter.on("vf-select", (p) => {
        r.selectedItems = p, s("select", p);
      }), de(() => u.path.get().path, (p) => {
        s("update:path", p);
      }), de(c, (p) => {
        s("select", p);
      });
    }), (a, p) => (i(), f("div", od, [
      o("div", {
        class: X(t(r).theme.actualValue)
      }, [
        o("div", {
          class: X([t(v).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: Me(t(v).fullScreen ? "" : "max-height: " + n.maxHeight),
          onMousedown: p[0] || (p[0] = (g) => t(r).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (g) => t(r).emitter.emit("vf-contextmenu-hide"))
        }, [
          D(Sl),
          D(ma),
          o("div", sd, [
            D(ed),
            D(oi)
          ]),
          D(Si)
        ], 38),
        D(Pt, { name: "fade" }, {
          default: G(() => [
            t(r).modal.visible ? (i(), I(Qe(t(r).modal.type), { key: 0 })) : $("", !0)
          ]),
          _: 1
        }),
        D(li)
      ], 2)
    ], 512));
  }
}), hd = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", rd);
  }
};
export {
  pe as ContextMenuIds,
  rd as VueFinder,
  hd as VueFinderPlugin,
  nd as contextMenuItems,
  hd as default
};
