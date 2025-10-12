import { reactive as Ue, watch as de, ref as y, shallowRef as at, useTemplateRef as De, defineComponent as K, inject as j, onMounted as ce, nextTick as Ve, createElementBlock as f, openBlock as a, withKeys as Ie, unref as t, createElementVNode as s, withModifiers as ke, renderSlot as Ne, createBlock as F, resolveDynamicComponent as Je, toDisplayString as p, onUnmounted as Re, normalizeClass as X, computed as ne, withCtx as z, createVNode as D, createCommentVNode as C, Fragment as te, renderList as oe, createTextVNode as N, withDirectives as se, vModelSelect as ot, vModelText as Fe, onBeforeUnmount as At, customRef as Dt, mergeProps as ye, toHandlers as Ce, vShow as ge, isRef as It, Teleport as Ft, normalizeStyle as Ee, normalizeProps as Lt, TransitionGroup as Vt, onUpdated as Rt, mergeModels as Bt, useModel as it, resolveComponent as Ht, provide as qt, Transition as Nt } from "vue";
import { useStore as Q } from "@nanostores/vue";
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
    const r = Object.assign({}, o.headers, l, e.headers), c = Object.assign({}, o.params, e.params), m = o.baseUrl + e.url, v = e.method;
    let _;
    if (v !== "get")
      if (e.body instanceof FormData) {
        const i = e.body;
        o.body != null && Object.entries(this.config.body).forEach(([u, h]) => {
          i.append(u, String(h));
        }), _ = i;
      } else {
        const i = Object.assign({}, e.body ?? {});
        o.body != null && Object.assign(i, this.config.body), _ = i;
      }
    const d = { url: m, method: v, headers: r, params: c, body: _ };
    if (o.transformRequest != null) {
      const i = o.transformRequest({ url: m, method: v, headers: r, params: c, body: _ ?? null });
      i.url != null && (d.url = i.url), i.method != null && (d.method = i.method), i.params != null && (d.params = i.params), i.headers != null && (d.headers = i.headers), i.body != null && (d.body = i.body);
    }
    return d;
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
    const o = this.transformRequestParams(e), l = e.responseType || "json", r = { method: e.method, headers: o.headers, signal: e.abortSignal }, c = o.url + "?" + new URLSearchParams(o.params);
    if (o.method !== "get" && o.body != null) {
      let v;
      o.body instanceof FormData ? v = e.body : (v = JSON.stringify(o.body), r.headers["Content-Type"] = "application/json"), r.body = v;
    }
    this.config.fetchParams && Object.assign(r, this.config.fetchParams);
    const m = await this.customFetch(c, r);
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
  function r(_, d) {
    o[_] = d;
  }
  function c(_) {
    delete o[_];
  }
  function m() {
    Object.keys(o).forEach((_) => c(_));
  }
  return { getStore: (_, d = null) => _ in o ? o[_] : d, setStore: r, removeStore: c, clearStore: m };
}
async function Xt(n, e) {
  const o = e[n];
  return typeof o == "function" ? (await o()).default : o;
}
function Jt(n, e, o, l) {
  const { getStore: r, setStore: c } = n, m = y({}), v = y(r("locale", e)), _ = (u, h = e) => {
    Xt(u, l).then((g) => {
      m.value = g, c("locale", u), v.value = u, c("translations", g), Object.values(l).length > 1 && (o.emit("vf-toast-push", { label: "The language is set to " + u }), o.emit("vf-language-saved"));
    }).catch(() => {
      h ? (o.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), _(h, null)) : o.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  de(v, (u) => {
    _(u);
  }), !r("locale") && !Object.keys(l).length ? _(e) : m.value = r("translations");
  const d = (u, ...h) => h.length ? d(u = u.replace("%s", String(h.shift())), ...h) : u;
  function i(u, ...h) {
    return m.value && Object.prototype.hasOwnProperty.call(m.value, u) ? d(m.value[u] || u, ...h) : d(u, ...h);
  }
  return Ue({ t: i, locale: v });
}
const J = {
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
}, Zt = Object.values(J), en = "3.0.0-dev";
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
  const r = parseFloat(l[1] || "0"), c = (l[2] || "").toLowerCase(), m = e[c] ?? 0;
  return Math.round(r * Math.pow(1024, m));
}
const $e = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function nn(n, e) {
  const o = y($e.SYSTEM), l = y($e.LIGHT);
  o.value = n.getStore("theme", e ?? $e.SYSTEM);
  const r = window.matchMedia("(prefers-color-scheme: dark)"), c = (m) => {
    o.value === $e.DARK || o.value === $e.SYSTEM && m.matches ? l.value = $e.DARK : l.value = $e.LIGHT;
  };
  return c(r), r.addEventListener("change", c), {
    value: o,
    actualValue: l,
    set(m) {
      o.value = m, m !== $e.SYSTEM ? n.setStore("theme", m) : n.removeStore("theme"), c(r);
    }
  };
}
function on() {
  const n = at(null), e = y(!1), o = y();
  return { visible: e, type: n, data: o, open: (c, m = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, n.value = c, o.value = m;
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
  }), l = (d = {}) => {
    const i = o.get(), u = { ...Ge, ...d, ...i };
    o.set(u);
  }, r = (d) => o.get()[d], c = () => o.get(), m = (d, i) => {
    const u = o.get();
    typeof d == "object" && d !== null ? o.set({ ...u, ...d }) : o.set({ ...u, [d]: i });
  };
  return {
    // Store atom
    state: o,
    // Methods
    init: l,
    get: r,
    set: m,
    toggle: (d) => {
      const i = o.get();
      m(d, !i[d]);
    },
    all: c,
    reset: () => {
      o.set({ ...Ge });
    }
  };
}, rn = (n) => sn(n);
function ln(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const o = Number(n) || 0, l = Number(e) || 0;
  return o === l ? 0 : o < l ? -1 : 1;
}
const an = () => {
  const n = pe(""), e = pe([]), o = pe([]), l = pe({ active: !1, column: "", order: "" }), r = pe(/* @__PURE__ */ new Set()), c = pe({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), m = pe(null), v = pe(0), _ = pe(!1), d = qe([n], (w) => {
    const b = (w || "local://").trim(), G = b.indexOf("://"), ee = G >= 0 ? b.slice(0, G) : "", fe = (G >= 0 ? b.slice(G + 3) : b).split("/").filter(Boolean);
    let he = "";
    const Me = fe.map((Te) => (he = he ? `${he}/${Te}` : Te, { basename: Te, name: Te, path: ee ? `${ee}://${he}` : he, type: "dir" }));
    return { storage: ee, breadcrumb: Me, path: b };
  }), i = qe([o, l], (w, b) => {
    const { active: G, column: ee, order: Se } = b;
    if (!G || !ee) return w;
    const fe = Se === "asc" ? 1 : -1;
    return w.slice().sort((he, Me) => ln(he[ee], Me[ee]) * fe);
  }), u = qe([o, r], (w, b) => b.size === 0 ? [] : w.filter((G) => b.has(G.path)));
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: n,
    sort: l,
    selectedKeys: r,
    selectedCount: v,
    loading: _,
    draggedItem: m,
    clipboardItems: c,
    // Computed values
    path: d,
    sortedFiles: i,
    selectedItems: u,
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
      b.add(w), r.set(b), v.set(b.size);
    },
    deselect: (w) => {
      const b = new Set(r.get());
      b.delete(w), r.set(b), v.set(b.size);
    },
    toggleSelect: (w) => {
      const b = new Set(r.get());
      b.has(w) ? b.delete(w) : b.add(w), r.set(b), v.set(b.size);
    },
    selectAll: () => {
      const w = new Set(o.get().map((b) => b.path));
      r.set(w), v.set(w.size);
    },
    clearSelection: () => {
      r.set(/* @__PURE__ */ new Set()), v.set(0);
    },
    setSelection: (w) => {
      const b = new Set(w ?? []);
      r.set(b), v.set(b.size);
    },
    setSelectedCount: (w) => {
      v.set(w);
    },
    setLoading: (w) => {
      _.set(!!w);
    },
    isLoading: () => _.get(),
    setClipboard: (w, b) => {
      const G = o.get().filter((ee) => b.has(ee.path));
      c.set({
        type: w,
        path: d.get().path,
        items: new Set(G)
      });
    },
    isCut: (w) => {
      const b = c.get();
      return b.type === "cut" && Array.from(b.items).some((G) => G.path === w);
    },
    isCopied: (w) => {
      const b = c.get();
      return b.type === "copy" && Array.from(b.items).some((G) => G.path === w);
    },
    clearClipboard: () => {
      c.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
    },
    getClipboard: () => c.get(),
    setDraggedItem: (w) => {
      m.set(w);
    },
    getDraggedItem: () => m.get(),
    clearDraggedItem: () => {
      m.set(null);
    }
  };
}, dn = () => an(), st = {
  query: "",
  searchMode: !1
}, cn = (n) => {
  const e = pe(st), o = qe(e, (i) => i.query.length > 0);
  return {
    // Store atom
    searchAtom: e,
    // Computed values
    hasQuery: o,
    // Methods
    setQuery: (i) => {
      const u = e.get();
      e.set({ ...u, query: i ?? "" });
    },
    enterSearchMode: () => {
      const i = e.get();
      e.set({ ...i, searchMode: !0 });
    },
    exitSearchMode: () => {
      e.set({ query: "", searchMode: !1 });
    },
    get: (i) => e.get()[i],
    set: (i, u) => {
      const h = e.get();
      typeof i == "object" && i !== null ? e.set({ ...h, ...i }) : e.set({ ...h, [i]: u });
    },
    all: () => e.get(),
    reset: () => {
      e.set({ ...st });
    }
  };
}, un = (n) => cn(), vn = (n, e) => {
  const o = Qt(n.id), l = Ut(), r = nn(o, n.theme), c = e.i18n, m = n.locale ?? e.locale, v = rn(n.id), _ = dn(), d = un(n.id), i = (u) => Array.isArray(u) ? u : Zt;
  return Ue({
    id: n.id,
    config: v,
    fs: _,
    search: d,
    // app version
    version: en,
    // root element
    root: De("root"),
    // app id
    debug: n.debug,
    // Event Bus
    emitter: l,
    // storage
    storage: o,
    // localization object
    i18n: Jt(o, m, l, c),
    // modal state
    modal: on(),
    // http object
    requester: Wt(n.request),
    // active features
    features: i(n.features),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // theme state
    theme: r,
    // human readable file sizes
    filesize: v.get("metricUnits") ? ct : dt,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // custom icon
    customIcon: n.icon,
    // selectButton state
    selectButton: n.selectButton
  });
}, _n = { class: "vuefinder__modal-layout__container" }, mn = { class: "vuefinder__modal-layout__content" }, fn = { class: "vuefinder__modal-layout__footer" }, we = /* @__PURE__ */ K({
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
      onKeyup: r[1] || (r[1] = Ie((c) => t(o).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      r[2] || (r[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", _n, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: r[0] || (r[0] = ke((c) => t(o).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", mn, [
              Ne(l.$slots, "default")
            ]),
            s("div", fn, [
              Ne(l.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}), hn = { class: "vuefinder__modal-header" }, pn = { class: "vuefinder__modal-header__icon-container" }, gn = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, xe = /* @__PURE__ */ K({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, o) => (a(), f("div", hn, [
      s("div", pn, [
        (a(), F(Je(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("h3", gn, p(n.title), 1)
    ]));
  }
}), wn = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: o }) {
    const l = j("ServiceContainer"), r = y(!1), { t: c } = l.i18n;
    let m = null;
    const v = () => {
      clearTimeout(m), r.value = !0, m = setTimeout(() => {
        r.value = !1;
      }, 2e3);
    };
    return ce(() => {
      l.emitter.on(n.on, v);
    }), Re(() => {
      clearTimeout(m);
    }), {
      shown: r,
      t: c
    };
  }
}, bn = (n, e) => {
  const o = n.__vccOpts || n;
  for (const [l, r] of e)
    o[l] = r;
  return o;
}, yn = { key: 1 };
function kn(n, e, o, l, r, c) {
  return a(), f("div", {
    class: X(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    n.$slots.default ? Ne(n.$slots, "default", { key: 0 }) : (a(), f("span", yn, p(l.t("Saved.")), 1))
  ], 2);
}
const Ae = /* @__PURE__ */ bn(wn, [["render", kn]]), xn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Sn(n, e) {
  return a(), f("svg", xn, [...e[0] || (e[0] = [
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
const $n = { render: Sn }, Cn = { class: "vuefinder__about-modal__content" }, En = { class: "vuefinder__about-modal__main" }, Mn = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Tn = ["onClick", "aria-current"], An = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Dn = { class: "vuefinder__about-modal__description" }, In = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Fn = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Ln = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Vn = { class: "vuefinder__about-modal__description" }, Rn = { class: "vuefinder__about-modal__settings" }, Bn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Hn = { class: "vuefinder__about-modal__setting-input" }, qn = ["checked"], Nn = { class: "vuefinder__about-modal__setting-label" }, Un = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Pn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, On = { class: "vuefinder__about-modal__setting-input" }, zn = ["checked"], Kn = { class: "vuefinder__about-modal__setting-label" }, jn = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Gn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Yn = { class: "vuefinder__about-modal__setting-input" }, Wn = ["checked"], Qn = { class: "vuefinder__about-modal__setting-label" }, Xn = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Jn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Zn = { class: "vuefinder__about-modal__setting-input" }, eo = ["checked"], to = { class: "vuefinder__about-modal__setting-label" }, no = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, oo = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, so = { class: "vuefinder__about-modal__setting-input" }, ro = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, lo = { class: "vuefinder__about-modal__setting-label" }, ao = ["label"], io = ["value"], co = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, uo = { class: "vuefinder__about-modal__setting-input" }, vo = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, _o = { class: "vuefinder__about-modal__setting-label" }, mo = ["label"], fo = ["value"], ho = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, po = { class: "vuefinder__about-modal__shortcuts" }, go = { class: "vuefinder__about-modal__shortcut" }, wo = { class: "vuefinder__about-modal__shortcut" }, bo = { class: "vuefinder__about-modal__shortcut" }, yo = { class: "vuefinder__about-modal__shortcut" }, ko = { class: "vuefinder__about-modal__shortcut" }, xo = { class: "vuefinder__about-modal__shortcut" }, So = { class: "vuefinder__about-modal__shortcut" }, $o = { class: "vuefinder__about-modal__shortcut" }, Co = { class: "vuefinder__about-modal__shortcut" }, Eo = { class: "vuefinder__about-modal__shortcut" }, Mo = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, To = { class: "vuefinder__about-modal__description" }, ut = /* @__PURE__ */ K({
  __name: "ModalAbout",
  setup(n) {
    const e = j("ServiceContainer"), o = e.config, { clearStore: l } = e.storage, { t: r } = e.i18n, c = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, m = ne(() => [
      { name: r("About"), key: c.ABOUT, current: !1 },
      { name: r("Settings"), key: c.SETTINGS, current: !1 },
      { name: r("Shortcuts"), key: c.SHORTCUTS, current: !1 },
      { name: r("Reset"), key: c.RESET, current: !1 }
    ]), v = y("about"), _ = async () => {
      o.reset(), l(), location.reload();
    }, d = (M) => {
      e.theme.set(M), e.emitter.emit("vf-theme-saved");
    }, i = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? ct : dt, e.emitter.emit("vf-metric-units-saved");
    }, u = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, h = () => {
      o.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, g = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: E } = j("VueFinderOptions"), S = Object.fromEntries(
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
      }).filter(([M]) => Object.keys(E).includes(M))
    ), x = ne(() => ({
      system: r("System"),
      light: r("Light"),
      dark: r("Dark")
    }));
    return (M, I) => (a(), F(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: I[3] || (I[3] = (U) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(r)("Close")), 1)
      ]),
      default: z(() => [
        s("div", Cn, [
          D(xe, {
            icon: t($n),
            title: "Vuefinder " + t(e).version
          }, null, 8, ["icon", "title"]),
          s("div", En, [
            s("div", null, [
              s("div", null, [
                s("nav", Mn, [
                  (a(!0), f(te, null, oe(m.value, (U) => (a(), f("button", {
                    key: U.name,
                    onClick: (Z) => v.value = U.key,
                    class: X([U.key === v.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": U.current ? "page" : void 0
                  }, p(U.name), 11, Tn))), 128))
                ])
              ])
            ]),
            v.value === c.ABOUT ? (a(), f("div", An, [
              s("div", Dn, p(t(r)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              s("a", In, p(t(r)("Project home")), 1),
              s("a", Fn, p(t(r)("Follow on GitHub")), 1)
            ])) : C("", !0),
            v.value === c.SETTINGS ? (a(), f("div", Ln, [
              s("div", Vn, p(t(r)("Customize your experience with the following settings")), 1),
              s("div", Rn, [
                s("fieldset", null, [
                  s("div", Bn, [
                    s("div", Hn, [
                      s("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: t(o).get("metricUnits"),
                        onChange: i,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, qn)
                    ]),
                    s("div", Nn, [
                      s("label", Un, [
                        N(p(t(r)("Use Metric Units")) + " ", 1),
                        D(Ae, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: z(() => [
                            N(p(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Pn, [
                    s("div", On, [
                      s("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: t(o).get("compactListView"),
                        onChange: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, zn)
                    ]),
                    s("div", Kn, [
                      s("label", jn, [
                        N(p(t(r)("Compact list view")) + " ", 1),
                        D(Ae, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: z(() => [
                            N(p(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Gn, [
                    s("div", Yn, [
                      s("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: t(o).get("persist"),
                        onChange: g,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Wn)
                    ]),
                    s("div", Qn, [
                      s("label", Xn, [
                        N(p(t(r)("Persist path on reload")) + " ", 1),
                        D(Ae, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: z(() => [
                            N(p(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Jn, [
                    s("div", Zn, [
                      s("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: t(o).get("showThumbnails"),
                        onChange: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, eo)
                    ]),
                    s("div", to, [
                      s("label", no, [
                        N(p(t(r)("Show thumbnails")) + " ", 1),
                        D(Ae, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: z(() => [
                            N(p(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", oo, [
                    s("div", so, [
                      s("label", ro, p(t(r)("Theme")), 1)
                    ]),
                    s("div", lo, [
                      se(s("select", {
                        id: "theme",
                        "onUpdate:modelValue": I[0] || (I[0] = (U) => t(e).theme.value = U),
                        onChange: I[1] || (I[1] = (U) => d(U.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Theme")
                        }, [
                          (a(!0), f(te, null, oe(x.value, (U, Z) => (a(), f("option", { value: Z }, p(U), 9, io))), 256))
                        ], 8, ao)
                      ], 544), [
                        [ot, t(e).theme.value]
                      ]),
                      D(Ae, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: z(() => [
                          N(p(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t(e).features.includes(t(J).LANGUAGE) && Object.keys(t(S)).length > 1 ? (a(), f("div", co, [
                    s("div", uo, [
                      s("label", vo, p(t(r)("Language")), 1)
                    ]),
                    s("div", _o, [
                      se(s("select", {
                        id: "language",
                        "onUpdate:modelValue": I[2] || (I[2] = (U) => t(e).i18n.locale = U),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Language")
                        }, [
                          (a(!0), f(te, null, oe(t(S), (U, Z) => (a(), f("option", { value: Z }, p(U), 9, fo))), 256))
                        ], 8, mo)
                      ], 512), [
                        [ot, t(e).i18n.locale]
                      ]),
                      D(Ae, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: z(() => [
                          N(p(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : C("", !0)
                ])
              ])
            ])) : C("", !0),
            v.value === c.SHORTCUTS ? (a(), f("div", ho, [
              s("div", po, [
                s("div", go, [
                  s("div", null, p(t(r)("Rename")), 1),
                  I[4] || (I[4] = s("kbd", null, "F2", -1))
                ]),
                s("div", wo, [
                  s("div", null, p(t(r)("Refresh")), 1),
                  I[5] || (I[5] = s("kbd", null, "F5", -1))
                ]),
                s("div", bo, [
                  N(p(t(r)("Delete")) + " ", 1),
                  I[6] || (I[6] = s("kbd", null, "Del", -1))
                ]),
                s("div", yo, [
                  N(p(t(r)("Escape")) + " ", 1),
                  I[7] || (I[7] = s("div", null, [
                    s("kbd", null, "Esc")
                  ], -1))
                ]),
                s("div", ko, [
                  N(p(t(r)("Select All")) + " ", 1),
                  I[8] || (I[8] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "A")
                  ], -1))
                ]),
                s("div", xo, [
                  N(p(t(r)("Search")) + " ", 1),
                  I[9] || (I[9] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "F")
                  ], -1))
                ]),
                s("div", So, [
                  N(p(t(r)("Toggle Sidebar")) + " ", 1),
                  I[10] || (I[10] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "E")
                  ], -1))
                ]),
                s("div", $o, [
                  N(p(t(r)("Open Settings")) + " ", 1),
                  I[11] || (I[11] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, ",")
                  ], -1))
                ]),
                s("div", Co, [
                  N(p(t(r)("Toggle Full Screen")) + " ", 1),
                  I[12] || (I[12] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "Enter")
                  ], -1))
                ]),
                s("div", Eo, [
                  N(p(t(r)("Preview")) + " ", 1),
                  I[13] || (I[13] = s("div", null, [
                    s("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : C("", !0),
            v.value === c.RESET ? (a(), f("div", Mo, [
              s("div", To, p(t(r)("Reset all settings to default")), 1),
              s("button", {
                onClick: _,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, p(t(r)("Reset Settings")), 1)
            ])) : C("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ao = ["title"], be = /* @__PURE__ */ K({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const o = e, l = j("ServiceContainer"), { t: r } = l.i18n, c = y(!1), m = y(null), v = y(m.value?.innerHTML);
    de(v, () => c.value = !1);
    const _ = () => {
      o("hidden"), c.value = !0;
    };
    return (d, i) => (a(), f("div", null, [
      c.value ? C("", !0) : (a(), f("div", {
        key: 0,
        ref_key: "strMessage",
        ref: m,
        class: X(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ne(d.$slots, "default"),
        s("div", {
          class: "vuefinder__message__close",
          onClick: _,
          title: t(r)("Close")
        }, [...i[0] || (i[0] = [
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
        ])], 8, Ao)
      ], 2))
    ]));
  }
}), Do = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Io(n, e) {
  return a(), f("svg", Do, [...e[0] || (e[0] = [
    s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const vt = { render: Io }, Fo = { class: "vuefinder__delete-modal__content" }, Lo = { class: "vuefinder__delete-modal__form" }, Vo = { class: "vuefinder__delete-modal__description" }, Ro = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Bo = { class: "vuefinder__delete-modal__file" }, Ho = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qo = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, No = { class: "vuefinder__delete-modal__file-name" }, Uo = { class: "vuefinder__delete-modal__warning" }, et = /* @__PURE__ */ K({
  __name: "ModalDelete",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = y(e.modal.data.items), c = y(""), m = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: l.path.storage,
          path: l.path.path
        },
        body: {
          items: r.value.map(({ path: v, type: _ }) => ({ path: v, type: _ }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("Files deleted.") });
        },
        onError: (v) => {
          c.value = o(v.message);
        }
      });
    };
    return (v, _) => (a(), F(we, null, {
      buttons: z(() => [
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
        s("div", Uo, p(t(o)("This action cannot be undone.")), 1)
      ]),
      default: z(() => [
        s("div", null, [
          D(xe, {
            icon: t(vt),
            title: t(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", Fo, [
            s("div", Lo, [
              s("p", Vo, p(t(o)("Are you sure you want to delete these files?")), 1),
              s("div", Ro, [
                (a(!0), f(te, null, oe(r.value, (d) => (a(), f("p", Bo, [
                  d.type === "dir" ? (a(), f("svg", Ho, [..._[2] || (_[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), f("svg", qo, [..._[3] || (_[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", No, p(d.basename), 1)
                ]))), 256))
              ]),
              c.value.length ? (a(), F(be, {
                key: 0,
                onHidden: _[0] || (_[0] = (d) => c.value = ""),
                error: ""
              }, {
                default: z(() => [
                  N(p(c.value), 1)
                ]),
                _: 1
              })) : C("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Po = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Oo(n, e) {
  return a(), f("svg", Po, [...e[0] || (e[0] = [
    s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const _t = { render: Oo }, zo = { class: "vuefinder__rename-modal__content" }, Ko = { class: "vuefinder__rename-modal__item" }, jo = { class: "vuefinder__rename-modal__item-info" }, Go = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yo = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wo = { class: "vuefinder__rename-modal__item-name" }, tt = /* @__PURE__ */ K({
  __name: "ModalRename",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = y(e.modal.data.items[0]), c = y(e.modal.data.items[0].basename), m = y(""), v = () => {
      c.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          storage: l.path.storage,
          path: l.path.path
        },
        body: {
          item: r.value.path,
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
    return (_, d) => (a(), F(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, p(t(o)("Rename")), 1),
        s("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(o)("Cancel")), 1)
      ]),
      default: z(() => [
        s("div", null, [
          D(xe, {
            icon: t(_t),
            title: t(o)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", zo, [
            s("div", Ko, [
              s("p", jo, [
                r.value.type === "dir" ? (a(), f("svg", Go, [...d[3] || (d[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (a(), f("svg", Yo, [...d[4] || (d[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Wo, p(r.value.basename), 1)
              ]),
              se(s("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => c.value = i),
                onKeyup: Ie(v, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Fe, c.value]
              ]),
              m.value.length ? (a(), F(be, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => m.value = ""),
                error: ""
              }, {
                default: z(() => [
                  N(p(m.value), 1)
                ]),
                _: 1
              })) : C("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Qo = { class: "vuefinder__text-preview" }, Xo = { class: "vuefinder__text-preview__header" }, Jo = ["title"], Zo = { class: "vuefinder__text-preview__actions" }, es = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, ts = { key: 1 }, ns = /* @__PURE__ */ K({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = y(""), r = y(""), c = y(null), m = y(!1), v = y(""), _ = y(!1), d = j("ServiceContainer"), { t: i } = d.i18n;
    ce(() => {
      d.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", storage: d.modal.data.storage, path: d.modal.data.item.path },
        responseType: "text"
      }).then((g) => {
        l.value = g, o("success");
      });
    });
    const u = () => {
      m.value = !m.value, r.value = l.value;
    }, h = () => {
      v.value = "", _.value = !1, d.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          storage: d.modal.data.storage,
          path: d.modal.data.item.path
        },
        body: {
          content: r.value
        },
        responseType: "text"
      }).then((g) => {
        v.value = i("Updated."), l.value = g, o("success"), m.value = !m.value;
      }).catch((g) => {
        v.value = i(g.message), _.value = !0;
      });
    };
    return (g, E) => (a(), f("div", Qo, [
      s("div", Xo, [
        s("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(d).modal.data.item.path
        }, p(t(d).modal.data.item.basename), 9, Jo),
        s("div", Zo, [
          m.value ? (a(), f("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__text-preview__save-button"
          }, p(t(i)("Save")), 1)) : C("", !0),
          t(d).features.includes(t(J).EDIT) ? (a(), f("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: E[0] || (E[0] = ($) => u())
          }, p(m.value ? t(i)("Cancel") : t(i)("Edit")), 1)) : C("", !0)
        ])
      ]),
      s("div", null, [
        m.value ? (a(), f("div", ts, [
          se(s("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": E[1] || (E[1] = ($) => r.value = $),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Fe, r.value]
          ])
        ])) : (a(), f("pre", es, p(l.value), 1)),
        v.value.length ? (a(), F(be, {
          key: 2,
          onHidden: E[2] || (E[2] = ($) => v.value = ""),
          error: _.value
        }, {
          default: z(() => [
            N(p(v.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : C("", !0)
      ])
    ]));
  }
}), os = { class: "vuefinder__image-preview" }, ss = { class: "vuefinder__image-preview__header" }, rs = ["title"], ls = { class: "vuefinder__image-preview__actions" }, as = { class: "vuefinder__image-preview__image-container" }, is = ["src"], ds = /* @__PURE__ */ K({
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = j("ServiceContainer"), { t: r } = l.i18n, c = y(null), m = y(null), v = y(!1), _ = y(""), d = y(!1), i = () => {
      v.value = !v.value, v.value && c.value ? m.value = new Ot(c.value, {
        crop(h) {
        }
      }) : m.value && m.value.destroy();
    }, u = () => {
      m.value && m.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (h) => {
          _.value = "", d.value = !1;
          const g = new FormData();
          g.set("file", h), l.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              storage: l.modal.data.storage,
              path: l.modal.data.item.path
            },
            body: g
          }).then((E) => {
            _.value = r("Updated."), c.value && (c.value.src = l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item)), i(), o("success");
          }).catch((E) => {
            _.value = r(E.message), d.value = !0;
          });
        }
      );
    };
    return ce(() => {
      o("success");
    }), (h, g) => (a(), f("div", os, [
      s("div", ss, [
        s("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, p(t(l).modal.data.item.basename), 9, rs),
        s("div", ls, [
          v.value ? (a(), f("button", {
            key: 0,
            onClick: u,
            class: "vuefinder__image-preview__crop-button"
          }, p(t(r)("Crop")), 1)) : C("", !0),
          t(l).features.includes(t(J).EDIT) ? (a(), f("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: g[0] || (g[0] = (E) => i())
          }, p(v.value ? t(r)("Cancel") : t(r)("Edit")), 1)) : C("", !0)
        ])
      ]),
      s("div", as, [
        s("img", {
          ref_key: "image",
          ref: c,
          class: "vuefinder__image-preview__image",
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          alt: ""
        }, null, 8, is)
      ]),
      _.value.length ? (a(), F(be, {
        key: 0,
        onHidden: g[1] || (g[1] = (E) => _.value = ""),
        error: d.value
      }, {
        default: z(() => [
          N(p(_.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : C("", !0)
    ]));
  }
}), cs = { class: "vuefinder__default-preview" }, us = { class: "vuefinder__default-preview__header" }, vs = ["title"], _s = /* @__PURE__ */ K({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = j("ServiceContainer"), l = e;
    return ce(() => {
      l("success");
    }), (r, c) => (a(), f("div", cs, [
      s("div", us, [
        s("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: t(o).modal.data.item.path
        }, p(t(o).modal.data.item.basename), 9, vs)
      ]),
      c[0] || (c[0] = s("div", null, null, -1))
    ]));
  }
}), ms = { class: "vuefinder__video-preview" }, fs = ["title"], hs = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, ps = ["src"], gs = /* @__PURE__ */ K({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = j("ServiceContainer"), l = e, r = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ce(() => {
      l("success");
    }), (c, m) => (a(), f("div", ms, [
      s("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, p(t(o).modal.data.item.basename), 9, fs),
      s("div", null, [
        s("video", hs, [
          s("source", {
            src: r(),
            type: "video/mp4"
          }, null, 8, ps),
          m[0] || (m[0] = N(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), ws = { class: "vuefinder__audio-preview" }, bs = ["title"], ys = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, ks = ["src"], xs = /* @__PURE__ */ K({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = j("ServiceContainer"), r = () => l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item);
    return ce(() => {
      o("success");
    }), (c, m) => (a(), f("div", ws, [
      s("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: t(l).modal.data.item.path
      }, p(t(l).modal.data.item.basename), 9, bs),
      s("div", null, [
        s("audio", ys, [
          s("source", {
            src: r(),
            type: "audio/mpeg"
          }, null, 8, ks),
          m[0] || (m[0] = N(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Ss = { class: "vuefinder__pdf-preview" }, $s = ["title"], Cs = ["data"], Es = ["src"], Ms = /* @__PURE__ */ K({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = j("ServiceContainer"), l = e, r = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ce(() => {
      l("success");
    }), (c, m) => (a(), f("div", Ss, [
      s("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, p(t(o).modal.data.item.basename), 9, $s),
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
}, Ls = { class: "vuefinder__preview-modal__details" }, Vs = { class: "font-bold" }, Rs = { class: "font-bold pl-2" }, Bs = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Hs = ["download", "href"], mt = /* @__PURE__ */ K({
  __name: "ModalPreview",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = y(!1), r = (m) => (e.modal.data.item.mime_type ?? "").startsWith(m), c = e.features.includes(J.PREVIEW);
    return c || (l.value = !0), (m, v) => (a(), F(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: v[6] || (v[6] = (_) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(o)("Close")), 1),
        t(e).features.includes(t(J).DOWNLOAD) ? (a(), f("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item),
          href: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item)
        }, p(t(o)("Download")), 9, Hs)) : C("", !0)
      ]),
      default: z(() => [
        s("div", null, [
          s("div", As, [
            t(c) ? (a(), f("div", Ds, [
              r("text") ? (a(), F(ns, {
                key: 0,
                onSuccess: v[0] || (v[0] = (_) => l.value = !0)
              })) : r("image") ? (a(), F(ds, {
                key: 1,
                onSuccess: v[1] || (v[1] = (_) => l.value = !0)
              })) : r("video") ? (a(), F(gs, {
                key: 2,
                onSuccess: v[2] || (v[2] = (_) => l.value = !0)
              })) : r("audio") ? (a(), F(xs, {
                key: 3,
                onSuccess: v[3] || (v[3] = (_) => l.value = !0)
              })) : r("application/pdf") ? (a(), F(Ms, {
                key: 4,
                onSuccess: v[4] || (v[4] = (_) => l.value = !0)
              })) : (a(), F(_s, {
                key: 5,
                onSuccess: v[5] || (v[5] = (_) => l.value = !0)
              }))
            ])) : C("", !0),
            s("div", Is, [
              l.value === !1 ? (a(), f("div", Fs, [
                v[7] || (v[7] = s("svg", {
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
              ])) : C("", !0)
            ])
          ])
        ]),
        s("div", Ls, [
          s("div", null, [
            s("span", Vs, p(t(o)("File Size")) + ": ", 1),
            N(p(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", Rs, p(t(o)("Last Modified")) + ": ", 1),
            N(" " + p(t(Ts)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(J).DOWNLOAD) ? (a(), f("div", Bs, [
          s("span", null, p(t(o)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : C("", !0)
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
  return a(), f("svg", qs, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Us = { render: Ns }, Ps = { class: "vuefinder__move-modal__content" }, Os = { class: "vuefinder__move-modal__description" }, zs = { class: "vuefinder__move-modal__files vf-scrollbar" }, Ks = {
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
}, Gs = { class: "vuefinder__move-modal__file-name" }, Ys = { class: "vuefinder__move-modal__target-title" }, Ws = { class: "vuefinder__move-modal__target-directory" }, Qs = { class: "vuefinder__move-modal__target-path" }, Xs = { class: "vuefinder__move-modal__selected-items" }, Js = /* @__PURE__ */ K({
  __name: "ModalTransfer",
  props: {
    q: {},
    title: {},
    body: {},
    successBtn: {},
    successText: {}
  },
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = n, c = y(e.modal.data.items.from), m = e.modal.data.items.to, v = y(""), _ = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: r.q,
          m: "post",
          storage: l.path.get().storage,
          path: l.path.get().path
        },
        body: {
          items: c.value.map(({ path: d, type: i }) => ({ path: d, type: i })),
          item: m.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: r.successText });
        },
        onError: (d) => {
          v.value = o(d.message);
        }
      });
    };
    return (d, i) => (a(), F(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: _,
          class: "vf-btn vf-btn-primary"
        }, p(r.successBtn), 1),
        s("button", {
          type: "button",
          onClick: i[1] || (i[1] = (u) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(o)("Cancel")), 1),
        s("div", Xs, p(t(o)("%s item(s) selected.", c.value.length)), 1)
      ]),
      default: z(() => [
        s("div", null, [
          D(xe, {
            icon: t(Us),
            title: r.title
          }, null, 8, ["icon", "title"]),
          s("div", Ps, [
            s("p", Os, p(r.body), 1),
            s("div", zs, [
              (a(!0), f(te, null, oe(c.value, (u) => (a(), f("div", {
                class: "vuefinder__move-modal__file",
                key: u.path
              }, [
                s("div", null, [
                  u.type === "dir" ? (a(), f("svg", Ks, [...i[2] || (i[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), f("svg", js, [...i[3] || (i[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", Gs, p(u.path), 1)
              ]))), 128))
            ]),
            s("h4", Ys, p(t(o)("Target Directory")), 1),
            s("p", Ws, [
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
              s("span", Qs, p(t(m).path), 1)
            ]),
            v.value.length ? (a(), F(be, {
              key: 0,
              onHidden: i[0] || (i[0] = (u) => v.value = ""),
              error: ""
            }, {
              default: z(() => [
                N(p(v.value), 1)
              ]),
              _: 1
            })) : C("", !0)
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
    return (l, r) => (a(), F(Js, {
      title: t(o)("Move files"),
      body: t(o)("Are you sure you want to move these files"),
      "success-btn": t(o)("Yes, Move!"),
      "success-text": t(o)("Files moved.")
    }, null, 8, ["title", "body", "success-btn", "success-text"]));
  }
}), _e = {
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
  const e = n.search, o = n.fs, l = n.config, r = Q(e.searchAtom), c = Q(o.selectedItems), m = (v) => {
    if (v.code === _e.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible && !r.value?.searchMode) {
      if (v.code === _e.F2 && n.features.includes(J.RENAME) && c.value.length === 1 && n.modal.open(tt, { items: c.value }), v.code === _e.F5 && n.emitter.emit("vf-fetch", { params: { q: "index", storage: o.path.get().storage, path: o.path.get().path } }), v.code === _e.DELETE && c.value.length === 0 && n.modal.open(et, { items: c.value }), v.ctrlKey && v.code === _e.BACKSLASH && n.modal.open(ut), v.ctrlKey && v.code === _e.KEY_F && n.features.includes(J.SEARCH) && (e.enterSearchMode(), v.preventDefault()), v.ctrlKey && v.code === _e.KEY_E && (l.toggle("showTreeView"), v.preventDefault()), v.ctrlKey && v.code === _e.ENTER && (l.toggle("fullScreen"), n.root.focus()), v.ctrlKey && v.code === _e.KEY_A && (o.selectAll(), v.preventDefault()), v.code === _e.SPACE && c.value.length === 1 && c.value[0]?.type !== "dir" && n.modal.open(mt, { storage: o.path.get().storage, item: c.value[0] }), v.metaKey && v.code === _e.KEY_C) {
        if (c.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("copy", new Set(c.value.map((_) => _.path))), n.emitter.emit("vf-toast-push", { label: c.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", c.value.length) }), v.preventDefault();
      }
      if (v.metaKey && v.code === _e.KEY_X) {
        if (c.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("cut", new Set(c.value.map((_) => _.path))), n.emitter.emit("vf-toast-push", { label: c.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", c.value.length) }), v.preventDefault();
      }
      if (v.metaKey && v.code === _e.KEY_V) {
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
        v.preventDefault();
      }
    }
  };
  ce(() => {
    n.root.addEventListener("keydown", m);
  }), At(() => {
    n.root.removeEventListener("keydown", m);
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
  return a(), f("svg", er, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ft = { render: tr }, nr = { class: "vuefinder__new-folder-modal__content" }, or = { class: "vuefinder__new-folder-modal__form" }, sr = { class: "vuefinder__new-folder-modal__description" }, rr = ["placeholder"], ht = /* @__PURE__ */ K({
  __name: "ModalNewFolder",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = y(""), c = y(""), m = () => {
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
        onError: (v) => {
          c.value = o(v.message);
        }
      });
    };
    return (v, _) => (a(), F(we, null, {
      buttons: z(() => [
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
      default: z(() => [
        s("div", null, [
          D(xe, {
            icon: t(ft),
            title: t(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", nr, [
            s("div", or, [
              s("p", sr, p(t(o)("Create a new folder")), 1),
              se(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => r.value = d),
                onKeyup: Ie(m, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(o)("Folder Name"),
                type: "text"
              }, null, 40, rr), [
                [Fe, r.value]
              ]),
              c.value.length ? (a(), F(be, {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: z(() => [
                  N(p(c.value), 1)
                ]),
                _: 1
              })) : C("", !0)
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
  return a(), f("svg", lr, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const pt = { render: ar }, ir = { class: "vuefinder__new-file-modal__content" }, dr = { class: "vuefinder__new-file-modal__form" }, cr = { class: "vuefinder__new-file-modal__description" }, ur = ["placeholder"], vr = /* @__PURE__ */ K({
  __name: "ModalNewFile",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = y(""), c = y(""), m = () => {
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
        onError: (v) => {
          c.value = o(v.message);
        }
      });
    };
    return (v, _) => (a(), F(we, null, {
      buttons: z(() => [
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
      default: z(() => [
        s("div", null, [
          D(xe, {
            icon: t(pt),
            title: t(o)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", ir, [
            s("div", dr, [
              s("p", cr, p(t(o)("Create a new file")), 1),
              se(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => r.value = d),
                onKeyup: Ie(m, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(o)("File Name"),
                type: "text"
              }, null, 40, ur), [
                [Fe, r.value]
              ]),
              c.value.length ? (a(), F(be, {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: z(() => [
                  N(p(c.value), 1)
                ]),
                _: 1
              })) : C("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ie = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function _r() {
  const n = j("ServiceContainer"), { t: e } = n.i18n, o = n.fs, l = n.config, r = y({ QUEUE_ENTRY_STATUS: ie }), c = y(null), m = y(null), v = y(null), _ = y(null), d = y(null), i = y(null), u = y([]), h = y(""), g = y(!1), E = y(!1);
  let $;
  const S = (O) => u.value.findIndex((ae) => ae.id === O), x = (O, ae) => $.addFile({ name: ae || O.name, type: O.type, data: O, source: "Local" }), M = (O) => O.status === ie.DONE ? "text-green-600" : O.status === ie.ERROR || O.status === ie.CANCELED ? "text-red-600" : "", I = (O) => O.status === ie.DONE ? "✓" : O.status === ie.ERROR || O.status === ie.CANCELED ? "!" : "...", U = () => _.value?.click(), Z = () => n.modal.close(), re = () => {
    if (g.value || !u.value.filter((O) => O.status !== ie.DONE).length) {
      g.value || (h.value = e("Please select file to upload first."));
      return;
    }
    h.value = "", $.retryAll(), $.upload();
  }, B = () => {
    $.cancelAll(), u.value.forEach((O) => {
      O.status !== ie.DONE && (O.status = ie.CANCELED, O.statusName = e("Canceled"));
    }), g.value = !1;
  }, R = (O) => {
    g.value || ($.removeFile(O.id), u.value.splice(S(O.id), 1));
  }, le = (O) => {
    if (!g.value)
      if ($.cancelAll(), O) {
        const ae = u.value.filter((L) => L.status !== ie.DONE);
        u.value = [], ae.forEach((L) => x(L.originalFile, L.name));
      } else
        u.value = [];
  };
  return ce(() => {
    $ = new zt({
      debug: n.debug,
      restrictions: { maxFileSize: tn(l.maxFileSize ?? "10mb") },
      locale: n.i18n.t("uppy"),
      onBeforeFileAdded: (L, k) => {
        if (k[L.id] != null) {
          const P = S(L.id);
          u.value[P]?.status === ie.PENDING && (h.value = $.i18n("noDuplicates", { fileName: L.name })), u.value = u.value.filter((Y) => Y.id !== L.id);
        }
        return u.value.push({
          id: L.id,
          name: L.name,
          size: n.filesize(L.size),
          status: ie.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: L.data
        }), !0;
      }
    }), $.use(Kt, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), $.on("restriction-failed", (L, k) => {
      const T = u.value[S(L.id)];
      T && R(T), h.value = k.message;
    }), $.on("upload", () => {
      const L = n.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", storage: o.path.storage, path: o.path.path }
      });
      $.setMeta({ ...L.body });
      const k = $.getPlugin("XHRUpload");
      k && (k.opts.method = L.method, k.opts.endpoint = L.url + "?" + new URLSearchParams(L.params), k.opts.headers = L.headers), delete L.headers["Content-Type"], g.value = !0, u.value.forEach((T) => {
        T.status !== ie.DONE && (T.percent = null, T.status = ie.UPLOADING, T.statusName = e("Pending upload"));
      });
    }), $.on("upload-progress", (L, k) => {
      const T = k.bytesTotal ?? 1, P = Math.floor(k.bytesUploaded / T * 100), Y = S(L.id);
      Y !== -1 && u.value[Y] && (u.value[Y].percent = `${P}%`);
    }), $.on("upload-success", (L) => {
      const k = u.value[S(L.id)];
      k && (k.status = ie.DONE, k.statusName = e("Done"));
    }), $.on("upload-error", (L, k) => {
      const T = u.value[S(L.id)];
      T && (T.percent = null, T.status = ie.ERROR, T.statusName = k?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : k?.message || e("Unknown Error"));
    }), $.on("error", (L) => {
      h.value = L.message, g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), $.on("complete", () => {
      g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), _.value?.addEventListener("click", () => m.value?.click()), d.value?.addEventListener("click", () => v.value?.click()), i.value?.addEventListener("dragover", (L) => {
      L.preventDefault(), E.value = !0;
    }), i.value?.addEventListener("dragleave", (L) => {
      L.preventDefault(), E.value = !1;
    });
    const O = (L, k) => {
      k.isFile && k.file((T) => L(k, T)), k.isDirectory && k.createReader().readEntries((T) => T.forEach((P) => O(L, P)));
    };
    i.value?.addEventListener("drop", (L) => {
      L.preventDefault(), E.value = !1;
      const k = /^[/\\](.+)/, T = L.dataTransfer?.items;
      T && Array.from(T).forEach((P) => {
        P.kind === "file" && O((Y, W) => {
          const V = k.exec(Y.fullPath);
          x(W, V ? V[1] : W.name);
        }, P.webkitGetAsEntry());
      });
    });
    const ae = (L) => {
      const k = L.target, T = k.files;
      if (T) {
        for (const P of T) x(P);
        k.value = "";
      }
    };
    m.value?.addEventListener("change", ae), v.value?.addEventListener("change", ae);
  }), {
    container: c,
    internalFileInput: m,
    internalFolderInput: v,
    pickFiles: _,
    pickFolders: d,
    dropArea: i,
    queue: u,
    message: h,
    uploading: g,
    hasFilesInDropArea: E,
    definitions: r,
    openFileSelector: U,
    upload: re,
    cancel: B,
    remove: R,
    clear: le,
    close: Z,
    getClassNameForEntry: M,
    getIconForEntry: I
  };
}
function Xe(n, e = 14) {
  const o = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(o), "$2..$4");
}
const mr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function fr(n, e) {
  return a(), f("svg", mr, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const gt = { render: fr }, hr = { class: "vuefinder__upload-modal__content" }, pr = {
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
}, Tr = ["disabled"], Ar = /* @__PURE__ */ K({
  __name: "ModalUpload",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, {
      container: l,
      internalFileInput: r,
      internalFolderInput: c,
      pickFiles: m,
      pickFolders: v,
      dropArea: _,
      queue: d,
      message: i,
      uploading: u,
      hasFilesInDropArea: h,
      definitions: g,
      openFileSelector: E,
      upload: $,
      cancel: S,
      remove: x,
      clear: M,
      close: I,
      getClassNameForEntry: U,
      getIconForEntry: Z
    } = _r();
    return (re, B) => (a(), F(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: t(u),
          onClick: B[4] || (B[4] = ke(
            //@ts-ignore
            (...R) => t($) && t($)(...R),
            ["prevent"]
          ))
        }, p(t(o)("Upload")), 9, Tr),
        t(u) ? (a(), f("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: B[5] || (B[5] = ke(
            //@ts-ignore
            (...R) => t(S) && t(S)(...R),
            ["prevent"]
          ))
        }, p(t(o)("Cancel")), 1)) : (a(), f("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: B[6] || (B[6] = ke(
            //@ts-ignore
            (...R) => t(I) && t(I)(...R),
            ["prevent"]
          ))
        }, p(t(o)("Close")), 1))
      ]),
      default: z(() => [
        s("div", null, [
          D(xe, {
            icon: t(gt),
            title: t(o)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", hr, [
            s("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: _,
              onClick: B[0] || (B[0] = //@ts-ignore
              (...R) => t(E) && t(E)(...R))
            }, [
              t(h) ? (a(), f("div", pr, p(t(o)("Release to drop these files.")), 1)) : (a(), f("div", gr, p(t(o)("Drag and drop the files/folders to here or click here.")), 1))
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
              }, p(t(o)("Select Files")), 513),
              s("button", {
                ref_key: "pickFolders",
                ref: v,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, p(t(o)("Select Folders")), 513),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(u),
                onClick: B[1] || (B[1] = (R) => t(M)(!1))
              }, p(t(o)("Clear all")), 9, wr),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(u),
                onClick: B[2] || (B[2] = (R) => t(M)(!0))
              }, p(t(o)("Clear only successful")), 9, br)
            ], 512),
            s("div", yr, [
              (a(!0), f(te, null, oe(t(d), (R) => (a(), f("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: R.id
              }, [
                s("span", {
                  class: X(["vuefinder__upload-modal__file-icon", t(U)(R)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: p(t(Z)(R))
                  }, null, 8, kr)
                ], 2),
                s("div", xr, [
                  s("div", Sr, p(t(Xe)(R.name, 40)) + " (" + p(R.size) + ") ", 1),
                  s("div", $r, p(t(Xe)(R.name, 16)) + " (" + p(R.size) + ") ", 1),
                  s("div", {
                    class: X(["vuefinder__upload-modal__file-status", t(U)(R)])
                  }, [
                    N(p(R.statusName) + " ", 1),
                    R.status === t(g).QUEUE_ENTRY_STATUS.UPLOADING ? (a(), f("b", Cr, p(R.percent), 1)) : C("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: X(["vuefinder__upload-modal__file-remove", t(u) ? "disabled" : ""]),
                  title: t(o)("Delete"),
                  disabled: t(u),
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
                ])], 10, Er)
              ]))), 128)),
              t(d).length ? C("", !0) : (a(), f("div", Mr, p(t(o)("No files selected!")), 1))
            ]),
            t(i).length ? (a(), F(be, {
              key: 0,
              onHidden: B[3] || (B[3] = (R) => i.value = ""),
              error: ""
            }, {
              default: z(() => [
                N(p(t(i)), 1)
              ]),
              _: 1
            })) : C("", !0)
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
          ref: c,
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
  return a(), f("svg", Dr, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const wt = { render: Ir }, Fr = { class: "vuefinder__unarchive-modal__content" }, Lr = { class: "vuefinder__unarchive-modal__items" }, Vr = {
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
}, Br = { class: "vuefinder__unarchive-modal__item-name" }, Hr = { class: "vuefinder__unarchive-modal__info" }, bt = /* @__PURE__ */ K({
  __name: "ModalUnarchive",
  setup(n) {
    const e = j("ServiceContainer"), o = e.fs, { t: l } = e.i18n, r = y(e.modal.data.items[0]), c = y(""), m = y([]), v = () => {
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
        onError: (_) => {
          c.value = l(_.message);
        }
      });
    };
    return (_, d) => (a(), F(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, p(t(l)("Unarchive")), 1),
        s("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(l)("Cancel")), 1)
      ]),
      default: z(() => [
        s("div", null, [
          D(xe, {
            icon: t(wt),
            title: t(l)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", Fr, [
            s("div", Lr, [
              (a(!0), f(te, null, oe(m.value, (i) => (a(), f("p", {
                class: "vuefinder__unarchive-modal__item",
                key: i.path
              }, [
                i.type === "dir" ? (a(), f("svg", Vr, [...d[2] || (d[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (a(), f("svg", Rr, [...d[3] || (d[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Br, p(i.basename), 1)
              ]))), 128)),
              s("p", Hr, p(t(l)("The archive will be unarchived at")) + " (" + p(t(o).path.path) + ")", 1),
              c.value.length ? (a(), F(be, {
                key: 0,
                onHidden: d[0] || (d[0] = (i) => c.value = ""),
                error: ""
              }, {
                default: z(() => [
                  N(p(c.value), 1)
                ]),
                _: 1
              })) : C("", !0)
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
  return a(), f("svg", qr, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const yt = { render: Nr }, Ur = { class: "vuefinder__archive-modal__content" }, Pr = { class: "vuefinder__archive-modal__form" }, Or = { class: "vuefinder__archive-modal__files vf-scrollbar" }, zr = { class: "vuefinder__archive-modal__file" }, Kr = {
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
}, Gr = { class: "vuefinder__archive-modal__file-name" }, Yr = ["placeholder"], kt = /* @__PURE__ */ K({
  __name: "ModalArchive",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = y(""), c = y(""), m = y(e.modal.data.items), v = () => {
      m.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: l.path.storage,
          path: l.path.path
        },
        body: {
          items: m.value.map(({ path: _, type: d }) => ({ path: _, type: d })),
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("The file(s) archived.") });
        },
        onError: (_) => {
          c.value = o(_.message);
        }
      });
    };
    return (_, d) => (a(), F(we, null, {
      buttons: z(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, p(t(o)("Archive")), 1),
        s("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(o)("Cancel")), 1)
      ]),
      default: z(() => [
        s("div", null, [
          D(xe, {
            icon: t(yt),
            title: t(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", Ur, [
            s("div", Pr, [
              s("div", Or, [
                (a(!0), f(te, null, oe(m.value, (i) => (a(), f("p", zr, [
                  i.type === "dir" ? (a(), f("svg", Kr, [...d[3] || (d[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), f("svg", jr, [...d[4] || (d[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", Gr, p(i.basename), 1)
                ]))), 256))
              ]),
              se(s("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => r.value = i),
                onKeyup: Ie(v, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(o)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Yr), [
                [Fe, r.value]
              ]),
              c.value.length ? (a(), F(be, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => c.value = ""),
                error: ""
              }, {
                default: z(() => [
                  N(p(c.value), 1)
                ]),
                _: 1
              })) : C("", !0)
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
  return a(), f("svg", Wr, [...e[0] || (e[0] = [
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
const nt = { render: Qr }, Xr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Jr(n, e) {
  return a(), f("svg", Xr, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
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
  return a(), f("svg", el, [...e[0] || (e[0] = [
    s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
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
    s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
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
  return a(), f("svg", ll, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const il = { render: al }, dl = { class: "vuefinder__toolbar" }, cl = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, ul = ["title"], vl = ["title"], _l = ["title"], ml = ["title"], fl = ["title"], hl = ["title"], pl = ["title"], gl = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, wl = { class: "pl-2" }, bl = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, yl = { class: "vuefinder__toolbar__controls" }, kl = ["title"], xl = ["title"], Sl = /* @__PURE__ */ K({
  __name: "Toolbar",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = e.config, c = e.search, m = Q(r.state), v = Q(c.searchAtom);
    de(() => m.value.fullScreen, () => {
      if (m.value.fullScreen) {
        const d = document.querySelector("body");
        d && (d.style.overflow = "hidden");
      } else {
        const d = document.querySelector("body");
        d && (d.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const _ = () => {
      r.set("view", m.value.view === "list" ? "grid" : "list");
    };
    return (d, i) => (a(), f("div", dl, [
      t(v).query.length ? (a(), f("div", gl, [
        s("div", wl, [
          N(p(t(o)("Search results for")) + " ", 1),
          s("span", bl, p(t(v).query), 1)
        ]),
        t(r).get("loadingIndicator") === "circular" && t(l).isLoading() ? (a(), F(t(nt), { key: 0 })) : C("", !0)
      ])) : (a(), f("div", cl, [
        t(e).features.includes(t(J).NEW_FOLDER) ? (a(), f("div", {
          key: 0,
          class: "mx-1.5",
          title: t(o)("New Folder"),
          onClick: i[0] || (i[0] = (u) => t(e).modal.open(ht, { items: t(l).selectedItems }))
        }, [
          D(t(ft))
        ], 8, ul)) : C("", !0),
        t(e).features.includes(t(J).NEW_FILE) ? (a(), f("div", {
          key: 1,
          class: "mx-1.5",
          title: t(o)("New File"),
          onClick: i[1] || (i[1] = (u) => t(e).modal.open(vr, { items: t(l).selectedItems }))
        }, [
          D(t(pt))
        ], 8, vl)) : C("", !0),
        t(e).features.includes(t(J).RENAME) ? (a(), f("div", {
          key: 2,
          class: "mx-1.5",
          title: t(o)("Rename"),
          onClick: i[2] || (i[2] = (u) => t(l).selectedItems.length !== 1 || t(e).modal.open(tt, { items: t(l).selectedItems }))
        }, [
          D(t(_t), {
            class: X(t(l).selectedItems.length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, _l)) : C("", !0),
        t(e).features.includes(t(J).DELETE) ? (a(), f("div", {
          key: 3,
          class: "mx-1.5",
          title: t(o)("Delete"),
          onClick: i[3] || (i[3] = (u) => !t(l).selectedItems.length || t(e).modal.open(et, { items: t(l).selectedItems }))
        }, [
          D(t(vt), {
            class: X(t(l).selectedItems.length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ml)) : C("", !0),
        t(e).features.includes(t(J).UPLOAD) ? (a(), f("div", {
          key: 4,
          class: "mx-1.5",
          title: t(o)("Upload"),
          onClick: i[4] || (i[4] = (u) => t(e).modal.open(Ar, { items: t(l).selectedItems }))
        }, [
          D(t(gt))
        ], 8, fl)) : C("", !0),
        t(e).features.includes(t(J).UNARCHIVE) && t(l).selectedItems.length === 1 && t(l).selectedItems[0].mime_type === "application/zip" ? (a(), f("div", {
          key: 5,
          class: "mx-1.5",
          title: t(o)("Unarchive"),
          onClick: i[5] || (i[5] = (u) => !t(l).selectedItems.length || t(e).modal.open(bt, { items: t(l).selectedItems }))
        }, [
          D(t(wt), {
            class: X(t(l).selectedItems.length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, hl)) : C("", !0),
        t(e).features.includes(t(J).ARCHIVE) ? (a(), f("div", {
          key: 6,
          class: "mx-1.5",
          title: t(o)("Archive"),
          onClick: i[6] || (i[6] = (u) => !t(l).selectedItems.length || t(e).modal.open(kt, { items: t(l).selectedItems }))
        }, [
          D(t(yt), {
            class: X(t(l).selectedItems.length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, pl)) : C("", !0)
      ])),
      s("div", yl, [
        t(e).features.includes(t(J).FULL_SCREEN) ? (a(), f("div", {
          key: 0,
          onClick: i[7] || (i[7] = (u) => t(r).toggle("fullScreen")),
          class: "mx-1.5",
          title: t(o)("Toggle Full Screen")
        }, [
          t(m).fullScreen ? (a(), F(t(nl), { key: 0 })) : (a(), F(t(Zr), { key: 1 }))
        ], 8, kl)) : C("", !0),
        s("div", {
          class: "mx-1.5",
          title: t(o)("Change View"),
          onClick: i[8] || (i[8] = (u) => t(v).query.length || _())
        }, [
          t(m).view === "grid" ? (a(), F(t(rl), {
            key: 0,
            class: X(["vf-toolbar-icon", t(v).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : C("", !0),
          t(m).view === "list" ? (a(), F(t(il), {
            key: 1,
            class: X(["vf-toolbar-icon", t(v).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : C("", !0)
        ], 8, xl)
      ])
    ]));
  }
}), $l = (n, e = 0, o = !1) => {
  let l;
  return (...r) => {
    o && !l && n(...r), clearTimeout(l), l = setTimeout(() => {
      n(...r);
    }, e);
  };
}, rt = (n, e, o) => {
  const l = y(n);
  return Dt((r, c) => ({
    get() {
      return r(), l.value;
    },
    set: $l((m) => {
      l.value = m, c();
    }, e, !1)
  }));
}, Cl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function El(n, e) {
  return a(), f("svg", Cl, [...e[0] || (e[0] = [
    s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Ml = { render: El }, Tl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Al(n, e) {
  return a(), f("svg", Tl, [...e[0] || (e[0] = [
    s("path", {
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
  return a(), f("svg", Il, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ll = { render: Fl }, Vl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function Rl(n, e) {
  return a(), f("svg", Vl, [...e[0] || (e[0] = [
    s("path", {
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
  return a(), f("svg", Hl, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Nl = { render: ql }, Ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Pl(n, e) {
  return a(), f("svg", Ul, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ol = { render: Pl }, zl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function Kl(n, e) {
  return a(), f("svg", zl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Pe = { render: Kl }, jl = {
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
  return a(), f("svg", jl, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Yl = { render: Gl }, Wl = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function Ql(n, e) {
  return a(), f("svg", Wl, [...e[0] || (e[0] = [
    s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Xl = { render: Ql };
function Jl(n) {
  const [e, o] = Zl(n);
  if (!o || o === "/") return e + "://";
  const l = o.replace(/\/+$/, ""), r = l.lastIndexOf("/");
  return r === 0 ? e + "://" : e + ":/" + l.slice(0, r);
}
function Zl(n) {
  const e = n.indexOf(":/");
  return e === -1 ? [void 0, n] : [n.slice(0, e), n.slice(e + 2) || "/"];
}
function Be(n, e = []) {
  const o = "vfDragEnterCounter", l = n.fs, r = Q(l.selectedItems);
  function c(i, u) {
    i.preventDefault(), l.getDraggedItem() === u.path || !u || u.type !== "dir" || r.value.some((g) => g.path === u.path || Jl(g.path) === u.path) ? i.dataTransfer && (i.dataTransfer.dropEffect = "none", i.dataTransfer.effectAllowed = "none") : (i.dataTransfer && (i.dataTransfer.dropEffect = "copy", i.dataTransfer.effectAllowed = "all"), i.currentTarget.classList.add(...e));
  }
  function m(i) {
    i.preventDefault();
    const u = i.currentTarget, h = Number(u.dataset[o] || 0);
    u.dataset[o] = String(h + 1);
  }
  function v(i) {
    i.preventDefault();
    const u = i.currentTarget, g = Number(u.dataset[o] || 0) - 1;
    g <= 0 ? (delete u.dataset[o], u.classList.remove(...e)) : u.dataset[o] = String(g);
  }
  function _(i, u) {
    if (!u) return;
    i.preventDefault();
    const h = i.currentTarget;
    delete h.dataset[o], h.classList.remove(...e);
    const g = i.dataTransfer?.getData("items") || "[]", $ = JSON.parse(g).map((S) => l.sortedFiles.get().find((x) => x.path === S));
    l.clearDraggedItem(), n.modal.open(Qe, { items: { from: $, to: u } });
  }
  function d(i) {
    return {
      dragover: (u) => c(u, i),
      dragenter: m,
      dragleave: v,
      drop: (u) => _(u, i)
    };
  }
  return { events: d };
}
const ea = { class: "vuefinder__breadcrumb__container" }, ta = ["title"], na = ["title"], oa = ["title"], sa = ["title"], ra = { class: "group vuefinder__breadcrumb__search-container" }, la = { class: "vuefinder__breadcrumb__list" }, aa = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, ia = { class: "relative" }, da = ["title", "onClick"], ca = { class: "vuefinder__breadcrumb__search-mode" }, ua = ["placeholder"], va = ["onClick"], _a = { class: "vuefinder__breadcrumb__hidden-item-content" }, ma = { class: "vuefinder__breadcrumb__hidden-item-text" }, fa = /* @__PURE__ */ K({
  __name: "Breadcrumb",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.search, r = e.fs, c = e.config, m = Q(l.searchAtom), v = Q(r.path), _ = Q(r.loading), d = ne(() => m.value?.searchMode ?? !1), i = y(null), u = rt(0, 100), h = y(5), g = y(!1), E = ne(() => v.value?.breadcrumb ?? []);
    function $(V, w) {
      return V.length > w ? [V.slice(-w), V.slice(0, -w)] : [V, []];
    }
    const S = ne(() => $(E.value, h.value)[0]), x = ne(() => $(E.value, h.value)[1]);
    de(u, () => {
      if (!i.value) return;
      const V = i.value.children;
      let w = 0, b = 0;
      const G = 5, ee = 1;
      h.value = G, Ve(() => {
        for (let Se = V.length - 1; Se >= 0; Se--) {
          const fe = V[Se];
          if (w + fe.offsetWidth > u.value - 40)
            break;
          w += parseInt(fe.offsetWidth.toString(), 10), b++;
        }
        b < ee && (b = ee), b > G && (b = G), h.value = b;
      });
    });
    const M = () => {
      i.value && (u.value = i.value.offsetWidth);
    }, I = y(null);
    ce(() => {
      I.value = new ResizeObserver(M), i.value && I.value.observe(i.value);
    }), Re(() => {
      I.value && I.value.disconnect();
    });
    const U = Be(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function Z(V = null) {
      V ??= E.value.length - 2;
      const w = {
        basename: v.value?.storage ?? "local",
        extension: "",
        path: (v.value?.storage ?? "local") + "://",
        storage: v.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return E.value[V] ?? w;
    }
    const re = () => {
      P(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: v.value?.storage, path: v.value?.path } });
    }, B = () => {
      l.exitSearchMode(), S.value.length > 0 && !d.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: v.value?.storage ?? "local",
          path: E.value[E.value.length - 2]?.path ?? (v.value?.storage ?? "local") + "://"
        }
      });
    }, R = (V) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: v.value?.storage, path: V.path } }), g.value = !1;
    }, le = () => {
      g.value && (g.value = !1);
    }, O = {
      mounted(V, w) {
        V.clickOutsideEvent = function(b) {
          V === b.target || V.contains(b.target) || w.value();
        }, document.body.addEventListener("click", V.clickOutsideEvent);
      },
      beforeUnmount(V) {
        document.body.removeEventListener("click", V.clickOutsideEvent);
      }
    }, ae = () => {
      c.toggle("showTreeView");
    }, L = y(null), k = rt("", 400);
    de(k, (V) => {
      e.emitter.emit("vf-toast-clear"), l.setQuery(V);
    }), de(d, (V) => {
      V && Ve(() => {
        L.value && L.value.focus();
      });
    }), e.emitter.on("vf-search-exit", () => {
      l.exitSearchMode();
    });
    const T = () => {
      k.value === "" && l.exitSearchMode();
    }, P = () => {
      l.exitSearchMode();
    }, Y = y({
      x: 0,
      y: 0
    }), W = (V) => {
      if (V.currentTarget instanceof HTMLElement) {
        const { x: w, y: b, height: G } = V.currentTarget.getBoundingClientRect();
        Y.value = { x: w, y: b + G };
      }
      g.value = !g.value;
    };
    return (V, w) => (a(), f("div", ea, [
      s("span", {
        title: t(o)("Toggle Tree View")
      }, [
        D(t(Yl), {
          onClick: ae,
          class: X(["vuefinder__breadcrumb__toggle-tree", t(c).get("showTreeView") ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, ta),
      s("span", {
        title: t(o)("Go up a directory")
      }, [
        D(t(Dl), ye(Ce(E.value.length && !d.value ? t(U).events(Z()) : {}), {
          onClick: B,
          class: E.value.length && !d.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, na),
      t(r).isLoading() ? (a(), f("span", {
        key: 1,
        title: t(o)("Cancel")
      }, [
        D(t(Ll), {
          onClick: w[0] || (w[0] = (b) => t(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, sa)) : (a(), f("span", {
        key: 0,
        title: t(o)("Refresh")
      }, [
        D(t(Ml), { onClick: re })
      ], 8, oa)),
      se(s("div", ra, [
        s("div", null, [
          D(t(Bl), ye(Ce(t(U).events(Z(-1))), {
            onClick: w[1] || (w[1] = (b) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(v).value?.storage ?? "local" } }))
          }), null, 16)
        ]),
        s("div", la, [
          x.value.length ? se((a(), f("div", aa, [
            w[5] || (w[5] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", ia, [
              s("span", {
                onDragenter: w[2] || (w[2] = (b) => g.value = !0),
                onClick: W,
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                D(t(Xl), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [O, le]
          ]) : C("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: i,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: w[3] || (w[3] = ke(
            //@ts-ignore
            (...b) => t(l).enterSearchMode && t(l).enterSearchMode(...b),
            ["self"]
          ))
        }, [
          (a(!0), f(te, null, oe(S.value, (b, G) => (a(), f("div", { key: G }, [
            w[6] || (w[6] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", ye(Ce(t(U).events(b), !0), {
              class: "vuefinder__breadcrumb__item",
              title: b.basename,
              onClick: (ee) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(v)?.storage, path: b.path } })
            }), p(b.name), 17, da)
          ]))), 128))
        ], 512),
        t(c).get("loadingIndicator") === "circular" && t(_) ? (a(), F(t(nt), { key: 0 })) : C("", !0)
      ], 512), [
        [ge, !d.value]
      ]),
      se(s("div", ca, [
        s("div", null, [
          D(t(Nl))
        ]),
        se(s("input", {
          ref_key: "searchInput",
          ref: L,
          onKeydown: Ie(P, ["esc"]),
          onBlur: T,
          "onUpdate:modelValue": w[4] || (w[4] = (b) => It(k) ? k.value = b : null),
          placeholder: t(o)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, ua), [
          [Fe, t(k)]
        ]),
        D(t(Ol), { onClick: P })
      ], 512), [
        [ge, d.value]
      ]),
      (a(), F(Ft, { to: "body" }, [
        se(s("div", {
          style: Ee({ position: "absolute", top: Y.value.y + "px", left: Y.value.x + "px" }),
          class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
        }, [
          (a(!0), f(te, null, oe(x.value, (b, G) => (a(), f("div", ye({ key: G }, Ce(t(U).events(b), !0), {
            onClick: (ee) => R(b),
            class: "vuefinder__breadcrumb__hidden-item"
          }), [
            s("div", _a, [
              s("span", null, [
                D(t(Pe), { class: "vuefinder__breadcrumb__hidden-item-icon" })
              ]),
              w[7] || (w[7] = N()),
              s("span", ma, p(b.name), 1)
            ])
          ], 16, va))), 128))
        ], 4), [
          [ge, g.value]
        ])
      ]))
    ]));
  }
});
function ha(n, e) {
  const {
    scrollContainer: o,
    itemWidth: l = 100,
    rowHeight: r,
    overscan: c = 2,
    containerPadding: m = 48
  } = e, v = n && typeof n.get == "function" ? Q(n) : n, _ = () => typeof r == "number" ? r : r.value, d = y(0), i = y(6), u = y(600);
  let h = null;
  const g = ne(() => Math.ceil(v.value.length / i.value)), E = ne(() => g.value * _()), $ = ne(() => {
    const B = _(), R = Math.max(0, Math.floor(d.value / B) - c), le = Math.min(g.value, Math.ceil((d.value + u.value) / B) + c);
    return { start: R, end: le };
  }), S = ne(() => {
    const { start: B, end: R } = $.value;
    return Array.from({ length: R - B }, (le, O) => B + O);
  }), x = () => u.value, M = () => {
    if (o.value) {
      const B = o.value.clientWidth - m;
      i.value = Math.max(Math.floor(B / l), 2);
    }
  }, I = (B) => {
    const R = B.target;
    d.value = R.scrollTop;
  };
  de(() => v.value.length, () => {
    M();
  });
  const U = (B, R) => {
    const le = R * i.value;
    return B.slice(le, le + i.value);
  }, Z = (B, R, le, O, ae) => {
    const L = [];
    for (let k = R; k <= le; k++)
      for (let T = O; T <= ae; T++) {
        const P = k * i.value + T;
        P < B.length && B[P] && L.push(B[P]);
      }
    return L;
  }, re = (B) => ({
    row: Math.floor(B / i.value),
    col: B % i.value
  });
  return ce(async () => {
    await Ve(), o.value && (u.value = o.value.clientHeight || 600), M(), window.addEventListener("resize", () => {
      o.value && (u.value = o.value.clientHeight || 600), M();
    }), o.value && "ResizeObserver" in window && (h = new ResizeObserver((B) => {
      const R = B[0];
      R && (u.value = Math.round(R.contentRect.height)), M();
    }), h.observe(o.value));
  }), Re(() => {
    window.removeEventListener("resize", M), h && (h.disconnect(), h = null);
  }), {
    scrollTop: d,
    itemsPerRow: i,
    totalRows: g,
    totalHeight: E,
    visibleRange: $,
    visibleRows: S,
    updateItemsPerRow: M,
    handleScroll: I,
    getRowItems: U,
    getItemsInRange: Z,
    getItemPosition: re,
    getContainerHeight: x
  };
}
function pa(n) {
  const { getItemPosition: e, getItemsInRange: o, getKey: l, selectionObject: r, rowHeight: c, itemWidth: m } = n, v = Math.floor(Math.random() * 2 ** 32).toString(), d = j("ServiceContainer").fs, i = Q(d.selectedKeys), u = Q(d.sortedFiles);
  Q(d.selectedCount);
  const h = y(/* @__PURE__ */ new Set()), g = y(!1), E = y(!1), $ = y(null), S = (k) => k.map((T) => T.getAttribute("data-key")).filter((T) => !!T), x = (k) => {
    k.selection.getSelection().forEach((T) => {
      k.selection.deselect(T, !0);
    });
  }, M = (k) => {
    i.value && i.value.forEach((T) => {
      const P = document.querySelector(`[data-key="${T}"]`);
      P && k.selection.select(P, !0);
    });
  }, I = (k) => {
    if (k.size === 0) return null;
    const P = Array.from(k).map((b) => {
      const G = u.value?.findIndex((ee) => l(ee) === b) ?? -1;
      return e(G >= 0 ? G : 0);
    }), Y = Math.min(...P.map((b) => b.row)), W = Math.max(...P.map((b) => b.row)), V = Math.min(...P.map((b) => b.col)), w = Math.max(...P.map((b) => b.col));
    return { minRow: Y, maxRow: W, minCol: V, maxCol: w };
  }, U = (k) => {
    g.value = !1, !k.event?.metaKey && !k.event?.ctrlKey && (E.value = !0), k.selection.resolveSelectables(), x(k), M(k);
  }, Z = ({ event: k, selection: T }) => {
    const P = k;
    P && "type" in P && P.type === "touchend" && P.preventDefault();
    const Y = k;
    if (!Y?.ctrlKey && !Y?.metaKey && (d.clearSelection(), T.clearSelection(!0, !0)), h.value.clear(), Y && r.value) {
      const W = r.value.getSelectables()[0]?.closest(".scroller-" + v);
      if (W) {
        const V = W.getBoundingClientRect(), w = Y.clientY - V.top + W.scrollTop, b = Y.clientX - V.left, G = Math.floor(w / c.value), ee = Math.floor(b / m);
        $.value = { row: G, col: ee };
      }
    }
  }, re = (k) => {
    const T = k.selection, P = S(k.store.changed.added), Y = S(k.store.changed.removed);
    E.value = !1, g.value = !0, P.forEach((W) => {
      i.value && !i.value.has(W) && h.value.add(W), d.select(W);
    }), Y.forEach((W) => {
      document.querySelector(`[data-key="${W}"]`) && u.value?.find((w) => l(w) === W) && h.value.delete(W), d.deselect(W);
    }), T.resolveSelectables(), M(k);
  }, B = () => {
    h.value.clear();
  }, R = (k) => {
    if (k.event && $.value && h.value.size > 0) {
      const P = Array.from(h.value).map((Y) => {
        const W = u.value?.findIndex((V) => l(V) === Y) ?? -1;
        return W >= 0 ? e(W) : null;
      }).filter((Y) => Y !== null);
      if (P.length > 0) {
        const Y = [...P, $.value], W = {
          minRow: Math.min(...Y.map((V) => V.row)),
          maxRow: Math.max(...Y.map((V) => V.row)),
          minCol: Math.min(...Y.map((V) => V.col)),
          maxCol: Math.max(...Y.map((V) => V.col))
        };
        o(u.value || [], W.minRow, W.maxRow, W.minCol, W.maxCol).forEach(
          (V) => {
            const w = l(V);
            document.querySelector(`[data-key="${w}"]`) || d.select(w);
          }
        );
      }
    }
  }, le = (k) => {
    R(k), x(k), M(k), d.setSelectedCount(i.value?.size || 0), g.value = !1, $.value = null;
  }, O = () => {
    r.value = new jt({
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
    }), r.value.on("beforestart", U), r.value.on("start", Z), r.value.on("move", re), r.value.on("stop", le);
  }, ae = () => {
    r.value && (r.value.destroy(), r.value = null);
  }, L = (k) => {
    E.value && (r.value?.clearSelection(), B(), E.value = !1);
    const T = k;
    !h.value.size && !E.value && !T?.ctrlKey && !T?.metaKey && (d.clearSelection(), r.value?.clearSelection());
  };
  return ce(() => {
    const k = (T) => {
      !T.buttons && g.value && (g.value = !1);
    };
    document.addEventListener("dragleave", k), Re(() => {
      document.removeEventListener("dragleave", k);
    });
  }), {
    isDragging: g,
    selectionStarted: E,
    explorerId: v,
    extractIds: S,
    cleanupSelection: x,
    refreshSelection: M,
    getSelectionRange: I,
    selectSelectionRange: R,
    initializeSelectionArea: O,
    destroySelectionArea: ae,
    handleContentClick: L
  };
}
const ga = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function wa(n, e) {
  return a(), f("svg", ga, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const ba = { render: wa }, ya = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function ka(n, e) {
  return a(), f("svg", ya, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const xa = { render: ka }, He = /* @__PURE__ */ K({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, o) => (a(), f("div", null, [
      n.direction === "asc" ? (a(), F(t(ba), { key: 0 })) : C("", !0),
      n.direction === "desc" ? (a(), F(t(xa), { key: 1 })) : C("", !0)
    ]));
  }
}), Sa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function $a(n, e) {
  return a(), f("svg", Sa, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ca = { render: $a }, Ea = { class: "vuefinder__drag-item__container" }, Ma = { class: "vuefinder__drag-item__count" }, Ta = /* @__PURE__ */ K({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (o, l) => (a(), f("div", Ea, [
      D(t(Ca)),
      s("div", Ma, p(e.count), 1)
    ]));
  }
}), Aa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Da(n, e) {
  return a(), f("svg", Aa, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ia = { render: Da }, Fa = {
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
    return (r, c) => (a(), f("div", {
      class: X(["vuefinder__item-icon", n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      t(l) ? (a(), F(Je(t(l).is), Lt(ye({ key: 0 }, t(l).props || {})), null, 16)) : n.item.type === "dir" ? (a(), F(t(Pe), { key: 1 })) : (a(), F(t(Ia), { key: 2 })),
      !t(l) && n.ext && n.item.type !== "dir" && n.item.extension ? (a(), f("div", Fa, p(n.item.extension.substring(0, 3)), 1)) : C("", !0)
    ], 2));
  }
}), La = {
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
  return a(), f("svg", La, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const xt = { render: Va }, Ra = ["data-key", "data-row", "data-col", "draggable"], Ba = { key: 0 }, Ha = { class: "vuefinder__explorer__item-grid-content" }, qa = ["data-src", "alt"], Na = { class: "vuefinder__explorer__item-title" }, Ua = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Pa = { class: "vuefinder__explorer__item-list-name" }, Oa = { class: "vuefinder__explorer__item-list-icon" }, za = { class: "vuefinder__explorer__item-name" }, Ka = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, ja = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Ga = { key: 0 }, Ya = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Wa = /* @__PURE__ */ K({
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
    const o = n, l = e, r = j("ServiceContainer"), c = r.fs, m = r.config, v = ne(() => [
      "file-item-" + o.explorerId,
      o.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      o.isSelected ? "vf-explorer-selected" : ""
    ]), _ = ne(() => ({
      opacity: o.isDragging || c.isCut(o.item.path) ? 0.5 : ""
    }));
    let d = null;
    const i = y(null);
    let u = !1;
    const h = () => {
      d && clearTimeout(d), g.value = !0;
    }, g = y(!0), E = ($) => {
      if (g.value = !1, d && ($.preventDefault(), clearTimeout(d)), !u)
        u = !0, l("click", $), i.value = setTimeout(() => u = !1, 300);
      else
        return u = !1, l("dblclick", $), clearTimeout(d), !1;
      if ($.currentTarget && $.currentTarget instanceof HTMLElement) {
        const S = $.currentTarget.getBoundingClientRect();
        $.preventDefault(), d = setTimeout(() => {
          let I = S.y + S.height;
          I + 146 > window.innerHeight - 10 && (I = S.y - 146), I < 10 && (I = 10);
          const U = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: S.x,
            clientY: I
          });
          $.target?.dispatchEvent(U);
        }, 300);
      }
    };
    return ($, S) => (a(), f("div", {
      class: X(v.value),
      style: Ee(_.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: g.value,
      onTouchstart: S[1] || (S[1] = (x) => E(x)),
      onTouchend: S[2] || (S[2] = (x) => h()),
      onClick: S[3] || (S[3] = (x) => l("click", x)),
      onDblclick: S[4] || (S[4] = (x) => l("dblclick", x)),
      onContextmenu: S[5] || (S[5] = ke((x) => l("contextmenu", x), ["prevent", "stop"])),
      onDragstart: S[6] || (S[6] = (x) => l("dragstart", x)),
      onDragend: S[7] || (S[7] = (x) => l("dragend", x))
    }, [
      n.view === "grid" ? (a(), f("div", Ba, [
        s("div", Ha, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (a(), f("img", {
            key: 0,
            onTouchstart: S[0] || (S[0] = (x) => x.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": t(r).requester.getPreviewUrl(n.item.storage, n.item),
            alt: n.item.basename
          }, null, 40, qa)) : (a(), F(lt, {
            key: 1,
            item: n.item,
            ext: !0
          }, null, 8, ["item"]))
        ]),
        s("span", Na, p(t(Xe)(n.item.basename)), 1)
      ])) : (a(), f("div", Ua, [
        s("div", Pa, [
          s("div", Oa, [
            D(lt, {
              item: n.item,
              small: n.compact
            }, null, 8, ["item", "small"])
          ]),
          s("span", za, p(n.item.basename), 1)
        ]),
        n.showPath ? (a(), f("div", Ka, p(n.item.path), 1)) : C("", !0),
        n.showPath ? C("", !0) : (a(), f("div", ja, [
          n.item.file_size ? (a(), f("div", Ga, p(t(r).filesize(n.item.file_size)), 1)) : C("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (a(), f("div", Ya, p(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : C("", !0)
      ])),
      t(m).get("pinnedFolders").find((x) => x.path === n.item.path) ? (a(), F(t(xt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : C("", !0)
    ], 46, Ra));
  }
}), Qa = ["data-row"], Ye = /* @__PURE__ */ K({
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
    ]), c = ne(() => ({
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
    return (v, _) => (a(), f("div", {
      class: X(r.value),
      "data-row": n.rowIndex,
      style: Ee(c.value)
    }, [
      s("div", {
        class: X(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Ee(m.value)
      }, [
        (a(!0), f(te, null, oe(n.items, (d, i) => (a(), F(Wa, ye({
          key: d.path,
          item: d,
          view: n.view,
          compact: n.compact,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(d.path),
          "is-dragging": n.isDraggingItem(d.path),
          "row-index": n.rowIndex,
          "col-index": i
        }, Ce(n.dragNDropEvents(d)), {
          onClick: _[0] || (_[0] = (u) => l("click", u)),
          onDblclick: _[1] || (_[1] = (u) => l("dblclick", u)),
          onContextmenu: _[2] || (_[2] = (u) => l("contextmenu", u)),
          onDragstart: _[3] || (_[3] = (u) => l("dragstart", u)),
          onDragend: _[4] || (_[4] = (u) => l("dragend", u)),
          explorerId: n.explorerId
        }), null, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Qa));
  }
}), Xa = ["onClick"], Ja = /* @__PURE__ */ K({
  __name: "Toast",
  setup(n) {
    const e = j("ServiceContainer"), { getStore: o } = e.storage, l = y(o("full-screen", !1)), r = y([]), c = (_) => _ === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", m = (_) => {
      r.value.splice(_, 1);
    }, v = (_) => {
      let d = r.value.findIndex((i) => i.id === _);
      d !== -1 && m(d);
    };
    return e.emitter.on("vf-toast-clear", () => {
      r.value = [];
    }), e.emitter.on("vf-toast-push", (_) => {
      let d = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      _.id = d, r.value.push(_), setTimeout(() => {
        v(d);
      }, 5e3);
    }), (_, d) => (a(), f("div", {
      class: X(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      D(Vt, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: z(() => [
          (a(!0), f(te, null, oe(r.value, (i, u) => (a(), f("div", {
            key: u,
            onClick: (h) => m(u),
            class: X(["vuefinder__toast__message", c(i.type)])
          }, p(i.label), 11, Xa))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Za = { class: "vuefinder__explorer__container" }, ei = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, ti = {
  key: 0,
  class: "vuefinder__explorer__header"
}, ni = {
  key: 0,
  class: "vuefinder__linear-loader"
}, oi = {
  key: 1,
  class: "vuefinder__circular-loader"
}, si = /* @__PURE__ */ K({
  __name: "Explorer",
  setup(n) {
    const e = j("ServiceContainer"), o = Be(e, ["bg-blue-200", "dark:bg-slate-600"]), l = De("dragImage"), r = at(null), c = De("scrollContainer"), m = De("scrollContent"), v = e.search, _ = e.fs, d = e.config, i = Q(d.state), u = Q(v.searchAtom), h = Q(_.sortedFiles), g = Q(_.selectedKeys), E = Q(_.loading), $ = (A) => g.value?.has(A) ?? !1;
    let S = null;
    const x = y(null), M = De("customScrollBar"), I = De("customScrollBarContainer"), U = ne(() => {
      const A = i.value.view, H = i.value.compactListView;
      return A === "grid" && !(u.value.searchMode && u.value.query.length) ? 88 : H ? 24 : 50;
    }), { t: Z } = e.i18n, {
      itemsPerRow: re,
      totalHeight: B,
      visibleRows: R,
      handleScroll: le,
      getRowItems: O,
      getItemsInRange: ae,
      getItemPosition: L,
      updateItemsPerRow: k
    } = ha(
      ne(() => h.value ?? []),
      {
        scrollContainer: c,
        itemWidth: 104,
        rowHeight: U,
        overscan: 2,
        containerPadding: 0
      }
    ), {
      explorerId: T,
      isDragging: P,
      initializeSelectionArea: Y,
      destroySelectionArea: W,
      handleContentClick: V
    } = pa({
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
    de(() => d.get("view"), (A) => {
      A === "list" ? re.value = 1 : k();
    }, { immediate: !0 }), de(re, (A) => {
      d.get("view") === "list" && A !== 1 && (re.value = 1);
    });
    const G = (A) => h.value?.[A];
    ce(() => {
      if (Y(), r.value && r.value.on("beforestart", ({ event: A }) => {
        const H = A?.target === m.value;
        if (!A?.metaKey && !A?.ctrlKey && !A?.altKey && !H)
          return !1;
      }), c.value && (S = new Gt({
        elements_selector: ".lazy",
        container: c.value
      })), de(() => u.value.query, (A) => {
        const H = _.path.get().storage, q = _.path.get().path;
        !H || !q || (A ? e.emitter.emit("vf-fetch", {
          params: {
            q: "search",
            storage: H,
            path: q,
            filter: A
          },
          onSuccess: (ve) => {
            ve.files.length || e.emitter.emit("vf-toast-push", { label: Z("No search result found.") });
          }
        }) : e.emitter.emit("vf-fetch", { params: { q: "index", storage: H, path: q } }));
      }), I.value) {
        const A = Ze(I.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (H) => {
            x.value = H;
          },
          scroll: (H) => {
            const { scrollOffsetElement: q } = H.elements();
            c.value && c.value.scrollTo({ top: q.scrollTop, left: 0 });
          }
        });
        x.value = A;
      }
      c.value && c.value.addEventListener("scroll", () => {
        const A = x.value;
        if (!A) return;
        const { scrollOffsetElement: H } = A.elements();
        H.scrollTo({ top: c.value.scrollTop, left: 0 });
      });
    }), Rt(() => {
      if (S && S.update(), x.value && M.value && c.value) {
        const H = c.value.scrollHeight > c.value.clientHeight, q = M.value;
        q.style.display = H ? "block" : "none", q.style.height = `${B.value}px`;
      }
    }), Re(() => {
      W(), S && (S.destroy(), S = null), x.value && (x.value.destroy(), x.value = null);
    });
    const ee = (A) => {
      const H = A.target?.closest(".file-item-" + T), q = A;
      if (!q?.ctrlKey && !q?.metaKey && (_.clearSelection(), r.value?.clearSelection(!0, !0)), H) {
        const ve = String(H.getAttribute("data-key"));
        r.value?.resolveSelectables(), _.toggleSelect(ve);
      }
      _.setSelectedCount(g.value?.size || 0);
    }, Se = (A) => {
      const H = e.contextMenuItems.find((q) => q.show(e, {
        searchQuery: "",
        items: [A],
        target: A
      }));
      H && H.action(e, [A]);
    }, fe = (A) => {
      const H = A.target?.closest(".file-item-" + T), q = H ? String(H.getAttribute("data-key")) : null;
      if (!q) return;
      const ve = h.value?.find((Ke) => Ke.path === q);
      ve && Se(ve);
    }, he = () => {
      const A = g.value;
      return h.value?.filter((H) => A?.has(H.path)) || [];
    }, Me = (A) => {
      A.preventDefault();
      const H = A.target?.closest(".file-item-" + T);
      if (H) {
        const q = String(H.getAttribute("data-key")), ve = h.value?.find((Ke) => Ke.path === q);
        g.value?.has(q) || (_.clearSelection(), _.select(q)), e.emitter.emit("vf-contextmenu-show", { event: A, items: he(), target: ve });
      }
    }, Te = (A) => {
      A.preventDefault(), e.emitter.emit("vf-contextmenu-show", { event: A, items: he() });
    }, Oe = (A) => {
      if (A.altKey || A.ctrlKey || A.metaKey)
        return A.preventDefault(), !1;
      P.value = !0;
      const H = A.target?.closest(".file-item-" + T);
      if (w.value = H ? String(H.dataset.key) : null, A.dataTransfer && w.value) {
        A.dataTransfer.setDragImage(l.value, 0, 15), A.dataTransfer.effectAllowed = "all", A.dataTransfer.dropEffect = "copy";
        const q = g.value?.has(w.value) ? Array.from(g.value) : [w.value];
        A.dataTransfer.setData("items", JSON.stringify(q)), _.setDraggedItem(w.value);
      }
    }, ze = () => {
      w.value = null;
    };
    return (A, H) => (a(), f("div", Za, [
      s("div", {
        ref: "customScrollBarContainer",
        class: X(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(i).view === "grid" }, { "search-active": t(u).hasQuery }]])
      }, [
        s("div", ei, null, 512)
      ], 2),
      t(i).view === "list" || t(u).query.length ? (a(), f("div", ti, [
        s("div", {
          onClick: H[0] || (H[0] = (q) => t(_).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          N(p(t(Z)("Name")) + " ", 1),
          se(D(He, {
            direction: t(_).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(_).sort.active && t(_).sort.column === "basename"]
          ])
        ]),
        t(u).query.length ? C("", !0) : (a(), f("div", {
          key: 0,
          onClick: H[1] || (H[1] = (q) => t(_).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          N(p(t(Z)("Size")) + " ", 1),
          se(D(He, {
            direction: t(_).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(_).sort.active && t(_).sort.column === "file_size"]
          ])
        ])),
        t(u).query.length ? (a(), f("div", {
          key: 1,
          onClick: H[2] || (H[2] = (q) => t(_).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          N(p(t(Z)("Filepath")) + " ", 1),
          se(D(He, {
            direction: t(_).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(_).sort.active && t(_).sort.column === "path"]
          ])
        ])) : C("", !0),
        t(u).query.length ? C("", !0) : (a(), f("div", {
          key: 2,
          onClick: H[3] || (H[3] = (q) => t(_).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          N(p(t(Z)("Date")) + " ", 1),
          se(D(He, {
            direction: t(_).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(_).sort.active && t(_).sort.column === "last_modified"]
          ])
        ]))
      ])) : C("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: c,
        class: X(["vuefinder__explorer__selector-area", "scroller-" + t(T)]),
        onScroll: H[5] || (H[5] = //@ts-ignore
        (...q) => t(le) && t(le)(...q))
      }, [
        t(d).get("loadingIndicator") === "linear" && t(E) ? (a(), f("div", ni)) : C("", !0),
        t(d).get("loadingIndicator") === "circular" && t(E) ? (a(), f("div", oi)) : C("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: m,
          class: "scrollContent min-h-full",
          style: Ee({ height: `${t(B)}px`, position: "relative", width: "100%" }),
          onContextmenu: ke(Te, ["self", "prevent"]),
          onClick: H[4] || (H[4] = ke(
            //@ts-ignore
            (...q) => t(V) && t(V)(...q),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: l,
            class: "vuefinder__explorer__drag-item"
          }, [
            D(Ta, {
              count: w.value && t(g)?.has(w.value) ? t(g)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          t(u).query.length ? (a(!0), f(te, { key: 0 }, oe(t(R), (q) => (a(), F(Ye, {
            key: q,
            "row-index": q,
            "row-height": U.value,
            view: "list",
            items: G(q) ? [G(q)] : [],
            compact: t(i).compactListView,
            "show-path": !0,
            "is-dragging-item": b,
            "is-selected": $,
            "drag-n-drop-events": (ve) => t(o).events(ve),
            explorerId: t(T),
            onClick: ee,
            onDblclick: fe,
            onContextmenu: Me,
            onDragstart: Oe,
            onDragend: ze
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(i).view === "grid" ? (a(!0), f(te, { key: 1 }, oe(t(R), (q) => (a(), F(Ye, {
            key: q,
            "row-index": q,
            "row-height": U.value,
            view: "grid",
            "items-per-row": t(re),
            items: t(O)(t(h), q),
            "show-thumbnails": t(i).showThumbnails,
            "is-dragging-item": b,
            "is-selected": $,
            "drag-n-drop-events": (ve) => t(o).events(ve),
            explorerId: t(T),
            onClick: ee,
            onDblclick: fe,
            onContextmenu: Me,
            onDragstart: Oe,
            onDragend: ze
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (a(!0), f(te, { key: 2 }, oe(t(R), (q) => (a(), F(Ye, {
            key: q,
            "row-index": q,
            "row-height": U.value,
            view: "list",
            items: G(q) ? [G(q)] : [],
            compact: t(i).compactListView,
            "is-dragging-item": b,
            "is-selected": $,
            "drag-n-drop-events": (ve) => t(o).events(ve),
            explorerId: t(T),
            onClick: ee,
            onDblclick: fe,
            onContextmenu: Me,
            onDragstart: Oe,
            onDragend: ze
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      D(Ja)
    ]));
  }
}), ri = ["href", "download"], li = ["onClick"], ai = /* @__PURE__ */ K({
  __name: "ContextMenu",
  setup(n) {
    const e = j("ServiceContainer"), o = e.search, l = Q(o.searchAtom), r = y(null), c = y([]), m = Ue({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (i) => {
      c.value = i;
    });
    const v = (i) => i.link(e, c.value), _ = (i) => {
      e.emitter.emit("vf-contextmenu-hide"), i.action(e, c.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: i, items: u, target: h = null }) => {
      if (m.items = e.contextMenuItems.filter((g) => g.show(e, {
        searchQuery: l.query,
        items: u,
        target: h
      })), l.query)
        if (h)
          e.emitter.emit("vf-context-selected", [h]);
        else
          return;
      else !h && !l.query ? e.emitter.emit("vf-context-selected", []) : u.length > 1 && u.some((g) => g.path === h.path) ? e.emitter.emit("vf-context-selected", u) : e.emitter.emit("vf-context-selected", [h]);
      d(i);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      m.active = !1;
    });
    const d = (i) => {
      const u = e.root, h = e.root.getBoundingClientRect(), g = u.getBoundingClientRect();
      let E = i.clientX - h.left, $ = i.clientY - h.top;
      m.active = !0, Ve(() => {
        const S = r.value?.getBoundingClientRect();
        let x = S?.height ?? 0, M = S?.width ?? 0;
        E = g.right - i.pageX + window.scrollX < M ? E - M : E, $ = g.bottom - i.pageY + window.scrollY < x ? $ - x : $, m.positions = {
          left: String(E) + "px",
          top: String($) + "px"
        };
      });
    };
    return (i, u) => se((a(), f("ul", {
      ref_key: "contextmenu",
      ref: r,
      class: X([m.active ? "vuefinder__context-menu--active" : "vuefinder__context-menu--inactive", "vuefinder__context-menu"]),
      style: Ee(m.positions)
    }, [
      (a(!0), f(te, null, oe(m.items, (h) => (a(), f("li", {
        class: "vuefinder__context-menu__item",
        key: h.title
      }, [
        h.link ? (a(), f("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: v(h),
          download: v(h),
          onClick: u[0] || (u[0] = (g) => t(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, p(h.title(t(e).i18n)), 1)
        ], 8, ri)) : (a(), f("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => _(h)
        }, [
          s("span", null, p(h.title(t(e).i18n)), 1)
        ], 8, li))
      ]))), 128))
    ], 6)), [
      [ge, m.active]
    ]);
  }
}), ii = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function di(n, e) {
  return a(), f("svg", ii, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const St = { render: di }, ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function ui(n, e) {
  return a(), f("svg", ci, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const vi = { render: ui }, _i = { class: "vuefinder__status-bar__wrapper" }, mi = { class: "vuefinder__status-bar__storage" }, fi = ["title"], hi = { class: "vuefinder__status-bar__storage-icon" }, pi = ["value"], gi = ["value"], wi = { class: "vuefinder__status-bar__info" }, bi = { key: 0 }, yi = { class: "vuefinder__status-bar__selected-count" }, ki = { class: "vuefinder__status-bar__actions" }, xi = ["disabled"], Si = ["title"], $i = /* @__PURE__ */ K({
  __name: "Statusbar",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = e.search, c = Q(r.searchAtom), m = Q(l.sortedFiles), v = Q(l.path), _ = Q(l.selectedCount), d = Q(l.storages), i = (h) => {
      const g = h.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: g } });
    }, u = ne(() => {
      const h = e.selectButton.multiple ? _.value > 0 : _.value === 1;
      return e.selectButton.active && h;
    });
    return (h, g) => (a(), f("div", _i, [
      s("div", mi, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: t(o)("Storage")
        }, [
          s("div", hi, [
            D(t(St))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: t(v)?.storage,
            onChange: i,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (a(!0), f(te, null, oe(t(d), (E) => (a(), f("option", {
              value: E,
              key: E
            }, p(E), 9, gi))), 128))
          ], 40, pi)
        ], 8, fi),
        s("div", wi, [
          t(c).hasQuery ? (a(), f("span", bi, p(t(m).value.length) + " items found. ", 1)) : C("", !0),
          s("span", yi, p(t(_) > 0 ? `${t(_)} item(s) selected.` : ""), 1)
        ])
      ]),
      s("div", ki, [
        t(e).selectButton.active ? (a(), f("button", {
          key: 0,
          class: X(["vf-btn vf-btn-primary vf-btn-small", { disabled: !u.value }]),
          disabled: !u.value,
          onClick: g[0] || (g[0] = (E) => t(e).selectButton.click(t(l).selectedItems, E))
        }, p(t(o)("Select")), 11, xi)) : C("", !0),
        s("span", {
          class: "vuefinder__status-bar__about",
          title: t(o)("About"),
          onClick: g[1] || (g[1] = (E) => t(e).modal.open(ut))
        }, [
          D(t(vi))
        ], 8, Si)
      ])
    ]));
  }
}), Ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function Ei(n, e) {
  return a(), f("svg", Ci, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const $t = { render: Ei }, Mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ti(n, e) {
  return a(), f("svg", Mi, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Ai = { render: Ti }, Di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ii(n, e) {
  return a(), f("svg", Di, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ])]);
}
const Ct = { render: Ii }, Fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Li(n, e) {
  return a(), f("svg", Fi, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 12h6" }, null, -1)
  ])]);
}
const Et = { render: Li };
function Mt(n, e) {
  const o = n.findIndex((l) => l.path === e.path);
  o > -1 ? n[o] = e : n.push(e);
}
const Vi = { class: "vuefinder__folder-loader-indicator" }, Ri = {
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
    const e = n, o = j("ServiceContainer"), { t: l } = o.i18n, r = it(n, "modelValue"), c = y(!1);
    de(
      () => r.value,
      () => m()?.folders.length || v()
    );
    function m() {
      return o.treeViewData.find((_) => _.path === e.path);
    }
    const v = () => {
      c.value = !0, o.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          storage: e.storage,
          path: e.path
        }
      }).then((_) => {
        Mt(o.treeViewData, { path: e.path, type: "dir", ..._ });
      }).catch((_) => {
      }).finally(() => {
        c.value = !1;
      });
    };
    return (_, d) => (a(), f("div", Vi, [
      c.value ? (a(), F(t(nt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (a(), f("div", Ri, [
        r.value && m()?.folders.length ? (a(), F(t(Et), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : C("", !0),
        r.value ? C("", !0) : (a(), F(t(Ct), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Bi = ["onClick"], Hi = ["title", "onDblclick", "onClick"], qi = { class: "vuefinder__treesubfolderlist__item-icon" }, Ni = { class: "vuefinder__treesubfolderlist__subfolder" }, Ui = /* @__PURE__ */ K({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = j("ServiceContainer"), o = e.fs, l = Be(e, ["bg-blue-200", "dark:bg-slate-600"]), r = y({}), c = Q(o.path), m = n, v = y(null);
    ce(() => {
      m.path === m.storage + "://" && v.value && Ze(v.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const _ = ne(() => e.treeViewData.find((d) => d.path === m.path)?.folders || []);
    return (d, i) => {
      const u = Ht("TreeSubfolderList", !0);
      return a(), f("ul", {
        ref_key: "parentSubfolderList",
        ref: v,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (a(!0), f(te, null, oe(_.value, (h) => (a(), f("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", ye(Ce(t(l).events({ ...h, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (g) => r.value[h.path] = !r.value[h.path]
            }, [
              D(Tt, {
                storage: n.storage,
                path: h.path,
                modelValue: r.value[h.path],
                "onUpdate:modelValue": (g) => r.value[h.path] = g
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Bi),
            s("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: h.path,
              onDblclick: (g) => r.value[h.path] = !r.value[h.path],
              onClick: (g) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: m.storage, path: h.path } })
            }, [
              s("div", qi, [
                t(c)?.path === h.path ? (a(), F(t($t), { key: 0 })) : (a(), F(t(Pe), { key: 1 }))
              ]),
              s("div", {
                class: X(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(c)?.path === h.path
                }])
              }, p(h.basename), 3)
            ], 40, Hi)
          ], 16),
          s("div", Ni, [
            se(D(u, {
              storage: m.storage,
              path: h.path
            }, null, 8, ["storage", "path"]), [
              [ge, r.value[h.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Pi = /* @__PURE__ */ K({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = j("ServiceContainer"), o = e.fs, l = y(!1), r = n, c = Be(e, ["bg-blue-200", "dark:bg-slate-600"]), m = Q(o.path), v = ne(() => r.storage === m.value?.storage), _ = {
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
    function d(i) {
      i === m.value?.storage ? l.value = !l.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: i } }));
    }
    return (i, u) => (a(), f(te, null, [
      s("div", {
        onClick: u[2] || (u[2] = (h) => d(n.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        s("div", ye(Ce(t(c).events(_), !0), {
          class: ["vuefinder__treestorageitem__info", v.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          s("div", {
            class: X(["vuefinder__treestorageitem__icon", v.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            D(t(St))
          ], 2),
          s("div", null, p(n.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: u[1] || (u[1] = ke((h) => l.value = !l.value, ["stop"]))
        }, [
          D(Tt, {
            storage: n.storage,
            path: n.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => l.value = h)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      se(D(Ui, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ge, l.value]
      ])
    ], 64));
  }
}), Oi = { class: "vuefinder__folder-indicator" }, zi = { class: "vuefinder__folder-indicator--icon" }, Ki = /* @__PURE__ */ K({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = it(n, "modelValue");
    return (o, l) => (a(), f("div", Oi, [
      s("div", zi, [
        e.value ? (a(), F(t(Et), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : C("", !0),
        e.value ? C("", !0) : (a(), F(t(Ct), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), ji = { class: "vuefinder__treeview__header" }, Gi = { class: "vuefinder__treeview__pinned-label" }, Yi = { class: "vuefinder__treeview__pin-text text-nowrap" }, Wi = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Qi = ["onClick"], Xi = ["title"], Ji = ["onClick"], Zi = { key: 0 }, ed = { class: "vuefinder__treeview__no-pinned" }, td = /* @__PURE__ */ K({
  __name: "TreeView",
  setup(n) {
    const e = j("ServiceContainer"), { t: o } = e.i18n, { getStore: l, setStore: r } = e.storage, c = e.fs, m = e.config, v = Q(m.state), _ = Q(c.sortedFiles), d = Q(c.path), i = Be(e, ["bg-blue-200", "dark:bg-slate-600"]), u = y(190), h = y(l("pinned-folders-opened", !0));
    de(h, (S) => r("pinned-folders-opened", S));
    const g = (S) => {
      m.set("pinnedFolders", m.get("pinnedFolders").filter((x) => x.path !== S.path));
    }, E = (S) => {
      const x = S.clientX, M = S.target.parentElement;
      if (!M) return;
      const I = M.getBoundingClientRect().width;
      M.classList.remove("transition-[width]"), M.classList.add("transition-none");
      const U = (re) => {
        u.value = I + re.clientX - x, u.value < 50 && (u.value = 0, m.set("showTreeView", !1)), u.value > 50 && m.set("showTreeView", !0);
      }, Z = () => {
        const re = M.getBoundingClientRect();
        u.value = re.width, M.classList.add("transition-[width]"), M.classList.remove("transition-none"), window.removeEventListener("mousemove", U), window.removeEventListener("mouseup", Z);
      };
      window.addEventListener("mousemove", U), window.addEventListener("mouseup", Z);
    }, $ = y(null);
    return ce(() => {
      $.value && Ze($.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), de(_, (S) => {
      const x = S.filter((M) => M.type === "dir");
      Mt(e.treeViewData, {
        path: d.value?.path || "",
        folders: x.map((M) => ({
          storage: M.storage,
          path: M.path,
          basename: M.basename,
          type: "dir"
        }))
      });
    }), (S, x) => (a(), f(te, null, [
      s("div", {
        onClick: x[0] || (x[0] = (M) => t(m).toggle("showTreeView")),
        class: X(["vuefinder__treeview__overlay", t(v).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      s("div", {
        style: Ee(t(v).showTreeView ? "min-width:100px;max-width:75%; width: " + u.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: $,
          class: "vuefinder__treeview__scroll"
        }, [
          s("div", ji, [
            s("div", {
              onClick: x[2] || (x[2] = (M) => h.value = !h.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              s("div", Gi, [
                D(t(xt), { class: "vuefinder__treeview__pin-icon" }),
                s("div", Yi, p(t(o)("Pinned Folders")), 1)
              ]),
              D(Ki, {
                modelValue: h.value,
                "onUpdate:modelValue": x[1] || (x[1] = (M) => h.value = M)
              }, null, 8, ["modelValue"])
            ]),
            h.value ? (a(), f("ul", Wi, [
              (a(!0), f(te, null, oe(t(v).pinnedFolders, (M) => (a(), f("li", {
                key: M.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", ye(Ce(t(i).events(M), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (I) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: M.storage, path: M.path } })
                }), [
                  t(d)?.path !== M.path ? (a(), F(t(Pe), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : C("", !0),
                  t(d)?.path === M.path ? (a(), F(t($t), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : C("", !0),
                  s("div", {
                    title: M.path,
                    class: X(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": t(d)?.path === M.path
                    }])
                  }, p(M.basename), 11, Xi)
                ], 16, Qi),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (I) => g(M)
                }, [
                  D(t(Ai), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Ji)
              ]))), 128)),
              t(v).pinnedFolders.length ? C("", !0) : (a(), f("li", Zi, [
                s("div", ed, p(t(o)("No folders pinned")), 1)
              ]))
            ])) : C("", !0)
          ]),
          (a(!0), f(te, null, oe(t(c).storages.get(), (M) => (a(), f("div", {
            class: "vuefinder__treeview__storage",
            key: M
          }, [
            D(Pi, { storage: M }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        s("div", {
          onMousedown: E,
          class: "vuefinder__treeview__resize-handle"
        }, null, 32)
      ], 4)
    ], 64));
  }
}), me = {
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
function nd(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function ue(n) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, n);
  return (o, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== nd(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !o.features.includes(e.feature));
}
function We(...n) {
  return (e, o) => n.some((l) => l(e, o));
}
function Le(...n) {
  return (e, o) => n.every((l) => l(e, o));
}
const od = [
  {
    id: me.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      n.emitter.emit("vf-search-exit"), n.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0]?.storage, path: e[0]?.path }
      });
    },
    show: ue({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: me.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.emitter.emit("vf-fetch", { params: { q: "index", storage: e.path.get().storage, path: e.path.get().path } });
    },
    show: We(ue({ target: "none" }), ue({ target: "many" }))
  },
  {
    id: me.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll();
    },
    show: ue({ target: "none" })
  },
  {
    id: me.newfolder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(ht),
    show: ue({ target: "none", feature: J.NEW_FOLDER })
  },
  {
    id: me.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      n.emitter.emit("vf-search-exit"), e[0] && n.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0].storage, path: e[0].path }
      });
    },
    show: ue({ target: "one", targetType: "dir" })
  },
  {
    id: me.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const o = n.config, l = o.get("pinnedFolders"), r = l.concat(e.filter((c) => l.findIndex((m) => m.path === c.path) === -1));
      o.set("pinnedFolders", r);
    },
    show: Le(
      ue({ target: "one", targetType: "dir" }),
      (n, e) => n.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) === -1
    )
  },
  {
    id: me.unpinFolder,
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      const o = n.config, l = o.get("pinnedFolders");
      o.set("pinnedFolders", l.filter((r) => !e.find((c) => c.path === r.path)));
    },
    show: Le(
      ue({ target: "one", targetType: "dir" }),
      (n, e) => n.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) !== -1
    )
  },
  {
    id: me.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(mt, { storage: e[0]?.storage, item: e[0] }),
    show: Le(
      ue({ target: "one", feature: J.PREVIEW }),
      (n, e) => e.target?.type !== "dir"
    )
  },
  {
    id: me.download,
    link: (n, e) => n.requester.getDownloadUrl(e[0]?.storage, e[0]),
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: Le(
      ue({ target: "one", feature: J.DOWNLOAD }),
      (n, e) => e.target?.type !== "dir"
    )
  },
  {
    id: me.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(tt, { items: e }),
    show: ue({ target: "one", feature: J.RENAME })
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
    id: me.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(kt, { items: e }),
    show: We(
      ue({ target: "many", feature: J.ARCHIVE }),
      Le(
        ue({ target: "one", feature: J.ARCHIVE }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: me.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(bt, { items: e }),
    show: ue({ target: "one", feature: J.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: me.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(et, { items: e });
    },
    show: We(
      ue({ feature: J.DELETE, target: "one" }),
      ue({ feature: J.DELETE, target: "many" })
    )
  }
], sd = {
  class: "vuefinder",
  ref: "root",
  tabindex: "0"
}, rd = { class: "vuefinder__main__content" }, ld = /* @__PURE__ */ K({
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
    contextMenuItems: { default: () => od },
    onError: {},
    onSelect: {},
    "onUpdate:path": {},
    icon: {}
  },
  emits: ["select", "update:path"],
  setup(n, { emit: e }) {
    const o = e, l = n, r = vn(l, j("VueFinderOptions"));
    qt("ServiceContainer", r);
    const c = r.config, m = r.fs, v = Q(c.state), _ = Q(m.selectedItems);
    Zs(r);
    let d = null;
    r.emitter.on("vf-fetch-abort", () => {
      d && d.abort(), m.setLoading(!1);
    }), r.emitter.on("vf-fetch", ({ params: u, body: h = null, onSuccess: g = null, onError: E = null, noCloseModal: $ = !1 }) => {
      ["index", "search"].includes(u.q) && (d && d.abort(), m.setLoading(!0)), d = new AbortController();
      const S = d.signal;
      r.requester.send({
        url: "",
        method: u.m || "get",
        params: u,
        body: h,
        abortSignal: S
      }).then((x) => {
        m.setPath(x.dirname), c.get("persist") && c.set("path", x.dirname), $ || r.modal.close(), m.setFiles(x.files), m.clearSelection(), m.setSelectedCount(0), m.setStorages(x.storages), g && g(x);
      }).catch((x) => {
        console.error(x), E ? E(x) : x && typeof x == "object" && "message" in x && r.emitter.emit("vf-toast-push", { label: x.message, type: "error" });
      }).finally(() => {
        ["index", "search"].includes(u.q) && m.setLoading(!1);
      });
    });
    function i(u) {
      let h = {};
      u && u.includes("://") && (h = {
        storage: u.split("://")[0],
        path: u
      }), r.emitter.emit("vf-fetch", {
        params: { q: "index", storage: m.path.get().storage, ...h },
        onError: l.onError ?? ((g) => {
          g && typeof g == "object" && "message" in g && r.emitter.emit("vf-toast-push", { label: g.message, type: "error" });
        })
      });
    }
    return ce(() => {
      de(() => l.path, (h) => {
        i(h);
      });
      const u = c.get("persist") ? c.get("path") : l.path;
      m.setPath(u), i(u), r.emitter.on("vf-select", (h) => {
        r.selectedItems = h, o("select", h);
      }), de(() => m.path.get().path, (h) => {
        o("update:path", h);
      }), de(_, (h) => {
        o("select", h);
      });
    }), (u, h) => (a(), f("div", sd, [
      s("div", {
        class: X(t(r).theme.actualValue)
      }, [
        s("div", {
          class: X([t(v).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: Ee(t(v).fullScreen ? "" : "max-height: " + n.maxHeight),
          onMousedown: h[0] || (h[0] = (g) => t(r).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (g) => t(r).emitter.emit("vf-contextmenu-hide"))
        }, [
          D(Sl),
          D(fa),
          s("div", rd, [
            D(td),
            D(si)
          ]),
          D($i)
        ], 38),
        D(Nt, { name: "fade" }, {
          default: z(() => [
            t(r).modal.visible ? (a(), F(Je(t(r).modal.type), { key: 0 })) : C("", !0)
          ]),
          _: 1
        }),
        D(ai)
      ], 2)
    ], 512));
  }
}), gd = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    let [o] = Object.keys(e.i18n);
    e.locale = e.locale ?? o ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", ld);
  }
};
export {
  me as ContextMenuIds,
  ld as VueFinder,
  gd as VueFinderPlugin,
  od as contextMenuItems,
  gd as default
};
