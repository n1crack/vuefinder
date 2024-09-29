var er = Object.defineProperty;
var tr = (t, e, n) => e in t ? er(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var vs = (t, e, n) => tr(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as yt, watch as Me, ref as D, shallowRef as nr, onMounted as Se, onUnmounted as jn, onUpdated as Ls, nextTick as ct, computed as rt, inject as re, openBlock as _, createElementBlock as g, withKeys as kt, unref as o, createElementVNode as l, withModifiers as Ze, renderSlot as Tt, normalizeClass as le, toDisplayString as b, createBlock as W, resolveDynamicComponent as Fs, withCtx as Q, createVNode as z, Fragment as ge, renderList as xe, createCommentVNode as q, withDirectives as ue, vModelCheckbox as zt, createTextVNode as J, vModelSelect as En, vModelText as xt, onBeforeUnmount as Hs, customRef as sr, vShow as Ue, isRef as or, TransitionGroup as rr, normalizeStyle as rn, mergeModels as lr, useModel as Rs, resolveComponent as ar, provide as ir, Transition as cr } from "vue";
import dr from "mitt";
import ur from "dragselect";
import vr from "@uppy/core";
import _r from "@uppy/xhr-upload";
import fr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import mr from "cropperjs";
var Os;
const yn = (Os = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Os.getAttribute("content");
class pr {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    vs(this, "config");
    this.config = e;
  }
  /** @type {RequestConfig} */
  get config() {
    return this.config;
  }
  /**
   * Transform request params
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {Record<String,?String>|FormData=} input.body
   * @return {RequestTransformResultInternal}
   */
  transformRequestParams(e) {
    const n = this.config, r = {};
    yn != null && yn !== "" && (r[n.xsrfHeaderName] = yn);
    const s = Object.assign({}, n.headers, r, e.headers), c = Object.assign({}, n.params, e.params), i = e.body, d = n.baseUrl + e.url, a = e.method;
    let u;
    a !== "get" && (i instanceof FormData ? (u = i, n.body != null && Object.entries(this.config.body).forEach(([v, p]) => {
      u.append(v, p);
    })) : (u = { ...i }, n.body != null && Object.assign(u, this.config.body)));
    const m = {
      url: d,
      method: a,
      headers: s,
      params: c,
      body: u
    };
    if (n.transformRequest != null) {
      const v = n.transformRequest({
        url: d,
        method: a,
        headers: s,
        params: c,
        body: u
      });
      v.url != null && (m.url = v.url), v.method != null && (m.method = v.method), v.params != null && (m.params = v.params ?? {}), v.headers != null && (m.headers = v.headers ?? {}), v.body != null && (m.body = v.body);
    }
    return m;
  }
  /**
   * Get download url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getDownloadUrl(e, n) {
    if (n.url != null)
      return n.url;
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: n.path }
    });
    return r.url + "?" + new URLSearchParams(r.params).toString();
  }
  /**
   * Get preview url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getPreviewUrl(e, n) {
    if (n.url != null)
      return n.url;
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: n.path }
    });
    return r.url + "?" + new URLSearchParams(r.params).toString();
  }
  /**
   * Send request
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {(Record<String,?String>|FormData|null)=} input.body
   * @param {'arrayBuffer'|'blob'|'json'|'text'=} input.responseType
   * @param {AbortSignal=} input.abortSignal
   * @returns {Promise<(ArrayBuffer|Blob|Record<String,?String>|String|null)>}
   * @throws {Record<String,?String>|null} resp json error
   */
  async send(e) {
    const n = this.transformRequestParams(e), r = e.responseType || "json", s = {
      method: e.method,
      headers: n.headers,
      signal: e.abortSignal
    }, c = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let d;
      n.body instanceof FormData ? d = e.body : (d = JSON.stringify(n.body), s.headers["Content-Type"] = "application/json"), s.body = d;
    }
    const i = await fetch(c, s);
    if (i.ok)
      return await i[r]();
    throw await i.json();
  }
}
function hr(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new pr(e);
}
function gr(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = yt(JSON.parse(e ?? "{}"));
  Me(n, r);
  function r() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(a, u) {
    n[a] = u;
  }
  function c(a) {
    delete n[a];
  }
  function i() {
    Object.keys(n).map((a) => c(a));
  }
  return { getStore: (a, u = null) => n.hasOwnProperty(a) ? n[a] : u, setStore: s, removeStore: c, clearStore: i };
}
async function br(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function wr(t, e, n, r) {
  const { getStore: s, setStore: c } = t, i = D({}), d = D(s("locale", e)), a = (v, p = e) => {
    br(v, r).then((f) => {
      i.value = f, c("locale", v), d.value = v, c("translations", f), Object.values(r).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + v }), n.emit("vf-language-saved"));
    }).catch((f) => {
      p ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), a(p, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Me(d, (v) => {
    a(v);
  }), !s("locale") && !r.length ? a(e) : i.value = s("translations");
  const u = (v, ...p) => p.length ? u(v = v.replace("%s", p.shift()), ...p) : v;
  function m(v, ...p) {
    return i.value && i.value.hasOwnProperty(v) ? u(i.value[v], ...p) : u(v, ...p);
  }
  return yt({ t: m, locale: d });
}
const de = {
  EDIT: "edit",
  NEW_FILE: "newfile",
  NEW_FOLDER: "newfolder",
  PREVIEW: "preview",
  ARCHIVE: "archive",
  UNARCHIVE: "unarchive",
  SEARCH: "search",
  RENAME: "rename",
  UPLOAD: "upload",
  DELETE: "delete",
  FULL_SCREEN: "fullscreen",
  DOWNLOAD: "download",
  LANGUAGE: "language"
}, yr = Object.values(de), kr = "2.6.3";
function Bs(t, e, n, r, s) {
  return (e = Math, n = e.log, r = 1024, s = n(t) / n(r) | 0, t / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Is(t, e, n, r, s) {
  return (e = Math, n = e.log, r = 1e3, s = n(t) / n(r) | 0, t / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function xr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const nt = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Sr(t, e) {
  const n = D(nt.SYSTEM), r = D(nt.LIGHT);
  n.value = t.getStore("theme", e ?? nt.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    n.value === nt.DARK || n.value === nt.SYSTEM && i.matches ? r.value = nt.DARK : r.value = nt.LIGHT;
  };
  return c(s), s.addEventListener("change", c), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: n,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: r,
    /**
     * @param {Theme} value
     */
    set(i) {
      n.value = i, i !== nt.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(s);
    }
  };
}
function $r() {
  const t = nr(null), e = D(!1), n = D();
  return { visible: e, type: t, data: n, open: (c, i = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = c, n.value = i;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  } };
}
/*!
 * OverlayScrollbars
 * Version: 2.10.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const Ve = (t, e) => {
  const { o: n, i: r, u: s } = t;
  let c = n, i;
  const d = (m, v) => {
    const p = c, f = m, h = v || (r ? !r(p, f) : p !== f);
    return (h || s) && (c = f, i = p), [c, h, i];
  };
  return [e ? (m) => d(e(c, i), m) : d, (m) => [c, !!m, i]];
}, Cr = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, De = Cr ? window : {}, Ns = Math.max, Er = Math.min, An = Math.round, Jt = Math.abs, _s = Math.sign, Us = De.cancelAnimationFrame, Gn = De.requestAnimationFrame, Zt = De.setTimeout, Tn = De.clearTimeout, ln = (t) => typeof De[t] < "u" ? De[t] : void 0, Ar = ln("MutationObserver"), fs = ln("IntersectionObserver"), Qt = ln("ResizeObserver"), Kt = ln("ScrollTimeline"), Kn = (t) => t === void 0, an = (t) => t === null, ze = (t) => typeof t == "number", Ot = (t) => typeof t == "string", Wn = (t) => typeof t == "boolean", Re = (t) => typeof t == "function", Pe = (t) => Array.isArray(t), en = (t) => typeof t == "object" && !Pe(t) && !an(t), Yn = (t) => {
  const e = !!t && t.length, n = ze(e) && e > -1 && e % 1 == 0;
  return Pe(t) || !Re(t) && n ? e > 0 && en(t) ? e - 1 in t : !0 : !1;
}, tn = (t) => !!t && t.constructor === Object, nn = (t) => t instanceof HTMLElement, cn = (t) => t instanceof Element;
function ae(t, e) {
  if (Yn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && ae(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const qs = (t, e) => t.indexOf(e) >= 0, Mt = (t, e) => t.concat(e), me = (t, e, n) => (!Ot(e) && Yn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), lt = (t) => Array.from(t || []), Xn = (t) => Pe(t) ? t : !Ot(t) && Yn(t) ? lt(t) : [t], Mn = (t) => !!t && !t.length, Dn = (t) => lt(new Set(t)), Fe = (t, e, n) => {
  ae(t, (s) => s ? s.apply(void 0, e || []) : !0), !n && (t.length = 0);
}, zs = "paddingTop", Ps = "paddingRight", js = "paddingLeft", Gs = "paddingBottom", Ks = "marginLeft", Ws = "marginRight", Ys = "marginBottom", Xs = "overflowX", Js = "overflowY", dn = "width", un = "height", st = "visible", it = "hidden", gt = "scroll", Tr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, vn = (t, e, n, r) => {
  if (t && e) {
    let s = !0;
    return ae(n, (c) => {
      const i = t[c], d = e[c];
      i !== d && (s = !1);
    }), s;
  }
  return !1;
}, Zs = (t, e) => vn(t, e, ["w", "h"]), Wt = (t, e) => vn(t, e, ["x", "y"]), Mr = (t, e) => vn(t, e, ["t", "r", "b", "l"]), dt = () => {
}, X = (t, ...e) => t.bind(0, ...e), ft = (t) => {
  let e;
  const n = t ? Zt : Gn, r = t ? Tn : Us;
  return [(s) => {
    r(e), e = n(() => s(), Re(t) ? t() : t);
  }, () => r(e)];
}, Vn = (t, e) => {
  const { _: n, v: r, p: s, S: c } = e || {};
  let i, d, a, u, m = dt;
  const v = function(S) {
    m(), Tn(i), u = i = d = void 0, m = dt, t.apply(this, S);
  }, p = (x) => c && d ? c(d, x) : x, f = () => {
    m !== dt && v(p(a) || a);
  }, h = function() {
    const S = lt(arguments), E = Re(n) ? n() : n;
    if (ze(E) && E >= 0) {
      const T = Re(r) ? r() : r, $ = ze(T) && T >= 0, V = E > 0 ? Zt : Gn, L = E > 0 ? Tn : Us, O = p(S) || S, y = v.bind(0, O);
      let w;
      m(), s && !u ? (y(), u = !0, w = V(() => u = void 0, E)) : (w = V(y, E), $ && !i && (i = Zt(f, T))), m = () => L(w), d = a = O;
    } else
      v(S);
  };
  return h.m = f, h;
}, Qs = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Be = (t) => t ? Object.keys(t) : [], oe = (t, e, n, r, s, c, i) => {
  const d = [e, n, r, s, c, i];
  return (typeof t != "object" || an(t)) && !Re(t) && (t = {}), ae(d, (a) => {
    ae(a, (u, m) => {
      const v = a[m];
      if (t === v)
        return !0;
      const p = Pe(v);
      if (v && tn(v)) {
        const f = t[m];
        let h = f;
        p && !Pe(f) ? h = [] : !p && !tn(f) && (h = {}), t[m] = oe(h, v);
      } else
        t[m] = p ? v.slice() : v;
    });
  }), t;
}, eo = (t, e) => ae(oe({}, t), (n, r, s) => {
  n === void 0 ? delete s[r] : n && tn(n) && (s[r] = eo(n));
}), Jn = (t) => !Be(t).length, to = (t, e, n) => Ns(t, Er(e, n)), ut = (t) => Dn((Pe(t) ? t : (t || "").split(" ")).filter((e) => e)), Zn = (t, e) => t && t.getAttribute(e), ms = (t, e) => t && t.hasAttribute(e), Xe = (t, e, n) => {
  ae(ut(e), (r) => {
    t && t.setAttribute(r, String(n || ""));
  });
}, Ne = (t, e) => {
  ae(ut(e), (n) => t && t.removeAttribute(n));
}, _n = (t, e) => {
  const n = ut(Zn(t, e)), r = X(Xe, t, e), s = (c, i) => {
    const d = new Set(n);
    return ae(ut(c), (a) => {
      d[i](a);
    }), lt(d).join(" ");
  };
  return {
    O: (c) => r(s(c, "delete")),
    $: (c) => r(s(c, "add")),
    C: (c) => {
      const i = ut(c);
      return i.reduce((d, a) => d && n.includes(a), i.length > 0);
    }
  };
}, no = (t, e, n) => (_n(t, e).O(n), X(Qn, t, e, n)), Qn = (t, e, n) => (_n(t, e).$(n), X(no, t, e, n)), sn = (t, e, n, r) => (r ? Qn : no)(t, e, n), es = (t, e, n) => _n(t, e).C(n), so = (t) => _n(t, "class"), oo = (t, e) => {
  so(t).O(e);
}, ts = (t, e) => (so(t).$(e), X(oo, t, e)), ro = (t, e) => {
  const n = e ? cn(e) && e : document;
  return n ? lt(n.querySelectorAll(t)) : [];
}, Dr = (t, e) => {
  const n = e ? cn(e) && e : document;
  return n && n.querySelector(t);
}, On = (t, e) => cn(t) && t.matches(e), lo = (t) => On(t, "body"), Ln = (t) => t ? lt(t.childNodes) : [], Dt = (t) => t && t.parentElement, mt = (t, e) => cn(t) && t.closest(e), Fn = (t) => document.activeElement, Vr = (t, e, n) => {
  const r = mt(t, e), s = t && Dr(n, r), c = mt(s, e) === r;
  return r && s ? r === t || s === t || c && mt(mt(t, n), e) !== r : !1;
}, bt = (t) => {
  ae(Xn(t), (e) => {
    const n = Dt(e);
    e && n && n.removeChild(e);
  });
}, Oe = (t, e) => X(bt, t && e && ae(Xn(e), (n) => {
  n && t.appendChild(n);
})), pt = (t) => {
  const e = document.createElement("div");
  return Xe(e, "class", t), e;
}, ao = (t) => {
  const e = pt();
  return e.innerHTML = t.trim(), ae(Ln(e), (n) => bt(n));
}, ps = (t, e) => t.getPropertyValue(e) || t[e] || "", io = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Pt = (t) => io(parseFloat(t || "")), Hn = (t) => Math.round(t * 1e4) / 1e4, co = (t) => `${Hn(io(t))}px`;
function Vt(t, e) {
  t && e && ae(e, (n, r) => {
    try {
      const s = t.style, c = an(n) || Wn(n) ? "" : ze(n) ? co(n) : n;
      r.indexOf("--") === 0 ? s.setProperty(r, c) : s[r] = c;
    } catch {
    }
  });
}
function Qe(t, e, n) {
  const r = Ot(e);
  let s = r ? "" : {};
  if (t) {
    const c = De.getComputedStyle(t, n) || t.style;
    s = r ? ps(c, e) : lt(e).reduce((i, d) => (i[d] = ps(c, d), i), s);
  }
  return s;
}
const hs = (t, e, n) => {
  const r = e ? `${e}-` : "", s = n ? `-${n}` : "", c = `${r}top${s}`, i = `${r}right${s}`, d = `${r}bottom${s}`, a = `${r}left${s}`, u = Qe(t, [c, i, d, a]);
  return {
    t: Pt(u[c]),
    r: Pt(u[i]),
    b: Pt(u[d]),
    l: Pt(u[a])
  };
}, Or = (t, e) => `translate${en(t) ? `(${t.x},${t.y})` : `Y(${t})`}`, Lr = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Fr = {
  w: 0,
  h: 0
}, fn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Fr, Hr = (t) => fn("inner", t || De), ht = X(fn, "offset"), uo = X(fn, "client"), on = X(fn, "scroll"), ns = (t) => {
  const e = parseFloat(Qe(t, dn)) || 0, n = parseFloat(Qe(t, un)) || 0;
  return {
    w: e - An(e),
    h: n - An(n)
  };
}, kn = (t) => t.getBoundingClientRect(), Rr = (t) => !!t && Lr(t), Rn = (t) => !!(t && (t[un] || t[dn])), vo = (t, e) => {
  const n = Rn(t);
  return !Rn(e) && n;
}, gs = (t, e, n, r) => {
  ae(ut(e), (s) => {
    t && t.removeEventListener(s, n, r);
  });
}, ve = (t, e, n, r) => {
  var s;
  const c = (s = r && r.H) != null ? s : !0, i = r && r.I || !1, d = r && r.A || !1, a = {
    passive: c,
    capture: i
  };
  return X(Fe, ut(e).map((u) => {
    const m = d ? (v) => {
      gs(t, u, m, i), n && n(v);
    } : n;
    return t && t.addEventListener(u, m, a), X(gs, t, u, m, i);
  }));
}, _o = (t) => t.stopPropagation(), Bn = (t) => t.preventDefault(), fo = (t) => _o(t) || Bn(t), qe = (t, e) => {
  const { x: n, y: r } = ze(e) ? {
    x: e,
    y: e
  } : e || {};
  ze(n) && (t.scrollLeft = n), ze(r) && (t.scrollTop = r);
}, Le = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), mo = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), Br = (t, e) => {
  const { D: n, M: r } = t, { w: s, h: c } = e, i = (v, p, f) => {
    let h = _s(v) * f, x = _s(p) * f;
    if (h === x) {
      const S = Jt(v), E = Jt(p);
      x = S > E ? 0 : x, h = S < E ? 0 : h;
    }
    return h = h === x ? 0 : h, [h + 0, x + 0];
  }, [d, a] = i(n.x, r.x, s), [u, m] = i(n.y, r.y, c);
  return {
    D: {
      x: d,
      y: u
    },
    M: {
      x: a,
      y: m
    }
  };
}, bs = ({ D: t, M: e }) => {
  const n = (r, s) => r === 0 && r <= s;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, ws = ({ D: t, M: e }, n) => {
  const r = (s, c, i) => to(0, 1, (s - i) / (s - c) || 0);
  return {
    x: r(t.x, e.x, n.x),
    y: r(t.y, e.y, n.y)
  };
}, In = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, ys = (t, e) => {
  ae(Xn(e), t);
}, Nn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (c, i) => {
    if (c) {
      const d = e.get(c);
      ys((a) => {
        d && d[a ? "delete" : "clear"](a);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, r = (c, i) => {
    if (Ot(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), ys((m) => {
        Re(m) && u.add(m);
      }, i), X(n, c, i);
    }
    Wn(i) && i && n();
    const d = Be(c), a = [];
    return ae(d, (u) => {
      const m = c[u];
      m && me(a, r(u, m));
    }), X(Fe, a);
  }, s = (c, i) => {
    ae(lt(e.get(c)), (d) => {
      i && !Mn(i) ? d.apply(0, i) : d();
    });
  };
  return r(t || {}), [r, n, s];
}, ks = (t) => JSON.stringify(t, (e, n) => {
  if (Re(n))
    throw 0;
  return n;
}), xs = (t, e) => t ? `${e}`.split(".").reduce((n, r) => n && Qs(n, r) ? n[r] : void 0, t) : void 0, Ir = {
  paddingAbsolute: !1,
  showNativeOverlaidScrollbars: !1,
  update: {
    elementEvents: [["img", "load"]],
    debounce: [0, 33],
    attributes: null,
    ignoreMutation: null
  },
  overflow: {
    x: "scroll",
    y: "scroll"
  },
  scrollbars: {
    theme: "os-theme-dark",
    visibility: "auto",
    autoHide: "never",
    autoHideDelay: 1300,
    autoHideSuspend: !1,
    dragScroll: !0,
    clickScroll: !1,
    pointers: ["mouse", "touch", "pen"]
  }
}, po = (t, e) => {
  const n = {}, r = Mt(Be(e), Be(t));
  return ae(r, (s) => {
    const c = t[s], i = e[s];
    if (en(c) && en(i))
      oe(n[s] = {}, po(c, i)), Jn(n[s]) && delete n[s];
    else if (Qs(e, s) && i !== c) {
      let d = !0;
      if (Pe(c) || Pe(i))
        try {
          ks(c) === ks(i) && (d = !1);
        } catch {
        }
      d && (n[s] = i);
    }
  }), n;
}, Ss = (t, e, n) => (r) => [xs(t, r), n || xs(e, r) !== void 0], St = "data-overlayscrollbars", Yt = "os-environment", jt = `${Yt}-scrollbar-hidden`, xn = `${St}-initialize`, Xt = "noClipping", $s = `${St}-body`, ot = St, Nr = "host", Je = `${St}-viewport`, Ur = Xs, qr = Js, zr = "arrange", ho = "measuring", Pr = "scrolling", go = "scrollbarHidden", jr = "noContent", Un = `${St}-padding`, Cs = `${St}-content`, ss = "os-size-observer", Gr = `${ss}-appear`, Kr = `${ss}-listener`, Wr = "os-trinsic-observer", Yr = "os-theme-none", He = "os-scrollbar", Xr = `${He}-rtl`, Jr = `${He}-horizontal`, Zr = `${He}-vertical`, bo = `${He}-track`, os = `${He}-handle`, Qr = `${He}-visible`, el = `${He}-cornerless`, Es = `${He}-interaction`, As = `${He}-unusable`, qn = `${He}-auto-hide`, Ts = `${qn}-hidden`, Ms = `${He}-wheel`, tl = `${bo}-interactive`, nl = `${os}-interactive`;
let wo;
const sl = () => wo, ol = (t) => {
  wo = t;
};
let Sn;
const rl = () => {
  const t = ($, V, L) => {
    Oe(document.body, $), Oe(document.body, $);
    const P = uo($), O = ht($), y = ns(V);
    return L && bt($), {
      x: O.h - P.h + y.h,
      y: O.w - P.w + y.w
    };
  }, e = ($) => {
    let V = !1;
    const L = ts($, jt);
    try {
      V = Qe($, "scrollbar-width") === "none" || Qe($, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return L(), V;
  }, n = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${jt}{scrollbar-width:none!important}.${jt}::-webkit-scrollbar,.${jt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = ao(`<div class="${Yt}"><div></div><style>${n}</style></div>`)[0], c = s.firstChild, i = s.lastChild, d = sl();
  d && (i.nonce = d);
  const [a, , u] = Nn(), [m, v] = Ve({
    o: t(s, c),
    i: Wt
  }, X(t, s, c, !0)), [p] = v(), f = e(s), h = {
    x: p.x === 0,
    y: p.y === 0
  }, x = {
    elements: {
      host: null,
      padding: !f,
      viewport: ($) => f && lo($) && $,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, S = oe({}, Ir), E = X(oe, {}, S), R = X(oe, {}, x), T = {
    T: p,
    k: h,
    R: f,
    V: !!Kt,
    L: X(a, "r"),
    U: R,
    P: ($) => oe(x, $) && R(),
    N: E,
    q: ($) => oe(S, $) && E(),
    B: oe({}, x),
    F: oe({}, S)
  };
  if (Ne(s, "style"), bt(s), ve(De, "resize", () => {
    u("r", []);
  }), Re(De.matchMedia) && !f && (!h.x || !h.y)) {
    const $ = (V) => {
      const L = De.matchMedia(`(resolution: ${De.devicePixelRatio}dppx)`);
      ve(L, "change", () => {
        V(), $(V);
      }, {
        A: !0
      });
    };
    $(() => {
      const [V, L] = m();
      oe(T.T, V), u("r", [L]);
    });
  }
  return T;
}, Ge = () => (Sn || (Sn = rl()), Sn), yo = (t, e) => Re(e) ? e.apply(0, t) : e, ll = (t, e, n, r) => {
  const s = Kn(r) ? n : r;
  return yo(t, s) || e.apply(0, t);
}, ko = (t, e, n, r) => {
  const s = Kn(r) ? n : r, c = yo(t, s);
  return !!c && (nn(c) ? c : e.apply(0, t));
}, al = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: r } = e || {}, { k: s, R: c, U: i } = Ge(), { nativeScrollbarsOverlaid: d, body: a } = i().cancel, u = n ?? d, m = Kn(r) ? a : r, v = (s.x || s.y) && u, p = t && (an(m) ? !c : m);
  return !!v || !!p;
}, rs = /* @__PURE__ */ new WeakMap(), il = (t, e) => {
  rs.set(t, e);
}, cl = (t) => {
  rs.delete(t);
}, xo = (t) => rs.get(t), dl = (t, e, n) => {
  let r = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    r = !0;
  }, i = (d) => {
    if (s && n) {
      const a = n.map((u) => {
        const [m, v] = u || [];
        return [v && m ? (d || ro)(m, t) : [], v];
      });
      ae(a, (u) => ae(u[0], (m) => {
        const v = u[1], p = s.get(m) || [];
        if (t.contains(m) && v) {
          const h = ve(m, v, (x) => {
            r ? (h(), s.delete(m)) : e(x);
          });
          s.set(m, me(p, h));
        } else
          Fe(p), s.delete(m);
      }));
    }
  };
  return i(), [c, i];
}, Ds = (t, e, n, r) => {
  let s = !1;
  const { j: c, X: i, Y: d, W: a, J: u, G: m } = r || {}, v = Vn(() => s && n(!0), {
    _: 33,
    v: 99
  }), [p, f] = dl(t, v, d), h = c || [], x = i || [], S = Mt(h, x), E = (T, $) => {
    if (!Mn($)) {
      const V = u || dt, L = m || dt, P = [], O = [];
      let y = !1, w = !1;
      if (ae($, (C) => {
        const { attributeName: A, target: B, type: k, oldValue: N, addedNodes: U, removedNodes: ee } = C, se = k === "attributes", ne = k === "childList", pe = t === B, F = se && A, H = F && Zn(B, A || ""), I = Ot(H) ? H : null, j = F && N !== I, M = qs(x, A) && j;
        if (e && (ne || !pe)) {
          const K = se && j, G = K && a && On(B, a), te = (G ? !V(B, A, N, I) : !se || K) && !L(C, !!G, t, r);
          ae(U, (ie) => me(P, ie)), ae(ee, (ie) => me(P, ie)), w = w || te;
        }
        !e && pe && j && !V(B, A, N, I) && (me(O, A), y = y || M);
      }), f((C) => Dn(P).reduce((A, B) => (me(A, ro(C, B)), On(B, C) ? me(A, B) : A), [])), e)
        return !T && w && n(!1), [!1];
      if (!Mn(O) || y) {
        const C = [Dn(O), y];
        return !T && n.apply(0, C), C;
      }
    }
  }, R = new Ar(X(E, !1));
  return [() => (R.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: S,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (p(), R.disconnect(), s = !1);
  }), () => {
    if (s)
      return v.m(), E(!0, R.takeRecords());
  }];
}, So = {}, $o = {}, ul = (t) => {
  ae(t, (e) => ae(e, (n, r) => {
    So[r] = e[r];
  }));
}, Co = (t, e, n) => Be(t).map((r) => {
  const { static: s, instance: c } = t[r], [i, d, a] = n || [], u = n ? c : s;
  if (u) {
    const m = n ? u(i, d, e) : u(e);
    return (a || $o)[r] = m;
  }
}), Lt = (t) => $o[t], vl = "__osOptionsValidationPlugin", _l = "__osSizeObserverPlugin", fl = (t, e) => {
  const { k: n } = e, [r, s] = t("showNativeOverlaidScrollbars");
  return [r && n.x && n.y, s];
}, wt = (t) => t.indexOf(st) === 0, ml = (t, e) => {
  const n = (s, c, i, d) => {
    const a = s === st ? it : s.replace(`${st}-`, ""), u = wt(s), m = wt(i);
    return !c && !d ? it : u && m ? st : u ? c && d ? a : c ? st : it : c ? a : m && d ? st : it;
  }, r = {
    x: n(e.x, t.x, e.y, t.y),
    y: n(e.y, t.y, e.x, t.x)
  };
  return {
    K: r,
    Z: {
      x: r.x === gt,
      y: r.y === gt
    }
  };
}, Eo = "__osScrollbarsHidingPlugin", pl = "__osClickScrollPlugin", Ao = (t, e, n) => {
  const { dt: r } = n || {}, s = Lt(_l), [c] = Ve({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], a = ao(`<div class="${ss}"><div class="${Kr}"></div></div>`)[0], u = a.firstChild, m = (v) => {
      const p = v instanceof ResizeObserverEntry;
      let f = !1, h = !1;
      if (p) {
        const [x, , S] = c(v.contentRect), E = Rn(x);
        h = vo(x, S), f = !h && !E;
      } else
        h = v === !0;
      f || e({
        ft: !0,
        dt: h
      });
    };
    if (Qt) {
      const v = new Qt((p) => m(p.pop()));
      v.observe(u), me(i, () => {
        v.disconnect();
      });
    } else if (s) {
      const [v, p] = s(u, m, r);
      me(i, Mt([ts(a, Gr), ve(a, "animationstart", v)], p));
    } else
      return dt;
    return X(Fe, me(i, Oe(t, a)));
  };
}, hl = (t, e) => {
  let n;
  const r = (a) => a.h === 0 || a.isIntersecting || a.intersectionRatio > 0, s = pt(Wr), [c] = Ve({
    o: !1
  }), i = (a, u) => {
    if (a) {
      const m = c(r(a)), [, v] = m;
      return v && !u && e(m) && [m];
    }
  }, d = (a, u) => i(u.pop(), a);
  return [() => {
    const a = [];
    if (fs)
      n = new fs(X(d, !1), {
        root: t
      }), n.observe(s), me(a, () => {
        n.disconnect();
      });
    else {
      const u = () => {
        const m = ht(s);
        i(m);
      };
      me(a, Ao(s, u)()), u();
    }
    return X(Fe, me(a, Oe(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, gl = (t, e, n, r) => {
  let s, c, i, d, a, u;
  const m = `[${ot}]`, v = `[${Je}]`, p = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: f, ht: h, ot: x, gt: S, bt: E, nt: R, wt: T, yt: $, St: V, Ot: L } = t, P = (M) => Qe(M, "direction") === "rtl", O = {
    $t: !1,
    ct: P(f)
  }, y = Ge(), w = Lt(Eo), [C] = Ve({
    i: Zs,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const M = w && w.tt(t, e, O, y, n).ut, G = !(T && R) && es(h, ot, Xt), Y = !R && $(zr), te = Y && Le(S), ie = te && L(), be = V(ho, G), _e = Y && M && M()[0], $e = on(x), Z = ns(x);
    return _e && _e(), qe(S, te), ie && ie(), G && be(), {
      w: $e.w + Z.w,
      h: $e.h + Z.h
    };
  }), A = Vn(r, {
    _: () => s,
    v: () => c,
    S(M, K) {
      const [G] = M, [Y] = K;
      return [Mt(Be(G), Be(Y)).reduce((te, ie) => (te[ie] = G[ie] || Y[ie], te), {})];
    }
  }), B = (M) => {
    const K = P(f);
    oe(M, {
      Ct: u !== K
    }), oe(O, {
      ct: K
    }), u = K;
  }, k = (M, K) => {
    const [G, Y] = M, te = {
      xt: Y
    };
    return oe(O, {
      $t: G
    }), !K && r(te), te;
  }, N = ({ ft: M, dt: K }) => {
    const Y = !(M && !K) && y.R ? A : r, te = {
      ft: M || K,
      dt: K
    };
    B(te), Y(te);
  }, U = (M, K) => {
    const [, G] = C(), Y = {
      Ht: G
    };
    return B(Y), G && !K && (M ? r : A)(Y), Y;
  }, ee = (M, K, G) => {
    const Y = {
      Et: K
    };
    return B(Y), K && !G && A(Y), Y;
  }, [se, ne] = E ? hl(h, k) : [], pe = !R && Ao(h, N, {
    dt: !0
  }), [F, H] = Ds(h, !1, ee, {
    X: p,
    j: p
  }), I = R && Qt && new Qt((M) => {
    const K = M[M.length - 1].contentRect;
    N({
      ft: !0,
      dt: vo(K, a)
    }), a = K;
  }), j = Vn(() => {
    const [, M] = C();
    r({
      Ht: M
    });
  }, {
    _: 222,
    p: !0
  });
  return [() => {
    I && I.observe(h);
    const M = pe && pe(), K = se && se(), G = F(), Y = y.L((te) => {
      te ? A({
        zt: te
      }) : j();
    });
    return () => {
      I && I.disconnect(), M && M(), K && K(), d && d(), G(), Y();
    };
  }, ({ It: M, At: K, Dt: G }) => {
    const Y = {}, [te] = M("update.ignoreMutation"), [ie, be] = M("update.attributes"), [_e, $e] = M("update.elementEvents"), [Z, Ce] = M("update.debounce"), Ae = $e || be, ye = K || G, Ee = (he) => Re(te) && te(he);
    if (Ae) {
      i && i(), d && d();
      const [he, we] = Ds(E || x, !0, U, {
        j: Mt(p, ie || []),
        Y: _e,
        W: m,
        G: (ce, fe) => {
          const { target: ke, attributeName: Te } = ce;
          return (!fe && Te && !R ? Vr(ke, m, v) : !1) || !!mt(ke, `.${He}`) || !!Ee(ce);
        }
      });
      d = he(), i = we;
    }
    if (Ce)
      if (A.m(), Pe(Z)) {
        const he = Z[0], we = Z[1];
        s = ze(he) && he, c = ze(we) && we;
      } else ze(Z) ? (s = Z, c = !1) : (s = !1, c = !1);
    if (ye) {
      const he = H(), we = ne && ne(), ce = i && i();
      he && oe(Y, ee(he[0], he[1], ye)), we && oe(Y, k(we[0], ye)), ce && oe(Y, U(ce[0], ye));
    }
    return B(Y), Y;
  }, O];
}, bl = (t, e, n, r) => {
  const s = "--os-viewport-percent", c = "--os-scroll-percent", i = "--os-scroll-direction", { U: d } = Ge(), { scrollbars: a } = d(), { slot: u } = a, { vt: m, ht: v, ot: p, Mt: f, gt: h, wt: x, nt: S } = e, { scrollbars: E } = f ? {} : t, { slot: R } = E || {}, T = [], $ = [], V = [], L = ko([m, v, p], () => S && x ? m : v, u, R), P = (F) => {
    if (Kt) {
      const H = new Kt({
        source: h,
        axis: F
      });
      return {
        kt: (j) => {
          const M = j.Tt.animate({
            clear: ["left"],
            [c]: [0, 1]
          }, {
            timeline: H
          });
          return () => M.cancel();
        }
      };
    }
  }, O = {
    x: P("x"),
    y: P("y")
  }, y = () => {
    const { Rt: F, Vt: H } = n, I = (j, M) => to(0, 1, j / (j + M) || 0);
    return {
      x: I(H.x, F.x),
      y: I(H.y, F.y)
    };
  }, w = (F, H, I) => {
    const j = I ? ts : oo;
    ae(F, (M) => {
      j(M.Tt, H);
    });
  }, C = (F, H) => {
    ae(F, (I) => {
      const [j, M] = H(I);
      Vt(j, M);
    });
  }, A = (F, H, I) => {
    const j = Wn(I), M = j ? I : !0, K = j ? !I : !0;
    M && w($, F, H), K && w(V, F, H);
  }, B = () => {
    const F = y(), H = (I) => (j) => [j.Tt, {
      [s]: Hn(I) + ""
    }];
    C($, H(F.x)), C(V, H(F.y));
  }, k = () => {
    if (!Kt) {
      const { Lt: F } = n, H = ws(F, Le(h)), I = (j) => (M) => [M.Tt, {
        [c]: Hn(j) + ""
      }];
      C($, I(H.x)), C(V, I(H.y));
    }
  }, N = () => {
    const { Lt: F } = n, H = bs(F), I = (j) => (M) => [M.Tt, {
      [i]: j ? "0" : "1"
    }];
    C($, I(H.x)), C(V, I(H.y));
  }, U = () => {
    if (S && !x) {
      const { Rt: F, Lt: H } = n, I = bs(H), j = ws(H, Le(h)), M = (K) => {
        const { Tt: G } = K, Y = Dt(G) === p && G, te = (ie, be, _e) => {
          const $e = be * ie;
          return co(_e ? $e : -$e);
        };
        return [Y, Y && {
          transform: Or({
            x: te(j.x, F.x, I.x),
            y: te(j.y, F.y, I.y)
          })
        }];
      };
      C($, M), C(V, M);
    }
  }, ee = (F) => {
    const H = F ? "x" : "y", j = pt(`${He} ${F ? Jr : Zr}`), M = pt(bo), K = pt(os), G = {
      Tt: j,
      Ut: M,
      Pt: K
    }, Y = O[H];
    return me(F ? $ : V, G), me(T, [Oe(j, M), Oe(M, K), X(bt, j), Y && Y.kt(G), r(G, A, F)]), G;
  }, se = X(ee, !0), ne = X(ee, !1), pe = () => (Oe(L, $[0].Tt), Oe(L, V[0].Tt), X(Fe, T));
  return se(), ne(), [{
    Nt: B,
    qt: k,
    Bt: N,
    Ft: U,
    jt: A,
    Xt: {
      Yt: $,
      Wt: se,
      Jt: X(C, $)
    },
    Gt: {
      Yt: V,
      Wt: ne,
      Jt: X(C, V)
    }
  }, pe];
}, wl = (t, e, n, r) => (s, c, i) => {
  const { ht: d, ot: a, nt: u, gt: m, Kt: v, Ot: p } = e, { Tt: f, Ut: h, Pt: x } = s, [S, E] = ft(333), [R, T] = ft(444), $ = (P) => {
    Re(m.scrollBy) && m.scrollBy({
      behavior: "smooth",
      left: P.x,
      top: P.y
    });
  }, V = () => {
    const P = "pointerup pointercancel lostpointercapture", O = `client${i ? "X" : "Y"}`, y = i ? dn : un, w = i ? "left" : "top", C = i ? "w" : "h", A = i ? "x" : "y", B = (N, U) => (ee) => {
      const { Rt: se } = n, ne = ht(h)[C] - ht(x)[C], F = U * ee / ne * se[A];
      qe(m, {
        [A]: N + F
      });
    }, k = [];
    return ve(h, "pointerdown", (N) => {
      const U = mt(N.target, `.${os}`) === x, ee = U ? x : h, se = t.scrollbars, ne = se[U ? "dragScroll" : "clickScroll"], { button: pe, isPrimary: F, pointerType: H } = N, { pointers: I } = se;
      if (pe === 0 && F && ne && (I || []).includes(H)) {
        Fe(k), T();
        const M = !U && (N.shiftKey || ne === "instant"), K = X(kn, x), G = X(kn, h), Y = (fe, ke) => (fe || K())[w] - (ke || G())[w], te = An(kn(m)[y]) / ht(m)[C] || 1, ie = B(Le(m)[A], 1 / te), be = N[O], _e = K(), $e = G(), Z = _e[y], Ce = Y(_e, $e) + Z / 2, Ae = be - $e[w], ye = U ? 0 : Ae - Ce, Ee = (fe) => {
          Fe(ce), ee.releasePointerCapture(fe.pointerId);
        }, he = U || M, we = p(), ce = [ve(v, P, Ee), ve(v, "selectstart", (fe) => Bn(fe), {
          H: !1
        }), ve(h, P, Ee), he && ve(h, "pointermove", (fe) => ie(ye + (fe[O] - be))), he && (() => {
          const fe = Le(m);
          we();
          const ke = Le(m), Te = {
            x: ke.x - fe.x,
            y: ke.y - fe.y
          };
          (Jt(Te.x) > 3 || Jt(Te.y) > 3) && (p(), qe(m, fe), $(Te), R(we));
        })];
        if (ee.setPointerCapture(N.pointerId), M)
          ie(ye);
        else if (!U) {
          const fe = Lt(pl);
          if (fe) {
            const ke = fe(ie, ye, Z, (Te) => {
              Te ? we() : me(ce, we);
            });
            me(ce, ke), me(k, X(ke, !0));
          }
        }
      }
    });
  };
  let L = !0;
  return X(Fe, [ve(x, "pointermove pointerleave", r), ve(f, "pointerenter", () => {
    c(Es, !0);
  }), ve(f, "pointerleave pointercancel", () => {
    c(Es, !1);
  }), !u && ve(f, "mousedown", () => {
    const P = Fn();
    (ms(P, Je) || ms(P, ot) || P === document.body) && Zt(X(In, a), 25);
  }), ve(f, "wheel", (P) => {
    const { deltaX: O, deltaY: y, deltaMode: w } = P;
    L && w === 0 && Dt(f) === d && $({
      x: O,
      y
    }), L = !1, c(Ms, !0), S(() => {
      L = !0, c(Ms);
    }), Bn(P);
  }, {
    H: !1,
    I: !0
  }), ve(f, "pointerdown", X(ve, v, "click", fo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), V(), E, T]);
}, yl = (t, e, n, r, s, c) => {
  let i, d, a, u, m, v = dt, p = 0;
  const f = (F) => F.pointerType === "mouse", [h, x] = ft(), [S, E] = ft(100), [R, T] = ft(100), [$, V] = ft(() => p), [L, P] = bl(t, s, r, wl(e, s, r, (F) => f(F) && ee())), { ht: O, Qt: y, wt: w } = s, { jt: C, Nt: A, qt: B, Bt: k, Ft: N } = L, U = (F, H) => {
    if (V(), F)
      C(Ts);
    else {
      const I = X(C, Ts, !0);
      p > 0 && !H ? $(I) : I();
    }
  }, ee = () => {
    (a ? !i : !u) && (U(!0), S(() => {
      U(!1);
    }));
  }, se = (F) => {
    C(qn, F, !0), C(qn, F, !1);
  }, ne = (F) => {
    f(F) && (i = a, a && U(!0));
  }, pe = [V, E, T, x, () => v(), ve(O, "pointerover", ne, {
    A: !0
  }), ve(O, "pointerenter", ne), ve(O, "pointerleave", (F) => {
    f(F) && (i = !1, a && U(!1));
  }), ve(O, "pointermove", (F) => {
    f(F) && d && ee();
  }), ve(y, "scroll", (F) => {
    h(() => {
      B(), ee();
    }), c(F), N();
  })];
  return [() => X(Fe, me(pe, P())), ({ It: F, Dt: H, Zt: I, tn: j }) => {
    const { nn: M, sn: K, en: G, cn: Y } = j || {}, { Ct: te, dt: ie } = I || {}, { ct: be } = n, { k: _e } = Ge(), { K: $e, rn: Z } = r, [Ce, Ae] = F("showNativeOverlaidScrollbars"), [ye, Ee] = F("scrollbars.theme"), [he, we] = F("scrollbars.visibility"), [ce, fe] = F("scrollbars.autoHide"), [ke, Te] = F("scrollbars.autoHideSuspend"), [$t] = F("scrollbars.autoHideDelay"), [Ft, Ht] = F("scrollbars.dragScroll"), [Rt, at] = F("scrollbars.clickScroll"), [vt, pn] = F("overflow"), hn = ie && !H, gn = Z.x || Z.y, bn = M || K || Y || te || H, Ie = G || we || pn, wn = Ce && _e.x && _e.y, Ct = (Et, tt, Bt) => {
      const At = Et.includes(gt) && (he === st || he === "auto" && tt === gt);
      return C(Qr, At, Bt), At;
    };
    if (p = $t, hn && (ke && gn ? (se(!1), v(), R(() => {
      v = ve(y, "scroll", X(se, !0), {
        A: !0
      });
    })) : se(!0)), Ae && C(Yr, wn), Ee && (C(m), C(ye, !0), m = ye), Te && !ke && se(!0), fe && (d = ce === "move", a = ce === "leave", u = ce === "never", U(u, !0)), Ht && C(nl, Ft), at && C(tl, !!Rt), Ie) {
      const Et = Ct(vt.x, $e.x, !0), tt = Ct(vt.y, $e.y, !1);
      C(el, !(Et && tt));
    }
    bn && (B(), A(), N(), Y && k(), C(As, !Z.x, !0), C(As, !Z.y, !1), C(Xr, be && !w));
  }, {}, L];
}, kl = (t) => {
  const e = Ge(), { U: n, R: r } = e, { elements: s } = n(), { padding: c, viewport: i, content: d } = s, a = nn(t), u = a ? {} : t, { elements: m } = u, { padding: v, viewport: p, content: f } = m || {}, h = a ? t : u.target, x = lo(h), S = h.ownerDocument, E = S.documentElement, R = () => S.defaultView || De, T = X(ll, [h]), $ = X(ko, [h]), V = X(pt, ""), L = X(T, V, i), P = X($, V, d), O = (Z) => {
    const Ce = ht(Z), Ae = on(Z), ye = Qe(Z, Xs), Ee = Qe(Z, Js);
    return Ae.w - Ce.w > 0 && !wt(ye) || Ae.h - Ce.h > 0 && !wt(Ee);
  }, y = L(p), w = y === h, C = w && x, A = !w && P(f), B = !w && y === A, k = C ? E : y, N = C ? k : h, U = !w && $(V, c, v), ee = !B && A, se = [ee, k, U, N].map((Z) => nn(Z) && !Dt(Z) && Z), ne = (Z) => Z && qs(se, Z), pe = !ne(k) && O(k) ? k : h, F = C ? E : k, I = {
    vt: h,
    ht: N,
    ot: k,
    ln: U,
    bt: ee,
    gt: F,
    Qt: C ? S : k,
    an: x ? E : pe,
    Kt: S,
    wt: x,
    Mt: a,
    nt: w,
    un: R,
    yt: (Z) => es(k, Je, Z),
    St: (Z, Ce) => sn(k, Je, Z, Ce),
    Ot: () => sn(F, Je, Pr, !0)
  }, { vt: j, ht: M, ln: K, ot: G, bt: Y } = I, te = [() => {
    Ne(M, [ot, xn]), Ne(j, xn), x && Ne(E, [xn, ot]);
  }];
  let ie = Ln([Y, G, K, M, j].find((Z) => Z && !ne(Z)));
  const be = C ? j : Y || G, _e = X(Fe, te);
  return [I, () => {
    const Z = R(), Ce = Fn(), Ae = (ce) => {
      Oe(Dt(ce), Ln(ce)), bt(ce);
    }, ye = (ce) => ve(ce, "focusin focusout focus blur", fo, {
      I: !0,
      H: !1
    }), Ee = "tabindex", he = Zn(G, Ee), we = ye(Ce);
    return Xe(M, ot, w ? "" : Nr), Xe(K, Un, ""), Xe(G, Je, ""), Xe(Y, Cs, ""), w || (Xe(G, Ee, he || "-1"), x && Xe(E, $s, "")), Oe(be, ie), Oe(M, K), Oe(K || M, !w && G), Oe(G, Y), me(te, [we, () => {
      const ce = Fn(), fe = ne(G), ke = fe && ce === G ? j : ce, Te = ye(ke);
      Ne(K, Un), Ne(Y, Cs), Ne(G, Je), x && Ne(E, $s), he ? Xe(G, Ee, he) : Ne(G, Ee), ne(Y) && Ae(Y), fe && Ae(G), ne(K) && Ae(K), In(ke), Te();
    }]), r && !w && (Qn(G, Je, go), me(te, X(Ne, G, Je))), In(!w && x && Ce === j && Z.top === Z ? G : Ce), we(), ie = 0, _e;
  }, _e];
}, xl = ({ bt: t }) => ({ Zt: e, _n: n, Dt: r }) => {
  const { xt: s } = e || {}, { $t: c } = n;
  t && (s || r) && Vt(t, {
    [un]: c && "100%"
  });
}, Sl = ({ ht: t, ln: e, ot: n, nt: r }, s) => {
  const [c, i] = Ve({
    i: Mr,
    o: hs()
  }, X(hs, t, "padding", ""));
  return ({ It: d, Zt: a, _n: u, Dt: m }) => {
    let [v, p] = i(m);
    const { R: f } = Ge(), { ft: h, Ht: x, Ct: S } = a || {}, { ct: E } = u, [R, T] = d("paddingAbsolute");
    (h || p || (m || x)) && ([v, p] = c(m));
    const V = !r && (T || S || p);
    if (V) {
      const L = !R || !e && !f, P = v.r + v.l, O = v.t + v.b, y = {
        [Ws]: L && !E ? -P : 0,
        [Ys]: L ? -O : 0,
        [Ks]: L && E ? -P : 0,
        top: L ? -v.t : 0,
        right: L ? E ? -v.r : "auto" : 0,
        left: L ? E ? "auto" : -v.l : 0,
        [dn]: L && `calc(100% + ${P}px)`
      }, w = {
        [zs]: L ? v.t : 0,
        [Ps]: L ? v.r : 0,
        [Gs]: L ? v.b : 0,
        [js]: L ? v.l : 0
      };
      Vt(e || n, y), Vt(n, w), oe(s, {
        ln: v,
        dn: !L,
        rt: e ? w : oe({}, y, w)
      });
    }
    return {
      fn: V
    };
  };
}, $l = (t, e) => {
  const n = Ge(), { ht: r, ln: s, ot: c, nt: i, Qt: d, gt: a, wt: u, St: m, un: v } = t, { R: p } = n, f = u && i, h = X(Ns, 0), x = {
    display: () => !1,
    direction: (H) => H !== "ltr",
    flexDirection: (H) => H.endsWith("-reverse"),
    writingMode: (H) => H !== "horizontal-tb"
  }, S = Be(x), E = {
    i: Zs,
    o: {
      w: 0,
      h: 0
    }
  }, R = {
    i: Wt,
    o: {}
  }, T = (H) => {
    m(ho, !f && H);
  }, $ = (H) => {
    if (!S.some((be) => {
      const _e = H[be];
      return _e && x[be](_e);
    }))
      return {
        D: {
          x: 0,
          y: 0
        },
        M: {
          x: 1,
          y: 1
        }
      };
    T(!0);
    const j = Le(a), M = m(jr, !0), K = ve(d, gt, (be) => {
      const _e = Le(a);
      be.isTrusted && _e.x === j.x && _e.y === j.y && _o(be);
    }, {
      I: !0,
      A: !0
    });
    qe(a, {
      x: 0,
      y: 0
    }), M();
    const G = Le(a), Y = on(a);
    qe(a, {
      x: Y.w,
      y: Y.h
    });
    const te = Le(a);
    qe(a, {
      x: te.x - G.x < 1 && -Y.w,
      y: te.y - G.y < 1 && -Y.h
    });
    const ie = Le(a);
    return qe(a, j), Gn(() => K()), {
      D: G,
      M: ie
    };
  }, V = (H, I) => {
    const j = De.devicePixelRatio % 1 !== 0 ? 1 : 0, M = {
      w: h(H.w - I.w),
      h: h(H.h - I.h)
    };
    return {
      w: M.w > j ? M.w : 0,
      h: M.h > j ? M.h : 0
    };
  }, [L, P] = Ve(E, X(ns, c)), [O, y] = Ve(E, X(on, c)), [w, C] = Ve(E), [A] = Ve(R), [B, k] = Ve(E), [N] = Ve(R), [U] = Ve({
    i: (H, I) => vn(H, I, S),
    o: {}
  }, () => Rr(c) ? Qe(c, S) : {}), [ee, se] = Ve({
    i: (H, I) => Wt(H.D, I.D) && Wt(H.M, I.M),
    o: mo()
  }), ne = Lt(Eo), pe = (H, I) => `${I ? Ur : qr}${Tr(H)}`, F = (H) => {
    const I = (M) => [st, it, gt].map((K) => pe(K, M)), j = I(!0).concat(I()).join(" ");
    m(j), m(Be(H).map((M) => pe(H[M], M === "x")).join(" "), !0);
  };
  return ({ It: H, Zt: I, _n: j, Dt: M }, { fn: K }) => {
    const { ft: G, Ht: Y, Ct: te, dt: ie, zt: be } = I || {}, _e = ne && ne.tt(t, e, j, n, H), { it: $e, ut: Z, _t: Ce } = _e || {}, [Ae, ye] = fl(H, n), [Ee, he] = H("overflow"), we = wt(Ee.x), ce = wt(Ee.y), fe = !0;
    let ke = P(M), Te = y(M), $t = C(M), Ft = k(M);
    ye && p && m(go, !Ae);
    {
      es(r, ot, Xt) && T(!0);
      const [ds] = Z ? Z() : [], [It] = ke = L(M), [Nt] = Te = O(M), Ut = uo(c), qt = f && Hr(v()), Qo = {
        w: h(Nt.w + It.w),
        h: h(Nt.h + It.h)
      }, us = {
        w: h((qt ? qt.w : Ut.w + h(Ut.w - Nt.w)) + It.w),
        h: h((qt ? qt.h : Ut.h + h(Ut.h - Nt.h)) + It.h)
      };
      ds && ds(), Ft = B(us), $t = w(V(Qo, us), M);
    }
    const [Ht, Rt] = Ft, [at, vt] = $t, [pn, hn] = Te, [gn, bn] = ke, [Ie, wn] = A({
      x: at.w > 0,
      y: at.h > 0
    }), Ct = we && ce && (Ie.x || Ie.y) || we && Ie.x && !Ie.y || ce && Ie.y && !Ie.x, Et = K || te || be || bn || hn || Rt || vt || he || ye || fe, tt = ml(Ie, Ee), [Bt, At] = N(tt.K), [Yo, Xo] = U(M), cs = te || ie || Xo || wn || M, [Jo, Zo] = cs ? ee($(Yo), M) : se();
    return Et && (At && F(tt.K), Ce && $e && Vt(c, Ce(tt, j, $e(tt, pn, gn)))), T(!1), sn(r, ot, Xt, Ct), sn(s, Un, Xt, Ct), oe(e, {
      K: Bt,
      Vt: {
        x: Ht.w,
        y: Ht.h
      },
      Rt: {
        x: at.w,
        y: at.h
      },
      rn: Ie,
      Lt: Br(Jo, at)
    }), {
      en: At,
      nn: Rt,
      sn: vt,
      cn: Zo || vt,
      vn: cs
    };
  };
}, Cl = (t) => {
  const [e, n, r] = kl(t), s = {
    ln: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    dn: !1,
    rt: {
      [Ws]: 0,
      [Ys]: 0,
      [Ks]: 0,
      [zs]: 0,
      [Ps]: 0,
      [Gs]: 0,
      [js]: 0
    },
    Vt: {
      x: 0,
      y: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    K: {
      x: it,
      y: it
    },
    rn: {
      x: !1,
      y: !1
    },
    Lt: mo()
  }, { vt: c, gt: i, nt: d, Ot: a } = e, { R: u, k: m } = Ge(), v = !u && (m.x || m.y), p = [xl(e), Sl(e, s), $l(e, s)];
  return [n, (f) => {
    const h = {}, S = v && Le(i), E = S && a();
    return ae(p, (R) => {
      oe(h, R(f, h) || {});
    }), qe(i, S), E && E(), !d && qe(c, 0), h;
  }, s, e, r];
}, El = (t, e, n, r, s) => {
  let c = !1;
  const i = Ss(e, {}), [d, a, u, m, v] = Cl(t), [p, f, h] = gl(m, u, i, ($) => {
    T({}, $);
  }), [x, S, , E] = yl(t, e, h, u, m, s), R = ($) => Be($).some((V) => !!$[V]), T = ($, V) => {
    if (n())
      return !1;
    const { pn: L, Dt: P, At: O, hn: y } = $, w = L || {}, C = !!P || !c, A = {
      It: Ss(e, w, C),
      pn: w,
      Dt: C
    };
    if (y)
      return S(A), !1;
    const B = V || f(oe({}, A, {
      At: O
    })), k = a(oe({}, A, {
      _n: h,
      Zt: B
    }));
    S(oe({}, A, {
      Zt: B,
      tn: k
    }));
    const N = R(B), U = R(k), ee = N || U || !Jn(w) || C;
    return c = !0, ee && r($, {
      Zt: B,
      tn: k
    }), ee;
  };
  return [() => {
    const { an: $, gt: V, Ot: L } = m, P = Le($), O = [p(), d(), x()], y = L();
    return qe(V, P), y(), X(Fe, O);
  }, T, () => ({
    gn: h,
    bn: u
  }), {
    wn: m,
    yn: E
  }, v];
}, je = (t, e, n) => {
  const { N: r } = Ge(), s = nn(t), c = s ? t : t.target, i = xo(c);
  if (e && !i) {
    let d = !1;
    const a = [], u = {}, m = (w) => {
      const C = eo(w), A = Lt(vl);
      return A ? A(C, !0) : C;
    }, v = oe({}, r(), m(e)), [p, f, h] = Nn(), [x, S, E] = Nn(n), R = (w, C) => {
      E(w, C), h(w, C);
    }, [T, $, V, L, P] = El(t, v, () => d, ({ pn: w, Dt: C }, { Zt: A, tn: B }) => {
      const { ft: k, Ct: N, xt: U, Ht: ee, Et: se, dt: ne } = A, { nn: pe, sn: F, en: H, cn: I } = B;
      R("updated", [y, {
        updateHints: {
          sizeChanged: !!k,
          directionChanged: !!N,
          heightIntrinsicChanged: !!U,
          overflowEdgeChanged: !!pe,
          overflowAmountChanged: !!F,
          overflowStyleChanged: !!H,
          scrollCoordinatesChanged: !!I,
          contentMutation: !!ee,
          hostMutation: !!se,
          appear: !!ne
        },
        changedOptions: w || {},
        force: !!C
      }]);
    }, (w) => R("scroll", [y, w])), O = (w) => {
      cl(c), Fe(a), d = !0, R("destroyed", [y, w]), f(), S();
    }, y = {
      options(w, C) {
        if (w) {
          const A = C ? r() : {}, B = po(v, oe(A, m(w)));
          Jn(B) || (oe(v, B), $({
            pn: B
          }));
        }
        return oe({}, v);
      },
      on: x,
      off: (w, C) => {
        w && C && S(w, C);
      },
      state() {
        const { gn: w, bn: C } = V(), { ct: A } = w, { Vt: B, Rt: k, K: N, rn: U, ln: ee, dn: se, Lt: ne } = C;
        return oe({}, {
          overflowEdge: B,
          overflowAmount: k,
          overflowStyle: N,
          hasOverflow: U,
          scrollCoordinates: {
            start: ne.D,
            end: ne.M
          },
          padding: ee,
          paddingAbsolute: se,
          directionRTL: A,
          destroyed: d
        });
      },
      elements() {
        const { vt: w, ht: C, ln: A, ot: B, bt: k, gt: N, Qt: U } = L.wn, { Xt: ee, Gt: se } = L.yn, ne = (F) => {
          const { Pt: H, Ut: I, Tt: j } = F;
          return {
            scrollbar: j,
            track: I,
            handle: H
          };
        }, pe = (F) => {
          const { Yt: H, Wt: I } = F, j = ne(H[0]);
          return oe({}, j, {
            clone: () => {
              const M = ne(I());
              return $({
                hn: !0
              }), M;
            }
          });
        };
        return oe({}, {
          target: w,
          host: C,
          padding: A || B,
          viewport: B,
          content: k || B,
          scrollOffsetElement: N,
          scrollEventElement: U,
          scrollbarHorizontal: pe(ee),
          scrollbarVertical: pe(se)
        });
      },
      update: (w) => $({
        Dt: w,
        At: !0
      }),
      destroy: X(O, !1),
      plugin: (w) => u[Be(w)[0]]
    };
    return me(a, [P]), il(c, y), Co(So, je, [y, p, u]), al(L.wn.wt, !s && t.cancel) ? (O(!0), y) : (me(a, T()), R("initialized", [y]), y.update(), y);
  }
  return i;
};
je.plugin = (t) => {
  const e = Pe(t), n = e ? t : [t], r = n.map((s) => Co(s, je)[0]);
  return ul(n), e ? r : r[0];
};
je.valid = (t) => {
  const e = t && t.elements, n = Re(e) && e();
  return tn(n) && !!xo(n.target);
};
je.env = () => {
  const { T: t, k: e, R: n, V: r, B: s, F: c, U: i, P: d, N: a, q: u } = Ge();
  return oe({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: r,
    staticDefaultInitialization: s,
    staticDefaultOptions: c,
    getDefaultInitialization: i,
    setDefaultInitialization: d,
    getDefaultOptions: a,
    setDefaultOptions: u
  });
};
je.nonce = ol;
function Al() {
  let t;
  const e = D(null), n = Math.floor(Math.random() * 2 ** 32), r = D(!1), s = D([]), c = () => s.value, i = () => t.getSelection(), d = () => s.value.length, a = () => t.clearSelection(!0), u = D(), m = D(null), v = D(null), p = D(null), f = D(null);
  function h() {
    t = new ur({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: V, event: L, isDragging: P }) => {
      if (P)
        t.Interaction._reset(L);
      else {
        r.value = !1;
        const O = e.value.offsetWidth - L.offsetX, y = e.value.offsetHeight - L.offsetY;
        O < 15 && y < 15 && t.Interaction._reset(L), L.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(L);
      }
    }), document.addEventListener("dragleave", (V) => {
      !V.buttons && r.value && (r.value = !1);
    });
  }
  const x = () => ct(() => {
    t.addSelection(
      t.getSelectables()
    ), S();
  }), S = () => {
    s.value = t.getSelection().map((V) => JSON.parse(V.dataset.item)), u.value(s.value);
  }, E = () => ct(() => {
    const V = c().map((L) => L.path);
    a(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((L) => V.includes(JSON.parse(L.dataset.item).path))
    ), S(), T();
  }), R = (V) => {
    u.value = V, t.subscribe("DS:end", ({ items: L, event: P, isDragging: O }) => {
      s.value = L.map((y) => JSON.parse(y.dataset.item)), V(L.map((y) => JSON.parse(y.dataset.item)));
    });
  }, T = () => {
    m.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (v.value.style.height = e.value.scrollHeight + "px", v.value.style.display = "block") : (v.value.style.height = "100%", v.value.style.display = "none"));
  }, $ = (V) => {
    if (!m.value)
      return;
    const { scrollOffsetElement: L } = m.value.elements();
    L.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Se(() => {
    je(p.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: je
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (V) => {
        m.value = V;
      },
      scroll: (V, L) => {
        const { scrollOffsetElement: P } = V.elements();
        e.value.scrollTo({
          top: P.scrollTop,
          left: 0
        });
      }
    }), h(), T(), f.value = new ResizeObserver(T), f.value.observe(e.value), e.value.addEventListener("scroll", $), t.subscribe("DS:scroll", ({ isDragging: V }) => V || $());
  }), jn(() => {
    t && t.stop(), f.value && f.value.disconnect();
  }), Ls(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: r,
    scrollBar: v,
    scrollBarContainer: p,
    getSelected: c,
    getSelection: i,
    selectAll: x,
    clearSelection: a,
    refreshSelection: E,
    getCount: d,
    onSelect: R
  };
}
function Tl(t, e) {
  const n = D(t), r = D(e), s = D([]), c = D([]), i = D([]), d = D(!1), a = D(5);
  let u = !1, m = !1;
  const v = yt({
    adapter: n,
    storages: [],
    dirname: r,
    files: []
  });
  function p() {
    let R = [], T = [], $ = r.value ?? n.value + "://";
    $.length === 0 && (s.value = []), $.replace(n.value + "://", "").split("/").forEach(function(P) {
      R.push(P), R.join("/") !== "" && T.push({
        basename: P,
        name: P,
        path: n.value + "://" + R.join("/"),
        type: "dir"
      });
    }), c.value = T;
    const [V, L] = h(T, a.value);
    i.value = L, s.value = V;
  }
  function f(R) {
    a.value = R, p();
  }
  function h(R, T) {
    return R.length > T ? [R.slice(-T), R.slice(0, -T)] : [R, []];
  }
  function x(R = null) {
    d.value = R ?? !d.value;
  }
  function S() {
    return s.value && s.value.length && !m;
  }
  const E = rt(() => {
    var R;
    return ((R = s.value[s.value.length - 2]) == null ? void 0 : R.path) ?? n.value + "://";
  });
  return Se(() => {
  }), Me(r, p), Se(p), {
    adapter: n,
    path: r,
    loading: u,
    searchMode: m,
    data: v,
    breadcrumbs: s,
    breadcrumbItems: c,
    limitBreadcrumbItems: f,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: x,
    isGoUpAvailable: S,
    parentFolderPath: E
  };
}
const Ml = (t, e) => {
  const n = gr(t.id), r = dr(), s = n.getStore("metricUnits", !1), c = Sr(n, t.theme), i = e.i18n, d = t.locale ?? e.locale, a = (f) => Array.isArray(f) ? f : yr, u = n.getStore("persist-path", t.persist), m = u ? n.getStore("path", t.path) : t.path, v = u ? n.getStore("adapter") : null, p = Al();
  return yt({
    /** 
    * Core properties
    * */
    // app version
    version: kr,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: r,
    // storage
    storage: n,
    // localization object
    i18n: wr(n, d, r, i),
    // modal state
    modal: $r(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: rt(() => p),
    // http object
    requester: hr(t.request),
    // active features
    features: a(t.features),
    // view state
    view: n.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: n.getStore("full-screen", t.fullScreen),
    // show tree view
    showTreeView: n.getStore("show-tree-view", t.showTreeView),
    // pinnedFolders
    pinnedFolders: n.getStore("pinned-folders", t.pinnedFolders),
    // treeViewData
    treeViewData: [],
    // selectButton state
    selectButton: t.selectButton,
    // max file size
    maxFileSize: t.maxFileSize,
    /**
    * Settings
    * */
    // theme state
    theme: c,
    // unit state - for example: GB or GiB
    metricUnits: s,
    // human readable file sizes
    filesize: s ? Is : Bs,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: u,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // type of progress indicator
    loadingIndicator: t.loadingIndicator,
    // file system
    fs: Tl(v, m)
  });
}, Dl = { class: "vuefinder__modal-layout__container" }, Vl = { class: "vuefinder__modal-layout__content" }, Ol = { class: "vuefinder__modal-layout__footer" }, Ke = {
  __name: "ModalLayout",
  setup(t) {
    const e = D(null), n = re("ServiceContainer");
    return Se(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), ct(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const s = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (r, s) => (_(), g("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = kt((c) => o(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = l("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      l("div", Dl, [
        l("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = Ze((c) => o(n).modal.close(), ["self"]))
        }, [
          l("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            l("div", Vl, [
              Tt(r.$slots, "default")
            ]),
            l("div", Ol, [
              Tt(r.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Ll = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, s] of e)
    n[r] = s;
  return n;
}, Fl = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const r = re("ServiceContainer"), s = D(!1), { t: c } = r.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), s.value = !0, i = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return Se(() => {
      r.emitter.on(t.on, d);
    }), jn(() => {
      clearTimeout(i);
    }), {
      shown: s,
      t: c
    };
  }
}, Hl = { key: 1 };
function Rl(t, e, n, r, s, c) {
  return _(), g("div", {
    class: le(["vuefinder__action-message", { "vuefinder__action-message--hidden": !r.shown }])
  }, [
    t.$slots.default ? Tt(t.$slots, "default", { key: 0 }) : (_(), g("span", Hl, b(r.t("Saved.")), 1))
  ], 2);
}
const _t = /* @__PURE__ */ Ll(Fl, [["render", Rl]]), Bl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Il(t, e) {
  return _(), g("svg", Bl, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ]));
}
const Nl = { render: Il }, Ul = { class: "vuefinder__modal-header" }, ql = { class: "vuefinder__modal-header__icon-container" }, zl = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, et = {
  __name: "ModalHeader",
  props: {
    title: {
      type: String,
      required: !0
    },
    icon: {
      type: Object,
      required: !0
    }
  },
  setup(t) {
    return (e, n) => (_(), g("div", Ul, [
      l("div", ql, [
        (_(), W(Fs(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      l("h3", zl, b(t.title), 1)
    ]));
  }
}, Pl = { class: "vuefinder__about-modal__content" }, jl = { class: "vuefinder__about-modal__main" }, Gl = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Kl = ["onClick", "aria-current"], Wl = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Yl = { class: "vuefinder__about-modal__description" }, Xl = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Jl = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Zl = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Ql = { class: "vuefinder__about-modal__description" }, ea = { class: "vuefinder__about-modal__settings" }, ta = { class: "vuefinder__about-modal__setting flex" }, na = { class: "vuefinder__about-modal__setting-input" }, sa = { class: "vuefinder__about-modal__setting-label" }, oa = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, ra = { class: "vuefinder__about-modal__setting flex" }, la = { class: "vuefinder__about-modal__setting-input" }, aa = { class: "vuefinder__about-modal__setting-label" }, ia = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, ca = { class: "vuefinder__about-modal__setting flex" }, da = { class: "vuefinder__about-modal__setting-input" }, ua = { class: "vuefinder__about-modal__setting-label" }, va = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, _a = { class: "vuefinder__about-modal__setting flex" }, fa = { class: "vuefinder__about-modal__setting-input" }, ma = { class: "vuefinder__about-modal__setting-label" }, pa = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, ha = { class: "vuefinder__about-modal__setting" }, ga = { class: "vuefinder__about-modal__setting-input" }, ba = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, wa = { class: "vuefinder__about-modal__setting-label" }, ya = ["label"], ka = ["value"], xa = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Sa = { class: "vuefinder__about-modal__setting-input" }, $a = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Ca = { class: "vuefinder__about-modal__setting-label" }, Ea = ["label"], Aa = ["value"], Ta = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Ma = { class: "vuefinder__about-modal__shortcuts" }, Da = { class: "vuefinder__about-modal__shortcut" }, Va = { class: "vuefinder__about-modal__shortcut" }, Oa = { class: "vuefinder__about-modal__shortcut" }, La = { class: "vuefinder__about-modal__shortcut" }, Fa = { class: "vuefinder__about-modal__shortcut" }, Ha = { class: "vuefinder__about-modal__shortcut" }, Ra = { class: "vuefinder__about-modal__shortcut" }, Ba = { class: "vuefinder__about-modal__shortcut" }, Ia = { class: "vuefinder__about-modal__shortcut" }, Na = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Ua = { class: "vuefinder__about-modal__description" }, To = {
  __name: "ModalAbout",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n, clearStore: r } = e.storage, { t: s } = e.i18n, c = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, i = rt(() => [
      { name: s("About"), key: c.ABOUT },
      { name: s("Settings"), key: c.SETTINGS },
      { name: s("Shortcuts"), key: c.SHORTCUTS },
      { name: s("Reset"), key: c.RESET }
    ]), d = D("about"), a = async () => {
      r(), location.reload();
    }, u = (R) => {
      e.theme.set(R), e.emitter.emit("vf-theme-saved");
    }, m = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Is : Bs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, v = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, f = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = re("VueFinderOptions"), S = Object.fromEntries(
      Object.entries({
        ar: "Arabic (العربيّة)",
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        fa: "Persian (فارسی)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        ru: "Russian (Pусский)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)",
        zhCN: "Simplified Chinese (简体中文)",
        zhTW: "Traditional Chinese (繁體中文)"
      }).filter(([R]) => Object.keys(h).includes(R))
    ), E = rt(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (R, T) => (_(), W(Ke, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: T[7] || (T[7] = ($) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(s)("Close")), 1)
      ]),
      default: Q(() => [
        l("div", Pl, [
          z(et, {
            icon: o(Nl),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          l("div", jl, [
            l("div", null, [
              l("div", null, [
                l("nav", Gl, [
                  (_(!0), g(ge, null, xe(i.value, ($) => (_(), g("button", {
                    key: $.name,
                    onClick: (V) => d.value = $.key,
                    class: le([$.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": $.current ? "page" : void 0
                  }, b($.name), 11, Kl))), 128))
                ])
              ])
            ]),
            d.value === c.ABOUT ? (_(), g("div", Wl, [
              l("div", Yl, b(o(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              l("a", Xl, b(o(s)("Project home")), 1),
              l("a", Jl, b(o(s)("Follow on GitHub")), 1)
            ])) : q("", !0),
            d.value === c.SETTINGS ? (_(), g("div", Zl, [
              l("div", Ql, b(o(s)("Customize your experience with the following settings")), 1),
              l("div", ea, [
                l("fieldset", null, [
                  l("div", ta, [
                    l("div", na, [
                      ue(l("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": T[0] || (T[0] = ($) => o(e).metricUnits = $),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).metricUnits]
                      ])
                    ]),
                    l("div", sa, [
                      l("label", oa, [
                        J(b(o(s)("Use Metric Units")) + " ", 1),
                        z(_t, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: Q(() => [
                            J(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", ra, [
                    l("div", la, [
                      ue(l("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": T[1] || (T[1] = ($) => o(e).compactListView = $),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).compactListView]
                      ])
                    ]),
                    l("div", aa, [
                      l("label", ia, [
                        J(b(o(s)("Compact list view")) + " ", 1),
                        z(_t, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: Q(() => [
                            J(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", ca, [
                    l("div", da, [
                      ue(l("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": T[2] || (T[2] = ($) => o(e).persist = $),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).persist]
                      ])
                    ]),
                    l("div", ua, [
                      l("label", va, [
                        J(b(o(s)("Persist path on reload")) + " ", 1),
                        z(_t, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: Q(() => [
                            J(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", _a, [
                    l("div", fa, [
                      ue(l("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": T[3] || (T[3] = ($) => o(e).showThumbnails = $),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).showThumbnails]
                      ])
                    ]),
                    l("div", ma, [
                      l("label", pa, [
                        J(b(o(s)("Show thumbnails")) + " ", 1),
                        z(_t, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: Q(() => [
                            J(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", ha, [
                    l("div", ga, [
                      l("label", ba, b(o(s)("Theme")), 1)
                    ]),
                    l("div", wa, [
                      ue(l("select", {
                        id: "theme",
                        "onUpdate:modelValue": T[4] || (T[4] = ($) => o(e).theme.value = $),
                        onChange: T[5] || (T[5] = ($) => u($.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: o(s)("Theme")
                        }, [
                          (_(!0), g(ge, null, xe(E.value, ($, V) => (_(), g("option", { value: V }, b($), 9, ka))), 256))
                        ], 8, ya)
                      ], 544), [
                        [En, o(e).theme.value]
                      ]),
                      z(_t, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: Q(() => [
                          J(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  o(e).features.includes(o(de).LANGUAGE) && Object.keys(o(S)).length > 1 ? (_(), g("div", xa, [
                    l("div", Sa, [
                      l("label", $a, b(o(s)("Language")), 1)
                    ]),
                    l("div", Ca, [
                      ue(l("select", {
                        id: "language",
                        "onUpdate:modelValue": T[6] || (T[6] = ($) => o(e).i18n.locale = $),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: o(s)("Language")
                        }, [
                          (_(!0), g(ge, null, xe(o(S), ($, V) => (_(), g("option", { value: V }, b($), 9, Aa))), 256))
                        ], 8, Ea)
                      ], 512), [
                        [En, o(e).i18n.locale]
                      ]),
                      z(_t, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: Q(() => [
                          J(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : q("", !0)
                ])
              ])
            ])) : q("", !0),
            d.value === c.SHORTCUTS ? (_(), g("div", Ta, [
              l("div", Ma, [
                l("div", Da, [
                  l("div", null, b(o(s)("Rename")), 1),
                  T[8] || (T[8] = l("kbd", null, "F2", -1))
                ]),
                l("div", Va, [
                  l("div", null, b(o(s)("Refresh")), 1),
                  T[9] || (T[9] = l("kbd", null, "F5", -1))
                ]),
                l("div", Oa, [
                  J(b(o(s)("Delete")) + " ", 1),
                  T[10] || (T[10] = l("kbd", null, "Del", -1))
                ]),
                l("div", La, [
                  J(b(o(s)("Escape")) + " ", 1),
                  T[11] || (T[11] = l("div", null, [
                    l("kbd", null, "Esc")
                  ], -1))
                ]),
                l("div", Fa, [
                  J(b(o(s)("Select All")) + " ", 1),
                  T[12] || (T[12] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, "A")
                  ], -1))
                ]),
                l("div", Ha, [
                  J(b(o(s)("Search")) + " ", 1),
                  T[13] || (T[13] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, "F")
                  ], -1))
                ]),
                l("div", Ra, [
                  J(b(o(s)("Toggle Sidebar")) + " ", 1),
                  T[14] || (T[14] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, "E")
                  ], -1))
                ]),
                l("div", Ba, [
                  J(b(o(s)("Open Settings")) + " ", 1),
                  T[15] || (T[15] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, ",")
                  ], -1))
                ]),
                l("div", Ia, [
                  J(b(o(s)("Toggle Full Screen")) + " ", 1),
                  T[16] || (T[16] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : q("", !0),
            d.value === c.RESET ? (_(), g("div", Na, [
              l("div", Ua, b(o(s)("Reset all settings to default")), 1),
              l("button", {
                onClick: a,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(s)("Reset Settings")), 1)
            ])) : q("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, qa = ["title"], We = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var u;
    const n = e, r = re("ServiceContainer"), { t: s } = r.i18n, c = D(!1), i = D(null), d = D((u = i.value) == null ? void 0 : u.strMessage);
    Me(d, () => c.value = !1);
    const a = () => {
      n("hidden"), c.value = !0;
    };
    return (m, v) => (_(), g("div", null, [
      c.value ? q("", !0) : (_(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: le(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Tt(m.$slots, "default"),
        l("div", {
          class: "vuefinder__message__close",
          onClick: a,
          title: o(s)("Close")
        }, v[0] || (v[0] = [
          l("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ]), 8, qa)
      ], 2))
    ]));
  }
}, za = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Pa(t, e) {
  return _(), g("svg", za, e[0] || (e[0] = [
    l("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ]));
}
const Mo = { render: Pa }, ja = { class: "vuefinder__delete-modal__content" }, Ga = { class: "vuefinder__delete-modal__form" }, Ka = { class: "vuefinder__delete-modal__description" }, Wa = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Ya = { class: "vuefinder__delete-modal__file" }, Xa = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ja = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Za = { class: "vuefinder__delete-modal__file-name" }, Qa = { class: "vuefinder__delete-modal__warning" }, ls = {
  __name: "ModalDelete",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = D(e.modal.data.items), s = D(""), c = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: i, type: d }) => ({ path: i, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), W(Ke, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, b(o(n)("Yes, Delete!")), 1),
        l("button", {
          type: "button",
          onClick: d[1] || (d[1] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        l("div", Qa, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          z(et, {
            icon: o(Mo),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          l("div", ja, [
            l("div", Ga, [
              l("p", Ka, b(o(n)("Are you sure you want to delete these files?")), 1),
              l("div", Wa, [
                (_(!0), g(ge, null, xe(r.value, (a) => (_(), g("p", Ya, [
                  a.type === "dir" ? (_(), g("svg", Xa, d[2] || (d[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), g("svg", Ja, d[3] || (d[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  l("span", Za, b(a.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: d[0] || (d[0] = (a) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
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
}, ei = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ti(t, e) {
  return _(), g("svg", ei, e[0] || (e[0] = [
    l("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const Do = { render: ti }, ni = { class: "vuefinder__rename-modal__content" }, si = { class: "vuefinder__rename-modal__item" }, oi = { class: "vuefinder__rename-modal__item-info" }, ri = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, li = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ai = { class: "vuefinder__rename-modal__item-name" }, as = {
  __name: "ModalRename",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = D(e.modal.data.items[0]), s = D(e.modal.data.items[0].basename), c = D(""), i = () => {
      s.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: r.value.path,
          name: s.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", s.value) });
        },
        onError: (d) => {
          c.value = n(d.message);
        }
      });
    };
    return (d, a) => (_(), W(Ke, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Rename")), 1),
        l("button", {
          type: "button",
          onClick: a[2] || (a[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          z(et, {
            icon: o(Do),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          l("div", ni, [
            l("div", si, [
              l("p", oi, [
                r.value.type === "dir" ? (_(), g("svg", ri, a[3] || (a[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (_(), g("svg", li, a[4] || (a[4] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", ai, b(r.value.basename), 1)
              ]),
              ue(l("input", {
                "onUpdate:modelValue": a[0] || (a[0] = (u) => s.value = u),
                onKeyup: kt(i, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [xt, s.value]
              ]),
              c.value.length ? (_(), W(We, {
                key: 0,
                onHidden: a[1] || (a[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(c.value), 1)
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
}, Ye = {
  ESCAPE: "Escape",
  F2: "F2",
  F5: "F5",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF"
};
function ii(t) {
  const e = (n) => {
    n.code === Ye.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Ye.F2 && t.features.includes(de.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(as, { items: t.dragSelect.getSelected() })), n.code === Ye.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Ye.DELETE && (!t.dragSelect.getCount() || t.modal.open(ls, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Ye.BACKSLASH && t.modal.open(To), n.metaKey && n.code === Ye.KEY_F && t.features.includes(de.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Ye.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Ye.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Ye.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
  };
  Se(() => {
    t.root.addEventListener("keydown", e);
  });
}
const ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function di(t, e) {
  return _(), g("svg", ci, e[0] || (e[0] = [
    l("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const Vo = { render: di }, ui = { class: "vuefinder__new-folder-modal__content" }, vi = { class: "vuefinder__new-folder-modal__form" }, _i = { class: "vuefinder__new-folder-modal__description" }, fi = ["placeholder"], Oo = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, r = D(""), s = D(""), c = () => {
      r.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), W(Ke, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        l("button", {
          type: "button",
          onClick: d[2] || (d[2] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          z(et, {
            icon: o(Vo),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          l("div", ui, [
            l("div", vi, [
              l("p", _i, b(o(n)("Create a new folder")), 1),
              ue(l("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => r.value = a),
                onKeyup: kt(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text"
              }, null, 40, fi), [
                [xt, r.value]
              ]),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (a) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
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
}, mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function pi(t, e) {
  return _(), g("svg", mi, e[0] || (e[0] = [
    l("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ]));
}
const Lo = { render: pi }, hi = { class: "vuefinder__new-file-modal__content" }, gi = { class: "vuefinder__new-file-modal__form" }, bi = { class: "vuefinder__new-file-modal__description" }, wi = ["placeholder"], yi = {
  __name: "ModalNewFile",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, r = D(""), s = D(""), c = () => {
      r.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), W(Ke, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        l("button", {
          type: "button",
          onClick: d[2] || (d[2] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          z(et, {
            icon: o(Lo),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          l("div", hi, [
            l("div", gi, [
              l("p", bi, b(o(n)("Create a new file")), 1),
              ue(l("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => r.value = a),
                onKeyup: kt(c, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, wi), [
                [xt, r.value]
              ]),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (a) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
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
};
function zn(t, e = 14) {
  let n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function xi(t, e) {
  return _(), g("svg", ki, e[0] || (e[0] = [
    l("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ]));
}
const Fo = { render: xi }, Si = { class: "vuefinder__upload-modal__content" }, $i = {
  key: 0,
  class: "pointer-events-none"
}, Ci = {
  key: 1,
  class: "pointer-events-none"
}, Ei = ["disabled"], Ai = ["disabled"], Ti = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Mi = ["textContent"], Di = { class: "vuefinder__upload-modal__file-info" }, Vi = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Oi = { class: "vuefinder__upload-modal__file-name md:hidden" }, Li = {
  key: 0,
  class: "ml-auto"
}, Fi = ["title", "disabled", "onClick"], Hi = {
  key: 0,
  class: "py-2"
}, Ri = ["disabled"], Bi = {
  __name: "ModalUpload",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = D({ QUEUE_ENTRY_STATUS: s }), i = D(null), d = D(null), a = D(null), u = D(null), m = D(null), v = D(null), p = D([]), f = D(""), h = D(!1), x = D(!1);
    let S;
    function E(A) {
      return p.value.findIndex((B) => B.id === A);
    }
    function R(A, B = null) {
      B = B ?? (A.webkitRelativePath || A.name), S.addFile({
        name: B,
        type: A.type,
        data: A,
        source: "Local"
      });
    }
    function T(A) {
      switch (A.status) {
        case s.DONE:
          return "text-green-600";
        case s.ERROR:
          return "text-red-600";
        case s.CANCELED:
          return "text-red-600";
        case s.PENDING:
        default:
          return "";
      }
    }
    const $ = (A) => {
      switch (A.status) {
        case s.DONE:
          return "✓";
        case s.ERROR:
        case s.CANCELED:
          return "!";
        case s.PENDING:
        default:
          return "...";
      }
    };
    function V() {
      u.value.click();
    }
    function L() {
      if (!h.value) {
        if (!p.value.filter((A) => A.status !== s.DONE).length) {
          f.value = n("Please select file to upload first.");
          return;
        }
        f.value = "", S.retryAll(), S.upload();
      }
    }
    function P() {
      S.cancelAll({ reason: "user" }), p.value.forEach((A) => {
        A.status !== s.DONE && (A.status = s.CANCELED, A.statusName = n("Canceled"));
      }), h.value = !1;
    }
    function O(A) {
      h.value || (S.removeFile(A.id, "removed-by-user"), p.value.splice(E(A.id), 1));
    }
    function y(A) {
      if (!h.value) {
        if (S.cancelAll({ reason: "user" }), A) {
          const B = [];
          p.value.forEach((k) => {
            k.status !== s.DONE && B.push(k);
          }), p.value = [], B.forEach((k) => {
            R(k.originalFile, k.name);
          });
          return;
        }
        p.value.splice(0);
      }
    }
    function w() {
      e.modal.close();
    }
    function C() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Se(async () => {
      S = new vr({
        debug: e.debug,
        restrictions: {
          maxFileSize: xr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(k, N) {
          if (N[k.id] != null) {
            const ee = E(k.id);
            p.value[ee].status === s.PENDING && (f.value = S.i18n("noDuplicates", { fileName: k.name })), p.value = p.value.filter((se) => se.id !== k.id);
          }
          return p.value.push({
            id: k.id,
            name: k.name,
            size: e.filesize(k.size),
            status: s.PENDING,
            statusName: n("Pending upload"),
            percent: null,
            originalFile: k.data
          }), !0;
        }
      }), S.use(_r, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(k, N) {
          let U;
          try {
            U = JSON.parse(k).message;
          } catch {
            U = n("Cannot parse server response.");
          }
          return new Error(U);
        }
      }), S.on("restriction-failed", (k, N) => {
        const U = p.value[E(k.id)];
        O(U), f.value = N.message;
      }), S.on("upload", () => {
        const k = C();
        S.setMeta({ ...k.body });
        const N = S.getPlugin("XHRUpload");
        N.opts.method = k.method, N.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), N.opts.headers = k.headers, delete k.headers["Content-Type"], h.value = !0, p.value.forEach((U) => {
          U.status !== s.DONE && (U.percent = null, U.status = s.UPLOADING, U.statusName = n("Pending upload"));
        });
      }), S.on("upload-progress", (k, N) => {
        const U = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        p.value[E(k.id)].percent = `${U}%`;
      }), S.on("upload-success", (k) => {
        const N = p.value[E(k.id)];
        N.status = s.DONE, N.statusName = n("Done");
      }), S.on("upload-error", (k, N) => {
        const U = p.value[E(k.id)];
        U.percent = null, U.status = s.ERROR, N.isNetworkError ? U.statusName = n("Network Error, Unable establish connection to the server or interrupted.") : U.statusName = N ? N.message : n("Unknown Error");
      }), S.on("error", (k) => {
        f.value = k.message, h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), S.on("complete", () => {
        h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), m.value.addEventListener("click", () => {
        a.value.click();
      }), v.value.addEventListener("dragover", (k) => {
        k.preventDefault(), x.value = !0;
      }), v.value.addEventListener("dragleave", (k) => {
        k.preventDefault(), x.value = !1;
      });
      function A(k, N) {
        N.isFile && N.file((U) => k(N, U)), N.isDirectory && N.createReader().readEntries((U) => {
          U.forEach((ee) => {
            A(k, ee);
          });
        });
      }
      v.value.addEventListener("drop", (k) => {
        k.preventDefault(), x.value = !1;
        const N = /^[/\\](.+)/;
        [...k.dataTransfer.items].forEach((U) => {
          U.kind === "file" && A((ee, se) => {
            const ne = N.exec(ee.fullPath);
            R(se, ne[1]);
          }, U.webkitGetAsEntry());
        });
      });
      const B = ({ target: k }) => {
        const N = k.files;
        for (const U of N)
          R(U);
        k.value = "";
      };
      d.value.addEventListener("change", B), a.value.addEventListener("change", B);
    }), Hs(() => {
      S == null || S.close({ reason: "unmount" });
    }), (A, B) => (_(), W(Ke, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: Ze(L, ["prevent"])
        }, b(o(n)("Upload")), 9, Ri),
        h.value ? (_(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Ze(P, ["prevent"])
        }, b(o(n)("Cancel")), 1)) : (_(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Ze(w, ["prevent"])
        }, b(o(n)("Close")), 1))
      ]),
      default: Q(() => [
        l("div", null, [
          z(et, {
            icon: o(Fo),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          l("div", Si, [
            l("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: v,
              onClick: V
            }, [
              x.value ? (_(), g("div", $i, b(o(n)("Release to drop these files.")), 1)) : (_(), g("div", Ci, b(o(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            l("div", {
              ref_key: "container",
              ref: i,
              class: "vuefinder__upload-modal__buttons"
            }, [
              l("button", {
                ref_key: "pickFiles",
                ref: u,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(n)("Select Files")), 513),
              l("button", {
                ref_key: "pickFolders",
                ref: m,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(n)("Select Folders")), 513),
              l("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: B[0] || (B[0] = (k) => y(!1))
              }, b(o(n)("Clear all")), 9, Ei),
              l("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: B[1] || (B[1] = (k) => y(!0))
              }, b(o(n)("Clear only successful")), 9, Ai)
            ], 512),
            l("div", Ti, [
              (_(!0), g(ge, null, xe(p.value, (k) => (_(), g("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: k.id
              }, [
                l("span", {
                  class: le(["vuefinder__upload-modal__file-icon", T(k)])
                }, [
                  l("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b($(k))
                  }, null, 8, Mi)
                ], 2),
                l("div", Di, [
                  l("div", Vi, b(o(zn)(k.name, 40)) + " (" + b(k.size) + ")", 1),
                  l("div", Oi, b(o(zn)(k.name, 16)) + " (" + b(k.size) + ")", 1),
                  l("div", {
                    class: le(["vuefinder__upload-modal__file-status", T(k)])
                  }, [
                    J(b(k.statusName) + " ", 1),
                    k.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (_(), g("b", Li, b(k.percent), 1)) : q("", !0)
                  ], 2)
                ]),
                l("button", {
                  type: "button",
                  class: le(["vuefinder__upload-modal__file-remove", h.value ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: h.value,
                  onClick: (N) => O(k)
                }, B[3] || (B[3] = [
                  l("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ]), 10, Fi)
              ]))), 128)),
              p.value.length ? q("", !0) : (_(), g("div", Hi, b(o(n)("No files selected!")), 1))
            ]),
            f.value.length ? (_(), W(We, {
              key: 0,
              onHidden: B[2] || (B[2] = (k) => f.value = ""),
              error: ""
            }, {
              default: Q(() => [
                J(b(f.value), 1)
              ]),
              _: 1
            })) : q("", !0)
          ])
        ]),
        l("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        l("input", {
          ref_key: "internalFolderInput",
          ref: a,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}, Ii = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ni(t, e) {
  return _(), g("svg", Ii, e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Ho = { render: Ni }, Ui = { class: "vuefinder__unarchive-modal__content" }, qi = { class: "vuefinder__unarchive-modal__items" }, zi = { class: "vuefinder__unarchive-modal__item" }, Pi = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ji = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gi = { class: "vuefinder__unarchive-modal__item-name" }, Ki = { class: "vuefinder__unarchive-modal__info" }, Ro = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = D(e.modal.data.items[0]), s = D(""), c = D([]), i = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: r.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, a) => (_(), W(Ke, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Unarchive")), 1),
        l("button", {
          type: "button",
          onClick: a[1] || (a[1] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          z(et, {
            icon: o(Ho),
            title: o(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          l("div", Ui, [
            l("div", qi, [
              (_(!0), g(ge, null, xe(c.value, (u) => (_(), g("p", zi, [
                u.type === "dir" ? (_(), g("svg", Pi, a[2] || (a[2] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (_(), g("svg", ji, a[3] || (a[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", Gi, b(u.basename), 1)
              ]))), 256)),
              l("p", Ki, b(o(n)("The archive will be unarchived at")) + " (" + b(o(e).fs.data.dirname) + ")", 1),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: a[0] || (a[0] = (u) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
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
}, Wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Yi(t, e) {
  return _(), g("svg", Wi, e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Bo = { render: Yi }, Xi = { class: "vuefinder__archive-modal__content" }, Ji = { class: "vuefinder__archive-modal__form" }, Zi = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Qi = { class: "vuefinder__archive-modal__file" }, ec = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, tc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, nc = { class: "vuefinder__archive-modal__file-name" }, sc = ["placeholder"], Io = {
  __name: "ModalArchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = D(""), s = D(""), c = D(e.modal.data.items), i = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: c.value.map(({ path: d, type: a }) => ({ path: d, type: a })),
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, a) => (_(), W(Ke, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Archive")), 1),
        l("button", {
          type: "button",
          onClick: a[2] || (a[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          z(et, {
            icon: o(Bo),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          l("div", Xi, [
            l("div", Ji, [
              l("div", Zi, [
                (_(!0), g(ge, null, xe(c.value, (u) => (_(), g("p", Qi, [
                  u.type === "dir" ? (_(), g("svg", ec, a[3] || (a[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), g("svg", tc, a[4] || (a[4] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  l("span", nc, b(u.basename), 1)
                ]))), 256))
              ]),
              ue(l("input", {
                "onUpdate:modelValue": a[0] || (a[0] = (u) => r.value = u),
                onKeyup: kt(i, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, sc), [
                [xt, r.value]
              ]),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: a[1] || (a[1] = (u) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
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
}, oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function rc(t, e) {
  return _(), g("svg", oc, e[0] || (e[0] = [
    l("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    l("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ]));
}
const is = { render: rc }, lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ac(t, e) {
  return _(), g("svg", lc, e[0] || (e[0] = [
    l("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ]));
}
const ic = { render: ac }, cc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function dc(t, e) {
  return _(), g("svg", cc, e[0] || (e[0] = [
    l("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ]));
}
const uc = { render: dc }, vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function _c(t, e) {
  return _(), g("svg", vc, e[0] || (e[0] = [
    l("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ]));
}
const fc = { render: _c }, mc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function pc(t, e) {
  return _(), g("svg", mc, e[0] || (e[0] = [
    l("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const hc = { render: pc }, gc = { class: "vuefinder__toolbar" }, bc = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, wc = ["title"], yc = ["title"], kc = ["title"], xc = ["title"], Sc = ["title"], $c = ["title"], Cc = ["title"], Ec = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Ac = { class: "pl-2" }, Tc = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Mc = { class: "vuefinder__toolbar__controls" }, Dc = ["title"], Vc = ["title"], Oc = {
  __name: "Toolbar",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, { t: r } = e.i18n, s = e.dragSelect, c = D("");
    e.emitter.on("vf-search-query", ({ newQuery: a }) => {
      c.value = a;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen;
    };
    Me(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (a, u) => (_(), g("div", gc, [
      c.value.length ? (_(), g("div", Ec, [
        l("div", Ac, [
          J(b(o(r)("Search results for")) + " ", 1),
          l("span", Tc, b(c.value), 1)
        ]),
        o(e).loadingIndicator === "circular" && o(e).fs.loading ? (_(), W(o(is), { key: 0 })) : q("", !0)
      ])) : (_(), g("div", bc, [
        o(e).features.includes(o(de).NEW_FOLDER) ? (_(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(r)("New Folder"),
          onClick: u[0] || (u[0] = (m) => o(e).modal.open(Oo, { items: o(s).getSelected() }))
        }, [
          z(o(Vo))
        ], 8, wc)) : q("", !0),
        o(e).features.includes(o(de).NEW_FILE) ? (_(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(r)("New File"),
          onClick: u[1] || (u[1] = (m) => o(e).modal.open(yi, { items: o(s).getSelected() }))
        }, [
          z(o(Lo))
        ], 8, yc)) : q("", !0),
        o(e).features.includes(o(de).RENAME) ? (_(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: o(r)("Rename"),
          onClick: u[2] || (u[2] = (m) => o(s).getCount() !== 1 || o(e).modal.open(as, { items: o(s).getSelected() }))
        }, [
          z(o(Do), {
            class: le(o(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, kc)) : q("", !0),
        o(e).features.includes(o(de).DELETE) ? (_(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: o(r)("Delete"),
          onClick: u[3] || (u[3] = (m) => !o(s).getCount() || o(e).modal.open(ls, { items: o(s).getSelected() }))
        }, [
          z(o(Mo), {
            class: le(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, xc)) : q("", !0),
        o(e).features.includes(o(de).UPLOAD) ? (_(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: o(r)("Upload"),
          onClick: u[4] || (u[4] = (m) => o(e).modal.open(Bi, { items: o(s).getSelected() }))
        }, [
          z(o(Fo))
        ], 8, Sc)) : q("", !0),
        o(e).features.includes(o(de).UNARCHIVE) && o(s).getCount() === 1 && o(s).getSelected()[0].mime_type === "application/zip" ? (_(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: o(r)("Unarchive"),
          onClick: u[5] || (u[5] = (m) => !o(s).getCount() || o(e).modal.open(Ro, { items: o(s).getSelected() }))
        }, [
          z(o(Ho), {
            class: le(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, $c)) : q("", !0),
        o(e).features.includes(o(de).ARCHIVE) ? (_(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: o(r)("Archive"),
          onClick: u[6] || (u[6] = (m) => !o(s).getCount() || o(e).modal.open(Io, { items: o(s).getSelected() }))
        }, [
          z(o(Bo), {
            class: le(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Cc)) : q("", !0)
      ])),
      l("div", Mc, [
        o(e).features.includes(o(de).FULL_SCREEN) ? (_(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: o(r)("Toggle Full Screen")
        }, [
          o(e).fullScreen ? (_(), W(o(uc), { key: 0 })) : (_(), W(o(ic), { key: 1 }))
        ], 8, Dc)) : q("", !0),
        l("div", {
          class: "mx-1.5",
          title: o(r)("Change View"),
          onClick: u[7] || (u[7] = (m) => c.value.length || d())
        }, [
          o(e).view === "grid" ? (_(), W(o(fc), {
            key: 0,
            class: le(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0),
          o(e).view === "list" ? (_(), W(o(hc), {
            key: 1,
            class: le(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0)
        ], 8, Vc)
      ])
    ]));
  }
}, Lc = (t, e = 0, n = !1) => {
  let r;
  return (...s) => {
    n && !r && t(...s), clearTimeout(r), r = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Vs = (t, e, n) => {
  const r = D(t);
  return sr((s, c) => ({
    get() {
      return s(), r.value;
    },
    set: Lc(
      (i) => {
        r.value = i, c();
      },
      e,
      n
    )
  }));
}, Fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Hc(t, e) {
  return _(), g("svg", Fc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const Rc = { render: Hc }, Bc = { class: "vuefinder__move-modal__content" }, Ic = { class: "vuefinder__move-modal__description" }, Nc = { class: "vuefinder__move-modal__files vf-scrollbar" }, Uc = { class: "vuefinder__move-modal__file" }, qc = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zc = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pc = { class: "vuefinder__move-modal__file-name" }, jc = { class: "vuefinder__move-modal__target-title" }, Gc = { class: "vuefinder__move-modal__target-directory" }, Kc = { class: "vuefinder__move-modal__target-path" }, Wc = { class: "vuefinder__move-modal__selected-items" }, Pn = {
  __name: "ModalMove",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = D(e.modal.data.items.from), s = D(""), c = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: i, type: d }) => ({ path: i, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), W(Ke, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Yes, Move!")), 1),
        l("button", {
          type: "button",
          onClick: d[1] || (d[1] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        l("div", Wc, b(o(n)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          z(et, {
            icon: o(Rc),
            title: o(n)("Move files")
          }, null, 8, ["icon", "title"]),
          l("div", Bc, [
            l("p", Ic, b(o(n)("Are you sure you want to move these files?")), 1),
            l("div", Nc, [
              (_(!0), g(ge, null, xe(r.value, (a) => (_(), g("div", Uc, [
                l("div", null, [
                  a.type === "dir" ? (_(), g("svg", qc, d[2] || (d[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), g("svg", zc, d[3] || (d[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                l("div", Pc, b(a.path), 1)
              ]))), 256))
            ]),
            l("h4", jc, b(o(n)("Target Directory")), 1),
            l("p", Gc, [
              d[4] || (d[4] = l("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "1"
              }, [
                l("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                })
              ], -1)),
              l("span", Kc, b(o(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (_(), W(We, {
              key: 0,
              onHidden: d[0] || (d[0] = (a) => s.value = ""),
              error: ""
            }, {
              default: Q(() => [
                J(b(s.value), 1)
              ]),
              _: 1
            })) : q("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Yc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function Xc(t, e) {
  return _(), g("svg", Yc, e[0] || (e[0] = [
    l("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ]));
}
const Jc = { render: Xc }, Zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Qc(t, e) {
  return _(), g("svg", Zc, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const ed = { render: Qc }, td = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function nd(t, e) {
  return _(), g("svg", td, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const sd = { render: nd }, od = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function rd(t, e) {
  return _(), g("svg", od, e[0] || (e[0] = [
    l("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ]));
}
const ld = { render: rd }, ad = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function id(t, e) {
  return _(), g("svg", ad, e[0] || (e[0] = [
    l("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ]));
}
const cd = { render: id }, dd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function ud(t, e) {
  return _(), g("svg", dd, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const vd = { render: ud }, _d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function fd(t, e) {
  return _(), g("svg", _d, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ]));
}
const mn = { render: fd }, md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function pd(t, e) {
  return _(), g("svg", md, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ]));
}
const hd = { render: pd }, gd = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function bd(t, e) {
  return _(), g("svg", gd, e[0] || (e[0] = [
    l("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const wd = { render: bd }, yd = { class: "vuefinder__breadcrumb__container" }, kd = ["title"], xd = ["title"], Sd = ["title"], $d = ["title"], Cd = { class: "vuefinder__breadcrumb__list" }, Ed = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Ad = { class: "relative" }, Td = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Md = { class: "vuefinder__breadcrumb__search-mode" }, Dd = ["placeholder"], Vd = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Od = ["onDrop", "onClick"], Ld = { class: "vuefinder__breadcrumb__hidden-item-content" }, Fd = { class: "vuefinder__breadcrumb__hidden-item-text" }, Hd = {
  __name: "Breadcrumb",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = e.dragSelect, { setStore: s } = e.storage, c = D(null), i = Vs(0, 100);
    Me(i, (O) => {
      const y = c.value.children;
      let w = 0, C = 0, A = 5, B = 1;
      e.fs.limitBreadcrumbItems(A), ct(() => {
        for (let k = y.length - 1; k >= 0 && !(w + y[k].offsetWidth > i.value - 40); k--)
          w += parseInt(y[k].offsetWidth, 10), C++;
        C < B && (C = B), C > A && (C = A), e.fs.limitBreadcrumbItems(C);
      });
    });
    const d = () => {
      i.value = c.value.offsetWidth;
    };
    let a = D(null);
    Se(() => {
      a.value = new ResizeObserver(d), a.value.observe(c.value);
    }), jn(() => {
      a.value.disconnect();
    });
    const u = (O, y = null) => {
      O.preventDefault(), r.isDraggingRef.value = !1, p(O), y ?? (y = e.fs.hiddenBreadcrumbs.length - 1);
      let w = JSON.parse(O.dataTransfer.getData("items"));
      if (w.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: w,
          to: e.fs.hiddenBreadcrumbs[y] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, m = (O, y = null) => {
      O.preventDefault(), r.isDraggingRef.value = !1, p(O), y ?? (y = e.fs.breadcrumbs.length - 2);
      let w = JSON.parse(O.dataTransfer.getData("items"));
      if (w.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: w,
          to: e.fs.breadcrumbs[y] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, v = (O) => {
      O.preventDefault(), e.fs.isGoUpAvailable() ? (O.dataTransfer.dropEffect = "copy", O.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (O.dataTransfer.dropEffect = "none", O.dataTransfer.effectAllowed = "none");
    }, p = (O) => {
      O.preventDefault(), O.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && O.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, f = () => {
      L(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      L(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, x = (O) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: O.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, S = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, E = {
      mounted(O, y, w, C) {
        O.clickOutsideEvent = function(A) {
          O === A.target || O.contains(A.target) || y.value();
        }, document.body.addEventListener("click", O.clickOutsideEvent);
      },
      beforeUnmount(O, y, w, C) {
        document.body.removeEventListener("click", O.clickOutsideEvent);
      }
    }, R = () => {
      e.showTreeView = !e.showTreeView;
    };
    Me(() => e.showTreeView, (O, y) => {
      O !== y && s("show-tree-view", O);
    });
    const T = D(null), $ = () => {
      e.features.includes(de.SEARCH) && (e.fs.searchMode = !0, ct(() => T.value.focus()));
    }, V = Vs("", 400);
    Me(V, (O) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: O });
    }), Me(() => e.fs.searchMode, (O) => {
      O && ct(() => T.value.focus());
    });
    const L = () => {
      e.fs.searchMode = !1, V.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      L();
    });
    const P = () => {
      V.value === "" && L();
    };
    return (O, y) => (_(), g("div", yd, [
      l("span", {
        title: o(n)("Toggle Tree View")
      }, [
        z(o(hd), {
          onClick: R,
          class: le(["vuefinder__breadcrumb__toggle-tree", o(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, kd),
      l("span", {
        title: o(n)("Go up a directory")
      }, [
        z(o(ed), {
          onDragover: y[0] || (y[0] = (w) => v(w)),
          onDragleave: y[1] || (y[1] = (w) => p(w)),
          onDrop: y[2] || (y[2] = (w) => m(w)),
          onClick: h,
          class: le(o(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, xd),
      o(e).fs.loading ? (_(), g("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        z(o(sd), {
          onClick: y[3] || (y[3] = (w) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, $d)) : (_(), g("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        z(o(Jc), { onClick: f })
      ], 8, Sd)),
      ue(l("div", {
        onClick: Ze($, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        l("div", null, [
          z(o(ld), {
            onDragover: y[4] || (y[4] = (w) => v(w)),
            onDragleave: y[5] || (y[5] = (w) => p(w)),
            onDrop: y[6] || (y[6] = (w) => m(w, -1)),
            onClick: y[7] || (y[7] = (w) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter } }))
          })
        ]),
        l("div", Cd, [
          o(e).fs.hiddenBreadcrumbs.length ? ue((_(), g("div", Ed, [
            y[13] || (y[13] = l("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("div", Ad, [
              l("span", {
                onDragenter: y[8] || (y[8] = (w) => o(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: y[9] || (y[9] = (w) => o(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                z(o(wd), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [E, S]
          ]) : q("", !0)
        ]),
        l("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: Ze($, ["self"])
        }, [
          (_(!0), g(ge, null, xe(o(e).fs.breadcrumbs, (w, C) => (_(), g("div", { key: C }, [
            y[14] || (y[14] = l("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("span", {
              onDragover: (A) => C === o(e).fs.breadcrumbs.length - 1 || v(A),
              onDragleave: (A) => C === o(e).fs.breadcrumbs.length - 1 || p(A),
              onDrop: (A) => C === o(e).fs.breadcrumbs.length - 1 || m(A, C),
              class: "vuefinder__breadcrumb__item",
              title: w.basename,
              onClick: (A) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter, path: w.path } })
            }, b(w.name), 41, Td)
          ]))), 128))
        ], 512),
        o(e).loadingIndicator === "circular" && o(e).fs.loading ? (_(), W(o(is), { key: 0 })) : q("", !0)
      ], 512), [
        [Ue, !o(e).fs.searchMode]
      ]),
      ue(l("div", Md, [
        l("div", null, [
          z(o(cd))
        ]),
        ue(l("input", {
          ref_key: "searchInput",
          ref: T,
          onKeydown: kt(L, ["esc"]),
          onBlur: P,
          "onUpdate:modelValue": y[10] || (y[10] = (w) => or(V) ? V.value = w : null),
          placeholder: o(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Dd), [
          [xt, o(V)]
        ]),
        z(o(vd), { onClick: L })
      ], 512), [
        [Ue, o(e).fs.searchMode]
      ]),
      ue(l("div", Vd, [
        (_(!0), g(ge, null, xe(o(e).fs.hiddenBreadcrumbs, (w, C) => (_(), g("div", {
          key: C,
          onDragover: y[11] || (y[11] = (A) => v(A)),
          onDragleave: y[12] || (y[12] = (A) => p(A)),
          onDrop: (A) => u(A, C),
          onClick: (A) => x(w),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          l("div", Ld, [
            l("span", null, [
              z(o(mn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            y[15] || (y[15] = J()),
            l("span", Fd, b(w.name), 1)
          ])
        ], 40, Od))), 128))
      ], 512), [
        [Ue, o(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, No = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Rd = ["onClick"], Bd = {
  __name: "Toast",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, r = D(n("full-screen", !1)), s = D([]), c = (a) => a === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (a) => {
      s.value.splice(a, 1);
    }, d = (a) => {
      let u = s.value.findIndex((m) => m.id === a);
      u !== -1 && i(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (a) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      a.id = u, s.value.push(a), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (a, u) => (_(), g("div", {
      class: le(["vuefinder__toast", r.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      z(rr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Q(() => [
          (_(!0), g(ge, null, xe(s.value, (m, v) => (_(), g("div", {
            key: v,
            onClick: (p) => i(v),
            class: le(["vuefinder__toast__message", c(m.type)])
          }, b(m.label), 11, Rd))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Id = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Nd(t, e) {
  return _(), g("svg", Id, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Ud = { render: Nd }, qd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function zd(t, e) {
  return _(), g("svg", qd, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Pd = { render: zd }, Gt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (_(), g("div", null, [
      t.direction === "asc" ? (_(), W(o(Ud), { key: 0 })) : q("", !0),
      t.direction === "desc" ? (_(), W(o(Pd), { key: 1 })) : q("", !0)
    ]));
  }
}, jd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Gd(t, e) {
  return _(), g("svg", jd, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Kd = { render: Gd }, Wd = { class: "vuefinder__item-icon" }, $n = {
  __name: "ItemIcon",
  props: {
    type: {
      type: String,
      required: !0
    },
    small: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    return (e, n) => (_(), g("span", Wd, [
      t.type === "dir" ? (_(), W(o(mn), {
        key: 0,
        class: le(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (_(), W(o(Kd), {
        key: 1,
        class: le(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, Yd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function Xd(t, e) {
  return _(), g("svg", Yd, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Jd = { render: Xd }, Zd = { class: "vuefinder__drag-item__container" }, Qd = { class: "vuefinder__drag-item__count" }, eu = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, r) => (_(), g("div", Zd, [
      z(o(Jd)),
      l("div", Qd, b(e.count), 1)
    ]));
  }
}, tu = { class: "vuefinder__text-preview" }, nu = { class: "vuefinder__text-preview__header" }, su = ["title"], ou = { class: "vuefinder__text-preview__actions" }, ru = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, lu = { key: 1 }, au = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = D(""), s = D(""), c = D(null), i = D(!1), d = D(""), a = D(!1), u = re("ServiceContainer"), { t: m } = u.i18n;
    Se(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((f) => {
        r.value = f, n("success");
      });
    });
    const v = () => {
      i.value = !i.value, s.value = r.value;
    }, p = () => {
      d.value = "", a.value = !1, u.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: u.modal.data.adapter,
          path: u.modal.data.item.path
        },
        body: {
          content: s.value
        },
        responseType: "text"
      }).then((f) => {
        d.value = m("Updated."), r.value = f, n("success"), i.value = !i.value;
      }).catch((f) => {
        d.value = m(f.message), a.value = !0;
      });
    };
    return (f, h) => (_(), g("div", tu, [
      l("div", nu, [
        l("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(u).modal.data.item.path
        }, b(o(u).modal.data.item.basename), 9, su),
        l("div", ou, [
          i.value ? (_(), g("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, b(o(m)("Save")), 1)) : q("", !0),
          o(u).features.includes(o(de).EDIT) ? (_(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (x) => v())
          }, b(i.value ? o(m)("Cancel") : o(m)("Edit")), 1)) : q("", !0)
        ])
      ]),
      l("div", null, [
        i.value ? (_(), g("div", lu, [
          ue(l("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": h[1] || (h[1] = (x) => s.value = x),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [xt, s.value]
          ])
        ])) : (_(), g("pre", ru, b(r.value), 1)),
        d.value.length ? (_(), W(We, {
          key: 2,
          onHidden: h[2] || (h[2] = (x) => d.value = ""),
          error: a.value
        }, {
          default: Q(() => [
            J(b(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : q("", !0)
      ])
    ]));
  }
}, iu = { class: "vuefinder__image-preview" }, cu = { class: "vuefinder__image-preview__header" }, du = ["title"], uu = { class: "vuefinder__image-preview__actions" }, vu = { class: "vuefinder__image-preview__image-container" }, _u = ["src"], fu = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = re("ServiceContainer"), { t: s } = r.i18n, c = D(null), i = D(null), d = D(!1), a = D(""), u = D(!1), m = () => {
      d.value = !d.value, d.value ? i.value = new mr(c.value, {
        crop(p) {
        }
      }) : i.value.destroy();
    }, v = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          a.value = "", u.value = !1;
          const f = new FormData();
          f.set("file", p), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: f
          }).then((h) => {
            a.value = s("Updated."), c.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), m(), n("success");
          }).catch((h) => {
            a.value = s(h.message), u.value = !0;
          });
        }
      );
    };
    return Se(() => {
      n("success");
    }), (p, f) => (_(), g("div", iu, [
      l("div", cu, [
        l("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(r).modal.data.item.path
        }, b(o(r).modal.data.item.basename), 9, du),
        l("div", uu, [
          d.value ? (_(), g("button", {
            key: 0,
            onClick: v,
            class: "vuefinder__image-preview__crop-button"
          }, b(o(s)("Crop")), 1)) : q("", !0),
          o(r).features.includes(o(de).EDIT) ? (_(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: f[0] || (f[0] = (h) => m())
          }, b(d.value ? o(s)("Cancel") : o(s)("Edit")), 1)) : q("", !0)
        ])
      ]),
      l("div", vu, [
        l("img", {
          ref_key: "image",
          ref: c,
          class: "vuefinder__image-preview__image",
          src: o(r).requester.getPreviewUrl(o(r).modal.data.adapter, o(r).modal.data.item),
          alt: ""
        }, null, 8, _u)
      ]),
      a.value.length ? (_(), W(We, {
        key: 0,
        onHidden: f[1] || (f[1] = (h) => a.value = ""),
        error: u.value
      }, {
        default: Q(() => [
          J(b(a.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : q("", !0)
    ]));
  }
}, mu = { class: "vuefinder__default-preview" }, pu = { class: "vuefinder__default-preview__header" }, hu = ["title"], gu = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e;
    return Se(() => {
      r("success");
    }), (s, c) => (_(), g("div", mu, [
      l("div", pu, [
        l("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: o(n).modal.data.item.path
        }, b(o(n).modal.data.item.basename), 9, hu)
      ]),
      c[0] || (c[0] = l("div", null, null, -1))
    ]));
  }
}, bu = { class: "vuefinder__video-preview" }, wu = ["title"], yu = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, ku = ["src"], xu = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Se(() => {
      r("success");
    }), (c, i) => (_(), g("div", bu, [
      l("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, wu),
      l("div", null, [
        l("video", yu, [
          l("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, ku),
          i[0] || (i[0] = J(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, Su = { class: "vuefinder__audio-preview" }, $u = ["title"], Cu = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Eu = ["src"], Au = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = re("ServiceContainer"), s = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return Se(() => {
      n("success");
    }), (c, i) => (_(), g("div", Su, [
      l("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(r).modal.data.item.path
      }, b(o(r).modal.data.item.basename), 9, $u),
      l("div", null, [
        l("audio", Cu, [
          l("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Eu),
          i[0] || (i[0] = J(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, Tu = { class: "vuefinder__pdf-preview" }, Mu = ["title"], Du = ["data"], Vu = ["src"], Ou = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Se(() => {
      r("success");
    }), (c, i) => (_(), g("div", Tu, [
      l("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, Mu),
      l("div", null, [
        l("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          l("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Vu)
        ], 8, Du)
      ])
    ]));
  }
}, Lu = { class: "vuefinder__preview-modal__content" }, Fu = { key: 0 }, Hu = { class: "vuefinder__preview-modal__loading" }, Ru = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Bu = { class: "vuefinder__preview-modal__details" }, Iu = { class: "font-bold" }, Nu = { class: "font-bold pl-2" }, Uu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, qu = ["download", "href"], Uo = {
  __name: "ModalPreview",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = D(!1), s = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(de.PREVIEW);
    return c || (r.value = !0), (i, d) => (_(), W(Ke, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: d[6] || (d[6] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(de).DOWNLOAD) ? (_(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, b(o(n)("Download")), 9, qu)) : q("", !0)
      ]),
      default: Q(() => [
        l("div", null, [
          l("div", Lu, [
            o(c) ? (_(), g("div", Fu, [
              s("text") ? (_(), W(au, {
                key: 0,
                onSuccess: d[0] || (d[0] = (a) => r.value = !0)
              })) : s("image") ? (_(), W(fu, {
                key: 1,
                onSuccess: d[1] || (d[1] = (a) => r.value = !0)
              })) : s("video") ? (_(), W(xu, {
                key: 2,
                onSuccess: d[2] || (d[2] = (a) => r.value = !0)
              })) : s("audio") ? (_(), W(Au, {
                key: 3,
                onSuccess: d[3] || (d[3] = (a) => r.value = !0)
              })) : s("application/pdf") ? (_(), W(Ou, {
                key: 4,
                onSuccess: d[4] || (d[4] = (a) => r.value = !0)
              })) : (_(), W(gu, {
                key: 5,
                onSuccess: d[5] || (d[5] = (a) => r.value = !0)
              }))
            ])) : q("", !0),
            l("div", Hu, [
              r.value === !1 ? (_(), g("div", Ru, [
                d[7] || (d[7] = l("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  l("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  l("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                l("span", null, b(o(n)("Loading")), 1)
              ])) : q("", !0)
            ])
          ])
        ]),
        l("div", Bu, [
          l("div", null, [
            l("span", Iu, b(o(n)("File Size")) + ": ", 1),
            J(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          l("div", null, [
            l("span", Nu, b(o(n)("Last Modified")) + ": ", 1),
            J(" " + b(o(No)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(de).DOWNLOAD) ? (_(), g("div", Uu, [
          l("span", null, b(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : q("", !0)
      ]),
      _: 1
    }));
  }
}, zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Pu(t, e) {
  return _(), g("svg", zu, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const qo = { render: Pu }, ju = ["data-type", "data-item", "data-index"], Cn = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = e.dragSelect, r = t, s = (f) => {
      f.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: f.path } })) : e.modal.open(Uo, { adapter: e.fs.adapter, item: f });
    }, c = {
      mounted(f, h, x, S) {
        x.props.draggable && (f.addEventListener("dragstart", (E) => i(E, h.value)), f.addEventListener("dragover", (E) => a(E, h.value)), f.addEventListener("drop", (E) => d(E, h.value)));
      },
      beforeUnmount(f, h, x, S) {
        x.props.draggable && (f.removeEventListener("dragstart", i), f.removeEventListener("dragover", a), f.removeEventListener("drop", d));
      }
    }, i = (f, h) => {
      if (f.altKey || f.ctrlKey || f.metaKey)
        return f.preventDefault(), !1;
      n.isDraggingRef.value = !0, f.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), f.dataTransfer.effectAllowed = "all", f.dataTransfer.dropEffect = "copy", f.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (f, h) => {
      f.preventDefault(), n.isDraggingRef.value = !1;
      let x = JSON.parse(f.dataTransfer.getData("items"));
      if (x.find((S) => S.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, { items: { from: x, to: h } });
    }, a = (f, h) => {
      f.preventDefault(), !h || h.type !== "dir" || n.getSelection().find((x) => x === f.currentTarget) ? (f.dataTransfer.dropEffect = "none", f.dataTransfer.effectAllowed = "none") : f.dataTransfer.dropEffect = "copy";
    };
    let u = null, m = !1;
    const v = () => {
      u && clearTimeout(u);
    }, p = (f) => {
      if (!m)
        m = !0, setTimeout(() => m = !1, 300);
      else
        return m = !1, s(r.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const h = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: f.target.getBoundingClientRect().x,
          clientY: f.target.getBoundingClientRect().y
        });
        f.target.dispatchEvent(h);
      }, 500);
    };
    return (f, h) => ue((_(), g("div", {
      style: rn({ opacity: o(n).isDraggingRef.value && o(n).getSelection().find((x) => f.$el === x) ? "0.5 !important" : "" }),
      class: le(["vuefinder__item", "vf-item-" + o(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: h[0] || (h[0] = (x) => s(t.item)),
      onTouchstart: h[1] || (h[1] = (x) => p(x)),
      onTouchend: h[2] || (h[2] = (x) => v()),
      onContextmenu: h[3] || (h[3] = Ze((x) => o(e).emitter.emit("vf-contextmenu-show", { event: x, items: o(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Tt(f.$slots, "default"),
      o(e).pinnedFolders.find((x) => x.path === t.item.path) ? (_(), W(o(qo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : q("", !0)
    ], 46, ju)), [
      [c, t.item]
    ]);
  }
}, Gu = { class: "vuefinder__explorer__container" }, Ku = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Wu = { class: "vuefinder__explorer__drag-item" }, Yu = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, Xu = { class: "vuefinder__explorer__item-list-content" }, Ju = { class: "vuefinder__explorer__item-list-name" }, Zu = { class: "vuefinder__explorer__item-name" }, Qu = { class: "vuefinder__explorer__item-path" }, ev = { class: "vuefinder__explorer__item-list-content" }, tv = { class: "vuefinder__explorer__item-list-name" }, nv = { class: "vuefinder__explorer__item-name" }, sv = { class: "vuefinder__explorer__item-size" }, ov = { class: "vuefinder__explorer__item-date" }, rv = { class: "vuefinder__explorer__item-grid-content" }, lv = ["data-src", "alt"], av = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, iv = { class: "vuefinder__explorer__item-title break-all" }, cv = {
  __name: "Explorer",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = (v) => v == null ? void 0 : v.substring(0, 3), s = D(null), c = D(""), i = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      i.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      c.value = v, v ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: v
        },
        onSuccess: (p) => {
          p.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const a = yt({ active: !1, column: "", order: "" }), u = (v = !0) => {
      let p = [...e.fs.data.files], f = a.column, h = a.order === "asc" ? 1 : -1;
      if (!v)
        return p;
      const x = (S, E) => typeof S == "string" && typeof E == "string" ? S.toLowerCase().localeCompare(E.toLowerCase()) : S < E ? -1 : S > E ? 1 : 0;
      return a.active && (p = p.slice().sort((S, E) => x(S[f], E[f]) * h)), p;
    }, m = (v) => {
      a.active && a.column === v ? (a.active = a.order === "asc", a.column = v, a.order = "desc") : (a.active = !0, a.column = v, a.order = "asc");
    };
    return Se(() => {
      d = new fr(i.area.value);
    }), Ls(() => {
      d.update();
    }), Hs(() => {
      d.destroy();
    }), (v, p) => (_(), g("div", Gu, [
      o(e).view === "list" || c.value.length ? (_(), g("div", Ku, [
        l("div", {
          onClick: p[0] || (p[0] = (f) => m("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          J(b(o(n)("Name")) + " ", 1),
          ue(z(Gt, {
            direction: a.order
          }, null, 8, ["direction"]), [
            [Ue, a.active && a.column === "basename"]
          ])
        ]),
        c.value.length ? q("", !0) : (_(), g("div", {
          key: 0,
          onClick: p[1] || (p[1] = (f) => m("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          J(b(o(n)("Size")) + " ", 1),
          ue(z(Gt, {
            direction: a.order
          }, null, 8, ["direction"]), [
            [Ue, a.active && a.column === "file_size"]
          ])
        ])),
        c.value.length ? q("", !0) : (_(), g("div", {
          key: 1,
          onClick: p[2] || (p[2] = (f) => m("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          J(b(o(n)("Date")) + " ", 1),
          ue(z(Gt, {
            direction: a.order
          }, null, 8, ["direction"]), [
            [Ue, a.active && a.column === "last_modified"]
          ])
        ])),
        c.value.length ? (_(), g("div", {
          key: 2,
          onClick: p[3] || (p[3] = (f) => m("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          J(b(o(n)("Filepath")) + " ", 1),
          ue(z(Gt, {
            direction: a.order
          }, null, 8, ["direction"]), [
            [Ue, a.active && a.column === "path"]
          ])
        ])) : q("", !0)
      ])) : q("", !0),
      l("div", Wu, [
        z(eu, {
          ref_key: "dragImage",
          ref: s,
          count: o(i).getCount()
        }, null, 8, ["count"])
      ]),
      l("div", {
        ref: o(i).scrollBarContainer,
        class: le(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": o(e).view === "grid" }, { "search-active": c.value.length }]])
      }, [
        l("div", {
          ref: o(i).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      l("div", {
        ref: o(i).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area min-h-32",
        onContextmenu: p[4] || (p[4] = Ze((f) => o(e).emitter.emit("vf-contextmenu-show", { event: f, items: o(i).getSelected() }), ["self", "prevent"]))
      }, [
        o(e).loadingIndicator === "linear" && o(e).fs.loading ? (_(), g("div", Yu)) : q("", !0),
        c.value.length ? (_(!0), g(ge, { key: 1 }, xe(u(), (f, h) => (_(), W(Cn, {
          item: f,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: Q(() => [
            l("div", Xu, [
              l("div", Ju, [
                z($n, {
                  type: f.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", Zu, b(f.basename), 1)
              ]),
              l("div", Qu, b(f.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0),
        o(e).view === "list" && !c.value.length ? (_(!0), g(ge, { key: 2 }, xe(u(), (f, h) => (_(), W(Cn, {
          item: f,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: f.path
        }, {
          default: Q(() => [
            l("div", ev, [
              l("div", tv, [
                z($n, {
                  type: f.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", nv, b(f.basename), 1)
              ]),
              l("div", sv, b(f.file_size ? o(e).filesize(f.file_size) : ""), 1),
              l("div", ov, b(o(No)(f.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : q("", !0),
        o(e).view === "grid" && !c.value.length ? (_(!0), g(ge, { key: 3 }, xe(u(!1), (f, h) => (_(), W(Cn, {
          item: f,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: Q(() => [
            l("div", null, [
              l("div", rv, [
                (f.mime_type ?? "").startsWith("image") && o(e).showThumbnails ? (_(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": o(e).requester.getPreviewUrl(o(e).fs.adapter, f),
                  alt: f.basename,
                  key: f.path
                }, null, 8, lv)) : (_(), W($n, {
                  key: 1,
                  type: f.type
                }, null, 8, ["type"])),
                !((f.mime_type ?? "").startsWith("image") && o(e).showThumbnails) && f.type !== "dir" ? (_(), g("div", av, b(r(f.extension)), 1)) : q("", !0)
              ]),
              l("span", iv, b(o(zn)(f.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0)
      ], 544),
      z(Bd)
    ]));
  }
}, dv = ["href", "download"], uv = ["onClick"], vv = {
  __name: "ContextMenu",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = D(null), s = D([]), c = D(""), i = yt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = rt(() => i.items.filter((v) => v.key == null || e.features.includes(v.key)));
    e.emitter.on("vf-context-selected", (v) => {
      s.value = v;
    });
    const a = {
      newfolder: {
        key: de.NEW_FOLDER,
        title: () => n("New Folder"),
        action: () => e.modal.open(Oo)
      },
      selectAll: {
        title: () => n("Select All"),
        action: () => e.dragSelect.selectAll()
      },
      pinFolder: {
        title: () => n("Pin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.concat(s.value), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      unpinFolder: {
        title: () => n("Unpin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.filter((v) => !s.value.find((p) => p.path === v.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: de.DELETE,
        title: () => n("Delete"),
        action: () => {
          e.modal.open(ls, { items: s });
        }
      },
      refresh: {
        title: () => n("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
        }
      },
      preview: {
        key: de.PREVIEW,
        title: () => n("Preview"),
        action: () => e.modal.open(Uo, { adapter: e.fs.adapter, item: s.value[0] })
      },
      open: {
        title: () => n("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: s.value[0].path
            }
          });
        }
      },
      openDir: {
        title: () => n("Open containing folder"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: s.value[0].dir
            }
          });
        }
      },
      download: {
        key: de.DOWNLOAD,
        link: rt(() => e.requester.getDownloadUrl(e.fs.adapter, s.value[0])),
        title: () => n("Download"),
        action: () => {
        }
      },
      archive: {
        key: de.ARCHIVE,
        title: () => n("Archive"),
        action: () => e.modal.open(Io, { items: s })
      },
      unarchive: {
        key: de.UNARCHIVE,
        title: () => n("Unarchive"),
        action: () => e.modal.open(Ro, { items: s })
      },
      rename: {
        key: de.RENAME,
        title: () => n("Rename"),
        action: () => e.modal.open(as, { items: s })
      }
    }, u = (v) => {
      e.emitter.emit("vf-contextmenu-hide"), v.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      c.value = v;
    }), e.emitter.on("vf-contextmenu-show", ({ event: v, items: p, target: f = null }) => {
      if (i.items = [], c.value)
        if (f)
          i.items.push(a.openDir), e.emitter.emit("vf-context-selected", [f]);
        else
          return;
      else !f && !c.value ? (i.items.push(a.refresh), i.items.push(a.selectAll), i.items.push(a.newfolder), e.emitter.emit("vf-context-selected", [])) : p.length > 1 && p.some((h) => h.path === f.path) ? (i.items.push(a.refresh), i.items.push(a.archive), i.items.push(a.delete), e.emitter.emit("vf-context-selected", p)) : (f.type === "dir" ? (i.items.push(a.open), e.pinnedFolders.findIndex((h) => h.path === f.path) !== -1 ? i.items.push(a.unpinFolder) : i.items.push(a.pinFolder)) : (i.items.push(a.preview), i.items.push(a.download)), i.items.push(a.rename), f.mime_type === "application/zip" ? i.items.push(a.unarchive) : i.items.push(a.archive), i.items.push(a.delete), e.emitter.emit("vf-context-selected", [f]));
      m(v);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const m = (v) => {
      const p = e.dragSelect.area.value, f = e.root.getBoundingClientRect(), h = p.getBoundingClientRect();
      let x = v.clientX - f.left, S = v.clientY - f.top;
      i.active = !0, ct(() => {
        var $;
        const E = ($ = r.value) == null ? void 0 : $.getBoundingClientRect();
        let R = (E == null ? void 0 : E.height) ?? 0, T = (E == null ? void 0 : E.width) ?? 0;
        x = h.right - v.pageX + window.scrollX < T ? x - T : x, S = h.bottom - v.pageY + window.scrollY < R ? S - R : S, i.positions = {
          left: x + "px",
          top: S + "px"
        };
      });
    };
    return (v, p) => ue((_(), g("ul", {
      ref_key: "contextmenu",
      ref: r,
      style: rn(i.positions),
      class: "vuefinder__context-menu"
    }, [
      (_(!0), g(ge, null, xe(d.value, (f) => (_(), g("li", {
        class: "vuefinder__context-menu__item",
        key: f.title
      }, [
        f.link ? (_(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: f.link,
          download: f.link,
          onClick: p[0] || (p[0] = (h) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          l("span", null, b(f.title()), 1)
        ], 8, dv)) : (_(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => u(f)
        }, [
          l("span", null, b(f.title()), 1)
        ], 8, uv))
      ]))), 128))
    ], 4)), [
      [Ue, i.active]
    ]);
  }
}, _v = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function fv(t, e) {
  return _(), g("svg", _v, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const zo = { render: fv }, mv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function pv(t, e) {
  return _(), g("svg", mv, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ]));
}
const hv = { render: pv }, gv = { class: "vuefinder__status-bar__wrapper" }, bv = { class: "vuefinder__status-bar__storage" }, wv = ["title"], yv = { class: "vuefinder__status-bar__storage-icon" }, kv = ["value"], xv = { class: "vuefinder__status-bar__info" }, Sv = { key: 0 }, $v = { class: "vuefinder__status-bar__selected-count" }, Cv = { class: "vuefinder__status-bar__actions" }, Ev = ["disabled"], Av = ["title"], Tv = {
  __name: "Statusbar",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { setStore: r } = e.storage, s = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, i = D("");
    e.emitter.on("vf-search-query", ({ newQuery: a }) => {
      i.value = a;
    });
    const d = rt(() => {
      const a = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && a;
    });
    return (a, u) => (_(), g("div", gv, [
      l("div", bv, [
        l("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          l("div", yv, [
            z(o(zo))
          ]),
          ue(l("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (m) => o(e).fs.adapter = m),
            onChange: c,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (_(!0), g(ge, null, xe(o(e).fs.data.storages, (m) => (_(), g("option", { value: m }, b(m), 9, kv))), 256))
          ], 544), [
            [En, o(e).fs.adapter]
          ])
        ], 8, wv),
        l("div", xv, [
          i.value.length ? (_(), g("span", Sv, b(o(e).fs.data.files.length) + " items found. ", 1)) : q("", !0),
          l("span", $v, b(o(e).dragSelect.getCount() > 0 ? o(n)("%s item(s) selected.", o(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      l("div", Cv, [
        o(e).selectButton.active ? (_(), g("button", {
          key: 0,
          class: le(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (m) => o(e).selectButton.click(o(s).getSelected(), m))
        }, b(o(n)("Select")), 11, Ev)) : q("", !0),
        l("span", {
          class: "vuefinder__status-bar__about",
          title: o(n)("About"),
          onClick: u[2] || (u[2] = (m) => o(e).modal.open(To))
        }, [
          z(o(hv))
        ], 8, Av)
      ])
    ]));
  }
}, Mv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function Dv(t, e) {
  return _(), g("svg", Mv, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Po = { render: Dv }, Vv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ov(t, e) {
  return _(), g("svg", Vv, e[0] || (e[0] = [
    l("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const Lv = { render: Ov }, Fv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Hv(t, e) {
  return _(), g("svg", Fv, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const jo = { render: Hv }, Rv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Bv(t, e) {
  return _(), g("svg", Rv, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const Go = { render: Bv };
function Ko(t, e) {
  const n = t.findIndex((r) => r.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Iv = { class: "vuefinder__folder-loader-indicator" }, Nv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Wo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ lr({
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = re("ServiceContainer");
    n.i18n;
    const r = Rs(t, "modelValue"), s = D(!1);
    Me(
      () => r.value,
      () => {
        var d;
        return ((d = c()) == null ? void 0 : d.folders.length) || i();
      }
    );
    function c() {
      return n.treeViewData.find((d) => d.path === e.path);
    }
    const i = () => {
      s.value = !0, n.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((d) => {
        Ko(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, a) => {
      var u;
      return _(), g("div", Iv, [
        s.value ? (_(), W(o(is), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (_(), g("div", Nv, [
          r.value && ((u = c()) != null && u.folders.length) ? (_(), W(o(Go), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : q("", !0),
          r.value ? q("", !0) : (_(), W(o(jo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Uv = { class: "vuefinder__treesubfolderlist__item-content" }, qv = ["onClick"], zv = ["title", "onClick"], Pv = { class: "vuefinder__treesubfolderlist__item-icon" }, jv = { class: "vuefinder__treesubfolderlist__subfolder" }, Gv = {
  __name: "TreeSubfolderList",
  props: {
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = D([]), r = t, s = D(null);
    Se(() => {
      r.path === r.adapter + "://" && je(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = rt(() => {
      var i;
      return ((i = e.treeViewData.find((d) => d.path === r.path)) == null ? void 0 : i.folders) || [];
    });
    return (i, d) => {
      const a = ar("TreeSubfolderList", !0);
      return _(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (_(!0), g(ge, null, xe(c.value, (u, m) => (_(), g("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          l("div", Uv, [
            l("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (v) => n.value[u.path] = !n.value[u.path]
            }, [
              z(Wo, {
                adapter: t.adapter,
                path: u.path,
                modelValue: n.value[u.path],
                "onUpdate:modelValue": (v) => n.value[u.path] = v
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, qv),
            l("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (v) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r.adapter, path: u.path } })
            }, [
              l("div", Pv, [
                o(e).fs.path === u.path ? (_(), W(o(Po), { key: 0 })) : (_(), W(o(mn), { key: 1 }))
              ]),
              l("div", {
                class: le(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(e).fs.path === u.path
                }])
              }, b(u.basename), 3)
            ], 8, zv)
          ]),
          l("div", jv, [
            ue(z(a, {
              adapter: r.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [Ue, n.value[u.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, Kv = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, r = D(!1);
    function s(c) {
      c === e.fs.adapter ? r.value = !r.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: c } }), n("adapter", c));
    }
    return (c, i) => (_(), g(ge, null, [
      l("div", {
        onClick: i[2] || (i[2] = (d) => s(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        l("div", {
          class: le(["vuefinder__treestorageitem__info", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          l("div", {
            class: le(["vuefinder__treestorageitem__icon", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            z(o(zo))
          ], 2),
          l("div", null, b(t.storage), 1)
        ], 2),
        l("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: i[1] || (i[1] = Ze((d) => r.value = !r.value, ["stop"]))
        }, [
          z(Wo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: r.value,
            "onUpdate:modelValue": i[0] || (i[0] = (d) => r.value = d)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ue(z(Gv, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [Ue, r.value]
      ])
    ], 64));
  }
}, Wv = { class: "vuefinder__folder-indicator" }, Yv = { class: "vuefinder__folder-indicator--icon" }, Xv = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Rs(t, "modelValue");
    return (n, r) => (_(), g("div", Wv, [
      l("div", Yv, [
        e.value ? (_(), W(o(Go), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : q("", !0),
        e.value ? q("", !0) : (_(), W(o(jo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, Jv = { class: "vuefinder__treeview__header" }, Zv = { class: "vuefinder__treeview__pinned-label" }, Qv = { class: "vuefinder__treeview__pin-text text-nowrap" }, e_ = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, t_ = { class: "vuefinder__treeview__pinned-item" }, n_ = ["onClick"], s_ = ["title"], o_ = ["onClick"], r_ = { key: 0 }, l_ = { class: "vuefinder__treeview__no-pinned" }, a_ = { class: "vuefinder__treeview__storage" }, i_ = {
  __name: "TreeView",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { getStore: r, setStore: s } = e.storage, c = D(190), i = D(r("pinned-folders-opened", !0));
    Me(i, (m) => s("pinned-folders-opened", m));
    const d = (m) => {
      e.pinnedFolders = e.pinnedFolders.filter((v) => v.path !== m.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, a = (m) => {
      const v = m.clientX, p = m.target.parentElement, f = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const h = (S) => {
        c.value = f + S.clientX - v, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, x = () => {
        const S = p.getBoundingClientRect();
        c.value = S.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", x);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", x);
    }, u = D(null);
    return Se(() => {
      je(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Me(e.fs.data, (m, v) => {
      const p = m.files.filter((f) => f.type === "dir");
      Ko(e.treeViewData, { path: e.fs.path, folders: p.map((f) => ({
        adapter: f.storage,
        path: f.path,
        basename: f.basename
      })) });
    }), (m, v) => (_(), g(ge, null, [
      l("div", {
        onClick: v[0] || (v[0] = (p) => o(e).showTreeView = !o(e).showTreeView),
        class: le(["vuefinder__treeview__overlay", o(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      l("div", {
        style: rn(o(e).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        l("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          l("div", Jv, [
            l("div", {
              onClick: v[2] || (v[2] = (p) => i.value = !i.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              l("div", Zv, [
                z(o(qo), { class: "vuefinder__treeview__pin-icon" }),
                l("div", Qv, b(o(n)("Pinned Folders")), 1)
              ]),
              z(Xv, {
                modelValue: i.value,
                "onUpdate:modelValue": v[1] || (v[1] = (p) => i.value = p)
              }, null, 8, ["modelValue"])
            ]),
            i.value ? (_(), g("ul", e_, [
              (_(!0), g(ge, null, xe(o(e).pinnedFolders, (p) => (_(), g("li", t_, [
                l("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (f) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: p.storage, path: p.path } })
                }, [
                  o(e).fs.path !== p.path ? (_(), W(o(mn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : q("", !0),
                  o(e).fs.path === p.path ? (_(), W(o(Po), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : q("", !0),
                  l("div", {
                    title: p.path,
                    class: le(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": o(e).fs.path === p.path
                    }])
                  }, b(p.basename), 11, s_)
                ], 8, n_),
                l("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (f) => d(p)
                }, [
                  z(o(Lv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, o_)
              ]))), 256)),
              o(e).pinnedFolders.length ? q("", !0) : (_(), g("li", r_, [
                l("div", l_, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : q("", !0)
          ]),
          (_(!0), g(ge, null, xe(o(e).fs.data.storages, (p) => (_(), g("div", a_, [
            z(Kv, { storage: p }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        l("div", {
          onMousedown: a,
          class: le([(o(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, c_ = { class: "vuefinder__main__content" }, d_ = {
  __name: "VueFinder",
  props: {
    id: {
      type: String,
      default: "vf"
    },
    request: {
      type: [String, Object],
      required: !0
    },
    persist: {
      type: Boolean,
      default: !1
    },
    path: {
      type: String,
      default: ""
    },
    features: {
      type: [Array, Boolean],
      default: !0
    },
    debug: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "system"
    },
    locale: {
      type: String,
      default: null
    },
    maxHeight: {
      type: String,
      default: "600px"
    },
    maxFileSize: {
      type: String,
      default: "10mb"
    },
    fullScreen: {
      type: Boolean,
      default: !1
    },
    showTreeView: {
      type: Boolean,
      default: !1
    },
    pinnedFolders: {
      type: Array,
      default: []
    },
    showThumbnails: {
      type: Boolean,
      default: !0
    },
    selectButton: {
      type: Object,
      default(t) {
        return {
          active: !1,
          multiple: !1,
          click: (e) => {
          },
          ...t
        };
      }
    },
    onError: {
      type: Function,
      default: null
    },
    loadingIndicator: {
      type: String,
      default: "circular"
    }
  },
  emits: ["select", "update:path"],
  setup(t, { emit: e }) {
    const n = e, r = t, s = Ml(r, re("VueFinderOptions"));
    ir("ServiceContainer", s);
    const { setStore: c } = s.storage, i = D(null);
    s.root = i;
    const d = s.dragSelect;
    ii(s);
    const a = (v) => {
      Object.assign(s.fs.data, v), d.clearSelection(), d.refreshSelection();
    };
    let u;
    s.emitter.on("vf-fetch-abort", () => {
      u.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: v, body: p = null, onSuccess: f = null, onError: h = null, noCloseModal: x = !1 }) => {
      ["index", "search"].includes(v.q) && (u && u.abort(), s.fs.loading = !0), u = new AbortController();
      const S = u.signal;
      s.requester.send({
        url: "",
        method: v.m || "get",
        params: v,
        body: p,
        abortSignal: S
      }).then((E) => {
        s.fs.adapter = E.adapter, s.persist && (s.fs.path = E.dirname, c("path", s.fs.path)), x || s.modal.close(), a(E), f && f(E);
      }).catch((E) => {
        console.error(E), h && h(E);
      }).finally(() => {
        ["index", "search"].includes(v.q) && (s.fs.loading = !1);
      });
    });
    function m(v) {
      let p = {};
      v && v.includes("://") && (p = {
        adapter: v.split("://")[0],
        path: v
      }), s.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: s.fs.adapter, ...p },
        onError: r.onError ?? ((f) => {
          f.message && s.emitter.emit("vf-toast-push", { label: f.message, type: "error" });
        })
      });
    }
    return Se(() => {
      m(s.fs.path), Me(() => r.path, (v) => {
        m(v);
      }), d.onSelect((v) => {
        n("select", v);
      }), Me(() => s.fs.data.dirname, (v) => {
        n("update:path", v);
      });
    }), (v, p) => (_(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i,
      tabindex: "0"
    }, [
      l("div", {
        class: le(o(s).theme.actualValue)
      }, [
        l("div", {
          class: le([o(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: rn(o(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: p[0] || (p[0] = (f) => o(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (f) => o(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          z(Oc),
          z(Hd),
          l("div", c_, [
            z(i_),
            z(cv)
          ]),
          z(Tv)
        ], 38),
        z(cr, { name: "fade" }, {
          default: Q(() => [
            o(s).modal.visible ? (_(), W(Fs(o(s).modal.type), { key: 0 })) : q("", !0)
          ]),
          _: 1
        }),
        z(vv)
      ], 2)
    ], 512));
  }
}, w_ = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", d_);
  }
};
export {
  w_ as default
};
