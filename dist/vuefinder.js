import { ref as j, watch as _r, openBlock as k, createElementBlock as $, createElementVNode as d, unref as R, normalizeClass as de, createCommentVNode as se, createVNode as pe, TransitionGroup as Mi, withCtx as G, Fragment as ie, renderList as he, toDisplayString as V, reactive as lt, onMounted as ve, withDirectives as xe, vShow as gt, normalizeStyle as Sr, withModifiers as ze, createTextVNode as He, nextTick as dt, vModelSelect as $i, withKeys as Ke, provide as rr, createBlock as re, resolveDynamicComponent as Ei, renderSlot as ir, vModelText as et } from "vue";
import vt from "plupload";
const ct = (o, { method: e = "get", params: t = {}, json: n = !0 }) => {
  const s = { method: e };
  if (e == "get")
    o += "?" + new URLSearchParams(t);
  else {
    s.headers = {};
    let i = new FormData();
    for (const [c, h] of Object.entries(t))
      i.append(c, h);
    s.body = i;
  }
  return fetch(o, s).then((i) => i.ok ? n ? i.json() : i.text() : Promise.reject(i));
};
function Ti(o) {
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
function nr(o) {
  let e = localStorage.getItem(o + "_storage");
  const t = j(JSON.parse(e));
  _r(t, n);
  function n() {
    t.value === null || t.value === "" ? localStorage.removeItem(o + "_storage") : localStorage.setItem(o + "_storage", JSON.stringify(t.value));
  }
  function s(h, p) {
    t.value = Object.assign({ ...t.value }, { [h]: p });
  }
  function i() {
    t.value = null;
  }
  return { getStore: (h, p = null) => t.value === null || t.value === "" ? p : t.value.hasOwnProperty(h) ? t.value[h] : p, setStore: s, clearStore: i };
}
const or = j("");
function _e() {
  function o(e) {
    or.value = e;
  }
  return { apiUrl: or, setApiUrl: o };
}
const Ai = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Pi = { class: "flex text-center" }, Oi = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
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
], -1), Ii = [
  Oi
], ji = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
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
], -1), Ni = [
  ji
], Li = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Vi = [
  Li
], zi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), Bi = [
  zi
], Ri = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
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
], -1), Hi = [
  Ri
], Ki = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), Ui = [
  Ki
], Yi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), Wi = [
  Yi
], Xi = { class: "flex text-center items-center justify-end" }, Fi = {
  class: "mx-1.5",
  "aria-label": "Dark Mode",
  "data-microtip-position": "bottom",
  role: "tooltip"
}, qi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), Gi = [
  qi
], Zi = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, Ji = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, Qi = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, en = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, tn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, rn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, nn = {
  name: "VFToolbar"
}, on = /* @__PURE__ */ Object.assign(nn, {
  setup(o) {
    const e = inject("emitter"), { getStore: t, setStore: n } = inject("storage"), s = j(t("viewport", "grid")), i = j([]), c = j(t("full-screen", !1)), h = () => {
      c.value = !c.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (p) => {
      i.value = p;
    }), e.on("vf-view-toggle", (p) => {
      n("viewport", p), s.value = p;
    }), (p, g) => (k(), $("div", Ai, [
      d("div", Pi, [
        d("div", {
          class: "mx-1.5",
          "aria-label": "New Folder",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[0] || (g[0] = (f) => R(e).emit("vf-modal-show", { type: "new-folder", items: i.value }))
        }, Ii),
        d("div", {
          class: "mx-1.5",
          "aria-label": "New File",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[1] || (g[1] = (f) => R(e).emit("vf-modal-show", { type: "new-file", items: i.value }))
        }, Ni),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Rename",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[2] || (g[2] = (f) => i.value.length != 1 || R(e).emit("vf-modal-show", { type: "rename", items: i.value }))
        }, [
          (k(), $("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([i.value.length == 1 ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Vi, 2))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Delete",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[3] || (g[3] = (f) => !i.value.length || R(e).emit("vf-modal-show", { type: "delete", items: i.value }))
        }, [
          (k(), $("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([i.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Bi, 2))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Upload",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[4] || (g[4] = (f) => R(e).emit("vf-modal-show", { type: "upload", items: i.value }))
        }, Hi),
        i.value.length == 1 && i.value[0].mime_type == "application/zip" ? (k(), $("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": "Unrchive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[5] || (g[5] = (f) => !i.value.length || R(e).emit("vf-modal-show", { type: "unarchive", items: i.value }))
        }, [
          (k(), $("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([i.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Ui, 2))
        ])) : (k(), $("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": "Archive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[6] || (g[6] = (f) => !i.value.length || R(e).emit("vf-modal-show", { type: "archive", items: i.value }))
        }, [
          (k(), $("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([i.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Wi, 2))
        ]))
      ]),
      d("div", Xi, [
        d("div", Fi, [
          (k(), $("svg", {
            onClick: g[7] || (g[7] = (f) => R(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, Gi))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Toggle Full Screen",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: h
        }, [
          (k(), $("svg", Zi, [
            c.value ? (k(), $("path", Ji)) : (k(), $("path", Qi))
          ]))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Change View",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[8] || (g[8] = (f) => R(e).emit("vf-view-toggle", s.value == "list" ? "grid" : "list"))
        }, [
          (k(), $("svg", en, [
            s.value == "grid" ? (k(), $("path", tn)) : se("", !0),
            s.value == "list" ? (k(), $("path", rn)) : se("", !0)
          ]))
        ])
      ])
    ]));
  }
});
var an = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, kr = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(an, function() {
    function t(u, a) {
      if (!(u instanceof a))
        throw new TypeError("Cannot call a class as a function");
    }
    function n(u, a) {
      for (var r = 0; r < a.length; r++) {
        var m = a[r];
        m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(u, m.key, m);
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
    function c(u, a) {
      var r = Object.keys(u);
      if (Object.getOwnPropertySymbols) {
        var m = Object.getOwnPropertySymbols(u);
        a && (m = m.filter(function(l) {
          return Object.getOwnPropertyDescriptor(u, l).enumerable;
        })), r.push.apply(r, m);
      }
      return r;
    }
    function h(u) {
      for (var a = 1; a < arguments.length; a++) {
        var r = arguments[a] != null ? arguments[a] : {};
        a % 2 ? c(Object(r), !0).forEach(function(m) {
          i(u, m, r[m]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(r)) : c(Object(r)).forEach(function(m) {
          Object.defineProperty(u, m, Object.getOwnPropertyDescriptor(r, m));
        });
      }
      return u;
    }
    function p(u, a) {
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
      return f = Object.setPrototypeOf || function(m, l) {
        return m.__proto__ = l, m;
      }, f(u, a);
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
    function b(u, a, r) {
      return v() ? b = Reflect.construct : b = function(l, y, w) {
        var S = [null];
        S.push.apply(S, y);
        var D = Function.bind.apply(l, S), T = new D();
        return w && f(T, w.prototype), T;
      }, b.apply(null, arguments);
    }
    function _(u) {
      return Function.toString.call(u).indexOf("[native code]") !== -1;
    }
    function C(u) {
      var a = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return C = function(m) {
        if (m === null || !_(m))
          return m;
        if (typeof m != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof a < "u") {
          if (a.has(m))
            return a.get(m);
          a.set(m, l);
        }
        function l() {
          return b(m, arguments, g(this).constructor);
        }
        return l.prototype = Object.create(m.prototype, {
          constructor: {
            value: l,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), f(l, m);
      }, C(u);
    }
    function P(u) {
      if (u === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return u;
    }
    function I(u, a) {
      return a && (typeof a == "object" || typeof a == "function") ? a : P(u);
    }
    function K(u) {
      var a = v();
      return function() {
        var m = g(u), l;
        if (a) {
          var y = g(this).constructor;
          l = Reflect.construct(m, arguments, y);
        } else
          l = m.apply(this, arguments);
        return I(this, l);
      };
    }
    function X(u, a) {
      for (; !Object.prototype.hasOwnProperty.call(u, a) && (u = g(u), u !== null); )
        ;
      return u;
    }
    function B(u, a, r) {
      return typeof Reflect < "u" && Reflect.get ? B = Reflect.get : B = function(l, y, w) {
        var S = X(l, y);
        if (!!S) {
          var D = Object.getOwnPropertyDescriptor(S, y);
          return D.get ? D.get.call(w) : D.value;
        }
      }, B(u, a, r || u);
    }
    function le(u, a) {
      return E(u) || z(u, a) || Q(u, a) || fe();
    }
    function A(u) {
      return x(u) || H(u) || Q(u) || we();
    }
    function x(u) {
      if (Array.isArray(u))
        return ee(u);
    }
    function E(u) {
      if (Array.isArray(u))
        return u;
    }
    function H(u) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(u))
        return Array.from(u);
    }
    function z(u, a) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(u)))) {
        var r = [], m = !0, l = !1, y = void 0;
        try {
          for (var w = u[Symbol.iterator](), S; !(m = (S = w.next()).done) && (r.push(S.value), !(a && r.length === a)); m = !0)
            ;
        } catch (D) {
          l = !0, y = D;
        } finally {
          try {
            !m && w.return != null && w.return();
          } finally {
            if (l)
              throw y;
          }
        }
        return r;
      }
    }
    function Q(u, a) {
      if (!!u) {
        if (typeof u == "string")
          return ee(u, a);
        var r = Object.prototype.toString.call(u).slice(8, -1);
        if (r === "Object" && u.constructor && (r = u.constructor.name), r === "Map" || r === "Set")
          return Array.from(u);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return ee(u, a);
      }
    }
    function ee(u, a) {
      (a == null || a > u.length) && (a = u.length);
      for (var r = 0, m = new Array(a); r < a; r++)
        m[r] = u[r];
      return m;
    }
    function we() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function fe() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var U = function(a, r, m) {
      var l = a.x, y = a.y, w = m.x, S = m.y, D = {
        "+": {
          x: l + w,
          y: y + S
        },
        "-": {
          x: l - w,
          y: y - S
        },
        "*": {
          x: l * w,
          y: y * S
        },
        "/": {
          x: l / w,
          y: y / S
        }
      };
      return D[r];
    }, q = function(a) {
      return {
        x: a.left,
        y: a.top
      };
    }, me = function(a) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: a.x,
        top: a.y,
        right: a.x,
        bottom: a.y,
        width: r,
        height: r
      };
    }, Ae = function(a) {
      return {
        x: a,
        y: a
      };
    }, Ue = function(u, a, r) {
      window.addEventListener("resize", a), window.addEventListener("scroll", a), u.forEach(function(m, l) {
        r.observe(m, {
          childList: l !== 0,
          attributes: !0
        });
      });
    }, Ye = function(u) {
      var a = Oe(u);
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
        for (var m = arguments.length, l = new Array(m), y = 0; y < m; y++)
          l[y] = arguments[y];
        var w = function() {
          r = null, u.apply(void 0, l);
        };
        clearTimeout(r), r = setTimeout(w, a);
      };
    }, Pe = function() {
      var u, a, r, m;
      return {
        y: ((u = document.body) === null || u === void 0 ? void 0 : u.scrollTop) || ((a = document.documentElement) === null || a === void 0 ? void 0 : a.scrollTop) || 0,
        x: ((r = document.body) === null || r === void 0 ? void 0 : r.scrollLeft) || ((m = document.documentElement) === null || m === void 0 ? void 0 : m.scrollLeft) || 0
      };
    }, ft = function(u, a) {
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
    }, Oe = function(u) {
      return !u || u instanceof Document ? Pe() : {
        x: u.scrollLeft >= 0 ? u.scrollLeft : Pe().x,
        y: u.scrollTop >= 0 ? u.scrollTop : Pe().y
      };
    }, Nt = function(u) {
      var a = u.elementRect, r = u.containerRect, m = u.tolerance, l = m === void 0 ? {
        x: 0,
        y: 0
      } : m, y = [];
      return a.top - l.y < r.top && y.push("top"), a.left - l.x < r.left && y.push("left"), a.bottom + l.y > r.bottom && y.push("bottom"), a.right + l.y > r.right && y.push("right"), y;
    }, Br = function(u) {
      var a = u.event;
      return {
        x: a.clientX,
        y: a.clientY
      };
    }, Rr = function(u) {
      var a = u.scrollAmount, r = u.initialPointerPos, m = u.pointerPos, l = {};
      return m.x > r.x - a.x ? (l.left = r.x - a.x, l.width = m.x - r.x + a.x) : (l.left = m.x, l.width = r.x - m.x - a.x), m.y > r.y - a.y ? (l.top = r.y - a.y, l.height = m.y - r.y + a.y) : (l.top = m.y, l.height = r.y - m.y - a.y), l;
    }, Lt = function(a) {
      var r = {
        x: 0,
        y: 0
      }, m = window.getComputedStyle(a);
      if (!m.transform || m.transform === "none")
        return r;
      if (m.transform.indexOf("3d") >= 0) {
        var l = m.transform.trim().match(/matrix3d\((.*?)\)/);
        if (l && l.length) {
          var y, w = (y = l[1]) === null || y === void 0 ? void 0 : y.split(",");
          r.x = parseInt(w[12]) || 0, r.y = parseInt(w[13]) || 0;
        }
        return r;
      } else {
        var S = m.transform.trim().match(/matrix\((.*?)\)/);
        if (S && S.length) {
          var D, T = (D = S[1]) === null || D === void 0 ? void 0 : D.split(",");
          r.x = parseInt(T[4]) || 0, r.y = parseInt(T[5]) || 0;
        }
        return r;
      }
    }, Hr = function(a) {
      var r = a.style.transform;
      if (!r || r.indexOf("translate") < 0)
        return Lt(a);
      var m = {
        x: 0,
        y: 0
      }, l = r.trim().match(/translate[3dD]*?\(.*?\)/);
      if (l) {
        var y, w = (y = l[0]) === null || y === void 0 ? void 0 : y.split("(");
        if (w) {
          var S, D = (S = w[1]) === null || S === void 0 ? void 0 : S.split(",");
          m.x = parseInt(D[0]) || 0, m.y = parseInt(D[1]) || 0;
        }
      }
      return !m.x && !m.x ? Lt(a) : m;
    }, Kr = function(a) {
      var r = a.style, m = {
        x: parseInt(r.left) || 0,
        y: parseInt(r.top) || 0
      };
      if (!m.x && !m.x) {
        var l = window.getComputedStyle(a);
        return {
          x: parseInt(l.left) || 0,
          y: parseInt(l.top) || 0
        };
      }
      return m;
    }, Ur = function(u, a) {
      return a ? Hr(u) : Kr(u);
    }, Yr = function(u) {
      var a = u.element, r = u.edges, m = u.elementRect, l = u.containerRect, y = u.elementPos, w = u.useTransform;
      r.includes("top") && We(a, {
        y: y.y + l.top - m.top,
        x: y.x
      }, w), r.includes("left") && We(a, {
        y: y.y,
        x: y.x + l.left - m.left
      }, w), r.includes("bottom") && We(a, {
        y: y.y + l.bottom - m.bottom,
        x: y.x
      }, w), r.includes("right") && We(a, {
        y: y.y,
        x: y.x + l.right - m.right
      }, w);
    }, Vt = function(u) {
      var a = u.computedStyle, r = u.node, m = a.position, l = m === "absolute" || m === "relative" || m === "fixed";
      !(r instanceof HTMLDocument) && !l && (r.style.position = "relative");
    }, Wr = function(u) {
      var a = u.shiftKey, r = u.keyboardDragSpeed, m = u.zoom, l = u.key, y = u.dragKeys, w = u.scrollDiff, S = u.canScroll, D = u.scrollCallback, T = {
        x: 0,
        y: 0
      }, M = a ? r * 4 * m : r * m;
      return y.left.includes(l) && (T.x = w.x || -M, !a && !w.x && S && D(["left"], r)), y.right.includes(l) && (T.x = w.x || M, !a && !w.x && S && D(["right"], r)), y.up.includes(l) && (T.y = w.y || -M, !a && !w.y && S && D(["top"], r)), y.down.includes(l) && (T.y = w.y || M, !a && !w.y && S && D(["bottom"], r)), T;
    }, Xr = function(u) {
      var a = u.element, r = u.force, m = u.multiSelectionToggle, l = u.SelectedSet, y = u.hoverClassName;
      a.classList.contains(y) && !r || (l.has(a) ? m && l.delete(a) : l.add(a), a.classList.add(y));
    }, Fr = function(u) {
      var a = u.element, r = u.force, m = u.SelectedSet, l = u.PrevSelectedSet, y = u.hoverClassName;
      if (!a.classList.contains(y) && !r)
        return !1;
      var w = m.has(a), S = l.has(a);
      w && !S ? m.delete(a) : !w && S && m.add(a), a.classList.remove(y);
    }, mt = function(u, a) {
      return u.left < a.right && u.right > a.left && u.top < a.bottom && u.bottom > a.top;
    }, zt = function(u) {
      var a = u.element, r = u.posDirection, m = u.containerRect, l = u.useTransform, y = Ur(a, l), w = U(y, "+", r);
      We(a, w, l);
      var S = a.getBoundingClientRect(), D = Nt({
        elementRect: S,
        containerRect: m
      });
      Yr({
        element: a,
        edges: D,
        elementRect: S,
        containerRect: m,
        elementPos: w,
        useTransform: l
      });
    }, qr = function(u, a) {
      window.removeEventListener("resize", a), window.removeEventListener("scroll", a), u.disconnect();
    }, Gr = function(u, a, r) {
      if (!!a.length) {
        var m = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, l = u instanceof HTMLDocument ? m || document.body : u, y = a.includes("top") && l.scrollTop > 0, w = a.includes("bottom") && l.scrollTop < l.scrollHeight, S = a.includes("left") && l.scrollLeft > 0, D = a.includes("right") && l.scrollLeft < l.scrollWidth;
        y && (l.scrollTop -= 1 * r), w && (l.scrollTop += 1 * r), S && (l.scrollLeft -= 1 * r), D && (l.scrollLeft += 1 * r);
      }
    }, We = function(u, a, r) {
      if (r) {
        var m = u.style.transform;
        u.style.transform = "translate3d(".concat(a.x, "px,").concat(a.y, "px,1px) ").concat(m.replace(/translate.*?\)/g, ""));
      } else
        u.style.left = "".concat(a.x, "px"), u.style.top = "".concat(a.y, "px");
      return u;
    }, Zr = function(u) {
      for (var a = u.subscribe, r = u.publish, m = u.Interaction, l = u.SelectedSet, y = {
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
        var M = le(D[S], 2), O = M[0], N = M[1];
        ["pre", !1].forEach(function(F) {
          return a(F ? "".concat(O, ":").concat(F) : O, function(ae) {
            return N.forEach(function(Z) {
              return (!Z.condition || Z.condition(ae)) && r(F ? "".concat(F).concat(Z.name) : Z.name, h({
                items: l.elements,
                isDragging: m.isDragging
              }, ae));
            });
          });
        });
      }, S = 0, D = Object.entries(y); S < D.length; S++)
        w();
    }, Ie = function(u) {
      return u ? !Array.isArray(u) && (u instanceof HTMLElement || u instanceof SVGElement) ? [u] : A(u) : [];
    }, Bt = function(u, a) {
      u.style.left = "".concat(a.left, "px"), u.style.top = "".concat(a.top, "px"), u.style.width = "".concat(a.width, "px"), u.style.height = "".concat(a.height, "px");
    }, Jr = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.area, l = a.PS, y = a.zoom;
        t(this, u), i(this, "_modificationCallback", void 0), i(this, "_modificationObserver", void 0), i(this, "_zoom", void 0), i(this, "_node", void 0), i(this, "_parentNodes", void 0), i(this, "_computedStyle", void 0), i(this, "_computedBorder", void 0), i(this, "_rect", void 0), i(this, "setArea", function(w) {
          r._node = w, Vt({
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
          Ue(r.parentNodes, r._modificationCallback, r._modificationObserver);
        }), i(this, "reset", function() {
          r._computedStyle = void 0, r._rect = void 0, r._computedBorder = void 0, r._parentNodes = void 0;
        }), i(this, "stop", function() {
          qr(r._modificationObserver, r._modificationCallback), r.reset();
        }), i(this, "scroll", function(w, S) {
          var D = {
            scroll_directions: w,
            scroll_multiplier: S
          };
          r.PubSub.publish("Area:scroll:pre", D), Gr(r._node, w, S), r.PubSub.publish("Area:scroll", D);
        }), this._zoom = y, this.PubSub = l, this.setArea(m), this._modificationCallback = it(function(w) {
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
          return this._rect ? this._rect : this._rect = ft(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var r = function m(l) {
            var y, w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, S = (y = l[w]) === null || y === void 0 ? void 0 : y.parentNode;
            return S ? (l.push(S), w++, m(l, w)) : l;
          };
          return this._parentNodes = r([this.HTMLNode]), this._parentNodes;
        }
      }]), u;
    }(), Qr = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS, l = a.dragKeys, y = a.draggability, w = a.keyboardDrag, S = a.keyboardDragSpeed, D = a.useTransform, T = a.zoom;
        t(this, u), i(this, "_useTransform", void 0), i(this, "_prevCursorPos", void 0), i(this, "_prevScrollPos", void 0), i(this, "_elements", []), i(this, "_draggability", void 0), i(this, "_dragKeys", void 0), i(this, "_dragKeysFlat", void 0), i(this, "_keyboardDrag", void 0), i(this, "_keyboardDragSpeed", void 0), i(this, "_zoom", void 0), i(this, "keyboardDrag", function(M) {
          var O = M.event, N = M.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(N) || !r.DS.SelectedSet.size || !r._draggability || r.DS.continue)) {
            var F = {
              event: O,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:start:pre", "Interaction:start"], F), r._elements = r.DS.getSelection(), r.handleZIndex(!0);
            var ae = Wr({
              shiftKey: r.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: r._keyboardDragSpeed,
              zoom: r._zoom,
              key: N,
              scrollCallback: r.DS.Area.scroll,
              scrollDiff: r._scrollDiff,
              canScroll: r.DS.stores.ScrollStore.canScroll,
              dragKeys: r._dragKeys
            });
            r._elements.forEach(function(Z) {
              return zt({
                element: Z,
                posDirection: ae,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], F);
          }
        }), i(this, "keyboardEnd", function(M) {
          var O = M.event, N = M.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(N) || !r.DS.SelectedSet.size || !r._draggability)) {
            var F = {
              event: O,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], F);
          }
        }), i(this, "start", function(M) {
          var O = M.isDragging, N = M.isDraggingKeyboard;
          !O || N || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), i(this, "stop", function(M) {
          M != null && M.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), i(this, "update", function(M) {
          var O = M.isDragging, N = M.isDraggingKeyboard;
          if (!(!O || !r._elements.length || N || r.DS.continue)) {
            var F = U(r._cursorDiff, "+", r._scrollDiff);
            r._elements.forEach(function(ae) {
              return zt({
                element: ae,
                posDirection: F,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            });
          }
        }), i(this, "handleZIndex", function(M) {
          r._elements.forEach(function(O) {
            return O.style.zIndex = "".concat((parseInt(O.style.zIndex) || 0) + M ? 9999 : -9998);
          });
        }), this.DS = m, this._useTransform = D, this._keyboardDragSpeed = S, this._keyboardDrag = w, this._zoom = T, this._draggability = y, this._dragKeys = {
          up: l.up.map(function(M) {
            return M.toLowerCase();
          }),
          down: l.down.map(function(M) {
            return M.toLowerCase();
          }),
          left: l.left.map(function(M) {
            return M.toLowerCase();
          }),
          right: l.right.map(function(M) {
            return M.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(A(this._dragKeys.up), A(this._dragKeys.down), A(this._dragKeys.left), A(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return s(u, [{
        key: "_cursorDiff",
        get: function() {
          var r = this.DS.stores.PointerStore.currentVal, m = this._prevCursorPos ? U(r, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = r, m;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var r = this.DS.stores.ScrollStore.currentVal, m = this._prevScrollPos ? U(r, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = r, m;
        }
      }]), u;
    }(), ei = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS, l = a.areaElement, y = a.draggability, w = a.immediateDrag, S = a.selectableClass;
        t(this, u), i(this, "_areaElement", void 0), i(this, "_draggability", void 0), i(this, "_immediateDrag", void 0), i(this, "_selectableClass", void 0), i(this, "isInteracting", void 0), i(this, "isDragging", void 0), i(this, "init", function() {
          return r.DS.publish("Interaction:init:pre", {});
        }), i(this, "_init", function() {
          r.stop(), r._areaElement.addEventListener("mousedown", r.start), r._areaElement.addEventListener("touchstart", r.start, {
            passive: !1
          }), r.DS.publish("Interaction:init", {});
        }), i(this, "start", function(D) {
          return r.DS.publish("Interaction:start:pre", {
            event: D,
            isDragging: r.isDragging
          });
        }), i(this, "_start", function(D) {
          D.type === "touchstart" && D.preventDefault(), r._canInteract(D) && (r.isInteracting = !0, r.isDragging = r.isDragEvent(D), r.DS.publish("Interaction:start", {
            event: D,
            isDragging: r.isDragging
          }), document.addEventListener("mouseup", r.reset), document.addEventListener("touchend", r.reset));
        }), i(this, "isDragEvent", function(D) {
          var T = D.target.closest(".".concat(r._selectableClass));
          return !r._draggability || r.DS.stores.KeyStore.isMultiSelectKeyPressed(D) || !T ? !1 : (r._immediateDrag && (r.DS.SelectedSet.size ? r.DS.SelectedSet.has(T) || (r.DS.SelectedSet.clear(), r.DS.SelectedSet.add(
            T
          )) : r.DS.SelectedSet.add(
            T
          )), !!r.DS.SelectedSet.has(T));
        }), i(this, "onClick", function(D) {
          var T = D.event;
          if (!!r._canInteract(T) && !(T.detail > 0)) {
            var M = r.DS, O = M.stores, N = O.PointerStore, F = O.KeyStore, ae = M.SelectableSet, Z = M.SelectedSet;
            N.start(T);
            var je = T.target;
            !ae.has(je) || (F.isMultiSelectKeyPressed(T) || Z.clear(), Z.toggle(je), r.reset());
          }
        }), i(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), i(this, "update", function(D) {
          var T = D.event, M = D.scroll_directions, O = D.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: T,
            scroll_directions: M,
            scroll_multiplier: O,
            isDragging: r.isDragging
          });
        }), i(this, "reset", function(D) {
          return r.DS.publish("Interaction:end:pre", {
            event: D,
            isDragging: r.isDragging
          });
        }), i(this, "_reset", function(D) {
          var T = r.isDragging;
          r.stop(), r.init(), r.DS.publish("Interaction:end", {
            event: D,
            isDragging: T
          });
        }), this._areaElement = l, this._draggability = y, this._immediateDrag = w, this._selectableClass = S, this.DS = m, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(D) {
          var T = D.event;
          return r.start(T);
        }), this.DS.subscribe("Interaction:start:pre", function(D) {
          var T = D.event;
          return r._start(T);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(D) {
          var T = D.event;
          return r._reset(T);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return s(u, [{
        key: "_canInteract",
        value: function(r) {
          var m = r.clientX === 0 && r.clientY === 0 && r.detail === 0 && r.target;
          return !(r.button === 2 || this.isInteracting || r.target && !this.DS.SelectorArea.isInside(
            r.target
          ) || !m && !this.DS.SelectorArea.isClicked(r));
        }
      }]), u;
    }(), ti = function u(a) {
      var r = this, m = a.DS;
      t(this, u), i(this, "subscribers", {}), i(this, "subscribe", function(l, y) {
        return Array.isArray(r.subscribers[l]) || (r.subscribers[l] = []), r.subscribers[l].push(y), r.subscribers[l].length - 1;
      }), i(this, "unsubscribe", function(l, y, w) {
        w >= 0 ? r.subscribers[l].splice(w, 1) : y && (r.subscribers[l] = r.subscribers[l].filter(function(S) {
          return S !== y;
        }));
      }), i(this, "publish", function(l, y) {
        Array.isArray(l) ? l.forEach(function(w) {
          return r._publish(w, y);
        }) : r._publish(l, y);
      }), i(this, "_publish", function(l, y) {
        var w = r.subscribers[l];
        !Array.isArray(w) || (l.includes(":pre") ? r._handlePrePublish(w, y) : r._handlePublish(w, y));
      }), i(this, "_handlePublish", function(l, y) {
        for (var w = 0, S = l.length; w < S; w++) {
          if (r.DS.stopped)
            return;
          l[w](y);
        }
      }), i(this, "_handlePrePublish", function(l, y) {
        for (var w = l.length; w--; ) {
          if (r.DS.stopped)
            return;
          l[w](y);
        }
      }), this.DS = m;
    }, ri = /* @__PURE__ */ function(u) {
      p(r, u);
      var a = K(r);
      function r(m) {
        var l, y = m.elements, w = m.className, S = m.hoverClassName, D = m.draggability, T = m.useTransform, M = m.DS;
        return t(this, r), l = a.call(this), i(P(l), "_initElements", void 0), i(P(l), "_className", void 0), i(P(l), "_hoverClassName", void 0), i(P(l), "_useTransform", void 0), i(P(l), "_draggability", void 0), i(P(l), "init", function() {
          return l._initElements.forEach(function(O) {
            return l.add(O);
          });
        }), i(P(l), "clear", function() {
          return l.forEach(function(O) {
            return l.delete(O);
          });
        }), i(P(l), "_onClick", function(O) {
          return l.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: O
          });
        }), i(P(l), "_onPointer", function(O) {
          return l.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: O
          });
        }), i(P(l), "addAll", function(O) {
          return O.forEach(function(N) {
            return l.add(N);
          });
        }), i(P(l), "deleteAll", function(O) {
          return O.forEach(function(N) {
            return l.delete(N);
          });
        }), l.DS = M, l._initElements = Ie(y), l._className = w, l._hoverClassName = S, l._useTransform = T, l._draggability = D, l.DS.subscribe("Interaction:init", l.init), l;
      }
      return s(r, [{
        key: "add",
        value: function(l) {
          return l.classList.add(this._className), l.addEventListener("click", this._onClick), l.addEventListener("mousedown", this._onPointer), l.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Vt({
            computedStyle: window.getComputedStyle(l),
            node: l
          }), B(g(r.prototype), "add", this).call(this, l);
        }
      }, {
        key: "delete",
        value: function(l) {
          return l.classList.remove(this._className), l.classList.remove(this._hoverClassName), l.removeEventListener("click", this._onClick), l.removeEventListener("mousedown", this._onPointer), l.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), B(g(r.prototype), "delete", this).call(this, l);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ C(Set)), ii = /* @__PURE__ */ function(u) {
      p(r, u);
      var a = K(r);
      function r(m) {
        var l, y = m.className, w = m.DS;
        return t(this, r), l = a.call(this), i(P(l), "_className", void 0), i(P(l), "clear", function() {
          return l.forEach(function(S) {
            return l.delete(S);
          });
        }), i(P(l), "addAll", function(S) {
          return S.forEach(function(D) {
            return l.add(D);
          });
        }), i(P(l), "deleteAll", function(S) {
          return S.forEach(function(D) {
            return l.delete(D);
          });
        }), l.DS = w, l._className = y, l;
      }
      return s(r, [{
        key: "add",
        value: function(l) {
          if (!B(g(r.prototype), "has", this).call(this, l)) {
            var y = {
              items: this.elements,
              item: l
            };
            return this.DS.publish("Selected:added:pre", y), B(g(r.prototype), "add", this).call(this, l), l.classList.add(this._className), l.style.zIndex = "".concat((parseInt(l.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", y), this;
          }
        }
      }, {
        key: "delete",
        value: function(l) {
          if (!!B(g(r.prototype), "has", this).call(this, l)) {
            var y = {
              items: this.elements,
              item: l
            };
            this.DS.publish("Selected:removed:pre", y);
            var w = B(g(r.prototype), "delete", this).call(this, l);
            return l.classList.remove(this._className), l.style.zIndex = "".concat((parseInt(l.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", y), w;
          }
        }
      }, {
        key: "toggle",
        value: function(l) {
          return this.has(l) ? this.delete(l) : this.add(l), l;
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ C(Set)), ni = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS, l = a.hoverClassName, y = a.multiSelectToggling;
        t(this, u), i(this, "_prevSelectedSet", void 0), i(this, "_hoverClassName", void 0), i(this, "_multiSelectToggling", void 0), i(this, "start", function(w) {
          var S = w.event, D = w.isDragging;
          D || (r._storePrevious(S), r._handleInsideSelection(!0, S));
        }), i(this, "update", function(w) {
          var S = w.isDragging;
          S || r.DS.continue || r._handleInsideSelection();
        }), i(this, "_handleInsideSelection", function(w, S) {
          for (var D = r.DS, T = D.SelectableSet, M = D.SelectorArea, O = D.Selector, N = T.elements.map(function(Se) {
            return [Se, Se.getBoundingClientRect()];
          }), F = [], ae = [], Z = 0, je = N.length; Z < je; Z++)
            !M.isInside(N[Z][0], N[Z][1]) || (mt(N[Z][1], O.rect) ? F.push(N[Z][0]) : ae.push(N[Z][0]));
          var nt = r.DS.stores.KeyStore.isMultiSelectKeyPressed(S) && r._multiSelectToggling;
          r.DS.continue || (F.forEach(function(Se) {
            return Xr({
              element: Se,
              force: w,
              multiSelectionToggle: nt,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName
            });
          }), ae.forEach(function(Se) {
            return Fr({
              element: Se,
              force: w,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName,
              PrevSelectedSet: r._prevSelectedSet
            });
          }));
        }), this._hoverClassName = l, this._multiSelectToggling = y, this.DS = m, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return s(u, [{
        key: "_storePrevious",
        value: function(r) {
          var m = this.DS, l = m.stores.KeyStore, y = m.SelectedSet;
          l.isMultiSelectKeyPressed(r) ? this._prevSelectedSet = new Set(y) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), u;
    }(), oi = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS, l = a.selector, y = a.selectorClass, w = a.customStyles;
        t(this, u), i(this, "_rect", void 0), i(this, "start", function(S) {
          var D = S.isDragging;
          if (!D) {
            var T = r.DS.stores.PointerStore, M = T.initialValArea;
            Bt(r.HTMLNode, me(M, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), i(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), i(this, "update", function(S) {
          var D = S.isDragging;
          if (!(D || r.DS.continue)) {
            var T = r.DS.stores, M = T.ScrollStore, O = T.PointerStore, N = Rr({
              scrollAmount: M.scrollAmount,
              initialPointerPos: O.initialValArea,
              pointerPos: O.currentValArea
            });
            Bt(r.HTMLNode, N), r._rect = null;
          }
        }), this.DS = m, this.HTMLNode = l || rt(w), this.HTMLNode.classList.add(y), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return s(u, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), u;
    }(), ai = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS, l = a.selectorAreaClass, y = a.autoScrollSpeed, w = a.overflowTolerance;
        t(this, u), i(this, "_autoScrollSpeed", void 0), i(this, "_scrollInterval", void 0), i(this, "_rect", void 0), i(this, "currentEdges", []), i(this, "_overflowTolerance", void 0), i(this, "start", function() {
          return r.applyElements("append");
        }), i(this, "applyElements", function() {
          var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", D = document.body ? "body" : "documentElement", T = "".concat(S, "Child");
          r.HTMLNode[T](r.DS.Selector.HTMLNode), document[D][T](r.HTMLNode);
        }), i(this, "updatePos", function() {
          r._rect = null;
          var S = r.DS.Area.rect, D = r.DS.Area.computedBorder, T = r.HTMLNode.style, M = "".concat(S.top + D.top, "px"), O = "".concat(S.left + D.left, "px"), N = "".concat(S.width, "px"), F = "".concat(S.height, "px");
          T.top !== M && (T.top = M), T.left !== O && (T.left = O), T.width !== N && (T.width = N), T.height !== F && (T.height = F);
        }), i(this, "stop", function(S) {
          r.stopAutoScroll(), S && r.applyElements("remove");
        }), i(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), i(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var S = r.DS, D = S.stores.PointerStore, T = S.Area;
            r.currentEdges = Nt({
              elementRect: me(D.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && T.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), i(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), i(this, "isInside", function(S, D) {
          return r.DS.Area.HTMLNode.contains(S) && r.DS.stores.ScrollStore.canScroll ? !0 : mt(r.rect, D || S.getBoundingClientRect());
        }), this._autoScrollSpeed = y, this._overflowTolerance = w, this.DS = m, this.HTMLNode = tt(l), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          r.updatePos(), r.stopAutoScroll();
        });
      }
      return s(u, [{
        key: "isClicked",
        value: function(r) {
          var m = this.DS.stores.PointerStore, l = r ? m.getPointerPosition(r) : m.initialVal;
          return mt({
            left: l.x,
            top: l.y,
            right: l.x,
            bottom: l.y
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
        var r = this, m = a.DS, l = a.multiSelectKeys, y = a.multiSelectMode;
        t(this, u), i(this, "_multiSelectMode", void 0), i(this, "_multiSelectKeys", void 0), i(this, "_currentValues", /* @__PURE__ */ new Set()), i(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), i(this, "init", function() {
          document.addEventListener("keydown", r.keydown), document.addEventListener("keyup", r.keyup), window.addEventListener("blur", r.reset);
        }), i(this, "keydown", function(w) {
          var S = w.key.toLowerCase();
          r.DS.publish("KeyStore:down:pre", {
            event: w,
            key: S
          }), r._currentValues.add(S), r.DS.publish("KeyStore:down", {
            event: w,
            key: S
          });
        }), i(this, "keyup", function(w) {
          var S = w.key.toLowerCase();
          r.DS.publish("KeyStore:up:pre", {
            event: w,
            key: S
          }), r._currentValues.delete(S), r.DS.publish("KeyStore:up", {
            event: w,
            key: S
          });
        }), i(this, "stop", function() {
          document.removeEventListener("keydown", r.keydown), document.removeEventListener("keyup", r.reset), window.removeEventListener("blur", r.reset), r.reset();
        }), i(this, "reset", function() {
          return r._currentValues.clear();
        }), this.DS = m, this._multiSelectMode = y, this._multiSelectKeys = l.map(function(w) {
          var S = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, D = S[w];
          return D ? (console.warn("[DragSelect] ".concat(w, ' is deprecated. Use "').concat(D, '" instead. Act Now!. See docs for more info')), D.toLowerCase()) : w.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return s(u, [{
        key: "isMultiSelectKeyPressed",
        value: function(r) {
          var m = this;
          return !!(this._multiSelectMode || this.currentValues.some(function(l) {
            return m._multiSelectKeys.includes(l);
          }) || r && this._multiSelectKeys.some(function(l) {
            return r[m._keyMapping[l]];
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
        var r = this, m = a.DS;
        t(this, u), i(this, "_isMouseInteraction", !1), i(this, "_initialValArea", void 0), i(this, "_currentValArea", void 0), i(this, "_lastValArea", void 0), i(this, "_initialVal", void 0), i(this, "_currentVal", void 0), i(this, "_lastVal", void 0), i(this, "_lastTouch", void 0), i(this, "init", function() {
          document.addEventListener("mousemove", r.update), document.addEventListener("touchmove", r.update, {
            passive: !1
          });
        }), i(this, "getPointerPosition", function(l) {
          return Br({
            event: r._normalizedEvent(l)
          });
        }), i(this, "update", function(l) {
          !l || (r.DS.publish("PointerStore:updated:pre", {
            event: l
          }), r.currentVal = r.getPointerPosition(l), r._isMouseInteraction && r.DS.publish("PointerStore:updated", {
            event: l
          }));
        }), i(this, "stop", function() {
          document.removeEventListener("mousemove", r.update), document.removeEventListener("touchmove", r.update, {
            passive: !1
          }), setTimeout(function() {
            return r._isMouseInteraction = !1;
          }, 100);
        }), i(this, "reset", function(l) {
          !l || (r.currentVal = r.lastVal = r.getPointerPosition(l), r.stop(), r.init());
        }), this.DS = m, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(l) {
          var y = l.event;
          return r.start(y);
        }), this.DS.subscribe("Interaction:end", function(l) {
          var y = l.event;
          return r.reset(y);
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
          this._initialVal = r, this._initialValArea = r && U(r, "-", U(q(this.DS.Area.rect), "+", q(this.DS.Area.computedBorder)));
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
          this._currentVal = r, this._currentValArea = r && U(r, "-", U(q(this.DS.Area.rect), "+", q(this.DS.Area.computedBorder)));
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
          this._lastVal = r, this._lastValArea = r && U(r, "-", U(q(this.DS.Area.rect), "+", q(this.DS.Area.computedBorder)));
        }
      }]), u;
    }(), ci = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS, l = a.areaElement, y = a.zoom;
        t(this, u), i(this, "_initialVal", void 0), i(this, "_currentVal", void 0), i(this, "_areaElement", void 0), i(this, "_canScroll", void 0), i(this, "init", function() {
          return r._areaElement.addEventListener("scroll", r.update);
        }), i(this, "start", function() {
          r._currentVal = r._initialVal = Oe(r._areaElement), r._areaElement.addEventListener("scroll", r.update);
        }), i(this, "update", function() {
          return r._currentVal = Oe(r._areaElement);
        }), i(this, "stop", function() {
          r._areaElement.removeEventListener("scroll", r.update), r._initialVal = {
            x: 0,
            y: 0
          }, r._canScroll = null;
        }), i(this, "reset", function() {
          r.stop(), r.start();
        }), this._areaElement = l, this.DS = m, this.zoom = y, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return r.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return r.reset();
        });
      }
      return s(u, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = Ye(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var r = U(this.currentVal, "-", this.initialVal), m = Ae(this.zoom), l = U(U(r, "*", m), "-", r);
          return {
            x: r.x + l.x,
            y: r.y + l.y
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
          return this._currentVal || (this._currentVal = Oe(this._areaElement)), this._currentVal;
        }
      }]), u;
    }(), ui = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.area, l = m === void 0 ? document : m, y = a.selectables, w = y === void 0 ? [] : y, S = a.autoScrollSpeed, D = S === void 0 ? 5 : S, T = a.overflowTolerance, M = T === void 0 ? {
          x: 25,
          y: 25
        } : T, O = a.zoom, N = O === void 0 ? 1 : O, F = a.customStyles, ae = F === void 0 ? !1 : F, Z = a.multiSelectMode, je = Z === void 0 ? !1 : Z, nt = a.multiSelectToggling, Se = nt === void 0 ? !0 : nt, Rt = a.multiSelectKeys, di = Rt === void 0 ? ["Control", "Shift", "Meta"] : Rt, Ht = a.selector, hi = Ht === void 0 ? void 0 : Ht, Kt = a.draggability, pt = Kt === void 0 ? !0 : Kt, Ut = a.immediateDrag, fi = Ut === void 0 ? !0 : Ut, Yt = a.keyboardDrag, mi = Yt === void 0 ? !0 : Yt, pi = a.dragKeys, Wt = a.keyboardDragSpeed, gi = Wt === void 0 ? 10 : Wt, Xt = a.useTransform, Ft = Xt === void 0 ? !0 : Xt, qt = a.hoverClass, Gt = qt === void 0 ? "ds-hover" : qt, Zt = a.selectableClass, Jt = Zt === void 0 ? "ds-selectable" : Zt, Qt = a.selectedClass, vi = Qt === void 0 ? "ds-selected" : Qt, er = a.selectorClass, bi = er === void 0 ? "ds-selector" : er, tr = a.selectorAreaClass, yi = tr === void 0 ? "ds-selector-area" : tr, wi = a.callback, xi = a.onDragMove, _i = a.onDragStartBegin, Si = a.onDragStart, ki = a.onElementSelect, Di = a.onElementUnselect;
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
          onDragStart: Si,
          onDragStartBegin: _i,
          onElementSelect: ki,
          onElementUnselect: Di
        }), this.stores = {
          PointerStore: new li({
            DS: this
          }),
          ScrollStore: new ci({
            DS: this,
            areaElement: l,
            zoom: N
          }),
          KeyStore: new si({
            DS: this,
            multiSelectKeys: di,
            multiSelectMode: je
          })
        }, this.Area = new Jr({
          area: l,
          PS: this.PubSub,
          zoom: N
        }), this.Selector = new oi({
          DS: this,
          selector: hi,
          selectorClass: bi,
          customStyles: ae
        }), this.SelectorArea = new ai({
          DS: this,
          selectorAreaClass: yi,
          autoScrollSpeed: D,
          overflowTolerance: M
        }), this.SelectableSet = new ri({
          elements: w,
          DS: this,
          className: Jt,
          hoverClassName: Gt,
          useTransform: Ft,
          draggability: pt
        }), this.SelectedSet = new ii({
          DS: this,
          className: vi
        }), this.Selection = new ni({
          DS: this,
          hoverClassName: Gt,
          multiSelectToggling: Se
        }), this.Drag = new Qr({
          DS: this,
          draggability: pt,
          useTransform: Ft,
          keyboardDrag: mi,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, pi),
          zoom: N,
          keyboardDragSpeed: gi
        }), this.Interaction = new ei({
          areaElement: l,
          DS: this,
          draggability: pt,
          immediateDrag: fi,
          selectableClass: Jt
        }), Zr({
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
          var m = r.callback, l = r.onDragMove, y = r.onDragStart, w = r.onDragStartBegin, S = r.onElementSelect, D = r.onElementUnselect, T = function(O, N) {
            return console.warn("[DragSelect] ".concat(O, ' is deprecated. Use DragSelect.subscribe("').concat(N, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          m && (T("callback", "callback"), this.subscribe("callback", function(M) {
            var O = M.items;
            M.item;
            var N = M.event;
            return m(O, N);
          })), l && (T("onDragMove", "dragmove"), this.subscribe("dragmove", function(M) {
            M.items, M.item;
            var O = M.event;
            return l(O);
          })), y && (T("onDragStart", "dragstart"), this.subscribe("dragstart", function(M) {
            M.items, M.item;
            var O = M.event;
            return y(O);
          })), w && (T("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(M) {
            M.items, M.item;
            var O = M.event;
            return w(O);
          })), S && (T("onElementSelect", "elementselect"), this.subscribe("elementselect", function(M) {
            M.items;
            var O = M.item, N = M.event;
            return S(O, N);
          })), D && (T("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(M) {
            M.items;
            var O = M.item, N = M.event;
            return D(O, N);
          }));
        }
      }, {
        key: "stop",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          l && this.publish("callback", {
            items: this.getSelection()
          }), this.Interaction.stop(), this.Area.stop(), this.Drag.stop(), this.Selector.stop(), this.SelectorArea.stop(r), this.stores.KeyStore.stop(), this.stores.PointerStore.stop(), this.stores.ScrollStore.stop(), r && this.SelectableSet.clear(), m && this.SelectedSet.clear(), this.stopped = !0;
        }
      }, {
        key: "addSelection",
        value: function(r) {
          var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.addAll(Ie(r)), l || this.addSelectables(r), m && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(r) {
          var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(Ie(r)), l && this.removeSelectables(r), m && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(r) {
          var m = this, l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return Ie(r).forEach(function(w) {
            return m.SelectedSet.has(w) ? m.removeSelection(r, l, y) : m.addSelection(r, l, y);
          }), l && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "setSelection",
        value: function(r) {
          var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.clearSelection(), this.addSelection(r, m, l), this.getSelection();
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
          var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = Ie(r);
          return this.SelectableSet.addAll(l), m && this.SelectedSet.addAll(l), r;
        }
      }, {
        key: "setSelectables",
        value: function(r) {
          var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.removeSelectables(r, m), this.addSelectables(r, l);
        }
      }, {
        key: "removeSelectables",
        value: function(r) {
          var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return this.SelectableSet.deleteAll(Ie(r)), m && this.removeSelection(r), r;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var l = m ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), y = r ? m ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : m ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return U(l, "-", y);
        }
      }]), u;
    }();
    return ui;
  });
})(kr);
const sn = kr.exports, ln = (o, e, t, n, s) => (e = Math, t = e.log, n = 1024, s = t(o) / t(n) | 0, o / e.pow(n, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B"), cn = (o, e = "en-US") => new Date(o * 1e3).toLocaleString(e), un = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, dn = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), hn = [
  dn
], fn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, mn = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), pn = [
  mn
], gn = {
  name: "VFSortIcon"
}, bt = /* @__PURE__ */ Object.assign(gn, {
  props: { direction: String },
  setup(o) {
    return (e, t) => (k(), $("div", null, [
      o.direction == "down" ? (k(), $("svg", un, hn)) : se("", !0),
      o.direction == "up" ? (k(), $("svg", fn, pn)) : se("", !0)
    ]));
  }
}), vn = ["onClick"], bn = {
  name: "VFToast.vue"
}, yn = /* @__PURE__ */ Object.assign(bn, {
  setup(o) {
    const e = inject("emitter"), { getStore: t } = inject("storage"), n = j(t("full-screen", !1)), s = (p) => p == "error" ? "text-red-400 border-red-400" : "text-lime-600 border-lime-600", i = j([]), c = (p) => {
      i.value.splice(p, 1);
    }, h = (p) => {
      let g = i.value.findIndex((f) => f.id === p);
      g !== -1 && c(g);
    };
    return e.on("vf-toast-push", (p) => {
      let g = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      p.id = g, i.value.push(p), setTimeout(() => {
        h(g);
      }, 5e3);
    }), (p, g) => (k(), $("div", {
      class: de([n.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      pe(Mi, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: G(() => [
          (k(!0), $(ie, null, he(i.value, (f, v) => (k(), $("div", {
            onClick: (b) => c(v),
            key: f,
            class: de([s(f.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 border text-xs rounded cursor-pointer"])
          }, V(f.label), 11, vn))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), wn = { class: "relative flex-auto" }, xn = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, _n = /* @__PURE__ */ He(" Name "), Sn = /* @__PURE__ */ He(" Size "), kn = /* @__PURE__ */ He(" Date "), Dn = { class: "absolute" }, Cn = /* @__PURE__ */ d("svg", {
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
], -1), Mn = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, $n = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], En = { class: "grid grid-cols-12 items-center" }, Tn = { class: "flex col-span-7 items-center" }, An = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), On = [
  Pn
], In = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Nn = [
  jn
], Ln = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Vn = { class: "col-span-2 text-center" }, zn = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Bn = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Rn = { class: "relative" }, Hn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Un = [
  Kn
], Yn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Xn = [
  Wn
], Fn = { class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500" }, qn = { class: "break-all" }, Gn = {
  name: "VFExplorer"
}, Zn = /* @__PURE__ */ Object.assign(Gn, {
  props: {
    view: String,
    data: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { setStore: n, getStore: s } = inject("storage"), i = (A) => A == null ? void 0 : A.substring(0, 3), c = (A) => A.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), h = j(null), p = j(null), g = j(0), f = j(null), v = j(s("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      v.value = !v.value, n("full-screen", v.value);
    });
    const b = (A) => {
      A.type == "dir" ? t.emit("vf-fetch", { q: "index", adapter: e.data.adapter, path: A.path }) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: A });
    }, _ = lt({ active: !1, column: "", order: "" }), C = (A = !0) => {
      let x = [...e.data.files], E = _.column, H = _.order == "asc" ? 1 : -1;
      if (!A)
        return x;
      const z = (Q, ee) => typeof Q == "string" && typeof ee == "string" ? Q.toLowerCase().localeCompare(ee.toLowerCase()) : Q < ee ? -1 : Q > ee ? 1 : 0;
      return _.active && (x = x.slice().sort((Q, ee) => z(Q[E], ee[E]) * H)), x;
    }, P = (A) => {
      _.active && _.column == A ? (_.active = _.order == "asc", _.column = A, _.order = "desc") : (_.active = !0, _.column = A, _.order = "asc");
    }, I = () => f.value.getSelection().map((A) => JSON.parse(A.dataset.item)), K = (A, x) => {
      if (A.altKey || A.ctrlKey || A.metaKey)
        return A.preventDefault(), !1;
      A.dataTransfer.setDragImage(p.value, 0, 15), A.dataTransfer.effectAllowed = "all", A.dataTransfer.dropEffect = "copy", A.dataTransfer.setData("items", JSON.stringify(I()));
    }, X = (A, x) => {
      A.preventDefault();
      let E = JSON.parse(A.dataTransfer.getData("items"));
      if (E.find((H) => H.storage != s("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: E, to: x } });
    }, B = (A, x) => {
      A.preventDefault(), !x || x.type !== "dir" || f.value.getSelection().find((E) => E == A.currentTarget) ? (A.dataTransfer.dropEffect = "none", A.dataTransfer.effectAllowed = "none") : A.dataTransfer.dropEffect = "copy";
    };
    return ve(() => {
      f.value = new sn({
        area: h.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => dt(() => {
        f.value.clearSelection(), f.value.setSelectables(document.getElementsByClassName("vf-item"));
      })), f.value.subscribe("predragstart", ({ event: A, isDragging: x }) => {
        if (x)
          g.value = f.value.getSelection().length, f.value.break();
        else {
          const E = A.target.offsetWidth - A.offsetX, H = A.target.offsetHeight - A.offsetY;
          E < 15 && H < 15 && (f.value.clearSelection(), f.value.break());
        }
      }), f.value.subscribe("predragmove", ({ isDragging: A }) => {
        A && f.value.break();
      }), f.value.subscribe("callback", ({ items: A, event: x, isDragging: E }) => {
        t.emit("vf-nodes-selected", I()), g.value = f.value.getSelection().length;
      });
    }), ve(() => {
      _r(() => e.view, () => t.emit("vf-explorer-update"));
    }), (A, x) => (k(), $("div", wn, [
      o.view == "list" ? (k(), $("div", xn, [
        d("div", {
          onClick: x[0] || (x[0] = (E) => P("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center pl-1"
        }, [
          _n,
          xe(pe(bt, {
            direction: _.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [gt, _.active && _.column == "basename"]
          ])
        ]),
        d("div", {
          onClick: x[1] || (x[1] = (E) => P("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          Sn,
          xe(pe(bt, {
            direction: _.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [gt, _.active && _.column == "file_size"]
          ])
        ]),
        d("div", {
          onClick: x[2] || (x[2] = (E) => P("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center"
        }, [
          kn,
          xe(pe(bt, {
            direction: _.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [gt, _.active && _.column == "last_modified"]
          ])
        ])
      ])) : se("", !0),
      d("div", Dn, [
        d("div", {
          ref: (E) => p.value = E,
          class: "absolute -z-50 -top-96"
        }, [
          Cn,
          d("div", Mn, V(g.value), 1)
        ], 512)
      ]),
      d("div", {
        style: Sr(v.value ? "height: 100%;" : ""),
        class: de([v.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref: (E) => h.value = E,
        onContextmenu: x[3] || (x[3] = ze((E) => R(t).emit("vf-contextmenu-show", { event: E, area: h.value, items: I() }), ["self", "prevent"]))
      }, [
        o.view == "list" ? (k(!0), $(ie, { key: 0 }, he(C(), (E, H) => (k(), $("div", {
          draggable: "true",
          onDblclick: (z) => b(E),
          onContextmenu: ze((z) => R(t).emit("vf-contextmenu-show", { event: z, area: h.value, items: I(), target: E }), ["prevent"]),
          onDragstart: (z) => K(z),
          onDragover: (z) => B(z, E),
          onDrop: (z) => X(z, E),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": E.type,
          "data-item": JSON.stringify(E),
          "data-index": H
        }, [
          d("div", En, [
            d("div", Tn, [
              E.type == "dir" ? (k(), $("svg", An, On)) : (k(), $("svg", In, Nn)),
              d("span", Ln, V(E.basename), 1)
            ]),
            d("div", Vn, V(E.file_size ? R(ln)(E.file_size) : ""), 1),
            d("div", zn, V(R(cn)(E.last_modified)), 1)
          ])
        ], 40, $n))), 256)) : se("", !0),
        o.view == "grid" ? (k(!0), $(ie, { key: 1 }, he(C(!1), (E, H) => (k(), $("div", {
          draggable: "true",
          onDblclick: (z) => b(E),
          onContextmenu: ze((z) => R(t).emit("vf-contextmenu-show", { event: z, area: h.value, items: I(), target: E }), ["prevent"]),
          onDragstart: (z) => K(z),
          onDragover: (z) => B(z, E),
          onDrop: (z) => X(z, E),
          class: "vf-item border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none",
          "data-type": E.type,
          "data-item": JSON.stringify(E),
          "data-index": H
        }, [
          d("div", null, [
            d("div", Rn, [
              E.type == "dir" ? (k(), $("svg", Hn, Un)) : (k(), $("svg", Yn, Xn)),
              d("div", Fn, V(i(E.extension)), 1)
            ]),
            d("span", qn, V(c(E.basename)), 1)
          ])
        ], 40, Bn))), 256)) : se("", !0)
      ], 38),
      pe(yn)
    ]));
  }
}), Jn = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Qn = { class: "flex leading-5 items-center" }, eo = /* @__PURE__ */ d("div", {
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
], -1), to = ["value"], ro = { class: "ml-3" }, io = { class: "flex leading-5 items-center" }, no = /* @__PURE__ */ d("svg", {
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
], -1), oo = [
  no
], ao = {
  name: "VFStatusbar"
}, so = /* @__PURE__ */ Object.assign(ao, {
  props: {
    data: Object
  },
  setup(o) {
    var p;
    const e = o, t = inject("emitter"), { getStore: n, setStore: s } = inject("storage"), i = j(0), c = j((p = n("adapter")) != null ? p : e.data.adapter), h = () => {
      t.emit("vf-fetch", { q: "index", adapter: c.value }), s("adapter", c.value);
    };
    return t.on("vf-nodes-selected", (g) => {
      i.value = g.length;
    }), (g, f) => (k(), $("div", Jn, [
      d("div", Qn, [
        eo,
        xe(d("select", {
          "onUpdate:modelValue": f[0] || (f[0] = (v) => c.value = v),
          onChange: h,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (k(!0), $(ie, null, he(o.data.storages, (v) => (k(), $("option", { value: v }, V(v), 9, to))), 256))
        ], 544), [
          [$i, c.value]
        ]),
        d("span", ro, V(i.value > 0 ? i.value + " items selected." : ""), 1)
      ]),
      d("div", io, [
        d("span", {
          onClick: f[1] || (f[1] = (v) => R(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: "Vuefinder is a file manager component for vue 3." }))
        }, oo)
      ])
    ]));
  }
}), lo = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none" }, co = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), uo = [
  co
], ho = /* @__PURE__ */ d("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), fo = [
  ho
], mo = { class: "flex leading-5" }, po = /* @__PURE__ */ d("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), go = ["title", "onClick"], vo = {
  key: 1,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, bo = /* @__PURE__ */ d("svg", {
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
], -1), yo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), wo = [
  yo
], xo = {
  name: "VFBreadcrumb"
}, _o = /* @__PURE__ */ Object.assign(xo, {
  props: {
    data: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = j(null), i = j([]), c = j(!1), h = j(null);
    t.on("vf-explorer-update", (b) => {
      var P;
      let _ = [], C = [];
      s.value = (P = e.data.dirname) != null ? P : n("adapter", "local") + "://", s.value.length == 0 && (i.value = []), s.value.replace(n("adapter", "local") + "://", "").split("/").forEach(function(I) {
        _.push(I), _.join("/") != "" && C.push({
          basename: I,
          name: I,
          path: n("adapter", "local") + "://" + _.join("/"),
          type: "dir"
        });
      }), C.length > 4 && (C = C.slice(-5), C[0].name = ".."), i.value = C;
    });
    const p = () => {
      c.value = !1;
    }, g = () => {
      c.value = !0, dt(() => h.value.focus());
    }, f = (b) => {
      var C;
      b.preventDefault();
      let _ = JSON.parse(b.dataTransfer.getData("items"));
      if (_.find((P) => P.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: _, to: (C = i.value[i.value.length - 2]) != null ? C : { path: n("adapter", "local") + "://" } }
      });
    }, v = (b) => {
      b.preventDefault(), i.value.length < 1 ? (b.dataTransfer.dropEffect = "none", b.dataTransfer.effectAllowed = "none") : b.dataTransfer.dropEffect = "copy";
    };
    return (b, _) => (k(), $("div", lo, [
      (k(), $("svg", {
        onDragover: _[0] || (_[0] = (C) => v(C)),
        onDrop: _[1] || (_[1] = (C) => f(C)),
        onClick: _[2] || (_[2] = (C) => {
          var P, I;
          return !i.value.length || R(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: (I = (P = i.value[i.value.length - 2]) == null ? void 0 : P.path) != null ? I : R(n)("adapter", "local") + "://" });
        }),
        class: de(["h-6 w-6 p-0.5 rounded", i.value.length ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, uo, 34)),
      c.value ? (k(), $("div", vo, [
        bo,
        d("input", {
          ref: (C) => h.value = C,
          onKeydown: _[5] || (_[5] = Ke((C) => p(), ["esc"])),
          placeholder: "Search anything..",
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 544),
        (k(), $("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: _[6] || (_[6] = (C) => p()),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, wo))
      ])) : (k(), $("div", {
        key: 0,
        class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: _[4] || (_[4] = ze((C) => g(), ["self"]))
      }, [
        (k(), $("svg", {
          onClick: _[3] || (_[3] = (C) => R(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, fo)),
        d("div", mo, [
          (k(!0), $(ie, null, he(i.value, (C, P) => (k(), $("div", { key: P }, [
            po,
            d("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: C.basename,
              onClick: (I) => R(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: C.path })
            }, V(C.name), 9, go)
          ]))), 128))
        ])
      ]))
    ]));
  }
}), Te = (o) => Object.entries(o).map((e) => e.map(encodeURIComponent).join("=")).join("&"), So = ["onClick"], ko = /* @__PURE__ */ d("span", { class: "px-1" }, null, -1), Do = {
  name: "VFContextMenu"
}, Co = /* @__PURE__ */ Object.assign(Do, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), n = j(null), { apiUrl: s } = _e(), i = lt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), c = j([]);
    t.on("vf-context-selected", (f) => {
      c.value = f;
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
          t.emit("vf-modal-show", { type: "delete", items: c });
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
          t.emit("vf-modal-show", { type: "preview", adapter: e.current.adapter, item: c.value[0] });
        }
      },
      open: {
        title: "Open",
        action: () => {
          t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: c.value[0].path });
        }
      },
      download: {
        title: "Download",
        action: () => {
          const f = s.value + "?" + Te({ q: "download", adapter: c.value[0].adapter, path: c.value[0].path });
          t.emit("vf-download", f);
        }
      },
      archive: {
        title: "Archive",
        action: () => {
          t.emit("vf-modal-show", { type: "archive", items: c });
        }
      },
      unarchive: {
        title: "Unarchive",
        action: () => {
          t.emit("vf-modal-show", { type: "unarchive", items: c });
        }
      },
      rename: {
        title: "Rename",
        action: () => {
          t.emit("vf-modal-show", { type: "rename", items: c });
        }
      }
    }, p = (f) => {
      t.emit("vf-contextmenu-hide"), f.action();
    };
    t.on("vf-contextmenu-show", ({ event: f, area: v, items: b, target: _ = null }) => {
      i.items = [], _ ? b.length > 1 && b.some((C) => C.path === _.path) ? (i.items.push(h.refresh), i.items.push(h.archive), i.items.push(h.delete), t.emit("vf-context-selected", b), console.log(b.length + " selected (more than 1 item.)")) : (_.type == "dir" ? i.items.push(h.open) : i.items.push(h.preview), i.items.push(h.rename), i.items.push(h.download), _.mime_type == "application/zip" ? i.items.push(h.unarchive) : i.items.push(h.archive), i.items.push(h.delete), t.emit("vf-context-selected", [_]), console.log(_.type + " is selected")) : (i.items.push(h.refresh), i.items.push(h.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")), g(f, v);
    }), t.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const g = (f, v) => {
      i.active = !0, dt(() => {
        let b = v.getBoundingClientRect(), _ = f.pageX, C = f.pageY, P = n.value.offsetHeight, I = n.value.offsetWidth;
        _ = b.right - f.pageX + window.scrollX < I ? _ - I : _, C = b.bottom - f.pageY + window.scrollY < P ? C - P : C, i.positions = {
          left: _ + "px",
          top: C + "px"
        };
      });
    };
    return (f, v) => i.active ? (k(), $("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref: (b) => n.value = b,
      style: Sr(i.positions)
    }, [
      (k(!0), $(ie, null, he(i.items, (b) => (k(), $("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: b.title,
        onClick: (_) => p(b)
      }, [
        ko,
        d("span", null, V(b.title), 1)
      ], 8, So))), 128))
    ], 4)) : se("", !0);
  }
}), Mo = /* @__PURE__ */ d("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), $o = {
  name: "VueFinder"
}, Eo = /* @__PURE__ */ Object.assign($o, {
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
    const e = o, t = Ti();
    rr("emitter", t);
    const { setStore: n, getStore: s } = nr(e.id);
    rr("storage", nr(e.id));
    const { apiUrl: i, setApiUrl: c } = _e();
    c(e.url);
    const h = lt({ adapter: "local", storages: [], dirname: ".", files: [] }), p = j(s("viewport", "grid")), g = j(s("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      g.value = !g.value, n("darkMode", g.value);
    });
    const f = j(s("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      f.value = !f.value, n("full-screen", f.value);
    }), t.on("vf-view-toggle", (_) => {
      p.value = _;
    });
    const v = lt({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      v.active = !1;
    }), t.on("vf-modal-show", (_) => {
      v.active = !0, v.type = _.type, v.data = _;
    });
    const b = (_) => {
      Object.assign(h, _), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update", _);
    };
    return t.on("vf-fetch", (_) => {
      ct(i.value, { params: _ }).then((C) => {
        t.emit("vf-modal-close"), b(C);
      });
    }), t.on("vf-download", (_) => {
      document.getElementById("download_frame").src = _, t.emit("vf-modal-close");
    }), ve(() => {
      t.emit("vf-fetch", { q: "index", adapter: s("adapter", h.adapter) });
    }), (_, C) => (k(), $("div", {
      class: de(g.value ? "dark" : "")
    }, [
      d("div", {
        class: de([f.value ? "fixed w-screen inset-0 z-20" : "relative", "border flex flex-col rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        onMousedown: C[0] || (C[0] = (P) => R(t).emit("vf-contextmenu-hide"))
      }, [
        pe(on),
        pe(_o, { data: h }, null, 8, ["data"]),
        pe(Zn, {
          view: p.value,
          data: h
        }, null, 8, ["view", "data"]),
        pe(so, { data: h }, null, 8, ["data"])
      ], 34),
      v.active ? (k(), re(Ei("v-f-modal-" + v.type), {
        key: 0,
        selection: v.data,
        current: h
      }, null, 8, ["selection", "current"])) : se("", !0),
      pe(Co, { current: h }, null, 8, ["current"]),
      Mo
    ], 2));
  }
}), To = /* @__PURE__ */ d("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), Ao = { class: "fixed z-10 inset-0 overflow-y-auto" }, Po = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, Oo = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Io = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, ye = {
  __name: "ModalLayout",
  setup(o) {
    const e = inject("emitter");
    return ve(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, n) => (k(), $("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: n[1] || (n[1] = Ke((s) => R(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      To,
      d("div", Ao, [
        d("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = ze((s) => R(e).emit("vf-modal-close"), ["self"]))
        }, [
          d("div", Po, [
            d("div", Oo, [
              ir(t.$slots, "default")
            ]),
            d("div", Io, [
              ir(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, jo = { class: "sm:flex sm:items-start" }, No = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Lo = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Vo = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Delete files", -1), zo = { class: "mt-2" }, Bo = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500" }, "Are you sure you want to delete these files?", -1), Ro = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ho = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ko = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Uo = [
  Ko
], Yo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Xo = [
  Wo
], Fo = { class: "ml-1.5" }, qo = /* @__PURE__ */ d("div", { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, "This action cannot be undone.", -1), Go = {
  name: "VFModalDelete"
}, Zo = /* @__PURE__ */ Object.assign(Go, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = j(e.selection.items), i = () => {
      s.value.length && t.emit("vf-fetch", {
        q: "delete",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(s.value.map(({ path: c, type: h }) => ({ path: c, type: h })))
      });
    };
    return (c, h) => (k(), re(ye, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, delete!"),
        d("button", {
          type: "button",
          onClick: h[0] || (h[0] = (p) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel"),
        qo
      ]),
      default: G(() => [
        d("div", jo, [
          No,
          d("div", Lo, [
            Vo,
            d("div", zo, [
              Bo,
              (k(!0), $(ie, null, he(s.value, (p) => (k(), $("p", Ro, [
                p.type == "dir" ? (k(), $("svg", Ho, Uo)) : (k(), $("svg", Yo, Xo)),
                d("span", Fo, V(p.basename), 1)
              ]))), 256))
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Jo = { class: "sm:flex sm:items-start" }, Qo = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ea = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, ta = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ra = { class: "mt-2" }, ia = { class: "text-sm text-gray-500" }, na = {
  name: "VFModalMessage"
}, oa = /* @__PURE__ */ Object.assign(na, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = inject("emitter");
    return (t, n) => (k(), re(ye, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: n[0] || (n[0] = (s) => R(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close")
      ]),
      default: G(() => {
        var s, i, c, h;
        return [
          d("div", Jo, [
            Qo,
            d("div", ea, [
              d("h3", ta, V((i = (s = o.selection) == null ? void 0 : s.title) != null ? i : "Title"), 1),
              d("div", ra, [
                d("p", ia, V((h = (c = o.selection) == null ? void 0 : c.message) != null ? h : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), aa = { class: "sm:flex sm:items-start" }, sa = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), la = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ca = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New Folder", -1), ua = { class: "mt-2" }, da = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500" }, "Create a new folder", -1), ha = ["onKeyup"], fa = {
  name: "VFModalNewFolder"
}, ma = /* @__PURE__ */ Object.assign(fa, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = j(""), i = () => {
      s.value != "" && (t.emit("vf-fetch", {
        q: "newfolder",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: s.value
      }), t.emit("vf-toast-push", { label: "New Folder is created successfully", type: "success" }));
    };
    return (c, h) => (k(), re(ye, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (p) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", aa, [
          sa,
          d("div", la, [
            ca,
            d("div", ua, [
              da,
              xe(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (p) => s.value = p),
                onKeyup: Ke(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Folder Name",
                type: "text"
              }, null, 40, ha), [
                [et, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), pa = { class: "sm:flex sm:items-start" }, ga = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), va = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ba = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New File", -1), ya = { class: "mt-2" }, wa = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500" }, "Create a new file", -1), xa = ["onKeyup"], _a = {
  name: "VFModalNewFile"
}, Sa = /* @__PURE__ */ Object.assign(_a, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = j(""), i = () => {
      s.value != "" && t.emit("vf-fetch", {
        q: "newfile",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: s.value
      });
    };
    return (c, h) => (k(), re(ye, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (p) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", pa, [
          ga,
          d("div", va, [
            ba,
            d("div", ya, [
              wa,
              xe(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (p) => s.value = p),
                onKeyup: Ke(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "File Name",
                type: "text"
              }, null, 40, xa), [
                [et, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ka = { class: "flex" }, Da = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ca = { class: "ml-auto mb-2" }, Ma = {
  key: 0,
  class: "p-2 border font-normal border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, $a = { key: 1 }, Ea = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, n = j(""), s = j(""), i = j(null), c = j(!1), { apiUrl: h } = _e();
    ve(() => {
      ct(h.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((f) => {
        n.value = f, e("load");
      });
    });
    const p = () => {
      c.value = !c.value, s.value = n.value, c.value == !0 && dt(() => {
        i.value.focus();
      });
    }, g = () => {
      ct(h.value, {
        method: "POST",
        params: { q: "save", adapter: t.selection.adapter, path: t.selection.item.path, content: s.value },
        json: !1
      }).then((f) => {
        n.value = f, e("load"), c.value = !c.value;
      }).catch((f) => console.log(f.statusText));
    };
    return (f, v) => (k(), $(ie, null, [
      d("div", ka, [
        d("div", Da, V(o.selection.item.basename), 1),
        d("div", Ca, [
          c.value ? (k(), $("button", {
            key: 0,
            onClick: g,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Save")) : se("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: v[0] || (v[0] = (b) => p())
          }, V(c.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      d("div", null, [
        c.value ? (k(), $("div", $a, [
          xe(d("textarea", {
            ref: (b) => i.value = b,
            "onUpdate:modelValue": v[1] || (v[1] = (b) => s.value = b),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [et, s.value]
          ])
        ])) : (k(), $("pre", Ma, V(n.value), 1))
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
function ar(o, e) {
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
    e % 2 ? ar(Object(t), !0).forEach(function(n) {
      Pa(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : ar(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function st(o) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? st = function(e) {
    return typeof e;
  } : st = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, st(o);
}
function Ta(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function sr(o, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(o, n.key, n);
  }
}
function Aa(o, e, t) {
  return e && sr(o.prototype, e), t && sr(o, t), o;
}
function Pa(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function Cr(o) {
  return Oa(o) || Ia(o) || ja(o) || Na();
}
function Oa(o) {
  if (Array.isArray(o))
    return _t(o);
}
function Ia(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null)
    return Array.from(o);
}
function ja(o, e) {
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
function Na() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var ht = typeof window < "u" && typeof window.document < "u", be = ht ? window : {}, At = ht && be.document.documentElement ? "ontouchstart" in be.document.documentElement : !1, Pt = ht ? "PointerEvent" in be : !1, Y = "cropper", Ot = "all", Mr = "crop", $r = "move", Er = "zoom", Me = "e", $e = "w", Ne = "s", ke = "n", Xe = "ne", Fe = "nw", qe = "se", Ge = "sw", St = "".concat(Y, "-crop"), lr = "".concat(Y, "-disabled"), oe = "".concat(Y, "-hidden"), cr = "".concat(Y, "-hide"), La = "".concat(Y, "-invisible"), ut = "".concat(Y, "-modal"), kt = "".concat(Y, "-move"), Je = "".concat(Y, "Action"), ot = "".concat(Y, "Preview"), It = "crop", Tr = "move", Ar = "none", Dt = "crop", Ct = "cropend", Mt = "cropmove", $t = "cropstart", ur = "dblclick", Va = At ? "touchstart" : "mousedown", za = At ? "touchmove" : "mousemove", Ba = At ? "touchend touchcancel" : "mouseup", dr = Pt ? "pointerdown" : Va, hr = Pt ? "pointermove" : za, fr = Pt ? "pointerup pointercancel" : Ba, mr = "ready", pr = "resize", gr = "wheel", Et = "zoom", vr = "image/jpeg", Ra = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, Ha = /^data:/, Ka = /^data:image\/jpeg;base64,/, Ua = /^img|canvas$/i, Pr = 200, Or = 100, br = {
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
  minContainerWidth: Pr,
  minContainerHeight: Or,
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, Ya = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', Wa = Number.isNaN || be.isNaN;
function L(o) {
  return typeof o == "number" && !Wa(o);
}
var yr = function(e) {
  return e > 0 && e < 1 / 0;
};
function yt(o) {
  return typeof o > "u";
}
function Ee(o) {
  return st(o) === "object" && o !== null;
}
var Xa = Object.prototype.hasOwnProperty;
function Le(o) {
  if (!Ee(o))
    return !1;
  try {
    var e = o.constructor, t = e.prototype;
    return e && t && Xa.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function ne(o) {
  return typeof o == "function";
}
var Fa = Array.prototype.slice;
function Ir(o) {
  return Array.from ? Array.from(o) : Fa.call(o);
}
function J(o, e) {
  return o && ne(e) && (Array.isArray(o) || L(o.length) ? Ir(o).forEach(function(t, n) {
    e.call(o, t, n, o);
  }) : Ee(o) && Object.keys(o).forEach(function(t) {
    e.call(o, o[t], t, o);
  })), o;
}
var W = Object.assign || function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
    n[s - 1] = arguments[s];
  return Ee(e) && n.length > 0 && n.forEach(function(i) {
    Ee(i) && Object.keys(i).forEach(function(c) {
      e[c] = i[c];
    });
  }), e;
}, qa = /\.\d*(?:0|9){12}\d*$/;
function Be(o) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return qa.test(o) ? Math.round(o * e) / e : o;
}
var Ga = /^width|height|left|top|marginLeft|marginTop$/;
function De(o, e) {
  var t = o.style;
  J(e, function(n, s) {
    Ga.test(s) && L(n) && (n = "".concat(n, "px")), t[s] = n;
  });
}
function Za(o, e) {
  return o.classList ? o.classList.contains(e) : o.className.indexOf(e) > -1;
}
function te(o, e) {
  if (!!e) {
    if (L(o.length)) {
      J(o, function(n) {
        te(n, e);
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
function ge(o, e) {
  if (!!e) {
    if (L(o.length)) {
      J(o, function(t) {
        ge(t, e);
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
function Ve(o, e, t) {
  if (!!e) {
    if (L(o.length)) {
      J(o, function(n) {
        Ve(n, e, t);
      });
      return;
    }
    t ? te(o, e) : ge(o, e);
  }
}
var Ja = /([a-z\d])([A-Z])/g;
function jt(o) {
  return o.replace(Ja, "$1-$2").toLowerCase();
}
function Tt(o, e) {
  return Ee(o[e]) ? o[e] : o.dataset ? o.dataset[e] : o.getAttribute("data-".concat(jt(e)));
}
function Qe(o, e, t) {
  Ee(t) ? o[e] = t : o.dataset ? o.dataset[e] = t : o.setAttribute("data-".concat(jt(e)), t);
}
function Qa(o, e) {
  if (Ee(o[e]))
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
    o.removeAttribute("data-".concat(jt(e)));
}
var jr = /\s\s*/, Nr = function() {
  var o = !1;
  if (ht) {
    var e = !1, t = function() {
    }, n = Object.defineProperty({}, "once", {
      get: function() {
        return o = !0, e;
      },
      set: function(i) {
        e = i;
      }
    });
    be.addEventListener("test", t, n), be.removeEventListener("test", t, n);
  }
  return o;
}();
function ue(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, s = t;
  e.trim().split(jr).forEach(function(i) {
    if (!Nr) {
      var c = o.listeners;
      c && c[i] && c[i][t] && (s = c[i][t], delete c[i][t], Object.keys(c[i]).length === 0 && delete c[i], Object.keys(c).length === 0 && delete o.listeners);
    }
    o.removeEventListener(i, s, n);
  });
}
function ce(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, s = t;
  e.trim().split(jr).forEach(function(i) {
    if (n.once && !Nr) {
      var c = o.listeners, h = c === void 0 ? {} : c;
      s = function() {
        delete h[i][t], o.removeEventListener(i, s, n);
        for (var g = arguments.length, f = new Array(g), v = 0; v < g; v++)
          f[v] = arguments[v];
        t.apply(o, f);
      }, h[i] || (h[i] = {}), h[i][t] && o.removeEventListener(i, h[i][t], n), h[i][t] = s, o.listeners = h;
    }
    o.addEventListener(i, s, n);
  });
}
function Re(o, e, t) {
  var n;
  return ne(Event) && ne(CustomEvent) ? n = new CustomEvent(e, {
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
var wt = be.location, es = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function wr(o) {
  var e = o.match(es);
  return e !== null && (e[1] !== wt.protocol || e[2] !== wt.hostname || e[3] !== wt.port);
}
function xr(o) {
  var e = "timestamp=".concat(new Date().getTime());
  return o + (o.indexOf("?") === -1 ? "?" : "&") + e;
}
function Ze(o) {
  var e = o.rotate, t = o.scaleX, n = o.scaleY, s = o.translateX, i = o.translateY, c = [];
  L(s) && s !== 0 && c.push("translateX(".concat(s, "px)")), L(i) && i !== 0 && c.push("translateY(".concat(i, "px)")), L(e) && e !== 0 && c.push("rotate(".concat(e, "deg)")), L(t) && t !== 1 && c.push("scaleX(".concat(t, ")")), L(n) && n !== 1 && c.push("scaleY(".concat(n, ")"));
  var h = c.length ? c.join(" ") : "none";
  return {
    WebkitTransform: h,
    msTransform: h,
    transform: h
  };
}
function ts(o) {
  var e = Dr({}, o), t = 0;
  return J(o, function(n, s) {
    delete e[s], J(e, function(i) {
      var c = Math.abs(n.startX - i.startX), h = Math.abs(n.startY - i.startY), p = Math.abs(n.endX - i.endX), g = Math.abs(n.endY - i.endY), f = Math.sqrt(c * c + h * h), v = Math.sqrt(p * p + g * g), b = (v - f) / f;
      Math.abs(b) > Math.abs(t) && (t = b);
    });
  }), t;
}
function at(o, e) {
  var t = o.pageX, n = o.pageY, s = {
    endX: t,
    endY: n
  };
  return e ? s : Dr({
    startX: t,
    startY: n
  }, s);
}
function rs(o) {
  var e = 0, t = 0, n = 0;
  return J(o, function(s) {
    var i = s.startX, c = s.startY;
    e += i, t += c, n += 1;
  }), e /= n, t /= n, {
    pageX: e,
    pageY: t
  };
}
function Ce(o) {
  var e = o.aspectRatio, t = o.height, n = o.width, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", i = yr(n), c = yr(t);
  if (i && c) {
    var h = t * e;
    s === "contain" && h > n || s === "cover" && h < n ? t = n / e : n = t * e;
  } else
    i ? t = n / e : c && (n = t * e);
  return {
    width: n,
    height: t
  };
}
function is(o) {
  var e = o.width, t = o.height, n = o.degree;
  if (n = Math.abs(n) % 180, n === 90)
    return {
      width: t,
      height: e
    };
  var s = n % 90 * Math.PI / 180, i = Math.sin(s), c = Math.cos(s), h = e * c + t * i, p = e * i + t * c;
  return n > 90 ? {
    width: p,
    height: h
  } : {
    width: h,
    height: p
  };
}
function ns(o, e, t, n) {
  var s = e.aspectRatio, i = e.naturalWidth, c = e.naturalHeight, h = e.rotate, p = h === void 0 ? 0 : h, g = e.scaleX, f = g === void 0 ? 1 : g, v = e.scaleY, b = v === void 0 ? 1 : v, _ = t.aspectRatio, C = t.naturalWidth, P = t.naturalHeight, I = n.fillColor, K = I === void 0 ? "transparent" : I, X = n.imageSmoothingEnabled, B = X === void 0 ? !0 : X, le = n.imageSmoothingQuality, A = le === void 0 ? "low" : le, x = n.maxWidth, E = x === void 0 ? 1 / 0 : x, H = n.maxHeight, z = H === void 0 ? 1 / 0 : H, Q = n.minWidth, ee = Q === void 0 ? 0 : Q, we = n.minHeight, fe = we === void 0 ? 0 : we, U = document.createElement("canvas"), q = U.getContext("2d"), me = Ce({
    aspectRatio: _,
    width: E,
    height: z
  }), Ae = Ce({
    aspectRatio: _,
    width: ee,
    height: fe
  }, "cover"), Ue = Math.min(me.width, Math.max(Ae.width, C)), Ye = Math.min(me.height, Math.max(Ae.height, P)), tt = Ce({
    aspectRatio: s,
    width: E,
    height: z
  }), rt = Ce({
    aspectRatio: s,
    width: ee,
    height: fe
  }, "cover"), it = Math.min(tt.width, Math.max(rt.width, i)), Pe = Math.min(tt.height, Math.max(rt.height, c)), ft = [-it / 2, -Pe / 2, it, Pe];
  return U.width = Be(Ue), U.height = Be(Ye), q.fillStyle = K, q.fillRect(0, 0, Ue, Ye), q.save(), q.translate(Ue / 2, Ye / 2), q.rotate(p * Math.PI / 180), q.scale(f, b), q.imageSmoothingEnabled = B, q.imageSmoothingQuality = A, q.drawImage.apply(q, [o].concat(Cr(ft.map(function(Oe) {
    return Math.floor(Be(Oe));
  })))), q.restore(), U;
}
var Vr = String.fromCharCode;
function os(o, e, t) {
  var n = "";
  t += e;
  for (var s = e; s < t; s += 1)
    n += Vr(o.getUint8(s));
  return n;
}
var as = /^data:.*,/;
function ss(o) {
  var e = o.replace(as, ""), t = atob(e), n = new ArrayBuffer(t.length), s = new Uint8Array(n);
  return J(s, function(i, c) {
    s[c] = t.charCodeAt(c);
  }), n;
}
function ls(o, e) {
  for (var t = [], n = 8192, s = new Uint8Array(o); s.length > 0; )
    t.push(Vr.apply(null, Ir(s.subarray(0, n)))), s = s.subarray(n);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function cs(o) {
  var e = new DataView(o), t;
  try {
    var n, s, i;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var c = e.byteLength, h = 2; h + 1 < c; ) {
        if (e.getUint8(h) === 255 && e.getUint8(h + 1) === 225) {
          s = h;
          break;
        }
        h += 1;
      }
    if (s) {
      var p = s + 4, g = s + 10;
      if (os(e, p, 4) === "Exif") {
        var f = e.getUint16(g);
        if (n = f === 18761, (n || f === 19789) && e.getUint16(g + 2, n) === 42) {
          var v = e.getUint32(g + 4, n);
          v >= 8 && (i = g + v);
        }
      }
    }
    if (i) {
      var b = e.getUint16(i, n), _, C;
      for (C = 0; C < b; C += 1)
        if (_ = i + C * 12 + 2, e.getUint16(_, n) === 274) {
          _ += 8, t = e.getUint16(_, n), e.setUint16(_, 1, n);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function us(o) {
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
var ds = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, n = this.container, s = this.cropper, i = Number(t.minContainerWidth), c = Number(t.minContainerHeight);
    te(s, oe), ge(e, oe);
    var h = {
      width: Math.max(n.offsetWidth, i >= 0 ? i : Pr),
      height: Math.max(n.offsetHeight, c >= 0 ? c : Or)
    };
    this.containerData = h, De(s, {
      width: h.width,
      height: h.height
    }), te(e, oe), ge(s, oe);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, n = this.options.viewMode, s = Math.abs(t.rotate) % 180 === 90, i = s ? t.naturalHeight : t.naturalWidth, c = s ? t.naturalWidth : t.naturalHeight, h = i / c, p = e.width, g = e.height;
    e.height * h > e.width ? n === 3 ? p = e.height * h : g = e.width / h : n === 3 ? g = e.width / h : p = e.height * h;
    var f = {
      aspectRatio: h,
      naturalWidth: i,
      naturalHeight: c,
      width: p,
      height: g
    };
    this.canvasData = f, this.limited = n === 1 || n === 2, this.limitCanvas(!0, !0), f.width = Math.min(Math.max(f.width, f.minWidth), f.maxWidth), f.height = Math.min(Math.max(f.height, f.minHeight), f.maxHeight), f.left = (e.width - f.width) / 2, f.top = (e.height - f.height) / 2, f.oldLeft = f.left, f.oldTop = f.top, this.initialCanvasData = W({}, f);
  },
  limitCanvas: function(e, t) {
    var n = this.options, s = this.containerData, i = this.canvasData, c = this.cropBoxData, h = n.viewMode, p = i.aspectRatio, g = this.cropped && c;
    if (e) {
      var f = Number(n.minCanvasWidth) || 0, v = Number(n.minCanvasHeight) || 0;
      h > 1 ? (f = Math.max(f, s.width), v = Math.max(v, s.height), h === 3 && (v * p > f ? f = v * p : v = f / p)) : h > 0 && (f ? f = Math.max(f, g ? c.width : 0) : v ? v = Math.max(v, g ? c.height : 0) : g && (f = c.width, v = c.height, v * p > f ? f = v * p : v = f / p));
      var b = Ce({
        aspectRatio: p,
        width: f,
        height: v
      });
      f = b.width, v = b.height, i.minWidth = f, i.minHeight = v, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
    }
    if (t)
      if (h > (g ? 0 : 1)) {
        var _ = s.width - i.width, C = s.height - i.height;
        i.minLeft = Math.min(0, _), i.minTop = Math.min(0, C), i.maxLeft = Math.max(0, _), i.maxTop = Math.max(0, C), g && this.limited && (i.minLeft = Math.min(c.left, c.left + (c.width - i.width)), i.minTop = Math.min(c.top, c.top + (c.height - i.height)), i.maxLeft = c.left, i.maxTop = c.top, h === 2 && (i.width >= s.width && (i.minLeft = Math.min(0, _), i.maxLeft = Math.max(0, _)), i.height >= s.height && (i.minTop = Math.min(0, C), i.maxTop = Math.max(0, C))));
      } else
        i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = s.width, i.maxTop = s.height;
  },
  renderCanvas: function(e, t) {
    var n = this.canvasData, s = this.imageData;
    if (t) {
      var i = is({
        width: s.naturalWidth * Math.abs(s.scaleX || 1),
        height: s.naturalHeight * Math.abs(s.scaleY || 1),
        degree: s.rotate || 0
      }), c = i.width, h = i.height, p = n.width * (c / n.naturalWidth), g = n.height * (h / n.naturalHeight);
      n.left -= (p - n.width) / 2, n.top -= (g - n.height) / 2, n.width = p, n.height = g, n.aspectRatio = c / h, n.naturalWidth = c, n.naturalHeight = h, this.limitCanvas(!0, !1);
    }
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCanvas(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, De(this.canvas, W({
      width: n.width,
      height: n.height
    }, Ze({
      translateX: n.left,
      translateY: n.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var t = this.canvasData, n = this.imageData, s = n.naturalWidth * (t.width / t.naturalWidth), i = n.naturalHeight * (t.height / t.naturalHeight);
    W(n, {
      width: s,
      height: i,
      left: (t.width - s) / 2,
      top: (t.height - i) / 2
    }), De(this.image, W({
      width: n.width,
      height: n.height
    }, Ze(W({
      translateX: n.left,
      translateY: n.top
    }, n)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, n = e.aspectRatio || e.initialAspectRatio, s = Number(e.autoCropArea) || 0.8, i = {
      width: t.width,
      height: t.height
    };
    n && (t.height * n > t.width ? i.height = i.width / n : i.width = i.height * n), this.cropBoxData = i, this.limitCropBox(!0, !0), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), i.width = Math.max(i.minWidth, i.width * s), i.height = Math.max(i.minHeight, i.height * s), i.left = t.left + (t.width - i.width) / 2, i.top = t.top + (t.height - i.height) / 2, i.oldLeft = i.left, i.oldTop = i.top, this.initialCropBoxData = W({}, i);
  },
  limitCropBox: function(e, t) {
    var n = this.options, s = this.containerData, i = this.canvasData, c = this.cropBoxData, h = this.limited, p = n.aspectRatio;
    if (e) {
      var g = Number(n.minCropBoxWidth) || 0, f = Number(n.minCropBoxHeight) || 0, v = h ? Math.min(s.width, i.width, i.width + i.left, s.width - i.left) : s.width, b = h ? Math.min(s.height, i.height, i.height + i.top, s.height - i.top) : s.height;
      g = Math.min(g, s.width), f = Math.min(f, s.height), p && (g && f ? f * p > g ? f = g / p : g = f * p : g ? f = g / p : f && (g = f * p), b * p > v ? b = v / p : v = b * p), c.minWidth = Math.min(g, v), c.minHeight = Math.min(f, b), c.maxWidth = v, c.maxHeight = b;
    }
    t && (h ? (c.minLeft = Math.max(0, i.left), c.minTop = Math.max(0, i.top), c.maxLeft = Math.min(s.width, i.left + i.width) - c.width, c.maxTop = Math.min(s.height, i.top + i.height) - c.height) : (c.minLeft = 0, c.minTop = 0, c.maxLeft = s.width - c.width, c.maxTop = s.height - c.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, n = this.cropBoxData;
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCropBox(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, e.movable && e.cropBoxMovable && Qe(this.face, Je, n.width >= t.width && n.height >= t.height ? $r : Ot), De(this.cropBox, W({
      width: n.width,
      height: n.height
    }, Ze({
      translateX: n.left,
      translateY: n.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), Re(this.element, Dt, this.getData());
  }
}, hs = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, n = this.options.preview, s = t ? this.crossOriginUrl : this.url, i = e.alt || "The image to preview", c = document.createElement("img");
    if (t && (c.crossOrigin = t), c.src = s, c.alt = i, this.viewBox.appendChild(c), this.viewBoxImage = c, !!n) {
      var h = n;
      typeof n == "string" ? h = e.ownerDocument.querySelectorAll(n) : n.querySelector && (h = [n]), this.previews = h, J(h, function(p) {
        var g = document.createElement("img");
        Qe(p, ot, {
          width: p.offsetWidth,
          height: p.offsetHeight,
          html: p.innerHTML
        }), t && (g.crossOrigin = t), g.src = s, g.alt = i, g.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', p.innerHTML = "", p.appendChild(g);
      });
    }
  },
  resetPreview: function() {
    J(this.previews, function(e) {
      var t = Tt(e, ot);
      De(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, Qa(e, ot);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, n = this.cropBoxData, s = n.width, i = n.height, c = e.width, h = e.height, p = n.left - t.left - e.left, g = n.top - t.top - e.top;
    !this.cropped || this.disabled || (De(this.viewBoxImage, W({
      width: c,
      height: h
    }, Ze(W({
      translateX: -p,
      translateY: -g
    }, e)))), J(this.previews, function(f) {
      var v = Tt(f, ot), b = v.width, _ = v.height, C = b, P = _, I = 1;
      s && (I = b / s, P = i * I), i && P > _ && (I = _ / i, C = s * I, P = _), De(f, {
        width: C,
        height: P
      }), De(f.getElementsByTagName("img")[0], W({
        width: c * I,
        height: h * I
      }, Ze(W({
        translateX: -p * I,
        translateY: -g * I
      }, e))));
    }));
  }
}, fs = {
  bind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    ne(t.cropstart) && ce(e, $t, t.cropstart), ne(t.cropmove) && ce(e, Mt, t.cropmove), ne(t.cropend) && ce(e, Ct, t.cropend), ne(t.crop) && ce(e, Dt, t.crop), ne(t.zoom) && ce(e, Et, t.zoom), ce(n, dr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && ce(n, gr, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ce(n, ur, this.onDblclick = this.dblclick.bind(this)), ce(e.ownerDocument, hr, this.onCropMove = this.cropMove.bind(this)), ce(e.ownerDocument, fr, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && ce(window, pr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    ne(t.cropstart) && ue(e, $t, t.cropstart), ne(t.cropmove) && ue(e, Mt, t.cropmove), ne(t.cropend) && ue(e, Ct, t.cropend), ne(t.crop) && ue(e, Dt, t.crop), ne(t.zoom) && ue(e, Et, t.zoom), ue(n, dr, this.onCropStart), t.zoomable && t.zoomOnWheel && ue(n, gr, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ue(n, ur, this.onDblclick), ue(e.ownerDocument, hr, this.onCropMove), ue(e.ownerDocument, fr, this.onCropEnd), t.responsive && ue(window, pr, this.onResize);
  }
}, ms = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, n = this.containerData, s = t.offsetWidth / n.width, i = t.offsetHeight / n.height, c = Math.abs(s - 1) > Math.abs(i - 1) ? s : i;
      if (c !== 1) {
        var h, p;
        e.restore && (h = this.getCanvasData(), p = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(J(h, function(g, f) {
          h[f] = g * c;
        })), this.setCropBoxData(J(p, function(g, f) {
          p[f] = g * c;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Ar || this.setDragMode(Za(this.dragBox, St) ? Tr : It);
  },
  wheel: function(e) {
    var t = this, n = Number(this.options.wheelZoomRatio) || 0.1, s = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      t.wheeling = !1;
    }, 50), e.deltaY ? s = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? s = -e.wheelDelta / 120 : e.detail && (s = e.detail > 0 ? 1 : -1), this.zoom(-s * n, e)));
  },
  cropStart: function(e) {
    var t = e.buttons, n = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (L(t) && t !== 1 || L(n) && n !== 0 || e.ctrlKey))) {
      var s = this.options, i = this.pointers, c;
      e.changedTouches ? J(e.changedTouches, function(h) {
        i[h.identifier] = at(h);
      }) : i[e.pointerId || 0] = at(e), Object.keys(i).length > 1 && s.zoomable && s.zoomOnTouch ? c = Er : c = Tt(e.target, Je), !!Ra.test(c) && Re(this.element, $t, {
        originalEvent: e,
        action: c
      }) !== !1 && (e.preventDefault(), this.action = c, this.cropping = !1, c === Mr && (this.cropping = !0, te(this.dragBox, ut)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var n = this.pointers;
      e.preventDefault(), Re(this.element, Mt, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? J(e.changedTouches, function(s) {
        W(n[s.identifier] || {}, at(s, !0));
      }) : W(n[e.pointerId || 0] || {}, at(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, n = this.pointers;
      e.changedTouches ? J(e.changedTouches, function(s) {
        delete n[s.identifier];
      }) : delete n[e.pointerId || 0], t && (e.preventDefault(), Object.keys(n).length || (this.action = ""), this.cropping && (this.cropping = !1, Ve(this.dragBox, ut, this.cropped && this.options.modal)), Re(this.element, Ct, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, ps = {
  change: function(e) {
    var t = this.options, n = this.canvasData, s = this.containerData, i = this.cropBoxData, c = this.pointers, h = this.action, p = t.aspectRatio, g = i.left, f = i.top, v = i.width, b = i.height, _ = g + v, C = f + b, P = 0, I = 0, K = s.width, X = s.height, B = !0, le;
    !p && e.shiftKey && (p = v && b ? v / b : 1), this.limited && (P = i.minLeft, I = i.minTop, K = P + Math.min(s.width, n.width, n.left + n.width), X = I + Math.min(s.height, n.height, n.top + n.height));
    var A = c[Object.keys(c)[0]], x = {
      x: A.endX - A.startX,
      y: A.endY - A.startY
    }, E = function(z) {
      switch (z) {
        case Me:
          _ + x.x > K && (x.x = K - _);
          break;
        case $e:
          g + x.x < P && (x.x = P - g);
          break;
        case ke:
          f + x.y < I && (x.y = I - f);
          break;
        case Ne:
          C + x.y > X && (x.y = X - C);
          break;
      }
    };
    switch (h) {
      case Ot:
        g += x.x, f += x.y;
        break;
      case Me:
        if (x.x >= 0 && (_ >= K || p && (f <= I || C >= X))) {
          B = !1;
          break;
        }
        E(Me), v += x.x, v < 0 && (h = $e, v = -v, g -= v), p && (b = v / p, f += (i.height - b) / 2);
        break;
      case ke:
        if (x.y <= 0 && (f <= I || p && (g <= P || _ >= K))) {
          B = !1;
          break;
        }
        E(ke), b -= x.y, f += x.y, b < 0 && (h = Ne, b = -b, f -= b), p && (v = b * p, g += (i.width - v) / 2);
        break;
      case $e:
        if (x.x <= 0 && (g <= P || p && (f <= I || C >= X))) {
          B = !1;
          break;
        }
        E($e), v -= x.x, g += x.x, v < 0 && (h = Me, v = -v, g -= v), p && (b = v / p, f += (i.height - b) / 2);
        break;
      case Ne:
        if (x.y >= 0 && (C >= X || p && (g <= P || _ >= K))) {
          B = !1;
          break;
        }
        E(Ne), b += x.y, b < 0 && (h = ke, b = -b, f -= b), p && (v = b * p, g += (i.width - v) / 2);
        break;
      case Xe:
        if (p) {
          if (x.y <= 0 && (f <= I || _ >= K)) {
            B = !1;
            break;
          }
          E(ke), b -= x.y, f += x.y, v = b * p;
        } else
          E(ke), E(Me), x.x >= 0 ? _ < K ? v += x.x : x.y <= 0 && f <= I && (B = !1) : v += x.x, x.y <= 0 ? f > I && (b -= x.y, f += x.y) : (b -= x.y, f += x.y);
        v < 0 && b < 0 ? (h = Ge, b = -b, v = -v, f -= b, g -= v) : v < 0 ? (h = Fe, v = -v, g -= v) : b < 0 && (h = qe, b = -b, f -= b);
        break;
      case Fe:
        if (p) {
          if (x.y <= 0 && (f <= I || g <= P)) {
            B = !1;
            break;
          }
          E(ke), b -= x.y, f += x.y, v = b * p, g += i.width - v;
        } else
          E(ke), E($e), x.x <= 0 ? g > P ? (v -= x.x, g += x.x) : x.y <= 0 && f <= I && (B = !1) : (v -= x.x, g += x.x), x.y <= 0 ? f > I && (b -= x.y, f += x.y) : (b -= x.y, f += x.y);
        v < 0 && b < 0 ? (h = qe, b = -b, v = -v, f -= b, g -= v) : v < 0 ? (h = Xe, v = -v, g -= v) : b < 0 && (h = Ge, b = -b, f -= b);
        break;
      case Ge:
        if (p) {
          if (x.x <= 0 && (g <= P || C >= X)) {
            B = !1;
            break;
          }
          E($e), v -= x.x, g += x.x, b = v / p;
        } else
          E(Ne), E($e), x.x <= 0 ? g > P ? (v -= x.x, g += x.x) : x.y >= 0 && C >= X && (B = !1) : (v -= x.x, g += x.x), x.y >= 0 ? C < X && (b += x.y) : b += x.y;
        v < 0 && b < 0 ? (h = Xe, b = -b, v = -v, f -= b, g -= v) : v < 0 ? (h = qe, v = -v, g -= v) : b < 0 && (h = Fe, b = -b, f -= b);
        break;
      case qe:
        if (p) {
          if (x.x >= 0 && (_ >= K || C >= X)) {
            B = !1;
            break;
          }
          E(Me), v += x.x, b = v / p;
        } else
          E(Ne), E(Me), x.x >= 0 ? _ < K ? v += x.x : x.y >= 0 && C >= X && (B = !1) : v += x.x, x.y >= 0 ? C < X && (b += x.y) : b += x.y;
        v < 0 && b < 0 ? (h = Fe, b = -b, v = -v, f -= b, g -= v) : v < 0 ? (h = Ge, v = -v, g -= v) : b < 0 && (h = Xe, b = -b, f -= b);
        break;
      case $r:
        this.move(x.x, x.y), B = !1;
        break;
      case Er:
        this.zoom(ts(c), e), B = !1;
        break;
      case Mr:
        if (!x.x || !x.y) {
          B = !1;
          break;
        }
        le = Lr(this.cropper), g = A.startX - le.left, f = A.startY - le.top, v = i.minWidth, b = i.minHeight, x.x > 0 ? h = x.y > 0 ? qe : Xe : x.x < 0 && (g -= v, h = x.y > 0 ? Ge : Fe), x.y < 0 && (f -= b), this.cropped || (ge(this.cropBox, oe), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    B && (i.width = v, i.height = b, i.left = g, i.top = f, this.action = h, this.renderCropBox()), J(c, function(H) {
      H.startX = H.endX, H.startY = H.endY;
    });
  }
}, gs = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && te(this.dragBox, ut), ge(this.cropBox, oe), this.setCropBoxData(this.initialCropBoxData)), this;
  },
  reset: function() {
    return this.ready && !this.disabled && (this.imageData = W({}, this.initialImageData), this.canvasData = W({}, this.initialCanvasData), this.cropBoxData = W({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this;
  },
  clear: function() {
    return this.cropped && !this.disabled && (W(this.cropBoxData, {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), ge(this.dragBox, ut), te(this.cropBox, oe)), this;
  },
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, J(this.previews, function(n) {
      n.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, ge(this.cropper, lr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, te(this.cropper, lr)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[Y] ? (e[Y] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, s = n.left, i = n.top;
    return this.moveTo(yt(e) ? e : s + Number(e), yt(t) ? t : i + Number(t));
  },
  moveTo: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, s = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (L(e) && (n.left = e, s = !0), L(t) && (n.top = t, s = !0), s && this.renderCanvas(!0)), this;
  },
  zoom: function(e, t) {
    var n = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(n.width * e / n.naturalWidth, null, t);
  },
  zoomTo: function(e, t, n) {
    var s = this.options, i = this.canvasData, c = i.width, h = i.height, p = i.naturalWidth, g = i.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && s.zoomable) {
      var f = p * e, v = g * e;
      if (Re(this.element, Et, {
        ratio: e,
        oldRatio: c / p,
        originalEvent: n
      }) === !1)
        return this;
      if (n) {
        var b = this.pointers, _ = Lr(this.cropper), C = b && Object.keys(b).length ? rs(b) : {
          pageX: n.pageX,
          pageY: n.pageY
        };
        i.left -= (f - c) * ((C.pageX - _.left - i.left) / c), i.top -= (v - h) * ((C.pageY - _.top - i.top) / h);
      } else
        Le(t) && L(t.x) && L(t.y) ? (i.left -= (f - c) * ((t.x - i.left) / c), i.top -= (v - h) * ((t.y - i.top) / h)) : (i.left -= (f - c) / 2, i.top -= (v - h) / 2);
      i.width = f, i.height = v, this.renderCanvas(!0);
    }
    return this;
  },
  rotate: function(e) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(e));
  },
  rotateTo: function(e) {
    return e = Number(e), L(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
  },
  scaleX: function(e) {
    var t = this.imageData.scaleY;
    return this.scale(e, L(t) ? t : 1);
  },
  scaleY: function(e) {
    var t = this.imageData.scaleX;
    return this.scale(L(t) ? t : 1, e);
  },
  scale: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.imageData, s = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (L(e) && (n.scaleX = e, s = !0), L(t) && (n.scaleY = t, s = !0), s && this.renderCanvas(!0, !0)), this;
  },
  getData: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, t = this.options, n = this.imageData, s = this.canvasData, i = this.cropBoxData, c;
    if (this.ready && this.cropped) {
      c = {
        x: i.left - s.left,
        y: i.top - s.top,
        width: i.width,
        height: i.height
      };
      var h = n.width / n.naturalWidth;
      if (J(c, function(f, v) {
        c[v] = f / h;
      }), e) {
        var p = Math.round(c.y + c.height), g = Math.round(c.x + c.width);
        c.x = Math.round(c.x), c.y = Math.round(c.y), c.width = g - c.x, c.height = p - c.y;
      }
    } else
      c = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return t.rotatable && (c.rotate = n.rotate || 0), t.scalable && (c.scaleX = n.scaleX || 1, c.scaleY = n.scaleY || 1), c;
  },
  setData: function(e) {
    var t = this.options, n = this.imageData, s = this.canvasData, i = {};
    if (this.ready && !this.disabled && Le(e)) {
      var c = !1;
      t.rotatable && L(e.rotate) && e.rotate !== n.rotate && (n.rotate = e.rotate, c = !0), t.scalable && (L(e.scaleX) && e.scaleX !== n.scaleX && (n.scaleX = e.scaleX, c = !0), L(e.scaleY) && e.scaleY !== n.scaleY && (n.scaleY = e.scaleY, c = !0)), c && this.renderCanvas(!0, !0);
      var h = n.width / n.naturalWidth;
      L(e.x) && (i.left = e.x * h + s.left), L(e.y) && (i.top = e.y * h + s.top), L(e.width) && (i.width = e.width * h), L(e.height) && (i.height = e.height * h), this.setCropBoxData(i);
    }
    return this;
  },
  getContainerData: function() {
    return this.ready ? W({}, this.containerData) : {};
  },
  getImageData: function() {
    return this.sized ? W({}, this.imageData) : {};
  },
  getCanvasData: function() {
    var e = this.canvasData, t = {};
    return this.ready && J(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(n) {
      t[n] = e[n];
    }), t;
  },
  setCanvasData: function(e) {
    var t = this.canvasData, n = t.aspectRatio;
    return this.ready && !this.disabled && Le(e) && (L(e.left) && (t.left = e.left), L(e.top) && (t.top = e.top), L(e.width) ? (t.width = e.width, t.height = e.width / n) : L(e.height) && (t.height = e.height, t.width = e.height * n), this.renderCanvas(!0)), this;
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
    return this.ready && this.cropped && !this.disabled && Le(e) && (L(e.left) && (t.left = e.left), L(e.top) && (t.top = e.top), L(e.width) && e.width !== t.width && (s = !0, t.width = e.width), L(e.height) && e.height !== t.height && (i = !0, t.height = e.height), n && (s ? t.height = t.width / n : i && (t.width = t.height * n)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, n = ns(this.image, this.imageData, t, e);
    if (!this.cropped)
      return n;
    var s = this.getData(), i = s.x, c = s.y, h = s.width, p = s.height, g = n.width / Math.floor(t.naturalWidth);
    g !== 1 && (i *= g, c *= g, h *= g, p *= g);
    var f = h / p, v = Ce({
      aspectRatio: f,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Ce({
      aspectRatio: f,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), _ = Ce({
      aspectRatio: f,
      width: e.width || (g !== 1 ? n.width : h),
      height: e.height || (g !== 1 ? n.height : p)
    }), C = _.width, P = _.height;
    C = Math.min(v.width, Math.max(b.width, C)), P = Math.min(v.height, Math.max(b.height, P));
    var I = document.createElement("canvas"), K = I.getContext("2d");
    I.width = Be(C), I.height = Be(P), K.fillStyle = e.fillColor || "transparent", K.fillRect(0, 0, C, P);
    var X = e.imageSmoothingEnabled, B = X === void 0 ? !0 : X, le = e.imageSmoothingQuality;
    K.imageSmoothingEnabled = B, le && (K.imageSmoothingQuality = le);
    var A = n.width, x = n.height, E = i, H = c, z, Q, ee, we, fe, U;
    E <= -h || E > A ? (E = 0, z = 0, ee = 0, fe = 0) : E <= 0 ? (ee = -E, E = 0, z = Math.min(A, h + E), fe = z) : E <= A && (ee = 0, z = Math.min(h, A - E), fe = z), z <= 0 || H <= -p || H > x ? (H = 0, Q = 0, we = 0, U = 0) : H <= 0 ? (we = -H, H = 0, Q = Math.min(x, p + H), U = Q) : H <= x && (we = 0, Q = Math.min(p, x - H), U = Q);
    var q = [E, H, z, Q];
    if (fe > 0 && U > 0) {
      var me = C / h;
      q.push(ee * me, we * me, fe * me, U * me);
    }
    return K.drawImage.apply(K, [n].concat(Cr(q.map(function(Ae) {
      return Math.floor(Be(Ae));
    })))), I;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !yt(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, n = this.dragBox, s = this.face;
    if (this.ready && !this.disabled) {
      var i = e === It, c = t.movable && e === Tr;
      e = i || c ? e : Ar, t.dragMode = e, Qe(n, Je, e), Ve(n, St, i), Ve(n, kt, c), t.cropBoxMovable || (Qe(s, Je, e), Ve(s, St, i), Ve(s, kt, c));
    }
    return this;
  }
}, vs = be.Cropper, zr = /* @__PURE__ */ function() {
  function o(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (Ta(this, o), !e || !Ua.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = W({}, br, Le(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return Aa(o, [{
    key: "init",
    value: function() {
      var t = this.element, n = t.tagName.toLowerCase(), s;
      if (!t[Y]) {
        if (t[Y] = this, n === "img") {
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
        if (Ha.test(t)) {
          Ka.test(t) ? this.read(ss(t)) : this.clone();
          return;
        }
        var c = new XMLHttpRequest(), h = this.clone.bind(this);
        this.reloading = !0, this.xhr = c, c.onabort = h, c.onerror = h, c.ontimeout = h, c.onprogress = function() {
          c.getResponseHeader("content-type") !== vr && c.abort();
        }, c.onload = function() {
          n.read(c.response);
        }, c.onloadend = function() {
          n.reloading = !1, n.xhr = null;
        }, i.checkCrossOrigin && wr(t) && s.crossOrigin && (t = xr(t)), c.open("GET", t, !0), c.responseType = "arraybuffer", c.withCredentials = s.crossOrigin === "use-credentials", c.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var n = this.options, s = this.imageData, i = cs(t), c = 0, h = 1, p = 1;
      if (i > 1) {
        this.url = ls(t, vr);
        var g = us(i);
        c = g.rotate, h = g.scaleX, p = g.scaleY;
      }
      n.rotatable && (s.rotate = c), n.scalable && (s.scaleX = h, s.scaleY = p), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, n = this.url, s = t.crossOrigin, i = n;
      this.options.checkCrossOrigin && wr(n) && (s || (s = "anonymous"), i = xr(n)), this.crossOrigin = s, this.crossOriginUrl = i;
      var c = document.createElement("img");
      s && (c.crossOrigin = s), c.src = i || n, c.alt = t.alt || "The image to crop", this.image = c, c.onload = this.start.bind(this), c.onerror = this.stop.bind(this), te(c, cr), t.parentNode.insertBefore(c, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, n = this.image;
      n.onload = null, n.onerror = null, this.sizing = !0;
      var s = be.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(be.navigator.userAgent), i = function(g, f) {
        W(t.imageData, {
          naturalWidth: g,
          naturalHeight: f,
          aspectRatio: g / f
        }), t.initialImageData = W({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (n.naturalWidth && !s) {
        i(n.naturalWidth, n.naturalHeight);
        return;
      }
      var c = document.createElement("img"), h = document.body || document.documentElement;
      this.sizingImage = c, c.onload = function() {
        i(c.width, c.height), s || h.removeChild(c);
      }, c.src = n.src, s || (c.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", h.appendChild(c));
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
        var t = this.element, n = this.options, s = this.image, i = t.parentNode, c = document.createElement("div");
        c.innerHTML = Ya;
        var h = c.querySelector(".".concat(Y, "-container")), p = h.querySelector(".".concat(Y, "-canvas")), g = h.querySelector(".".concat(Y, "-drag-box")), f = h.querySelector(".".concat(Y, "-crop-box")), v = f.querySelector(".".concat(Y, "-face"));
        this.container = i, this.cropper = h, this.canvas = p, this.dragBox = g, this.cropBox = f, this.viewBox = h.querySelector(".".concat(Y, "-view-box")), this.face = v, p.appendChild(s), te(t, oe), i.insertBefore(h, t.nextSibling), this.isImg || ge(s, cr), this.initPreview(), this.bind(), n.initialAspectRatio = Math.max(0, n.initialAspectRatio) || NaN, n.aspectRatio = Math.max(0, n.aspectRatio) || NaN, n.viewMode = Math.max(0, Math.min(3, Math.round(n.viewMode))) || 0, te(f, oe), n.guides || te(f.getElementsByClassName("".concat(Y, "-dashed")), oe), n.center || te(f.getElementsByClassName("".concat(Y, "-center")), oe), n.background && te(h, "".concat(Y, "-bg")), n.highlight || te(v, La), n.cropBoxMovable && (te(v, kt), Qe(v, Je, Ot)), n.cropBoxResizable || (te(f.getElementsByClassName("".concat(Y, "-line")), oe), te(f.getElementsByClassName("".concat(Y, "-point")), oe)), this.render(), this.ready = !0, this.setDragMode(n.dragMode), n.autoCrop && this.crop(), this.setData(n.data), ne(n.ready) && ce(t, mr, n.ready, {
          once: !0
        }), Re(t, mr);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      !this.ready || (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), ge(this.element, oe));
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = vs, o;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      W(br, Le(t) && t);
    }
  }]), o;
}();
W(zr.prototype, ds, hs, fs, ms, ps, gs);
const bs = { class: "flex" }, ys = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ws = { class: "ml-auto mb-2" }, xs = { class: "w-full flex justify-center" }, _s = ["src"], Ss = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), s = () => n.value + "?" + Te({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path }), i = j(null), c = j(null), h = j(!1), p = () => {
      h.value = !h.value, h.value ? c.value = new zr(i.value, {
        crop(f) {
        }
      }) : c.value.destroy();
    }, g = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (f) => {
          ct(n.value, {
            method: "POST",
            params: { q: "upload", adapter: t.selection.adapter, path: t.selection.item.path, file: f },
            name: t.selection.item.basename,
            json: !1
          }).then((v) => {
            i.value.src = s(), p(), e("load");
          }).catch((v) => console.log(v.statusText));
        }
      );
    };
    return onMounted(() => {
      e("load");
    }), (f, v) => (k(), $(ie, null, [
      d("div", bs, [
        d("h3", ys, V(o.selection.item.basename), 1),
        d("div", ws, [
          h.value ? (k(), $("button", {
            key: 0,
            onClick: g,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Crop")) : se("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: v[0] || (v[0] = (b) => p())
          }, V(h.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      d("div", xs, [
        d("img", {
          ref: (b) => i.value = b,
          class: "max-w-[60vh] max-h-[60vh]",
          src: s(),
          alt: ""
        }, null, 8, _s)
      ])
    ], 64));
  }
}, ks = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ds = /* @__PURE__ */ d("div", null, " Default view.. ", -1), Cs = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    return ve(() => {
      e("load");
    }), (t, n) => (k(), $(ie, null, [
      d("h3", ks, V(o.selection.item.basename), 1),
      Ds
    ], 64));
  }
}, Ms = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, $s = {
  class: "w-full",
  preload: "",
  controls: ""
}, Es = ["src"], Ts = /* @__PURE__ */ He(" Your browser does not support the video tag. "), As = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), s = () => n.value + "?" + Te({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return ve(() => {
      e("load");
    }), (i, c) => (k(), $(ie, null, [
      d("h3", Ms, V(o.selection.item.basename), 1),
      d("div", null, [
        d("video", $s, [
          d("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Es),
          Ts
        ])
      ])
    ], 64));
  }
}, Ps = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Os = {
  class: "w-full",
  controls: ""
}, Is = ["src"], js = /* @__PURE__ */ He(" Your browser does not support the audio element. "), Ns = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), s = () => n.value + "?" + Te({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return ve(() => {
      e("load");
    }), (i, c) => (k(), $(ie, null, [
      d("h3", Ps, V(o.selection.item.basename), 1),
      d("div", null, [
        d("audio", Os, [
          d("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Is),
          js
        ])
      ])
    ], 64));
  }
}, Ls = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Vs = ["data"], zs = ["src"], Bs = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), s = () => n.value + "?" + Te({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return ve(() => {
      e("load");
    }), (i, c) => (k(), $(ie, null, [
      d("h3", Ls, V(o.selection.item.basename), 1),
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
        `, 8, zs)
        ], 8, Vs)
      ])
    ], 64));
  }
}, Rs = { class: "sm:flex sm:items-start" }, Hs = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Ks = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Us = {
  key: 0,
  class: "flex leading-5"
}, Ys = /* @__PURE__ */ d("svg", {
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
], -1), Ws = /* @__PURE__ */ d("span", null, "Loading", -1), Xs = [
  Ys,
  Ws
], Fs = {
  name: "VFModalPreview"
}, qs = /* @__PURE__ */ Object.assign(Fs, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = o, { apiUrl: t } = _e(), n = inject("emitter"), s = j(!1), i = (h) => {
      var p;
      return ((p = e.selection.item.mime_type) != null ? p : "").startsWith(h);
    }, c = () => {
      const h = t.value + "?" + Te({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      n.emit("vf-download", h);
    };
    return (h, p) => (k(), re(ye, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: p[6] || (p[6] = (g) => R(n).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close"),
        d("button", {
          type: "button",
          onClick: p[7] || (p[7] = (g) => c()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Download")
      ]),
      default: G(() => [
        d("div", Rs, [
          d("div", Hs, [
            d("div", null, [
              i("text") ? (k(), re(Ea, {
                key: 0,
                selection: o.selection,
                onLoad: p[0] || (p[0] = (g) => s.value = !0)
              }, null, 8, ["selection"])) : i("image") ? (k(), re(Ss, {
                key: 1,
                selection: o.selection,
                onLoad: p[1] || (p[1] = (g) => s.value = !0)
              }, null, 8, ["selection"])) : i("video") ? (k(), re(As, {
                key: 2,
                selection: o.selection,
                onLoad: p[2] || (p[2] = (g) => s.value = !0)
              }, null, 8, ["selection"])) : i("audio") ? (k(), re(Ns, {
                key: 3,
                selection: o.selection,
                onLoad: p[3] || (p[3] = (g) => s.value = !0)
              }, null, 8, ["selection"])) : i("application/pdf") ? (k(), re(Bs, {
                key: 4,
                selection: o.selection,
                onLoad: p[4] || (p[4] = (g) => s.value = !0)
              }, null, 8, ["selection"])) : (k(), re(Cs, {
                key: 5,
                selection: o.selection,
                onLoad: p[5] || (p[5] = (g) => s.value = !0)
              }, null, 8, ["selection"]))
            ]),
            d("div", Ks, [
              d("p", null, V(o.selection.item.path), 1),
              d("p", null, "mime_type: " + V(o.selection.item.mime_type), 1),
              s.value == !1 ? (k(), $("div", Us, Xs)) : se("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Gs = { class: "sm:flex sm:items-start" }, Zs = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Js = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Qs = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, el = { class: "mt-2" }, tl = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, rl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, il = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), nl = [
  il
], ol = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, al = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), sl = [
  al
], ll = { class: "ml-1.5" }, cl = ["onKeyup"], ul = {
  name: "VFModalRename"
}, dl = /* @__PURE__ */ Object.assign(ul, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = j(e.selection.items[0]), i = j(e.selection.items[0].basename), c = () => {
      i.value != "" && t.emit("vf-fetch", {
        q: "rename",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: s.value.path,
        name: i.value
      });
    };
    return (h, p) => (k(), re(ye, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: c,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Rename!"),
        d("button", {
          type: "button",
          onClick: p[1] || (p[1] = (g) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", Gs, [
          Zs,
          d("div", Js, [
            d("h3", Qs, "Rename your " + V(s.value.type == "dir" ? "folder" : "file"), 1),
            d("div", el, [
              d("p", tl, [
                s.value.type == "dir" ? (k(), $("svg", rl, nl)) : (k(), $("svg", ol, sl)),
                d("span", ll, V(s.value.basename), 1)
              ]),
              xe(d("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (g) => i.value = g),
                onKeyup: Ke(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, cl), [
                [et, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), hl = { class: "sm:flex sm:items-start" }, fl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ml = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, pl = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Upload files", -1), gl = { class: "mt-2" }, vl = { class: "text-gray-500 mb-1" }, bl = ["id"], yl = {
  key: 0,
  class: "py-2"
}, wl = ["disabled", "onClick"], xl = {
  name: "VFModalUpload"
}, _l = /* @__PURE__ */ Object.assign(xl, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { apiUrl: n } = _e(), s = j(null), i = j(null), c = j(null), h = j([]), p = j(!0), g = () => {
      s.value.start();
    };
    return ve(() => {
      s.value = new vt.Uploader({
        runtimes: "html5",
        browse_button: c.value,
        container: i.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: n.value + "?" + Te({ q: "upload", adapter: e.current.adapter, path: e.current.dirname }),
        init: {
          PostInit: function() {
          },
          FilesAdded: function(f, v) {
            p.value = !1, vt.each(v, function(b) {
              h.value.push({
                id: b.id,
                name: b.name,
                size: vt.formatSize(b.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(f, v) {
            h.value[h.value.findIndex((b) => b.id == v.id)].percent = v.percent + "%";
          },
          UploadComplete: function() {
            p.value = !0, t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: e.current.dirname });
          },
          Error: function(f, v) {
          }
        }
      }), s.value.init();
    }), (f, v) => (k(), re(ye, null, {
      buttons: G(() => [
        d("button", {
          disabled: p.value,
          onClick: ze(g, ["prevent"]),
          type: "button",
          class: de([p.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, "Upload!", 10, wl),
        d("button", {
          type: "button",
          onClick: v[0] || (v[0] = (b) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", hl, [
          fl,
          d("div", ml, [
            pl,
            d("div", gl, [
              d("div", vl, [
                (k(!0), $(ie, null, he(h.value, (b) => (k(), $("div", null, [
                  d("div", {
                    id: b.id
                  }, [
                    He(V(b.name) + " ( " + V(b.size) + ") ", 1),
                    d("b", null, V(b.percent), 1)
                  ], 8, bl)
                ]))), 256)),
                h.value.length ? se("", !0) : (k(), $("div", yl, " No files selected!"))
              ]),
              d("div", {
                class: "text-gray-500",
                ref: (b) => i.value = b
              }, [
                d("button", {
                  ref: (b) => c.value = b,
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
}), Sl = { class: "sm:flex sm:items-start" }, kl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Dl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Cl = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), Ml = { class: "mt-2" }, $l = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, El = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Al = [
  Tl
], Pl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ol = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Il = [
  Ol
], jl = { class: "ml-1.5" }, Nl = /* @__PURE__ */ d("p", { class: "my-1 text-sm text-gray-500" }, "Archive name. (.zip file will be created)", -1), Ll = ["onKeyup"], Vl = {
  name: "VFModalArchive"
}, zl = /* @__PURE__ */ Object.assign(Vl, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = j(""), i = j(e.selection.items), c = () => {
      i.value.length && t.emit("vf-fetch", {
        q: "archive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(i.value.map(({ path: h, type: p }) => ({ path: h, type: p }))),
        name: s.value
      });
    };
    return (h, p) => (k(), re(ye, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: c,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Archive!"),
        d("button", {
          type: "button",
          onClick: p[1] || (p[1] = (g) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", Sl, [
          kl,
          d("div", Dl, [
            Cl,
            d("div", Ml, [
              (k(!0), $(ie, null, he(i.value, (g) => (k(), $("p", $l, [
                g.type == "dir" ? (k(), $("svg", El, Al)) : (k(), $("svg", Pl, Il)),
                d("span", jl, V(g.basename), 1)
              ]))), 256)),
              Nl,
              xe(d("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (g) => s.value = g),
                onKeyup: Ke(c, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Ll), [
                [et, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Bl = { class: "sm:flex sm:items-start" }, Rl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Hl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Kl = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Unarchive files", -1), Ul = { class: "mt-2" }, Yl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Wl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Fl = [
  Xl
], ql = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Zl = [
  Gl
], Jl = { class: "ml-1.5" }, Ql = { class: "my-1 text-sm text-gray-500" }, ec = {
  name: "VFModalUnarchive"
}, tc = /* @__PURE__ */ Object.assign(ec, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage");
    j("");
    const s = j(e.selection.items[0]), i = j([]), c = () => {
      t.emit("vf-fetch", {
        q: "unarchive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: s.value.path
      });
    };
    return (h, p) => (k(), re(ye, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: c,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Unarchive!"),
        d("button", {
          type: "button",
          onClick: p[0] || (p[0] = (g) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", Bl, [
          Rl,
          d("div", Hl, [
            Kl,
            d("div", Ul, [
              (k(!0), $(ie, null, he(i.value, (g) => (k(), $("p", Yl, [
                g.type == "dir" ? (k(), $("svg", Wl, Fl)) : (k(), $("svg", ql, Zl)),
                d("span", Jl, V(g.basename), 1)
              ]))), 256)),
              d("p", Ql, "Archive will be unarchived at (" + V(o.current.dirname) + ")", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), rc = { class: "sm:flex sm:items-start" }, ic = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), nc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, oc = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Move files", -1), ac = { class: "mt-2" }, sc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, lc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, cc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), uc = [
  cc
], dc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), fc = [
  hc
], mc = { class: "ml-1.5" }, pc = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Are you sure you want to move these files to ?", -1), gc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, vc = /* @__PURE__ */ d("svg", {
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
], -1), bc = { class: "ml-1.5 overflow-auto" }, yc = {
  name: "VFModalMove"
}, wc = /* @__PURE__ */ Object.assign(yc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = j(e.selection.items.from), i = () => {
      s.value.length && t.emit("vf-fetch", {
        q: "move",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(s.value.map(({ path: c, type: h }) => ({ path: c, type: h }))),
        item: e.selection.items.to.path
      });
    };
    return (c, h) => (k(), re(ye, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, move!"),
        d("button", {
          type: "button",
          onClick: h[0] || (h[0] = (p) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", rc, [
          ic,
          d("div", nc, [
            oc,
            d("div", ac, [
              (k(!0), $(ie, null, he(s.value, (p) => (k(), $("p", sc, [
                p.type == "dir" ? (k(), $("svg", lc, uc)) : (k(), $("svg", dc, fc)),
                d("span", mc, V(p.path), 1)
              ]))), 256)),
              pc,
              d("p", gc, [
                vc,
                d("span", bc, V(o.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), xc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: Zo,
  ModalMessage: oa,
  ModalNewFolder: ma,
  ModalNewFile: Sa,
  ModalPreview: qs,
  ModalRename: dl,
  ModalUpload: _l,
  ModalArchive: zl,
  ModalUnarchive: tc,
  ModalMove: wc
}, Symbol.toStringTag, { value: "Module" })), xt = {
  VueFinder: Eo,
  ...xc
};
const kc = {
  install(o) {
    for (const e in xt)
      if (xt.hasOwnProperty(e)) {
        const t = xt[e];
        o.component(t.name, t);
      }
  }
};
export {
  kc as default
};
