import { ref as k, watch as ve, inject as b, openBlock as a, createElementBlock as m, createElementVNode as e, unref as r, normalizeClass as U, createTextVNode as T, toDisplayString as v, createCommentVNode as L, withDirectives as R, vShow as ae, createVNode as G, TransitionGroup as ze, withCtx as N, Fragment as I, renderList as P, reactive as ce, onMounted as Y, onUpdated as Ee, onBeforeUnmount as Ce, withModifiers as X, nextTick as pe, isRef as Me, vModelSelect as _e, createStaticVNode as Fe, customRef as Le, withKeys as se, vModelText as re, normalizeStyle as Se, provide as W, computed as Ve, createBlock as H, resolveDynamicComponent as Ne, renderSlot as ke } from "vue";
import Be from "mitt";
import Ae from "dragselect";
import He from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Te from "cropperjs";
import Ue from "@uppy/core";
import Ie from "@uppy/xhr-upload";
import "microtip/microtip.css";
var je;
const ue = (je = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : je.getAttribute("content"), me = (d, { method: t = "get", params: s = {}, json: o = !0, signal: p = null }) => {
  const c = { method: t };
  if (c.signal = p, t == "get")
    d += "?" + new URLSearchParams(s);
  else {
    c.headers = {}, ue && (c.headers["X-CSRF-Token"] = ue);
    let l = new FormData();
    for (const [u, g] of Object.entries(s))
      l.append(u, g);
    c.body = l;
  }
  return fetch(d, c).then((l) => l.ok ? o ? l.json() : l.text() : l.json().then(Promise.reject.bind(Promise)));
};
function xe(d) {
  let t = localStorage.getItem(d + "_storage");
  const s = k(JSON.parse(t));
  ve(s, o);
  function o() {
    s.value === null || s.value === "" ? localStorage.removeItem(d + "_storage") : localStorage.setItem(d + "_storage", JSON.stringify(s.value));
  }
  function p(u, g) {
    s.value = Object.assign({ ...s.value }, { [u]: g });
  }
  function c() {
    s.value = null;
  }
  return { getStore: (u, g = null) => s.value === null || s.value === "" ? g : s.value.hasOwnProperty(u) ? s.value[u] : g, setStore: p, clearStore: c };
}
const $e = k("");
function J() {
  function d(t) {
    $e.value = t;
  }
  return { apiUrl: $e, setApiUrl: d };
}
const qe = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Re = {
  key: 0,
  class: "flex text-center"
}, Pe = ["aria-label"], Ge = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  })
], -1), Ye = [
  Ge
], Je = ["aria-label"], Ke = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
  })
], -1), We = [
  Ke
], Xe = ["aria-label"], Qe = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Ze = [
  Qe
], et = ["aria-label"], tt = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), ot = [
  tt
], st = ["aria-label"], rt = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  })
], -1), at = [
  rt
], nt = ["aria-label"], lt = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), it = [
  lt
], dt = ["aria-label"], ct = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), ut = [
  ct
], mt = {
  key: 1,
  class: "flex text-center"
}, vt = { class: "pl-2" }, pt = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, ft = {
  key: 0,
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, gt = /* @__PURE__ */ e("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), ht = /* @__PURE__ */ e("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), kt = [
  gt,
  ht
], xt = { class: "flex text-center items-center justify-end" }, bt = ["aria-label"], wt = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), yt = [
  wt
], _t = ["aria-label"], $t = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, jt = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, Ct = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, Mt = ["aria-label"], St = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, Dt = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, Ot = {
  name: "VFToolbar"
}, zt = /* @__PURE__ */ Object.assign(Ot, {
  props: {
    data: Object
  },
  setup(d) {
    const t = b("emitter"), s = b("usePropDarkMode"), { getStore: o, setStore: p } = b("storage"), { t: c } = b("i18n"), l = k(o("viewport", "grid")), u = k([]), g = k(o("full-screen", !1)), i = k("");
    t.on("vf-search-query", ({ newQuery: _ }) => {
      i.value = _;
    });
    const n = b("loadingState"), x = () => n.value, M = () => {
      g.value = !g.value, t.emit("vf-fullscreen-toggle");
    };
    return t.on("vf-nodes-selected", (_) => {
      u.value = _;
    }), t.on("vf-view-toggle", (_) => {
      p("viewport", _), l.value = _;
    }), (_, j) => (a(), m("div", qe, [
      i.value.length ? (a(), m("div", mt, [
        e("div", vt, [
          T(v(r(c)("Search results for")) + " ", 1),
          e("span", pt, v(i.value), 1)
        ]),
        x() ? (a(), m("svg", ft, kt)) : L("", !0)
      ])) : (a(), m("div", Re, [
        e("div", {
          class: "mx-1.5",
          "aria-label": r(c)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: j[0] || (j[0] = (w) => r(t).emit("vf-modal-show", { type: "new-folder", items: u.value }))
        }, Ye, 8, Pe),
        e("div", {
          class: "mx-1.5",
          "aria-label": r(c)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: j[1] || (j[1] = (w) => r(t).emit("vf-modal-show", { type: "new-file", items: u.value }))
        }, We, 8, Je),
        e("div", {
          class: "mx-1.5",
          "aria-label": r(c)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: j[2] || (j[2] = (w) => u.value.length != 1 || r(t).emit("vf-modal-show", { type: "rename", items: u.value }))
        }, [
          (a(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([u.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Ze, 2))
        ], 8, Xe),
        e("div", {
          class: "mx-1.5",
          "aria-label": r(c)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: j[3] || (j[3] = (w) => !u.value.length || r(t).emit("vf-modal-show", { type: "delete", items: u.value }))
        }, [
          (a(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([u.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ot, 2))
        ], 8, et),
        e("div", {
          class: "mx-1.5",
          "aria-label": r(c)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: j[4] || (j[4] = (w) => r(t).emit("vf-modal-show", { type: "upload", items: u.value }))
        }, at, 8, st),
        u.value.length == 1 && u.value[0].mime_type == "application/zip" ? (a(), m("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": r(c)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: j[5] || (j[5] = (w) => !u.value.length || r(t).emit("vf-modal-show", { type: "unarchive", items: u.value }))
        }, [
          (a(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([u.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, it, 2))
        ], 8, nt)) : (a(), m("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": r(c)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: j[6] || (j[6] = (w) => !u.value.length || r(t).emit("vf-modal-show", { type: "archive", items: u.value }))
        }, [
          (a(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([u.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ut, 2))
        ], 8, dt))
      ])),
      e("div", xt, [
        R(e("div", {
          class: "mx-1.5",
          "aria-label": r(c)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (a(), m("svg", {
            onClick: j[7] || (j[7] = (w) => r(t).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, yt))
        ], 8, bt), [
          [ae, !r(s)]
        ]),
        e("div", {
          class: "mx-1.5",
          "aria-label": r(c)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: M
        }, [
          (a(), m("svg", $t, [
            g.value ? (a(), m("path", jt)) : (a(), m("path", Ct))
          ]))
        ], 8, _t),
        e("div", {
          class: "mx-1.5",
          "aria-label": r(c)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: j[8] || (j[8] = (w) => i.value.length || r(t).emit("vf-view-toggle", l.value == "list" ? "grid" : "list"))
        }, [
          (a(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([i.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            l.value == "grid" ? (a(), m("path", St)) : L("", !0),
            l.value == "list" ? (a(), m("path", Dt)) : L("", !0)
          ], 2))
        ], 8, Mt)
      ])
    ]));
  }
});
function ye(d, t, s, o, p) {
  return (t = Math, s = t.log, o = 1024, p = s(d) / s(o) | 0, d / t.pow(o, p)).toFixed(0) + " " + (p ? "KMGTPEZY"[--p] + "iB" : "B");
}
function Et(d) {
  const t = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(d);
  return o[1] * Math.pow(1024, t[o[2].toLowerCase()]);
}
const De = (d, t = null) => new Date(d * 1e3).toLocaleString(t ?? navigator.language ?? "en-US"), Ft = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Lt = /* @__PURE__ */ e("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Vt = [
  Lt
], Nt = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Bt = /* @__PURE__ */ e("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), At = [
  Bt
], Ht = {
  name: "VFSortIcon"
}, de = /* @__PURE__ */ Object.assign(Ht, {
  props: { direction: String },
  setup(d) {
    return (t, s) => (a(), m("div", null, [
      d.direction == "down" ? (a(), m("svg", Ft, Vt)) : L("", !0),
      d.direction == "up" ? (a(), m("svg", Nt, At)) : L("", !0)
    ]));
  }
}), Tt = ["onClick"], Ut = {
  name: "VFToast.vue"
}, It = /* @__PURE__ */ Object.assign(Ut, {
  setup(d) {
    const t = b("emitter"), { getStore: s } = b("storage"), o = k(s("full-screen", !1)), p = (g) => g == "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = k([]), l = (g) => {
      c.value.splice(g, 1);
    }, u = (g) => {
      let i = c.value.findIndex((n) => n.id === g);
      i !== -1 && l(i);
    };
    return t.on("vf-toast-clear", () => {
      c.value = [];
    }), t.on("vf-toast-push", (g) => {
      let i = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      g.id = i, c.value.push(g), setTimeout(() => {
        u(i);
      }, 5e3);
    }), (g, i) => (a(), m("div", {
      class: U([o.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      G(ze, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: N(() => [
          (a(!0), m(I, null, P(c.value, (n, x) => (a(), m("div", {
            onClick: (M) => l(x),
            key: n,
            class: U([p(n.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, v(n.label), 11, Tt))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), oe = (d) => Object.entries(d).map((t) => t.map(encodeURIComponent).join("=")).join("&"), { apiUrl: qt } = J(), be = (d, t) => qt.value + "?" + oe({ q: "preview", adapter: d, path: t });
function we(d, t = 14) {
  let s = `((?=([\\w\\W]{0,${t}}))([\\w\\W]{8,})([\\w\\W]{8,}))`;
  return d.replace(new RegExp(s), "$2..$4");
}
const Rt = { class: "relative flex-auto flex flex-col overflow-hidden" }, Pt = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 border-gray-200 dark:border-gray-700 text-xs select-none"
}, Gt = { class: "absolute" }, Yt = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), Jt = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Kt = ["onDblclick", "onContextmenu", "data-type", "data-item", "data-index"], Wt = { class: "grid grid-cols-12 items-center" }, Xt = { class: "flex col-span-7 items-center" }, Qt = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zt = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), eo = [
  Zt
], to = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, oo = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), so = [
  oo
], ro = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, ao = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, no = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], lo = { class: "grid grid-cols-12 items-center" }, io = { class: "flex col-span-7 items-center" }, co = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, uo = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), mo = [
  uo
], vo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, po = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), fo = [
  po
], go = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, ho = { class: "col-span-2 text-center" }, ko = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, xo = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], bo = { class: "relative" }, wo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, yo = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), _o = [
  yo
], $o = ["data-src", "alt"], jo = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Co = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Mo = [
  Co
], So = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, Do = { class: "break-all" }, Oo = {
  name: "VFExplorer"
}, zo = /* @__PURE__ */ Object.assign(Oo, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(d) {
    const t = d, s = b("emitter"), { setStore: o, getStore: p } = b("storage"), c = b("adapter"), l = (y) => y == null ? void 0 : y.substring(0, 3), u = k(null), g = k(null), i = k(0), n = k(null), { t: x } = b("i18n"), M = Math.floor(Math.random() * 2 ** 32), _ = k(p("full-screen", !1));
    let j;
    s.on("vf-fullscreen-toggle", () => {
      u.value.style.height = null, _.value = !_.value, o("full-screen", _.value);
    });
    const w = k("");
    s.on("vf-search-query", ({ newQuery: y }) => {
      w.value = y, y ? s.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: t.data.adapter,
          path: t.data.dirname,
          filter: y
        },
        onSuccess: (S) => {
          S.files.length || s.emit("vf-toast-push", { label: x("No search result found.") });
        }
      }) : s.emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter, path: t.data.dirname } });
    });
    let z = null;
    const D = () => {
      z && clearTimeout(z);
    }, C = k(!0), $ = (y) => {
      y.touches.length > 1 && (C.value ? (n.value.stop(), s.emit("vf-toast-push", { label: x("Drag&Drop: off") })) : (n.value.start(), s.emit("vf-toast-push", { label: x("Drag&Drop: on") }), s.emit("vf-explorer-update")), C.value = !C.value);
    }, O = (y) => {
      z = setTimeout(() => {
        const S = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: y.target.getBoundingClientRect().x,
          clientY: y.target.getBoundingClientRect().y
        });
        y.target.dispatchEvent(S);
      }, 500);
    }, V = (y) => {
      y.type == "dir" ? (s.emit("vf-search-exit"), s.emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter, path: y.path } })) : s.emit("vf-modal-show", { type: "preview", adapter: t.data.adapter, item: y });
    }, E = ce({ active: !1, column: "", order: "" }), q = (y = !0) => {
      let S = [...t.data.files], h = E.column, B = E.order == "asc" ? 1 : -1;
      if (!y)
        return S;
      const f = (F, A) => typeof F == "string" && typeof A == "string" ? F.toLowerCase().localeCompare(A.toLowerCase()) : F < A ? -1 : F > A ? 1 : 0;
      return E.active && (S = S.slice().sort((F, A) => f(F[h], A[h]) * B)), S;
    }, ee = (y) => {
      E.active && E.column == y ? (E.active = E.order == "asc", E.column = y, E.order = "desc") : (E.active = !0, E.column = y, E.order = "asc");
    }, Z = () => n.value.getSelection().map((y) => JSON.parse(y.dataset.item)), ne = (y, S) => {
      if (y.altKey || y.ctrlKey || y.metaKey)
        return y.preventDefault(), !1;
      y.dataTransfer.setDragImage(g.value, 0, 15), y.dataTransfer.effectAllowed = "all", y.dataTransfer.dropEffect = "copy", y.dataTransfer.setData("items", JSON.stringify(Z()));
    }, le = (y, S) => {
      y.preventDefault();
      let h = JSON.parse(y.dataTransfer.getData("items"));
      if (h.find((B) => B.storage != c.value)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      s.emit("vf-modal-show", { type: "move", items: { from: h, to: S } });
    }, ie = (y, S) => {
      y.preventDefault(), !S || S.type !== "dir" || n.value.getSelection().find((h) => h == y.currentTarget) ? (y.dataTransfer.dropEffect = "none", y.dataTransfer.effectAllowed = "none") : y.dataTransfer.dropEffect = "copy";
    }, fe = () => {
      n.value = new Ae({
        area: u.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), s.on("vf-explorer-update", () => pe(() => {
        n.value.clearSelection(), n.value.setSettings({
          selectables: document.getElementsByClassName("vf-item-" + M)
        });
      })), n.value.subscribe("predragstart", ({ event: y, isDragging: S }) => {
        if (S)
          i.value = n.value.getSelection().length, n.value.break();
        else {
          const h = y.target.offsetWidth - y.offsetX, B = y.target.offsetHeight - y.offsetY;
          h < 15 && B < 15 && (n.value.clearSelection(), n.value.break());
        }
      }), n.value.subscribe("predragmove", ({ isDragging: y }) => {
        y && n.value.break();
      }), n.value.subscribe("callback", ({ items: y, event: S, isDragging: h }) => {
        s.emit("vf-nodes-selected", Z()), i.value = n.value.getSelection().length;
      });
    };
    return Y(() => {
      j = new He(u.value), fe();
    }), Ee(() => {
      n.value.Area.reset(), n.value.SelectorArea.updatePos(), j.update();
    }), Y(() => {
      ve(() => t.view, () => s.emit("vf-explorer-update"));
    }), Ce(() => {
      j.destroy();
    }), (y, S) => (a(), m("div", Rt, [
      d.view == "list" || w.value.length ? (a(), m("div", Pt, [
        e("div", {
          onClick: S[0] || (S[0] = (h) => ee("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          T(v(r(x)("Name")) + " ", 1),
          R(G(de, {
            direction: E.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, E.active && E.column == "basename"]
          ])
        ]),
        w.value.length ? L("", !0) : (a(), m("div", {
          key: 0,
          onClick: S[1] || (S[1] = (h) => ee("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          T(v(r(x)("Size")) + " ", 1),
          R(G(de, {
            direction: E.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, E.active && E.column == "file_size"]
          ])
        ])),
        w.value.length ? L("", !0) : (a(), m("div", {
          key: 1,
          onClick: S[2] || (S[2] = (h) => ee("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          T(v(r(x)("Date")) + " ", 1),
          R(G(de, {
            direction: E.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, E.active && E.column == "last_modified"]
          ])
        ])),
        w.value.length ? (a(), m("div", {
          key: 2,
          onClick: S[3] || (S[3] = (h) => ee("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          T(v(r(x)("Filepath")) + " ", 1),
          R(G(de, {
            direction: E.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, E.active && E.column == "path"]
          ])
        ])) : L("", !0)
      ])) : L("", !0),
      e("div", Gt, [
        e("div", {
          ref_key: "dragImage",
          ref: g,
          class: "absolute -z-50 -top-96"
        }, [
          Yt,
          e("div", Jt, v(i.value), 1)
        ], 512)
      ]),
      e("div", {
        onTouchstart: $,
        onContextmenu: S[10] || (S[10] = X((h) => r(s).emit("vf-contextmenu-show", { event: h, area: u.value, items: Z() }), ["self", "prevent"])),
        class: U([_.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area vf-scrollbar min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: u
      }, [
        w.value.length ? (a(!0), m(I, { key: 0 }, P(q(), (h, B) => (a(), m("div", {
          onDblclick: (f) => V(h),
          onTouchstart: S[4] || (S[4] = (f) => O(f)),
          onTouchend: S[5] || (S[5] = (f) => D()),
          onContextmenu: X((f) => r(s).emit("vf-contextmenu-show", { event: f, area: u.value, items: Z(), target: h }), ["prevent"]),
          class: U(["vf-item-" + r(M), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": B
        }, [
          e("div", Wt, [
            e("div", Xt, [
              h.type == "dir" ? (a(), m("svg", Qt, eo)) : (a(), m("svg", to, so)),
              e("span", ro, v(h.basename), 1)
            ]),
            e("div", ao, v(h.path), 1)
          ])
        ], 42, Kt))), 256)) : L("", !0),
        d.view == "list" && !w.value.length ? (a(!0), m(I, { key: 1 }, P(q(), (h, B) => (a(), m("div", {
          draggable: "true",
          onDblclick: (f) => V(h),
          onTouchstart: S[6] || (S[6] = (f) => O(f)),
          onTouchend: S[7] || (S[7] = (f) => D()),
          onContextmenu: X((f) => r(s).emit("vf-contextmenu-show", { event: f, area: u.value, items: Z(), target: h }), ["prevent"]),
          onDragstart: (f) => ne(f),
          onDragover: (f) => ie(f, h),
          onDrop: (f) => le(f, h),
          class: U(["vf-item-" + r(M), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": B
        }, [
          e("div", lo, [
            e("div", io, [
              h.type == "dir" ? (a(), m("svg", co, mo)) : (a(), m("svg", vo, fo)),
              e("span", go, v(h.basename), 1)
            ]),
            e("div", ho, v(h.file_size ? r(ye)(h.file_size) : ""), 1),
            e("div", ko, v(r(De)(h.last_modified)), 1)
          ])
        ], 42, no))), 256)) : L("", !0),
        d.view == "grid" && !w.value.length ? (a(!0), m(I, { key: 2 }, P(q(!1), (h, B) => (a(), m("div", {
          draggable: "true",
          onDblclick: (f) => V(h),
          onTouchstart: S[8] || (S[8] = (f) => O(f)),
          onTouchend: S[9] || (S[9] = (f) => D()),
          onContextmenu: X((f) => r(s).emit("vf-contextmenu-show", { event: f, area: u.value, items: Z(), target: h }), ["prevent"]),
          onDragstart: (f) => ne(f),
          onDragover: (f) => ie(f, h),
          onDrop: (f) => le(f, h),
          class: U(["vf-item-" + r(M), "border border-transparent hover:bg-neutral-50 m-1 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 text-center justify-center select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": B
        }, [
          e("div", null, [
            e("div", bo, [
              h.type == "dir" ? (a(), m("svg", wo, _o)) : (h.mime_type ?? "").startsWith("image") ? (a(), m("img", {
                key: 1,
                class: "lazy h-10 md:h-12 m-auto",
                "data-src": r(be)(r(c).value, h.path),
                alt: h.basename
              }, null, 8, $o)) : (a(), m("svg", jo, Mo)),
              !(h.mime_type ?? "").startsWith("image") && h.type != "dir" ? (a(), m("div", So, v(l(h.extension)), 1)) : L("", !0)
            ]),
            e("span", Do, v(r(we)(h.basename)), 1)
          ])
        ], 42, xo))), 256)) : L("", !0)
      ], 34),
      G(It)
    ]));
  }
}), Eo = "1.3.2", Fo = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Lo = { class: "flex leading-5 items-center" }, Vo = ["aria-label"], No = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
  })
], -1), Bo = [
  No
], Ao = ["value"], Ho = { class: "ml-3" }, To = { key: 0 }, Uo = { class: "ml-1" }, Io = { class: "flex leading-5 items-center justify-end" }, qo = {
  value: "",
  disabled: ""
}, Ro = /* @__PURE__ */ Fe('<option value="en">English</option><option value="fr">French (Français)</option><option value="de">German (Deutsch)</option><option value="he">Hebrew (עִברִית)</option><option value="hi">Hindi (हिंदी)</option><option value="fa">Persian (فارسی)</option><option value="ru">Russian (Pусский)</option><option value="sv">Swedish (Svenska)</option><option value="tr">Turkish (Türkçe)</option><option value="zhCN">Simplified Chinese (简体中文)</option><option value="zhTW">Traditional Chinese (繁體中文)</option>', 11), Po = ["aria-label"], Go = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), Yo = [
  Go
], Jo = {
  name: "VFStatusbar"
}, Ko = /* @__PURE__ */ Object.assign(Jo, {
  props: {
    data: Object
  },
  setup(d) {
    const t = b("emitter"), { getStore: s, setStore: o } = b("storage"), p = k(0), c = b("adapter"), { t: l, changeLocale: u } = b("i18n"), g = k(s("locale", "")), i = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: c.value } }), o("adapter", c.value);
    };
    t.on("vf-nodes-selected", (x) => {
      p.value = x.length;
    });
    const n = k("");
    return t.on("vf-search-query", ({ newQuery: x }) => {
      n.value = x;
    }), (x, M) => (a(), m("div", Fo, [
      e("div", Lo, [
        e("div", {
          class: "mx-2",
          "aria-label": r(l)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, Bo, 8, Vo),
        R(e("select", {
          "onUpdate:modelValue": M[0] || (M[0] = (_) => Me(c) ? c.value = _ : null),
          onChange: i,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (a(!0), m(I, null, P(d.data.storages, (_) => (a(), m("option", { value: _ }, v(_), 9, Ao))), 256))
        ], 544), [
          [_e, r(c)]
        ]),
        e("div", Ho, [
          n.value.length ? (a(), m("span", To, v(d.data.files.length) + " items found. ", 1)) : L("", !0),
          e("span", Uo, v(p.value > 0 ? p.value + " " + r(l)("item(s) selected.") : ""), 1)
        ])
      ]),
      e("div", Io, [
        R(e("select", {
          "onUpdate:modelValue": M[1] || (M[1] = (_) => g.value = _),
          onChange: M[2] || (M[2] = (_) => r(u)(_.target.value)),
          class: "w-[120px] delay-200 duration-300 hover:w-full transition-[width] py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          e("option", qo, v(r(l)("Language")), 1),
          Ro
        ], 544), [
          [_e, g.value]
        ]),
        e("span", {
          class: "mr-1",
          "aria-label": r(l)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: M[3] || (M[3] = (_) => r(t).emit("vf-modal-show", { type: "message", title: "Vuefinder " + r(Eo), message: r(l)("Vuefinder is a file manager component for vue 3.") }))
        }, Yo, 8, Po)
      ])
    ]));
  }
}), Wo = (d, t = 0, s = !1) => {
  let o;
  return (...p) => {
    s && !o && d(...p), clearTimeout(o), o = setTimeout(() => {
      d(...p);
    }, t);
  };
}, Xo = (d, t, s) => {
  const o = k(d);
  return Le((c, l) => ({
    get() {
      return c(), o.value;
    },
    set: Wo(
      (u) => {
        o.value = u, l();
      },
      t,
      s
    )
  }));
}, Qo = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Zo = ["aria-label"], es = /* @__PURE__ */ e("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), ts = [
  es
], os = ["aria-label"], ss = /* @__PURE__ */ e("path", { d: "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" }, null, -1), rs = [
  ss
], as = ["aria-label"], ns = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), ls = [
  ns
], is = /* @__PURE__ */ e("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), ds = [
  is
], cs = { class: "flex leading-5" }, us = /* @__PURE__ */ e("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), ms = ["title", "onClick"], vs = {
  key: 0,
  class: "animate-spin p-1 h-6 w-6 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, ps = /* @__PURE__ */ e("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), fs = /* @__PURE__ */ e("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), gs = [
  ps,
  fs
], hs = {
  key: 3,
  class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full"
}, ks = /* @__PURE__ */ e("div", null, [
  /* @__PURE__ */ e("svg", {
    class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    })
  ])
], -1), xs = ["placeholder"], bs = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), ws = [
  bs
], ys = {
  name: "VFBreadcrumb"
}, _s = /* @__PURE__ */ Object.assign(ys, {
  props: {
    data: Object
  },
  setup(d) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), o = k(null), p = k([]), c = k(!1), l = k(null), u = d, { t: g } = b("i18n"), i = b("loadingState");
    t.on("vf-explorer-update", () => {
      let C = [], $ = [];
      o.value = u.data.dirname ?? s.value + "://", o.value.length == 0 && (p.value = []), o.value.replace(s.value + "://", "").split("/").forEach(function(O) {
        C.push(O), C.join("/") != "" && $.push({
          basename: O,
          name: O,
          path: s.value + "://" + C.join("/"),
          type: "dir"
        });
      }), $.length > 4 && ($ = $.slice(-5), $[0].name = ".."), p.value = $;
    });
    const n = () => {
      c.value = !1, M.value = "";
    };
    t.on("vf-search-exit", () => {
      n();
    });
    const x = () => {
      c.value = !0, pe(() => l.value.focus());
    }, M = Xo("", 400), _ = () => i.value;
    ve(M, (C) => {
      t.emit("vf-toast-clear"), t.emit("vf-search-query", { newQuery: C });
    });
    const j = () => p.value.length && !c.value, w = (C) => {
      C.preventDefault();
      let $ = JSON.parse(C.dataTransfer.getData("items"));
      if ($.find((O) => O.storage != s.value)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: $, to: p.value[p.value.length - 2] ?? { path: s.value + "://" } }
      });
    }, z = (C) => {
      C.preventDefault(), j() ? C.dataTransfer.dropEffect = "copy" : (C.dataTransfer.dropEffect = "none", C.dataTransfer.effectAllowed = "none");
    }, D = () => {
      M.value == "" && n();
    };
    return (C, $) => (a(), m("div", Qo, [
      e("span", {
        "aria-label": r(g)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (a(), m("svg", {
          onDragover: $[0] || ($[0] = (O) => z(O)),
          onDrop: $[1] || ($[1] = (O) => w(O)),
          onClick: $[2] || ($[2] = (O) => {
            var V;
            return !j() || r(t).emit("vf-fetch", { params: { q: "index", adapter: d.data.adapter, path: ((V = p.value[p.value.length - 2]) == null ? void 0 : V.path) ?? r(s) + "://" } });
          }),
          class: U(["h-6 w-6 p-0.5 rounded", j() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, ts, 34))
      ], 8, Zo),
      _() ? (a(), m("span", {
        key: 1,
        "aria-label": r(g)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (a(), m("svg", {
          onClick: $[4] || ($[4] = (O) => r(t).emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, ls))
      ], 8, as)) : (a(), m("span", {
        key: 0,
        "aria-label": r(g)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (a(), m("svg", {
          onClick: $[3] || ($[3] = (O) => {
            r(t).emit("vf-fetch", { params: { q: "index", adapter: d.data.adapter, path: d.data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, rs))
      ], 8, os)),
      c.value ? (a(), m("div", hs, [
        ks,
        R(e("input", {
          ref_key: "searchInput",
          ref: l,
          onKeydown: se(n, ["esc"]),
          onBlur: D,
          "onUpdate:modelValue": $[6] || ($[6] = (O) => Me(M) ? M.value = O : null),
          placeholder: r(g)("Search anything.."),
          class: "w-full pt-1 pb-0 px-2 border-0 text-sm ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, xs), [
          [re, r(M)]
        ]),
        (a(), m("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: n,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, ws))
      ])) : (a(), m("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: X(x, ["self"])
      }, [
        (a(), m("svg", {
          onClick: $[5] || ($[5] = (O) => r(t).emit("vf-fetch", { params: { q: "index", adapter: d.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, ds)),
        e("div", cs, [
          (a(!0), m(I, null, P(p.value, (O, V) => (a(), m("div", { key: V }, [
            us,
            e("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: O.basename,
              onClick: (E) => r(t).emit("vf-fetch", { params: { q: "index", adapter: d.data.adapter, path: O.path } })
            }, v(O.name), 9, ms)
          ]))), 128))
        ]),
        _() ? (a(), m("svg", vs, gs)) : L("", !0)
      ]))
    ]));
  }
}), $s = ["onClick"], js = /* @__PURE__ */ e("span", { class: "px-1" }, null, -1), Cs = {
  name: "VFContextMenu"
}, Ms = /* @__PURE__ */ Object.assign(Cs, {
  props: {
    current: Object
  },
  setup(d) {
    const t = b("emitter"), s = k(null), { apiUrl: o } = J(), p = b("root"), c = d, l = ce({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), u = k([]);
    t.on("vf-context-selected", (_) => {
      u.value = _;
    });
    const { t: g } = b("i18n"), i = {
      newfolder: {
        title: () => g("New Folder"),
        action: () => {
          t.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: () => g("Delete"),
        action: () => {
          t.emit("vf-modal-show", { type: "delete", items: u });
        }
      },
      refresh: {
        title: () => g("Refresh"),
        action: () => {
          t.emit("vf-fetch", { params: { q: "index", adapter: c.current.adapter, path: c.current.dirname } });
        }
      },
      preview: {
        title: () => g("Preview"),
        action: () => {
          t.emit("vf-modal-show", { type: "preview", adapter: c.current.adapter, item: u.value[0] });
        }
      },
      open: {
        title: () => g("Open"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: c.current.adapter, path: u.value[0].path } });
        }
      },
      openDir: {
        title: () => g("Open containing folder"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: c.current.adapter, path: u.value[0].dir } });
        }
      },
      download: {
        title: () => g("Download"),
        action: () => {
          const _ = o.value + "?" + oe({ q: "download", adapter: c.current.adapter, path: u.value[0].path });
          t.emit("vf-download", _);
        }
      },
      archive: {
        title: () => g("Archive"),
        action: () => {
          t.emit("vf-modal-show", { type: "archive", items: u });
        }
      },
      unarchive: {
        title: () => g("Unarchive"),
        action: () => {
          t.emit("vf-modal-show", { type: "unarchive", items: u });
        }
      },
      rename: {
        title: () => g("Rename"),
        action: () => {
          t.emit("vf-modal-show", { type: "rename", items: u });
        }
      }
    }, n = (_) => {
      t.emit("vf-contextmenu-hide"), _.action();
    }, x = k("");
    t.on("vf-search-query", ({ newQuery: _ }) => {
      x.value = _;
    }), t.on("vf-contextmenu-show", ({ event: _, area: j, items: w, target: z = null }) => {
      if (l.items = [], x.value)
        if (z)
          l.items.push(i.openDir), t.emit("vf-context-selected", [z]);
        else
          return;
      else
        !z && !x.value ? (l.items.push(i.refresh), l.items.push(i.newfolder), t.emit("vf-context-selected", [])) : w.length > 1 && w.some((D) => D.path === z.path) ? (l.items.push(i.refresh), l.items.push(i.archive), l.items.push(i.delete), t.emit("vf-context-selected", w)) : (z.type == "dir" ? l.items.push(i.open) : (l.items.push(i.preview), l.items.push(i.download)), l.items.push(i.rename), z.mime_type == "application/zip" ? l.items.push(i.unarchive) : l.items.push(i.archive), l.items.push(i.delete), t.emit("vf-context-selected", [z]));
      M(_, j);
    }), t.on("vf-contextmenu-hide", () => {
      l.active = !1;
    });
    const M = (_, j) => {
      l.active = !0, pe(() => {
        const w = p.value.getBoundingClientRect(), z = j.getBoundingClientRect();
        let D = _.pageX - w.left, C = _.pageY - w.top, $ = s.value.offsetHeight, O = s.value.offsetWidth;
        D = z.right - _.pageX + window.scrollX < O ? D - O : D, C = z.bottom - _.pageY + window.scrollY < $ ? C - $ : C, l.positions = {
          left: D + "px",
          top: C + "px"
        };
      });
    };
    return (_, j) => l.active ? (a(), m("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: s,
      style: Se(l.positions)
    }, [
      (a(!0), m(I, null, P(l.items, (w) => (a(), m("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: w.title,
        onClick: (z) => n(w)
      }, [
        js,
        e("span", null, v(w.title()), 1)
      ], 8, $s))), 128))
    ], 4)) : L("", !0);
  }
}), Ss = (d, t) => {
  const s = d[t];
  return s ? typeof s == "function" ? s() : Promise.resolve(s) : new Promise((o, p) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(p.bind(null, new Error("Unknown variable dynamic import: " + t)));
  });
};
async function Ds(d) {
  return (await Ss(/* @__PURE__ */ Object.assign({ "../locales/de.js": () => import("./de-bb2cbcd2.js"), "../locales/en.js": () => import("./en-36ebc9b3.js"), "../locales/fa.js": () => import("./fa-38a6b855.js"), "../locales/he.js": () => import("./he-ed562a13.js"), "../locales/hi.js": () => import("./hi-6bb62179.js"), "../locales/ru.js": () => import("./ru-02b5dcbe.js"), "../locales/sv.js": () => import("./sv-0c0f15f4.js"), "../locales/tr.js": () => import("./tr-410a966d.js"), "../locales/zhCN.js": () => import("./zhCN-f37edc4d.js"), "../locales/zhTW.js": () => import("./zhTW-0fd6dd31.js") }), `../locales/${d}.js`)).default;
}
function Os(d, t, s) {
  const { getStore: o, setStore: p } = xe(d), c = k({}), l = (n, x = "en") => {
    Ds(n).then((M) => {
      c.value = M, p("locale", n), p("translations", M), s.emit("vf-toast-push", { label: "The language is set to " + n });
    }).catch((M) => {
      x ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(x, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  o("locale") ? c.value = o("translations") : l(t);
  const u = (n, ...x) => x.length ? u(n = n.replace("%s", x.shift()), ...x) : n;
  function g(n, ...x) {
    return c.value.hasOwnProperty(n) ? u(c.value[n], ...x) : u(n, ...x);
  }
  function i() {
    return o("locale");
  }
  return { t: g, changeLocale: l, getLocale: i };
}
const zs = /* @__PURE__ */ e("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), Es = {
  name: "VueFinder"
}, Fs = /* @__PURE__ */ Object.assign(Es, {
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
    usePropDarkMode: {
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
  setup(d) {
    const t = d, s = Be(), { setStore: o, getStore: p } = xe(t.id), c = k(p("adapter")), l = k(null);
    W("root", l), W("emitter", s), W("storage", xe(t.id)), W("postData", t.postData), W("adapter", c), W("maxFileSize", t.maxFileSize), W("usePropDarkMode", t.usePropDarkMode);
    const u = Os(t.id, t.locale, s);
    W("i18n", u);
    const { apiUrl: g, setApiUrl: i } = J();
    i(t.url);
    const n = ce({ adapter: c.value, storages: [], dirname: ".", files: [] }), x = k(p("viewport", "grid")), M = t.usePropDarkMode ? Ve(() => t.dark) : k(p("darkMode", t.dark));
    s.on("vf-darkMode-toggle", () => {
      M.value = !M.value, o("darkMode", M.value);
    });
    const _ = k(!1);
    W("loadingState", _);
    const j = k(p("full-screen", !1));
    s.on("vf-fullscreen-toggle", () => {
      j.value = !j.value, o("full-screen", j.value);
    }), s.on("vf-view-toggle", (C) => {
      x.value = C;
    });
    const w = ce({
      active: !1,
      type: "delete",
      data: {}
    });
    s.on("vf-modal-close", () => {
      w.active = !1;
    }), s.on("vf-modal-show", (C) => {
      w.active = !0, w.type = C.type, w.data = C;
    });
    const z = (C) => {
      Object.assign(n, C), s.emit("vf-nodes-selected", {}), s.emit("vf-explorer-update");
    };
    let D;
    return s.on("vf-fetch-abort", () => {
      D.abort(), _.value = !1;
    }), s.on("vf-fetch", ({ params: C, onSuccess: $ = null, onError: O = null, noCloseModal: V = !1 }) => {
      ["index", "search"].includes(C.q) && (D && D.abort(), _.value = !0), D = new AbortController();
      const E = D.signal;
      me(g.value, { params: C, signal: E }).then((q) => {
        c.value = q.adapter, ["index", "search"].includes(C.q) && (_.value = !1), V || s.emit("vf-modal-close"), z(q), $(q);
      }).catch((q) => {
        O && O(q);
      }).finally(() => {
      });
    }), s.on("vf-download", (C) => {
      document.getElementById("download_frame").src = C, s.emit("vf-modal-close");
    }), Y(() => {
      s.emit("vf-fetch", { params: { q: "index", adapter: c.value } });
    }), (C, $) => (a(), m("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: l
    }, [
      e("div", {
        class: U(r(M) ? "dark" : "")
      }, [
        e("div", {
          class: U([j.value ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
          style: Se(j.value ? "" : "max-height: " + d.maxHeight),
          onMousedown: $[0] || ($[0] = (O) => r(s).emit("vf-contextmenu-hide")),
          onTouchstart: $[1] || ($[1] = (O) => r(s).emit("vf-contextmenu-hide"))
        }, [
          G(zt, { data: n }, null, 8, ["data"]),
          G(_s, { data: n }, null, 8, ["data"]),
          G(zo, {
            view: x.value,
            data: n
          }, null, 8, ["view", "data"]),
          G(Ko, { data: n }, null, 8, ["data"])
        ], 38),
        w.active ? (a(), H(Ne("v-f-modal-" + w.type), {
          key: 0,
          selection: w.data,
          current: n
        }, null, 8, ["selection", "current"])) : L("", !0),
        G(Ms, { current: n }, null, 8, ["current"]),
        zs
      ], 2)
    ], 512));
  }
}), Ls = /* @__PURE__ */ e("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), Vs = { class: "fixed z-10 inset-0 overflow-hidden" }, Ns = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, Bs = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, As = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, K = {
  __name: "ModalLayout",
  setup(d) {
    const t = b("emitter");
    return Y(() => {
      const s = document.querySelector(".v-f-modal input");
      s && s.focus();
    }), (s, o) => (a(), m("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = se((p) => r(t).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Ls,
      e("div", Vs, [
        e("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: o[0] || (o[0] = X((p) => r(t).emit("vf-modal-close"), ["self"]))
        }, [
          e("div", Ns, [
            e("div", Bs, [
              ke(s.$slots, "default")
            ]),
            e("div", As, [
              ke(s.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Hs = ["aria-label"], Ts = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Us = [
  Ts
], Is = {
  name: "Message"
}, Q = /* @__PURE__ */ Object.assign(Is, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(d, { emit: t }) {
    var g;
    const { t: s } = b("i18n"), o = k(!1), p = k(null), c = k((g = p.value) == null ? void 0 : g.strMessage), l = t;
    ve(c, () => o.value = !1);
    const u = () => {
      l("hidden"), o.value = !0;
    };
    return (i, n) => (a(), m("div", null, [
      o.value ? L("", !0) : (a(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: p,
        class: U(["flex mt-2 p-1 px-2 rounded text-sm break-all", d.error ? "bg-red-100 text-red-600 dark:bg-red-950" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-950"])
      }, [
        ke(i.$slots, "default"),
        e("div", {
          class: "ml-auto cursor-pointer",
          onClick: u,
          "aria-label": r(s)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, Us, 8, Hs)
      ], 2))
    ]));
  }
}), qs = { class: "sm:flex sm:items-start" }, Rs = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Ps = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Gs = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ys = { class: "mt-2" }, Js = { class: "text-sm text-gray-500" }, Ks = {
  class: "text-gray-500 text-sm mb-1 overflow-auto",
  style: { "max-height": "200px" }
}, Ws = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Xs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qs = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Zs = [
  Qs
], er = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, tr = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), or = [
  tr
], sr = { class: "ml-1.5" }, rr = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, ar = {
  name: "VFModalDelete"
}, nr = /* @__PURE__ */ Object.assign(ar, {
  props: {
    selection: Object,
    current: Object
  },
  setup(d) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), { t: o } = b("i18n"), p = d, c = k(p.selection.items), l = k(""), u = () => {
      c.value.length && t.emit("vf-fetch", {
        params: {
          q: "delete",
          adapter: s.value,
          path: p.current.dirname,
          items: JSON.stringify(c.value.map(({ path: g, type: i }) => ({ path: g, type: i })))
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("Files deleted.") });
        },
        onError: (g) => {
          l.value = o(g.message);
        }
      });
    };
    return (g, i) => (a(), H(K, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: u,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Yes, Delete!")), 1),
        e("button", {
          type: "button",
          onClick: i[1] || (i[1] = (n) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Cancel")), 1),
        e("div", rr, v(r(o)("This action cannot be undone.")), 1)
      ]),
      default: N(() => [
        e("div", qs, [
          Rs,
          e("div", Ps, [
            e("h3", Gs, v(r(o)("Delete files")), 1),
            e("div", Ys, [
              e("p", Js, v(r(o)("Are you sure you want to delete these files?")), 1),
              e("div", Ks, [
                (a(!0), m(I, null, P(c.value, (n) => (a(), m("p", Ws, [
                  n.type === "dir" ? (a(), m("svg", Xs, Zs)) : (a(), m("svg", er, or)),
                  e("span", sr, v(n.basename), 1)
                ]))), 256))
              ]),
              l.value.length ? (a(), H(Q, {
                key: 0,
                onHidden: i[0] || (i[0] = (n) => l.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(l.value), 1)
                ]),
                _: 1
              })) : L("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), lr = { class: "sm:flex sm:items-start" }, ir = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), dr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, cr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ur = { class: "mt-2" }, mr = { class: "text-sm text-gray-500" }, vr = {
  name: "VFModalMessage"
}, pr = /* @__PURE__ */ Object.assign(vr, {
  props: {
    selection: Object
  },
  setup(d) {
    const t = b("emitter"), { t: s } = b("i18n");
    return (o, p) => (a(), H(K, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: p[0] || (p[0] = (c) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(s)("Close")), 1)
      ]),
      default: N(() => {
        var c, l;
        return [
          e("div", lr, [
            ir,
            e("div", dr, [
              e("h3", cr, v(((c = d.selection) == null ? void 0 : c.title) ?? "Title"), 1),
              e("div", ur, [
                e("p", mr, v(((l = d.selection) == null ? void 0 : l.message) ?? "Message"), 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), fr = { class: "sm:flex sm:items-start" }, gr = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), hr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, kr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, xr = { class: "mt-2" }, br = { class: "text-sm text-gray-500" }, wr = ["placeholder"], yr = {
  name: "VFModalNewFolder"
}, _r = /* @__PURE__ */ Object.assign(yr, {
  props: {
    selection: Object,
    current: Object
  },
  setup(d) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), { t: o } = b("i18n"), p = d, c = k(""), l = k(""), u = () => {
      c.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfolder",
          adapter: s.value,
          path: p.current.dirname,
          name: c.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("%s is created.", c.value) });
        },
        onError: (g) => {
          l.value = o(g.message);
        }
      });
    };
    return (g, i) => (a(), H(K, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: u,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Create")), 1),
        e("button", {
          type: "button",
          onClick: i[2] || (i[2] = (n) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Cancel")), 1)
      ]),
      default: N(() => [
        e("div", fr, [
          gr,
          e("div", hr, [
            e("h3", kr, v(r(o)("New Folder")), 1),
            e("div", xr, [
              e("p", br, v(r(o)("Create a new folder")), 1),
              R(e("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (n) => c.value = n),
                onKeyup: se(u, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(o)("Folder Name"),
                type: "text"
              }, null, 40, wr), [
                [re, c.value]
              ]),
              l.value.length ? (a(), H(Q, {
                key: 0,
                onHidden: i[1] || (i[1] = (n) => l.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(l.value), 1)
                ]),
                _: 1
              })) : L("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), $r = { class: "sm:flex sm:items-start" }, jr = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), Cr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Mr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Sr = { class: "mt-2" }, Dr = { class: "text-sm text-gray-500" }, Or = ["placeholder"], zr = {
  name: "VFModalNewFile"
}, Er = /* @__PURE__ */ Object.assign(zr, {
  props: {
    selection: Object,
    current: Object
  },
  setup(d) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), { t: o } = b("i18n"), p = d, c = k(""), l = k(""), u = () => {
      c.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfile",
          adapter: s.value,
          path: p.current.dirname,
          name: c.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("%s is created.", c.value) });
        },
        onError: (g) => {
          l.value = o(g.message);
        }
      });
    };
    return (g, i) => (a(), H(K, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: u,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Create")), 1),
        e("button", {
          type: "button",
          onClick: i[2] || (i[2] = (n) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Cancel")), 1)
      ]),
      default: N(() => [
        e("div", $r, [
          jr,
          e("div", Cr, [
            e("h3", Mr, v(r(o)("New File")), 1),
            e("div", Sr, [
              e("p", Dr, v(r(o)("Create a new file")), 1),
              R(e("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (n) => c.value = n),
                onKeyup: se(u, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(o)("File Name"),
                type: "text"
              }, null, 40, Or), [
                [re, c.value]
              ]),
              l.value.length ? (a(), H(Q, {
                key: 0,
                onHidden: i[1] || (i[1] = (n) => l.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(l.value), 1)
                ]),
                _: 1
              })) : L("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fr = { class: "flex" }, Lr = ["aria-label"], Vr = { class: "ml-auto mb-2" }, Nr = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, Br = { key: 1 }, Ar = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(d, { emit: t }) {
    const s = t, o = k(""), p = k(""), c = k(null), l = k(!1), { apiUrl: u } = J(), g = d, i = k(""), n = k(!1), { t: x } = b("i18n");
    Y(() => {
      me(u.value, {
        params: { q: "preview", adapter: g.selection.adapter, path: g.selection.item.path },
        json: !1
      }).then((w) => {
        o.value = w, s("load");
      });
    });
    const M = () => {
      l.value = !l.value, p.value = o.value, l.value == !0 && pe(() => {
        c.value.focus();
      });
    }, _ = b("postData"), j = () => {
      i.value = "", n.value = !1, me(u.value, {
        method: "POST",
        params: Object.assign(_, {
          q: "save",
          adapter: g.selection.adapter,
          path: g.selection.item.path,
          content: p.value
        }),
        json: !1
      }).then((w) => {
        i.value = x("Updated."), o.value = w, s("load"), l.value = !l.value;
      }).catch((w) => {
        i.value = x(w.message), n.value = !0;
      });
    };
    return (w, z) => (a(), m(I, null, [
      e("div", Fr, [
        e("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": d.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, v(d.selection.item.basename), 9, Lr),
        e("div", Vr, [
          l.value ? (a(), m("button", {
            key: 0,
            onClick: j,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, v(r(x)("Save")), 1)) : L("", !0),
          e("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: z[0] || (z[0] = (D) => M())
          }, v(l.value ? r(x)("Cancel") : r(x)("Edit")), 1)
        ])
      ]),
      e("div", null, [
        l.value ? (a(), m("div", Br, [
          R(e("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": z[1] || (z[1] = (D) => p.value = D),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [re, p.value]
          ])
        ])) : (a(), m("pre", Nr, v(o.value), 1)),
        i.value.length ? (a(), H(Q, {
          key: 2,
          onHidden: z[2] || (z[2] = (D) => i.value = ""),
          error: n.value
        }, {
          default: N(() => [
            T(v(i.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : L("", !0)
      ])
    ], 64));
  }
}, Hr = { class: "flex" }, Tr = ["aria-label"], Ur = { class: "ml-auto mb-2" }, Ir = { class: "w-full flex justify-center" }, qr = ["src"], Rr = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(d, { emit: t }) {
    const s = t, o = d, { t: p } = b("i18n"), { apiUrl: c } = J(), l = k(null), u = k(null), g = k(!1), i = k(""), n = k(!1), x = () => {
      g.value = !g.value, g.value ? u.value = new Te(l.value, {
        crop(j) {
        }
      }) : u.value.destroy();
    }, M = b("postData"), _ = () => {
      u.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (j) => {
          i.value = "", n.value = !1, me(c.value, {
            method: "POST",
            params: Object.assign(M, {
              q: "upload",
              adapter: o.selection.adapter,
              path: o.selection.item.path,
              file: j
            }),
            name: o.selection.item.basename,
            json: !1
          }).then((w) => {
            i.value = p("Updated."), l.value.src = be(o.selection.adapter, o.selection.item.path), x(), s("load");
          }).catch((w) => {
            i.value = p(w.message), n.value = !0;
          });
        }
      );
    };
    return Y(() => {
      s("load");
    }), (j, w) => (a(), m(I, null, [
      e("div", Hr, [
        e("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": d.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, v(d.selection.item.basename), 9, Tr),
        e("div", Ur, [
          g.value ? (a(), m("button", {
            key: 0,
            onClick: _,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, v(r(p)("Crop")), 1)) : L("", !0),
          e("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: w[0] || (w[0] = (z) => x())
          }, v(g.value ? r(p)("Cancel") : r(p)("Edit")), 1)
        ])
      ]),
      e("div", Ir, [
        e("img", {
          ref_key: "image",
          ref: l,
          class: "max-w-[50vh] max-h-[50vh]",
          src: r(be)(o.selection.adapter, o.selection.item.path),
          alt: ""
        }, null, 8, qr)
      ]),
      i.value.length ? (a(), H(Q, {
        key: 0,
        onHidden: w[1] || (w[1] = (z) => i.value = ""),
        error: n.value
      }, {
        default: N(() => [
          T(v(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : L("", !0)
    ], 64));
  }
}, Pr = { class: "flex" }, Gr = ["aria-label"], Yr = /* @__PURE__ */ e("div", null, null, -1), Jr = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(d, { emit: t }) {
    const s = t;
    return Y(() => {
      s("load");
    }), (o, p) => (a(), m(I, null, [
      e("div", Pr, [
        e("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": d.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, v(d.selection.item.basename), 9, Gr)
      ]),
      Yr
    ], 64));
  }
}, Kr = ["aria-label"], Wr = {
  class: "w-full",
  preload: "",
  controls: ""
}, Xr = ["src"], Qr = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(d, { emit: t }) {
    const { apiUrl: s } = J(), o = d, p = t, c = () => s.value + "?" + oe({ q: "preview", adapter: o.selection.adapter, path: o.selection.item.path });
    return Y(() => {
      p("load");
    }), (l, u) => (a(), m(I, null, [
      e("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": d.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, v(d.selection.item.basename), 9, Kr),
      e("div", null, [
        e("video", Wr, [
          e("source", {
            src: c(),
            type: "video/mp4"
          }, null, 8, Xr),
          T(" Your browser does not support the video tag. ")
        ])
      ])
    ], 64));
  }
}, Zr = ["aria-label"], ea = {
  class: "w-full",
  controls: ""
}, ta = ["src"], oa = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(d, { emit: t }) {
    const { apiUrl: s } = J(), o = d, p = t, c = () => s.value + "?" + oe({ q: "preview", adapter: o.selection.adapter, path: o.selection.item.path });
    return Y(() => {
      p("load");
    }), (l, u) => (a(), m(I, null, [
      e("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": d.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, v(d.selection.item.basename), 9, Zr),
      e("div", null, [
        e("audio", ea, [
          e("source", {
            src: c(),
            type: "audio/mpeg"
          }, null, 8, ta),
          T(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, sa = ["aria-label"], ra = ["data"], aa = ["src"], na = /* @__PURE__ */ e("p", null, [
  /* @__PURE__ */ T(" Your browser does not support PDFs. "),
  /* @__PURE__ */ e("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ T(" . ")
], -1), la = [
  na
], ia = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(d, { emit: t }) {
    const { apiUrl: s } = J(), o = d, p = t, c = () => s.value + "?" + oe({ q: "preview", adapter: o.selection.adapter, path: o.selection.item.path });
    return Y(() => {
      p("load");
    }), (l, u) => (a(), m(I, null, [
      e("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": d.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, v(d.selection.item.basename), 9, sa),
      e("div", null, [
        e("object", {
          class: "h-[60vh]",
          data: c(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          e("iframe", {
            class: "border-0",
            src: c(),
            width: "100%",
            height: "100%"
          }, la, 8, aa)
        ], 8, ra)
      ])
    ], 64));
  }
}, da = { class: "sm:flex sm:items-start" }, ca = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, ua = { class: "text-gray-700 dark:text-gray-200 text-sm" }, ma = {
  key: 0,
  class: "flex leading-5"
}, va = /* @__PURE__ */ e("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ e("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ e("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), pa = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, fa = { class: "font-bold pl-2" }, ga = { class: "font-bold pl-2" }, ha = {
  name: "VFModalPreview"
}, ka = /* @__PURE__ */ Object.assign(ha, {
  props: {
    selection: Object
  },
  setup(d) {
    const { apiUrl: t } = J(), s = b("emitter"), { t: o } = b("i18n"), p = k(!1), c = (i) => p.value = i, l = d, u = (i) => (l.selection.item.mime_type ?? "").startsWith(i), g = () => {
      const i = t.value + "?" + oe({ q: "download", adapter: l.selection.adapter, path: l.selection.item.path });
      s.emit("vf-download", i);
    };
    return (i, n) => (a(), H(K, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: n[6] || (n[6] = (x) => r(s).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Close")), 1),
        e("button", {
          type: "button",
          onClick: n[7] || (n[7] = (x) => g()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Download")), 1)
      ]),
      default: N(() => [
        e("div", da, [
          e("div", ca, [
            e("div", null, [
              u("text") ? (a(), H(Ar, {
                key: 0,
                selection: d.selection,
                onLoad: n[0] || (n[0] = (x) => c(!0))
              }, null, 8, ["selection"])) : u("image") ? (a(), H(Rr, {
                key: 1,
                selection: d.selection,
                onLoad: n[1] || (n[1] = (x) => c(!0))
              }, null, 8, ["selection"])) : u("video") ? (a(), H(Qr, {
                key: 2,
                selection: d.selection,
                onLoad: n[2] || (n[2] = (x) => c(!0))
              }, null, 8, ["selection"])) : u("audio") ? (a(), H(oa, {
                key: 3,
                selection: d.selection,
                onLoad: n[3] || (n[3] = (x) => c(!0))
              }, null, 8, ["selection"])) : u("application/pdf") ? (a(), H(ia, {
                key: 4,
                selection: d.selection,
                onLoad: n[4] || (n[4] = (x) => c(!0))
              }, null, 8, ["selection"])) : (a(), H(Jr, {
                key: 5,
                selection: d.selection,
                onLoad: n[5] || (n[5] = (x) => c(!0))
              }, null, 8, ["selection"]))
            ]),
            e("div", ua, [
              p.value == !1 ? (a(), m("div", ma, [
                va,
                e("span", null, v(r(o)("Loading")), 1)
              ])) : L("", !0)
            ])
          ])
        ]),
        e("div", pa, [
          e("div", null, [
            e("span", fa, v(r(o)("File Size")) + ": ", 1),
            T(v(r(ye)(d.selection.item.file_size)), 1)
          ]),
          e("div", null, [
            e("span", ga, v(r(o)("Last Modified")) + ": ", 1),
            T(" " + v(r(De)(d.selection.item.last_modified)), 1)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), xa = { class: "sm:flex sm:items-start" }, ba = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), wa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ya = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, _a = { class: "mt-2" }, $a = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, ja = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ca = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ma = [
  Ca
], Sa = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Da = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Oa = [
  Da
], za = { class: "ml-1.5" }, Ea = {
  name: "VFModalRename"
}, Fa = /* @__PURE__ */ Object.assign(Ea, {
  props: {
    selection: Object,
    current: Object
  },
  setup(d) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), { t: o } = b("i18n"), p = d, c = k(p.selection.items[0]), l = k(p.selection.items[0].basename), u = k(""), g = () => {
      l.value != "" && t.emit("vf-fetch", {
        params: {
          q: "rename",
          adapter: s.value,
          path: p.current.dirname,
          item: c.value.path,
          name: l.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("%s is renamed.", l.value) });
        },
        onError: (i) => {
          u.value = o(i.message);
        }
      });
    };
    return (i, n) => (a(), H(K, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Rename")), 1),
        e("button", {
          type: "button",
          onClick: n[2] || (n[2] = (x) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Cancel")), 1)
      ]),
      default: N(() => [
        e("div", xa, [
          ba,
          e("div", wa, [
            e("h3", ya, v(r(o)("Rename")), 1),
            e("div", _a, [
              e("p", $a, [
                c.value.type == "dir" ? (a(), m("svg", ja, Ma)) : (a(), m("svg", Sa, Oa)),
                e("span", za, v(c.value.basename), 1)
              ]),
              R(e("input", {
                "onUpdate:modelValue": n[0] || (n[0] = (x) => l.value = x),
                onKeyup: se(g, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [re, l.value]
              ]),
              u.value.length ? (a(), H(Q, {
                key: 0,
                onHidden: n[1] || (n[1] = (x) => u.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(u.value), 1)
                ]),
                _: 1
              })) : L("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), La = { class: "sm:flex sm:items-start" }, Va = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), Na = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ba = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Aa = { class: "mt-2" }, Ha = {
  key: 0,
  class: "pointer-events-none"
}, Ta = {
  key: 1,
  class: "pointer-events-none"
}, Ua = ["disabled"], Ia = ["disabled"], qa = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, Ra = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, Pa = ["textContent"], Ga = { class: "ml-1 w-full h-fit" }, Ya = { class: "text-left hidden md:block" }, Ja = { class: "text-left md:hidden" }, Ka = {
  key: 0,
  class: "ml-auto"
}, Wa = ["title", "disabled", "onClick"], Xa = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Qa = [
  Xa
], Za = {
  key: 0,
  class: "py-2"
}, en = ["disabled"], tn = {
  name: "VFModalUpload"
}, on = /* @__PURE__ */ Object.assign(tn, {
  props: {
    current: Object
  },
  setup(d) {
    const { apiUrl: t } = J(), s = b("emitter"), { t: o, getLocale: p } = b("i18n"), c = b("maxFileSize"), l = b("postData"), u = d, g = o("uppy"), i = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, n = k({ QUEUE_ENTRY_STATUS: i }), x = k(null), M = k(null), _ = k(null), j = k(null), w = k(null), z = k(null), D = k([]), C = k(""), $ = k(!1), O = k(!1);
    let V;
    function E(h) {
      return D.value.findIndex((B) => B.id === h);
    }
    function q(h, B = null) {
      B = B ?? (h.webkitRelativePath || h.name), V.addFile({
        name: B,
        type: h.type,
        data: h,
        source: "Local"
      });
    }
    function ee(h) {
      switch (h.status) {
        case i.DONE:
          return "text-green-600";
        case i.ERROR:
          return "text-red-600";
        case i.CANCELED:
          return "text-red-600";
        case i.PENDING:
        default:
          return "";
      }
    }
    const Z = (h) => {
      switch (h.status) {
        case i.DONE:
          return "✓";
        case i.ERROR:
        case i.CANCELED:
          return "!";
        case i.PENDING:
        default:
          return "...";
      }
    };
    function ne() {
      j.value.click();
    }
    function le() {
      if (!$.value) {
        if (!D.value.filter((h) => h.status !== i.DONE).length) {
          C.value = o("Please select file to upload first.");
          return;
        }
        C.value = "", V.retryAll(), V.upload();
      }
    }
    function ie() {
      V.cancelAll({ reason: "user" }), D.value.forEach((h) => {
        h.status !== i.DONE && (h.status = i.CANCELED, h.statusName = o("Canceled"));
      }), $.value = !1;
    }
    function fe(h) {
      $.value || (V.removeFile(h.id, "removed-by-user"), D.value.splice(E(h.id), 1));
    }
    function y(h) {
      if (!$.value) {
        if (V.cancelAll({ reason: "user" }), h) {
          const B = [];
          D.value.forEach((f) => {
            f.status !== i.DONE && B.push(f);
          }), D.value = [], B.forEach((f) => {
            q(f.originalFile, f.name);
          });
          return;
        }
        D.value.splice(0);
      }
    }
    function S() {
      s.emit("vf-modal-close");
    }
    return Y(async () => {
      V = new Ue({
        debug: process.env.NODE_ENV === "development",
        restrictions: {
          maxFileSize: Et(c)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: g,
        onBeforeFileAdded(f, F) {
          if (F[f.id] != null) {
            const te = E(f.id);
            D.value[te].status === i.PENDING && (C.value = V.i18n("noDuplicates", { fileName: f.name })), D.value = D.value.filter((ge) => ge.id !== f.id);
          }
          return D.value.push({
            id: f.id,
            name: f.name,
            size: ye(f.size),
            status: i.PENDING,
            statusName: o("Pending upload"),
            percent: null,
            originalFile: f.data
          }), !0;
        }
      }), V.use(Ie, {
        method: "post",
        endpoint: t.value + "?" + oe(Object.assign(l, { q: "upload", adapter: u.current.adapter, path: u.current.dirname })),
        headers: {
          ...ue && { "X-CSRF-Token": ue }
        },
        limit: 5,
        timeout: 0,
        getResponseError(f, F) {
          let A;
          try {
            A = JSON.parse(f).message;
          } catch {
            A = o("Cannot parse server response.");
          }
          return new Error(A);
        }
      }), V.on("restriction-failed", (f, F) => {
        C.value = F.message;
      }), V.on("upload", () => {
        $.value = !0, D.value.forEach((f) => {
          f.status !== i.DONE && (f.percent = null, f.status = i.UPLOADING, f.statusName = o("Pending upload"));
        });
      }), V.on("upload-progress", (f, F) => {
        const A = Math.floor(F.bytesUploaded / F.bytesTotal * 100);
        D.value[E(f.id)].percent = `${A}%`;
      }), V.on("upload-success", (f) => {
        const F = D.value[E(f.id)];
        F.status = i.DONE, F.statusName = o("Done");
      }), V.on("upload-error", (f, F) => {
        const A = D.value[E(f.id)];
        A.percent = null, A.status = i.ERROR, F.isNetworkError ? A.statusName = o("Network Error, Unable establish connection to the server or interrupted.") : A.statusName = F ? F.message : o("Unknown Error");
      }), V.on("error", (f) => {
        C.value = f.message, $.value = !1, s.emit("vf-fetch", {
          params: { q: "index", adapter: u.current.adapter, path: u.current.dirname },
          noCloseModal: !0
        });
      }), V.on("complete", () => {
        $.value = !1, s.emit("vf-fetch", {
          params: { q: "index", adapter: u.current.adapter, path: u.current.dirname },
          noCloseModal: !0
        });
      }), j.value.addEventListener("click", () => {
        M.value.click();
      }), w.value.addEventListener("click", () => {
        _.value.click();
      }), z.value.addEventListener("dragover", (f) => {
        f.preventDefault(), O.value = !0;
      }), z.value.addEventListener("dragleave", (f) => {
        f.preventDefault(), O.value = !1;
      });
      function h(f, F) {
        F.isFile && F.file((A) => f(F, A)), F.isDirectory && F.createReader().readEntries((A) => {
          A.forEach((te) => {
            h(f, te);
          });
        });
      }
      z.value.addEventListener("drop", (f) => {
        f.preventDefault(), O.value = !1;
        const F = /^[/\\](.+)/;
        [...f.dataTransfer.items].forEach((A) => {
          A.kind === "file" && h((te, ge) => {
            const Oe = F.exec(te.fullPath);
            q(ge, Oe[1]);
          }, A.webkitGetAsEntry());
        });
      });
      const B = ({ target: f }) => {
        const F = f.files;
        for (const A of F)
          q(A);
      };
      M.value.addEventListener("change", B), _.value.addEventListener("change", B);
    }), Ce(() => {
      V == null || V.close({ reason: "unmount" });
    }), (h, B) => (a(), H(K, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          class: U(["w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:text-gray-50 sm:ml-3 sm:w-auto sm:text-sm", $.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: $.value,
          onClick: X(le, ["prevent"])
        }, v(r(o)("Upload")), 11, en),
        $.value ? (a(), m("button", {
          key: 0,
          type: "button",
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
          onClick: X(ie, ["prevent"])
        }, v(r(o)("Cancel")), 1)) : (a(), m("button", {
          key: 1,
          type: "button",
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
          onClick: X(S, ["prevent"])
        }, v(r(o)("Close")), 1))
      ]),
      default: N(() => [
        e("div", La, [
          Va,
          e("div", Na, [
            e("h3", Ba, v(r(o)("Upload Files")), 1),
            e("div", Aa, [
              e("div", {
                ref_key: "dropArea",
                ref: z,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: ne
              }, [
                O.value ? (a(), m("div", Ha, v(r(o)("Release to drop these files.")), 1)) : (a(), m("div", Ta, v(r(o)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              e("div", {
                ref_key: "container",
                ref: x,
                class: "text-gray-500 mb-1"
              }, [
                e("button", {
                  ref_key: "pickFiles",
                  ref: j,
                  type: "button",
                  class: "w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto sm:text-sm"
                }, v(r(o)("Select Files")), 513),
                e("button", {
                  ref_key: "pickFolders",
                  ref: w,
                  type: "button",
                  class: "w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                }, v(r(o)("Select Folders")), 513),
                e("button", {
                  type: "button",
                  class: "w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
                  disabled: $.value,
                  onClick: B[0] || (B[0] = (f) => y(!1))
                }, v(r(o)("Clear all")), 9, Ua),
                e("button", {
                  type: "button",
                  class: "w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 disabled:cursor-not-allowed sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
                  disabled: $.value,
                  onClick: B[1] || (B[1] = (f) => y(!0))
                }, v(r(o)("Clear only successful")), 9, Ia)
              ], 512),
              e("div", qa, [
                (a(!0), m(I, null, P(D.value, (f) => (a(), m("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: f.id
                }, [
                  e("span", Ra, [
                    e("span", {
                      class: U(["text-base m-auto", ee(f)]),
                      textContent: v(Z(f))
                    }, null, 10, Pa)
                  ]),
                  e("div", Ga, [
                    e("div", Ya, v(r(we)(f.name, 40)) + " (" + v(f.size) + ")", 1),
                    e("div", Ja, v(r(we)(f.name, 16)) + " (" + v(f.size) + ")", 1),
                    e("div", {
                      class: U(["flex break-all text-left", ee(f)])
                    }, [
                      T(v(f.statusName) + " ", 1),
                      f.status === n.value.QUEUE_ENTRY_STATUS.UPLOADING ? (a(), m("b", Ka, v(f.percent), 1)) : L("", !0)
                    ], 2)
                  ]),
                  e("button", {
                    type: "button",
                    class: U(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", $.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: r(o)("Delete"),
                    disabled: $.value,
                    onClick: (F) => fe(f)
                  }, Qa, 10, Wa)
                ]))), 128)),
                D.value.length ? L("", !0) : (a(), m("div", Za, v(r(o)("No files selected!")), 1))
              ])
            ])
          ])
        ]),
        e("input", {
          ref_key: "internalFileInput",
          ref: M,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        e("input", {
          ref_key: "internalFolderInput",
          ref: _,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}), sn = { class: "sm:flex sm:items-start" }, rn = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), an = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, nn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ln = { class: "mt-2" }, dn = {
  class: "text-gray-500 text-sm mb-1 overflow-auto",
  style: { "max-height": "200px" }
}, cn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, un = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), vn = [
  mn
], pn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), gn = [
  fn
], hn = { class: "ml-1.5" }, kn = ["placeholder"], xn = {
  name: "VFModalArchive"
}, bn = /* @__PURE__ */ Object.assign(xn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(d) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), { t: o } = b("i18n"), p = d, c = k(""), l = k(""), u = k(p.selection.items), g = () => {
      u.value.length && t.emit("vf-fetch", {
        params: {
          q: "archive",
          adapter: s.value,
          path: p.current.dirname,
          items: JSON.stringify(u.value.map(({ path: i, type: n }) => ({ path: i, type: n }))),
          name: c.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("The file(s) archived.") });
        },
        onError: (i) => {
          l.value = o(i.message);
        }
      });
    };
    return (i, n) => (a(), H(K, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Archive")), 1),
        e("button", {
          type: "button",
          onClick: n[2] || (n[2] = (x) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Cancel")), 1)
      ]),
      default: N(() => [
        e("div", sn, [
          rn,
          e("div", an, [
            e("h3", nn, v(r(o)("Archive the files")), 1),
            e("div", ln, [
              e("div", dn, [
                (a(!0), m(I, null, P(u.value, (x) => (a(), m("p", cn, [
                  x.type == "dir" ? (a(), m("svg", un, vn)) : (a(), m("svg", pn, gn)),
                  e("span", hn, v(x.basename), 1)
                ]))), 256))
              ]),
              R(e("input", {
                "onUpdate:modelValue": n[0] || (n[0] = (x) => c.value = x),
                onKeyup: se(g, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(o)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, kn), [
                [re, c.value]
              ]),
              l.value.length ? (a(), H(Q, {
                key: 0,
                onHidden: n[1] || (n[1] = (x) => l.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(l.value), 1)
                ]),
                _: 1
              })) : L("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), wn = { class: "sm:flex sm:items-start" }, yn = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), _n = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, $n = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, jn = { class: "mt-2" }, Cn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Mn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Sn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Dn = [
  Sn
], On = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), En = [
  zn
], Fn = { class: "ml-1.5" }, Ln = { class: "my-1 text-sm text-gray-500" }, Vn = {
  name: "VFModalUnarchive"
}, Nn = /* @__PURE__ */ Object.assign(Vn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(d) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), { t: o } = b("i18n"), p = d;
    k("");
    const c = k(p.selection.items[0]), l = k(""), u = k([]), g = () => {
      t.emit("vf-fetch", {
        params: {
          q: "unarchive",
          adapter: s.value,
          path: p.current.dirname,
          item: c.value.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("The file unarchived.") });
        },
        onError: (i) => {
          l.value = o(i.message);
        }
      });
    };
    return (i, n) => (a(), H(K, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Unarchive")), 1),
        e("button", {
          type: "button",
          onClick: n[1] || (n[1] = (x) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Cancel")), 1)
      ]),
      default: N(() => [
        e("div", wn, [
          yn,
          e("div", _n, [
            e("h3", $n, v(r(o)("Unarchive")), 1),
            e("div", jn, [
              (a(!0), m(I, null, P(u.value, (x) => (a(), m("p", Cn, [
                x.type == "dir" ? (a(), m("svg", Mn, Dn)) : (a(), m("svg", On, En)),
                e("span", Fn, v(x.basename), 1)
              ]))), 256)),
              e("p", Ln, v(r(o)("The archive will be unarchived at")) + " (" + v(d.current.dirname) + ")", 1),
              l.value.length ? (a(), H(Q, {
                key: 0,
                onHidden: n[0] || (n[0] = (x) => l.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(l.value), 1)
                ]),
                _: 1
              })) : L("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Bn = { class: "sm:flex sm:items-start" }, An = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), Hn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Tn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Un = { class: "mt-2" }, In = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, qn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Rn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Pn = [
  Rn
], Gn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Jn = [
  Yn
], Kn = { class: "ml-1.5" }, Wn = { class: "text-sm text-gray-500 pb-1 pt-3" }, Xn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Qn = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), Zn = { class: "ml-1.5 overflow-auto" }, el = {
  name: "VFModalMove"
}, tl = /* @__PURE__ */ Object.assign(el, {
  props: {
    selection: Object,
    current: Object
  },
  setup(d) {
    const t = b("emitter"), { t: s } = b("i18n");
    b("storage");
    const o = b("adapter"), p = d, c = k(p.selection.items.from), l = k(""), u = () => {
      c.value.length && t.emit("vf-fetch", {
        params: {
          q: "move",
          adapter: o.value,
          path: p.current.dirname,
          items: JSON.stringify(c.value.map(({ path: g, type: i }) => ({ path: g, type: i }))),
          item: p.selection.items.to.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: s("Files moved.", p.selection.items.to.name) });
        },
        onError: (g) => {
          l.value = s(g.message);
        }
      });
    };
    return (g, i) => (a(), H(K, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: u,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(s)("Yes, Move!")), 1),
        e("button", {
          type: "button",
          onClick: i[1] || (i[1] = (n) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(s)("Cancel")), 1)
      ]),
      default: N(() => [
        e("div", Bn, [
          An,
          e("div", Hn, [
            e("h3", Tn, v(r(s)("Move files")), 1),
            e("div", Un, [
              (a(!0), m(I, null, P(c.value, (n) => (a(), m("p", In, [
                n.type == "dir" ? (a(), m("svg", qn, Pn)) : (a(), m("svg", Gn, Jn)),
                e("span", Kn, v(n.path), 1)
              ]))), 256)),
              e("p", Wn, v(r(s)("Are you sure you want to move these files?")), 1),
              e("p", Xn, [
                Qn,
                e("span", Zn, v(d.selection.items.to.path), 1)
              ]),
              l.value.length ? (a(), H(Q, {
                key: 0,
                onHidden: i[0] || (i[0] = (n) => l.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(l.value), 1)
                ]),
                _: 1
              })) : L("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalArchive: bn,
  ModalDelete: nr,
  ModalMessage: pr,
  ModalMove: tl,
  ModalNewFile: Er,
  ModalNewFolder: _r,
  ModalPreview: ka,
  ModalRename: Fa,
  ModalUnarchive: Nn,
  ModalUpload: on
}, Symbol.toStringTag, { value: "Module" })), he = {
  VueFinder: Fs,
  ...ol
};
const ml = {
  install(d) {
    for (const t in he)
      if (he.hasOwnProperty(t)) {
        const s = he[t];
        d.component(s.name, s);
      }
  }
};
export {
  ml as default
};
