import { ref as j, watch as _r, openBlock as k, createElementBlock as M, createElementVNode as d, unref as R, normalizeClass as ke, createCommentVNode as ae, reactive as lt, onMounted as me, withDirectives as ye, createVNode as Se, vShow as gt, toDisplayString as B, withModifiers as qe, Fragment as re, renderList as ge, createTextVNode as Re, nextTick as At, vModelSelect as Ci, normalizeStyle as Mi, provide as rr, createBlock as te, resolveDynamicComponent as $i, withKeys as Qe, renderSlot as ir, withCtx as Q, vModelText as et } from "vue";
import pt from "plupload";
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
function Ei(o) {
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
  function s(h, v) {
    t.value = Object.assign({ ...t.value }, { [h]: v });
  }
  function i() {
    t.value = null;
  }
  return { getStore: (h, v = null) => t.value === null || t.value === "" ? v : t.value.hasOwnProperty(h) ? t.value[h] : v, setStore: s, clearStore: i };
}
const or = j("");
function we() {
  function o(e) {
    or.value = e;
  }
  return { apiUrl: or, setApiUrl: o };
}
const Ai = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Ti = { class: "flex text-center" }, Pi = /* @__PURE__ */ d("svg", {
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
], -1), Oi = [
  Pi
], Ii = /* @__PURE__ */ d("svg", {
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
], -1), ji = [
  Ii
], Ni = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Li = [
  Ni
], Vi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), zi = [
  Vi
], Bi = /* @__PURE__ */ d("svg", {
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
], -1), Ri = [
  Bi
], Hi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), Ki = [
  Hi
], Ui = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), Yi = [
  Ui
], Wi = { class: "flex text-center items-center justify-end" }, Xi = {
  class: "mx-1.5",
  "aria-label": "Dark Mode",
  "data-microtip-position": "bottom",
  role: "tooltip"
}, Fi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), qi = [
  Fi
], Gi = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, Zi = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, Ji = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, Qi = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, en = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, tn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, rn = {
  name: "VFToolbar"
}, nn = /* @__PURE__ */ Object.assign(rn, {
  setup(o) {
    const e = inject("emitter"), { getStore: t, setStore: n } = inject("storage"), s = j(t("viewport", "grid")), i = j([]), c = j(t("full-screen", !1)), h = () => {
      c.value = !c.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (v) => {
      i.value = v;
    }), e.on("vf-view-toggle", (v) => {
      n("viewport", v), s.value = v;
    }), (v, f) => (k(), M("div", Ai, [
      d("div", Ti, [
        d("div", {
          class: "mx-1.5",
          "aria-label": "New Folder",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[0] || (f[0] = (m) => R(e).emit("vf-modal-show", { type: "new-folder", items: i.value }))
        }, Oi),
        d("div", {
          class: "mx-1.5",
          "aria-label": "New File",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[1] || (f[1] = (m) => R(e).emit("vf-modal-show", { type: "new-file", items: i.value }))
        }, ji),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Rename",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[2] || (f[2] = (m) => i.value.length != 1 || R(e).emit("vf-modal-show", { type: "rename", items: i.value }))
        }, [
          (k(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ke([i.value.length == 1 ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Li, 2))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Delete",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[3] || (f[3] = (m) => !i.value.length || R(e).emit("vf-modal-show", { type: "delete", items: i.value }))
        }, [
          (k(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ke([i.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, zi, 2))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Upload",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[4] || (f[4] = (m) => R(e).emit("vf-modal-show", { type: "upload", items: i.value }))
        }, Ri),
        i.value.length == 1 && i.value[0].mime_type == "application/zip" ? (k(), M("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": "Unrchive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[5] || (f[5] = (m) => !i.value.length || R(e).emit("vf-modal-show", { type: "unarchive", items: i.value }))
        }, [
          (k(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ke([i.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Ki, 2))
        ])) : (k(), M("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": "Archive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[6] || (f[6] = (m) => !i.value.length || R(e).emit("vf-modal-show", { type: "archive", items: i.value }))
        }, [
          (k(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ke([i.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Yi, 2))
        ]))
      ]),
      d("div", Wi, [
        d("div", Xi, [
          (k(), M("svg", {
            onClick: f[7] || (f[7] = (m) => R(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, qi))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Toggle Full Screen",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: h
        }, [
          (k(), M("svg", Gi, [
            c.value ? (k(), M("path", Zi)) : (k(), M("path", Ji))
          ]))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Change View",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[8] || (f[8] = (m) => R(e).emit("vf-view-toggle", s.value == "list" ? "grid" : "list"))
        }, [
          (k(), M("svg", Qi, [
            s.value == "grid" ? (k(), M("path", en)) : ae("", !0),
            s.value == "list" ? (k(), M("path", tn)) : ae("", !0)
          ]))
        ])
      ])
    ]));
  }
});
var on = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Sr = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(on, function() {
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
    function c(u, a) {
      var r = Object.keys(u);
      if (Object.getOwnPropertySymbols) {
        var p = Object.getOwnPropertySymbols(u);
        a && (p = p.filter(function(l) {
          return Object.getOwnPropertyDescriptor(u, l).enumerable;
        })), r.push.apply(r, p);
      }
      return r;
    }
    function h(u) {
      for (var a = 1; a < arguments.length; a++) {
        var r = arguments[a] != null ? arguments[a] : {};
        a % 2 ? c(Object(r), !0).forEach(function(p) {
          i(u, p, r[p]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(r)) : c(Object(r)).forEach(function(p) {
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
      }), a && m(u, a);
    }
    function f(u) {
      return f = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, f(u);
    }
    function m(u, a) {
      return m = Object.setPrototypeOf || function(p, l) {
        return p.__proto__ = l, p;
      }, m(u, a);
    }
    function g() {
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
      return g() ? b = Reflect.construct : b = function(l, y, w) {
        var x = [null];
        x.push.apply(x, y);
        var S = Function.bind.apply(l, x), $ = new S();
        return w && m($, w.prototype), $;
      }, b.apply(null, arguments);
    }
    function E(u) {
      return Function.toString.call(u).indexOf("[native code]") !== -1;
    }
    function T(u) {
      var a = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return T = function(p) {
        if (p === null || !E(p))
          return p;
        if (typeof p != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof a < "u") {
          if (a.has(p))
            return a.get(p);
          a.set(p, l);
        }
        function l() {
          return b(p, arguments, f(this).constructor);
        }
        return l.prototype = Object.create(p.prototype, {
          constructor: {
            value: l,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), m(l, p);
      }, T(u);
    }
    function I(u) {
      if (u === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return u;
    }
    function L(u, a) {
      return a && (typeof a == "object" || typeof a == "function") ? a : I(u);
    }
    function K(u) {
      var a = g();
      return function() {
        var p = f(u), l;
        if (a) {
          var y = f(this).constructor;
          l = Reflect.construct(p, arguments, y);
        } else
          l = p.apply(this, arguments);
        return L(this, l);
      };
    }
    function F(u, a) {
      for (; !Object.prototype.hasOwnProperty.call(u, a) && (u = f(u), u !== null); )
        ;
      return u;
    }
    function C(u, a, r) {
      return typeof Reflect < "u" && Reflect.get ? C = Reflect.get : C = function(l, y, w) {
        var x = F(l, y);
        if (!!x) {
          var S = Object.getOwnPropertyDescriptor(x, y);
          return S.get ? S.get.call(w) : S.value;
        }
      }, C(u, a, r || u);
    }
    function z(u, a) {
      return O(u) || q(u, a) || se(u, a) || de();
    }
    function A(u) {
      return _(u) || H(u) || se(u) || be();
    }
    function _(u) {
      if (Array.isArray(u))
        return ce(u);
    }
    function O(u) {
      if (Array.isArray(u))
        return u;
    }
    function H(u) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(u))
        return Array.from(u);
    }
    function q(u, a) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(u)))) {
        var r = [], p = !0, l = !1, y = void 0;
        try {
          for (var w = u[Symbol.iterator](), x; !(p = (x = w.next()).done) && (r.push(x.value), !(a && r.length === a)); p = !0)
            ;
        } catch (S) {
          l = !0, y = S;
        } finally {
          try {
            !p && w.return != null && w.return();
          } finally {
            if (l)
              throw y;
          }
        }
        return r;
      }
    }
    function se(u, a) {
      if (!!u) {
        if (typeof u == "string")
          return ce(u, a);
        var r = Object.prototype.toString.call(u).slice(8, -1);
        if (r === "Object" && u.constructor && (r = u.constructor.name), r === "Map" || r === "Set")
          return Array.from(u);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return ce(u, a);
      }
    }
    function ce(u, a) {
      (a == null || a > u.length) && (a = u.length);
      for (var r = 0, p = new Array(a); r < a; r++)
        p[r] = u[r];
      return p;
    }
    function be() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function de() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var U = function(a, r, p) {
      var l = a.x, y = a.y, w = p.x, x = p.y, S = {
        "+": {
          x: l + w,
          y: y + x
        },
        "-": {
          x: l - w,
          y: y - x
        },
        "*": {
          x: l * w,
          y: y * x
        },
        "/": {
          x: l / w,
          y: y / x
        }
      };
      return S[r];
    }, G = function(a) {
      return {
        x: a.left,
        y: a.top
      };
    }, he = function(a) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: a.x,
        top: a.y,
        right: a.x,
        bottom: a.y,
        width: r,
        height: r
      };
    }, Te = function(a) {
      return {
        x: a,
        y: a
      };
    }, He = function(u, a, r) {
      window.addEventListener("resize", a), window.addEventListener("scroll", a), u.forEach(function(p, l) {
        r.observe(p, {
          childList: l !== 0,
          attributes: !0
        });
      });
    }, Ke = function(u) {
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
        for (var p = arguments.length, l = new Array(p), y = 0; y < p; y++)
          l[y] = arguments[y];
        var w = function() {
          r = null, u.apply(void 0, l);
        };
        clearTimeout(r), r = setTimeout(w, a);
      };
    }, Pe = function() {
      var u, a, r, p;
      return {
        y: ((u = document.body) === null || u === void 0 ? void 0 : u.scrollTop) || ((a = document.documentElement) === null || a === void 0 ? void 0 : a.scrollTop) || 0,
        x: ((r = document.body) === null || r === void 0 ? void 0 : r.scrollLeft) || ((p = document.documentElement) === null || p === void 0 ? void 0 : p.scrollLeft) || 0
      };
    }, ht = function(u, a) {
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
      var a = u.elementRect, r = u.containerRect, p = u.tolerance, l = p === void 0 ? {
        x: 0,
        y: 0
      } : p, y = [];
      return a.top - l.y < r.top && y.push("top"), a.left - l.x < r.left && y.push("left"), a.bottom + l.y > r.bottom && y.push("bottom"), a.right + l.y > r.right && y.push("right"), y;
    }, zr = function(u) {
      var a = u.event;
      return {
        x: a.clientX,
        y: a.clientY
      };
    }, Br = function(u) {
      var a = u.scrollAmount, r = u.initialPointerPos, p = u.pointerPos, l = {};
      return p.x > r.x - a.x ? (l.left = r.x - a.x, l.width = p.x - r.x + a.x) : (l.left = p.x, l.width = r.x - p.x - a.x), p.y > r.y - a.y ? (l.top = r.y - a.y, l.height = p.y - r.y + a.y) : (l.top = p.y, l.height = r.y - p.y - a.y), l;
    }, Lt = function(a) {
      var r = {
        x: 0,
        y: 0
      }, p = window.getComputedStyle(a);
      if (!p.transform || p.transform === "none")
        return r;
      if (p.transform.indexOf("3d") >= 0) {
        var l = p.transform.trim().match(/matrix3d\((.*?)\)/);
        if (l && l.length) {
          var y, w = (y = l[1]) === null || y === void 0 ? void 0 : y.split(",");
          r.x = parseInt(w[12]) || 0, r.y = parseInt(w[13]) || 0;
        }
        return r;
      } else {
        var x = p.transform.trim().match(/matrix\((.*?)\)/);
        if (x && x.length) {
          var S, $ = (S = x[1]) === null || S === void 0 ? void 0 : S.split(",");
          r.x = parseInt($[4]) || 0, r.y = parseInt($[5]) || 0;
        }
        return r;
      }
    }, Rr = function(a) {
      var r = a.style.transform;
      if (!r || r.indexOf("translate") < 0)
        return Lt(a);
      var p = {
        x: 0,
        y: 0
      }, l = r.trim().match(/translate[3dD]*?\(.*?\)/);
      if (l) {
        var y, w = (y = l[0]) === null || y === void 0 ? void 0 : y.split("(");
        if (w) {
          var x, S = (x = w[1]) === null || x === void 0 ? void 0 : x.split(",");
          p.x = parseInt(S[0]) || 0, p.y = parseInt(S[1]) || 0;
        }
      }
      return !p.x && !p.x ? Lt(a) : p;
    }, Hr = function(a) {
      var r = a.style, p = {
        x: parseInt(r.left) || 0,
        y: parseInt(r.top) || 0
      };
      if (!p.x && !p.x) {
        var l = window.getComputedStyle(a);
        return {
          x: parseInt(l.left) || 0,
          y: parseInt(l.top) || 0
        };
      }
      return p;
    }, Kr = function(u, a) {
      return a ? Rr(u) : Hr(u);
    }, Ur = function(u) {
      var a = u.element, r = u.edges, p = u.elementRect, l = u.containerRect, y = u.elementPos, w = u.useTransform;
      r.includes("top") && Ue(a, {
        y: y.y + l.top - p.top,
        x: y.x
      }, w), r.includes("left") && Ue(a, {
        y: y.y,
        x: y.x + l.left - p.left
      }, w), r.includes("bottom") && Ue(a, {
        y: y.y + l.bottom - p.bottom,
        x: y.x
      }, w), r.includes("right") && Ue(a, {
        y: y.y,
        x: y.x + l.right - p.right
      }, w);
    }, Vt = function(u) {
      var a = u.computedStyle, r = u.node, p = a.position, l = p === "absolute" || p === "relative" || p === "fixed";
      !(r instanceof HTMLDocument) && !l && (r.style.position = "relative");
    }, Yr = function(u) {
      var a = u.shiftKey, r = u.keyboardDragSpeed, p = u.zoom, l = u.key, y = u.dragKeys, w = u.scrollDiff, x = u.canScroll, S = u.scrollCallback, $ = {
        x: 0,
        y: 0
      }, D = a ? r * 4 * p : r * p;
      return y.left.includes(l) && ($.x = w.x || -D, !a && !w.x && x && S(["left"], r)), y.right.includes(l) && ($.x = w.x || D, !a && !w.x && x && S(["right"], r)), y.up.includes(l) && ($.y = w.y || -D, !a && !w.y && x && S(["top"], r)), y.down.includes(l) && ($.y = w.y || D, !a && !w.y && x && S(["bottom"], r)), $;
    }, Wr = function(u) {
      var a = u.element, r = u.force, p = u.multiSelectionToggle, l = u.SelectedSet, y = u.hoverClassName;
      a.classList.contains(y) && !r || (l.has(a) ? p && l.delete(a) : l.add(a), a.classList.add(y));
    }, Xr = function(u) {
      var a = u.element, r = u.force, p = u.SelectedSet, l = u.PrevSelectedSet, y = u.hoverClassName;
      if (!a.classList.contains(y) && !r)
        return !1;
      var w = p.has(a), x = l.has(a);
      w && !x ? p.delete(a) : !w && x && p.add(a), a.classList.remove(y);
    }, ft = function(u, a) {
      return u.left < a.right && u.right > a.left && u.top < a.bottom && u.bottom > a.top;
    }, zt = function(u) {
      var a = u.element, r = u.posDirection, p = u.containerRect, l = u.useTransform, y = Kr(a, l), w = U(y, "+", r);
      Ue(a, w, l);
      var x = a.getBoundingClientRect(), S = Nt({
        elementRect: x,
        containerRect: p
      });
      Ur({
        element: a,
        edges: S,
        elementRect: x,
        containerRect: p,
        elementPos: w,
        useTransform: l
      });
    }, Fr = function(u, a) {
      window.removeEventListener("resize", a), window.removeEventListener("scroll", a), u.disconnect();
    }, qr = function(u, a, r) {
      if (!!a.length) {
        var p = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, l = u instanceof HTMLDocument ? p || document.body : u, y = a.includes("top") && l.scrollTop > 0, w = a.includes("bottom") && l.scrollTop < l.scrollHeight, x = a.includes("left") && l.scrollLeft > 0, S = a.includes("right") && l.scrollLeft < l.scrollWidth;
        y && (l.scrollTop -= 1 * r), w && (l.scrollTop += 1 * r), x && (l.scrollLeft -= 1 * r), S && (l.scrollLeft += 1 * r);
      }
    }, Ue = function(u, a, r) {
      if (r) {
        var p = u.style.transform;
        u.style.transform = "translate3d(".concat(a.x, "px,").concat(a.y, "px,1px) ").concat(p.replace(/translate.*?\)/g, ""));
      } else
        u.style.left = "".concat(a.x, "px"), u.style.top = "".concat(a.y, "px");
      return u;
    }, Gr = function(u) {
      for (var a = u.subscribe, r = u.publish, p = u.Interaction, l = u.SelectedSet, y = {
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
          condition: function(D) {
            return D.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, w = function() {
        var D = z(S[x], 2), P = D[0], N = D[1];
        ["pre", !1].forEach(function(X) {
          return a(X ? "".concat(P, ":").concat(X) : P, function(oe) {
            return N.forEach(function(Z) {
              return (!Z.condition || Z.condition(oe)) && r(X ? "".concat(X).concat(Z.name) : Z.name, h({
                items: l.elements,
                isDragging: p.isDragging
              }, oe));
            });
          });
        });
      }, x = 0, S = Object.entries(y); x < S.length; x++)
        w();
    }, Ie = function(u) {
      return u ? !Array.isArray(u) && (u instanceof HTMLElement || u instanceof SVGElement) ? [u] : A(u) : [];
    }, Bt = function(u, a) {
      u.style.left = "".concat(a.left, "px"), u.style.top = "".concat(a.top, "px"), u.style.width = "".concat(a.width, "px"), u.style.height = "".concat(a.height, "px");
    }, Zr = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.area, l = a.PS, y = a.zoom;
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
          He(r.parentNodes, r._modificationCallback, r._modificationObserver);
        }), i(this, "reset", function() {
          r._computedStyle = void 0, r._rect = void 0, r._computedBorder = void 0, r._parentNodes = void 0;
        }), i(this, "stop", function() {
          Fr(r._modificationObserver, r._modificationCallback), r.reset();
        }), i(this, "scroll", function(w, x) {
          var S = {
            scroll_directions: w,
            scroll_multiplier: x
          };
          r.PubSub.publish("Area:scroll:pre", S), qr(r._node, w, x), r.PubSub.publish("Area:scroll", S);
        }), this._zoom = y, this.PubSub = l, this.setArea(p), this._modificationCallback = it(function(w) {
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
          return this._rect ? this._rect : this._rect = ht(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var r = function p(l) {
            var y, w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, x = (y = l[w]) === null || y === void 0 ? void 0 : y.parentNode;
            return x ? (l.push(x), w++, p(l, w)) : l;
          };
          return this._parentNodes = r([this.HTMLNode]), this._parentNodes;
        }
      }]), u;
    }(), Jr = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, l = a.dragKeys, y = a.draggability, w = a.keyboardDrag, x = a.keyboardDragSpeed, S = a.useTransform, $ = a.zoom;
        t(this, u), i(this, "_useTransform", void 0), i(this, "_prevCursorPos", void 0), i(this, "_prevScrollPos", void 0), i(this, "_elements", []), i(this, "_draggability", void 0), i(this, "_dragKeys", void 0), i(this, "_dragKeysFlat", void 0), i(this, "_keyboardDrag", void 0), i(this, "_keyboardDragSpeed", void 0), i(this, "_zoom", void 0), i(this, "keyboardDrag", function(D) {
          var P = D.event, N = D.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(N) || !r.DS.SelectedSet.size || !r._draggability || r.DS.continue)) {
            var X = {
              event: P,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:start:pre", "Interaction:start"], X), r._elements = r.DS.getSelection(), r.handleZIndex(!0);
            var oe = Yr({
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
                posDirection: oe,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], X);
          }
        }), i(this, "keyboardEnd", function(D) {
          var P = D.event, N = D.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(N) || !r.DS.SelectedSet.size || !r._draggability)) {
            var X = {
              event: P,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], X);
          }
        }), i(this, "start", function(D) {
          var P = D.isDragging, N = D.isDraggingKeyboard;
          !P || N || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), i(this, "stop", function(D) {
          D != null && D.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), i(this, "update", function(D) {
          var P = D.isDragging, N = D.isDraggingKeyboard;
          if (!(!P || !r._elements.length || N || r.DS.continue)) {
            var X = U(r._cursorDiff, "+", r._scrollDiff);
            r._elements.forEach(function(oe) {
              return zt({
                element: oe,
                posDirection: X,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            });
          }
        }), i(this, "handleZIndex", function(D) {
          r._elements.forEach(function(P) {
            return P.style.zIndex = "".concat((parseInt(P.style.zIndex) || 0) + D ? 9999 : -9998);
          });
        }), this.DS = p, this._useTransform = S, this._keyboardDragSpeed = x, this._keyboardDrag = w, this._zoom = $, this._draggability = y, this._dragKeys = {
          up: l.up.map(function(D) {
            return D.toLowerCase();
          }),
          down: l.down.map(function(D) {
            return D.toLowerCase();
          }),
          left: l.left.map(function(D) {
            return D.toLowerCase();
          }),
          right: l.right.map(function(D) {
            return D.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(A(this._dragKeys.up), A(this._dragKeys.down), A(this._dragKeys.left), A(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return s(u, [{
        key: "_cursorDiff",
        get: function() {
          var r = this.DS.stores.PointerStore.currentVal, p = this._prevCursorPos ? U(r, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = r, p;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var r = this.DS.stores.ScrollStore.currentVal, p = this._prevScrollPos ? U(r, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = r, p;
        }
      }]), u;
    }(), Qr = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, l = a.areaElement, y = a.draggability, w = a.immediateDrag, x = a.selectableClass;
        t(this, u), i(this, "_areaElement", void 0), i(this, "_draggability", void 0), i(this, "_immediateDrag", void 0), i(this, "_selectableClass", void 0), i(this, "isInteracting", void 0), i(this, "isDragging", void 0), i(this, "init", function() {
          return r.DS.publish("Interaction:init:pre", {});
        }), i(this, "_init", function() {
          r.stop(), r._areaElement.addEventListener("mousedown", r.start), r._areaElement.addEventListener("touchstart", r.start, {
            passive: !1
          }), r.DS.publish("Interaction:init", {});
        }), i(this, "start", function(S) {
          return r.DS.publish("Interaction:start:pre", {
            event: S,
            isDragging: r.isDragging
          });
        }), i(this, "_start", function(S) {
          S.type === "touchstart" && S.preventDefault(), r._canInteract(S) && (r.isInteracting = !0, r.isDragging = r.isDragEvent(S), r.DS.publish("Interaction:start", {
            event: S,
            isDragging: r.isDragging
          }), document.addEventListener("mouseup", r.reset), document.addEventListener("touchend", r.reset));
        }), i(this, "isDragEvent", function(S) {
          var $ = S.target.closest(".".concat(r._selectableClass));
          return !r._draggability || r.DS.stores.KeyStore.isMultiSelectKeyPressed(S) || !$ ? !1 : (r._immediateDrag && (r.DS.SelectedSet.size ? r.DS.SelectedSet.has($) || (r.DS.SelectedSet.clear(), r.DS.SelectedSet.add(
            $
          )) : r.DS.SelectedSet.add(
            $
          )), !!r.DS.SelectedSet.has($));
        }), i(this, "onClick", function(S) {
          var $ = S.event;
          if (!!r._canInteract($) && !($.detail > 0)) {
            var D = r.DS, P = D.stores, N = P.PointerStore, X = P.KeyStore, oe = D.SelectableSet, Z = D.SelectedSet;
            N.start($);
            var je = $.target;
            !oe.has(je) || (X.isMultiSelectKeyPressed($) || Z.clear(), Z.toggle(je), r.reset());
          }
        }), i(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), i(this, "update", function(S) {
          var $ = S.event, D = S.scroll_directions, P = S.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: $,
            scroll_directions: D,
            scroll_multiplier: P,
            isDragging: r.isDragging
          });
        }), i(this, "reset", function(S) {
          return r.DS.publish("Interaction:end:pre", {
            event: S,
            isDragging: r.isDragging
          });
        }), i(this, "_reset", function(S) {
          var $ = r.isDragging;
          r.stop(), r.init(), r.DS.publish("Interaction:end", {
            event: S,
            isDragging: $
          });
        }), this._areaElement = l, this._draggability = y, this._immediateDrag = w, this._selectableClass = x, this.DS = p, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(S) {
          var $ = S.event;
          return r.start($);
        }), this.DS.subscribe("Interaction:start:pre", function(S) {
          var $ = S.event;
          return r._start($);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(S) {
          var $ = S.event;
          return r._reset($);
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
    }(), ei = function u(a) {
      var r = this, p = a.DS;
      t(this, u), i(this, "subscribers", {}), i(this, "subscribe", function(l, y) {
        return Array.isArray(r.subscribers[l]) || (r.subscribers[l] = []), r.subscribers[l].push(y), r.subscribers[l].length - 1;
      }), i(this, "unsubscribe", function(l, y, w) {
        w >= 0 ? r.subscribers[l].splice(w, 1) : y && (r.subscribers[l] = r.subscribers[l].filter(function(x) {
          return x !== y;
        }));
      }), i(this, "publish", function(l, y) {
        Array.isArray(l) ? l.forEach(function(w) {
          return r._publish(w, y);
        }) : r._publish(l, y);
      }), i(this, "_publish", function(l, y) {
        var w = r.subscribers[l];
        !Array.isArray(w) || (l.includes(":pre") ? r._handlePrePublish(w, y) : r._handlePublish(w, y));
      }), i(this, "_handlePublish", function(l, y) {
        for (var w = 0, x = l.length; w < x; w++) {
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
      }), this.DS = p;
    }, ti = /* @__PURE__ */ function(u) {
      v(r, u);
      var a = K(r);
      function r(p) {
        var l, y = p.elements, w = p.className, x = p.hoverClassName, S = p.draggability, $ = p.useTransform, D = p.DS;
        return t(this, r), l = a.call(this), i(I(l), "_initElements", void 0), i(I(l), "_className", void 0), i(I(l), "_hoverClassName", void 0), i(I(l), "_useTransform", void 0), i(I(l), "_draggability", void 0), i(I(l), "init", function() {
          return l._initElements.forEach(function(P) {
            return l.add(P);
          });
        }), i(I(l), "clear", function() {
          return l.forEach(function(P) {
            return l.delete(P);
          });
        }), i(I(l), "_onClick", function(P) {
          return l.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: P
          });
        }), i(I(l), "_onPointer", function(P) {
          return l.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: P
          });
        }), i(I(l), "addAll", function(P) {
          return P.forEach(function(N) {
            return l.add(N);
          });
        }), i(I(l), "deleteAll", function(P) {
          return P.forEach(function(N) {
            return l.delete(N);
          });
        }), l.DS = D, l._initElements = Ie(y), l._className = w, l._hoverClassName = x, l._useTransform = $, l._draggability = S, l.DS.subscribe("Interaction:init", l.init), l;
      }
      return s(r, [{
        key: "add",
        value: function(l) {
          return l.classList.add(this._className), l.addEventListener("click", this._onClick), l.addEventListener("mousedown", this._onPointer), l.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Vt({
            computedStyle: window.getComputedStyle(l),
            node: l
          }), C(f(r.prototype), "add", this).call(this, l);
        }
      }, {
        key: "delete",
        value: function(l) {
          return l.classList.remove(this._className), l.classList.remove(this._hoverClassName), l.removeEventListener("click", this._onClick), l.removeEventListener("mousedown", this._onPointer), l.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), C(f(r.prototype), "delete", this).call(this, l);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ T(Set)), ri = /* @__PURE__ */ function(u) {
      v(r, u);
      var a = K(r);
      function r(p) {
        var l, y = p.className, w = p.DS;
        return t(this, r), l = a.call(this), i(I(l), "_className", void 0), i(I(l), "clear", function() {
          return l.forEach(function(x) {
            return l.delete(x);
          });
        }), i(I(l), "addAll", function(x) {
          return x.forEach(function(S) {
            return l.add(S);
          });
        }), i(I(l), "deleteAll", function(x) {
          return x.forEach(function(S) {
            return l.delete(S);
          });
        }), l.DS = w, l._className = y, l;
      }
      return s(r, [{
        key: "add",
        value: function(l) {
          if (!C(f(r.prototype), "has", this).call(this, l)) {
            var y = {
              items: this.elements,
              item: l
            };
            return this.DS.publish("Selected:added:pre", y), C(f(r.prototype), "add", this).call(this, l), l.classList.add(this._className), l.style.zIndex = "".concat((parseInt(l.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", y), this;
          }
        }
      }, {
        key: "delete",
        value: function(l) {
          if (!!C(f(r.prototype), "has", this).call(this, l)) {
            var y = {
              items: this.elements,
              item: l
            };
            this.DS.publish("Selected:removed:pre", y);
            var w = C(f(r.prototype), "delete", this).call(this, l);
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
    }(/* @__PURE__ */ T(Set)), ii = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, l = a.hoverClassName, y = a.multiSelectToggling;
        t(this, u), i(this, "_prevSelectedSet", void 0), i(this, "_hoverClassName", void 0), i(this, "_multiSelectToggling", void 0), i(this, "start", function(w) {
          var x = w.event, S = w.isDragging;
          S || (r._storePrevious(x), r._handleInsideSelection(!0, x));
        }), i(this, "update", function(w) {
          var x = w.isDragging;
          x || r.DS.continue || r._handleInsideSelection();
        }), i(this, "_handleInsideSelection", function(w, x) {
          for (var S = r.DS, $ = S.SelectableSet, D = S.SelectorArea, P = S.Selector, N = $.elements.map(function(xe) {
            return [xe, xe.getBoundingClientRect()];
          }), X = [], oe = [], Z = 0, je = N.length; Z < je; Z++)
            !D.isInside(N[Z][0], N[Z][1]) || (ft(N[Z][1], P.rect) ? X.push(N[Z][0]) : oe.push(N[Z][0]));
          var nt = r.DS.stores.KeyStore.isMultiSelectKeyPressed(x) && r._multiSelectToggling;
          r.DS.continue || (X.forEach(function(xe) {
            return Wr({
              element: xe,
              force: w,
              multiSelectionToggle: nt,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName
            });
          }), oe.forEach(function(xe) {
            return Xr({
              element: xe,
              force: w,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName,
              PrevSelectedSet: r._prevSelectedSet
            });
          }));
        }), this._hoverClassName = l, this._multiSelectToggling = y, this.DS = p, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return s(u, [{
        key: "_storePrevious",
        value: function(r) {
          var p = this.DS, l = p.stores.KeyStore, y = p.SelectedSet;
          l.isMultiSelectKeyPressed(r) ? this._prevSelectedSet = new Set(y) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), u;
    }(), ni = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, l = a.selector, y = a.selectorClass, w = a.customStyles;
        t(this, u), i(this, "_rect", void 0), i(this, "start", function(x) {
          var S = x.isDragging;
          if (!S) {
            var $ = r.DS.stores.PointerStore, D = $.initialValArea;
            Bt(r.HTMLNode, he(D, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), i(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), i(this, "update", function(x) {
          var S = x.isDragging;
          if (!(S || r.DS.continue)) {
            var $ = r.DS.stores, D = $.ScrollStore, P = $.PointerStore, N = Br({
              scrollAmount: D.scrollAmount,
              initialPointerPos: P.initialValArea,
              pointerPos: P.currentValArea
            });
            Bt(r.HTMLNode, N), r._rect = null;
          }
        }), this.DS = p, this.HTMLNode = l || rt(w), this.HTMLNode.classList.add(y), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return s(u, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), u;
    }(), oi = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, l = a.selectorAreaClass, y = a.autoScrollSpeed, w = a.overflowTolerance;
        t(this, u), i(this, "_autoScrollSpeed", void 0), i(this, "_scrollInterval", void 0), i(this, "_rect", void 0), i(this, "currentEdges", []), i(this, "_overflowTolerance", void 0), i(this, "start", function() {
          return r.applyElements("append");
        }), i(this, "applyElements", function() {
          var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", S = document.body ? "body" : "documentElement", $ = "".concat(x, "Child");
          r.HTMLNode[$](r.DS.Selector.HTMLNode), document[S][$](r.HTMLNode);
        }), i(this, "updatePos", function() {
          r._rect = null;
          var x = r.DS.Area.rect, S = r.DS.Area.computedBorder, $ = r.HTMLNode.style, D = "".concat(x.top + S.top, "px"), P = "".concat(x.left + S.left, "px"), N = "".concat(x.width, "px"), X = "".concat(x.height, "px");
          $.top !== D && ($.top = D), $.left !== P && ($.left = P), $.width !== N && ($.width = N), $.height !== X && ($.height = X);
        }), i(this, "stop", function(x) {
          r.stopAutoScroll(), x && r.applyElements("remove");
        }), i(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), i(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var x = r.DS, S = x.stores.PointerStore, $ = x.Area;
            r.currentEdges = Nt({
              elementRect: he(S.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && $.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), i(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), i(this, "isInside", function(x, S) {
          return r.DS.Area.HTMLNode.contains(x) && r.DS.stores.ScrollStore.canScroll ? !0 : ft(r.rect, S || x.getBoundingClientRect());
        }), this._autoScrollSpeed = y, this._overflowTolerance = w, this.DS = p, this.HTMLNode = tt(l), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          r.updatePos(), r.stopAutoScroll();
        });
      }
      return s(u, [{
        key: "isClicked",
        value: function(r) {
          var p = this.DS.stores.PointerStore, l = r ? p.getPointerPosition(r) : p.initialVal;
          return ft({
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
    }(), ai = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, l = a.multiSelectKeys, y = a.multiSelectMode;
        t(this, u), i(this, "_multiSelectMode", void 0), i(this, "_multiSelectKeys", void 0), i(this, "_currentValues", /* @__PURE__ */ new Set()), i(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), i(this, "init", function() {
          document.addEventListener("keydown", r.keydown), document.addEventListener("keyup", r.keyup), window.addEventListener("blur", r.reset);
        }), i(this, "keydown", function(w) {
          var x = w.key.toLowerCase();
          r.DS.publish("KeyStore:down:pre", {
            event: w,
            key: x
          }), r._currentValues.add(x), r.DS.publish("KeyStore:down", {
            event: w,
            key: x
          });
        }), i(this, "keyup", function(w) {
          var x = w.key.toLowerCase();
          r.DS.publish("KeyStore:up:pre", {
            event: w,
            key: x
          }), r._currentValues.delete(x), r.DS.publish("KeyStore:up", {
            event: w,
            key: x
          });
        }), i(this, "stop", function() {
          document.removeEventListener("keydown", r.keydown), document.removeEventListener("keyup", r.reset), window.removeEventListener("blur", r.reset), r.reset();
        }), i(this, "reset", function() {
          return r._currentValues.clear();
        }), this.DS = p, this._multiSelectMode = y, this._multiSelectKeys = l.map(function(w) {
          var x = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, S = x[w];
          return S ? (console.warn("[DragSelect] ".concat(w, ' is deprecated. Use "').concat(S, '" instead. Act Now!. See docs for more info')), S.toLowerCase()) : w.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return s(u, [{
        key: "isMultiSelectKeyPressed",
        value: function(r) {
          var p = this;
          return !!(this._multiSelectMode || this.currentValues.some(function(l) {
            return p._multiSelectKeys.includes(l);
          }) || r && this._multiSelectKeys.some(function(l) {
            return r[p._keyMapping[l]];
          }));
        }
      }, {
        key: "currentValues",
        get: function() {
          return Array.from(this._currentValues.values());
        }
      }]), u;
    }(), si = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS;
        t(this, u), i(this, "_isMouseInteraction", !1), i(this, "_initialValArea", void 0), i(this, "_currentValArea", void 0), i(this, "_lastValArea", void 0), i(this, "_initialVal", void 0), i(this, "_currentVal", void 0), i(this, "_lastVal", void 0), i(this, "_lastTouch", void 0), i(this, "init", function() {
          document.addEventListener("mousemove", r.update), document.addEventListener("touchmove", r.update, {
            passive: !1
          });
        }), i(this, "getPointerPosition", function(l) {
          return zr({
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
        }), this.DS = p, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(l) {
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
          this._initialVal = r, this._initialValArea = r && U(r, "-", U(G(this.DS.Area.rect), "+", G(this.DS.Area.computedBorder)));
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
          this._currentVal = r, this._currentValArea = r && U(r, "-", U(G(this.DS.Area.rect), "+", G(this.DS.Area.computedBorder)));
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
          this._lastVal = r, this._lastValArea = r && U(r, "-", U(G(this.DS.Area.rect), "+", G(this.DS.Area.computedBorder)));
        }
      }]), u;
    }(), li = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.DS, l = a.areaElement, y = a.zoom;
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
        }), this._areaElement = l, this.DS = p, this.zoom = y, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return r.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return r.reset();
        });
      }
      return s(u, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = Ke(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var r = U(this.currentVal, "-", this.initialVal), p = Te(this.zoom), l = U(U(r, "*", p), "-", r);
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
    }(), ci = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, p = a.area, l = p === void 0 ? document : p, y = a.selectables, w = y === void 0 ? [] : y, x = a.autoScrollSpeed, S = x === void 0 ? 5 : x, $ = a.overflowTolerance, D = $ === void 0 ? {
          x: 25,
          y: 25
        } : $, P = a.zoom, N = P === void 0 ? 1 : P, X = a.customStyles, oe = X === void 0 ? !1 : X, Z = a.multiSelectMode, je = Z === void 0 ? !1 : Z, nt = a.multiSelectToggling, xe = nt === void 0 ? !0 : nt, Rt = a.multiSelectKeys, ui = Rt === void 0 ? ["Control", "Shift", "Meta"] : Rt, Ht = a.selector, di = Ht === void 0 ? void 0 : Ht, Kt = a.draggability, mt = Kt === void 0 ? !0 : Kt, Ut = a.immediateDrag, hi = Ut === void 0 ? !0 : Ut, Yt = a.keyboardDrag, fi = Yt === void 0 ? !0 : Yt, mi = a.dragKeys, Wt = a.keyboardDragSpeed, gi = Wt === void 0 ? 10 : Wt, Xt = a.useTransform, Ft = Xt === void 0 ? !0 : Xt, qt = a.hoverClass, Gt = qt === void 0 ? "ds-hover" : qt, Zt = a.selectableClass, Jt = Zt === void 0 ? "ds-selectable" : Zt, Qt = a.selectedClass, pi = Qt === void 0 ? "ds-selected" : Qt, er = a.selectorClass, vi = er === void 0 ? "ds-selector" : er, tr = a.selectorAreaClass, bi = tr === void 0 ? "ds-selector-area" : tr, yi = a.callback, wi = a.onDragMove, xi = a.onDragStartBegin, _i = a.onDragStart, Si = a.onElementSelect, ki = a.onElementUnselect;
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
        }), i(this, "isMultiSelect", function(Di) {
          return r.stores.KeyStore.isMultiSelectKeyPressed(Di);
        }), i(this, "isDragging", function() {
          return r.Interaction.isDragging;
        }), this.PubSub = new ei({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: yi,
          onDragMove: wi,
          onDragStart: _i,
          onDragStartBegin: xi,
          onElementSelect: Si,
          onElementUnselect: ki
        }), this.stores = {
          PointerStore: new si({
            DS: this
          }),
          ScrollStore: new li({
            DS: this,
            areaElement: l,
            zoom: N
          }),
          KeyStore: new ai({
            DS: this,
            multiSelectKeys: ui,
            multiSelectMode: je
          })
        }, this.Area = new Zr({
          area: l,
          PS: this.PubSub,
          zoom: N
        }), this.Selector = new ni({
          DS: this,
          selector: di,
          selectorClass: vi,
          customStyles: oe
        }), this.SelectorArea = new oi({
          DS: this,
          selectorAreaClass: bi,
          autoScrollSpeed: S,
          overflowTolerance: D
        }), this.SelectableSet = new ti({
          elements: w,
          DS: this,
          className: Jt,
          hoverClassName: Gt,
          useTransform: Ft,
          draggability: mt
        }), this.SelectedSet = new ri({
          DS: this,
          className: pi
        }), this.Selection = new ii({
          DS: this,
          hoverClassName: Gt,
          multiSelectToggling: xe
        }), this.Drag = new Jr({
          DS: this,
          draggability: mt,
          useTransform: Ft,
          keyboardDrag: fi,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, mi),
          zoom: N,
          keyboardDragSpeed: gi
        }), this.Interaction = new Qr({
          areaElement: l,
          DS: this,
          draggability: mt,
          immediateDrag: hi,
          selectableClass: Jt
        }), Gr({
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
          var p = r.callback, l = r.onDragMove, y = r.onDragStart, w = r.onDragStartBegin, x = r.onElementSelect, S = r.onElementUnselect, $ = function(P, N) {
            return console.warn("[DragSelect] ".concat(P, ' is deprecated. Use DragSelect.subscribe("').concat(N, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          p && ($("callback", "callback"), this.subscribe("callback", function(D) {
            var P = D.items;
            D.item;
            var N = D.event;
            return p(P, N);
          })), l && ($("onDragMove", "dragmove"), this.subscribe("dragmove", function(D) {
            D.items, D.item;
            var P = D.event;
            return l(P);
          })), y && ($("onDragStart", "dragstart"), this.subscribe("dragstart", function(D) {
            D.items, D.item;
            var P = D.event;
            return y(P);
          })), w && ($("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(D) {
            D.items, D.item;
            var P = D.event;
            return w(P);
          })), x && ($("onElementSelect", "elementselect"), this.subscribe("elementselect", function(D) {
            D.items;
            var P = D.item, N = D.event;
            return x(P, N);
          })), S && ($("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(D) {
            D.items;
            var P = D.item, N = D.event;
            return S(P, N);
          }));
        }
      }, {
        key: "stop",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          l && this.publish("callback", {
            items: this.getSelection()
          }), this.Interaction.stop(), this.Area.stop(), this.Drag.stop(), this.Selector.stop(), this.SelectorArea.stop(r), this.stores.KeyStore.stop(), this.stores.PointerStore.stop(), this.stores.ScrollStore.stop(), r && this.SelectableSet.clear(), p && this.SelectedSet.clear(), this.stopped = !0;
        }
      }, {
        key: "addSelection",
        value: function(r) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.addAll(Ie(r)), l || this.addSelectables(r), p && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(r) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(Ie(r)), l && this.removeSelectables(r), p && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(r) {
          var p = this, l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return Ie(r).forEach(function(w) {
            return p.SelectedSet.has(w) ? p.removeSelection(r, l, y) : p.addSelection(r, l, y);
          }), l && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "setSelection",
        value: function(r) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.clearSelection(), this.addSelection(r, p, l), this.getSelection();
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
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = Ie(r);
          return this.SelectableSet.addAll(l), p && this.SelectedSet.addAll(l), r;
        }
      }, {
        key: "setSelectables",
        value: function(r) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.removeSelectables(r, p), this.addSelectables(r, l);
        }
      }, {
        key: "removeSelectables",
        value: function(r) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return this.SelectableSet.deleteAll(Ie(r)), p && this.removeSelection(r), r;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var l = p ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), y = r ? p ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : p ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return U(l, "-", y);
        }
      }]), u;
    }();
    return ci;
  });
})(Sr);
const an = Sr.exports, sn = (o, e, t, n, s) => (e = Math, t = e.log, n = 1024, s = t(o) / t(n) | 0, o / e.pow(n, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B"), ln = (o, e = "en-US") => new Date(o * 1e3).toLocaleString(e), cn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, un = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), dn = [
  un
], hn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, fn = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), mn = [
  fn
], gn = {
  name: "VFSortIcon"
}, vt = /* @__PURE__ */ Object.assign(gn, {
  props: { direction: String },
  setup(o) {
    return (e, t) => (k(), M("div", null, [
      o.direction == "down" ? (k(), M("svg", cn, dn)) : ae("", !0),
      o.direction == "up" ? (k(), M("svg", hn, mn)) : ae("", !0)
    ]));
  }
}), pn = { class: "relative h-full" }, vn = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, bn = /* @__PURE__ */ Re(" Name "), yn = /* @__PURE__ */ Re(" Size "), wn = /* @__PURE__ */ Re(" Date "), xn = { class: "absolute" }, _n = /* @__PURE__ */ d("svg", {
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
], -1), Sn = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, kn = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Dn = { class: "grid grid-cols-12 items-center" }, Cn = { class: "flex col-span-7 items-center" }, Mn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $n = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), En = [
  $n
], An = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Pn = [
  Tn
], On = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, In = { class: "col-span-2 text-center" }, jn = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Nn = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Ln = { class: "relative" }, Vn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Bn = [
  zn
], Rn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Kn = [
  Hn
], Un = { class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500" }, Yn = { class: "break-all" }, Wn = {
  name: "VFExplorer"
}, Xn = /* @__PURE__ */ Object.assign(Wn, {
  props: {
    view: String,
    data: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = (C) => C == null ? void 0 : C.substring(0, 3), i = (C) => C.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), c = j(null), h = j(null), v = j(0), f = j(null), m = (C) => {
      C.type == "dir" ? t.emit("vf-fetch", { q: "index", adapter: e.data.adapter, path: C.path }) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: C });
    }, g = lt({ active: !1, column: "", order: "" }), b = (C = !0) => {
      let z = [...e.data.files], A = g.column, _ = g.order == "asc" ? 1 : -1;
      if (!C)
        return z;
      const O = (H, q) => typeof H == "string" && typeof q == "string" ? H.toLowerCase().localeCompare(q.toLowerCase()) : H < q ? -1 : H > q ? 1 : 0;
      return g.active && (z = z.slice().sort((H, q) => O(H[A], q[A]) * _)), z;
    }, E = (C) => {
      g.active && g.column == C ? (g.active = g.order == "asc", g.column = C, g.order = "desc") : (g.active = !0, g.column = C, g.order = "asc");
    }, T = () => f.value.getSelection().map((C) => JSON.parse(C.dataset.item)), I = (C, z) => {
      if (C.altKey || C.ctrlKey || C.metaKey)
        return C.preventDefault(), !1;
      C.dataTransfer.setDragImage(h.value, 0, 15), C.dataTransfer.effectAllowed = "all", C.dataTransfer.dropEffect = "copy", C.dataTransfer.setData("items", JSON.stringify(T()));
    }, L = (C, z) => {
      C.preventDefault();
      let A = JSON.parse(C.dataTransfer.getData("items"));
      if (A.find((_) => _.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: A, to: z } });
    }, K = (C, z) => {
      C.preventDefault(), !z || z.type !== "dir" || f.value.getSelection().find((A) => A == C.currentTarget) ? (C.dataTransfer.dropEffect = "none", C.dataTransfer.effectAllowed = "none") : C.dataTransfer.dropEffect = "copy";
    };
    return me(() => {
      f.value = new an({
        area: c.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => At(() => {
        f.value.clearSelection(), f.value.setSelectables(document.getElementsByClassName("vf-item"));
      })), f.value.subscribe("predragstart", ({ event: C, isDragging: z }) => {
        if (z)
          v.value = f.value.getSelection().length, f.value.break();
        else {
          const A = C.target.offsetWidth - C.offsetX, _ = C.target.offsetHeight - C.offsetY;
          A < 15 && _ < 15 && (f.value.clearSelection(), f.value.break());
        }
      }), f.value.subscribe("predragmove", ({ isDragging: C }) => {
        C && f.value.break();
      }), f.value.subscribe("callback", ({ items: C, event: z, isDragging: A }) => {
        t.emit("vf-nodes-selected", T()), v.value = f.value.getSelection().length;
      });
    }), me(() => {
      _r(() => e.view, () => t.emit("vf-explorer-update"));
    }), (C, z) => (k(), M("div", pn, [
      o.view == "list" ? (k(), M("div", vn, [
        d("div", {
          onClick: z[0] || (z[0] = (A) => E("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center pl-1"
        }, [
          bn,
          ye(Se(vt, {
            direction: g.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [gt, g.active && g.column == "basename"]
          ])
        ]),
        d("div", {
          onClick: z[1] || (z[1] = (A) => E("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          yn,
          ye(Se(vt, {
            direction: g.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [gt, g.active && g.column == "file_size"]
          ])
        ]),
        d("div", {
          onClick: z[2] || (z[2] = (A) => E("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center"
        }, [
          wn,
          ye(Se(vt, {
            direction: g.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [gt, g.active && g.column == "last_modified"]
          ])
        ])
      ])) : ae("", !0),
      d("div", xn, [
        d("div", {
          ref: (A) => h.value = A,
          class: "absolute -z-50 -top-96"
        }, [
          _n,
          d("div", Sn, B(v.value), 1)
        ], 512)
      ]),
      d("div", {
        class: "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto resize-y p-1 z-0",
        ref: (A) => c.value = A,
        onContextmenu: z[3] || (z[3] = qe((A) => R(t).emit("vf-contextmenu-show", { event: A, area: c.value, items: T() }), ["self", "prevent"]))
      }, [
        o.view == "list" ? (k(!0), M(re, { key: 0 }, ge(b(), (A, _) => (k(), M("div", {
          draggable: "true",
          onDblclick: (O) => m(A),
          onContextmenu: qe((O) => R(t).emit("vf-contextmenu-show", { event: O, area: c.value, items: T(), target: A }), ["prevent"]),
          onDragstart: (O) => I(O),
          onDragover: (O) => K(O, A),
          onDrop: (O) => L(O, A),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": A.type,
          "data-item": JSON.stringify(A),
          "data-index": _
        }, [
          d("div", Dn, [
            d("div", Cn, [
              A.type == "dir" ? (k(), M("svg", Mn, En)) : (k(), M("svg", An, Pn)),
              d("span", On, B(A.basename), 1)
            ]),
            d("div", In, B(A.file_size ? R(sn)(A.file_size) : ""), 1),
            d("div", jn, B(R(ln)(A.last_modified)), 1)
          ])
        ], 40, kn))), 256)) : ae("", !0),
        o.view == "grid" ? (k(!0), M(re, { key: 1 }, ge(b(!1), (A, _) => (k(), M("div", {
          draggable: "true",
          onDblclick: (O) => m(A),
          onContextmenu: qe((O) => R(t).emit("vf-contextmenu-show", { event: O, area: c.value, items: T(), target: A }), ["prevent"]),
          onDragstart: (O) => I(O),
          onDragover: (O) => K(O, A),
          onDrop: (O) => L(O, A),
          class: "vf-item border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none",
          "data-type": A.type,
          "data-item": JSON.stringify(A),
          "data-index": _
        }, [
          d("div", null, [
            d("div", Ln, [
              A.type == "dir" ? (k(), M("svg", Vn, Bn)) : (k(), M("svg", Rn, Kn)),
              d("div", Un, B(s(A.extension)), 1)
            ]),
            d("span", Yn, B(i(A.basename)), 1)
          ])
        ], 40, Nn))), 256)) : ae("", !0)
      ], 544)
    ]));
  }
}), Fn = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, qn = { class: "flex leading-5 items-center" }, Gn = /* @__PURE__ */ d("div", {
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
], -1), Zn = ["value"], Jn = { class: "ml-3" }, Qn = { class: "flex leading-5 items-center" }, eo = /* @__PURE__ */ d("svg", {
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
], -1), to = [
  eo
], ro = {
  name: "VFStatusbar"
}, io = /* @__PURE__ */ Object.assign(ro, {
  props: {
    data: Object
  },
  setup(o) {
    var v;
    const e = o, t = inject("emitter"), { getStore: n, setStore: s } = inject("storage"), i = j(0), c = j((v = n("adapter")) != null ? v : e.data.adapter), h = () => {
      t.emit("vf-fetch", { q: "index", adapter: c.value }), s("adapter", c.value);
    };
    return t.on("vf-nodes-selected", (f) => {
      i.value = f.length;
    }), (f, m) => (k(), M("div", Fn, [
      d("div", qn, [
        Gn,
        ye(d("select", {
          "onUpdate:modelValue": m[0] || (m[0] = (g) => c.value = g),
          onChange: h,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (k(!0), M(re, null, ge(o.data.storages, (g) => (k(), M("option", { value: g }, B(g), 9, Zn))), 256))
        ], 544), [
          [Ci, c.value]
        ]),
        d("span", Jn, B(i.value > 0 ? i.value + " items selected." : ""), 1)
      ]),
      d("div", Qn, [
        d("span", {
          onClick: m[1] || (m[1] = (g) => R(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: "Vuefinder is a file manager component for vue 3." }))
        }, to)
      ])
    ]));
  }
}), no = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none" }, oo = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), ao = [
  oo
], so = { class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full" }, lo = /* @__PURE__ */ d("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), co = [
  lo
], uo = { class: "flex leading-5" }, ho = /* @__PURE__ */ d("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), fo = ["title", "onClick"], mo = {
  name: "VFBreadcrumb"
}, go = /* @__PURE__ */ Object.assign(mo, {
  props: {
    data: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = j(null), i = j([]);
    t.on("vf-explorer-update", (v) => {
      var g;
      let f = [], m = [];
      s.value = (g = e.data.dirname) != null ? g : n("adapter", "local") + "://", s.value.length == 0 && (i.value = []), s.value.replace(n("adapter", "local") + "://", "").split("/").forEach(function(b) {
        f.push(b), f.join("/") != "" && m.push({
          basename: b,
          name: b,
          path: n("adapter", "local") + "://" + f.join("/"),
          type: "dir"
        });
      }), m.length > 4 && (m = m.slice(-5), m[0].name = ".."), i.value = m;
    });
    const c = (v) => {
      var m;
      v.preventDefault();
      let f = JSON.parse(v.dataTransfer.getData("items"));
      if (f.find((g) => g.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: f, to: (m = i.value[i.value.length - 2]) != null ? m : { path: n("adapter", "local") + "://" } }
      });
    }, h = (v) => {
      v.preventDefault(), i.value.length < 1 ? (v.dataTransfer.dropEffect = "none", v.dataTransfer.effectAllowed = "none") : v.dataTransfer.dropEffect = "copy";
    };
    return (v, f) => (k(), M("div", no, [
      (k(), M("svg", {
        onDragover: f[0] || (f[0] = (m) => h(m)),
        onDrop: f[1] || (f[1] = (m) => c(m)),
        onClick: f[2] || (f[2] = (m) => {
          var g, b;
          return !i.value.length || R(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: (b = (g = i.value[i.value.length - 2]) == null ? void 0 : g.path) != null ? b : R(n)("adapter", "local") + "://" });
        }),
        class: ke(["h-6 w-6 p-0.5 rounded", i.value.length ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, ao, 34)),
      d("div", so, [
        (k(), M("svg", {
          onClick: f[3] || (f[3] = (m) => R(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, co)),
        d("div", uo, [
          (k(!0), M(re, null, ge(i.value, (m, g) => (k(), M("div", { key: g }, [
            ho,
            d("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: m.basename,
              onClick: (b) => R(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: m.path })
            }, B(m.name), 9, fo)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Ae = (o) => Object.entries(o).map((e) => e.map(encodeURIComponent).join("=")).join("&"), po = ["onClick"], vo = /* @__PURE__ */ d("span", { class: "px-1" }, null, -1), bo = {
  name: "VFContextMenu"
}, yo = /* @__PURE__ */ Object.assign(bo, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), n = j(null), { apiUrl: s } = we(), i = lt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), c = j([]);
    t.on("vf-context-selected", (m) => {
      c.value = m;
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
      download: {
        title: "Download",
        action: () => {
          const m = s.value + "?" + Ae({ q: "download", adapter: c.value[0].adapter, path: c.value[0].path });
          t.emit("vf-download", m);
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
    }, v = (m) => {
      t.emit("vf-contextmenu-hide"), m.action();
    };
    t.on("vf-contextmenu-show", ({ event: m, area: g, items: b, target: E = null }) => {
      i.items = [], E ? b.length > 1 && b.some((T) => T.path === E.path) ? (i.items.push(h.refresh), i.items.push(h.archive), i.items.push(h.delete), t.emit("vf-context-selected", b), console.log(b.length + " selected (more than 1 item.)")) : (i.items.push(h.preview), i.items.push(h.rename), i.items.push(h.download), E.mime_type == "application/zip" ? i.items.push(h.unarchive) : i.items.push(h.archive), i.items.push(h.delete), t.emit("vf-context-selected", [E]), console.log(E.type + " is selected")) : (i.items.push(h.refresh), i.items.push(h.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")), f(m, g);
    }), t.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const f = (m, g) => {
      i.active = !0, At(() => {
        let b = g.getBoundingClientRect(), E = m.pageX, T = m.pageY, I = n.value.offsetHeight, L = n.value.offsetWidth;
        E = b.right - m.pageX + window.scrollX < L ? E - L : E, T = b.bottom - m.pageY + window.scrollY < I ? T - I : T, i.positions = {
          left: E + "px",
          top: T + "px"
        };
      });
    };
    return (m, g) => i.active ? (k(), M("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref: (b) => n.value = b,
      style: Mi(i.positions)
    }, [
      (k(!0), M(re, null, ge(i.items, (b) => (k(), M("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: b.title,
        onClick: (E) => v(b)
      }, [
        vo,
        d("span", null, B(b.title), 1)
      ], 8, po))), 128))
    ], 4)) : ae("", !0);
  }
}), wo = /* @__PURE__ */ d("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), xo = {
  name: "VueFinder"
}, _o = /* @__PURE__ */ Object.assign(xo, {
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
    const e = o, t = Ei();
    rr("emitter", t);
    const { setStore: n, getStore: s } = nr(e.id);
    rr("storage", nr(e.id));
    const { apiUrl: i, setApiUrl: c } = we();
    c(e.url);
    const h = lt({ adapter: "local", storages: [], dirname: ".", files: [] }), v = j(s("viewport", "grid")), f = j(s("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      f.value = !f.value, n("darkMode", f.value);
    });
    const m = j(s("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      m.value = !m.value, n("full-screen", m.value);
    }), t.on("vf-view-toggle", (E) => {
      v.value = E;
    });
    const g = lt({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      g.active = !1;
    }), t.on("vf-modal-show", (E) => {
      g.active = !0, g.type = E.type, g.data = E;
    });
    const b = (E) => {
      Object.assign(h, E), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update", E);
    };
    return t.on("vf-fetch", (E) => {
      ct(i.value, { params: E }).then((T) => {
        t.emit("vf-modal-close"), b(T);
      });
    }), t.on("vf-download", (E) => {
      document.getElementById("download_frame").src = E, t.emit("vf-modal-close");
    }), me(() => {
      t.emit("vf-fetch", { q: "index", adapter: s("adapter", h.adapter) });
    }), (E, T) => (k(), M("div", {
      class: ke(f.value ? "dark" : "")
    }, [
      d("div", {
        class: ke([m.value ? "fixed top-0 bottom-0 left-0 right-0 z-20" : "relative", "border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        onMousedown: T[0] || (T[0] = (I) => R(t).emit("vf-contextmenu-hide"))
      }, [
        Se(nn),
        Se(go, { data: h }, null, 8, ["data"]),
        Se(Xn, {
          view: v.value,
          data: h
        }, null, 8, ["view", "data"]),
        Se(io, { data: h }, null, 8, ["data"])
      ], 34),
      g.active ? (k(), te($i("v-f-modal-" + g.type), {
        key: 0,
        selection: g.data,
        current: h
      }, null, 8, ["selection", "current"])) : ae("", !0),
      Se(yo, { current: h }, null, 8, ["current"]),
      wo
    ], 2));
  }
}), So = /* @__PURE__ */ d("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), ko = { class: "fixed z-10 inset-0 overflow-y-auto" }, Do = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, Co = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Mo = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, ve = {
  __name: "ModalLayout",
  setup(o) {
    const e = inject("emitter");
    return me(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, n) => (k(), M("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: n[1] || (n[1] = Qe((s) => R(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      So,
      d("div", ko, [
        d("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = qe((s) => R(e).emit("vf-modal-close"), ["self"]))
        }, [
          d("div", Do, [
            d("div", Co, [
              ir(t.$slots, "default")
            ]),
            d("div", Mo, [
              ir(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, $o = { class: "sm:flex sm:items-start" }, Eo = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ao = { class: "mt-3 text-center sm:mt-0 sm:text-left" }, To = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Delete files", -1), Po = { class: "mt-2" }, Oo = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500" }, "Are you sure you want to delete these files?", -1), Io = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, jo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, No = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Lo = [
  No
], Vo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Bo = [
  zo
], Ro = { class: "ml-1.5" }, Ho = /* @__PURE__ */ d("div", { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, "This action cannot be undone.", -1), Ko = {
  name: "VFModalDelete"
}, Uo = /* @__PURE__ */ Object.assign(Ko, {
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
    return (c, h) => (k(), te(ve, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, delete!"),
        d("button", {
          type: "button",
          onClick: h[0] || (h[0] = (v) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel"),
        Ho
      ]),
      default: Q(() => [
        d("div", $o, [
          Eo,
          d("div", Ao, [
            To,
            d("div", Po, [
              Oo,
              (k(!0), M(re, null, ge(s.value, (v) => (k(), M("p", Io, [
                v.type == "dir" ? (k(), M("svg", jo, Lo)) : (k(), M("svg", Vo, Bo)),
                d("span", Ro, B(v.basename), 1)
              ]))), 256))
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Yo = { class: "sm:flex sm:items-start" }, Wo = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Xo = { class: "mt-3 text-center sm:mt-0 sm:text-left" }, Fo = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, qo = { class: "mt-2" }, Go = { class: "text-sm text-gray-500" }, Zo = {
  name: "VFModalMessage"
}, Jo = /* @__PURE__ */ Object.assign(Zo, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = inject("emitter");
    return (t, n) => (k(), te(ve, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: n[0] || (n[0] = (s) => R(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close")
      ]),
      default: Q(() => {
        var s, i, c, h;
        return [
          d("div", Yo, [
            Wo,
            d("div", Xo, [
              d("h3", Fo, B((i = (s = o.selection) == null ? void 0 : s.title) != null ? i : "Title"), 1),
              d("div", qo, [
                d("p", Go, B((h = (c = o.selection) == null ? void 0 : c.message) != null ? h : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), Qo = { class: "sm:flex sm:items-start" }, ea = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ta = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, ra = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New Folder", -1), ia = { class: "mt-2" }, na = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500" }, "Create a new folder", -1), oa = ["onKeyup"], aa = {
  name: "VFModalNewFolder"
}, sa = /* @__PURE__ */ Object.assign(aa, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = j(""), i = () => {
      s.value != "" && t.emit("vf-fetch", {
        q: "newfolder",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: s.value
      });
    };
    return (c, h) => (k(), te(ve, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (v) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        d("div", Qo, [
          ea,
          d("div", ta, [
            ra,
            d("div", ia, [
              na,
              ye(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (v) => s.value = v),
                onKeyup: Qe(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Folder Name",
                type: "text"
              }, null, 40, oa), [
                [et, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), la = { class: "sm:flex sm:items-start" }, ca = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ua = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, da = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New File", -1), ha = { class: "mt-2" }, fa = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500" }, "Create a new file", -1), ma = ["onKeyup"], ga = {
  name: "VFModalNewFile"
}, pa = /* @__PURE__ */ Object.assign(ga, {
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
    return (c, h) => (k(), te(ve, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (v) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        d("div", la, [
          ca,
          d("div", ua, [
            da,
            d("div", ha, [
              fa,
              ye(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (v) => s.value = v),
                onKeyup: Qe(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "File Name",
                type: "text"
              }, null, 40, ma), [
                [et, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), va = { class: "flex" }, ba = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ya = { class: "ml-auto mb-2" }, wa = {
  key: 0,
  class: "p-2 border font-normal border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, xa = { key: 1 }, _a = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, n = j(""), s = j(""), i = j(null), c = j(!1), { apiUrl: h } = we();
    me(() => {
      ct(h.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((m) => {
        n.value = m, e("load");
      });
    });
    const v = () => {
      c.value = !c.value, s.value = n.value, c.value == !0 && At(() => {
        i.value.focus();
      });
    }, f = () => {
      ct(h.value, {
        method: "POST",
        params: { q: "save", adapter: t.selection.adapter, path: t.selection.item.path, content: s.value },
        json: !1
      }).then((m) => {
        n.value = m, e("load"), c.value = !c.value;
      }).catch((m) => console.log(m.statusText));
    };
    return (m, g) => (k(), M(re, null, [
      d("div", va, [
        d("div", ba, B(o.selection.item.basename), 1),
        d("div", ya, [
          c.value ? (k(), M("button", {
            key: 0,
            onClick: f,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Save")) : ae("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: g[0] || (g[0] = (b) => v())
          }, B(c.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      d("div", null, [
        c.value ? (k(), M("div", xa, [
          ye(d("textarea", {
            ref: (b) => i.value = b,
            "onUpdate:modelValue": g[1] || (g[1] = (b) => s.value = b),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [et, s.value]
          ])
        ])) : (k(), M("pre", wa, B(n.value), 1))
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
function kr(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ar(Object(t), !0).forEach(function(n) {
      Da(o, n, t[n]);
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
function Sa(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function sr(o, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(o, n.key, n);
  }
}
function ka(o, e, t) {
  return e && sr(o.prototype, e), t && sr(o, t), o;
}
function Da(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function Dr(o) {
  return Ca(o) || Ma(o) || $a(o) || Ea();
}
function Ca(o) {
  if (Array.isArray(o))
    return xt(o);
}
function Ma(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null)
    return Array.from(o);
}
function $a(o, e) {
  if (!!o) {
    if (typeof o == "string")
      return xt(o, e);
    var t = Object.prototype.toString.call(o).slice(8, -1);
    if (t === "Object" && o.constructor && (t = o.constructor.name), t === "Map" || t === "Set")
      return Array.from(o);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return xt(o, e);
  }
}
function xt(o, e) {
  (e == null || e > o.length) && (e = o.length);
  for (var t = 0, n = new Array(e); t < e; t++)
    n[t] = o[t];
  return n;
}
function Ea() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var dt = typeof window < "u" && typeof window.document < "u", pe = dt ? window : {}, Tt = dt && pe.document.documentElement ? "ontouchstart" in pe.document.documentElement : !1, Pt = dt ? "PointerEvent" in pe : !1, Y = "cropper", Ot = "all", Cr = "crop", Mr = "move", $r = "zoom", Me = "e", $e = "w", Ne = "s", _e = "n", Ye = "ne", We = "nw", Xe = "se", Fe = "sw", _t = "".concat(Y, "-crop"), lr = "".concat(Y, "-disabled"), ne = "".concat(Y, "-hidden"), cr = "".concat(Y, "-hide"), Aa = "".concat(Y, "-invisible"), ut = "".concat(Y, "-modal"), St = "".concat(Y, "-move"), Ze = "".concat(Y, "Action"), ot = "".concat(Y, "Preview"), It = "crop", Er = "move", Ar = "none", kt = "crop", Dt = "cropend", Ct = "cropmove", Mt = "cropstart", ur = "dblclick", Ta = Tt ? "touchstart" : "mousedown", Pa = Tt ? "touchmove" : "mousemove", Oa = Tt ? "touchend touchcancel" : "mouseup", dr = Pt ? "pointerdown" : Ta, hr = Pt ? "pointermove" : Pa, fr = Pt ? "pointerup pointercancel" : Oa, mr = "ready", gr = "resize", pr = "wheel", $t = "zoom", vr = "image/jpeg", Ia = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, ja = /^data:/, Na = /^data:image\/jpeg;base64,/, La = /^img|canvas$/i, Tr = 200, Pr = 100, br = {
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
  minContainerWidth: Tr,
  minContainerHeight: Pr,
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, Va = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', za = Number.isNaN || pe.isNaN;
function V(o) {
  return typeof o == "number" && !za(o);
}
var yr = function(e) {
  return e > 0 && e < 1 / 0;
};
function bt(o) {
  return typeof o > "u";
}
function Ee(o) {
  return st(o) === "object" && o !== null;
}
var Ba = Object.prototype.hasOwnProperty;
function Le(o) {
  if (!Ee(o))
    return !1;
  try {
    var e = o.constructor, t = e.prototype;
    return e && t && Ba.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function ie(o) {
  return typeof o == "function";
}
var Ra = Array.prototype.slice;
function Or(o) {
  return Array.from ? Array.from(o) : Ra.call(o);
}
function J(o, e) {
  return o && ie(e) && (Array.isArray(o) || V(o.length) ? Or(o).forEach(function(t, n) {
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
}, Ha = /\.\d*(?:0|9){12}\d*$/;
function ze(o) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return Ha.test(o) ? Math.round(o * e) / e : o;
}
var Ka = /^width|height|left|top|marginLeft|marginTop$/;
function De(o, e) {
  var t = o.style;
  J(e, function(n, s) {
    Ka.test(s) && V(n) && (n = "".concat(n, "px")), t[s] = n;
  });
}
function Ua(o, e) {
  return o.classList ? o.classList.contains(e) : o.className.indexOf(e) > -1;
}
function ee(o, e) {
  if (!!e) {
    if (V(o.length)) {
      J(o, function(n) {
        ee(n, e);
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
function fe(o, e) {
  if (!!e) {
    if (V(o.length)) {
      J(o, function(t) {
        fe(t, e);
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
    if (V(o.length)) {
      J(o, function(n) {
        Ve(n, e, t);
      });
      return;
    }
    t ? ee(o, e) : fe(o, e);
  }
}
var Ya = /([a-z\d])([A-Z])/g;
function jt(o) {
  return o.replace(Ya, "$1-$2").toLowerCase();
}
function Et(o, e) {
  return Ee(o[e]) ? o[e] : o.dataset ? o.dataset[e] : o.getAttribute("data-".concat(jt(e)));
}
function Je(o, e, t) {
  Ee(t) ? o[e] = t : o.dataset ? o.dataset[e] = t : o.setAttribute("data-".concat(jt(e)), t);
}
function Wa(o, e) {
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
var Ir = /\s\s*/, jr = function() {
  var o = !1;
  if (dt) {
    var e = !1, t = function() {
    }, n = Object.defineProperty({}, "once", {
      get: function() {
        return o = !0, e;
      },
      set: function(i) {
        e = i;
      }
    });
    pe.addEventListener("test", t, n), pe.removeEventListener("test", t, n);
  }
  return o;
}();
function ue(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, s = t;
  e.trim().split(Ir).forEach(function(i) {
    if (!jr) {
      var c = o.listeners;
      c && c[i] && c[i][t] && (s = c[i][t], delete c[i][t], Object.keys(c[i]).length === 0 && delete c[i], Object.keys(c).length === 0 && delete o.listeners);
    }
    o.removeEventListener(i, s, n);
  });
}
function le(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, s = t;
  e.trim().split(Ir).forEach(function(i) {
    if (n.once && !jr) {
      var c = o.listeners, h = c === void 0 ? {} : c;
      s = function() {
        delete h[i][t], o.removeEventListener(i, s, n);
        for (var f = arguments.length, m = new Array(f), g = 0; g < f; g++)
          m[g] = arguments[g];
        t.apply(o, m);
      }, h[i] || (h[i] = {}), h[i][t] && o.removeEventListener(i, h[i][t], n), h[i][t] = s, o.listeners = h;
    }
    o.addEventListener(i, s, n);
  });
}
function Be(o, e, t) {
  var n;
  return ie(Event) && ie(CustomEvent) ? n = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (n = document.createEvent("CustomEvent"), n.initCustomEvent(e, !0, !0, t)), o.dispatchEvent(n);
}
function Nr(o) {
  var e = o.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var yt = pe.location, Xa = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function wr(o) {
  var e = o.match(Xa);
  return e !== null && (e[1] !== yt.protocol || e[2] !== yt.hostname || e[3] !== yt.port);
}
function xr(o) {
  var e = "timestamp=".concat(new Date().getTime());
  return o + (o.indexOf("?") === -1 ? "?" : "&") + e;
}
function Ge(o) {
  var e = o.rotate, t = o.scaleX, n = o.scaleY, s = o.translateX, i = o.translateY, c = [];
  V(s) && s !== 0 && c.push("translateX(".concat(s, "px)")), V(i) && i !== 0 && c.push("translateY(".concat(i, "px)")), V(e) && e !== 0 && c.push("rotate(".concat(e, "deg)")), V(t) && t !== 1 && c.push("scaleX(".concat(t, ")")), V(n) && n !== 1 && c.push("scaleY(".concat(n, ")"));
  var h = c.length ? c.join(" ") : "none";
  return {
    WebkitTransform: h,
    msTransform: h,
    transform: h
  };
}
function Fa(o) {
  var e = kr({}, o), t = 0;
  return J(o, function(n, s) {
    delete e[s], J(e, function(i) {
      var c = Math.abs(n.startX - i.startX), h = Math.abs(n.startY - i.startY), v = Math.abs(n.endX - i.endX), f = Math.abs(n.endY - i.endY), m = Math.sqrt(c * c + h * h), g = Math.sqrt(v * v + f * f), b = (g - m) / m;
      Math.abs(b) > Math.abs(t) && (t = b);
    });
  }), t;
}
function at(o, e) {
  var t = o.pageX, n = o.pageY, s = {
    endX: t,
    endY: n
  };
  return e ? s : kr({
    startX: t,
    startY: n
  }, s);
}
function qa(o) {
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
function Ga(o) {
  var e = o.width, t = o.height, n = o.degree;
  if (n = Math.abs(n) % 180, n === 90)
    return {
      width: t,
      height: e
    };
  var s = n % 90 * Math.PI / 180, i = Math.sin(s), c = Math.cos(s), h = e * c + t * i, v = e * i + t * c;
  return n > 90 ? {
    width: v,
    height: h
  } : {
    width: h,
    height: v
  };
}
function Za(o, e, t, n) {
  var s = e.aspectRatio, i = e.naturalWidth, c = e.naturalHeight, h = e.rotate, v = h === void 0 ? 0 : h, f = e.scaleX, m = f === void 0 ? 1 : f, g = e.scaleY, b = g === void 0 ? 1 : g, E = t.aspectRatio, T = t.naturalWidth, I = t.naturalHeight, L = n.fillColor, K = L === void 0 ? "transparent" : L, F = n.imageSmoothingEnabled, C = F === void 0 ? !0 : F, z = n.imageSmoothingQuality, A = z === void 0 ? "low" : z, _ = n.maxWidth, O = _ === void 0 ? 1 / 0 : _, H = n.maxHeight, q = H === void 0 ? 1 / 0 : H, se = n.minWidth, ce = se === void 0 ? 0 : se, be = n.minHeight, de = be === void 0 ? 0 : be, U = document.createElement("canvas"), G = U.getContext("2d"), he = Ce({
    aspectRatio: E,
    width: O,
    height: q
  }), Te = Ce({
    aspectRatio: E,
    width: ce,
    height: de
  }, "cover"), He = Math.min(he.width, Math.max(Te.width, T)), Ke = Math.min(he.height, Math.max(Te.height, I)), tt = Ce({
    aspectRatio: s,
    width: O,
    height: q
  }), rt = Ce({
    aspectRatio: s,
    width: ce,
    height: de
  }, "cover"), it = Math.min(tt.width, Math.max(rt.width, i)), Pe = Math.min(tt.height, Math.max(rt.height, c)), ht = [-it / 2, -Pe / 2, it, Pe];
  return U.width = ze(He), U.height = ze(Ke), G.fillStyle = K, G.fillRect(0, 0, He, Ke), G.save(), G.translate(He / 2, Ke / 2), G.rotate(v * Math.PI / 180), G.scale(m, b), G.imageSmoothingEnabled = C, G.imageSmoothingQuality = A, G.drawImage.apply(G, [o].concat(Dr(ht.map(function(Oe) {
    return Math.floor(ze(Oe));
  })))), G.restore(), U;
}
var Lr = String.fromCharCode;
function Ja(o, e, t) {
  var n = "";
  t += e;
  for (var s = e; s < t; s += 1)
    n += Lr(o.getUint8(s));
  return n;
}
var Qa = /^data:.*,/;
function es(o) {
  var e = o.replace(Qa, ""), t = atob(e), n = new ArrayBuffer(t.length), s = new Uint8Array(n);
  return J(s, function(i, c) {
    s[c] = t.charCodeAt(c);
  }), n;
}
function ts(o, e) {
  for (var t = [], n = 8192, s = new Uint8Array(o); s.length > 0; )
    t.push(Lr.apply(null, Or(s.subarray(0, n)))), s = s.subarray(n);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function rs(o) {
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
      var v = s + 4, f = s + 10;
      if (Ja(e, v, 4) === "Exif") {
        var m = e.getUint16(f);
        if (n = m === 18761, (n || m === 19789) && e.getUint16(f + 2, n) === 42) {
          var g = e.getUint32(f + 4, n);
          g >= 8 && (i = f + g);
        }
      }
    }
    if (i) {
      var b = e.getUint16(i, n), E, T;
      for (T = 0; T < b; T += 1)
        if (E = i + T * 12 + 2, e.getUint16(E, n) === 274) {
          E += 8, t = e.getUint16(E, n), e.setUint16(E, 1, n);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function is(o) {
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
var ns = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, n = this.container, s = this.cropper, i = Number(t.minContainerWidth), c = Number(t.minContainerHeight);
    ee(s, ne), fe(e, ne);
    var h = {
      width: Math.max(n.offsetWidth, i >= 0 ? i : Tr),
      height: Math.max(n.offsetHeight, c >= 0 ? c : Pr)
    };
    this.containerData = h, De(s, {
      width: h.width,
      height: h.height
    }), ee(e, ne), fe(s, ne);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, n = this.options.viewMode, s = Math.abs(t.rotate) % 180 === 90, i = s ? t.naturalHeight : t.naturalWidth, c = s ? t.naturalWidth : t.naturalHeight, h = i / c, v = e.width, f = e.height;
    e.height * h > e.width ? n === 3 ? v = e.height * h : f = e.width / h : n === 3 ? f = e.width / h : v = e.height * h;
    var m = {
      aspectRatio: h,
      naturalWidth: i,
      naturalHeight: c,
      width: v,
      height: f
    };
    this.canvasData = m, this.limited = n === 1 || n === 2, this.limitCanvas(!0, !0), m.width = Math.min(Math.max(m.width, m.minWidth), m.maxWidth), m.height = Math.min(Math.max(m.height, m.minHeight), m.maxHeight), m.left = (e.width - m.width) / 2, m.top = (e.height - m.height) / 2, m.oldLeft = m.left, m.oldTop = m.top, this.initialCanvasData = W({}, m);
  },
  limitCanvas: function(e, t) {
    var n = this.options, s = this.containerData, i = this.canvasData, c = this.cropBoxData, h = n.viewMode, v = i.aspectRatio, f = this.cropped && c;
    if (e) {
      var m = Number(n.minCanvasWidth) || 0, g = Number(n.minCanvasHeight) || 0;
      h > 1 ? (m = Math.max(m, s.width), g = Math.max(g, s.height), h === 3 && (g * v > m ? m = g * v : g = m / v)) : h > 0 && (m ? m = Math.max(m, f ? c.width : 0) : g ? g = Math.max(g, f ? c.height : 0) : f && (m = c.width, g = c.height, g * v > m ? m = g * v : g = m / v));
      var b = Ce({
        aspectRatio: v,
        width: m,
        height: g
      });
      m = b.width, g = b.height, i.minWidth = m, i.minHeight = g, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
    }
    if (t)
      if (h > (f ? 0 : 1)) {
        var E = s.width - i.width, T = s.height - i.height;
        i.minLeft = Math.min(0, E), i.minTop = Math.min(0, T), i.maxLeft = Math.max(0, E), i.maxTop = Math.max(0, T), f && this.limited && (i.minLeft = Math.min(c.left, c.left + (c.width - i.width)), i.minTop = Math.min(c.top, c.top + (c.height - i.height)), i.maxLeft = c.left, i.maxTop = c.top, h === 2 && (i.width >= s.width && (i.minLeft = Math.min(0, E), i.maxLeft = Math.max(0, E)), i.height >= s.height && (i.minTop = Math.min(0, T), i.maxTop = Math.max(0, T))));
      } else
        i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = s.width, i.maxTop = s.height;
  },
  renderCanvas: function(e, t) {
    var n = this.canvasData, s = this.imageData;
    if (t) {
      var i = Ga({
        width: s.naturalWidth * Math.abs(s.scaleX || 1),
        height: s.naturalHeight * Math.abs(s.scaleY || 1),
        degree: s.rotate || 0
      }), c = i.width, h = i.height, v = n.width * (c / n.naturalWidth), f = n.height * (h / n.naturalHeight);
      n.left -= (v - n.width) / 2, n.top -= (f - n.height) / 2, n.width = v, n.height = f, n.aspectRatio = c / h, n.naturalWidth = c, n.naturalHeight = h, this.limitCanvas(!0, !1);
    }
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCanvas(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, De(this.canvas, W({
      width: n.width,
      height: n.height
    }, Ge({
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
    }, Ge(W({
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
    var n = this.options, s = this.containerData, i = this.canvasData, c = this.cropBoxData, h = this.limited, v = n.aspectRatio;
    if (e) {
      var f = Number(n.minCropBoxWidth) || 0, m = Number(n.minCropBoxHeight) || 0, g = h ? Math.min(s.width, i.width, i.width + i.left, s.width - i.left) : s.width, b = h ? Math.min(s.height, i.height, i.height + i.top, s.height - i.top) : s.height;
      f = Math.min(f, s.width), m = Math.min(m, s.height), v && (f && m ? m * v > f ? m = f / v : f = m * v : f ? m = f / v : m && (f = m * v), b * v > g ? b = g / v : g = b * v), c.minWidth = Math.min(f, g), c.minHeight = Math.min(m, b), c.maxWidth = g, c.maxHeight = b;
    }
    t && (h ? (c.minLeft = Math.max(0, i.left), c.minTop = Math.max(0, i.top), c.maxLeft = Math.min(s.width, i.left + i.width) - c.width, c.maxTop = Math.min(s.height, i.top + i.height) - c.height) : (c.minLeft = 0, c.minTop = 0, c.maxLeft = s.width - c.width, c.maxTop = s.height - c.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, n = this.cropBoxData;
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCropBox(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, e.movable && e.cropBoxMovable && Je(this.face, Ze, n.width >= t.width && n.height >= t.height ? Mr : Ot), De(this.cropBox, W({
      width: n.width,
      height: n.height
    }, Ge({
      translateX: n.left,
      translateY: n.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), Be(this.element, kt, this.getData());
  }
}, os = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, n = this.options.preview, s = t ? this.crossOriginUrl : this.url, i = e.alt || "The image to preview", c = document.createElement("img");
    if (t && (c.crossOrigin = t), c.src = s, c.alt = i, this.viewBox.appendChild(c), this.viewBoxImage = c, !!n) {
      var h = n;
      typeof n == "string" ? h = e.ownerDocument.querySelectorAll(n) : n.querySelector && (h = [n]), this.previews = h, J(h, function(v) {
        var f = document.createElement("img");
        Je(v, ot, {
          width: v.offsetWidth,
          height: v.offsetHeight,
          html: v.innerHTML
        }), t && (f.crossOrigin = t), f.src = s, f.alt = i, f.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', v.innerHTML = "", v.appendChild(f);
      });
    }
  },
  resetPreview: function() {
    J(this.previews, function(e) {
      var t = Et(e, ot);
      De(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, Wa(e, ot);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, n = this.cropBoxData, s = n.width, i = n.height, c = e.width, h = e.height, v = n.left - t.left - e.left, f = n.top - t.top - e.top;
    !this.cropped || this.disabled || (De(this.viewBoxImage, W({
      width: c,
      height: h
    }, Ge(W({
      translateX: -v,
      translateY: -f
    }, e)))), J(this.previews, function(m) {
      var g = Et(m, ot), b = g.width, E = g.height, T = b, I = E, L = 1;
      s && (L = b / s, I = i * L), i && I > E && (L = E / i, T = s * L, I = E), De(m, {
        width: T,
        height: I
      }), De(m.getElementsByTagName("img")[0], W({
        width: c * L,
        height: h * L
      }, Ge(W({
        translateX: -v * L,
        translateY: -f * L
      }, e))));
    }));
  }
}, as = {
  bind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    ie(t.cropstart) && le(e, Mt, t.cropstart), ie(t.cropmove) && le(e, Ct, t.cropmove), ie(t.cropend) && le(e, Dt, t.cropend), ie(t.crop) && le(e, kt, t.crop), ie(t.zoom) && le(e, $t, t.zoom), le(n, dr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && le(n, pr, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && le(n, ur, this.onDblclick = this.dblclick.bind(this)), le(e.ownerDocument, hr, this.onCropMove = this.cropMove.bind(this)), le(e.ownerDocument, fr, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && le(window, gr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    ie(t.cropstart) && ue(e, Mt, t.cropstart), ie(t.cropmove) && ue(e, Ct, t.cropmove), ie(t.cropend) && ue(e, Dt, t.cropend), ie(t.crop) && ue(e, kt, t.crop), ie(t.zoom) && ue(e, $t, t.zoom), ue(n, dr, this.onCropStart), t.zoomable && t.zoomOnWheel && ue(n, pr, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ue(n, ur, this.onDblclick), ue(e.ownerDocument, hr, this.onCropMove), ue(e.ownerDocument, fr, this.onCropEnd), t.responsive && ue(window, gr, this.onResize);
  }
}, ss = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, n = this.containerData, s = t.offsetWidth / n.width, i = t.offsetHeight / n.height, c = Math.abs(s - 1) > Math.abs(i - 1) ? s : i;
      if (c !== 1) {
        var h, v;
        e.restore && (h = this.getCanvasData(), v = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(J(h, function(f, m) {
          h[m] = f * c;
        })), this.setCropBoxData(J(v, function(f, m) {
          v[m] = f * c;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Ar || this.setDragMode(Ua(this.dragBox, _t) ? Er : It);
  },
  wheel: function(e) {
    var t = this, n = Number(this.options.wheelZoomRatio) || 0.1, s = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      t.wheeling = !1;
    }, 50), e.deltaY ? s = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? s = -e.wheelDelta / 120 : e.detail && (s = e.detail > 0 ? 1 : -1), this.zoom(-s * n, e)));
  },
  cropStart: function(e) {
    var t = e.buttons, n = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (V(t) && t !== 1 || V(n) && n !== 0 || e.ctrlKey))) {
      var s = this.options, i = this.pointers, c;
      e.changedTouches ? J(e.changedTouches, function(h) {
        i[h.identifier] = at(h);
      }) : i[e.pointerId || 0] = at(e), Object.keys(i).length > 1 && s.zoomable && s.zoomOnTouch ? c = $r : c = Et(e.target, Ze), !!Ia.test(c) && Be(this.element, Mt, {
        originalEvent: e,
        action: c
      }) !== !1 && (e.preventDefault(), this.action = c, this.cropping = !1, c === Cr && (this.cropping = !0, ee(this.dragBox, ut)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var n = this.pointers;
      e.preventDefault(), Be(this.element, Ct, {
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
      }) : delete n[e.pointerId || 0], t && (e.preventDefault(), Object.keys(n).length || (this.action = ""), this.cropping && (this.cropping = !1, Ve(this.dragBox, ut, this.cropped && this.options.modal)), Be(this.element, Dt, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, ls = {
  change: function(e) {
    var t = this.options, n = this.canvasData, s = this.containerData, i = this.cropBoxData, c = this.pointers, h = this.action, v = t.aspectRatio, f = i.left, m = i.top, g = i.width, b = i.height, E = f + g, T = m + b, I = 0, L = 0, K = s.width, F = s.height, C = !0, z;
    !v && e.shiftKey && (v = g && b ? g / b : 1), this.limited && (I = i.minLeft, L = i.minTop, K = I + Math.min(s.width, n.width, n.left + n.width), F = L + Math.min(s.height, n.height, n.top + n.height));
    var A = c[Object.keys(c)[0]], _ = {
      x: A.endX - A.startX,
      y: A.endY - A.startY
    }, O = function(q) {
      switch (q) {
        case Me:
          E + _.x > K && (_.x = K - E);
          break;
        case $e:
          f + _.x < I && (_.x = I - f);
          break;
        case _e:
          m + _.y < L && (_.y = L - m);
          break;
        case Ne:
          T + _.y > F && (_.y = F - T);
          break;
      }
    };
    switch (h) {
      case Ot:
        f += _.x, m += _.y;
        break;
      case Me:
        if (_.x >= 0 && (E >= K || v && (m <= L || T >= F))) {
          C = !1;
          break;
        }
        O(Me), g += _.x, g < 0 && (h = $e, g = -g, f -= g), v && (b = g / v, m += (i.height - b) / 2);
        break;
      case _e:
        if (_.y <= 0 && (m <= L || v && (f <= I || E >= K))) {
          C = !1;
          break;
        }
        O(_e), b -= _.y, m += _.y, b < 0 && (h = Ne, b = -b, m -= b), v && (g = b * v, f += (i.width - g) / 2);
        break;
      case $e:
        if (_.x <= 0 && (f <= I || v && (m <= L || T >= F))) {
          C = !1;
          break;
        }
        O($e), g -= _.x, f += _.x, g < 0 && (h = Me, g = -g, f -= g), v && (b = g / v, m += (i.height - b) / 2);
        break;
      case Ne:
        if (_.y >= 0 && (T >= F || v && (f <= I || E >= K))) {
          C = !1;
          break;
        }
        O(Ne), b += _.y, b < 0 && (h = _e, b = -b, m -= b), v && (g = b * v, f += (i.width - g) / 2);
        break;
      case Ye:
        if (v) {
          if (_.y <= 0 && (m <= L || E >= K)) {
            C = !1;
            break;
          }
          O(_e), b -= _.y, m += _.y, g = b * v;
        } else
          O(_e), O(Me), _.x >= 0 ? E < K ? g += _.x : _.y <= 0 && m <= L && (C = !1) : g += _.x, _.y <= 0 ? m > L && (b -= _.y, m += _.y) : (b -= _.y, m += _.y);
        g < 0 && b < 0 ? (h = Fe, b = -b, g = -g, m -= b, f -= g) : g < 0 ? (h = We, g = -g, f -= g) : b < 0 && (h = Xe, b = -b, m -= b);
        break;
      case We:
        if (v) {
          if (_.y <= 0 && (m <= L || f <= I)) {
            C = !1;
            break;
          }
          O(_e), b -= _.y, m += _.y, g = b * v, f += i.width - g;
        } else
          O(_e), O($e), _.x <= 0 ? f > I ? (g -= _.x, f += _.x) : _.y <= 0 && m <= L && (C = !1) : (g -= _.x, f += _.x), _.y <= 0 ? m > L && (b -= _.y, m += _.y) : (b -= _.y, m += _.y);
        g < 0 && b < 0 ? (h = Xe, b = -b, g = -g, m -= b, f -= g) : g < 0 ? (h = Ye, g = -g, f -= g) : b < 0 && (h = Fe, b = -b, m -= b);
        break;
      case Fe:
        if (v) {
          if (_.x <= 0 && (f <= I || T >= F)) {
            C = !1;
            break;
          }
          O($e), g -= _.x, f += _.x, b = g / v;
        } else
          O(Ne), O($e), _.x <= 0 ? f > I ? (g -= _.x, f += _.x) : _.y >= 0 && T >= F && (C = !1) : (g -= _.x, f += _.x), _.y >= 0 ? T < F && (b += _.y) : b += _.y;
        g < 0 && b < 0 ? (h = Ye, b = -b, g = -g, m -= b, f -= g) : g < 0 ? (h = Xe, g = -g, f -= g) : b < 0 && (h = We, b = -b, m -= b);
        break;
      case Xe:
        if (v) {
          if (_.x >= 0 && (E >= K || T >= F)) {
            C = !1;
            break;
          }
          O(Me), g += _.x, b = g / v;
        } else
          O(Ne), O(Me), _.x >= 0 ? E < K ? g += _.x : _.y >= 0 && T >= F && (C = !1) : g += _.x, _.y >= 0 ? T < F && (b += _.y) : b += _.y;
        g < 0 && b < 0 ? (h = We, b = -b, g = -g, m -= b, f -= g) : g < 0 ? (h = Fe, g = -g, f -= g) : b < 0 && (h = Ye, b = -b, m -= b);
        break;
      case Mr:
        this.move(_.x, _.y), C = !1;
        break;
      case $r:
        this.zoom(Fa(c), e), C = !1;
        break;
      case Cr:
        if (!_.x || !_.y) {
          C = !1;
          break;
        }
        z = Nr(this.cropper), f = A.startX - z.left, m = A.startY - z.top, g = i.minWidth, b = i.minHeight, _.x > 0 ? h = _.y > 0 ? Xe : Ye : _.x < 0 && (f -= g, h = _.y > 0 ? Fe : We), _.y < 0 && (m -= b), this.cropped || (fe(this.cropBox, ne), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    C && (i.width = g, i.height = b, i.left = f, i.top = m, this.action = h, this.renderCropBox()), J(c, function(H) {
      H.startX = H.endX, H.startY = H.endY;
    });
  }
}, cs = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && ee(this.dragBox, ut), fe(this.cropBox, ne), this.setCropBoxData(this.initialCropBoxData)), this;
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
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), fe(this.dragBox, ut), ee(this.cropBox, ne)), this;
  },
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, J(this.previews, function(n) {
      n.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, fe(this.cropper, lr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, ee(this.cropper, lr)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[Y] ? (e[Y] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, s = n.left, i = n.top;
    return this.moveTo(bt(e) ? e : s + Number(e), bt(t) ? t : i + Number(t));
  },
  moveTo: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, s = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (V(e) && (n.left = e, s = !0), V(t) && (n.top = t, s = !0), s && this.renderCanvas(!0)), this;
  },
  zoom: function(e, t) {
    var n = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(n.width * e / n.naturalWidth, null, t);
  },
  zoomTo: function(e, t, n) {
    var s = this.options, i = this.canvasData, c = i.width, h = i.height, v = i.naturalWidth, f = i.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && s.zoomable) {
      var m = v * e, g = f * e;
      if (Be(this.element, $t, {
        ratio: e,
        oldRatio: c / v,
        originalEvent: n
      }) === !1)
        return this;
      if (n) {
        var b = this.pointers, E = Nr(this.cropper), T = b && Object.keys(b).length ? qa(b) : {
          pageX: n.pageX,
          pageY: n.pageY
        };
        i.left -= (m - c) * ((T.pageX - E.left - i.left) / c), i.top -= (g - h) * ((T.pageY - E.top - i.top) / h);
      } else
        Le(t) && V(t.x) && V(t.y) ? (i.left -= (m - c) * ((t.x - i.left) / c), i.top -= (g - h) * ((t.y - i.top) / h)) : (i.left -= (m - c) / 2, i.top -= (g - h) / 2);
      i.width = m, i.height = g, this.renderCanvas(!0);
    }
    return this;
  },
  rotate: function(e) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(e));
  },
  rotateTo: function(e) {
    return e = Number(e), V(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
  },
  scaleX: function(e) {
    var t = this.imageData.scaleY;
    return this.scale(e, V(t) ? t : 1);
  },
  scaleY: function(e) {
    var t = this.imageData.scaleX;
    return this.scale(V(t) ? t : 1, e);
  },
  scale: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.imageData, s = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (V(e) && (n.scaleX = e, s = !0), V(t) && (n.scaleY = t, s = !0), s && this.renderCanvas(!0, !0)), this;
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
      if (J(c, function(m, g) {
        c[g] = m / h;
      }), e) {
        var v = Math.round(c.y + c.height), f = Math.round(c.x + c.width);
        c.x = Math.round(c.x), c.y = Math.round(c.y), c.width = f - c.x, c.height = v - c.y;
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
      t.rotatable && V(e.rotate) && e.rotate !== n.rotate && (n.rotate = e.rotate, c = !0), t.scalable && (V(e.scaleX) && e.scaleX !== n.scaleX && (n.scaleX = e.scaleX, c = !0), V(e.scaleY) && e.scaleY !== n.scaleY && (n.scaleY = e.scaleY, c = !0)), c && this.renderCanvas(!0, !0);
      var h = n.width / n.naturalWidth;
      V(e.x) && (i.left = e.x * h + s.left), V(e.y) && (i.top = e.y * h + s.top), V(e.width) && (i.width = e.width * h), V(e.height) && (i.height = e.height * h), this.setCropBoxData(i);
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
    return this.ready && !this.disabled && Le(e) && (V(e.left) && (t.left = e.left), V(e.top) && (t.top = e.top), V(e.width) ? (t.width = e.width, t.height = e.width / n) : V(e.height) && (t.height = e.height, t.width = e.height * n), this.renderCanvas(!0)), this;
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
    return this.ready && this.cropped && !this.disabled && Le(e) && (V(e.left) && (t.left = e.left), V(e.top) && (t.top = e.top), V(e.width) && e.width !== t.width && (s = !0, t.width = e.width), V(e.height) && e.height !== t.height && (i = !0, t.height = e.height), n && (s ? t.height = t.width / n : i && (t.width = t.height * n)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, n = Za(this.image, this.imageData, t, e);
    if (!this.cropped)
      return n;
    var s = this.getData(), i = s.x, c = s.y, h = s.width, v = s.height, f = n.width / Math.floor(t.naturalWidth);
    f !== 1 && (i *= f, c *= f, h *= f, v *= f);
    var m = h / v, g = Ce({
      aspectRatio: m,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Ce({
      aspectRatio: m,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), E = Ce({
      aspectRatio: m,
      width: e.width || (f !== 1 ? n.width : h),
      height: e.height || (f !== 1 ? n.height : v)
    }), T = E.width, I = E.height;
    T = Math.min(g.width, Math.max(b.width, T)), I = Math.min(g.height, Math.max(b.height, I));
    var L = document.createElement("canvas"), K = L.getContext("2d");
    L.width = ze(T), L.height = ze(I), K.fillStyle = e.fillColor || "transparent", K.fillRect(0, 0, T, I);
    var F = e.imageSmoothingEnabled, C = F === void 0 ? !0 : F, z = e.imageSmoothingQuality;
    K.imageSmoothingEnabled = C, z && (K.imageSmoothingQuality = z);
    var A = n.width, _ = n.height, O = i, H = c, q, se, ce, be, de, U;
    O <= -h || O > A ? (O = 0, q = 0, ce = 0, de = 0) : O <= 0 ? (ce = -O, O = 0, q = Math.min(A, h + O), de = q) : O <= A && (ce = 0, q = Math.min(h, A - O), de = q), q <= 0 || H <= -v || H > _ ? (H = 0, se = 0, be = 0, U = 0) : H <= 0 ? (be = -H, H = 0, se = Math.min(_, v + H), U = se) : H <= _ && (be = 0, se = Math.min(v, _ - H), U = se);
    var G = [O, H, q, se];
    if (de > 0 && U > 0) {
      var he = T / h;
      G.push(ce * he, be * he, de * he, U * he);
    }
    return K.drawImage.apply(K, [n].concat(Dr(G.map(function(Te) {
      return Math.floor(ze(Te));
    })))), L;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !bt(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, n = this.dragBox, s = this.face;
    if (this.ready && !this.disabled) {
      var i = e === It, c = t.movable && e === Er;
      e = i || c ? e : Ar, t.dragMode = e, Je(n, Ze, e), Ve(n, _t, i), Ve(n, St, c), t.cropBoxMovable || (Je(s, Ze, e), Ve(s, _t, i), Ve(s, St, c));
    }
    return this;
  }
}, us = pe.Cropper, Vr = /* @__PURE__ */ function() {
  function o(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (Sa(this, o), !e || !La.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = W({}, br, Le(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return ka(o, [{
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
        if (ja.test(t)) {
          Na.test(t) ? this.read(es(t)) : this.clone();
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
      var n = this.options, s = this.imageData, i = rs(t), c = 0, h = 1, v = 1;
      if (i > 1) {
        this.url = ts(t, vr);
        var f = is(i);
        c = f.rotate, h = f.scaleX, v = f.scaleY;
      }
      n.rotatable && (s.rotate = c), n.scalable && (s.scaleX = h, s.scaleY = v), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, n = this.url, s = t.crossOrigin, i = n;
      this.options.checkCrossOrigin && wr(n) && (s || (s = "anonymous"), i = xr(n)), this.crossOrigin = s, this.crossOriginUrl = i;
      var c = document.createElement("img");
      s && (c.crossOrigin = s), c.src = i || n, c.alt = t.alt || "The image to crop", this.image = c, c.onload = this.start.bind(this), c.onerror = this.stop.bind(this), ee(c, cr), t.parentNode.insertBefore(c, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, n = this.image;
      n.onload = null, n.onerror = null, this.sizing = !0;
      var s = pe.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(pe.navigator.userAgent), i = function(f, m) {
        W(t.imageData, {
          naturalWidth: f,
          naturalHeight: m,
          aspectRatio: f / m
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
        c.innerHTML = Va;
        var h = c.querySelector(".".concat(Y, "-container")), v = h.querySelector(".".concat(Y, "-canvas")), f = h.querySelector(".".concat(Y, "-drag-box")), m = h.querySelector(".".concat(Y, "-crop-box")), g = m.querySelector(".".concat(Y, "-face"));
        this.container = i, this.cropper = h, this.canvas = v, this.dragBox = f, this.cropBox = m, this.viewBox = h.querySelector(".".concat(Y, "-view-box")), this.face = g, v.appendChild(s), ee(t, ne), i.insertBefore(h, t.nextSibling), this.isImg || fe(s, cr), this.initPreview(), this.bind(), n.initialAspectRatio = Math.max(0, n.initialAspectRatio) || NaN, n.aspectRatio = Math.max(0, n.aspectRatio) || NaN, n.viewMode = Math.max(0, Math.min(3, Math.round(n.viewMode))) || 0, ee(m, ne), n.guides || ee(m.getElementsByClassName("".concat(Y, "-dashed")), ne), n.center || ee(m.getElementsByClassName("".concat(Y, "-center")), ne), n.background && ee(h, "".concat(Y, "-bg")), n.highlight || ee(g, Aa), n.cropBoxMovable && (ee(g, St), Je(g, Ze, Ot)), n.cropBoxResizable || (ee(m.getElementsByClassName("".concat(Y, "-line")), ne), ee(m.getElementsByClassName("".concat(Y, "-point")), ne)), this.render(), this.ready = !0, this.setDragMode(n.dragMode), n.autoCrop && this.crop(), this.setData(n.data), ie(n.ready) && le(t, mr, n.ready, {
          once: !0
        }), Be(t, mr);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      !this.ready || (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), fe(this.element, ne));
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = us, o;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      W(br, Le(t) && t);
    }
  }]), o;
}();
W(Vr.prototype, ns, os, as, ss, ls, cs);
const ds = { class: "flex" }, hs = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, fs = { class: "ml-auto mb-2" }, ms = { class: "w-full flex justify-center" }, gs = ["src"], ps = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = we(), s = () => n.value + "?" + Ae({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path }), i = j(null), c = j(null), h = j(!1), v = () => {
      h.value = !h.value, h.value ? c.value = new Vr(i.value, {
        crop(m) {
        }
      }) : c.value.destroy();
    }, f = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (m) => {
          ct(n.value, {
            method: "POST",
            params: { q: "upload", adapter: t.selection.adapter, path: t.selection.item.path, file: m },
            name: t.selection.item.basename,
            json: !1
          }).then((g) => {
            i.value.src = s(), v(), e("load");
          }).catch((g) => console.log(g.statusText));
        }
      );
    };
    return onMounted(() => {
      e("load");
    }), (m, g) => (k(), M(re, null, [
      d("div", ds, [
        d("h3", hs, B(o.selection.item.basename), 1),
        d("div", fs, [
          h.value ? (k(), M("button", {
            key: 0,
            onClick: f,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Crop")) : ae("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: g[0] || (g[0] = (b) => v())
          }, B(h.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      d("div", ms, [
        d("img", {
          ref: (b) => i.value = b,
          class: "max-w-[60vh] max-h-[60vh]",
          src: s(),
          alt: ""
        }, null, 8, gs)
      ])
    ], 64));
  }
}, vs = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, bs = /* @__PURE__ */ d("div", null, " Default view.. ", -1), ys = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    return me(() => {
      e("load");
    }), (t, n) => (k(), M(re, null, [
      d("h3", vs, B(o.selection.item.basename), 1),
      bs
    ], 64));
  }
}, ws = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, xs = {
  class: "w-full",
  preload: "",
  controls: ""
}, _s = ["src"], Ss = /* @__PURE__ */ Re(" Your browser does not support the video tag. "), ks = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = we(), s = () => n.value + "?" + Ae({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return me(() => {
      e("load");
    }), (i, c) => (k(), M(re, null, [
      d("h3", ws, B(o.selection.item.basename), 1),
      d("div", null, [
        d("video", xs, [
          d("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, _s),
          Ss
        ])
      ])
    ], 64));
  }
}, Ds = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Cs = {
  class: "w-full",
  controls: ""
}, Ms = ["src"], $s = /* @__PURE__ */ Re(" Your browser does not support the audio element. "), Es = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = we(), s = () => n.value + "?" + Ae({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return me(() => {
      e("load");
    }), (i, c) => (k(), M(re, null, [
      d("h3", Ds, B(o.selection.item.basename), 1),
      d("div", null, [
        d("audio", Cs, [
          d("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Ms),
          $s
        ])
      ])
    ], 64));
  }
}, As = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ts = ["data"], Ps = ["src"], Os = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = we(), s = () => n.value + "?" + Ae({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return me(() => {
      e("load");
    }), (i, c) => (k(), M(re, null, [
      d("h3", As, B(o.selection.item.basename), 1),
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
        `, 8, Ps)
        ], 8, Ts)
      ])
    ], 64));
  }
}, Is = { class: "sm:flex sm:items-start" }, js = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Ns = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Ls = {
  key: 0,
  class: "flex leading-5"
}, Vs = /* @__PURE__ */ d("svg", {
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
], -1), zs = /* @__PURE__ */ d("span", null, "Loading", -1), Bs = [
  Vs,
  zs
], Rs = {
  name: "VFModalPreview"
}, Hs = /* @__PURE__ */ Object.assign(Rs, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = o, { apiUrl: t } = we(), n = inject("emitter"), s = j(!1), i = (h) => {
      var v;
      return ((v = e.selection.item.mime_type) != null ? v : "").startsWith(h);
    }, c = () => {
      const h = t.value + "?" + Ae({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      n.emit("vf-download", h);
    };
    return (h, v) => (k(), te(ve, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: v[6] || (v[6] = (f) => R(n).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close"),
        d("button", {
          type: "button",
          onClick: v[7] || (v[7] = (f) => c()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Download")
      ]),
      default: Q(() => [
        d("div", Is, [
          d("div", js, [
            d("div", null, [
              i("text") ? (k(), te(_a, {
                key: 0,
                selection: o.selection,
                onLoad: v[0] || (v[0] = (f) => s.value = !0)
              }, null, 8, ["selection"])) : i("image") ? (k(), te(ps, {
                key: 1,
                selection: o.selection,
                onLoad: v[1] || (v[1] = (f) => s.value = !0)
              }, null, 8, ["selection"])) : i("video") ? (k(), te(ks, {
                key: 2,
                selection: o.selection,
                onLoad: v[2] || (v[2] = (f) => s.value = !0)
              }, null, 8, ["selection"])) : i("audio") ? (k(), te(Es, {
                key: 3,
                selection: o.selection,
                onLoad: v[3] || (v[3] = (f) => s.value = !0)
              }, null, 8, ["selection"])) : i("application/pdf") ? (k(), te(Os, {
                key: 4,
                selection: o.selection,
                onLoad: v[4] || (v[4] = (f) => s.value = !0)
              }, null, 8, ["selection"])) : (k(), te(ys, {
                key: 5,
                selection: o.selection,
                onLoad: v[5] || (v[5] = (f) => s.value = !0)
              }, null, 8, ["selection"]))
            ]),
            d("div", Ns, [
              d("p", null, B(o.selection.item.path), 1),
              d("p", null, "mime_type: " + B(o.selection.item.mime_type), 1),
              s.value == !1 ? (k(), M("div", Ls, Bs)) : ae("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ks = { class: "sm:flex sm:items-start" }, Us = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ys = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Ws = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Xs = { class: "mt-2" }, Fs = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, qs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gs = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Zs = [
  Gs
], Js = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qs = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), el = [
  Qs
], tl = { class: "ml-1.5" }, rl = ["onKeyup"], il = {
  name: "VFModalRename"
}, nl = /* @__PURE__ */ Object.assign(il, {
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
    return (h, v) => (k(), te(ve, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: c,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Rename!"),
        d("button", {
          type: "button",
          onClick: v[1] || (v[1] = (f) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        d("div", Ks, [
          Us,
          d("div", Ys, [
            d("h3", Ws, "Rename your " + B(s.value.type == "dir" ? "folder" : "file"), 1),
            d("div", Xs, [
              d("p", Fs, [
                s.value.type == "dir" ? (k(), M("svg", qs, Zs)) : (k(), M("svg", Js, el)),
                d("span", tl, B(s.value.basename), 1)
              ]),
              ye(d("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (f) => i.value = f),
                onKeyup: Qe(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, rl), [
                [et, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ol = { class: "sm:flex sm:items-start" }, al = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), sl = { class: "mt-3 text-center sm:mt-0 sm:text-left" }, ll = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 sm:ml-4 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Upload files", -1), cl = { class: "mt-2 sm:ml-4" }, ul = { class: "text-gray-500 mb-1" }, dl = ["id"], hl = {
  key: 0,
  class: "py-2"
}, fl = ["disabled", "onClick"], ml = {
  name: "VFModalUpload"
}, gl = /* @__PURE__ */ Object.assign(ml, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { apiUrl: n } = we(), s = j(null), i = j(null), c = j(null), h = j([]), v = j(!0), f = () => {
      s.value.start();
    };
    return me(() => {
      s.value = new pt.Uploader({
        runtimes: "html5",
        browse_button: c.value,
        container: i.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: n.value + "?" + Ae({ q: "upload", adapter: e.current.adapter, path: e.current.dirname }),
        init: {
          PostInit: function() {
          },
          FilesAdded: function(m, g) {
            v.value = !1, pt.each(g, function(b) {
              h.value.push({
                id: b.id,
                name: b.name,
                size: pt.formatSize(b.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(m, g) {
            h.value[h.value.findIndex((b) => b.id == g.id)].percent = g.percent + "%";
          },
          UploadComplete: function() {
            v.value = !0, t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: e.current.dirname });
          },
          Error: function(m, g) {
          }
        }
      }), s.value.init();
    }), (m, g) => (k(), te(ve, null, {
      buttons: Q(() => [
        d("button", {
          disabled: v.value,
          onClick: qe(f, ["prevent"]),
          type: "button",
          class: ke([v.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, "Upload!", 10, fl),
        d("button", {
          type: "button",
          onClick: g[0] || (g[0] = (b) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        d("div", ol, [
          al,
          d("div", sl, [
            ll,
            d("div", cl, [
              d("div", ul, [
                (k(!0), M(re, null, ge(h.value, (b) => (k(), M("div", null, [
                  d("div", {
                    id: b.id
                  }, [
                    Re(B(b.name) + " ( " + B(b.size) + ") ", 1),
                    d("b", null, B(b.percent), 1)
                  ], 8, dl)
                ]))), 256)),
                h.value.length ? ae("", !0) : (k(), M("div", hl, " No files selected!"))
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
}), pl = { class: "sm:flex sm:items-start" }, vl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
      d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
    })
  ])
], -1), bl = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, yl = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), wl = { class: "mt-2" }, xl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, _l = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Sl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), kl = [
  Sl
], Dl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Cl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ml = [
  Cl
], $l = { class: "ml-1.5" }, El = /* @__PURE__ */ d("p", { class: "my-1 text-sm text-gray-500" }, "Archive name. (.zip file will be created)", -1), Al = ["onKeyup"], Tl = {
  name: "VFModalArchive"
}, Pl = /* @__PURE__ */ Object.assign(Tl, {
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
        items: JSON.stringify(i.value.map(({ path: h, type: v }) => ({ path: h, type: v }))),
        name: s.value
      });
    };
    return (h, v) => (k(), te(ve, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: c,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Archive!"),
        d("button", {
          type: "button",
          onClick: v[1] || (v[1] = (f) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        d("div", pl, [
          vl,
          d("div", bl, [
            yl,
            d("div", wl, [
              (k(!0), M(re, null, ge(i.value, (f) => (k(), M("p", xl, [
                f.type == "dir" ? (k(), M("svg", _l, kl)) : (k(), M("svg", Dl, Ml)),
                d("span", $l, B(f.basename), 1)
              ]))), 256)),
              El,
              ye(d("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (f) => s.value = f),
                onKeyup: Qe(c, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Al), [
                [et, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ol = { class: "sm:flex sm:items-start" }, Il = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
      d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    })
  ])
], -1), jl = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Nl = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), Ll = { class: "mt-2" }, Vl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, zl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Rl = [
  Bl
], Hl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ul = [
  Kl
], Yl = { class: "ml-1.5" }, Wl = { class: "my-1 text-sm text-gray-500" }, Xl = {
  name: "VFModalUnarchive"
}, Fl = /* @__PURE__ */ Object.assign(Xl, {
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
    return (h, v) => (k(), te(ve, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: c,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Unarchive!"),
        d("button", {
          type: "button",
          onClick: v[0] || (v[0] = (f) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        d("div", Ol, [
          Il,
          d("div", jl, [
            Nl,
            d("div", Ll, [
              (k(!0), M(re, null, ge(i.value, (f) => (k(), M("p", Vl, [
                f.type == "dir" ? (k(), M("svg", zl, Rl)) : (k(), M("svg", Hl, Ul)),
                d("span", Yl, B(f.basename), 1)
              ]))), 256)),
              d("p", Wl, "Archive will be unarchived at (" + B(o.current.dirname) + ")", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ql = { class: "sm:flex sm:items-start" }, Gl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Zl = { class: "mt-3 text-center sm:mt-0 sm:text-left" }, Jl = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Move files", -1), Ql = { class: "mt-2" }, ec = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, tc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, rc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ic = [
  rc
], nc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, oc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ac = [
  oc
], sc = { class: "ml-1.5" }, lc = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Are you sure you want to move these files to ?", -1), cc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, uc = /* @__PURE__ */ d("svg", {
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
], -1), dc = { class: "ml-1.5 overflow-auto" }, hc = {
  name: "VFModalMove"
}, fc = /* @__PURE__ */ Object.assign(hc, {
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
    return (c, h) => (k(), te(ve, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, move!"),
        d("button", {
          type: "button",
          onClick: h[0] || (h[0] = (v) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        d("div", ql, [
          Gl,
          d("div", Zl, [
            Jl,
            d("div", Ql, [
              (k(!0), M(re, null, ge(s.value, (v) => (k(), M("p", ec, [
                v.type == "dir" ? (k(), M("svg", tc, ic)) : (k(), M("svg", nc, ac)),
                d("span", sc, B(v.path), 1)
              ]))), 256)),
              lc,
              d("p", cc, [
                uc,
                d("span", dc, B(o.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), mc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: Uo,
  ModalMessage: Jo,
  ModalNewFolder: sa,
  ModalNewFile: pa,
  ModalPreview: Hs,
  ModalRename: nl,
  ModalUpload: gl,
  ModalArchive: Pl,
  ModalUnarchive: Fl,
  ModalMove: fc
}, Symbol.toStringTag, { value: "Module" })), wt = {
  VueFinder: _o,
  ...mc
};
const vc = {
  install(o) {
    for (const e in wt)
      if (wt.hasOwnProperty(e)) {
        const t = wt[e];
        o.component(t.name, t);
      }
  }
};
export {
  vc as default
};
