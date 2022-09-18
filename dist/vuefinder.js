import { ref as N, watch as At, openBlock as x, createElementBlock as D, createElementVNode as d, unref as U, normalizeClass as he, toDisplayString as B, createCommentVNode as oe, createTextVNode as Me, createVNode as pe, TransitionGroup as Mi, withCtx as ee, Fragment as ae, renderList as fe, reactive as ut, onMounted as be, withDirectives as ge, vShow as ot, normalizeStyle as kr, withModifiers as Te, nextTick as ft, vModelSelect as $i, customRef as Ei, withKeys as Ke, isRef as Ti, vModelText as Ue, provide as ir, createBlock as se, resolveDynamicComponent as Ai, renderSlot as nr } from "vue";
import yt from "plupload";
const dt = (o, { method: e = "get", params: t = {}, json: n = !0 }) => {
  const s = { method: e };
  if (e == "get")
    o += "?" + new URLSearchParams(t);
  else {
    s.headers = {};
    let i = new FormData();
    for (const [l, h] of Object.entries(t))
      i.append(l, h);
    s.body = i;
  }
  return fetch(o, s).then((i) => i.ok ? n ? i.json() : i.text() : Promise.reject(i));
};
function Oi(o) {
  return { all: o = o || /* @__PURE__ */ new Map(), on: function(e, t) {
    var n = o.get(e);
    n ? n.push(t) : o.set(e, [t]);
  }, off: function(e, t) {
    var n = o.get(e);
    n && (t ? n.splice(n.indexOf(t) >>> 0, 1) : o.set(e, []));
  }, emit: function(e, t) {
    var n = o.get(e);
    n && n.slice().map(function(s) {
      s(t);
    }), (n = o.get("*")) && n.slice().map(function(s) {
      s(e, t);
    });
  } };
}
function or(o) {
  let e = localStorage.getItem(o + "_storage");
  const t = N(JSON.parse(e));
  At(t, n);
  function n() {
    t.value === null || t.value === "" ? localStorage.removeItem(o + "_storage") : localStorage.setItem(o + "_storage", JSON.stringify(t.value));
  }
  function s(h, v) {
    t.value = Object.assign({ ...t.value }, { [h]: v });
  }
  function i() {
    t.value = null;
  }
  return { getStore: (h, v = null) => t.value === null || t.value === "" ? v : t.value.hasOwnProperty(h) ? t.value[h] : v, setStore: s, clearStore: i };
}
const ar = N("");
function _e() {
  function o(e) {
    ar.value = e;
  }
  return { apiUrl: ar, setApiUrl: o };
}
const Pi = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, ji = {
  key: 0,
  class: "flex text-center"
}, Ii = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  })
], -1), Ni = [
  Ii
], Li = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
  })
], -1), Vi = [
  Li
], zi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Bi = [
  zi
], Ri = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), Hi = [
  Ri
], Ki = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  })
], -1), Ui = [
  Ki
], Yi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), Wi = [
  Yi
], Xi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), Fi = [
  Xi
], qi = {
  key: 1,
  class: "flex text-center"
}, Gi = { class: "pl-2" }, Ji = /* @__PURE__ */ Me(" Search results for "), Zi = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Qi = { class: "flex text-center items-center justify-end" }, en = {
  class: "mx-1.5",
  "aria-label": "Dark Mode",
  "data-microtip-position": "bottom",
  role: "tooltip"
}, tn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), rn = [
  tn
], nn = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, on = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, an = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, sn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, ln = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, cn = {
  name: "VFToolbar"
}, un = /* @__PURE__ */ Object.assign(cn, {
  props: {
    data: Object
  },
  setup(o) {
    const e = inject("emitter"), { getStore: t, setStore: n } = inject("storage"), s = N(t("viewport", "grid")), i = N([]), l = N(t("full-screen", !1)), h = N("");
    e.on("vf-search-query", ({ newQuery: g }) => {
      h.value = g;
    });
    const v = () => {
      l.value = !l.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (g) => {
      i.value = g;
    }), e.on("vf-view-toggle", (g) => {
      n("viewport", g), s.value = g;
    }), (g, f) => (x(), D("div", Pi, [
      h.value.length ? (x(), D("div", qi, [
        d("div", Gi, [
          Ji,
          d("span", Zi, B(h.value), 1)
        ])
      ])) : (x(), D("div", ji, [
        d("div", {
          class: "mx-1.5",
          "aria-label": "New Folder",
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: f[0] || (f[0] = (m) => U(e).emit("vf-modal-show", { type: "new-folder", items: i.value }))
        }, Ni),
        d("div", {
          class: "mx-1.5",
          "aria-label": "New File",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[1] || (f[1] = (m) => U(e).emit("vf-modal-show", { type: "new-file", items: i.value }))
        }, Vi),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Rename",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[2] || (f[2] = (m) => i.value.length != 1 || U(e).emit("vf-modal-show", { type: "rename", items: i.value }))
        }, [
          (x(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: he([i.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Bi, 2))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Delete",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[3] || (f[3] = (m) => !i.value.length || U(e).emit("vf-modal-show", { type: "delete", items: i.value }))
        }, [
          (x(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: he([i.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Hi, 2))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Upload",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[4] || (f[4] = (m) => U(e).emit("vf-modal-show", { type: "upload", items: i.value }))
        }, Ui),
        i.value.length == 1 && i.value[0].mime_type == "application/zip" ? (x(), D("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": "Unrchive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[5] || (f[5] = (m) => !i.value.length || U(e).emit("vf-modal-show", { type: "unarchive", items: i.value }))
        }, [
          (x(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: he([i.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Wi, 2))
        ])) : (x(), D("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": "Archive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[6] || (f[6] = (m) => !i.value.length || U(e).emit("vf-modal-show", { type: "archive", items: i.value }))
        }, [
          (x(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: he([i.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Fi, 2))
        ]))
      ])),
      d("div", Qi, [
        d("div", en, [
          (x(), D("svg", {
            onClick: f[7] || (f[7] = (m) => U(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, rn))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Toggle Full Screen",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v
        }, [
          (x(), D("svg", nn, [
            l.value ? (x(), D("path", on)) : (x(), D("path", an))
          ]))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Change View",
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: f[8] || (f[8] = (m) => h.value.length || U(e).emit("vf-view-toggle", s.value == "list" ? "grid" : "list"))
        }, [
          (x(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: he([h.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            s.value == "grid" ? (x(), D("path", sn)) : oe("", !0),
            s.value == "list" ? (x(), D("path", ln)) : oe("", !0)
          ], 2))
        ])
      ])
    ]));
  }
});
var dn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Sr = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(dn, function() {
    function t(u, a) {
      if (!(u instanceof a))
        throw new TypeError("Cannot call a class as a function");
    }
    function n(u, a) {
      for (var r = 0; r < a.length; r++) {
        var p = a[r];
        p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(u, p.key, p);
      }
    }
    function s(u, a, r) {
      return a && n(u.prototype, a), r && n(u, r), u;
    }
    function i(u, a, r) {
      return a in u ? Object.defineProperty(u, a, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : u[a] = r, u;
    }
    function l(u, a) {
      var r = Object.keys(u);
      if (Object.getOwnPropertySymbols) {
        var p = Object.getOwnPropertySymbols(u);
        a && (p = p.filter(function(c) {
          return Object.getOwnPropertyDescriptor(u, c).enumerable;
        })), r.push.apply(r, p);
      }
      return r;
    }
    function h(u) {
      for (var a = 1; a < arguments.length; a++) {
        var r = arguments[a] != null ? arguments[a] : {};
        a % 2 ? l(Object(r), !0).forEach(function(p) {
          i(u, p, r[p]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(r)) : l(Object(r)).forEach(function(p) {
          Object.defineProperty(u, p, Object.getOwnPropertyDescriptor(r, p));
        });
      }
      return u;
    }
    function v(u, a) {
      if (typeof a != "function" && a !== null)
        throw new TypeError("Super expression must either be null or a function");
      u.prototype = Object.create(a && a.prototype, {
        constructor: {
          value: u,
          writable: !0,
          configurable: !0
        }
      }), a && f(u, a);
    }
    function g(u) {
      return g = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, g(u);
    }
    function f(u, a) {
      return f = Object.setPrototypeOf || function(p, c) {
        return p.__proto__ = c, p;
      }, f(u, a);
    }
    function m() {
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
    function y(u, a, r) {
      return m() ? y = Reflect.construct : y = function(c, b, w) {
        var _ = [null];
        _.push.apply(_, b);
        var k = Function.bind.apply(c, _), E = new k();
        return w && f(E, w.prototype), E;
      }, y.apply(null, arguments);
    }
    function T(u) {
      return Function.toString.call(u).indexOf("[native code]") !== -1;
    }
    function C(u) {
      var a = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return C = function(p) {
        if (p === null || !T(p))
          return p;
        if (typeof p != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof a < "u") {
          if (a.has(p))
            return a.get(p);
          a.set(p, c);
        }
        function c() {
          return y(p, arguments, g(this).constructor);
        }
        return c.prototype = Object.create(p.prototype, {
          constructor: {
            value: c,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), f(c, p);
      }, C(u);
    }
    function $(u) {
      if (u === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return u;
    }
    function j(u, a) {
      return a && (typeof a == "object" || typeof a == "function") ? a : $(u);
    }
    function O(u) {
      var a = m();
      return function() {
        var p = g(u), c;
        if (a) {
          var b = g(this).constructor;
          c = Reflect.construct(p, arguments, b);
        } else
          c = p.apply(this, arguments);
        return j(this, c);
      };
    }
    function W(u, a) {
      for (; !Object.prototype.hasOwnProperty.call(u, a) && (u = g(u), u !== null); )
        ;
      return u;
    }
    function H(u, a, r) {
      return typeof Reflect < "u" && Reflect.get ? H = Reflect.get : H = function(c, b, w) {
        var _ = W(c, b);
        if (!!_) {
          var k = Object.getOwnPropertyDescriptor(_, b);
          return k.get ? k.get.call(w) : k.value;
        }
      }, H(u, a, r || u);
    }
    function ie(u, a) {
      return K(u) || A(u, a) || L(u, a) || z();
    }
    function G(u) {
      return S(u) || J(u) || L(u) || Q();
    }
    function S(u) {
      if (Array.isArray(u))
        return P(u);
    }
    function K(u) {
      if (Array.isArray(u))
        return u;
    }
    function J(u) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(u))
        return Array.from(u);
    }
    function A(u, a) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(u)))) {
        var r = [], p = !0, c = !1, b = void 0;
        try {
          for (var w = u[Symbol.iterator](), _; !(p = (_ = w.next()).done) && (r.push(_.value), !(a && r.length === a)); p = !0)
            ;
        } catch (k) {
          c = !0, b = k;
        } finally {
          try {
            !p && w.return != null && w.return();
          } finally {
            if (c)
              throw b;
          }
        }
        return r;
      }
    }
    function L(u, a) {
      if (!!u) {
        if (typeof u == "string")
          return P(u, a);
        var r = Object.prototype.toString.call(u).slice(8, -1);
        if (r === "Object" && u.constructor && (r = u.constructor.name), r === "Map" || r === "Set")
          return Array.from(u);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return P(u, a);
      }
    }
    function P(u, a) {
      (a == null || a > u.length) && (a = u.length);
      for (var r = 0, p = new Array(a); r < a; r++)
        p[r] = u[r];
      return p;
    }
    function Q() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function z() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var Y = function(a, r, p) {
      var c = a.x, b = a.y, w = p.x, _ = p.y, k = {
        "+": {
          x: c + w,
          y: b + _
        },
        "-": {
          x: c - w,
          y: b - _
        },
        "*": {
          x: c * w,
          y: b * _
        },
        "/": {
          x: c / w,
          y: b / _
        }
      };
      return k[r];
    }, X = function(a) {
      return {
        x: a.left,
        y: a.top
      };
    }, ve = function(a) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: a.x,
        top: a.y,
        right: a.x,
        bottom: a.y,
        width: r,
        height: r
      };
    }, Pe = function(a) {
      return {
        x: a,
        y: a
      };
    }, Ye = function(u, a, r) {
      window.addEventListener("resize", a), window.addEventListener("scroll", a), u.forEach(function(p, c) {
        r.observe(p, {
          childList: c !== 0,
          attributes: !0
        });
      });
    }, We = function(u) {
      var a = Ie(u);
      return a.x || a.y ? !0 : u instanceof HTMLDocument ? u.body ? !!(u.body.scrollTop = 1) : !!(u.documentElement.scrollTop = 1) : !!(u.scrollTop = 1);
    }, tt = function(u) {
      var a = document.createElement("div");
      return a.style.position = "fixed", a.style.overflow = "hidden", a.style.pointerEvents = "none", a.style.zIndex = "999999999999999999", a.classList.add(u), a;
    }, rt = function(u) {
      var a = document.createElement("div");
      return a.style.position = "absolute", u || (a.style.background = "rgba(0, 0, 255, 0.1)", a.style.border = "1px solid rgba(0, 0, 255, 0.45)", a.style.display = "none", a.style.pointerEvents = "none"), a;
    }, it = function(u, a) {
      var r;
      return function() {
        for (var p = arguments.length, c = new Array(p), b = 0; b < p; b++)
          c[b] = arguments[b];
        var w = function() {
          r = null, u.apply(void 0, c);
        };
        clearTimeout(r), r = setTimeout(w, a);
      };
    }, je = function() {
      var u, a, r, p;
      return {
        y: ((u = document.body) === null || u === void 0 ? void 0 : u.scrollTop) || ((a = document.documentElement) === null || a === void 0 ? void 0 : a.scrollTop) || 0,
        x: ((r = document.body) === null || r === void 0 ? void 0 : r.scrollLeft) || ((p = document.documentElement) === null || p === void 0 ? void 0 : p.scrollLeft) || 0
      };
    }, pt = function(u, a) {
      if (u instanceof Document)
        return {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      var r = u.getBoundingClientRect();
      return {
        top: r.top,
        left: r.left,
        bottom: r.bottom,
        right: r.right,
        width: (u.clientWidth || r.width) * a,
        height: (u.clientHeight || r.height) * a
      };
    }, Ie = function(u) {
      return !u || u instanceof Document ? je() : {
        x: u.scrollLeft >= 0 ? u.scrollLeft : je().x,
        y: u.scrollTop >= 0 ? u.scrollTop : je().y
      };
    }, Lt = function(u) {
      var a = u.elementRect, r = u.containerRect, p = u.tolerance, c = p === void 0 ? {
        x: 0,
        y: 0
      } : p, b = [];
      return a.top - c.y < r.top && b.push("top"), a.left - c.x < r.left && b.push("left"), a.bottom + c.y > r.bottom && b.push("bottom"), a.right + c.y > r.right && b.push("right"), b;
    }, Br = function(u) {
      var a = u.event;
      return {
        x: a.clientX,
        y: a.clientY
      };
    }, Rr = function(u) {
      var a = u.scrollAmount, r = u.initialPointerPos, p = u.pointerPos, c = {};
      return p.x > r.x - a.x ? (c.left = r.x - a.x, c.width = p.x - r.x + a.x) : (c.left = p.x, c.width = r.x - p.x - a.x), p.y > r.y - a.y ? (c.top = r.y - a.y, c.height = p.y - r.y + a.y) : (c.top = p.y, c.height = r.y - p.y - a.y), c;
    }, Vt = function(a) {
      var r = {
        x: 0,
        y: 0
      }, p = window.getComputedStyle(a);
      if (!p.transform || p.transform === "none")
        return r;
      if (p.transform.indexOf("3d") >= 0) {
        var c = p.transform.trim().match(/matrix3d\((.*?)\)/);
        if (c && c.length) {
          var b, w = (b = c[1]) === null || b === void 0 ? void 0 : b.split(",");
          r.x = parseInt(w[12]) || 0, r.y = parseInt(w[13]) || 0;
        }
        return r;
      } else {
        var _ = p.transform.trim().match(/matrix\((.*?)\)/);
        if (_ && _.length) {
          var k, E = (k = _[1]) === null || k === void 0 ? void 0 : k.split(",");
          r.x = parseInt(E[4]) || 0, r.y = parseInt(E[5]) || 0;
        }
        return r;
      }
    }, Hr = function(a) {
      var r = a.style.transform;
      if (!r || r.indexOf("translate") < 0)
        return Vt(a);
      var p = {
        x: 0,
        y: 0
      }, c = r.trim().match(/translate[3dD]*?\(.*?\)/);
      if (c) {
        var b, w = (b = c[0]) === null || b === void 0 ? void 0 : b.split("(");
        if (w) {
          var _, k = (_ = w[1]) === null || _ === void 0 ? void 0 : _.split(",");
          p.x = parseInt(k[0]) || 0, p.y = parseInt(k[1]) || 0;
        }
      }
      return !p.x && !p.x ? Vt(a) : p;
    }, Kr = function(a) {
      var r = a.style, p = {
        x: parseInt(r.left) || 0,
        y: parseInt(r.top) || 0
      };
      if (!p.x && !p.x) {
        var c = window.getComputedStyle(a);
        return {
          x: parseInt(c.left) || 0,
          y: parseInt(c.top) || 0
        };
      }
      return p;
    }, Ur = function(u, a) {
      return a ? Hr(u) : Kr(u);
    }, Yr = function(u) {
      var a = u.element, r = u.edges, p = u.elementRect, c = u.containerRect, b = u.elementPos, w = u.useTransform;
      r.includes("top") && Xe(a, {
        y: b.y + c.top - p.top,
        x: b.x
      }, w), r.includes("left") && Xe(a, {
        y: b.y,
        x: b.x + c.left - p.left
      }, w), r.includes("bottom") && Xe(a, {
        y: b.y + c.bottom - p.bottom,
        x: b.x
      }, w), r.includes("right") && Xe(a, {
        y: b.y,
        x: b.x + c.right - p.right
      }, w);
    }, zt = function(u) {
      var a = u.computedStyle, r = u.node, p = a.position, c = p === "absolute" || p === "relative" || p === "fixed";
      !(r instanceof HTMLDocument) && !c && (r.style.position = "relative");
    }, Wr = function(u) {
      var a = u.shiftKey, r = u.keyboardDragSpeed, p = u.zoom, c = u.key, b = u.dragKeys, w = u.scrollDiff, _ = u.canScroll, k = u.scrollCallback, E = {
        x: 0,
        y: 0
      }, M = a ? r * 4 * p : r * p;
      return b.left.includes(c) && (E.x = w.x || -M, !a && !w.x && _ && k(["left"], r)), b.right.includes(c) && (E.x = w.x || M, !a && !w.x && _ && k(["right"], r)), b.up.includes(c) && (E.y = w.y || -M, !a && !w.y && _ && k(["top"], r)), b.down.includes(c) && (E.y = w.y || M, !a && !w.y && _ && k(["bottom"], r)), E;
    }, Xr = function(u) {
      var a = u.element, r = u.force, p = u.multiSelectionToggle, c = u.SelectedSet, b = u.hoverClassName;
      a.classList.contains(b) && !r || (c.has(a) ? p && c.delete(a) : c.add(a), a.classList.add(b));
    }, Fr = function(u) {
      var a = u.element, r = u.force, p = u.SelectedSet, c = u.PrevSelectedSet, b = u.hoverClassName;
      if (!a.classList.contains(b) && !r)
        return !1;
      var w = p.has(a), _ = c.has(a);
      w && !_ ? p.delete(a) : !w && _ && p.add(a), a.classList.remove(b);
    }, gt = function(u, a) {
      return u.left < a.right && u.right > a.left && u.top < a.bottom && u.bottom > a.top;
    }, Bt = function(u) {
      var a = u.element, r = u.posDirection, p = u.containerRect, c = u.useTransform, b = Ur(a, c), w = Y(b, "+", r);
      Xe(a, w, c);
      var _ = a.getBoundingClientRect(), k = Lt({
        elementRect: _,
        containerRect: p
      });
      Yr({
        element: a,
        edges: k,
        elementRect: _,
        containerRect: p,
        elementPos: w,
        useTransform: c
      });
    }, qr = function(u, a) {
      window.removeEventListener("resize", a), window.removeEventListener("scroll", a), u.disconnect();
    }, Gr = function(u, a, r) {
      if (!!a.length) {
        var p = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, c = u instanceof HTMLDocument ? p || document.body : u, b = a.includes("top") && c.scrollTop > 0, w = a.includes("bottom") && c.scrollTop < c.scrollHeight, _ = a.includes("left") && c.scrollLeft > 0, k = a.includes("right") && c.scrollLeft < c.scrollWidth;
        b && (c.scrollTop -= 1 * r), w && (c.scrollTop += 1 * r), _ && (c.scrollLeft -= 1 * r), k && (c.scrollLeft += 1 * r);
      }
    }, Xe = function(u, a, r) {
      if (r) {
        var p = u.style.transform;
        u.style.transform = "translate3d(".concat(a.x, "px,").concat(a.y, "px,1px) ").concat(p.replace(/translate.*?\)/g, ""));
      } else
        u.style.left = "".concat(a.x, "px"), u.style.top = "".concat(a.y, "px");
      return u;
    }, Jr = function(u) {
      for (var a = u.subscribe, r = u.publish, p = u.Interaction, c = u.SelectedSet, b = {
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
          condition: function(M) {
            return M.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, w = function() {
        var M = ie(k[_], 2), I = M[0], V = M[1];
        ["pre", !1].forEach(function(Z) {
          return a(Z ? "".concat(I, ":").concat(Z) : I, function(ue) {
            return V.forEach(function(te) {
              return (!te.condition || te.condition(ue)) && r(Z ? "".concat(Z).concat(te.name) : te.name, h({
                items: c.elements,
                isDragging: p.isDragging
              }, ue));
            });
          });
        });
      }, _ = 0, k = Object.entries(b); _ < k.length; _++)
        w();
    }, Ne = function(u) {
      return u ? !Array.isArray(u) && (u instanceof HTMLElement || u instanceof SVGElement) ? [u] : G(u) : [];
    }, Rt = function(u, a) {
      u.style.left = "".concat(a.left, "px"), u.style.top = "".concat(a.top, "px"), u.style.width = "".concat(a.width, "px"), u.style.height = "".concat(a.height, "px");
    }, Zr = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.area, c = a.PS, b = a.zoom;
        t(this, u), i(this, "_modificationCallback", void 0), i(this, "_modificationObserver", void 0), i(this, "_zoom", void 0), i(this, "_node", void 0), i(this, "_parentNodes", void 0), i(this, "_computedStyle", void 0), i(this, "_computedBorder", void 0), i(this, "_rect", void 0), i(this, "setArea", function(w) {
          r._node = w, zt({
            computedStyle: r.computedStyle,
            node: r._node
          }), setTimeout(function() {
            r.PubSub.publish("Area:modified:pre", {
              item: r
            }), r.reset(), r.PubSub.publish("Area:modified", {
              item: r
            });
          });
        }), i(this, "start", function() {
          Ye(r.parentNodes, r._modificationCallback, r._modificationObserver);
        }), i(this, "reset", function() {
          r._computedStyle = void 0, r._rect = void 0, r._computedBorder = void 0, r._parentNodes = void 0;
        }), i(this, "stop", function() {
          qr(r._modificationObserver, r._modificationCallback), r.reset();
        }), i(this, "scroll", function(w, _) {
          var k = {
            scroll_directions: w,
            scroll_multiplier: _
          };
          r.PubSub.publish("Area:scroll:pre", k), Gr(r._node, w, _), r.PubSub.publish("Area:scroll", k);
        }), this._zoom = b, this.PubSub = c, this.setArea(p), this._modificationCallback = it(function(w) {
          r.PubSub.publish("Area:modified:pre", {
            event: w,
            item: r
          }), r.reset(), r.PubSub.publish("Area:modified", {
            event: w,
            item: r
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return s(u, [{
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
          return this._rect ? this._rect : this._rect = pt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var r = function p(c) {
            var b, w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, _ = (b = c[w]) === null || b === void 0 ? void 0 : b.parentNode;
            return _ ? (c.push(_), w++, p(c, w)) : c;
          };
          return this._parentNodes = r([this.HTMLNode]), this._parentNodes;
        }
      }]), u;
    }(), Qr = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, c = a.dragKeys, b = a.draggability, w = a.keyboardDrag, _ = a.keyboardDragSpeed, k = a.useTransform, E = a.zoom;
        t(this, u), i(this, "_useTransform", void 0), i(this, "_prevCursorPos", void 0), i(this, "_prevScrollPos", void 0), i(this, "_elements", []), i(this, "_draggability", void 0), i(this, "_dragKeys", void 0), i(this, "_dragKeysFlat", void 0), i(this, "_keyboardDrag", void 0), i(this, "_keyboardDragSpeed", void 0), i(this, "_zoom", void 0), i(this, "keyboardDrag", function(M) {
          var I = M.event, V = M.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(V) || !r.DS.SelectedSet.size || !r._draggability || r.DS.continue)) {
            var Z = {
              event: I,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:start:pre", "Interaction:start"], Z), r._elements = r.DS.getSelection(), r.handleZIndex(!0);
            var ue = Wr({
              shiftKey: r.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: r._keyboardDragSpeed,
              zoom: r._zoom,
              key: V,
              scrollCallback: r.DS.Area.scroll,
              scrollDiff: r._scrollDiff,
              canScroll: r.DS.stores.ScrollStore.canScroll,
              dragKeys: r._dragKeys
            });
            r._elements.forEach(function(te) {
              return Bt({
                element: te,
                posDirection: ue,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], Z);
          }
        }), i(this, "keyboardEnd", function(M) {
          var I = M.event, V = M.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(V) || !r.DS.SelectedSet.size || !r._draggability)) {
            var Z = {
              event: I,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], Z);
          }
        }), i(this, "start", function(M) {
          var I = M.isDragging, V = M.isDraggingKeyboard;
          !I || V || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), i(this, "stop", function(M) {
          M != null && M.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), i(this, "update", function(M) {
          var I = M.isDragging, V = M.isDraggingKeyboard;
          if (!(!I || !r._elements.length || V || r.DS.continue)) {
            var Z = Y(r._cursorDiff, "+", r._scrollDiff);
            r._elements.forEach(function(ue) {
              return Bt({
                element: ue,
                posDirection: Z,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            });
          }
        }), i(this, "handleZIndex", function(M) {
          r._elements.forEach(function(I) {
            return I.style.zIndex = "".concat((parseInt(I.style.zIndex) || 0) + M ? 9999 : -9998);
          });
        }), this.DS = p, this._useTransform = k, this._keyboardDragSpeed = _, this._keyboardDrag = w, this._zoom = E, this._draggability = b, this._dragKeys = {
          up: c.up.map(function(M) {
            return M.toLowerCase();
          }),
          down: c.down.map(function(M) {
            return M.toLowerCase();
          }),
          left: c.left.map(function(M) {
            return M.toLowerCase();
          }),
          right: c.right.map(function(M) {
            return M.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(G(this._dragKeys.up), G(this._dragKeys.down), G(this._dragKeys.left), G(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return s(u, [{
        key: "_cursorDiff",
        get: function() {
          var r = this.DS.stores.PointerStore.currentVal, p = this._prevCursorPos ? Y(r, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = r, p;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var r = this.DS.stores.ScrollStore.currentVal, p = this._prevScrollPos ? Y(r, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = r, p;
        }
      }]), u;
    }(), ei = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, c = a.areaElement, b = a.draggability, w = a.immediateDrag, _ = a.selectableClass;
        t(this, u), i(this, "_areaElement", void 0), i(this, "_draggability", void 0), i(this, "_immediateDrag", void 0), i(this, "_selectableClass", void 0), i(this, "isInteracting", void 0), i(this, "isDragging", void 0), i(this, "init", function() {
          return r.DS.publish("Interaction:init:pre", {});
        }), i(this, "_init", function() {
          r.stop(), r._areaElement.addEventListener("mousedown", r.start), r._areaElement.addEventListener("touchstart", r.start, {
            passive: !1
          }), r.DS.publish("Interaction:init", {});
        }), i(this, "start", function(k) {
          return r.DS.publish("Interaction:start:pre", {
            event: k,
            isDragging: r.isDragging
          });
        }), i(this, "_start", function(k) {
          k.type === "touchstart" && k.preventDefault(), r._canInteract(k) && (r.isInteracting = !0, r.isDragging = r.isDragEvent(k), r.DS.publish("Interaction:start", {
            event: k,
            isDragging: r.isDragging
          }), document.addEventListener("mouseup", r.reset), document.addEventListener("touchend", r.reset));
        }), i(this, "isDragEvent", function(k) {
          var E = k.target.closest(".".concat(r._selectableClass));
          return !r._draggability || r.DS.stores.KeyStore.isMultiSelectKeyPressed(k) || !E ? !1 : (r._immediateDrag && (r.DS.SelectedSet.size ? r.DS.SelectedSet.has(E) || (r.DS.SelectedSet.clear(), r.DS.SelectedSet.add(
            E
          )) : r.DS.SelectedSet.add(
            E
          )), !!r.DS.SelectedSet.has(E));
        }), i(this, "onClick", function(k) {
          var E = k.event;
          if (!!r._canInteract(E) && !(E.detail > 0)) {
            var M = r.DS, I = M.stores, V = I.PointerStore, Z = I.KeyStore, ue = M.SelectableSet, te = M.SelectedSet;
            V.start(E);
            var Le = E.target;
            !ue.has(Le) || (Z.isMultiSelectKeyPressed(E) || te.clear(), te.toggle(Le), r.reset());
          }
        }), i(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), i(this, "update", function(k) {
          var E = k.event, M = k.scroll_directions, I = k.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: E,
            scroll_directions: M,
            scroll_multiplier: I,
            isDragging: r.isDragging
          });
        }), i(this, "reset", function(k) {
          return r.DS.publish("Interaction:end:pre", {
            event: k,
            isDragging: r.isDragging
          });
        }), i(this, "_reset", function(k) {
          var E = r.isDragging;
          r.stop(), r.init(), r.DS.publish("Interaction:end", {
            event: k,
            isDragging: E
          });
        }), this._areaElement = c, this._draggability = b, this._immediateDrag = w, this._selectableClass = _, this.DS = p, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(k) {
          var E = k.event;
          return r.start(E);
        }), this.DS.subscribe("Interaction:start:pre", function(k) {
          var E = k.event;
          return r._start(E);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(k) {
          var E = k.event;
          return r._reset(E);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return s(u, [{
        key: "_canInteract",
        value: function(r) {
          var p = r.clientX === 0 && r.clientY === 0 && r.detail === 0 && r.target;
          return !(r.button === 2 || this.isInteracting || r.target && !this.DS.SelectorArea.isInside(
            r.target
          ) || !p && !this.DS.SelectorArea.isClicked(r));
        }
      }]), u;
    }(), ti = function u(a) {
      var r = this, p = a.DS;
      t(this, u), i(this, "subscribers", {}), i(this, "subscribe", function(c, b) {
        return Array.isArray(r.subscribers[c]) || (r.subscribers[c] = []), r.subscribers[c].push(b), r.subscribers[c].length - 1;
      }), i(this, "unsubscribe", function(c, b, w) {
        w >= 0 ? r.subscribers[c].splice(w, 1) : b && (r.subscribers[c] = r.subscribers[c].filter(function(_) {
          return _ !== b;
        }));
      }), i(this, "publish", function(c, b) {
        Array.isArray(c) ? c.forEach(function(w) {
          return r._publish(w, b);
        }) : r._publish(c, b);
      }), i(this, "_publish", function(c, b) {
        var w = r.subscribers[c];
        !Array.isArray(w) || (c.includes(":pre") ? r._handlePrePublish(w, b) : r._handlePublish(w, b));
      }), i(this, "_handlePublish", function(c, b) {
        for (var w = 0, _ = c.length; w < _; w++) {
          if (r.DS.stopped)
            return;
          c[w](b);
        }
      }), i(this, "_handlePrePublish", function(c, b) {
        for (var w = c.length; w--; ) {
          if (r.DS.stopped)
            return;
          c[w](b);
        }
      }), this.DS = p;
    }, ri = /* @__PURE__ */ function(u) {
      v(r, u);
      var a = O(r);
      function r(p) {
        var c, b = p.elements, w = p.className, _ = p.hoverClassName, k = p.draggability, E = p.useTransform, M = p.DS;
        return t(this, r), c = a.call(this), i($(c), "_initElements", void 0), i($(c), "_className", void 0), i($(c), "_hoverClassName", void 0), i($(c), "_useTransform", void 0), i($(c), "_draggability", void 0), i($(c), "init", function() {
          return c._initElements.forEach(function(I) {
            return c.add(I);
          });
        }), i($(c), "clear", function() {
          return c.forEach(function(I) {
            return c.delete(I);
          });
        }), i($(c), "_onClick", function(I) {
          return c.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: I
          });
        }), i($(c), "_onPointer", function(I) {
          return c.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: I
          });
        }), i($(c), "addAll", function(I) {
          return I.forEach(function(V) {
            return c.add(V);
          });
        }), i($(c), "deleteAll", function(I) {
          return I.forEach(function(V) {
            return c.delete(V);
          });
        }), c.DS = M, c._initElements = Ne(b), c._className = w, c._hoverClassName = _, c._useTransform = E, c._draggability = k, c.DS.subscribe("Interaction:init", c.init), c;
      }
      return s(r, [{
        key: "add",
        value: function(c) {
          return c.classList.add(this._className), c.addEventListener("click", this._onClick), c.addEventListener("mousedown", this._onPointer), c.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && zt({
            computedStyle: window.getComputedStyle(c),
            node: c
          }), H(g(r.prototype), "add", this).call(this, c);
        }
      }, {
        key: "delete",
        value: function(c) {
          return c.classList.remove(this._className), c.classList.remove(this._hoverClassName), c.removeEventListener("click", this._onClick), c.removeEventListener("mousedown", this._onPointer), c.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), H(g(r.prototype), "delete", this).call(this, c);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ C(Set)), ii = /* @__PURE__ */ function(u) {
      v(r, u);
      var a = O(r);
      function r(p) {
        var c, b = p.className, w = p.DS;
        return t(this, r), c = a.call(this), i($(c), "_className", void 0), i($(c), "clear", function() {
          return c.forEach(function(_) {
            return c.delete(_);
          });
        }), i($(c), "addAll", function(_) {
          return _.forEach(function(k) {
            return c.add(k);
          });
        }), i($(c), "deleteAll", function(_) {
          return _.forEach(function(k) {
            return c.delete(k);
          });
        }), c.DS = w, c._className = b, c;
      }
      return s(r, [{
        key: "add",
        value: function(c) {
          if (!H(g(r.prototype), "has", this).call(this, c)) {
            var b = {
              items: this.elements,
              item: c
            };
            return this.DS.publish("Selected:added:pre", b), H(g(r.prototype), "add", this).call(this, c), c.classList.add(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", b), this;
          }
        }
      }, {
        key: "delete",
        value: function(c) {
          if (!!H(g(r.prototype), "has", this).call(this, c)) {
            var b = {
              items: this.elements,
              item: c
            };
            this.DS.publish("Selected:removed:pre", b);
            var w = H(g(r.prototype), "delete", this).call(this, c);
            return c.classList.remove(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", b), w;
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
    }(/* @__PURE__ */ C(Set)), ni = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, c = a.hoverClassName, b = a.multiSelectToggling;
        t(this, u), i(this, "_prevSelectedSet", void 0), i(this, "_hoverClassName", void 0), i(this, "_multiSelectToggling", void 0), i(this, "start", function(w) {
          var _ = w.event, k = w.isDragging;
          k || (r._storePrevious(_), r._handleInsideSelection(!0, _));
        }), i(this, "update", function(w) {
          var _ = w.isDragging;
          _ || r.DS.continue || r._handleInsideSelection();
        }), i(this, "_handleInsideSelection", function(w, _) {
          for (var k = r.DS, E = k.SelectableSet, M = k.SelectorArea, I = k.Selector, V = E.elements.map(function(ke) {
            return [ke, ke.getBoundingClientRect()];
          }), Z = [], ue = [], te = 0, Le = V.length; te < Le; te++)
            !M.isInside(V[te][0], V[te][1]) || (gt(V[te][1], I.rect) ? Z.push(V[te][0]) : ue.push(V[te][0]));
          var nt = r.DS.stores.KeyStore.isMultiSelectKeyPressed(_) && r._multiSelectToggling;
          r.DS.continue || (Z.forEach(function(ke) {
            return Xr({
              element: ke,
              force: w,
              multiSelectionToggle: nt,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName
            });
          }), ue.forEach(function(ke) {
            return Fr({
              element: ke,
              force: w,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName,
              PrevSelectedSet: r._prevSelectedSet
            });
          }));
        }), this._hoverClassName = c, this._multiSelectToggling = b, this.DS = p, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return s(u, [{
        key: "_storePrevious",
        value: function(r) {
          var p = this.DS, c = p.stores.KeyStore, b = p.SelectedSet;
          c.isMultiSelectKeyPressed(r) ? this._prevSelectedSet = new Set(b) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), u;
    }(), oi = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, c = a.selector, b = a.selectorClass, w = a.customStyles;
        t(this, u), i(this, "_rect", void 0), i(this, "start", function(_) {
          var k = _.isDragging;
          if (!k) {
            var E = r.DS.stores.PointerStore, M = E.initialValArea;
            Rt(r.HTMLNode, ve(M, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), i(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), i(this, "update", function(_) {
          var k = _.isDragging;
          if (!(k || r.DS.continue)) {
            var E = r.DS.stores, M = E.ScrollStore, I = E.PointerStore, V = Rr({
              scrollAmount: M.scrollAmount,
              initialPointerPos: I.initialValArea,
              pointerPos: I.currentValArea
            });
            Rt(r.HTMLNode, V), r._rect = null;
          }
        }), this.DS = p, this.HTMLNode = c || rt(w), this.HTMLNode.classList.add(b), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return s(u, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), u;
    }(), ai = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, c = a.selectorAreaClass, b = a.autoScrollSpeed, w = a.overflowTolerance;
        t(this, u), i(this, "_autoScrollSpeed", void 0), i(this, "_scrollInterval", void 0), i(this, "_rect", void 0), i(this, "currentEdges", []), i(this, "_overflowTolerance", void 0), i(this, "start", function() {
          return r.applyElements("append");
        }), i(this, "applyElements", function() {
          var _ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", k = document.body ? "body" : "documentElement", E = "".concat(_, "Child");
          r.HTMLNode[E](r.DS.Selector.HTMLNode), document[k][E](r.HTMLNode);
        }), i(this, "updatePos", function() {
          r._rect = null;
          var _ = r.DS.Area.rect, k = r.DS.Area.computedBorder, E = r.HTMLNode.style, M = "".concat(_.top + k.top, "px"), I = "".concat(_.left + k.left, "px"), V = "".concat(_.width, "px"), Z = "".concat(_.height, "px");
          E.top !== M && (E.top = M), E.left !== I && (E.left = I), E.width !== V && (E.width = V), E.height !== Z && (E.height = Z);
        }), i(this, "stop", function(_) {
          r.stopAutoScroll(), _ && r.applyElements("remove");
        }), i(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), i(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var _ = r.DS, k = _.stores.PointerStore, E = _.Area;
            r.currentEdges = Lt({
              elementRect: ve(k.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && E.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), i(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), i(this, "isInside", function(_, k) {
          return r.DS.Area.HTMLNode.contains(_) && r.DS.stores.ScrollStore.canScroll ? !0 : gt(r.rect, k || _.getBoundingClientRect());
        }), this._autoScrollSpeed = b, this._overflowTolerance = w, this.DS = p, this.HTMLNode = tt(c), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          r.updatePos(), r.stopAutoScroll();
        });
      }
      return s(u, [{
        key: "isClicked",
        value: function(r) {
          var p = this.DS.stores.PointerStore, c = r ? p.getPointerPosition(r) : p.initialVal;
          return gt({
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
      }]), u;
    }(), si = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, c = a.multiSelectKeys, b = a.multiSelectMode;
        t(this, u), i(this, "_multiSelectMode", void 0), i(this, "_multiSelectKeys", void 0), i(this, "_currentValues", /* @__PURE__ */ new Set()), i(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), i(this, "init", function() {
          document.addEventListener("keydown", r.keydown), document.addEventListener("keyup", r.keyup), window.addEventListener("blur", r.reset);
        }), i(this, "keydown", function(w) {
          var _ = w.key.toLowerCase();
          r.DS.publish("KeyStore:down:pre", {
            event: w,
            key: _
          }), r._currentValues.add(_), r.DS.publish("KeyStore:down", {
            event: w,
            key: _
          });
        }), i(this, "keyup", function(w) {
          var _ = w.key.toLowerCase();
          r.DS.publish("KeyStore:up:pre", {
            event: w,
            key: _
          }), r._currentValues.delete(_), r.DS.publish("KeyStore:up", {
            event: w,
            key: _
          });
        }), i(this, "stop", function() {
          document.removeEventListener("keydown", r.keydown), document.removeEventListener("keyup", r.reset), window.removeEventListener("blur", r.reset), r.reset();
        }), i(this, "reset", function() {
          return r._currentValues.clear();
        }), this.DS = p, this._multiSelectMode = b, this._multiSelectKeys = c.map(function(w) {
          var _ = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, k = _[w];
          return k ? (console.warn("[DragSelect] ".concat(w, ' is deprecated. Use "').concat(k, '" instead. Act Now!. See docs for more info')), k.toLowerCase()) : w.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return s(u, [{
        key: "isMultiSelectKeyPressed",
        value: function(r) {
          var p = this;
          return !!(this._multiSelectMode || this.currentValues.some(function(c) {
            return p._multiSelectKeys.includes(c);
          }) || r && this._multiSelectKeys.some(function(c) {
            return r[p._keyMapping[c]];
          }));
        }
      }, {
        key: "currentValues",
        get: function() {
          return Array.from(this._currentValues.values());
        }
      }]), u;
    }(), li = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS;
        t(this, u), i(this, "_isMouseInteraction", !1), i(this, "_initialValArea", void 0), i(this, "_currentValArea", void 0), i(this, "_lastValArea", void 0), i(this, "_initialVal", void 0), i(this, "_currentVal", void 0), i(this, "_lastVal", void 0), i(this, "_lastTouch", void 0), i(this, "init", function() {
          document.addEventListener("mousemove", r.update), document.addEventListener("touchmove", r.update, {
            passive: !1
          });
        }), i(this, "getPointerPosition", function(c) {
          return Br({
            event: r._normalizedEvent(c)
          });
        }), i(this, "update", function(c) {
          !c || (r.DS.publish("PointerStore:updated:pre", {
            event: c
          }), r.currentVal = r.getPointerPosition(c), r._isMouseInteraction && r.DS.publish("PointerStore:updated", {
            event: c
          }));
        }), i(this, "stop", function() {
          document.removeEventListener("mousemove", r.update), document.removeEventListener("touchmove", r.update, {
            passive: !1
          }), setTimeout(function() {
            return r._isMouseInteraction = !1;
          }, 100);
        }), i(this, "reset", function(c) {
          !c || (r.currentVal = r.lastVal = r.getPointerPosition(c), r.stop(), r.init());
        }), this.DS = p, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(c) {
          var b = c.event;
          return r.start(b);
        }), this.DS.subscribe("Interaction:end", function(c) {
          var b = c.event;
          return r.reset(b);
        });
      }
      return s(u, [{
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
          this._initialVal = r, this._initialValArea = r && Y(r, "-", Y(X(this.DS.Area.rect), "+", X(this.DS.Area.computedBorder)));
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
          this._currentVal = r, this._currentValArea = r && Y(r, "-", Y(X(this.DS.Area.rect), "+", X(this.DS.Area.computedBorder)));
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
          this._lastVal = r, this._lastValArea = r && Y(r, "-", Y(X(this.DS.Area.rect), "+", X(this.DS.Area.computedBorder)));
        }
      }]), u;
    }(), ci = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, c = a.areaElement, b = a.zoom;
        t(this, u), i(this, "_initialVal", void 0), i(this, "_currentVal", void 0), i(this, "_areaElement", void 0), i(this, "_canScroll", void 0), i(this, "init", function() {
          return r._areaElement.addEventListener("scroll", r.update);
        }), i(this, "start", function() {
          r._currentVal = r._initialVal = Ie(r._areaElement), r._areaElement.addEventListener("scroll", r.update);
        }), i(this, "update", function() {
          return r._currentVal = Ie(r._areaElement);
        }), i(this, "stop", function() {
          r._areaElement.removeEventListener("scroll", r.update), r._initialVal = {
            x: 0,
            y: 0
          }, r._canScroll = null;
        }), i(this, "reset", function() {
          r.stop(), r.start();
        }), this._areaElement = c, this.DS = p, this.zoom = b, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return r.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return r.reset();
        });
      }
      return s(u, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = We(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var r = Y(this.currentVal, "-", this.initialVal), p = Pe(this.zoom), c = Y(Y(r, "*", p), "-", r);
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
          return this._currentVal || (this._currentVal = Ie(this._areaElement)), this._currentVal;
        }
      }]), u;
    }(), ui = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.area, c = p === void 0 ? document : p, b = a.selectables, w = b === void 0 ? [] : b, _ = a.autoScrollSpeed, k = _ === void 0 ? 5 : _, E = a.overflowTolerance, M = E === void 0 ? {
          x: 25,
          y: 25
        } : E, I = a.zoom, V = I === void 0 ? 1 : I, Z = a.customStyles, ue = Z === void 0 ? !1 : Z, te = a.multiSelectMode, Le = te === void 0 ? !1 : te, nt = a.multiSelectToggling, ke = nt === void 0 ? !0 : nt, Ht = a.multiSelectKeys, di = Ht === void 0 ? ["Control", "Shift", "Meta"] : Ht, Kt = a.selector, hi = Kt === void 0 ? void 0 : Kt, Ut = a.draggability, vt = Ut === void 0 ? !0 : Ut, Yt = a.immediateDrag, fi = Yt === void 0 ? !0 : Yt, Wt = a.keyboardDrag, mi = Wt === void 0 ? !0 : Wt, pi = a.dragKeys, Xt = a.keyboardDragSpeed, gi = Xt === void 0 ? 10 : Xt, Ft = a.useTransform, qt = Ft === void 0 ? !0 : Ft, Gt = a.hoverClass, Jt = Gt === void 0 ? "ds-hover" : Gt, Zt = a.selectableClass, Qt = Zt === void 0 ? "ds-selectable" : Zt, er = a.selectedClass, vi = er === void 0 ? "ds-selected" : er, tr = a.selectorClass, yi = tr === void 0 ? "ds-selector" : tr, rr = a.selectorAreaClass, bi = rr === void 0 ? "ds-selector-area" : rr, wi = a.callback, xi = a.onDragMove, _i = a.onDragStartBegin, ki = a.onDragStart, Si = a.onElementSelect, Di = a.onElementUnselect;
        t(this, u), i(this, "continue", !1), i(this, "start", function() {
          r.stopped = !1, r.Interaction.init();
        }), i(this, "break", function() {
          return r.continue = !0;
        }), i(this, "getSelection", function() {
          return r.SelectedSet.elements;
        }), i(this, "getSelectables", function() {
          return r.SelectableSet.elements;
        }), i(this, "getInitialCursorPosition", function() {
          return r.stores.PointerStore.initialVal;
        }), i(this, "getCurrentCursorPosition", function() {
          return r.stores.PointerStore.currentVal;
        }), i(this, "getPreviousCursorPosition", function() {
          return r.stores.PointerStore.lastVal;
        }), i(this, "getInitialCursorPositionArea", function() {
          return r.stores.PointerStore.initialValArea;
        }), i(this, "getCurrentCursorPositionArea", function() {
          return r.stores.PointerStore.currentValArea;
        }), i(this, "getPreviousCursorPositionArea", function() {
          return r.stores.PointerStore.lastValArea;
        }), i(this, "isMultiSelect", function(Ci) {
          return r.stores.KeyStore.isMultiSelectKeyPressed(Ci);
        }), i(this, "isDragging", function() {
          return r.Interaction.isDragging;
        }), this.PubSub = new ti({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: wi,
          onDragMove: xi,
          onDragStart: ki,
          onDragStartBegin: _i,
          onElementSelect: Si,
          onElementUnselect: Di
        }), this.stores = {
          PointerStore: new li({
            DS: this
          }),
          ScrollStore: new ci({
            DS: this,
            areaElement: c,
            zoom: V
          }),
          KeyStore: new si({
            DS: this,
            multiSelectKeys: di,
            multiSelectMode: Le
          })
        }, this.Area = new Zr({
          area: c,
          PS: this.PubSub,
          zoom: V
        }), this.Selector = new oi({
          DS: this,
          selector: hi,
          selectorClass: yi,
          customStyles: ue
        }), this.SelectorArea = new ai({
          DS: this,
          selectorAreaClass: bi,
          autoScrollSpeed: k,
          overflowTolerance: M
        }), this.SelectableSet = new ri({
          elements: w,
          DS: this,
          className: Qt,
          hoverClassName: Jt,
          useTransform: qt,
          draggability: vt
        }), this.SelectedSet = new ii({
          DS: this,
          className: vi
        }), this.Selection = new ni({
          DS: this,
          hoverClassName: Jt,
          multiSelectToggling: ke
        }), this.Drag = new Qr({
          DS: this,
          draggability: vt,
          useTransform: qt,
          keyboardDrag: mi,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, pi),
          zoom: V,
          keyboardDragSpeed: gi
        }), this.Interaction = new ei({
          areaElement: c,
          DS: this,
          draggability: vt,
          immediateDrag: fi,
          selectableClass: Qt
        }), Jr({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return r.continue = !1;
        }), this.start();
      }
      return s(u, [{
        key: "_callbacksTemp",
        value: function(r) {
          var p = r.callback, c = r.onDragMove, b = r.onDragStart, w = r.onDragStartBegin, _ = r.onElementSelect, k = r.onElementUnselect, E = function(I, V) {
            return console.warn("[DragSelect] ".concat(I, ' is deprecated. Use DragSelect.subscribe("').concat(V, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          p && (E("callback", "callback"), this.subscribe("callback", function(M) {
            var I = M.items;
            M.item;
            var V = M.event;
            return p(I, V);
          })), c && (E("onDragMove", "dragmove"), this.subscribe("dragmove", function(M) {
            M.items, M.item;
            var I = M.event;
            return c(I);
          })), b && (E("onDragStart", "dragstart"), this.subscribe("dragstart", function(M) {
            M.items, M.item;
            var I = M.event;
            return b(I);
          })), w && (E("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(M) {
            M.items, M.item;
            var I = M.event;
            return w(I);
          })), _ && (E("onElementSelect", "elementselect"), this.subscribe("elementselect", function(M) {
            M.items;
            var I = M.item, V = M.event;
            return _(I, V);
          })), k && (E("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(M) {
            M.items;
            var I = M.item, V = M.event;
            return k(I, V);
          }));
        }
      }, {
        key: "stop",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          c && this.publish("callback", {
            items: this.getSelection()
          }), this.Interaction.stop(), this.Area.stop(), this.Drag.stop(), this.Selector.stop(), this.SelectorArea.stop(r), this.stores.KeyStore.stop(), this.stores.PointerStore.stop(), this.stores.ScrollStore.stop(), r && this.SelectableSet.clear(), p && this.SelectedSet.clear(), this.stopped = !0;
        }
      }, {
        key: "addSelection",
        value: function(r) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.addAll(Ne(r)), c || this.addSelectables(r), p && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(r) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(Ne(r)), c && this.removeSelectables(r), p && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(r) {
          var p = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, b = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return Ne(r).forEach(function(w) {
            return p.SelectedSet.has(w) ? p.removeSelection(r, c, b) : p.addSelection(r, c, b);
          }), c && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "setSelection",
        value: function(r) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.clearSelection(), this.addSelection(r, p, c), this.getSelection();
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
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = Ne(r);
          return this.SelectableSet.addAll(c), p && this.SelectedSet.addAll(c), r;
        }
      }, {
        key: "setSelectables",
        value: function(r) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.removeSelectables(r, p), this.addSelectables(r, c);
        }
      }, {
        key: "removeSelectables",
        value: function(r) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return this.SelectableSet.deleteAll(Ne(r)), p && this.removeSelection(r), r;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var c = p ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), b = r ? p ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : p ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return Y(c, "-", b);
        }
      }]), u;
    }();
    return ui;
  });
})(Sr);
const hn = Sr.exports, fn = (o, e, t, n, s) => (e = Math, t = e.log, n = 1024, s = t(o) / t(n) | 0, o / e.pow(n, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B"), mn = (o, e = "en-US") => new Date(o * 1e3).toLocaleString(e), pn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, gn = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), vn = [
  gn
], yn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, bn = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), wn = [
  bn
], xn = {
  name: "VFSortIcon"
}, at = /* @__PURE__ */ Object.assign(xn, {
  props: { direction: String },
  setup(o) {
    return (e, t) => (x(), D("div", null, [
      o.direction == "down" ? (x(), D("svg", pn, vn)) : oe("", !0),
      o.direction == "up" ? (x(), D("svg", yn, wn)) : oe("", !0)
    ]));
  }
}), _n = ["onClick"], kn = {
  name: "VFToast.vue"
}, Sn = /* @__PURE__ */ Object.assign(kn, {
  setup(o) {
    const e = inject("emitter"), { getStore: t } = inject("storage"), n = N(t("full-screen", !1)), s = (v) => v == "error" ? "text-red-400 border-red-400" : "text-lime-600 border-lime-600", i = N([]), l = (v) => {
      i.value.splice(v, 1);
    }, h = (v) => {
      let g = i.value.findIndex((f) => f.id === v);
      g !== -1 && l(g);
    };
    return e.on("vf-toast-push", (v) => {
      let g = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      v.id = g, i.value.push(v), setTimeout(() => {
        h(g);
      }, 5e3);
    }), (v, g) => (x(), D("div", {
      class: he([n.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      pe(Mi, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: ee(() => [
          (x(!0), D(ae, null, fe(i.value, (f, m) => (x(), D("div", {
            onClick: (y) => l(m),
            key: f,
            class: he([s(f.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 border text-xs rounded cursor-pointer"])
          }, B(f.label), 11, _n))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Dn = { class: "relative flex-auto flex flex-col overflow-hidden" }, Cn = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, Mn = /* @__PURE__ */ Me(" Name "), $n = /* @__PURE__ */ Me(" Size "), En = /* @__PURE__ */ Me(" Date "), Tn = /* @__PURE__ */ Me(" Path "), An = { class: "absolute" }, On = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), Pn = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, jn = ["onDblclick", "onTouchstart", "onContextmenu", "data-type", "data-item", "data-index"], In = { class: "grid grid-cols-12 items-center" }, Nn = { class: "flex col-span-7 items-center" }, Ln = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), zn = [
  Vn
], Bn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Rn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Hn = [
  Rn
], Kn = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Un = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Yn = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Wn = { class: "grid grid-cols-12 items-center" }, Xn = { class: "flex col-span-7 items-center" }, Fn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Gn = [
  qn
], Jn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Qn = [
  Zn
], eo = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, to = { class: "col-span-2 text-center" }, ro = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, io = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], no = { class: "relative" }, oo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ao = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), so = [
  ao
], lo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, co = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), uo = [
  co
], ho = { class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500" }, fo = { class: "break-all" }, mo = {
  name: "VFExplorer"
}, po = /* @__PURE__ */ Object.assign(mo, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { setStore: n, getStore: s } = inject("storage"), i = (A) => A == null ? void 0 : A.substring(0, 3), l = (A) => A.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), h = N(null), v = N(null), g = N(0), f = N(null), m = N(s("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      m.value = !m.value, n("full-screen", m.value);
    });
    const y = N("");
    t.on("vf-search-query", ({ newQuery: A }) => {
      y.value = A, A ? t.emit("vf-fetch", { q: "search", adapter: e.data.adapter, path: e.data.dirname, filter: A }) : t.emit("vf-fetch", { q: "index", adapter: e.data.adapter, path: e.data.dirname });
    });
    let T = null;
    const C = () => {
      T && clearTimeout(T);
    }, $ = (A) => {
      T = setTimeout(() => {
        j(A);
      }, 500);
    }, j = (A) => {
      A.type == "dir" ? (t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.data.adapter, path: A.path })) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: A });
    }, O = ut({ active: !1, column: "", order: "" }), W = (A = !0) => {
      let L = [...e.data.files], P = O.column, Q = O.order == "asc" ? 1 : -1;
      if (!A)
        return L;
      const z = (Y, X) => typeof Y == "string" && typeof X == "string" ? Y.toLowerCase().localeCompare(X.toLowerCase()) : Y < X ? -1 : Y > X ? 1 : 0;
      return O.active && (L = L.slice().sort((Y, X) => z(Y[P], X[P]) * Q)), L;
    }, H = (A) => {
      O.active && O.column == A ? (O.active = O.order == "asc", O.column = A, O.order = "desc") : (O.active = !0, O.column = A, O.order = "asc");
    }, ie = () => f.value.getSelection().map((A) => JSON.parse(A.dataset.item)), G = (A, L) => {
      if (A.altKey || A.ctrlKey || A.metaKey)
        return A.preventDefault(), !1;
      A.dataTransfer.setDragImage(v.value, 0, 15), A.dataTransfer.effectAllowed = "all", A.dataTransfer.dropEffect = "copy", A.dataTransfer.setData("items", JSON.stringify(ie()));
    }, S = (A, L) => {
      A.preventDefault();
      let P = JSON.parse(A.dataTransfer.getData("items"));
      if (P.find((Q) => Q.storage != s("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: P, to: L } });
    }, K = (A, L) => {
      A.preventDefault(), !L || L.type !== "dir" || f.value.getSelection().find((P) => P == A.currentTarget) ? (A.dataTransfer.dropEffect = "none", A.dataTransfer.effectAllowed = "none") : A.dataTransfer.dropEffect = "copy";
    };
    return be(() => {
      f.value = new hn({
        area: h.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => ft(() => {
        f.value.clearSelection(), f.value.setSelectables(document.getElementsByClassName("vf-item"));
      })), f.value.subscribe("predragstart", ({ event: A, isDragging: L }) => {
        if (L)
          g.value = f.value.getSelection().length, f.value.break();
        else {
          const P = A.target.offsetWidth - A.offsetX, Q = A.target.offsetHeight - A.offsetY;
          P < 15 && Q < 15 && (f.value.clearSelection(), f.value.break());
        }
      }), f.value.subscribe("predragmove", ({ isDragging: A }) => {
        A && f.value.break();
      }), f.value.subscribe("callback", ({ items: A, event: L, isDragging: P }) => {
        t.emit("vf-nodes-selected", ie()), g.value = f.value.getSelection().length;
      });
    }), be(() => {
      At(() => e.view, () => t.emit("vf-explorer-update"));
    }), (A, L) => (x(), D("div", Dn, [
      o.view == "list" || y.value.length ? (x(), D("div", Cn, [
        d("div", {
          onClick: L[0] || (L[0] = (P) => H("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          Mn,
          ge(pe(at, {
            direction: O.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, O.active && O.column == "basename"]
          ])
        ]),
        y.value.length ? oe("", !0) : (x(), D("div", {
          key: 0,
          onClick: L[1] || (L[1] = (P) => H("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          $n,
          ge(pe(at, {
            direction: O.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, O.active && O.column == "file_size"]
          ])
        ])),
        y.value.length ? oe("", !0) : (x(), D("div", {
          key: 1,
          onClick: L[2] || (L[2] = (P) => H("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          En,
          ge(pe(at, {
            direction: O.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, O.active && O.column == "last_modified"]
          ])
        ])),
        y.value.length ? (x(), D("div", {
          key: 2,
          onClick: L[3] || (L[3] = (P) => H("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          Tn,
          ge(pe(at, {
            direction: O.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, O.active && O.column == "path"]
          ])
        ])) : oe("", !0)
      ])) : oe("", !0),
      d("div", An, [
        d("div", {
          ref_key: "dragImage",
          ref: v,
          class: "absolute -z-50 -top-96"
        }, [
          On,
          d("div", Pn, B(g.value), 1)
        ], 512)
      ]),
      d("div", {
        style: kr(m.value ? "height: 100%;" : ""),
        class: he([m.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: h,
        onContextmenu: L[7] || (L[7] = Te((P) => U(t).emit("vf-contextmenu-show", { event: P, area: h.value, items: ie() }), ["self", "prevent"]))
      }, [
        y.value.length ? (x(!0), D(ae, { key: 0 }, fe(W(), (P, Q) => (x(), D("div", {
          onDblclick: (z) => j(P),
          onTouchstart: (z) => $(P),
          onTouchend: L[4] || (L[4] = (z) => C()),
          onContextmenu: Te((z) => U(t).emit("vf-contextmenu-show", { event: z, area: h.value, items: ie(), target: P }), ["prevent"]),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": P.type,
          "data-item": JSON.stringify(P),
          "data-index": Q
        }, [
          d("div", In, [
            d("div", Nn, [
              P.type == "dir" ? (x(), D("svg", Ln, zn)) : (x(), D("svg", Bn, Hn)),
              d("span", Kn, B(P.basename), 1)
            ]),
            d("div", Un, B(P.path), 1)
          ])
        ], 40, jn))), 256)) : oe("", !0),
        o.view == "list" && !y.value.length ? (x(!0), D(ae, { key: 1 }, fe(W(), (P, Q) => (x(), D("div", {
          draggable: "true",
          onDblclick: (z) => j(P),
          onTouchstart: (z) => $(P),
          onTouchend: L[5] || (L[5] = (z) => C()),
          onContextmenu: Te((z) => U(t).emit("vf-contextmenu-show", { event: z, area: h.value, items: ie(), target: P }), ["prevent"]),
          onDragstart: (z) => G(z),
          onDragover: (z) => K(z, P),
          onDrop: (z) => S(z, P),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": P.type,
          "data-item": JSON.stringify(P),
          "data-index": Q
        }, [
          d("div", Wn, [
            d("div", Xn, [
              P.type == "dir" ? (x(), D("svg", Fn, Gn)) : (x(), D("svg", Jn, Qn)),
              d("span", eo, B(P.basename), 1)
            ]),
            d("div", to, B(P.file_size ? U(fn)(P.file_size) : ""), 1),
            d("div", ro, B(U(mn)(P.last_modified)), 1)
          ])
        ], 40, Yn))), 256)) : oe("", !0),
        o.view == "grid" && !y.value.length ? (x(!0), D(ae, { key: 2 }, fe(W(!1), (P, Q) => (x(), D("div", {
          draggable: "true",
          onDblclick: (z) => j(P),
          onTouchstart: (z) => $(P),
          onTouchend: L[6] || (L[6] = (z) => C()),
          onContextmenu: Te((z) => U(t).emit("vf-contextmenu-show", { event: z, area: h.value, items: ie(), target: P }), ["prevent"]),
          onDragstart: (z) => G(z),
          onDragover: (z) => K(z, P),
          onDrop: (z) => S(z, P),
          class: "vf-item border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none",
          "data-type": P.type,
          "data-item": JSON.stringify(P),
          "data-index": Q
        }, [
          d("div", null, [
            d("div", no, [
              P.type == "dir" ? (x(), D("svg", oo, so)) : (x(), D("svg", lo, uo)),
              d("div", ho, B(i(P.extension)), 1)
            ]),
            d("span", fo, B(l(P.basename)), 1)
          ])
        ], 40, io))), 256)) : oe("", !0)
      ], 38),
      pe(Sn)
    ]));
  }
}), go = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, vo = { class: "flex leading-5 items-center" }, yo = /* @__PURE__ */ d("div", {
  class: "mx-2",
  "aria-label": "Storage",
  "data-microtip-position": "top",
  role: "tooltip"
}, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-5 w-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "1"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    })
  ])
], -1), bo = ["value"], wo = { class: "ml-3" }, xo = { key: 0 }, _o = { class: "ml-1" }, ko = { class: "flex leading-5 items-center" }, So = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), Do = [
  So
], Co = {
  name: "VFStatusbar"
}, Mo = /* @__PURE__ */ Object.assign(Co, {
  props: {
    data: Object
  },
  setup(o) {
    var g;
    const e = o, t = inject("emitter"), { getStore: n, setStore: s } = inject("storage"), i = N(0), l = N((g = n("adapter")) != null ? g : e.data.adapter), h = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: l.value }), s("adapter", l.value);
    };
    t.on("vf-nodes-selected", (f) => {
      i.value = f.length;
    });
    const v = N("");
    return t.on("vf-search-query", ({ newQuery: f }) => {
      v.value = f;
    }), (f, m) => (x(), D("div", go, [
      d("div", vo, [
        yo,
        ge(d("select", {
          "onUpdate:modelValue": m[0] || (m[0] = (y) => l.value = y),
          onChange: h,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (x(!0), D(ae, null, fe(o.data.storages, (y) => (x(), D("option", { value: y }, B(y), 9, bo))), 256))
        ], 544), [
          [$i, l.value]
        ]),
        d("div", wo, [
          v.value.length ? (x(), D("span", xo, B(o.data.files.length) + " items found. ", 1)) : oe("", !0),
          d("span", _o, B(i.value > 0 ? i.value + " items selected." : ""), 1)
        ])
      ]),
      d("div", ko, [
        d("span", {
          onClick: m[1] || (m[1] = (y) => U(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: "Vuefinder is a file manager component for vue 3." }))
        }, Do)
      ])
    ]));
  }
}), $o = (o, e = 0, t = !1) => {
  let n;
  return (...s) => {
    t && !n && o(...s), clearTimeout(n), n = setTimeout(() => {
      o(...s);
    }, e);
  };
}, Eo = (o, e, t) => {
  const n = N(o);
  return Ei((i, l) => ({
    get() {
      return i(), n.value;
    },
    set: $o(
      (h) => {
        n.value = h, l();
      },
      e,
      t
    )
  }));
}, To = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Ao = {
  "aria-label": "Go up a directory",
  "data-microtip-position": "bottom-right",
  role: "tooltip"
}, Oo = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Po = [
  Oo
], jo = ["onClick"], Io = /* @__PURE__ */ d("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), No = [
  Io
], Lo = { class: "flex leading-5" }, Vo = /* @__PURE__ */ d("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), zo = ["title", "onClick"], Bo = {
  key: 1,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, Ro = /* @__PURE__ */ d("svg", {
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
  })
], -1), Ho = ["onKeydown"], Ko = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), Uo = [
  Ko
], Yo = {
  name: "VFBreadcrumb"
}, Wo = /* @__PURE__ */ Object.assign(Yo, {
  props: {
    data: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = N(null), i = N([]), l = N(!1), h = N(null);
    t.on("vf-explorer-update", () => {
      var j;
      let C = [], $ = [];
      s.value = (j = e.data.dirname) != null ? j : n("adapter", "local") + "://", s.value.length == 0 && (i.value = []), s.value.replace(n("adapter", "local") + "://", "").split("/").forEach(function(O) {
        C.push(O), C.join("/") != "" && $.push({
          basename: O,
          name: O,
          path: n("adapter", "local") + "://" + C.join("/"),
          type: "dir"
        });
      }), $.length > 4 && ($ = $.slice(-5), $[0].name = ".."), i.value = $;
    });
    const v = () => {
      l.value = !1, f.value = "";
    };
    t.on("vf-search-exit", () => {
      v();
    });
    const g = () => {
      l.value = !0, ft(() => h.value.focus());
    }, f = Eo("", 400);
    At(f, (C) => {
      t.emit("vf-search-query", { newQuery: C });
    });
    const m = () => i.value.length && !l.value, y = (C) => {
      var j;
      C.preventDefault();
      let $ = JSON.parse(C.dataTransfer.getData("items"));
      if ($.find((O) => O.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: $, to: (j = i.value[i.value.length - 2]) != null ? j : { path: n("adapter", "local") + "://" } }
      });
    }, T = (C) => {
      C.preventDefault(), m() ? C.dataTransfer.dropEffect = "copy" : (C.dataTransfer.dropEffect = "none", C.dataTransfer.effectAllowed = "none");
    };
    return (C, $) => (x(), D("div", To, [
      d("span", Ao, [
        (x(), D("svg", {
          onDragover: $[0] || ($[0] = (j) => T(j)),
          onDrop: $[1] || ($[1] = (j) => y(j)),
          onClick: $[2] || ($[2] = (j) => {
            var O, W;
            return !m() || U(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: (W = (O = i.value[i.value.length - 2]) == null ? void 0 : O.path) != null ? W : U(n)("adapter", "local") + "://" });
          }),
          class: he(["h-6 w-6 p-0.5 rounded", m() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Po, 34))
      ]),
      l.value ? (x(), D("div", Bo, [
        Ro,
        ge(d("input", {
          ref_key: "searchInput",
          ref: h,
          onKeydown: Ke(v, ["esc"]),
          "onUpdate:modelValue": $[4] || ($[4] = (j) => Ti(f) ? f.value = j : null),
          placeholder: "Search anything..",
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, Ho), [
          [Ue, U(f)]
        ]),
        (x(), D("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: v,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, Uo))
      ])) : (x(), D("div", {
        key: 0,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Te(g, ["self"])
      }, [
        (x(), D("svg", {
          onClick: $[3] || ($[3] = (j) => U(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, No)),
        d("div", Lo, [
          (x(!0), D(ae, null, fe(i.value, (j, O) => (x(), D("div", { key: O }, [
            Vo,
            d("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: j.basename,
              onClick: (W) => U(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: j.path })
            }, B(j.name), 9, zo)
          ]))), 128))
        ])
      ], 8, jo))
    ]));
  }
}), Oe = (o) => Object.entries(o).map((e) => e.map(encodeURIComponent).join("=")).join("&"), Xo = ["onClick"], Fo = /* @__PURE__ */ d("span", { class: "px-1" }, null, -1), qo = {
  name: "VFContextMenu"
}, Go = /* @__PURE__ */ Object.assign(qo, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), n = N(null), { apiUrl: s } = _e(), i = ut({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), l = N([]);
    t.on("vf-context-selected", (m) => {
      l.value = m;
    });
    const h = {
      newfolder: {
        title: "New Folder",
        action: () => {
          t.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: "Delete",
        action: () => {
          t.emit("vf-modal-show", { type: "delete", items: l });
        }
      },
      refresh: {
        title: "Refresh",
        action: () => {
          t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: e.current.dirname });
        }
      },
      preview: {
        title: "Preview",
        action: () => {
          t.emit("vf-modal-show", { type: "preview", adapter: e.current.adapter, item: l.value[0] });
        }
      },
      open: {
        title: "Open",
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: l.value[0].path });
        }
      },
      openDir: {
        title: "Open containing folder",
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: l.value[0].dir });
        }
      },
      download: {
        title: "Download",
        action: () => {
          const m = s.value + "?" + Oe({ q: "download", adapter: l.value[0].adapter, path: l.value[0].path });
          t.emit("vf-download", m);
        }
      },
      archive: {
        title: "Archive",
        action: () => {
          t.emit("vf-modal-show", { type: "archive", items: l });
        }
      },
      unarchive: {
        title: "Unarchive",
        action: () => {
          t.emit("vf-modal-show", { type: "unarchive", items: l });
        }
      },
      rename: {
        title: "Rename",
        action: () => {
          t.emit("vf-modal-show", { type: "rename", items: l });
        }
      }
    }, v = (m) => {
      t.emit("vf-contextmenu-hide"), m.action();
    }, g = N("");
    t.on("vf-search-query", ({ newQuery: m }) => {
      g.value = m;
    }), t.on("vf-contextmenu-show", ({ event: m, area: y, items: T, target: C = null }) => {
      i.items = [], !C && !g.value ? (i.items.push(h.refresh), i.items.push(h.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")) : T.length > 1 && T.some(($) => $.path === C.path) ? (i.items.push(h.refresh), i.items.push(h.archive), i.items.push(h.delete), t.emit("vf-context-selected", T), console.log(T.length + " selected (more than 1 item.)")) : C && g.value ? (i.items.push(h.openDir), t.emit("vf-context-selected", [C])) : (C.type == "dir" ? i.items.push(h.open) : i.items.push(h.preview), i.items.push(h.rename), i.items.push(h.download), C.mime_type == "application/zip" ? i.items.push(h.unarchive) : i.items.push(h.archive), i.items.push(h.delete), t.emit("vf-context-selected", [C]), console.log(C.type + " is selected")), f(m, y);
    }), t.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const f = (m, y) => {
      i.active = !0, ft(() => {
        let T = y.getBoundingClientRect(), C = m.pageX, $ = m.pageY, j = n.value.offsetHeight, O = n.value.offsetWidth;
        C = T.right - m.pageX + window.scrollX < O ? C - O : C, $ = T.bottom - m.pageY + window.scrollY < j ? $ - j : $, i.positions = {
          left: C + "px",
          top: $ + "px"
        };
      });
    };
    return (m, y) => i.active ? (x(), D("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: n,
      style: kr(i.positions)
    }, [
      (x(!0), D(ae, null, fe(i.items, (T) => (x(), D("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: T.title,
        onClick: (C) => v(T)
      }, [
        Fo,
        d("span", null, B(T.title), 1)
      ], 8, Xo))), 128))
    ], 4)) : oe("", !0);
  }
}), Jo = /* @__PURE__ */ d("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), Zo = {
  name: "VueFinder"
}, Qo = /* @__PURE__ */ Object.assign(Zo, {
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
    }
  },
  setup(o) {
    const e = o, t = Oi();
    ir("emitter", t);
    const { setStore: n, getStore: s } = or(e.id);
    ir("storage", or(e.id));
    const { apiUrl: i, setApiUrl: l } = _e();
    l(e.url);
    const h = ut({ adapter: "local", storages: [], dirname: ".", files: [] }), v = N(s("viewport", "grid")), g = N(s("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      g.value = !g.value, n("darkMode", g.value);
    });
    const f = N(s("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      f.value = !f.value, n("full-screen", f.value);
    }), t.on("vf-view-toggle", (T) => {
      v.value = T;
    });
    const m = ut({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      m.active = !1;
    }), t.on("vf-modal-show", (T) => {
      m.active = !0, m.type = T.type, m.data = T;
    });
    const y = (T) => {
      Object.assign(h, T), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update");
    };
    return t.on("vf-fetch", (T) => {
      dt(i.value, { params: T }).then((C) => {
        t.emit("vf-modal-close"), y(C);
      });
    }), t.on("vf-download", (T) => {
      document.getElementById("download_frame").src = T, t.emit("vf-modal-close");
    }), be(() => {
      t.emit("vf-fetch", { q: "index", adapter: s("adapter", h.adapter) });
    }), (T, C) => (x(), D("div", {
      class: he(g.value ? "dark" : "")
    }, [
      d("div", {
        class: he([f.value ? "fixed w-screen inset-0 z-20" : "relative", "border flex flex-col rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        onMousedown: C[0] || (C[0] = ($) => U(t).emit("vf-contextmenu-hide"))
      }, [
        pe(un, { data: h }, null, 8, ["data"]),
        pe(Wo, { data: h }, null, 8, ["data"]),
        pe(po, {
          view: v.value,
          data: h
        }, null, 8, ["view", "data"]),
        pe(Mo, { data: h }, null, 8, ["data"])
      ], 34),
      m.active ? (x(), se(Ai("v-f-modal-" + m.type), {
        key: 0,
        selection: m.data,
        current: h
      }, null, 8, ["selection", "current"])) : oe("", !0),
      pe(Go, { current: h }, null, 8, ["current"]),
      Jo
    ], 2));
  }
}), ea = /* @__PURE__ */ d("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), ta = { class: "fixed z-10 inset-0 overflow-y-auto" }, ra = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, ia = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, na = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, xe = {
  __name: "ModalLayout",
  setup(o) {
    const e = inject("emitter");
    return be(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, n) => (x(), D("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: n[1] || (n[1] = Ke((s) => U(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      ea,
      d("div", ta, [
        d("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = Te((s) => U(e).emit("vf-modal-close"), ["self"]))
        }, [
          d("div", ra, [
            d("div", ia, [
              nr(t.$slots, "default")
            ]),
            d("div", na, [
              nr(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, oa = { class: "sm:flex sm:items-start" }, aa = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), sa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, la = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Delete files", -1), ca = { class: "mt-2" }, ua = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500" }, "Are you sure you want to delete these files?", -1), da = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ha = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fa = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ma = [
  fa
], pa = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ga = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), va = [
  ga
], ya = { class: "ml-1.5" }, ba = /* @__PURE__ */ d("div", { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, "This action cannot be undone.", -1), wa = {
  name: "VFModalDelete"
}, xa = /* @__PURE__ */ Object.assign(wa, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = N(e.selection.items), i = () => {
      s.value.length && t.emit("vf-fetch", {
        q: "delete",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(s.value.map(({ path: l, type: h }) => ({ path: l, type: h })))
      });
    };
    return (l, h) => (x(), se(xe, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, delete!"),
        d("button", {
          type: "button",
          onClick: h[0] || (h[0] = (v) => U(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel"),
        ba
      ]),
      default: ee(() => [
        d("div", oa, [
          aa,
          d("div", sa, [
            la,
            d("div", ca, [
              ua,
              (x(!0), D(ae, null, fe(s.value, (v) => (x(), D("p", da, [
                v.type == "dir" ? (x(), D("svg", ha, ma)) : (x(), D("svg", pa, va)),
                d("span", ya, B(v.basename), 1)
              ]))), 256))
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), _a = { class: "sm:flex sm:items-start" }, ka = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), Sa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Da = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ca = { class: "mt-2" }, Ma = { class: "text-sm text-gray-500" }, $a = {
  name: "VFModalMessage"
}, Ea = /* @__PURE__ */ Object.assign($a, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = inject("emitter");
    return (t, n) => (x(), se(xe, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: n[0] || (n[0] = (s) => U(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close")
      ]),
      default: ee(() => {
        var s, i, l, h;
        return [
          d("div", _a, [
            ka,
            d("div", Sa, [
              d("h3", Da, B((i = (s = o.selection) == null ? void 0 : s.title) != null ? i : "Title"), 1),
              d("div", Ca, [
                d("p", Ma, B((h = (l = o.selection) == null ? void 0 : l.message) != null ? h : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), Ta = { class: "sm:flex sm:items-start" }, Aa = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), Oa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Pa = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New Folder", -1), ja = { class: "mt-2" }, Ia = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500" }, "Create a new folder", -1), Na = ["onKeyup"], La = {
  name: "VFModalNewFolder"
}, Va = /* @__PURE__ */ Object.assign(La, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = N(""), i = () => {
      s.value != "" && (t.emit("vf-fetch", {
        q: "newfolder",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: s.value
      }), t.emit("vf-toast-push", { label: "New Folder is created successfully", type: "success" }));
    };
    return (l, h) => (x(), se(xe, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (v) => U(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: ee(() => [
        d("div", Ta, [
          Aa,
          d("div", Oa, [
            Pa,
            d("div", ja, [
              Ia,
              ge(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (v) => s.value = v),
                onKeyup: Ke(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Folder Name",
                type: "text"
              }, null, 40, Na), [
                [Ue, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), za = { class: "sm:flex sm:items-start" }, Ba = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), Ra = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ha = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New File", -1), Ka = { class: "mt-2" }, Ua = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500" }, "Create a new file", -1), Ya = ["onKeyup"], Wa = {
  name: "VFModalNewFile"
}, Xa = /* @__PURE__ */ Object.assign(Wa, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = N(""), i = () => {
      s.value != "" && t.emit("vf-fetch", {
        q: "newfile",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: s.value
      });
    };
    return (l, h) => (x(), se(xe, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (v) => U(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: ee(() => [
        d("div", za, [
          Ba,
          d("div", Ra, [
            Ha,
            d("div", Ka, [
              Ua,
              ge(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (v) => s.value = v),
                onKeyup: Ke(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "File Name",
                type: "text"
              }, null, 40, Ya), [
                [Ue, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fa = { class: "flex" }, qa = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ga = { class: "ml-auto mb-2" }, Ja = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, Za = { key: 1 }, Qa = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, n = N(""), s = N(""), i = N(null), l = N(!1), { apiUrl: h } = _e();
    be(() => {
      dt(h.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((f) => {
        n.value = f, e("load");
      });
    });
    const v = () => {
      l.value = !l.value, s.value = n.value, l.value == !0 && ft(() => {
        i.value.focus();
      });
    }, g = () => {
      dt(h.value, {
        method: "POST",
        params: { q: "save", adapter: t.selection.adapter, path: t.selection.item.path, content: s.value },
        json: !1
      }).then((f) => {
        n.value = f, e("load"), l.value = !l.value;
      }).catch((f) => console.log(f.statusText));
    };
    return (f, m) => (x(), D(ae, null, [
      d("div", Fa, [
        d("div", qa, B(o.selection.item.basename), 1),
        d("div", Ga, [
          l.value ? (x(), D("button", {
            key: 0,
            onClick: g,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Save")) : oe("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: m[0] || (m[0] = (y) => v())
          }, B(l.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      d("div", null, [
        l.value ? (x(), D("div", Za, [
          ge(d("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": m[1] || (m[1] = (y) => s.value = y),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Ue, s.value]
          ])
        ])) : (x(), D("pre", Ja, B(n.value), 1))
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
function sr(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    e && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(o, s).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Dr(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? sr(Object(t), !0).forEach(function(n) {
      rs(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : sr(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function ct(o) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ct = function(e) {
    return typeof e;
  } : ct = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ct(o);
}
function es(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function lr(o, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(o, n.key, n);
  }
}
function ts(o, e, t) {
  return e && lr(o.prototype, e), t && lr(o, t), o;
}
function rs(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function Cr(o) {
  return is(o) || ns(o) || os(o) || as();
}
function is(o) {
  if (Array.isArray(o))
    return _t(o);
}
function ns(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null)
    return Array.from(o);
}
function os(o, e) {
  if (!!o) {
    if (typeof o == "string")
      return _t(o, e);
    var t = Object.prototype.toString.call(o).slice(8, -1);
    if (t === "Object" && o.constructor && (t = o.constructor.name), t === "Map" || t === "Set")
      return Array.from(o);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return _t(o, e);
  }
}
function _t(o, e) {
  (e == null || e > o.length) && (e = o.length);
  for (var t = 0, n = new Array(e); t < e; t++)
    n[t] = o[t];
  return n;
}
function as() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var mt = typeof window < "u" && typeof window.document < "u", we = mt ? window : {}, Ot = mt && we.document.documentElement ? "ontouchstart" in we.document.documentElement : !1, Pt = mt ? "PointerEvent" in we : !1, F = "cropper", jt = "all", Mr = "crop", $r = "move", Er = "zoom", $e = "e", Ee = "w", Ve = "s", Se = "n", Fe = "ne", qe = "nw", Ge = "se", Je = "sw", kt = "".concat(F, "-crop"), cr = "".concat(F, "-disabled"), ce = "".concat(F, "-hidden"), ur = "".concat(F, "-hide"), ss = "".concat(F, "-invisible"), ht = "".concat(F, "-modal"), St = "".concat(F, "-move"), Qe = "".concat(F, "Action"), st = "".concat(F, "Preview"), It = "crop", Tr = "move", Ar = "none", Dt = "crop", Ct = "cropend", Mt = "cropmove", $t = "cropstart", dr = "dblclick", ls = Ot ? "touchstart" : "mousedown", cs = Ot ? "touchmove" : "mousemove", us = Ot ? "touchend touchcancel" : "mouseup", hr = Pt ? "pointerdown" : ls, fr = Pt ? "pointermove" : cs, mr = Pt ? "pointerup pointercancel" : us, pr = "ready", gr = "resize", vr = "wheel", Et = "zoom", yr = "image/jpeg", ds = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, hs = /^data:/, fs = /^data:image\/jpeg;base64,/, ms = /^img|canvas$/i, Or = 200, Pr = 100, br = {
  viewMode: 0,
  dragMode: It,
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
  minContainerWidth: Or,
  minContainerHeight: Pr,
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, ps = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', gs = Number.isNaN || we.isNaN;
function R(o) {
  return typeof o == "number" && !gs(o);
}
var wr = function(e) {
  return e > 0 && e < 1 / 0;
};
function bt(o) {
  return typeof o > "u";
}
function Ae(o) {
  return ct(o) === "object" && o !== null;
}
var vs = Object.prototype.hasOwnProperty;
function ze(o) {
  if (!Ae(o))
    return !1;
  try {
    var e = o.constructor, t = e.prototype;
    return e && t && vs.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function le(o) {
  return typeof o == "function";
}
var ys = Array.prototype.slice;
function jr(o) {
  return Array.from ? Array.from(o) : ys.call(o);
}
function re(o, e) {
  return o && le(e) && (Array.isArray(o) || R(o.length) ? jr(o).forEach(function(t, n) {
    e.call(o, t, n, o);
  }) : Ae(o) && Object.keys(o).forEach(function(t) {
    e.call(o, o[t], t, o);
  })), o;
}
var q = Object.assign || function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
    n[s - 1] = arguments[s];
  return Ae(e) && n.length > 0 && n.forEach(function(i) {
    Ae(i) && Object.keys(i).forEach(function(l) {
      e[l] = i[l];
    });
  }), e;
}, bs = /\.\d*(?:0|9){12}\d*$/;
function Re(o) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return bs.test(o) ? Math.round(o * e) / e : o;
}
var ws = /^width|height|left|top|marginLeft|marginTop$/;
function De(o, e) {
  var t = o.style;
  re(e, function(n, s) {
    ws.test(s) && R(n) && (n = "".concat(n, "px")), t[s] = n;
  });
}
function xs(o, e) {
  return o.classList ? o.classList.contains(e) : o.className.indexOf(e) > -1;
}
function ne(o, e) {
  if (!!e) {
    if (R(o.length)) {
      re(o, function(n) {
        ne(n, e);
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
function ye(o, e) {
  if (!!e) {
    if (R(o.length)) {
      re(o, function(t) {
        ye(t, e);
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
function Be(o, e, t) {
  if (!!e) {
    if (R(o.length)) {
      re(o, function(n) {
        Be(n, e, t);
      });
      return;
    }
    t ? ne(o, e) : ye(o, e);
  }
}
var _s = /([a-z\d])([A-Z])/g;
function Nt(o) {
  return o.replace(_s, "$1-$2").toLowerCase();
}
function Tt(o, e) {
  return Ae(o[e]) ? o[e] : o.dataset ? o.dataset[e] : o.getAttribute("data-".concat(Nt(e)));
}
function et(o, e, t) {
  Ae(t) ? o[e] = t : o.dataset ? o.dataset[e] = t : o.setAttribute("data-".concat(Nt(e)), t);
}
function ks(o, e) {
  if (Ae(o[e]))
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
    o.removeAttribute("data-".concat(Nt(e)));
}
var Ir = /\s\s*/, Nr = function() {
  var o = !1;
  if (mt) {
    var e = !1, t = function() {
    }, n = Object.defineProperty({}, "once", {
      get: function() {
        return o = !0, e;
      },
      set: function(i) {
        e = i;
      }
    });
    we.addEventListener("test", t, n), we.removeEventListener("test", t, n);
  }
  return o;
}();
function me(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, s = t;
  e.trim().split(Ir).forEach(function(i) {
    if (!Nr) {
      var l = o.listeners;
      l && l[i] && l[i][t] && (s = l[i][t], delete l[i][t], Object.keys(l[i]).length === 0 && delete l[i], Object.keys(l).length === 0 && delete o.listeners);
    }
    o.removeEventListener(i, s, n);
  });
}
function de(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, s = t;
  e.trim().split(Ir).forEach(function(i) {
    if (n.once && !Nr) {
      var l = o.listeners, h = l === void 0 ? {} : l;
      s = function() {
        delete h[i][t], o.removeEventListener(i, s, n);
        for (var g = arguments.length, f = new Array(g), m = 0; m < g; m++)
          f[m] = arguments[m];
        t.apply(o, f);
      }, h[i] || (h[i] = {}), h[i][t] && o.removeEventListener(i, h[i][t], n), h[i][t] = s, o.listeners = h;
    }
    o.addEventListener(i, s, n);
  });
}
function He(o, e, t) {
  var n;
  return le(Event) && le(CustomEvent) ? n = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (n = document.createEvent("CustomEvent"), n.initCustomEvent(e, !0, !0, t)), o.dispatchEvent(n);
}
function Lr(o) {
  var e = o.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var wt = we.location, Ss = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function xr(o) {
  var e = o.match(Ss);
  return e !== null && (e[1] !== wt.protocol || e[2] !== wt.hostname || e[3] !== wt.port);
}
function _r(o) {
  var e = "timestamp=".concat(new Date().getTime());
  return o + (o.indexOf("?") === -1 ? "?" : "&") + e;
}
function Ze(o) {
  var e = o.rotate, t = o.scaleX, n = o.scaleY, s = o.translateX, i = o.translateY, l = [];
  R(s) && s !== 0 && l.push("translateX(".concat(s, "px)")), R(i) && i !== 0 && l.push("translateY(".concat(i, "px)")), R(e) && e !== 0 && l.push("rotate(".concat(e, "deg)")), R(t) && t !== 1 && l.push("scaleX(".concat(t, ")")), R(n) && n !== 1 && l.push("scaleY(".concat(n, ")"));
  var h = l.length ? l.join(" ") : "none";
  return {
    WebkitTransform: h,
    msTransform: h,
    transform: h
  };
}
function Ds(o) {
  var e = Dr({}, o), t = 0;
  return re(o, function(n, s) {
    delete e[s], re(e, function(i) {
      var l = Math.abs(n.startX - i.startX), h = Math.abs(n.startY - i.startY), v = Math.abs(n.endX - i.endX), g = Math.abs(n.endY - i.endY), f = Math.sqrt(l * l + h * h), m = Math.sqrt(v * v + g * g), y = (m - f) / f;
      Math.abs(y) > Math.abs(t) && (t = y);
    });
  }), t;
}
function lt(o, e) {
  var t = o.pageX, n = o.pageY, s = {
    endX: t,
    endY: n
  };
  return e ? s : Dr({
    startX: t,
    startY: n
  }, s);
}
function Cs(o) {
  var e = 0, t = 0, n = 0;
  return re(o, function(s) {
    var i = s.startX, l = s.startY;
    e += i, t += l, n += 1;
  }), e /= n, t /= n, {
    pageX: e,
    pageY: t
  };
}
function Ce(o) {
  var e = o.aspectRatio, t = o.height, n = o.width, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", i = wr(n), l = wr(t);
  if (i && l) {
    var h = t * e;
    s === "contain" && h > n || s === "cover" && h < n ? t = n / e : n = t * e;
  } else
    i ? t = n / e : l && (n = t * e);
  return {
    width: n,
    height: t
  };
}
function Ms(o) {
  var e = o.width, t = o.height, n = o.degree;
  if (n = Math.abs(n) % 180, n === 90)
    return {
      width: t,
      height: e
    };
  var s = n % 90 * Math.PI / 180, i = Math.sin(s), l = Math.cos(s), h = e * l + t * i, v = e * i + t * l;
  return n > 90 ? {
    width: v,
    height: h
  } : {
    width: h,
    height: v
  };
}
function $s(o, e, t, n) {
  var s = e.aspectRatio, i = e.naturalWidth, l = e.naturalHeight, h = e.rotate, v = h === void 0 ? 0 : h, g = e.scaleX, f = g === void 0 ? 1 : g, m = e.scaleY, y = m === void 0 ? 1 : m, T = t.aspectRatio, C = t.naturalWidth, $ = t.naturalHeight, j = n.fillColor, O = j === void 0 ? "transparent" : j, W = n.imageSmoothingEnabled, H = W === void 0 ? !0 : W, ie = n.imageSmoothingQuality, G = ie === void 0 ? "low" : ie, S = n.maxWidth, K = S === void 0 ? 1 / 0 : S, J = n.maxHeight, A = J === void 0 ? 1 / 0 : J, L = n.minWidth, P = L === void 0 ? 0 : L, Q = n.minHeight, z = Q === void 0 ? 0 : Q, Y = document.createElement("canvas"), X = Y.getContext("2d"), ve = Ce({
    aspectRatio: T,
    width: K,
    height: A
  }), Pe = Ce({
    aspectRatio: T,
    width: P,
    height: z
  }, "cover"), Ye = Math.min(ve.width, Math.max(Pe.width, C)), We = Math.min(ve.height, Math.max(Pe.height, $)), tt = Ce({
    aspectRatio: s,
    width: K,
    height: A
  }), rt = Ce({
    aspectRatio: s,
    width: P,
    height: z
  }, "cover"), it = Math.min(tt.width, Math.max(rt.width, i)), je = Math.min(tt.height, Math.max(rt.height, l)), pt = [-it / 2, -je / 2, it, je];
  return Y.width = Re(Ye), Y.height = Re(We), X.fillStyle = O, X.fillRect(0, 0, Ye, We), X.save(), X.translate(Ye / 2, We / 2), X.rotate(v * Math.PI / 180), X.scale(f, y), X.imageSmoothingEnabled = H, X.imageSmoothingQuality = G, X.drawImage.apply(X, [o].concat(Cr(pt.map(function(Ie) {
    return Math.floor(Re(Ie));
  })))), X.restore(), Y;
}
var Vr = String.fromCharCode;
function Es(o, e, t) {
  var n = "";
  t += e;
  for (var s = e; s < t; s += 1)
    n += Vr(o.getUint8(s));
  return n;
}
var Ts = /^data:.*,/;
function As(o) {
  var e = o.replace(Ts, ""), t = atob(e), n = new ArrayBuffer(t.length), s = new Uint8Array(n);
  return re(s, function(i, l) {
    s[l] = t.charCodeAt(l);
  }), n;
}
function Os(o, e) {
  for (var t = [], n = 8192, s = new Uint8Array(o); s.length > 0; )
    t.push(Vr.apply(null, jr(s.subarray(0, n)))), s = s.subarray(n);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function Ps(o) {
  var e = new DataView(o), t;
  try {
    var n, s, i;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var l = e.byteLength, h = 2; h + 1 < l; ) {
        if (e.getUint8(h) === 255 && e.getUint8(h + 1) === 225) {
          s = h;
          break;
        }
        h += 1;
      }
    if (s) {
      var v = s + 4, g = s + 10;
      if (Es(e, v, 4) === "Exif") {
        var f = e.getUint16(g);
        if (n = f === 18761, (n || f === 19789) && e.getUint16(g + 2, n) === 42) {
          var m = e.getUint32(g + 4, n);
          m >= 8 && (i = g + m);
        }
      }
    }
    if (i) {
      var y = e.getUint16(i, n), T, C;
      for (C = 0; C < y; C += 1)
        if (T = i + C * 12 + 2, e.getUint16(T, n) === 274) {
          T += 8, t = e.getUint16(T, n), e.setUint16(T, 1, n);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function js(o) {
  var e = 0, t = 1, n = 1;
  switch (o) {
    case 2:
      t = -1;
      break;
    case 3:
      e = -180;
      break;
    case 4:
      n = -1;
      break;
    case 5:
      e = 90, n = -1;
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
    scaleY: n
  };
}
var Is = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, n = this.container, s = this.cropper, i = Number(t.minContainerWidth), l = Number(t.minContainerHeight);
    ne(s, ce), ye(e, ce);
    var h = {
      width: Math.max(n.offsetWidth, i >= 0 ? i : Or),
      height: Math.max(n.offsetHeight, l >= 0 ? l : Pr)
    };
    this.containerData = h, De(s, {
      width: h.width,
      height: h.height
    }), ne(e, ce), ye(s, ce);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, n = this.options.viewMode, s = Math.abs(t.rotate) % 180 === 90, i = s ? t.naturalHeight : t.naturalWidth, l = s ? t.naturalWidth : t.naturalHeight, h = i / l, v = e.width, g = e.height;
    e.height * h > e.width ? n === 3 ? v = e.height * h : g = e.width / h : n === 3 ? g = e.width / h : v = e.height * h;
    var f = {
      aspectRatio: h,
      naturalWidth: i,
      naturalHeight: l,
      width: v,
      height: g
    };
    this.canvasData = f, this.limited = n === 1 || n === 2, this.limitCanvas(!0, !0), f.width = Math.min(Math.max(f.width, f.minWidth), f.maxWidth), f.height = Math.min(Math.max(f.height, f.minHeight), f.maxHeight), f.left = (e.width - f.width) / 2, f.top = (e.height - f.height) / 2, f.oldLeft = f.left, f.oldTop = f.top, this.initialCanvasData = q({}, f);
  },
  limitCanvas: function(e, t) {
    var n = this.options, s = this.containerData, i = this.canvasData, l = this.cropBoxData, h = n.viewMode, v = i.aspectRatio, g = this.cropped && l;
    if (e) {
      var f = Number(n.minCanvasWidth) || 0, m = Number(n.minCanvasHeight) || 0;
      h > 1 ? (f = Math.max(f, s.width), m = Math.max(m, s.height), h === 3 && (m * v > f ? f = m * v : m = f / v)) : h > 0 && (f ? f = Math.max(f, g ? l.width : 0) : m ? m = Math.max(m, g ? l.height : 0) : g && (f = l.width, m = l.height, m * v > f ? f = m * v : m = f / v));
      var y = Ce({
        aspectRatio: v,
        width: f,
        height: m
      });
      f = y.width, m = y.height, i.minWidth = f, i.minHeight = m, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
    }
    if (t)
      if (h > (g ? 0 : 1)) {
        var T = s.width - i.width, C = s.height - i.height;
        i.minLeft = Math.min(0, T), i.minTop = Math.min(0, C), i.maxLeft = Math.max(0, T), i.maxTop = Math.max(0, C), g && this.limited && (i.minLeft = Math.min(l.left, l.left + (l.width - i.width)), i.minTop = Math.min(l.top, l.top + (l.height - i.height)), i.maxLeft = l.left, i.maxTop = l.top, h === 2 && (i.width >= s.width && (i.minLeft = Math.min(0, T), i.maxLeft = Math.max(0, T)), i.height >= s.height && (i.minTop = Math.min(0, C), i.maxTop = Math.max(0, C))));
      } else
        i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = s.width, i.maxTop = s.height;
  },
  renderCanvas: function(e, t) {
    var n = this.canvasData, s = this.imageData;
    if (t) {
      var i = Ms({
        width: s.naturalWidth * Math.abs(s.scaleX || 1),
        height: s.naturalHeight * Math.abs(s.scaleY || 1),
        degree: s.rotate || 0
      }), l = i.width, h = i.height, v = n.width * (l / n.naturalWidth), g = n.height * (h / n.naturalHeight);
      n.left -= (v - n.width) / 2, n.top -= (g - n.height) / 2, n.width = v, n.height = g, n.aspectRatio = l / h, n.naturalWidth = l, n.naturalHeight = h, this.limitCanvas(!0, !1);
    }
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCanvas(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, De(this.canvas, q({
      width: n.width,
      height: n.height
    }, Ze({
      translateX: n.left,
      translateY: n.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var t = this.canvasData, n = this.imageData, s = n.naturalWidth * (t.width / t.naturalWidth), i = n.naturalHeight * (t.height / t.naturalHeight);
    q(n, {
      width: s,
      height: i,
      left: (t.width - s) / 2,
      top: (t.height - i) / 2
    }), De(this.image, q({
      width: n.width,
      height: n.height
    }, Ze(q({
      translateX: n.left,
      translateY: n.top
    }, n)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, n = e.aspectRatio || e.initialAspectRatio, s = Number(e.autoCropArea) || 0.8, i = {
      width: t.width,
      height: t.height
    };
    n && (t.height * n > t.width ? i.height = i.width / n : i.width = i.height * n), this.cropBoxData = i, this.limitCropBox(!0, !0), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), i.width = Math.max(i.minWidth, i.width * s), i.height = Math.max(i.minHeight, i.height * s), i.left = t.left + (t.width - i.width) / 2, i.top = t.top + (t.height - i.height) / 2, i.oldLeft = i.left, i.oldTop = i.top, this.initialCropBoxData = q({}, i);
  },
  limitCropBox: function(e, t) {
    var n = this.options, s = this.containerData, i = this.canvasData, l = this.cropBoxData, h = this.limited, v = n.aspectRatio;
    if (e) {
      var g = Number(n.minCropBoxWidth) || 0, f = Number(n.minCropBoxHeight) || 0, m = h ? Math.min(s.width, i.width, i.width + i.left, s.width - i.left) : s.width, y = h ? Math.min(s.height, i.height, i.height + i.top, s.height - i.top) : s.height;
      g = Math.min(g, s.width), f = Math.min(f, s.height), v && (g && f ? f * v > g ? f = g / v : g = f * v : g ? f = g / v : f && (g = f * v), y * v > m ? y = m / v : m = y * v), l.minWidth = Math.min(g, m), l.minHeight = Math.min(f, y), l.maxWidth = m, l.maxHeight = y;
    }
    t && (h ? (l.minLeft = Math.max(0, i.left), l.minTop = Math.max(0, i.top), l.maxLeft = Math.min(s.width, i.left + i.width) - l.width, l.maxTop = Math.min(s.height, i.top + i.height) - l.height) : (l.minLeft = 0, l.minTop = 0, l.maxLeft = s.width - l.width, l.maxTop = s.height - l.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, n = this.cropBoxData;
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCropBox(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, e.movable && e.cropBoxMovable && et(this.face, Qe, n.width >= t.width && n.height >= t.height ? $r : jt), De(this.cropBox, q({
      width: n.width,
      height: n.height
    }, Ze({
      translateX: n.left,
      translateY: n.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), He(this.element, Dt, this.getData());
  }
}, Ns = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, n = this.options.preview, s = t ? this.crossOriginUrl : this.url, i = e.alt || "The image to preview", l = document.createElement("img");
    if (t && (l.crossOrigin = t), l.src = s, l.alt = i, this.viewBox.appendChild(l), this.viewBoxImage = l, !!n) {
      var h = n;
      typeof n == "string" ? h = e.ownerDocument.querySelectorAll(n) : n.querySelector && (h = [n]), this.previews = h, re(h, function(v) {
        var g = document.createElement("img");
        et(v, st, {
          width: v.offsetWidth,
          height: v.offsetHeight,
          html: v.innerHTML
        }), t && (g.crossOrigin = t), g.src = s, g.alt = i, g.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', v.innerHTML = "", v.appendChild(g);
      });
    }
  },
  resetPreview: function() {
    re(this.previews, function(e) {
      var t = Tt(e, st);
      De(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, ks(e, st);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, n = this.cropBoxData, s = n.width, i = n.height, l = e.width, h = e.height, v = n.left - t.left - e.left, g = n.top - t.top - e.top;
    !this.cropped || this.disabled || (De(this.viewBoxImage, q({
      width: l,
      height: h
    }, Ze(q({
      translateX: -v,
      translateY: -g
    }, e)))), re(this.previews, function(f) {
      var m = Tt(f, st), y = m.width, T = m.height, C = y, $ = T, j = 1;
      s && (j = y / s, $ = i * j), i && $ > T && (j = T / i, C = s * j, $ = T), De(f, {
        width: C,
        height: $
      }), De(f.getElementsByTagName("img")[0], q({
        width: l * j,
        height: h * j
      }, Ze(q({
        translateX: -v * j,
        translateY: -g * j
      }, e))));
    }));
  }
}, Ls = {
  bind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    le(t.cropstart) && de(e, $t, t.cropstart), le(t.cropmove) && de(e, Mt, t.cropmove), le(t.cropend) && de(e, Ct, t.cropend), le(t.crop) && de(e, Dt, t.crop), le(t.zoom) && de(e, Et, t.zoom), de(n, hr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && de(n, vr, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && de(n, dr, this.onDblclick = this.dblclick.bind(this)), de(e.ownerDocument, fr, this.onCropMove = this.cropMove.bind(this)), de(e.ownerDocument, mr, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && de(window, gr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    le(t.cropstart) && me(e, $t, t.cropstart), le(t.cropmove) && me(e, Mt, t.cropmove), le(t.cropend) && me(e, Ct, t.cropend), le(t.crop) && me(e, Dt, t.crop), le(t.zoom) && me(e, Et, t.zoom), me(n, hr, this.onCropStart), t.zoomable && t.zoomOnWheel && me(n, vr, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && me(n, dr, this.onDblclick), me(e.ownerDocument, fr, this.onCropMove), me(e.ownerDocument, mr, this.onCropEnd), t.responsive && me(window, gr, this.onResize);
  }
}, Vs = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, n = this.containerData, s = t.offsetWidth / n.width, i = t.offsetHeight / n.height, l = Math.abs(s - 1) > Math.abs(i - 1) ? s : i;
      if (l !== 1) {
        var h, v;
        e.restore && (h = this.getCanvasData(), v = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(re(h, function(g, f) {
          h[f] = g * l;
        })), this.setCropBoxData(re(v, function(g, f) {
          v[f] = g * l;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Ar || this.setDragMode(xs(this.dragBox, kt) ? Tr : It);
  },
  wheel: function(e) {
    var t = this, n = Number(this.options.wheelZoomRatio) || 0.1, s = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      t.wheeling = !1;
    }, 50), e.deltaY ? s = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? s = -e.wheelDelta / 120 : e.detail && (s = e.detail > 0 ? 1 : -1), this.zoom(-s * n, e)));
  },
  cropStart: function(e) {
    var t = e.buttons, n = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (R(t) && t !== 1 || R(n) && n !== 0 || e.ctrlKey))) {
      var s = this.options, i = this.pointers, l;
      e.changedTouches ? re(e.changedTouches, function(h) {
        i[h.identifier] = lt(h);
      }) : i[e.pointerId || 0] = lt(e), Object.keys(i).length > 1 && s.zoomable && s.zoomOnTouch ? l = Er : l = Tt(e.target, Qe), !!ds.test(l) && He(this.element, $t, {
        originalEvent: e,
        action: l
      }) !== !1 && (e.preventDefault(), this.action = l, this.cropping = !1, l === Mr && (this.cropping = !0, ne(this.dragBox, ht)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var n = this.pointers;
      e.preventDefault(), He(this.element, Mt, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? re(e.changedTouches, function(s) {
        q(n[s.identifier] || {}, lt(s, !0));
      }) : q(n[e.pointerId || 0] || {}, lt(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, n = this.pointers;
      e.changedTouches ? re(e.changedTouches, function(s) {
        delete n[s.identifier];
      }) : delete n[e.pointerId || 0], t && (e.preventDefault(), Object.keys(n).length || (this.action = ""), this.cropping && (this.cropping = !1, Be(this.dragBox, ht, this.cropped && this.options.modal)), He(this.element, Ct, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, zs = {
  change: function(e) {
    var t = this.options, n = this.canvasData, s = this.containerData, i = this.cropBoxData, l = this.pointers, h = this.action, v = t.aspectRatio, g = i.left, f = i.top, m = i.width, y = i.height, T = g + m, C = f + y, $ = 0, j = 0, O = s.width, W = s.height, H = !0, ie;
    !v && e.shiftKey && (v = m && y ? m / y : 1), this.limited && ($ = i.minLeft, j = i.minTop, O = $ + Math.min(s.width, n.width, n.left + n.width), W = j + Math.min(s.height, n.height, n.top + n.height));
    var G = l[Object.keys(l)[0]], S = {
      x: G.endX - G.startX,
      y: G.endY - G.startY
    }, K = function(A) {
      switch (A) {
        case $e:
          T + S.x > O && (S.x = O - T);
          break;
        case Ee:
          g + S.x < $ && (S.x = $ - g);
          break;
        case Se:
          f + S.y < j && (S.y = j - f);
          break;
        case Ve:
          C + S.y > W && (S.y = W - C);
          break;
      }
    };
    switch (h) {
      case jt:
        g += S.x, f += S.y;
        break;
      case $e:
        if (S.x >= 0 && (T >= O || v && (f <= j || C >= W))) {
          H = !1;
          break;
        }
        K($e), m += S.x, m < 0 && (h = Ee, m = -m, g -= m), v && (y = m / v, f += (i.height - y) / 2);
        break;
      case Se:
        if (S.y <= 0 && (f <= j || v && (g <= $ || T >= O))) {
          H = !1;
          break;
        }
        K(Se), y -= S.y, f += S.y, y < 0 && (h = Ve, y = -y, f -= y), v && (m = y * v, g += (i.width - m) / 2);
        break;
      case Ee:
        if (S.x <= 0 && (g <= $ || v && (f <= j || C >= W))) {
          H = !1;
          break;
        }
        K(Ee), m -= S.x, g += S.x, m < 0 && (h = $e, m = -m, g -= m), v && (y = m / v, f += (i.height - y) / 2);
        break;
      case Ve:
        if (S.y >= 0 && (C >= W || v && (g <= $ || T >= O))) {
          H = !1;
          break;
        }
        K(Ve), y += S.y, y < 0 && (h = Se, y = -y, f -= y), v && (m = y * v, g += (i.width - m) / 2);
        break;
      case Fe:
        if (v) {
          if (S.y <= 0 && (f <= j || T >= O)) {
            H = !1;
            break;
          }
          K(Se), y -= S.y, f += S.y, m = y * v;
        } else
          K(Se), K($e), S.x >= 0 ? T < O ? m += S.x : S.y <= 0 && f <= j && (H = !1) : m += S.x, S.y <= 0 ? f > j && (y -= S.y, f += S.y) : (y -= S.y, f += S.y);
        m < 0 && y < 0 ? (h = Je, y = -y, m = -m, f -= y, g -= m) : m < 0 ? (h = qe, m = -m, g -= m) : y < 0 && (h = Ge, y = -y, f -= y);
        break;
      case qe:
        if (v) {
          if (S.y <= 0 && (f <= j || g <= $)) {
            H = !1;
            break;
          }
          K(Se), y -= S.y, f += S.y, m = y * v, g += i.width - m;
        } else
          K(Se), K(Ee), S.x <= 0 ? g > $ ? (m -= S.x, g += S.x) : S.y <= 0 && f <= j && (H = !1) : (m -= S.x, g += S.x), S.y <= 0 ? f > j && (y -= S.y, f += S.y) : (y -= S.y, f += S.y);
        m < 0 && y < 0 ? (h = Ge, y = -y, m = -m, f -= y, g -= m) : m < 0 ? (h = Fe, m = -m, g -= m) : y < 0 && (h = Je, y = -y, f -= y);
        break;
      case Je:
        if (v) {
          if (S.x <= 0 && (g <= $ || C >= W)) {
            H = !1;
            break;
          }
          K(Ee), m -= S.x, g += S.x, y = m / v;
        } else
          K(Ve), K(Ee), S.x <= 0 ? g > $ ? (m -= S.x, g += S.x) : S.y >= 0 && C >= W && (H = !1) : (m -= S.x, g += S.x), S.y >= 0 ? C < W && (y += S.y) : y += S.y;
        m < 0 && y < 0 ? (h = Fe, y = -y, m = -m, f -= y, g -= m) : m < 0 ? (h = Ge, m = -m, g -= m) : y < 0 && (h = qe, y = -y, f -= y);
        break;
      case Ge:
        if (v) {
          if (S.x >= 0 && (T >= O || C >= W)) {
            H = !1;
            break;
          }
          K($e), m += S.x, y = m / v;
        } else
          K(Ve), K($e), S.x >= 0 ? T < O ? m += S.x : S.y >= 0 && C >= W && (H = !1) : m += S.x, S.y >= 0 ? C < W && (y += S.y) : y += S.y;
        m < 0 && y < 0 ? (h = qe, y = -y, m = -m, f -= y, g -= m) : m < 0 ? (h = Je, m = -m, g -= m) : y < 0 && (h = Fe, y = -y, f -= y);
        break;
      case $r:
        this.move(S.x, S.y), H = !1;
        break;
      case Er:
        this.zoom(Ds(l), e), H = !1;
        break;
      case Mr:
        if (!S.x || !S.y) {
          H = !1;
          break;
        }
        ie = Lr(this.cropper), g = G.startX - ie.left, f = G.startY - ie.top, m = i.minWidth, y = i.minHeight, S.x > 0 ? h = S.y > 0 ? Ge : Fe : S.x < 0 && (g -= m, h = S.y > 0 ? Je : qe), S.y < 0 && (f -= y), this.cropped || (ye(this.cropBox, ce), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    H && (i.width = m, i.height = y, i.left = g, i.top = f, this.action = h, this.renderCropBox()), re(l, function(J) {
      J.startX = J.endX, J.startY = J.endY;
    });
  }
}, Bs = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && ne(this.dragBox, ht), ye(this.cropBox, ce), this.setCropBoxData(this.initialCropBoxData)), this;
  },
  reset: function() {
    return this.ready && !this.disabled && (this.imageData = q({}, this.initialImageData), this.canvasData = q({}, this.initialCanvasData), this.cropBoxData = q({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this;
  },
  clear: function() {
    return this.cropped && !this.disabled && (q(this.cropBoxData, {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), ye(this.dragBox, ht), ne(this.cropBox, ce)), this;
  },
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, re(this.previews, function(n) {
      n.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, ye(this.cropper, cr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, ne(this.cropper, cr)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[F] ? (e[F] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, s = n.left, i = n.top;
    return this.moveTo(bt(e) ? e : s + Number(e), bt(t) ? t : i + Number(t));
  },
  moveTo: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, s = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (R(e) && (n.left = e, s = !0), R(t) && (n.top = t, s = !0), s && this.renderCanvas(!0)), this;
  },
  zoom: function(e, t) {
    var n = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(n.width * e / n.naturalWidth, null, t);
  },
  zoomTo: function(e, t, n) {
    var s = this.options, i = this.canvasData, l = i.width, h = i.height, v = i.naturalWidth, g = i.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && s.zoomable) {
      var f = v * e, m = g * e;
      if (He(this.element, Et, {
        ratio: e,
        oldRatio: l / v,
        originalEvent: n
      }) === !1)
        return this;
      if (n) {
        var y = this.pointers, T = Lr(this.cropper), C = y && Object.keys(y).length ? Cs(y) : {
          pageX: n.pageX,
          pageY: n.pageY
        };
        i.left -= (f - l) * ((C.pageX - T.left - i.left) / l), i.top -= (m - h) * ((C.pageY - T.top - i.top) / h);
      } else
        ze(t) && R(t.x) && R(t.y) ? (i.left -= (f - l) * ((t.x - i.left) / l), i.top -= (m - h) * ((t.y - i.top) / h)) : (i.left -= (f - l) / 2, i.top -= (m - h) / 2);
      i.width = f, i.height = m, this.renderCanvas(!0);
    }
    return this;
  },
  rotate: function(e) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(e));
  },
  rotateTo: function(e) {
    return e = Number(e), R(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
  },
  scaleX: function(e) {
    var t = this.imageData.scaleY;
    return this.scale(e, R(t) ? t : 1);
  },
  scaleY: function(e) {
    var t = this.imageData.scaleX;
    return this.scale(R(t) ? t : 1, e);
  },
  scale: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.imageData, s = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (R(e) && (n.scaleX = e, s = !0), R(t) && (n.scaleY = t, s = !0), s && this.renderCanvas(!0, !0)), this;
  },
  getData: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, t = this.options, n = this.imageData, s = this.canvasData, i = this.cropBoxData, l;
    if (this.ready && this.cropped) {
      l = {
        x: i.left - s.left,
        y: i.top - s.top,
        width: i.width,
        height: i.height
      };
      var h = n.width / n.naturalWidth;
      if (re(l, function(f, m) {
        l[m] = f / h;
      }), e) {
        var v = Math.round(l.y + l.height), g = Math.round(l.x + l.width);
        l.x = Math.round(l.x), l.y = Math.round(l.y), l.width = g - l.x, l.height = v - l.y;
      }
    } else
      l = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return t.rotatable && (l.rotate = n.rotate || 0), t.scalable && (l.scaleX = n.scaleX || 1, l.scaleY = n.scaleY || 1), l;
  },
  setData: function(e) {
    var t = this.options, n = this.imageData, s = this.canvasData, i = {};
    if (this.ready && !this.disabled && ze(e)) {
      var l = !1;
      t.rotatable && R(e.rotate) && e.rotate !== n.rotate && (n.rotate = e.rotate, l = !0), t.scalable && (R(e.scaleX) && e.scaleX !== n.scaleX && (n.scaleX = e.scaleX, l = !0), R(e.scaleY) && e.scaleY !== n.scaleY && (n.scaleY = e.scaleY, l = !0)), l && this.renderCanvas(!0, !0);
      var h = n.width / n.naturalWidth;
      R(e.x) && (i.left = e.x * h + s.left), R(e.y) && (i.top = e.y * h + s.top), R(e.width) && (i.width = e.width * h), R(e.height) && (i.height = e.height * h), this.setCropBoxData(i);
    }
    return this;
  },
  getContainerData: function() {
    return this.ready ? q({}, this.containerData) : {};
  },
  getImageData: function() {
    return this.sized ? q({}, this.imageData) : {};
  },
  getCanvasData: function() {
    var e = this.canvasData, t = {};
    return this.ready && re(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(n) {
      t[n] = e[n];
    }), t;
  },
  setCanvasData: function(e) {
    var t = this.canvasData, n = t.aspectRatio;
    return this.ready && !this.disabled && ze(e) && (R(e.left) && (t.left = e.left), R(e.top) && (t.top = e.top), R(e.width) ? (t.width = e.width, t.height = e.width / n) : R(e.height) && (t.height = e.height, t.width = e.height * n), this.renderCanvas(!0)), this;
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
    var t = this.cropBoxData, n = this.options.aspectRatio, s, i;
    return this.ready && this.cropped && !this.disabled && ze(e) && (R(e.left) && (t.left = e.left), R(e.top) && (t.top = e.top), R(e.width) && e.width !== t.width && (s = !0, t.width = e.width), R(e.height) && e.height !== t.height && (i = !0, t.height = e.height), n && (s ? t.height = t.width / n : i && (t.width = t.height * n)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, n = $s(this.image, this.imageData, t, e);
    if (!this.cropped)
      return n;
    var s = this.getData(), i = s.x, l = s.y, h = s.width, v = s.height, g = n.width / Math.floor(t.naturalWidth);
    g !== 1 && (i *= g, l *= g, h *= g, v *= g);
    var f = h / v, m = Ce({
      aspectRatio: f,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), y = Ce({
      aspectRatio: f,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), T = Ce({
      aspectRatio: f,
      width: e.width || (g !== 1 ? n.width : h),
      height: e.height || (g !== 1 ? n.height : v)
    }), C = T.width, $ = T.height;
    C = Math.min(m.width, Math.max(y.width, C)), $ = Math.min(m.height, Math.max(y.height, $));
    var j = document.createElement("canvas"), O = j.getContext("2d");
    j.width = Re(C), j.height = Re($), O.fillStyle = e.fillColor || "transparent", O.fillRect(0, 0, C, $);
    var W = e.imageSmoothingEnabled, H = W === void 0 ? !0 : W, ie = e.imageSmoothingQuality;
    O.imageSmoothingEnabled = H, ie && (O.imageSmoothingQuality = ie);
    var G = n.width, S = n.height, K = i, J = l, A, L, P, Q, z, Y;
    K <= -h || K > G ? (K = 0, A = 0, P = 0, z = 0) : K <= 0 ? (P = -K, K = 0, A = Math.min(G, h + K), z = A) : K <= G && (P = 0, A = Math.min(h, G - K), z = A), A <= 0 || J <= -v || J > S ? (J = 0, L = 0, Q = 0, Y = 0) : J <= 0 ? (Q = -J, J = 0, L = Math.min(S, v + J), Y = L) : J <= S && (Q = 0, L = Math.min(v, S - J), Y = L);
    var X = [K, J, A, L];
    if (z > 0 && Y > 0) {
      var ve = C / h;
      X.push(P * ve, Q * ve, z * ve, Y * ve);
    }
    return O.drawImage.apply(O, [n].concat(Cr(X.map(function(Pe) {
      return Math.floor(Re(Pe));
    })))), j;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !bt(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, n = this.dragBox, s = this.face;
    if (this.ready && !this.disabled) {
      var i = e === It, l = t.movable && e === Tr;
      e = i || l ? e : Ar, t.dragMode = e, et(n, Qe, e), Be(n, kt, i), Be(n, St, l), t.cropBoxMovable || (et(s, Qe, e), Be(s, kt, i), Be(s, St, l));
    }
    return this;
  }
}, Rs = we.Cropper, zr = /* @__PURE__ */ function() {
  function o(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (es(this, o), !e || !ms.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = q({}, br, ze(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return ts(o, [{
    key: "init",
    value: function() {
      var t = this.element, n = t.tagName.toLowerCase(), s;
      if (!t[F]) {
        if (t[F] = this, n === "img") {
          if (this.isImg = !0, s = t.getAttribute("src") || "", this.originalUrl = s, !s)
            return;
          s = t.src;
        } else
          n === "canvas" && window.HTMLCanvasElement && (s = t.toDataURL());
        this.load(s);
      }
    }
  }, {
    key: "load",
    value: function(t) {
      var n = this;
      if (!!t) {
        this.url = t, this.imageData = {};
        var s = this.element, i = this.options;
        if (!i.rotatable && !i.scalable && (i.checkOrientation = !1), !i.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (hs.test(t)) {
          fs.test(t) ? this.read(As(t)) : this.clone();
          return;
        }
        var l = new XMLHttpRequest(), h = this.clone.bind(this);
        this.reloading = !0, this.xhr = l, l.onabort = h, l.onerror = h, l.ontimeout = h, l.onprogress = function() {
          l.getResponseHeader("content-type") !== yr && l.abort();
        }, l.onload = function() {
          n.read(l.response);
        }, l.onloadend = function() {
          n.reloading = !1, n.xhr = null;
        }, i.checkCrossOrigin && xr(t) && s.crossOrigin && (t = _r(t)), l.open("GET", t, !0), l.responseType = "arraybuffer", l.withCredentials = s.crossOrigin === "use-credentials", l.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var n = this.options, s = this.imageData, i = Ps(t), l = 0, h = 1, v = 1;
      if (i > 1) {
        this.url = Os(t, yr);
        var g = js(i);
        l = g.rotate, h = g.scaleX, v = g.scaleY;
      }
      n.rotatable && (s.rotate = l), n.scalable && (s.scaleX = h, s.scaleY = v), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, n = this.url, s = t.crossOrigin, i = n;
      this.options.checkCrossOrigin && xr(n) && (s || (s = "anonymous"), i = _r(n)), this.crossOrigin = s, this.crossOriginUrl = i;
      var l = document.createElement("img");
      s && (l.crossOrigin = s), l.src = i || n, l.alt = t.alt || "The image to crop", this.image = l, l.onload = this.start.bind(this), l.onerror = this.stop.bind(this), ne(l, ur), t.parentNode.insertBefore(l, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, n = this.image;
      n.onload = null, n.onerror = null, this.sizing = !0;
      var s = we.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(we.navigator.userAgent), i = function(g, f) {
        q(t.imageData, {
          naturalWidth: g,
          naturalHeight: f,
          aspectRatio: g / f
        }), t.initialImageData = q({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (n.naturalWidth && !s) {
        i(n.naturalWidth, n.naturalHeight);
        return;
      }
      var l = document.createElement("img"), h = document.body || document.documentElement;
      this.sizingImage = l, l.onload = function() {
        i(l.width, l.height), s || h.removeChild(l);
      }, l.src = n.src, s || (l.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", h.appendChild(l));
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
        var t = this.element, n = this.options, s = this.image, i = t.parentNode, l = document.createElement("div");
        l.innerHTML = ps;
        var h = l.querySelector(".".concat(F, "-container")), v = h.querySelector(".".concat(F, "-canvas")), g = h.querySelector(".".concat(F, "-drag-box")), f = h.querySelector(".".concat(F, "-crop-box")), m = f.querySelector(".".concat(F, "-face"));
        this.container = i, this.cropper = h, this.canvas = v, this.dragBox = g, this.cropBox = f, this.viewBox = h.querySelector(".".concat(F, "-view-box")), this.face = m, v.appendChild(s), ne(t, ce), i.insertBefore(h, t.nextSibling), this.isImg || ye(s, ur), this.initPreview(), this.bind(), n.initialAspectRatio = Math.max(0, n.initialAspectRatio) || NaN, n.aspectRatio = Math.max(0, n.aspectRatio) || NaN, n.viewMode = Math.max(0, Math.min(3, Math.round(n.viewMode))) || 0, ne(f, ce), n.guides || ne(f.getElementsByClassName("".concat(F, "-dashed")), ce), n.center || ne(f.getElementsByClassName("".concat(F, "-center")), ce), n.background && ne(h, "".concat(F, "-bg")), n.highlight || ne(m, ss), n.cropBoxMovable && (ne(m, St), et(m, Qe, jt)), n.cropBoxResizable || (ne(f.getElementsByClassName("".concat(F, "-line")), ce), ne(f.getElementsByClassName("".concat(F, "-point")), ce)), this.render(), this.ready = !0, this.setDragMode(n.dragMode), n.autoCrop && this.crop(), this.setData(n.data), le(n.ready) && de(t, pr, n.ready, {
          once: !0
        }), He(t, pr);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      !this.ready || (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), ye(this.element, ce));
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = Rs, o;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      q(br, ze(t) && t);
    }
  }]), o;
}();
q(zr.prototype, Is, Ns, Ls, Vs, zs, Bs);
const Hs = { class: "flex" }, Ks = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Us = { class: "ml-auto mb-2" }, Ys = { class: "w-full flex justify-center" }, Ws = ["src"], Xs = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), s = () => n.value + "?" + Oe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path }), i = N(null), l = N(null), h = N(!1), v = () => {
      h.value = !h.value, h.value ? l.value = new zr(i.value, {
        crop(f) {
        }
      }) : l.value.destroy();
    }, g = () => {
      l.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (f) => {
          dt(n.value, {
            method: "POST",
            params: { q: "upload", adapter: t.selection.adapter, path: t.selection.item.path, file: f },
            name: t.selection.item.basename,
            json: !1
          }).then((m) => {
            i.value.src = s(), v(), e("load");
          }).catch((m) => console.log(m.statusText));
        }
      );
    };
    return onMounted(() => {
      e("load");
    }), (f, m) => (x(), D(ae, null, [
      d("div", Hs, [
        d("h3", Ks, B(o.selection.item.basename), 1),
        d("div", Us, [
          h.value ? (x(), D("button", {
            key: 0,
            onClick: g,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Crop")) : oe("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: m[0] || (m[0] = (y) => v())
          }, B(h.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      d("div", Ys, [
        d("img", {
          ref_key: "image",
          ref: i,
          class: "max-w-[60vh] max-h-[60vh]",
          src: s(),
          alt: ""
        }, null, 8, Ws)
      ])
    ], 64));
  }
}, Fs = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, qs = /* @__PURE__ */ d("div", null, " Default view.. ", -1), Gs = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    return be(() => {
      e("load");
    }), (t, n) => (x(), D(ae, null, [
      d("h3", Fs, B(o.selection.item.basename), 1),
      qs
    ], 64));
  }
}, Js = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Zs = {
  class: "w-full",
  preload: "",
  controls: ""
}, Qs = ["src"], el = /* @__PURE__ */ Me(" Your browser does not support the video tag. "), tl = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), s = () => n.value + "?" + Oe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return be(() => {
      e("load");
    }), (i, l) => (x(), D(ae, null, [
      d("h3", Js, B(o.selection.item.basename), 1),
      d("div", null, [
        d("video", Zs, [
          d("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Qs),
          el
        ])
      ])
    ], 64));
  }
}, rl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, il = {
  class: "w-full",
  controls: ""
}, nl = ["src"], ol = /* @__PURE__ */ Me(" Your browser does not support the audio element. "), al = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), s = () => n.value + "?" + Oe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return be(() => {
      e("load");
    }), (i, l) => (x(), D(ae, null, [
      d("h3", rl, B(o.selection.item.basename), 1),
      d("div", null, [
        d("audio", il, [
          d("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, nl),
          ol
        ])
      ])
    ], 64));
  }
}, sl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ll = ["data"], cl = ["src"], ul = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), s = () => n.value + "?" + Oe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return be(() => {
      e("load");
    }), (i, l) => (x(), D(ae, null, [
      d("h3", sl, B(o.selection.item.basename), 1),
      d("div", null, [
        d("object", {
          class: "h-[60vh]",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          d("iframe", {
            class: "border-0",
            src: s(),
            width: "100%",
            height: "100%"
          }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        `, 8, cl)
        ], 8, ll)
      ])
    ], 64));
  }
}, dl = { class: "sm:flex sm:items-start" }, hl = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, fl = { class: "text-gray-700 dark:text-gray-200 text-sm" }, ml = {
  key: 0,
  class: "flex leading-5"
}, pl = /* @__PURE__ */ d("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ d("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ d("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), gl = /* @__PURE__ */ d("span", null, "Loading", -1), vl = [
  pl,
  gl
], yl = {
  name: "VFModalPreview"
}, bl = /* @__PURE__ */ Object.assign(yl, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = o, { apiUrl: t } = _e(), n = inject("emitter"), s = N(!1), i = (v) => s.value = v, l = (v) => {
      var g;
      return ((g = e.selection.item.mime_type) != null ? g : "").startsWith(v);
    }, h = () => {
      const v = t.value + "?" + Oe({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      n.emit("vf-download", v);
    };
    return (v, g) => (x(), se(xe, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: g[6] || (g[6] = (f) => U(n).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close"),
        d("button", {
          type: "button",
          onClick: g[7] || (g[7] = (f) => h()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Download")
      ]),
      default: ee(() => [
        d("div", dl, [
          d("div", hl, [
            d("div", null, [
              l("text") ? (x(), se(Qa, {
                key: 0,
                selection: o.selection,
                onLoad: g[0] || (g[0] = (f) => i(!0))
              }, null, 8, ["selection"])) : l("image") ? (x(), se(Xs, {
                key: 1,
                selection: o.selection,
                onLoad: g[1] || (g[1] = (f) => i(!0))
              }, null, 8, ["selection"])) : l("video") ? (x(), se(tl, {
                key: 2,
                selection: o.selection,
                onLoad: g[2] || (g[2] = (f) => i(!0))
              }, null, 8, ["selection"])) : l("audio") ? (x(), se(al, {
                key: 3,
                selection: o.selection,
                onLoad: g[3] || (g[3] = (f) => i(!0))
              }, null, 8, ["selection"])) : l("application/pdf") ? (x(), se(ul, {
                key: 4,
                selection: o.selection,
                onLoad: g[4] || (g[4] = (f) => i(!0))
              }, null, 8, ["selection"])) : (x(), se(Gs, {
                key: 5,
                selection: o.selection,
                onLoad: g[5] || (g[5] = (f) => i(!0))
              }, null, 8, ["selection"]))
            ]),
            d("div", fl, [
              d("p", null, B(o.selection.item.path), 1),
              d("p", null, "mime_type: " + B(o.selection.item.mime_type), 1),
              s.value == !1 ? (x(), D("div", ml, vl)) : oe("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), wl = { class: "sm:flex sm:items-start" }, xl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), _l = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, kl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Sl = { class: "mt-2" }, Dl = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Cl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ml = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), $l = [
  Ml
], El = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Al = [
  Tl
], Ol = { class: "ml-1.5" }, Pl = ["onKeyup"], jl = {
  name: "VFModalRename"
}, Il = /* @__PURE__ */ Object.assign(jl, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = N(e.selection.items[0]), i = N(e.selection.items[0].basename), l = () => {
      i.value != "" && t.emit("vf-fetch", {
        q: "rename",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: s.value.path,
        name: i.value
      });
    };
    return (h, v) => (x(), se(xe, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Rename!"),
        d("button", {
          type: "button",
          onClick: v[1] || (v[1] = (g) => U(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: ee(() => [
        d("div", wl, [
          xl,
          d("div", _l, [
            d("h3", kl, "Rename your " + B(s.value.type == "dir" ? "folder" : "file"), 1),
            d("div", Sl, [
              d("p", Dl, [
                s.value.type == "dir" ? (x(), D("svg", Cl, $l)) : (x(), D("svg", El, Al)),
                d("span", Ol, B(s.value.basename), 1)
              ]),
              ge(d("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (g) => i.value = g),
                onKeyup: Ke(l, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Pl), [
                [Ue, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Nl = { class: "sm:flex sm:items-start" }, Ll = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), Vl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, zl = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Upload files", -1), Bl = { class: "mt-2" }, Rl = { class: "text-gray-500 mb-1" }, Hl = ["id"], Kl = {
  key: 0,
  class: "py-2"
}, Ul = ["disabled", "onClick"], Yl = {
  name: "VFModalUpload"
}, Wl = /* @__PURE__ */ Object.assign(Yl, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { apiUrl: n } = _e(), s = N(null), i = N(null), l = N(null), h = N([]), v = N(!0), g = () => {
      s.value.start();
    };
    return be(() => {
      s.value = new yt.Uploader({
        runtimes: "html5",
        browse_button: l.value,
        container: i.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: n.value + "?" + Oe({ q: "upload", adapter: e.current.adapter, path: e.current.dirname }),
        init: {
          PostInit: function() {
          },
          FilesAdded: function(f, m) {
            v.value = !1, yt.each(m, function(y) {
              h.value.push({
                id: y.id,
                name: y.name,
                size: yt.formatSize(y.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(f, m) {
            h.value[h.value.findIndex((y) => y.id == m.id)].percent = m.percent + "%";
          },
          UploadComplete: function() {
            v.value = !0, t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: e.current.dirname });
          },
          Error: function(f, m) {
          }
        }
      }), s.value.init();
    }), (f, m) => (x(), se(xe, null, {
      buttons: ee(() => [
        d("button", {
          disabled: v.value,
          onClick: Te(g, ["prevent"]),
          type: "button",
          class: he([v.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, "Upload!", 10, Ul),
        d("button", {
          type: "button",
          onClick: m[0] || (m[0] = (y) => U(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: ee(() => [
        d("div", Nl, [
          Ll,
          d("div", Vl, [
            zl,
            d("div", Bl, [
              d("div", Rl, [
                (x(!0), D(ae, null, fe(h.value, (y) => (x(), D("div", null, [
                  d("div", {
                    id: y.id
                  }, [
                    Me(B(y.name) + " ( " + B(y.size) + ") ", 1),
                    d("b", null, B(y.percent), 1)
                  ], 8, Hl)
                ]))), 256)),
                h.value.length ? oe("", !0) : (x(), D("div", Kl, " No files selected!"))
              ]),
              d("div", {
                class: "text-gray-500",
                ref_key: "container",
                ref: i
              }, [
                d("button", {
                  ref_key: "pickFiles",
                  ref: l,
                  type: "button",
                  class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                }, "Select Files", 512)
              ], 512)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Xl = { class: "sm:flex sm:items-start" }, Fl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), ql = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Gl = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), Jl = { class: "mt-2" }, Zl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ql = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ec = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), tc = [
  ec
], rc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ic = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), nc = [
  ic
], oc = { class: "ml-1.5" }, ac = /* @__PURE__ */ d("p", { class: "my-1 text-sm text-gray-500" }, "Archive name. (.zip file will be created)", -1), sc = ["onKeyup"], lc = {
  name: "VFModalArchive"
}, cc = /* @__PURE__ */ Object.assign(lc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = N(""), i = N(e.selection.items), l = () => {
      i.value.length && t.emit("vf-fetch", {
        q: "archive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(i.value.map(({ path: h, type: v }) => ({ path: h, type: v }))),
        name: s.value
      });
    };
    return (h, v) => (x(), se(xe, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Archive!"),
        d("button", {
          type: "button",
          onClick: v[1] || (v[1] = (g) => U(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: ee(() => [
        d("div", Xl, [
          Fl,
          d("div", ql, [
            Gl,
            d("div", Jl, [
              (x(!0), D(ae, null, fe(i.value, (g) => (x(), D("p", Zl, [
                g.type == "dir" ? (x(), D("svg", Ql, tc)) : (x(), D("svg", rc, nc)),
                d("span", oc, B(g.basename), 1)
              ]))), 256)),
              ac,
              ge(d("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (g) => s.value = g),
                onKeyup: Ke(l, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, sc), [
                [Ue, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), uc = { class: "sm:flex sm:items-start" }, dc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), hc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, fc = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Unarchive files", -1), mc = { class: "mt-2" }, pc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, gc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), yc = [
  vc
], bc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), xc = [
  wc
], _c = { class: "ml-1.5" }, kc = { class: "my-1 text-sm text-gray-500" }, Sc = {
  name: "VFModalUnarchive"
}, Dc = /* @__PURE__ */ Object.assign(Sc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage");
    N("");
    const s = N(e.selection.items[0]), i = N([]), l = () => {
      t.emit("vf-fetch", {
        q: "unarchive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: s.value.path
      });
    };
    return (h, v) => (x(), se(xe, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Unarchive!"),
        d("button", {
          type: "button",
          onClick: v[0] || (v[0] = (g) => U(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: ee(() => [
        d("div", uc, [
          dc,
          d("div", hc, [
            fc,
            d("div", mc, [
              (x(!0), D(ae, null, fe(i.value, (g) => (x(), D("p", pc, [
                g.type == "dir" ? (x(), D("svg", gc, yc)) : (x(), D("svg", bc, xc)),
                d("span", _c, B(g.basename), 1)
              ]))), 256)),
              d("p", kc, "Archive will be unarchived at (" + B(o.current.dirname) + ")", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Cc = { class: "sm:flex sm:items-start" }, Mc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), $c = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Ec = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Move files", -1), Tc = { class: "mt-2" }, Ac = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Oc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), jc = [
  Pc
], Ic = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Lc = [
  Nc
], Vc = { class: "ml-1.5" }, zc = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Are you sure you want to move these files to ?", -1), Bc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Rc = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), Hc = { class: "ml-1.5 overflow-auto" }, Kc = {
  name: "VFModalMove"
}, Uc = /* @__PURE__ */ Object.assign(Kc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = N(e.selection.items.from), i = () => {
      s.value.length && t.emit("vf-fetch", {
        q: "move",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(s.value.map(({ path: l, type: h }) => ({ path: l, type: h }))),
        item: e.selection.items.to.path
      });
    };
    return (l, h) => (x(), se(xe, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, move!"),
        d("button", {
          type: "button",
          onClick: h[0] || (h[0] = (v) => U(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: ee(() => [
        d("div", Cc, [
          Mc,
          d("div", $c, [
            Ec,
            d("div", Tc, [
              (x(!0), D(ae, null, fe(s.value, (v) => (x(), D("p", Ac, [
                v.type == "dir" ? (x(), D("svg", Oc, jc)) : (x(), D("svg", Ic, Lc)),
                d("span", Vc, B(v.path), 1)
              ]))), 256)),
              zc,
              d("p", Bc, [
                Rc,
                d("span", Hc, B(o.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Yc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: xa,
  ModalMessage: Ea,
  ModalNewFolder: Va,
  ModalNewFile: Xa,
  ModalPreview: bl,
  ModalRename: Il,
  ModalUpload: Wl,
  ModalArchive: cc,
  ModalUnarchive: Dc,
  ModalMove: Uc
}, Symbol.toStringTag, { value: "Module" })), xt = {
  VueFinder: Qo,
  ...Yc
};
const Fc = {
  install(o) {
    for (const e in xt)
      if (xt.hasOwnProperty(e)) {
        const t = xt[e];
        o.component(t.name, t);
      }
  }
};
export {
  Fc as default
};
