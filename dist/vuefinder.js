import { ref as z, watch as Pt, openBlock as x, createElementBlock as M, createElementVNode as d, unref as S, normalizeClass as fe, createTextVNode as De, toDisplayString as T, createCommentVNode as ie, createVNode as ve, TransitionGroup as $i, withCtx as Q, Fragment as ne, renderList as pe, reactive as ut, onMounted as ye, withDirectives as me, vShow as ot, normalizeStyle as Sr, withModifiers as Te, nextTick as ft, vModelSelect as or, customRef as Ei, withKeys as Ue, isRef as Ti, vModelText as Ke, provide as bt, createBlock as ae, resolveDynamicComponent as Ai, renderSlot as ar } from "vue";
import yt from "plupload";
const dt = (o, { method: e = "get", params: t = {}, json: n = !0 }) => {
  const a = { method: e };
  if (e == "get")
    o += "?" + new URLSearchParams(t);
  else {
    a.headers = {};
    let i = new FormData();
    for (const [l, f] of Object.entries(t))
      i.append(l, f);
    a.body = i;
  }
  return fetch(o, a).then((i) => i.ok ? n ? i.json() : i.text() : Promise.reject(i));
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
  function a(f, m) {
    t.value = Object.assign({ ...t.value }, { [f]: m });
  }
  function i() {
    t.value = null;
  }
  return { getStore: (f, m = null) => t.value === null || t.value === "" ? m : t.value.hasOwnProperty(f) ? t.value[f] : m, setStore: a, clearStore: i };
}
const sr = z("");
function _e() {
  function o(e) {
    sr.value = e;
  }
  return { apiUrl: sr, setApiUrl: o };
}
const Pi = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, ji = {
  key: 0,
  class: "flex text-center"
}, Ii = ["aria-label"], Ni = /* @__PURE__ */ d("svg", {
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
], -1), Li = [
  Ni
], Vi = ["aria-label"], zi = /* @__PURE__ */ d("svg", {
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
], -1), Bi = [
  zi
], Ri = ["aria-label"], Hi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Ui = [
  Hi
], Ki = ["aria-label"], Yi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), Wi = [
  Yi
], Xi = ["aria-label"], Fi = /* @__PURE__ */ d("svg", {
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
], -1), qi = [
  Fi
], Gi = ["aria-label"], Ji = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), Zi = [
  Ji
], Qi = ["aria-label"], en = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), tn = [
  en
], rn = {
  key: 1,
  class: "flex text-center"
}, nn = { class: "pl-2" }, on = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, an = { class: "flex text-center items-center justify-end" }, sn = ["aria-label"], ln = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), cn = [
  ln
], un = ["aria-label"], dn = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, hn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, fn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, mn = ["aria-label"], pn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, gn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, vn = {
  name: "VFToolbar"
}, bn = /* @__PURE__ */ Object.assign(vn, {
  props: {
    data: Object
  },
  setup(o) {
    const e = inject("emitter"), { getStore: t, setStore: n } = inject("storage"), { t: a } = inject("i18n"), i = z(t("viewport", "grid")), l = z([]), f = z(t("full-screen", !1)), m = z("");
    e.on("vf-search-query", ({ newQuery: h }) => {
      m.value = h;
    });
    const g = () => {
      f.value = !f.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (h) => {
      l.value = h;
    }), e.on("vf-view-toggle", (h) => {
      n("viewport", h), i.value = h;
    }), (h, v) => (x(), M("div", Pi, [
      m.value.length ? (x(), M("div", rn, [
        d("div", nn, [
          De(T(S(a)("Search results for")) + " ", 1),
          d("span", on, T(m.value), 1)
        ])
      ])) : (x(), M("div", ji, [
        d("div", {
          class: "mx-1.5",
          "aria-label": S(a)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: v[0] || (v[0] = (b) => S(e).emit("vf-modal-show", { type: "new-folder", items: l.value }))
        }, Li, 8, Ii),
        d("div", {
          class: "mx-1.5",
          "aria-label": S(a)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[1] || (v[1] = (b) => S(e).emit("vf-modal-show", { type: "new-file", items: l.value }))
        }, Bi, 8, Vi),
        d("div", {
          class: "mx-1.5",
          "aria-label": S(a)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[2] || (v[2] = (b) => l.value.length != 1 || S(e).emit("vf-modal-show", { type: "rename", items: l.value }))
        }, [
          (x(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: fe([l.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Ui, 2))
        ], 8, Ri),
        d("div", {
          class: "mx-1.5",
          "aria-label": S(a)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[3] || (v[3] = (b) => !l.value.length || S(e).emit("vf-modal-show", { type: "delete", items: l.value }))
        }, [
          (x(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: fe([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Wi, 2))
        ], 8, Ki),
        d("div", {
          class: "mx-1.5",
          "aria-label": S(a)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[4] || (v[4] = (b) => S(e).emit("vf-modal-show", { type: "upload", items: l.value }))
        }, qi, 8, Xi),
        l.value.length == 1 && l.value[0].mime_type == "application/zip" ? (x(), M("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": S(a)("Unrchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[5] || (v[5] = (b) => !l.value.length || S(e).emit("vf-modal-show", { type: "unarchive", items: l.value }))
        }, [
          (x(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: fe([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Zi, 2))
        ], 8, Gi)) : (x(), M("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": S(a)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[6] || (v[6] = (b) => !l.value.length || S(e).emit("vf-modal-show", { type: "archive", items: l.value }))
        }, [
          (x(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: fe([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, tn, 2))
        ], 8, Qi))
      ])),
      d("div", an, [
        d("div", {
          class: "mx-1.5",
          "aria-label": S(a)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (x(), M("svg", {
            onClick: v[7] || (v[7] = (b) => S(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, cn))
        ], 8, sn),
        d("div", {
          class: "mx-1.5",
          "aria-label": S(a)("Toggle Full Screen"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g
        }, [
          (x(), M("svg", dn, [
            f.value ? (x(), M("path", hn)) : (x(), M("path", fn))
          ]))
        ], 8, un),
        d("div", {
          class: "mx-1.5",
          "aria-label": S(a)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: v[8] || (v[8] = (b) => m.value.length || S(e).emit("vf-view-toggle", i.value == "list" ? "grid" : "list"))
        }, [
          (x(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: fe([m.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            i.value == "grid" ? (x(), M("path", pn)) : ie("", !0),
            i.value == "list" ? (x(), M("path", gn)) : ie("", !0)
          ], 2))
        ], 8, mn)
      ])
    ]));
  }
});
var yn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Dr = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(yn, function() {
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
    function f(u) {
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
      }), s && h(u, s);
    }
    function g(u) {
      return g = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, g(u);
    }
    function h(u, s) {
      return h = Object.setPrototypeOf || function(p, c) {
        return p.__proto__ = c, p;
      }, h(u, s);
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
        var k = Function.bind.apply(c, _), O = new k();
        return w && h(O, w.prototype), O;
      }, b.apply(null, arguments);
    }
    function A(u) {
      return Function.toString.call(u).indexOf("[native code]") !== -1;
    }
    function $(u) {
      var s = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return $ = function(p) {
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
        }), h(c, p);
      }, $(u);
    }
    function D(u) {
      if (u === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return u;
    }
    function P(u, s) {
      return s && (typeof s == "object" || typeof s == "function") ? s : D(u);
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
        return P(this, c);
      };
    }
    function I(u, s) {
      for (; !Object.prototype.hasOwnProperty.call(u, s) && (u = g(u), u !== null); )
        ;
      return u;
    }
    function U(u, s, r) {
      return typeof Reflect < "u" && Reflect.get ? U = Reflect.get : U = function(c, y, w) {
        var _ = I(c, y);
        if (!!_) {
          var k = Object.getOwnPropertyDescriptor(_, y);
          return k.get ? k.get.call(w) : k.value;
        }
      }, U(u, s, r || u);
    }
    function se(u, s) {
      return Y(u) || le(u, s) || j(u, s) || J();
    }
    function X(u) {
      return C(u) || F(u) || j(u) || N();
    }
    function C(u) {
      if (Array.isArray(u))
        return R(u);
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
        } catch (k) {
          c = !0, y = k;
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
          return R(u, s);
        var r = Object.prototype.toString.call(u).slice(8, -1);
        if (r === "Object" && u.constructor && (r = u.constructor.name), r === "Map" || r === "Set")
          return Array.from(u);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return R(u, s);
      }
    }
    function R(u, s) {
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
      var c = s.x, y = s.y, w = p.x, _ = p.y, k = {
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
      return k[r];
    }, W = function(s) {
      return {
        x: s.left,
        y: s.top
      };
    }, oe = function(s) {
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
          var k, O = (k = _[1]) === null || k === void 0 ? void 0 : k.split(",");
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
          var _, k = (_ = w[1]) === null || _ === void 0 ? void 0 : _.split(",");
          p.x = parseInt(k[0]) || 0, p.y = parseInt(k[1]) || 0;
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
      var s = u.shiftKey, r = u.keyboardDragSpeed, p = u.zoom, c = u.key, y = u.dragKeys, w = u.scrollDiff, _ = u.canScroll, k = u.scrollCallback, O = {
        x: 0,
        y: 0
      }, E = s ? r * 4 * p : r * p;
      return y.left.includes(c) && (O.x = w.x || -E, !s && !w.x && _ && k(["left"], r)), y.right.includes(c) && (O.x = w.x || E, !s && !w.x && _ && k(["right"], r)), y.up.includes(c) && (O.y = w.y || -E, !s && !w.y && _ && k(["top"], r)), y.down.includes(c) && (O.y = w.y || E, !s && !w.y && _ && k(["bottom"], r)), O;
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
      var _ = s.getBoundingClientRect(), k = zt({
        elementRect: _,
        containerRect: p
      });
      Wr({
        element: s,
        edges: k,
        elementRect: _,
        containerRect: p,
        elementPos: w,
        useTransform: c
      });
    }, Gr = function(u, s) {
      window.removeEventListener("resize", s), window.removeEventListener("scroll", s), u.disconnect();
    }, Jr = function(u, s, r) {
      if (!!s.length) {
        var p = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, c = u instanceof HTMLDocument ? p || document.body : u, y = s.includes("top") && c.scrollTop > 0, w = s.includes("bottom") && c.scrollTop < c.scrollHeight, _ = s.includes("left") && c.scrollLeft > 0, k = s.includes("right") && c.scrollLeft < c.scrollWidth;
        y && (c.scrollTop -= 1 * r), w && (c.scrollTop += 1 * r), _ && (c.scrollLeft -= 1 * r), k && (c.scrollLeft += 1 * r);
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
          condition: function(E) {
            return E.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, w = function() {
        var E = se(k[_], 2), L = E[0], H = E[1];
        ["pre", !1].forEach(function(Z) {
          return s(Z ? "".concat(L, ":").concat(Z) : L, function(de) {
            return H.forEach(function(ee) {
              return (!ee.condition || ee.condition(de)) && r(Z ? "".concat(Z).concat(ee.name) : ee.name, f({
                items: c.elements,
                isDragging: p.isDragging
              }, de));
            });
          });
        });
      }, _ = 0, k = Object.entries(y); _ < k.length; _++)
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
          var k = {
            scroll_directions: w,
            scroll_multiplier: _
          };
          r.PubSub.publish("Area:scroll:pre", k), Jr(r._node, w, _), r.PubSub.publish("Area:scroll", k);
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
        var r = this, p = s.DS, c = s.dragKeys, y = s.draggability, w = s.keyboardDrag, _ = s.keyboardDragSpeed, k = s.useTransform, O = s.zoom;
        t(this, u), i(this, "_useTransform", void 0), i(this, "_prevCursorPos", void 0), i(this, "_prevScrollPos", void 0), i(this, "_elements", []), i(this, "_draggability", void 0), i(this, "_dragKeys", void 0), i(this, "_dragKeysFlat", void 0), i(this, "_keyboardDrag", void 0), i(this, "_keyboardDragSpeed", void 0), i(this, "_zoom", void 0), i(this, "keyboardDrag", function(E) {
          var L = E.event, H = E.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(H) || !r.DS.SelectedSet.size || !r._draggability || r.DS.continue)) {
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
              key: H,
              scrollCallback: r.DS.Area.scroll,
              scrollDiff: r._scrollDiff,
              canScroll: r.DS.stores.ScrollStore.canScroll,
              dragKeys: r._dragKeys
            });
            r._elements.forEach(function(ee) {
              return Ht({
                element: ee,
                posDirection: de,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], Z);
          }
        }), i(this, "keyboardEnd", function(E) {
          var L = E.event, H = E.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(H) || !r.DS.SelectedSet.size || !r._draggability)) {
            var Z = {
              event: L,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], Z);
          }
        }), i(this, "start", function(E) {
          var L = E.isDragging, H = E.isDraggingKeyboard;
          !L || H || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), i(this, "stop", function(E) {
          E != null && E.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), i(this, "update", function(E) {
          var L = E.isDragging, H = E.isDraggingKeyboard;
          if (!(!L || !r._elements.length || H || r.DS.continue)) {
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
        }), i(this, "handleZIndex", function(E) {
          r._elements.forEach(function(L) {
            return L.style.zIndex = "".concat((parseInt(L.style.zIndex) || 0) + E ? 9999 : -9998);
          });
        }), this.DS = p, this._useTransform = k, this._keyboardDragSpeed = _, this._keyboardDrag = w, this._zoom = O, this._draggability = y, this._dragKeys = {
          up: c.up.map(function(E) {
            return E.toLowerCase();
          }),
          down: c.down.map(function(E) {
            return E.toLowerCase();
          }),
          left: c.left.map(function(E) {
            return E.toLowerCase();
          }),
          right: c.right.map(function(E) {
            return E.toLowerCase();
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
          var O = k.target.closest(".".concat(r._selectableClass));
          return !r._draggability || r.DS.stores.KeyStore.isMultiSelectKeyPressed(k) || !O ? !1 : (r._immediateDrag && (r.DS.SelectedSet.size ? r.DS.SelectedSet.has(O) || (r.DS.SelectedSet.clear(), r.DS.SelectedSet.add(
            O
          )) : r.DS.SelectedSet.add(
            O
          )), !!r.DS.SelectedSet.has(O));
        }), i(this, "onClick", function(k) {
          var O = k.event;
          if (!!r._canInteract(O) && !(O.detail > 0)) {
            var E = r.DS, L = E.stores, H = L.PointerStore, Z = L.KeyStore, de = E.SelectableSet, ee = E.SelectedSet;
            H.start(O);
            var Le = O.target;
            !de.has(Le) || (Z.isMultiSelectKeyPressed(O) || ee.clear(), ee.toggle(Le), r.reset());
          }
        }), i(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), i(this, "update", function(k) {
          var O = k.event, E = k.scroll_directions, L = k.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: O,
            scroll_directions: E,
            scroll_multiplier: L,
            isDragging: r.isDragging
          });
        }), i(this, "reset", function(k) {
          return r.DS.publish("Interaction:end:pre", {
            event: k,
            isDragging: r.isDragging
          });
        }), i(this, "_reset", function(k) {
          var O = r.isDragging;
          r.stop(), r.init(), r.DS.publish("Interaction:end", {
            event: k,
            isDragging: O
          });
        }), this._areaElement = c, this._draggability = y, this._immediateDrag = w, this._selectableClass = _, this.DS = p, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(k) {
          var O = k.event;
          return r.start(O);
        }), this.DS.subscribe("Interaction:start:pre", function(k) {
          var O = k.event;
          return r._start(O);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(k) {
          var O = k.event;
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
        var c, y = p.elements, w = p.className, _ = p.hoverClassName, k = p.draggability, O = p.useTransform, E = p.DS;
        return t(this, r), c = s.call(this), i(D(c), "_initElements", void 0), i(D(c), "_className", void 0), i(D(c), "_hoverClassName", void 0), i(D(c), "_useTransform", void 0), i(D(c), "_draggability", void 0), i(D(c), "init", function() {
          return c._initElements.forEach(function(L) {
            return c.add(L);
          });
        }), i(D(c), "clear", function() {
          return c.forEach(function(L) {
            return c.delete(L);
          });
        }), i(D(c), "_onClick", function(L) {
          return c.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: L
          });
        }), i(D(c), "_onPointer", function(L) {
          return c.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: L
          });
        }), i(D(c), "addAll", function(L) {
          return L.forEach(function(H) {
            return c.add(H);
          });
        }), i(D(c), "deleteAll", function(L) {
          return L.forEach(function(H) {
            return c.delete(H);
          });
        }), c.DS = E, c._initElements = Ne(y), c._className = w, c._hoverClassName = _, c._useTransform = O, c._draggability = k, c.DS.subscribe("Interaction:init", c.init), c;
      }
      return a(r, [{
        key: "add",
        value: function(c) {
          return c.classList.add(this._className), c.addEventListener("click", this._onClick), c.addEventListener("mousedown", this._onPointer), c.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Rt({
            computedStyle: window.getComputedStyle(c),
            node: c
          }), U(g(r.prototype), "add", this).call(this, c);
        }
      }, {
        key: "delete",
        value: function(c) {
          return c.classList.remove(this._className), c.classList.remove(this._hoverClassName), c.removeEventListener("click", this._onClick), c.removeEventListener("mousedown", this._onPointer), c.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), U(g(r.prototype), "delete", this).call(this, c);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ $(Set)), ni = /* @__PURE__ */ function(u) {
      m(r, u);
      var s = B(r);
      function r(p) {
        var c, y = p.className, w = p.DS;
        return t(this, r), c = s.call(this), i(D(c), "_className", void 0), i(D(c), "clear", function() {
          return c.forEach(function(_) {
            return c.delete(_);
          });
        }), i(D(c), "addAll", function(_) {
          return _.forEach(function(k) {
            return c.add(k);
          });
        }), i(D(c), "deleteAll", function(_) {
          return _.forEach(function(k) {
            return c.delete(k);
          });
        }), c.DS = w, c._className = y, c;
      }
      return a(r, [{
        key: "add",
        value: function(c) {
          if (!U(g(r.prototype), "has", this).call(this, c)) {
            var y = {
              items: this.elements,
              item: c
            };
            return this.DS.publish("Selected:added:pre", y), U(g(r.prototype), "add", this).call(this, c), c.classList.add(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", y), this;
          }
        }
      }, {
        key: "delete",
        value: function(c) {
          if (!!U(g(r.prototype), "has", this).call(this, c)) {
            var y = {
              items: this.elements,
              item: c
            };
            this.DS.publish("Selected:removed:pre", y);
            var w = U(g(r.prototype), "delete", this).call(this, c);
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
    }(/* @__PURE__ */ $(Set)), oi = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, p = s.DS, c = s.hoverClassName, y = s.multiSelectToggling;
        t(this, u), i(this, "_prevSelectedSet", void 0), i(this, "_hoverClassName", void 0), i(this, "_multiSelectToggling", void 0), i(this, "start", function(w) {
          var _ = w.event, k = w.isDragging;
          k || (r._storePrevious(_), r._handleInsideSelection(!0, _));
        }), i(this, "update", function(w) {
          var _ = w.isDragging;
          _ || r.DS.continue || r._handleInsideSelection();
        }), i(this, "_handleInsideSelection", function(w, _) {
          for (var k = r.DS, O = k.SelectableSet, E = k.SelectorArea, L = k.Selector, H = O.elements.map(function(ke) {
            return [ke, ke.getBoundingClientRect()];
          }), Z = [], de = [], ee = 0, Le = H.length; ee < Le; ee++)
            !E.isInside(H[ee][0], H[ee][1]) || (gt(H[ee][1], L.rect) ? Z.push(H[ee][0]) : de.push(H[ee][0]));
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
          var k = _.isDragging;
          if (!k) {
            var O = r.DS.stores.PointerStore, E = O.initialValArea;
            Ut(r.HTMLNode, oe(E, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), i(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), i(this, "update", function(_) {
          var k = _.isDragging;
          if (!(k || r.DS.continue)) {
            var O = r.DS.stores, E = O.ScrollStore, L = O.PointerStore, H = Hr({
              scrollAmount: E.scrollAmount,
              initialPointerPos: L.initialValArea,
              pointerPos: L.currentValArea
            });
            Ut(r.HTMLNode, H), r._rect = null;
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
          var _ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", k = document.body ? "body" : "documentElement", O = "".concat(_, "Child");
          r.HTMLNode[O](r.DS.Selector.HTMLNode), document[k][O](r.HTMLNode);
        }), i(this, "updatePos", function() {
          r._rect = null;
          var _ = r.DS.Area.rect, k = r.DS.Area.computedBorder, O = r.HTMLNode.style, E = "".concat(_.top + k.top, "px"), L = "".concat(_.left + k.left, "px"), H = "".concat(_.width, "px"), Z = "".concat(_.height, "px");
          O.top !== E && (O.top = E), O.left !== L && (O.left = L), O.width !== H && (O.width = H), O.height !== Z && (O.height = Z);
        }), i(this, "stop", function(_) {
          r.stopAutoScroll(), _ && r.applyElements("remove");
        }), i(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), i(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var _ = r.DS, k = _.stores.PointerStore, O = _.Area;
            r.currentEdges = zt({
              elementRect: oe(k.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && O.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), i(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), i(this, "isInside", function(_, k) {
          return r.DS.Area.HTMLNode.contains(_) && r.DS.stores.ScrollStore.canScroll ? !0 : gt(r.rect, k || _.getBoundingClientRect());
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
          }, k = _[w];
          return k ? (console.warn("[DragSelect] ".concat(w, ' is deprecated. Use "').concat(k, '" instead. Act Now!. See docs for more info')), k.toLowerCase()) : w.toLowerCase();
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
        var r = this, p = s.area, c = p === void 0 ? document : p, y = s.selectables, w = y === void 0 ? [] : y, _ = s.autoScrollSpeed, k = _ === void 0 ? 5 : _, O = s.overflowTolerance, E = O === void 0 ? {
          x: 25,
          y: 25
        } : O, L = s.zoom, H = L === void 0 ? 1 : L, Z = s.customStyles, de = Z === void 0 ? !1 : Z, ee = s.multiSelectMode, Le = ee === void 0 ? !1 : ee, nt = s.multiSelectToggling, ke = nt === void 0 ? !0 : nt, Kt = s.multiSelectKeys, hi = Kt === void 0 ? ["Control", "Shift", "Meta"] : Kt, Yt = s.selector, fi = Yt === void 0 ? void 0 : Yt, Wt = s.draggability, vt = Wt === void 0 ? !0 : Wt, Xt = s.immediateDrag, mi = Xt === void 0 ? !0 : Xt, Ft = s.keyboardDrag, pi = Ft === void 0 ? !0 : Ft, gi = s.dragKeys, qt = s.keyboardDragSpeed, vi = qt === void 0 ? 10 : qt, Gt = s.useTransform, Jt = Gt === void 0 ? !0 : Gt, Zt = s.hoverClass, Qt = Zt === void 0 ? "ds-hover" : Zt, er = s.selectableClass, tr = er === void 0 ? "ds-selectable" : er, rr = s.selectedClass, bi = rr === void 0 ? "ds-selected" : rr, ir = s.selectorClass, yi = ir === void 0 ? "ds-selector" : ir, nr = s.selectorAreaClass, wi = nr === void 0 ? "ds-selector-area" : nr, xi = s.callback, _i = s.onDragMove, ki = s.onDragStartBegin, Si = s.onDragStart, Di = s.onElementSelect, Ci = s.onElementUnselect;
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
            zoom: H
          }),
          KeyStore: new li({
            DS: this,
            multiSelectKeys: hi,
            multiSelectMode: Le
          })
        }, this.Area = new Qr({
          area: c,
          PS: this.PubSub,
          zoom: H
        }), this.Selector = new ai({
          DS: this,
          selector: fi,
          selectorClass: yi,
          customStyles: de
        }), this.SelectorArea = new si({
          DS: this,
          selectorAreaClass: wi,
          autoScrollSpeed: k,
          overflowTolerance: E
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
          zoom: H,
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
          var p = r.callback, c = r.onDragMove, y = r.onDragStart, w = r.onDragStartBegin, _ = r.onElementSelect, k = r.onElementUnselect, O = function(L, H) {
            return console.warn("[DragSelect] ".concat(L, ' is deprecated. Use DragSelect.subscribe("').concat(H, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          p && (O("callback", "callback"), this.subscribe("callback", function(E) {
            var L = E.items;
            E.item;
            var H = E.event;
            return p(L, H);
          })), c && (O("onDragMove", "dragmove"), this.subscribe("dragmove", function(E) {
            E.items, E.item;
            var L = E.event;
            return c(L);
          })), y && (O("onDragStart", "dragstart"), this.subscribe("dragstart", function(E) {
            E.items, E.item;
            var L = E.event;
            return y(L);
          })), w && (O("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(E) {
            E.items, E.item;
            var L = E.event;
            return w(L);
          })), _ && (O("onElementSelect", "elementselect"), this.subscribe("elementselect", function(E) {
            E.items;
            var L = E.item, H = E.event;
            return _(L, H);
          })), k && (O("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(E) {
            E.items;
            var L = E.item, H = E.event;
            return k(L, H);
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
const wn = Dr.exports, xn = (o, e, t, n, a) => (e = Math, t = e.log, n = 1024, a = t(o) / t(n) | 0, o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B"), _n = (o, e = "en-US") => new Date(o * 1e3).toLocaleString(e), kn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Sn = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Dn = [
  Sn
], Cn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Mn = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), $n = [
  Mn
], En = {
  name: "VFSortIcon"
}, at = /* @__PURE__ */ Object.assign(En, {
  props: { direction: String },
  setup(o) {
    return (e, t) => (x(), M("div", null, [
      o.direction == "down" ? (x(), M("svg", kn, Dn)) : ie("", !0),
      o.direction == "up" ? (x(), M("svg", Cn, $n)) : ie("", !0)
    ]));
  }
}), Tn = ["onClick"], An = {
  name: "VFToast.vue"
}, On = /* @__PURE__ */ Object.assign(An, {
  setup(o) {
    const e = inject("emitter"), { getStore: t } = inject("storage"), n = z(t("full-screen", !1)), a = (m) => m == "error" ? "text-red-400 border-red-400" : "text-lime-600 border-lime-600", i = z([]), l = (m) => {
      i.value.splice(m, 1);
    }, f = (m) => {
      let g = i.value.findIndex((h) => h.id === m);
      g !== -1 && l(g);
    };
    return e.on("vf-toast-push", (m) => {
      let g = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      m.id = g, i.value.push(m), setTimeout(() => {
        f(g);
      }, 5e3);
    }), (m, g) => (x(), M("div", {
      class: fe([n.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      ve($i, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: Q(() => [
          (x(!0), M(ne, null, pe(i.value, (h, v) => (x(), M("div", {
            onClick: (b) => l(v),
            key: h,
            class: fe([a(h.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 border text-xs rounded cursor-pointer"])
          }, T(h.label), 11, Tn))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Pn = { class: "relative flex-auto flex flex-col overflow-hidden" }, jn = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, In = { class: "absolute" }, Nn = /* @__PURE__ */ d("svg", {
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
], -1), Ln = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Vn = ["onDblclick", "onTouchstart", "onContextmenu", "data-type", "data-item", "data-index"], zn = { class: "grid grid-cols-12 items-center" }, Bn = { class: "flex col-span-7 items-center" }, Rn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Un = [
  Hn
], Kn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Wn = [
  Yn
], Xn = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Fn = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, qn = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Gn = { class: "grid grid-cols-12 items-center" }, Jn = { class: "flex col-span-7 items-center" }, Zn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), eo = [
  Qn
], to = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ro = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), io = [
  ro
], no = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, oo = { class: "col-span-2 text-center" }, ao = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, so = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], lo = { class: "relative" }, co = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, uo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ho = [
  uo
], fo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), po = [
  mo
], go = { class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500" }, vo = { class: "break-all" }, bo = {
  name: "VFExplorer"
}, yo = /* @__PURE__ */ Object.assign(bo, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { setStore: n, getStore: a } = inject("storage"), i = (j) => j == null ? void 0 : j.substring(0, 3), l = (j) => j.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), f = z(null), m = z(null), g = z(0), h = z(null), { t: v } = inject("i18n"), b = z(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      b.value = !b.value, n("full-screen", b.value);
    });
    const A = z("");
    t.on("vf-search-query", ({ newQuery: j }) => {
      A.value = j, j ? t.emit("vf-fetch", { q: "search", adapter: e.data.adapter, path: e.data.dirname, filter: j }) : t.emit("vf-fetch", { q: "index", adapter: e.data.adapter, path: e.data.dirname });
    });
    let $ = null;
    const D = () => {
      $ && clearTimeout($);
    }, P = (j) => {
      $ = setTimeout(() => {
        B(j);
      }, 500);
    }, B = (j) => {
      j.type == "dir" ? (t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.data.adapter, path: j.path })) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: j });
    }, I = ut({ active: !1, column: "", order: "" }), U = (j = !0) => {
      let R = [...e.data.files], N = I.column, J = I.order == "asc" ? 1 : -1;
      if (!j)
        return R;
      const V = (W, oe) => typeof W == "string" && typeof oe == "string" ? W.toLowerCase().localeCompare(oe.toLowerCase()) : W < oe ? -1 : W > oe ? 1 : 0;
      return I.active && (R = R.slice().sort((W, oe) => V(W[N], oe[N]) * J)), R;
    }, se = (j) => {
      I.active && I.column == j ? (I.active = I.order == "asc", I.column = j, I.order = "desc") : (I.active = !0, I.column = j, I.order = "asc");
    }, X = () => h.value.getSelection().map((j) => JSON.parse(j.dataset.item)), C = (j, R) => {
      if (j.altKey || j.ctrlKey || j.metaKey)
        return j.preventDefault(), !1;
      j.dataTransfer.setDragImage(m.value, 0, 15), j.dataTransfer.effectAllowed = "all", j.dataTransfer.dropEffect = "copy", j.dataTransfer.setData("items", JSON.stringify(X()));
    }, Y = (j, R) => {
      j.preventDefault();
      let N = JSON.parse(j.dataTransfer.getData("items"));
      if (N.find((J) => J.storage != a("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: N, to: R } });
    }, F = (j, R) => {
      j.preventDefault(), !R || R.type !== "dir" || h.value.getSelection().find((N) => N == j.currentTarget) ? (j.dataTransfer.dropEffect = "none", j.dataTransfer.effectAllowed = "none") : j.dataTransfer.dropEffect = "copy";
    };
    return ye(() => {
      h.value = new wn({
        area: f.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => ft(() => {
        h.value.clearSelection(), h.value.setSelectables(document.getElementsByClassName("vf-item"));
      })), h.value.subscribe("predragstart", ({ event: j, isDragging: R }) => {
        if (R)
          g.value = h.value.getSelection().length, h.value.break();
        else {
          const N = j.target.offsetWidth - j.offsetX, J = j.target.offsetHeight - j.offsetY;
          N < 15 && J < 15 && (h.value.clearSelection(), h.value.break());
        }
      }), h.value.subscribe("predragmove", ({ isDragging: j }) => {
        j && h.value.break();
      }), h.value.subscribe("callback", ({ items: j, event: R, isDragging: N }) => {
        t.emit("vf-nodes-selected", X()), g.value = h.value.getSelection().length;
      });
    }), ye(() => {
      Pt(() => e.view, () => t.emit("vf-explorer-update"));
    }), (j, R) => (x(), M("div", Pn, [
      o.view == "list" || A.value.length ? (x(), M("div", jn, [
        d("div", {
          onClick: R[0] || (R[0] = (N) => se("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          De(T(S(v)("Name")) + " ", 1),
          me(ve(at, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, I.active && I.column == "basename"]
          ])
        ]),
        A.value.length ? ie("", !0) : (x(), M("div", {
          key: 0,
          onClick: R[1] || (R[1] = (N) => se("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          De(T(S(v)("Size")) + " ", 1),
          me(ve(at, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, I.active && I.column == "file_size"]
          ])
        ])),
        A.value.length ? ie("", !0) : (x(), M("div", {
          key: 1,
          onClick: R[2] || (R[2] = (N) => se("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          De(T(S(v)("Date")) + " ", 1),
          me(ve(at, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, I.active && I.column == "last_modified"]
          ])
        ])),
        A.value.length ? (x(), M("div", {
          key: 2,
          onClick: R[3] || (R[3] = (N) => se("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          De(T(S(v)("Filepath")) + " ", 1),
          me(ve(at, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, I.active && I.column == "path"]
          ])
        ])) : ie("", !0)
      ])) : ie("", !0),
      d("div", In, [
        d("div", {
          ref_key: "dragImage",
          ref: m,
          class: "absolute -z-50 -top-96"
        }, [
          Nn,
          d("div", Ln, T(g.value), 1)
        ], 512)
      ]),
      d("div", {
        style: Sr(b.value ? "height: 100%;" : ""),
        class: fe([b.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: f,
        onContextmenu: R[7] || (R[7] = Te((N) => S(t).emit("vf-contextmenu-show", { event: N, area: f.value, items: X() }), ["self", "prevent"]))
      }, [
        A.value.length ? (x(!0), M(ne, { key: 0 }, pe(U(), (N, J) => (x(), M("div", {
          onDblclick: (V) => B(N),
          onTouchstart: (V) => P(N),
          onTouchend: R[4] || (R[4] = (V) => D()),
          onContextmenu: Te((V) => S(t).emit("vf-contextmenu-show", { event: V, area: f.value, items: X(), target: N }), ["prevent"]),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": J
        }, [
          d("div", zn, [
            d("div", Bn, [
              N.type == "dir" ? (x(), M("svg", Rn, Un)) : (x(), M("svg", Kn, Wn)),
              d("span", Xn, T(N.basename), 1)
            ]),
            d("div", Fn, T(N.path), 1)
          ])
        ], 40, Vn))), 256)) : ie("", !0),
        o.view == "list" && !A.value.length ? (x(!0), M(ne, { key: 1 }, pe(U(), (N, J) => (x(), M("div", {
          draggable: "true",
          onDblclick: (V) => B(N),
          onTouchstart: (V) => P(N),
          onTouchend: R[5] || (R[5] = (V) => D()),
          onContextmenu: Te((V) => S(t).emit("vf-contextmenu-show", { event: V, area: f.value, items: X(), target: N }), ["prevent"]),
          onDragstart: (V) => C(V),
          onDragover: (V) => F(V, N),
          onDrop: (V) => Y(V, N),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": J
        }, [
          d("div", Gn, [
            d("div", Jn, [
              N.type == "dir" ? (x(), M("svg", Zn, eo)) : (x(), M("svg", to, io)),
              d("span", no, T(N.basename), 1)
            ]),
            d("div", oo, T(N.file_size ? S(xn)(N.file_size) : ""), 1),
            d("div", ao, T(S(_n)(N.last_modified)), 1)
          ])
        ], 40, qn))), 256)) : ie("", !0),
        o.view == "grid" && !A.value.length ? (x(!0), M(ne, { key: 2 }, pe(U(!1), (N, J) => (x(), M("div", {
          draggable: "true",
          onDblclick: (V) => B(N),
          onTouchstart: (V) => P(N),
          onTouchend: R[6] || (R[6] = (V) => D()),
          onContextmenu: Te((V) => S(t).emit("vf-contextmenu-show", { event: V, area: f.value, items: X(), target: N }), ["prevent"]),
          onDragstart: (V) => C(V),
          onDragover: (V) => F(V, N),
          onDrop: (V) => Y(V, N),
          class: "vf-item border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none",
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": J
        }, [
          d("div", null, [
            d("div", lo, [
              N.type == "dir" ? (x(), M("svg", co, ho)) : (x(), M("svg", fo, po)),
              d("div", go, T(i(N.extension)), 1)
            ]),
            d("span", vo, T(l(N.basename)), 1)
          ])
        ], 40, so))), 256)) : ie("", !0)
      ], 38),
      ve(On)
    ]));
  }
}), wo = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, xo = { class: "flex leading-5 items-center" }, _o = ["aria-label"], ko = /* @__PURE__ */ d("svg", {
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
], -1), So = [
  ko
], Do = ["value"], Co = { class: "ml-3" }, Mo = { key: 0 }, $o = { class: "ml-1" }, Eo = { class: "flex leading-5 items-center" }, To = /* @__PURE__ */ d("option", { value: "tr" }, "Turkish", -1), Ao = /* @__PURE__ */ d("option", { value: "en" }, "English", -1), Oo = /* @__PURE__ */ d("option", { value: "fr" }, "French", -1), Po = [
  To,
  Ao,
  Oo
], jo = ["aria-label"], Io = /* @__PURE__ */ d("svg", {
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
], -1), No = [
  Io
], Lo = {
  name: "VFStatusbar"
}, Vo = /* @__PURE__ */ Object.assign(Lo, {
  props: {
    data: Object
  },
  setup(o) {
    var b;
    const e = o, t = inject("emitter"), { getStore: n, setStore: a } = inject("storage"), i = z(0), l = z((b = n("adapter")) != null ? b : e.data.adapter), { t: f, changeLocale: m } = inject("i18n"), g = z(n("locale", "")), h = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: l.value }), a("adapter", l.value);
    };
    t.on("vf-nodes-selected", (A) => {
      i.value = A.length;
    });
    const v = z("");
    return t.on("vf-search-query", ({ newQuery: A }) => {
      v.value = A;
    }), (A, $) => (x(), M("div", wo, [
      d("div", xo, [
        d("div", {
          class: "mx-2",
          "aria-label": S(f)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, So, 8, _o),
        me(d("select", {
          "onUpdate:modelValue": $[0] || ($[0] = (D) => l.value = D),
          onChange: h,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (x(!0), M(ne, null, pe(o.data.storages, (D) => (x(), M("option", { value: D }, T(D), 9, Do))), 256))
        ], 544), [
          [or, l.value]
        ]),
        d("div", Co, [
          v.value.length ? (x(), M("span", Mo, T(o.data.files.length) + " items found. ", 1)) : ie("", !0),
          d("span", $o, T(i.value > 0 ? i.value + " " + S(f)("item(s) selected.") : ""), 1)
        ])
      ]),
      d("div", Eo, [
        me(d("select", {
          "onUpdate:modelValue": $[1] || ($[1] = (D) => g.value = D),
          onChange: $[2] || ($[2] = (D) => S(m)(D.target.value)),
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, Po, 544), [
          [or, g.value]
        ]),
        d("span", {
          "aria-label": S(f)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: $[3] || ($[3] = (D) => S(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: S(f)("Vuefinder is a file manager component for vue 3.") }))
        }, No, 8, jo)
      ])
    ]));
  }
}), zo = (o, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && o(...a), clearTimeout(n), n = setTimeout(() => {
      o(...a);
    }, e);
  };
}, Bo = (o, e, t) => {
  const n = z(o);
  return Ei((i, l) => ({
    get() {
      return i(), n.value;
    },
    set: zo(
      (f) => {
        n.value = f, l();
      },
      e,
      t
    )
  }));
}, Ro = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Ho = ["aria-label"], Uo = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Ko = [
  Uo
], Yo = ["onClick"], Wo = /* @__PURE__ */ d("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Xo = [
  Wo
], Fo = { class: "flex leading-5" }, qo = /* @__PURE__ */ d("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Go = ["title", "onClick"], Jo = {
  key: 1,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, Zo = /* @__PURE__ */ d("svg", {
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
], -1), Qo = ["onKeydown", "placeholder"], ea = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), ta = [
  ea
], ra = {
  name: "VFBreadcrumb"
}, ia = /* @__PURE__ */ Object.assign(ra, {
  props: {
    data: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), a = z(null), i = z([]), l = z(!1), f = z(null), { t: m } = inject("i18n");
    t.on("vf-explorer-update", () => {
      var B;
      let D = [], P = [];
      a.value = (B = e.data.dirname) != null ? B : n("adapter", "local") + "://", a.value.length == 0 && (i.value = []), a.value.replace(n("adapter", "local") + "://", "").split("/").forEach(function(I) {
        D.push(I), D.join("/") != "" && P.push({
          basename: I,
          name: I,
          path: n("adapter", "local") + "://" + D.join("/"),
          type: "dir"
        });
      }), P.length > 4 && (P = P.slice(-5), P[0].name = ".."), i.value = P;
    });
    const g = () => {
      l.value = !1, v.value = "";
    };
    t.on("vf-search-exit", () => {
      g();
    });
    const h = () => {
      l.value = !0, ft(() => f.value.focus());
    }, v = Bo("", 400);
    Pt(v, (D) => {
      t.emit("vf-search-query", { newQuery: D });
    });
    const b = () => i.value.length && !l.value, A = (D) => {
      var B;
      D.preventDefault();
      let P = JSON.parse(D.dataTransfer.getData("items"));
      if (P.find((I) => I.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: P, to: (B = i.value[i.value.length - 2]) != null ? B : { path: n("adapter", "local") + "://" } }
      });
    }, $ = (D) => {
      D.preventDefault(), b() ? D.dataTransfer.dropEffect = "copy" : (D.dataTransfer.dropEffect = "none", D.dataTransfer.effectAllowed = "none");
    };
    return (D, P) => (x(), M("div", Ro, [
      d("span", {
        "aria-label": S(m)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (x(), M("svg", {
          onDragover: P[0] || (P[0] = (B) => $(B)),
          onDrop: P[1] || (P[1] = (B) => A(B)),
          onClick: P[2] || (P[2] = (B) => {
            var I, U;
            return !b() || S(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: (U = (I = i.value[i.value.length - 2]) == null ? void 0 : I.path) != null ? U : S(n)("adapter", "local") + "://" });
          }),
          class: fe(["h-6 w-6 p-0.5 rounded", b() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Ko, 34))
      ], 8, Ho),
      l.value ? (x(), M("div", Jo, [
        Zo,
        me(d("input", {
          ref_key: "searchInput",
          ref: f,
          onKeydown: Ue(g, ["esc"]),
          "onUpdate:modelValue": P[4] || (P[4] = (B) => Ti(v) ? v.value = B : null),
          placeholder: S(m)("Search anything.."),
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, Qo), [
          [Ke, S(v)]
        ]),
        (x(), M("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: g,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, ta))
      ])) : (x(), M("div", {
        key: 0,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Te(h, ["self"])
      }, [
        (x(), M("svg", {
          onClick: P[3] || (P[3] = (B) => S(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Xo)),
        d("div", Fo, [
          (x(!0), M(ne, null, pe(i.value, (B, I) => (x(), M("div", { key: I }, [
            qo,
            d("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: B.basename,
              onClick: (U) => S(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: B.path })
            }, T(B.name), 9, Go)
          ]))), 128))
        ])
      ], 8, Yo))
    ]));
  }
}), Oe = (o) => Object.entries(o).map((e) => e.map(encodeURIComponent).join("=")).join("&"), na = ["onClick"], oa = /* @__PURE__ */ d("span", { class: "px-1" }, null, -1), aa = {
  name: "VFContextMenu"
}, sa = /* @__PURE__ */ Object.assign(aa, {
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
    const { t: f } = inject("i18n"), m = {
      newfolder: {
        title: () => f("New Folder"),
        action: () => {
          t.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: () => f("Delete"),
        action: () => {
          t.emit("vf-modal-show", { type: "delete", items: l });
        }
      },
      refresh: {
        title: () => f("Refresh"),
        action: () => {
          t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: e.current.dirname });
        }
      },
      preview: {
        title: () => f("Preview"),
        action: () => {
          t.emit("vf-modal-show", { type: "preview", adapter: e.current.adapter, item: l.value[0] });
        }
      },
      open: {
        title: () => f("Open"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: l.value[0].path });
        }
      },
      openDir: {
        title: () => f("Open containing folder"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: l.value[0].dir });
        }
      },
      download: {
        title: () => f("Download"),
        action: () => {
          const b = a.value + "?" + Oe({ q: "download", adapter: l.value[0].adapter, path: l.value[0].path });
          t.emit("vf-download", b);
        }
      },
      archive: {
        title: () => f("Archive"),
        action: () => {
          t.emit("vf-modal-show", { type: "archive", items: l });
        }
      },
      unarchive: {
        title: () => f("Unarchive"),
        action: () => {
          t.emit("vf-modal-show", { type: "unarchive", items: l });
        }
      },
      rename: {
        title: () => f("Rename"),
        action: () => {
          t.emit("vf-modal-show", { type: "rename", items: l });
        }
      }
    }, g = (b) => {
      t.emit("vf-contextmenu-hide"), b.action();
    }, h = z("");
    t.on("vf-search-query", ({ newQuery: b }) => {
      h.value = b;
    }), t.on("vf-contextmenu-show", ({ event: b, area: A, items: $, target: D = null }) => {
      i.items = [], !D && !h.value ? (i.items.push(m.refresh), i.items.push(m.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")) : $.length > 1 && $.some((P) => P.path === D.path) ? (i.items.push(m.refresh), i.items.push(m.archive), i.items.push(m.delete), t.emit("vf-context-selected", $), console.log($.length + " selected (more than 1 item.)")) : D && h.value ? (i.items.push(m.openDir), t.emit("vf-context-selected", [D])) : (D.type == "dir" ? i.items.push(m.open) : i.items.push(m.preview), i.items.push(m.rename), i.items.push(m.download), D.mime_type == "application/zip" ? i.items.push(m.unarchive) : i.items.push(m.archive), i.items.push(m.delete), t.emit("vf-context-selected", [D]), console.log(D.type + " is selected")), v(b, A);
    }), t.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const v = (b, A) => {
      i.active = !0, ft(() => {
        let $ = A.getBoundingClientRect(), D = b.pageX, P = b.pageY, B = n.value.offsetHeight, I = n.value.offsetWidth;
        D = $.right - b.pageX + window.scrollX < I ? D - I : D, P = $.bottom - b.pageY + window.scrollY < B ? P - B : P, i.positions = {
          left: D + "px",
          top: P + "px"
        };
      });
    };
    return (b, A) => i.active ? (x(), M("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: n,
      style: Sr(i.positions)
    }, [
      (x(!0), M(ne, null, pe(i.items, ($) => (x(), M("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: $.title,
        onClick: (D) => g($)
      }, [
        oa,
        d("span", null, T($.title()), 1)
      ], 8, na))), 128))
    ], 4)) : ie("", !0);
  }
}), la = (o, e) => {
  const t = o[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((n, a) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(a.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function ca(o) {
  const e = await la(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en.4a62fdd0.js"), "../locales/tr.json": () => import("./tr.d243bb9c.js") }), `../locales/${o}.json`);
  return JSON.parse(e.default);
}
function ua(o, e) {
  const { getStore: t, setStore: n } = kt(o), a = ["en", "tr"], i = z({}), l = (m) => {
    a.includes(m) || (console.log("The selected locale is not yet supported. The fallback language is set as 'en'"), m = "en"), ca(m).then((g) => {
      i.value = g, n("locale", m), n("translations", g), console.log(m + " is loaded.");
    });
  };
  t("locale") ? i.value = t("translations") : l(e);
  function f(m) {
    return i.value.hasOwnProperty(m) ? i.value[m] : "";
  }
  return { t: f, support_locales: a, changeLocale: l };
}
const da = /* @__PURE__ */ d("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), ha = {
  name: "VueFinder"
}, fa = /* @__PURE__ */ Object.assign(ha, {
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
    const e = o, t = Oi(), { setStore: n, getStore: a } = kt(e.id);
    bt("emitter", t), bt("storage", kt(e.id));
    const i = ua(e.id, e.locale);
    bt("i18n", i);
    const { apiUrl: l, setApiUrl: f } = _e();
    f(e.url);
    const m = ut({ adapter: "local", storages: [], dirname: ".", files: [] }), g = z(a("viewport", "grid")), h = z(a("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      h.value = !h.value, n("darkMode", h.value);
    });
    const v = z(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      v.value = !v.value, n("full-screen", v.value);
    }), t.on("vf-view-toggle", ($) => {
      g.value = $;
    });
    const b = ut({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      b.active = !1;
    }), t.on("vf-modal-show", ($) => {
      b.active = !0, b.type = $.type, b.data = $;
    });
    const A = ($) => {
      Object.assign(m, $), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update");
    };
    return t.on("vf-fetch", ($) => {
      dt(l.value, { params: $ }).then((D) => {
        t.emit("vf-modal-close"), A(D);
      });
    }), t.on("vf-download", ($) => {
      document.getElementById("download_frame").src = $, t.emit("vf-modal-close");
    }), ye(() => {
      t.emit("vf-fetch", { q: "index", adapter: a("adapter", m.adapter) });
    }), ($, D) => (x(), M("div", {
      class: fe(h.value ? "dark" : "")
    }, [
      d("div", {
        class: fe([v.value ? "fixed w-screen inset-0 z-20" : "relative", "border flex flex-col rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        onMousedown: D[0] || (D[0] = (P) => S(t).emit("vf-contextmenu-hide"))
      }, [
        ve(bn, { data: m }, null, 8, ["data"]),
        ve(ia, { data: m }, null, 8, ["data"]),
        ve(yo, {
          view: g.value,
          data: m
        }, null, 8, ["view", "data"]),
        ve(Vo, { data: m }, null, 8, ["data"])
      ], 34),
      b.active ? (x(), ae(Ai("v-f-modal-" + b.type), {
        key: 0,
        selection: b.data,
        current: m
      }, null, 8, ["selection", "current"])) : ie("", !0),
      ve(sa, { current: m }, null, 8, ["current"]),
      da
    ], 2));
  }
}), ma = /* @__PURE__ */ d("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), pa = { class: "fixed z-10 inset-0 overflow-y-auto" }, ga = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, va = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, ba = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, xe = {
  __name: "ModalLayout",
  setup(o) {
    const e = inject("emitter");
    return ye(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, n) => (x(), M("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: n[1] || (n[1] = Ue((a) => S(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      ma,
      d("div", pa, [
        d("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = Te((a) => S(e).emit("vf-modal-close"), ["self"]))
        }, [
          d("div", ga, [
            d("div", va, [
              ar(t.$slots, "default")
            ]),
            d("div", ba, [
              ar(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, ya = { class: "sm:flex sm:items-start" }, wa = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), xa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, _a = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ka = { class: "mt-2" }, Sa = { class: "text-sm text-gray-500" }, Da = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ca = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ma = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), $a = [
  Ma
], Ea = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ta = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Aa = [
  Ta
], Oa = { class: "ml-1.5" }, Pa = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, ja = {
  name: "VFModalDelete"
}, Ia = /* @__PURE__ */ Object.assign(ja, {
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
        items: JSON.stringify(i.value.map(({ path: f, type: m }) => ({ path: f, type: m })))
      });
    };
    return (f, m) => (x(), ae(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(a)("Yes, Delete!")), 1),
        d("button", {
          type: "button",
          onClick: m[0] || (m[0] = (g) => S(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(a)("Cancel")), 1),
        d("div", Pa, T(S(a)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        d("div", ya, [
          wa,
          d("div", xa, [
            d("h3", _a, T(S(a)("Delete files")), 1),
            d("div", ka, [
              d("p", Sa, T(S(a)("Are you sure you want to delete these files ?")), 1),
              (x(!0), M(ne, null, pe(i.value, (g) => (x(), M("p", Da, [
                g.type == "dir" ? (x(), M("svg", Ca, $a)) : (x(), M("svg", Ea, Aa)),
                d("span", Oa, T(g.basename), 1)
              ]))), 256))
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Na = { class: "sm:flex sm:items-start" }, La = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Va = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, za = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ba = { class: "mt-2" }, Ra = { class: "text-sm text-gray-500" }, Ha = {
  name: "VFModalMessage"
}, Ua = /* @__PURE__ */ Object.assign(Ha, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = inject("emitter"), { t } = inject("i18n");
    return (n, a) => (x(), ae(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: a[0] || (a[0] = (i) => S(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(t)("Close")), 1)
      ]),
      default: Q(() => {
        var i, l, f, m;
        return [
          d("div", Na, [
            La,
            d("div", Va, [
              d("h3", za, T((l = (i = o.selection) == null ? void 0 : i.title) != null ? l : "Title"), 1),
              d("div", Ba, [
                d("p", Ra, T((m = (f = o.selection) == null ? void 0 : f.message) != null ? m : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), Ka = { class: "sm:flex sm:items-start" }, Ya = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Wa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Xa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Fa = { class: "mt-2" }, qa = { class: "text-sm text-gray-500" }, Ga = ["onKeyup", "placeholder"], Ja = {
  name: "VFModalNewFolder"
}, Za = /* @__PURE__ */ Object.assign(Ja, {
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
    return (f, m) => (x(), ae(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(a)("Create")), 1),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (g) => S(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(a)("Cancel")), 1)
      ]),
      default: Q(() => [
        d("div", Ka, [
          Ya,
          d("div", Wa, [
            d("h3", Xa, T(S(a)("New Folder")), 1),
            d("div", Fa, [
              d("p", qa, T(S(a)("Create a new folder")), 1),
              me(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (g) => i.value = g),
                onKeyup: Ue(l, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: S(a)("Folder Name"),
                type: "text"
              }, null, 40, Ga), [
                [Ke, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Qa = { class: "sm:flex sm:items-start" }, es = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ts = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, rs = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, is = { class: "mt-2" }, ns = { class: "text-sm text-gray-500" }, os = ["onKeyup", "placeholder"], as = {
  name: "VFModalNewFile"
}, ss = /* @__PURE__ */ Object.assign(as, {
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
    return (f, m) => (x(), ae(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (g) => S(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: Q(() => [
        d("div", Qa, [
          es,
          d("div", ts, [
            d("h3", rs, T(S(a)("New File")), 1),
            d("div", is, [
              d("p", ns, T(S(a)("Create a new file")), 1),
              me(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (g) => i.value = g),
                onKeyup: Ue(l, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: S(a)("File Name"),
                type: "text"
              }, null, 40, os), [
                [Ke, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ls = { class: "flex" }, cs = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, us = { class: "ml-auto mb-2" }, ds = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, hs = { key: 1 }, fs = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, n = z(""), a = z(""), i = z(null), l = z(!1), { apiUrl: f } = _e();
    ye(() => {
      dt(f.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((h) => {
        n.value = h, e("load");
      });
    });
    const m = () => {
      l.value = !l.value, a.value = n.value, l.value == !0 && ft(() => {
        i.value.focus();
      });
    }, g = () => {
      dt(f.value, {
        method: "POST",
        params: { q: "save", adapter: t.selection.adapter, path: t.selection.item.path, content: a.value },
        json: !1
      }).then((h) => {
        n.value = h, e("load"), l.value = !l.value;
      }).catch((h) => console.log(h.statusText));
    };
    return (h, v) => (x(), M(ne, null, [
      d("div", ls, [
        d("div", cs, T(o.selection.item.basename), 1),
        d("div", us, [
          l.value ? (x(), M("button", {
            key: 0,
            onClick: g,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Save")) : ie("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: v[0] || (v[0] = (b) => m())
          }, T(l.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      d("div", null, [
        l.value ? (x(), M("div", hs, [
          me(d("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": v[1] || (v[1] = (b) => a.value = b),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Ke, a.value]
          ])
        ])) : (x(), M("pre", ds, T(n.value), 1))
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
      gs(o, n, t[n]);
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
function ms(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function cr(o, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(o, n.key, n);
  }
}
function ps(o, e, t) {
  return e && cr(o.prototype, e), t && cr(o, t), o;
}
function gs(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function Mr(o) {
  return vs(o) || bs(o) || ys(o) || ws();
}
function vs(o) {
  if (Array.isArray(o))
    return St(o);
}
function bs(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null)
    return Array.from(o);
}
function ys(o, e) {
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
function ws() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var mt = typeof window < "u" && typeof window.document < "u", we = mt ? window : {}, jt = mt && we.document.documentElement ? "ontouchstart" in we.document.documentElement : !1, It = mt ? "PointerEvent" in we : !1, q = "cropper", Nt = "all", $r = "crop", Er = "move", Tr = "zoom", $e = "e", Ee = "w", Ve = "s", Se = "n", Fe = "ne", qe = "nw", Ge = "se", Je = "sw", Dt = "".concat(q, "-crop"), ur = "".concat(q, "-disabled"), ue = "".concat(q, "-hidden"), dr = "".concat(q, "-hide"), xs = "".concat(q, "-invisible"), ht = "".concat(q, "-modal"), Ct = "".concat(q, "-move"), Qe = "".concat(q, "Action"), st = "".concat(q, "Preview"), Lt = "crop", Ar = "move", Or = "none", Mt = "crop", $t = "cropend", Et = "cropmove", Tt = "cropstart", hr = "dblclick", _s = jt ? "touchstart" : "mousedown", ks = jt ? "touchmove" : "mousemove", Ss = jt ? "touchend touchcancel" : "mouseup", fr = It ? "pointerdown" : _s, mr = It ? "pointermove" : ks, pr = It ? "pointerup pointercancel" : Ss, gr = "ready", vr = "resize", br = "wheel", At = "zoom", yr = "image/jpeg", Ds = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, Cs = /^data:/, Ms = /^data:image\/jpeg;base64,/, $s = /^img|canvas$/i, Pr = 200, jr = 100, wr = {
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
}, Es = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', Ts = Number.isNaN || we.isNaN;
function K(o) {
  return typeof o == "number" && !Ts(o);
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
var As = Object.prototype.hasOwnProperty;
function ze(o) {
  if (!Ae(o))
    return !1;
  try {
    var e = o.constructor, t = e.prototype;
    return e && t && As.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function ce(o) {
  return typeof o == "function";
}
var Os = Array.prototype.slice;
function Ir(o) {
  return Array.from ? Array.from(o) : Os.call(o);
}
function te(o, e) {
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
}, Ps = /\.\d*(?:0|9){12}\d*$/;
function Re(o) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return Ps.test(o) ? Math.round(o * e) / e : o;
}
var js = /^width|height|left|top|marginLeft|marginTop$/;
function Ce(o, e) {
  var t = o.style;
  te(e, function(n, a) {
    js.test(a) && K(n) && (n = "".concat(n, "px")), t[a] = n;
  });
}
function Is(o, e) {
  return o.classList ? o.classList.contains(e) : o.className.indexOf(e) > -1;
}
function re(o, e) {
  if (!!e) {
    if (K(o.length)) {
      te(o, function(n) {
        re(n, e);
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
      te(o, function(t) {
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
      te(o, function(n) {
        Be(n, e, t);
      });
      return;
    }
    t ? re(o, e) : be(o, e);
  }
}
var Ns = /([a-z\d])([A-Z])/g;
function Vt(o) {
  return o.replace(Ns, "$1-$2").toLowerCase();
}
function Ot(o, e) {
  return Ae(o[e]) ? o[e] : o.dataset ? o.dataset[e] : o.getAttribute("data-".concat(Vt(e)));
}
function et(o, e, t) {
  Ae(t) ? o[e] = t : o.dataset ? o.dataset[e] = t : o.setAttribute("data-".concat(Vt(e)), t);
}
function Ls(o, e) {
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
      var l = o.listeners, f = l === void 0 ? {} : l;
      a = function() {
        delete f[i][t], o.removeEventListener(i, a, n);
        for (var g = arguments.length, h = new Array(g), v = 0; v < g; v++)
          h[v] = arguments[v];
        t.apply(o, h);
      }, f[i] || (f[i] = {}), f[i][t] && o.removeEventListener(i, f[i][t], n), f[i][t] = a, o.listeners = f;
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
var xt = we.location, Vs = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function _r(o) {
  var e = o.match(Vs);
  return e !== null && (e[1] !== xt.protocol || e[2] !== xt.hostname || e[3] !== xt.port);
}
function kr(o) {
  var e = "timestamp=".concat(new Date().getTime());
  return o + (o.indexOf("?") === -1 ? "?" : "&") + e;
}
function Ze(o) {
  var e = o.rotate, t = o.scaleX, n = o.scaleY, a = o.translateX, i = o.translateY, l = [];
  K(a) && a !== 0 && l.push("translateX(".concat(a, "px)")), K(i) && i !== 0 && l.push("translateY(".concat(i, "px)")), K(e) && e !== 0 && l.push("rotate(".concat(e, "deg)")), K(t) && t !== 1 && l.push("scaleX(".concat(t, ")")), K(n) && n !== 1 && l.push("scaleY(".concat(n, ")"));
  var f = l.length ? l.join(" ") : "none";
  return {
    WebkitTransform: f,
    msTransform: f,
    transform: f
  };
}
function zs(o) {
  var e = Cr({}, o), t = 0;
  return te(o, function(n, a) {
    delete e[a], te(e, function(i) {
      var l = Math.abs(n.startX - i.startX), f = Math.abs(n.startY - i.startY), m = Math.abs(n.endX - i.endX), g = Math.abs(n.endY - i.endY), h = Math.sqrt(l * l + f * f), v = Math.sqrt(m * m + g * g), b = (v - h) / h;
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
function Bs(o) {
  var e = 0, t = 0, n = 0;
  return te(o, function(a) {
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
    var f = t * e;
    a === "contain" && f > n || a === "cover" && f < n ? t = n / e : n = t * e;
  } else
    i ? t = n / e : l && (n = t * e);
  return {
    width: n,
    height: t
  };
}
function Rs(o) {
  var e = o.width, t = o.height, n = o.degree;
  if (n = Math.abs(n) % 180, n === 90)
    return {
      width: t,
      height: e
    };
  var a = n % 90 * Math.PI / 180, i = Math.sin(a), l = Math.cos(a), f = e * l + t * i, m = e * i + t * l;
  return n > 90 ? {
    width: m,
    height: f
  } : {
    width: f,
    height: m
  };
}
function Hs(o, e, t, n) {
  var a = e.aspectRatio, i = e.naturalWidth, l = e.naturalHeight, f = e.rotate, m = f === void 0 ? 0 : f, g = e.scaleX, h = g === void 0 ? 1 : g, v = e.scaleY, b = v === void 0 ? 1 : v, A = t.aspectRatio, $ = t.naturalWidth, D = t.naturalHeight, P = n.fillColor, B = P === void 0 ? "transparent" : P, I = n.imageSmoothingEnabled, U = I === void 0 ? !0 : I, se = n.imageSmoothingQuality, X = se === void 0 ? "low" : se, C = n.maxWidth, Y = C === void 0 ? 1 / 0 : C, F = n.maxHeight, le = F === void 0 ? 1 / 0 : F, j = n.minWidth, R = j === void 0 ? 0 : j, N = n.minHeight, J = N === void 0 ? 0 : N, V = document.createElement("canvas"), W = V.getContext("2d"), oe = Me({
    aspectRatio: A,
    width: Y,
    height: le
  }), Pe = Me({
    aspectRatio: A,
    width: R,
    height: J
  }, "cover"), Ye = Math.min(oe.width, Math.max(Pe.width, $)), We = Math.min(oe.height, Math.max(Pe.height, D)), tt = Me({
    aspectRatio: a,
    width: Y,
    height: le
  }), rt = Me({
    aspectRatio: a,
    width: R,
    height: J
  }, "cover"), it = Math.min(tt.width, Math.max(rt.width, i)), je = Math.min(tt.height, Math.max(rt.height, l)), pt = [-it / 2, -je / 2, it, je];
  return V.width = Re(Ye), V.height = Re(We), W.fillStyle = B, W.fillRect(0, 0, Ye, We), W.save(), W.translate(Ye / 2, We / 2), W.rotate(m * Math.PI / 180), W.scale(h, b), W.imageSmoothingEnabled = U, W.imageSmoothingQuality = X, W.drawImage.apply(W, [o].concat(Mr(pt.map(function(Ie) {
    return Math.floor(Re(Ie));
  })))), W.restore(), V;
}
var zr = String.fromCharCode;
function Us(o, e, t) {
  var n = "";
  t += e;
  for (var a = e; a < t; a += 1)
    n += zr(o.getUint8(a));
  return n;
}
var Ks = /^data:.*,/;
function Ys(o) {
  var e = o.replace(Ks, ""), t = atob(e), n = new ArrayBuffer(t.length), a = new Uint8Array(n);
  return te(a, function(i, l) {
    a[l] = t.charCodeAt(l);
  }), n;
}
function Ws(o, e) {
  for (var t = [], n = 8192, a = new Uint8Array(o); a.length > 0; )
    t.push(zr.apply(null, Ir(a.subarray(0, n)))), a = a.subarray(n);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function Xs(o) {
  var e = new DataView(o), t;
  try {
    var n, a, i;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var l = e.byteLength, f = 2; f + 1 < l; ) {
        if (e.getUint8(f) === 255 && e.getUint8(f + 1) === 225) {
          a = f;
          break;
        }
        f += 1;
      }
    if (a) {
      var m = a + 4, g = a + 10;
      if (Us(e, m, 4) === "Exif") {
        var h = e.getUint16(g);
        if (n = h === 18761, (n || h === 19789) && e.getUint16(g + 2, n) === 42) {
          var v = e.getUint32(g + 4, n);
          v >= 8 && (i = g + v);
        }
      }
    }
    if (i) {
      var b = e.getUint16(i, n), A, $;
      for ($ = 0; $ < b; $ += 1)
        if (A = i + $ * 12 + 2, e.getUint16(A, n) === 274) {
          A += 8, t = e.getUint16(A, n), e.setUint16(A, 1, n);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function Fs(o) {
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
var qs = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, n = this.container, a = this.cropper, i = Number(t.minContainerWidth), l = Number(t.minContainerHeight);
    re(a, ue), be(e, ue);
    var f = {
      width: Math.max(n.offsetWidth, i >= 0 ? i : Pr),
      height: Math.max(n.offsetHeight, l >= 0 ? l : jr)
    };
    this.containerData = f, Ce(a, {
      width: f.width,
      height: f.height
    }), re(e, ue), be(a, ue);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, n = this.options.viewMode, a = Math.abs(t.rotate) % 180 === 90, i = a ? t.naturalHeight : t.naturalWidth, l = a ? t.naturalWidth : t.naturalHeight, f = i / l, m = e.width, g = e.height;
    e.height * f > e.width ? n === 3 ? m = e.height * f : g = e.width / f : n === 3 ? g = e.width / f : m = e.height * f;
    var h = {
      aspectRatio: f,
      naturalWidth: i,
      naturalHeight: l,
      width: m,
      height: g
    };
    this.canvasData = h, this.limited = n === 1 || n === 2, this.limitCanvas(!0, !0), h.width = Math.min(Math.max(h.width, h.minWidth), h.maxWidth), h.height = Math.min(Math.max(h.height, h.minHeight), h.maxHeight), h.left = (e.width - h.width) / 2, h.top = (e.height - h.height) / 2, h.oldLeft = h.left, h.oldTop = h.top, this.initialCanvasData = G({}, h);
  },
  limitCanvas: function(e, t) {
    var n = this.options, a = this.containerData, i = this.canvasData, l = this.cropBoxData, f = n.viewMode, m = i.aspectRatio, g = this.cropped && l;
    if (e) {
      var h = Number(n.minCanvasWidth) || 0, v = Number(n.minCanvasHeight) || 0;
      f > 1 ? (h = Math.max(h, a.width), v = Math.max(v, a.height), f === 3 && (v * m > h ? h = v * m : v = h / m)) : f > 0 && (h ? h = Math.max(h, g ? l.width : 0) : v ? v = Math.max(v, g ? l.height : 0) : g && (h = l.width, v = l.height, v * m > h ? h = v * m : v = h / m));
      var b = Me({
        aspectRatio: m,
        width: h,
        height: v
      });
      h = b.width, v = b.height, i.minWidth = h, i.minHeight = v, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
    }
    if (t)
      if (f > (g ? 0 : 1)) {
        var A = a.width - i.width, $ = a.height - i.height;
        i.minLeft = Math.min(0, A), i.minTop = Math.min(0, $), i.maxLeft = Math.max(0, A), i.maxTop = Math.max(0, $), g && this.limited && (i.minLeft = Math.min(l.left, l.left + (l.width - i.width)), i.minTop = Math.min(l.top, l.top + (l.height - i.height)), i.maxLeft = l.left, i.maxTop = l.top, f === 2 && (i.width >= a.width && (i.minLeft = Math.min(0, A), i.maxLeft = Math.max(0, A)), i.height >= a.height && (i.minTop = Math.min(0, $), i.maxTop = Math.max(0, $))));
      } else
        i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = a.width, i.maxTop = a.height;
  },
  renderCanvas: function(e, t) {
    var n = this.canvasData, a = this.imageData;
    if (t) {
      var i = Rs({
        width: a.naturalWidth * Math.abs(a.scaleX || 1),
        height: a.naturalHeight * Math.abs(a.scaleY || 1),
        degree: a.rotate || 0
      }), l = i.width, f = i.height, m = n.width * (l / n.naturalWidth), g = n.height * (f / n.naturalHeight);
      n.left -= (m - n.width) / 2, n.top -= (g - n.height) / 2, n.width = m, n.height = g, n.aspectRatio = l / f, n.naturalWidth = l, n.naturalHeight = f, this.limitCanvas(!0, !1);
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
    var n = this.options, a = this.containerData, i = this.canvasData, l = this.cropBoxData, f = this.limited, m = n.aspectRatio;
    if (e) {
      var g = Number(n.minCropBoxWidth) || 0, h = Number(n.minCropBoxHeight) || 0, v = f ? Math.min(a.width, i.width, i.width + i.left, a.width - i.left) : a.width, b = f ? Math.min(a.height, i.height, i.height + i.top, a.height - i.top) : a.height;
      g = Math.min(g, a.width), h = Math.min(h, a.height), m && (g && h ? h * m > g ? h = g / m : g = h * m : g ? h = g / m : h && (g = h * m), b * m > v ? b = v / m : v = b * m), l.minWidth = Math.min(g, v), l.minHeight = Math.min(h, b), l.maxWidth = v, l.maxHeight = b;
    }
    t && (f ? (l.minLeft = Math.max(0, i.left), l.minTop = Math.max(0, i.top), l.maxLeft = Math.min(a.width, i.left + i.width) - l.width, l.maxTop = Math.min(a.height, i.top + i.height) - l.height) : (l.minLeft = 0, l.minTop = 0, l.maxLeft = a.width - l.width, l.maxTop = a.height - l.height));
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
}, Gs = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, n = this.options.preview, a = t ? this.crossOriginUrl : this.url, i = e.alt || "The image to preview", l = document.createElement("img");
    if (t && (l.crossOrigin = t), l.src = a, l.alt = i, this.viewBox.appendChild(l), this.viewBoxImage = l, !!n) {
      var f = n;
      typeof n == "string" ? f = e.ownerDocument.querySelectorAll(n) : n.querySelector && (f = [n]), this.previews = f, te(f, function(m) {
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
    te(this.previews, function(e) {
      var t = Ot(e, st);
      Ce(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, Ls(e, st);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, n = this.cropBoxData, a = n.width, i = n.height, l = e.width, f = e.height, m = n.left - t.left - e.left, g = n.top - t.top - e.top;
    !this.cropped || this.disabled || (Ce(this.viewBoxImage, G({
      width: l,
      height: f
    }, Ze(G({
      translateX: -m,
      translateY: -g
    }, e)))), te(this.previews, function(h) {
      var v = Ot(h, st), b = v.width, A = v.height, $ = b, D = A, P = 1;
      a && (P = b / a, D = i * P), i && D > A && (P = A / i, $ = a * P, D = A), Ce(h, {
        width: $,
        height: D
      }), Ce(h.getElementsByTagName("img")[0], G({
        width: l * P,
        height: f * P
      }, Ze(G({
        translateX: -m * P,
        translateY: -g * P
      }, e))));
    }));
  }
}, Js = {
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
}, Zs = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, n = this.containerData, a = t.offsetWidth / n.width, i = t.offsetHeight / n.height, l = Math.abs(a - 1) > Math.abs(i - 1) ? a : i;
      if (l !== 1) {
        var f, m;
        e.restore && (f = this.getCanvasData(), m = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(te(f, function(g, h) {
          f[h] = g * l;
        })), this.setCropBoxData(te(m, function(g, h) {
          m[h] = g * l;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Or || this.setDragMode(Is(this.dragBox, Dt) ? Ar : Lt);
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
      e.changedTouches ? te(e.changedTouches, function(f) {
        i[f.identifier] = lt(f);
      }) : i[e.pointerId || 0] = lt(e), Object.keys(i).length > 1 && a.zoomable && a.zoomOnTouch ? l = Tr : l = Ot(e.target, Qe), !!Ds.test(l) && He(this.element, Tt, {
        originalEvent: e,
        action: l
      }) !== !1 && (e.preventDefault(), this.action = l, this.cropping = !1, l === $r && (this.cropping = !0, re(this.dragBox, ht)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var n = this.pointers;
      e.preventDefault(), He(this.element, Et, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? te(e.changedTouches, function(a) {
        G(n[a.identifier] || {}, lt(a, !0));
      }) : G(n[e.pointerId || 0] || {}, lt(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, n = this.pointers;
      e.changedTouches ? te(e.changedTouches, function(a) {
        delete n[a.identifier];
      }) : delete n[e.pointerId || 0], t && (e.preventDefault(), Object.keys(n).length || (this.action = ""), this.cropping && (this.cropping = !1, Be(this.dragBox, ht, this.cropped && this.options.modal)), He(this.element, $t, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, Qs = {
  change: function(e) {
    var t = this.options, n = this.canvasData, a = this.containerData, i = this.cropBoxData, l = this.pointers, f = this.action, m = t.aspectRatio, g = i.left, h = i.top, v = i.width, b = i.height, A = g + v, $ = h + b, D = 0, P = 0, B = a.width, I = a.height, U = !0, se;
    !m && e.shiftKey && (m = v && b ? v / b : 1), this.limited && (D = i.minLeft, P = i.minTop, B = D + Math.min(a.width, n.width, n.left + n.width), I = P + Math.min(a.height, n.height, n.top + n.height));
    var X = l[Object.keys(l)[0]], C = {
      x: X.endX - X.startX,
      y: X.endY - X.startY
    }, Y = function(le) {
      switch (le) {
        case $e:
          A + C.x > B && (C.x = B - A);
          break;
        case Ee:
          g + C.x < D && (C.x = D - g);
          break;
        case Se:
          h + C.y < P && (C.y = P - h);
          break;
        case Ve:
          $ + C.y > I && (C.y = I - $);
          break;
      }
    };
    switch (f) {
      case Nt:
        g += C.x, h += C.y;
        break;
      case $e:
        if (C.x >= 0 && (A >= B || m && (h <= P || $ >= I))) {
          U = !1;
          break;
        }
        Y($e), v += C.x, v < 0 && (f = Ee, v = -v, g -= v), m && (b = v / m, h += (i.height - b) / 2);
        break;
      case Se:
        if (C.y <= 0 && (h <= P || m && (g <= D || A >= B))) {
          U = !1;
          break;
        }
        Y(Se), b -= C.y, h += C.y, b < 0 && (f = Ve, b = -b, h -= b), m && (v = b * m, g += (i.width - v) / 2);
        break;
      case Ee:
        if (C.x <= 0 && (g <= D || m && (h <= P || $ >= I))) {
          U = !1;
          break;
        }
        Y(Ee), v -= C.x, g += C.x, v < 0 && (f = $e, v = -v, g -= v), m && (b = v / m, h += (i.height - b) / 2);
        break;
      case Ve:
        if (C.y >= 0 && ($ >= I || m && (g <= D || A >= B))) {
          U = !1;
          break;
        }
        Y(Ve), b += C.y, b < 0 && (f = Se, b = -b, h -= b), m && (v = b * m, g += (i.width - v) / 2);
        break;
      case Fe:
        if (m) {
          if (C.y <= 0 && (h <= P || A >= B)) {
            U = !1;
            break;
          }
          Y(Se), b -= C.y, h += C.y, v = b * m;
        } else
          Y(Se), Y($e), C.x >= 0 ? A < B ? v += C.x : C.y <= 0 && h <= P && (U = !1) : v += C.x, C.y <= 0 ? h > P && (b -= C.y, h += C.y) : (b -= C.y, h += C.y);
        v < 0 && b < 0 ? (f = Je, b = -b, v = -v, h -= b, g -= v) : v < 0 ? (f = qe, v = -v, g -= v) : b < 0 && (f = Ge, b = -b, h -= b);
        break;
      case qe:
        if (m) {
          if (C.y <= 0 && (h <= P || g <= D)) {
            U = !1;
            break;
          }
          Y(Se), b -= C.y, h += C.y, v = b * m, g += i.width - v;
        } else
          Y(Se), Y(Ee), C.x <= 0 ? g > D ? (v -= C.x, g += C.x) : C.y <= 0 && h <= P && (U = !1) : (v -= C.x, g += C.x), C.y <= 0 ? h > P && (b -= C.y, h += C.y) : (b -= C.y, h += C.y);
        v < 0 && b < 0 ? (f = Ge, b = -b, v = -v, h -= b, g -= v) : v < 0 ? (f = Fe, v = -v, g -= v) : b < 0 && (f = Je, b = -b, h -= b);
        break;
      case Je:
        if (m) {
          if (C.x <= 0 && (g <= D || $ >= I)) {
            U = !1;
            break;
          }
          Y(Ee), v -= C.x, g += C.x, b = v / m;
        } else
          Y(Ve), Y(Ee), C.x <= 0 ? g > D ? (v -= C.x, g += C.x) : C.y >= 0 && $ >= I && (U = !1) : (v -= C.x, g += C.x), C.y >= 0 ? $ < I && (b += C.y) : b += C.y;
        v < 0 && b < 0 ? (f = Fe, b = -b, v = -v, h -= b, g -= v) : v < 0 ? (f = Ge, v = -v, g -= v) : b < 0 && (f = qe, b = -b, h -= b);
        break;
      case Ge:
        if (m) {
          if (C.x >= 0 && (A >= B || $ >= I)) {
            U = !1;
            break;
          }
          Y($e), v += C.x, b = v / m;
        } else
          Y(Ve), Y($e), C.x >= 0 ? A < B ? v += C.x : C.y >= 0 && $ >= I && (U = !1) : v += C.x, C.y >= 0 ? $ < I && (b += C.y) : b += C.y;
        v < 0 && b < 0 ? (f = qe, b = -b, v = -v, h -= b, g -= v) : v < 0 ? (f = Je, v = -v, g -= v) : b < 0 && (f = Fe, b = -b, h -= b);
        break;
      case Er:
        this.move(C.x, C.y), U = !1;
        break;
      case Tr:
        this.zoom(zs(l), e), U = !1;
        break;
      case $r:
        if (!C.x || !C.y) {
          U = !1;
          break;
        }
        se = Vr(this.cropper), g = X.startX - se.left, h = X.startY - se.top, v = i.minWidth, b = i.minHeight, C.x > 0 ? f = C.y > 0 ? Ge : Fe : C.x < 0 && (g -= v, f = C.y > 0 ? Je : qe), C.y < 0 && (h -= b), this.cropped || (be(this.cropBox, ue), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    U && (i.width = v, i.height = b, i.left = g, i.top = h, this.action = f, this.renderCropBox()), te(l, function(F) {
      F.startX = F.endX, F.startY = F.endY;
    });
  }
}, el = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && re(this.dragBox, ht), be(this.cropBox, ue), this.setCropBoxData(this.initialCropBoxData)), this;
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
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), be(this.dragBox, ht), re(this.cropBox, ue)), this;
  },
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, te(this.previews, function(n) {
      n.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, be(this.cropper, ur)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, re(this.cropper, ur)), this;
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
    var a = this.options, i = this.canvasData, l = i.width, f = i.height, m = i.naturalWidth, g = i.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && a.zoomable) {
      var h = m * e, v = g * e;
      if (He(this.element, At, {
        ratio: e,
        oldRatio: l / m,
        originalEvent: n
      }) === !1)
        return this;
      if (n) {
        var b = this.pointers, A = Vr(this.cropper), $ = b && Object.keys(b).length ? Bs(b) : {
          pageX: n.pageX,
          pageY: n.pageY
        };
        i.left -= (h - l) * (($.pageX - A.left - i.left) / l), i.top -= (v - f) * (($.pageY - A.top - i.top) / f);
      } else
        ze(t) && K(t.x) && K(t.y) ? (i.left -= (h - l) * ((t.x - i.left) / l), i.top -= (v - f) * ((t.y - i.top) / f)) : (i.left -= (h - l) / 2, i.top -= (v - f) / 2);
      i.width = h, i.height = v, this.renderCanvas(!0);
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
      var f = n.width / n.naturalWidth;
      if (te(l, function(h, v) {
        l[v] = h / f;
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
      var f = n.width / n.naturalWidth;
      K(e.x) && (i.left = e.x * f + a.left), K(e.y) && (i.top = e.y * f + a.top), K(e.width) && (i.width = e.width * f), K(e.height) && (i.height = e.height * f), this.setCropBoxData(i);
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
    return this.ready && te(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(n) {
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
    var t = this.canvasData, n = Hs(this.image, this.imageData, t, e);
    if (!this.cropped)
      return n;
    var a = this.getData(), i = a.x, l = a.y, f = a.width, m = a.height, g = n.width / Math.floor(t.naturalWidth);
    g !== 1 && (i *= g, l *= g, f *= g, m *= g);
    var h = f / m, v = Me({
      aspectRatio: h,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Me({
      aspectRatio: h,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), A = Me({
      aspectRatio: h,
      width: e.width || (g !== 1 ? n.width : f),
      height: e.height || (g !== 1 ? n.height : m)
    }), $ = A.width, D = A.height;
    $ = Math.min(v.width, Math.max(b.width, $)), D = Math.min(v.height, Math.max(b.height, D));
    var P = document.createElement("canvas"), B = P.getContext("2d");
    P.width = Re($), P.height = Re(D), B.fillStyle = e.fillColor || "transparent", B.fillRect(0, 0, $, D);
    var I = e.imageSmoothingEnabled, U = I === void 0 ? !0 : I, se = e.imageSmoothingQuality;
    B.imageSmoothingEnabled = U, se && (B.imageSmoothingQuality = se);
    var X = n.width, C = n.height, Y = i, F = l, le, j, R, N, J, V;
    Y <= -f || Y > X ? (Y = 0, le = 0, R = 0, J = 0) : Y <= 0 ? (R = -Y, Y = 0, le = Math.min(X, f + Y), J = le) : Y <= X && (R = 0, le = Math.min(f, X - Y), J = le), le <= 0 || F <= -m || F > C ? (F = 0, j = 0, N = 0, V = 0) : F <= 0 ? (N = -F, F = 0, j = Math.min(C, m + F), V = j) : F <= C && (N = 0, j = Math.min(m, C - F), V = j);
    var W = [Y, F, le, j];
    if (J > 0 && V > 0) {
      var oe = $ / f;
      W.push(R * oe, N * oe, J * oe, V * oe);
    }
    return B.drawImage.apply(B, [n].concat(Mr(W.map(function(Pe) {
      return Math.floor(Re(Pe));
    })))), P;
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
}, tl = we.Cropper, Br = /* @__PURE__ */ function() {
  function o(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (ms(this, o), !e || !$s.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = G({}, wr, ze(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return ps(o, [{
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
        if (Cs.test(t)) {
          Ms.test(t) ? this.read(Ys(t)) : this.clone();
          return;
        }
        var l = new XMLHttpRequest(), f = this.clone.bind(this);
        this.reloading = !0, this.xhr = l, l.onabort = f, l.onerror = f, l.ontimeout = f, l.onprogress = function() {
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
      var n = this.options, a = this.imageData, i = Xs(t), l = 0, f = 1, m = 1;
      if (i > 1) {
        this.url = Ws(t, yr);
        var g = Fs(i);
        l = g.rotate, f = g.scaleX, m = g.scaleY;
      }
      n.rotatable && (a.rotate = l), n.scalable && (a.scaleX = f, a.scaleY = m), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, n = this.url, a = t.crossOrigin, i = n;
      this.options.checkCrossOrigin && _r(n) && (a || (a = "anonymous"), i = kr(n)), this.crossOrigin = a, this.crossOriginUrl = i;
      var l = document.createElement("img");
      a && (l.crossOrigin = a), l.src = i || n, l.alt = t.alt || "The image to crop", this.image = l, l.onload = this.start.bind(this), l.onerror = this.stop.bind(this), re(l, dr), t.parentNode.insertBefore(l, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, n = this.image;
      n.onload = null, n.onerror = null, this.sizing = !0;
      var a = we.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(we.navigator.userAgent), i = function(g, h) {
        G(t.imageData, {
          naturalWidth: g,
          naturalHeight: h,
          aspectRatio: g / h
        }), t.initialImageData = G({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (n.naturalWidth && !a) {
        i(n.naturalWidth, n.naturalHeight);
        return;
      }
      var l = document.createElement("img"), f = document.body || document.documentElement;
      this.sizingImage = l, l.onload = function() {
        i(l.width, l.height), a || f.removeChild(l);
      }, l.src = n.src, a || (l.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", f.appendChild(l));
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
        l.innerHTML = Es;
        var f = l.querySelector(".".concat(q, "-container")), m = f.querySelector(".".concat(q, "-canvas")), g = f.querySelector(".".concat(q, "-drag-box")), h = f.querySelector(".".concat(q, "-crop-box")), v = h.querySelector(".".concat(q, "-face"));
        this.container = i, this.cropper = f, this.canvas = m, this.dragBox = g, this.cropBox = h, this.viewBox = f.querySelector(".".concat(q, "-view-box")), this.face = v, m.appendChild(a), re(t, ue), i.insertBefore(f, t.nextSibling), this.isImg || be(a, dr), this.initPreview(), this.bind(), n.initialAspectRatio = Math.max(0, n.initialAspectRatio) || NaN, n.aspectRatio = Math.max(0, n.aspectRatio) || NaN, n.viewMode = Math.max(0, Math.min(3, Math.round(n.viewMode))) || 0, re(h, ue), n.guides || re(h.getElementsByClassName("".concat(q, "-dashed")), ue), n.center || re(h.getElementsByClassName("".concat(q, "-center")), ue), n.background && re(f, "".concat(q, "-bg")), n.highlight || re(v, xs), n.cropBoxMovable && (re(v, Ct), et(v, Qe, Nt)), n.cropBoxResizable || (re(h.getElementsByClassName("".concat(q, "-line")), ue), re(h.getElementsByClassName("".concat(q, "-point")), ue)), this.render(), this.ready = !0, this.setDragMode(n.dragMode), n.autoCrop && this.crop(), this.setData(n.data), ce(n.ready) && he(t, gr, n.ready, {
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
      return window.Cropper = tl, o;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      G(wr, ze(t) && t);
    }
  }]), o;
}();
G(Br.prototype, qs, Gs, Js, Zs, Qs, el);
const rl = { class: "flex" }, il = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, nl = { class: "ml-auto mb-2" }, ol = { class: "w-full flex justify-center" }, al = ["src"], sl = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), a = () => n.value + "?" + Oe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path }), i = z(null), l = z(null), f = z(!1), m = () => {
      f.value = !f.value, f.value ? l.value = new Br(i.value, {
        crop(h) {
        }
      }) : l.value.destroy();
    }, g = () => {
      l.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (h) => {
          dt(n.value, {
            method: "POST",
            params: { q: "upload", adapter: t.selection.adapter, path: t.selection.item.path, file: h },
            name: t.selection.item.basename,
            json: !1
          }).then((v) => {
            i.value.src = a(), m(), e("load");
          }).catch((v) => console.log(v.statusText));
        }
      );
    };
    return onMounted(() => {
      e("load");
    }), (h, v) => (x(), M(ne, null, [
      d("div", rl, [
        d("h3", il, T(o.selection.item.basename), 1),
        d("div", nl, [
          f.value ? (x(), M("button", {
            key: 0,
            onClick: g,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Crop")) : ie("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: v[0] || (v[0] = (b) => m())
          }, T(f.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      d("div", ol, [
        d("img", {
          ref_key: "image",
          ref: i,
          class: "max-w-[60vh] max-h-[60vh]",
          src: a(),
          alt: ""
        }, null, 8, al)
      ])
    ], 64));
  }
}, ll = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, cl = /* @__PURE__ */ d("div", null, " Default view.. ", -1), ul = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    return ye(() => {
      e("load");
    }), (t, n) => (x(), M(ne, null, [
      d("h3", ll, T(o.selection.item.basename), 1),
      cl
    ], 64));
  }
}, dl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, hl = {
  class: "w-full",
  preload: "",
  controls: ""
}, fl = ["src"], ml = /* @__PURE__ */ De(" Your browser does not support the video tag. "), pl = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), a = () => n.value + "?" + Oe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return ye(() => {
      e("load");
    }), (i, l) => (x(), M(ne, null, [
      d("h3", dl, T(o.selection.item.basename), 1),
      d("div", null, [
        d("video", hl, [
          d("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, fl),
          ml
        ])
      ])
    ], 64));
  }
}, gl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, vl = {
  class: "w-full",
  controls: ""
}, bl = ["src"], yl = /* @__PURE__ */ De(" Your browser does not support the audio element. "), wl = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), a = () => n.value + "?" + Oe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return ye(() => {
      e("load");
    }), (i, l) => (x(), M(ne, null, [
      d("h3", gl, T(o.selection.item.basename), 1),
      d("div", null, [
        d("audio", vl, [
          d("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, bl),
          yl
        ])
      ])
    ], 64));
  }
}, xl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, _l = ["data"], kl = ["src"], Sl = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), a = () => n.value + "?" + Oe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return ye(() => {
      e("load");
    }), (i, l) => (x(), M(ne, null, [
      d("h3", xl, T(o.selection.item.basename), 1),
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
        `, 8, kl)
        ], 8, _l)
      ])
    ], 64));
  }
}, Dl = { class: "sm:flex sm:items-start" }, Cl = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Ml = { class: "text-gray-700 dark:text-gray-200 text-sm" }, $l = {
  key: 0,
  class: "flex leading-5"
}, El = /* @__PURE__ */ d("svg", {
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
], -1), Tl = {
  name: "VFModalPreview"
}, Al = /* @__PURE__ */ Object.assign(Tl, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = o, { apiUrl: t } = _e(), n = inject("emitter"), { t: a } = inject("i18n"), i = z(!1), l = (g) => i.value = g, f = (g) => {
      var h;
      return ((h = e.selection.item.mime_type) != null ? h : "").startsWith(g);
    }, m = () => {
      const g = t.value + "?" + Oe({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      n.emit("vf-download", g);
    };
    return (g, h) => (x(), ae(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: h[6] || (h[6] = (v) => S(n).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(a)("Close")), 1),
        d("button", {
          type: "button",
          onClick: h[7] || (h[7] = (v) => m()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(a)("Download")), 1)
      ]),
      default: Q(() => [
        d("div", Dl, [
          d("div", Cl, [
            d("div", null, [
              f("text") ? (x(), ae(fs, {
                key: 0,
                selection: o.selection,
                onLoad: h[0] || (h[0] = (v) => l(!0))
              }, null, 8, ["selection"])) : f("image") ? (x(), ae(sl, {
                key: 1,
                selection: o.selection,
                onLoad: h[1] || (h[1] = (v) => l(!0))
              }, null, 8, ["selection"])) : f("video") ? (x(), ae(pl, {
                key: 2,
                selection: o.selection,
                onLoad: h[2] || (h[2] = (v) => l(!0))
              }, null, 8, ["selection"])) : f("audio") ? (x(), ae(wl, {
                key: 3,
                selection: o.selection,
                onLoad: h[3] || (h[3] = (v) => l(!0))
              }, null, 8, ["selection"])) : f("application/pdf") ? (x(), ae(Sl, {
                key: 4,
                selection: o.selection,
                onLoad: h[4] || (h[4] = (v) => l(!0))
              }, null, 8, ["selection"])) : (x(), ae(ul, {
                key: 5,
                selection: o.selection,
                onLoad: h[5] || (h[5] = (v) => l(!0))
              }, null, 8, ["selection"]))
            ]),
            d("div", Ml, [
              d("p", null, T(o.selection.item.path), 1),
              d("p", null, "mime_type: " + T(o.selection.item.mime_type), 1),
              i.value == !1 ? (x(), M("div", $l, [
                El,
                d("span", null, T(S(a)("Loading")), 1)
              ])) : ie("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ol = { class: "sm:flex sm:items-start" }, Pl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), jl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Il = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Nl = { class: "mt-2" }, Ll = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Vl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zl = /* @__PURE__ */ d("path", {
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
}, Hl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ul = [
  Hl
], Kl = { class: "ml-1.5" }, Yl = ["onKeyup"], Wl = {
  name: "VFModalRename"
}, Xl = /* @__PURE__ */ Object.assign(Wl, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), { t: a } = inject("i18n"), i = z(e.selection.items[0]), l = z(e.selection.items[0].basename), f = () => {
      l.value != "" && t.emit("vf-fetch", {
        q: "rename",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: i.value.path,
        name: l.value
      });
    };
    return (m, g) => (x(), ae(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(a)("Rename")), 1),
        d("button", {
          type: "button",
          onClick: g[1] || (g[1] = (h) => S(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(a)("Cancel")), 1)
      ]),
      default: Q(() => [
        d("div", Ol, [
          Pl,
          d("div", jl, [
            d("h3", Il, T(S(a)("Rename")), 1),
            d("div", Nl, [
              d("p", Ll, [
                i.value.type == "dir" ? (x(), M("svg", Vl, Bl)) : (x(), M("svg", Rl, Ul)),
                d("span", Kl, T(i.value.basename), 1)
              ]),
              me(d("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (h) => l.value = h),
                onKeyup: Ue(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Yl), [
                [Ke, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fl = { class: "sm:flex sm:items-start" }, ql = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Gl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Jl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Zl = { class: "mt-2" }, Ql = { class: "text-gray-500 mb-1" }, ec = ["id"], tc = {
  key: 0,
  class: "py-2"
}, rc = ["disabled", "onClick"], ic = {
  name: "VFModalUpload"
}, nc = /* @__PURE__ */ Object.assign(ic, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { apiUrl: n } = _e(), { t: a } = inject("i18n"), i = z(null), l = z(null), f = z(null), m = z([]), g = z(!0), h = () => {
      i.value.start();
    };
    return ye(() => {
      i.value = new yt.Uploader({
        runtimes: "html5",
        browse_button: f.value,
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
    }), (v, b) => (x(), ae(xe, null, {
      buttons: Q(() => [
        d("button", {
          disabled: g.value,
          onClick: Te(h, ["prevent"]),
          type: "button",
          class: fe([g.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, T(S(a)("Upload")), 11, rc),
        d("button", {
          type: "button",
          onClick: b[0] || (b[0] = (A) => S(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(a)("Cancel")), 1)
      ]),
      default: Q(() => [
        d("div", Fl, [
          ql,
          d("div", Gl, [
            d("h3", Jl, T(S(a)("Upload files")), 1),
            d("div", Zl, [
              d("div", Ql, [
                (x(!0), M(ne, null, pe(m.value, (A) => (x(), M("div", null, [
                  d("div", {
                    id: A.id
                  }, [
                    De(T(A.name) + " ( " + T(A.size) + ") ", 1),
                    d("b", null, T(A.percent), 1)
                  ], 8, ec)
                ]))), 256)),
                m.value.length ? ie("", !0) : (x(), M("div", tc, T(S(a)("No files selected!")), 1))
              ]),
              d("div", {
                class: "text-gray-500",
                ref_key: "container",
                ref: l
              }, [
                d("button", {
                  ref_key: "pickFiles",
                  ref: f,
                  type: "button",
                  class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                }, T(S(a)("Select Files")), 513)
              ], 512)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), oc = { class: "sm:flex sm:items-start" }, ac = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), sc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, lc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, cc = { class: "mt-2" }, uc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, dc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), fc = [
  hc
], mc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), gc = [
  pc
], vc = { class: "ml-1.5" }, bc = ["onKeyup", "placeholder"], yc = {
  name: "VFModalArchive"
}, wc = /* @__PURE__ */ Object.assign(yc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), { t: a } = inject("i18n"), i = z(""), l = z(e.selection.items), f = () => {
      l.value.length && t.emit("vf-fetch", {
        q: "archive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(l.value.map(({ path: m, type: g }) => ({ path: m, type: g }))),
        name: i.value
      });
    };
    return (m, g) => (x(), ae(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(a)("Archive")), 1),
        d("button", {
          type: "button",
          onClick: g[1] || (g[1] = (h) => S(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(a)("Cancel")), 1)
      ]),
      default: Q(() => [
        d("div", oc, [
          ac,
          d("div", sc, [
            d("h3", lc, T(S(a)("Archive the files")), 1),
            d("div", cc, [
              (x(!0), M(ne, null, pe(l.value, (h) => (x(), M("p", uc, [
                h.type == "dir" ? (x(), M("svg", dc, fc)) : (x(), M("svg", mc, gc)),
                d("span", vc, T(h.basename), 1)
              ]))), 256)),
              me(d("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (h) => i.value = h),
                onKeyup: Ue(f, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: S(a)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, bc), [
                [Ke, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), xc = { class: "sm:flex sm:items-start" }, _c = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), kc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Sc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Dc = { class: "mt-2" }, Cc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Mc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $c = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ec = [
  $c
], Tc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ac = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Oc = [
  Ac
], Pc = { class: "ml-1.5" }, jc = { class: "my-1 text-sm text-gray-500" }, Ic = {
  name: "VFModalUnarchive"
}, Nc = /* @__PURE__ */ Object.assign(Ic, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), { t: a } = inject("i18n");
    z("");
    const i = z(e.selection.items[0]), l = z([]), f = () => {
      t.emit("vf-fetch", {
        q: "unarchive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: i.value.path
      });
    };
    return (m, g) => (x(), ae(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(a)("Unarchive")), 1),
        d("button", {
          type: "button",
          onClick: g[0] || (g[0] = (h) => S(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(a)("Cancel")), 1)
      ]),
      default: Q(() => [
        d("div", xc, [
          _c,
          d("div", kc, [
            d("h3", Sc, T(S(a)("Unarchive")), 1),
            d("div", Dc, [
              (x(!0), M(ne, null, pe(l.value, (h) => (x(), M("p", Cc, [
                h.type == "dir" ? (x(), M("svg", Mc, Ec)) : (x(), M("svg", Tc, Oc)),
                d("span", Pc, T(h.basename), 1)
              ]))), 256)),
              d("p", jc, T(S(a)("The archive will be unarchived at")) + " (" + T(o.current.dirname) + ")", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Lc = { class: "sm:flex sm:items-start" }, Vc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), zc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Bc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Rc = { class: "mt-2" }, Hc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Uc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Yc = [
  Kc
], Wc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Fc = [
  Xc
], qc = { class: "ml-1.5" }, Gc = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Bu dosyalar\u0131 ta\u015F\u0131mak istedi\u011Finizden emin misiniz?", -1), Jc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Zc = /* @__PURE__ */ d("svg", {
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
], -1), Qc = { class: "ml-1.5 overflow-auto" }, eu = {
  name: "VFModalMove"
}, tu = /* @__PURE__ */ Object.assign(eu, {
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
        items: JSON.stringify(i.value.map(({ path: f, type: m }) => ({ path: f, type: m }))),
        item: e.selection.items.to.path
      });
    };
    return (f, m) => (x(), ae(xe, null, {
      buttons: Q(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(n)("Yes, Move!")), 1),
        d("button", {
          type: "button",
          onClick: m[0] || (m[0] = (g) => S(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(S(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        d("div", Lc, [
          Vc,
          d("div", zc, [
            d("h3", Bc, T(S(n)("Move files")), 1),
            d("div", Rc, [
              (x(!0), M(ne, null, pe(i.value, (g) => (x(), M("p", Hc, [
                g.type == "dir" ? (x(), M("svg", Uc, Yc)) : (x(), M("svg", Wc, Fc)),
                d("span", qc, T(g.path), 1)
              ]))), 256)),
              Gc,
              d("p", Jc, [
                Zc,
                d("span", Qc, T(o.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ru = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: Ia,
  ModalMessage: Ua,
  ModalNewFolder: Za,
  ModalNewFile: ss,
  ModalPreview: Al,
  ModalRename: Xl,
  ModalUpload: nc,
  ModalArchive: wc,
  ModalUnarchive: Nc,
  ModalMove: tu
}, Symbol.toStringTag, { value: "Module" })), _t = {
  VueFinder: fa,
  ...ru
};
const ou = {
  install(o) {
    for (const e in _t)
      if (_t.hasOwnProperty(e)) {
        const t = _t[e];
        o.component(t.name, t);
      }
  }
};
export {
  ou as default
};
