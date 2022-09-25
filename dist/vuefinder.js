import { ref as j, watch as jt, inject as R, openBlock as w, createElementBlock as M, createElementVNode as d, unref as _, normalizeClass as ue, createTextVNode as de, toDisplayString as C, createCommentVNode as q, createVNode as we, TransitionGroup as Ai, withCtx as F, Fragment as le, renderList as be, reactive as ht, onMounted as _e, onUpdated as Oi, withDirectives as ve, vShow as st, withModifiers as Oe, nextTick as pt, vModelSelect as cr, customRef as Pi, withKeys as Ye, isRef as Ii, vModelText as We, normalizeStyle as Cr, provide as wt, createBlock as ee, resolveDynamicComponent as Ni, renderSlot as Dt } from "vue";
import xt from "plupload";
const ft = (o, { method: e = "get", params: t = {}, json: n = !0 }) => {
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
  return fetch(o, a).then((i) => i.ok ? n ? i.json() : i.text() : i.json().then(Promise.reject.bind(Promise)));
};
function Li(o) {
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
function Mt(o) {
  let e = localStorage.getItem(o + "_storage");
  const t = j(JSON.parse(e));
  jt(t, n);
  function n() {
    t.value === null || t.value === "" ? localStorage.removeItem(o + "_storage") : localStorage.setItem(o + "_storage", JSON.stringify(t.value));
  }
  function a(f, v) {
    t.value = Object.assign({ ...t.value }, { [f]: v });
  }
  function i() {
    t.value = null;
  }
  return { getStore: (f, v = null) => t.value === null || t.value === "" ? v : t.value.hasOwnProperty(f) ? t.value[f] : v, setStore: a, clearStore: i };
}
const ur = j("");
function Se() {
  function o(e) {
    ur.value = e;
  }
  return { apiUrl: ur, setApiUrl: o };
}
const ji = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Vi = {
  key: 0,
  class: "flex text-center"
}, zi = ["aria-label"], Bi = /* @__PURE__ */ d("svg", {
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
], -1), Ri = [
  Bi
], Hi = ["aria-label"], Ui = /* @__PURE__ */ d("svg", {
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
], -1), Ki = [
  Ui
], Yi = ["aria-label"], Wi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Xi = [
  Wi
], Fi = ["aria-label"], qi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), Gi = [
  qi
], Ji = ["aria-label"], Zi = /* @__PURE__ */ d("svg", {
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
], -1), Qi = [
  Zi
], en = ["aria-label"], tn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), rn = [
  tn
], nn = ["aria-label"], on = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), an = [
  on
], sn = {
  key: 1,
  class: "flex text-center"
}, ln = { class: "pl-2" }, cn = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, un = { class: "flex text-center items-center justify-end" }, dn = ["aria-label"], hn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), fn = [
  hn
], mn = ["aria-label"], pn = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, gn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, vn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, bn = ["aria-label"], yn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, wn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, xn = {
  name: "VFToolbar"
}, _n = /* @__PURE__ */ Object.assign(xn, {
  props: {
    data: Object
  },
  setup(o) {
    const e = R("emitter"), { getStore: t, setStore: n } = R("storage"), { t: a } = R("i18n"), i = j(t("viewport", "grid")), l = j([]), f = j(t("full-screen", !1)), v = j("");
    e.on("vf-search-query", ({ newQuery: h }) => {
      v.value = h;
    });
    const p = () => {
      f.value = !f.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (h) => {
      l.value = h;
    }), e.on("vf-view-toggle", (h) => {
      n("viewport", h), i.value = h;
    }), (h, m) => (w(), M("div", ji, [
      v.value.length ? (w(), M("div", sn, [
        d("div", ln, [
          de(C(_(a)("Search results for")) + " ", 1),
          d("span", cn, C(v.value), 1)
        ])
      ])) : (w(), M("div", Vi, [
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: m[0] || (m[0] = (b) => _(e).emit("vf-modal-show", { type: "new-folder", items: l.value }))
        }, Ri, 8, zi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[1] || (m[1] = (b) => _(e).emit("vf-modal-show", { type: "new-file", items: l.value }))
        }, Ki, 8, Hi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[2] || (m[2] = (b) => l.value.length != 1 || _(e).emit("vf-modal-show", { type: "rename", items: l.value }))
        }, [
          (w(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([l.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Xi, 2))
        ], 8, Yi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[3] || (m[3] = (b) => !l.value.length || _(e).emit("vf-modal-show", { type: "delete", items: l.value }))
        }, [
          (w(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Gi, 2))
        ], 8, Fi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[4] || (m[4] = (b) => _(e).emit("vf-modal-show", { type: "upload", items: l.value }))
        }, Qi, 8, Ji),
        l.value.length == 1 && l.value[0].mime_type == "application/zip" ? (w(), M("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": _(a)("Unrchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[5] || (m[5] = (b) => !l.value.length || _(e).emit("vf-modal-show", { type: "unarchive", items: l.value }))
        }, [
          (w(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, rn, 2))
        ], 8, en)) : (w(), M("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": _(a)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[6] || (m[6] = (b) => !l.value.length || _(e).emit("vf-modal-show", { type: "archive", items: l.value }))
        }, [
          (w(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, an, 2))
        ], 8, nn))
      ])),
      d("div", un, [
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (w(), M("svg", {
            onClick: m[7] || (m[7] = (b) => _(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, fn))
        ], 8, dn),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Toggle Full Screen"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p
        }, [
          (w(), M("svg", pn, [
            f.value ? (w(), M("path", gn)) : (w(), M("path", vn))
          ]))
        ], 8, mn),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: m[8] || (m[8] = (b) => v.value.length || _(e).emit("vf-view-toggle", i.value == "list" ? "grid" : "list"))
        }, [
          (w(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([v.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            i.value == "grid" ? (w(), M("path", yn)) : q("", !0),
            i.value == "list" ? (w(), M("path", wn)) : q("", !0)
          ], 2))
        ], 8, bn)
      ])
    ]));
  }
});
var kn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, $r = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(kn, function() {
    function t(u, s) {
      if (!(u instanceof s))
        throw new TypeError("Cannot call a class as a function");
    }
    function n(u, s) {
      for (var r = 0; r < s.length; r++) {
        var g = s[r];
        g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(u, g.key, g);
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
        var g = Object.getOwnPropertySymbols(u);
        s && (g = g.filter(function(c) {
          return Object.getOwnPropertyDescriptor(u, c).enumerable;
        })), r.push.apply(r, g);
      }
      return r;
    }
    function f(u) {
      for (var s = 1; s < arguments.length; s++) {
        var r = arguments[s] != null ? arguments[s] : {};
        s % 2 ? l(Object(r), !0).forEach(function(g) {
          i(u, g, r[g]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(r)) : l(Object(r)).forEach(function(g) {
          Object.defineProperty(u, g, Object.getOwnPropertyDescriptor(r, g));
        });
      }
      return u;
    }
    function v(u, s) {
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
    function p(u) {
      return p = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, p(u);
    }
    function h(u, s) {
      return h = Object.setPrototypeOf || function(g, c) {
        return g.__proto__ = c, g;
      }, h(u, s);
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
    function b(u, s, r) {
      return m() ? b = Reflect.construct : b = function(c, y, x) {
        var k = [null];
        k.push.apply(k, y);
        var S = Function.bind.apply(c, k), O = new S();
        return x && h(O, x.prototype), O;
      }, b.apply(null, arguments);
    }
    function A(u) {
      return Function.toString.call(u).indexOf("[native code]") !== -1;
    }
    function $(u) {
      var s = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return $ = function(g) {
        if (g === null || !A(g))
          return g;
        if (typeof g != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof s < "u") {
          if (s.has(g))
            return s.get(g);
          s.set(g, c);
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
      }, $(u);
    }
    function T(u) {
      if (u === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return u;
    }
    function N(u, s) {
      return s && (typeof s == "object" || typeof s == "function") ? s : T(u);
    }
    function z(u) {
      var s = m();
      return function() {
        var g = p(u), c;
        if (s) {
          var y = p(this).constructor;
          c = Reflect.construct(g, arguments, y);
        } else
          c = g.apply(this, arguments);
        return N(this, c);
      };
    }
    function B(u, s) {
      for (; !Object.prototype.hasOwnProperty.call(u, s) && (u = p(u), u !== null); )
        ;
      return u;
    }
    function P(u, s, r) {
      return typeof Reflect < "u" && Reflect.get ? P = Reflect.get : P = function(c, y, x) {
        var k = B(c, y);
        if (!!k) {
          var S = Object.getOwnPropertyDescriptor(k, y);
          return S.get ? S.get.call(x) : S.value;
        }
      }, P(u, s, r || u);
    }
    function ae(u, s) {
      return X(u) || ce(u, s) || me(u, s) || I();
    }
    function G(u) {
      return D(u) || J(u) || me(u) || U();
    }
    function D(u) {
      if (Array.isArray(u))
        return L(u);
    }
    function X(u) {
      if (Array.isArray(u))
        return u;
    }
    function J(u) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(u))
        return Array.from(u);
    }
    function ce(u, s) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(u)))) {
        var r = [], g = !0, c = !1, y = void 0;
        try {
          for (var x = u[Symbol.iterator](), k; !(g = (k = x.next()).done) && (r.push(k.value), !(s && r.length === s)); g = !0)
            ;
        } catch (S) {
          c = !0, y = S;
        } finally {
          try {
            !g && x.return != null && x.return();
          } finally {
            if (c)
              throw y;
          }
        }
        return r;
      }
    }
    function me(u, s) {
      if (!!u) {
        if (typeof u == "string")
          return L(u, s);
        var r = Object.prototype.toString.call(u).slice(8, -1);
        if (r === "Object" && u.constructor && (r = u.constructor.name), r === "Map" || r === "Set")
          return Array.from(u);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return L(u, s);
      }
    }
    function L(u, s) {
      (s == null || s > u.length) && (s = u.length);
      for (var r = 0, g = new Array(s); r < s; r++)
        g[r] = u[r];
      return g;
    }
    function U() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function I() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var Y = function(s, r, g) {
      var c = s.x, y = s.y, x = g.x, k = g.y, S = {
        "+": {
          x: c + x,
          y: y + k
        },
        "-": {
          x: c - x,
          y: y - k
        },
        "*": {
          x: c * x,
          y: y * k
        },
        "/": {
          x: c / x,
          y: y / k
        }
      };
      return S[r];
    }, H = function(s) {
      return {
        x: s.left,
        y: s.top
      };
    }, ie = function(s) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: s.x,
        top: s.y,
        right: s.x,
        bottom: s.y,
        width: r,
        height: r
      };
    }, Z = function(s) {
      return {
        x: s,
        y: s
      };
    }, Xe = function(u, s, r) {
      window.addEventListener("resize", s), window.addEventListener("scroll", s), u.forEach(function(g, c) {
        r.observe(g, {
          childList: c !== 0,
          attributes: !0
        });
      });
    }, Fe = function(u) {
      var s = je(u);
      return s.x || s.y ? !0 : u instanceof HTMLDocument ? u.body ? !!(u.body.scrollTop = 1) : !!(u.documentElement.scrollTop = 1) : !!(u.scrollTop = 1);
    }, it = function(u) {
      var s = document.createElement("div");
      return s.style.position = "fixed", s.style.overflow = "hidden", s.style.pointerEvents = "none", s.style.zIndex = "999999999999999999", s.classList.add(u), s;
    }, nt = function(u) {
      var s = document.createElement("div");
      return s.style.position = "absolute", u || (s.style.background = "rgba(0, 0, 255, 0.1)", s.style.border = "1px solid rgba(0, 0, 255, 0.45)", s.style.display = "none", s.style.pointerEvents = "none"), s;
    }, ot = function(u, s) {
      var r;
      return function() {
        for (var g = arguments.length, c = new Array(g), y = 0; y < g; y++)
          c[y] = arguments[y];
        var x = function() {
          r = null, u.apply(void 0, c);
        };
        clearTimeout(r), r = setTimeout(x, s);
      };
    }, Le = function() {
      var u, s, r, g;
      return {
        y: ((u = document.body) === null || u === void 0 ? void 0 : u.scrollTop) || ((s = document.documentElement) === null || s === void 0 ? void 0 : s.scrollTop) || 0,
        x: ((r = document.body) === null || r === void 0 ? void 0 : r.scrollLeft) || ((g = document.documentElement) === null || g === void 0 ? void 0 : g.scrollLeft) || 0
      };
    }, vt = function(u, s) {
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
    }, je = function(u) {
      return !u || u instanceof Document ? Le() : {
        x: u.scrollLeft >= 0 ? u.scrollLeft : Le().x,
        y: u.scrollTop >= 0 ? u.scrollTop : Le().y
      };
    }, Ut = function(u) {
      var s = u.elementRect, r = u.containerRect, g = u.tolerance, c = g === void 0 ? {
        x: 0,
        y: 0
      } : g, y = [];
      return s.top - c.y < r.top && y.push("top"), s.left - c.x < r.left && y.push("left"), s.bottom + c.y > r.bottom && y.push("bottom"), s.right + c.y > r.right && y.push("right"), y;
    }, Kr = function(u) {
      var s = u.event;
      return {
        x: s.clientX,
        y: s.clientY
      };
    }, Yr = function(u) {
      var s = u.scrollAmount, r = u.initialPointerPos, g = u.pointerPos, c = {};
      return g.x > r.x - s.x ? (c.left = r.x - s.x, c.width = g.x - r.x + s.x) : (c.left = g.x, c.width = r.x - g.x - s.x), g.y > r.y - s.y ? (c.top = r.y - s.y, c.height = g.y - r.y + s.y) : (c.top = g.y, c.height = r.y - g.y - s.y), c;
    }, Kt = function(s) {
      var r = {
        x: 0,
        y: 0
      }, g = window.getComputedStyle(s);
      if (!g.transform || g.transform === "none")
        return r;
      if (g.transform.indexOf("3d") >= 0) {
        var c = g.transform.trim().match(/matrix3d\((.*?)\)/);
        if (c && c.length) {
          var y, x = (y = c[1]) === null || y === void 0 ? void 0 : y.split(",");
          r.x = parseInt(x[12]) || 0, r.y = parseInt(x[13]) || 0;
        }
        return r;
      } else {
        var k = g.transform.trim().match(/matrix\((.*?)\)/);
        if (k && k.length) {
          var S, O = (S = k[1]) === null || S === void 0 ? void 0 : S.split(",");
          r.x = parseInt(O[4]) || 0, r.y = parseInt(O[5]) || 0;
        }
        return r;
      }
    }, Wr = function(s) {
      var r = s.style.transform;
      if (!r || r.indexOf("translate") < 0)
        return Kt(s);
      var g = {
        x: 0,
        y: 0
      }, c = r.trim().match(/translate[3dD]*?\(.*?\)/);
      if (c) {
        var y, x = (y = c[0]) === null || y === void 0 ? void 0 : y.split("(");
        if (x) {
          var k, S = (k = x[1]) === null || k === void 0 ? void 0 : k.split(",");
          g.x = parseInt(S[0]) || 0, g.y = parseInt(S[1]) || 0;
        }
      }
      return !g.x && !g.x ? Kt(s) : g;
    }, Xr = function(s) {
      var r = s.style, g = {
        x: parseInt(r.left) || 0,
        y: parseInt(r.top) || 0
      };
      if (!g.x && !g.x) {
        var c = window.getComputedStyle(s);
        return {
          x: parseInt(c.left) || 0,
          y: parseInt(c.top) || 0
        };
      }
      return g;
    }, Fr = function(u, s) {
      return s ? Wr(u) : Xr(u);
    }, qr = function(u) {
      var s = u.element, r = u.edges, g = u.elementRect, c = u.containerRect, y = u.elementPos, x = u.useTransform;
      r.includes("top") && qe(s, {
        y: y.y + c.top - g.top,
        x: y.x
      }, x), r.includes("left") && qe(s, {
        y: y.y,
        x: y.x + c.left - g.left
      }, x), r.includes("bottom") && qe(s, {
        y: y.y + c.bottom - g.bottom,
        x: y.x
      }, x), r.includes("right") && qe(s, {
        y: y.y,
        x: y.x + c.right - g.right
      }, x);
    }, Yt = function(u) {
      var s = u.computedStyle, r = u.node, g = s.position, c = g === "absolute" || g === "relative" || g === "fixed";
      !(r instanceof HTMLDocument) && !c && (r.style.position = "relative");
    }, Gr = function(u) {
      var s = u.shiftKey, r = u.keyboardDragSpeed, g = u.zoom, c = u.key, y = u.dragKeys, x = u.scrollDiff, k = u.canScroll, S = u.scrollCallback, O = {
        x: 0,
        y: 0
      }, E = s ? r * 4 * g : r * g;
      return y.left.includes(c) && (O.x = x.x || -E, !s && !x.x && k && S(["left"], r)), y.right.includes(c) && (O.x = x.x || E, !s && !x.x && k && S(["right"], r)), y.up.includes(c) && (O.y = x.y || -E, !s && !x.y && k && S(["top"], r)), y.down.includes(c) && (O.y = x.y || E, !s && !x.y && k && S(["bottom"], r)), O;
    }, Jr = function(u) {
      var s = u.element, r = u.force, g = u.multiSelectionToggle, c = u.SelectedSet, y = u.hoverClassName;
      s.classList.contains(y) && !r || (c.has(s) ? g && c.delete(s) : c.add(s), s.classList.add(y));
    }, Zr = function(u) {
      var s = u.element, r = u.force, g = u.SelectedSet, c = u.PrevSelectedSet, y = u.hoverClassName;
      if (!s.classList.contains(y) && !r)
        return !1;
      var x = g.has(s), k = c.has(s);
      x && !k ? g.delete(s) : !x && k && g.add(s), s.classList.remove(y);
    }, bt = function(u, s) {
      return u.left < s.right && u.right > s.left && u.top < s.bottom && u.bottom > s.top;
    }, Wt = function(u) {
      var s = u.element, r = u.posDirection, g = u.containerRect, c = u.useTransform, y = Fr(s, c), x = Y(y, "+", r);
      qe(s, x, c);
      var k = s.getBoundingClientRect(), S = Ut({
        elementRect: k,
        containerRect: g
      });
      qr({
        element: s,
        edges: S,
        elementRect: k,
        containerRect: g,
        elementPos: x,
        useTransform: c
      });
    }, Qr = function(u, s) {
      window.removeEventListener("resize", s), window.removeEventListener("scroll", s), u.disconnect();
    }, ei = function(u, s, r) {
      if (!!s.length) {
        var g = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, c = u instanceof HTMLDocument ? g || document.body : u, y = s.includes("top") && c.scrollTop > 0, x = s.includes("bottom") && c.scrollTop < c.scrollHeight, k = s.includes("left") && c.scrollLeft > 0, S = s.includes("right") && c.scrollLeft < c.scrollWidth;
        y && (c.scrollTop -= 1 * r), x && (c.scrollTop += 1 * r), k && (c.scrollLeft -= 1 * r), S && (c.scrollLeft += 1 * r);
      }
    }, qe = function(u, s, r) {
      if (r) {
        var g = u.style.transform;
        u.style.transform = "translate3d(".concat(s.x, "px,").concat(s.y, "px,1px) ").concat(g.replace(/translate.*?\)/g, ""));
      } else
        u.style.left = "".concat(s.x, "px"), u.style.top = "".concat(s.y, "px");
      return u;
    }, ti = function(u) {
      for (var s = u.subscribe, r = u.publish, g = u.Interaction, c = u.SelectedSet, y = {
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
      }, x = function() {
        var E = ae(S[k], 2), V = E[0], K = E[1];
        ["pre", !1].forEach(function(re) {
          return s(re ? "".concat(V, ":").concat(re) : V, function(pe) {
            return K.forEach(function(ne) {
              return (!ne.condition || ne.condition(pe)) && r(re ? "".concat(re).concat(ne.name) : ne.name, f({
                items: c.elements,
                isDragging: g.isDragging
              }, pe));
            });
          });
        });
      }, k = 0, S = Object.entries(y); k < S.length; k++)
        x();
    }, Ve = function(u) {
      return u ? !Array.isArray(u) && (u instanceof HTMLElement || u instanceof SVGElement) ? [u] : G(u) : [];
    }, Xt = function(u, s) {
      u.style.left = "".concat(s.left, "px"), u.style.top = "".concat(s.top, "px"), u.style.width = "".concat(s.width, "px"), u.style.height = "".concat(s.height, "px");
    }, ri = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.area, c = s.PS, y = s.zoom;
        t(this, u), i(this, "_modificationCallback", void 0), i(this, "_modificationObserver", void 0), i(this, "_zoom", void 0), i(this, "_node", void 0), i(this, "_parentNodes", void 0), i(this, "_computedStyle", void 0), i(this, "_computedBorder", void 0), i(this, "_rect", void 0), i(this, "setArea", function(x) {
          r._node = x, Yt({
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
          Xe(r.parentNodes, r._modificationCallback, r._modificationObserver);
        }), i(this, "reset", function() {
          r._computedStyle = void 0, r._rect = void 0, r._computedBorder = void 0, r._parentNodes = void 0;
        }), i(this, "stop", function() {
          Qr(r._modificationObserver, r._modificationCallback), r.reset();
        }), i(this, "scroll", function(x, k) {
          var S = {
            scroll_directions: x,
            scroll_multiplier: k
          };
          r.PubSub.publish("Area:scroll:pre", S), ei(r._node, x, k), r.PubSub.publish("Area:scroll", S);
        }), this._zoom = y, this.PubSub = c, this.setArea(g), this._modificationCallback = ot(function(x) {
          r.PubSub.publish("Area:modified:pre", {
            event: x,
            item: r
          }), r.reset(), r.PubSub.publish("Area:modified", {
            event: x,
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
          return this._rect ? this._rect : this._rect = vt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var r = function g(c) {
            var y, x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, k = (y = c[x]) === null || y === void 0 ? void 0 : y.parentNode;
            return k ? (c.push(k), x++, g(c, x)) : c;
          };
          return this._parentNodes = r([this.HTMLNode]), this._parentNodes;
        }
      }]), u;
    }(), ii = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.dragKeys, y = s.draggability, x = s.keyboardDrag, k = s.keyboardDragSpeed, S = s.useTransform, O = s.zoom;
        t(this, u), i(this, "_useTransform", void 0), i(this, "_prevCursorPos", void 0), i(this, "_prevScrollPos", void 0), i(this, "_elements", []), i(this, "_draggability", void 0), i(this, "_dragKeys", void 0), i(this, "_dragKeysFlat", void 0), i(this, "_keyboardDrag", void 0), i(this, "_keyboardDragSpeed", void 0), i(this, "_zoom", void 0), i(this, "keyboardDrag", function(E) {
          var V = E.event, K = E.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability || r.DS.continue)) {
            var re = {
              event: V,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:start:pre", "Interaction:start"], re), r._elements = r.DS.getSelection(), r.handleZIndex(!0);
            var pe = Gr({
              shiftKey: r.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: r._keyboardDragSpeed,
              zoom: r._zoom,
              key: K,
              scrollCallback: r.DS.Area.scroll,
              scrollDiff: r._scrollDiff,
              canScroll: r.DS.stores.ScrollStore.canScroll,
              dragKeys: r._dragKeys
            });
            r._elements.forEach(function(ne) {
              return Wt({
                element: ne,
                posDirection: pe,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], re);
          }
        }), i(this, "keyboardEnd", function(E) {
          var V = E.event, K = E.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability)) {
            var re = {
              event: V,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], re);
          }
        }), i(this, "start", function(E) {
          var V = E.isDragging, K = E.isDraggingKeyboard;
          !V || K || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), i(this, "stop", function(E) {
          E != null && E.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), i(this, "update", function(E) {
          var V = E.isDragging, K = E.isDraggingKeyboard;
          if (!(!V || !r._elements.length || K || r.DS.continue)) {
            var re = Y(r._cursorDiff, "+", r._scrollDiff);
            r._elements.forEach(function(pe) {
              return Wt({
                element: pe,
                posDirection: re,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            });
          }
        }), i(this, "handleZIndex", function(E) {
          r._elements.forEach(function(V) {
            return V.style.zIndex = "".concat((parseInt(V.style.zIndex) || 0) + E ? 9999 : -9998);
          });
        }), this.DS = g, this._useTransform = S, this._keyboardDragSpeed = k, this._keyboardDrag = x, this._zoom = O, this._draggability = y, this._dragKeys = {
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
        }, this._dragKeysFlat = [].concat(G(this._dragKeys.up), G(this._dragKeys.down), G(this._dragKeys.left), G(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return a(u, [{
        key: "_cursorDiff",
        get: function() {
          var r = this.DS.stores.PointerStore.currentVal, g = this._prevCursorPos ? Y(r, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = r, g;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var r = this.DS.stores.ScrollStore.currentVal, g = this._prevScrollPos ? Y(r, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = r, g;
        }
      }]), u;
    }(), ni = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.areaElement, y = s.draggability, x = s.immediateDrag, k = s.selectableClass;
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
            var E = r.DS, V = E.stores, K = V.PointerStore, re = V.KeyStore, pe = E.SelectableSet, ne = E.SelectedSet;
            K.start(O);
            var ze = O.target;
            !pe.has(ze) || (re.isMultiSelectKeyPressed(O) || ne.clear(), ne.toggle(ze), r.reset());
          }
        }), i(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), i(this, "update", function(S) {
          var O = S.event, E = S.scroll_directions, V = S.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: O,
            scroll_directions: E,
            scroll_multiplier: V,
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
        }), this._areaElement = c, this._draggability = y, this._immediateDrag = x, this._selectableClass = k, this.DS = g, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(S) {
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
          var g = r.clientX === 0 && r.clientY === 0 && r.detail === 0 && r.target;
          return !(r.button === 2 || this.isInteracting || r.target && !this.DS.SelectorArea.isInside(
            r.target
          ) || !g && !this.DS.SelectorArea.isClicked(r));
        }
      }]), u;
    }(), oi = function u(s) {
      var r = this, g = s.DS;
      t(this, u), i(this, "subscribers", {}), i(this, "subscribe", function(c, y) {
        return Array.isArray(r.subscribers[c]) || (r.subscribers[c] = []), r.subscribers[c].push(y), r.subscribers[c].length - 1;
      }), i(this, "unsubscribe", function(c, y, x) {
        x >= 0 ? r.subscribers[c].splice(x, 1) : y && (r.subscribers[c] = r.subscribers[c].filter(function(k) {
          return k !== y;
        }));
      }), i(this, "publish", function(c, y) {
        Array.isArray(c) ? c.forEach(function(x) {
          return r._publish(x, y);
        }) : r._publish(c, y);
      }), i(this, "_publish", function(c, y) {
        var x = r.subscribers[c];
        !Array.isArray(x) || (c.includes(":pre") ? r._handlePrePublish(x, y) : r._handlePublish(x, y));
      }), i(this, "_handlePublish", function(c, y) {
        for (var x = 0, k = c.length; x < k; x++) {
          if (r.DS.stopped)
            return;
          c[x](y);
        }
      }), i(this, "_handlePrePublish", function(c, y) {
        for (var x = c.length; x--; ) {
          if (r.DS.stopped)
            return;
          c[x](y);
        }
      }), this.DS = g;
    }, ai = /* @__PURE__ */ function(u) {
      v(r, u);
      var s = z(r);
      function r(g) {
        var c, y = g.elements, x = g.className, k = g.hoverClassName, S = g.draggability, O = g.useTransform, E = g.DS;
        return t(this, r), c = s.call(this), i(T(c), "_initElements", void 0), i(T(c), "_className", void 0), i(T(c), "_hoverClassName", void 0), i(T(c), "_useTransform", void 0), i(T(c), "_draggability", void 0), i(T(c), "init", function() {
          return c._initElements.forEach(function(V) {
            return c.add(V);
          });
        }), i(T(c), "clear", function() {
          return c.forEach(function(V) {
            return c.delete(V);
          });
        }), i(T(c), "_onClick", function(V) {
          return c.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: V
          });
        }), i(T(c), "_onPointer", function(V) {
          return c.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: V
          });
        }), i(T(c), "addAll", function(V) {
          return V.forEach(function(K) {
            return c.add(K);
          });
        }), i(T(c), "deleteAll", function(V) {
          return V.forEach(function(K) {
            return c.delete(K);
          });
        }), c.DS = E, c._initElements = Ve(y), c._className = x, c._hoverClassName = k, c._useTransform = O, c._draggability = S, c.DS.subscribe("Interaction:init", c.init), c;
      }
      return a(r, [{
        key: "add",
        value: function(c) {
          return c.classList.add(this._className), c.addEventListener("click", this._onClick), c.addEventListener("mousedown", this._onPointer), c.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Yt({
            computedStyle: window.getComputedStyle(c),
            node: c
          }), P(p(r.prototype), "add", this).call(this, c);
        }
      }, {
        key: "delete",
        value: function(c) {
          return c.classList.remove(this._className), c.classList.remove(this._hoverClassName), c.removeEventListener("click", this._onClick), c.removeEventListener("mousedown", this._onPointer), c.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), P(p(r.prototype), "delete", this).call(this, c);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ $(Set)), si = /* @__PURE__ */ function(u) {
      v(r, u);
      var s = z(r);
      function r(g) {
        var c, y = g.className, x = g.DS;
        return t(this, r), c = s.call(this), i(T(c), "_className", void 0), i(T(c), "clear", function() {
          return c.forEach(function(k) {
            return c.delete(k);
          });
        }), i(T(c), "addAll", function(k) {
          return k.forEach(function(S) {
            return c.add(S);
          });
        }), i(T(c), "deleteAll", function(k) {
          return k.forEach(function(S) {
            return c.delete(S);
          });
        }), c.DS = x, c._className = y, c;
      }
      return a(r, [{
        key: "add",
        value: function(c) {
          if (!P(p(r.prototype), "has", this).call(this, c)) {
            var y = {
              items: this.elements,
              item: c
            };
            return this.DS.publish("Selected:added:pre", y), P(p(r.prototype), "add", this).call(this, c), c.classList.add(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", y), this;
          }
        }
      }, {
        key: "delete",
        value: function(c) {
          if (!!P(p(r.prototype), "has", this).call(this, c)) {
            var y = {
              items: this.elements,
              item: c
            };
            this.DS.publish("Selected:removed:pre", y);
            var x = P(p(r.prototype), "delete", this).call(this, c);
            return c.classList.remove(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", y), x;
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
    }(/* @__PURE__ */ $(Set)), li = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.hoverClassName, y = s.multiSelectToggling;
        t(this, u), i(this, "_prevSelectedSet", void 0), i(this, "_hoverClassName", void 0), i(this, "_multiSelectToggling", void 0), i(this, "start", function(x) {
          var k = x.event, S = x.isDragging;
          S || (r._storePrevious(k), r._handleInsideSelection(!0, k));
        }), i(this, "update", function(x) {
          var k = x.isDragging;
          k || r.DS.continue || r._handleInsideSelection();
        }), i(this, "_handleInsideSelection", function(x, k) {
          for (var S = r.DS, O = S.SelectableSet, E = S.SelectorArea, V = S.Selector, K = O.elements.map(function(Me) {
            return [Me, Me.getBoundingClientRect()];
          }), re = [], pe = [], ne = 0, ze = K.length; ne < ze; ne++)
            !E.isInside(K[ne][0], K[ne][1]) || (bt(K[ne][1], V.rect) ? re.push(K[ne][0]) : pe.push(K[ne][0]));
          var at = r.DS.stores.KeyStore.isMultiSelectKeyPressed(k) && r._multiSelectToggling;
          r.DS.continue || (re.forEach(function(Me) {
            return Jr({
              element: Me,
              force: x,
              multiSelectionToggle: at,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName
            });
          }), pe.forEach(function(Me) {
            return Zr({
              element: Me,
              force: x,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName,
              PrevSelectedSet: r._prevSelectedSet
            });
          }));
        }), this._hoverClassName = c, this._multiSelectToggling = y, this.DS = g, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return a(u, [{
        key: "_storePrevious",
        value: function(r) {
          var g = this.DS, c = g.stores.KeyStore, y = g.SelectedSet;
          c.isMultiSelectKeyPressed(r) ? this._prevSelectedSet = new Set(y) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), u;
    }(), ci = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.selector, y = s.selectorClass, x = s.customStyles;
        t(this, u), i(this, "_rect", void 0), i(this, "start", function(k) {
          var S = k.isDragging;
          if (!S) {
            var O = r.DS.stores.PointerStore, E = O.initialValArea;
            Xt(r.HTMLNode, ie(E, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), i(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), i(this, "update", function(k) {
          var S = k.isDragging;
          if (!(S || r.DS.continue)) {
            var O = r.DS.stores, E = O.ScrollStore, V = O.PointerStore, K = Yr({
              scrollAmount: E.scrollAmount,
              initialPointerPos: V.initialValArea,
              pointerPos: V.currentValArea
            });
            Xt(r.HTMLNode, K), r._rect = null;
          }
        }), this.DS = g, this.HTMLNode = c || nt(x), this.HTMLNode.classList.add(y), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return a(u, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), u;
    }(), ui = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.selectorAreaClass, y = s.autoScrollSpeed, x = s.overflowTolerance;
        t(this, u), i(this, "_autoScrollSpeed", void 0), i(this, "_scrollInterval", void 0), i(this, "_rect", void 0), i(this, "currentEdges", []), i(this, "_overflowTolerance", void 0), i(this, "start", function() {
          return r.applyElements("append");
        }), i(this, "applyElements", function() {
          var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", S = document.body ? "body" : "documentElement", O = "".concat(k, "Child");
          r.HTMLNode[O](r.DS.Selector.HTMLNode), document[S][O](r.HTMLNode);
        }), i(this, "updatePos", function() {
          r._rect = null;
          var k = r.DS.Area.rect, S = r.DS.Area.computedBorder, O = r.HTMLNode.style, E = "".concat(k.top + S.top, "px"), V = "".concat(k.left + S.left, "px"), K = "".concat(k.width, "px"), re = "".concat(k.height, "px");
          O.top !== E && (O.top = E), O.left !== V && (O.left = V), O.width !== K && (O.width = K), O.height !== re && (O.height = re);
        }), i(this, "stop", function(k) {
          r.stopAutoScroll(), k && r.applyElements("remove");
        }), i(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), i(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var k = r.DS, S = k.stores.PointerStore, O = k.Area;
            r.currentEdges = Ut({
              elementRect: ie(S.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && O.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), i(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), i(this, "isInside", function(k, S) {
          return r.DS.Area.HTMLNode.contains(k) && r.DS.stores.ScrollStore.canScroll ? !0 : bt(r.rect, S || k.getBoundingClientRect());
        }), this._autoScrollSpeed = y, this._overflowTolerance = x, this.DS = g, this.HTMLNode = it(c), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          r.updatePos(), r.stopAutoScroll();
        });
      }
      return a(u, [{
        key: "isClicked",
        value: function(r) {
          var g = this.DS.stores.PointerStore, c = r ? g.getPointerPosition(r) : g.initialVal;
          return bt({
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
    }(), di = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.multiSelectKeys, y = s.multiSelectMode;
        t(this, u), i(this, "_multiSelectMode", void 0), i(this, "_multiSelectKeys", void 0), i(this, "_currentValues", /* @__PURE__ */ new Set()), i(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), i(this, "init", function() {
          document.addEventListener("keydown", r.keydown), document.addEventListener("keyup", r.keyup), window.addEventListener("blur", r.reset);
        }), i(this, "keydown", function(x) {
          var k = x.key.toLowerCase();
          r.DS.publish("KeyStore:down:pre", {
            event: x,
            key: k
          }), r._currentValues.add(k), r.DS.publish("KeyStore:down", {
            event: x,
            key: k
          });
        }), i(this, "keyup", function(x) {
          var k = x.key.toLowerCase();
          r.DS.publish("KeyStore:up:pre", {
            event: x,
            key: k
          }), r._currentValues.delete(k), r.DS.publish("KeyStore:up", {
            event: x,
            key: k
          });
        }), i(this, "stop", function() {
          document.removeEventListener("keydown", r.keydown), document.removeEventListener("keyup", r.reset), window.removeEventListener("blur", r.reset), r.reset();
        }), i(this, "reset", function() {
          return r._currentValues.clear();
        }), this.DS = g, this._multiSelectMode = y, this._multiSelectKeys = c.map(function(x) {
          var k = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, S = k[x];
          return S ? (console.warn("[DragSelect] ".concat(x, ' is deprecated. Use "').concat(S, '" instead. Act Now!. See docs for more info')), S.toLowerCase()) : x.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return a(u, [{
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
      }]), u;
    }(), hi = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS;
        t(this, u), i(this, "_isMouseInteraction", !1), i(this, "_initialValArea", void 0), i(this, "_currentValArea", void 0), i(this, "_lastValArea", void 0), i(this, "_initialVal", void 0), i(this, "_currentVal", void 0), i(this, "_lastVal", void 0), i(this, "_lastTouch", void 0), i(this, "init", function() {
          document.addEventListener("mousemove", r.update), document.addEventListener("touchmove", r.update, {
            passive: !1
          });
        }), i(this, "getPointerPosition", function(c) {
          return Kr({
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
        }), this.DS = g, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(c) {
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
          this._initialVal = r, this._initialValArea = r && Y(r, "-", Y(H(this.DS.Area.rect), "+", H(this.DS.Area.computedBorder)));
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
          this._currentVal = r, this._currentValArea = r && Y(r, "-", Y(H(this.DS.Area.rect), "+", H(this.DS.Area.computedBorder)));
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
          this._lastVal = r, this._lastValArea = r && Y(r, "-", Y(H(this.DS.Area.rect), "+", H(this.DS.Area.computedBorder)));
        }
      }]), u;
    }(), fi = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.areaElement, y = s.zoom;
        t(this, u), i(this, "_initialVal", void 0), i(this, "_currentVal", void 0), i(this, "_areaElement", void 0), i(this, "_canScroll", void 0), i(this, "init", function() {
          return r._areaElement.addEventListener("scroll", r.update);
        }), i(this, "start", function() {
          r._currentVal = r._initialVal = je(r._areaElement), r._areaElement.addEventListener("scroll", r.update);
        }), i(this, "update", function() {
          return r._currentVal = je(r._areaElement);
        }), i(this, "stop", function() {
          r._areaElement.removeEventListener("scroll", r.update), r._initialVal = {
            x: 0,
            y: 0
          }, r._canScroll = null;
        }), i(this, "reset", function() {
          r.stop(), r.start();
        }), this._areaElement = c, this.DS = g, this.zoom = y, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return r.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return r.reset();
        });
      }
      return a(u, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = Fe(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var r = Y(this.currentVal, "-", this.initialVal), g = Z(this.zoom), c = Y(Y(r, "*", g), "-", r);
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
      }]), u;
    }(), mi = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.area, c = g === void 0 ? document : g, y = s.selectables, x = y === void 0 ? [] : y, k = s.autoScrollSpeed, S = k === void 0 ? 5 : k, O = s.overflowTolerance, E = O === void 0 ? {
          x: 25,
          y: 25
        } : O, V = s.zoom, K = V === void 0 ? 1 : V, re = s.customStyles, pe = re === void 0 ? !1 : re, ne = s.multiSelectMode, ze = ne === void 0 ? !1 : ne, at = s.multiSelectToggling, Me = at === void 0 ? !0 : at, Ft = s.multiSelectKeys, pi = Ft === void 0 ? ["Control", "Shift", "Meta"] : Ft, qt = s.selector, gi = qt === void 0 ? void 0 : qt, Gt = s.draggability, yt = Gt === void 0 ? !0 : Gt, Jt = s.immediateDrag, vi = Jt === void 0 ? !0 : Jt, Zt = s.keyboardDrag, bi = Zt === void 0 ? !0 : Zt, yi = s.dragKeys, Qt = s.keyboardDragSpeed, wi = Qt === void 0 ? 10 : Qt, er = s.useTransform, tr = er === void 0 ? !0 : er, rr = s.hoverClass, ir = rr === void 0 ? "ds-hover" : rr, nr = s.selectableClass, or = nr === void 0 ? "ds-selectable" : nr, ar = s.selectedClass, xi = ar === void 0 ? "ds-selected" : ar, sr = s.selectorClass, _i = sr === void 0 ? "ds-selector" : sr, lr = s.selectorAreaClass, ki = lr === void 0 ? "ds-selector-area" : lr, Si = s.callback, Di = s.onDragMove, Mi = s.onDragStartBegin, Ci = s.onDragStart, $i = s.onElementSelect, Ei = s.onElementUnselect;
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
        }), i(this, "isMultiSelect", function(Ti) {
          return r.stores.KeyStore.isMultiSelectKeyPressed(Ti);
        }), i(this, "isDragging", function() {
          return r.Interaction.isDragging;
        }), this.PubSub = new oi({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: Si,
          onDragMove: Di,
          onDragStart: Ci,
          onDragStartBegin: Mi,
          onElementSelect: $i,
          onElementUnselect: Ei
        }), this.stores = {
          PointerStore: new hi({
            DS: this
          }),
          ScrollStore: new fi({
            DS: this,
            areaElement: c,
            zoom: K
          }),
          KeyStore: new di({
            DS: this,
            multiSelectKeys: pi,
            multiSelectMode: ze
          })
        }, this.Area = new ri({
          area: c,
          PS: this.PubSub,
          zoom: K
        }), this.Selector = new ci({
          DS: this,
          selector: gi,
          selectorClass: _i,
          customStyles: pe
        }), this.SelectorArea = new ui({
          DS: this,
          selectorAreaClass: ki,
          autoScrollSpeed: S,
          overflowTolerance: E
        }), this.SelectableSet = new ai({
          elements: x,
          DS: this,
          className: or,
          hoverClassName: ir,
          useTransform: tr,
          draggability: yt
        }), this.SelectedSet = new si({
          DS: this,
          className: xi
        }), this.Selection = new li({
          DS: this,
          hoverClassName: ir,
          multiSelectToggling: Me
        }), this.Drag = new ii({
          DS: this,
          draggability: yt,
          useTransform: tr,
          keyboardDrag: bi,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, yi),
          zoom: K,
          keyboardDragSpeed: wi
        }), this.Interaction = new ni({
          areaElement: c,
          DS: this,
          draggability: yt,
          immediateDrag: vi,
          selectableClass: or
        }), ti({
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
          var g = r.callback, c = r.onDragMove, y = r.onDragStart, x = r.onDragStartBegin, k = r.onElementSelect, S = r.onElementUnselect, O = function(V, K) {
            return console.warn("[DragSelect] ".concat(V, ' is deprecated. Use DragSelect.subscribe("').concat(K, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          g && (O("callback", "callback"), this.subscribe("callback", function(E) {
            var V = E.items;
            E.item;
            var K = E.event;
            return g(V, K);
          })), c && (O("onDragMove", "dragmove"), this.subscribe("dragmove", function(E) {
            E.items, E.item;
            var V = E.event;
            return c(V);
          })), y && (O("onDragStart", "dragstart"), this.subscribe("dragstart", function(E) {
            E.items, E.item;
            var V = E.event;
            return y(V);
          })), x && (O("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(E) {
            E.items, E.item;
            var V = E.event;
            return x(V);
          })), k && (O("onElementSelect", "elementselect"), this.subscribe("elementselect", function(E) {
            E.items;
            var V = E.item, K = E.event;
            return k(V, K);
          })), S && (O("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(E) {
            E.items;
            var V = E.item, K = E.event;
            return S(V, K);
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
          var g = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return Ve(r).forEach(function(x) {
            return g.SelectedSet.has(x) ? g.removeSelection(r, c, y) : g.addSelection(r, c, y);
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
          var c = g ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), y = r ? g ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : g ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return Y(c, "-", y);
        }
      }]), u;
    }();
    return mi;
  });
})($r);
const Sn = $r.exports, Dn = (o, e, t, n, a) => (e = Math, t = e.log, n = 1024, a = t(o) / t(n) | 0, o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B"), Mn = (o, e = "en-US") => new Date(o * 1e3).toLocaleString(e), Cn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, $n = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), En = [
  $n
], Tn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, An = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), On = [
  An
], Pn = {
  name: "VFSortIcon"
}, lt = /* @__PURE__ */ Object.assign(Pn, {
  props: { direction: String },
  setup(o) {
    return (e, t) => (w(), M("div", null, [
      o.direction == "down" ? (w(), M("svg", Cn, En)) : q("", !0),
      o.direction == "up" ? (w(), M("svg", Tn, On)) : q("", !0)
    ]));
  }
}), In = ["onClick"], Nn = {
  name: "VFToast.vue"
}, Ln = /* @__PURE__ */ Object.assign(Nn, {
  setup(o) {
    const e = R("emitter"), { getStore: t } = R("storage"), n = j(t("full-screen", !1)), a = (v) => v == "error" ? "text-red-400 border-red-400" : "text-lime-600 border-lime-600", i = j([]), l = (v) => {
      i.value.splice(v, 1);
    }, f = (v) => {
      let p = i.value.findIndex((h) => h.id === v);
      p !== -1 && l(p);
    };
    return e.on("vf-toast-push", (v) => {
      let p = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      v.id = p, i.value.push(v), setTimeout(() => {
        f(p);
      }, 5e3);
    }), (v, p) => (w(), M("div", {
      class: ue([n.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      we(Ai, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: F(() => [
          (w(!0), M(le, null, be(i.value, (h, m) => (w(), M("div", {
            onClick: (b) => l(m),
            key: h,
            class: ue([a(h.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 border text-xs rounded cursor-pointer"])
          }, C(h.label), 11, In))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Ie = (o) => Object.entries(o).map((e) => e.map(encodeURIComponent).join("=")).join("&"), { apiUrl: jn } = Se(), Ct = (o, e) => jn.value + "?" + Ie({ q: "preview", adapter: o, path: e }), Vn = { class: "relative flex-auto flex flex-col overflow-hidden" }, zn = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, Bn = { class: "absolute" }, Rn = /* @__PURE__ */ d("svg", {
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
], -1), Hn = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Un = ["onDblclick", "onTouchstart", "onContextmenu", "data-type", "data-item", "data-index"], Kn = { class: "grid grid-cols-12 items-center" }, Yn = { class: "flex col-span-7 items-center" }, Wn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Fn = [
  Xn
], qn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Jn = [
  Gn
], Zn = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Qn = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, eo = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], to = { class: "grid grid-cols-12 items-center" }, ro = { class: "flex col-span-7 items-center" }, io = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, no = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), oo = [
  no
], ao = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, so = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), lo = [
  so
], co = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, uo = { class: "col-span-2 text-center" }, ho = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, fo = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], mo = { class: "relative" }, po = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, go = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), vo = [
  go
], bo = ["src"], yo = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), xo = [
  wo
], _o = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, ko = { class: "break-all" }, So = {
  name: "VFExplorer"
}, Do = /* @__PURE__ */ Object.assign(So, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { setStore: n, getStore: a } = R("storage"), i = (L) => L == null ? void 0 : L.substring(0, 3), l = (L) => L.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), f = j(null), v = j(null), p = j(0), h = j(null), { t: m } = R("i18n"), b = Math.floor(Math.random() * 2 ** 32), A = j(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      A.value = !A.value, n("full-screen", A.value);
    });
    const $ = j("");
    t.on("vf-search-query", ({ newQuery: L }) => {
      $.value = L, L ? t.emit("vf-fetch", { params: { q: "search", adapter: e.data.adapter, path: e.data.dirname, filter: L } }) : t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
    });
    let T = null;
    const N = () => {
      T && clearTimeout(T);
    }, z = (L) => {
      T = setTimeout(() => {
        B(L);
      }, 500);
    }, B = (L) => {
      L.type == "dir" ? (t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: L.path } })) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: L });
    }, P = ht({ active: !1, column: "", order: "" }), ae = (L = !0) => {
      let U = [...e.data.files], I = P.column, Y = P.order == "asc" ? 1 : -1;
      if (!L)
        return U;
      const H = (ie, Z) => typeof ie == "string" && typeof Z == "string" ? ie.toLowerCase().localeCompare(Z.toLowerCase()) : ie < Z ? -1 : ie > Z ? 1 : 0;
      return P.active && (U = U.slice().sort((ie, Z) => H(ie[I], Z[I]) * Y)), U;
    }, G = (L) => {
      P.active && P.column == L ? (P.active = P.order == "asc", P.column = L, P.order = "desc") : (P.active = !0, P.column = L, P.order = "asc");
    }, D = () => h.value.getSelection().map((L) => JSON.parse(L.dataset.item)), X = (L, U) => {
      if (L.altKey || L.ctrlKey || L.metaKey)
        return L.preventDefault(), !1;
      L.dataTransfer.setDragImage(v.value, 0, 15), L.dataTransfer.effectAllowed = "all", L.dataTransfer.dropEffect = "copy", L.dataTransfer.setData("items", JSON.stringify(D()));
    }, J = (L, U) => {
      L.preventDefault();
      let I = JSON.parse(L.dataTransfer.getData("items"));
      if (I.find((Y) => Y.storage != a("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: I, to: U } });
    }, ce = (L, U) => {
      L.preventDefault(), !U || U.type !== "dir" || h.value.getSelection().find((I) => I == L.currentTarget) ? (L.dataTransfer.dropEffect = "none", L.dataTransfer.effectAllowed = "none") : L.dataTransfer.dropEffect = "copy";
    };
    return _e(() => {
      h.value = new Sn({
        area: f.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => pt(() => {
        h.value.clearSelection(), h.value.setSelectables(document.getElementsByClassName("vf-item-" + b));
      })), h.value.subscribe("predragstart", ({ event: L, isDragging: U }) => {
        if (U)
          p.value = h.value.getSelection().length, h.value.break();
        else {
          const I = L.target.offsetWidth - L.offsetX, Y = L.target.offsetHeight - L.offsetY;
          I < 15 && Y < 15 && (h.value.clearSelection(), h.value.break());
        }
      }), h.value.subscribe("predragmove", ({ isDragging: L }) => {
        L && h.value.break();
      }), h.value.subscribe("callback", ({ items: L, event: U, isDragging: I }) => {
        t.emit("vf-nodes-selected", D()), p.value = h.value.getSelection().length;
      });
    }), Oi(() => h.value.start()), _e(() => {
      jt(() => e.view, () => t.emit("vf-explorer-update"));
    }), (L, U) => (w(), M("div", Vn, [
      o.view == "list" || $.value.length ? (w(), M("div", zn, [
        d("div", {
          onClick: U[0] || (U[0] = (I) => G("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          de(C(_(m)("Name")) + " ", 1),
          ve(we(lt, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, P.active && P.column == "basename"]
          ])
        ]),
        $.value.length ? q("", !0) : (w(), M("div", {
          key: 0,
          onClick: U[1] || (U[1] = (I) => G("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          de(C(_(m)("Size")) + " ", 1),
          ve(we(lt, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, P.active && P.column == "file_size"]
          ])
        ])),
        $.value.length ? q("", !0) : (w(), M("div", {
          key: 1,
          onClick: U[2] || (U[2] = (I) => G("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          de(C(_(m)("Date")) + " ", 1),
          ve(we(lt, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, P.active && P.column == "last_modified"]
          ])
        ])),
        $.value.length ? (w(), M("div", {
          key: 2,
          onClick: U[3] || (U[3] = (I) => G("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          de(C(_(m)("Filepath")) + " ", 1),
          ve(we(lt, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, P.active && P.column == "path"]
          ])
        ])) : q("", !0)
      ])) : q("", !0),
      d("div", Bn, [
        d("div", {
          ref_key: "dragImage",
          ref: v,
          class: "absolute -z-50 -top-96"
        }, [
          Rn,
          d("div", Hn, C(p.value), 1)
        ], 512)
      ]),
      d("div", {
        class: ue([A.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: f,
        onContextmenu: U[7] || (U[7] = Oe((I) => _(t).emit("vf-contextmenu-show", { event: I, area: f.value, items: D() }), ["self", "prevent"]))
      }, [
        $.value.length ? (w(!0), M(le, { key: 0 }, be(ae(), (I, Y) => (w(), M("div", {
          onDblclick: (H) => B(I),
          onTouchstart: (H) => z(I),
          onTouchend: U[4] || (U[4] = (H) => N()),
          onContextmenu: Oe((H) => _(t).emit("vf-contextmenu-show", { event: H, area: f.value, items: D(), target: I }), ["prevent"]),
          class: ue(["vf-item-" + _(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": I.type,
          "data-item": JSON.stringify(I),
          "data-index": Y
        }, [
          d("div", Kn, [
            d("div", Yn, [
              I.type == "dir" ? (w(), M("svg", Wn, Fn)) : (w(), M("svg", qn, Jn)),
              d("span", Zn, C(I.basename), 1)
            ]),
            d("div", Qn, C(I.path), 1)
          ])
        ], 42, Un))), 256)) : q("", !0),
        o.view == "list" && !$.value.length ? (w(!0), M(le, { key: 1 }, be(ae(), (I, Y) => (w(), M("div", {
          draggable: "true",
          onDblclick: (H) => B(I),
          onTouchstart: (H) => z(I),
          onTouchend: U[5] || (U[5] = (H) => N()),
          onContextmenu: Oe((H) => _(t).emit("vf-contextmenu-show", { event: H, area: f.value, items: D(), target: I }), ["prevent"]),
          onDragstart: (H) => X(H),
          onDragover: (H) => ce(H, I),
          onDrop: (H) => J(H, I),
          class: ue(["vf-item-" + _(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": I.type,
          "data-item": JSON.stringify(I),
          "data-index": Y
        }, [
          d("div", to, [
            d("div", ro, [
              I.type == "dir" ? (w(), M("svg", io, oo)) : (w(), M("svg", ao, lo)),
              d("span", co, C(I.basename), 1)
            ]),
            d("div", uo, C(I.file_size ? _(Dn)(I.file_size) : ""), 1),
            d("div", ho, C(_(Mn)(I.last_modified)), 1)
          ])
        ], 42, eo))), 256)) : q("", !0),
        o.view == "grid" && !$.value.length ? (w(!0), M(le, { key: 2 }, be(ae(!1), (I, Y) => {
          var H, ie;
          return w(), M("div", {
            draggable: "true",
            onDblclick: (Z) => B(I),
            onTouchstart: (Z) => z(I),
            onTouchend: U[6] || (U[6] = (Z) => N()),
            onContextmenu: Oe((Z) => _(t).emit("vf-contextmenu-show", { event: Z, area: f.value, items: D(), target: I }), ["prevent"]),
            onDragstart: (Z) => X(Z),
            onDragover: (Z) => ce(Z, I),
            onDrop: (Z) => J(Z, I),
            class: ue(["vf-item-" + _(b), "border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none"]),
            "data-type": I.type,
            "data-item": JSON.stringify(I),
            "data-index": Y
          }, [
            d("div", null, [
              d("div", mo, [
                I.type == "dir" ? (w(), M("svg", po, vo)) : ((H = I.mime_type) != null ? H : "").startsWith("image") ? (w(), M("img", {
                  key: 1,
                  class: "h-10 md:h-12 m-auto",
                  src: _(Ct)(_(a)("adapter", e.data.adapter), I.path),
                  alt: ""
                }, null, 8, bo)) : (w(), M("svg", yo, xo)),
                ((ie = I.mime_type) != null ? ie : "").startsWith("image") ? q("", !0) : (w(), M("div", _o, C(i(I.extension)), 1))
              ]),
              d("span", ko, C(l(I.basename)), 1)
            ])
          ], 42, fo);
        }), 256)) : q("", !0)
      ], 34),
      we(Ln)
    ]));
  }
}), Mo = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Co = { class: "flex leading-5 items-center" }, $o = ["aria-label"], Eo = /* @__PURE__ */ d("svg", {
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
], -1), To = [
  Eo
], Ao = ["value"], Oo = { class: "ml-3" }, Po = { key: 0 }, Io = { class: "ml-1" }, No = { class: "flex leading-5 items-center" }, Lo = {
  value: "",
  disabled: ""
}, jo = /* @__PURE__ */ d("option", { value: "tr" }, "Turkish", -1), Vo = /* @__PURE__ */ d("option", { value: "en" }, "English", -1), zo = /* @__PURE__ */ d("option", { value: "fr" }, "French", -1), Bo = ["aria-label"], Ro = /* @__PURE__ */ d("svg", {
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
], -1), Ho = [
  Ro
], Uo = {
  name: "VFStatusbar"
}, Ko = /* @__PURE__ */ Object.assign(Uo, {
  props: {
    data: Object
  },
  setup(o) {
    var b;
    const e = o, t = R("emitter"), { getStore: n, setStore: a } = R("storage"), i = j(0), l = j((b = n("adapter")) != null ? b : e.data.adapter), { t: f, changeLocale: v } = R("i18n"), p = j(n("locale", "")), h = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: l.value } }), a("adapter", l.value);
    };
    t.on("vf-nodes-selected", (A) => {
      i.value = A.length;
    });
    const m = j("");
    return t.on("vf-search-query", ({ newQuery: A }) => {
      m.value = A;
    }), (A, $) => (w(), M("div", Mo, [
      d("div", Co, [
        d("div", {
          class: "mx-2",
          "aria-label": _(f)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, To, 8, $o),
        ve(d("select", {
          "onUpdate:modelValue": $[0] || ($[0] = (T) => l.value = T),
          onChange: h,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (w(!0), M(le, null, be(o.data.storages, (T) => (w(), M("option", { value: T }, C(T), 9, Ao))), 256))
        ], 544), [
          [cr, l.value]
        ]),
        d("div", Oo, [
          m.value.length ? (w(), M("span", Po, C(o.data.files.length) + " items found. ", 1)) : q("", !0),
          d("span", Io, C(i.value > 0 ? i.value + " " + _(f)("item(s) selected.") : ""), 1)
        ])
      ]),
      d("div", No, [
        ve(d("select", {
          "onUpdate:modelValue": $[1] || ($[1] = (T) => p.value = T),
          onChange: $[2] || ($[2] = (T) => _(v)(T.target.value)),
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          d("option", Lo, C(_(f)("Language")), 1),
          jo,
          Vo,
          zo
        ], 544), [
          [cr, p.value]
        ]),
        d("span", {
          "aria-label": _(f)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: $[3] || ($[3] = (T) => _(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: _(f)("Vuefinder is a file manager component for vue 3.") }))
        }, Ho, 8, Bo)
      ])
    ]));
  }
}), Yo = (o, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && o(...a), clearTimeout(n), n = setTimeout(() => {
      o(...a);
    }, e);
  };
}, Wo = (o, e, t) => {
  const n = j(o);
  return Pi((i, l) => ({
    get() {
      return i(), n.value;
    },
    set: Yo(
      (f) => {
        n.value = f, l();
      },
      e,
      t
    )
  }));
}, Xo = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Fo = ["aria-label"], qo = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Go = [
  qo
], Jo = ["onClick"], Zo = /* @__PURE__ */ d("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Qo = [
  Zo
], ea = { class: "flex leading-5" }, ta = /* @__PURE__ */ d("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), ra = ["title", "onClick"], ia = {
  key: 1,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, na = /* @__PURE__ */ d("svg", {
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
], -1), oa = ["onKeydown", "placeholder"], aa = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), sa = [
  aa
], la = {
  name: "VFBreadcrumb"
}, ca = /* @__PURE__ */ Object.assign(la, {
  props: {
    data: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), a = j(null), i = j([]), l = j(!1), f = j(null), { t: v } = R("i18n");
    t.on("vf-explorer-update", () => {
      var B;
      let N = [], z = [];
      a.value = (B = e.data.dirname) != null ? B : n("adapter", "local") + "://", a.value.length == 0 && (i.value = []), a.value.replace(n("adapter", "local") + "://", "").split("/").forEach(function(P) {
        N.push(P), N.join("/") != "" && z.push({
          basename: P,
          name: P,
          path: n("adapter", "local") + "://" + N.join("/"),
          type: "dir"
        });
      }), z.length > 4 && (z = z.slice(-5), z[0].name = ".."), i.value = z;
    });
    const p = () => {
      l.value = !1, m.value = "";
    };
    t.on("vf-search-exit", () => {
      p();
    });
    const h = () => {
      l.value = !0, pt(() => f.value.focus());
    }, m = Wo("", 400);
    jt(m, (N) => {
      t.emit("vf-search-query", { newQuery: N });
    });
    const b = () => i.value.length && !l.value, A = (N) => {
      var B;
      N.preventDefault();
      let z = JSON.parse(N.dataTransfer.getData("items"));
      if (z.find((P) => P.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: z, to: (B = i.value[i.value.length - 2]) != null ? B : { path: n("adapter", "local") + "://" } }
      });
    }, $ = (N) => {
      N.preventDefault(), b() ? N.dataTransfer.dropEffect = "copy" : (N.dataTransfer.dropEffect = "none", N.dataTransfer.effectAllowed = "none");
    }, T = () => {
      m.value == "" && p();
    };
    return (N, z) => (w(), M("div", Xo, [
      d("span", {
        "aria-label": _(v)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (w(), M("svg", {
          onDragover: z[0] || (z[0] = (B) => $(B)),
          onDrop: z[1] || (z[1] = (B) => A(B)),
          onClick: z[2] || (z[2] = (B) => {
            var P, ae;
            return !b() || _(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter, path: (ae = (P = i.value[i.value.length - 2]) == null ? void 0 : P.path) != null ? ae : _(n)("adapter", "local") + "://" } });
          }),
          class: ue(["h-6 w-6 p-0.5 rounded", b() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Go, 34))
      ], 8, Fo),
      l.value ? (w(), M("div", ia, [
        na,
        ve(d("input", {
          ref_key: "searchInput",
          ref: f,
          onKeydown: Ye(p, ["esc"]),
          onBlur: T,
          "onUpdate:modelValue": z[4] || (z[4] = (B) => Ii(m) ? m.value = B : null),
          placeholder: _(v)("Search anything.."),
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, oa), [
          [We, _(m)]
        ]),
        (w(), M("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: p,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, sa))
      ])) : (w(), M("div", {
        key: 0,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Oe(h, ["self"])
      }, [
        (w(), M("svg", {
          onClick: z[3] || (z[3] = (B) => _(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Qo)),
        d("div", ea, [
          (w(!0), M(le, null, be(i.value, (B, P) => (w(), M("div", { key: P }, [
            ta,
            d("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: B.basename,
              onClick: (ae) => _(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter, path: B.path } })
            }, C(B.name), 9, ra)
          ]))), 128))
        ])
      ], 8, Jo))
    ]));
  }
}), ua = ["onClick"], da = /* @__PURE__ */ d("span", { class: "px-1" }, null, -1), ha = {
  name: "VFContextMenu"
}, fa = /* @__PURE__ */ Object.assign(ha, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), n = j(null), { apiUrl: a } = Se(), i = ht({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), l = j([]);
    t.on("vf-context-selected", (b) => {
      l.value = b;
    });
    const { t: f } = R("i18n"), v = {
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
          t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
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
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: l.value[0].path } });
        }
      },
      openDir: {
        title: () => f("Open containing folder"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: l.value[0].dir } });
        }
      },
      download: {
        title: () => f("Download"),
        action: () => {
          const b = a.value + "?" + Ie({ q: "download", adapter: l.value[0].adapter, path: l.value[0].path });
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
    }, p = (b) => {
      t.emit("vf-contextmenu-hide"), b.action();
    }, h = j("");
    t.on("vf-search-query", ({ newQuery: b }) => {
      h.value = b;
    }), t.on("vf-contextmenu-show", ({ event: b, area: A, items: $, target: T = null }) => {
      if (i.items = [], h.value)
        if (T)
          i.items.push(v.openDir), t.emit("vf-context-selected", [T]), console.log("search item selected");
        else
          return;
      else
        !T && !h.value ? (i.items.push(v.refresh), i.items.push(v.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")) : $.length > 1 && $.some((N) => N.path === T.path) ? (i.items.push(v.refresh), i.items.push(v.archive), i.items.push(v.delete), t.emit("vf-context-selected", $), console.log($.length + " selected (more than 1 item.)")) : (T.type == "dir" ? i.items.push(v.open) : (i.items.push(v.preview), i.items.push(v.download)), i.items.push(v.rename), T.mime_type == "application/zip" ? i.items.push(v.unarchive) : i.items.push(v.archive), i.items.push(v.delete), t.emit("vf-context-selected", [T]), console.log(T.type + " is selected"));
      m(b, A);
    }), t.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const m = (b, A) => {
      i.active = !0, pt(() => {
        let $ = A.getBoundingClientRect(), T = b.pageX, N = b.pageY, z = n.value.offsetHeight, B = n.value.offsetWidth;
        T = $.right - b.pageX + window.scrollX < B ? T - B : T, N = $.bottom - b.pageY + window.scrollY < z ? N - z : N, i.positions = {
          left: T + "px",
          top: N + "px"
        };
      });
    };
    return (b, A) => i.active ? (w(), M("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: n,
      style: Cr(i.positions)
    }, [
      (w(!0), M(le, null, be(i.items, ($) => (w(), M("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: $.title,
        onClick: (T) => p($)
      }, [
        da,
        d("span", null, C($.title()), 1)
      ], 8, ua))), 128))
    ], 4)) : q("", !0);
  }
}), ma = (o, e) => {
  const t = o[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((n, a) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(a.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function pa(o) {
  const e = await ma(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en.df18d1cd.js"), "../locales/tr.json": () => import("./tr.88ee72f6.js") }), `../locales/${o}.json`);
  return JSON.parse(e.default);
}
function ga(o, e) {
  const { getStore: t, setStore: n } = Mt(o), a = ["en", "tr"], i = j({}), l = (p) => {
    a.includes(p) || (console.log("The selected locale is not yet supported. The fallback language is set as 'en'"), p = "en"), pa(p).then((h) => {
      i.value = h, n("locale", p), n("translations", h), console.log(p + " is loaded.");
    });
  };
  t("locale") ? i.value = t("translations") : l(e);
  const f = (p, ...h) => h.length ? f(p = p.replace("%s", h.shift()), ...h) : p;
  function v(p, ...h) {
    return i.value.hasOwnProperty(p) ? f(i.value[p], ...h) : "";
  }
  return { t: v, support_locales: a, changeLocale: l };
}
const va = /* @__PURE__ */ d("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), ba = {
  name: "VueFinder"
}, ya = /* @__PURE__ */ Object.assign(ba, {
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
    }
  },
  setup(o) {
    const e = o, t = Li(), { setStore: n, getStore: a } = Mt(e.id);
    wt("emitter", t), wt("storage", Mt(e.id));
    const i = ga(e.id, e.locale);
    wt("i18n", i);
    const { apiUrl: l, setApiUrl: f } = Se();
    f(e.url);
    const v = ht({ adapter: "local", storages: [], dirname: ".", files: [] }), p = j(a("viewport", "grid")), h = j(a("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      h.value = !h.value, n("darkMode", h.value);
    });
    const m = j(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      m.value = !m.value, n("full-screen", m.value);
    }), t.on("vf-view-toggle", ($) => {
      p.value = $;
    });
    const b = ht({
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
      Object.assign(v, $), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update");
    };
    return t.on("vf-fetch", ({ params: $, onSuccess: T = null, onError: N = null }) => {
      ft(l.value, { params: $ }).then((z) => {
        t.emit("vf-modal-close"), A(z), T();
      }).catch((z) => {
        N && N(z);
      });
    }), t.on("vf-download", ($) => {
      document.getElementById("download_frame").src = $, t.emit("vf-modal-close");
    }), _e(() => {
      t.emit("vf-fetch", { params: { q: "index", adapter: a("adapter", v.adapter) } });
    }), ($, T) => (w(), M("div", {
      class: ue(h.value ? "dark" : "")
    }, [
      d("div", {
        class: ue([m.value ? "fixed w-screen inset-0 z-20" : "relative", "border flex flex-col rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        style: Cr(m.value ? "" : "max-height: " + o.maxHeight),
        onMousedown: T[0] || (T[0] = (N) => _(t).emit("vf-contextmenu-hide"))
      }, [
        we(_n, { data: v }, null, 8, ["data"]),
        we(ca, { data: v }, null, 8, ["data"]),
        we(Do, {
          view: p.value,
          data: v
        }, null, 8, ["view", "data"]),
        we(Ko, { data: v }, null, 8, ["data"])
      ], 38),
      b.active ? (w(), ee(Ni("v-f-modal-" + b.type), {
        key: 0,
        selection: b.data,
        current: v
      }, null, 8, ["selection", "current"])) : q("", !0),
      we(fa, { current: v }, null, 8, ["current"]),
      va
    ], 2));
  }
}), wa = /* @__PURE__ */ d("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), xa = { class: "fixed z-10 inset-0 overflow-y-auto" }, _a = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, ka = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Sa = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, De = {
  __name: "ModalLayout",
  setup(o) {
    const e = R("emitter");
    return _e(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, n) => (w(), M("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: n[1] || (n[1] = Ye((a) => _(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      wa,
      d("div", xa, [
        d("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = Oe((a) => _(e).emit("vf-modal-close"), ["self"]))
        }, [
          d("div", _a, [
            d("div", ka, [
              Dt(t.$slots, "default")
            ]),
            d("div", Sa, [
              Dt(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Da = {
  name: "Message"
}, Ne = /* @__PURE__ */ Object.assign(Da, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  setup(o) {
    return (e, t) => (w(), M("div", null, [
      d("div", {
        ref: "strMessage",
        class: ue(["mt-1 p-1 px-2 rounded text-sm", o.error ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"])
      }, [
        Dt(e.$slots, "default")
      ], 2)
    ]));
  }
}), Ma = { class: "sm:flex sm:items-start" }, Ca = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), $a = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Ea = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ta = { class: "mt-2" }, Aa = { class: "text-sm text-gray-500" }, Oa = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Pa = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ia = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Na = [
  Ia
], La = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ja = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Va = [
  ja
], za = { class: "ml-1.5" }, Ba = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, Ra = {
  name: "VFModalDelete"
}, Ha = /* @__PURE__ */ Object.assign(Ra, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = j(e.selection.items), l = j(""), f = () => {
      i.value.length && t.emit("vf-fetch", {
        params: {
          q: "delete",
          adapter: n("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(i.value.map(({ path: v, type: p }) => ({ path: v, type: p })))
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: a("Files deleted.") });
        },
        onError: (v) => {
          l.value = a(v.message);
        }
      });
    };
    return (v, p) => (w(), ee(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(a)("Yes, Delete!")), 1),
        d("button", {
          type: "button",
          onClick: p[0] || (p[0] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(a)("Cancel")), 1),
        d("div", Ba, C(_(a)("This action cannot be undone.")), 1)
      ]),
      default: F(() => [
        d("div", Ma, [
          Ca,
          d("div", $a, [
            d("h3", Ea, C(_(a)("Delete files")), 1),
            d("div", Ta, [
              d("p", Aa, C(_(a)("Are you sure you want to delete these files ?")), 1),
              (w(!0), M(le, null, be(i.value, (h) => (w(), M("p", Oa, [
                h.type == "dir" ? (w(), M("svg", Pa, Na)) : (w(), M("svg", La, Va)),
                d("span", za, C(h.basename), 1)
              ]))), 256)),
              l.value.length ? (w(), ee(Ne, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  de(C(l.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ua = { class: "sm:flex sm:items-start" }, Ka = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ya = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Wa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Xa = { class: "mt-2" }, Fa = { class: "text-sm text-gray-500" }, qa = {
  name: "VFModalMessage"
}, Ga = /* @__PURE__ */ Object.assign(qa, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = R("emitter"), { t } = R("i18n");
    return (n, a) => (w(), ee(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: a[0] || (a[0] = (i) => _(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(t)("Close")), 1)
      ]),
      default: F(() => {
        var i, l, f, v;
        return [
          d("div", Ua, [
            Ka,
            d("div", Ya, [
              d("h3", Wa, C((l = (i = o.selection) == null ? void 0 : i.title) != null ? l : "Title"), 1),
              d("div", Xa, [
                d("p", Fa, C((v = (f = o.selection) == null ? void 0 : f.message) != null ? v : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), Ja = { class: "sm:flex sm:items-start" }, Za = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Qa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, es = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ts = { class: "mt-2" }, rs = { class: "text-sm text-gray-500" }, is = ["onKeyup", "placeholder"], ns = {
  name: "VFModalNewFolder"
}, os = /* @__PURE__ */ Object.assign(ns, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = j(""), l = j(""), f = () => {
      i.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfolder",
          adapter: n("adapter", "local"),
          path: e.current.dirname,
          name: i.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: a("%s is created.", i.value) });
        },
        onError: (v) => {
          l.value = a(v.message);
        }
      });
    };
    return (v, p) => (w(), ee(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(a)("Create")), 1),
        d("button", {
          type: "button",
          onClick: p[1] || (p[1] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        d("div", Ja, [
          Za,
          d("div", Qa, [
            d("h3", es, C(_(a)("New Folder")), 1),
            d("div", ts, [
              d("p", rs, C(_(a)("Create a new folder")), 1),
              ve(d("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (h) => i.value = h),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("Folder Name"),
                type: "text"
              }, null, 40, is), [
                [We, i.value]
              ]),
              l.value.length ? (w(), ee(Ne, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  de(C(l.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), as = { class: "sm:flex sm:items-start" }, ss = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ls = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, cs = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, us = { class: "mt-2" }, ds = { class: "text-sm text-gray-500" }, hs = ["onKeyup", "placeholder"], fs = {
  name: "VFModalNewFile"
}, ms = /* @__PURE__ */ Object.assign(fs, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = j(""), l = j(""), f = () => {
      i.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfile",
          adapter: n("adapter", "local"),
          path: e.current.dirname,
          name: i.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: a("%s is created.", i.value) });
        },
        onError: (v) => {
          l.value = a(v.message);
        }
      });
    };
    return (v, p) => (w(), ee(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: p[1] || (p[1] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: F(() => [
        d("div", as, [
          ss,
          d("div", ls, [
            d("h3", cs, C(_(a)("New File")), 1),
            d("div", us, [
              d("p", ds, C(_(a)("Create a new file")), 1),
              ve(d("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (h) => i.value = h),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("File Name"),
                type: "text"
              }, null, 40, hs), [
                [We, i.value]
              ]),
              l.value.length ? (w(), ee(Ne, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  de(C(l.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ps = { class: "flex" }, gs = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, vs = { class: "ml-auto mb-2" }, bs = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, ys = { key: 1 }, ws = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, n = j(""), a = j(""), i = j(null), l = j(!1), { apiUrl: f } = Se(), { t: v } = R("i18n");
    _e(() => {
      ft(f.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((m) => {
        n.value = m, e("load");
      });
    });
    const p = () => {
      l.value = !l.value, a.value = n.value, l.value == !0 && pt(() => {
        i.value.focus();
      });
    }, h = () => {
      ft(f.value, {
        method: "POST",
        params: { q: "save", adapter: t.selection.adapter, path: t.selection.item.path, content: a.value },
        json: !1
      }).then((m) => {
        n.value = m, e("load"), l.value = !l.value;
      }).catch((m) => console.log(m.statusText));
    };
    return (m, b) => (w(), M(le, null, [
      d("div", ps, [
        d("div", gs, C(o.selection.item.basename), 1),
        d("div", vs, [
          l.value ? (w(), M("button", {
            key: 0,
            onClick: h,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, C(_(v)("Save")), 1)) : q("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: b[0] || (b[0] = (A) => p())
          }, C(l.value ? _(v)("Cancel") : _(v)("Edit")), 1)
        ])
      ]),
      d("div", null, [
        l.value ? (w(), M("div", ys, [
          ve(d("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": b[1] || (b[1] = (A) => a.value = A),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [We, a.value]
          ])
        ])) : (w(), M("pre", bs, C(n.value), 1))
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
function dr(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(o, a).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Er(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? dr(Object(t), !0).forEach(function(n) {
      ks(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : dr(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function dt(o) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? dt = function(e) {
    return typeof e;
  } : dt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, dt(o);
}
function xs(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function hr(o, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(o, n.key, n);
  }
}
function _s(o, e, t) {
  return e && hr(o.prototype, e), t && hr(o, t), o;
}
function ks(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function Tr(o) {
  return Ss(o) || Ds(o) || Ms(o) || Cs();
}
function Ss(o) {
  if (Array.isArray(o))
    return $t(o);
}
function Ds(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null)
    return Array.from(o);
}
function Ms(o, e) {
  if (!!o) {
    if (typeof o == "string")
      return $t(o, e);
    var t = Object.prototype.toString.call(o).slice(8, -1);
    if (t === "Object" && o.constructor && (t = o.constructor.name), t === "Map" || t === "Set")
      return Array.from(o);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return $t(o, e);
  }
}
function $t(o, e) {
  (e == null || e > o.length) && (e = o.length);
  for (var t = 0, n = new Array(e); t < e; t++)
    n[t] = o[t];
  return n;
}
function Cs() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var gt = typeof window < "u" && typeof window.document < "u", ke = gt ? window : {}, Vt = gt && ke.document.documentElement ? "ontouchstart" in ke.document.documentElement : !1, zt = gt ? "PointerEvent" in ke : !1, Q = "cropper", Bt = "all", Ar = "crop", Or = "move", Pr = "zoom", Te = "e", Ae = "w", Be = "s", Ce = "n", Ge = "ne", Je = "nw", Ze = "se", Qe = "sw", Et = "".concat(Q, "-crop"), fr = "".concat(Q, "-disabled"), fe = "".concat(Q, "-hidden"), mr = "".concat(Q, "-hide"), $s = "".concat(Q, "-invisible"), mt = "".concat(Q, "-modal"), Tt = "".concat(Q, "-move"), tt = "".concat(Q, "Action"), ct = "".concat(Q, "Preview"), Rt = "crop", Ir = "move", Nr = "none", At = "crop", Ot = "cropend", Pt = "cropmove", It = "cropstart", pr = "dblclick", Es = Vt ? "touchstart" : "mousedown", Ts = Vt ? "touchmove" : "mousemove", As = Vt ? "touchend touchcancel" : "mouseup", gr = zt ? "pointerdown" : Es, vr = zt ? "pointermove" : Ts, br = zt ? "pointerup pointercancel" : As, yr = "ready", wr = "resize", xr = "wheel", Nt = "zoom", _r = "image/jpeg", Os = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, Ps = /^data:/, Is = /^data:image\/jpeg;base64,/, Ns = /^img|canvas$/i, Lr = 200, jr = 100, kr = {
  viewMode: 0,
  dragMode: Rt,
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
  minContainerWidth: Lr,
  minContainerHeight: jr,
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, Ls = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', js = Number.isNaN || ke.isNaN;
function W(o) {
  return typeof o == "number" && !js(o);
}
var Sr = function(e) {
  return e > 0 && e < 1 / 0;
};
function _t(o) {
  return typeof o > "u";
}
function Pe(o) {
  return dt(o) === "object" && o !== null;
}
var Vs = Object.prototype.hasOwnProperty;
function Re(o) {
  if (!Pe(o))
    return !1;
  try {
    var e = o.constructor, t = e.prototype;
    return e && t && Vs.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function he(o) {
  return typeof o == "function";
}
var zs = Array.prototype.slice;
function Vr(o) {
  return Array.from ? Array.from(o) : zs.call(o);
}
function oe(o, e) {
  return o && he(e) && (Array.isArray(o) || W(o.length) ? Vr(o).forEach(function(t, n) {
    e.call(o, t, n, o);
  }) : Pe(o) && Object.keys(o).forEach(function(t) {
    e.call(o, o[t], t, o);
  })), o;
}
var te = Object.assign || function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  return Pe(e) && n.length > 0 && n.forEach(function(i) {
    Pe(i) && Object.keys(i).forEach(function(l) {
      e[l] = i[l];
    });
  }), e;
}, Bs = /\.\d*(?:0|9){12}\d*$/;
function Ue(o) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return Bs.test(o) ? Math.round(o * e) / e : o;
}
var Rs = /^width|height|left|top|marginLeft|marginTop$/;
function $e(o, e) {
  var t = o.style;
  oe(e, function(n, a) {
    Rs.test(a) && W(n) && (n = "".concat(n, "px")), t[a] = n;
  });
}
function Hs(o, e) {
  return o.classList ? o.classList.contains(e) : o.className.indexOf(e) > -1;
}
function se(o, e) {
  if (!!e) {
    if (W(o.length)) {
      oe(o, function(n) {
        se(n, e);
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
function xe(o, e) {
  if (!!e) {
    if (W(o.length)) {
      oe(o, function(t) {
        xe(t, e);
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
    if (W(o.length)) {
      oe(o, function(n) {
        He(n, e, t);
      });
      return;
    }
    t ? se(o, e) : xe(o, e);
  }
}
var Us = /([a-z\d])([A-Z])/g;
function Ht(o) {
  return o.replace(Us, "$1-$2").toLowerCase();
}
function Lt(o, e) {
  return Pe(o[e]) ? o[e] : o.dataset ? o.dataset[e] : o.getAttribute("data-".concat(Ht(e)));
}
function rt(o, e, t) {
  Pe(t) ? o[e] = t : o.dataset ? o.dataset[e] = t : o.setAttribute("data-".concat(Ht(e)), t);
}
function Ks(o, e) {
  if (Pe(o[e]))
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
    o.removeAttribute("data-".concat(Ht(e)));
}
var zr = /\s\s*/, Br = function() {
  var o = !1;
  if (gt) {
    var e = !1, t = function() {
    }, n = Object.defineProperty({}, "once", {
      get: function() {
        return o = !0, e;
      },
      set: function(i) {
        e = i;
      }
    });
    ke.addEventListener("test", t, n), ke.removeEventListener("test", t, n);
  }
  return o;
}();
function ye(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(zr).forEach(function(i) {
    if (!Br) {
      var l = o.listeners;
      l && l[i] && l[i][t] && (a = l[i][t], delete l[i][t], Object.keys(l[i]).length === 0 && delete l[i], Object.keys(l).length === 0 && delete o.listeners);
    }
    o.removeEventListener(i, a, n);
  });
}
function ge(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(zr).forEach(function(i) {
    if (n.once && !Br) {
      var l = o.listeners, f = l === void 0 ? {} : l;
      a = function() {
        delete f[i][t], o.removeEventListener(i, a, n);
        for (var p = arguments.length, h = new Array(p), m = 0; m < p; m++)
          h[m] = arguments[m];
        t.apply(o, h);
      }, f[i] || (f[i] = {}), f[i][t] && o.removeEventListener(i, f[i][t], n), f[i][t] = a, o.listeners = f;
    }
    o.addEventListener(i, a, n);
  });
}
function Ke(o, e, t) {
  var n;
  return he(Event) && he(CustomEvent) ? n = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (n = document.createEvent("CustomEvent"), n.initCustomEvent(e, !0, !0, t)), o.dispatchEvent(n);
}
function Rr(o) {
  var e = o.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var kt = ke.location, Ys = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function Dr(o) {
  var e = o.match(Ys);
  return e !== null && (e[1] !== kt.protocol || e[2] !== kt.hostname || e[3] !== kt.port);
}
function Mr(o) {
  var e = "timestamp=".concat(new Date().getTime());
  return o + (o.indexOf("?") === -1 ? "?" : "&") + e;
}
function et(o) {
  var e = o.rotate, t = o.scaleX, n = o.scaleY, a = o.translateX, i = o.translateY, l = [];
  W(a) && a !== 0 && l.push("translateX(".concat(a, "px)")), W(i) && i !== 0 && l.push("translateY(".concat(i, "px)")), W(e) && e !== 0 && l.push("rotate(".concat(e, "deg)")), W(t) && t !== 1 && l.push("scaleX(".concat(t, ")")), W(n) && n !== 1 && l.push("scaleY(".concat(n, ")"));
  var f = l.length ? l.join(" ") : "none";
  return {
    WebkitTransform: f,
    msTransform: f,
    transform: f
  };
}
function Ws(o) {
  var e = Er({}, o), t = 0;
  return oe(o, function(n, a) {
    delete e[a], oe(e, function(i) {
      var l = Math.abs(n.startX - i.startX), f = Math.abs(n.startY - i.startY), v = Math.abs(n.endX - i.endX), p = Math.abs(n.endY - i.endY), h = Math.sqrt(l * l + f * f), m = Math.sqrt(v * v + p * p), b = (m - h) / h;
      Math.abs(b) > Math.abs(t) && (t = b);
    });
  }), t;
}
function ut(o, e) {
  var t = o.pageX, n = o.pageY, a = {
    endX: t,
    endY: n
  };
  return e ? a : Er({
    startX: t,
    startY: n
  }, a);
}
function Xs(o) {
  var e = 0, t = 0, n = 0;
  return oe(o, function(a) {
    var i = a.startX, l = a.startY;
    e += i, t += l, n += 1;
  }), e /= n, t /= n, {
    pageX: e,
    pageY: t
  };
}
function Ee(o) {
  var e = o.aspectRatio, t = o.height, n = o.width, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", i = Sr(n), l = Sr(t);
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
function Fs(o) {
  var e = o.width, t = o.height, n = o.degree;
  if (n = Math.abs(n) % 180, n === 90)
    return {
      width: t,
      height: e
    };
  var a = n % 90 * Math.PI / 180, i = Math.sin(a), l = Math.cos(a), f = e * l + t * i, v = e * i + t * l;
  return n > 90 ? {
    width: v,
    height: f
  } : {
    width: f,
    height: v
  };
}
function qs(o, e, t, n) {
  var a = e.aspectRatio, i = e.naturalWidth, l = e.naturalHeight, f = e.rotate, v = f === void 0 ? 0 : f, p = e.scaleX, h = p === void 0 ? 1 : p, m = e.scaleY, b = m === void 0 ? 1 : m, A = t.aspectRatio, $ = t.naturalWidth, T = t.naturalHeight, N = n.fillColor, z = N === void 0 ? "transparent" : N, B = n.imageSmoothingEnabled, P = B === void 0 ? !0 : B, ae = n.imageSmoothingQuality, G = ae === void 0 ? "low" : ae, D = n.maxWidth, X = D === void 0 ? 1 / 0 : D, J = n.maxHeight, ce = J === void 0 ? 1 / 0 : J, me = n.minWidth, L = me === void 0 ? 0 : me, U = n.minHeight, I = U === void 0 ? 0 : U, Y = document.createElement("canvas"), H = Y.getContext("2d"), ie = Ee({
    aspectRatio: A,
    width: X,
    height: ce
  }), Z = Ee({
    aspectRatio: A,
    width: L,
    height: I
  }, "cover"), Xe = Math.min(ie.width, Math.max(Z.width, $)), Fe = Math.min(ie.height, Math.max(Z.height, T)), it = Ee({
    aspectRatio: a,
    width: X,
    height: ce
  }), nt = Ee({
    aspectRatio: a,
    width: L,
    height: I
  }, "cover"), ot = Math.min(it.width, Math.max(nt.width, i)), Le = Math.min(it.height, Math.max(nt.height, l)), vt = [-ot / 2, -Le / 2, ot, Le];
  return Y.width = Ue(Xe), Y.height = Ue(Fe), H.fillStyle = z, H.fillRect(0, 0, Xe, Fe), H.save(), H.translate(Xe / 2, Fe / 2), H.rotate(v * Math.PI / 180), H.scale(h, b), H.imageSmoothingEnabled = P, H.imageSmoothingQuality = G, H.drawImage.apply(H, [o].concat(Tr(vt.map(function(je) {
    return Math.floor(Ue(je));
  })))), H.restore(), Y;
}
var Hr = String.fromCharCode;
function Gs(o, e, t) {
  var n = "";
  t += e;
  for (var a = e; a < t; a += 1)
    n += Hr(o.getUint8(a));
  return n;
}
var Js = /^data:.*,/;
function Zs(o) {
  var e = o.replace(Js, ""), t = atob(e), n = new ArrayBuffer(t.length), a = new Uint8Array(n);
  return oe(a, function(i, l) {
    a[l] = t.charCodeAt(l);
  }), n;
}
function Qs(o, e) {
  for (var t = [], n = 8192, a = new Uint8Array(o); a.length > 0; )
    t.push(Hr.apply(null, Vr(a.subarray(0, n)))), a = a.subarray(n);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function el(o) {
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
      var v = a + 4, p = a + 10;
      if (Gs(e, v, 4) === "Exif") {
        var h = e.getUint16(p);
        if (n = h === 18761, (n || h === 19789) && e.getUint16(p + 2, n) === 42) {
          var m = e.getUint32(p + 4, n);
          m >= 8 && (i = p + m);
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
function tl(o) {
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
var rl = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, n = this.container, a = this.cropper, i = Number(t.minContainerWidth), l = Number(t.minContainerHeight);
    se(a, fe), xe(e, fe);
    var f = {
      width: Math.max(n.offsetWidth, i >= 0 ? i : Lr),
      height: Math.max(n.offsetHeight, l >= 0 ? l : jr)
    };
    this.containerData = f, $e(a, {
      width: f.width,
      height: f.height
    }), se(e, fe), xe(a, fe);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, n = this.options.viewMode, a = Math.abs(t.rotate) % 180 === 90, i = a ? t.naturalHeight : t.naturalWidth, l = a ? t.naturalWidth : t.naturalHeight, f = i / l, v = e.width, p = e.height;
    e.height * f > e.width ? n === 3 ? v = e.height * f : p = e.width / f : n === 3 ? p = e.width / f : v = e.height * f;
    var h = {
      aspectRatio: f,
      naturalWidth: i,
      naturalHeight: l,
      width: v,
      height: p
    };
    this.canvasData = h, this.limited = n === 1 || n === 2, this.limitCanvas(!0, !0), h.width = Math.min(Math.max(h.width, h.minWidth), h.maxWidth), h.height = Math.min(Math.max(h.height, h.minHeight), h.maxHeight), h.left = (e.width - h.width) / 2, h.top = (e.height - h.height) / 2, h.oldLeft = h.left, h.oldTop = h.top, this.initialCanvasData = te({}, h);
  },
  limitCanvas: function(e, t) {
    var n = this.options, a = this.containerData, i = this.canvasData, l = this.cropBoxData, f = n.viewMode, v = i.aspectRatio, p = this.cropped && l;
    if (e) {
      var h = Number(n.minCanvasWidth) || 0, m = Number(n.minCanvasHeight) || 0;
      f > 1 ? (h = Math.max(h, a.width), m = Math.max(m, a.height), f === 3 && (m * v > h ? h = m * v : m = h / v)) : f > 0 && (h ? h = Math.max(h, p ? l.width : 0) : m ? m = Math.max(m, p ? l.height : 0) : p && (h = l.width, m = l.height, m * v > h ? h = m * v : m = h / v));
      var b = Ee({
        aspectRatio: v,
        width: h,
        height: m
      });
      h = b.width, m = b.height, i.minWidth = h, i.minHeight = m, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
    }
    if (t)
      if (f > (p ? 0 : 1)) {
        var A = a.width - i.width, $ = a.height - i.height;
        i.minLeft = Math.min(0, A), i.minTop = Math.min(0, $), i.maxLeft = Math.max(0, A), i.maxTop = Math.max(0, $), p && this.limited && (i.minLeft = Math.min(l.left, l.left + (l.width - i.width)), i.minTop = Math.min(l.top, l.top + (l.height - i.height)), i.maxLeft = l.left, i.maxTop = l.top, f === 2 && (i.width >= a.width && (i.minLeft = Math.min(0, A), i.maxLeft = Math.max(0, A)), i.height >= a.height && (i.minTop = Math.min(0, $), i.maxTop = Math.max(0, $))));
      } else
        i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = a.width, i.maxTop = a.height;
  },
  renderCanvas: function(e, t) {
    var n = this.canvasData, a = this.imageData;
    if (t) {
      var i = Fs({
        width: a.naturalWidth * Math.abs(a.scaleX || 1),
        height: a.naturalHeight * Math.abs(a.scaleY || 1),
        degree: a.rotate || 0
      }), l = i.width, f = i.height, v = n.width * (l / n.naturalWidth), p = n.height * (f / n.naturalHeight);
      n.left -= (v - n.width) / 2, n.top -= (p - n.height) / 2, n.width = v, n.height = p, n.aspectRatio = l / f, n.naturalWidth = l, n.naturalHeight = f, this.limitCanvas(!0, !1);
    }
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCanvas(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, $e(this.canvas, te({
      width: n.width,
      height: n.height
    }, et({
      translateX: n.left,
      translateY: n.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var t = this.canvasData, n = this.imageData, a = n.naturalWidth * (t.width / t.naturalWidth), i = n.naturalHeight * (t.height / t.naturalHeight);
    te(n, {
      width: a,
      height: i,
      left: (t.width - a) / 2,
      top: (t.height - i) / 2
    }), $e(this.image, te({
      width: n.width,
      height: n.height
    }, et(te({
      translateX: n.left,
      translateY: n.top
    }, n)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, n = e.aspectRatio || e.initialAspectRatio, a = Number(e.autoCropArea) || 0.8, i = {
      width: t.width,
      height: t.height
    };
    n && (t.height * n > t.width ? i.height = i.width / n : i.width = i.height * n), this.cropBoxData = i, this.limitCropBox(!0, !0), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), i.width = Math.max(i.minWidth, i.width * a), i.height = Math.max(i.minHeight, i.height * a), i.left = t.left + (t.width - i.width) / 2, i.top = t.top + (t.height - i.height) / 2, i.oldLeft = i.left, i.oldTop = i.top, this.initialCropBoxData = te({}, i);
  },
  limitCropBox: function(e, t) {
    var n = this.options, a = this.containerData, i = this.canvasData, l = this.cropBoxData, f = this.limited, v = n.aspectRatio;
    if (e) {
      var p = Number(n.minCropBoxWidth) || 0, h = Number(n.minCropBoxHeight) || 0, m = f ? Math.min(a.width, i.width, i.width + i.left, a.width - i.left) : a.width, b = f ? Math.min(a.height, i.height, i.height + i.top, a.height - i.top) : a.height;
      p = Math.min(p, a.width), h = Math.min(h, a.height), v && (p && h ? h * v > p ? h = p / v : p = h * v : p ? h = p / v : h && (p = h * v), b * v > m ? b = m / v : m = b * v), l.minWidth = Math.min(p, m), l.minHeight = Math.min(h, b), l.maxWidth = m, l.maxHeight = b;
    }
    t && (f ? (l.minLeft = Math.max(0, i.left), l.minTop = Math.max(0, i.top), l.maxLeft = Math.min(a.width, i.left + i.width) - l.width, l.maxTop = Math.min(a.height, i.top + i.height) - l.height) : (l.minLeft = 0, l.minTop = 0, l.maxLeft = a.width - l.width, l.maxTop = a.height - l.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, n = this.cropBoxData;
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCropBox(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, e.movable && e.cropBoxMovable && rt(this.face, tt, n.width >= t.width && n.height >= t.height ? Or : Bt), $e(this.cropBox, te({
      width: n.width,
      height: n.height
    }, et({
      translateX: n.left,
      translateY: n.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), Ke(this.element, At, this.getData());
  }
}, il = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, n = this.options.preview, a = t ? this.crossOriginUrl : this.url, i = e.alt || "The image to preview", l = document.createElement("img");
    if (t && (l.crossOrigin = t), l.src = a, l.alt = i, this.viewBox.appendChild(l), this.viewBoxImage = l, !!n) {
      var f = n;
      typeof n == "string" ? f = e.ownerDocument.querySelectorAll(n) : n.querySelector && (f = [n]), this.previews = f, oe(f, function(v) {
        var p = document.createElement("img");
        rt(v, ct, {
          width: v.offsetWidth,
          height: v.offsetHeight,
          html: v.innerHTML
        }), t && (p.crossOrigin = t), p.src = a, p.alt = i, p.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', v.innerHTML = "", v.appendChild(p);
      });
    }
  },
  resetPreview: function() {
    oe(this.previews, function(e) {
      var t = Lt(e, ct);
      $e(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, Ks(e, ct);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, n = this.cropBoxData, a = n.width, i = n.height, l = e.width, f = e.height, v = n.left - t.left - e.left, p = n.top - t.top - e.top;
    !this.cropped || this.disabled || ($e(this.viewBoxImage, te({
      width: l,
      height: f
    }, et(te({
      translateX: -v,
      translateY: -p
    }, e)))), oe(this.previews, function(h) {
      var m = Lt(h, ct), b = m.width, A = m.height, $ = b, T = A, N = 1;
      a && (N = b / a, T = i * N), i && T > A && (N = A / i, $ = a * N, T = A), $e(h, {
        width: $,
        height: T
      }), $e(h.getElementsByTagName("img")[0], te({
        width: l * N,
        height: f * N
      }, et(te({
        translateX: -v * N,
        translateY: -p * N
      }, e))));
    }));
  }
}, nl = {
  bind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    he(t.cropstart) && ge(e, It, t.cropstart), he(t.cropmove) && ge(e, Pt, t.cropmove), he(t.cropend) && ge(e, Ot, t.cropend), he(t.crop) && ge(e, At, t.crop), he(t.zoom) && ge(e, Nt, t.zoom), ge(n, gr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && ge(n, xr, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ge(n, pr, this.onDblclick = this.dblclick.bind(this)), ge(e.ownerDocument, vr, this.onCropMove = this.cropMove.bind(this)), ge(e.ownerDocument, br, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && ge(window, wr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    he(t.cropstart) && ye(e, It, t.cropstart), he(t.cropmove) && ye(e, Pt, t.cropmove), he(t.cropend) && ye(e, Ot, t.cropend), he(t.crop) && ye(e, At, t.crop), he(t.zoom) && ye(e, Nt, t.zoom), ye(n, gr, this.onCropStart), t.zoomable && t.zoomOnWheel && ye(n, xr, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ye(n, pr, this.onDblclick), ye(e.ownerDocument, vr, this.onCropMove), ye(e.ownerDocument, br, this.onCropEnd), t.responsive && ye(window, wr, this.onResize);
  }
}, ol = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, n = this.containerData, a = t.offsetWidth / n.width, i = t.offsetHeight / n.height, l = Math.abs(a - 1) > Math.abs(i - 1) ? a : i;
      if (l !== 1) {
        var f, v;
        e.restore && (f = this.getCanvasData(), v = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(oe(f, function(p, h) {
          f[h] = p * l;
        })), this.setCropBoxData(oe(v, function(p, h) {
          v[h] = p * l;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Nr || this.setDragMode(Hs(this.dragBox, Et) ? Ir : Rt);
  },
  wheel: function(e) {
    var t = this, n = Number(this.options.wheelZoomRatio) || 0.1, a = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      t.wheeling = !1;
    }, 50), e.deltaY ? a = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? a = -e.wheelDelta / 120 : e.detail && (a = e.detail > 0 ? 1 : -1), this.zoom(-a * n, e)));
  },
  cropStart: function(e) {
    var t = e.buttons, n = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (W(t) && t !== 1 || W(n) && n !== 0 || e.ctrlKey))) {
      var a = this.options, i = this.pointers, l;
      e.changedTouches ? oe(e.changedTouches, function(f) {
        i[f.identifier] = ut(f);
      }) : i[e.pointerId || 0] = ut(e), Object.keys(i).length > 1 && a.zoomable && a.zoomOnTouch ? l = Pr : l = Lt(e.target, tt), !!Os.test(l) && Ke(this.element, It, {
        originalEvent: e,
        action: l
      }) !== !1 && (e.preventDefault(), this.action = l, this.cropping = !1, l === Ar && (this.cropping = !0, se(this.dragBox, mt)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var n = this.pointers;
      e.preventDefault(), Ke(this.element, Pt, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? oe(e.changedTouches, function(a) {
        te(n[a.identifier] || {}, ut(a, !0));
      }) : te(n[e.pointerId || 0] || {}, ut(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, n = this.pointers;
      e.changedTouches ? oe(e.changedTouches, function(a) {
        delete n[a.identifier];
      }) : delete n[e.pointerId || 0], t && (e.preventDefault(), Object.keys(n).length || (this.action = ""), this.cropping && (this.cropping = !1, He(this.dragBox, mt, this.cropped && this.options.modal)), Ke(this.element, Ot, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, al = {
  change: function(e) {
    var t = this.options, n = this.canvasData, a = this.containerData, i = this.cropBoxData, l = this.pointers, f = this.action, v = t.aspectRatio, p = i.left, h = i.top, m = i.width, b = i.height, A = p + m, $ = h + b, T = 0, N = 0, z = a.width, B = a.height, P = !0, ae;
    !v && e.shiftKey && (v = m && b ? m / b : 1), this.limited && (T = i.minLeft, N = i.minTop, z = T + Math.min(a.width, n.width, n.left + n.width), B = N + Math.min(a.height, n.height, n.top + n.height));
    var G = l[Object.keys(l)[0]], D = {
      x: G.endX - G.startX,
      y: G.endY - G.startY
    }, X = function(ce) {
      switch (ce) {
        case Te:
          A + D.x > z && (D.x = z - A);
          break;
        case Ae:
          p + D.x < T && (D.x = T - p);
          break;
        case Ce:
          h + D.y < N && (D.y = N - h);
          break;
        case Be:
          $ + D.y > B && (D.y = B - $);
          break;
      }
    };
    switch (f) {
      case Bt:
        p += D.x, h += D.y;
        break;
      case Te:
        if (D.x >= 0 && (A >= z || v && (h <= N || $ >= B))) {
          P = !1;
          break;
        }
        X(Te), m += D.x, m < 0 && (f = Ae, m = -m, p -= m), v && (b = m / v, h += (i.height - b) / 2);
        break;
      case Ce:
        if (D.y <= 0 && (h <= N || v && (p <= T || A >= z))) {
          P = !1;
          break;
        }
        X(Ce), b -= D.y, h += D.y, b < 0 && (f = Be, b = -b, h -= b), v && (m = b * v, p += (i.width - m) / 2);
        break;
      case Ae:
        if (D.x <= 0 && (p <= T || v && (h <= N || $ >= B))) {
          P = !1;
          break;
        }
        X(Ae), m -= D.x, p += D.x, m < 0 && (f = Te, m = -m, p -= m), v && (b = m / v, h += (i.height - b) / 2);
        break;
      case Be:
        if (D.y >= 0 && ($ >= B || v && (p <= T || A >= z))) {
          P = !1;
          break;
        }
        X(Be), b += D.y, b < 0 && (f = Ce, b = -b, h -= b), v && (m = b * v, p += (i.width - m) / 2);
        break;
      case Ge:
        if (v) {
          if (D.y <= 0 && (h <= N || A >= z)) {
            P = !1;
            break;
          }
          X(Ce), b -= D.y, h += D.y, m = b * v;
        } else
          X(Ce), X(Te), D.x >= 0 ? A < z ? m += D.x : D.y <= 0 && h <= N && (P = !1) : m += D.x, D.y <= 0 ? h > N && (b -= D.y, h += D.y) : (b -= D.y, h += D.y);
        m < 0 && b < 0 ? (f = Qe, b = -b, m = -m, h -= b, p -= m) : m < 0 ? (f = Je, m = -m, p -= m) : b < 0 && (f = Ze, b = -b, h -= b);
        break;
      case Je:
        if (v) {
          if (D.y <= 0 && (h <= N || p <= T)) {
            P = !1;
            break;
          }
          X(Ce), b -= D.y, h += D.y, m = b * v, p += i.width - m;
        } else
          X(Ce), X(Ae), D.x <= 0 ? p > T ? (m -= D.x, p += D.x) : D.y <= 0 && h <= N && (P = !1) : (m -= D.x, p += D.x), D.y <= 0 ? h > N && (b -= D.y, h += D.y) : (b -= D.y, h += D.y);
        m < 0 && b < 0 ? (f = Ze, b = -b, m = -m, h -= b, p -= m) : m < 0 ? (f = Ge, m = -m, p -= m) : b < 0 && (f = Qe, b = -b, h -= b);
        break;
      case Qe:
        if (v) {
          if (D.x <= 0 && (p <= T || $ >= B)) {
            P = !1;
            break;
          }
          X(Ae), m -= D.x, p += D.x, b = m / v;
        } else
          X(Be), X(Ae), D.x <= 0 ? p > T ? (m -= D.x, p += D.x) : D.y >= 0 && $ >= B && (P = !1) : (m -= D.x, p += D.x), D.y >= 0 ? $ < B && (b += D.y) : b += D.y;
        m < 0 && b < 0 ? (f = Ge, b = -b, m = -m, h -= b, p -= m) : m < 0 ? (f = Ze, m = -m, p -= m) : b < 0 && (f = Je, b = -b, h -= b);
        break;
      case Ze:
        if (v) {
          if (D.x >= 0 && (A >= z || $ >= B)) {
            P = !1;
            break;
          }
          X(Te), m += D.x, b = m / v;
        } else
          X(Be), X(Te), D.x >= 0 ? A < z ? m += D.x : D.y >= 0 && $ >= B && (P = !1) : m += D.x, D.y >= 0 ? $ < B && (b += D.y) : b += D.y;
        m < 0 && b < 0 ? (f = Je, b = -b, m = -m, h -= b, p -= m) : m < 0 ? (f = Qe, m = -m, p -= m) : b < 0 && (f = Ge, b = -b, h -= b);
        break;
      case Or:
        this.move(D.x, D.y), P = !1;
        break;
      case Pr:
        this.zoom(Ws(l), e), P = !1;
        break;
      case Ar:
        if (!D.x || !D.y) {
          P = !1;
          break;
        }
        ae = Rr(this.cropper), p = G.startX - ae.left, h = G.startY - ae.top, m = i.minWidth, b = i.minHeight, D.x > 0 ? f = D.y > 0 ? Ze : Ge : D.x < 0 && (p -= m, f = D.y > 0 ? Qe : Je), D.y < 0 && (h -= b), this.cropped || (xe(this.cropBox, fe), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    P && (i.width = m, i.height = b, i.left = p, i.top = h, this.action = f, this.renderCropBox()), oe(l, function(J) {
      J.startX = J.endX, J.startY = J.endY;
    });
  }
}, sl = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && se(this.dragBox, mt), xe(this.cropBox, fe), this.setCropBoxData(this.initialCropBoxData)), this;
  },
  reset: function() {
    return this.ready && !this.disabled && (this.imageData = te({}, this.initialImageData), this.canvasData = te({}, this.initialCanvasData), this.cropBoxData = te({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this;
  },
  clear: function() {
    return this.cropped && !this.disabled && (te(this.cropBoxData, {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), xe(this.dragBox, mt), se(this.cropBox, fe)), this;
  },
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, oe(this.previews, function(n) {
      n.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, xe(this.cropper, fr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, se(this.cropper, fr)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[Q] ? (e[Q] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, a = n.left, i = n.top;
    return this.moveTo(_t(e) ? e : a + Number(e), _t(t) ? t : i + Number(t));
  },
  moveTo: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, a = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (W(e) && (n.left = e, a = !0), W(t) && (n.top = t, a = !0), a && this.renderCanvas(!0)), this;
  },
  zoom: function(e, t) {
    var n = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(n.width * e / n.naturalWidth, null, t);
  },
  zoomTo: function(e, t, n) {
    var a = this.options, i = this.canvasData, l = i.width, f = i.height, v = i.naturalWidth, p = i.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && a.zoomable) {
      var h = v * e, m = p * e;
      if (Ke(this.element, Nt, {
        ratio: e,
        oldRatio: l / v,
        originalEvent: n
      }) === !1)
        return this;
      if (n) {
        var b = this.pointers, A = Rr(this.cropper), $ = b && Object.keys(b).length ? Xs(b) : {
          pageX: n.pageX,
          pageY: n.pageY
        };
        i.left -= (h - l) * (($.pageX - A.left - i.left) / l), i.top -= (m - f) * (($.pageY - A.top - i.top) / f);
      } else
        Re(t) && W(t.x) && W(t.y) ? (i.left -= (h - l) * ((t.x - i.left) / l), i.top -= (m - f) * ((t.y - i.top) / f)) : (i.left -= (h - l) / 2, i.top -= (m - f) / 2);
      i.width = h, i.height = m, this.renderCanvas(!0);
    }
    return this;
  },
  rotate: function(e) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(e));
  },
  rotateTo: function(e) {
    return e = Number(e), W(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
  },
  scaleX: function(e) {
    var t = this.imageData.scaleY;
    return this.scale(e, W(t) ? t : 1);
  },
  scaleY: function(e) {
    var t = this.imageData.scaleX;
    return this.scale(W(t) ? t : 1, e);
  },
  scale: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.imageData, a = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (W(e) && (n.scaleX = e, a = !0), W(t) && (n.scaleY = t, a = !0), a && this.renderCanvas(!0, !0)), this;
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
      if (oe(l, function(h, m) {
        l[m] = h / f;
      }), e) {
        var v = Math.round(l.y + l.height), p = Math.round(l.x + l.width);
        l.x = Math.round(l.x), l.y = Math.round(l.y), l.width = p - l.x, l.height = v - l.y;
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
    if (this.ready && !this.disabled && Re(e)) {
      var l = !1;
      t.rotatable && W(e.rotate) && e.rotate !== n.rotate && (n.rotate = e.rotate, l = !0), t.scalable && (W(e.scaleX) && e.scaleX !== n.scaleX && (n.scaleX = e.scaleX, l = !0), W(e.scaleY) && e.scaleY !== n.scaleY && (n.scaleY = e.scaleY, l = !0)), l && this.renderCanvas(!0, !0);
      var f = n.width / n.naturalWidth;
      W(e.x) && (i.left = e.x * f + a.left), W(e.y) && (i.top = e.y * f + a.top), W(e.width) && (i.width = e.width * f), W(e.height) && (i.height = e.height * f), this.setCropBoxData(i);
    }
    return this;
  },
  getContainerData: function() {
    return this.ready ? te({}, this.containerData) : {};
  },
  getImageData: function() {
    return this.sized ? te({}, this.imageData) : {};
  },
  getCanvasData: function() {
    var e = this.canvasData, t = {};
    return this.ready && oe(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(n) {
      t[n] = e[n];
    }), t;
  },
  setCanvasData: function(e) {
    var t = this.canvasData, n = t.aspectRatio;
    return this.ready && !this.disabled && Re(e) && (W(e.left) && (t.left = e.left), W(e.top) && (t.top = e.top), W(e.width) ? (t.width = e.width, t.height = e.width / n) : W(e.height) && (t.height = e.height, t.width = e.height * n), this.renderCanvas(!0)), this;
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
    return this.ready && this.cropped && !this.disabled && Re(e) && (W(e.left) && (t.left = e.left), W(e.top) && (t.top = e.top), W(e.width) && e.width !== t.width && (a = !0, t.width = e.width), W(e.height) && e.height !== t.height && (i = !0, t.height = e.height), n && (a ? t.height = t.width / n : i && (t.width = t.height * n)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, n = qs(this.image, this.imageData, t, e);
    if (!this.cropped)
      return n;
    var a = this.getData(), i = a.x, l = a.y, f = a.width, v = a.height, p = n.width / Math.floor(t.naturalWidth);
    p !== 1 && (i *= p, l *= p, f *= p, v *= p);
    var h = f / v, m = Ee({
      aspectRatio: h,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Ee({
      aspectRatio: h,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), A = Ee({
      aspectRatio: h,
      width: e.width || (p !== 1 ? n.width : f),
      height: e.height || (p !== 1 ? n.height : v)
    }), $ = A.width, T = A.height;
    $ = Math.min(m.width, Math.max(b.width, $)), T = Math.min(m.height, Math.max(b.height, T));
    var N = document.createElement("canvas"), z = N.getContext("2d");
    N.width = Ue($), N.height = Ue(T), z.fillStyle = e.fillColor || "transparent", z.fillRect(0, 0, $, T);
    var B = e.imageSmoothingEnabled, P = B === void 0 ? !0 : B, ae = e.imageSmoothingQuality;
    z.imageSmoothingEnabled = P, ae && (z.imageSmoothingQuality = ae);
    var G = n.width, D = n.height, X = i, J = l, ce, me, L, U, I, Y;
    X <= -f || X > G ? (X = 0, ce = 0, L = 0, I = 0) : X <= 0 ? (L = -X, X = 0, ce = Math.min(G, f + X), I = ce) : X <= G && (L = 0, ce = Math.min(f, G - X), I = ce), ce <= 0 || J <= -v || J > D ? (J = 0, me = 0, U = 0, Y = 0) : J <= 0 ? (U = -J, J = 0, me = Math.min(D, v + J), Y = me) : J <= D && (U = 0, me = Math.min(v, D - J), Y = me);
    var H = [X, J, ce, me];
    if (I > 0 && Y > 0) {
      var ie = $ / f;
      H.push(L * ie, U * ie, I * ie, Y * ie);
    }
    return z.drawImage.apply(z, [n].concat(Tr(H.map(function(Z) {
      return Math.floor(Ue(Z));
    })))), N;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !_t(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, n = this.dragBox, a = this.face;
    if (this.ready && !this.disabled) {
      var i = e === Rt, l = t.movable && e === Ir;
      e = i || l ? e : Nr, t.dragMode = e, rt(n, tt, e), He(n, Et, i), He(n, Tt, l), t.cropBoxMovable || (rt(a, tt, e), He(a, Et, i), He(a, Tt, l));
    }
    return this;
  }
}, ll = ke.Cropper, Ur = /* @__PURE__ */ function() {
  function o(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (xs(this, o), !e || !Ns.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = te({}, kr, Re(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return _s(o, [{
    key: "init",
    value: function() {
      var t = this.element, n = t.tagName.toLowerCase(), a;
      if (!t[Q]) {
        if (t[Q] = this, n === "img") {
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
        if (Ps.test(t)) {
          Is.test(t) ? this.read(Zs(t)) : this.clone();
          return;
        }
        var l = new XMLHttpRequest(), f = this.clone.bind(this);
        this.reloading = !0, this.xhr = l, l.onabort = f, l.onerror = f, l.ontimeout = f, l.onprogress = function() {
          l.getResponseHeader("content-type") !== _r && l.abort();
        }, l.onload = function() {
          n.read(l.response);
        }, l.onloadend = function() {
          n.reloading = !1, n.xhr = null;
        }, i.checkCrossOrigin && Dr(t) && a.crossOrigin && (t = Mr(t)), l.open("GET", t, !0), l.responseType = "arraybuffer", l.withCredentials = a.crossOrigin === "use-credentials", l.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var n = this.options, a = this.imageData, i = el(t), l = 0, f = 1, v = 1;
      if (i > 1) {
        this.url = Qs(t, _r);
        var p = tl(i);
        l = p.rotate, f = p.scaleX, v = p.scaleY;
      }
      n.rotatable && (a.rotate = l), n.scalable && (a.scaleX = f, a.scaleY = v), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, n = this.url, a = t.crossOrigin, i = n;
      this.options.checkCrossOrigin && Dr(n) && (a || (a = "anonymous"), i = Mr(n)), this.crossOrigin = a, this.crossOriginUrl = i;
      var l = document.createElement("img");
      a && (l.crossOrigin = a), l.src = i || n, l.alt = t.alt || "The image to crop", this.image = l, l.onload = this.start.bind(this), l.onerror = this.stop.bind(this), se(l, mr), t.parentNode.insertBefore(l, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, n = this.image;
      n.onload = null, n.onerror = null, this.sizing = !0;
      var a = ke.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(ke.navigator.userAgent), i = function(p, h) {
        te(t.imageData, {
          naturalWidth: p,
          naturalHeight: h,
          aspectRatio: p / h
        }), t.initialImageData = te({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
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
        l.innerHTML = Ls;
        var f = l.querySelector(".".concat(Q, "-container")), v = f.querySelector(".".concat(Q, "-canvas")), p = f.querySelector(".".concat(Q, "-drag-box")), h = f.querySelector(".".concat(Q, "-crop-box")), m = h.querySelector(".".concat(Q, "-face"));
        this.container = i, this.cropper = f, this.canvas = v, this.dragBox = p, this.cropBox = h, this.viewBox = f.querySelector(".".concat(Q, "-view-box")), this.face = m, v.appendChild(a), se(t, fe), i.insertBefore(f, t.nextSibling), this.isImg || xe(a, mr), this.initPreview(), this.bind(), n.initialAspectRatio = Math.max(0, n.initialAspectRatio) || NaN, n.aspectRatio = Math.max(0, n.aspectRatio) || NaN, n.viewMode = Math.max(0, Math.min(3, Math.round(n.viewMode))) || 0, se(h, fe), n.guides || se(h.getElementsByClassName("".concat(Q, "-dashed")), fe), n.center || se(h.getElementsByClassName("".concat(Q, "-center")), fe), n.background && se(f, "".concat(Q, "-bg")), n.highlight || se(m, $s), n.cropBoxMovable && (se(m, Tt), rt(m, tt, Bt)), n.cropBoxResizable || (se(h.getElementsByClassName("".concat(Q, "-line")), fe), se(h.getElementsByClassName("".concat(Q, "-point")), fe)), this.render(), this.ready = !0, this.setDragMode(n.dragMode), n.autoCrop && this.crop(), this.setData(n.data), he(n.ready) && ge(t, yr, n.ready, {
          once: !0
        }), Ke(t, yr);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      !this.ready || (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), xe(this.element, fe));
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = ll, o;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      te(kr, Re(t) && t);
    }
  }]), o;
}();
te(Ur.prototype, rl, il, nl, ol, al, sl);
const cl = { class: "flex" }, ul = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, dl = { class: "ml-auto mb-2" }, hl = { class: "w-full flex justify-center" }, fl = ["src"], ml = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { t: n } = R("i18n"), { apiUrl: a } = Se(), i = j(null), l = j(null), f = j(!1), v = () => {
      f.value = !f.value, f.value ? l.value = new Ur(i.value, {
        crop(h) {
        }
      }) : l.value.destroy();
    }, p = () => {
      l.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (h) => {
          ft(a.value, {
            method: "POST",
            params: { q: "upload", adapter: t.selection.adapter, path: t.selection.item.path, file: h },
            name: t.selection.item.basename,
            json: !1
          }).then((m) => {
            i.value.src = Ct(t.selection.adapter, t.selection.item.path), v(), e("load");
          }).catch((m) => console.log(m.statusText));
        }
      );
    };
    return onMounted(() => {
      e("load");
    }), (h, m) => (w(), M(le, null, [
      d("div", cl, [
        d("h3", ul, C(o.selection.item.basename), 1),
        d("div", dl, [
          f.value ? (w(), M("button", {
            key: 0,
            onClick: p,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, C(_(n)("Crop")), 1)) : q("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: m[0] || (m[0] = (b) => v())
          }, C(f.value ? _(n)("Cancel") : _(n)("Edit")), 1)
        ])
      ]),
      d("div", hl, [
        d("img", {
          ref_key: "image",
          ref: i,
          class: "max-w-[60vh] max-h-[60vh]",
          src: _(Ct)(t.selection.adapter, t.selection.item.path),
          alt: ""
        }, null, 8, fl)
      ])
    ], 64));
  }
}, pl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, gl = /* @__PURE__ */ d("div", null, " Default view.. ", -1), vl = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    return _e(() => {
      e("load");
    }), (t, n) => (w(), M(le, null, [
      d("h3", pl, C(o.selection.item.basename), 1),
      gl
    ], 64));
  }
}, bl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, yl = {
  class: "w-full",
  preload: "",
  controls: ""
}, wl = ["src"], xl = /* @__PURE__ */ de(" Your browser does not support the video tag. "), _l = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = Se(), a = () => n.value + "?" + Ie({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return _e(() => {
      e("load");
    }), (i, l) => (w(), M(le, null, [
      d("h3", bl, C(o.selection.item.basename), 1),
      d("div", null, [
        d("video", yl, [
          d("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, wl),
          xl
        ])
      ])
    ], 64));
  }
}, kl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Sl = {
  class: "w-full",
  controls: ""
}, Dl = ["src"], Ml = /* @__PURE__ */ de(" Your browser does not support the audio element. "), Cl = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = Se(), a = () => n.value + "?" + Ie({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return _e(() => {
      e("load");
    }), (i, l) => (w(), M(le, null, [
      d("h3", kl, C(o.selection.item.basename), 1),
      d("div", null, [
        d("audio", Sl, [
          d("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Dl),
          Ml
        ])
      ])
    ], 64));
  }
}, $l = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, El = ["data"], Tl = ["src"], Al = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = Se(), a = () => n.value + "?" + Ie({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return _e(() => {
      e("load");
    }), (i, l) => (w(), M(le, null, [
      d("h3", $l, C(o.selection.item.basename), 1),
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
        `, 8, Tl)
        ], 8, El)
      ])
    ], 64));
  }
}, Ol = { class: "sm:flex sm:items-start" }, Pl = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Il = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Nl = {
  key: 0,
  class: "flex leading-5"
}, Ll = /* @__PURE__ */ d("svg", {
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
], -1), jl = {
  name: "VFModalPreview"
}, Vl = /* @__PURE__ */ Object.assign(jl, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = o, { apiUrl: t } = Se(), n = R("emitter"), { t: a } = R("i18n"), i = j(!1), l = (p) => i.value = p, f = (p) => {
      var h;
      return ((h = e.selection.item.mime_type) != null ? h : "").startsWith(p);
    }, v = () => {
      const p = t.value + "?" + Ie({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      n.emit("vf-download", p);
    };
    return (p, h) => (w(), ee(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: h[6] || (h[6] = (m) => _(n).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(a)("Close")), 1),
        d("button", {
          type: "button",
          onClick: h[7] || (h[7] = (m) => v()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(a)("Download")), 1)
      ]),
      default: F(() => [
        d("div", Ol, [
          d("div", Pl, [
            d("div", null, [
              f("text") ? (w(), ee(ws, {
                key: 0,
                selection: o.selection,
                onLoad: h[0] || (h[0] = (m) => l(!0))
              }, null, 8, ["selection"])) : f("image") ? (w(), ee(ml, {
                key: 1,
                selection: o.selection,
                onLoad: h[1] || (h[1] = (m) => l(!0))
              }, null, 8, ["selection"])) : f("video") ? (w(), ee(_l, {
                key: 2,
                selection: o.selection,
                onLoad: h[2] || (h[2] = (m) => l(!0))
              }, null, 8, ["selection"])) : f("audio") ? (w(), ee(Cl, {
                key: 3,
                selection: o.selection,
                onLoad: h[3] || (h[3] = (m) => l(!0))
              }, null, 8, ["selection"])) : f("application/pdf") ? (w(), ee(Al, {
                key: 4,
                selection: o.selection,
                onLoad: h[4] || (h[4] = (m) => l(!0))
              }, null, 8, ["selection"])) : (w(), ee(vl, {
                key: 5,
                selection: o.selection,
                onLoad: h[5] || (h[5] = (m) => l(!0))
              }, null, 8, ["selection"]))
            ]),
            d("div", Il, [
              d("p", null, C(o.selection.item.path), 1),
              d("p", null, "mime_type: " + C(o.selection.item.mime_type), 1),
              i.value == !1 ? (w(), M("div", Nl, [
                Ll,
                d("span", null, C(_(a)("Loading")), 1)
              ])) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), zl = { class: "sm:flex sm:items-start" }, Bl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Rl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Hl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ul = { class: "mt-2" }, Kl = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Yl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Xl = [
  Wl
], Fl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ql = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Gl = [
  ql
], Jl = { class: "ml-1.5" }, Zl = ["onKeyup"], Ql = {
  name: "VFModalRename"
}, ec = /* @__PURE__ */ Object.assign(Ql, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = j(e.selection.items[0]), l = j(e.selection.items[0].basename), f = j(""), v = () => {
      l.value != "" && t.emit("vf-fetch", {
        params: {
          q: "rename",
          adapter: n("adapter", "local"),
          path: e.current.dirname,
          item: i.value.path,
          name: l.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: a("%s is renamed.", l.value) });
        },
        onError: (p) => {
          f.value = a(p.message);
        }
      });
    };
    return (p, h) => (w(), ee(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: v,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(a)("Rename")), 1),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (m) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        d("div", zl, [
          Bl,
          d("div", Rl, [
            d("h3", Hl, C(_(a)("Rename")), 1),
            d("div", Ul, [
              d("p", Kl, [
                i.value.type == "dir" ? (w(), M("svg", Yl, Xl)) : (w(), M("svg", Fl, Gl)),
                d("span", Jl, C(i.value.basename), 1)
              ]),
              ve(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (m) => l.value = m),
                onKeyup: Ye(v, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Zl), [
                [We, l.value]
              ]),
              f.value.length ? (w(), ee(Ne, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  de(C(f.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), tc = { class: "sm:flex sm:items-start" }, rc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ic = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, nc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, oc = { class: "mt-2" }, ac = { class: "text-gray-500 mb-1" }, sc = ["id"], lc = {
  key: 0,
  class: "py-2"
}, cc = ["disabled", "onClick"], uc = {
  name: "VFModalUpload"
}, dc = /* @__PURE__ */ Object.assign(uc, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { apiUrl: n } = Se(), { t: a } = R("i18n"), i = j(null), l = j(null), f = j(null), v = j([]), p = j(!0), h = () => {
      i.value.start();
    };
    return _e(() => {
      i.value = new xt.Uploader({
        runtimes: "html5",
        browse_button: f.value,
        container: l.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: n.value + "?" + Ie({ q: "upload", adapter: e.current.adapter, path: e.current.dirname }),
        init: {
          PostInit: function() {
          },
          FilesAdded: function(m, b) {
            p.value = !1, xt.each(b, function(A) {
              v.value.push({
                id: A.id,
                name: A.name,
                size: xt.formatSize(A.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(m, b) {
            v.value[v.value.findIndex((A) => A.id == b.id)].percent = b.percent + "%";
          },
          UploadComplete: function() {
            p.value = !0, t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
          },
          Error: function(m, b) {
          }
        }
      }), i.value.init();
    }), (m, b) => (w(), ee(De, null, {
      buttons: F(() => [
        d("button", {
          disabled: p.value,
          onClick: Oe(h, ["prevent"]),
          type: "button",
          class: ue([p.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, C(_(a)("Upload")), 11, cc),
        d("button", {
          type: "button",
          onClick: b[0] || (b[0] = (A) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        d("div", tc, [
          rc,
          d("div", ic, [
            d("h3", nc, C(_(a)("Upload files")), 1),
            d("div", oc, [
              d("div", ac, [
                (w(!0), M(le, null, be(v.value, (A) => (w(), M("div", null, [
                  d("div", {
                    id: A.id
                  }, [
                    de(C(A.name) + " ( " + C(A.size) + ") ", 1),
                    d("b", null, C(A.percent), 1)
                  ], 8, sc)
                ]))), 256)),
                v.value.length ? q("", !0) : (w(), M("div", lc, C(_(a)("No files selected!")), 1))
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
                }, C(_(a)("Select Files")), 513)
              ], 512)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), hc = { class: "sm:flex sm:items-start" }, fc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), mc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, pc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, gc = { class: "mt-2" }, vc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, bc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, yc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), wc = [
  yc
], xc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, _c = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), kc = [
  _c
], Sc = { class: "ml-1.5" }, Dc = ["onKeyup", "placeholder"], Mc = {
  name: "VFModalArchive"
}, Cc = /* @__PURE__ */ Object.assign(Mc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = j(""), l = j(""), f = j(e.selection.items), v = () => {
      f.value.length && t.emit("vf-fetch", {
        params: {
          q: "archive",
          adapter: n("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(f.value.map(({ path: p, type: h }) => ({ path: p, type: h }))),
          name: i.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: a("The file(s) archived.") });
        },
        onError: (p) => {
          l.value = a(p.message);
        }
      });
    };
    return (p, h) => (w(), ee(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: v,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(a)("Archive")), 1),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (m) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        d("div", hc, [
          fc,
          d("div", mc, [
            d("h3", pc, C(_(a)("Archive the files")), 1),
            d("div", gc, [
              (w(!0), M(le, null, be(f.value, (m) => (w(), M("p", vc, [
                m.type == "dir" ? (w(), M("svg", bc, wc)) : (w(), M("svg", xc, kc)),
                d("span", Sc, C(m.basename), 1)
              ]))), 256)),
              ve(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (m) => i.value = m),
                onKeyup: Ye(v, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Dc), [
                [We, i.value]
              ]),
              l.value.length ? (w(), ee(Ne, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  de(C(l.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), $c = { class: "sm:flex sm:items-start" }, Ec = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Tc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ac = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Oc = { class: "mt-2" }, Pc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ic = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Lc = [
  Nc
], jc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), zc = [
  Vc
], Bc = { class: "ml-1.5" }, Rc = { class: "my-1 text-sm text-gray-500" }, Hc = {
  name: "VFModalUnarchive"
}, Uc = /* @__PURE__ */ Object.assign(Hc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n");
    j("");
    const i = j(e.selection.items[0]), l = j(""), f = j([]), v = () => {
      t.emit("vf-fetch", {
        params: {
          q: "unarchive",
          adapter: n("adapter", "local"),
          path: e.current.dirname,
          item: i.value.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: a("The file unarchived.") });
        },
        onError: (p) => {
          l.value = a(p.message);
        }
      });
    };
    return (p, h) => (w(), ee(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: v,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(a)("Unarchive")), 1),
        d("button", {
          type: "button",
          onClick: h[0] || (h[0] = (m) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        d("div", $c, [
          Ec,
          d("div", Tc, [
            d("h3", Ac, C(_(a)("Unarchive")), 1),
            d("div", Oc, [
              (w(!0), M(le, null, be(f.value, (m) => (w(), M("p", Pc, [
                m.type == "dir" ? (w(), M("svg", Ic, Lc)) : (w(), M("svg", jc, zc)),
                d("span", Bc, C(m.basename), 1)
              ]))), 256)),
              d("p", Rc, C(_(a)("The archive will be unarchived at")) + " (" + C(o.current.dirname) + ")", 1),
              l.value.length ? (w(), ee(Ne, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  de(C(l.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Kc = { class: "sm:flex sm:items-start" }, Yc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Wc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Xc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Fc = { class: "mt-2" }, qc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Gc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Zc = [
  Jc
], Qc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, eu = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), tu = [
  eu
], ru = { class: "ml-1.5" }, iu = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Bu dosyalar\u0131 ta\u015F\u0131mak istedi\u011Finizden emin misiniz?", -1), nu = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ou = /* @__PURE__ */ d("svg", {
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
], -1), au = { class: "ml-1.5 overflow-auto" }, su = {
  name: "VFModalMove"
}, lu = /* @__PURE__ */ Object.assign(su, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { t: n } = R("i18n"), { getStore: a } = R("storage"), i = j(e.selection.items.from), l = j(""), f = () => {
      i.value.length && t.emit("vf-fetch", {
        params: {
          q: "move",
          adapter: a("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(i.value.map(({ path: v, type: p }) => ({ path: v, type: p }))),
          item: e.selection.items.to.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("Files moved.", e.selection.items.to.name) });
        },
        onError: (v) => {
          l.value = n(v.message);
        }
      });
    };
    return (v, p) => (w(), ee(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(n)("Yes, Move!")), 1),
        d("button", {
          type: "button",
          onClick: p[0] || (p[0] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, C(_(n)("Cancel")), 1)
      ]),
      default: F(() => [
        d("div", Kc, [
          Yc,
          d("div", Wc, [
            d("h3", Xc, C(_(n)("Move files")), 1),
            d("div", Fc, [
              (w(!0), M(le, null, be(i.value, (h) => (w(), M("p", qc, [
                h.type == "dir" ? (w(), M("svg", Gc, Zc)) : (w(), M("svg", Qc, tu)),
                d("span", ru, C(h.path), 1)
              ]))), 256)),
              iu,
              d("p", nu, [
                ou,
                d("span", au, C(o.selection.items.to.path), 1)
              ]),
              l.value.length ? (w(), ee(Ne, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  de(C(l.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), cu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: Ha,
  ModalMessage: Ga,
  ModalNewFolder: os,
  ModalNewFile: ms,
  ModalPreview: Vl,
  ModalRename: ec,
  ModalUpload: dc,
  ModalArchive: Cc,
  ModalUnarchive: Uc,
  ModalMove: lu
}, Symbol.toStringTag, { value: "Module" })), St = {
  VueFinder: ya,
  ...cu
};
const hu = {
  install(o) {
    for (const e in St)
      if (St.hasOwnProperty(e)) {
        const t = St[e];
        o.component(t.name, t);
      }
  }
};
export {
  hu as default
};
