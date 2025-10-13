import { reactive as wt, watch as _e, ref as k, shallowRef as di, useTemplateRef as Xe, defineComponent as K, inject as G, onMounted as be, nextTick as ct, createElementBlock as p, openBlock as f, withKeys as st, unref as a, createElementVNode as u, withModifiers as Ee, renderSlot as Re, createBlock as C, resolveDynamicComponent as Qe, toDisplayString as _, onUnmounted as dt, normalizeClass as ee, computed as ce, withCtx as W, createVNode as A, createCommentVNode as E, Fragment as oe, renderList as re, createTextVNode as U, withDirectives as ae, vModelSelect as Qt, vModelText as rt, resolveComponent as Le, vShow as Ce, mergeProps as Me, onBeforeUnmount as en, customRef as tn, toHandlers as qe, isRef as nn, Teleport as on, normalizeStyle as Ye, normalizeProps as sn, TransitionGroup as rn, onUpdated as an, mergeModels as ln, useModel as hi, provide as cn, Transition as un } from "vue";
import { useStore as N } from "@nanostores/vue";
import dn from "mitt";
import { persistentAtom as hn } from "@nanostores/persistent";
import { atom as Te, computed as tt } from "nanostores";
import mn from "@uppy/core";
import fn from "@uppy/xhr-upload";
import vn from "@viselect/vanilla";
import pn from "vanilla-lazyload";
import { OverlayScrollbars as jt } from "overlayscrollbars";
const $t = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
class gn {
  config;
  constructor(t) {
    this.config = Object.assign({
      baseUrl: "",
      headers: {},
      params: {},
      body: {},
      xsrfHeaderName: "X-CSRF-Token",
      fetchParams: {}
    }, t);
  }
  customFetch = async (...t) => {
    let [i, n] = t;
    this.config.fetchRequestInterceptor && (n = this.config.fetchRequestInterceptor(n));
    let s = await fetch(i, n);
    return this.config.fetchResponseInterceptor && (s = await this.config.fetchResponseInterceptor(s)), s;
  };
  transformRequestParams(t) {
    const i = this.config, n = {};
    $t != null && $t !== "" && i.xsrfHeaderName && (n[i.xsrfHeaderName] = $t);
    const s = Object.assign({}, i.headers, n, t.headers), o = Object.assign({}, i.params, t.params), l = i.baseUrl + t.url, c = t.method;
    let r;
    if (c !== "get")
      if (t.body instanceof FormData) {
        const h = t.body;
        i.body != null && Object.entries(this.config.body).forEach(([d, v]) => {
          h.append(d, String(v));
        }), r = h;
      } else {
        const h = Object.assign({}, t.body ?? {});
        i.body != null && Object.assign(h, this.config.body), r = h;
      }
    const m = { url: l, method: c, headers: s, params: o, body: r };
    if (i.transformRequest != null) {
      const h = i.transformRequest({ url: l, method: c, headers: s, params: o, body: r ?? null });
      h.url != null && (m.url = h.url), h.method != null && (m.method = h.method), h.params != null && (m.params = h.params), h.headers != null && (m.headers = h.headers), h.body != null && (m.body = h.body);
    }
    return m;
  }
  getDownloadUrl(t, i) {
    if (i.url != null) return i.url;
    const n = this.transformRequestParams({ url: "", method: "get", params: { q: "download", storage: t, adapter: t, path: i.path } });
    return n.url + "?" + new URLSearchParams(n.params).toString();
  }
  getPreviewUrl(t, i) {
    if (i.url != null) return i.url;
    const n = this.transformRequestParams({ url: "", method: "get", params: { q: "preview", storage: t, adapter: t, path: i.path } });
    return n.url + "?" + new URLSearchParams(n.params).toString();
  }
  async send(t) {
    const i = this.transformRequestParams(t), n = t.responseType || "json", s = { method: t.method, headers: i.headers, signal: t.abortSignal }, o = i.url + "?" + new URLSearchParams(i.params);
    if (i.method !== "get" && i.body != null) {
      let c;
      i.body instanceof FormData ? c = t.body : (c = JSON.stringify(i.body), s.headers["Content-Type"] = "application/json"), s.body = c;
    }
    this.config.fetchParams && Object.assign(s, this.config.fetchParams);
    const l = await this.customFetch(o, s);
    if (l.ok) return await l[n]();
    throw await l.json();
  }
}
function _n(e) {
  const t = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof e == "string" ? Object.assign(t, { baseUrl: e }) : Object.assign(t, e), new gn(t);
}
function bn(e) {
  let t = localStorage.getItem(e + "_storage");
  const i = wt(JSON.parse(t ?? "{}"));
  _e(i, n);
  function n() {
    Object.keys(i).length ? localStorage.setItem(e + "_storage", JSON.stringify(i)) : localStorage.removeItem(e + "_storage");
  }
  function s(r, m) {
    i[r] = m;
  }
  function o(r) {
    delete i[r];
  }
  function l() {
    Object.keys(i).forEach((r) => o(r));
  }
  return { getStore: (r, m = null) => r in i ? i[r] : m, setStore: s, removeStore: o, clearStore: l };
}
async function wn(e, t) {
  const i = t[e];
  return typeof i == "function" ? (await i()).default : i;
}
function yn(e, t, i, n) {
  const { getStore: s, setStore: o } = e, l = k({}), c = k(s("locale", t)), r = (d, v = t) => {
    wn(d, n).then((g) => {
      l.value = g, o("locale", d), c.value = d, o("translations", g), Object.values(n).length > 1 && (i.emit("vf-toast-push", { label: "The language is set to " + d }), i.emit("vf-language-saved"));
    }).catch(() => {
      v ? (i.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), r(v, null)) : i.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  _e(c, (d) => {
    r(d);
  }), !s("locale") && !Object.keys(n).length ? r(t) : l.value = s("translations");
  const m = (d, ...v) => v.length ? m(d = d.replace("%s", String(v.shift())), ...v) : d;
  function h(d, ...v) {
    return l.value && Object.prototype.hasOwnProperty.call(l.value, d) ? m(l.value[d] || d, ...v) : m(d, ...v);
  }
  return wt({ t: h, locale: c });
}
const ne = {
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
}, xn = Object.values(ne), Sn = "3.0.0-dev";
function mi(e, t, i, n, s) {
  return t = Math, i = t.log, n = 1024, s = i(e) / i(n) | 0, (e / t.pow(n, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function fi(e, t, i, n, s) {
  return t = Math, i = t.log, n = 1e3, s = i(e) / i(n) | 0, (e / t.pow(n, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function kn(e) {
  if (typeof e == "number") return e;
  const t = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(e);
  if (!n) return 0;
  const s = parseFloat(n[1] || "0"), o = (n[2] || "").toLowerCase(), l = t[o] ?? 0;
  return Math.round(s * Math.pow(1024, l));
}
const Ue = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function Cn(e, t) {
  const i = k(Ue.SYSTEM), n = k(Ue.LIGHT);
  i.value = e.getStore("theme", t ?? Ue.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), o = (l) => {
    i.value === Ue.DARK || i.value === Ue.SYSTEM && l.matches ? n.value = Ue.DARK : n.value = Ue.LIGHT;
  };
  return o(s), s.addEventListener("change", o), {
    value: i,
    actualValue: n,
    set(l) {
      i.value = l, l !== Ue.SYSTEM ? e.setStore("theme", l) : e.removeStore("theme"), o(s);
    }
  };
}
function $n() {
  const e = di(null), t = k(!1), i = k();
  return { visible: t, type: e, data: i, open: (o, l = null) => {
    document.querySelector("body").style.overflow = "hidden", t.value = !0, e.value = o, i.value = l;
  }, close: () => {
    document.querySelector("body").style.overflow = "", t.value = !1, e.value = null;
  } };
}
const At = {
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
}, An = (e) => {
  const t = `vuefinder_config_${e}`, i = hn(t, At, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), n = (m = {}) => {
    const h = i.get(), d = { ...At, ...m, ...h };
    i.set(d);
  }, s = (m) => i.get()[m], o = () => i.get(), l = (m, h) => {
    const d = i.get();
    typeof m == "object" && m !== null ? i.set({ ...d, ...m }) : i.set({ ...d, [m]: h });
  };
  return {
    // Store atom
    state: i,
    // Methods
    init: n,
    get: s,
    set: l,
    toggle: (m) => {
      const h = i.get();
      l(m, !h[m]);
    },
    all: o,
    reset: () => {
      i.set({ ...At });
    }
  };
};
function Mn(e, t) {
  if (typeof e == "string" && typeof t == "string")
    return e.toLowerCase().localeCompare(t.toLowerCase());
  const i = Number(e) || 0, n = Number(t) || 0;
  return i === n ? 0 : i < n ? -1 : 1;
}
const En = () => {
  const e = Te(""), t = Te([]), i = Te([]), n = Te({ active: !1, column: "", order: "" }), s = Te(/* @__PURE__ */ new Set()), o = Te({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), l = Te(null), c = Te(0), r = Te(!1), m = tt([e], (S) => {
    const z = (S || "local://").trim(), se = z.indexOf("://"), fe = se >= 0 ? z.slice(0, se) : "", Ke = (se >= 0 ? z.slice(se + 3) : z).split("/").filter(Boolean);
    let Be = "";
    const Ge = Ke.map((je) => (Be = Be ? `${Be}/${je}` : je, { basename: je, name: je, path: fe ? `${fe}://${Be}` : Be, type: "dir" }));
    return { storage: fe, breadcrumb: Ge, path: z };
  }), h = tt([i, n], (S, z) => {
    const { active: se, column: fe, order: We } = z;
    if (!se || !fe) return S;
    const Ke = We === "asc" ? 1 : -1;
    return S.slice().sort((Be, Ge) => Mn(Be[fe], Ge[fe]) * Ke);
  }), d = tt([i, s], (S, z) => z.size === 0 ? [] : S.filter((se) => z.has(se.path))), v = (S) => {
    e.set(S);
  }, g = (S) => {
    i.set(S ?? []);
  }, w = (S) => {
    t.set(S ?? []);
  }, b = (S, z) => {
    n.set({ active: !0, column: S, order: z });
  }, x = (S) => {
    const z = n.get();
    z.active && z.column === S ? n.set({
      active: z.order === "asc",
      column: S,
      order: "desc"
    }) : n.set({
      active: !0,
      column: S,
      order: "asc"
    });
  }, y = () => {
    n.set({ active: !1, column: "", order: "" });
  }, M = (S) => {
    const z = new Set(s.get());
    z.add(S), s.set(z), c.set(z.size);
  }, T = (S) => {
    const z = new Set(s.get());
    z.delete(S), s.set(z), c.set(z.size);
  }, F = (S) => {
    const z = new Set(s.get());
    z.has(S) ? z.delete(S) : z.add(S), s.set(z), c.set(z.size);
  }, te = () => {
    const S = new Set(i.get().map((z) => z.path));
    s.set(S), c.set(S.size);
  }, le = () => {
    s.set(/* @__PURE__ */ new Set()), c.set(0);
  }, O = (S) => {
    const z = new Set(S ?? []);
    s.set(z), c.set(z.size);
  }, H = (S) => {
    c.set(S);
  }, ue = (S) => {
    r.set(!!S);
  }, q = () => r.get(), he = (S, z) => {
    const se = i.get().filter((fe) => z.has(fe.path));
    o.set({
      type: S,
      path: m.get().path,
      items: new Set(se)
    });
  }, I = (S) => tt([o], (z) => z.type === "cut" && Array.from(z.items).some((se) => se.path === S)), $ = (S) => tt([o], (z) => z.type === "copy" && Array.from(z.items).some((se) => se.path === S));
  return {
    // Atoms (state)
    files: i,
    storages: t,
    currentPath: e,
    sort: n,
    selectedKeys: s,
    selectedCount: c,
    loading: r,
    draggedItem: l,
    clipboardItems: o,
    // Computed values
    path: m,
    sortedFiles: h,
    selectedItems: d,
    // Actions
    setPath: v,
    setFiles: g,
    setStorages: w,
    setSort: b,
    toggleSort: x,
    clearSort: y,
    select: M,
    deselect: T,
    toggleSelect: F,
    selectAll: te,
    clearSelection: le,
    setSelection: O,
    setSelectedCount: H,
    setLoading: ue,
    isLoading: q,
    setClipboard: he,
    createIsCut: I,
    createIsCopied: $,
    isCut: (S) => {
      const z = I(S);
      return N(z).value ?? !1;
    },
    isCopied: (S) => {
      const z = $(S);
      return N(z).value ?? !1;
    },
    clearClipboard: () => {
      o.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
    },
    getClipboard: () => o.get(),
    setDraggedItem: (S) => {
      l.set(S);
    },
    getDraggedItem: () => l.get(),
    clearDraggedItem: () => {
      l.set(null);
    }
  };
}, Zt = {
  query: "",
  searchMode: !1
}, Rn = () => {
  const e = Te(Zt), t = tt(e, (m) => m.query.length > 0);
  return {
    // Store atom
    state: e,
    // Computed values
    hasQuery: t,
    // Methods
    setQuery: (m) => {
      const h = e.get();
      e.set({ ...h, query: m ?? "" });
    },
    enterSearchMode: () => {
      const m = e.get();
      e.set({ ...m, searchMode: !0 });
    },
    exitSearchMode: () => {
      e.set({ query: "", searchMode: !1 });
    },
    get: (m) => e.get()[m],
    set: (m, h) => {
      const d = e.get();
      typeof m == "object" && m !== null ? e.set({ ...d, ...m }) : e.set({ ...d, [m]: h });
    },
    all: () => e.get(),
    reset: () => {
      e.set({ ...Zt });
    }
  };
}, zn = (e, t) => {
  const i = bn(e.id), n = dn(), s = Cn(i, e.theme), o = t.i18n, l = e.locale ?? t.locale, c = An(e.id), r = En(), m = Rn(), h = (d) => Array.isArray(d) ? d : xn;
  return wt({
    // app version
    version: Sn,
    // config store
    config: c,
    // files store
    fs: r,
    // search store
    search: m,
    // root element
    root: Xe("root"),
    // app id
    debug: e.debug,
    // Event Bus
    emitter: n,
    // storage
    storage: i,
    // localization object
    i18n: yn(i, l, n, o),
    // modal state
    modal: $n(),
    // http object
    requester: _n(e.request),
    // active features
    features: h(e.features),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // theme state
    theme: s,
    // human readable file sizes
    filesize: c.get("metricUnits") ? fi : mi,
    // possible items of the context menu
    contextMenuItems: e.contextMenuItems,
    // custom icon
    customIcon: e.icon,
    // selectButton state
    selectButton: e.selectButton
  });
}, Tn = { class: "vuefinder__modal-layout__container" }, Dn = { class: "vuefinder__modal-layout__content" }, In = { class: "vuefinder__modal-layout__footer" }, Fe = /* @__PURE__ */ K({
  __name: "ModalLayout",
  setup(e) {
    const t = k(null), i = G("ServiceContainer");
    return be(() => {
      const n = document.querySelector(".v-f-modal input");
      n && n.focus(), ct(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && t.value) {
          const s = t.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (n, s) => (f(), p("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = st((o) => a(i).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = u("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      u("div", Tn, [
        u("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = Ee((o) => a(i).modal.close(), ["self"]))
        }, [
          u("div", {
            ref_key: "modalBody",
            ref: t,
            class: "vuefinder__modal-layout__body"
          }, [
            u("div", Dn, [
              Re(n.$slots, "default")
            ]),
            u("div", In, [
              Re(n.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}), Ln = { class: "vuefinder__modal-header" }, Hn = { class: "vuefinder__modal-header__icon-container" }, Fn = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Ve = /* @__PURE__ */ K({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(e) {
    return (t, i) => (f(), p("div", Ln, [
      u("div", Hn, [
        (f(), C(Qe(e.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      u("h3", Fn, _(e.title), 1)
    ]));
  }
}), Bn = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(e, { emit: t, slots: i }) {
    const n = G("ServiceContainer"), s = k(!1), { t: o } = n.i18n;
    let l = null;
    const c = () => {
      clearTimeout(l), s.value = !0, l = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return be(() => {
      n.emitter.on(e.on, c);
    }), dt(() => {
      clearTimeout(l);
    }), {
      shown: s,
      t: o
    };
  }
}, On = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [n, s] of t)
    i[n] = s;
  return i;
}, Pn = { key: 1 };
function Vn(e, t, i, n, s, o) {
  return f(), p("div", {
    class: ee(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    e.$slots.default ? Re(e.$slots, "default", { key: 0 }) : (f(), p("span", Pn, _(n.t("Saved.")), 1))
  ], 2);
}
const Je = /* @__PURE__ */ On(Bn, [["render", Vn]]), Wn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function jn(e, t) {
  return f(), p("svg", Wn, [...t[0] || (t[0] = [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const Un = { render: jn }, Nn = { class: "vuefinder__about-modal__content" }, qn = { class: "vuefinder__about-modal__main" }, Yn = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Kn = ["onClick", "aria-current"], Gn = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Xn = { class: "vuefinder__about-modal__description" }, Qn = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Zn = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Jn = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, eo = { class: "vuefinder__about-modal__description" }, to = { class: "vuefinder__about-modal__settings" }, io = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, no = { class: "vuefinder__about-modal__setting-input" }, oo = ["checked"], so = { class: "vuefinder__about-modal__setting-label" }, ro = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, ao = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, lo = { class: "vuefinder__about-modal__setting-input" }, co = ["checked"], uo = { class: "vuefinder__about-modal__setting-label" }, ho = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, mo = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, fo = { class: "vuefinder__about-modal__setting-input" }, vo = ["checked"], po = { class: "vuefinder__about-modal__setting-label" }, go = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, _o = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, bo = { class: "vuefinder__about-modal__setting-input" }, wo = ["checked"], yo = { class: "vuefinder__about-modal__setting-label" }, xo = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, So = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, ko = { class: "vuefinder__about-modal__setting-input" }, Co = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, $o = { class: "vuefinder__about-modal__setting-label" }, Ao = ["label"], Mo = ["value"], Eo = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Ro = { class: "vuefinder__about-modal__setting-input" }, zo = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, To = { class: "vuefinder__about-modal__setting-label" }, Do = ["label"], Io = ["value"], Lo = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Ho = { class: "vuefinder__about-modal__shortcuts" }, Fo = { class: "vuefinder__about-modal__shortcut" }, Bo = { class: "vuefinder__about-modal__shortcut" }, Oo = { class: "vuefinder__about-modal__shortcut" }, Po = { class: "vuefinder__about-modal__shortcut" }, Vo = { class: "vuefinder__about-modal__shortcut" }, Wo = { class: "vuefinder__about-modal__shortcut" }, jo = { class: "vuefinder__about-modal__shortcut" }, Uo = { class: "vuefinder__about-modal__shortcut" }, No = { class: "vuefinder__about-modal__shortcut" }, qo = { class: "vuefinder__about-modal__shortcut" }, Yo = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Ko = { class: "vuefinder__about-modal__description" }, vi = /* @__PURE__ */ K({
  __name: "ModalAbout",
  setup(e) {
    const t = G("ServiceContainer"), i = t.config, { clearStore: n } = t.storage, { t: s } = t.i18n, o = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, l = ce(() => [
      { name: s("About"), key: o.ABOUT, current: !1 },
      { name: s("Settings"), key: o.SETTINGS, current: !1 },
      { name: s("Shortcuts"), key: o.SHORTCUTS, current: !1 },
      { name: s("Reset"), key: o.RESET, current: !1 }
    ]), c = k("about"), r = async () => {
      i.reset(), n(), location.reload();
    }, m = (M) => {
      t.theme.set(M), t.emitter.emit("vf-theme-saved");
    }, h = () => {
      i.toggle("metricUnits"), t.filesize = i.get("metricUnits") ? fi : mi, t.emitter.emit("vf-metric-units-saved");
    }, d = () => {
      i.toggle("compactListView"), t.emitter.emit("vf-compact-view-saved");
    }, v = () => {
      i.toggle("showThumbnails"), t.emitter.emit("vf-show-thumbnails-saved");
    }, g = () => {
      i.toggle("persist"), t.emitter.emit("vf-persist-path-saved");
    }, { i18n: w } = G("VueFinderOptions"), x = Object.fromEntries(
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
      }).filter(([M]) => Object.keys(w).includes(M))
    ), y = ce(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (M, T) => (f(), C(Fe, null, {
      buttons: W(() => [
        u("button", {
          type: "button",
          onClick: T[3] || (T[3] = (F) => a(t).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Close")), 1)
      ]),
      default: W(() => [
        u("div", Nn, [
          A(Ve, {
            icon: a(Un),
            title: "Vuefinder " + a(t).version
          }, null, 8, ["icon", "title"]),
          u("div", qn, [
            u("div", null, [
              u("div", null, [
                u("nav", Yn, [
                  (f(!0), p(oe, null, re(l.value, (F) => (f(), p("button", {
                    key: F.name,
                    onClick: (te) => c.value = F.key,
                    class: ee([F.key === c.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": F.current ? "page" : void 0
                  }, _(F.name), 11, Kn))), 128))
                ])
              ])
            ]),
            c.value === o.ABOUT ? (f(), p("div", Gn, [
              u("div", Xn, _(a(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              u("a", Qn, _(a(s)("Project home")), 1),
              u("a", Zn, _(a(s)("Follow on GitHub")), 1)
            ])) : E("", !0),
            c.value === o.SETTINGS ? (f(), p("div", Jn, [
              u("div", eo, _(a(s)("Customize your experience with the following settings")), 1),
              u("div", to, [
                u("fieldset", null, [
                  u("div", io, [
                    u("div", no, [
                      u("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: a(i).get("metricUnits"),
                        onChange: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, oo)
                    ]),
                    u("div", so, [
                      u("label", ro, [
                        U(_(a(s)("Use Metric Units")) + " ", 1),
                        A(Je, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: W(() => [
                            U(_(a(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  u("div", ao, [
                    u("div", lo, [
                      u("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: a(i).get("compactListView"),
                        onChange: d,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, co)
                    ]),
                    u("div", uo, [
                      u("label", ho, [
                        U(_(a(s)("Compact list view")) + " ", 1),
                        A(Je, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: W(() => [
                            U(_(a(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  u("div", mo, [
                    u("div", fo, [
                      u("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: a(i).get("persist"),
                        onChange: g,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, vo)
                    ]),
                    u("div", po, [
                      u("label", go, [
                        U(_(a(s)("Persist path on reload")) + " ", 1),
                        A(Je, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: W(() => [
                            U(_(a(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  u("div", _o, [
                    u("div", bo, [
                      u("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: a(i).get("showThumbnails"),
                        onChange: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, wo)
                    ]),
                    u("div", yo, [
                      u("label", xo, [
                        U(_(a(s)("Show thumbnails")) + " ", 1),
                        A(Je, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: W(() => [
                            U(_(a(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  u("div", So, [
                    u("div", ko, [
                      u("label", Co, _(a(s)("Theme")), 1)
                    ]),
                    u("div", $o, [
                      ae(u("select", {
                        id: "theme",
                        "onUpdate:modelValue": T[0] || (T[0] = (F) => a(t).theme.value = F),
                        onChange: T[1] || (T[1] = (F) => m(F.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        u("optgroup", {
                          label: a(s)("Theme")
                        }, [
                          (f(!0), p(oe, null, re(y.value, (F, te) => (f(), p("option", { value: te }, _(F), 9, Mo))), 256))
                        ], 8, Ao)
                      ], 544), [
                        [Qt, a(t).theme.value]
                      ]),
                      A(Je, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: W(() => [
                          U(_(a(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  a(t).features.includes(a(ne).LANGUAGE) && Object.keys(a(x)).length > 1 ? (f(), p("div", Eo, [
                    u("div", Ro, [
                      u("label", zo, _(a(s)("Language")), 1)
                    ]),
                    u("div", To, [
                      ae(u("select", {
                        id: "language",
                        "onUpdate:modelValue": T[2] || (T[2] = (F) => a(t).i18n.locale = F),
                        class: "vuefinder__about-modal__select"
                      }, [
                        u("optgroup", {
                          label: a(s)("Language")
                        }, [
                          (f(!0), p(oe, null, re(a(x), (F, te) => (f(), p("option", { value: te }, _(F), 9, Io))), 256))
                        ], 8, Do)
                      ], 512), [
                        [Qt, a(t).i18n.locale]
                      ]),
                      A(Je, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: W(() => [
                          U(_(a(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : E("", !0)
                ])
              ])
            ])) : E("", !0),
            c.value === o.SHORTCUTS ? (f(), p("div", Lo, [
              u("div", Ho, [
                u("div", Fo, [
                  u("div", null, _(a(s)("Rename")), 1),
                  T[4] || (T[4] = u("kbd", null, "F2", -1))
                ]),
                u("div", Bo, [
                  u("div", null, _(a(s)("Refresh")), 1),
                  T[5] || (T[5] = u("kbd", null, "F5", -1))
                ]),
                u("div", Oo, [
                  U(_(a(s)("Delete")) + " ", 1),
                  T[6] || (T[6] = u("kbd", null, "Del", -1))
                ]),
                u("div", Po, [
                  U(_(a(s)("Escape")) + " ", 1),
                  T[7] || (T[7] = u("div", null, [
                    u("kbd", null, "Esc")
                  ], -1))
                ]),
                u("div", Vo, [
                  U(_(a(s)("Select All")) + " ", 1),
                  T[8] || (T[8] = u("div", null, [
                    u("kbd", null, "Ctrl"),
                    U(" + "),
                    u("kbd", null, "A")
                  ], -1))
                ]),
                u("div", Wo, [
                  U(_(a(s)("Search")) + " ", 1),
                  T[9] || (T[9] = u("div", null, [
                    u("kbd", null, "Ctrl"),
                    U(" + "),
                    u("kbd", null, "F")
                  ], -1))
                ]),
                u("div", jo, [
                  U(_(a(s)("Toggle Sidebar")) + " ", 1),
                  T[10] || (T[10] = u("div", null, [
                    u("kbd", null, "Ctrl"),
                    U(" + "),
                    u("kbd", null, "E")
                  ], -1))
                ]),
                u("div", Uo, [
                  U(_(a(s)("Open Settings")) + " ", 1),
                  T[11] || (T[11] = u("div", null, [
                    u("kbd", null, "Ctrl"),
                    U(" + "),
                    u("kbd", null, ",")
                  ], -1))
                ]),
                u("div", No, [
                  U(_(a(s)("Toggle Full Screen")) + " ", 1),
                  T[12] || (T[12] = u("div", null, [
                    u("kbd", null, "Ctrl"),
                    U(" + "),
                    u("kbd", null, "Enter")
                  ], -1))
                ]),
                u("div", qo, [
                  U(_(a(s)("Preview")) + " ", 1),
                  T[13] || (T[13] = u("div", null, [
                    u("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : E("", !0),
            c.value === o.RESET ? (f(), p("div", Yo, [
              u("div", Ko, _(a(s)("Reset all settings to default")), 1),
              u("button", {
                onClick: r,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, _(a(s)("Reset Settings")), 1)
            ])) : E("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Go = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Xo(e, t) {
  return f(), p("svg", Go, [...t[0] || (t[0] = [
    u("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const pi = { render: Xo }, Qo = { class: "vuefinder__delete-modal__content" }, Zo = { class: "vuefinder__delete-modal__form" }, Jo = { class: "vuefinder__delete-modal__description" }, es = { class: "vuefinder__delete-modal__files vf-scrollbar" }, ts = { class: "vuefinder__delete-modal__file" }, is = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ns = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, os = { class: "vuefinder__delete-modal__file-name" }, ss = { class: "vuefinder__delete-modal__warning" }, Ut = /* @__PURE__ */ K({
  __name: "ModalDelete",
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n, n = t.fs, s = N(n.path), o = k(t.modal.data.items), l = k(""), c = () => {
      o.value.length && t.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: s.value.storage,
          path: s.value.path
        },
        body: {
          items: o.value.map(({ path: r, type: m }) => ({ path: r, type: m }))
        },
        onSuccess: () => {
          t.emitter.emit("vf-toast-push", { label: i("Files deleted.") });
        },
        onError: (r) => {
          l.value = i(r.message);
        }
      });
    };
    return (r, m) => (f(), C(Fe, null, {
      buttons: W(() => [
        u("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, _(a(i)("Yes, Delete!")), 1),
        u("button", {
          type: "button",
          onClick: m[1] || (m[1] = (h) => a(t).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(i)("Cancel")), 1),
        u("div", ss, _(a(i)("This action cannot be undone.")), 1)
      ]),
      default: W(() => [
        u("div", null, [
          A(Ve, {
            icon: a(pi),
            title: a(i)("Delete files")
          }, null, 8, ["icon", "title"]),
          u("div", Qo, [
            u("div", Zo, [
              u("p", Jo, _(a(i)("Are you sure you want to delete these files?")), 1),
              u("div", es, [
                (f(!0), p(oe, null, re(o.value, (h) => (f(), p("p", ts, [
                  h.type === "dir" ? (f(), p("svg", is, [...m[2] || (m[2] = [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), p("svg", ns, [...m[3] || (m[3] = [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  u("span", os, _(h.basename), 1)
                ]))), 256))
              ]),
              l.value.length ? (f(), C(a(l), {
                key: 0,
                onHidden: m[0] || (m[0] = (h) => l.value = ""),
                error: ""
              }, {
                default: W(() => [
                  U(_(l.value), 1)
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
}), rs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function as(e, t) {
  return f(), p("svg", rs, [...t[0] || (t[0] = [
    u("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const gi = { render: as }, ls = { class: "vuefinder__rename-modal__content" }, cs = { class: "vuefinder__rename-modal__item" }, us = { class: "vuefinder__rename-modal__item-info" }, ds = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hs = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ms = { class: "vuefinder__rename-modal__item-name" }, Nt = /* @__PURE__ */ K({
  __name: "ModalRename",
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n, n = t.fs, s = N(n.path), o = k(t.modal.data.items[0]), l = k(t.modal.data.items[0].basename), c = k(""), r = () => {
      l.value != "" && t.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          storage: s.value.storage,
          path: s.value.path
        },
        body: {
          item: o.value.path,
          name: l.value
        },
        onSuccess: () => {
          t.emitter.emit("vf-toast-push", { label: i("%s is renamed.", l.value) });
        },
        onError: (m) => {
          c.value = i(m.message);
        }
      });
    };
    return (m, h) => (f(), C(Fe, null, {
      buttons: W(() => [
        u("button", {
          type: "button",
          onClick: r,
          class: "vf-btn vf-btn-primary"
        }, _(a(i)("Rename")), 1),
        u("button", {
          type: "button",
          onClick: h[2] || (h[2] = (d) => a(t).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(i)("Cancel")), 1)
      ]),
      default: W(() => [
        u("div", null, [
          A(Ve, {
            icon: a(gi),
            title: a(i)("Rename")
          }, null, 8, ["icon", "title"]),
          u("div", ls, [
            u("div", cs, [
              u("p", us, [
                o.value.type === "dir" ? (f(), p("svg", ds, [...h[3] || (h[3] = [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (f(), p("svg", hs, [...h[4] || (h[4] = [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                u("span", ms, _(o.value.basename), 1)
              ]),
              ae(u("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (d) => l.value = d),
                onKeyup: st(r, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [rt, l.value]
              ]),
              c.value.length ? (f(), C(a(c), {
                key: 0,
                onHidden: h[1] || (h[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: W(() => [
                  U(_(c.value), 1)
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
}), fs = ["title"], _i = /* @__PURE__ */ K({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(e, { emit: t }) {
    const i = t, n = G("ServiceContainer"), { t: s } = n.i18n, o = k(!1), l = k(null), c = k(l.value?.innerHTML);
    _e(c, () => o.value = !1);
    const r = () => {
      i("hidden"), o.value = !0;
    };
    return (m, h) => (f(), p("div", null, [
      o.value ? E("", !0) : (f(), p("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: ee(["vuefinder__message", e.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Re(m.$slots, "default"),
        u("div", {
          class: "vuefinder__message__close",
          onClick: r,
          title: a(s)("Close")
        }, [...h[0] || (h[0] = [
          u("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, fs)
      ], 2))
    ]));
  }
}), vs = { class: "vuefinder__text-preview" }, ps = { class: "vuefinder__text-preview__header" }, gs = ["title"], _s = { class: "vuefinder__text-preview__actions" }, bs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, ws = { key: 1 }, ys = /* @__PURE__ */ K({
  __name: "Text",
  emits: ["success"],
  setup(e, { emit: t }) {
    const i = t, n = k(""), s = k(""), o = k(null), l = k(!1), c = k(""), r = k(!1), m = G("ServiceContainer"), { t: h } = m.i18n;
    be(() => {
      m.requester.send({
        url: "",
        method: "get",
        params: {
          q: "preview",
          storage: m.modal.data.storage,
          adapter: m.modal.data.storage,
          path: m.modal.data.item.path
        },
        responseType: "text"
      }).then((g) => {
        n.value = g, i("success");
      });
    });
    const d = () => {
      l.value = !l.value, s.value = n.value;
    }, v = () => {
      c.value = "", r.value = !1, m.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          storage: m.modal.data.storage,
          adapter: m.modal.data.storage,
          path: m.modal.data.item.path
        },
        body: {
          content: s.value
        },
        responseType: "text"
      }).then((g) => {
        c.value = h("Updated."), n.value = g, i("success"), l.value = !l.value;
      }).catch((g) => {
        c.value = h(g.message), r.value = !0;
      });
    };
    return (g, w) => (f(), p("div", vs, [
      u("div", ps, [
        u("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: a(m).modal.data.item.path
        }, _(a(m).modal.data.item.basename), 9, gs),
        u("div", _s, [
          l.value ? (f(), p("button", {
            key: 0,
            onClick: v,
            class: "vuefinder__text-preview__save-button"
          }, _(a(h)("Save")), 1)) : E("", !0),
          a(m).features.includes(a(ne).EDIT) ? (f(), p("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: w[0] || (w[0] = (b) => d())
          }, _(l.value ? a(h)("Cancel") : a(h)("Edit")), 1)) : E("", !0)
        ])
      ]),
      u("div", null, [
        l.value ? (f(), p("div", ws, [
          ae(u("textarea", {
            ref_key: "editInput",
            ref: o,
            "onUpdate:modelValue": w[1] || (w[1] = (b) => s.value = b),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [rt, s.value]
          ])
        ])) : (f(), p("pre", bs, _(n.value), 1)),
        c.value.length ? (f(), C(_i, {
          key: 2,
          onHidden: w[2] || (w[2] = (b) => c.value = ""),
          error: r.value
        }, {
          default: W(() => [
            U(_(c.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : E("", !0)
      ])
    ]));
  }
});
function Jt(e, t) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter((function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    }))), i.push.apply(i, n);
  }
  return i;
}
function Z(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Jt(Object(i), !0).forEach((function(n) {
      $e(e, n, i[n]);
    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : Jt(Object(i)).forEach((function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(i, n));
    }));
  }
  return e;
}
function $e(e, t, i) {
  return t in e ? Object.defineProperty(e, t, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = i, e;
}
function xs(e, t) {
  if (e == null) return {};
  var i, n, s = (function(l, c) {
    if (l == null) return {};
    var r, m, h = {}, d = Object.keys(l);
    for (m = 0; m < d.length; m++) r = d[m], c.indexOf(r) >= 0 || (h[r] = l[r]);
    return h;
  })(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (n = 0; n < o.length; n++) i = o[n], t.indexOf(i) >= 0 || Object.prototype.propertyIsEnumerable.call(e, i) && (s[i] = e[i]);
  }
  return s;
}
function Ze(e) {
  return (function(t) {
    if (Array.isArray(t)) return Mt(t);
  })(e) || (function(t) {
    if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
  })(e) || (function(t, i) {
    if (t) {
      if (typeof t == "string") return Mt(t, i);
      var n = Object.prototype.toString.call(t).slice(8, -1);
      if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set") return Array.from(t);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Mt(t, i);
    }
  })(e) || (function() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  })();
}
function Mt(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var i = 0, n = new Array(t); i < t; i++) n[i] = e[i];
  return n;
}
var ei, Ss, mt, de = (ei = function(e) {
  /*!
    Copyright (c) 2018 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
  (function() {
    var t = {}.hasOwnProperty;
    function i() {
      for (var n = [], s = 0; s < arguments.length; s++) {
        var o = arguments[s];
        if (o) {
          var l = typeof o;
          if (l === "string" || l === "number") n.push(o);
          else if (Array.isArray(o)) {
            if (o.length) {
              var c = i.apply(null, o);
              c && n.push(c);
            }
          } else if (l === "object") if (o.toString === Object.prototype.toString) for (var r in o) t.call(o, r) && o[r] && n.push(r);
          else n.push(o.toString());
        }
      }
      return n.join(" ");
    }
    e.exports ? (i.default = i, e.exports = i) : window.classNames = i;
  })();
}, ei(mt = { path: Ss, exports: {}, require: function(e, t) {
  return (function() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
  })(t == null && mt.path);
} }, mt.exports), mt.exports), ze = function(e) {
  return function(t, i) {
    if (!t) return e;
    var n;
    typeof t == "string" ? n = t : i = t;
    var s = e;
    return n && (s += "__" + n), s + (i ? Object.keys(i).reduce((function(o, l) {
      var c = i[l];
      return c && (o += " " + (typeof c == "boolean" ? s + "--" + l : s + "--" + l + "_" + c)), o;
    }), "") : "");
  };
};
function Ht(e, t, i) {
  var n, s, o, l, c;
  function r() {
    var h = Date.now() - l;
    h < t && h >= 0 ? n = setTimeout(r, t - h) : (n = null, i || (c = e.apply(o, s), o = s = null));
  }
  t == null && (t = 100);
  var m = function() {
    o = this, s = arguments, l = Date.now();
    var h = i && !n;
    return n || (n = setTimeout(r, t)), h && (c = e.apply(o, s), o = s = null), c;
  };
  return m.clear = function() {
    n && (clearTimeout(n), n = null);
  }, m.flush = function() {
    n && (c = e.apply(o, s), o = s = null, clearTimeout(n), n = null);
  }, m;
}
Ht.debounce = Ht;
var Ft = Ht, L = function() {
  return L = Object.assign || function(e) {
    for (var t, i = 1, n = arguments.length; i < n; i++) for (var s in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
    return e;
  }, L.apply(this, arguments);
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function bi(e, t) {
  var i, n;
  return e && t ? (i = "" + e + t[0].toUpperCase() + t.slice(1), n = e + "-" + t) : (i = e || t, n = e || t), { name: i, classname: n };
}
function wi(e) {
  return /^blob:/.test(e);
}
function ti(e) {
  return wi(e) || (function(t) {
    return /^data:/.test(t);
  })(e);
}
function et(e) {
  return !!(e && e.constructor && e.call && e.apply);
}
function me(e) {
  return e === void 0;
}
function bt(e) {
  return typeof e == "object" && e !== null;
}
function Bt(e, t, i) {
  var n = {};
  return bt(e) ? (Object.keys(t).forEach((function(s) {
    me(e[s]) ? n[s] = t[s] : bt(t[s]) ? bt(e[s]) ? n[s] = Bt(e[s], t[s], i[s]) : n[s] = e[s] ? t[s] : i[s] : t[s] === !0 || t[s] === !1 ? n[s] = !!e[s] : n[s] = e[s];
  })), n) : e ? t : i;
}
function ft(e) {
  var t = Number(e);
  return Number.isNaN(t) ? e : t;
}
function ii(e) {
  return typeof (e == "number" || /* @__PURE__ */ (function(t) {
    return typeof t == "object" && t !== null;
  })(e) && toString.call(e) == "[object Number]") && !yi(e);
}
function yi(e) {
  return e != e;
}
function xi(e, t) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
var lt = function(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = {}), this.type = "manipulateImage", this.move = e, this.scale = t;
}, ks = function(e, t) {
  t === void 0 && (t = {}), this.type = "resize", this.directions = e, this.params = t;
}, qt = function(e) {
  this.type = "move", this.directions = e;
}, Cs = (function() {
  function e(t, i, n, s, o) {
    this.type = "drag", this.nativeEvent = t, this.position = n, this.previousPosition = s, this.element = i, this.anchor = o;
  }
  return e.prototype.shift = function() {
    var t = this, i = t.element, n = t.anchor, s = t.position;
    if (i) {
      var o = i.getBoundingClientRect(), l = o.left, c = o.top;
      return { left: s.left - l - n.left, top: s.top - c - n.top };
    }
    return { left: 0, top: 0 };
  }, e;
})(), Yt = { name: "DraggableElement", props: { classname: { type: String } }, beforeMount: function() {
  window.addEventListener("mouseup", this.onMouseUp, { passive: !1 }), window.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), window.addEventListener("touchmove", this.onTouchMove, { passive: !1 }), window.addEventListener("touchend", this.onTouchEnd, { passive: !1 });
}, beforeUnmount: function() {
  window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
}, mounted: function() {
  if (!this.$refs.draggable) throw new Error('You should add ref "draggable" to your root element to use draggable mixin');
  this.touches = [], this.hovered = !1;
}, methods: { onMouseOver: function() {
  this.hovered || (this.hovered = !0, this.$emit("enter"));
}, onMouseLeave: function() {
  this.hovered && !this.touches.length && (this.hovered = !1, this.$emit("leave"));
}, onTouchStart: function(e) {
  e.cancelable && !this.disabled && e.touches.length === 1 && (this.touches = Ze(e.touches), this.hovered || (this.$emit("enter"), this.hovered = !0), e.touches.length && this.initAnchor(this.touches.reduce((function(t, i) {
    return { clientX: t.clientX + i.clientX / e.touches.length, clientY: t.clientY + i.clientY / e.touches.length };
  }), { clientX: 0, clientY: 0 })), e.preventDefault && e.preventDefault(), e.stopPropagation());
}, onTouchEnd: function() {
  this.processEnd();
}, onTouchMove: function(e) {
  this.touches.length && (this.processMove(e, e.touches), e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation());
}, onMouseDown: function(e) {
  if (!this.disabled) {
    var t = { fake: !0, clientX: e.clientX, clientY: e.clientY };
    this.touches = [t], this.initAnchor(t), e.stopPropagation();
  }
}, onMouseMove: function(e) {
  this.touches.length && (this.processMove(e, [{ fake: !0, clientX: e.clientX, clientY: e.clientY }]), e.preventDefault && e.preventDefault());
}, onMouseUp: function() {
  this.processEnd();
}, initAnchor: function(e) {
  var t = this.$refs.draggable.getBoundingClientRect(), i = t.left, n = t.right, s = t.bottom, o = t.top;
  this.anchor = { left: e.clientX - i, top: e.clientY - o, bottom: s - e.clientY, right: n - e.clientX };
}, processMove: function(e, t) {
  var i = Ze(t);
  if (this.touches.length) {
    if (this.touches.length === 1 && i.length === 1) {
      var n = this.$refs.draggable;
      this.$emit("drag", new Cs(e, n, { left: i[0].clientX, top: i[0].clientY }, { left: this.touches[0].clientX, top: this.touches[0].clientY }, this.anchor));
    }
    this.touches = i;
  }
}, processEnd: function() {
  this.touches.length && this.$emit("drag-end"), this.hovered && (this.$emit("leave"), this.hovered = !1), this.touches = [];
} }, emits: ["drag", "drag-end", "leave", "enter"] };
Yt.render = function(e, t, i, n, s, o) {
  return f(), C("div", { ref: "draggable", class: i.classname, onTouchstart: t[1] || (t[1] = function() {
    return o.onTouchStart && o.onTouchStart.apply(o, arguments);
  }), onMousedown: t[2] || (t[2] = function() {
    return o.onMouseDown && o.onMouseDown.apply(o, arguments);
  }), onMouseover: t[3] || (t[3] = function() {
    return o.onMouseOver && o.onMouseOver.apply(o, arguments);
  }), onMouseleave: t[4] || (t[4] = function() {
    return o.onMouseLeave && o.onMouseLeave.apply(o, arguments);
  }) }, [Re(e.$slots, "default")], 34);
};
var Et = ze("vue-handler-wrapper"), Si = { name: "HandlerWrapper", components: { DraggableElement: Yt }, props: { horizontalPosition: { type: String }, verticalPosition: { type: String }, disabled: { type: Boolean, default: !1 } }, computed: { classes: function() {
  var e;
  if (this.horizontalPosition || this.verticalPosition) {
    var t, i = bi(this.horizontalPosition, this.verticalPosition);
    e = Et(($e(t = {}, i.classname, !0), $e(t, "disabled", this.disabled), t));
  } else e = Et({ disabled: this.disabled });
  return { root: e, draggable: Et("draggable") };
} }, emits: ["leave", "enter", "drag", "drag-end"] };
Si.render = function(e, t, i, n, s, o) {
  var l = Le("DraggableElement");
  return f(), C("div", { class: o.classes.root }, [A(l, { class: o.classes.draggable, onDrag: t[1] || (t[1] = function(c) {
    return e.$emit("drag", c);
  }), onDragEnd: t[2] || (t[2] = function(c) {
    return e.$emit("drag-end");
  }), onLeave: t[3] || (t[3] = function(c) {
    return e.$emit("leave");
  }), onEnter: t[4] || (t[4] = function(c) {
    return e.$emit("enter");
  }) }, { default: W((function() {
    return [Re(e.$slots, "default")];
  })), _: 3 }, 8, ["class"])], 2);
};
var $s = ze("vue-line-wrapper"), ki = { name: "LineWrapper", components: { DraggableElement: Yt }, props: { position: { type: String, required: !0 }, disabled: { type: Boolean, default: !1 } }, computed: { classname: function() {
  var e;
  return $s(($e(e = {}, this.position, !0), $e(e, "disabled", this.disabled), e));
} }, emits: ["leave", "enter", "drag", "drag-end"] };
ki.render = function(e, t, i, n, s, o) {
  var l = Le("DraggableElement");
  return f(), C(l, { class: o.classname, onDrag: t[1] || (t[1] = function(c) {
    return e.$emit("drag", c);
  }), onDragEnd: t[2] || (t[2] = function(c) {
    return e.$emit("drag-end");
  }), onLeave: t[3] || (t[3] = function(c) {
    return e.$emit("leave");
  }), onEnter: t[4] || (t[4] = function(c) {
    return e.$emit("enter");
  }) }, { default: W((function() {
    return [Re(e.$slots, "default")];
  })), _: 3 }, 8, ["class"]);
};
var Ie = ["left", "right", "top", "bottom"], As = ["left", "right"], Ms = ["top", "bottom"], Es = ["left", "top"], Rs = ["fill-area", "fit-area", "stencil", "none"], ni = { left: 0, top: 0, width: 0, height: 0 };
function oi(e, t, i) {
  return !(i = i || ["width", "height", "left", "top"]).some((function(n) {
    return e[n] !== t[n];
  }));
}
function He(e) {
  return { left: e.left, top: e.top, right: e.left + e.width, bottom: e.top + e.height };
}
function it(e, t) {
  return { left: e.left - t.left, top: e.top - t.top };
}
function pe(e) {
  return { left: e.left + e.width / 2, top: e.top + e.height / 2 };
}
function ut(e, t) {
  var i = { left: 0, top: 0, right: 0, bottom: 0 };
  return Ie.forEach((function(n) {
    var s = t[n], o = He(e)[n];
    i[n] = s !== void 0 && o !== void 0 ? n === "left" || n === "top" ? Math.max(0, s - o) : Math.max(0, o - s) : 0;
  })), i;
}
function De(e, t) {
  return { left: e.left - t.left, top: e.top - t.top, width: e.width + t.left + t.right, height: e.height + t.top + t.bottom };
}
function yt(e) {
  return { left: -e.left, top: -e.top };
}
function xe(e, t) {
  return L(L({}, e), { left: e.left + t.left, top: e.top + t.top });
}
function Ae(e, t, i, n) {
  if (t !== 1) {
    if (i) {
      var s = pe(e);
      return { width: e.width * t, height: e.height * t, left: e.left + e.width * (1 - t) / 2 + (i.left - s.left) * (1 - t), top: e.top + e.height * (1 - t) / 2 + (i.top - s.top) * (1 - t) };
    }
    return { width: e.width * t, height: e.height * t, left: e.left + e.width * (1 - t) / 2, top: e.top + e.height * (1 - t) / 2 };
  }
  return e;
}
function J(e) {
  return e.width / e.height;
}
function nt(e, t) {
  return Math.min(t.right !== void 0 && t.left !== void 0 ? (t.right - t.left) / e.width : 1 / 0, t.bottom !== void 0 && t.top !== void 0 ? (t.bottom - t.top) / e.height : 1 / 0);
}
function ot(e, t) {
  var i = { left: 0, top: 0 }, n = ut(e, t);
  return n.left && n.left > 0 ? i.left = n.left : n.right && n.right > 0 && (i.left = -n.right), n.top && n.top > 0 ? i.top = n.top : n.bottom && n.bottom > 0 && (i.top = -n.bottom), i;
}
function Rt(e, t) {
  var i;
  return t.minimum && e < t.minimum ? i = t.minimum : t.maximum && e > t.maximum && (i = t.maximum), i;
}
function Ci(e, t) {
  var i = J(e), n = J(t);
  return t.width < 1 / 0 && t.height < 1 / 0 ? i > n ? { width: t.width, height: t.width / i } : { width: t.height * i, height: t.height } : t.width < 1 / 0 ? { width: t.width, height: t.width / i } : t.height < 1 / 0 ? { width: t.height * i, height: t.height } : e;
}
function $i(e, t) {
  var i = t * Math.PI / 180;
  return { width: Math.abs(e.width * Math.cos(i)) + Math.abs(e.height * Math.sin(i)), height: Math.abs(e.width * Math.sin(i)) + Math.abs(e.height * Math.cos(i)) };
}
function Ne(e, t) {
  var i = t * Math.PI / 180;
  return { left: e.left * Math.cos(i) - e.top * Math.sin(i), top: e.left * Math.sin(i) + e.top * Math.cos(i) };
}
function xt(e, t) {
  var i = ut(ge(e, t), t);
  return i.left + i.right + i.top + i.bottom ? i.left + i.right > i.top + i.bottom ? Math.min((e.width + i.left + i.right) / e.width, nt(e, t)) : Math.min((e.height + i.top + i.bottom) / e.height, nt(e, t)) : 1;
}
function ge(e, t, i) {
  i === void 0 && (i = !1);
  var n = ot(e, t);
  return xe(e, i ? yt(n) : n);
}
function Ot(e) {
  return { width: e.right !== void 0 && e.left !== void 0 ? e.right - e.left : 1 / 0, height: e.bottom !== void 0 && e.top !== void 0 ? e.bottom - e.top : 1 / 0 };
}
function zs(e, t) {
  return L(L({}, e), { minWidth: Math.min(t.width, e.minWidth), minHeight: Math.min(t.height, e.minHeight), maxWidth: Math.min(t.width, e.maxWidth), maxHeight: Math.min(t.height, e.maxHeight) });
}
function Ai(e, t, i) {
  i === void 0 && (i = !0);
  var n = {};
  return Ie.forEach((function(s) {
    var o = e[s], l = t[s];
    o !== void 0 && l !== void 0 ? n[s] = s === "left" || s === "top" ? i ? Math.max(o, l) : Math.min(o, l) : i ? Math.min(o, l) : Math.max(o, l) : l !== void 0 ? n[s] = l : o !== void 0 && (n[s] = o);
  })), n;
}
function St(e, t) {
  return Ai(e, t, !0);
}
function si(e) {
  var t = e.size, i = e.aspectRatio, n = e.ignoreMinimum, s = e.sizeRestrictions;
  return !!((t.correctRatio || J(t) >= i.minimum && J(t) <= i.maximum) && t.height <= s.maxHeight && t.width <= s.maxWidth && t.width && t.height && (n || t.height >= s.minHeight && t.width >= s.minWidth));
}
function ri(e, t) {
  return Math.pow(e.width - t.width, 2) + Math.pow(e.height - t.height, 2);
}
function Pe(e) {
  var t = e.width, i = e.height, n = e.sizeRestrictions, s = { minimum: e.aspectRatio && e.aspectRatio.minimum || 0, maximum: e.aspectRatio && e.aspectRatio.maximum || 1 / 0 }, o = { width: Math.max(n.minWidth, Math.min(n.maxWidth, t)), height: Math.max(n.minHeight, Math.min(n.maxHeight, i)) };
  function l(m, h) {
    return h === void 0 && (h = !1), m.reduce((function(d, v) {
      return si({ size: v, aspectRatio: s, sizeRestrictions: n, ignoreMinimum: h }) && (!d || ri(v, { width: t, height: i }) < ri(d, { width: t, height: i })) ? v : d;
    }), null);
  }
  var c = [];
  s && [s.minimum, s.maximum].forEach((function(m) {
    m && c.push({ width: o.width, height: o.width / m, correctRatio: !0 }, { width: o.height * m, height: o.height, correctRatio: !0 });
  })), si({ size: o, aspectRatio: s, sizeRestrictions: n }) && c.push(o);
  var r = l(c) || l(c, !0);
  return r && { width: r.width, height: r.height };
}
function Pt(e) {
  var t = e.event, i = e.coordinates, n = e.positionRestrictions, s = n === void 0 ? {} : n, o = xe(i, t.directions);
  return xe(o, ot(o, s));
}
function Ts(e) {
  var t = e.coordinates, i = e.transform, n = e.imageSize, s = e.sizeRestrictions, o = e.positionRestrictions, l = e.aspectRatio, c = e.visibleArea, r = function(h, d) {
    return Pt({ coordinates: h, positionRestrictions: o, event: new qt({ left: d.left - h.left, top: d.top - h.top }) });
  }, m = L({}, t);
  return (Array.isArray(i) ? i : [i]).forEach((function(h) {
    var d = {};
    me((d = typeof h == "function" ? h({ coordinates: m, imageSize: n, visibleArea: c }) : h).width) && me(d.height) || (m = (function(v, g) {
      var w = L(L(L({}, v), Pe({ width: g.width, height: g.height, sizeRestrictions: s, aspectRatio: l })), { left: 0, top: 0 });
      return r(w, { left: v.left, top: v.top });
    })(m, L(L({}, m), d))), me(d.left) && me(d.top) || (m = r(m, L(L({}, m), d)));
  })), m;
}
function Ds(e) {
  e.event;
  var t = e.getAreaRestrictions, i = e.boundaries, n = e.coordinates, s = e.visibleArea;
  e.aspectRatio;
  var o = e.stencilSize, l = e.sizeRestrictions, c = e.positionRestrictions;
  e.stencilReference;
  var r, m, h, d = L({}, n), v = L({}, s), g = L({}, o);
  r = J(g), m = J(d), h === void 0 && (h = 1e-3), (r === 0 || m === 0 ? Math.abs(m - r) < h : Math.abs(m / r) < 1 + h && Math.abs(m / r) > 1 - h) || (d = L(L({}, d), Pe({ sizeRestrictions: l, width: d.width, height: d.height, aspectRatio: { minimum: J(g), maximum: J(g) } })));
  var w = xt(v = Ae(v, d.width * i.width / (v.width * g.width)), t({ visibleArea: v, type: "resize" }));
  return w !== 1 && (v = Ae(v, w), d = Ae(d, w)), v = ge(v = xe(v, it(pe(d), pe(v))), t({ visibleArea: v, type: "move" })), { coordinates: d = ge(d, St(He(v), c)), visibleArea: v };
}
function Is(e) {
  var t = e.event, i = e.getAreaRestrictions, n = e.boundaries, s = e.coordinates, o = e.visibleArea;
  e.aspectRatio, e.stencilSize, e.sizeRestrictions;
  var l = e.positionRestrictions;
  e.stencilReference;
  var c = L({}, s), r = L({}, o);
  if (s && o && t.type !== "manipulateImage") {
    var m = { width: 0, height: 0 };
    r.width, n.width, J(n) > J(c) ? (m.height = 0.8 * n.height, m.width = m.height * J(c)) : (m.width = 0.8 * n.width, m.height = m.width * J(c));
    var h = xt(r = Ae(r, c.width * n.width / (r.width * m.width)), i({ visibleArea: r, type: "resize" }));
    r = Ae(r, h), h !== 1 && (m.height /= h, m.width /= h), r = ge(r = xe(r, it(pe(c), pe(r))), i({ visibleArea: r, type: "move" })), c = ge(c, St(He(r), l));
  }
  return { coordinates: c, visibleArea: r };
}
function Ls(e) {
  var t = e.event, i = e.coordinates, n = e.visibleArea, s = e.getAreaRestrictions, o = L({}, n), l = L({}, i);
  if (t.type === "setCoordinates") {
    var c = Math.max(0, l.width - o.width), r = Math.max(0, l.height - o.height);
    c > r ? o = Ae(o, Math.min(l.width / o.width, nt(o, s({ visibleArea: o, type: "resize" })))) : r > c && (o = Ae(o, Math.min(l.height / o.height, nt(o, s({ visibleArea: o, type: "resize" }))))), o = ge(o = xe(o, yt(ot(l, He(o)))), s({ visibleArea: o, type: "move" }));
  }
  return { visibleArea: o, coordinates: l };
}
function Hs(e) {
  var t = e.imageSize, i = e.visibleArea, n = e.coordinates, s = i || t;
  return { left: (i ? i.left : 0) + s.width / 2 - n.width / 2, top: (i ? i.top : 0) + s.height / 2 - n.height / 2 };
}
function Fs(e) {
  var t = e.imageSize, i = e.visibleArea, n = e.aspectRatio, s = e.sizeRestrictions, o = i || t, l = Math.min(n.maximum || 1 / 0, Math.max(n.minimum || 0, J(o))), c = o.width < o.height ? { width: 0.8 * o.width, height: 0.8 * o.width / l } : { height: 0.8 * o.height, width: 0.8 * o.height * l };
  return Pe(L(L({}, c), { aspectRatio: n, sizeRestrictions: s }));
}
function Bs(e) {
  var t, i, n = e.imageSize, s = e.visibleArea, o = e.boundaries, l = e.aspectRatio, c = e.sizeRestrictions, r = e.stencilSize, m = s || n;
  return J(m) > J(o) ? i = (t = r.height * m.height / o.height) * J(r) : t = (i = r.width * m.width / o.width) / J(r), Pe({ width: i, height: t, aspectRatio: l, sizeRestrictions: c });
}
function Os(e) {
  var t = e.getAreaRestrictions, i = e.coordinates, n = e.imageSize, s = J(e.boundaries);
  if (i) {
    var o = { height: Math.max(i.height, n.height), width: Math.max(i.width, n.width) }, l = Ci({ width: J(o) > s ? o.width : o.height * s, height: J(o) > s ? o.width / s : o.height }, Ot(t())), c = { left: i.left + i.width / 2 - l.width / 2, top: i.top + i.height / 2 - l.height / 2, width: l.width, height: l.height }, r = ut(i, He(L({ left: 0, top: 0 }, n))), m = {};
    return !r.left && !r.right && c.width <= n.width && (m.left = 0, m.right = n.width), !r.top && !r.bottom && c.height <= n.height && (m.top = 0, m.bottom = n.height), ge(c, m);
  }
  var h = J(n);
  return l = { height: h > s ? n.height : n.width / s, width: h > s ? n.height * s : n.width }, { left: n.width / 2 - l.width / 2, top: n.height / 2 - l.height / 2, width: l.width, height: l.height };
}
function vt(e, t) {
  return Ai(e, He(t));
}
function Ps(e) {
  var t = e.event, i = e.coordinates, n = e.visibleArea, s = e.sizeRestrictions, o = e.getAreaRestrictions, l = e.positionRestrictions, c = e.adjustStencil, r = t.scale, m = t.move, h = L({}, n), d = L({}, i), v = 1, g = 1, w = r.factor && Math.abs(r.factor - 1) > 1e-3;
  h = xe(h, { left: m.left || 0, top: m.top || 0 });
  var b = { stencil: { minimum: Math.max(s.minWidth ? s.minWidth / d.width : 0, s.minHeight ? s.minHeight / d.height : 0), maximum: Math.min(s.maxWidth ? s.maxWidth / d.width : 1 / 0, s.maxHeight ? s.maxHeight / d.height : 1 / 0, nt(d, l)) }, area: { maximum: nt(h, o({ visibleArea: h, type: "resize" })) } };
  r.factor && w && (r.factor < 1 ? (g = Math.max(r.factor, b.stencil.minimum)) > 1 && (g = 1) : r.factor > 1 && (g = Math.min(r.factor, Math.min(b.area.maximum, b.stencil.maximum))) < 1 && (g = 1)), g && (h = Ae(h, g, r.center));
  var x = i.left - n.left, y = n.width + n.left - (i.width + i.left), M = i.top - n.top, T = n.height + n.top - (i.height + i.top);
  return h = ge(h = xe(h, ot(h, { left: l.left !== void 0 ? l.left - x * g : void 0, top: l.top !== void 0 ? l.top - M * g : void 0, bottom: l.bottom !== void 0 ? l.bottom + T * g : void 0, right: l.right !== void 0 ? l.right + y * g : void 0 })), o({ visibleArea: h, type: "move" })), d.width = d.width * g, d.height = d.height * g, d.left = h.left + x * g, d.top = h.top + M * g, d = ge(d, St(He(h), l)), r.factor && w && c && (r.factor > 1 ? v = Math.min(b.area.maximum, r.factor) / g : r.factor < 1 && (v = Math.max(d.height / h.height, d.width / h.width, r.factor / g)), v !== 1 && (h = xe(h = ge(h = Ae(h, v, r.factor > 1 ? r.center : pe(d)), o({ visibleArea: h, type: "move" })), yt(ot(d, He(h)))))), { coordinates: d, visibleArea: h };
}
function Vs(e) {
  var t = e.aspectRatio, i = e.getAreaRestrictions, n = e.coordinates, s = e.visibleArea, o = e.sizeRestrictions, l = e.positionRestrictions, c = e.imageSize, r = e.previousImageSize, m = e.angle, h = L({}, n), d = L({}, s), v = Ne(pe(L({ left: 0, top: 0 }, r)), m);
  return (h = L(L({}, Pe({ sizeRestrictions: o, aspectRatio: t, width: h.width, height: h.height })), Ne(pe(h), m))).left -= v.left - c.width / 2 + h.width / 2, h.top -= v.top - c.height / 2 + h.height / 2, d = Ae(d, xt(d, i({ visibleArea: d, type: "resize" }))), { coordinates: h = ge(h, l), visibleArea: d = ge(d = xe(d, it(pe(h), pe(n))), i({ visibleArea: d, type: "move" })) };
}
function Ws(e) {
  var t = e.flip, i = e.previousFlip, n = e.rotate, s = e.getAreaRestrictions, o = e.coordinates, l = e.visibleArea, c = e.imageSize, r = L({}, o), m = L({}, l), h = i.horizontal !== t.horizontal, d = i.vertical !== t.vertical;
  if (h || d) {
    var v = Ne({ left: c.width / 2, top: c.height / 2 }, -n), g = Ne(pe(r), -n), w = Ne({ left: h ? v.left - (g.left - v.left) : g.left, top: d ? v.top - (g.top - v.top) : g.top }, n);
    r = xe(r, it(w, pe(r))), g = Ne(pe(m), -n), m = ge(m = xe(m, it(w = Ne({ left: h ? v.left - (g.left - v.left) : g.left, top: d ? v.top - (g.top - v.top) : g.top }, n), pe(m))), s({ visibleArea: m, type: "move" }));
  }
  return { coordinates: r, visibleArea: m };
}
function ai(e) {
  var t = e.directions, i = e.coordinates, n = e.positionRestrictions, s = n === void 0 ? {} : n, o = e.sizeRestrictions, l = e.preserveRatio, c = e.compensate, r = L({}, t), m = De(i, r).width, h = De(i, r).height;
  m < 0 && (r.left < 0 && r.right < 0 ? (r.left = -(i.width - o.minWidth) / (r.left / r.right), r.right = -(i.width - o.minWidth) / (r.right / r.left)) : r.left < 0 ? r.left = -(i.width - o.minWidth) : r.right < 0 && (r.right = -(i.width - o.minWidth))), h < 0 && (r.top < 0 && r.bottom < 0 ? (r.top = -(i.height - o.minHeight) / (r.top / r.bottom), r.bottom = -(i.height - o.minHeight) / (r.bottom / r.top)) : r.top < 0 ? r.top = -(i.height - o.minHeight) : r.bottom < 0 && (r.bottom = -(i.height - o.minHeight)));
  var d = ut(De(i, r), s);
  c && (d.left && d.left > 0 && d.right === 0 ? (r.right += d.left, r.left -= d.left) : d.right && d.right > 0 && d.left === 0 && (r.left += d.right, r.right -= d.right), d.top && d.top > 0 && d.bottom === 0 ? (r.bottom += d.top, r.top -= d.top) : d.bottom && d.bottom > 0 && d.top === 0 && (r.top += d.bottom, r.bottom -= d.bottom), d = ut(De(i, r), s));
  var v = { width: 1 / 0, height: 1 / 0, left: 1 / 0, right: 1 / 0, top: 1 / 0, bottom: 1 / 0 };
  if (Ie.forEach((function(b) {
    var x = d[b];
    x && r[b] && (v[b] = Math.max(0, 1 - x / r[b]));
  })), l) {
    var g = Math.min.apply(null, Ie.map((function(b) {
      return v[b];
    })));
    g !== 1 / 0 && Ie.forEach((function(b) {
      r[b] *= g;
    }));
  } else Ie.forEach((function(b) {
    v[b] !== 1 / 0 && (r[b] *= v[b]);
  }));
  if (m = De(i, r).width, h = De(i, r).height, r.right + r.left && (m > o.maxWidth ? v.width = (o.maxWidth - i.width) / (r.right + r.left) : m < o.minWidth && (v.width = (o.minWidth - i.width) / (r.right + r.left))), r.bottom + r.top && (h > o.maxHeight ? v.height = (o.maxHeight - i.height) / (r.bottom + r.top) : h < o.minHeight && (v.height = (o.minHeight - i.height) / (r.bottom + r.top))), l) {
    var w = Math.min(v.width, v.height);
    w !== 1 / 0 && Ie.forEach((function(b) {
      r[b] *= w;
    }));
  } else v.width !== 1 / 0 && As.forEach((function(b) {
    r[b] *= v.width;
  })), v.height !== 1 / 0 && Ms.forEach((function(b) {
    r[b] *= v.height;
  }));
  return r;
}
function pt(e, t, i) {
  return t == 0 && i == 0 ? e / 2 : t == 0 ? 0 : i == 0 ? e : e * Math.abs(t / (t + i));
}
var js = ze("vue-simple-handler"), Us = ze("vue-simple-handler-wrapper"), Kt = { name: "SimpleHandler", components: { HandlerWrapper: Si }, props: { defaultClass: { type: String }, hoverClass: { type: String }, wrapperClass: { type: String }, horizontalPosition: { type: String }, verticalPosition: { type: String }, disabled: { type: Boolean, default: !1 } }, data: function() {
  return { hover: !1 };
}, computed: { classes: function() {
  var e, t = ($e(e = {}, this.horizontalPosition, !!this.horizontalPosition), $e(e, this.verticalPosition, !!this.verticalPosition), $e(e, "".concat(this.horizontalPosition, "-").concat(this.verticalPosition), !!(this.verticalPosition && this.horizontalPosition)), $e(e, "hover", this.hover), e);
  return { default: de(js(t), this.defaultClass, this.hover && this.hoverClass), wrapper: de(Us(t), this.wrapperClass) };
} }, methods: { onDrag: function(e) {
  this.$emit("drag", e);
}, onEnter: function() {
  this.hover = !0;
}, onLeave: function() {
  this.hover = !1;
}, onDragEnd: function() {
  this.$emit("drag-end");
} }, emits: ["drag", "drag-end"] };
Kt.render = function(e, t, i, n, s, o) {
  var l = Le("HandlerWrapper");
  return f(), C(l, { class: o.classes.wrapper, "vertical-position": i.verticalPosition, "horizontal-position": i.horizontalPosition, disabled: i.disabled, onDrag: o.onDrag, onDragEnd: o.onDragEnd, onEnter: o.onEnter, onLeave: o.onLeave }, { default: W((function() {
    return [A("div", { class: o.classes.default }, null, 2)];
  })), _: 1 }, 8, ["class", "vertical-position", "horizontal-position", "disabled", "onDrag", "onDragEnd", "onEnter", "onLeave"]);
};
var Ns = ze("vue-simple-line"), qs = ze("vue-simple-line-wrapper"), Gt = { name: "SimpleLine", components: { LineWrapper: ki }, props: { defaultClass: { type: String }, hoverClass: { type: String }, wrapperClass: { type: String }, position: { type: String }, disabled: { type: Boolean, default: !1 } }, data: function() {
  return { hover: !1 };
}, computed: { classes: function() {
  return { root: de(Ns($e({}, this.position, !0)), this.defaultClass, this.hover && this.hoverClass), wrapper: de(qs($e({}, this.position, !0)), this.wrapperClass) };
} }, methods: { onDrag: function(e) {
  this.$emit("drag", e);
}, onEnter: function() {
  this.hover = !0;
}, onLeave: function() {
  this.hover = !1;
}, onDragEnd: function() {
  this.$emit("drag-end");
} }, emits: ["drag", "drag-end"] };
Gt.render = function(e, t, i, n, s, o) {
  var l = Le("LineWrapper");
  return f(), C(l, { class: o.classes.wrapper, position: i.position, disabled: i.disabled, onDrag: o.onDrag, onDragEnd: o.onDragEnd, onEnter: o.onEnter, onLeave: o.onLeave }, { default: W((function() {
    return [A("div", { class: o.classes.root }, null, 2)];
  })), _: 1 }, 8, ["class", "position", "disabled", "onDrag", "onDragEnd", "onEnter", "onLeave"]);
};
var zt = ze("vue-bounding-box"), Ys = ["east", "west", null], Ks = ["south", "north", null], Mi = { name: "BoundingBox", props: { width: { type: Number }, height: { type: Number }, transitions: { type: Object }, handlers: { type: Object, default: function() {
  return { eastNorth: !0, north: !0, westNorth: !0, west: !0, westSouth: !0, south: !0, eastSouth: !0, east: !0 };
} }, handlersComponent: { type: [Object, String], default: function() {
  return Kt;
} }, handlersClasses: { type: Object, default: function() {
  return {};
} }, handlersWrappersClasses: { type: Object, default: function() {
  return {};
} }, lines: { type: Object, default: function() {
  return { west: !0, north: !0, east: !0, south: !0 };
} }, linesComponent: { type: [Object, String], default: function() {
  return Gt;
} }, linesClasses: { type: Object, default: function() {
  return {};
} }, linesWrappersClasses: { type: Object, default: function() {
  return {};
} }, resizable: { type: Boolean, default: !0 } }, data: function() {
  var e = [];
  return Ys.forEach((function(t) {
    Ks.forEach((function(i) {
      if (t !== i) {
        var n = bi(t, i), s = n.name, o = n.classname;
        e.push({ name: s, classname: o, verticalDirection: i, horizontalDirection: t });
      }
    }));
  })), { points: e };
}, computed: { style: function() {
  var e = {};
  return this.width && this.height && (e.width = "".concat(this.width, "px"), e.height = "".concat(this.height, "px"), this.transitions && this.transitions.enabled && (e.transition = "".concat(this.transitions.time, "ms ").concat(this.transitions.timingFunction))), e;
}, classes: function() {
  var e = this.handlersClasses, t = this.handlersWrappersClasses, i = this.linesClasses, n = this.linesWrappersClasses;
  return { root: zt(), handlers: e, handlersWrappers: t, lines: i, linesWrappers: n };
}, lineNodes: function() {
  var e = this, t = [];
  return this.points.forEach((function(i) {
    i.horizontalDirection && i.verticalDirection || !e.lines[i.name] || t.push({ name: i.name, component: e.linesComponent, class: de(e.classes.lines.default, e.classes.lines[i.name], !e.resizable && e.classes.lines.disabled), wrapperClass: de(e.classes.linesWrappers.default, e.classes.linesWrappers[i.name], !e.resizable && e.classes.linesWrappers.disabled), hoverClass: e.classes.lines.hover, verticalDirection: i.verticalDirection, horizontalDirection: i.horizontalDirection, disabled: !e.resizable });
  })), t;
}, handlerNodes: function() {
  var e = this, t = [], i = this.width, n = this.height;
  return this.points.forEach((function(s) {
    if (e.handlers[s.name]) {
      var o = { name: s.name, component: e.handlersComponent, class: de(e.classes.handlers.default, e.classes.handlers[s.name]), wrapperClass: de(e.classes.handlersWrappers.default, e.classes.handlersWrappers[s.name]), hoverClass: e.classes.handlers.hover, verticalDirection: s.verticalDirection, horizontalDirection: s.horizontalDirection, disabled: !e.resizable };
      if (i && n) {
        var l = s.horizontalDirection, c = s.verticalDirection, r = l === "east" ? i : l === "west" ? 0 : i / 2, m = c === "south" ? n : c === "north" ? 0 : n / 2;
        o.wrapperClass = zt("handler"), o.wrapperStyle = { transform: "translate(".concat(r, "px, ").concat(m, "px)") }, e.transitions && e.transitions.enabled && (o.wrapperStyle.transition = "".concat(e.transitions.time, "ms ").concat(e.transitions.timingFunction));
      } else o.wrapperClass = zt("handler", $e({}, s.classname, !0));
      t.push(o);
    }
  })), t;
} }, beforeMount: function() {
  window.addEventListener("mouseup", this.onMouseUp, { passive: !1 }), window.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), window.addEventListener("touchmove", this.onTouchMove, { passive: !1 }), window.addEventListener("touchend", this.onTouchEnd, { passive: !1 });
}, beforeUnmount: function() {
  window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
}, mounted: function() {
  this.touches = [];
}, methods: { onEnd: function() {
  this.$emit("resize-end");
}, onHandlerDrag: function(e, t, i) {
  var n, s = e.shift(), o = s.left, l = s.top, c = { left: 0, right: 0, top: 0, bottom: 0 };
  t === "west" ? c.left -= o : t === "east" && (c.right += o), i === "north" ? c.top -= l : i === "south" && (c.bottom += l), !i && t ? n = "width" : i && !t && (n = "height"), this.resizable && this.$emit("resize", new ks(c, { allowedDirections: { left: t === "west" || !t, right: t === "east" || !t, bottom: i === "south" || !i, top: i === "north" || !i }, preserveAspectRatio: e.nativeEvent && e.nativeEvent.shiftKey, respectDirection: n }));
} }, emits: ["resize", "resize-end"] };
Mi.render = function(e, t, i, n, s, o) {
  return f(), C("div", { ref: "box", class: o.classes.root, style: o.style }, [Re(e.$slots, "default"), A("div", null, [(f(!0), C(oe, null, re(o.lineNodes, (function(l) {
    return f(), C(Qe(l.component), { key: l.name, "default-class": l.class, "hover-class": l.hoverClass, "wrapper-class": l.wrapperClass, position: l.name, disabled: l.disabled, onDrag: function(c) {
      return o.onHandlerDrag(c, l.horizontalDirection, l.verticalDirection);
    }, onDragEnd: t[1] || (t[1] = function(c) {
      return o.onEnd();
    }) }, null, 8, ["default-class", "hover-class", "wrapper-class", "position", "disabled", "onDrag"]);
  })), 128))]), (f(!0), C(oe, null, re(o.handlerNodes, (function(l) {
    return f(), C("div", { key: l.name, style: l.wrapperStyle, class: l.wrapperClass }, [(f(), C(Qe(l.component), { "default-class": l.class, "hover-class": l.hoverClass, "wrapper-class": l.wrapperClass, "horizontal-position": l.horizontalDirection, "vertical-position": l.verticalDirection, disabled: l.disabled, onDrag: function(c) {
      return o.onHandlerDrag(c, l.horizontalDirection, l.verticalDirection);
    }, onDragEnd: t[2] || (t[2] = function(c) {
      return o.onEnd();
    }) }, null, 8, ["default-class", "hover-class", "wrapper-class", "horizontal-position", "vertical-position", "disabled", "onDrag"]))], 6);
  })), 128))], 6);
};
var Gs = ze("vue-draggable-area"), Ei = { name: "DraggableArea", props: { movable: { type: Boolean, default: !0 }, activationDistance: { type: Number, default: 20 } }, computed: { classnames: function() {
  return { default: Gs() };
} }, beforeMount: function() {
  window.addEventListener("mouseup", this.onMouseUp, { passive: !1 }), window.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), window.addEventListener("touchmove", this.onTouchMove, { passive: !1 }), window.addEventListener("touchend", this.onTouchEnd, { passive: !1 });
}, beforeUnmount: function() {
  window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
}, mounted: function() {
  this.touches = [], this.touchStarted = !1;
}, methods: { onTouchStart: function(e) {
  if (e.cancelable) {
    var t = this.movable && e.touches.length === 1;
    t && (this.touches = Ze(e.touches)), (this.touchStarted || t) && (e.preventDefault(), e.stopPropagation());
  }
}, onTouchEnd: function() {
  this.touchStarted = !1, this.processEnd();
}, onTouchMove: function(e) {
  this.touches.length >= 1 && (this.touchStarted ? (this.processMove(e, e.touches), e.preventDefault(), e.stopPropagation()) : xi({ x: this.touches[0].clientX, y: this.touches[0].clientY }, { x: e.touches[0].clientX, y: e.touches[0].clientY }) > this.activationDistance && (this.initAnchor({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }), this.touchStarted = !0));
}, onMouseDown: function(e) {
  if (this.movable && e.button === 0) {
    var t = { fake: !0, clientX: e.clientX, clientY: e.clientY };
    this.touches = [t], this.initAnchor(t), e.stopPropagation();
  }
}, onMouseMove: function(e) {
  this.touches.length && (this.processMove(e, [{ fake: !0, clientX: e.clientX, clientY: e.clientY }]), e.preventDefault && e.cancelable && e.preventDefault(), e.stopPropagation());
}, onMouseUp: function() {
  this.processEnd();
}, initAnchor: function(e) {
  var t = this.$refs.container.getBoundingClientRect(), i = t.left, n = t.top;
  this.anchor = { x: e.clientX - i, y: e.clientY - n };
}, processMove: function(e, t) {
  var i = Ze(t);
  if (this.touches.length) {
    var n = this.$refs.container.getBoundingClientRect(), s = n.left, o = n.top;
    this.touches.length === 1 && i.length === 1 && this.$emit("move", new qt({ left: i[0].clientX - (s + this.anchor.x), top: i[0].clientY - (o + this.anchor.y) }));
  }
}, processEnd: function() {
  this.touches.length && this.$emit("move-end"), this.touches = [];
} }, emits: ["move", "move-end"] };
Ei.render = function(e, t, i, n, s, o) {
  return f(), C("div", { ref: "container", onTouchstart: t[1] || (t[1] = function() {
    return o.onTouchStart && o.onTouchStart.apply(o, arguments);
  }), onMousedown: t[2] || (t[2] = function() {
    return o.onMouseDown && o.onMouseDown.apply(o, arguments);
  }) }, [Re(e.$slots, "default")], 544);
};
function Tt(e) {
  var t, i;
  return { rotate: e.rotate || 0, flip: { horizontal: ((t = e?.flip) === null || t === void 0 ? void 0 : t.horizontal) || !1, vertical: ((i = e?.flip) === null || i === void 0 ? void 0 : i.vertical) || !1 } };
}
function Xs(e) {
  return new Promise((function(t, i) {
    try {
      if (e) if (/^data:/i.test(e)) t((function(r) {
        r = r.replace(/^data:([^;]+);base64,/gim, "");
        for (var m = atob(r), h = m.length, d = new ArrayBuffer(h), v = new Uint8Array(d), g = 0; g < h; g++) v[g] = m.charCodeAt(g);
        return d;
      })(e));
      else if (/^blob:/i.test(e)) {
        var n = new FileReader();
        n.onload = function(r) {
          t(r.target.result);
        }, o = e, l = function(r) {
          n.readAsArrayBuffer(r);
        }, (c = new XMLHttpRequest()).open("GET", o, !0), c.responseType = "blob", c.onload = function() {
          this.status != 200 && this.status !== 0 || l(this.response);
        }, c.send();
      } else {
        var s = new XMLHttpRequest();
        s.onreadystatechange = function() {
          s.readyState === 4 && (s.status === 200 || s.status === 0 ? t(s.response) : i("Warning: could not load an image to parse its orientation"), s = null);
        }, s.onprogress = function() {
          s.getResponseHeader("content-type") !== "image/jpeg" && s.abort();
        }, s.withCredentials = !1, s.open("GET", e, !0), s.responseType = "arraybuffer", s.send(null);
      }
      else i("Error: the image is empty");
    } catch (r) {
      i(r);
    }
    var o, l, c;
  }));
}
function Ri(e) {
  var t = e.rotate, i = e.flip, n = e.scaleX, s = e.scaleY, o = "";
  return o += " rotate(" + t + "deg) ", o += " scaleX(" + n * (i.horizontal ? -1 : 1) + ") ", o += " scaleY(" + s * (i.vertical ? -1 : 1) + ") ";
}
function Qs(e) {
  try {
    var t, i = new DataView(e), n = void 0, s = void 0, o = void 0, l = void 0;
    if (i.getUint8(0) === 255 && i.getUint8(1) === 216) for (var c = i.byteLength, r = 2; r + 1 < c; ) {
      if (i.getUint8(r) === 255 && i.getUint8(r + 1) === 225) {
        o = r;
        break;
      }
      r++;
    }
    if (o && (n = o + 10, (function(g, w, b) {
      var x, y = "";
      for (x = w, b += w; x < b; x++) y += String.fromCharCode(g.getUint8(x));
      return y;
    })(i, o + 4, 4) === "Exif")) {
      var m = i.getUint16(n);
      if (((s = m === 18761) || m === 19789) && i.getUint16(n + 2, s) === 42) {
        var h = i.getUint32(n + 4, s);
        h >= 8 && (l = n + h);
      }
    }
    if (l) {
      for (var d = i.getUint16(l, s), v = 0; v < d; v++)
        if (r = l + 12 * v + 2, i.getUint16(r, s) === 274) {
          r += 8, t = i.getUint16(r, s), i.setUint16(r, 1, s);
          break;
        }
    }
    return t;
  } catch {
    return null;
  }
}
function li(e, t) {
  var i = t.getBoundingClientRect(), n = i.left, s = i.top, o = { left: 0, top: 0 }, l = 0;
  return e.forEach((function(c) {
    o.left += (c.clientX - n) / e.length, o.top += (c.clientY - s) / e.length;
  })), e.forEach((function(c) {
    l += xi({ x: o.left, y: o.top }, { x: c.clientX - n, y: c.clientY - s });
  })), { centerMass: o, spread: l, count: e.length };
}
var zi = { props: { touchMove: { type: Boolean, required: !0 }, mouseMove: { type: Boolean, required: !0 }, touchResize: { type: Boolean, required: !0 }, wheelResize: { type: [Boolean, Object], required: !0 }, eventsFilter: { type: Function, required: !1 } }, beforeMount: function() {
  window.addEventListener("mouseup", this.onMouseUp, { passive: !1 }), window.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), window.addEventListener("touchmove", this.onTouchMove, { passive: !1 }), window.addEventListener("touchend", this.onTouchEnd, { passive: !1 });
}, beforeUnmount: function() {
  window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
}, created: function() {
  this.transforming = !1, this.debouncedProcessEnd = Ft(this.processEnd), this.touches = [];
}, methods: { processMove: function(e, t) {
  if (this.touches.length) {
    if (this.touches.length === 1 && t.length === 1) this.$emit("move", new lt({ left: this.touches[0].clientX - t[0].clientX, top: this.touches[0].clientY - t[0].clientY }));
    else if (this.touches.length > 1 && this.touchResize) {
      var i = li(t, this.$refs.container), n = this.oldGeometricProperties;
      n.count === i.count && n.count > 1 && this.$emit("resize", new lt({ left: n.centerMass.left - i.centerMass.left, top: n.centerMass.top - i.centerMass.top }, { factor: n.spread / i.spread, center: i.centerMass })), this.oldGeometricProperties = i;
    }
    this.touches = t;
  }
}, processEnd: function() {
  this.transforming && (this.transforming = !1, this.$emit("transform-end"));
}, processStart: function() {
  this.transforming = !0, this.debouncedProcessEnd.clear();
}, processEvent: function(e) {
  return this.eventsFilter ? this.eventsFilter(e, this.transforming) !== !1 : (e.preventDefault(), e.stopPropagation(), !0);
}, onTouchStart: function(e) {
  if (e.cancelable && (this.touchMove || this.touchResize && e.touches.length > 1) && this.processEvent(e)) {
    var t = this.$refs.container, i = t.getBoundingClientRect(), n = i.left, s = i.top, o = i.bottom, l = i.right;
    this.touches = Ze(e.touches).filter((function(c) {
      return c.clientX > n && c.clientX < l && c.clientY > s && c.clientY < o;
    })), this.oldGeometricProperties = li(this.touches, t);
  }
}, onTouchEnd: function(e) {
  e.touches.length === 0 && (this.touches = [], this.processEnd());
}, onTouchMove: function(e) {
  var t = this;
  if (this.touches.length) {
    var i = Ze(e.touches).filter((function(n) {
      return !n.identifier || t.touches.find((function(s) {
        return s.identifier === n.identifier;
      }));
    }));
    this.processEvent(e) && (this.processMove(e, i), this.processStart());
  }
}, onMouseDown: function(e) {
  if (this.mouseMove && "buttons" in e && e.buttons === 1 && this.processEvent(e)) {
    var t = { fake: !0, clientX: e.clientX, clientY: e.clientY };
    this.touches = [t], this.processStart();
  }
}, onMouseMove: function(e) {
  this.touches.length && this.processEvent(e) && this.processMove(e, [{ clientX: e.clientX, clientY: e.clientY }]);
}, onMouseUp: function() {
  this.touches = [], this.processEnd();
}, onWheel: function(e) {
  if (this.wheelResize && this.processEvent(e)) {
    var t = this.$refs.container.getBoundingClientRect(), i = t.left, n = t.top, s = 1 + this.wheelResize.ratio * (l = e.deltaY || e.detail || e.wheelDelta, (c = +l) == 0 || yi(c) ? c : c > 0 ? 1 : -1), o = { left: e.clientX - i, top: e.clientY - n };
    this.$emit("resize", new lt({}, { factor: s, center: o })), this.touches.length || this.debouncedProcessEnd();
  }
  var l, c;
} }, emits: ["resize", "move", "transform-end"] };
zi.render = function(e, t, i, n, s, o) {
  return f(), C("div", { ref: "container", onTouchstart: t[1] || (t[1] = function() {
    return o.onTouchStart && o.onTouchStart.apply(o, arguments);
  }), onMousedown: t[2] || (t[2] = function() {
    return o.onMouseDown && o.onMouseDown.apply(o, arguments);
  }), onWheel: t[3] || (t[3] = function() {
    return o.onWheel && o.onWheel.apply(o, arguments);
  }) }, [Re(e.$slots, "default")], 544);
};
var Vt = { components: { TransformableImage: zi }, props: { touchMove: { type: Boolean, required: !0 }, mouseMove: { type: Boolean, required: !0 }, touchResize: { type: Boolean, required: !0 }, wheelResize: { type: [Boolean, Object], required: !0 } }, emits: ["resize", "move"] };
Vt.render = function(e, t, i, n, s, o) {
  var l = Le("transformable-image");
  return f(), C(l, { "touch-move": i.touchMove, "touch-resize": i.touchResize, "mouse-move": i.mouseMove, "wheel-resize": i.wheelResize, onMove: t[1] || (t[1] = function(c) {
    return e.$emit("move", c);
  }), onResize: t[2] || (t[2] = function(c) {
    return e.$emit("resize", c);
  }) }, { default: W((function() {
    return [Re(e.$slots, "default")];
  })), _: 3 }, 8, ["touch-move", "touch-resize", "mouse-move", "wheel-resize"]);
};
var gt = ze("vue-preview"), Ti = { props: { coordinates: { type: Object }, transitions: { type: Object }, image: { type: Object, default: function() {
  return {};
} }, imageClass: { type: String }, width: { type: Number }, height: { type: Number }, fill: { type: Boolean } }, data: function() {
  return { calculatedImageSize: { width: 0, height: 0 }, calculatedSize: { width: 0, height: 0 } };
}, computed: { classes: function() {
  return { root: gt({ fill: this.fill }), wrapper: gt("wrapper"), imageWrapper: gt("image-wrapper"), image: de(gt("image"), this.imageClass) };
}, style: function() {
  if (this.fill) return {};
  var e = {};
  return this.width && (e.width = "".concat(this.size.width, "px")), this.height && (e.height = "".concat(this.size.height, "px")), this.transitions && this.transitions.enabled && (e.transition = "".concat(this.transitions.time, "ms ").concat(this.transitions.timingFunction)), e;
}, wrapperStyle: function() {
  var e = { width: "".concat(this.size.width, "px"), height: "".concat(this.size.height, "px"), left: "calc(50% - ".concat(this.size.width / 2, "px)"), top: "calc(50% - ".concat(this.size.height / 2, "px)") };
  return this.transitions && this.transitions.enabled && (e.transition = "".concat(this.transitions.time, "ms ").concat(this.transitions.timingFunction)), e;
}, imageStyle: function() {
  if (this.coordinates && this.image) {
    var e = this.coordinates.width / this.size.width, t = Z(Z({ rotate: 0, flip: { horizontal: !1, vertical: !1 } }, this.image.transforms), {}, { scaleX: 1 / e, scaleY: 1 / e }), i = this.imageSize.width, n = this.imageSize.height, s = $i({ width: i, height: n }, t.rotate), o = { width: "".concat(i, "px"), height: "".concat(n, "px"), left: "0px", top: "0px" }, l = { rotate: { left: (i - s.width) * t.scaleX / 2, top: (n - s.height) * t.scaleY / 2 }, scale: { left: (1 - t.scaleX) * i / 2, top: (1 - t.scaleY) * n / 2 } };
    return o.transform = `translate(
				`.concat(-this.coordinates.left / e - l.rotate.left - l.scale.left, "px,").concat(-this.coordinates.top / e - l.rotate.top - l.scale.top, "px) ") + Ri(t), this.transitions && this.transitions.enabled && (o.transition = "".concat(this.transitions.time, "ms ").concat(this.transitions.timingFunction)), o;
  }
  return {};
}, size: function() {
  return { width: this.width || this.calculatedSize.width, height: this.height || this.calculatedSize.height };
}, imageSize: function() {
  return { width: this.image.width || this.calculatedImageSize.width, height: this.image.height || this.calculatedImageSize.height };
} }, watch: { image: function(e) {
  (e.width || e.height) && this.onChangeImage();
} }, mounted: function() {
  var e = this;
  this.onChangeImage(), this.$refs.image.addEventListener("load", (function() {
    e.refreshImage();
  })), window.addEventListener("resize", this.refresh), window.addEventListener("orientationchange", this.refresh);
}, unmounted: function() {
  window.removeEventListener("resize", this.refresh), window.removeEventListener("orientationchange", this.refresh);
}, methods: { refreshImage: function() {
  var e = this.$refs.image;
  this.calculatedImageSize.height = e.naturalHeight, this.calculatedImageSize.width = e.naturalWidth;
}, refresh: function() {
  var e = this.$refs.root;
  this.width || (this.calculatedSize.width = e.clientWidth), this.height || (this.calculatedSize.height = e.clientHeight);
}, onChangeImage: function() {
  var e = this.$refs.image;
  e && e.complete && this.refreshImage(), this.refresh();
} } };
Ti.render = function(e, t, i, n, s, o) {
  return f(), C("div", { ref: "root", class: o.classes.root, style: o.style }, [A("div", { ref: "wrapper", class: o.classes.wrapper, style: o.wrapperStyle }, [ae(A("img", { ref: "image", src: i.image && i.image.src, class: o.classes.image, style: o.imageStyle }, null, 14, ["src"]), [[Ce, i.image && i.image.src]])], 6)], 6);
};
var Di = { components: { Preview: Ti }, inheritAttrs: !1 };
Di.render = function(e, t, i, n, s, o) {
  var l = Le("preview");
  return f(), C(l, Me(e.$attrs, { fill: !0 }), null, 16);
};
var Dt = ze("vue-rectangle-stencil"), Ii = { name: "RectangleStencil", components: { StencilPreview: Di, BoundingBox: Mi, DraggableArea: Ei }, props: { image: { type: Object }, coordinates: { type: Object }, stencilCoordinates: { type: Object }, handlers: { type: Object }, handlersComponent: { type: [Object, String], default: function() {
  return Kt;
} }, lines: { type: Object }, linesComponent: { type: [Object, String], default: function() {
  return Gt;
} }, aspectRatio: { type: [Number, String] }, minAspectRatio: { type: [Number, String] }, maxAspectRatio: { type: [Number, String] }, movable: { type: Boolean, default: !0 }, resizable: { type: Boolean, default: !0 }, transitions: { type: Object }, movingClass: { type: String }, resizingClass: { type: String }, previewClass: { type: String }, boundingBoxClass: { type: String }, linesClasses: { type: Object, default: function() {
  return {};
} }, linesWrappersClasses: { type: Object, default: function() {
  return {};
} }, handlersClasses: { type: Object, default: function() {
  return {};
} }, handlersWrappersClasses: { type: Object, default: function() {
  return {};
} } }, data: function() {
  return { moving: !1, resizing: !1 };
}, computed: { classes: function() {
  return { stencil: de(Dt({ movable: this.movable, moving: this.moving, resizing: this.resizing }), this.moving && this.movingClass, this.resizing && this.resizingClass), preview: de(Dt("preview"), this.previewClass), boundingBox: de(Dt("bounding-box"), this.boundingBoxClass) };
}, style: function() {
  var e = this.stencilCoordinates, t = e.height, i = e.width, n = e.left, s = e.top, o = { width: "".concat(i, "px"), height: "".concat(t, "px"), transform: "translate(".concat(n, "px, ").concat(s, "px)") };
  return this.transitions && this.transitions.enabled && (o.transition = "".concat(this.transitions.time, "ms ").concat(this.transitions.timingFunction)), o;
} }, methods: { onMove: function(e) {
  this.$emit("move", e), this.moving = !0;
}, onMoveEnd: function() {
  this.$emit("move-end"), this.moving = !1;
}, onResize: function(e) {
  this.$emit("resize", e), this.resizing = !0;
}, onResizeEnd: function() {
  this.$emit("resize-end"), this.resizing = !1;
}, aspectRatios: function() {
  return { minimum: this.aspectRatio || this.minAspectRatio, maximum: this.aspectRatio || this.maxAspectRatio };
} }, emits: ["resize", "resize-end", "move", "move-end"] };
Ii.render = function(e, t, i, n, s, o) {
  var l = Le("stencil-preview"), c = Le("draggable-area"), r = Le("bounding-box");
  return f(), C("div", { class: o.classes.stencil, style: o.style }, [A(r, { width: i.stencilCoordinates.width, height: i.stencilCoordinates.height, transitions: i.transitions, class: o.classes.boundingBox, handlers: i.handlers, "handlers-component": i.handlersComponent, "handlers-classes": i.handlersClasses, "handlers-wrappers-classes": i.handlersWrappersClasses, lines: i.lines, "lines-component": i.linesComponent, "lines-classes": i.linesClasses, "lines-wrappers-classes": i.linesWrappersClasses, resizable: i.resizable, onResize: o.onResize, onResizeEnd: o.onResizeEnd }, { default: W((function() {
    return [A(c, { movable: i.movable, onMove: o.onMove, onMoveEnd: o.onMoveEnd }, { default: W((function() {
      return [A(l, { image: i.image, coordinates: i.coordinates, width: i.stencilCoordinates.width, height: i.stencilCoordinates.height, class: o.classes.preview, transitions: i.transitions }, null, 8, ["image", "coordinates", "width", "height", "class", "transitions"])];
    })), _: 1 }, 8, ["movable", "onMove", "onMoveEnd"])];
  })), _: 1 }, 8, ["width", "height", "transitions", "class", "handlers", "handlers-component", "handlers-classes", "handlers-wrappers-classes", "lines", "lines-component", "lines-classes", "lines-wrappers-classes", "resizable", "onResize", "onResizeEnd"])], 6);
};
var Zs = ["transitions"], Oe = ze("vue-advanced-cropper"), Li = { name: "Cropper", components: { BackgroundWrapper: Vt }, props: { src: { type: String, default: null }, stencilComponent: { type: [Object, String], default: function() {
  return Ii;
} }, backgroundWrapperComponent: { type: [Object, String], default: function() {
  return Vt;
} }, stencilProps: { type: Object, default: function() {
  return {};
} }, autoZoom: { type: Boolean, default: !1 }, imageClass: { type: String }, boundariesClass: { type: String }, backgroundClass: { type: String }, foregroundClass: { type: String }, minWidth: { type: [Number, String] }, minHeight: { type: [Number, String] }, maxWidth: { type: [Number, String] }, maxHeight: { type: [Number, String] }, debounce: { type: [Boolean, Number], default: 500 }, transitions: { type: Boolean, default: !0 }, checkOrientation: { type: Boolean, default: !0 }, canvas: { type: [Object, Boolean], default: !0 }, crossOrigin: { type: [Boolean, String], default: void 0 }, transitionTime: { type: Number, default: 300 }, imageRestriction: { type: String, default: "fit-area", validator: function(e) {
  return Rs.indexOf(e) !== -1;
} }, roundResult: { type: Boolean, default: !0 }, defaultSize: { type: [Function, Object] }, defaultPosition: { type: [Function, Object] }, defaultVisibleArea: { type: [Function, Object] }, defaultTransforms: { type: [Function, Object] }, defaultBoundaries: { type: [Function, String], validator: function(e) {
  return !(typeof e == "string" && e !== "fill" && e !== "fit");
} }, priority: { type: String, default: "coordinates" }, stencilSize: { type: [Object, Function] }, resizeImage: { type: [Boolean, Object], default: !0 }, moveImage: { type: [Boolean, Object], default: !0 }, autoZoomAlgorithm: { type: Function }, resizeAlgorithm: { type: Function, default: function(e) {
  var t = e.event, i = e.coordinates, n = e.aspectRatio, s = e.positionRestrictions, o = e.sizeRestrictions, l = L(L({}, i), { right: i.left + i.width, bottom: i.top + i.height }), c = t.params || {}, r = L({}, t.directions), m = c.allowedDirections || { left: !0, right: !0, bottom: !0, top: !0 };
  o.widthFrozen && (r.left = 0, r.right = 0), o.heightFrozen && (r.top = 0, r.bottom = 0), Ie.forEach((function(F) {
    m[F] || (r[F] = 0);
  }));
  var h = De(l, r = ai({ coordinates: l, directions: r, sizeRestrictions: o, positionRestrictions: s })).width, d = De(l, r).height, v = c.preserveRatio ? J(l) : Rt(h / d, n);
  if (v) {
    var g = c.respectDirection;
    if (g || (g = l.width >= l.height || v === 1 ? "width" : "height"), g === "width") {
      var w = h / v - l.height;
      if (m.top && m.bottom) {
        var b = r.top, x = r.bottom;
        r.bottom = pt(w, x, b), r.top = pt(w, b, x);
      } else m.bottom ? r.bottom = w : m.top ? r.top = w : m.right ? r.right = 0 : m.left && (r.left = 0);
    } else if (g === "height") {
      var y = l.width - d * v;
      if (m.left && m.right) {
        var M = r.left, T = r.right;
        r.left = -pt(y, M, T), r.right = -pt(y, T, M);
      } else m.left ? r.left = -y : m.right ? r.right = -y : m.top ? r.top = 0 : m.bottom && (r.bottom = 0);
    }
    r = ai({ directions: r, coordinates: l, sizeRestrictions: o, positionRestrictions: s, preserveRatio: !0, compensate: c.compensate });
  }
  return h = De(l, r).width, d = De(l, r).height, (v = c.preserveRatio ? J(l) : Rt(h / d, n)) && Math.abs(v - h / d) > 1e-3 && Ie.forEach((function(F) {
    m[F] || (r[F] = 0);
  })), Pt({ event: new qt({ left: -r.left, top: -r.top }), coordinates: { width: i.width + r.right + r.left, height: i.height + r.top + r.bottom, left: i.left, top: i.top }, positionRestrictions: s });
} }, moveAlgorithm: { type: Function, default: Pt }, initStretcher: { type: Function, default: function(e) {
  var t = e.stretcher, i = e.imageSize, n = J(i);
  t.style.width = i.width + "px", t.style.height = t.clientWidth / n + "px", t.style.width = t.clientWidth + "px";
} }, fitCoordinates: { type: Function, default: function(e) {
  var t = e.visibleArea, i = e.coordinates, n = e.aspectRatio, s = e.sizeRestrictions, o = e.positionRestrictions, l = L(L({}, i), Pe({ width: i.width, height: i.height, aspectRatio: n, sizeRestrictions: { maxWidth: t.width, maxHeight: t.height, minHeight: Math.min(t.height, s.minHeight), minWidth: Math.min(t.width, s.minWidth) } }));
  return l = ge(l = xe(l, it(pe(i), pe(l))), St(He(t), o));
} }, fitVisibleArea: { type: Function, default: function(e) {
  var t = e.visibleArea, i = e.boundaries, n = e.getAreaRestrictions, s = e.coordinates, o = L({}, t);
  o.height = o.width / J(i), o.top += (t.height - o.height) / 2, (s.height - o.height > 0 || s.width - o.width > 0) && (o = Ae(o, Math.max(s.height / o.height, s.width / o.width)));
  var l = yt(ot(s, He(o = Ae(o, xt(o, n({ visibleArea: o, type: "resize" }))))));
  return o.width < s.width && (l.left = 0), o.height < s.height && (l.top = 0), o = ge(o = xe(o, l), n({ visibleArea: o, type: "move" }));
} }, areaRestrictionsAlgorithm: { type: Function, default: function(e) {
  var t = e.visibleArea, i = e.boundaries, n = e.imageSize, s = e.imageRestriction, o = e.type, l = {};
  return s === "fill-area" ? l = { left: 0, top: 0, right: n.width, bottom: n.height } : s === "fit-area" && (J(i) > J(n) ? (l = { top: 0, bottom: n.height }, t && o === "move" && (t.width > n.width ? (l.left = -(t.width - n.width) / 2, l.right = n.width - l.left) : (l.left = 0, l.right = n.width))) : (l = { left: 0, right: n.width }, t && o === "move" && (t.height > n.height ? (l.top = -(t.height - n.height) / 2, l.bottom = n.height - l.top) : (l.top = 0, l.bottom = n.height)))), l;
} }, sizeRestrictionsAlgorithm: { type: Function, default: function(e) {
  return { minWidth: e.minWidth, minHeight: e.minHeight, maxWidth: e.maxWidth, maxHeight: e.maxHeight };
} }, positionRestrictionsAlgorithm: { type: Function, default: function(e) {
  var t = e.imageSize, i = {};
  return e.imageRestriction !== "none" && (i = { left: 0, top: 0, right: t.width, bottom: t.height }), i;
} } }, data: function() {
  return { transitionsActive: !1, imageLoaded: !1, imageAttributes: { width: null, height: null, crossOrigin: null, src: null }, defaultImageTransforms: { rotate: 0, flip: { horizontal: !1, vertical: !1 } }, appliedImageTransforms: { rotate: 0, flip: { horizontal: !1, vertical: !1 } }, boundaries: { width: 0, height: 0 }, visibleArea: null, coordinates: Z({}, ni) };
}, computed: { image: function() {
  return { src: this.imageAttributes.src, width: this.imageAttributes.width, height: this.imageAttributes.height, transforms: this.imageTransforms };
}, imageTransforms: function() {
  return { rotate: this.appliedImageTransforms.rotate, flip: { horizontal: this.appliedImageTransforms.flip.horizontal, vertical: this.appliedImageTransforms.flip.vertical }, translateX: this.visibleArea ? this.visibleArea.left / this.coefficient : 0, translateY: this.visibleArea ? this.visibleArea.top / this.coefficient : 0, scaleX: 1 / this.coefficient, scaleY: 1 / this.coefficient };
}, imageSize: function() {
  var e = (function(t) {
    return t * Math.PI / 180;
  })(this.imageTransforms.rotate);
  return { width: Math.abs(this.imageAttributes.width * Math.cos(e)) + Math.abs(this.imageAttributes.height * Math.sin(e)), height: Math.abs(this.imageAttributes.width * Math.sin(e)) + Math.abs(this.imageAttributes.height * Math.cos(e)) };
}, initialized: function() {
  return !!(this.visibleArea && this.imageLoaded);
}, settings: function() {
  var e = Bt(this.resizeImage, { touch: !0, wheel: { ratio: 0.1 }, adjustStencil: !0 }, { touch: !1, wheel: !1, adjustStencil: !1 });
  return { moveImage: Bt(this.moveImage, { touch: !0, mouse: !0 }, { touch: !1, mouse: !1 }), resizeImage: e };
}, coefficient: function() {
  return this.visibleArea ? this.visibleArea.width / this.boundaries.width : 0;
}, areaRestrictions: function() {
  return this.imageLoaded ? this.areaRestrictionsAlgorithm({ imageSize: this.imageSize, imageRestriction: this.imageRestriction, boundaries: this.boundaries }) : {};
}, transitionsOptions: function() {
  return { enabled: this.transitionsActive, timingFunction: "ease-in-out", time: 350 };
}, sizeRestrictions: function() {
  if (this.boundaries.width && this.boundaries.height && this.imageSize.width && this.imageSize.height) {
    var e = this.sizeRestrictionsAlgorithm({ imageSize: this.imageSize, minWidth: me(this.minWidth) ? 0 : ft(this.minWidth), minHeight: me(this.minHeight) ? 0 : ft(this.minHeight), maxWidth: me(this.maxWidth) ? 1 / 0 : ft(this.maxWidth), maxHeight: me(this.maxHeight) ? 1 / 0 : ft(this.maxHeight) });
    if (e = (function(n) {
      var s = n.areaRestrictions, o = n.sizeRestrictions, l = n.boundaries, c = n.positionRestrictions, r = L(L({}, o), { minWidth: o.minWidth !== void 0 ? o.minWidth : 0, minHeight: o.minHeight !== void 0 ? o.minHeight : 0, maxWidth: o.maxWidth !== void 0 ? o.maxWidth : 1 / 0, maxHeight: o.maxHeight !== void 0 ? o.maxHeight : 1 / 0 });
      c.left !== void 0 && c.right !== void 0 && (r.maxWidth = Math.min(r.maxWidth, c.right - c.left)), c.bottom !== void 0 && c.top !== void 0 && (r.maxHeight = Math.min(r.maxHeight, c.bottom - c.top));
      var m = Ot(s), h = Ci(l, m);
      return m.width < 1 / 0 && (!r.maxWidth || r.maxWidth > h.width) && (r.maxWidth = Math.min(r.maxWidth, h.width)), m.height < 1 / 0 && (!r.maxHeight || r.maxHeight > h.height) && (r.maxHeight = Math.min(r.maxHeight, h.height)), r.minWidth > r.maxWidth && (r.minWidth = r.maxWidth, r.widthFrozen = !0), r.minHeight > r.maxHeight && (r.minHeight = r.maxHeight, r.heightFrozen = !0), r;
    })({ sizeRestrictions: e, areaRestrictions: this.getAreaRestrictions({ visibleArea: this.visibleArea, type: "resize" }), imageSize: this.imageSize, boundaries: this.boundaries, positionRestrictions: this.positionRestrictions, imageRestriction: this.imageRestriction, visibleArea: this.visibleArea, stencilSize: this.getStencilSize() }), this.visibleArea && this.stencilSize) {
      var t = this.getStencilSize(), i = Ot(this.getAreaRestrictions({ visibleArea: this.visibleArea, type: "resize" }));
      e.maxWidth = Math.min(e.maxWidth, i.width * t.width / this.boundaries.width), e.maxHeight = Math.min(e.maxHeight, i.height * t.height / this.boundaries.height), e.maxWidth < e.minWidth && (e.minWidth = e.maxWidth), e.maxHeight < e.minHeight && (e.minHeight = e.maxHeight);
    }
    return e;
  }
  return { minWidth: 0, minHeight: 0, maxWidth: 0, maxHeight: 0 };
}, positionRestrictions: function() {
  return this.positionRestrictionsAlgorithm({ imageSize: this.imageSize, imageRestriction: this.imageRestriction });
}, classes: function() {
  return { cropper: Oe(), image: de(Oe("image"), this.imageClass), stencil: Oe("stencil"), boundaries: de(Oe("boundaries"), this.boundariesClass), stretcher: de(Oe("stretcher")), background: de(Oe("background"), this.backgroundClass), foreground: de(Oe("foreground"), this.foregroundClass), imageWrapper: de(Oe("image-wrapper")), cropperWrapper: de(Oe("cropper-wrapper")) };
}, stencilCoordinates: function() {
  if (this.initialized) {
    var e = this.coordinates, t = e.width, i = e.height, n = e.left, s = e.top;
    return { width: t / this.coefficient, height: i / this.coefficient, left: (n - this.visibleArea.left) / this.coefficient, top: (s - this.visibleArea.top) / this.coefficient };
  }
  return this.defaultCoordinates();
}, boundariesStyle: function() {
  var e = { width: this.boundaries.width ? "".concat(Math.round(this.boundaries.width), "px") : "auto", height: this.boundaries.height ? "".concat(Math.round(this.boundaries.height), "px") : "auto", transition: "opacity ".concat(this.transitionTime, "ms"), pointerEvents: this.imageLoaded ? "all" : "none" };
  return this.imageLoaded || (e.opacity = "0"), e;
}, imageStyle: function() {
  var e = this.imageAttributes.width > this.imageAttributes.height ? { width: Math.min(1024, this.imageAttributes.width), height: Math.min(1024, this.imageAttributes.width) / (this.imageAttributes.width / this.imageAttributes.height) } : { height: Math.min(1024, this.imageAttributes.height), width: Math.min(1024, this.imageAttributes.height) * (this.imageAttributes.width / this.imageAttributes.height) }, t = { left: (e.width - this.imageSize.width) / (2 * this.coefficient), top: (e.height - this.imageSize.height) / (2 * this.coefficient) }, i = { left: (1 - 1 / this.coefficient) * e.width / 2, top: (1 - 1 / this.coefficient) * e.height / 2 }, n = Z(Z({}, this.imageTransforms), {}, { scaleX: this.imageTransforms.scaleX * (this.imageAttributes.width / e.width), scaleY: this.imageTransforms.scaleY * (this.imageAttributes.height / e.height) }), s = { width: "".concat(e.width, "px"), height: "".concat(e.height, "px"), left: "0px", top: "0px", transform: "translate(".concat(-t.left - i.left - this.imageTransforms.translateX, "px, ").concat(-t.top - i.top - this.imageTransforms.translateY, "px)") + Ri(n) };
  return this.transitionsOptions.enabled && (s.transition = "".concat(this.transitionsOptions.time, "ms ").concat(this.transitionsOptions.timingFunction)), s;
} }, watch: { src: function() {
  this.onChangeImage();
}, stencilComponent: function() {
  var e = this;
  this.$nextTick((function() {
    e.resetCoordinates(), e.runAutoZoom("setCoordinates"), e.onChange();
  }));
}, minWidth: function() {
  this.onPropsChange();
}, maxWidth: function() {
  this.onPropsChange();
}, minHeight: function() {
  this.onPropsChange();
}, maxHeight: function() {
  this.onPropsChange();
}, imageRestriction: function() {
  this.reset();
}, stencilProps: function(e, t) {
  ["aspectRatio", "minAspectRatio", "maxAspectRatio"].find((function(i) {
    return e[i] !== t[i];
  })) && this.$nextTick(this.onPropsChange);
} }, created: function() {
  this.debouncedUpdate = Ft(this.update, this.debounce), this.debouncedDisableTransitions = Ft(this.disableTransitions, this.transitionsOptions.time), this.awaiting = !1;
}, mounted: function() {
  this.$refs.image.addEventListener("load", this.onSuccessLoadImage), this.$refs.image.addEventListener("error", this.onFailLoadImage), this.onChangeImage(), window.addEventListener("resize", this.refresh), window.addEventListener("orientationchange", this.refresh);
}, unmounted: function() {
  window.removeEventListener("resize", this.refresh), window.removeEventListener("orientationchange", this.refresh), this.imageAttributes.revoke && this.imageAttributes.src && URL.revokeObjectURL(this.imageAttributes.src), this.debouncedUpdate.clear(), this.debouncedDisableTransitions.clear();
}, methods: { getResult: function() {
  var e = this.initialized ? this.prepareResult(Z({}, this.coordinates)) : this.defaultCoordinates(), t = { rotate: this.imageTransforms.rotate % 360, flip: Z({}, this.imageTransforms.flip) };
  if (this.src && this.imageLoaded) {
    var i = this;
    return { image: this.image, coordinates: e, visibleArea: this.visibleArea ? Z({}, this.visibleArea) : null, imageTransforms: t, get canvas() {
      return i.canvas ? i.getCanvas() : void 0;
    } };
  }
  return { image: this.image, coordinates: e, visibleArea: this.visibleArea ? Z({}, this.visibleArea) : null, canvas: void 0, imageTransforms: t };
}, zoom: function(e, t) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = i.transitions, s = n === void 0 || n;
  this.onManipulateImage(new lt({}, { factor: 1 / e, center: t }), { normalize: !1, transitions: s });
}, move: function(e, t) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = i.transitions, s = n === void 0 || n;
  this.onManipulateImage(new lt({ left: e || 0, top: t || 0 }), { normalize: !1, transitions: s });
}, setCoordinates: function(e) {
  var t = this, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = i.autoZoom, s = n === void 0 || n, o = i.transitions, l = o === void 0 || o;
  this.$nextTick((function() {
    t.imageLoaded ? (t.transitionsActive || (l && t.enableTransitions(), t.coordinates = t.applyTransform(e), s && t.runAutoZoom("setCoordinates"), l && t.debouncedDisableTransitions()), t.onChange()) : t.delayedTransforms = e;
  }));
}, refresh: function() {
  var e = this, t = this.$refs.image;
  if (this.src && t) return this.initialized ? this.updateVisibleArea().then((function() {
    e.onChange();
  })) : this.resetVisibleArea().then((function() {
    e.onChange();
  }));
}, reset: function() {
  var e = this;
  return this.resetVisibleArea().then((function() {
    e.onChange(!1);
  }));
}, awaitRender: function(e) {
  var t = this;
  this.awaiting || (this.awaiting = !0, this.$nextTick((function() {
    e(), t.awaiting = !1;
  })));
}, prepareResult: function(e) {
  return this.roundResult ? (function(t) {
    var i = t.coordinates, n = t.sizeRestrictions, s = t.positionRestrictions, o = { width: Math.round(i.width), height: Math.round(i.height), left: Math.round(i.left), top: Math.round(i.top) };
    return o.width > n.maxWidth ? o.width = Math.floor(i.width) : o.width < n.minWidth && (o.width = Math.ceil(i.width)), o.height > n.maxHeight ? o.height = Math.floor(i.height) : o.height < n.minHeight && (o.height = Math.ceil(i.height)), ge(o, s);
  })(Z(Z({}, this.getPublicProperties()), {}, { positionRestrictions: vt(this.positionRestrictions, this.visibleArea), coordinates: e })) : e;
}, processAutoZoom: function(e, t, i, n) {
  var s = this.autoZoomAlgorithm;
  s || (s = this.stencilSize ? Ds : this.autoZoom ? Is : Ls);
  var o = s({ event: { type: e, params: n }, visibleArea: t, coordinates: i, boundaries: this.boundaries, aspectRatio: this.getAspectRatio(), positionRestrictions: this.positionRestrictions, getAreaRestrictions: this.getAreaRestrictions, sizeRestrictions: this.sizeRestrictions, stencilSize: this.getStencilSize() });
  return Z(Z({}, o), {}, { changed: !oi(o.visibleArea, t) || !oi(o.coordinates, i) });
}, runAutoZoom: function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = t.transitions, n = i !== void 0 && i, s = xs(t, Zs), o = this.processAutoZoom(e, this.visibleArea, this.coordinates, s), l = o.visibleArea, c = o.coordinates, r = o.changed;
  n && r && this.enableTransitions(), this.visibleArea = l, this.coordinates = c, n && r && this.debouncedDisableTransitions();
}, normalizeEvent: function(e) {
  return (function(t) {
    var i = t.event, n = t.visibleArea, s = t.coefficient;
    if (i.type === "manipulateImage") return L(L({}, i), { move: { left: i.move && i.move.left ? s * i.move.left : 0, top: i.move && i.move.top ? s * i.move.top : 0 }, scale: { factor: i.scale && i.scale.factor ? i.scale.factor : 1, center: i.scale && i.scale.center ? { left: i.scale.center.left * s + n.left, top: i.scale.center.top * s + n.top } : null } });
    if (i.type === "resize") {
      var o = L(L({}, i), { directions: L({}, i.directions) });
      return Ie.forEach((function(c) {
        o.directions[c] *= s;
      })), o;
    }
    if (i.type === "move") {
      var l = L(L({}, i), { directions: L({}, i.directions) });
      return Es.forEach((function(c) {
        l.directions[c] *= s;
      })), l;
    }
    return i;
  })(Z(Z({}, this.getPublicProperties()), {}, { event: e }));
}, getCanvas: function() {
  if (this.$refs.canvas) {
    var e = this.$refs.canvas, t = this.$refs.image, i = this.imageTransforms.rotate !== 0 || this.imageTransforms.flip.horizontal || this.imageTransforms.flip.vertical ? (function(c, r, m) {
      var h = m.rotate, d = m.flip, v = { width: r.naturalWidth, height: r.naturalHeight }, g = $i(v, h), w = c.getContext("2d");
      c.height = g.height, c.width = g.width, w.save();
      var b = Ne(pe(L({ left: 0, top: 0 }, v)), h);
      return w.translate(-(b.left - g.width / 2), -(b.top - g.height / 2)), w.rotate(h * Math.PI / 180), w.translate(d.horizontal ? v.width : 0, d.vertical ? v.height : 0), w.scale(d.horizontal ? -1 : 1, d.vertical ? -1 : 1), w.drawImage(r, 0, 0, v.width, v.height), w.restore(), c;
    })(this.$refs.sourceCanvas, t, this.imageTransforms) : t, n = Z({ minWidth: 0, minHeight: 0, maxWidth: 1 / 0, maxHeight: 1 / 0, maxArea: this.maxCanvasSize, imageSmoothingEnabled: !0, imageSmoothingQuality: "high", fillColor: "transparent" }, this.canvas), s = function(c) {
      return c.find((function(r) {
        return m = r, !Number.isNaN(parseFloat(m)) && isFinite(m);
        var m;
      }));
    }, o = Pe({ sizeRestrictions: { minWidth: s([n.width, n.minWidth]) || 0, minHeight: s([n.height, n.minHeight]) || 0, maxWidth: s([n.width, n.maxWidth]) || 1 / 0, maxHeight: s([n.height, n.maxHeight]) || 1 / 0 }, width: this.coordinates.width, height: this.coordinates.height, aspectRatio: { minimum: this.coordinates.width / this.coordinates.height, maximum: this.coordinates.width / this.coordinates.height } });
    if (n.maxArea && o.width * o.height > n.maxArea) {
      var l = Math.sqrt(n.maxArea / (o.width * o.height));
      o = { width: Math.round(l * o.width), height: Math.round(l * o.height) };
    }
    return (function(c, r, m, h, d) {
      c.width = h ? h.width : m.width, c.height = h ? h.height : m.height;
      var v = c.getContext("2d");
      v.clearRect(0, 0, c.width, c.height), d && (d.imageSmoothingEnabled && (v.imageSmoothingEnabled = d.imageSmoothingEnabled), d.imageSmoothingQuality && (v.imageSmoothingQuality = d.imageSmoothingQuality), d.fillColor && (v.fillStyle = d.fillColor, v.fillRect(0, 0, c.width, c.height), v.save()));
      var g = m.left < 0 ? -m.left : 0, w = m.top < 0 ? -m.top : 0;
      v.drawImage(r, m.left + g, m.top + w, m.width, m.height, g * (c.width / m.width), w * (c.height / m.height), c.width, c.height);
    })(e, i, this.coordinates, o, n), e;
  }
}, update: function() {
  this.$emit("change", this.getResult());
}, applyTransform: function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 && arguments[1], i = this.visibleArea && t ? zs(this.sizeRestrictions, this.visibleArea) : this.sizeRestrictions, n = this.visibleArea && t ? vt(this.positionRestrictions, this.visibleArea) : this.positionRestrictions;
  return Ts({ transform: e, coordinates: this.coordinates, imageSize: this.imageSize, sizeRestrictions: i, positionRestrictions: n, aspectRatio: this.getAspectRatio(), visibleArea: this.visibleArea });
}, resetCoordinates: function() {
  var e = this;
  if (this.$refs.image) {
    this.$refs.cropper, this.$refs.image;
    var t = this.defaultSize;
    t || (t = this.stencilSize ? Bs : Fs);
    var i = this.sizeRestrictions;
    i.minWidth, i.minHeight, i.maxWidth, i.maxHeight;
    var n = et(t) ? t({ boundaries: this.boundaries, imageSize: this.imageSize, aspectRatio: this.getAspectRatio(), sizeRestrictions: this.sizeRestrictions, stencilSize: this.getStencilSize(), visibleArea: this.visibleArea }) : t, s = this.defaultPosition || Hs, o = [n, function(l) {
      var c = l.coordinates;
      return Z({}, et(s) ? s({ coordinates: c, imageSize: e.imageSize, visibleArea: e.visibleArea }) : e.defaultPosition);
    }];
    this.delayedTransforms && o.push.apply(o, Ze(Array.isArray(this.delayedTransforms) ? this.delayedTransforms : [this.delayedTransforms])), this.coordinates = this.applyTransform(o, !0), this.delayedTransforms = null;
  }
}, clearImage: function() {
  var e = this;
  this.imageLoaded = !1, setTimeout((function() {
    var t = e.$refs.stretcher;
    t && (t.style.height = "auto", t.style.width = "auto"), e.coordinates = e.defaultCoordinates(), e.boundaries = { width: 0, height: 0 };
  }), this.transitionTime);
}, enableTransitions: function() {
  this.transitions && (this.transitionsActive = !0);
}, disableTransitions: function() {
  this.transitionsActive = !1;
}, updateBoundaries: function() {
  var e = this, t = this.$refs.stretcher, i = this.$refs.cropper;
  return this.initStretcher({ cropper: i, stretcher: t, imageSize: this.imageSize }), this.$nextTick().then((function() {
    var n = { cropper: i, imageSize: e.imageSize };
    if (et(e.defaultBoundaries) ? e.boundaries = e.defaultBoundaries(n) : e.defaultBoundaries === "fit" ? e.boundaries = (function(s) {
      var o = s.cropper, l = s.imageSize, c = o.clientHeight, r = o.clientWidth, m = c, h = l.width * c / l.height;
      return h > r && (h = r, m = l.height * r / l.width), { width: h, height: m };
    })(n) : e.boundaries = (function(s) {
      var o = s.cropper;
      return { width: o.clientWidth, height: o.clientHeight };
    })(n), !e.boundaries.width || !e.boundaries.height) throw new Error("It's impossible to fit the cropper in the current container");
  }));
}, resetVisibleArea: function() {
  var e = this;
  return this.appliedImageTransforms = Z(Z({}, this.defaultImageTransforms), {}, { flip: Z({}, this.defaultImageTransforms.flip) }), this.updateBoundaries().then((function() {
    e.priority !== "visible-area" && (e.visibleArea = null, e.resetCoordinates());
    var t, i, n, s, o, l, c = e.defaultVisibleArea || Os;
    e.visibleArea = et(c) ? c({ imageSize: e.imageSize, boundaries: e.boundaries, coordinates: e.priority !== "visible-area" ? e.coordinates : null, getAreaRestrictions: e.getAreaRestrictions, stencilSize: e.getStencilSize() }) : e.defaultVisibleArea, e.visibleArea = (t = { visibleArea: e.visibleArea, boundaries: e.boundaries, getAreaRestrictions: e.getAreaRestrictions }, i = t.visibleArea, n = t.boundaries, s = t.getAreaRestrictions, o = L({}, i), l = J(n), o.width / o.height !== l && (o.height = o.width / l), ge(o, s({ visibleArea: o, type: "move" }))), e.priority === "visible-area" ? e.resetCoordinates() : e.coordinates = e.fitCoordinates({ visibleArea: e.visibleArea, coordinates: e.coordinates, aspectRatio: e.getAspectRatio(), positionRestrictions: e.positionRestrictions, sizeRestrictions: e.sizeRestrictions }), e.runAutoZoom("resetVisibleArea");
  })).catch((function() {
    e.visibleArea = null;
  }));
}, updateVisibleArea: function() {
  var e = this;
  return this.updateBoundaries().then((function() {
    e.visibleArea = e.fitVisibleArea({ imageSize: e.imageSize, boundaries: e.boundaries, visibleArea: e.visibleArea, coordinates: e.coordinates, getAreaRestrictions: e.getAreaRestrictions }), e.coordinates = e.fitCoordinates({ visibleArea: e.visibleArea, coordinates: e.coordinates, aspectRatio: e.getAspectRatio(), positionRestrictions: e.positionRestrictions, sizeRestrictions: e.sizeRestrictions }), e.runAutoZoom("updateVisibleArea");
  })).catch((function() {
    e.visibleArea = null;
  }));
}, onChange: function() {
  var e = !(arguments.length > 0 && arguments[0] !== void 0) || arguments[0];
  e && this.debounce ? this.debouncedUpdate() : this.update();
}, onChangeImage: function() {
  var e, t = this;
  if (this.imageLoaded = !1, this.delayedTransforms = null, this.src) {
    if ((function(s) {
      if (ti(s)) return !1;
      var o = window.location, l = /(\w+:)?(?:\/\/)([\w.-]+)?(?::(\d+))?\/?/.exec(s) || [], c = { protocol: l[1] || "", host: l[2] || "", port: l[3] || "" }, r = function(m) {
        return m.port || ((m.protocol || o.protocol) === "http" ? 80 : 433);
      };
      return !(!c.protocol && !c.host && !c.port || c.protocol && c.protocol == o.protocol && c.host && c.host == o.host && c.host && r(c) == r(o));
    })(this.src)) {
      var i = me(this.crossOrigin) ? this.canvas : this.crossOrigin;
      i === !0 && (i = "anonymous"), this.imageAttributes.crossOrigin = i || null;
    }
    if (this.checkOrientation) {
      var n = (e = this.src, new Promise((function(s) {
        Xs(e).then((function(o) {
          var l = Qs(o);
          s(o ? { source: e, arrayBuffer: o, orientation: l } : { source: e, arrayBuffer: null, orientation: null });
        })).catch((function(o) {
          console.warn(o), s({ source: e, arrayBuffer: null, orientation: null });
        }));
      })));
      setTimeout((function() {
        n.then(t.onParseImage);
      }), this.transitionTime);
    } else setTimeout((function() {
      t.onParseImage({ source: t.src });
    }), this.transitionTime);
  } else this.clearImage();
}, onFailLoadImage: function() {
  this.imageAttributes.src && (this.clearImage(), this.$emit("error"));
}, onSuccessLoadImage: function() {
  var e = this, t = this.$refs.image;
  t && !this.imageLoaded && (this.imageAttributes.height = t.naturalHeight, this.imageAttributes.width = t.naturalWidth, this.imageLoaded = !0, this.resetVisibleArea().then((function() {
    e.$emit("ready"), e.onChange(!1);
  })));
}, onParseImage: function(e) {
  var t = this, i = e.source, n = e.arrayBuffer, s = e.orientation;
  this.imageAttributes.revoke && this.imageAttributes.src && URL.revokeObjectURL(this.imageAttributes.src), this.imageAttributes.revoke = !1, n && s && s > 1 ? wi(i) || !ti(i) ? (this.imageAttributes.src = URL.createObjectURL(new Blob([n])), this.imageAttributes.revoke = !0) : this.imageAttributes.src = (function(o) {
    for (var l = [], c = new Uint8Array(o); c.length > 0; ) {
      var r = c.subarray(0, 8192);
      l.push(String.fromCharCode.apply(null, Array.from ? Array.from(r) : r.slice())), c = c.subarray(8192);
    }
    return "data:image/jpeg;base64," + btoa(l.join(""));
  })(n) : this.imageAttributes.src = i, et(this.defaultTransforms) ? this.appliedImageTransforms = Tt(this.defaultTransforms()) : bt(this.defaultTransforms) ? this.appliedImageTransforms = Tt(this.defaultTransforms) : this.appliedImageTransforms = (function(o) {
    var l = Tt({});
    if (o) switch (o) {
      case 2:
        l.flip.horizontal = !0;
        break;
      case 3:
        l.rotate = -180;
        break;
      case 4:
        l.flip.vertical = !0;
        break;
      case 5:
        l.rotate = 90, l.flip.vertical = !0;
        break;
      case 6:
        l.rotate = 90;
        break;
      case 7:
        l.rotate = 90, l.flip.horizontal = !0;
        break;
      case 8:
        l.rotate = -90;
    }
    return l;
  })(s), this.defaultImageTransforms = Z(Z({}, this.appliedImageTransforms), {}, { flip: Z({}, this.appliedImageTransforms.flip) }), this.$nextTick((function() {
    var o = t.$refs.image;
    o && o.complete && ((function(l) {
      return !!l.naturalWidth;
    })(o) ? t.onSuccessLoadImage() : t.onFailLoadImage());
  }));
}, onResizeEnd: function() {
  this.runAutoZoom("resize", { transitions: !0 });
}, onMoveEnd: function() {
  this.runAutoZoom("move", { transitions: !0 });
}, onMove: function(e) {
  var t = this;
  this.transitionsOptions.enabled || this.awaitRender((function() {
    t.coordinates = t.moveAlgorithm(Z(Z({}, t.getPublicProperties()), {}, { positionRestrictions: vt(t.positionRestrictions, t.visibleArea), coordinates: t.coordinates, event: t.normalizeEvent(e) })), t.onChange();
  }));
}, onResize: function(e) {
  var t = this;
  this.transitionsOptions.enabled || this.stencilSize && !this.autoZoom || this.awaitRender((function() {
    var i = t.sizeRestrictions, n = Math.min(t.coordinates.width, t.coordinates.height, 20 * t.coefficient);
    t.coordinates = t.resizeAlgorithm(Z(Z({}, t.getPublicProperties()), {}, { positionRestrictions: vt(t.positionRestrictions, t.visibleArea), sizeRestrictions: { maxWidth: Math.min(i.maxWidth, t.visibleArea.width), maxHeight: Math.min(i.maxHeight, t.visibleArea.height), minWidth: Math.max(i.minWidth, n), minHeight: Math.max(i.minHeight, n) }, event: t.normalizeEvent(e) })), t.onChange(), t.ticking = !1;
  }));
}, onManipulateImage: function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!this.transitionsOptions.enabled) {
    var i = t.transitions, n = i !== void 0 && i, s = t.normalize, o = s === void 0 || s;
    n && this.enableTransitions();
    var l = Ps(Z(Z({}, this.getPublicProperties()), {}, { event: o ? this.normalizeEvent(e) : e, getAreaRestrictions: this.getAreaRestrictions, imageRestriction: this.imageRestriction, adjustStencil: !this.stencilSize && this.settings.resizeImage.adjustStencil })), c = l.visibleArea, r = l.coordinates;
    this.visibleArea = c, this.coordinates = r, this.runAutoZoom("manipulateImage"), this.onChange(), n && this.debouncedDisableTransitions();
  }
}, onPropsChange: function() {
  this.coordinates = this.applyTransform(this.coordinates, !0), this.onChange(!1);
}, getAreaRestrictions: function() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.visibleArea, i = e.type, n = i === void 0 ? "move" : i;
  return this.areaRestrictionsAlgorithm({ boundaries: this.boundaries, imageSize: this.imageSize, imageRestriction: this.imageRestriction, visibleArea: t, type: n });
}, getAspectRatio: function(e) {
  var t, i, n = this.stencilProps, s = n.aspectRatio, o = n.minAspectRatio, l = n.maxAspectRatio;
  if (this.$refs.stencil && this.$refs.stencil.aspectRatios) {
    var c = this.$refs.stencil.aspectRatios();
    t = c.minimum, i = c.maximum;
  }
  if (me(t) && (t = me(s) ? o : s), me(i) && (i = me(s) ? l : s), !e && (me(t) || me(i))) {
    var r = this.getStencilSize(), m = r ? J(r) : null;
    me(t) && (t = ii(m) ? m : void 0), me(i) && (i = ii(m) ? m : void 0);
  }
  return { minimum: t, maximum: i };
}, getStencilSize: function() {
  if (this.stencilSize) return e = { currentStencilSize: { width: this.stencilCoordinates.width, height: this.stencilCoordinates.height }, stencilSize: this.stencilSize, boundaries: this.boundaries, coefficient: this.coefficient, coordinates: this.coordinates, aspectRatio: this.getAspectRatio(!0) }, t = e.boundaries, i = e.stencilSize, n = e.aspectRatio, Rt(J(s = et(i) ? i({ boundaries: t, aspectRatio: n }) : i), n) && (s = Pe({ sizeRestrictions: { maxWidth: t.width, maxHeight: t.height, minWidth: 0, minHeight: 0 }, width: s.width, height: s.height, aspectRatio: { minimum: n.minimum, maximum: n.maximum } })), (s.width > t.width || s.height > t.height) && (s = Pe({ sizeRestrictions: { maxWidth: t.width, maxHeight: t.height, minWidth: 0, minHeight: 0 }, width: s.width, height: s.height, aspectRatio: { minimum: J(s), maximum: J(s) } })), s;
  var e, t, i, n, s;
}, getPublicProperties: function() {
  return { coefficient: this.coefficient, visibleArea: this.visibleArea, coordinates: this.coordinates, boundaries: this.boundaries, sizeRestrictions: this.sizeRestrictions, positionRestrictions: this.positionRestrictions, aspectRatio: this.getAspectRatio(), imageRestriction: this.imageRestriction };
}, defaultCoordinates: function() {
  return Z({}, ni);
}, flip: function(e, t) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = i.transitions, s = n === void 0 || n;
  if (!this.transitionsActive) {
    s && this.enableTransitions();
    var o = Z({}, this.imageTransforms.flip), l = Ws({ flip: { horizontal: e ? !o.horizontal : o.horizontal, vertical: t ? !o.vertical : o.vertical }, previousFlip: o, rotate: this.imageTransforms.rotate, visibleArea: this.visibleArea, coordinates: this.coordinates, imageSize: this.imageSize, positionRestrictions: this.positionRestrictions, sizeRestrictions: this.sizeRestrictions, getAreaRestrictions: this.getAreaRestrictions, aspectRatio: this.getAspectRatio() }), c = l.visibleArea, r = l.coordinates;
    e && (this.appliedImageTransforms.flip.horizontal = !this.appliedImageTransforms.flip.horizontal), t && (this.appliedImageTransforms.flip.vertical = !this.appliedImageTransforms.flip.vertical), this.visibleArea = c, this.coordinates = r, this.onChange(), s && this.debouncedDisableTransitions();
  }
}, rotate: function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = t.transitions, n = i === void 0 || i;
  if (!this.transitionsActive) {
    n && this.enableTransitions();
    var s = Z({}, this.imageSize);
    this.appliedImageTransforms.rotate += e;
    var o = Vs({ visibleArea: this.visibleArea, coordinates: this.coordinates, previousImageSize: s, imageSize: this.imageSize, angle: e, positionRestrictions: this.positionRestrictions, sizeRestrictions: this.sizeRestrictions, getAreaRestrictions: this.getAreaRestrictions, aspectRatio: this.getAspectRatio() }), l = o.visibleArea, c = o.coordinates, r = this.processAutoZoom("rotateImage", l, c);
    l = r.visibleArea, c = r.coordinates, this.visibleArea = l, this.coordinates = c, this.onChange(), n && this.debouncedDisableTransitions();
  }
} }, emits: ["change", "error", "ready"] }, Js = { key: 0, ref: "canvas", style: { display: "none" } }, er = { key: 1, ref: "sourceCanvas", style: { display: "none" } };
Li.render = function(e, t, i, n, s, o) {
  return f(), C("div", { ref: "cropper", class: o.classes.cropper }, [A("div", { ref: "stretcher", class: o.classes.stretcher }, null, 2), A("div", { class: o.classes.boundaries, style: o.boundariesStyle }, [(f(), C(Qe(i.backgroundWrapperComponent), { class: o.classes.cropperWrapper, "wheel-resize": o.settings.resizeImage.wheel, "touch-resize": o.settings.resizeImage.touch, "touch-move": o.settings.moveImage.touch, "mouse-move": o.settings.moveImage.mouse, onMove: o.onManipulateImage, onResize: o.onManipulateImage }, { default: W((function() {
    return [A("div", { class: o.classes.background, style: o.boundariesStyle }, null, 6), A("div", { class: o.classes.imageWrapper }, [A("img", { ref: "image", crossorigin: s.imageAttributes.crossOrigin, src: s.imageAttributes.src, class: o.classes.image, style: o.imageStyle, onMousedown: t[1] || (t[1] = Ee((function() {
    }), ["prevent"])) }, null, 46, ["crossorigin", "src"])], 2), A("div", { class: o.classes.foreground, style: o.boundariesStyle }, null, 6), ae((f(), C(Qe(i.stencilComponent), Me({ ref: "stencil", image: o.image, coordinates: s.coordinates, "stencil-coordinates": o.stencilCoordinates, transitions: o.transitionsOptions }, i.stencilProps, { onResize: o.onResize, onResizeEnd: o.onResizeEnd, onMove: o.onMove, onMoveEnd: o.onMoveEnd }), null, 16, ["image", "coordinates", "stencil-coordinates", "transitions", "onResize", "onResizeEnd", "onMove", "onMoveEnd"])), [[Ce, s.imageLoaded]]), i.canvas ? (f(), C("canvas", Js, null, 512)) : E("", !0), i.canvas ? (f(), C("canvas", er, null, 512)) : E("", !0)];
  })), _: 1 }, 8, ["class", "wheel-resize", "touch-resize", "touch-move", "mouse-move", "onMove", "onResize"]))], 6)], 2);
};
const tr = { class: "vuefinder__image-preview" }, ir = { class: "vuefinder__image-preview__header" }, nr = ["title"], or = { class: "vuefinder__image-preview__actions" }, sr = { class: "vuefinder__image-preview__image-container h-[50vh] w-full" }, rr = ["src"], ar = /* @__PURE__ */ K({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(e, { emit: t }) {
    const i = t, n = G("ServiceContainer"), { t: s } = n.i18n, o = k(!1), l = k(""), c = k(!1), r = k(n.requester.getPreviewUrl(n.modal.data.storage, n.modal.data.item)), m = Xe("cropperRef"), h = async () => {
      o.value = !o.value;
    }, d = async () => {
      const g = m.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      g && g.toBlob((w) => {
        if (!w) return;
        l.value = "", c.value = !1;
        const b = new FormData();
        b.set("file", w), n.requester.send({
          url: "",
          method: "post",
          params: {
            q: "upload",
            storage: n.modal.data.storage,
            adapter: n.modal.data.storage,
            path: n.modal.data.item.path
          },
          body: b
        }).then(() => {
          l.value = s("Updated."), h(), i("success");
        }).catch((x) => {
          const y = x?.message ?? "Error";
          l.value = s(y), c.value = !0;
        });
      });
    };
    return be(() => {
      i("success");
    }), (v, g) => (f(), p("div", tr, [
      u("div", ir, [
        u("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: a(n).modal.data.item.path
        }, _(a(n).modal.data.item.basename), 9, nr),
        u("div", or, [
          o.value ? (f(), p("button", {
            key: 0,
            onClick: d,
            class: "vuefinder__image-preview__crop-button"
          }, _(a(s)("Crop")), 1)) : E("", !0),
          a(n).features.includes(a(ne).EDIT) ? (f(), p("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: g[0] || (g[0] = (w) => h())
          }, _(o.value ? a(s)("Cancel") : a(s)("Edit")), 1)) : E("", !0)
        ])
      ]),
      u("div", sr, [
        o.value ? (f(), C(a(Li), {
          key: 1,
          ref_key: "cropperRef",
          ref: m,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: r.value,
          "stencil-props": { aspectRatio: 795 / 341 },
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (f(), p("img", {
          key: 0,
          style: { width: "100%", height: "100%" },
          src: a(n).requester.getPreviewUrl(a(n).modal.data.storage, a(n).modal.data.item),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, rr))
      ]),
      l.value.length ? (f(), C(a(l), {
        key: 0,
        onHidden: g[1] || (g[1] = (w) => l.value = ""),
        error: c.value
      }, {
        default: W(() => [
          U(_(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : E("", !0)
    ]));
  }
}), lr = { class: "vuefinder__default-preview" }, cr = { class: "vuefinder__default-preview__header" }, ur = ["title"], dr = /* @__PURE__ */ K({
  __name: "Default",
  emits: ["success"],
  setup(e, { emit: t }) {
    const i = G("ServiceContainer"), n = t;
    return be(() => {
      n("success");
    }), (s, o) => (f(), p("div", lr, [
      u("div", cr, [
        u("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: a(i).modal.data.item.path
        }, _(a(i).modal.data.item.basename), 9, ur)
      ]),
      o[0] || (o[0] = u("div", null, null, -1))
    ]));
  }
}), hr = { class: "vuefinder__video-preview" }, mr = ["title"], fr = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, vr = ["src"], pr = /* @__PURE__ */ K({
  __name: "Video",
  emits: ["success"],
  setup(e, { emit: t }) {
    const i = G("ServiceContainer"), n = t, s = () => i.requester.getPreviewUrl(i.modal.data.storage, i.modal.data.item);
    return be(() => {
      n("success");
    }), (o, l) => (f(), p("div", hr, [
      u("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: a(i).modal.data.item.path
      }, _(a(i).modal.data.item.basename), 9, mr),
      u("div", null, [
        u("video", fr, [
          u("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, vr),
          l[0] || (l[0] = U(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), gr = { class: "vuefinder__audio-preview" }, _r = ["title"], br = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, wr = ["src"], yr = /* @__PURE__ */ K({
  __name: "Audio",
  emits: ["success"],
  setup(e, { emit: t }) {
    const i = t, n = G("ServiceContainer"), s = () => n.requester.getPreviewUrl(n.modal.data.storage, n.modal.data.item);
    return be(() => {
      i("success");
    }), (o, l) => (f(), p("div", gr, [
      u("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: a(n).modal.data.item.path
      }, _(a(n).modal.data.item.basename), 9, _r),
      u("div", null, [
        u("audio", br, [
          u("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, wr),
          l[0] || (l[0] = U(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), xr = { class: "vuefinder__pdf-preview" }, Sr = ["title"], kr = ["data"], Cr = ["src"], $r = /* @__PURE__ */ K({
  __name: "Pdf",
  emits: ["success"],
  setup(e, { emit: t }) {
    const i = G("ServiceContainer"), n = t, s = () => i.requester.getPreviewUrl(i.modal.data.storage, i.modal.data.item);
    return be(() => {
      n("success");
    }), (o, l) => (f(), p("div", xr, [
      u("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: a(i).modal.data.item.path
      }, _(a(i).modal.data.item.basename), 9, Sr),
      u("div", null, [
        u("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          u("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Cr)
        ], 8, kr)
      ])
    ]));
  }
});
function Ar(e, t = null) {
  return new Date(e * 1e3).toLocaleString(t ?? navigator.language ?? "en-US");
}
const Mr = { class: "vuefinder__preview-modal__content" }, Er = { key: 0 }, Rr = { class: "vuefinder__preview-modal__loading" }, zr = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Tr = { class: "vuefinder__preview-modal__details" }, Dr = { class: "font-bold" }, Ir = { class: "font-bold pl-2" }, Lr = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Hr = ["download", "href"], Hi = /* @__PURE__ */ K({
  __name: "ModalPreview",
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n, n = k(!1), s = (l) => (t.modal.data.item.mime_type ?? "").startsWith(l), o = t.features.includes(ne.PREVIEW);
    return o || (n.value = !0), (l, c) => (f(), C(Fe, null, {
      buttons: W(() => [
        u("button", {
          type: "button",
          onClick: c[6] || (c[6] = (r) => a(t).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(i)("Close")), 1),
        a(t).features.includes(a(ne).DOWNLOAD) ? (f(), p("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: a(t).requester.getDownloadUrl(a(t).modal.data.storage, a(t).modal.data.item),
          href: a(t).requester.getDownloadUrl(a(t).modal.data.storage, a(t).modal.data.item)
        }, _(a(i)("Download")), 9, Hr)) : E("", !0)
      ]),
      default: W(() => [
        u("div", null, [
          u("div", Mr, [
            a(o) ? (f(), p("div", Er, [
              s("text") ? (f(), C(ys, {
                key: 0,
                onSuccess: c[0] || (c[0] = (r) => n.value = !0)
              })) : s("image") ? (f(), C(ar, {
                key: 1,
                onSuccess: c[1] || (c[1] = (r) => n.value = !0)
              })) : s("video") ? (f(), C(pr, {
                key: 2,
                onSuccess: c[2] || (c[2] = (r) => n.value = !0)
              })) : s("audio") ? (f(), C(yr, {
                key: 3,
                onSuccess: c[3] || (c[3] = (r) => n.value = !0)
              })) : s("application/pdf") ? (f(), C($r, {
                key: 4,
                onSuccess: c[4] || (c[4] = (r) => n.value = !0)
              })) : (f(), C(dr, {
                key: 5,
                onSuccess: c[5] || (c[5] = (r) => n.value = !0)
              }))
            ])) : E("", !0),
            u("div", Rr, [
              n.value === !1 ? (f(), p("div", zr, [
                c[7] || (c[7] = u("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  u("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  u("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                u("span", null, _(a(i)("Loading")), 1)
              ])) : E("", !0)
            ])
          ])
        ]),
        u("div", Tr, [
          u("div", null, [
            u("span", Dr, _(a(i)("File Size")) + ": ", 1),
            U(_(a(t).filesize(a(t).modal.data.item.file_size)), 1)
          ]),
          u("div", null, [
            u("span", Ir, _(a(i)("Last Modified")) + ": ", 1),
            U(" " + _(a(Ar)(a(t).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(t).features.includes(a(ne).DOWNLOAD) ? (f(), p("div", Lr, [
          u("span", null, _(a(i)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : E("", !0)
      ]),
      _: 1
    }));
  }
}), Fr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Br(e, t) {
  return f(), p("svg", Fr, [...t[0] || (t[0] = [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Or = { render: Br }, Pr = { class: "vuefinder__move-modal__content" }, Vr = { class: "vuefinder__move-modal__description" }, Wr = { class: "vuefinder__move-modal__files vf-scrollbar" }, jr = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ur = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nr = { class: "vuefinder__move-modal__file-name" }, qr = { class: "vuefinder__move-modal__target-title" }, Yr = { class: "vuefinder__move-modal__target-directory" }, Kr = { class: "vuefinder__move-modal__target-path" }, Gr = { class: "vuefinder__move-modal__selected-items" }, Fi = /* @__PURE__ */ K({
  __name: "ModalTransfer",
  props: {
    q: {},
    title: {},
    body: {},
    successBtn: {},
    successText: {}
  },
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n, n = t.fs, s = N(n.path), o = e, l = k(t.modal.data.items.from), c = t.modal.data.items.to, r = k("");
    console.log(c.value.path);
    const m = () => {
      l.value.length && t.emitter.emit("vf-fetch", {
        params: {
          q: o.q,
          m: "post",
          storage: s.value.storage,
          path: s.value.path
        },
        body: {
          items: l.value.map(({ path: h, type: d }) => ({ path: h, type: d })),
          item: c.value.path
        },
        onSuccess: () => {
          t.emitter.emit("vf-toast-push", { label: o.successText });
        },
        onError: (h) => {
          r.value = i(h.message);
        }
      });
    };
    return (h, d) => (f(), C(Fe, null, {
      buttons: W(() => [
        u("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-primary"
        }, _(o.successBtn), 1),
        u("button", {
          type: "button",
          onClick: d[1] || (d[1] = (v) => a(t).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(i)("Cancel")), 1),
        u("div", Gr, _(a(i)("%s item(s) selected.", l.value.size)), 1)
      ]),
      default: W(() => [
        u("div", null, [
          A(Ve, {
            icon: a(Or),
            title: o.title
          }, null, 8, ["icon", "title"]),
          u("div", Pr, [
            u("p", Vr, _(o.body), 1),
            u("div", Wr, [
              (f(!0), p(oe, null, re(l.value, (v) => (f(), p("div", {
                class: "vuefinder__move-modal__file",
                key: v.path
              }, [
                u("div", null, [
                  v.type === "dir" ? (f(), p("svg", jr, [...d[2] || (d[2] = [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), p("svg", Ur, [...d[3] || (d[3] = [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                u("div", Nr, _(v.path), 1)
              ]))), 128))
            ]),
            u("h4", qr, _(a(i)("Target Directory")), 1),
            u("p", Yr, [
              d[4] || (d[4] = u("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "1"
              }, [
                u("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                })
              ], -1)),
              u("span", Kr, _(a(c).value.path), 1)
            ]),
            r.value.length ? (f(), C(a(r), {
              key: 0,
              onHidden: d[0] || (d[0] = (v) => r.value = ""),
              error: ""
            }, {
              default: W(() => [
                U(_(r.value), 1)
              ]),
              _: 1
            })) : E("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Bi = /* @__PURE__ */ K({
  __name: "ModalMove",
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n;
    return (n, s) => (f(), C(Fi, {
      q: "move",
      title: a(i)("Move files"),
      body: a(i)("Are you sure you want to move these files"),
      "success-btn": a(i)("Yes, Move!"),
      "success-text": a(i)("Files moved.")
    }, null, 8, ["title", "body", "success-btn", "success-text"]));
  }
}), Xr = /* @__PURE__ */ K({
  __name: "ModalCopy",
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n;
    return (n, s) => (f(), C(Fi, {
      q: "copy",
      title: a(i)("Copy files"),
      body: a(i)("Are you sure you want to copy these files"),
      "success-btn": a(i)("Yes, Copy!"),
      "success-text": a(i)("Files copied.")
    }, null, 8, ["title", "body", "success-btn", "success-text"]));
  }
}), Se = {
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
function Qr(e) {
  const t = e.search, i = e.fs, n = e.config, s = N(t.state), o = N(i.selectedItems), l = (c) => {
    if (c.code === Se.ESCAPE && (e.modal.close(), e.root.focus()), !e.modal.visible && !s.value?.searchMode) {
      if (c.code === Se.F2 && e.features.includes(ne.RENAME) && o.value.length === 1 && e.modal.open(Nt, { items: o.value }), c.code === Se.F5 && e.emitter.emit("vf-fetch", { params: { q: "index", storage: i.path.get().storage, path: i.path.get().path } }), c.code === Se.DELETE && o.value.length === 0 && e.modal.open(Ut, { items: o.value }), c.ctrlKey && c.code === Se.BACKSLASH && e.modal.open(vi), c.ctrlKey && c.code === Se.KEY_F && e.features.includes(ne.SEARCH) && (t.enterSearchMode(), c.preventDefault()), c.ctrlKey && c.code === Se.KEY_E && (n.toggle("showTreeView"), c.preventDefault()), c.ctrlKey && c.code === Se.ENTER && (n.toggle("fullScreen"), e.root.focus()), c.ctrlKey && c.code === Se.KEY_A && (i.selectAll(), c.preventDefault()), c.code === Se.SPACE && o.value.length === 1 && o.value[0]?.type !== "dir" && e.modal.open(Hi, { storage: i.path.get().storage, item: o.value[0] }), c.metaKey && c.code === Se.KEY_C) {
        if (o.value.length === 0) {
          e.emitter.emit("vf-toast-push", { type: "error", label: e.i18n.t("No items selected") });
          return;
        }
        i.setClipboard("copy", new Set(o.value.map((r) => r.path))), e.emitter.emit("vf-toast-push", { label: o.value.length === 1 ? e.i18n.t("Item copied to clipboard") : e.i18n.t("%s items copied to clipboard", o.value.length) }), c.preventDefault();
      }
      if (c.metaKey && c.code === Se.KEY_X) {
        if (o.value.length === 0) {
          e.emitter.emit("vf-toast-push", { type: "error", label: e.i18n.t("No items selected") });
          return;
        }
        i.setClipboard("cut", new Set(o.value.map((r) => r.path))), e.emitter.emit("vf-toast-push", { label: o.value.length === 1 ? e.i18n.t("Item cut to clipboard") : e.i18n.t("%s items cut to clipboard", o.value.length) }), c.preventDefault();
      }
      if (c.metaKey && c.code === Se.KEY_V) {
        if (i.getClipboard().items.size === 0) {
          e.emitter.emit("vf-toast-push", { type: "error", label: e.i18n.t("No items in clipboard") });
          return;
        }
        if (i.getClipboard().path === i.path.get().path) {
          e.emitter.emit("vf-toast-push", { type: "error", label: e.i18n.t("Cannot paste items to the same directory") });
          return;
        }
        if (i.getClipboard().type === "cut") {
          e.modal.open(Bi, { items: { from: i.getClipboard().items, to: i.path } }), i.clearClipboard();
          return;
        }
        if (i.getClipboard().type === "copy") {
          e.modal.open(Xr, { items: { from: i.getClipboard().items, to: i.path } });
          return;
        }
        c.preventDefault();
      }
    }
  };
  be(() => {
    e.root.addEventListener("keydown", l);
  }), en(() => {
    e.root.removeEventListener("keydown", l);
  });
}
const Zr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Jr(e, t) {
  return f(), p("svg", Zr, [...t[0] || (t[0] = [
    u("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Oi = { render: Jr }, ea = { class: "vuefinder__new-folder-modal__content" }, ta = { class: "vuefinder__new-folder-modal__form" }, ia = { class: "vuefinder__new-folder-modal__description" }, na = ["placeholder"], Pi = /* @__PURE__ */ K({
  __name: "ModalNewFolder",
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n, n = t.fs, s = N(n.path), o = k(""), l = k(""), c = () => {
      o.value !== "" && t.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          storage: s.value.storage,
          path: s.value.path
        },
        body: {
          name: o.value
        },
        onSuccess: () => {
          t.emitter.emit("vf-toast-push", { label: i("%s is created.", o.value) });
        },
        onError: (r) => {
          l.value = i(r.message);
        }
      });
    };
    return (r, m) => (f(), C(Fe, null, {
      buttons: W(() => [
        u("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, _(a(i)("Create")), 1),
        u("button", {
          type: "button",
          onClick: m[2] || (m[2] = (h) => a(t).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(i)("Cancel")), 1)
      ]),
      default: W(() => [
        u("div", null, [
          A(Ve, {
            icon: a(Oi),
            title: a(i)("New Folder")
          }, null, 8, ["icon", "title"]),
          u("div", ea, [
            u("div", ta, [
              u("p", ia, _(a(i)("Create a new folder")), 1),
              ae(u("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (h) => o.value = h),
                onKeyup: st(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(i)("Folder Name"),
                type: "text"
              }, null, 40, na), [
                [rt, o.value]
              ]),
              l.value.length ? (f(), C(a(l), {
                key: 0,
                onHidden: m[1] || (m[1] = (h) => l.value = ""),
                error: ""
              }, {
                default: W(() => [
                  U(_(l.value), 1)
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
}), oa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function sa(e, t) {
  return f(), p("svg", oa, [...t[0] || (t[0] = [
    u("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Vi = { render: sa }, ra = { class: "vuefinder__new-file-modal__content" }, aa = { class: "vuefinder__new-file-modal__form" }, la = { class: "vuefinder__new-file-modal__description" }, ca = ["placeholder"], ua = /* @__PURE__ */ K({
  __name: "ModalNewFile",
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n, n = t.fs, s = N(n.path), o = k(""), l = k(""), c = () => {
      o.value !== "" && t.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          storage: s.value.storage,
          path: s.value.path
        },
        body: {
          name: o.value
        },
        onSuccess: () => {
          t.emitter.emit("vf-toast-push", { label: i("%s is created.", o.value) });
        },
        onError: (r) => {
          l.value = i(r.message);
        }
      });
    };
    return (r, m) => (f(), C(Fe, null, {
      buttons: W(() => [
        u("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, _(a(i)("Create")), 1),
        u("button", {
          type: "button",
          onClick: m[2] || (m[2] = (h) => a(t).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(i)("Cancel")), 1)
      ]),
      default: W(() => [
        u("div", null, [
          A(Ve, {
            icon: a(Vi),
            title: a(i)("New File")
          }, null, 8, ["icon", "title"]),
          u("div", ra, [
            u("div", aa, [
              u("p", la, _(a(i)("Create a new file")), 1),
              ae(u("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (h) => o.value = h),
                onKeyup: st(c, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: a(i)("File Name"),
                type: "text"
              }, null, 40, ca), [
                [rt, o.value]
              ]),
              l.value.length ? (f(), C(a(l), {
                key: 0,
                onHidden: m[1] || (m[1] = (h) => l.value = ""),
                error: ""
              }, {
                default: W(() => [
                  U(_(l.value), 1)
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
}), ve = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function da() {
  const e = G("ServiceContainer"), { t } = e.i18n, i = e.fs, n = e.config, s = k({ QUEUE_ENTRY_STATUS: ve }), o = k(null), l = k(null), c = k(null), r = k(null), m = k(null), h = k(null), d = k([]), v = k(""), g = k(!1), w = k(!1);
  let b;
  const x = (q) => d.value.findIndex((he) => he.id === q), y = (q, he) => b.addFile({ name: he || q.name, type: q.type, data: q, source: "Local" }), M = (q) => q.status === ve.DONE ? "text-green-600" : q.status === ve.ERROR || q.status === ve.CANCELED ? "text-red-600" : "", T = (q) => q.status === ve.DONE ? "✓" : q.status === ve.ERROR || q.status === ve.CANCELED ? "!" : "...", F = () => r.value?.click(), te = () => e.modal.close(), le = () => {
    if (g.value || !d.value.filter((q) => q.status !== ve.DONE).length) {
      g.value || (v.value = t("Please select file to upload first."));
      return;
    }
    v.value = "", b.retryAll(), b.upload();
  }, O = () => {
    b.cancelAll(), d.value.forEach((q) => {
      q.status !== ve.DONE && (q.status = ve.CANCELED, q.statusName = t("Canceled"));
    }), g.value = !1;
  }, H = (q) => {
    g.value || (b.removeFile(q.id), d.value.splice(x(q.id), 1));
  }, ue = (q) => {
    if (!g.value)
      if (b.cancelAll(), q) {
        const he = d.value.filter((I) => I.status !== ve.DONE);
        d.value = [], he.forEach((I) => y(I.originalFile, I.name));
      } else
        d.value = [];
  };
  return be(() => {
    b = new mn({
      debug: e.debug,
      restrictions: { maxFileSize: kn(n.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (I, $) => {
        if ($[I.id] != null) {
          const Y = x(I.id);
          d.value[Y]?.status === ve.PENDING && (v.value = b.i18n("noDuplicates", { fileName: I.name })), d.value = d.value.filter((X) => X.id !== I.id);
        }
        return d.value.push({
          id: I.id,
          name: I.name,
          size: e.filesize(I.size),
          status: ve.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: I.data
        }), !0;
      }
    }), b.use(fn, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), b.on("restriction-failed", (I, $) => {
      const R = d.value[x(I.id)];
      R && H(R), v.value = $.message;
    }), b.on("upload", () => {
      const I = e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", storage: i.path.storage, path: i.path.path }
      });
      b.setMeta({ ...I.body });
      const $ = b.getPlugin("XHRUpload");
      $ && ($.opts.method = I.method, $.opts.endpoint = I.url + "?" + new URLSearchParams(I.params), $.opts.headers = I.headers), delete I.headers["Content-Type"], g.value = !0, d.value.forEach((R) => {
        R.status !== ve.DONE && (R.percent = null, R.status = ve.UPLOADING, R.statusName = t("Pending upload"));
      });
    }), b.on("upload-progress", (I, $) => {
      const R = $.bytesTotal ?? 1, Y = Math.floor($.bytesUploaded / R * 100), X = x(I.id);
      X !== -1 && d.value[X] && (d.value[X].percent = `${Y}%`);
    }), b.on("upload-success", (I) => {
      const $ = d.value[x(I.id)];
      $ && ($.status = ve.DONE, $.statusName = t("Done"));
    }), b.on("upload-error", (I, $) => {
      const R = d.value[x(I.id)];
      R && (R.percent = null, R.status = ve.ERROR, R.statusName = $?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : $?.message || t("Unknown Error"));
    }), b.on("error", (I) => {
      v.value = I.message, g.value = !1, e.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), b.on("complete", () => {
      g.value = !1, e.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), r.value?.addEventListener("click", () => l.value?.click()), m.value?.addEventListener("click", () => c.value?.click()), h.value?.addEventListener("dragover", (I) => {
      I.preventDefault(), w.value = !0;
    }), h.value?.addEventListener("dragleave", (I) => {
      I.preventDefault(), w.value = !1;
    });
    const q = (I, $) => {
      $.isFile && $.file((R) => I($, R)), $.isDirectory && $.createReader().readEntries((R) => R.forEach((Y) => q(I, Y)));
    };
    h.value?.addEventListener("drop", (I) => {
      I.preventDefault(), w.value = !1;
      const $ = /^[/\\](.+)/, R = I.dataTransfer?.items;
      R && Array.from(R).forEach((Y) => {
        Y.kind === "file" && q((X, Q) => {
          const ie = $.exec(X.fullPath);
          y(Q, ie ? ie[1] : Q.name);
        }, Y.webkitGetAsEntry());
      });
    });
    const he = (I) => {
      const $ = I.target, R = $.files;
      if (R) {
        for (const Y of R) y(Y);
        $.value = "";
      }
    };
    l.value?.addEventListener("change", he), c.value?.addEventListener("change", he);
  }), {
    container: o,
    internalFileInput: l,
    internalFolderInput: c,
    pickFiles: r,
    pickFolders: m,
    dropArea: h,
    queue: d,
    message: v,
    uploading: g,
    hasFilesInDropArea: w,
    definitions: s,
    openFileSelector: F,
    upload: le,
    cancel: O,
    remove: H,
    clear: ue,
    close: te,
    getClassNameForEntry: M,
    getIconForEntry: T
  };
}
function Wt(e, t = 14) {
  const i = `((?=([\\w\\W]{0,${t}}))([\\w\\W]{${t + 1},})([\\w\\W]{8,}))`;
  return e.replace(new RegExp(i), "$2..$4");
}
const ha = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ma(e, t) {
  return f(), p("svg", ha, [...t[0] || (t[0] = [
    u("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Wi = { render: ma }, fa = { class: "vuefinder__upload-modal__content" }, va = {
  key: 0,
  class: "pointer-events-none"
}, pa = {
  key: 1,
  class: "pointer-events-none"
}, ga = ["disabled"], _a = ["disabled"], ba = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, wa = ["textContent"], ya = { class: "vuefinder__upload-modal__file-info" }, xa = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Sa = { class: "vuefinder__upload-modal__file-name md:hidden" }, ka = {
  key: 0,
  class: "ml-auto"
}, Ca = ["title", "disabled", "onClick"], $a = {
  key: 0,
  class: "py-2"
}, Aa = ["disabled"], Ma = /* @__PURE__ */ K({
  __name: "ModalUpload",
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n, {
      container: n,
      internalFileInput: s,
      internalFolderInput: o,
      pickFiles: l,
      pickFolders: c,
      dropArea: r,
      queue: m,
      message: h,
      uploading: d,
      hasFilesInDropArea: v,
      definitions: g,
      openFileSelector: w,
      upload: b,
      cancel: x,
      remove: y,
      clear: M,
      close: T,
      getClassNameForEntry: F,
      getIconForEntry: te
    } = da();
    return (le, O) => (f(), C(Fe, null, {
      buttons: W(() => [
        u("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: a(d),
          onClick: O[4] || (O[4] = Ee(
            //@ts-ignore
            (...H) => a(b) && a(b)(...H),
            ["prevent"]
          ))
        }, _(a(i)("Upload")), 9, Aa),
        a(d) ? (f(), p("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: O[5] || (O[5] = Ee(
            //@ts-ignore
            (...H) => a(x) && a(x)(...H),
            ["prevent"]
          ))
        }, _(a(i)("Cancel")), 1)) : (f(), p("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: O[6] || (O[6] = Ee(
            //@ts-ignore
            (...H) => a(T) && a(T)(...H),
            ["prevent"]
          ))
        }, _(a(i)("Close")), 1))
      ]),
      default: W(() => [
        u("div", null, [
          A(Ve, {
            icon: a(Wi),
            title: a(i)("Upload Files")
          }, null, 8, ["icon", "title"]),
          u("div", fa, [
            u("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: r,
              onClick: O[0] || (O[0] = //@ts-ignore
              (...H) => a(w) && a(w)(...H))
            }, [
              a(v) ? (f(), p("div", va, _(a(i)("Release to drop these files.")), 1)) : (f(), p("div", pa, _(a(i)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            u("div", {
              ref_key: "container",
              ref: n,
              class: "vuefinder__upload-modal__buttons"
            }, [
              u("button", {
                ref_key: "pickFiles",
                ref: l,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, _(a(i)("Select Files")), 513),
              u("button", {
                ref_key: "pickFolders",
                ref: c,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, _(a(i)("Select Folders")), 513),
              u("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: a(d),
                onClick: O[1] || (O[1] = (H) => a(M)(!1))
              }, _(a(i)("Clear all")), 9, ga),
              u("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: a(d),
                onClick: O[2] || (O[2] = (H) => a(M)(!0))
              }, _(a(i)("Clear only successful")), 9, _a)
            ], 512),
            u("div", ba, [
              (f(!0), p(oe, null, re(a(m), (H) => (f(), p("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: H.id
              }, [
                u("span", {
                  class: ee(["vuefinder__upload-modal__file-icon", a(F)(H)])
                }, [
                  u("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: _(a(te)(H))
                  }, null, 8, wa)
                ], 2),
                u("div", ya, [
                  u("div", xa, _(a(Wt)(H.name, 40)) + " (" + _(H.size) + ") ", 1),
                  u("div", Sa, _(a(Wt)(H.name, 16)) + " (" + _(H.size) + ") ", 1),
                  u("div", {
                    class: ee(["vuefinder__upload-modal__file-status", a(F)(H)])
                  }, [
                    U(_(H.statusName) + " ", 1),
                    H.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING ? (f(), p("b", ka, _(H.percent), 1)) : E("", !0)
                  ], 2)
                ]),
                u("button", {
                  type: "button",
                  class: ee(["vuefinder__upload-modal__file-remove", a(d) ? "disabled" : ""]),
                  title: a(i)("Delete"),
                  disabled: a(d),
                  onClick: (ue) => a(y)(H)
                }, [...O[7] || (O[7] = [
                  u("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, Ca)
              ]))), 128)),
              a(m).length ? E("", !0) : (f(), p("div", $a, _(a(i)("No files selected!")), 1))
            ]),
            a(h).length ? (f(), C(_i, {
              key: 0,
              onHidden: O[3] || (O[3] = (H) => h.value = ""),
              error: ""
            }, {
              default: W(() => [
                U(_(a(h)), 1)
              ]),
              _: 1
            })) : E("", !0)
          ])
        ]),
        u("input", {
          ref_key: "internalFileInput",
          ref: s,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        u("input", {
          ref_key: "internalFolderInput",
          ref: o,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}), Ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ra(e, t) {
  return f(), p("svg", Ea, [...t[0] || (t[0] = [
    u("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const ji = { render: Ra }, za = { class: "vuefinder__unarchive-modal__content" }, Ta = { class: "vuefinder__unarchive-modal__items" }, Da = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ia = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, La = { class: "vuefinder__unarchive-modal__item-name" }, Ha = { class: "vuefinder__unarchive-modal__info" }, Ui = /* @__PURE__ */ K({
  __name: "ModalUnarchive",
  setup(e) {
    const t = G("ServiceContainer"), i = t.fs, n = N(i.path), { t: s } = t.i18n, o = k(t.modal.data.items[0]), l = k(""), c = k([]), r = () => {
      t.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          storage: n.value.storage,
          path: n.value.path
        },
        body: {
          item: o.value.path
        },
        onSuccess: () => {
          t.emitter.emit("vf-toast-push", { label: s("The file unarchived.") });
        },
        onError: (m) => {
          l.value = s(m.message);
        }
      });
    };
    return (m, h) => (f(), C(Fe, null, {
      buttons: W(() => [
        u("button", {
          type: "button",
          onClick: r,
          class: "vf-btn vf-btn-primary"
        }, _(a(s)("Unarchive")), 1),
        u("button", {
          type: "button",
          onClick: h[1] || (h[1] = (d) => a(t).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1)
      ]),
      default: W(() => [
        u("div", null, [
          A(Ve, {
            icon: a(ji),
            title: a(s)("Unarchive")
          }, null, 8, ["icon", "title"]),
          u("div", za, [
            u("div", Ta, [
              (f(!0), p(oe, null, re(c.value, (d) => (f(), p("p", {
                class: "vuefinder__unarchive-modal__item",
                key: d.path
              }, [
                d.type === "dir" ? (f(), p("svg", Da, [...h[2] || (h[2] = [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (f(), p("svg", Ia, [...h[3] || (h[3] = [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                u("span", La, _(d.basename), 1)
              ]))), 128)),
              u("p", Ha, _(a(s)("The archive will be unarchived at")) + " (" + _(a(i).path.path) + ")", 1),
              l.value.length ? (f(), C(a(l), {
                key: 0,
                onHidden: h[0] || (h[0] = (d) => l.value = ""),
                error: ""
              }, {
                default: W(() => [
                  U(_(l.value), 1)
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
}), Fa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ba(e, t) {
  return f(), p("svg", Fa, [...t[0] || (t[0] = [
    u("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Ni = { render: Ba }, Oa = { class: "vuefinder__archive-modal__content" }, Pa = { class: "vuefinder__archive-modal__form" }, Va = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Wa = { class: "vuefinder__archive-modal__file" }, ja = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ua = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Na = { class: "vuefinder__archive-modal__file-name" }, qa = ["placeholder"], qi = /* @__PURE__ */ K({
  __name: "ModalArchive",
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n, n = t.fs, s = N(n.path), o = k(""), l = k(""), c = k(t.modal.data.items), r = () => {
      c.value.length && t.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: s.value.storage,
          path: s.value.path
        },
        body: {
          items: c.value.map(({ path: m, type: h }) => ({ path: m, type: h })),
          name: o.value
        },
        onSuccess: () => {
          t.emitter.emit("vf-toast-push", { label: i("The file(s) archived.") });
        },
        onError: (m) => {
          l.value = i(m.message);
        }
      });
    };
    return (m, h) => (f(), C(Fe, null, {
      buttons: W(() => [
        u("button", {
          type: "button",
          onClick: r,
          class: "vf-btn vf-btn-primary"
        }, _(a(i)("Archive")), 1),
        u("button", {
          type: "button",
          onClick: h[2] || (h[2] = (d) => a(t).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(i)("Cancel")), 1)
      ]),
      default: W(() => [
        u("div", null, [
          A(Ve, {
            icon: a(Ni),
            title: a(i)("Archive the files")
          }, null, 8, ["icon", "title"]),
          u("div", Oa, [
            u("div", Pa, [
              u("div", Va, [
                (f(!0), p(oe, null, re(c.value, (d) => (f(), p("p", Wa, [
                  d.type === "dir" ? (f(), p("svg", ja, [...h[3] || (h[3] = [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), p("svg", Ua, [...h[4] || (h[4] = [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  u("span", Na, _(d.basename), 1)
                ]))), 256))
              ]),
              ae(u("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (d) => o.value = d),
                onKeyup: st(r, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: a(i)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, qa), [
                [rt, o.value]
              ]),
              l.value.length ? (f(), C(a(l), {
                key: 0,
                onHidden: h[1] || (h[1] = (d) => l.value = ""),
                error: ""
              }, {
                default: W(() => [
                  U(_(l.value), 1)
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
}), Ya = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Ka(e, t) {
  return f(), p("svg", Ya, [...t[0] || (t[0] = [
    u("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    u("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const Xt = { render: Ka }, Ga = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Xa(e, t) {
  return f(), p("svg", Ga, [...t[0] || (t[0] = [
    u("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Qa = { render: Xa }, Za = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ja(e, t) {
  return f(), p("svg", Za, [...t[0] || (t[0] = [
    u("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const el = { render: Ja }, tl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function il(e, t) {
  return f(), p("svg", tl, [...t[0] || (t[0] = [
    u("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const nl = { render: il }, ol = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function sl(e, t) {
  return f(), p("svg", ol, [...t[0] || (t[0] = [
    u("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const rl = { render: sl }, al = { class: "vuefinder__toolbar" }, ll = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, cl = ["title"], ul = ["title"], dl = ["title"], hl = ["title"], ml = ["title"], fl = ["title"], vl = ["title"], pl = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, gl = { class: "pl-2" }, _l = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, bl = { class: "vuefinder__toolbar__controls" }, wl = ["title"], yl = ["title"], xl = /* @__PURE__ */ K({
  __name: "Toolbar",
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n, n = t.fs, s = t.config, o = t.search, l = N(s.state), c = N(o.state), r = N(n.selectedItems);
    _e(() => l.value.fullScreen, () => {
      if (l.value.fullScreen) {
        const h = document.querySelector("body");
        h && (h.style.overflow = "hidden");
      } else {
        const h = document.querySelector("body");
        h && (h.style.overflow = "");
      }
      t.emitter.emit("vf-fullscreen-toggle");
    });
    const m = () => {
      s.set("view", l.value.view === "list" ? "grid" : "list");
    };
    return (h, d) => (f(), p("div", al, [
      a(c).query.length ? (f(), p("div", pl, [
        u("div", gl, [
          U(_(a(i)("Search results for")) + " ", 1),
          u("span", _l, _(a(c).query), 1)
        ]),
        a(s).get("loadingIndicator") === "circular" && a(n).isLoading() ? (f(), C(a(Xt), { key: 0 })) : E("", !0)
      ])) : (f(), p("div", ll, [
        a(t).features.includes(a(ne).NEW_FOLDER) ? (f(), p("div", {
          key: 0,
          class: "mx-1.5",
          title: a(i)("New Folder"),
          onClick: d[0] || (d[0] = (v) => a(t).modal.open(Pi, { items: a(r) }))
        }, [
          A(a(Oi))
        ], 8, cl)) : E("", !0),
        a(t).features.includes(a(ne).NEW_FILE) ? (f(), p("div", {
          key: 1,
          class: "mx-1.5",
          title: a(i)("New File"),
          onClick: d[1] || (d[1] = (v) => a(t).modal.open(ua, { items: a(r) }))
        }, [
          A(a(Vi))
        ], 8, ul)) : E("", !0),
        a(t).features.includes(a(ne).RENAME) ? (f(), p("div", {
          key: 2,
          class: "mx-1.5",
          title: a(i)("Rename"),
          onClick: d[2] || (d[2] = (v) => a(r).length !== 1 || a(t).modal.open(Nt, { items: a(r) }))
        }, [
          A(a(gi), {
            class: ee(a(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, dl)) : E("", !0),
        a(t).features.includes(a(ne).DELETE) ? (f(), p("div", {
          key: 3,
          class: "mx-1.5",
          title: a(i)("Delete"),
          onClick: d[3] || (d[3] = (v) => !a(r).length || a(t).modal.open(Ut, { items: a(r) }))
        }, [
          A(a(pi), {
            class: ee(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, hl)) : E("", !0),
        a(t).features.includes(a(ne).UPLOAD) ? (f(), p("div", {
          key: 4,
          class: "mx-1.5",
          title: a(i)("Upload"),
          onClick: d[4] || (d[4] = (v) => a(t).modal.open(Ma, { items: a(r) }))
        }, [
          A(a(Wi))
        ], 8, ml)) : E("", !0),
        a(t).features.includes(a(ne).UNARCHIVE) && a(r).length === 1 && a(r)[0].mime_type === "application/zip" ? (f(), p("div", {
          key: 5,
          class: "mx-1.5",
          title: a(i)("Unarchive"),
          onClick: d[5] || (d[5] = (v) => !a(r).length || a(t).modal.open(Ui, { items: a(r) }))
        }, [
          A(a(ji), {
            class: ee(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, fl)) : E("", !0),
        a(t).features.includes(a(ne).ARCHIVE) ? (f(), p("div", {
          key: 6,
          class: "mx-1.5",
          title: a(i)("Archive"),
          onClick: d[6] || (d[6] = (v) => !a(r).length || a(t).modal.open(qi, { items: a(r) }))
        }, [
          A(a(Ni), {
            class: ee(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, vl)) : E("", !0)
      ])),
      u("div", bl, [
        a(t).features.includes(a(ne).FULL_SCREEN) ? (f(), p("div", {
          key: 0,
          onClick: d[7] || (d[7] = (v) => a(s).toggle("fullScreen")),
          class: "mx-1.5",
          title: a(i)("Toggle Full Screen")
        }, [
          a(l).fullScreen ? (f(), C(a(el), { key: 0 })) : (f(), C(a(Qa), { key: 1 }))
        ], 8, wl)) : E("", !0),
        u("div", {
          class: "mx-1.5",
          title: a(i)("Change View"),
          onClick: d[8] || (d[8] = (v) => a(c).query.length || m())
        }, [
          a(l).view === "grid" ? (f(), C(a(nl), {
            key: 0,
            class: ee(["vf-toolbar-icon", a(c).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : E("", !0),
          a(l).view === "list" ? (f(), C(a(rl), {
            key: 1,
            class: ee(["vf-toolbar-icon", a(c).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : E("", !0)
        ], 8, yl)
      ])
    ]));
  }
}), Sl = (e, t = 0, i = !1) => {
  let n;
  return (...s) => {
    i && !n && e(...s), clearTimeout(n), n = setTimeout(() => {
      e(...s);
    }, t);
  };
}, ci = (e, t, i) => {
  const n = k(e);
  return tn((s, o) => ({
    get() {
      return s(), n.value;
    },
    set: Sl((l) => {
      n.value = l, o();
    }, t, !1)
  }));
}, kl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function Cl(e, t) {
  return f(), p("svg", kl, [...t[0] || (t[0] = [
    u("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const $l = { render: Cl }, Al = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Ml(e, t) {
  return f(), p("svg", Al, [...t[0] || (t[0] = [
    u("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const El = { render: Ml }, Rl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function zl(e, t) {
  return f(), p("svg", Rl, [...t[0] || (t[0] = [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Tl = { render: zl }, Dl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function Il(e, t) {
  return f(), p("svg", Dl, [...t[0] || (t[0] = [
    u("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Ll = { render: Il }, Hl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function Fl(e, t) {
  return f(), p("svg", Hl, [...t[0] || (t[0] = [
    u("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Bl = { render: Fl }, Ol = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Pl(e, t) {
  return f(), p("svg", Ol, [...t[0] || (t[0] = [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Vl = { render: Pl }, Wl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function jl(e, t) {
  return f(), p("svg", Wl, [...t[0] || (t[0] = [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const kt = { render: jl }, Ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Nl(e, t) {
  return f(), p("svg", Ul, [...t[0] || (t[0] = [
    u("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    u("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const ql = { render: Nl }, Yl = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function Kl(e, t) {
  return f(), p("svg", Yl, [...t[0] || (t[0] = [
    u("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Gl = { render: Kl };
function Xl(e) {
  const [t, i] = Ql(e);
  if (!i || i === "/") return t + "://";
  const n = i.replace(/\/+$/, ""), s = n.lastIndexOf("/");
  return s === 0 ? t + "://" : t + ":/" + n.slice(0, s);
}
function Ql(e) {
  const t = e.indexOf(":/");
  return t === -1 ? [void 0, e] : [e.slice(0, t), e.slice(t + 2) || "/"];
}
function ht(e, t = []) {
  const i = "vfDragEnterCounter", n = e.fs, s = N(n.selectedItems);
  function o(h, d) {
    h.preventDefault(), n.getDraggedItem() === d.path || !d || d.type !== "dir" || s.value.some((g) => g.path === d.path || Xl(g.path) === d.path) ? h.dataTransfer && (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none") : (h.dataTransfer && (h.dataTransfer.dropEffect = "copy", h.dataTransfer.effectAllowed = "all"), h.currentTarget.classList.add(...t));
  }
  function l(h) {
    h.preventDefault();
    const d = h.currentTarget, v = Number(d.dataset[i] || 0);
    d.dataset[i] = String(v + 1);
  }
  function c(h) {
    h.preventDefault();
    const d = h.currentTarget, g = Number(d.dataset[i] || 0) - 1;
    g <= 0 ? (delete d.dataset[i], d.classList.remove(...t)) : d.dataset[i] = String(g);
  }
  function r(h, d) {
    if (!d) return;
    h.preventDefault();
    const v = h.currentTarget;
    delete v.dataset[i], v.classList.remove(...t);
    const g = h.dataTransfer?.getData("items") || "[]", b = JSON.parse(g).map((x) => n.sortedFiles.get().find((y) => y.path === x));
    n.clearDraggedItem(), e.modal.open(Bi, { items: { from: b, to: d } });
  }
  function m(h) {
    return {
      dragover: (d) => o(d, h),
      dragenter: l,
      dragleave: c,
      drop: (d) => r(d, h)
    };
  }
  return { events: m };
}
const Zl = { class: "vuefinder__breadcrumb__container" }, Jl = ["title"], ec = ["title"], tc = ["title"], ic = ["title"], nc = { class: "vuefinder__breadcrumb__list" }, oc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, sc = { class: "relative" }, rc = ["title", "onClick"], ac = { class: "vuefinder__breadcrumb__search-mode" }, lc = ["placeholder"], cc = ["onClick"], uc = { class: "vuefinder__breadcrumb__hidden-item-content" }, dc = { class: "vuefinder__breadcrumb__hidden-item-text" }, hc = /* @__PURE__ */ K({
  __name: "Breadcrumb",
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n, n = t.search, s = t.fs, o = t.config, l = N(o.state), c = N(n.state), r = N(s.path), m = N(s.loading), h = ce(() => c.value?.searchMode ?? !1), d = k(null), v = ci(0, 100), g = k(5), w = k(!1), b = ce(() => r.value?.breadcrumb ?? []);
    function x(B, P) {
      return B.length > P ? [B.slice(-P), B.slice(0, -P)] : [B, []];
    }
    const y = ce(() => x(b.value, g.value)[0]), M = ce(() => x(b.value, g.value)[1]);
    _e(v, () => {
      if (!d.value) return;
      const B = d.value.children;
      let P = 0, S = 0;
      const z = 5, se = 1;
      g.value = z, ct(() => {
        for (let fe = B.length - 1; fe >= 0; fe--) {
          const We = B[fe];
          if (P + We.offsetWidth > v.value - 40)
            break;
          P += parseInt(We.offsetWidth.toString(), 10), S++;
        }
        S < se && (S = se), S > z && (S = z), g.value = S;
      });
    });
    const T = () => {
      d.value && (v.value = d.value.offsetWidth);
    }, F = k(null);
    be(() => {
      F.value = new ResizeObserver(T), d.value && F.value.observe(d.value);
    }), dt(() => {
      F.value && F.value.disconnect();
    });
    const te = ht(t, ["bg-blue-200", "dark:bg-slate-600"]);
    function le(B = null) {
      B ??= b.value.length - 2;
      const P = {
        basename: r.value?.storage ?? "local",
        extension: "",
        path: (r.value?.storage ?? "local") + "://",
        storage: r.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return b.value[B] ?? P;
    }
    const O = () => {
      X(), t.emitter.emit("vf-fetch", { params: { q: "index", storage: r.value?.storage, path: r.value?.path } });
    }, H = () => {
      n.exitSearchMode(), y.value.length > 0 && !h.value && t.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: r.value?.storage ?? "local",
          path: b.value[b.value.length - 2]?.path ?? (r.value?.storage ?? "local") + "://"
        }
      });
    }, ue = (B) => {
      t.emitter.emit("vf-fetch", { params: { q: "index", storage: r.value?.storage, path: B.path } }), w.value = !1;
    }, q = () => {
      w.value && (w.value = !1);
    }, he = {
      mounted(B, P) {
        B.clickOutsideEvent = function(S) {
          B === S.target || B.contains(S.target) || P.value();
        }, document.body.addEventListener("click", B.clickOutsideEvent);
      },
      beforeUnmount(B) {
        document.body.removeEventListener("click", B.clickOutsideEvent);
      }
    }, I = () => {
      o.toggle("showTreeView");
    }, $ = k(null), R = ci("", 400);
    _e(R, (B) => {
      t.emitter.emit("vf-toast-clear"), n.setQuery(B);
    }), _e(h, (B) => {
      B && ct(() => {
        $.value && $.value.focus();
      });
    }), t.emitter.on("vf-search-exit", () => {
      n.exitSearchMode();
    });
    const Y = () => {
      R.value === "" && n.exitSearchMode();
    }, X = () => {
      R.value = "", n.exitSearchMode();
    }, Q = k({
      x: 0,
      y: 0
    }), ie = (B) => {
      if (B.currentTarget instanceof HTMLElement) {
        const { x: P, y: S, height: z } = B.currentTarget.getBoundingClientRect();
        Q.value = { x: P, y: S + z };
      }
      w.value = !w.value;
    };
    return (B, P) => (f(), p("div", Zl, [
      u("span", {
        title: a(i)("Toggle Tree View")
      }, [
        A(a(ql), {
          onClick: I,
          class: ee(["vuefinder__breadcrumb__toggle-tree", a(l).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Jl),
      u("span", {
        title: a(i)("Go up a directory")
      }, [
        A(a(El), Me(qe(b.value.length && !h.value ? a(te).events(le()) : {}), {
          onClick: H,
          class: b.value.length && !h.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, ec),
      a(s).isLoading() ? (f(), p("span", {
        key: 1,
        title: a(i)("Cancel")
      }, [
        A(a(Tl), {
          onClick: P[0] || (P[0] = (S) => a(t).emitter.emit("vf-fetch-abort"))
        })
      ], 8, ic)) : (f(), p("span", {
        key: 0,
        title: a(i)("Refresh")
      }, [
        A(a($l), { onClick: O })
      ], 8, tc)),
      ae(u("div", {
        class: "group vuefinder__breadcrumb__search-container",
        onClick: P[3] || (P[3] = //@ts-ignore
        (...S) => a(n).enterSearchMode && a(n).enterSearchMode(...S))
      }, [
        u("div", null, [
          A(a(Ll), Me(qe(a(te).events(le(-1))), {
            onClick: P[1] || (P[1] = Ee((S) => a(t).emitter.emit("vf-fetch", { params: { q: "index", storage: a(r).value?.storage ?? "local" } }), ["stop"]))
          }), null, 16)
        ]),
        u("div", nc, [
          M.value.length ? ae((f(), p("div", oc, [
            P[5] || (P[5] = u("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            u("div", sc, [
              u("span", {
                onDragenter: P[2] || (P[2] = (S) => w.value = !0),
                onClick: ie,
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                A(a(Gl), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [he, q]
          ]) : E("", !0)
        ]),
        u("div", {
          ref_key: "breadcrumbContainer",
          ref: d,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (f(!0), p(oe, null, re(y.value, (S, z) => (f(), p("div", { key: z }, [
            P[6] || (P[6] = u("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            u("span", Me(qe(a(te).events(S), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: S.basename,
              onClick: Ee((se) => a(t).emitter.emit("vf-fetch", { params: { q: "index", storage: a(r)?.storage, path: S.path } }), ["stop"])
            }), _(S.name), 17, rc)
          ]))), 128))
        ], 512),
        a(o).get("loadingIndicator") === "circular" && a(m) ? (f(), C(a(Xt), { key: 0 })) : E("", !0)
      ], 512), [
        [Ce, !h.value]
      ]),
      ae(u("div", ac, [
        u("div", null, [
          A(a(Bl))
        ]),
        ae(u("input", {
          ref_key: "searchInput",
          ref: $,
          onKeydown: st(X, ["esc"]),
          onBlur: Y,
          "onUpdate:modelValue": P[4] || (P[4] = (S) => nn(R) ? R.value = S : null),
          placeholder: a(i)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, lc), [
          [rt, a(R)]
        ]),
        A(a(Vl), { onClick: X })
      ], 512), [
        [Ce, h.value]
      ]),
      (f(), C(on, { to: "body" }, [
        ae(u("div", {
          style: Ye({ position: "absolute", top: Q.value.y + "px", left: Q.value.x + "px" }),
          class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
        }, [
          (f(!0), p(oe, null, re(M.value, (S, z) => (f(), p("div", Me({ key: z }, qe(a(te).events(S), !0), {
            onClick: (se) => ue(S),
            class: "vuefinder__breadcrumb__hidden-item"
          }), [
            u("div", uc, [
              u("span", null, [
                A(a(kt), { class: "vuefinder__breadcrumb__hidden-item-icon" })
              ]),
              P[7] || (P[7] = U()),
              u("span", dc, _(S.name), 1)
            ])
          ], 16, cc))), 128))
        ], 4), [
          [Ce, w.value]
        ])
      ]))
    ]));
  }
});
function mc(e, t) {
  const {
    scrollContainer: i,
    itemWidth: n = 100,
    rowHeight: s,
    overscan: o = 2,
    containerPadding: l = 48
  } = t, c = e && typeof e.get == "function" ? N(e) : e, r = () => typeof s == "number" ? s : s.value, m = k(0), h = k(6), d = k(600);
  let v = null;
  const g = ce(() => Math.ceil(c.value.length / h.value)), w = ce(() => g.value * r()), b = ce(() => {
    const O = r(), H = Math.max(0, Math.floor(m.value / O) - o), ue = Math.min(g.value, Math.ceil((m.value + d.value) / O) + o);
    return { start: H, end: ue };
  }), x = ce(() => {
    const { start: O, end: H } = b.value;
    return Array.from({ length: H - O }, (ue, q) => O + q);
  }), y = () => d.value, M = () => {
    if (i.value) {
      const O = i.value.clientWidth - l;
      h.value = Math.max(Math.floor(O / n), 2);
    }
  }, T = (O) => {
    const H = O.target;
    m.value = H.scrollTop;
  };
  _e(() => c.value.length, () => {
    M();
  });
  const F = (O, H) => {
    const ue = H * h.value;
    return O.slice(ue, ue + h.value);
  }, te = (O, H, ue, q, he) => {
    const I = [];
    for (let $ = H; $ <= ue; $++)
      for (let R = q; R <= he; R++) {
        const Y = $ * h.value + R;
        Y < O.length && O[Y] && I.push(O[Y]);
      }
    return I;
  }, le = (O) => ({
    row: Math.floor(O / h.value),
    col: O % h.value
  });
  return be(async () => {
    await ct(), i.value && (d.value = i.value.clientHeight || 600), M(), window.addEventListener("resize", () => {
      i.value && (d.value = i.value.clientHeight || 600), M();
    }), i.value && "ResizeObserver" in window && (v = new ResizeObserver((O) => {
      const H = O[0];
      H && (d.value = Math.round(H.contentRect.height)), M();
    }), v.observe(i.value));
  }), dt(() => {
    window.removeEventListener("resize", M), v && (v.disconnect(), v = null);
  }), {
    scrollTop: m,
    itemsPerRow: h,
    totalRows: g,
    totalHeight: w,
    visibleRange: b,
    visibleRows: x,
    updateItemsPerRow: M,
    handleScroll: T,
    getRowItems: F,
    getItemsInRange: te,
    getItemPosition: le,
    getContainerHeight: y
  };
}
function fc(e) {
  const { getItemPosition: t, getItemsInRange: i, getKey: n, selectionObject: s, rowHeight: o, itemWidth: l } = e, c = Math.floor(Math.random() * 2 ** 32).toString(), m = G("ServiceContainer").fs, h = N(m.selectedKeys), d = N(m.sortedFiles);
  N(m.selectedCount);
  const v = k(/* @__PURE__ */ new Set()), g = k(!1), w = k(!1), b = k(null), x = ($) => $.map((R) => R.getAttribute("data-key")).filter((R) => !!R), y = ($) => {
    $.selection.getSelection().forEach((R) => {
      $.selection.deselect(R, !0);
    });
  }, M = ($) => {
    h.value && h.value.forEach((R) => {
      const Y = document.querySelector(`[data-key="${R}"]`);
      Y && $.selection.select(Y, !0);
    });
  }, T = ($) => {
    if ($.size === 0) return null;
    const Y = Array.from($).map((P) => {
      const S = d.value?.findIndex((z) => n(z) === P) ?? -1;
      return t(S >= 0 ? S : 0);
    }), X = Math.min(...Y.map((P) => P.row)), Q = Math.max(...Y.map((P) => P.row)), ie = Math.min(...Y.map((P) => P.col)), B = Math.max(...Y.map((P) => P.col));
    return { minRow: X, maxRow: Q, minCol: ie, maxCol: B };
  }, F = ($) => {
    g.value = !1, !$.event?.metaKey && !$.event?.ctrlKey && (w.value = !0), $.selection.resolveSelectables(), y($), M($);
  }, te = ({ event: $, selection: R }) => {
    const Y = $;
    Y && "type" in Y && Y.type === "touchend" && Y.preventDefault();
    const X = $;
    if (!X?.ctrlKey && !X?.metaKey && (m.clearSelection(), R.clearSelection(!0, !0)), v.value.clear(), X && s.value) {
      const Q = s.value.getSelectables()[0]?.closest(".scroller-" + c);
      if (Q) {
        const ie = Q.getBoundingClientRect(), B = X.clientY - ie.top + Q.scrollTop, P = X.clientX - ie.left, S = Math.floor(B / o.value), z = Math.floor(P / l);
        b.value = { row: S, col: z };
      }
    }
  }, le = ($) => {
    const R = $.selection, Y = x($.store.changed.added), X = x($.store.changed.removed);
    w.value = !1, g.value = !0, Y.forEach((Q) => {
      h.value && !h.value.has(Q) && v.value.add(Q), m.select(Q);
    }), X.forEach((Q) => {
      document.querySelector(`[data-key="${Q}"]`) && d.value?.find((B) => n(B) === Q) && v.value.delete(Q), m.deselect(Q);
    }), R.resolveSelectables(), M($);
  }, O = () => {
    v.value.clear();
  }, H = ($) => {
    if ($.event && b.value && v.value.size > 0) {
      const Y = Array.from(v.value).map((X) => {
        const Q = d.value?.findIndex((ie) => n(ie) === X) ?? -1;
        return Q >= 0 ? t(Q) : null;
      }).filter((X) => X !== null);
      if (Y.length > 0) {
        const X = [...Y, b.value], Q = {
          minRow: Math.min(...X.map((ie) => ie.row)),
          maxRow: Math.max(...X.map((ie) => ie.row)),
          minCol: Math.min(...X.map((ie) => ie.col)),
          maxCol: Math.max(...X.map((ie) => ie.col))
        };
        i(d.value || [], Q.minRow, Q.maxRow, Q.minCol, Q.maxCol).forEach(
          (ie) => {
            const B = n(ie);
            document.querySelector(`[data-key="${B}"]`) || m.select(B);
          }
        );
      }
    }
  }, ue = ($) => {
    H($), y($), M($), m.setSelectedCount(h.value?.size || 0), g.value = !1, b.value = null;
  }, q = () => {
    s.value = new vn({
      selectables: [".file-item-" + c],
      boundaries: [".scroller-" + c],
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
    }), s.value.on("beforestart", F), s.value.on("start", te), s.value.on("move", le), s.value.on("stop", ue);
  }, he = () => {
    s.value && (s.value.destroy(), s.value = null);
  }, I = ($) => {
    w.value && (s.value?.clearSelection(), O(), w.value = !1);
    const R = $;
    !v.value.size && !w.value && !R?.ctrlKey && !R?.metaKey && (m.clearSelection(), s.value?.clearSelection());
  };
  return be(() => {
    const $ = (R) => {
      !R.buttons && g.value && (g.value = !1);
    };
    document.addEventListener("dragleave", $), dt(() => {
      document.removeEventListener("dragleave", $);
    });
  }), {
    isDragging: g,
    selectionStarted: w,
    explorerId: c,
    extractIds: x,
    cleanupSelection: y,
    refreshSelection: M,
    getSelectionRange: T,
    selectSelectionRange: H,
    initializeSelectionArea: q,
    destroySelectionArea: he,
    handleContentClick: I
  };
}
const vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function pc(e, t) {
  return f(), p("svg", vc, [...t[0] || (t[0] = [
    u("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const gc = { render: pc }, _c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function bc(e, t) {
  return f(), p("svg", _c, [...t[0] || (t[0] = [
    u("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const wc = { render: bc }, _t = /* @__PURE__ */ K({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(e) {
    return (t, i) => (f(), p("div", null, [
      e.direction === "asc" ? (f(), C(a(gc), { key: 0 })) : E("", !0),
      e.direction === "desc" ? (f(), C(a(wc), { key: 1 })) : E("", !0)
    ]));
  }
}), yc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function xc(e, t) {
  return f(), p("svg", yc, [...t[0] || (t[0] = [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Sc = { render: xc }, kc = { class: "vuefinder__drag-item__container" }, Cc = { class: "vuefinder__drag-item__count" }, $c = /* @__PURE__ */ K({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(e) {
    const t = e;
    return (i, n) => (f(), p("div", kc, [
      A(a(Sc)),
      u("div", Cc, _(t.count), 1)
    ]));
  }
}), Ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Mc(e, t) {
  return f(), p("svg", Ac, [...t[0] || (t[0] = [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ec = { render: Mc }, Rc = {
  key: 3,
  class: "vuefinder__item-icon__extension"
}, ui = /* @__PURE__ */ K({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(e) {
    const t = e, i = G("ServiceContainer"), n = i.customIcon?.(i, t.item);
    return (s, o) => (f(), p("div", {
      class: ee(["vuefinder__item-icon", e.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      a(n) ? (f(), C(Qe(a(n).is), sn(Me({ key: 0 }, a(n).props || {})), null, 16)) : e.item.type === "dir" ? (f(), C(a(kt), { key: 1 })) : (f(), C(a(Ec), { key: 2 })),
      !a(n) && e.ext && e.item.type !== "dir" && e.item.extension ? (f(), p("div", Rc, _(e.item.extension.substring(0, 3)), 1)) : E("", !0)
    ], 2));
  }
}), zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Tc(e, t) {
  return f(), p("svg", zc, [...t[0] || (t[0] = [
    u("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    u("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const Yi = { render: Tc }, Dc = ["data-key", "data-row", "data-col", "draggable"], Ic = { key: 0 }, Lc = { class: "vuefinder__explorer__item-grid-content" }, Hc = ["data-src", "alt"], Fc = { class: "vuefinder__explorer__item-title" }, Bc = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Oc = { class: "vuefinder__explorer__item-list-name" }, Pc = { class: "vuefinder__explorer__item-list-icon" }, Vc = { class: "vuefinder__explorer__item-name" }, Wc = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, jc = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Uc = { key: 0 }, Nc = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, qc = /* @__PURE__ */ K({
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
  setup(e, { emit: t }) {
    const i = e, n = t, s = G("ServiceContainer"), o = s.fs, l = s.config, c = ce(() => [
      "file-item-" + i.explorerId,
      i.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      i.isSelected ? "vf-explorer-selected" : ""
    ]), r = ce(() => ({
      opacity: i.isDragging || o.isCut(i.item.path) ? 0.5 : ""
    }));
    let m = null;
    const h = k(null);
    let d = !1;
    const v = () => {
      m && clearTimeout(m), g.value = !0;
    }, g = k(!0), w = (b) => {
      if (g.value = !1, m && (b.preventDefault(), clearTimeout(m)), !d)
        d = !0, n("click", b), h.value = setTimeout(() => d = !1, 300);
      else
        return d = !1, n("dblclick", b), m && clearTimeout(m), !1;
      if (b.currentTarget && b.currentTarget instanceof HTMLElement) {
        const x = b.currentTarget.getBoundingClientRect();
        b.preventDefault(), m = setTimeout(() => {
          let T = x.y + x.height;
          T + 146 > window.innerHeight - 10 && (T = x.y - 146), T < 10 && (T = 10);
          const F = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: x.x,
            clientY: T
          });
          b.target?.dispatchEvent(F);
        }, 300);
      }
    };
    return (b, x) => (f(), p("div", {
      class: ee(c.value),
      style: Ye(r.value),
      "data-key": e.item.path,
      "data-row": e.rowIndex,
      "data-col": e.colIndex,
      draggable: g.value,
      onTouchstart: x[1] || (x[1] = (y) => w(y)),
      onTouchend: x[2] || (x[2] = (y) => v()),
      onClick: x[3] || (x[3] = (y) => n("click", y)),
      onDblclick: x[4] || (x[4] = (y) => n("dblclick", y)),
      onContextmenu: x[5] || (x[5] = Ee((y) => n("contextmenu", y), ["prevent", "stop"])),
      onDragstart: x[6] || (x[6] = (y) => n("dragstart", y)),
      onDragend: x[7] || (x[7] = (y) => n("dragend", y))
    }, [
      e.view === "grid" ? (f(), p("div", Ic, [
        u("div", Lc, [
          (e.item.mime_type ?? "").startsWith("image") && e.showThumbnails ? (f(), p("img", {
            key: 0,
            onTouchstart: x[0] || (x[0] = (y) => y.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": a(s).requester.getPreviewUrl(e.item.storage, e.item),
            alt: e.item.basename
          }, null, 40, Hc)) : (f(), C(ui, {
            key: 1,
            item: e.item,
            ext: !0
          }, null, 8, ["item"]))
        ]),
        u("span", Fc, _(a(Wt)(e.item.basename)), 1)
      ])) : (f(), p("div", Bc, [
        u("div", Oc, [
          u("div", Pc, [
            A(ui, {
              item: e.item,
              small: e.compact
            }, null, 8, ["item", "small"])
          ]),
          u("span", Vc, _(e.item.basename), 1)
        ]),
        e.showPath ? (f(), p("div", Wc, _(e.item.path), 1)) : E("", !0),
        e.showPath ? E("", !0) : (f(), p("div", jc, [
          e.item.file_size ? (f(), p("div", Uc, _(a(s).filesize(e.item.file_size)), 1)) : E("", !0)
        ])),
        !e.showPath && e.item.last_modified ? (f(), p("div", Nc, _(new Date(e.item.last_modified * 1e3).toLocaleString()), 1)) : E("", !0)
      ])),
      a(l).get("pinnedFolders").find((y) => y.path === e.item.path) ? (f(), C(a(Yi), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : E("", !0)
    ], 46, Dc));
  }
}), Yc = ["data-row"], It = /* @__PURE__ */ K({
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
  setup(e, { emit: t }) {
    const i = e, n = t, s = ce(() => [
      i.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), o = ce(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${i.rowHeight}px`,
      transform: `translateY(${i.rowIndex * i.rowHeight}px)`
    })), l = ce(() => i.view === "grid" ? {
      gridTemplateColumns: `repeat(${i.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (c, r) => (f(), p("div", {
      class: ee(s.value),
      "data-row": e.rowIndex,
      style: Ye(o.value)
    }, [
      u("div", {
        class: ee(["grid justify-self-start", { "w-full": e.view === "list" }]),
        style: Ye(l.value)
      }, [
        (f(!0), p(oe, null, re(e.items, (m, h) => (f(), C(qc, Me({
          key: m.path,
          item: m,
          view: e.view,
          compact: e.compact,
          "show-thumbnails": e.showThumbnails,
          "show-path": e.showPath,
          "is-selected": e.isSelected(m.path),
          "is-dragging": e.isDraggingItem(m.path),
          "row-index": e.rowIndex,
          "col-index": h
        }, qe(e.dragNDropEvents(m)), {
          onClick: r[0] || (r[0] = (d) => n("click", d)),
          onDblclick: r[1] || (r[1] = (d) => n("dblclick", d)),
          onContextmenu: r[2] || (r[2] = (d) => n("contextmenu", d)),
          onDragstart: r[3] || (r[3] = (d) => n("dragstart", d)),
          onDragend: r[4] || (r[4] = (d) => n("dragend", d)),
          explorerId: e.explorerId
        }), null, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Yc));
  }
}), Kc = ["onClick"], Gc = /* @__PURE__ */ K({
  __name: "Toast",
  setup(e) {
    const t = G("ServiceContainer"), { getStore: i } = t.storage, n = k(i("full-screen", !1)), s = k([]), o = (r) => r === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", l = (r) => {
      s.value.splice(r, 1);
    }, c = (r) => {
      let m = s.value.findIndex((h) => h.id === r);
      m !== -1 && l(m);
    };
    return t.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), t.emitter.on("vf-toast-push", (r) => {
      let m = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      r.id = m, s.value.push(r), setTimeout(() => {
        c(m);
      }, 5e3);
    }), (r, m) => (f(), p("div", {
      class: ee(["vuefinder__toast", n.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      A(rn, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: W(() => [
          (f(!0), p(oe, null, re(s.value, (h, d) => (f(), p("div", {
            key: d,
            onClick: (v) => l(d),
            class: ee(["vuefinder__toast__message", o(h.type)])
          }, _(h.label), 11, Kc))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Xc = { class: "vuefinder__explorer__container" }, Qc = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, Zc = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Jc = {
  key: 0,
  class: "vuefinder__linear-loader"
}, eu = {
  key: 1,
  class: "vuefinder__circular-loader"
}, tu = /* @__PURE__ */ K({
  __name: "Explorer",
  setup(e) {
    const t = G("ServiceContainer"), i = ht(t, ["bg-blue-200", "dark:bg-slate-600"]), n = Xe("dragImage"), s = di(null), o = Xe("scrollContainer"), l = Xe("scrollContent"), c = t.search, r = t.fs, m = t.config, h = N(m.state), d = N(c.state), v = N(r.sortedFiles), g = N(r.selectedKeys), w = N(r.loading), b = (D) => g.value?.has(D) ?? !1;
    let x = null;
    const y = k(null), M = Xe("customScrollBar"), T = Xe("customScrollBarContainer"), F = ce(() => {
      const D = h.value.view, V = h.value.compactListView;
      return D === "grid" && !(d.value.searchMode && d.value.query.length) ? 88 : V ? 24 : 50;
    }), { t: te } = t.i18n, {
      itemsPerRow: le,
      totalHeight: O,
      visibleRows: H,
      handleScroll: ue,
      getRowItems: q,
      getItemsInRange: he,
      getItemPosition: I,
      updateItemsPerRow: $
    } = mc(
      ce(() => v.value ?? []),
      {
        scrollContainer: o,
        itemWidth: 104,
        rowHeight: F,
        overscan: 2,
        containerPadding: 0
      }
    ), {
      explorerId: R,
      isDragging: Y,
      initializeSelectionArea: X,
      destroySelectionArea: Q,
      handleContentClick: ie
    } = fc({
      getItemPosition: I,
      getItemsInRange: he,
      getKey: (D) => D.path,
      selectionObject: s,
      rowHeight: F,
      itemWidth: 104
    }), B = k(null), P = (D) => {
      if (!D || !B.value) return !1;
      const V = g.value?.has(B.value) ?? !1;
      return Y.value && (V ? g.value?.has(D) ?? !1 : D === B.value);
    };
    _e(() => m.get("view"), (D) => {
      D === "list" ? le.value = 1 : $();
    }, { immediate: !0 }), _e(le, (D) => {
      m.get("view") === "list" && D !== 1 && (le.value = 1);
    });
    const S = (D) => v.value?.[D];
    be(() => {
      if (X(), s.value && s.value.on("beforestart", ({ event: D }) => {
        const V = D?.target === l.value;
        if (!D?.metaKey && !D?.ctrlKey && !D?.altKey && !V)
          return !1;
      }), o.value && (x = new pn({
        elements_selector: ".lazy",
        container: o.value
      })), _e(() => d.value.query, (D) => {
        const V = r.path.get().storage, j = r.path.get().path;
        !V || !j || (D ? t.emitter.emit("vf-fetch", {
          params: {
            q: "search",
            storage: V,
            path: j,
            filter: D
          },
          onSuccess: (ye) => {
            ye.files.length || t.emitter.emit("vf-toast-push", { label: te("No search result found.") });
          }
        }) : t.emitter.emit("vf-fetch", { params: { q: "index", storage: V, path: j } }));
      }), T.value) {
        const D = jt(T.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (V) => {
            y.value = V;
          },
          scroll: (V) => {
            const { scrollOffsetElement: j } = V.elements();
            o.value && o.value.scrollTo({ top: j.scrollTop, left: 0 });
          }
        });
        y.value = D;
      }
      o.value && o.value.addEventListener("scroll", () => {
        const D = y.value;
        if (!D) return;
        const { scrollOffsetElement: V } = D.elements();
        V.scrollTo({ top: o.value.scrollTop, left: 0 });
      });
    }), an(() => {
      if (x && x.update(), y.value && M.value && o.value) {
        const V = o.value.scrollHeight > o.value.clientHeight, j = M.value;
        j.style.display = V ? "block" : "none", j.style.height = `${O.value}px`;
      }
    }), dt(() => {
      Q(), x && (x.destroy(), x = null), y.value && (y.value.destroy(), y.value = null);
    });
    const z = (D) => {
      const V = D.target?.closest(".file-item-" + R), j = D;
      if (!j?.ctrlKey && !j?.metaKey && (r.clearSelection(), s.value?.clearSelection(!0, !0)), V) {
        const ye = String(V.getAttribute("data-key"));
        s.value?.resolveSelectables(), r.toggleSelect(ye);
      }
      r.setSelectedCount(g.value?.size || 0);
    }, se = (D) => {
      const V = t.contextMenuItems.find((j) => j.show(t, {
        searchQuery: "",
        items: [D],
        target: D
      }));
      V && V.action(t, [D]);
    }, fe = (D) => {
      const V = D.target?.closest(".file-item-" + R), j = V ? String(V.getAttribute("data-key")) : null;
      if (!j) return;
      const ye = v.value?.find((Ct) => Ct.path === j);
      ye && se(ye);
    }, We = () => {
      const D = g.value;
      return v.value?.filter((V) => D?.has(V.path)) || [];
    }, Ke = (D) => {
      D.preventDefault();
      const V = D.target?.closest(".file-item-" + R);
      if (V) {
        const j = String(V.getAttribute("data-key")), ye = v.value?.find((Ct) => Ct.path === j);
        g.value?.has(j) || (r.clearSelection(), r.select(j)), t.emitter.emit("vf-contextmenu-show", { event: D, items: We(), target: ye });
      }
    }, Be = (D) => {
      D.preventDefault(), t.emitter.emit("vf-contextmenu-show", { event: D, items: We() });
    }, Ge = (D) => {
      if (D.altKey || D.ctrlKey || D.metaKey)
        return D.preventDefault(), !1;
      Y.value = !0;
      const V = D.target?.closest(".file-item-" + R);
      if (B.value = V ? String(V.dataset.key) : null, D.dataTransfer && B.value) {
        D.dataTransfer.setDragImage(n.value, 0, 15), D.dataTransfer.effectAllowed = "all", D.dataTransfer.dropEffect = "copy";
        const j = g.value?.has(B.value) ? Array.from(g.value) : [B.value];
        D.dataTransfer.setData("items", JSON.stringify(j)), r.setDraggedItem(B.value);
      }
    }, je = () => {
      B.value = null;
    };
    return (D, V) => (f(), p("div", Xc, [
      u("div", {
        ref: "customScrollBarContainer",
        class: ee(["vuefinder__explorer__scrollbar-container", [{ "grid-view": a(h).view === "grid" }, { "search-active": a(d).hasQuery }]])
      }, [
        u("div", Qc, null, 512)
      ], 2),
      a(h).view === "list" || a(d).query.length ? (f(), p("div", Zc, [
        u("div", {
          onClick: V[0] || (V[0] = (j) => a(r).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          U(_(a(te)("Name")) + " ", 1),
          ae(A(_t, {
            direction: a(r).sort.order
          }, null, 8, ["direction"]), [
            [Ce, a(r).sort.active && a(r).sort.column === "basename"]
          ])
        ]),
        a(d).query.length ? E("", !0) : (f(), p("div", {
          key: 0,
          onClick: V[1] || (V[1] = (j) => a(r).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          U(_(a(te)("Size")) + " ", 1),
          ae(A(_t, {
            direction: a(r).sort.order
          }, null, 8, ["direction"]), [
            [Ce, a(r).sort.active && a(r).sort.column === "file_size"]
          ])
        ])),
        a(d).query.length ? (f(), p("div", {
          key: 1,
          onClick: V[2] || (V[2] = (j) => a(r).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          U(_(a(te)("Filepath")) + " ", 1),
          ae(A(_t, {
            direction: a(r).sort.order
          }, null, 8, ["direction"]), [
            [Ce, a(r).sort.active && a(r).sort.column === "path"]
          ])
        ])) : E("", !0),
        a(d).query.length ? E("", !0) : (f(), p("div", {
          key: 2,
          onClick: V[3] || (V[3] = (j) => a(r).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          U(_(a(te)("Date")) + " ", 1),
          ae(A(_t, {
            direction: a(r).sort.order
          }, null, 8, ["direction"]), [
            [Ce, a(r).sort.active && a(r).sort.column === "last_modified"]
          ])
        ]))
      ])) : E("", !0),
      u("div", {
        ref_key: "scrollContainer",
        ref: o,
        class: ee(["vuefinder__explorer__selector-area", "scroller-" + a(R)]),
        onScroll: V[5] || (V[5] = //@ts-ignore
        (...j) => a(ue) && a(ue)(...j))
      }, [
        a(m).get("loadingIndicator") === "linear" && a(w) ? (f(), p("div", Jc)) : E("", !0),
        a(m).get("loadingIndicator") === "circular" && a(w) ? (f(), p("div", eu)) : E("", !0),
        u("div", {
          ref_key: "scrollContent",
          ref: l,
          class: "scrollContent min-h-full",
          style: Ye({ height: `${a(O)}px`, position: "relative", width: "100%" }),
          onContextmenu: Ee(Be, ["self", "prevent"]),
          onClick: V[4] || (V[4] = Ee(
            //@ts-ignore
            (...j) => a(ie) && a(ie)(...j),
            ["self"]
          ))
        }, [
          u("div", {
            ref_key: "dragImage",
            ref: n,
            class: "vuefinder__explorer__drag-item"
          }, [
            A($c, {
              count: B.value && a(g)?.has(B.value) ? a(g)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          a(d).query.length ? (f(!0), p(oe, { key: 0 }, re(a(H), (j) => (f(), C(It, {
            key: j,
            "row-index": j,
            "row-height": F.value,
            view: "list",
            items: S(j) ? [S(j)] : [],
            compact: a(h).compactListView,
            "show-path": !0,
            "is-dragging-item": P,
            "is-selected": b,
            "drag-n-drop-events": (ye) => a(i).events(ye),
            explorerId: a(R),
            onClick: z,
            onDblclick: fe,
            onContextmenu: Ke,
            onDragstart: Ge,
            onDragend: je
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : a(h).view === "grid" ? (f(!0), p(oe, { key: 1 }, re(a(H), (j) => (f(), C(It, {
            key: j,
            "row-index": j,
            "row-height": F.value,
            view: "grid",
            "items-per-row": a(le),
            items: a(q)(a(v), j),
            "show-thumbnails": a(h).showThumbnails,
            "is-dragging-item": P,
            "is-selected": b,
            "drag-n-drop-events": (ye) => a(i).events(ye),
            explorerId: a(R),
            onClick: z,
            onDblclick: fe,
            onContextmenu: Ke,
            onDragstart: Ge,
            onDragend: je
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (f(!0), p(oe, { key: 2 }, re(a(H), (j) => (f(), C(It, {
            key: j,
            "row-index": j,
            "row-height": F.value,
            view: "list",
            items: S(j) ? [S(j)] : [],
            compact: a(h).compactListView,
            "is-dragging-item": P,
            "is-selected": b,
            "drag-n-drop-events": (ye) => a(i).events(ye),
            explorerId: a(R),
            onClick: z,
            onDblclick: fe,
            onContextmenu: Ke,
            onDragstart: Ge,
            onDragend: je
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      A(Gc)
    ]));
  }
}), iu = ["href", "download"], nu = ["onClick"], ou = /* @__PURE__ */ K({
  __name: "ContextMenu",
  setup(e) {
    const t = G("ServiceContainer"), i = t.search, n = N(i.state), s = k(null), o = k([]), l = wt({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    t.emitter.on("vf-context-selected", (h) => {
      o.value = h;
    });
    const c = (h) => h.link(t, o.value), r = (h) => {
      t.emitter.emit("vf-contextmenu-hide"), h.action(t, o.value);
    };
    t.emitter.on("vf-contextmenu-show", ({ event: h, items: d, target: v = null }) => {
      if (l.items = t.contextMenuItems.filter((g) => g.show(t, {
        searchQuery: n.query,
        items: d,
        target: v
      })), n.query)
        if (v)
          t.emitter.emit("vf-context-selected", [v]);
        else
          return;
      else !v && !n.query ? t.emitter.emit("vf-context-selected", []) : d.length > 1 && d.some((g) => g.path === v.path) ? t.emitter.emit("vf-context-selected", d) : t.emitter.emit("vf-context-selected", [v]);
      m(h);
    }), t.emitter.on("vf-contextmenu-hide", () => {
      l.active = !1;
    });
    const m = (h) => {
      const d = t.root, v = t.root.getBoundingClientRect(), g = d.getBoundingClientRect();
      let w = h.clientX - v.left, b = h.clientY - v.top;
      l.active = !0, ct(() => {
        const x = s.value?.getBoundingClientRect();
        let y = x?.height ?? 0, M = x?.width ?? 0;
        w = g.right - h.pageX + window.scrollX < M ? w - M : w, b = g.bottom - h.pageY + window.scrollY < y ? b - y : b, l.positions = {
          left: String(w) + "px",
          top: String(b) + "px"
        };
      });
    };
    return (h, d) => ae((f(), p("ul", {
      ref_key: "contextmenu",
      ref: s,
      class: ee([l.active ? "vuefinder__context-menu--active" : "vuefinder__context-menu--inactive", "vuefinder__context-menu"]),
      style: Ye(l.positions)
    }, [
      (f(!0), p(oe, null, re(l.items, (v) => (f(), p("li", {
        class: "vuefinder__context-menu__item",
        key: v.title
      }, [
        v.link ? (f(), p("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: c(v),
          download: c(v),
          onClick: d[0] || (d[0] = (g) => a(t).emitter.emit("vf-contextmenu-hide"))
        }, [
          u("span", null, _(v.title(a(t).i18n)), 1)
        ], 8, iu)) : (f(), p("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => r(v)
        }, [
          u("span", null, _(v.title(a(t).i18n)), 1)
        ], 8, nu))
      ]))), 128))
    ], 6)), [
      [Ce, l.active]
    ]);
  }
}), su = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function ru(e, t) {
  return f(), p("svg", su, [...t[0] || (t[0] = [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const Ki = { render: ru }, au = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function lu(e, t) {
  return f(), p("svg", au, [...t[0] || (t[0] = [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const cu = { render: lu }, uu = { class: "vuefinder__status-bar__wrapper" }, du = { class: "vuefinder__status-bar__storage" }, hu = ["title"], mu = { class: "vuefinder__status-bar__storage-icon" }, fu = ["value"], vu = ["value"], pu = { class: "vuefinder__status-bar__info" }, gu = { key: 0 }, _u = { class: "vuefinder__status-bar__selected-count" }, bu = { class: "vuefinder__status-bar__actions" }, wu = ["disabled"], yu = ["title"], xu = /* @__PURE__ */ K({
  __name: "Statusbar",
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n, n = t.fs, s = t.search, o = N(s.state), l = N(n.sortedFiles), c = N(n.path), r = N(n.selectedCount), m = N(n.storages), h = (v) => {
      const g = v.target.value;
      t.emitter.emit("vf-search-exit"), t.emitter.emit("vf-fetch", { params: { q: "index", storage: g } });
    }, d = ce(() => {
      const v = t.selectButton.multiple ? r.value > 0 : r.value === 1;
      return t.selectButton.active && v;
    });
    return (v, g) => (f(), p("div", uu, [
      u("div", du, [
        u("div", {
          class: "vuefinder__status-bar__storage-container",
          title: a(i)("Storage")
        }, [
          u("div", mu, [
            A(a(Ki))
          ]),
          u("select", {
            name: "vuefinder-media-selector",
            value: a(c)?.storage,
            onChange: h,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (f(!0), p(oe, null, re(a(m), (w) => (f(), p("option", {
              value: w,
              key: w
            }, _(w), 9, vu))), 128))
          ], 40, fu)
        ], 8, hu),
        u("div", pu, [
          a(o).hasQuery ? (f(), p("span", gu, _(a(l).value.length) + " items found. ", 1)) : E("", !0),
          u("span", _u, _(a(r) > 0 ? `${a(r)} item(s) selected.` : ""), 1)
        ])
      ]),
      u("div", bu, [
        a(t).selectButton.active ? (f(), p("button", {
          key: 0,
          class: ee(["vf-btn vf-btn-primary vf-btn-small", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: g[0] || (g[0] = (w) => a(t).selectButton.click(a(n).selectedItems, w))
        }, _(a(i)("Select")), 11, wu)) : E("", !0),
        u("span", {
          class: "vuefinder__status-bar__about",
          title: a(i)("About"),
          onClick: g[1] || (g[1] = (w) => a(t).modal.open(vi))
        }, [
          A(a(cu))
        ], 8, yu)
      ])
    ]));
  }
}), Su = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function ku(e, t) {
  return f(), p("svg", Su, [...t[0] || (t[0] = [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Gi = { render: ku }, Cu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function $u(e, t) {
  return f(), p("svg", Cu, [...t[0] || (t[0] = [
    u("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    u("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Au = { render: $u }, Mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Eu(e, t) {
  return f(), p("svg", Mu, [...t[0] || (t[0] = [
    u("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    u("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ])]);
}
const Xi = { render: Eu }, Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function zu(e, t) {
  return f(), p("svg", Ru, [...t[0] || (t[0] = [
    u("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    u("path", { d: "M9 12h6" }, null, -1)
  ])]);
}
const Qi = { render: zu };
function Zi(e, t) {
  const i = e.findIndex((n) => n.path === t.path);
  i > -1 ? e[i] = t : e.push(t);
}
const Tu = { class: "vuefinder__folder-loader-indicator" }, Du = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Ji = /* @__PURE__ */ K({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ ln({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = e, i = G("ServiceContainer"), { t: n } = i.i18n, s = hi(e, "modelValue"), o = k(!1);
    _e(
      () => s.value,
      () => l()?.folders.length || c()
    );
    function l() {
      return i.treeViewData.find((r) => r.path === t.path);
    }
    const c = () => {
      o.value = !0, i.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          storage: t.storage,
          path: t.path
        }
      }).then((r) => {
        Zi(i.treeViewData, { path: t.path, type: "dir", ...r });
      }).catch((r) => {
      }).finally(() => {
        o.value = !1;
      });
    };
    return (r, m) => (f(), p("div", Tu, [
      o.value ? (f(), C(a(Xt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (f(), p("div", Du, [
        s.value && l()?.folders.length ? (f(), C(a(Qi), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : E("", !0),
        s.value ? E("", !0) : (f(), C(a(Xi), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Iu = ["onClick"], Lu = ["title", "onDblclick", "onClick"], Hu = { class: "vuefinder__treesubfolderlist__item-icon" }, Fu = { class: "vuefinder__treesubfolderlist__subfolder" }, Bu = /* @__PURE__ */ K({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(e) {
    const t = G("ServiceContainer"), i = t.fs, n = ht(t, ["bg-blue-200", "dark:bg-slate-600"]), s = k({}), o = N(i.path), l = e, c = k(null);
    be(() => {
      l.path === l.storage + "://" && c.value && jt(c.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const r = ce(() => t.treeViewData.find((m) => m.path === l.path)?.folders || []);
    return (m, h) => {
      const d = Le("TreeSubfolderList", !0);
      return f(), p("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (f(!0), p(oe, null, re(r.value, (v) => (f(), p("li", {
          key: v.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          u("div", Me(qe(a(n).events({ ...v, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            u("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (g) => s.value[v.path] = !s.value[v.path]
            }, [
              A(Ji, {
                storage: e.storage,
                path: v.path,
                modelValue: s.value[v.path],
                "onUpdate:modelValue": (g) => s.value[v.path] = g
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Iu),
            u("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: v.path,
              onDblclick: (g) => s.value[v.path] = !s.value[v.path],
              onClick: (g) => a(t).emitter.emit("vf-fetch", { params: { q: "index", storage: l.storage, path: v.path } })
            }, [
              u("div", Hu, [
                a(o)?.path === v.path ? (f(), C(a(Gi), { key: 0 })) : (f(), C(a(kt), { key: 1 }))
              ]),
              u("div", {
                class: ee(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(o)?.path === v.path
                }])
              }, _(v.basename), 3)
            ], 40, Lu)
          ], 16),
          u("div", Fu, [
            ae(A(d, {
              storage: l.storage,
              path: v.path
            }, null, 8, ["storage", "path"]), [
              [Ce, s.value[v.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Ou = /* @__PURE__ */ K({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(e) {
    const t = G("ServiceContainer"), i = t.fs, n = k(!1), s = e, o = ht(t, ["bg-blue-200", "dark:bg-slate-600"]), l = N(i.path), c = ce(() => s.storage === l.value?.storage), r = {
      storage: s.storage,
      path: s.storage + "://",
      type: "dir",
      basename: s.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function m(h) {
      h === l.value?.storage ? n.value = !n.value : (t.emitter.emit("vf-search-exit"), t.emitter.emit("vf-fetch", { params: { q: "index", storage: h } }));
    }
    return (h, d) => (f(), p(oe, null, [
      u("div", {
        onClick: d[2] || (d[2] = (v) => m(e.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        u("div", Me(qe(a(o).events(r), !0), {
          class: ["vuefinder__treestorageitem__info", c.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          u("div", {
            class: ee(["vuefinder__treestorageitem__icon", c.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            A(a(Ki))
          ], 2),
          u("div", null, _(e.storage), 1)
        ], 16),
        u("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: d[1] || (d[1] = Ee((v) => n.value = !n.value, ["stop"]))
        }, [
          A(Ji, {
            storage: e.storage,
            path: e.storage + "://",
            modelValue: n.value,
            "onUpdate:modelValue": d[0] || (d[0] = (v) => n.value = v)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      ae(A(Bu, {
        storage: e.storage,
        path: e.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ce, n.value]
      ])
    ], 64));
  }
}), Pu = { class: "vuefinder__folder-indicator" }, Vu = { class: "vuefinder__folder-indicator--icon" }, Wu = /* @__PURE__ */ K({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(e) {
    const t = hi(e, "modelValue");
    return (i, n) => (f(), p("div", Pu, [
      u("div", Vu, [
        t.value ? (f(), C(a(Qi), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : E("", !0),
        t.value ? E("", !0) : (f(), C(a(Xi), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), ju = { class: "vuefinder__treeview__header" }, Uu = { class: "vuefinder__treeview__pinned-label" }, Nu = { class: "vuefinder__treeview__pin-text text-nowrap" }, qu = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Yu = ["onClick"], Ku = ["title"], Gu = ["onClick"], Xu = { key: 0 }, Qu = { class: "vuefinder__treeview__no-pinned" }, Zu = /* @__PURE__ */ K({
  __name: "TreeView",
  setup(e) {
    const t = G("ServiceContainer"), { t: i } = t.i18n, { getStore: n, setStore: s } = t.storage, o = t.fs, l = t.config, c = N(l.state), r = N(o.sortedFiles), m = N(o.path), h = ht(t, ["bg-blue-200", "dark:bg-slate-600"]), d = k(190), v = k(n("pinned-folders-opened", !0));
    _e(v, (x) => s("pinned-folders-opened", x));
    const g = (x) => {
      l.set("pinnedFolders", l.get("pinnedFolders").filter((y) => y.path !== x.path));
    }, w = (x) => {
      const y = x.clientX, M = x.target.parentElement;
      if (!M) return;
      const T = M.getBoundingClientRect().width;
      M.classList.remove("transition-[width]"), M.classList.add("transition-none");
      const F = (le) => {
        d.value = T + le.clientX - y, d.value < 50 && (d.value = 0, l.set("showTreeView", !1)), d.value > 50 && l.set("showTreeView", !0);
      }, te = () => {
        const le = M.getBoundingClientRect();
        d.value = le.width, M.classList.add("transition-[width]"), M.classList.remove("transition-none"), window.removeEventListener("mousemove", F), window.removeEventListener("mouseup", te);
      };
      window.addEventListener("mousemove", F), window.addEventListener("mouseup", te);
    }, b = k(null);
    return be(() => {
      b.value && jt(b.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), _e(r, (x) => {
      const y = x.filter((M) => M.type === "dir");
      Zi(t.treeViewData, {
        path: m.value?.path || "",
        folders: y.map((M) => ({
          storage: M.storage,
          path: M.path,
          basename: M.basename,
          type: "dir"
        }))
      });
    }), (x, y) => (f(), p(oe, null, [
      u("div", {
        onClick: y[0] || (y[0] = (M) => a(l).toggle("showTreeView")),
        class: ee(["vuefinder__treeview__overlay", a(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      u("div", {
        style: Ye(a(c).showTreeView ? "min-width:100px;max-width:75%; width: " + d.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        u("div", {
          ref_key: "treeViewScrollElement",
          ref: b,
          class: "vuefinder__treeview__scroll"
        }, [
          u("div", ju, [
            u("div", {
              onClick: y[2] || (y[2] = (M) => v.value = !v.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              u("div", Uu, [
                A(a(Yi), { class: "vuefinder__treeview__pin-icon" }),
                u("div", Nu, _(a(i)("Pinned Folders")), 1)
              ]),
              A(Wu, {
                modelValue: v.value,
                "onUpdate:modelValue": y[1] || (y[1] = (M) => v.value = M)
              }, null, 8, ["modelValue"])
            ]),
            v.value ? (f(), p("ul", qu, [
              (f(!0), p(oe, null, re(a(c).pinnedFolders, (M) => (f(), p("li", {
                key: M.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                u("div", Me(qe(a(h).events(M), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (T) => a(t).emitter.emit("vf-fetch", { params: { q: "index", storage: M.storage, path: M.path } })
                }), [
                  a(m)?.path !== M.path ? (f(), C(a(kt), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : E("", !0),
                  a(m)?.path === M.path ? (f(), C(a(Gi), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : E("", !0),
                  u("div", {
                    title: M.path,
                    class: ee(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": a(m)?.path === M.path
                    }])
                  }, _(M.basename), 11, Ku)
                ], 16, Yu),
                u("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (T) => g(M)
                }, [
                  A(a(Au), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Gu)
              ]))), 128)),
              a(c).pinnedFolders.length ? E("", !0) : (f(), p("li", Xu, [
                u("div", Qu, _(a(i)("No folders pinned")), 1)
              ]))
            ])) : E("", !0)
          ]),
          (f(!0), p(oe, null, re(a(o).storages.get(), (M) => (f(), p("div", {
            class: "vuefinder__treeview__storage",
            key: M
          }, [
            A(Ou, { storage: M }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        u("div", {
          onMousedown: w,
          class: "vuefinder__treeview__resize-handle"
        }, null, 32)
      ], 4)
    ], 64));
  }
}), ke = {
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
function Ju(e) {
  return e.items.length > 1 && e.items.some((t) => t.path === e.target?.path) ? "many" : e.target ? "one" : "none";
}
function we(e) {
  const t = Object.assign({
    needsSearchQuery: !1
  }, e);
  return (i, n) => !(t.needsSearchQuery !== !!n.searchQuery || t.target !== void 0 && t.target !== Ju(n) || t.targetType !== void 0 && t.targetType !== n.target?.type || t.mimeType !== void 0 && t.mimeType !== n.target?.mime_type || t.feature !== void 0 && !i.features.includes(t.feature));
}
function Lt(...e) {
  return (t, i) => e.some((n) => n(t, i));
}
function at(...e) {
  return (t, i) => e.every((n) => n(t, i));
}
const ed = [
  {
    id: ke.openDir,
    title: ({ t: e }) => e("Open containing folder"),
    action: (e, t) => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
        params: { q: "index", storage: t[0]?.storage, path: t[0]?.path }
      });
    },
    show: we({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: ke.refresh,
    title: ({ t: e }) => e("Refresh"),
    action: (e) => {
      const t = e.fs;
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: t.path.get().storage, path: t.path.get().path } });
    },
    show: Lt(we({ target: "none" }), we({ target: "many" }))
  },
  {
    id: ke.selectAll,
    title: ({ t: e }) => e("Select All"),
    action: (e) => {
      e.fs.selectAll();
    },
    show: we({ target: "none" })
  },
  {
    id: ke.newfolder,
    title: ({ t: e }) => e("New Folder"),
    action: (e) => e.modal.open(Pi),
    show: we({ target: "none", feature: ne.NEW_FOLDER })
  },
  {
    id: ke.open,
    title: ({ t: e }) => e("Open"),
    action: (e, t) => {
      e.emitter.emit("vf-search-exit"), t[0] && e.emitter.emit("vf-fetch", {
        params: { q: "index", storage: t[0].storage, path: t[0].path }
      });
    },
    show: we({ target: "one", targetType: "dir" })
  },
  {
    id: ke.pinFolder,
    title: ({ t: e }) => e("Pin Folder"),
    action: (e, t) => {
      const i = e.config, n = i.get("pinnedFolders"), s = n.concat(t.filter((o) => n.findIndex((l) => l.path === o.path) === -1));
      i.set("pinnedFolders", s);
    },
    show: at(
      we({ target: "one", targetType: "dir" }),
      (e, t) => e.config.get("pinnedFolders").findIndex((s) => s.path === t.target?.path) === -1
    )
  },
  {
    id: ke.unpinFolder,
    title: ({ t: e }) => e("Unpin Folder"),
    action: (e, t) => {
      const i = e.config, n = i.get("pinnedFolders");
      i.set("pinnedFolders", n.filter((s) => !t.find((o) => o.path === s.path)));
    },
    show: at(
      we({ target: "one", targetType: "dir" }),
      (e, t) => e.config.get("pinnedFolders").findIndex((s) => s.path === t.target?.path) !== -1
    )
  },
  {
    id: ke.preview,
    title: ({ t: e }) => e("Preview"),
    action: (e, t) => e.modal.open(Hi, { storage: t[0]?.storage, item: t[0] }),
    show: at(
      we({ target: "one", feature: ne.PREVIEW }),
      (e, t) => t.target?.type !== "dir"
    )
  },
  {
    id: ke.download,
    link: (e, t) => e.requester.getDownloadUrl(t[0]?.storage, t[0]),
    title: ({ t: e }) => e("Download"),
    action: () => {
    },
    show: at(
      we({ target: "one", feature: ne.DOWNLOAD }),
      (e, t) => t.target?.type !== "dir"
    )
  },
  {
    id: ke.rename,
    title: ({ t: e }) => e("Rename"),
    action: (e, t) => e.modal.open(Nt, { items: t }),
    show: we({ target: "one", feature: ne.RENAME })
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
    id: ke.archive,
    title: ({ t: e }) => e("Archive"),
    action: (e, t) => e.modal.open(qi, { items: t }),
    show: Lt(
      we({ target: "many", feature: ne.ARCHIVE }),
      at(
        we({ target: "one", feature: ne.ARCHIVE }),
        (e, t) => t.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: ke.unarchive,
    title: ({ t: e }) => e("Unarchive"),
    action: (e, t) => e.modal.open(Ui, { items: t }),
    show: we({ target: "one", feature: ne.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: ke.delete,
    title: ({ t: e }) => e("Delete"),
    action: (e, t) => {
      e.modal.open(Ut, { items: t });
    },
    show: Lt(
      we({ feature: ne.DELETE, target: "one" }),
      we({ feature: ne.DELETE, target: "many" })
    )
  }
], td = {
  class: "vuefinder",
  ref: "root",
  tabindex: "0"
}, id = { class: "vuefinder__main__content" }, nd = /* @__PURE__ */ K({
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
  setup(e, { emit: t }) {
    const i = t, n = e, s = zn(n, G("VueFinderOptions"));
    cn("ServiceContainer", s);
    const o = s.config, l = s.fs, c = N(o.state), r = N(l.selectedItems);
    Qr(s);
    let m = null;
    s.emitter.on("vf-fetch-abort", () => {
      m && m.abort(), l.setLoading(!1);
    }), s.emitter.on("vf-fetch", ({ params: d, body: v = null, onSuccess: g = null, onError: w = null, noCloseModal: b = !1 }) => {
      ["index", "search"].includes(d.q) && (m && m.abort(), l.setLoading(!0)), d.adapter = d.storage, m = new AbortController();
      const x = m.signal;
      s.requester.send({
        url: "",
        method: d.m || "get",
        params: d,
        body: v,
        abortSignal: x
      }).then((y) => {
        l.setPath(y.dirname), o.get("persist") && o.set("path", y.dirname), b || s.modal.close(), l.setFiles(y.files), l.clearSelection(), l.setSelectedCount(0), l.setStorages(y.storages), g && g(y);
      }).catch((y) => {
        console.error(y), w ? w(y) : y && typeof y == "object" && "message" in y && s.emitter.emit("vf-toast-push", { label: y.message, type: "error" });
      }).finally(() => {
        ["index", "search"].includes(d.q) && l.setLoading(!1);
      });
    });
    function h(d) {
      let v = {};
      d && d.includes("://") && (v = {
        storage: d.split("://")[0],
        path: d
      }), s.emitter.emit("vf-fetch", {
        params: { q: "index", storage: l.path.get().storage, ...v },
        onError: n.onError ?? ((g) => {
          g && typeof g == "object" && "message" in g && s.emitter.emit("vf-toast-push", { label: g.message, type: "error" });
        })
      });
    }
    return be(() => {
      _e(() => n.path, (v) => {
        h(v);
      });
      const d = o.get("persist") ? o.get("path") : n.path;
      l.setPath(d), h(d), s.emitter.on("vf-select", (v) => {
        s.selectedItems = v, i("select", v);
      }), _e(() => l.path.get().path, (v) => {
        i("update:path", v);
      }), _e(r, (v) => {
        i("select", v);
      });
    }), (d, v) => (f(), p("div", td, [
      u("div", {
        class: ee(a(s).theme.actualValue)
      }, [
        u("div", {
          class: ee([a(c).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: Ye(a(c).fullScreen ? "" : "max-height: " + e.maxHeight),
          onMousedown: v[0] || (v[0] = (g) => a(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: v[1] || (v[1] = (g) => a(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          A(xl),
          A(hc),
          u("div", id, [
            A(Zu),
            A(tu)
          ]),
          A(xu)
        ], 38),
        A(un, { name: "fade" }, {
          default: W(() => [
            a(s).modal.visible ? (f(), C(Qe(a(s).modal.type), { key: 0 })) : E("", !0)
          ]),
          _: 1
        }),
        A(ou)
      ], 2)
    ], 512));
  }
}), fd = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(e, t = {}) {
    t.i18n = t.i18n ?? {};
    let [i] = Object.keys(t.i18n);
    t.locale = t.locale ?? i ?? "en", e.provide("VueFinderOptions", t), e.component("VueFinder", nd);
  }
};
export {
  ke as ContextMenuIds,
  nd as VueFinder,
  fd as VueFinderPlugin,
  ed as contextMenuItems,
  fd as default
};
