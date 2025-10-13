import { reactive as Ne, watch as de, ref as y, shallowRef as at, useTemplateRef as Ae, defineComponent as j, inject as G, onMounted as ce, nextTick as Le, createElementBlock as f, openBlock as i, withKeys as De, unref as t, createElementVNode as s, withModifiers as we, renderSlot as qe, createBlock as I, resolveDynamicComponent as Xe, toDisplayString as p, onUnmounted as Ve, normalizeClass as Q, computed as ne, withCtx as K, createVNode as D, createCommentVNode as M, Fragment as te, renderList as oe, createTextVNode as N, withDirectives as re, vModelSelect as ot, vModelText as Ie, onBeforeUnmount as At, customRef as Dt, mergeProps as ke, toHandlers as $e, vShow as ge, isRef as It, Teleport as Ft, normalizeStyle as Ce, normalizeProps as Lt, TransitionGroup as Vt, onUpdated as Rt, mergeModels as Bt, useModel as it, resolveComponent as Ht, provide as qt, Transition as Nt } from "vue";
import { useStore as O } from "@nanostores/vue";
import Pt from "mitt";
import { persistentAtom as Ut } from "@nanostores/persistent";
import { atom as pe, computed as He } from "nanostores";
import Ot from "cropperjs";
import zt from "@uppy/core";
import Kt from "@uppy/xhr-upload";
import jt from "@viselect/vanilla";
import Gt from "vanilla-lazyload";
import { OverlayScrollbars as Je } from "overlayscrollbars";
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
    const c = await this.customFetch(v, r);
    if (c.ok) return await c[l]();
    throw await c.json();
  }
}
function Wt(n) {
  const e = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof n == "string" ? Object.assign(e, { baseUrl: n }) : Object.assign(e, n), new Yt(e);
}
function Qt(n) {
  let e = localStorage.getItem(n + "_storage");
  const o = Ne(JSON.parse(e ?? "{}"));
  de(o, l);
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
async function Xt(n, e) {
  const o = e[n];
  return typeof o == "function" ? (await o()).default : o;
}
function Jt(n, e, o, l) {
  const { getStore: r, setStore: v } = n, c = y({}), m = y(r("locale", e)), u = (a, h = e) => {
    Xt(a, l).then((g) => {
      c.value = g, v("locale", a), m.value = a, v("translations", g), Object.values(l).length > 1 && (o.emit("vf-toast-push", { label: "The language is set to " + a }), o.emit("vf-language-saved"));
    }).catch(() => {
      h ? (o.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), u(h, null)) : o.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  de(m, (a) => {
    u(a);
  }), !r("locale") && !Object.keys(l).length ? u(e) : c.value = r("translations");
  const _ = (a, ...h) => h.length ? _(a = a.replace("%s", String(h.shift())), ...h) : a;
  function d(a, ...h) {
    return c.value && Object.prototype.hasOwnProperty.call(c.value, a) ? _(c.value[a] || a, ...h) : _(a, ...h);
  }
  return Ne({ t: d, locale: m });
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
  const r = parseFloat(l[1] || "0"), v = (l[2] || "").toLowerCase(), c = e[v] ?? 0;
  return Math.round(r * Math.pow(1024, c));
}
const Se = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function nn(n, e) {
  const o = y(Se.SYSTEM), l = y(Se.LIGHT);
  o.value = n.getStore("theme", e ?? Se.SYSTEM);
  const r = window.matchMedia("(prefers-color-scheme: dark)"), v = (c) => {
    o.value === Se.DARK || o.value === Se.SYSTEM && c.matches ? l.value = Se.DARK : l.value = Se.LIGHT;
  };
  return v(r), r.addEventListener("change", v), {
    value: o,
    actualValue: l,
    set(c) {
      o.value = c, c !== Se.SYSTEM ? n.setStore("theme", c) : n.removeStore("theme"), v(r);
    }
  };
}
function on() {
  const n = at(null), e = y(!1), o = y();
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
}, sn = (n) => {
  const e = `vuefinder_config_${n}`, o = Ut(e, je, {
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
  }), c = pe(null), m = pe(0), u = pe(!1), _ = He([n], (w) => {
    const b = (w || "local://").trim(), V = b.indexOf("://"), J = V >= 0 ? b.slice(0, V) : "", he = (V >= 0 ? b.slice(V + 3) : b).split("/").filter(Boolean);
    let _e = "";
    const Ee = he.map((Me) => (_e = _e ? `${_e}/${Me}` : Me, { basename: Me, name: Me, path: J ? `${J}://${_e}` : _e, type: "dir" }));
    return { storage: J, breadcrumb: Ee, path: b };
  }), d = He([o, l], (w, b) => {
    const { active: V, column: J, order: ye } = b;
    if (!V || !J) return w;
    const he = ye === "asc" ? 1 : -1;
    return w.slice().sort((_e, Ee) => rn(_e[J], Ee[J]) * he);
  }), a = He([o, r], (w, b) => b.size === 0 ? [] : w.filter((V) => b.has(V.path)));
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
      b.add(w), r.set(b), m.set(b.size);
    },
    deselect: (w) => {
      const b = new Set(r.get());
      b.delete(w), r.set(b), m.set(b.size);
    },
    toggleSelect: (w) => {
      const b = new Set(r.get());
      b.has(w) ? b.delete(w) : b.add(w), r.set(b), m.set(b.size);
    },
    selectAll: () => {
      const w = new Set(o.get().map((b) => b.path));
      r.set(w), m.set(w.size);
    },
    clearSelection: () => {
      r.set(/* @__PURE__ */ new Set()), m.set(0);
    },
    setSelection: (w) => {
      const b = new Set(w ?? []);
      r.set(b), m.set(b.size);
    },
    setSelectedCount: (w) => {
      m.set(w);
    },
    setLoading: (w) => {
      u.set(!!w);
    },
    isLoading: () => u.get(),
    setClipboard: (w, b) => {
      const V = o.get().filter((J) => b.has(J.path));
      v.set({
        type: w,
        path: _.get().path,
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
      c.set(w);
    },
    getDraggedItem: () => c.get(),
    clearDraggedItem: () => {
      c.set(null);
    }
  };
}, st = {
  query: "",
  searchMode: !1
}, an = () => {
  const n = pe(st), e = He(n, (_) => _.query.length > 0);
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
      n.set({ ...st });
    }
  };
}, dn = (n, e) => {
  const o = Qt(n.id), l = Pt(), r = nn(o, n.theme), v = e.i18n, c = n.locale ?? e.locale, m = sn(n.id), u = ln(), _ = an(), d = (a) => Array.isArray(a) ? a : Zt;
  return Ne({
    // app version
    version: en,
    // config store
    config: m,
    // files store
    fs: u,
    // search store
    search: _,
    // root element
    root: Ae("root"),
    // app id
    debug: n.debug,
    // Event Bus
    emitter: l,
    // storage
    storage: o,
    // localization object
    i18n: Jt(o, c, l, v),
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
    filesize: m.get("metricUnits") ? ct : dt,
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
    const e = y(null), o = G("ServiceContainer");
    return ce(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Le(() => {
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
      onKeyup: r[1] || (r[1] = De((v) => t(o).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      r[2] || (r[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", cn, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: r[0] || (r[0] = we((v) => t(o).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", un, [
              qe(l.$slots, "default")
            ]),
            s("div", vn, [
              qe(l.$slots, "buttons")
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
    return (e, o) => (i(), f("div", _n, [
      s("div", mn, [
        (i(), I(Xe(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("h3", fn, p(n.title), 1)
    ]));
  }
}), hn = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: o }) {
    const l = G("ServiceContainer"), r = y(!1), { t: v } = l.i18n;
    let c = null;
    const m = () => {
      clearTimeout(c), r.value = !0, c = setTimeout(() => {
        r.value = !1;
      }, 2e3);
    };
    return ce(() => {
      l.emitter.on(n.on, m);
    }), Ve(() => {
      clearTimeout(c);
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
  return i(), f("div", {
    class: Q(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    n.$slots.default ? qe(n.$slots, "default", { key: 0 }) : (i(), f("span", gn, p(l.t("Saved.")), 1))
  ], 2);
}
const Te = /* @__PURE__ */ pn(hn, [["render", wn]]), bn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function yn(n, e) {
  return i(), f("svg", bn, [...e[0] || (e[0] = [
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
}, qn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Nn = { class: "vuefinder__about-modal__setting-input" }, Pn = ["checked"], Un = { class: "vuefinder__about-modal__setting-label" }, On = {
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
}, Co = { class: "vuefinder__about-modal__description" }, ut = /* @__PURE__ */ j({
  __name: "ModalAbout",
  setup(n) {
    const e = G("ServiceContainer"), o = e.config, { clearStore: l } = e.storage, { t: r } = e.i18n, v = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = ne(() => [
      { name: r("About"), key: v.ABOUT, current: !1 },
      { name: r("Settings"), key: v.SETTINGS, current: !1 },
      { name: r("Shortcuts"), key: v.SHORTCUTS, current: !1 },
      { name: r("Reset"), key: v.RESET, current: !1 }
    ]), m = y("about"), u = async () => {
      o.reset(), l(), location.reload();
    }, _ = (E) => {
      e.theme.set(E), e.emitter.emit("vf-theme-saved");
    }, d = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? ct : dt, e.emitter.emit("vf-metric-units-saved");
    }, a = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, h = () => {
      o.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, g = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: T } = G("VueFinderOptions"), $ = Object.fromEntries(
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
    return (E, F) => (i(), I(be, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: F[3] || (F[3] = (P) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(r)("Close")), 1)
      ]),
      default: K(() => [
        s("div", xn, [
          D(xe, {
            icon: t(kn),
            title: "Vuefinder " + t(e).version
          }, null, 8, ["icon", "title"]),
          s("div", Sn, [
            s("div", null, [
              s("div", null, [
                s("nav", $n, [
                  (i(!0), f(te, null, oe(c.value, (P) => (i(), f("button", {
                    key: P.name,
                    onClick: (X) => m.value = P.key,
                    class: Q([P.key === m.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": P.current ? "page" : void 0
                  }, p(P.name), 11, Cn))), 128))
                ])
              ])
            ]),
            m.value === v.ABOUT ? (i(), f("div", En, [
              s("div", Mn, p(t(r)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              s("a", Tn, p(t(r)("Project home")), 1),
              s("a", An, p(t(r)("Follow on GitHub")), 1)
            ])) : M("", !0),
            m.value === v.SETTINGS ? (i(), f("div", Dn, [
              s("div", In, p(t(r)("Customize your experience with the following settings")), 1),
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
                        N(p(t(r)("Use Metric Units")) + " ", 1),
                        D(Te, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: K(() => [
                            N(p(t(r)("Saved.")), 1)
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
                        onChange: a,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Pn)
                    ]),
                    s("div", Un, [
                      s("label", On, [
                        N(p(t(r)("Compact list view")) + " ", 1),
                        D(Te, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: K(() => [
                            N(p(t(r)("Saved.")), 1)
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
                        N(p(t(r)("Persist path on reload")) + " ", 1),
                        D(Te, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: K(() => [
                            N(p(t(r)("Saved.")), 1)
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
                        onChange: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Xn)
                    ]),
                    s("div", Jn, [
                      s("label", Zn, [
                        N(p(t(r)("Show thumbnails")) + " ", 1),
                        D(Te, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: K(() => [
                            N(p(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", eo, [
                    s("div", to, [
                      s("label", no, p(t(r)("Theme")), 1)
                    ]),
                    s("div", oo, [
                      re(s("select", {
                        id: "theme",
                        "onUpdate:modelValue": F[0] || (F[0] = (P) => t(e).theme.value = P),
                        onChange: F[1] || (F[1] = (P) => _(P.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Theme")
                        }, [
                          (i(!0), f(te, null, oe(x.value, (P, X) => (i(), f("option", { value: X }, p(P), 9, ro))), 256))
                        ], 8, so)
                      ], 544), [
                        [ot, t(e).theme.value]
                      ]),
                      D(Te, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: K(() => [
                          N(p(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t(e).features.includes(t(ee).LANGUAGE) && Object.keys(t($)).length > 1 ? (i(), f("div", lo, [
                    s("div", ao, [
                      s("label", io, p(t(r)("Language")), 1)
                    ]),
                    s("div", co, [
                      re(s("select", {
                        id: "language",
                        "onUpdate:modelValue": F[2] || (F[2] = (P) => t(e).i18n.locale = P),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: t(r)("Language")
                        }, [
                          (i(!0), f(te, null, oe(t($), (P, X) => (i(), f("option", { value: X }, p(P), 9, vo))), 256))
                        ], 8, uo)
                      ], 512), [
                        [ot, t(e).i18n.locale]
                      ]),
                      D(Te, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: K(() => [
                          N(p(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : M("", !0)
                ])
              ])
            ])) : M("", !0),
            m.value === v.SHORTCUTS ? (i(), f("div", _o, [
              s("div", mo, [
                s("div", fo, [
                  s("div", null, p(t(r)("Rename")), 1),
                  F[4] || (F[4] = s("kbd", null, "F2", -1))
                ]),
                s("div", ho, [
                  s("div", null, p(t(r)("Refresh")), 1),
                  F[5] || (F[5] = s("kbd", null, "F5", -1))
                ]),
                s("div", po, [
                  N(p(t(r)("Delete")) + " ", 1),
                  F[6] || (F[6] = s("kbd", null, "Del", -1))
                ]),
                s("div", go, [
                  N(p(t(r)("Escape")) + " ", 1),
                  F[7] || (F[7] = s("div", null, [
                    s("kbd", null, "Esc")
                  ], -1))
                ]),
                s("div", wo, [
                  N(p(t(r)("Select All")) + " ", 1),
                  F[8] || (F[8] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "A")
                  ], -1))
                ]),
                s("div", bo, [
                  N(p(t(r)("Search")) + " ", 1),
                  F[9] || (F[9] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "F")
                  ], -1))
                ]),
                s("div", yo, [
                  N(p(t(r)("Toggle Sidebar")) + " ", 1),
                  F[10] || (F[10] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "E")
                  ], -1))
                ]),
                s("div", ko, [
                  N(p(t(r)("Open Settings")) + " ", 1),
                  F[11] || (F[11] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, ",")
                  ], -1))
                ]),
                s("div", xo, [
                  N(p(t(r)("Toggle Full Screen")) + " ", 1),
                  F[12] || (F[12] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    N(" + "),
                    s("kbd", null, "Enter")
                  ], -1))
                ]),
                s("div", So, [
                  N(p(t(r)("Preview")) + " ", 1),
                  F[13] || (F[13] = s("div", null, [
                    s("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : M("", !0),
            m.value === v.RESET ? (i(), f("div", $o, [
              s("div", Co, p(t(r)("Reset all settings to default")), 1),
              s("button", {
                onClick: u,
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
}), Eo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Mo(n, e) {
  return i(), f("svg", Eo, [...e[0] || (e[0] = [
    s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const vt = { render: Mo }, To = { class: "vuefinder__delete-modal__content" }, Ao = { class: "vuefinder__delete-modal__form" }, Do = { class: "vuefinder__delete-modal__description" }, Io = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Fo = { class: "vuefinder__delete-modal__file" }, Lo = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vo = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ro = { class: "vuefinder__delete-modal__file-name" }, Bo = { class: "vuefinder__delete-modal__warning" }, Ze = /* @__PURE__ */ j({
  __name: "ModalDelete",
  setup(n) {
    const e = G("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = O(l.path), v = y(e.modal.data.items), c = y(""), m = () => {
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
      buttons: K(() => [
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
        s("div", Bo, p(t(o)("This action cannot be undone.")), 1)
      ]),
      default: K(() => [
        s("div", null, [
          D(xe, {
            icon: t(vt),
            title: t(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", To, [
            s("div", Ao, [
              s("p", Do, p(t(o)("Are you sure you want to delete these files?")), 1),
              s("div", Io, [
                (i(!0), f(te, null, oe(v.value, (d) => (i(), f("p", Fo, [
                  d.type === "dir" ? (i(), f("svg", Lo, [..._[2] || (_[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (i(), f("svg", Vo, [..._[3] || (_[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", Ro, p(d.basename), 1)
                ]))), 256))
              ]),
              c.value.length ? (i(), I(t(c), {
                key: 0,
                onHidden: _[0] || (_[0] = (d) => c.value = ""),
                error: ""
              }, {
                default: K(() => [
                  N(p(c.value), 1)
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
}), Ho = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function qo(n, e) {
  return i(), f("svg", Ho, [...e[0] || (e[0] = [
    s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const _t = { render: qo }, No = { class: "vuefinder__rename-modal__content" }, Po = { class: "vuefinder__rename-modal__item" }, Uo = { class: "vuefinder__rename-modal__item-info" }, Oo = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zo = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ko = { class: "vuefinder__rename-modal__item-name" }, et = /* @__PURE__ */ j({
  __name: "ModalRename",
  setup(n) {
    const e = G("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = O(l.path), v = y(e.modal.data.items[0]), c = y(e.modal.data.items[0].basename), m = y(""), u = () => {
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
      buttons: K(() => [
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
      default: K(() => [
        s("div", null, [
          D(xe, {
            icon: t(_t),
            title: t(o)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", No, [
            s("div", Po, [
              s("p", Uo, [
                v.value.type === "dir" ? (i(), f("svg", Oo, [...d[3] || (d[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (i(), f("svg", zo, [...d[4] || (d[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Ko, p(v.value.basename), 1)
              ]),
              re(s("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => c.value = a),
                onKeyup: De(u, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Ie, c.value]
              ]),
              m.value.length ? (i(), I(t(m), {
                key: 0,
                onHidden: d[1] || (d[1] = (a) => m.value = ""),
                error: ""
              }, {
                default: K(() => [
                  N(p(m.value), 1)
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
}), jo = ["title"], tt = /* @__PURE__ */ j({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const o = e, l = G("ServiceContainer"), { t: r } = l.i18n, v = y(!1), c = y(null), m = y(c.value?.innerHTML);
    de(m, () => v.value = !1);
    const u = () => {
      o("hidden"), v.value = !0;
    };
    return (_, d) => (i(), f("div", null, [
      v.value ? M("", !0) : (i(), f("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: Q(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        qe(_.$slots, "default"),
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
    const o = e, l = y(""), r = y(""), v = y(null), c = y(!1), m = y(""), u = y(!1), _ = G("ServiceContainer"), { t: d } = _.i18n;
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
    return (g, T) => (i(), f("div", Go, [
      s("div", Yo, [
        s("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(_).modal.data.item.path
        }, p(t(_).modal.data.item.basename), 9, Wo),
        s("div", Qo, [
          c.value ? (i(), f("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__text-preview__save-button"
          }, p(t(d)("Save")), 1)) : M("", !0),
          t(_).features.includes(t(ee).EDIT) ? (i(), f("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: T[0] || (T[0] = (S) => a())
          }, p(c.value ? t(d)("Cancel") : t(d)("Edit")), 1)) : M("", !0)
        ])
      ]),
      s("div", null, [
        c.value ? (i(), f("div", Jo, [
          re(s("textarea", {
            ref_key: "editInput",
            ref: v,
            "onUpdate:modelValue": T[1] || (T[1] = (S) => r.value = S),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Ie, r.value]
          ])
        ])) : (i(), f("pre", Xo, p(l.value), 1)),
        m.value.length ? (i(), I(tt, {
          key: 2,
          onHidden: T[2] || (T[2] = (S) => m.value = ""),
          error: u.value
        }, {
          default: K(() => [
            N(p(m.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : M("", !0)
      ])
    ]));
  }
}), es = { class: "vuefinder__image-preview" }, ts = { class: "vuefinder__image-preview__header" }, ns = ["title"], os = { class: "vuefinder__image-preview__actions" }, ss = { class: "vuefinder__image-preview__image-container" }, rs = ["src"], ls = /* @__PURE__ */ j({
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = G("ServiceContainer"), { t: r } = l.i18n, v = y(null), c = y(null), m = y(!1), u = y(""), _ = y(!1), d = () => {
      m.value = !m.value, m.value && v.value ? c.value = new Ot(v.value, {
        crop(h) {
        }
      }) : c.value && c.value.destroy();
    }, a = () => {
      c.value && c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (h) => {
          u.value = "", _.value = !1;
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
          }).then((T) => {
            u.value = r("Updated."), v.value && (v.value.src = l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item)), d(), o("success");
          }).catch((T) => {
            u.value = r(T.message), _.value = !0;
          });
        }
      );
    };
    return ce(() => {
      o("success");
    }), (h, g) => (i(), f("div", es, [
      s("div", ts, [
        s("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, p(t(l).modal.data.item.basename), 9, ns),
        s("div", os, [
          m.value ? (i(), f("button", {
            key: 0,
            onClick: a,
            class: "vuefinder__image-preview__crop-button"
          }, p(t(r)("Crop")), 1)) : M("", !0),
          t(l).features.includes(t(ee).EDIT) ? (i(), f("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: g[0] || (g[0] = (T) => d())
          }, p(m.value ? t(r)("Cancel") : t(r)("Edit")), 1)) : M("", !0)
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
      u.value.length ? (i(), I(tt, {
        key: 0,
        onHidden: g[1] || (g[1] = (T) => u.value = ""),
        error: _.value
      }, {
        default: K(() => [
          N(p(u.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : M("", !0)
    ]));
  }
}), as = { class: "vuefinder__default-preview" }, is = { class: "vuefinder__default-preview__header" }, ds = ["title"], cs = /* @__PURE__ */ j({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = G("ServiceContainer"), l = e;
    return ce(() => {
      l("success");
    }), (r, v) => (i(), f("div", as, [
      s("div", is, [
        s("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: t(o).modal.data.item.path
        }, p(t(o).modal.data.item.basename), 9, ds)
      ]),
      v[0] || (v[0] = s("div", null, null, -1))
    ]));
  }
}), us = { class: "vuefinder__video-preview" }, vs = ["title"], _s = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, ms = ["src"], fs = /* @__PURE__ */ j({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = G("ServiceContainer"), l = e, r = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ce(() => {
      l("success");
    }), (v, c) => (i(), f("div", us, [
      s("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, p(t(o).modal.data.item.basename), 9, vs),
      s("div", null, [
        s("video", _s, [
          s("source", {
            src: r(),
            type: "video/mp4"
          }, null, 8, ms),
          c[0] || (c[0] = N(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), hs = { class: "vuefinder__audio-preview" }, ps = ["title"], gs = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, ws = ["src"], bs = /* @__PURE__ */ j({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, l = G("ServiceContainer"), r = () => l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item);
    return ce(() => {
      o("success");
    }), (v, c) => (i(), f("div", hs, [
      s("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: t(l).modal.data.item.path
      }, p(t(l).modal.data.item.basename), 9, ps),
      s("div", null, [
        s("audio", gs, [
          s("source", {
            src: r(),
            type: "audio/mpeg"
          }, null, 8, ws),
          c[0] || (c[0] = N(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), ys = { class: "vuefinder__pdf-preview" }, ks = ["title"], xs = ["data"], Ss = ["src"], $s = /* @__PURE__ */ j({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = G("ServiceContainer"), l = e, r = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ce(() => {
      l("success");
    }), (v, c) => (i(), f("div", ys, [
      s("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, p(t(o).modal.data.item.basename), 9, ks),
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
}, Vs = ["download", "href"], mt = /* @__PURE__ */ j({
  __name: "ModalPreview",
  setup(n) {
    const e = G("ServiceContainer"), { t: o } = e.i18n, l = y(!1), r = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), v = e.features.includes(ee.PREVIEW);
    return v || (l.value = !0), (c, m) => (i(), I(be, null, {
      buttons: K(() => [
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
        }, p(t(o)("Download")), 9, Vs)) : M("", !0)
      ]),
      default: K(() => [
        s("div", null, [
          s("div", Es, [
            t(v) ? (i(), f("div", Ms, [
              r("text") ? (i(), I(Zo, {
                key: 0,
                onSuccess: m[0] || (m[0] = (u) => l.value = !0)
              })) : r("image") ? (i(), I(ls, {
                key: 1,
                onSuccess: m[1] || (m[1] = (u) => l.value = !0)
              })) : r("video") ? (i(), I(fs, {
                key: 2,
                onSuccess: m[2] || (m[2] = (u) => l.value = !0)
              })) : r("audio") ? (i(), I(bs, {
                key: 3,
                onSuccess: m[3] || (m[3] = (u) => l.value = !0)
              })) : r("application/pdf") ? (i(), I($s, {
                key: 4,
                onSuccess: m[4] || (m[4] = (u) => l.value = !0)
              })) : (i(), I(cs, {
                key: 5,
                onSuccess: m[5] || (m[5] = (u) => l.value = !0)
              }))
            ])) : M("", !0),
            s("div", Ts, [
              l.value === !1 ? (i(), f("div", As, [
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
              ])) : M("", !0)
            ])
          ])
        ]),
        s("div", Ds, [
          s("div", null, [
            s("span", Is, p(t(o)("File Size")) + ": ", 1),
            N(p(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", Fs, p(t(o)("Last Modified")) + ": ", 1),
            N(" " + p(t(Cs)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(ee).DOWNLOAD) ? (i(), f("div", Ls, [
          s("span", null, p(t(o)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
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
  return i(), f("svg", Rs, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Hs = { render: Bs }, qs = { class: "vuefinder__move-modal__content" }, Ns = { class: "vuefinder__move-modal__description" }, Ps = { class: "vuefinder__move-modal__files vf-scrollbar" }, Us = {
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
}, zs = { class: "vuefinder__move-modal__file-name" }, Ks = { class: "vuefinder__move-modal__target-title" }, js = { class: "vuefinder__move-modal__target-directory" }, Gs = { class: "vuefinder__move-modal__target-path" }, Ys = { class: "vuefinder__move-modal__selected-items" }, Ws = /* @__PURE__ */ j({
  __name: "ModalTransfer",
  props: {
    q: {},
    title: {},
    body: {},
    successBtn: {},
    successText: {}
  },
  setup(n) {
    const e = G("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = O(l.path), v = n, c = y(e.modal.data.items.from), m = e.modal.data.items.to, u = y(""), _ = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: v.q,
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: c.value.map(({ path: d, type: a }) => ({ path: d, type: a })),
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
    return (d, a) => (i(), I(be, null, {
      buttons: K(() => [
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
        s("div", Ys, p(t(o)("%s item(s) selected.", c.value.length)), 1)
      ]),
      default: K(() => [
        s("div", null, [
          D(xe, {
            icon: t(Hs),
            title: v.title
          }, null, 8, ["icon", "title"]),
          s("div", qs, [
            s("p", Ns, p(v.body), 1),
            s("div", Ps, [
              (i(!0), f(te, null, oe(c.value, (h) => (i(), f("div", {
                class: "vuefinder__move-modal__file",
                key: h.path
              }, [
                s("div", null, [
                  h.type === "dir" ? (i(), f("svg", Us, [...a[2] || (a[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (i(), f("svg", Os, [...a[3] || (a[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", zs, p(h.path), 1)
              ]))), 128))
            ]),
            s("h4", Ks, p(t(o)("Target Directory")), 1),
            s("p", js, [
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
              s("span", Gs, p(t(m).path), 1)
            ]),
            u.value.length ? (i(), I(t(u), {
              key: 0,
              onHidden: a[0] || (a[0] = (h) => u.value = ""),
              error: ""
            }, {
              default: K(() => [
                N(p(u.value), 1)
              ]),
              _: 1
            })) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), We = /* @__PURE__ */ j({
  __name: "ModalMove",
  setup(n) {
    const e = G("ServiceContainer"), { t: o } = e.i18n;
    return (l, r) => (i(), I(Ws, {
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
  const e = n.search, o = n.fs, l = n.config, r = O(e.state), v = O(o.selectedItems), c = (m) => {
    if (m.code === me.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible && !r.value?.searchMode) {
      if (m.code === me.F2 && n.features.includes(ee.RENAME) && v.value.length === 1 && n.modal.open(et, { items: v.value }), m.code === me.F5 && n.emitter.emit("vf-fetch", { params: { q: "index", storage: o.path.get().storage, path: o.path.get().path } }), m.code === me.DELETE && v.value.length === 0 && n.modal.open(Ze, { items: v.value }), m.ctrlKey && m.code === me.BACKSLASH && n.modal.open(ut), m.ctrlKey && m.code === me.KEY_F && n.features.includes(ee.SEARCH) && (e.enterSearchMode(), m.preventDefault()), m.ctrlKey && m.code === me.KEY_E && (l.toggle("showTreeView"), m.preventDefault()), m.ctrlKey && m.code === me.ENTER && (l.toggle("fullScreen"), n.root.focus()), m.ctrlKey && m.code === me.KEY_A && (o.selectAll(), m.preventDefault()), m.code === me.SPACE && v.value.length === 1 && v.value[0]?.type !== "dir" && n.modal.open(mt, { storage: o.path.get().storage, item: v.value[0] }), m.metaKey && m.code === me.KEY_C) {
        if (v.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("copy", new Set(v.value.map((u) => u.path))), n.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", v.value.length) }), m.preventDefault();
      }
      if (m.metaKey && m.code === me.KEY_X) {
        if (v.value.length === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("cut", new Set(v.value.map((u) => u.path))), n.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", v.value.length) }), m.preventDefault();
      }
      if (m.metaKey && m.code === me.KEY_V) {
        if (o.getClipboard().items.size === 0) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("No items in clipboard") });
          return;
        }
        if (o.getClipboard().path === o.path.get().path) {
          n.emitter.emit("vf-toast-push", { type: "error", label: n.i18n.t("Cannot paste items to the same directory") });
          return;
        }
        if (o.getClipboard().type === "cut") {
          n.modal.open(We, { items: { from: o.getClipboard().items, to: o.path } }), o.clearClipboard();
          return;
        }
        if (o.getClipboard().type === "copy") {
          n.modal.open(We, { items: { from: o.getClipboard().items, to: o.path } });
          return;
        }
        m.preventDefault();
      }
    }
  };
  ce(() => {
    n.root.addEventListener("keydown", c);
  }), At(() => {
    n.root.removeEventListener("keydown", c);
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
  return i(), f("svg", Xs, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ft = { render: Js }, Zs = { class: "vuefinder__new-folder-modal__content" }, er = { class: "vuefinder__new-folder-modal__form" }, tr = { class: "vuefinder__new-folder-modal__description" }, nr = ["placeholder"], ht = /* @__PURE__ */ j({
  __name: "ModalNewFolder",
  setup(n) {
    const e = G("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = O(l.path), v = y(""), c = y(""), m = () => {
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
      buttons: K(() => [
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
      default: K(() => [
        s("div", null, [
          D(xe, {
            icon: t(ft),
            title: t(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", Zs, [
            s("div", er, [
              s("p", tr, p(t(o)("Create a new folder")), 1),
              re(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => v.value = d),
                onKeyup: De(m, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(o)("Folder Name"),
                type: "text"
              }, null, 40, nr), [
                [Ie, v.value]
              ]),
              c.value.length ? (i(), I(t(c), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: K(() => [
                  N(p(c.value), 1)
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
  return i(), f("svg", or, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const pt = { render: sr }, rr = { class: "vuefinder__new-file-modal__content" }, lr = { class: "vuefinder__new-file-modal__form" }, ar = { class: "vuefinder__new-file-modal__description" }, ir = ["placeholder"], dr = /* @__PURE__ */ j({
  __name: "ModalNewFile",
  setup(n) {
    const e = G("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = O(l.path), v = y(""), c = y(""), m = () => {
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
      buttons: K(() => [
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
      default: K(() => [
        s("div", null, [
          D(xe, {
            icon: t(pt),
            title: t(o)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", rr, [
            s("div", lr, [
              s("p", ar, p(t(o)("Create a new file")), 1),
              re(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => v.value = d),
                onKeyup: De(m, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(o)("File Name"),
                type: "text"
              }, null, 40, ir), [
                [Ie, v.value]
              ]),
              c.value.length ? (i(), I(t(c), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: K(() => [
                  N(p(c.value), 1)
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
  const n = G("ServiceContainer"), { t: e } = n.i18n, o = n.fs, l = n.config, r = y({ QUEUE_ENTRY_STATUS: ie }), v = y(null), c = y(null), m = y(null), u = y(null), _ = y(null), d = y(null), a = y([]), h = y(""), g = y(!1), T = y(!1);
  let S;
  const $ = (z) => a.value.findIndex((ae) => ae.id === z), x = (z, ae) => S.addFile({ name: ae || z.name, type: z.type, data: z, source: "Local" }), E = (z) => z.status === ie.DONE ? "text-green-600" : z.status === ie.ERROR || z.status === ie.CANCELED ? "text-red-600" : "", F = (z) => z.status === ie.DONE ? "✓" : z.status === ie.ERROR || z.status === ie.CANCELED ? "!" : "...", P = () => u.value?.click(), X = () => n.modal.close(), se = () => {
    if (g.value || !a.value.filter((z) => z.status !== ie.DONE).length) {
      g.value || (h.value = e("Please select file to upload first."));
      return;
    }
    h.value = "", S.retryAll(), S.upload();
  }, B = () => {
    S.cancelAll(), a.value.forEach((z) => {
      z.status !== ie.DONE && (z.status = ie.CANCELED, z.statusName = e("Canceled"));
    }), g.value = !1;
  }, R = (z) => {
    g.value || (S.removeFile(z.id), a.value.splice($(z.id), 1));
  }, le = (z) => {
    if (!g.value)
      if (S.cancelAll(), z) {
        const ae = a.value.filter((L) => L.status !== ie.DONE);
        a.value = [], ae.forEach((L) => x(L.originalFile, L.name));
      } else
        a.value = [];
  };
  return ce(() => {
    S = new zt({
      debug: n.debug,
      restrictions: { maxFileSize: tn(l.maxFileSize ?? "10mb") },
      locale: n.i18n.t("uppy"),
      onBeforeFileAdded: (L, k) => {
        if (k[L.id] != null) {
          const U = $(L.id);
          a.value[U]?.status === ie.PENDING && (h.value = S.i18n("noDuplicates", { fileName: L.name })), a.value = a.value.filter((Y) => Y.id !== L.id);
        }
        return a.value.push({
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
      const C = a.value[$(L.id)];
      C && R(C), h.value = k.message;
    }), S.on("upload", () => {
      const L = n.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", storage: o.path.storage, path: o.path.path }
      });
      S.setMeta({ ...L.body });
      const k = S.getPlugin("XHRUpload");
      k && (k.opts.method = L.method, k.opts.endpoint = L.url + "?" + new URLSearchParams(L.params), k.opts.headers = L.headers), delete L.headers["Content-Type"], g.value = !0, a.value.forEach((C) => {
        C.status !== ie.DONE && (C.percent = null, C.status = ie.UPLOADING, C.statusName = e("Pending upload"));
      });
    }), S.on("upload-progress", (L, k) => {
      const C = k.bytesTotal ?? 1, U = Math.floor(k.bytesUploaded / C * 100), Y = $(L.id);
      Y !== -1 && a.value[Y] && (a.value[Y].percent = `${U}%`);
    }), S.on("upload-success", (L) => {
      const k = a.value[$(L.id)];
      k && (k.status = ie.DONE, k.statusName = e("Done"));
    }), S.on("upload-error", (L, k) => {
      const C = a.value[$(L.id)];
      C && (C.percent = null, C.status = ie.ERROR, C.statusName = k?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : k?.message || e("Unknown Error"));
    }), S.on("error", (L) => {
      h.value = L.message, g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), S.on("complete", () => {
      g.value = !1, n.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), u.value?.addEventListener("click", () => c.value?.click()), _.value?.addEventListener("click", () => m.value?.click()), d.value?.addEventListener("dragover", (L) => {
      L.preventDefault(), T.value = !0;
    }), d.value?.addEventListener("dragleave", (L) => {
      L.preventDefault(), T.value = !1;
    });
    const z = (L, k) => {
      k.isFile && k.file((C) => L(k, C)), k.isDirectory && k.createReader().readEntries((C) => C.forEach((U) => z(L, U)));
    };
    d.value?.addEventListener("drop", (L) => {
      L.preventDefault(), T.value = !1;
      const k = /^[/\\](.+)/, C = L.dataTransfer?.items;
      C && Array.from(C).forEach((U) => {
        U.kind === "file" && z((Y, W) => {
          const Z = k.exec(Y.fullPath);
          x(W, Z ? Z[1] : W.name);
        }, U.webkitGetAsEntry());
      });
    });
    const ae = (L) => {
      const k = L.target, C = k.files;
      if (C) {
        for (const U of C) x(U);
        k.value = "";
      }
    };
    c.value?.addEventListener("change", ae), m.value?.addEventListener("change", ae);
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
    hasFilesInDropArea: T,
    definitions: r,
    openFileSelector: P,
    upload: se,
    cancel: B,
    remove: R,
    clear: le,
    close: X,
    getClassNameForEntry: E,
    getIconForEntry: F
  };
}
function Qe(n, e = 14) {
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
  return i(), f("svg", ur, [...e[0] || (e[0] = [
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
}, Cr = ["disabled"], Er = /* @__PURE__ */ j({
  __name: "ModalUpload",
  setup(n) {
    const e = G("ServiceContainer"), { t: o } = e.i18n, {
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
      openFileSelector: T,
      upload: S,
      cancel: $,
      remove: x,
      clear: E,
      close: F,
      getClassNameForEntry: P,
      getIconForEntry: X
    } = cr();
    return (se, B) => (i(), I(be, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: t(a),
          onClick: B[4] || (B[4] = we(
            //@ts-ignore
            (...R) => t(S) && t(S)(...R),
            ["prevent"]
          ))
        }, p(t(o)("Upload")), 9, Cr),
        t(a) ? (i(), f("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: B[5] || (B[5] = we(
            //@ts-ignore
            (...R) => t($) && t($)(...R),
            ["prevent"]
          ))
        }, p(t(o)("Cancel")), 1)) : (i(), f("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: B[6] || (B[6] = we(
            //@ts-ignore
            (...R) => t(F) && t(F)(...R),
            ["prevent"]
          ))
        }, p(t(o)("Close")), 1))
      ]),
      default: K(() => [
        s("div", null, [
          D(xe, {
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
              t(h) ? (i(), f("div", mr, p(t(o)("Release to drop these files.")), 1)) : (i(), f("div", fr, p(t(o)("Drag and drop the files/folders to here or click here.")), 1))
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
                onClick: B[1] || (B[1] = (R) => t(E)(!1))
              }, p(t(o)("Clear all")), 9, hr),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(a),
                onClick: B[2] || (B[2] = (R) => t(E)(!0))
              }, p(t(o)("Clear only successful")), 9, pr)
            ], 512),
            s("div", gr, [
              (i(!0), f(te, null, oe(t(_), (R) => (i(), f("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: R.id
              }, [
                s("span", {
                  class: Q(["vuefinder__upload-modal__file-icon", t(P)(R)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: p(t(X)(R))
                  }, null, 8, wr)
                ], 2),
                s("div", br, [
                  s("div", yr, p(t(Qe)(R.name, 40)) + " (" + p(R.size) + ") ", 1),
                  s("div", kr, p(t(Qe)(R.name, 16)) + " (" + p(R.size) + ") ", 1),
                  s("div", {
                    class: Q(["vuefinder__upload-modal__file-status", t(P)(R)])
                  }, [
                    N(p(R.statusName) + " ", 1),
                    R.status === t(g).QUEUE_ENTRY_STATUS.UPLOADING ? (i(), f("b", xr, p(R.percent), 1)) : M("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: Q(["vuefinder__upload-modal__file-remove", t(a) ? "disabled" : ""]),
                  title: t(o)("Delete"),
                  disabled: t(a),
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
              t(_).length ? M("", !0) : (i(), f("div", $r, p(t(o)("No files selected!")), 1))
            ]),
            t(d).length ? (i(), I(tt, {
              key: 0,
              onHidden: B[3] || (B[3] = (R) => d.value = ""),
              error: ""
            }, {
              default: K(() => [
                N(p(t(d)), 1)
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
  return i(), f("svg", Mr, [...e[0] || (e[0] = [
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
}, Lr = { class: "vuefinder__unarchive-modal__item-name" }, Vr = { class: "vuefinder__unarchive-modal__info" }, bt = /* @__PURE__ */ j({
  __name: "ModalUnarchive",
  setup(n) {
    const e = G("ServiceContainer"), o = e.fs, l = O(o.path), { t: r } = e.i18n, v = y(e.modal.data.items[0]), c = y(""), m = y([]), u = () => {
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
      buttons: K(() => [
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
      default: K(() => [
        s("div", null, [
          D(xe, {
            icon: t(wt),
            title: t(r)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", Ar, [
            s("div", Dr, [
              (i(!0), f(te, null, oe(m.value, (a) => (i(), f("p", {
                class: "vuefinder__unarchive-modal__item",
                key: a.path
              }, [
                a.type === "dir" ? (i(), f("svg", Ir, [...d[2] || (d[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (i(), f("svg", Fr, [...d[3] || (d[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Lr, p(a.basename), 1)
              ]))), 128)),
              s("p", Vr, p(t(r)("The archive will be unarchived at")) + " (" + p(t(o).path.path) + ")", 1),
              c.value.length ? (i(), I(t(c), {
                key: 0,
                onHidden: d[0] || (d[0] = (a) => c.value = ""),
                error: ""
              }, {
                default: K(() => [
                  N(p(c.value), 1)
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
  return i(), f("svg", Rr, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const yt = { render: Br }, Hr = { class: "vuefinder__archive-modal__content" }, qr = { class: "vuefinder__archive-modal__form" }, Nr = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Pr = { class: "vuefinder__archive-modal__file" }, Ur = {
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
}, zr = { class: "vuefinder__archive-modal__file-name" }, Kr = ["placeholder"], kt = /* @__PURE__ */ j({
  __name: "ModalArchive",
  setup(n) {
    const e = G("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = O(l.path), v = y(""), c = y(""), m = y(e.modal.data.items), u = () => {
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
      buttons: K(() => [
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
      default: K(() => [
        s("div", null, [
          D(xe, {
            icon: t(yt),
            title: t(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", Hr, [
            s("div", qr, [
              s("div", Nr, [
                (i(!0), f(te, null, oe(m.value, (a) => (i(), f("p", Pr, [
                  a.type === "dir" ? (i(), f("svg", Ur, [...d[3] || (d[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (i(), f("svg", Or, [...d[4] || (d[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", zr, p(a.basename), 1)
                ]))), 256))
              ]),
              re(s("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => v.value = a),
                onKeyup: De(u, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(o)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Kr), [
                [Ie, v.value]
              ]),
              c.value.length ? (i(), I(t(c), {
                key: 0,
                onHidden: d[1] || (d[1] = (a) => c.value = ""),
                error: ""
              }, {
                default: K(() => [
                  N(p(c.value), 1)
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
  return i(), f("svg", jr, [...e[0] || (e[0] = [
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
  return i(), f("svg", Yr, [...e[0] || (e[0] = [
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
  return i(), f("svg", Xr, [...e[0] || (e[0] = [
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
  return i(), f("svg", el, [...e[0] || (e[0] = [
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
  return i(), f("svg", ol, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const rl = { render: sl }, ll = { class: "vuefinder__toolbar" }, al = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, il = ["title"], dl = ["title"], cl = ["title"], ul = ["title"], vl = ["title"], _l = ["title"], ml = ["title"], fl = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, hl = { class: "pl-2" }, pl = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, gl = { class: "vuefinder__toolbar__controls" }, wl = ["title"], bl = ["title"], yl = /* @__PURE__ */ j({
  __name: "Toolbar",
  setup(n) {
    const e = G("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = e.config, v = e.search, c = O(r.state), m = O(v.state), u = O(l.selectedItems);
    de(() => c.value.fullScreen, () => {
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
    return (d, a) => (i(), f("div", ll, [
      t(m).query.length ? (i(), f("div", fl, [
        s("div", hl, [
          N(p(t(o)("Search results for")) + " ", 1),
          s("span", pl, p(t(m).query), 1)
        ]),
        t(r).get("loadingIndicator") === "circular" && t(l).isLoading() ? (i(), I(t(nt), { key: 0 })) : M("", !0)
      ])) : (i(), f("div", al, [
        t(e).features.includes(t(ee).NEW_FOLDER) ? (i(), f("div", {
          key: 0,
          class: "mx-1.5",
          title: t(o)("New Folder"),
          onClick: a[0] || (a[0] = (h) => t(e).modal.open(ht, { items: t(u) }))
        }, [
          D(t(ft))
        ], 8, il)) : M("", !0),
        t(e).features.includes(t(ee).NEW_FILE) ? (i(), f("div", {
          key: 1,
          class: "mx-1.5",
          title: t(o)("New File"),
          onClick: a[1] || (a[1] = (h) => t(e).modal.open(dr, { items: t(u) }))
        }, [
          D(t(pt))
        ], 8, dl)) : M("", !0),
        t(e).features.includes(t(ee).RENAME) ? (i(), f("div", {
          key: 2,
          class: "mx-1.5",
          title: t(o)("Rename"),
          onClick: a[2] || (a[2] = (h) => t(u).length !== 1 || t(e).modal.open(et, { items: t(u) }))
        }, [
          D(t(_t), {
            class: Q(t(u).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, cl)) : M("", !0),
        t(e).features.includes(t(ee).DELETE) ? (i(), f("div", {
          key: 3,
          class: "mx-1.5",
          title: t(o)("Delete"),
          onClick: a[3] || (a[3] = (h) => !t(u).length || t(e).modal.open(Ze, { items: t(u) }))
        }, [
          D(t(vt), {
            class: Q(t(u).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ul)) : M("", !0),
        t(e).features.includes(t(ee).UPLOAD) ? (i(), f("div", {
          key: 4,
          class: "mx-1.5",
          title: t(o)("Upload"),
          onClick: a[4] || (a[4] = (h) => t(e).modal.open(Er, { items: t(u) }))
        }, [
          D(t(gt))
        ], 8, vl)) : M("", !0),
        t(e).features.includes(t(ee).UNARCHIVE) && t(u).length === 1 && t(u)[0].mime_type === "application/zip" ? (i(), f("div", {
          key: 5,
          class: "mx-1.5",
          title: t(o)("Unarchive"),
          onClick: a[5] || (a[5] = (h) => !t(u).length || t(e).modal.open(bt, { items: t(u) }))
        }, [
          D(t(wt), {
            class: Q(t(u).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, _l)) : M("", !0),
        t(e).features.includes(t(ee).ARCHIVE) ? (i(), f("div", {
          key: 6,
          class: "mx-1.5",
          title: t(o)("Archive"),
          onClick: a[6] || (a[6] = (h) => !t(u).length || t(e).modal.open(kt, { items: t(u) }))
        }, [
          D(t(yt), {
            class: Q(t(u).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ml)) : M("", !0)
      ])),
      s("div", gl, [
        t(e).features.includes(t(ee).FULL_SCREEN) ? (i(), f("div", {
          key: 0,
          onClick: a[7] || (a[7] = (h) => t(r).toggle("fullScreen")),
          class: "mx-1.5",
          title: t(o)("Toggle Full Screen")
        }, [
          t(c).fullScreen ? (i(), I(t(Zr), { key: 0 })) : (i(), I(t(Qr), { key: 1 }))
        ], 8, wl)) : M("", !0),
        s("div", {
          class: "mx-1.5",
          title: t(o)("Change View"),
          onClick: a[8] || (a[8] = (h) => t(m).query.length || _())
        }, [
          t(c).view === "grid" ? (i(), I(t(nl), {
            key: 0,
            class: Q(["vf-toolbar-icon", t(m).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : M("", !0),
          t(c).view === "list" ? (i(), I(t(rl), {
            key: 1,
            class: Q(["vf-toolbar-icon", t(m).query.length ? "vf-toolbar-icon-disabled" : ""])
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
    set: kl((c) => {
      l.value = c, v();
    }, e, !1)
  }));
}, xl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function Sl(n, e) {
  return i(), f("svg", xl, [...e[0] || (e[0] = [
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
  return i(), f("svg", Cl, [...e[0] || (e[0] = [
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
  return i(), f("svg", Tl, [...e[0] || (e[0] = [
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
  return i(), f("svg", Il, [...e[0] || (e[0] = [
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
  return i(), f("svg", Vl, [...e[0] || (e[0] = [
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
  return i(), f("svg", Hl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Nl = { render: ql }, Pl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function Ul(n, e) {
  return i(), f("svg", Pl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Pe = { render: Ul }, Ol = {
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
  return i(), f("svg", Ol, [...e[0] || (e[0] = [
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
  return i(), f("svg", jl, [...e[0] || (e[0] = [
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
function Re(n, e = []) {
  const o = "vfDragEnterCounter", l = n.fs, r = O(l.selectedItems);
  function v(d, a) {
    d.preventDefault(), l.getDraggedItem() === a.path || !a || a.type !== "dir" || r.value.some((g) => g.path === a.path || Wl(g.path) === a.path) ? d.dataTransfer && (d.dataTransfer.dropEffect = "none", d.dataTransfer.effectAllowed = "none") : (d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.dataTransfer.effectAllowed = "all"), d.currentTarget.classList.add(...e));
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
    const g = d.dataTransfer?.getData("items") || "[]", S = JSON.parse(g).map(($) => l.sortedFiles.get().find((x) => x.path === $));
    l.clearDraggedItem(), n.modal.open(We, { items: { from: S, to: a } });
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
const Xl = { class: "vuefinder__breadcrumb__container" }, Jl = ["title"], Zl = ["title"], ea = ["title"], ta = ["title"], na = { class: "vuefinder__breadcrumb__list" }, oa = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, sa = { class: "relative" }, ra = ["title", "onClick"], la = { class: "vuefinder__breadcrumb__search-mode" }, aa = ["placeholder"], ia = ["onClick"], da = { class: "vuefinder__breadcrumb__hidden-item-content" }, ca = { class: "vuefinder__breadcrumb__hidden-item-text" }, ua = /* @__PURE__ */ j({
  __name: "Breadcrumb",
  setup(n) {
    const e = G("ServiceContainer"), { t: o } = e.i18n, l = e.search, r = e.fs, v = e.config, c = O(v.state), m = O(l.state), u = O(r.path), _ = O(r.loading), d = ne(() => m.value?.searchMode ?? !1), a = y(null), h = rt(0, 100), g = y(5), T = y(!1), S = ne(() => u.value?.breadcrumb ?? []);
    function $(w, b) {
      return w.length > b ? [w.slice(-b), w.slice(0, -b)] : [w, []];
    }
    const x = ne(() => $(S.value, g.value)[0]), E = ne(() => $(S.value, g.value)[1]);
    de(h, () => {
      if (!a.value) return;
      const w = a.value.children;
      let b = 0, V = 0;
      const J = 5, ye = 1;
      g.value = J, Le(() => {
        for (let he = w.length - 1; he >= 0; he--) {
          const _e = w[he];
          if (b + _e.offsetWidth > h.value - 40)
            break;
          b += parseInt(_e.offsetWidth.toString(), 10), V++;
        }
        V < ye && (V = ye), V > J && (V = J), g.value = V;
      });
    });
    const F = () => {
      a.value && (h.value = a.value.offsetWidth);
    }, P = y(null);
    ce(() => {
      P.value = new ResizeObserver(F), a.value && P.value.observe(a.value);
    }), Ve(() => {
      P.value && P.value.disconnect();
    });
    const X = Re(e, ["bg-blue-200", "dark:bg-slate-600"]);
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
      Y(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: u.value?.storage, path: u.value?.path } });
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
    }, z = () => {
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
      w && Le(() => {
        k.value && k.value.focus();
      });
    }), e.emitter.on("vf-search-exit", () => {
      l.exitSearchMode();
    });
    const U = () => {
      C.value === "" && l.exitSearchMode();
    }, Y = () => {
      C.value = "", l.exitSearchMode();
    }, W = y({
      x: 0,
      y: 0
    }), Z = (w) => {
      if (w.currentTarget instanceof HTMLElement) {
        const { x: b, y: V, height: J } = w.currentTarget.getBoundingClientRect();
        W.value = { x: b, y: V + J };
      }
      T.value = !T.value;
    };
    return (w, b) => (i(), f("div", Xl, [
      s("span", {
        title: t(o)("Toggle Tree View")
      }, [
        D(t(Kl), {
          onClick: L,
          class: Q(["vuefinder__breadcrumb__toggle-tree", t(c).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Jl),
      s("span", {
        title: t(o)("Go up a directory")
      }, [
        D(t(Ml), ke($e(S.value.length && !d.value ? t(X).events(se()) : {}), {
          onClick: R,
          class: S.value.length && !d.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, Zl),
      t(r).isLoading() ? (i(), f("span", {
        key: 1,
        title: t(o)("Cancel")
      }, [
        D(t(Dl), {
          onClick: b[0] || (b[0] = (V) => t(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, ta)) : (i(), f("span", {
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
          D(t(Ll), ke($e(t(X).events(se(-1))), {
            onClick: b[1] || (b[1] = we((V) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(u).value?.storage ?? "local" } }), ["stop"]))
          }), null, 16)
        ]),
        s("div", na, [
          E.value.length ? re((i(), f("div", oa, [
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
            [ae, z]
          ]) : M("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: a,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (i(!0), f(te, null, oe(x.value, (V, J) => (i(), f("div", { key: J }, [
            b[6] || (b[6] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", ke($e(t(X).events(V), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: V.basename,
              onClick: we((ye) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(u)?.storage, path: V.path } }), ["stop"])
            }), p(V.name), 17, ra)
          ]))), 128))
        ], 512),
        t(v).get("loadingIndicator") === "circular" && t(_) ? (i(), I(t(nt), { key: 0 })) : M("", !0)
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
          onKeydown: De(Y, ["esc"]),
          onBlur: U,
          "onUpdate:modelValue": b[4] || (b[4] = (V) => It(C) ? C.value = V : null),
          placeholder: t(o)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, aa), [
          [Ie, t(C)]
        ]),
        D(t(Nl), { onClick: Y })
      ], 512), [
        [ge, d.value]
      ]),
      (i(), I(Ft, { to: "body" }, [
        re(s("div", {
          style: Ce({ position: "absolute", top: W.value.y + "px", left: W.value.x + "px" }),
          class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
        }, [
          (i(!0), f(te, null, oe(E.value, (V, J) => (i(), f("div", ke({ key: J }, $e(t(X).events(V), !0), {
            onClick: (ye) => le(V),
            class: "vuefinder__breadcrumb__hidden-item"
          }), [
            s("div", da, [
              s("span", null, [
                D(t(Pe), { class: "vuefinder__breadcrumb__hidden-item-icon" })
              ]),
              b[7] || (b[7] = N()),
              s("span", ca, p(V.name), 1)
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
    containerPadding: c = 48
  } = e, m = n && typeof n.get == "function" ? O(n) : n, u = () => typeof r == "number" ? r : r.value, _ = y(0), d = y(6), a = y(600);
  let h = null;
  const g = ne(() => Math.ceil(m.value.length / d.value)), T = ne(() => g.value * u()), S = ne(() => {
    const B = u(), R = Math.max(0, Math.floor(_.value / B) - v), le = Math.min(g.value, Math.ceil((_.value + a.value) / B) + v);
    return { start: R, end: le };
  }), $ = ne(() => {
    const { start: B, end: R } = S.value;
    return Array.from({ length: R - B }, (le, z) => B + z);
  }), x = () => a.value, E = () => {
    if (o.value) {
      const B = o.value.clientWidth - c;
      d.value = Math.max(Math.floor(B / l), 2);
    }
  }, F = (B) => {
    const R = B.target;
    _.value = R.scrollTop;
  };
  de(() => m.value.length, () => {
    E();
  });
  const P = (B, R) => {
    const le = R * d.value;
    return B.slice(le, le + d.value);
  }, X = (B, R, le, z, ae) => {
    const L = [];
    for (let k = R; k <= le; k++)
      for (let C = z; C <= ae; C++) {
        const U = k * d.value + C;
        U < B.length && B[U] && L.push(B[U]);
      }
    return L;
  }, se = (B) => ({
    row: Math.floor(B / d.value),
    col: B % d.value
  });
  return ce(async () => {
    await Le(), o.value && (a.value = o.value.clientHeight || 600), E(), window.addEventListener("resize", () => {
      o.value && (a.value = o.value.clientHeight || 600), E();
    }), o.value && "ResizeObserver" in window && (h = new ResizeObserver((B) => {
      const R = B[0];
      R && (a.value = Math.round(R.contentRect.height)), E();
    }), h.observe(o.value));
  }), Ve(() => {
    window.removeEventListener("resize", E), h && (h.disconnect(), h = null);
  }), {
    scrollTop: _,
    itemsPerRow: d,
    totalRows: g,
    totalHeight: T,
    visibleRange: S,
    visibleRows: $,
    updateItemsPerRow: E,
    handleScroll: F,
    getRowItems: P,
    getItemsInRange: X,
    getItemPosition: se,
    getContainerHeight: x
  };
}
function _a(n) {
  const { getItemPosition: e, getItemsInRange: o, getKey: l, selectionObject: r, rowHeight: v, itemWidth: c } = n, m = Math.floor(Math.random() * 2 ** 32).toString(), _ = G("ServiceContainer").fs, d = O(_.selectedKeys), a = O(_.sortedFiles);
  O(_.selectedCount);
  const h = y(/* @__PURE__ */ new Set()), g = y(!1), T = y(!1), S = y(null), $ = (k) => k.map((C) => C.getAttribute("data-key")).filter((C) => !!C), x = (k) => {
    k.selection.getSelection().forEach((C) => {
      k.selection.deselect(C, !0);
    });
  }, E = (k) => {
    d.value && d.value.forEach((C) => {
      const U = document.querySelector(`[data-key="${C}"]`);
      U && k.selection.select(U, !0);
    });
  }, F = (k) => {
    if (k.size === 0) return null;
    const U = Array.from(k).map((b) => {
      const V = a.value?.findIndex((J) => l(J) === b) ?? -1;
      return e(V >= 0 ? V : 0);
    }), Y = Math.min(...U.map((b) => b.row)), W = Math.max(...U.map((b) => b.row)), Z = Math.min(...U.map((b) => b.col)), w = Math.max(...U.map((b) => b.col));
    return { minRow: Y, maxRow: W, minCol: Z, maxCol: w };
  }, P = (k) => {
    g.value = !1, !k.event?.metaKey && !k.event?.ctrlKey && (T.value = !0), k.selection.resolveSelectables(), x(k), E(k);
  }, X = ({ event: k, selection: C }) => {
    const U = k;
    U && "type" in U && U.type === "touchend" && U.preventDefault();
    const Y = k;
    if (!Y?.ctrlKey && !Y?.metaKey && (_.clearSelection(), C.clearSelection(!0, !0)), h.value.clear(), Y && r.value) {
      const W = r.value.getSelectables()[0]?.closest(".scroller-" + m);
      if (W) {
        const Z = W.getBoundingClientRect(), w = Y.clientY - Z.top + W.scrollTop, b = Y.clientX - Z.left, V = Math.floor(w / v.value), J = Math.floor(b / c);
        S.value = { row: V, col: J };
      }
    }
  }, se = (k) => {
    const C = k.selection, U = $(k.store.changed.added), Y = $(k.store.changed.removed);
    T.value = !1, g.value = !0, U.forEach((W) => {
      d.value && !d.value.has(W) && h.value.add(W), _.select(W);
    }), Y.forEach((W) => {
      document.querySelector(`[data-key="${W}"]`) && a.value?.find((w) => l(w) === W) && h.value.delete(W), _.deselect(W);
    }), C.resolveSelectables(), E(k);
  }, B = () => {
    h.value.clear();
  }, R = (k) => {
    if (k.event && S.value && h.value.size > 0) {
      const U = Array.from(h.value).map((Y) => {
        const W = a.value?.findIndex((Z) => l(Z) === Y) ?? -1;
        return W >= 0 ? e(W) : null;
      }).filter((Y) => Y !== null);
      if (U.length > 0) {
        const Y = [...U, S.value], W = {
          minRow: Math.min(...Y.map((Z) => Z.row)),
          maxRow: Math.max(...Y.map((Z) => Z.row)),
          minCol: Math.min(...Y.map((Z) => Z.col)),
          maxCol: Math.max(...Y.map((Z) => Z.col))
        };
        o(a.value || [], W.minRow, W.maxRow, W.minCol, W.maxCol).forEach(
          (Z) => {
            const w = l(Z);
            document.querySelector(`[data-key="${w}"]`) || _.select(w);
          }
        );
      }
    }
  }, le = (k) => {
    R(k), x(k), E(k), _.setSelectedCount(d.value?.size || 0), g.value = !1, S.value = null;
  }, z = () => {
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
    }), r.value.on("beforestart", P), r.value.on("start", X), r.value.on("move", se), r.value.on("stop", le);
  }, ae = () => {
    r.value && (r.value.destroy(), r.value = null);
  }, L = (k) => {
    T.value && (r.value?.clearSelection(), B(), T.value = !1);
    const C = k;
    !h.value.size && !T.value && !C?.ctrlKey && !C?.metaKey && (_.clearSelection(), r.value?.clearSelection());
  };
  return ce(() => {
    const k = (C) => {
      !C.buttons && g.value && (g.value = !1);
    };
    document.addEventListener("dragleave", k), Ve(() => {
      document.removeEventListener("dragleave", k);
    });
  }), {
    isDragging: g,
    selectionStarted: T,
    explorerId: m,
    extractIds: $,
    cleanupSelection: x,
    refreshSelection: E,
    getSelectionRange: F,
    selectSelectionRange: R,
    initializeSelectionArea: z,
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
  return i(), f("svg", ma, [...e[0] || (e[0] = [
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
  return i(), f("svg", pa, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const wa = { render: ga }, Be = /* @__PURE__ */ j({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, o) => (i(), f("div", null, [
      n.direction === "asc" ? (i(), I(t(ha), { key: 0 })) : M("", !0),
      n.direction === "desc" ? (i(), I(t(wa), { key: 1 })) : M("", !0)
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
  return i(), f("svg", ba, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const ka = { render: ya }, xa = { class: "vuefinder__drag-item__container" }, Sa = { class: "vuefinder__drag-item__count" }, $a = /* @__PURE__ */ j({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (o, l) => (i(), f("div", xa, [
      D(t(ka)),
      s("div", Sa, p(e.count), 1)
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
  return i(), f("svg", Ca, [...e[0] || (e[0] = [
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
}, lt = /* @__PURE__ */ j({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(n) {
    const e = n, o = G("ServiceContainer"), l = o.customIcon?.(o, e.item);
    return (r, v) => (i(), f("div", {
      class: Q(["vuefinder__item-icon", n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      t(l) ? (i(), I(Xe(t(l).is), Lt(ke({ key: 0 }, t(l).props || {})), null, 16)) : n.item.type === "dir" ? (i(), I(t(Pe), { key: 1 })) : (i(), I(t(Ma), { key: 2 })),
      !t(l) && n.ext && n.item.type !== "dir" && n.item.extension ? (i(), f("div", Ta, p(n.item.extension.substring(0, 3)), 1)) : M("", !0)
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
  return i(), f("svg", Aa, [...e[0] || (e[0] = [
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
}, Ha = { class: "vuefinder__explorer__item-list-name" }, qa = { class: "vuefinder__explorer__item-list-icon" }, Na = { class: "vuefinder__explorer__item-name" }, Pa = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Ua = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Oa = { key: 0 }, za = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Ka = /* @__PURE__ */ j({
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
    const o = n, l = e, r = G("ServiceContainer"), v = r.fs, c = r.config, m = ne(() => [
      "file-item-" + o.explorerId,
      o.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      o.isSelected ? "vf-explorer-selected" : ""
    ]), u = ne(() => ({
      opacity: o.isDragging || v.isCut(o.item.path) ? 0.5 : ""
    }));
    let _ = null;
    const d = y(null);
    let a = !1;
    const h = () => {
      _ && clearTimeout(_), g.value = !0;
    }, g = y(!0), T = (S) => {
      if (g.value = !1, _ && (S.preventDefault(), clearTimeout(_)), !a)
        a = !0, l("click", S), d.value = setTimeout(() => a = !1, 300);
      else
        return a = !1, l("dblclick", S), clearTimeout(_), !1;
      if (S.currentTarget && S.currentTarget instanceof HTMLElement) {
        const $ = S.currentTarget.getBoundingClientRect();
        S.preventDefault(), _ = setTimeout(() => {
          let F = $.y + $.height;
          F + 146 > window.innerHeight - 10 && (F = $.y - 146), F < 10 && (F = 10);
          const P = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: $.x,
            clientY: F
          });
          S.target?.dispatchEvent(P);
        }, 300);
      }
    };
    return (S, $) => (i(), f("div", {
      class: Q(m.value),
      style: Ce(u.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: g.value,
      onTouchstart: $[1] || ($[1] = (x) => T(x)),
      onTouchend: $[2] || ($[2] = (x) => h()),
      onClick: $[3] || ($[3] = (x) => l("click", x)),
      onDblclick: $[4] || ($[4] = (x) => l("dblclick", x)),
      onContextmenu: $[5] || ($[5] = we((x) => l("contextmenu", x), ["prevent", "stop"])),
      onDragstart: $[6] || ($[6] = (x) => l("dragstart", x)),
      onDragend: $[7] || ($[7] = (x) => l("dragend", x))
    }, [
      n.view === "grid" ? (i(), f("div", Fa, [
        s("div", La, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (i(), f("img", {
            key: 0,
            onTouchstart: $[0] || ($[0] = (x) => x.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": t(r).requester.getPreviewUrl(n.item.storage, n.item),
            alt: n.item.basename
          }, null, 40, Va)) : (i(), I(lt, {
            key: 1,
            item: n.item,
            ext: !0
          }, null, 8, ["item"]))
        ]),
        s("span", Ra, p(t(Qe)(n.item.basename)), 1)
      ])) : (i(), f("div", Ba, [
        s("div", Ha, [
          s("div", qa, [
            D(lt, {
              item: n.item,
              small: n.compact
            }, null, 8, ["item", "small"])
          ]),
          s("span", Na, p(n.item.basename), 1)
        ]),
        n.showPath ? (i(), f("div", Pa, p(n.item.path), 1)) : M("", !0),
        n.showPath ? M("", !0) : (i(), f("div", Ua, [
          n.item.file_size ? (i(), f("div", Oa, p(t(r).filesize(n.item.file_size)), 1)) : M("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (i(), f("div", za, p(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : M("", !0)
      ])),
      t(c).get("pinnedFolders").find((x) => x.path === n.item.path) ? (i(), I(t(xt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : M("", !0)
    ], 46, Ia));
  }
}), ja = ["data-row"], Ge = /* @__PURE__ */ j({
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
    })), c = ne(() => o.view === "grid" ? {
      gridTemplateColumns: `repeat(${o.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (m, u) => (i(), f("div", {
      class: Q(r.value),
      "data-row": n.rowIndex,
      style: Ce(v.value)
    }, [
      s("div", {
        class: Q(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Ce(c.value)
      }, [
        (i(!0), f(te, null, oe(n.items, (_, d) => (i(), I(Ka, ke({
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
        }, $e(n.dragNDropEvents(_)), {
          onClick: u[0] || (u[0] = (a) => l("click", a)),
          onDblclick: u[1] || (u[1] = (a) => l("dblclick", a)),
          onContextmenu: u[2] || (u[2] = (a) => l("contextmenu", a)),
          onDragstart: u[3] || (u[3] = (a) => l("dragstart", a)),
          onDragend: u[4] || (u[4] = (a) => l("dragend", a)),
          explorerId: n.explorerId
        }), null, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, ja));
  }
}), Ga = ["onClick"], Ya = /* @__PURE__ */ j({
  __name: "Toast",
  setup(n) {
    const e = G("ServiceContainer"), { getStore: o } = e.storage, l = y(o("full-screen", !1)), r = y([]), v = (u) => u === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (u) => {
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
      class: Q(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      D(Vt, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: K(() => [
          (i(!0), f(te, null, oe(r.value, (d, a) => (i(), f("div", {
            key: a,
            onClick: (h) => c(a),
            class: Q(["vuefinder__toast__message", v(d.type)])
          }, p(d.label), 11, Ga))), 128))
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
}, ei = /* @__PURE__ */ j({
  __name: "Explorer",
  setup(n) {
    const e = G("ServiceContainer"), o = Re(e, ["bg-blue-200", "dark:bg-slate-600"]), l = Ae("dragImage"), r = at(null), v = Ae("scrollContainer"), c = Ae("scrollContent"), m = e.search, u = e.fs, _ = e.config, d = O(_.state), a = O(m.state), h = O(u.sortedFiles), g = O(u.selectedKeys), T = O(u.loading), S = (A) => g.value?.has(A) ?? !1;
    let $ = null;
    const x = y(null), E = Ae("customScrollBar"), F = Ae("customScrollBarContainer"), P = ne(() => {
      const A = d.value.view, H = d.value.compactListView;
      return A === "grid" && !(a.value.searchMode && a.value.query.length) ? 88 : H ? 24 : 50;
    }), { t: X } = e.i18n, {
      itemsPerRow: se,
      totalHeight: B,
      visibleRows: R,
      handleScroll: le,
      getRowItems: z,
      getItemsInRange: ae,
      getItemPosition: L,
      updateItemsPerRow: k
    } = va(
      ne(() => h.value ?? []),
      {
        scrollContainer: v,
        itemWidth: 104,
        rowHeight: P,
        overscan: 2,
        containerPadding: 0
      }
    ), {
      explorerId: C,
      isDragging: U,
      initializeSelectionArea: Y,
      destroySelectionArea: W,
      handleContentClick: Z
    } = _a({
      getItemPosition: L,
      getItemsInRange: ae,
      getKey: (A) => A.path,
      selectionObject: r,
      rowHeight: P,
      itemWidth: 104
    }), w = y(null), b = (A) => {
      if (!A || !w.value) return !1;
      const H = g.value?.has(w.value) ?? !1;
      return U.value && (H ? g.value?.has(A) ?? !1 : A === w.value);
    };
    de(() => _.get("view"), (A) => {
      A === "list" ? se.value = 1 : k();
    }, { immediate: !0 }), de(se, (A) => {
      _.get("view") === "list" && A !== 1 && (se.value = 1);
    });
    const V = (A) => h.value?.[A];
    ce(() => {
      if (Y(), r.value && r.value.on("beforestart", ({ event: A }) => {
        const H = A?.target === c.value;
        if (!A?.metaKey && !A?.ctrlKey && !A?.altKey && !H)
          return !1;
      }), v.value && ($ = new Gt({
        elements_selector: ".lazy",
        container: v.value
      })), de(() => a.value.query, (A) => {
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
        const A = Je(F.value, {
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
    }), Ve(() => {
      W(), $ && ($.destroy(), $ = null), x.value && (x.value.destroy(), x.value = null);
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
      const ve = h.value?.find((ze) => ze.path === q);
      ve && ye(ve);
    }, _e = () => {
      const A = g.value;
      return h.value?.filter((H) => A?.has(H.path)) || [];
    }, Ee = (A) => {
      A.preventDefault();
      const H = A.target?.closest(".file-item-" + C);
      if (H) {
        const q = String(H.getAttribute("data-key")), ve = h.value?.find((ze) => ze.path === q);
        g.value?.has(q) || (u.clearSelection(), u.select(q)), e.emitter.emit("vf-contextmenu-show", { event: A, items: _e(), target: ve });
      }
    }, Me = (A) => {
      A.preventDefault(), e.emitter.emit("vf-contextmenu-show", { event: A, items: _e() });
    }, Ue = (A) => {
      if (A.altKey || A.ctrlKey || A.metaKey)
        return A.preventDefault(), !1;
      U.value = !0;
      const H = A.target?.closest(".file-item-" + C);
      if (w.value = H ? String(H.dataset.key) : null, A.dataTransfer && w.value) {
        A.dataTransfer.setDragImage(l.value, 0, 15), A.dataTransfer.effectAllowed = "all", A.dataTransfer.dropEffect = "copy";
        const q = g.value?.has(w.value) ? Array.from(g.value) : [w.value];
        A.dataTransfer.setData("items", JSON.stringify(q)), u.setDraggedItem(w.value);
      }
    }, Oe = () => {
      w.value = null;
    };
    return (A, H) => (i(), f("div", Wa, [
      s("div", {
        ref: "customScrollBarContainer",
        class: Q(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(d).view === "grid" }, { "search-active": t(a).hasQuery }]])
      }, [
        s("div", Qa, null, 512)
      ], 2),
      t(d).view === "list" || t(a).query.length ? (i(), f("div", Xa, [
        s("div", {
          onClick: H[0] || (H[0] = (q) => t(u).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          N(p(t(X)("Name")) + " ", 1),
          re(D(Be, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "basename"]
          ])
        ]),
        t(a).query.length ? M("", !0) : (i(), f("div", {
          key: 0,
          onClick: H[1] || (H[1] = (q) => t(u).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          N(p(t(X)("Size")) + " ", 1),
          re(D(Be, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "file_size"]
          ])
        ])),
        t(a).query.length ? (i(), f("div", {
          key: 1,
          onClick: H[2] || (H[2] = (q) => t(u).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          N(p(t(X)("Filepath")) + " ", 1),
          re(D(Be, {
            direction: t(u).sort.order
          }, null, 8, ["direction"]), [
            [ge, t(u).sort.active && t(u).sort.column === "path"]
          ])
        ])) : M("", !0),
        t(a).query.length ? M("", !0) : (i(), f("div", {
          key: 2,
          onClick: H[3] || (H[3] = (q) => t(u).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          N(p(t(X)("Date")) + " ", 1),
          re(D(Be, {
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
        t(_).get("loadingIndicator") === "linear" && t(T) ? (i(), f("div", Ja)) : M("", !0),
        t(_).get("loadingIndicator") === "circular" && t(T) ? (i(), f("div", Za)) : M("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: c,
          class: "scrollContent min-h-full",
          style: Ce({ height: `${t(B)}px`, position: "relative", width: "100%" }),
          onContextmenu: we(Me, ["self", "prevent"]),
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
            D($a, {
              count: w.value && t(g)?.has(w.value) ? t(g)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          t(a).query.length ? (i(!0), f(te, { key: 0 }, oe(t(R), (q) => (i(), I(Ge, {
            key: q,
            "row-index": q,
            "row-height": P.value,
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
            onContextmenu: Ee,
            onDragstart: Ue,
            onDragend: Oe
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(d).view === "grid" ? (i(!0), f(te, { key: 1 }, oe(t(R), (q) => (i(), I(Ge, {
            key: q,
            "row-index": q,
            "row-height": P.value,
            view: "grid",
            "items-per-row": t(se),
            items: t(z)(t(h), q),
            "show-thumbnails": t(d).showThumbnails,
            "is-dragging-item": b,
            "is-selected": S,
            "drag-n-drop-events": (ve) => t(o).events(ve),
            explorerId: t(C),
            onClick: J,
            onDblclick: he,
            onContextmenu: Ee,
            onDragstart: Ue,
            onDragend: Oe
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (i(!0), f(te, { key: 2 }, oe(t(R), (q) => (i(), I(Ge, {
            key: q,
            "row-index": q,
            "row-height": P.value,
            view: "list",
            items: V(q) ? [V(q)] : [],
            compact: t(d).compactListView,
            "is-dragging-item": b,
            "is-selected": S,
            "drag-n-drop-events": (ve) => t(o).events(ve),
            explorerId: t(C),
            onClick: J,
            onDblclick: he,
            onContextmenu: Ee,
            onDragstart: Ue,
            onDragend: Oe
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      D(Ya)
    ]));
  }
}), ti = ["href", "download"], ni = ["onClick"], oi = /* @__PURE__ */ j({
  __name: "ContextMenu",
  setup(n) {
    const e = G("ServiceContainer"), o = e.search, l = O(o.state), r = y(null), v = y([]), c = Ne({
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
      let T = d.clientX - h.left, S = d.clientY - h.top;
      c.active = !0, Le(() => {
        const $ = r.value?.getBoundingClientRect();
        let x = $?.height ?? 0, E = $?.width ?? 0;
        T = g.right - d.pageX + window.scrollX < E ? T - E : T, S = g.bottom - d.pageY + window.scrollY < x ? S - x : S, c.positions = {
          left: String(T) + "px",
          top: String(S) + "px"
        };
      });
    };
    return (d, a) => re((i(), f("ul", {
      ref_key: "contextmenu",
      ref: r,
      class: Q([c.active ? "vuefinder__context-menu--active" : "vuefinder__context-menu--inactive", "vuefinder__context-menu"]),
      style: Ce(c.positions)
    }, [
      (i(!0), f(te, null, oe(c.items, (h) => (i(), f("li", {
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
        ], 8, ti)) : (i(), f("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => u(h)
        }, [
          s("span", null, p(h.title(t(e).i18n)), 1)
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
  return i(), f("svg", si, [...e[0] || (e[0] = [
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
  return i(), f("svg", li, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const ii = { render: ai }, di = { class: "vuefinder__status-bar__wrapper" }, ci = { class: "vuefinder__status-bar__storage" }, ui = ["title"], vi = { class: "vuefinder__status-bar__storage-icon" }, _i = ["value"], mi = ["value"], fi = { class: "vuefinder__status-bar__info" }, hi = { key: 0 }, pi = { class: "vuefinder__status-bar__selected-count" }, gi = { class: "vuefinder__status-bar__actions" }, wi = ["disabled"], bi = ["title"], yi = /* @__PURE__ */ j({
  __name: "Statusbar",
  setup(n) {
    const e = G("ServiceContainer"), { t: o } = e.i18n, l = e.fs, r = e.search, v = O(r.state), c = O(l.sortedFiles), m = O(l.path), u = O(l.selectedCount), _ = O(l.storages), d = (h) => {
      const g = h.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: g } });
    }, a = ne(() => {
      const h = e.selectButton.multiple ? u.value > 0 : u.value === 1;
      return e.selectButton.active && h;
    });
    return (h, g) => (i(), f("div", di, [
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
            value: t(m)?.storage,
            onChange: d,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (i(!0), f(te, null, oe(t(_), (T) => (i(), f("option", {
              value: T,
              key: T
            }, p(T), 9, mi))), 128))
          ], 40, _i)
        ], 8, ui),
        s("div", fi, [
          t(v).hasQuery ? (i(), f("span", hi, p(t(c).value.length) + " items found. ", 1)) : M("", !0),
          s("span", pi, p(t(u) > 0 ? `${t(u)} item(s) selected.` : ""), 1)
        ])
      ]),
      s("div", gi, [
        t(e).selectButton.active ? (i(), f("button", {
          key: 0,
          class: Q(["vf-btn vf-btn-primary vf-btn-small", { disabled: !a.value }]),
          disabled: !a.value,
          onClick: g[0] || (g[0] = (T) => t(e).selectButton.click(t(l).selectedItems, T))
        }, p(t(o)("Select")), 11, wi)) : M("", !0),
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
  return i(), f("svg", ki, [...e[0] || (e[0] = [
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
  return i(), f("svg", Si, [...e[0] || (e[0] = [
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
  return i(), f("svg", Ei, [...e[0] || (e[0] = [
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
  return i(), f("svg", Ti, [...e[0] || (e[0] = [
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
}, Tt = /* @__PURE__ */ j({
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
    const e = n, o = G("ServiceContainer"), { t: l } = o.i18n, r = it(n, "modelValue"), v = y(!1);
    de(
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
        Mt(o.treeViewData, { path: e.path, type: "dir", ...u });
      }).catch((u) => {
      }).finally(() => {
        v.value = !1;
      });
    };
    return (u, _) => (i(), f("div", Di, [
      v.value ? (i(), I(t(nt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (i(), f("div", Ii, [
        r.value && c()?.folders.length ? (i(), I(t(Et), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : M("", !0),
        r.value ? M("", !0) : (i(), I(t(Ct), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Fi = ["onClick"], Li = ["title", "onDblclick", "onClick"], Vi = { class: "vuefinder__treesubfolderlist__item-icon" }, Ri = { class: "vuefinder__treesubfolderlist__subfolder" }, Bi = /* @__PURE__ */ j({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = G("ServiceContainer"), o = e.fs, l = Re(e, ["bg-blue-200", "dark:bg-slate-600"]), r = y({}), v = O(o.path), c = n, m = y(null);
    ce(() => {
      c.path === c.storage + "://" && m.value && Je(m.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const u = ne(() => e.treeViewData.find((_) => _.path === c.path)?.folders || []);
    return (_, d) => {
      const a = Ht("TreeSubfolderList", !0);
      return i(), f("ul", {
        ref_key: "parentSubfolderList",
        ref: m,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (i(!0), f(te, null, oe(u.value, (h) => (i(), f("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", ke($e(t(l).events({ ...h, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
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
            ], 8, Fi),
            s("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: h.path,
              onDblclick: (g) => r.value[h.path] = !r.value[h.path],
              onClick: (g) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: c.storage, path: h.path } })
            }, [
              s("div", Vi, [
                t(v)?.path === h.path ? (i(), I(t($t), { key: 0 })) : (i(), I(t(Pe), { key: 1 }))
              ]),
              s("div", {
                class: Q(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(v)?.path === h.path
                }])
              }, p(h.basename), 3)
            ], 40, Li)
          ], 16),
          s("div", Ri, [
            re(D(a, {
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
}), Hi = /* @__PURE__ */ j({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = G("ServiceContainer"), o = e.fs, l = y(!1), r = n, v = Re(e, ["bg-blue-200", "dark:bg-slate-600"]), c = O(o.path), m = ne(() => r.storage === c.value?.storage), u = {
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
    return (d, a) => (i(), f(te, null, [
      s("div", {
        onClick: a[2] || (a[2] = (h) => _(n.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        s("div", ke($e(t(v).events(u), !0), {
          class: ["vuefinder__treestorageitem__info", m.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          s("div", {
            class: Q(["vuefinder__treestorageitem__icon", m.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            D(t(St))
          ], 2),
          s("div", null, p(n.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: a[1] || (a[1] = we((h) => l.value = !l.value, ["stop"]))
        }, [
          D(Tt, {
            storage: n.storage,
            path: n.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": a[0] || (a[0] = (h) => l.value = h)
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
}), qi = { class: "vuefinder__folder-indicator" }, Ni = { class: "vuefinder__folder-indicator--icon" }, Pi = /* @__PURE__ */ j({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = it(n, "modelValue");
    return (o, l) => (i(), f("div", qi, [
      s("div", Ni, [
        e.value ? (i(), I(t(Et), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : M("", !0),
        e.value ? M("", !0) : (i(), I(t(Ct), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Ui = { class: "vuefinder__treeview__header" }, Oi = { class: "vuefinder__treeview__pinned-label" }, zi = { class: "vuefinder__treeview__pin-text text-nowrap" }, Ki = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, ji = ["onClick"], Gi = ["title"], Yi = ["onClick"], Wi = { key: 0 }, Qi = { class: "vuefinder__treeview__no-pinned" }, Xi = /* @__PURE__ */ j({
  __name: "TreeView",
  setup(n) {
    const e = G("ServiceContainer"), { t: o } = e.i18n, { getStore: l, setStore: r } = e.storage, v = e.fs, c = e.config, m = O(c.state), u = O(v.sortedFiles), _ = O(v.path), d = Re(e, ["bg-blue-200", "dark:bg-slate-600"]), a = y(190), h = y(l("pinned-folders-opened", !0));
    de(h, ($) => r("pinned-folders-opened", $));
    const g = ($) => {
      c.set("pinnedFolders", c.get("pinnedFolders").filter((x) => x.path !== $.path));
    }, T = ($) => {
      const x = $.clientX, E = $.target.parentElement;
      if (!E) return;
      const F = E.getBoundingClientRect().width;
      E.classList.remove("transition-[width]"), E.classList.add("transition-none");
      const P = (se) => {
        a.value = F + se.clientX - x, a.value < 50 && (a.value = 0, c.set("showTreeView", !1)), a.value > 50 && c.set("showTreeView", !0);
      }, X = () => {
        const se = E.getBoundingClientRect();
        a.value = se.width, E.classList.add("transition-[width]"), E.classList.remove("transition-none"), window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", X);
      };
      window.addEventListener("mousemove", P), window.addEventListener("mouseup", X);
    }, S = y(null);
    return ce(() => {
      S.value && Je(S.value, {
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
        path: _.value?.path || "",
        folders: x.map((E) => ({
          storage: E.storage,
          path: E.path,
          basename: E.basename,
          type: "dir"
        }))
      });
    }), ($, x) => (i(), f(te, null, [
      s("div", {
        onClick: x[0] || (x[0] = (E) => t(c).toggle("showTreeView")),
        class: Q(["vuefinder__treeview__overlay", t(m).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      s("div", {
        style: Ce(t(m).showTreeView ? "min-width:100px;max-width:75%; width: " + a.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: S,
          class: "vuefinder__treeview__scroll"
        }, [
          s("div", Ui, [
            s("div", {
              onClick: x[2] || (x[2] = (E) => h.value = !h.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              s("div", Oi, [
                D(t(xt), { class: "vuefinder__treeview__pin-icon" }),
                s("div", zi, p(t(o)("Pinned Folders")), 1)
              ]),
              D(Pi, {
                modelValue: h.value,
                "onUpdate:modelValue": x[1] || (x[1] = (E) => h.value = E)
              }, null, 8, ["modelValue"])
            ]),
            h.value ? (i(), f("ul", Ki, [
              (i(!0), f(te, null, oe(t(m).pinnedFolders, (E) => (i(), f("li", {
                key: E.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", ke($e(t(d).events(E), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (F) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: E.storage, path: E.path } })
                }), [
                  t(_)?.path !== E.path ? (i(), I(t(Pe), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : M("", !0),
                  t(_)?.path === E.path ? (i(), I(t($t), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : M("", !0),
                  s("div", {
                    title: E.path,
                    class: Q(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": t(_)?.path === E.path
                    }])
                  }, p(E.basename), 11, Gi)
                ], 16, ji),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (F) => g(E)
                }, [
                  D(t(Ci), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Yi)
              ]))), 128)),
              t(m).pinnedFolders.length ? M("", !0) : (i(), f("li", Wi, [
                s("div", Qi, p(t(o)("No folders pinned")), 1)
              ]))
            ])) : M("", !0)
          ]),
          (i(!0), f(te, null, oe(t(v).storages.get(), (E) => (i(), f("div", {
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
function Ye(...n) {
  return (e, o) => n.some((l) => l(e, o));
}
function Fe(...n) {
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
    show: Ye(ue({ target: "none" }), ue({ target: "many" }))
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
      const o = n.config, l = o.get("pinnedFolders"), r = l.concat(e.filter((v) => l.findIndex((c) => c.path === v.path) === -1));
      o.set("pinnedFolders", r);
    },
    show: Fe(
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
    show: Fe(
      ue({ target: "one", targetType: "dir" }),
      (n, e) => n.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) !== -1
    )
  },
  {
    id: fe.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(mt, { storage: e[0]?.storage, item: e[0] }),
    show: Fe(
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
    show: Fe(
      ue({ target: "one", feature: ee.DOWNLOAD }),
      (n, e) => e.target?.type !== "dir"
    )
  },
  {
    id: fe.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(et, { items: e }),
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
    show: Ye(
      ue({ target: "many", feature: ee.ARCHIVE }),
      Fe(
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
      n.modal.open(Ze, { items: e });
    },
    show: Ye(
      ue({ feature: ee.DELETE, target: "one" }),
      ue({ feature: ee.DELETE, target: "many" })
    )
  }
], ed = {
  class: "vuefinder",
  ref: "root",
  tabindex: "0"
}, td = { class: "vuefinder__main__content" }, nd = /* @__PURE__ */ j({
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
    const o = e, l = n, r = dn(l, G("VueFinderOptions"));
    qt("ServiceContainer", r);
    const v = r.config, c = r.fs, m = O(v.state), u = O(c.selectedItems);
    Qs(r);
    let _ = null;
    r.emitter.on("vf-fetch-abort", () => {
      _ && _.abort(), c.setLoading(!1);
    }), r.emitter.on("vf-fetch", ({ params: a, body: h = null, onSuccess: g = null, onError: T = null, noCloseModal: S = !1 }) => {
      ["index", "search"].includes(a.q) && (_ && _.abort(), c.setLoading(!0)), a.adapter = a.storage, _ = new AbortController();
      const $ = _.signal;
      r.requester.send({
        url: "",
        method: a.m || "get",
        params: a,
        body: h,
        abortSignal: $
      }).then((x) => {
        c.setPath(x.dirname), v.get("persist") && v.set("path", x.dirname), S || r.modal.close(), c.setFiles(x.files), c.clearSelection(), c.setSelectedCount(0), c.setStorages(x.storages), g && g(x);
      }).catch((x) => {
        console.error(x), T ? T(x) : x && typeof x == "object" && "message" in x && r.emitter.emit("vf-toast-push", { label: x.message, type: "error" });
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
    return ce(() => {
      de(() => l.path, (h) => {
        d(h);
      });
      const a = v.get("persist") ? v.get("path") : l.path;
      c.setPath(a), d(a), r.emitter.on("vf-select", (h) => {
        r.selectedItems = h, o("select", h);
      }), de(() => c.path.get().path, (h) => {
        o("update:path", h);
      }), de(u, (h) => {
        o("select", h);
      });
    }), (a, h) => (i(), f("div", ed, [
      s("div", {
        class: Q(t(r).theme.actualValue)
      }, [
        s("div", {
          class: Q([t(m).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: Ce(t(m).fullScreen ? "" : "max-height: " + n.maxHeight),
          onMousedown: h[0] || (h[0] = (g) => t(r).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (g) => t(r).emitter.emit("vf-contextmenu-hide"))
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
          default: K(() => [
            t(r).modal.visible ? (i(), I(Xe(t(r).modal.type), { key: 0 })) : M("", !0)
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
