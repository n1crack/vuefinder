import { ref as L, watch as It, inject as j, openBlock as y, createElementBlock as S, createElementVNode as u, unref as x, normalizeClass as he, createTextVNode as ie, toDisplayString as $, createCommentVNode as X, createVNode as De, TransitionGroup as Wa, withCtx as q, Fragment as ue, renderList as ke, reactive as $t, onMounted as Ce, onUpdated as Xa, withDirectives as _e, vShow as kt, withModifiers as Ke, nextTick as Lt, isRef as ho, vModelSelect as Br, createStaticVNode as qa, customRef as Ga, withKeys as st, vModelText as it, normalizeStyle as fo, provide as Be, createBlock as J, resolveDynamicComponent as Ja, renderSlot as Yt } from "vue";
import ct from "plupload";
var uo;
const Et = (uo = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : uo.getAttribute("content"), Tt = (t, { method: e = "get", params: r = {}, json: o = !0, signal: i = null }) => {
  const a = { method: e };
  if (a.signal = i, e == "get")
    t += "?" + new URLSearchParams(r);
  else {
    a.headers = {}, Et && (a.headers["X-CSRF-Token"] = Et);
    let n = new FormData();
    for (const [m, g] of Object.entries(r))
      n.append(m, g);
    a.body = n;
  }
  return fetch(t, a).then((n) => n.ok ? o ? n.json() : n.text() : n.json().then(Promise.reject.bind(Promise)));
};
function Za(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(e, r) {
    var o = t.get(e);
    o ? o.push(r) : t.set(e, [r]);
  }, off: function(e, r) {
    var o = t.get(e);
    o && (r ? o.splice(o.indexOf(r) >>> 0, 1) : t.set(e, []));
  }, emit: function(e, r) {
    var o = t.get(e);
    o && o.slice().map(function(i) {
      i(r);
    }), (o = t.get("*")) && o.slice().map(function(i) {
      i(e, r);
    });
  } };
}
function Wt(t) {
  let e = localStorage.getItem(t + "_storage");
  const r = L(JSON.parse(e));
  It(r, o);
  function o() {
    r.value === null || r.value === "" ? localStorage.removeItem(t + "_storage") : localStorage.setItem(t + "_storage", JSON.stringify(r.value));
  }
  function i(m, g) {
    r.value = Object.assign({ ...r.value }, { [m]: g });
  }
  function a() {
    r.value = null;
  }
  return { getStore: (m, g = null) => r.value === null || r.value === "" ? g : r.value.hasOwnProperty(m) ? r.value[m] : g, setStore: i, clearStore: a };
}
const Hr = L("");
function Te() {
  function t(e) {
    Hr.value = e;
  }
  return { apiUrl: Hr, setApiUrl: t };
}
const Qa = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, es = {
  key: 0,
  class: "flex text-center"
}, ts = ["aria-label"], rs = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  })
], -1), os = [
  rs
], as = ["aria-label"], ss = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
  })
], -1), is = [
  ss
], ns = ["aria-label"], ls = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), cs = [
  ls
], us = ["aria-label"], ds = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), hs = [
  ds
], fs = ["aria-label"], ms = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  })
], -1), gs = [
  ms
], ps = ["aria-label"], vs = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), bs = [
  vs
], ys = ["aria-label"], ws = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), xs = [
  ws
], _s = {
  key: 1,
  class: "flex text-center"
}, ks = { class: "pl-2" }, Ss = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Ds = {
  key: 0,
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, Cs = /* @__PURE__ */ u("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), Ms = /* @__PURE__ */ u("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), $s = [
  Cs,
  Ms
], Es = { class: "flex text-center items-center justify-end" }, Ts = ["aria-label"], As = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), Os = [
  As
], Is = ["aria-label"], Ls = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, Ps = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, Ns = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, js = ["aria-label"], zs = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, Vs = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, Rs = {
  name: "VFToolbar"
}, Bs = /* @__PURE__ */ Object.assign(Rs, {
  props: {
    data: Object
  },
  setup(t) {
    const e = j("emitter"), { getStore: r, setStore: o } = j("storage"), { t: i } = j("i18n"), a = L(r("viewport", "grid")), n = L([]), m = L(r("full-screen", !1)), g = L("");
    e.on("vf-search-query", ({ newQuery: b }) => {
      g.value = b;
    });
    const f = j("loadingState"), h = () => f.value, p = () => {
      m.value = !m.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (b) => {
      n.value = b;
    }), e.on("vf-view-toggle", (b) => {
      o("viewport", b), a.value = b;
    }), (b, E) => (y(), S("div", Qa, [
      g.value.length ? (y(), S("div", _s, [
        u("div", ks, [
          ie($(x(i)("Search results for")) + " ", 1),
          u("span", Ss, $(g.value), 1)
        ]),
        h() ? (y(), S("svg", Ds, $s)) : X("", !0)
      ])) : (y(), S("div", es, [
        u("div", {
          class: "mx-1.5",
          "aria-label": x(i)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: E[0] || (E[0] = (D) => x(e).emit("vf-modal-show", { type: "new-folder", items: n.value }))
        }, os, 8, ts),
        u("div", {
          class: "mx-1.5",
          "aria-label": x(i)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: E[1] || (E[1] = (D) => x(e).emit("vf-modal-show", { type: "new-file", items: n.value }))
        }, is, 8, as),
        u("div", {
          class: "mx-1.5",
          "aria-label": x(i)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: E[2] || (E[2] = (D) => n.value.length != 1 || x(e).emit("vf-modal-show", { type: "rename", items: n.value }))
        }, [
          (y(), S("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: he([n.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, cs, 2))
        ], 8, ns),
        u("div", {
          class: "mx-1.5",
          "aria-label": x(i)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: E[3] || (E[3] = (D) => !n.value.length || x(e).emit("vf-modal-show", { type: "delete", items: n.value }))
        }, [
          (y(), S("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: he([n.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, hs, 2))
        ], 8, us),
        u("div", {
          class: "mx-1.5",
          "aria-label": x(i)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: E[4] || (E[4] = (D) => x(e).emit("vf-modal-show", { type: "upload", items: n.value }))
        }, gs, 8, fs),
        n.value.length == 1 && n.value[0].mime_type == "application/zip" ? (y(), S("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": x(i)("Unrchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: E[5] || (E[5] = (D) => !n.value.length || x(e).emit("vf-modal-show", { type: "unarchive", items: n.value }))
        }, [
          (y(), S("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: he([n.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, bs, 2))
        ], 8, ps)) : (y(), S("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": x(i)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: E[6] || (E[6] = (D) => !n.value.length || x(e).emit("vf-modal-show", { type: "archive", items: n.value }))
        }, [
          (y(), S("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: he([n.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, xs, 2))
        ], 8, ys))
      ])),
      u("div", Es, [
        u("div", {
          class: "mx-1.5",
          "aria-label": x(i)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (y(), S("svg", {
            onClick: E[7] || (E[7] = (D) => x(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, Os))
        ], 8, Ts),
        u("div", {
          class: "mx-1.5",
          "aria-label": x(i)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: p
        }, [
          (y(), S("svg", Ls, [
            m.value ? (y(), S("path", Ps)) : (y(), S("path", Ns))
          ]))
        ], 8, Is),
        u("div", {
          class: "mx-1.5",
          "aria-label": x(i)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: E[8] || (E[8] = (D) => g.value.length || x(e).emit("vf-view-toggle", a.value == "list" ? "grid" : "list"))
        }, [
          (y(), S("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: he([g.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            a.value == "grid" ? (y(), S("path", zs)) : X("", !0),
            a.value == "list" ? (y(), S("path", Vs)) : X("", !0)
          ], 2))
        ], 8, js)
      ])
    ]));
  }
});
var Hs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, mo = { exports: {} };
(function(t, e) {
  (function(r, o) {
    t.exports = o();
  })(Hs, function() {
    function r(d, l) {
      if (!(d instanceof l))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(d, l) {
      for (var s = 0; s < l.length; s++) {
        var v = l[s];
        v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(d, v.key, v);
      }
    }
    function i(d, l, s) {
      return l && o(d.prototype, l), s && o(d, s), d;
    }
    function a(d, l, s) {
      return l in d ? Object.defineProperty(d, l, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : d[l] = s, d;
    }
    function n(d, l) {
      var s = Object.keys(d);
      if (Object.getOwnPropertySymbols) {
        var v = Object.getOwnPropertySymbols(d);
        l && (v = v.filter(function(c) {
          return Object.getOwnPropertyDescriptor(d, c).enumerable;
        })), s.push.apply(s, v);
      }
      return s;
    }
    function m(d) {
      for (var l = 1; l < arguments.length; l++) {
        var s = arguments[l] != null ? arguments[l] : {};
        l % 2 ? n(Object(s), !0).forEach(function(v) {
          a(d, v, s[v]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(d, Object.getOwnPropertyDescriptors(s)) : n(Object(s)).forEach(function(v) {
          Object.defineProperty(d, v, Object.getOwnPropertyDescriptor(s, v));
        });
      }
      return d;
    }
    function g(d, l) {
      if (typeof l != "function" && l !== null)
        throw new TypeError("Super expression must either be null or a function");
      d.prototype = Object.create(l && l.prototype, {
        constructor: {
          value: d,
          writable: !0,
          configurable: !0
        }
      }), l && h(d, l);
    }
    function f(d) {
      return f = Object.setPrototypeOf ? Object.getPrototypeOf : function(s) {
        return s.__proto__ || Object.getPrototypeOf(s);
      }, f(d);
    }
    function h(d, l) {
      return h = Object.setPrototypeOf || function(v, c) {
        return v.__proto__ = c, v;
      }, h(d, l);
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
    function b(d, l, s) {
      return p() ? b = Reflect.construct : b = function(c, w, _) {
        var k = [null];
        k.push.apply(k, w);
        var M = Function.bind.apply(c, k), P = new M();
        return _ && h(P, _.prototype), P;
      }, b.apply(null, arguments);
    }
    function E(d) {
      return Function.toString.call(d).indexOf("[native code]") !== -1;
    }
    function D(d) {
      var l = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return D = function(v) {
        if (v === null || !E(v))
          return v;
        if (typeof v != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof l < "u") {
          if (l.has(v))
            return l.get(v);
          l.set(v, c);
        }
        function c() {
          return b(v, arguments, f(this).constructor);
        }
        return c.prototype = Object.create(v.prototype, {
          constructor: {
            value: c,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), h(c, v);
      }, D(d);
    }
    function T(d) {
      if (d === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return d;
    }
    function I(d, l) {
      return l && (typeof l == "object" || typeof l == "function") ? l : T(d);
    }
    function U(d) {
      var l = p();
      return function() {
        var v = f(d), c;
        if (l) {
          var w = f(this).constructor;
          c = Reflect.construct(v, arguments, w);
        } else
          c = v.apply(this, arguments);
        return I(this, c);
      };
    }
    function H(d, l) {
      for (; !Object.prototype.hasOwnProperty.call(d, l) && (d = f(d), d !== null); )
        ;
      return d;
    }
    function N(d, l, s) {
      return typeof Reflect < "u" && Reflect.get ? N = Reflect.get : N = function(c, w, _) {
        var k = H(c, w);
        if (!!k) {
          var M = Object.getOwnPropertyDescriptor(k, w);
          return M.get ? M.get.call(_) : M.value;
        }
      }, N(d, l, s || d);
    }
    function W(d, l) {
      return V(d) || ne(d, l) || le(d, l) || be();
    }
    function K(d) {
      return C(d) || Q(d) || le(d) || we();
    }
    function C(d) {
      if (Array.isArray(d))
        return fe(d);
    }
    function V(d) {
      if (Array.isArray(d))
        return d;
    }
    function Q(d) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(d))
        return Array.from(d);
    }
    function ne(d, l) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(d)))) {
        var s = [], v = !0, c = !1, w = void 0;
        try {
          for (var _ = d[Symbol.iterator](), k; !(v = (k = _.next()).done) && (s.push(k.value), !(l && s.length === l)); v = !0)
            ;
        } catch (M) {
          c = !0, w = M;
        } finally {
          try {
            !v && _.return != null && _.return();
          } finally {
            if (c)
              throw w;
          }
        }
        return s;
      }
    }
    function le(d, l) {
      if (!!d) {
        if (typeof d == "string")
          return fe(d, l);
        var s = Object.prototype.toString.call(d).slice(8, -1);
        if (s === "Object" && d.constructor && (s = d.constructor.name), s === "Map" || s === "Set")
          return Array.from(d);
        if (s === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))
          return fe(d, l);
      }
    }
    function fe(d, l) {
      (l == null || l > d.length) && (l = d.length);
      for (var s = 0, v = new Array(l); s < l; s++)
        v[s] = d[s];
      return v;
    }
    function we() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function be() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var Z = function(l, s, v) {
      var c = l.x, w = l.y, _ = v.x, k = v.y, M = {
        "+": {
          x: c + _,
          y: w + k
        },
        "-": {
          x: c - _,
          y: w - k
        },
        "*": {
          x: c * _,
          y: w * k
        },
        "/": {
          x: c / _,
          y: w / k
        }
      };
      return M[s];
    }, O = function(l) {
      return {
        x: l.left,
        y: l.top
      };
    }, B = function(l) {
      var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: l.x,
        top: l.y,
        right: l.x,
        bottom: l.y,
        width: s,
        height: s
      };
    }, z = function(l) {
      return {
        x: l,
        y: l
      };
    }, de = function(d, l, s) {
      window.addEventListener("resize", l), window.addEventListener("scroll", l), d.forEach(function(v, c) {
        s.observe(v, {
          childList: c !== 0,
          attributes: !0
        });
      });
    }, G = function(d) {
      var l = Ge(d);
      return l.x || l.y ? !0 : d instanceof HTMLDocument ? d.body ? !!(d.body.scrollTop = 1) : !!(d.documentElement.scrollTop = 1) : !!(d.scrollTop = 1);
    }, me = function(d) {
      var l = document.createElement("div");
      return l.style.position = "fixed", l.style.overflow = "hidden", l.style.pointerEvents = "none", l.style.zIndex = "999999999999999999", l.classList.add(d), l;
    }, re = function(d) {
      var l = document.createElement("div");
      return l.style.position = "absolute", d || (l.style.background = "rgba(0, 0, 255, 0.1)", l.style.border = "1px solid rgba(0, 0, 255, 0.45)", l.style.display = "none", l.style.pointerEvents = "none"), l;
    }, xt = function(d, l) {
      var s;
      return function() {
        for (var v = arguments.length, c = new Array(v), w = 0; w < v; w++)
          c[w] = arguments[w];
        var _ = function() {
          s = null, d.apply(void 0, c);
        };
        clearTimeout(s), s = setTimeout(_, l);
      };
    }, qe = function() {
      var d, l, s, v;
      return {
        y: ((d = document.body) === null || d === void 0 ? void 0 : d.scrollTop) || ((l = document.documentElement) === null || l === void 0 ? void 0 : l.scrollTop) || 0,
        x: ((s = document.body) === null || s === void 0 ? void 0 : s.scrollLeft) || ((v = document.documentElement) === null || v === void 0 ? void 0 : v.scrollLeft) || 0
      };
    }, Rt = function(d, l) {
      if (d instanceof Document)
        return {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      var s = d.getBoundingClientRect();
      return {
        top: s.top,
        left: s.left,
        bottom: s.bottom,
        right: s.right,
        width: (d.clientWidth || s.width) * l,
        height: (d.clientHeight || s.height) * l
      };
    }, Ge = function(d) {
      return !d || d instanceof Document ? qe() : {
        x: d.scrollLeft >= 0 ? d.scrollLeft : qe().x,
        y: d.scrollTop >= 0 ? d.scrollTop : qe().y
      };
    }, xr = function(d) {
      var l = d.elementRect, s = d.containerRect, v = d.tolerance, c = v === void 0 ? {
        x: 0,
        y: 0
      } : v, w = [];
      return l.top - c.y < s.top && w.push("top"), l.left - c.x < s.left && w.push("left"), l.bottom + c.y > s.bottom && w.push("bottom"), l.right + c.y > s.right && w.push("right"), w;
    }, ia = function(d) {
      var l = d.event;
      return {
        x: l.clientX,
        y: l.clientY
      };
    }, na = function(d) {
      var l = d.scrollAmount, s = d.initialPointerPos, v = d.pointerPos, c = {};
      return v.x > s.x - l.x ? (c.left = s.x - l.x, c.width = v.x - s.x + l.x) : (c.left = v.x, c.width = s.x - v.x - l.x), v.y > s.y - l.y ? (c.top = s.y - l.y, c.height = v.y - s.y + l.y) : (c.top = v.y, c.height = s.y - v.y - l.y), c;
    }, _r = function(l) {
      var s = {
        x: 0,
        y: 0
      }, v = window.getComputedStyle(l);
      if (!v.transform || v.transform === "none")
        return s;
      if (v.transform.indexOf("3d") >= 0) {
        var c = v.transform.trim().match(/matrix3d\((.*?)\)/);
        if (c && c.length) {
          var w, _ = (w = c[1]) === null || w === void 0 ? void 0 : w.split(",");
          s.x = parseInt(_[12]) || 0, s.y = parseInt(_[13]) || 0;
        }
        return s;
      } else {
        var k = v.transform.trim().match(/matrix\((.*?)\)/);
        if (k && k.length) {
          var M, P = (M = k[1]) === null || M === void 0 ? void 0 : M.split(",");
          s.x = parseInt(P[4]) || 0, s.y = parseInt(P[5]) || 0;
        }
        return s;
      }
    }, la = function(l) {
      var s = l.style.transform;
      if (!s || s.indexOf("translate") < 0)
        return _r(l);
      var v = {
        x: 0,
        y: 0
      }, c = s.trim().match(/translate[3dD]*?\(.*?\)/);
      if (c) {
        var w, _ = (w = c[0]) === null || w === void 0 ? void 0 : w.split("(");
        if (_) {
          var k, M = (k = _[1]) === null || k === void 0 ? void 0 : k.split(",");
          v.x = parseInt(M[0]) || 0, v.y = parseInt(M[1]) || 0;
        }
      }
      return !v.x && !v.x ? _r(l) : v;
    }, ca = function(l) {
      var s = l.style, v = {
        x: parseInt(s.left) || 0,
        y: parseInt(s.top) || 0
      };
      if (!v.x && !v.x) {
        var c = window.getComputedStyle(l);
        return {
          x: parseInt(c.left) || 0,
          y: parseInt(c.top) || 0
        };
      }
      return v;
    }, ua = function(d, l) {
      return l ? la(d) : ca(d);
    }, da = function(d) {
      var l = d.element, s = d.edges, v = d.elementRect, c = d.containerRect, w = d.elementPos, _ = d.useTransform;
      s.includes("top") && lt(l, {
        y: w.y + c.top - v.top,
        x: w.x
      }, _), s.includes("left") && lt(l, {
        y: w.y,
        x: w.x + c.left - v.left
      }, _), s.includes("bottom") && lt(l, {
        y: w.y + c.bottom - v.bottom,
        x: w.x
      }, _), s.includes("right") && lt(l, {
        y: w.y,
        x: w.x + c.right - v.right
      }, _);
    }, kr = function(d) {
      var l = d.computedStyle, s = d.node, v = l.position, c = v === "absolute" || v === "relative" || v === "fixed";
      !(s instanceof HTMLDocument) && !c && (s.style.position = "relative");
    }, ha = function(d) {
      var l = d.shiftKey, s = d.keyboardDragSpeed, v = d.zoom, c = d.key, w = d.dragKeys, _ = d.scrollDiff, k = d.canScroll, M = d.scrollCallback, P = {
        x: 0,
        y: 0
      }, A = l ? s * 4 * v : s * v;
      return w.left.includes(c) && (P.x = _.x || -A, !l && !_.x && k && M(["left"], s)), w.right.includes(c) && (P.x = _.x || A, !l && !_.x && k && M(["right"], s)), w.up.includes(c) && (P.y = _.y || -A, !l && !_.y && k && M(["top"], s)), w.down.includes(c) && (P.y = _.y || A, !l && !_.y && k && M(["bottom"], s)), P;
    }, fa = function(d) {
      var l = d.element, s = d.force, v = d.multiSelectionToggle, c = d.SelectedSet, w = d.hoverClassName;
      l.classList.contains(w) && !s || (c.has(l) ? v && c.delete(l) : c.add(l), l.classList.add(w));
    }, ma = function(d) {
      var l = d.element, s = d.force, v = d.SelectedSet, c = d.PrevSelectedSet, w = d.hoverClassName;
      if (!l.classList.contains(w) && !s)
        return !1;
      var _ = v.has(l), k = c.has(l);
      _ && !k ? v.delete(l) : !_ && k && v.add(l), l.classList.remove(w);
    }, Bt = function(d, l) {
      return d.left < l.right && d.right > l.left && d.top < l.bottom && d.bottom > l.top;
    }, Sr = function(d) {
      var l = d.element, s = d.posDirection, v = d.containerRect, c = d.useTransform, w = ua(l, c), _ = Z(w, "+", s);
      lt(l, _, c);
      var k = l.getBoundingClientRect(), M = xr({
        elementRect: k,
        containerRect: v
      });
      da({
        element: l,
        edges: M,
        elementRect: k,
        containerRect: v,
        elementPos: _,
        useTransform: c
      });
    }, ga = function(d, l) {
      window.removeEventListener("resize", l), window.removeEventListener("scroll", l), d.disconnect();
    }, pa = function(d, l, s) {
      if (!!l.length) {
        var v = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, c = d instanceof HTMLDocument ? v || document.body : d, w = l.includes("top") && c.scrollTop > 0, _ = l.includes("bottom") && c.scrollTop < c.scrollHeight, k = l.includes("left") && c.scrollLeft > 0, M = l.includes("right") && c.scrollLeft < c.scrollWidth;
        w && (c.scrollTop -= 1 * s), _ && (c.scrollTop += 1 * s), k && (c.scrollLeft -= 1 * s), M && (c.scrollLeft += 1 * s);
      }
    }, lt = function(d, l, s) {
      if (s) {
        var v = d.style.transform;
        d.style.transform = "translate3d(".concat(l.x, "px,").concat(l.y, "px,1px) ").concat(v.replace(/translate.*?\)/g, ""));
      } else
        d.style.left = "".concat(l.x, "px"), d.style.top = "".concat(l.y, "px");
      return d;
    }, va = function(d) {
      for (var l = d.subscribe, s = d.publish, v = d.Interaction, c = d.SelectedSet, w = {
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
          condition: function(A) {
            return A.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, _ = function() {
        var A = W(M[k], 2), R = A[0], F = A[1];
        ["pre", !1].forEach(function(oe) {
          return l(oe ? "".concat(R, ":").concat(oe) : R, function(ye) {
            return F.forEach(function(ae) {
              return (!ae.condition || ae.condition(ye)) && s(oe ? "".concat(oe).concat(ae.name) : ae.name, m({
                items: c.elements,
                isDragging: v.isDragging
              }, ye));
            });
          });
        });
      }, k = 0, M = Object.entries(w); k < M.length; k++)
        _();
    }, Je = function(d) {
      return d ? !Array.isArray(d) && (d instanceof HTMLElement || d instanceof SVGElement) ? [d] : K(d) : [];
    }, Dr = function(d, l) {
      d.style.left = "".concat(l.left, "px"), d.style.top = "".concat(l.top, "px"), d.style.width = "".concat(l.width, "px"), d.style.height = "".concat(l.height, "px");
    }, ba = /* @__PURE__ */ function() {
      function d(l) {
        var s = this, v = l.area, c = l.PS, w = l.zoom;
        r(this, d), a(this, "_modificationCallback", void 0), a(this, "_modificationObserver", void 0), a(this, "_zoom", void 0), a(this, "_node", void 0), a(this, "_parentNodes", void 0), a(this, "_computedStyle", void 0), a(this, "_computedBorder", void 0), a(this, "_rect", void 0), a(this, "setArea", function(_) {
          s._node = _, kr({
            computedStyle: s.computedStyle,
            node: s._node
          }), setTimeout(function() {
            s.PubSub.publish("Area:modified:pre", {
              item: s
            }), s.reset(), s.PubSub.publish("Area:modified", {
              item: s
            });
          });
        }), a(this, "start", function() {
          de(s.parentNodes, s._modificationCallback, s._modificationObserver);
        }), a(this, "reset", function() {
          s._computedStyle = void 0, s._rect = void 0, s._computedBorder = void 0, s._parentNodes = void 0;
        }), a(this, "stop", function() {
          ga(s._modificationObserver, s._modificationCallback), s.reset();
        }), a(this, "scroll", function(_, k) {
          var M = {
            scroll_directions: _,
            scroll_multiplier: k
          };
          s.PubSub.publish("Area:scroll:pre", M), pa(s._node, _, k), s.PubSub.publish("Area:scroll", M);
        }), this._zoom = w, this.PubSub = c, this.setArea(v), this._modificationCallback = xt(function(_) {
          s.PubSub.publish("Area:modified:pre", {
            event: _,
            item: s
          }), s.reset(), s.PubSub.publish("Area:modified", {
            event: _,
            item: s
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return i(d, [{
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
          return this._rect ? this._rect : this._rect = Rt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var s = function v(c) {
            var w, _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, k = (w = c[_]) === null || w === void 0 ? void 0 : w.parentNode;
            return k ? (c.push(k), _++, v(c, _)) : c;
          };
          return this._parentNodes = s([this.HTMLNode]), this._parentNodes;
        }
      }]), d;
    }(), ya = /* @__PURE__ */ function() {
      function d(l) {
        var s = this, v = l.DS, c = l.dragKeys, w = l.draggability, _ = l.keyboardDrag, k = l.keyboardDragSpeed, M = l.useTransform, P = l.zoom;
        r(this, d), a(this, "_useTransform", void 0), a(this, "_prevCursorPos", void 0), a(this, "_prevScrollPos", void 0), a(this, "_elements", []), a(this, "_draggability", void 0), a(this, "_dragKeys", void 0), a(this, "_dragKeysFlat", void 0), a(this, "_keyboardDrag", void 0), a(this, "_keyboardDragSpeed", void 0), a(this, "_zoom", void 0), a(this, "keyboardDrag", function(A) {
          var R = A.event, F = A.key;
          if (!(!s._keyboardDrag || !s._dragKeysFlat.includes(F) || !s.DS.SelectedSet.size || !s._draggability || s.DS.continue)) {
            var oe = {
              event: R,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            s.DS.publish(["Interaction:start:pre", "Interaction:start"], oe), s._elements = s.DS.getSelection(), s.handleZIndex(!0);
            var ye = ha({
              shiftKey: s.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: s._keyboardDragSpeed,
              zoom: s._zoom,
              key: F,
              scrollCallback: s.DS.Area.scroll,
              scrollDiff: s._scrollDiff,
              canScroll: s.DS.stores.ScrollStore.canScroll,
              dragKeys: s._dragKeys
            });
            s._elements.forEach(function(ae) {
              return Sr({
                element: ae,
                posDirection: ye,
                containerRect: s.DS.SelectorArea.rect,
                useTransform: s._useTransform
              });
            }), s.DS.publish(["Interaction:update:pre", "Interaction:update"], oe);
          }
        }), a(this, "keyboardEnd", function(A) {
          var R = A.event, F = A.key;
          if (!(!s._keyboardDrag || !s._dragKeysFlat.includes(F) || !s.DS.SelectedSet.size || !s._draggability)) {
            var oe = {
              event: R,
              isDragging: s._draggability,
              isDraggingKeyboard: !0
            };
            s.DS.publish(["Interaction:end:pre", "Interaction:end"], oe);
          }
        }), a(this, "start", function(A) {
          var R = A.isDragging, F = A.isDraggingKeyboard;
          !R || F || (s._prevCursorPos = null, s._prevScrollPos = null, s._elements = s.DS.getSelection(), s.handleZIndex(!0));
        }), a(this, "stop", function(A) {
          A != null && A.isKeyboard || (s._prevCursorPos = null, s._prevScrollPos = null, s.handleZIndex(!1), s._elements = []);
        }), a(this, "update", function(A) {
          var R = A.isDragging, F = A.isDraggingKeyboard;
          if (!(!R || !s._elements.length || F || s.DS.continue)) {
            var oe = Z(s._cursorDiff, "+", s._scrollDiff);
            s._elements.forEach(function(ye) {
              return Sr({
                element: ye,
                posDirection: oe,
                containerRect: s.DS.SelectorArea.rect,
                useTransform: s._useTransform
              });
            });
          }
        }), a(this, "handleZIndex", function(A) {
          s._elements.forEach(function(R) {
            return R.style.zIndex = "".concat((parseInt(R.style.zIndex) || 0) + A ? 9999 : -9998);
          });
        }), this.DS = v, this._useTransform = M, this._keyboardDragSpeed = k, this._keyboardDrag = _, this._zoom = P, this._draggability = w, this._dragKeys = {
          up: c.up.map(function(A) {
            return A.toLowerCase();
          }),
          down: c.down.map(function(A) {
            return A.toLowerCase();
          }),
          left: c.left.map(function(A) {
            return A.toLowerCase();
          }),
          right: c.right.map(function(A) {
            return A.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(K(this._dragKeys.up), K(this._dragKeys.down), K(this._dragKeys.left), K(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return i(d, [{
        key: "_cursorDiff",
        get: function() {
          var s = this.DS.stores.PointerStore.currentVal, v = this._prevCursorPos ? Z(s, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = s, v;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var s = this.DS.stores.ScrollStore.currentVal, v = this._prevScrollPos ? Z(s, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = s, v;
        }
      }]), d;
    }(), wa = /* @__PURE__ */ function() {
      function d(l) {
        var s = this, v = l.DS, c = l.areaElement, w = l.draggability, _ = l.immediateDrag, k = l.selectableClass;
        r(this, d), a(this, "_areaElement", void 0), a(this, "_draggability", void 0), a(this, "_immediateDrag", void 0), a(this, "_selectableClass", void 0), a(this, "isInteracting", void 0), a(this, "isDragging", void 0), a(this, "init", function() {
          return s.DS.publish("Interaction:init:pre", {});
        }), a(this, "_init", function() {
          s.stop(), s._areaElement.addEventListener("mousedown", s.start), s._areaElement.addEventListener("touchstart", s.start, {
            passive: !1
          }), s.DS.publish("Interaction:init", {});
        }), a(this, "start", function(M) {
          return s.DS.publish("Interaction:start:pre", {
            event: M,
            isDragging: s.isDragging
          });
        }), a(this, "_start", function(M) {
          M.type === "touchstart" && M.preventDefault(), s._canInteract(M) && (s.isInteracting = !0, s.isDragging = s.isDragEvent(M), s.DS.publish("Interaction:start", {
            event: M,
            isDragging: s.isDragging
          }), document.addEventListener("mouseup", s.reset), document.addEventListener("touchend", s.reset));
        }), a(this, "isDragEvent", function(M) {
          var P = M.target.closest(".".concat(s._selectableClass));
          return !s._draggability || s.DS.stores.KeyStore.isMultiSelectKeyPressed(M) || !P ? !1 : (s._immediateDrag && (s.DS.SelectedSet.size ? s.DS.SelectedSet.has(P) || (s.DS.SelectedSet.clear(), s.DS.SelectedSet.add(
            P
          )) : s.DS.SelectedSet.add(
            P
          )), !!s.DS.SelectedSet.has(P));
        }), a(this, "onClick", function(M) {
          var P = M.event;
          if (!!s._canInteract(P) && !(P.detail > 0)) {
            var A = s.DS, R = A.stores, F = R.PointerStore, oe = R.KeyStore, ye = A.SelectableSet, ae = A.SelectedSet;
            F.start(P);
            var Ze = P.target;
            !ye.has(Ze) || (oe.isMultiSelectKeyPressed(P) || ae.clear(), ae.toggle(Ze), s.reset());
          }
        }), a(this, "stop", function() {
          s.isInteracting = !1, s.isDragging = !1, s._areaElement.removeEventListener("mousedown", s.start), s._areaElement.removeEventListener("touchstart", s.start, {
            passive: !1
          }), document.removeEventListener("mouseup", s.reset), document.removeEventListener("touchend", s.reset);
        }), a(this, "update", function(M) {
          var P = M.event, A = M.scroll_directions, R = M.scroll_multiplier;
          s.isInteracting && s.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: P,
            scroll_directions: A,
            scroll_multiplier: R,
            isDragging: s.isDragging
          });
        }), a(this, "reset", function(M) {
          return s.DS.publish("Interaction:end:pre", {
            event: M,
            isDragging: s.isDragging
          });
        }), a(this, "_reset", function(M) {
          var P = s.isDragging;
          s.stop(), s.init(), s.DS.publish("Interaction:end", {
            event: M,
            isDragging: P
          });
        }), this._areaElement = c, this._draggability = w, this._immediateDrag = _, this._selectableClass = k, this.DS = v, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(M) {
          var P = M.event;
          return s.start(P);
        }), this.DS.subscribe("Interaction:start:pre", function(M) {
          var P = M.event;
          return s._start(P);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(M) {
          var P = M.event;
          return s._reset(P);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return i(d, [{
        key: "_canInteract",
        value: function(s) {
          var v = s.clientX === 0 && s.clientY === 0 && s.detail === 0 && s.target;
          return !(s.button === 2 || this.isInteracting || s.target && !this.DS.SelectorArea.isInside(
            s.target
          ) || !v && !this.DS.SelectorArea.isClicked(s));
        }
      }]), d;
    }(), xa = function d(l) {
      var s = this, v = l.DS;
      r(this, d), a(this, "subscribers", {}), a(this, "subscribe", function(c, w) {
        return Array.isArray(s.subscribers[c]) || (s.subscribers[c] = []), s.subscribers[c].push(w), s.subscribers[c].length - 1;
      }), a(this, "unsubscribe", function(c, w, _) {
        _ >= 0 ? s.subscribers[c].splice(_, 1) : w && (s.subscribers[c] = s.subscribers[c].filter(function(k) {
          return k !== w;
        }));
      }), a(this, "publish", function(c, w) {
        Array.isArray(c) ? c.forEach(function(_) {
          return s._publish(_, w);
        }) : s._publish(c, w);
      }), a(this, "_publish", function(c, w) {
        var _ = s.subscribers[c];
        !Array.isArray(_) || (c.includes(":pre") ? s._handlePrePublish(_, w) : s._handlePublish(_, w));
      }), a(this, "_handlePublish", function(c, w) {
        for (var _ = 0, k = c.length; _ < k; _++) {
          if (s.DS.stopped)
            return;
          c[_](w);
        }
      }), a(this, "_handlePrePublish", function(c, w) {
        for (var _ = c.length; _--; ) {
          if (s.DS.stopped)
            return;
          c[_](w);
        }
      }), this.DS = v;
    }, _a = /* @__PURE__ */ function(d) {
      g(s, d);
      var l = U(s);
      function s(v) {
        var c, w = v.elements, _ = v.className, k = v.hoverClassName, M = v.draggability, P = v.useTransform, A = v.DS;
        return r(this, s), c = l.call(this), a(T(c), "_initElements", void 0), a(T(c), "_className", void 0), a(T(c), "_hoverClassName", void 0), a(T(c), "_useTransform", void 0), a(T(c), "_draggability", void 0), a(T(c), "init", function() {
          return c._initElements.forEach(function(R) {
            return c.add(R);
          });
        }), a(T(c), "clear", function() {
          return c.forEach(function(R) {
            return c.delete(R);
          });
        }), a(T(c), "_onClick", function(R) {
          return c.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: R
          });
        }), a(T(c), "_onPointer", function(R) {
          return c.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: R
          });
        }), a(T(c), "addAll", function(R) {
          return R.forEach(function(F) {
            return c.add(F);
          });
        }), a(T(c), "deleteAll", function(R) {
          return R.forEach(function(F) {
            return c.delete(F);
          });
        }), c.DS = A, c._initElements = Je(w), c._className = _, c._hoverClassName = k, c._useTransform = P, c._draggability = M, c.DS.subscribe("Interaction:init", c.init), c;
      }
      return i(s, [{
        key: "add",
        value: function(c) {
          return c.classList.add(this._className), c.addEventListener("click", this._onClick), c.addEventListener("mousedown", this._onPointer), c.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && kr({
            computedStyle: window.getComputedStyle(c),
            node: c
          }), N(f(s.prototype), "add", this).call(this, c);
        }
      }, {
        key: "delete",
        value: function(c) {
          return c.classList.remove(this._className), c.classList.remove(this._hoverClassName), c.removeEventListener("click", this._onClick), c.removeEventListener("mousedown", this._onPointer), c.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), N(f(s.prototype), "delete", this).call(this, c);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), s;
    }(/* @__PURE__ */ D(Set)), ka = /* @__PURE__ */ function(d) {
      g(s, d);
      var l = U(s);
      function s(v) {
        var c, w = v.className, _ = v.DS;
        return r(this, s), c = l.call(this), a(T(c), "_className", void 0), a(T(c), "clear", function() {
          return c.forEach(function(k) {
            return c.delete(k);
          });
        }), a(T(c), "addAll", function(k) {
          return k.forEach(function(M) {
            return c.add(M);
          });
        }), a(T(c), "deleteAll", function(k) {
          return k.forEach(function(M) {
            return c.delete(M);
          });
        }), c.DS = _, c._className = w, c;
      }
      return i(s, [{
        key: "add",
        value: function(c) {
          if (!N(f(s.prototype), "has", this).call(this, c)) {
            var w = {
              items: this.elements,
              item: c
            };
            return this.DS.publish("Selected:added:pre", w), N(f(s.prototype), "add", this).call(this, c), c.classList.add(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", w), this;
          }
        }
      }, {
        key: "delete",
        value: function(c) {
          if (!!N(f(s.prototype), "has", this).call(this, c)) {
            var w = {
              items: this.elements,
              item: c
            };
            this.DS.publish("Selected:removed:pre", w);
            var _ = N(f(s.prototype), "delete", this).call(this, c);
            return c.classList.remove(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", w), _;
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
      }]), s;
    }(/* @__PURE__ */ D(Set)), Sa = /* @__PURE__ */ function() {
      function d(l) {
        var s = this, v = l.DS, c = l.hoverClassName, w = l.multiSelectToggling;
        r(this, d), a(this, "_prevSelectedSet", void 0), a(this, "_hoverClassName", void 0), a(this, "_multiSelectToggling", void 0), a(this, "start", function(_) {
          var k = _.event, M = _.isDragging;
          M || (s._storePrevious(k), s._handleInsideSelection(!0, k));
        }), a(this, "update", function(_) {
          var k = _.isDragging;
          k || s.DS.continue || s._handleInsideSelection();
        }), a(this, "_handleInsideSelection", function(_, k) {
          for (var M = s.DS, P = M.SelectableSet, A = M.SelectorArea, R = M.Selector, F = P.elements.map(function(Le) {
            return [Le, Le.getBoundingClientRect()];
          }), oe = [], ye = [], ae = 0, Ze = F.length; ae < Ze; ae++)
            !A.isInside(F[ae][0], F[ae][1]) || (Bt(F[ae][1], R.rect) ? oe.push(F[ae][0]) : ye.push(F[ae][0]));
          var _t = s.DS.stores.KeyStore.isMultiSelectKeyPressed(k) && s._multiSelectToggling;
          s.DS.continue || (oe.forEach(function(Le) {
            return fa({
              element: Le,
              force: _,
              multiSelectionToggle: _t,
              SelectedSet: s.DS.SelectedSet,
              hoverClassName: s._hoverClassName
            });
          }), ye.forEach(function(Le) {
            return ma({
              element: Le,
              force: _,
              SelectedSet: s.DS.SelectedSet,
              hoverClassName: s._hoverClassName,
              PrevSelectedSet: s._prevSelectedSet
            });
          }));
        }), this._hoverClassName = c, this._multiSelectToggling = w, this.DS = v, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return i(d, [{
        key: "_storePrevious",
        value: function(s) {
          var v = this.DS, c = v.stores.KeyStore, w = v.SelectedSet;
          c.isMultiSelectKeyPressed(s) ? this._prevSelectedSet = new Set(w) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), d;
    }(), Da = /* @__PURE__ */ function() {
      function d(l) {
        var s = this, v = l.DS, c = l.selector, w = l.selectorClass, _ = l.customStyles;
        r(this, d), a(this, "_rect", void 0), a(this, "start", function(k) {
          var M = k.isDragging;
          if (!M) {
            var P = s.DS.stores.PointerStore, A = P.initialValArea;
            Dr(s.HTMLNode, B(A, 1)), s.HTMLNode.style.display = "block", s._rect = null;
          }
        }), a(this, "stop", function() {
          s.HTMLNode.style.width = "0", s.HTMLNode.style.height = "0", s.HTMLNode.style.display = "none";
        }), a(this, "update", function(k) {
          var M = k.isDragging;
          if (!(M || s.DS.continue)) {
            var P = s.DS.stores, A = P.ScrollStore, R = P.PointerStore, F = na({
              scrollAmount: A.scrollAmount,
              initialPointerPos: R.initialValArea,
              pointerPos: R.currentValArea
            });
            Dr(s.HTMLNode, F), s._rect = null;
          }
        }), this.DS = v, this.HTMLNode = c || re(_), this.HTMLNode.classList.add(w), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return i(d, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), d;
    }(), Ca = /* @__PURE__ */ function() {
      function d(l) {
        var s = this, v = l.DS, c = l.selectorAreaClass, w = l.autoScrollSpeed, _ = l.overflowTolerance;
        r(this, d), a(this, "_autoScrollSpeed", void 0), a(this, "_scrollInterval", void 0), a(this, "_rect", void 0), a(this, "currentEdges", []), a(this, "_overflowTolerance", void 0), a(this, "start", function() {
          return s.applyElements("append");
        }), a(this, "applyElements", function() {
          var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", M = document.body ? "body" : "documentElement", P = "".concat(k, "Child");
          s.HTMLNode[P](s.DS.Selector.HTMLNode), document[M][P](s.HTMLNode);
        }), a(this, "updatePos", function() {
          s._rect = null;
          var k = s.DS.Area.rect, M = s.DS.Area.computedBorder, P = s.HTMLNode.style, A = "".concat(k.top + M.top, "px"), R = "".concat(k.left + M.left, "px"), F = "".concat(k.width, "px"), oe = "".concat(k.height, "px");
          P.top !== A && (P.top = A), P.left !== R && (P.left = R), P.width !== F && (P.width = F), P.height !== oe && (P.height = oe);
        }), a(this, "stop", function(k) {
          s.stopAutoScroll(), k && s.applyElements("remove");
        }), a(this, "startAutoScroll", function() {
          s.currentEdges = [], s._scrollInterval = setInterval(function() {
            return s.handleAutoScroll();
          }, 16);
        }), a(this, "handleAutoScroll", function() {
          if (!s.DS.continue) {
            var k = s.DS, M = k.stores.PointerStore, P = k.Area;
            s.currentEdges = xr({
              elementRect: B(M.currentVal),
              containerRect: s.rect,
              tolerance: s._overflowTolerance
            }), s.currentEdges.length && P.scroll(s.currentEdges, s._autoScrollSpeed);
          }
        }), a(this, "stopAutoScroll", function() {
          s.currentEdges = [], clearInterval(s._scrollInterval);
        }), a(this, "isInside", function(k, M) {
          return s.DS.Area.HTMLNode.contains(k) && s.DS.stores.ScrollStore.canScroll ? !0 : Bt(s.rect, M || k.getBoundingClientRect());
        }), this._autoScrollSpeed = w, this._overflowTolerance = _, this.DS = v, this.HTMLNode = me(c), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          s.updatePos(), s.stopAutoScroll();
        });
      }
      return i(d, [{
        key: "isClicked",
        value: function(s) {
          var v = this.DS.stores.PointerStore, c = s ? v.getPointerPosition(s) : v.initialVal;
          return Bt({
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
      }]), d;
    }(), Ma = /* @__PURE__ */ function() {
      function d(l) {
        var s = this, v = l.DS, c = l.multiSelectKeys, w = l.multiSelectMode;
        r(this, d), a(this, "_multiSelectMode", void 0), a(this, "_multiSelectKeys", void 0), a(this, "_currentValues", /* @__PURE__ */ new Set()), a(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), a(this, "init", function() {
          document.addEventListener("keydown", s.keydown), document.addEventListener("keyup", s.keyup), window.addEventListener("blur", s.reset);
        }), a(this, "keydown", function(_) {
          var k = _.key.toLowerCase();
          s.DS.publish("KeyStore:down:pre", {
            event: _,
            key: k
          }), s._currentValues.add(k), s.DS.publish("KeyStore:down", {
            event: _,
            key: k
          });
        }), a(this, "keyup", function(_) {
          var k = _.key.toLowerCase();
          s.DS.publish("KeyStore:up:pre", {
            event: _,
            key: k
          }), s._currentValues.delete(k), s.DS.publish("KeyStore:up", {
            event: _,
            key: k
          });
        }), a(this, "stop", function() {
          document.removeEventListener("keydown", s.keydown), document.removeEventListener("keyup", s.reset), window.removeEventListener("blur", s.reset), s.reset();
        }), a(this, "reset", function() {
          return s._currentValues.clear();
        }), this.DS = v, this._multiSelectMode = w, this._multiSelectKeys = c.map(function(_) {
          var k = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, M = k[_];
          return M ? (console.warn("[DragSelect] ".concat(_, ' is deprecated. Use "').concat(M, '" instead. Act Now!. See docs for more info')), M.toLowerCase()) : _.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return i(d, [{
        key: "isMultiSelectKeyPressed",
        value: function(s) {
          var v = this;
          return !!(this._multiSelectMode || this.currentValues.some(function(c) {
            return v._multiSelectKeys.includes(c);
          }) || s && this._multiSelectKeys.some(function(c) {
            return s[v._keyMapping[c]];
          }));
        }
      }, {
        key: "currentValues",
        get: function() {
          return Array.from(this._currentValues.values());
        }
      }]), d;
    }(), $a = /* @__PURE__ */ function() {
      function d(l) {
        var s = this, v = l.DS;
        r(this, d), a(this, "_isMouseInteraction", !1), a(this, "_initialValArea", void 0), a(this, "_currentValArea", void 0), a(this, "_lastValArea", void 0), a(this, "_initialVal", void 0), a(this, "_currentVal", void 0), a(this, "_lastVal", void 0), a(this, "_lastTouch", void 0), a(this, "init", function() {
          document.addEventListener("mousemove", s.update), document.addEventListener("touchmove", s.update, {
            passive: !1
          });
        }), a(this, "getPointerPosition", function(c) {
          return ia({
            event: s._normalizedEvent(c)
          });
        }), a(this, "update", function(c) {
          !c || (s.DS.publish("PointerStore:updated:pre", {
            event: c
          }), s.currentVal = s.getPointerPosition(c), s._isMouseInteraction && s.DS.publish("PointerStore:updated", {
            event: c
          }));
        }), a(this, "stop", function() {
          document.removeEventListener("mousemove", s.update), document.removeEventListener("touchmove", s.update, {
            passive: !1
          }), setTimeout(function() {
            return s._isMouseInteraction = !1;
          }, 100);
        }), a(this, "reset", function(c) {
          !c || (s.currentVal = s.lastVal = s.getPointerPosition(c), s.stop(), s.init());
        }), this.DS = v, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(c) {
          var w = c.event;
          return s.start(w);
        }), this.DS.subscribe("Interaction:end", function(c) {
          var w = c.event;
          return s.reset(w);
        });
      }
      return i(d, [{
        key: "start",
        value: function(s) {
          !s || (this._isMouseInteraction = !0, this.currentVal = this.initialVal = this.getPointerPosition(s));
        }
      }, {
        key: "_normalizedEvent",
        value: function(s) {
          return "touches" in s && s.type !== "touchend" && (this._lastTouch = s), "touches" in s ? this._lastTouch.touches[0] : s;
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
        set: function(s) {
          this._initialVal = s, this._initialValArea = s && Z(s, "-", Z(O(this.DS.Area.rect), "+", O(this.DS.Area.computedBorder)));
        }
      }, {
        key: "currentVal",
        get: function() {
          return this._currentVal ? this._currentVal : {
            x: 0,
            y: 0
          };
        },
        set: function(s) {
          this._currentVal = s, this._currentValArea = s && Z(s, "-", Z(O(this.DS.Area.rect), "+", O(this.DS.Area.computedBorder)));
        }
      }, {
        key: "lastVal",
        get: function() {
          return this._lastVal ? this._lastVal : {
            x: 0,
            y: 0
          };
        },
        set: function(s) {
          this._lastVal = s, this._lastValArea = s && Z(s, "-", Z(O(this.DS.Area.rect), "+", O(this.DS.Area.computedBorder)));
        }
      }]), d;
    }(), Ea = /* @__PURE__ */ function() {
      function d(l) {
        var s = this, v = l.DS, c = l.areaElement, w = l.zoom;
        r(this, d), a(this, "_initialVal", void 0), a(this, "_currentVal", void 0), a(this, "_areaElement", void 0), a(this, "_canScroll", void 0), a(this, "init", function() {
          return s._areaElement.addEventListener("scroll", s.update);
        }), a(this, "start", function() {
          s._currentVal = s._initialVal = Ge(s._areaElement), s._areaElement.addEventListener("scroll", s.update);
        }), a(this, "update", function() {
          return s._currentVal = Ge(s._areaElement);
        }), a(this, "stop", function() {
          s._areaElement.removeEventListener("scroll", s.update), s._initialVal = {
            x: 0,
            y: 0
          }, s._canScroll = null;
        }), a(this, "reset", function() {
          s.stop(), s.start();
        }), this._areaElement = c, this.DS = v, this.zoom = w, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return s.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return s.reset();
        });
      }
      return i(d, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = G(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var s = Z(this.currentVal, "-", this.initialVal), v = z(this.zoom), c = Z(Z(s, "*", v), "-", s);
          return {
            x: s.x + c.x,
            y: s.y + c.y
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
          return this._currentVal || (this._currentVal = Ge(this._areaElement)), this._currentVal;
        }
      }]), d;
    }(), Ta = /* @__PURE__ */ function() {
      function d(l) {
        var s = this, v = l.area, c = v === void 0 ? document : v, w = l.selectables, _ = w === void 0 ? [] : w, k = l.autoScrollSpeed, M = k === void 0 ? 5 : k, P = l.overflowTolerance, A = P === void 0 ? {
          x: 25,
          y: 25
        } : P, R = l.zoom, F = R === void 0 ? 1 : R, oe = l.customStyles, ye = oe === void 0 ? !1 : oe, ae = l.multiSelectMode, Ze = ae === void 0 ? !1 : ae, _t = l.multiSelectToggling, Le = _t === void 0 ? !0 : _t, Cr = l.multiSelectKeys, Aa = Cr === void 0 ? ["Control", "Shift", "Meta"] : Cr, Mr = l.selector, Oa = Mr === void 0 ? void 0 : Mr, $r = l.draggability, Ht = $r === void 0 ? !0 : $r, Er = l.immediateDrag, Ia = Er === void 0 ? !0 : Er, Tr = l.keyboardDrag, La = Tr === void 0 ? !0 : Tr, Pa = l.dragKeys, Ar = l.keyboardDragSpeed, Na = Ar === void 0 ? 10 : Ar, Or = l.useTransform, Ir = Or === void 0 ? !0 : Or, Lr = l.hoverClass, Pr = Lr === void 0 ? "ds-hover" : Lr, Nr = l.selectableClass, jr = Nr === void 0 ? "ds-selectable" : Nr, zr = l.selectedClass, ja = zr === void 0 ? "ds-selected" : zr, Vr = l.selectorClass, za = Vr === void 0 ? "ds-selector" : Vr, Rr = l.selectorAreaClass, Va = Rr === void 0 ? "ds-selector-area" : Rr, Ra = l.callback, Ba = l.onDragMove, Ha = l.onDragStartBegin, Ua = l.onDragStart, Ka = l.onElementSelect, Fa = l.onElementUnselect;
        r(this, d), a(this, "continue", !1), a(this, "start", function() {
          s.stopped = !1, s.Interaction.init();
        }), a(this, "break", function() {
          return s.continue = !0;
        }), a(this, "getSelection", function() {
          return s.SelectedSet.elements;
        }), a(this, "getSelectables", function() {
          return s.SelectableSet.elements;
        }), a(this, "getInitialCursorPosition", function() {
          return s.stores.PointerStore.initialVal;
        }), a(this, "getCurrentCursorPosition", function() {
          return s.stores.PointerStore.currentVal;
        }), a(this, "getPreviousCursorPosition", function() {
          return s.stores.PointerStore.lastVal;
        }), a(this, "getInitialCursorPositionArea", function() {
          return s.stores.PointerStore.initialValArea;
        }), a(this, "getCurrentCursorPositionArea", function() {
          return s.stores.PointerStore.currentValArea;
        }), a(this, "getPreviousCursorPositionArea", function() {
          return s.stores.PointerStore.lastValArea;
        }), a(this, "isMultiSelect", function(Ya) {
          return s.stores.KeyStore.isMultiSelectKeyPressed(Ya);
        }), a(this, "isDragging", function() {
          return s.Interaction.isDragging;
        }), this.PubSub = new xa({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: Ra,
          onDragMove: Ba,
          onDragStart: Ua,
          onDragStartBegin: Ha,
          onElementSelect: Ka,
          onElementUnselect: Fa
        }), this.stores = {
          PointerStore: new $a({
            DS: this
          }),
          ScrollStore: new Ea({
            DS: this,
            areaElement: c,
            zoom: F
          }),
          KeyStore: new Ma({
            DS: this,
            multiSelectKeys: Aa,
            multiSelectMode: Ze
          })
        }, this.Area = new ba({
          area: c,
          PS: this.PubSub,
          zoom: F
        }), this.Selector = new Da({
          DS: this,
          selector: Oa,
          selectorClass: za,
          customStyles: ye
        }), this.SelectorArea = new Ca({
          DS: this,
          selectorAreaClass: Va,
          autoScrollSpeed: M,
          overflowTolerance: A
        }), this.SelectableSet = new _a({
          elements: _,
          DS: this,
          className: jr,
          hoverClassName: Pr,
          useTransform: Ir,
          draggability: Ht
        }), this.SelectedSet = new ka({
          DS: this,
          className: ja
        }), this.Selection = new Sa({
          DS: this,
          hoverClassName: Pr,
          multiSelectToggling: Le
        }), this.Drag = new ya({
          DS: this,
          draggability: Ht,
          useTransform: Ir,
          keyboardDrag: La,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, Pa),
          zoom: F,
          keyboardDragSpeed: Na
        }), this.Interaction = new wa({
          areaElement: c,
          DS: this,
          draggability: Ht,
          immediateDrag: Ia,
          selectableClass: jr
        }), va({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return s.continue = !1;
        }), this.start();
      }
      return i(d, [{
        key: "_callbacksTemp",
        value: function(s) {
          var v = s.callback, c = s.onDragMove, w = s.onDragStart, _ = s.onDragStartBegin, k = s.onElementSelect, M = s.onElementUnselect, P = function(R, F) {
            return console.warn("[DragSelect] ".concat(R, ' is deprecated. Use DragSelect.subscribe("').concat(F, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          v && (P("callback", "callback"), this.subscribe("callback", function(A) {
            var R = A.items;
            A.item;
            var F = A.event;
            return v(R, F);
          })), c && (P("onDragMove", "dragmove"), this.subscribe("dragmove", function(A) {
            A.items, A.item;
            var R = A.event;
            return c(R);
          })), w && (P("onDragStart", "dragstart"), this.subscribe("dragstart", function(A) {
            A.items, A.item;
            var R = A.event;
            return w(R);
          })), _ && (P("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(A) {
            A.items, A.item;
            var R = A.event;
            return _(R);
          })), k && (P("onElementSelect", "elementselect"), this.subscribe("elementselect", function(A) {
            A.items;
            var R = A.item, F = A.event;
            return k(R, F);
          })), M && (P("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(A) {
            A.items;
            var R = A.item, F = A.event;
            return M(R, F);
          }));
        }
      }, {
        key: "stop",
        value: function() {
          var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          c && this.publish("callback", {
            items: this.getSelection()
          }), this.Interaction.stop(), this.Area.stop(), this.Drag.stop(), this.Selector.stop(), this.SelectorArea.stop(s), this.stores.KeyStore.stop(), this.stores.PointerStore.stop(), this.stores.ScrollStore.stop(), s && this.SelectableSet.clear(), v && this.SelectedSet.clear(), this.stopped = !0;
        }
      }, {
        key: "addSelection",
        value: function(s) {
          var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.addAll(Je(s)), c || this.addSelectables(s), v && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(s) {
          var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(Je(s)), c && this.removeSelectables(s), v && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(s) {
          var v = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, w = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return Je(s).forEach(function(_) {
            return v.SelectedSet.has(_) ? v.removeSelection(s, c, w) : v.addSelection(s, c, w);
          }), c && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "setSelection",
        value: function(s) {
          var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.clearSelection(), this.addSelection(s, v, c), this.getSelection();
        }
      }, {
        key: "clearSelection",
        value: function() {
          var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
          return this.SelectedSet.clear(), s && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "addSelectables",
        value: function(s) {
          var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = Je(s);
          return this.SelectableSet.addAll(c), v && this.SelectedSet.addAll(c), s;
        }
      }, {
        key: "setSelectables",
        value: function(s) {
          var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.removeSelectables(s, v), this.addSelectables(s, c);
        }
      }, {
        key: "removeSelectables",
        value: function(s) {
          var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return this.SelectableSet.deleteAll(Je(s)), v && this.removeSelection(s), s;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var c = v ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), w = s ? v ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : v ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return Z(c, "-", w);
        }
      }]), d;
    }();
    return Ta;
  });
})(mo);
const Us = mo.exports, go = (t, e, r, o, i) => (e = Math, r = e.log, o = 1024, i = r(t) / r(o) | 0, t / e.pow(o, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B"), po = (t, e = null) => {
  var r;
  return new Date(t * 1e3).toLocaleString((r = e != null ? e : navigator.language) != null ? r : "en-US");
}, Ks = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Fs = /* @__PURE__ */ u("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Ys = [
  Fs
], Ws = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Xs = /* @__PURE__ */ u("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), qs = [
  Xs
], Gs = {
  name: "VFSortIcon"
}, St = /* @__PURE__ */ Object.assign(Gs, {
  props: { direction: String },
  setup(t) {
    return (e, r) => (y(), S("div", null, [
      t.direction == "down" ? (y(), S("svg", Ks, Ys)) : X("", !0),
      t.direction == "up" ? (y(), S("svg", Ws, qs)) : X("", !0)
    ]));
  }
}), Js = ["onClick"], Zs = {
  name: "VFToast.vue"
}, Qs = /* @__PURE__ */ Object.assign(Zs, {
  setup(t) {
    const e = j("emitter"), { getStore: r } = j("storage"), o = L(r("full-screen", !1)), i = (g) => g == "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", a = L([]), n = (g) => {
      a.value.splice(g, 1);
    }, m = (g) => {
      let f = a.value.findIndex((h) => h.id === g);
      f !== -1 && n(f);
    };
    return e.on("vf-toast-clear", () => {
      a.value = [];
    }), e.on("vf-toast-push", (g) => {
      let f = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      g.id = f, a.value.push(g), setTimeout(() => {
        m(f);
      }, 5e3);
    }), (g, f) => (y(), S("div", {
      class: he([o.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      De(Wa, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: q(() => [
          (y(!0), S(ue, null, ke(a.value, (h, p) => (y(), S("div", {
            onClick: (b) => n(p),
            key: h,
            class: he([i(h.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, $(h.label), 11, Js))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), We = (t) => Object.entries(t).map((e) => e.map(encodeURIComponent).join("=")).join("&"), { apiUrl: ei } = Te(), Xt = (t, e) => ei.value + "?" + We({ q: "preview", adapter: t, path: e }), Ve = typeof window < "u", vo = Ve && !("onscroll" in window) || typeof navigator < "u" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), bo = Ve && "IntersectionObserver" in window, yo = Ve && "classList" in document.createElement("p"), wo = Ve && window.devicePixelRatio > 1, ti = {
  elements_selector: ".lazy",
  container: vo || Ve ? document : null,
  threshold: 300,
  thresholds: null,
  data_src: "src",
  data_srcset: "srcset",
  data_sizes: "sizes",
  data_bg: "bg",
  data_bg_hidpi: "bg-hidpi",
  data_bg_multi: "bg-multi",
  data_bg_multi_hidpi: "bg-multi-hidpi",
  data_bg_set: "bg-set",
  data_poster: "poster",
  class_applied: "applied",
  class_loading: "loading",
  class_loaded: "loaded",
  class_error: "error",
  class_entered: "entered",
  class_exited: "exited",
  unobserve_completed: !0,
  unobserve_entered: !1,
  cancel_on_exit: !0,
  callback_enter: null,
  callback_exit: null,
  callback_applied: null,
  callback_loading: null,
  callback_loaded: null,
  callback_error: null,
  callback_finish: null,
  callback_cancel: null,
  use_native: !1,
  restore_on_error: !1
}, xo = (t) => Object.assign({}, ti, t), Ur = function(t, e) {
  let r;
  const o = "LazyLoad::Initialized", i = new t(e);
  try {
    r = new CustomEvent(o, { detail: { instance: i } });
  } catch {
    r = document.createEvent("CustomEvent"), r.initCustomEvent(o, !1, !1, { instance: i });
  }
  window.dispatchEvent(r);
}, ri = (t, e) => {
  if (!!e)
    if (!e.length)
      Ur(t, e);
    else
      for (let r = 0, o; o = e[r]; r += 1)
        Ur(t, o);
}, Ie = "src", sr = "srcset", ir = "sizes", _o = "poster", bt = "llOriginalAttrs", ko = "data", nr = "loading", So = "loaded", Do = "applied", oi = "entered", lr = "error", Co = "native", Mo = "data-", $o = "ll-status", ve = (t, e) => t.getAttribute(Mo + e), ai = (t, e, r) => {
  var o = Mo + e;
  if (r === null) {
    t.removeAttribute(o);
    return;
  }
  t.setAttribute(o, r);
}, yt = (t) => ve(t, $o), Xe = (t, e) => ai(t, $o, e), Pt = (t) => Xe(t, null), cr = (t) => yt(t) === null, si = (t) => yt(t) === nr, ii = (t) => yt(t) === lr, ur = (t) => yt(t) === Co, ni = [nr, So, Do, lr], li = (t) => ni.indexOf(yt(t)) >= 0, Re = (t, e, r, o) => {
  if (!!t) {
    if (o !== void 0) {
      t(e, r, o);
      return;
    }
    if (r !== void 0) {
      t(e, r);
      return;
    }
    t(e);
  }
}, nt = (t, e) => {
  if (yo) {
    t.classList.add(e);
    return;
  }
  t.className += (t.className ? " " : "") + e;
}, Me = (t, e) => {
  if (yo) {
    t.classList.remove(e);
    return;
  }
  t.className = t.className.replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
}, ci = (t) => {
  t.llTempImage = document.createElement("IMG");
}, ui = (t) => {
  delete t.llTempImage;
}, Eo = (t) => t.llTempImage, Nt = (t, e) => {
  if (!e)
    return;
  const r = e._observer;
  !r || r.unobserve(t);
}, di = (t) => {
  t.disconnect();
}, hi = (t, e, r) => {
  e.unobserve_entered && Nt(t, r);
}, dr = (t, e) => {
  !t || (t.loadingCount += e);
}, fi = (t) => {
  !t || (t.toLoadCount -= 1);
}, To = (t, e) => {
  !t || (t.toLoadCount = e);
}, mi = (t) => t.loadingCount > 0, gi = (t) => t.toLoadCount > 0, Ao = (t) => {
  let e = [];
  for (let r = 0, o; o = t.children[r]; r += 1)
    o.tagName === "SOURCE" && e.push(o);
  return e;
}, hr = (t, e) => {
  const r = t.parentNode;
  if (!r || r.tagName !== "PICTURE")
    return;
  Ao(r).forEach(e);
}, Oo = (t, e) => {
  Ao(t).forEach(e);
}, jt = [Ie], Io = [Ie, _o], gt = [Ie, sr, ir], Lo = [ko], zt = (t) => !!t[bt], Po = (t) => t[bt], No = (t) => delete t[bt], at = (t, e) => {
  if (zt(t))
    return;
  const r = {};
  e.forEach((o) => {
    r[o] = t.getAttribute(o);
  }), t[bt] = r;
}, pi = (t) => {
  zt(t) || (t[bt] = { backgroundImage: t.style.backgroundImage });
}, vi = (t, e, r) => {
  if (!r) {
    t.removeAttribute(e);
    return;
  }
  t.setAttribute(e, r);
}, Fe = (t, e) => {
  if (!zt(t))
    return;
  const r = Po(t);
  e.forEach((o) => {
    vi(t, o, r[o]);
  });
}, bi = (t) => {
  if (!zt(t))
    return;
  const e = Po(t);
  t.style.backgroundImage = e.backgroundImage;
}, jo = (t, e, r) => {
  nt(t, e.class_applied), Xe(t, Do), r && (e.unobserve_completed && Nt(t, e), Re(e.callback_applied, t, r));
}, zo = (t, e, r) => {
  nt(t, e.class_loading), Xe(t, nr), r && (dr(r, 1), Re(e.callback_loading, t, r));
}, ze = (t, e, r) => {
  !r || t.setAttribute(e, r);
}, Kr = (t, e) => {
  ze(t, ir, ve(t, e.data_sizes)), ze(t, sr, ve(t, e.data_srcset)), ze(t, Ie, ve(t, e.data_src));
}, yi = (t, e) => {
  hr(t, (r) => {
    at(r, gt), Kr(r, e);
  }), at(t, gt), Kr(t, e);
}, wi = (t, e) => {
  at(t, jt), ze(t, Ie, ve(t, e.data_src));
}, xi = (t, e) => {
  Oo(t, (r) => {
    at(r, jt), ze(r, Ie, ve(r, e.data_src));
  }), at(t, Io), ze(t, _o, ve(t, e.data_poster)), ze(t, Ie, ve(t, e.data_src)), t.load();
}, _i = (t, e) => {
  at(t, Lo), ze(t, ko, ve(t, e.data_src));
}, ki = (t, e, r) => {
  const o = ve(t, e.data_bg), i = ve(t, e.data_bg_hidpi), a = wo && i ? i : o;
  !a || (t.style.backgroundImage = `url("${a}")`, Eo(t).setAttribute(Ie, a), zo(t, e, r));
}, Si = (t, e, r) => {
  const o = ve(t, e.data_bg_multi), i = ve(t, e.data_bg_multi_hidpi), a = wo && i ? i : o;
  !a || (t.style.backgroundImage = a, jo(t, e, r));
}, Di = (t, e, r) => {
  const o = ve(t, e.data_bg_set);
  if (!o)
    return;
  const i = o.split("|");
  let a = i.map((n) => `image-set(${n})`);
  t.style.backgroundImage = a.join(), t.style.backgroundImage === "" && (a = i.map((n) => `-webkit-image-set(${n})`), t.style.backgroundImage = a.join()), jo(t, e, r);
}, Vo = {
  IMG: yi,
  IFRAME: wi,
  VIDEO: xi,
  OBJECT: _i
}, Ci = (t, e) => {
  const r = Vo[t.tagName];
  !r || r(t, e);
}, Mi = (t, e, r) => {
  const o = Vo[t.tagName];
  !o || (o(t, e), zo(t, e, r));
}, $i = ["IMG", "IFRAME", "VIDEO", "OBJECT"], Ei = (t) => $i.indexOf(t.tagName) > -1, Ro = (t, e) => {
  e && !mi(e) && !gi(e) && Re(t.callback_finish, e);
}, Fr = (t, e, r) => {
  t.addEventListener(e, r), t.llEvLisnrs[e] = r;
}, Ti = (t, e, r) => {
  t.removeEventListener(e, r);
}, fr = (t) => !!t.llEvLisnrs, Ai = (t, e, r) => {
  fr(t) || (t.llEvLisnrs = {});
  const o = t.tagName === "VIDEO" ? "loadeddata" : "load";
  Fr(t, o, e), Fr(t, "error", r);
}, qt = (t) => {
  if (!fr(t))
    return;
  const e = t.llEvLisnrs;
  for (let r in e) {
    const o = e[r];
    Ti(t, r, o);
  }
  delete t.llEvLisnrs;
}, Bo = (t, e, r) => {
  ui(t), dr(r, -1), fi(r), Me(t, e.class_loading), e.unobserve_completed && Nt(t, r);
}, Oi = (t, e, r, o) => {
  const i = ur(e);
  Bo(e, r, o), nt(e, r.class_loaded), Xe(e, So), Re(r.callback_loaded, e, o), i || Ro(r, o);
}, Ii = (t, e, r, o) => {
  const i = ur(e);
  Bo(e, r, o), nt(e, r.class_error), Xe(e, lr), Re(r.callback_error, e, o), r.restore_on_error && Fe(e, gt), i || Ro(r, o);
}, mr = (t, e, r) => {
  const o = Eo(t) || t;
  if (fr(o))
    return;
  Ai(o, (n) => {
    Oi(n, t, e, r), qt(o);
  }, (n) => {
    Ii(n, t, e, r), qt(o);
  });
}, Li = (t, e, r) => {
  ci(t), mr(t, e, r), pi(t), ki(t, e, r), Si(t, e, r), Di(t, e, r);
}, Pi = (t, e, r) => {
  mr(t, e, r), Mi(t, e, r);
}, gr = (t, e, r) => {
  Ei(t) ? Pi(t, e, r) : Li(t, e, r);
}, Ni = (t, e, r) => {
  t.setAttribute("loading", "lazy"), mr(t, e, r), Ci(t, e), Xe(t, Co);
}, Yr = (t) => {
  t.removeAttribute(Ie), t.removeAttribute(sr), t.removeAttribute(ir);
}, ji = (t) => {
  hr(t, (e) => {
    Yr(e);
  }), Yr(t);
}, Ho = (t) => {
  hr(t, (e) => {
    Fe(e, gt);
  }), Fe(t, gt);
}, zi = (t) => {
  Oo(t, (e) => {
    Fe(e, jt);
  }), Fe(t, Io), t.load();
}, Vi = (t) => {
  Fe(t, jt);
}, Ri = (t) => {
  Fe(t, Lo);
}, Bi = {
  IMG: Ho,
  IFRAME: Vi,
  VIDEO: zi,
  OBJECT: Ri
}, Hi = (t) => {
  const e = Bi[t.tagName];
  if (!e) {
    bi(t);
    return;
  }
  e(t);
}, Ui = (t, e) => {
  cr(t) || ur(t) || (Me(t, e.class_entered), Me(t, e.class_exited), Me(t, e.class_applied), Me(t, e.class_loading), Me(t, e.class_loaded), Me(t, e.class_error));
}, Ki = (t, e) => {
  Hi(t), Ui(t, e), Pt(t), No(t);
}, Fi = (t, e, r, o) => {
  !r.cancel_on_exit || !si(t) || t.tagName === "IMG" && (qt(t), ji(t), Ho(t), Me(t, r.class_loading), dr(o, -1), Pt(t), Re(r.callback_cancel, t, e, o));
}, Yi = (t, e, r, o) => {
  const i = li(t);
  Xe(t, oi), nt(t, r.class_entered), Me(t, r.class_exited), hi(t, r, o), Re(r.callback_enter, t, e, o), !i && gr(t, r, o);
}, Wi = (t, e, r, o) => {
  cr(t) || (nt(t, r.class_exited), Fi(t, e, r, o), Re(r.callback_exit, t, e, o));
}, Xi = ["IMG", "IFRAME", "VIDEO"], Uo = (t) => t.use_native && "loading" in HTMLImageElement.prototype, qi = (t, e, r) => {
  t.forEach((o) => {
    Xi.indexOf(o.tagName) !== -1 && Ni(o, e, r);
  }), To(r, 0);
}, Gi = (t) => t.isIntersecting || t.intersectionRatio > 0, Ji = (t) => ({
  root: t.container === document ? null : t.container,
  rootMargin: t.thresholds || t.threshold + "px"
}), Zi = (t, e, r) => {
  t.forEach(
    (o) => Gi(o) ? Yi(o.target, o, e, r) : Wi(o.target, o, e, r)
  );
}, Qi = (t, e) => {
  e.forEach((r) => {
    t.observe(r);
  });
}, en = (t, e) => {
  di(t), Qi(t, e);
}, tn = (t, e) => {
  !bo || Uo(t) || (e._observer = new IntersectionObserver((r) => {
    Zi(r, t, e);
  }, Ji(t)));
}, Ko = (t) => Array.prototype.slice.call(t), At = (t) => t.container.querySelectorAll(t.elements_selector), rn = (t) => Ko(t).filter(cr), on = (t) => ii(t), an = (t) => Ko(t).filter(on), Wr = (t, e) => rn(t || At(e)), sn = (t, e) => {
  an(At(t)).forEach((o) => {
    Me(o, t.class_error), Pt(o);
  }), e.update();
}, nn = (t, e) => {
  !Ve || (e._onlineHandler = () => {
    sn(t, e);
  }, window.addEventListener("online", e._onlineHandler));
}, ln = (t) => {
  !Ve || window.removeEventListener("online", t._onlineHandler);
}, wt = function(t, e) {
  const r = xo(t);
  this._settings = r, this.loadingCount = 0, tn(r, this), nn(r, this), this.update(e);
};
wt.prototype = {
  update: function(t) {
    const e = this._settings, r = Wr(t, e);
    if (To(this, r.length), vo || !bo) {
      this.loadAll(r);
      return;
    }
    if (Uo(e)) {
      qi(r, e, this);
      return;
    }
    en(this._observer, r);
  },
  destroy: function() {
    this._observer && this._observer.disconnect(), ln(this), At(this._settings).forEach((t) => {
      No(t);
    }), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, delete this.toLoadCount;
  },
  loadAll: function(t) {
    const e = this._settings;
    Wr(t, e).forEach((o) => {
      Nt(o, this), gr(o, e, this);
    });
  },
  restoreAll: function() {
    const t = this._settings;
    At(t).forEach((e) => {
      Ki(e, t);
    });
  }
};
wt.load = (t, e) => {
  const r = xo(e);
  gr(t, r);
};
wt.resetStatus = (t) => {
  Pt(t);
};
Ve && ri(wt, window.lazyLoadOptions);
const cn = { class: "relative flex-auto flex flex-col overflow-hidden" }, un = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 border-gray-200 dark:border-gray-700 text-xs select-none"
}, dn = { class: "absolute" }, hn = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), fn = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, mn = ["onDblclick", "onContextmenu", "data-type", "data-item", "data-index"], gn = { class: "grid grid-cols-12 items-center" }, pn = { class: "flex col-span-7 items-center" }, vn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bn = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), yn = [
  bn
], wn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xn = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), _n = [
  xn
], kn = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Sn = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Dn = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Cn = { class: "grid grid-cols-12 items-center" }, Mn = { class: "flex col-span-7 items-center" }, $n = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, En = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Tn = [
  En
], An = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, On = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), In = [
  On
], Ln = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Pn = { class: "col-span-2 text-center" }, Nn = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, jn = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], zn = { class: "relative" }, Vn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Rn = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Bn = [
  Rn
], Hn = ["data-src", "alt"], Un = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kn = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Fn = [
  Kn
], Yn = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, Wn = { class: "break-all" }, Xn = {
  name: "VFExplorer"
}, qn = /* @__PURE__ */ Object.assign(Xn, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(t) {
    const e = t, r = j("emitter"), { setStore: o, getStore: i } = j("storage"), a = j("adapter"), n = (O) => O == null ? void 0 : O.substring(0, 3), m = (O) => O.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), g = L(null), f = L(null), h = L(0), p = L(null), { t: b } = j("i18n"), E = Math.floor(Math.random() * 2 ** 32), D = L(i("full-screen", !1)), T = new wt();
    r.on("vf-fullscreen-toggle", () => {
      g.value.style.height = null, D.value = !D.value, o("full-screen", D.value);
    });
    const I = L("");
    r.on("vf-search-query", ({ newQuery: O }) => {
      I.value = O, O ? r.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.data.adapter,
          path: e.data.dirname,
          filter: O
        },
        onSuccess: (B) => {
          B.files.length || r.emit("vf-toast-push", { label: b("No search result found.") });
        }
      }) : r.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
    });
    let U = null;
    const H = () => {
      U && clearTimeout(U);
    }, N = L(!0), W = (O) => {
      O.touches.length > 1 && (N.value ? (p.value.stop(), r.emit("vf-toast-push", { label: b("Drag&Drop: off") })) : (p.value.start(), r.emit("vf-toast-push", { label: b("Drag&Drop: on") }), r.emit("vf-explorer-update")), N.value = !N.value);
    }, K = (O) => {
      U = setTimeout(() => {
        const B = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: O.target.getBoundingClientRect().x,
          clientY: O.target.getBoundingClientRect().y
        });
        O.target.dispatchEvent(B);
      }, 500);
    }, C = (O) => {
      O.type == "dir" ? (r.emit("vf-search-exit"), r.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: O.path } })) : r.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: O });
    }, V = $t({ active: !1, column: "", order: "" }), Q = (O = !0) => {
      let B = [...e.data.files], z = V.column, de = V.order == "asc" ? 1 : -1;
      if (!O)
        return B;
      const G = (me, re) => typeof me == "string" && typeof re == "string" ? me.toLowerCase().localeCompare(re.toLowerCase()) : me < re ? -1 : me > re ? 1 : 0;
      return V.active && (B = B.slice().sort((me, re) => G(me[z], re[z]) * de)), B;
    }, ne = (O) => {
      V.active && V.column == O ? (V.active = V.order == "asc", V.column = O, V.order = "desc") : (V.active = !0, V.column = O, V.order = "asc");
    }, le = () => p.value.getSelection().map((O) => JSON.parse(O.dataset.item)), fe = (O, B) => {
      if (O.altKey || O.ctrlKey || O.metaKey)
        return O.preventDefault(), !1;
      O.dataTransfer.setDragImage(f.value, 0, 15), O.dataTransfer.effectAllowed = "all", O.dataTransfer.dropEffect = "copy", O.dataTransfer.setData("items", JSON.stringify(le()));
    }, we = (O, B) => {
      O.preventDefault();
      let z = JSON.parse(O.dataTransfer.getData("items"));
      if (z.find((de) => de.storage != a.value)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      r.emit("vf-modal-show", { type: "move", items: { from: z, to: B } });
    }, be = (O, B) => {
      O.preventDefault(), !B || B.type !== "dir" || p.value.getSelection().find((z) => z == O.currentTarget) ? (O.dataTransfer.dropEffect = "none", O.dataTransfer.effectAllowed = "none") : O.dataTransfer.dropEffect = "copy";
    };
    return Ce(() => {
      p.value = new Us({
        area: g.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), r.on("vf-explorer-update", () => Lt(() => {
        p.value.clearSelection(), p.value.setSelectables(document.getElementsByClassName("vf-item-" + E));
      })), p.value.subscribe("predragstart", ({ event: O, isDragging: B }) => {
        if (B)
          h.value = p.value.getSelection().length, p.value.break();
        else {
          const z = O.target.offsetWidth - O.offsetX, de = O.target.offsetHeight - O.offsetY;
          z < 15 && de < 15 && (p.value.clearSelection(), p.value.break());
        }
      }), p.value.subscribe("predragmove", ({ isDragging: O }) => {
        O && p.value.break();
      }), p.value.subscribe("callback", ({ items: O, event: B, isDragging: z }) => {
        r.emit("vf-nodes-selected", le()), h.value = p.value.getSelection().length;
      });
    }), Xa(() => {
      p.value.Area.reset(), p.value.SelectorArea.updatePos(), T.update();
    }), Ce(() => {
      It(() => e.view, () => r.emit("vf-explorer-update"));
    }), (O, B) => (y(), S("div", cn, [
      t.view == "list" || I.value.length ? (y(), S("div", un, [
        u("div", {
          onClick: B[0] || (B[0] = (z) => ne("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          ie($(x(b)("Name")) + " ", 1),
          _e(De(St, {
            direction: V.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [kt, V.active && V.column == "basename"]
          ])
        ]),
        I.value.length ? X("", !0) : (y(), S("div", {
          key: 0,
          onClick: B[1] || (B[1] = (z) => ne("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          ie($(x(b)("Size")) + " ", 1),
          _e(De(St, {
            direction: V.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [kt, V.active && V.column == "file_size"]
          ])
        ])),
        I.value.length ? X("", !0) : (y(), S("div", {
          key: 1,
          onClick: B[2] || (B[2] = (z) => ne("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          ie($(x(b)("Date")) + " ", 1),
          _e(De(St, {
            direction: V.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [kt, V.active && V.column == "last_modified"]
          ])
        ])),
        I.value.length ? (y(), S("div", {
          key: 2,
          onClick: B[3] || (B[3] = (z) => ne("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          ie($(x(b)("Filepath")) + " ", 1),
          _e(De(St, {
            direction: V.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [kt, V.active && V.column == "path"]
          ])
        ])) : X("", !0)
      ])) : X("", !0),
      u("div", dn, [
        u("div", {
          ref_key: "dragImage",
          ref: f,
          class: "absolute -z-50 -top-96"
        }, [
          hn,
          u("div", fn, $(h.value), 1)
        ], 512)
      ]),
      u("div", {
        onTouchstart: W,
        onContextmenu: B[10] || (B[10] = Ke((z) => x(r).emit("vf-contextmenu-show", { event: z, area: g.value, items: le() }), ["self", "prevent"])),
        class: he([D.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: g
      }, [
        I.value.length ? (y(!0), S(ue, { key: 0 }, ke(Q(), (z, de) => (y(), S("div", {
          onDblclick: (G) => C(z),
          onTouchstart: B[4] || (B[4] = (G) => K(G)),
          onTouchend: B[5] || (B[5] = (G) => H()),
          onContextmenu: Ke((G) => x(r).emit("vf-contextmenu-show", { event: G, area: g.value, items: le(), target: z }), ["prevent"]),
          class: he(["vf-item-" + x(E), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": z.type,
          "data-item": JSON.stringify(z),
          "data-index": de
        }, [
          u("div", gn, [
            u("div", pn, [
              z.type == "dir" ? (y(), S("svg", vn, yn)) : (y(), S("svg", wn, _n)),
              u("span", kn, $(z.basename), 1)
            ]),
            u("div", Sn, $(z.path), 1)
          ])
        ], 42, mn))), 256)) : X("", !0),
        t.view == "list" && !I.value.length ? (y(!0), S(ue, { key: 1 }, ke(Q(), (z, de) => (y(), S("div", {
          draggable: "true",
          onDblclick: (G) => C(z),
          onTouchstart: B[6] || (B[6] = (G) => K(G)),
          onTouchend: B[7] || (B[7] = (G) => H()),
          onContextmenu: Ke((G) => x(r).emit("vf-contextmenu-show", { event: G, area: g.value, items: le(), target: z }), ["prevent"]),
          onDragstart: (G) => fe(G),
          onDragover: (G) => be(G, z),
          onDrop: (G) => we(G, z),
          class: he(["vf-item-" + x(E), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": z.type,
          "data-item": JSON.stringify(z),
          "data-index": de
        }, [
          u("div", Cn, [
            u("div", Mn, [
              z.type == "dir" ? (y(), S("svg", $n, Tn)) : (y(), S("svg", An, In)),
              u("span", Ln, $(z.basename), 1)
            ]),
            u("div", Pn, $(z.file_size ? x(go)(z.file_size) : ""), 1),
            u("div", Nn, $(x(po)(z.last_modified)), 1)
          ])
        ], 42, Dn))), 256)) : X("", !0),
        t.view == "grid" && !I.value.length ? (y(!0), S(ue, { key: 2 }, ke(Q(!1), (z, de) => {
          var G, me;
          return y(), S("div", {
            draggable: "true",
            onDblclick: (re) => C(z),
            onTouchstart: B[8] || (B[8] = (re) => K(re)),
            onTouchend: B[9] || (B[9] = (re) => H()),
            onContextmenu: Ke((re) => x(r).emit("vf-contextmenu-show", { event: re, area: g.value, items: le(), target: z }), ["prevent"]),
            onDragstart: (re) => fe(re),
            onDragover: (re) => be(re, z),
            onDrop: (re) => we(re, z),
            class: he(["vf-item-" + x(E), "border border-transparent hover:bg-neutral-50 m-1 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 text-center justify-center select-none"]),
            "data-type": z.type,
            "data-item": JSON.stringify(z),
            "data-index": de
          }, [
            u("div", null, [
              u("div", zn, [
                z.type == "dir" ? (y(), S("svg", Vn, Bn)) : ((G = z.mime_type) != null ? G : "").startsWith("image") ? (y(), S("img", {
                  key: 1,
                  class: "lazy h-10 md:h-12 m-auto",
                  "data-src": x(Xt)(x(a).value, z.path),
                  alt: z.basename
                }, null, 8, Hn)) : (y(), S("svg", Un, Fn)),
                !((me = z.mime_type) != null ? me : "").startsWith("image") && z.type != "dir" ? (y(), S("div", Yn, $(n(z.extension)), 1)) : X("", !0)
              ]),
              u("span", Wn, $(m(z.basename)), 1)
            ])
          ], 42, jn);
        }), 256)) : X("", !0)
      ], 34),
      De(Qs)
    ]));
  }
}), Gn = "1.1.18", Jn = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Zn = { class: "flex leading-5 items-center" }, Qn = ["aria-label"], el = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
  })
], -1), tl = [
  el
], rl = ["value"], ol = { class: "ml-3" }, al = { key: 0 }, sl = { class: "ml-1" }, il = { class: "flex leading-5 items-center" }, nl = {
  value: "",
  disabled: ""
}, ll = /* @__PURE__ */ qa('<option value="en">English</option><option value="fr">French</option><option value="fa">Persian</option><option value="ru">Russian</option><option value="tr">Turkish</option>', 5), cl = ["aria-label"], ul = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), dl = [
  ul
], hl = {
  name: "VFStatusbar"
}, fl = /* @__PURE__ */ Object.assign(hl, {
  props: {
    data: Object
  },
  setup(t) {
    const e = j("emitter"), { getStore: r, setStore: o } = j("storage"), i = L(0), a = j("adapter"), { t: n, changeLocale: m } = j("i18n"), g = L(r("locale", "")), f = () => {
      e.emit("vf-search-exit"), e.emit("vf-fetch", { params: { q: "index", adapter: a.value } }), o("adapter", a.value);
    };
    e.on("vf-nodes-selected", (p) => {
      i.value = p.length;
    });
    const h = L("");
    return e.on("vf-search-query", ({ newQuery: p }) => {
      h.value = p;
    }), (p, b) => (y(), S("div", Jn, [
      u("div", Zn, [
        u("div", {
          class: "mx-2",
          "aria-label": x(n)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, tl, 8, Qn),
        _e(u("select", {
          "onUpdate:modelValue": b[0] || (b[0] = (E) => ho(a) ? a.value = E : null),
          onChange: f,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (y(!0), S(ue, null, ke(t.data.storages, (E) => (y(), S("option", { value: E }, $(E), 9, rl))), 256))
        ], 544), [
          [Br, x(a)]
        ]),
        u("div", ol, [
          h.value.length ? (y(), S("span", al, $(t.data.files.length) + " items found. ", 1)) : X("", !0),
          u("span", sl, $(i.value > 0 ? i.value + " " + x(n)("item(s) selected.") : ""), 1)
        ])
      ]),
      u("div", il, [
        _e(u("select", {
          "onUpdate:modelValue": b[1] || (b[1] = (E) => g.value = E),
          onChange: b[2] || (b[2] = (E) => x(m)(E.target.value)),
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          u("option", nl, $(x(n)("Language")), 1),
          ll
        ], 544), [
          [Br, g.value]
        ]),
        u("span", {
          class: "mr-1",
          "aria-label": x(n)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: b[3] || (b[3] = (E) => x(e).emit("vf-modal-show", { type: "message", title: "Vuefinder " + x(Gn), message: x(n)("Vuefinder is a file manager component for vue 3.") }))
        }, dl, 8, cl)
      ])
    ]));
  }
}), ml = (t, e = 0, r = !1) => {
  let o;
  return (...i) => {
    r && !o && t(...i), clearTimeout(o), o = setTimeout(() => {
      t(...i);
    }, e);
  };
}, gl = (t, e, r) => {
  const o = L(t);
  return Ga((a, n) => ({
    get() {
      return a(), o.value;
    },
    set: ml(
      (m) => {
        o.value = m, n();
      },
      e,
      r
    )
  }));
}, pl = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, vl = ["aria-label"], bl = /* @__PURE__ */ u("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), yl = [
  bl
], wl = ["aria-label"], xl = /* @__PURE__ */ u("path", { d: "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" }, null, -1), _l = [
  xl
], kl = {
  key: 1,
  "aria-label": "Cancel",
  "data-microtip-position": "bottom-right",
  role: "tooltip"
}, Sl = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), Dl = [
  Sl
], Cl = ["onClick"], Ml = /* @__PURE__ */ u("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), $l = [
  Ml
], El = { class: "flex leading-5" }, Tl = /* @__PURE__ */ u("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Al = ["title", "onClick"], Ol = {
  key: 0,
  class: "animate-spin p-1 h-6 w-6 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, Il = /* @__PURE__ */ u("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), Ll = /* @__PURE__ */ u("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), Pl = [
  Il,
  Ll
], Nl = {
  key: 3,
  class: "relative flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, jl = /* @__PURE__ */ u("svg", {
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
  })
], -1), zl = /* @__PURE__ */ u("div", { class: "w-full" }, null, -1), Vl = ["onKeydown", "placeholder"], Rl = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), Bl = [
  Rl
], Hl = {
  name: "VFBreadcrumb"
}, Ul = /* @__PURE__ */ Object.assign(Hl, {
  props: {
    data: Object
  },
  setup(t) {
    const e = t, r = j("emitter");
    j("storage");
    const o = j("adapter"), i = L(null), a = L([]), n = L(!1), m = L(null), { t: g } = j("i18n"), f = j("loadingState");
    r.on("vf-explorer-update", () => {
      var W;
      let H = [], N = [];
      i.value = (W = e.data.dirname) != null ? W : o.value + "://", i.value.length == 0 && (a.value = []), i.value.replace(o.value + "://", "").split("/").forEach(function(K) {
        H.push(K), H.join("/") != "" && N.push({
          basename: K,
          name: K,
          path: o.value + "://" + H.join("/"),
          type: "dir"
        });
      }), N.length > 4 && (N = N.slice(-5), N[0].name = ".."), a.value = N;
    });
    const h = () => {
      n.value = !1, b.value = "";
    };
    r.on("vf-search-exit", () => {
      h();
    });
    const p = () => {
      n.value = !0, Lt(() => m.value.focus());
    }, b = gl("", 400), E = () => f.value;
    It(b, (H) => {
      r.emit("vf-toast-clear"), r.emit("vf-search-query", { newQuery: H });
    });
    const D = () => a.value.length && !n.value, T = (H) => {
      var W;
      H.preventDefault();
      let N = JSON.parse(H.dataTransfer.getData("items"));
      if (N.find((K) => K.storage != o.value)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      r.emit("vf-modal-show", {
        type: "move",
        items: { from: N, to: (W = a.value[a.value.length - 2]) != null ? W : { path: o.value + "://" } }
      });
    }, I = (H) => {
      H.preventDefault(), D() ? H.dataTransfer.dropEffect = "copy" : (H.dataTransfer.dropEffect = "none", H.dataTransfer.effectAllowed = "none");
    }, U = () => {
      b.value == "" && h();
    };
    return (H, N) => (y(), S("div", pl, [
      u("span", {
        "aria-label": x(g)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (y(), S("svg", {
          onDragover: N[0] || (N[0] = (W) => I(W)),
          onDrop: N[1] || (N[1] = (W) => T(W)),
          onClick: N[2] || (N[2] = (W) => {
            var K, C;
            return !D() || x(r).emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter, path: (C = (K = a.value[a.value.length - 2]) == null ? void 0 : K.path) != null ? C : x(o) + "://" } });
          }),
          class: he(["h-6 w-6 p-0.5 rounded", D() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, yl, 34))
      ], 8, vl),
      E() ? (y(), S("span", kl, [
        (y(), S("svg", {
          onClick: N[4] || (N[4] = (W) => x(r).emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, Dl))
      ])) : (y(), S("span", {
        key: 0,
        "aria-label": x(g)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (y(), S("svg", {
          onClick: N[3] || (N[3] = (W) => {
            x(r).emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter, path: t.data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, _l))
      ], 8, wl)),
      n.value ? (y(), S("div", Nl, [
        jl,
        zl,
        _e(u("input", {
          ref_key: "searchInput",
          ref: m,
          onKeydown: st(h, ["esc"]),
          onBlur: U,
          "onUpdate:modelValue": N[6] || (N[6] = (W) => ho(b) ? b.value = W : null),
          placeholder: x(g)("Search anything.."),
          class: "absolute ml-4 pt-1 pb-0 px-2 border-0 ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, Vl), [
          [it, x(b)]
        ]),
        (y(), S("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: h,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, Bl))
      ])) : (y(), S("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Ke(p, ["self"])
      }, [
        (y(), S("svg", {
          onClick: N[5] || (N[5] = (W) => x(r).emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, $l)),
        u("div", El, [
          (y(!0), S(ue, null, ke(a.value, (W, K) => (y(), S("div", { key: K }, [
            Tl,
            u("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: W.basename,
              onClick: (C) => x(r).emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter, path: W.path } })
            }, $(W.name), 9, Al)
          ]))), 128))
        ]),
        E() ? (y(), S("svg", Ol, Pl)) : X("", !0)
      ], 8, Cl))
    ]));
  }
}), Kl = ["onClick"], Fl = /* @__PURE__ */ u("span", { class: "px-1" }, null, -1), Yl = {
  name: "VFContextMenu"
}, Wl = /* @__PURE__ */ Object.assign(Yl, {
  props: {
    current: Object
  },
  setup(t) {
    const e = t, r = j("emitter"), o = L(null), { apiUrl: i } = Te(), a = $t({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), n = L([]);
    r.on("vf-context-selected", (b) => {
      n.value = b;
    });
    const { t: m } = j("i18n"), g = {
      newfolder: {
        title: () => m("New Folder"),
        action: () => {
          r.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: () => m("Delete"),
        action: () => {
          r.emit("vf-modal-show", { type: "delete", items: n });
        }
      },
      refresh: {
        title: () => m("Refresh"),
        action: () => {
          r.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
        }
      },
      preview: {
        title: () => m("Preview"),
        action: () => {
          r.emit("vf-modal-show", { type: "preview", adapter: e.current.adapter, item: n.value[0] });
        }
      },
      open: {
        title: () => m("Open"),
        action: () => {
          r.emit("vf-search-exit"), r.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: n.value[0].path } });
        }
      },
      openDir: {
        title: () => m("Open containing folder"),
        action: () => {
          r.emit("vf-search-exit"), r.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: n.value[0].dir } });
        }
      },
      download: {
        title: () => m("Download"),
        action: () => {
          const b = i.value + "?" + We({ q: "download", adapter: e.current.adapter, path: n.value[0].path });
          r.emit("vf-download", b);
        }
      },
      archive: {
        title: () => m("Archive"),
        action: () => {
          r.emit("vf-modal-show", { type: "archive", items: n });
        }
      },
      unarchive: {
        title: () => m("Unarchive"),
        action: () => {
          r.emit("vf-modal-show", { type: "unarchive", items: n });
        }
      },
      rename: {
        title: () => m("Rename"),
        action: () => {
          r.emit("vf-modal-show", { type: "rename", items: n });
        }
      }
    }, f = (b) => {
      r.emit("vf-contextmenu-hide"), b.action();
    }, h = L("");
    r.on("vf-search-query", ({ newQuery: b }) => {
      h.value = b;
    }), r.on("vf-contextmenu-show", ({ event: b, area: E, items: D, target: T = null }) => {
      if (a.items = [], h.value)
        if (T)
          a.items.push(g.openDir), r.emit("vf-context-selected", [T]);
        else
          return;
      else
        !T && !h.value ? (a.items.push(g.refresh), a.items.push(g.newfolder), r.emit("vf-context-selected", [])) : D.length > 1 && D.some((I) => I.path === T.path) ? (a.items.push(g.refresh), a.items.push(g.archive), a.items.push(g.delete), r.emit("vf-context-selected", D)) : (T.type == "dir" ? a.items.push(g.open) : (a.items.push(g.preview), a.items.push(g.download)), a.items.push(g.rename), T.mime_type == "application/zip" ? a.items.push(g.unarchive) : a.items.push(g.archive), a.items.push(g.delete), r.emit("vf-context-selected", [T]));
      p(b, E);
    }), r.on("vf-contextmenu-hide", () => {
      a.active = !1;
    });
    const p = (b, E) => {
      a.active = !0, Lt(() => {
        let D = E.getBoundingClientRect(), T = b.pageX, I = b.pageY, U = o.value.offsetHeight, H = o.value.offsetWidth;
        T = D.right - b.pageX + window.scrollX < H ? T - H : T, I = D.bottom - b.pageY + window.scrollY < U ? I - U : I, a.positions = {
          left: T + "px",
          top: I + "px"
        };
      });
    };
    return (b, E) => a.active ? (y(), S("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: o,
      style: fo(a.positions)
    }, [
      (y(!0), S(ue, null, ke(a.items, (D) => (y(), S("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: D.title,
        onClick: (T) => f(D)
      }, [
        Fl,
        u("span", null, $(D.title()), 1)
      ], 8, Kl))), 128))
    ], 4)) : X("", !0);
  }
}), Xl = (t, e) => {
  const r = t[e];
  return r ? typeof r == "function" ? r() : Promise.resolve(r) : new Promise((o, i) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(i.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function ql(t) {
  const e = await Xl(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en.70efd54a.js"), "../locales/fa.json": () => import("./fa.1da73475.js"), "../locales/ru.json": () => import("./ru.8dbff4f2.js"), "../locales/tr.json": () => import("./tr.78307c97.js") }), `../locales/${t}.json`);
  return JSON.parse(e.default);
}
function Gl(t, e, r) {
  const { getStore: o, setStore: i } = Wt(t), a = L({}), n = (f) => {
    ql(f).then((h) => {
      a.value = h, i("locale", f), i("translations", h), r.emit("vf-toast-push", { label: "The language is set to " + f });
    }).catch((h) => {
      r.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), n("en");
    });
  };
  o("locale") ? a.value = o("translations") : n(e);
  const m = (f, ...h) => h.length ? m(f = f.replace("%s", h.shift()), ...h) : f;
  function g(f, ...h) {
    return a.value.hasOwnProperty(f) ? m(a.value[f], ...h) : m(f, ...h);
  }
  return { t: g, changeLocale: n };
}
const Jl = { class: "vuefinder" }, Zl = /* @__PURE__ */ u("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), Ql = {
  name: "VueFinder"
}, ec = /* @__PURE__ */ Object.assign(Ql, {
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
    maxFileSize: {
      type: String,
      default: "10mb"
    },
    postData: {
      type: Object,
      default: {}
    }
  },
  setup(t) {
    const e = t, r = Za(), { setStore: o, getStore: i } = Wt(e.id), a = L(i("adapter"));
    Be("emitter", r), Be("storage", Wt(e.id)), Be("postData", e.postData), Be("adapter", a), Be("maxFileSize", e.maxFileSize);
    const n = Gl(e.id, e.locale, r);
    Be("i18n", n);
    const { apiUrl: m, setApiUrl: g } = Te();
    g(e.url);
    const f = $t({ adapter: a.value, storages: [], dirname: ".", files: [] }), h = L(i("viewport", "grid")), p = L(i("darkMode", e.dark));
    r.on("vf-darkMode-toggle", () => {
      p.value = !p.value, o("darkMode", p.value);
    });
    const b = L(!1);
    Be("loadingState", b);
    const E = L(i("full-screen", !1));
    r.on("vf-fullscreen-toggle", () => {
      E.value = !E.value, o("full-screen", E.value);
    }), r.on("vf-view-toggle", (U) => {
      h.value = U;
    });
    const D = $t({
      active: !1,
      type: "delete",
      data: {}
    });
    r.on("vf-modal-close", () => {
      D.active = !1;
    }), r.on("vf-modal-show", (U) => {
      D.active = !0, D.type = U.type, D.data = U;
    });
    const T = (U) => {
      Object.assign(f, U), r.emit("vf-nodes-selected", {}), r.emit("vf-explorer-update");
    };
    let I;
    return r.on("vf-fetch-abort", () => {
      I.abort(), b.value = !1;
    }), r.on("vf-fetch", ({ params: U, onSuccess: H = null, onError: N = null }) => {
      ["index", "search"].includes(U.q) && (I && I.abort(), b.value = !0), I = new AbortController();
      const W = I.signal;
      Tt(m.value, { params: U, signal: W }).then((K) => {
        a.value = K.adapter, ["index", "search"].includes(U.q) && (b.value = !1), r.emit("vf-modal-close"), T(K), H(K);
      }).catch((K) => {
        N && N(K);
      }).finally(() => {
      });
    }), r.on("vf-download", (U) => {
      document.getElementById("download_frame").src = U, r.emit("vf-modal-close");
    }), Ce(() => {
      r.emit("vf-fetch", { params: { q: "index", adapter: a.value } });
    }), (U, H) => (y(), S("div", Jl, [
      u("div", {
        class: he(p.value ? "dark" : "")
      }, [
        u("div", {
          class: he([E.value ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
          style: fo(E.value ? "" : "max-height: " + t.maxHeight),
          onMousedown: H[0] || (H[0] = (N) => x(r).emit("vf-contextmenu-hide")),
          onTouchstart: H[1] || (H[1] = (N) => x(r).emit("vf-contextmenu-hide"))
        }, [
          De(Bs, { data: f }, null, 8, ["data"]),
          De(Ul, { data: f }, null, 8, ["data"]),
          De(qn, {
            view: h.value,
            data: f
          }, null, 8, ["view", "data"]),
          De(fl, { data: f }, null, 8, ["data"])
        ], 38),
        D.active ? (y(), J(Ja("v-f-modal-" + D.type), {
          key: 0,
          selection: D.data,
          current: f
        }, null, 8, ["selection", "current"])) : X("", !0),
        De(Wl, { current: f }, null, 8, ["current"]),
        Zl
      ], 2)
    ]));
  }
}), tc = /* @__PURE__ */ u("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), rc = { class: "fixed z-10 inset-0 overflow-hidden" }, oc = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, ac = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, sc = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Ae = {
  __name: "ModalLayout",
  setup(t) {
    const e = j("emitter");
    return Ce(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus();
    }), (r, o) => (y(), S("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = st((i) => x(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      tc,
      u("div", rc, [
        u("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: o[0] || (o[0] = Ke((i) => x(e).emit("vf-modal-close"), ["self"]))
        }, [
          u("div", oc, [
            u("div", ac, [
              Yt(r.$slots, "default")
            ]),
            u("div", sc, [
              Yt(r.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, ic = ["aria-label"], nc = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), lc = [
  nc
], cc = {
  name: "Message"
}, Oe = /* @__PURE__ */ Object.assign(cc, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var m;
    const { t: r } = j("i18n"), o = L(!1), i = L(null), a = L((m = i.value) == null ? void 0 : m.strMessage);
    It(a, () => o.value = !1);
    const n = () => {
      e("hidden"), o.value = !0;
    };
    return (g, f) => (y(), S("div", null, [
      o.value ? X("", !0) : (y(), S("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: he(["flex mt-1 p-1 px-2 rounded text-sm", t.error ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"])
      }, [
        Yt(g.$slots, "default"),
        u("div", {
          class: "ml-auto cursor-pointer",
          onClick: n,
          "aria-label": x(r)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, lc, 8, ic)
      ], 2))
    ]));
  }
}), uc = { class: "sm:flex sm:items-start" }, dc = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), hc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, fc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, mc = { class: "mt-2" }, gc = { class: "text-sm text-gray-500" }, pc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, vc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bc = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), yc = [
  bc
], wc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xc = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), _c = [
  xc
], kc = { class: "ml-1.5" }, Sc = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, Dc = {
  name: "VFModalDelete"
}, Cc = /* @__PURE__ */ Object.assign(Dc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = j("emitter");
    j("storage");
    const o = j("adapter"), { t: i } = j("i18n"), a = L(e.selection.items), n = L(""), m = () => {
      a.value.length && r.emit("vf-fetch", {
        params: {
          q: "delete",
          adapter: o.value,
          path: e.current.dirname,
          items: JSON.stringify(a.value.map(({ path: g, type: f }) => ({ path: g, type: f })))
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: i("Files deleted.") });
        },
        onError: (g) => {
          n.value = i(g.message);
        }
      });
    };
    return (g, f) => (y(), J(Ae, null, {
      buttons: q(() => [
        u("button", {
          type: "button",
          onClick: m,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Yes, Delete!")), 1),
        u("button", {
          type: "button",
          onClick: f[1] || (f[1] = (h) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Cancel")), 1),
        u("div", Sc, $(x(i)("This action cannot be undone.")), 1)
      ]),
      default: q(() => [
        u("div", uc, [
          dc,
          u("div", hc, [
            u("h3", fc, $(x(i)("Delete files")), 1),
            u("div", mc, [
              u("p", gc, $(x(i)("Are you sure you want to delete these files?")), 1),
              (y(!0), S(ue, null, ke(a.value, (h) => (y(), S("p", pc, [
                h.type == "dir" ? (y(), S("svg", vc, yc)) : (y(), S("svg", wc, _c)),
                u("span", kc, $(h.basename), 1)
              ]))), 256)),
              n.value.length ? (y(), J(Oe, {
                key: 0,
                onHidden: f[0] || (f[0] = (h) => n.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ie($(n.value), 1)
                ]),
                _: 1
              })) : X("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Mc = { class: "sm:flex sm:items-start" }, $c = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), Ec = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Tc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ac = { class: "mt-2" }, Oc = { class: "text-sm text-gray-500" }, Ic = {
  name: "VFModalMessage"
}, Lc = /* @__PURE__ */ Object.assign(Ic, {
  props: {
    selection: Object
  },
  setup(t) {
    const e = j("emitter"), { t: r } = j("i18n");
    return (o, i) => (y(), J(Ae, null, {
      buttons: q(() => [
        u("button", {
          type: "button",
          onClick: i[0] || (i[0] = (a) => x(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(r)("Close")), 1)
      ]),
      default: q(() => {
        var a, n, m, g;
        return [
          u("div", Mc, [
            $c,
            u("div", Ec, [
              u("h3", Tc, $((n = (a = t.selection) == null ? void 0 : a.title) != null ? n : "Title"), 1),
              u("div", Ac, [
                u("p", Oc, $((g = (m = t.selection) == null ? void 0 : m.message) != null ? g : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), Pc = { class: "sm:flex sm:items-start" }, Nc = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), jc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, zc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Vc = { class: "mt-2" }, Rc = { class: "text-sm text-gray-500" }, Bc = ["onKeyup", "placeholder"], Hc = {
  name: "VFModalNewFolder"
}, Uc = /* @__PURE__ */ Object.assign(Hc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = j("emitter");
    j("storage");
    const o = j("adapter"), { t: i } = j("i18n"), a = L(""), n = L(""), m = () => {
      a.value != "" && r.emit("vf-fetch", {
        params: {
          q: "newfolder",
          adapter: o.value,
          path: e.current.dirname,
          name: a.value
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: i("%s is created.", a.value) });
        },
        onError: (g) => {
          n.value = i(g.message);
        }
      });
    };
    return (g, f) => (y(), J(Ae, null, {
      buttons: q(() => [
        u("button", {
          type: "button",
          onClick: m,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Create")), 1),
        u("button", {
          type: "button",
          onClick: f[2] || (f[2] = (h) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Cancel")), 1)
      ]),
      default: q(() => [
        u("div", Pc, [
          Nc,
          u("div", jc, [
            u("h3", zc, $(x(i)("New Folder")), 1),
            u("div", Vc, [
              u("p", Rc, $(x(i)("Create a new folder")), 1),
              _e(u("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (h) => a.value = h),
                onKeyup: st(m, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: x(i)("Folder Name"),
                type: "text"
              }, null, 40, Bc), [
                [it, a.value]
              ]),
              n.value.length ? (y(), J(Oe, {
                key: 0,
                onHidden: f[1] || (f[1] = (h) => n.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ie($(n.value), 1)
                ]),
                _: 1
              })) : X("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Kc = { class: "sm:flex sm:items-start" }, Fc = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), Yc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Wc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Xc = { class: "mt-2" }, qc = { class: "text-sm text-gray-500" }, Gc = ["onKeyup", "placeholder"], Jc = {
  name: "VFModalNewFile"
}, Zc = /* @__PURE__ */ Object.assign(Jc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = j("emitter");
    j("storage");
    const o = j("adapter"), { t: i } = j("i18n"), a = L(""), n = L(""), m = () => {
      a.value != "" && r.emit("vf-fetch", {
        params: {
          q: "newfile",
          adapter: o.value,
          path: e.current.dirname,
          name: a.value
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: i("%s is created.", a.value) });
        },
        onError: (g) => {
          n.value = i(g.message);
        }
      });
    };
    return (g, f) => (y(), J(Ae, null, {
      buttons: q(() => [
        u("button", {
          type: "button",
          onClick: m,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Create")), 1),
        u("button", {
          type: "button",
          onClick: f[2] || (f[2] = (h) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Cancel")), 1)
      ]),
      default: q(() => [
        u("div", Kc, [
          Fc,
          u("div", Yc, [
            u("h3", Wc, $(x(i)("New File")), 1),
            u("div", Xc, [
              u("p", qc, $(x(i)("Create a new file")), 1),
              _e(u("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (h) => a.value = h),
                onKeyup: st(m, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: x(i)("File Name"),
                type: "text"
              }, null, 40, Gc), [
                [it, a.value]
              ]),
              n.value.length ? (y(), J(Oe, {
                key: 0,
                onHidden: f[1] || (f[1] = (h) => n.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ie($(n.value), 1)
                ]),
                _: 1
              })) : X("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Qc = { class: "flex" }, eu = ["aria-label"], tu = { class: "ml-auto mb-2" }, ru = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, ou = { key: 1 }, au = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(t, { emit: e }) {
    const r = t, o = L(""), i = L(""), a = L(null), n = L(!1), { apiUrl: m } = Te(), g = L(""), f = L(!1), { t: h } = j("i18n");
    Ce(() => {
      Tt(m.value, {
        params: { q: "preview", adapter: r.selection.adapter, path: r.selection.item.path },
        json: !1
      }).then((D) => {
        o.value = D, e("load");
      });
    });
    const p = () => {
      n.value = !n.value, i.value = o.value, n.value == !0 && Lt(() => {
        a.value.focus();
      });
    }, b = j("postData"), E = () => {
      g.value = "", f.value = !1, Tt(m.value, {
        method: "POST",
        params: Object.assign(b, {
          q: "save",
          adapter: r.selection.adapter,
          path: r.selection.item.path,
          content: i.value
        }),
        json: !1
      }).then((D) => {
        g.value = h("Updated."), o.value = D, e("load"), n.value = !n.value;
      }).catch((D) => {
        g.value = h(D.message), f.value = !0;
      });
    };
    return (D, T) => (y(), S(ue, null, [
      u("div", Qc, [
        u("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": t.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, $(t.selection.item.basename), 9, eu),
        u("div", tu, [
          n.value ? (y(), S("button", {
            key: 0,
            onClick: E,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, $(x(h)("Save")), 1)) : X("", !0),
          u("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: T[0] || (T[0] = (I) => p())
          }, $(n.value ? x(h)("Cancel") : x(h)("Edit")), 1)
        ])
      ]),
      u("div", null, [
        n.value ? (y(), S("div", ou, [
          _e(u("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": T[1] || (T[1] = (I) => i.value = I),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [it, i.value]
          ])
        ])) : (y(), S("pre", ru, $(o.value), 1)),
        g.value.length ? (y(), J(Oe, {
          key: 2,
          onHidden: T[2] || (T[2] = (I) => g.value = ""),
          error: f.value
        }, {
          default: q(() => [
            ie($(g.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : X("", !0)
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
function Xr(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e && (o = o.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), r.push.apply(r, o);
  }
  return r;
}
function Fo(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Xr(Object(r), !0).forEach(function(o) {
      nu(t, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Xr(Object(r)).forEach(function(o) {
      Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return t;
}
function Mt(t) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Mt = function(e) {
    return typeof e;
  } : Mt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Mt(t);
}
function su(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function qr(t, e) {
  for (var r = 0; r < e.length; r++) {
    var o = e[r];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
  }
}
function iu(t, e, r) {
  return e && qr(t.prototype, e), r && qr(t, r), t;
}
function nu(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function Yo(t) {
  return lu(t) || cu(t) || uu(t) || du();
}
function lu(t) {
  if (Array.isArray(t))
    return Gt(t);
}
function cu(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function uu(t, e) {
  if (!!t) {
    if (typeof t == "string")
      return Gt(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Gt(t, e);
  }
}
function Gt(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, o = new Array(e); r < e; r++)
    o[r] = t[r];
  return o;
}
function du() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Vt = typeof window < "u" && typeof window.document < "u", Ee = Vt ? window : {}, pr = Vt && Ee.document.documentElement ? "ontouchstart" in Ee.document.documentElement : !1, vr = Vt ? "PointerEvent" in Ee : !1, ee = "cropper", br = "all", Wo = "crop", Xo = "move", qo = "zoom", He = "e", Ue = "w", Qe = "s", Pe = "n", ut = "ne", dt = "nw", ht = "se", ft = "sw", Jt = "".concat(ee, "-crop"), Gr = "".concat(ee, "-disabled"), pe = "".concat(ee, "-hidden"), Jr = "".concat(ee, "-hide"), hu = "".concat(ee, "-invisible"), Ot = "".concat(ee, "-modal"), Zt = "".concat(ee, "-move"), pt = "".concat(ee, "Action"), Dt = "".concat(ee, "Preview"), yr = "crop", Go = "move", Jo = "none", Qt = "crop", er = "cropend", tr = "cropmove", rr = "cropstart", Zr = "dblclick", fu = pr ? "touchstart" : "mousedown", mu = pr ? "touchmove" : "mousemove", gu = pr ? "touchend touchcancel" : "mouseup", Qr = vr ? "pointerdown" : fu, eo = vr ? "pointermove" : mu, to = vr ? "pointerup pointercancel" : gu, ro = "ready", oo = "resize", ao = "wheel", or = "zoom", so = "image/jpeg", pu = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, vu = /^data:/, bu = /^data:image\/jpeg;base64,/, yu = /^img|canvas$/i, Zo = 200, Qo = 100, io = {
  viewMode: 0,
  dragMode: yr,
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
  minContainerWidth: Zo,
  minContainerHeight: Qo,
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, wu = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', xu = Number.isNaN || Ee.isNaN;
function Y(t) {
  return typeof t == "number" && !xu(t);
}
var no = function(e) {
  return e > 0 && e < 1 / 0;
};
function Ut(t) {
  return typeof t > "u";
}
function Ye(t) {
  return Mt(t) === "object" && t !== null;
}
var _u = Object.prototype.hasOwnProperty;
function et(t) {
  if (!Ye(t))
    return !1;
  try {
    var e = t.constructor, r = e.prototype;
    return e && r && _u.call(r, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function ge(t) {
  return typeof t == "function";
}
var ku = Array.prototype.slice;
function ea(t) {
  return Array.from ? Array.from(t) : ku.call(t);
}
function se(t, e) {
  return t && ge(e) && (Array.isArray(t) || Y(t.length) ? ea(t).forEach(function(r, o) {
    e.call(t, r, o, t);
  }) : Ye(t) && Object.keys(t).forEach(function(r) {
    e.call(t, t[r], r, t);
  })), t;
}
var te = Object.assign || function(e) {
  for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
    o[i - 1] = arguments[i];
  return Ye(e) && o.length > 0 && o.forEach(function(a) {
    Ye(a) && Object.keys(a).forEach(function(n) {
      e[n] = a[n];
    });
  }), e;
}, Su = /\.\d*(?:0|9){12}\d*$/;
function rt(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return Su.test(t) ? Math.round(t * e) / e : t;
}
var Du = /^width|height|left|top|marginLeft|marginTop$/;
function Ne(t, e) {
  var r = t.style;
  se(e, function(o, i) {
    Du.test(i) && Y(o) && (o = "".concat(o, "px")), r[i] = o;
  });
}
function Cu(t, e) {
  return t.classList ? t.classList.contains(e) : t.className.indexOf(e) > -1;
}
function ce(t, e) {
  if (!!e) {
    if (Y(t.length)) {
      se(t, function(o) {
        ce(o, e);
      });
      return;
    }
    if (t.classList) {
      t.classList.add(e);
      return;
    }
    var r = t.className.trim();
    r ? r.indexOf(e) < 0 && (t.className = "".concat(r, " ").concat(e)) : t.className = e;
  }
}
function $e(t, e) {
  if (!!e) {
    if (Y(t.length)) {
      se(t, function(r) {
        $e(r, e);
      });
      return;
    }
    if (t.classList) {
      t.classList.remove(e);
      return;
    }
    t.className.indexOf(e) >= 0 && (t.className = t.className.replace(e, ""));
  }
}
function tt(t, e, r) {
  if (!!e) {
    if (Y(t.length)) {
      se(t, function(o) {
        tt(o, e, r);
      });
      return;
    }
    r ? ce(t, e) : $e(t, e);
  }
}
var Mu = /([a-z\d])([A-Z])/g;
function wr(t) {
  return t.replace(Mu, "$1-$2").toLowerCase();
}
function ar(t, e) {
  return Ye(t[e]) ? t[e] : t.dataset ? t.dataset[e] : t.getAttribute("data-".concat(wr(e)));
}
function vt(t, e, r) {
  Ye(r) ? t[e] = r : t.dataset ? t.dataset[e] = r : t.setAttribute("data-".concat(wr(e)), r);
}
function $u(t, e) {
  if (Ye(t[e]))
    try {
      delete t[e];
    } catch {
      t[e] = void 0;
    }
  else if (t.dataset)
    try {
      delete t.dataset[e];
    } catch {
      t.dataset[e] = void 0;
    }
  else
    t.removeAttribute("data-".concat(wr(e)));
}
var ta = /\s\s*/, ra = function() {
  var t = !1;
  if (Vt) {
    var e = !1, r = function() {
    }, o = Object.defineProperty({}, "once", {
      get: function() {
        return t = !0, e;
      },
      set: function(a) {
        e = a;
      }
    });
    Ee.addEventListener("test", r, o), Ee.removeEventListener("test", r, o);
  }
  return t;
}();
function Se(t, e, r) {
  var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = r;
  e.trim().split(ta).forEach(function(a) {
    if (!ra) {
      var n = t.listeners;
      n && n[a] && n[a][r] && (i = n[a][r], delete n[a][r], Object.keys(n[a]).length === 0 && delete n[a], Object.keys(n).length === 0 && delete t.listeners);
    }
    t.removeEventListener(a, i, o);
  });
}
function xe(t, e, r) {
  var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = r;
  e.trim().split(ta).forEach(function(a) {
    if (o.once && !ra) {
      var n = t.listeners, m = n === void 0 ? {} : n;
      i = function() {
        delete m[a][r], t.removeEventListener(a, i, o);
        for (var f = arguments.length, h = new Array(f), p = 0; p < f; p++)
          h[p] = arguments[p];
        r.apply(t, h);
      }, m[a] || (m[a] = {}), m[a][r] && t.removeEventListener(a, m[a][r], o), m[a][r] = i, t.listeners = m;
    }
    t.addEventListener(a, i, o);
  });
}
function ot(t, e, r) {
  var o;
  return ge(Event) && ge(CustomEvent) ? o = new CustomEvent(e, {
    detail: r,
    bubbles: !0,
    cancelable: !0
  }) : (o = document.createEvent("CustomEvent"), o.initCustomEvent(e, !0, !0, r)), t.dispatchEvent(o);
}
function oa(t) {
  var e = t.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var Kt = Ee.location, Eu = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function lo(t) {
  var e = t.match(Eu);
  return e !== null && (e[1] !== Kt.protocol || e[2] !== Kt.hostname || e[3] !== Kt.port);
}
function co(t) {
  var e = "timestamp=".concat(new Date().getTime());
  return t + (t.indexOf("?") === -1 ? "?" : "&") + e;
}
function mt(t) {
  var e = t.rotate, r = t.scaleX, o = t.scaleY, i = t.translateX, a = t.translateY, n = [];
  Y(i) && i !== 0 && n.push("translateX(".concat(i, "px)")), Y(a) && a !== 0 && n.push("translateY(".concat(a, "px)")), Y(e) && e !== 0 && n.push("rotate(".concat(e, "deg)")), Y(r) && r !== 1 && n.push("scaleX(".concat(r, ")")), Y(o) && o !== 1 && n.push("scaleY(".concat(o, ")"));
  var m = n.length ? n.join(" ") : "none";
  return {
    WebkitTransform: m,
    msTransform: m,
    transform: m
  };
}
function Tu(t) {
  var e = Fo({}, t), r = 0;
  return se(t, function(o, i) {
    delete e[i], se(e, function(a) {
      var n = Math.abs(o.startX - a.startX), m = Math.abs(o.startY - a.startY), g = Math.abs(o.endX - a.endX), f = Math.abs(o.endY - a.endY), h = Math.sqrt(n * n + m * m), p = Math.sqrt(g * g + f * f), b = (p - h) / h;
      Math.abs(b) > Math.abs(r) && (r = b);
    });
  }), r;
}
function Ct(t, e) {
  var r = t.pageX, o = t.pageY, i = {
    endX: r,
    endY: o
  };
  return e ? i : Fo({
    startX: r,
    startY: o
  }, i);
}
function Au(t) {
  var e = 0, r = 0, o = 0;
  return se(t, function(i) {
    var a = i.startX, n = i.startY;
    e += a, r += n, o += 1;
  }), e /= o, r /= o, {
    pageX: e,
    pageY: r
  };
}
function je(t) {
  var e = t.aspectRatio, r = t.height, o = t.width, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", a = no(o), n = no(r);
  if (a && n) {
    var m = r * e;
    i === "contain" && m > o || i === "cover" && m < o ? r = o / e : o = r * e;
  } else
    a ? r = o / e : n && (o = r * e);
  return {
    width: o,
    height: r
  };
}
function Ou(t) {
  var e = t.width, r = t.height, o = t.degree;
  if (o = Math.abs(o) % 180, o === 90)
    return {
      width: r,
      height: e
    };
  var i = o % 90 * Math.PI / 180, a = Math.sin(i), n = Math.cos(i), m = e * n + r * a, g = e * a + r * n;
  return o > 90 ? {
    width: g,
    height: m
  } : {
    width: m,
    height: g
  };
}
function Iu(t, e, r, o) {
  var i = e.aspectRatio, a = e.naturalWidth, n = e.naturalHeight, m = e.rotate, g = m === void 0 ? 0 : m, f = e.scaleX, h = f === void 0 ? 1 : f, p = e.scaleY, b = p === void 0 ? 1 : p, E = r.aspectRatio, D = r.naturalWidth, T = r.naturalHeight, I = o.fillColor, U = I === void 0 ? "transparent" : I, H = o.imageSmoothingEnabled, N = H === void 0 ? !0 : H, W = o.imageSmoothingQuality, K = W === void 0 ? "low" : W, C = o.maxWidth, V = C === void 0 ? 1 / 0 : C, Q = o.maxHeight, ne = Q === void 0 ? 1 / 0 : Q, le = o.minWidth, fe = le === void 0 ? 0 : le, we = o.minHeight, be = we === void 0 ? 0 : we, Z = document.createElement("canvas"), O = Z.getContext("2d"), B = je({
    aspectRatio: E,
    width: V,
    height: ne
  }), z = je({
    aspectRatio: E,
    width: fe,
    height: be
  }, "cover"), de = Math.min(B.width, Math.max(z.width, D)), G = Math.min(B.height, Math.max(z.height, T)), me = je({
    aspectRatio: i,
    width: V,
    height: ne
  }), re = je({
    aspectRatio: i,
    width: fe,
    height: be
  }, "cover"), xt = Math.min(me.width, Math.max(re.width, a)), qe = Math.min(me.height, Math.max(re.height, n)), Rt = [-xt / 2, -qe / 2, xt, qe];
  return Z.width = rt(de), Z.height = rt(G), O.fillStyle = U, O.fillRect(0, 0, de, G), O.save(), O.translate(de / 2, G / 2), O.rotate(g * Math.PI / 180), O.scale(h, b), O.imageSmoothingEnabled = N, O.imageSmoothingQuality = K, O.drawImage.apply(O, [t].concat(Yo(Rt.map(function(Ge) {
    return Math.floor(rt(Ge));
  })))), O.restore(), Z;
}
var aa = String.fromCharCode;
function Lu(t, e, r) {
  var o = "";
  r += e;
  for (var i = e; i < r; i += 1)
    o += aa(t.getUint8(i));
  return o;
}
var Pu = /^data:.*,/;
function Nu(t) {
  var e = t.replace(Pu, ""), r = atob(e), o = new ArrayBuffer(r.length), i = new Uint8Array(o);
  return se(i, function(a, n) {
    i[n] = r.charCodeAt(n);
  }), o;
}
function ju(t, e) {
  for (var r = [], o = 8192, i = new Uint8Array(t); i.length > 0; )
    r.push(aa.apply(null, ea(i.subarray(0, o)))), i = i.subarray(o);
  return "data:".concat(e, ";base64,").concat(btoa(r.join("")));
}
function zu(t) {
  var e = new DataView(t), r;
  try {
    var o, i, a;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var n = e.byteLength, m = 2; m + 1 < n; ) {
        if (e.getUint8(m) === 255 && e.getUint8(m + 1) === 225) {
          i = m;
          break;
        }
        m += 1;
      }
    if (i) {
      var g = i + 4, f = i + 10;
      if (Lu(e, g, 4) === "Exif") {
        var h = e.getUint16(f);
        if (o = h === 18761, (o || h === 19789) && e.getUint16(f + 2, o) === 42) {
          var p = e.getUint32(f + 4, o);
          p >= 8 && (a = f + p);
        }
      }
    }
    if (a) {
      var b = e.getUint16(a, o), E, D;
      for (D = 0; D < b; D += 1)
        if (E = a + D * 12 + 2, e.getUint16(E, o) === 274) {
          E += 8, r = e.getUint16(E, o), e.setUint16(E, 1, o);
          break;
        }
    }
  } catch {
    r = 1;
  }
  return r;
}
function Vu(t) {
  var e = 0, r = 1, o = 1;
  switch (t) {
    case 2:
      r = -1;
      break;
    case 3:
      e = -180;
      break;
    case 4:
      o = -1;
      break;
    case 5:
      e = 90, o = -1;
      break;
    case 6:
      e = 90;
      break;
    case 7:
      e = 90, r = -1;
      break;
    case 8:
      e = -90;
      break;
  }
  return {
    rotate: e,
    scaleX: r,
    scaleY: o
  };
}
var Ru = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, r = this.options, o = this.container, i = this.cropper, a = Number(r.minContainerWidth), n = Number(r.minContainerHeight);
    ce(i, pe), $e(e, pe);
    var m = {
      width: Math.max(o.offsetWidth, a >= 0 ? a : Zo),
      height: Math.max(o.offsetHeight, n >= 0 ? n : Qo)
    };
    this.containerData = m, Ne(i, {
      width: m.width,
      height: m.height
    }), ce(e, pe), $e(i, pe);
  },
  initCanvas: function() {
    var e = this.containerData, r = this.imageData, o = this.options.viewMode, i = Math.abs(r.rotate) % 180 === 90, a = i ? r.naturalHeight : r.naturalWidth, n = i ? r.naturalWidth : r.naturalHeight, m = a / n, g = e.width, f = e.height;
    e.height * m > e.width ? o === 3 ? g = e.height * m : f = e.width / m : o === 3 ? f = e.width / m : g = e.height * m;
    var h = {
      aspectRatio: m,
      naturalWidth: a,
      naturalHeight: n,
      width: g,
      height: f
    };
    this.canvasData = h, this.limited = o === 1 || o === 2, this.limitCanvas(!0, !0), h.width = Math.min(Math.max(h.width, h.minWidth), h.maxWidth), h.height = Math.min(Math.max(h.height, h.minHeight), h.maxHeight), h.left = (e.width - h.width) / 2, h.top = (e.height - h.height) / 2, h.oldLeft = h.left, h.oldTop = h.top, this.initialCanvasData = te({}, h);
  },
  limitCanvas: function(e, r) {
    var o = this.options, i = this.containerData, a = this.canvasData, n = this.cropBoxData, m = o.viewMode, g = a.aspectRatio, f = this.cropped && n;
    if (e) {
      var h = Number(o.minCanvasWidth) || 0, p = Number(o.minCanvasHeight) || 0;
      m > 1 ? (h = Math.max(h, i.width), p = Math.max(p, i.height), m === 3 && (p * g > h ? h = p * g : p = h / g)) : m > 0 && (h ? h = Math.max(h, f ? n.width : 0) : p ? p = Math.max(p, f ? n.height : 0) : f && (h = n.width, p = n.height, p * g > h ? h = p * g : p = h / g));
      var b = je({
        aspectRatio: g,
        width: h,
        height: p
      });
      h = b.width, p = b.height, a.minWidth = h, a.minHeight = p, a.maxWidth = 1 / 0, a.maxHeight = 1 / 0;
    }
    if (r)
      if (m > (f ? 0 : 1)) {
        var E = i.width - a.width, D = i.height - a.height;
        a.minLeft = Math.min(0, E), a.minTop = Math.min(0, D), a.maxLeft = Math.max(0, E), a.maxTop = Math.max(0, D), f && this.limited && (a.minLeft = Math.min(n.left, n.left + (n.width - a.width)), a.minTop = Math.min(n.top, n.top + (n.height - a.height)), a.maxLeft = n.left, a.maxTop = n.top, m === 2 && (a.width >= i.width && (a.minLeft = Math.min(0, E), a.maxLeft = Math.max(0, E)), a.height >= i.height && (a.minTop = Math.min(0, D), a.maxTop = Math.max(0, D))));
      } else
        a.minLeft = -a.width, a.minTop = -a.height, a.maxLeft = i.width, a.maxTop = i.height;
  },
  renderCanvas: function(e, r) {
    var o = this.canvasData, i = this.imageData;
    if (r) {
      var a = Ou({
        width: i.naturalWidth * Math.abs(i.scaleX || 1),
        height: i.naturalHeight * Math.abs(i.scaleY || 1),
        degree: i.rotate || 0
      }), n = a.width, m = a.height, g = o.width * (n / o.naturalWidth), f = o.height * (m / o.naturalHeight);
      o.left -= (g - o.width) / 2, o.top -= (f - o.height) / 2, o.width = g, o.height = f, o.aspectRatio = n / m, o.naturalWidth = n, o.naturalHeight = m, this.limitCanvas(!0, !1);
    }
    (o.width > o.maxWidth || o.width < o.minWidth) && (o.left = o.oldLeft), (o.height > o.maxHeight || o.height < o.minHeight) && (o.top = o.oldTop), o.width = Math.min(Math.max(o.width, o.minWidth), o.maxWidth), o.height = Math.min(Math.max(o.height, o.minHeight), o.maxHeight), this.limitCanvas(!1, !0), o.left = Math.min(Math.max(o.left, o.minLeft), o.maxLeft), o.top = Math.min(Math.max(o.top, o.minTop), o.maxTop), o.oldLeft = o.left, o.oldTop = o.top, Ne(this.canvas, te({
      width: o.width,
      height: o.height
    }, mt({
      translateX: o.left,
      translateY: o.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var r = this.canvasData, o = this.imageData, i = o.naturalWidth * (r.width / r.naturalWidth), a = o.naturalHeight * (r.height / r.naturalHeight);
    te(o, {
      width: i,
      height: a,
      left: (r.width - i) / 2,
      top: (r.height - a) / 2
    }), Ne(this.image, te({
      width: o.width,
      height: o.height
    }, mt(te({
      translateX: o.left,
      translateY: o.top
    }, o)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, r = this.canvasData, o = e.aspectRatio || e.initialAspectRatio, i = Number(e.autoCropArea) || 0.8, a = {
      width: r.width,
      height: r.height
    };
    o && (r.height * o > r.width ? a.height = a.width / o : a.width = a.height * o), this.cropBoxData = a, this.limitCropBox(!0, !0), a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth), a.height = Math.min(Math.max(a.height, a.minHeight), a.maxHeight), a.width = Math.max(a.minWidth, a.width * i), a.height = Math.max(a.minHeight, a.height * i), a.left = r.left + (r.width - a.width) / 2, a.top = r.top + (r.height - a.height) / 2, a.oldLeft = a.left, a.oldTop = a.top, this.initialCropBoxData = te({}, a);
  },
  limitCropBox: function(e, r) {
    var o = this.options, i = this.containerData, a = this.canvasData, n = this.cropBoxData, m = this.limited, g = o.aspectRatio;
    if (e) {
      var f = Number(o.minCropBoxWidth) || 0, h = Number(o.minCropBoxHeight) || 0, p = m ? Math.min(i.width, a.width, a.width + a.left, i.width - a.left) : i.width, b = m ? Math.min(i.height, a.height, a.height + a.top, i.height - a.top) : i.height;
      f = Math.min(f, i.width), h = Math.min(h, i.height), g && (f && h ? h * g > f ? h = f / g : f = h * g : f ? h = f / g : h && (f = h * g), b * g > p ? b = p / g : p = b * g), n.minWidth = Math.min(f, p), n.minHeight = Math.min(h, b), n.maxWidth = p, n.maxHeight = b;
    }
    r && (m ? (n.minLeft = Math.max(0, a.left), n.minTop = Math.max(0, a.top), n.maxLeft = Math.min(i.width, a.left + a.width) - n.width, n.maxTop = Math.min(i.height, a.top + a.height) - n.height) : (n.minLeft = 0, n.minTop = 0, n.maxLeft = i.width - n.width, n.maxTop = i.height - n.height));
  },
  renderCropBox: function() {
    var e = this.options, r = this.containerData, o = this.cropBoxData;
    (o.width > o.maxWidth || o.width < o.minWidth) && (o.left = o.oldLeft), (o.height > o.maxHeight || o.height < o.minHeight) && (o.top = o.oldTop), o.width = Math.min(Math.max(o.width, o.minWidth), o.maxWidth), o.height = Math.min(Math.max(o.height, o.minHeight), o.maxHeight), this.limitCropBox(!1, !0), o.left = Math.min(Math.max(o.left, o.minLeft), o.maxLeft), o.top = Math.min(Math.max(o.top, o.minTop), o.maxTop), o.oldLeft = o.left, o.oldTop = o.top, e.movable && e.cropBoxMovable && vt(this.face, pt, o.width >= r.width && o.height >= r.height ? Xo : br), Ne(this.cropBox, te({
      width: o.width,
      height: o.height
    }, mt({
      translateX: o.left,
      translateY: o.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), ot(this.element, Qt, this.getData());
  }
}, Bu = {
  initPreview: function() {
    var e = this.element, r = this.crossOrigin, o = this.options.preview, i = r ? this.crossOriginUrl : this.url, a = e.alt || "The image to preview", n = document.createElement("img");
    if (r && (n.crossOrigin = r), n.src = i, n.alt = a, this.viewBox.appendChild(n), this.viewBoxImage = n, !!o) {
      var m = o;
      typeof o == "string" ? m = e.ownerDocument.querySelectorAll(o) : o.querySelector && (m = [o]), this.previews = m, se(m, function(g) {
        var f = document.createElement("img");
        vt(g, Dt, {
          width: g.offsetWidth,
          height: g.offsetHeight,
          html: g.innerHTML
        }), r && (f.crossOrigin = r), f.src = i, f.alt = a, f.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', g.innerHTML = "", g.appendChild(f);
      });
    }
  },
  resetPreview: function() {
    se(this.previews, function(e) {
      var r = ar(e, Dt);
      Ne(e, {
        width: r.width,
        height: r.height
      }), e.innerHTML = r.html, $u(e, Dt);
    });
  },
  preview: function() {
    var e = this.imageData, r = this.canvasData, o = this.cropBoxData, i = o.width, a = o.height, n = e.width, m = e.height, g = o.left - r.left - e.left, f = o.top - r.top - e.top;
    !this.cropped || this.disabled || (Ne(this.viewBoxImage, te({
      width: n,
      height: m
    }, mt(te({
      translateX: -g,
      translateY: -f
    }, e)))), se(this.previews, function(h) {
      var p = ar(h, Dt), b = p.width, E = p.height, D = b, T = E, I = 1;
      i && (I = b / i, T = a * I), a && T > E && (I = E / a, D = i * I, T = E), Ne(h, {
        width: D,
        height: T
      }), Ne(h.getElementsByTagName("img")[0], te({
        width: n * I,
        height: m * I
      }, mt(te({
        translateX: -g * I,
        translateY: -f * I
      }, e))));
    }));
  }
}, Hu = {
  bind: function() {
    var e = this.element, r = this.options, o = this.cropper;
    ge(r.cropstart) && xe(e, rr, r.cropstart), ge(r.cropmove) && xe(e, tr, r.cropmove), ge(r.cropend) && xe(e, er, r.cropend), ge(r.crop) && xe(e, Qt, r.crop), ge(r.zoom) && xe(e, or, r.zoom), xe(o, Qr, this.onCropStart = this.cropStart.bind(this)), r.zoomable && r.zoomOnWheel && xe(o, ao, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), r.toggleDragModeOnDblclick && xe(o, Zr, this.onDblclick = this.dblclick.bind(this)), xe(e.ownerDocument, eo, this.onCropMove = this.cropMove.bind(this)), xe(e.ownerDocument, to, this.onCropEnd = this.cropEnd.bind(this)), r.responsive && xe(window, oo, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, r = this.options, o = this.cropper;
    ge(r.cropstart) && Se(e, rr, r.cropstart), ge(r.cropmove) && Se(e, tr, r.cropmove), ge(r.cropend) && Se(e, er, r.cropend), ge(r.crop) && Se(e, Qt, r.crop), ge(r.zoom) && Se(e, or, r.zoom), Se(o, Qr, this.onCropStart), r.zoomable && r.zoomOnWheel && Se(o, ao, this.onWheel, {
      passive: !1,
      capture: !0
    }), r.toggleDragModeOnDblclick && Se(o, Zr, this.onDblclick), Se(e.ownerDocument, eo, this.onCropMove), Se(e.ownerDocument, to, this.onCropEnd), r.responsive && Se(window, oo, this.onResize);
  }
}, Uu = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, r = this.container, o = this.containerData, i = r.offsetWidth / o.width, a = r.offsetHeight / o.height, n = Math.abs(i - 1) > Math.abs(a - 1) ? i : a;
      if (n !== 1) {
        var m, g;
        e.restore && (m = this.getCanvasData(), g = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(se(m, function(f, h) {
          m[h] = f * n;
        })), this.setCropBoxData(se(g, function(f, h) {
          g[h] = f * n;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Jo || this.setDragMode(Cu(this.dragBox, Jt) ? Go : yr);
  },
  wheel: function(e) {
    var r = this, o = Number(this.options.wheelZoomRatio) || 0.1, i = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      r.wheeling = !1;
    }, 50), e.deltaY ? i = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? i = -e.wheelDelta / 120 : e.detail && (i = e.detail > 0 ? 1 : -1), this.zoom(-i * o, e)));
  },
  cropStart: function(e) {
    var r = e.buttons, o = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (Y(r) && r !== 1 || Y(o) && o !== 0 || e.ctrlKey))) {
      var i = this.options, a = this.pointers, n;
      e.changedTouches ? se(e.changedTouches, function(m) {
        a[m.identifier] = Ct(m);
      }) : a[e.pointerId || 0] = Ct(e), Object.keys(a).length > 1 && i.zoomable && i.zoomOnTouch ? n = qo : n = ar(e.target, pt), !!pu.test(n) && ot(this.element, rr, {
        originalEvent: e,
        action: n
      }) !== !1 && (e.preventDefault(), this.action = n, this.cropping = !1, n === Wo && (this.cropping = !0, ce(this.dragBox, Ot)));
    }
  },
  cropMove: function(e) {
    var r = this.action;
    if (!(this.disabled || !r)) {
      var o = this.pointers;
      e.preventDefault(), ot(this.element, tr, {
        originalEvent: e,
        action: r
      }) !== !1 && (e.changedTouches ? se(e.changedTouches, function(i) {
        te(o[i.identifier] || {}, Ct(i, !0));
      }) : te(o[e.pointerId || 0] || {}, Ct(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var r = this.action, o = this.pointers;
      e.changedTouches ? se(e.changedTouches, function(i) {
        delete o[i.identifier];
      }) : delete o[e.pointerId || 0], r && (e.preventDefault(), Object.keys(o).length || (this.action = ""), this.cropping && (this.cropping = !1, tt(this.dragBox, Ot, this.cropped && this.options.modal)), ot(this.element, er, {
        originalEvent: e,
        action: r
      }));
    }
  }
}, Ku = {
  change: function(e) {
    var r = this.options, o = this.canvasData, i = this.containerData, a = this.cropBoxData, n = this.pointers, m = this.action, g = r.aspectRatio, f = a.left, h = a.top, p = a.width, b = a.height, E = f + p, D = h + b, T = 0, I = 0, U = i.width, H = i.height, N = !0, W;
    !g && e.shiftKey && (g = p && b ? p / b : 1), this.limited && (T = a.minLeft, I = a.minTop, U = T + Math.min(i.width, o.width, o.left + o.width), H = I + Math.min(i.height, o.height, o.top + o.height));
    var K = n[Object.keys(n)[0]], C = {
      x: K.endX - K.startX,
      y: K.endY - K.startY
    }, V = function(ne) {
      switch (ne) {
        case He:
          E + C.x > U && (C.x = U - E);
          break;
        case Ue:
          f + C.x < T && (C.x = T - f);
          break;
        case Pe:
          h + C.y < I && (C.y = I - h);
          break;
        case Qe:
          D + C.y > H && (C.y = H - D);
          break;
      }
    };
    switch (m) {
      case br:
        f += C.x, h += C.y;
        break;
      case He:
        if (C.x >= 0 && (E >= U || g && (h <= I || D >= H))) {
          N = !1;
          break;
        }
        V(He), p += C.x, p < 0 && (m = Ue, p = -p, f -= p), g && (b = p / g, h += (a.height - b) / 2);
        break;
      case Pe:
        if (C.y <= 0 && (h <= I || g && (f <= T || E >= U))) {
          N = !1;
          break;
        }
        V(Pe), b -= C.y, h += C.y, b < 0 && (m = Qe, b = -b, h -= b), g && (p = b * g, f += (a.width - p) / 2);
        break;
      case Ue:
        if (C.x <= 0 && (f <= T || g && (h <= I || D >= H))) {
          N = !1;
          break;
        }
        V(Ue), p -= C.x, f += C.x, p < 0 && (m = He, p = -p, f -= p), g && (b = p / g, h += (a.height - b) / 2);
        break;
      case Qe:
        if (C.y >= 0 && (D >= H || g && (f <= T || E >= U))) {
          N = !1;
          break;
        }
        V(Qe), b += C.y, b < 0 && (m = Pe, b = -b, h -= b), g && (p = b * g, f += (a.width - p) / 2);
        break;
      case ut:
        if (g) {
          if (C.y <= 0 && (h <= I || E >= U)) {
            N = !1;
            break;
          }
          V(Pe), b -= C.y, h += C.y, p = b * g;
        } else
          V(Pe), V(He), C.x >= 0 ? E < U ? p += C.x : C.y <= 0 && h <= I && (N = !1) : p += C.x, C.y <= 0 ? h > I && (b -= C.y, h += C.y) : (b -= C.y, h += C.y);
        p < 0 && b < 0 ? (m = ft, b = -b, p = -p, h -= b, f -= p) : p < 0 ? (m = dt, p = -p, f -= p) : b < 0 && (m = ht, b = -b, h -= b);
        break;
      case dt:
        if (g) {
          if (C.y <= 0 && (h <= I || f <= T)) {
            N = !1;
            break;
          }
          V(Pe), b -= C.y, h += C.y, p = b * g, f += a.width - p;
        } else
          V(Pe), V(Ue), C.x <= 0 ? f > T ? (p -= C.x, f += C.x) : C.y <= 0 && h <= I && (N = !1) : (p -= C.x, f += C.x), C.y <= 0 ? h > I && (b -= C.y, h += C.y) : (b -= C.y, h += C.y);
        p < 0 && b < 0 ? (m = ht, b = -b, p = -p, h -= b, f -= p) : p < 0 ? (m = ut, p = -p, f -= p) : b < 0 && (m = ft, b = -b, h -= b);
        break;
      case ft:
        if (g) {
          if (C.x <= 0 && (f <= T || D >= H)) {
            N = !1;
            break;
          }
          V(Ue), p -= C.x, f += C.x, b = p / g;
        } else
          V(Qe), V(Ue), C.x <= 0 ? f > T ? (p -= C.x, f += C.x) : C.y >= 0 && D >= H && (N = !1) : (p -= C.x, f += C.x), C.y >= 0 ? D < H && (b += C.y) : b += C.y;
        p < 0 && b < 0 ? (m = ut, b = -b, p = -p, h -= b, f -= p) : p < 0 ? (m = ht, p = -p, f -= p) : b < 0 && (m = dt, b = -b, h -= b);
        break;
      case ht:
        if (g) {
          if (C.x >= 0 && (E >= U || D >= H)) {
            N = !1;
            break;
          }
          V(He), p += C.x, b = p / g;
        } else
          V(Qe), V(He), C.x >= 0 ? E < U ? p += C.x : C.y >= 0 && D >= H && (N = !1) : p += C.x, C.y >= 0 ? D < H && (b += C.y) : b += C.y;
        p < 0 && b < 0 ? (m = dt, b = -b, p = -p, h -= b, f -= p) : p < 0 ? (m = ft, p = -p, f -= p) : b < 0 && (m = ut, b = -b, h -= b);
        break;
      case Xo:
        this.move(C.x, C.y), N = !1;
        break;
      case qo:
        this.zoom(Tu(n), e), N = !1;
        break;
      case Wo:
        if (!C.x || !C.y) {
          N = !1;
          break;
        }
        W = oa(this.cropper), f = K.startX - W.left, h = K.startY - W.top, p = a.minWidth, b = a.minHeight, C.x > 0 ? m = C.y > 0 ? ht : ut : C.x < 0 && (f -= p, m = C.y > 0 ? ft : dt), C.y < 0 && (h -= b), this.cropped || ($e(this.cropBox, pe), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    N && (a.width = p, a.height = b, a.left = f, a.top = h, this.action = m, this.renderCropBox()), se(n, function(Q) {
      Q.startX = Q.endX, Q.startY = Q.endY;
    });
  }
}, Fu = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && ce(this.dragBox, Ot), $e(this.cropBox, pe), this.setCropBoxData(this.initialCropBoxData)), this;
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
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), $e(this.dragBox, Ot), ce(this.cropBox, pe)), this;
  },
  replace: function(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), r ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, se(this.previews, function(o) {
      o.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, $e(this.cropper, Gr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, ce(this.cropper, Gr)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[ee] ? (e[ee] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, o = this.canvasData, i = o.left, a = o.top;
    return this.moveTo(Ut(e) ? e : i + Number(e), Ut(r) ? r : a + Number(r));
  },
  moveTo: function(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, o = this.canvasData, i = !1;
    return e = Number(e), r = Number(r), this.ready && !this.disabled && this.options.movable && (Y(e) && (o.left = e, i = !0), Y(r) && (o.top = r, i = !0), i && this.renderCanvas(!0)), this;
  },
  zoom: function(e, r) {
    var o = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(o.width * e / o.naturalWidth, null, r);
  },
  zoomTo: function(e, r, o) {
    var i = this.options, a = this.canvasData, n = a.width, m = a.height, g = a.naturalWidth, f = a.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && i.zoomable) {
      var h = g * e, p = f * e;
      if (ot(this.element, or, {
        ratio: e,
        oldRatio: n / g,
        originalEvent: o
      }) === !1)
        return this;
      if (o) {
        var b = this.pointers, E = oa(this.cropper), D = b && Object.keys(b).length ? Au(b) : {
          pageX: o.pageX,
          pageY: o.pageY
        };
        a.left -= (h - n) * ((D.pageX - E.left - a.left) / n), a.top -= (p - m) * ((D.pageY - E.top - a.top) / m);
      } else
        et(r) && Y(r.x) && Y(r.y) ? (a.left -= (h - n) * ((r.x - a.left) / n), a.top -= (p - m) * ((r.y - a.top) / m)) : (a.left -= (h - n) / 2, a.top -= (p - m) / 2);
      a.width = h, a.height = p, this.renderCanvas(!0);
    }
    return this;
  },
  rotate: function(e) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(e));
  },
  rotateTo: function(e) {
    return e = Number(e), Y(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
  },
  scaleX: function(e) {
    var r = this.imageData.scaleY;
    return this.scale(e, Y(r) ? r : 1);
  },
  scaleY: function(e) {
    var r = this.imageData.scaleX;
    return this.scale(Y(r) ? r : 1, e);
  },
  scale: function(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, o = this.imageData, i = !1;
    return e = Number(e), r = Number(r), this.ready && !this.disabled && this.options.scalable && (Y(e) && (o.scaleX = e, i = !0), Y(r) && (o.scaleY = r, i = !0), i && this.renderCanvas(!0, !0)), this;
  },
  getData: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, r = this.options, o = this.imageData, i = this.canvasData, a = this.cropBoxData, n;
    if (this.ready && this.cropped) {
      n = {
        x: a.left - i.left,
        y: a.top - i.top,
        width: a.width,
        height: a.height
      };
      var m = o.width / o.naturalWidth;
      if (se(n, function(h, p) {
        n[p] = h / m;
      }), e) {
        var g = Math.round(n.y + n.height), f = Math.round(n.x + n.width);
        n.x = Math.round(n.x), n.y = Math.round(n.y), n.width = f - n.x, n.height = g - n.y;
      }
    } else
      n = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return r.rotatable && (n.rotate = o.rotate || 0), r.scalable && (n.scaleX = o.scaleX || 1, n.scaleY = o.scaleY || 1), n;
  },
  setData: function(e) {
    var r = this.options, o = this.imageData, i = this.canvasData, a = {};
    if (this.ready && !this.disabled && et(e)) {
      var n = !1;
      r.rotatable && Y(e.rotate) && e.rotate !== o.rotate && (o.rotate = e.rotate, n = !0), r.scalable && (Y(e.scaleX) && e.scaleX !== o.scaleX && (o.scaleX = e.scaleX, n = !0), Y(e.scaleY) && e.scaleY !== o.scaleY && (o.scaleY = e.scaleY, n = !0)), n && this.renderCanvas(!0, !0);
      var m = o.width / o.naturalWidth;
      Y(e.x) && (a.left = e.x * m + i.left), Y(e.y) && (a.top = e.y * m + i.top), Y(e.width) && (a.width = e.width * m), Y(e.height) && (a.height = e.height * m), this.setCropBoxData(a);
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
    var e = this.canvasData, r = {};
    return this.ready && se(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(o) {
      r[o] = e[o];
    }), r;
  },
  setCanvasData: function(e) {
    var r = this.canvasData, o = r.aspectRatio;
    return this.ready && !this.disabled && et(e) && (Y(e.left) && (r.left = e.left), Y(e.top) && (r.top = e.top), Y(e.width) ? (r.width = e.width, r.height = e.width / o) : Y(e.height) && (r.height = e.height, r.width = e.height * o), this.renderCanvas(!0)), this;
  },
  getCropBoxData: function() {
    var e = this.cropBoxData, r;
    return this.ready && this.cropped && (r = {
      left: e.left,
      top: e.top,
      width: e.width,
      height: e.height
    }), r || {};
  },
  setCropBoxData: function(e) {
    var r = this.cropBoxData, o = this.options.aspectRatio, i, a;
    return this.ready && this.cropped && !this.disabled && et(e) && (Y(e.left) && (r.left = e.left), Y(e.top) && (r.top = e.top), Y(e.width) && e.width !== r.width && (i = !0, r.width = e.width), Y(e.height) && e.height !== r.height && (a = !0, r.height = e.height), o && (i ? r.height = r.width / o : a && (r.width = r.height * o)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var r = this.canvasData, o = Iu(this.image, this.imageData, r, e);
    if (!this.cropped)
      return o;
    var i = this.getData(), a = i.x, n = i.y, m = i.width, g = i.height, f = o.width / Math.floor(r.naturalWidth);
    f !== 1 && (a *= f, n *= f, m *= f, g *= f);
    var h = m / g, p = je({
      aspectRatio: h,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = je({
      aspectRatio: h,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), E = je({
      aspectRatio: h,
      width: e.width || (f !== 1 ? o.width : m),
      height: e.height || (f !== 1 ? o.height : g)
    }), D = E.width, T = E.height;
    D = Math.min(p.width, Math.max(b.width, D)), T = Math.min(p.height, Math.max(b.height, T));
    var I = document.createElement("canvas"), U = I.getContext("2d");
    I.width = rt(D), I.height = rt(T), U.fillStyle = e.fillColor || "transparent", U.fillRect(0, 0, D, T);
    var H = e.imageSmoothingEnabled, N = H === void 0 ? !0 : H, W = e.imageSmoothingQuality;
    U.imageSmoothingEnabled = N, W && (U.imageSmoothingQuality = W);
    var K = o.width, C = o.height, V = a, Q = n, ne, le, fe, we, be, Z;
    V <= -m || V > K ? (V = 0, ne = 0, fe = 0, be = 0) : V <= 0 ? (fe = -V, V = 0, ne = Math.min(K, m + V), be = ne) : V <= K && (fe = 0, ne = Math.min(m, K - V), be = ne), ne <= 0 || Q <= -g || Q > C ? (Q = 0, le = 0, we = 0, Z = 0) : Q <= 0 ? (we = -Q, Q = 0, le = Math.min(C, g + Q), Z = le) : Q <= C && (we = 0, le = Math.min(g, C - Q), Z = le);
    var O = [V, Q, ne, le];
    if (be > 0 && Z > 0) {
      var B = D / m;
      O.push(fe * B, we * B, be * B, Z * B);
    }
    return U.drawImage.apply(U, [o].concat(Yo(O.map(function(z) {
      return Math.floor(rt(z));
    })))), I;
  },
  setAspectRatio: function(e) {
    var r = this.options;
    return !this.disabled && !Ut(e) && (r.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var r = this.options, o = this.dragBox, i = this.face;
    if (this.ready && !this.disabled) {
      var a = e === yr, n = r.movable && e === Go;
      e = a || n ? e : Jo, r.dragMode = e, vt(o, pt, e), tt(o, Jt, a), tt(o, Zt, n), r.cropBoxMovable || (vt(i, pt, e), tt(i, Jt, a), tt(i, Zt, n));
    }
    return this;
  }
}, Yu = Ee.Cropper, sa = /* @__PURE__ */ function() {
  function t(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (su(this, t), !e || !yu.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = te({}, io, et(r) && r), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return iu(t, [{
    key: "init",
    value: function() {
      var r = this.element, o = r.tagName.toLowerCase(), i;
      if (!r[ee]) {
        if (r[ee] = this, o === "img") {
          if (this.isImg = !0, i = r.getAttribute("src") || "", this.originalUrl = i, !i)
            return;
          i = r.src;
        } else
          o === "canvas" && window.HTMLCanvasElement && (i = r.toDataURL());
        this.load(i);
      }
    }
  }, {
    key: "load",
    value: function(r) {
      var o = this;
      if (!!r) {
        this.url = r, this.imageData = {};
        var i = this.element, a = this.options;
        if (!a.rotatable && !a.scalable && (a.checkOrientation = !1), !a.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (vu.test(r)) {
          bu.test(r) ? this.read(Nu(r)) : this.clone();
          return;
        }
        var n = new XMLHttpRequest(), m = this.clone.bind(this);
        this.reloading = !0, this.xhr = n, n.onabort = m, n.onerror = m, n.ontimeout = m, n.onprogress = function() {
          n.getResponseHeader("content-type") !== so && n.abort();
        }, n.onload = function() {
          o.read(n.response);
        }, n.onloadend = function() {
          o.reloading = !1, o.xhr = null;
        }, a.checkCrossOrigin && lo(r) && i.crossOrigin && (r = co(r)), n.open("GET", r, !0), n.responseType = "arraybuffer", n.withCredentials = i.crossOrigin === "use-credentials", n.send();
      }
    }
  }, {
    key: "read",
    value: function(r) {
      var o = this.options, i = this.imageData, a = zu(r), n = 0, m = 1, g = 1;
      if (a > 1) {
        this.url = ju(r, so);
        var f = Vu(a);
        n = f.rotate, m = f.scaleX, g = f.scaleY;
      }
      o.rotatable && (i.rotate = n), o.scalable && (i.scaleX = m, i.scaleY = g), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var r = this.element, o = this.url, i = r.crossOrigin, a = o;
      this.options.checkCrossOrigin && lo(o) && (i || (i = "anonymous"), a = co(o)), this.crossOrigin = i, this.crossOriginUrl = a;
      var n = document.createElement("img");
      i && (n.crossOrigin = i), n.src = a || o, n.alt = r.alt || "The image to crop", this.image = n, n.onload = this.start.bind(this), n.onerror = this.stop.bind(this), ce(n, Jr), r.parentNode.insertBefore(n, r.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var r = this, o = this.image;
      o.onload = null, o.onerror = null, this.sizing = !0;
      var i = Ee.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(Ee.navigator.userAgent), a = function(f, h) {
        te(r.imageData, {
          naturalWidth: f,
          naturalHeight: h,
          aspectRatio: f / h
        }), r.initialImageData = te({}, r.imageData), r.sizing = !1, r.sized = !0, r.build();
      };
      if (o.naturalWidth && !i) {
        a(o.naturalWidth, o.naturalHeight);
        return;
      }
      var n = document.createElement("img"), m = document.body || document.documentElement;
      this.sizingImage = n, n.onload = function() {
        a(n.width, n.height), i || m.removeChild(n);
      }, n.src = o.src, i || (n.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", m.appendChild(n));
    }
  }, {
    key: "stop",
    value: function() {
      var r = this.image;
      r.onload = null, r.onerror = null, r.parentNode.removeChild(r), this.image = null;
    }
  }, {
    key: "build",
    value: function() {
      if (!(!this.sized || this.ready)) {
        var r = this.element, o = this.options, i = this.image, a = r.parentNode, n = document.createElement("div");
        n.innerHTML = wu;
        var m = n.querySelector(".".concat(ee, "-container")), g = m.querySelector(".".concat(ee, "-canvas")), f = m.querySelector(".".concat(ee, "-drag-box")), h = m.querySelector(".".concat(ee, "-crop-box")), p = h.querySelector(".".concat(ee, "-face"));
        this.container = a, this.cropper = m, this.canvas = g, this.dragBox = f, this.cropBox = h, this.viewBox = m.querySelector(".".concat(ee, "-view-box")), this.face = p, g.appendChild(i), ce(r, pe), a.insertBefore(m, r.nextSibling), this.isImg || $e(i, Jr), this.initPreview(), this.bind(), o.initialAspectRatio = Math.max(0, o.initialAspectRatio) || NaN, o.aspectRatio = Math.max(0, o.aspectRatio) || NaN, o.viewMode = Math.max(0, Math.min(3, Math.round(o.viewMode))) || 0, ce(h, pe), o.guides || ce(h.getElementsByClassName("".concat(ee, "-dashed")), pe), o.center || ce(h.getElementsByClassName("".concat(ee, "-center")), pe), o.background && ce(m, "".concat(ee, "-bg")), o.highlight || ce(p, hu), o.cropBoxMovable && (ce(p, Zt), vt(p, pt, br)), o.cropBoxResizable || (ce(h.getElementsByClassName("".concat(ee, "-line")), pe), ce(h.getElementsByClassName("".concat(ee, "-point")), pe)), this.render(), this.ready = !0, this.setDragMode(o.dragMode), o.autoCrop && this.crop(), this.setData(o.data), ge(o.ready) && xe(r, ro, o.ready, {
          once: !0
        }), ot(r, ro);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      !this.ready || (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), $e(this.element, pe));
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = Yu, t;
    }
  }, {
    key: "setDefaults",
    value: function(r) {
      te(io, et(r) && r);
    }
  }]), t;
}();
te(sa.prototype, Ru, Bu, Hu, Uu, Ku, Fu);
const Wu = { class: "flex" }, Xu = ["aria-label"], qu = { class: "ml-auto mb-2" }, Gu = { class: "w-full flex justify-center" }, Ju = ["src"], Zu = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(t, { emit: e }) {
    const r = t, { t: o } = j("i18n"), { apiUrl: i } = Te(), a = L(null), n = L(null), m = L(!1), g = L(""), f = L(!1), h = () => {
      m.value = !m.value, m.value ? n.value = new sa(a.value, {
        crop(E) {
        }
      }) : n.value.destroy();
    }, p = j("postData"), b = () => {
      n.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (E) => {
          g.value = "", f.value = !1, Tt(i.value, {
            method: "POST",
            params: Object.assign(p, {
              q: "upload",
              adapter: r.selection.adapter,
              path: r.selection.item.path,
              file: E
            }),
            name: r.selection.item.basename,
            json: !1
          }).then((D) => {
            g.value = o("Updated."), a.value.src = Xt(r.selection.adapter, r.selection.item.path), h(), e("load");
          }).catch((D) => {
            g.value = o(D.message), f.value = !0;
          });
        }
      );
    };
    return Ce(() => {
      e("load");
    }), (E, D) => (y(), S(ue, null, [
      u("div", Wu, [
        u("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": t.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, $(t.selection.item.basename), 9, Xu),
        u("div", qu, [
          m.value ? (y(), S("button", {
            key: 0,
            onClick: b,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, $(x(o)("Crop")), 1)) : X("", !0),
          u("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: D[0] || (D[0] = (T) => h())
          }, $(m.value ? x(o)("Cancel") : x(o)("Edit")), 1)
        ])
      ]),
      u("div", Gu, [
        u("img", {
          ref_key: "image",
          ref: a,
          class: "max-w-[50vh] max-h-[50vh]",
          src: x(Xt)(r.selection.adapter, r.selection.item.path),
          alt: ""
        }, null, 8, Ju)
      ]),
      g.value.length ? (y(), J(Oe, {
        key: 0,
        onHidden: D[1] || (D[1] = (T) => g.value = ""),
        error: f.value
      }, {
        default: q(() => [
          ie($(g.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : X("", !0)
    ], 64));
  }
}, Qu = { class: "flex" }, ed = ["aria-label"], td = /* @__PURE__ */ u("div", null, null, -1), rd = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(t, { emit: e }) {
    return Ce(() => {
      e("load");
    }), (r, o) => (y(), S(ue, null, [
      u("div", Qu, [
        u("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": t.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, $(t.selection.item.basename), 9, ed)
      ]),
      td
    ], 64));
  }
}, od = ["aria-label"], ad = {
  class: "w-full",
  preload: "",
  controls: ""
}, sd = ["src"], id = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(t, { emit: e }) {
    const r = t, { apiUrl: o } = Te(), i = () => o.value + "?" + We({ q: "preview", adapter: r.selection.adapter, path: r.selection.item.path });
    return Ce(() => {
      e("load");
    }), (a, n) => (y(), S(ue, null, [
      u("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": t.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, $(t.selection.item.basename), 9, od),
      u("div", null, [
        u("video", ad, [
          u("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, sd),
          ie(" Your browser does not support the video tag. ")
        ])
      ])
    ], 64));
  }
}, nd = ["aria-label"], ld = {
  class: "w-full",
  controls: ""
}, cd = ["src"], ud = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(t, { emit: e }) {
    const r = t, { apiUrl: o } = Te(), i = () => o.value + "?" + We({ q: "preview", adapter: r.selection.adapter, path: r.selection.item.path });
    return Ce(() => {
      e("load");
    }), (a, n) => (y(), S(ue, null, [
      u("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": t.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, $(t.selection.item.basename), 9, nd),
      u("div", null, [
        u("audio", ld, [
          u("source", {
            src: i(),
            type: "audio/mpeg"
          }, null, 8, cd),
          ie(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, dd = ["aria-label"], hd = ["data"], fd = ["src"], md = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(t, { emit: e }) {
    const r = t, { apiUrl: o } = Te(), i = () => o.value + "?" + We({ q: "preview", adapter: r.selection.adapter, path: r.selection.item.path });
    return Ce(() => {
      e("load");
    }), (a, n) => (y(), S(ue, null, [
      u("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": t.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, $(t.selection.item.basename), 9, dd),
      u("div", null, [
        u("object", {
          class: "h-[60vh]",
          data: i(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          u("iframe", {
            class: "border-0",
            src: i(),
            width: "100%",
            height: "100%"
          }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        `, 8, fd)
        ], 8, hd)
      ])
    ], 64));
  }
}, gd = { class: "sm:flex sm:items-start" }, pd = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, vd = { class: "text-gray-700 dark:text-gray-200 text-sm" }, bd = {
  key: 0,
  class: "flex leading-5"
}, yd = /* @__PURE__ */ u("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ u("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ u("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), wd = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, xd = { class: "font-bold pl-2" }, _d = { class: "font-bold pl-2" }, kd = {
  name: "VFModalPreview"
}, Sd = /* @__PURE__ */ Object.assign(kd, {
  props: {
    selection: Object
  },
  setup(t) {
    const e = t, { apiUrl: r } = Te(), o = j("emitter"), { t: i } = j("i18n"), a = L(!1), n = (f) => a.value = f, m = (f) => {
      var h;
      return ((h = e.selection.item.mime_type) != null ? h : "").startsWith(f);
    }, g = () => {
      const f = r.value + "?" + We({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      o.emit("vf-download", f);
    };
    return (f, h) => (y(), J(Ae, null, {
      buttons: q(() => [
        u("button", {
          type: "button",
          onClick: h[6] || (h[6] = (p) => x(o).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Close")), 1),
        u("button", {
          type: "button",
          onClick: h[7] || (h[7] = (p) => g()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Download")), 1)
      ]),
      default: q(() => [
        u("div", gd, [
          u("div", pd, [
            u("div", null, [
              m("text") ? (y(), J(au, {
                key: 0,
                selection: t.selection,
                onLoad: h[0] || (h[0] = (p) => n(!0))
              }, null, 8, ["selection"])) : m("image") ? (y(), J(Zu, {
                key: 1,
                selection: t.selection,
                onLoad: h[1] || (h[1] = (p) => n(!0))
              }, null, 8, ["selection"])) : m("video") ? (y(), J(id, {
                key: 2,
                selection: t.selection,
                onLoad: h[2] || (h[2] = (p) => n(!0))
              }, null, 8, ["selection"])) : m("audio") ? (y(), J(ud, {
                key: 3,
                selection: t.selection,
                onLoad: h[3] || (h[3] = (p) => n(!0))
              }, null, 8, ["selection"])) : m("application/pdf") ? (y(), J(md, {
                key: 4,
                selection: t.selection,
                onLoad: h[4] || (h[4] = (p) => n(!0))
              }, null, 8, ["selection"])) : (y(), J(rd, {
                key: 5,
                selection: t.selection,
                onLoad: h[5] || (h[5] = (p) => n(!0))
              }, null, 8, ["selection"]))
            ]),
            u("div", vd, [
              a.value == !1 ? (y(), S("div", bd, [
                yd,
                u("span", null, $(x(i)("Loading")), 1)
              ])) : X("", !0)
            ])
          ])
        ]),
        u("div", wd, [
          u("div", null, [
            u("span", xd, $(x(i)("File Size")) + ": ", 1),
            ie($(x(go)(t.selection.item.file_size)), 1)
          ]),
          u("div", null, [
            u("span", _d, $(x(i)("Last Modified")) + ": ", 1),
            ie(" " + $(x(po)(t.selection.item.last_modified)), 1)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Dd = { class: "sm:flex sm:items-start" }, Cd = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), Md = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, $d = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ed = { class: "mt-2" }, Td = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Ad = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Od = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Id = [
  Od
], Ld = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pd = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Nd = [
  Pd
], jd = { class: "ml-1.5" }, zd = ["onKeyup"], Vd = {
  name: "VFModalRename"
}, Rd = /* @__PURE__ */ Object.assign(Vd, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = j("emitter");
    j("storage");
    const o = j("adapter"), { t: i } = j("i18n"), a = L(e.selection.items[0]), n = L(e.selection.items[0].basename), m = L(""), g = () => {
      n.value != "" && r.emit("vf-fetch", {
        params: {
          q: "rename",
          adapter: o.value,
          path: e.current.dirname,
          item: a.value.path,
          name: n.value
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: i("%s is renamed.", n.value) });
        },
        onError: (f) => {
          m.value = i(f.message);
        }
      });
    };
    return (f, h) => (y(), J(Ae, null, {
      buttons: q(() => [
        u("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Rename")), 1),
        u("button", {
          type: "button",
          onClick: h[2] || (h[2] = (p) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Cancel")), 1)
      ]),
      default: q(() => [
        u("div", Dd, [
          Cd,
          u("div", Md, [
            u("h3", $d, $(x(i)("Rename")), 1),
            u("div", Ed, [
              u("p", Td, [
                a.value.type == "dir" ? (y(), S("svg", Ad, Id)) : (y(), S("svg", Ld, Nd)),
                u("span", jd, $(a.value.basename), 1)
              ]),
              _e(u("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (p) => n.value = p),
                onKeyup: st(g, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, zd), [
                [it, n.value]
              ]),
              m.value.length ? (y(), J(Oe, {
                key: 0,
                onHidden: h[1] || (h[1] = (p) => m.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ie($(m.value), 1)
                ]),
                _: 1
              })) : X("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Bd = { class: "sm:flex sm:items-start" }, Hd = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), Ud = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Kd = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Fd = { class: "mt-2" }, Yd = { class: "text-gray-500 mb-1" }, Wd = ["id"], Xd = {
  key: 0,
  class: "py-2"
}, qd = ["disabled", "onClick"], Gd = {
  name: "VFModalUpload"
}, Jd = /* @__PURE__ */ Object.assign(Gd, {
  props: {
    current: Object
  },
  setup(t) {
    const e = t, r = j("emitter"), { apiUrl: o } = Te(), { t: i } = j("i18n"), a = j("maxFileSize"), n = L(null), m = L(null), g = L(null), f = L([]), h = L(""), p = L(!0), b = () => {
      h.value = "", n.value.start();
    }, E = j("postData");
    return Ce(() => {
      n.value = new ct.Uploader({
        runtimes: "html5",
        browse_button: g.value,
        container: m.value,
        max_file_size: a,
        multiple_queues: !0,
        file_data_name: "file",
        url: o.value + "?" + We(Object.assign(E, { q: "upload", adapter: e.current.adapter, path: e.current.dirname })),
        headers: {
          ...Et && { "X-CSRF-Token": Et }
        },
        init: {
          PostInit: function() {
          },
          FilesAdded: function(D, T) {
            p.value = !1, ct.each(T, function(I) {
              f.value.push({
                id: I.id,
                name: I.name,
                size: ct.formatSize(I.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(D, T) {
            f.value[f.value.findIndex((I) => I.id == T.id)].percent = T.percent + "%";
          },
          UploadComplete: function() {
            p.value = !0, r.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
          },
          Error: function(D, T) {
            n.value.stop(), T.code == ct.HTTP_ERROR ? h.value = i(JSON.parse(T.response).message) : T.code == ct.FILE_SIZE_ERROR ? h.value = i("The selected file exceeds the maximum file size. You cannot upload files greater than %s", [a]) : h.value = i(T.message);
          }
        }
      }), n.value.init();
    }), (D, T) => (y(), J(Ae, null, {
      buttons: q(() => [
        u("button", {
          disabled: p.value,
          onClick: Ke(b, ["prevent"]),
          type: "button",
          class: he([p.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, $(x(i)("Upload")), 11, qd),
        u("button", {
          type: "button",
          onClick: T[1] || (T[1] = (I) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Cancel")), 1)
      ]),
      default: q(() => [
        u("div", Bd, [
          Hd,
          u("div", Ud, [
            u("h3", Kd, $(x(i)("Upload files")), 1),
            u("div", Fd, [
              u("div", Yd, [
                (y(!0), S(ue, null, ke(f.value, (I) => (y(), S("div", null, [
                  u("div", {
                    id: I.id
                  }, [
                    ie($(I.name) + " ( " + $(I.size) + ") ", 1),
                    u("b", null, $(I.percent), 1)
                  ], 8, Wd)
                ]))), 256)),
                f.value.length ? X("", !0) : (y(), S("div", Xd, $(x(i)("No files selected!")), 1))
              ]),
              u("div", {
                class: "text-gray-500",
                ref_key: "container",
                ref: m
              }, [
                u("button", {
                  ref_key: "pickFiles",
                  ref: g,
                  type: "button",
                  class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                }, $(x(i)("Select Files")), 513)
              ], 512),
              h.value.length ? (y(), J(Oe, {
                key: 0,
                onHidden: T[0] || (T[0] = (I) => h.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ie($(h.value), 1)
                ]),
                _: 1
              })) : X("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Zd = { class: "sm:flex sm:items-start" }, Qd = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), eh = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, th = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, rh = { class: "mt-2" }, oh = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ah = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, sh = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ih = [
  sh
], nh = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, lh = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ch = [
  lh
], uh = { class: "ml-1.5" }, dh = ["onKeyup", "placeholder"], hh = {
  name: "VFModalArchive"
}, fh = /* @__PURE__ */ Object.assign(hh, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = j("emitter");
    j("storage");
    const o = j("adapter"), { t: i } = j("i18n"), a = L(""), n = L(""), m = L(e.selection.items), g = () => {
      m.value.length && r.emit("vf-fetch", {
        params: {
          q: "archive",
          adapter: o.value,
          path: e.current.dirname,
          items: JSON.stringify(m.value.map(({ path: f, type: h }) => ({ path: f, type: h }))),
          name: a.value
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: i("The file(s) archived.") });
        },
        onError: (f) => {
          n.value = i(f.message);
        }
      });
    };
    return (f, h) => (y(), J(Ae, null, {
      buttons: q(() => [
        u("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Archive")), 1),
        u("button", {
          type: "button",
          onClick: h[2] || (h[2] = (p) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Cancel")), 1)
      ]),
      default: q(() => [
        u("div", Zd, [
          Qd,
          u("div", eh, [
            u("h3", th, $(x(i)("Archive the files")), 1),
            u("div", rh, [
              (y(!0), S(ue, null, ke(m.value, (p) => (y(), S("p", oh, [
                p.type == "dir" ? (y(), S("svg", ah, ih)) : (y(), S("svg", nh, ch)),
                u("span", uh, $(p.basename), 1)
              ]))), 256)),
              _e(u("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (p) => a.value = p),
                onKeyup: st(g, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: x(i)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, dh), [
                [it, a.value]
              ]),
              n.value.length ? (y(), J(Oe, {
                key: 0,
                onHidden: h[1] || (h[1] = (p) => n.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ie($(n.value), 1)
                ]),
                _: 1
              })) : X("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), mh = { class: "sm:flex sm:items-start" }, gh = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), ph = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, vh = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, bh = { class: "mt-2" }, yh = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, wh = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xh = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), _h = [
  xh
], kh = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Sh = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Dh = [
  Sh
], Ch = { class: "ml-1.5" }, Mh = { class: "my-1 text-sm text-gray-500" }, $h = {
  name: "VFModalUnarchive"
}, Eh = /* @__PURE__ */ Object.assign($h, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = j("emitter");
    j("storage");
    const o = j("adapter"), { t: i } = j("i18n");
    L("");
    const a = L(e.selection.items[0]), n = L(""), m = L([]), g = () => {
      r.emit("vf-fetch", {
        params: {
          q: "unarchive",
          adapter: o.value,
          path: e.current.dirname,
          item: a.value.path
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: i("The file unarchived.") });
        },
        onError: (f) => {
          n.value = i(f.message);
        }
      });
    };
    return (f, h) => (y(), J(Ae, null, {
      buttons: q(() => [
        u("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Unarchive")), 1),
        u("button", {
          type: "button",
          onClick: h[1] || (h[1] = (p) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(i)("Cancel")), 1)
      ]),
      default: q(() => [
        u("div", mh, [
          gh,
          u("div", ph, [
            u("h3", vh, $(x(i)("Unarchive")), 1),
            u("div", bh, [
              (y(!0), S(ue, null, ke(m.value, (p) => (y(), S("p", yh, [
                p.type == "dir" ? (y(), S("svg", wh, _h)) : (y(), S("svg", kh, Dh)),
                u("span", Ch, $(p.basename), 1)
              ]))), 256)),
              u("p", Mh, $(x(i)("The archive will be unarchived at")) + " (" + $(t.current.dirname) + ")", 1),
              n.value.length ? (y(), J(Oe, {
                key: 0,
                onHidden: h[0] || (h[0] = (p) => n.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ie($(n.value), 1)
                ]),
                _: 1
              })) : X("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Th = { class: "sm:flex sm:items-start" }, Ah = /* @__PURE__ */ u("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ u("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), Oh = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ih = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Lh = { class: "mt-2" }, Ph = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Nh = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jh = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), zh = [
  jh
], Vh = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Rh = /* @__PURE__ */ u("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Bh = [
  Rh
], Hh = { class: "ml-1.5" }, Uh = { class: "text-sm text-gray-500 pb-1 pt-3" }, Kh = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Fh = /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), Yh = { class: "ml-1.5 overflow-auto" }, Wh = {
  name: "VFModalMove"
}, Xh = /* @__PURE__ */ Object.assign(Wh, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = j("emitter"), { t: o } = j("i18n");
    j("storage");
    const i = j("adapter"), a = L(e.selection.items.from), n = L(""), m = () => {
      a.value.length && r.emit("vf-fetch", {
        params: {
          q: "move",
          adapter: i.value,
          path: e.current.dirname,
          items: JSON.stringify(a.value.map(({ path: g, type: f }) => ({ path: g, type: f }))),
          item: e.selection.items.to.path
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: o("Files moved.", e.selection.items.to.name) });
        },
        onError: (g) => {
          n.value = o(g.message);
        }
      });
    };
    return (g, f) => (y(), J(Ae, null, {
      buttons: q(() => [
        u("button", {
          type: "button",
          onClick: m,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(o)("Yes, Move!")), 1),
        u("button", {
          type: "button",
          onClick: f[1] || (f[1] = (h) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(x(o)("Cancel")), 1)
      ]),
      default: q(() => [
        u("div", Th, [
          Ah,
          u("div", Oh, [
            u("h3", Ih, $(x(o)("Move files")), 1),
            u("div", Lh, [
              (y(!0), S(ue, null, ke(a.value, (h) => (y(), S("p", Ph, [
                h.type == "dir" ? (y(), S("svg", Nh, zh)) : (y(), S("svg", Vh, Bh)),
                u("span", Hh, $(h.path), 1)
              ]))), 256)),
              u("p", Uh, $(x(o)("Are you sure you want to move these files?")), 1),
              u("p", Kh, [
                Fh,
                u("span", Yh, $(t.selection.items.to.path), 1)
              ]),
              n.value.length ? (y(), J(Oe, {
                key: 0,
                onHidden: f[0] || (f[0] = (h) => n.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ie($(n.value), 1)
                ]),
                _: 1
              })) : X("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), qh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: Cc,
  ModalMessage: Lc,
  ModalNewFolder: Uc,
  ModalNewFile: Zc,
  ModalPreview: Sd,
  ModalRename: Rd,
  ModalUpload: Jd,
  ModalArchive: fh,
  ModalUnarchive: Eh,
  ModalMove: Xh
}, Symbol.toStringTag, { value: "Module" })), Ft = {
  VueFinder: ec,
  ...qh
};
const Zh = {
  install(t) {
    for (const e in Ft)
      if (Ft.hasOwnProperty(e)) {
        const r = Ft[e];
        t.component(r.name, r);
      }
  }
};
export {
  Zh as default
};
