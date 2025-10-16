import { reactive as Oe, watch as fe, ref as y, shallowRef as vt, useTemplateRef as De, defineComponent as j, inject as Y, onMounted as ce, nextTick as Pe, createElementBlock as m, openBlock as a, withKeys as Ve, unref as t, createElementVNode as s, withModifiers as ge, renderSlot as Le, createBlock as F, resolveDynamicComponent as Ze, toDisplayString as p, onUnmounted as Re, normalizeClass as Z, computed as re, withCtx as K, createVNode as I, createCommentVNode as M, Fragment as ne, renderList as le, createTextVNode as P, withDirectives as de, vModelSelect as it, vModelText as Be, onBeforeUnmount as Ht, customRef as Nt, mergeProps as xe, toHandlers as Ee, vShow as be, isRef as Pt, Teleport as _t, normalizeStyle as Me, normalizeProps as mt, TransitionGroup as qt, onUpdated as Ut, mergeModels as Ot, useModel as ft, resolveComponent as zt, provide as Kt, guardReactiveProps as jt, Transition as Gt } from "vue";
import { useStore as B } from "@nanostores/vue";
import Yt from "mitt";
import { persistentAtom as Wt } from "@nanostores/persistent";
import { atom as we, computed as Fe } from "nanostores";
import { Cropper as Qt } from "vue-advanced-cropper";
import ht from "vanilla-lazyload";
import Xt from "@uppy/core";
import Jt from "@uppy/xhr-upload";
import Zt from "@viselect/vanilla";
import { OverlayScrollbars as et } from "overlayscrollbars";
const Ye = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
class en {
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
    let [n, l] = e;
    this.config.fetchRequestInterceptor && (l = this.config.fetchRequestInterceptor(l));
    let r = await fetch(n, l);
    return this.config.fetchResponseInterceptor && (r = await this.config.fetchResponseInterceptor(r)), r;
  };
  transformRequestParams(e) {
    const n = this.config, l = {};
    Ye != null && Ye !== "" && n.xsrfHeaderName && (l[n.xsrfHeaderName] = Ye);
    const r = Object.assign({}, n.headers, l, e.headers), v = Object.assign({}, n.params, e.params), u = n.baseUrl + e.url, f = e.method;
    let d;
    if (f !== "get")
      if (e.body instanceof FormData) {
        const c = e.body;
        n.body != null && Object.entries(this.config.body).forEach(([i, h]) => {
          c.append(i, String(h));
        }), d = c;
      } else {
        const c = Object.assign({}, e.body ?? {});
        n.body != null && Object.assign(c, this.config.body), d = c;
      }
    const _ = { url: u, method: f, headers: r, params: v, body: d };
    if (n.transformRequest != null) {
      const c = n.transformRequest({ url: u, method: f, headers: r, params: v, body: d ?? null });
      c.url != null && (_.url = c.url), c.method != null && (_.method = c.method), c.params != null && (_.params = c.params), c.headers != null && (_.headers = c.headers), c.body != null && (_.body = c.body);
    }
    return _;
  }
  getDownloadUrl(e, n) {
    if (n.url != null) return n.url;
    const l = this.transformRequestParams({ url: "", method: "get", params: { q: "download", storage: e, path: n.path } });
    return l.url + "?" + new URLSearchParams(l.params).toString();
  }
  getPreviewUrl(e, n) {
    if (n.url != null) return n.url;
    const l = this.transformRequestParams({ url: "", method: "get", params: { q: "preview", storage: e, path: n.path } });
    return l.url + "?" + new URLSearchParams(l.params).toString();
  }
  async send(e) {
    const n = this.transformRequestParams(e), l = e.responseType || "json", r = { method: e.method, headers: n.headers, signal: e.abortSignal }, v = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let f;
      n.body instanceof FormData ? f = e.body : (f = JSON.stringify(n.body), r.headers["Content-Type"] = "application/json"), r.body = f;
    }
    this.config.fetchParams && Object.assign(r, this.config.fetchParams);
    const u = await this.customFetch(v, r);
    if (u.ok) return await u[l]();
    throw await u.json();
  }
}
function tn(o) {
  const e = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof o == "string" ? Object.assign(e, { baseUrl: o }) : Object.assign(e, o), new en(e);
}
function nn(o) {
  let e = localStorage.getItem(o + "_storage");
  const n = Oe(JSON.parse(e ?? "{}"));
  fe(n, l);
  function l() {
    Object.keys(n).length ? localStorage.setItem(o + "_storage", JSON.stringify(n)) : localStorage.removeItem(o + "_storage");
  }
  function r(d, _) {
    n[d] = _;
  }
  function v(d) {
    delete n[d];
  }
  function u() {
    Object.keys(n).forEach((d) => v(d));
  }
  return { getStore: (d, _ = null) => d in n ? n[d] : _, setStore: r, removeStore: v, clearStore: u };
}
async function on(o, e) {
  const n = e[o];
  return typeof n == "function" ? (await n()).default : n;
}
function sn(o, e, n, l) {
  const { getStore: r, setStore: v } = o, u = y({}), f = y(r("locale", e)), d = (i, h = e) => {
    on(i, l).then((b) => {
      u.value = b, v("locale", i), f.value = i, v("translations", b), Object.values(l).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + i }), n.emit("vf-language-saved"));
    }).catch(() => {
      h ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), d(h, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  fe(f, (i) => {
    d(i);
  }), !r("locale") && !Object.keys(l).length ? d(e) : u.value = r("translations");
  const _ = (i, ...h) => h.length ? _(i = i.replace("%s", String(h.shift())), ...h) : i;
  function c(i, ...h) {
    return u.value && Object.prototype.hasOwnProperty.call(u.value, i) ? _(u.value[i] || i, ...h) : _(i, ...h);
  }
  return Oe({ t: c, locale: f });
}
const Q = {
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
}, rn = Object.values(Q), ln = "4.0.0-dev";
function pt(o, e, n, l, r) {
  return e = Math, n = e.log, l = 1024, r = n(o) / n(l) | 0, (o / e.pow(l, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "iB" : "B");
}
function gt(o, e, n, l, r) {
  return e = Math, n = e.log, l = 1e3, r = n(o) / n(l) | 0, (o / e.pow(l, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "B" : "B");
}
function an(o) {
  if (typeof o == "number") return o;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(o);
  if (!l) return 0;
  const r = parseFloat(l[1] || "0"), v = (l[2] || "").toLowerCase(), u = e[v] ?? 0;
  return Math.round(r * Math.pow(1024, u));
}
const Ce = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function dn(o, e) {
  const n = y(Ce.SYSTEM), l = y(Ce.LIGHT);
  n.value = o.getStore("theme", e ?? Ce.SYSTEM);
  const r = window.matchMedia("(prefers-color-scheme: dark)"), v = (u) => {
    n.value === Ce.DARK || n.value === Ce.SYSTEM && u.matches ? l.value = Ce.DARK : l.value = Ce.LIGHT;
  };
  return v(r), r.addEventListener("change", v), {
    value: n,
    actualValue: l,
    set(u) {
      n.value = u, u !== Ce.SYSTEM ? o.setStore("theme", u) : o.removeStore("theme"), v(r);
    }
  };
}
function cn() {
  const o = vt(null), e = y(!1), n = y();
  return { visible: e, type: o, data: n, open: (v, u = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, o.value = v, n.value = u;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, o.value = null;
  } };
}
const We = {
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
  customIcon: void 0
}, un = (o) => {
  const e = `vuefinder_config_${o}`, n = Wt(e, We, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), l = (_ = {}) => {
    const c = n.get(), i = { ...We, ..._, ...c };
    n.set(i);
  }, r = (_) => n.get()[_], v = () => n.get(), u = (_, c) => {
    const i = n.get();
    typeof _ == "object" && _ !== null ? n.set({ ...i, ..._ }) : n.set({ ...i, [_]: c });
  };
  return {
    // Store atom
    state: n,
    // Methods
    init: l,
    get: r,
    set: u,
    toggle: (_) => {
      const c = n.get();
      u(_, !c[_]);
    },
    all: v,
    reset: () => {
      n.set({ ...We });
    }
  };
};
function vn(o, e) {
  if (typeof o == "string" && typeof e == "string")
    return o.toLowerCase().localeCompare(e.toLowerCase());
  const n = Number(o) || 0, l = Number(e) || 0;
  return n === l ? 0 : n < l ? -1 : 1;
}
const _n = () => {
  const o = we(""), e = we([]), n = we([]), l = we({ active: !1, column: "", order: "" }), r = we(/* @__PURE__ */ new Set()), v = we({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), u = we(null), f = we(0), d = we(!1), _ = Fe([o], (E) => {
    const L = (E || "local://").trim(), se = L.indexOf("://"), _e = se >= 0 ? L.slice(0, se) : "", Te = (se >= 0 ? L.slice(se + 3) : L).split("/").filter(Boolean);
    let ke = "";
    const Ae = Te.map(($e) => (ke = ke ? `${ke}/${$e}` : $e, { basename: $e, name: $e, path: _e ? `${_e}://${ke}` : ke, type: "dir" }));
    return { storage: _e, breadcrumb: Ae, path: L };
  }), c = Fe([n, l], (E, L) => {
    const { active: se, column: _e, order: He } = L;
    if (!se || !_e) return E;
    const Te = He === "asc" ? 1 : -1;
    return E.slice().sort((ke, Ae) => vn(ke[_e], Ae[_e]) * Te);
  }), i = Fe([n, r], (E, L) => L.size === 0 ? [] : E.filter((se) => L.has(se.path))), h = (E) => {
    o.set(E);
  }, b = (E) => {
    n.set(E ?? []);
  }, S = (E) => {
    e.set(E ?? []);
  }, C = (E, L) => {
    l.set({ active: !0, column: E, order: L });
  }, g = (E) => {
    const L = l.get();
    L.active && L.column === E ? l.set({
      active: L.order === "asc",
      column: E,
      order: "desc"
    }) : l.set({
      active: !0,
      column: E,
      order: "asc"
    });
  }, k = () => {
    l.set({ active: !1, column: "", order: "" });
  }, x = (E) => {
    const L = new Set(r.get());
    L.add(E), r.set(L), f.set(L.size);
  }, $ = (E) => {
    const L = new Set(r.get());
    L.delete(E), r.set(L), f.set(L.size);
  }, H = (E) => r.get().has(E), ee = (E) => {
    const L = new Set(r.get());
    L.has(E) ? L.delete(E) : L.add(E), r.set(L), f.set(L.size);
  }, ae = () => {
    const E = new Set(n.get().map((L) => L.path));
    r.set(E), f.set(E.size);
  }, J = () => {
    r.set(/* @__PURE__ */ new Set()), f.set(0);
  }, W = (E) => {
    const L = new Set(E ?? []);
    r.set(L), f.set(L.size);
  }, X = (E) => {
    f.set(E);
  }, oe = (E) => {
    d.set(!!E);
  }, q = () => d.get(), ie = (E, L) => {
    const se = n.get().filter((_e) => L.has(_e.path));
    v.set({
      type: E,
      path: _.get().path,
      items: new Set(se)
    });
  }, w = (E) => Fe([v], (L) => L.type === "cut" && Array.from(L.items).some((se) => se.path === E)), T = (E) => Fe([v], (L) => L.type === "copy" && Array.from(L.items).some((se) => se.path === E));
  return {
    // Atoms (state)
    files: n,
    storages: e,
    currentPath: o,
    sort: l,
    selectedKeys: r,
    selectedCount: f,
    loading: d,
    draggedItem: u,
    clipboardItems: v,
    // Computed values
    path: _,
    sortedFiles: c,
    selectedItems: i,
    // Actions
    setPath: h,
    setFiles: b,
    setStorages: S,
    setSort: C,
    toggleSort: g,
    clearSort: k,
    select: x,
    deselect: $,
    toggleSelect: ee,
    selectAll: ae,
    isSelected: H,
    clearSelection: J,
    setSelection: W,
    setSelectedCount: X,
    setLoading: oe,
    isLoading: q,
    setClipboard: ie,
    createIsCut: w,
    createIsCopied: T,
    isCut: (E) => {
      const L = w(E);
      return B(L).value ?? !1;
    },
    isCopied: (E) => {
      const L = T(E);
      return B(L).value ?? !1;
    },
    clearClipboard: () => {
      v.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
    },
    getClipboard: () => v.get(),
    setDraggedItem: (E) => {
      u.set(E);
    },
    getDraggedItem: () => u.get(),
    clearDraggedItem: () => {
      u.set(null);
    }
  };
}, dt = {
  query: "",
  searchMode: !1
}, mn = () => {
  const o = we(dt), e = Fe(o, (_) => _.query.length > 0);
  return {
    // Store atom
    state: o,
    // Computed values
    hasQuery: e,
    // Methods
    setQuery: (_) => {
      const c = o.get();
      o.set({ ...c, query: _ ?? "" });
    },
    enterSearchMode: () => {
      const _ = o.get();
      o.set({ ..._, searchMode: !0 });
    },
    exitSearchMode: () => {
      o.set({ query: "", searchMode: !1 });
    },
    get: (_) => o.get()[_],
    set: (_, c) => {
      const i = o.get();
      typeof _ == "object" && _ !== null ? o.set({ ...i, ..._ }) : o.set({ ...i, [_]: c });
    },
    all: () => o.get(),
    reset: () => {
      o.set({ ...dt });
    }
  };
}, fn = (o, e) => {
  const n = nn(o.id), l = Yt(), r = dn(n, o.theme), v = e.i18n, u = o.locale ?? e.locale, f = un(o.id), d = _n(), _ = mn(), c = (i) => Array.isArray(i) ? i : rn;
  return Oe({
    // app version
    version: ln,
    // config store
    config: f,
    // files store
    fs: d,
    // search store
    search: _,
    // root element
    root: De("root"),
    // app id
    debug: o.debug,
    // Event Bus
    emitter: l,
    // storage
    storage: n,
    // localization object
    i18n: sn(n, u, l, v),
    // modal state
    modal: cn(),
    // http object
    requester: tn(o.request),
    // active features
    features: c(o.features),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // theme state
    theme: r,
    // human readable file sizes
    filesize: f.get("metricUnits") ? gt : pt,
    // possible items of the context menu
    contextMenuItems: o.contextMenuItems,
    // custom icon
    customIcon: o.icon
  });
}, hn = { class: "vuefinder__modal-layout__container" }, pn = { class: "vuefinder__modal-layout__content" }, gn = { class: "vuefinder__modal-layout__footer" }, ye = /* @__PURE__ */ j({
  __name: "ModalLayout",
  setup(o) {
    const e = y(null), n = Y("ServiceContainer");
    return ce(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Pe(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const r = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: r,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (l, r) => (a(), m("div", {
      class: "vuefinder vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: r[1] || (r[1] = Ve((v) => t(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      r[2] || (r[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", hn, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: r[0] || (r[0] = ge((v) => t(n).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", pn, [
              Le(l.$slots, "default")
            ]),
            s("div", gn, [
              Le(l.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}), wn = { class: "vuefinder__modal-header" }, bn = { class: "vuefinder__modal-header__icon-container" }, yn = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Se = /* @__PURE__ */ j({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(o) {
    return (e, n) => (a(), m("div", wn, [
      s("div", bn, [
        (a(), F(Ze(o.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("h3", yn, p(o.title), 1)
    ]));
  }
}), kn = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(o, { emit: e, slots: n }) {
    const l = Y("ServiceContainer"), r = y(!1), { t: v } = l.i18n;
    let u = null;
    const f = () => {
      clearTimeout(u), r.value = !0, u = setTimeout(() => {
        r.value = !1;
      }, 2e3);
    };
    return ce(() => {
      l.emitter.on(o.on, f);
    }), Re(() => {
      clearTimeout(u);
    }), {
      shown: r,
      t: v
    };
  }
}, xn = (o, e) => {
  const n = o.__vccOpts || o;
  for (const [l, r] of e)
    n[l] = r;
  return n;
}, Sn = { key: 1 };
function $n(o, e, n, l, r, v) {
  return a(), m("div", {
    class: Z(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    o.$slots.default ? Le(o.$slots, "default", { key: 0 }) : (a(), m("span", Sn, p(l.t("Saved.")), 1))
  ], 2);
}
const Ie = /* @__PURE__ */ xn(kn, [["render", $n]]), Cn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function En(o, e) {
  return a(), m("svg", Cn, [...e[0] || (e[0] = [
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
const Mn = { render: En }, Tn = { class: "vuefinder__about-modal__content" }, An = { class: "vuefinder__about-modal__main" }, Dn = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, In = ["onClick", "aria-current"], Fn = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Ln = { class: "vuefinder__about-modal__description" }, Vn = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Rn = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Bn = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Hn = { class: "vuefinder__about-modal__description" }, Nn = { class: "vuefinder__about-modal__settings" }, Pn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, qn = { class: "vuefinder__about-modal__setting-input" }, Un = ["checked"], On = { class: "vuefinder__about-modal__setting-label" }, zn = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Kn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, jn = { class: "vuefinder__about-modal__setting-input" }, Gn = ["checked"], Yn = { class: "vuefinder__about-modal__setting-label" }, Wn = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Qn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Xn = { class: "vuefinder__about-modal__setting-input" }, Jn = ["checked"], Zn = { class: "vuefinder__about-modal__setting-label" }, eo = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, to = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, no = { class: "vuefinder__about-modal__setting-input" }, oo = ["checked"], so = { class: "vuefinder__about-modal__setting-label" }, ro = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, lo = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, ao = { class: "vuefinder__about-modal__setting-input" }, io = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, co = { class: "vuefinder__about-modal__setting-label" }, uo = ["label"], vo = ["value"], _o = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, mo = { class: "vuefinder__about-modal__setting-input" }, fo = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, ho = { class: "vuefinder__about-modal__setting-label" }, po = ["label"], go = ["value"], wo = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, bo = { class: "vuefinder__about-modal__shortcuts" }, yo = { class: "vuefinder__about-modal__shortcut" }, ko = { class: "vuefinder__about-modal__shortcut" }, xo = { class: "vuefinder__about-modal__shortcut" }, So = { class: "vuefinder__about-modal__shortcut" }, $o = { class: "vuefinder__about-modal__shortcut" }, Co = { class: "vuefinder__about-modal__shortcut" }, Eo = { class: "vuefinder__about-modal__shortcut" }, Mo = { class: "vuefinder__about-modal__shortcut" }, To = { class: "vuefinder__about-modal__shortcut" }, Ao = { class: "vuefinder__about-modal__shortcut" }, Do = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Io = { class: "vuefinder__about-modal__description" }, tt = /* @__PURE__ */ j({
  __name: "ModalAbout",
  setup(o) {
    const e = Y("ServiceContainer"), n = e.config, { clearStore: l } = e.storage, { t: r } = e.i18n, v = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, u = re(() => [
      { name: r("About"), key: v.ABOUT, current: !1 },
      { name: r("Settings"), key: v.SETTINGS, current: !1 },
      { name: r("Shortcuts"), key: v.SHORTCUTS, current: !1 },
      { name: r("Reset"), key: v.RESET, current: !1 }
    ]), f = y("about"), d = async () => {
      n.reset(), l(), location.reload();
    }, _ = (x) => {
      e.theme.set(x), e.emitter.emit("vf-theme-saved");
    }, c = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? gt : pt, e.emitter.emit("vf-metric-units-saved");
    }, i = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, h = () => {
      n.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, b = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: S } = Y("VueFinderOptions"), g = Object.fromEntries(
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
      }).filter(([x]) => Object.keys(S).includes(x))
    ), k = re(() => ({
      system: r("System"),
      light: r("Light"),
      dark: r("Dark")
    }));
    return (x, $) => (a(), F(ye, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: $[3] || ($[3] = (H) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(r)("Close")), 1)
      ]),
      default: K(() => [
        s("div", Tn, [
          I(Se, {
            icon: t(Mn),
            title: "Vuefinder " + t(e).version
          }, null, 8, ["icon", "title"]),
          s("div", An, [
            s("div", null, [
              s("div", null, [
                s("nav", Dn, [
                  (a(!0), m(ne, null, le(u.value, (H) => (a(), m("button", {
                    key: H.name,
                    onClick: (ee) => f.value = H.key,
                    class: Z([H.key === f.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": H.current ? "page" : void 0
                  }, p(H.name), 11, In))), 128))
                ])
              ])
            ]),
            f.value === v.ABOUT ? (a(), m("div", Fn, [
              s("div", Ln, p(t(r)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              s("a", Vn, p(t(r)("Project home")), 1),
              s("a", Rn, p(t(r)("Follow on GitHub")), 1)
            ])) : M("", !0),
            f.value === v.SETTINGS ? (a(), m("div", Bn, [
              s("div", Hn, p(t(r)("Customize your experience with the following settings")), 1),
              s("div", Nn, [
                s("fieldset", null, [
                  s("div", Pn, [
                    s("div", qn, [
                      s("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: t(n).get("metricUnits"),
                        onChange: c,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Un)
                    ]),
                    s("div", On, [
                      s("label", zn, [
                        P(p(t(r)("Use Metric Units")) + " ", 1),
                        I(Ie, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: K(() => [
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
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: t(n).get("compactListView"),
                        onChange: i,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Gn)
                    ]),
                    s("div", Yn, [
                      s("label", Wn, [
                        P(p(t(r)("Compact list view")) + " ", 1),
                        I(Ie, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: K(() => [
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
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: t(n).get("persist"),
                        onChange: b,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Jn)
                    ]),
                    s("div", Zn, [
                      s("label", eo, [
                        P(p(t(r)("Persist path on reload")) + " ", 1),
                        I(Ie, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: K(() => [
                            P(p(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", to, [
                    s("div", no, [
                      s("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: t(n).get("showThumbnails"),
                        onChange: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, oo)
                    ]),
                    s("div", so, [
                      s("label", ro, [
                        P(p(t(r)("Show thumbnails")) + " ", 1),
                        I(Ie, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: K(() => [
                            P(p(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", lo, [
                    s("div", ao, [
                      s("label", io, p(t(r)("Theme")), 1)
                    ]),
                    s("div", co, [
                      de(s("select", {
                        id: "theme",
                        "onUpdate:modelValue": $[0] || ($[0] = (H) => t(e).theme.value = H),
                        onChange: $[1] || ($[1] = (H) => _(H.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Theme")
                        }, [
                          (a(!0), m(ne, null, le(k.value, (H, ee) => (a(), m("option", { value: ee }, p(H), 9, vo))), 256))
                        ], 8, uo)
                      ], 544), [
                        [it, t(e).theme.value]
                      ]),
                      I(Ie, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: K(() => [
                          P(p(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t(e).features.includes(t(Q).LANGUAGE) && Object.keys(t(g)).length > 1 ? (a(), m("div", _o, [
                    s("div", mo, [
                      s("label", fo, p(t(r)("Language")), 1)
                    ]),
                    s("div", ho, [
                      de(s("select", {
                        id: "language",
                        "onUpdate:modelValue": $[2] || ($[2] = (H) => t(e).i18n.locale = H),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Language")
                        }, [
                          (a(!0), m(ne, null, le(t(g), (H, ee) => (a(), m("option", { value: ee }, p(H), 9, go))), 256))
                        ], 8, po)
                      ], 512), [
                        [it, t(e).i18n.locale]
                      ]),
                      I(Ie, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: K(() => [
                          P(p(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : M("", !0)
                ])
              ])
            ])) : M("", !0),
            f.value === v.SHORTCUTS ? (a(), m("div", wo, [
              s("div", bo, [
                s("div", yo, [
                  s("div", null, p(t(r)("Rename")), 1),
                  $[4] || ($[4] = s("kbd", null, "F2", -1))
                ]),
                s("div", ko, [
                  s("div", null, p(t(r)("Refresh")), 1),
                  $[5] || ($[5] = s("kbd", null, "F5", -1))
                ]),
                s("div", xo, [
                  P(p(t(r)("Delete")) + " ", 1),
                  $[6] || ($[6] = s("kbd", null, "Del", -1))
                ]),
                s("div", So, [
                  P(p(t(r)("Escape")) + " ", 1),
                  $[7] || ($[7] = s("div", null, [
                    s("kbd", null, "Esc")
                  ], -1))
                ]),
                s("div", $o, [
                  P(p(t(r)("Select All")) + " ", 1),
                  $[8] || ($[8] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    P(" + "),
                    s("kbd", null, "A")
                  ], -1))
                ]),
                s("div", Co, [
                  P(p(t(r)("Search")) + " ", 1),
                  $[9] || ($[9] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    P(" + "),
                    s("kbd", null, "F")
                  ], -1))
                ]),
                s("div", Eo, [
                  P(p(t(r)("Toggle Sidebar")) + " ", 1),
                  $[10] || ($[10] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    P(" + "),
                    s("kbd", null, "E")
                  ], -1))
                ]),
                s("div", Mo, [
                  P(p(t(r)("Open Settings")) + " ", 1),
                  $[11] || ($[11] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    P(" + "),
                    s("kbd", null, ",")
                  ], -1))
                ]),
                s("div", To, [
                  P(p(t(r)("Toggle Full Screen")) + " ", 1),
                  $[12] || ($[12] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    P(" + "),
                    s("kbd", null, "Enter")
                  ], -1))
                ]),
                s("div", Ao, [
                  P(p(t(r)("Preview")) + " ", 1),
                  $[13] || ($[13] = s("div", null, [
                    s("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : M("", !0),
            f.value === v.RESET ? (a(), m("div", Do, [
              s("div", Io, p(t(r)("Reset all settings to default")), 1),
              s("button", {
                onClick: d,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, p(t(r)("Reset Settings")), 1)
            ])) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Lo(o, e) {
  return a(), m("svg", Fo, [...e[0] || (e[0] = [
    s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const wt = { render: Lo }, Vo = { class: "vuefinder__delete-modal__content" }, Ro = { class: "vuefinder__delete-modal__form" }, Bo = { class: "vuefinder__delete-modal__description" }, Ho = { class: "vuefinder__delete-modal__files vf-scrollbar" }, No = { class: "vuefinder__delete-modal__file" }, Po = {
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
}, Uo = { class: "vuefinder__delete-modal__file-name" }, Oo = { class: "vuefinder__delete-modal__warning" }, ze = /* @__PURE__ */ j({
  __name: "ModalDelete",
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = B(l.path), v = y(e.modal.data.items), u = y(""), f = () => {
      v.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: v.value.map(({ path: d, type: _ }) => ({ path: d, type: _ }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (d) => {
          u.value = n(d.message);
        }
      });
    };
    return (d, _) => (a(), F(ye, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: f,
          class: "vf-btn vf-btn-danger"
        }, p(t(n)("Yes, Delete!")), 1),
        s("button", {
          type: "button",
          onClick: _[1] || (_[1] = (c) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Cancel")), 1),
        s("div", Oo, p(t(n)("This action cannot be undone.")), 1)
      ]),
      default: K(() => [
        s("div", null, [
          I(Se, {
            icon: t(wt),
            title: t(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", Vo, [
            s("div", Ro, [
              s("p", Bo, p(t(n)("Are you sure you want to delete these files?")), 1),
              s("div", Ho, [
                (a(!0), m(ne, null, le(v.value, (c) => (a(), m("p", No, [
                  c.type === "dir" ? (a(), m("svg", Po, [..._[2] || (_[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), m("svg", qo, [..._[3] || (_[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", Uo, p(c.basename), 1)
                ]))), 256))
              ]),
              u.value.length ? (a(), F(t(u), {
                key: 0,
                onHidden: _[0] || (_[0] = (c) => u.value = ""),
                error: ""
              }, {
                default: K(() => [
                  P(p(u.value), 1)
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
}), zo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ko(o, e) {
  return a(), m("svg", zo, [...e[0] || (e[0] = [
    s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const bt = { render: Ko }, jo = { class: "vuefinder__rename-modal__content" }, Go = { class: "vuefinder__rename-modal__item" }, Yo = { class: "vuefinder__rename-modal__item-info" }, Wo = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qo = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xo = { class: "vuefinder__rename-modal__item-name" }, Ke = /* @__PURE__ */ j({
  __name: "ModalRename",
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = B(l.path), v = y(e.modal.data.items[0]), u = y(e.modal.data.items[0].basename), f = y(""), d = () => {
      u.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          item: v.value.path,
          name: u.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", u.value) });
        },
        onError: (_) => {
          f.value = n(_.message);
        }
      });
    };
    return (_, c) => (a(), F(ye, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, p(t(n)("Rename")), 1),
        s("button", {
          type: "button",
          onClick: c[2] || (c[2] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Cancel")), 1)
      ]),
      default: K(() => [
        s("div", null, [
          I(Se, {
            icon: t(bt),
            title: t(n)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", jo, [
            s("div", Go, [
              s("p", Yo, [
                v.value.type === "dir" ? (a(), m("svg", Wo, [...c[3] || (c[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (a(), m("svg", Qo, [...c[4] || (c[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Xo, p(v.value.basename), 1)
              ]),
              de(s("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (i) => u.value = i),
                onKeyup: Ve(d, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Be, u.value]
              ]),
              f.value.length ? (a(), F(t(f), {
                key: 0,
                onHidden: c[1] || (c[1] = (i) => f.value = ""),
                error: ""
              }, {
                default: K(() => [
                  P(p(f.value), 1)
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
}), Jo = ["title"], yt = /* @__PURE__ */ j({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(o, { emit: e }) {
    const n = e, l = Y("ServiceContainer"), { t: r } = l.i18n, v = y(!1), u = y(null), f = y(u.value?.innerHTML);
    fe(f, () => v.value = !1);
    const d = () => {
      n("hidden"), v.value = !0;
    };
    return (_, c) => (a(), m("div", null, [
      v.value ? M("", !0) : (a(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: u,
        class: Z(["vuefinder__message", o.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Le(_.$slots, "default"),
        s("div", {
          class: "vuefinder__message__close",
          onClick: d,
          title: t(r)("Close")
        }, [...c[0] || (c[0] = [
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
        ])], 8, Jo)
      ], 2))
    ]));
  }
}), Zo = { class: "vuefinder__text-preview" }, es = { class: "vuefinder__text-preview__header" }, ts = ["title"], ns = { class: "vuefinder__text-preview__actions" }, os = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, ss = { key: 1 }, rs = /* @__PURE__ */ j({
  __name: "Text",
  emits: ["success"],
  setup(o, { emit: e }) {
    const n = e, l = y(""), r = y(""), v = y(null), u = y(!1), f = y(""), d = y(!1), _ = Y("ServiceContainer"), { t: c } = _.i18n;
    ce(() => {
      _.requester.send({
        url: "",
        method: "get",
        params: {
          q: "preview",
          storage: _.modal.data.storage,
          path: _.modal.data.item.path
        },
        responseType: "text"
      }).then((b) => {
        l.value = b, n("success");
      });
    });
    const i = () => {
      u.value = !u.value, r.value = l.value;
    }, h = () => {
      f.value = "", d.value = !1, _.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          storage: _.modal.data.storage,
          path: _.modal.data.item.path
        },
        body: {
          content: r.value
        },
        responseType: "text"
      }).then((b) => {
        f.value = c("Updated."), l.value = b, n("success"), u.value = !u.value;
      }).catch((b) => {
        f.value = c(b.message), d.value = !0;
      });
    };
    return (b, S) => (a(), m("div", Zo, [
      s("div", es, [
        s("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(_).modal.data.item.path
        }, p(t(_).modal.data.item.basename), 9, ts),
        s("div", ns, [
          u.value ? (a(), m("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__text-preview__save-button"
          }, p(t(c)("Save")), 1)) : M("", !0),
          t(_).features.includes(t(Q).EDIT) ? (a(), m("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: S[0] || (S[0] = (C) => i())
          }, p(u.value ? t(c)("Cancel") : t(c)("Edit")), 1)) : M("", !0)
        ])
      ]),
      s("div", null, [
        u.value ? (a(), m("div", ss, [
          de(s("textarea", {
            ref_key: "editInput",
            ref: v,
            "onUpdate:modelValue": S[1] || (S[1] = (C) => r.value = C),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Be, r.value]
          ])
        ])) : (a(), m("pre", os, p(l.value), 1)),
        f.value.length ? (a(), F(yt, {
          key: 2,
          onHidden: S[2] || (S[2] = (C) => f.value = ""),
          error: d.value
        }, {
          default: K(() => [
            P(p(f.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : M("", !0)
      ])
    ]));
  }
}), ls = { class: "vuefinder__image-preview" }, as = { class: "vuefinder__image-preview__header" }, is = ["title"], ds = { class: "vuefinder__image-preview__actions" }, cs = { class: "vuefinder__image-preview__image-container h-[50vh] w-full" }, us = ["src"], vs = /* @__PURE__ */ j({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(o, { emit: e }) {
    const n = e, l = Y("ServiceContainer"), { t: r } = l.i18n, v = y(!1), u = y(""), f = y(!1), d = y(l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item)), _ = y(d.value), c = De("cropperRef"), i = async () => {
      v.value = !v.value;
    }, h = async () => {
      const S = c.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      S && S.toBlob((C) => {
        if (!C) return;
        u.value = "", f.value = !1;
        const g = new FormData();
        g.set("file", C), l.requester.send({
          url: "",
          method: "post",
          params: {
            q: "upload",
            storage: l.modal.data.storage,
            path: l.modal.data.item.path
          },
          body: g
        }).then(() => {
          u.value = r("Updated."), fetch(d.value, { cache: "reload", mode: "no-cors" });
          const k = l.root.querySelector('[data-src="' + d.value + '"]');
          k && ht.resetStatus(k), l.emitter.emit("vf-refresh-thumbnails"), i(), n("success");
        }).catch((k) => {
          const x = k?.message ?? "Error";
          u.value = r(x), f.value = !0;
        });
      });
    };
    return ce(() => {
      n("success");
    }), (b, S) => (a(), m("div", ls, [
      s("div", as, [
        s("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, p(t(l).modal.data.item.basename), 9, is),
        s("div", ds, [
          v.value ? (a(), m("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__image-preview__crop-button"
          }, p(t(r)("Crop")), 1)) : M("", !0),
          t(l).features.includes(t(Q).EDIT) ? (a(), m("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: S[0] || (S[0] = (C) => i())
          }, p(v.value ? t(r)("Cancel") : t(r)("Edit")), 1)) : M("", !0)
        ])
      ]),
      s("div", cs, [
        v.value ? (a(), F(t(Qt), {
          key: 1,
          ref_key: "cropperRef",
          ref: c,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: _.value,
          "stencil-props": { aspectRatio: 795 / 341 },
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (a(), m("img", {
          key: 0,
          style: { width: "100%", height: "100%" },
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, us))
      ]),
      u.value.length ? (a(), F(t(u), {
        key: 0,
        onHidden: S[1] || (S[1] = (C) => u.value = ""),
        error: f.value
      }, {
        default: K(() => [
          P(p(u.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : M("", !0)
    ]));
  }
}), _s = { class: "vuefinder__default-preview" }, ms = { class: "vuefinder__default-preview__header" }, fs = ["title"], hs = /* @__PURE__ */ j({
  __name: "Default",
  emits: ["success"],
  setup(o, { emit: e }) {
    const n = Y("ServiceContainer"), l = e;
    return ce(() => {
      l("success");
    }), (r, v) => (a(), m("div", _s, [
      s("div", ms, [
        s("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: t(n).modal.data.item.path
        }, p(t(n).modal.data.item.basename), 9, fs)
      ]),
      v[0] || (v[0] = s("div", null, null, -1))
    ]));
  }
}), ps = { class: "vuefinder__video-preview" }, gs = ["title"], ws = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, bs = ["src"], ys = /* @__PURE__ */ j({
  __name: "Video",
  emits: ["success"],
  setup(o, { emit: e }) {
    const n = Y("ServiceContainer"), l = e, r = () => n.requester.getPreviewUrl(n.modal.data.storage, n.modal.data.item);
    return ce(() => {
      l("success");
    }), (v, u) => (a(), m("div", ps, [
      s("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: t(n).modal.data.item.path
      }, p(t(n).modal.data.item.basename), 9, gs),
      s("div", null, [
        s("video", ws, [
          s("source", {
            src: r(),
            type: "video/mp4"
          }, null, 8, bs),
          u[0] || (u[0] = P(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), ks = { class: "vuefinder__audio-preview" }, xs = ["title"], Ss = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, $s = ["src"], Cs = /* @__PURE__ */ j({
  __name: "Audio",
  emits: ["success"],
  setup(o, { emit: e }) {
    const n = e, l = Y("ServiceContainer"), r = () => l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item);
    return ce(() => {
      n("success");
    }), (v, u) => (a(), m("div", ks, [
      s("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: t(l).modal.data.item.path
      }, p(t(l).modal.data.item.basename), 9, xs),
      s("div", null, [
        s("audio", Ss, [
          s("source", {
            src: r(),
            type: "audio/mpeg"
          }, null, 8, $s),
          u[0] || (u[0] = P(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Es = { class: "vuefinder__pdf-preview" }, Ms = ["title"], Ts = ["data"], As = ["src"], Ds = /* @__PURE__ */ j({
  __name: "Pdf",
  emits: ["success"],
  setup(o, { emit: e }) {
    const n = Y("ServiceContainer"), l = e, r = () => n.requester.getPreviewUrl(n.modal.data.storage, n.modal.data.item);
    return ce(() => {
      l("success");
    }), (v, u) => (a(), m("div", Es, [
      s("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: t(n).modal.data.item.path
      }, p(t(n).modal.data.item.basename), 9, Ms),
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
          }, " Your browser does not support PDFs ", 8, As)
        ], 8, Ts)
      ])
    ]));
  }
});
function Is(o, e = null) {
  return new Date(o * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Fs = { class: "vuefinder__preview-modal__content" }, Ls = { key: 0 }, Vs = { class: "vuefinder__preview-modal__loading" }, Rs = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Bs = { class: "vuefinder__preview-modal__details" }, Hs = { class: "font-bold" }, Ns = { class: "font-bold pl-2" }, Ps = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, qs = ["download", "href"], nt = /* @__PURE__ */ j({
  __name: "ModalPreview",
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, l = y(!1), r = (u) => (e.modal.data.item.mime_type ?? "").startsWith(u), v = e.features.includes(Q.PREVIEW);
    return v || (l.value = !0), (u, f) => (a(), F(ye, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: f[6] || (f[6] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Close")), 1),
        t(e).features.includes(t(Q).DOWNLOAD) ? (a(), m("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item),
          href: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item)
        }, p(t(n)("Download")), 9, qs)) : M("", !0)
      ]),
      default: K(() => [
        s("div", null, [
          s("div", Fs, [
            t(v) ? (a(), m("div", Ls, [
              r("text") ? (a(), F(rs, {
                key: 0,
                onSuccess: f[0] || (f[0] = (d) => l.value = !0)
              })) : r("image") ? (a(), F(vs, {
                key: 1,
                onSuccess: f[1] || (f[1] = (d) => l.value = !0)
              })) : r("video") ? (a(), F(ys, {
                key: 2,
                onSuccess: f[2] || (f[2] = (d) => l.value = !0)
              })) : r("audio") ? (a(), F(Cs, {
                key: 3,
                onSuccess: f[3] || (f[3] = (d) => l.value = !0)
              })) : r("application/pdf") ? (a(), F(Ds, {
                key: 4,
                onSuccess: f[4] || (f[4] = (d) => l.value = !0)
              })) : (a(), F(hs, {
                key: 5,
                onSuccess: f[5] || (f[5] = (d) => l.value = !0)
              }))
            ])) : M("", !0),
            s("div", Vs, [
              l.value === !1 ? (a(), m("div", Rs, [
                f[7] || (f[7] = s("svg", {
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
                s("span", null, p(t(n)("Loading")), 1)
              ])) : M("", !0)
            ])
          ])
        ]),
        s("div", Bs, [
          s("div", null, [
            s("span", Hs, p(t(n)("File Size")) + ": ", 1),
            P(p(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", Ns, p(t(n)("Last Modified")) + ": ", 1),
            P(" " + p(t(Is)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(Q).DOWNLOAD) ? (a(), m("div", Ps, [
          s("span", null, p(t(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : M("", !0)
      ]),
      _: 1
    }));
  }
}), Us = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Os(o, e) {
  return a(), m("svg", Us, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const zs = { render: Os }, Ks = { class: "vuefinder__move-modal__content" }, js = { class: "vuefinder__move-modal__description" }, Gs = { class: "vuefinder__move-modal__files vf-scrollbar" }, Ys = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ws = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qs = { class: "vuefinder__move-modal__file-name" }, Xs = { class: "vuefinder__move-modal__target-title" }, Js = { class: "vuefinder__move-modal__target-directory" }, Zs = { class: "vuefinder__move-modal__target-path" }, er = { class: "vuefinder__move-modal__selected-items" }, kt = /* @__PURE__ */ j({
  __name: "ModalTransfer",
  props: {
    q: {},
    title: {},
    body: {},
    successBtn: {},
    successText: {}
  },
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = B(l.path), v = o, u = y(e.modal.data.items.from), f = e.modal.data.items.to, d = y(""), _ = () => {
      u.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: v.q,
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: u.value.map(({ path: c, type: i }) => ({ path: c, type: i })),
          item: f.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: v.successText });
        },
        onError: (c) => {
          d.value = n(c.message);
        }
      });
    };
    return (c, i) => (a(), F(ye, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: _,
          class: "vf-btn vf-btn-primary"
        }, p(v.successBtn), 1),
        s("button", {
          type: "button",
          onClick: i[1] || (i[1] = (h) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Cancel")), 1),
        s("div", er, p(t(n)("%s item(s) selected.", u.value.length)), 1)
      ]),
      default: K(() => [
        s("div", null, [
          I(Se, {
            icon: t(zs),
            title: v.title
          }, null, 8, ["icon", "title"]),
          s("div", Ks, [
            s("p", js, p(v.body), 1),
            s("div", Gs, [
              (a(!0), m(ne, null, le(u.value, (h) => (a(), m("div", {
                class: "vuefinder__move-modal__file",
                key: h.path
              }, [
                s("div", null, [
                  h.type === "dir" ? (a(), m("svg", Ys, [...i[2] || (i[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), m("svg", Ws, [...i[3] || (i[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", Qs, p(h.path), 1)
              ]))), 128))
            ]),
            s("h4", Xs, p(t(n)("Target Directory")), 1),
            s("p", Js, [
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
              s("span", Zs, p(t(f).path), 1)
            ]),
            d.value.length ? (a(), F(t(d), {
              key: 0,
              onHidden: i[0] || (i[0] = (h) => d.value = ""),
              error: ""
            }, {
              default: K(() => [
                P(p(d.value), 1)
              ]),
              _: 1
            })) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ot = /* @__PURE__ */ j({
  __name: "ModalMove",
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n;
    return (l, r) => (a(), F(kt, {
      q: "move",
      title: t(n)("Move files"),
      body: t(n)("Are you sure you want to move these files"),
      "success-btn": t(n)("Yes, Move!"),
      "success-text": t(n)("Files moved.")
    }, null, 8, ["title", "body", "success-btn", "success-text"]));
  }
}), xt = /* @__PURE__ */ j({
  __name: "ModalCopy",
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n;
    return (l, r) => (a(), F(kt, {
      q: "copy",
      title: t(n)("Copy files"),
      body: t(n)("Are you sure you want to copy these files"),
      "success-btn": t(n)("Yes, Copy!"),
      "success-text": t(n)("Files copied.")
    }, null, 8, ["title", "body", "success-btn", "success-text"]));
  }
}), he = {
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
function tr(o) {
  const e = o.search, n = o.fs, l = o.config, r = B(e.state), v = B(n.selectedItems), u = (f) => {
    if (f.code === he.ESCAPE && (o.modal.close(), o.root.focus()), !o.modal.visible && !r.value?.searchMode) {
      if (f.code === he.F2 && o.features.includes(Q.RENAME) && v.value.length === 1 && o.modal.open(Ke, { items: v.value }), f.code === he.F5 && o.emitter.emit("vf-fetch", { params: { q: "index", storage: n.path.get().storage, path: n.path.get().path } }), f.code === he.DELETE && v.value.length === 0 && o.modal.open(ze, { items: v.value }), f.ctrlKey && f.code === he.BACKSLASH && o.modal.open(tt), f.ctrlKey && f.code === he.KEY_F && o.features.includes(Q.SEARCH) && (e.enterSearchMode(), f.preventDefault()), f.ctrlKey && f.code === he.KEY_E && (l.toggle("showTreeView"), f.preventDefault()), f.ctrlKey && f.code === he.ENTER && (l.toggle("fullScreen"), o.root.focus()), f.ctrlKey && f.code === he.KEY_A && (n.selectAll(), f.preventDefault()), f.code === he.SPACE && v.value.length === 1 && v.value[0]?.type !== "dir" && o.modal.open(nt, { storage: n.path.get().storage, item: v.value[0] }), f.metaKey && f.code === he.KEY_C) {
        if (v.value.length === 0) {
          o.emitter.emit("vf-toast-push", { type: "error", label: o.i18n.t("No items selected") });
          return;
        }
        n.setClipboard("copy", new Set(v.value.map((d) => d.path))), o.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? o.i18n.t("Item copied to clipboard") : o.i18n.t("%s items copied to clipboard", v.value.length) }), f.preventDefault();
      }
      if (f.metaKey && f.code === he.KEY_X) {
        if (v.value.length === 0) {
          o.emitter.emit("vf-toast-push", { type: "error", label: o.i18n.t("No items selected") });
          return;
        }
        n.setClipboard("cut", new Set(v.value.map((d) => d.path))), o.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? o.i18n.t("Item cut to clipboard") : o.i18n.t("%s items cut to clipboard", v.value.length) }), f.preventDefault();
      }
      if (f.metaKey && f.code === he.KEY_V) {
        if (n.getClipboard().items.size === 0) {
          o.emitter.emit("vf-toast-push", { type: "error", label: o.i18n.t("No items in clipboard") });
          return;
        }
        if (n.getClipboard().path === n.path.get().path) {
          o.emitter.emit("vf-toast-push", { type: "error", label: o.i18n.t("Cannot paste items to the same directory") });
          return;
        }
        if (n.getClipboard().type === "cut") {
          o.modal.open(ot, { items: { from: Array.from(n.getClipboard().items), to: n.path.get() } }), n.clearClipboard();
          return;
        }
        if (n.getClipboard().type === "copy") {
          o.modal.open(xt, { items: { from: Array.from(n.getClipboard().items), to: n.path.get() } });
          return;
        }
        f.preventDefault();
      }
    }
  };
  ce(() => {
    o.root.addEventListener("keydown", u);
  }), Ht(() => {
    o.root.removeEventListener("keydown", u);
  });
}
const nr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function or(o, e) {
  return a(), m("svg", nr, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const St = { render: or }, sr = { class: "vuefinder__new-folder-modal__content" }, rr = { class: "vuefinder__new-folder-modal__form" }, lr = { class: "vuefinder__new-folder-modal__description" }, ar = ["placeholder"], st = /* @__PURE__ */ j({
  __name: "ModalNewFolder",
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = B(l.path), v = y(""), u = y(""), f = () => {
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
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", v.value) });
        },
        onError: (d) => {
          u.value = n(d.message);
        }
      });
    };
    return (d, _) => (a(), F(ye, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: f,
          class: "vf-btn vf-btn-primary"
        }, p(t(n)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (c) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Cancel")), 1)
      ]),
      default: K(() => [
        s("div", null, [
          I(Se, {
            icon: t(St),
            title: t(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", sr, [
            s("div", rr, [
              s("p", lr, p(t(n)("Create a new folder")), 1),
              de(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (c) => v.value = c),
                onKeyup: Ve(f, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(n)("Folder Name"),
                type: "text"
              }, null, 40, ar), [
                [Be, v.value]
              ]),
              u.value.length ? (a(), F(t(u), {
                key: 0,
                onHidden: _[1] || (_[1] = (c) => u.value = ""),
                error: ""
              }, {
                default: K(() => [
                  P(p(u.value), 1)
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
}), ir = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function dr(o, e) {
  return a(), m("svg", ir, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const $t = { render: dr }, cr = { class: "vuefinder__new-file-modal__content" }, ur = { class: "vuefinder__new-file-modal__form" }, vr = { class: "vuefinder__new-file-modal__description" }, _r = ["placeholder"], Ct = /* @__PURE__ */ j({
  __name: "ModalNewFile",
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = B(l.path), v = y(""), u = y(""), f = () => {
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
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", v.value) });
        },
        onError: (d) => {
          u.value = n(d.message);
        }
      });
    };
    return (d, _) => (a(), F(ye, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: f,
          class: "vf-btn vf-btn-primary"
        }, p(t(n)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (c) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Cancel")), 1)
      ]),
      default: K(() => [
        s("div", null, [
          I(Se, {
            icon: t($t),
            title: t(n)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", cr, [
            s("div", ur, [
              s("p", vr, p(t(n)("Create a new file")), 1),
              de(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (c) => v.value = c),
                onKeyup: Ve(f, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(n)("File Name"),
                type: "text"
              }, null, 40, _r), [
                [Be, v.value]
              ]),
              u.value.length ? (a(), F(t(u), {
                key: 0,
                onHidden: _[1] || (_[1] = (c) => u.value = ""),
                error: ""
              }, {
                default: K(() => [
                  P(p(u.value), 1)
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
}), ve = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function mr() {
  const o = Y("ServiceContainer"), { t: e } = o.i18n, n = o.fs, l = B(n.path), r = o.config, v = y({ QUEUE_ENTRY_STATUS: ve }), u = y(null), f = y(null), d = y(null), _ = y(null), c = y(null), i = y(null), h = y([]), b = y(""), S = y(!1), C = y(!1);
  let g;
  const k = (q) => h.value.findIndex((ie) => ie.id === q), x = (q, ie) => g.addFile({ name: ie || q.name, type: q.type, data: q, source: "Local" }), $ = (q) => q.status === ve.DONE ? "text-green-600" : q.status === ve.ERROR || q.status === ve.CANCELED ? "text-red-600" : "", H = (q) => q.status === ve.DONE ? "✓" : q.status === ve.ERROR || q.status === ve.CANCELED ? "!" : "...", ee = () => _.value?.click(), ae = () => o.modal.close(), J = () => {
    if (S.value || !h.value.filter((q) => q.status !== ve.DONE).length) {
      S.value || (b.value = e("Please select file to upload first."));
      return;
    }
    b.value = "", g.retryAll(), g.upload();
  }, W = () => {
    g.cancelAll(), h.value.forEach((q) => {
      q.status !== ve.DONE && (q.status = ve.CANCELED, q.statusName = e("Canceled"));
    }), S.value = !1;
  }, X = (q) => {
    S.value || (g.removeFile(q.id), h.value.splice(k(q.id), 1));
  }, oe = (q) => {
    if (!S.value)
      if (g.cancelAll(), q) {
        const ie = h.value.filter((w) => w.status !== ve.DONE);
        h.value = [], ie.forEach((w) => x(w.originalFile, w.name));
      } else
        h.value = [];
  };
  return ce(() => {
    g = new Xt({
      debug: o.debug,
      restrictions: { maxFileSize: an(r.maxFileSize ?? "10mb") },
      locale: o.i18n.t("uppy"),
      onBeforeFileAdded: (w, T) => {
        if (T[w.id] != null) {
          const O = k(w.id);
          h.value[O]?.status === ve.PENDING && (b.value = g.i18n("noDuplicates", { fileName: w.name })), h.value = h.value.filter((z) => z.id !== w.id);
        }
        return h.value.push({
          id: w.id,
          name: w.name,
          size: o.filesize(w.size),
          status: ve.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: w.data
        }), !0;
      }
    }), g.use(Jt, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), g.on("restriction-failed", (w, T) => {
      const D = h.value[k(w.id)];
      D && X(D), b.value = T.message;
    }), g.on("upload", () => {
      const w = o.requester.transformRequestParams({
        url: "",
        method: "post",
        params: {
          q: "upload",
          storage: l.value.storage,
          path: l.value.path
        }
      });
      g.setMeta({ ...w.body });
      const T = g.getPlugin("XHRUpload");
      T && (T.opts.method = w.method, T.opts.endpoint = w.url + "?" + new URLSearchParams(w.params), T.opts.headers = w.headers), delete w.headers["Content-Type"], S.value = !0, h.value.forEach((D) => {
        D.status !== ve.DONE && (D.percent = null, D.status = ve.UPLOADING, D.statusName = e("Pending upload"));
      });
    }), g.on("upload-progress", (w, T) => {
      const D = T.bytesTotal ?? 1, O = Math.floor(T.bytesUploaded / D * 100), z = k(w.id);
      z !== -1 && h.value[z] && (h.value[z].percent = `${O}%`);
    }), g.on("upload-success", (w) => {
      const T = h.value[k(w.id)];
      T && (T.status = ve.DONE, T.statusName = e("Done"));
    }), g.on("upload-error", (w, T) => {
      const D = h.value[k(w.id)];
      D && (D.percent = null, D.status = ve.ERROR, D.statusName = T?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : T?.message || e("Unknown Error"));
    }), g.on("error", (w) => {
      b.value = w.message, S.value = !1, o.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), g.on("complete", () => {
      S.value = !1, o.emitter.emit("vf-fetch", { params: { q: "index", path: l.value.path, storage: l.value.storage }, noCloseModal: !0 });
    }), _.value?.addEventListener("click", () => f.value?.click()), c.value?.addEventListener("click", () => d.value?.click()), i.value?.addEventListener("dragover", (w) => {
      w.preventDefault(), C.value = !0;
    }), i.value?.addEventListener("dragleave", (w) => {
      w.preventDefault(), C.value = !1;
    });
    const q = (w, T) => {
      T.isFile && T.file((D) => w(T, D)), T.isDirectory && T.createReader().readEntries((D) => D.forEach((O) => q(w, O)));
    };
    i.value?.addEventListener("drop", (w) => {
      w.preventDefault(), C.value = !1;
      const T = /^[/\\](.+)/, D = w.dataTransfer?.items;
      D && Array.from(D).forEach((O) => {
        O.kind === "file" && q((z, te) => {
          const U = T.exec(z.fullPath);
          x(te, U ? U[1] : te.name);
        }, O.webkitGetAsEntry());
      });
    });
    const ie = (w) => {
      const T = w.target, D = T.files;
      if (D) {
        for (const O of D) x(O);
        T.value = "";
      }
    };
    f.value?.addEventListener("change", ie), d.value?.addEventListener("change", ie);
  }), {
    container: u,
    internalFileInput: f,
    internalFolderInput: d,
    pickFiles: _,
    pickFolders: c,
    dropArea: i,
    queue: h,
    message: b,
    uploading: S,
    hasFilesInDropArea: C,
    definitions: v,
    openFileSelector: ee,
    upload: J,
    cancel: W,
    remove: X,
    clear: oe,
    close: ae,
    getClassNameForEntry: $,
    getIconForEntry: H
  };
}
function Je(o, e = 14) {
  const n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return o.replace(new RegExp(n), "$2..$4");
}
const fr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function hr(o, e) {
  return a(), m("svg", fr, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Et = { render: hr }, pr = { class: "vuefinder__upload-modal__content" }, gr = {
  key: 0,
  class: "pointer-events-none"
}, wr = {
  key: 1,
  class: "pointer-events-none"
}, br = ["disabled"], yr = ["disabled"], kr = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, xr = ["textContent"], Sr = { class: "vuefinder__upload-modal__file-info" }, $r = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Cr = { class: "vuefinder__upload-modal__file-name md:hidden" }, Er = {
  key: 0,
  class: "ml-auto"
}, Mr = ["title", "disabled", "onClick"], Tr = {
  key: 0,
  class: "py-2"
}, Ar = ["disabled"], Mt = /* @__PURE__ */ j({
  __name: "ModalUpload",
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, {
      container: l,
      internalFileInput: r,
      internalFolderInput: v,
      pickFiles: u,
      pickFolders: f,
      dropArea: d,
      queue: _,
      message: c,
      uploading: i,
      hasFilesInDropArea: h,
      definitions: b,
      openFileSelector: S,
      upload: C,
      cancel: g,
      remove: k,
      clear: x,
      close: $,
      getClassNameForEntry: H,
      getIconForEntry: ee
    } = mr();
    return (ae, J) => (a(), F(ye, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: t(i),
          onClick: J[4] || (J[4] = ge(
            //@ts-ignore
            (...W) => t(C) && t(C)(...W),
            ["prevent"]
          ))
        }, p(t(n)("Upload")), 9, Ar),
        t(i) ? (a(), m("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: J[5] || (J[5] = ge(
            //@ts-ignore
            (...W) => t(g) && t(g)(...W),
            ["prevent"]
          ))
        }, p(t(n)("Cancel")), 1)) : (a(), m("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: J[6] || (J[6] = ge(
            //@ts-ignore
            (...W) => t($) && t($)(...W),
            ["prevent"]
          ))
        }, p(t(n)("Close")), 1))
      ]),
      default: K(() => [
        s("div", null, [
          I(Se, {
            icon: t(Et),
            title: t(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", pr, [
            s("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: d,
              onClick: J[0] || (J[0] = //@ts-ignore
              (...W) => t(S) && t(S)(...W))
            }, [
              t(h) ? (a(), m("div", gr, p(t(n)("Release to drop these files.")), 1)) : (a(), m("div", wr, p(t(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            s("div", {
              ref_key: "container",
              ref: l,
              class: "vuefinder__upload-modal__buttons"
            }, [
              s("button", {
                ref_key: "pickFiles",
                ref: u,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, p(t(n)("Select Files")), 513),
              s("button", {
                ref_key: "pickFolders",
                ref: f,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, p(t(n)("Select Folders")), 513),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(i),
                onClick: J[1] || (J[1] = (W) => t(x)(!1))
              }, p(t(n)("Clear all")), 9, br),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(i),
                onClick: J[2] || (J[2] = (W) => t(x)(!0))
              }, p(t(n)("Clear only successful")), 9, yr)
            ], 512),
            s("div", kr, [
              (a(!0), m(ne, null, le(t(_), (W) => (a(), m("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: W.id
              }, [
                s("span", {
                  class: Z(["vuefinder__upload-modal__file-icon", t(H)(W)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: p(t(ee)(W))
                  }, null, 8, xr)
                ], 2),
                s("div", Sr, [
                  s("div", $r, p(t(Je)(W.name, 40)) + " (" + p(W.size) + ") ", 1),
                  s("div", Cr, p(t(Je)(W.name, 16)) + " (" + p(W.size) + ") ", 1),
                  s("div", {
                    class: Z(["vuefinder__upload-modal__file-status", t(H)(W)])
                  }, [
                    P(p(W.statusName) + " ", 1),
                    W.status === t(b).QUEUE_ENTRY_STATUS.UPLOADING ? (a(), m("b", Er, p(W.percent), 1)) : M("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: Z(["vuefinder__upload-modal__file-remove", t(i) ? "disabled" : ""]),
                  title: t(n)("Delete"),
                  disabled: t(i),
                  onClick: (X) => t(k)(W)
                }, [...J[7] || (J[7] = [
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
                ])], 10, Mr)
              ]))), 128)),
              t(_).length ? M("", !0) : (a(), m("div", Tr, p(t(n)("No files selected!")), 1))
            ]),
            t(c).length ? (a(), F(yt, {
              key: 0,
              onHidden: J[3] || (J[3] = (W) => c.value = ""),
              error: ""
            }, {
              default: K(() => [
                P(p(t(c)), 1)
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
}), Dr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ir(o, e) {
  return a(), m("svg", Dr, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Tt = { render: Ir }, Fr = { class: "vuefinder__unarchive-modal__content" }, Lr = { class: "vuefinder__unarchive-modal__items" }, Vr = {
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
}, Br = { class: "vuefinder__unarchive-modal__item-name" }, Hr = { class: "vuefinder__unarchive-modal__info" }, rt = /* @__PURE__ */ j({
  __name: "ModalUnarchive",
  setup(o) {
    const e = Y("ServiceContainer"), n = e.fs, l = B(n.path), { t: r } = e.i18n, v = y(e.modal.data.items[0]), u = y(""), f = y([]), d = () => {
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
          u.value = r(_.message);
        }
      });
    };
    return (_, c) => (a(), F(ye, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, p(t(r)("Unarchive")), 1),
        s("button", {
          type: "button",
          onClick: c[1] || (c[1] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(r)("Cancel")), 1)
      ]),
      default: K(() => [
        s("div", null, [
          I(Se, {
            icon: t(Tt),
            title: t(r)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", Fr, [
            s("div", Lr, [
              (a(!0), m(ne, null, le(f.value, (i) => (a(), m("p", {
                class: "vuefinder__unarchive-modal__item",
                key: i.path
              }, [
                i.type === "dir" ? (a(), m("svg", Vr, [...c[2] || (c[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (a(), m("svg", Rr, [...c[3] || (c[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Br, p(i.basename), 1)
              ]))), 128)),
              s("p", Hr, p(t(r)("The archive will be unarchived at")) + " (" + p(t(l).path) + ")", 1),
              u.value.length ? (a(), F(t(u), {
                key: 0,
                onHidden: c[0] || (c[0] = (i) => u.value = ""),
                error: ""
              }, {
                default: K(() => [
                  P(p(u.value), 1)
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
}), Nr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Pr(o, e) {
  return a(), m("svg", Nr, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const At = { render: Pr }, qr = { class: "vuefinder__archive-modal__content" }, Ur = { class: "vuefinder__archive-modal__form" }, Or = { class: "vuefinder__archive-modal__files vf-scrollbar" }, zr = { class: "vuefinder__archive-modal__file" }, Kr = {
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
}, Gr = { class: "vuefinder__archive-modal__file-name" }, Yr = ["placeholder"], lt = /* @__PURE__ */ j({
  __name: "ModalArchive",
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = B(l.path), v = y(""), u = y(""), f = y(e.modal.data.items), d = () => {
      f.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: f.value.map(({ path: _, type: c }) => ({ path: _, type: c })),
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (_) => {
          u.value = n(_.message);
        }
      });
    };
    return (_, c) => (a(), F(ye, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, p(t(n)("Archive")), 1),
        s("button", {
          type: "button",
          onClick: c[2] || (c[2] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Cancel")), 1)
      ]),
      default: K(() => [
        s("div", null, [
          I(Se, {
            icon: t(At),
            title: t(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", qr, [
            s("div", Ur, [
              s("div", Or, [
                (a(!0), m(ne, null, le(f.value, (i) => (a(), m("p", zr, [
                  i.type === "dir" ? (a(), m("svg", Kr, [...c[3] || (c[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), m("svg", jr, [...c[4] || (c[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", Gr, p(i.basename), 1)
                ]))), 256))
              ]),
              de(s("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (i) => v.value = i),
                onKeyup: Ve(d, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Yr), [
                [Be, v.value]
              ]),
              u.value.length ? (a(), F(t(u), {
                key: 0,
                onHidden: c[1] || (c[1] = (i) => u.value = ""),
                error: ""
              }, {
                default: K(() => [
                  P(p(u.value), 1)
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
}), Wr = { class: "vuefinder__menubar__container" }, Qr = ["onClick", "onMouseenter"], Xr = { class: "vuefinder__menubar__label" }, Jr = ["onMouseenter"], Zr = ["onClick"], el = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, tl = {
  key: 1,
  class: "vuefinder__menubar__dropdown__shortcut"
}, nl = {
  key: 2,
  class: "vuefinder__menubar__dropdown__checkmark"
}, ol = /* @__PURE__ */ j({
  __name: "MenuBar",
  setup(o) {
    const e = Y("ServiceContainer");
    e || console.error("MenuBar: ServiceContainer not found");
    const { t: n } = e?.i18n || { t: (g) => g }, l = e?.fs, r = e?.config, v = e?.search, u = B(r?.state || {}), f = B(v?.state || {}), d = B(l?.selectedItems || []), _ = y(null), c = y([
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            shortcut: "Ctrl+Shift+N",
            action: () => e?.modal?.open(st, { items: d.value }),
            enabled: () => e?.features?.includes(Q.NEW_FOLDER) || !1
          },
          {
            id: "new-file",
            label: n("New File"),
            shortcut: "Ctrl+Shift+F",
            action: () => e?.modal?.open(Ct, { items: d.value }),
            enabled: () => e?.features?.includes(Q.NEW_FILE) || !1
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            shortcut: "Ctrl+U",
            action: () => e?.modal?.open(Mt, { items: d.value }),
            enabled: () => e?.features?.includes(Q.UPLOAD) || !1
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            shortcut: "Space",
            action: () => {
              d.value.length === 1 && d.value[0]?.type !== "dir" && e?.modal?.open(nt, { storage: l?.path?.get()?.storage, item: d.value[0] });
            },
            enabled: () => d.value.length === 1 && d.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "exit",
            label: n("Exit"),
            shortcut: "Alt+F4",
            action: () => window.close(),
            enabled: () => !0
          }
        ]
      },
      {
        id: "edit",
        label: n("Edit"),
        items: [
          {
            id: "select-all",
            label: n("Select All"),
            shortcut: "Ctrl+A",
            action: () => l?.selectAll(),
            enabled: () => !0
          },
          {
            id: "deselect",
            label: n("Deselect All"),
            shortcut: "Ctrl+D",
            action: () => l?.clearSelection(),
            enabled: () => d.value.length > 0
          },
          { type: "separator" },
          {
            id: "cut",
            label: n("Cut"),
            shortcut: "Ctrl+X",
            action: () => {
              d.value.length > 0 && l?.setClipboard("cut", new Set(d.value.map((g) => g.path)));
            },
            enabled: () => d.value.length > 0
          },
          {
            id: "copy",
            label: n("Copy"),
            shortcut: "Ctrl+C",
            action: () => {
              d.value.length > 0 && l?.setClipboard("copy", new Set(d.value.map((g) => g.path)));
            },
            enabled: () => d.value.length > 0
          },
          {
            id: "paste",
            label: n("Paste"),
            shortcut: "Ctrl+V",
            action: () => {
              const g = l?.getClipboard();
              g?.items?.size > 0 && e?.modal?.open(g.type === "cut" ? ot : xt, {
                items: Array.from(g.items),
                targetPath: l?.path?.get()?.path
              });
            },
            enabled: () => l?.getClipboard()?.items?.size > 0
          },
          { type: "separator" },
          {
            id: "rename",
            label: n("Rename"),
            shortcut: "F2",
            action: () => {
              d.value.length === 1 && e?.modal?.open(Ke, { items: d.value });
            },
            enabled: () => d.value.length === 1 && e?.features?.includes(Q.RENAME)
          },
          {
            id: "delete",
            label: n("Delete"),
            shortcut: "Delete",
            action: () => {
              d.value.length > 0 && e?.modal?.open(ze, { items: d.value });
            },
            enabled: () => d.value.length > 0 && e?.features?.includes(Q.DELETE)
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
            shortcut: "F5",
            action: () => {
              e?.emitter?.emit("vf-fetch", {
                params: { q: "index", storage: l?.path?.get()?.storage, path: l?.path?.get()?.path }
              });
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: n("Grid View"),
            shortcut: "Ctrl+1",
            action: () => r?.set("view", "grid"),
            enabled: () => !f.value?.query?.length,
            checked: () => u.value?.view === "grid"
          },
          {
            id: "list-view",
            label: n("List View"),
            shortcut: "Ctrl+2",
            action: () => r?.set("view", "list"),
            enabled: () => !f.value?.query?.length,
            checked: () => u.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: n("Tree View"),
            shortcut: "Ctrl+E",
            action: () => r?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => u.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: n("Show Thumbnails"),
            shortcut: "Ctrl+T",
            action: () => r?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => u.value?.showThumbnails
          },
          { type: "separator" },
          {
            id: "fullscreen",
            label: n("Full Screen"),
            shortcut: "F11",
            action: () => r?.toggle("fullScreen"),
            enabled: () => e?.features?.includes(Q.FULL_SCREEN),
            checked: () => u.value?.fullScreen
          }
        ]
      },
      {
        id: "tools",
        label: n("Tools"),
        items: [
          {
            id: "search",
            label: n("Search"),
            shortcut: "Ctrl+F",
            action: () => v?.enterSearchMode(),
            enabled: () => e?.features?.includes(Q.SEARCH)
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            shortcut: "Ctrl+Shift+A",
            action: () => {
              d.value.length > 0 && e?.modal?.open(lt, { items: d.value });
            },
            enabled: () => d.value.length > 0 && e?.features?.includes(Q.ARCHIVE)
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            shortcut: "Ctrl+Shift+U",
            action: () => {
              d.value.length === 1 && d.value[0]?.mime_type === "application/zip" && e?.modal?.open(rt, { items: d.value });
            },
            enabled: () => d.value.length === 1 && d.value[0]?.mime_type === "application/zip" && e?.features?.includes(Q.UNARCHIVE)
          }
        ]
      },
      {
        id: "help",
        label: n("Help"),
        items: [
          {
            id: "about",
            label: n("About VueFinder"),
            shortcut: "Ctrl+\\",
            action: () => e?.modal?.open(tt),
            enabled: () => !0
          }
        ]
      }
    ]);
    re(() => d.value.length > 0), re(() => d.value.length === 1);
    const i = (g) => {
      _.value = _.value === g ? null : g;
    }, h = () => {
      _.value = null;
    }, b = (g) => {
      g(), h();
    }, S = (g) => {
      if (g.altKey && !g.ctrlKey && !g.metaKey) {
        const k = g.key.toLowerCase(), x = {
          f: "file",
          e: "edit",
          v: "view",
          t: "tools",
          h: "help"
        };
        x[k] && (g.preventDefault(), i(x[k]));
      }
      g.key === "Escape" && h();
    }, C = (g) => {
      g.target.closest(".vuefinder__menubar") || h();
    };
    return ce(() => {
      document.addEventListener("keydown", S), document.addEventListener("click", C);
    }), Re(() => {
      document.removeEventListener("keydown", S), document.removeEventListener("click", C);
    }), (g, k) => (a(), m("div", {
      class: "vuefinder__menubar",
      onClick: k[2] || (k[2] = ge(() => {
      }, ["stop"]))
    }, [
      s("div", Wr, [
        (a(!0), m(ne, null, le(c.value, (x) => (a(), m("div", {
          key: x.id,
          class: Z(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": _.value === x.id }]),
          onClick: ($) => i(x.id),
          onMouseenter: ($) => _.value = x.id,
          onMouseleave: k[1] || (k[1] = ($) => _.value = null)
        }, [
          s("span", Xr, p(x.label), 1),
          _.value === x.id ? (a(), m("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: ($) => _.value = x.id,
            onMouseleave: k[0] || (k[0] = ($) => _.value = null)
          }, [
            (a(!0), m(ne, null, le(x.items, ($) => (a(), m("div", {
              key: $.id || $.type,
              class: Z(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": $.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": $.enabled && !$.enabled(),
                "vuefinder__menubar__dropdown__item--checked": $.checked && $.checked()
              }]),
              onClick: (H) => $.type !== "separator" && $.enabled && $.enabled() ? b($.action) : null
            }, [
              $.type !== "separator" ? (a(), m("span", el, p($.label), 1)) : M("", !0),
              $.shortcut ? (a(), m("span", tl, p($.shortcut), 1)) : M("", !0),
              $.checked && $.checked() ? (a(), m("span", nl, " ✓ ")) : M("", !0)
            ], 10, Zr))), 128))
          ], 40, Jr)) : M("", !0)
        ], 42, Qr))), 128))
      ])
    ]));
  }
}), sl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function rl(o, e) {
  return a(), m("svg", sl, [...e[0] || (e[0] = [
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
const at = { render: rl }, ll = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function al(o, e) {
  return a(), m("svg", ll, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const il = { render: al }, dl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function cl(o, e) {
  return a(), m("svg", dl, [...e[0] || (e[0] = [
    s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const ul = { render: cl }, vl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function _l(o, e) {
  return a(), m("svg", vl, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const ml = { render: _l }, fl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function hl(o, e) {
  return a(), m("svg", fl, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const pl = { render: hl }, gl = { class: "vuefinder__toolbar" }, wl = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, bl = ["title"], yl = ["title"], kl = ["title"], xl = ["title"], Sl = ["title"], $l = ["title"], Cl = ["title"], El = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Ml = { class: "pl-2" }, Tl = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Al = { class: "vuefinder__toolbar__controls" }, Dl = ["title"], Il = ["title"], Fl = /* @__PURE__ */ j({
  __name: "Toolbar",
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = e.config, v = e.search, u = B(r.state), f = B(v.state), d = B(l.selectedItems);
    fe(() => u.value.fullScreen, () => {
      if (u.value.fullScreen) {
        const c = document.querySelector("body");
        c && (c.style.overflow = "hidden");
      } else {
        const c = document.querySelector("body");
        c && (c.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const _ = () => {
      r.set("view", u.value.view === "list" ? "grid" : "list");
    };
    return (c, i) => (a(), m("div", gl, [
      t(f).query.length ? (a(), m("div", El, [
        s("div", Ml, [
          P(p(t(n)("Search results for")) + " ", 1),
          s("span", Tl, p(t(f).query), 1)
        ]),
        t(r).get("loadingIndicator") === "circular" && t(l).isLoading() ? (a(), F(t(at), { key: 0 })) : M("", !0)
      ])) : (a(), m("div", wl, [
        t(e).features.includes(t(Q).NEW_FOLDER) ? (a(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: t(n)("New Folder"),
          onClick: i[0] || (i[0] = (h) => t(e).modal.open(st, { items: t(d) }))
        }, [
          I(t(St))
        ], 8, bl)) : M("", !0),
        t(e).features.includes(t(Q).NEW_FILE) ? (a(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: t(n)("New File"),
          onClick: i[1] || (i[1] = (h) => t(e).modal.open(Ct, { items: t(d) }))
        }, [
          I(t($t))
        ], 8, yl)) : M("", !0),
        t(e).features.includes(t(Q).RENAME) ? (a(), m("div", {
          key: 2,
          class: "mx-1.5",
          title: t(n)("Rename"),
          onClick: i[2] || (i[2] = (h) => t(d).length !== 1 || t(e).modal.open(Ke, { items: t(d) }))
        }, [
          I(t(bt), {
            class: Z(t(d).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, kl)) : M("", !0),
        t(e).features.includes(t(Q).DELETE) ? (a(), m("div", {
          key: 3,
          class: "mx-1.5",
          title: t(n)("Delete"),
          onClick: i[3] || (i[3] = (h) => !t(d).length || t(e).modal.open(ze, { items: t(d) }))
        }, [
          I(t(wt), {
            class: Z(t(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, xl)) : M("", !0),
        t(e).features.includes(t(Q).UPLOAD) ? (a(), m("div", {
          key: 4,
          class: "mx-1.5",
          title: t(n)("Upload"),
          onClick: i[4] || (i[4] = (h) => t(e).modal.open(Mt, { items: t(d) }))
        }, [
          I(t(Et))
        ], 8, Sl)) : M("", !0),
        t(e).features.includes(t(Q).UNARCHIVE) && t(d).length === 1 && t(d)[0].mime_type === "application/zip" ? (a(), m("div", {
          key: 5,
          class: "mx-1.5",
          title: t(n)("Unarchive"),
          onClick: i[5] || (i[5] = (h) => !t(d).length || t(e).modal.open(rt, { items: t(d) }))
        }, [
          I(t(Tt), {
            class: Z(t(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, $l)) : M("", !0),
        t(e).features.includes(t(Q).ARCHIVE) ? (a(), m("div", {
          key: 6,
          class: "mx-1.5",
          title: t(n)("Archive"),
          onClick: i[6] || (i[6] = (h) => !t(d).length || t(e).modal.open(lt, { items: t(d) }))
        }, [
          I(t(At), {
            class: Z(t(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Cl)) : M("", !0)
      ])),
      s("div", Al, [
        t(e).features.includes(t(Q).FULL_SCREEN) ? (a(), m("div", {
          key: 0,
          onClick: i[7] || (i[7] = (h) => t(r).toggle("fullScreen")),
          class: "mx-1.5",
          title: t(n)("Toggle Full Screen")
        }, [
          t(u).fullScreen ? (a(), F(t(ul), { key: 0 })) : (a(), F(t(il), { key: 1 }))
        ], 8, Dl)) : M("", !0),
        s("div", {
          class: "mx-1.5",
          title: t(n)("Change View"),
          onClick: i[8] || (i[8] = (h) => t(f).query.length || _())
        }, [
          t(u).view === "grid" ? (a(), F(t(ml), {
            key: 0,
            class: Z(["vf-toolbar-icon", t(f).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : M("", !0),
          t(u).view === "list" ? (a(), F(t(pl), {
            key: 1,
            class: Z(["vf-toolbar-icon", t(f).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : M("", !0)
        ], 8, Il)
      ])
    ]));
  }
}), Ll = (o, e = 0, n = !1) => {
  let l;
  return (...r) => {
    n && !l && o(...r), clearTimeout(l), l = setTimeout(() => {
      o(...r);
    }, e);
  };
}, ct = (o, e, n) => {
  const l = y(o);
  return Nt((r, v) => ({
    get() {
      return r(), l.value;
    },
    set: Ll((u) => {
      l.value = u, v();
    }, e, !1)
  }));
}, Vl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function Rl(o, e) {
  return a(), m("svg", Vl, [...e[0] || (e[0] = [
    s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Bl = { render: Rl }, Hl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Nl(o, e) {
  return a(), m("svg", Hl, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Pl = { render: Nl }, ql = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ul(o, e) {
  return a(), m("svg", ql, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ol = { render: Ul }, zl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function Kl(o, e) {
  return a(), m("svg", zl, [...e[0] || (e[0] = [
    s("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const jl = { render: Kl }, Gl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function Yl(o, e) {
  return a(), m("svg", Gl, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Wl = { render: Yl }, Ql = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Xl(o, e) {
  return a(), m("svg", Ql, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Jl = { render: Xl }, Zl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function ea(o, e) {
  return a(), m("svg", Zl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const je = { render: ea }, ta = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function na(o, e) {
  return a(), m("svg", ta, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const oa = { render: na }, sa = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 448 512"
};
function ra(o, e) {
  return a(), m("svg", sa, [...e[0] || (e[0] = [
    s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const la = { render: ra };
function aa(o) {
  const [e, n] = ia(o);
  if (!n || n === "/") return e + "://";
  const l = n.replace(/\/+$/, ""), r = l.lastIndexOf("/");
  return r === 0 ? e + "://" : e + ":/" + l.slice(0, r);
}
function ia(o) {
  const e = o.indexOf(":/");
  return e === -1 ? [void 0, o] : [o.slice(0, e), o.slice(e + 2) || "/"];
}
function qe(o, e = []) {
  const n = "vfDragEnterCounter", l = o.fs, r = B(l.selectedItems);
  function v(c, i) {
    c.preventDefault(), l.getDraggedItem() === i.path || !i || i.type !== "dir" || r.value.some((b) => b.path === i.path || aa(b.path) === i.path) ? c.dataTransfer && (c.dataTransfer.dropEffect = "none", c.dataTransfer.effectAllowed = "none") : (c.dataTransfer && (c.dataTransfer.dropEffect = "copy", c.dataTransfer.effectAllowed = "all"), c.currentTarget.classList.add(...e));
  }
  function u(c) {
    c.preventDefault();
    const i = c.currentTarget, h = Number(i.dataset[n] || 0);
    i.dataset[n] = String(h + 1);
  }
  function f(c) {
    c.preventDefault();
    const i = c.currentTarget, b = Number(i.dataset[n] || 0) - 1;
    b <= 0 ? (delete i.dataset[n], i.classList.remove(...e)) : i.dataset[n] = String(b);
  }
  function d(c, i) {
    if (!i) return;
    c.preventDefault();
    const h = c.currentTarget;
    delete h.dataset[n], h.classList.remove(...e);
    const b = c.dataTransfer?.getData("items") || "[]", C = JSON.parse(b).map((g) => l.sortedFiles.get().find((k) => k.path === g));
    l.clearDraggedItem(), o.modal.open(ot, { items: { from: C, to: i } });
  }
  function _(c) {
    return {
      dragover: (i) => v(i, c),
      dragenter: u,
      dragleave: f,
      drop: (i) => d(i, c)
    };
  }
  return { events: _ };
}
const da = { class: "vuefinder__breadcrumb__container" }, ca = ["title"], ua = ["title"], va = ["title"], _a = ["title"], ma = { class: "vuefinder__breadcrumb__list" }, fa = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, ha = { class: "relative" }, pa = ["title", "onClick"], ga = { class: "vuefinder__breadcrumb__search-mode" }, wa = ["placeholder"], ba = ["onClick"], ya = { class: "vuefinder__breadcrumb__hidden-item-content" }, ka = { class: "vuefinder__breadcrumb__hidden-item-text" }, xa = /* @__PURE__ */ j({
  __name: "Breadcrumb",
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, l = e.search, r = e.fs, v = e.config, u = B(v.state), f = B(l.state), d = B(r.path), _ = B(r.loading), c = re(() => f.value?.searchMode ?? !1), i = y(null), h = ct(0, 100), b = y(5), S = y(!1), C = re(() => d.value?.breadcrumb ?? []);
    function g(U, V) {
      return U.length > V ? [U.slice(-V), U.slice(0, -V)] : [U, []];
    }
    const k = re(() => g(C.value, b.value)[0]), x = re(() => g(C.value, b.value)[1]);
    fe(h, () => {
      if (!i.value) return;
      const U = i.value.children;
      let V = 0, G = 0;
      const E = 5, L = 1;
      b.value = E, Pe(() => {
        for (let se = U.length - 1; se >= 0; se--) {
          const _e = U[se];
          if (V + _e.offsetWidth > h.value - 40)
            break;
          V += parseInt(_e.offsetWidth.toString(), 10), G++;
        }
        G < L && (G = L), G > E && (G = E), b.value = G;
      });
    });
    const $ = () => {
      i.value && (h.value = i.value.offsetWidth);
    }, H = y(null);
    ce(() => {
      H.value = new ResizeObserver($), i.value && H.value.observe(i.value);
    }), Re(() => {
      H.value && H.value.disconnect();
    });
    const ee = qe(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function ae(U = null) {
      U ??= C.value.length - 2;
      const V = {
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
      return C.value[U] ?? V;
    }
    const J = () => {
      O(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: d.value?.storage, path: d.value?.path } });
    }, W = () => {
      l.exitSearchMode(), k.value.length > 0 && !c.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: d.value?.storage ?? "local",
          path: C.value[C.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
        }
      });
    }, X = (U) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: d.value?.storage, path: U.path } }), S.value = !1;
    }, oe = () => {
      S.value && (S.value = !1);
    }, q = {
      mounted(U, V) {
        U.clickOutsideEvent = function(G) {
          U === G.target || U.contains(G.target) || V.value();
        }, document.body.addEventListener("click", U.clickOutsideEvent);
      },
      beforeUnmount(U) {
        document.body.removeEventListener("click", U.clickOutsideEvent);
      }
    }, ie = () => {
      v.toggle("showTreeView");
    }, w = y(null), T = ct("", 400);
    fe(T, (U) => {
      e.emitter.emit("vf-toast-clear"), l.setQuery(U);
    }), fe(c, (U) => {
      U && Pe(() => {
        w.value && w.value.focus();
      });
    }), e.emitter.on("vf-search-exit", () => {
      l.exitSearchMode();
    });
    const D = () => {
      T.value === "" && l.exitSearchMode();
    }, O = () => {
      T.value = "", l.exitSearchMode();
    }, z = y({
      x: 0,
      y: 0
    }), te = (U, V = null) => {
      if (U.currentTarget instanceof HTMLElement) {
        const { x: G, y: E, height: L } = U.currentTarget.getBoundingClientRect();
        z.value = { x: G, y: E + L };
      }
      S.value = V ?? !S.value;
    };
    return (U, V) => (a(), m("div", da, [
      s("span", {
        title: t(n)("Toggle Tree View")
      }, [
        I(t(oa), {
          onClick: ie,
          class: Z(["vuefinder__breadcrumb__toggle-tree", t(u).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, ca),
      s("span", {
        title: t(n)("Go up a directory")
      }, [
        I(t(Pl), xe(Ee(C.value.length && !c.value ? t(ee).events(ae()) : {}), {
          onClick: W,
          class: C.value.length && !c.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, ua),
      t(r).isLoading() ? (a(), m("span", {
        key: 1,
        title: t(n)("Cancel")
      }, [
        I(t(Ol), {
          onClick: V[0] || (V[0] = (G) => t(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, _a)) : (a(), m("span", {
        key: 0,
        title: t(n)("Refresh")
      }, [
        I(t(Bl), { onClick: J })
      ], 8, va)),
      de(s("div", {
        class: "group vuefinder__breadcrumb__search-container",
        onClick: V[3] || (V[3] = //@ts-ignore
        (...G) => t(l).enterSearchMode && t(l).enterSearchMode(...G))
      }, [
        s("div", null, [
          I(t(jl), xe(Ee(t(ee).events(ae(-1))), {
            onClick: V[1] || (V[1] = ge((G) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(d).value?.storage ?? "local" } }), ["stop"]))
          }), null, 16)
        ]),
        s("div", ma, [
          x.value.length ? de((a(), m("div", fa, [
            V[5] || (V[5] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", ha, [
              s("span", {
                onDragenter: V[2] || (V[2] = (G) => te(G, !0)),
                onClick: ge(te, ["stop"]),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                I(t(la), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [q, oe]
          ]) : M("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: i,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (a(!0), m(ne, null, le(k.value, (G, E) => (a(), m("div", { key: E }, [
            V[6] || (V[6] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", xe(Ee(t(ee).events(G), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: G.basename,
              onClick: ge((L) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(d)?.storage, path: G.path } }), ["stop"])
            }), p(G.name), 17, pa)
          ]))), 128))
        ], 512),
        t(v).get("loadingIndicator") === "circular" && t(_) ? (a(), F(t(at), { key: 0 })) : M("", !0)
      ], 512), [
        [be, !c.value]
      ]),
      de(s("div", ga, [
        s("div", null, [
          I(t(Wl))
        ]),
        de(s("input", {
          ref_key: "searchInput",
          ref: w,
          onKeydown: Ve(O, ["esc"]),
          onBlur: D,
          "onUpdate:modelValue": V[4] || (V[4] = (G) => Pt(T) ? T.value = G : null),
          placeholder: t(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, wa), [
          [Be, t(T)]
        ]),
        I(t(Jl), { onClick: O })
      ], 512), [
        [be, c.value]
      ]),
      (a(), F(_t, { to: "body" }, [
        de(s("div", {
          style: Me({ position: "absolute", top: z.value.y + "px", left: z.value.x + "px" }),
          class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
        }, [
          (a(!0), m(ne, null, le(x.value, (G, E) => (a(), m("div", xe({ key: E }, Ee(t(ee).events(G), !0), {
            onClick: (L) => X(G),
            class: "vuefinder__breadcrumb__hidden-item"
          }), [
            s("div", ya, [
              s("span", null, [
                I(t(je), { class: "vuefinder__breadcrumb__hidden-item-icon" })
              ]),
              V[7] || (V[7] = P()),
              s("span", ka, p(G.name), 1)
            ])
          ], 16, ba))), 128))
        ], 4), [
          [be, S.value]
        ])
      ]))
    ]));
  }
});
function Sa(o, e) {
  const {
    scrollContainer: n,
    itemWidth: l = 100,
    rowHeight: r,
    overscan: v = 2,
    containerPadding: u = 48,
    lockItemsPerRow: f
  } = e, d = o, _ = () => typeof r == "number" ? r : r.value, c = y(0), i = y(6), h = y(600);
  let b = null;
  const S = re(() => Math.ceil(d.value.length / i.value)), C = re(() => S.value * _()), g = re(() => {
    const X = _(), oe = Math.max(0, Math.floor(c.value / X) - v), q = Math.min(S.value, Math.ceil((c.value + h.value) / X) + v);
    return { start: oe, end: q };
  }), k = re(() => {
    const { start: X, end: oe } = g.value;
    return Array.from({ length: oe - X }, (q, ie) => X + ie);
  }), x = () => h.value, $ = () => f.value, H = () => {
    if ($()) {
      i.value = 1;
      return;
    }
    if (n.value) {
      const X = n.value.clientWidth - u;
      i.value = Math.max(Math.floor(X / l), 2);
    }
  }, ee = (X) => {
    const oe = X.target;
    c.value = oe.scrollTop;
  };
  fe(() => d.value.length, () => {
    H();
  });
  const ae = (X, oe) => {
    const q = oe * i.value;
    return X.slice(q, q + i.value);
  }, J = (X, oe, q, ie, w) => {
    const T = [];
    for (let D = oe; D <= q; D++)
      for (let O = ie; O <= w; O++) {
        const z = D * i.value + O;
        z < X.length && X[z] && T.push(X[z]);
      }
    return T;
  }, W = (X) => ({
    row: Math.floor(X / i.value),
    col: X % i.value
  });
  return ce(async () => {
    await Pe(), n.value && (h.value = n.value.clientHeight || 600), H(), window.addEventListener("resize", () => {
      n.value && (h.value = n.value.clientHeight || 600), H();
    }), n.value && "ResizeObserver" in window && (b = new ResizeObserver((X) => {
      const oe = X[0];
      oe && (h.value = Math.round(oe.contentRect.height)), H();
    }), b.observe(n.value));
  }), Re(() => {
    window.removeEventListener("resize", H), b && (b.disconnect(), b = null);
  }), {
    scrollTop: c,
    itemsPerRow: i,
    totalRows: S,
    totalHeight: C,
    visibleRange: g,
    visibleRows: k,
    updateItemsPerRow: H,
    handleScroll: ee,
    getRowItems: ae,
    getItemsInRange: J,
    getItemPosition: W,
    getContainerHeight: x
  };
}
function $a(o) {
  const { getItemPosition: e, getItemsInRange: n, getKey: l, selectionObject: r, rowHeight: v, itemWidth: u } = o, f = Math.floor(Math.random() * 2 ** 32).toString(), _ = Y("ServiceContainer").fs, c = B(_.selectedKeys), i = B(_.sortedFiles);
  B(_.selectedCount);
  const h = y(/* @__PURE__ */ new Set()), b = y(!1), S = y(!1), C = y(null), g = (w) => w.map((T) => T.getAttribute("data-key")).filter((T) => !!T), k = (w) => {
    w.selection.getSelection().forEach((T) => {
      w.selection.deselect(T, !0);
    });
  }, x = (w) => {
    c.value && c.value.forEach((T) => {
      const D = document.querySelector(`[data-key="${T}"]`);
      D && w.selection.select(D, !0);
    });
  }, $ = (w) => {
    if (w.size === 0) return null;
    const D = Array.from(w).map((V) => {
      const G = i.value?.findIndex((E) => l(E) === V) ?? -1;
      return e(G >= 0 ? G : 0);
    }), O = Math.min(...D.map((V) => V.row)), z = Math.max(...D.map((V) => V.row)), te = Math.min(...D.map((V) => V.col)), U = Math.max(...D.map((V) => V.col));
    return { minRow: O, maxRow: z, minCol: te, maxCol: U };
  }, H = (w) => {
    b.value = !1, !w.event?.metaKey && !w.event?.ctrlKey && (S.value = !0), w.selection.resolveSelectables(), k(w), x(w);
  }, ee = ({ event: w, selection: T }) => {
    const D = w;
    D && "type" in D && D.type === "touchend" && D.preventDefault();
    const O = w;
    if (!O?.ctrlKey && !O?.metaKey && (_.clearSelection(), T.clearSelection(!0, !0)), h.value.clear(), O && r.value) {
      const z = r.value.getSelectables()[0]?.closest(".scroller-" + f);
      if (z) {
        const te = z.getBoundingClientRect(), U = O.clientY - te.top + z.scrollTop, V = O.clientX - te.left, G = Math.floor(U / v.value), E = Math.floor(V / u);
        C.value = { row: G, col: E };
      }
    }
  }, ae = (w) => {
    const T = w.selection, D = g(w.store.changed.added), O = g(w.store.changed.removed);
    S.value = !1, b.value = !0, D.forEach((z) => {
      c.value && !c.value.has(z) && h.value.add(z), _.select(z);
    }), O.forEach((z) => {
      document.querySelector(`[data-key="${z}"]`) && i.value?.find((U) => l(U) === z) && h.value.delete(z), _.deselect(z);
    }), T.resolveSelectables(), x(w);
  }, J = () => {
    h.value.clear();
  }, W = (w) => {
    if (w.event && C.value && h.value.size > 0) {
      const D = Array.from(h.value).map((O) => {
        const z = i.value?.findIndex((te) => l(te) === O) ?? -1;
        return z >= 0 ? e(z) : null;
      }).filter((O) => O !== null);
      if (D.length > 0) {
        const O = [...D, C.value], z = {
          minRow: Math.min(...O.map((te) => te.row)),
          maxRow: Math.max(...O.map((te) => te.row)),
          minCol: Math.min(...O.map((te) => te.col)),
          maxCol: Math.max(...O.map((te) => te.col))
        };
        n(i.value || [], z.minRow, z.maxRow, z.minCol, z.maxCol).forEach(
          (te) => {
            const U = l(te);
            document.querySelector(`[data-key="${U}"]`) || _.select(U);
          }
        );
      }
    }
  }, X = (w) => {
    W(w), k(w), x(w), _.setSelectedCount(c.value?.size || 0), b.value = !1, C.value = null;
  }, oe = () => {
    r.value = new Zt({
      selectables: [".file-item-" + f],
      boundaries: [".scroller-" + f],
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
    }), r.value.on("beforestart", H), r.value.on("start", ee), r.value.on("move", ae), r.value.on("stop", X);
  }, q = () => {
    r.value && (r.value.destroy(), r.value = null);
  }, ie = (w) => {
    S.value && (r.value?.clearSelection(), J(), S.value = !1);
    const T = w;
    !h.value.size && !S.value && !T?.ctrlKey && !T?.metaKey && (_.clearSelection(), r.value?.clearSelection());
  };
  return ce(() => {
    const w = (T) => {
      !T.buttons && b.value && (b.value = !1);
    };
    document.addEventListener("dragleave", w), Re(() => {
      document.removeEventListener("dragleave", w);
    });
  }), {
    isDragging: b,
    selectionStarted: S,
    explorerId: f,
    extractIds: g,
    cleanupSelection: k,
    refreshSelection: x,
    getSelectionRange: $,
    selectSelectionRange: W,
    initializeSelectionArea: oe,
    destroySelectionArea: q,
    handleContentClick: ie
  };
}
const Ca = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Ea(o, e) {
  return a(), m("svg", Ca, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ma = { render: Ea }, Ta = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Aa(o, e) {
  return a(), m("svg", Ta, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Da = { render: Aa }, Ue = /* @__PURE__ */ j({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(o) {
    return (e, n) => (a(), m("div", null, [
      o.direction === "asc" ? (a(), F(t(Ma), { key: 0 })) : M("", !0),
      o.direction === "desc" ? (a(), F(t(Da), { key: 1 })) : M("", !0)
    ]));
  }
}), Ia = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function Fa(o, e) {
  return a(), m("svg", Ia, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const La = { render: Fa }, Va = { class: "vuefinder__drag-item__container" }, Ra = { class: "vuefinder__drag-item__count" }, Ba = /* @__PURE__ */ j({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(o) {
    const e = o;
    return (n, l) => (a(), m("div", Va, [
      I(t(La)),
      s("div", Ra, p(e.count), 1)
    ]));
  }
}), Ha = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Na(o, e) {
  return a(), m("svg", Ha, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Pa = { render: Na }, qa = {
  key: 3,
  class: "vuefinder__item-icon__extension"
}, ut = /* @__PURE__ */ j({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(o) {
    const e = o, n = Y("ServiceContainer"), l = B(n.config.state), r = n.customIcon?.(n, l, e.item);
    return (v, u) => (a(), m("div", {
      class: Z(["vuefinder__item-icon", o.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      t(r) ? (a(), F(Ze(t(r).is), mt(xe({ key: 0 }, t(r).props || {})), null, 16)) : o.item.type === "dir" ? (a(), F(t(je), { key: 1 })) : (a(), F(t(Pa), { key: 2 })),
      !t(r) && o.ext && o.item.type !== "dir" && o.item.extension ? (a(), m("div", qa, p(o.item.extension.substring(0, 3)), 1)) : M("", !0)
    ], 2));
  }
}), Ua = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Oa(o, e) {
  return a(), m("svg", Ua, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const Dt = { render: Oa }, za = ["data-key", "data-row", "data-col", "draggable"], Ka = { key: 0 }, ja = { class: "vuefinder__explorer__item-grid-content" }, Ga = ["data-src", "alt"], Ya = { class: "vuefinder__explorer__item-title" }, Wa = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Qa = { class: "vuefinder__explorer__item-list-name" }, Xa = { class: "vuefinder__explorer__item-list-icon" }, Ja = { class: "vuefinder__explorer__item-name" }, Za = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, ei = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, ti = { key: 0 }, ni = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, oi = /* @__PURE__ */ j({
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
  setup(o, { emit: e }) {
    const n = o, l = e, r = Y("ServiceContainer"), v = r.fs, u = r.config, f = re(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : ""
    ]), d = re(() => ({
      opacity: n.isDragging || v.isCut(n.item.path) ? 0.5 : ""
    }));
    let _ = null;
    const c = y(null);
    let i = !1;
    const h = () => {
      _ && clearTimeout(_), b.value = !0;
    }, b = y(!0), S = (C) => {
      if (b.value = !1, _ && (C.preventDefault(), clearTimeout(_)), !i)
        i = !0, l("click", C), c.value = setTimeout(() => {
          i = !1;
        }, 300);
      else
        return i = !1, l("dblclick", C), _ && clearTimeout(_), !1;
      if (C.currentTarget && C.currentTarget instanceof HTMLElement) {
        const g = C.currentTarget.getBoundingClientRect();
        C.preventDefault(), _ = setTimeout(() => {
          let $ = g.y + g.height;
          $ + 146 > window.innerHeight - 10 && ($ = g.y - 146), $ < 10 && ($ = 10);
          const H = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: g.x,
            clientY: $
          });
          C.target?.dispatchEvent(H);
        }, 300);
      }
    };
    return (C, g) => (a(), m("div", {
      class: Z(f.value),
      style: Me(d.value),
      "data-key": o.item.path,
      "data-row": o.rowIndex,
      "data-col": o.colIndex,
      draggable: b.value,
      onTouchstart: g[1] || (g[1] = (k) => S(k)),
      onTouchend: g[2] || (g[2] = (k) => h()),
      onClick: g[3] || (g[3] = (k) => l("click", k)),
      onDblclick: g[4] || (g[4] = (k) => l("dblclick", k)),
      onContextmenu: g[5] || (g[5] = ge((k) => l("contextmenu", k), ["prevent", "stop"])),
      onDragstart: g[6] || (g[6] = (k) => l("dragstart", k)),
      onDragend: g[7] || (g[7] = (k) => l("dragend", k))
    }, [
      o.view === "grid" ? (a(), m("div", Ka, [
        s("div", ja, [
          (o.item.mime_type ?? "").startsWith("image") && o.showThumbnails ? (a(), m("img", {
            key: 0,
            onTouchstart: g[0] || (g[0] = (k) => k.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": t(r).requester.getPreviewUrl(o.item.storage, o.item),
            alt: o.item.basename
          }, null, 40, Ga)) : (a(), F(ut, {
            key: 1,
            item: o.item,
            ext: !0
          }, null, 8, ["item"]))
        ]),
        s("span", Ya, p(t(Je)(o.item.basename)), 1)
      ])) : (a(), m("div", Wa, [
        s("div", Qa, [
          s("div", Xa, [
            I(ut, {
              item: o.item,
              small: o.compact
            }, null, 8, ["item", "small"])
          ]),
          s("span", Ja, p(o.item.basename), 1)
        ]),
        o.showPath ? (a(), m("div", Za, p(o.item.path), 1)) : M("", !0),
        o.showPath ? M("", !0) : (a(), m("div", ei, [
          o.item.file_size ? (a(), m("div", ti, p(t(r).filesize(o.item.file_size)), 1)) : M("", !0)
        ])),
        !o.showPath && o.item.last_modified ? (a(), m("div", ni, p(new Date(o.item.last_modified * 1e3).toLocaleString()), 1)) : M("", !0)
      ])),
      t(u).get("pinnedFolders").find((k) => k.path === o.item.path) ? (a(), F(t(Dt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : M("", !0)
    ], 46, za));
  }
}), si = ["data-row"], Qe = /* @__PURE__ */ j({
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
  setup(o, { emit: e }) {
    const n = o, l = e, r = re(() => [
      n.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), v = re(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${n.rowHeight}px`,
      transform: `translateY(${n.rowIndex * n.rowHeight}px)`
    })), u = re(() => n.view === "grid" ? {
      gridTemplateColumns: `repeat(${n.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (f, d) => (a(), m("div", {
      class: Z(r.value),
      "data-row": o.rowIndex,
      style: Me(v.value)
    }, [
      s("div", {
        class: Z(["grid justify-self-start", { "w-full": o.view === "list" }]),
        style: Me(u.value)
      }, [
        (a(!0), m(ne, null, le(o.items, (_, c) => (a(), F(oi, xe({
          key: _.path,
          item: _,
          view: o.view,
          compact: o.compact,
          "show-thumbnails": o.showThumbnails,
          "show-path": o.showPath,
          "is-selected": o.isSelected(_.path),
          "is-dragging": o.isDraggingItem(_.path),
          "row-index": o.rowIndex,
          "col-index": c
        }, Ee(o.dragNDropEvents(_)), {
          onClick: d[0] || (d[0] = (i) => l("click", i)),
          onDblclick: d[1] || (d[1] = (i) => l("dblclick", i)),
          onContextmenu: d[2] || (d[2] = (i) => l("contextmenu", i)),
          onDragstart: d[3] || (d[3] = (i) => l("dragstart", i)),
          onDragend: d[4] || (d[4] = (i) => l("dragend", i)),
          explorerId: o.explorerId
        }), null, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, si));
  }
}), ri = ["onClick"], li = /* @__PURE__ */ j({
  __name: "Toast",
  setup(o) {
    const e = Y("ServiceContainer"), { getStore: n } = e.storage, l = y(n("full-screen", !1)), r = y([]), v = (d) => d === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", u = (d) => {
      r.value.splice(d, 1);
    }, f = (d) => {
      let _ = r.value.findIndex((c) => c.id === d);
      _ !== -1 && u(_);
    };
    return e.emitter.on("vf-toast-clear", () => {
      r.value = [];
    }), e.emitter.on("vf-toast-push", (d) => {
      let _ = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      d.id = _, r.value.push(d), setTimeout(() => {
        f(_);
      }, 5e3);
    }), (d, _) => (a(), m("div", {
      class: Z(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      I(qt, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: K(() => [
          (a(!0), m(ne, null, le(r.value, (c, i) => (a(), m("div", {
            key: i,
            onClick: (h) => u(i),
            class: Z(["vuefinder__toast__message", v(c.type)])
          }, p(c.label), 11, ri))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), ai = { class: "vuefinder__explorer__container" }, ii = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, di = {
  key: 0,
  class: "vuefinder__explorer__header"
}, ci = {
  key: 0,
  class: "vuefinder__linear-loader"
}, ui = /* @__PURE__ */ j({
  __name: "Explorer",
  setup(o) {
    const e = Y("ServiceContainer"), n = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), l = De("dragImage"), r = vt(null), v = De("scrollContainer"), u = De("scrollContent"), f = e.search, d = e.fs, _ = e.config, c = B(_.state), i = B(f.state), h = B(d.sort), b = B(d.sortedFiles), S = B(d.selectedKeys), C = B(d.loading), g = (A) => S.value?.has(A) ?? !1;
    let k = null;
    const x = y(null), $ = De("customScrollBar"), H = De("customScrollBarContainer"), ee = re(() => {
      const A = c.value.view, R = c.value.compactListView;
      return A === "grid" && !(i.value.searchMode && i.value.query.length) ? 88 : R ? 24 : 50;
    }), { t: ae } = e.i18n, {
      itemsPerRow: J,
      totalHeight: W,
      visibleRows: X,
      handleScroll: oe,
      getRowItems: q,
      getItemsInRange: ie,
      getItemPosition: w,
      updateItemsPerRow: T
    } = Sa(
      re(() => b.value ?? []),
      {
        scrollContainer: v,
        itemWidth: 104,
        rowHeight: ee,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: re(() => c.value.view === "list" || !!i.value.query.length)
      }
    ), {
      explorerId: D,
      isDragging: O,
      initializeSelectionArea: z,
      destroySelectionArea: te,
      handleContentClick: U
    } = $a({
      getItemPosition: w,
      getItemsInRange: ie,
      getKey: (A) => A.path,
      selectionObject: r,
      rowHeight: ee,
      itemWidth: 104
    }), V = y(null), G = (A) => {
      if (!A || !V.value) return !1;
      const R = S.value?.has(V.value) ?? !1;
      return O.value && (R ? S.value?.has(A) ?? !1 : A === V.value);
    };
    fe(() => _.get("view"), (A) => {
      A === "list" ? J.value = 1 : T();
    }, { immediate: !0 }), fe(J, (A) => {
      _.get("view") === "list" && A !== 1 && (J.value = 1);
    });
    const E = (A) => b.value?.[A];
    ce(() => {
      if (z(), r.value && r.value.on("beforestart", ({ event: A }) => {
        const R = A?.target === u.value;
        if (!A?.metaKey && !A?.ctrlKey && !A?.altKey && !R)
          return !1;
      }), v.value && (k = new ht({
        elements_selector: ".lazy",
        container: v.value
      })), fe(() => i.value.query, (A) => {
        const R = d.path.get().storage, N = d.path.get().path;
        !R || !N || (A ? e.emitter.emit("vf-fetch", {
          params: {
            q: "search",
            storage: R,
            path: N,
            filter: A
          },
          onSuccess: (ue) => {
            ue.files.length || e.emitter.emit("vf-toast-push", { label: ae("No search result found.") });
          }
        }) : e.emitter.emit("vf-fetch", { params: { q: "index", storage: R, path: N } }));
      }), H.value) {
        const A = et(H.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (R) => {
            x.value = R;
          },
          scroll: (R) => {
            const { scrollOffsetElement: N } = R.elements();
            v.value && v.value.scrollTo({ top: N.scrollTop, left: 0 });
          }
        });
        x.value = A;
      }
      v.value && v.value.addEventListener("scroll", () => {
        const A = x.value;
        if (!A) return;
        const { scrollOffsetElement: R } = A.elements();
        R.scrollTo({ top: v.value.scrollTop, left: 0 });
      });
    }), ce(() => {
      e.emitter.on("vf-refresh-thumbnails", () => {
        k && k.update();
      });
    }), Ut(() => {
      if (k && k.update(), x.value && $.value && v.value) {
        const R = v.value.scrollHeight > v.value.clientHeight, N = $.value;
        N.style.display = R ? "block" : "none", N.style.height = `${W.value}px`;
      }
    }), Re(() => {
      te(), k && (k.destroy(), k = null), x.value && (x.value.destroy(), x.value = null);
    });
    const L = (A) => {
      const R = A.target?.closest(".file-item-" + D), N = A;
      if (R) {
        const ue = String(R.getAttribute("data-key"));
        !N?.ctrlKey && !N?.metaKey && (A.type !== "touchstart" || !d.isSelected(ue)) && (d.clearSelection(), r.value?.clearSelection(!0, !0)), r.value?.resolveSelectables(), A.type === "touchstart" && d.isSelected(ue) ? d.select(ue) : d.toggleSelect(ue);
      }
      d.setSelectedCount(S.value?.size || 0);
    }, se = (A) => {
      const R = e.contextMenuItems.find((N) => N.show(e, {
        searchQuery: "",
        items: [A],
        target: A
      }));
      R && R.action(e, [A]);
    }, _e = (A) => {
      const R = A.target?.closest(".file-item-" + D), N = R ? String(R.getAttribute("data-key")) : null;
      if (!N) return;
      const ue = b.value?.find((Ge) => Ge.path === N);
      ue && se(ue);
    }, He = () => {
      const A = S.value;
      return b.value?.filter((R) => A?.has(R.path)) || [];
    }, Te = (A) => {
      A.preventDefault();
      const R = A.target?.closest(".file-item-" + D);
      if (R) {
        const N = String(R.getAttribute("data-key")), ue = b.value?.find((Ge) => Ge.path === N);
        S.value?.has(N) || (d.clearSelection(), d.select(N)), e.emitter.emit("vf-contextmenu-show", { event: A, items: He(), target: ue });
      }
    }, ke = (A) => {
      A.preventDefault(), e.emitter.emit("vf-contextmenu-show", { event: A, items: He() });
    }, Ae = (A) => {
      if (A.altKey || A.ctrlKey || A.metaKey)
        return A.preventDefault(), !1;
      O.value = !0;
      const R = A.target?.closest(".file-item-" + D);
      if (V.value = R ? String(R.dataset.key) : null, A.dataTransfer && V.value) {
        A.dataTransfer.setDragImage(l.value, 0, 15), A.dataTransfer.effectAllowed = "all", A.dataTransfer.dropEffect = "copy";
        const N = S.value?.has(V.value) ? Array.from(S.value) : [V.value];
        A.dataTransfer.setData("items", JSON.stringify(N)), d.setDraggedItem(V.value);
      }
    }, $e = () => {
      V.value = null;
    };
    return (A, R) => (a(), m("div", ai, [
      s("div", {
        ref: "customScrollBarContainer",
        class: Z(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(c).view === "grid" }, { "search-active": t(i).hasQuery }]])
      }, [
        s("div", ii, null, 512)
      ], 2),
      t(c).view === "list" || t(i).hasQuery ? (a(), m("div", di, [
        s("div", {
          onClick: R[0] || (R[0] = (N) => t(d).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          P(p(t(ae)("Name")) + " ", 1),
          de(I(Ue, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "basename"]
          ])
        ]),
        t(i).hasQuery ? M("", !0) : (a(), m("div", {
          key: 0,
          onClick: R[1] || (R[1] = (N) => t(d).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          P(p(t(ae)("Size")) + " ", 1),
          de(I(Ue, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "file_size"]
          ])
        ])),
        t(i).hasQuery ? (a(), m("div", {
          key: 1,
          onClick: R[2] || (R[2] = (N) => t(d).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          P(p(t(ae)("Filepath")) + " ", 1),
          de(I(Ue, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "path"]
          ])
        ])) : M("", !0),
        t(i).hasQuery ? M("", !0) : (a(), m("div", {
          key: 2,
          onClick: R[3] || (R[3] = (N) => t(d).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          P(p(t(ae)("Date")) + " ", 1),
          de(I(Ue, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "last_modified"]
          ])
        ]))
      ])) : M("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: v,
        class: Z(["vuefinder__explorer__selector-area", "scroller-" + t(D)]),
        onScroll: R[5] || (R[5] = //@ts-ignore
        (...N) => t(oe) && t(oe)(...N))
      }, [
        t(_).get("loadingIndicator") === "linear" && t(C) ? (a(), m("div", ci)) : M("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: u,
          class: "scrollContent min-h-full",
          style: Me({ height: `${t(W)}px`, position: "relative", width: "100%" }),
          onContextmenu: ge(ke, ["self", "prevent"]),
          onClick: R[4] || (R[4] = ge(
            //@ts-ignore
            (...N) => t(U) && t(U)(...N),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: l,
            class: "vuefinder__explorer__drag-item"
          }, [
            I(Ba, {
              count: V.value && t(S)?.has(V.value) ? t(S)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          t(i).query.length ? (a(!0), m(ne, { key: 0 }, le(t(X), (N) => (a(), F(Qe, {
            key: N,
            "row-index": N,
            "row-height": ee.value,
            view: "list",
            items: E(N) ? [E(N)] : [],
            compact: t(c).compactListView,
            "show-path": !0,
            "is-dragging-item": G,
            "is-selected": g,
            "drag-n-drop-events": (ue) => t(n).events(ue),
            explorerId: t(D),
            onClick: L,
            onDblclick: _e,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(c).view === "grid" ? (a(!0), m(ne, { key: 1 }, le(t(X), (N) => (a(), F(Qe, {
            key: N,
            "row-index": N,
            "row-height": ee.value,
            view: "grid",
            "items-per-row": t(J),
            items: t(q)(t(b), N),
            "show-thumbnails": t(c).showThumbnails,
            "is-dragging-item": G,
            "is-selected": g,
            "drag-n-drop-events": (ue) => t(n).events(ue),
            explorerId: t(D),
            onClick: L,
            onDblclick: _e,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (a(!0), m(ne, { key: 2 }, le(t(X), (N) => (a(), F(Qe, {
            key: N,
            "row-index": N,
            "row-height": ee.value,
            view: "list",
            items: E(N) ? [E(N)] : [],
            compact: t(c).compactListView,
            "is-dragging-item": G,
            "is-selected": g,
            "drag-n-drop-events": (ue) => t(n).events(ue),
            explorerId: t(D),
            onClick: L,
            onDblclick: _e,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      I(li)
    ]));
  }
}), vi = ["href", "download"], _i = ["onClick"], mi = /* @__PURE__ */ j({
  __name: "ContextMenu",
  setup(o) {
    const e = Y("ServiceContainer"), n = e.search, l = B(n.state), r = y(null), v = y([]), u = Oe({
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
    const f = (c) => c.link(e, v.value), d = (c) => {
      e.emitter.emit("vf-contextmenu-hide"), c.action(e, v.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: c, items: i, target: h = null }) => {
      if (u.items = e.contextMenuItems.filter((b) => b.show(e, {
        searchQuery: l.query,
        items: i,
        target: h
      })), l.query)
        if (h)
          e.emitter.emit("vf-context-selected", [h]);
        else
          return;
      else !h && !l.query ? e.emitter.emit("vf-context-selected", []) : i.length > 1 && i.some((b) => b.path === h.path) ? e.emitter.emit("vf-context-selected", i) : e.emitter.emit("vf-context-selected", [h]);
      _(c);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      u.active = !1;
    });
    const _ = (c) => {
      const i = e.root, h = e.root.getBoundingClientRect(), b = i.getBoundingClientRect();
      let S = c.clientX - h.left, C = c.clientY - h.top;
      u.active = !0, Pe(() => {
        const g = r.value?.getBoundingClientRect();
        let k = g?.height ?? 0, x = g?.width ?? 0;
        S = b.right - c.pageX + window.scrollX < x ? S - x : S, C = b.bottom - c.pageY + window.scrollY < k ? C - k : C, u.positions = {
          left: String(S) + "px",
          top: String(C) + "px"
        };
      });
    };
    return (c, i) => de((a(), m("ul", {
      ref_key: "contextmenu",
      ref: r,
      class: Z([u.active ? "vuefinder__context-menu--active" : "vuefinder__context-menu--inactive", "vuefinder__context-menu"]),
      style: Me(u.positions)
    }, [
      (a(!0), m(ne, null, le(u.items, (h) => (a(), m("li", {
        class: "vuefinder__context-menu__item",
        key: h.title
      }, [
        h.link ? (a(), m("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: f(h),
          download: f(h),
          onClick: i[0] || (i[0] = (b) => t(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, p(h.title(t(e).i18n)), 1)
        ], 8, vi)) : (a(), m("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (b) => d(h)
        }, [
          s("span", null, p(h.title(t(e).i18n)), 1)
        ], 8, _i))
      ]))), 128))
    ], 6)), [
      [be, u.active]
    ]);
  }
}), fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function hi(o, e) {
  return a(), m("svg", fi, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const It = { render: hi }, pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function gi(o, e) {
  return a(), m("svg", pi, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const wi = { render: gi }, bi = { class: "vuefinder__status-bar__wrapper" }, yi = { class: "vuefinder__status-bar__storage" }, ki = ["title"], xi = { class: "vuefinder__status-bar__storage-icon" }, Si = ["value"], $i = ["value"], Ci = { class: "vuefinder__status-bar__info" }, Ei = { key: 0 }, Mi = { class: "vuefinder__status-bar__selected-count" }, Ti = { class: "vuefinder__status-bar__actions" }, Ai = ["title"], Di = /* @__PURE__ */ j({
  __name: "Statusbar",
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = e.search, v = B(r.state), u = B(l.sortedFiles), f = B(l.path), d = B(l.selectedCount), _ = B(l.storages), c = B(l.selectedItems), i = B(l.path), h = (b) => {
      const S = b.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: S } });
    };
    return (b, S) => (a(), m("div", bi, [
      s("div", yi, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: t(n)("Storage")
        }, [
          s("div", xi, [
            I(t(It))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: t(f)?.storage,
            onChange: h,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (a(!0), m(ne, null, le(t(_), (C) => (a(), m("option", {
              value: C,
              key: C
            }, p(C), 9, $i))), 128))
          ], 40, Si)
        ], 8, ki),
        s("div", Ci, [
          t(v).hasQuery ? (a(), m("span", Ei, p(t(u).value.length) + " items found. ", 1)) : M("", !0),
          s("span", Mi, p(t(d) > 0 ? `${t(d)} item(s) selected.` : ""), 1)
        ])
      ]),
      s("div", Ti, [
        Le(b.$slots, "actions", {
          path: t(i).path,
          count: t(d) || 0,
          selected: t(c) || []
        }),
        s("span", {
          class: "vuefinder__status-bar__about",
          title: t(n)("About"),
          onClick: S[0] || (S[0] = (C) => t(e).modal.open(tt))
        }, [
          I(t(wi))
        ], 8, Ai)
      ])
    ]));
  }
}), Ii = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function Fi(o, e) {
  return a(), m("svg", Ii, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Ft = { render: Fi }, Li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Vi(o, e) {
  return a(), m("svg", Li, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Ri = { render: Vi }, Bi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Hi(o, e) {
  return a(), m("svg", Bi, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ])]);
}
const Lt = { render: Hi }, Ni = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Pi(o, e) {
  return a(), m("svg", Ni, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 12h6" }, null, -1)
  ])]);
}
const Vt = { render: Pi };
function Rt(o, e) {
  const n = o.findIndex((l) => l.path === e.path);
  n > -1 ? o[n] = e : o.push(e);
}
const qi = { class: "vuefinder__folder-loader-indicator" }, Ui = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Bt = /* @__PURE__ */ j({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Ot({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o) {
    const e = o, n = Y("ServiceContainer"), { t: l } = n.i18n, r = ft(o, "modelValue"), v = y(!1);
    fe(
      () => r.value,
      () => u()?.folders.length || f()
    );
    function u() {
      return n.treeViewData.find((d) => d.path === e.path);
    }
    const f = () => {
      v.value = !0, n.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          storage: e.storage,
          path: e.path
        }
      }).then((d) => {
        Rt(n.treeViewData, { path: e.path, type: "dir", ...d });
      }).catch((d) => {
      }).finally(() => {
        v.value = !1;
      });
    };
    return (d, _) => (a(), m("div", qi, [
      v.value ? (a(), F(t(at), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (a(), m("div", Ui, [
        r.value && u()?.folders.length ? (a(), F(t(Vt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : M("", !0),
        r.value ? M("", !0) : (a(), F(t(Lt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Oi = ["onClick"], zi = ["title", "onDblclick", "onClick"], Ki = { class: "vuefinder__treesubfolderlist__item-icon" }, ji = { class: "vuefinder__treesubfolderlist__subfolder" }, Gi = /* @__PURE__ */ j({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(o) {
    const e = Y("ServiceContainer"), n = e.fs, l = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), r = y({}), v = B(n.path), u = o, f = y(null);
    ce(() => {
      u.path === u.storage + "://" && f.value && et(f.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const d = re(() => e.treeViewData.find((_) => _.path === u.path)?.folders || []);
    return (_, c) => {
      const i = zt("TreeSubfolderList", !0);
      return a(), m("ul", {
        ref_key: "parentSubfolderList",
        ref: f,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (a(!0), m(ne, null, le(d.value, (h) => (a(), m("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", xe(Ee(t(l).events({ ...h, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (b) => r.value[h.path] = !r.value[h.path]
            }, [
              I(Bt, {
                storage: o.storage,
                path: h.path,
                modelValue: r.value[h.path],
                "onUpdate:modelValue": (b) => r.value[h.path] = b
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Oi),
            s("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: h.path,
              onDblclick: (b) => r.value[h.path] = !r.value[h.path],
              onClick: (b) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: u.storage, path: h.path } })
            }, [
              s("div", Ki, [
                t(v)?.path === h.path ? (a(), F(t(Ft), { key: 0 })) : (a(), F(t(je), { key: 1 }))
              ]),
              s("div", {
                class: Z(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(v)?.path === h.path
                }])
              }, p(h.basename), 3)
            ], 40, zi)
          ], 16),
          s("div", ji, [
            de(I(i, {
              storage: u.storage,
              path: h.path
            }, null, 8, ["storage", "path"]), [
              [be, r.value[h.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Yi = /* @__PURE__ */ j({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(o) {
    const e = Y("ServiceContainer"), n = e.fs, l = y(!1), r = o, v = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), u = B(n.path), f = re(() => r.storage === u.value?.storage), d = {
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
      c === u.value?.storage ? l.value = !l.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: c } }));
    }
    return (c, i) => (a(), m(ne, null, [
      s("div", {
        onClick: i[2] || (i[2] = (h) => _(o.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        s("div", xe(Ee(t(v).events(d), !0), {
          class: ["vuefinder__treestorageitem__info", f.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          s("div", {
            class: Z(["vuefinder__treestorageitem__icon", f.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            I(t(It))
          ], 2),
          s("div", null, p(o.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: i[1] || (i[1] = ge((h) => l.value = !l.value, ["stop"]))
        }, [
          I(Bt, {
            storage: o.storage,
            path: o.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": i[0] || (i[0] = (h) => l.value = h)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      de(I(Gi, {
        storage: o.storage,
        path: o.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [be, l.value]
      ])
    ], 64));
  }
}), Wi = { class: "vuefinder__folder-indicator" }, Qi = { class: "vuefinder__folder-indicator--icon" }, Xi = /* @__PURE__ */ j({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const e = ft(o, "modelValue");
    return (n, l) => (a(), m("div", Wi, [
      s("div", Qi, [
        e.value ? (a(), F(t(Vt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : M("", !0),
        e.value ? M("", !0) : (a(), F(t(Lt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Ji = { class: "vuefinder__treeview__header" }, Zi = { class: "vuefinder__treeview__pinned-label" }, ed = { class: "vuefinder__treeview__pin-text text-nowrap" }, td = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, nd = ["onClick"], od = ["title"], sd = ["onClick"], rd = { key: 0 }, ld = { class: "vuefinder__treeview__no-pinned" }, ad = /* @__PURE__ */ j({
  __name: "TreeView",
  setup(o) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, { getStore: l, setStore: r } = e.storage, v = e.fs, u = e.config, f = B(u.state), d = B(v.sortedFiles), _ = B(v.path), c = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), i = y(190), h = y(l("pinned-folders-opened", !0));
    fe(h, (g) => r("pinned-folders-opened", g));
    const b = (g) => {
      u.set("pinnedFolders", u.get("pinnedFolders").filter((k) => k.path !== g.path));
    }, S = (g) => {
      const k = g.clientX, x = g.target.parentElement;
      if (!x) return;
      const $ = x.getBoundingClientRect().width;
      x.classList.remove("transition-[width]"), x.classList.add("transition-none");
      const H = (ae) => {
        i.value = $ + ae.clientX - k, i.value < 50 && (i.value = 0, u.set("showTreeView", !1)), i.value > 50 && u.set("showTreeView", !0);
      }, ee = () => {
        const ae = x.getBoundingClientRect();
        i.value = ae.width, x.classList.add("transition-[width]"), x.classList.remove("transition-none"), window.removeEventListener("mousemove", H), window.removeEventListener("mouseup", ee);
      };
      window.addEventListener("mousemove", H), window.addEventListener("mouseup", ee);
    }, C = y(null);
    return ce(() => {
      C.value && et(C.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), fe(d, (g) => {
      const k = g.filter((x) => x.type === "dir");
      Rt(e.treeViewData, {
        path: _.value?.path || "",
        folders: k.map((x) => ({
          storage: x.storage,
          path: x.path,
          basename: x.basename,
          type: "dir"
        }))
      });
    }), (g, k) => (a(), m(ne, null, [
      s("div", {
        onClick: k[0] || (k[0] = (x) => t(u).toggle("showTreeView")),
        class: Z(["vuefinder__treeview__overlay", t(f).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      s("div", {
        style: Me(t(f).showTreeView ? "min-width:100px;max-width:75%; width: " + i.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: C,
          class: "vuefinder__treeview__scroll"
        }, [
          s("div", Ji, [
            s("div", {
              onClick: k[2] || (k[2] = (x) => h.value = !h.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              s("div", Zi, [
                I(t(Dt), { class: "vuefinder__treeview__pin-icon" }),
                s("div", ed, p(t(n)("Pinned Folders")), 1)
              ]),
              I(Xi, {
                modelValue: h.value,
                "onUpdate:modelValue": k[1] || (k[1] = (x) => h.value = x)
              }, null, 8, ["modelValue"])
            ]),
            h.value ? (a(), m("ul", td, [
              (a(!0), m(ne, null, le(t(f).pinnedFolders, (x) => (a(), m("li", {
                key: x.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", xe(Ee(t(c).events(x), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: ($) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: x.storage, path: x.path } })
                }), [
                  t(_)?.path !== x.path ? (a(), F(t(je), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : M("", !0),
                  t(_)?.path === x.path ? (a(), F(t(Ft), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : M("", !0),
                  s("div", {
                    title: x.path,
                    class: Z(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": t(_)?.path === x.path
                    }])
                  }, p(x.basename), 11, od)
                ], 16, nd),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: ($) => b(x)
                }, [
                  I(t(Ri), { class: "vuefinder__treeview__remove-icon" })
                ], 8, sd)
              ]))), 128)),
              t(f).pinnedFolders.length ? M("", !0) : (a(), m("li", rd, [
                s("div", ld, p(t(n)("No folders pinned")), 1)
              ]))
            ])) : M("", !0)
          ]),
          (a(!0), m(ne, null, le(t(v).storages.get(), (x) => (a(), m("div", {
            class: "vuefinder__treeview__storage",
            key: x
          }, [
            I(Yi, { storage: x }, null, 8, ["storage"])
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
function id(o) {
  return o.items.length > 1 && o.items.some((e) => e.path === o.target?.path) ? "many" : o.target ? "one" : "none";
}
function me(o) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, o);
  return (n, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== id(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !n.features.includes(e.feature));
}
function Xe(...o) {
  return (e, n) => o.some((l) => l(e, n));
}
function Ne(...o) {
  return (e, n) => o.every((l) => l(e, n));
}
const dd = [
  {
    id: pe.openDir,
    title: ({ t: o }) => o("Open containing folder"),
    action: (o, e) => {
      o.emitter.emit("vf-search-exit"), o.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0]?.storage, path: e[0]?.path }
      });
    },
    show: me({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: pe.refresh,
    title: ({ t: o }) => o("Refresh"),
    action: (o) => {
      const e = o.fs;
      o.emitter.emit("vf-fetch", { params: { q: "index", storage: e.path.get().storage, path: e.path.get().path } });
    },
    show: Xe(me({ target: "none" }), me({ target: "many" }))
  },
  {
    id: pe.selectAll,
    title: ({ t: o }) => o("Select All"),
    action: (o) => {
      o.fs.selectAll();
    },
    show: me({ target: "none" })
  },
  {
    id: pe.newfolder,
    title: ({ t: o }) => o("New Folder"),
    action: (o) => o.modal.open(st),
    show: me({ target: "none", feature: Q.NEW_FOLDER })
  },
  {
    id: pe.open,
    title: ({ t: o }) => o("Open"),
    action: (o, e) => {
      o.emitter.emit("vf-search-exit"), e[0] && o.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0].storage, path: e[0].path }
      });
    },
    show: me({ target: "one", targetType: "dir" })
  },
  {
    id: pe.pinFolder,
    title: ({ t: o }) => o("Pin Folder"),
    action: (o, e) => {
      const n = o.config, l = n.get("pinnedFolders"), r = l.concat(e.filter((v) => l.findIndex((u) => u.path === v.path) === -1));
      n.set("pinnedFolders", r);
    },
    show: Ne(
      me({ target: "one", targetType: "dir" }),
      (o, e) => o.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) === -1
    )
  },
  {
    id: pe.unpinFolder,
    title: ({ t: o }) => o("Unpin Folder"),
    action: (o, e) => {
      const n = o.config, l = n.get("pinnedFolders");
      n.set("pinnedFolders", l.filter((r) => !e.find((v) => v.path === r.path)));
    },
    show: Ne(
      me({ target: "one", targetType: "dir" }),
      (o, e) => o.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) !== -1
    )
  },
  {
    id: pe.preview,
    title: ({ t: o }) => o("Preview"),
    action: (o, e) => o.modal.open(nt, { storage: e[0]?.storage, item: e[0] }),
    show: Ne(
      me({ target: "one", feature: Q.PREVIEW }),
      (o, e) => e.target?.type !== "dir"
    )
  },
  {
    id: pe.download,
    link: (o, e) => o.requester.getDownloadUrl(e[0]?.storage, e[0]),
    title: ({ t: o }) => o("Download"),
    action: () => {
    },
    show: Ne(
      me({ target: "one", feature: Q.DOWNLOAD }),
      (o, e) => e.target?.type !== "dir"
    )
  },
  {
    id: pe.rename,
    title: ({ t: o }) => o("Rename"),
    action: (o, e) => o.modal.open(Ke, { items: e }),
    show: me({ target: "one", feature: Q.RENAME })
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
    title: ({ t: o }) => o("Archive"),
    action: (o, e) => o.modal.open(lt, { items: e }),
    show: Xe(
      me({ target: "many", feature: Q.ARCHIVE }),
      Ne(
        me({ target: "one", feature: Q.ARCHIVE }),
        (o, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: pe.unarchive,
    title: ({ t: o }) => o("Unarchive"),
    action: (o, e) => o.modal.open(rt, { items: e }),
    show: me({ target: "one", feature: Q.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: pe.delete,
    title: ({ t: o }) => o("Delete"),
    action: (o, e) => {
      o.modal.open(ze, { items: e });
    },
    show: Xe(
      me({ feature: Q.DELETE, target: "one" }),
      me({ feature: Q.DELETE, target: "many" })
    )
  }
], cd = {
  class: "vuefinder",
  ref: "root",
  tabindex: "0"
}, ud = { class: "vuefinder__main__content" }, vd = /* @__PURE__ */ j({
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
    loadingIndicator: { default: "linear" },
    contextMenuItems: { default: () => dd },
    onError: {},
    onSelect: {},
    icon: {}
  },
  emits: ["select", "path-update"],
  setup(o, { emit: e }) {
    const n = e, l = o, r = fn(l, Y("VueFinderOptions"));
    Kt("ServiceContainer", r);
    const v = r.config, u = r.fs, f = B(v.state);
    tr(r);
    let d = null;
    r.emitter.on("vf-fetch-abort", () => {
      d && d.abort(), u.setLoading(!1);
    }), r.emitter.on("vf-fetch", ({ params: c, body: i = null, onSuccess: h = null, onError: b = null, noCloseModal: S = !1 }) => {
      ["index", "search"].includes(c.q) && (d && d.abort(), u.setLoading(!0)), d = new AbortController();
      const C = d.signal;
      r.requester.send({
        url: "",
        method: c.m || "get",
        params: c,
        body: i,
        abortSignal: C
      }).then((g) => {
        u.setPath(g.dirname), v.get("persist") && v.set("path", g.dirname), S || r.modal.close(), u.setFiles(g.files), u.clearSelection(), u.setSelectedCount(0), u.setStorages(g.storages), h && h(g);
      }).catch((g) => {
        console.error(g), b ? b(g) : g && typeof g == "object" && "message" in g && r.emitter.emit("vf-toast-push", { label: g.message, type: "error" });
      }).finally(() => {
        ["index", "search"].includes(c.q) && u.setLoading(!1);
      });
    });
    function _(c) {
      let i = {};
      c && c.includes("://") && (i = {
        storage: c.split("://")[0],
        path: c
      }), r.emitter.emit("vf-fetch", {
        params: { q: "index", storage: u.path.get().storage, ...i },
        onError: l.onError ?? ((h) => {
          h && typeof h == "object" && "message" in h && r.emitter.emit("vf-toast-push", { label: h.message, type: "error" });
        })
      });
    }
    return ce(() => {
      fe(() => l.path, (i) => {
        _(i);
      });
      const c = v.get("persist") ? v.get("path") : l.path;
      u.setPath(c), _(c), u.path.listen((i) => {
        n("path-update", i);
      }), u.selectedItems.listen((i) => {
        n("select", i);
      });
    }), (c, i) => (a(), m("div", cd, [
      s("div", {
        class: Z(t(r).theme.actualValue)
      }, [
        s("div", {
          class: Z([t(f).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: Me(t(f).fullScreen ? "" : "max-height: " + o.maxHeight),
          onMousedown: i[0] || (i[0] = (h) => t(r).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: i[1] || (i[1] = (h) => t(r).emitter.emit("vf-contextmenu-hide"))
        }, [
          I(ol),
          I(Fl),
          I(xa),
          s("div", ud, [
            I(ad),
            I(ui)
          ]),
          I(Di, null, {
            actions: K((h) => [
              Le(c.$slots, "status-bar", mt(jt(h)))
            ]),
            _: 3
          })
        ], 38),
        (a(), F(_t, { to: "body" }, [
          I(Gt, { name: "fade" }, {
            default: K(() => [
              t(r).modal.visible ? (a(), F(Ze(t(r).modal.type), { key: 0 })) : M("", !0)
            ]),
            _: 1
          })
        ])),
        I(mi)
      ], 2)
    ], 512));
  }
}), Sd = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(o, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", o.provide("VueFinderOptions", e), o.component("VueFinder", vd);
  }
};
export {
  pe as ContextMenuIds,
  vd as VueFinder,
  Sd as VueFinderPlugin,
  dd as contextMenuItems,
  Sd as default
};
