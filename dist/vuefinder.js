import { ref as k, watch as ve, inject as b, openBlock as n, createElementBlock as m, createElementVNode as e, unref as r, normalizeClass as U, createTextVNode as T, toDisplayString as v, createCommentVNode as F, withDirectives as q, vShow as ae, createVNode as P, TransitionGroup as ze, withCtx as N, Fragment as I, renderList as R, reactive as ce, onMounted as G, onUpdated as Ee, onBeforeUnmount as Ce, withModifiers as K, nextTick as pe, isRef as Me, vModelSelect as _e, createStaticVNode as Fe, customRef as Le, withKeys as se, vModelText as re, normalizeStyle as Se, provide as Q, computed as Ve, createBlock as H, resolveDynamicComponent as Ne, renderSlot as ke } from "vue";
import Be from "mitt";
import Ae from "dragselect";
import He from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Te from "cropperjs";
import Ue from "@uppy/core";
import Ie from "@uppy/xhr-upload";
import "microtip/microtip.css";
var je;
const ue = (je = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : je.getAttribute("content"), me = (i, { method: t = "get", params: s = {}, json: o = !0, signal: p = null }) => {
  const a = { method: t };
  if (a.signal = p, t == "get")
    i += "?" + new URLSearchParams(s);
  else {
    a.headers = {}, ue && (a.headers["X-CSRF-Token"] = ue);
    let c = new FormData();
    for (const [u, f] of Object.entries(s))
      c.append(u, f);
    a.body = c;
  }
  return fetch(i, a).then((c) => c.ok ? o ? c.json() : c.text() : c.json().then(Promise.reject.bind(Promise)));
};
function xe(i) {
  let t = localStorage.getItem(i + "_storage");
  const s = k(JSON.parse(t));
  ve(s, o);
  function o() {
    s.value === null || s.value === "" ? localStorage.removeItem(i + "_storage") : localStorage.setItem(i + "_storage", JSON.stringify(s.value));
  }
  function p(u, f) {
    s.value = Object.assign({ ...s.value }, { [u]: f });
  }
  function a() {
    s.value = null;
  }
  return { getStore: (u, f = null) => s.value === null || s.value === "" ? f : s.value.hasOwnProperty(u) ? s.value[u] : f, setStore: p, clearStore: a };
}
const $e = k("");
function Y() {
  function i(t) {
    $e.value = t;
  }
  return { apiUrl: $e, setApiUrl: i };
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
  setup(i) {
    const t = b("emitter"), s = b("usePropDarkMode"), { getStore: o, setStore: p } = b("storage"), { t: a } = b("i18n"), c = k(o("viewport", "grid")), u = k([]), f = k(o("full-screen", !1)), d = k("");
    t.on("vf-search-query", ({ newQuery: C }) => {
      d.value = C;
    });
    const l = b("loadingState"), x = () => l.value, w = () => {
      f.value = !f.value, t.emit("vf-fullscreen-toggle");
    };
    return t.on("vf-nodes-selected", (C) => {
      u.value = C;
    }), t.on("vf-view-toggle", (C) => {
      p("viewport", C), c.value = C;
    }), (C, y) => (n(), m("div", qe, [
      d.value.length ? (n(), m("div", mt, [
        e("div", vt, [
          T(v(r(a)("Search results for")) + " ", 1),
          e("span", pt, v(d.value), 1)
        ]),
        x() ? (n(), m("svg", ft, kt)) : F("", !0)
      ])) : (n(), m("div", Re, [
        e("div", {
          class: "mx-1.5",
          "aria-label": r(a)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: y[0] || (y[0] = ($) => r(t).emit("vf-modal-show", { type: "new-folder", items: u.value }))
        }, Ye, 8, Pe),
        e("div", {
          class: "mx-1.5",
          "aria-label": r(a)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: y[1] || (y[1] = ($) => r(t).emit("vf-modal-show", { type: "new-file", items: u.value }))
        }, We, 8, Je),
        e("div", {
          class: "mx-1.5",
          "aria-label": r(a)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: y[2] || (y[2] = ($) => u.value.length != 1 || r(t).emit("vf-modal-show", { type: "rename", items: u.value }))
        }, [
          (n(), m("svg", {
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
          "aria-label": r(a)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: y[3] || (y[3] = ($) => !u.value.length || r(t).emit("vf-modal-show", { type: "delete", items: u.value }))
        }, [
          (n(), m("svg", {
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
          "aria-label": r(a)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: y[4] || (y[4] = ($) => r(t).emit("vf-modal-show", { type: "upload", items: u.value }))
        }, at, 8, st),
        u.value.length == 1 && u.value[0].mime_type == "application/zip" ? (n(), m("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": r(a)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: y[5] || (y[5] = ($) => !u.value.length || r(t).emit("vf-modal-show", { type: "unarchive", items: u.value }))
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([u.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, it, 2))
        ], 8, nt)) : (n(), m("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": r(a)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: y[6] || (y[6] = ($) => !u.value.length || r(t).emit("vf-modal-show", { type: "archive", items: u.value }))
        }, [
          (n(), m("svg", {
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
        q(e("div", {
          class: "mx-1.5",
          "aria-label": r(a)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (n(), m("svg", {
            onClick: y[7] || (y[7] = ($) => r(t).emit("vf-darkMode-toggle")),
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
          "aria-label": r(a)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: w
        }, [
          (n(), m("svg", $t, [
            f.value ? (n(), m("path", jt)) : (n(), m("path", Ct))
          ]))
        ], 8, _t),
        e("div", {
          class: "mx-1.5",
          "aria-label": r(a)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: y[8] || (y[8] = ($) => d.value.length || r(t).emit("vf-view-toggle", c.value == "list" ? "grid" : "list"))
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([d.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            c.value == "grid" ? (n(), m("path", St)) : F("", !0),
            c.value == "list" ? (n(), m("path", Dt)) : F("", !0)
          ], 2))
        ], 8, Mt)
      ])
    ]));
  }
});
function ye(i, t, s, o, p) {
  return (t = Math, s = t.log, o = 1024, p = s(i) / s(o) | 0, i / t.pow(o, p)).toFixed(0) + " " + (p ? "KMGTPEZY"[--p] + "iB" : "B");
}
function Et(i) {
  const t = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(i);
  return o[1] * Math.pow(1024, t[o[2].toLowerCase()]);
}
const De = (i, t = null) => new Date(i * 1e3).toLocaleString(t ?? navigator.language ?? "en-US"), Ft = {
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
  setup(i) {
    return (t, s) => (n(), m("div", null, [
      i.direction == "down" ? (n(), m("svg", Ft, Vt)) : F("", !0),
      i.direction == "up" ? (n(), m("svg", Nt, At)) : F("", !0)
    ]));
  }
}), Tt = ["onClick"], Ut = {
  name: "VFToast.vue"
}, It = /* @__PURE__ */ Object.assign(Ut, {
  setup(i) {
    const t = b("emitter"), { getStore: s } = b("storage"), o = k(s("full-screen", !1)), p = (f) => f == "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", a = k([]), c = (f) => {
      a.value.splice(f, 1);
    }, u = (f) => {
      let d = a.value.findIndex((l) => l.id === f);
      d !== -1 && c(d);
    };
    return t.on("vf-toast-clear", () => {
      a.value = [];
    }), t.on("vf-toast-push", (f) => {
      let d = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      f.id = d, a.value.push(f), setTimeout(() => {
        u(d);
      }, 5e3);
    }), (f, d) => (n(), m("div", {
      class: U([o.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      P(ze, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: N(() => [
          (n(!0), m(I, null, R(a.value, (l, x) => (n(), m("div", {
            onClick: (w) => c(x),
            key: l,
            class: U([p(l.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, v(l.label), 11, Tt))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), oe = (i) => Object.entries(i).map((t) => t.map(encodeURIComponent).join("=")).join("&"), { apiUrl: qt } = Y(), be = (i, t) => qt.value + "?" + oe({ q: "preview", adapter: i, path: t });
function we(i, t = 14) {
  let s = `((?=([\\w\\W]{0,${t}}))([\\w\\W]{8,})([\\w\\W]{8,}))`;
  return i.replace(new RegExp(s), "$2..$4");
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
  setup(i) {
    const t = i, s = b("emitter"), { setStore: o, getStore: p } = b("storage"), a = b("adapter"), c = (_) => _ == null ? void 0 : _.substring(0, 3), u = k(null), f = k(null), d = k(0), l = k(null), { t: x } = b("i18n"), w = Math.floor(Math.random() * 2 ** 32), C = k(p("full-screen", !1));
    let y;
    s.on("vf-fullscreen-toggle", () => {
      u.value.style.height = null, C.value = !C.value, o("full-screen", C.value);
    });
    const $ = k("");
    s.on("vf-search-query", ({ newQuery: _ }) => {
      $.value = _, _ ? s.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: t.data.adapter,
          path: t.data.dirname,
          filter: _
        },
        onSuccess: (S) => {
          S.files.length || s.emit("vf-toast-push", { label: x("No search result found.") });
        }
      }) : s.emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter, path: t.data.dirname } });
    });
    let z = null;
    const M = () => {
      z && clearTimeout(z);
    }, O = k(!0), j = (_) => {
      _.touches.length > 1 && (O.value ? (l.value.stop(), s.emit("vf-toast-push", { label: x("Drag&Drop: off") })) : (l.value.start(), s.emit("vf-toast-push", { label: x("Drag&Drop: on") }), s.emit("vf-explorer-update")), O.value = !O.value);
    }, L = (_) => {
      z = setTimeout(() => {
        const S = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: _.target.getBoundingClientRect().x,
          clientY: _.target.getBoundingClientRect().y
        });
        _.target.dispatchEvent(S);
      }, 500);
    }, V = (_) => {
      _.type == "dir" ? (s.emit("vf-search-exit"), s.emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter, path: _.path } })) : s.emit("vf-modal-show", { type: "preview", adapter: t.data.adapter, item: _ });
    }, D = ce({ active: !1, column: "", order: "" }), Z = (_ = !0) => {
      let S = [...t.data.files], h = D.column, B = D.order == "asc" ? 1 : -1;
      if (!_)
        return S;
      const g = (E, A) => typeof E == "string" && typeof A == "string" ? E.toLowerCase().localeCompare(A.toLowerCase()) : E < A ? -1 : E > A ? 1 : 0;
      return D.active && (S = S.slice().sort((E, A) => g(E[h], A[h]) * B)), S;
    }, ee = (_) => {
      D.active && D.column == _ ? (D.active = D.order == "asc", D.column = _, D.order = "desc") : (D.active = !0, D.column = _, D.order = "asc");
    }, X = () => l.value.getSelection().map((_) => JSON.parse(_.dataset.item)), ne = (_, S) => {
      if (_.altKey || _.ctrlKey || _.metaKey)
        return _.preventDefault(), !1;
      _.dataTransfer.setDragImage(f.value, 0, 15), _.dataTransfer.effectAllowed = "all", _.dataTransfer.dropEffect = "copy", _.dataTransfer.setData("items", JSON.stringify(X()));
    }, le = (_, S) => {
      _.preventDefault();
      let h = JSON.parse(_.dataTransfer.getData("items"));
      if (h.find((B) => B.storage != a.value)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      s.emit("vf-modal-show", { type: "move", items: { from: h, to: S } });
    }, ie = (_, S) => {
      _.preventDefault(), !S || S.type !== "dir" || l.value.getSelection().find((h) => h == _.currentTarget) ? (_.dataTransfer.dropEffect = "none", _.dataTransfer.effectAllowed = "none") : _.dataTransfer.dropEffect = "copy";
    }, fe = () => {
      l.value = new Ae({
        area: u.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), s.on("vf-explorer-update", () => pe(() => {
        l.value.clearSelection(), l.value.setSettings({
          selectables: document.getElementsByClassName("vf-item-" + w)
        });
      })), l.value.subscribe("predragstart", ({ event: _, isDragging: S }) => {
        if (S)
          d.value = l.value.getSelection().length, l.value.break();
        else {
          const h = _.target.offsetWidth - _.offsetX, B = _.target.offsetHeight - _.offsetY;
          h < 15 && B < 15 && (l.value.clearSelection(), l.value.break());
        }
      }), l.value.subscribe("predragmove", ({ isDragging: _ }) => {
        _ && l.value.break();
      }), l.value.subscribe("callback", ({ items: _, event: S, isDragging: h }) => {
        s.emit("vf-nodes-selected", X()), d.value = l.value.getSelection().length;
      });
    };
    return G(() => {
      y = new He(u.value), fe();
    }), Ee(() => {
      l.value.Area.reset(), l.value.SelectorArea.updatePos(), y.update();
    }), G(() => {
      ve(() => t.view, () => s.emit("vf-explorer-update"));
    }), Ce(() => {
      y.destroy();
    }), (_, S) => (n(), m("div", Rt, [
      i.view == "list" || $.value.length ? (n(), m("div", Pt, [
        e("div", {
          onClick: S[0] || (S[0] = (h) => ee("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          T(v(r(x)("Name")) + " ", 1),
          q(P(de, {
            direction: D.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, D.active && D.column == "basename"]
          ])
        ]),
        $.value.length ? F("", !0) : (n(), m("div", {
          key: 0,
          onClick: S[1] || (S[1] = (h) => ee("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          T(v(r(x)("Size")) + " ", 1),
          q(P(de, {
            direction: D.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, D.active && D.column == "file_size"]
          ])
        ])),
        $.value.length ? F("", !0) : (n(), m("div", {
          key: 1,
          onClick: S[2] || (S[2] = (h) => ee("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          T(v(r(x)("Date")) + " ", 1),
          q(P(de, {
            direction: D.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, D.active && D.column == "last_modified"]
          ])
        ])),
        $.value.length ? (n(), m("div", {
          key: 2,
          onClick: S[3] || (S[3] = (h) => ee("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          T(v(r(x)("Filepath")) + " ", 1),
          q(P(de, {
            direction: D.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, D.active && D.column == "path"]
          ])
        ])) : F("", !0)
      ])) : F("", !0),
      e("div", Gt, [
        e("div", {
          ref_key: "dragImage",
          ref: f,
          class: "absolute -z-50 -top-96"
        }, [
          Yt,
          e("div", Jt, v(d.value), 1)
        ], 512)
      ]),
      e("div", {
        onTouchstart: j,
        onContextmenu: S[10] || (S[10] = K((h) => r(s).emit("vf-contextmenu-show", { event: h, area: u.value, items: X() }), ["self", "prevent"])),
        class: U([C.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area vf-scrollbar min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: u
      }, [
        $.value.length ? (n(!0), m(I, { key: 0 }, R(Z(), (h, B) => (n(), m("div", {
          onDblclick: (g) => V(h),
          onTouchstart: S[4] || (S[4] = (g) => L(g)),
          onTouchend: S[5] || (S[5] = (g) => M()),
          onContextmenu: K((g) => r(s).emit("vf-contextmenu-show", { event: g, area: u.value, items: X(), target: h }), ["prevent"]),
          class: U(["vf-item-" + r(w), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": B
        }, [
          e("div", Wt, [
            e("div", Xt, [
              h.type == "dir" ? (n(), m("svg", Qt, eo)) : (n(), m("svg", to, so)),
              e("span", ro, v(h.basename), 1)
            ]),
            e("div", ao, v(h.path), 1)
          ])
        ], 42, Kt))), 256)) : F("", !0),
        i.view == "list" && !$.value.length ? (n(!0), m(I, { key: 1 }, R(Z(), (h, B) => (n(), m("div", {
          draggable: "true",
          onDblclick: (g) => V(h),
          onTouchstart: S[6] || (S[6] = (g) => L(g)),
          onTouchend: S[7] || (S[7] = (g) => M()),
          onContextmenu: K((g) => r(s).emit("vf-contextmenu-show", { event: g, area: u.value, items: X(), target: h }), ["prevent"]),
          onDragstart: (g) => ne(g),
          onDragover: (g) => ie(g, h),
          onDrop: (g) => le(g, h),
          class: U(["vf-item-" + r(w), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": B
        }, [
          e("div", lo, [
            e("div", io, [
              h.type == "dir" ? (n(), m("svg", co, mo)) : (n(), m("svg", vo, fo)),
              e("span", go, v(h.basename), 1)
            ]),
            e("div", ho, v(h.file_size ? r(ye)(h.file_size) : ""), 1),
            e("div", ko, v(r(De)(h.last_modified)), 1)
          ])
        ], 42, no))), 256)) : F("", !0),
        i.view == "grid" && !$.value.length ? (n(!0), m(I, { key: 2 }, R(Z(!1), (h, B) => (n(), m("div", {
          draggable: "true",
          onDblclick: (g) => V(h),
          onTouchstart: S[8] || (S[8] = (g) => L(g)),
          onTouchend: S[9] || (S[9] = (g) => M()),
          onContextmenu: K((g) => r(s).emit("vf-contextmenu-show", { event: g, area: u.value, items: X(), target: h }), ["prevent"]),
          onDragstart: (g) => ne(g),
          onDragover: (g) => ie(g, h),
          onDrop: (g) => le(g, h),
          class: U(["vf-item-" + r(w), "border border-transparent hover:bg-neutral-50 m-1 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 text-center justify-center select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": B
        }, [
          e("div", null, [
            e("div", bo, [
              h.type == "dir" ? (n(), m("svg", wo, _o)) : (h.mime_type ?? "").startsWith("image") ? (n(), m("img", {
                key: 1,
                class: "lazy h-10 md:h-12 m-auto",
                "data-src": r(be)(r(a).value, h.path),
                alt: h.basename
              }, null, 8, $o)) : (n(), m("svg", jo, Mo)),
              !(h.mime_type ?? "").startsWith("image") && h.type != "dir" ? (n(), m("div", So, v(c(h.extension)), 1)) : F("", !0)
            ]),
            e("span", Do, v(r(we)(h.basename)), 1)
          ])
        ], 42, xo))), 256)) : F("", !0)
      ], 34),
      P(It)
    ]));
  }
}), Eo = "1.2.8", Fo = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Lo = { class: "flex leading-5 items-center" }, Vo = ["aria-label"], No = /* @__PURE__ */ e("svg", {
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
  setup(i) {
    const t = b("emitter"), { getStore: s, setStore: o } = b("storage"), p = k(0), a = b("adapter"), { t: c, changeLocale: u } = b("i18n"), f = k(s("locale", "")), d = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: a.value } }), o("adapter", a.value);
    };
    t.on("vf-nodes-selected", (x) => {
      p.value = x.length;
    });
    const l = k("");
    return t.on("vf-search-query", ({ newQuery: x }) => {
      l.value = x;
    }), (x, w) => (n(), m("div", Fo, [
      e("div", Lo, [
        e("div", {
          class: "mx-2",
          "aria-label": r(c)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, Bo, 8, Vo),
        q(e("select", {
          "onUpdate:modelValue": w[0] || (w[0] = (C) => Me(a) ? a.value = C : null),
          onChange: d,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (n(!0), m(I, null, R(i.data.storages, (C) => (n(), m("option", { value: C }, v(C), 9, Ao))), 256))
        ], 544), [
          [_e, r(a)]
        ]),
        e("div", Ho, [
          l.value.length ? (n(), m("span", To, v(i.data.files.length) + " items found. ", 1)) : F("", !0),
          e("span", Uo, v(p.value > 0 ? p.value + " " + r(c)("item(s) selected.") : ""), 1)
        ])
      ]),
      e("div", Io, [
        q(e("select", {
          "onUpdate:modelValue": w[1] || (w[1] = (C) => f.value = C),
          onChange: w[2] || (w[2] = (C) => r(u)(C.target.value)),
          class: "w-[120px] delay-200 duration-300 hover:w-full transition-[width] py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          e("option", qo, v(r(c)("Language")), 1),
          Ro
        ], 544), [
          [_e, f.value]
        ]),
        e("span", {
          class: "mr-1",
          "aria-label": r(c)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: w[3] || (w[3] = (C) => r(t).emit("vf-modal-show", { type: "message", title: "Vuefinder " + r(Eo), message: r(c)("Vuefinder is a file manager component for vue 3.") }))
        }, Yo, 8, Po)
      ])
    ]));
  }
}), Wo = (i, t = 0, s = !1) => {
  let o;
  return (...p) => {
    s && !o && i(...p), clearTimeout(o), o = setTimeout(() => {
      i(...p);
    }, t);
  };
}, Xo = (i, t, s) => {
  const o = k(i);
  return Le((a, c) => ({
    get() {
      return a(), o.value;
    },
    set: Wo(
      (u) => {
        o.value = u, c();
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
  setup(i) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), o = k(null), p = k([]), a = k(!1), c = k(null), u = i, { t: f } = b("i18n"), d = b("loadingState");
    t.on("vf-explorer-update", () => {
      let O = [], j = [];
      o.value = u.data.dirname ?? s.value + "://", o.value.length == 0 && (p.value = []), o.value.replace(s.value + "://", "").split("/").forEach(function(L) {
        O.push(L), O.join("/") != "" && j.push({
          basename: L,
          name: L,
          path: s.value + "://" + O.join("/"),
          type: "dir"
        });
      }), j.length > 4 && (j = j.slice(-5), j[0].name = ".."), p.value = j;
    });
    const l = () => {
      a.value = !1, w.value = "";
    };
    t.on("vf-search-exit", () => {
      l();
    });
    const x = () => {
      a.value = !0, pe(() => c.value.focus());
    }, w = Xo("", 400), C = () => d.value;
    ve(w, (O) => {
      t.emit("vf-toast-clear"), t.emit("vf-search-query", { newQuery: O });
    });
    const y = () => p.value.length && !a.value, $ = (O) => {
      O.preventDefault();
      let j = JSON.parse(O.dataTransfer.getData("items"));
      if (j.find((L) => L.storage != s.value)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: j, to: p.value[p.value.length - 2] ?? { path: s.value + "://" } }
      });
    }, z = (O) => {
      O.preventDefault(), y() ? O.dataTransfer.dropEffect = "copy" : (O.dataTransfer.dropEffect = "none", O.dataTransfer.effectAllowed = "none");
    }, M = () => {
      w.value == "" && l();
    };
    return (O, j) => (n(), m("div", Qo, [
      e("span", {
        "aria-label": r(f)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), m("svg", {
          onDragover: j[0] || (j[0] = (L) => z(L)),
          onDrop: j[1] || (j[1] = (L) => $(L)),
          onClick: j[2] || (j[2] = (L) => {
            var V;
            return !y() || r(t).emit("vf-fetch", { params: { q: "index", adapter: i.data.adapter, path: ((V = p.value[p.value.length - 2]) == null ? void 0 : V.path) ?? r(s) + "://" } });
          }),
          class: U(["h-6 w-6 p-0.5 rounded", y() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, ts, 34))
      ], 8, Zo),
      C() ? (n(), m("span", {
        key: 1,
        "aria-label": r(f)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), m("svg", {
          onClick: j[4] || (j[4] = (L) => r(t).emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, ls))
      ], 8, as)) : (n(), m("span", {
        key: 0,
        "aria-label": r(f)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), m("svg", {
          onClick: j[3] || (j[3] = (L) => {
            r(t).emit("vf-fetch", { params: { q: "index", adapter: i.data.adapter, path: i.data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, rs))
      ], 8, os)),
      a.value ? (n(), m("div", hs, [
        ks,
        q(e("input", {
          ref_key: "searchInput",
          ref: c,
          onKeydown: se(l, ["esc"]),
          onBlur: M,
          "onUpdate:modelValue": j[6] || (j[6] = (L) => Me(w) ? w.value = L : null),
          placeholder: r(f)("Search anything.."),
          class: "w-full pt-1 pb-0 px-2 border-0 text-sm ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, xs), [
          [re, r(w)]
        ]),
        (n(), m("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: l,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, ws))
      ])) : (n(), m("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: K(x, ["self"])
      }, [
        (n(), m("svg", {
          onClick: j[5] || (j[5] = (L) => r(t).emit("vf-fetch", { params: { q: "index", adapter: i.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, ds)),
        e("div", cs, [
          (n(!0), m(I, null, R(p.value, (L, V) => (n(), m("div", { key: V }, [
            us,
            e("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: L.basename,
              onClick: (D) => r(t).emit("vf-fetch", { params: { q: "index", adapter: i.data.adapter, path: L.path } })
            }, v(L.name), 9, ms)
          ]))), 128))
        ]),
        C() ? (n(), m("svg", vs, gs)) : F("", !0)
      ]))
    ]));
  }
}), $s = ["onClick"], js = /* @__PURE__ */ e("span", { class: "px-1" }, null, -1), Cs = {
  name: "VFContextMenu"
}, Ms = /* @__PURE__ */ Object.assign(Cs, {
  props: {
    current: Object
  },
  setup(i) {
    const t = b("emitter"), s = k(null), { apiUrl: o } = Y(), p = i, a = ce({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), c = k([]);
    t.on("vf-context-selected", (w) => {
      c.value = w;
    });
    const { t: u } = b("i18n"), f = {
      newfolder: {
        title: () => u("New Folder"),
        action: () => {
          t.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: () => u("Delete"),
        action: () => {
          t.emit("vf-modal-show", { type: "delete", items: c });
        }
      },
      refresh: {
        title: () => u("Refresh"),
        action: () => {
          t.emit("vf-fetch", { params: { q: "index", adapter: p.current.adapter, path: p.current.dirname } });
        }
      },
      preview: {
        title: () => u("Preview"),
        action: () => {
          t.emit("vf-modal-show", { type: "preview", adapter: p.current.adapter, item: c.value[0] });
        }
      },
      open: {
        title: () => u("Open"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: p.current.adapter, path: c.value[0].path } });
        }
      },
      openDir: {
        title: () => u("Open containing folder"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: p.current.adapter, path: c.value[0].dir } });
        }
      },
      download: {
        title: () => u("Download"),
        action: () => {
          const w = o.value + "?" + oe({ q: "download", adapter: p.current.adapter, path: c.value[0].path });
          t.emit("vf-download", w);
        }
      },
      archive: {
        title: () => u("Archive"),
        action: () => {
          t.emit("vf-modal-show", { type: "archive", items: c });
        }
      },
      unarchive: {
        title: () => u("Unarchive"),
        action: () => {
          t.emit("vf-modal-show", { type: "unarchive", items: c });
        }
      },
      rename: {
        title: () => u("Rename"),
        action: () => {
          t.emit("vf-modal-show", { type: "rename", items: c });
        }
      }
    }, d = (w) => {
      t.emit("vf-contextmenu-hide"), w.action();
    }, l = k("");
    t.on("vf-search-query", ({ newQuery: w }) => {
      l.value = w;
    }), t.on("vf-contextmenu-show", ({ event: w, area: C, items: y, target: $ = null }) => {
      if (a.items = [], l.value)
        if ($)
          a.items.push(f.openDir), t.emit("vf-context-selected", [$]);
        else
          return;
      else
        !$ && !l.value ? (a.items.push(f.refresh), a.items.push(f.newfolder), t.emit("vf-context-selected", [])) : y.length > 1 && y.some((z) => z.path === $.path) ? (a.items.push(f.refresh), a.items.push(f.archive), a.items.push(f.delete), t.emit("vf-context-selected", y)) : ($.type == "dir" ? a.items.push(f.open) : (a.items.push(f.preview), a.items.push(f.download)), a.items.push(f.rename), $.mime_type == "application/zip" ? a.items.push(f.unarchive) : a.items.push(f.archive), a.items.push(f.delete), t.emit("vf-context-selected", [$]));
      x(w, C);
    }), t.on("vf-contextmenu-hide", () => {
      a.active = !1;
    });
    const x = (w, C) => {
      a.active = !0, pe(() => {
        let y = C.getBoundingClientRect(), $ = w.pageX, z = w.pageY, M = s.value.offsetHeight, O = s.value.offsetWidth;
        $ = y.right - w.pageX + window.scrollX < O ? $ - O : $, z = y.bottom - w.pageY + window.scrollY < M ? z - M : z, a.positions = {
          left: $ + "px",
          top: z + "px"
        };
      });
    };
    return (w, C) => a.active ? (n(), m("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: s,
      style: Se(a.positions)
    }, [
      (n(!0), m(I, null, R(a.items, (y) => (n(), m("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: y.title,
        onClick: ($) => d(y)
      }, [
        js,
        e("span", null, v(y.title()), 1)
      ], 8, $s))), 128))
    ], 4)) : F("", !0);
  }
}), Ss = (i, t) => {
  const s = i[t];
  return s ? typeof s == "function" ? s() : Promise.resolve(s) : new Promise((o, p) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(p.bind(null, new Error("Unknown variable dynamic import: " + t)));
  });
};
async function Ds(i) {
  return (await Ss(/* @__PURE__ */ Object.assign({ "../locales/de.js": () => import("./de-bb2cbcd2.js"), "../locales/en.js": () => import("./en-36ebc9b3.js"), "../locales/fa.js": () => import("./fa-38a6b855.js"), "../locales/he.js": () => import("./he-ed562a13.js"), "../locales/hi.js": () => import("./hi-6bb62179.js"), "../locales/ru.js": () => import("./ru-02b5dcbe.js"), "../locales/sv.js": () => import("./sv-0c0f15f4.js"), "../locales/tr.js": () => import("./tr-410a966d.js"), "../locales/zhCN.js": () => import("./zhCN-f37edc4d.js"), "../locales/zhTW.js": () => import("./zhTW-0fd6dd31.js") }), `../locales/${i}.js`)).default;
}
function Os(i, t, s) {
  const { getStore: o, setStore: p } = xe(i), a = k({}), c = (l, x = "en") => {
    Ds(l).then((w) => {
      a.value = w, p("locale", l), p("translations", w), s.emit("vf-toast-push", { label: "The language is set to " + l });
    }).catch((w) => {
      x ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), c(x, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  o("locale") ? a.value = o("translations") : c(t);
  const u = (l, ...x) => x.length ? u(l = l.replace("%s", x.shift()), ...x) : l;
  function f(l, ...x) {
    return a.value.hasOwnProperty(l) ? u(a.value[l], ...x) : u(l, ...x);
  }
  function d() {
    return o("locale");
  }
  return { t: f, changeLocale: c, getLocale: d };
}
const zs = { class: "vuefinder" }, Es = /* @__PURE__ */ e("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), Fs = {
  name: "VueFinder"
}, Ls = /* @__PURE__ */ Object.assign(Fs, {
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
  setup(i) {
    const t = i, s = Be(), { setStore: o, getStore: p } = xe(t.id), a = k(p("adapter"));
    Q("emitter", s), Q("storage", xe(t.id)), Q("postData", t.postData), Q("adapter", a), Q("maxFileSize", t.maxFileSize), Q("usePropDarkMode", t.usePropDarkMode);
    const c = Os(t.id, t.locale, s);
    Q("i18n", c);
    const { apiUrl: u, setApiUrl: f } = Y();
    f(t.url);
    const d = ce({ adapter: a.value, storages: [], dirname: ".", files: [] }), l = k(p("viewport", "grid")), x = t.usePropDarkMode ? Ve(() => t.dark) : k(p("darkMode", t.dark));
    s.on("vf-darkMode-toggle", () => {
      x.value = !x.value, o("darkMode", x.value);
    });
    const w = k(!1);
    Q("loadingState", w);
    const C = k(p("full-screen", !1));
    s.on("vf-fullscreen-toggle", () => {
      C.value = !C.value, o("full-screen", C.value);
    }), s.on("vf-view-toggle", (M) => {
      l.value = M;
    });
    const y = ce({
      active: !1,
      type: "delete",
      data: {}
    });
    s.on("vf-modal-close", () => {
      y.active = !1;
    }), s.on("vf-modal-show", (M) => {
      y.active = !0, y.type = M.type, y.data = M;
    });
    const $ = (M) => {
      Object.assign(d, M), s.emit("vf-nodes-selected", {}), s.emit("vf-explorer-update");
    };
    let z;
    return s.on("vf-fetch-abort", () => {
      z.abort(), w.value = !1;
    }), s.on("vf-fetch", ({ params: M, onSuccess: O = null, onError: j = null, noCloseModal: L = !1 }) => {
      ["index", "search"].includes(M.q) && (z && z.abort(), w.value = !0), z = new AbortController();
      const V = z.signal;
      me(u.value, { params: M, signal: V }).then((D) => {
        a.value = D.adapter, ["index", "search"].includes(M.q) && (w.value = !1), L || s.emit("vf-modal-close"), $(D), O(D);
      }).catch((D) => {
        j && j(D);
      }).finally(() => {
      });
    }), s.on("vf-download", (M) => {
      document.getElementById("download_frame").src = M, s.emit("vf-modal-close");
    }), G(() => {
      s.emit("vf-fetch", { params: { q: "index", adapter: a.value } });
    }), (M, O) => (n(), m("div", zs, [
      e("div", {
        class: U(r(x) ? "dark" : "")
      }, [
        e("div", {
          class: U([C.value ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
          style: Se(C.value ? "" : "max-height: " + i.maxHeight),
          onMousedown: O[0] || (O[0] = (j) => r(s).emit("vf-contextmenu-hide")),
          onTouchstart: O[1] || (O[1] = (j) => r(s).emit("vf-contextmenu-hide"))
        }, [
          P(zt, { data: d }, null, 8, ["data"]),
          P(_s, { data: d }, null, 8, ["data"]),
          P(zo, {
            view: l.value,
            data: d
          }, null, 8, ["view", "data"]),
          P(Ko, { data: d }, null, 8, ["data"])
        ], 38),
        y.active ? (n(), H(Ne("v-f-modal-" + y.type), {
          key: 0,
          selection: y.data,
          current: d
        }, null, 8, ["selection", "current"])) : F("", !0),
        P(Ms, { current: d }, null, 8, ["current"]),
        Es
      ], 2)
    ]));
  }
}), Vs = /* @__PURE__ */ e("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), Ns = { class: "fixed z-10 inset-0 overflow-hidden" }, Bs = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, As = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Hs = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, J = {
  __name: "ModalLayout",
  setup(i) {
    const t = b("emitter");
    return G(() => {
      const s = document.querySelector(".v-f-modal input");
      s && s.focus();
    }), (s, o) => (n(), m("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = se((p) => r(t).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Vs,
      e("div", Ns, [
        e("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: o[0] || (o[0] = K((p) => r(t).emit("vf-modal-close"), ["self"]))
        }, [
          e("div", Bs, [
            e("div", As, [
              ke(s.$slots, "default")
            ]),
            e("div", Hs, [
              ke(s.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Ts = ["aria-label"], Us = /* @__PURE__ */ e("svg", {
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
], -1), Is = [
  Us
], qs = {
  name: "Message"
}, W = /* @__PURE__ */ Object.assign(qs, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(i, { emit: t }) {
    var f;
    const { t: s } = b("i18n"), o = k(!1), p = k(null), a = k((f = p.value) == null ? void 0 : f.strMessage), c = t;
    ve(a, () => o.value = !1);
    const u = () => {
      c("hidden"), o.value = !0;
    };
    return (d, l) => (n(), m("div", null, [
      o.value ? F("", !0) : (n(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: p,
        class: U(["flex mt-2 p-1 px-2 rounded text-sm break-all", i.error ? "bg-red-100 text-red-600 dark:bg-red-950" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-950"])
      }, [
        ke(d.$slots, "default"),
        e("div", {
          class: "ml-auto cursor-pointer",
          onClick: u,
          "aria-label": r(s)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, Is, 8, Ts)
      ], 2))
    ]));
  }
}), Rs = { class: "sm:flex sm:items-start" }, Ps = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Gs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ys = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Js = { class: "mt-2" }, Ks = { class: "text-sm text-gray-500" }, Ws = {
  class: "text-gray-500 text-sm mb-1 overflow-auto",
  style: { "max-height": "200px" }
}, Xs = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Qs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zs = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), er = [
  Zs
], tr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, or = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), sr = [
  or
], rr = { class: "ml-1.5" }, ar = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, nr = {
  name: "VFModalDelete"
}, lr = /* @__PURE__ */ Object.assign(nr, {
  props: {
    selection: Object,
    current: Object
  },
  setup(i) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), { t: o } = b("i18n"), p = i, a = k(p.selection.items), c = k(""), u = () => {
      a.value.length && t.emit("vf-fetch", {
        params: {
          q: "delete",
          adapter: s.value,
          path: p.current.dirname,
          items: JSON.stringify(a.value.map(({ path: f, type: d }) => ({ path: f, type: d })))
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("Files deleted.") });
        },
        onError: (f) => {
          c.value = o(f.message);
        }
      });
    };
    return (f, d) => (n(), H(J, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: u,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Yes, Delete!")), 1),
        e("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Cancel")), 1),
        e("div", ar, v(r(o)("This action cannot be undone.")), 1)
      ]),
      default: N(() => [
        e("div", Rs, [
          Ps,
          e("div", Gs, [
            e("h3", Ys, v(r(o)("Delete files")), 1),
            e("div", Js, [
              e("p", Ks, v(r(o)("Are you sure you want to delete these files?")), 1),
              e("div", Ws, [
                (n(!0), m(I, null, R(a.value, (l) => (n(), m("p", Xs, [
                  l.type === "dir" ? (n(), m("svg", Qs, er)) : (n(), m("svg", tr, sr)),
                  e("span", rr, v(l.basename), 1)
                ]))), 256))
              ]),
              c.value.length ? (n(), H(W, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => c.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(c.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ir = { class: "sm:flex sm:items-start" }, dr = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), cr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ur = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, mr = { class: "mt-2" }, vr = { class: "text-sm text-gray-500" }, pr = {
  name: "VFModalMessage"
}, fr = /* @__PURE__ */ Object.assign(pr, {
  props: {
    selection: Object
  },
  setup(i) {
    const t = b("emitter"), { t: s } = b("i18n");
    return (o, p) => (n(), H(J, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: p[0] || (p[0] = (a) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(s)("Close")), 1)
      ]),
      default: N(() => {
        var a, c;
        return [
          e("div", ir, [
            dr,
            e("div", cr, [
              e("h3", ur, v(((a = i.selection) == null ? void 0 : a.title) ?? "Title"), 1),
              e("div", mr, [
                e("p", vr, v(((c = i.selection) == null ? void 0 : c.message) ?? "Message"), 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), gr = { class: "sm:flex sm:items-start" }, hr = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), kr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, xr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, br = { class: "mt-2" }, wr = { class: "text-sm text-gray-500" }, yr = ["placeholder"], _r = {
  name: "VFModalNewFolder"
}, $r = /* @__PURE__ */ Object.assign(_r, {
  props: {
    selection: Object,
    current: Object
  },
  setup(i) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), { t: o } = b("i18n"), p = i, a = k(""), c = k(""), u = () => {
      a.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfolder",
          adapter: s.value,
          path: p.current.dirname,
          name: a.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("%s is created.", a.value) });
        },
        onError: (f) => {
          c.value = o(f.message);
        }
      });
    };
    return (f, d) => (n(), H(J, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: u,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Create")), 1),
        e("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Cancel")), 1)
      ]),
      default: N(() => [
        e("div", gr, [
          hr,
          e("div", kr, [
            e("h3", xr, v(r(o)("New Folder")), 1),
            e("div", br, [
              e("p", wr, v(r(o)("Create a new folder")), 1),
              q(e("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => a.value = l),
                onKeyup: se(u, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(o)("Folder Name"),
                type: "text"
              }, null, 40, yr), [
                [re, a.value]
              ]),
              c.value.length ? (n(), H(W, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => c.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(c.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), jr = { class: "sm:flex sm:items-start" }, Cr = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Mr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Sr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Dr = { class: "mt-2" }, Or = { class: "text-sm text-gray-500" }, zr = ["placeholder"], Er = {
  name: "VFModalNewFile"
}, Fr = /* @__PURE__ */ Object.assign(Er, {
  props: {
    selection: Object,
    current: Object
  },
  setup(i) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), { t: o } = b("i18n"), p = i, a = k(""), c = k(""), u = () => {
      a.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfile",
          adapter: s.value,
          path: p.current.dirname,
          name: a.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("%s is created.", a.value) });
        },
        onError: (f) => {
          c.value = o(f.message);
        }
      });
    };
    return (f, d) => (n(), H(J, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: u,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Create")), 1),
        e("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Cancel")), 1)
      ]),
      default: N(() => [
        e("div", jr, [
          Cr,
          e("div", Mr, [
            e("h3", Sr, v(r(o)("New File")), 1),
            e("div", Dr, [
              e("p", Or, v(r(o)("Create a new file")), 1),
              q(e("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => a.value = l),
                onKeyup: se(u, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(o)("File Name"),
                type: "text"
              }, null, 40, zr), [
                [re, a.value]
              ]),
              c.value.length ? (n(), H(W, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => c.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(c.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Lr = { class: "flex" }, Vr = ["aria-label"], Nr = { class: "ml-auto mb-2" }, Br = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, Ar = { key: 1 }, Hr = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(i, { emit: t }) {
    const s = t, o = k(""), p = k(""), a = k(null), c = k(!1), { apiUrl: u } = Y(), f = i, d = k(""), l = k(!1), { t: x } = b("i18n");
    G(() => {
      me(u.value, {
        params: { q: "preview", adapter: f.selection.adapter, path: f.selection.item.path },
        json: !1
      }).then(($) => {
        o.value = $, s("load");
      });
    });
    const w = () => {
      c.value = !c.value, p.value = o.value, c.value == !0 && pe(() => {
        a.value.focus();
      });
    }, C = b("postData"), y = () => {
      d.value = "", l.value = !1, me(u.value, {
        method: "POST",
        params: Object.assign(C, {
          q: "save",
          adapter: f.selection.adapter,
          path: f.selection.item.path,
          content: p.value
        }),
        json: !1
      }).then(($) => {
        d.value = x("Updated."), o.value = $, s("load"), c.value = !c.value;
      }).catch(($) => {
        d.value = x($.message), l.value = !0;
      });
    };
    return ($, z) => (n(), m(I, null, [
      e("div", Lr, [
        e("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": i.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, v(i.selection.item.basename), 9, Vr),
        e("div", Nr, [
          c.value ? (n(), m("button", {
            key: 0,
            onClick: y,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, v(r(x)("Save")), 1)) : F("", !0),
          e("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: z[0] || (z[0] = (M) => w())
          }, v(c.value ? r(x)("Cancel") : r(x)("Edit")), 1)
        ])
      ]),
      e("div", null, [
        c.value ? (n(), m("div", Ar, [
          q(e("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": z[1] || (z[1] = (M) => p.value = M),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [re, p.value]
          ])
        ])) : (n(), m("pre", Br, v(o.value), 1)),
        d.value.length ? (n(), H(W, {
          key: 2,
          onHidden: z[2] || (z[2] = (M) => d.value = ""),
          error: l.value
        }, {
          default: N(() => [
            T(v(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : F("", !0)
      ])
    ], 64));
  }
}, Tr = { class: "flex" }, Ur = ["aria-label"], Ir = { class: "ml-auto mb-2" }, qr = { class: "w-full flex justify-center" }, Rr = ["src"], Pr = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(i, { emit: t }) {
    const s = t, o = i, { t: p } = b("i18n"), { apiUrl: a } = Y(), c = k(null), u = k(null), f = k(!1), d = k(""), l = k(!1), x = () => {
      f.value = !f.value, f.value ? u.value = new Te(c.value, {
        crop(y) {
        }
      }) : u.value.destroy();
    }, w = b("postData"), C = () => {
      u.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (y) => {
          d.value = "", l.value = !1, me(a.value, {
            method: "POST",
            params: Object.assign(w, {
              q: "upload",
              adapter: o.selection.adapter,
              path: o.selection.item.path,
              file: y
            }),
            name: o.selection.item.basename,
            json: !1
          }).then(($) => {
            d.value = p("Updated."), c.value.src = be(o.selection.adapter, o.selection.item.path), x(), s("load");
          }).catch(($) => {
            d.value = p($.message), l.value = !0;
          });
        }
      );
    };
    return G(() => {
      s("load");
    }), (y, $) => (n(), m(I, null, [
      e("div", Tr, [
        e("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": i.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, v(i.selection.item.basename), 9, Ur),
        e("div", Ir, [
          f.value ? (n(), m("button", {
            key: 0,
            onClick: C,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, v(r(p)("Crop")), 1)) : F("", !0),
          e("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: $[0] || ($[0] = (z) => x())
          }, v(f.value ? r(p)("Cancel") : r(p)("Edit")), 1)
        ])
      ]),
      e("div", qr, [
        e("img", {
          ref_key: "image",
          ref: c,
          class: "max-w-[50vh] max-h-[50vh]",
          src: r(be)(o.selection.adapter, o.selection.item.path),
          alt: ""
        }, null, 8, Rr)
      ]),
      d.value.length ? (n(), H(W, {
        key: 0,
        onHidden: $[1] || ($[1] = (z) => d.value = ""),
        error: l.value
      }, {
        default: N(() => [
          T(v(d.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : F("", !0)
    ], 64));
  }
}, Gr = { class: "flex" }, Yr = ["aria-label"], Jr = /* @__PURE__ */ e("div", null, null, -1), Kr = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(i, { emit: t }) {
    const s = t;
    return G(() => {
      s("load");
    }), (o, p) => (n(), m(I, null, [
      e("div", Gr, [
        e("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": i.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, v(i.selection.item.basename), 9, Yr)
      ]),
      Jr
    ], 64));
  }
}, Wr = ["aria-label"], Xr = {
  class: "w-full",
  preload: "",
  controls: ""
}, Qr = ["src"], Zr = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(i, { emit: t }) {
    const { apiUrl: s } = Y(), o = i, p = t, a = () => s.value + "?" + oe({ q: "preview", adapter: o.selection.adapter, path: o.selection.item.path });
    return G(() => {
      p("load");
    }), (c, u) => (n(), m(I, null, [
      e("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": i.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, v(i.selection.item.basename), 9, Wr),
      e("div", null, [
        e("video", Xr, [
          e("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Qr),
          T(" Your browser does not support the video tag. ")
        ])
      ])
    ], 64));
  }
}, ea = ["aria-label"], ta = {
  class: "w-full",
  controls: ""
}, oa = ["src"], sa = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(i, { emit: t }) {
    const { apiUrl: s } = Y(), o = i, p = t, a = () => s.value + "?" + oe({ q: "preview", adapter: o.selection.adapter, path: o.selection.item.path });
    return G(() => {
      p("load");
    }), (c, u) => (n(), m(I, null, [
      e("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": i.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, v(i.selection.item.basename), 9, ea),
      e("div", null, [
        e("audio", ta, [
          e("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, oa),
          T(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, ra = ["aria-label"], aa = ["data"], na = ["src"], la = /* @__PURE__ */ e("p", null, [
  /* @__PURE__ */ T(" Your browser does not support PDFs. "),
  /* @__PURE__ */ e("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ T(" . ")
], -1), ia = [
  la
], da = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(i, { emit: t }) {
    const { apiUrl: s } = Y(), o = i, p = t, a = () => s.value + "?" + oe({ q: "preview", adapter: o.selection.adapter, path: o.selection.item.path });
    return G(() => {
      p("load");
    }), (c, u) => (n(), m(I, null, [
      e("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": i.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, v(i.selection.item.basename), 9, ra),
      e("div", null, [
        e("object", {
          class: "h-[60vh]",
          data: a(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          e("iframe", {
            class: "border-0",
            src: a(),
            width: "100%",
            height: "100%"
          }, ia, 8, na)
        ], 8, aa)
      ])
    ], 64));
  }
}, ca = { class: "sm:flex sm:items-start" }, ua = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, ma = { class: "text-gray-700 dark:text-gray-200 text-sm" }, va = {
  key: 0,
  class: "flex leading-5"
}, pa = /* @__PURE__ */ e("svg", {
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
], -1), fa = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, ga = { class: "font-bold pl-2" }, ha = { class: "font-bold pl-2" }, ka = {
  name: "VFModalPreview"
}, xa = /* @__PURE__ */ Object.assign(ka, {
  props: {
    selection: Object
  },
  setup(i) {
    const { apiUrl: t } = Y(), s = b("emitter"), { t: o } = b("i18n"), p = k(!1), a = (d) => p.value = d, c = i, u = (d) => (c.selection.item.mime_type ?? "").startsWith(d), f = () => {
      const d = t.value + "?" + oe({ q: "download", adapter: c.selection.adapter, path: c.selection.item.path });
      s.emit("vf-download", d);
    };
    return (d, l) => (n(), H(J, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: l[6] || (l[6] = (x) => r(s).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Close")), 1),
        e("button", {
          type: "button",
          onClick: l[7] || (l[7] = (x) => f()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Download")), 1)
      ]),
      default: N(() => [
        e("div", ca, [
          e("div", ua, [
            e("div", null, [
              u("text") ? (n(), H(Hr, {
                key: 0,
                selection: i.selection,
                onLoad: l[0] || (l[0] = (x) => a(!0))
              }, null, 8, ["selection"])) : u("image") ? (n(), H(Pr, {
                key: 1,
                selection: i.selection,
                onLoad: l[1] || (l[1] = (x) => a(!0))
              }, null, 8, ["selection"])) : u("video") ? (n(), H(Zr, {
                key: 2,
                selection: i.selection,
                onLoad: l[2] || (l[2] = (x) => a(!0))
              }, null, 8, ["selection"])) : u("audio") ? (n(), H(sa, {
                key: 3,
                selection: i.selection,
                onLoad: l[3] || (l[3] = (x) => a(!0))
              }, null, 8, ["selection"])) : u("application/pdf") ? (n(), H(da, {
                key: 4,
                selection: i.selection,
                onLoad: l[4] || (l[4] = (x) => a(!0))
              }, null, 8, ["selection"])) : (n(), H(Kr, {
                key: 5,
                selection: i.selection,
                onLoad: l[5] || (l[5] = (x) => a(!0))
              }, null, 8, ["selection"]))
            ]),
            e("div", ma, [
              p.value == !1 ? (n(), m("div", va, [
                pa,
                e("span", null, v(r(o)("Loading")), 1)
              ])) : F("", !0)
            ])
          ])
        ]),
        e("div", fa, [
          e("div", null, [
            e("span", ga, v(r(o)("File Size")) + ": ", 1),
            T(v(r(ye)(i.selection.item.file_size)), 1)
          ]),
          e("div", null, [
            e("span", ha, v(r(o)("Last Modified")) + ": ", 1),
            T(" " + v(r(De)(i.selection.item.last_modified)), 1)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ba = { class: "sm:flex sm:items-start" }, wa = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ya = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, _a = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, $a = { class: "mt-2" }, ja = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Ca = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ma = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Sa = [
  Ma
], Da = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Oa = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), za = [
  Oa
], Ea = { class: "ml-1.5" }, Fa = {
  name: "VFModalRename"
}, La = /* @__PURE__ */ Object.assign(Fa, {
  props: {
    selection: Object,
    current: Object
  },
  setup(i) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), { t: o } = b("i18n"), p = i, a = k(p.selection.items[0]), c = k(p.selection.items[0].basename), u = k(""), f = () => {
      c.value != "" && t.emit("vf-fetch", {
        params: {
          q: "rename",
          adapter: s.value,
          path: p.current.dirname,
          item: a.value.path,
          name: c.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("%s is renamed.", c.value) });
        },
        onError: (d) => {
          u.value = o(d.message);
        }
      });
    };
    return (d, l) => (n(), H(J, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Rename")), 1),
        e("button", {
          type: "button",
          onClick: l[2] || (l[2] = (x) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Cancel")), 1)
      ]),
      default: N(() => [
        e("div", ba, [
          wa,
          e("div", ya, [
            e("h3", _a, v(r(o)("Rename")), 1),
            e("div", $a, [
              e("p", ja, [
                a.value.type == "dir" ? (n(), m("svg", Ca, Sa)) : (n(), m("svg", Da, za)),
                e("span", Ea, v(a.value.basename), 1)
              ]),
              q(e("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (x) => c.value = x),
                onKeyup: se(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [re, c.value]
              ]),
              u.value.length ? (n(), H(W, {
                key: 0,
                onHidden: l[1] || (l[1] = (x) => u.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(u.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Va = { class: "sm:flex sm:items-start" }, Na = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ba = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Aa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ha = { class: "mt-2" }, Ta = {
  key: 0,
  class: "pointer-events-none"
}, Ua = {
  key: 1,
  class: "pointer-events-none"
}, Ia = ["disabled"], qa = ["disabled"], Ra = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, Pa = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, Ga = ["textContent"], Ya = { class: "ml-1 w-full h-fit" }, Ja = { class: "text-left hidden md:block" }, Ka = { class: "text-left md:hidden" }, Wa = {
  key: 0,
  class: "ml-auto"
}, Xa = ["title", "disabled", "onClick"], Qa = /* @__PURE__ */ e("svg", {
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
], -1), Za = [
  Qa
], en = {
  key: 0,
  class: "py-2"
}, tn = ["disabled"], on = {
  name: "VFModalUpload"
}, sn = /* @__PURE__ */ Object.assign(on, {
  props: {
    current: Object
  },
  setup(i) {
    const { apiUrl: t } = Y(), s = b("emitter"), { t: o, getLocale: p } = b("i18n"), a = b("maxFileSize"), c = b("postData"), u = i, f = o("uppy"), d = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, l = k({ QUEUE_ENTRY_STATUS: d }), x = k(null), w = k(null), C = k(null), y = k(null), $ = k(null), z = k(null), M = k([]), O = k(""), j = k(!1), L = k(!1);
    let V;
    function D(h) {
      return M.value.findIndex((B) => B.id === h);
    }
    function Z(h, B = null) {
      B = B ?? (h.webkitRelativePath || h.name), V.addFile({
        name: B,
        type: h.type,
        data: h,
        source: "Local"
      });
    }
    function ee(h) {
      switch (h.status) {
        case d.DONE:
          return "text-green-600";
        case d.ERROR:
          return "text-red-600";
        case d.CANCELED:
          return "text-red-600";
        case d.PENDING:
        default:
          return "";
      }
    }
    const X = (h) => {
      switch (h.status) {
        case d.DONE:
          return "✓";
        case d.ERROR:
        case d.CANCELED:
          return "!";
        case d.PENDING:
        default:
          return "...";
      }
    };
    function ne() {
      y.value.click();
    }
    function le() {
      if (!j.value) {
        if (!M.value.filter((h) => h.status !== d.DONE).length) {
          O.value = o("Please select file to upload first.");
          return;
        }
        O.value = "", V.retryAll(), V.upload();
      }
    }
    function ie() {
      V.cancelAll({ reason: "user" }), M.value.forEach((h) => {
        h.status !== d.DONE && (h.status = d.CANCELED, h.statusName = o("Canceled"));
      }), j.value = !1;
    }
    function fe(h) {
      j.value || (V.removeFile(h.id, "removed-by-user"), M.value.splice(D(h.id), 1));
    }
    function _(h) {
      if (!j.value) {
        if (V.cancelAll({ reason: "user" }), h) {
          const B = [];
          M.value.forEach((g) => {
            g.status !== d.DONE && B.push(g);
          }), M.value = [], B.forEach((g) => {
            Z(g.originalFile, g.name);
          });
          return;
        }
        M.value.splice(0);
      }
    }
    function S() {
      s.emit("vf-modal-close");
    }
    return G(async () => {
      V = new Ue({
        debug: process.env.NODE_ENV === "development",
        restrictions: {
          maxFileSize: Et(a)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: f,
        onBeforeFileAdded(g, E) {
          if (E[g.id] != null) {
            const te = D(g.id);
            M.value[te].status === d.PENDING && (O.value = V.i18n("noDuplicates", { fileName: g.name })), M.value = M.value.filter((ge) => ge.id !== g.id);
          }
          return M.value.push({
            id: g.id,
            name: g.name,
            size: ye(g.size),
            status: d.PENDING,
            statusName: o("Pending upload"),
            percent: null,
            originalFile: g.data
          }), !0;
        }
      }), V.use(Ie, {
        method: "post",
        endpoint: t.value + "?" + oe(Object.assign(c, { q: "upload", adapter: u.current.adapter, path: u.current.dirname })),
        headers: {
          ...ue && { "X-CSRF-Token": ue }
        },
        limit: 5,
        timeout: 0,
        getResponseError(g, E) {
          let A;
          try {
            A = JSON.parse(g).message;
          } catch {
            A = o("Cannot parse server response.");
          }
          return new Error(A);
        }
      }), V.on("restriction-failed", (g, E) => {
        O.value = E.message;
      }), V.on("upload", () => {
        j.value = !0, M.value.forEach((g) => {
          g.status !== d.DONE && (g.percent = null, g.status = d.UPLOADING, g.statusName = o("Pending upload"));
        });
      }), V.on("upload-progress", (g, E) => {
        const A = Math.floor(E.bytesUploaded / E.bytesTotal * 100);
        M.value[D(g.id)].percent = `${A}%`;
      }), V.on("upload-success", (g) => {
        const E = M.value[D(g.id)];
        E.status = d.DONE, E.statusName = o("Done");
      }), V.on("upload-error", (g, E) => {
        const A = M.value[D(g.id)];
        A.percent = null, A.status = d.ERROR, E.isNetworkError ? A.statusName = o("Network Error, Unable establish connection to the server or interrupted.") : A.statusName = E ? E.message : o("Unknown Error");
      }), V.on("error", (g) => {
        O.value = g.message, j.value = !1, s.emit("vf-fetch", {
          params: { q: "index", adapter: u.current.adapter, path: u.current.dirname },
          noCloseModal: !0
        });
      }), V.on("complete", () => {
        j.value = !1, s.emit("vf-fetch", {
          params: { q: "index", adapter: u.current.adapter, path: u.current.dirname },
          noCloseModal: !0
        });
      }), y.value.addEventListener("click", () => {
        w.value.click();
      }), $.value.addEventListener("click", () => {
        C.value.click();
      }), z.value.addEventListener("dragover", (g) => {
        g.preventDefault(), L.value = !0;
      }), z.value.addEventListener("dragleave", (g) => {
        g.preventDefault(), L.value = !1;
      });
      function h(g, E) {
        E.isFile && E.file((A) => g(E, A)), E.isDirectory && E.createReader().readEntries((A) => {
          A.forEach((te) => {
            h(g, te);
          });
        });
      }
      z.value.addEventListener("drop", (g) => {
        g.preventDefault(), L.value = !1;
        const E = /^[/\\](.+)/;
        [...g.dataTransfer.items].forEach((A) => {
          A.kind === "file" && h((te, ge) => {
            const Oe = E.exec(te.fullPath);
            Z(ge, Oe[1]);
          }, A.webkitGetAsEntry());
        });
      });
      const B = ({ target: g }) => {
        const E = g.files;
        for (const A of E)
          Z(A);
      };
      w.value.addEventListener("change", B), C.value.addEventListener("change", B);
    }), Ce(() => {
      V == null || V.close({ reason: "unmount" });
    }), (h, B) => (n(), H(J, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          class: U(["w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:text-gray-50 sm:ml-3 sm:w-auto sm:text-sm", j.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: j.value,
          onClick: K(le, ["prevent"])
        }, v(r(o)("Upload")), 11, tn),
        j.value ? (n(), m("button", {
          key: 0,
          type: "button",
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
          onClick: K(ie, ["prevent"])
        }, v(r(o)("Cancel")), 1)) : (n(), m("button", {
          key: 1,
          type: "button",
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
          onClick: K(S, ["prevent"])
        }, v(r(o)("Close")), 1))
      ]),
      default: N(() => [
        e("div", Va, [
          Na,
          e("div", Ba, [
            e("h3", Aa, v(r(o)("Upload Files")), 1),
            e("div", Ha, [
              e("div", {
                ref_key: "dropArea",
                ref: z,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: ne
              }, [
                L.value ? (n(), m("div", Ta, v(r(o)("Release to drop these files.")), 1)) : (n(), m("div", Ua, v(r(o)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              e("div", {
                ref_key: "container",
                ref: x,
                class: "text-gray-500 mb-1"
              }, [
                e("button", {
                  ref_key: "pickFiles",
                  ref: y,
                  type: "button",
                  class: "w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto sm:text-sm"
                }, v(r(o)("Select Files")), 513),
                e("button", {
                  ref_key: "pickFolders",
                  ref: $,
                  type: "button",
                  class: "w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                }, v(r(o)("Select Folders")), 513),
                e("button", {
                  type: "button",
                  class: "w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
                  disabled: j.value,
                  onClick: B[0] || (B[0] = (g) => _(!1))
                }, v(r(o)("Clear all")), 9, Ia),
                e("button", {
                  type: "button",
                  class: "w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 disabled:cursor-not-allowed sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
                  disabled: j.value,
                  onClick: B[1] || (B[1] = (g) => _(!0))
                }, v(r(o)("Clear only successful")), 9, qa)
              ], 512),
              e("div", Ra, [
                (n(!0), m(I, null, R(M.value, (g) => (n(), m("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: g.id
                }, [
                  e("span", Pa, [
                    e("span", {
                      class: U(["text-base m-auto", ee(g)]),
                      textContent: v(X(g))
                    }, null, 10, Ga)
                  ]),
                  e("div", Ya, [
                    e("div", Ja, v(r(we)(g.name, 40)) + " (" + v(g.size) + ")", 1),
                    e("div", Ka, v(r(we)(g.name, 16)) + " (" + v(g.size) + ")", 1),
                    e("div", {
                      class: U(["flex break-all text-left", ee(g)])
                    }, [
                      T(v(g.statusName) + " ", 1),
                      g.status === l.value.QUEUE_ENTRY_STATUS.UPLOADING ? (n(), m("b", Wa, v(g.percent), 1)) : F("", !0)
                    ], 2)
                  ]),
                  e("button", {
                    type: "button",
                    class: U(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", j.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: r(o)("Delete"),
                    disabled: j.value,
                    onClick: (E) => fe(g)
                  }, Za, 10, Xa)
                ]))), 128)),
                M.value.length ? F("", !0) : (n(), m("div", en, v(r(o)("No files selected!")), 1))
              ])
            ])
          ])
        ]),
        e("input", {
          ref_key: "internalFileInput",
          ref: w,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        e("input", {
          ref_key: "internalFolderInput",
          ref: C,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}), rn = { class: "sm:flex sm:items-start" }, an = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), nn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ln = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, dn = { class: "mt-2" }, cn = {
  class: "text-gray-500 text-sm mb-1 overflow-auto",
  style: { "max-height": "200px" }
}, un = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, mn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), pn = [
  vn
], fn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), hn = [
  gn
], kn = { class: "ml-1.5" }, xn = ["placeholder"], bn = {
  name: "VFModalArchive"
}, wn = /* @__PURE__ */ Object.assign(bn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(i) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), { t: o } = b("i18n"), p = i, a = k(""), c = k(""), u = k(p.selection.items), f = () => {
      u.value.length && t.emit("vf-fetch", {
        params: {
          q: "archive",
          adapter: s.value,
          path: p.current.dirname,
          items: JSON.stringify(u.value.map(({ path: d, type: l }) => ({ path: d, type: l }))),
          name: a.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("The file(s) archived.") });
        },
        onError: (d) => {
          c.value = o(d.message);
        }
      });
    };
    return (d, l) => (n(), H(J, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Archive")), 1),
        e("button", {
          type: "button",
          onClick: l[2] || (l[2] = (x) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Cancel")), 1)
      ]),
      default: N(() => [
        e("div", rn, [
          an,
          e("div", nn, [
            e("h3", ln, v(r(o)("Archive the files")), 1),
            e("div", dn, [
              e("div", cn, [
                (n(!0), m(I, null, R(u.value, (x) => (n(), m("p", un, [
                  x.type == "dir" ? (n(), m("svg", mn, pn)) : (n(), m("svg", fn, hn)),
                  e("span", kn, v(x.basename), 1)
                ]))), 256))
              ]),
              q(e("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (x) => a.value = x),
                onKeyup: se(f, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(o)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, xn), [
                [re, a.value]
              ]),
              c.value.length ? (n(), H(W, {
                key: 0,
                onHidden: l[1] || (l[1] = (x) => c.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(c.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), yn = { class: "sm:flex sm:items-start" }, _n = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), $n = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, jn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Cn = { class: "mt-2" }, Mn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Sn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), On = [
  Dn
], zn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, En = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Fn = [
  En
], Ln = { class: "ml-1.5" }, Vn = { class: "my-1 text-sm text-gray-500" }, Nn = {
  name: "VFModalUnarchive"
}, Bn = /* @__PURE__ */ Object.assign(Nn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(i) {
    const t = b("emitter");
    b("storage");
    const s = b("adapter"), { t: o } = b("i18n"), p = i;
    k("");
    const a = k(p.selection.items[0]), c = k(""), u = k([]), f = () => {
      t.emit("vf-fetch", {
        params: {
          q: "unarchive",
          adapter: s.value,
          path: p.current.dirname,
          item: a.value.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("The file unarchived.") });
        },
        onError: (d) => {
          c.value = o(d.message);
        }
      });
    };
    return (d, l) => (n(), H(J, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Unarchive")), 1),
        e("button", {
          type: "button",
          onClick: l[1] || (l[1] = (x) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(o)("Cancel")), 1)
      ]),
      default: N(() => [
        e("div", yn, [
          _n,
          e("div", $n, [
            e("h3", jn, v(r(o)("Unarchive")), 1),
            e("div", Cn, [
              (n(!0), m(I, null, R(u.value, (x) => (n(), m("p", Mn, [
                x.type == "dir" ? (n(), m("svg", Sn, On)) : (n(), m("svg", zn, Fn)),
                e("span", Ln, v(x.basename), 1)
              ]))), 256)),
              e("p", Vn, v(r(o)("The archive will be unarchived at")) + " (" + v(i.current.dirname) + ")", 1),
              c.value.length ? (n(), H(W, {
                key: 0,
                onHidden: l[0] || (l[0] = (x) => c.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(c.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), An = { class: "sm:flex sm:items-start" }, Hn = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Tn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Un = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, In = { class: "mt-2" }, qn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Rn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Gn = [
  Pn
], Yn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Kn = [
  Jn
], Wn = { class: "ml-1.5" }, Xn = { class: "text-sm text-gray-500 pb-1 pt-3" }, Qn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Zn = /* @__PURE__ */ e("svg", {
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
], -1), el = { class: "ml-1.5 overflow-auto" }, tl = {
  name: "VFModalMove"
}, ol = /* @__PURE__ */ Object.assign(tl, {
  props: {
    selection: Object,
    current: Object
  },
  setup(i) {
    const t = b("emitter"), { t: s } = b("i18n");
    b("storage");
    const o = b("adapter"), p = i, a = k(p.selection.items.from), c = k(""), u = () => {
      a.value.length && t.emit("vf-fetch", {
        params: {
          q: "move",
          adapter: o.value,
          path: p.current.dirname,
          items: JSON.stringify(a.value.map(({ path: f, type: d }) => ({ path: f, type: d }))),
          item: p.selection.items.to.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: s("Files moved.", p.selection.items.to.name) });
        },
        onError: (f) => {
          c.value = s(f.message);
        }
      });
    };
    return (f, d) => (n(), H(J, null, {
      buttons: N(() => [
        e("button", {
          type: "button",
          onClick: u,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(s)("Yes, Move!")), 1),
        e("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => r(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, v(r(s)("Cancel")), 1)
      ]),
      default: N(() => [
        e("div", An, [
          Hn,
          e("div", Tn, [
            e("h3", Un, v(r(s)("Move files")), 1),
            e("div", In, [
              (n(!0), m(I, null, R(a.value, (l) => (n(), m("p", qn, [
                l.type == "dir" ? (n(), m("svg", Rn, Gn)) : (n(), m("svg", Yn, Kn)),
                e("span", Wn, v(l.path), 1)
              ]))), 256)),
              e("p", Xn, v(r(s)("Are you sure you want to move these files?")), 1),
              e("p", Qn, [
                Zn,
                e("span", el, v(i.selection.items.to.path), 1)
              ]),
              c.value.length ? (n(), H(W, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => c.value = ""),
                error: ""
              }, {
                default: N(() => [
                  T(v(c.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalArchive: wn,
  ModalDelete: lr,
  ModalMessage: fr,
  ModalMove: ol,
  ModalNewFile: Fr,
  ModalNewFolder: $r,
  ModalPreview: xa,
  ModalRename: La,
  ModalUnarchive: Bn,
  ModalUpload: sn
}, Symbol.toStringTag, { value: "Module" })), he = {
  VueFinder: Ls,
  ...sl
};
const vl = {
  install(i) {
    for (const t in he)
      if (he.hasOwnProperty(t)) {
        const s = he[t];
        i.component(s.name, s);
      }
  }
};
export {
  vl as default
};
