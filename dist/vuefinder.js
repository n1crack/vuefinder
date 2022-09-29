import { ref as I, watch as gt, inject as z, openBlock as y, createElementBlock as D, createElementVNode as d, unref as _, normalizeClass as de, createTextVNode as le, toDisplayString as T, createCommentVNode as G, createVNode as we, TransitionGroup as Ai, withCtx as J, Fragment as ce, renderList as be, reactive as ft, onMounted as xe, onUpdated as Oi, withDirectives as ve, vShow as lt, withModifiers as Pe, nextTick as vt, vModelSelect as cr, customRef as Pi, withKeys as Ye, isRef as Ii, vModelText as We, normalizeStyle as Mr, provide as Ge, createBlock as Z, resolveDynamicComponent as Li, renderSlot as Ct } from "vue";
import _t from "plupload";
const mt = (a, { method: e = "get", params: t = {}, json: i = !0, signal: n = null }) => {
  var s;
  const o = { method: e };
  if (o.signal = n, e == "get")
    a += "?" + new URLSearchParams(t);
  else {
    o.headers = {};
    const f = (s = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : s.getAttribute("content");
    f && (o.headers["X-CSRF-Token"] = f);
    let p = new FormData();
    for (const [m, h] of Object.entries(t))
      p.append(m, h);
    o.body = p;
  }
  return fetch(a, o).then((f) => f.ok ? i ? f.json() : f.text() : f.json().then(Promise.reject.bind(Promise)));
};
function Ni(a) {
  return { all: a = a || /* @__PURE__ */ new Map(), on: function(e, t) {
    var i = a.get(e);
    i ? i.push(t) : a.set(e, [t]);
  }, off: function(e, t) {
    var i = a.get(e);
    i && (t ? i.splice(i.indexOf(t) >>> 0, 1) : a.set(e, []));
  }, emit: function(e, t) {
    var i = a.get(e);
    i && i.slice().map(function(n) {
      n(t);
    }), (i = a.get("*")) && i.slice().map(function(n) {
      n(e, t);
    });
  } };
}
function Mt(a) {
  let e = localStorage.getItem(a + "_storage");
  const t = I(JSON.parse(e));
  gt(t, i);
  function i() {
    t.value === null || t.value === "" ? localStorage.removeItem(a + "_storage") : localStorage.setItem(a + "_storage", JSON.stringify(t.value));
  }
  function n(f, p) {
    t.value = Object.assign({ ...t.value }, { [f]: p });
  }
  function o() {
    t.value = null;
  }
  return { getStore: (f, p = null) => t.value === null || t.value === "" ? p : t.value.hasOwnProperty(f) ? t.value[f] : p, setStore: n, clearStore: o };
}
const ur = I("");
function Se() {
  function a(e) {
    ur.value = e;
  }
  return { apiUrl: ur, setApiUrl: a };
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
], eo = ["aria-label"], to = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), ro = [
  to
], io = ["aria-label"], oo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), ao = [
  oo
], no = {
  key: 1,
  class: "flex text-center"
}, so = { class: "pl-2" }, lo = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, co = {
  key: 0,
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, uo = /* @__PURE__ */ d("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), ho = /* @__PURE__ */ d("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), fo = [
  uo,
  ho
], mo = { class: "flex text-center items-center justify-end" }, po = ["aria-label"], go = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), vo = [
  go
], bo = ["aria-label"], yo = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, wo = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, xo = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, _o = ["aria-label"], ko = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, So = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, Do = {
  name: "VFToolbar"
}, Co = /* @__PURE__ */ Object.assign(Do, {
  props: {
    data: Object
  },
  setup(a) {
    const e = z("emitter"), { getStore: t, setStore: i } = z("storage"), { t: n } = z("i18n"), o = I(t("viewport", "grid")), s = I([]), f = I(t("full-screen", !1)), p = I("");
    e.on("vf-search-query", ({ newQuery: b }) => {
      p.value = b;
    });
    const m = z("loadingState"), h = () => m.value, v = () => {
      f.value = !f.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (b) => {
      s.value = b;
    }), e.on("vf-view-toggle", (b) => {
      i("viewport", b), o.value = b;
    }), (b, E) => (y(), D("div", ji, [
      p.value.length ? (y(), D("div", no, [
        d("div", so, [
          le(T(_(n)("Search results for")) + " ", 1),
          d("span", lo, T(p.value), 1)
        ]),
        h() ? (y(), D("svg", co, fo)) : G("", !0)
      ])) : (y(), D("div", Vi, [
        d("div", {
          class: "mx-1.5",
          "aria-label": _(n)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: E[0] || (E[0] = (k) => _(e).emit("vf-modal-show", { type: "new-folder", items: s.value }))
        }, Ri, 8, zi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(n)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: E[1] || (E[1] = (k) => _(e).emit("vf-modal-show", { type: "new-file", items: s.value }))
        }, Ki, 8, Hi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(n)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: E[2] || (E[2] = (k) => s.value.length != 1 || _(e).emit("vf-modal-show", { type: "rename", items: s.value }))
        }, [
          (y(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Xi, 2))
        ], 8, Yi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(n)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: E[3] || (E[3] = (k) => !s.value.length || _(e).emit("vf-modal-show", { type: "delete", items: s.value }))
        }, [
          (y(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Gi, 2))
        ], 8, Fi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(n)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: E[4] || (E[4] = (k) => _(e).emit("vf-modal-show", { type: "upload", items: s.value }))
        }, Qi, 8, Ji),
        s.value.length == 1 && s.value[0].mime_type == "application/zip" ? (y(), D("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": _(n)("Unrchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: E[5] || (E[5] = (k) => !s.value.length || _(e).emit("vf-modal-show", { type: "unarchive", items: s.value }))
        }, [
          (y(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ro, 2))
        ], 8, eo)) : (y(), D("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": _(n)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: E[6] || (E[6] = (k) => !s.value.length || _(e).emit("vf-modal-show", { type: "archive", items: s.value }))
        }, [
          (y(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ao, 2))
        ], 8, io))
      ])),
      d("div", mo, [
        d("div", {
          class: "mx-1.5",
          "aria-label": _(n)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (y(), D("svg", {
            onClick: E[7] || (E[7] = (k) => _(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, vo))
        ], 8, po),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(n)("Toggle Full Screen"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v
        }, [
          (y(), D("svg", yo, [
            f.value ? (y(), D("path", wo)) : (y(), D("path", xo))
          ]))
        ], 8, bo),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(n)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: E[8] || (E[8] = (k) => p.value.length || _(e).emit("vf-view-toggle", o.value == "list" ? "grid" : "list"))
        }, [
          (y(), D("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([p.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            o.value == "grid" ? (y(), D("path", ko)) : G("", !0),
            o.value == "list" ? (y(), D("path", So)) : G("", !0)
          ], 2))
        ], 8, _o)
      ])
    ]));
  }
});
var Mo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, $r = { exports: {} };
(function(a, e) {
  (function(t, i) {
    a.exports = i();
  })(Mo, function() {
    function t(u, l) {
      if (!(u instanceof l))
        throw new TypeError("Cannot call a class as a function");
    }
    function i(u, l) {
      for (var r = 0; r < l.length; r++) {
        var g = l[r];
        g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(u, g.key, g);
      }
    }
    function n(u, l, r) {
      return l && i(u.prototype, l), r && i(u, r), u;
    }
    function o(u, l, r) {
      return l in u ? Object.defineProperty(u, l, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : u[l] = r, u;
    }
    function s(u, l) {
      var r = Object.keys(u);
      if (Object.getOwnPropertySymbols) {
        var g = Object.getOwnPropertySymbols(u);
        l && (g = g.filter(function(c) {
          return Object.getOwnPropertyDescriptor(u, c).enumerable;
        })), r.push.apply(r, g);
      }
      return r;
    }
    function f(u) {
      for (var l = 1; l < arguments.length; l++) {
        var r = arguments[l] != null ? arguments[l] : {};
        l % 2 ? s(Object(r), !0).forEach(function(g) {
          o(u, g, r[g]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(r)) : s(Object(r)).forEach(function(g) {
          Object.defineProperty(u, g, Object.getOwnPropertyDescriptor(r, g));
        });
      }
      return u;
    }
    function p(u, l) {
      if (typeof l != "function" && l !== null)
        throw new TypeError("Super expression must either be null or a function");
      u.prototype = Object.create(l && l.prototype, {
        constructor: {
          value: u,
          writable: !0,
          configurable: !0
        }
      }), l && h(u, l);
    }
    function m(u) {
      return m = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, m(u);
    }
    function h(u, l) {
      return h = Object.setPrototypeOf || function(g, c) {
        return g.__proto__ = c, g;
      }, h(u, l);
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
    function b(u, l, r) {
      return v() ? b = Reflect.construct : b = function(c, w, x) {
        var S = [null];
        S.push.apply(S, w);
        var $ = Function.bind.apply(c, S), P = new $();
        return x && h(P, x.prototype), P;
      }, b.apply(null, arguments);
    }
    function E(u) {
      return Function.toString.call(u).indexOf("[native code]") !== -1;
    }
    function k(u) {
      var l = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return k = function(g) {
        if (g === null || !E(g))
          return g;
        if (typeof g != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof l < "u") {
          if (l.has(g))
            return l.get(g);
          l.set(g, c);
        }
        function c() {
          return b(g, arguments, m(this).constructor);
        }
        return c.prototype = Object.create(g.prototype, {
          constructor: {
            value: c,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), h(c, g);
      }, k(u);
    }
    function M(u) {
      if (u === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return u;
    }
    function N(u, l) {
      return l && (typeof l == "object" || typeof l == "function") ? l : M(u);
    }
    function W(u) {
      var l = v();
      return function() {
        var g = m(u), c;
        if (l) {
          var w = m(this).constructor;
          c = Reflect.construct(g, arguments, w);
        } else
          c = g.apply(this, arguments);
        return N(this, c);
      };
    }
    function B(u, l) {
      for (; !Object.prototype.hasOwnProperty.call(u, l) && (u = m(u), u !== null); )
        ;
      return u;
    }
    function A(u, l, r) {
      return typeof Reflect < "u" && Reflect.get ? A = Reflect.get : A = function(c, w, x) {
        var S = B(c, w);
        if (!!S) {
          var $ = Object.getOwnPropertyDescriptor(S, w);
          return $.get ? $.get.call(x) : $.value;
        }
      }, A(u, l, r || u);
    }
    function U(u, l) {
      return q(u) || ue(u, l) || me(u, l) || L();
    }
    function F(u) {
      return C(u) || Q(u) || me(u) || R();
    }
    function C(u) {
      if (Array.isArray(u))
        return j(u);
    }
    function q(u) {
      if (Array.isArray(u))
        return u;
    }
    function Q(u) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(u))
        return Array.from(u);
    }
    function ue(u, l) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(u)))) {
        var r = [], g = !0, c = !1, w = void 0;
        try {
          for (var x = u[Symbol.iterator](), S; !(g = (S = x.next()).done) && (r.push(S.value), !(l && r.length === l)); g = !0)
            ;
        } catch ($) {
          c = !0, w = $;
        } finally {
          try {
            !g && x.return != null && x.return();
          } finally {
            if (c)
              throw w;
          }
        }
        return r;
      }
    }
    function me(u, l) {
      if (!!u) {
        if (typeof u == "string")
          return j(u, l);
        var r = Object.prototype.toString.call(u).slice(8, -1);
        if (r === "Object" && u.constructor && (r = u.constructor.name), r === "Map" || r === "Set")
          return Array.from(u);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return j(u, l);
      }
    }
    function j(u, l) {
      (l == null || l > u.length) && (l = u.length);
      for (var r = 0, g = new Array(l); r < l; r++)
        g[r] = u[r];
      return g;
    }
    function R() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function L() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var Y = function(l, r, g) {
      var c = l.x, w = l.y, x = g.x, S = g.y, $ = {
        "+": {
          x: c + x,
          y: w + S
        },
        "-": {
          x: c - x,
          y: w - S
        },
        "*": {
          x: c * x,
          y: w * S
        },
        "/": {
          x: c / x,
          y: w / S
        }
      };
      return $[r];
    }, H = function(l) {
      return {
        x: l.left,
        y: l.top
      };
    }, oe = function(l) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: l.x,
        top: l.y,
        right: l.x,
        bottom: l.y,
        width: r,
        height: r
      };
    }, ee = function(l) {
      return {
        x: l,
        y: l
      };
    }, Xe = function(u, l, r) {
      window.addEventListener("resize", l), window.addEventListener("scroll", l), u.forEach(function(g, c) {
        r.observe(g, {
          childList: c !== 0,
          attributes: !0
        });
      });
    }, Fe = function(u) {
      var l = je(u);
      return l.x || l.y ? !0 : u instanceof HTMLDocument ? u.body ? !!(u.body.scrollTop = 1) : !!(u.documentElement.scrollTop = 1) : !!(u.scrollTop = 1);
    }, ot = function(u) {
      var l = document.createElement("div");
      return l.style.position = "fixed", l.style.overflow = "hidden", l.style.pointerEvents = "none", l.style.zIndex = "999999999999999999", l.classList.add(u), l;
    }, at = function(u) {
      var l = document.createElement("div");
      return l.style.position = "absolute", u || (l.style.background = "rgba(0, 0, 255, 0.1)", l.style.border = "1px solid rgba(0, 0, 255, 0.45)", l.style.display = "none", l.style.pointerEvents = "none"), l;
    }, nt = function(u, l) {
      var r;
      return function() {
        for (var g = arguments.length, c = new Array(g), w = 0; w < g; w++)
          c[w] = arguments[w];
        var x = function() {
          r = null, u.apply(void 0, c);
        };
        clearTimeout(r), r = setTimeout(x, l);
      };
    }, Ne = function() {
      var u, l, r, g;
      return {
        y: ((u = document.body) === null || u === void 0 ? void 0 : u.scrollTop) || ((l = document.documentElement) === null || l === void 0 ? void 0 : l.scrollTop) || 0,
        x: ((r = document.body) === null || r === void 0 ? void 0 : r.scrollLeft) || ((g = document.documentElement) === null || g === void 0 ? void 0 : g.scrollLeft) || 0
      };
    }, yt = function(u, l) {
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
        width: (u.clientWidth || r.width) * l,
        height: (u.clientHeight || r.height) * l
      };
    }, je = function(u) {
      return !u || u instanceof Document ? Ne() : {
        x: u.scrollLeft >= 0 ? u.scrollLeft : Ne().x,
        y: u.scrollTop >= 0 ? u.scrollTop : Ne().y
      };
    }, Ut = function(u) {
      var l = u.elementRect, r = u.containerRect, g = u.tolerance, c = g === void 0 ? {
        x: 0,
        y: 0
      } : g, w = [];
      return l.top - c.y < r.top && w.push("top"), l.left - c.x < r.left && w.push("left"), l.bottom + c.y > r.bottom && w.push("bottom"), l.right + c.y > r.right && w.push("right"), w;
    }, Kr = function(u) {
      var l = u.event;
      return {
        x: l.clientX,
        y: l.clientY
      };
    }, Yr = function(u) {
      var l = u.scrollAmount, r = u.initialPointerPos, g = u.pointerPos, c = {};
      return g.x > r.x - l.x ? (c.left = r.x - l.x, c.width = g.x - r.x + l.x) : (c.left = g.x, c.width = r.x - g.x - l.x), g.y > r.y - l.y ? (c.top = r.y - l.y, c.height = g.y - r.y + l.y) : (c.top = g.y, c.height = r.y - g.y - l.y), c;
    }, Kt = function(l) {
      var r = {
        x: 0,
        y: 0
      }, g = window.getComputedStyle(l);
      if (!g.transform || g.transform === "none")
        return r;
      if (g.transform.indexOf("3d") >= 0) {
        var c = g.transform.trim().match(/matrix3d\((.*?)\)/);
        if (c && c.length) {
          var w, x = (w = c[1]) === null || w === void 0 ? void 0 : w.split(",");
          r.x = parseInt(x[12]) || 0, r.y = parseInt(x[13]) || 0;
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
    }, Wr = function(l) {
      var r = l.style.transform;
      if (!r || r.indexOf("translate") < 0)
        return Kt(l);
      var g = {
        x: 0,
        y: 0
      }, c = r.trim().match(/translate[3dD]*?\(.*?\)/);
      if (c) {
        var w, x = (w = c[0]) === null || w === void 0 ? void 0 : w.split("(");
        if (x) {
          var S, $ = (S = x[1]) === null || S === void 0 ? void 0 : S.split(",");
          g.x = parseInt($[0]) || 0, g.y = parseInt($[1]) || 0;
        }
      }
      return !g.x && !g.x ? Kt(l) : g;
    }, Xr = function(l) {
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
    }, Fr = function(u, l) {
      return l ? Wr(u) : Xr(u);
    }, qr = function(u) {
      var l = u.element, r = u.edges, g = u.elementRect, c = u.containerRect, w = u.elementPos, x = u.useTransform;
      r.includes("top") && qe(l, {
        y: w.y + c.top - g.top,
        x: w.x
      }, x), r.includes("left") && qe(l, {
        y: w.y,
        x: w.x + c.left - g.left
      }, x), r.includes("bottom") && qe(l, {
        y: w.y + c.bottom - g.bottom,
        x: w.x
      }, x), r.includes("right") && qe(l, {
        y: w.y,
        x: w.x + c.right - g.right
      }, x);
    }, Yt = function(u) {
      var l = u.computedStyle, r = u.node, g = l.position, c = g === "absolute" || g === "relative" || g === "fixed";
      !(r instanceof HTMLDocument) && !c && (r.style.position = "relative");
    }, Gr = function(u) {
      var l = u.shiftKey, r = u.keyboardDragSpeed, g = u.zoom, c = u.key, w = u.dragKeys, x = u.scrollDiff, S = u.canScroll, $ = u.scrollCallback, P = {
        x: 0,
        y: 0
      }, O = l ? r * 4 * g : r * g;
      return w.left.includes(c) && (P.x = x.x || -O, !l && !x.x && S && $(["left"], r)), w.right.includes(c) && (P.x = x.x || O, !l && !x.x && S && $(["right"], r)), w.up.includes(c) && (P.y = x.y || -O, !l && !x.y && S && $(["top"], r)), w.down.includes(c) && (P.y = x.y || O, !l && !x.y && S && $(["bottom"], r)), P;
    }, Jr = function(u) {
      var l = u.element, r = u.force, g = u.multiSelectionToggle, c = u.SelectedSet, w = u.hoverClassName;
      l.classList.contains(w) && !r || (c.has(l) ? g && c.delete(l) : c.add(l), l.classList.add(w));
    }, Zr = function(u) {
      var l = u.element, r = u.force, g = u.SelectedSet, c = u.PrevSelectedSet, w = u.hoverClassName;
      if (!l.classList.contains(w) && !r)
        return !1;
      var x = g.has(l), S = c.has(l);
      x && !S ? g.delete(l) : !x && S && g.add(l), l.classList.remove(w);
    }, wt = function(u, l) {
      return u.left < l.right && u.right > l.left && u.top < l.bottom && u.bottom > l.top;
    }, Wt = function(u) {
      var l = u.element, r = u.posDirection, g = u.containerRect, c = u.useTransform, w = Fr(l, c), x = Y(w, "+", r);
      qe(l, x, c);
      var S = l.getBoundingClientRect(), $ = Ut({
        elementRect: S,
        containerRect: g
      });
      qr({
        element: l,
        edges: $,
        elementRect: S,
        containerRect: g,
        elementPos: x,
        useTransform: c
      });
    }, Qr = function(u, l) {
      window.removeEventListener("resize", l), window.removeEventListener("scroll", l), u.disconnect();
    }, ei = function(u, l, r) {
      if (!!l.length) {
        var g = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, c = u instanceof HTMLDocument ? g || document.body : u, w = l.includes("top") && c.scrollTop > 0, x = l.includes("bottom") && c.scrollTop < c.scrollHeight, S = l.includes("left") && c.scrollLeft > 0, $ = l.includes("right") && c.scrollLeft < c.scrollWidth;
        w && (c.scrollTop -= 1 * r), x && (c.scrollTop += 1 * r), S && (c.scrollLeft -= 1 * r), $ && (c.scrollLeft += 1 * r);
      }
    }, qe = function(u, l, r) {
      if (r) {
        var g = u.style.transform;
        u.style.transform = "translate3d(".concat(l.x, "px,").concat(l.y, "px,1px) ").concat(g.replace(/translate.*?\)/g, ""));
      } else
        u.style.left = "".concat(l.x, "px"), u.style.top = "".concat(l.y, "px");
      return u;
    }, ti = function(u) {
      for (var l = u.subscribe, r = u.publish, g = u.Interaction, c = u.SelectedSet, w = {
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
      }, x = function() {
        var O = U($[S], 2), V = O[0], K = O[1];
        ["pre", !1].forEach(function(ie) {
          return l(ie ? "".concat(V, ":").concat(ie) : V, function(pe) {
            return K.forEach(function(ae) {
              return (!ae.condition || ae.condition(pe)) && r(ie ? "".concat(ie).concat(ae.name) : ae.name, f({
                items: c.elements,
                isDragging: g.isDragging
              }, pe));
            });
          });
        });
      }, S = 0, $ = Object.entries(w); S < $.length; S++)
        x();
    }, Ve = function(u) {
      return u ? !Array.isArray(u) && (u instanceof HTMLElement || u instanceof SVGElement) ? [u] : F(u) : [];
    }, Xt = function(u, l) {
      u.style.left = "".concat(l.left, "px"), u.style.top = "".concat(l.top, "px"), u.style.width = "".concat(l.width, "px"), u.style.height = "".concat(l.height, "px");
    }, ri = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, g = l.area, c = l.PS, w = l.zoom;
        t(this, u), o(this, "_modificationCallback", void 0), o(this, "_modificationObserver", void 0), o(this, "_zoom", void 0), o(this, "_node", void 0), o(this, "_parentNodes", void 0), o(this, "_computedStyle", void 0), o(this, "_computedBorder", void 0), o(this, "_rect", void 0), o(this, "setArea", function(x) {
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
        }), o(this, "start", function() {
          Xe(r.parentNodes, r._modificationCallback, r._modificationObserver);
        }), o(this, "reset", function() {
          r._computedStyle = void 0, r._rect = void 0, r._computedBorder = void 0, r._parentNodes = void 0;
        }), o(this, "stop", function() {
          Qr(r._modificationObserver, r._modificationCallback), r.reset();
        }), o(this, "scroll", function(x, S) {
          var $ = {
            scroll_directions: x,
            scroll_multiplier: S
          };
          r.PubSub.publish("Area:scroll:pre", $), ei(r._node, x, S), r.PubSub.publish("Area:scroll", $);
        }), this._zoom = w, this.PubSub = c, this.setArea(g), this._modificationCallback = nt(function(x) {
          r.PubSub.publish("Area:modified:pre", {
            event: x,
            item: r
          }), r.reset(), r.PubSub.publish("Area:modified", {
            event: x,
            item: r
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return n(u, [{
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
          return this._rect ? this._rect : this._rect = yt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var r = function g(c) {
            var w, x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, S = (w = c[x]) === null || w === void 0 ? void 0 : w.parentNode;
            return S ? (c.push(S), x++, g(c, x)) : c;
          };
          return this._parentNodes = r([this.HTMLNode]), this._parentNodes;
        }
      }]), u;
    }(), ii = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, g = l.DS, c = l.dragKeys, w = l.draggability, x = l.keyboardDrag, S = l.keyboardDragSpeed, $ = l.useTransform, P = l.zoom;
        t(this, u), o(this, "_useTransform", void 0), o(this, "_prevCursorPos", void 0), o(this, "_prevScrollPos", void 0), o(this, "_elements", []), o(this, "_draggability", void 0), o(this, "_dragKeys", void 0), o(this, "_dragKeysFlat", void 0), o(this, "_keyboardDrag", void 0), o(this, "_keyboardDragSpeed", void 0), o(this, "_zoom", void 0), o(this, "keyboardDrag", function(O) {
          var V = O.event, K = O.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability || r.DS.continue)) {
            var ie = {
              event: V,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:start:pre", "Interaction:start"], ie), r._elements = r.DS.getSelection(), r.handleZIndex(!0);
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
            r._elements.forEach(function(ae) {
              return Wt({
                element: ae,
                posDirection: pe,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], ie);
          }
        }), o(this, "keyboardEnd", function(O) {
          var V = O.event, K = O.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability)) {
            var ie = {
              event: V,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], ie);
          }
        }), o(this, "start", function(O) {
          var V = O.isDragging, K = O.isDraggingKeyboard;
          !V || K || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), o(this, "stop", function(O) {
          O != null && O.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), o(this, "update", function(O) {
          var V = O.isDragging, K = O.isDraggingKeyboard;
          if (!(!V || !r._elements.length || K || r.DS.continue)) {
            var ie = Y(r._cursorDiff, "+", r._scrollDiff);
            r._elements.forEach(function(pe) {
              return Wt({
                element: pe,
                posDirection: ie,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            });
          }
        }), o(this, "handleZIndex", function(O) {
          r._elements.forEach(function(V) {
            return V.style.zIndex = "".concat((parseInt(V.style.zIndex) || 0) + O ? 9999 : -9998);
          });
        }), this.DS = g, this._useTransform = $, this._keyboardDragSpeed = S, this._keyboardDrag = x, this._zoom = P, this._draggability = w, this._dragKeys = {
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
      return n(u, [{
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
    }(), oi = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, g = l.DS, c = l.areaElement, w = l.draggability, x = l.immediateDrag, S = l.selectableClass;
        t(this, u), o(this, "_areaElement", void 0), o(this, "_draggability", void 0), o(this, "_immediateDrag", void 0), o(this, "_selectableClass", void 0), o(this, "isInteracting", void 0), o(this, "isDragging", void 0), o(this, "init", function() {
          return r.DS.publish("Interaction:init:pre", {});
        }), o(this, "_init", function() {
          r.stop(), r._areaElement.addEventListener("mousedown", r.start), r._areaElement.addEventListener("touchstart", r.start, {
            passive: !1
          }), r.DS.publish("Interaction:init", {});
        }), o(this, "start", function($) {
          return r.DS.publish("Interaction:start:pre", {
            event: $,
            isDragging: r.isDragging
          });
        }), o(this, "_start", function($) {
          $.type === "touchstart" && $.preventDefault(), r._canInteract($) && (r.isInteracting = !0, r.isDragging = r.isDragEvent($), r.DS.publish("Interaction:start", {
            event: $,
            isDragging: r.isDragging
          }), document.addEventListener("mouseup", r.reset), document.addEventListener("touchend", r.reset));
        }), o(this, "isDragEvent", function($) {
          var P = $.target.closest(".".concat(r._selectableClass));
          return !r._draggability || r.DS.stores.KeyStore.isMultiSelectKeyPressed($) || !P ? !1 : (r._immediateDrag && (r.DS.SelectedSet.size ? r.DS.SelectedSet.has(P) || (r.DS.SelectedSet.clear(), r.DS.SelectedSet.add(
            P
          )) : r.DS.SelectedSet.add(
            P
          )), !!r.DS.SelectedSet.has(P));
        }), o(this, "onClick", function($) {
          var P = $.event;
          if (!!r._canInteract(P) && !(P.detail > 0)) {
            var O = r.DS, V = O.stores, K = V.PointerStore, ie = V.KeyStore, pe = O.SelectableSet, ae = O.SelectedSet;
            K.start(P);
            var ze = P.target;
            !pe.has(ze) || (ie.isMultiSelectKeyPressed(P) || ae.clear(), ae.toggle(ze), r.reset());
          }
        }), o(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), o(this, "update", function($) {
          var P = $.event, O = $.scroll_directions, V = $.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: P,
            scroll_directions: O,
            scroll_multiplier: V,
            isDragging: r.isDragging
          });
        }), o(this, "reset", function($) {
          return r.DS.publish("Interaction:end:pre", {
            event: $,
            isDragging: r.isDragging
          });
        }), o(this, "_reset", function($) {
          var P = r.isDragging;
          r.stop(), r.init(), r.DS.publish("Interaction:end", {
            event: $,
            isDragging: P
          });
        }), this._areaElement = c, this._draggability = w, this._immediateDrag = x, this._selectableClass = S, this.DS = g, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function($) {
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
      return n(u, [{
        key: "_canInteract",
        value: function(r) {
          var g = r.clientX === 0 && r.clientY === 0 && r.detail === 0 && r.target;
          return !(r.button === 2 || this.isInteracting || r.target && !this.DS.SelectorArea.isInside(
            r.target
          ) || !g && !this.DS.SelectorArea.isClicked(r));
        }
      }]), u;
    }(), ai = function u(l) {
      var r = this, g = l.DS;
      t(this, u), o(this, "subscribers", {}), o(this, "subscribe", function(c, w) {
        return Array.isArray(r.subscribers[c]) || (r.subscribers[c] = []), r.subscribers[c].push(w), r.subscribers[c].length - 1;
      }), o(this, "unsubscribe", function(c, w, x) {
        x >= 0 ? r.subscribers[c].splice(x, 1) : w && (r.subscribers[c] = r.subscribers[c].filter(function(S) {
          return S !== w;
        }));
      }), o(this, "publish", function(c, w) {
        Array.isArray(c) ? c.forEach(function(x) {
          return r._publish(x, w);
        }) : r._publish(c, w);
      }), o(this, "_publish", function(c, w) {
        var x = r.subscribers[c];
        !Array.isArray(x) || (c.includes(":pre") ? r._handlePrePublish(x, w) : r._handlePublish(x, w));
      }), o(this, "_handlePublish", function(c, w) {
        for (var x = 0, S = c.length; x < S; x++) {
          if (r.DS.stopped)
            return;
          c[x](w);
        }
      }), o(this, "_handlePrePublish", function(c, w) {
        for (var x = c.length; x--; ) {
          if (r.DS.stopped)
            return;
          c[x](w);
        }
      }), this.DS = g;
    }, ni = /* @__PURE__ */ function(u) {
      p(r, u);
      var l = W(r);
      function r(g) {
        var c, w = g.elements, x = g.className, S = g.hoverClassName, $ = g.draggability, P = g.useTransform, O = g.DS;
        return t(this, r), c = l.call(this), o(M(c), "_initElements", void 0), o(M(c), "_className", void 0), o(M(c), "_hoverClassName", void 0), o(M(c), "_useTransform", void 0), o(M(c), "_draggability", void 0), o(M(c), "init", function() {
          return c._initElements.forEach(function(V) {
            return c.add(V);
          });
        }), o(M(c), "clear", function() {
          return c.forEach(function(V) {
            return c.delete(V);
          });
        }), o(M(c), "_onClick", function(V) {
          return c.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: V
          });
        }), o(M(c), "_onPointer", function(V) {
          return c.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: V
          });
        }), o(M(c), "addAll", function(V) {
          return V.forEach(function(K) {
            return c.add(K);
          });
        }), o(M(c), "deleteAll", function(V) {
          return V.forEach(function(K) {
            return c.delete(K);
          });
        }), c.DS = O, c._initElements = Ve(w), c._className = x, c._hoverClassName = S, c._useTransform = P, c._draggability = $, c.DS.subscribe("Interaction:init", c.init), c;
      }
      return n(r, [{
        key: "add",
        value: function(c) {
          return c.classList.add(this._className), c.addEventListener("click", this._onClick), c.addEventListener("mousedown", this._onPointer), c.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Yt({
            computedStyle: window.getComputedStyle(c),
            node: c
          }), A(m(r.prototype), "add", this).call(this, c);
        }
      }, {
        key: "delete",
        value: function(c) {
          return c.classList.remove(this._className), c.classList.remove(this._hoverClassName), c.removeEventListener("click", this._onClick), c.removeEventListener("mousedown", this._onPointer), c.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), A(m(r.prototype), "delete", this).call(this, c);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ k(Set)), si = /* @__PURE__ */ function(u) {
      p(r, u);
      var l = W(r);
      function r(g) {
        var c, w = g.className, x = g.DS;
        return t(this, r), c = l.call(this), o(M(c), "_className", void 0), o(M(c), "clear", function() {
          return c.forEach(function(S) {
            return c.delete(S);
          });
        }), o(M(c), "addAll", function(S) {
          return S.forEach(function($) {
            return c.add($);
          });
        }), o(M(c), "deleteAll", function(S) {
          return S.forEach(function($) {
            return c.delete($);
          });
        }), c.DS = x, c._className = w, c;
      }
      return n(r, [{
        key: "add",
        value: function(c) {
          if (!A(m(r.prototype), "has", this).call(this, c)) {
            var w = {
              items: this.elements,
              item: c
            };
            return this.DS.publish("Selected:added:pre", w), A(m(r.prototype), "add", this).call(this, c), c.classList.add(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", w), this;
          }
        }
      }, {
        key: "delete",
        value: function(c) {
          if (!!A(m(r.prototype), "has", this).call(this, c)) {
            var w = {
              items: this.elements,
              item: c
            };
            this.DS.publish("Selected:removed:pre", w);
            var x = A(m(r.prototype), "delete", this).call(this, c);
            return c.classList.remove(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", w), x;
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
    }(/* @__PURE__ */ k(Set)), li = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, g = l.DS, c = l.hoverClassName, w = l.multiSelectToggling;
        t(this, u), o(this, "_prevSelectedSet", void 0), o(this, "_hoverClassName", void 0), o(this, "_multiSelectToggling", void 0), o(this, "start", function(x) {
          var S = x.event, $ = x.isDragging;
          $ || (r._storePrevious(S), r._handleInsideSelection(!0, S));
        }), o(this, "update", function(x) {
          var S = x.isDragging;
          S || r.DS.continue || r._handleInsideSelection();
        }), o(this, "_handleInsideSelection", function(x, S) {
          for (var $ = r.DS, P = $.SelectableSet, O = $.SelectorArea, V = $.Selector, K = P.elements.map(function(Me) {
            return [Me, Me.getBoundingClientRect()];
          }), ie = [], pe = [], ae = 0, ze = K.length; ae < ze; ae++)
            !O.isInside(K[ae][0], K[ae][1]) || (wt(K[ae][1], V.rect) ? ie.push(K[ae][0]) : pe.push(K[ae][0]));
          var st = r.DS.stores.KeyStore.isMultiSelectKeyPressed(S) && r._multiSelectToggling;
          r.DS.continue || (ie.forEach(function(Me) {
            return Jr({
              element: Me,
              force: x,
              multiSelectionToggle: st,
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
        }), this._hoverClassName = c, this._multiSelectToggling = w, this.DS = g, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return n(u, [{
        key: "_storePrevious",
        value: function(r) {
          var g = this.DS, c = g.stores.KeyStore, w = g.SelectedSet;
          c.isMultiSelectKeyPressed(r) ? this._prevSelectedSet = new Set(w) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), u;
    }(), ci = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, g = l.DS, c = l.selector, w = l.selectorClass, x = l.customStyles;
        t(this, u), o(this, "_rect", void 0), o(this, "start", function(S) {
          var $ = S.isDragging;
          if (!$) {
            var P = r.DS.stores.PointerStore, O = P.initialValArea;
            Xt(r.HTMLNode, oe(O, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), o(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), o(this, "update", function(S) {
          var $ = S.isDragging;
          if (!($ || r.DS.continue)) {
            var P = r.DS.stores, O = P.ScrollStore, V = P.PointerStore, K = Yr({
              scrollAmount: O.scrollAmount,
              initialPointerPos: V.initialValArea,
              pointerPos: V.currentValArea
            });
            Xt(r.HTMLNode, K), r._rect = null;
          }
        }), this.DS = g, this.HTMLNode = c || at(x), this.HTMLNode.classList.add(w), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return n(u, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), u;
    }(), ui = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, g = l.DS, c = l.selectorAreaClass, w = l.autoScrollSpeed, x = l.overflowTolerance;
        t(this, u), o(this, "_autoScrollSpeed", void 0), o(this, "_scrollInterval", void 0), o(this, "_rect", void 0), o(this, "currentEdges", []), o(this, "_overflowTolerance", void 0), o(this, "start", function() {
          return r.applyElements("append");
        }), o(this, "applyElements", function() {
          var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", $ = document.body ? "body" : "documentElement", P = "".concat(S, "Child");
          r.HTMLNode[P](r.DS.Selector.HTMLNode), document[$][P](r.HTMLNode);
        }), o(this, "updatePos", function() {
          r._rect = null;
          var S = r.DS.Area.rect, $ = r.DS.Area.computedBorder, P = r.HTMLNode.style, O = "".concat(S.top + $.top, "px"), V = "".concat(S.left + $.left, "px"), K = "".concat(S.width, "px"), ie = "".concat(S.height, "px");
          P.top !== O && (P.top = O), P.left !== V && (P.left = V), P.width !== K && (P.width = K), P.height !== ie && (P.height = ie);
        }), o(this, "stop", function(S) {
          r.stopAutoScroll(), S && r.applyElements("remove");
        }), o(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), o(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var S = r.DS, $ = S.stores.PointerStore, P = S.Area;
            r.currentEdges = Ut({
              elementRect: oe($.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && P.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), o(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), o(this, "isInside", function(S, $) {
          return r.DS.Area.HTMLNode.contains(S) && r.DS.stores.ScrollStore.canScroll ? !0 : wt(r.rect, $ || S.getBoundingClientRect());
        }), this._autoScrollSpeed = w, this._overflowTolerance = x, this.DS = g, this.HTMLNode = ot(c), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          r.updatePos(), r.stopAutoScroll();
        });
      }
      return n(u, [{
        key: "isClicked",
        value: function(r) {
          var g = this.DS.stores.PointerStore, c = r ? g.getPointerPosition(r) : g.initialVal;
          return wt({
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
      function u(l) {
        var r = this, g = l.DS, c = l.multiSelectKeys, w = l.multiSelectMode;
        t(this, u), o(this, "_multiSelectMode", void 0), o(this, "_multiSelectKeys", void 0), o(this, "_currentValues", /* @__PURE__ */ new Set()), o(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), o(this, "init", function() {
          document.addEventListener("keydown", r.keydown), document.addEventListener("keyup", r.keyup), window.addEventListener("blur", r.reset);
        }), o(this, "keydown", function(x) {
          var S = x.key.toLowerCase();
          r.DS.publish("KeyStore:down:pre", {
            event: x,
            key: S
          }), r._currentValues.add(S), r.DS.publish("KeyStore:down", {
            event: x,
            key: S
          });
        }), o(this, "keyup", function(x) {
          var S = x.key.toLowerCase();
          r.DS.publish("KeyStore:up:pre", {
            event: x,
            key: S
          }), r._currentValues.delete(S), r.DS.publish("KeyStore:up", {
            event: x,
            key: S
          });
        }), o(this, "stop", function() {
          document.removeEventListener("keydown", r.keydown), document.removeEventListener("keyup", r.reset), window.removeEventListener("blur", r.reset), r.reset();
        }), o(this, "reset", function() {
          return r._currentValues.clear();
        }), this.DS = g, this._multiSelectMode = w, this._multiSelectKeys = c.map(function(x) {
          var S = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, $ = S[x];
          return $ ? (console.warn("[DragSelect] ".concat(x, ' is deprecated. Use "').concat($, '" instead. Act Now!. See docs for more info')), $.toLowerCase()) : x.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return n(u, [{
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
      function u(l) {
        var r = this, g = l.DS;
        t(this, u), o(this, "_isMouseInteraction", !1), o(this, "_initialValArea", void 0), o(this, "_currentValArea", void 0), o(this, "_lastValArea", void 0), o(this, "_initialVal", void 0), o(this, "_currentVal", void 0), o(this, "_lastVal", void 0), o(this, "_lastTouch", void 0), o(this, "init", function() {
          document.addEventListener("mousemove", r.update), document.addEventListener("touchmove", r.update, {
            passive: !1
          });
        }), o(this, "getPointerPosition", function(c) {
          return Kr({
            event: r._normalizedEvent(c)
          });
        }), o(this, "update", function(c) {
          !c || (r.DS.publish("PointerStore:updated:pre", {
            event: c
          }), r.currentVal = r.getPointerPosition(c), r._isMouseInteraction && r.DS.publish("PointerStore:updated", {
            event: c
          }));
        }), o(this, "stop", function() {
          document.removeEventListener("mousemove", r.update), document.removeEventListener("touchmove", r.update, {
            passive: !1
          }), setTimeout(function() {
            return r._isMouseInteraction = !1;
          }, 100);
        }), o(this, "reset", function(c) {
          !c || (r.currentVal = r.lastVal = r.getPointerPosition(c), r.stop(), r.init());
        }), this.DS = g, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(c) {
          var w = c.event;
          return r.start(w);
        }), this.DS.subscribe("Interaction:end", function(c) {
          var w = c.event;
          return r.reset(w);
        });
      }
      return n(u, [{
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
      function u(l) {
        var r = this, g = l.DS, c = l.areaElement, w = l.zoom;
        t(this, u), o(this, "_initialVal", void 0), o(this, "_currentVal", void 0), o(this, "_areaElement", void 0), o(this, "_canScroll", void 0), o(this, "init", function() {
          return r._areaElement.addEventListener("scroll", r.update);
        }), o(this, "start", function() {
          r._currentVal = r._initialVal = je(r._areaElement), r._areaElement.addEventListener("scroll", r.update);
        }), o(this, "update", function() {
          return r._currentVal = je(r._areaElement);
        }), o(this, "stop", function() {
          r._areaElement.removeEventListener("scroll", r.update), r._initialVal = {
            x: 0,
            y: 0
          }, r._canScroll = null;
        }), o(this, "reset", function() {
          r.stop(), r.start();
        }), this._areaElement = c, this.DS = g, this.zoom = w, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return r.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return r.reset();
        });
      }
      return n(u, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = Fe(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var r = Y(this.currentVal, "-", this.initialVal), g = ee(this.zoom), c = Y(Y(r, "*", g), "-", r);
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
      function u(l) {
        var r = this, g = l.area, c = g === void 0 ? document : g, w = l.selectables, x = w === void 0 ? [] : w, S = l.autoScrollSpeed, $ = S === void 0 ? 5 : S, P = l.overflowTolerance, O = P === void 0 ? {
          x: 25,
          y: 25
        } : P, V = l.zoom, K = V === void 0 ? 1 : V, ie = l.customStyles, pe = ie === void 0 ? !1 : ie, ae = l.multiSelectMode, ze = ae === void 0 ? !1 : ae, st = l.multiSelectToggling, Me = st === void 0 ? !0 : st, Ft = l.multiSelectKeys, pi = Ft === void 0 ? ["Control", "Shift", "Meta"] : Ft, qt = l.selector, gi = qt === void 0 ? void 0 : qt, Gt = l.draggability, xt = Gt === void 0 ? !0 : Gt, Jt = l.immediateDrag, vi = Jt === void 0 ? !0 : Jt, Zt = l.keyboardDrag, bi = Zt === void 0 ? !0 : Zt, yi = l.dragKeys, Qt = l.keyboardDragSpeed, wi = Qt === void 0 ? 10 : Qt, er = l.useTransform, tr = er === void 0 ? !0 : er, rr = l.hoverClass, ir = rr === void 0 ? "ds-hover" : rr, or = l.selectableClass, ar = or === void 0 ? "ds-selectable" : or, nr = l.selectedClass, xi = nr === void 0 ? "ds-selected" : nr, sr = l.selectorClass, _i = sr === void 0 ? "ds-selector" : sr, lr = l.selectorAreaClass, ki = lr === void 0 ? "ds-selector-area" : lr, Si = l.callback, Di = l.onDragMove, Ci = l.onDragStartBegin, Mi = l.onDragStart, $i = l.onElementSelect, Ei = l.onElementUnselect;
        t(this, u), o(this, "continue", !1), o(this, "start", function() {
          r.stopped = !1, r.Interaction.init();
        }), o(this, "break", function() {
          return r.continue = !0;
        }), o(this, "getSelection", function() {
          return r.SelectedSet.elements;
        }), o(this, "getSelectables", function() {
          return r.SelectableSet.elements;
        }), o(this, "getInitialCursorPosition", function() {
          return r.stores.PointerStore.initialVal;
        }), o(this, "getCurrentCursorPosition", function() {
          return r.stores.PointerStore.currentVal;
        }), o(this, "getPreviousCursorPosition", function() {
          return r.stores.PointerStore.lastVal;
        }), o(this, "getInitialCursorPositionArea", function() {
          return r.stores.PointerStore.initialValArea;
        }), o(this, "getCurrentCursorPositionArea", function() {
          return r.stores.PointerStore.currentValArea;
        }), o(this, "getPreviousCursorPositionArea", function() {
          return r.stores.PointerStore.lastValArea;
        }), o(this, "isMultiSelect", function(Ti) {
          return r.stores.KeyStore.isMultiSelectKeyPressed(Ti);
        }), o(this, "isDragging", function() {
          return r.Interaction.isDragging;
        }), this.PubSub = new ai({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: Si,
          onDragMove: Di,
          onDragStart: Mi,
          onDragStartBegin: Ci,
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
          autoScrollSpeed: $,
          overflowTolerance: O
        }), this.SelectableSet = new ni({
          elements: x,
          DS: this,
          className: ar,
          hoverClassName: ir,
          useTransform: tr,
          draggability: xt
        }), this.SelectedSet = new si({
          DS: this,
          className: xi
        }), this.Selection = new li({
          DS: this,
          hoverClassName: ir,
          multiSelectToggling: Me
        }), this.Drag = new ii({
          DS: this,
          draggability: xt,
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
        }), this.Interaction = new oi({
          areaElement: c,
          DS: this,
          draggability: xt,
          immediateDrag: vi,
          selectableClass: ar
        }), ti({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return r.continue = !1;
        }), this.start();
      }
      return n(u, [{
        key: "_callbacksTemp",
        value: function(r) {
          var g = r.callback, c = r.onDragMove, w = r.onDragStart, x = r.onDragStartBegin, S = r.onElementSelect, $ = r.onElementUnselect, P = function(V, K) {
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
          })), x && (P("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(O) {
            O.items, O.item;
            var V = O.event;
            return x(V);
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
          return Ve(r).forEach(function(x) {
            return g.SelectedSet.has(x) ? g.removeSelection(r, c, w) : g.addSelection(r, c, w);
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
          return Y(c, "-", w);
        }
      }]), u;
    }();
    return mi;
  });
})($r);
const $o = $r.exports, Eo = (a, e, t, i, n) => (e = Math, t = e.log, i = 1024, n = t(a) / t(i) | 0, a / e.pow(i, n)).toFixed(0) + " " + (n ? "KMGTPEZY"[--n] + "iB" : "B"), To = (a, e = "en-US") => new Date(a * 1e3).toLocaleString(e), Ao = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Oo = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Po = [
  Oo
], Io = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Lo = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), No = [
  Lo
], jo = {
  name: "VFSortIcon"
}, ct = /* @__PURE__ */ Object.assign(jo, {
  props: { direction: String },
  setup(a) {
    return (e, t) => (y(), D("div", null, [
      a.direction == "down" ? (y(), D("svg", Ao, Po)) : G("", !0),
      a.direction == "up" ? (y(), D("svg", Io, No)) : G("", !0)
    ]));
  }
}), Vo = ["onClick"], zo = {
  name: "VFToast.vue"
}, Bo = /* @__PURE__ */ Object.assign(zo, {
  setup(a) {
    const e = z("emitter"), { getStore: t } = z("storage"), i = I(t("full-screen", !1)), n = (p) => p == "error" ? "text-red-400 border-red-400" : "text-lime-600 border-lime-600", o = I([]), s = (p) => {
      o.value.splice(p, 1);
    }, f = (p) => {
      let m = o.value.findIndex((h) => h.id === p);
      m !== -1 && s(m);
    };
    return e.on("vf-toast-clear", () => {
      o.value = [];
    }), e.on("vf-toast-push", (p) => {
      let m = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      p.id = m, o.value.push(p), setTimeout(() => {
        f(m);
      }, 5e3);
    }), (p, m) => (y(), D("div", {
      class: de([i.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      we(Ai, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: J(() => [
          (y(!0), D(ce, null, be(o.value, (h, v) => (y(), D("div", {
            onClick: (b) => s(v),
            key: h,
            class: de([n(h.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 border text-xs rounded cursor-pointer"])
          }, T(h.label), 11, Vo))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Le = (a) => Object.entries(a).map((e) => e.map(encodeURIComponent).join("=")).join("&"), { apiUrl: Ro } = Se(), $t = (a, e) => Ro.value + "?" + Le({ q: "preview", adapter: a, path: e }), Ho = { class: "relative flex-auto flex flex-col overflow-hidden" }, Uo = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, Ko = { class: "absolute" }, Yo = /* @__PURE__ */ d("svg", {
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
], -1), Wo = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Xo = ["onDblclick", "onTouchstart", "onContextmenu", "data-type", "data-item", "data-index"], Fo = { class: "grid grid-cols-12 items-center" }, qo = { class: "flex col-span-7 items-center" }, Go = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Zo = [
  Jo
], Qo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ea = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ta = [
  ea
], ra = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, ia = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, oa = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], aa = { class: "grid grid-cols-12 items-center" }, na = { class: "flex col-span-7 items-center" }, sa = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, la = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ca = [
  la
], ua = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, da = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ha = [
  da
], fa = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, ma = { class: "col-span-2 text-center" }, pa = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, ga = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], va = { class: "relative" }, ba = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ya = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), wa = [
  ya
], xa = ["src"], _a = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ka = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Sa = [
  ka
], Da = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, Ca = { class: "break-all" }, Ma = {
  name: "VFExplorer"
}, $a = /* @__PURE__ */ Object.assign(Ma, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { setStore: i, getStore: n } = z("storage"), o = (j) => j == null ? void 0 : j.substring(0, 3), s = (j) => j.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), f = I(null), p = I(null), m = I(0), h = I(null), { t: v } = z("i18n"), b = Math.floor(Math.random() * 2 ** 32), E = I(n("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      E.value = !E.value, i("full-screen", E.value);
    });
    const k = I("");
    t.on("vf-search-query", ({ newQuery: j }) => {
      k.value = j, j ? t.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.data.adapter,
          path: e.data.dirname,
          filter: j
        },
        onSuccess: (R) => {
          R.files.length || t.emit("vf-toast-push", { label: v("No search result found.") });
        }
      }) : t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
    });
    let M = null;
    const N = () => {
      M && clearTimeout(M);
    }, W = (j) => {
      M = setTimeout(() => {
        B(j);
      }, 500);
    }, B = (j) => {
      j.type == "dir" ? (t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: j.path } })) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: j });
    }, A = ft({ active: !1, column: "", order: "" }), U = (j = !0) => {
      let R = [...e.data.files], L = A.column, Y = A.order == "asc" ? 1 : -1;
      if (!j)
        return R;
      const H = (oe, ee) => typeof oe == "string" && typeof ee == "string" ? oe.toLowerCase().localeCompare(ee.toLowerCase()) : oe < ee ? -1 : oe > ee ? 1 : 0;
      return A.active && (R = R.slice().sort((oe, ee) => H(oe[L], ee[L]) * Y)), R;
    }, F = (j) => {
      A.active && A.column == j ? (A.active = A.order == "asc", A.column = j, A.order = "desc") : (A.active = !0, A.column = j, A.order = "asc");
    }, C = () => h.value.getSelection().map((j) => JSON.parse(j.dataset.item)), q = (j, R) => {
      if (j.altKey || j.ctrlKey || j.metaKey)
        return j.preventDefault(), !1;
      j.dataTransfer.setDragImage(p.value, 0, 15), j.dataTransfer.effectAllowed = "all", j.dataTransfer.dropEffect = "copy", j.dataTransfer.setData("items", JSON.stringify(C()));
    }, Q = (j, R) => {
      j.preventDefault();
      let L = JSON.parse(j.dataTransfer.getData("items"));
      if (L.find((Y) => Y.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: L, to: R } });
    }, ue = (j, R) => {
      j.preventDefault(), !R || R.type !== "dir" || h.value.getSelection().find((L) => L == j.currentTarget) ? (j.dataTransfer.dropEffect = "none", j.dataTransfer.effectAllowed = "none") : j.dataTransfer.dropEffect = "copy";
    };
    return xe(() => {
      h.value = new $o({
        area: f.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => vt(() => {
        h.value.clearSelection(), h.value.setSelectables(document.getElementsByClassName("vf-item-" + b));
      })), h.value.subscribe("predragstart", ({ event: j, isDragging: R }) => {
        if (R)
          m.value = h.value.getSelection().length, h.value.break();
        else {
          const L = j.target.offsetWidth - j.offsetX, Y = j.target.offsetHeight - j.offsetY;
          L < 15 && Y < 15 && (h.value.clearSelection(), h.value.break());
        }
      }), h.value.subscribe("predragmove", ({ isDragging: j }) => {
        j && h.value.break();
      }), h.value.subscribe("callback", ({ items: j, event: R, isDragging: L }) => {
        t.emit("vf-nodes-selected", C()), m.value = h.value.getSelection().length;
      });
    }), Oi(() => {
      h.value.setSelection(h.value.getSelection());
    }), xe(() => {
      gt(() => e.view, () => t.emit("vf-explorer-update"));
    }), (j, R) => (y(), D("div", Ho, [
      a.view == "list" || k.value.length ? (y(), D("div", Uo, [
        d("div", {
          onClick: R[0] || (R[0] = (L) => F("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          le(T(_(v)("Name")) + " ", 1),
          ve(we(ct, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [lt, A.active && A.column == "basename"]
          ])
        ]),
        k.value.length ? G("", !0) : (y(), D("div", {
          key: 0,
          onClick: R[1] || (R[1] = (L) => F("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          le(T(_(v)("Size")) + " ", 1),
          ve(we(ct, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [lt, A.active && A.column == "file_size"]
          ])
        ])),
        k.value.length ? G("", !0) : (y(), D("div", {
          key: 1,
          onClick: R[2] || (R[2] = (L) => F("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          le(T(_(v)("Date")) + " ", 1),
          ve(we(ct, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [lt, A.active && A.column == "last_modified"]
          ])
        ])),
        k.value.length ? (y(), D("div", {
          key: 2,
          onClick: R[3] || (R[3] = (L) => F("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          le(T(_(v)("Filepath")) + " ", 1),
          ve(we(ct, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [lt, A.active && A.column == "path"]
          ])
        ])) : G("", !0)
      ])) : G("", !0),
      d("div", Ko, [
        d("div", {
          ref_key: "dragImage",
          ref: p,
          class: "absolute -z-50 -top-96"
        }, [
          Yo,
          d("div", Wo, T(m.value), 1)
        ], 512)
      ]),
      d("div", {
        class: de([E.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: f,
        onContextmenu: R[7] || (R[7] = Pe((L) => _(t).emit("vf-contextmenu-show", { event: L, area: f.value, items: C() }), ["self", "prevent"]))
      }, [
        k.value.length ? (y(!0), D(ce, { key: 0 }, be(U(), (L, Y) => (y(), D("div", {
          onDblclick: (H) => B(L),
          onTouchstart: (H) => W(L),
          onTouchend: R[4] || (R[4] = (H) => N()),
          onContextmenu: Pe((H) => _(t).emit("vf-contextmenu-show", { event: H, area: f.value, items: C(), target: L }), ["prevent"]),
          class: de(["vf-item-" + _(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": L.type,
          "data-item": JSON.stringify(L),
          "data-index": Y
        }, [
          d("div", Fo, [
            d("div", qo, [
              L.type == "dir" ? (y(), D("svg", Go, Zo)) : (y(), D("svg", Qo, ta)),
              d("span", ra, T(L.basename), 1)
            ]),
            d("div", ia, T(L.path), 1)
          ])
        ], 42, Xo))), 256)) : G("", !0),
        a.view == "list" && !k.value.length ? (y(!0), D(ce, { key: 1 }, be(U(), (L, Y) => (y(), D("div", {
          draggable: "true",
          onDblclick: (H) => B(L),
          onTouchstart: (H) => W(L),
          onTouchend: R[5] || (R[5] = (H) => N()),
          onContextmenu: Pe((H) => _(t).emit("vf-contextmenu-show", { event: H, area: f.value, items: C(), target: L }), ["prevent"]),
          onDragstart: (H) => q(H),
          onDragover: (H) => ue(H, L),
          onDrop: (H) => Q(H, L),
          class: de(["vf-item-" + _(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": L.type,
          "data-item": JSON.stringify(L),
          "data-index": Y
        }, [
          d("div", aa, [
            d("div", na, [
              L.type == "dir" ? (y(), D("svg", sa, ca)) : (y(), D("svg", ua, ha)),
              d("span", fa, T(L.basename), 1)
            ]),
            d("div", ma, T(L.file_size ? _(Eo)(L.file_size) : ""), 1),
            d("div", pa, T(_(To)(L.last_modified)), 1)
          ])
        ], 42, oa))), 256)) : G("", !0),
        a.view == "grid" && !k.value.length ? (y(!0), D(ce, { key: 2 }, be(U(!1), (L, Y) => {
          var H, oe;
          return y(), D("div", {
            draggable: "true",
            onDblclick: (ee) => B(L),
            onTouchstart: (ee) => W(L),
            onTouchend: R[6] || (R[6] = (ee) => N()),
            onContextmenu: Pe((ee) => _(t).emit("vf-contextmenu-show", { event: ee, area: f.value, items: C(), target: L }), ["prevent"]),
            onDragstart: (ee) => q(ee),
            onDragover: (ee) => ue(ee, L),
            onDrop: (ee) => Q(ee, L),
            class: de(["vf-item-" + _(b), "border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none"]),
            "data-type": L.type,
            "data-item": JSON.stringify(L),
            "data-index": Y
          }, [
            d("div", null, [
              d("div", va, [
                L.type == "dir" ? (y(), D("svg", ba, wa)) : ((H = L.mime_type) != null ? H : "").startsWith("image") ? (y(), D("img", {
                  key: 1,
                  class: "h-10 md:h-12 m-auto",
                  src: _($t)(_(n)("adapter", e.data.adapter), L.path),
                  alt: ""
                }, null, 8, xa)) : (y(), D("svg", _a, Sa)),
                ((oe = L.mime_type) != null ? oe : "").startsWith("image") ? G("", !0) : (y(), D("div", Da, T(o(L.extension)), 1))
              ]),
              d("span", Ca, T(s(L.basename)), 1)
            ])
          ], 42, ga);
        }), 256)) : G("", !0)
      ], 34),
      we(Bo)
    ]));
  }
}), Ea = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Ta = { class: "flex leading-5 items-center" }, Aa = ["aria-label"], Oa = /* @__PURE__ */ d("svg", {
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
], -1), Pa = [
  Oa
], Ia = ["value"], La = { class: "ml-3" }, Na = { key: 0 }, ja = { class: "ml-1" }, Va = { class: "flex leading-5 items-center" }, za = {
  value: "",
  disabled: ""
}, Ba = /* @__PURE__ */ d("option", { value: "tr" }, "Turkish", -1), Ra = /* @__PURE__ */ d("option", { value: "en" }, "English", -1), Ha = /* @__PURE__ */ d("option", { value: "fr" }, "French", -1), Ua = ["aria-label"], Ka = /* @__PURE__ */ d("svg", {
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
], -1), Ya = [
  Ka
], Wa = {
  name: "VFStatusbar"
}, Xa = /* @__PURE__ */ Object.assign(Wa, {
  props: {
    data: Object
  },
  setup(a) {
    var b;
    const e = a, t = z("emitter"), { getStore: i, setStore: n } = z("storage"), o = I(0), s = I((b = i("adapter")) != null ? b : e.data.adapter), { t: f, changeLocale: p } = z("i18n"), m = I(i("locale", "")), h = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: s.value } }), n("adapter", s.value);
    };
    t.on("vf-nodes-selected", (E) => {
      o.value = E.length;
    });
    const v = I("");
    return t.on("vf-search-query", ({ newQuery: E }) => {
      v.value = E;
    }), (E, k) => (y(), D("div", Ea, [
      d("div", Ta, [
        d("div", {
          class: "mx-2",
          "aria-label": _(f)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, Pa, 8, Aa),
        ve(d("select", {
          "onUpdate:modelValue": k[0] || (k[0] = (M) => s.value = M),
          onChange: h,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (y(!0), D(ce, null, be(a.data.storages, (M) => (y(), D("option", { value: M }, T(M), 9, Ia))), 256))
        ], 544), [
          [cr, s.value]
        ]),
        d("div", La, [
          v.value.length ? (y(), D("span", Na, T(a.data.files.length) + " items found. ", 1)) : G("", !0),
          d("span", ja, T(o.value > 0 ? o.value + " " + _(f)("item(s) selected.") : ""), 1)
        ])
      ]),
      d("div", Va, [
        ve(d("select", {
          "onUpdate:modelValue": k[1] || (k[1] = (M) => m.value = M),
          onChange: k[2] || (k[2] = (M) => _(p)(M.target.value)),
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          d("option", za, T(_(f)("Language")), 1),
          Ba,
          Ra,
          Ha
        ], 544), [
          [cr, m.value]
        ]),
        d("span", {
          "aria-label": _(f)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: k[3] || (k[3] = (M) => _(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: _(f)("Vuefinder is a file manager component for vue 3.") }))
        }, Ya, 8, Ua)
      ])
    ]));
  }
}), Fa = (a, e = 0, t = !1) => {
  let i;
  return (...n) => {
    t && !i && a(...n), clearTimeout(i), i = setTimeout(() => {
      a(...n);
    }, e);
  };
}, qa = (a, e, t) => {
  const i = I(a);
  return Pi((o, s) => ({
    get() {
      return o(), i.value;
    },
    set: Fa(
      (f) => {
        i.value = f, s();
      },
      e,
      t
    )
  }));
}, Ga = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Ja = ["aria-label"], Za = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Qa = [
  Za
], en = {
  key: 0,
  "aria-label": "Refresh",
  "data-microtip-position": "bottom-right",
  role: "tooltip"
}, tn = /* @__PURE__ */ d("path", { d: "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" }, null, -1), rn = [
  tn
], on = {
  key: 1,
  "aria-label": "Cancel",
  "data-microtip-position": "bottom-right",
  role: "tooltip"
}, an = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), nn = [
  an
], sn = ["onClick"], ln = /* @__PURE__ */ d("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), cn = [
  ln
], un = { class: "flex leading-5" }, dn = /* @__PURE__ */ d("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), hn = ["title", "onClick"], fn = {
  key: 0,
  class: "animate-spin p-1 h-6 w-6 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, mn = /* @__PURE__ */ d("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), pn = /* @__PURE__ */ d("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), gn = [
  mn,
  pn
], vn = {
  key: 3,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, bn = /* @__PURE__ */ d("svg", {
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
], -1), yn = ["onKeydown", "placeholder"], wn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), xn = [
  wn
], _n = {
  name: "VFBreadcrumb"
}, kn = /* @__PURE__ */ Object.assign(_n, {
  props: {
    data: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), n = I(null), o = I([]), s = I(!1), f = I(null), { t: p } = z("i18n"), m = z("loadingState");
    t.on("vf-explorer-update", () => {
      var U;
      let B = [], A = [];
      n.value = (U = e.data.dirname) != null ? U : i("adapter", "local") + "://", n.value.length == 0 && (o.value = []), n.value.replace(i("adapter", "local") + "://", "").split("/").forEach(function(F) {
        B.push(F), B.join("/") != "" && A.push({
          basename: F,
          name: F,
          path: i("adapter", "local") + "://" + B.join("/"),
          type: "dir"
        });
      }), A.length > 4 && (A = A.slice(-5), A[0].name = ".."), o.value = A;
    });
    const h = () => {
      s.value = !1, b.value = "";
    };
    t.on("vf-search-exit", () => {
      h();
    });
    const v = () => {
      s.value = !0, vt(() => f.value.focus());
    }, b = qa("", 400), E = () => m.value;
    gt(b, (B) => {
      t.emit("vf-toast-clear"), t.emit("vf-search-query", { newQuery: B });
    });
    const k = () => o.value.length && !s.value, M = (B) => {
      var U;
      B.preventDefault();
      let A = JSON.parse(B.dataTransfer.getData("items"));
      if (A.find((F) => F.storage != i("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: A, to: (U = o.value[o.value.length - 2]) != null ? U : { path: i("adapter", "local") + "://" } }
      });
    }, N = (B) => {
      B.preventDefault(), k() ? B.dataTransfer.dropEffect = "copy" : (B.dataTransfer.dropEffect = "none", B.dataTransfer.effectAllowed = "none");
    }, W = () => {
      b.value == "" && h();
    };
    return (B, A) => (y(), D("div", Ga, [
      d("span", {
        "aria-label": _(p)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (y(), D("svg", {
          onDragover: A[0] || (A[0] = (U) => N(U)),
          onDrop: A[1] || (A[1] = (U) => M(U)),
          onClick: A[2] || (A[2] = (U) => {
            var F, C;
            return !k() || _(t).emit("vf-fetch", { params: { q: "index", adapter: a.data.adapter, path: (C = (F = o.value[o.value.length - 2]) == null ? void 0 : F.path) != null ? C : _(i)("adapter", "local") + "://" } });
          }),
          class: de(["h-6 w-6 p-0.5 rounded", k() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Qa, 34))
      ], 8, Ja),
      E() ? (y(), D("span", on, [
        (y(), D("svg", {
          onClick: A[4] || (A[4] = (U) => _(t).emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, nn))
      ])) : (y(), D("span", en, [
        (y(), D("svg", {
          onClick: A[3] || (A[3] = (U) => {
            _(t).emit("vf-fetch", { params: { q: "index", adapter: a.data.adapter, path: a.data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, rn))
      ])),
      s.value ? (y(), D("div", vn, [
        bn,
        ve(d("input", {
          ref_key: "searchInput",
          ref: f,
          onKeydown: Ye(h, ["esc"]),
          onBlur: W,
          "onUpdate:modelValue": A[6] || (A[6] = (U) => Ii(b) ? b.value = U : null),
          placeholder: _(p)("Search anything.."),
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, yn), [
          [We, _(b)]
        ]),
        (y(), D("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: h,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, xn))
      ])) : (y(), D("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Pe(v, ["self"])
      }, [
        (y(), D("svg", {
          onClick: A[5] || (A[5] = (U) => _(t).emit("vf-fetch", { params: { q: "index", adapter: a.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, cn)),
        d("div", un, [
          (y(!0), D(ce, null, be(o.value, (U, F) => (y(), D("div", { key: F }, [
            dn,
            d("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: U.basename,
              onClick: (C) => _(t).emit("vf-fetch", { params: { q: "index", adapter: a.data.adapter, path: U.path } })
            }, T(U.name), 9, hn)
          ]))), 128))
        ]),
        E() ? (y(), D("svg", fn, gn)) : G("", !0)
      ], 8, sn))
    ]));
  }
}), Sn = ["onClick"], Dn = /* @__PURE__ */ d("span", { class: "px-1" }, null, -1), Cn = {
  name: "VFContextMenu"
}, Mn = /* @__PURE__ */ Object.assign(Cn, {
  props: {
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), i = I(null), { apiUrl: n } = Se(), o = ft({
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
    const { t: f } = z("i18n"), p = {
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
          const b = n.value + "?" + Le({ q: "download", adapter: s.value[0].adapter, path: s.value[0].path });
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
    }, m = (b) => {
      t.emit("vf-contextmenu-hide"), b.action();
    }, h = I("");
    t.on("vf-search-query", ({ newQuery: b }) => {
      h.value = b;
    }), t.on("vf-contextmenu-show", ({ event: b, area: E, items: k, target: M = null }) => {
      if (o.items = [], h.value)
        if (M)
          o.items.push(p.openDir), t.emit("vf-context-selected", [M]), console.log("search item selected");
        else
          return;
      else
        !M && !h.value ? (o.items.push(p.refresh), o.items.push(p.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")) : k.length > 1 && k.some((N) => N.path === M.path) ? (o.items.push(p.refresh), o.items.push(p.archive), o.items.push(p.delete), t.emit("vf-context-selected", k), console.log(k.length + " selected (more than 1 item.)")) : (M.type == "dir" ? o.items.push(p.open) : (o.items.push(p.preview), o.items.push(p.download)), o.items.push(p.rename), M.mime_type == "application/zip" ? o.items.push(p.unarchive) : o.items.push(p.archive), o.items.push(p.delete), t.emit("vf-context-selected", [M]), console.log(M.type + " is selected"));
      v(b, E);
    }), t.on("vf-contextmenu-hide", () => {
      o.active = !1;
    });
    const v = (b, E) => {
      o.active = !0, vt(() => {
        let k = E.getBoundingClientRect(), M = b.pageX, N = b.pageY, W = i.value.offsetHeight, B = i.value.offsetWidth;
        M = k.right - b.pageX + window.scrollX < B ? M - B : M, N = k.bottom - b.pageY + window.scrollY < W ? N - W : N, o.positions = {
          left: M + "px",
          top: N + "px"
        };
      });
    };
    return (b, E) => o.active ? (y(), D("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: i,
      style: Mr(o.positions)
    }, [
      (y(!0), D(ce, null, be(o.items, (k) => (y(), D("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: k.title,
        onClick: (M) => m(k)
      }, [
        Dn,
        d("span", null, T(k.title()), 1)
      ], 8, Sn))), 128))
    ], 4)) : G("", !0);
  }
}), $n = (a, e) => {
  const t = a[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((i, n) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(n.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function En(a) {
  const e = await $n(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en.c102e439.js"), "../locales/tr.json": () => import("./tr.78c5046b.js") }), `../locales/${a}.json`);
  return JSON.parse(e.default);
}
function Tn(a, e) {
  const { getStore: t, setStore: i } = Mt(a), n = ["en", "tr"], o = I({}), s = (m) => {
    n.includes(m) || (console.log("The selected locale is not yet supported. The fallback language is set as 'en'"), m = "en"), En(m).then((h) => {
      o.value = h, i("locale", m), i("translations", h), console.log(m + " is loaded.");
    });
  };
  t("locale") ? o.value = t("translations") : s(e);
  const f = (m, ...h) => h.length ? f(m = m.replace("%s", h.shift()), ...h) : m;
  function p(m, ...h) {
    return o.value.hasOwnProperty(m) ? f(o.value[m], ...h) : m;
  }
  return { t: p, support_locales: n, changeLocale: s };
}
const An = /* @__PURE__ */ d("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), On = {
  name: "VueFinder"
}, Pn = /* @__PURE__ */ Object.assign(On, {
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
  setup(a) {
    const e = a, t = Ni(), { setStore: i, getStore: n } = Mt(e.id);
    Ge("emitter", t), Ge("storage", Mt(e.id)), Ge("postData", e.postData);
    const o = Tn(e.id, e.locale);
    Ge("i18n", o);
    const { apiUrl: s, setApiUrl: f } = Se();
    f(e.url);
    const p = ft({ adapter: "local", storages: [], dirname: ".", files: [] }), m = I(n("viewport", "grid")), h = I(n("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      h.value = !h.value, i("darkMode", h.value);
    });
    const v = I(!1);
    Ge("loadingState", v);
    const b = I(n("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      b.value = !b.value, i("full-screen", b.value);
    }), t.on("vf-view-toggle", (N) => {
      m.value = N;
    });
    const E = ft({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      E.active = !1;
    }), t.on("vf-modal-show", (N) => {
      E.active = !0, E.type = N.type, E.data = N;
    });
    const k = (N) => {
      Object.assign(p, N), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update");
    };
    let M;
    return t.on("vf-fetch-abort", () => {
      M.abort(), v.value = !1;
    }), t.on("vf-fetch", ({ params: N, onSuccess: W = null, onError: B = null }) => {
      ["index", "search"].includes(N.q) && (M && M.abort(), v.value = !0), M = new AbortController();
      const A = M.signal;
      mt(s.value, { params: N, signal: A }).then((U) => {
        ["index", "search"].includes(N.q) && (v.value = !1), t.emit("vf-modal-close"), k(U), W(U);
      }).catch((U) => {
        B && B(U);
      }).finally(() => {
      });
    }), t.on("vf-download", (N) => {
      document.getElementById("download_frame").src = N, t.emit("vf-modal-close");
    }), xe(() => {
      t.emit("vf-fetch", { params: { q: "index", adapter: n("adapter", p.adapter) } });
    }), (N, W) => (y(), D("div", {
      class: de(h.value ? "dark" : "")
    }, [
      d("div", {
        class: de([b.value ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        style: Mr(b.value ? "" : "max-height: " + a.maxHeight),
        onMousedown: W[0] || (W[0] = (B) => _(t).emit("vf-contextmenu-hide"))
      }, [
        we(Co, { data: p }, null, 8, ["data"]),
        we(kn, { data: p }, null, 8, ["data"]),
        we($a, {
          view: m.value,
          data: p
        }, null, 8, ["view", "data"]),
        we(Xa, { data: p }, null, 8, ["data"])
      ], 38),
      E.active ? (y(), Z(Li("v-f-modal-" + E.type), {
        key: 0,
        selection: E.data,
        current: p
      }, null, 8, ["selection", "current"])) : G("", !0),
      we(Mn, { current: p }, null, 8, ["current"]),
      An
    ], 2));
  }
}), In = /* @__PURE__ */ d("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), Ln = { class: "fixed z-10 inset-0 overflow-y-auto" }, Nn = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, jn = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Vn = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, De = {
  __name: "ModalLayout",
  setup(a) {
    const e = z("emitter");
    return xe(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, i) => (y(), D("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: i[1] || (i[1] = Ye((n) => _(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      In,
      d("div", Ln, [
        d("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: i[0] || (i[0] = Pe((n) => _(e).emit("vf-modal-close"), ["self"]))
        }, [
          d("div", Nn, [
            d("div", jn, [
              Ct(t.$slots, "default")
            ]),
            d("div", Vn, [
              Ct(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, zn = ["aria-label"], Bn = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Rn = [
  Bn
], Hn = {
  name: "Message"
}, Ce = /* @__PURE__ */ Object.assign(Hn, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  setup(a) {
    var s;
    const { t: e } = z("i18n"), t = I(!1), i = I(null), n = I((s = i.value) == null ? void 0 : s.strMessage);
    gt(n, () => t.value = !1);
    const o = () => t.value = !0;
    return (f, p) => (y(), D("div", null, [
      t.value ? G("", !0) : (y(), D("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: de(["flex mt-1 p-1 px-2 rounded text-sm", a.error ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"])
      }, [
        Ct(f.$slots, "default"),
        d("div", {
          class: "ml-auto cursor-pointer",
          onClick: o,
          "aria-label": _(e)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, Rn, 8, zn)
      ], 2))
    ]));
  }
}), Un = { class: "sm:flex sm:items-start" }, Kn = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Yn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Wn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Xn = { class: "mt-2" }, Fn = { class: "text-sm text-gray-500" }, qn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Gn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Zn = [
  Jn
], Qn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, es = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ts = [
  es
], rs = { class: "ml-1.5" }, is = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, os = {
  name: "VFModalDelete"
}, as = /* @__PURE__ */ Object.assign(os, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), o = I(e.selection.items), s = I(""), f = () => {
      o.value.length && t.emit("vf-fetch", {
        params: {
          q: "delete",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(o.value.map(({ path: p, type: m }) => ({ path: p, type: m })))
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (p) => {
          s.value = n(p.message);
        }
      });
    };
    return (p, m) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(n)("Yes, Delete!")), 1),
        d("button", {
          type: "button",
          onClick: m[0] || (m[0] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(n)("Cancel")), 1),
        d("div", is, T(_(n)("This action cannot be undone.")), 1)
      ]),
      default: J(() => [
        d("div", Un, [
          Kn,
          d("div", Yn, [
            d("h3", Wn, T(_(n)("Delete files")), 1),
            d("div", Xn, [
              d("p", Fn, T(_(n)("Are you sure you want to delete these files?")), 1),
              (y(!0), D(ce, null, be(o.value, (h) => (y(), D("p", qn, [
                h.type == "dir" ? (y(), D("svg", Gn, Zn)) : (y(), D("svg", Qn, ts)),
                d("span", rs, T(h.basename), 1)
              ]))), 256)),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  le(T(s.value), 1)
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
}), ns = { class: "sm:flex sm:items-start" }, ss = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ls = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, cs = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, us = { class: "mt-2" }, ds = { class: "text-sm text-gray-500" }, hs = {
  name: "VFModalMessage"
}, fs = /* @__PURE__ */ Object.assign(hs, {
  props: {
    selection: Object
  },
  setup(a) {
    const e = z("emitter"), { t } = z("i18n");
    return (i, n) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: n[0] || (n[0] = (o) => _(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(t)("Close")), 1)
      ]),
      default: J(() => {
        var o, s, f, p;
        return [
          d("div", ns, [
            ss,
            d("div", ls, [
              d("h3", cs, T((s = (o = a.selection) == null ? void 0 : o.title) != null ? s : "Title"), 1),
              d("div", us, [
                d("p", ds, T((p = (f = a.selection) == null ? void 0 : f.message) != null ? p : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), ms = { class: "sm:flex sm:items-start" }, ps = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), gs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, vs = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, bs = { class: "mt-2" }, ys = { class: "text-sm text-gray-500" }, ws = ["onKeyup", "placeholder"], xs = {
  name: "VFModalNewFolder"
}, _s = /* @__PURE__ */ Object.assign(xs, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), o = I(""), s = I(""), f = () => {
      o.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfolder",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          name: o.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("%s is created.", o.value) });
        },
        onError: (p) => {
          s.value = n(p.message);
        }
      });
    };
    return (p, m) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(n)("Create")), 1),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(n)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", ms, [
          ps,
          d("div", gs, [
            d("h3", vs, T(_(n)("New Folder")), 1),
            d("div", bs, [
              d("p", ys, T(_(n)("Create a new folder")), 1),
              ve(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (h) => o.value = h),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(n)("Folder Name"),
                type: "text"
              }, null, 40, ws), [
                [We, o.value]
              ]),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  le(T(s.value), 1)
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
}), ks = { class: "sm:flex sm:items-start" }, Ss = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ds = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Cs = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ms = { class: "mt-2" }, $s = { class: "text-sm text-gray-500" }, Es = ["onKeyup", "placeholder"], Ts = {
  name: "VFModalNewFile"
}, As = /* @__PURE__ */ Object.assign(Ts, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), o = I(""), s = I(""), f = () => {
      o.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfile",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          name: o.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("%s is created.", o.value) });
        },
        onError: (p) => {
          s.value = n(p.message);
        }
      });
    };
    return (p, m) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: J(() => [
        d("div", ks, [
          Ss,
          d("div", Ds, [
            d("h3", Cs, T(_(n)("New File")), 1),
            d("div", Ms, [
              d("p", $s, T(_(n)("Create a new file")), 1),
              ve(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (h) => o.value = h),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(n)("File Name"),
                type: "text"
              }, null, 40, Es), [
                [We, o.value]
              ]),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  le(T(s.value), 1)
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
}), Os = { class: "flex" }, Ps = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Is = { class: "ml-auto mb-2" }, Ls = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, Ns = { key: 1 }, js = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(a, { emit: e }) {
    const t = a, i = I(""), n = I(""), o = I(null), s = I(!1), { apiUrl: f } = Se(), p = I(""), m = I(!1), { t: h } = z("i18n");
    xe(() => {
      mt(f.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((k) => {
        i.value = k, e("load");
      });
    });
    const v = () => {
      s.value = !s.value, n.value = i.value, s.value == !0 && vt(() => {
        o.value.focus();
      });
    }, b = z("postData"), E = () => {
      p.value = "", m.value = !1, mt(f.value, {
        method: "POST",
        params: Object.assign(b, {
          q: "save",
          adapter: t.selection.adapter,
          path: t.selection.item.path,
          content: n.value
        }),
        json: !1
      }).then((k) => {
        p.value = h("Updated."), i.value = k, e("load"), s.value = !s.value;
      }).catch((k) => {
        p.value = h(k.message), m.value = !0;
      });
    };
    return (k, M) => (y(), D(ce, null, [
      d("div", Os, [
        d("div", Ps, T(a.selection.item.basename), 1),
        d("div", Is, [
          s.value ? (y(), D("button", {
            key: 0,
            onClick: E,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, T(_(h)("Save")), 1)) : G("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: M[0] || (M[0] = (N) => v())
          }, T(s.value ? _(h)("Cancel") : _(h)("Edit")), 1)
        ])
      ]),
      d("div", null, [
        s.value ? (y(), D("div", Ns, [
          ve(d("textarea", {
            ref_key: "editInput",
            ref: o,
            "onUpdate:modelValue": M[1] || (M[1] = (N) => n.value = N),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [We, n.value]
          ])
        ])) : (y(), D("pre", Ls, T(i.value), 1)),
        p.value.length ? (y(), Z(Ce, {
          key: 2,
          error: m.value
        }, {
          default: J(() => [
            le(T(p.value), 1)
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
function dr(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(a);
    e && (i = i.filter(function(n) {
      return Object.getOwnPropertyDescriptor(a, n).enumerable;
    })), t.push.apply(t, i);
  }
  return t;
}
function Er(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? dr(Object(t), !0).forEach(function(i) {
      Bs(a, i, t[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : dr(Object(t)).forEach(function(i) {
      Object.defineProperty(a, i, Object.getOwnPropertyDescriptor(t, i));
    });
  }
  return a;
}
function ht(a) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ht = function(e) {
    return typeof e;
  } : ht = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ht(a);
}
function Vs(a, e) {
  if (!(a instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function hr(a, e) {
  for (var t = 0; t < e.length; t++) {
    var i = e[t];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(a, i.key, i);
  }
}
function zs(a, e, t) {
  return e && hr(a.prototype, e), t && hr(a, t), a;
}
function Bs(a, e, t) {
  return e in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}
function Tr(a) {
  return Rs(a) || Hs(a) || Us(a) || Ks();
}
function Rs(a) {
  if (Array.isArray(a))
    return Et(a);
}
function Hs(a) {
  if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null)
    return Array.from(a);
}
function Us(a, e) {
  if (!!a) {
    if (typeof a == "string")
      return Et(a, e);
    var t = Object.prototype.toString.call(a).slice(8, -1);
    if (t === "Object" && a.constructor && (t = a.constructor.name), t === "Map" || t === "Set")
      return Array.from(a);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return Et(a, e);
  }
}
function Et(a, e) {
  (e == null || e > a.length) && (e = a.length);
  for (var t = 0, i = new Array(e); t < e; t++)
    i[t] = a[t];
  return i;
}
function Ks() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var bt = typeof window < "u" && typeof window.document < "u", ke = bt ? window : {}, Vt = bt && ke.document.documentElement ? "ontouchstart" in ke.document.documentElement : !1, zt = bt ? "PointerEvent" in ke : !1, te = "cropper", Bt = "all", Ar = "crop", Or = "move", Pr = "zoom", Ae = "e", Oe = "w", Be = "s", $e = "n", Je = "ne", Ze = "nw", Qe = "se", et = "sw", Tt = "".concat(te, "-crop"), fr = "".concat(te, "-disabled"), fe = "".concat(te, "-hidden"), mr = "".concat(te, "-hide"), Ys = "".concat(te, "-invisible"), pt = "".concat(te, "-modal"), At = "".concat(te, "-move"), rt = "".concat(te, "Action"), ut = "".concat(te, "Preview"), Rt = "crop", Ir = "move", Lr = "none", Ot = "crop", Pt = "cropend", It = "cropmove", Lt = "cropstart", pr = "dblclick", Ws = Vt ? "touchstart" : "mousedown", Xs = Vt ? "touchmove" : "mousemove", Fs = Vt ? "touchend touchcancel" : "mouseup", gr = zt ? "pointerdown" : Ws, vr = zt ? "pointermove" : Xs, br = zt ? "pointerup pointercancel" : Fs, yr = "ready", wr = "resize", xr = "wheel", Nt = "zoom", _r = "image/jpeg", qs = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, Gs = /^data:/, Js = /^data:image\/jpeg;base64,/, Zs = /^img|canvas$/i, Nr = 200, jr = 100, kr = {
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
  minContainerWidth: Nr,
  minContainerHeight: jr,
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, Qs = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', el = Number.isNaN || ke.isNaN;
function X(a) {
  return typeof a == "number" && !el(a);
}
var Sr = function(e) {
  return e > 0 && e < 1 / 0;
};
function kt(a) {
  return typeof a > "u";
}
function Ie(a) {
  return ht(a) === "object" && a !== null;
}
var tl = Object.prototype.hasOwnProperty;
function Re(a) {
  if (!Ie(a))
    return !1;
  try {
    var e = a.constructor, t = e.prototype;
    return e && t && tl.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function he(a) {
  return typeof a == "function";
}
var rl = Array.prototype.slice;
function Vr(a) {
  return Array.from ? Array.from(a) : rl.call(a);
}
function ne(a, e) {
  return a && he(e) && (Array.isArray(a) || X(a.length) ? Vr(a).forEach(function(t, i) {
    e.call(a, t, i, a);
  }) : Ie(a) && Object.keys(a).forEach(function(t) {
    e.call(a, a[t], t, a);
  })), a;
}
var re = Object.assign || function(e) {
  for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    i[n - 1] = arguments[n];
  return Ie(e) && i.length > 0 && i.forEach(function(o) {
    Ie(o) && Object.keys(o).forEach(function(s) {
      e[s] = o[s];
    });
  }), e;
}, il = /\.\d*(?:0|9){12}\d*$/;
function Ue(a) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return il.test(a) ? Math.round(a * e) / e : a;
}
var ol = /^width|height|left|top|marginLeft|marginTop$/;
function Ee(a, e) {
  var t = a.style;
  ne(e, function(i, n) {
    ol.test(n) && X(i) && (i = "".concat(i, "px")), t[n] = i;
  });
}
function al(a, e) {
  return a.classList ? a.classList.contains(e) : a.className.indexOf(e) > -1;
}
function se(a, e) {
  if (!!e) {
    if (X(a.length)) {
      ne(a, function(i) {
        se(i, e);
      });
      return;
    }
    if (a.classList) {
      a.classList.add(e);
      return;
    }
    var t = a.className.trim();
    t ? t.indexOf(e) < 0 && (a.className = "".concat(t, " ").concat(e)) : a.className = e;
  }
}
function _e(a, e) {
  if (!!e) {
    if (X(a.length)) {
      ne(a, function(t) {
        _e(t, e);
      });
      return;
    }
    if (a.classList) {
      a.classList.remove(e);
      return;
    }
    a.className.indexOf(e) >= 0 && (a.className = a.className.replace(e, ""));
  }
}
function He(a, e, t) {
  if (!!e) {
    if (X(a.length)) {
      ne(a, function(i) {
        He(i, e, t);
      });
      return;
    }
    t ? se(a, e) : _e(a, e);
  }
}
var nl = /([a-z\d])([A-Z])/g;
function Ht(a) {
  return a.replace(nl, "$1-$2").toLowerCase();
}
function jt(a, e) {
  return Ie(a[e]) ? a[e] : a.dataset ? a.dataset[e] : a.getAttribute("data-".concat(Ht(e)));
}
function it(a, e, t) {
  Ie(t) ? a[e] = t : a.dataset ? a.dataset[e] = t : a.setAttribute("data-".concat(Ht(e)), t);
}
function sl(a, e) {
  if (Ie(a[e]))
    try {
      delete a[e];
    } catch {
      a[e] = void 0;
    }
  else if (a.dataset)
    try {
      delete a.dataset[e];
    } catch {
      a.dataset[e] = void 0;
    }
  else
    a.removeAttribute("data-".concat(Ht(e)));
}
var zr = /\s\s*/, Br = function() {
  var a = !1;
  if (bt) {
    var e = !1, t = function() {
    }, i = Object.defineProperty({}, "once", {
      get: function() {
        return a = !0, e;
      },
      set: function(o) {
        e = o;
      }
    });
    ke.addEventListener("test", t, i), ke.removeEventListener("test", t, i);
  }
  return a;
}();
function ye(a, e, t) {
  var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, n = t;
  e.trim().split(zr).forEach(function(o) {
    if (!Br) {
      var s = a.listeners;
      s && s[o] && s[o][t] && (n = s[o][t], delete s[o][t], Object.keys(s[o]).length === 0 && delete s[o], Object.keys(s).length === 0 && delete a.listeners);
    }
    a.removeEventListener(o, n, i);
  });
}
function ge(a, e, t) {
  var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, n = t;
  e.trim().split(zr).forEach(function(o) {
    if (i.once && !Br) {
      var s = a.listeners, f = s === void 0 ? {} : s;
      n = function() {
        delete f[o][t], a.removeEventListener(o, n, i);
        for (var m = arguments.length, h = new Array(m), v = 0; v < m; v++)
          h[v] = arguments[v];
        t.apply(a, h);
      }, f[o] || (f[o] = {}), f[o][t] && a.removeEventListener(o, f[o][t], i), f[o][t] = n, a.listeners = f;
    }
    a.addEventListener(o, n, i);
  });
}
function Ke(a, e, t) {
  var i;
  return he(Event) && he(CustomEvent) ? i = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (i = document.createEvent("CustomEvent"), i.initCustomEvent(e, !0, !0, t)), a.dispatchEvent(i);
}
function Rr(a) {
  var e = a.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var St = ke.location, ll = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function Dr(a) {
  var e = a.match(ll);
  return e !== null && (e[1] !== St.protocol || e[2] !== St.hostname || e[3] !== St.port);
}
function Cr(a) {
  var e = "timestamp=".concat(new Date().getTime());
  return a + (a.indexOf("?") === -1 ? "?" : "&") + e;
}
function tt(a) {
  var e = a.rotate, t = a.scaleX, i = a.scaleY, n = a.translateX, o = a.translateY, s = [];
  X(n) && n !== 0 && s.push("translateX(".concat(n, "px)")), X(o) && o !== 0 && s.push("translateY(".concat(o, "px)")), X(e) && e !== 0 && s.push("rotate(".concat(e, "deg)")), X(t) && t !== 1 && s.push("scaleX(".concat(t, ")")), X(i) && i !== 1 && s.push("scaleY(".concat(i, ")"));
  var f = s.length ? s.join(" ") : "none";
  return {
    WebkitTransform: f,
    msTransform: f,
    transform: f
  };
}
function cl(a) {
  var e = Er({}, a), t = 0;
  return ne(a, function(i, n) {
    delete e[n], ne(e, function(o) {
      var s = Math.abs(i.startX - o.startX), f = Math.abs(i.startY - o.startY), p = Math.abs(i.endX - o.endX), m = Math.abs(i.endY - o.endY), h = Math.sqrt(s * s + f * f), v = Math.sqrt(p * p + m * m), b = (v - h) / h;
      Math.abs(b) > Math.abs(t) && (t = b);
    });
  }), t;
}
function dt(a, e) {
  var t = a.pageX, i = a.pageY, n = {
    endX: t,
    endY: i
  };
  return e ? n : Er({
    startX: t,
    startY: i
  }, n);
}
function ul(a) {
  var e = 0, t = 0, i = 0;
  return ne(a, function(n) {
    var o = n.startX, s = n.startY;
    e += o, t += s, i += 1;
  }), e /= i, t /= i, {
    pageX: e,
    pageY: t
  };
}
function Te(a) {
  var e = a.aspectRatio, t = a.height, i = a.width, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", o = Sr(i), s = Sr(t);
  if (o && s) {
    var f = t * e;
    n === "contain" && f > i || n === "cover" && f < i ? t = i / e : i = t * e;
  } else
    o ? t = i / e : s && (i = t * e);
  return {
    width: i,
    height: t
  };
}
function dl(a) {
  var e = a.width, t = a.height, i = a.degree;
  if (i = Math.abs(i) % 180, i === 90)
    return {
      width: t,
      height: e
    };
  var n = i % 90 * Math.PI / 180, o = Math.sin(n), s = Math.cos(n), f = e * s + t * o, p = e * o + t * s;
  return i > 90 ? {
    width: p,
    height: f
  } : {
    width: f,
    height: p
  };
}
function hl(a, e, t, i) {
  var n = e.aspectRatio, o = e.naturalWidth, s = e.naturalHeight, f = e.rotate, p = f === void 0 ? 0 : f, m = e.scaleX, h = m === void 0 ? 1 : m, v = e.scaleY, b = v === void 0 ? 1 : v, E = t.aspectRatio, k = t.naturalWidth, M = t.naturalHeight, N = i.fillColor, W = N === void 0 ? "transparent" : N, B = i.imageSmoothingEnabled, A = B === void 0 ? !0 : B, U = i.imageSmoothingQuality, F = U === void 0 ? "low" : U, C = i.maxWidth, q = C === void 0 ? 1 / 0 : C, Q = i.maxHeight, ue = Q === void 0 ? 1 / 0 : Q, me = i.minWidth, j = me === void 0 ? 0 : me, R = i.minHeight, L = R === void 0 ? 0 : R, Y = document.createElement("canvas"), H = Y.getContext("2d"), oe = Te({
    aspectRatio: E,
    width: q,
    height: ue
  }), ee = Te({
    aspectRatio: E,
    width: j,
    height: L
  }, "cover"), Xe = Math.min(oe.width, Math.max(ee.width, k)), Fe = Math.min(oe.height, Math.max(ee.height, M)), ot = Te({
    aspectRatio: n,
    width: q,
    height: ue
  }), at = Te({
    aspectRatio: n,
    width: j,
    height: L
  }, "cover"), nt = Math.min(ot.width, Math.max(at.width, o)), Ne = Math.min(ot.height, Math.max(at.height, s)), yt = [-nt / 2, -Ne / 2, nt, Ne];
  return Y.width = Ue(Xe), Y.height = Ue(Fe), H.fillStyle = W, H.fillRect(0, 0, Xe, Fe), H.save(), H.translate(Xe / 2, Fe / 2), H.rotate(p * Math.PI / 180), H.scale(h, b), H.imageSmoothingEnabled = A, H.imageSmoothingQuality = F, H.drawImage.apply(H, [a].concat(Tr(yt.map(function(je) {
    return Math.floor(Ue(je));
  })))), H.restore(), Y;
}
var Hr = String.fromCharCode;
function fl(a, e, t) {
  var i = "";
  t += e;
  for (var n = e; n < t; n += 1)
    i += Hr(a.getUint8(n));
  return i;
}
var ml = /^data:.*,/;
function pl(a) {
  var e = a.replace(ml, ""), t = atob(e), i = new ArrayBuffer(t.length), n = new Uint8Array(i);
  return ne(n, function(o, s) {
    n[s] = t.charCodeAt(s);
  }), i;
}
function gl(a, e) {
  for (var t = [], i = 8192, n = new Uint8Array(a); n.length > 0; )
    t.push(Hr.apply(null, Vr(n.subarray(0, i)))), n = n.subarray(i);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function vl(a) {
  var e = new DataView(a), t;
  try {
    var i, n, o;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var s = e.byteLength, f = 2; f + 1 < s; ) {
        if (e.getUint8(f) === 255 && e.getUint8(f + 1) === 225) {
          n = f;
          break;
        }
        f += 1;
      }
    if (n) {
      var p = n + 4, m = n + 10;
      if (fl(e, p, 4) === "Exif") {
        var h = e.getUint16(m);
        if (i = h === 18761, (i || h === 19789) && e.getUint16(m + 2, i) === 42) {
          var v = e.getUint32(m + 4, i);
          v >= 8 && (o = m + v);
        }
      }
    }
    if (o) {
      var b = e.getUint16(o, i), E, k;
      for (k = 0; k < b; k += 1)
        if (E = o + k * 12 + 2, e.getUint16(E, i) === 274) {
          E += 8, t = e.getUint16(E, i), e.setUint16(E, 1, i);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function bl(a) {
  var e = 0, t = 1, i = 1;
  switch (a) {
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
var yl = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, i = this.container, n = this.cropper, o = Number(t.minContainerWidth), s = Number(t.minContainerHeight);
    se(n, fe), _e(e, fe);
    var f = {
      width: Math.max(i.offsetWidth, o >= 0 ? o : Nr),
      height: Math.max(i.offsetHeight, s >= 0 ? s : jr)
    };
    this.containerData = f, Ee(n, {
      width: f.width,
      height: f.height
    }), se(e, fe), _e(n, fe);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, i = this.options.viewMode, n = Math.abs(t.rotate) % 180 === 90, o = n ? t.naturalHeight : t.naturalWidth, s = n ? t.naturalWidth : t.naturalHeight, f = o / s, p = e.width, m = e.height;
    e.height * f > e.width ? i === 3 ? p = e.height * f : m = e.width / f : i === 3 ? m = e.width / f : p = e.height * f;
    var h = {
      aspectRatio: f,
      naturalWidth: o,
      naturalHeight: s,
      width: p,
      height: m
    };
    this.canvasData = h, this.limited = i === 1 || i === 2, this.limitCanvas(!0, !0), h.width = Math.min(Math.max(h.width, h.minWidth), h.maxWidth), h.height = Math.min(Math.max(h.height, h.minHeight), h.maxHeight), h.left = (e.width - h.width) / 2, h.top = (e.height - h.height) / 2, h.oldLeft = h.left, h.oldTop = h.top, this.initialCanvasData = re({}, h);
  },
  limitCanvas: function(e, t) {
    var i = this.options, n = this.containerData, o = this.canvasData, s = this.cropBoxData, f = i.viewMode, p = o.aspectRatio, m = this.cropped && s;
    if (e) {
      var h = Number(i.minCanvasWidth) || 0, v = Number(i.minCanvasHeight) || 0;
      f > 1 ? (h = Math.max(h, n.width), v = Math.max(v, n.height), f === 3 && (v * p > h ? h = v * p : v = h / p)) : f > 0 && (h ? h = Math.max(h, m ? s.width : 0) : v ? v = Math.max(v, m ? s.height : 0) : m && (h = s.width, v = s.height, v * p > h ? h = v * p : v = h / p));
      var b = Te({
        aspectRatio: p,
        width: h,
        height: v
      });
      h = b.width, v = b.height, o.minWidth = h, o.minHeight = v, o.maxWidth = 1 / 0, o.maxHeight = 1 / 0;
    }
    if (t)
      if (f > (m ? 0 : 1)) {
        var E = n.width - o.width, k = n.height - o.height;
        o.minLeft = Math.min(0, E), o.minTop = Math.min(0, k), o.maxLeft = Math.max(0, E), o.maxTop = Math.max(0, k), m && this.limited && (o.minLeft = Math.min(s.left, s.left + (s.width - o.width)), o.minTop = Math.min(s.top, s.top + (s.height - o.height)), o.maxLeft = s.left, o.maxTop = s.top, f === 2 && (o.width >= n.width && (o.minLeft = Math.min(0, E), o.maxLeft = Math.max(0, E)), o.height >= n.height && (o.minTop = Math.min(0, k), o.maxTop = Math.max(0, k))));
      } else
        o.minLeft = -o.width, o.minTop = -o.height, o.maxLeft = n.width, o.maxTop = n.height;
  },
  renderCanvas: function(e, t) {
    var i = this.canvasData, n = this.imageData;
    if (t) {
      var o = dl({
        width: n.naturalWidth * Math.abs(n.scaleX || 1),
        height: n.naturalHeight * Math.abs(n.scaleY || 1),
        degree: n.rotate || 0
      }), s = o.width, f = o.height, p = i.width * (s / i.naturalWidth), m = i.height * (f / i.naturalHeight);
      i.left -= (p - i.width) / 2, i.top -= (m - i.height) / 2, i.width = p, i.height = m, i.aspectRatio = s / f, i.naturalWidth = s, i.naturalHeight = f, this.limitCanvas(!0, !1);
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
    var t = this.canvasData, i = this.imageData, n = i.naturalWidth * (t.width / t.naturalWidth), o = i.naturalHeight * (t.height / t.naturalHeight);
    re(i, {
      width: n,
      height: o,
      left: (t.width - n) / 2,
      top: (t.height - o) / 2
    }), Ee(this.image, re({
      width: i.width,
      height: i.height
    }, tt(re({
      translateX: i.left,
      translateY: i.top
    }, i)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, i = e.aspectRatio || e.initialAspectRatio, n = Number(e.autoCropArea) || 0.8, o = {
      width: t.width,
      height: t.height
    };
    i && (t.height * i > t.width ? o.height = o.width / i : o.width = o.height * i), this.cropBoxData = o, this.limitCropBox(!0, !0), o.width = Math.min(Math.max(o.width, o.minWidth), o.maxWidth), o.height = Math.min(Math.max(o.height, o.minHeight), o.maxHeight), o.width = Math.max(o.minWidth, o.width * n), o.height = Math.max(o.minHeight, o.height * n), o.left = t.left + (t.width - o.width) / 2, o.top = t.top + (t.height - o.height) / 2, o.oldLeft = o.left, o.oldTop = o.top, this.initialCropBoxData = re({}, o);
  },
  limitCropBox: function(e, t) {
    var i = this.options, n = this.containerData, o = this.canvasData, s = this.cropBoxData, f = this.limited, p = i.aspectRatio;
    if (e) {
      var m = Number(i.minCropBoxWidth) || 0, h = Number(i.minCropBoxHeight) || 0, v = f ? Math.min(n.width, o.width, o.width + o.left, n.width - o.left) : n.width, b = f ? Math.min(n.height, o.height, o.height + o.top, n.height - o.top) : n.height;
      m = Math.min(m, n.width), h = Math.min(h, n.height), p && (m && h ? h * p > m ? h = m / p : m = h * p : m ? h = m / p : h && (m = h * p), b * p > v ? b = v / p : v = b * p), s.minWidth = Math.min(m, v), s.minHeight = Math.min(h, b), s.maxWidth = v, s.maxHeight = b;
    }
    t && (f ? (s.minLeft = Math.max(0, o.left), s.minTop = Math.max(0, o.top), s.maxLeft = Math.min(n.width, o.left + o.width) - s.width, s.maxTop = Math.min(n.height, o.top + o.height) - s.height) : (s.minLeft = 0, s.minTop = 0, s.maxLeft = n.width - s.width, s.maxTop = n.height - s.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, i = this.cropBoxData;
    (i.width > i.maxWidth || i.width < i.minWidth) && (i.left = i.oldLeft), (i.height > i.maxHeight || i.height < i.minHeight) && (i.top = i.oldTop), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), this.limitCropBox(!1, !0), i.left = Math.min(Math.max(i.left, i.minLeft), i.maxLeft), i.top = Math.min(Math.max(i.top, i.minTop), i.maxTop), i.oldLeft = i.left, i.oldTop = i.top, e.movable && e.cropBoxMovable && it(this.face, rt, i.width >= t.width && i.height >= t.height ? Or : Bt), Ee(this.cropBox, re({
      width: i.width,
      height: i.height
    }, tt({
      translateX: i.left,
      translateY: i.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), Ke(this.element, Ot, this.getData());
  }
}, wl = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, i = this.options.preview, n = t ? this.crossOriginUrl : this.url, o = e.alt || "The image to preview", s = document.createElement("img");
    if (t && (s.crossOrigin = t), s.src = n, s.alt = o, this.viewBox.appendChild(s), this.viewBoxImage = s, !!i) {
      var f = i;
      typeof i == "string" ? f = e.ownerDocument.querySelectorAll(i) : i.querySelector && (f = [i]), this.previews = f, ne(f, function(p) {
        var m = document.createElement("img");
        it(p, ut, {
          width: p.offsetWidth,
          height: p.offsetHeight,
          html: p.innerHTML
        }), t && (m.crossOrigin = t), m.src = n, m.alt = o, m.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', p.innerHTML = "", p.appendChild(m);
      });
    }
  },
  resetPreview: function() {
    ne(this.previews, function(e) {
      var t = jt(e, ut);
      Ee(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, sl(e, ut);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, i = this.cropBoxData, n = i.width, o = i.height, s = e.width, f = e.height, p = i.left - t.left - e.left, m = i.top - t.top - e.top;
    !this.cropped || this.disabled || (Ee(this.viewBoxImage, re({
      width: s,
      height: f
    }, tt(re({
      translateX: -p,
      translateY: -m
    }, e)))), ne(this.previews, function(h) {
      var v = jt(h, ut), b = v.width, E = v.height, k = b, M = E, N = 1;
      n && (N = b / n, M = o * N), o && M > E && (N = E / o, k = n * N, M = E), Ee(h, {
        width: k,
        height: M
      }), Ee(h.getElementsByTagName("img")[0], re({
        width: s * N,
        height: f * N
      }, tt(re({
        translateX: -p * N,
        translateY: -m * N
      }, e))));
    }));
  }
}, xl = {
  bind: function() {
    var e = this.element, t = this.options, i = this.cropper;
    he(t.cropstart) && ge(e, Lt, t.cropstart), he(t.cropmove) && ge(e, It, t.cropmove), he(t.cropend) && ge(e, Pt, t.cropend), he(t.crop) && ge(e, Ot, t.crop), he(t.zoom) && ge(e, Nt, t.zoom), ge(i, gr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && ge(i, xr, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ge(i, pr, this.onDblclick = this.dblclick.bind(this)), ge(e.ownerDocument, vr, this.onCropMove = this.cropMove.bind(this)), ge(e.ownerDocument, br, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && ge(window, wr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, i = this.cropper;
    he(t.cropstart) && ye(e, Lt, t.cropstart), he(t.cropmove) && ye(e, It, t.cropmove), he(t.cropend) && ye(e, Pt, t.cropend), he(t.crop) && ye(e, Ot, t.crop), he(t.zoom) && ye(e, Nt, t.zoom), ye(i, gr, this.onCropStart), t.zoomable && t.zoomOnWheel && ye(i, xr, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ye(i, pr, this.onDblclick), ye(e.ownerDocument, vr, this.onCropMove), ye(e.ownerDocument, br, this.onCropEnd), t.responsive && ye(window, wr, this.onResize);
  }
}, _l = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, i = this.containerData, n = t.offsetWidth / i.width, o = t.offsetHeight / i.height, s = Math.abs(n - 1) > Math.abs(o - 1) ? n : o;
      if (s !== 1) {
        var f, p;
        e.restore && (f = this.getCanvasData(), p = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(ne(f, function(m, h) {
          f[h] = m * s;
        })), this.setCropBoxData(ne(p, function(m, h) {
          p[h] = m * s;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Lr || this.setDragMode(al(this.dragBox, Tt) ? Ir : Rt);
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
      var n = this.options, o = this.pointers, s;
      e.changedTouches ? ne(e.changedTouches, function(f) {
        o[f.identifier] = dt(f);
      }) : o[e.pointerId || 0] = dt(e), Object.keys(o).length > 1 && n.zoomable && n.zoomOnTouch ? s = Pr : s = jt(e.target, rt), !!qs.test(s) && Ke(this.element, Lt, {
        originalEvent: e,
        action: s
      }) !== !1 && (e.preventDefault(), this.action = s, this.cropping = !1, s === Ar && (this.cropping = !0, se(this.dragBox, pt)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var i = this.pointers;
      e.preventDefault(), Ke(this.element, It, {
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
      }) : delete i[e.pointerId || 0], t && (e.preventDefault(), Object.keys(i).length || (this.action = ""), this.cropping && (this.cropping = !1, He(this.dragBox, pt, this.cropped && this.options.modal)), Ke(this.element, Pt, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, kl = {
  change: function(e) {
    var t = this.options, i = this.canvasData, n = this.containerData, o = this.cropBoxData, s = this.pointers, f = this.action, p = t.aspectRatio, m = o.left, h = o.top, v = o.width, b = o.height, E = m + v, k = h + b, M = 0, N = 0, W = n.width, B = n.height, A = !0, U;
    !p && e.shiftKey && (p = v && b ? v / b : 1), this.limited && (M = o.minLeft, N = o.minTop, W = M + Math.min(n.width, i.width, i.left + i.width), B = N + Math.min(n.height, i.height, i.top + i.height));
    var F = s[Object.keys(s)[0]], C = {
      x: F.endX - F.startX,
      y: F.endY - F.startY
    }, q = function(ue) {
      switch (ue) {
        case Ae:
          E + C.x > W && (C.x = W - E);
          break;
        case Oe:
          m + C.x < M && (C.x = M - m);
          break;
        case $e:
          h + C.y < N && (C.y = N - h);
          break;
        case Be:
          k + C.y > B && (C.y = B - k);
          break;
      }
    };
    switch (f) {
      case Bt:
        m += C.x, h += C.y;
        break;
      case Ae:
        if (C.x >= 0 && (E >= W || p && (h <= N || k >= B))) {
          A = !1;
          break;
        }
        q(Ae), v += C.x, v < 0 && (f = Oe, v = -v, m -= v), p && (b = v / p, h += (o.height - b) / 2);
        break;
      case $e:
        if (C.y <= 0 && (h <= N || p && (m <= M || E >= W))) {
          A = !1;
          break;
        }
        q($e), b -= C.y, h += C.y, b < 0 && (f = Be, b = -b, h -= b), p && (v = b * p, m += (o.width - v) / 2);
        break;
      case Oe:
        if (C.x <= 0 && (m <= M || p && (h <= N || k >= B))) {
          A = !1;
          break;
        }
        q(Oe), v -= C.x, m += C.x, v < 0 && (f = Ae, v = -v, m -= v), p && (b = v / p, h += (o.height - b) / 2);
        break;
      case Be:
        if (C.y >= 0 && (k >= B || p && (m <= M || E >= W))) {
          A = !1;
          break;
        }
        q(Be), b += C.y, b < 0 && (f = $e, b = -b, h -= b), p && (v = b * p, m += (o.width - v) / 2);
        break;
      case Je:
        if (p) {
          if (C.y <= 0 && (h <= N || E >= W)) {
            A = !1;
            break;
          }
          q($e), b -= C.y, h += C.y, v = b * p;
        } else
          q($e), q(Ae), C.x >= 0 ? E < W ? v += C.x : C.y <= 0 && h <= N && (A = !1) : v += C.x, C.y <= 0 ? h > N && (b -= C.y, h += C.y) : (b -= C.y, h += C.y);
        v < 0 && b < 0 ? (f = et, b = -b, v = -v, h -= b, m -= v) : v < 0 ? (f = Ze, v = -v, m -= v) : b < 0 && (f = Qe, b = -b, h -= b);
        break;
      case Ze:
        if (p) {
          if (C.y <= 0 && (h <= N || m <= M)) {
            A = !1;
            break;
          }
          q($e), b -= C.y, h += C.y, v = b * p, m += o.width - v;
        } else
          q($e), q(Oe), C.x <= 0 ? m > M ? (v -= C.x, m += C.x) : C.y <= 0 && h <= N && (A = !1) : (v -= C.x, m += C.x), C.y <= 0 ? h > N && (b -= C.y, h += C.y) : (b -= C.y, h += C.y);
        v < 0 && b < 0 ? (f = Qe, b = -b, v = -v, h -= b, m -= v) : v < 0 ? (f = Je, v = -v, m -= v) : b < 0 && (f = et, b = -b, h -= b);
        break;
      case et:
        if (p) {
          if (C.x <= 0 && (m <= M || k >= B)) {
            A = !1;
            break;
          }
          q(Oe), v -= C.x, m += C.x, b = v / p;
        } else
          q(Be), q(Oe), C.x <= 0 ? m > M ? (v -= C.x, m += C.x) : C.y >= 0 && k >= B && (A = !1) : (v -= C.x, m += C.x), C.y >= 0 ? k < B && (b += C.y) : b += C.y;
        v < 0 && b < 0 ? (f = Je, b = -b, v = -v, h -= b, m -= v) : v < 0 ? (f = Qe, v = -v, m -= v) : b < 0 && (f = Ze, b = -b, h -= b);
        break;
      case Qe:
        if (p) {
          if (C.x >= 0 && (E >= W || k >= B)) {
            A = !1;
            break;
          }
          q(Ae), v += C.x, b = v / p;
        } else
          q(Be), q(Ae), C.x >= 0 ? E < W ? v += C.x : C.y >= 0 && k >= B && (A = !1) : v += C.x, C.y >= 0 ? k < B && (b += C.y) : b += C.y;
        v < 0 && b < 0 ? (f = Ze, b = -b, v = -v, h -= b, m -= v) : v < 0 ? (f = et, v = -v, m -= v) : b < 0 && (f = Je, b = -b, h -= b);
        break;
      case Or:
        this.move(C.x, C.y), A = !1;
        break;
      case Pr:
        this.zoom(cl(s), e), A = !1;
        break;
      case Ar:
        if (!C.x || !C.y) {
          A = !1;
          break;
        }
        U = Rr(this.cropper), m = F.startX - U.left, h = F.startY - U.top, v = o.minWidth, b = o.minHeight, C.x > 0 ? f = C.y > 0 ? Qe : Je : C.x < 0 && (m -= v, f = C.y > 0 ? et : Ze), C.y < 0 && (h -= b), this.cropped || (_e(this.cropBox, fe), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    A && (o.width = v, o.height = b, o.left = m, o.top = h, this.action = f, this.renderCropBox()), ne(s, function(Q) {
      Q.startX = Q.endX, Q.startY = Q.endY;
    });
  }
}, Sl = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && se(this.dragBox, pt), _e(this.cropBox, fe), this.setCropBoxData(this.initialCropBoxData)), this;
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
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), _e(this.dragBox, pt), se(this.cropBox, fe)), this;
  },
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, ne(this.previews, function(i) {
      i.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, _e(this.cropper, fr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, se(this.cropper, fr)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[te] ? (e[te] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, i = this.canvasData, n = i.left, o = i.top;
    return this.moveTo(kt(e) ? e : n + Number(e), kt(t) ? t : o + Number(t));
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
    var n = this.options, o = this.canvasData, s = o.width, f = o.height, p = o.naturalWidth, m = o.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && n.zoomable) {
      var h = p * e, v = m * e;
      if (Ke(this.element, Nt, {
        ratio: e,
        oldRatio: s / p,
        originalEvent: i
      }) === !1)
        return this;
      if (i) {
        var b = this.pointers, E = Rr(this.cropper), k = b && Object.keys(b).length ? ul(b) : {
          pageX: i.pageX,
          pageY: i.pageY
        };
        o.left -= (h - s) * ((k.pageX - E.left - o.left) / s), o.top -= (v - f) * ((k.pageY - E.top - o.top) / f);
      } else
        Re(t) && X(t.x) && X(t.y) ? (o.left -= (h - s) * ((t.x - o.left) / s), o.top -= (v - f) * ((t.y - o.top) / f)) : (o.left -= (h - s) / 2, o.top -= (v - f) / 2);
      o.width = h, o.height = v, this.renderCanvas(!0);
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
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, t = this.options, i = this.imageData, n = this.canvasData, o = this.cropBoxData, s;
    if (this.ready && this.cropped) {
      s = {
        x: o.left - n.left,
        y: o.top - n.top,
        width: o.width,
        height: o.height
      };
      var f = i.width / i.naturalWidth;
      if (ne(s, function(h, v) {
        s[v] = h / f;
      }), e) {
        var p = Math.round(s.y + s.height), m = Math.round(s.x + s.width);
        s.x = Math.round(s.x), s.y = Math.round(s.y), s.width = m - s.x, s.height = p - s.y;
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
    var t = this.options, i = this.imageData, n = this.canvasData, o = {};
    if (this.ready && !this.disabled && Re(e)) {
      var s = !1;
      t.rotatable && X(e.rotate) && e.rotate !== i.rotate && (i.rotate = e.rotate, s = !0), t.scalable && (X(e.scaleX) && e.scaleX !== i.scaleX && (i.scaleX = e.scaleX, s = !0), X(e.scaleY) && e.scaleY !== i.scaleY && (i.scaleY = e.scaleY, s = !0)), s && this.renderCanvas(!0, !0);
      var f = i.width / i.naturalWidth;
      X(e.x) && (o.left = e.x * f + n.left), X(e.y) && (o.top = e.y * f + n.top), X(e.width) && (o.width = e.width * f), X(e.height) && (o.height = e.height * f), this.setCropBoxData(o);
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
    var t = this.cropBoxData, i = this.options.aspectRatio, n, o;
    return this.ready && this.cropped && !this.disabled && Re(e) && (X(e.left) && (t.left = e.left), X(e.top) && (t.top = e.top), X(e.width) && e.width !== t.width && (n = !0, t.width = e.width), X(e.height) && e.height !== t.height && (o = !0, t.height = e.height), i && (n ? t.height = t.width / i : o && (t.width = t.height * i)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, i = hl(this.image, this.imageData, t, e);
    if (!this.cropped)
      return i;
    var n = this.getData(), o = n.x, s = n.y, f = n.width, p = n.height, m = i.width / Math.floor(t.naturalWidth);
    m !== 1 && (o *= m, s *= m, f *= m, p *= m);
    var h = f / p, v = Te({
      aspectRatio: h,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Te({
      aspectRatio: h,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), E = Te({
      aspectRatio: h,
      width: e.width || (m !== 1 ? i.width : f),
      height: e.height || (m !== 1 ? i.height : p)
    }), k = E.width, M = E.height;
    k = Math.min(v.width, Math.max(b.width, k)), M = Math.min(v.height, Math.max(b.height, M));
    var N = document.createElement("canvas"), W = N.getContext("2d");
    N.width = Ue(k), N.height = Ue(M), W.fillStyle = e.fillColor || "transparent", W.fillRect(0, 0, k, M);
    var B = e.imageSmoothingEnabled, A = B === void 0 ? !0 : B, U = e.imageSmoothingQuality;
    W.imageSmoothingEnabled = A, U && (W.imageSmoothingQuality = U);
    var F = i.width, C = i.height, q = o, Q = s, ue, me, j, R, L, Y;
    q <= -f || q > F ? (q = 0, ue = 0, j = 0, L = 0) : q <= 0 ? (j = -q, q = 0, ue = Math.min(F, f + q), L = ue) : q <= F && (j = 0, ue = Math.min(f, F - q), L = ue), ue <= 0 || Q <= -p || Q > C ? (Q = 0, me = 0, R = 0, Y = 0) : Q <= 0 ? (R = -Q, Q = 0, me = Math.min(C, p + Q), Y = me) : Q <= C && (R = 0, me = Math.min(p, C - Q), Y = me);
    var H = [q, Q, ue, me];
    if (L > 0 && Y > 0) {
      var oe = k / f;
      H.push(j * oe, R * oe, L * oe, Y * oe);
    }
    return W.drawImage.apply(W, [i].concat(Tr(H.map(function(ee) {
      return Math.floor(Ue(ee));
    })))), N;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !kt(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, i = this.dragBox, n = this.face;
    if (this.ready && !this.disabled) {
      var o = e === Rt, s = t.movable && e === Ir;
      e = o || s ? e : Lr, t.dragMode = e, it(i, rt, e), He(i, Tt, o), He(i, At, s), t.cropBoxMovable || (it(n, rt, e), He(n, Tt, o), He(n, At, s));
    }
    return this;
  }
}, Dl = ke.Cropper, Ur = /* @__PURE__ */ function() {
  function a(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (Vs(this, a), !e || !Zs.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = re({}, kr, Re(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return zs(a, [{
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
        var n = this.element, o = this.options;
        if (!o.rotatable && !o.scalable && (o.checkOrientation = !1), !o.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (Gs.test(t)) {
          Js.test(t) ? this.read(pl(t)) : this.clone();
          return;
        }
        var s = new XMLHttpRequest(), f = this.clone.bind(this);
        this.reloading = !0, this.xhr = s, s.onabort = f, s.onerror = f, s.ontimeout = f, s.onprogress = function() {
          s.getResponseHeader("content-type") !== _r && s.abort();
        }, s.onload = function() {
          i.read(s.response);
        }, s.onloadend = function() {
          i.reloading = !1, i.xhr = null;
        }, o.checkCrossOrigin && Dr(t) && n.crossOrigin && (t = Cr(t)), s.open("GET", t, !0), s.responseType = "arraybuffer", s.withCredentials = n.crossOrigin === "use-credentials", s.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var i = this.options, n = this.imageData, o = vl(t), s = 0, f = 1, p = 1;
      if (o > 1) {
        this.url = gl(t, _r);
        var m = bl(o);
        s = m.rotate, f = m.scaleX, p = m.scaleY;
      }
      i.rotatable && (n.rotate = s), i.scalable && (n.scaleX = f, n.scaleY = p), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, i = this.url, n = t.crossOrigin, o = i;
      this.options.checkCrossOrigin && Dr(i) && (n || (n = "anonymous"), o = Cr(i)), this.crossOrigin = n, this.crossOriginUrl = o;
      var s = document.createElement("img");
      n && (s.crossOrigin = n), s.src = o || i, s.alt = t.alt || "The image to crop", this.image = s, s.onload = this.start.bind(this), s.onerror = this.stop.bind(this), se(s, mr), t.parentNode.insertBefore(s, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, i = this.image;
      i.onload = null, i.onerror = null, this.sizing = !0;
      var n = ke.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(ke.navigator.userAgent), o = function(m, h) {
        re(t.imageData, {
          naturalWidth: m,
          naturalHeight: h,
          aspectRatio: m / h
        }), t.initialImageData = re({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (i.naturalWidth && !n) {
        o(i.naturalWidth, i.naturalHeight);
        return;
      }
      var s = document.createElement("img"), f = document.body || document.documentElement;
      this.sizingImage = s, s.onload = function() {
        o(s.width, s.height), n || f.removeChild(s);
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
        var t = this.element, i = this.options, n = this.image, o = t.parentNode, s = document.createElement("div");
        s.innerHTML = Qs;
        var f = s.querySelector(".".concat(te, "-container")), p = f.querySelector(".".concat(te, "-canvas")), m = f.querySelector(".".concat(te, "-drag-box")), h = f.querySelector(".".concat(te, "-crop-box")), v = h.querySelector(".".concat(te, "-face"));
        this.container = o, this.cropper = f, this.canvas = p, this.dragBox = m, this.cropBox = h, this.viewBox = f.querySelector(".".concat(te, "-view-box")), this.face = v, p.appendChild(n), se(t, fe), o.insertBefore(f, t.nextSibling), this.isImg || _e(n, mr), this.initPreview(), this.bind(), i.initialAspectRatio = Math.max(0, i.initialAspectRatio) || NaN, i.aspectRatio = Math.max(0, i.aspectRatio) || NaN, i.viewMode = Math.max(0, Math.min(3, Math.round(i.viewMode))) || 0, se(h, fe), i.guides || se(h.getElementsByClassName("".concat(te, "-dashed")), fe), i.center || se(h.getElementsByClassName("".concat(te, "-center")), fe), i.background && se(f, "".concat(te, "-bg")), i.highlight || se(v, Ys), i.cropBoxMovable && (se(v, At), it(v, rt, Bt)), i.cropBoxResizable || (se(h.getElementsByClassName("".concat(te, "-line")), fe), se(h.getElementsByClassName("".concat(te, "-point")), fe)), this.render(), this.ready = !0, this.setDragMode(i.dragMode), i.autoCrop && this.crop(), this.setData(i.data), he(i.ready) && ge(t, yr, i.ready, {
          once: !0
        }), Ke(t, yr);
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
      return window.Cropper = Dl, a;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      re(kr, Re(t) && t);
    }
  }]), a;
}();
re(Ur.prototype, yl, wl, xl, _l, kl, Sl);
const Cl = { class: "flex" }, Ml = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, $l = { class: "ml-auto mb-2" }, El = { class: "w-full flex justify-center" }, Tl = ["src"], Al = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(a, { emit: e }) {
    const t = a, { t: i } = z("i18n"), { apiUrl: n } = Se(), o = I(null), s = I(null), f = I(!1), p = I(""), m = I(!1), h = () => {
      f.value = !f.value, f.value ? s.value = new Ur(o.value, {
        crop(E) {
        }
      }) : s.value.destroy();
    }, v = z("postData"), b = () => {
      s.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (E) => {
          p.value = "", m.value = !1, mt(n.value, {
            method: "POST",
            params: Object.assign(v, {
              q: "upload",
              adapter: t.selection.adapter,
              path: t.selection.item.path,
              file: E
            }),
            name: t.selection.item.basename,
            json: !1
          }).then((k) => {
            p.value = i("Updated."), o.value.src = $t(t.selection.adapter, t.selection.item.path), h(), e("load");
          }).catch((k) => {
            p.value = i(k.message), m.value = !0;
          });
        }
      );
    };
    return xe(() => {
      e("load");
    }), (E, k) => (y(), D(ce, null, [
      d("div", Cl, [
        d("h3", Ml, T(a.selection.item.basename), 1),
        d("div", $l, [
          f.value ? (y(), D("button", {
            key: 0,
            onClick: b,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, T(_(i)("Crop")), 1)) : G("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: k[0] || (k[0] = (M) => h())
          }, T(f.value ? _(i)("Cancel") : _(i)("Edit")), 1)
        ])
      ]),
      d("div", El, [
        d("img", {
          ref_key: "image",
          ref: o,
          class: "max-w-[60vh] max-h-[60vh]",
          src: _($t)(t.selection.adapter, t.selection.item.path),
          alt: ""
        }, null, 8, Tl)
      ]),
      p.value.length ? (y(), Z(Ce, {
        key: 0,
        error: m.value
      }, {
        default: J(() => [
          le(T(p.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : G("", !0)
    ], 64));
  }
}, Ol = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Pl = /* @__PURE__ */ d("div", null, " Default view.. ", -1), Il = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(a, { emit: e }) {
    return xe(() => {
      e("load");
    }), (t, i) => (y(), D(ce, null, [
      d("h3", Ol, T(a.selection.item.basename), 1),
      Pl
    ], 64));
  }
}, Ll = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Nl = {
  class: "w-full",
  preload: "",
  controls: ""
}, jl = ["src"], Vl = /* @__PURE__ */ le(" Your browser does not support the video tag. "), zl = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(a, { emit: e }) {
    const t = a, { apiUrl: i } = Se(), n = () => i.value + "?" + Le({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (o, s) => (y(), D(ce, null, [
      d("h3", Ll, T(a.selection.item.basename), 1),
      d("div", null, [
        d("video", Nl, [
          d("source", {
            src: n(),
            type: "video/mp4"
          }, null, 8, jl),
          Vl
        ])
      ])
    ], 64));
  }
}, Bl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Rl = {
  class: "w-full",
  controls: ""
}, Hl = ["src"], Ul = /* @__PURE__ */ le(" Your browser does not support the audio element. "), Kl = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(a, { emit: e }) {
    const t = a, { apiUrl: i } = Se(), n = () => i.value + "?" + Le({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (o, s) => (y(), D(ce, null, [
      d("h3", Bl, T(a.selection.item.basename), 1),
      d("div", null, [
        d("audio", Rl, [
          d("source", {
            src: n(),
            type: "audio/mpeg"
          }, null, 8, Hl),
          Ul
        ])
      ])
    ], 64));
  }
}, Yl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Wl = ["data"], Xl = ["src"], Fl = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(a, { emit: e }) {
    const t = a, { apiUrl: i } = Se(), n = () => i.value + "?" + Le({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (o, s) => (y(), D(ce, null, [
      d("h3", Yl, T(a.selection.item.basename), 1),
      d("div", null, [
        d("object", {
          class: "h-[60vh]",
          data: n(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          d("iframe", {
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
        `, 8, Xl)
        ], 8, Wl)
      ])
    ], 64));
  }
}, ql = { class: "sm:flex sm:items-start" }, Gl = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Jl = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Zl = {
  key: 0,
  class: "flex leading-5"
}, Ql = /* @__PURE__ */ d("svg", {
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
], -1), ec = {
  name: "VFModalPreview"
}, tc = /* @__PURE__ */ Object.assign(ec, {
  props: {
    selection: Object
  },
  setup(a) {
    const e = a, { apiUrl: t } = Se(), i = z("emitter"), { t: n } = z("i18n"), o = I(!1), s = (m) => o.value = m, f = (m) => {
      var h;
      return ((h = e.selection.item.mime_type) != null ? h : "").startsWith(m);
    }, p = () => {
      const m = t.value + "?" + Le({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      i.emit("vf-download", m);
    };
    return (m, h) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: h[6] || (h[6] = (v) => _(i).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(n)("Close")), 1),
        d("button", {
          type: "button",
          onClick: h[7] || (h[7] = (v) => p()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(n)("Download")), 1)
      ]),
      default: J(() => [
        d("div", ql, [
          d("div", Gl, [
            d("div", null, [
              f("text") ? (y(), Z(js, {
                key: 0,
                selection: a.selection,
                onLoad: h[0] || (h[0] = (v) => s(!0))
              }, null, 8, ["selection"])) : f("image") ? (y(), Z(Al, {
                key: 1,
                selection: a.selection,
                onLoad: h[1] || (h[1] = (v) => s(!0))
              }, null, 8, ["selection"])) : f("video") ? (y(), Z(zl, {
                key: 2,
                selection: a.selection,
                onLoad: h[2] || (h[2] = (v) => s(!0))
              }, null, 8, ["selection"])) : f("audio") ? (y(), Z(Kl, {
                key: 3,
                selection: a.selection,
                onLoad: h[3] || (h[3] = (v) => s(!0))
              }, null, 8, ["selection"])) : f("application/pdf") ? (y(), Z(Fl, {
                key: 4,
                selection: a.selection,
                onLoad: h[4] || (h[4] = (v) => s(!0))
              }, null, 8, ["selection"])) : (y(), Z(Il, {
                key: 5,
                selection: a.selection,
                onLoad: h[5] || (h[5] = (v) => s(!0))
              }, null, 8, ["selection"]))
            ]),
            d("div", Jl, [
              d("p", null, T(a.selection.item.path), 1),
              d("p", null, "mime_type: " + T(a.selection.item.mime_type), 1),
              o.value == !1 ? (y(), D("div", Zl, [
                Ql,
                d("span", null, T(_(n)("Loading")), 1)
              ])) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), rc = { class: "sm:flex sm:items-start" }, ic = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), oc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ac = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, nc = { class: "mt-2" }, sc = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, lc = {
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
], mc = { class: "ml-1.5" }, pc = ["onKeyup"], gc = {
  name: "VFModalRename"
}, vc = /* @__PURE__ */ Object.assign(gc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), o = I(e.selection.items[0]), s = I(e.selection.items[0].basename), f = I(""), p = () => {
      s.value != "" && t.emit("vf-fetch", {
        params: {
          q: "rename",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          item: o.value.path,
          name: s.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("%s is renamed.", s.value) });
        },
        onError: (m) => {
          f.value = n(m.message);
        }
      });
    };
    return (m, h) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: p,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(n)("Rename")), 1),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (v) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(n)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", rc, [
          ic,
          d("div", oc, [
            d("h3", ac, T(_(n)("Rename")), 1),
            d("div", nc, [
              d("p", sc, [
                o.value.type == "dir" ? (y(), D("svg", lc, uc)) : (y(), D("svg", dc, fc)),
                d("span", mc, T(o.value.basename), 1)
              ]),
              ve(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (v) => s.value = v),
                onKeyup: Ye(p, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, pc), [
                [We, s.value]
              ]),
              f.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  le(T(f.value), 1)
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
}), bc = { class: "sm:flex sm:items-start" }, yc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), wc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, xc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, _c = { class: "mt-2" }, kc = { class: "text-gray-500 mb-1" }, Sc = ["id"], Dc = {
  key: 0,
  class: "py-2"
}, Cc = ["disabled", "onClick"], Mc = {
  name: "VFModalUpload"
}, $c = /* @__PURE__ */ Object.assign(Mc, {
  props: {
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { apiUrl: i } = Se(), { t: n } = z("i18n"), o = I(null), s = I(null), f = I(null), p = I([]), m = I(""), h = I(!0), v = () => {
      m.value = "", o.value.start();
    }, b = z("postData");
    return xe(() => {
      o.value = new _t.Uploader({
        runtimes: "html5",
        browse_button: f.value,
        container: s.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: i.value + "?" + Le(Object.assign(b, { q: "upload", adapter: e.current.adapter, path: e.current.dirname })),
        init: {
          PostInit: function() {
          },
          FilesAdded: function(E, k) {
            h.value = !1, _t.each(k, function(M) {
              p.value.push({
                id: M.id,
                name: M.name,
                size: _t.formatSize(M.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(E, k) {
            p.value[p.value.findIndex((M) => M.id == k.id)].percent = k.percent + "%";
          },
          UploadComplete: function() {
            h.value = !0, t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
          },
          Error: function(E, k) {
            o.value.stop(), m.value = n(JSON.parse(k.response).message);
          }
        }
      }), o.value.init();
    }), (E, k) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          disabled: h.value,
          onClick: Pe(v, ["prevent"]),
          type: "button",
          class: de([h.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, T(_(n)("Upload")), 11, Cc),
        d("button", {
          type: "button",
          onClick: k[0] || (k[0] = (M) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(n)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", bc, [
          yc,
          d("div", wc, [
            d("h3", xc, T(_(n)("Upload files")), 1),
            d("div", _c, [
              d("div", kc, [
                (y(!0), D(ce, null, be(p.value, (M) => (y(), D("div", null, [
                  d("div", {
                    id: M.id
                  }, [
                    le(T(M.name) + " ( " + T(M.size) + ") ", 1),
                    d("b", null, T(M.percent), 1)
                  ], 8, Sc)
                ]))), 256)),
                p.value.length ? G("", !0) : (y(), D("div", Dc, T(_(n)("No files selected!")), 1))
              ]),
              d("div", {
                class: "text-gray-500",
                ref_key: "container",
                ref: s
              }, [
                d("button", {
                  ref_key: "pickFiles",
                  ref: f,
                  type: "button",
                  class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                }, T(_(n)("Select Files")), 513)
              ], 512),
              m.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  le(T(m.value), 1)
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
}), Ec = { class: "sm:flex sm:items-start" }, Tc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ac = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Oc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Pc = { class: "mt-2" }, Ic = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Lc = {
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
}, null, -1), jc = [
  Nc
], Vc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Bc = [
  zc
], Rc = { class: "ml-1.5" }, Hc = ["onKeyup", "placeholder"], Uc = {
  name: "VFModalArchive"
}, Kc = /* @__PURE__ */ Object.assign(Uc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), o = I(""), s = I(""), f = I(e.selection.items), p = () => {
      f.value.length && t.emit("vf-fetch", {
        params: {
          q: "archive",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(f.value.map(({ path: m, type: h }) => ({ path: m, type: h }))),
          name: o.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (m) => {
          s.value = n(m.message);
        }
      });
    };
    return (m, h) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: p,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(n)("Archive")), 1),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (v) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(n)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", Ec, [
          Tc,
          d("div", Ac, [
            d("h3", Oc, T(_(n)("Archive the files")), 1),
            d("div", Pc, [
              (y(!0), D(ce, null, be(f.value, (v) => (y(), D("p", Ic, [
                v.type == "dir" ? (y(), D("svg", Lc, jc)) : (y(), D("svg", Vc, Bc)),
                d("span", Rc, T(v.basename), 1)
              ]))), 256)),
              ve(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (v) => o.value = v),
                onKeyup: Ye(p, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Hc), [
                [We, o.value]
              ]),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  le(T(s.value), 1)
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
}), Yc = { class: "sm:flex sm:items-start" }, Wc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Xc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Fc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, qc = { class: "mt-2" }, Gc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Jc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Qc = [
  Zc
], eu = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, tu = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ru = [
  tu
], iu = { class: "ml-1.5" }, ou = { class: "my-1 text-sm text-gray-500" }, au = {
  name: "VFModalUnarchive"
}, nu = /* @__PURE__ */ Object.assign(au, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n");
    I("");
    const o = I(e.selection.items[0]), s = I(""), f = I([]), p = () => {
      t.emit("vf-fetch", {
        params: {
          q: "unarchive",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          item: o.value.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (m) => {
          s.value = n(m.message);
        }
      });
    };
    return (m, h) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: p,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(n)("Unarchive")), 1),
        d("button", {
          type: "button",
          onClick: h[0] || (h[0] = (v) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(n)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", Yc, [
          Wc,
          d("div", Xc, [
            d("h3", Fc, T(_(n)("Unarchive")), 1),
            d("div", qc, [
              (y(!0), D(ce, null, be(f.value, (v) => (y(), D("p", Gc, [
                v.type == "dir" ? (y(), D("svg", Jc, Qc)) : (y(), D("svg", eu, ru)),
                d("span", iu, T(v.basename), 1)
              ]))), 256)),
              d("p", ou, T(_(n)("The archive will be unarchived at")) + " (" + T(a.current.dirname) + ")", 1),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  le(T(s.value), 1)
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
}), su = { class: "sm:flex sm:items-start" }, lu = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), cu = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, uu = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, du = { class: "mt-2" }, hu = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, fu = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mu = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), pu = [
  mu
], gu = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vu = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), bu = [
  vu
], yu = { class: "ml-1.5" }, wu = { class: "text-sm text-gray-500 pb-1 pt-3" }, xu = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, _u = /* @__PURE__ */ d("svg", {
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
], -1), ku = { class: "ml-1.5 overflow-auto" }, Su = {
  name: "VFModalMove"
}, Du = /* @__PURE__ */ Object.assign(Su, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { t: i } = z("i18n"), { getStore: n } = z("storage"), o = I(e.selection.items.from), s = I(""), f = () => {
      o.value.length && t.emit("vf-fetch", {
        params: {
          q: "move",
          adapter: n("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(o.value.map(({ path: p, type: m }) => ({ path: p, type: m }))),
          item: e.selection.items.to.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: i("Files moved.", e.selection.items.to.name) });
        },
        onError: (p) => {
          s.value = i(p.message);
        }
      });
    };
    return (p, m) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(i)("Yes, Move!")), 1),
        d("button", {
          type: "button",
          onClick: m[0] || (m[0] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, T(_(i)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", su, [
          lu,
          d("div", cu, [
            d("h3", uu, T(_(i)("Move files")), 1),
            d("div", du, [
              (y(!0), D(ce, null, be(o.value, (h) => (y(), D("p", hu, [
                h.type == "dir" ? (y(), D("svg", fu, pu)) : (y(), D("svg", gu, bu)),
                d("span", yu, T(h.path), 1)
              ]))), 256)),
              d("p", wu, T(_(i)("Are you sure you want to move these files?")), 1),
              d("p", xu, [
                _u,
                d("span", ku, T(a.selection.items.to.path), 1)
              ]),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                error: ""
              }, {
                default: J(() => [
                  le(T(s.value), 1)
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
}), Cu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: as,
  ModalMessage: fs,
  ModalNewFolder: _s,
  ModalNewFile: As,
  ModalPreview: tc,
  ModalRename: vc,
  ModalUpload: $c,
  ModalArchive: Kc,
  ModalUnarchive: nu,
  ModalMove: Du
}, Symbol.toStringTag, { value: "Module" })), Dt = {
  VueFinder: Pn,
  ...Cu
};
const Eu = {
  install(a) {
    for (const e in Dt)
      if (Dt.hasOwnProperty(e)) {
        const t = Dt[e];
        a.component(t.name, t);
      }
  }
};
export {
  Eu as default
};
