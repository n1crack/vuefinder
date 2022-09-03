import { ref as N, watch as _r, openBlock as k, createElementBlock as $, createElementVNode as h, unref as R, normalizeClass as $e, createCommentVNode as le, reactive as lt, onMounted as me, withDirectives as ye, createVNode as Se, vShow as pt, toDisplayString as B, withModifiers as qe, Fragment as re, renderList as pe, createTextVNode as Re, nextTick as At, vModelSelect as Ci, normalizeStyle as Mi, provide as rr, createBlock as te, resolveDynamicComponent as $i, withKeys as Qe, renderSlot as ir, withCtx as Q, vModelText as et } from "vue";
import gt from "plupload";
const ct = (o, { method: e = "get", params: t = {}, json: n = !0 }) => {
  const s = { method: e };
  if (e == "get")
    o += "?" + new URLSearchParams(t);
  else {
    s.headers = {};
    let i = new FormData();
    for (const [c, d] of Object.entries(t))
      i.append(c, d);
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
  const t = N(JSON.parse(e));
  _r(t, n);
  function n() {
    t.value === null || t.value === "" ? localStorage.removeItem(o + "_storage") : localStorage.setItem(o + "_storage", JSON.stringify(t.value));
  }
  function s(d, g) {
    t.value = Object.assign({ ...t.value }, { [d]: g });
  }
  function i() {
    t.value = null;
  }
  return { getStore: (d, g = null) => t.value === null || t.value === "" ? g : t.value.hasOwnProperty(d) ? t.value[d] : g, setStore: s, clearStore: i };
}
const or = N("");
function we() {
  function o(e) {
    or.value = e;
  }
  return { apiUrl: or, setApiUrl: o };
}
const Ai = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Ti = { class: "flex text-center" }, Pi = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ h("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  })
], -1), Oi = [
  Pi
], Ii = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ h("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
  })
], -1), ji = [
  Ii
], Ni = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Li = [
  Ni
], Vi = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), zi = [
  Vi
], Bi = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ h("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  })
], -1), Ri = [
  Bi
], Hi = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), Ki = [
  Hi
], Ui = /* @__PURE__ */ h("path", {
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
}, Fi = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), qi = [
  Fi
], Gi = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, Zi = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, null, -1), Ji = [
  Zi
], Qi = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, en = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, null, -1), tn = [
  en
], rn = {
  name: "VFToolbar"
}, nn = /* @__PURE__ */ Object.assign(rn, {
  setup(o) {
    const e = inject("emitter"), { getStore: t, setStore: n } = inject("storage"), s = N(t("viewport", "grid")), i = N([]);
    return e.on("vf-nodes-selected", (c) => {
      i.value = c;
    }), e.on("vf-view-toggle", (c) => {
      n("viewport", c), s.value = c;
    }), (c, d) => (k(), $("div", Ai, [
      h("div", Ti, [
        h("div", {
          class: "mx-1.5",
          "aria-label": "New Folder",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: d[0] || (d[0] = (g) => R(e).emit("vf-modal-show", { type: "new-folder", items: i.value }))
        }, Oi),
        h("div", {
          class: "mx-1.5",
          "aria-label": "New File",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: d[1] || (d[1] = (g) => R(e).emit("vf-modal-show", { type: "new-file", items: i.value }))
        }, ji),
        h("div", {
          class: "mx-1.5",
          "aria-label": "Rename",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: d[2] || (d[2] = (g) => i.value.length != 1 || R(e).emit("vf-modal-show", { type: "rename", items: i.value }))
        }, [
          (k(), $("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: $e([i.value.length == 1 ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Li, 2))
        ]),
        h("div", {
          class: "mx-1.5",
          "aria-label": "Delete",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: d[3] || (d[3] = (g) => !i.value.length || R(e).emit("vf-modal-show", { type: "delete", items: i.value }))
        }, [
          (k(), $("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: $e([i.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, zi, 2))
        ]),
        h("div", {
          class: "mx-1.5",
          "aria-label": "Upload",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: d[4] || (d[4] = (g) => R(e).emit("vf-modal-show", { type: "upload", items: i.value }))
        }, Ri),
        i.value.length == 1 && i.value[0].mime_type == "application/zip" ? (k(), $("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": "Unrchive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: d[5] || (d[5] = (g) => !i.value.length || R(e).emit("vf-modal-show", { type: "unarchive", items: i.value }))
        }, [
          (k(), $("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: $e([i.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Ki, 2))
        ])) : (k(), $("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": "Archive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: d[6] || (d[6] = (g) => !i.value.length || R(e).emit("vf-modal-show", { type: "archive", items: i.value }))
        }, [
          (k(), $("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: $e([i.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Yi, 2))
        ]))
      ]),
      h("div", Wi, [
        h("div", Xi, [
          (k(), $("svg", {
            onClick: d[7] || (d[7] = (g) => R(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, qi))
        ]),
        h("div", {
          class: "mx-1.5",
          "aria-label": "Change View",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: d[8] || (d[8] = (g) => R(e).emit("vf-view-toggle", s.value == "list" ? "grid" : "list"))
        }, [
          s.value == "grid" ? (k(), $("svg", Gi, Ji)) : le("", !0),
          s.value == "list" ? (k(), $("svg", Qi, tn)) : le("", !0)
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
        var f = a[r];
        f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(u, f.key, f);
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
        var f = Object.getOwnPropertySymbols(u);
        a && (f = f.filter(function(l) {
          return Object.getOwnPropertyDescriptor(u, l).enumerable;
        })), r.push.apply(r, f);
      }
      return r;
    }
    function d(u) {
      for (var a = 1; a < arguments.length; a++) {
        var r = arguments[a] != null ? arguments[a] : {};
        a % 2 ? c(Object(r), !0).forEach(function(f) {
          i(u, f, r[f]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(r)) : c(Object(r)).forEach(function(f) {
          Object.defineProperty(u, f, Object.getOwnPropertyDescriptor(r, f));
        });
      }
      return u;
    }
    function g(u, a) {
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
    function v(u) {
      return v = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, v(u);
    }
    function m(u, a) {
      return m = Object.setPrototypeOf || function(f, l) {
        return f.__proto__ = l, f;
      }, m(u, a);
    }
    function p() {
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
      return p() ? b = Reflect.construct : b = function(l, y, w) {
        var x = [null];
        x.push.apply(x, y);
        var S = Function.bind.apply(l, x), M = new S();
        return w && m(M, w.prototype), M;
      }, b.apply(null, arguments);
    }
    function A(u) {
      return Function.toString.call(u).indexOf("[native code]") !== -1;
    }
    function P(u) {
      var a = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return P = function(f) {
        if (f === null || !A(f))
          return f;
        if (typeof f != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof a < "u") {
          if (a.has(f))
            return a.get(f);
          a.set(f, l);
        }
        function l() {
          return b(f, arguments, v(this).constructor);
        }
        return l.prototype = Object.create(f.prototype, {
          constructor: {
            value: l,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), m(l, f);
      }, P(u);
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
      var a = p();
      return function() {
        var f = v(u), l;
        if (a) {
          var y = v(this).constructor;
          l = Reflect.construct(f, arguments, y);
        } else
          l = f.apply(this, arguments);
        return L(this, l);
      };
    }
    function F(u, a) {
      for (; !Object.prototype.hasOwnProperty.call(u, a) && (u = v(u), u !== null); )
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
      return O(u) || q(u, a) || ae(u, a) || de();
    }
    function E(u) {
      return _(u) || H(u) || ae(u) || be();
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
        var r = [], f = !0, l = !1, y = void 0;
        try {
          for (var w = u[Symbol.iterator](), x; !(f = (x = w.next()).done) && (r.push(x.value), !(a && r.length === a)); f = !0)
            ;
        } catch (S) {
          l = !0, y = S;
        } finally {
          try {
            !f && w.return != null && w.return();
          } finally {
            if (l)
              throw y;
          }
        }
        return r;
      }
    }
    function ae(u, a) {
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
      for (var r = 0, f = new Array(a); r < a; r++)
        f[r] = u[r];
      return f;
    }
    function be() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function de() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var U = function(a, r, f) {
      var l = a.x, y = a.y, w = f.x, x = f.y, S = {
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
      window.addEventListener("resize", a), window.addEventListener("scroll", a), u.forEach(function(f, l) {
        r.observe(f, {
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
        for (var f = arguments.length, l = new Array(f), y = 0; y < f; y++)
          l[y] = arguments[y];
        var w = function() {
          r = null, u.apply(void 0, l);
        };
        clearTimeout(r), r = setTimeout(w, a);
      };
    }, Pe = function() {
      var u, a, r, f;
      return {
        y: ((u = document.body) === null || u === void 0 ? void 0 : u.scrollTop) || ((a = document.documentElement) === null || a === void 0 ? void 0 : a.scrollTop) || 0,
        x: ((r = document.body) === null || r === void 0 ? void 0 : r.scrollLeft) || ((f = document.documentElement) === null || f === void 0 ? void 0 : f.scrollLeft) || 0
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
      var a = u.elementRect, r = u.containerRect, f = u.tolerance, l = f === void 0 ? {
        x: 0,
        y: 0
      } : f, y = [];
      return a.top - l.y < r.top && y.push("top"), a.left - l.x < r.left && y.push("left"), a.bottom + l.y > r.bottom && y.push("bottom"), a.right + l.y > r.right && y.push("right"), y;
    }, zr = function(u) {
      var a = u.event;
      return {
        x: a.clientX,
        y: a.clientY
      };
    }, Br = function(u) {
      var a = u.scrollAmount, r = u.initialPointerPos, f = u.pointerPos, l = {};
      return f.x > r.x - a.x ? (l.left = r.x - a.x, l.width = f.x - r.x + a.x) : (l.left = f.x, l.width = r.x - f.x - a.x), f.y > r.y - a.y ? (l.top = r.y - a.y, l.height = f.y - r.y + a.y) : (l.top = f.y, l.height = r.y - f.y - a.y), l;
    }, Lt = function(a) {
      var r = {
        x: 0,
        y: 0
      }, f = window.getComputedStyle(a);
      if (!f.transform || f.transform === "none")
        return r;
      if (f.transform.indexOf("3d") >= 0) {
        var l = f.transform.trim().match(/matrix3d\((.*?)\)/);
        if (l && l.length) {
          var y, w = (y = l[1]) === null || y === void 0 ? void 0 : y.split(",");
          r.x = parseInt(w[12]) || 0, r.y = parseInt(w[13]) || 0;
        }
        return r;
      } else {
        var x = f.transform.trim().match(/matrix\((.*?)\)/);
        if (x && x.length) {
          var S, M = (S = x[1]) === null || S === void 0 ? void 0 : S.split(",");
          r.x = parseInt(M[4]) || 0, r.y = parseInt(M[5]) || 0;
        }
        return r;
      }
    }, Rr = function(a) {
      var r = a.style.transform;
      if (!r || r.indexOf("translate") < 0)
        return Lt(a);
      var f = {
        x: 0,
        y: 0
      }, l = r.trim().match(/translate[3dD]*?\(.*?\)/);
      if (l) {
        var y, w = (y = l[0]) === null || y === void 0 ? void 0 : y.split("(");
        if (w) {
          var x, S = (x = w[1]) === null || x === void 0 ? void 0 : x.split(",");
          f.x = parseInt(S[0]) || 0, f.y = parseInt(S[1]) || 0;
        }
      }
      return !f.x && !f.x ? Lt(a) : f;
    }, Hr = function(a) {
      var r = a.style, f = {
        x: parseInt(r.left) || 0,
        y: parseInt(r.top) || 0
      };
      if (!f.x && !f.x) {
        var l = window.getComputedStyle(a);
        return {
          x: parseInt(l.left) || 0,
          y: parseInt(l.top) || 0
        };
      }
      return f;
    }, Kr = function(u, a) {
      return a ? Rr(u) : Hr(u);
    }, Ur = function(u) {
      var a = u.element, r = u.edges, f = u.elementRect, l = u.containerRect, y = u.elementPos, w = u.useTransform;
      r.includes("top") && Ue(a, {
        y: y.y + l.top - f.top,
        x: y.x
      }, w), r.includes("left") && Ue(a, {
        y: y.y,
        x: y.x + l.left - f.left
      }, w), r.includes("bottom") && Ue(a, {
        y: y.y + l.bottom - f.bottom,
        x: y.x
      }, w), r.includes("right") && Ue(a, {
        y: y.y,
        x: y.x + l.right - f.right
      }, w);
    }, Vt = function(u) {
      var a = u.computedStyle, r = u.node, f = a.position, l = f === "absolute" || f === "relative" || f === "fixed";
      !(r instanceof HTMLDocument) && !l && (r.style.position = "relative");
    }, Yr = function(u) {
      var a = u.shiftKey, r = u.keyboardDragSpeed, f = u.zoom, l = u.key, y = u.dragKeys, w = u.scrollDiff, x = u.canScroll, S = u.scrollCallback, M = {
        x: 0,
        y: 0
      }, D = a ? r * 4 * f : r * f;
      return y.left.includes(l) && (M.x = w.x || -D, !a && !w.x && x && S(["left"], r)), y.right.includes(l) && (M.x = w.x || D, !a && !w.x && x && S(["right"], r)), y.up.includes(l) && (M.y = w.y || -D, !a && !w.y && x && S(["top"], r)), y.down.includes(l) && (M.y = w.y || D, !a && !w.y && x && S(["bottom"], r)), M;
    }, Wr = function(u) {
      var a = u.element, r = u.force, f = u.multiSelectionToggle, l = u.SelectedSet, y = u.hoverClassName;
      a.classList.contains(y) && !r || (l.has(a) ? f && l.delete(a) : l.add(a), a.classList.add(y));
    }, Xr = function(u) {
      var a = u.element, r = u.force, f = u.SelectedSet, l = u.PrevSelectedSet, y = u.hoverClassName;
      if (!a.classList.contains(y) && !r)
        return !1;
      var w = f.has(a), x = l.has(a);
      w && !x ? f.delete(a) : !w && x && f.add(a), a.classList.remove(y);
    }, ft = function(u, a) {
      return u.left < a.right && u.right > a.left && u.top < a.bottom && u.bottom > a.top;
    }, zt = function(u) {
      var a = u.element, r = u.posDirection, f = u.containerRect, l = u.useTransform, y = Kr(a, l), w = U(y, "+", r);
      Ue(a, w, l);
      var x = a.getBoundingClientRect(), S = Nt({
        elementRect: x,
        containerRect: f
      });
      Ur({
        element: a,
        edges: S,
        elementRect: x,
        containerRect: f,
        elementPos: w,
        useTransform: l
      });
    }, Fr = function(u, a) {
      window.removeEventListener("resize", a), window.removeEventListener("scroll", a), u.disconnect();
    }, qr = function(u, a, r) {
      if (!!a.length) {
        var f = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, l = u instanceof HTMLDocument ? f || document.body : u, y = a.includes("top") && l.scrollTop > 0, w = a.includes("bottom") && l.scrollTop < l.scrollHeight, x = a.includes("left") && l.scrollLeft > 0, S = a.includes("right") && l.scrollLeft < l.scrollWidth;
        y && (l.scrollTop -= 1 * r), w && (l.scrollTop += 1 * r), x && (l.scrollLeft -= 1 * r), S && (l.scrollLeft += 1 * r);
      }
    }, Ue = function(u, a, r) {
      if (r) {
        var f = u.style.transform;
        u.style.transform = "translate3d(".concat(a.x, "px,").concat(a.y, "px,1px) ").concat(f.replace(/translate.*?\)/g, ""));
      } else
        u.style.left = "".concat(a.x, "px"), u.style.top = "".concat(a.y, "px");
      return u;
    }, Gr = function(u) {
      for (var a = u.subscribe, r = u.publish, f = u.Interaction, l = u.SelectedSet, y = {
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
        var D = z(S[x], 2), T = D[0], j = D[1];
        ["pre", !1].forEach(function(X) {
          return a(X ? "".concat(T, ":").concat(X) : T, function(oe) {
            return j.forEach(function(Z) {
              return (!Z.condition || Z.condition(oe)) && r(X ? "".concat(X).concat(Z.name) : Z.name, d({
                items: l.elements,
                isDragging: f.isDragging
              }, oe));
            });
          });
        });
      }, x = 0, S = Object.entries(y); x < S.length; x++)
        w();
    }, Ie = function(u) {
      return u ? !Array.isArray(u) && (u instanceof HTMLElement || u instanceof SVGElement) ? [u] : E(u) : [];
    }, Bt = function(u, a) {
      u.style.left = "".concat(a.left, "px"), u.style.top = "".concat(a.top, "px"), u.style.width = "".concat(a.width, "px"), u.style.height = "".concat(a.height, "px");
    }, Zr = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, f = a.area, l = a.PS, y = a.zoom;
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
        }), this._zoom = y, this.PubSub = l, this.setArea(f), this._modificationCallback = it(function(w) {
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
          var r = function f(l) {
            var y, w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, x = (y = l[w]) === null || y === void 0 ? void 0 : y.parentNode;
            return x ? (l.push(x), w++, f(l, w)) : l;
          };
          return this._parentNodes = r([this.HTMLNode]), this._parentNodes;
        }
      }]), u;
    }(), Jr = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, f = a.DS, l = a.dragKeys, y = a.draggability, w = a.keyboardDrag, x = a.keyboardDragSpeed, S = a.useTransform, M = a.zoom;
        t(this, u), i(this, "_useTransform", void 0), i(this, "_prevCursorPos", void 0), i(this, "_prevScrollPos", void 0), i(this, "_elements", []), i(this, "_draggability", void 0), i(this, "_dragKeys", void 0), i(this, "_dragKeysFlat", void 0), i(this, "_keyboardDrag", void 0), i(this, "_keyboardDragSpeed", void 0), i(this, "_zoom", void 0), i(this, "keyboardDrag", function(D) {
          var T = D.event, j = D.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(j) || !r.DS.SelectedSet.size || !r._draggability || r.DS.continue)) {
            var X = {
              event: T,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:start:pre", "Interaction:start"], X), r._elements = r.DS.getSelection(), r.handleZIndex(!0);
            var oe = Yr({
              shiftKey: r.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: r._keyboardDragSpeed,
              zoom: r._zoom,
              key: j,
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
          var T = D.event, j = D.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(j) || !r.DS.SelectedSet.size || !r._draggability)) {
            var X = {
              event: T,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], X);
          }
        }), i(this, "start", function(D) {
          var T = D.isDragging, j = D.isDraggingKeyboard;
          !T || j || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), i(this, "stop", function(D) {
          D != null && D.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), i(this, "update", function(D) {
          var T = D.isDragging, j = D.isDraggingKeyboard;
          if (!(!T || !r._elements.length || j || r.DS.continue)) {
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
          r._elements.forEach(function(T) {
            return T.style.zIndex = "".concat((parseInt(T.style.zIndex) || 0) + D ? 9999 : -9998);
          });
        }), this.DS = f, this._useTransform = S, this._keyboardDragSpeed = x, this._keyboardDrag = w, this._zoom = M, this._draggability = y, this._dragKeys = {
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
        }, this._dragKeysFlat = [].concat(E(this._dragKeys.up), E(this._dragKeys.down), E(this._dragKeys.left), E(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return s(u, [{
        key: "_cursorDiff",
        get: function() {
          var r = this.DS.stores.PointerStore.currentVal, f = this._prevCursorPos ? U(r, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = r, f;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var r = this.DS.stores.ScrollStore.currentVal, f = this._prevScrollPos ? U(r, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = r, f;
        }
      }]), u;
    }(), Qr = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, f = a.DS, l = a.areaElement, y = a.draggability, w = a.immediateDrag, x = a.selectableClass;
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
          var M = S.target.closest(".".concat(r._selectableClass));
          return !r._draggability || r.DS.stores.KeyStore.isMultiSelectKeyPressed(S) || !M ? !1 : (r._immediateDrag && (r.DS.SelectedSet.size ? r.DS.SelectedSet.has(M) || (r.DS.SelectedSet.clear(), r.DS.SelectedSet.add(
            M
          )) : r.DS.SelectedSet.add(
            M
          )), !!r.DS.SelectedSet.has(M));
        }), i(this, "onClick", function(S) {
          var M = S.event;
          if (!!r._canInteract(M) && !(M.detail > 0)) {
            var D = r.DS, T = D.stores, j = T.PointerStore, X = T.KeyStore, oe = D.SelectableSet, Z = D.SelectedSet;
            j.start(M);
            var je = M.target;
            !oe.has(je) || (X.isMultiSelectKeyPressed(M) || Z.clear(), Z.toggle(je), r.reset());
          }
        }), i(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), i(this, "update", function(S) {
          var M = S.event, D = S.scroll_directions, T = S.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: M,
            scroll_directions: D,
            scroll_multiplier: T,
            isDragging: r.isDragging
          });
        }), i(this, "reset", function(S) {
          return r.DS.publish("Interaction:end:pre", {
            event: S,
            isDragging: r.isDragging
          });
        }), i(this, "_reset", function(S) {
          var M = r.isDragging;
          r.stop(), r.init(), r.DS.publish("Interaction:end", {
            event: S,
            isDragging: M
          });
        }), this._areaElement = l, this._draggability = y, this._immediateDrag = w, this._selectableClass = x, this.DS = f, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(S) {
          var M = S.event;
          return r.start(M);
        }), this.DS.subscribe("Interaction:start:pre", function(S) {
          var M = S.event;
          return r._start(M);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(S) {
          var M = S.event;
          return r._reset(M);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return s(u, [{
        key: "_canInteract",
        value: function(r) {
          var f = r.clientX === 0 && r.clientY === 0 && r.detail === 0 && r.target;
          return !(r.button === 2 || this.isInteracting || r.target && !this.DS.SelectorArea.isInside(
            r.target
          ) || !f && !this.DS.SelectorArea.isClicked(r));
        }
      }]), u;
    }(), ei = function u(a) {
      var r = this, f = a.DS;
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
      }), this.DS = f;
    }, ti = /* @__PURE__ */ function(u) {
      g(r, u);
      var a = K(r);
      function r(f) {
        var l, y = f.elements, w = f.className, x = f.hoverClassName, S = f.draggability, M = f.useTransform, D = f.DS;
        return t(this, r), l = a.call(this), i(I(l), "_initElements", void 0), i(I(l), "_className", void 0), i(I(l), "_hoverClassName", void 0), i(I(l), "_useTransform", void 0), i(I(l), "_draggability", void 0), i(I(l), "init", function() {
          return l._initElements.forEach(function(T) {
            return l.add(T);
          });
        }), i(I(l), "clear", function() {
          return l.forEach(function(T) {
            return l.delete(T);
          });
        }), i(I(l), "_onClick", function(T) {
          return l.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: T
          });
        }), i(I(l), "_onPointer", function(T) {
          return l.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: T
          });
        }), i(I(l), "addAll", function(T) {
          return T.forEach(function(j) {
            return l.add(j);
          });
        }), i(I(l), "deleteAll", function(T) {
          return T.forEach(function(j) {
            return l.delete(j);
          });
        }), l.DS = D, l._initElements = Ie(y), l._className = w, l._hoverClassName = x, l._useTransform = M, l._draggability = S, l.DS.subscribe("Interaction:init", l.init), l;
      }
      return s(r, [{
        key: "add",
        value: function(l) {
          return l.classList.add(this._className), l.addEventListener("click", this._onClick), l.addEventListener("mousedown", this._onPointer), l.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Vt({
            computedStyle: window.getComputedStyle(l),
            node: l
          }), C(v(r.prototype), "add", this).call(this, l);
        }
      }, {
        key: "delete",
        value: function(l) {
          return l.classList.remove(this._className), l.classList.remove(this._hoverClassName), l.removeEventListener("click", this._onClick), l.removeEventListener("mousedown", this._onPointer), l.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), C(v(r.prototype), "delete", this).call(this, l);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ P(Set)), ri = /* @__PURE__ */ function(u) {
      g(r, u);
      var a = K(r);
      function r(f) {
        var l, y = f.className, w = f.DS;
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
          if (!C(v(r.prototype), "has", this).call(this, l)) {
            var y = {
              items: this.elements,
              item: l
            };
            return this.DS.publish("Selected:added:pre", y), C(v(r.prototype), "add", this).call(this, l), l.classList.add(this._className), l.style.zIndex = "".concat((parseInt(l.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", y), this;
          }
        }
      }, {
        key: "delete",
        value: function(l) {
          if (!!C(v(r.prototype), "has", this).call(this, l)) {
            var y = {
              items: this.elements,
              item: l
            };
            this.DS.publish("Selected:removed:pre", y);
            var w = C(v(r.prototype), "delete", this).call(this, l);
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
    }(/* @__PURE__ */ P(Set)), ii = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, f = a.DS, l = a.hoverClassName, y = a.multiSelectToggling;
        t(this, u), i(this, "_prevSelectedSet", void 0), i(this, "_hoverClassName", void 0), i(this, "_multiSelectToggling", void 0), i(this, "start", function(w) {
          var x = w.event, S = w.isDragging;
          S || (r._storePrevious(x), r._handleInsideSelection(!0, x));
        }), i(this, "update", function(w) {
          var x = w.isDragging;
          x || r.DS.continue || r._handleInsideSelection();
        }), i(this, "_handleInsideSelection", function(w, x) {
          for (var S = r.DS, M = S.SelectableSet, D = S.SelectorArea, T = S.Selector, j = M.elements.map(function(xe) {
            return [xe, xe.getBoundingClientRect()];
          }), X = [], oe = [], Z = 0, je = j.length; Z < je; Z++)
            !D.isInside(j[Z][0], j[Z][1]) || (ft(j[Z][1], T.rect) ? X.push(j[Z][0]) : oe.push(j[Z][0]));
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
        }), this._hoverClassName = l, this._multiSelectToggling = y, this.DS = f, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return s(u, [{
        key: "_storePrevious",
        value: function(r) {
          var f = this.DS, l = f.stores.KeyStore, y = f.SelectedSet;
          l.isMultiSelectKeyPressed(r) ? this._prevSelectedSet = new Set(y) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), u;
    }(), ni = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, f = a.DS, l = a.selector, y = a.selectorClass, w = a.customStyles;
        t(this, u), i(this, "_rect", void 0), i(this, "start", function(x) {
          var S = x.isDragging;
          if (!S) {
            var M = r.DS.stores.PointerStore, D = M.initialValArea;
            Bt(r.HTMLNode, he(D, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), i(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), i(this, "update", function(x) {
          var S = x.isDragging;
          if (!(S || r.DS.continue)) {
            var M = r.DS.stores, D = M.ScrollStore, T = M.PointerStore, j = Br({
              scrollAmount: D.scrollAmount,
              initialPointerPos: T.initialValArea,
              pointerPos: T.currentValArea
            });
            Bt(r.HTMLNode, j), r._rect = null;
          }
        }), this.DS = f, this.HTMLNode = l || rt(w), this.HTMLNode.classList.add(y), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return s(u, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), u;
    }(), oi = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, f = a.DS, l = a.selectorAreaClass, y = a.autoScrollSpeed, w = a.overflowTolerance;
        t(this, u), i(this, "_autoScrollSpeed", void 0), i(this, "_scrollInterval", void 0), i(this, "_rect", void 0), i(this, "currentEdges", []), i(this, "_overflowTolerance", void 0), i(this, "start", function() {
          return r.applyElements("append");
        }), i(this, "applyElements", function() {
          var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", S = document.body ? "body" : "documentElement", M = "".concat(x, "Child");
          r.HTMLNode[M](r.DS.Selector.HTMLNode), document[S][M](r.HTMLNode);
        }), i(this, "updatePos", function() {
          r._rect = null;
          var x = r.DS.Area.rect, S = r.DS.Area.computedBorder, M = r.HTMLNode.style, D = "".concat(x.top + S.top, "px"), T = "".concat(x.left + S.left, "px"), j = "".concat(x.width, "px"), X = "".concat(x.height, "px");
          M.top !== D && (M.top = D), M.left !== T && (M.left = T), M.width !== j && (M.width = j), M.height !== X && (M.height = X);
        }), i(this, "stop", function(x) {
          r.stopAutoScroll(), x && r.applyElements("remove");
        }), i(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), i(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var x = r.DS, S = x.stores.PointerStore, M = x.Area;
            r.currentEdges = Nt({
              elementRect: he(S.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && M.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), i(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), i(this, "isInside", function(x, S) {
          return r.DS.Area.HTMLNode.contains(x) && r.DS.stores.ScrollStore.canScroll ? !0 : ft(r.rect, S || x.getBoundingClientRect());
        }), this._autoScrollSpeed = y, this._overflowTolerance = w, this.DS = f, this.HTMLNode = tt(l), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          r.updatePos(), r.stopAutoScroll();
        });
      }
      return s(u, [{
        key: "isClicked",
        value: function(r) {
          var f = this.DS.stores.PointerStore, l = r ? f.getPointerPosition(r) : f.initialVal;
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
        var r = this, f = a.DS, l = a.multiSelectKeys, y = a.multiSelectMode;
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
        }), this.DS = f, this._multiSelectMode = y, this._multiSelectKeys = l.map(function(w) {
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
          var f = this;
          return !!(this._multiSelectMode || this.currentValues.some(function(l) {
            return f._multiSelectKeys.includes(l);
          }) || r && this._multiSelectKeys.some(function(l) {
            return r[f._keyMapping[l]];
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
        var r = this, f = a.DS;
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
        }), this.DS = f, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(l) {
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
        var r = this, f = a.DS, l = a.areaElement, y = a.zoom;
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
        }), this._areaElement = l, this.DS = f, this.zoom = y, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
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
          var r = U(this.currentVal, "-", this.initialVal), f = Te(this.zoom), l = U(U(r, "*", f), "-", r);
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
        var r = this, f = a.area, l = f === void 0 ? document : f, y = a.selectables, w = y === void 0 ? [] : y, x = a.autoScrollSpeed, S = x === void 0 ? 5 : x, M = a.overflowTolerance, D = M === void 0 ? {
          x: 25,
          y: 25
        } : M, T = a.zoom, j = T === void 0 ? 1 : T, X = a.customStyles, oe = X === void 0 ? !1 : X, Z = a.multiSelectMode, je = Z === void 0 ? !1 : Z, nt = a.multiSelectToggling, xe = nt === void 0 ? !0 : nt, Rt = a.multiSelectKeys, ui = Rt === void 0 ? ["Control", "Shift", "Meta"] : Rt, Ht = a.selector, di = Ht === void 0 ? void 0 : Ht, Kt = a.draggability, mt = Kt === void 0 ? !0 : Kt, Ut = a.immediateDrag, hi = Ut === void 0 ? !0 : Ut, Yt = a.keyboardDrag, fi = Yt === void 0 ? !0 : Yt, mi = a.dragKeys, Wt = a.keyboardDragSpeed, pi = Wt === void 0 ? 10 : Wt, Xt = a.useTransform, Ft = Xt === void 0 ? !0 : Xt, qt = a.hoverClass, Gt = qt === void 0 ? "ds-hover" : qt, Zt = a.selectableClass, Jt = Zt === void 0 ? "ds-selectable" : Zt, Qt = a.selectedClass, gi = Qt === void 0 ? "ds-selected" : Qt, er = a.selectorClass, vi = er === void 0 ? "ds-selector" : er, tr = a.selectorAreaClass, bi = tr === void 0 ? "ds-selector-area" : tr, yi = a.callback, wi = a.onDragMove, xi = a.onDragStartBegin, _i = a.onDragStart, Si = a.onElementSelect, ki = a.onElementUnselect;
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
            zoom: j
          }),
          KeyStore: new ai({
            DS: this,
            multiSelectKeys: ui,
            multiSelectMode: je
          })
        }, this.Area = new Zr({
          area: l,
          PS: this.PubSub,
          zoom: j
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
          className: gi
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
          zoom: j,
          keyboardDragSpeed: pi
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
          var f = r.callback, l = r.onDragMove, y = r.onDragStart, w = r.onDragStartBegin, x = r.onElementSelect, S = r.onElementUnselect, M = function(T, j) {
            return console.warn("[DragSelect] ".concat(T, ' is deprecated. Use DragSelect.subscribe("').concat(j, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          f && (M("callback", "callback"), this.subscribe("callback", function(D) {
            var T = D.items;
            D.item;
            var j = D.event;
            return f(T, j);
          })), l && (M("onDragMove", "dragmove"), this.subscribe("dragmove", function(D) {
            D.items, D.item;
            var T = D.event;
            return l(T);
          })), y && (M("onDragStart", "dragstart"), this.subscribe("dragstart", function(D) {
            D.items, D.item;
            var T = D.event;
            return y(T);
          })), w && (M("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(D) {
            D.items, D.item;
            var T = D.event;
            return w(T);
          })), x && (M("onElementSelect", "elementselect"), this.subscribe("elementselect", function(D) {
            D.items;
            var T = D.item, j = D.event;
            return x(T, j);
          })), S && (M("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(D) {
            D.items;
            var T = D.item, j = D.event;
            return S(T, j);
          }));
        }
      }, {
        key: "stop",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          l && this.publish("callback", {
            items: this.getSelection()
          }), this.Interaction.stop(), this.Area.stop(), this.Drag.stop(), this.Selector.stop(), this.SelectorArea.stop(r), this.stores.KeyStore.stop(), this.stores.PointerStore.stop(), this.stores.ScrollStore.stop(), r && this.SelectableSet.clear(), f && this.SelectedSet.clear(), this.stopped = !0;
        }
      }, {
        key: "addSelection",
        value: function(r) {
          var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.addAll(Ie(r)), l || this.addSelectables(r), f && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(r) {
          var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(Ie(r)), l && this.removeSelectables(r), f && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(r) {
          var f = this, l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return Ie(r).forEach(function(w) {
            return f.SelectedSet.has(w) ? f.removeSelection(r, l, y) : f.addSelection(r, l, y);
          }), l && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "setSelection",
        value: function(r) {
          var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.clearSelection(), this.addSelection(r, f, l), this.getSelection();
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
          var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = Ie(r);
          return this.SelectableSet.addAll(l), f && this.SelectedSet.addAll(l), r;
        }
      }, {
        key: "setSelectables",
        value: function(r) {
          var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.removeSelectables(r, f), this.addSelectables(r, l);
        }
      }, {
        key: "removeSelectables",
        value: function(r) {
          var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return this.SelectableSet.deleteAll(Ie(r)), f && this.removeSelection(r), r;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var l = f ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), y = r ? f ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : f ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
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
}, un = /* @__PURE__ */ h("path", {
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
}, fn = /* @__PURE__ */ h("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), mn = [
  fn
], pn = {
  name: "VFSortIcon"
}, vt = /* @__PURE__ */ Object.assign(pn, {
  props: { direction: String },
  setup(o) {
    return (e, t) => (k(), $("div", null, [
      o.direction == "down" ? (k(), $("svg", cn, dn)) : le("", !0),
      o.direction == "up" ? (k(), $("svg", hn, mn)) : le("", !0)
    ]));
  }
}), gn = { class: "relative h-full" }, vn = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, bn = /* @__PURE__ */ Re(" Name "), yn = /* @__PURE__ */ Re(" Size "), wn = /* @__PURE__ */ Re(" Date "), xn = { class: "absolute" }, _n = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ h("path", {
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
}, $n = /* @__PURE__ */ h("path", {
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
}, Tn = /* @__PURE__ */ h("path", {
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
}, zn = /* @__PURE__ */ h("path", {
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
}, Hn = /* @__PURE__ */ h("path", {
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
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = (C) => C == null ? void 0 : C.substring(0, 3), i = (C) => C.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), c = N(null), d = N(null), g = N(0), v = N(null), m = (C) => {
      C.type == "dir" ? t.emit("vf-fetch", { q: "index", adapter: e.data.adapter, path: C.path }) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: C });
    }, p = lt({ active: !1, column: "", order: "" }), b = (C = !0) => {
      let z = [...e.data.files], E = p.column, _ = p.order == "asc" ? 1 : -1;
      if (!C)
        return z;
      const O = (H, q) => typeof H == "string" && typeof q == "string" ? H.toLowerCase().localeCompare(q.toLowerCase()) : H < q ? -1 : H > q ? 1 : 0;
      return p.active && (z = z.slice().sort((H, q) => O(H[E], q[E]) * _)), z;
    }, A = (C) => {
      p.active && p.column == C ? (p.active = p.order == "asc", p.column = C, p.order = "desc") : (p.active = !0, p.column = C, p.order = "asc");
    }, P = () => v.value.getSelection().map((C) => JSON.parse(C.dataset.item)), I = (C, z) => {
      if (C.altKey || C.ctrlKey || C.metaKey)
        return C.preventDefault(), !1;
      C.dataTransfer.setDragImage(d.value, 0, 15), C.dataTransfer.effectAllowed = "all", C.dataTransfer.dropEffect = "copy", C.dataTransfer.setData("items", JSON.stringify(P()));
    }, L = (C, z) => {
      C.preventDefault();
      let E = JSON.parse(C.dataTransfer.getData("items"));
      if (E.find((_) => _.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: E, to: z } });
    }, K = (C, z) => {
      C.preventDefault(), !z || z.type !== "dir" || v.value.getSelection().find((E) => E == C.currentTarget) ? (C.dataTransfer.dropEffect = "none", C.dataTransfer.effectAllowed = "none") : C.dataTransfer.dropEffect = "copy";
    };
    return me(() => {
      v.value = new an({
        area: c.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => At(() => {
        v.value.clearSelection(), v.value.setSelectables(document.getElementsByClassName("vf-item"));
      })), v.value.subscribe("predragstart", ({ event: C, isDragging: z }) => {
        if (z)
          g.value = v.value.getSelection().length, v.value.break();
        else {
          const E = C.target.offsetWidth - C.offsetX, _ = C.target.offsetHeight - C.offsetY;
          E < 15 && _ < 15 && (v.value.clearSelection(), v.value.break());
        }
      }), v.value.subscribe("predragmove", ({ isDragging: C }) => {
        C && v.value.break();
      }), v.value.subscribe("callback", ({ items: C, event: z, isDragging: E }) => {
        t.emit("vf-nodes-selected", P()), g.value = v.value.getSelection().length;
      });
    }), me(() => {
      _r(() => e.view, () => t.emit("vf-explorer-update"));
    }), (C, z) => (k(), $("div", gn, [
      o.view == "list" ? (k(), $("div", vn, [
        h("div", {
          onClick: z[0] || (z[0] = (E) => A("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center pl-1"
        }, [
          bn,
          ye(Se(vt, {
            direction: p.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [pt, p.active && p.column == "basename"]
          ])
        ]),
        h("div", {
          onClick: z[1] || (z[1] = (E) => A("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          yn,
          ye(Se(vt, {
            direction: p.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [pt, p.active && p.column == "file_size"]
          ])
        ]),
        h("div", {
          onClick: z[2] || (z[2] = (E) => A("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center"
        }, [
          wn,
          ye(Se(vt, {
            direction: p.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [pt, p.active && p.column == "last_modified"]
          ])
        ])
      ])) : le("", !0),
      h("div", xn, [
        h("div", {
          ref: (E) => d.value = E,
          class: "absolute -z-50"
        }, [
          _n,
          h("div", Sn, B(g.value), 1)
        ], 512)
      ]),
      h("div", {
        class: "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto resize-y p-1 z-0",
        ref: (E) => c.value = E,
        onContextmenu: z[3] || (z[3] = qe((E) => R(t).emit("vf-contextmenu-show", { event: E, area: c.value, items: P() }), ["self", "prevent"]))
      }, [
        o.view == "list" ? (k(!0), $(re, { key: 0 }, pe(b(), (E, _) => (k(), $("div", {
          draggable: "true",
          onDblclick: (O) => m(E),
          onContextmenu: qe((O) => R(t).emit("vf-contextmenu-show", { event: O, area: c.value, items: P(), target: E }), ["prevent"]),
          onDragstart: (O) => I(O),
          onDragover: (O) => K(O, E),
          onDrop: (O) => L(O, E),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": E.type,
          "data-item": JSON.stringify(E),
          "data-index": _
        }, [
          h("div", Dn, [
            h("div", Cn, [
              E.type == "dir" ? (k(), $("svg", Mn, En)) : (k(), $("svg", An, Pn)),
              h("span", On, B(E.basename), 1)
            ]),
            h("div", In, B(E.file_size ? R(sn)(E.file_size) : ""), 1),
            h("div", jn, B(R(ln)(E.last_modified)), 1)
          ])
        ], 40, kn))), 256)) : le("", !0),
        o.view == "grid" ? (k(!0), $(re, { key: 1 }, pe(b(!1), (E, _) => (k(), $("div", {
          draggable: "true",
          onDblclick: (O) => m(E),
          onContextmenu: qe((O) => R(t).emit("vf-contextmenu-show", { event: O, area: c.value, items: P(), target: E }), ["prevent"]),
          onDragstart: (O) => I(O),
          onDragover: (O) => K(O, E),
          onDrop: (O) => L(O, E),
          class: "vf-item border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none",
          "data-type": E.type,
          "data-item": JSON.stringify(E),
          "data-index": _
        }, [
          h("div", null, [
            h("div", Ln, [
              E.type == "dir" ? (k(), $("svg", Vn, Bn)) : (k(), $("svg", Rn, Kn)),
              h("div", Un, B(s(E.extension)), 1)
            ]),
            h("span", Yn, B(i(E.basename)), 1)
          ])
        ], 40, Nn))), 256)) : le("", !0)
      ], 544)
    ]));
  }
}), Fn = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, qn = { class: "flex leading-5 items-center" }, Gn = /* @__PURE__ */ h("div", {
  class: "mx-2",
  "aria-label": "Storage",
  "data-microtip-position": "top",
  role: "tooltip"
}, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-5 w-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "1"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    })
  ])
], -1), Zn = ["value"], Jn = { class: "ml-3" }, Qn = { class: "flex leading-5 items-center" }, eo = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ h("path", {
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
    var g;
    const e = o, t = inject("emitter"), { getStore: n, setStore: s } = inject("storage"), i = N(0), c = N((g = n("adapter")) != null ? g : e.data.adapter), d = () => {
      t.emit("vf-fetch", { q: "index", adapter: c.value }), s("adapter", c.value);
    };
    return t.on("vf-nodes-selected", (v) => {
      i.value = v.length;
    }), (v, m) => (k(), $("div", Fn, [
      h("div", qn, [
        Gn,
        ye(h("select", {
          "onUpdate:modelValue": m[0] || (m[0] = (p) => c.value = p),
          onChange: d,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (k(!0), $(re, null, pe(o.data.storages, (p) => (k(), $("option", { value: p }, B(p), 9, Zn))), 256))
        ], 544), [
          [Ci, c.value]
        ]),
        h("span", Jn, B(i.value > 0 ? i.value + " items selected." : ""), 1)
      ]),
      h("div", Qn, [
        h("span", {
          onClick: m[1] || (m[1] = (p) => R(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: "Vuefinder is a file manager component for vue 3." }))
        }, to)
      ])
    ]));
  }
}), no = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none" }, oo = /* @__PURE__ */ h("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), ao = [
  oo
], so = { class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full" }, lo = /* @__PURE__ */ h("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), co = [
  lo
], uo = { class: "flex leading-5" }, ho = /* @__PURE__ */ h("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), fo = ["title", "onClick"], mo = {
  name: "VFBreadcrumb"
}, po = /* @__PURE__ */ Object.assign(mo, {
  props: {
    data: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = N(null), i = N([]);
    t.on("vf-explorer-update", (g) => {
      var p;
      let v = [], m = [];
      s.value = (p = e.data.dirname) != null ? p : n("adapter", "local") + "://", s.value.length == 0 && (i.value = []), s.value.replace(n("adapter", "local") + "://", "").split("/").forEach(function(b) {
        v.push(b), v.join("/") != "" && m.push({
          basename: b,
          name: b,
          path: n("adapter", "local") + "://" + v.join("/"),
          type: "dir"
        });
      }), m.length > 4 && (m = m.slice(-5), m[0].name = ".."), i.value = m;
    });
    const c = (g) => {
      var m;
      g.preventDefault();
      let v = JSON.parse(g.dataTransfer.getData("items"));
      if (v.find((p) => p.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: v, to: (m = i.value[i.value.length - 2]) != null ? m : { path: n("adapter", "local") + "://" } }
      });
    }, d = (g) => {
      g.preventDefault(), i.value.length < 1 ? (g.dataTransfer.dropEffect = "none", g.dataTransfer.effectAllowed = "none") : g.dataTransfer.dropEffect = "copy";
    };
    return (g, v) => (k(), $("div", no, [
      (k(), $("svg", {
        onDragover: v[0] || (v[0] = (m) => d(m)),
        onDrop: v[1] || (v[1] = (m) => c(m)),
        onClick: v[2] || (v[2] = (m) => {
          var p, b;
          return !i.value.length || R(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: (b = (p = i.value[i.value.length - 2]) == null ? void 0 : p.path) != null ? b : R(n)("adapter", "local") + "://" });
        }),
        class: $e(["h-6 w-6 p-0.5 rounded", i.value.length ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, ao, 34)),
      h("div", so, [
        (k(), $("svg", {
          onClick: v[3] || (v[3] = (m) => R(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, co)),
        h("div", uo, [
          (k(!0), $(re, null, pe(i.value, (m, p) => (k(), $("div", { key: p }, [
            ho,
            h("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: m.basename,
              onClick: (b) => R(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: m.path })
            }, B(m.name), 9, fo)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Ae = (o) => Object.entries(o).map((e) => e.map(encodeURIComponent).join("=")).join("&"), go = ["onClick"], vo = /* @__PURE__ */ h("span", { class: "px-1" }, null, -1), bo = {
  name: "VFContextMenu"
}, yo = /* @__PURE__ */ Object.assign(bo, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), n = N(null), { apiUrl: s } = we(), i = lt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), c = N([]);
    t.on("vf-context-selected", (m) => {
      c.value = m;
    });
    const d = {
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
    }, g = (m) => {
      t.emit("vf-contextmenu-hide"), m.action();
    };
    t.on("vf-contextmenu-show", ({ event: m, area: p, items: b, target: A = null }) => {
      i.items = [], A ? b.length > 1 && b.some((P) => P.path === A.path) ? (i.items.push(d.refresh), i.items.push(d.archive), i.items.push(d.delete), t.emit("vf-context-selected", b), console.log(b.length + " selected (more than 1 item.)")) : (i.items.push(d.preview), i.items.push(d.rename), i.items.push(d.download), A.mime_type == "application/zip" ? i.items.push(d.unarchive) : i.items.push(d.archive), i.items.push(d.delete), t.emit("vf-context-selected", [A]), console.log(A.type + " is selected")) : (i.items.push(d.refresh), i.items.push(d.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")), v(m, p);
    }), t.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const v = (m, p) => {
      i.active = !0, At(() => {
        let b = p.getBoundingClientRect(), A = m.pageX, P = m.pageY, I = n.value.offsetHeight, L = n.value.offsetWidth;
        A = b.right - m.pageX + window.scrollX < L ? A - L : A, P = b.bottom - m.pageY + window.scrollY < I ? P - I : P, i.positions = {
          left: A + "px",
          top: P + "px"
        };
      });
    };
    return (m, p) => i.active ? (k(), $("ul", {
      key: 0,
      class: "absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref: (b) => n.value = b,
      style: Mi(i.positions)
    }, [
      (k(!0), $(re, null, pe(i.items, (b) => (k(), $("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: b.title,
        onClick: (A) => g(b)
      }, [
        vo,
        h("span", null, B(b.title), 1)
      ], 8, go))), 128))
    ], 4)) : le("", !0);
  }
}), wo = /* @__PURE__ */ h("iframe", {
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
    const d = lt({ adapter: "local", storages: [], dirname: ".", files: [] }), g = N(s("viewport", "grid")), v = N(s("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      v.value = !v.value, n("darkMode", v.value);
    }), t.on("vf-view-toggle", (b) => {
      g.value = b;
    });
    const m = lt({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      m.active = !1;
    }), t.on("vf-modal-show", (b) => {
      m.active = !0, m.type = b.type, m.data = b;
    });
    const p = (b) => {
      Object.assign(d, b), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update", b);
    };
    return t.on("vf-fetch", (b) => {
      ct(i.value, { params: b }).then((A) => {
        t.emit("vf-modal-close"), p(A);
      });
    }), t.on("vf-download", (b) => {
      document.getElementById("download_frame").src = b, t.emit("vf-modal-close");
    }), me(() => {
      t.emit("vf-fetch", { q: "index", adapter: s("adapter", d.adapter) });
    }), (b, A) => (k(), $("div", {
      class: $e(v.value ? "dark" : "")
    }, [
      h("div", {
        class: "relative border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none",
        onMousedown: A[0] || (A[0] = (P) => R(t).emit("vf-contextmenu-hide"))
      }, [
        Se(nn),
        Se(po, { data: d }, null, 8, ["data"]),
        Se(Xn, {
          view: g.value,
          data: d
        }, null, 8, ["view", "data"]),
        Se(io, { data: d }, null, 8, ["data"])
      ], 32),
      m.active ? (k(), te($i("v-f-modal-" + m.type), {
        key: 0,
        selection: m.data,
        current: d
      }, null, 8, ["selection", "current"])) : le("", !0),
      Se(yo, { current: d }, null, 8, ["current"]),
      wo
    ], 2));
  }
}), So = /* @__PURE__ */ h("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), ko = { class: "fixed z-10 inset-0 overflow-y-auto" }, Do = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, Co = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Mo = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, ve = {
  __name: "ModalLayout",
  setup(o) {
    const e = inject("emitter");
    return me(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, n) => (k(), $("div", {
      class: "v-f-modal relative z-20",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: n[1] || (n[1] = Qe((s) => R(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      So,
      h("div", ko, [
        h("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = qe((s) => R(e).emit("vf-modal-close"), ["self"]))
        }, [
          h("div", Do, [
            h("div", Co, [
              ir(t.$slots, "default")
            ]),
            h("div", Mo, [
              ir(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, $o = { class: "sm:flex sm:items-start" }, Eo = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Ao = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, To = /* @__PURE__ */ h("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Delete files", -1), Po = { class: "mt-2" }, Oo = /* @__PURE__ */ h("p", { class: "text-sm text-gray-500" }, "Are you sure you want to delete these files?", -1), Io = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, jo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, No = /* @__PURE__ */ h("path", {
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
}, zo = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Bo = [
  zo
], Ro = { class: "ml-1.5" }, Ho = /* @__PURE__ */ h("div", { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, "This action cannot be undone.", -1), Ko = {
  name: "VFModalDelete"
}, Uo = /* @__PURE__ */ Object.assign(Ko, {
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
        items: JSON.stringify(s.value.map(({ path: c, type: d }) => ({ path: c, type: d })))
      });
    };
    return (c, d) => (k(), te(ve, null, {
      buttons: Q(() => [
        h("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, delete!"),
        h("button", {
          type: "button",
          onClick: d[0] || (d[0] = (g) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel"),
        Ho
      ]),
      default: Q(() => [
        h("div", $o, [
          Eo,
          h("div", Ao, [
            To,
            h("div", Po, [
              Oo,
              (k(!0), $(re, null, pe(s.value, (g) => (k(), $("p", Io, [
                g.type == "dir" ? (k(), $("svg", jo, Lo)) : (k(), $("svg", Vo, Bo)),
                h("span", Ro, B(g.basename), 1)
              ]))), 256))
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Yo = { class: "sm:flex sm:items-start" }, Wo = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), Xo = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Fo = {
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
        h("button", {
          type: "button",
          onClick: n[0] || (n[0] = (s) => R(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close")
      ]),
      default: Q(() => {
        var s, i, c, d;
        return [
          h("div", Yo, [
            Wo,
            h("div", Xo, [
              h("h3", Fo, B((i = (s = o.selection) == null ? void 0 : s.title) != null ? i : "Title"), 1),
              h("div", qo, [
                h("p", Go, B((d = (c = o.selection) == null ? void 0 : c.message) != null ? d : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), Qo = { class: "sm:flex sm:items-start" }, ea = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), ta = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ra = /* @__PURE__ */ h("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New Folder", -1), ia = { class: "mt-2" }, na = /* @__PURE__ */ h("p", { class: "text-sm text-gray-500" }, "Create a new folder", -1), oa = ["onKeyup"], aa = {
  name: "VFModalNewFolder"
}, sa = /* @__PURE__ */ Object.assign(aa, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = N(""), i = () => {
      s.value != "" && t.emit("vf-fetch", {
        q: "newfolder",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: s.value
      });
    };
    return (c, d) => (k(), te(ve, null, {
      buttons: Q(() => [
        h("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        h("button", {
          type: "button",
          onClick: d[1] || (d[1] = (g) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        h("div", Qo, [
          ea,
          h("div", ta, [
            ra,
            h("div", ia, [
              na,
              ye(h("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (g) => s.value = g),
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
}), la = { class: "sm:flex sm:items-start" }, ca = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), ua = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, da = /* @__PURE__ */ h("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New File", -1), ha = { class: "mt-2" }, fa = /* @__PURE__ */ h("p", { class: "text-sm text-gray-500" }, "Create a new file", -1), ma = ["onKeyup"], pa = {
  name: "VFModalNewFile"
}, ga = /* @__PURE__ */ Object.assign(pa, {
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
    return (c, d) => (k(), te(ve, null, {
      buttons: Q(() => [
        h("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        h("button", {
          type: "button",
          onClick: d[1] || (d[1] = (g) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        h("div", la, [
          ca,
          h("div", ua, [
            da,
            h("div", ha, [
              fa,
              ye(h("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (g) => s.value = g),
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
    const t = o, n = N(""), s = N(""), i = N(null), c = N(!1), { apiUrl: d } = we();
    me(() => {
      ct(d.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((m) => {
        n.value = m, e("load");
      });
    });
    const g = () => {
      c.value = !c.value, s.value = n.value, c.value == !0 && At(() => {
        i.value.focus();
      });
    }, v = () => {
      ct(d.value, {
        method: "POST",
        params: { q: "save", adapter: t.selection.adapter, path: t.selection.item.path, content: s.value },
        json: !1
      }).then((m) => {
        n.value = m, e("load"), c.value = !c.value;
      }).catch((m) => console.log(m.statusText));
    };
    return (m, p) => (k(), $(re, null, [
      h("div", va, [
        h("div", ba, B(o.selection.item.basename), 1),
        h("div", ya, [
          c.value ? (k(), $("button", {
            key: 0,
            onClick: v,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Save")) : le("", !0),
          h("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: p[0] || (p[0] = (b) => g())
          }, B(c.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      h("div", null, [
        c.value ? (k(), $("div", xa, [
          ye(h("textarea", {
            ref: (b) => i.value = b,
            "onUpdate:modelValue": p[1] || (p[1] = (b) => s.value = b),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [et, s.value]
          ])
        ])) : (k(), $("pre", wa, B(n.value), 1))
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
var dt = typeof window < "u" && typeof window.document < "u", ge = dt ? window : {}, Tt = dt && ge.document.documentElement ? "ontouchstart" in ge.document.documentElement : !1, Pt = dt ? "PointerEvent" in ge : !1, Y = "cropper", Ot = "all", Cr = "crop", Mr = "move", $r = "zoom", Ce = "e", Me = "w", Ne = "s", _e = "n", Ye = "ne", We = "nw", Xe = "se", Fe = "sw", _t = "".concat(Y, "-crop"), lr = "".concat(Y, "-disabled"), ne = "".concat(Y, "-hidden"), cr = "".concat(Y, "-hide"), Aa = "".concat(Y, "-invisible"), ut = "".concat(Y, "-modal"), St = "".concat(Y, "-move"), Ze = "".concat(Y, "Action"), ot = "".concat(Y, "Preview"), It = "crop", Er = "move", Ar = "none", kt = "crop", Dt = "cropend", Ct = "cropmove", Mt = "cropstart", ur = "dblclick", Ta = Tt ? "touchstart" : "mousedown", Pa = Tt ? "touchmove" : "mousemove", Oa = Tt ? "touchend touchcancel" : "mouseup", dr = Pt ? "pointerdown" : Ta, hr = Pt ? "pointermove" : Pa, fr = Pt ? "pointerup pointercancel" : Oa, mr = "ready", pr = "resize", gr = "wheel", $t = "zoom", vr = "image/jpeg", Ia = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, ja = /^data:/, Na = /^data:image\/jpeg;base64,/, La = /^img|canvas$/i, Tr = 200, Pr = 100, br = {
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
}, Va = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', za = Number.isNaN || ge.isNaN;
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
function ke(o, e) {
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
    ge.addEventListener("test", t, n), ge.removeEventListener("test", t, n);
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
function se(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, s = t;
  e.trim().split(Ir).forEach(function(i) {
    if (n.once && !jr) {
      var c = o.listeners, d = c === void 0 ? {} : c;
      s = function() {
        delete d[i][t], o.removeEventListener(i, s, n);
        for (var v = arguments.length, m = new Array(v), p = 0; p < v; p++)
          m[p] = arguments[p];
        t.apply(o, m);
      }, d[i] || (d[i] = {}), d[i][t] && o.removeEventListener(i, d[i][t], n), d[i][t] = s, o.listeners = d;
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
var yt = ge.location, Xa = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
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
  var d = c.length ? c.join(" ") : "none";
  return {
    WebkitTransform: d,
    msTransform: d,
    transform: d
  };
}
function Fa(o) {
  var e = kr({}, o), t = 0;
  return J(o, function(n, s) {
    delete e[s], J(e, function(i) {
      var c = Math.abs(n.startX - i.startX), d = Math.abs(n.startY - i.startY), g = Math.abs(n.endX - i.endX), v = Math.abs(n.endY - i.endY), m = Math.sqrt(c * c + d * d), p = Math.sqrt(g * g + v * v), b = (p - m) / m;
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
function De(o) {
  var e = o.aspectRatio, t = o.height, n = o.width, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", i = yr(n), c = yr(t);
  if (i && c) {
    var d = t * e;
    s === "contain" && d > n || s === "cover" && d < n ? t = n / e : n = t * e;
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
  var s = n % 90 * Math.PI / 180, i = Math.sin(s), c = Math.cos(s), d = e * c + t * i, g = e * i + t * c;
  return n > 90 ? {
    width: g,
    height: d
  } : {
    width: d,
    height: g
  };
}
function Za(o, e, t, n) {
  var s = e.aspectRatio, i = e.naturalWidth, c = e.naturalHeight, d = e.rotate, g = d === void 0 ? 0 : d, v = e.scaleX, m = v === void 0 ? 1 : v, p = e.scaleY, b = p === void 0 ? 1 : p, A = t.aspectRatio, P = t.naturalWidth, I = t.naturalHeight, L = n.fillColor, K = L === void 0 ? "transparent" : L, F = n.imageSmoothingEnabled, C = F === void 0 ? !0 : F, z = n.imageSmoothingQuality, E = z === void 0 ? "low" : z, _ = n.maxWidth, O = _ === void 0 ? 1 / 0 : _, H = n.maxHeight, q = H === void 0 ? 1 / 0 : H, ae = n.minWidth, ce = ae === void 0 ? 0 : ae, be = n.minHeight, de = be === void 0 ? 0 : be, U = document.createElement("canvas"), G = U.getContext("2d"), he = De({
    aspectRatio: A,
    width: O,
    height: q
  }), Te = De({
    aspectRatio: A,
    width: ce,
    height: de
  }, "cover"), He = Math.min(he.width, Math.max(Te.width, P)), Ke = Math.min(he.height, Math.max(Te.height, I)), tt = De({
    aspectRatio: s,
    width: O,
    height: q
  }), rt = De({
    aspectRatio: s,
    width: ce,
    height: de
  }, "cover"), it = Math.min(tt.width, Math.max(rt.width, i)), Pe = Math.min(tt.height, Math.max(rt.height, c)), ht = [-it / 2, -Pe / 2, it, Pe];
  return U.width = ze(He), U.height = ze(Ke), G.fillStyle = K, G.fillRect(0, 0, He, Ke), G.save(), G.translate(He / 2, Ke / 2), G.rotate(g * Math.PI / 180), G.scale(m, b), G.imageSmoothingEnabled = C, G.imageSmoothingQuality = E, G.drawImage.apply(G, [o].concat(Dr(ht.map(function(Oe) {
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
      for (var c = e.byteLength, d = 2; d + 1 < c; ) {
        if (e.getUint8(d) === 255 && e.getUint8(d + 1) === 225) {
          s = d;
          break;
        }
        d += 1;
      }
    if (s) {
      var g = s + 4, v = s + 10;
      if (Ja(e, g, 4) === "Exif") {
        var m = e.getUint16(v);
        if (n = m === 18761, (n || m === 19789) && e.getUint16(v + 2, n) === 42) {
          var p = e.getUint32(v + 4, n);
          p >= 8 && (i = v + p);
        }
      }
    }
    if (i) {
      var b = e.getUint16(i, n), A, P;
      for (P = 0; P < b; P += 1)
        if (A = i + P * 12 + 2, e.getUint16(A, n) === 274) {
          A += 8, t = e.getUint16(A, n), e.setUint16(A, 1, n);
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
    var d = {
      width: Math.max(n.offsetWidth, i >= 0 ? i : Tr),
      height: Math.max(n.offsetHeight, c >= 0 ? c : Pr)
    };
    this.containerData = d, ke(s, {
      width: d.width,
      height: d.height
    }), ee(e, ne), fe(s, ne);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, n = this.options.viewMode, s = Math.abs(t.rotate) % 180 === 90, i = s ? t.naturalHeight : t.naturalWidth, c = s ? t.naturalWidth : t.naturalHeight, d = i / c, g = e.width, v = e.height;
    e.height * d > e.width ? n === 3 ? g = e.height * d : v = e.width / d : n === 3 ? v = e.width / d : g = e.height * d;
    var m = {
      aspectRatio: d,
      naturalWidth: i,
      naturalHeight: c,
      width: g,
      height: v
    };
    this.canvasData = m, this.limited = n === 1 || n === 2, this.limitCanvas(!0, !0), m.width = Math.min(Math.max(m.width, m.minWidth), m.maxWidth), m.height = Math.min(Math.max(m.height, m.minHeight), m.maxHeight), m.left = (e.width - m.width) / 2, m.top = (e.height - m.height) / 2, m.oldLeft = m.left, m.oldTop = m.top, this.initialCanvasData = W({}, m);
  },
  limitCanvas: function(e, t) {
    var n = this.options, s = this.containerData, i = this.canvasData, c = this.cropBoxData, d = n.viewMode, g = i.aspectRatio, v = this.cropped && c;
    if (e) {
      var m = Number(n.minCanvasWidth) || 0, p = Number(n.minCanvasHeight) || 0;
      d > 1 ? (m = Math.max(m, s.width), p = Math.max(p, s.height), d === 3 && (p * g > m ? m = p * g : p = m / g)) : d > 0 && (m ? m = Math.max(m, v ? c.width : 0) : p ? p = Math.max(p, v ? c.height : 0) : v && (m = c.width, p = c.height, p * g > m ? m = p * g : p = m / g));
      var b = De({
        aspectRatio: g,
        width: m,
        height: p
      });
      m = b.width, p = b.height, i.minWidth = m, i.minHeight = p, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
    }
    if (t)
      if (d > (v ? 0 : 1)) {
        var A = s.width - i.width, P = s.height - i.height;
        i.minLeft = Math.min(0, A), i.minTop = Math.min(0, P), i.maxLeft = Math.max(0, A), i.maxTop = Math.max(0, P), v && this.limited && (i.minLeft = Math.min(c.left, c.left + (c.width - i.width)), i.minTop = Math.min(c.top, c.top + (c.height - i.height)), i.maxLeft = c.left, i.maxTop = c.top, d === 2 && (i.width >= s.width && (i.minLeft = Math.min(0, A), i.maxLeft = Math.max(0, A)), i.height >= s.height && (i.minTop = Math.min(0, P), i.maxTop = Math.max(0, P))));
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
      }), c = i.width, d = i.height, g = n.width * (c / n.naturalWidth), v = n.height * (d / n.naturalHeight);
      n.left -= (g - n.width) / 2, n.top -= (v - n.height) / 2, n.width = g, n.height = v, n.aspectRatio = c / d, n.naturalWidth = c, n.naturalHeight = d, this.limitCanvas(!0, !1);
    }
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCanvas(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, ke(this.canvas, W({
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
    }), ke(this.image, W({
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
    var n = this.options, s = this.containerData, i = this.canvasData, c = this.cropBoxData, d = this.limited, g = n.aspectRatio;
    if (e) {
      var v = Number(n.minCropBoxWidth) || 0, m = Number(n.minCropBoxHeight) || 0, p = d ? Math.min(s.width, i.width, i.width + i.left, s.width - i.left) : s.width, b = d ? Math.min(s.height, i.height, i.height + i.top, s.height - i.top) : s.height;
      v = Math.min(v, s.width), m = Math.min(m, s.height), g && (v && m ? m * g > v ? m = v / g : v = m * g : v ? m = v / g : m && (v = m * g), b * g > p ? b = p / g : p = b * g), c.minWidth = Math.min(v, p), c.minHeight = Math.min(m, b), c.maxWidth = p, c.maxHeight = b;
    }
    t && (d ? (c.minLeft = Math.max(0, i.left), c.minTop = Math.max(0, i.top), c.maxLeft = Math.min(s.width, i.left + i.width) - c.width, c.maxTop = Math.min(s.height, i.top + i.height) - c.height) : (c.minLeft = 0, c.minTop = 0, c.maxLeft = s.width - c.width, c.maxTop = s.height - c.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, n = this.cropBoxData;
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCropBox(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, e.movable && e.cropBoxMovable && Je(this.face, Ze, n.width >= t.width && n.height >= t.height ? Mr : Ot), ke(this.cropBox, W({
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
      var d = n;
      typeof n == "string" ? d = e.ownerDocument.querySelectorAll(n) : n.querySelector && (d = [n]), this.previews = d, J(d, function(g) {
        var v = document.createElement("img");
        Je(g, ot, {
          width: g.offsetWidth,
          height: g.offsetHeight,
          html: g.innerHTML
        }), t && (v.crossOrigin = t), v.src = s, v.alt = i, v.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', g.innerHTML = "", g.appendChild(v);
      });
    }
  },
  resetPreview: function() {
    J(this.previews, function(e) {
      var t = Et(e, ot);
      ke(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, Wa(e, ot);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, n = this.cropBoxData, s = n.width, i = n.height, c = e.width, d = e.height, g = n.left - t.left - e.left, v = n.top - t.top - e.top;
    !this.cropped || this.disabled || (ke(this.viewBoxImage, W({
      width: c,
      height: d
    }, Ge(W({
      translateX: -g,
      translateY: -v
    }, e)))), J(this.previews, function(m) {
      var p = Et(m, ot), b = p.width, A = p.height, P = b, I = A, L = 1;
      s && (L = b / s, I = i * L), i && I > A && (L = A / i, P = s * L, I = A), ke(m, {
        width: P,
        height: I
      }), ke(m.getElementsByTagName("img")[0], W({
        width: c * L,
        height: d * L
      }, Ge(W({
        translateX: -g * L,
        translateY: -v * L
      }, e))));
    }));
  }
}, as = {
  bind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    ie(t.cropstart) && se(e, Mt, t.cropstart), ie(t.cropmove) && se(e, Ct, t.cropmove), ie(t.cropend) && se(e, Dt, t.cropend), ie(t.crop) && se(e, kt, t.crop), ie(t.zoom) && se(e, $t, t.zoom), se(n, dr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && se(n, gr, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && se(n, ur, this.onDblclick = this.dblclick.bind(this)), se(e.ownerDocument, hr, this.onCropMove = this.cropMove.bind(this)), se(e.ownerDocument, fr, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && se(window, pr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    ie(t.cropstart) && ue(e, Mt, t.cropstart), ie(t.cropmove) && ue(e, Ct, t.cropmove), ie(t.cropend) && ue(e, Dt, t.cropend), ie(t.crop) && ue(e, kt, t.crop), ie(t.zoom) && ue(e, $t, t.zoom), ue(n, dr, this.onCropStart), t.zoomable && t.zoomOnWheel && ue(n, gr, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ue(n, ur, this.onDblclick), ue(e.ownerDocument, hr, this.onCropMove), ue(e.ownerDocument, fr, this.onCropEnd), t.responsive && ue(window, pr, this.onResize);
  }
}, ss = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, n = this.containerData, s = t.offsetWidth / n.width, i = t.offsetHeight / n.height, c = Math.abs(s - 1) > Math.abs(i - 1) ? s : i;
      if (c !== 1) {
        var d, g;
        e.restore && (d = this.getCanvasData(), g = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(J(d, function(v, m) {
          d[m] = v * c;
        })), this.setCropBoxData(J(g, function(v, m) {
          g[m] = v * c;
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
      e.changedTouches ? J(e.changedTouches, function(d) {
        i[d.identifier] = at(d);
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
    var t = this.options, n = this.canvasData, s = this.containerData, i = this.cropBoxData, c = this.pointers, d = this.action, g = t.aspectRatio, v = i.left, m = i.top, p = i.width, b = i.height, A = v + p, P = m + b, I = 0, L = 0, K = s.width, F = s.height, C = !0, z;
    !g && e.shiftKey && (g = p && b ? p / b : 1), this.limited && (I = i.minLeft, L = i.minTop, K = I + Math.min(s.width, n.width, n.left + n.width), F = L + Math.min(s.height, n.height, n.top + n.height));
    var E = c[Object.keys(c)[0]], _ = {
      x: E.endX - E.startX,
      y: E.endY - E.startY
    }, O = function(q) {
      switch (q) {
        case Ce:
          A + _.x > K && (_.x = K - A);
          break;
        case Me:
          v + _.x < I && (_.x = I - v);
          break;
        case _e:
          m + _.y < L && (_.y = L - m);
          break;
        case Ne:
          P + _.y > F && (_.y = F - P);
          break;
      }
    };
    switch (d) {
      case Ot:
        v += _.x, m += _.y;
        break;
      case Ce:
        if (_.x >= 0 && (A >= K || g && (m <= L || P >= F))) {
          C = !1;
          break;
        }
        O(Ce), p += _.x, p < 0 && (d = Me, p = -p, v -= p), g && (b = p / g, m += (i.height - b) / 2);
        break;
      case _e:
        if (_.y <= 0 && (m <= L || g && (v <= I || A >= K))) {
          C = !1;
          break;
        }
        O(_e), b -= _.y, m += _.y, b < 0 && (d = Ne, b = -b, m -= b), g && (p = b * g, v += (i.width - p) / 2);
        break;
      case Me:
        if (_.x <= 0 && (v <= I || g && (m <= L || P >= F))) {
          C = !1;
          break;
        }
        O(Me), p -= _.x, v += _.x, p < 0 && (d = Ce, p = -p, v -= p), g && (b = p / g, m += (i.height - b) / 2);
        break;
      case Ne:
        if (_.y >= 0 && (P >= F || g && (v <= I || A >= K))) {
          C = !1;
          break;
        }
        O(Ne), b += _.y, b < 0 && (d = _e, b = -b, m -= b), g && (p = b * g, v += (i.width - p) / 2);
        break;
      case Ye:
        if (g) {
          if (_.y <= 0 && (m <= L || A >= K)) {
            C = !1;
            break;
          }
          O(_e), b -= _.y, m += _.y, p = b * g;
        } else
          O(_e), O(Ce), _.x >= 0 ? A < K ? p += _.x : _.y <= 0 && m <= L && (C = !1) : p += _.x, _.y <= 0 ? m > L && (b -= _.y, m += _.y) : (b -= _.y, m += _.y);
        p < 0 && b < 0 ? (d = Fe, b = -b, p = -p, m -= b, v -= p) : p < 0 ? (d = We, p = -p, v -= p) : b < 0 && (d = Xe, b = -b, m -= b);
        break;
      case We:
        if (g) {
          if (_.y <= 0 && (m <= L || v <= I)) {
            C = !1;
            break;
          }
          O(_e), b -= _.y, m += _.y, p = b * g, v += i.width - p;
        } else
          O(_e), O(Me), _.x <= 0 ? v > I ? (p -= _.x, v += _.x) : _.y <= 0 && m <= L && (C = !1) : (p -= _.x, v += _.x), _.y <= 0 ? m > L && (b -= _.y, m += _.y) : (b -= _.y, m += _.y);
        p < 0 && b < 0 ? (d = Xe, b = -b, p = -p, m -= b, v -= p) : p < 0 ? (d = Ye, p = -p, v -= p) : b < 0 && (d = Fe, b = -b, m -= b);
        break;
      case Fe:
        if (g) {
          if (_.x <= 0 && (v <= I || P >= F)) {
            C = !1;
            break;
          }
          O(Me), p -= _.x, v += _.x, b = p / g;
        } else
          O(Ne), O(Me), _.x <= 0 ? v > I ? (p -= _.x, v += _.x) : _.y >= 0 && P >= F && (C = !1) : (p -= _.x, v += _.x), _.y >= 0 ? P < F && (b += _.y) : b += _.y;
        p < 0 && b < 0 ? (d = Ye, b = -b, p = -p, m -= b, v -= p) : p < 0 ? (d = Xe, p = -p, v -= p) : b < 0 && (d = We, b = -b, m -= b);
        break;
      case Xe:
        if (g) {
          if (_.x >= 0 && (A >= K || P >= F)) {
            C = !1;
            break;
          }
          O(Ce), p += _.x, b = p / g;
        } else
          O(Ne), O(Ce), _.x >= 0 ? A < K ? p += _.x : _.y >= 0 && P >= F && (C = !1) : p += _.x, _.y >= 0 ? P < F && (b += _.y) : b += _.y;
        p < 0 && b < 0 ? (d = We, b = -b, p = -p, m -= b, v -= p) : p < 0 ? (d = Fe, p = -p, v -= p) : b < 0 && (d = Ye, b = -b, m -= b);
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
        z = Nr(this.cropper), v = E.startX - z.left, m = E.startY - z.top, p = i.minWidth, b = i.minHeight, _.x > 0 ? d = _.y > 0 ? Xe : Ye : _.x < 0 && (v -= p, d = _.y > 0 ? Fe : We), _.y < 0 && (m -= b), this.cropped || (fe(this.cropBox, ne), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    C && (i.width = p, i.height = b, i.left = v, i.top = m, this.action = d, this.renderCropBox()), J(c, function(H) {
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
    var s = this.options, i = this.canvasData, c = i.width, d = i.height, g = i.naturalWidth, v = i.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && s.zoomable) {
      var m = g * e, p = v * e;
      if (Be(this.element, $t, {
        ratio: e,
        oldRatio: c / g,
        originalEvent: n
      }) === !1)
        return this;
      if (n) {
        var b = this.pointers, A = Nr(this.cropper), P = b && Object.keys(b).length ? qa(b) : {
          pageX: n.pageX,
          pageY: n.pageY
        };
        i.left -= (m - c) * ((P.pageX - A.left - i.left) / c), i.top -= (p - d) * ((P.pageY - A.top - i.top) / d);
      } else
        Le(t) && V(t.x) && V(t.y) ? (i.left -= (m - c) * ((t.x - i.left) / c), i.top -= (p - d) * ((t.y - i.top) / d)) : (i.left -= (m - c) / 2, i.top -= (p - d) / 2);
      i.width = m, i.height = p, this.renderCanvas(!0);
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
      var d = n.width / n.naturalWidth;
      if (J(c, function(m, p) {
        c[p] = m / d;
      }), e) {
        var g = Math.round(c.y + c.height), v = Math.round(c.x + c.width);
        c.x = Math.round(c.x), c.y = Math.round(c.y), c.width = v - c.x, c.height = g - c.y;
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
      var d = n.width / n.naturalWidth;
      V(e.x) && (i.left = e.x * d + s.left), V(e.y) && (i.top = e.y * d + s.top), V(e.width) && (i.width = e.width * d), V(e.height) && (i.height = e.height * d), this.setCropBoxData(i);
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
    var s = this.getData(), i = s.x, c = s.y, d = s.width, g = s.height, v = n.width / Math.floor(t.naturalWidth);
    v !== 1 && (i *= v, c *= v, d *= v, g *= v);
    var m = d / g, p = De({
      aspectRatio: m,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = De({
      aspectRatio: m,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), A = De({
      aspectRatio: m,
      width: e.width || (v !== 1 ? n.width : d),
      height: e.height || (v !== 1 ? n.height : g)
    }), P = A.width, I = A.height;
    P = Math.min(p.width, Math.max(b.width, P)), I = Math.min(p.height, Math.max(b.height, I));
    var L = document.createElement("canvas"), K = L.getContext("2d");
    L.width = ze(P), L.height = ze(I), K.fillStyle = e.fillColor || "transparent", K.fillRect(0, 0, P, I);
    var F = e.imageSmoothingEnabled, C = F === void 0 ? !0 : F, z = e.imageSmoothingQuality;
    K.imageSmoothingEnabled = C, z && (K.imageSmoothingQuality = z);
    var E = n.width, _ = n.height, O = i, H = c, q, ae, ce, be, de, U;
    O <= -d || O > E ? (O = 0, q = 0, ce = 0, de = 0) : O <= 0 ? (ce = -O, O = 0, q = Math.min(E, d + O), de = q) : O <= E && (ce = 0, q = Math.min(d, E - O), de = q), q <= 0 || H <= -g || H > _ ? (H = 0, ae = 0, be = 0, U = 0) : H <= 0 ? (be = -H, H = 0, ae = Math.min(_, g + H), U = ae) : H <= _ && (be = 0, ae = Math.min(g, _ - H), U = ae);
    var G = [O, H, q, ae];
    if (de > 0 && U > 0) {
      var he = P / d;
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
}, us = ge.Cropper, Vr = /* @__PURE__ */ function() {
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
        var c = new XMLHttpRequest(), d = this.clone.bind(this);
        this.reloading = !0, this.xhr = c, c.onabort = d, c.onerror = d, c.ontimeout = d, c.onprogress = function() {
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
      var n = this.options, s = this.imageData, i = rs(t), c = 0, d = 1, g = 1;
      if (i > 1) {
        this.url = ts(t, vr);
        var v = is(i);
        c = v.rotate, d = v.scaleX, g = v.scaleY;
      }
      n.rotatable && (s.rotate = c), n.scalable && (s.scaleX = d, s.scaleY = g), this.clone();
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
      var s = ge.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(ge.navigator.userAgent), i = function(v, m) {
        W(t.imageData, {
          naturalWidth: v,
          naturalHeight: m,
          aspectRatio: v / m
        }), t.initialImageData = W({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (n.naturalWidth && !s) {
        i(n.naturalWidth, n.naturalHeight);
        return;
      }
      var c = document.createElement("img"), d = document.body || document.documentElement;
      this.sizingImage = c, c.onload = function() {
        i(c.width, c.height), s || d.removeChild(c);
      }, c.src = n.src, s || (c.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", d.appendChild(c));
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
        var d = c.querySelector(".".concat(Y, "-container")), g = d.querySelector(".".concat(Y, "-canvas")), v = d.querySelector(".".concat(Y, "-drag-box")), m = d.querySelector(".".concat(Y, "-crop-box")), p = m.querySelector(".".concat(Y, "-face"));
        this.container = i, this.cropper = d, this.canvas = g, this.dragBox = v, this.cropBox = m, this.viewBox = d.querySelector(".".concat(Y, "-view-box")), this.face = p, g.appendChild(s), ee(t, ne), i.insertBefore(d, t.nextSibling), this.isImg || fe(s, cr), this.initPreview(), this.bind(), n.initialAspectRatio = Math.max(0, n.initialAspectRatio) || NaN, n.aspectRatio = Math.max(0, n.aspectRatio) || NaN, n.viewMode = Math.max(0, Math.min(3, Math.round(n.viewMode))) || 0, ee(m, ne), n.guides || ee(m.getElementsByClassName("".concat(Y, "-dashed")), ne), n.center || ee(m.getElementsByClassName("".concat(Y, "-center")), ne), n.background && ee(d, "".concat(Y, "-bg")), n.highlight || ee(p, Aa), n.cropBoxMovable && (ee(p, St), Je(p, Ze, Ot)), n.cropBoxResizable || (ee(m.getElementsByClassName("".concat(Y, "-line")), ne), ee(m.getElementsByClassName("".concat(Y, "-point")), ne)), this.render(), this.ready = !0, this.setDragMode(n.dragMode), n.autoCrop && this.crop(), this.setData(n.data), ie(n.ready) && se(t, mr, n.ready, {
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
}, fs = { class: "ml-auto mb-2" }, ms = { class: "w-full flex justify-center" }, ps = ["src"], gs = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = we(), s = () => n.value + "?" + Ae({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path }), i = N(null), c = N(null), d = N(!1), g = () => {
      d.value = !d.value, d.value ? c.value = new Vr(i.value, {
        crop(m) {
        }
      }) : c.value.destroy();
    }, v = () => {
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
          }).then((p) => {
            i.value.src = s(), g(), e("load");
          }).catch((p) => console.log(p.statusText));
        }
      );
    };
    return onMounted(() => {
      e("load");
    }), (m, p) => (k(), $(re, null, [
      h("div", ds, [
        h("h3", hs, B(o.selection.item.basename), 1),
        h("div", fs, [
          d.value ? (k(), $("button", {
            key: 0,
            onClick: v,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Crop")) : le("", !0),
          h("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: p[0] || (p[0] = (b) => g())
          }, B(d.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      h("div", ms, [
        h("img", {
          ref: (b) => i.value = b,
          class: "max-w-[60vh] max-h-[60vh]",
          src: s(),
          alt: ""
        }, null, 8, ps)
      ])
    ], 64));
  }
}, vs = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, bs = /* @__PURE__ */ h("div", null, " Default view.. ", -1), ys = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    return me(() => {
      e("load");
    }), (t, n) => (k(), $(re, null, [
      h("h3", vs, B(o.selection.item.basename), 1),
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
    }), (i, c) => (k(), $(re, null, [
      h("h3", ws, B(o.selection.item.basename), 1),
      h("div", null, [
        h("video", xs, [
          h("source", {
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
    }), (i, c) => (k(), $(re, null, [
      h("h3", Ds, B(o.selection.item.basename), 1),
      h("div", null, [
        h("audio", Cs, [
          h("source", {
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
    }), (i, c) => (k(), $(re, null, [
      h("h3", As, B(o.selection.item.basename), 1),
      h("div", null, [
        h("object", {
          class: "h-[60vh]",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          h("iframe", {
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
}, Is = { class: "sm:flex sm:items-start" }, js = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ns = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Ls = {
  key: 0,
  class: "flex leading-5"
}, Vs = /* @__PURE__ */ h("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ h("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ h("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), zs = /* @__PURE__ */ h("span", null, "Loading", -1), Bs = [
  Vs,
  zs
], Rs = {
  name: "VFModalPreview"
}, Hs = /* @__PURE__ */ Object.assign(Rs, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = o, { apiUrl: t } = we(), n = inject("emitter"), s = N(!1), i = (d) => {
      var g;
      return ((g = e.selection.item.mime_type) != null ? g : "").startsWith(d);
    }, c = () => {
      const d = t.value + "?" + Ae({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      n.emit("vf-download", d);
    };
    return (d, g) => (k(), te(ve, null, {
      buttons: Q(() => [
        h("button", {
          type: "button",
          onClick: g[6] || (g[6] = (v) => R(n).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close"),
        h("button", {
          type: "button",
          onClick: g[7] || (g[7] = (v) => c()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Download")
      ]),
      default: Q(() => [
        h("div", Is, [
          h("div", js, [
            h("div", null, [
              i("text") ? (k(), te(_a, {
                key: 0,
                selection: o.selection,
                onLoad: g[0] || (g[0] = (v) => s.value = !0)
              }, null, 8, ["selection"])) : i("image") ? (k(), te(gs, {
                key: 1,
                selection: o.selection,
                onLoad: g[1] || (g[1] = (v) => s.value = !0)
              }, null, 8, ["selection"])) : i("video") ? (k(), te(ks, {
                key: 2,
                selection: o.selection,
                onLoad: g[2] || (g[2] = (v) => s.value = !0)
              }, null, 8, ["selection"])) : i("audio") ? (k(), te(Es, {
                key: 3,
                selection: o.selection,
                onLoad: g[3] || (g[3] = (v) => s.value = !0)
              }, null, 8, ["selection"])) : i("application/pdf") ? (k(), te(Os, {
                key: 4,
                selection: o.selection,
                onLoad: g[4] || (g[4] = (v) => s.value = !0)
              }, null, 8, ["selection"])) : (k(), te(ys, {
                key: 5,
                selection: o.selection,
                onLoad: g[5] || (g[5] = (v) => s.value = !0)
              }, null, 8, ["selection"]))
            ]),
            h("div", Ns, [
              h("p", null, B(o.selection.item.path), 1),
              h("p", null, "mime_type: " + B(o.selection.item.mime_type), 1),
              s.value == !1 ? (k(), $("div", Ls, Bs)) : le("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ks = { class: "sm:flex sm:items-start" }, Us = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), Ys = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ws = {
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
}, Gs = /* @__PURE__ */ h("path", {
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
}, Qs = /* @__PURE__ */ h("path", {
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
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = N(e.selection.items[0]), i = N(e.selection.items[0].basename), c = () => {
      i.value != "" && t.emit("vf-fetch", {
        q: "rename",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: s.value.path,
        name: i.value
      });
    };
    return (d, g) => (k(), te(ve, null, {
      buttons: Q(() => [
        h("button", {
          type: "button",
          onClick: c,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Rename!"),
        h("button", {
          type: "button",
          onClick: g[1] || (g[1] = (v) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        h("div", Ks, [
          Us,
          h("div", Ys, [
            h("h3", Ws, "Rename your " + B(s.value.type == "dir" ? "folder" : "file"), 1),
            h("div", Xs, [
              h("p", Fs, [
                s.value.type == "dir" ? (k(), $("svg", qs, Zs)) : (k(), $("svg", Js, el)),
                h("span", tl, B(s.value.basename), 1)
              ]),
              ye(h("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (v) => i.value = v),
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
}), ol = { class: "sm:flex sm:items-start" }, al = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), sl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, ll = /* @__PURE__ */ h("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Upload files", -1), cl = { class: "mt-2" }, ul = { class: "text-gray-500 mb-1" }, dl = ["id"], hl = ["disabled", "onClick"], fl = {
  name: "VFModalUpload"
}, ml = /* @__PURE__ */ Object.assign(fl, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { apiUrl: n } = we(), s = N(null), i = N(null), c = N(null), d = N([]), g = N(!0), v = () => {
      s.value.start();
    };
    return me(() => {
      s.value = new gt.Uploader({
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
          FilesAdded: function(m, p) {
            g.value = !1, gt.each(p, function(b) {
              d.value.push({
                id: b.id,
                name: b.name,
                size: gt.formatSize(b.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(m, p) {
            d.value[d.value.findIndex((b) => b.id == p.id)].percent = p.percent + "%";
          },
          UploadComplete: function() {
            g.value = !0, t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: e.current.dirname });
          },
          Error: function(m, p) {
          }
        }
      }), s.value.init();
    }), (m, p) => (k(), te(ve, null, {
      buttons: Q(() => [
        h("button", {
          disabled: g.value,
          onClick: qe(v, ["prevent"]),
          type: "button",
          class: $e([g.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, "Upload!", 10, hl),
        h("button", {
          type: "button",
          onClick: p[0] || (p[0] = (b) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        h("div", ol, [
          al,
          h("div", sl, [
            ll,
            h("div", cl, [
              h("div", ul, [
                (k(!0), $(re, null, pe(d.value, (b) => (k(), $("div", null, [
                  h("div", {
                    id: b.id
                  }, [
                    Re(B(b.name) + " ( " + B(b.size) + ") ", 1),
                    h("b", null, B(b.percent), 1)
                  ], 8, dl)
                ]))), 256))
              ]),
              h("div", {
                class: "text-gray-500",
                ref: (b) => i.value = b
              }, [
                h("a", {
                  ref: (b) => c.value = b,
                  href: "javascript:;"
                }, "[Select files]", 512)
              ], 512)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), pl = { class: "sm:flex sm:items-start" }, gl = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
    })
  ])
], -1), vl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, bl = /* @__PURE__ */ h("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), yl = { class: "mt-2" }, wl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, xl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, _l = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Sl = [
  _l
], kl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dl = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Cl = [
  Dl
], Ml = { class: "ml-1.5" }, $l = /* @__PURE__ */ h("p", { class: "my-1 text-sm text-gray-500" }, "Archive name. (.zip file will be created)", -1), El = ["onKeyup"], Al = {
  name: "VFModalArchive"
}, Tl = /* @__PURE__ */ Object.assign(Al, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = N(""), i = N(e.selection.items), c = () => {
      i.value.length && t.emit("vf-fetch", {
        q: "archive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(i.value.map(({ path: d, type: g }) => ({ path: d, type: g }))),
        name: s.value
      });
    };
    return (d, g) => (k(), te(ve, null, {
      buttons: Q(() => [
        h("button", {
          type: "button",
          onClick: c,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Archive!"),
        h("button", {
          type: "button",
          onClick: g[1] || (g[1] = (v) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        h("div", pl, [
          gl,
          h("div", vl, [
            bl,
            h("div", yl, [
              (k(!0), $(re, null, pe(i.value, (v) => (k(), $("p", wl, [
                v.type == "dir" ? (k(), $("svg", xl, Sl)) : (k(), $("svg", kl, Cl)),
                h("span", Ml, B(v.basename), 1)
              ]))), 256)),
              $l,
              ye(h("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (v) => s.value = v),
                onKeyup: Qe(c, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, El), [
                [et, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Pl = { class: "sm:flex sm:items-start" }, Ol = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    })
  ])
], -1), Il = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, jl = /* @__PURE__ */ h("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), Nl = { class: "mt-2" }, Ll = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Vl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zl = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Bl = [
  zl
], Rl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hl = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Kl = [
  Hl
], Ul = { class: "ml-1.5" }, Yl = { class: "my-1 text-sm text-gray-500" }, Wl = {
  name: "VFModalUnarchive"
}, Xl = /* @__PURE__ */ Object.assign(Wl, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage");
    N("");
    const s = N(e.selection.items[0]), i = N([]), c = () => {
      t.emit("vf-fetch", {
        q: "unarchive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: s.value.path
      });
    };
    return (d, g) => (k(), te(ve, null, {
      buttons: Q(() => [
        h("button", {
          type: "button",
          onClick: c,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Unarchive!"),
        h("button", {
          type: "button",
          onClick: g[0] || (g[0] = (v) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        h("div", Pl, [
          Ol,
          h("div", Il, [
            jl,
            h("div", Nl, [
              (k(!0), $(re, null, pe(i.value, (v) => (k(), $("p", Ll, [
                v.type == "dir" ? (k(), $("svg", Vl, Bl)) : (k(), $("svg", Rl, Kl)),
                h("span", Ul, B(v.basename), 1)
              ]))), 256)),
              h("p", Yl, "Archive will be unarchived at (" + B(o.current.dirname) + ")", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fl = { class: "sm:flex sm:items-start" }, ql = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), Gl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Zl = /* @__PURE__ */ h("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Move files", -1), Jl = { class: "mt-2" }, Ql = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ec = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, tc = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), rc = [
  tc
], ic = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, nc = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), oc = [
  nc
], ac = { class: "ml-1.5" }, sc = /* @__PURE__ */ h("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Are you sure you want to move these files to ?", -1), lc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, cc = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ h("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), uc = { class: "ml-1.5 overflow-auto" }, dc = {
  name: "VFModalMove"
}, hc = /* @__PURE__ */ Object.assign(dc, {
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
        items: JSON.stringify(s.value.map(({ path: c, type: d }) => ({ path: c, type: d }))),
        item: e.selection.items.to.path
      });
    };
    return (c, d) => (k(), te(ve, null, {
      buttons: Q(() => [
        h("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, move!"),
        h("button", {
          type: "button",
          onClick: d[0] || (d[0] = (g) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        h("div", Fl, [
          ql,
          h("div", Gl, [
            Zl,
            h("div", Jl, [
              (k(!0), $(re, null, pe(s.value, (g) => (k(), $("p", Ql, [
                g.type == "dir" ? (k(), $("svg", ec, rc)) : (k(), $("svg", ic, oc)),
                h("span", ac, B(g.path), 1)
              ]))), 256)),
              sc,
              h("p", lc, [
                cc,
                h("span", uc, B(o.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), fc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: Uo,
  ModalMessage: Jo,
  ModalNewFolder: sa,
  ModalNewFile: ga,
  ModalPreview: Hs,
  ModalRename: nl,
  ModalUpload: ml,
  ModalArchive: Tl,
  ModalUnarchive: Xl,
  ModalMove: hc
}, Symbol.toStringTag, { value: "Module" })), wt = {
  VueFinder: _o,
  ...fc
};
const gc = {
  install(o) {
    for (const e in wt)
      if (wt.hasOwnProperty(e)) {
        const t = wt[e];
        o.component(t.name, t);
      }
  }
};
export {
  gc as default
};
