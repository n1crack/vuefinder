import { ref as I, watch as vt, inject as z, openBlock as y, createElementBlock as D, createElementVNode as u, unref as x, normalizeClass as de, createTextVNode as se, toDisplayString as E, createCommentVNode as G, createVNode as we, TransitionGroup as Li, withCtx as J, Fragment as ce, renderList as be, reactive as ft, onMounted as xe, onUpdated as Ni, withDirectives as ve, vShow as lt, withModifiers as Pe, nextTick as bt, vModelSelect as ur, customRef as ji, withKeys as Ye, isRef as Vi, vModelText as We, normalizeStyle as Er, provide as Ge, createBlock as Z, resolveDynamicComponent as zi, renderSlot as Mt } from "vue";
import kt from "plupload";
var $r;
const mt = ($r = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : $r.getAttribute("content"), pt = (o, { method: e = "get", params: t = {}, json: i = !0, signal: n = null }) => {
  const a = { method: e };
  if (a.signal = n, e == "get")
    o += "?" + new URLSearchParams(t);
  else {
    a.headers = {}, mt && (a.headers["X-CSRF-Token"] = mt);
    let s = new FormData();
    for (const [f, m] of Object.entries(t))
      s.append(f, m);
    a.body = s;
  }
  return fetch(o, a).then((s) => s.ok ? i ? s.json() : s.text() : s.json().then(Promise.reject.bind(Promise)));
};
function Bi(o) {
  return { all: o = o || /* @__PURE__ */ new Map(), on: function(e, t) {
    var i = o.get(e);
    i ? i.push(t) : o.set(e, [t]);
  }, off: function(e, t) {
    var i = o.get(e);
    i && (t ? i.splice(i.indexOf(t) >>> 0, 1) : o.set(e, []));
  }, emit: function(e, t) {
    var i = o.get(e);
    i && i.slice().map(function(n) {
      n(t);
    }), (i = o.get("*")) && i.slice().map(function(n) {
      n(e, t);
    });
  } };
}
function $t(o) {
  let e = localStorage.getItem(o + "_storage");
  const t = I(JSON.parse(e));
  vt(t, i);
  function i() {
    t.value === null || t.value === "" ? localStorage.removeItem(o + "_storage") : localStorage.setItem(o + "_storage", JSON.stringify(t.value));
  }
  function n(f, m) {
    t.value = Object.assign({ ...t.value }, { [f]: m });
  }
  function a() {
    t.value = null;
  }
  return { getStore: (f, m = null) => t.value === null || t.value === "" ? m : t.value.hasOwnProperty(f) ? t.value[f] : m, setStore: n, clearStore: a };
}
const dr = I("");
function Se() {
  function o(e) {
    dr.value = e;
  }
  return { apiUrl: dr, setApiUrl: o };
}
const Ri = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Hi = {
  key: 0,
  class: "flex text-center"
}, Ui = ["aria-label"], Ki = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  })
], -1), Yi = [
  Ki
], Wi = ["aria-label"], Xi = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
  })
], -1), Fi = [
  Xi
], qi = ["aria-label"], Gi = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Ji = [
  Gi
], Zi = ["aria-label"], Qi = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), ea = [
  Qi
], ta = ["aria-label"], ra = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  })
], -1), ia = [
  ra
], aa = ["aria-label"], oa = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), na = [
  oa
], sa = ["aria-label"], la = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), ca = [
  la
], ua = {
  key: 1,
  class: "flex text-center"
}, da = { class: "pl-2" }, ha = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, fa = {
  key: 0,
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, ma = /* @__PURE__ */ u("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), pa = /* @__PURE__ */ u("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), ga = [
  ma,
  pa
], va = { class: "flex text-center items-center justify-end" }, ba = ["aria-label"], ya = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), wa = [
  ya
], xa = ["aria-label"], _a = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, ka = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, Sa = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, Da = ["aria-label"], Ca = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, Ma = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, $a = {
  name: "VFToolbar"
}, Ea = /* @__PURE__ */ Object.assign($a, {
  props: {
    data: Object
  },
  setup(o) {
    const e = z("emitter"), { getStore: t, setStore: i } = z("storage"), { t: n } = z("i18n"), a = I(t("viewport", "grid")), s = I([]), f = I(t("full-screen", !1)), m = I("");
    e.on("vf-search-query", ({ newQuery: b }) => {
      m.value = b;
    });
    const p = z("loadingState"), h = () => p.value, v = () => {
      f.value = !f.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (b) => {
      s.value = b;
    }), e.on("vf-view-toggle", (b) => {
      i("viewport", b), a.value = b;
    }), (b, T) => (y(), D("div", Ri, [
      m.value.length ? (y(), D("div", ua, [
        u("div", da, [
          se(E(x(n)("Search results for")) + " ", 1),
          u("span", ha, E(m.value), 1)
        ]),
        h() ? (y(), D("svg", fa, ga)) : G("", !0)
      ])) : (y(), D("div", Hi, [
        u("div", {
          class: "mx-1.5",
          "aria-label": x(n)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: T[0] || (T[0] = (k) => x(e).emit("vf-modal-show", { type: "new-folder", items: s.value }))
        }, Yi, 8, Ui),
        u("div", {
          class: "mx-1.5",
          "aria-label": x(n)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[1] || (T[1] = (k) => x(e).emit("vf-modal-show", { type: "new-file", items: s.value }))
        }, Fi, 8, Wi),
        u("div", {
          class: "mx-1.5",
          "aria-label": x(n)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[2] || (T[2] = (k) => s.value.length != 1 || x(e).emit("vf-modal-show", { type: "rename", items: s.value }))
        }, [
          (y(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Ji, 2))
        ], 8, qi),
        u("div", {
          class: "mx-1.5",
          "aria-label": x(n)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[3] || (T[3] = (k) => !s.value.length || x(e).emit("vf-modal-show", { type: "delete", items: s.value }))
        }, [
          (y(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ea, 2))
        ], 8, Zi),
        u("div", {
          class: "mx-1.5",
          "aria-label": x(n)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[4] || (T[4] = (k) => x(e).emit("vf-modal-show", { type: "upload", items: s.value }))
        }, ia, 8, ta),
        s.value.length == 1 && s.value[0].mime_type == "application/zip" ? (y(), D("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": x(n)("Unrchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[5] || (T[5] = (k) => !s.value.length || x(e).emit("vf-modal-show", { type: "unarchive", items: s.value }))
        }, [
          (y(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, na, 2))
        ], 8, aa)) : (y(), D("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": x(n)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[6] || (T[6] = (k) => !s.value.length || x(e).emit("vf-modal-show", { type: "archive", items: s.value }))
        }, [
          (y(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ca, 2))
        ], 8, sa))
      ])),
      u("div", va, [
        u("div", {
          class: "mx-1.5",
          "aria-label": x(n)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (y(), D("svg", {
            onClick: T[7] || (T[7] = (k) => x(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, wa))
        ], 8, ba),
        u("div", {
          class: "mx-1.5",
          "aria-label": x(n)("Toggle Full Screen"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v
        }, [
          (y(), D("svg", _a, [
            f.value ? (y(), D("path", ka)) : (y(), D("path", Sa))
          ]))
        ], 8, xa),
        u("div", {
          class: "mx-1.5",
          "aria-label": x(n)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: T[8] || (T[8] = (k) => m.value.length || x(e).emit("vf-view-toggle", a.value == "list" ? "grid" : "list"))
        }, [
          (y(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([m.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            a.value == "grid" ? (y(), D("path", Ca)) : G("", !0),
            a.value == "list" ? (y(), D("path", Ma)) : G("", !0)
          ], 2))
        ], 8, Da)
      ])
    ]));
  }
});
var Ta = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Tr = { exports: {} };
(function(o, e) {
  (function(t, i) {
    o.exports = i();
  })(Ta, function() {
    function t(d, l) {
      if (!(d instanceof l))
        throw new TypeError("Cannot call a class as a function");
    }
    function i(d, l) {
      for (var r = 0; r < l.length; r++) {
        var g = l[r];
        g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(d, g.key, g);
      }
    }
    function n(d, l, r) {
      return l && i(d.prototype, l), r && i(d, r), d;
    }
    function a(d, l, r) {
      return l in d ? Object.defineProperty(d, l, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : d[l] = r, d;
    }
    function s(d, l) {
      var r = Object.keys(d);
      if (Object.getOwnPropertySymbols) {
        var g = Object.getOwnPropertySymbols(d);
        l && (g = g.filter(function(c) {
          return Object.getOwnPropertyDescriptor(d, c).enumerable;
        })), r.push.apply(r, g);
      }
      return r;
    }
    function f(d) {
      for (var l = 1; l < arguments.length; l++) {
        var r = arguments[l] != null ? arguments[l] : {};
        l % 2 ? s(Object(r), !0).forEach(function(g) {
          a(d, g, r[g]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(d, Object.getOwnPropertyDescriptors(r)) : s(Object(r)).forEach(function(g) {
          Object.defineProperty(d, g, Object.getOwnPropertyDescriptor(r, g));
        });
      }
      return d;
    }
    function m(d, l) {
      if (typeof l != "function" && l !== null)
        throw new TypeError("Super expression must either be null or a function");
      d.prototype = Object.create(l && l.prototype, {
        constructor: {
          value: d,
          writable: !0,
          configurable: !0
        }
      }), l && h(d, l);
    }
    function p(d) {
      return p = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, p(d);
    }
    function h(d, l) {
      return h = Object.setPrototypeOf || function(g, c) {
        return g.__proto__ = c, g;
      }, h(d, l);
    }
    function v() {
      if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
        return !1;
      if (typeof Proxy == "function")
        return !0;
      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        })), !0;
      } catch {
        return !1;
      }
    }
    function b(d, l, r) {
      return v() ? b = Reflect.construct : b = function(c, w, _) {
        var S = [null];
        S.push.apply(S, w);
        var $ = Function.bind.apply(c, S), P = new $();
        return _ && h(P, _.prototype), P;
      }, b.apply(null, arguments);
    }
    function T(d) {
      return Function.toString.call(d).indexOf("[native code]") !== -1;
    }
    function k(d) {
      var l = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return k = function(g) {
        if (g === null || !T(g))
          return g;
        if (typeof g != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof l < "u") {
          if (l.has(g))
            return l.get(g);
          l.set(g, c);
        }
        function c() {
          return b(g, arguments, p(this).constructor);
        }
        return c.prototype = Object.create(g.prototype, {
          constructor: {
            value: c,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), h(c, g);
      }, k(d);
    }
    function M(d) {
      if (d === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return d;
    }
    function N(d, l) {
      return l && (typeof l == "object" || typeof l == "function") ? l : M(d);
    }
    function Y(d) {
      var l = v();
      return function() {
        var g = p(d), c;
        if (l) {
          var w = p(this).constructor;
          c = Reflect.construct(g, arguments, w);
        } else
          c = g.apply(this, arguments);
        return N(this, c);
      };
    }
    function R(d, l) {
      for (; !Object.prototype.hasOwnProperty.call(d, l) && (d = p(d), d !== null); )
        ;
      return d;
    }
    function A(d, l, r) {
      return typeof Reflect < "u" && Reflect.get ? A = Reflect.get : A = function(c, w, _) {
        var S = R(c, w);
        if (!!S) {
          var $ = Object.getOwnPropertyDescriptor(S, w);
          return $.get ? $.get.call(_) : $.value;
        }
      }, A(d, l, r || d);
    }
    function U(d, l) {
      return q(d) || ue(d, l) || me(d, l) || j();
    }
    function F(d) {
      return C(d) || ee(d) || me(d) || B();
    }
    function C(d) {
      if (Array.isArray(d))
        return L(d);
    }
    function q(d) {
      if (Array.isArray(d))
        return d;
    }
    function ee(d) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(d))
        return Array.from(d);
    }
    function ue(d, l) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(d)))) {
        var r = [], g = !0, c = !1, w = void 0;
        try {
          for (var _ = d[Symbol.iterator](), S; !(g = (S = _.next()).done) && (r.push(S.value), !(l && r.length === l)); g = !0)
            ;
        } catch ($) {
          c = !0, w = $;
        } finally {
          try {
            !g && _.return != null && _.return();
          } finally {
            if (c)
              throw w;
          }
        }
        return r;
      }
    }
    function me(d, l) {
      if (!!d) {
        if (typeof d == "string")
          return L(d, l);
        var r = Object.prototype.toString.call(d).slice(8, -1);
        if (r === "Object" && d.constructor && (r = d.constructor.name), r === "Map" || r === "Set")
          return Array.from(d);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return L(d, l);
      }
    }
    function L(d, l) {
      (l == null || l > d.length) && (l = d.length);
      for (var r = 0, g = new Array(l); r < l; r++)
        g[r] = d[r];
      return g;
    }
    function B() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function j() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var W = function(l, r, g) {
      var c = l.x, w = l.y, _ = g.x, S = g.y, $ = {
        "+": {
          x: c + _,
          y: w + S
        },
        "-": {
          x: c - _,
          y: w - S
        },
        "*": {
          x: c * _,
          y: w * S
        },
        "/": {
          x: c / _,
          y: w / S
        }
      };
      return $[r];
    }, H = function(l) {
      return {
        x: l.left,
        y: l.top
      };
    }, ae = function(l) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: l.x,
        top: l.y,
        right: l.x,
        bottom: l.y,
        width: r,
        height: r
      };
    }, Q = function(l) {
      return {
        x: l,
        y: l
      };
    }, Xe = function(d, l, r) {
      window.addEventListener("resize", l), window.addEventListener("scroll", l), d.forEach(function(g, c) {
        r.observe(g, {
          childList: c !== 0,
          attributes: !0
        });
      });
    }, Fe = function(d) {
      var l = je(d);
      return l.x || l.y ? !0 : d instanceof HTMLDocument ? d.body ? !!(d.body.scrollTop = 1) : !!(d.documentElement.scrollTop = 1) : !!(d.scrollTop = 1);
    }, at = function(d) {
      var l = document.createElement("div");
      return l.style.position = "fixed", l.style.overflow = "hidden", l.style.pointerEvents = "none", l.style.zIndex = "999999999999999999", l.classList.add(d), l;
    }, ot = function(d) {
      var l = document.createElement("div");
      return l.style.position = "absolute", d || (l.style.background = "rgba(0, 0, 255, 0.1)", l.style.border = "1px solid rgba(0, 0, 255, 0.45)", l.style.display = "none", l.style.pointerEvents = "none"), l;
    }, nt = function(d, l) {
      var r;
      return function() {
        for (var g = arguments.length, c = new Array(g), w = 0; w < g; w++)
          c[w] = arguments[w];
        var _ = function() {
          r = null, d.apply(void 0, c);
        };
        clearTimeout(r), r = setTimeout(_, l);
      };
    }, Ne = function() {
      var d, l, r, g;
      return {
        y: ((d = document.body) === null || d === void 0 ? void 0 : d.scrollTop) || ((l = document.documentElement) === null || l === void 0 ? void 0 : l.scrollTop) || 0,
        x: ((r = document.body) === null || r === void 0 ? void 0 : r.scrollLeft) || ((g = document.documentElement) === null || g === void 0 ? void 0 : g.scrollLeft) || 0
      };
    }, wt = function(d, l) {
      if (d instanceof Document)
        return {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      var r = d.getBoundingClientRect();
      return {
        top: r.top,
        left: r.left,
        bottom: r.bottom,
        right: r.right,
        width: (d.clientWidth || r.width) * l,
        height: (d.clientHeight || r.height) * l
      };
    }, je = function(d) {
      return !d || d instanceof Document ? Ne() : {
        x: d.scrollLeft >= 0 ? d.scrollLeft : Ne().x,
        y: d.scrollTop >= 0 ? d.scrollTop : Ne().y
      };
    }, Kt = function(d) {
      var l = d.elementRect, r = d.containerRect, g = d.tolerance, c = g === void 0 ? {
        x: 0,
        y: 0
      } : g, w = [];
      return l.top - c.y < r.top && w.push("top"), l.left - c.x < r.left && w.push("left"), l.bottom + c.y > r.bottom && w.push("bottom"), l.right + c.y > r.right && w.push("right"), w;
    }, Fr = function(d) {
      var l = d.event;
      return {
        x: l.clientX,
        y: l.clientY
      };
    }, qr = function(d) {
      var l = d.scrollAmount, r = d.initialPointerPos, g = d.pointerPos, c = {};
      return g.x > r.x - l.x ? (c.left = r.x - l.x, c.width = g.x - r.x + l.x) : (c.left = g.x, c.width = r.x - g.x - l.x), g.y > r.y - l.y ? (c.top = r.y - l.y, c.height = g.y - r.y + l.y) : (c.top = g.y, c.height = r.y - g.y - l.y), c;
    }, Yt = function(l) {
      var r = {
        x: 0,
        y: 0
      }, g = window.getComputedStyle(l);
      if (!g.transform || g.transform === "none")
        return r;
      if (g.transform.indexOf("3d") >= 0) {
        var c = g.transform.trim().match(/matrix3d\((.*?)\)/);
        if (c && c.length) {
          var w, _ = (w = c[1]) === null || w === void 0 ? void 0 : w.split(",");
          r.x = parseInt(_[12]) || 0, r.y = parseInt(_[13]) || 0;
        }
        return r;
      } else {
        var S = g.transform.trim().match(/matrix\((.*?)\)/);
        if (S && S.length) {
          var $, P = ($ = S[1]) === null || $ === void 0 ? void 0 : $.split(",");
          r.x = parseInt(P[4]) || 0, r.y = parseInt(P[5]) || 0;
        }
        return r;
      }
    }, Gr = function(l) {
      var r = l.style.transform;
      if (!r || r.indexOf("translate") < 0)
        return Yt(l);
      var g = {
        x: 0,
        y: 0
      }, c = r.trim().match(/translate[3dD]*?\(.*?\)/);
      if (c) {
        var w, _ = (w = c[0]) === null || w === void 0 ? void 0 : w.split("(");
        if (_) {
          var S, $ = (S = _[1]) === null || S === void 0 ? void 0 : S.split(",");
          g.x = parseInt($[0]) || 0, g.y = parseInt($[1]) || 0;
        }
      }
      return !g.x && !g.x ? Yt(l) : g;
    }, Jr = function(l) {
      var r = l.style, g = {
        x: parseInt(r.left) || 0,
        y: parseInt(r.top) || 0
      };
      if (!g.x && !g.x) {
        var c = window.getComputedStyle(l);
        return {
          x: parseInt(c.left) || 0,
          y: parseInt(c.top) || 0
        };
      }
      return g;
    }, Zr = function(d, l) {
      return l ? Gr(d) : Jr(d);
    }, Qr = function(d) {
      var l = d.element, r = d.edges, g = d.elementRect, c = d.containerRect, w = d.elementPos, _ = d.useTransform;
      r.includes("top") && qe(l, {
        y: w.y + c.top - g.top,
        x: w.x
      }, _), r.includes("left") && qe(l, {
        y: w.y,
        x: w.x + c.left - g.left
      }, _), r.includes("bottom") && qe(l, {
        y: w.y + c.bottom - g.bottom,
        x: w.x
      }, _), r.includes("right") && qe(l, {
        y: w.y,
        x: w.x + c.right - g.right
      }, _);
    }, Wt = function(d) {
      var l = d.computedStyle, r = d.node, g = l.position, c = g === "absolute" || g === "relative" || g === "fixed";
      !(r instanceof HTMLDocument) && !c && (r.style.position = "relative");
    }, ei = function(d) {
      var l = d.shiftKey, r = d.keyboardDragSpeed, g = d.zoom, c = d.key, w = d.dragKeys, _ = d.scrollDiff, S = d.canScroll, $ = d.scrollCallback, P = {
        x: 0,
        y: 0
      }, O = l ? r * 4 * g : r * g;
      return w.left.includes(c) && (P.x = _.x || -O, !l && !_.x && S && $(["left"], r)), w.right.includes(c) && (P.x = _.x || O, !l && !_.x && S && $(["right"], r)), w.up.includes(c) && (P.y = _.y || -O, !l && !_.y && S && $(["top"], r)), w.down.includes(c) && (P.y = _.y || O, !l && !_.y && S && $(["bottom"], r)), P;
    }, ti = function(d) {
      var l = d.element, r = d.force, g = d.multiSelectionToggle, c = d.SelectedSet, w = d.hoverClassName;
      l.classList.contains(w) && !r || (c.has(l) ? g && c.delete(l) : c.add(l), l.classList.add(w));
    }, ri = function(d) {
      var l = d.element, r = d.force, g = d.SelectedSet, c = d.PrevSelectedSet, w = d.hoverClassName;
      if (!l.classList.contains(w) && !r)
        return !1;
      var _ = g.has(l), S = c.has(l);
      _ && !S ? g.delete(l) : !_ && S && g.add(l), l.classList.remove(w);
    }, xt = function(d, l) {
      return d.left < l.right && d.right > l.left && d.top < l.bottom && d.bottom > l.top;
    }, Xt = function(d) {
      var l = d.element, r = d.posDirection, g = d.containerRect, c = d.useTransform, w = Zr(l, c), _ = W(w, "+", r);
      qe(l, _, c);
      var S = l.getBoundingClientRect(), $ = Kt({
        elementRect: S,
        containerRect: g
      });
      Qr({
        element: l,
        edges: $,
        elementRect: S,
        containerRect: g,
        elementPos: _,
        useTransform: c
      });
    }, ii = function(d, l) {
      window.removeEventListener("resize", l), window.removeEventListener("scroll", l), d.disconnect();
    }, ai = function(d, l, r) {
      if (!!l.length) {
        var g = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, c = d instanceof HTMLDocument ? g || document.body : d, w = l.includes("top") && c.scrollTop > 0, _ = l.includes("bottom") && c.scrollTop < c.scrollHeight, S = l.includes("left") && c.scrollLeft > 0, $ = l.includes("right") && c.scrollLeft < c.scrollWidth;
        w && (c.scrollTop -= 1 * r), _ && (c.scrollTop += 1 * r), S && (c.scrollLeft -= 1 * r), $ && (c.scrollLeft += 1 * r);
      }
    }, qe = function(d, l, r) {
      if (r) {
        var g = d.style.transform;
        d.style.transform = "translate3d(".concat(l.x, "px,").concat(l.y, "px,1px) ").concat(g.replace(/translate.*?\)/g, ""));
      } else
        d.style.left = "".concat(l.x, "px"), d.style.top = "".concat(l.y, "px");
      return d;
    }, oi = function(d) {
      for (var l = d.subscribe, r = d.publish, g = d.Interaction, c = d.SelectedSet, w = {
        "Selected:added": [{
          name: "elementselect"
        }],
        "Selected:removed": [{
          name: "elementunselect"
        }],
        "Area:scroll": [{
          name: "autoscroll"
        }],
        "Interaction:start": [{
          name: "dragstart"
        }],
        "Interaction:update": [{
          name: "dragmove",
          condition: function(O) {
            return O.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, _ = function() {
        var O = U($[S], 2), V = O[0], K = O[1];
        ["pre", !1].forEach(function(ie) {
          return l(ie ? "".concat(V, ":").concat(ie) : V, function(pe) {
            return K.forEach(function(oe) {
              return (!oe.condition || oe.condition(pe)) && r(ie ? "".concat(ie).concat(oe.name) : oe.name, f({
                items: c.elements,
                isDragging: g.isDragging
              }, pe));
            });
          });
        });
      }, S = 0, $ = Object.entries(w); S < $.length; S++)
        _();
    }, Ve = function(d) {
      return d ? !Array.isArray(d) && (d instanceof HTMLElement || d instanceof SVGElement) ? [d] : F(d) : [];
    }, Ft = function(d, l) {
      d.style.left = "".concat(l.left, "px"), d.style.top = "".concat(l.top, "px"), d.style.width = "".concat(l.width, "px"), d.style.height = "".concat(l.height, "px");
    }, ni = /* @__PURE__ */ function() {
      function d(l) {
        var r = this, g = l.area, c = l.PS, w = l.zoom;
        t(this, d), a(this, "_modificationCallback", void 0), a(this, "_modificationObserver", void 0), a(this, "_zoom", void 0), a(this, "_node", void 0), a(this, "_parentNodes", void 0), a(this, "_computedStyle", void 0), a(this, "_computedBorder", void 0), a(this, "_rect", void 0), a(this, "setArea", function(_) {
          r._node = _, Wt({
            computedStyle: r.computedStyle,
            node: r._node
          }), setTimeout(function() {
            r.PubSub.publish("Area:modified:pre", {
              item: r
            }), r.reset(), r.PubSub.publish("Area:modified", {
              item: r
            });
          });
        }), a(this, "start", function() {
          Xe(r.parentNodes, r._modificationCallback, r._modificationObserver);
        }), a(this, "reset", function() {
          r._computedStyle = void 0, r._rect = void 0, r._computedBorder = void 0, r._parentNodes = void 0;
        }), a(this, "stop", function() {
          ii(r._modificationObserver, r._modificationCallback), r.reset();
        }), a(this, "scroll", function(_, S) {
          var $ = {
            scroll_directions: _,
            scroll_multiplier: S
          };
          r.PubSub.publish("Area:scroll:pre", $), ai(r._node, _, S), r.PubSub.publish("Area:scroll", $);
        }), this._zoom = w, this.PubSub = c, this.setArea(g), this._modificationCallback = nt(function(_) {
          r.PubSub.publish("Area:modified:pre", {
            event: _,
            item: r
          }), r.reset(), r.PubSub.publish("Area:modified", {
            event: _,
            item: r
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return n(d, [{
        key: "HTMLNode",
        get: function() {
          return this._node;
        }
      }, {
        key: "computedBorder",
        get: function() {
          return this._computedBorder ? this._computedBorder : {
            top: parseInt(this.computedStyle.borderTopWidth),
            bottom: parseInt(this.computedStyle.borderBottomWidth),
            left: parseInt(this.computedStyle.borderLeftWidth),
            right: parseInt(this.computedStyle.borderRightWidth)
          };
        }
      }, {
        key: "computedStyle",
        get: function() {
          return this._computedStyle ? this._computedStyle : this.HTMLNode instanceof HTMLDocument ? this._computedStyle = window.getComputedStyle(this.HTMLNode.body || this.HTMLNode.documentElement) : this._computedStyle = window.getComputedStyle(this.HTMLNode);
        }
      }, {
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = wt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var r = function g(c) {
            var w, _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, S = (w = c[_]) === null || w === void 0 ? void 0 : w.parentNode;
            return S ? (c.push(S), _++, g(c, _)) : c;
          };
          return this._parentNodes = r([this.HTMLNode]), this._parentNodes;
        }
      }]), d;
    }(), si = /* @__PURE__ */ function() {
      function d(l) {
        var r = this, g = l.DS, c = l.dragKeys, w = l.draggability, _ = l.keyboardDrag, S = l.keyboardDragSpeed, $ = l.useTransform, P = l.zoom;
        t(this, d), a(this, "_useTransform", void 0), a(this, "_prevCursorPos", void 0), a(this, "_prevScrollPos", void 0), a(this, "_elements", []), a(this, "_draggability", void 0), a(this, "_dragKeys", void 0), a(this, "_dragKeysFlat", void 0), a(this, "_keyboardDrag", void 0), a(this, "_keyboardDragSpeed", void 0), a(this, "_zoom", void 0), a(this, "keyboardDrag", function(O) {
          var V = O.event, K = O.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability || r.DS.continue)) {
            var ie = {
              event: V,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:start:pre", "Interaction:start"], ie), r._elements = r.DS.getSelection(), r.handleZIndex(!0);
            var pe = ei({
              shiftKey: r.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: r._keyboardDragSpeed,
              zoom: r._zoom,
              key: K,
              scrollCallback: r.DS.Area.scroll,
              scrollDiff: r._scrollDiff,
              canScroll: r.DS.stores.ScrollStore.canScroll,
              dragKeys: r._dragKeys
            });
            r._elements.forEach(function(oe) {
              return Xt({
                element: oe,
                posDirection: pe,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], ie);
          }
        }), a(this, "keyboardEnd", function(O) {
          var V = O.event, K = O.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability)) {
            var ie = {
              event: V,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], ie);
          }
        }), a(this, "start", function(O) {
          var V = O.isDragging, K = O.isDraggingKeyboard;
          !V || K || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), a(this, "stop", function(O) {
          O != null && O.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), a(this, "update", function(O) {
          var V = O.isDragging, K = O.isDraggingKeyboard;
          if (!(!V || !r._elements.length || K || r.DS.continue)) {
            var ie = W(r._cursorDiff, "+", r._scrollDiff);
            r._elements.forEach(function(pe) {
              return Xt({
                element: pe,
                posDirection: ie,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            });
          }
        }), a(this, "handleZIndex", function(O) {
          r._elements.forEach(function(V) {
            return V.style.zIndex = "".concat((parseInt(V.style.zIndex) || 0) + O ? 9999 : -9998);
          });
        }), this.DS = g, this._useTransform = $, this._keyboardDragSpeed = S, this._keyboardDrag = _, this._zoom = P, this._draggability = w, this._dragKeys = {
          up: c.up.map(function(O) {
            return O.toLowerCase();
          }),
          down: c.down.map(function(O) {
            return O.toLowerCase();
          }),
          left: c.left.map(function(O) {
            return O.toLowerCase();
          }),
          right: c.right.map(function(O) {
            return O.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(F(this._dragKeys.up), F(this._dragKeys.down), F(this._dragKeys.left), F(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return n(d, [{
        key: "_cursorDiff",
        get: function() {
          var r = this.DS.stores.PointerStore.currentVal, g = this._prevCursorPos ? W(r, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = r, g;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var r = this.DS.stores.ScrollStore.currentVal, g = this._prevScrollPos ? W(r, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = r, g;
        }
      }]), d;
    }(), li = /* @__PURE__ */ function() {
      function d(l) {
        var r = this, g = l.DS, c = l.areaElement, w = l.draggability, _ = l.immediateDrag, S = l.selectableClass;
        t(this, d), a(this, "_areaElement", void 0), a(this, "_draggability", void 0), a(this, "_immediateDrag", void 0), a(this, "_selectableClass", void 0), a(this, "isInteracting", void 0), a(this, "isDragging", void 0), a(this, "init", function() {
          return r.DS.publish("Interaction:init:pre", {});
        }), a(this, "_init", function() {
          r.stop(), r._areaElement.addEventListener("mousedown", r.start), r._areaElement.addEventListener("touchstart", r.start, {
            passive: !1
          }), r.DS.publish("Interaction:init", {});
        }), a(this, "start", function($) {
          return r.DS.publish("Interaction:start:pre", {
            event: $,
            isDragging: r.isDragging
          });
        }), a(this, "_start", function($) {
          $.type === "touchstart" && $.preventDefault(), r._canInteract($) && (r.isInteracting = !0, r.isDragging = r.isDragEvent($), r.DS.publish("Interaction:start", {
            event: $,
            isDragging: r.isDragging
          }), document.addEventListener("mouseup", r.reset), document.addEventListener("touchend", r.reset));
        }), a(this, "isDragEvent", function($) {
          var P = $.target.closest(".".concat(r._selectableClass));
          return !r._draggability || r.DS.stores.KeyStore.isMultiSelectKeyPressed($) || !P ? !1 : (r._immediateDrag && (r.DS.SelectedSet.size ? r.DS.SelectedSet.has(P) || (r.DS.SelectedSet.clear(), r.DS.SelectedSet.add(
            P
          )) : r.DS.SelectedSet.add(
            P
          )), !!r.DS.SelectedSet.has(P));
        }), a(this, "onClick", function($) {
          var P = $.event;
          if (!!r._canInteract(P) && !(P.detail > 0)) {
            var O = r.DS, V = O.stores, K = V.PointerStore, ie = V.KeyStore, pe = O.SelectableSet, oe = O.SelectedSet;
            K.start(P);
            var ze = P.target;
            !pe.has(ze) || (ie.isMultiSelectKeyPressed(P) || oe.clear(), oe.toggle(ze), r.reset());
          }
        }), a(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), a(this, "update", function($) {
          var P = $.event, O = $.scroll_directions, V = $.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: P,
            scroll_directions: O,
            scroll_multiplier: V,
            isDragging: r.isDragging
          });
        }), a(this, "reset", function($) {
          return r.DS.publish("Interaction:end:pre", {
            event: $,
            isDragging: r.isDragging
          });
        }), a(this, "_reset", function($) {
          var P = r.isDragging;
          r.stop(), r.init(), r.DS.publish("Interaction:end", {
            event: $,
            isDragging: P
          });
        }), this._areaElement = c, this._draggability = w, this._immediateDrag = _, this._selectableClass = S, this.DS = g, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function($) {
          var P = $.event;
          return r.start(P);
        }), this.DS.subscribe("Interaction:start:pre", function($) {
          var P = $.event;
          return r._start(P);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function($) {
          var P = $.event;
          return r._reset(P);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return n(d, [{
        key: "_canInteract",
        value: function(r) {
          var g = r.clientX === 0 && r.clientY === 0 && r.detail === 0 && r.target;
          return !(r.button === 2 || this.isInteracting || r.target && !this.DS.SelectorArea.isInside(
            r.target
          ) || !g && !this.DS.SelectorArea.isClicked(r));
        }
      }]), d;
    }(), ci = function d(l) {
      var r = this, g = l.DS;
      t(this, d), a(this, "subscribers", {}), a(this, "subscribe", function(c, w) {
        return Array.isArray(r.subscribers[c]) || (r.subscribers[c] = []), r.subscribers[c].push(w), r.subscribers[c].length - 1;
      }), a(this, "unsubscribe", function(c, w, _) {
        _ >= 0 ? r.subscribers[c].splice(_, 1) : w && (r.subscribers[c] = r.subscribers[c].filter(function(S) {
          return S !== w;
        }));
      }), a(this, "publish", function(c, w) {
        Array.isArray(c) ? c.forEach(function(_) {
          return r._publish(_, w);
        }) : r._publish(c, w);
      }), a(this, "_publish", function(c, w) {
        var _ = r.subscribers[c];
        !Array.isArray(_) || (c.includes(":pre") ? r._handlePrePublish(_, w) : r._handlePublish(_, w));
      }), a(this, "_handlePublish", function(c, w) {
        for (var _ = 0, S = c.length; _ < S; _++) {
          if (r.DS.stopped)
            return;
          c[_](w);
        }
      }), a(this, "_handlePrePublish", function(c, w) {
        for (var _ = c.length; _--; ) {
          if (r.DS.stopped)
            return;
          c[_](w);
        }
      }), this.DS = g;
    }, ui = /* @__PURE__ */ function(d) {
      m(r, d);
      var l = Y(r);
      function r(g) {
        var c, w = g.elements, _ = g.className, S = g.hoverClassName, $ = g.draggability, P = g.useTransform, O = g.DS;
        return t(this, r), c = l.call(this), a(M(c), "_initElements", void 0), a(M(c), "_className", void 0), a(M(c), "_hoverClassName", void 0), a(M(c), "_useTransform", void 0), a(M(c), "_draggability", void 0), a(M(c), "init", function() {
          return c._initElements.forEach(function(V) {
            return c.add(V);
          });
        }), a(M(c), "clear", function() {
          return c.forEach(function(V) {
            return c.delete(V);
          });
        }), a(M(c), "_onClick", function(V) {
          return c.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: V
          });
        }), a(M(c), "_onPointer", function(V) {
          return c.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: V
          });
        }), a(M(c), "addAll", function(V) {
          return V.forEach(function(K) {
            return c.add(K);
          });
        }), a(M(c), "deleteAll", function(V) {
          return V.forEach(function(K) {
            return c.delete(K);
          });
        }), c.DS = O, c._initElements = Ve(w), c._className = _, c._hoverClassName = S, c._useTransform = P, c._draggability = $, c.DS.subscribe("Interaction:init", c.init), c;
      }
      return n(r, [{
        key: "add",
        value: function(c) {
          return c.classList.add(this._className), c.addEventListener("click", this._onClick), c.addEventListener("mousedown", this._onPointer), c.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Wt({
            computedStyle: window.getComputedStyle(c),
            node: c
          }), A(p(r.prototype), "add", this).call(this, c);
        }
      }, {
        key: "delete",
        value: function(c) {
          return c.classList.remove(this._className), c.classList.remove(this._hoverClassName), c.removeEventListener("click", this._onClick), c.removeEventListener("mousedown", this._onPointer), c.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), A(p(r.prototype), "delete", this).call(this, c);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ k(Set)), di = /* @__PURE__ */ function(d) {
      m(r, d);
      var l = Y(r);
      function r(g) {
        var c, w = g.className, _ = g.DS;
        return t(this, r), c = l.call(this), a(M(c), "_className", void 0), a(M(c), "clear", function() {
          return c.forEach(function(S) {
            return c.delete(S);
          });
        }), a(M(c), "addAll", function(S) {
          return S.forEach(function($) {
            return c.add($);
          });
        }), a(M(c), "deleteAll", function(S) {
          return S.forEach(function($) {
            return c.delete($);
          });
        }), c.DS = _, c._className = w, c;
      }
      return n(r, [{
        key: "add",
        value: function(c) {
          if (!A(p(r.prototype), "has", this).call(this, c)) {
            var w = {
              items: this.elements,
              item: c
            };
            return this.DS.publish("Selected:added:pre", w), A(p(r.prototype), "add", this).call(this, c), c.classList.add(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", w), this;
          }
        }
      }, {
        key: "delete",
        value: function(c) {
          if (!!A(p(r.prototype), "has", this).call(this, c)) {
            var w = {
              items: this.elements,
              item: c
            };
            this.DS.publish("Selected:removed:pre", w);
            var _ = A(p(r.prototype), "delete", this).call(this, c);
            return c.classList.remove(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", w), _;
          }
        }
      }, {
        key: "toggle",
        value: function(c) {
          return this.has(c) ? this.delete(c) : this.add(c), c;
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ k(Set)), hi = /* @__PURE__ */ function() {
      function d(l) {
        var r = this, g = l.DS, c = l.hoverClassName, w = l.multiSelectToggling;
        t(this, d), a(this, "_prevSelectedSet", void 0), a(this, "_hoverClassName", void 0), a(this, "_multiSelectToggling", void 0), a(this, "start", function(_) {
          var S = _.event, $ = _.isDragging;
          $ || (r._storePrevious(S), r._handleInsideSelection(!0, S));
        }), a(this, "update", function(_) {
          var S = _.isDragging;
          S || r.DS.continue || r._handleInsideSelection();
        }), a(this, "_handleInsideSelection", function(_, S) {
          for (var $ = r.DS, P = $.SelectableSet, O = $.SelectorArea, V = $.Selector, K = P.elements.map(function(Me) {
            return [Me, Me.getBoundingClientRect()];
          }), ie = [], pe = [], oe = 0, ze = K.length; oe < ze; oe++)
            !O.isInside(K[oe][0], K[oe][1]) || (xt(K[oe][1], V.rect) ? ie.push(K[oe][0]) : pe.push(K[oe][0]));
          var st = r.DS.stores.KeyStore.isMultiSelectKeyPressed(S) && r._multiSelectToggling;
          r.DS.continue || (ie.forEach(function(Me) {
            return ti({
              element: Me,
              force: _,
              multiSelectionToggle: st,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName
            });
          }), pe.forEach(function(Me) {
            return ri({
              element: Me,
              force: _,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName,
              PrevSelectedSet: r._prevSelectedSet
            });
          }));
        }), this._hoverClassName = c, this._multiSelectToggling = w, this.DS = g, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return n(d, [{
        key: "_storePrevious",
        value: function(r) {
          var g = this.DS, c = g.stores.KeyStore, w = g.SelectedSet;
          c.isMultiSelectKeyPressed(r) ? this._prevSelectedSet = new Set(w) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), d;
    }(), fi = /* @__PURE__ */ function() {
      function d(l) {
        var r = this, g = l.DS, c = l.selector, w = l.selectorClass, _ = l.customStyles;
        t(this, d), a(this, "_rect", void 0), a(this, "start", function(S) {
          var $ = S.isDragging;
          if (!$) {
            var P = r.DS.stores.PointerStore, O = P.initialValArea;
            Ft(r.HTMLNode, ae(O, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), a(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), a(this, "update", function(S) {
          var $ = S.isDragging;
          if (!($ || r.DS.continue)) {
            var P = r.DS.stores, O = P.ScrollStore, V = P.PointerStore, K = qr({
              scrollAmount: O.scrollAmount,
              initialPointerPos: V.initialValArea,
              pointerPos: V.currentValArea
            });
            Ft(r.HTMLNode, K), r._rect = null;
          }
        }), this.DS = g, this.HTMLNode = c || ot(_), this.HTMLNode.classList.add(w), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return n(d, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), d;
    }(), mi = /* @__PURE__ */ function() {
      function d(l) {
        var r = this, g = l.DS, c = l.selectorAreaClass, w = l.autoScrollSpeed, _ = l.overflowTolerance;
        t(this, d), a(this, "_autoScrollSpeed", void 0), a(this, "_scrollInterval", void 0), a(this, "_rect", void 0), a(this, "currentEdges", []), a(this, "_overflowTolerance", void 0), a(this, "start", function() {
          return r.applyElements("append");
        }), a(this, "applyElements", function() {
          var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", $ = document.body ? "body" : "documentElement", P = "".concat(S, "Child");
          r.HTMLNode[P](r.DS.Selector.HTMLNode), document[$][P](r.HTMLNode);
        }), a(this, "updatePos", function() {
          r._rect = null;
          var S = r.DS.Area.rect, $ = r.DS.Area.computedBorder, P = r.HTMLNode.style, O = "".concat(S.top + $.top, "px"), V = "".concat(S.left + $.left, "px"), K = "".concat(S.width, "px"), ie = "".concat(S.height, "px");
          P.top !== O && (P.top = O), P.left !== V && (P.left = V), P.width !== K && (P.width = K), P.height !== ie && (P.height = ie);
        }), a(this, "stop", function(S) {
          r.stopAutoScroll(), S && r.applyElements("remove");
        }), a(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), a(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var S = r.DS, $ = S.stores.PointerStore, P = S.Area;
            r.currentEdges = Kt({
              elementRect: ae($.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && P.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), a(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), a(this, "isInside", function(S, $) {
          return r.DS.Area.HTMLNode.contains(S) && r.DS.stores.ScrollStore.canScroll ? !0 : xt(r.rect, $ || S.getBoundingClientRect());
        }), this._autoScrollSpeed = w, this._overflowTolerance = _, this.DS = g, this.HTMLNode = at(c), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          r.updatePos(), r.stopAutoScroll();
        });
      }
      return n(d, [{
        key: "isClicked",
        value: function(r) {
          var g = this.DS.stores.PointerStore, c = r ? g.getPointerPosition(r) : g.initialVal;
          return xt({
            left: c.x,
            top: c.y,
            right: c.x,
            bottom: c.y
          }, this.rect);
        }
      }, {
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), d;
    }(), pi = /* @__PURE__ */ function() {
      function d(l) {
        var r = this, g = l.DS, c = l.multiSelectKeys, w = l.multiSelectMode;
        t(this, d), a(this, "_multiSelectMode", void 0), a(this, "_multiSelectKeys", void 0), a(this, "_currentValues", /* @__PURE__ */ new Set()), a(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), a(this, "init", function() {
          document.addEventListener("keydown", r.keydown), document.addEventListener("keyup", r.keyup), window.addEventListener("blur", r.reset);
        }), a(this, "keydown", function(_) {
          var S = _.key.toLowerCase();
          r.DS.publish("KeyStore:down:pre", {
            event: _,
            key: S
          }), r._currentValues.add(S), r.DS.publish("KeyStore:down", {
            event: _,
            key: S
          });
        }), a(this, "keyup", function(_) {
          var S = _.key.toLowerCase();
          r.DS.publish("KeyStore:up:pre", {
            event: _,
            key: S
          }), r._currentValues.delete(S), r.DS.publish("KeyStore:up", {
            event: _,
            key: S
          });
        }), a(this, "stop", function() {
          document.removeEventListener("keydown", r.keydown), document.removeEventListener("keyup", r.reset), window.removeEventListener("blur", r.reset), r.reset();
        }), a(this, "reset", function() {
          return r._currentValues.clear();
        }), this.DS = g, this._multiSelectMode = w, this._multiSelectKeys = c.map(function(_) {
          var S = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, $ = S[_];
          return $ ? (console.warn("[DragSelect] ".concat(_, ' is deprecated. Use "').concat($, '" instead. Act Now!. See docs for more info')), $.toLowerCase()) : _.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return n(d, [{
        key: "isMultiSelectKeyPressed",
        value: function(r) {
          var g = this;
          return !!(this._multiSelectMode || this.currentValues.some(function(c) {
            return g._multiSelectKeys.includes(c);
          }) || r && this._multiSelectKeys.some(function(c) {
            return r[g._keyMapping[c]];
          }));
        }
      }, {
        key: "currentValues",
        get: function() {
          return Array.from(this._currentValues.values());
        }
      }]), d;
    }(), gi = /* @__PURE__ */ function() {
      function d(l) {
        var r = this, g = l.DS;
        t(this, d), a(this, "_isMouseInteraction", !1), a(this, "_initialValArea", void 0), a(this, "_currentValArea", void 0), a(this, "_lastValArea", void 0), a(this, "_initialVal", void 0), a(this, "_currentVal", void 0), a(this, "_lastVal", void 0), a(this, "_lastTouch", void 0), a(this, "init", function() {
          document.addEventListener("mousemove", r.update), document.addEventListener("touchmove", r.update, {
            passive: !1
          });
        }), a(this, "getPointerPosition", function(c) {
          return Fr({
            event: r._normalizedEvent(c)
          });
        }), a(this, "update", function(c) {
          !c || (r.DS.publish("PointerStore:updated:pre", {
            event: c
          }), r.currentVal = r.getPointerPosition(c), r._isMouseInteraction && r.DS.publish("PointerStore:updated", {
            event: c
          }));
        }), a(this, "stop", function() {
          document.removeEventListener("mousemove", r.update), document.removeEventListener("touchmove", r.update, {
            passive: !1
          }), setTimeout(function() {
            return r._isMouseInteraction = !1;
          }, 100);
        }), a(this, "reset", function(c) {
          !c || (r.currentVal = r.lastVal = r.getPointerPosition(c), r.stop(), r.init());
        }), this.DS = g, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(c) {
          var w = c.event;
          return r.start(w);
        }), this.DS.subscribe("Interaction:end", function(c) {
          var w = c.event;
          return r.reset(w);
        });
      }
      return n(d, [{
        key: "start",
        value: function(r) {
          !r || (this._isMouseInteraction = !0, this.currentVal = this.initialVal = this.getPointerPosition(r));
        }
      }, {
        key: "_normalizedEvent",
        value: function(r) {
          return "touches" in r && r.type !== "touchend" && (this._lastTouch = r), "touches" in r ? this._lastTouch.touches[0] : r;
        }
      }, {
        key: "initialValArea",
        get: function() {
          return this._initialValArea ? this._initialValArea : {
            x: 0,
            y: 0
          };
        }
      }, {
        key: "currentValArea",
        get: function() {
          return this._currentValArea ? this._currentValArea : {
            x: 0,
            y: 0
          };
        }
      }, {
        key: "lastValArea",
        get: function() {
          return this._lastValArea ? this._lastValArea : {
            x: 0,
            y: 0
          };
        }
      }, {
        key: "initialVal",
        get: function() {
          return this._initialVal ? this._initialVal : {
            x: 0,
            y: 0
          };
        },
        set: function(r) {
          this._initialVal = r, this._initialValArea = r && W(r, "-", W(H(this.DS.Area.rect), "+", H(this.DS.Area.computedBorder)));
        }
      }, {
        key: "currentVal",
        get: function() {
          return this._currentVal ? this._currentVal : {
            x: 0,
            y: 0
          };
        },
        set: function(r) {
          this._currentVal = r, this._currentValArea = r && W(r, "-", W(H(this.DS.Area.rect), "+", H(this.DS.Area.computedBorder)));
        }
      }, {
        key: "lastVal",
        get: function() {
          return this._lastVal ? this._lastVal : {
            x: 0,
            y: 0
          };
        },
        set: function(r) {
          this._lastVal = r, this._lastValArea = r && W(r, "-", W(H(this.DS.Area.rect), "+", H(this.DS.Area.computedBorder)));
        }
      }]), d;
    }(), vi = /* @__PURE__ */ function() {
      function d(l) {
        var r = this, g = l.DS, c = l.areaElement, w = l.zoom;
        t(this, d), a(this, "_initialVal", void 0), a(this, "_currentVal", void 0), a(this, "_areaElement", void 0), a(this, "_canScroll", void 0), a(this, "init", function() {
          return r._areaElement.addEventListener("scroll", r.update);
        }), a(this, "start", function() {
          r._currentVal = r._initialVal = je(r._areaElement), r._areaElement.addEventListener("scroll", r.update);
        }), a(this, "update", function() {
          return r._currentVal = je(r._areaElement);
        }), a(this, "stop", function() {
          r._areaElement.removeEventListener("scroll", r.update), r._initialVal = {
            x: 0,
            y: 0
          }, r._canScroll = null;
        }), a(this, "reset", function() {
          r.stop(), r.start();
        }), this._areaElement = c, this.DS = g, this.zoom = w, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return r.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return r.reset();
        });
      }
      return n(d, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = Fe(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var r = W(this.currentVal, "-", this.initialVal), g = Q(this.zoom), c = W(W(r, "*", g), "-", r);
          return {
            x: r.x + c.x,
            y: r.y + c.y
          };
        }
      }, {
        key: "initialVal",
        get: function() {
          return this._initialVal ? this._initialVal : {
            x: 0,
            y: 0
          };
        }
      }, {
        key: "currentVal",
        get: function() {
          return this._currentVal || (this._currentVal = je(this._areaElement)), this._currentVal;
        }
      }]), d;
    }(), bi = /* @__PURE__ */ function() {
      function d(l) {
        var r = this, g = l.area, c = g === void 0 ? document : g, w = l.selectables, _ = w === void 0 ? [] : w, S = l.autoScrollSpeed, $ = S === void 0 ? 5 : S, P = l.overflowTolerance, O = P === void 0 ? {
          x: 25,
          y: 25
        } : P, V = l.zoom, K = V === void 0 ? 1 : V, ie = l.customStyles, pe = ie === void 0 ? !1 : ie, oe = l.multiSelectMode, ze = oe === void 0 ? !1 : oe, st = l.multiSelectToggling, Me = st === void 0 ? !0 : st, qt = l.multiSelectKeys, yi = qt === void 0 ? ["Control", "Shift", "Meta"] : qt, Gt = l.selector, wi = Gt === void 0 ? void 0 : Gt, Jt = l.draggability, _t = Jt === void 0 ? !0 : Jt, Zt = l.immediateDrag, xi = Zt === void 0 ? !0 : Zt, Qt = l.keyboardDrag, _i = Qt === void 0 ? !0 : Qt, ki = l.dragKeys, er = l.keyboardDragSpeed, Si = er === void 0 ? 10 : er, tr = l.useTransform, rr = tr === void 0 ? !0 : tr, ir = l.hoverClass, ar = ir === void 0 ? "ds-hover" : ir, or = l.selectableClass, nr = or === void 0 ? "ds-selectable" : or, sr = l.selectedClass, Di = sr === void 0 ? "ds-selected" : sr, lr = l.selectorClass, Ci = lr === void 0 ? "ds-selector" : lr, cr = l.selectorAreaClass, Mi = cr === void 0 ? "ds-selector-area" : cr, $i = l.callback, Ei = l.onDragMove, Ti = l.onDragStartBegin, Ai = l.onDragStart, Oi = l.onElementSelect, Pi = l.onElementUnselect;
        t(this, d), a(this, "continue", !1), a(this, "start", function() {
          r.stopped = !1, r.Interaction.init();
        }), a(this, "break", function() {
          return r.continue = !0;
        }), a(this, "getSelection", function() {
          return r.SelectedSet.elements;
        }), a(this, "getSelectables", function() {
          return r.SelectableSet.elements;
        }), a(this, "getInitialCursorPosition", function() {
          return r.stores.PointerStore.initialVal;
        }), a(this, "getCurrentCursorPosition", function() {
          return r.stores.PointerStore.currentVal;
        }), a(this, "getPreviousCursorPosition", function() {
          return r.stores.PointerStore.lastVal;
        }), a(this, "getInitialCursorPositionArea", function() {
          return r.stores.PointerStore.initialValArea;
        }), a(this, "getCurrentCursorPositionArea", function() {
          return r.stores.PointerStore.currentValArea;
        }), a(this, "getPreviousCursorPositionArea", function() {
          return r.stores.PointerStore.lastValArea;
        }), a(this, "isMultiSelect", function(Ii) {
          return r.stores.KeyStore.isMultiSelectKeyPressed(Ii);
        }), a(this, "isDragging", function() {
          return r.Interaction.isDragging;
        }), this.PubSub = new ci({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: $i,
          onDragMove: Ei,
          onDragStart: Ai,
          onDragStartBegin: Ti,
          onElementSelect: Oi,
          onElementUnselect: Pi
        }), this.stores = {
          PointerStore: new gi({
            DS: this
          }),
          ScrollStore: new vi({
            DS: this,
            areaElement: c,
            zoom: K
          }),
          KeyStore: new pi({
            DS: this,
            multiSelectKeys: yi,
            multiSelectMode: ze
          })
        }, this.Area = new ni({
          area: c,
          PS: this.PubSub,
          zoom: K
        }), this.Selector = new fi({
          DS: this,
          selector: wi,
          selectorClass: Ci,
          customStyles: pe
        }), this.SelectorArea = new mi({
          DS: this,
          selectorAreaClass: Mi,
          autoScrollSpeed: $,
          overflowTolerance: O
        }), this.SelectableSet = new ui({
          elements: _,
          DS: this,
          className: nr,
          hoverClassName: ar,
          useTransform: rr,
          draggability: _t
        }), this.SelectedSet = new di({
          DS: this,
          className: Di
        }), this.Selection = new hi({
          DS: this,
          hoverClassName: ar,
          multiSelectToggling: Me
        }), this.Drag = new si({
          DS: this,
          draggability: _t,
          useTransform: rr,
          keyboardDrag: _i,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, ki),
          zoom: K,
          keyboardDragSpeed: Si
        }), this.Interaction = new li({
          areaElement: c,
          DS: this,
          draggability: _t,
          immediateDrag: xi,
          selectableClass: nr
        }), oi({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return r.continue = !1;
        }), this.start();
      }
      return n(d, [{
        key: "_callbacksTemp",
        value: function(r) {
          var g = r.callback, c = r.onDragMove, w = r.onDragStart, _ = r.onDragStartBegin, S = r.onElementSelect, $ = r.onElementUnselect, P = function(V, K) {
            return console.warn("[DragSelect] ".concat(V, ' is deprecated. Use DragSelect.subscribe("').concat(K, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          g && (P("callback", "callback"), this.subscribe("callback", function(O) {
            var V = O.items;
            O.item;
            var K = O.event;
            return g(V, K);
          })), c && (P("onDragMove", "dragmove"), this.subscribe("dragmove", function(O) {
            O.items, O.item;
            var V = O.event;
            return c(V);
          })), w && (P("onDragStart", "dragstart"), this.subscribe("dragstart", function(O) {
            O.items, O.item;
            var V = O.event;
            return w(V);
          })), _ && (P("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(O) {
            O.items, O.item;
            var V = O.event;
            return _(V);
          })), S && (P("onElementSelect", "elementselect"), this.subscribe("elementselect", function(O) {
            O.items;
            var V = O.item, K = O.event;
            return S(V, K);
          })), $ && (P("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(O) {
            O.items;
            var V = O.item, K = O.event;
            return $(V, K);
          }));
        }
      }, {
        key: "stop",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          c && this.publish("callback", {
            items: this.getSelection()
          }), this.Interaction.stop(), this.Area.stop(), this.Drag.stop(), this.Selector.stop(), this.SelectorArea.stop(r), this.stores.KeyStore.stop(), this.stores.PointerStore.stop(), this.stores.ScrollStore.stop(), r && this.SelectableSet.clear(), g && this.SelectedSet.clear(), this.stopped = !0;
        }
      }, {
        key: "addSelection",
        value: function(r) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.addAll(Ve(r)), c || this.addSelectables(r), g && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(r) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(Ve(r)), c && this.removeSelectables(r), g && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(r) {
          var g = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, w = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return Ve(r).forEach(function(_) {
            return g.SelectedSet.has(_) ? g.removeSelection(r, c, w) : g.addSelection(r, c, w);
          }), c && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "setSelection",
        value: function(r) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.clearSelection(), this.addSelection(r, g, c), this.getSelection();
        }
      }, {
        key: "clearSelection",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
          return this.SelectedSet.clear(), r && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "addSelectables",
        value: function(r) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = Ve(r);
          return this.SelectableSet.addAll(c), g && this.SelectedSet.addAll(c), r;
        }
      }, {
        key: "setSelectables",
        value: function(r) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.removeSelectables(r, g), this.addSelectables(r, c);
        }
      }, {
        key: "removeSelectables",
        value: function(r) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return this.SelectableSet.deleteAll(Ve(r)), g && this.removeSelection(r), r;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var c = g ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), w = r ? g ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : g ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return W(c, "-", w);
        }
      }]), d;
    }();
    return bi;
  });
})(Tr);
const Aa = Tr.exports, Ar = (o, e, t, i, n) => (e = Math, t = e.log, i = 1024, n = t(o) / t(i) | 0, o / e.pow(i, n)).toFixed(0) + " " + (n ? "KMGTPEZY"[--n] + "iB" : "B"), Or = (o, e = null) => {
  var t;
  return new Date(o * 1e3).toLocaleString((t = e != null ? e : navigator.language) != null ? t : "en-US");
}, Oa = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Pa = /* @__PURE__ */ u("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Ia = [
  Pa
], La = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Na = /* @__PURE__ */ u("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), ja = [
  Na
], Va = {
  name: "VFSortIcon"
}, ct = /* @__PURE__ */ Object.assign(Va, {
  props: { direction: String },
  setup(o) {
    return (e, t) => (y(), D("div", null, [
      o.direction == "down" ? (y(), D("svg", Oa, Ia)) : G("", !0),
      o.direction == "up" ? (y(), D("svg", La, ja)) : G("", !0)
    ]));
  }
}), za = ["onClick"], Ba = {
  name: "VFToast.vue"
}, Ra = /* @__PURE__ */ Object.assign(Ba, {
  setup(o) {
    const e = z("emitter"), { getStore: t } = z("storage"), i = I(t("full-screen", !1)), n = (m) => m == "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", a = I([]), s = (m) => {
      a.value.splice(m, 1);
    }, f = (m) => {
      let p = a.value.findIndex((h) => h.id === m);
      p !== -1 && s(p);
    };
    return e.on("vf-toast-clear", () => {
      a.value = [];
    }), e.on("vf-toast-push", (m) => {
      let p = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      m.id = p, a.value.push(m), setTimeout(() => {
        f(p);
      }, 5e3);
    }), (m, p) => (y(), D("div", {
      class: de([i.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      we(Li, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: J(() => [
          (y(!0), D(ce, null, be(a.value, (h, v) => (y(), D("div", {
            onClick: (b) => s(v),
            key: h,
            class: de([n(h.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, E(h.label), 11, za))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Le = (o) => Object.entries(o).map((e) => e.map(encodeURIComponent).join("=")).join("&"), { apiUrl: Ha } = Se(), Et = (o, e) => Ha.value + "?" + Le({ q: "preview", adapter: o, path: e }), Ua = { class: "relative flex-auto flex flex-col overflow-hidden" }, Ka = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 border-gray-200 dark:border-gray-700 text-xs select-none"
}, Ya = { class: "absolute" }, Wa = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), Xa = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Fa = ["onDblclick", "onContextmenu", "data-type", "data-item", "data-index"], qa = { class: "grid grid-cols-12 items-center" }, Ga = { class: "flex col-span-7 items-center" }, Ja = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Za = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Qa = [
  Za
], eo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, to = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ro = [
  to
], io = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, ao = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, oo = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], no = { class: "grid grid-cols-12 items-center" }, so = { class: "flex col-span-7 items-center" }, lo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, co = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), uo = [
  co
], ho = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fo = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), mo = [
  fo
], po = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, go = { class: "col-span-2 text-center" }, vo = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, bo = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], yo = { class: "relative" }, wo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xo = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), _o = [
  xo
], ko = ["src"], So = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Do = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Co = [
  Do
], Mo = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, $o = { class: "break-all" }, Eo = {
  name: "VFExplorer"
}, To = /* @__PURE__ */ Object.assign(Eo, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(o) {
    const e = o, t = z("emitter"), { setStore: i, getStore: n } = z("storage"), a = (L) => L == null ? void 0 : L.substring(0, 3), s = (L) => L.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), f = I(null), m = I(null), p = I(0), h = I(null), { t: v } = z("i18n"), b = Math.floor(Math.random() * 2 ** 32), T = I(n("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      T.value = !T.value, i("full-screen", T.value);
    });
    const k = I("");
    t.on("vf-search-query", ({ newQuery: L }) => {
      k.value = L, L ? t.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.data.adapter,
          path: e.data.dirname,
          filter: L
        },
        onSuccess: (B) => {
          B.files.length || t.emit("vf-toast-push", { label: v("No search result found.") });
        }
      }) : t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
    });
    let M = null;
    const N = () => {
      M && clearTimeout(M);
    }, Y = (L) => {
      M = setTimeout(() => {
        const B = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: L.target.getBoundingClientRect().x,
          clientY: L.target.getBoundingClientRect().y
        });
        L.target.dispatchEvent(B);
      }, 500);
    }, R = (L) => {
      L.type == "dir" ? (t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: L.path } })) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: L });
    }, A = ft({ active: !1, column: "", order: "" }), U = (L = !0) => {
      let B = [...e.data.files], j = A.column, W = A.order == "asc" ? 1 : -1;
      if (!L)
        return B;
      const H = (ae, Q) => typeof ae == "string" && typeof Q == "string" ? ae.toLowerCase().localeCompare(Q.toLowerCase()) : ae < Q ? -1 : ae > Q ? 1 : 0;
      return A.active && (B = B.slice().sort((ae, Q) => H(ae[j], Q[j]) * W)), B;
    }, F = (L) => {
      A.active && A.column == L ? (A.active = A.order == "asc", A.column = L, A.order = "desc") : (A.active = !0, A.column = L, A.order = "asc");
    }, C = () => h.value.getSelection().map((L) => JSON.parse(L.dataset.item)), q = (L, B) => {
      if (L.altKey || L.ctrlKey || L.metaKey)
        return L.preventDefault(), !1;
      L.dataTransfer.setDragImage(m.value, 0, 15), L.dataTransfer.effectAllowed = "all", L.dataTransfer.dropEffect = "copy", L.dataTransfer.setData("items", JSON.stringify(C()));
    }, ee = (L, B) => {
      L.preventDefault();
      let j = JSON.parse(L.dataTransfer.getData("items"));
      if (j.find((W) => W.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: j, to: B } });
    }, ue = (L, B) => {
      L.preventDefault(), !B || B.type !== "dir" || h.value.getSelection().find((j) => j == L.currentTarget) ? (L.dataTransfer.dropEffect = "none", L.dataTransfer.effectAllowed = "none") : L.dataTransfer.dropEffect = "copy";
    };
    return xe(() => {
      h.value = new Aa({
        area: f.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => bt(() => {
        h.value.clearSelection(), h.value.setSelectables(document.getElementsByClassName("vf-item-" + b));
      })), h.value.subscribe("predragstart", ({ event: L, isDragging: B }) => {
        if (B)
          p.value = h.value.getSelection().length, h.value.break();
        else {
          const j = L.target.offsetWidth - L.offsetX, W = L.target.offsetHeight - L.offsetY;
          j < 15 && W < 15 && (h.value.clearSelection(), h.value.break());
        }
      }), h.value.subscribe("predragmove", ({ isDragging: L }) => {
        L && h.value.break();
      }), h.value.subscribe("callback", ({ items: L, event: B, isDragging: j }) => {
        t.emit("vf-nodes-selected", C()), p.value = h.value.getSelection().length;
      });
    }), Ni(() => {
      h.value.setSelection(h.value.getSelection());
    }), xe(() => {
      vt(() => e.view, () => t.emit("vf-explorer-update"));
    }), (L, B) => (y(), D("div", Ua, [
      o.view == "list" || k.value.length ? (y(), D("div", Ka, [
        u("div", {
          onClick: B[0] || (B[0] = (j) => F("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          se(E(x(v)("Name")) + " ", 1),
          ve(we(ct, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [lt, A.active && A.column == "basename"]
          ])
        ]),
        k.value.length ? G("", !0) : (y(), D("div", {
          key: 0,
          onClick: B[1] || (B[1] = (j) => F("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          se(E(x(v)("Size")) + " ", 1),
          ve(we(ct, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [lt, A.active && A.column == "file_size"]
          ])
        ])),
        k.value.length ? G("", !0) : (y(), D("div", {
          key: 1,
          onClick: B[2] || (B[2] = (j) => F("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          se(E(x(v)("Date")) + " ", 1),
          ve(we(ct, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [lt, A.active && A.column == "last_modified"]
          ])
        ])),
        k.value.length ? (y(), D("div", {
          key: 2,
          onClick: B[3] || (B[3] = (j) => F("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          se(E(x(v)("Filepath")) + " ", 1),
          ve(we(ct, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [lt, A.active && A.column == "path"]
          ])
        ])) : G("", !0)
      ])) : G("", !0),
      u("div", Ya, [
        u("div", {
          ref_key: "dragImage",
          ref: m,
          class: "absolute -z-50 -top-96"
        }, [
          Wa,
          u("div", Xa, E(p.value), 1)
        ], 512)
      ]),
      u("div", {
        onContextmenu: B[10] || (B[10] = Pe((j) => x(t).emit("vf-contextmenu-show", { event: j, area: f.value, items: C() }), ["self", "prevent"])),
        class: de([T.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: f
      }, [
        k.value.length ? (y(!0), D(ce, { key: 0 }, be(U(), (j, W) => (y(), D("div", {
          onDblclick: (H) => R(j),
          onTouchstart: B[4] || (B[4] = (H) => Y(H)),
          onTouchend: B[5] || (B[5] = (H) => N()),
          onContextmenu: Pe((H) => x(t).emit("vf-contextmenu-show", { event: H, area: f.value, items: C(), target: j }), ["prevent"]),
          class: de(["vf-item-" + x(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": j.type,
          "data-item": JSON.stringify(j),
          "data-index": W
        }, [
          u("div", qa, [
            u("div", Ga, [
              j.type == "dir" ? (y(), D("svg", Ja, Qa)) : (y(), D("svg", eo, ro)),
              u("span", io, E(j.basename), 1)
            ]),
            u("div", ao, E(j.path), 1)
          ])
        ], 42, Fa))), 256)) : G("", !0),
        o.view == "list" && !k.value.length ? (y(!0), D(ce, { key: 1 }, be(U(), (j, W) => (y(), D("div", {
          draggable: "true",
          onDblclick: (H) => R(j),
          onTouchstart: B[6] || (B[6] = (H) => Y(H)),
          onTouchend: B[7] || (B[7] = (H) => N()),
          onContextmenu: Pe((H) => x(t).emit("vf-contextmenu-show", { event: H, area: f.value, items: C(), target: j }), ["prevent"]),
          onDragstart: (H) => q(H),
          onDragover: (H) => ue(H, j),
          onDrop: (H) => ee(H, j),
          class: de(["vf-item-" + x(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": j.type,
          "data-item": JSON.stringify(j),
          "data-index": W
        }, [
          u("div", no, [
            u("div", so, [
              j.type == "dir" ? (y(), D("svg", lo, uo)) : (y(), D("svg", ho, mo)),
              u("span", po, E(j.basename), 1)
            ]),
            u("div", go, E(j.file_size ? x(Ar)(j.file_size) : ""), 1),
            u("div", vo, E(x(Or)(j.last_modified)), 1)
          ])
        ], 42, oo))), 256)) : G("", !0),
        o.view == "grid" && !k.value.length ? (y(!0), D(ce, { key: 2 }, be(U(!1), (j, W) => {
          var H, ae;
          return y(), D("div", {
            draggable: "true",
            onDblclick: (Q) => R(j),
            onTouchstart: B[8] || (B[8] = (Q) => Y(Q)),
            onTouchend: B[9] || (B[9] = (Q) => N()),
            onContextmenu: Pe((Q) => x(t).emit("vf-contextmenu-show", { event: Q, area: f.value, items: C(), target: j }), ["prevent"]),
            onDragstart: (Q) => q(Q),
            onDragover: (Q) => ue(Q, j),
            onDrop: (Q) => ee(Q, j),
            class: de(["vf-item-" + x(b), "border border-transparent hover:bg-neutral-50 m-1 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 text-center justify-center select-none"]),
            "data-type": j.type,
            "data-item": JSON.stringify(j),
            "data-index": W
          }, [
            u("div", null, [
              u("div", yo, [
                j.type == "dir" ? (y(), D("svg", wo, _o)) : ((H = j.mime_type) != null ? H : "").startsWith("image") ? (y(), D("img", {
                  key: 1,
                  class: "h-10 md:h-12 m-auto",
                  src: x(Et)(x(n)("adapter", e.data.adapter), j.path),
                  alt: ""
                }, null, 8, ko)) : (y(), D("svg", So, Co)),
                ((ae = j.mime_type) != null ? ae : "").startsWith("image") ? G("", !0) : (y(), D("div", Mo, E(a(j.extension)), 1))
              ]),
              u("span", $o, E(s(j.basename)), 1)
            ])
          ], 42, bo);
        }), 256)) : G("", !0)
      ], 34),
      we(Ra)
    ]));
  }
}), Ao = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Oo = { class: "flex leading-5 items-center" }, Po = ["aria-label"], Io = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
  })
], -1), Lo = [
  Io
], No = ["value"], jo = { class: "ml-3" }, Vo = { key: 0 }, zo = { class: "ml-1" }, Bo = { class: "flex leading-5 items-center" }, Ro = {
  value: "",
  disabled: ""
}, Ho = /* @__PURE__ */ u("option", { value: "tr" }, "Turkish", -1), Uo = /* @__PURE__ */ u("option", { value: "en" }, "English", -1), Ko = /* @__PURE__ */ u("option", { value: "fr" }, "French", -1), Yo = ["aria-label"], Wo = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), Xo = [
  Wo
], Fo = {
  name: "VFStatusbar"
}, qo = /* @__PURE__ */ Object.assign(Fo, {
  props: {
    data: Object
  },
  setup(o) {
    var b;
    const e = o, t = z("emitter"), { getStore: i, setStore: n } = z("storage"), a = I(0), s = I((b = i("adapter")) != null ? b : e.data.adapter), { t: f, changeLocale: m } = z("i18n"), p = I(i("locale", "")), h = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: s.value } }), n("adapter", s.value);
    };
    t.on("vf-nodes-selected", (T) => {
      a.value = T.length;
    });
    const v = I("");
    return t.on("vf-search-query", ({ newQuery: T }) => {
      v.value = T;
    }), (T, k) => (y(), D("div", Ao, [
      u("div", Oo, [
        u("div", {
          class: "mx-2",
          "aria-label": x(f)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, Lo, 8, Po),
        ve(u("select", {
          "onUpdate:modelValue": k[0] || (k[0] = (M) => s.value = M),
          onChange: h,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (y(!0), D(ce, null, be(o.data.storages, (M) => (y(), D("option", { value: M }, E(M), 9, No))), 256))
        ], 544), [
          [ur, s.value]
        ]),
        u("div", jo, [
          v.value.length ? (y(), D("span", Vo, E(o.data.files.length) + " items found. ", 1)) : G("", !0),
          u("span", zo, E(a.value > 0 ? a.value + " " + x(f)("item(s) selected.") : ""), 1)
        ])
      ]),
      u("div", Bo, [
        ve(u("select", {
          "onUpdate:modelValue": k[1] || (k[1] = (M) => p.value = M),
          onChange: k[2] || (k[2] = (M) => x(m)(M.target.value)),
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          u("option", Ro, E(x(f)("Language")), 1),
          Ho,
          Uo,
          Ko
        ], 544), [
          [ur, p.value]
        ]),
        u("span", {
          "aria-label": x(f)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: k[3] || (k[3] = (M) => x(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: x(f)("Vuefinder is a file manager component for vue 3.") }))
        }, Xo, 8, Yo)
      ])
    ]));
  }
}), Go = (o, e = 0, t = !1) => {
  let i;
  return (...n) => {
    t && !i && o(...n), clearTimeout(i), i = setTimeout(() => {
      o(...n);
    }, e);
  };
}, Jo = (o, e, t) => {
  const i = I(o);
  return ji((a, s) => ({
    get() {
      return a(), i.value;
    },
    set: Go(
      (f) => {
        i.value = f, s();
      },
      e,
      t
    )
  }));
}, Zo = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Qo = ["aria-label"], en = /* @__PURE__ */ u("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), tn = [
  en
], rn = ["aria-label"], an = /* @__PURE__ */ u("path", { d: "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" }, null, -1), on = [
  an
], nn = {
  key: 1,
  "aria-label": "Cancel",
  "data-microtip-position": "bottom-right",
  role: "tooltip"
}, sn = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), ln = [
  sn
], cn = ["onClick"], un = /* @__PURE__ */ u("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), dn = [
  un
], hn = { class: "flex leading-5" }, fn = /* @__PURE__ */ u("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), mn = ["title", "onClick"], pn = {
  key: 0,
  class: "animate-spin p-1 h-6 w-6 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, gn = /* @__PURE__ */ u("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), vn = /* @__PURE__ */ u("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), bn = [
  gn,
  vn
], yn = {
  key: 3,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, wn = /* @__PURE__ */ u("svg", {
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
  })
], -1), xn = ["onKeydown", "placeholder"], _n = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), kn = [
  _n
], Sn = {
  name: "VFBreadcrumb"
}, Dn = /* @__PURE__ */ Object.assign(Sn, {
  props: {
    data: Object
  },
  setup(o) {
    const e = o, t = z("emitter"), { getStore: i } = z("storage"), n = I(null), a = I([]), s = I(!1), f = I(null), { t: m } = z("i18n"), p = z("loadingState");
    t.on("vf-explorer-update", () => {
      var U;
      let R = [], A = [];
      n.value = (U = e.data.dirname) != null ? U : i("adapter", "local") + "://", n.value.length == 0 && (a.value = []), n.value.replace(i("adapter", "local") + "://", "").split("/").forEach(function(F) {
        R.push(F), R.join("/") != "" && A.push({
          basename: F,
          name: F,
          path: i("adapter", "local") + "://" + R.join("/"),
          type: "dir"
        });
      }), A.length > 4 && (A = A.slice(-5), A[0].name = ".."), a.value = A;
    });
    const h = () => {
      s.value = !1, b.value = "";
    };
    t.on("vf-search-exit", () => {
      h();
    });
    const v = () => {
      s.value = !0, bt(() => f.value.focus());
    }, b = Jo("", 400), T = () => p.value;
    vt(b, (R) => {
      t.emit("vf-toast-clear"), t.emit("vf-search-query", { newQuery: R });
    });
    const k = () => a.value.length && !s.value, M = (R) => {
      var U;
      R.preventDefault();
      let A = JSON.parse(R.dataTransfer.getData("items"));
      if (A.find((F) => F.storage != i("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: A, to: (U = a.value[a.value.length - 2]) != null ? U : { path: i("adapter", "local") + "://" } }
      });
    }, N = (R) => {
      R.preventDefault(), k() ? R.dataTransfer.dropEffect = "copy" : (R.dataTransfer.dropEffect = "none", R.dataTransfer.effectAllowed = "none");
    }, Y = () => {
      b.value == "" && h();
    };
    return (R, A) => (y(), D("div", Zo, [
      u("span", {
        "aria-label": x(m)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (y(), D("svg", {
          onDragover: A[0] || (A[0] = (U) => N(U)),
          onDrop: A[1] || (A[1] = (U) => M(U)),
          onClick: A[2] || (A[2] = (U) => {
            var F, C;
            return !k() || x(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter, path: (C = (F = a.value[a.value.length - 2]) == null ? void 0 : F.path) != null ? C : x(i)("adapter", "local") + "://" } });
          }),
          class: de(["h-6 w-6 p-0.5 rounded", k() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, tn, 34))
      ], 8, Qo),
      T() ? (y(), D("span", nn, [
        (y(), D("svg", {
          onClick: A[4] || (A[4] = (U) => x(t).emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, ln))
      ])) : (y(), D("span", {
        key: 0,
        "aria-label": x(m)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (y(), D("svg", {
          onClick: A[3] || (A[3] = (U) => {
            x(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter, path: o.data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, on))
      ], 8, rn)),
      s.value ? (y(), D("div", yn, [
        wn,
        ve(u("input", {
          ref_key: "searchInput",
          ref: f,
          onKeydown: Ye(h, ["esc"]),
          onBlur: Y,
          "onUpdate:modelValue": A[6] || (A[6] = (U) => Vi(b) ? b.value = U : null),
          placeholder: x(m)("Search anything.."),
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, xn), [
          [We, x(b)]
        ]),
        (y(), D("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: h,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, kn))
      ])) : (y(), D("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Pe(v, ["self"])
      }, [
        (y(), D("svg", {
          onClick: A[5] || (A[5] = (U) => x(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, dn)),
        u("div", hn, [
          (y(!0), D(ce, null, be(a.value, (U, F) => (y(), D("div", { key: F }, [
            fn,
            u("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: U.basename,
              onClick: (C) => x(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter, path: U.path } })
            }, E(U.name), 9, mn)
          ]))), 128))
        ]),
        T() ? (y(), D("svg", pn, bn)) : G("", !0)
      ], 8, cn))
    ]));
  }
}), Cn = ["onClick"], Mn = /* @__PURE__ */ u("span", { class: "px-1" }, null, -1), $n = {
  name: "VFContextMenu"
}, En = /* @__PURE__ */ Object.assign($n, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = z("emitter"), i = I(null), { apiUrl: n } = Se(), a = ft({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), s = I([]);
    t.on("vf-context-selected", (b) => {
      s.value = b;
    });
    const { t: f } = z("i18n"), m = {
      newfolder: {
        title: () => f("New Folder"),
        action: () => {
          t.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: () => f("Delete"),
        action: () => {
          t.emit("vf-modal-show", { type: "delete", items: s });
        }
      },
      refresh: {
        title: () => f("Refresh"),
        action: () => {
          t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
        }
      },
      preview: {
        title: () => f("Preview"),
        action: () => {
          t.emit("vf-modal-show", { type: "preview", adapter: e.current.adapter, item: s.value[0] });
        }
      },
      open: {
        title: () => f("Open"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: s.value[0].path } });
        }
      },
      openDir: {
        title: () => f("Open containing folder"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: s.value[0].dir } });
        }
      },
      download: {
        title: () => f("Download"),
        action: () => {
          const b = n.value + "?" + Le({ q: "download", adapter: e.current.adapter, path: s.value[0].path });
          t.emit("vf-download", b);
        }
      },
      archive: {
        title: () => f("Archive"),
        action: () => {
          t.emit("vf-modal-show", { type: "archive", items: s });
        }
      },
      unarchive: {
        title: () => f("Unarchive"),
        action: () => {
          t.emit("vf-modal-show", { type: "unarchive", items: s });
        }
      },
      rename: {
        title: () => f("Rename"),
        action: () => {
          t.emit("vf-modal-show", { type: "rename", items: s });
        }
      }
    }, p = (b) => {
      t.emit("vf-contextmenu-hide"), b.action();
    }, h = I("");
    t.on("vf-search-query", ({ newQuery: b }) => {
      h.value = b;
    }), t.on("vf-contextmenu-show", ({ event: b, area: T, items: k, target: M = null }) => {
      if (a.items = [], h.value)
        if (M)
          a.items.push(m.openDir), t.emit("vf-context-selected", [M]);
        else
          return;
      else
        !M && !h.value ? (a.items.push(m.refresh), a.items.push(m.newfolder), t.emit("vf-context-selected", [])) : k.length > 1 && k.some((N) => N.path === M.path) ? (a.items.push(m.refresh), a.items.push(m.archive), a.items.push(m.delete), t.emit("vf-context-selected", k)) : (M.type == "dir" ? a.items.push(m.open) : (a.items.push(m.preview), a.items.push(m.download)), a.items.push(m.rename), M.mime_type == "application/zip" ? a.items.push(m.unarchive) : a.items.push(m.archive), a.items.push(m.delete), t.emit("vf-context-selected", [M]));
      v(b, T);
    }), t.on("vf-contextmenu-hide", () => {
      a.active = !1;
    });
    const v = (b, T) => {
      a.active = !0, bt(() => {
        let k = T.getBoundingClientRect(), M = b.pageX, N = b.pageY, Y = i.value.offsetHeight, R = i.value.offsetWidth;
        M = k.right - b.pageX + window.scrollX < R ? M - R : M, N = k.bottom - b.pageY + window.scrollY < Y ? N - Y : N, a.positions = {
          left: M + "px",
          top: N + "px"
        };
      });
    };
    return (b, T) => a.active ? (y(), D("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: i,
      style: Er(a.positions)
    }, [
      (y(!0), D(ce, null, be(a.items, (k) => (y(), D("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: k.title,
        onClick: (M) => p(k)
      }, [
        Mn,
        u("span", null, E(k.title()), 1)
      ], 8, Cn))), 128))
    ], 4)) : G("", !0);
  }
}), Tn = (o, e) => {
  const t = o[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((i, n) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(n.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function An(o) {
  const e = await Tn(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en.4dabcb3e.js"), "../locales/tr.json": () => import("./tr.f45cbe8b.js") }), `../locales/${o}.json`);
  return JSON.parse(e.default);
}
function On(o, e, t) {
  const { getStore: i, setStore: n } = $t(o), a = ["en", "tr"], s = I({}), f = (h) => {
    a.includes(h) || (t.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), h = "en"), An(h).then((v) => {
      s.value = v, n("locale", h), n("translations", v), t.emit("vf-toast-push", { label: "The language is set to " + h });
    });
  };
  i("locale") ? s.value = i("translations") : f(e);
  const m = (h, ...v) => v.length ? m(h = h.replace("%s", v.shift()), ...v) : h;
  function p(h, ...v) {
    return s.value.hasOwnProperty(h) ? m(s.value[h], ...v) : h;
  }
  return { t: p, support_locales: a, changeLocale: f };
}
const Pn = /* @__PURE__ */ u("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), In = {
  name: "VueFinder"
}, Ln = /* @__PURE__ */ Object.assign(In, {
  props: {
    url: {
      type: [String]
    },
    id: {
      type: String,
      default: "vf"
    },
    dark: {
      type: Boolean,
      default: !1
    },
    locale: {
      type: String,
      default: "en"
    },
    maxHeight: {
      type: String,
      default: "600px"
    },
    postData: {
      type: Object,
      default: {}
    }
  },
  setup(o) {
    const e = o, t = Bi(), { setStore: i, getStore: n } = $t(e.id);
    Ge("emitter", t), Ge("storage", $t(e.id)), Ge("postData", e.postData);
    const a = On(e.id, e.locale, t);
    Ge("i18n", a);
    const { apiUrl: s, setApiUrl: f } = Se();
    f(e.url);
    const m = ft({ adapter: "local", storages: [], dirname: ".", files: [] }), p = I(n("viewport", "grid")), h = I(n("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      h.value = !h.value, i("darkMode", h.value);
    });
    const v = I(!1);
    Ge("loadingState", v);
    const b = I(n("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      b.value = !b.value, i("full-screen", b.value);
    }), t.on("vf-view-toggle", (N) => {
      p.value = N;
    });
    const T = ft({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      T.active = !1;
    }), t.on("vf-modal-show", (N) => {
      T.active = !0, T.type = N.type, T.data = N;
    });
    const k = (N) => {
      Object.assign(m, N), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update");
    };
    let M;
    return t.on("vf-fetch-abort", () => {
      M.abort(), v.value = !1;
    }), t.on("vf-fetch", ({ params: N, onSuccess: Y = null, onError: R = null }) => {
      ["index", "search"].includes(N.q) && (M && M.abort(), v.value = !0), M = new AbortController();
      const A = M.signal;
      pt(s.value, { params: N, signal: A }).then((U) => {
        ["index", "search"].includes(N.q) && (v.value = !1), t.emit("vf-modal-close"), k(U), Y(U);
      }).catch((U) => {
        R && R(U);
      }).finally(() => {
      });
    }), t.on("vf-download", (N) => {
      document.getElementById("download_frame").src = N, t.emit("vf-modal-close");
    }), xe(() => {
      t.emit("vf-fetch", { params: { q: "index", adapter: n("adapter", m.adapter) } });
    }), (N, Y) => (y(), D("div", {
      class: de(["vuefinder", h.value ? "dark" : ""])
    }, [
      u("div", {
        class: de([b.value ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        style: Er(b.value ? "" : "max-height: " + o.maxHeight),
        onMousedown: Y[0] || (Y[0] = (R) => x(t).emit("vf-contextmenu-hide")),
        onTouchstart: Y[1] || (Y[1] = (R) => x(t).emit("vf-contextmenu-hide"))
      }, [
        we(Ea, { data: m }, null, 8, ["data"]),
        we(Dn, { data: m }, null, 8, ["data"]),
        we(To, {
          view: p.value,
          data: m
        }, null, 8, ["view", "data"]),
        we(qo, { data: m }, null, 8, ["data"])
      ], 38),
      T.active ? (y(), Z(zi("v-f-modal-" + T.type), {
        key: 0,
        selection: T.data,
        current: m
      }, null, 8, ["selection", "current"])) : G("", !0),
      we(En, { current: m }, null, 8, ["current"]),
      Pn
    ], 2));
  }
}), Nn = /* @__PURE__ */ u("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), jn = { class: "fixed z-10 inset-0 overflow-y-auto w-screen h-screen" }, Vn = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, zn = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Bn = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, De = {
  __name: "ModalLayout",
  setup(o) {
    const e = z("emitter");
    return xe(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, i) => (y(), D("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: i[1] || (i[1] = Ye((n) => x(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Nn,
      u("div", jn, [
        u("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: i[0] || (i[0] = Pe((n) => x(e).emit("vf-modal-close"), ["self"]))
        }, [
          u("div", Vn, [
            u("div", zn, [
              Mt(t.$slots, "default")
            ]),
            u("div", Bn, [
              Mt(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Rn = ["aria-label"], Hn = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Un = [
  Hn
], Kn = {
  name: "Message"
}, Ce = /* @__PURE__ */ Object.assign(Kn, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  setup(o) {
    var s;
    const { t: e } = z("i18n"), t = I(!1), i = I(null), n = I((s = i.value) == null ? void 0 : s.strMessage);
    vt(n, () => t.value = !1);
    const a = () => t.value = !0;
    return (f, m) => (y(), D("div", null, [
      t.value ? G("", !0) : (y(), D("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: de(["flex mt-1 p-1 px-2 rounded text-sm", o.error ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"])
      }, [
        Mt(f.$slots, "default"),
        u("div", {
          class: "ml-auto cursor-pointer",
          onClick: a,
          "aria-label": x(e)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, Un, 8, Rn)
      ], 2))
    ]));
  }
}), Yn = { class: "sm:flex sm:items-start" }, Wn = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Xn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Fn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, qn = { class: "mt-2" }, Gn = { class: "text-sm text-gray-500" }, Jn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Zn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qn = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), es = [
  Qn
], ts = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, rs = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), is = [
  rs
], as = { class: "ml-1.5" }, os = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, ns = {
  name: "VFModalDelete"
}, ss = /* @__PURE__ */ Object.assign(ns, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), a = I(e.selection.items), s = I(""), f = () => {
      a.value.length && t.emit("vf-fetch", {
        params: {
          q: "delete",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(a.value.map(({ path: m, type: p }) => ({ path: m, type: p })))
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (m) => {
          s.value = n(m.message);
        }
      });
    };
    return (m, p) => (y(), Z(De, null, {
      buttons: J(() => [
        u("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Yes, Delete!")), 1),
        u("button", {
          type: "button",
          onClick: p[0] || (p[0] = (h) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Cancel")), 1),
        u("div", os, E(x(n)("This action cannot be undone.")), 1)
      ]),
      default: J(() => [
        u("div", Yn, [
          Wn,
          u("div", Xn, [
            u("h3", Fn, E(x(n)("Delete files")), 1),
            u("div", qn, [
              u("p", Gn, E(x(n)("Are you sure you want to delete these files?")), 1),
              (y(!0), D(ce, null, be(a.value, (h) => (y(), D("p", Jn, [
                h.type == "dir" ? (y(), D("svg", Zn, es)) : (y(), D("svg", ts, is)),
                u("span", as, E(h.basename), 1)
              ]))), 256)),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  se(E(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ls = { class: "sm:flex sm:items-start" }, cs = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), us = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, ds = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, hs = { class: "mt-2" }, fs = { class: "text-sm text-gray-500" }, ms = {
  name: "VFModalMessage"
}, ps = /* @__PURE__ */ Object.assign(ms, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = z("emitter"), { t } = z("i18n");
    return (i, n) => (y(), Z(De, null, {
      buttons: J(() => [
        u("button", {
          type: "button",
          onClick: n[0] || (n[0] = (a) => x(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(t)("Close")), 1)
      ]),
      default: J(() => {
        var a, s, f, m;
        return [
          u("div", ls, [
            cs,
            u("div", us, [
              u("h3", ds, E((s = (a = o.selection) == null ? void 0 : a.title) != null ? s : "Title"), 1),
              u("div", hs, [
                u("p", fs, E((m = (f = o.selection) == null ? void 0 : f.message) != null ? m : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), gs = { class: "sm:flex sm:items-start" }, vs = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), bs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ys = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ws = { class: "mt-2" }, xs = { class: "text-sm text-gray-500" }, _s = ["onKeyup", "placeholder"], ks = {
  name: "VFModalNewFolder"
}, Ss = /* @__PURE__ */ Object.assign(ks, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), a = I(""), s = I(""), f = () => {
      a.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfolder",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          name: a.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("%s is created.", a.value) });
        },
        onError: (m) => {
          s.value = n(m.message);
        }
      });
    };
    return (m, p) => (y(), Z(De, null, {
      buttons: J(() => [
        u("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Create")), 1),
        u("button", {
          type: "button",
          onClick: p[1] || (p[1] = (h) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Cancel")), 1)
      ]),
      default: J(() => [
        u("div", gs, [
          vs,
          u("div", bs, [
            u("h3", ys, E(x(n)("New Folder")), 1),
            u("div", ws, [
              u("p", xs, E(x(n)("Create a new folder")), 1),
              ve(u("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (h) => a.value = h),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: x(n)("Folder Name"),
                type: "text"
              }, null, 40, _s), [
                [We, a.value]
              ]),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  se(E(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ds = { class: "sm:flex sm:items-start" }, Cs = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), Ms = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, $s = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Es = { class: "mt-2" }, Ts = { class: "text-sm text-gray-500" }, As = ["onKeyup", "placeholder"], Os = {
  name: "VFModalNewFile"
}, Ps = /* @__PURE__ */ Object.assign(Os, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), a = I(""), s = I(""), f = () => {
      a.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfile",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          name: a.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("%s is created.", a.value) });
        },
        onError: (m) => {
          s.value = n(m.message);
        }
      });
    };
    return (m, p) => (y(), Z(De, null, {
      buttons: J(() => [
        u("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        u("button", {
          type: "button",
          onClick: p[1] || (p[1] = (h) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: J(() => [
        u("div", Ds, [
          Cs,
          u("div", Ms, [
            u("h3", $s, E(x(n)("New File")), 1),
            u("div", Es, [
              u("p", Ts, E(x(n)("Create a new file")), 1),
              ve(u("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (h) => a.value = h),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: x(n)("File Name"),
                type: "text"
              }, null, 40, As), [
                [We, a.value]
              ]),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  se(E(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Is = { class: "flex" }, Ls = ["aria-label"], Ns = { class: "ml-auto mb-2" }, js = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, Vs = { key: 1 }, zs = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, i = I(""), n = I(""), a = I(null), s = I(!1), { apiUrl: f } = Se(), m = I(""), p = I(!1), { t: h } = z("i18n");
    xe(() => {
      pt(f.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((k) => {
        i.value = k, e("load");
      });
    });
    const v = () => {
      s.value = !s.value, n.value = i.value, s.value == !0 && bt(() => {
        a.value.focus();
      });
    }, b = z("postData"), T = () => {
      m.value = "", p.value = !1, pt(f.value, {
        method: "POST",
        params: Object.assign(b, {
          q: "save",
          adapter: t.selection.adapter,
          path: t.selection.item.path,
          content: n.value
        }),
        json: !1
      }).then((k) => {
        m.value = h("Updated."), i.value = k, e("load"), s.value = !s.value;
      }).catch((k) => {
        m.value = h(k.message), p.value = !0;
      });
    };
    return (k, M) => (y(), D(ce, null, [
      u("div", Is, [
        u("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, E(o.selection.item.basename), 9, Ls),
        u("div", Ns, [
          s.value ? (y(), D("button", {
            key: 0,
            onClick: T,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, E(x(h)("Save")), 1)) : G("", !0),
          u("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: M[0] || (M[0] = (N) => v())
          }, E(s.value ? x(h)("Cancel") : x(h)("Edit")), 1)
        ])
      ]),
      u("div", null, [
        s.value ? (y(), D("div", Vs, [
          ve(u("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": M[1] || (M[1] = (N) => n.value = N),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [We, n.value]
          ])
        ])) : (y(), D("pre", js, E(i.value), 1)),
        m.value.length ? (y(), Z(Ce, {
          key: 2,
          error: p.value
        }, {
          default: J(() => [
            se(E(m.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : G("", !0)
      ])
    ], 64));
  }
};
/*!
 * Cropper.js v1.5.12
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2021-06-12T08:00:17.411Z
 */
function hr(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    e && (i = i.filter(function(n) {
      return Object.getOwnPropertyDescriptor(o, n).enumerable;
    })), t.push.apply(t, i);
  }
  return t;
}
function Pr(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? hr(Object(t), !0).forEach(function(i) {
      Hs(o, i, t[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : hr(Object(t)).forEach(function(i) {
      Object.defineProperty(o, i, Object.getOwnPropertyDescriptor(t, i));
    });
  }
  return o;
}
function ht(o) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ht = function(e) {
    return typeof e;
  } : ht = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ht(o);
}
function Bs(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function fr(o, e) {
  for (var t = 0; t < e.length; t++) {
    var i = e[t];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(o, i.key, i);
  }
}
function Rs(o, e, t) {
  return e && fr(o.prototype, e), t && fr(o, t), o;
}
function Hs(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function Ir(o) {
  return Us(o) || Ks(o) || Ys(o) || Ws();
}
function Us(o) {
  if (Array.isArray(o))
    return Tt(o);
}
function Ks(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null)
    return Array.from(o);
}
function Ys(o, e) {
  if (!!o) {
    if (typeof o == "string")
      return Tt(o, e);
    var t = Object.prototype.toString.call(o).slice(8, -1);
    if (t === "Object" && o.constructor && (t = o.constructor.name), t === "Map" || t === "Set")
      return Array.from(o);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return Tt(o, e);
  }
}
function Tt(o, e) {
  (e == null || e > o.length) && (e = o.length);
  for (var t = 0, i = new Array(e); t < e; t++)
    i[t] = o[t];
  return i;
}
function Ws() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var yt = typeof window < "u" && typeof window.document < "u", ke = yt ? window : {}, zt = yt && ke.document.documentElement ? "ontouchstart" in ke.document.documentElement : !1, Bt = yt ? "PointerEvent" in ke : !1, te = "cropper", Rt = "all", Lr = "crop", Nr = "move", jr = "zoom", Ae = "e", Oe = "w", Be = "s", $e = "n", Je = "ne", Ze = "nw", Qe = "se", et = "sw", At = "".concat(te, "-crop"), mr = "".concat(te, "-disabled"), fe = "".concat(te, "-hidden"), pr = "".concat(te, "-hide"), Xs = "".concat(te, "-invisible"), gt = "".concat(te, "-modal"), Ot = "".concat(te, "-move"), rt = "".concat(te, "Action"), ut = "".concat(te, "Preview"), Ht = "crop", Vr = "move", zr = "none", Pt = "crop", It = "cropend", Lt = "cropmove", Nt = "cropstart", gr = "dblclick", Fs = zt ? "touchstart" : "mousedown", qs = zt ? "touchmove" : "mousemove", Gs = zt ? "touchend touchcancel" : "mouseup", vr = Bt ? "pointerdown" : Fs, br = Bt ? "pointermove" : qs, yr = Bt ? "pointerup pointercancel" : Gs, wr = "ready", xr = "resize", _r = "wheel", jt = "zoom", kr = "image/jpeg", Js = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, Zs = /^data:/, Qs = /^data:image\/jpeg;base64,/, el = /^img|canvas$/i, Br = 200, Rr = 100, Sr = {
  viewMode: 0,
  dragMode: Ht,
  initialAspectRatio: NaN,
  aspectRatio: NaN,
  data: null,
  preview: "",
  responsive: !0,
  restore: !0,
  checkCrossOrigin: !0,
  checkOrientation: !0,
  modal: !0,
  guides: !0,
  center: !0,
  highlight: !0,
  background: !0,
  autoCrop: !0,
  autoCropArea: 0.8,
  movable: !0,
  rotatable: !0,
  scalable: !0,
  zoomable: !0,
  zoomOnTouch: !0,
  zoomOnWheel: !0,
  wheelZoomRatio: 0.1,
  cropBoxMovable: !0,
  cropBoxResizable: !0,
  toggleDragModeOnDblclick: !0,
  minCanvasWidth: 0,
  minCanvasHeight: 0,
  minCropBoxWidth: 0,
  minCropBoxHeight: 0,
  minContainerWidth: Br,
  minContainerHeight: Rr,
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, tl = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', rl = Number.isNaN || ke.isNaN;
function X(o) {
  return typeof o == "number" && !rl(o);
}
var Dr = function(e) {
  return e > 0 && e < 1 / 0;
};
function St(o) {
  return typeof o > "u";
}
function Ie(o) {
  return ht(o) === "object" && o !== null;
}
var il = Object.prototype.hasOwnProperty;
function Re(o) {
  if (!Ie(o))
    return !1;
  try {
    var e = o.constructor, t = e.prototype;
    return e && t && il.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function he(o) {
  return typeof o == "function";
}
var al = Array.prototype.slice;
function Hr(o) {
  return Array.from ? Array.from(o) : al.call(o);
}
function ne(o, e) {
  return o && he(e) && (Array.isArray(o) || X(o.length) ? Hr(o).forEach(function(t, i) {
    e.call(o, t, i, o);
  }) : Ie(o) && Object.keys(o).forEach(function(t) {
    e.call(o, o[t], t, o);
  })), o;
}
var re = Object.assign || function(e) {
  for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    i[n - 1] = arguments[n];
  return Ie(e) && i.length > 0 && i.forEach(function(a) {
    Ie(a) && Object.keys(a).forEach(function(s) {
      e[s] = a[s];
    });
  }), e;
}, ol = /\.\d*(?:0|9){12}\d*$/;
function Ue(o) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return ol.test(o) ? Math.round(o * e) / e : o;
}
var nl = /^width|height|left|top|marginLeft|marginTop$/;
function Ee(o, e) {
  var t = o.style;
  ne(e, function(i, n) {
    nl.test(n) && X(i) && (i = "".concat(i, "px")), t[n] = i;
  });
}
function sl(o, e) {
  return o.classList ? o.classList.contains(e) : o.className.indexOf(e) > -1;
}
function le(o, e) {
  if (!!e) {
    if (X(o.length)) {
      ne(o, function(i) {
        le(i, e);
      });
      return;
    }
    if (o.classList) {
      o.classList.add(e);
      return;
    }
    var t = o.className.trim();
    t ? t.indexOf(e) < 0 && (o.className = "".concat(t, " ").concat(e)) : o.className = e;
  }
}
function _e(o, e) {
  if (!!e) {
    if (X(o.length)) {
      ne(o, function(t) {
        _e(t, e);
      });
      return;
    }
    if (o.classList) {
      o.classList.remove(e);
      return;
    }
    o.className.indexOf(e) >= 0 && (o.className = o.className.replace(e, ""));
  }
}
function He(o, e, t) {
  if (!!e) {
    if (X(o.length)) {
      ne(o, function(i) {
        He(i, e, t);
      });
      return;
    }
    t ? le(o, e) : _e(o, e);
  }
}
var ll = /([a-z\d])([A-Z])/g;
function Ut(o) {
  return o.replace(ll, "$1-$2").toLowerCase();
}
function Vt(o, e) {
  return Ie(o[e]) ? o[e] : o.dataset ? o.dataset[e] : o.getAttribute("data-".concat(Ut(e)));
}
function it(o, e, t) {
  Ie(t) ? o[e] = t : o.dataset ? o.dataset[e] = t : o.setAttribute("data-".concat(Ut(e)), t);
}
function cl(o, e) {
  if (Ie(o[e]))
    try {
      delete o[e];
    } catch {
      o[e] = void 0;
    }
  else if (o.dataset)
    try {
      delete o.dataset[e];
    } catch {
      o.dataset[e] = void 0;
    }
  else
    o.removeAttribute("data-".concat(Ut(e)));
}
var Ur = /\s\s*/, Kr = function() {
  var o = !1;
  if (yt) {
    var e = !1, t = function() {
    }, i = Object.defineProperty({}, "once", {
      get: function() {
        return o = !0, e;
      },
      set: function(a) {
        e = a;
      }
    });
    ke.addEventListener("test", t, i), ke.removeEventListener("test", t, i);
  }
  return o;
}();
function ye(o, e, t) {
  var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, n = t;
  e.trim().split(Ur).forEach(function(a) {
    if (!Kr) {
      var s = o.listeners;
      s && s[a] && s[a][t] && (n = s[a][t], delete s[a][t], Object.keys(s[a]).length === 0 && delete s[a], Object.keys(s).length === 0 && delete o.listeners);
    }
    o.removeEventListener(a, n, i);
  });
}
function ge(o, e, t) {
  var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, n = t;
  e.trim().split(Ur).forEach(function(a) {
    if (i.once && !Kr) {
      var s = o.listeners, f = s === void 0 ? {} : s;
      n = function() {
        delete f[a][t], o.removeEventListener(a, n, i);
        for (var p = arguments.length, h = new Array(p), v = 0; v < p; v++)
          h[v] = arguments[v];
        t.apply(o, h);
      }, f[a] || (f[a] = {}), f[a][t] && o.removeEventListener(a, f[a][t], i), f[a][t] = n, o.listeners = f;
    }
    o.addEventListener(a, n, i);
  });
}
function Ke(o, e, t) {
  var i;
  return he(Event) && he(CustomEvent) ? i = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (i = document.createEvent("CustomEvent"), i.initCustomEvent(e, !0, !0, t)), o.dispatchEvent(i);
}
function Yr(o) {
  var e = o.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var Dt = ke.location, ul = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function Cr(o) {
  var e = o.match(ul);
  return e !== null && (e[1] !== Dt.protocol || e[2] !== Dt.hostname || e[3] !== Dt.port);
}
function Mr(o) {
  var e = "timestamp=".concat(new Date().getTime());
  return o + (o.indexOf("?") === -1 ? "?" : "&") + e;
}
function tt(o) {
  var e = o.rotate, t = o.scaleX, i = o.scaleY, n = o.translateX, a = o.translateY, s = [];
  X(n) && n !== 0 && s.push("translateX(".concat(n, "px)")), X(a) && a !== 0 && s.push("translateY(".concat(a, "px)")), X(e) && e !== 0 && s.push("rotate(".concat(e, "deg)")), X(t) && t !== 1 && s.push("scaleX(".concat(t, ")")), X(i) && i !== 1 && s.push("scaleY(".concat(i, ")"));
  var f = s.length ? s.join(" ") : "none";
  return {
    WebkitTransform: f,
    msTransform: f,
    transform: f
  };
}
function dl(o) {
  var e = Pr({}, o), t = 0;
  return ne(o, function(i, n) {
    delete e[n], ne(e, function(a) {
      var s = Math.abs(i.startX - a.startX), f = Math.abs(i.startY - a.startY), m = Math.abs(i.endX - a.endX), p = Math.abs(i.endY - a.endY), h = Math.sqrt(s * s + f * f), v = Math.sqrt(m * m + p * p), b = (v - h) / h;
      Math.abs(b) > Math.abs(t) && (t = b);
    });
  }), t;
}
function dt(o, e) {
  var t = o.pageX, i = o.pageY, n = {
    endX: t,
    endY: i
  };
  return e ? n : Pr({
    startX: t,
    startY: i
  }, n);
}
function hl(o) {
  var e = 0, t = 0, i = 0;
  return ne(o, function(n) {
    var a = n.startX, s = n.startY;
    e += a, t += s, i += 1;
  }), e /= i, t /= i, {
    pageX: e,
    pageY: t
  };
}
function Te(o) {
  var e = o.aspectRatio, t = o.height, i = o.width, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", a = Dr(i), s = Dr(t);
  if (a && s) {
    var f = t * e;
    n === "contain" && f > i || n === "cover" && f < i ? t = i / e : i = t * e;
  } else
    a ? t = i / e : s && (i = t * e);
  return {
    width: i,
    height: t
  };
}
function fl(o) {
  var e = o.width, t = o.height, i = o.degree;
  if (i = Math.abs(i) % 180, i === 90)
    return {
      width: t,
      height: e
    };
  var n = i % 90 * Math.PI / 180, a = Math.sin(n), s = Math.cos(n), f = e * s + t * a, m = e * a + t * s;
  return i > 90 ? {
    width: m,
    height: f
  } : {
    width: f,
    height: m
  };
}
function ml(o, e, t, i) {
  var n = e.aspectRatio, a = e.naturalWidth, s = e.naturalHeight, f = e.rotate, m = f === void 0 ? 0 : f, p = e.scaleX, h = p === void 0 ? 1 : p, v = e.scaleY, b = v === void 0 ? 1 : v, T = t.aspectRatio, k = t.naturalWidth, M = t.naturalHeight, N = i.fillColor, Y = N === void 0 ? "transparent" : N, R = i.imageSmoothingEnabled, A = R === void 0 ? !0 : R, U = i.imageSmoothingQuality, F = U === void 0 ? "low" : U, C = i.maxWidth, q = C === void 0 ? 1 / 0 : C, ee = i.maxHeight, ue = ee === void 0 ? 1 / 0 : ee, me = i.minWidth, L = me === void 0 ? 0 : me, B = i.minHeight, j = B === void 0 ? 0 : B, W = document.createElement("canvas"), H = W.getContext("2d"), ae = Te({
    aspectRatio: T,
    width: q,
    height: ue
  }), Q = Te({
    aspectRatio: T,
    width: L,
    height: j
  }, "cover"), Xe = Math.min(ae.width, Math.max(Q.width, k)), Fe = Math.min(ae.height, Math.max(Q.height, M)), at = Te({
    aspectRatio: n,
    width: q,
    height: ue
  }), ot = Te({
    aspectRatio: n,
    width: L,
    height: j
  }, "cover"), nt = Math.min(at.width, Math.max(ot.width, a)), Ne = Math.min(at.height, Math.max(ot.height, s)), wt = [-nt / 2, -Ne / 2, nt, Ne];
  return W.width = Ue(Xe), W.height = Ue(Fe), H.fillStyle = Y, H.fillRect(0, 0, Xe, Fe), H.save(), H.translate(Xe / 2, Fe / 2), H.rotate(m * Math.PI / 180), H.scale(h, b), H.imageSmoothingEnabled = A, H.imageSmoothingQuality = F, H.drawImage.apply(H, [o].concat(Ir(wt.map(function(je) {
    return Math.floor(Ue(je));
  })))), H.restore(), W;
}
var Wr = String.fromCharCode;
function pl(o, e, t) {
  var i = "";
  t += e;
  for (var n = e; n < t; n += 1)
    i += Wr(o.getUint8(n));
  return i;
}
var gl = /^data:.*,/;
function vl(o) {
  var e = o.replace(gl, ""), t = atob(e), i = new ArrayBuffer(t.length), n = new Uint8Array(i);
  return ne(n, function(a, s) {
    n[s] = t.charCodeAt(s);
  }), i;
}
function bl(o, e) {
  for (var t = [], i = 8192, n = new Uint8Array(o); n.length > 0; )
    t.push(Wr.apply(null, Hr(n.subarray(0, i)))), n = n.subarray(i);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function yl(o) {
  var e = new DataView(o), t;
  try {
    var i, n, a;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var s = e.byteLength, f = 2; f + 1 < s; ) {
        if (e.getUint8(f) === 255 && e.getUint8(f + 1) === 225) {
          n = f;
          break;
        }
        f += 1;
      }
    if (n) {
      var m = n + 4, p = n + 10;
      if (pl(e, m, 4) === "Exif") {
        var h = e.getUint16(p);
        if (i = h === 18761, (i || h === 19789) && e.getUint16(p + 2, i) === 42) {
          var v = e.getUint32(p + 4, i);
          v >= 8 && (a = p + v);
        }
      }
    }
    if (a) {
      var b = e.getUint16(a, i), T, k;
      for (k = 0; k < b; k += 1)
        if (T = a + k * 12 + 2, e.getUint16(T, i) === 274) {
          T += 8, t = e.getUint16(T, i), e.setUint16(T, 1, i);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function wl(o) {
  var e = 0, t = 1, i = 1;
  switch (o) {
    case 2:
      t = -1;
      break;
    case 3:
      e = -180;
      break;
    case 4:
      i = -1;
      break;
    case 5:
      e = 90, i = -1;
      break;
    case 6:
      e = 90;
      break;
    case 7:
      e = 90, t = -1;
      break;
    case 8:
      e = -90;
      break;
  }
  return {
    rotate: e,
    scaleX: t,
    scaleY: i
  };
}
var xl = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, i = this.container, n = this.cropper, a = Number(t.minContainerWidth), s = Number(t.minContainerHeight);
    le(n, fe), _e(e, fe);
    var f = {
      width: Math.max(i.offsetWidth, a >= 0 ? a : Br),
      height: Math.max(i.offsetHeight, s >= 0 ? s : Rr)
    };
    this.containerData = f, Ee(n, {
      width: f.width,
      height: f.height
    }), le(e, fe), _e(n, fe);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, i = this.options.viewMode, n = Math.abs(t.rotate) % 180 === 90, a = n ? t.naturalHeight : t.naturalWidth, s = n ? t.naturalWidth : t.naturalHeight, f = a / s, m = e.width, p = e.height;
    e.height * f > e.width ? i === 3 ? m = e.height * f : p = e.width / f : i === 3 ? p = e.width / f : m = e.height * f;
    var h = {
      aspectRatio: f,
      naturalWidth: a,
      naturalHeight: s,
      width: m,
      height: p
    };
    this.canvasData = h, this.limited = i === 1 || i === 2, this.limitCanvas(!0, !0), h.width = Math.min(Math.max(h.width, h.minWidth), h.maxWidth), h.height = Math.min(Math.max(h.height, h.minHeight), h.maxHeight), h.left = (e.width - h.width) / 2, h.top = (e.height - h.height) / 2, h.oldLeft = h.left, h.oldTop = h.top, this.initialCanvasData = re({}, h);
  },
  limitCanvas: function(e, t) {
    var i = this.options, n = this.containerData, a = this.canvasData, s = this.cropBoxData, f = i.viewMode, m = a.aspectRatio, p = this.cropped && s;
    if (e) {
      var h = Number(i.minCanvasWidth) || 0, v = Number(i.minCanvasHeight) || 0;
      f > 1 ? (h = Math.max(h, n.width), v = Math.max(v, n.height), f === 3 && (v * m > h ? h = v * m : v = h / m)) : f > 0 && (h ? h = Math.max(h, p ? s.width : 0) : v ? v = Math.max(v, p ? s.height : 0) : p && (h = s.width, v = s.height, v * m > h ? h = v * m : v = h / m));
      var b = Te({
        aspectRatio: m,
        width: h,
        height: v
      });
      h = b.width, v = b.height, a.minWidth = h, a.minHeight = v, a.maxWidth = 1 / 0, a.maxHeight = 1 / 0;
    }
    if (t)
      if (f > (p ? 0 : 1)) {
        var T = n.width - a.width, k = n.height - a.height;
        a.minLeft = Math.min(0, T), a.minTop = Math.min(0, k), a.maxLeft = Math.max(0, T), a.maxTop = Math.max(0, k), p && this.limited && (a.minLeft = Math.min(s.left, s.left + (s.width - a.width)), a.minTop = Math.min(s.top, s.top + (s.height - a.height)), a.maxLeft = s.left, a.maxTop = s.top, f === 2 && (a.width >= n.width && (a.minLeft = Math.min(0, T), a.maxLeft = Math.max(0, T)), a.height >= n.height && (a.minTop = Math.min(0, k), a.maxTop = Math.max(0, k))));
      } else
        a.minLeft = -a.width, a.minTop = -a.height, a.maxLeft = n.width, a.maxTop = n.height;
  },
  renderCanvas: function(e, t) {
    var i = this.canvasData, n = this.imageData;
    if (t) {
      var a = fl({
        width: n.naturalWidth * Math.abs(n.scaleX || 1),
        height: n.naturalHeight * Math.abs(n.scaleY || 1),
        degree: n.rotate || 0
      }), s = a.width, f = a.height, m = i.width * (s / i.naturalWidth), p = i.height * (f / i.naturalHeight);
      i.left -= (m - i.width) / 2, i.top -= (p - i.height) / 2, i.width = m, i.height = p, i.aspectRatio = s / f, i.naturalWidth = s, i.naturalHeight = f, this.limitCanvas(!0, !1);
    }
    (i.width > i.maxWidth || i.width < i.minWidth) && (i.left = i.oldLeft), (i.height > i.maxHeight || i.height < i.minHeight) && (i.top = i.oldTop), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), this.limitCanvas(!1, !0), i.left = Math.min(Math.max(i.left, i.minLeft), i.maxLeft), i.top = Math.min(Math.max(i.top, i.minTop), i.maxTop), i.oldLeft = i.left, i.oldTop = i.top, Ee(this.canvas, re({
      width: i.width,
      height: i.height
    }, tt({
      translateX: i.left,
      translateY: i.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var t = this.canvasData, i = this.imageData, n = i.naturalWidth * (t.width / t.naturalWidth), a = i.naturalHeight * (t.height / t.naturalHeight);
    re(i, {
      width: n,
      height: a,
      left: (t.width - n) / 2,
      top: (t.height - a) / 2
    }), Ee(this.image, re({
      width: i.width,
      height: i.height
    }, tt(re({
      translateX: i.left,
      translateY: i.top
    }, i)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, i = e.aspectRatio || e.initialAspectRatio, n = Number(e.autoCropArea) || 0.8, a = {
      width: t.width,
      height: t.height
    };
    i && (t.height * i > t.width ? a.height = a.width / i : a.width = a.height * i), this.cropBoxData = a, this.limitCropBox(!0, !0), a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth), a.height = Math.min(Math.max(a.height, a.minHeight), a.maxHeight), a.width = Math.max(a.minWidth, a.width * n), a.height = Math.max(a.minHeight, a.height * n), a.left = t.left + (t.width - a.width) / 2, a.top = t.top + (t.height - a.height) / 2, a.oldLeft = a.left, a.oldTop = a.top, this.initialCropBoxData = re({}, a);
  },
  limitCropBox: function(e, t) {
    var i = this.options, n = this.containerData, a = this.canvasData, s = this.cropBoxData, f = this.limited, m = i.aspectRatio;
    if (e) {
      var p = Number(i.minCropBoxWidth) || 0, h = Number(i.minCropBoxHeight) || 0, v = f ? Math.min(n.width, a.width, a.width + a.left, n.width - a.left) : n.width, b = f ? Math.min(n.height, a.height, a.height + a.top, n.height - a.top) : n.height;
      p = Math.min(p, n.width), h = Math.min(h, n.height), m && (p && h ? h * m > p ? h = p / m : p = h * m : p ? h = p / m : h && (p = h * m), b * m > v ? b = v / m : v = b * m), s.minWidth = Math.min(p, v), s.minHeight = Math.min(h, b), s.maxWidth = v, s.maxHeight = b;
    }
    t && (f ? (s.minLeft = Math.max(0, a.left), s.minTop = Math.max(0, a.top), s.maxLeft = Math.min(n.width, a.left + a.width) - s.width, s.maxTop = Math.min(n.height, a.top + a.height) - s.height) : (s.minLeft = 0, s.minTop = 0, s.maxLeft = n.width - s.width, s.maxTop = n.height - s.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, i = this.cropBoxData;
    (i.width > i.maxWidth || i.width < i.minWidth) && (i.left = i.oldLeft), (i.height > i.maxHeight || i.height < i.minHeight) && (i.top = i.oldTop), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), this.limitCropBox(!1, !0), i.left = Math.min(Math.max(i.left, i.minLeft), i.maxLeft), i.top = Math.min(Math.max(i.top, i.minTop), i.maxTop), i.oldLeft = i.left, i.oldTop = i.top, e.movable && e.cropBoxMovable && it(this.face, rt, i.width >= t.width && i.height >= t.height ? Nr : Rt), Ee(this.cropBox, re({
      width: i.width,
      height: i.height
    }, tt({
      translateX: i.left,
      translateY: i.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), Ke(this.element, Pt, this.getData());
  }
}, _l = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, i = this.options.preview, n = t ? this.crossOriginUrl : this.url, a = e.alt || "The image to preview", s = document.createElement("img");
    if (t && (s.crossOrigin = t), s.src = n, s.alt = a, this.viewBox.appendChild(s), this.viewBoxImage = s, !!i) {
      var f = i;
      typeof i == "string" ? f = e.ownerDocument.querySelectorAll(i) : i.querySelector && (f = [i]), this.previews = f, ne(f, function(m) {
        var p = document.createElement("img");
        it(m, ut, {
          width: m.offsetWidth,
          height: m.offsetHeight,
          html: m.innerHTML
        }), t && (p.crossOrigin = t), p.src = n, p.alt = a, p.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', m.innerHTML = "", m.appendChild(p);
      });
    }
  },
  resetPreview: function() {
    ne(this.previews, function(e) {
      var t = Vt(e, ut);
      Ee(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, cl(e, ut);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, i = this.cropBoxData, n = i.width, a = i.height, s = e.width, f = e.height, m = i.left - t.left - e.left, p = i.top - t.top - e.top;
    !this.cropped || this.disabled || (Ee(this.viewBoxImage, re({
      width: s,
      height: f
    }, tt(re({
      translateX: -m,
      translateY: -p
    }, e)))), ne(this.previews, function(h) {
      var v = Vt(h, ut), b = v.width, T = v.height, k = b, M = T, N = 1;
      n && (N = b / n, M = a * N), a && M > T && (N = T / a, k = n * N, M = T), Ee(h, {
        width: k,
        height: M
      }), Ee(h.getElementsByTagName("img")[0], re({
        width: s * N,
        height: f * N
      }, tt(re({
        translateX: -m * N,
        translateY: -p * N
      }, e))));
    }));
  }
}, kl = {
  bind: function() {
    var e = this.element, t = this.options, i = this.cropper;
    he(t.cropstart) && ge(e, Nt, t.cropstart), he(t.cropmove) && ge(e, Lt, t.cropmove), he(t.cropend) && ge(e, It, t.cropend), he(t.crop) && ge(e, Pt, t.crop), he(t.zoom) && ge(e, jt, t.zoom), ge(i, vr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && ge(i, _r, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ge(i, gr, this.onDblclick = this.dblclick.bind(this)), ge(e.ownerDocument, br, this.onCropMove = this.cropMove.bind(this)), ge(e.ownerDocument, yr, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && ge(window, xr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, i = this.cropper;
    he(t.cropstart) && ye(e, Nt, t.cropstart), he(t.cropmove) && ye(e, Lt, t.cropmove), he(t.cropend) && ye(e, It, t.cropend), he(t.crop) && ye(e, Pt, t.crop), he(t.zoom) && ye(e, jt, t.zoom), ye(i, vr, this.onCropStart), t.zoomable && t.zoomOnWheel && ye(i, _r, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ye(i, gr, this.onDblclick), ye(e.ownerDocument, br, this.onCropMove), ye(e.ownerDocument, yr, this.onCropEnd), t.responsive && ye(window, xr, this.onResize);
  }
}, Sl = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, i = this.containerData, n = t.offsetWidth / i.width, a = t.offsetHeight / i.height, s = Math.abs(n - 1) > Math.abs(a - 1) ? n : a;
      if (s !== 1) {
        var f, m;
        e.restore && (f = this.getCanvasData(), m = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(ne(f, function(p, h) {
          f[h] = p * s;
        })), this.setCropBoxData(ne(m, function(p, h) {
          m[h] = p * s;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === zr || this.setDragMode(sl(this.dragBox, At) ? Vr : Ht);
  },
  wheel: function(e) {
    var t = this, i = Number(this.options.wheelZoomRatio) || 0.1, n = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      t.wheeling = !1;
    }, 50), e.deltaY ? n = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? n = -e.wheelDelta / 120 : e.detail && (n = e.detail > 0 ? 1 : -1), this.zoom(-n * i, e)));
  },
  cropStart: function(e) {
    var t = e.buttons, i = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (X(t) && t !== 1 || X(i) && i !== 0 || e.ctrlKey))) {
      var n = this.options, a = this.pointers, s;
      e.changedTouches ? ne(e.changedTouches, function(f) {
        a[f.identifier] = dt(f);
      }) : a[e.pointerId || 0] = dt(e), Object.keys(a).length > 1 && n.zoomable && n.zoomOnTouch ? s = jr : s = Vt(e.target, rt), !!Js.test(s) && Ke(this.element, Nt, {
        originalEvent: e,
        action: s
      }) !== !1 && (e.preventDefault(), this.action = s, this.cropping = !1, s === Lr && (this.cropping = !0, le(this.dragBox, gt)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var i = this.pointers;
      e.preventDefault(), Ke(this.element, Lt, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? ne(e.changedTouches, function(n) {
        re(i[n.identifier] || {}, dt(n, !0));
      }) : re(i[e.pointerId || 0] || {}, dt(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, i = this.pointers;
      e.changedTouches ? ne(e.changedTouches, function(n) {
        delete i[n.identifier];
      }) : delete i[e.pointerId || 0], t && (e.preventDefault(), Object.keys(i).length || (this.action = ""), this.cropping && (this.cropping = !1, He(this.dragBox, gt, this.cropped && this.options.modal)), Ke(this.element, It, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, Dl = {
  change: function(e) {
    var t = this.options, i = this.canvasData, n = this.containerData, a = this.cropBoxData, s = this.pointers, f = this.action, m = t.aspectRatio, p = a.left, h = a.top, v = a.width, b = a.height, T = p + v, k = h + b, M = 0, N = 0, Y = n.width, R = n.height, A = !0, U;
    !m && e.shiftKey && (m = v && b ? v / b : 1), this.limited && (M = a.minLeft, N = a.minTop, Y = M + Math.min(n.width, i.width, i.left + i.width), R = N + Math.min(n.height, i.height, i.top + i.height));
    var F = s[Object.keys(s)[0]], C = {
      x: F.endX - F.startX,
      y: F.endY - F.startY
    }, q = function(ue) {
      switch (ue) {
        case Ae:
          T + C.x > Y && (C.x = Y - T);
          break;
        case Oe:
          p + C.x < M && (C.x = M - p);
          break;
        case $e:
          h + C.y < N && (C.y = N - h);
          break;
        case Be:
          k + C.y > R && (C.y = R - k);
          break;
      }
    };
    switch (f) {
      case Rt:
        p += C.x, h += C.y;
        break;
      case Ae:
        if (C.x >= 0 && (T >= Y || m && (h <= N || k >= R))) {
          A = !1;
          break;
        }
        q(Ae), v += C.x, v < 0 && (f = Oe, v = -v, p -= v), m && (b = v / m, h += (a.height - b) / 2);
        break;
      case $e:
        if (C.y <= 0 && (h <= N || m && (p <= M || T >= Y))) {
          A = !1;
          break;
        }
        q($e), b -= C.y, h += C.y, b < 0 && (f = Be, b = -b, h -= b), m && (v = b * m, p += (a.width - v) / 2);
        break;
      case Oe:
        if (C.x <= 0 && (p <= M || m && (h <= N || k >= R))) {
          A = !1;
          break;
        }
        q(Oe), v -= C.x, p += C.x, v < 0 && (f = Ae, v = -v, p -= v), m && (b = v / m, h += (a.height - b) / 2);
        break;
      case Be:
        if (C.y >= 0 && (k >= R || m && (p <= M || T >= Y))) {
          A = !1;
          break;
        }
        q(Be), b += C.y, b < 0 && (f = $e, b = -b, h -= b), m && (v = b * m, p += (a.width - v) / 2);
        break;
      case Je:
        if (m) {
          if (C.y <= 0 && (h <= N || T >= Y)) {
            A = !1;
            break;
          }
          q($e), b -= C.y, h += C.y, v = b * m;
        } else
          q($e), q(Ae), C.x >= 0 ? T < Y ? v += C.x : C.y <= 0 && h <= N && (A = !1) : v += C.x, C.y <= 0 ? h > N && (b -= C.y, h += C.y) : (b -= C.y, h += C.y);
        v < 0 && b < 0 ? (f = et, b = -b, v = -v, h -= b, p -= v) : v < 0 ? (f = Ze, v = -v, p -= v) : b < 0 && (f = Qe, b = -b, h -= b);
        break;
      case Ze:
        if (m) {
          if (C.y <= 0 && (h <= N || p <= M)) {
            A = !1;
            break;
          }
          q($e), b -= C.y, h += C.y, v = b * m, p += a.width - v;
        } else
          q($e), q(Oe), C.x <= 0 ? p > M ? (v -= C.x, p += C.x) : C.y <= 0 && h <= N && (A = !1) : (v -= C.x, p += C.x), C.y <= 0 ? h > N && (b -= C.y, h += C.y) : (b -= C.y, h += C.y);
        v < 0 && b < 0 ? (f = Qe, b = -b, v = -v, h -= b, p -= v) : v < 0 ? (f = Je, v = -v, p -= v) : b < 0 && (f = et, b = -b, h -= b);
        break;
      case et:
        if (m) {
          if (C.x <= 0 && (p <= M || k >= R)) {
            A = !1;
            break;
          }
          q(Oe), v -= C.x, p += C.x, b = v / m;
        } else
          q(Be), q(Oe), C.x <= 0 ? p > M ? (v -= C.x, p += C.x) : C.y >= 0 && k >= R && (A = !1) : (v -= C.x, p += C.x), C.y >= 0 ? k < R && (b += C.y) : b += C.y;
        v < 0 && b < 0 ? (f = Je, b = -b, v = -v, h -= b, p -= v) : v < 0 ? (f = Qe, v = -v, p -= v) : b < 0 && (f = Ze, b = -b, h -= b);
        break;
      case Qe:
        if (m) {
          if (C.x >= 0 && (T >= Y || k >= R)) {
            A = !1;
            break;
          }
          q(Ae), v += C.x, b = v / m;
        } else
          q(Be), q(Ae), C.x >= 0 ? T < Y ? v += C.x : C.y >= 0 && k >= R && (A = !1) : v += C.x, C.y >= 0 ? k < R && (b += C.y) : b += C.y;
        v < 0 && b < 0 ? (f = Ze, b = -b, v = -v, h -= b, p -= v) : v < 0 ? (f = et, v = -v, p -= v) : b < 0 && (f = Je, b = -b, h -= b);
        break;
      case Nr:
        this.move(C.x, C.y), A = !1;
        break;
      case jr:
        this.zoom(dl(s), e), A = !1;
        break;
      case Lr:
        if (!C.x || !C.y) {
          A = !1;
          break;
        }
        U = Yr(this.cropper), p = F.startX - U.left, h = F.startY - U.top, v = a.minWidth, b = a.minHeight, C.x > 0 ? f = C.y > 0 ? Qe : Je : C.x < 0 && (p -= v, f = C.y > 0 ? et : Ze), C.y < 0 && (h -= b), this.cropped || (_e(this.cropBox, fe), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    A && (a.width = v, a.height = b, a.left = p, a.top = h, this.action = f, this.renderCropBox()), ne(s, function(ee) {
      ee.startX = ee.endX, ee.startY = ee.endY;
    });
  }
}, Cl = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && le(this.dragBox, gt), _e(this.cropBox, fe), this.setCropBoxData(this.initialCropBoxData)), this;
  },
  reset: function() {
    return this.ready && !this.disabled && (this.imageData = re({}, this.initialImageData), this.canvasData = re({}, this.initialCanvasData), this.cropBoxData = re({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this;
  },
  clear: function() {
    return this.cropped && !this.disabled && (re(this.cropBoxData, {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), _e(this.dragBox, gt), le(this.cropBox, fe)), this;
  },
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, ne(this.previews, function(i) {
      i.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, _e(this.cropper, mr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, le(this.cropper, mr)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[te] ? (e[te] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, i = this.canvasData, n = i.left, a = i.top;
    return this.moveTo(St(e) ? e : n + Number(e), St(t) ? t : a + Number(t));
  },
  moveTo: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, i = this.canvasData, n = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (X(e) && (i.left = e, n = !0), X(t) && (i.top = t, n = !0), n && this.renderCanvas(!0)), this;
  },
  zoom: function(e, t) {
    var i = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(i.width * e / i.naturalWidth, null, t);
  },
  zoomTo: function(e, t, i) {
    var n = this.options, a = this.canvasData, s = a.width, f = a.height, m = a.naturalWidth, p = a.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && n.zoomable) {
      var h = m * e, v = p * e;
      if (Ke(this.element, jt, {
        ratio: e,
        oldRatio: s / m,
        originalEvent: i
      }) === !1)
        return this;
      if (i) {
        var b = this.pointers, T = Yr(this.cropper), k = b && Object.keys(b).length ? hl(b) : {
          pageX: i.pageX,
          pageY: i.pageY
        };
        a.left -= (h - s) * ((k.pageX - T.left - a.left) / s), a.top -= (v - f) * ((k.pageY - T.top - a.top) / f);
      } else
        Re(t) && X(t.x) && X(t.y) ? (a.left -= (h - s) * ((t.x - a.left) / s), a.top -= (v - f) * ((t.y - a.top) / f)) : (a.left -= (h - s) / 2, a.top -= (v - f) / 2);
      a.width = h, a.height = v, this.renderCanvas(!0);
    }
    return this;
  },
  rotate: function(e) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(e));
  },
  rotateTo: function(e) {
    return e = Number(e), X(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
  },
  scaleX: function(e) {
    var t = this.imageData.scaleY;
    return this.scale(e, X(t) ? t : 1);
  },
  scaleY: function(e) {
    var t = this.imageData.scaleX;
    return this.scale(X(t) ? t : 1, e);
  },
  scale: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, i = this.imageData, n = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (X(e) && (i.scaleX = e, n = !0), X(t) && (i.scaleY = t, n = !0), n && this.renderCanvas(!0, !0)), this;
  },
  getData: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, t = this.options, i = this.imageData, n = this.canvasData, a = this.cropBoxData, s;
    if (this.ready && this.cropped) {
      s = {
        x: a.left - n.left,
        y: a.top - n.top,
        width: a.width,
        height: a.height
      };
      var f = i.width / i.naturalWidth;
      if (ne(s, function(h, v) {
        s[v] = h / f;
      }), e) {
        var m = Math.round(s.y + s.height), p = Math.round(s.x + s.width);
        s.x = Math.round(s.x), s.y = Math.round(s.y), s.width = p - s.x, s.height = m - s.y;
      }
    } else
      s = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return t.rotatable && (s.rotate = i.rotate || 0), t.scalable && (s.scaleX = i.scaleX || 1, s.scaleY = i.scaleY || 1), s;
  },
  setData: function(e) {
    var t = this.options, i = this.imageData, n = this.canvasData, a = {};
    if (this.ready && !this.disabled && Re(e)) {
      var s = !1;
      t.rotatable && X(e.rotate) && e.rotate !== i.rotate && (i.rotate = e.rotate, s = !0), t.scalable && (X(e.scaleX) && e.scaleX !== i.scaleX && (i.scaleX = e.scaleX, s = !0), X(e.scaleY) && e.scaleY !== i.scaleY && (i.scaleY = e.scaleY, s = !0)), s && this.renderCanvas(!0, !0);
      var f = i.width / i.naturalWidth;
      X(e.x) && (a.left = e.x * f + n.left), X(e.y) && (a.top = e.y * f + n.top), X(e.width) && (a.width = e.width * f), X(e.height) && (a.height = e.height * f), this.setCropBoxData(a);
    }
    return this;
  },
  getContainerData: function() {
    return this.ready ? re({}, this.containerData) : {};
  },
  getImageData: function() {
    return this.sized ? re({}, this.imageData) : {};
  },
  getCanvasData: function() {
    var e = this.canvasData, t = {};
    return this.ready && ne(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(i) {
      t[i] = e[i];
    }), t;
  },
  setCanvasData: function(e) {
    var t = this.canvasData, i = t.aspectRatio;
    return this.ready && !this.disabled && Re(e) && (X(e.left) && (t.left = e.left), X(e.top) && (t.top = e.top), X(e.width) ? (t.width = e.width, t.height = e.width / i) : X(e.height) && (t.height = e.height, t.width = e.height * i), this.renderCanvas(!0)), this;
  },
  getCropBoxData: function() {
    var e = this.cropBoxData, t;
    return this.ready && this.cropped && (t = {
      left: e.left,
      top: e.top,
      width: e.width,
      height: e.height
    }), t || {};
  },
  setCropBoxData: function(e) {
    var t = this.cropBoxData, i = this.options.aspectRatio, n, a;
    return this.ready && this.cropped && !this.disabled && Re(e) && (X(e.left) && (t.left = e.left), X(e.top) && (t.top = e.top), X(e.width) && e.width !== t.width && (n = !0, t.width = e.width), X(e.height) && e.height !== t.height && (a = !0, t.height = e.height), i && (n ? t.height = t.width / i : a && (t.width = t.height * i)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, i = ml(this.image, this.imageData, t, e);
    if (!this.cropped)
      return i;
    var n = this.getData(), a = n.x, s = n.y, f = n.width, m = n.height, p = i.width / Math.floor(t.naturalWidth);
    p !== 1 && (a *= p, s *= p, f *= p, m *= p);
    var h = f / m, v = Te({
      aspectRatio: h,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Te({
      aspectRatio: h,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), T = Te({
      aspectRatio: h,
      width: e.width || (p !== 1 ? i.width : f),
      height: e.height || (p !== 1 ? i.height : m)
    }), k = T.width, M = T.height;
    k = Math.min(v.width, Math.max(b.width, k)), M = Math.min(v.height, Math.max(b.height, M));
    var N = document.createElement("canvas"), Y = N.getContext("2d");
    N.width = Ue(k), N.height = Ue(M), Y.fillStyle = e.fillColor || "transparent", Y.fillRect(0, 0, k, M);
    var R = e.imageSmoothingEnabled, A = R === void 0 ? !0 : R, U = e.imageSmoothingQuality;
    Y.imageSmoothingEnabled = A, U && (Y.imageSmoothingQuality = U);
    var F = i.width, C = i.height, q = a, ee = s, ue, me, L, B, j, W;
    q <= -f || q > F ? (q = 0, ue = 0, L = 0, j = 0) : q <= 0 ? (L = -q, q = 0, ue = Math.min(F, f + q), j = ue) : q <= F && (L = 0, ue = Math.min(f, F - q), j = ue), ue <= 0 || ee <= -m || ee > C ? (ee = 0, me = 0, B = 0, W = 0) : ee <= 0 ? (B = -ee, ee = 0, me = Math.min(C, m + ee), W = me) : ee <= C && (B = 0, me = Math.min(m, C - ee), W = me);
    var H = [q, ee, ue, me];
    if (j > 0 && W > 0) {
      var ae = k / f;
      H.push(L * ae, B * ae, j * ae, W * ae);
    }
    return Y.drawImage.apply(Y, [i].concat(Ir(H.map(function(Q) {
      return Math.floor(Ue(Q));
    })))), N;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !St(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, i = this.dragBox, n = this.face;
    if (this.ready && !this.disabled) {
      var a = e === Ht, s = t.movable && e === Vr;
      e = a || s ? e : zr, t.dragMode = e, it(i, rt, e), He(i, At, a), He(i, Ot, s), t.cropBoxMovable || (it(n, rt, e), He(n, At, a), He(n, Ot, s));
    }
    return this;
  }
}, Ml = ke.Cropper, Xr = /* @__PURE__ */ function() {
  function o(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (Bs(this, o), !e || !el.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = re({}, Sr, Re(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return Rs(o, [{
    key: "init",
    value: function() {
      var t = this.element, i = t.tagName.toLowerCase(), n;
      if (!t[te]) {
        if (t[te] = this, i === "img") {
          if (this.isImg = !0, n = t.getAttribute("src") || "", this.originalUrl = n, !n)
            return;
          n = t.src;
        } else
          i === "canvas" && window.HTMLCanvasElement && (n = t.toDataURL());
        this.load(n);
      }
    }
  }, {
    key: "load",
    value: function(t) {
      var i = this;
      if (!!t) {
        this.url = t, this.imageData = {};
        var n = this.element, a = this.options;
        if (!a.rotatable && !a.scalable && (a.checkOrientation = !1), !a.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (Zs.test(t)) {
          Qs.test(t) ? this.read(vl(t)) : this.clone();
          return;
        }
        var s = new XMLHttpRequest(), f = this.clone.bind(this);
        this.reloading = !0, this.xhr = s, s.onabort = f, s.onerror = f, s.ontimeout = f, s.onprogress = function() {
          s.getResponseHeader("content-type") !== kr && s.abort();
        }, s.onload = function() {
          i.read(s.response);
        }, s.onloadend = function() {
          i.reloading = !1, i.xhr = null;
        }, a.checkCrossOrigin && Cr(t) && n.crossOrigin && (t = Mr(t)), s.open("GET", t, !0), s.responseType = "arraybuffer", s.withCredentials = n.crossOrigin === "use-credentials", s.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var i = this.options, n = this.imageData, a = yl(t), s = 0, f = 1, m = 1;
      if (a > 1) {
        this.url = bl(t, kr);
        var p = wl(a);
        s = p.rotate, f = p.scaleX, m = p.scaleY;
      }
      i.rotatable && (n.rotate = s), i.scalable && (n.scaleX = f, n.scaleY = m), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, i = this.url, n = t.crossOrigin, a = i;
      this.options.checkCrossOrigin && Cr(i) && (n || (n = "anonymous"), a = Mr(i)), this.crossOrigin = n, this.crossOriginUrl = a;
      var s = document.createElement("img");
      n && (s.crossOrigin = n), s.src = a || i, s.alt = t.alt || "The image to crop", this.image = s, s.onload = this.start.bind(this), s.onerror = this.stop.bind(this), le(s, pr), t.parentNode.insertBefore(s, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, i = this.image;
      i.onload = null, i.onerror = null, this.sizing = !0;
      var n = ke.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(ke.navigator.userAgent), a = function(p, h) {
        re(t.imageData, {
          naturalWidth: p,
          naturalHeight: h,
          aspectRatio: p / h
        }), t.initialImageData = re({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (i.naturalWidth && !n) {
        a(i.naturalWidth, i.naturalHeight);
        return;
      }
      var s = document.createElement("img"), f = document.body || document.documentElement;
      this.sizingImage = s, s.onload = function() {
        a(s.width, s.height), n || f.removeChild(s);
      }, s.src = i.src, n || (s.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", f.appendChild(s));
    }
  }, {
    key: "stop",
    value: function() {
      var t = this.image;
      t.onload = null, t.onerror = null, t.parentNode.removeChild(t), this.image = null;
    }
  }, {
    key: "build",
    value: function() {
      if (!(!this.sized || this.ready)) {
        var t = this.element, i = this.options, n = this.image, a = t.parentNode, s = document.createElement("div");
        s.innerHTML = tl;
        var f = s.querySelector(".".concat(te, "-container")), m = f.querySelector(".".concat(te, "-canvas")), p = f.querySelector(".".concat(te, "-drag-box")), h = f.querySelector(".".concat(te, "-crop-box")), v = h.querySelector(".".concat(te, "-face"));
        this.container = a, this.cropper = f, this.canvas = m, this.dragBox = p, this.cropBox = h, this.viewBox = f.querySelector(".".concat(te, "-view-box")), this.face = v, m.appendChild(n), le(t, fe), a.insertBefore(f, t.nextSibling), this.isImg || _e(n, pr), this.initPreview(), this.bind(), i.initialAspectRatio = Math.max(0, i.initialAspectRatio) || NaN, i.aspectRatio = Math.max(0, i.aspectRatio) || NaN, i.viewMode = Math.max(0, Math.min(3, Math.round(i.viewMode))) || 0, le(h, fe), i.guides || le(h.getElementsByClassName("".concat(te, "-dashed")), fe), i.center || le(h.getElementsByClassName("".concat(te, "-center")), fe), i.background && le(f, "".concat(te, "-bg")), i.highlight || le(v, Xs), i.cropBoxMovable && (le(v, Ot), it(v, rt, Rt)), i.cropBoxResizable || (le(h.getElementsByClassName("".concat(te, "-line")), fe), le(h.getElementsByClassName("".concat(te, "-point")), fe)), this.render(), this.ready = !0, this.setDragMode(i.dragMode), i.autoCrop && this.crop(), this.setData(i.data), he(i.ready) && ge(t, wr, i.ready, {
          once: !0
        }), Ke(t, wr);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      !this.ready || (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), _e(this.element, fe));
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = Ml, o;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      re(Sr, Re(t) && t);
    }
  }]), o;
}();
re(Xr.prototype, xl, _l, kl, Sl, Dl, Cl);
const $l = { class: "flex" }, El = ["aria-label"], Tl = { class: "ml-auto mb-2" }, Al = { class: "w-full flex justify-center" }, Ol = ["src"], Pl = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { t: i } = z("i18n"), { apiUrl: n } = Se(), a = I(null), s = I(null), f = I(!1), m = I(""), p = I(!1), h = () => {
      f.value = !f.value, f.value ? s.value = new Xr(a.value, {
        crop(T) {
        }
      }) : s.value.destroy();
    }, v = z("postData"), b = () => {
      s.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (T) => {
          m.value = "", p.value = !1, pt(n.value, {
            method: "POST",
            params: Object.assign(v, {
              q: "upload",
              adapter: t.selection.adapter,
              path: t.selection.item.path,
              file: T
            }),
            name: t.selection.item.basename,
            json: !1
          }).then((k) => {
            m.value = i("Updated."), a.value.src = Et(t.selection.adapter, t.selection.item.path), h(), e("load");
          }).catch((k) => {
            m.value = i(k.message), p.value = !0;
          });
        }
      );
    };
    return xe(() => {
      e("load");
    }), (T, k) => (y(), D(ce, null, [
      u("div", $l, [
        u("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, E(o.selection.item.basename), 9, El),
        u("div", Tl, [
          f.value ? (y(), D("button", {
            key: 0,
            onClick: b,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, E(x(i)("Crop")), 1)) : G("", !0),
          u("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: k[0] || (k[0] = (M) => h())
          }, E(f.value ? x(i)("Cancel") : x(i)("Edit")), 1)
        ])
      ]),
      u("div", Al, [
        u("img", {
          ref_key: "image",
          ref: a,
          class: "max-w-[60vh] max-h-[60vh]",
          src: x(Et)(t.selection.adapter, t.selection.item.path),
          alt: ""
        }, null, 8, Ol)
      ]),
      m.value.length ? (y(), Z(Ce, {
        key: 0,
        error: p.value
      }, {
        default: J(() => [
          se(E(m.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : G("", !0)
    ], 64));
  }
}, Il = { class: "flex" }, Ll = ["aria-label"], Nl = /* @__PURE__ */ u("div", null, null, -1), jl = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    return xe(() => {
      e("load");
    }), (t, i) => (y(), D(ce, null, [
      u("div", Il, [
        u("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, E(o.selection.item.basename), 9, Ll)
      ]),
      Nl
    ], 64));
  }
}, Vl = ["aria-label"], zl = {
  class: "w-full",
  preload: "",
  controls: ""
}, Bl = ["src"], Rl = /* @__PURE__ */ se(" Your browser does not support the video tag. "), Hl = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: i } = Se(), n = () => i.value + "?" + Le({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (a, s) => (y(), D(ce, null, [
      u("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, E(o.selection.item.basename), 9, Vl),
      u("div", null, [
        u("video", zl, [
          u("source", {
            src: n(),
            type: "video/mp4"
          }, null, 8, Bl),
          Rl
        ])
      ])
    ], 64));
  }
}, Ul = ["aria-label"], Kl = {
  class: "w-full",
  controls: ""
}, Yl = ["src"], Wl = /* @__PURE__ */ se(" Your browser does not support the audio element. "), Xl = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: i } = Se(), n = () => i.value + "?" + Le({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (a, s) => (y(), D(ce, null, [
      u("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, E(o.selection.item.basename), 9, Ul),
      u("div", null, [
        u("audio", Kl, [
          u("source", {
            src: n(),
            type: "audio/mpeg"
          }, null, 8, Yl),
          Wl
        ])
      ])
    ], 64));
  }
}, Fl = ["aria-label"], ql = ["data"], Gl = ["src"], Jl = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: i } = Se(), n = () => i.value + "?" + Le({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (a, s) => (y(), D(ce, null, [
      u("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, E(o.selection.item.basename), 9, Fl),
      u("div", null, [
        u("object", {
          class: "h-[60vh]",
          data: n(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          u("iframe", {
            class: "border-0",
            src: n(),
            width: "100%",
            height: "100%"
          }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        `, 8, Gl)
        ], 8, ql)
      ])
    ], 64));
  }
}, Zl = { class: "sm:flex sm:items-start" }, Ql = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, ec = { class: "text-gray-700 dark:text-gray-200 text-sm" }, tc = {
  key: 0,
  class: "flex leading-5"
}, rc = /* @__PURE__ */ u("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ u("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ u("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), ic = { class: "p-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, ac = { class: "font-bold pl-2" }, oc = { class: "font-bold pl-2" }, nc = {
  name: "VFModalPreview"
}, sc = /* @__PURE__ */ Object.assign(nc, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = o, { apiUrl: t } = Se(), i = z("emitter"), { t: n } = z("i18n"), a = I(!1), s = (p) => a.value = p, f = (p) => {
      var h;
      return ((h = e.selection.item.mime_type) != null ? h : "").startsWith(p);
    }, m = () => {
      const p = t.value + "?" + Le({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      i.emit("vf-download", p);
    };
    return (p, h) => (y(), Z(De, null, {
      buttons: J(() => [
        u("button", {
          type: "button",
          onClick: h[6] || (h[6] = (v) => x(i).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Close")), 1),
        u("button", {
          type: "button",
          onClick: h[7] || (h[7] = (v) => m()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Download")), 1)
      ]),
      default: J(() => [
        u("div", Zl, [
          u("div", Ql, [
            u("div", null, [
              f("text") ? (y(), Z(zs, {
                key: 0,
                selection: o.selection,
                onLoad: h[0] || (h[0] = (v) => s(!0))
              }, null, 8, ["selection"])) : f("image") ? (y(), Z(Pl, {
                key: 1,
                selection: o.selection,
                onLoad: h[1] || (h[1] = (v) => s(!0))
              }, null, 8, ["selection"])) : f("video") ? (y(), Z(Hl, {
                key: 2,
                selection: o.selection,
                onLoad: h[2] || (h[2] = (v) => s(!0))
              }, null, 8, ["selection"])) : f("audio") ? (y(), Z(Xl, {
                key: 3,
                selection: o.selection,
                onLoad: h[3] || (h[3] = (v) => s(!0))
              }, null, 8, ["selection"])) : f("application/pdf") ? (y(), Z(Jl, {
                key: 4,
                selection: o.selection,
                onLoad: h[4] || (h[4] = (v) => s(!0))
              }, null, 8, ["selection"])) : (y(), Z(jl, {
                key: 5,
                selection: o.selection,
                onLoad: h[5] || (h[5] = (v) => s(!0))
              }, null, 8, ["selection"]))
            ]),
            u("div", ec, [
              a.value == !1 ? (y(), D("div", tc, [
                rc,
                u("span", null, E(x(n)("Loading")), 1)
              ])) : G("", !0)
            ])
          ])
        ]),
        u("div", ic, [
          u("div", null, [
            u("span", ac, E(x(n)("File Size")) + ": ", 1),
            se(E(x(Ar)(o.selection.item.file_size)), 1)
          ]),
          u("div", null, [
            u("span", oc, E(x(n)("Last Modified")) + ": ", 1),
            se(" " + E(x(Or)(o.selection.item.last_modified)), 1)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), lc = { class: "sm:flex sm:items-start" }, cc = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), uc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, dc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, hc = { class: "mt-2" }, fc = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, mc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pc = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), gc = [
  pc
], vc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bc = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), yc = [
  bc
], wc = { class: "ml-1.5" }, xc = ["onKeyup"], _c = {
  name: "VFModalRename"
}, kc = /* @__PURE__ */ Object.assign(_c, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), a = I(e.selection.items[0]), s = I(e.selection.items[0].basename), f = I(""), m = () => {
      s.value != "" && t.emit("vf-fetch", {
        params: {
          q: "rename",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          item: a.value.path,
          name: s.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("%s is renamed.", s.value) });
        },
        onError: (p) => {
          f.value = n(p.message);
        }
      });
    };
    return (p, h) => (y(), Z(De, null, {
      buttons: J(() => [
        u("button", {
          type: "button",
          onClick: m,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Rename")), 1),
        u("button", {
          type: "button",
          onClick: h[1] || (h[1] = (v) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Cancel")), 1)
      ]),
      default: J(() => [
        u("div", lc, [
          cc,
          u("div", uc, [
            u("h3", dc, E(x(n)("Rename")), 1),
            u("div", hc, [
              u("p", fc, [
                a.value.type == "dir" ? (y(), D("svg", mc, gc)) : (y(), D("svg", vc, yc)),
                u("span", wc, E(a.value.basename), 1)
              ]),
              ve(u("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (v) => s.value = v),
                onKeyup: Ye(m, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, xc), [
                [We, s.value]
              ]),
              f.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  se(E(f.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Sc = { class: "sm:flex sm:items-start" }, Dc = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), Cc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Mc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, $c = { class: "mt-2" }, Ec = { class: "text-gray-500 mb-1" }, Tc = ["id"], Ac = {
  key: 0,
  class: "py-2"
}, Oc = ["disabled", "onClick"], Pc = {
  name: "VFModalUpload"
}, Ic = /* @__PURE__ */ Object.assign(Pc, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = z("emitter"), { apiUrl: i } = Se(), { t: n } = z("i18n"), a = I(null), s = I(null), f = I(null), m = I([]), p = I(""), h = I(!0), v = () => {
      p.value = "", a.value.start();
    }, b = z("postData");
    return xe(() => {
      a.value = new kt.Uploader({
        runtimes: "html5",
        browse_button: f.value,
        container: s.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: i.value + "?" + Le(Object.assign(b, { q: "upload", adapter: e.current.adapter, path: e.current.dirname })),
        headers: {
          ...mt && { "X-CSRF-Token": mt }
        },
        init: {
          PostInit: function() {
          },
          FilesAdded: function(T, k) {
            h.value = !1, kt.each(k, function(M) {
              m.value.push({
                id: M.id,
                name: M.name,
                size: kt.formatSize(M.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(T, k) {
            m.value[m.value.findIndex((M) => M.id == k.id)].percent = k.percent + "%";
          },
          UploadComplete: function() {
            h.value = !0, t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
          },
          Error: function(T, k) {
            a.value.stop(), p.value = n(JSON.parse(k.response).message);
          }
        }
      }), a.value.init();
    }), (T, k) => (y(), Z(De, null, {
      buttons: J(() => [
        u("button", {
          disabled: h.value,
          onClick: Pe(v, ["prevent"]),
          type: "button",
          class: de([h.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, E(x(n)("Upload")), 11, Oc),
        u("button", {
          type: "button",
          onClick: k[0] || (k[0] = (M) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Cancel")), 1)
      ]),
      default: J(() => [
        u("div", Sc, [
          Dc,
          u("div", Cc, [
            u("h3", Mc, E(x(n)("Upload files")), 1),
            u("div", $c, [
              u("div", Ec, [
                (y(!0), D(ce, null, be(m.value, (M) => (y(), D("div", null, [
                  u("div", {
                    id: M.id
                  }, [
                    se(E(M.name) + " ( " + E(M.size) + ") ", 1),
                    u("b", null, E(M.percent), 1)
                  ], 8, Tc)
                ]))), 256)),
                m.value.length ? G("", !0) : (y(), D("div", Ac, E(x(n)("No files selected!")), 1))
              ]),
              u("div", {
                class: "text-gray-500",
                ref_key: "container",
                ref: s
              }, [
                u("button", {
                  ref_key: "pickFiles",
                  ref: f,
                  type: "button",
                  class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                }, E(x(n)("Select Files")), 513)
              ], 512),
              p.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  se(E(p.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Lc = { class: "sm:flex sm:items-start" }, Nc = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), jc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Vc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, zc = { class: "mt-2" }, Bc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Rc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hc = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Uc = [
  Hc
], Kc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yc = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Wc = [
  Yc
], Xc = { class: "ml-1.5" }, Fc = ["onKeyup", "placeholder"], qc = {
  name: "VFModalArchive"
}, Gc = /* @__PURE__ */ Object.assign(qc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), a = I(""), s = I(""), f = I(e.selection.items), m = () => {
      f.value.length && t.emit("vf-fetch", {
        params: {
          q: "archive",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(f.value.map(({ path: p, type: h }) => ({ path: p, type: h }))),
          name: a.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (p) => {
          s.value = n(p.message);
        }
      });
    };
    return (p, h) => (y(), Z(De, null, {
      buttons: J(() => [
        u("button", {
          type: "button",
          onClick: m,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Archive")), 1),
        u("button", {
          type: "button",
          onClick: h[1] || (h[1] = (v) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Cancel")), 1)
      ]),
      default: J(() => [
        u("div", Lc, [
          Nc,
          u("div", jc, [
            u("h3", Vc, E(x(n)("Archive the files")), 1),
            u("div", zc, [
              (y(!0), D(ce, null, be(f.value, (v) => (y(), D("p", Bc, [
                v.type == "dir" ? (y(), D("svg", Rc, Uc)) : (y(), D("svg", Kc, Wc)),
                u("span", Xc, E(v.basename), 1)
              ]))), 256)),
              ve(u("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (v) => a.value = v),
                onKeyup: Ye(m, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: x(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Fc), [
                [We, a.value]
              ]),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  se(E(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Jc = { class: "sm:flex sm:items-start" }, Zc = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), Qc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, eu = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, tu = { class: "mt-2" }, ru = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, iu = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, au = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ou = [
  au
], nu = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, su = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), lu = [
  su
], cu = { class: "ml-1.5" }, uu = { class: "my-1 text-sm text-gray-500" }, du = {
  name: "VFModalUnarchive"
}, hu = /* @__PURE__ */ Object.assign(du, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n");
    I("");
    const a = I(e.selection.items[0]), s = I(""), f = I([]), m = () => {
      t.emit("vf-fetch", {
        params: {
          q: "unarchive",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          item: a.value.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (p) => {
          s.value = n(p.message);
        }
      });
    };
    return (p, h) => (y(), Z(De, null, {
      buttons: J(() => [
        u("button", {
          type: "button",
          onClick: m,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Unarchive")), 1),
        u("button", {
          type: "button",
          onClick: h[0] || (h[0] = (v) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Cancel")), 1)
      ]),
      default: J(() => [
        u("div", Jc, [
          Zc,
          u("div", Qc, [
            u("h3", eu, E(x(n)("Unarchive")), 1),
            u("div", tu, [
              (y(!0), D(ce, null, be(f.value, (v) => (y(), D("p", ru, [
                v.type == "dir" ? (y(), D("svg", iu, ou)) : (y(), D("svg", nu, lu)),
                u("span", cu, E(v.basename), 1)
              ]))), 256)),
              u("p", uu, E(x(n)("The archive will be unarchived at")) + " (" + E(o.current.dirname) + ")", 1),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  se(E(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), fu = { class: "sm:flex sm:items-start" }, mu = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), pu = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, gu = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, vu = { class: "mt-2" }, bu = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, yu = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wu = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), xu = [
  wu
], _u = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ku = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Su = [
  ku
], Du = { class: "ml-1.5" }, Cu = { class: "text-sm text-gray-500 pb-1 pt-3" }, Mu = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, $u = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), Eu = { class: "ml-1.5 overflow-auto" }, Tu = {
  name: "VFModalMove"
}, Au = /* @__PURE__ */ Object.assign(Tu, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = z("emitter"), { t: i } = z("i18n"), { getStore: n } = z("storage"), a = I(e.selection.items.from), s = I(""), f = () => {
      a.value.length && t.emit("vf-fetch", {
        params: {
          q: "move",
          adapter: n("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(a.value.map(({ path: m, type: p }) => ({ path: m, type: p }))),
          item: e.selection.items.to.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: i("Files moved.", e.selection.items.to.name) });
        },
        onError: (m) => {
          s.value = i(m.message);
        }
      });
    };
    return (m, p) => (y(), Z(De, null, {
      buttons: J(() => [
        u("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Yes, Move!")), 1),
        u("button", {
          type: "button",
          onClick: p[0] || (p[0] = (h) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Cancel")), 1)
      ]),
      default: J(() => [
        u("div", fu, [
          mu,
          u("div", pu, [
            u("h3", gu, E(x(i)("Move files")), 1),
            u("div", vu, [
              (y(!0), D(ce, null, be(a.value, (h) => (y(), D("p", bu, [
                h.type == "dir" ? (y(), D("svg", yu, xu)) : (y(), D("svg", _u, Su)),
                u("span", Du, E(h.path), 1)
              ]))), 256)),
              u("p", Cu, E(x(i)("Are you sure you want to move these files?")), 1),
              u("p", Mu, [
                $u,
                u("span", Eu, E(o.selection.items.to.path), 1)
              ]),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  se(E(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ou = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: ss,
  ModalMessage: ps,
  ModalNewFolder: Ss,
  ModalNewFile: Ps,
  ModalPreview: sc,
  ModalRename: kc,
  ModalUpload: Ic,
  ModalArchive: Gc,
  ModalUnarchive: hu,
  ModalMove: Au
}, Symbol.toStringTag, { value: "Module" })), Ct = {
  VueFinder: Ln,
  ...Ou
};
const Lu = {
  install(o) {
    for (const e in Ct)
      if (Ct.hasOwnProperty(e)) {
        const t = Ct[e];
        o.component(t.name, t);
      }
  }
};
export {
  Lu as default
};
