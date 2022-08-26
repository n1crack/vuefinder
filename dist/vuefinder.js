import { ref as E, watch as Ze, openBlock as _, createElementBlock as $, createElementVNode as i, unref as j, normalizeClass as le, createCommentVNode as q, createStaticVNode as Zt, reactive as fe, onMounted as W, withDirectives as Q, createVNode as G, vShow as Se, toDisplayString as I, withModifiers as me, Fragment as ee, renderList as te, createTextVNode as se, nextTick as Xe, vModelSelect as Xt, normalizeStyle as Gt, provide as We, createBlock as K, resolveDynamicComponent as Qt, withKeys as ce, renderSlot as Ye, withCtx as z, vModelText as ge } from "vue";
const Ge = (f, { method: h = "get", params: a = {}, json: g = !0 }) => {
  const u = { method: h };
  return h == "get" ? f += "?" + new URLSearchParams(a) : u.body = a, g ? fetch(f, u).then((o) => o.json()) : fetch(f, u);
};
function er(f) {
  return { all: f = f || /* @__PURE__ */ new Map(), on: function(h, a) {
    var g = f.get(h);
    g ? g.push(a) : f.set(h, [a]);
  }, off: function(h, a) {
    var g = f.get(h);
    g && (a ? g.splice(g.indexOf(a) >>> 0, 1) : f.set(h, []));
  }, emit: function(h, a) {
    var g = f.get(h);
    g && g.slice().map(function(u) {
      u(a);
    }), (g = f.get("*")) && g.slice().map(function(u) {
      u(h, a);
    });
  } };
}
function Je(f) {
  let h = localStorage.getItem(f + "_storage");
  const a = E(JSON.parse(h));
  Ze(a, g);
  function g() {
    a.value === null || a.value === "" ? localStorage.removeItem(f + "_storage") : localStorage.setItem(f + "_storage", JSON.stringify(a.value));
  }
  function u(y, w) {
    a.value = Object.assign({ ...a.value }, { [y]: w });
  }
  function o() {
    a.value = null;
  }
  return { getStore: (y, w = null) => a.value === null || a.value === "" ? w : a.value.hasOwnProperty(y) ? a.value[y] : w, setStore: u, clearStore: o };
}
const tr = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, rr = { class: "flex text-center" }, nr = /* @__PURE__ */ i("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ i("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
  })
], -1), or = [
  nr
], sr = /* @__PURE__ */ i("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ i("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  })
], -1), ir = [
  sr
], ar = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
}, null, -1), lr = [
  ar
], cr = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
}, null, -1), ur = [
  cr
], dr = /* @__PURE__ */ i("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ i("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
  })
], -1), hr = [
  dr
], mr = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
}, null, -1), fr = [
  mr
], gr = { class: "flex text-center items-center justify-end" }, vr = {
  class: "mx-1.5",
  "aria-label": "Dark Mode",
  "data-microtip-position": "bottom",
  role: "tooltip"
}, pr = /* @__PURE__ */ Zt('<g class="dark:opacity-0"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path><path d="M12 4v.01M17.66 6.345l-.007.007M20.005 12.005h-.01M17.66 17.665l-.007-.007M12 20.01V20M6.34 17.665l.007-.007M3.995 12.005h.01M6.34 6.344l.007.007" fill="none"></path></g><g class="opacity-0 dark:opacity-100"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M12 3v1M18.66 5.345l-.828.828M21.005 12.005h-1M18.66 18.665l-.828-.828M12 21.01V20M5.34 18.666l.835-.836M2.995 12.005h1.01M5.34 5.344l.835.836" fill="none"></path></g>', 2), yr = [
  pr
], br = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, _r = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
}, null, -1), Sr = [
  _r
], wr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, kr = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 6h16M4 10h16M4 14h16M4 18h16"
}, null, -1), xr = [
  kr
], Dr = {
  name: "VFToolbar"
}, $r = /* @__PURE__ */ Object.assign(Dr, {
  setup(f) {
    const h = inject("emitter"), { getStore: a, setStore: g } = inject("storage"), u = E(a("viewport", "grid")), o = E([]);
    return h.on("vf-nodes-selected", (p) => {
      o.value = p;
    }), h.on("vf-view-toggle", (p) => {
      g("viewport", p), u.value = p;
    }), (p, y) => (_(), $("div", tr, [
      i("div", rr, [
        i("div", {
          class: "mx-1.5",
          "aria-label": "New Folder",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: y[0] || (y[0] = (w) => j(h).emit("vf-modal-show", { type: "new-folder", items: o.value }))
        }, or),
        i("div", {
          class: "mx-1.5",
          "aria-label": "New File",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: y[1] || (y[1] = (w) => j(h).emit("vf-modal-show", { type: "new-file", items: o.value }))
        }, ir),
        i("div", {
          class: "mx-1.5",
          "aria-label": "Rename",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: y[2] || (y[2] = (w) => o.value.length != 1 || j(h).emit("vf-modal-show", { type: "rename", items: o.value }))
        }, [
          (_(), $("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: le([o.value.length == 1 ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, lr, 2))
        ]),
        i("div", {
          class: "mx-1.5",
          "aria-label": "Delete",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: y[3] || (y[3] = (w) => !o.value.length || j(h).emit("vf-modal-show", { type: "delete", items: o.value }))
        }, [
          (_(), $("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: le([o.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ur, 2))
        ]),
        i("div", {
          class: "mx-1.5",
          "aria-label": "Upload",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: y[4] || (y[4] = (w) => j(h).emit("vf-modal-show", { type: "upload", items: o.value }))
        }, hr),
        i("div", {
          class: "mx-1.5",
          "aria-label": "Archive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: y[5] || (y[5] = (w) => !o.value.length || j(h).emit("vf-modal-show", { type: "archive", items: o.value }))
        }, [
          (_(), $("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: le([o.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, fr, 2))
        ])
      ]),
      i("div", gr, [
        i("div", vr, [
          (_(), $("svg", {
            onClick: y[6] || (y[6] = (w) => j(h).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, yr))
        ]),
        i("div", {
          class: "mx-1.5",
          "aria-label": "Change View",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: y[7] || (y[7] = (w) => j(h).emit("vf-view-toggle", u.value == "list" ? "grid" : "list"))
        }, [
          u.value == "grid" ? (_(), $("svg", br, Sr)) : q("", !0),
          u.value == "list" ? (_(), $("svg", wr, xr)) : q("", !0)
        ])
      ])
    ]));
  }
});
var Cr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Qe = { exports: {} };
(function(f, h) {
  (function(a, g) {
    f.exports = g();
  })(Cr, function() {
    function a(n, t) {
      if (!(n instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function g(n, t) {
      for (var e = 0; e < t.length; e++) {
        var s = t[e];
        s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(n, s.key, s);
      }
    }
    function u(n, t, e) {
      return t && g(n.prototype, t), e && g(n, e), n;
    }
    function o(n, t, e) {
      return t in n ? Object.defineProperty(n, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : n[t] = e, n;
    }
    function p(n, t) {
      var e = Object.keys(n);
      if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(n);
        t && (s = s.filter(function(r) {
          return Object.getOwnPropertyDescriptor(n, r).enumerable;
        })), e.push.apply(e, s);
      }
      return e;
    }
    function y(n) {
      for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t] != null ? arguments[t] : {};
        t % 2 ? p(Object(e), !0).forEach(function(s) {
          o(n, s, e[s]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e)) : p(Object(e)).forEach(function(s) {
          Object.defineProperty(n, s, Object.getOwnPropertyDescriptor(e, s));
        });
      }
      return n;
    }
    function w(n, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function");
      n.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: n,
          writable: !0,
          configurable: !0
        }
      }), t && C(n, t);
    }
    function S(n) {
      return S = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      }, S(n);
    }
    function C(n, t) {
      return C = Object.setPrototypeOf || function(s, r) {
        return s.__proto__ = r, s;
      }, C(n, t);
    }
    function k() {
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
    function A(n, t, e) {
      return k() ? A = Reflect.construct : A = function(r, l, c) {
        var d = [null];
        d.push.apply(d, l);
        var m = Function.bind.apply(r, d), b = new m();
        return c && C(b, c.prototype), b;
      }, A.apply(null, arguments);
    }
    function F(n) {
      return Function.toString.call(n).indexOf("[native code]") !== -1;
    }
    function H(n) {
      var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return H = function(s) {
        if (s === null || !F(s))
          return s;
        if (typeof s != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof t < "u") {
          if (t.has(s))
            return t.get(s);
          t.set(s, r);
        }
        function r() {
          return A(s, arguments, S(this).constructor);
        }
        return r.prototype = Object.create(s.prototype, {
          constructor: {
            value: r,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), C(r, s);
      }, H(n);
    }
    function V(n) {
      if (n === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return n;
    }
    function ue(n, t) {
      return t && (typeof t == "object" || typeof t == "function") ? t : V(n);
    }
    function ie(n) {
      var t = k();
      return function() {
        var s = S(n), r;
        if (t) {
          var l = S(this).constructor;
          r = Reflect.construct(s, arguments, l);
        } else
          r = s.apply(this, arguments);
        return ue(this, r);
      };
    }
    function xe(n, t) {
      for (; !Object.prototype.hasOwnProperty.call(n, t) && (n = S(n), n !== null); )
        ;
      return n;
    }
    function D(n, t, e) {
      return typeof Reflect < "u" && Reflect.get ? D = Reflect.get : D = function(r, l, c) {
        var d = xe(r, l);
        if (!!d) {
          var m = Object.getOwnPropertyDescriptor(d, l);
          return m.get ? m.get.call(c) : m.value;
        }
      }, D(n, t, e || n);
    }
    function T(n, t) {
      return O(n) || Z(n, t) || De(n, t) || tt();
    }
    function P(n) {
      return U(n) || J(n) || De(n) || et();
    }
    function U(n) {
      if (Array.isArray(n))
        return pe(n);
    }
    function O(n) {
      if (Array.isArray(n))
        return n;
    }
    function J(n) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(n))
        return Array.from(n);
    }
    function Z(n, t) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(n)))) {
        var e = [], s = !0, r = !1, l = void 0;
        try {
          for (var c = n[Symbol.iterator](), d; !(s = (d = c.next()).done) && (e.push(d.value), !(t && e.length === t)); s = !0)
            ;
        } catch (m) {
          r = !0, l = m;
        } finally {
          try {
            !s && c.return != null && c.return();
          } finally {
            if (r)
              throw l;
          }
        }
        return e;
      }
    }
    function De(n, t) {
      if (!!n) {
        if (typeof n == "string")
          return pe(n, t);
        var e = Object.prototype.toString.call(n).slice(8, -1);
        if (e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set")
          return Array.from(n);
        if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))
          return pe(n, t);
      }
    }
    function pe(n, t) {
      (t == null || t > n.length) && (t = n.length);
      for (var e = 0, s = new Array(t); e < t; e++)
        s[e] = n[e];
      return s;
    }
    function et() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function tt() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var B = function(t, e, s) {
      var r = t.x, l = t.y, c = s.x, d = s.y, m = {
        "+": {
          x: r + c,
          y: l + d
        },
        "-": {
          x: r - c,
          y: l - d
        },
        "*": {
          x: r * c,
          y: l * d
        },
        "/": {
          x: r / c,
          y: l / d
        }
      };
      return m[e];
    }, re = function(t) {
      return {
        x: t.left,
        y: t.top
      };
    }, $e = function(t) {
      var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: t.x,
        top: t.y,
        right: t.x,
        bottom: t.y,
        width: e,
        height: e
      };
    }, rt = function(t) {
      return {
        x: t,
        y: t
      };
    }, nt = function(n, t, e) {
      window.addEventListener("resize", t), window.addEventListener("scroll", t), n.forEach(function(s, r) {
        e.observe(s, {
          childList: r !== 0,
          attributes: !0
        });
      });
    }, ot = function(n) {
      var t = de(n);
      return t.x || t.y ? !0 : n instanceof HTMLDocument ? n.body ? !!(n.body.scrollTop = 1) : !!(n.documentElement.scrollTop = 1) : !!(n.scrollTop = 1);
    }, st = function(n) {
      var t = document.createElement("div");
      return t.style.position = "fixed", t.style.overflow = "hidden", t.style.pointerEvents = "none", t.style.zIndex = "999999999999999999", t.classList.add(n), t;
    }, it = function(n) {
      var t = document.createElement("div");
      return t.style.position = "absolute", n || (t.style.background = "rgba(0, 0, 255, 0.1)", t.style.border = "1px solid rgba(0, 0, 255, 0.45)", t.style.display = "none", t.style.pointerEvents = "none"), t;
    }, at = function(n, t) {
      var e;
      return function() {
        for (var s = arguments.length, r = new Array(s), l = 0; l < s; l++)
          r[l] = arguments[l];
        var c = function() {
          e = null, n.apply(void 0, r);
        };
        clearTimeout(e), e = setTimeout(c, t);
      };
    }, ye = function() {
      var n, t, e, s;
      return {
        y: ((n = document.body) === null || n === void 0 ? void 0 : n.scrollTop) || ((t = document.documentElement) === null || t === void 0 ? void 0 : t.scrollTop) || 0,
        x: ((e = document.body) === null || e === void 0 ? void 0 : e.scrollLeft) || ((s = document.documentElement) === null || s === void 0 ? void 0 : s.scrollLeft) || 0
      };
    }, lt = function(n, t) {
      if (n instanceof Document)
        return {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      var e = n.getBoundingClientRect();
      return {
        top: e.top,
        left: e.left,
        bottom: e.bottom,
        right: e.right,
        width: (n.clientWidth || e.width) * t,
        height: (n.clientHeight || e.height) * t
      };
    }, de = function(n) {
      return !n || n instanceof Document ? ye() : {
        x: n.scrollLeft >= 0 ? n.scrollLeft : ye().x,
        y: n.scrollTop >= 0 ? n.scrollTop : ye().y
      };
    }, Ce = function(n) {
      var t = n.elementRect, e = n.containerRect, s = n.tolerance, r = s === void 0 ? {
        x: 0,
        y: 0
      } : s, l = [];
      return t.top - r.y < e.top && l.push("top"), t.left - r.x < e.left && l.push("left"), t.bottom + r.y > e.bottom && l.push("bottom"), t.right + r.y > e.right && l.push("right"), l;
    }, ct = function(n) {
      var t = n.event;
      return {
        x: t.clientX,
        y: t.clientY
      };
    }, ut = function(n) {
      var t = n.scrollAmount, e = n.initialPointerPos, s = n.pointerPos, r = {};
      return s.x > e.x - t.x ? (r.left = e.x - t.x, r.width = s.x - e.x + t.x) : (r.left = s.x, r.width = e.x - s.x - t.x), s.y > e.y - t.y ? (r.top = e.y - t.y, r.height = s.y - e.y + t.y) : (r.top = s.y, r.height = e.y - s.y - t.y), r;
    }, Pe = function(t) {
      var e = {
        x: 0,
        y: 0
      }, s = window.getComputedStyle(t);
      if (!s.transform || s.transform === "none")
        return e;
      if (s.transform.indexOf("3d") >= 0) {
        var r = s.transform.trim().match(/matrix3d\((.*?)\)/);
        if (r && r.length) {
          var l, c = (l = r[1]) === null || l === void 0 ? void 0 : l.split(",");
          e.x = parseInt(c[12]) || 0, e.y = parseInt(c[13]) || 0;
        }
        return e;
      } else {
        var d = s.transform.trim().match(/matrix\((.*?)\)/);
        if (d && d.length) {
          var m, b = (m = d[1]) === null || m === void 0 ? void 0 : m.split(",");
          e.x = parseInt(b[4]) || 0, e.y = parseInt(b[5]) || 0;
        }
        return e;
      }
    }, dt = function(t) {
      var e = t.style.transform;
      if (!e || e.indexOf("translate") < 0)
        return Pe(t);
      var s = {
        x: 0,
        y: 0
      }, r = e.trim().match(/translate[3dD]*?\(.*?\)/);
      if (r) {
        var l, c = (l = r[0]) === null || l === void 0 ? void 0 : l.split("(");
        if (c) {
          var d, m = (d = c[1]) === null || d === void 0 ? void 0 : d.split(",");
          s.x = parseInt(m[0]) || 0, s.y = parseInt(m[1]) || 0;
        }
      }
      return !s.x && !s.x ? Pe(t) : s;
    }, ht = function(t) {
      var e = t.style, s = {
        x: parseInt(e.left) || 0,
        y: parseInt(e.top) || 0
      };
      if (!s.x && !s.x) {
        var r = window.getComputedStyle(t);
        return {
          x: parseInt(r.left) || 0,
          y: parseInt(r.top) || 0
        };
      }
      return s;
    }, mt = function(n, t) {
      return t ? dt(n) : ht(n);
    }, ft = function(n) {
      var t = n.element, e = n.edges, s = n.elementRect, r = n.containerRect, l = n.elementPos, c = n.useTransform;
      e.includes("top") && ae(t, {
        y: l.y + r.top - s.top,
        x: l.x
      }, c), e.includes("left") && ae(t, {
        y: l.y,
        x: l.x + r.left - s.left
      }, c), e.includes("bottom") && ae(t, {
        y: l.y + r.bottom - s.bottom,
        x: l.x
      }, c), e.includes("right") && ae(t, {
        y: l.y,
        x: l.x + r.right - s.right
      }, c);
    }, Me = function(n) {
      var t = n.computedStyle, e = n.node, s = t.position, r = s === "absolute" || s === "relative" || s === "fixed";
      !(e instanceof HTMLDocument) && !r && (e.style.position = "relative");
    }, gt = function(n) {
      var t = n.shiftKey, e = n.keyboardDragSpeed, s = n.zoom, r = n.key, l = n.dragKeys, c = n.scrollDiff, d = n.canScroll, m = n.scrollCallback, b = {
        x: 0,
        y: 0
      }, v = t ? e * 4 * s : e * s;
      return l.left.includes(r) && (b.x = c.x || -v, !t && !c.x && d && m(["left"], e)), l.right.includes(r) && (b.x = c.x || v, !t && !c.x && d && m(["right"], e)), l.up.includes(r) && (b.y = c.y || -v, !t && !c.y && d && m(["top"], e)), l.down.includes(r) && (b.y = c.y || v, !t && !c.y && d && m(["bottom"], e)), b;
    }, vt = function(n) {
      var t = n.element, e = n.force, s = n.multiSelectionToggle, r = n.SelectedSet, l = n.hoverClassName;
      t.classList.contains(l) && !e || (r.has(t) ? s && r.delete(t) : r.add(t), t.classList.add(l));
    }, pt = function(n) {
      var t = n.element, e = n.force, s = n.SelectedSet, r = n.PrevSelectedSet, l = n.hoverClassName;
      if (!t.classList.contains(l) && !e)
        return !1;
      var c = s.has(t), d = r.has(t);
      c && !d ? s.delete(t) : !c && d && s.add(t), t.classList.remove(l);
    }, be = function(n, t) {
      return n.left < t.right && n.right > t.left && n.top < t.bottom && n.bottom > t.top;
    }, je = function(n) {
      var t = n.element, e = n.posDirection, s = n.containerRect, r = n.useTransform, l = mt(t, r), c = B(l, "+", e);
      ae(t, c, r);
      var d = t.getBoundingClientRect(), m = Ce({
        elementRect: d,
        containerRect: s
      });
      ft({
        element: t,
        edges: m,
        elementRect: d,
        containerRect: s,
        elementPos: c,
        useTransform: r
      });
    }, yt = function(n, t) {
      window.removeEventListener("resize", t), window.removeEventListener("scroll", t), n.disconnect();
    }, bt = function(n, t, e) {
      if (!!t.length) {
        var s = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, r = n instanceof HTMLDocument ? s || document.body : n, l = t.includes("top") && r.scrollTop > 0, c = t.includes("bottom") && r.scrollTop < r.scrollHeight, d = t.includes("left") && r.scrollLeft > 0, m = t.includes("right") && r.scrollLeft < r.scrollWidth;
        l && (r.scrollTop -= 1 * e), c && (r.scrollTop += 1 * e), d && (r.scrollLeft -= 1 * e), m && (r.scrollLeft += 1 * e);
      }
    }, ae = function(n, t, e) {
      if (e) {
        var s = n.style.transform;
        n.style.transform = "translate3d(".concat(t.x, "px,").concat(t.y, "px,1px) ").concat(s.replace(/translate.*?\)/g, ""));
      } else
        n.style.left = "".concat(t.x, "px"), n.style.top = "".concat(t.y, "px");
      return n;
    }, _t = function(n) {
      for (var t = n.subscribe, e = n.publish, s = n.Interaction, r = n.SelectedSet, l = {
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
          condition: function(v) {
            return v.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, c = function() {
        var v = T(m[d], 2), x = v[0], M = v[1];
        ["pre", !1].forEach(function(L) {
          return t(L ? "".concat(x, ":").concat(L) : x, function(R) {
            return M.forEach(function(N) {
              return (!N.condition || N.condition(R)) && e(L ? "".concat(L).concat(N.name) : N.name, y({
                items: r.elements,
                isDragging: s.isDragging
              }, R));
            });
          });
        });
      }, d = 0, m = Object.entries(l); d < m.length; d++)
        c();
    }, ne = function(n) {
      return n ? !Array.isArray(n) && (n instanceof HTMLElement || n instanceof SVGElement) ? [n] : P(n) : [];
    }, Ae = function(n, t) {
      n.style.left = "".concat(t.left, "px"), n.style.top = "".concat(t.top, "px"), n.style.width = "".concat(t.width, "px"), n.style.height = "".concat(t.height, "px");
    }, St = /* @__PURE__ */ function() {
      function n(t) {
        var e = this, s = t.area, r = t.PS, l = t.zoom;
        a(this, n), o(this, "_modificationCallback", void 0), o(this, "_modificationObserver", void 0), o(this, "_zoom", void 0), o(this, "_node", void 0), o(this, "_parentNodes", void 0), o(this, "_computedStyle", void 0), o(this, "_computedBorder", void 0), o(this, "_rect", void 0), o(this, "setArea", function(c) {
          e._node = c, Me({
            computedStyle: e.computedStyle,
            node: e._node
          }), setTimeout(function() {
            e.PubSub.publish("Area:modified:pre", {
              item: e
            }), e.reset(), e.PubSub.publish("Area:modified", {
              item: e
            });
          });
        }), o(this, "start", function() {
          nt(e.parentNodes, e._modificationCallback, e._modificationObserver);
        }), o(this, "reset", function() {
          e._computedStyle = void 0, e._rect = void 0, e._computedBorder = void 0, e._parentNodes = void 0;
        }), o(this, "stop", function() {
          yt(e._modificationObserver, e._modificationCallback), e.reset();
        }), o(this, "scroll", function(c, d) {
          var m = {
            scroll_directions: c,
            scroll_multiplier: d
          };
          e.PubSub.publish("Area:scroll:pre", m), bt(e._node, c, d), e.PubSub.publish("Area:scroll", m);
        }), this._zoom = l, this.PubSub = r, this.setArea(s), this._modificationCallback = at(function(c) {
          e.PubSub.publish("Area:modified:pre", {
            event: c,
            item: e
          }), e.reset(), e.PubSub.publish("Area:modified", {
            event: c,
            item: e
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return u(n, [{
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
          return this._rect ? this._rect : this._rect = lt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var e = function s(r) {
            var l, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, d = (l = r[c]) === null || l === void 0 ? void 0 : l.parentNode;
            return d ? (r.push(d), c++, s(r, c)) : r;
          };
          return this._parentNodes = e([this.HTMLNode]), this._parentNodes;
        }
      }]), n;
    }(), wt = /* @__PURE__ */ function() {
      function n(t) {
        var e = this, s = t.DS, r = t.dragKeys, l = t.draggability, c = t.keyboardDrag, d = t.keyboardDragSpeed, m = t.useTransform, b = t.zoom;
        a(this, n), o(this, "_useTransform", void 0), o(this, "_prevCursorPos", void 0), o(this, "_prevScrollPos", void 0), o(this, "_elements", []), o(this, "_draggability", void 0), o(this, "_dragKeys", void 0), o(this, "_dragKeysFlat", void 0), o(this, "_keyboardDrag", void 0), o(this, "_keyboardDragSpeed", void 0), o(this, "_zoom", void 0), o(this, "keyboardDrag", function(v) {
          var x = v.event, M = v.key;
          if (!(!e._keyboardDrag || !e._dragKeysFlat.includes(M) || !e.DS.SelectedSet.size || !e._draggability || e.DS.continue)) {
            var L = {
              event: x,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            e.DS.publish(["Interaction:start:pre", "Interaction:start"], L), e._elements = e.DS.getSelection(), e.handleZIndex(!0);
            var R = gt({
              shiftKey: e.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: e._keyboardDragSpeed,
              zoom: e._zoom,
              key: M,
              scrollCallback: e.DS.Area.scroll,
              scrollDiff: e._scrollDiff,
              canScroll: e.DS.stores.ScrollStore.canScroll,
              dragKeys: e._dragKeys
            });
            e._elements.forEach(function(N) {
              return je({
                element: N,
                posDirection: R,
                containerRect: e.DS.SelectorArea.rect,
                useTransform: e._useTransform
              });
            }), e.DS.publish(["Interaction:update:pre", "Interaction:update"], L);
          }
        }), o(this, "keyboardEnd", function(v) {
          var x = v.event, M = v.key;
          if (!(!e._keyboardDrag || !e._dragKeysFlat.includes(M) || !e.DS.SelectedSet.size || !e._draggability)) {
            var L = {
              event: x,
              isDragging: e._draggability,
              isDraggingKeyboard: !0
            };
            e.DS.publish(["Interaction:end:pre", "Interaction:end"], L);
          }
        }), o(this, "start", function(v) {
          var x = v.isDragging, M = v.isDraggingKeyboard;
          !x || M || (e._prevCursorPos = null, e._prevScrollPos = null, e._elements = e.DS.getSelection(), e.handleZIndex(!0));
        }), o(this, "stop", function(v) {
          v != null && v.isKeyboard || (e._prevCursorPos = null, e._prevScrollPos = null, e.handleZIndex(!1), e._elements = []);
        }), o(this, "update", function(v) {
          var x = v.isDragging, M = v.isDraggingKeyboard;
          if (!(!x || !e._elements.length || M || e.DS.continue)) {
            var L = B(e._cursorDiff, "+", e._scrollDiff);
            e._elements.forEach(function(R) {
              return je({
                element: R,
                posDirection: L,
                containerRect: e.DS.SelectorArea.rect,
                useTransform: e._useTransform
              });
            });
          }
        }), o(this, "handleZIndex", function(v) {
          e._elements.forEach(function(x) {
            return x.style.zIndex = "".concat((parseInt(x.style.zIndex) || 0) + v ? 9999 : -9998);
          });
        }), this.DS = s, this._useTransform = m, this._keyboardDragSpeed = d, this._keyboardDrag = c, this._zoom = b, this._draggability = l, this._dragKeys = {
          up: r.up.map(function(v) {
            return v.toLowerCase();
          }),
          down: r.down.map(function(v) {
            return v.toLowerCase();
          }),
          left: r.left.map(function(v) {
            return v.toLowerCase();
          }),
          right: r.right.map(function(v) {
            return v.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(P(this._dragKeys.up), P(this._dragKeys.down), P(this._dragKeys.left), P(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return u(n, [{
        key: "_cursorDiff",
        get: function() {
          var e = this.DS.stores.PointerStore.currentVal, s = this._prevCursorPos ? B(e, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = e, s;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var e = this.DS.stores.ScrollStore.currentVal, s = this._prevScrollPos ? B(e, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = e, s;
        }
      }]), n;
    }(), kt = /* @__PURE__ */ function() {
      function n(t) {
        var e = this, s = t.DS, r = t.areaElement, l = t.draggability, c = t.immediateDrag, d = t.selectableClass;
        a(this, n), o(this, "_areaElement", void 0), o(this, "_draggability", void 0), o(this, "_immediateDrag", void 0), o(this, "_selectableClass", void 0), o(this, "isInteracting", void 0), o(this, "isDragging", void 0), o(this, "init", function() {
          return e.DS.publish("Interaction:init:pre", {});
        }), o(this, "_init", function() {
          e.stop(), e._areaElement.addEventListener("mousedown", e.start), e._areaElement.addEventListener("touchstart", e.start, {
            passive: !1
          }), e.DS.publish("Interaction:init", {});
        }), o(this, "start", function(m) {
          return e.DS.publish("Interaction:start:pre", {
            event: m,
            isDragging: e.isDragging
          });
        }), o(this, "_start", function(m) {
          m.type === "touchstart" && m.preventDefault(), e._canInteract(m) && (e.isInteracting = !0, e.isDragging = e.isDragEvent(m), e.DS.publish("Interaction:start", {
            event: m,
            isDragging: e.isDragging
          }), document.addEventListener("mouseup", e.reset), document.addEventListener("touchend", e.reset));
        }), o(this, "isDragEvent", function(m) {
          var b = m.target.closest(".".concat(e._selectableClass));
          return !e._draggability || e.DS.stores.KeyStore.isMultiSelectKeyPressed(m) || !b ? !1 : (e._immediateDrag && (e.DS.SelectedSet.size ? e.DS.SelectedSet.has(b) || (e.DS.SelectedSet.clear(), e.DS.SelectedSet.add(
            b
          )) : e.DS.SelectedSet.add(
            b
          )), !!e.DS.SelectedSet.has(b));
        }), o(this, "onClick", function(m) {
          var b = m.event;
          if (!!e._canInteract(b) && !(b.detail > 0)) {
            var v = e.DS, x = v.stores, M = x.PointerStore, L = x.KeyStore, R = v.SelectableSet, N = v.SelectedSet;
            M.start(b);
            var oe = b.target;
            !R.has(oe) || (L.isMultiSelectKeyPressed(b) || N.clear(), N.toggle(oe), e.reset());
          }
        }), o(this, "stop", function() {
          e.isInteracting = !1, e.isDragging = !1, e._areaElement.removeEventListener("mousedown", e.start), e._areaElement.removeEventListener("touchstart", e.start, {
            passive: !1
          }), document.removeEventListener("mouseup", e.reset), document.removeEventListener("touchend", e.reset);
        }), o(this, "update", function(m) {
          var b = m.event, v = m.scroll_directions, x = m.scroll_multiplier;
          e.isInteracting && e.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: b,
            scroll_directions: v,
            scroll_multiplier: x,
            isDragging: e.isDragging
          });
        }), o(this, "reset", function(m) {
          return e.DS.publish("Interaction:end:pre", {
            event: m,
            isDragging: e.isDragging
          });
        }), o(this, "_reset", function(m) {
          var b = e.isDragging;
          e.stop(), e.init(), e.DS.publish("Interaction:end", {
            event: m,
            isDragging: b
          });
        }), this._areaElement = r, this._draggability = l, this._immediateDrag = c, this._selectableClass = d, this.DS = s, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(m) {
          var b = m.event;
          return e.start(b);
        }), this.DS.subscribe("Interaction:start:pre", function(m) {
          var b = m.event;
          return e._start(b);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(m) {
          var b = m.event;
          return e._reset(b);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return u(n, [{
        key: "_canInteract",
        value: function(e) {
          var s = e.clientX === 0 && e.clientY === 0 && e.detail === 0 && e.target;
          return !(e.button === 2 || this.isInteracting || e.target && !this.DS.SelectorArea.isInside(
            e.target
          ) || !s && !this.DS.SelectorArea.isClicked(e));
        }
      }]), n;
    }(), xt = function n(t) {
      var e = this, s = t.DS;
      a(this, n), o(this, "subscribers", {}), o(this, "subscribe", function(r, l) {
        return Array.isArray(e.subscribers[r]) || (e.subscribers[r] = []), e.subscribers[r].push(l), e.subscribers[r].length - 1;
      }), o(this, "unsubscribe", function(r, l, c) {
        c >= 0 ? e.subscribers[r].splice(c, 1) : l && (e.subscribers[r] = e.subscribers[r].filter(function(d) {
          return d !== l;
        }));
      }), o(this, "publish", function(r, l) {
        Array.isArray(r) ? r.forEach(function(c) {
          return e._publish(c, l);
        }) : e._publish(r, l);
      }), o(this, "_publish", function(r, l) {
        var c = e.subscribers[r];
        !Array.isArray(c) || (r.includes(":pre") ? e._handlePrePublish(c, l) : e._handlePublish(c, l));
      }), o(this, "_handlePublish", function(r, l) {
        for (var c = 0, d = r.length; c < d; c++) {
          if (e.DS.stopped)
            return;
          r[c](l);
        }
      }), o(this, "_handlePrePublish", function(r, l) {
        for (var c = r.length; c--; ) {
          if (e.DS.stopped)
            return;
          r[c](l);
        }
      }), this.DS = s;
    }, Dt = /* @__PURE__ */ function(n) {
      w(e, n);
      var t = ie(e);
      function e(s) {
        var r, l = s.elements, c = s.className, d = s.hoverClassName, m = s.draggability, b = s.useTransform, v = s.DS;
        return a(this, e), r = t.call(this), o(V(r), "_initElements", void 0), o(V(r), "_className", void 0), o(V(r), "_hoverClassName", void 0), o(V(r), "_useTransform", void 0), o(V(r), "_draggability", void 0), o(V(r), "init", function() {
          return r._initElements.forEach(function(x) {
            return r.add(x);
          });
        }), o(V(r), "clear", function() {
          return r.forEach(function(x) {
            return r.delete(x);
          });
        }), o(V(r), "_onClick", function(x) {
          return r.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: x
          });
        }), o(V(r), "_onPointer", function(x) {
          return r.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: x
          });
        }), o(V(r), "addAll", function(x) {
          return x.forEach(function(M) {
            return r.add(M);
          });
        }), o(V(r), "deleteAll", function(x) {
          return x.forEach(function(M) {
            return r.delete(M);
          });
        }), r.DS = v, r._initElements = ne(l), r._className = c, r._hoverClassName = d, r._useTransform = b, r._draggability = m, r.DS.subscribe("Interaction:init", r.init), r;
      }
      return u(e, [{
        key: "add",
        value: function(r) {
          return r.classList.add(this._className), r.addEventListener("click", this._onClick), r.addEventListener("mousedown", this._onPointer), r.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Me({
            computedStyle: window.getComputedStyle(r),
            node: r
          }), D(S(e.prototype), "add", this).call(this, r);
        }
      }, {
        key: "delete",
        value: function(r) {
          return r.classList.remove(this._className), r.classList.remove(this._hoverClassName), r.removeEventListener("click", this._onClick), r.removeEventListener("mousedown", this._onPointer), r.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), D(S(e.prototype), "delete", this).call(this, r);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), e;
    }(/* @__PURE__ */ H(Set)), $t = /* @__PURE__ */ function(n) {
      w(e, n);
      var t = ie(e);
      function e(s) {
        var r, l = s.className, c = s.DS;
        return a(this, e), r = t.call(this), o(V(r), "_className", void 0), o(V(r), "clear", function() {
          return r.forEach(function(d) {
            return r.delete(d);
          });
        }), o(V(r), "addAll", function(d) {
          return d.forEach(function(m) {
            return r.add(m);
          });
        }), o(V(r), "deleteAll", function(d) {
          return d.forEach(function(m) {
            return r.delete(m);
          });
        }), r.DS = c, r._className = l, r;
      }
      return u(e, [{
        key: "add",
        value: function(r) {
          if (!D(S(e.prototype), "has", this).call(this, r)) {
            var l = {
              items: this.elements,
              item: r
            };
            return this.DS.publish("Selected:added:pre", l), D(S(e.prototype), "add", this).call(this, r), r.classList.add(this._className), r.style.zIndex = "".concat((parseInt(r.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", l), this;
          }
        }
      }, {
        key: "delete",
        value: function(r) {
          if (!!D(S(e.prototype), "has", this).call(this, r)) {
            var l = {
              items: this.elements,
              item: r
            };
            this.DS.publish("Selected:removed:pre", l);
            var c = D(S(e.prototype), "delete", this).call(this, r);
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
    }(/* @__PURE__ */ H(Set)), Ct = /* @__PURE__ */ function() {
      function n(t) {
        var e = this, s = t.DS, r = t.hoverClassName, l = t.multiSelectToggling;
        a(this, n), o(this, "_prevSelectedSet", void 0), o(this, "_hoverClassName", void 0), o(this, "_multiSelectToggling", void 0), o(this, "start", function(c) {
          var d = c.event, m = c.isDragging;
          m || (e._storePrevious(d), e._handleInsideSelection(!0, d));
        }), o(this, "update", function(c) {
          var d = c.isDragging;
          d || e.DS.continue || e._handleInsideSelection();
        }), o(this, "_handleInsideSelection", function(c, d) {
          for (var m = e.DS, b = m.SelectableSet, v = m.SelectorArea, x = m.Selector, M = b.elements.map(function(X) {
            return [X, X.getBoundingClientRect()];
          }), L = [], R = [], N = 0, oe = M.length; N < oe; N++)
            !v.isInside(M[N][0], M[N][1]) || (be(M[N][1], x.rect) ? L.push(M[N][0]) : R.push(M[N][0]));
          var he = e.DS.stores.KeyStore.isMultiSelectKeyPressed(d) && e._multiSelectToggling;
          e.DS.continue || (L.forEach(function(X) {
            return vt({
              element: X,
              force: c,
              multiSelectionToggle: he,
              SelectedSet: e.DS.SelectedSet,
              hoverClassName: e._hoverClassName
            });
          }), R.forEach(function(X) {
            return pt({
              element: X,
              force: c,
              SelectedSet: e.DS.SelectedSet,
              hoverClassName: e._hoverClassName,
              PrevSelectedSet: e._prevSelectedSet
            });
          }));
        }), this._hoverClassName = r, this._multiSelectToggling = l, this.DS = s, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return u(n, [{
        key: "_storePrevious",
        value: function(e) {
          var s = this.DS, r = s.stores.KeyStore, l = s.SelectedSet;
          r.isMultiSelectKeyPressed(e) ? this._prevSelectedSet = new Set(l) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), n;
    }(), Pt = /* @__PURE__ */ function() {
      function n(t) {
        var e = this, s = t.DS, r = t.selector, l = t.selectorClass, c = t.customStyles;
        a(this, n), o(this, "_rect", void 0), o(this, "start", function(d) {
          var m = d.isDragging;
          if (!m) {
            var b = e.DS.stores.PointerStore, v = b.initialValArea;
            Ae(e.HTMLNode, $e(v, 1)), e.HTMLNode.style.display = "block", e._rect = null;
          }
        }), o(this, "stop", function() {
          e.HTMLNode.style.width = "0", e.HTMLNode.style.height = "0", e.HTMLNode.style.display = "none";
        }), o(this, "update", function(d) {
          var m = d.isDragging;
          if (!(m || e.DS.continue)) {
            var b = e.DS.stores, v = b.ScrollStore, x = b.PointerStore, M = ut({
              scrollAmount: v.scrollAmount,
              initialPointerPos: x.initialValArea,
              pointerPos: x.currentValArea
            });
            Ae(e.HTMLNode, M), e._rect = null;
          }
        }), this.DS = s, this.HTMLNode = r || it(c), this.HTMLNode.classList.add(l), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return u(n, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), n;
    }(), Mt = /* @__PURE__ */ function() {
      function n(t) {
        var e = this, s = t.DS, r = t.selectorAreaClass, l = t.autoScrollSpeed, c = t.overflowTolerance;
        a(this, n), o(this, "_autoScrollSpeed", void 0), o(this, "_scrollInterval", void 0), o(this, "_rect", void 0), o(this, "currentEdges", []), o(this, "_overflowTolerance", void 0), o(this, "start", function() {
          return e.applyElements("append");
        }), o(this, "applyElements", function() {
          var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", m = document.body ? "body" : "documentElement", b = "".concat(d, "Child");
          e.HTMLNode[b](e.DS.Selector.HTMLNode), document[m][b](e.HTMLNode);
        }), o(this, "updatePos", function() {
          e._rect = null;
          var d = e.DS.Area.rect, m = e.DS.Area.computedBorder, b = e.HTMLNode.style, v = "".concat(d.top + m.top, "px"), x = "".concat(d.left + m.left, "px"), M = "".concat(d.width, "px"), L = "".concat(d.height, "px");
          b.top !== v && (b.top = v), b.left !== x && (b.left = x), b.width !== M && (b.width = M), b.height !== L && (b.height = L);
        }), o(this, "stop", function(d) {
          e.stopAutoScroll(), d && e.applyElements("remove");
        }), o(this, "startAutoScroll", function() {
          e.currentEdges = [], e._scrollInterval = setInterval(function() {
            return e.handleAutoScroll();
          }, 16);
        }), o(this, "handleAutoScroll", function() {
          if (!e.DS.continue) {
            var d = e.DS, m = d.stores.PointerStore, b = d.Area;
            e.currentEdges = Ce({
              elementRect: $e(m.currentVal),
              containerRect: e.rect,
              tolerance: e._overflowTolerance
            }), e.currentEdges.length && b.scroll(e.currentEdges, e._autoScrollSpeed);
          }
        }), o(this, "stopAutoScroll", function() {
          e.currentEdges = [], clearInterval(e._scrollInterval);
        }), o(this, "isInside", function(d, m) {
          return e.DS.Area.HTMLNode.contains(d) && e.DS.stores.ScrollStore.canScroll ? !0 : be(e.rect, m || d.getBoundingClientRect());
        }), this._autoScrollSpeed = l, this._overflowTolerance = c, this.DS = s, this.HTMLNode = st(r), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          e.updatePos(), e.stopAutoScroll();
        });
      }
      return u(n, [{
        key: "isClicked",
        value: function(e) {
          var s = this.DS.stores.PointerStore, r = e ? s.getPointerPosition(e) : s.initialVal;
          return be({
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
      }]), n;
    }(), jt = /* @__PURE__ */ function() {
      function n(t) {
        var e = this, s = t.DS, r = t.multiSelectKeys, l = t.multiSelectMode;
        a(this, n), o(this, "_multiSelectMode", void 0), o(this, "_multiSelectKeys", void 0), o(this, "_currentValues", /* @__PURE__ */ new Set()), o(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), o(this, "init", function() {
          document.addEventListener("keydown", e.keydown), document.addEventListener("keyup", e.keyup), window.addEventListener("blur", e.reset);
        }), o(this, "keydown", function(c) {
          var d = c.key.toLowerCase();
          e.DS.publish("KeyStore:down:pre", {
            event: c,
            key: d
          }), e._currentValues.add(d), e.DS.publish("KeyStore:down", {
            event: c,
            key: d
          });
        }), o(this, "keyup", function(c) {
          var d = c.key.toLowerCase();
          e.DS.publish("KeyStore:up:pre", {
            event: c,
            key: d
          }), e._currentValues.delete(d), e.DS.publish("KeyStore:up", {
            event: c,
            key: d
          });
        }), o(this, "stop", function() {
          document.removeEventListener("keydown", e.keydown), document.removeEventListener("keyup", e.reset), window.removeEventListener("blur", e.reset), e.reset();
        }), o(this, "reset", function() {
          return e._currentValues.clear();
        }), this.DS = s, this._multiSelectMode = l, this._multiSelectKeys = r.map(function(c) {
          var d = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, m = d[c];
          return m ? (console.warn("[DragSelect] ".concat(c, ' is deprecated. Use "').concat(m, '" instead. Act Now!. See docs for more info')), m.toLowerCase()) : c.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return u(n, [{
        key: "isMultiSelectKeyPressed",
        value: function(e) {
          var s = this;
          return !!(this._multiSelectMode || this.currentValues.some(function(r) {
            return s._multiSelectKeys.includes(r);
          }) || e && this._multiSelectKeys.some(function(r) {
            return e[s._keyMapping[r]];
          }));
        }
      }, {
        key: "currentValues",
        get: function() {
          return Array.from(this._currentValues.values());
        }
      }]), n;
    }(), At = /* @__PURE__ */ function() {
      function n(t) {
        var e = this, s = t.DS;
        a(this, n), o(this, "_isMouseInteraction", !1), o(this, "_initialValArea", void 0), o(this, "_currentValArea", void 0), o(this, "_lastValArea", void 0), o(this, "_initialVal", void 0), o(this, "_currentVal", void 0), o(this, "_lastVal", void 0), o(this, "_lastTouch", void 0), o(this, "init", function() {
          document.addEventListener("mousemove", e.update), document.addEventListener("touchmove", e.update, {
            passive: !1
          });
        }), o(this, "getPointerPosition", function(r) {
          return ct({
            event: e._normalizedEvent(r)
          });
        }), o(this, "update", function(r) {
          !r || (e.DS.publish("PointerStore:updated:pre", {
            event: r
          }), e.currentVal = e.getPointerPosition(r), e._isMouseInteraction && e.DS.publish("PointerStore:updated", {
            event: r
          }));
        }), o(this, "stop", function() {
          document.removeEventListener("mousemove", e.update), document.removeEventListener("touchmove", e.update, {
            passive: !1
          }), setTimeout(function() {
            return e._isMouseInteraction = !1;
          }, 100);
        }), o(this, "reset", function(r) {
          !r || (e.currentVal = e.lastVal = e.getPointerPosition(r), e.stop(), e.init());
        }), this.DS = s, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(r) {
          var l = r.event;
          return e.start(l);
        }), this.DS.subscribe("Interaction:end", function(r) {
          var l = r.event;
          return e.reset(l);
        });
      }
      return u(n, [{
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
          this._initialVal = e, this._initialValArea = e && B(e, "-", B(re(this.DS.Area.rect), "+", re(this.DS.Area.computedBorder)));
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
          this._currentVal = e, this._currentValArea = e && B(e, "-", B(re(this.DS.Area.rect), "+", re(this.DS.Area.computedBorder)));
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
          this._lastVal = e, this._lastValArea = e && B(e, "-", B(re(this.DS.Area.rect), "+", re(this.DS.Area.computedBorder)));
        }
      }]), n;
    }(), Et = /* @__PURE__ */ function() {
      function n(t) {
        var e = this, s = t.DS, r = t.areaElement, l = t.zoom;
        a(this, n), o(this, "_initialVal", void 0), o(this, "_currentVal", void 0), o(this, "_areaElement", void 0), o(this, "_canScroll", void 0), o(this, "init", function() {
          return e._areaElement.addEventListener("scroll", e.update);
        }), o(this, "start", function() {
          e._currentVal = e._initialVal = de(e._areaElement), e._areaElement.addEventListener("scroll", e.update);
        }), o(this, "update", function() {
          return e._currentVal = de(e._areaElement);
        }), o(this, "stop", function() {
          e._areaElement.removeEventListener("scroll", e.update), e._initialVal = {
            x: 0,
            y: 0
          }, e._canScroll = null;
        }), o(this, "reset", function() {
          e.stop(), e.start();
        }), this._areaElement = r, this.DS = s, this.zoom = l, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return e.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return e.reset();
        });
      }
      return u(n, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = ot(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var e = B(this.currentVal, "-", this.initialVal), s = rt(this.zoom), r = B(B(e, "*", s), "-", e);
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
          return this._currentVal || (this._currentVal = de(this._areaElement)), this._currentVal;
        }
      }]), n;
    }(), Tt = /* @__PURE__ */ function() {
      function n(t) {
        var e = this, s = t.area, r = s === void 0 ? document : s, l = t.selectables, c = l === void 0 ? [] : l, d = t.autoScrollSpeed, m = d === void 0 ? 5 : d, b = t.overflowTolerance, v = b === void 0 ? {
          x: 25,
          y: 25
        } : b, x = t.zoom, M = x === void 0 ? 1 : x, L = t.customStyles, R = L === void 0 ? !1 : L, N = t.multiSelectMode, oe = N === void 0 ? !1 : N, he = t.multiSelectToggling, X = he === void 0 ? !0 : he, Ee = t.multiSelectKeys, It = Ee === void 0 ? ["Control", "Shift", "Meta"] : Ee, Te = t.selector, Vt = Te === void 0 ? void 0 : Te, Ie = t.draggability, _e = Ie === void 0 ? !0 : Ie, Ve = t.immediateDrag, Lt = Ve === void 0 ? !0 : Ve, Le = t.keyboardDrag, Ot = Le === void 0 ? !0 : Le, Nt = t.dragKeys, Oe = t.keyboardDragSpeed, zt = Oe === void 0 ? 10 : Oe, Ne = t.useTransform, ze = Ne === void 0 ? !0 : Ne, Ke = t.hoverClass, Be = Ke === void 0 ? "ds-hover" : Ke, He = t.selectableClass, Re = He === void 0 ? "ds-selectable" : He, Fe = t.selectedClass, Kt = Fe === void 0 ? "ds-selected" : Fe, Ue = t.selectorClass, Bt = Ue === void 0 ? "ds-selector" : Ue, qe = t.selectorAreaClass, Ht = qe === void 0 ? "ds-selector-area" : qe, Rt = t.callback, Ft = t.onDragMove, Ut = t.onDragStartBegin, qt = t.onDragStart, Wt = t.onElementSelect, Yt = t.onElementUnselect;
        a(this, n), o(this, "continue", !1), o(this, "start", function() {
          e.stopped = !1, e.Interaction.init();
        }), o(this, "break", function() {
          return e.continue = !0;
        }), o(this, "getSelection", function() {
          return e.SelectedSet.elements;
        }), o(this, "getSelectables", function() {
          return e.SelectableSet.elements;
        }), o(this, "getInitialCursorPosition", function() {
          return e.stores.PointerStore.initialVal;
        }), o(this, "getCurrentCursorPosition", function() {
          return e.stores.PointerStore.currentVal;
        }), o(this, "getPreviousCursorPosition", function() {
          return e.stores.PointerStore.lastVal;
        }), o(this, "getInitialCursorPositionArea", function() {
          return e.stores.PointerStore.initialValArea;
        }), o(this, "getCurrentCursorPositionArea", function() {
          return e.stores.PointerStore.currentValArea;
        }), o(this, "getPreviousCursorPositionArea", function() {
          return e.stores.PointerStore.lastValArea;
        }), o(this, "isMultiSelect", function(Jt) {
          return e.stores.KeyStore.isMultiSelectKeyPressed(Jt);
        }), o(this, "isDragging", function() {
          return e.Interaction.isDragging;
        }), this.PubSub = new xt({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: Rt,
          onDragMove: Ft,
          onDragStart: qt,
          onDragStartBegin: Ut,
          onElementSelect: Wt,
          onElementUnselect: Yt
        }), this.stores = {
          PointerStore: new At({
            DS: this
          }),
          ScrollStore: new Et({
            DS: this,
            areaElement: r,
            zoom: M
          }),
          KeyStore: new jt({
            DS: this,
            multiSelectKeys: It,
            multiSelectMode: oe
          })
        }, this.Area = new St({
          area: r,
          PS: this.PubSub,
          zoom: M
        }), this.Selector = new Pt({
          DS: this,
          selector: Vt,
          selectorClass: Bt,
          customStyles: R
        }), this.SelectorArea = new Mt({
          DS: this,
          selectorAreaClass: Ht,
          autoScrollSpeed: m,
          overflowTolerance: v
        }), this.SelectableSet = new Dt({
          elements: c,
          DS: this,
          className: Re,
          hoverClassName: Be,
          useTransform: ze,
          draggability: _e
        }), this.SelectedSet = new $t({
          DS: this,
          className: Kt
        }), this.Selection = new Ct({
          DS: this,
          hoverClassName: Be,
          multiSelectToggling: X
        }), this.Drag = new wt({
          DS: this,
          draggability: _e,
          useTransform: ze,
          keyboardDrag: Ot,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, Nt),
          zoom: M,
          keyboardDragSpeed: zt
        }), this.Interaction = new kt({
          areaElement: r,
          DS: this,
          draggability: _e,
          immediateDrag: Lt,
          selectableClass: Re
        }), _t({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return e.continue = !1;
        }), this.start();
      }
      return u(n, [{
        key: "_callbacksTemp",
        value: function(e) {
          var s = e.callback, r = e.onDragMove, l = e.onDragStart, c = e.onDragStartBegin, d = e.onElementSelect, m = e.onElementUnselect, b = function(x, M) {
            return console.warn("[DragSelect] ".concat(x, ' is deprecated. Use DragSelect.subscribe("').concat(M, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          s && (b("callback", "callback"), this.subscribe("callback", function(v) {
            var x = v.items;
            v.item;
            var M = v.event;
            return s(x, M);
          })), r && (b("onDragMove", "dragmove"), this.subscribe("dragmove", function(v) {
            v.items, v.item;
            var x = v.event;
            return r(x);
          })), l && (b("onDragStart", "dragstart"), this.subscribe("dragstart", function(v) {
            v.items, v.item;
            var x = v.event;
            return l(x);
          })), c && (b("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(v) {
            v.items, v.item;
            var x = v.event;
            return c(x);
          })), d && (b("onElementSelect", "elementselect"), this.subscribe("elementselect", function(v) {
            v.items;
            var x = v.item, M = v.event;
            return d(x, M);
          })), m && (b("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(v) {
            v.items;
            var x = v.item, M = v.event;
            return m(x, M);
          }));
        }
      }, {
        key: "stop",
        value: function() {
          var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          r && this.publish("callback", {
            items: this.getSelection()
          }), this.Interaction.stop(), this.Area.stop(), this.Drag.stop(), this.Selector.stop(), this.SelectorArea.stop(e), this.stores.KeyStore.stop(), this.stores.PointerStore.stop(), this.stores.ScrollStore.stop(), e && this.SelectableSet.clear(), s && this.SelectedSet.clear(), this.stopped = !0;
        }
      }, {
        key: "addSelection",
        value: function(e) {
          var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.addAll(ne(e)), r || this.addSelectables(e), s && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(e) {
          var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(ne(e)), r && this.removeSelectables(e), s && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(e) {
          var s = this, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return ne(e).forEach(function(c) {
            return s.SelectedSet.has(c) ? s.removeSelection(e, r, l) : s.addSelection(e, r, l);
          }), r && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "setSelection",
        value: function(e) {
          var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.clearSelection(), this.addSelection(e, s, r), this.getSelection();
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
          var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = ne(e);
          return this.SelectableSet.addAll(r), s && this.SelectedSet.addAll(r), e;
        }
      }, {
        key: "setSelectables",
        value: function(e) {
          var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.removeSelectables(e, s), this.addSelectables(e, r);
        }
      }, {
        key: "removeSelectables",
        value: function(e) {
          var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return this.SelectableSet.deleteAll(ne(e)), s && this.removeSelection(e), e;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var r = s ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), l = e ? s ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : s ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return B(r, "-", l);
        }
      }]), n;
    }();
    return Tt;
  });
})(Qe);
const Pr = Qe.exports, Mr = (f, h, a, g, u) => (h = Math, a = h.log, g = 1024, u = a(f) / a(g) | 0, f / h.pow(g, u)).toFixed(0) + " " + (u ? "KMGTPEZY"[--u] + "iB" : "B"), jr = (f, h = "en-US") => new Date(f * 1e3).toLocaleString(h), Ar = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Er = /* @__PURE__ */ i("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Tr = [
  Er
], Ir = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Vr = /* @__PURE__ */ i("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), Lr = [
  Vr
], Or = {
  name: "VFSortIcon"
}, we = /* @__PURE__ */ Object.assign(Or, {
  props: { direction: String },
  setup(f) {
    return (h, a) => (_(), $("div", null, [
      f.direction == "down" ? (_(), $("svg", Ar, Tr)) : q("", !0),
      f.direction == "up" ? (_(), $("svg", Ir, Lr)) : q("", !0)
    ]));
  }
}), Nr = { class: "relative h-full" }, zr = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, Kr = /* @__PURE__ */ se(" Name "), Br = /* @__PURE__ */ se(" Size "), Hr = /* @__PURE__ */ se(" Date "), Rr = { class: "absolute" }, Fr = /* @__PURE__ */ i("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ i("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), Ur = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, qr = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Wr = { class: "grid grid-cols-12 items-center" }, Yr = { class: "flex col-span-7 items-center" }, Jr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zr = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Xr = [
  Zr
], Gr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qr = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), en = [
  Qr
], tn = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, rn = { class: "col-span-2 text-center" }, nn = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, on = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], sn = { class: "relative" }, an = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ln = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), cn = [
  ln
], un = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, dn = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), hn = [
  dn
], mn = { class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500" }, fn = { class: "break-all" }, gn = {
  name: "VFExplorer"
}, vn = /* @__PURE__ */ Object.assign(gn, {
  props: {
    view: String,
    data: Object
  },
  setup(f) {
    const h = f, a = inject("emitter"), { getStore: g } = inject("storage"), u = (D) => D == null ? void 0 : D.substring(0, 3), o = (D) => D.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), p = E(null), y = E(null), w = E(0), S = E(null), C = (D) => {
      D.type == "dir" ? a.emit("vf-fetch", { q: "index", adapter: h.data.adapter, path: D.path }) : a.emit("vf-modal-show", { type: "preview", adapter: h.data.adapter, item: D });
    }, k = fe({ active: !1, column: "", order: "" }), A = (D = !0) => {
      let T = [...h.data.files], P = k.column, U = k.order == "asc" ? 1 : -1;
      if (!D)
        return T;
      const O = (J, Z) => typeof J == "string" && typeof Z == "string" ? J.toLowerCase().localeCompare(Z.toLowerCase()) : J < Z ? -1 : J > Z ? 1 : 0;
      return k.active && (T = T.slice().sort((J, Z) => O(J[P], Z[P]) * U)), T;
    }, F = (D) => {
      k.active && k.column == D ? (k.active = k.order == "asc", k.column = D, k.order = "desc") : (k.active = !0, k.column = D, k.order = "asc");
    }, H = () => S.value.getSelection().map((D) => JSON.parse(D.dataset.item)), V = (D, T) => {
      if (D.altKey || D.ctrlKey || D.metaKey)
        return D.preventDefault(), !1;
      D.dataTransfer.setDragImage(y.value, 0, 15), D.dataTransfer.effectAllowed = "all", D.dataTransfer.dropEffect = "copy", D.dataTransfer.setData("items", JSON.stringify(H()));
    }, ue = (D, T) => {
      D.preventDefault();
      let P = JSON.parse(D.dataTransfer.getData("items"));
      if (P.find((U) => U.storage != g("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      a.emit("vf-modal-show", { type: "move", items: { from: P, to: T } });
    }, ie = (D, T) => {
      D.preventDefault(), !T || T.type !== "dir" || S.value.getSelection().find((P) => P == D.currentTarget) ? (D.dataTransfer.dropEffect = "none", D.dataTransfer.effectAllowed = "none") : D.dataTransfer.dropEffect = "copy";
    };
    return W(() => {
      S.value = new Pr({
        area: p.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), a.on("vf-explorer-update", () => Xe(() => {
        S.value.clearSelection(), S.value.setSelectables(document.getElementsByClassName("vf-item"));
      })), S.value.subscribe("predragstart", ({ event: D, isDragging: T }) => {
        if (T)
          w.value = S.value.getSelection().length, S.value.break();
        else {
          const P = D.target.offsetWidth - D.offsetX, U = D.target.offsetHeight - D.offsetY;
          P < 15 && U < 15 && (S.value.clearSelection(), S.value.break());
        }
      }), S.value.subscribe("predragmove", ({ isDragging: D }) => {
        D && S.value.break();
      }), S.value.subscribe("callback", ({ items: D, event: T, isDragging: P }) => {
        a.emit("vf-nodes-selected", H()), w.value = S.value.getSelection().length;
      });
    }), W(() => {
      Ze(() => h.view, () => a.emit("vf-explorer-update"));
    }), (D, T) => (_(), $("div", Nr, [
      f.view == "list" ? (_(), $("div", zr, [
        i("div", {
          onClick: T[0] || (T[0] = (P) => F("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center pl-1"
        }, [
          Kr,
          Q(G(we, {
            direction: k.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [Se, k.active && k.column == "basename"]
          ])
        ]),
        i("div", {
          onClick: T[1] || (T[1] = (P) => F("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          Br,
          Q(G(we, {
            direction: k.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [Se, k.active && k.column == "file_size"]
          ])
        ]),
        i("div", {
          onClick: T[2] || (T[2] = (P) => F("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center"
        }, [
          Hr,
          Q(G(we, {
            direction: k.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [Se, k.active && k.column == "last_modified"]
          ])
        ])
      ])) : q("", !0),
      i("div", Rr, [
        i("div", {
          ref: (P) => y.value = P,
          class: "absolute -z-50"
        }, [
          Fr,
          i("div", Ur, I(w.value), 1)
        ], 512)
      ]),
      i("div", {
        class: "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto resize-y p-1 z-0",
        ref: (P) => p.value = P,
        onContextmenu: T[3] || (T[3] = me((P) => j(a).emit("vf-contextmenu-show", { event: P, area: p.value, items: H() }), ["self", "prevent"]))
      }, [
        f.view == "list" ? (_(!0), $(ee, { key: 0 }, te(A(), (P, U) => (_(), $("div", {
          draggable: "true",
          onDblclick: (O) => C(P),
          onContextmenu: me((O) => j(a).emit("vf-contextmenu-show", { event: O, area: p.value, items: H(), target: P }), ["prevent"]),
          onDragstart: (O) => V(O),
          onDragover: (O) => ie(O, P),
          onDrop: (O) => ue(O, P),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": P.type,
          "data-item": JSON.stringify(P),
          "data-index": U
        }, [
          i("div", Wr, [
            i("div", Yr, [
              P.type == "dir" ? (_(), $("svg", Jr, Xr)) : (_(), $("svg", Gr, en)),
              i("span", tn, I(P.basename), 1)
            ]),
            i("div", rn, I(P.file_size ? j(Mr)(P.file_size) : ""), 1),
            i("div", nn, I(j(jr)(P.last_modified)), 1)
          ])
        ], 40, qr))), 256)) : q("", !0),
        f.view == "grid" ? (_(!0), $(ee, { key: 1 }, te(A(!1), (P, U) => (_(), $("div", {
          draggable: "true",
          onDblclick: (O) => C(P),
          onContextmenu: me((O) => j(a).emit("vf-contextmenu-show", { event: O, area: p.value, items: H(), target: P }), ["prevent"]),
          onDragstart: (O) => V(O),
          onDragover: (O) => ie(O, P),
          onDrop: (O) => ue(O, P),
          class: "vf-item border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none",
          "data-type": P.type,
          "data-item": JSON.stringify(P),
          "data-index": U
        }, [
          i("div", null, [
            i("div", sn, [
              P.type == "dir" ? (_(), $("svg", an, cn)) : (_(), $("svg", un, hn)),
              i("div", mn, I(u(P.extension)), 1)
            ]),
            i("span", fn, I(o(P.basename)), 1)
          ])
        ], 40, on))), 256)) : q("", !0)
      ], 544)
    ]));
  }
}), pn = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, yn = { class: "flex leading-5 items-center" }, bn = /* @__PURE__ */ i("div", {
  class: "mx-2",
  "aria-label": "Storage",
  "data-microtip-position": "top",
  role: "tooltip"
}, [
  /* @__PURE__ */ i("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-5 w-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "1"
  }, [
    /* @__PURE__ */ i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    })
  ])
], -1), _n = ["value"], Sn = { class: "ml-3" }, wn = { class: "flex leading-5 items-center" }, kn = /* @__PURE__ */ i("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ i("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), xn = [
  kn
], Dn = {
  name: "VFStatusbar"
}, $n = /* @__PURE__ */ Object.assign(Dn, {
  props: {
    data: Object
  },
  setup(f) {
    var w;
    const h = f, a = inject("emitter"), { getStore: g, setStore: u } = inject("storage"), o = E(0), p = E((w = g("adapter")) != null ? w : h.data.adapter), y = () => {
      a.emit("vf-fetch", { q: "index", adapter: p.value }), u("adapter", p.value);
    };
    return a.on("vf-nodes-selected", (S) => {
      o.value = S.length;
    }), (S, C) => (_(), $("div", pn, [
      i("div", yn, [
        bn,
        Q(i("select", {
          "onUpdate:modelValue": C[0] || (C[0] = (k) => p.value = k),
          onChange: y,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (_(!0), $(ee, null, te(f.data.storages, (k) => (_(), $("option", { value: k }, I(k), 9, _n))), 256))
        ], 544), [
          [Xt, p.value]
        ]),
        i("span", Sn, I(o.value > 0 ? o.value + " items selected." : ""), 1)
      ]),
      i("div", wn, [
        i("span", {
          onClick: C[1] || (C[1] = (k) => j(a).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: "Vuefinder is a file manager component for vue 3." }))
        }, xn)
      ])
    ]));
  }
}), Cn = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none" }, Pn = /* @__PURE__ */ i("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Mn = [
  Pn
], jn = { class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full" }, An = /* @__PURE__ */ i("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), En = [
  An
], Tn = { class: "flex leading-5" }, In = /* @__PURE__ */ i("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Vn = ["title", "onClick"], Ln = {
  name: "VFBreadcrumb"
}, On = /* @__PURE__ */ Object.assign(Ln, {
  props: {
    data: Object
  },
  setup(f) {
    const h = f, a = inject("emitter"), { getStore: g } = inject("storage"), u = E(null), o = E([]);
    a.on("vf-explorer-update", (w) => {
      var k;
      let S = [], C = [];
      u.value = (k = h.data.dirname) != null ? k : "", u.value.length == 0 && (o.value = []), u.value.split("/").forEach(function(A) {
        S.push(A), S.join("/") != "" && C.push({
          basename: A,
          name: A,
          path: S.join("/"),
          type: "dir"
        });
      }), C.length > 4 && (C = C.slice(-5), C[0].name = ".."), o.value = C;
    });
    const p = (w) => {
      var C;
      w.preventDefault();
      let S = JSON.parse(w.dataTransfer.getData("items"));
      if (S.find((k) => k.storage != g("adapter"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      a.emit("vf-modal-show", {
        type: "move",
        items: { from: S, to: (C = o.value[o.value.length - 2]) != null ? C : { path: "/" } }
      });
    }, y = (w) => {
      w.preventDefault(), o.value.length < 1 && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
    };
    return (w, S) => (_(), $("div", Cn, [
      (_(), $("svg", {
        onDragover: S[0] || (S[0] = (C) => y(C)),
        onDrop: S[1] || (S[1] = (C) => p(C)),
        onClick: S[2] || (S[2] = (C) => {
          var k, A;
          return !o.value.length || j(a).emit("vf-fetch", { q: "index", adapter: f.data.adapter, path: (A = (k = o.value[o.value.length - 2]) == null ? void 0 : k.path) != null ? A : "" });
        }),
        class: le(["h-6 w-6 p-0.5 rounded", o.value.length ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, Mn, 34)),
      i("div", jn, [
        (_(), $("svg", {
          onClick: S[3] || (S[3] = (C) => j(a).emit("vf-fetch", { q: "index", adapter: f.data.adapter })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, En)),
        i("div", Tn, [
          (_(!0), $(ee, null, te(o.value, (C, k) => (_(), $("div", { key: k }, [
            In,
            i("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: C.basename,
              onClick: (A) => j(a).emit("vf-fetch", { q: "index", adapter: f.data.adapter, path: C.path })
            }, I(C.name), 9, Vn)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Nn = ["onClick"], zn = /* @__PURE__ */ i("span", { class: "px-1" }, null, -1), Kn = {
  name: "VFContextMenu"
}, Bn = /* @__PURE__ */ Object.assign(Kn, {
  props: {
    current: Object
  },
  setup(f) {
    const h = f, a = inject("emitter"), g = E(null), u = fe({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), o = E([]);
    a.on("vf-context-selected", (S) => {
      o.value = S;
    });
    const p = {
      newfolder: {
        title: "New Folder",
        action: () => {
          a.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: "Delete",
        action: () => {
          a.emit("vf-modal-show", { type: "delete", items: o });
        }
      },
      refresh: {
        title: "Refresh",
        action: () => {
          a.emit("vf-fetch", { q: "index", adapter: h.current.adapter, path: h.current.dirname });
        }
      },
      preview: {
        title: "Preview",
        action: () => {
          a.emit("vf-modal-show", { type: "preview", adapter: h.current.adapter, item: o.value[0] });
        }
      },
      archive: {
        title: "Archive",
        action: () => {
          a.emit("vf-modal-show", { type: "archive", items: o });
        }
      },
      rename: {
        title: "Rename",
        action: () => {
          a.emit("vf-modal-show", { type: "rename", items: o });
        }
      }
    }, y = (S) => {
      a.emit("vf-contextmenu-hide"), S.action();
    };
    a.on("vf-contextmenu-show", ({ event: S, area: C, items: k, target: A = null }) => {
      u.items = [], A ? k.length > 1 && k.some((F) => F.path === A.path) ? (u.items.push(p.refresh), u.items.push(p.archive), u.items.push(p.delete), a.emit("vf-context-selected", k), console.log(k.length + " selected (more than 1 item.)")) : (u.items.push(p.refresh), u.items.push(p.preview), u.items.push(p.rename), u.items.push(p.archive), u.items.push(p.delete), a.emit("vf-context-selected", [A]), console.log(A.type + " is selected")) : (u.items.push(p.refresh), u.items.push(p.newfolder), a.emit("vf-context-selected", []), console.log("no files selected")), w(S, C);
    }), a.on("vf-contextmenu-hide", () => {
      u.active = !1;
    });
    const w = (S, C) => {
      u.active = !0, Xe(() => {
        let k = C.getBoundingClientRect(), A = S.pageX, F = S.pageY, H = g.value.offsetHeight, V = g.value.offsetWidth;
        A = k.right - S.pageX + window.scrollX < V ? A - V : A, F = k.bottom - S.pageY + window.scrollY < H ? F - H : F, u.positions = {
          left: A + "px",
          top: F + "px"
        };
      });
    };
    return (S, C) => u.active ? (_(), $("ul", {
      key: 0,
      class: "absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref: (k) => g.value = k,
      style: Gt(u.positions)
    }, [
      (_(!0), $(ee, null, te(u.items, (k) => (_(), $("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: k.title,
        onClick: (A) => y(k)
      }, [
        zn,
        i("span", null, I(k.title), 1)
      ], 8, Nn))), 128))
    ], 4)) : q("", !0);
  }
}), Hn = {
  name: "VueFinder"
}, Rn = /* @__PURE__ */ Object.assign(Hn, {
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
  setup(f) {
    const h = f, a = er();
    We("emitter", a);
    const { setStore: g, getStore: u } = Je(h.id);
    We("storage", Je(h.id));
    const o = fe({ adapter: "local", storages: [], dirname: ".", files: [] }), p = E(u("viewport", "grid")), y = E(u("darkMode", h.dark));
    a.on("vf-darkMode-toggle", () => {
      y.value = !y.value, g("darkMode", y.value);
    }), a.on("vf-view-toggle", (C) => {
      p.value = C;
    });
    const w = fe({
      active: !1,
      type: "delete",
      data: {}
    });
    a.on("vf-modal-close", () => {
      w.active = !1;
    }), a.on("vf-modal-show", (C) => {
      w.active = !0, w.type = C.type, C.url = h.url, w.data = C;
    });
    const S = (C) => {
      Object.assign(o, C), a.emit("vf-nodes-selected", {}), a.emit("vf-explorer-update", C);
    };
    return a.on("vf-fetch", (C) => {
      Ge(h.url, { params: C }).then((k) => {
        a.emit("vf-modal-close"), S(k);
      });
    }), W(() => {
      a.emit("vf-fetch", { q: "index", adapter: u("adapter", o.adapter) });
    }), (C, k) => (_(), $("div", {
      class: le(y.value ? "dark" : "")
    }, [
      i("div", {
        class: "relative border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none",
        onMousedown: k[0] || (k[0] = (A) => j(a).emit("vf-contextmenu-hide"))
      }, [
        G($r),
        G(On, { data: o }, null, 8, ["data"]),
        G(vn, {
          view: p.value,
          data: o
        }, null, 8, ["view", "data"]),
        G($n, { data: o }, null, 8, ["data"])
      ], 32),
      w.active ? (_(), K(Qt("v-f-modal-" + w.type), {
        key: 0,
        selection: w.data,
        current: o
      }, null, 8, ["selection", "current"])) : q("", !0),
      G(Bn, { current: o }, null, 8, ["current"])
    ], 2));
  }
}), Fn = /* @__PURE__ */ i("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), Un = { class: "fixed z-10 inset-0 overflow-y-auto" }, qn = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full" }, Wn = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Yn = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Y = {
  __name: "ModalLayout",
  setup(f) {
    const h = inject("emitter");
    return W(() => {
      const a = document.querySelector(".v-f-modal input");
      a && a.focus();
    }), (a, g) => (_(), $("div", {
      class: "v-f-modal relative z-20",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: g[1] || (g[1] = ce((u) => j(h).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Fn,
      i("div", Un, [
        i("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onClick: g[0] || (g[0] = me((u) => j(h).emit("vf-modal-close"), ["self"]))
        }, [
          i("div", qn, [
            i("div", Wn, [
              Ye(a.$slots, "default")
            ]),
            i("div", Yn, [
              Ye(a.$slots, "buttons")
            ])
          ])
        ])
      ])
    ], 32));
  }
}, Jn = { class: "sm:flex sm:items-start" }, Zn = /* @__PURE__ */ i("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ i("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Xn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Gn = /* @__PURE__ */ i("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Delete files", -1), Qn = { class: "mt-2" }, eo = /* @__PURE__ */ i("p", { class: "text-sm text-gray-500" }, "Are you sure you want to delete these files?", -1), to = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ro = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, no = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), oo = [
  no
], so = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, io = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ao = [
  io
], lo = { class: "ml-1.5" }, co = /* @__PURE__ */ i("div", { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, "This action cannot be undone.", -1), uo = {
  name: "VFModalDelete"
}, ho = /* @__PURE__ */ Object.assign(uo, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const h = f, a = inject("emitter"), { getStore: g } = inject("storage"), u = E(h.selection.items), o = () => {
      u.value.length && a.emit("vf-fetch", {
        q: "delete",
        adapter: g("adapter"),
        path: h.current.dirname,
        items: JSON.stringify(u.value.map(({ path: p, type: y }) => ({ path: p, type: y })))
      });
    };
    return (p, y) => (_(), K(Y, null, {
      buttons: z(() => [
        i("button", {
          type: "button",
          onClick: o,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, delete!"),
        i("button", {
          type: "button",
          onClick: y[0] || (y[0] = (w) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel"),
        co
      ]),
      default: z(() => [
        i("div", Jn, [
          Zn,
          i("div", Xn, [
            Gn,
            i("div", Qn, [
              eo,
              (_(!0), $(ee, null, te(u.value, (w) => (_(), $("p", to, [
                w.type == "dir" ? (_(), $("svg", ro, oo)) : (_(), $("svg", so, ao)),
                i("span", lo, I(w.basename), 1)
              ]))), 256))
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), mo = { class: "sm:flex sm:items-start" }, fo = /* @__PURE__ */ i("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ i("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), go = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, vo = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, po = { class: "mt-2" }, yo = { class: "text-sm text-gray-500" }, bo = {
  name: "VFModalMessage"
}, _o = /* @__PURE__ */ Object.assign(bo, {
  props: {
    selection: Object
  },
  setup(f) {
    const h = inject("emitter");
    return (a, g) => (_(), K(Y, null, {
      buttons: z(() => [
        i("button", {
          type: "button",
          onClick: g[0] || (g[0] = (u) => j(h).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close")
      ]),
      default: z(() => {
        var u, o, p, y;
        return [
          i("div", mo, [
            fo,
            i("div", go, [
              i("h3", vo, I((o = (u = f.selection) == null ? void 0 : u.title) != null ? o : "Title"), 1),
              i("div", po, [
                i("p", yo, I((y = (p = f.selection) == null ? void 0 : p.message) != null ? y : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), So = { class: "sm:flex sm:items-start" }, wo = /* @__PURE__ */ i("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ i("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), ko = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, xo = /* @__PURE__ */ i("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New Folder", -1), Do = { class: "mt-2" }, $o = /* @__PURE__ */ i("p", { class: "text-sm text-gray-500" }, "Create a new folder", -1), Co = ["onKeyup"], Po = {
  name: "VFModalNewFolder"
}, Mo = /* @__PURE__ */ Object.assign(Po, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const h = f, a = inject("emitter"), { getStore: g } = inject("storage"), u = E(""), o = () => {
      u.value != "" && a.emit("vf-fetch", {
        q: "newfolder",
        adapter: g("adapter"),
        path: h.current.dirname,
        name: u.value
      });
    };
    return (p, y) => (_(), K(Y, null, {
      buttons: z(() => [
        i("button", {
          type: "button",
          onClick: o,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        i("button", {
          type: "button",
          onClick: y[1] || (y[1] = (w) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: z(() => [
        i("div", So, [
          wo,
          i("div", ko, [
            xo,
            i("div", Do, [
              $o,
              Q(i("input", {
                "onUpdate:modelValue": y[0] || (y[0] = (w) => u.value = w),
                onKeyup: ce(o, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Folder Name",
                type: "text"
              }, null, 40, Co), [
                [ge, u.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), jo = { class: "sm:flex sm:items-start" }, Ao = /* @__PURE__ */ i("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ i("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), Eo = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, To = /* @__PURE__ */ i("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New File", -1), Io = { class: "mt-2" }, Vo = /* @__PURE__ */ i("p", { class: "text-sm text-gray-500" }, "Create a new file", -1), Lo = ["onKeyup"], Oo = {
  name: "VFModalNewFile"
}, No = /* @__PURE__ */ Object.assign(Oo, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const h = f, a = inject("emitter"), { getStore: g } = inject("storage"), u = E(""), o = () => {
      u.value != "" && a.emit("vf-fetch", {
        q: "newfile",
        adapter: g("adapter"),
        path: h.current.dirname,
        name: u.value
      });
    };
    return (p, y) => (_(), K(Y, null, {
      buttons: z(() => [
        i("button", {
          type: "button",
          onClick: o,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        i("button", {
          type: "button",
          onClick: y[1] || (y[1] = (w) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: z(() => [
        i("div", jo, [
          Ao,
          i("div", Eo, [
            To,
            i("div", Io, [
              Vo,
              Q(i("input", {
                "onUpdate:modelValue": y[0] || (y[0] = (w) => u.value = w),
                onKeyup: ce(o, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "File Name",
                type: "text"
              }, null, 40, Lo), [
                [ge, u.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), zo = { class: "border font-normal border-gray-200 dark:border-gray-700/50 p-2 rounded min-h-[100px] text-sm" }, Ko = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: h }) {
    const a = f, g = E("");
    return W(() => {
      Ge(a.selection.url, {
        params: { q: "preview", adapter: a.selection.adapter, path: a.selection.item.path },
        json: !1
      }).then((u) => u.text()).then((u) => {
        g.value = u, h("load");
      });
    }), (u, o) => (_(), $("div", null, [
      i("pre", zo, I(g.value), 1)
    ]));
  }
}, ve = (f) => Object.entries(f).map((h) => h.map(encodeURIComponent).join("=")).join("&"), Bo = ["src"], Ho = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: h }) {
    const a = f, g = () => a.selection.url + "?" + ve({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return onMounted(() => {
      h("load");
    }), (u, o) => (_(), $("img", {
      class: "max-w-[350px] max-h-[350px]",
      src: g(),
      alt: ""
    }, null, 8, Bo));
  }
}, Ro = {
  __name: "Default",
  emits: ["load"],
  setup(f, { emit: h }) {
    return W(() => {
      h("load");
    }), (a, g) => (_(), $("div", null, " Default view.. "));
  }
}, Fo = {
  class: "w-full",
  preload: "",
  controls: ""
}, Uo = ["src"], qo = /* @__PURE__ */ se(" Your browser does not support the video tag. "), Wo = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: h }) {
    const a = f, g = () => a.selection.url + "?" + ve({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return W(() => {
      h("load");
    }), (u, o) => (_(), $("div", null, [
      i("video", Fo, [
        i("source", {
          src: g(),
          type: "video/mp4"
        }, null, 8, Uo),
        qo
      ])
    ]));
  }
}, Yo = {
  class: "w-full",
  controls: ""
}, Jo = ["src"], Zo = /* @__PURE__ */ se(" Your browser does not support the audio element. "), Xo = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: h }) {
    const a = f, g = () => a.selection.url + "?" + ve({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return W(() => {
      h("load");
    }), (u, o) => (_(), $("div", null, [
      i("audio", Yo, [
        i("source", {
          src: g(),
          type: "audio/mpeg"
        }, null, 8, Jo),
        Zo
      ])
    ]));
  }
}, Go = ["data"], Qo = ["src"], es = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: h }) {
    const a = f, g = () => a.selection.url + "?" + ve({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return W(() => {
      h("load");
    }), (u, o) => (_(), $("div", null, [
      i("object", {
        data: g(),
        type: "application/pdf",
        width: "100%",
        height: "100%"
      }, [
        i("iframe", {
          class: "border-0",
          src: g(),
          width: "100%",
          height: "100%"
        }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        `, 8, Qo)
      ], 8, Go)
    ]));
  }
}, ts = { class: "sm:flex sm:items-start" }, rs = /* @__PURE__ */ i("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ i("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), ns = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, os = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ss = { class: "mt-2" }, is = { class: "text-gray-700 dark:text-gray-200 text-sm" }, as = { class: "text-gray-400" }, ls = {
  key: 0,
  class: "flex leading-5"
}, cs = /* @__PURE__ */ i("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ i("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ i("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), us = /* @__PURE__ */ i("span", null, "Loading", -1), ds = [
  cs,
  us
], hs = {
  name: "VFModalPreview"
}, ms = /* @__PURE__ */ Object.assign(hs, {
  props: {
    selection: Object
  },
  setup(f) {
    const h = f, a = inject("emitter"), g = E(!1), u = (o) => {
      var p;
      return ((p = h.selection.item.mime_type) != null ? p : "").startsWith(o);
    };
    return (o, p) => (_(), K(Y, null, {
      buttons: z(() => [
        i("button", {
          type: "button",
          onClick: p[6] || (p[6] = (y) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close")
      ]),
      default: z(() => [
        i("div", ts, [
          rs,
          i("div", ns, [
            i("h3", os, I(f.selection.item.basename), 1),
            i("div", ss, [
              u("text") ? (_(), K(Ko, {
                key: 0,
                selection: f.selection,
                onLoad: p[0] || (p[0] = (y) => g.value = !0)
              }, null, 8, ["selection"])) : u("image") ? (_(), K(Ho, {
                key: 1,
                selection: f.selection,
                onLoad: p[1] || (p[1] = (y) => g.value = !0)
              }, null, 8, ["selection"])) : u("video") ? (_(), K(Wo, {
                key: 2,
                selection: f.selection,
                onLoad: p[2] || (p[2] = (y) => g.value = !0)
              }, null, 8, ["selection"])) : u("audio") ? (_(), K(Xo, {
                key: 3,
                selection: f.selection,
                onLoad: p[3] || (p[3] = (y) => g.value = !0)
              }, null, 8, ["selection"])) : u("application/pdf") ? (_(), K(es, {
                key: 4,
                selection: f.selection,
                onLoad: p[4] || (p[4] = (y) => g.value = !0)
              }, null, 8, ["selection"])) : (_(), K(Ro, {
                key: 5,
                selection: f.selection,
                onLoad: p[5] || (p[5] = (y) => g.value = !0)
              }, null, 8, ["selection"]))
            ]),
            i("div", is, [
              i("p", null, [
                i("span", as, I(f.selection.adapter) + "://", 1),
                se(I(f.selection.item.path), 1)
              ]),
              i("p", null, "mime_type: " + I(f.selection.item.mime_type), 1),
              g.value == !1 ? (_(), $("div", ls, ds)) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), fs = { class: "sm:flex sm:items-start" }, gs = /* @__PURE__ */ i("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ i("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), vs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ps = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ys = { class: "mt-2" }, bs = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, _s = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ss = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ws = [
  Ss
], ks = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xs = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ds = [
  xs
], $s = { class: "ml-1.5" }, Cs = ["onKeyup"], Ps = {
  name: "VFModalRename"
}, Ms = /* @__PURE__ */ Object.assign(Ps, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const h = f, a = inject("emitter"), { getStore: g } = inject("storage"), u = E(h.selection.items[0]), o = E(h.selection.items[0].basename), p = () => {
      o.value != "" && a.emit("vf-fetch", {
        q: "rename",
        adapter: g("adapter"),
        path: h.current.dirname,
        item: u.value.path,
        name: o.value
      });
    };
    return (y, w) => (_(), K(Y, null, {
      buttons: z(() => [
        i("button", {
          type: "button",
          onClick: p,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Rename!"),
        i("button", {
          type: "button",
          onClick: w[1] || (w[1] = (S) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: z(() => [
        i("div", fs, [
          gs,
          i("div", vs, [
            i("h3", ps, "Rename your " + I(u.value.type == "dir" ? "folder" : "file"), 1),
            i("div", ys, [
              i("p", bs, [
                u.value.type == "dir" ? (_(), $("svg", _s, ws)) : (_(), $("svg", ks, Ds)),
                i("span", $s, I(u.value.basename), 1)
              ]),
              Q(i("input", {
                "onUpdate:modelValue": w[0] || (w[0] = (S) => o.value = S),
                onKeyup: ce(p, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Cs), [
                [ge, o.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), js = /* @__PURE__ */ i("div", { class: "sm:flex sm:items-start" }, [
  /* @__PURE__ */ i("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
    /* @__PURE__ */ i("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "none",
      "stroke-width": "1.5"
    }, [
      /* @__PURE__ */ i("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
      })
    ])
  ]),
  /* @__PURE__ */ i("div", { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, [
    /* @__PURE__ */ i("h3", {
      class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
      id: "modal-title"
    }, "Upload files"),
    /* @__PURE__ */ i("div", { class: "mt-2" }, [
      /* @__PURE__ */ i("p", { class: "text-sm text-gray-500" }, "Upload files ")
    ])
  ])
], -1), As = /* @__PURE__ */ i("button", {
  type: "button",
  class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
}, "Yes, upload!", -1), Es = {
  name: "VFModalUpload"
}, Ts = /* @__PURE__ */ Object.assign(Es, {
  setup(f) {
    const h = inject("emitter");
    return (a, g) => (_(), K(Y, null, {
      buttons: z(() => [
        As,
        i("button", {
          type: "button",
          onClick: g[0] || (g[0] = (u) => j(h).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: z(() => [
        js
      ]),
      _: 1
    }));
  }
}), Is = { class: "sm:flex sm:items-start" }, Vs = /* @__PURE__ */ i("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ i("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
    })
  ])
], -1), Ls = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Os = /* @__PURE__ */ i("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), Ns = { class: "mt-2" }, zs = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ks = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bs = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Hs = [
  Bs
], Rs = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fs = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Us = [
  Fs
], qs = { class: "ml-1.5" }, Ws = /* @__PURE__ */ i("p", { class: "my-1 text-sm text-gray-500" }, "Archive name. (.zip file will be created)", -1), Ys = ["onKeyup"], Js = {
  name: "VFModalArchive"
}, Zs = /* @__PURE__ */ Object.assign(Js, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const h = f, a = inject("emitter"), { getStore: g } = inject("storage"), u = E(""), o = E(h.selection.items), p = () => {
      o.value.length && a.emit("vf-fetch", {
        q: "archive",
        adapter: g("adapter"),
        path: h.current.dirname,
        items: JSON.stringify(o.value.map(({ path: y, type: w }) => ({ path: y, type: w }))),
        name: u.value
      });
    };
    return (y, w) => (_(), K(Y, null, {
      buttons: z(() => [
        i("button", {
          type: "button",
          onClick: p,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Archive!"),
        i("button", {
          type: "button",
          onClick: w[1] || (w[1] = (S) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: z(() => [
        i("div", Is, [
          Vs,
          i("div", Ls, [
            Os,
            i("div", Ns, [
              (_(!0), $(ee, null, te(o.value, (S) => (_(), $("p", zs, [
                S.type == "dir" ? (_(), $("svg", Ks, Hs)) : (_(), $("svg", Rs, Us)),
                i("span", qs, I(S.basename), 1)
              ]))), 256)),
              Ws,
              Q(i("input", {
                "onUpdate:modelValue": w[0] || (w[0] = (S) => u.value = S),
                onKeyup: ce(p, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Ys), [
                [ge, u.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Xs = { class: "sm:flex sm:items-start" }, Gs = /* @__PURE__ */ i("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ i("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), Qs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, ei = /* @__PURE__ */ i("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Move files", -1), ti = { class: "mt-2" }, ri = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ni = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, oi = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), si = [
  oi
], ii = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ai = /* @__PURE__ */ i("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), li = [
  ai
], ci = { class: "ml-1.5" }, ui = /* @__PURE__ */ i("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Are you sure you want to move these files to ?", -1), di = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, hi = /* @__PURE__ */ i("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ i("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), mi = { class: "ml-1.5 overflow-auto" }, fi = {
  name: "VFModalMove"
}, gi = /* @__PURE__ */ Object.assign(fi, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const h = f, a = inject("emitter"), { getStore: g } = inject("storage"), u = E(h.selection.items.from), o = () => {
      u.value.length && a.emit("vf-fetch", {
        q: "move",
        adapter: g("adapter"),
        path: h.current.dirname,
        items: JSON.stringify(u.value.map(({ path: p, type: y }) => ({ path: p, type: y }))),
        item: h.selection.items.to.path
      });
    };
    return (p, y) => (_(), K(Y, null, {
      buttons: z(() => [
        i("button", {
          type: "button",
          onClick: o,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, move!"),
        i("button", {
          type: "button",
          onClick: y[0] || (y[0] = (w) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: z(() => [
        i("div", Xs, [
          Gs,
          i("div", Qs, [
            ei,
            i("div", ti, [
              (_(!0), $(ee, null, te(u.value, (w) => (_(), $("p", ri, [
                w.type == "dir" ? (_(), $("svg", ni, si)) : (_(), $("svg", ii, li)),
                i("span", ci, I(w.path), 1)
              ]))), 256)),
              ui,
              i("p", di, [
                hi,
                i("span", mi, I(f.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), vi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: ho,
  ModalMessage: _o,
  ModalNewFolder: Mo,
  ModalNewFile: No,
  ModalPreview: ms,
  ModalRename: Ms,
  ModalUpload: Ts,
  ModalArchive: Zs,
  ModalMove: gi
}, Symbol.toStringTag, { value: "Module" })), ke = {
  VueFinder: Rn,
  ...vi
};
const yi = {
  install(f) {
    for (const h in ke)
      if (ke.hasOwnProperty(h)) {
        const a = ke[h];
        f.component(a.name, a);
      }
  }
};
export {
  yi as default
};
