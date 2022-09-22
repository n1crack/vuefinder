import { ref as z, watch as Pt, openBlock as x, createElementBlock as C, createElementVNode as d, unref as k, normalizeClass as fe, createTextVNode as De, toDisplayString as E, createCommentVNode as ne, createVNode as ve, TransitionGroup as $i, withCtx as Q, Fragment as oe, renderList as pe, reactive as ut, onMounted as ye, withDirectives as me, vShow as ot, normalizeStyle as Sr, withModifiers as Te, nextTick as ft, vModelSelect as or, customRef as Ei, withKeys as Ue, isRef as Ti, vModelText as Ke, provide as bt, createBlock as se, resolveDynamicComponent as Ai, renderSlot as ar, inject as Oi } from "vue";
import yt from "plupload";
const dt = (o, { method: e = "get", params: t = {}, json: n = !0 }) => {
  const a = { method: e };
  if (e == "get")
    o += "?" + new URLSearchParams(t);
  else {
    a.headers = {};
    let i = new FormData();
    for (const [l, h] of Object.entries(t))
      i.append(l, h);
    a.body = i;
  }
  return fetch(o, a).then((i) => i.ok ? n ? i.json() : i.text() : Promise.reject(i));
};
function Pi(o) {
  return { all: o = o || /* @__PURE__ */ new Map(), on: function(e, t) {
    var n = o.get(e);
    n ? n.push(t) : o.set(e, [t]);
  }, off: function(e, t) {
    var n = o.get(e);
    n && (t ? n.splice(n.indexOf(t) >>> 0, 1) : o.set(e, []));
  }, emit: function(e, t) {
    var n = o.get(e);
    n && n.slice().map(function(a) {
      a(t);
    }), (n = o.get("*")) && n.slice().map(function(a) {
      a(e, t);
    });
  } };
}
function kt(o) {
  let e = localStorage.getItem(o + "_storage");
  const t = z(JSON.parse(e));
  Pt(t, n);
  function n() {
    t.value === null || t.value === "" ? localStorage.removeItem(o + "_storage") : localStorage.setItem(o + "_storage", JSON.stringify(t.value));
  }
  function a(h, m) {
    t.value = Object.assign({ ...t.value }, { [h]: m });
  }
  function i() {
    t.value = null;
  }
  return { getStore: (h, m = null) => t.value === null || t.value === "" ? m : t.value.hasOwnProperty(h) ? t.value[h] : m, setStore: a, clearStore: i };
}
const sr = z("");
function _e() {
  function o(e) {
    sr.value = e;
  }
  return { apiUrl: sr, setApiUrl: o };
}
const ji = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Ii = {
  key: 0,
  class: "flex text-center"
}, Ni = ["aria-label"], Li = /* @__PURE__ */ d("svg", {
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
], -1), Vi = [
  Li
], zi = ["aria-label"], Bi = /* @__PURE__ */ d("svg", {
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
], -1), Ri = [
  Bi
], Hi = ["aria-label"], Ui = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Ki = [
  Ui
], Yi = ["aria-label"], Wi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), Xi = [
  Wi
], Fi = ["aria-label"], qi = /* @__PURE__ */ d("svg", {
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
], -1), Gi = [
  qi
], Ji = ["aria-label"], Zi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), Qi = [
  Zi
], en = ["aria-label"], tn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), rn = [
  tn
], nn = {
  key: 1,
  class: "flex text-center"
}, on = { class: "pl-2" }, an = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, sn = { class: "flex text-center items-center justify-end" }, ln = ["aria-label"], cn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), un = [
  cn
], dn = ["aria-label"], hn = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, fn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, mn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, pn = ["aria-label"], gn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, vn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, bn = {
  name: "VFToolbar"
}, yn = /* @__PURE__ */ Object.assign(bn, {
  props: {
    data: Object
  },
  setup(o) {
    const e = inject("emitter"), { getStore: t, setStore: n } = inject("storage"), { t: a } = inject("i18n"), i = z(t("viewport", "grid")), l = z([]), h = z(t("full-screen", !1)), m = z("");
    e.on("vf-search-query", ({ newQuery: f }) => {
      m.value = f;
    });
    const g = () => {
      h.value = !h.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (f) => {
      l.value = f;
    }), e.on("vf-view-toggle", (f) => {
      n("viewport", f), i.value = f;
    }), (f, v) => (x(), C("div", ji, [
      m.value.length ? (x(), C("div", nn, [
        d("div", on, [
          De(E(k(a)("Search results for")) + " ", 1),
          d("span", an, E(m.value), 1)
        ])
      ])) : (x(), C("div", Ii, [
        d("div", {
          class: "mx-1.5",
          "aria-label": k(a)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: v[0] || (v[0] = (b) => k(e).emit("vf-modal-show", { type: "new-folder", items: l.value }))
        }, Vi, 8, Ni),
        d("div", {
          class: "mx-1.5",
          "aria-label": k(a)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[1] || (v[1] = (b) => k(e).emit("vf-modal-show", { type: "new-file", items: l.value }))
        }, Ri, 8, zi),
        d("div", {
          class: "mx-1.5",
          "aria-label": k(a)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[2] || (v[2] = (b) => l.value.length != 1 || k(e).emit("vf-modal-show", { type: "rename", items: l.value }))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: fe([l.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Ki, 2))
        ], 8, Hi),
        d("div", {
          class: "mx-1.5",
          "aria-label": k(a)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[3] || (v[3] = (b) => !l.value.length || k(e).emit("vf-modal-show", { type: "delete", items: l.value }))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: fe([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Xi, 2))
        ], 8, Yi),
        d("div", {
          class: "mx-1.5",
          "aria-label": k(a)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[4] || (v[4] = (b) => k(e).emit("vf-modal-show", { type: "upload", items: l.value }))
        }, Gi, 8, Fi),
        l.value.length == 1 && l.value[0].mime_type == "application/zip" ? (x(), C("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": k(a)("Unrchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[5] || (v[5] = (b) => !l.value.length || k(e).emit("vf-modal-show", { type: "unarchive", items: l.value }))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: fe([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Qi, 2))
        ], 8, Ji)) : (x(), C("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": k(a)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[6] || (v[6] = (b) => !l.value.length || k(e).emit("vf-modal-show", { type: "archive", items: l.value }))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: fe([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, rn, 2))
        ], 8, en))
      ])),
      d("div", sn, [
        d("div", {
          class: "mx-1.5",
          "aria-label": k(a)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (x(), C("svg", {
            onClick: v[7] || (v[7] = (b) => k(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, un))
        ], 8, ln),
        d("div", {
          class: "mx-1.5",
          "aria-label": k(a)("Toggle Full Screen"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g
        }, [
          (x(), C("svg", hn, [
            h.value ? (x(), C("path", fn)) : (x(), C("path", mn))
          ]))
        ], 8, dn),
        d("div", {
          class: "mx-1.5",
          "aria-label": k(a)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: v[8] || (v[8] = (b) => m.value.length || k(e).emit("vf-view-toggle", i.value == "list" ? "grid" : "list"))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: fe([m.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            i.value == "grid" ? (x(), C("path", gn)) : ne("", !0),
            i.value == "list" ? (x(), C("path", vn)) : ne("", !0)
          ], 2))
        ], 8, pn)
      ])
    ]));
  }
});
var wn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Dr = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(wn, function() {
    function t(u, s) {
      if (!(u instanceof s))
        throw new TypeError("Cannot call a class as a function");
    }
    function n(u, s) {
      for (var r = 0; r < s.length; r++) {
        var p = s[r];
        p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(u, p.key, p);
      }
    }
    function a(u, s, r) {
      return s && n(u.prototype, s), r && n(u, r), u;
    }
    function i(u, s, r) {
      return s in u ? Object.defineProperty(u, s, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : u[s] = r, u;
    }
    function l(u, s) {
      var r = Object.keys(u);
      if (Object.getOwnPropertySymbols) {
        var p = Object.getOwnPropertySymbols(u);
        s && (p = p.filter(function(c) {
          return Object.getOwnPropertyDescriptor(u, c).enumerable;
        })), r.push.apply(r, p);
      }
      return r;
    }
    function h(u) {
      for (var s = 1; s < arguments.length; s++) {
        var r = arguments[s] != null ? arguments[s] : {};
        s % 2 ? l(Object(r), !0).forEach(function(p) {
          i(u, p, r[p]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(r)) : l(Object(r)).forEach(function(p) {
          Object.defineProperty(u, p, Object.getOwnPropertyDescriptor(r, p));
        });
      }
      return u;
    }
    function m(u, s) {
      if (typeof s != "function" && s !== null)
        throw new TypeError("Super expression must either be null or a function");
      u.prototype = Object.create(s && s.prototype, {
        constructor: {
          value: u,
          writable: !0,
          configurable: !0
        }
      }), s && f(u, s);
    }
    function g(u) {
      return g = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, g(u);
    }
    function f(u, s) {
      return f = Object.setPrototypeOf || function(p, c) {
        return p.__proto__ = c, p;
      }, f(u, s);
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
    function b(u, s, r) {
      return v() ? b = Reflect.construct : b = function(c, y, w) {
        var _ = [null];
        _.push.apply(_, y);
        var S = Function.bind.apply(c, _), O = new S();
        return w && f(O, w.prototype), O;
      }, b.apply(null, arguments);
    }
    function A(u) {
      return Function.toString.call(u).indexOf("[native code]") !== -1;
    }
    function M(u) {
      var s = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return M = function(p) {
        if (p === null || !A(p))
          return p;
        if (typeof p != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof s < "u") {
          if (s.has(p))
            return s.get(p);
          s.set(p, c);
        }
        function c() {
          return b(p, arguments, g(this).constructor);
        }
        return c.prototype = Object.create(p.prototype, {
          constructor: {
            value: c,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), f(c, p);
      }, M(u);
    }
    function T(u) {
      if (u === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return u;
    }
    function I(u, s) {
      return s && (typeof s == "object" || typeof s == "function") ? s : T(u);
    }
    function B(u) {
      var s = v();
      return function() {
        var p = g(u), c;
        if (s) {
          var y = g(this).constructor;
          c = Reflect.construct(p, arguments, y);
        } else
          c = p.apply(this, arguments);
        return I(this, c);
      };
    }
    function P(u, s) {
      for (; !Object.prototype.hasOwnProperty.call(u, s) && (u = g(u), u !== null); )
        ;
      return u;
    }
    function R(u, s, r) {
      return typeof Reflect < "u" && Reflect.get ? R = Reflect.get : R = function(c, y, w) {
        var _ = P(c, y);
        if (!!_) {
          var S = Object.getOwnPropertyDescriptor(_, y);
          return S.get ? S.get.call(w) : S.value;
        }
      }, R(u, s, r || u);
    }
    function ee(u, s) {
      return Y(u) || le(u, s) || j(u, s) || J();
    }
    function X(u) {
      return D(u) || F(u) || j(u) || N();
    }
    function D(u) {
      if (Array.isArray(u))
        return H(u);
    }
    function Y(u) {
      if (Array.isArray(u))
        return u;
    }
    function F(u) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(u))
        return Array.from(u);
    }
    function le(u, s) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(u)))) {
        var r = [], p = !0, c = !1, y = void 0;
        try {
          for (var w = u[Symbol.iterator](), _; !(p = (_ = w.next()).done) && (r.push(_.value), !(s && r.length === s)); p = !0)
            ;
        } catch (S) {
          c = !0, y = S;
        } finally {
          try {
            !p && w.return != null && w.return();
          } finally {
            if (c)
              throw y;
          }
        }
        return r;
      }
    }
    function j(u, s) {
      if (!!u) {
        if (typeof u == "string")
          return H(u, s);
        var r = Object.prototype.toString.call(u).slice(8, -1);
        if (r === "Object" && u.constructor && (r = u.constructor.name), r === "Map" || r === "Set")
          return Array.from(u);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return H(u, s);
      }
    }
    function H(u, s) {
      (s == null || s > u.length) && (s = u.length);
      for (var r = 0, p = new Array(s); r < s; r++)
        p[r] = u[r];
      return p;
    }
    function N() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function J() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var V = function(s, r, p) {
      var c = s.x, y = s.y, w = p.x, _ = p.y, S = {
        "+": {
          x: c + w,
          y: y + _
        },
        "-": {
          x: c - w,
          y: y - _
        },
        "*": {
          x: c * w,
          y: y * _
        },
        "/": {
          x: c / w,
          y: y / _
        }
      };
      return S[r];
    }, W = function(s) {
      return {
        x: s.left,
        y: s.top
      };
    }, ae = function(s) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: s.x,
        top: s.y,
        right: s.x,
        bottom: s.y,
        width: r,
        height: r
      };
    }, Pe = function(s) {
      return {
        x: s,
        y: s
      };
    }, Ye = function(u, s, r) {
      window.addEventListener("resize", s), window.addEventListener("scroll", s), u.forEach(function(p, c) {
        r.observe(p, {
          childList: c !== 0,
          attributes: !0
        });
      });
    }, We = function(u) {
      var s = Ie(u);
      return s.x || s.y ? !0 : u instanceof HTMLDocument ? u.body ? !!(u.body.scrollTop = 1) : !!(u.documentElement.scrollTop = 1) : !!(u.scrollTop = 1);
    }, tt = function(u) {
      var s = document.createElement("div");
      return s.style.position = "fixed", s.style.overflow = "hidden", s.style.pointerEvents = "none", s.style.zIndex = "999999999999999999", s.classList.add(u), s;
    }, rt = function(u) {
      var s = document.createElement("div");
      return s.style.position = "absolute", u || (s.style.background = "rgba(0, 0, 255, 0.1)", s.style.border = "1px solid rgba(0, 0, 255, 0.45)", s.style.display = "none", s.style.pointerEvents = "none"), s;
    }, it = function(u, s) {
      var r;
      return function() {
        for (var p = arguments.length, c = new Array(p), y = 0; y < p; y++)
          c[y] = arguments[y];
        var w = function() {
          r = null, u.apply(void 0, c);
        };
        clearTimeout(r), r = setTimeout(w, s);
      };
    }, je = function() {
      var u, s, r, p;
      return {
        y: ((u = document.body) === null || u === void 0 ? void 0 : u.scrollTop) || ((s = document.documentElement) === null || s === void 0 ? void 0 : s.scrollTop) || 0,
        x: ((r = document.body) === null || r === void 0 ? void 0 : r.scrollLeft) || ((p = document.documentElement) === null || p === void 0 ? void 0 : p.scrollLeft) || 0
      };
    }, pt = function(u, s) {
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
        width: (u.clientWidth || r.width) * s,
        height: (u.clientHeight || r.height) * s
      };
    }, Ie = function(u) {
      return !u || u instanceof Document ? je() : {
        x: u.scrollLeft >= 0 ? u.scrollLeft : je().x,
        y: u.scrollTop >= 0 ? u.scrollTop : je().y
      };
    }, zt = function(u) {
      var s = u.elementRect, r = u.containerRect, p = u.tolerance, c = p === void 0 ? {
        x: 0,
        y: 0
      } : p, y = [];
      return s.top - c.y < r.top && y.push("top"), s.left - c.x < r.left && y.push("left"), s.bottom + c.y > r.bottom && y.push("bottom"), s.right + c.y > r.right && y.push("right"), y;
    }, Rr = function(u) {
      var s = u.event;
      return {
        x: s.clientX,
        y: s.clientY
      };
    }, Hr = function(u) {
      var s = u.scrollAmount, r = u.initialPointerPos, p = u.pointerPos, c = {};
      return p.x > r.x - s.x ? (c.left = r.x - s.x, c.width = p.x - r.x + s.x) : (c.left = p.x, c.width = r.x - p.x - s.x), p.y > r.y - s.y ? (c.top = r.y - s.y, c.height = p.y - r.y + s.y) : (c.top = p.y, c.height = r.y - p.y - s.y), c;
    }, Bt = function(s) {
      var r = {
        x: 0,
        y: 0
      }, p = window.getComputedStyle(s);
      if (!p.transform || p.transform === "none")
        return r;
      if (p.transform.indexOf("3d") >= 0) {
        var c = p.transform.trim().match(/matrix3d\((.*?)\)/);
        if (c && c.length) {
          var y, w = (y = c[1]) === null || y === void 0 ? void 0 : y.split(",");
          r.x = parseInt(w[12]) || 0, r.y = parseInt(w[13]) || 0;
        }
        return r;
      } else {
        var _ = p.transform.trim().match(/matrix\((.*?)\)/);
        if (_ && _.length) {
          var S, O = (S = _[1]) === null || S === void 0 ? void 0 : S.split(",");
          r.x = parseInt(O[4]) || 0, r.y = parseInt(O[5]) || 0;
        }
        return r;
      }
    }, Ur = function(s) {
      var r = s.style.transform;
      if (!r || r.indexOf("translate") < 0)
        return Bt(s);
      var p = {
        x: 0,
        y: 0
      }, c = r.trim().match(/translate[3dD]*?\(.*?\)/);
      if (c) {
        var y, w = (y = c[0]) === null || y === void 0 ? void 0 : y.split("(");
        if (w) {
          var _, S = (_ = w[1]) === null || _ === void 0 ? void 0 : _.split(",");
          p.x = parseInt(S[0]) || 0, p.y = parseInt(S[1]) || 0;
        }
      }
      return !p.x && !p.x ? Bt(s) : p;
    }, Kr = function(s) {
      var r = s.style, p = {
        x: parseInt(r.left) || 0,
        y: parseInt(r.top) || 0
      };
      if (!p.x && !p.x) {
        var c = window.getComputedStyle(s);
        return {
          x: parseInt(c.left) || 0,
          y: parseInt(c.top) || 0
        };
      }
      return p;
    }, Yr = function(u, s) {
      return s ? Ur(u) : Kr(u);
    }, Wr = function(u) {
      var s = u.element, r = u.edges, p = u.elementRect, c = u.containerRect, y = u.elementPos, w = u.useTransform;
      r.includes("top") && Xe(s, {
        y: y.y + c.top - p.top,
        x: y.x
      }, w), r.includes("left") && Xe(s, {
        y: y.y,
        x: y.x + c.left - p.left
      }, w), r.includes("bottom") && Xe(s, {
        y: y.y + c.bottom - p.bottom,
        x: y.x
      }, w), r.includes("right") && Xe(s, {
        y: y.y,
        x: y.x + c.right - p.right
      }, w);
    }, Rt = function(u) {
      var s = u.computedStyle, r = u.node, p = s.position, c = p === "absolute" || p === "relative" || p === "fixed";
      !(r instanceof HTMLDocument) && !c && (r.style.position = "relative");
    }, Xr = function(u) {
      var s = u.shiftKey, r = u.keyboardDragSpeed, p = u.zoom, c = u.key, y = u.dragKeys, w = u.scrollDiff, _ = u.canScroll, S = u.scrollCallback, O = {
        x: 0,
        y: 0
      }, $ = s ? r * 4 * p : r * p;
      return y.left.includes(c) && (O.x = w.x || -$, !s && !w.x && _ && S(["left"], r)), y.right.includes(c) && (O.x = w.x || $, !s && !w.x && _ && S(["right"], r)), y.up.includes(c) && (O.y = w.y || -$, !s && !w.y && _ && S(["top"], r)), y.down.includes(c) && (O.y = w.y || $, !s && !w.y && _ && S(["bottom"], r)), O;
    }, Fr = function(u) {
      var s = u.element, r = u.force, p = u.multiSelectionToggle, c = u.SelectedSet, y = u.hoverClassName;
      s.classList.contains(y) && !r || (c.has(s) ? p && c.delete(s) : c.add(s), s.classList.add(y));
    }, qr = function(u) {
      var s = u.element, r = u.force, p = u.SelectedSet, c = u.PrevSelectedSet, y = u.hoverClassName;
      if (!s.classList.contains(y) && !r)
        return !1;
      var w = p.has(s), _ = c.has(s);
      w && !_ ? p.delete(s) : !w && _ && p.add(s), s.classList.remove(y);
    }, gt = function(u, s) {
      return u.left < s.right && u.right > s.left && u.top < s.bottom && u.bottom > s.top;
    }, Ht = function(u) {
      var s = u.element, r = u.posDirection, p = u.containerRect, c = u.useTransform, y = Yr(s, c), w = V(y, "+", r);
      Xe(s, w, c);
      var _ = s.getBoundingClientRect(), S = zt({
        elementRect: _,
        containerRect: p
      });
      Wr({
        element: s,
        edges: S,
        elementRect: _,
        containerRect: p,
        elementPos: w,
        useTransform: c
      });
    }, Gr = function(u, s) {
      window.removeEventListener("resize", s), window.removeEventListener("scroll", s), u.disconnect();
    }, Jr = function(u, s, r) {
      if (!!s.length) {
        var p = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, c = u instanceof HTMLDocument ? p || document.body : u, y = s.includes("top") && c.scrollTop > 0, w = s.includes("bottom") && c.scrollTop < c.scrollHeight, _ = s.includes("left") && c.scrollLeft > 0, S = s.includes("right") && c.scrollLeft < c.scrollWidth;
        y && (c.scrollTop -= 1 * r), w && (c.scrollTop += 1 * r), _ && (c.scrollLeft -= 1 * r), S && (c.scrollLeft += 1 * r);
      }
    }, Xe = function(u, s, r) {
      if (r) {
        var p = u.style.transform;
        u.style.transform = "translate3d(".concat(s.x, "px,").concat(s.y, "px,1px) ").concat(p.replace(/translate.*?\)/g, ""));
      } else
        u.style.left = "".concat(s.x, "px"), u.style.top = "".concat(s.y, "px");
      return u;
    }, Zr = function(u) {
      for (var s = u.subscribe, r = u.publish, p = u.Interaction, c = u.SelectedSet, y = {
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
          condition: function($) {
            return $.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, w = function() {
        var $ = ee(S[_], 2), L = $[0], U = $[1];
        ["pre", !1].forEach(function(Z) {
          return s(Z ? "".concat(L, ":").concat(Z) : L, function(de) {
            return U.forEach(function(te) {
              return (!te.condition || te.condition(de)) && r(Z ? "".concat(Z).concat(te.name) : te.name, h({
                items: c.elements,
                isDragging: p.isDragging
              }, de));
            });
          });
        });
      }, _ = 0, S = Object.entries(y); _ < S.length; _++)
        w();
    }, Ne = function(u) {
      return u ? !Array.isArray(u) && (u instanceof HTMLElement || u instanceof SVGElement) ? [u] : X(u) : [];
    }, Ut = function(u, s) {
      u.style.left = "".concat(s.left, "px"), u.style.top = "".concat(s.top, "px"), u.style.width = "".concat(s.width, "px"), u.style.height = "".concat(s.height, "px");
    }, Qr = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, p = s.area, c = s.PS, y = s.zoom;
        t(this, u), i(this, "_modificationCallback", void 0), i(this, "_modificationObserver", void 0), i(this, "_zoom", void 0), i(this, "_node", void 0), i(this, "_parentNodes", void 0), i(this, "_computedStyle", void 0), i(this, "_computedBorder", void 0), i(this, "_rect", void 0), i(this, "setArea", function(w) {
          r._node = w, Rt({
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
          Gr(r._modificationObserver, r._modificationCallback), r.reset();
        }), i(this, "scroll", function(w, _) {
          var S = {
            scroll_directions: w,
            scroll_multiplier: _
          };
          r.PubSub.publish("Area:scroll:pre", S), Jr(r._node, w, _), r.PubSub.publish("Area:scroll", S);
        }), this._zoom = y, this.PubSub = c, this.setArea(p), this._modificationCallback = it(function(w) {
          r.PubSub.publish("Area:modified:pre", {
            event: w,
            item: r
          }), r.reset(), r.PubSub.publish("Area:modified", {
            event: w,
            item: r
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return a(u, [{
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
            var y, w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, _ = (y = c[w]) === null || y === void 0 ? void 0 : y.parentNode;
            return _ ? (c.push(_), w++, p(c, w)) : c;
          };
          return this._parentNodes = r([this.HTMLNode]), this._parentNodes;
        }
      }]), u;
    }(), ei = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, p = s.DS, c = s.dragKeys, y = s.draggability, w = s.keyboardDrag, _ = s.keyboardDragSpeed, S = s.useTransform, O = s.zoom;
        t(this, u), i(this, "_useTransform", void 0), i(this, "_prevCursorPos", void 0), i(this, "_prevScrollPos", void 0), i(this, "_elements", []), i(this, "_draggability", void 0), i(this, "_dragKeys", void 0), i(this, "_dragKeysFlat", void 0), i(this, "_keyboardDrag", void 0), i(this, "_keyboardDragSpeed", void 0), i(this, "_zoom", void 0), i(this, "keyboardDrag", function($) {
          var L = $.event, U = $.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(U) || !r.DS.SelectedSet.size || !r._draggability || r.DS.continue)) {
            var Z = {
              event: L,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:start:pre", "Interaction:start"], Z), r._elements = r.DS.getSelection(), r.handleZIndex(!0);
            var de = Xr({
              shiftKey: r.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: r._keyboardDragSpeed,
              zoom: r._zoom,
              key: U,
              scrollCallback: r.DS.Area.scroll,
              scrollDiff: r._scrollDiff,
              canScroll: r.DS.stores.ScrollStore.canScroll,
              dragKeys: r._dragKeys
            });
            r._elements.forEach(function(te) {
              return Ht({
                element: te,
                posDirection: de,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], Z);
          }
        }), i(this, "keyboardEnd", function($) {
          var L = $.event, U = $.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(U) || !r.DS.SelectedSet.size || !r._draggability)) {
            var Z = {
              event: L,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], Z);
          }
        }), i(this, "start", function($) {
          var L = $.isDragging, U = $.isDraggingKeyboard;
          !L || U || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), i(this, "stop", function($) {
          $ != null && $.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), i(this, "update", function($) {
          var L = $.isDragging, U = $.isDraggingKeyboard;
          if (!(!L || !r._elements.length || U || r.DS.continue)) {
            var Z = V(r._cursorDiff, "+", r._scrollDiff);
            r._elements.forEach(function(de) {
              return Ht({
                element: de,
                posDirection: Z,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            });
          }
        }), i(this, "handleZIndex", function($) {
          r._elements.forEach(function(L) {
            return L.style.zIndex = "".concat((parseInt(L.style.zIndex) || 0) + $ ? 9999 : -9998);
          });
        }), this.DS = p, this._useTransform = S, this._keyboardDragSpeed = _, this._keyboardDrag = w, this._zoom = O, this._draggability = y, this._dragKeys = {
          up: c.up.map(function($) {
            return $.toLowerCase();
          }),
          down: c.down.map(function($) {
            return $.toLowerCase();
          }),
          left: c.left.map(function($) {
            return $.toLowerCase();
          }),
          right: c.right.map(function($) {
            return $.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(X(this._dragKeys.up), X(this._dragKeys.down), X(this._dragKeys.left), X(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return a(u, [{
        key: "_cursorDiff",
        get: function() {
          var r = this.DS.stores.PointerStore.currentVal, p = this._prevCursorPos ? V(r, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = r, p;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var r = this.DS.stores.ScrollStore.currentVal, p = this._prevScrollPos ? V(r, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = r, p;
        }
      }]), u;
    }(), ti = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, p = s.DS, c = s.areaElement, y = s.draggability, w = s.immediateDrag, _ = s.selectableClass;
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
          var O = S.target.closest(".".concat(r._selectableClass));
          return !r._draggability || r.DS.stores.KeyStore.isMultiSelectKeyPressed(S) || !O ? !1 : (r._immediateDrag && (r.DS.SelectedSet.size ? r.DS.SelectedSet.has(O) || (r.DS.SelectedSet.clear(), r.DS.SelectedSet.add(
            O
          )) : r.DS.SelectedSet.add(
            O
          )), !!r.DS.SelectedSet.has(O));
        }), i(this, "onClick", function(S) {
          var O = S.event;
          if (!!r._canInteract(O) && !(O.detail > 0)) {
            var $ = r.DS, L = $.stores, U = L.PointerStore, Z = L.KeyStore, de = $.SelectableSet, te = $.SelectedSet;
            U.start(O);
            var Le = O.target;
            !de.has(Le) || (Z.isMultiSelectKeyPressed(O) || te.clear(), te.toggle(Le), r.reset());
          }
        }), i(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), i(this, "update", function(S) {
          var O = S.event, $ = S.scroll_directions, L = S.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: O,
            scroll_directions: $,
            scroll_multiplier: L,
            isDragging: r.isDragging
          });
        }), i(this, "reset", function(S) {
          return r.DS.publish("Interaction:end:pre", {
            event: S,
            isDragging: r.isDragging
          });
        }), i(this, "_reset", function(S) {
          var O = r.isDragging;
          r.stop(), r.init(), r.DS.publish("Interaction:end", {
            event: S,
            isDragging: O
          });
        }), this._areaElement = c, this._draggability = y, this._immediateDrag = w, this._selectableClass = _, this.DS = p, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(S) {
          var O = S.event;
          return r.start(O);
        }), this.DS.subscribe("Interaction:start:pre", function(S) {
          var O = S.event;
          return r._start(O);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(S) {
          var O = S.event;
          return r._reset(O);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return a(u, [{
        key: "_canInteract",
        value: function(r) {
          var p = r.clientX === 0 && r.clientY === 0 && r.detail === 0 && r.target;
          return !(r.button === 2 || this.isInteracting || r.target && !this.DS.SelectorArea.isInside(
            r.target
          ) || !p && !this.DS.SelectorArea.isClicked(r));
        }
      }]), u;
    }(), ri = function u(s) {
      var r = this, p = s.DS;
      t(this, u), i(this, "subscribers", {}), i(this, "subscribe", function(c, y) {
        return Array.isArray(r.subscribers[c]) || (r.subscribers[c] = []), r.subscribers[c].push(y), r.subscribers[c].length - 1;
      }), i(this, "unsubscribe", function(c, y, w) {
        w >= 0 ? r.subscribers[c].splice(w, 1) : y && (r.subscribers[c] = r.subscribers[c].filter(function(_) {
          return _ !== y;
        }));
      }), i(this, "publish", function(c, y) {
        Array.isArray(c) ? c.forEach(function(w) {
          return r._publish(w, y);
        }) : r._publish(c, y);
      }), i(this, "_publish", function(c, y) {
        var w = r.subscribers[c];
        !Array.isArray(w) || (c.includes(":pre") ? r._handlePrePublish(w, y) : r._handlePublish(w, y));
      }), i(this, "_handlePublish", function(c, y) {
        for (var w = 0, _ = c.length; w < _; w++) {
          if (r.DS.stopped)
            return;
          c[w](y);
        }
      }), i(this, "_handlePrePublish", function(c, y) {
        for (var w = c.length; w--; ) {
          if (r.DS.stopped)
            return;
          c[w](y);
        }
      }), this.DS = p;
    }, ii = /* @__PURE__ */ function(u) {
      m(r, u);
      var s = B(r);
      function r(p) {
        var c, y = p.elements, w = p.className, _ = p.hoverClassName, S = p.draggability, O = p.useTransform, $ = p.DS;
        return t(this, r), c = s.call(this), i(T(c), "_initElements", void 0), i(T(c), "_className", void 0), i(T(c), "_hoverClassName", void 0), i(T(c), "_useTransform", void 0), i(T(c), "_draggability", void 0), i(T(c), "init", function() {
          return c._initElements.forEach(function(L) {
            return c.add(L);
          });
        }), i(T(c), "clear", function() {
          return c.forEach(function(L) {
            return c.delete(L);
          });
        }), i(T(c), "_onClick", function(L) {
          return c.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: L
          });
        }), i(T(c), "_onPointer", function(L) {
          return c.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: L
          });
        }), i(T(c), "addAll", function(L) {
          return L.forEach(function(U) {
            return c.add(U);
          });
        }), i(T(c), "deleteAll", function(L) {
          return L.forEach(function(U) {
            return c.delete(U);
          });
        }), c.DS = $, c._initElements = Ne(y), c._className = w, c._hoverClassName = _, c._useTransform = O, c._draggability = S, c.DS.subscribe("Interaction:init", c.init), c;
      }
      return a(r, [{
        key: "add",
        value: function(c) {
          return c.classList.add(this._className), c.addEventListener("click", this._onClick), c.addEventListener("mousedown", this._onPointer), c.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Rt({
            computedStyle: window.getComputedStyle(c),
            node: c
          }), R(g(r.prototype), "add", this).call(this, c);
        }
      }, {
        key: "delete",
        value: function(c) {
          return c.classList.remove(this._className), c.classList.remove(this._hoverClassName), c.removeEventListener("click", this._onClick), c.removeEventListener("mousedown", this._onPointer), c.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), R(g(r.prototype), "delete", this).call(this, c);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ M(Set)), ni = /* @__PURE__ */ function(u) {
      m(r, u);
      var s = B(r);
      function r(p) {
        var c, y = p.className, w = p.DS;
        return t(this, r), c = s.call(this), i(T(c), "_className", void 0), i(T(c), "clear", function() {
          return c.forEach(function(_) {
            return c.delete(_);
          });
        }), i(T(c), "addAll", function(_) {
          return _.forEach(function(S) {
            return c.add(S);
          });
        }), i(T(c), "deleteAll", function(_) {
          return _.forEach(function(S) {
            return c.delete(S);
          });
        }), c.DS = w, c._className = y, c;
      }
      return a(r, [{
        key: "add",
        value: function(c) {
          if (!R(g(r.prototype), "has", this).call(this, c)) {
            var y = {
              items: this.elements,
              item: c
            };
            return this.DS.publish("Selected:added:pre", y), R(g(r.prototype), "add", this).call(this, c), c.classList.add(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", y), this;
          }
        }
      }, {
        key: "delete",
        value: function(c) {
          if (!!R(g(r.prototype), "has", this).call(this, c)) {
            var y = {
              items: this.elements,
              item: c
            };
            this.DS.publish("Selected:removed:pre", y);
            var w = R(g(r.prototype), "delete", this).call(this, c);
            return c.classList.remove(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", y), w;
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
    }(/* @__PURE__ */ M(Set)), oi = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, p = s.DS, c = s.hoverClassName, y = s.multiSelectToggling;
        t(this, u), i(this, "_prevSelectedSet", void 0), i(this, "_hoverClassName", void 0), i(this, "_multiSelectToggling", void 0), i(this, "start", function(w) {
          var _ = w.event, S = w.isDragging;
          S || (r._storePrevious(_), r._handleInsideSelection(!0, _));
        }), i(this, "update", function(w) {
          var _ = w.isDragging;
          _ || r.DS.continue || r._handleInsideSelection();
        }), i(this, "_handleInsideSelection", function(w, _) {
          for (var S = r.DS, O = S.SelectableSet, $ = S.SelectorArea, L = S.Selector, U = O.elements.map(function(ke) {
            return [ke, ke.getBoundingClientRect()];
          }), Z = [], de = [], te = 0, Le = U.length; te < Le; te++)
            !$.isInside(U[te][0], U[te][1]) || (gt(U[te][1], L.rect) ? Z.push(U[te][0]) : de.push(U[te][0]));
          var nt = r.DS.stores.KeyStore.isMultiSelectKeyPressed(_) && r._multiSelectToggling;
          r.DS.continue || (Z.forEach(function(ke) {
            return Fr({
              element: ke,
              force: w,
              multiSelectionToggle: nt,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName
            });
          }), de.forEach(function(ke) {
            return qr({
              element: ke,
              force: w,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName,
              PrevSelectedSet: r._prevSelectedSet
            });
          }));
        }), this._hoverClassName = c, this._multiSelectToggling = y, this.DS = p, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return a(u, [{
        key: "_storePrevious",
        value: function(r) {
          var p = this.DS, c = p.stores.KeyStore, y = p.SelectedSet;
          c.isMultiSelectKeyPressed(r) ? this._prevSelectedSet = new Set(y) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), u;
    }(), ai = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, p = s.DS, c = s.selector, y = s.selectorClass, w = s.customStyles;
        t(this, u), i(this, "_rect", void 0), i(this, "start", function(_) {
          var S = _.isDragging;
          if (!S) {
            var O = r.DS.stores.PointerStore, $ = O.initialValArea;
            Ut(r.HTMLNode, ae($, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), i(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), i(this, "update", function(_) {
          var S = _.isDragging;
          if (!(S || r.DS.continue)) {
            var O = r.DS.stores, $ = O.ScrollStore, L = O.PointerStore, U = Hr({
              scrollAmount: $.scrollAmount,
              initialPointerPos: L.initialValArea,
              pointerPos: L.currentValArea
            });
            Ut(r.HTMLNode, U), r._rect = null;
          }
        }), this.DS = p, this.HTMLNode = c || rt(w), this.HTMLNode.classList.add(y), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return a(u, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), u;
    }(), si = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, p = s.DS, c = s.selectorAreaClass, y = s.autoScrollSpeed, w = s.overflowTolerance;
        t(this, u), i(this, "_autoScrollSpeed", void 0), i(this, "_scrollInterval", void 0), i(this, "_rect", void 0), i(this, "currentEdges", []), i(this, "_overflowTolerance", void 0), i(this, "start", function() {
          return r.applyElements("append");
        }), i(this, "applyElements", function() {
          var _ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", S = document.body ? "body" : "documentElement", O = "".concat(_, "Child");
          r.HTMLNode[O](r.DS.Selector.HTMLNode), document[S][O](r.HTMLNode);
        }), i(this, "updatePos", function() {
          r._rect = null;
          var _ = r.DS.Area.rect, S = r.DS.Area.computedBorder, O = r.HTMLNode.style, $ = "".concat(_.top + S.top, "px"), L = "".concat(_.left + S.left, "px"), U = "".concat(_.width, "px"), Z = "".concat(_.height, "px");
          O.top !== $ && (O.top = $), O.left !== L && (O.left = L), O.width !== U && (O.width = U), O.height !== Z && (O.height = Z);
        }), i(this, "stop", function(_) {
          r.stopAutoScroll(), _ && r.applyElements("remove");
        }), i(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), i(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var _ = r.DS, S = _.stores.PointerStore, O = _.Area;
            r.currentEdges = zt({
              elementRect: ae(S.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && O.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), i(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), i(this, "isInside", function(_, S) {
          return r.DS.Area.HTMLNode.contains(_) && r.DS.stores.ScrollStore.canScroll ? !0 : gt(r.rect, S || _.getBoundingClientRect());
        }), this._autoScrollSpeed = y, this._overflowTolerance = w, this.DS = p, this.HTMLNode = tt(c), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          r.updatePos(), r.stopAutoScroll();
        });
      }
      return a(u, [{
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
    }(), li = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, p = s.DS, c = s.multiSelectKeys, y = s.multiSelectMode;
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
        }), this.DS = p, this._multiSelectMode = y, this._multiSelectKeys = c.map(function(w) {
          var _ = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, S = _[w];
          return S ? (console.warn("[DragSelect] ".concat(w, ' is deprecated. Use "').concat(S, '" instead. Act Now!. See docs for more info')), S.toLowerCase()) : w.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return a(u, [{
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
    }(), ci = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, p = s.DS;
        t(this, u), i(this, "_isMouseInteraction", !1), i(this, "_initialValArea", void 0), i(this, "_currentValArea", void 0), i(this, "_lastValArea", void 0), i(this, "_initialVal", void 0), i(this, "_currentVal", void 0), i(this, "_lastVal", void 0), i(this, "_lastTouch", void 0), i(this, "init", function() {
          document.addEventListener("mousemove", r.update), document.addEventListener("touchmove", r.update, {
            passive: !1
          });
        }), i(this, "getPointerPosition", function(c) {
          return Rr({
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
          var y = c.event;
          return r.start(y);
        }), this.DS.subscribe("Interaction:end", function(c) {
          var y = c.event;
          return r.reset(y);
        });
      }
      return a(u, [{
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
          this._initialVal = r, this._initialValArea = r && V(r, "-", V(W(this.DS.Area.rect), "+", W(this.DS.Area.computedBorder)));
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
          this._currentVal = r, this._currentValArea = r && V(r, "-", V(W(this.DS.Area.rect), "+", W(this.DS.Area.computedBorder)));
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
          this._lastVal = r, this._lastValArea = r && V(r, "-", V(W(this.DS.Area.rect), "+", W(this.DS.Area.computedBorder)));
        }
      }]), u;
    }(), ui = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, p = s.DS, c = s.areaElement, y = s.zoom;
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
        }), this._areaElement = c, this.DS = p, this.zoom = y, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return r.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return r.reset();
        });
      }
      return a(u, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = We(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var r = V(this.currentVal, "-", this.initialVal), p = Pe(this.zoom), c = V(V(r, "*", p), "-", r);
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
    }(), di = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, p = s.area, c = p === void 0 ? document : p, y = s.selectables, w = y === void 0 ? [] : y, _ = s.autoScrollSpeed, S = _ === void 0 ? 5 : _, O = s.overflowTolerance, $ = O === void 0 ? {
          x: 25,
          y: 25
        } : O, L = s.zoom, U = L === void 0 ? 1 : L, Z = s.customStyles, de = Z === void 0 ? !1 : Z, te = s.multiSelectMode, Le = te === void 0 ? !1 : te, nt = s.multiSelectToggling, ke = nt === void 0 ? !0 : nt, Kt = s.multiSelectKeys, hi = Kt === void 0 ? ["Control", "Shift", "Meta"] : Kt, Yt = s.selector, fi = Yt === void 0 ? void 0 : Yt, Wt = s.draggability, vt = Wt === void 0 ? !0 : Wt, Xt = s.immediateDrag, mi = Xt === void 0 ? !0 : Xt, Ft = s.keyboardDrag, pi = Ft === void 0 ? !0 : Ft, gi = s.dragKeys, qt = s.keyboardDragSpeed, vi = qt === void 0 ? 10 : qt, Gt = s.useTransform, Jt = Gt === void 0 ? !0 : Gt, Zt = s.hoverClass, Qt = Zt === void 0 ? "ds-hover" : Zt, er = s.selectableClass, tr = er === void 0 ? "ds-selectable" : er, rr = s.selectedClass, bi = rr === void 0 ? "ds-selected" : rr, ir = s.selectorClass, yi = ir === void 0 ? "ds-selector" : ir, nr = s.selectorAreaClass, wi = nr === void 0 ? "ds-selector-area" : nr, xi = s.callback, _i = s.onDragMove, ki = s.onDragStartBegin, Si = s.onDragStart, Di = s.onElementSelect, Ci = s.onElementUnselect;
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
        }), i(this, "isMultiSelect", function(Mi) {
          return r.stores.KeyStore.isMultiSelectKeyPressed(Mi);
        }), i(this, "isDragging", function() {
          return r.Interaction.isDragging;
        }), this.PubSub = new ri({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: xi,
          onDragMove: _i,
          onDragStart: Si,
          onDragStartBegin: ki,
          onElementSelect: Di,
          onElementUnselect: Ci
        }), this.stores = {
          PointerStore: new ci({
            DS: this
          }),
          ScrollStore: new ui({
            DS: this,
            areaElement: c,
            zoom: U
          }),
          KeyStore: new li({
            DS: this,
            multiSelectKeys: hi,
            multiSelectMode: Le
          })
        }, this.Area = new Qr({
          area: c,
          PS: this.PubSub,
          zoom: U
        }), this.Selector = new ai({
          DS: this,
          selector: fi,
          selectorClass: yi,
          customStyles: de
        }), this.SelectorArea = new si({
          DS: this,
          selectorAreaClass: wi,
          autoScrollSpeed: S,
          overflowTolerance: $
        }), this.SelectableSet = new ii({
          elements: w,
          DS: this,
          className: tr,
          hoverClassName: Qt,
          useTransform: Jt,
          draggability: vt
        }), this.SelectedSet = new ni({
          DS: this,
          className: bi
        }), this.Selection = new oi({
          DS: this,
          hoverClassName: Qt,
          multiSelectToggling: ke
        }), this.Drag = new ei({
          DS: this,
          draggability: vt,
          useTransform: Jt,
          keyboardDrag: pi,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, gi),
          zoom: U,
          keyboardDragSpeed: vi
        }), this.Interaction = new ti({
          areaElement: c,
          DS: this,
          draggability: vt,
          immediateDrag: mi,
          selectableClass: tr
        }), Zr({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return r.continue = !1;
        }), this.start();
      }
      return a(u, [{
        key: "_callbacksTemp",
        value: function(r) {
          var p = r.callback, c = r.onDragMove, y = r.onDragStart, w = r.onDragStartBegin, _ = r.onElementSelect, S = r.onElementUnselect, O = function(L, U) {
            return console.warn("[DragSelect] ".concat(L, ' is deprecated. Use DragSelect.subscribe("').concat(U, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          p && (O("callback", "callback"), this.subscribe("callback", function($) {
            var L = $.items;
            $.item;
            var U = $.event;
            return p(L, U);
          })), c && (O("onDragMove", "dragmove"), this.subscribe("dragmove", function($) {
            $.items, $.item;
            var L = $.event;
            return c(L);
          })), y && (O("onDragStart", "dragstart"), this.subscribe("dragstart", function($) {
            $.items, $.item;
            var L = $.event;
            return y(L);
          })), w && (O("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function($) {
            $.items, $.item;
            var L = $.event;
            return w(L);
          })), _ && (O("onElementSelect", "elementselect"), this.subscribe("elementselect", function($) {
            $.items;
            var L = $.item, U = $.event;
            return _(L, U);
          })), S && (O("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function($) {
            $.items;
            var L = $.item, U = $.event;
            return S(L, U);
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
          var p = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return Ne(r).forEach(function(w) {
            return p.SelectedSet.has(w) ? p.removeSelection(r, c, y) : p.addSelection(r, c, y);
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
          var c = p ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), y = r ? p ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : p ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return V(c, "-", y);
        }
      }]), u;
    }();
    return di;
  });
})(Dr);
const xn = Dr.exports, _n = (o, e, t, n, a) => (e = Math, t = e.log, n = 1024, a = t(o) / t(n) | 0, o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B"), kn = (o, e = "en-US") => new Date(o * 1e3).toLocaleString(e), Sn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Dn = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Cn = [
  Dn
], Mn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, $n = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), En = [
  $n
], Tn = {
  name: "VFSortIcon"
}, at = /* @__PURE__ */ Object.assign(Tn, {
  props: { direction: String },
  setup(o) {
    return (e, t) => (x(), C("div", null, [
      o.direction == "down" ? (x(), C("svg", Sn, Cn)) : ne("", !0),
      o.direction == "up" ? (x(), C("svg", Mn, En)) : ne("", !0)
    ]));
  }
}), An = ["onClick"], On = {
  name: "VFToast.vue"
}, Pn = /* @__PURE__ */ Object.assign(On, {
  setup(o) {
    const e = inject("emitter"), { getStore: t } = inject("storage"), n = z(t("full-screen", !1)), a = (m) => m == "error" ? "text-red-400 border-red-400" : "text-lime-600 border-lime-600", i = z([]), l = (m) => {
      i.value.splice(m, 1);
    }, h = (m) => {
      let g = i.value.findIndex((f) => f.id === m);
      g !== -1 && l(g);
    };
    return e.on("vf-toast-push", (m) => {
      let g = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      m.id = g, i.value.push(m), setTimeout(() => {
        h(g);
      }, 5e3);
    }), (m, g) => (x(), C("div", {
      class: fe([n.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      ve($i, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: Q(() => [
          (x(!0), C(oe, null, pe(i.value, (f, v) => (x(), C("div", {
            onClick: (b) => l(v),
            key: f,
            class: fe([a(f.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 border text-xs rounded cursor-pointer"])
          }, E(f.label), 11, An))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), jn = { class: "relative flex-auto flex flex-col overflow-hidden" }, In = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, Nn = { class: "absolute" }, Ln = /* @__PURE__ */ d("svg", {
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
], -1), Vn = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, zn = ["onDblclick", "onTouchstart", "onContextmenu", "data-type", "data-item", "data-index"], Bn = { class: "grid grid-cols-12 items-center" }, Rn = { class: "flex col-span-7 items-center" }, Hn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Un = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Kn = [
  Un
], Yn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
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
], Fn = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, qn = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Gn = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Jn = { class: "grid grid-cols-12 items-center" }, Zn = { class: "flex col-span-7 items-center" }, Qn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, eo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), to = [
  eo
], ro = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, io = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), no = [
  io
], oo = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, ao = { class: "col-span-2 text-center" }, so = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, lo = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], co = { class: "relative" }, uo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ho = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), fo = [
  ho
], mo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, po = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), go = [
  po
], vo = { class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500" }, bo = { class: "break-all" }, yo = {
  name: "VFExplorer"
}, wo = /* @__PURE__ */ Object.assign(yo, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { setStore: n, getStore: a } = inject("storage"), i = (j) => j == null ? void 0 : j.substring(0, 3), l = (j) => j.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), h = z(null), m = z(null), g = z(0), f = z(null), { t: v } = inject("i18n"), b = z(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      b.value = !b.value, n("full-screen", b.value);
    });
    const A = z("");
    t.on("vf-search-query", ({ newQuery: j }) => {
      A.value = j, j ? t.emit("vf-fetch", { q: "search", adapter: e.data.adapter, path: e.data.dirname, filter: j }) : t.emit("vf-fetch", { q: "index", adapter: e.data.adapter, path: e.data.dirname });
    });
    let M = null;
    const T = () => {
      M && clearTimeout(M);
    }, I = (j) => {
      M = setTimeout(() => {
        B(j);
      }, 500);
    }, B = (j) => {
      j.type == "dir" ? (t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.data.adapter, path: j.path })) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: j });
    }, P = ut({ active: !1, column: "", order: "" }), R = (j = !0) => {
      let H = [...e.data.files], N = P.column, J = P.order == "asc" ? 1 : -1;
      if (!j)
        return H;
      const V = (W, ae) => typeof W == "string" && typeof ae == "string" ? W.toLowerCase().localeCompare(ae.toLowerCase()) : W < ae ? -1 : W > ae ? 1 : 0;
      return P.active && (H = H.slice().sort((W, ae) => V(W[N], ae[N]) * J)), H;
    }, ee = (j) => {
      P.active && P.column == j ? (P.active = P.order == "asc", P.column = j, P.order = "desc") : (P.active = !0, P.column = j, P.order = "asc");
    }, X = () => f.value.getSelection().map((j) => JSON.parse(j.dataset.item)), D = (j, H) => {
      if (j.altKey || j.ctrlKey || j.metaKey)
        return j.preventDefault(), !1;
      j.dataTransfer.setDragImage(m.value, 0, 15), j.dataTransfer.effectAllowed = "all", j.dataTransfer.dropEffect = "copy", j.dataTransfer.setData("items", JSON.stringify(X()));
    }, Y = (j, H) => {
      j.preventDefault();
      let N = JSON.parse(j.dataTransfer.getData("items"));
      if (N.find((J) => J.storage != a("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: N, to: H } });
    }, F = (j, H) => {
      j.preventDefault(), !H || H.type !== "dir" || f.value.getSelection().find((N) => N == j.currentTarget) ? (j.dataTransfer.dropEffect = "none", j.dataTransfer.effectAllowed = "none") : j.dataTransfer.dropEffect = "copy";
    };
    return ye(() => {
      f.value = new xn({
        area: h.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => ft(() => {
        f.value.clearSelection(), f.value.setSelectables(document.getElementsByClassName("vf-item"));
      })), f.value.subscribe("predragstart", ({ event: j, isDragging: H }) => {
        if (H)
          g.value = f.value.getSelection().length, f.value.break();
        else {
          const N = j.target.offsetWidth - j.offsetX, J = j.target.offsetHeight - j.offsetY;
          N < 15 && J < 15 && (f.value.clearSelection(), f.value.break());
        }
      }), f.value.subscribe("predragmove", ({ isDragging: j }) => {
        j && f.value.break();
      }), f.value.subscribe("callback", ({ items: j, event: H, isDragging: N }) => {
        t.emit("vf-nodes-selected", X()), g.value = f.value.getSelection().length;
      });
    }), ye(() => {
      Pt(() => e.view, () => t.emit("vf-explorer-update"));
    }), (j, H) => (x(), C("div", jn, [
      o.view == "list" || A.value.length ? (x(), C("div", In, [
        d("div", {
          onClick: H[0] || (H[0] = (N) => ee("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          De(E(k(v)("Name")) + " ", 1),
          me(ve(at, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, P.active && P.column == "basename"]
          ])
        ]),
        A.value.length ? ne("", !0) : (x(), C("div", {
          key: 0,
          onClick: H[1] || (H[1] = (N) => ee("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          De(E(k(v)("Size")) + " ", 1),
          me(ve(at, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, P.active && P.column == "file_size"]
          ])
        ])),
        A.value.length ? ne("", !0) : (x(), C("div", {
          key: 1,
          onClick: H[2] || (H[2] = (N) => ee("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          De(E(k(v)("Date")) + " ", 1),
          me(ve(at, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, P.active && P.column == "last_modified"]
          ])
        ])),
        A.value.length ? (x(), C("div", {
          key: 2,
          onClick: H[3] || (H[3] = (N) => ee("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          De(E(k(v)("Filepath")) + " ", 1),
          me(ve(at, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, P.active && P.column == "path"]
          ])
        ])) : ne("", !0)
      ])) : ne("", !0),
      d("div", Nn, [
        d("div", {
          ref_key: "dragImage",
          ref: m,
          class: "absolute -z-50 -top-96"
        }, [
          Ln,
          d("div", Vn, E(g.value), 1)
        ], 512)
      ]),
      d("div", {
        style: Sr(b.value ? "height: 100%;" : ""),
        class: fe([b.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: h,
        onContextmenu: H[7] || (H[7] = Te((N) => k(t).emit("vf-contextmenu-show", { event: N, area: h.value, items: X() }), ["self", "prevent"]))
      }, [
        A.value.length ? (x(!0), C(oe, { key: 0 }, pe(R(), (N, J) => (x(), C("div", {
          onDblclick: (V) => B(N),
          onTouchstart: (V) => I(N),
          onTouchend: H[4] || (H[4] = (V) => T()),
          onContextmenu: Te((V) => k(t).emit("vf-contextmenu-show", { event: V, area: h.value, items: X(), target: N }), ["prevent"]),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": J
        }, [
          d("div", Bn, [
            d("div", Rn, [
              N.type == "dir" ? (x(), C("svg", Hn, Kn)) : (x(), C("svg", Yn, Xn)),
              d("span", Fn, E(N.basename), 1)
            ]),
            d("div", qn, E(N.path), 1)
          ])
        ], 40, zn))), 256)) : ne("", !0),
        o.view == "list" && !A.value.length ? (x(!0), C(oe, { key: 1 }, pe(R(), (N, J) => (x(), C("div", {
          draggable: "true",
          onDblclick: (V) => B(N),
          onTouchstart: (V) => I(N),
          onTouchend: H[5] || (H[5] = (V) => T()),
          onContextmenu: Te((V) => k(t).emit("vf-contextmenu-show", { event: V, area: h.value, items: X(), target: N }), ["prevent"]),
          onDragstart: (V) => D(V),
          onDragover: (V) => F(V, N),
          onDrop: (V) => Y(V, N),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": J
        }, [
          d("div", Jn, [
            d("div", Zn, [
              N.type == "dir" ? (x(), C("svg", Qn, to)) : (x(), C("svg", ro, no)),
              d("span", oo, E(N.basename), 1)
            ]),
            d("div", ao, E(N.file_size ? k(_n)(N.file_size) : ""), 1),
            d("div", so, E(k(kn)(N.last_modified)), 1)
          ])
        ], 40, Gn))), 256)) : ne("", !0),
        o.view == "grid" && !A.value.length ? (x(!0), C(oe, { key: 2 }, pe(R(!1), (N, J) => (x(), C("div", {
          draggable: "true",
          onDblclick: (V) => B(N),
          onTouchstart: (V) => I(N),
          onTouchend: H[6] || (H[6] = (V) => T()),
          onContextmenu: Te((V) => k(t).emit("vf-contextmenu-show", { event: V, area: h.value, items: X(), target: N }), ["prevent"]),
          onDragstart: (V) => D(V),
          onDragover: (V) => F(V, N),
          onDrop: (V) => Y(V, N),
          class: "vf-item border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none",
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": J
        }, [
          d("div", null, [
            d("div", co, [
              N.type == "dir" ? (x(), C("svg", uo, fo)) : (x(), C("svg", mo, go)),
              d("div", vo, E(i(N.extension)), 1)
            ]),
            d("span", bo, E(l(N.basename)), 1)
          ])
        ], 40, lo))), 256)) : ne("", !0)
      ], 38),
      ve(Pn)
    ]));
  }
}), xo = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, _o = { class: "flex leading-5 items-center" }, ko = ["aria-label"], So = /* @__PURE__ */ d("svg", {
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
], -1), Do = [
  So
], Co = ["value"], Mo = { class: "ml-3" }, $o = { key: 0 }, Eo = { class: "ml-1" }, To = { class: "flex leading-5 items-center" }, Ao = {
  value: "",
  disabled: ""
}, Oo = /* @__PURE__ */ d("option", { value: "tr" }, "Turkish", -1), Po = /* @__PURE__ */ d("option", { value: "en" }, "English", -1), jo = /* @__PURE__ */ d("option", { value: "fr" }, "French", -1), Io = ["aria-label"], No = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
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
], -1), Lo = [
  No
], Vo = {
  name: "VFStatusbar"
}, zo = /* @__PURE__ */ Object.assign(Vo, {
  props: {
    data: Object
  },
  setup(o) {
    var b;
    const e = o, t = inject("emitter"), { getStore: n, setStore: a } = inject("storage"), i = z(0), l = z((b = n("adapter")) != null ? b : e.data.adapter), { t: h, changeLocale: m } = inject("i18n"), g = z(n("locale", "")), f = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: l.value }), a("adapter", l.value);
    };
    t.on("vf-nodes-selected", (A) => {
      i.value = A.length;
    });
    const v = z("");
    return t.on("vf-search-query", ({ newQuery: A }) => {
      v.value = A;
    }), (A, M) => (x(), C("div", xo, [
      d("div", _o, [
        d("div", {
          class: "mx-2",
          "aria-label": k(h)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, Do, 8, ko),
        me(d("select", {
          "onUpdate:modelValue": M[0] || (M[0] = (T) => l.value = T),
          onChange: f,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (x(!0), C(oe, null, pe(o.data.storages, (T) => (x(), C("option", { value: T }, E(T), 9, Co))), 256))
        ], 544), [
          [or, l.value]
        ]),
        d("div", Mo, [
          v.value.length ? (x(), C("span", $o, E(o.data.files.length) + " items found. ", 1)) : ne("", !0),
          d("span", Eo, E(i.value > 0 ? i.value + " " + k(h)("item(s) selected.") : ""), 1)
        ])
      ]),
      d("div", To, [
        me(d("select", {
          "onUpdate:modelValue": M[1] || (M[1] = (T) => g.value = T),
          onChange: M[2] || (M[2] = (T) => k(m)(T.target.value)),
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          d("option", Ao, E(k(h)("Language")), 1),
          Oo,
          Po,
          jo
        ], 544), [
          [or, g.value]
        ]),
        d("span", {
          "aria-label": k(h)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: M[3] || (M[3] = (T) => k(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: k(h)("Vuefinder is a file manager component for vue 3.") }))
        }, Lo, 8, Io)
      ])
    ]));
  }
}), Bo = (o, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && o(...a), clearTimeout(n), n = setTimeout(() => {
      o(...a);
    }, e);
  };
}, Ro = (o, e, t) => {
  const n = z(o);
  return Ei((i, l) => ({
    get() {
      return i(), n.value;
    },
    set: Bo(
      (h) => {
        n.value = h, l();
      },
      e,
      t
    )
  }));
}, Ho = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Uo = ["aria-label"], Ko = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Yo = [
  Ko
], Wo = ["onClick"], Xo = /* @__PURE__ */ d("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Fo = [
  Xo
], qo = { class: "flex leading-5" }, Go = /* @__PURE__ */ d("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Jo = ["title", "onClick"], Zo = {
  key: 1,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, Qo = /* @__PURE__ */ d("svg", {
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
], -1), ea = ["onKeydown", "placeholder"], ta = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), ra = [
  ta
], ia = {
  name: "VFBreadcrumb"
}, na = /* @__PURE__ */ Object.assign(ia, {
  props: {
    data: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), a = z(null), i = z([]), l = z(!1), h = z(null), { t: m } = inject("i18n");
    t.on("vf-explorer-update", () => {
      var P;
      let I = [], B = [];
      a.value = (P = e.data.dirname) != null ? P : n("adapter", "local") + "://", a.value.length == 0 && (i.value = []), a.value.replace(n("adapter", "local") + "://", "").split("/").forEach(function(R) {
        I.push(R), I.join("/") != "" && B.push({
          basename: R,
          name: R,
          path: n("adapter", "local") + "://" + I.join("/"),
          type: "dir"
        });
      }), B.length > 4 && (B = B.slice(-5), B[0].name = ".."), i.value = B;
    });
    const g = () => {
      l.value = !1, v.value = "";
    };
    t.on("vf-search-exit", () => {
      g();
    });
    const f = () => {
      l.value = !0, ft(() => h.value.focus());
    }, v = Ro("", 400);
    Pt(v, (I) => {
      t.emit("vf-search-query", { newQuery: I });
    });
    const b = () => i.value.length && !l.value, A = (I) => {
      var P;
      I.preventDefault();
      let B = JSON.parse(I.dataTransfer.getData("items"));
      if (B.find((R) => R.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: B, to: (P = i.value[i.value.length - 2]) != null ? P : { path: n("adapter", "local") + "://" } }
      });
    }, M = (I) => {
      I.preventDefault(), b() ? I.dataTransfer.dropEffect = "copy" : (I.dataTransfer.dropEffect = "none", I.dataTransfer.effectAllowed = "none");
    }, T = () => {
      v.value == "" && g();
    };
    return (I, B) => (x(), C("div", Ho, [
      d("span", {
        "aria-label": k(m)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (x(), C("svg", {
          onDragover: B[0] || (B[0] = (P) => M(P)),
          onDrop: B[1] || (B[1] = (P) => A(P)),
          onClick: B[2] || (B[2] = (P) => {
            var R, ee;
            return !b() || k(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: (ee = (R = i.value[i.value.length - 2]) == null ? void 0 : R.path) != null ? ee : k(n)("adapter", "local") + "://" });
          }),
          class: fe(["h-6 w-6 p-0.5 rounded", b() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Yo, 34))
      ], 8, Uo),
      l.value ? (x(), C("div", Zo, [
        Qo,
        me(d("input", {
          ref_key: "searchInput",
          ref: h,
          onKeydown: Ue(g, ["esc"]),
          onBlur: T,
          "onUpdate:modelValue": B[4] || (B[4] = (P) => Ti(v) ? v.value = P : null),
          placeholder: k(m)("Search anything.."),
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, ea), [
          [Ke, k(v)]
        ]),
        (x(), C("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: g,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, ra))
      ])) : (x(), C("div", {
        key: 0,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Te(f, ["self"])
      }, [
        (x(), C("svg", {
          onClick: B[3] || (B[3] = (P) => k(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Fo)),
        d("div", qo, [
          (x(!0), C(oe, null, pe(i.value, (P, R) => (x(), C("div", { key: R }, [
            Go,
            d("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: P.basename,
              onClick: (ee) => k(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: P.path })
            }, E(P.name), 9, Jo)
          ]))), 128))
        ])
      ], 8, Wo))
    ]));
  }
}), Oe = (o) => Object.entries(o).map((e) => e.map(encodeURIComponent).join("=")).join("&"), oa = ["onClick"], aa = /* @__PURE__ */ d("span", { class: "px-1" }, null, -1), sa = {
  name: "VFContextMenu"
}, la = /* @__PURE__ */ Object.assign(sa, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), n = z(null), { apiUrl: a } = _e(), i = ut({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), l = z([]);
    t.on("vf-context-selected", (b) => {
      l.value = b;
    });
    const { t: h } = inject("i18n"), m = {
      newfolder: {
        title: () => h("New Folder"),
        action: () => {
          t.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: () => h("Delete"),
        action: () => {
          t.emit("vf-modal-show", { type: "delete", items: l });
        }
      },
      refresh: {
        title: () => h("Refresh"),
        action: () => {
          t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: e.current.dirname });
        }
      },
      preview: {
        title: () => h("Preview"),
        action: () => {
          t.emit("vf-modal-show", { type: "preview", adapter: e.current.adapter, item: l.value[0] });
        }
      },
      open: {
        title: () => h("Open"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: l.value[0].path });
        }
      },
      openDir: {
        title: () => h("Open containing folder"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: l.value[0].dir });
        }
      },
      download: {
        title: () => h("Download"),
        action: () => {
          const b = a.value + "?" + Oe({ q: "download", adapter: l.value[0].adapter, path: l.value[0].path });
          t.emit("vf-download", b);
        }
      },
      archive: {
        title: () => h("Archive"),
        action: () => {
          t.emit("vf-modal-show", { type: "archive", items: l });
        }
      },
      unarchive: {
        title: () => h("Unarchive"),
        action: () => {
          t.emit("vf-modal-show", { type: "unarchive", items: l });
        }
      },
      rename: {
        title: () => h("Rename"),
        action: () => {
          t.emit("vf-modal-show", { type: "rename", items: l });
        }
      }
    }, g = (b) => {
      t.emit("vf-contextmenu-hide"), b.action();
    }, f = z("");
    t.on("vf-search-query", ({ newQuery: b }) => {
      f.value = b;
    }), t.on("vf-contextmenu-show", ({ event: b, area: A, items: M, target: T = null }) => {
      if (i.items = [], f.value)
        if (T)
          i.items.push(m.openDir), t.emit("vf-context-selected", [T]);
        else
          return;
      else
        !T && !f.value ? (i.items.push(m.refresh), i.items.push(m.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")) : M.length > 1 && M.some((I) => I.path === T.path) ? (i.items.push(m.refresh), i.items.push(m.archive), i.items.push(m.delete), t.emit("vf-context-selected", M), console.log(M.length + " selected (more than 1 item.)")) : (T.type == "dir" ? i.items.push(m.open) : i.items.push(m.preview), i.items.push(m.rename), i.items.push(m.download), T.mime_type == "application/zip" ? i.items.push(m.unarchive) : i.items.push(m.archive), i.items.push(m.delete), t.emit("vf-context-selected", [T]), console.log(T.type + " is selected"));
      v(b, A);
    }), t.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const v = (b, A) => {
      i.active = !0, ft(() => {
        let M = A.getBoundingClientRect(), T = b.pageX, I = b.pageY, B = n.value.offsetHeight, P = n.value.offsetWidth;
        T = M.right - b.pageX + window.scrollX < P ? T - P : T, I = M.bottom - b.pageY + window.scrollY < B ? I - B : I, i.positions = {
          left: T + "px",
          top: I + "px"
        };
      });
    };
    return (b, A) => i.active ? (x(), C("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: n,
      style: Sr(i.positions)
    }, [
      (x(!0), C(oe, null, pe(i.items, (M) => (x(), C("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: M.title,
        onClick: (T) => g(M)
      }, [
        aa,
        d("span", null, E(M.title()), 1)
      ], 8, oa))), 128))
    ], 4)) : ne("", !0);
  }
}), ca = (o, e) => {
  const t = o[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((n, a) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(a.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function ua(o) {
  const e = await ca(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en.8df71796.js"), "../locales/tr.json": () => import("./tr.a655a0c7.js") }), `../locales/${o}.json`);
  return JSON.parse(e.default);
}
function da(o, e) {
  const { getStore: t, setStore: n } = kt(o), a = ["en", "tr"], i = z({}), l = (m) => {
    a.includes(m) || (console.log("The selected locale is not yet supported. The fallback language is set as 'en'"), m = "en"), ua(m).then((g) => {
      i.value = g, n("locale", m), n("translations", g), console.log(m + " is loaded.");
    });
  };
  t("locale") ? i.value = t("translations") : l(e);
  function h(m) {
    return i.value.hasOwnProperty(m) ? i.value[m] : "";
  }
  return { t: h, support_locales: a, changeLocale: l };
}
const ha = /* @__PURE__ */ d("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), fa = {
  name: "VueFinder"
}, ma = /* @__PURE__ */ Object.assign(fa, {
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
    }
  },
  setup(o) {
    const e = o, t = Pi(), { setStore: n, getStore: a } = kt(e.id);
    bt("emitter", t), bt("storage", kt(e.id));
    const i = da(e.id, e.locale);
    bt("i18n", i);
    const { apiUrl: l, setApiUrl: h } = _e();
    h(e.url);
    const m = ut({ adapter: "local", storages: [], dirname: ".", files: [] }), g = z(a("viewport", "grid")), f = z(a("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      f.value = !f.value, n("darkMode", f.value);
    });
    const v = z(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      v.value = !v.value, n("full-screen", v.value);
    }), t.on("vf-view-toggle", (M) => {
      g.value = M;
    });
    const b = ut({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      b.active = !1;
    }), t.on("vf-modal-show", (M) => {
      b.active = !0, b.type = M.type, b.data = M;
    });
    const A = (M) => {
      Object.assign(m, M), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update");
    };
    return t.on("vf-fetch", (M) => {
      dt(l.value, { params: M }).then((T) => {
        t.emit("vf-modal-close"), A(T);
      });
    }), t.on("vf-download", (M) => {
      document.getElementById("download_frame").src = M, t.emit("vf-modal-close");
    }), ye(() => {
      t.emit("vf-fetch", { q: "index", adapter: a("adapter", m.adapter) });
    }), (M, T) => (x(), C("div", {
      class: fe(f.value ? "dark" : "")
    }, [
      d("div", {
        class: fe([v.value ? "fixed w-screen inset-0 z-20" : "relative", "border flex flex-col rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        onMousedown: T[0] || (T[0] = (I) => k(t).emit("vf-contextmenu-hide"))
      }, [
        ve(yn, { data: m }, null, 8, ["data"]),
        ve(na, { data: m }, null, 8, ["data"]),
        ve(wo, {
          view: g.value,
          data: m
        }, null, 8, ["view", "data"]),
        ve(zo, { data: m }, null, 8, ["data"])
      ], 34),
      b.active ? (x(), se(Ai("v-f-modal-" + b.type), {
        key: 0,
        selection: b.data,
        current: m
      }, null, 8, ["selection", "current"])) : ne("", !0),
      ve(la, { current: m }, null, 8, ["current"]),
      ha
    ], 2));
  }
}), pa = /* @__PURE__ */ d("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), ga = { class: "fixed z-10 inset-0 overflow-y-auto" }, va = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, ba = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, ya = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, xe = {
  __name: "ModalLayout",
  setup(o) {
    const e = inject("emitter");
    return ye(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, n) => (x(), C("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: n[1] || (n[1] = Ue((a) => k(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      pa,
      d("div", ga, [
        d("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = Te((a) => k(e).emit("vf-modal-close"), ["self"]))
        }, [
          d("div", va, [
            d("div", ba, [
              ar(t.$slots, "default")
            ]),
            d("div", ya, [
              ar(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, wa = { class: "sm:flex sm:items-start" }, xa = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), _a = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, ka = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Sa = { class: "mt-2" }, Da = { class: "text-sm text-gray-500" }, Ca = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ma = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $a = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ea = [
  $a
], Ta = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Aa = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Oa = [
  Aa
], Pa = { class: "ml-1.5" }, ja = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, Ia = {
  name: "VFModalDelete"
}, Na = /* @__PURE__ */ Object.assign(Ia, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), { t: a } = inject("i18n"), i = z(e.selection.items), l = () => {
      i.value.length && t.emit("vf-fetch", {
        q: "delete",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(i.value.map(({ path: h, type: m }) => ({ path: h, type: m })))
      });
    };
    return (h, m) => (x(), se(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(a)("Yes, Delete!")), 1),
        d("button", {
          type: "button",
          onClick: m[0] || (m[0] = (g) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(a)("Cancel")), 1),
        d("div", ja, E(k(a)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        d("div", wa, [
          xa,
          d("div", _a, [
            d("h3", ka, E(k(a)("Delete files")), 1),
            d("div", Sa, [
              d("p", Da, E(k(a)("Are you sure you want to delete these files ?")), 1),
              (x(!0), C(oe, null, pe(i.value, (g) => (x(), C("p", Ca, [
                g.type == "dir" ? (x(), C("svg", Ma, Ea)) : (x(), C("svg", Ta, Oa)),
                d("span", Pa, E(g.basename), 1)
              ]))), 256))
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), La = { class: "sm:flex sm:items-start" }, Va = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), za = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Ba = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ra = { class: "mt-2" }, Ha = { class: "text-sm text-gray-500" }, Ua = {
  name: "VFModalMessage"
}, Ka = /* @__PURE__ */ Object.assign(Ua, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = inject("emitter"), { t } = inject("i18n");
    return (n, a) => (x(), se(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: a[0] || (a[0] = (i) => k(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(t)("Close")), 1)
      ]),
      default: Q(() => {
        var i, l, h, m;
        return [
          d("div", La, [
            Va,
            d("div", za, [
              d("h3", Ba, E((l = (i = o.selection) == null ? void 0 : i.title) != null ? l : "Title"), 1),
              d("div", Ra, [
                d("p", Ha, E((m = (h = o.selection) == null ? void 0 : h.message) != null ? m : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), Ya = { class: "sm:flex sm:items-start" }, Wa = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Xa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Fa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, qa = { class: "mt-2" }, Ga = { class: "text-sm text-gray-500" }, Ja = ["onKeyup", "placeholder"], Za = {
  name: "VFModalNewFolder"
}, Qa = /* @__PURE__ */ Object.assign(Za, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), { t: a } = inject("i18n"), i = z(""), l = () => {
      i.value != "" && (t.emit("vf-fetch", {
        q: "newfolder",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: i.value
      }), t.emit("vf-toast-push", { label: "New Folder is created successfully", type: "success" }));
    };
    return (h, m) => (x(), se(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(a)("Create")), 1),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (g) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(a)("Cancel")), 1)
      ]),
      default: Q(() => [
        d("div", Ya, [
          Wa,
          d("div", Xa, [
            d("h3", Fa, E(k(a)("New Folder")), 1),
            d("div", qa, [
              d("p", Ga, E(k(a)("Create a new folder")), 1),
              me(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (g) => i.value = g),
                onKeyup: Ue(l, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: k(a)("Folder Name"),
                type: "text"
              }, null, 40, Ja), [
                [Ke, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), es = { class: "sm:flex sm:items-start" }, ts = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), rs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, is = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ns = { class: "mt-2" }, os = { class: "text-sm text-gray-500" }, as = ["onKeyup", "placeholder"], ss = {
  name: "VFModalNewFile"
}, ls = /* @__PURE__ */ Object.assign(ss, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), { t: a } = inject("i18n"), i = z(""), l = () => {
      i.value != "" && t.emit("vf-fetch", {
        q: "newfile",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: i.value
      });
    };
    return (h, m) => (x(), se(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (g) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        d("div", es, [
          ts,
          d("div", rs, [
            d("h3", is, E(k(a)("New File")), 1),
            d("div", ns, [
              d("p", os, E(k(a)("Create a new file")), 1),
              me(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (g) => i.value = g),
                onKeyup: Ue(l, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: k(a)("File Name"),
                type: "text"
              }, null, 40, as), [
                [Ke, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), cs = { class: "flex" }, us = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ds = { class: "ml-auto mb-2" }, hs = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, fs = { key: 1 }, ms = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, n = z(""), a = z(""), i = z(null), l = z(!1), { apiUrl: h } = _e(), { t: m } = Oi("i18n");
    ye(() => {
      dt(h.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((v) => {
        n.value = v, e("load");
      });
    });
    const g = () => {
      l.value = !l.value, a.value = n.value, l.value == !0 && ft(() => {
        i.value.focus();
      });
    }, f = () => {
      dt(h.value, {
        method: "POST",
        params: { q: "save", adapter: t.selection.adapter, path: t.selection.item.path, content: a.value },
        json: !1
      }).then((v) => {
        n.value = v, e("load"), l.value = !l.value;
      }).catch((v) => console.log(v.statusText));
    };
    return (v, b) => (x(), C(oe, null, [
      d("div", cs, [
        d("div", us, E(o.selection.item.basename), 1),
        d("div", ds, [
          l.value ? (x(), C("button", {
            key: 0,
            onClick: f,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, E(k(m)("Save")), 1)) : ne("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: b[0] || (b[0] = (A) => g())
          }, E(l.value ? k(m)("Cancel") : k(m)("Edit")), 1)
        ])
      ]),
      d("div", null, [
        l.value ? (x(), C("div", fs, [
          me(d("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": b[1] || (b[1] = (A) => a.value = A),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Ke, a.value]
          ])
        ])) : (x(), C("pre", hs, E(n.value), 1))
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
function lr(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(o, a).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Cr(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? lr(Object(t), !0).forEach(function(n) {
      vs(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : lr(Object(t)).forEach(function(n) {
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
function ps(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function cr(o, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(o, n.key, n);
  }
}
function gs(o, e, t) {
  return e && cr(o.prototype, e), t && cr(o, t), o;
}
function vs(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function Mr(o) {
  return bs(o) || ys(o) || ws(o) || xs();
}
function bs(o) {
  if (Array.isArray(o))
    return St(o);
}
function ys(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null)
    return Array.from(o);
}
function ws(o, e) {
  if (!!o) {
    if (typeof o == "string")
      return St(o, e);
    var t = Object.prototype.toString.call(o).slice(8, -1);
    if (t === "Object" && o.constructor && (t = o.constructor.name), t === "Map" || t === "Set")
      return Array.from(o);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return St(o, e);
  }
}
function St(o, e) {
  (e == null || e > o.length) && (e = o.length);
  for (var t = 0, n = new Array(e); t < e; t++)
    n[t] = o[t];
  return n;
}
function xs() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var mt = typeof window < "u" && typeof window.document < "u", we = mt ? window : {}, jt = mt && we.document.documentElement ? "ontouchstart" in we.document.documentElement : !1, It = mt ? "PointerEvent" in we : !1, q = "cropper", Nt = "all", $r = "crop", Er = "move", Tr = "zoom", $e = "e", Ee = "w", Ve = "s", Se = "n", Fe = "ne", qe = "nw", Ge = "se", Je = "sw", Dt = "".concat(q, "-crop"), ur = "".concat(q, "-disabled"), ue = "".concat(q, "-hidden"), dr = "".concat(q, "-hide"), _s = "".concat(q, "-invisible"), ht = "".concat(q, "-modal"), Ct = "".concat(q, "-move"), Qe = "".concat(q, "Action"), st = "".concat(q, "Preview"), Lt = "crop", Ar = "move", Or = "none", Mt = "crop", $t = "cropend", Et = "cropmove", Tt = "cropstart", hr = "dblclick", ks = jt ? "touchstart" : "mousedown", Ss = jt ? "touchmove" : "mousemove", Ds = jt ? "touchend touchcancel" : "mouseup", fr = It ? "pointerdown" : ks, mr = It ? "pointermove" : Ss, pr = It ? "pointerup pointercancel" : Ds, gr = "ready", vr = "resize", br = "wheel", At = "zoom", yr = "image/jpeg", Cs = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, Ms = /^data:/, $s = /^data:image\/jpeg;base64,/, Es = /^img|canvas$/i, Pr = 200, jr = 100, wr = {
  viewMode: 0,
  dragMode: Lt,
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
  minContainerHeight: jr,
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, Ts = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', As = Number.isNaN || we.isNaN;
function K(o) {
  return typeof o == "number" && !As(o);
}
var xr = function(e) {
  return e > 0 && e < 1 / 0;
};
function wt(o) {
  return typeof o > "u";
}
function Ae(o) {
  return ct(o) === "object" && o !== null;
}
var Os = Object.prototype.hasOwnProperty;
function ze(o) {
  if (!Ae(o))
    return !1;
  try {
    var e = o.constructor, t = e.prototype;
    return e && t && Os.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function ce(o) {
  return typeof o == "function";
}
var Ps = Array.prototype.slice;
function Ir(o) {
  return Array.from ? Array.from(o) : Ps.call(o);
}
function re(o, e) {
  return o && ce(e) && (Array.isArray(o) || K(o.length) ? Ir(o).forEach(function(t, n) {
    e.call(o, t, n, o);
  }) : Ae(o) && Object.keys(o).forEach(function(t) {
    e.call(o, o[t], t, o);
  })), o;
}
var G = Object.assign || function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  return Ae(e) && n.length > 0 && n.forEach(function(i) {
    Ae(i) && Object.keys(i).forEach(function(l) {
      e[l] = i[l];
    });
  }), e;
}, js = /\.\d*(?:0|9){12}\d*$/;
function Re(o) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return js.test(o) ? Math.round(o * e) / e : o;
}
var Is = /^width|height|left|top|marginLeft|marginTop$/;
function Ce(o, e) {
  var t = o.style;
  re(e, function(n, a) {
    Is.test(a) && K(n) && (n = "".concat(n, "px")), t[a] = n;
  });
}
function Ns(o, e) {
  return o.classList ? o.classList.contains(e) : o.className.indexOf(e) > -1;
}
function ie(o, e) {
  if (!!e) {
    if (K(o.length)) {
      re(o, function(n) {
        ie(n, e);
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
function be(o, e) {
  if (!!e) {
    if (K(o.length)) {
      re(o, function(t) {
        be(t, e);
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
    if (K(o.length)) {
      re(o, function(n) {
        Be(n, e, t);
      });
      return;
    }
    t ? ie(o, e) : be(o, e);
  }
}
var Ls = /([a-z\d])([A-Z])/g;
function Vt(o) {
  return o.replace(Ls, "$1-$2").toLowerCase();
}
function Ot(o, e) {
  return Ae(o[e]) ? o[e] : o.dataset ? o.dataset[e] : o.getAttribute("data-".concat(Vt(e)));
}
function et(o, e, t) {
  Ae(t) ? o[e] = t : o.dataset ? o.dataset[e] = t : o.setAttribute("data-".concat(Vt(e)), t);
}
function Vs(o, e) {
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
    o.removeAttribute("data-".concat(Vt(e)));
}
var Nr = /\s\s*/, Lr = function() {
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
function ge(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(Nr).forEach(function(i) {
    if (!Lr) {
      var l = o.listeners;
      l && l[i] && l[i][t] && (a = l[i][t], delete l[i][t], Object.keys(l[i]).length === 0 && delete l[i], Object.keys(l).length === 0 && delete o.listeners);
    }
    o.removeEventListener(i, a, n);
  });
}
function he(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(Nr).forEach(function(i) {
    if (n.once && !Lr) {
      var l = o.listeners, h = l === void 0 ? {} : l;
      a = function() {
        delete h[i][t], o.removeEventListener(i, a, n);
        for (var g = arguments.length, f = new Array(g), v = 0; v < g; v++)
          f[v] = arguments[v];
        t.apply(o, f);
      }, h[i] || (h[i] = {}), h[i][t] && o.removeEventListener(i, h[i][t], n), h[i][t] = a, o.listeners = h;
    }
    o.addEventListener(i, a, n);
  });
}
function He(o, e, t) {
  var n;
  return ce(Event) && ce(CustomEvent) ? n = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (n = document.createEvent("CustomEvent"), n.initCustomEvent(e, !0, !0, t)), o.dispatchEvent(n);
}
function Vr(o) {
  var e = o.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var xt = we.location, zs = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function _r(o) {
  var e = o.match(zs);
  return e !== null && (e[1] !== xt.protocol || e[2] !== xt.hostname || e[3] !== xt.port);
}
function kr(o) {
  var e = "timestamp=".concat(new Date().getTime());
  return o + (o.indexOf("?") === -1 ? "?" : "&") + e;
}
function Ze(o) {
  var e = o.rotate, t = o.scaleX, n = o.scaleY, a = o.translateX, i = o.translateY, l = [];
  K(a) && a !== 0 && l.push("translateX(".concat(a, "px)")), K(i) && i !== 0 && l.push("translateY(".concat(i, "px)")), K(e) && e !== 0 && l.push("rotate(".concat(e, "deg)")), K(t) && t !== 1 && l.push("scaleX(".concat(t, ")")), K(n) && n !== 1 && l.push("scaleY(".concat(n, ")"));
  var h = l.length ? l.join(" ") : "none";
  return {
    WebkitTransform: h,
    msTransform: h,
    transform: h
  };
}
function Bs(o) {
  var e = Cr({}, o), t = 0;
  return re(o, function(n, a) {
    delete e[a], re(e, function(i) {
      var l = Math.abs(n.startX - i.startX), h = Math.abs(n.startY - i.startY), m = Math.abs(n.endX - i.endX), g = Math.abs(n.endY - i.endY), f = Math.sqrt(l * l + h * h), v = Math.sqrt(m * m + g * g), b = (v - f) / f;
      Math.abs(b) > Math.abs(t) && (t = b);
    });
  }), t;
}
function lt(o, e) {
  var t = o.pageX, n = o.pageY, a = {
    endX: t,
    endY: n
  };
  return e ? a : Cr({
    startX: t,
    startY: n
  }, a);
}
function Rs(o) {
  var e = 0, t = 0, n = 0;
  return re(o, function(a) {
    var i = a.startX, l = a.startY;
    e += i, t += l, n += 1;
  }), e /= n, t /= n, {
    pageX: e,
    pageY: t
  };
}
function Me(o) {
  var e = o.aspectRatio, t = o.height, n = o.width, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", i = xr(n), l = xr(t);
  if (i && l) {
    var h = t * e;
    a === "contain" && h > n || a === "cover" && h < n ? t = n / e : n = t * e;
  } else
    i ? t = n / e : l && (n = t * e);
  return {
    width: n,
    height: t
  };
}
function Hs(o) {
  var e = o.width, t = o.height, n = o.degree;
  if (n = Math.abs(n) % 180, n === 90)
    return {
      width: t,
      height: e
    };
  var a = n % 90 * Math.PI / 180, i = Math.sin(a), l = Math.cos(a), h = e * l + t * i, m = e * i + t * l;
  return n > 90 ? {
    width: m,
    height: h
  } : {
    width: h,
    height: m
  };
}
function Us(o, e, t, n) {
  var a = e.aspectRatio, i = e.naturalWidth, l = e.naturalHeight, h = e.rotate, m = h === void 0 ? 0 : h, g = e.scaleX, f = g === void 0 ? 1 : g, v = e.scaleY, b = v === void 0 ? 1 : v, A = t.aspectRatio, M = t.naturalWidth, T = t.naturalHeight, I = n.fillColor, B = I === void 0 ? "transparent" : I, P = n.imageSmoothingEnabled, R = P === void 0 ? !0 : P, ee = n.imageSmoothingQuality, X = ee === void 0 ? "low" : ee, D = n.maxWidth, Y = D === void 0 ? 1 / 0 : D, F = n.maxHeight, le = F === void 0 ? 1 / 0 : F, j = n.minWidth, H = j === void 0 ? 0 : j, N = n.minHeight, J = N === void 0 ? 0 : N, V = document.createElement("canvas"), W = V.getContext("2d"), ae = Me({
    aspectRatio: A,
    width: Y,
    height: le
  }), Pe = Me({
    aspectRatio: A,
    width: H,
    height: J
  }, "cover"), Ye = Math.min(ae.width, Math.max(Pe.width, M)), We = Math.min(ae.height, Math.max(Pe.height, T)), tt = Me({
    aspectRatio: a,
    width: Y,
    height: le
  }), rt = Me({
    aspectRatio: a,
    width: H,
    height: J
  }, "cover"), it = Math.min(tt.width, Math.max(rt.width, i)), je = Math.min(tt.height, Math.max(rt.height, l)), pt = [-it / 2, -je / 2, it, je];
  return V.width = Re(Ye), V.height = Re(We), W.fillStyle = B, W.fillRect(0, 0, Ye, We), W.save(), W.translate(Ye / 2, We / 2), W.rotate(m * Math.PI / 180), W.scale(f, b), W.imageSmoothingEnabled = R, W.imageSmoothingQuality = X, W.drawImage.apply(W, [o].concat(Mr(pt.map(function(Ie) {
    return Math.floor(Re(Ie));
  })))), W.restore(), V;
}
var zr = String.fromCharCode;
function Ks(o, e, t) {
  var n = "";
  t += e;
  for (var a = e; a < t; a += 1)
    n += zr(o.getUint8(a));
  return n;
}
var Ys = /^data:.*,/;
function Ws(o) {
  var e = o.replace(Ys, ""), t = atob(e), n = new ArrayBuffer(t.length), a = new Uint8Array(n);
  return re(a, function(i, l) {
    a[l] = t.charCodeAt(l);
  }), n;
}
function Xs(o, e) {
  for (var t = [], n = 8192, a = new Uint8Array(o); a.length > 0; )
    t.push(zr.apply(null, Ir(a.subarray(0, n)))), a = a.subarray(n);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function Fs(o) {
  var e = new DataView(o), t;
  try {
    var n, a, i;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var l = e.byteLength, h = 2; h + 1 < l; ) {
        if (e.getUint8(h) === 255 && e.getUint8(h + 1) === 225) {
          a = h;
          break;
        }
        h += 1;
      }
    if (a) {
      var m = a + 4, g = a + 10;
      if (Ks(e, m, 4) === "Exif") {
        var f = e.getUint16(g);
        if (n = f === 18761, (n || f === 19789) && e.getUint16(g + 2, n) === 42) {
          var v = e.getUint32(g + 4, n);
          v >= 8 && (i = g + v);
        }
      }
    }
    if (i) {
      var b = e.getUint16(i, n), A, M;
      for (M = 0; M < b; M += 1)
        if (A = i + M * 12 + 2, e.getUint16(A, n) === 274) {
          A += 8, t = e.getUint16(A, n), e.setUint16(A, 1, n);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function qs(o) {
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
var Gs = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, n = this.container, a = this.cropper, i = Number(t.minContainerWidth), l = Number(t.minContainerHeight);
    ie(a, ue), be(e, ue);
    var h = {
      width: Math.max(n.offsetWidth, i >= 0 ? i : Pr),
      height: Math.max(n.offsetHeight, l >= 0 ? l : jr)
    };
    this.containerData = h, Ce(a, {
      width: h.width,
      height: h.height
    }), ie(e, ue), be(a, ue);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, n = this.options.viewMode, a = Math.abs(t.rotate) % 180 === 90, i = a ? t.naturalHeight : t.naturalWidth, l = a ? t.naturalWidth : t.naturalHeight, h = i / l, m = e.width, g = e.height;
    e.height * h > e.width ? n === 3 ? m = e.height * h : g = e.width / h : n === 3 ? g = e.width / h : m = e.height * h;
    var f = {
      aspectRatio: h,
      naturalWidth: i,
      naturalHeight: l,
      width: m,
      height: g
    };
    this.canvasData = f, this.limited = n === 1 || n === 2, this.limitCanvas(!0, !0), f.width = Math.min(Math.max(f.width, f.minWidth), f.maxWidth), f.height = Math.min(Math.max(f.height, f.minHeight), f.maxHeight), f.left = (e.width - f.width) / 2, f.top = (e.height - f.height) / 2, f.oldLeft = f.left, f.oldTop = f.top, this.initialCanvasData = G({}, f);
  },
  limitCanvas: function(e, t) {
    var n = this.options, a = this.containerData, i = this.canvasData, l = this.cropBoxData, h = n.viewMode, m = i.aspectRatio, g = this.cropped && l;
    if (e) {
      var f = Number(n.minCanvasWidth) || 0, v = Number(n.minCanvasHeight) || 0;
      h > 1 ? (f = Math.max(f, a.width), v = Math.max(v, a.height), h === 3 && (v * m > f ? f = v * m : v = f / m)) : h > 0 && (f ? f = Math.max(f, g ? l.width : 0) : v ? v = Math.max(v, g ? l.height : 0) : g && (f = l.width, v = l.height, v * m > f ? f = v * m : v = f / m));
      var b = Me({
        aspectRatio: m,
        width: f,
        height: v
      });
      f = b.width, v = b.height, i.minWidth = f, i.minHeight = v, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
    }
    if (t)
      if (h > (g ? 0 : 1)) {
        var A = a.width - i.width, M = a.height - i.height;
        i.minLeft = Math.min(0, A), i.minTop = Math.min(0, M), i.maxLeft = Math.max(0, A), i.maxTop = Math.max(0, M), g && this.limited && (i.minLeft = Math.min(l.left, l.left + (l.width - i.width)), i.minTop = Math.min(l.top, l.top + (l.height - i.height)), i.maxLeft = l.left, i.maxTop = l.top, h === 2 && (i.width >= a.width && (i.minLeft = Math.min(0, A), i.maxLeft = Math.max(0, A)), i.height >= a.height && (i.minTop = Math.min(0, M), i.maxTop = Math.max(0, M))));
      } else
        i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = a.width, i.maxTop = a.height;
  },
  renderCanvas: function(e, t) {
    var n = this.canvasData, a = this.imageData;
    if (t) {
      var i = Hs({
        width: a.naturalWidth * Math.abs(a.scaleX || 1),
        height: a.naturalHeight * Math.abs(a.scaleY || 1),
        degree: a.rotate || 0
      }), l = i.width, h = i.height, m = n.width * (l / n.naturalWidth), g = n.height * (h / n.naturalHeight);
      n.left -= (m - n.width) / 2, n.top -= (g - n.height) / 2, n.width = m, n.height = g, n.aspectRatio = l / h, n.naturalWidth = l, n.naturalHeight = h, this.limitCanvas(!0, !1);
    }
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCanvas(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, Ce(this.canvas, G({
      width: n.width,
      height: n.height
    }, Ze({
      translateX: n.left,
      translateY: n.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var t = this.canvasData, n = this.imageData, a = n.naturalWidth * (t.width / t.naturalWidth), i = n.naturalHeight * (t.height / t.naturalHeight);
    G(n, {
      width: a,
      height: i,
      left: (t.width - a) / 2,
      top: (t.height - i) / 2
    }), Ce(this.image, G({
      width: n.width,
      height: n.height
    }, Ze(G({
      translateX: n.left,
      translateY: n.top
    }, n)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, n = e.aspectRatio || e.initialAspectRatio, a = Number(e.autoCropArea) || 0.8, i = {
      width: t.width,
      height: t.height
    };
    n && (t.height * n > t.width ? i.height = i.width / n : i.width = i.height * n), this.cropBoxData = i, this.limitCropBox(!0, !0), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), i.width = Math.max(i.minWidth, i.width * a), i.height = Math.max(i.minHeight, i.height * a), i.left = t.left + (t.width - i.width) / 2, i.top = t.top + (t.height - i.height) / 2, i.oldLeft = i.left, i.oldTop = i.top, this.initialCropBoxData = G({}, i);
  },
  limitCropBox: function(e, t) {
    var n = this.options, a = this.containerData, i = this.canvasData, l = this.cropBoxData, h = this.limited, m = n.aspectRatio;
    if (e) {
      var g = Number(n.minCropBoxWidth) || 0, f = Number(n.minCropBoxHeight) || 0, v = h ? Math.min(a.width, i.width, i.width + i.left, a.width - i.left) : a.width, b = h ? Math.min(a.height, i.height, i.height + i.top, a.height - i.top) : a.height;
      g = Math.min(g, a.width), f = Math.min(f, a.height), m && (g && f ? f * m > g ? f = g / m : g = f * m : g ? f = g / m : f && (g = f * m), b * m > v ? b = v / m : v = b * m), l.minWidth = Math.min(g, v), l.minHeight = Math.min(f, b), l.maxWidth = v, l.maxHeight = b;
    }
    t && (h ? (l.minLeft = Math.max(0, i.left), l.minTop = Math.max(0, i.top), l.maxLeft = Math.min(a.width, i.left + i.width) - l.width, l.maxTop = Math.min(a.height, i.top + i.height) - l.height) : (l.minLeft = 0, l.minTop = 0, l.maxLeft = a.width - l.width, l.maxTop = a.height - l.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, n = this.cropBoxData;
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCropBox(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, e.movable && e.cropBoxMovable && et(this.face, Qe, n.width >= t.width && n.height >= t.height ? Er : Nt), Ce(this.cropBox, G({
      width: n.width,
      height: n.height
    }, Ze({
      translateX: n.left,
      translateY: n.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), He(this.element, Mt, this.getData());
  }
}, Js = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, n = this.options.preview, a = t ? this.crossOriginUrl : this.url, i = e.alt || "The image to preview", l = document.createElement("img");
    if (t && (l.crossOrigin = t), l.src = a, l.alt = i, this.viewBox.appendChild(l), this.viewBoxImage = l, !!n) {
      var h = n;
      typeof n == "string" ? h = e.ownerDocument.querySelectorAll(n) : n.querySelector && (h = [n]), this.previews = h, re(h, function(m) {
        var g = document.createElement("img");
        et(m, st, {
          width: m.offsetWidth,
          height: m.offsetHeight,
          html: m.innerHTML
        }), t && (g.crossOrigin = t), g.src = a, g.alt = i, g.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', m.innerHTML = "", m.appendChild(g);
      });
    }
  },
  resetPreview: function() {
    re(this.previews, function(e) {
      var t = Ot(e, st);
      Ce(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, Vs(e, st);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, n = this.cropBoxData, a = n.width, i = n.height, l = e.width, h = e.height, m = n.left - t.left - e.left, g = n.top - t.top - e.top;
    !this.cropped || this.disabled || (Ce(this.viewBoxImage, G({
      width: l,
      height: h
    }, Ze(G({
      translateX: -m,
      translateY: -g
    }, e)))), re(this.previews, function(f) {
      var v = Ot(f, st), b = v.width, A = v.height, M = b, T = A, I = 1;
      a && (I = b / a, T = i * I), i && T > A && (I = A / i, M = a * I, T = A), Ce(f, {
        width: M,
        height: T
      }), Ce(f.getElementsByTagName("img")[0], G({
        width: l * I,
        height: h * I
      }, Ze(G({
        translateX: -m * I,
        translateY: -g * I
      }, e))));
    }));
  }
}, Zs = {
  bind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    ce(t.cropstart) && he(e, Tt, t.cropstart), ce(t.cropmove) && he(e, Et, t.cropmove), ce(t.cropend) && he(e, $t, t.cropend), ce(t.crop) && he(e, Mt, t.crop), ce(t.zoom) && he(e, At, t.zoom), he(n, fr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && he(n, br, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && he(n, hr, this.onDblclick = this.dblclick.bind(this)), he(e.ownerDocument, mr, this.onCropMove = this.cropMove.bind(this)), he(e.ownerDocument, pr, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && he(window, vr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    ce(t.cropstart) && ge(e, Tt, t.cropstart), ce(t.cropmove) && ge(e, Et, t.cropmove), ce(t.cropend) && ge(e, $t, t.cropend), ce(t.crop) && ge(e, Mt, t.crop), ce(t.zoom) && ge(e, At, t.zoom), ge(n, fr, this.onCropStart), t.zoomable && t.zoomOnWheel && ge(n, br, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ge(n, hr, this.onDblclick), ge(e.ownerDocument, mr, this.onCropMove), ge(e.ownerDocument, pr, this.onCropEnd), t.responsive && ge(window, vr, this.onResize);
  }
}, Qs = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, n = this.containerData, a = t.offsetWidth / n.width, i = t.offsetHeight / n.height, l = Math.abs(a - 1) > Math.abs(i - 1) ? a : i;
      if (l !== 1) {
        var h, m;
        e.restore && (h = this.getCanvasData(), m = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(re(h, function(g, f) {
          h[f] = g * l;
        })), this.setCropBoxData(re(m, function(g, f) {
          m[f] = g * l;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Or || this.setDragMode(Ns(this.dragBox, Dt) ? Ar : Lt);
  },
  wheel: function(e) {
    var t = this, n = Number(this.options.wheelZoomRatio) || 0.1, a = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      t.wheeling = !1;
    }, 50), e.deltaY ? a = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? a = -e.wheelDelta / 120 : e.detail && (a = e.detail > 0 ? 1 : -1), this.zoom(-a * n, e)));
  },
  cropStart: function(e) {
    var t = e.buttons, n = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (K(t) && t !== 1 || K(n) && n !== 0 || e.ctrlKey))) {
      var a = this.options, i = this.pointers, l;
      e.changedTouches ? re(e.changedTouches, function(h) {
        i[h.identifier] = lt(h);
      }) : i[e.pointerId || 0] = lt(e), Object.keys(i).length > 1 && a.zoomable && a.zoomOnTouch ? l = Tr : l = Ot(e.target, Qe), !!Cs.test(l) && He(this.element, Tt, {
        originalEvent: e,
        action: l
      }) !== !1 && (e.preventDefault(), this.action = l, this.cropping = !1, l === $r && (this.cropping = !0, ie(this.dragBox, ht)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var n = this.pointers;
      e.preventDefault(), He(this.element, Et, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? re(e.changedTouches, function(a) {
        G(n[a.identifier] || {}, lt(a, !0));
      }) : G(n[e.pointerId || 0] || {}, lt(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, n = this.pointers;
      e.changedTouches ? re(e.changedTouches, function(a) {
        delete n[a.identifier];
      }) : delete n[e.pointerId || 0], t && (e.preventDefault(), Object.keys(n).length || (this.action = ""), this.cropping && (this.cropping = !1, Be(this.dragBox, ht, this.cropped && this.options.modal)), He(this.element, $t, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, el = {
  change: function(e) {
    var t = this.options, n = this.canvasData, a = this.containerData, i = this.cropBoxData, l = this.pointers, h = this.action, m = t.aspectRatio, g = i.left, f = i.top, v = i.width, b = i.height, A = g + v, M = f + b, T = 0, I = 0, B = a.width, P = a.height, R = !0, ee;
    !m && e.shiftKey && (m = v && b ? v / b : 1), this.limited && (T = i.minLeft, I = i.minTop, B = T + Math.min(a.width, n.width, n.left + n.width), P = I + Math.min(a.height, n.height, n.top + n.height));
    var X = l[Object.keys(l)[0]], D = {
      x: X.endX - X.startX,
      y: X.endY - X.startY
    }, Y = function(le) {
      switch (le) {
        case $e:
          A + D.x > B && (D.x = B - A);
          break;
        case Ee:
          g + D.x < T && (D.x = T - g);
          break;
        case Se:
          f + D.y < I && (D.y = I - f);
          break;
        case Ve:
          M + D.y > P && (D.y = P - M);
          break;
      }
    };
    switch (h) {
      case Nt:
        g += D.x, f += D.y;
        break;
      case $e:
        if (D.x >= 0 && (A >= B || m && (f <= I || M >= P))) {
          R = !1;
          break;
        }
        Y($e), v += D.x, v < 0 && (h = Ee, v = -v, g -= v), m && (b = v / m, f += (i.height - b) / 2);
        break;
      case Se:
        if (D.y <= 0 && (f <= I || m && (g <= T || A >= B))) {
          R = !1;
          break;
        }
        Y(Se), b -= D.y, f += D.y, b < 0 && (h = Ve, b = -b, f -= b), m && (v = b * m, g += (i.width - v) / 2);
        break;
      case Ee:
        if (D.x <= 0 && (g <= T || m && (f <= I || M >= P))) {
          R = !1;
          break;
        }
        Y(Ee), v -= D.x, g += D.x, v < 0 && (h = $e, v = -v, g -= v), m && (b = v / m, f += (i.height - b) / 2);
        break;
      case Ve:
        if (D.y >= 0 && (M >= P || m && (g <= T || A >= B))) {
          R = !1;
          break;
        }
        Y(Ve), b += D.y, b < 0 && (h = Se, b = -b, f -= b), m && (v = b * m, g += (i.width - v) / 2);
        break;
      case Fe:
        if (m) {
          if (D.y <= 0 && (f <= I || A >= B)) {
            R = !1;
            break;
          }
          Y(Se), b -= D.y, f += D.y, v = b * m;
        } else
          Y(Se), Y($e), D.x >= 0 ? A < B ? v += D.x : D.y <= 0 && f <= I && (R = !1) : v += D.x, D.y <= 0 ? f > I && (b -= D.y, f += D.y) : (b -= D.y, f += D.y);
        v < 0 && b < 0 ? (h = Je, b = -b, v = -v, f -= b, g -= v) : v < 0 ? (h = qe, v = -v, g -= v) : b < 0 && (h = Ge, b = -b, f -= b);
        break;
      case qe:
        if (m) {
          if (D.y <= 0 && (f <= I || g <= T)) {
            R = !1;
            break;
          }
          Y(Se), b -= D.y, f += D.y, v = b * m, g += i.width - v;
        } else
          Y(Se), Y(Ee), D.x <= 0 ? g > T ? (v -= D.x, g += D.x) : D.y <= 0 && f <= I && (R = !1) : (v -= D.x, g += D.x), D.y <= 0 ? f > I && (b -= D.y, f += D.y) : (b -= D.y, f += D.y);
        v < 0 && b < 0 ? (h = Ge, b = -b, v = -v, f -= b, g -= v) : v < 0 ? (h = Fe, v = -v, g -= v) : b < 0 && (h = Je, b = -b, f -= b);
        break;
      case Je:
        if (m) {
          if (D.x <= 0 && (g <= T || M >= P)) {
            R = !1;
            break;
          }
          Y(Ee), v -= D.x, g += D.x, b = v / m;
        } else
          Y(Ve), Y(Ee), D.x <= 0 ? g > T ? (v -= D.x, g += D.x) : D.y >= 0 && M >= P && (R = !1) : (v -= D.x, g += D.x), D.y >= 0 ? M < P && (b += D.y) : b += D.y;
        v < 0 && b < 0 ? (h = Fe, b = -b, v = -v, f -= b, g -= v) : v < 0 ? (h = Ge, v = -v, g -= v) : b < 0 && (h = qe, b = -b, f -= b);
        break;
      case Ge:
        if (m) {
          if (D.x >= 0 && (A >= B || M >= P)) {
            R = !1;
            break;
          }
          Y($e), v += D.x, b = v / m;
        } else
          Y(Ve), Y($e), D.x >= 0 ? A < B ? v += D.x : D.y >= 0 && M >= P && (R = !1) : v += D.x, D.y >= 0 ? M < P && (b += D.y) : b += D.y;
        v < 0 && b < 0 ? (h = qe, b = -b, v = -v, f -= b, g -= v) : v < 0 ? (h = Je, v = -v, g -= v) : b < 0 && (h = Fe, b = -b, f -= b);
        break;
      case Er:
        this.move(D.x, D.y), R = !1;
        break;
      case Tr:
        this.zoom(Bs(l), e), R = !1;
        break;
      case $r:
        if (!D.x || !D.y) {
          R = !1;
          break;
        }
        ee = Vr(this.cropper), g = X.startX - ee.left, f = X.startY - ee.top, v = i.minWidth, b = i.minHeight, D.x > 0 ? h = D.y > 0 ? Ge : Fe : D.x < 0 && (g -= v, h = D.y > 0 ? Je : qe), D.y < 0 && (f -= b), this.cropped || (be(this.cropBox, ue), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    R && (i.width = v, i.height = b, i.left = g, i.top = f, this.action = h, this.renderCropBox()), re(l, function(F) {
      F.startX = F.endX, F.startY = F.endY;
    });
  }
}, tl = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && ie(this.dragBox, ht), be(this.cropBox, ue), this.setCropBoxData(this.initialCropBoxData)), this;
  },
  reset: function() {
    return this.ready && !this.disabled && (this.imageData = G({}, this.initialImageData), this.canvasData = G({}, this.initialCanvasData), this.cropBoxData = G({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this;
  },
  clear: function() {
    return this.cropped && !this.disabled && (G(this.cropBoxData, {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), be(this.dragBox, ht), ie(this.cropBox, ue)), this;
  },
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, re(this.previews, function(n) {
      n.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, be(this.cropper, ur)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, ie(this.cropper, ur)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[q] ? (e[q] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, a = n.left, i = n.top;
    return this.moveTo(wt(e) ? e : a + Number(e), wt(t) ? t : i + Number(t));
  },
  moveTo: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, a = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (K(e) && (n.left = e, a = !0), K(t) && (n.top = t, a = !0), a && this.renderCanvas(!0)), this;
  },
  zoom: function(e, t) {
    var n = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(n.width * e / n.naturalWidth, null, t);
  },
  zoomTo: function(e, t, n) {
    var a = this.options, i = this.canvasData, l = i.width, h = i.height, m = i.naturalWidth, g = i.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && a.zoomable) {
      var f = m * e, v = g * e;
      if (He(this.element, At, {
        ratio: e,
        oldRatio: l / m,
        originalEvent: n
      }) === !1)
        return this;
      if (n) {
        var b = this.pointers, A = Vr(this.cropper), M = b && Object.keys(b).length ? Rs(b) : {
          pageX: n.pageX,
          pageY: n.pageY
        };
        i.left -= (f - l) * ((M.pageX - A.left - i.left) / l), i.top -= (v - h) * ((M.pageY - A.top - i.top) / h);
      } else
        ze(t) && K(t.x) && K(t.y) ? (i.left -= (f - l) * ((t.x - i.left) / l), i.top -= (v - h) * ((t.y - i.top) / h)) : (i.left -= (f - l) / 2, i.top -= (v - h) / 2);
      i.width = f, i.height = v, this.renderCanvas(!0);
    }
    return this;
  },
  rotate: function(e) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(e));
  },
  rotateTo: function(e) {
    return e = Number(e), K(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
  },
  scaleX: function(e) {
    var t = this.imageData.scaleY;
    return this.scale(e, K(t) ? t : 1);
  },
  scaleY: function(e) {
    var t = this.imageData.scaleX;
    return this.scale(K(t) ? t : 1, e);
  },
  scale: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.imageData, a = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (K(e) && (n.scaleX = e, a = !0), K(t) && (n.scaleY = t, a = !0), a && this.renderCanvas(!0, !0)), this;
  },
  getData: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, t = this.options, n = this.imageData, a = this.canvasData, i = this.cropBoxData, l;
    if (this.ready && this.cropped) {
      l = {
        x: i.left - a.left,
        y: i.top - a.top,
        width: i.width,
        height: i.height
      };
      var h = n.width / n.naturalWidth;
      if (re(l, function(f, v) {
        l[v] = f / h;
      }), e) {
        var m = Math.round(l.y + l.height), g = Math.round(l.x + l.width);
        l.x = Math.round(l.x), l.y = Math.round(l.y), l.width = g - l.x, l.height = m - l.y;
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
    var t = this.options, n = this.imageData, a = this.canvasData, i = {};
    if (this.ready && !this.disabled && ze(e)) {
      var l = !1;
      t.rotatable && K(e.rotate) && e.rotate !== n.rotate && (n.rotate = e.rotate, l = !0), t.scalable && (K(e.scaleX) && e.scaleX !== n.scaleX && (n.scaleX = e.scaleX, l = !0), K(e.scaleY) && e.scaleY !== n.scaleY && (n.scaleY = e.scaleY, l = !0)), l && this.renderCanvas(!0, !0);
      var h = n.width / n.naturalWidth;
      K(e.x) && (i.left = e.x * h + a.left), K(e.y) && (i.top = e.y * h + a.top), K(e.width) && (i.width = e.width * h), K(e.height) && (i.height = e.height * h), this.setCropBoxData(i);
    }
    return this;
  },
  getContainerData: function() {
    return this.ready ? G({}, this.containerData) : {};
  },
  getImageData: function() {
    return this.sized ? G({}, this.imageData) : {};
  },
  getCanvasData: function() {
    var e = this.canvasData, t = {};
    return this.ready && re(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(n) {
      t[n] = e[n];
    }), t;
  },
  setCanvasData: function(e) {
    var t = this.canvasData, n = t.aspectRatio;
    return this.ready && !this.disabled && ze(e) && (K(e.left) && (t.left = e.left), K(e.top) && (t.top = e.top), K(e.width) ? (t.width = e.width, t.height = e.width / n) : K(e.height) && (t.height = e.height, t.width = e.height * n), this.renderCanvas(!0)), this;
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
    var t = this.cropBoxData, n = this.options.aspectRatio, a, i;
    return this.ready && this.cropped && !this.disabled && ze(e) && (K(e.left) && (t.left = e.left), K(e.top) && (t.top = e.top), K(e.width) && e.width !== t.width && (a = !0, t.width = e.width), K(e.height) && e.height !== t.height && (i = !0, t.height = e.height), n && (a ? t.height = t.width / n : i && (t.width = t.height * n)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, n = Us(this.image, this.imageData, t, e);
    if (!this.cropped)
      return n;
    var a = this.getData(), i = a.x, l = a.y, h = a.width, m = a.height, g = n.width / Math.floor(t.naturalWidth);
    g !== 1 && (i *= g, l *= g, h *= g, m *= g);
    var f = h / m, v = Me({
      aspectRatio: f,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Me({
      aspectRatio: f,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), A = Me({
      aspectRatio: f,
      width: e.width || (g !== 1 ? n.width : h),
      height: e.height || (g !== 1 ? n.height : m)
    }), M = A.width, T = A.height;
    M = Math.min(v.width, Math.max(b.width, M)), T = Math.min(v.height, Math.max(b.height, T));
    var I = document.createElement("canvas"), B = I.getContext("2d");
    I.width = Re(M), I.height = Re(T), B.fillStyle = e.fillColor || "transparent", B.fillRect(0, 0, M, T);
    var P = e.imageSmoothingEnabled, R = P === void 0 ? !0 : P, ee = e.imageSmoothingQuality;
    B.imageSmoothingEnabled = R, ee && (B.imageSmoothingQuality = ee);
    var X = n.width, D = n.height, Y = i, F = l, le, j, H, N, J, V;
    Y <= -h || Y > X ? (Y = 0, le = 0, H = 0, J = 0) : Y <= 0 ? (H = -Y, Y = 0, le = Math.min(X, h + Y), J = le) : Y <= X && (H = 0, le = Math.min(h, X - Y), J = le), le <= 0 || F <= -m || F > D ? (F = 0, j = 0, N = 0, V = 0) : F <= 0 ? (N = -F, F = 0, j = Math.min(D, m + F), V = j) : F <= D && (N = 0, j = Math.min(m, D - F), V = j);
    var W = [Y, F, le, j];
    if (J > 0 && V > 0) {
      var ae = M / h;
      W.push(H * ae, N * ae, J * ae, V * ae);
    }
    return B.drawImage.apply(B, [n].concat(Mr(W.map(function(Pe) {
      return Math.floor(Re(Pe));
    })))), I;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !wt(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, n = this.dragBox, a = this.face;
    if (this.ready && !this.disabled) {
      var i = e === Lt, l = t.movable && e === Ar;
      e = i || l ? e : Or, t.dragMode = e, et(n, Qe, e), Be(n, Dt, i), Be(n, Ct, l), t.cropBoxMovable || (et(a, Qe, e), Be(a, Dt, i), Be(a, Ct, l));
    }
    return this;
  }
}, rl = we.Cropper, Br = /* @__PURE__ */ function() {
  function o(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (ps(this, o), !e || !Es.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = G({}, wr, ze(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return gs(o, [{
    key: "init",
    value: function() {
      var t = this.element, n = t.tagName.toLowerCase(), a;
      if (!t[q]) {
        if (t[q] = this, n === "img") {
          if (this.isImg = !0, a = t.getAttribute("src") || "", this.originalUrl = a, !a)
            return;
          a = t.src;
        } else
          n === "canvas" && window.HTMLCanvasElement && (a = t.toDataURL());
        this.load(a);
      }
    }
  }, {
    key: "load",
    value: function(t) {
      var n = this;
      if (!!t) {
        this.url = t, this.imageData = {};
        var a = this.element, i = this.options;
        if (!i.rotatable && !i.scalable && (i.checkOrientation = !1), !i.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (Ms.test(t)) {
          $s.test(t) ? this.read(Ws(t)) : this.clone();
          return;
        }
        var l = new XMLHttpRequest(), h = this.clone.bind(this);
        this.reloading = !0, this.xhr = l, l.onabort = h, l.onerror = h, l.ontimeout = h, l.onprogress = function() {
          l.getResponseHeader("content-type") !== yr && l.abort();
        }, l.onload = function() {
          n.read(l.response);
        }, l.onloadend = function() {
          n.reloading = !1, n.xhr = null;
        }, i.checkCrossOrigin && _r(t) && a.crossOrigin && (t = kr(t)), l.open("GET", t, !0), l.responseType = "arraybuffer", l.withCredentials = a.crossOrigin === "use-credentials", l.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var n = this.options, a = this.imageData, i = Fs(t), l = 0, h = 1, m = 1;
      if (i > 1) {
        this.url = Xs(t, yr);
        var g = qs(i);
        l = g.rotate, h = g.scaleX, m = g.scaleY;
      }
      n.rotatable && (a.rotate = l), n.scalable && (a.scaleX = h, a.scaleY = m), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, n = this.url, a = t.crossOrigin, i = n;
      this.options.checkCrossOrigin && _r(n) && (a || (a = "anonymous"), i = kr(n)), this.crossOrigin = a, this.crossOriginUrl = i;
      var l = document.createElement("img");
      a && (l.crossOrigin = a), l.src = i || n, l.alt = t.alt || "The image to crop", this.image = l, l.onload = this.start.bind(this), l.onerror = this.stop.bind(this), ie(l, dr), t.parentNode.insertBefore(l, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, n = this.image;
      n.onload = null, n.onerror = null, this.sizing = !0;
      var a = we.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(we.navigator.userAgent), i = function(g, f) {
        G(t.imageData, {
          naturalWidth: g,
          naturalHeight: f,
          aspectRatio: g / f
        }), t.initialImageData = G({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (n.naturalWidth && !a) {
        i(n.naturalWidth, n.naturalHeight);
        return;
      }
      var l = document.createElement("img"), h = document.body || document.documentElement;
      this.sizingImage = l, l.onload = function() {
        i(l.width, l.height), a || h.removeChild(l);
      }, l.src = n.src, a || (l.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", h.appendChild(l));
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
        var t = this.element, n = this.options, a = this.image, i = t.parentNode, l = document.createElement("div");
        l.innerHTML = Ts;
        var h = l.querySelector(".".concat(q, "-container")), m = h.querySelector(".".concat(q, "-canvas")), g = h.querySelector(".".concat(q, "-drag-box")), f = h.querySelector(".".concat(q, "-crop-box")), v = f.querySelector(".".concat(q, "-face"));
        this.container = i, this.cropper = h, this.canvas = m, this.dragBox = g, this.cropBox = f, this.viewBox = h.querySelector(".".concat(q, "-view-box")), this.face = v, m.appendChild(a), ie(t, ue), i.insertBefore(h, t.nextSibling), this.isImg || be(a, dr), this.initPreview(), this.bind(), n.initialAspectRatio = Math.max(0, n.initialAspectRatio) || NaN, n.aspectRatio = Math.max(0, n.aspectRatio) || NaN, n.viewMode = Math.max(0, Math.min(3, Math.round(n.viewMode))) || 0, ie(f, ue), n.guides || ie(f.getElementsByClassName("".concat(q, "-dashed")), ue), n.center || ie(f.getElementsByClassName("".concat(q, "-center")), ue), n.background && ie(h, "".concat(q, "-bg")), n.highlight || ie(v, _s), n.cropBoxMovable && (ie(v, Ct), et(v, Qe, Nt)), n.cropBoxResizable || (ie(f.getElementsByClassName("".concat(q, "-line")), ue), ie(f.getElementsByClassName("".concat(q, "-point")), ue)), this.render(), this.ready = !0, this.setDragMode(n.dragMode), n.autoCrop && this.crop(), this.setData(n.data), ce(n.ready) && he(t, gr, n.ready, {
          once: !0
        }), He(t, gr);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      !this.ready || (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), be(this.element, ue));
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = rl, o;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      G(wr, ze(t) && t);
    }
  }]), o;
}();
G(Br.prototype, Gs, Js, Zs, Qs, el, tl);
const il = { class: "flex" }, nl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ol = { class: "ml-auto mb-2" }, al = { class: "w-full flex justify-center" }, sl = ["src"], ll = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), { t: a } = inject("i18n"), i = () => n.value + "?" + Oe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path }), l = z(null), h = z(null), m = z(!1), g = () => {
      m.value = !m.value, m.value ? h.value = new Br(l.value, {
        crop(v) {
        }
      }) : h.value.destroy();
    }, f = () => {
      h.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (v) => {
          dt(n.value, {
            method: "POST",
            params: { q: "upload", adapter: t.selection.adapter, path: t.selection.item.path, file: v },
            name: t.selection.item.basename,
            json: !1
          }).then((b) => {
            l.value.src = i(), g(), e("load");
          }).catch((b) => console.log(b.statusText));
        }
      );
    };
    return onMounted(() => {
      e("load");
    }), (v, b) => (x(), C(oe, null, [
      d("div", il, [
        d("h3", nl, E(o.selection.item.basename), 1),
        d("div", ol, [
          m.value ? (x(), C("button", {
            key: 0,
            onClick: f,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, E(k(a)("Crop")), 1)) : ne("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: b[0] || (b[0] = (A) => g())
          }, E(m.value ? k(a)("Cancel") : k(a)("Edit")), 1)
        ])
      ]),
      d("div", al, [
        d("img", {
          ref_key: "image",
          ref: l,
          class: "max-w-[60vh] max-h-[60vh]",
          src: i(),
          alt: ""
        }, null, 8, sl)
      ])
    ], 64));
  }
}, cl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ul = /* @__PURE__ */ d("div", null, " Default view.. ", -1), dl = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    return ye(() => {
      e("load");
    }), (t, n) => (x(), C(oe, null, [
      d("h3", cl, E(o.selection.item.basename), 1),
      ul
    ], 64));
  }
}, hl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, fl = {
  class: "w-full",
  preload: "",
  controls: ""
}, ml = ["src"], pl = /* @__PURE__ */ De(" Your browser does not support the video tag. "), gl = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), a = () => n.value + "?" + Oe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return ye(() => {
      e("load");
    }), (i, l) => (x(), C(oe, null, [
      d("h3", hl, E(o.selection.item.basename), 1),
      d("div", null, [
        d("video", fl, [
          d("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, ml),
          pl
        ])
      ])
    ], 64));
  }
}, vl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, bl = {
  class: "w-full",
  controls: ""
}, yl = ["src"], wl = /* @__PURE__ */ De(" Your browser does not support the audio element. "), xl = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), a = () => n.value + "?" + Oe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return ye(() => {
      e("load");
    }), (i, l) => (x(), C(oe, null, [
      d("h3", vl, E(o.selection.item.basename), 1),
      d("div", null, [
        d("audio", bl, [
          d("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, yl),
          wl
        ])
      ])
    ], 64));
  }
}, _l = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, kl = ["data"], Sl = ["src"], Dl = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), a = () => n.value + "?" + Oe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return ye(() => {
      e("load");
    }), (i, l) => (x(), C(oe, null, [
      d("h3", _l, E(o.selection.item.basename), 1),
      d("div", null, [
        d("object", {
          class: "h-[60vh]",
          data: a(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          d("iframe", {
            class: "border-0",
            src: a(),
            width: "100%",
            height: "100%"
          }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        `, 8, Sl)
        ], 8, kl)
      ])
    ], 64));
  }
}, Cl = { class: "sm:flex sm:items-start" }, Ml = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, $l = { class: "text-gray-700 dark:text-gray-200 text-sm" }, El = {
  key: 0,
  class: "flex leading-5"
}, Tl = /* @__PURE__ */ d("svg", {
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
], -1), Al = {
  name: "VFModalPreview"
}, Ol = /* @__PURE__ */ Object.assign(Al, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = o, { apiUrl: t } = _e(), n = inject("emitter"), { t: a } = inject("i18n"), i = z(!1), l = (g) => i.value = g, h = (g) => {
      var f;
      return ((f = e.selection.item.mime_type) != null ? f : "").startsWith(g);
    }, m = () => {
      const g = t.value + "?" + Oe({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      n.emit("vf-download", g);
    };
    return (g, f) => (x(), se(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: f[6] || (f[6] = (v) => k(n).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(a)("Close")), 1),
        d("button", {
          type: "button",
          onClick: f[7] || (f[7] = (v) => m()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(a)("Download")), 1)
      ]),
      default: Q(() => [
        d("div", Cl, [
          d("div", Ml, [
            d("div", null, [
              h("text") ? (x(), se(ms, {
                key: 0,
                selection: o.selection,
                onLoad: f[0] || (f[0] = (v) => l(!0))
              }, null, 8, ["selection"])) : h("image") ? (x(), se(ll, {
                key: 1,
                selection: o.selection,
                onLoad: f[1] || (f[1] = (v) => l(!0))
              }, null, 8, ["selection"])) : h("video") ? (x(), se(gl, {
                key: 2,
                selection: o.selection,
                onLoad: f[2] || (f[2] = (v) => l(!0))
              }, null, 8, ["selection"])) : h("audio") ? (x(), se(xl, {
                key: 3,
                selection: o.selection,
                onLoad: f[3] || (f[3] = (v) => l(!0))
              }, null, 8, ["selection"])) : h("application/pdf") ? (x(), se(Dl, {
                key: 4,
                selection: o.selection,
                onLoad: f[4] || (f[4] = (v) => l(!0))
              }, null, 8, ["selection"])) : (x(), se(dl, {
                key: 5,
                selection: o.selection,
                onLoad: f[5] || (f[5] = (v) => l(!0))
              }, null, 8, ["selection"]))
            ]),
            d("div", $l, [
              d("p", null, E(o.selection.item.path), 1),
              d("p", null, "mime_type: " + E(o.selection.item.mime_type), 1),
              i.value == !1 ? (x(), C("div", El, [
                Tl,
                d("span", null, E(k(a)("Loading")), 1)
              ])) : ne("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Pl = { class: "sm:flex sm:items-start" }, jl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Il = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Nl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ll = { class: "mt-2" }, Vl = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, zl = {
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
}, Ul = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Kl = [
  Ul
], Yl = { class: "ml-1.5" }, Wl = ["onKeyup"], Xl = {
  name: "VFModalRename"
}, Fl = /* @__PURE__ */ Object.assign(Xl, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), { t: a } = inject("i18n"), i = z(e.selection.items[0]), l = z(e.selection.items[0].basename), h = () => {
      l.value != "" && t.emit("vf-fetch", {
        q: "rename",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: i.value.path,
        name: l.value
      });
    };
    return (m, g) => (x(), se(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: h,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(a)("Rename")), 1),
        d("button", {
          type: "button",
          onClick: g[1] || (g[1] = (f) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(a)("Cancel")), 1)
      ]),
      default: Q(() => [
        d("div", Pl, [
          jl,
          d("div", Il, [
            d("h3", Nl, E(k(a)("Rename")), 1),
            d("div", Ll, [
              d("p", Vl, [
                i.value.type == "dir" ? (x(), C("svg", zl, Rl)) : (x(), C("svg", Hl, Kl)),
                d("span", Yl, E(i.value.basename), 1)
              ]),
              me(d("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (f) => l.value = f),
                onKeyup: Ue(h, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Wl), [
                [Ke, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ql = { class: "sm:flex sm:items-start" }, Gl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Jl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Zl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ql = { class: "mt-2" }, ec = { class: "text-gray-500 mb-1" }, tc = ["id"], rc = {
  key: 0,
  class: "py-2"
}, ic = ["disabled", "onClick"], nc = {
  name: "VFModalUpload"
}, oc = /* @__PURE__ */ Object.assign(nc, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { apiUrl: n } = _e(), { t: a } = inject("i18n"), i = z(null), l = z(null), h = z(null), m = z([]), g = z(!0), f = () => {
      i.value.start();
    };
    return ye(() => {
      i.value = new yt.Uploader({
        runtimes: "html5",
        browse_button: h.value,
        container: l.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: n.value + "?" + Oe({ q: "upload", adapter: e.current.adapter, path: e.current.dirname }),
        init: {
          PostInit: function() {
          },
          FilesAdded: function(v, b) {
            g.value = !1, yt.each(b, function(A) {
              m.value.push({
                id: A.id,
                name: A.name,
                size: yt.formatSize(A.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(v, b) {
            m.value[m.value.findIndex((A) => A.id == b.id)].percent = b.percent + "%";
          },
          UploadComplete: function() {
            g.value = !0, t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: e.current.dirname });
          },
          Error: function(v, b) {
          }
        }
      }), i.value.init();
    }), (v, b) => (x(), se(xe, null, {
      buttons: Q(() => [
        d("button", {
          disabled: g.value,
          onClick: Te(f, ["prevent"]),
          type: "button",
          class: fe([g.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, E(k(a)("Upload")), 11, ic),
        d("button", {
          type: "button",
          onClick: b[0] || (b[0] = (A) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(a)("Cancel")), 1)
      ]),
      default: Q(() => [
        d("div", ql, [
          Gl,
          d("div", Jl, [
            d("h3", Zl, E(k(a)("Upload files")), 1),
            d("div", Ql, [
              d("div", ec, [
                (x(!0), C(oe, null, pe(m.value, (A) => (x(), C("div", null, [
                  d("div", {
                    id: A.id
                  }, [
                    De(E(A.name) + " ( " + E(A.size) + ") ", 1),
                    d("b", null, E(A.percent), 1)
                  ], 8, tc)
                ]))), 256)),
                m.value.length ? ne("", !0) : (x(), C("div", rc, E(k(a)("No files selected!")), 1))
              ]),
              d("div", {
                class: "text-gray-500",
                ref_key: "container",
                ref: l
              }, [
                d("button", {
                  ref_key: "pickFiles",
                  ref: h,
                  type: "button",
                  class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                }, E(k(a)("Select Files")), 513)
              ], 512)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ac = { class: "sm:flex sm:items-start" }, sc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), lc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, cc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, uc = { class: "mt-2" }, dc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, hc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), mc = [
  fc
], pc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), vc = [
  gc
], bc = { class: "ml-1.5" }, yc = ["onKeyup", "placeholder"], wc = {
  name: "VFModalArchive"
}, xc = /* @__PURE__ */ Object.assign(wc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), { t: a } = inject("i18n"), i = z(""), l = z(e.selection.items), h = () => {
      l.value.length && t.emit("vf-fetch", {
        q: "archive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(l.value.map(({ path: m, type: g }) => ({ path: m, type: g }))),
        name: i.value
      });
    };
    return (m, g) => (x(), se(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: h,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(a)("Archive")), 1),
        d("button", {
          type: "button",
          onClick: g[1] || (g[1] = (f) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(a)("Cancel")), 1)
      ]),
      default: Q(() => [
        d("div", ac, [
          sc,
          d("div", lc, [
            d("h3", cc, E(k(a)("Archive the files")), 1),
            d("div", uc, [
              (x(!0), C(oe, null, pe(l.value, (f) => (x(), C("p", dc, [
                f.type == "dir" ? (x(), C("svg", hc, mc)) : (x(), C("svg", pc, vc)),
                d("span", bc, E(f.basename), 1)
              ]))), 256)),
              me(d("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (f) => i.value = f),
                onKeyup: Ue(h, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: k(a)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, yc), [
                [Ke, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), _c = { class: "sm:flex sm:items-start" }, kc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Sc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Dc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Cc = { class: "mt-2" }, Mc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, $c = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ec = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Tc = [
  Ec
], Ac = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Oc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Pc = [
  Oc
], jc = { class: "ml-1.5" }, Ic = { class: "my-1 text-sm text-gray-500" }, Nc = {
  name: "VFModalUnarchive"
}, Lc = /* @__PURE__ */ Object.assign(Nc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), { t: a } = inject("i18n");
    z("");
    const i = z(e.selection.items[0]), l = z([]), h = () => {
      t.emit("vf-fetch", {
        q: "unarchive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: i.value.path
      });
    };
    return (m, g) => (x(), se(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: h,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(a)("Unarchive")), 1),
        d("button", {
          type: "button",
          onClick: g[0] || (g[0] = (f) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(a)("Cancel")), 1)
      ]),
      default: Q(() => [
        d("div", _c, [
          kc,
          d("div", Sc, [
            d("h3", Dc, E(k(a)("Unarchive")), 1),
            d("div", Cc, [
              (x(!0), C(oe, null, pe(l.value, (f) => (x(), C("p", Mc, [
                f.type == "dir" ? (x(), C("svg", $c, Tc)) : (x(), C("svg", Ac, Pc)),
                d("span", jc, E(f.basename), 1)
              ]))), 256)),
              d("p", Ic, E(k(a)("The archive will be unarchived at")) + " (" + E(o.current.dirname) + ")", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Vc = { class: "sm:flex sm:items-start" }, zc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Bc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Rc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Hc = { class: "mt-2" }, Uc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Kc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Wc = [
  Yc
], Xc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), qc = [
  Fc
], Gc = { class: "ml-1.5" }, Jc = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Bu dosyalar\u0131 ta\u015F\u0131mak istedi\u011Finizden emin misiniz?", -1), Zc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Qc = /* @__PURE__ */ d("svg", {
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
], -1), eu = { class: "ml-1.5 overflow-auto" }, tu = {
  name: "VFModalMove"
}, ru = /* @__PURE__ */ Object.assign(tu, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { t: n } = inject("i18n"), { getStore: a } = inject("storage"), i = z(e.selection.items.from), l = () => {
      i.value.length && t.emit("vf-fetch", {
        q: "move",
        adapter: a("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(i.value.map(({ path: h, type: m }) => ({ path: h, type: m }))),
        item: e.selection.items.to.path
      });
    };
    return (h, m) => (x(), se(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(n)("Yes, Move!")), 1),
        d("button", {
          type: "button",
          onClick: m[0] || (m[0] = (g) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(k(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        d("div", Vc, [
          zc,
          d("div", Bc, [
            d("h3", Rc, E(k(n)("Move files")), 1),
            d("div", Hc, [
              (x(!0), C(oe, null, pe(i.value, (g) => (x(), C("p", Uc, [
                g.type == "dir" ? (x(), C("svg", Kc, Wc)) : (x(), C("svg", Xc, qc)),
                d("span", Gc, E(g.path), 1)
              ]))), 256)),
              Jc,
              d("p", Zc, [
                Qc,
                d("span", eu, E(o.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), iu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: Na,
  ModalMessage: Ka,
  ModalNewFolder: Qa,
  ModalNewFile: ls,
  ModalPreview: Ol,
  ModalRename: Fl,
  ModalUpload: oc,
  ModalArchive: xc,
  ModalUnarchive: Lc,
  ModalMove: ru
}, Symbol.toStringTag, { value: "Module" })), _t = {
  VueFinder: ma,
  ...iu
};
const au = {
  install(o) {
    for (const e in _t)
      if (_t.hasOwnProperty(e)) {
        const t = _t[e];
        o.component(t.name, t);
      }
  }
};
export {
  au as default
};
