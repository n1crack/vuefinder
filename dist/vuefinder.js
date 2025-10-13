import { reactive as ze, watch as ue, ref as b, shallowRef as rt, useTemplateRef as Ie, defineComponent as j, inject as Y, onMounted as ve, nextTick as Be, createElementBlock as f, openBlock as i, withKeys as Ve, unref as t, createElementVNode as o, withModifiers as we, renderSlot as Pe, createBlock as I, resolveDynamicComponent as Qe, toDisplayString as h, onUnmounted as He, normalizeClass as X, computed as se, withCtx as G, createVNode as D, createCommentVNode as $, Fragment as ne, renderList as re, createTextVNode as P, withDirectives as ae, vModelSelect as tt, vModelText as Le, onBeforeUnmount as Dt, customRef as It, mergeProps as ke, toHandlers as Ee, vShow as ge, isRef as Ft, Teleport as Vt, normalizeStyle as Me, normalizeProps as Lt, TransitionGroup as Rt, onUpdated as Bt, mergeModels as Ht, useModel as lt, resolveComponent as qt, provide as Nt, Transition as Pt } from "vue";
import { useStore as U } from "@nanostores/vue";
import zt from "mitt";
import { persistentAtom as Ut } from "@nanostores/persistent";
import { atom as he, computed as Fe } from "nanostores";
import "cropperjs";
import Ot from "@uppy/core";
import Kt from "@uppy/xhr-upload";
import jt from "@viselect/vanilla";
import Gt from "vanilla-lazyload";
import { OverlayScrollbars as Xe } from "overlayscrollbars";
const Ke = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
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
    let [s, l] = e;
    this.config.fetchRequestInterceptor && (l = this.config.fetchRequestInterceptor(l));
    let r = await fetch(s, l);
    return this.config.fetchResponseInterceptor && (r = await this.config.fetchResponseInterceptor(r)), r;
  };
  transformRequestParams(e) {
    const s = this.config, l = {};
    Ke != null && Ke !== "" && s.xsrfHeaderName && (l[s.xsrfHeaderName] = Ke);
    const r = Object.assign({}, s.headers, l, e.headers), v = Object.assign({}, s.params, e.params), d = s.baseUrl + e.url, m = e.method;
    let u;
    if (m !== "get")
      if (e.body instanceof FormData) {
        const c = e.body;
        s.body != null && Object.entries(this.config.body).forEach(([a, p]) => {
          c.append(a, String(p));
        }), u = c;
      } else {
        const c = Object.assign({}, e.body ?? {});
        s.body != null && Object.assign(c, this.config.body), u = c;
      }
    const _ = { url: d, method: m, headers: r, params: v, body: u };
    if (s.transformRequest != null) {
      const c = s.transformRequest({ url: d, method: m, headers: r, params: v, body: u ?? null });
      c.url != null && (_.url = c.url), c.method != null && (_.method = c.method), c.params != null && (_.params = c.params), c.headers != null && (_.headers = c.headers), c.body != null && (_.body = c.body);
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
    const s = this.transformRequestParams(e), l = e.responseType || "json", r = { method: e.method, headers: s.headers, signal: e.abortSignal }, v = s.url + "?" + new URLSearchParams(s.params);
    if (s.method !== "get" && s.body != null) {
      let m;
      s.body instanceof FormData ? m = e.body : (m = JSON.stringify(s.body), r.headers["Content-Type"] = "application/json"), r.body = m;
    }
    this.config.fetchParams && Object.assign(r, this.config.fetchParams);
    const d = await this.customFetch(v, r);
    if (d.ok) return await d[l]();
    throw await d.json();
  }
}
function Wt(n) {
  const e = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof n == "string" ? Object.assign(e, { baseUrl: n }) : Object.assign(e, n), new Yt(e);
}
function Qt(n) {
  let e = localStorage.getItem(n + "_storage");
  const s = ze(JSON.parse(e ?? "{}"));
  ue(s, l);
  function l() {
    Object.keys(s).length ? localStorage.setItem(n + "_storage", JSON.stringify(s)) : localStorage.removeItem(n + "_storage");
  }
  function r(u, _) {
    s[u] = _;
  }
  function v(u) {
    delete s[u];
  }
  function d() {
    Object.keys(s).forEach((u) => v(u));
  }
  return { getStore: (u, _ = null) => u in s ? s[u] : _, setStore: r, removeStore: v, clearStore: d };
}
async function Xt(n, e) {
  const s = e[n];
  return typeof s == "function" ? (await s()).default : s;
}
function Jt(n, e, s, l) {
  const { getStore: r, setStore: v } = n, d = b({}), m = b(r("locale", e)), u = (a, p = e) => {
    Xt(a, l).then((g) => {
      d.value = g, v("locale", a), m.value = a, v("translations", g), Object.values(l).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + a }), s.emit("vf-language-saved"));
    }).catch(() => {
      p ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), u(p, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  ue(m, (a) => {
    u(a);
  }), !r("locale") && !Object.keys(l).length ? u(e) : d.value = r("translations");
  const _ = (a, ...p) => p.length ? _(a = a.replace("%s", String(p.shift())), ...p) : a;
  function c(a, ...p) {
    return d.value && Object.prototype.hasOwnProperty.call(d.value, a) ? _(d.value[a] || a, ...p) : _(a, ...p);
  }
  return ze({ t: c, locale: m });
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
function at(n, e, s, l, r) {
  return e = Math, s = e.log, l = 1024, r = s(n) / s(l) | 0, (n / e.pow(l, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "iB" : "B");
}
function it(n, e, s, l, r) {
  return e = Math, s = e.log, l = 1e3, r = s(n) / s(l) | 0, (n / e.pow(l, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "B" : "B");
}
function tn(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!l) return 0;
  const r = parseFloat(l[1] || "0"), v = (l[2] || "").toLowerCase(), d = e[v] ?? 0;
  return Math.round(r * Math.pow(1024, d));
}
const Ce = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function nn(n, e) {
  const s = b(Ce.SYSTEM), l = b(Ce.LIGHT);
  s.value = n.getStore("theme", e ?? Ce.SYSTEM);
  const r = window.matchMedia("(prefers-color-scheme: dark)"), v = (d) => {
    s.value === Ce.DARK || s.value === Ce.SYSTEM && d.matches ? l.value = Ce.DARK : l.value = Ce.LIGHT;
  };
  return v(r), r.addEventListener("change", v), {
    value: s,
    actualValue: l,
    set(d) {
      s.value = d, d !== Ce.SYSTEM ? n.setStore("theme", d) : n.removeStore("theme"), v(r);
    }
  };
}
function on() {
  const n = rt(null), e = b(!1), s = b();
  return { visible: e, type: n, data: s, open: (v, d = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, n.value = v, s.value = d;
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
}, sn = (n) => {
  const e = `vuefinder_config_${n}`, s = Ut(e, je, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), l = (_ = {}) => {
    const c = s.get(), a = { ...je, ..._, ...c };
    s.set(a);
  }, r = (_) => s.get()[_], v = () => s.get(), d = (_, c) => {
    const a = s.get();
    typeof _ == "object" && _ !== null ? s.set({ ...a, ..._ }) : s.set({ ...a, [_]: c });
  };
  return {
    // Store atom
    state: s,
    // Methods
    init: l,
    get: r,
    set: d,
    toggle: (_) => {
      const c = s.get();
      d(_, !c[_]);
    },
    all: v,
    reset: () => {
      s.set({ ...je });
    }
  };
};
function rn(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const s = Number(n) || 0, l = Number(e) || 0;
  return s === l ? 0 : s < l ? -1 : 1;
}
const ln = () => {
  const n = he(""), e = he([]), s = he([]), l = he({ active: !1, column: "", order: "" }), r = he(/* @__PURE__ */ new Set()), v = he({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), d = he(null), m = he(0), u = he(!1), _ = Fe([n], (w) => {
    const M = (w || "local://").trim(), te = M.indexOf("://"), de = te >= 0 ? M.slice(0, te) : "", Te = (te >= 0 ? M.slice(te + 3) : M).split("/").filter(Boolean);
    let ye = "";
    const Ae = Te.map(($e) => (ye = ye ? `${ye}/${$e}` : $e, { basename: $e, name: $e, path: de ? `${de}://${ye}` : ye, type: "dir" }));
    return { storage: de, breadcrumb: Ae, path: M };
  }), c = Fe([s, l], (w, M) => {
    const { active: te, column: de, order: Se } = M;
    if (!te || !de) return w;
    const Te = Se === "asc" ? 1 : -1;
    return w.slice().sort((ye, Ae) => rn(ye[de], Ae[de]) * Te);
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
    M.add(w), r.set(M), m.set(M.size);
  }, F = (w) => {
    const M = new Set(r.get());
    M.delete(w), r.set(M), m.set(M.size);
  }, z = (w) => {
    const M = new Set(r.get());
    M.has(w) ? M.delete(w) : M.add(w), r.set(M), m.set(M.size);
  }, J = () => {
    const w = new Set(s.get().map((M) => M.path));
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
  }, O = () => u.get(), ie = (w, M) => {
    const te = s.get().filter((de) => M.has(de.path));
    v.set({
      type: w,
      path: _.get().path,
      items: new Set(te)
    });
  }, V = (w) => Fe([v], (M) => M.type === "cut" && Array.from(M.items).some((te) => te.path === w)), y = (w) => Fe([v], (M) => M.type === "copy" && Array.from(M.items).some((te) => te.path === w));
  return {
    // Atoms (state)
    files: s,
    storages: e,
    currentPath: n,
    sort: l,
    selectedKeys: r,
    selectedCount: m,
    loading: u,
    draggedItem: d,
    clipboardItems: v,
    // Computed values
    path: _,
    sortedFiles: c,
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
      v.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
    },
    getClipboard: () => v.get(),
    setDraggedItem: (w) => {
      d.set(w);
    },
    getDraggedItem: () => d.get(),
    clearDraggedItem: () => {
      d.set(null);
    }
  };
}, nt = {
  query: "",
  searchMode: !1
}, an = () => {
  const n = he(nt), e = Fe(n, (_) => _.query.length > 0);
  return {
    // Store atom
    state: n,
    // Computed values
    hasQuery: e,
    // Methods
    setQuery: (_) => {
      const c = n.get();
      n.set({ ...c, query: _ ?? "" });
    },
    enterSearchMode: () => {
      const _ = n.get();
      n.set({ ..._, searchMode: !0 });
    },
    exitSearchMode: () => {
      n.set({ query: "", searchMode: !1 });
    },
    get: (_) => n.get()[_],
    set: (_, c) => {
      const a = n.get();
      typeof _ == "object" && _ !== null ? n.set({ ...a, ..._ }) : n.set({ ...a, [_]: c });
    },
    all: () => n.get(),
    reset: () => {
      n.set({ ...nt });
    }
  };
}, dn = (n, e) => {
  const s = Qt(n.id), l = zt(), r = nn(s, n.theme), v = e.i18n, d = n.locale ?? e.locale, m = sn(n.id), u = ln(), _ = an(), c = (a) => Array.isArray(a) ? a : Zt;
  return ze({
    // app version
    version: en,
    // config store
    config: m,
    // files store
    fs: u,
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
    i18n: Jt(s, d, l, v),
    // modal state
    modal: on(),
    // http object
    requester: Wt(n.request),
    // active features
    features: c(n.features),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // theme state
    theme: r,
    // human readable file sizes
    filesize: m.get("metricUnits") ? it : at,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // custom icon
    customIcon: n.icon,
    // selectButton state
    selectButton: n.selectButton
  });
}, cn = { class: "vuefinder__modal-layout__container" }, un = { class: "vuefinder__modal-layout__content" }, vn = { class: "vuefinder__modal-layout__footer" }, be = /* @__PURE__ */ j({
  __name: "ModalLayout",
  setup(n) {
    const e = b(null), s = Y("ServiceContainer");
    return ve(() => {
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
      onKeyup: r[1] || (r[1] = Ve((v) => t(s).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      r[2] || (r[2] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", cn, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: r[0] || (r[0] = we((v) => t(s).modal.close(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            o("div", un, [
              Pe(l.$slots, "default")
            ]),
            o("div", vn, [
              Pe(l.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}), _n = { class: "vuefinder__modal-header" }, mn = { class: "vuefinder__modal-header__icon-container" }, fn = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, xe = /* @__PURE__ */ j({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, s) => (i(), f("div", _n, [
      o("div", mn, [
        (i(), I(Qe(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("h3", fn, h(n.title), 1)
    ]));
  }
}), pn = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: s }) {
    const l = Y("ServiceContainer"), r = b(!1), { t: v } = l.i18n;
    let d = null;
    const m = () => {
      clearTimeout(d), r.value = !0, d = setTimeout(() => {
        r.value = !1;
      }, 2e3);
    };
    return ve(() => {
      l.emitter.on(n.on, m);
    }), He(() => {
      clearTimeout(d);
    }), {
      shown: r,
      t: v
    };
  }
}, hn = (n, e) => {
  const s = n.__vccOpts || n;
  for (const [l, r] of e)
    s[l] = r;
  return s;
}, gn = { key: 1 };
function wn(n, e, s, l, r, v) {
  return i(), f("div", {
    class: X(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    n.$slots.default ? Pe(n.$slots, "default", { key: 0 }) : (i(), f("span", gn, h(l.t("Saved.")), 1))
  ], 2);
}
const De = /* @__PURE__ */ hn(pn, [["render", wn]]), bn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function yn(n, e) {
  return i(), f("svg", bn, [...e[0] || (e[0] = [
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
}, In = { class: "vuefinder__about-modal__description" }, Fn = { class: "vuefinder__about-modal__settings" }, Vn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Ln = { class: "vuefinder__about-modal__setting-input" }, Rn = ["checked"], Bn = { class: "vuefinder__about-modal__setting-label" }, Hn = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, qn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Nn = { class: "vuefinder__about-modal__setting-input" }, Pn = ["checked"], zn = { class: "vuefinder__about-modal__setting-label" }, Un = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, On = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Kn = { class: "vuefinder__about-modal__setting-input" }, jn = ["checked"], Gn = { class: "vuefinder__about-modal__setting-label" }, Yn = {
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
}, mo = { class: "vuefinder__about-modal__shortcuts" }, fo = { class: "vuefinder__about-modal__shortcut" }, po = { class: "vuefinder__about-modal__shortcut" }, ho = { class: "vuefinder__about-modal__shortcut" }, go = { class: "vuefinder__about-modal__shortcut" }, wo = { class: "vuefinder__about-modal__shortcut" }, bo = { class: "vuefinder__about-modal__shortcut" }, yo = { class: "vuefinder__about-modal__shortcut" }, ko = { class: "vuefinder__about-modal__shortcut" }, xo = { class: "vuefinder__about-modal__shortcut" }, So = { class: "vuefinder__about-modal__shortcut" }, $o = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Co = { class: "vuefinder__about-modal__description" }, dt = /* @__PURE__ */ j({
  __name: "ModalAbout",
  setup(n) {
    const e = Y("ServiceContainer"), s = e.config, { clearStore: l } = e.storage, { t: r } = e.i18n, v = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, d = se(() => [
      { name: r("About"), key: v.ABOUT, current: !1 },
      { name: r("Settings"), key: v.SETTINGS, current: !1 },
      { name: r("Shortcuts"), key: v.SHORTCUTS, current: !1 },
      { name: r("Reset"), key: v.RESET, current: !1 }
    ]), m = b("about"), u = async () => {
      s.reset(), l(), location.reload();
    }, _ = (C) => {
      e.theme.set(C), e.emitter.emit("vf-theme-saved");
    }, c = () => {
      s.toggle("metricUnits"), e.filesize = s.get("metricUnits") ? it : at, e.emitter.emit("vf-metric-units-saved");
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
        o("div", xn, [
          D(xe, {
            icon: t(kn),
            title: "Vuefinder " + t(e).version
          }, null, 8, ["icon", "title"]),
          o("div", Sn, [
            o("div", null, [
              o("div", null, [
                o("nav", $n, [
                  (i(!0), f(ne, null, re(d.value, (z) => (i(), f("button", {
                    key: z.name,
                    onClick: (J) => m.value = z.key,
                    class: X([z.key === m.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": z.current ? "page" : void 0
                  }, h(z.name), 11, Cn))), 128))
                ])
              ])
            ]),
            m.value === v.ABOUT ? (i(), f("div", En, [
              o("div", Mn, h(t(r)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              o("a", Tn, h(t(r)("Project home")), 1),
              o("a", An, h(t(r)("Follow on GitHub")), 1)
            ])) : $("", !0),
            m.value === v.SETTINGS ? (i(), f("div", Dn, [
              o("div", In, h(t(r)("Customize your experience with the following settings")), 1),
              o("div", Fn, [
                o("fieldset", null, [
                  o("div", Vn, [
                    o("div", Ln, [
                      o("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: t(s).get("metricUnits"),
                        onChange: c,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Rn)
                    ]),
                    o("div", Bn, [
                      o("label", Hn, [
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
                  o("div", qn, [
                    o("div", Nn, [
                      o("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: t(s).get("compactListView"),
                        onChange: a,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Pn)
                    ]),
                    o("div", zn, [
                      o("label", Un, [
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
                  o("div", On, [
                    o("div", Kn, [
                      o("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: t(s).get("persist"),
                        onChange: g,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, jn)
                    ]),
                    o("div", Gn, [
                      o("label", Yn, [
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
                  o("div", Wn, [
                    o("div", Qn, [
                      o("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: t(s).get("showThumbnails"),
                        onChange: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Xn)
                    ]),
                    o("div", Jn, [
                      o("label", Zn, [
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
                  o("div", eo, [
                    o("div", to, [
                      o("label", no, h(t(r)("Theme")), 1)
                    ]),
                    o("div", oo, [
                      ae(o("select", {
                        id: "theme",
                        "onUpdate:modelValue": F[0] || (F[0] = (z) => t(e).theme.value = z),
                        onChange: F[1] || (F[1] = (z) => _(z.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        o("optgroup", {
                          label: t(r)("Theme")
                        }, [
                          (i(!0), f(ne, null, re(k.value, (z, J) => (i(), f("option", { value: J }, h(z), 9, ro))), 256))
                        ], 8, so)
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
                  t(e).features.includes(t(ee).LANGUAGE) && Object.keys(t(S)).length > 1 ? (i(), f("div", lo, [
                    o("div", ao, [
                      o("label", io, h(t(r)("Language")), 1)
                    ]),
                    o("div", co, [
                      ae(o("select", {
                        id: "language",
                        "onUpdate:modelValue": F[2] || (F[2] = (z) => t(e).i18n.locale = z),
                        class: "vuefinder__about-modal__select"
                      }, [
                        o("optgroup", {
                          label: t(r)("Language")
                        }, [
                          (i(!0), f(ne, null, re(t(S), (z, J) => (i(), f("option", { value: J }, h(z), 9, vo))), 256))
                        ], 8, uo)
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
            m.value === v.SHORTCUTS ? (i(), f("div", _o, [
              o("div", mo, [
                o("div", fo, [
                  o("div", null, h(t(r)("Rename")), 1),
                  F[4] || (F[4] = o("kbd", null, "F2", -1))
                ]),
                o("div", po, [
                  o("div", null, h(t(r)("Refresh")), 1),
                  F[5] || (F[5] = o("kbd", null, "F5", -1))
                ]),
                o("div", ho, [
                  P(h(t(r)("Delete")) + " ", 1),
                  F[6] || (F[6] = o("kbd", null, "Del", -1))
                ]),
                o("div", go, [
                  P(h(t(r)("Escape")) + " ", 1),
                  F[7] || (F[7] = o("div", null, [
                    o("kbd", null, "Esc")
                  ], -1))
                ]),
                o("div", wo, [
                  P(h(t(r)("Select All")) + " ", 1),
                  F[8] || (F[8] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    P(" + "),
                    o("kbd", null, "A")
                  ], -1))
                ]),
                o("div", bo, [
                  P(h(t(r)("Search")) + " ", 1),
                  F[9] || (F[9] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    P(" + "),
                    o("kbd", null, "F")
                  ], -1))
                ]),
                o("div", yo, [
                  P(h(t(r)("Toggle Sidebar")) + " ", 1),
                  F[10] || (F[10] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    P(" + "),
                    o("kbd", null, "E")
                  ], -1))
                ]),
                o("div", ko, [
                  P(h(t(r)("Open Settings")) + " ", 1),
                  F[11] || (F[11] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    P(" + "),
                    o("kbd", null, ",")
                  ], -1))
                ]),
                o("div", xo, [
                  P(h(t(r)("Toggle Full Screen")) + " ", 1),
                  F[12] || (F[12] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    P(" + "),
                    o("kbd", null, "Enter")
                  ], -1))
                ]),
                o("div", So, [
                  P(h(t(r)("Preview")) + " ", 1),
                  F[13] || (F[13] = o("div", null, [
                    o("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : $("", !0),
            m.value === v.RESET ? (i(), f("div", $o, [
              o("div", Co, h(t(r)("Reset all settings to default")), 1),
              o("button", {
                onClick: u,
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
}), Eo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Mo(n, e) {
  return i(), f("svg", Eo, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const ct = { render: Mo }, To = { class: "vuefinder__delete-modal__content" }, Ao = { class: "vuefinder__delete-modal__form" }, Do = { class: "vuefinder__delete-modal__description" }, Io = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Fo = { class: "vuefinder__delete-modal__file" }, Vo = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Lo = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ro = { class: "vuefinder__delete-modal__file-name" }, Bo = { class: "vuefinder__delete-modal__warning" }, Je = /* @__PURE__ */ j({
  __name: "ModalDelete",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = U(l.path), v = b(e.modal.data.items), d = b(""), m = () => {
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
          e.emitter.emit("vf-toast-push", { label: s("Files deleted.") });
        },
        onError: (u) => {
          d.value = s(u.message);
        }
      });
    };
    return (u, _) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-danger"
        }, h(t(s)("Yes, Delete!")), 1),
        o("button", {
          type: "button",
          onClick: _[1] || (_[1] = (c) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(s)("Cancel")), 1),
        o("div", Bo, h(t(s)("This action cannot be undone.")), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(ct),
            title: t(s)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", To, [
            o("div", Ao, [
              o("p", Do, h(t(s)("Are you sure you want to delete these files?")), 1),
              o("div", Io, [
                (i(!0), f(ne, null, re(v.value, (c) => (i(), f("p", Fo, [
                  c.type === "dir" ? (i(), f("svg", Vo, [..._[2] || (_[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (i(), f("svg", Lo, [..._[3] || (_[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Ro, h(c.basename), 1)
                ]))), 256))
              ]),
              d.value.length ? (i(), I(t(d), {
                key: 0,
                onHidden: _[0] || (_[0] = (c) => d.value = ""),
                error: ""
              }, {
                default: G(() => [
                  P(h(d.value), 1)
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
}), Ho = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function qo(n, e) {
  return i(), f("svg", Ho, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const ut = { render: qo }, No = { class: "vuefinder__rename-modal__content" }, Po = { class: "vuefinder__rename-modal__item" }, zo = { class: "vuefinder__rename-modal__item-info" }, Uo = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Oo = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ko = { class: "vuefinder__rename-modal__item-name" }, Ze = /* @__PURE__ */ j({
  __name: "ModalRename",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = U(l.path), v = b(e.modal.data.items[0]), d = b(e.modal.data.items[0].basename), m = b(""), u = () => {
      d.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          item: v.value.path,
          name: d.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is renamed.", d.value) });
        },
        onError: (_) => {
          m.value = s(_.message);
        }
      });
    };
    return (_, c) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, h(t(s)("Rename")), 1),
        o("button", {
          type: "button",
          onClick: c[2] || (c[2] = (a) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(s)("Cancel")), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(ut),
            title: t(s)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", No, [
            o("div", Po, [
              o("p", zo, [
                v.value.type === "dir" ? (i(), f("svg", Uo, [...c[3] || (c[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (i(), f("svg", Oo, [...c[4] || (c[4] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Ko, h(v.value.basename), 1)
              ]),
              ae(o("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (a) => d.value = a),
                onKeyup: Ve(u, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Le, d.value]
              ]),
              m.value.length ? (i(), I(t(m), {
                key: 0,
                onHidden: c[1] || (c[1] = (a) => m.value = ""),
                error: ""
              }, {
                default: G(() => [
                  P(h(m.value), 1)
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
}), jo = ["title"], vt = /* @__PURE__ */ j({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const s = e, l = Y("ServiceContainer"), { t: r } = l.i18n, v = b(!1), d = b(null), m = b(d.value?.innerHTML);
    ue(m, () => v.value = !1);
    const u = () => {
      s("hidden"), v.value = !0;
    };
    return (_, c) => (i(), f("div", null, [
      v.value ? $("", !0) : (i(), f("div", {
        key: 0,
        ref_key: "strMessage",
        ref: d,
        class: X(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Pe(_.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          onClick: u,
          title: t(r)("Close")
        }, [...c[0] || (c[0] = [
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
        ])], 8, jo)
      ], 2))
    ]));
  }
}), Go = { class: "vuefinder__text-preview" }, Yo = { class: "vuefinder__text-preview__header" }, Wo = ["title"], Qo = { class: "vuefinder__text-preview__actions" }, Xo = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Jo = { key: 1 }, Zo = /* @__PURE__ */ j({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, l = b(""), r = b(""), v = b(null), d = b(!1), m = b(""), u = b(!1), _ = Y("ServiceContainer"), { t: c } = _.i18n;
    ve(() => {
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
      d.value = !d.value, r.value = l.value;
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
        m.value = c("Updated."), l.value = g, s("success"), d.value = !d.value;
      }).catch((g) => {
        m.value = c(g.message), u.value = !0;
      });
    };
    return (g, T) => (i(), f("div", Go, [
      o("div", Yo, [
        o("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(_).modal.data.item.path
        }, h(t(_).modal.data.item.basename), 9, Wo),
        o("div", Qo, [
          d.value ? (i(), f("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, h(t(c)("Save")), 1)) : $("", !0),
          t(_).features.includes(t(ee).EDIT) ? (i(), f("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: T[0] || (T[0] = (x) => a())
          }, h(d.value ? t(c)("Cancel") : t(c)("Edit")), 1)) : $("", !0)
        ])
      ]),
      o("div", null, [
        d.value ? (i(), f("div", Jo, [
          ae(o("textarea", {
            ref_key: "editInput",
            ref: v,
            "onUpdate:modelValue": T[1] || (T[1] = (x) => r.value = x),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Le, r.value]
          ])
        ])) : (i(), f("pre", Xo, h(l.value), 1)),
        m.value.length ? (i(), I(vt, {
          key: 2,
          onHidden: T[2] || (T[2] = (x) => m.value = ""),
          error: u.value
        }, {
          default: G(() => [
            P(h(m.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : $("", !0)
      ])
    ]));
  }
}), es = ["src"], ts = ["src"], ns = /* @__PURE__ */ j({
  __name: "CropperCanvas",
  props: {
    src: {},
    canvasClass: {}
  },
  setup(n, { expose: e }) {
    const s = n, l = b(null);
    return e({ getCroppedBlob: (v) => new Promise((d) => {
      const m = l.value?.getCropperCanvas(v);
      if (!m) return d(null);
      m.toBlob((u) => d(u));
    }) }), (v, d) => (i(), f("cropper-canvas", {
      src: n.src,
      background: "",
      ref_key: "canvasEl",
      ref: l,
      class: X(s.canvasClass)
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
      d[0] || (d[0] = o("cropper-shade", { hidden: "" }, null, -1)),
      d[1] || (d[1] = o("cropper-handle", {
        action: "select",
        plain: ""
      }, null, -1)),
      d[2] || (d[2] = o("cropper-selection", {
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
    ], 10, es));
  }
}), os = { class: "vuefinder__image-preview" }, ss = { class: "vuefinder__image-preview__header" }, rs = ["title"], ls = { class: "vuefinder__image-preview__actions" }, as = { class: "vuefinder__image-preview__image-container h-[50vh]" }, is = ["src"], ds = /* @__PURE__ */ j({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, l = Y("ServiceContainer"), { t: r } = l.i18n, v = b(null), d = b(!1), m = b(""), u = b(!1), _ = () => {
      d.value = !d.value;
    }, c = () => {
      v.value?.getCroppedBlob({ width: 795, height: 341 }).then((a) => {
        if (!a) return;
        m.value = "", u.value = !1;
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
          m.value = r("Updated."), _(), s("success");
        }).catch((g) => {
          const T = g?.message ?? "Error";
          m.value = r(T), u.value = !0;
        });
      });
    };
    return ve(() => {
      s("success");
    }), (a, p) => (i(), f("div", os, [
      o("div", ss, [
        o("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, h(t(l).modal.data.item.basename), 9, rs),
        o("div", ls, [
          d.value ? (i(), f("button", {
            key: 0,
            onClick: c,
            class: "vuefinder__image-preview__crop-button"
          }, h(t(r)("Crop")), 1)) : $("", !0),
          t(l).features.includes(t(ee).EDIT) ? (i(), f("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: p[0] || (p[0] = (g) => _())
          }, h(d.value ? t(r)("Cancel") : t(r)("Edit")), 1)) : $("", !0)
        ])
      ]),
      o("div", as, [
        d.value ? $("", !0) : (i(), f("img", {
          key: 0,
          class: "vuefinder__image-preview__image w-full h-full object-contain",
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          alt: ""
        }, null, 8, is)),
        d.value ? (i(), I(ns, {
          key: 1,
          ref_key: "cropperRef",
          ref: v,
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          "canvas-class": "vuefinder__image-preview__image w-full h-full"
        }, null, 8, ["src"])) : $("", !0)
      ]),
      m.value.length ? (i(), I(t(m), {
        key: 0,
        onHidden: p[1] || (p[1] = (g) => m.value = ""),
        error: u.value
      }, {
        default: G(() => [
          P(h(m.value), 1)
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
    return ve(() => {
      l("success");
    }), (r, v) => (i(), f("div", cs, [
      o("div", us, [
        o("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: t(s).modal.data.item.path
        }, h(t(s).modal.data.item.basename), 9, vs)
      ]),
      v[0] || (v[0] = o("div", null, null, -1))
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
    return ve(() => {
      l("success");
    }), (v, d) => (i(), f("div", ms, [
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
          d[0] || (d[0] = P(" Your browser does not support the video tag. ", -1))
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
    return ve(() => {
      s("success");
    }), (v, d) => (i(), f("div", ws, [
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
          d[0] || (d[0] = P(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Ss = { class: "vuefinder__pdf-preview" }, $s = ["title"], Cs = ["data"], Es = ["src"], Ms = /* @__PURE__ */ j({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = Y("ServiceContainer"), l = e, r = () => s.requester.getPreviewUrl(s.modal.data.storage, s.modal.data.item);
    return ve(() => {
      l("success");
    }), (v, d) => (i(), f("div", Ss, [
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
}, Hs = ["download", "href"], _t = /* @__PURE__ */ j({
  __name: "ModalPreview",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = b(!1), r = (d) => (e.modal.data.item.mime_type ?? "").startsWith(d), v = e.features.includes(ee.PREVIEW);
    return v || (l.value = !0), (d, m) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: m[6] || (m[6] = (u) => t(e).modal.close()),
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
            t(v) ? (i(), f("div", Ds, [
              r("text") ? (i(), I(Zo, {
                key: 0,
                onSuccess: m[0] || (m[0] = (u) => l.value = !0)
              })) : r("image") ? (i(), I(ds, {
                key: 1,
                onSuccess: m[1] || (m[1] = (u) => l.value = !0)
              })) : r("video") ? (i(), I(gs, {
                key: 2,
                onSuccess: m[2] || (m[2] = (u) => l.value = !0)
              })) : r("audio") ? (i(), I(xs, {
                key: 3,
                onSuccess: m[3] || (m[3] = (u) => l.value = !0)
              })) : r("application/pdf") ? (i(), I(Ms, {
                key: 4,
                onSuccess: m[4] || (m[4] = (u) => l.value = !0)
              })) : (i(), I(_s, {
                key: 5,
                onSuccess: m[5] || (m[5] = (u) => l.value = !0)
              }))
            ])) : $("", !0),
            o("div", Is, [
              l.value === !1 ? (i(), f("div", Fs, [
                m[7] || (m[7] = o("svg", {
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
}, Gs = { class: "vuefinder__move-modal__file-name" }, Ys = { class: "vuefinder__move-modal__target-title" }, Ws = { class: "vuefinder__move-modal__target-directory" }, Qs = { class: "vuefinder__move-modal__target-path" }, Xs = { class: "vuefinder__move-modal__selected-items" }, mt = /* @__PURE__ */ j({
  __name: "ModalTransfer",
  props: {
    q: {},
    title: {},
    body: {},
    successBtn: {},
    successText: {}
  },
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = U(l.path), v = n, d = b(e.modal.data.items.from), m = e.modal.data.items.to, u = b("");
    console.log(m.value.path);
    const _ = () => {
      d.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: v.q,
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: d.value.map(({ path: c, type: a }) => ({ path: c, type: a })),
          item: m.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: v.successText });
        },
        onError: (c) => {
          u.value = s(c.message);
        }
      });
    };
    return (c, a) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: _,
          class: "vf-btn vf-btn-primary"
        }, h(v.successBtn), 1),
        o("button", {
          type: "button",
          onClick: a[1] || (a[1] = (p) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(s)("Cancel")), 1),
        o("div", Xs, h(t(s)("%s item(s) selected.", d.value.size)), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(Ps),
            title: v.title
          }, null, 8, ["icon", "title"]),
          o("div", zs, [
            o("p", Us, h(v.body), 1),
            o("div", Os, [
              (i(!0), f(ne, null, re(d.value, (p) => (i(), f("div", {
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
              o("span", Qs, h(t(m).value.path), 1)
            ]),
            u.value.length ? (i(), I(t(u), {
              key: 0,
              onHidden: a[0] || (a[0] = (p) => u.value = ""),
              error: ""
            }, {
              default: G(() => [
                P(h(u.value), 1)
              ]),
              _: 1
            })) : $("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ft = /* @__PURE__ */ j({
  __name: "ModalMove",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n;
    return (l, r) => (i(), I(mt, {
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
    return (l, r) => (i(), I(mt, {
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
  const e = n.search, s = n.fs, l = n.config, r = U(e.state), v = U(s.selectedItems), d = (m) => {
    if (m.code === fe.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible && !r.value?.searchMode) {
      if (m.code === fe.F2 && n.features.includes(ee.RENAME) && v.value.length === 1 && n.modal.open(Ze, { items: v.value }), m.code === fe.F5 && n.emitter.emit("vf-fetch", { params: { q: "index", storage: s.path.get().storage, path: s.path.get().path } }), m.code === fe.DELETE && v.value.length === 0 && n.modal.open(Je, { items: v.value }), m.ctrlKey && m.code === fe.BACKSLASH && n.modal.open(dt), m.ctrlKey && m.code === fe.KEY_F && n.features.includes(ee.SEARCH) && (e.enterSearchMode(), m.preventDefault()), m.ctrlKey && m.code === fe.KEY_E && (l.toggle("showTreeView"), m.preventDefault()), m.ctrlKey && m.code === fe.ENTER && (l.toggle("fullScreen"), n.root.focus()), m.ctrlKey && m.code === fe.KEY_A && (s.selectAll(), m.preventDefault()), m.code === fe.SPACE && v.value.length === 1 && v.value[0]?.type !== "dir" && n.modal.open(_t, { storage: s.path.get().storage, item: v.value[0] }), m.metaKey && m.code === fe.KEY_C) {
        if (v.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        s.setClipboard("copy", new Set(v.value.map((u) => u.path))), n.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", v.value.length) }), m.preventDefault();
      }
      if (m.metaKey && m.code === fe.KEY_X) {
        if (v.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        s.setClipboard("cut", new Set(v.value.map((u) => u.path))), n.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", v.value.length) }), m.preventDefault();
      }
      if (m.metaKey && m.code === fe.KEY_V) {
        if (s.getClipboard().items.size === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items in clipboard") });
          return;
        }
        if (s.getClipboard().path === s.path.get().path) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("Cannot paste items to the same directory") });
          return;
        }
        if (s.getClipboard().type === "cut") {
          n.modal.open(ft, { items: { from: s.getClipboard().items, to: s.path } }), s.clearClipboard();
          return;
        }
        if (s.getClipboard().type === "copy") {
          n.modal.open(Js, { items: { from: s.getClipboard().items, to: s.path } });
          return;
        }
        m.preventDefault();
      }
    }
  };
  ve(() => {
    n.root.addEventListener("keydown", d);
  }), Dt(() => {
    n.root.removeEventListener("keydown", d);
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
const pt = { render: tr }, nr = { class: "vuefinder__new-folder-modal__content" }, or = { class: "vuefinder__new-folder-modal__form" }, sr = { class: "vuefinder__new-folder-modal__description" }, rr = ["placeholder"], ht = /* @__PURE__ */ j({
  __name: "ModalNewFolder",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = U(l.path), v = b(""), d = b(""), m = () => {
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
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", v.value) });
        },
        onError: (u) => {
          d.value = s(u.message);
        }
      });
    };
    return (u, _) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-primary"
        }, h(t(s)("Create")), 1),
        o("button", {
          type: "button",
          onClick: _[2] || (_[2] = (c) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(s)("Cancel")), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(pt),
            title: t(s)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", nr, [
            o("div", or, [
              o("p", sr, h(t(s)("Create a new folder")), 1),
              ae(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (c) => v.value = c),
                onKeyup: Ve(m, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(s)("Folder Name"),
                type: "text"
              }, null, 40, rr), [
                [Le, v.value]
              ]),
              d.value.length ? (i(), I(t(d), {
                key: 0,
                onHidden: _[1] || (_[1] = (c) => d.value = ""),
                error: ""
              }, {
                default: G(() => [
                  P(h(d.value), 1)
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
const gt = { render: ar }, ir = { class: "vuefinder__new-file-modal__content" }, dr = { class: "vuefinder__new-file-modal__form" }, cr = { class: "vuefinder__new-file-modal__description" }, ur = ["placeholder"], vr = /* @__PURE__ */ j({
  __name: "ModalNewFile",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = U(l.path), v = b(""), d = b(""), m = () => {
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
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", v.value) });
        },
        onError: (u) => {
          d.value = s(u.message);
        }
      });
    };
    return (u, _) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-primary"
        }, h(t(s)("Create")), 1),
        o("button", {
          type: "button",
          onClick: _[2] || (_[2] = (c) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(s)("Cancel")), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(gt),
            title: t(s)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", ir, [
            o("div", dr, [
              o("p", cr, h(t(s)("Create a new file")), 1),
              ae(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (c) => v.value = c),
                onKeyup: Ve(m, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(s)("File Name"),
                type: "text"
              }, null, 40, ur), [
                [Le, v.value]
              ]),
              d.value.length ? (i(), I(t(d), {
                key: 0,
                onHidden: _[1] || (_[1] = (c) => d.value = ""),
                error: ""
              }, {
                default: G(() => [
                  P(h(d.value), 1)
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
}), ce = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function _r() {
  const n = Y("ServiceContainer"), { t: e } = n.i18n, s = n.fs, l = n.config, r = b({ QUEUE_ENTRY_STATUS: ce }), v = b(null), d = b(null), m = b(null), u = b(null), _ = b(null), c = b(null), a = b([]), p = b(""), g = b(!1), T = b(!1);
  let x;
  const S = (O) => a.value.findIndex((ie) => ie.id === O), k = (O, ie) => x.addFile({ name: ie || O.name, type: O.type, data: O, source: "Local" }), C = (O) => O.status === ce.DONE ? "text-green-600" : O.status === ce.ERROR || O.status === ce.CANCELED ? "text-red-600" : "", F = (O) => O.status === ce.DONE ? "✓" : O.status === ce.ERROR || O.status === ce.CANCELED ? "!" : "...", z = () => u.value?.click(), J = () => n.modal.close(), oe = () => {
    if (g.value || !a.value.filter((O) => O.status !== ce.DONE).length) {
      g.value || (p.value = e("Please select file to upload first."));
      return;
    }
    p.value = "", x.retryAll(), x.upload();
  }, B = () => {
    x.cancelAll(), a.value.forEach((O) => {
      O.status !== ce.DONE && (O.status = ce.CANCELED, O.statusName = e("Canceled"));
    }), g.value = !1;
  }, L = (O) => {
    g.value || (x.removeFile(O.id), a.value.splice(S(O.id), 1));
  }, le = (O) => {
    if (!g.value)
      if (x.cancelAll(), O) {
        const ie = a.value.filter((V) => V.status !== ce.DONE);
        a.value = [], ie.forEach((V) => k(V.originalFile, V.name));
      } else
        a.value = [];
  };
  return ve(() => {
    x = new Ot({
      debug: n.debug,
      restrictions: { maxFileSize: tn(l.maxFileSize ?? "10mb") },
      locale: n.i18n.t("uppy"),
      onBeforeFileAdded: (V, y) => {
        if (y[V.id] != null) {
          const K = S(V.id);
          a.value[K]?.status === ce.PENDING && (p.value = x.i18n("noDuplicates", { fileName: V.name })), a.value = a.value.filter((W) => W.id !== V.id);
        }
        return a.value.push({
          id: V.id,
          name: V.name,
          size: n.filesize(V.size),
          status: ce.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: V.data
        }), !0;
      }
    }), x.use(Kt, {
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
        E.status !== ce.DONE && (E.percent = null, E.status = ce.UPLOADING, E.statusName = e("Pending upload"));
      });
    }), x.on("upload-progress", (V, y) => {
      const E = y.bytesTotal ?? 1, K = Math.floor(y.bytesUploaded / E * 100), W = S(V.id);
      W !== -1 && a.value[W] && (a.value[W].percent = `${K}%`);
    }), x.on("upload-success", (V) => {
      const y = a.value[S(V.id)];
      y && (y.status = ce.DONE, y.statusName = e("Done"));
    }), x.on("upload-error", (V, y) => {
      const E = a.value[S(V.id)];
      E && (E.percent = null, E.status = ce.ERROR, E.statusName = y?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : y?.message || e("Unknown Error"));
    }), x.on("error", (V) => {
      p.value = V.message, g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), x.on("complete", () => {
      g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), u.value?.addEventListener("click", () => d.value?.click()), _.value?.addEventListener("click", () => m.value?.click()), c.value?.addEventListener("dragover", (V) => {
      V.preventDefault(), T.value = !0;
    }), c.value?.addEventListener("dragleave", (V) => {
      V.preventDefault(), T.value = !1;
    });
    const O = (V, y) => {
      y.isFile && y.file((E) => V(y, E)), y.isDirectory && y.createReader().readEntries((E) => E.forEach((K) => O(V, K)));
    };
    c.value?.addEventListener("drop", (V) => {
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
    d.value?.addEventListener("change", ie), m.value?.addEventListener("change", ie);
  }), {
    container: v,
    internalFileInput: d,
    internalFolderInput: m,
    pickFiles: u,
    pickFolders: _,
    dropArea: c,
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
const wt = { render: fr }, pr = { class: "vuefinder__upload-modal__content" }, hr = {
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
      internalFolderInput: v,
      pickFiles: d,
      pickFolders: m,
      dropArea: u,
      queue: _,
      message: c,
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
            icon: t(wt),
            title: t(s)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", pr, [
            o("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: u,
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
                ref: d,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, h(t(s)("Select Files")), 513),
              o("button", {
                ref_key: "pickFolders",
                ref: m,
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
            t(c).length ? (i(), I(vt, {
              key: 0,
              onHidden: B[3] || (B[3] = (L) => c.value = ""),
              error: ""
            }, {
              default: G(() => [
                P(h(t(c)), 1)
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
const bt = { render: Ir }, Fr = { class: "vuefinder__unarchive-modal__content" }, Vr = { class: "vuefinder__unarchive-modal__items" }, Lr = {
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
}, Br = { class: "vuefinder__unarchive-modal__item-name" }, Hr = { class: "vuefinder__unarchive-modal__info" }, yt = /* @__PURE__ */ j({
  __name: "ModalUnarchive",
  setup(n) {
    const e = Y("ServiceContainer"), s = e.fs, l = U(s.path), { t: r } = e.i18n, v = b(e.modal.data.items[0]), d = b(""), m = b([]), u = () => {
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
          d.value = r(_.message);
        }
      });
    };
    return (_, c) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, h(t(r)("Unarchive")), 1),
        o("button", {
          type: "button",
          onClick: c[1] || (c[1] = (a) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(r)("Cancel")), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(bt),
            title: t(r)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", Fr, [
            o("div", Vr, [
              (i(!0), f(ne, null, re(m.value, (a) => (i(), f("p", {
                class: "vuefinder__unarchive-modal__item",
                key: a.path
              }, [
                a.type === "dir" ? (i(), f("svg", Lr, [...c[2] || (c[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (i(), f("svg", Rr, [...c[3] || (c[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Br, h(a.basename), 1)
              ]))), 128)),
              o("p", Hr, h(t(r)("The archive will be unarchived at")) + " (" + h(t(s).path.path) + ")", 1),
              d.value.length ? (i(), I(t(d), {
                key: 0,
                onHidden: c[0] || (c[0] = (a) => d.value = ""),
                error: ""
              }, {
                default: G(() => [
                  P(h(d.value), 1)
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
const kt = { render: Nr }, Pr = { class: "vuefinder__archive-modal__content" }, zr = { class: "vuefinder__archive-modal__form" }, Ur = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Or = { class: "vuefinder__archive-modal__file" }, Kr = {
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
}, Gr = { class: "vuefinder__archive-modal__file-name" }, Yr = ["placeholder"], xt = /* @__PURE__ */ j({
  __name: "ModalArchive",
  setup(n) {
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = U(l.path), v = b(""), d = b(""), m = b(e.modal.data.items), u = () => {
      m.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: m.value.map(({ path: _, type: c }) => ({ path: _, type: c })),
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file(s) archived.") });
        },
        onError: (_) => {
          d.value = s(_.message);
        }
      });
    };
    return (_, c) => (i(), I(be, null, {
      buttons: G(() => [
        o("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, h(t(s)("Archive")), 1),
        o("button", {
          type: "button",
          onClick: c[2] || (c[2] = (a) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(s)("Cancel")), 1)
      ]),
      default: G(() => [
        o("div", null, [
          D(xe, {
            icon: t(kt),
            title: t(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", Pr, [
            o("div", zr, [
              o("div", Ur, [
                (i(!0), f(ne, null, re(m.value, (a) => (i(), f("p", Or, [
                  a.type === "dir" ? (i(), f("svg", Kr, [...c[3] || (c[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (i(), f("svg", jr, [...c[4] || (c[4] = [
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
                "onUpdate:modelValue": c[0] || (c[0] = (a) => v.value = a),
                onKeyup: Ve(u, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Yr), [
                [Le, v.value]
              ]),
              d.value.length ? (i(), I(t(d), {
                key: 0,
                onHidden: c[1] || (c[1] = (a) => d.value = ""),
                error: ""
              }, {
                default: G(() => [
                  P(h(d.value), 1)
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
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = e.config, v = e.search, d = U(r.state), m = U(v.state), u = U(l.selectedItems);
    ue(() => d.value.fullScreen, () => {
      if (d.value.fullScreen) {
        const c = document.querySelector("body");
        c && (c.style.overflow = "hidden");
      } else {
        const c = document.querySelector("body");
        c && (c.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const _ = () => {
      r.set("view", d.value.view === "list" ? "grid" : "list");
    };
    return (c, a) => (i(), f("div", dl, [
      t(m).query.length ? (i(), f("div", gl, [
        o("div", wl, [
          P(h(t(s)("Search results for")) + " ", 1),
          o("span", bl, h(t(m).query), 1)
        ]),
        t(r).get("loadingIndicator") === "circular" && t(l).isLoading() ? (i(), I(t(et), { key: 0 })) : $("", !0)
      ])) : (i(), f("div", cl, [
        t(e).features.includes(t(ee).NEW_FOLDER) ? (i(), f("div", {
          key: 0,
          class: "mx-1.5",
          title: t(s)("New Folder"),
          onClick: a[0] || (a[0] = (p) => t(e).modal.open(ht, { items: t(u) }))
        }, [
          D(t(pt))
        ], 8, ul)) : $("", !0),
        t(e).features.includes(t(ee).NEW_FILE) ? (i(), f("div", {
          key: 1,
          class: "mx-1.5",
          title: t(s)("New File"),
          onClick: a[1] || (a[1] = (p) => t(e).modal.open(vr, { items: t(u) }))
        }, [
          D(t(gt))
        ], 8, vl)) : $("", !0),
        t(e).features.includes(t(ee).RENAME) ? (i(), f("div", {
          key: 2,
          class: "mx-1.5",
          title: t(s)("Rename"),
          onClick: a[2] || (a[2] = (p) => t(u).length !== 1 || t(e).modal.open(Ze, { items: t(u) }))
        }, [
          D(t(ut), {
            class: X(t(u).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, _l)) : $("", !0),
        t(e).features.includes(t(ee).DELETE) ? (i(), f("div", {
          key: 3,
          class: "mx-1.5",
          title: t(s)("Delete"),
          onClick: a[3] || (a[3] = (p) => !t(u).length || t(e).modal.open(Je, { items: t(u) }))
        }, [
          D(t(ct), {
            class: X(t(u).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ml)) : $("", !0),
        t(e).features.includes(t(ee).UPLOAD) ? (i(), f("div", {
          key: 4,
          class: "mx-1.5",
          title: t(s)("Upload"),
          onClick: a[4] || (a[4] = (p) => t(e).modal.open(Ar, { items: t(u) }))
        }, [
          D(t(wt))
        ], 8, fl)) : $("", !0),
        t(e).features.includes(t(ee).UNARCHIVE) && t(u).length === 1 && t(u)[0].mime_type === "application/zip" ? (i(), f("div", {
          key: 5,
          class: "mx-1.5",
          title: t(s)("Unarchive"),
          onClick: a[5] || (a[5] = (p) => !t(u).length || t(e).modal.open(yt, { items: t(u) }))
        }, [
          D(t(bt), {
            class: X(t(u).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, pl)) : $("", !0),
        t(e).features.includes(t(ee).ARCHIVE) ? (i(), f("div", {
          key: 6,
          class: "mx-1.5",
          title: t(s)("Archive"),
          onClick: a[6] || (a[6] = (p) => !t(u).length || t(e).modal.open(xt, { items: t(u) }))
        }, [
          D(t(kt), {
            class: X(t(u).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
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
          t(d).fullScreen ? (i(), I(t(nl), { key: 0 })) : (i(), I(t(Zr), { key: 1 }))
        ], 8, kl)) : $("", !0),
        o("div", {
          class: "mx-1.5",
          title: t(s)("Change View"),
          onClick: a[8] || (a[8] = (p) => t(m).query.length || _())
        }, [
          t(d).view === "grid" ? (i(), I(t(rl), {
            key: 0,
            class: X(["vf-toolbar-icon", t(m).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : $("", !0),
          t(d).view === "list" ? (i(), I(t(il), {
            key: 1,
            class: X(["vf-toolbar-icon", t(m).query.length ? "vf-toolbar-icon-disabled" : ""])
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
  return It((r, v) => ({
    get() {
      return r(), l.value;
    },
    set: $l((d) => {
      l.value = d, v();
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
  function v(c, a) {
    c.preventDefault(), l.getDraggedItem() === a.path || !a || a.type !== "dir" || r.value.some((g) => g.path === a.path || Jl(g.path) === a.path) ? c.dataTransfer && (c.dataTransfer.dropEffect = "none", c.dataTransfer.effectAllowed = "none") : (c.dataTransfer && (c.dataTransfer.dropEffect = "copy", c.dataTransfer.effectAllowed = "all"), c.currentTarget.classList.add(...e));
  }
  function d(c) {
    c.preventDefault();
    const a = c.currentTarget, p = Number(a.dataset[s] || 0);
    a.dataset[s] = String(p + 1);
  }
  function m(c) {
    c.preventDefault();
    const a = c.currentTarget, g = Number(a.dataset[s] || 0) - 1;
    g <= 0 ? (delete a.dataset[s], a.classList.remove(...e)) : a.dataset[s] = String(g);
  }
  function u(c, a) {
    if (!a) return;
    c.preventDefault();
    const p = c.currentTarget;
    delete p.dataset[s], p.classList.remove(...e);
    const g = c.dataTransfer?.getData("items") || "[]", x = JSON.parse(g).map((S) => l.sortedFiles.get().find((k) => k.path === S));
    l.clearDraggedItem(), n.modal.open(ft, { items: { from: x, to: a } });
  }
  function _(c) {
    return {
      dragover: (a) => v(a, c),
      dragenter: d,
      dragleave: m,
      drop: (a) => u(a, c)
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
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.search, r = e.fs, v = e.config, d = U(v.state), m = U(l.state), u = U(r.path), _ = U(r.loading), c = se(() => m.value?.searchMode ?? !1), a = b(null), p = ot(0, 100), g = b(5), T = b(!1), x = se(() => u.value?.breadcrumb ?? []);
    function S(R, H) {
      return R.length > H ? [R.slice(-H), R.slice(0, -H)] : [R, []];
    }
    const k = se(() => S(x.value, g.value)[0]), C = se(() => S(x.value, g.value)[1]);
    ue(p, () => {
      if (!a.value) return;
      const R = a.value.children;
      let H = 0, w = 0;
      const M = 5, te = 1;
      g.value = M, Be(() => {
        for (let de = R.length - 1; de >= 0; de--) {
          const Se = R[de];
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
    ve(() => {
      z.value = new ResizeObserver(F), a.value && z.value.observe(a.value);
    }), He(() => {
      z.value && z.value.disconnect();
    });
    const J = qe(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function oe(R = null) {
      R ??= x.value.length - 2;
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
      return x.value[R] ?? H;
    }
    const B = () => {
      W(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: u.value?.storage, path: u.value?.path } });
    }, L = () => {
      l.exitSearchMode(), k.value.length > 0 && !c.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: u.value?.storage ?? "local",
          path: x.value[x.value.length - 2]?.path ?? (u.value?.storage ?? "local") + "://"
        }
      });
    }, le = (R) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: u.value?.storage, path: R.path } }), T.value = !1;
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
      v.toggle("showTreeView");
    }, y = b(null), E = ot("", 400);
    ue(E, (R) => {
      e.emitter.emit("vf-toast-clear"), l.setQuery(R);
    }), ue(c, (R) => {
      R && Be(() => {
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
          class: X(["vuefinder__breadcrumb__toggle-tree", t(d).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, ta),
      o("span", {
        title: t(s)("Go up a directory")
      }, [
        D(t(Dl), ke(Ee(x.value.length && !c.value ? t(J).events(oe()) : {}), {
          onClick: L,
          class: x.value.length && !c.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
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
            onClick: H[1] || (H[1] = we((w) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(u).value?.storage ?? "local" } }), ["stop"]))
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
              onClick: we((te) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(u)?.storage, path: w.path } }), ["stop"])
            }), h(w.name), 17, ia)
          ]))), 128))
        ], 512),
        t(v).get("loadingIndicator") === "circular" && t(_) ? (i(), I(t(et), { key: 0 })) : $("", !0)
      ], 512), [
        [ge, !c.value]
      ]),
      ae(o("div", da, [
        o("div", null, [
          D(t(Nl))
        ]),
        ae(o("input", {
          ref_key: "searchInput",
          ref: y,
          onKeydown: Ve(W, ["esc"]),
          onBlur: K,
          "onUpdate:modelValue": H[4] || (H[4] = (w) => Ft(E) ? E.value = w : null),
          placeholder: t(s)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, ca), [
          [Le, t(E)]
        ]),
        D(t(Ul), { onClick: W })
      ], 512), [
        [ge, c.value]
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
    overscan: v = 2,
    containerPadding: d = 48
  } = e, m = n && typeof n.get == "function" ? U(n) : n, u = () => typeof r == "number" ? r : r.value, _ = b(0), c = b(6), a = b(600);
  let p = null;
  const g = se(() => Math.ceil(m.value.length / c.value)), T = se(() => g.value * u()), x = se(() => {
    const B = u(), L = Math.max(0, Math.floor(_.value / B) - v), le = Math.min(g.value, Math.ceil((_.value + a.value) / B) + v);
    return { start: L, end: le };
  }), S = se(() => {
    const { start: B, end: L } = x.value;
    return Array.from({ length: L - B }, (le, O) => B + O);
  }), k = () => a.value, C = () => {
    if (s.value) {
      const B = s.value.clientWidth - d;
      c.value = Math.max(Math.floor(B / l), 2);
    }
  }, F = (B) => {
    const L = B.target;
    _.value = L.scrollTop;
  };
  ue(() => m.value.length, () => {
    C();
  });
  const z = (B, L) => {
    const le = L * c.value;
    return B.slice(le, le + c.value);
  }, J = (B, L, le, O, ie) => {
    const V = [];
    for (let y = L; y <= le; y++)
      for (let E = O; E <= ie; E++) {
        const K = y * c.value + E;
        K < B.length && B[K] && V.push(B[K]);
      }
    return V;
  }, oe = (B) => ({
    row: Math.floor(B / c.value),
    col: B % c.value
  });
  return ve(async () => {
    await Be(), s.value && (a.value = s.value.clientHeight || 600), C(), window.addEventListener("resize", () => {
      s.value && (a.value = s.value.clientHeight || 600), C();
    }), s.value && "ResizeObserver" in window && (p = new ResizeObserver((B) => {
      const L = B[0];
      L && (a.value = Math.round(L.contentRect.height)), C();
    }), p.observe(s.value));
  }), He(() => {
    window.removeEventListener("resize", C), p && (p.disconnect(), p = null);
  }), {
    scrollTop: _,
    itemsPerRow: c,
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
  const { getItemPosition: e, getItemsInRange: s, getKey: l, selectionObject: r, rowHeight: v, itemWidth: d } = n, m = Math.floor(Math.random() * 2 ** 32).toString(), _ = Y("ServiceContainer").fs, c = U(_.selectedKeys), a = U(_.sortedFiles);
  U(_.selectedCount);
  const p = b(/* @__PURE__ */ new Set()), g = b(!1), T = b(!1), x = b(null), S = (y) => y.map((E) => E.getAttribute("data-key")).filter((E) => !!E), k = (y) => {
    y.selection.getSelection().forEach((E) => {
      y.selection.deselect(E, !0);
    });
  }, C = (y) => {
    c.value && c.value.forEach((E) => {
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
      const Q = r.value.getSelectables()[0]?.closest(".scroller-" + m);
      if (Q) {
        const Z = Q.getBoundingClientRect(), R = W.clientY - Z.top + Q.scrollTop, H = W.clientX - Z.left, w = Math.floor(R / v.value), M = Math.floor(H / d);
        x.value = { row: w, col: M };
      }
    }
  }, oe = (y) => {
    const E = y.selection, K = S(y.store.changed.added), W = S(y.store.changed.removed);
    T.value = !1, g.value = !0, K.forEach((Q) => {
      c.value && !c.value.has(Q) && p.value.add(Q), _.select(Q);
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
    L(y), k(y), C(y), _.setSelectedCount(c.value?.size || 0), g.value = !1, x.value = null;
  }, O = () => {
    r.value = new jt({
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
    }), r.value.on("beforestart", z), r.value.on("start", J), r.value.on("move", oe), r.value.on("stop", le);
  }, ie = () => {
    r.value && (r.value.destroy(), r.value = null);
  }, V = (y) => {
    T.value && (r.value?.clearSelection(), B(), T.value = !1);
    const E = y;
    !p.value.size && !T.value && !E?.ctrlKey && !E?.metaKey && (_.clearSelection(), r.value?.clearSelection());
  };
  return ve(() => {
    const y = (E) => {
      !E.buttons && g.value && (g.value = !1);
    };
    document.addEventListener("dragleave", y), He(() => {
      document.removeEventListener("dragleave", y);
    });
  }), {
    isDragging: g,
    selectionStarted: T,
    explorerId: m,
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
    return (r, v) => (i(), f("div", {
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
const St = { render: Va }, La = ["data-key", "data-row", "data-col", "draggable"], Ra = { key: 0 }, Ba = { class: "vuefinder__explorer__item-grid-content" }, Ha = ["data-src", "alt"], qa = { class: "vuefinder__explorer__item-title" }, Na = {
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
    const s = n, l = e, r = Y("ServiceContainer"), v = r.fs, d = r.config, m = se(() => [
      "file-item-" + s.explorerId,
      s.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      s.isSelected ? "vf-explorer-selected" : ""
    ]), u = se(() => ({
      opacity: s.isDragging || v.isCut(s.item.path) ? 0.5 : ""
    }));
    let _ = null;
    const c = b(null);
    let a = !1;
    const p = () => {
      _ && clearTimeout(_), g.value = !0;
    }, g = b(!0), T = (x) => {
      if (g.value = !1, _ && (x.preventDefault(), clearTimeout(_)), !a)
        a = !0, l("click", x), c.value = setTimeout(() => a = !1, 300);
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
      class: X(m.value),
      style: Me(u.value),
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
      t(d).get("pinnedFolders").find((k) => k.path === n.item.path) ? (i(), I(t(St), {
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
    ]), v = se(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${s.rowHeight}px`,
      transform: `translateY(${s.rowIndex * s.rowHeight}px)`
    })), d = se(() => s.view === "grid" ? {
      gridTemplateColumns: `repeat(${s.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (m, u) => (i(), f("div", {
      class: X(r.value),
      "data-row": n.rowIndex,
      style: Me(v.value)
    }, [
      o("div", {
        class: X(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Me(d.value)
      }, [
        (i(!0), f(ne, null, re(n.items, (_, c) => (i(), I(Ya, ke({
          key: _.path,
          item: _,
          view: n.view,
          compact: n.compact,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(_.path),
          "is-dragging": n.isDraggingItem(_.path),
          "row-index": n.rowIndex,
          "col-index": c
        }, Ee(n.dragNDropEvents(_)), {
          onClick: u[0] || (u[0] = (a) => l("click", a)),
          onDblclick: u[1] || (u[1] = (a) => l("dblclick", a)),
          onContextmenu: u[2] || (u[2] = (a) => l("contextmenu", a)),
          onDragstart: u[3] || (u[3] = (a) => l("dragstart", a)),
          onDragend: u[4] || (u[4] = (a) => l("dragend", a)),
          explorerId: n.explorerId
        }), null, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Wa));
  }
}), Qa = ["onClick"], Xa = /* @__PURE__ */ j({
  __name: "Toast",
  setup(n) {
    const e = Y("ServiceContainer"), { getStore: s } = e.storage, l = b(s("full-screen", !1)), r = b([]), v = (u) => u === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", d = (u) => {
      r.value.splice(u, 1);
    }, m = (u) => {
      let _ = r.value.findIndex((c) => c.id === u);
      _ !== -1 && d(_);
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
      D(Rt, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: G(() => [
          (i(!0), f(ne, null, re(r.value, (c, a) => (i(), f("div", {
            key: a,
            onClick: (p) => d(a),
            class: X(["vuefinder__toast__message", v(c.type)])
          }, h(c.label), 11, Qa))), 128))
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
    const e = Y("ServiceContainer"), s = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), l = Ie("dragImage"), r = rt(null), v = Ie("scrollContainer"), d = Ie("scrollContent"), m = e.search, u = e.fs, _ = e.config, c = U(_.state), a = U(m.state), p = U(u.sortedFiles), g = U(u.selectedKeys), T = U(u.loading), x = (A) => g.value?.has(A) ?? !1;
    let S = null;
    const k = b(null), C = Ie("customScrollBar"), F = Ie("customScrollBarContainer"), z = se(() => {
      const A = c.value.view, q = c.value.compactListView;
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
        scrollContainer: v,
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
    ue(() => _.get("view"), (A) => {
      A === "list" ? oe.value = 1 : y();
    }, { immediate: !0 }), ue(oe, (A) => {
      _.get("view") === "list" && A !== 1 && (oe.value = 1);
    });
    const w = (A) => p.value?.[A];
    ve(() => {
      if (W(), r.value && r.value.on("beforestart", ({ event: A }) => {
        const q = A?.target === d.value;
        if (!A?.metaKey && !A?.ctrlKey && !A?.altKey && !q)
          return !1;
      }), v.value && (S = new Gt({
        elements_selector: ".lazy",
        container: v.value
      })), ue(() => a.value.query, (A) => {
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
            k.value = q;
          },
          scroll: (q) => {
            const { scrollOffsetElement: N } = q.elements();
            v.value && v.value.scrollTo({ top: N.scrollTop, left: 0 });
          }
        });
        k.value = A;
      }
      v.value && v.value.addEventListener("scroll", () => {
        const A = k.value;
        if (!A) return;
        const { scrollOffsetElement: q } = A.elements();
        q.scrollTo({ top: v.value.scrollTop, left: 0 });
      });
    }), Bt(() => {
      if (S && S.update(), k.value && C.value && v.value) {
        const q = v.value.scrollHeight > v.value.clientHeight, N = C.value;
        N.style.display = q ? "block" : "none", N.style.height = `${B.value}px`;
      }
    }), He(() => {
      Q(), S && (S.destroy(), S = null), k.value && (k.value.destroy(), k.value = null);
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
    }, de = (A) => {
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
    return (A, q) => (i(), f("div", Ja, [
      o("div", {
        ref: "customScrollBarContainer",
        class: X(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(c).view === "grid" }, { "search-active": t(a).hasQuery }]])
      }, [
        o("div", Za, null, 512)
      ], 2),
      t(c).view === "list" || t(a).query.length ? (i(), f("div", ei, [
        o("div", {
          onClick: q[0] || (q[0] = (N) => t(u).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          P(h(t(J)("Name")) + " ", 1),
          ae(D(Ne, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "basename"]
          ])
        ]),
        t(a).query.length ? $("", !0) : (i(), f("div", {
          key: 0,
          onClick: q[1] || (q[1] = (N) => t(u).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          P(h(t(J)("Size")) + " ", 1),
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
          P(h(t(J)("Filepath")) + " ", 1),
          ae(D(Ne, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "path"]
          ])
        ])) : $("", !0),
        t(a).query.length ? $("", !0) : (i(), f("div", {
          key: 2,
          onClick: q[3] || (q[3] = (N) => t(u).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          P(h(t(J)("Date")) + " ", 1),
          ae(D(Ne, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "last_modified"]
          ])
        ]))
      ])) : $("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: v,
        class: X(["vuefinder__explorer__selector-area", "scroller-" + t(E)]),
        onScroll: q[5] || (q[5] = //@ts-ignore
        (...N) => t(le) && t(le)(...N))
      }, [
        t(_).get("loadingIndicator") === "linear" && t(T) ? (i(), f("div", ti)) : $("", !0),
        t(_).get("loadingIndicator") === "circular" && t(T) ? (i(), f("div", ni)) : $("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: d,
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
            compact: t(c).compactListView,
            "show-path": !0,
            "is-dragging-item": H,
            "is-selected": x,
            "drag-n-drop-events": (me) => t(s).events(me),
            explorerId: t(E),
            onClick: M,
            onDblclick: de,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(c).view === "grid" ? (i(!0), f(ne, { key: 1 }, re(t(L), (N) => (i(), I(Ge, {
            key: N,
            "row-index": N,
            "row-height": z.value,
            view: "grid",
            "items-per-row": t(oe),
            items: t(O)(t(p), N),
            "show-thumbnails": t(c).showThumbnails,
            "is-dragging-item": H,
            "is-selected": x,
            "drag-n-drop-events": (me) => t(s).events(me),
            explorerId: t(E),
            onClick: M,
            onDblclick: de,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (i(!0), f(ne, { key: 2 }, re(t(L), (N) => (i(), I(Ge, {
            key: N,
            "row-index": N,
            "row-height": z.value,
            view: "list",
            items: w(N) ? [w(N)] : [],
            compact: t(c).compactListView,
            "is-dragging-item": H,
            "is-selected": x,
            "drag-n-drop-events": (me) => t(s).events(me),
            explorerId: t(E),
            onClick: M,
            onDblclick: de,
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
    const e = Y("ServiceContainer"), s = e.search, l = U(s.state), r = b(null), v = b([]), d = ze({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (c) => {
      v.value = c;
    });
    const m = (c) => c.link(e, v.value), u = (c) => {
      e.emitter.emit("vf-contextmenu-hide"), c.action(e, v.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: c, items: a, target: p = null }) => {
      if (d.items = e.contextMenuItems.filter((g) => g.show(e, {
        searchQuery: l.query,
        items: a,
        target: p
      })), l.query)
        if (p)
          e.emitter.emit("vf-context-selected", [p]);
        else
          return;
      else !p && !l.query ? e.emitter.emit("vf-context-selected", []) : a.length > 1 && a.some((g) => g.path === p.path) ? e.emitter.emit("vf-context-selected", a) : e.emitter.emit("vf-context-selected", [p]);
      _(c);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      d.active = !1;
    });
    const _ = (c) => {
      const a = e.root, p = e.root.getBoundingClientRect(), g = a.getBoundingClientRect();
      let T = c.clientX - p.left, x = c.clientY - p.top;
      d.active = !0, Be(() => {
        const S = r.value?.getBoundingClientRect();
        let k = S?.height ?? 0, C = S?.width ?? 0;
        T = g.right - c.pageX + window.scrollX < C ? T - C : T, x = g.bottom - c.pageY + window.scrollY < k ? x - k : x, d.positions = {
          left: String(T) + "px",
          top: String(x) + "px"
        };
      });
    };
    return (c, a) => ae((i(), f("ul", {
      ref_key: "contextmenu",
      ref: r,
      class: X([d.active ? "vuefinder__context-menu--active" : "vuefinder__context-menu--inactive", "vuefinder__context-menu"]),
      style: Me(d.positions)
    }, [
      (i(!0), f(ne, null, re(d.items, (p) => (i(), f("li", {
        class: "vuefinder__context-menu__item",
        key: p.title
      }, [
        p.link ? (i(), f("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: m(p),
          download: m(p),
          onClick: a[0] || (a[0] = (g) => t(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, h(p.title(t(e).i18n)), 1)
        ], 8, si)) : (i(), f("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => u(p)
        }, [
          o("span", null, h(p.title(t(e).i18n)), 1)
        ], 8, ri))
      ]))), 128))
    ], 6)), [
      [ge, d.active]
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
const $t = { render: ii }, di = {
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
    const e = Y("ServiceContainer"), { t: s } = e.i18n, l = e.fs, r = e.search, v = U(r.state), d = U(l.sortedFiles), m = U(l.path), u = U(l.selectedCount), _ = U(l.storages), c = (p) => {
      const g = p.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: g } });
    }, a = se(() => {
      const p = e.selectButton.multiple ? u.value > 0 : u.value === 1;
      return e.selectButton.active && p;
    });
    return (p, g) => (i(), f("div", vi, [
      o("div", _i, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: t(s)("Storage")
        }, [
          o("div", fi, [
            D(t($t))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: t(m)?.storage,
            onChange: c,
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
          t(v).hasQuery ? (i(), f("span", wi, h(t(d).value.length) + " items found. ", 1)) : $("", !0),
          o("span", bi, h(t(u) > 0 ? `${t(u)} item(s) selected.` : ""), 1)
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
          onClick: g[1] || (g[1] = (T) => t(e).modal.open(dt))
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
const Ct = { render: Ci }, Ei = {
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
const Et = { render: Di }, Ii = {
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
const Mt = { render: Fi };
function Tt(n, e) {
  const s = n.findIndex((l) => l.path === e.path);
  s > -1 ? n[s] = e : n.push(e);
}
const Vi = { class: "vuefinder__folder-loader-indicator" }, Li = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, At = /* @__PURE__ */ j({
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
    const e = n, s = Y("ServiceContainer"), { t: l } = s.i18n, r = lt(n, "modelValue"), v = b(!1);
    ue(
      () => r.value,
      () => d()?.folders.length || m()
    );
    function d() {
      return s.treeViewData.find((u) => u.path === e.path);
    }
    const m = () => {
      v.value = !0, s.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          storage: e.storage,
          path: e.path
        }
      }).then((u) => {
        Tt(s.treeViewData, { path: e.path, type: "dir", ...u });
      }).catch((u) => {
      }).finally(() => {
        v.value = !1;
      });
    };
    return (u, _) => (i(), f("div", Vi, [
      v.value ? (i(), I(t(et), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (i(), f("div", Li, [
        r.value && d()?.folders.length ? (i(), I(t(Mt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : $("", !0),
        r.value ? $("", !0) : (i(), I(t(Et), {
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
    const e = Y("ServiceContainer"), s = e.fs, l = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), r = b({}), v = U(s.path), d = n, m = b(null);
    ve(() => {
      d.path === d.storage + "://" && m.value && Xe(m.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const u = se(() => e.treeViewData.find((_) => _.path === d.path)?.folders || []);
    return (_, c) => {
      const a = qt("TreeSubfolderList", !0);
      return i(), f("ul", {
        ref_key: "parentSubfolderList",
        ref: m,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (i(!0), f(ne, null, re(u.value, (p) => (i(), f("li", {
          key: p.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", ke(Ee(t(l).events({ ...p, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (g) => r.value[p.path] = !r.value[p.path]
            }, [
              D(At, {
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
              onClick: (g) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: d.storage, path: p.path } })
            }, [
              o("div", Hi, [
                t(v)?.path === p.path ? (i(), I(t(Ct), { key: 0 })) : (i(), I(t(Ue), { key: 1 }))
              ]),
              o("div", {
                class: X(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(v)?.path === p.path
                }])
              }, h(p.basename), 3)
            ], 40, Bi)
          ], 16),
          o("div", qi, [
            ae(D(a, {
              storage: d.storage,
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
    const e = Y("ServiceContainer"), s = e.fs, l = b(!1), r = n, v = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), d = U(s.path), m = se(() => r.storage === d.value?.storage), u = {
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
    function _(c) {
      c === d.value?.storage ? l.value = !l.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: c } }));
    }
    return (c, a) => (i(), f(ne, null, [
      o("div", {
        onClick: a[2] || (a[2] = (p) => _(n.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        o("div", ke(Ee(t(v).events(u), !0), {
          class: ["vuefinder__treestorageitem__info", m.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          o("div", {
            class: X(["vuefinder__treestorageitem__icon", m.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            D(t($t))
          ], 2),
          o("div", null, h(n.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: a[1] || (a[1] = we((p) => l.value = !l.value, ["stop"]))
        }, [
          D(At, {
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
    const e = lt(n, "modelValue");
    return (s, l) => (i(), f("div", zi, [
      o("div", Ui, [
        e.value ? (i(), I(t(Mt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : $("", !0),
        e.value ? $("", !0) : (i(), I(t(Et), {
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
    const e = Y("ServiceContainer"), { t: s } = e.i18n, { getStore: l, setStore: r } = e.storage, v = e.fs, d = e.config, m = U(d.state), u = U(v.sortedFiles), _ = U(v.path), c = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), a = b(190), p = b(l("pinned-folders-opened", !0));
    ue(p, (S) => r("pinned-folders-opened", S));
    const g = (S) => {
      d.set("pinnedFolders", d.get("pinnedFolders").filter((k) => k.path !== S.path));
    }, T = (S) => {
      const k = S.clientX, C = S.target.parentElement;
      if (!C) return;
      const F = C.getBoundingClientRect().width;
      C.classList.remove("transition-[width]"), C.classList.add("transition-none");
      const z = (oe) => {
        a.value = F + oe.clientX - k, a.value < 50 && (a.value = 0, d.set("showTreeView", !1)), a.value > 50 && d.set("showTreeView", !0);
      }, J = () => {
        const oe = C.getBoundingClientRect();
        a.value = oe.width, C.classList.add("transition-[width]"), C.classList.remove("transition-none"), window.removeEventListener("mousemove", z), window.removeEventListener("mouseup", J);
      };
      window.addEventListener("mousemove", z), window.addEventListener("mouseup", J);
    }, x = b(null);
    return ve(() => {
      x.value && Xe(x.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), ue(u, (S) => {
      const k = S.filter((C) => C.type === "dir");
      Tt(e.treeViewData, {
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
        onClick: k[0] || (k[0] = (C) => t(d).toggle("showTreeView")),
        class: X(["vuefinder__treeview__overlay", t(m).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      o("div", {
        style: Me(t(m).showTreeView ? "min-width:100px;max-width:75%; width: " + a.value + "px" : "width: 0"),
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
                D(t(St), { class: "vuefinder__treeview__pin-icon" }),
                o("div", Gi, h(t(s)("Pinned Folders")), 1)
              ]),
              D(Oi, {
                modelValue: p.value,
                "onUpdate:modelValue": k[1] || (k[1] = (C) => p.value = C)
              }, null, 8, ["modelValue"])
            ]),
            p.value ? (i(), f("ul", Yi, [
              (i(!0), f(ne, null, re(t(m).pinnedFolders, (C) => (i(), f("li", {
                key: C.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", ke(Ee(t(c).events(C), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (F) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: C.storage, path: C.path } })
                }), [
                  t(_)?.path !== C.path ? (i(), I(t(Ue), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : $("", !0),
                  t(_)?.path === C.path ? (i(), I(t(Ct), {
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
              t(m).pinnedFolders.length ? $("", !0) : (i(), f("li", Ji, [
                o("div", Zi, h(t(s)("No folders pinned")), 1)
              ]))
            ])) : $("", !0)
          ]),
          (i(!0), f(ne, null, re(t(v).storages.get(), (C) => (i(), f("div", {
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
function Re(...n) {
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
    action: (n) => n.modal.open(ht),
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
      const s = n.config, l = s.get("pinnedFolders"), r = l.concat(e.filter((v) => l.findIndex((d) => d.path === v.path) === -1));
      s.set("pinnedFolders", r);
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
      const s = n.config, l = s.get("pinnedFolders");
      s.set("pinnedFolders", l.filter((r) => !e.find((v) => v.path === r.path)));
    },
    show: Re(
      _e({ target: "one", targetType: "dir" }),
      (n, e) => n.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) !== -1
    )
  },
  {
    id: pe.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(_t, { storage: e[0]?.storage, item: e[0] }),
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
    action: (n, e) => n.modal.open(xt, { items: e }),
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
    action: (n, e) => n.modal.open(yt, { items: e }),
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
    const s = e, l = n, r = dn(l, Y("VueFinderOptions"));
    Nt("ServiceContainer", r);
    const v = r.config, d = r.fs, m = U(v.state), u = U(d.selectedItems);
    Zs(r);
    let _ = null;
    r.emitter.on("vf-fetch-abort", () => {
      _ && _.abort(), d.setLoading(!1);
    }), r.emitter.on("vf-fetch", ({ params: a, body: p = null, onSuccess: g = null, onError: T = null, noCloseModal: x = !1 }) => {
      ["index", "search"].includes(a.q) && (_ && _.abort(), d.setLoading(!0)), a.adapter = a.storage, _ = new AbortController();
      const S = _.signal;
      r.requester.send({
        url: "",
        method: a.m || "get",
        params: a,
        body: p,
        abortSignal: S
      }).then((k) => {
        d.setPath(k.dirname), v.get("persist") && v.set("path", k.dirname), x || r.modal.close(), d.setFiles(k.files), d.clearSelection(), d.setSelectedCount(0), d.setStorages(k.storages), g && g(k);
      }).catch((k) => {
        console.error(k), T ? T(k) : k && typeof k == "object" && "message" in k && r.emitter.emit("vf-toast-push", { label: k.message, type: "error" });
      }).finally(() => {
        ["index", "search"].includes(a.q) && d.setLoading(!1);
      });
    });
    function c(a) {
      let p = {};
      a && a.includes("://") && (p = {
        storage: a.split("://")[0],
        path: a
      }), r.emitter.emit("vf-fetch", {
        params: { q: "index", storage: d.path.get().storage, ...p },
        onError: l.onError ?? ((g) => {
          g && typeof g == "object" && "message" in g && r.emitter.emit("vf-toast-push", { label: g.message, type: "error" });
        })
      });
    }
    return ve(() => {
      ue(() => l.path, (p) => {
        c(p);
      });
      const a = v.get("persist") ? v.get("path") : l.path;
      d.setPath(a), c(a), r.emitter.on("vf-select", (p) => {
        r.selectedItems = p, s("select", p);
      }), ue(() => d.path.get().path, (p) => {
        s("update:path", p);
      }), ue(u, (p) => {
        s("select", p);
      });
    }), (a, p) => (i(), f("div", od, [
      o("div", {
        class: X(t(r).theme.actualValue)
      }, [
        o("div", {
          class: X([t(m).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: Me(t(m).fullScreen ? "" : "max-height: " + n.maxHeight),
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
