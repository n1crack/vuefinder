import { reactive as Ue, watch as ie, ref as b, shallowRef as lt, useTemplateRef as Ie, defineComponent as G, inject as Y, onMounted as ve, nextTick as Be, createElementBlock as f, openBlock as i, withKeys as Le, unref as t, createElementVNode as s, withModifiers as we, renderSlot as Pe, createBlock as I, resolveDynamicComponent as Qe, toDisplayString as h, onUnmounted as He, normalizeClass as J, computed as oe, withCtx as j, createVNode as D, createCommentVNode as E, Fragment as ne, renderList as se, createTextVNode as U, withDirectives as le, vModelSelect as nt, vModelText as Ve, onBeforeUnmount as Dt, customRef as It, mergeProps as ke, toHandlers as Ee, vShow as ge, isRef as Ft, Teleport as Lt, normalizeStyle as Me, normalizeProps as Vt, TransitionGroup as Rt, onUpdated as Bt, mergeModels as Ht, useModel as at, resolveComponent as qt, provide as Nt, Transition as Pt } from "vue";
import { useStore as z } from "@nanostores/vue";
import Ut from "mitt";
import { persistentAtom as Ot } from "@nanostores/persistent";
import { atom as he, computed as Fe } from "nanostores";
import zt from "cropperjs";
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
    let [o, l] = e;
    this.config.fetchRequestInterceptor && (l = this.config.fetchRequestInterceptor(l));
    let r = await fetch(o, l);
    return this.config.fetchResponseInterceptor && (r = await this.config.fetchResponseInterceptor(r)), r;
  };
  transformRequestParams(e) {
    const o = this.config, l = {};
    Ke != null && Ke !== "" && o.xsrfHeaderName && (l[o.xsrfHeaderName] = Ke);
    const r = Object.assign({}, o.headers, l, e.headers), v = Object.assign({}, o.params, e.params), u = o.baseUrl + e.url, m = e.method;
    let c;
    if (m !== "get")
      if (e.body instanceof FormData) {
        const d = e.body;
        o.body != null && Object.entries(this.config.body).forEach(([a, p]) => {
          d.append(a, String(p));
        }), c = d;
      } else {
        const d = Object.assign({}, e.body ?? {});
        o.body != null && Object.assign(d, this.config.body), c = d;
      }
    const _ = { url: u, method: m, headers: r, params: v, body: c };
    if (o.transformRequest != null) {
      const d = o.transformRequest({ url: u, method: m, headers: r, params: v, body: c ?? null });
      d.url != null && (_.url = d.url), d.method != null && (_.method = d.method), d.params != null && (_.params = d.params), d.headers != null && (_.headers = d.headers), d.body != null && (_.body = d.body);
    }
    return _;
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
      let m;
      o.body instanceof FormData ? m = e.body : (m = JSON.stringify(o.body), r.headers["Content-Type"] = "application/json"), r.body = m;
    }
    this.config.fetchParams && Object.assign(r, this.config.fetchParams);
    const u = await this.customFetch(v, r);
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
  const o = Ue(JSON.parse(e ?? "{}"));
  ie(o, l);
  function l() {
    Object.keys(o).length ? localStorage.setItem(n + "_storage", JSON.stringify(o)) : localStorage.removeItem(n + "_storage");
  }
  function r(c, _) {
    o[c] = _;
  }
  function v(c) {
    delete o[c];
  }
  function u() {
    Object.keys(o).forEach((c) => v(c));
  }
  return { getStore: (c, _ = null) => c in o ? o[c] : _, setStore: r, removeStore: v, clearStore: u };
}
async function Jt(n, e) {
  const o = e[n];
  return typeof o == "function" ? (await o()).default : o;
}
function Zt(n, e, o, l) {
  const { getStore: r, setStore: v } = n, u = b({}), m = b(r("locale", e)), c = (a, p = e) => {
    Jt(a, l).then((g) => {
      u.value = g, v("locale", a), m.value = a, v("translations", g), Object.values(l).length > 1 && (o.emit("vf-toast-push", { label: "The language is set to " + a }), o.emit("vf-language-saved"));
    }).catch(() => {
      p ? (o.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), c(p, null)) : o.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  ie(m, (a) => {
    c(a);
  }), !r("locale") && !Object.keys(l).length ? c(e) : u.value = r("translations");
  const _ = (a, ...p) => p.length ? _(a = a.replace("%s", String(p.shift())), ...p) : a;
  function d(a, ...p) {
    return u.value && Object.prototype.hasOwnProperty.call(u.value, a) ? _(u.value[a] || a, ...p) : _(a, ...p);
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
  const r = parseFloat(l[1] || "0"), v = (l[2] || "").toLowerCase(), u = e[v] ?? 0;
  return Math.round(r * Math.pow(1024, u));
}
const Ce = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function on(n, e) {
  const o = b(Ce.SYSTEM), l = b(Ce.LIGHT);
  o.value = n.getStore("theme", e ?? Ce.SYSTEM);
  const r = window.matchMedia("(prefers-color-scheme: dark)"), v = (u) => {
    o.value === Ce.DARK || o.value === Ce.SYSTEM && u.matches ? l.value = Ce.DARK : l.value = Ce.LIGHT;
  };
  return v(r), r.addEventListener("change", v), {
    value: o,
    actualValue: l,
    set(u) {
      o.value = u, u !== Ce.SYSTEM ? n.setStore("theme", u) : n.removeStore("theme"), v(r);
    }
  };
}
function sn() {
  const n = lt(null), e = b(!1), o = b();
  return { visible: e, type: n, data: o, open: (v, u = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, n.value = v, o.value = u;
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
  const e = `vuefinder_config_${n}`, o = Ot(e, je, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), l = (_ = {}) => {
    const d = o.get(), a = { ...je, ..._, ...d };
    o.set(a);
  }, r = (_) => o.get()[_], v = () => o.get(), u = (_, d) => {
    const a = o.get();
    typeof _ == "object" && _ !== null ? o.set({ ...a, ..._ }) : o.set({ ...a, [_]: d });
  };
  return {
    // Store atom
    state: o,
    // Methods
    init: l,
    get: r,
    set: u,
    toggle: (_) => {
      const d = o.get();
      u(_, !d[_]);
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
  }), u = he(null), m = he(0), c = he(!1), _ = Fe([n], (w) => {
    const S = (w || "local://").trim(), te = S.indexOf("://"), ce = te >= 0 ? S.slice(0, te) : "", Te = (te >= 0 ? S.slice(te + 3) : S).split("/").filter(Boolean);
    let ye = "";
    const Ae = Te.map(($e) => (ye = ye ? `${ye}/${$e}` : $e, { basename: $e, name: $e, path: ce ? `${ce}://${ye}` : ye, type: "dir" }));
    return { storage: ce, breadcrumb: Ae, path: S };
  }), d = Fe([o, l], (w, S) => {
    const { active: te, column: ce, order: Se } = S;
    if (!te || !ce) return w;
    const Te = Se === "asc" ? 1 : -1;
    return w.slice().sort((ye, Ae) => ln(ye[ce], Ae[ce]) * Te);
  }), a = Fe([o, r], (w, S) => S.size === 0 ? [] : w.filter((te) => S.has(te.path)));
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: n,
    sort: l,
    selectedKeys: r,
    selectedCount: m,
    loading: c,
    draggedItem: u,
    clipboardItems: v,
    // Computed values
    path: _,
    sortedFiles: d,
    selectedItems: a,
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
    setSort: (w, S) => {
      l.set({ active: !0, column: w, order: S });
    },
    toggleSort: (w) => {
      const S = l.get();
      S.active && S.column === w ? l.set({
        active: S.order === "asc",
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
      const S = new Set(r.get());
      S.add(w), r.set(S), m.set(S.size);
    },
    deselect: (w) => {
      const S = new Set(r.get());
      S.delete(w), r.set(S), m.set(S.size);
    },
    toggleSelect: (w) => {
      const S = new Set(r.get());
      S.has(w) ? S.delete(w) : S.add(w), r.set(S), m.set(S.size);
    },
    selectAll: () => {
      const w = new Set(o.get().map((S) => S.path));
      r.set(w), m.set(w.size);
    },
    clearSelection: () => {
      r.set(/* @__PURE__ */ new Set()), m.set(0);
    },
    setSelection: (w) => {
      const S = new Set(w ?? []);
      r.set(S), m.set(S.size);
    },
    setSelectedCount: (w) => {
      m.set(w);
    },
    setLoading: (w) => {
      c.set(!!w);
    },
    isLoading: () => c.get(),
    setClipboard: (w, S) => {
      const te = o.get().filter((ce) => S.has(ce.path));
      v.set({
        type: w,
        path: _.get().path,
        items: new Set(te)
      });
    },
    createIsCut: (w) => Fe([v], (S) => S.type === "cut" && Array.from(S.items).some((te) => te.path === w)),
    createIsCopied: (w) => Fe([v], (S) => S.type === "copy" && Array.from(S.items).some((te) => te.path === w)),
    isCut: (w) => {
      const S = v.get();
      return S.type === "cut" && Array.from(S.items).some((te) => te.path === w);
    },
    isCopied: (w) => {
      const S = v.get();
      return S.type === "copy" && Array.from(S.items).some((te) => te.path === w);
    },
    clearClipboard: () => {
      v.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
    },
    getClipboard: () => v.get(),
    setDraggedItem: (w) => {
      u.set(w);
    },
    getDraggedItem: () => u.get(),
    clearDraggedItem: () => {
      u.set(null);
    }
  };
}, ot = {
  query: "",
  searchMode: !1
}, dn = () => {
  const n = he(ot), e = Fe(n, (_) => _.query.length > 0);
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
      n.set({ ...ot });
    }
  };
}, cn = (n, e) => {
  const o = Xt(n.id), l = Ut(), r = on(o, n.theme), v = e.i18n, u = n.locale ?? e.locale, m = rn(n.id), c = an(), _ = dn(), d = (a) => Array.isArray(a) ? a : en;
  return Ue({
    // app version
    version: tn,
    // config store
    config: m,
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
    storage: o,
    // localization object
    i18n: Zt(o, u, l, v),
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
      onKeyup: r[1] || (r[1] = Le((v) => t(o).modal.close(), ["esc"])),
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
    return (e, o) => (i(), f("div", mn, [
      s("div", fn, [
        (i(), I(Qe(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("h3", pn, h(n.title), 1)
    ]));
  }
}), hn = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: o }) {
    const l = Y("ServiceContainer"), r = b(!1), { t: v } = l.i18n;
    let u = null;
    const m = () => {
      clearTimeout(u), r.value = !0, u = setTimeout(() => {
        r.value = !1;
      }, 2e3);
    };
    return ve(() => {
      l.emitter.on(n.on, m);
    }), He(() => {
      clearTimeout(u);
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
    class: J(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
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
}, Fn = { class: "vuefinder__about-modal__description" }, Ln = { class: "vuefinder__about-modal__settings" }, Vn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Rn = { class: "vuefinder__about-modal__setting-input" }, Bn = ["checked"], Hn = { class: "vuefinder__about-modal__setting-label" }, qn = {
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
    }, u = oe(() => [
      { name: r("About"), key: v.ABOUT, current: !1 },
      { name: r("Settings"), key: v.SETTINGS, current: !1 },
      { name: r("Shortcuts"), key: v.SHORTCUTS, current: !1 },
      { name: r("Reset"), key: v.RESET, current: !1 }
    ]), m = b("about"), c = async () => {
      o.reset(), l(), location.reload();
    }, _ = (y) => {
      e.theme.set(y), e.emitter.emit("vf-theme-saved");
    }, d = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? dt : it, e.emitter.emit("vf-metric-units-saved");
    }, a = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      o.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, g = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: C } = Y("VueFinderOptions"), T = Object.fromEntries(
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
      }).filter(([y]) => Object.keys(C).includes(y))
    ), k = oe(() => ({
      system: r("System"),
      light: r("Light"),
      dark: r("Dark")
    }));
    return (y, R) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: R[3] || (R[3] = (N) => t(e).modal.close()),
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
                  (i(!0), f(ne, null, se(u.value, (N) => (i(), f("button", {
                    key: N.name,
                    onClick: (X) => m.value = N.key,
                    class: J([N.key === m.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": N.current ? "page" : void 0
                  }, h(N.name), 11, En))), 128))
                ])
              ])
            ]),
            m.value === v.ABOUT ? (i(), f("div", Mn, [
              s("div", Tn, h(t(r)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              s("a", An, h(t(r)("Project home")), 1),
              s("a", Dn, h(t(r)("Follow on GitHub")), 1)
            ])) : E("", !0),
            m.value === v.SETTINGS ? (i(), f("div", In, [
              s("div", Fn, h(t(r)("Customize your experience with the following settings")), 1),
              s("div", Ln, [
                s("fieldset", null, [
                  s("div", Vn, [
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
                        U(h(t(r)("Use Metric Units")) + " ", 1),
                        D(De, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: j(() => [
                            U(h(t(r)("Saved.")), 1)
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
                        U(h(t(r)("Compact list view")) + " ", 1),
                        D(De, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: j(() => [
                            U(h(t(r)("Saved.")), 1)
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
                        U(h(t(r)("Persist path on reload")) + " ", 1),
                        D(De, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: j(() => [
                            U(h(t(r)("Saved.")), 1)
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
                        U(h(t(r)("Show thumbnails")) + " ", 1),
                        D(De, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: j(() => [
                            U(h(t(r)("Saved.")), 1)
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
                      le(s("select", {
                        id: "theme",
                        "onUpdate:modelValue": R[0] || (R[0] = (N) => t(e).theme.value = N),
                        onChange: R[1] || (R[1] = (N) => _(N.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Theme")
                        }, [
                          (i(!0), f(ne, null, se(k.value, (N, X) => (i(), f("option", { value: X }, h(N), 9, lo))), 256))
                        ], 8, ro)
                      ], 544), [
                        [nt, t(e).theme.value]
                      ]),
                      D(De, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: j(() => [
                          U(h(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t(e).features.includes(t(ee).LANGUAGE) && Object.keys(t(T)).length > 1 ? (i(), f("div", ao, [
                    s("div", io, [
                      s("label", co, h(t(r)("Language")), 1)
                    ]),
                    s("div", uo, [
                      le(s("select", {
                        id: "language",
                        "onUpdate:modelValue": R[2] || (R[2] = (N) => t(e).i18n.locale = N),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Language")
                        }, [
                          (i(!0), f(ne, null, se(t(T), (N, X) => (i(), f("option", { value: X }, h(N), 9, _o))), 256))
                        ], 8, vo)
                      ], 512), [
                        [nt, t(e).i18n.locale]
                      ]),
                      D(De, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: j(() => [
                          U(h(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : E("", !0)
                ])
              ])
            ])) : E("", !0),
            m.value === v.SHORTCUTS ? (i(), f("div", mo, [
              s("div", fo, [
                s("div", po, [
                  s("div", null, h(t(r)("Rename")), 1),
                  R[4] || (R[4] = s("kbd", null, "F2", -1))
                ]),
                s("div", ho, [
                  s("div", null, h(t(r)("Refresh")), 1),
                  R[5] || (R[5] = s("kbd", null, "F5", -1))
                ]),
                s("div", go, [
                  U(h(t(r)("Delete")) + " ", 1),
                  R[6] || (R[6] = s("kbd", null, "Del", -1))
                ]),
                s("div", wo, [
                  U(h(t(r)("Escape")) + " ", 1),
                  R[7] || (R[7] = s("div", null, [
                    s("kbd", null, "Esc")
                  ], -1))
                ]),
                s("div", bo, [
                  U(h(t(r)("Select All")) + " ", 1),
                  R[8] || (R[8] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    U(" + "),
                    s("kbd", null, "A")
                  ], -1))
                ]),
                s("div", yo, [
                  U(h(t(r)("Search")) + " ", 1),
                  R[9] || (R[9] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    U(" + "),
                    s("kbd", null, "F")
                  ], -1))
                ]),
                s("div", ko, [
                  U(h(t(r)("Toggle Sidebar")) + " ", 1),
                  R[10] || (R[10] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    U(" + "),
                    s("kbd", null, "E")
                  ], -1))
                ]),
                s("div", xo, [
                  U(h(t(r)("Open Settings")) + " ", 1),
                  R[11] || (R[11] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    U(" + "),
                    s("kbd", null, ",")
                  ], -1))
                ]),
                s("div", So, [
                  U(h(t(r)("Toggle Full Screen")) + " ", 1),
                  R[12] || (R[12] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    U(" + "),
                    s("kbd", null, "Enter")
                  ], -1))
                ]),
                s("div", $o, [
                  U(h(t(r)("Preview")) + " ", 1),
                  R[13] || (R[13] = s("div", null, [
                    s("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : E("", !0),
            m.value === v.RESET ? (i(), f("div", Co, [
              s("div", Eo, h(t(r)("Reset all settings to default")), 1),
              s("button", {
                onClick: c,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, h(t(r)("Reset Settings")), 1)
            ])) : E("", !0)
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
const ut = { render: To }, Ao = { class: "vuefinder__delete-modal__content" }, Do = { class: "vuefinder__delete-modal__form" }, Io = { class: "vuefinder__delete-modal__description" }, Fo = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Lo = { class: "vuefinder__delete-modal__file" }, Vo = {
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
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = z(l.path), v = b(e.modal.data.items), u = b(""), m = () => {
      v.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: v.value.map(({ path: c, type: _ }) => ({ path: c, type: _ }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("Files deleted.") });
        },
        onError: (c) => {
          u.value = o(c.message);
        }
      });
    };
    return (c, _) => (i(), I(be, null, {
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
                (i(!0), f(ne, null, se(v.value, (d) => (i(), f("p", Lo, [
                  d.type === "dir" ? (i(), f("svg", Vo, [..._[2] || (_[2] = [
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
                  s("span", Bo, h(d.basename), 1)
                ]))), 256))
              ]),
              u.value.length ? (i(), I(t(u), {
                key: 0,
                onHidden: _[0] || (_[0] = (d) => u.value = ""),
                error: ""
              }, {
                default: j(() => [
                  U(h(u.value), 1)
                ]),
                _: 1
              })) : E("", !0)
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
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = z(l.path), v = b(e.modal.data.items[0]), u = b(e.modal.data.items[0].basename), m = b(""), c = () => {
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
          e.emitter.emit("vf-toast-push", { label: o("%s is renamed.", u.value) });
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
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Rename")), 1),
        s("button", {
          type: "button",
          onClick: d[2] || (d[2] = (a) => t(e).modal.close()),
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
                s("span", jo, h(v.value.basename), 1)
              ]),
              le(s("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => u.value = a),
                onKeyup: Le(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Ve, u.value]
              ]),
              m.value.length ? (i(), I(t(m), {
                key: 0,
                onHidden: d[1] || (d[1] = (a) => m.value = ""),
                error: ""
              }, {
                default: j(() => [
                  U(h(m.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Go = ["title"], et = /* @__PURE__ */ G({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const o = e, l = Y("ServiceContainer"), { t: r } = l.i18n, v = b(!1), u = b(null), m = b(u.value?.innerHTML);
    ie(m, () => v.value = !1);
    const c = () => {
      o("hidden"), v.value = !0;
    };
    return (_, d) => (i(), f("div", null, [
      v.value ? E("", !0) : (i(), f("div", {
        key: 0,
        ref_key: "strMessage",
        ref: u,
        class: J(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Pe(_.$slots, "default"),
        s("div", {
          class: "vuefinder__message__close",
          onClick: c,
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
    const o = e, l = b(""), r = b(""), v = b(null), u = b(!1), m = b(""), c = b(!1), _ = Y("ServiceContainer"), { t: d } = _.i18n;
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
        l.value = g, o("success");
      });
    });
    const a = () => {
      u.value = !u.value, r.value = l.value;
    }, p = () => {
      m.value = "", c.value = !1, _.requester.send({
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
        m.value = d("Updated."), l.value = g, o("success"), u.value = !u.value;
      }).catch((g) => {
        m.value = d(g.message), c.value = !0;
      });
    };
    return (g, C) => (i(), f("div", Yo, [
      s("div", Wo, [
        s("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(_).modal.data.item.path
        }, h(t(_).modal.data.item.basename), 9, Qo),
        s("div", Xo, [
          u.value ? (i(), f("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, h(t(d)("Save")), 1)) : E("", !0),
          t(_).features.includes(t(ee).EDIT) ? (i(), f("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: C[0] || (C[0] = (M) => a())
          }, h(u.value ? t(d)("Cancel") : t(d)("Edit")), 1)) : E("", !0)
        ])
      ]),
      s("div", null, [
        u.value ? (i(), f("div", Zo, [
          le(s("textarea", {
            ref_key: "editInput",
            ref: v,
            "onUpdate:modelValue": C[1] || (C[1] = (M) => r.value = M),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Ve, r.value]
          ])
        ])) : (i(), f("pre", Jo, h(l.value), 1)),
        m.value.length ? (i(), I(et, {
          key: 2,
          onHidden: C[2] || (C[2] = (M) => m.value = ""),
          error: c.value
        }, {
          default: j(() => [
            U(h(m.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : E("", !0)
      ])
    ]));
  }
}), ts = { class: "vuefinder__image-preview" }, ns = { class: "vuefinder__image-preview__header" }, os = ["title"], ss = { class: "vuefinder__image-preview__actions" }, rs = { class: "vuefinder__image-preview__image-container" }, ls = ["src"], as = /* @__PURE__ */ G({
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = Y("ServiceContainer"), { t: r } = l.i18n, v = b(null), u = b(null), m = b(!1), c = b(""), _ = b(!1), d = () => {
      m.value = !m.value, m.value && v.value ? u.value = new zt(v.value, {
        crop(p) {
        }
      }) : u.value && u.value.destroy();
    }, a = () => {
      u.value && u.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          c.value = "", _.value = !1;
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
          }).then((C) => {
            c.value = r("Updated."), v.value && (v.value.src = l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item)), d(), o("success");
          }).catch((C) => {
            c.value = r(C.message), _.value = !0;
          });
        }
      );
    };
    return ve(() => {
      o("success");
    }), (p, g) => (i(), f("div", ts, [
      s("div", ns, [
        s("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, h(t(l).modal.data.item.basename), 9, os),
        s("div", ss, [
          m.value ? (i(), f("button", {
            key: 0,
            onClick: a,
            class: "vuefinder__image-preview__crop-button"
          }, h(t(r)("Crop")), 1)) : E("", !0),
          t(l).features.includes(t(ee).EDIT) ? (i(), f("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: g[0] || (g[0] = (C) => d())
          }, h(m.value ? t(r)("Cancel") : t(r)("Edit")), 1)) : E("", !0)
        ])
      ]),
      s("div", rs, [
        s("img", {
          ref_key: "image",
          ref: v,
          class: "vuefinder__image-preview__image",
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          alt: ""
        }, null, 8, ls)
      ]),
      c.value.length ? (i(), I(et, {
        key: 0,
        onHidden: g[1] || (g[1] = (C) => c.value = ""),
        error: _.value
      }, {
        default: j(() => [
          U(h(c.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : E("", !0)
    ]));
  }
}), is = { class: "vuefinder__default-preview" }, ds = { class: "vuefinder__default-preview__header" }, cs = ["title"], us = /* @__PURE__ */ G({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = Y("ServiceContainer"), l = e;
    return ve(() => {
      l("success");
    }), (r, v) => (i(), f("div", is, [
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
    return ve(() => {
      l("success");
    }), (v, u) => (i(), f("div", vs, [
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
          u[0] || (u[0] = U(" Your browser does not support the video tag. ", -1))
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
    return ve(() => {
      o("success");
    }), (v, u) => (i(), f("div", hs, [
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
          u[0] || (u[0] = U(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), ks = { class: "vuefinder__pdf-preview" }, xs = ["title"], Ss = ["data"], $s = ["src"], Cs = /* @__PURE__ */ G({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = Y("ServiceContainer"), l = e, r = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ve(() => {
      l("success");
    }), (v, u) => (i(), f("div", ks, [
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
}, Is = { class: "vuefinder__preview-modal__details" }, Fs = { class: "font-bold" }, Ls = { class: "font-bold pl-2" }, Vs = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Rs = ["download", "href"], _t = /* @__PURE__ */ G({
  __name: "ModalPreview",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = b(!1), r = (u) => (e.modal.data.item.mime_type ?? "").startsWith(u), v = e.features.includes(ee.PREVIEW);
    return v || (l.value = !0), (u, m) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: m[6] || (m[6] = (c) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Close")), 1),
        t(e).features.includes(t(ee).DOWNLOAD) ? (i(), f("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item),
          href: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item)
        }, h(t(o)("Download")), 9, Rs)) : E("", !0)
      ]),
      default: j(() => [
        s("div", null, [
          s("div", Ms, [
            t(v) ? (i(), f("div", Ts, [
              r("text") ? (i(), I(es, {
                key: 0,
                onSuccess: m[0] || (m[0] = (c) => l.value = !0)
              })) : r("image") ? (i(), I(as, {
                key: 1,
                onSuccess: m[1] || (m[1] = (c) => l.value = !0)
              })) : r("video") ? (i(), I(ps, {
                key: 2,
                onSuccess: m[2] || (m[2] = (c) => l.value = !0)
              })) : r("audio") ? (i(), I(ys, {
                key: 3,
                onSuccess: m[3] || (m[3] = (c) => l.value = !0)
              })) : r("application/pdf") ? (i(), I(Cs, {
                key: 4,
                onSuccess: m[4] || (m[4] = (c) => l.value = !0)
              })) : (i(), I(us, {
                key: 5,
                onSuccess: m[5] || (m[5] = (c) => l.value = !0)
              }))
            ])) : E("", !0),
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
                s("span", null, h(t(o)("Loading")), 1)
              ])) : E("", !0)
            ])
          ])
        ]),
        s("div", Is, [
          s("div", null, [
            s("span", Fs, h(t(o)("File Size")) + ": ", 1),
            U(h(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", Ls, h(t(o)("Last Modified")) + ": ", 1),
            U(" " + h(t(Es)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(ee).DOWNLOAD) ? (i(), f("div", Vs, [
          s("span", null, h(t(o)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : E("", !0)
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
}, Ks = { class: "vuefinder__move-modal__file-name" }, js = { class: "vuefinder__move-modal__target-title" }, Gs = { class: "vuefinder__move-modal__target-directory" }, Ys = { class: "vuefinder__move-modal__target-path" }, Ws = { class: "vuefinder__move-modal__selected-items" }, mt = /* @__PURE__ */ G({
  __name: "ModalTransfer",
  props: {
    q: {},
    title: {},
    body: {},
    successBtn: {},
    successText: {}
  },
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = z(l.path), v = n, u = b(e.modal.data.items.from), m = e.modal.data.items.to, c = b("");
    console.log(m.value.path);
    const _ = () => {
      u.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: v.q,
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: u.value.map(({ path: d, type: a }) => ({ path: d, type: a })),
          item: m.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: v.successText });
        },
        onError: (d) => {
          c.value = o(d.message);
        }
      });
    };
    return (d, a) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: _,
          class: "vf-btn vf-btn-primary"
        }, h(v.successBtn), 1),
        s("button", {
          type: "button",
          onClick: a[1] || (a[1] = (p) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1),
        s("div", Ws, h(t(o)("%s item(s) selected.", u.value.size)), 1)
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
              (i(!0), f(ne, null, se(u.value, (p) => (i(), f("div", {
                class: "vuefinder__move-modal__file",
                key: p.path
              }, [
                s("div", null, [
                  p.type === "dir" ? (i(), f("svg", Os, [...a[2] || (a[2] = [
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
                s("div", Ks, h(p.path), 1)
              ]))), 128))
            ]),
            s("h4", js, h(t(o)("Target Directory")), 1),
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
              s("span", Ys, h(t(m).value.path), 1)
            ]),
            c.value.length ? (i(), I(t(c), {
              key: 0,
              onHidden: a[0] || (a[0] = (p) => c.value = ""),
              error: ""
            }, {
              default: j(() => [
                U(h(c.value), 1)
              ]),
              _: 1
            })) : E("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ft = /* @__PURE__ */ G({
  __name: "ModalMove",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n;
    return (l, r) => (i(), I(mt, {
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
    return (l, r) => (i(), I(mt, {
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
  const e = n.search, o = n.fs, l = n.config, r = z(e.state), v = z(o.selectedItems), u = (m) => {
    if (m.code === fe.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible && !r.value?.searchMode) {
      if (m.code === fe.F2 && n.features.includes(ee.RENAME) && v.value.length === 1 && n.modal.open(Ze, { items: v.value }), m.code === fe.F5 && n.emitter.emit("vf-fetch", { params: { q: "index", storage: o.path.get().storage, path: o.path.get().path } }), m.code === fe.DELETE && v.value.length === 0 && n.modal.open(Je, { items: v.value }), m.ctrlKey && m.code === fe.BACKSLASH && n.modal.open(ct), m.ctrlKey && m.code === fe.KEY_F && n.features.includes(ee.SEARCH) && (e.enterSearchMode(), m.preventDefault()), m.ctrlKey && m.code === fe.KEY_E && (l.toggle("showTreeView"), m.preventDefault()), m.ctrlKey && m.code === fe.ENTER && (l.toggle("fullScreen"), n.root.focus()), m.ctrlKey && m.code === fe.KEY_A && (o.selectAll(), m.preventDefault()), m.code === fe.SPACE && v.value.length === 1 && v.value[0]?.type !== "dir" && n.modal.open(_t, { storage: o.path.get().storage, item: v.value[0] }), m.metaKey && m.code === fe.KEY_C) {
        if (v.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("copy", new Set(v.value.map((c) => c.path))), n.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", v.value.length) }), m.preventDefault();
      }
      if (m.metaKey && m.code === fe.KEY_X) {
        if (v.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("cut", new Set(v.value.map((c) => c.path))), n.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", v.value.length) }), m.preventDefault();
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
          n.modal.open(ft, { items: { from: o.getClipboard().items, to: o.path } }), o.clearClipboard();
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
  ve(() => {
    n.root.addEventListener("keydown", u);
  }), Dt(() => {
    n.root.removeEventListener("keydown", u);
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
const pt = { render: Zs }, er = { class: "vuefinder__new-folder-modal__content" }, tr = { class: "vuefinder__new-folder-modal__form" }, nr = { class: "vuefinder__new-folder-modal__description" }, or = ["placeholder"], ht = /* @__PURE__ */ G({
  __name: "ModalNewFolder",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = z(l.path), v = b(""), u = b(""), m = () => {
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
        onError: (c) => {
          u.value = o(c.message);
        }
      });
    };
    return (c, _) => (i(), I(be, null, {
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
            icon: t(pt),
            title: t(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", er, [
            s("div", tr, [
              s("p", nr, h(t(o)("Create a new folder")), 1),
              le(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => v.value = d),
                onKeyup: Le(m, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(o)("Folder Name"),
                type: "text"
              }, null, 40, or), [
                [Ve, v.value]
              ]),
              u.value.length ? (i(), I(t(u), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => u.value = ""),
                error: ""
              }, {
                default: j(() => [
                  U(h(u.value), 1)
                ]),
                _: 1
              })) : E("", !0)
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
const gt = { render: rr }, lr = { class: "vuefinder__new-file-modal__content" }, ar = { class: "vuefinder__new-file-modal__form" }, ir = { class: "vuefinder__new-file-modal__description" }, dr = ["placeholder"], cr = /* @__PURE__ */ G({
  __name: "ModalNewFile",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = z(l.path), v = b(""), u = b(""), m = () => {
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
        onError: (c) => {
          u.value = o(c.message);
        }
      });
    };
    return (c, _) => (i(), I(be, null, {
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
            icon: t(gt),
            title: t(o)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", lr, [
            s("div", ar, [
              s("p", ir, h(t(o)("Create a new file")), 1),
              le(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => v.value = d),
                onKeyup: Le(m, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(o)("File Name"),
                type: "text"
              }, null, 40, dr), [
                [Ve, v.value]
              ]),
              u.value.length ? (i(), I(t(u), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => u.value = ""),
                error: ""
              }, {
                default: j(() => [
                  U(h(u.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ue = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function ur() {
  const n = Y("ServiceContainer"), { t: e } = n.i18n, o = n.fs, l = n.config, r = b({ QUEUE_ENTRY_STATUS: ue }), v = b(null), u = b(null), m = b(null), c = b(null), _ = b(null), d = b(null), a = b([]), p = b(""), g = b(!1), C = b(!1);
  let M;
  const T = (K) => a.value.findIndex((de) => de.id === K), k = (K, de) => M.addFile({ name: de || K.name, type: K.type, data: K, source: "Local" }), y = (K) => K.status === ue.DONE ? "text-green-600" : K.status === ue.ERROR || K.status === ue.CANCELED ? "text-red-600" : "", R = (K) => K.status === ue.DONE ? "✓" : K.status === ue.ERROR || K.status === ue.CANCELED ? "!" : "...", N = () => c.value?.click(), X = () => n.modal.close(), re = () => {
    if (g.value || !a.value.filter((K) => K.status !== ue.DONE).length) {
      g.value || (p.value = e("Please select file to upload first."));
      return;
    }
    p.value = "", M.retryAll(), M.upload();
  }, B = () => {
    M.cancelAll(), a.value.forEach((K) => {
      K.status !== ue.DONE && (K.status = ue.CANCELED, K.statusName = e("Canceled"));
    }), g.value = !1;
  }, L = (K) => {
    g.value || (M.removeFile(K.id), a.value.splice(T(K.id), 1));
  }, ae = (K) => {
    if (!g.value)
      if (M.cancelAll(), K) {
        const de = a.value.filter((F) => F.status !== ue.DONE);
        a.value = [], de.forEach((F) => k(F.originalFile, F.name));
      } else
        a.value = [];
  };
  return ve(() => {
    M = new Kt({
      debug: n.debug,
      restrictions: { maxFileSize: nn(l.maxFileSize ?? "10mb") },
      locale: n.i18n.t("uppy"),
      onBeforeFileAdded: (F, x) => {
        if (x[F.id] != null) {
          const O = T(F.id);
          a.value[O]?.status === ue.PENDING && (p.value = M.i18n("noDuplicates", { fileName: F.name })), a.value = a.value.filter((W) => W.id !== F.id);
        }
        return a.value.push({
          id: F.id,
          name: F.name,
          size: n.filesize(F.size),
          status: ue.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: F.data
        }), !0;
      }
    }), M.use(jt, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), M.on("restriction-failed", (F, x) => {
      const $ = a.value[T(F.id)];
      $ && L($), p.value = x.message;
    }), M.on("upload", () => {
      const F = n.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", storage: o.path.storage, path: o.path.path }
      });
      M.setMeta({ ...F.body });
      const x = M.getPlugin("XHRUpload");
      x && (x.opts.method = F.method, x.opts.endpoint = F.url + "?" + new URLSearchParams(F.params), x.opts.headers = F.headers), delete F.headers["Content-Type"], g.value = !0, a.value.forEach(($) => {
        $.status !== ue.DONE && ($.percent = null, $.status = ue.UPLOADING, $.statusName = e("Pending upload"));
      });
    }), M.on("upload-progress", (F, x) => {
      const $ = x.bytesTotal ?? 1, O = Math.floor(x.bytesUploaded / $ * 100), W = T(F.id);
      W !== -1 && a.value[W] && (a.value[W].percent = `${O}%`);
    }), M.on("upload-success", (F) => {
      const x = a.value[T(F.id)];
      x && (x.status = ue.DONE, x.statusName = e("Done"));
    }), M.on("upload-error", (F, x) => {
      const $ = a.value[T(F.id)];
      $ && ($.percent = null, $.status = ue.ERROR, $.statusName = x?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : x?.message || e("Unknown Error"));
    }), M.on("error", (F) => {
      p.value = F.message, g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), M.on("complete", () => {
      g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), c.value?.addEventListener("click", () => u.value?.click()), _.value?.addEventListener("click", () => m.value?.click()), d.value?.addEventListener("dragover", (F) => {
      F.preventDefault(), C.value = !0;
    }), d.value?.addEventListener("dragleave", (F) => {
      F.preventDefault(), C.value = !1;
    });
    const K = (F, x) => {
      x.isFile && x.file(($) => F(x, $)), x.isDirectory && x.createReader().readEntries(($) => $.forEach((O) => K(F, O)));
    };
    d.value?.addEventListener("drop", (F) => {
      F.preventDefault(), C.value = !1;
      const x = /^[/\\](.+)/, $ = F.dataTransfer?.items;
      $ && Array.from($).forEach((O) => {
        O.kind === "file" && K((W, Q) => {
          const Z = x.exec(W.fullPath);
          k(Q, Z ? Z[1] : Q.name);
        }, O.webkitGetAsEntry());
      });
    });
    const de = (F) => {
      const x = F.target, $ = x.files;
      if ($) {
        for (const O of $) k(O);
        x.value = "";
      }
    };
    u.value?.addEventListener("change", de), m.value?.addEventListener("change", de);
  }), {
    container: v,
    internalFileInput: u,
    internalFolderInput: m,
    pickFiles: c,
    pickFolders: _,
    dropArea: d,
    queue: a,
    message: p,
    uploading: g,
    hasFilesInDropArea: C,
    definitions: r,
    openFileSelector: N,
    upload: re,
    cancel: B,
    remove: L,
    clear: ae,
    close: X,
    getClassNameForEntry: y,
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
  return i(), f("svg", vr, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const wt = { render: _r }, mr = { class: "vuefinder__upload-modal__content" }, fr = {
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
      pickFiles: u,
      pickFolders: m,
      dropArea: c,
      queue: _,
      message: d,
      uploading: a,
      hasFilesInDropArea: p,
      definitions: g,
      openFileSelector: C,
      upload: M,
      cancel: T,
      remove: k,
      clear: y,
      close: R,
      getClassNameForEntry: N,
      getIconForEntry: X
    } = ur();
    return (re, B) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: t(a),
          onClick: B[4] || (B[4] = we(
            //@ts-ignore
            (...L) => t(M) && t(M)(...L),
            ["prevent"]
          ))
        }, h(t(o)("Upload")), 9, Er),
        t(a) ? (i(), f("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: B[5] || (B[5] = we(
            //@ts-ignore
            (...L) => t(T) && t(T)(...L),
            ["prevent"]
          ))
        }, h(t(o)("Cancel")), 1)) : (i(), f("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: B[6] || (B[6] = we(
            //@ts-ignore
            (...L) => t(R) && t(R)(...L),
            ["prevent"]
          ))
        }, h(t(o)("Close")), 1))
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(wt),
            title: t(o)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", mr, [
            s("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: c,
              onClick: B[0] || (B[0] = //@ts-ignore
              (...L) => t(C) && t(C)(...L))
            }, [
              t(p) ? (i(), f("div", fr, h(t(o)("Release to drop these files.")), 1)) : (i(), f("div", pr, h(t(o)("Drag and drop the files/folders to here or click here.")), 1))
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
                disabled: t(a),
                onClick: B[1] || (B[1] = (L) => t(y)(!1))
              }, h(t(o)("Clear all")), 9, hr),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(a),
                onClick: B[2] || (B[2] = (L) => t(y)(!0))
              }, h(t(o)("Clear only successful")), 9, gr)
            ], 512),
            s("div", wr, [
              (i(!0), f(ne, null, se(t(_), (L) => (i(), f("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: L.id
              }, [
                s("span", {
                  class: J(["vuefinder__upload-modal__file-icon", t(N)(L)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: h(t(X)(L))
                  }, null, 8, br)
                ], 2),
                s("div", yr, [
                  s("div", kr, h(t(We)(L.name, 40)) + " (" + h(L.size) + ") ", 1),
                  s("div", xr, h(t(We)(L.name, 16)) + " (" + h(L.size) + ") ", 1),
                  s("div", {
                    class: J(["vuefinder__upload-modal__file-status", t(N)(L)])
                  }, [
                    U(h(L.statusName) + " ", 1),
                    L.status === t(g).QUEUE_ENTRY_STATUS.UPLOADING ? (i(), f("b", Sr, h(L.percent), 1)) : E("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: J(["vuefinder__upload-modal__file-remove", t(a) ? "disabled" : ""]),
                  title: t(o)("Delete"),
                  disabled: t(a),
                  onClick: (ae) => t(k)(L)
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
              t(_).length ? E("", !0) : (i(), f("div", Cr, h(t(o)("No files selected!")), 1))
            ]),
            t(d).length ? (i(), I(et, {
              key: 0,
              onHidden: B[3] || (B[3] = (L) => d.value = ""),
              error: ""
            }, {
              default: j(() => [
                U(h(t(d)), 1)
              ]),
              _: 1
            })) : E("", !0)
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
const bt = { render: Ar }, Dr = { class: "vuefinder__unarchive-modal__content" }, Ir = { class: "vuefinder__unarchive-modal__items" }, Fr = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Lr = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vr = { class: "vuefinder__unarchive-modal__item-name" }, Rr = { class: "vuefinder__unarchive-modal__info" }, yt = /* @__PURE__ */ G({
  __name: "ModalUnarchive",
  setup(n) {
    const e = Y("ServiceContainer"), o = e.fs, l = z(o.path), { t: r } = e.i18n, v = b(e.modal.data.items[0]), u = b(""), m = b([]), c = () => {
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
    return (_, d) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, h(t(r)("Unarchive")), 1),
        s("button", {
          type: "button",
          onClick: d[1] || (d[1] = (a) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(r)("Cancel")), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(bt),
            title: t(r)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", Dr, [
            s("div", Ir, [
              (i(!0), f(ne, null, se(m.value, (a) => (i(), f("p", {
                class: "vuefinder__unarchive-modal__item",
                key: a.path
              }, [
                a.type === "dir" ? (i(), f("svg", Fr, [...d[2] || (d[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (i(), f("svg", Lr, [...d[3] || (d[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Vr, h(a.basename), 1)
              ]))), 128)),
              s("p", Rr, h(t(r)("The archive will be unarchived at")) + " (" + h(t(o).path.path) + ")", 1),
              u.value.length ? (i(), I(t(u), {
                key: 0,
                onHidden: d[0] || (d[0] = (a) => u.value = ""),
                error: ""
              }, {
                default: j(() => [
                  U(h(u.value), 1)
                ]),
                _: 1
              })) : E("", !0)
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
const kt = { render: Hr }, qr = { class: "vuefinder__archive-modal__content" }, Nr = { class: "vuefinder__archive-modal__form" }, Pr = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Ur = { class: "vuefinder__archive-modal__file" }, Or = {
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
}, Kr = { class: "vuefinder__archive-modal__file-name" }, jr = ["placeholder"], xt = /* @__PURE__ */ G({
  __name: "ModalArchive",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = z(l.path), v = b(""), u = b(""), m = b(e.modal.data.items), c = () => {
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
          u.value = o(_.message);
        }
      });
    };
    return (_, d) => (i(), I(be, null, {
      buttons: j(() => [
        s("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Archive")), 1),
        s("button", {
          type: "button",
          onClick: d[2] || (d[2] = (a) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1)
      ]),
      default: j(() => [
        s("div", null, [
          D(xe, {
            icon: t(kt),
            title: t(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", qr, [
            s("div", Nr, [
              s("div", Pr, [
                (i(!0), f(ne, null, se(m.value, (a) => (i(), f("p", Ur, [
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
                  s("span", Kr, h(a.basename), 1)
                ]))), 256))
              ]),
              le(s("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => v.value = a),
                onKeyup: Le(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(o)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, jr), [
                [Ve, v.value]
              ]),
              u.value.length ? (i(), I(t(u), {
                key: 0,
                onHidden: d[1] || (d[1] = (a) => u.value = ""),
                error: ""
              }, {
                default: j(() => [
                  U(h(u.value), 1)
                ]),
                _: 1
              })) : E("", !0)
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
const tt = { render: Yr }, Wr = {
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
}, dl = ["title"], cl = ["title"], ul = ["title"], vl = ["title"], _l = ["title"], ml = ["title"], fl = ["title"], pl = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, hl = { class: "pl-2" }, gl = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, wl = { class: "vuefinder__toolbar__controls" }, bl = ["title"], yl = ["title"], kl = /* @__PURE__ */ G({
  __name: "Toolbar",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = e.config, v = e.search, u = z(r.state), m = z(v.state), c = z(l.selectedItems);
    ie(() => u.value.fullScreen, () => {
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
    return (d, a) => (i(), f("div", al, [
      t(m).query.length ? (i(), f("div", pl, [
        s("div", hl, [
          U(h(t(o)("Search results for")) + " ", 1),
          s("span", gl, h(t(m).query), 1)
        ]),
        t(r).get("loadingIndicator") === "circular" && t(l).isLoading() ? (i(), I(t(tt), { key: 0 })) : E("", !0)
      ])) : (i(), f("div", il, [
        t(e).features.includes(t(ee).NEW_FOLDER) ? (i(), f("div", {
          key: 0,
          class: "mx-1.5",
          title: t(o)("New Folder"),
          onClick: a[0] || (a[0] = (p) => t(e).modal.open(ht, { items: t(c) }))
        }, [
          D(t(pt))
        ], 8, dl)) : E("", !0),
        t(e).features.includes(t(ee).NEW_FILE) ? (i(), f("div", {
          key: 1,
          class: "mx-1.5",
          title: t(o)("New File"),
          onClick: a[1] || (a[1] = (p) => t(e).modal.open(cr, { items: t(c) }))
        }, [
          D(t(gt))
        ], 8, cl)) : E("", !0),
        t(e).features.includes(t(ee).RENAME) ? (i(), f("div", {
          key: 2,
          class: "mx-1.5",
          title: t(o)("Rename"),
          onClick: a[2] || (a[2] = (p) => t(c).length !== 1 || t(e).modal.open(Ze, { items: t(c) }))
        }, [
          D(t(vt), {
            class: J(t(c).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ul)) : E("", !0),
        t(e).features.includes(t(ee).DELETE) ? (i(), f("div", {
          key: 3,
          class: "mx-1.5",
          title: t(o)("Delete"),
          onClick: a[3] || (a[3] = (p) => !t(c).length || t(e).modal.open(Je, { items: t(c) }))
        }, [
          D(t(ut), {
            class: J(t(c).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, vl)) : E("", !0),
        t(e).features.includes(t(ee).UPLOAD) ? (i(), f("div", {
          key: 4,
          class: "mx-1.5",
          title: t(o)("Upload"),
          onClick: a[4] || (a[4] = (p) => t(e).modal.open(Mr, { items: t(c) }))
        }, [
          D(t(wt))
        ], 8, _l)) : E("", !0),
        t(e).features.includes(t(ee).UNARCHIVE) && t(c).length === 1 && t(c)[0].mime_type === "application/zip" ? (i(), f("div", {
          key: 5,
          class: "mx-1.5",
          title: t(o)("Unarchive"),
          onClick: a[5] || (a[5] = (p) => !t(c).length || t(e).modal.open(yt, { items: t(c) }))
        }, [
          D(t(bt), {
            class: J(t(c).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ml)) : E("", !0),
        t(e).features.includes(t(ee).ARCHIVE) ? (i(), f("div", {
          key: 6,
          class: "mx-1.5",
          title: t(o)("Archive"),
          onClick: a[6] || (a[6] = (p) => !t(c).length || t(e).modal.open(xt, { items: t(c) }))
        }, [
          D(t(kt), {
            class: J(t(c).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, fl)) : E("", !0)
      ])),
      s("div", wl, [
        t(e).features.includes(t(ee).FULL_SCREEN) ? (i(), f("div", {
          key: 0,
          onClick: a[7] || (a[7] = (p) => t(r).toggle("fullScreen")),
          class: "mx-1.5",
          title: t(o)("Toggle Full Screen")
        }, [
          t(u).fullScreen ? (i(), I(t(el), { key: 0 })) : (i(), I(t(Xr), { key: 1 }))
        ], 8, bl)) : E("", !0),
        s("div", {
          class: "mx-1.5",
          title: t(o)("Change View"),
          onClick: a[8] || (a[8] = (p) => t(m).query.length || _())
        }, [
          t(u).view === "grid" ? (i(), I(t(ol), {
            key: 0,
            class: J(["vf-toolbar-icon", t(m).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : E("", !0),
          t(u).view === "list" ? (i(), I(t(ll), {
            key: 1,
            class: J(["vf-toolbar-icon", t(m).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : E("", !0)
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
}, st = (n, e, o) => {
  const l = b(n);
  return It((r, v) => ({
    get() {
      return r(), l.value;
    },
    set: xl((u) => {
      l.value = u, v();
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
function Ll(n, e) {
  return i(), f("svg", Fl, [...e[0] || (e[0] = [
    s("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Vl = { render: Ll }, Rl = {
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
  const o = "vfDragEnterCounter", l = n.fs, r = z(l.selectedItems);
  function v(d, a) {
    d.preventDefault(), l.getDraggedItem() === a.path || !a || a.type !== "dir" || r.value.some((g) => g.path === a.path || Ql(g.path) === a.path) ? d.dataTransfer && (d.dataTransfer.dropEffect = "none", d.dataTransfer.effectAllowed = "none") : (d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.dataTransfer.effectAllowed = "all"), d.currentTarget.classList.add(...e));
  }
  function u(d) {
    d.preventDefault();
    const a = d.currentTarget, p = Number(a.dataset[o] || 0);
    a.dataset[o] = String(p + 1);
  }
  function m(d) {
    d.preventDefault();
    const a = d.currentTarget, g = Number(a.dataset[o] || 0) - 1;
    g <= 0 ? (delete a.dataset[o], a.classList.remove(...e)) : a.dataset[o] = String(g);
  }
  function c(d, a) {
    if (!a) return;
    d.preventDefault();
    const p = d.currentTarget;
    delete p.dataset[o], p.classList.remove(...e);
    const g = d.dataTransfer?.getData("items") || "[]", M = JSON.parse(g).map((T) => l.sortedFiles.get().find((k) => k.path === T));
    l.clearDraggedItem(), n.modal.open(ft, { items: { from: M, to: a } });
  }
  function _(d) {
    return {
      dragover: (a) => v(a, d),
      dragenter: u,
      dragleave: m,
      drop: (a) => c(a, d)
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
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.search, r = e.fs, v = e.config, u = z(v.state), m = z(l.state), c = z(r.path), _ = z(r.loading), d = oe(() => m.value?.searchMode ?? !1), a = b(null), p = st(0, 100), g = b(5), C = b(!1), M = oe(() => c.value?.breadcrumb ?? []);
    function T(V, H) {
      return V.length > H ? [V.slice(-H), V.slice(0, -H)] : [V, []];
    }
    const k = oe(() => T(M.value, g.value)[0]), y = oe(() => T(M.value, g.value)[1]);
    ie(p, () => {
      if (!a.value) return;
      const V = a.value.children;
      let H = 0, w = 0;
      const S = 5, te = 1;
      g.value = S, Be(() => {
        for (let ce = V.length - 1; ce >= 0; ce--) {
          const Se = V[ce];
          if (H + Se.offsetWidth > p.value - 40)
            break;
          H += parseInt(Se.offsetWidth.toString(), 10), w++;
        }
        w < te && (w = te), w > S && (w = S), g.value = w;
      });
    });
    const R = () => {
      a.value && (p.value = a.value.offsetWidth);
    }, N = b(null);
    ve(() => {
      N.value = new ResizeObserver(R), a.value && N.value.observe(a.value);
    }), He(() => {
      N.value && N.value.disconnect();
    });
    const X = qe(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function re(V = null) {
      V ??= M.value.length - 2;
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
      return M.value[V] ?? H;
    }
    const B = () => {
      W(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: c.value?.storage, path: c.value?.path } });
    }, L = () => {
      l.exitSearchMode(), k.value.length > 0 && !d.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: c.value?.storage ?? "local",
          path: M.value[M.value.length - 2]?.path ?? (c.value?.storage ?? "local") + "://"
        }
      });
    }, ae = (V) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: c.value?.storage, path: V.path } }), C.value = !1;
    }, K = () => {
      C.value && (C.value = !1);
    }, de = {
      mounted(V, H) {
        V.clickOutsideEvent = function(w) {
          V === w.target || V.contains(w.target) || H.value();
        }, document.body.addEventListener("click", V.clickOutsideEvent);
      },
      beforeUnmount(V) {
        document.body.removeEventListener("click", V.clickOutsideEvent);
      }
    }, F = () => {
      v.toggle("showTreeView");
    }, x = b(null), $ = st("", 400);
    ie($, (V) => {
      e.emitter.emit("vf-toast-clear"), l.setQuery(V);
    }), ie(d, (V) => {
      V && Be(() => {
        x.value && x.value.focus();
      });
    }), e.emitter.on("vf-search-exit", () => {
      l.exitSearchMode();
    });
    const O = () => {
      $.value === "" && l.exitSearchMode();
    }, W = () => {
      $.value = "", l.exitSearchMode();
    }, Q = b({
      x: 0,
      y: 0
    }), Z = (V) => {
      if (V.currentTarget instanceof HTMLElement) {
        const { x: H, y: w, height: S } = V.currentTarget.getBoundingClientRect();
        Q.value = { x: H, y: w + S };
      }
      C.value = !C.value;
    };
    return (V, H) => (i(), f("div", Jl, [
      s("span", {
        title: t(o)("Toggle Tree View")
      }, [
        D(t(jl), {
          onClick: F,
          class: J(["vuefinder__breadcrumb__toggle-tree", t(u).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Zl),
      s("span", {
        title: t(o)("Go up a directory")
      }, [
        D(t(Tl), ke(Ee(M.value.length && !d.value ? t(X).events(re()) : {}), {
          onClick: L,
          class: M.value.length && !d.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
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
      le(s("div", {
        class: "group vuefinder__breadcrumb__search-container",
        onClick: H[3] || (H[3] = //@ts-ignore
        (...w) => t(l).enterSearchMode && t(l).enterSearchMode(...w))
      }, [
        s("div", null, [
          D(t(Vl), ke(Ee(t(X).events(re(-1))), {
            onClick: H[1] || (H[1] = we((w) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(c).value?.storage ?? "local" } }), ["stop"]))
          }), null, 16)
        ]),
        s("div", oa, [
          y.value.length ? le((i(), f("div", sa, [
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
            [de, K]
          ]) : E("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: a,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (i(!0), f(ne, null, se(k.value, (w, S) => (i(), f("div", { key: S }, [
            H[6] || (H[6] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", ke(Ee(t(X).events(w), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: w.basename,
              onClick: we((te) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(c)?.storage, path: w.path } }), ["stop"])
            }), h(w.name), 17, la)
          ]))), 128))
        ], 512),
        t(v).get("loadingIndicator") === "circular" && t(_) ? (i(), I(t(tt), { key: 0 })) : E("", !0)
      ], 512), [
        [ge, !d.value]
      ]),
      le(s("div", aa, [
        s("div", null, [
          D(t(Hl))
        ]),
        le(s("input", {
          ref_key: "searchInput",
          ref: x,
          onKeydown: Le(W, ["esc"]),
          onBlur: O,
          "onUpdate:modelValue": H[4] || (H[4] = (w) => Ft($) ? $.value = w : null),
          placeholder: t(o)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, ia), [
          [Ve, t($)]
        ]),
        D(t(Pl), { onClick: W })
      ], 512), [
        [ge, d.value]
      ]),
      (i(), I(Lt, { to: "body" }, [
        le(s("div", {
          style: Me({ position: "absolute", top: Q.value.y + "px", left: Q.value.x + "px" }),
          class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
        }, [
          (i(!0), f(ne, null, se(y.value, (w, S) => (i(), f("div", ke({ key: S }, Ee(t(X).events(w), !0), {
            onClick: (te) => ae(w),
            class: "vuefinder__breadcrumb__hidden-item"
          }), [
            s("div", ca, [
              s("span", null, [
                D(t(Oe), { class: "vuefinder__breadcrumb__hidden-item-icon" })
              ]),
              H[7] || (H[7] = U()),
              s("span", ua, h(w.name), 1)
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
    containerPadding: u = 48
  } = e, m = n && typeof n.get == "function" ? z(n) : n, c = () => typeof r == "number" ? r : r.value, _ = b(0), d = b(6), a = b(600);
  let p = null;
  const g = oe(() => Math.ceil(m.value.length / d.value)), C = oe(() => g.value * c()), M = oe(() => {
    const B = c(), L = Math.max(0, Math.floor(_.value / B) - v), ae = Math.min(g.value, Math.ceil((_.value + a.value) / B) + v);
    return { start: L, end: ae };
  }), T = oe(() => {
    const { start: B, end: L } = M.value;
    return Array.from({ length: L - B }, (ae, K) => B + K);
  }), k = () => a.value, y = () => {
    if (o.value) {
      const B = o.value.clientWidth - u;
      d.value = Math.max(Math.floor(B / l), 2);
    }
  }, R = (B) => {
    const L = B.target;
    _.value = L.scrollTop;
  };
  ie(() => m.value.length, () => {
    y();
  });
  const N = (B, L) => {
    const ae = L * d.value;
    return B.slice(ae, ae + d.value);
  }, X = (B, L, ae, K, de) => {
    const F = [];
    for (let x = L; x <= ae; x++)
      for (let $ = K; $ <= de; $++) {
        const O = x * d.value + $;
        O < B.length && B[O] && F.push(B[O]);
      }
    return F;
  }, re = (B) => ({
    row: Math.floor(B / d.value),
    col: B % d.value
  });
  return ve(async () => {
    await Be(), o.value && (a.value = o.value.clientHeight || 600), y(), window.addEventListener("resize", () => {
      o.value && (a.value = o.value.clientHeight || 600), y();
    }), o.value && "ResizeObserver" in window && (p = new ResizeObserver((B) => {
      const L = B[0];
      L && (a.value = Math.round(L.contentRect.height)), y();
    }), p.observe(o.value));
  }), He(() => {
    window.removeEventListener("resize", y), p && (p.disconnect(), p = null);
  }), {
    scrollTop: _,
    itemsPerRow: d,
    totalRows: g,
    totalHeight: C,
    visibleRange: M,
    visibleRows: T,
    updateItemsPerRow: y,
    handleScroll: R,
    getRowItems: N,
    getItemsInRange: X,
    getItemPosition: re,
    getContainerHeight: k
  };
}
function ma(n) {
  const { getItemPosition: e, getItemsInRange: o, getKey: l, selectionObject: r, rowHeight: v, itemWidth: u } = n, m = Math.floor(Math.random() * 2 ** 32).toString(), _ = Y("ServiceContainer").fs, d = z(_.selectedKeys), a = z(_.sortedFiles);
  z(_.selectedCount);
  const p = b(/* @__PURE__ */ new Set()), g = b(!1), C = b(!1), M = b(null), T = (x) => x.map(($) => $.getAttribute("data-key")).filter(($) => !!$), k = (x) => {
    x.selection.getSelection().forEach(($) => {
      x.selection.deselect($, !0);
    });
  }, y = (x) => {
    d.value && d.value.forEach(($) => {
      const O = document.querySelector(`[data-key="${$}"]`);
      O && x.selection.select(O, !0);
    });
  }, R = (x) => {
    if (x.size === 0) return null;
    const O = Array.from(x).map((H) => {
      const w = a.value?.findIndex((S) => l(S) === H) ?? -1;
      return e(w >= 0 ? w : 0);
    }), W = Math.min(...O.map((H) => H.row)), Q = Math.max(...O.map((H) => H.row)), Z = Math.min(...O.map((H) => H.col)), V = Math.max(...O.map((H) => H.col));
    return { minRow: W, maxRow: Q, minCol: Z, maxCol: V };
  }, N = (x) => {
    g.value = !1, !x.event?.metaKey && !x.event?.ctrlKey && (C.value = !0), x.selection.resolveSelectables(), k(x), y(x);
  }, X = ({ event: x, selection: $ }) => {
    const O = x;
    O && "type" in O && O.type === "touchend" && O.preventDefault();
    const W = x;
    if (!W?.ctrlKey && !W?.metaKey && (_.clearSelection(), $.clearSelection(!0, !0)), p.value.clear(), W && r.value) {
      const Q = r.value.getSelectables()[0]?.closest(".scroller-" + m);
      if (Q) {
        const Z = Q.getBoundingClientRect(), V = W.clientY - Z.top + Q.scrollTop, H = W.clientX - Z.left, w = Math.floor(V / v.value), S = Math.floor(H / u);
        M.value = { row: w, col: S };
      }
    }
  }, re = (x) => {
    const $ = x.selection, O = T(x.store.changed.added), W = T(x.store.changed.removed);
    C.value = !1, g.value = !0, O.forEach((Q) => {
      d.value && !d.value.has(Q) && p.value.add(Q), _.select(Q);
    }), W.forEach((Q) => {
      document.querySelector(`[data-key="${Q}"]`) && a.value?.find((V) => l(V) === Q) && p.value.delete(Q), _.deselect(Q);
    }), $.resolveSelectables(), y(x);
  }, B = () => {
    p.value.clear();
  }, L = (x) => {
    if (x.event && M.value && p.value.size > 0) {
      const O = Array.from(p.value).map((W) => {
        const Q = a.value?.findIndex((Z) => l(Z) === W) ?? -1;
        return Q >= 0 ? e(Q) : null;
      }).filter((W) => W !== null);
      if (O.length > 0) {
        const W = [...O, M.value], Q = {
          minRow: Math.min(...W.map((Z) => Z.row)),
          maxRow: Math.max(...W.map((Z) => Z.row)),
          minCol: Math.min(...W.map((Z) => Z.col)),
          maxCol: Math.max(...W.map((Z) => Z.col))
        };
        o(a.value || [], Q.minRow, Q.maxRow, Q.minCol, Q.maxCol).forEach(
          (Z) => {
            const V = l(Z);
            document.querySelector(`[data-key="${V}"]`) || _.select(V);
          }
        );
      }
    }
  }, ae = (x) => {
    L(x), k(x), y(x), _.setSelectedCount(d.value?.size || 0), g.value = !1, M.value = null;
  }, K = () => {
    r.value = new Gt({
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
    }), r.value.on("beforestart", N), r.value.on("start", X), r.value.on("move", re), r.value.on("stop", ae);
  }, de = () => {
    r.value && (r.value.destroy(), r.value = null);
  }, F = (x) => {
    C.value && (r.value?.clearSelection(), B(), C.value = !1);
    const $ = x;
    !p.value.size && !C.value && !$?.ctrlKey && !$?.metaKey && (_.clearSelection(), r.value?.clearSelection());
  };
  return ve(() => {
    const x = ($) => {
      !$.buttons && g.value && (g.value = !1);
    };
    document.addEventListener("dragleave", x), He(() => {
      document.removeEventListener("dragleave", x);
    });
  }), {
    isDragging: g,
    selectionStarted: C,
    explorerId: m,
    extractIds: T,
    cleanupSelection: k,
    refreshSelection: y,
    getSelectionRange: R,
    selectSelectionRange: L,
    initializeSelectionArea: K,
    destroySelectionArea: de,
    handleContentClick: F
  };
}
const fa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function pa(n, e) {
  return i(), f("svg", fa, [...e[0] || (e[0] = [
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
      n.direction === "asc" ? (i(), I(t(ha), { key: 0 })) : E("", !0),
      n.direction === "desc" ? (i(), I(t(ba), { key: 1 })) : E("", !0)
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
}, rt = /* @__PURE__ */ G({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(n) {
    const e = n, o = Y("ServiceContainer"), l = o.customIcon?.(o, e.item);
    return (r, v) => (i(), f("div", {
      class: J(["vuefinder__item-icon", n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      t(l) ? (i(), I(Qe(t(l).is), Vt(ke({ key: 0 }, t(l).props || {})), null, 16)) : n.item.type === "dir" ? (i(), I(t(Oe), { key: 1 })) : (i(), I(t(Ta), { key: 2 })),
      !t(l) && n.ext && n.item.type !== "dir" && n.item.extension ? (i(), f("div", Aa, h(n.item.extension.substring(0, 3)), 1)) : E("", !0)
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
const St = { render: Ia }, Fa = ["data-key", "data-row", "data-col", "draggable"], La = { key: 0 }, Va = { class: "vuefinder__explorer__item-grid-content" }, Ra = ["data-src", "alt"], Ba = { class: "vuefinder__explorer__item-title" }, Ha = {
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
    const o = n, l = e, r = Y("ServiceContainer"), v = r.fs, u = r.config, m = oe(() => [
      "file-item-" + o.explorerId,
      o.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      o.isSelected ? "vf-explorer-selected" : ""
    ]), c = b(!1);
    ie(() => v.clipboardItems.get(), (T) => {
      c.value = T.type === "cut" && Array.from(T.items).some((k) => k.path === o.item.path);
    }, { immediate: !0 });
    const _ = oe(() => ({
      opacity: o.isDragging || c.value ? 0.5 : ""
    }));
    let d = null;
    const a = b(null);
    let p = !1;
    const g = () => {
      d && clearTimeout(d), C.value = !0;
    }, C = b(!0), M = (T) => {
      if (C.value = !1, d && (T.preventDefault(), clearTimeout(d)), !p)
        p = !0, l("click", T), a.value = setTimeout(() => p = !1, 300);
      else
        return p = !1, l("dblclick", T), clearTimeout(d), !1;
      if (T.currentTarget && T.currentTarget instanceof HTMLElement) {
        const k = T.currentTarget.getBoundingClientRect();
        T.preventDefault(), d = setTimeout(() => {
          let N = k.y + k.height;
          N + 146 > window.innerHeight - 10 && (N = k.y - 146), N < 10 && (N = 10);
          const X = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: k.x,
            clientY: N
          });
          T.target?.dispatchEvent(X);
        }, 300);
      }
    };
    return (T, k) => (i(), f("div", {
      class: J(m.value),
      style: Me(_.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: C.value,
      onTouchstart: k[1] || (k[1] = (y) => M(y)),
      onTouchend: k[2] || (k[2] = (y) => g()),
      onClick: k[3] || (k[3] = (y) => l("click", y)),
      onDblclick: k[4] || (k[4] = (y) => l("dblclick", y)),
      onContextmenu: k[5] || (k[5] = we((y) => l("contextmenu", y), ["prevent", "stop"])),
      onDragstart: k[6] || (k[6] = (y) => l("dragstart", y)),
      onDragend: k[7] || (k[7] = (y) => l("dragend", y))
    }, [
      n.view === "grid" ? (i(), f("div", La, [
        s("div", Va, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (i(), f("img", {
            key: 0,
            onTouchstart: k[0] || (k[0] = (y) => y.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": t(r).requester.getPreviewUrl(n.item.storage, n.item),
            alt: n.item.basename
          }, null, 40, Ra)) : (i(), I(rt, {
            key: 1,
            item: n.item,
            ext: !0
          }, null, 8, ["item"]))
        ]),
        s("span", Ba, h(t(We)(n.item.basename)), 1)
      ])) : (i(), f("div", Ha, [
        s("div", qa, [
          s("div", Na, [
            D(rt, {
              item: n.item,
              small: n.compact
            }, null, 8, ["item", "small"])
          ]),
          s("span", Pa, h(n.item.basename), 1)
        ]),
        n.showPath ? (i(), f("div", Ua, h(n.item.path), 1)) : E("", !0),
        n.showPath ? E("", !0) : (i(), f("div", Oa, [
          n.item.file_size ? (i(), f("div", za, h(t(r).filesize(n.item.file_size)), 1)) : E("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (i(), f("div", Ka, h(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : E("", !0)
      ])),
      t(u).get("pinnedFolders").find((y) => y.path === n.item.path) ? (i(), I(t(St), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : E("", !0)
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
    const o = n, l = e, r = oe(() => [
      o.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), v = oe(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${o.rowHeight}px`,
      transform: `translateY(${o.rowIndex * o.rowHeight}px)`
    })), u = oe(() => o.view === "grid" ? {
      gridTemplateColumns: `repeat(${o.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (m, c) => (i(), f("div", {
      class: J(r.value),
      "data-row": n.rowIndex,
      style: Me(v.value)
    }, [
      s("div", {
        class: J(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Me(u.value)
      }, [
        (i(!0), f(ne, null, se(n.items, (_, d) => (i(), I(ja, ke({
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
    ], 14, Ga));
  }
}), Ya = ["onClick"], Wa = /* @__PURE__ */ G({
  __name: "Toast",
  setup(n) {
    const e = Y("ServiceContainer"), { getStore: o } = e.storage, l = b(o("full-screen", !1)), r = b([]), v = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", u = (c) => {
      r.value.splice(c, 1);
    }, m = (c) => {
      let _ = r.value.findIndex((d) => d.id === c);
      _ !== -1 && u(_);
    };
    return e.emitter.on("vf-toast-clear", () => {
      r.value = [];
    }), e.emitter.on("vf-toast-push", (c) => {
      let _ = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      c.id = _, r.value.push(c), setTimeout(() => {
        m(_);
      }, 5e3);
    }), (c, _) => (i(), f("div", {
      class: J(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      D(Rt, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: j(() => [
          (i(!0), f(ne, null, se(r.value, (d, a) => (i(), f("div", {
            key: a,
            onClick: (p) => u(a),
            class: J(["vuefinder__toast__message", v(d.type)])
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
}, ei = {
  key: 1,
  class: "vuefinder__circular-loader"
}, ti = /* @__PURE__ */ G({
  __name: "Explorer",
  setup(n) {
    const e = Y("ServiceContainer"), o = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), l = Ie("dragImage"), r = lt(null), v = Ie("scrollContainer"), u = Ie("scrollContent"), m = e.search, c = e.fs, _ = e.config, d = z(_.state), a = z(m.state), p = z(c.sortedFiles), g = z(c.selectedKeys), C = z(c.loading), M = (A) => g.value?.has(A) ?? !1;
    let T = null;
    const k = b(null), y = Ie("customScrollBar"), R = Ie("customScrollBarContainer"), N = oe(() => {
      const A = d.value.view, q = d.value.compactListView;
      return A === "grid" && !(a.value.searchMode && a.value.query.length) ? 88 : q ? 24 : 50;
    }), { t: X } = e.i18n, {
      itemsPerRow: re,
      totalHeight: B,
      visibleRows: L,
      handleScroll: ae,
      getRowItems: K,
      getItemsInRange: de,
      getItemPosition: F,
      updateItemsPerRow: x
    } = _a(
      oe(() => p.value ?? []),
      {
        scrollContainer: v,
        itemWidth: 104,
        rowHeight: N,
        overscan: 2,
        containerPadding: 0
      }
    ), {
      explorerId: $,
      isDragging: O,
      initializeSelectionArea: W,
      destroySelectionArea: Q,
      handleContentClick: Z
    } = ma({
      getItemPosition: F,
      getItemsInRange: de,
      getKey: (A) => A.path,
      selectionObject: r,
      rowHeight: N,
      itemWidth: 104
    }), V = b(null), H = (A) => {
      if (!A || !V.value) return !1;
      const q = g.value?.has(V.value) ?? !1;
      return O.value && (q ? g.value?.has(A) ?? !1 : A === V.value);
    };
    ie(() => _.get("view"), (A) => {
      A === "list" ? re.value = 1 : x();
    }, { immediate: !0 }), ie(re, (A) => {
      _.get("view") === "list" && A !== 1 && (re.value = 1);
    });
    const w = (A) => p.value?.[A];
    ve(() => {
      if (W(), r.value && r.value.on("beforestart", ({ event: A }) => {
        const q = A?.target === u.value;
        if (!A?.metaKey && !A?.ctrlKey && !A?.altKey && !q)
          return !1;
      }), v.value && (T = new Yt({
        elements_selector: ".lazy",
        container: v.value
      })), ie(() => a.value.query, (A) => {
        const q = c.path.get().storage, P = c.path.get().path;
        !q || !P || (A ? e.emitter.emit("vf-fetch", {
          params: {
            q: "search",
            storage: q,
            path: P,
            filter: A
          },
          onSuccess: (me) => {
            me.files.length || e.emitter.emit("vf-toast-push", { label: X("No search result found.") });
          }
        }) : e.emitter.emit("vf-fetch", { params: { q: "index", storage: q, path: P } }));
      }), R.value) {
        const A = Xe(R.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (q) => {
            k.value = q;
          },
          scroll: (q) => {
            const { scrollOffsetElement: P } = q.elements();
            v.value && v.value.scrollTo({ top: P.scrollTop, left: 0 });
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
      if (T && T.update(), k.value && y.value && v.value) {
        const q = v.value.scrollHeight > v.value.clientHeight, P = y.value;
        P.style.display = q ? "block" : "none", P.style.height = `${B.value}px`;
      }
    }), He(() => {
      Q(), T && (T.destroy(), T = null), k.value && (k.value.destroy(), k.value = null);
    });
    const S = (A) => {
      const q = A.target?.closest(".file-item-" + $), P = A;
      if (!P?.ctrlKey && !P?.metaKey && (c.clearSelection(), r.value?.clearSelection(!0, !0)), q) {
        const me = String(q.getAttribute("data-key"));
        r.value?.resolveSelectables(), c.toggleSelect(me);
      }
      c.setSelectedCount(g.value?.size || 0);
    }, te = (A) => {
      const q = e.contextMenuItems.find((P) => P.show(e, {
        searchQuery: "",
        items: [A],
        target: A
      }));
      q && q.action(e, [A]);
    }, ce = (A) => {
      const q = A.target?.closest(".file-item-" + $), P = q ? String(q.getAttribute("data-key")) : null;
      if (!P) return;
      const me = p.value?.find((ze) => ze.path === P);
      me && te(me);
    }, Se = () => {
      const A = g.value;
      return p.value?.filter((q) => A?.has(q.path)) || [];
    }, Te = (A) => {
      A.preventDefault();
      const q = A.target?.closest(".file-item-" + $);
      if (q) {
        const P = String(q.getAttribute("data-key")), me = p.value?.find((ze) => ze.path === P);
        g.value?.has(P) || (c.clearSelection(), c.select(P)), e.emitter.emit("vf-contextmenu-show", { event: A, items: Se(), target: me });
      }
    }, ye = (A) => {
      A.preventDefault(), e.emitter.emit("vf-contextmenu-show", { event: A, items: Se() });
    }, Ae = (A) => {
      if (A.altKey || A.ctrlKey || A.metaKey)
        return A.preventDefault(), !1;
      O.value = !0;
      const q = A.target?.closest(".file-item-" + $);
      if (V.value = q ? String(q.dataset.key) : null, A.dataTransfer && V.value) {
        A.dataTransfer.setDragImage(l.value, 0, 15), A.dataTransfer.effectAllowed = "all", A.dataTransfer.dropEffect = "copy";
        const P = g.value?.has(V.value) ? Array.from(g.value) : [V.value];
        A.dataTransfer.setData("items", JSON.stringify(P)), c.setDraggedItem(V.value);
      }
    }, $e = () => {
      V.value = null;
    };
    return (A, q) => (i(), f("div", Qa, [
      s("div", {
        ref: "customScrollBarContainer",
        class: J(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(d).view === "grid" }, { "search-active": t(a).hasQuery }]])
      }, [
        s("div", Xa, null, 512)
      ], 2),
      t(d).view === "list" || t(a).query.length ? (i(), f("div", Ja, [
        s("div", {
          onClick: q[0] || (q[0] = (P) => t(c).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          U(h(t(X)("Name")) + " ", 1),
          le(D(Ne, {
            direction: t(c).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(c).sort.active && t(c).sort.column === "basename"]
          ])
        ]),
        t(a).query.length ? E("", !0) : (i(), f("div", {
          key: 0,
          onClick: q[1] || (q[1] = (P) => t(c).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          U(h(t(X)("Size")) + " ", 1),
          le(D(Ne, {
            direction: t(c).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(c).sort.active && t(c).sort.column === "file_size"]
          ])
        ])),
        t(a).query.length ? (i(), f("div", {
          key: 1,
          onClick: q[2] || (q[2] = (P) => t(c).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          U(h(t(X)("Filepath")) + " ", 1),
          le(D(Ne, {
            direction: t(c).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(c).sort.active && t(c).sort.column === "path"]
          ])
        ])) : E("", !0),
        t(a).query.length ? E("", !0) : (i(), f("div", {
          key: 2,
          onClick: q[3] || (q[3] = (P) => t(c).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          U(h(t(X)("Date")) + " ", 1),
          le(D(Ne, {
            direction: t(c).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(c).sort.active && t(c).sort.column === "last_modified"]
          ])
        ]))
      ])) : E("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: v,
        class: J(["vuefinder__explorer__selector-area", "scroller-" + t($)]),
        onScroll: q[5] || (q[5] = //@ts-ignore
        (...P) => t(ae) && t(ae)(...P))
      }, [
        t(_).get("loadingIndicator") === "linear" && t(C) ? (i(), f("div", Za)) : E("", !0),
        t(_).get("loadingIndicator") === "circular" && t(C) ? (i(), f("div", ei)) : E("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: u,
          class: "scrollContent min-h-full",
          style: Me({ height: `${t(B)}px`, position: "relative", width: "100%" }),
          onContextmenu: we(ye, ["self", "prevent"]),
          onClick: q[4] || (q[4] = we(
            //@ts-ignore
            (...P) => t(Z) && t(Z)(...P),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: l,
            class: "vuefinder__explorer__drag-item"
          }, [
            D(Ca, {
              count: V.value && t(g)?.has(V.value) ? t(g)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          t(a).query.length ? (i(!0), f(ne, { key: 0 }, se(t(L), (P) => (i(), I(Ge, {
            key: P,
            "row-index": P,
            "row-height": N.value,
            view: "list",
            items: w(P) ? [w(P)] : [],
            compact: t(d).compactListView,
            "show-path": !0,
            "is-dragging-item": H,
            "is-selected": M,
            "drag-n-drop-events": (me) => t(o).events(me),
            explorerId: t($),
            onClick: S,
            onDblclick: ce,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(d).view === "grid" ? (i(!0), f(ne, { key: 1 }, se(t(L), (P) => (i(), I(Ge, {
            key: P,
            "row-index": P,
            "row-height": N.value,
            view: "grid",
            "items-per-row": t(re),
            items: t(K)(t(p), P),
            "show-thumbnails": t(d).showThumbnails,
            "is-dragging-item": H,
            "is-selected": M,
            "drag-n-drop-events": (me) => t(o).events(me),
            explorerId: t($),
            onClick: S,
            onDblclick: ce,
            onContextmenu: Te,
            onDragstart: Ae,
            onDragend: $e
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (i(!0), f(ne, { key: 2 }, se(t(L), (P) => (i(), I(Ge, {
            key: P,
            "row-index": P,
            "row-height": N.value,
            view: "list",
            items: w(P) ? [w(P)] : [],
            compact: t(d).compactListView,
            "is-dragging-item": H,
            "is-selected": M,
            "drag-n-drop-events": (me) => t(o).events(me),
            explorerId: t($),
            onClick: S,
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
    const e = Y("ServiceContainer"), o = e.search, l = z(o.state), r = b(null), v = b([]), u = Ue({
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
    const m = (d) => d.link(e, v.value), c = (d) => {
      e.emitter.emit("vf-contextmenu-hide"), d.action(e, v.value);
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
      let C = d.clientX - p.left, M = d.clientY - p.top;
      u.active = !0, Be(() => {
        const T = r.value?.getBoundingClientRect();
        let k = T?.height ?? 0, y = T?.width ?? 0;
        C = g.right - d.pageX + window.scrollX < y ? C - y : C, M = g.bottom - d.pageY + window.scrollY < k ? M - k : M, u.positions = {
          left: String(C) + "px",
          top: String(M) + "px"
        };
      });
    };
    return (d, a) => le((i(), f("ul", {
      ref_key: "contextmenu",
      ref: r,
      class: J([u.active ? "vuefinder__context-menu--active" : "vuefinder__context-menu--inactive", "vuefinder__context-menu"]),
      style: Me(u.positions)
    }, [
      (i(!0), f(ne, null, se(u.items, (p) => (i(), f("li", {
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
          s("span", null, h(p.title(t(e).i18n)), 1)
        ], 8, ni)) : (i(), f("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => c(p)
        }, [
          s("span", null, h(p.title(t(e).i18n)), 1)
        ], 8, oi))
      ]))), 128))
    ], 6)), [
      [ge, u.active]
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
const $t = { render: li }, ai = {
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
const di = { render: ii }, ci = { class: "vuefinder__status-bar__wrapper" }, ui = { class: "vuefinder__status-bar__storage" }, vi = ["title"], _i = { class: "vuefinder__status-bar__storage-icon" }, mi = ["value"], fi = ["value"], pi = { class: "vuefinder__status-bar__info" }, hi = { key: 0 }, gi = { class: "vuefinder__status-bar__selected-count" }, wi = { class: "vuefinder__status-bar__actions" }, bi = ["disabled"], yi = ["title"], ki = /* @__PURE__ */ G({
  __name: "Statusbar",
  setup(n) {
    const e = Y("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = e.search, v = z(r.state), u = z(l.sortedFiles), m = z(l.path), c = z(l.selectedCount), _ = z(l.storages), d = (p) => {
      const g = p.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: g } });
    }, a = oe(() => {
      const p = e.selectButton.multiple ? c.value > 0 : c.value === 1;
      return e.selectButton.active && p;
    });
    return (p, g) => (i(), f("div", ci, [
      s("div", ui, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: t(o)("Storage")
        }, [
          s("div", _i, [
            D(t($t))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: t(m)?.storage,
            onChange: d,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (i(!0), f(ne, null, se(t(_), (C) => (i(), f("option", {
              value: C,
              key: C
            }, h(C), 9, fi))), 128))
          ], 40, mi)
        ], 8, vi),
        s("div", pi, [
          t(v).hasQuery ? (i(), f("span", hi, h(t(u).value.length) + " items found. ", 1)) : E("", !0),
          s("span", gi, h(t(c) > 0 ? `${t(c)} item(s) selected.` : ""), 1)
        ])
      ]),
      s("div", wi, [
        t(e).selectButton.active ? (i(), f("button", {
          key: 0,
          class: J(["vf-btn vf-btn-primary vf-btn-small", { disabled: !a.value }]),
          disabled: !a.value,
          onClick: g[0] || (g[0] = (C) => t(e).selectButton.click(t(l).selectedItems, C))
        }, h(t(o)("Select")), 11, bi)) : E("", !0),
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
const Ct = { render: Si }, $i = {
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
const Et = { render: Ti }, Ai = {
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
const Mt = { render: Di };
function Tt(n, e) {
  const o = n.findIndex((l) => l.path === e.path);
  o > -1 ? n[o] = e : n.push(e);
}
const Ii = { class: "vuefinder__folder-loader-indicator" }, Fi = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, At = /* @__PURE__ */ G({
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
    const e = n, o = Y("ServiceContainer"), { t: l } = o.i18n, r = at(n, "modelValue"), v = b(!1);
    ie(
      () => r.value,
      () => u()?.folders.length || m()
    );
    function u() {
      return o.treeViewData.find((c) => c.path === e.path);
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
      }).then((c) => {
        Tt(o.treeViewData, { path: e.path, type: "dir", ...c });
      }).catch((c) => {
      }).finally(() => {
        v.value = !1;
      });
    };
    return (c, _) => (i(), f("div", Ii, [
      v.value ? (i(), I(t(tt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (i(), f("div", Fi, [
        r.value && u()?.folders.length ? (i(), I(t(Mt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : E("", !0),
        r.value ? E("", !0) : (i(), I(t(Et), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Li = ["onClick"], Vi = ["title", "onDblclick", "onClick"], Ri = { class: "vuefinder__treesubfolderlist__item-icon" }, Bi = { class: "vuefinder__treesubfolderlist__subfolder" }, Hi = /* @__PURE__ */ G({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = Y("ServiceContainer"), o = e.fs, l = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), r = b({}), v = z(o.path), u = n, m = b(null);
    ve(() => {
      u.path === u.storage + "://" && m.value && Xe(m.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = oe(() => e.treeViewData.find((_) => _.path === u.path)?.folders || []);
    return (_, d) => {
      const a = qt("TreeSubfolderList", !0);
      return i(), f("ul", {
        ref_key: "parentSubfolderList",
        ref: m,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (i(!0), f(ne, null, se(c.value, (p) => (i(), f("li", {
          key: p.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", ke(Ee(t(l).events({ ...p, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (g) => r.value[p.path] = !r.value[p.path]
            }, [
              D(At, {
                storage: n.storage,
                path: p.path,
                modelValue: r.value[p.path],
                "onUpdate:modelValue": (g) => r.value[p.path] = g
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Li),
            s("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: p.path,
              onDblclick: (g) => r.value[p.path] = !r.value[p.path],
              onClick: (g) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: u.storage, path: p.path } })
            }, [
              s("div", Ri, [
                t(v)?.path === p.path ? (i(), I(t(Ct), { key: 0 })) : (i(), I(t(Oe), { key: 1 }))
              ]),
              s("div", {
                class: J(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(v)?.path === p.path
                }])
              }, h(p.basename), 3)
            ], 40, Vi)
          ], 16),
          s("div", Bi, [
            le(D(a, {
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
}), qi = /* @__PURE__ */ G({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = Y("ServiceContainer"), o = e.fs, l = b(!1), r = n, v = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), u = z(o.path), m = oe(() => r.storage === u.value?.storage), c = {
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
      s("div", {
        onClick: a[2] || (a[2] = (p) => _(n.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        s("div", ke(Ee(t(v).events(c), !0), {
          class: ["vuefinder__treestorageitem__info", m.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          s("div", {
            class: J(["vuefinder__treestorageitem__icon", m.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            D(t($t))
          ], 2),
          s("div", null, h(n.storage), 1)
        ], 16),
        s("div", {
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
      le(D(Hi, {
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
    const e = at(n, "modelValue");
    return (o, l) => (i(), f("div", Ni, [
      s("div", Pi, [
        e.value ? (i(), I(t(Mt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : E("", !0),
        e.value ? E("", !0) : (i(), I(t(Et), {
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
    const e = Y("ServiceContainer"), { t: o } = e.i18n, { getStore: l, setStore: r } = e.storage, v = e.fs, u = e.config, m = z(u.state), c = z(v.sortedFiles), _ = z(v.path), d = qe(e, ["bg-blue-200", "dark:bg-slate-600"]), a = b(190), p = b(l("pinned-folders-opened", !0));
    ie(p, (T) => r("pinned-folders-opened", T));
    const g = (T) => {
      u.set("pinnedFolders", u.get("pinnedFolders").filter((k) => k.path !== T.path));
    }, C = (T) => {
      const k = T.clientX, y = T.target.parentElement;
      if (!y) return;
      const R = y.getBoundingClientRect().width;
      y.classList.remove("transition-[width]"), y.classList.add("transition-none");
      const N = (re) => {
        a.value = R + re.clientX - k, a.value < 50 && (a.value = 0, u.set("showTreeView", !1)), a.value > 50 && u.set("showTreeView", !0);
      }, X = () => {
        const re = y.getBoundingClientRect();
        a.value = re.width, y.classList.add("transition-[width]"), y.classList.remove("transition-none"), window.removeEventListener("mousemove", N), window.removeEventListener("mouseup", X);
      };
      window.addEventListener("mousemove", N), window.addEventListener("mouseup", X);
    }, M = b(null);
    return ve(() => {
      M.value && Xe(M.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), ie(c, (T) => {
      const k = T.filter((y) => y.type === "dir");
      Tt(e.treeViewData, {
        path: _.value?.path || "",
        folders: k.map((y) => ({
          storage: y.storage,
          path: y.path,
          basename: y.basename,
          type: "dir"
        }))
      });
    }), (T, k) => (i(), f(ne, null, [
      s("div", {
        onClick: k[0] || (k[0] = (y) => t(u).toggle("showTreeView")),
        class: J(["vuefinder__treeview__overlay", t(m).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      s("div", {
        style: Me(t(m).showTreeView ? "min-width:100px;max-width:75%; width: " + a.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: M,
          class: "vuefinder__treeview__scroll"
        }, [
          s("div", Oi, [
            s("div", {
              onClick: k[2] || (k[2] = (y) => p.value = !p.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              s("div", zi, [
                D(t(St), { class: "vuefinder__treeview__pin-icon" }),
                s("div", Ki, h(t(o)("Pinned Folders")), 1)
              ]),
              D(Ui, {
                modelValue: p.value,
                "onUpdate:modelValue": k[1] || (k[1] = (y) => p.value = y)
              }, null, 8, ["modelValue"])
            ]),
            p.value ? (i(), f("ul", ji, [
              (i(!0), f(ne, null, se(t(m).pinnedFolders, (y) => (i(), f("li", {
                key: y.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", ke(Ee(t(d).events(y), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (R) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: y.storage, path: y.path } })
                }), [
                  t(_)?.path !== y.path ? (i(), I(t(Oe), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : E("", !0),
                  t(_)?.path === y.path ? (i(), I(t(Ct), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : E("", !0),
                  s("div", {
                    title: y.path,
                    class: J(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": t(_)?.path === y.path
                    }])
                  }, h(y.basename), 11, Yi)
                ], 16, Gi),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (R) => g(y)
                }, [
                  D(t(Ei), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Wi)
              ]))), 128)),
              t(m).pinnedFolders.length ? E("", !0) : (i(), f("li", Qi, [
                s("div", Xi, h(t(o)("No folders pinned")), 1)
              ]))
            ])) : E("", !0)
          ]),
          (i(!0), f(ne, null, se(t(v).storages.get(), (y) => (i(), f("div", {
            class: "vuefinder__treeview__storage",
            key: y
          }, [
            D(qi, { storage: y }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        s("div", {
          onMousedown: C,
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
      const o = n.config, l = o.get("pinnedFolders"), r = l.concat(e.filter((v) => l.findIndex((u) => u.path === v.path) === -1));
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
    Nt("ServiceContainer", r);
    const v = r.config, u = r.fs, m = z(v.state), c = z(u.selectedItems);
    Xs(r);
    let _ = null;
    r.emitter.on("vf-fetch-abort", () => {
      _ && _.abort(), u.setLoading(!1);
    }), r.emitter.on("vf-fetch", ({ params: a, body: p = null, onSuccess: g = null, onError: C = null, noCloseModal: M = !1 }) => {
      ["index", "search"].includes(a.q) && (_ && _.abort(), u.setLoading(!0)), a.adapter = a.storage, _ = new AbortController();
      const T = _.signal;
      r.requester.send({
        url: "",
        method: a.m || "get",
        params: a,
        body: p,
        abortSignal: T
      }).then((k) => {
        u.setPath(k.dirname), v.get("persist") && v.set("path", k.dirname), M || r.modal.close(), u.setFiles(k.files), u.clearSelection(), u.setSelectedCount(0), u.setStorages(k.storages), g && g(k);
      }).catch((k) => {
        console.error(k), C ? C(k) : k && typeof k == "object" && "message" in k && r.emitter.emit("vf-toast-push", { label: k.message, type: "error" });
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
    return ve(() => {
      ie(() => l.path, (p) => {
        d(p);
      });
      const a = v.get("persist") ? v.get("path") : l.path;
      u.setPath(a), d(a), r.emitter.on("vf-select", (p) => {
        r.selectedItems = p, o("select", p);
      }), ie(() => u.path.get().path, (p) => {
        o("update:path", p);
      }), ie(c, (p) => {
        o("select", p);
      });
    }), (a, p) => (i(), f("div", td, [
      s("div", {
        class: J(t(r).theme.actualValue)
      }, [
        s("div", {
          class: J([t(m).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: Me(t(m).fullScreen ? "" : "max-height: " + n.maxHeight),
          onMousedown: p[0] || (p[0] = (g) => t(r).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (g) => t(r).emitter.emit("vf-contextmenu-hide"))
        }, [
          D(kl),
          D(va),
          s("div", nd, [
            D(Ji),
            D(ti)
          ]),
          D(ki)
        ], 38),
        D(Pt, { name: "fade" }, {
          default: j(() => [
            t(r).modal.visible ? (i(), I(Qe(t(r).modal.type), { key: 0 })) : E("", !0)
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
  pe as ContextMenuIds,
  od as VueFinder,
  fd as VueFinderPlugin,
  ed as contextMenuItems,
  fd as default
};
