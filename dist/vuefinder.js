var nr = Object.defineProperty;
var sr = (t, e, n) => e in t ? nr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var kn = (t, e, n) => sr(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as kt, watch as De, ref as A, shallowRef as or, onMounted as xe, onUnmounted as Wn, onUpdated as Rs, nextTick as dt, computed as bt, inject as re, openBlock as v, createElementBlock as g, withKeys as xt, unref as o, createElementVNode as a, withModifiers as et, renderSlot as Dt, normalizeClass as ae, toDisplayString as b, createBlock as W, resolveDynamicComponent as Is, withCtx as Z, createVNode as P, Fragment as ge, renderList as ke, createCommentVNode as q, withDirectives as ue, vModelCheckbox as jt, createTextVNode as Q, vModelSelect as An, vModelText as St, onBeforeUnmount as Hs, customRef as rr, vShow as Pe, isRef as ar, TransitionGroup as lr, normalizeStyle as ln, mergeModels as ir, useModel as Bs, resolveComponent as cr, provide as dr, Transition as ur } from "vue";
import _r from "mitt";
import vr from "dragselect";
import fr from "@uppy/core";
import mr from "@uppy/xhr-upload";
import hr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import pr from "cropperjs";
var Fs;
const xn = (Fs = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Fs.getAttribute("content");
class gr {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    kn(this, "config");
    kn(this, "customFetch", async (...e) => {
      let [n, r] = e;
      this.config.fetchRequestInterceptor && (r = this.config.fetchRequestInterceptor(r));
      let s = await fetch(n, r);
      return this.config.fetchResponseInterceptor && (s = await this.config.fetchResponseInterceptor(s)), s;
    });
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
    xn != null && xn !== "" && (r[n.xsrfHeaderName] = xn);
    const s = Object.assign({}, n.headers, r, e.headers), l = Object.assign({}, n.params, e.params), c = e.body, d = n.baseUrl + e.url, i = e.method;
    let u;
    i !== "get" && (c instanceof FormData ? (u = c, n.body != null && Object.entries(this.config.body).forEach(([_, h]) => {
      u.append(_, h);
    })) : (u = { ...c }, n.body != null && Object.assign(u, this.config.body)));
    const f = {
      url: d,
      method: i,
      headers: s,
      params: l,
      body: u
    };
    if (n.transformRequest != null) {
      const _ = n.transformRequest({
        url: d,
        method: i,
        headers: s,
        params: l,
        body: u
      });
      _.url != null && (f.url = _.url), _.method != null && (f.method = _.method), _.params != null && (f.params = _.params ?? {}), _.headers != null && (f.headers = _.headers ?? {}), _.body != null && (f.body = _.body);
    }
    return f;
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
    }, l = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let d;
      n.body instanceof FormData ? d = e.body : (d = JSON.stringify(n.body), s.headers["Content-Type"] = "application/json"), s.body = d;
    }
    this.config.fetchParams && Object.assign(s, this.config.fetchParams);
    const c = await this.customFetch(l, s);
    if (c.ok)
      return await c[r]();
    throw await c.json();
  }
}
function br(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token",
    fetchParams: {}
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new gr(e);
}
function wr(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = kt(JSON.parse(e ?? "{}"));
  De(n, r);
  function r() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(i, u) {
    n[i] = u;
  }
  function l(i) {
    delete n[i];
  }
  function c() {
    Object.keys(n).map((i) => l(i));
  }
  return { getStore: (i, u = null) => n.hasOwnProperty(i) ? n[i] : u, setStore: s, removeStore: l, clearStore: c };
}
async function yr(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function $r(t, e, n, r) {
  const { getStore: s, setStore: l } = t, c = A({}), d = A(s("locale", e)), i = (_, h = e) => {
    yr(_, r).then((m) => {
      c.value = m, l("locale", _), d.value = _, l("translations", m), Object.values(r).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + _ }), n.emit("vf-language-saved"));
    }).catch((m) => {
      h ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), i(h, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  De(d, (_) => {
    i(_);
  }), !s("locale") && !r.length ? i(e) : c.value = s("translations");
  const u = (_, ...h) => h.length ? u(_ = _.replace("%s", h.shift()), ...h) : _;
  function f(_, ...h) {
    return c.value && c.value.hasOwnProperty(_) ? u(c.value[_], ...h) : u(_, ...h);
  }
  return kt({ t: f, locale: d });
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
}, kr = Object.values(de), xr = "2.7.1";
function Ns(t, e, n, r, s) {
  return (e = Math, n = e.log, r = 1024, s = n(t) / n(r) | 0, t / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Us(t, e, n, r, s) {
  return (e = Math, n = e.log, r = 1e3, s = n(t) / n(r) | 0, t / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function Sr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const ot = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Cr(t, e) {
  const n = A(ot.SYSTEM), r = A(ot.LIGHT);
  n.value = t.getStore("theme", e ?? ot.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), l = (c) => {
    n.value === ot.DARK || n.value === ot.SYSTEM && c.matches ? r.value = ot.DARK : r.value = ot.LIGHT;
  };
  return l(s), s.addEventListener("change", l), {
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
    set(c) {
      n.value = c, c !== ot.SYSTEM ? t.setStore("theme", c) : t.removeStore("theme"), l(s);
    }
  };
}
function Er() {
  const t = or(null), e = A(!1), n = A();
  return { visible: e, type: t, data: n, open: (l, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = l, n.value = c;
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
const Oe = (t, e) => {
  const { o: n, i: r, u: s } = t;
  let l = n, c;
  const d = (f, _) => {
    const h = l, m = f, p = _ || (r ? !r(h, m) : h !== m);
    return (p || s) && (l = m, c = h), [l, p, c];
  };
  return [e ? (f) => d(e(l, c), f) : d, (f) => [l, !!f, c]];
}, Tr = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Ve = Tr ? window : {}, qs = Math.max, Mr = Math.min, Dn = Math.round, Zt = Math.abs, ms = Math.sign, Ps = Ve.cancelAnimationFrame, Yn = Ve.requestAnimationFrame, en = Ve.setTimeout, Vn = Ve.clearTimeout, cn = (t) => typeof Ve[t] < "u" ? Ve[t] : void 0, Ar = cn("MutationObserver"), hs = cn("IntersectionObserver"), tn = cn("ResizeObserver"), Yt = cn("ScrollTimeline"), Xn = (t) => t === void 0, dn = (t) => t === null, je = (t) => typeof t == "number", Ft = (t) => typeof t == "string", Qn = (t) => typeof t == "boolean", He = (t) => typeof t == "function", Ge = (t) => Array.isArray(t), nn = (t) => typeof t == "object" && !Ge(t) && !dn(t), Jn = (t) => {
  const e = !!t && t.length, n = je(e) && e > -1 && e % 1 == 0;
  return Ge(t) || !He(t) && n ? e > 0 && nn(t) ? e - 1 in t : !0 : !1;
}, sn = (t) => !!t && t.constructor === Object, on = (t) => t instanceof HTMLElement, un = (t) => t instanceof Element;
function le(t, e) {
  if (Jn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && le(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const zs = (t, e) => t.indexOf(e) >= 0, Vt = (t, e) => t.concat(e), me = (t, e, n) => (!Ft(e) && Jn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), lt = (t) => Array.from(t || []), Zn = (t) => Ge(t) ? t : !Ft(t) && Jn(t) ? lt(t) : [t], On = (t) => !!t && !t.length, Ln = (t) => lt(new Set(t)), Re = (t, e, n) => {
  le(t, (s) => s ? s.apply(void 0, e || []) : !0), !n && (t.length = 0);
}, js = "paddingTop", Gs = "paddingRight", Ks = "paddingLeft", Ws = "paddingBottom", Ys = "marginLeft", Xs = "marginRight", Qs = "marginBottom", Js = "overflowX", Zs = "overflowY", _n = "width", vn = "height", rt = "visible", ct = "hidden", wt = "scroll", Dr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, fn = (t, e, n, r) => {
  if (t && e) {
    let s = !0;
    return le(n, (l) => {
      const c = t[l], d = e[l];
      c !== d && (s = !1);
    }), s;
  }
  return !1;
}, eo = (t, e) => fn(t, e, ["w", "h"]), Xt = (t, e) => fn(t, e, ["x", "y"]), Vr = (t, e) => fn(t, e, ["t", "r", "b", "l"]), ut = () => {
}, X = (t, ...e) => t.bind(0, ...e), mt = (t) => {
  let e;
  const n = t ? en : Yn, r = t ? Vn : Ps;
  return [(s) => {
    r(e), e = n(() => s(), He(t) ? t() : t);
  }, () => r(e)];
}, Fn = (t, e) => {
  const { _: n, v: r, p: s, S: l } = e || {};
  let c, d, i, u, f = ut;
  const _ = function(k) {
    f(), Vn(c), u = c = d = void 0, f = ut, t.apply(this, k);
  }, h = (y) => l && d ? l(d, y) : y, m = () => {
    f !== ut && _(h(i) || i);
  }, p = function() {
    const k = lt(arguments), T = He(n) ? n() : n;
    if (je(T) && T >= 0) {
      const I = He(r) ? r() : r, S = je(I) && I >= 0, D = T > 0 ? en : Yn, O = T > 0 ? Vn : Ps, V = h(k) || k, x = _.bind(0, V);
      let w;
      f(), s && !u ? (x(), u = !0, w = D(() => u = void 0, T)) : (w = D(x, T), S && !c && (c = en(m, I))), f = () => O(w), d = i = V;
    } else
      _(k);
  };
  return p.m = m, p;
}, to = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Ne = (t) => t ? Object.keys(t) : [], oe = (t, e, n, r, s, l, c) => {
  const d = [e, n, r, s, l, c];
  return (typeof t != "object" || dn(t)) && !He(t) && (t = {}), le(d, (i) => {
    le(i, (u, f) => {
      const _ = i[f];
      if (t === _)
        return !0;
      const h = Ge(_);
      if (_ && sn(_)) {
        const m = t[f];
        let p = m;
        h && !Ge(m) ? p = [] : !h && !sn(m) && (p = {}), t[f] = oe(p, _);
      } else
        t[f] = h ? _.slice() : _;
    });
  }), t;
}, no = (t, e) => le(oe({}, t), (n, r, s) => {
  n === void 0 ? delete s[r] : n && sn(n) && (s[r] = no(n));
}), es = (t) => !Ne(t).length, so = (t, e, n) => qs(t, Mr(e, n)), _t = (t) => Ln((Ge(t) ? t : (t || "").split(" ")).filter((e) => e)), ts = (t, e) => t && t.getAttribute(e), ps = (t, e) => t && t.hasAttribute(e), Je = (t, e, n) => {
  le(_t(e), (r) => {
    t && t.setAttribute(r, String(n || ""));
  });
}, qe = (t, e) => {
  le(_t(e), (n) => t && t.removeAttribute(n));
}, mn = (t, e) => {
  const n = _t(ts(t, e)), r = X(Je, t, e), s = (l, c) => {
    const d = new Set(n);
    return le(_t(l), (i) => {
      d[c](i);
    }), lt(d).join(" ");
  };
  return {
    O: (l) => r(s(l, "delete")),
    $: (l) => r(s(l, "add")),
    C: (l) => {
      const c = _t(l);
      return c.reduce((d, i) => d && n.includes(i), c.length > 0);
    }
  };
}, oo = (t, e, n) => (mn(t, e).O(n), X(ns, t, e, n)), ns = (t, e, n) => (mn(t, e).$(n), X(oo, t, e, n)), rn = (t, e, n, r) => (r ? ns : oo)(t, e, n), ss = (t, e, n) => mn(t, e).C(n), ro = (t) => mn(t, "class"), ao = (t, e) => {
  ro(t).O(e);
}, os = (t, e) => (ro(t).$(e), X(ao, t, e)), lo = (t, e) => {
  const n = e ? un(e) && e : document;
  return n ? lt(n.querySelectorAll(t)) : [];
}, Or = (t, e) => {
  const n = e ? un(e) && e : document;
  return n && n.querySelector(t);
}, Rn = (t, e) => un(t) && t.matches(e), io = (t) => Rn(t, "body"), In = (t) => t ? lt(t.childNodes) : [], Ot = (t) => t && t.parentElement, ht = (t, e) => un(t) && t.closest(e), Hn = (t) => document.activeElement, Lr = (t, e, n) => {
  const r = ht(t, e), s = t && Or(n, r), l = ht(s, e) === r;
  return r && s ? r === t || s === t || l && ht(ht(t, n), e) !== r : !1;
}, yt = (t) => {
  le(Zn(t), (e) => {
    const n = Ot(e);
    e && n && n.removeChild(e);
  });
}, Le = (t, e) => X(yt, t && e && le(Zn(e), (n) => {
  n && t.appendChild(n);
})), pt = (t) => {
  const e = document.createElement("div");
  return Je(e, "class", t), e;
}, co = (t) => {
  const e = pt();
  return e.innerHTML = t.trim(), le(In(e), (n) => yt(n));
}, gs = (t, e) => t.getPropertyValue(e) || t[e] || "", uo = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Gt = (t) => uo(parseFloat(t || "")), Bn = (t) => Math.round(t * 1e4) / 1e4, _o = (t) => `${Bn(uo(t))}px`;
function Lt(t, e) {
  t && e && le(e, (n, r) => {
    try {
      const s = t.style, l = dn(n) || Qn(n) ? "" : je(n) ? _o(n) : n;
      r.indexOf("--") === 0 ? s.setProperty(r, l) : s[r] = l;
    } catch {
    }
  });
}
function tt(t, e, n) {
  const r = Ft(e);
  let s = r ? "" : {};
  if (t) {
    const l = Ve.getComputedStyle(t, n) || t.style;
    s = r ? gs(l, e) : lt(e).reduce((c, d) => (c[d] = gs(l, d), c), s);
  }
  return s;
}
const bs = (t, e, n) => {
  const r = e ? `${e}-` : "", s = n ? `-${n}` : "", l = `${r}top${s}`, c = `${r}right${s}`, d = `${r}bottom${s}`, i = `${r}left${s}`, u = tt(t, [l, c, d, i]);
  return {
    t: Gt(u[l]),
    r: Gt(u[c]),
    b: Gt(u[d]),
    l: Gt(u[i])
  };
}, Fr = (t, e) => `translate${nn(t) ? `(${t.x},${t.y})` : `Y(${t})`}`, Rr = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Ir = {
  w: 0,
  h: 0
}, hn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Ir, Hr = (t) => hn("inner", t || Ve), gt = X(hn, "offset"), vo = X(hn, "client"), an = X(hn, "scroll"), rs = (t) => {
  const e = parseFloat(tt(t, _n)) || 0, n = parseFloat(tt(t, vn)) || 0;
  return {
    w: e - Dn(e),
    h: n - Dn(n)
  };
}, Sn = (t) => t.getBoundingClientRect(), Br = (t) => !!t && Rr(t), Nn = (t) => !!(t && (t[vn] || t[_n])), fo = (t, e) => {
  const n = Nn(t);
  return !Nn(e) && n;
}, ws = (t, e, n, r) => {
  le(_t(e), (s) => {
    t && t.removeEventListener(s, n, r);
  });
}, _e = (t, e, n, r) => {
  var s;
  const l = (s = r && r.H) != null ? s : !0, c = r && r.I || !1, d = r && r.A || !1, i = {
    passive: l,
    capture: c
  };
  return X(Re, _t(e).map((u) => {
    const f = d ? (_) => {
      ws(t, u, f, c), n && n(_);
    } : n;
    return t && t.addEventListener(u, f, i), X(ws, t, u, f, c);
  }));
}, mo = (t) => t.stopPropagation(), Un = (t) => t.preventDefault(), ho = (t) => mo(t) || Un(t), ze = (t, e) => {
  const { x: n, y: r } = je(e) ? {
    x: e,
    y: e
  } : e || {};
  je(n) && (t.scrollLeft = n), je(r) && (t.scrollTop = r);
}, Fe = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), po = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), Nr = (t, e) => {
  const { D: n, M: r } = t, { w: s, h: l } = e, c = (_, h, m) => {
    let p = ms(_) * m, y = ms(h) * m;
    if (p === y) {
      const k = Zt(_), T = Zt(h);
      y = k > T ? 0 : y, p = k < T ? 0 : p;
    }
    return p = p === y ? 0 : p, [p + 0, y + 0];
  }, [d, i] = c(n.x, r.x, s), [u, f] = c(n.y, r.y, l);
  return {
    D: {
      x: d,
      y: u
    },
    M: {
      x: i,
      y: f
    }
  };
}, ys = ({ D: t, M: e }) => {
  const n = (r, s) => r === 0 && r <= s;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, $s = ({ D: t, M: e }, n) => {
  const r = (s, l, c) => so(0, 1, (s - c) / (s - l) || 0);
  return {
    x: r(t.x, e.x, n.x),
    y: r(t.y, e.y, n.y)
  };
}, qn = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, ks = (t, e) => {
  le(Zn(e), t);
}, Pn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (l, c) => {
    if (l) {
      const d = e.get(l);
      ks((i) => {
        d && d[i ? "delete" : "clear"](i);
      }, c);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, r = (l, c) => {
    if (Ft(l)) {
      const u = e.get(l) || /* @__PURE__ */ new Set();
      return e.set(l, u), ks((f) => {
        He(f) && u.add(f);
      }, c), X(n, l, c);
    }
    Qn(c) && c && n();
    const d = Ne(l), i = [];
    return le(d, (u) => {
      const f = l[u];
      f && me(i, r(u, f));
    }), X(Re, i);
  }, s = (l, c) => {
    le(lt(e.get(l)), (d) => {
      c && !On(c) ? d.apply(0, c) : d();
    });
  };
  return r(t || {}), [r, n, s];
}, xs = (t) => JSON.stringify(t, (e, n) => {
  if (He(n))
    throw 0;
  return n;
}), Ss = (t, e) => t ? `${e}`.split(".").reduce((n, r) => n && to(n, r) ? n[r] : void 0, t) : void 0, Ur = {
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
}, go = (t, e) => {
  const n = {}, r = Vt(Ne(e), Ne(t));
  return le(r, (s) => {
    const l = t[s], c = e[s];
    if (nn(l) && nn(c))
      oe(n[s] = {}, go(l, c)), es(n[s]) && delete n[s];
    else if (to(e, s) && c !== l) {
      let d = !0;
      if (Ge(l) || Ge(c))
        try {
          xs(l) === xs(c) && (d = !1);
        } catch {
        }
      d && (n[s] = c);
    }
  }), n;
}, Cs = (t, e, n) => (r) => [Ss(t, r), n || Ss(e, r) !== void 0], Ct = "data-overlayscrollbars", Qt = "os-environment", Kt = `${Qt}-scrollbar-hidden`, Cn = `${Ct}-initialize`, Jt = "noClipping", Es = `${Ct}-body`, at = Ct, qr = "host", Ze = `${Ct}-viewport`, Pr = Js, zr = Zs, jr = "arrange", bo = "measuring", Gr = "scrolling", wo = "scrollbarHidden", Kr = "noContent", zn = `${Ct}-padding`, Ts = `${Ct}-content`, as = "os-size-observer", Wr = `${as}-appear`, Yr = `${as}-listener`, Xr = "os-trinsic-observer", Qr = "os-theme-none", Ie = "os-scrollbar", Jr = `${Ie}-rtl`, Zr = `${Ie}-horizontal`, ea = `${Ie}-vertical`, yo = `${Ie}-track`, ls = `${Ie}-handle`, ta = `${Ie}-visible`, na = `${Ie}-cornerless`, Ms = `${Ie}-interaction`, As = `${Ie}-unusable`, jn = `${Ie}-auto-hide`, Ds = `${jn}-hidden`, Vs = `${Ie}-wheel`, sa = `${yo}-interactive`, oa = `${ls}-interactive`;
let $o;
const ra = () => $o, aa = (t) => {
  $o = t;
};
let En;
const la = () => {
  const t = (S, D, O) => {
    Le(document.body, S), Le(document.body, S);
    const z = vo(S), V = gt(S), x = rs(D);
    return O && yt(S), {
      x: V.h - z.h + x.h,
      y: V.w - z.w + x.w
    };
  }, e = (S) => {
    let D = !1;
    const O = os(S, Kt);
    try {
      D = tt(S, "scrollbar-width") === "none" || tt(S, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return O(), D;
  }, n = `.${Qt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Qt} div{width:200%;height:200%;margin:10px 0}.${Kt}{scrollbar-width:none!important}.${Kt}::-webkit-scrollbar,.${Kt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = co(`<div class="${Qt}"><div></div><style>${n}</style></div>`)[0], l = s.firstChild, c = s.lastChild, d = ra();
  d && (c.nonce = d);
  const [i, , u] = Pn(), [f, _] = Oe({
    o: t(s, l),
    i: Xt
  }, X(t, s, l, !0)), [h] = _(), m = e(s), p = {
    x: h.x === 0,
    y: h.y === 0
  }, y = {
    elements: {
      host: null,
      padding: !m,
      viewport: (S) => m && io(S) && S,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, k = oe({}, Ur), T = X(oe, {}, k), R = X(oe, {}, y), I = {
    T: h,
    k: p,
    R: m,
    V: !!Yt,
    L: X(i, "r"),
    U: R,
    P: (S) => oe(y, S) && R(),
    N: T,
    q: (S) => oe(k, S) && T(),
    B: oe({}, y),
    F: oe({}, k)
  };
  if (qe(s, "style"), yt(s), _e(Ve, "resize", () => {
    u("r", []);
  }), He(Ve.matchMedia) && !m && (!p.x || !p.y)) {
    const S = (D) => {
      const O = Ve.matchMedia(`(resolution: ${Ve.devicePixelRatio}dppx)`);
      _e(O, "change", () => {
        D(), S(D);
      }, {
        A: !0
      });
    };
    S(() => {
      const [D, O] = f();
      oe(I.T, D), u("r", [O]);
    });
  }
  return I;
}, We = () => (En || (En = la()), En), ko = (t, e) => He(e) ? e.apply(0, t) : e, ia = (t, e, n, r) => {
  const s = Xn(r) ? n : r;
  return ko(t, s) || e.apply(0, t);
}, xo = (t, e, n, r) => {
  const s = Xn(r) ? n : r, l = ko(t, s);
  return !!l && (on(l) ? l : e.apply(0, t));
}, ca = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: r } = e || {}, { k: s, R: l, U: c } = We(), { nativeScrollbarsOverlaid: d, body: i } = c().cancel, u = n ?? d, f = Xn(r) ? i : r, _ = (s.x || s.y) && u, h = t && (dn(f) ? !l : f);
  return !!_ || !!h;
}, is = /* @__PURE__ */ new WeakMap(), da = (t, e) => {
  is.set(t, e);
}, ua = (t) => {
  is.delete(t);
}, So = (t) => is.get(t), _a = (t, e, n) => {
  let r = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, l = () => {
    r = !0;
  }, c = (d) => {
    if (s && n) {
      const i = n.map((u) => {
        const [f, _] = u || [];
        return [_ && f ? (d || lo)(f, t) : [], _];
      });
      le(i, (u) => le(u[0], (f) => {
        const _ = u[1], h = s.get(f) || [];
        if (t.contains(f) && _) {
          const p = _e(f, _, (y) => {
            r ? (p(), s.delete(f)) : e(y);
          });
          s.set(f, me(h, p));
        } else
          Re(h), s.delete(f);
      }));
    }
  };
  return c(), [l, c];
}, Os = (t, e, n, r) => {
  let s = !1;
  const { j: l, X: c, Y: d, W: i, J: u, G: f } = r || {}, _ = Fn(() => s && n(!0), {
    _: 33,
    v: 99
  }), [h, m] = _a(t, _, d), p = l || [], y = c || [], k = Vt(p, y), T = (I, S) => {
    if (!On(S)) {
      const D = u || ut, O = f || ut, z = [], V = [];
      let x = !1, w = !1;
      if (le(S, (C) => {
        const { attributeName: E, target: H, type: $, oldValue: N, addedNodes: U, removedNodes: ee } = C, se = $ === "attributes", ne = $ === "childList", he = t === H, L = se && E, F = L && ts(H, E || ""), B = Ft(F) ? F : null, j = L && N !== B, M = zs(y, E) && j;
        if (e && (ne || !he)) {
          const K = se && j, G = K && i && Rn(H, i), te = (G ? !D(H, E, N, B) : !se || K) && !O(C, !!G, t, r);
          le(U, (ie) => me(z, ie)), le(ee, (ie) => me(z, ie)), w = w || te;
        }
        !e && he && j && !D(H, E, N, B) && (me(V, E), x = x || M);
      }), m((C) => Ln(z).reduce((E, H) => (me(E, lo(C, H)), Rn(H, C) ? me(E, H) : E), [])), e)
        return !I && w && n(!1), [!1];
      if (!On(V) || x) {
        const C = [Ln(V), x];
        return !I && n.apply(0, C), C;
      }
    }
  }, R = new Ar(X(T, !1));
  return [() => (R.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: k,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (h(), R.disconnect(), s = !1);
  }), () => {
    if (s)
      return _.m(), T(!0, R.takeRecords());
  }];
}, Co = {}, Eo = {}, va = (t) => {
  le(t, (e) => le(e, (n, r) => {
    Co[r] = e[r];
  }));
}, To = (t, e, n) => Ne(t).map((r) => {
  const { static: s, instance: l } = t[r], [c, d, i] = n || [], u = n ? l : s;
  if (u) {
    const f = n ? u(c, d, e) : u(e);
    return (i || Eo)[r] = f;
  }
}), Rt = (t) => Eo[t], fa = "__osOptionsValidationPlugin", ma = "__osSizeObserverPlugin", ha = (t, e) => {
  const { k: n } = e, [r, s] = t("showNativeOverlaidScrollbars");
  return [r && n.x && n.y, s];
}, $t = (t) => t.indexOf(rt) === 0, pa = (t, e) => {
  const n = (s, l, c, d) => {
    const i = s === rt ? ct : s.replace(`${rt}-`, ""), u = $t(s), f = $t(c);
    return !l && !d ? ct : u && f ? rt : u ? l && d ? i : l ? rt : ct : l ? i : f && d ? rt : ct;
  }, r = {
    x: n(e.x, t.x, e.y, t.y),
    y: n(e.y, t.y, e.x, t.x)
  };
  return {
    K: r,
    Z: {
      x: r.x === wt,
      y: r.y === wt
    }
  };
}, Mo = "__osScrollbarsHidingPlugin", ga = "__osClickScrollPlugin", Ao = (t, e, n) => {
  const { dt: r } = n || {}, s = Rt(ma), [l] = Oe({
    o: !1,
    u: !0
  });
  return () => {
    const c = [], i = co(`<div class="${as}"><div class="${Yr}"></div></div>`)[0], u = i.firstChild, f = (_) => {
      const h = _ instanceof ResizeObserverEntry;
      let m = !1, p = !1;
      if (h) {
        const [y, , k] = l(_.contentRect), T = Nn(y);
        p = fo(y, k), m = !p && !T;
      } else
        p = _ === !0;
      m || e({
        ft: !0,
        dt: p
      });
    };
    if (tn) {
      const _ = new tn((h) => f(h.pop()));
      _.observe(u), me(c, () => {
        _.disconnect();
      });
    } else if (s) {
      const [_, h] = s(u, f, r);
      me(c, Vt([os(i, Wr), _e(i, "animationstart", _)], h));
    } else
      return ut;
    return X(Re, me(c, Le(t, i)));
  };
}, ba = (t, e) => {
  let n;
  const r = (i) => i.h === 0 || i.isIntersecting || i.intersectionRatio > 0, s = pt(Xr), [l] = Oe({
    o: !1
  }), c = (i, u) => {
    if (i) {
      const f = l(r(i)), [, _] = f;
      return _ && !u && e(f) && [f];
    }
  }, d = (i, u) => c(u.pop(), i);
  return [() => {
    const i = [];
    if (hs)
      n = new hs(X(d, !1), {
        root: t
      }), n.observe(s), me(i, () => {
        n.disconnect();
      });
    else {
      const u = () => {
        const f = gt(s);
        c(f);
      };
      me(i, Ao(s, u)()), u();
    }
    return X(Re, me(i, Le(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, wa = (t, e, n, r) => {
  let s, l, c, d, i, u;
  const f = `[${at}]`, _ = `[${Ze}]`, h = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: m, ht: p, ot: y, gt: k, bt: T, nt: R, wt: I, yt: S, St: D, Ot: O } = t, z = (M) => tt(M, "direction") === "rtl", V = {
    $t: !1,
    ct: z(m)
  }, x = We(), w = Rt(Mo), [C] = Oe({
    i: eo,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const M = w && w.tt(t, e, V, x, n).ut, G = !(I && R) && ss(p, at, Jt), Y = !R && S(jr), te = Y && Fe(k), ie = te && O(), be = D(bo, G), ve = Y && M && M()[0], Se = an(y), J = rs(y);
    return ve && ve(), ze(k, te), ie && ie(), G && be(), {
      w: Se.w + J.w,
      h: Se.h + J.h
    };
  }), E = Fn(r, {
    _: () => s,
    v: () => l,
    S(M, K) {
      const [G] = M, [Y] = K;
      return [Vt(Ne(G), Ne(Y)).reduce((te, ie) => (te[ie] = G[ie] || Y[ie], te), {})];
    }
  }), H = (M) => {
    const K = z(m);
    oe(M, {
      Ct: u !== K
    }), oe(V, {
      ct: K
    }), u = K;
  }, $ = (M, K) => {
    const [G, Y] = M, te = {
      xt: Y
    };
    return oe(V, {
      $t: G
    }), !K && r(te), te;
  }, N = ({ ft: M, dt: K }) => {
    const Y = !(M && !K) && x.R ? E : r, te = {
      ft: M || K,
      dt: K
    };
    H(te), Y(te);
  }, U = (M, K) => {
    const [, G] = C(), Y = {
      Ht: G
    };
    return H(Y), G && !K && (M ? r : E)(Y), Y;
  }, ee = (M, K, G) => {
    const Y = {
      Et: K
    };
    return H(Y), K && !G && E(Y), Y;
  }, [se, ne] = T ? ba(p, $) : [], he = !R && Ao(p, N, {
    dt: !0
  }), [L, F] = Os(p, !1, ee, {
    X: h,
    j: h
  }), B = R && tn && new tn((M) => {
    const K = M[M.length - 1].contentRect;
    N({
      ft: !0,
      dt: fo(K, i)
    }), i = K;
  }), j = Fn(() => {
    const [, M] = C();
    r({
      Ht: M
    });
  }, {
    _: 222,
    p: !0
  });
  return [() => {
    B && B.observe(p);
    const M = he && he(), K = se && se(), G = L(), Y = x.L((te) => {
      te ? E({
        zt: te
      }) : j();
    });
    return () => {
      B && B.disconnect(), M && M(), K && K(), d && d(), G(), Y();
    };
  }, ({ It: M, At: K, Dt: G }) => {
    const Y = {}, [te] = M("update.ignoreMutation"), [ie, be] = M("update.attributes"), [ve, Se] = M("update.elementEvents"), [J, Ce] = M("update.debounce"), Me = Se || be, ye = K || G, Ee = (pe) => He(te) && te(pe);
    if (Me) {
      c && c(), d && d();
      const [pe, we] = Os(T || y, !0, U, {
        j: Vt(h, ie || []),
        Y: ve,
        W: f,
        G: (ce, fe) => {
          const { target: $e, attributeName: Ae } = ce;
          return (!fe && Ae && !R ? Lr($e, f, _) : !1) || !!ht($e, `.${Ie}`) || !!Ee(ce);
        }
      });
      d = pe(), c = we;
    }
    if (Ce)
      if (E.m(), Ge(J)) {
        const pe = J[0], we = J[1];
        s = je(pe) && pe, l = je(we) && we;
      } else je(J) ? (s = J, l = !1) : (s = !1, l = !1);
    if (ye) {
      const pe = F(), we = ne && ne(), ce = c && c();
      pe && oe(Y, ee(pe[0], pe[1], ye)), we && oe(Y, $(we[0], ye)), ce && oe(Y, U(ce[0], ye));
    }
    return H(Y), Y;
  }, V];
}, ya = (t, e, n, r) => {
  const s = "--os-viewport-percent", l = "--os-scroll-percent", c = "--os-scroll-direction", { U: d } = We(), { scrollbars: i } = d(), { slot: u } = i, { vt: f, ht: _, ot: h, Mt: m, gt: p, wt: y, nt: k } = e, { scrollbars: T } = m ? {} : t, { slot: R } = T || {}, I = [], S = [], D = [], O = xo([f, _, h], () => k && y ? f : _, u, R), z = (L) => {
    if (Yt) {
      const F = new Yt({
        source: p,
        axis: L
      });
      return {
        kt: (j) => {
          const M = j.Tt.animate({
            clear: ["left"],
            [l]: [0, 1]
          }, {
            timeline: F
          });
          return () => M.cancel();
        }
      };
    }
  }, V = {
    x: z("x"),
    y: z("y")
  }, x = () => {
    const { Rt: L, Vt: F } = n, B = (j, M) => so(0, 1, j / (j + M) || 0);
    return {
      x: B(F.x, L.x),
      y: B(F.y, L.y)
    };
  }, w = (L, F, B) => {
    const j = B ? os : ao;
    le(L, (M) => {
      j(M.Tt, F);
    });
  }, C = (L, F) => {
    le(L, (B) => {
      const [j, M] = F(B);
      Lt(j, M);
    });
  }, E = (L, F, B) => {
    const j = Qn(B), M = j ? B : !0, K = j ? !B : !0;
    M && w(S, L, F), K && w(D, L, F);
  }, H = () => {
    const L = x(), F = (B) => (j) => [j.Tt, {
      [s]: Bn(B) + ""
    }];
    C(S, F(L.x)), C(D, F(L.y));
  }, $ = () => {
    if (!Yt) {
      const { Lt: L } = n, F = $s(L, Fe(p)), B = (j) => (M) => [M.Tt, {
        [l]: Bn(j) + ""
      }];
      C(S, B(F.x)), C(D, B(F.y));
    }
  }, N = () => {
    const { Lt: L } = n, F = ys(L), B = (j) => (M) => [M.Tt, {
      [c]: j ? "0" : "1"
    }];
    C(S, B(F.x)), C(D, B(F.y));
  }, U = () => {
    if (k && !y) {
      const { Rt: L, Lt: F } = n, B = ys(F), j = $s(F, Fe(p)), M = (K) => {
        const { Tt: G } = K, Y = Ot(G) === h && G, te = (ie, be, ve) => {
          const Se = be * ie;
          return _o(ve ? Se : -Se);
        };
        return [Y, Y && {
          transform: Fr({
            x: te(j.x, L.x, B.x),
            y: te(j.y, L.y, B.y)
          })
        }];
      };
      C(S, M), C(D, M);
    }
  }, ee = (L) => {
    const F = L ? "x" : "y", j = pt(`${Ie} ${L ? Zr : ea}`), M = pt(yo), K = pt(ls), G = {
      Tt: j,
      Ut: M,
      Pt: K
    }, Y = V[F];
    return me(L ? S : D, G), me(I, [Le(j, M), Le(M, K), X(yt, j), Y && Y.kt(G), r(G, E, L)]), G;
  }, se = X(ee, !0), ne = X(ee, !1), he = () => (Le(O, S[0].Tt), Le(O, D[0].Tt), X(Re, I));
  return se(), ne(), [{
    Nt: H,
    qt: $,
    Bt: N,
    Ft: U,
    jt: E,
    Xt: {
      Yt: S,
      Wt: se,
      Jt: X(C, S)
    },
    Gt: {
      Yt: D,
      Wt: ne,
      Jt: X(C, D)
    }
  }, he];
}, $a = (t, e, n, r) => (s, l, c) => {
  const { ht: d, ot: i, nt: u, gt: f, Kt: _, Ot: h } = e, { Tt: m, Ut: p, Pt: y } = s, [k, T] = mt(333), [R, I] = mt(444), S = (z) => {
    He(f.scrollBy) && f.scrollBy({
      behavior: "smooth",
      left: z.x,
      top: z.y
    });
  }, D = () => {
    const z = "pointerup pointercancel lostpointercapture", V = `client${c ? "X" : "Y"}`, x = c ? _n : vn, w = c ? "left" : "top", C = c ? "w" : "h", E = c ? "x" : "y", H = (N, U) => (ee) => {
      const { Rt: se } = n, ne = gt(p)[C] - gt(y)[C], L = U * ee / ne * se[E];
      ze(f, {
        [E]: N + L
      });
    }, $ = [];
    return _e(p, "pointerdown", (N) => {
      const U = ht(N.target, `.${ls}`) === y, ee = U ? y : p, se = t.scrollbars, ne = se[U ? "dragScroll" : "clickScroll"], { button: he, isPrimary: L, pointerType: F } = N, { pointers: B } = se;
      if (he === 0 && L && ne && (B || []).includes(F)) {
        Re($), I();
        const M = !U && (N.shiftKey || ne === "instant"), K = X(Sn, y), G = X(Sn, p), Y = (fe, $e) => (fe || K())[w] - ($e || G())[w], te = Dn(Sn(f)[x]) / gt(f)[C] || 1, ie = H(Fe(f)[E], 1 / te), be = N[V], ve = K(), Se = G(), J = ve[x], Ce = Y(ve, Se) + J / 2, Me = be - Se[w], ye = U ? 0 : Me - Ce, Ee = (fe) => {
          Re(ce), ee.releasePointerCapture(fe.pointerId);
        }, pe = U || M, we = h(), ce = [_e(_, z, Ee), _e(_, "selectstart", (fe) => Un(fe), {
          H: !1
        }), _e(p, z, Ee), pe && _e(p, "pointermove", (fe) => ie(ye + (fe[V] - be))), pe && (() => {
          const fe = Fe(f);
          we();
          const $e = Fe(f), Ae = {
            x: $e.x - fe.x,
            y: $e.y - fe.y
          };
          (Zt(Ae.x) > 3 || Zt(Ae.y) > 3) && (h(), ze(f, fe), S(Ae), R(we));
        })];
        if (ee.setPointerCapture(N.pointerId), M)
          ie(ye);
        else if (!U) {
          const fe = Rt(ga);
          if (fe) {
            const $e = fe(ie, ye, J, (Ae) => {
              Ae ? we() : me(ce, we);
            });
            me(ce, $e), me($, X($e, !0));
          }
        }
      }
    });
  };
  let O = !0;
  return X(Re, [_e(y, "pointermove pointerleave", r), _e(m, "pointerenter", () => {
    l(Ms, !0);
  }), _e(m, "pointerleave pointercancel", () => {
    l(Ms, !1);
  }), !u && _e(m, "mousedown", () => {
    const z = Hn();
    (ps(z, Ze) || ps(z, at) || z === document.body) && en(X(qn, i), 25);
  }), _e(m, "wheel", (z) => {
    const { deltaX: V, deltaY: x, deltaMode: w } = z;
    O && w === 0 && Ot(m) === d && S({
      x: V,
      y: x
    }), O = !1, l(Vs, !0), k(() => {
      O = !0, l(Vs);
    }), Un(z);
  }, {
    H: !1,
    I: !0
  }), _e(m, "pointerdown", X(_e, _, "click", ho, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), D(), T, I]);
}, ka = (t, e, n, r, s, l) => {
  let c, d, i, u, f, _ = ut, h = 0;
  const m = (L) => L.pointerType === "mouse", [p, y] = mt(), [k, T] = mt(100), [R, I] = mt(100), [S, D] = mt(() => h), [O, z] = ya(t, s, r, $a(e, s, r, (L) => m(L) && ee())), { ht: V, Qt: x, wt: w } = s, { jt: C, Nt: E, qt: H, Bt: $, Ft: N } = O, U = (L, F) => {
    if (D(), L)
      C(Ds);
    else {
      const B = X(C, Ds, !0);
      h > 0 && !F ? S(B) : B();
    }
  }, ee = () => {
    (i ? !c : !u) && (U(!0), k(() => {
      U(!1);
    }));
  }, se = (L) => {
    C(jn, L, !0), C(jn, L, !1);
  }, ne = (L) => {
    m(L) && (c = i, i && U(!0));
  }, he = [D, T, I, y, () => _(), _e(V, "pointerover", ne, {
    A: !0
  }), _e(V, "pointerenter", ne), _e(V, "pointerleave", (L) => {
    m(L) && (c = !1, i && U(!1));
  }), _e(V, "pointermove", (L) => {
    m(L) && d && ee();
  }), _e(x, "scroll", (L) => {
    p(() => {
      H(), ee();
    }), l(L), N();
  })];
  return [() => X(Re, me(he, z())), ({ It: L, Dt: F, Zt: B, tn: j }) => {
    const { nn: M, sn: K, en: G, cn: Y } = j || {}, { Ct: te, dt: ie } = B || {}, { ct: be } = n, { k: ve } = We(), { K: Se, rn: J } = r, [Ce, Me] = L("showNativeOverlaidScrollbars"), [ye, Ee] = L("scrollbars.theme"), [pe, we] = L("scrollbars.visibility"), [ce, fe] = L("scrollbars.autoHide"), [$e, Ae] = L("scrollbars.autoHideSuspend"), [Et] = L("scrollbars.autoHideDelay"), [It, Ht] = L("scrollbars.dragScroll"), [Bt, it] = L("scrollbars.clickScroll"), [vt, gn] = L("overflow"), bn = ie && !F, wn = J.x || J.y, yn = M || K || Y || te || F, Ue = G || we || gn, $n = Ce && ve.x && ve.y, Tt = (Mt, st, Nt) => {
      const At = Mt.includes(wt) && (pe === rt || pe === "auto" && st === wt);
      return C(ta, At, Nt), At;
    };
    if (h = Et, bn && ($e && wn ? (se(!1), _(), R(() => {
      _ = _e(x, "scroll", X(se, !0), {
        A: !0
      });
    })) : se(!0)), Me && C(Qr, $n), Ee && (C(f), C(ye, !0), f = ye), Ae && !$e && se(!0), fe && (d = ce === "move", i = ce === "leave", u = ce === "never", U(u, !0)), Ht && C(oa, It), it && C(sa, !!Bt), Ue) {
      const Mt = Tt(vt.x, Se.x, !0), st = Tt(vt.y, Se.y, !1);
      C(na, !(Mt && st));
    }
    yn && (H(), E(), N(), Y && $(), C(As, !J.x, !0), C(As, !J.y, !1), C(Jr, be && !w));
  }, {}, O];
}, xa = (t) => {
  const e = We(), { U: n, R: r } = e, { elements: s } = n(), { padding: l, viewport: c, content: d } = s, i = on(t), u = i ? {} : t, { elements: f } = u, { padding: _, viewport: h, content: m } = f || {}, p = i ? t : u.target, y = io(p), k = p.ownerDocument, T = k.documentElement, R = () => k.defaultView || Ve, I = X(ia, [p]), S = X(xo, [p]), D = X(pt, ""), O = X(I, D, c), z = X(S, D, d), V = (J) => {
    const Ce = gt(J), Me = an(J), ye = tt(J, Js), Ee = tt(J, Zs);
    return Me.w - Ce.w > 0 && !$t(ye) || Me.h - Ce.h > 0 && !$t(Ee);
  }, x = O(h), w = x === p, C = w && y, E = !w && z(m), H = !w && x === E, $ = C ? T : x, N = C ? $ : p, U = !w && S(D, l, _), ee = !H && E, se = [ee, $, U, N].map((J) => on(J) && !Ot(J) && J), ne = (J) => J && zs(se, J), he = !ne($) && V($) ? $ : p, L = C ? T : $, B = {
    vt: p,
    ht: N,
    ot: $,
    ln: U,
    bt: ee,
    gt: L,
    Qt: C ? k : $,
    an: y ? T : he,
    Kt: k,
    wt: y,
    Mt: i,
    nt: w,
    un: R,
    yt: (J) => ss($, Ze, J),
    St: (J, Ce) => rn($, Ze, J, Ce),
    Ot: () => rn(L, Ze, Gr, !0)
  }, { vt: j, ht: M, ln: K, ot: G, bt: Y } = B, te = [() => {
    qe(M, [at, Cn]), qe(j, Cn), y && qe(T, [Cn, at]);
  }];
  let ie = In([Y, G, K, M, j].find((J) => J && !ne(J)));
  const be = C ? j : Y || G, ve = X(Re, te);
  return [B, () => {
    const J = R(), Ce = Hn(), Me = (ce) => {
      Le(Ot(ce), In(ce)), yt(ce);
    }, ye = (ce) => _e(ce, "focusin focusout focus blur", ho, {
      I: !0,
      H: !1
    }), Ee = "tabindex", pe = ts(G, Ee), we = ye(Ce);
    return Je(M, at, w ? "" : qr), Je(K, zn, ""), Je(G, Ze, ""), Je(Y, Ts, ""), w || (Je(G, Ee, pe || "-1"), y && Je(T, Es, "")), Le(be, ie), Le(M, K), Le(K || M, !w && G), Le(G, Y), me(te, [we, () => {
      const ce = Hn(), fe = ne(G), $e = fe && ce === G ? j : ce, Ae = ye($e);
      qe(K, zn), qe(Y, Ts), qe(G, Ze), y && qe(T, Es), pe ? Je(G, Ee, pe) : qe(G, Ee), ne(Y) && Me(Y), fe && Me(G), ne(K) && Me(K), qn($e), Ae();
    }]), r && !w && (ns(G, Ze, wo), me(te, X(qe, G, Ze))), qn(!w && y && Ce === j && J.top === J ? G : Ce), we(), ie = 0, ve;
  }, ve];
}, Sa = ({ bt: t }) => ({ Zt: e, _n: n, Dt: r }) => {
  const { xt: s } = e || {}, { $t: l } = n;
  t && (s || r) && Lt(t, {
    [vn]: l && "100%"
  });
}, Ca = ({ ht: t, ln: e, ot: n, nt: r }, s) => {
  const [l, c] = Oe({
    i: Vr,
    o: bs()
  }, X(bs, t, "padding", ""));
  return ({ It: d, Zt: i, _n: u, Dt: f }) => {
    let [_, h] = c(f);
    const { R: m } = We(), { ft: p, Ht: y, Ct: k } = i || {}, { ct: T } = u, [R, I] = d("paddingAbsolute");
    (p || h || (f || y)) && ([_, h] = l(f));
    const D = !r && (I || k || h);
    if (D) {
      const O = !R || !e && !m, z = _.r + _.l, V = _.t + _.b, x = {
        [Xs]: O && !T ? -z : 0,
        [Qs]: O ? -V : 0,
        [Ys]: O && T ? -z : 0,
        top: O ? -_.t : 0,
        right: O ? T ? -_.r : "auto" : 0,
        left: O ? T ? "auto" : -_.l : 0,
        [_n]: O && `calc(100% + ${z}px)`
      }, w = {
        [js]: O ? _.t : 0,
        [Gs]: O ? _.r : 0,
        [Ws]: O ? _.b : 0,
        [Ks]: O ? _.l : 0
      };
      Lt(e || n, x), Lt(n, w), oe(s, {
        ln: _,
        dn: !O,
        rt: e ? w : oe({}, x, w)
      });
    }
    return {
      fn: D
    };
  };
}, Ea = (t, e) => {
  const n = We(), { ht: r, ln: s, ot: l, nt: c, Qt: d, gt: i, wt: u, St: f, un: _ } = t, { R: h } = n, m = u && c, p = X(qs, 0), y = {
    display: () => !1,
    direction: (F) => F !== "ltr",
    flexDirection: (F) => F.endsWith("-reverse"),
    writingMode: (F) => F !== "horizontal-tb"
  }, k = Ne(y), T = {
    i: eo,
    o: {
      w: 0,
      h: 0
    }
  }, R = {
    i: Xt,
    o: {}
  }, I = (F) => {
    f(bo, !m && F);
  }, S = (F) => {
    if (!k.some((be) => {
      const ve = F[be];
      return ve && y[be](ve);
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
    I(!0);
    const j = Fe(i), M = f(Kr, !0), K = _e(d, wt, (be) => {
      const ve = Fe(i);
      be.isTrusted && ve.x === j.x && ve.y === j.y && mo(be);
    }, {
      I: !0,
      A: !0
    });
    ze(i, {
      x: 0,
      y: 0
    }), M();
    const G = Fe(i), Y = an(i);
    ze(i, {
      x: Y.w,
      y: Y.h
    });
    const te = Fe(i);
    ze(i, {
      x: te.x - G.x < 1 && -Y.w,
      y: te.y - G.y < 1 && -Y.h
    });
    const ie = Fe(i);
    return ze(i, j), Yn(() => K()), {
      D: G,
      M: ie
    };
  }, D = (F, B) => {
    const j = Ve.devicePixelRatio % 1 !== 0 ? 1 : 0, M = {
      w: p(F.w - B.w),
      h: p(F.h - B.h)
    };
    return {
      w: M.w > j ? M.w : 0,
      h: M.h > j ? M.h : 0
    };
  }, [O, z] = Oe(T, X(rs, l)), [V, x] = Oe(T, X(an, l)), [w, C] = Oe(T), [E] = Oe(R), [H, $] = Oe(T), [N] = Oe(R), [U] = Oe({
    i: (F, B) => fn(F, B, k),
    o: {}
  }, () => Br(l) ? tt(l, k) : {}), [ee, se] = Oe({
    i: (F, B) => Xt(F.D, B.D) && Xt(F.M, B.M),
    o: po()
  }), ne = Rt(Mo), he = (F, B) => `${B ? Pr : zr}${Dr(F)}`, L = (F) => {
    const B = (M) => [rt, ct, wt].map((K) => he(K, M)), j = B(!0).concat(B()).join(" ");
    f(j), f(Ne(F).map((M) => he(F[M], M === "x")).join(" "), !0);
  };
  return ({ It: F, Zt: B, _n: j, Dt: M }, { fn: K }) => {
    const { ft: G, Ht: Y, Ct: te, dt: ie, zt: be } = B || {}, ve = ne && ne.tt(t, e, j, n, F), { it: Se, ut: J, _t: Ce } = ve || {}, [Me, ye] = ha(F, n), [Ee, pe] = F("overflow"), we = $t(Ee.x), ce = $t(Ee.y), fe = !0;
    let $e = z(M), Ae = x(M), Et = C(M), It = $(M);
    ye && h && f(wo, !Me);
    {
      ss(r, at, Jt) && I(!0);
      const [vs] = J ? J() : [], [Ut] = $e = O(M), [qt] = Ae = V(M), Pt = vo(l), zt = m && Hr(_()), tr = {
        w: p(qt.w + Ut.w),
        h: p(qt.h + Ut.h)
      }, fs = {
        w: p((zt ? zt.w : Pt.w + p(Pt.w - qt.w)) + Ut.w),
        h: p((zt ? zt.h : Pt.h + p(Pt.h - qt.h)) + Ut.h)
      };
      vs && vs(), It = H(fs), Et = w(D(tr, fs), M);
    }
    const [Ht, Bt] = It, [it, vt] = Et, [gn, bn] = Ae, [wn, yn] = $e, [Ue, $n] = E({
      x: it.w > 0,
      y: it.h > 0
    }), Tt = we && ce && (Ue.x || Ue.y) || we && Ue.x && !Ue.y || ce && Ue.y && !Ue.x, Mt = K || te || be || yn || bn || Bt || vt || pe || ye || fe, st = pa(Ue, Ee), [Nt, At] = N(st.K), [Qo, Jo] = U(M), _s = te || ie || Jo || $n || M, [Zo, er] = _s ? ee(S(Qo), M) : se();
    return Mt && (At && L(st.K), Ce && Se && Lt(l, Ce(st, j, Se(st, gn, wn)))), I(!1), rn(r, at, Jt, Tt), rn(s, zn, Jt, Tt), oe(e, {
      K: Nt,
      Vt: {
        x: Ht.w,
        y: Ht.h
      },
      Rt: {
        x: it.w,
        y: it.h
      },
      rn: Ue,
      Lt: Nr(Zo, it)
    }), {
      en: At,
      nn: Bt,
      sn: vt,
      cn: er || vt,
      vn: _s
    };
  };
}, Ta = (t) => {
  const [e, n, r] = xa(t), s = {
    ln: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    dn: !1,
    rt: {
      [Xs]: 0,
      [Qs]: 0,
      [Ys]: 0,
      [js]: 0,
      [Gs]: 0,
      [Ws]: 0,
      [Ks]: 0
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
      x: ct,
      y: ct
    },
    rn: {
      x: !1,
      y: !1
    },
    Lt: po()
  }, { vt: l, gt: c, nt: d, Ot: i } = e, { R: u, k: f } = We(), _ = !u && (f.x || f.y), h = [Sa(e), Ca(e, s), Ea(e, s)];
  return [n, (m) => {
    const p = {}, k = _ && Fe(c), T = k && i();
    return le(h, (R) => {
      oe(p, R(m, p) || {});
    }), ze(c, k), T && T(), !d && ze(l, 0), p;
  }, s, e, r];
}, Ma = (t, e, n, r, s) => {
  let l = !1;
  const c = Cs(e, {}), [d, i, u, f, _] = Ta(t), [h, m, p] = wa(f, u, c, (S) => {
    I({}, S);
  }), [y, k, , T] = ka(t, e, p, u, f, s), R = (S) => Ne(S).some((D) => !!S[D]), I = (S, D) => {
    if (n())
      return !1;
    const { pn: O, Dt: z, At: V, hn: x } = S, w = O || {}, C = !!z || !l, E = {
      It: Cs(e, w, C),
      pn: w,
      Dt: C
    };
    if (x)
      return k(E), !1;
    const H = D || m(oe({}, E, {
      At: V
    })), $ = i(oe({}, E, {
      _n: p,
      Zt: H
    }));
    k(oe({}, E, {
      Zt: H,
      tn: $
    }));
    const N = R(H), U = R($), ee = N || U || !es(w) || C;
    return l = !0, ee && r(S, {
      Zt: H,
      tn: $
    }), ee;
  };
  return [() => {
    const { an: S, gt: D, Ot: O } = f, z = Fe(S), V = [h(), d(), y()], x = O();
    return ze(D, z), x(), X(Re, V);
  }, I, () => ({
    gn: p,
    bn: u
  }), {
    wn: f,
    yn: T
  }, _];
}, Ke = (t, e, n) => {
  const { N: r } = We(), s = on(t), l = s ? t : t.target, c = So(l);
  if (e && !c) {
    let d = !1;
    const i = [], u = {}, f = (w) => {
      const C = no(w), E = Rt(fa);
      return E ? E(C, !0) : C;
    }, _ = oe({}, r(), f(e)), [h, m, p] = Pn(), [y, k, T] = Pn(n), R = (w, C) => {
      T(w, C), p(w, C);
    }, [I, S, D, O, z] = Ma(t, _, () => d, ({ pn: w, Dt: C }, { Zt: E, tn: H }) => {
      const { ft: $, Ct: N, xt: U, Ht: ee, Et: se, dt: ne } = E, { nn: he, sn: L, en: F, cn: B } = H;
      R("updated", [x, {
        updateHints: {
          sizeChanged: !!$,
          directionChanged: !!N,
          heightIntrinsicChanged: !!U,
          overflowEdgeChanged: !!he,
          overflowAmountChanged: !!L,
          overflowStyleChanged: !!F,
          scrollCoordinatesChanged: !!B,
          contentMutation: !!ee,
          hostMutation: !!se,
          appear: !!ne
        },
        changedOptions: w || {},
        force: !!C
      }]);
    }, (w) => R("scroll", [x, w])), V = (w) => {
      ua(l), Re(i), d = !0, R("destroyed", [x, w]), m(), k();
    }, x = {
      options(w, C) {
        if (w) {
          const E = C ? r() : {}, H = go(_, oe(E, f(w)));
          es(H) || (oe(_, H), S({
            pn: H
          }));
        }
        return oe({}, _);
      },
      on: y,
      off: (w, C) => {
        w && C && k(w, C);
      },
      state() {
        const { gn: w, bn: C } = D(), { ct: E } = w, { Vt: H, Rt: $, K: N, rn: U, ln: ee, dn: se, Lt: ne } = C;
        return oe({}, {
          overflowEdge: H,
          overflowAmount: $,
          overflowStyle: N,
          hasOverflow: U,
          scrollCoordinates: {
            start: ne.D,
            end: ne.M
          },
          padding: ee,
          paddingAbsolute: se,
          directionRTL: E,
          destroyed: d
        });
      },
      elements() {
        const { vt: w, ht: C, ln: E, ot: H, bt: $, gt: N, Qt: U } = O.wn, { Xt: ee, Gt: se } = O.yn, ne = (L) => {
          const { Pt: F, Ut: B, Tt: j } = L;
          return {
            scrollbar: j,
            track: B,
            handle: F
          };
        }, he = (L) => {
          const { Yt: F, Wt: B } = L, j = ne(F[0]);
          return oe({}, j, {
            clone: () => {
              const M = ne(B());
              return S({
                hn: !0
              }), M;
            }
          });
        };
        return oe({}, {
          target: w,
          host: C,
          padding: E || H,
          viewport: H,
          content: $ || H,
          scrollOffsetElement: N,
          scrollEventElement: U,
          scrollbarHorizontal: he(ee),
          scrollbarVertical: he(se)
        });
      },
      update: (w) => S({
        Dt: w,
        At: !0
      }),
      destroy: X(V, !1),
      plugin: (w) => u[Ne(w)[0]]
    };
    return me(i, [z]), da(l, x), To(Co, Ke, [x, h, u]), ca(O.wn.wt, !s && t.cancel) ? (V(!0), x) : (me(i, I()), R("initialized", [x]), x.update(), x);
  }
  return c;
};
Ke.plugin = (t) => {
  const e = Ge(t), n = e ? t : [t], r = n.map((s) => To(s, Ke)[0]);
  return va(n), e ? r : r[0];
};
Ke.valid = (t) => {
  const e = t && t.elements, n = He(e) && e();
  return sn(n) && !!So(n.target);
};
Ke.env = () => {
  const { T: t, k: e, R: n, V: r, B: s, F: l, U: c, P: d, N: i, q: u } = We();
  return oe({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: r,
    staticDefaultInitialization: s,
    staticDefaultOptions: l,
    getDefaultInitialization: c,
    setDefaultInitialization: d,
    getDefaultOptions: i,
    setDefaultOptions: u
  });
};
Ke.nonce = aa;
function Aa() {
  let t;
  const e = A(null), n = Math.floor(Math.random() * 2 ** 32), r = A(!1), s = A([]), l = () => s.value, c = () => t.getSelection(), d = () => s.value.length, i = () => t.clearSelection(!0), u = A(), f = A(null), _ = A(null), h = A(null), m = A(null);
  function p() {
    t = new vr({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: D, event: O, isDragging: z }) => {
      if (z)
        t.Interaction._reset(O);
      else {
        r.value = !1;
        const V = e.value.offsetWidth - O.offsetX, x = e.value.offsetHeight - O.offsetY;
        V < 15 && x < 15 && t.Interaction._reset(O), O.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(O);
      }
    }), document.addEventListener("dragleave", (D) => {
      !D.buttons && r.value && (r.value = !1);
    });
  }
  const y = () => dt(() => {
    t.addSelection(
      t.getSelectables()
    ), k();
  }), k = () => {
    s.value = t.getSelection().map((D) => JSON.parse(D.dataset.item)), u.value(s.value);
  }, T = () => dt(() => {
    const D = l().map((O) => O.path);
    i(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((O) => D.includes(JSON.parse(O.dataset.item).path))
    ), k(), I();
  }), R = (D) => {
    u.value = D, t.subscribe("DS:end", ({ items: O, event: z, isDragging: V }) => {
      s.value = O.map((x) => JSON.parse(x.dataset.item)), D(O.map((x) => JSON.parse(x.dataset.item)));
    });
  }, I = () => {
    f.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (_.value.style.height = e.value.scrollHeight + "px", _.value.style.display = "block") : (_.value.style.height = "100%", _.value.style.display = "none"));
  }, S = (D) => {
    if (!f.value)
      return;
    const { scrollOffsetElement: O } = f.value.elements();
    O.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return xe(() => {
    Ke(h.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: Ke
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (D) => {
        f.value = D;
      },
      scroll: (D, O) => {
        const { scrollOffsetElement: z } = D.elements();
        e.value.scrollTo({
          top: z.scrollTop,
          left: 0
        });
      }
    }), p(), I(), m.value = new ResizeObserver(I), m.value.observe(e.value), e.value.addEventListener("scroll", S), t.subscribe("DS:scroll", ({ isDragging: D }) => D || S());
  }), Wn(() => {
    t && t.stop(), m.value && m.value.disconnect();
  }), Rs(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: r,
    scrollBar: _,
    scrollBarContainer: h,
    getSelected: l,
    getSelection: c,
    selectAll: y,
    clearSelection: i,
    refreshSelection: T,
    getCount: d,
    onSelect: R
  };
}
function Da(t, e) {
  const n = A(t), r = A(e), s = A([]), l = A([]), c = A([]), d = A(!1), i = A(5);
  let u = !1, f = !1;
  const _ = kt({
    adapter: n,
    storages: [],
    dirname: r,
    files: []
  });
  function h() {
    let R = [], I = [], S = r.value ?? n.value + "://";
    S.length === 0 && (s.value = []), S.replace(n.value + "://", "").split("/").forEach(function(z) {
      R.push(z), R.join("/") !== "" && I.push({
        basename: z,
        name: z,
        path: n.value + "://" + R.join("/"),
        type: "dir"
      });
    }), l.value = I;
    const [D, O] = p(I, i.value);
    c.value = O, s.value = D;
  }
  function m(R) {
    i.value = R, h();
  }
  function p(R, I) {
    return R.length > I ? [R.slice(-I), R.slice(0, -I)] : [R, []];
  }
  function y(R = null) {
    d.value = R ?? !d.value;
  }
  function k() {
    return s.value && s.value.length && !f;
  }
  const T = bt(() => {
    var R;
    return ((R = s.value[s.value.length - 2]) == null ? void 0 : R.path) ?? n.value + "://";
  });
  return xe(() => {
  }), De(r, h), xe(h), {
    adapter: n,
    path: r,
    loading: u,
    searchMode: f,
    data: _,
    breadcrumbs: s,
    breadcrumbItems: l,
    limitBreadcrumbItems: m,
    hiddenBreadcrumbs: c,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: y,
    isGoUpAvailable: k,
    parentFolderPath: T
  };
}
const Va = (t, e) => {
  const n = wr(t.id), r = _r(), s = n.getStore("metricUnits", !1), l = Cr(n, t.theme), c = e.i18n, d = t.locale ?? e.locale, i = (m) => Array.isArray(m) ? m : kr, u = n.getStore("persist-path", t.persist), f = u ? n.getStore("path", t.path) : t.path, _ = u ? n.getStore("adapter") : null, h = Aa();
  return kt({
    /** 
    * Core properties
    * */
    // app version
    version: xr,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: r,
    // storage
    storage: n,
    // localization object
    i18n: $r(n, d, r, c),
    // modal state
    modal: Er(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: bt(() => h),
    // http object
    requester: br(t.request),
    // active features
    features: i(t.features),
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
    theme: l,
    // unit state - for example: GB or GiB
    metricUnits: s,
    // human readable file sizes
    filesize: s ? Us : Ns,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: u,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // type of progress indicator
    loadingIndicator: t.loadingIndicator,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems,
    // file system
    fs: Da(_, f)
  });
}, Oa = /* @__PURE__ */ a("div", { class: "vuefinder__modal-layout__overlay" }, null, -1), La = { class: "vuefinder__modal-layout__container" }, Fa = { class: "vuefinder__modal-layout__content" }, Ra = { class: "vuefinder__modal-layout__footer" }, Ye = {
  __name: "ModalLayout",
  setup(t) {
    const e = A(null), n = re("ServiceContainer");
    return xe(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), dt(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const s = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (r, s) => (v(), g("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = xt((l) => o(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      Oa,
      a("div", La, [
        a("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = et((l) => o(n).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            a("div", Fa, [
              Dt(r.$slots, "default")
            ]),
            a("div", Ra, [
              Dt(r.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Ia = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, s] of e)
    n[r] = s;
  return n;
}, Ha = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const r = re("ServiceContainer"), s = A(!1), { t: l } = r.i18n;
    let c = null;
    const d = () => {
      clearTimeout(c), s.value = !0, c = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return xe(() => {
      r.emitter.on(t.on, d);
    }), Wn(() => {
      clearTimeout(c);
    }), {
      shown: s,
      t: l
    };
  }
}, Ba = { key: 1 };
function Na(t, e, n, r, s, l) {
  return v(), g("div", {
    class: ae(["vuefinder__action-message", { "vuefinder__action-message--hidden": !r.shown }])
  }, [
    t.$slots.default ? Dt(t.$slots, "default", { key: 0 }) : (v(), g("span", Ba, b(r.t("Saved.")), 1))
  ], 2);
}
const ft = /* @__PURE__ */ Ia(Ha, [["render", Na]]), Ua = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, qa = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
}, null, -1), Pa = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
}, null, -1), za = [
  qa,
  Pa
];
function ja(t, e) {
  return v(), g("svg", Ua, [...za]);
}
const Ga = { render: ja }, Ka = { class: "vuefinder__modal-header" }, Wa = { class: "vuefinder__modal-header__icon-container" }, Ya = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, nt = {
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
    return (e, n) => (v(), g("div", Ka, [
      a("div", Wa, [
        (v(), W(Is(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      a("h3", Ya, b(t.title), 1)
    ]));
  }
}, Xa = { class: "vuefinder__about-modal__content" }, Qa = { class: "vuefinder__about-modal__main" }, Ja = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Za = ["onClick", "aria-current"], el = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, tl = { class: "vuefinder__about-modal__description" }, nl = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, sl = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, ol = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, rl = { class: "vuefinder__about-modal__description" }, al = { class: "vuefinder__about-modal__settings" }, ll = { class: "vuefinder__about-modal__setting flex" }, il = { class: "vuefinder__about-modal__setting-input" }, cl = { class: "vuefinder__about-modal__setting-label" }, dl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, ul = { class: "vuefinder__about-modal__setting flex" }, _l = { class: "vuefinder__about-modal__setting-input" }, vl = { class: "vuefinder__about-modal__setting-label" }, fl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, ml = { class: "vuefinder__about-modal__setting flex" }, hl = { class: "vuefinder__about-modal__setting-input" }, pl = { class: "vuefinder__about-modal__setting-label" }, gl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, bl = { class: "vuefinder__about-modal__setting flex" }, wl = { class: "vuefinder__about-modal__setting-input" }, yl = { class: "vuefinder__about-modal__setting-label" }, $l = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, kl = { class: "vuefinder__about-modal__setting" }, xl = { class: "vuefinder__about-modal__setting-input" }, Sl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, Cl = { class: "vuefinder__about-modal__setting-label" }, El = ["label"], Tl = ["value"], Ml = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Al = { class: "vuefinder__about-modal__setting-input" }, Dl = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Vl = { class: "vuefinder__about-modal__setting-label" }, Ol = ["label"], Ll = ["value"], Fl = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Rl = { class: "vuefinder__about-modal__shortcuts" }, Il = { class: "vuefinder__about-modal__shortcut" }, Hl = /* @__PURE__ */ a("kbd", null, "F2", -1), Bl = { class: "vuefinder__about-modal__shortcut" }, Nl = /* @__PURE__ */ a("kbd", null, "F5", -1), Ul = { class: "vuefinder__about-modal__shortcut" }, ql = /* @__PURE__ */ a("kbd", null, "Del", -1), Pl = { class: "vuefinder__about-modal__shortcut" }, zl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Esc")
], -1), jl = { class: "vuefinder__about-modal__shortcut" }, Gl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, "A")
], -1), Kl = { class: "vuefinder__about-modal__shortcut" }, Wl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, "F")
], -1), Yl = { class: "vuefinder__about-modal__shortcut" }, Xl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, "E")
], -1), Ql = { class: "vuefinder__about-modal__shortcut" }, Jl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, ",")
], -1), Zl = { class: "vuefinder__about-modal__shortcut" }, ei = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, "Enter")
], -1), ti = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, ni = { class: "vuefinder__about-modal__description" }, Do = {
  __name: "ModalAbout",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n, clearStore: r } = e.storage, { t: s } = e.i18n, l = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = bt(() => [
      { name: s("About"), key: l.ABOUT },
      { name: s("Settings"), key: l.SETTINGS },
      { name: s("Shortcuts"), key: l.SHORTCUTS },
      { name: s("Reset"), key: l.RESET }
    ]), d = A("about"), i = async () => {
      r(), location.reload();
    }, u = (R) => {
      e.theme.set(R), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Us : Ns, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, _ = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, h = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, m = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: p } = re("VueFinderOptions"), k = Object.fromEntries(
      Object.entries({
        ar: "Arabic (العربيّة)",
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        fa: "Persian (فارسی)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        pl: "Polish (Polski)",
        ru: "Russian (Pусский)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)",
        nl: "Dutch (Nederlands)",
        zhCN: "Simplified Chinese (简体中文)",
        zhTW: "Traditional Chinese (繁體中文)"
      }).filter(([R]) => Object.keys(p).includes(R))
    ), T = bt(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (R, I) => (v(), W(Ye, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: I[7] || (I[7] = (S) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(s)("Close")), 1)
      ]),
      default: Z(() => [
        a("div", Xa, [
          P(nt, {
            icon: o(Ga),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          a("div", Qa, [
            a("div", null, [
              a("div", null, [
                a("nav", Ja, [
                  (v(!0), g(ge, null, ke(c.value, (S) => (v(), g("button", {
                    key: S.name,
                    onClick: (D) => d.value = S.key,
                    class: ae([S.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": S.current ? "page" : void 0
                  }, b(S.name), 11, Za))), 128))
                ])
              ])
            ]),
            d.value === l.ABOUT ? (v(), g("div", el, [
              a("div", tl, b(o(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              a("a", nl, b(o(s)("Project home")), 1),
              a("a", sl, b(o(s)("Follow on GitHub")), 1)
            ])) : q("", !0),
            d.value === l.SETTINGS ? (v(), g("div", ol, [
              a("div", rl, b(o(s)("Customize your experience with the following settings")), 1),
              a("div", al, [
                a("fieldset", null, [
                  a("div", ll, [
                    a("div", il, [
                      ue(a("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": I[0] || (I[0] = (S) => o(e).metricUnits = S),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [jt, o(e).metricUnits]
                      ])
                    ]),
                    a("div", cl, [
                      a("label", dl, [
                        Q(b(o(s)("Use Metric Units")) + " ", 1),
                        P(ft, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: Z(() => [
                            Q(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", ul, [
                    a("div", _l, [
                      ue(a("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": I[1] || (I[1] = (S) => o(e).compactListView = S),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [jt, o(e).compactListView]
                      ])
                    ]),
                    a("div", vl, [
                      a("label", fl, [
                        Q(b(o(s)("Compact list view")) + " ", 1),
                        P(ft, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: Z(() => [
                            Q(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", ml, [
                    a("div", hl, [
                      ue(a("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": I[2] || (I[2] = (S) => o(e).persist = S),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [jt, o(e).persist]
                      ])
                    ]),
                    a("div", pl, [
                      a("label", gl, [
                        Q(b(o(s)("Persist path on reload")) + " ", 1),
                        P(ft, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: Z(() => [
                            Q(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", bl, [
                    a("div", wl, [
                      ue(a("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": I[3] || (I[3] = (S) => o(e).showThumbnails = S),
                        onClick: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [jt, o(e).showThumbnails]
                      ])
                    ]),
                    a("div", yl, [
                      a("label", $l, [
                        Q(b(o(s)("Show thumbnails")) + " ", 1),
                        P(ft, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: Z(() => [
                            Q(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", kl, [
                    a("div", xl, [
                      a("label", Sl, b(o(s)("Theme")), 1)
                    ]),
                    a("div", Cl, [
                      ue(a("select", {
                        id: "theme",
                        "onUpdate:modelValue": I[4] || (I[4] = (S) => o(e).theme.value = S),
                        onChange: I[5] || (I[5] = (S) => u(S.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: o(s)("Theme")
                        }, [
                          (v(!0), g(ge, null, ke(T.value, (S, D) => (v(), g("option", { value: D }, b(S), 9, Tl))), 256))
                        ], 8, El)
                      ], 544), [
                        [An, o(e).theme.value]
                      ]),
                      P(ft, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: Z(() => [
                          Q(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  o(e).features.includes(o(de).LANGUAGE) && Object.keys(o(k)).length > 1 ? (v(), g("div", Ml, [
                    a("div", Al, [
                      a("label", Dl, b(o(s)("Language")), 1)
                    ]),
                    a("div", Vl, [
                      ue(a("select", {
                        id: "language",
                        "onUpdate:modelValue": I[6] || (I[6] = (S) => o(e).i18n.locale = S),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: o(s)("Language")
                        }, [
                          (v(!0), g(ge, null, ke(o(k), (S, D) => (v(), g("option", { value: D }, b(S), 9, Ll))), 256))
                        ], 8, Ol)
                      ], 512), [
                        [An, o(e).i18n.locale]
                      ]),
                      P(ft, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: Z(() => [
                          Q(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : q("", !0)
                ])
              ])
            ])) : q("", !0),
            d.value === l.SHORTCUTS ? (v(), g("div", Fl, [
              a("div", Rl, [
                a("div", Il, [
                  a("div", null, b(o(s)("Rename")), 1),
                  Hl
                ]),
                a("div", Bl, [
                  a("div", null, b(o(s)("Refresh")), 1),
                  Nl
                ]),
                a("div", Ul, [
                  Q(b(o(s)("Delete")) + " ", 1),
                  ql
                ]),
                a("div", Pl, [
                  Q(b(o(s)("Escape")) + " ", 1),
                  zl
                ]),
                a("div", jl, [
                  Q(b(o(s)("Select All")) + " ", 1),
                  Gl
                ]),
                a("div", Kl, [
                  Q(b(o(s)("Search")) + " ", 1),
                  Wl
                ]),
                a("div", Yl, [
                  Q(b(o(s)("Toggle Sidebar")) + " ", 1),
                  Xl
                ]),
                a("div", Ql, [
                  Q(b(o(s)("Open Settings")) + " ", 1),
                  Jl
                ]),
                a("div", Zl, [
                  Q(b(o(s)("Toggle Full Screen")) + " ", 1),
                  ei
                ])
              ])
            ])) : q("", !0),
            d.value === l.RESET ? (v(), g("div", ti, [
              a("div", ni, b(o(s)("Reset all settings to default")), 1),
              a("button", {
                onClick: i,
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
}, si = ["title"], oi = /* @__PURE__ */ a("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "vuefinder__message__icon"
}, [
  /* @__PURE__ */ a("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), ri = [
  oi
], Xe = {
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
    const n = e, r = re("ServiceContainer"), { t: s } = r.i18n, l = A(!1), c = A(null), d = A((u = c.value) == null ? void 0 : u.strMessage);
    De(d, () => l.value = !1);
    const i = () => {
      n("hidden"), l.value = !0;
    };
    return (f, _) => (v(), g("div", null, [
      l.value ? q("", !0) : (v(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: ae(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Dt(f.$slots, "default"),
        a("div", {
          class: "vuefinder__message__close",
          onClick: i,
          title: o(s)("Close")
        }, ri, 8, si)
      ], 2))
    ]));
  }
}, ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, li = /* @__PURE__ */ a("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), ii = [
  li
];
function ci(t, e) {
  return v(), g("svg", ai, [...ii]);
}
const Vo = { render: ci }, di = { class: "vuefinder__delete-modal__content" }, ui = { class: "vuefinder__delete-modal__form" }, _i = { class: "vuefinder__delete-modal__description" }, vi = { class: "vuefinder__delete-modal__files vf-scrollbar" }, fi = { class: "vuefinder__delete-modal__file" }, mi = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hi = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), pi = [
  hi
], gi = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bi = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), wi = [
  bi
], yi = { class: "vuefinder__delete-modal__file-name" }, $i = { class: "vuefinder__delete-modal__warning" }, cs = {
  __name: "ModalDelete",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(e.modal.data.items), s = A(""), l = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: c, type: d }) => ({ path: c, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (c) => {
          s.value = n(c.message);
        }
      });
    };
    return (c, d) => (v(), W(Ye, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: l,
          class: "vf-btn vf-btn-danger"
        }, b(o(n)("Yes, Delete!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        a("div", $i, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: Z(() => [
        a("div", null, [
          P(nt, {
            icon: o(Vo),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          a("div", di, [
            a("div", ui, [
              a("p", _i, b(o(n)("Are you sure you want to delete these files?")), 1),
              a("div", vi, [
                (v(!0), g(ge, null, ke(r.value, (i) => (v(), g("p", fi, [
                  i.type === "dir" ? (v(), g("svg", mi, pi)) : (v(), g("svg", gi, wi)),
                  a("span", yi, b(i.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (v(), W(Xe, {
                key: 0,
                onHidden: d[0] || (d[0] = (i) => s.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  Q(b(s.value), 1)
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
}, ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, xi = /* @__PURE__ */ a("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), Si = [
  xi
];
function Ci(t, e) {
  return v(), g("svg", ki, [...Si]);
}
const Oo = { render: Ci }, Ei = { class: "vuefinder__rename-modal__content" }, Ti = { class: "vuefinder__rename-modal__item" }, Mi = { class: "vuefinder__rename-modal__item-info" }, Ai = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Di = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Vi = [
  Di
], Oi = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Li = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Fi = [
  Li
], Ri = { class: "vuefinder__rename-modal__item-name" }, ds = {
  __name: "ModalRename",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(e.modal.data.items[0]), s = A(e.modal.data.items[0].basename), l = A(""), c = () => {
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
          l.value = n(d.message);
        }
      });
    };
    return (d, i) => (v(), W(Ye, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Rename")), 1),
        a("button", {
          type: "button",
          onClick: i[2] || (i[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Z(() => [
        a("div", null, [
          P(nt, {
            icon: o(Oo),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          a("div", Ei, [
            a("div", Ti, [
              a("p", Mi, [
                r.value.type === "dir" ? (v(), g("svg", Ai, Vi)) : (v(), g("svg", Oi, Fi)),
                a("span", Ri, b(r.value.basename), 1)
              ]),
              ue(a("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (u) => s.value = u),
                onKeyup: xt(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [St, s.value]
              ]),
              l.value.length ? (v(), W(Xe, {
                key: 0,
                onHidden: i[1] || (i[1] = (u) => l.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  Q(b(l.value), 1)
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
}, Qe = {
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
function Ii(t) {
  const e = (n) => {
    n.code === Qe.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Qe.F2 && t.features.includes(de.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(ds, { items: t.dragSelect.getSelected() })), n.code === Qe.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Qe.DELETE && (!t.dragSelect.getCount() || t.modal.open(cs, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Qe.BACKSLASH && t.modal.open(Do), n.metaKey && n.code === Qe.KEY_F && t.features.includes(de.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Qe.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Qe.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Qe.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
  };
  xe(() => {
    t.root.addEventListener("keydown", e);
  });
}
const Hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Bi = /* @__PURE__ */ a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Ni = [
  Bi
];
function Ui(t, e) {
  return v(), g("svg", Hi, [...Ni]);
}
const Lo = { render: Ui }, qi = { class: "vuefinder__new-folder-modal__content" }, Pi = { class: "vuefinder__new-folder-modal__form" }, zi = { class: "vuefinder__new-folder-modal__description" }, ji = ["placeholder"], Fo = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, r = A(""), s = A(""), l = () => {
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
        onError: (c) => {
          s.value = n(c.message);
        }
      });
    };
    return (c, d) => (v(), W(Ye, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: l,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Z(() => [
        a("div", null, [
          P(nt, {
            icon: o(Lo),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          a("div", qi, [
            a("div", Pi, [
              a("p", zi, b(o(n)("Create a new folder")), 1),
              ue(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => r.value = i),
                onKeyup: xt(l, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text"
              }, null, 40, ji), [
                [St, r.value]
              ]),
              s.value.length ? (v(), W(Xe, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  Q(b(s.value), 1)
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
}, Gi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Ki = /* @__PURE__ */ a("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Wi = [
  Ki
];
function Yi(t, e) {
  return v(), g("svg", Gi, [...Wi]);
}
const Ro = { render: Yi }, Xi = { class: "vuefinder__new-file-modal__content" }, Qi = { class: "vuefinder__new-file-modal__form" }, Ji = { class: "vuefinder__new-file-modal__description" }, Zi = ["placeholder"], ec = {
  __name: "ModalNewFile",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, r = A(""), s = A(""), l = () => {
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
        onError: (c) => {
          s.value = n(c.message);
        }
      });
    };
    return (c, d) => (v(), W(Ye, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: l,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Z(() => [
        a("div", null, [
          P(nt, {
            icon: o(Ro),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          a("div", Xi, [
            a("div", Qi, [
              a("p", Ji, b(o(n)("Create a new file")), 1),
              ue(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => r.value = i),
                onKeyup: xt(l, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, Zi), [
                [St, r.value]
              ]),
              s.value.length ? (v(), W(Xe, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  Q(b(s.value), 1)
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
function Gn(t, e = 14) {
  let n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const tc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, nc = /* @__PURE__ */ a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), sc = [
  nc
];
function oc(t, e) {
  return v(), g("svg", tc, [...sc]);
}
const Io = { render: oc }, rc = { class: "vuefinder__upload-modal__content" }, ac = {
  key: 0,
  class: "pointer-events-none"
}, lc = {
  key: 1,
  class: "pointer-events-none"
}, ic = ["disabled"], cc = ["disabled"], dc = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, uc = ["textContent"], _c = { class: "vuefinder__upload-modal__file-info" }, vc = { class: "vuefinder__upload-modal__file-name hidden md:block" }, fc = { class: "vuefinder__upload-modal__file-name md:hidden" }, mc = {
  key: 0,
  class: "ml-auto"
}, hc = ["title", "disabled", "onClick"], pc = /* @__PURE__ */ a("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "vuefinder__upload-modal__file-remove-icon"
}, [
  /* @__PURE__ */ a("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), gc = [
  pc
], bc = {
  key: 0,
  class: "py-2"
}, wc = ["disabled"], yc = {
  __name: "ModalUpload",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, l = A({ QUEUE_ENTRY_STATUS: s }), c = A(null), d = A(null), i = A(null), u = A(null), f = A(null), _ = A(null), h = A([]), m = A(""), p = A(!1), y = A(!1);
    let k;
    function T(E) {
      return h.value.findIndex((H) => H.id === E);
    }
    function R(E, H = null) {
      H = H ?? (E.webkitRelativePath || E.name), k.addFile({
        name: H,
        type: E.type,
        data: E,
        source: "Local"
      });
    }
    function I(E) {
      switch (E.status) {
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
    const S = (E) => {
      switch (E.status) {
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
    function D() {
      u.value.click();
    }
    function O() {
      if (!p.value) {
        if (!h.value.filter((E) => E.status !== s.DONE).length) {
          m.value = n("Please select file to upload first.");
          return;
        }
        m.value = "", k.retryAll(), k.upload();
      }
    }
    function z() {
      k.cancelAll({ reason: "user" }), h.value.forEach((E) => {
        E.status !== s.DONE && (E.status = s.CANCELED, E.statusName = n("Canceled"));
      }), p.value = !1;
    }
    function V(E) {
      p.value || (k.removeFile(E.id, "removed-by-user"), h.value.splice(T(E.id), 1));
    }
    function x(E) {
      if (!p.value) {
        if (k.cancelAll({ reason: "user" }), E) {
          const H = [];
          h.value.forEach(($) => {
            $.status !== s.DONE && H.push($);
          }), h.value = [], H.forEach(($) => {
            R($.originalFile, $.name);
          });
          return;
        }
        h.value.splice(0);
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
    return xe(async () => {
      k = new fr({
        debug: e.debug,
        restrictions: {
          maxFileSize: Sr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded($, N) {
          if (N[$.id] != null) {
            const ee = T($.id);
            h.value[ee].status === s.PENDING && (m.value = k.i18n("noDuplicates", { fileName: $.name })), h.value = h.value.filter((se) => se.id !== $.id);
          }
          return h.value.push({
            id: $.id,
            name: $.name,
            size: e.filesize($.size),
            status: s.PENDING,
            statusName: n("Pending upload"),
            percent: null,
            originalFile: $.data
          }), !0;
        }
      }), k.use(mr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError($, N) {
          let U;
          try {
            U = JSON.parse($).message;
          } catch {
            U = n("Cannot parse server response.");
          }
          return new Error(U);
        }
      }), k.on("restriction-failed", ($, N) => {
        const U = h.value[T($.id)];
        V(U), m.value = N.message;
      }), k.on("upload", () => {
        const $ = C();
        k.setMeta({ ...$.body });
        const N = k.getPlugin("XHRUpload");
        N.opts.method = $.method, N.opts.endpoint = $.url + "?" + new URLSearchParams($.params), N.opts.headers = $.headers, delete $.headers["Content-Type"], p.value = !0, h.value.forEach((U) => {
          U.status !== s.DONE && (U.percent = null, U.status = s.UPLOADING, U.statusName = n("Pending upload"));
        });
      }), k.on("upload-progress", ($, N) => {
        const U = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        h.value[T($.id)].percent = `${U}%`;
      }), k.on("upload-success", ($) => {
        const N = h.value[T($.id)];
        N.status = s.DONE, N.statusName = n("Done");
      }), k.on("upload-error", ($, N) => {
        const U = h.value[T($.id)];
        U.percent = null, U.status = s.ERROR, N.isNetworkError ? U.statusName = n("Network Error, Unable establish connection to the server or interrupted.") : U.statusName = N ? N.message : n("Unknown Error");
      }), k.on("error", ($) => {
        m.value = $.message, p.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), k.on("complete", () => {
        p.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), f.value.addEventListener("click", () => {
        i.value.click();
      }), _.value.addEventListener("dragover", ($) => {
        $.preventDefault(), y.value = !0;
      }), _.value.addEventListener("dragleave", ($) => {
        $.preventDefault(), y.value = !1;
      });
      function E($, N) {
        N.isFile && N.file((U) => $(N, U)), N.isDirectory && N.createReader().readEntries((U) => {
          U.forEach((ee) => {
            E($, ee);
          });
        });
      }
      _.value.addEventListener("drop", ($) => {
        $.preventDefault(), y.value = !1;
        const N = /^[/\\](.+)/;
        [...$.dataTransfer.items].forEach((U) => {
          U.kind === "file" && E((ee, se) => {
            const ne = N.exec(ee.fullPath);
            R(se, ne[1]);
          }, U.webkitGetAsEntry());
        });
      });
      const H = ({ target: $ }) => {
        const N = $.files;
        for (const U of N)
          R(U);
        $.value = "";
      };
      d.value.addEventListener("change", H), i.value.addEventListener("change", H);
    }), Hs(() => {
      k == null || k.close({ reason: "unmount" });
    }), (E, H) => (v(), W(Ye, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: p.value,
          onClick: et(O, ["prevent"])
        }, b(o(n)("Upload")), 9, wc),
        p.value ? (v(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(z, ["prevent"])
        }, b(o(n)("Cancel")), 1)) : (v(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(w, ["prevent"])
        }, b(o(n)("Close")), 1))
      ]),
      default: Z(() => [
        a("div", null, [
          P(nt, {
            icon: o(Io),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          a("div", rc, [
            a("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: _,
              onClick: D
            }, [
              y.value ? (v(), g("div", ac, b(o(n)("Release to drop these files.")), 1)) : (v(), g("div", lc, b(o(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            a("div", {
              ref_key: "container",
              ref: c,
              class: "vuefinder__upload-modal__buttons"
            }, [
              a("button", {
                ref_key: "pickFiles",
                ref: u,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(n)("Select Files")), 513),
              a("button", {
                ref_key: "pickFolders",
                ref: f,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(n)("Select Folders")), 513),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: p.value,
                onClick: H[0] || (H[0] = ($) => x(!1))
              }, b(o(n)("Clear all")), 9, ic),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: p.value,
                onClick: H[1] || (H[1] = ($) => x(!0))
              }, b(o(n)("Clear only successful")), 9, cc)
            ], 512),
            a("div", dc, [
              (v(!0), g(ge, null, ke(h.value, ($) => (v(), g("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: $.id
              }, [
                a("span", {
                  class: ae(["vuefinder__upload-modal__file-icon", I($)])
                }, [
                  a("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(S($))
                  }, null, 8, uc)
                ], 2),
                a("div", _c, [
                  a("div", vc, b(o(Gn)($.name, 40)) + " (" + b($.size) + ")", 1),
                  a("div", fc, b(o(Gn)($.name, 16)) + " (" + b($.size) + ")", 1),
                  a("div", {
                    class: ae(["vuefinder__upload-modal__file-status", I($)])
                  }, [
                    Q(b($.statusName) + " ", 1),
                    $.status === l.value.QUEUE_ENTRY_STATUS.UPLOADING ? (v(), g("b", mc, b($.percent), 1)) : q("", !0)
                  ], 2)
                ]),
                a("button", {
                  type: "button",
                  class: ae(["vuefinder__upload-modal__file-remove", p.value ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: p.value,
                  onClick: (N) => V($)
                }, gc, 10, hc)
              ]))), 128)),
              h.value.length ? q("", !0) : (v(), g("div", bc, b(o(n)("No files selected!")), 1))
            ]),
            m.value.length ? (v(), W(Xe, {
              key: 0,
              onHidden: H[2] || (H[2] = ($) => m.value = ""),
              error: ""
            }, {
              default: Z(() => [
                Q(b(m.value), 1)
              ]),
              _: 1
            })) : q("", !0)
          ])
        ]),
        a("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        a("input", {
          ref_key: "internalFolderInput",
          ref: i,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}, $c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, kc = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), xc = [
  kc
];
function Sc(t, e) {
  return v(), g("svg", $c, [...xc]);
}
const Ho = { render: Sc }, Cc = { class: "vuefinder__unarchive-modal__content" }, Ec = { class: "vuefinder__unarchive-modal__items" }, Tc = { class: "vuefinder__unarchive-modal__item" }, Mc = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ac = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Dc = [
  Ac
], Vc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Oc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Lc = [
  Oc
], Fc = { class: "vuefinder__unarchive-modal__item-name" }, Rc = { class: "vuefinder__unarchive-modal__info" }, Bo = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(e.modal.data.items[0]), s = A(""), l = A([]), c = () => {
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
    return (d, i) => (v(), W(Ye, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Unarchive")), 1),
        a("button", {
          type: "button",
          onClick: i[1] || (i[1] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Z(() => [
        a("div", null, [
          P(nt, {
            icon: o(Ho),
            title: o(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          a("div", Cc, [
            a("div", Ec, [
              (v(!0), g(ge, null, ke(l.value, (u) => (v(), g("p", Tc, [
                u.type === "dir" ? (v(), g("svg", Mc, Dc)) : (v(), g("svg", Vc, Lc)),
                a("span", Fc, b(u.basename), 1)
              ]))), 256)),
              a("p", Rc, b(o(n)("The archive will be unarchived at")) + " (" + b(o(e).fs.data.dirname) + ")", 1),
              s.value.length ? (v(), W(Xe, {
                key: 0,
                onHidden: i[0] || (i[0] = (u) => s.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  Q(b(s.value), 1)
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
}, Ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Hc = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Bc = [
  Hc
];
function Nc(t, e) {
  return v(), g("svg", Ic, [...Bc]);
}
const No = { render: Nc }, Uc = { class: "vuefinder__archive-modal__content" }, qc = { class: "vuefinder__archive-modal__form" }, Pc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, zc = { class: "vuefinder__archive-modal__file" }, jc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Kc = [
  Gc
], Wc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Xc = [
  Yc
], Qc = { class: "vuefinder__archive-modal__file-name" }, Jc = ["placeholder"], Uo = {
  __name: "ModalArchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(""), s = A(""), l = A(e.modal.data.items), c = () => {
      l.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: l.value.map(({ path: d, type: i }) => ({ path: d, type: i })),
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
    return (d, i) => (v(), W(Ye, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Archive")), 1),
        a("button", {
          type: "button",
          onClick: i[2] || (i[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Z(() => [
        a("div", null, [
          P(nt, {
            icon: o(No),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          a("div", Uc, [
            a("div", qc, [
              a("div", Pc, [
                (v(!0), g(ge, null, ke(l.value, (u) => (v(), g("p", zc, [
                  u.type === "dir" ? (v(), g("svg", jc, Kc)) : (v(), g("svg", Wc, Xc)),
                  a("span", Qc, b(u.basename), 1)
                ]))), 256))
              ]),
              ue(a("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (u) => r.value = u),
                onKeyup: xt(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Jc), [
                [St, r.value]
              ]),
              s.value.length ? (v(), W(Xe, {
                key: 0,
                onHidden: i[1] || (i[1] = (u) => s.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  Q(b(s.value), 1)
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
}, Zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, ed = /* @__PURE__ */ a("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), td = /* @__PURE__ */ a("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), nd = [
  ed,
  td
];
function sd(t, e) {
  return v(), g("svg", Zc, [...nd]);
}
const us = { render: sd }, od = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, rd = /* @__PURE__ */ a("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), ad = [
  rd
];
function ld(t, e) {
  return v(), g("svg", od, [...ad]);
}
const id = { render: ld }, cd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, dd = /* @__PURE__ */ a("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), ud = [
  dd
];
function _d(t, e) {
  return v(), g("svg", cd, [...ud]);
}
const vd = { render: _d }, fd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, md = /* @__PURE__ */ a("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), hd = [
  md
];
function pd(t, e) {
  return v(), g("svg", fd, [...hd]);
}
const gd = { render: pd }, bd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, wd = /* @__PURE__ */ a("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), yd = [
  wd
];
function $d(t, e) {
  return v(), g("svg", bd, [...yd]);
}
const kd = { render: $d }, xd = { class: "vuefinder__toolbar" }, Sd = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, Cd = ["title"], Ed = ["title"], Td = ["title"], Md = ["title"], Ad = ["title"], Dd = ["title"], Vd = ["title"], Od = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Ld = { class: "pl-2" }, Fd = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Rd = { class: "vuefinder__toolbar__controls" }, Id = ["title"], Hd = ["title"], Bd = {
  __name: "Toolbar",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, { t: r } = e.i18n, s = e.dragSelect, l = A("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      l.value = i;
    });
    const c = () => {
      e.fullScreen = !e.fullScreen;
    };
    De(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (i, u) => (v(), g("div", xd, [
      l.value.length ? (v(), g("div", Od, [
        a("div", Ld, [
          Q(b(o(r)("Search results for")) + " ", 1),
          a("span", Fd, b(l.value), 1)
        ]),
        o(e).loadingIndicator === "circular" && o(e).fs.loading ? (v(), W(o(us), { key: 0 })) : q("", !0)
      ])) : (v(), g("div", Sd, [
        o(e).features.includes(o(de).NEW_FOLDER) ? (v(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(r)("New Folder"),
          onClick: u[0] || (u[0] = (f) => o(e).modal.open(Fo, { items: o(s).getSelected() }))
        }, [
          P(o(Lo))
        ], 8, Cd)) : q("", !0),
        o(e).features.includes(o(de).NEW_FILE) ? (v(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(r)("New File"),
          onClick: u[1] || (u[1] = (f) => o(e).modal.open(ec, { items: o(s).getSelected() }))
        }, [
          P(o(Ro))
        ], 8, Ed)) : q("", !0),
        o(e).features.includes(o(de).RENAME) ? (v(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: o(r)("Rename"),
          onClick: u[2] || (u[2] = (f) => o(s).getCount() !== 1 || o(e).modal.open(ds, { items: o(s).getSelected() }))
        }, [
          P(o(Oo), {
            class: ae(o(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Td)) : q("", !0),
        o(e).features.includes(o(de).DELETE) ? (v(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: o(r)("Delete"),
          onClick: u[3] || (u[3] = (f) => !o(s).getCount() || o(e).modal.open(cs, { items: o(s).getSelected() }))
        }, [
          P(o(Vo), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Md)) : q("", !0),
        o(e).features.includes(o(de).UPLOAD) ? (v(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: o(r)("Upload"),
          onClick: u[4] || (u[4] = (f) => o(e).modal.open(yc, { items: o(s).getSelected() }))
        }, [
          P(o(Io))
        ], 8, Ad)) : q("", !0),
        o(e).features.includes(o(de).UNARCHIVE) && o(s).getCount() === 1 && o(s).getSelected()[0].mime_type === "application/zip" ? (v(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: o(r)("Unarchive"),
          onClick: u[5] || (u[5] = (f) => !o(s).getCount() || o(e).modal.open(Bo, { items: o(s).getSelected() }))
        }, [
          P(o(Ho), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Dd)) : q("", !0),
        o(e).features.includes(o(de).ARCHIVE) ? (v(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: o(r)("Archive"),
          onClick: u[6] || (u[6] = (f) => !o(s).getCount() || o(e).modal.open(Uo, { items: o(s).getSelected() }))
        }, [
          P(o(No), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Vd)) : q("", !0)
      ])),
      a("div", Rd, [
        o(e).features.includes(o(de).FULL_SCREEN) ? (v(), g("div", {
          key: 0,
          onClick: c,
          class: "mx-1.5",
          title: o(r)("Toggle Full Screen")
        }, [
          o(e).fullScreen ? (v(), W(o(vd), { key: 0 })) : (v(), W(o(id), { key: 1 }))
        ], 8, Id)) : q("", !0),
        a("div", {
          class: "mx-1.5",
          title: o(r)("Change View"),
          onClick: u[7] || (u[7] = (f) => l.value.length || d())
        }, [
          o(e).view === "grid" ? (v(), W(o(gd), {
            key: 0,
            class: ae(["vf-toolbar-icon", l.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0),
          o(e).view === "list" ? (v(), W(o(kd), {
            key: 1,
            class: ae(["vf-toolbar-icon", l.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0)
        ], 8, Hd)
      ])
    ]));
  }
}, Nd = (t, e = 0, n = !1) => {
  let r;
  return (...s) => {
    n && !r && t(...s), clearTimeout(r), r = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Ls = (t, e, n) => {
  const r = A(t);
  return rr((s, l) => ({
    get() {
      return s(), r.value;
    },
    set: Nd(
      (c) => {
        r.value = c, l();
      },
      e,
      n
    )
  }));
}, Ud = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, qd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
}, null, -1), Pd = [
  qd
];
function zd(t, e) {
  return v(), g("svg", Ud, [...Pd]);
}
const jd = { render: zd }, Gd = { class: "vuefinder__move-modal__content" }, Kd = { class: "vuefinder__move-modal__description" }, Wd = { class: "vuefinder__move-modal__files vf-scrollbar" }, Yd = { class: "vuefinder__move-modal__file" }, Xd = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Jd = [
  Qd
], Zd = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, eu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), tu = [
  eu
], nu = { class: "vuefinder__move-modal__file-name" }, su = { class: "vuefinder__move-modal__target-title" }, ou = { class: "vuefinder__move-modal__target-directory" }, ru = /* @__PURE__ */ a("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ a("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), au = { class: "vuefinder__move-modal__target-path" }, lu = { class: "vuefinder__move-modal__selected-items" }, Kn = {
  __name: "ModalMove",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(e.modal.data.items.from), s = A(""), l = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: c, type: d }) => ({ path: c, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (c) => {
          s.value = n(c.message);
        }
      });
    };
    return (c, d) => (v(), W(Ye, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: l,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Yes, Move!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        a("div", lu, b(o(n)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: Z(() => [
        a("div", null, [
          P(nt, {
            icon: o(jd),
            title: o(n)("Move files")
          }, null, 8, ["icon", "title"]),
          a("div", Gd, [
            a("p", Kd, b(o(n)("Are you sure you want to move these files?")), 1),
            a("div", Wd, [
              (v(!0), g(ge, null, ke(r.value, (i) => (v(), g("div", Yd, [
                a("div", null, [
                  i.type === "dir" ? (v(), g("svg", Xd, Jd)) : (v(), g("svg", Zd, tu))
                ]),
                a("div", nu, b(i.path), 1)
              ]))), 256))
            ]),
            a("h4", su, b(o(n)("Target Directory")), 1),
            a("p", ou, [
              ru,
              a("span", au, b(o(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (v(), W(Xe, {
              key: 0,
              onHidden: d[0] || (d[0] = (i) => s.value = ""),
              error: ""
            }, {
              default: Z(() => [
                Q(b(s.value), 1)
              ]),
              _: 1
            })) : q("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, cu = /* @__PURE__ */ a("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), du = [
  cu
];
function uu(t, e) {
  return v(), g("svg", iu, [...du]);
}
const _u = { render: uu }, vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, fu = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), mu = [
  fu
];
function hu(t, e) {
  return v(), g("svg", vu, [...mu]);
}
const pu = { render: hu }, gu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, bu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), wu = [
  bu
];
function yu(t, e) {
  return v(), g("svg", gu, [...wu]);
}
const $u = { render: yu }, ku = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, xu = /* @__PURE__ */ a("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), Su = [
  xu
];
function Cu(t, e) {
  return v(), g("svg", ku, [...Su]);
}
const Eu = { render: Cu }, Tu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, Mu = /* @__PURE__ */ a("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), Au = [
  Mu
];
function Du(t, e) {
  return v(), g("svg", Tu, [...Au]);
}
const Vu = { render: Du }, Ou = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, Lu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Fu = [
  Lu
];
function Ru(t, e) {
  return v(), g("svg", Ou, [...Fu]);
}
const Iu = { render: Ru }, Hu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, Bu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), Nu = [
  Bu
];
function Uu(t, e) {
  return v(), g("svg", Hu, [...Nu]);
}
const pn = { render: Uu }, qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
}, Pu = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), zu = /* @__PURE__ */ a("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1), ju = [
  Pu,
  zu
];
function Gu(t, e) {
  return v(), g("svg", qu, [...ju]);
}
const Ku = { render: Gu }, Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, Yu = /* @__PURE__ */ a("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), Xu = [
  Yu
];
function Qu(t, e) {
  return v(), g("svg", Wu, [...Xu]);
}
const Ju = { render: Qu }, Zu = { class: "vuefinder__breadcrumb__container" }, e_ = ["title"], t_ = ["title"], n_ = ["title"], s_ = ["title"], o_ = { class: "vuefinder__breadcrumb__list" }, r_ = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, a_ = /* @__PURE__ */ a("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1), l_ = { class: "relative" }, i_ = /* @__PURE__ */ a("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1), c_ = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], d_ = { class: "vuefinder__breadcrumb__search-mode" }, u_ = ["placeholder"], __ = { class: "vuefinder__breadcrumb__hidden-dropdown" }, v_ = ["onDrop", "onClick"], f_ = { class: "vuefinder__breadcrumb__hidden-item-content" }, m_ = { class: "vuefinder__breadcrumb__hidden-item-text" }, h_ = {
  __name: "Breadcrumb",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = e.dragSelect, { setStore: s } = e.storage, l = A(null), c = Ls(0, 100);
    De(c, (V) => {
      const x = l.value.children;
      let w = 0, C = 0, E = 5, H = 1;
      e.fs.limitBreadcrumbItems(E), dt(() => {
        for (let $ = x.length - 1; $ >= 0 && !(w + x[$].offsetWidth > c.value - 40); $--)
          w += parseInt(x[$].offsetWidth, 10), C++;
        C < H && (C = H), C > E && (C = E), e.fs.limitBreadcrumbItems(C);
      });
    });
    const d = () => {
      c.value = l.value.offsetWidth;
    };
    let i = A(null);
    xe(() => {
      i.value = new ResizeObserver(d), i.value.observe(l.value);
    }), Wn(() => {
      i.value.disconnect();
    });
    const u = (V, x = null) => {
      V.preventDefault(), r.isDraggingRef.value = !1, h(V), x ?? (x = e.fs.hiddenBreadcrumbs.length - 1);
      let w = JSON.parse(V.dataTransfer.getData("items"));
      if (w.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Kn, {
        items: {
          from: w,
          to: e.fs.hiddenBreadcrumbs[x] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, f = (V, x = null) => {
      V.preventDefault(), r.isDraggingRef.value = !1, h(V), x ?? (x = e.fs.breadcrumbs.length - 2);
      let w = JSON.parse(V.dataTransfer.getData("items"));
      if (w.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Kn, {
        items: {
          from: w,
          to: e.fs.breadcrumbs[x] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, _ = (V) => {
      V.preventDefault(), e.fs.isGoUpAvailable() ? (V.dataTransfer.dropEffect = "copy", V.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (V.dataTransfer.dropEffect = "none", V.dataTransfer.effectAllowed = "none");
    }, h = (V) => {
      V.preventDefault(), V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, m = () => {
      O(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, p = () => {
      O(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, y = (V) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: V.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, k = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, T = {
      mounted(V, x, w, C) {
        V.clickOutsideEvent = function(E) {
          V === E.target || V.contains(E.target) || x.value();
        }, document.body.addEventListener("click", V.clickOutsideEvent);
      },
      beforeUnmount(V, x, w, C) {
        document.body.removeEventListener("click", V.clickOutsideEvent);
      }
    }, R = () => {
      e.showTreeView = !e.showTreeView;
    };
    De(() => e.showTreeView, (V, x) => {
      V !== x && s("show-tree-view", V);
    });
    const I = A(null), S = () => {
      e.features.includes(de.SEARCH) && (e.fs.searchMode = !0, dt(() => I.value.focus()));
    }, D = Ls("", 400);
    De(D, (V) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: V });
    }), De(() => e.fs.searchMode, (V) => {
      V && dt(() => I.value.focus());
    });
    const O = () => {
      e.fs.searchMode = !1, D.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      O();
    });
    const z = () => {
      D.value === "" && O();
    };
    return (V, x) => (v(), g("div", Zu, [
      a("span", {
        title: o(n)("Toggle Tree View")
      }, [
        P(o(Ku), {
          onClick: R,
          class: ae(["vuefinder__breadcrumb__toggle-tree", o(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, e_),
      a("span", {
        title: o(n)("Go up a directory")
      }, [
        P(o(pu), {
          onDragover: x[0] || (x[0] = (w) => _(w)),
          onDragleave: x[1] || (x[1] = (w) => h(w)),
          onDrop: x[2] || (x[2] = (w) => f(w)),
          onClick: p,
          class: ae(o(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, t_),
      o(e).fs.loading ? (v(), g("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        P(o($u), {
          onClick: x[3] || (x[3] = (w) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, s_)) : (v(), g("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        P(o(_u), { onClick: m })
      ], 8, n_)),
      ue(a("div", {
        onClick: et(S, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        a("div", null, [
          P(o(Eu), {
            onDragover: x[4] || (x[4] = (w) => _(w)),
            onDragleave: x[5] || (x[5] = (w) => h(w)),
            onDrop: x[6] || (x[6] = (w) => f(w, -1)),
            onClick: x[7] || (x[7] = (w) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter } }))
          })
        ]),
        a("div", o_, [
          o(e).fs.hiddenBreadcrumbs.length ? ue((v(), g("div", r_, [
            a_,
            a("div", l_, [
              a("span", {
                onDragenter: x[8] || (x[8] = (w) => o(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: x[9] || (x[9] = (w) => o(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                P(o(Ju), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [T, k]
          ]) : q("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: l,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: et(S, ["self"])
        }, [
          (v(!0), g(ge, null, ke(o(e).fs.breadcrumbs, (w, C) => (v(), g("div", { key: C }, [
            i_,
            a("span", {
              onDragover: (E) => C === o(e).fs.breadcrumbs.length - 1 || _(E),
              onDragleave: (E) => C === o(e).fs.breadcrumbs.length - 1 || h(E),
              onDrop: (E) => C === o(e).fs.breadcrumbs.length - 1 || f(E, C),
              class: "vuefinder__breadcrumb__item",
              title: w.basename,
              onClick: (E) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter, path: w.path } })
            }, b(w.name), 41, c_)
          ]))), 128))
        ], 512),
        o(e).loadingIndicator === "circular" && o(e).fs.loading ? (v(), W(o(us), { key: 0 })) : q("", !0)
      ], 512), [
        [Pe, !o(e).fs.searchMode]
      ]),
      ue(a("div", d_, [
        a("div", null, [
          P(o(Vu))
        ]),
        ue(a("input", {
          ref_key: "searchInput",
          ref: I,
          onKeydown: xt(O, ["esc"]),
          onBlur: z,
          "onUpdate:modelValue": x[10] || (x[10] = (w) => ar(D) ? D.value = w : null),
          placeholder: o(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, u_), [
          [St, o(D)]
        ]),
        P(o(Iu), { onClick: O })
      ], 512), [
        [Pe, o(e).fs.searchMode]
      ]),
      ue(a("div", __, [
        (v(!0), g(ge, null, ke(o(e).fs.hiddenBreadcrumbs, (w, C) => (v(), g("div", {
          key: C,
          onDragover: x[11] || (x[11] = (E) => _(E)),
          onDragleave: x[12] || (x[12] = (E) => h(E)),
          onDrop: (E) => u(E, C),
          onClick: (E) => y(w),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          a("div", f_, [
            a("span", null, [
              P(o(pn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            Q(),
            a("span", m_, b(w.name), 1)
          ])
        ], 40, v_))), 128))
      ], 512), [
        [Pe, o(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, qo = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), p_ = ["onClick"], g_ = {
  __name: "Toast",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, r = A(n("full-screen", !1)), s = A([]), l = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (i) => {
      s.value.splice(i, 1);
    }, d = (i) => {
      let u = s.value.findIndex((f) => f.id === i);
      u !== -1 && c(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (i) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      i.id = u, s.value.push(i), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (i, u) => (v(), g("div", {
      class: ae(["vuefinder__toast", r.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      P(lr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Z(() => [
          (v(!0), g(ge, null, ke(s.value, (f, _) => (v(), g("div", {
            key: _,
            onClick: (h) => c(_),
            class: ae(["vuefinder__toast__message", l(f.type)])
          }, b(f.label), 11, p_))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, b_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, w_ = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), y_ = [
  w_
];
function $_(t, e) {
  return v(), g("svg", b_, [...y_]);
}
const k_ = { render: $_ }, x_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, S_ = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), C_ = [
  S_
];
function E_(t, e) {
  return v(), g("svg", x_, [...C_]);
}
const T_ = { render: E_ }, Wt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (v(), g("div", null, [
      t.direction === "asc" ? (v(), W(o(k_), { key: 0 })) : q("", !0),
      t.direction === "desc" ? (v(), W(o(T_), { key: 1 })) : q("", !0)
    ]));
  }
}, M_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, A_ = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), D_ = [
  A_
];
function V_(t, e) {
  return v(), g("svg", M_, [...D_]);
}
const O_ = { render: V_ }, L_ = { class: "vuefinder__item-icon" }, Tn = {
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
    return (e, n) => (v(), g("span", L_, [
      t.type === "dir" ? (v(), W(o(pn), {
        key: 0,
        class: ae(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (v(), W(o(O_), {
        key: 1,
        class: ae(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, F_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, R_ = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), I_ = [
  R_
];
function H_(t, e) {
  return v(), g("svg", F_, [...I_]);
}
const B_ = { render: H_ }, N_ = { class: "vuefinder__drag-item__container" }, U_ = { class: "vuefinder__drag-item__count" }, q_ = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, r) => (v(), g("div", N_, [
      P(o(B_)),
      a("div", U_, b(e.count), 1)
    ]));
  }
}, P_ = { class: "vuefinder__text-preview" }, z_ = { class: "vuefinder__text-preview__header" }, j_ = ["title"], G_ = { class: "vuefinder__text-preview__actions" }, K_ = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, W_ = { key: 1 }, Y_ = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = A(""), s = A(""), l = A(null), c = A(!1), d = A(""), i = A(!1), u = re("ServiceContainer"), { t: f } = u.i18n;
    xe(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((m) => {
        r.value = m, n("success");
      });
    });
    const _ = () => {
      c.value = !c.value, s.value = r.value;
    }, h = () => {
      d.value = "", i.value = !1, u.requester.send({
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
      }).then((m) => {
        d.value = f("Updated."), r.value = m, n("success"), c.value = !c.value;
      }).catch((m) => {
        d.value = f(m.message), i.value = !0;
      });
    };
    return (m, p) => (v(), g("div", P_, [
      a("div", z_, [
        a("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(u).modal.data.item.path
        }, b(o(u).modal.data.item.basename), 9, j_),
        a("div", G_, [
          c.value ? (v(), g("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__text-preview__save-button"
          }, b(o(f)("Save")), 1)) : q("", !0),
          o(u).features.includes(o(de).EDIT) ? (v(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: p[0] || (p[0] = (y) => _())
          }, b(c.value ? o(f)("Cancel") : o(f)("Edit")), 1)) : q("", !0)
        ])
      ]),
      a("div", null, [
        c.value ? (v(), g("div", W_, [
          ue(a("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": p[1] || (p[1] = (y) => s.value = y),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [St, s.value]
          ])
        ])) : (v(), g("pre", K_, b(r.value), 1)),
        d.value.length ? (v(), W(Xe, {
          key: 2,
          onHidden: p[2] || (p[2] = (y) => d.value = ""),
          error: i.value
        }, {
          default: Z(() => [
            Q(b(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : q("", !0)
      ])
    ]));
  }
}, X_ = { class: "vuefinder__image-preview" }, Q_ = { class: "vuefinder__image-preview__header" }, J_ = ["title"], Z_ = { class: "vuefinder__image-preview__actions" }, ev = { class: "vuefinder__image-preview__image-container" }, tv = ["src"], nv = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = re("ServiceContainer"), { t: s } = r.i18n, l = A(null), c = A(null), d = A(!1), i = A(""), u = A(!1), f = () => {
      d.value = !d.value, d.value ? c.value = new pr(l.value, {
        crop(h) {
        }
      }) : c.value.destroy();
    }, _ = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (h) => {
          i.value = "", u.value = !1;
          const m = new FormData();
          m.set("file", h), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: m
          }).then((p) => {
            i.value = s("Updated."), l.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), f(), n("success");
          }).catch((p) => {
            i.value = s(p.message), u.value = !0;
          });
        }
      );
    };
    return xe(() => {
      n("success");
    }), (h, m) => (v(), g("div", X_, [
      a("div", Q_, [
        a("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(r).modal.data.item.path
        }, b(o(r).modal.data.item.basename), 9, J_),
        a("div", Z_, [
          d.value ? (v(), g("button", {
            key: 0,
            onClick: _,
            class: "vuefinder__image-preview__crop-button"
          }, b(o(s)("Crop")), 1)) : q("", !0),
          o(r).features.includes(o(de).EDIT) ? (v(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: m[0] || (m[0] = (p) => f())
          }, b(d.value ? o(s)("Cancel") : o(s)("Edit")), 1)) : q("", !0)
        ])
      ]),
      a("div", ev, [
        a("img", {
          ref_key: "image",
          ref: l,
          class: "vuefinder__image-preview__image",
          src: o(r).requester.getPreviewUrl(o(r).modal.data.adapter, o(r).modal.data.item),
          alt: ""
        }, null, 8, tv)
      ]),
      i.value.length ? (v(), W(Xe, {
        key: 0,
        onHidden: m[1] || (m[1] = (p) => i.value = ""),
        error: u.value
      }, {
        default: Z(() => [
          Q(b(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : q("", !0)
    ]));
  }
}, sv = { class: "vuefinder__default-preview" }, ov = { class: "vuefinder__default-preview__header" }, rv = ["title"], av = /* @__PURE__ */ a("div", null, null, -1), lv = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e;
    return xe(() => {
      r("success");
    }), (s, l) => (v(), g("div", sv, [
      a("div", ov, [
        a("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: o(n).modal.data.item.path
        }, b(o(n).modal.data.item.basename), 9, rv)
      ]),
      av
    ]));
  }
}, iv = { class: "vuefinder__video-preview" }, cv = ["title"], dv = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, uv = ["src"], _v = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return xe(() => {
      r("success");
    }), (l, c) => (v(), g("div", iv, [
      a("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, cv),
      a("div", null, [
        a("video", dv, [
          a("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, uv),
          Q(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, vv = { class: "vuefinder__audio-preview" }, fv = ["title"], mv = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, hv = ["src"], pv = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = re("ServiceContainer"), s = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return xe(() => {
      n("success");
    }), (l, c) => (v(), g("div", vv, [
      a("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(r).modal.data.item.path
      }, b(o(r).modal.data.item.basename), 9, fv),
      a("div", null, [
        a("audio", mv, [
          a("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, hv),
          Q(" Your browser does not support the audio element. ")
        ])
      ])
    ]));
  }
}, gv = { class: "vuefinder__pdf-preview" }, bv = ["title"], wv = ["data"], yv = ["src"], $v = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return xe(() => {
      r("success");
    }), (l, c) => (v(), g("div", gv, [
      a("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, bv),
      a("div", null, [
        a("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          a("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, yv)
        ], 8, wv)
      ])
    ]));
  }
}, kv = { class: "vuefinder__preview-modal__content" }, xv = { key: 0 }, Sv = { class: "vuefinder__preview-modal__loading" }, Cv = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Ev = /* @__PURE__ */ a("svg", {
  class: "vuefinder__preview-modal__spinner",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ a("circle", {
    class: "vuefinder__preview-modal__spinner-circle",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ a("path", {
    class: "vuefinder__preview-modal__spinner-path",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), Tv = { class: "vuefinder__preview-modal__details" }, Mv = { class: "font-bold" }, Av = { class: "font-bold pl-2" }, Dv = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Vv = ["download", "href"], Po = {
  __name: "ModalPreview",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(!1), s = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), l = e.features.includes(de.PREVIEW);
    return l || (r.value = !0), (c, d) => (v(), W(Ye, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: d[6] || (d[6] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(de).DOWNLOAD) ? (v(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, b(o(n)("Download")), 9, Vv)) : q("", !0)
      ]),
      default: Z(() => [
        a("div", null, [
          a("div", kv, [
            o(l) ? (v(), g("div", xv, [
              s("text") ? (v(), W(Y_, {
                key: 0,
                onSuccess: d[0] || (d[0] = (i) => r.value = !0)
              })) : s("image") ? (v(), W(nv, {
                key: 1,
                onSuccess: d[1] || (d[1] = (i) => r.value = !0)
              })) : s("video") ? (v(), W(_v, {
                key: 2,
                onSuccess: d[2] || (d[2] = (i) => r.value = !0)
              })) : s("audio") ? (v(), W(pv, {
                key: 3,
                onSuccess: d[3] || (d[3] = (i) => r.value = !0)
              })) : s("application/pdf") ? (v(), W($v, {
                key: 4,
                onSuccess: d[4] || (d[4] = (i) => r.value = !0)
              })) : (v(), W(lv, {
                key: 5,
                onSuccess: d[5] || (d[5] = (i) => r.value = !0)
              }))
            ])) : q("", !0),
            a("div", Sv, [
              r.value === !1 ? (v(), g("div", Cv, [
                Ev,
                a("span", null, b(o(n)("Loading")), 1)
              ])) : q("", !0)
            ])
          ])
        ]),
        a("div", Tv, [
          a("div", null, [
            a("span", Mv, b(o(n)("File Size")) + ": ", 1),
            Q(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", Av, b(o(n)("Last Modified")) + ": ", 1),
            Q(" " + b(o(qo)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(de).DOWNLOAD) ? (v(), g("div", Dv, [
          a("span", null, b(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : q("", !0)
      ]),
      _: 1
    }));
  }
}, Ov = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Lv = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Fv = /* @__PURE__ */ a("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1), Rv = [
  Lv,
  Fv
];
function Iv(t, e) {
  return v(), g("svg", Ov, [...Rv]);
}
const zo = { render: Iv }, Hv = ["data-type", "data-item", "data-index"], Mn = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = e.dragSelect, r = t, s = (m) => {
      m.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: m.path } })) : e.modal.open(Po, { adapter: e.fs.adapter, item: m });
    }, l = {
      mounted(m, p, y, k) {
        y.props.draggable && (m.addEventListener("dragstart", (T) => c(T, p.value)), m.addEventListener("dragover", (T) => i(T, p.value)), m.addEventListener("drop", (T) => d(T, p.value)));
      },
      beforeUnmount(m, p, y, k) {
        y.props.draggable && (m.removeEventListener("dragstart", c), m.removeEventListener("dragover", i), m.removeEventListener("drop", d));
      }
    }, c = (m, p) => {
      if (m.altKey || m.ctrlKey || m.metaKey)
        return m.preventDefault(), !1;
      n.isDraggingRef.value = !0, m.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), m.dataTransfer.effectAllowed = "all", m.dataTransfer.dropEffect = "copy", m.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (m, p) => {
      m.preventDefault(), n.isDraggingRef.value = !1;
      let y = JSON.parse(m.dataTransfer.getData("items"));
      if (y.find((k) => k.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Kn, { items: { from: y, to: p } });
    }, i = (m, p) => {
      m.preventDefault(), !p || p.type !== "dir" || n.getSelection().find((y) => y === m.currentTarget) ? (m.dataTransfer.dropEffect = "none", m.dataTransfer.effectAllowed = "none") : m.dataTransfer.dropEffect = "copy";
    };
    let u = null, f = !1;
    const _ = () => {
      u && clearTimeout(u);
    }, h = (m) => {
      if (!f)
        f = !0, setTimeout(() => f = !1, 300);
      else
        return f = !1, s(r.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const p = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: m.target.getBoundingClientRect().x,
          clientY: m.target.getBoundingClientRect().y
        });
        m.target.dispatchEvent(p);
      }, 500);
    };
    return (m, p) => ue((v(), g("div", {
      style: ln({ opacity: o(n).isDraggingRef.value && o(n).getSelection().find((y) => m.$el === y) ? "0.5 !important" : "" }),
      class: ae(["vuefinder__item", "vf-item-" + o(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: p[0] || (p[0] = (y) => s(t.item)),
      onTouchstart: p[1] || (p[1] = (y) => h(y)),
      onTouchend: p[2] || (p[2] = (y) => _()),
      onContextmenu: p[3] || (p[3] = et((y) => o(e).emitter.emit("vf-contextmenu-show", { event: y, items: o(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Dt(m.$slots, "default"),
      o(e).pinnedFolders.find((y) => y.path === t.item.path) ? (v(), W(o(zo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : q("", !0)
    ], 46, Hv)), [
      [l, t.item]
    ]);
  }
}, Bv = { class: "vuefinder__explorer__container" }, Nv = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Uv = { class: "vuefinder__explorer__drag-item" }, qv = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, Pv = { class: "vuefinder__explorer__item-list-content" }, zv = { class: "vuefinder__explorer__item-list-name" }, jv = { class: "vuefinder__explorer__item-name" }, Gv = { class: "vuefinder__explorer__item-path" }, Kv = { class: "vuefinder__explorer__item-list-content" }, Wv = { class: "vuefinder__explorer__item-list-name" }, Yv = { class: "vuefinder__explorer__item-name" }, Xv = { class: "vuefinder__explorer__item-size" }, Qv = { class: "vuefinder__explorer__item-date" }, Jv = { class: "vuefinder__explorer__item-grid-content" }, Zv = ["data-src", "alt"], ef = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, tf = { class: "vuefinder__explorer__item-title break-all" }, nf = {
  __name: "Explorer",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = (_) => _ == null ? void 0 : _.substring(0, 3), s = A(null), l = A(""), c = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      c.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      l.value = _, _ ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: _
        },
        onSuccess: (h) => {
          h.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const i = kt({ active: !1, column: "", order: "" }), u = (_ = !0) => {
      let h = [...e.fs.data.files], m = i.column, p = i.order === "asc" ? 1 : -1;
      if (!_)
        return h;
      const y = (k, T) => typeof k == "string" && typeof T == "string" ? k.toLowerCase().localeCompare(T.toLowerCase()) : k < T ? -1 : k > T ? 1 : 0;
      return i.active && (h = h.slice().sort((k, T) => y(k[m], T[m]) * p)), h;
    }, f = (_) => {
      i.active && i.column === _ ? (i.active = i.order === "asc", i.column = _, i.order = "desc") : (i.active = !0, i.column = _, i.order = "asc");
    };
    return xe(() => {
      d = new hr(c.area.value);
    }), Rs(() => {
      d.update();
    }), Hs(() => {
      d.destroy();
    }), (_, h) => (v(), g("div", Bv, [
      o(e).view === "list" || l.value.length ? (v(), g("div", Nv, [
        a("div", {
          onClick: h[0] || (h[0] = (m) => f("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Q(b(o(n)("Name")) + " ", 1),
          ue(P(Wt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Pe, i.active && i.column === "basename"]
          ])
        ]),
        l.value.length ? q("", !0) : (v(), g("div", {
          key: 0,
          onClick: h[1] || (h[1] = (m) => f("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Q(b(o(n)("Size")) + " ", 1),
          ue(P(Wt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Pe, i.active && i.column === "file_size"]
          ])
        ])),
        l.value.length ? q("", !0) : (v(), g("div", {
          key: 1,
          onClick: h[2] || (h[2] = (m) => f("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Q(b(o(n)("Date")) + " ", 1),
          ue(P(Wt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Pe, i.active && i.column === "last_modified"]
          ])
        ])),
        l.value.length ? (v(), g("div", {
          key: 2,
          onClick: h[3] || (h[3] = (m) => f("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          Q(b(o(n)("Filepath")) + " ", 1),
          ue(P(Wt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Pe, i.active && i.column === "path"]
          ])
        ])) : q("", !0)
      ])) : q("", !0),
      a("div", Uv, [
        P(q_, {
          ref_key: "dragImage",
          ref: s,
          count: o(c).getCount()
        }, null, 8, ["count"])
      ]),
      a("div", {
        ref: o(c).scrollBarContainer,
        class: ae(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": o(e).view === "grid" }, { "search-active": l.value.length }]])
      }, [
        a("div", {
          ref: o(c).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      a("div", {
        ref: o(c).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area min-h-32",
        onContextmenu: h[4] || (h[4] = et((m) => o(e).emitter.emit("vf-contextmenu-show", { event: m, items: o(c).getSelected() }), ["self", "prevent"]))
      }, [
        o(e).loadingIndicator === "linear" && o(e).fs.loading ? (v(), g("div", qv)) : q("", !0),
        l.value.length ? (v(!0), g(ge, { key: 1 }, ke(u(), (m, p) => (v(), W(Mn, {
          item: m,
          index: p,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: Z(() => [
            a("div", Pv, [
              a("div", zv, [
                P(Tn, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", jv, b(m.basename), 1)
              ]),
              a("div", Gv, b(m.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0),
        o(e).view === "list" && !l.value.length ? (v(!0), g(ge, { key: 2 }, ke(u(), (m, p) => (v(), W(Mn, {
          item: m,
          index: p,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: m.path
        }, {
          default: Z(() => [
            a("div", Kv, [
              a("div", Wv, [
                P(Tn, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", Yv, b(m.basename), 1)
              ]),
              a("div", Xv, b(m.file_size ? o(e).filesize(m.file_size) : ""), 1),
              a("div", Qv, b(o(qo)(m.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : q("", !0),
        o(e).view === "grid" && !l.value.length ? (v(!0), g(ge, { key: 3 }, ke(u(!1), (m, p) => (v(), W(Mn, {
          item: m,
          index: p,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: Z(() => [
            a("div", null, [
              a("div", Jv, [
                (m.mime_type ?? "").startsWith("image") && o(e).showThumbnails ? (v(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": o(e).requester.getPreviewUrl(o(e).fs.adapter, m),
                  alt: m.basename,
                  key: m.path
                }, null, 8, Zv)) : (v(), W(Tn, {
                  key: 1,
                  type: m.type
                }, null, 8, ["type"])),
                !((m.mime_type ?? "").startsWith("image") && o(e).showThumbnails) && m.type !== "dir" ? (v(), g("div", ef, b(r(m.extension)), 1)) : q("", !0)
              ]),
              a("span", tf, b(o(Gn)(m.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0)
      ], 544),
      P(g_)
    ]));
  }
}, sf = ["href", "download"], of = ["onClick"], rf = {
  __name: "ContextMenu",
  setup(t) {
    const e = re("ServiceContainer"), n = A(null), r = A([]), s = A(""), l = kt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    });
    e.emitter.on("vf-context-selected", (u) => {
      r.value = u;
    });
    const c = (u) => u.link(e, r), d = (u) => {
      e.emitter.emit("vf-contextmenu-hide"), u.action(e, r);
    };
    e.emitter.on("vf-search-query", ({ newQuery: u }) => {
      s.value = u;
    }), e.emitter.on("vf-contextmenu-show", ({ event: u, items: f, target: _ = null }) => {
      if (l.items = e.contextMenuItems.filter((h) => h.show(e, {
        searchQuery: s.value,
        items: f,
        target: _
      })), s.value)
        if (_)
          e.emitter.emit("vf-context-selected", [_]);
        else
          return;
      else !_ && !s.value ? e.emitter.emit("vf-context-selected", []) : f.length > 1 && f.some((h) => h.path === _.path) ? e.emitter.emit("vf-context-selected", f) : e.emitter.emit("vf-context-selected", [_]);
      i(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      l.active = !1;
    });
    const i = (u) => {
      const f = e.dragSelect.area.value, _ = e.root.getBoundingClientRect(), h = f.getBoundingClientRect();
      let m = u.clientX - _.left, p = u.clientY - _.top;
      l.active = !0, dt(() => {
        var R;
        const y = (R = n.value) == null ? void 0 : R.getBoundingClientRect();
        let k = (y == null ? void 0 : y.height) ?? 0, T = (y == null ? void 0 : y.width) ?? 0;
        m = h.right - u.pageX + window.scrollX < T ? m - T : m, p = h.bottom - u.pageY + window.scrollY < k ? p - k : p, l.positions = {
          left: m + "px",
          top: p + "px"
        };
      });
    };
    return (u, f) => ue((v(), g("ul", {
      ref_key: "contextmenu",
      ref: n,
      style: ln(l.positions),
      class: "vuefinder__context-menu"
    }, [
      (v(!0), g(ge, null, ke(l.items, (_) => (v(), g("li", {
        class: "vuefinder__context-menu__item",
        key: _.title
      }, [
        _.link ? (v(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: c(_),
          download: c(_),
          onClick: f[0] || (f[0] = (h) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, b(_.title(o(e).i18n)), 1)
        ], 8, sf)) : (v(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => d(_)
        }, [
          a("span", null, b(_.title(o(e).i18n)), 1)
        ], 8, of))
      ]))), 128))
    ], 4)), [
      [Pe, l.active]
    ]);
  }
}, af = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, lf = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), cf = [
  lf
];
function df(t, e) {
  return v(), g("svg", af, [...cf]);
}
const jo = { render: df }, uf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, _f = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), vf = [
  _f
];
function ff(t, e) {
  return v(), g("svg", uf, [...vf]);
}
const mf = { render: ff }, hf = { class: "vuefinder__status-bar__wrapper" }, pf = { class: "vuefinder__status-bar__storage" }, gf = ["title"], bf = { class: "vuefinder__status-bar__storage-icon" }, wf = ["value"], yf = { class: "vuefinder__status-bar__info" }, $f = { key: 0 }, kf = { class: "vuefinder__status-bar__selected-count" }, xf = { class: "vuefinder__status-bar__actions" }, Sf = ["disabled"], Cf = ["title"], Ef = {
  __name: "Statusbar",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { setStore: r } = e.storage, s = e.dragSelect, l = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, c = A("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      c.value = i;
    });
    const d = bt(() => {
      const i = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && i;
    });
    return (i, u) => (v(), g("div", hf, [
      a("div", pf, [
        a("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          a("div", bf, [
            P(o(jo))
          ]),
          ue(a("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (f) => o(e).fs.adapter = f),
            onChange: l,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (v(!0), g(ge, null, ke(o(e).fs.data.storages, (f) => (v(), g("option", { value: f }, b(f), 9, wf))), 256))
          ], 544), [
            [An, o(e).fs.adapter]
          ])
        ], 8, gf),
        a("div", yf, [
          c.value.length ? (v(), g("span", $f, b(o(e).fs.data.files.length) + " items found. ", 1)) : q("", !0),
          a("span", kf, b(o(e).dragSelect.getCount() > 0 ? o(n)("%s item(s) selected.", o(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      a("div", xf, [
        o(e).selectButton.active ? (v(), g("button", {
          key: 0,
          class: ae(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (f) => o(e).selectButton.click(o(s).getSelected(), f))
        }, b(o(n)("Select")), 11, Sf)) : q("", !0),
        a("span", {
          class: "vuefinder__status-bar__about",
          title: o(n)("About"),
          onClick: u[2] || (u[2] = (f) => o(e).modal.open(Do))
        }, [
          P(o(mf))
        ], 8, Cf)
      ])
    ]));
  }
}, Tf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
}, Mf = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
}, null, -1), Af = [
  Mf
];
function Df(t, e) {
  return v(), g("svg", Tf, [...Af]);
}
const Go = { render: Df }, Vf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Of = /* @__PURE__ */ a("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Lf = /* @__PURE__ */ a("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1), Ff = [
  Of,
  Lf
];
function Rf(t, e) {
  return v(), g("svg", Vf, [...Ff]);
}
const If = { render: Rf }, Hf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Bf = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Nf = /* @__PURE__ */ a("path", { d: "M15 12H9M12 9v6" }, null, -1), Uf = [
  Bf,
  Nf
];
function qf(t, e) {
  return v(), g("svg", Hf, [...Uf]);
}
const Ko = { render: qf }, Pf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, zf = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), jf = /* @__PURE__ */ a("path", { d: "M9 12h6" }, null, -1), Gf = [
  zf,
  jf
];
function Kf(t, e) {
  return v(), g("svg", Pf, [...Gf]);
}
const Wo = { render: Kf };
function Yo(t, e) {
  const n = t.findIndex((r) => r.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Wf = { class: "vuefinder__folder-loader-indicator" }, Yf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Xo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ ir({
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
    const r = Bs(t, "modelValue"), s = A(!1);
    De(
      () => r.value,
      () => {
        var d;
        return ((d = l()) == null ? void 0 : d.folders.length) || c();
      }
    );
    function l() {
      return n.treeViewData.find((d) => d.path === e.path);
    }
    const c = () => {
      s.value = !0, n.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((d) => {
        Yo(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, i) => {
      var u;
      return v(), g("div", Wf, [
        s.value ? (v(), W(o(us), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (v(), g("div", Yf, [
          r.value && ((u = l()) != null && u.folders.length) ? (v(), W(o(Wo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : q("", !0),
          r.value ? q("", !0) : (v(), W(o(Ko), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Xf = { class: "vuefinder__treesubfolderlist__item-content" }, Qf = ["onClick"], Jf = ["title", "onClick"], Zf = { class: "vuefinder__treesubfolderlist__item-icon" }, em = { class: "vuefinder__treesubfolderlist__subfolder" }, tm = {
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
    const e = re("ServiceContainer"), n = A([]), r = t, s = A(null);
    xe(() => {
      r.path === r.adapter + "://" && Ke(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const l = bt(() => {
      var c;
      return ((c = e.treeViewData.find((d) => d.path === r.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, d) => {
      const i = cr("TreeSubfolderList", !0);
      return v(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (v(!0), g(ge, null, ke(l.value, (u, f) => (v(), g("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          a("div", Xf, [
            a("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (_) => n.value[u.path] = !n.value[u.path]
            }, [
              P(Xo, {
                adapter: t.adapter,
                path: u.path,
                modelValue: n.value[u.path],
                "onUpdate:modelValue": (_) => n.value[u.path] = _
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Qf),
            a("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (_) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r.adapter, path: u.path } })
            }, [
              a("div", Zf, [
                o(e).fs.path === u.path ? (v(), W(o(Go), { key: 0 })) : (v(), W(o(pn), { key: 1 }))
              ]),
              a("div", {
                class: ae(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(e).fs.path === u.path
                }])
              }, b(u.basename), 3)
            ], 8, Jf)
          ]),
          a("div", em, [
            ue(P(i, {
              adapter: r.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [Pe, n.value[u.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, nm = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, r = A(!1);
    function s(l) {
      l === e.fs.adapter ? r.value = !r.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: l } }), n("adapter", l));
    }
    return (l, c) => (v(), g(ge, null, [
      a("div", {
        onClick: c[2] || (c[2] = (d) => s(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        a("div", {
          class: ae(["vuefinder__treestorageitem__info", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          a("div", {
            class: ae(["vuefinder__treestorageitem__icon", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            P(o(jo))
          ], 2),
          a("div", null, b(t.storage), 1)
        ], 2),
        a("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: c[1] || (c[1] = et((d) => r.value = !r.value, ["stop"]))
        }, [
          P(Xo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: r.value,
            "onUpdate:modelValue": c[0] || (c[0] = (d) => r.value = d)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ue(P(tm, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [Pe, r.value]
      ])
    ], 64));
  }
}, sm = { class: "vuefinder__folder-indicator" }, om = { class: "vuefinder__folder-indicator--icon" }, rm = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Bs(t, "modelValue");
    return (n, r) => (v(), g("div", sm, [
      a("div", om, [
        e.value ? (v(), W(o(Wo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : q("", !0),
        e.value ? q("", !0) : (v(), W(o(Ko), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, am = { class: "vuefinder__treeview__header" }, lm = { class: "vuefinder__treeview__pinned-label" }, im = { class: "vuefinder__treeview__pin-text text-nowrap" }, cm = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, dm = { class: "vuefinder__treeview__pinned-item" }, um = ["onClick"], _m = ["title"], vm = ["onClick"], fm = { key: 0 }, mm = { class: "vuefinder__treeview__no-pinned" }, hm = { class: "vuefinder__treeview__storage" }, pm = {
  __name: "TreeView",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { getStore: r, setStore: s } = e.storage, l = A(190), c = A(r("pinned-folders-opened", !0));
    De(c, (f) => s("pinned-folders-opened", f));
    const d = (f) => {
      e.pinnedFolders = e.pinnedFolders.filter((_) => _.path !== f.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (f) => {
      const _ = f.clientX, h = f.target.parentElement, m = h.getBoundingClientRect().width;
      h.classList.remove("transition-[width]"), h.classList.add("transition-none");
      const p = (k) => {
        l.value = m + k.clientX - _, l.value < 50 && (l.value = 0, e.showTreeView = !1), l.value > 50 && (e.showTreeView = !0);
      }, y = () => {
        const k = h.getBoundingClientRect();
        l.value = k.width, h.classList.add("transition-[width]"), h.classList.remove("transition-none"), window.removeEventListener("mousemove", p), window.removeEventListener("mouseup", y);
      };
      window.addEventListener("mousemove", p), window.addEventListener("mouseup", y);
    }, u = A(null);
    return xe(() => {
      Ke(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), De(e.fs.data, (f, _) => {
      const h = f.files.filter((m) => m.type === "dir");
      Yo(e.treeViewData, { path: e.fs.path, folders: h.map((m) => ({
        adapter: m.storage,
        path: m.path,
        basename: m.basename
      })) });
    }), (f, _) => (v(), g(ge, null, [
      a("div", {
        onClick: _[0] || (_[0] = (h) => o(e).showTreeView = !o(e).showTreeView),
        class: ae(["vuefinder__treeview__overlay", o(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      a("div", {
        style: ln(o(e).showTreeView ? "min-width:100px;max-width:75%; width: " + l.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        a("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          a("div", am, [
            a("div", {
              onClick: _[2] || (_[2] = (h) => c.value = !c.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              a("div", lm, [
                P(o(zo), { class: "vuefinder__treeview__pin-icon" }),
                a("div", im, b(o(n)("Pinned Folders")), 1)
              ]),
              P(rm, {
                modelValue: c.value,
                "onUpdate:modelValue": _[1] || (_[1] = (h) => c.value = h)
              }, null, 8, ["modelValue"])
            ]),
            c.value ? (v(), g("ul", cm, [
              (v(!0), g(ge, null, ke(o(e).pinnedFolders, (h) => (v(), g("li", dm, [
                a("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (m) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: h.storage, path: h.path } })
                }, [
                  o(e).fs.path !== h.path ? (v(), W(o(pn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : q("", !0),
                  o(e).fs.path === h.path ? (v(), W(o(Go), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : q("", !0),
                  a("div", {
                    title: h.path,
                    class: ae(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": o(e).fs.path === h.path
                    }])
                  }, b(h.basename), 11, _m)
                ], 8, um),
                a("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (m) => d(h)
                }, [
                  P(o(If), { class: "vuefinder__treeview__remove-icon" })
                ], 8, vm)
              ]))), 256)),
              o(e).pinnedFolders.length ? q("", !0) : (v(), g("li", fm, [
                a("div", mm, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : q("", !0)
          ]),
          (v(!0), g(ge, null, ke(o(e).fs.data.storages, (h) => (v(), g("div", hm, [
            P(nm, { storage: h }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        a("div", {
          onMousedown: i,
          class: ae([(o(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
};
class gm {
  /**
   * 
   * @param {Item['title']} title 
   * @param {Item['action']} action 
   * @param {Item['link']} link
   * @param {Partial<SimpleItemOptions>} options 
   */
  constructor(e, n, r, s) {
    this.title = e, this.action = n, this.link = r, this.options = Object.assign(
      {
        needsSearchQuery: !1,
        target: "one"
      },
      s
    );
  }
  /**
   * @type {Item['show']}
   */
  show(e, n) {
    var s, l;
    const r = (c) => c.items.length > 1 && c.items.some((d) => {
      var i;
      return d.path === ((i = c.target) == null ? void 0 : i.path);
    }) ? "many" : c.target ? "one" : null;
    return !(this.options.needsSearchQuery !== !!n.searchQuery || this.options.target !== void 0 && this.options.target !== r(n) || this.options.targetType !== void 0 && this.options.targetType !== ((s = n.target) == null ? void 0 : s.type) || this.options.mimeType !== void 0 && this.options.mimeType !== ((l = n.target) == null ? void 0 : l.mime_type) || this.options.feature !== void 0 && !e.features.includes(this.options.feature) || this.options.show !== void 0 && !this.options.show(e, n));
  }
}
function Be(t, e) {
  return t.map((n) => new gm(n.title, n.action, n.link, {
    ...e,
    feature: n.key
  }));
}
const Te = {
  newfolder: {
    key: de.NEW_FOLDER,
    title: ({ t }) => t("New Folder"),
    action: (t) => t.modal.open(Fo)
  },
  selectAll: {
    title: ({ t }) => t("Select All"),
    action: (t) => t.dragSelect.selectAll()
  },
  pinFolder: {
    title: ({ t }) => t("Pin Folder"),
    action: (t, e) => {
      t.pinnedFolders = t.pinnedFolders.concat(e.value), t.storage.setStore("pinned-folders", t.pinnedFolders);
    }
  },
  unpinFolder: {
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      t.pinnedFolders = t.pinnedFolders.filter((n) => !e.value.find((r) => r.path === n.path)), t.storage.setStore("pinned-folders", t.pinnedFolders);
    }
  },
  delete: {
    key: de.DELETE,
    title: ({ t }) => t("Delete"),
    action: (t, e) => {
      t.modal.open(cs, { items: e });
    }
  },
  refresh: {
    title: ({ t }) => t("Refresh"),
    action: (t) => {
      t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } });
    }
  },
  preview: {
    key: de.PREVIEW,
    title: ({ t }) => t("Preview"),
    action: (t, e) => t.modal.open(Po, { adapter: t.fs.adapter, item: e.value[0] })
  },
  open: {
    title: ({ t }) => t("Open"),
    action: (t, e) => {
      t.emitter.emit("vf-search-exit"), t.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: t.fs.adapter,
          path: e.value[0].path
        }
      });
    }
  },
  openDir: {
    title: ({ t }) => t("Open containing folder"),
    action: (t, e) => {
      t.emitter.emit("vf-search-exit"), t.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: t.fs.adapter,
          path: e.value[0].dir
        }
      });
    }
  },
  download: {
    key: de.DOWNLOAD,
    link: (t, e) => t.requester.getDownloadUrl(t.fs.adapter, e.value[0]),
    title: ({ t }) => t("Download"),
    action: () => {
    }
  },
  archive: {
    key: de.ARCHIVE,
    title: ({ t }) => t("Archive"),
    action: (t, e) => t.modal.open(Uo, { items: e })
  },
  unarchive: {
    key: de.UNARCHIVE,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(Bo, { items: e })
  },
  rename: {
    key: de.RENAME,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(ds, { items: e })
  }
}, bm = [
  ...Be([Te.openDir], {
    needsSearchQuery: !0
  }),
  ...Be([Te.refresh, Te.selectAll, Te.newfolder], {
    target: null
  }),
  ...Be([Te.refresh, Te.archive, Te.delete], {
    target: "many"
  }),
  ...Be([Te.open], {
    targetType: "dir"
  }),
  ...Be([Te.unpinFolder], {
    targetType: "dir",
    show: (t, e) => t.pinnedFolders.findIndex((n) => {
      var r;
      return n.path === ((r = e.target) == null ? void 0 : r.path);
    }) !== -1
  }),
  ...Be([Te.pinFolder], {
    targetType: "dir",
    show: (t, e) => t.pinnedFolders.findIndex((n) => {
      var r;
      return n.path === ((r = e.target) == null ? void 0 : r.path);
    }) === -1
  }),
  ...Be([Te.preview, Te.download], {
    show: (t, e) => {
      var n;
      return ((n = e.target) == null ? void 0 : n.type) !== "dir";
    }
  }),
  ...Be([Te.rename], { numItems: "one" }),
  ...Be([Te.unarchive], {
    mimeType: "application/zip"
  }),
  ...Be([Te.archive], {
    show: (t, e) => {
      var n;
      return ((n = e.target) == null ? void 0 : n.mime_type) !== "application/zip";
    }
  }),
  ...Be([Te.delete], {})
], wm = { class: "vuefinder__main__content" }, ym = {
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
    },
    contextMenuItems: {
      type: Array,
      default: () => bm
    }
  },
  emits: ["select", "update:path"],
  setup(t, { emit: e }) {
    const n = e, r = t, s = Va(r, re("VueFinderOptions"));
    dr("ServiceContainer", s);
    const { setStore: l } = s.storage, c = A(null);
    s.root = c;
    const d = s.dragSelect;
    Ii(s);
    const i = (_) => {
      Object.assign(s.fs.data, _), d.clearSelection(), d.refreshSelection();
    };
    let u;
    s.emitter.on("vf-fetch-abort", () => {
      u.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: _, body: h = null, onSuccess: m = null, onError: p = null, noCloseModal: y = !1 }) => {
      ["index", "search"].includes(_.q) && (u && u.abort(), s.fs.loading = !0), u = new AbortController();
      const k = u.signal;
      s.requester.send({
        url: "",
        method: _.m || "get",
        params: _,
        body: h,
        abortSignal: k
      }).then((T) => {
        s.fs.adapter = T.adapter, s.persist && (s.fs.path = T.dirname, l("path", s.fs.path)), y || s.modal.close(), i(T), m && m(T);
      }).catch((T) => {
        console.error(T), p && p(T);
      }).finally(() => {
        ["index", "search"].includes(_.q) && (s.fs.loading = !1);
      });
    });
    function f(_) {
      let h = {};
      _ && _.includes("://") && (h = {
        adapter: _.split("://")[0],
        path: _
      }), s.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: s.fs.adapter, ...h },
        onError: r.onError ?? ((m) => {
          m.message && s.emitter.emit("vf-toast-push", { label: m.message, type: "error" });
        })
      });
    }
    return xe(() => {
      f(s.fs.path), De(() => r.path, (_) => {
        f(_);
      }), d.onSelect((_) => {
        n("select", _);
      }), De(() => s.fs.data.dirname, (_) => {
        n("update:path", _);
      });
    }), (_, h) => (v(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: c,
      tabindex: "0"
    }, [
      a("div", {
        class: ae(o(s).theme.actualValue)
      }, [
        a("div", {
          class: ae([o(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: ln(o(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: h[0] || (h[0] = (m) => o(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (m) => o(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          P(Bd),
          P(h_),
          a("div", wm, [
            P(pm),
            P(nf)
          ]),
          P(Ef)
        ], 38),
        P(ur, { name: "fade" }, {
          default: Z(() => [
            o(s).modal.visible ? (v(), W(Is(o(s).modal.type), { key: 0 })) : q("", !0)
          ]),
          _: 1
        }),
        P(rf)
      ], 2)
    ], 512));
  }
}, Dm = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", ym);
  }
};
export {
  gm as SimpleContextMenuItem,
  bm as contextMenuItems,
  Dm as default
};
