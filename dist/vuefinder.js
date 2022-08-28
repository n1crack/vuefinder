import { ref as A, watch as tt, openBlock as y, createElementBlock as k, createElementVNode as s, unref as T, normalizeClass as ne, createCommentVNode as W, createStaticVNode as Qt, reactive as pe, onMounted as Y, withDirectives as X, createVNode as re, vShow as Se, toDisplayString as E, withModifiers as me, Fragment as R, renderList as J, createTextVNode as ce, nextTick as Ce, vModelSelect as er, normalizeStyle as tr, provide as Xe, createBlock as H, resolveDynamicComponent as rr, withKeys as he, renderSlot as Ge, withCtx as K, vModelText as fe } from "vue";
import xe from "plupload";
const $e = (h, { method: d = "get", params: a = {}, json: p = !0 }) => {
  const u = { method: d };
  if (d == "get")
    h += "?" + new URLSearchParams(a);
  else {
    u.headers = {};
    let n = new FormData();
    for (const [w, f] of Object.entries(a))
      n.append(w, f);
    u.body = n;
  }
  return fetch(h, u).then((n) => n.ok ? p ? n.json() : n.text() : Promise.reject(n));
};
function or(h) {
  return { all: h = h || /* @__PURE__ */ new Map(), on: function(d, a) {
    var p = h.get(d);
    p ? p.push(a) : h.set(d, [a]);
  }, off: function(d, a) {
    var p = h.get(d);
    p && (a ? p.splice(p.indexOf(a) >>> 0, 1) : h.set(d, []));
  }, emit: function(d, a) {
    var p = h.get(d);
    p && p.slice().map(function(u) {
      u(a);
    }), (p = h.get("*")) && p.slice().map(function(u) {
      u(d, a);
    });
  } };
}
function Qe(h) {
  let d = localStorage.getItem(h + "_storage");
  const a = A(JSON.parse(d));
  tt(a, p);
  function p() {
    a.value === null || a.value === "" ? localStorage.removeItem(h + "_storage") : localStorage.setItem(h + "_storage", JSON.stringify(a.value));
  }
  function u(f, g) {
    a.value = Object.assign({ ...a.value }, { [f]: g });
  }
  function n() {
    a.value = null;
  }
  return { getStore: (f, g = null) => a.value === null || a.value === "" ? g : a.value.hasOwnProperty(f) ? a.value[f] : g, setStore: u, clearStore: n };
}
const et = A("");
function G() {
  function h(d) {
    et.value = d;
  }
  return { apiUrl: et, setApiUrl: h };
}
const nr = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, sr = { class: "flex text-center" }, ir = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
  })
], -1), ar = [
  ir
], lr = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  })
], -1), cr = [
  lr
], ur = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
}, null, -1), dr = [
  ur
], mr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
}, null, -1), hr = [
  mr
], fr = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
  })
], -1), gr = [
  fr
], vr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
}, null, -1), pr = [
  vr
], yr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
}, null, -1), br = [
  yr
], _r = { class: "flex text-center items-center justify-end" }, wr = {
  class: "mx-1.5",
  "aria-label": "Dark Mode",
  "data-microtip-position": "bottom",
  role: "tooltip"
}, Sr = /* @__PURE__ */ Qt('<g class="dark:opacity-0"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path><path d="M12 4v.01M17.66 6.345l-.007.007M20.005 12.005h-.01M17.66 17.665l-.007-.007M12 20.01V20M6.34 17.665l.007-.007M3.995 12.005h.01M6.34 6.344l.007.007" fill="none"></path></g><g class="opacity-0 dark:opacity-100"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M12 3v1M18.66 5.345l-.828.828M21.005 12.005h-1M18.66 18.665l-.828-.828M12 21.01V20M5.34 18.666l.835-.836M2.995 12.005h1.01M5.34 5.344l.835.836" fill="none"></path></g>', 2), xr = [
  Sr
], kr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, Dr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
}, null, -1), $r = [
  Dr
], Cr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, Pr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 6h16M4 10h16M4 14h16M4 18h16"
}, null, -1), Mr = [
  Pr
], jr = {
  name: "VFToolbar"
}, Ar = /* @__PURE__ */ Object.assign(jr, {
  setup(h) {
    const d = inject("emitter"), { getStore: a, setStore: p } = inject("storage"), u = A(a("viewport", "grid")), n = A([]);
    return d.on("vf-nodes-selected", (w) => {
      n.value = w;
    }), d.on("vf-view-toggle", (w) => {
      p("viewport", w), u.value = w;
    }), (w, f) => (y(), k("div", nr, [
      s("div", sr, [
        s("div", {
          class: "mx-1.5",
          "aria-label": "New Folder",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[0] || (f[0] = (g) => T(d).emit("vf-modal-show", { type: "new-folder", items: n.value }))
        }, ar),
        s("div", {
          class: "mx-1.5",
          "aria-label": "New File",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[1] || (f[1] = (g) => T(d).emit("vf-modal-show", { type: "new-file", items: n.value }))
        }, cr),
        s("div", {
          class: "mx-1.5",
          "aria-label": "Rename",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[2] || (f[2] = (g) => n.value.length != 1 || T(d).emit("vf-modal-show", { type: "rename", items: n.value }))
        }, [
          (y(), k("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ne([n.value.length == 1 ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, dr, 2))
        ]),
        s("div", {
          class: "mx-1.5",
          "aria-label": "Delete",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[3] || (f[3] = (g) => !n.value.length || T(d).emit("vf-modal-show", { type: "delete", items: n.value }))
        }, [
          (y(), k("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ne([n.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, hr, 2))
        ]),
        s("div", {
          class: "mx-1.5",
          "aria-label": "Upload",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[4] || (f[4] = (g) => T(d).emit("vf-modal-show", { type: "upload", items: n.value }))
        }, gr),
        n.value.length == 1 && n.value[0].mime_type == "application/zip" ? (y(), k("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": "Unrchive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[5] || (f[5] = (g) => !n.value.length || T(d).emit("vf-modal-show", { type: "unarchive", items: n.value }))
        }, [
          (y(), k("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ne([n.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, pr, 2))
        ])) : (y(), k("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": "Archive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[6] || (f[6] = (g) => !n.value.length || T(d).emit("vf-modal-show", { type: "archive", items: n.value }))
        }, [
          (y(), k("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ne([n.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, br, 2))
        ]))
      ]),
      s("div", _r, [
        s("div", wr, [
          (y(), k("svg", {
            onClick: f[7] || (f[7] = (g) => T(d).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, xr))
        ]),
        s("div", {
          class: "mx-1.5",
          "aria-label": "Change View",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[8] || (f[8] = (g) => T(d).emit("vf-view-toggle", u.value == "list" ? "grid" : "list"))
        }, [
          u.value == "grid" ? (y(), k("svg", kr, $r)) : W("", !0),
          u.value == "list" ? (y(), k("svg", Cr, Mr)) : W("", !0)
        ])
      ])
    ]));
  }
});
var Er = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, rt = { exports: {} };
(function(h, d) {
  (function(a, p) {
    h.exports = p();
  })(Er, function() {
    function a(o, t) {
      if (!(o instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function p(o, t) {
      for (var e = 0; e < t.length; e++) {
        var i = t[e];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(o, i.key, i);
      }
    }
    function u(o, t, e) {
      return t && p(o.prototype, t), e && p(o, e), o;
    }
    function n(o, t, e) {
      return t in o ? Object.defineProperty(o, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : o[t] = e, o;
    }
    function w(o, t) {
      var e = Object.keys(o);
      if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(o);
        t && (i = i.filter(function(r) {
          return Object.getOwnPropertyDescriptor(o, r).enumerable;
        })), e.push.apply(e, i);
      }
      return e;
    }
    function f(o) {
      for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t] != null ? arguments[t] : {};
        t % 2 ? w(Object(e), !0).forEach(function(i) {
          n(o, i, e[i]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(e)) : w(Object(e)).forEach(function(i) {
          Object.defineProperty(o, i, Object.getOwnPropertyDescriptor(e, i));
        });
      }
      return o;
    }
    function g(o, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function");
      o.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: o,
          writable: !0,
          configurable: !0
        }
      }), t && x(o, t);
    }
    function _(o) {
      return _ = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      }, _(o);
    }
    function x(o, t) {
      return x = Object.setPrototypeOf || function(i, r) {
        return i.__proto__ = r, i;
      }, x(o, t);
    }
    function $() {
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
    function D(o, t, e) {
      return $() ? D = Reflect.construct : D = function(r, l, c) {
        var m = [null];
        m.push.apply(m, l);
        var v = Function.bind.apply(r, m), S = new v();
        return c && x(S, c.prototype), S;
      }, D.apply(null, arguments);
    }
    function I(o) {
      return Function.toString.call(o).indexOf("[native code]") !== -1;
    }
    function B(o) {
      var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return B = function(i) {
        if (i === null || !I(i))
          return i;
        if (typeof i != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof t < "u") {
          if (t.has(i))
            return t.get(i);
          t.set(i, r);
        }
        function r() {
          return D(i, arguments, _(this).constructor);
        }
        return r.prototype = Object.create(i.prototype, {
          constructor: {
            value: r,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), x(r, i);
      }, B(o);
    }
    function O(o) {
      if (o === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return o;
    }
    function oe(o, t) {
      return t && (typeof t == "object" || typeof t == "function") ? t : O(o);
    }
    function ue(o) {
      var t = $();
      return function() {
        var i = _(o), r;
        if (t) {
          var l = _(this).constructor;
          r = Reflect.construct(i, arguments, l);
        } else
          r = i.apply(this, arguments);
        return oe(this, r);
      };
    }
    function Pe(o, t) {
      for (; !Object.prototype.hasOwnProperty.call(o, t) && (o = _(o), o !== null); )
        ;
      return o;
    }
    function P(o, t, e) {
      return typeof Reflect < "u" && Reflect.get ? P = Reflect.get : P = function(r, l, c) {
        var m = Pe(r, l);
        if (!!m) {
          var v = Object.getOwnPropertyDescriptor(m, l);
          return v.get ? v.get.call(c) : v.value;
        }
      }, P(o, t, e || o);
    }
    function V(o, t) {
      return z(o) || ee(o, t) || Me(o, t) || nt();
    }
    function M(o) {
      return q(o) || Q(o) || Me(o) || ot();
    }
    function q(o) {
      if (Array.isArray(o))
        return ye(o);
    }
    function z(o) {
      if (Array.isArray(o))
        return o;
    }
    function Q(o) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(o))
        return Array.from(o);
    }
    function ee(o, t) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(o)))) {
        var e = [], i = !0, r = !1, l = void 0;
        try {
          for (var c = o[Symbol.iterator](), m; !(i = (m = c.next()).done) && (e.push(m.value), !(t && e.length === t)); i = !0)
            ;
        } catch (v) {
          r = !0, l = v;
        } finally {
          try {
            !i && c.return != null && c.return();
          } finally {
            if (r)
              throw l;
          }
        }
        return e;
      }
    }
    function Me(o, t) {
      if (!!o) {
        if (typeof o == "string")
          return ye(o, t);
        var e = Object.prototype.toString.call(o).slice(8, -1);
        if (e === "Object" && o.constructor && (e = o.constructor.name), e === "Map" || e === "Set")
          return Array.from(o);
        if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))
          return ye(o, t);
      }
    }
    function ye(o, t) {
      (t == null || t > o.length) && (t = o.length);
      for (var e = 0, i = new Array(t); e < t; e++)
        i[e] = o[e];
      return i;
    }
    function ot() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function nt() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var U = function(t, e, i) {
      var r = t.x, l = t.y, c = i.x, m = i.y, v = {
        "+": {
          x: r + c,
          y: l + m
        },
        "-": {
          x: r - c,
          y: l - m
        },
        "*": {
          x: r * c,
          y: l * m
        },
        "/": {
          x: r / c,
          y: l / m
        }
      };
      return v[e];
    }, ie = function(t) {
      return {
        x: t.left,
        y: t.top
      };
    }, je = function(t) {
      var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: t.x,
        top: t.y,
        right: t.x,
        bottom: t.y,
        width: e,
        height: e
      };
    }, st = function(t) {
      return {
        x: t,
        y: t
      };
    }, it = function(o, t, e) {
      window.addEventListener("resize", t), window.addEventListener("scroll", t), o.forEach(function(i, r) {
        e.observe(i, {
          childList: r !== 0,
          attributes: !0
        });
      });
    }, at = function(o) {
      var t = ge(o);
      return t.x || t.y ? !0 : o instanceof HTMLDocument ? o.body ? !!(o.body.scrollTop = 1) : !!(o.documentElement.scrollTop = 1) : !!(o.scrollTop = 1);
    }, lt = function(o) {
      var t = document.createElement("div");
      return t.style.position = "fixed", t.style.overflow = "hidden", t.style.pointerEvents = "none", t.style.zIndex = "999999999999999999", t.classList.add(o), t;
    }, ct = function(o) {
      var t = document.createElement("div");
      return t.style.position = "absolute", o || (t.style.background = "rgba(0, 0, 255, 0.1)", t.style.border = "1px solid rgba(0, 0, 255, 0.45)", t.style.display = "none", t.style.pointerEvents = "none"), t;
    }, ut = function(o, t) {
      var e;
      return function() {
        for (var i = arguments.length, r = new Array(i), l = 0; l < i; l++)
          r[l] = arguments[l];
        var c = function() {
          e = null, o.apply(void 0, r);
        };
        clearTimeout(e), e = setTimeout(c, t);
      };
    }, be = function() {
      var o, t, e, i;
      return {
        y: ((o = document.body) === null || o === void 0 ? void 0 : o.scrollTop) || ((t = document.documentElement) === null || t === void 0 ? void 0 : t.scrollTop) || 0,
        x: ((e = document.body) === null || e === void 0 ? void 0 : e.scrollLeft) || ((i = document.documentElement) === null || i === void 0 ? void 0 : i.scrollLeft) || 0
      };
    }, dt = function(o, t) {
      if (o instanceof Document)
        return {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      var e = o.getBoundingClientRect();
      return {
        top: e.top,
        left: e.left,
        bottom: e.bottom,
        right: e.right,
        width: (o.clientWidth || e.width) * t,
        height: (o.clientHeight || e.height) * t
      };
    }, ge = function(o) {
      return !o || o instanceof Document ? be() : {
        x: o.scrollLeft >= 0 ? o.scrollLeft : be().x,
        y: o.scrollTop >= 0 ? o.scrollTop : be().y
      };
    }, Ae = function(o) {
      var t = o.elementRect, e = o.containerRect, i = o.tolerance, r = i === void 0 ? {
        x: 0,
        y: 0
      } : i, l = [];
      return t.top - r.y < e.top && l.push("top"), t.left - r.x < e.left && l.push("left"), t.bottom + r.y > e.bottom && l.push("bottom"), t.right + r.y > e.right && l.push("right"), l;
    }, mt = function(o) {
      var t = o.event;
      return {
        x: t.clientX,
        y: t.clientY
      };
    }, ht = function(o) {
      var t = o.scrollAmount, e = o.initialPointerPos, i = o.pointerPos, r = {};
      return i.x > e.x - t.x ? (r.left = e.x - t.x, r.width = i.x - e.x + t.x) : (r.left = i.x, r.width = e.x - i.x - t.x), i.y > e.y - t.y ? (r.top = e.y - t.y, r.height = i.y - e.y + t.y) : (r.top = i.y, r.height = e.y - i.y - t.y), r;
    }, Ee = function(t) {
      var e = {
        x: 0,
        y: 0
      }, i = window.getComputedStyle(t);
      if (!i.transform || i.transform === "none")
        return e;
      if (i.transform.indexOf("3d") >= 0) {
        var r = i.transform.trim().match(/matrix3d\((.*?)\)/);
        if (r && r.length) {
          var l, c = (l = r[1]) === null || l === void 0 ? void 0 : l.split(",");
          e.x = parseInt(c[12]) || 0, e.y = parseInt(c[13]) || 0;
        }
        return e;
      } else {
        var m = i.transform.trim().match(/matrix\((.*?)\)/);
        if (m && m.length) {
          var v, S = (v = m[1]) === null || v === void 0 ? void 0 : v.split(",");
          e.x = parseInt(S[4]) || 0, e.y = parseInt(S[5]) || 0;
        }
        return e;
      }
    }, ft = function(t) {
      var e = t.style.transform;
      if (!e || e.indexOf("translate") < 0)
        return Ee(t);
      var i = {
        x: 0,
        y: 0
      }, r = e.trim().match(/translate[3dD]*?\(.*?\)/);
      if (r) {
        var l, c = (l = r[0]) === null || l === void 0 ? void 0 : l.split("(");
        if (c) {
          var m, v = (m = c[1]) === null || m === void 0 ? void 0 : m.split(",");
          i.x = parseInt(v[0]) || 0, i.y = parseInt(v[1]) || 0;
        }
      }
      return !i.x && !i.x ? Ee(t) : i;
    }, gt = function(t) {
      var e = t.style, i = {
        x: parseInt(e.left) || 0,
        y: parseInt(e.top) || 0
      };
      if (!i.x && !i.x) {
        var r = window.getComputedStyle(t);
        return {
          x: parseInt(r.left) || 0,
          y: parseInt(r.top) || 0
        };
      }
      return i;
    }, vt = function(o, t) {
      return t ? ft(o) : gt(o);
    }, pt = function(o) {
      var t = o.element, e = o.edges, i = o.elementRect, r = o.containerRect, l = o.elementPos, c = o.useTransform;
      e.includes("top") && de(t, {
        y: l.y + r.top - i.top,
        x: l.x
      }, c), e.includes("left") && de(t, {
        y: l.y,
        x: l.x + r.left - i.left
      }, c), e.includes("bottom") && de(t, {
        y: l.y + r.bottom - i.bottom,
        x: l.x
      }, c), e.includes("right") && de(t, {
        y: l.y,
        x: l.x + r.right - i.right
      }, c);
    }, Te = function(o) {
      var t = o.computedStyle, e = o.node, i = t.position, r = i === "absolute" || i === "relative" || i === "fixed";
      !(e instanceof HTMLDocument) && !r && (e.style.position = "relative");
    }, yt = function(o) {
      var t = o.shiftKey, e = o.keyboardDragSpeed, i = o.zoom, r = o.key, l = o.dragKeys, c = o.scrollDiff, m = o.canScroll, v = o.scrollCallback, S = {
        x: 0,
        y: 0
      }, b = t ? e * 4 * i : e * i;
      return l.left.includes(r) && (S.x = c.x || -b, !t && !c.x && m && v(["left"], e)), l.right.includes(r) && (S.x = c.x || b, !t && !c.x && m && v(["right"], e)), l.up.includes(r) && (S.y = c.y || -b, !t && !c.y && m && v(["top"], e)), l.down.includes(r) && (S.y = c.y || b, !t && !c.y && m && v(["bottom"], e)), S;
    }, bt = function(o) {
      var t = o.element, e = o.force, i = o.multiSelectionToggle, r = o.SelectedSet, l = o.hoverClassName;
      t.classList.contains(l) && !e || (r.has(t) ? i && r.delete(t) : r.add(t), t.classList.add(l));
    }, _t = function(o) {
      var t = o.element, e = o.force, i = o.SelectedSet, r = o.PrevSelectedSet, l = o.hoverClassName;
      if (!t.classList.contains(l) && !e)
        return !1;
      var c = i.has(t), m = r.has(t);
      c && !m ? i.delete(t) : !c && m && i.add(t), t.classList.remove(l);
    }, _e = function(o, t) {
      return o.left < t.right && o.right > t.left && o.top < t.bottom && o.bottom > t.top;
    }, Ve = function(o) {
      var t = o.element, e = o.posDirection, i = o.containerRect, r = o.useTransform, l = vt(t, r), c = U(l, "+", e);
      de(t, c, r);
      var m = t.getBoundingClientRect(), v = Ae({
        elementRect: m,
        containerRect: i
      });
      pt({
        element: t,
        edges: v,
        elementRect: m,
        containerRect: i,
        elementPos: c,
        useTransform: r
      });
    }, wt = function(o, t) {
      window.removeEventListener("resize", t), window.removeEventListener("scroll", t), o.disconnect();
    }, St = function(o, t, e) {
      if (!!t.length) {
        var i = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, r = o instanceof HTMLDocument ? i || document.body : o, l = t.includes("top") && r.scrollTop > 0, c = t.includes("bottom") && r.scrollTop < r.scrollHeight, m = t.includes("left") && r.scrollLeft > 0, v = t.includes("right") && r.scrollLeft < r.scrollWidth;
        l && (r.scrollTop -= 1 * e), c && (r.scrollTop += 1 * e), m && (r.scrollLeft -= 1 * e), v && (r.scrollLeft += 1 * e);
      }
    }, de = function(o, t, e) {
      if (e) {
        var i = o.style.transform;
        o.style.transform = "translate3d(".concat(t.x, "px,").concat(t.y, "px,1px) ").concat(i.replace(/translate.*?\)/g, ""));
      } else
        o.style.left = "".concat(t.x, "px"), o.style.top = "".concat(t.y, "px");
      return o;
    }, xt = function(o) {
      for (var t = o.subscribe, e = o.publish, i = o.Interaction, r = o.SelectedSet, l = {
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
          condition: function(b) {
            return b.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, c = function() {
        var b = V(v[m], 2), C = b[0], j = b[1];
        ["pre", !1].forEach(function(L) {
          return t(L ? "".concat(C, ":").concat(L) : C, function(F) {
            return j.forEach(function(N) {
              return (!N.condition || N.condition(F)) && e(L ? "".concat(L).concat(N.name) : N.name, f({
                items: r.elements,
                isDragging: i.isDragging
              }, F));
            });
          });
        });
      }, m = 0, v = Object.entries(l); m < v.length; m++)
        c();
    }, ae = function(o) {
      return o ? !Array.isArray(o) && (o instanceof HTMLElement || o instanceof SVGElement) ? [o] : M(o) : [];
    }, Ie = function(o, t) {
      o.style.left = "".concat(t.left, "px"), o.style.top = "".concat(t.top, "px"), o.style.width = "".concat(t.width, "px"), o.style.height = "".concat(t.height, "px");
    }, kt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.area, r = t.PS, l = t.zoom;
        a(this, o), n(this, "_modificationCallback", void 0), n(this, "_modificationObserver", void 0), n(this, "_zoom", void 0), n(this, "_node", void 0), n(this, "_parentNodes", void 0), n(this, "_computedStyle", void 0), n(this, "_computedBorder", void 0), n(this, "_rect", void 0), n(this, "setArea", function(c) {
          e._node = c, Te({
            computedStyle: e.computedStyle,
            node: e._node
          }), setTimeout(function() {
            e.PubSub.publish("Area:modified:pre", {
              item: e
            }), e.reset(), e.PubSub.publish("Area:modified", {
              item: e
            });
          });
        }), n(this, "start", function() {
          it(e.parentNodes, e._modificationCallback, e._modificationObserver);
        }), n(this, "reset", function() {
          e._computedStyle = void 0, e._rect = void 0, e._computedBorder = void 0, e._parentNodes = void 0;
        }), n(this, "stop", function() {
          wt(e._modificationObserver, e._modificationCallback), e.reset();
        }), n(this, "scroll", function(c, m) {
          var v = {
            scroll_directions: c,
            scroll_multiplier: m
          };
          e.PubSub.publish("Area:scroll:pre", v), St(e._node, c, m), e.PubSub.publish("Area:scroll", v);
        }), this._zoom = l, this.PubSub = r, this.setArea(i), this._modificationCallback = ut(function(c) {
          e.PubSub.publish("Area:modified:pre", {
            event: c,
            item: e
          }), e.reset(), e.PubSub.publish("Area:modified", {
            event: c,
            item: e
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return u(o, [{
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
          return this._rect ? this._rect : this._rect = dt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var e = function i(r) {
            var l, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, m = (l = r[c]) === null || l === void 0 ? void 0 : l.parentNode;
            return m ? (r.push(m), c++, i(r, c)) : r;
          };
          return this._parentNodes = e([this.HTMLNode]), this._parentNodes;
        }
      }]), o;
    }(), Dt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.dragKeys, l = t.draggability, c = t.keyboardDrag, m = t.keyboardDragSpeed, v = t.useTransform, S = t.zoom;
        a(this, o), n(this, "_useTransform", void 0), n(this, "_prevCursorPos", void 0), n(this, "_prevScrollPos", void 0), n(this, "_elements", []), n(this, "_draggability", void 0), n(this, "_dragKeys", void 0), n(this, "_dragKeysFlat", void 0), n(this, "_keyboardDrag", void 0), n(this, "_keyboardDragSpeed", void 0), n(this, "_zoom", void 0), n(this, "keyboardDrag", function(b) {
          var C = b.event, j = b.key;
          if (!(!e._keyboardDrag || !e._dragKeysFlat.includes(j) || !e.DS.SelectedSet.size || !e._draggability || e.DS.continue)) {
            var L = {
              event: C,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            e.DS.publish(["Interaction:start:pre", "Interaction:start"], L), e._elements = e.DS.getSelection(), e.handleZIndex(!0);
            var F = yt({
              shiftKey: e.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: e._keyboardDragSpeed,
              zoom: e._zoom,
              key: j,
              scrollCallback: e.DS.Area.scroll,
              scrollDiff: e._scrollDiff,
              canScroll: e.DS.stores.ScrollStore.canScroll,
              dragKeys: e._dragKeys
            });
            e._elements.forEach(function(N) {
              return Ve({
                element: N,
                posDirection: F,
                containerRect: e.DS.SelectorArea.rect,
                useTransform: e._useTransform
              });
            }), e.DS.publish(["Interaction:update:pre", "Interaction:update"], L);
          }
        }), n(this, "keyboardEnd", function(b) {
          var C = b.event, j = b.key;
          if (!(!e._keyboardDrag || !e._dragKeysFlat.includes(j) || !e.DS.SelectedSet.size || !e._draggability)) {
            var L = {
              event: C,
              isDragging: e._draggability,
              isDraggingKeyboard: !0
            };
            e.DS.publish(["Interaction:end:pre", "Interaction:end"], L);
          }
        }), n(this, "start", function(b) {
          var C = b.isDragging, j = b.isDraggingKeyboard;
          !C || j || (e._prevCursorPos = null, e._prevScrollPos = null, e._elements = e.DS.getSelection(), e.handleZIndex(!0));
        }), n(this, "stop", function(b) {
          b != null && b.isKeyboard || (e._prevCursorPos = null, e._prevScrollPos = null, e.handleZIndex(!1), e._elements = []);
        }), n(this, "update", function(b) {
          var C = b.isDragging, j = b.isDraggingKeyboard;
          if (!(!C || !e._elements.length || j || e.DS.continue)) {
            var L = U(e._cursorDiff, "+", e._scrollDiff);
            e._elements.forEach(function(F) {
              return Ve({
                element: F,
                posDirection: L,
                containerRect: e.DS.SelectorArea.rect,
                useTransform: e._useTransform
              });
            });
          }
        }), n(this, "handleZIndex", function(b) {
          e._elements.forEach(function(C) {
            return C.style.zIndex = "".concat((parseInt(C.style.zIndex) || 0) + b ? 9999 : -9998);
          });
        }), this.DS = i, this._useTransform = v, this._keyboardDragSpeed = m, this._keyboardDrag = c, this._zoom = S, this._draggability = l, this._dragKeys = {
          up: r.up.map(function(b) {
            return b.toLowerCase();
          }),
          down: r.down.map(function(b) {
            return b.toLowerCase();
          }),
          left: r.left.map(function(b) {
            return b.toLowerCase();
          }),
          right: r.right.map(function(b) {
            return b.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(M(this._dragKeys.up), M(this._dragKeys.down), M(this._dragKeys.left), M(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return u(o, [{
        key: "_cursorDiff",
        get: function() {
          var e = this.DS.stores.PointerStore.currentVal, i = this._prevCursorPos ? U(e, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = e, i;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var e = this.DS.stores.ScrollStore.currentVal, i = this._prevScrollPos ? U(e, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = e, i;
        }
      }]), o;
    }(), $t = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.areaElement, l = t.draggability, c = t.immediateDrag, m = t.selectableClass;
        a(this, o), n(this, "_areaElement", void 0), n(this, "_draggability", void 0), n(this, "_immediateDrag", void 0), n(this, "_selectableClass", void 0), n(this, "isInteracting", void 0), n(this, "isDragging", void 0), n(this, "init", function() {
          return e.DS.publish("Interaction:init:pre", {});
        }), n(this, "_init", function() {
          e.stop(), e._areaElement.addEventListener("mousedown", e.start), e._areaElement.addEventListener("touchstart", e.start, {
            passive: !1
          }), e.DS.publish("Interaction:init", {});
        }), n(this, "start", function(v) {
          return e.DS.publish("Interaction:start:pre", {
            event: v,
            isDragging: e.isDragging
          });
        }), n(this, "_start", function(v) {
          v.type === "touchstart" && v.preventDefault(), e._canInteract(v) && (e.isInteracting = !0, e.isDragging = e.isDragEvent(v), e.DS.publish("Interaction:start", {
            event: v,
            isDragging: e.isDragging
          }), document.addEventListener("mouseup", e.reset), document.addEventListener("touchend", e.reset));
        }), n(this, "isDragEvent", function(v) {
          var S = v.target.closest(".".concat(e._selectableClass));
          return !e._draggability || e.DS.stores.KeyStore.isMultiSelectKeyPressed(v) || !S ? !1 : (e._immediateDrag && (e.DS.SelectedSet.size ? e.DS.SelectedSet.has(S) || (e.DS.SelectedSet.clear(), e.DS.SelectedSet.add(
            S
          )) : e.DS.SelectedSet.add(
            S
          )), !!e.DS.SelectedSet.has(S));
        }), n(this, "onClick", function(v) {
          var S = v.event;
          if (!!e._canInteract(S) && !(S.detail > 0)) {
            var b = e.DS, C = b.stores, j = C.PointerStore, L = C.KeyStore, F = b.SelectableSet, N = b.SelectedSet;
            j.start(S);
            var le = S.target;
            !F.has(le) || (L.isMultiSelectKeyPressed(S) || N.clear(), N.toggle(le), e.reset());
          }
        }), n(this, "stop", function() {
          e.isInteracting = !1, e.isDragging = !1, e._areaElement.removeEventListener("mousedown", e.start), e._areaElement.removeEventListener("touchstart", e.start, {
            passive: !1
          }), document.removeEventListener("mouseup", e.reset), document.removeEventListener("touchend", e.reset);
        }), n(this, "update", function(v) {
          var S = v.event, b = v.scroll_directions, C = v.scroll_multiplier;
          e.isInteracting && e.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: S,
            scroll_directions: b,
            scroll_multiplier: C,
            isDragging: e.isDragging
          });
        }), n(this, "reset", function(v) {
          return e.DS.publish("Interaction:end:pre", {
            event: v,
            isDragging: e.isDragging
          });
        }), n(this, "_reset", function(v) {
          var S = e.isDragging;
          e.stop(), e.init(), e.DS.publish("Interaction:end", {
            event: v,
            isDragging: S
          });
        }), this._areaElement = r, this._draggability = l, this._immediateDrag = c, this._selectableClass = m, this.DS = i, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(v) {
          var S = v.event;
          return e.start(S);
        }), this.DS.subscribe("Interaction:start:pre", function(v) {
          var S = v.event;
          return e._start(S);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(v) {
          var S = v.event;
          return e._reset(S);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return u(o, [{
        key: "_canInteract",
        value: function(e) {
          var i = e.clientX === 0 && e.clientY === 0 && e.detail === 0 && e.target;
          return !(e.button === 2 || this.isInteracting || e.target && !this.DS.SelectorArea.isInside(
            e.target
          ) || !i && !this.DS.SelectorArea.isClicked(e));
        }
      }]), o;
    }(), Ct = function o(t) {
      var e = this, i = t.DS;
      a(this, o), n(this, "subscribers", {}), n(this, "subscribe", function(r, l) {
        return Array.isArray(e.subscribers[r]) || (e.subscribers[r] = []), e.subscribers[r].push(l), e.subscribers[r].length - 1;
      }), n(this, "unsubscribe", function(r, l, c) {
        c >= 0 ? e.subscribers[r].splice(c, 1) : l && (e.subscribers[r] = e.subscribers[r].filter(function(m) {
          return m !== l;
        }));
      }), n(this, "publish", function(r, l) {
        Array.isArray(r) ? r.forEach(function(c) {
          return e._publish(c, l);
        }) : e._publish(r, l);
      }), n(this, "_publish", function(r, l) {
        var c = e.subscribers[r];
        !Array.isArray(c) || (r.includes(":pre") ? e._handlePrePublish(c, l) : e._handlePublish(c, l));
      }), n(this, "_handlePublish", function(r, l) {
        for (var c = 0, m = r.length; c < m; c++) {
          if (e.DS.stopped)
            return;
          r[c](l);
        }
      }), n(this, "_handlePrePublish", function(r, l) {
        for (var c = r.length; c--; ) {
          if (e.DS.stopped)
            return;
          r[c](l);
        }
      }), this.DS = i;
    }, Pt = /* @__PURE__ */ function(o) {
      g(e, o);
      var t = ue(e);
      function e(i) {
        var r, l = i.elements, c = i.className, m = i.hoverClassName, v = i.draggability, S = i.useTransform, b = i.DS;
        return a(this, e), r = t.call(this), n(O(r), "_initElements", void 0), n(O(r), "_className", void 0), n(O(r), "_hoverClassName", void 0), n(O(r), "_useTransform", void 0), n(O(r), "_draggability", void 0), n(O(r), "init", function() {
          return r._initElements.forEach(function(C) {
            return r.add(C);
          });
        }), n(O(r), "clear", function() {
          return r.forEach(function(C) {
            return r.delete(C);
          });
        }), n(O(r), "_onClick", function(C) {
          return r.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: C
          });
        }), n(O(r), "_onPointer", function(C) {
          return r.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: C
          });
        }), n(O(r), "addAll", function(C) {
          return C.forEach(function(j) {
            return r.add(j);
          });
        }), n(O(r), "deleteAll", function(C) {
          return C.forEach(function(j) {
            return r.delete(j);
          });
        }), r.DS = b, r._initElements = ae(l), r._className = c, r._hoverClassName = m, r._useTransform = S, r._draggability = v, r.DS.subscribe("Interaction:init", r.init), r;
      }
      return u(e, [{
        key: "add",
        value: function(r) {
          return r.classList.add(this._className), r.addEventListener("click", this._onClick), r.addEventListener("mousedown", this._onPointer), r.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Te({
            computedStyle: window.getComputedStyle(r),
            node: r
          }), P(_(e.prototype), "add", this).call(this, r);
        }
      }, {
        key: "delete",
        value: function(r) {
          return r.classList.remove(this._className), r.classList.remove(this._hoverClassName), r.removeEventListener("click", this._onClick), r.removeEventListener("mousedown", this._onPointer), r.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), P(_(e.prototype), "delete", this).call(this, r);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), e;
    }(/* @__PURE__ */ B(Set)), Mt = /* @__PURE__ */ function(o) {
      g(e, o);
      var t = ue(e);
      function e(i) {
        var r, l = i.className, c = i.DS;
        return a(this, e), r = t.call(this), n(O(r), "_className", void 0), n(O(r), "clear", function() {
          return r.forEach(function(m) {
            return r.delete(m);
          });
        }), n(O(r), "addAll", function(m) {
          return m.forEach(function(v) {
            return r.add(v);
          });
        }), n(O(r), "deleteAll", function(m) {
          return m.forEach(function(v) {
            return r.delete(v);
          });
        }), r.DS = c, r._className = l, r;
      }
      return u(e, [{
        key: "add",
        value: function(r) {
          if (!P(_(e.prototype), "has", this).call(this, r)) {
            var l = {
              items: this.elements,
              item: r
            };
            return this.DS.publish("Selected:added:pre", l), P(_(e.prototype), "add", this).call(this, r), r.classList.add(this._className), r.style.zIndex = "".concat((parseInt(r.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", l), this;
          }
        }
      }, {
        key: "delete",
        value: function(r) {
          if (!!P(_(e.prototype), "has", this).call(this, r)) {
            var l = {
              items: this.elements,
              item: r
            };
            this.DS.publish("Selected:removed:pre", l);
            var c = P(_(e.prototype), "delete", this).call(this, r);
            return r.classList.remove(this._className), r.style.zIndex = "".concat((parseInt(r.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", l), c;
          }
        }
      }, {
        key: "toggle",
        value: function(r) {
          return this.has(r) ? this.delete(r) : this.add(r), r;
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), e;
    }(/* @__PURE__ */ B(Set)), jt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.hoverClassName, l = t.multiSelectToggling;
        a(this, o), n(this, "_prevSelectedSet", void 0), n(this, "_hoverClassName", void 0), n(this, "_multiSelectToggling", void 0), n(this, "start", function(c) {
          var m = c.event, v = c.isDragging;
          v || (e._storePrevious(m), e._handleInsideSelection(!0, m));
        }), n(this, "update", function(c) {
          var m = c.isDragging;
          m || e.DS.continue || e._handleInsideSelection();
        }), n(this, "_handleInsideSelection", function(c, m) {
          for (var v = e.DS, S = v.SelectableSet, b = v.SelectorArea, C = v.Selector, j = S.elements.map(function(te) {
            return [te, te.getBoundingClientRect()];
          }), L = [], F = [], N = 0, le = j.length; N < le; N++)
            !b.isInside(j[N][0], j[N][1]) || (_e(j[N][1], C.rect) ? L.push(j[N][0]) : F.push(j[N][0]));
          var ve = e.DS.stores.KeyStore.isMultiSelectKeyPressed(m) && e._multiSelectToggling;
          e.DS.continue || (L.forEach(function(te) {
            return bt({
              element: te,
              force: c,
              multiSelectionToggle: ve,
              SelectedSet: e.DS.SelectedSet,
              hoverClassName: e._hoverClassName
            });
          }), F.forEach(function(te) {
            return _t({
              element: te,
              force: c,
              SelectedSet: e.DS.SelectedSet,
              hoverClassName: e._hoverClassName,
              PrevSelectedSet: e._prevSelectedSet
            });
          }));
        }), this._hoverClassName = r, this._multiSelectToggling = l, this.DS = i, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return u(o, [{
        key: "_storePrevious",
        value: function(e) {
          var i = this.DS, r = i.stores.KeyStore, l = i.SelectedSet;
          r.isMultiSelectKeyPressed(e) ? this._prevSelectedSet = new Set(l) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), o;
    }(), At = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.selector, l = t.selectorClass, c = t.customStyles;
        a(this, o), n(this, "_rect", void 0), n(this, "start", function(m) {
          var v = m.isDragging;
          if (!v) {
            var S = e.DS.stores.PointerStore, b = S.initialValArea;
            Ie(e.HTMLNode, je(b, 1)), e.HTMLNode.style.display = "block", e._rect = null;
          }
        }), n(this, "stop", function() {
          e.HTMLNode.style.width = "0", e.HTMLNode.style.height = "0", e.HTMLNode.style.display = "none";
        }), n(this, "update", function(m) {
          var v = m.isDragging;
          if (!(v || e.DS.continue)) {
            var S = e.DS.stores, b = S.ScrollStore, C = S.PointerStore, j = ht({
              scrollAmount: b.scrollAmount,
              initialPointerPos: C.initialValArea,
              pointerPos: C.currentValArea
            });
            Ie(e.HTMLNode, j), e._rect = null;
          }
        }), this.DS = i, this.HTMLNode = r || ct(c), this.HTMLNode.classList.add(l), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return u(o, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), o;
    }(), Et = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.selectorAreaClass, l = t.autoScrollSpeed, c = t.overflowTolerance;
        a(this, o), n(this, "_autoScrollSpeed", void 0), n(this, "_scrollInterval", void 0), n(this, "_rect", void 0), n(this, "currentEdges", []), n(this, "_overflowTolerance", void 0), n(this, "start", function() {
          return e.applyElements("append");
        }), n(this, "applyElements", function() {
          var m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", v = document.body ? "body" : "documentElement", S = "".concat(m, "Child");
          e.HTMLNode[S](e.DS.Selector.HTMLNode), document[v][S](e.HTMLNode);
        }), n(this, "updatePos", function() {
          e._rect = null;
          var m = e.DS.Area.rect, v = e.DS.Area.computedBorder, S = e.HTMLNode.style, b = "".concat(m.top + v.top, "px"), C = "".concat(m.left + v.left, "px"), j = "".concat(m.width, "px"), L = "".concat(m.height, "px");
          S.top !== b && (S.top = b), S.left !== C && (S.left = C), S.width !== j && (S.width = j), S.height !== L && (S.height = L);
        }), n(this, "stop", function(m) {
          e.stopAutoScroll(), m && e.applyElements("remove");
        }), n(this, "startAutoScroll", function() {
          e.currentEdges = [], e._scrollInterval = setInterval(function() {
            return e.handleAutoScroll();
          }, 16);
        }), n(this, "handleAutoScroll", function() {
          if (!e.DS.continue) {
            var m = e.DS, v = m.stores.PointerStore, S = m.Area;
            e.currentEdges = Ae({
              elementRect: je(v.currentVal),
              containerRect: e.rect,
              tolerance: e._overflowTolerance
            }), e.currentEdges.length && S.scroll(e.currentEdges, e._autoScrollSpeed);
          }
        }), n(this, "stopAutoScroll", function() {
          e.currentEdges = [], clearInterval(e._scrollInterval);
        }), n(this, "isInside", function(m, v) {
          return e.DS.Area.HTMLNode.contains(m) && e.DS.stores.ScrollStore.canScroll ? !0 : _e(e.rect, v || m.getBoundingClientRect());
        }), this._autoScrollSpeed = l, this._overflowTolerance = c, this.DS = i, this.HTMLNode = lt(r), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          e.updatePos(), e.stopAutoScroll();
        });
      }
      return u(o, [{
        key: "isClicked",
        value: function(e) {
          var i = this.DS.stores.PointerStore, r = e ? i.getPointerPosition(e) : i.initialVal;
          return _e({
            left: r.x,
            top: r.y,
            right: r.x,
            bottom: r.y
          }, this.rect);
        }
      }, {
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), o;
    }(), Tt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.multiSelectKeys, l = t.multiSelectMode;
        a(this, o), n(this, "_multiSelectMode", void 0), n(this, "_multiSelectKeys", void 0), n(this, "_currentValues", /* @__PURE__ */ new Set()), n(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), n(this, "init", function() {
          document.addEventListener("keydown", e.keydown), document.addEventListener("keyup", e.keyup), window.addEventListener("blur", e.reset);
        }), n(this, "keydown", function(c) {
          var m = c.key.toLowerCase();
          e.DS.publish("KeyStore:down:pre", {
            event: c,
            key: m
          }), e._currentValues.add(m), e.DS.publish("KeyStore:down", {
            event: c,
            key: m
          });
        }), n(this, "keyup", function(c) {
          var m = c.key.toLowerCase();
          e.DS.publish("KeyStore:up:pre", {
            event: c,
            key: m
          }), e._currentValues.delete(m), e.DS.publish("KeyStore:up", {
            event: c,
            key: m
          });
        }), n(this, "stop", function() {
          document.removeEventListener("keydown", e.keydown), document.removeEventListener("keyup", e.reset), window.removeEventListener("blur", e.reset), e.reset();
        }), n(this, "reset", function() {
          return e._currentValues.clear();
        }), this.DS = i, this._multiSelectMode = l, this._multiSelectKeys = r.map(function(c) {
          var m = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, v = m[c];
          return v ? (console.warn("[DragSelect] ".concat(c, ' is deprecated. Use "').concat(v, '" instead. Act Now!. See docs for more info')), v.toLowerCase()) : c.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return u(o, [{
        key: "isMultiSelectKeyPressed",
        value: function(e) {
          var i = this;
          return !!(this._multiSelectMode || this.currentValues.some(function(r) {
            return i._multiSelectKeys.includes(r);
          }) || e && this._multiSelectKeys.some(function(r) {
            return e[i._keyMapping[r]];
          }));
        }
      }, {
        key: "currentValues",
        get: function() {
          return Array.from(this._currentValues.values());
        }
      }]), o;
    }(), Vt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS;
        a(this, o), n(this, "_isMouseInteraction", !1), n(this, "_initialValArea", void 0), n(this, "_currentValArea", void 0), n(this, "_lastValArea", void 0), n(this, "_initialVal", void 0), n(this, "_currentVal", void 0), n(this, "_lastVal", void 0), n(this, "_lastTouch", void 0), n(this, "init", function() {
          document.addEventListener("mousemove", e.update), document.addEventListener("touchmove", e.update, {
            passive: !1
          });
        }), n(this, "getPointerPosition", function(r) {
          return mt({
            event: e._normalizedEvent(r)
          });
        }), n(this, "update", function(r) {
          !r || (e.DS.publish("PointerStore:updated:pre", {
            event: r
          }), e.currentVal = e.getPointerPosition(r), e._isMouseInteraction && e.DS.publish("PointerStore:updated", {
            event: r
          }));
        }), n(this, "stop", function() {
          document.removeEventListener("mousemove", e.update), document.removeEventListener("touchmove", e.update, {
            passive: !1
          }), setTimeout(function() {
            return e._isMouseInteraction = !1;
          }, 100);
        }), n(this, "reset", function(r) {
          !r || (e.currentVal = e.lastVal = e.getPointerPosition(r), e.stop(), e.init());
        }), this.DS = i, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(r) {
          var l = r.event;
          return e.start(l);
        }), this.DS.subscribe("Interaction:end", function(r) {
          var l = r.event;
          return e.reset(l);
        });
      }
      return u(o, [{
        key: "start",
        value: function(e) {
          !e || (this._isMouseInteraction = !0, this.currentVal = this.initialVal = this.getPointerPosition(e));
        }
      }, {
        key: "_normalizedEvent",
        value: function(e) {
          return "touches" in e && e.type !== "touchend" && (this._lastTouch = e), "touches" in e ? this._lastTouch.touches[0] : e;
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
        set: function(e) {
          this._initialVal = e, this._initialValArea = e && U(e, "-", U(ie(this.DS.Area.rect), "+", ie(this.DS.Area.computedBorder)));
        }
      }, {
        key: "currentVal",
        get: function() {
          return this._currentVal ? this._currentVal : {
            x: 0,
            y: 0
          };
        },
        set: function(e) {
          this._currentVal = e, this._currentValArea = e && U(e, "-", U(ie(this.DS.Area.rect), "+", ie(this.DS.Area.computedBorder)));
        }
      }, {
        key: "lastVal",
        get: function() {
          return this._lastVal ? this._lastVal : {
            x: 0,
            y: 0
          };
        },
        set: function(e) {
          this._lastVal = e, this._lastValArea = e && U(e, "-", U(ie(this.DS.Area.rect), "+", ie(this.DS.Area.computedBorder)));
        }
      }]), o;
    }(), It = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.areaElement, l = t.zoom;
        a(this, o), n(this, "_initialVal", void 0), n(this, "_currentVal", void 0), n(this, "_areaElement", void 0), n(this, "_canScroll", void 0), n(this, "init", function() {
          return e._areaElement.addEventListener("scroll", e.update);
        }), n(this, "start", function() {
          e._currentVal = e._initialVal = ge(e._areaElement), e._areaElement.addEventListener("scroll", e.update);
        }), n(this, "update", function() {
          return e._currentVal = ge(e._areaElement);
        }), n(this, "stop", function() {
          e._areaElement.removeEventListener("scroll", e.update), e._initialVal = {
            x: 0,
            y: 0
          }, e._canScroll = null;
        }), n(this, "reset", function() {
          e.stop(), e.start();
        }), this._areaElement = r, this.DS = i, this.zoom = l, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return e.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return e.reset();
        });
      }
      return u(o, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = at(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var e = U(this.currentVal, "-", this.initialVal), i = st(this.zoom), r = U(U(e, "*", i), "-", e);
          return {
            x: e.x + r.x,
            y: e.y + r.y
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
          return this._currentVal || (this._currentVal = ge(this._areaElement)), this._currentVal;
        }
      }]), o;
    }(), Ot = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.area, r = i === void 0 ? document : i, l = t.selectables, c = l === void 0 ? [] : l, m = t.autoScrollSpeed, v = m === void 0 ? 5 : m, S = t.overflowTolerance, b = S === void 0 ? {
          x: 25,
          y: 25
        } : S, C = t.zoom, j = C === void 0 ? 1 : C, L = t.customStyles, F = L === void 0 ? !1 : L, N = t.multiSelectMode, le = N === void 0 ? !1 : N, ve = t.multiSelectToggling, te = ve === void 0 ? !0 : ve, Oe = t.multiSelectKeys, Lt = Oe === void 0 ? ["Control", "Shift", "Meta"] : Oe, Le = t.selector, zt = Le === void 0 ? void 0 : Le, ze = t.draggability, we = ze === void 0 ? !0 : ze, Ne = t.immediateDrag, Nt = Ne === void 0 ? !0 : Ne, Ke = t.keyboardDrag, Kt = Ke === void 0 ? !0 : Ke, Bt = t.dragKeys, Be = t.keyboardDragSpeed, Ht = Be === void 0 ? 10 : Be, He = t.useTransform, Re = He === void 0 ? !0 : He, Ue = t.hoverClass, Fe = Ue === void 0 ? "ds-hover" : Ue, qe = t.selectableClass, We = qe === void 0 ? "ds-selectable" : qe, Ye = t.selectedClass, Rt = Ye === void 0 ? "ds-selected" : Ye, Je = t.selectorClass, Ut = Je === void 0 ? "ds-selector" : Je, Ze = t.selectorAreaClass, Ft = Ze === void 0 ? "ds-selector-area" : Ze, qt = t.callback, Wt = t.onDragMove, Yt = t.onDragStartBegin, Jt = t.onDragStart, Zt = t.onElementSelect, Xt = t.onElementUnselect;
        a(this, o), n(this, "continue", !1), n(this, "start", function() {
          e.stopped = !1, e.Interaction.init();
        }), n(this, "break", function() {
          return e.continue = !0;
        }), n(this, "getSelection", function() {
          return e.SelectedSet.elements;
        }), n(this, "getSelectables", function() {
          return e.SelectableSet.elements;
        }), n(this, "getInitialCursorPosition", function() {
          return e.stores.PointerStore.initialVal;
        }), n(this, "getCurrentCursorPosition", function() {
          return e.stores.PointerStore.currentVal;
        }), n(this, "getPreviousCursorPosition", function() {
          return e.stores.PointerStore.lastVal;
        }), n(this, "getInitialCursorPositionArea", function() {
          return e.stores.PointerStore.initialValArea;
        }), n(this, "getCurrentCursorPositionArea", function() {
          return e.stores.PointerStore.currentValArea;
        }), n(this, "getPreviousCursorPositionArea", function() {
          return e.stores.PointerStore.lastValArea;
        }), n(this, "isMultiSelect", function(Gt) {
          return e.stores.KeyStore.isMultiSelectKeyPressed(Gt);
        }), n(this, "isDragging", function() {
          return e.Interaction.isDragging;
        }), this.PubSub = new Ct({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: qt,
          onDragMove: Wt,
          onDragStart: Jt,
          onDragStartBegin: Yt,
          onElementSelect: Zt,
          onElementUnselect: Xt
        }), this.stores = {
          PointerStore: new Vt({
            DS: this
          }),
          ScrollStore: new It({
            DS: this,
            areaElement: r,
            zoom: j
          }),
          KeyStore: new Tt({
            DS: this,
            multiSelectKeys: Lt,
            multiSelectMode: le
          })
        }, this.Area = new kt({
          area: r,
          PS: this.PubSub,
          zoom: j
        }), this.Selector = new At({
          DS: this,
          selector: zt,
          selectorClass: Ut,
          customStyles: F
        }), this.SelectorArea = new Et({
          DS: this,
          selectorAreaClass: Ft,
          autoScrollSpeed: v,
          overflowTolerance: b
        }), this.SelectableSet = new Pt({
          elements: c,
          DS: this,
          className: We,
          hoverClassName: Fe,
          useTransform: Re,
          draggability: we
        }), this.SelectedSet = new Mt({
          DS: this,
          className: Rt
        }), this.Selection = new jt({
          DS: this,
          hoverClassName: Fe,
          multiSelectToggling: te
        }), this.Drag = new Dt({
          DS: this,
          draggability: we,
          useTransform: Re,
          keyboardDrag: Kt,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, Bt),
          zoom: j,
          keyboardDragSpeed: Ht
        }), this.Interaction = new $t({
          areaElement: r,
          DS: this,
          draggability: we,
          immediateDrag: Nt,
          selectableClass: We
        }), xt({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return e.continue = !1;
        }), this.start();
      }
      return u(o, [{
        key: "_callbacksTemp",
        value: function(e) {
          var i = e.callback, r = e.onDragMove, l = e.onDragStart, c = e.onDragStartBegin, m = e.onElementSelect, v = e.onElementUnselect, S = function(C, j) {
            return console.warn("[DragSelect] ".concat(C, ' is deprecated. Use DragSelect.subscribe("').concat(j, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          i && (S("callback", "callback"), this.subscribe("callback", function(b) {
            var C = b.items;
            b.item;
            var j = b.event;
            return i(C, j);
          })), r && (S("onDragMove", "dragmove"), this.subscribe("dragmove", function(b) {
            b.items, b.item;
            var C = b.event;
            return r(C);
          })), l && (S("onDragStart", "dragstart"), this.subscribe("dragstart", function(b) {
            b.items, b.item;
            var C = b.event;
            return l(C);
          })), c && (S("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(b) {
            b.items, b.item;
            var C = b.event;
            return c(C);
          })), m && (S("onElementSelect", "elementselect"), this.subscribe("elementselect", function(b) {
            b.items;
            var C = b.item, j = b.event;
            return m(C, j);
          })), v && (S("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(b) {
            b.items;
            var C = b.item, j = b.event;
            return v(C, j);
          }));
        }
      }, {
        key: "stop",
        value: function() {
          var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          r && this.publish("callback", {
            items: this.getSelection()
          }), this.Interaction.stop(), this.Area.stop(), this.Drag.stop(), this.Selector.stop(), this.SelectorArea.stop(e), this.stores.KeyStore.stop(), this.stores.PointerStore.stop(), this.stores.ScrollStore.stop(), e && this.SelectableSet.clear(), i && this.SelectedSet.clear(), this.stopped = !0;
        }
      }, {
        key: "addSelection",
        value: function(e) {
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.addAll(ae(e)), r || this.addSelectables(e), i && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(e) {
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(ae(e)), r && this.removeSelectables(e), i && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(e) {
          var i = this, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return ae(e).forEach(function(c) {
            return i.SelectedSet.has(c) ? i.removeSelection(e, r, l) : i.addSelection(e, r, l);
          }), r && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "setSelection",
        value: function(e) {
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.clearSelection(), this.addSelection(e, i, r), this.getSelection();
        }
      }, {
        key: "clearSelection",
        value: function() {
          var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
          return this.SelectedSet.clear(), e && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "addSelectables",
        value: function(e) {
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = ae(e);
          return this.SelectableSet.addAll(r), i && this.SelectedSet.addAll(r), e;
        }
      }, {
        key: "setSelectables",
        value: function(e) {
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.removeSelectables(e, i), this.addSelectables(e, r);
        }
      }, {
        key: "removeSelectables",
        value: function(e) {
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return this.SelectableSet.deleteAll(ae(e)), i && this.removeSelection(e), e;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var r = i ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), l = e ? i ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : i ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return U(r, "-", l);
        }
      }]), o;
    }();
    return Ot;
  });
})(rt);
const Tr = rt.exports, Vr = (h, d, a, p, u) => (d = Math, a = d.log, p = 1024, u = a(h) / a(p) | 0, h / d.pow(p, u)).toFixed(0) + " " + (u ? "KMGTPEZY"[--u] + "iB" : "B"), Ir = (h, d = "en-US") => new Date(h * 1e3).toLocaleString(d), Or = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Lr = /* @__PURE__ */ s("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), zr = [
  Lr
], Nr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Kr = /* @__PURE__ */ s("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), Br = [
  Kr
], Hr = {
  name: "VFSortIcon"
}, ke = /* @__PURE__ */ Object.assign(Hr, {
  props: { direction: String },
  setup(h) {
    return (d, a) => (y(), k("div", null, [
      h.direction == "down" ? (y(), k("svg", Or, zr)) : W("", !0),
      h.direction == "up" ? (y(), k("svg", Nr, Br)) : W("", !0)
    ]));
  }
}), Rr = { class: "relative h-full" }, Ur = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, Fr = /* @__PURE__ */ ce(" Name "), qr = /* @__PURE__ */ ce(" Size "), Wr = /* @__PURE__ */ ce(" Date "), Yr = { class: "absolute" }, Jr = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), Zr = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Xr = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Gr = { class: "grid grid-cols-12 items-center" }, Qr = { class: "flex col-span-7 items-center" }, eo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, to = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ro = [
  to
], oo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, no = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), so = [
  no
], io = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, ao = { class: "col-span-2 text-center" }, lo = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, co = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], uo = { class: "relative" }, mo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ho = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), fo = [
  ho
], go = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vo = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), po = [
  vo
], yo = { class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500" }, bo = { class: "break-all" }, _o = {
  name: "VFExplorer"
}, wo = /* @__PURE__ */ Object.assign(_o, {
  props: {
    view: String,
    data: Object
  },
  setup(h) {
    const d = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = (P) => P == null ? void 0 : P.substring(0, 3), n = (P) => P.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), w = A(null), f = A(null), g = A(0), _ = A(null), x = (P) => {
      P.type == "dir" ? a.emit("vf-fetch", { q: "index", adapter: d.data.adapter, path: P.path }) : a.emit("vf-modal-show", { type: "preview", adapter: d.data.adapter, item: P });
    }, $ = pe({ active: !1, column: "", order: "" }), D = (P = !0) => {
      let V = [...d.data.files], M = $.column, q = $.order == "asc" ? 1 : -1;
      if (!P)
        return V;
      const z = (Q, ee) => typeof Q == "string" && typeof ee == "string" ? Q.toLowerCase().localeCompare(ee.toLowerCase()) : Q < ee ? -1 : Q > ee ? 1 : 0;
      return $.active && (V = V.slice().sort((Q, ee) => z(Q[M], ee[M]) * q)), V;
    }, I = (P) => {
      $.active && $.column == P ? ($.active = $.order == "asc", $.column = P, $.order = "desc") : ($.active = !0, $.column = P, $.order = "asc");
    }, B = () => _.value.getSelection().map((P) => JSON.parse(P.dataset.item)), O = (P, V) => {
      if (P.altKey || P.ctrlKey || P.metaKey)
        return P.preventDefault(), !1;
      P.dataTransfer.setDragImage(f.value, 0, 15), P.dataTransfer.effectAllowed = "all", P.dataTransfer.dropEffect = "copy", P.dataTransfer.setData("items", JSON.stringify(B()));
    }, oe = (P, V) => {
      P.preventDefault();
      let M = JSON.parse(P.dataTransfer.getData("items"));
      if (M.find((q) => q.storage != p("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      a.emit("vf-modal-show", { type: "move", items: { from: M, to: V } });
    }, ue = (P, V) => {
      P.preventDefault(), !V || V.type !== "dir" || _.value.getSelection().find((M) => M == P.currentTarget) ? (P.dataTransfer.dropEffect = "none", P.dataTransfer.effectAllowed = "none") : P.dataTransfer.dropEffect = "copy";
    };
    return Y(() => {
      _.value = new Tr({
        area: w.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), a.on("vf-explorer-update", () => Ce(() => {
        _.value.clearSelection(), _.value.setSelectables(document.getElementsByClassName("vf-item"));
      })), _.value.subscribe("predragstart", ({ event: P, isDragging: V }) => {
        if (V)
          g.value = _.value.getSelection().length, _.value.break();
        else {
          const M = P.target.offsetWidth - P.offsetX, q = P.target.offsetHeight - P.offsetY;
          M < 15 && q < 15 && (_.value.clearSelection(), _.value.break());
        }
      }), _.value.subscribe("predragmove", ({ isDragging: P }) => {
        P && _.value.break();
      }), _.value.subscribe("callback", ({ items: P, event: V, isDragging: M }) => {
        a.emit("vf-nodes-selected", B()), g.value = _.value.getSelection().length;
      });
    }), Y(() => {
      tt(() => d.view, () => a.emit("vf-explorer-update"));
    }), (P, V) => (y(), k("div", Rr, [
      h.view == "list" ? (y(), k("div", Ur, [
        s("div", {
          onClick: V[0] || (V[0] = (M) => I("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center pl-1"
        }, [
          Fr,
          X(re(ke, {
            direction: $.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [Se, $.active && $.column == "basename"]
          ])
        ]),
        s("div", {
          onClick: V[1] || (V[1] = (M) => I("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          qr,
          X(re(ke, {
            direction: $.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [Se, $.active && $.column == "file_size"]
          ])
        ]),
        s("div", {
          onClick: V[2] || (V[2] = (M) => I("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center"
        }, [
          Wr,
          X(re(ke, {
            direction: $.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [Se, $.active && $.column == "last_modified"]
          ])
        ])
      ])) : W("", !0),
      s("div", Yr, [
        s("div", {
          ref: (M) => f.value = M,
          class: "absolute -z-50"
        }, [
          Jr,
          s("div", Zr, E(g.value), 1)
        ], 512)
      ]),
      s("div", {
        class: "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto resize-y p-1 z-0",
        ref: (M) => w.value = M,
        onContextmenu: V[3] || (V[3] = me((M) => T(a).emit("vf-contextmenu-show", { event: M, area: w.value, items: B() }), ["self", "prevent"]))
      }, [
        h.view == "list" ? (y(!0), k(R, { key: 0 }, J(D(), (M, q) => (y(), k("div", {
          draggable: "true",
          onDblclick: (z) => x(M),
          onContextmenu: me((z) => T(a).emit("vf-contextmenu-show", { event: z, area: w.value, items: B(), target: M }), ["prevent"]),
          onDragstart: (z) => O(z),
          onDragover: (z) => ue(z, M),
          onDrop: (z) => oe(z, M),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": M.type,
          "data-item": JSON.stringify(M),
          "data-index": q
        }, [
          s("div", Gr, [
            s("div", Qr, [
              M.type == "dir" ? (y(), k("svg", eo, ro)) : (y(), k("svg", oo, so)),
              s("span", io, E(M.basename), 1)
            ]),
            s("div", ao, E(M.file_size ? T(Vr)(M.file_size) : ""), 1),
            s("div", lo, E(T(Ir)(M.last_modified)), 1)
          ])
        ], 40, Xr))), 256)) : W("", !0),
        h.view == "grid" ? (y(!0), k(R, { key: 1 }, J(D(!1), (M, q) => (y(), k("div", {
          draggable: "true",
          onDblclick: (z) => x(M),
          onContextmenu: me((z) => T(a).emit("vf-contextmenu-show", { event: z, area: w.value, items: B(), target: M }), ["prevent"]),
          onDragstart: (z) => O(z),
          onDragover: (z) => ue(z, M),
          onDrop: (z) => oe(z, M),
          class: "vf-item border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none",
          "data-type": M.type,
          "data-item": JSON.stringify(M),
          "data-index": q
        }, [
          s("div", null, [
            s("div", uo, [
              M.type == "dir" ? (y(), k("svg", mo, fo)) : (y(), k("svg", go, po)),
              s("div", yo, E(u(M.extension)), 1)
            ]),
            s("span", bo, E(n(M.basename)), 1)
          ])
        ], 40, co))), 256)) : W("", !0)
      ], 544)
    ]));
  }
}), So = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, xo = { class: "flex leading-5 items-center" }, ko = /* @__PURE__ */ s("div", {
  class: "mx-2",
  "aria-label": "Storage",
  "data-microtip-position": "top",
  role: "tooltip"
}, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-5 w-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "1"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    })
  ])
], -1), Do = ["value"], $o = { class: "ml-3" }, Co = { class: "flex leading-5 items-center" }, Po = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), Mo = [
  Po
], jo = {
  name: "VFStatusbar"
}, Ao = /* @__PURE__ */ Object.assign(jo, {
  props: {
    data: Object
  },
  setup(h) {
    var g;
    const d = h, a = inject("emitter"), { getStore: p, setStore: u } = inject("storage"), n = A(0), w = A((g = p("adapter")) != null ? g : d.data.adapter), f = () => {
      a.emit("vf-fetch", { q: "index", adapter: w.value }), u("adapter", w.value);
    };
    return a.on("vf-nodes-selected", (_) => {
      n.value = _.length;
    }), (_, x) => (y(), k("div", So, [
      s("div", xo, [
        ko,
        X(s("select", {
          "onUpdate:modelValue": x[0] || (x[0] = ($) => w.value = $),
          onChange: f,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (y(!0), k(R, null, J(h.data.storages, ($) => (y(), k("option", { value: $ }, E($), 9, Do))), 256))
        ], 544), [
          [er, w.value]
        ]),
        s("span", $o, E(n.value > 0 ? n.value + " items selected." : ""), 1)
      ]),
      s("div", Co, [
        s("span", {
          onClick: x[1] || (x[1] = ($) => T(a).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: "Vuefinder is a file manager component for vue 3." }))
        }, Mo)
      ])
    ]));
  }
}), Eo = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none" }, To = /* @__PURE__ */ s("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Vo = [
  To
], Io = { class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full" }, Oo = /* @__PURE__ */ s("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Lo = [
  Oo
], zo = { class: "flex leading-5" }, No = /* @__PURE__ */ s("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Ko = ["title", "onClick"], Bo = {
  name: "VFBreadcrumb"
}, Ho = /* @__PURE__ */ Object.assign(Bo, {
  props: {
    data: Object
  },
  setup(h) {
    const d = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = A(null), n = A([]);
    a.on("vf-explorer-update", (g) => {
      var $;
      let _ = [], x = [];
      u.value = ($ = d.data.dirname) != null ? $ : p("adapter", "local") + "://", u.value.length == 0 && (n.value = []), u.value.replace(p("adapter", "local") + "://", "").split("/").forEach(function(D) {
        _.push(D), _.join("/") != "" && x.push({
          basename: D,
          name: D,
          path: p("adapter", "local") + "://" + _.join("/"),
          type: "dir"
        });
      }), x.length > 4 && (x = x.slice(-5), x[0].name = ".."), n.value = x;
    });
    const w = (g) => {
      var x;
      g.preventDefault();
      let _ = JSON.parse(g.dataTransfer.getData("items"));
      if (_.find(($) => $.storage != p("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      a.emit("vf-modal-show", {
        type: "move",
        items: { from: _, to: (x = n.value[n.value.length - 2]) != null ? x : { path: p("adapter", "local") + "://" } }
      });
    }, f = (g) => {
      g.preventDefault(), n.value.length < 1 ? (g.dataTransfer.dropEffect = "none", g.dataTransfer.effectAllowed = "none") : g.dataTransfer.dropEffect = "copy";
    };
    return (g, _) => (y(), k("div", Eo, [
      (y(), k("svg", {
        onDragover: _[0] || (_[0] = (x) => f(x)),
        onDrop: _[1] || (_[1] = (x) => w(x)),
        onClick: _[2] || (_[2] = (x) => {
          var $, D;
          return !n.value.length || T(a).emit("vf-fetch", { q: "index", adapter: h.data.adapter, path: (D = ($ = n.value[n.value.length - 2]) == null ? void 0 : $.path) != null ? D : T(p)("adapter", "local") + "://" });
        }),
        class: ne(["h-6 w-6 p-0.5 rounded", n.value.length ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, Vo, 34)),
      s("div", Io, [
        (y(), k("svg", {
          onClick: _[3] || (_[3] = (x) => T(a).emit("vf-fetch", { q: "index", adapter: h.data.adapter })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Lo)),
        s("div", zo, [
          (y(!0), k(R, null, J(n.value, (x, $) => (y(), k("div", { key: $ }, [
            No,
            s("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: x.basename,
              onClick: (D) => T(a).emit("vf-fetch", { q: "index", adapter: h.data.adapter, path: x.path })
            }, E(x.name), 9, Ko)
          ]))), 128))
        ])
      ])
    ]));
  }
}), se = (h) => Object.entries(h).map((d) => d.map(encodeURIComponent).join("=")).join("&"), Ro = ["onClick"], Uo = /* @__PURE__ */ s("span", { class: "px-1" }, null, -1), Fo = {
  name: "VFContextMenu"
}, qo = /* @__PURE__ */ Object.assign(Fo, {
  props: {
    current: Object
  },
  setup(h) {
    const d = h, a = inject("emitter"), p = A(null), { apiUrl: u } = G(), n = pe({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), w = A([]);
    a.on("vf-context-selected", (x) => {
      w.value = x;
    });
    const f = {
      newfolder: {
        title: "New Folder",
        action: () => {
          a.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: "Delete",
        action: () => {
          a.emit("vf-modal-show", { type: "delete", items: w });
        }
      },
      refresh: {
        title: "Refresh",
        action: () => {
          a.emit("vf-fetch", { q: "index", adapter: d.current.adapter, path: d.current.dirname });
        }
      },
      preview: {
        title: "Preview",
        action: () => {
          a.emit("vf-modal-show", { type: "preview", adapter: d.current.adapter, item: w.value[0] });
        }
      },
      download: {
        title: "Download",
        action: () => {
          const x = u.value + "?" + se({ q: "download", adapter: w.value[0].adapter, path: w.value[0].path });
          a.emit("vf-download", x);
        }
      },
      archive: {
        title: "Archive",
        action: () => {
          a.emit("vf-modal-show", { type: "archive", items: w });
        }
      },
      unarchive: {
        title: "Unarchive",
        action: () => {
          a.emit("vf-modal-show", { type: "unarchive", items: w });
        }
      },
      rename: {
        title: "Rename",
        action: () => {
          a.emit("vf-modal-show", { type: "rename", items: w });
        }
      }
    }, g = (x) => {
      a.emit("vf-contextmenu-hide"), x.action();
    };
    a.on("vf-contextmenu-show", ({ event: x, area: $, items: D, target: I = null }) => {
      n.items = [], I ? D.length > 1 && D.some((B) => B.path === I.path) ? (n.items.push(f.refresh), n.items.push(f.archive), n.items.push(f.delete), a.emit("vf-context-selected", D), console.log(D.length + " selected (more than 1 item.)")) : (n.items.push(f.preview), n.items.push(f.rename), n.items.push(f.download), I.mime_type == "application/zip" ? n.items.push(f.unarchive) : n.items.push(f.archive), n.items.push(f.delete), a.emit("vf-context-selected", [I]), console.log(I.type + " is selected")) : (n.items.push(f.refresh), n.items.push(f.newfolder), a.emit("vf-context-selected", []), console.log("no files selected")), _(x, $);
    }), a.on("vf-contextmenu-hide", () => {
      n.active = !1;
    });
    const _ = (x, $) => {
      n.active = !0, Ce(() => {
        let D = $.getBoundingClientRect(), I = x.pageX, B = x.pageY, O = p.value.offsetHeight, oe = p.value.offsetWidth;
        I = D.right - x.pageX + window.scrollX < oe ? I - oe : I, B = D.bottom - x.pageY + window.scrollY < O ? B - O : B, n.positions = {
          left: I + "px",
          top: B + "px"
        };
      });
    };
    return (x, $) => n.active ? (y(), k("ul", {
      key: 0,
      class: "absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref: (D) => p.value = D,
      style: tr(n.positions)
    }, [
      (y(!0), k(R, null, J(n.items, (D) => (y(), k("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: D.title,
        onClick: (I) => g(D)
      }, [
        Uo,
        s("span", null, E(D.title), 1)
      ], 8, Ro))), 128))
    ], 4)) : W("", !0);
  }
}), Wo = /* @__PURE__ */ s("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), Yo = {
  name: "VueFinder"
}, Jo = /* @__PURE__ */ Object.assign(Yo, {
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
  setup(h) {
    const d = h, a = or();
    Xe("emitter", a);
    const { setStore: p, getStore: u } = Qe(d.id);
    Xe("storage", Qe(d.id));
    const { apiUrl: n, setApiUrl: w } = G();
    w(d.url);
    const f = pe({ adapter: "local", storages: [], dirname: ".", files: [] }), g = A(u("viewport", "grid")), _ = A(u("darkMode", d.dark));
    a.on("vf-darkMode-toggle", () => {
      _.value = !_.value, p("darkMode", _.value);
    }), a.on("vf-view-toggle", (D) => {
      g.value = D;
    });
    const x = pe({
      active: !1,
      type: "delete",
      data: {}
    });
    a.on("vf-modal-close", () => {
      x.active = !1;
    }), a.on("vf-modal-show", (D) => {
      x.active = !0, x.type = D.type, x.data = D;
    });
    const $ = (D) => {
      Object.assign(f, D), a.emit("vf-nodes-selected", {}), a.emit("vf-explorer-update", D);
    };
    return a.on("vf-fetch", (D) => {
      $e(n.value, { params: D }).then((I) => {
        a.emit("vf-modal-close"), $(I);
      });
    }), a.on("vf-download", (D) => {
      document.getElementById("download_frame").src = D, a.emit("vf-modal-close");
    }), Y(() => {
      a.emit("vf-fetch", { q: "index", adapter: u("adapter", f.adapter) });
    }), (D, I) => (y(), k("div", {
      class: ne(_.value ? "dark" : "")
    }, [
      s("div", {
        class: "relative border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none",
        onMousedown: I[0] || (I[0] = (B) => T(a).emit("vf-contextmenu-hide"))
      }, [
        re(Ar),
        re(Ho, { data: f }, null, 8, ["data"]),
        re(wo, {
          view: g.value,
          data: f
        }, null, 8, ["view", "data"]),
        re(Ao, { data: f }, null, 8, ["data"])
      ], 32),
      x.active ? (y(), H(rr("v-f-modal-" + x.type), {
        key: 0,
        selection: x.data,
        current: f
      }, null, 8, ["selection", "current"])) : W("", !0),
      re(qo, { current: f }, null, 8, ["current"]),
      Wo
    ], 2));
  }
}), Zo = /* @__PURE__ */ s("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), Xo = { class: "fixed z-10 inset-0 overflow-y-auto" }, Go = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full" }, Qo = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, en = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Z = {
  __name: "ModalLayout",
  setup(h) {
    const d = inject("emitter");
    return Y(() => {
      const a = document.querySelector(".v-f-modal input");
      a && a.focus();
    }), (a, p) => (y(), k("div", {
      class: "v-f-modal relative z-20",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: p[1] || (p[1] = he((u) => T(d).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Zo,
      s("div", Xo, [
        s("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: p[0] || (p[0] = me((u) => T(d).emit("vf-modal-close"), ["self"]))
        }, [
          s("div", Go, [
            s("div", Qo, [
              Ge(a.$slots, "default")
            ]),
            s("div", en, [
              Ge(a.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, tn = { class: "sm:flex sm:items-start" }, rn = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), on = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, nn = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Delete files", -1), sn = { class: "mt-2" }, an = /* @__PURE__ */ s("p", { class: "text-sm text-gray-500" }, "Are you sure you want to delete these files?", -1), ln = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, cn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, un = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), dn = [
  un
], mn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hn = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), fn = [
  hn
], gn = { class: "ml-1.5" }, vn = /* @__PURE__ */ s("div", { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, "This action cannot be undone.", -1), pn = {
  name: "VFModalDelete"
}, yn = /* @__PURE__ */ Object.assign(pn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const d = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = A(d.selection.items), n = () => {
      u.value.length && a.emit("vf-fetch", {
        q: "delete",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        items: JSON.stringify(u.value.map(({ path: w, type: f }) => ({ path: w, type: f })))
      });
    };
    return (w, f) => (y(), H(Z, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: n,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, delete!"),
        s("button", {
          type: "button",
          onClick: f[0] || (f[0] = (g) => T(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel"),
        vn
      ]),
      default: K(() => [
        s("div", tn, [
          rn,
          s("div", on, [
            nn,
            s("div", sn, [
              an,
              (y(!0), k(R, null, J(u.value, (g) => (y(), k("p", ln, [
                g.type == "dir" ? (y(), k("svg", cn, dn)) : (y(), k("svg", mn, fn)),
                s("span", gn, E(g.basename), 1)
              ]))), 256))
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), bn = { class: "sm:flex sm:items-start" }, _n = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), wn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Sn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, xn = { class: "mt-2" }, kn = { class: "text-sm text-gray-500" }, Dn = {
  name: "VFModalMessage"
}, $n = /* @__PURE__ */ Object.assign(Dn, {
  props: {
    selection: Object
  },
  setup(h) {
    const d = inject("emitter");
    return (a, p) => (y(), H(Z, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: p[0] || (p[0] = (u) => T(d).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close")
      ]),
      default: K(() => {
        var u, n, w, f;
        return [
          s("div", bn, [
            _n,
            s("div", wn, [
              s("h3", Sn, E((n = (u = h.selection) == null ? void 0 : u.title) != null ? n : "Title"), 1),
              s("div", xn, [
                s("p", kn, E((f = (w = h.selection) == null ? void 0 : w.message) != null ? f : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), Cn = { class: "sm:flex sm:items-start" }, Pn = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), Mn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, jn = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New Folder", -1), An = { class: "mt-2" }, En = /* @__PURE__ */ s("p", { class: "text-sm text-gray-500" }, "Create a new folder", -1), Tn = ["onKeyup"], Vn = {
  name: "VFModalNewFolder"
}, In = /* @__PURE__ */ Object.assign(Vn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const d = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = A(""), n = () => {
      u.value != "" && a.emit("vf-fetch", {
        q: "newfolder",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        name: u.value
      });
    };
    return (w, f) => (y(), H(Z, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: n,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        s("button", {
          type: "button",
          onClick: f[1] || (f[1] = (g) => T(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", Cn, [
          Pn,
          s("div", Mn, [
            jn,
            s("div", An, [
              En,
              X(s("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (g) => u.value = g),
                onKeyup: he(n, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Folder Name",
                type: "text"
              }, null, 40, Tn), [
                [fe, u.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), On = { class: "sm:flex sm:items-start" }, Ln = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), zn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Nn = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New File", -1), Kn = { class: "mt-2" }, Bn = /* @__PURE__ */ s("p", { class: "text-sm text-gray-500" }, "Create a new file", -1), Hn = ["onKeyup"], Rn = {
  name: "VFModalNewFile"
}, Un = /* @__PURE__ */ Object.assign(Rn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const d = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = A(""), n = () => {
      u.value != "" && a.emit("vf-fetch", {
        q: "newfile",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        name: u.value
      });
    };
    return (w, f) => (y(), H(Z, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: n,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        s("button", {
          type: "button",
          onClick: f[1] || (f[1] = (g) => T(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", On, [
          Ln,
          s("div", zn, [
            Nn,
            s("div", Kn, [
              Bn,
              X(s("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (g) => u.value = g),
                onKeyup: he(n, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "File Name",
                type: "text"
              }, null, 40, Hn), [
                [fe, u.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fn = { class: "flex" }, qn = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Wn = { class: "ml-auto mb-2" }, Yn = {
  key: 0,
  class: "p-2 border font-normal border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[100px] text-xs"
}, Jn = { key: 1 }, Zn = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(h, { emit: d }) {
    const a = h, p = A(""), u = A(""), n = A(null), w = A(!1), { apiUrl: f } = G();
    Y(() => {
      $e(f.value, {
        params: { q: "preview", adapter: a.selection.adapter, path: a.selection.item.path },
        json: !1
      }).then((x) => {
        p.value = x, d("load");
      });
    });
    const g = () => {
      w.value = !w.value, u.value = p.value, w.value == !0 && Ce(() => {
        n.value.focus();
      });
    }, _ = () => {
      $e(f.value, {
        method: "POST",
        params: { q: "save", adapter: a.selection.adapter, path: a.selection.item.path, content: u.value },
        json: !1
      }).then((x) => {
        p.value = x, d("load"), w.value = !w.value;
      }).catch((x) => console.log(x.statusText));
    };
    return (x, $) => (y(), k(R, null, [
      s("div", Fn, [
        s("div", qn, E(h.selection.item.basename), 1),
        s("div", Wn, [
          w.value ? (y(), k("button", {
            key: 0,
            onClick: _,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Save")) : W("", !0),
          s("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: $[0] || ($[0] = (D) => g())
          }, E(w.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      s("div", null, [
        w.value ? (y(), k("div", Jn, [
          X(s("textarea", {
            ref: (D) => n.value = D,
            "onUpdate:modelValue": $[1] || ($[1] = (D) => u.value = D),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [fe, u.value]
          ])
        ])) : (y(), k("pre", Yn, E(p.value), 1))
      ])
    ], 64));
  }
}, Xn = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Gn = { class: "w-full flex justify-center" }, Qn = ["src"], es = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(h, { emit: d }) {
    const a = h, { apiUrl: p } = G(), u = () => p.value + "?" + se({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return onMounted(() => {
      d("load");
    }), (n, w) => (y(), k(R, null, [
      s("h3", Xn, E(h.selection.item.basename), 1),
      s("div", Gn, [
        s("img", {
          class: "max-w-[350px] max-h-[350px]",
          src: u(),
          alt: ""
        }, null, 8, Qn)
      ])
    ], 64));
  }
}, ts = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, rs = /* @__PURE__ */ s("div", null, " Default view.. ", -1), os = {
  __name: "Default",
  emits: ["load"],
  setup(h, { emit: d }) {
    return Y(() => {
      d("load");
    }), (a, p) => (y(), k(R, null, [
      s("h3", ts, E(a.selection.item.basename), 1),
      rs
    ], 64));
  }
}, ns = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ss = {
  class: "w-full",
  preload: "",
  controls: ""
}, is = ["src"], as = /* @__PURE__ */ ce(" Your browser does not support the video tag. "), ls = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(h, { emit: d }) {
    const a = h, { apiUrl: p } = G(), u = () => p.value + "?" + se({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return Y(() => {
      d("load");
    }), (n, w) => (y(), k(R, null, [
      s("h3", ns, E(h.selection.item.basename), 1),
      s("div", null, [
        s("video", ss, [
          s("source", {
            src: u(),
            type: "video/mp4"
          }, null, 8, is),
          as
        ])
      ])
    ], 64));
  }
}, cs = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, us = {
  class: "w-full",
  controls: ""
}, ds = ["src"], ms = /* @__PURE__ */ ce(" Your browser does not support the audio element. "), hs = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(h, { emit: d }) {
    const a = h, { apiUrl: p } = G(), u = () => p.value + "?" + se({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return Y(() => {
      d("load");
    }), (n, w) => (y(), k(R, null, [
      s("h3", cs, E(h.selection.item.basename), 1),
      s("div", null, [
        s("audio", us, [
          s("source", {
            src: u(),
            type: "audio/mpeg"
          }, null, 8, ds),
          ms
        ])
      ])
    ], 64));
  }
}, fs = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, gs = ["data"], vs = ["src"], ps = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(h, { emit: d }) {
    const a = h, { apiUrl: p } = G(), u = () => p.value + "?" + se({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return Y(() => {
      d("load");
    }), (n, w) => (y(), k(R, null, [
      s("h3", fs, E(h.selection.item.basename), 1),
      s("div", null, [
        s("object", {
          data: u(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          s("iframe", {
            class: "border-0",
            src: u(),
            width: "100%",
            height: "100%"
          }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        `, 8, vs)
        ], 8, gs)
      ])
    ], 64));
  }
}, ys = { class: "sm:flex sm:items-start" }, bs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, _s = { class: "text-gray-700 dark:text-gray-200 text-sm" }, ws = {
  key: 0,
  class: "flex leading-5"
}, Ss = /* @__PURE__ */ s("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ s("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ s("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), xs = /* @__PURE__ */ s("span", null, "Loading", -1), ks = [
  Ss,
  xs
], Ds = {
  name: "VFModalPreview"
}, $s = /* @__PURE__ */ Object.assign(Ds, {
  props: {
    selection: Object
  },
  setup(h) {
    const d = h, { apiUrl: a } = G(), p = inject("emitter"), u = A(!1), n = (f) => {
      var g;
      return ((g = d.selection.item.mime_type) != null ? g : "").startsWith(f);
    }, w = () => {
      const f = a.value + "?" + se({ q: "download", adapter: d.selection.adapter, path: d.selection.item.path });
      p.emit("vf-download", f);
    };
    return (f, g) => (y(), H(Z, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: g[6] || (g[6] = (_) => T(p).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close"),
        s("button", {
          type: "button",
          onClick: g[7] || (g[7] = (_) => w()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Download")
      ]),
      default: K(() => [
        s("div", ys, [
          s("div", bs, [
            s("div", null, [
              n("text") ? (y(), H(Zn, {
                key: 0,
                selection: h.selection,
                onLoad: g[0] || (g[0] = (_) => u.value = !0)
              }, null, 8, ["selection"])) : n("image") ? (y(), H(es, {
                key: 1,
                selection: h.selection,
                onLoad: g[1] || (g[1] = (_) => u.value = !0)
              }, null, 8, ["selection"])) : n("video") ? (y(), H(ls, {
                key: 2,
                selection: h.selection,
                onLoad: g[2] || (g[2] = (_) => u.value = !0)
              }, null, 8, ["selection"])) : n("audio") ? (y(), H(hs, {
                key: 3,
                selection: h.selection,
                onLoad: g[3] || (g[3] = (_) => u.value = !0)
              }, null, 8, ["selection"])) : n("application/pdf") ? (y(), H(ps, {
                key: 4,
                selection: h.selection,
                onLoad: g[4] || (g[4] = (_) => u.value = !0)
              }, null, 8, ["selection"])) : (y(), H(os, {
                key: 5,
                selection: h.selection,
                onLoad: g[5] || (g[5] = (_) => u.value = !0)
              }, null, 8, ["selection"]))
            ]),
            s("div", _s, [
              s("p", null, E(h.selection.item.path), 1),
              s("p", null, "mime_type: " + E(h.selection.item.mime_type), 1),
              u.value == !1 ? (y(), k("div", ws, ks)) : W("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Cs = { class: "sm:flex sm:items-start" }, Ps = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), Ms = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, js = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, As = { class: "mt-2" }, Es = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Ts = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vs = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Is = [
  Vs
], Os = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ls = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), zs = [
  Ls
], Ns = { class: "ml-1.5" }, Ks = ["onKeyup"], Bs = {
  name: "VFModalRename"
}, Hs = /* @__PURE__ */ Object.assign(Bs, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const d = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = A(d.selection.items[0]), n = A(d.selection.items[0].basename), w = () => {
      n.value != "" && a.emit("vf-fetch", {
        q: "rename",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        item: u.value.path,
        name: n.value
      });
    };
    return (f, g) => (y(), H(Z, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: w,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Rename!"),
        s("button", {
          type: "button",
          onClick: g[1] || (g[1] = (_) => T(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", Cs, [
          Ps,
          s("div", Ms, [
            s("h3", js, "Rename your " + E(u.value.type == "dir" ? "folder" : "file"), 1),
            s("div", As, [
              s("p", Es, [
                u.value.type == "dir" ? (y(), k("svg", Ts, Is)) : (y(), k("svg", Os, zs)),
                s("span", Ns, E(u.value.basename), 1)
              ]),
              X(s("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (_) => n.value = _),
                onKeyup: he(w, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Ks), [
                [fe, n.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Rs = { class: "sm:flex sm:items-start" }, Us = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), Fs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, qs = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Upload files", -1), Ws = { class: "mt-2" }, Ys = { class: "text-gray-500 mb-1" }, Js = ["id"], Zs = ["disabled", "onClick"], Xs = {
  name: "VFModalUpload"
}, Gs = /* @__PURE__ */ Object.assign(Xs, {
  props: {
    current: Object
  },
  setup(h) {
    const d = h, a = inject("emitter"), { apiUrl: p } = G(), u = A(null), n = A(null), w = A(null), f = A([]), g = A(!0), _ = () => {
      u.value.start();
    };
    return Y(() => {
      u.value = new xe.Uploader({
        runtimes: "html5",
        browse_button: w.value,
        container: n.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: p.value + "?" + se({ q: "upload", adapter: d.current.adapter, path: d.current.dirname }),
        init: {
          PostInit: function() {
          },
          FilesAdded: function(x, $) {
            g.value = !1, xe.each($, function(D) {
              f.value.push({
                id: D.id,
                name: D.name,
                size: xe.formatSize(D.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(x, $) {
            f.value[f.value.findIndex((D) => D.id == $.id)].percent = $.percent + "%";
          },
          UploadComplete: function() {
            g.value = !0, a.emit("vf-fetch", { q: "index", adapter: d.current.adapter, path: d.current.dirname });
          },
          Error: function(x, $) {
          }
        }
      }), u.value.init();
    }), (x, $) => (y(), H(Z, null, {
      buttons: K(() => [
        s("button", {
          disabled: g.value,
          onClick: me(_, ["prevent"]),
          type: "button",
          class: ne([g.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, "Upload!", 10, Zs),
        s("button", {
          type: "button",
          onClick: $[0] || ($[0] = (D) => T(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", Rs, [
          Us,
          s("div", Fs, [
            qs,
            s("div", Ws, [
              s("div", Ys, [
                (y(!0), k(R, null, J(f.value, (D) => (y(), k("div", null, [
                  s("div", {
                    id: D.id
                  }, [
                    ce(E(D.name) + " ( " + E(D.size) + ") ", 1),
                    s("b", null, E(D.percent), 1)
                  ], 8, Js)
                ]))), 256))
              ]),
              s("div", {
                class: "text-gray-500",
                ref: (D) => n.value = D
              }, [
                s("a", {
                  ref: (D) => w.value = D,
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
}), Qs = { class: "sm:flex sm:items-start" }, ei = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
    })
  ])
], -1), ti = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ri = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), oi = { class: "mt-2" }, ni = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, si = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ii = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ai = [
  ii
], li = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ci = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ui = [
  ci
], di = { class: "ml-1.5" }, mi = /* @__PURE__ */ s("p", { class: "my-1 text-sm text-gray-500" }, "Archive name. (.zip file will be created)", -1), hi = ["onKeyup"], fi = {
  name: "VFModalArchive"
}, gi = /* @__PURE__ */ Object.assign(fi, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const d = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = A(""), n = A(d.selection.items), w = () => {
      n.value.length && a.emit("vf-fetch", {
        q: "archive",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        items: JSON.stringify(n.value.map(({ path: f, type: g }) => ({ path: f, type: g }))),
        name: u.value
      });
    };
    return (f, g) => (y(), H(Z, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: w,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Archive!"),
        s("button", {
          type: "button",
          onClick: g[1] || (g[1] = (_) => T(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", Qs, [
          ei,
          s("div", ti, [
            ri,
            s("div", oi, [
              (y(!0), k(R, null, J(n.value, (_) => (y(), k("p", ni, [
                _.type == "dir" ? (y(), k("svg", si, ai)) : (y(), k("svg", li, ui)),
                s("span", di, E(_.basename), 1)
              ]))), 256)),
              mi,
              X(s("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (_) => u.value = _),
                onKeyup: he(w, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, hi), [
                [fe, u.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), vi = { class: "sm:flex sm:items-start" }, pi = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    })
  ])
], -1), yi = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, bi = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), _i = { class: "mt-2" }, wi = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Si = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xi = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ki = [
  xi
], Di = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $i = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ci = [
  $i
], Pi = { class: "ml-1.5" }, Mi = { class: "my-1 text-sm text-gray-500" }, ji = {
  name: "VFModalUnarchive"
}, Ai = /* @__PURE__ */ Object.assign(ji, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const d = h, a = inject("emitter"), { getStore: p } = inject("storage");
    A("");
    const u = A(d.selection.items[0]), n = A([]), w = () => {
      a.emit("vf-fetch", {
        q: "unarchive",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        item: u.value.path
      });
    };
    return (f, g) => (y(), H(Z, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: w,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Unarchive!"),
        s("button", {
          type: "button",
          onClick: g[0] || (g[0] = (_) => T(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", vi, [
          pi,
          s("div", yi, [
            bi,
            s("div", _i, [
              (y(!0), k(R, null, J(n.value, (_) => (y(), k("p", wi, [
                _.type == "dir" ? (y(), k("svg", Si, ki)) : (y(), k("svg", Di, Ci)),
                s("span", Pi, E(_.basename), 1)
              ]))), 256)),
              s("p", Mi, "Archive will be unarchived at (" + E(h.current.dirname) + ")", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ei = { class: "sm:flex sm:items-start" }, Ti = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), Vi = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Ii = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Move files", -1), Oi = { class: "mt-2" }, Li = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, zi = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ni = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ki = [
  Ni
], Bi = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hi = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ri = [
  Hi
], Ui = { class: "ml-1.5" }, Fi = /* @__PURE__ */ s("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Are you sure you want to move these files to ?", -1), qi = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Wi = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), Yi = { class: "ml-1.5 overflow-auto" }, Ji = {
  name: "VFModalMove"
}, Zi = /* @__PURE__ */ Object.assign(Ji, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const d = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = A(d.selection.items.from), n = () => {
      u.value.length && a.emit("vf-fetch", {
        q: "move",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        items: JSON.stringify(u.value.map(({ path: w, type: f }) => ({ path: w, type: f }))),
        item: d.selection.items.to.path
      });
    };
    return (w, f) => (y(), H(Z, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: n,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, move!"),
        s("button", {
          type: "button",
          onClick: f[0] || (f[0] = (g) => T(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", Ei, [
          Ti,
          s("div", Vi, [
            Ii,
            s("div", Oi, [
              (y(!0), k(R, null, J(u.value, (g) => (y(), k("p", Li, [
                g.type == "dir" ? (y(), k("svg", zi, Ki)) : (y(), k("svg", Bi, Ri)),
                s("span", Ui, E(g.path), 1)
              ]))), 256)),
              Fi,
              s("p", qi, [
                Wi,
                s("span", Yi, E(h.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: yn,
  ModalMessage: $n,
  ModalNewFolder: In,
  ModalNewFile: Un,
  ModalPreview: $s,
  ModalRename: Hs,
  ModalUpload: Gs,
  ModalArchive: gi,
  ModalUnarchive: Ai,
  ModalMove: Zi
}, Symbol.toStringTag, { value: "Module" })), De = {
  VueFinder: Jo,
  ...Xi
};
const ea = {
  install(h) {
    for (const d in De)
      if (De.hasOwnProperty(d)) {
        const a = De[d];
        h.component(a.name, a);
      }
  }
};
export {
  ea as default
};
