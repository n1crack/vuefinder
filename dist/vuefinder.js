var nr = Object.defineProperty;
var sr = (t, e, n) => e in t ? nr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Sn = (t, e, n) => sr(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as kt, watch as De, ref as A, shallowRef as or, onMounted as Ce, onUnmounted as Yn, onUpdated as Hs, nextTick as dt, computed as gt, inject as re, openBlock as _, createElementBlock as g, withKeys as xt, unref as o, createElementVNode as l, withModifiers as et, renderSlot as At, normalizeClass as le, toDisplayString as b, createBlock as W, resolveDynamicComponent as Rs, withCtx as J, createVNode as q, Fragment as be, renderList as ke, createCommentVNode as B, withDirectives as ue, vModelCheckbox as Wt, createTextVNode as Z, vModelSelect as Dn, vModelText as St, onBeforeUnmount as Bs, customRef as rr, vShow as qe, isRef as lr, TransitionGroup as ar, normalizeStyle as dn, mergeModels as ir, useModel as Us, resolveComponent as cr, provide as dr, Transition as ur } from "vue";
import vr from "mitt";
import _r from "dragselect";
import fr from "@uppy/core";
import mr from "@uppy/xhr-upload";
import pr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import hr from "cropperjs";
var Is;
const $n = (Is = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Is.getAttribute("content");
class gr {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    Sn(this, "config");
    Sn(this, "customFetch", async (...e) => {
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
    $n != null && $n !== "" && (r[n.xsrfHeaderName] = $n);
    const s = Object.assign({}, n.headers, r, e.headers), a = Object.assign({}, n.params, e.params), c = e.body, d = n.baseUrl + e.url, i = e.method;
    let u;
    i !== "get" && (c instanceof FormData ? (u = c, n.body != null && Object.entries(this.config.body).forEach(([v, p]) => {
      u.append(v, p);
    })) : (u = { ...c }, n.body != null && Object.assign(u, this.config.body)));
    const f = {
      url: d,
      method: i,
      headers: s,
      params: a,
      body: u
    };
    if (n.transformRequest != null) {
      const v = n.transformRequest({
        url: d,
        method: i,
        headers: s,
        params: a,
        body: u
      });
      v.url != null && (f.url = v.url), v.method != null && (f.method = v.method), v.params != null && (f.params = v.params ?? {}), v.headers != null && (f.headers = v.headers ?? {}), v.body != null && (f.body = v.body);
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
    }, a = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let d;
      n.body instanceof FormData ? d = e.body : (d = JSON.stringify(n.body), s.headers["Content-Type"] = "application/json"), s.body = d;
    }
    this.config.fetchParams && Object.assign(s, this.config.fetchParams);
    const c = await this.customFetch(a, s);
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
  function a(i) {
    delete n[i];
  }
  function c() {
    Object.keys(n).map((i) => a(i));
  }
  return { getStore: (i, u = null) => n.hasOwnProperty(i) ? n[i] : u, setStore: s, removeStore: a, clearStore: c };
}
async function yr(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function kr(t, e, n, r) {
  const { getStore: s, setStore: a } = t, c = A({}), d = A(s("locale", e)), i = (v, p = e) => {
    yr(v, r).then((m) => {
      c.value = m, a("locale", v), d.value = v, a("translations", m), Object.values(r).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + v }), n.emit("vf-language-saved"));
    }).catch((m) => {
      p ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), i(p, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  De(d, (v) => {
    i(v);
  }), !s("locale") && !r.length ? i(e) : c.value = s("translations");
  const u = (v, ...p) => p.length ? u(v = v.replace("%s", p.shift()), ...p) : v;
  function f(v, ...p) {
    return c.value && c.value.hasOwnProperty(v) ? u(c.value[v], ...p) : u(v, ...p);
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
}, xr = Object.values(de), Sr = "2.7.0";
function Ns(t, e, n, r, s) {
  return (e = Math, n = e.log, r = 1024, s = n(t) / n(r) | 0, t / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Ps(t, e, n, r, s) {
  return (e = Math, n = e.log, r = 1e3, s = n(t) / n(r) | 0, t / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function $r(t) {
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
  const s = window.matchMedia("(prefers-color-scheme: dark)"), a = (c) => {
    n.value === ot.DARK || n.value === ot.SYSTEM && c.matches ? r.value = ot.DARK : r.value = ot.LIGHT;
  };
  return a(s), s.addEventListener("change", a), {
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
      n.value = c, c !== ot.SYSTEM ? t.setStore("theme", c) : t.removeStore("theme"), a(s);
    }
  };
}
function Er() {
  const t = or(null), e = A(!1), n = A();
  return { visible: e, type: t, data: n, open: (a, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = a, n.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  } };
}
/*!
 * OverlayScrollbars
 * Version: 2.10.1
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const Le = (t, e) => {
  const { o: n, i: r, u: s } = t;
  let a = n, c;
  const d = (f, v) => {
    const p = a, m = f, h = v || (r ? !r(p, m) : p !== m);
    return (h || s) && (a = m, c = p), [a, h, c];
  };
  return [e ? (f) => d(e(a, c), f) : d, (f) => [a, !!f, c]];
}, Tr = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Ve = Tr ? window : {}, qs = Math.max, Mr = Math.min, Vn = Math.round, tn = Math.abs, ps = Math.sign, zs = Ve.cancelAnimationFrame, Xn = Ve.requestAnimationFrame, nn = Ve.setTimeout, Ln = Ve.clearTimeout, un = (t) => typeof Ve[t] < "u" ? Ve[t] : void 0, Ar = un("MutationObserver"), hs = un("IntersectionObserver"), sn = un("ResizeObserver"), Zt = un("ScrollTimeline"), Zn = (t) => t === void 0, vn = (t) => t === null, je = (t) => typeof t == "number", Ot = (t) => typeof t == "string", Jn = (t) => typeof t == "boolean", Re = (t) => typeof t == "function", Ge = (t) => Array.isArray(t), on = (t) => typeof t == "object" && !Ge(t) && !vn(t), Qn = (t) => {
  const e = !!t && t.length, n = je(e) && e > -1 && e % 1 == 0;
  return Ge(t) || !Re(t) && n ? e > 0 && on(t) ? e - 1 in t : !0 : !1;
}, rn = (t) => !!t && t.constructor === Object, ln = (t) => t instanceof HTMLElement, _n = (t) => t instanceof Element;
function ae(t, e) {
  if (Qn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && ae(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const js = (t, e) => t.indexOf(e) >= 0, Dt = (t, e) => t.concat(e), me = (t, e, n) => (!Ot(e) && Qn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), at = (t) => Array.from(t || []), es = (t) => Ge(t) ? t : !Ot(t) && Qn(t) ? at(t) : [t], On = (t) => !!t && !t.length, Fn = (t) => at(new Set(t)), Ie = (t, e, n) => {
  ae(t, (s) => s ? s.apply(void 0, e || []) : !0), !n && (t.length = 0);
}, Gs = "paddingTop", Ws = "paddingRight", Ks = "paddingLeft", Ys = "paddingBottom", Xs = "marginLeft", Zs = "marginRight", Js = "marginBottom", Qs = "overflowX", eo = "overflowY", fn = "width", mn = "height", rt = "visible", ct = "hidden", bt = "scroll", Dr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, pn = (t, e, n, r) => {
  if (t && e) {
    let s = !0;
    return ae(n, (a) => {
      const c = t[a], d = e[a];
      c !== d && (s = !1);
    }), s;
  }
  return !1;
}, to = (t, e) => pn(t, e, ["w", "h"]), Jt = (t, e) => pn(t, e, ["x", "y"]), Vr = (t, e) => pn(t, e, ["t", "r", "b", "l"]), ut = () => {
}, X = (t, ...e) => t.bind(0, ...e), ft = (t) => {
  let e;
  const n = t ? nn : Xn, r = t ? Ln : zs;
  return [(s) => {
    r(e), e = n(() => s(), Re(t) ? t() : t);
  }, () => r(e)];
}, In = (t, e) => {
  const { _: n, p: r, v: s, S: a } = e || {};
  let c, d, i, u, f = ut;
  const v = function($) {
    f(), Ln(c), u = c = d = void 0, f = ut, t.apply(this, $);
  }, p = (x) => a && d ? a(d, x) : x, m = () => {
    f !== ut && v(p(i) || i);
  }, h = function() {
    const $ = at(arguments), T = Re(n) ? n() : n;
    if (je(T) && T >= 0) {
      const D = Re(r) ? r() : r, C = je(D) && D >= 0, V = T > 0 ? nn : Xn, F = T > 0 ? Ln : zs, O = p($) || $, w = v.bind(0, O);
      let y;
      f(), s && !u ? (w(), u = !0, y = V(() => u = void 0, T)) : (y = V(w, T), C && !c && (c = nn(m, D))), f = () => F(y), d = i = O;
    } else
      v($);
  };
  return h.m = m, h;
}, no = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Ue = (t) => t ? Object.keys(t) : [], oe = (t, e, n, r, s, a, c) => {
  const d = [e, n, r, s, a, c];
  return (typeof t != "object" || vn(t)) && !Re(t) && (t = {}), ae(d, (i) => {
    ae(i, (u, f) => {
      const v = i[f];
      if (t === v)
        return !0;
      const p = Ge(v);
      if (v && rn(v)) {
        const m = t[f];
        let h = m;
        p && !Ge(m) ? h = [] : !p && !rn(m) && (h = {}), t[f] = oe(h, v);
      } else
        t[f] = p ? v.slice() : v;
    });
  }), t;
}, so = (t, e) => ae(oe({}, t), (n, r, s) => {
  n === void 0 ? delete s[r] : n && rn(n) && (s[r] = so(n));
}), ts = (t) => !Ue(t).length, oo = (t, e, n) => qs(t, Mr(e, n)), vt = (t) => Fn((Ge(t) ? t : (t || "").split(" ")).filter((e) => e)), ns = (t, e) => t && t.getAttribute(e), gs = (t, e) => t && t.hasAttribute(e), Je = (t, e, n) => {
  ae(vt(e), (r) => {
    t && t.setAttribute(r, String(n || ""));
  });
}, Pe = (t, e) => {
  ae(vt(e), (n) => t && t.removeAttribute(n));
}, hn = (t, e) => {
  const n = vt(ns(t, e)), r = X(Je, t, e), s = (a, c) => {
    const d = new Set(n);
    return ae(vt(a), (i) => {
      d[c](i);
    }), at(d).join(" ");
  };
  return {
    O: (a) => r(s(a, "delete")),
    $: (a) => r(s(a, "add")),
    C: (a) => {
      const c = vt(a);
      return c.reduce((d, i) => d && n.includes(i), c.length > 0);
    }
  };
}, ro = (t, e, n) => (hn(t, e).O(n), X(ss, t, e, n)), ss = (t, e, n) => (hn(t, e).$(n), X(ro, t, e, n)), an = (t, e, n, r) => (r ? ss : ro)(t, e, n), os = (t, e, n) => hn(t, e).C(n), lo = (t) => hn(t, "class"), ao = (t, e) => {
  lo(t).O(e);
}, rs = (t, e) => (lo(t).$(e), X(ao, t, e)), io = (t, e) => {
  const n = e ? _n(e) && e : document;
  return n ? at(n.querySelectorAll(t)) : [];
}, Lr = (t, e) => {
  const n = e ? _n(e) && e : document;
  return n && n.querySelector(t);
}, Hn = (t, e) => _n(t) && t.matches(e), co = (t) => Hn(t, "body"), Rn = (t) => t ? at(t.childNodes) : [], Vt = (t) => t && t.parentElement, mt = (t, e) => _n(t) && t.closest(e), Bn = (t) => document.activeElement, Or = (t, e, n) => {
  const r = mt(t, e), s = t && Lr(n, r), a = mt(s, e) === r;
  return r && s ? r === t || s === t || a && mt(mt(t, n), e) !== r : !1;
}, wt = (t) => {
  ae(es(t), (e) => {
    const n = Vt(e);
    e && n && n.removeChild(e);
  });
}, Oe = (t, e) => X(wt, t && e && ae(es(e), (n) => {
  n && t.appendChild(n);
})), pt = (t) => {
  const e = document.createElement("div");
  return Je(e, "class", t), e;
}, uo = (t) => {
  const e = pt();
  return e.innerHTML = t.trim(), ae(Rn(e), (n) => wt(n));
}, bs = (t, e) => t.getPropertyValue(e) || t[e] || "", vo = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Kt = (t) => vo(parseFloat(t || "")), Un = (t) => Math.round(t * 1e4) / 1e4, _o = (t) => `${Un(vo(t))}px`;
function Lt(t, e) {
  t && e && ae(e, (n, r) => {
    try {
      const s = t.style, a = vn(n) || Jn(n) ? "" : je(n) ? _o(n) : n;
      r.indexOf("--") === 0 ? s.setProperty(r, a) : s[r] = a;
    } catch {
    }
  });
}
function tt(t, e, n) {
  const r = Ot(e);
  let s = r ? "" : {};
  if (t) {
    const a = Ve.getComputedStyle(t, n) || t.style;
    s = r ? bs(a, e) : at(e).reduce((c, d) => (c[d] = bs(a, d), c), s);
  }
  return s;
}
const ws = (t, e, n) => {
  const r = e ? `${e}-` : "", s = n ? `-${n}` : "", a = `${r}top${s}`, c = `${r}right${s}`, d = `${r}bottom${s}`, i = `${r}left${s}`, u = tt(t, [a, c, d, i]);
  return {
    t: Kt(u[a]),
    r: Kt(u[c]),
    b: Kt(u[d]),
    l: Kt(u[i])
  };
}, Fr = (t, e) => `translate${on(t) ? `(${t.x},${t.y})` : `Y(${t})`}`, Ir = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Hr = {
  w: 0,
  h: 0
}, gn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Hr, Rr = (t) => gn("inner", t || Ve), ht = X(gn, "offset"), fo = X(gn, "client"), cn = X(gn, "scroll"), ls = (t) => {
  const e = parseFloat(tt(t, fn)) || 0, n = parseFloat(tt(t, mn)) || 0;
  return {
    w: e - Vn(e),
    h: n - Vn(n)
  };
}, Cn = (t) => t.getBoundingClientRect(), Br = (t) => !!t && Ir(t), Nn = (t) => !!(t && (t[mn] || t[fn])), mo = (t, e) => {
  const n = Nn(t);
  return !Nn(e) && n;
}, ys = (t, e, n, r) => {
  ae(vt(e), (s) => {
    t && t.removeEventListener(s, n, r);
  });
}, ve = (t, e, n, r) => {
  var s;
  const a = (s = r && r.H) != null ? s : !0, c = r && r.I || !1, d = r && r.A || !1, i = {
    passive: a,
    capture: c
  };
  return X(Ie, vt(e).map((u) => {
    const f = d ? (v) => {
      ys(t, u, f, c), n && n(v);
    } : n;
    return t && t.addEventListener(u, f, i), X(ys, t, u, f, c);
  }));
}, po = (t) => t.stopPropagation(), Pn = (t) => t.preventDefault(), ho = (t) => po(t) || Pn(t), ze = (t, e) => {
  const { x: n, y: r } = je(e) ? {
    x: e,
    y: e
  } : e || {};
  je(n) && (t.scrollLeft = n), je(r) && (t.scrollTop = r);
}, Fe = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), go = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), Ur = (t, e) => {
  const { D: n, M: r } = t, { w: s, h: a } = e, c = (v, p, m) => {
    let h = ps(v) * m, x = ps(p) * m;
    if (h === x) {
      const $ = tn(v), T = tn(p);
      x = $ > T ? 0 : x, h = $ < T ? 0 : h;
    }
    return h = h === x ? 0 : h, [h + 0, x + 0];
  }, [d, i] = c(n.x, r.x, s), [u, f] = c(n.y, r.y, a);
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
}, ks = ({ D: t, M: e }) => {
  const n = (r, s) => r === 0 && r <= s;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, xs = ({ D: t, M: e }, n) => {
  const r = (s, a, c) => oo(0, 1, (s - c) / (s - a) || 0);
  return {
    x: r(t.x, e.x, n.x),
    y: r(t.y, e.y, n.y)
  };
}, qn = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, Ss = (t, e) => {
  ae(es(e), t);
}, zn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (a, c) => {
    if (a) {
      const d = e.get(a);
      Ss((i) => {
        d && d[i ? "delete" : "clear"](i);
      }, c);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, r = (a, c) => {
    if (Ot(a)) {
      const u = e.get(a) || /* @__PURE__ */ new Set();
      return e.set(a, u), Ss((f) => {
        Re(f) && u.add(f);
      }, c), X(n, a, c);
    }
    Jn(c) && c && n();
    const d = Ue(a), i = [];
    return ae(d, (u) => {
      const f = a[u];
      f && me(i, r(u, f));
    }), X(Ie, i);
  }, s = (a, c) => {
    ae(at(e.get(a)), (d) => {
      c && !On(c) ? d.apply(0, c) : d();
    });
  };
  return r(t || {}), [r, n, s];
}, bo = {}, wo = {}, Nr = (t) => {
  ae(t, (e) => ae(e, (n, r) => {
    bo[r] = e[r];
  }));
}, yo = (t, e, n) => Ue(t).map((r) => {
  const { static: s, instance: a } = t[r], [c, d, i] = n || [], u = n ? a : s;
  if (u) {
    const f = n ? u(c, d, e) : u(e);
    return (i || wo)[r] = f;
  }
}), Ft = (t) => wo[t], Pr = "__osOptionsValidationPlugin", $t = "data-overlayscrollbars", Qt = "os-environment", Yt = `${Qt}-scrollbar-hidden`, En = `${$t}-initialize`, en = "noClipping", $s = `${$t}-body`, lt = $t, qr = "host", Qe = `${$t}-viewport`, zr = Qs, jr = eo, Gr = "arrange", ko = "measuring", Wr = "scrolling", xo = "scrollbarHidden", Kr = "noContent", jn = `${$t}-padding`, Cs = `${$t}-content`, as = "os-size-observer", Yr = `${as}-appear`, Xr = `${as}-listener`, Zr = "os-trinsic-observer", Jr = "os-theme-none", He = "os-scrollbar", Qr = `${He}-rtl`, el = `${He}-horizontal`, tl = `${He}-vertical`, So = `${He}-track`, is = `${He}-handle`, nl = `${He}-visible`, sl = `${He}-cornerless`, Es = `${He}-interaction`, Ts = `${He}-unusable`, Gn = `${He}-auto-hide`, Ms = `${Gn}-hidden`, As = `${He}-wheel`, ol = `${So}-interactive`, rl = `${is}-interactive`, ll = "__osSizeObserverPlugin", al = (t, e) => {
  const { T: n } = e, [r, s] = t("showNativeOverlaidScrollbars");
  return [r && n.x && n.y, s];
}, yt = (t) => t.indexOf(rt) === 0, il = (t, e) => {
  const n = (s, a, c, d) => {
    const i = s === rt ? ct : s.replace(`${rt}-`, ""), u = yt(s), f = yt(c);
    return !a && !d ? ct : u && f ? rt : u ? a && d ? i : a ? rt : ct : a ? i : f && d ? rt : ct;
  }, r = {
    x: n(e.x, t.x, e.y, t.y),
    y: n(e.y, t.y, e.x, t.x)
  };
  return {
    k: r,
    R: {
      x: r.x === bt,
      y: r.y === bt
    }
  };
}, $o = "__osScrollbarsHidingPlugin", cl = "__osClickScrollPlugin", Ds = (t) => JSON.stringify(t, (e, n) => {
  if (Re(n))
    throw 0;
  return n;
}), Vs = (t, e) => t ? `${e}`.split(".").reduce((n, r) => n && no(n, r) ? n[r] : void 0, t) : void 0, dl = {
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
}, Co = (t, e) => {
  const n = {}, r = Dt(Ue(e), Ue(t));
  return ae(r, (s) => {
    const a = t[s], c = e[s];
    if (on(a) && on(c))
      oe(n[s] = {}, Co(a, c)), ts(n[s]) && delete n[s];
    else if (no(e, s) && c !== a) {
      let d = !0;
      if (Ge(a) || Ge(c))
        try {
          Ds(a) === Ds(c) && (d = !1);
        } catch {
        }
      d && (n[s] = c);
    }
  }), n;
}, Ls = (t, e, n) => (r) => [Vs(t, r), n || Vs(e, r) !== void 0];
let Eo;
const ul = () => Eo, vl = (t) => {
  Eo = t;
};
let Tn;
const _l = () => {
  const t = (C, V, F) => {
    Oe(document.body, C), Oe(document.body, C);
    const z = fo(C), O = ht(C), w = ls(V);
    return F && wt(C), {
      x: O.h - z.h + w.h,
      y: O.w - z.w + w.w
    };
  }, e = (C) => {
    let V = !1;
    const F = rs(C, Yt);
    try {
      V = tt(C, "scrollbar-width") === "none" || tt(C, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return F(), V;
  }, n = `.${Qt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Qt} div{width:200%;height:200%;margin:10px 0}.${Yt}{scrollbar-width:none!important}.${Yt}::-webkit-scrollbar,.${Yt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = uo(`<div class="${Qt}"><div></div><style>${n}</style></div>`)[0], a = s.firstChild, c = s.lastChild, d = ul();
  d && (c.nonce = d);
  const [i, , u] = zn(), [f, v] = Le({
    o: t(s, a),
    i: Jt
  }, X(t, s, a, !0)), [p] = v(), m = e(s), h = {
    x: p.x === 0,
    y: p.y === 0
  }, x = {
    elements: {
      host: null,
      padding: !m,
      viewport: (C) => m && co(C) && C,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, $ = oe({}, dl), T = X(oe, {}, $), I = X(oe, {}, x), D = {
    N: p,
    T: h,
    P: m,
    G: !!Zt,
    K: X(i, "r"),
    Z: I,
    tt: (C) => oe(x, C) && I(),
    nt: T,
    ot: (C) => oe($, C) && T(),
    st: oe({}, x),
    et: oe({}, $)
  };
  if (Pe(s, "style"), wt(s), ve(Ve, "resize", () => {
    u("r", []);
  }), Re(Ve.matchMedia) && !m && (!h.x || !h.y)) {
    const C = (V) => {
      const F = Ve.matchMedia(`(resolution: ${Ve.devicePixelRatio}dppx)`);
      ve(F, "change", () => {
        V(), C(V);
      }, {
        A: !0
      });
    };
    C(() => {
      const [V, F] = f();
      oe(D.N, V), u("r", [F]);
    });
  }
  return D;
}, Ke = () => (Tn || (Tn = _l()), Tn), fl = (t, e, n) => {
  let r = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, a = () => {
    r = !0;
  }, c = (d) => {
    if (s && n) {
      const i = n.map((u) => {
        const [f, v] = u || [];
        return [v && f ? (d || io)(f, t) : [], v];
      });
      ae(i, (u) => ae(u[0], (f) => {
        const v = u[1], p = s.get(f) || [];
        if (t.contains(f) && v) {
          const h = ve(f, v, (x) => {
            r ? (h(), s.delete(f)) : e(x);
          });
          s.set(f, me(p, h));
        } else
          Ie(p), s.delete(f);
      }));
    }
  };
  return c(), [a, c];
}, Os = (t, e, n, r) => {
  let s = !1;
  const { ct: a, rt: c, lt: d, it: i, ut: u, _t: f } = r || {}, v = In(() => s && n(!0), {
    _: 33,
    p: 99
  }), [p, m] = fl(t, v, d), h = a || [], x = c || [], $ = Dt(h, x), T = (D, C) => {
    if (!On(C)) {
      const V = u || ut, F = f || ut, z = [], O = [];
      let w = !1, y = !1;
      if (ae(C, (L) => {
        const { attributeName: k, target: H, type: S, oldValue: U, addedNodes: N, removedNodes: Q } = L, se = S === "attributes", ne = S === "childList", _e = t === H, Y = se && k, E = Y && ns(H, k || ""), R = Ot(E) ? E : null, P = Y && U !== R, M = js(x, k) && P;
        if (e && (ne || !_e)) {
          const G = se && P, j = G && i && Hn(H, i), te = (j ? !V(H, k, U, R) : !se || G) && !F(L, !!j, t, r);
          ae(N, (ie) => me(z, ie)), ae(Q, (ie) => me(z, ie)), y = y || te;
        }
        !e && _e && P && !V(H, k, U, R) && (me(O, k), w = w || M);
      }), m((L) => Fn(z).reduce((k, H) => (me(k, io(L, H)), Hn(H, L) ? me(k, H) : k), [])), e)
        return !D && y && n(!1), [!1];
      if (!On(O) || w) {
        const L = [Fn(O), w];
        return !D && n.apply(0, L), L;
      }
    }
  }, I = new Ar(X(T, !1));
  return [() => (I.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: $,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (p(), I.disconnect(), s = !1);
  }), () => {
    if (s)
      return v.m(), T(!0, I.takeRecords());
  }];
}, To = (t, e, n) => {
  const { dt: r } = n || {}, s = Ft(ll), [a] = Le({
    o: !1,
    u: !0
  });
  return () => {
    const c = [], i = uo(`<div class="${as}"><div class="${Xr}"></div></div>`)[0], u = i.firstChild, f = (v) => {
      const p = v instanceof ResizeObserverEntry;
      let m = !1, h = !1;
      if (p) {
        const [x, , $] = a(v.contentRect), T = Nn(x);
        h = mo(x, $), m = !h && !T;
      } else
        h = v === !0;
      m || e({
        ft: !0,
        dt: h
      });
    };
    if (sn) {
      const v = new sn((p) => f(p.pop()));
      v.observe(u), me(c, () => {
        v.disconnect();
      });
    } else if (s) {
      const [v, p] = s(u, f, r);
      me(c, Dt([rs(i, Yr), ve(i, "animationstart", v)], p));
    } else
      return ut;
    return X(Ie, me(c, Oe(t, i)));
  };
}, ml = (t, e) => {
  let n;
  const r = (i) => i.h === 0 || i.isIntersecting || i.intersectionRatio > 0, s = pt(Zr), [a] = Le({
    o: !1
  }), c = (i, u) => {
    if (i) {
      const f = a(r(i)), [, v] = f;
      return v && !u && e(f) && [f];
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
        const f = ht(s);
        c(f);
      };
      me(i, To(s, u)()), u();
    }
    return X(Ie, me(i, Oe(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, pl = (t, e, n, r) => {
  let s, a, c, d, i, u;
  const f = `[${lt}]`, v = `[${Qe}]`, p = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: m, ht: h, U: x, gt: $, bt: T, L: I, wt: D, yt: C, St: V, Ot: F } = t, z = (M) => tt(M, "direction") === "rtl", O = {
    $t: !1,
    F: z(m)
  }, w = Ke(), y = Ft($o), [L] = Le({
    i: to,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const M = y && y.V(t, e, O, w, n).X, j = !(D && I) && os(h, lt, en), K = !I && C(Gr), te = K && Fe($), ie = te && F(), we = V(ko, j), pe = K && M && M()[0], Ee = cn(x), ee = ls(x);
    return pe && pe(), ze($, te), ie && ie(), j && we(), {
      w: Ee.w + ee.w,
      h: Ee.h + ee.h
    };
  }), k = In(r, {
    _: () => s,
    p: () => a,
    S(M, G) {
      const [j] = M, [K] = G;
      return [Dt(Ue(j), Ue(K)).reduce((te, ie) => (te[ie] = j[ie] || K[ie], te), {})];
    }
  }), H = (M) => {
    const G = z(m);
    oe(M, {
      Ct: u !== G
    }), oe(O, {
      F: G
    }), u = G;
  }, S = (M, G) => {
    const [j, K] = M, te = {
      xt: K
    };
    return oe(O, {
      $t: j
    }), !G && r(te), te;
  }, U = ({ ft: M, dt: G }) => {
    const K = !(M && !G) && w.P ? k : r, te = {
      ft: M || G,
      dt: G
    };
    H(te), K(te);
  }, N = (M, G) => {
    const [, j] = L(), K = {
      Ht: j
    };
    return H(K), j && !G && (M ? r : k)(K), K;
  }, Q = (M, G, j) => {
    const K = {
      Et: G
    };
    return H(K), G && !j && k(K), K;
  }, [se, ne] = T ? ml(h, S) : [], _e = !I && To(h, U, {
    dt: !0
  }), [Y, E] = Os(h, !1, Q, {
    rt: p,
    ct: p
  }), R = I && sn && new sn((M) => {
    const G = M[M.length - 1].contentRect;
    U({
      ft: !0,
      dt: mo(G, i)
    }), i = G;
  }), P = In(() => {
    const [, M] = L();
    r({
      Ht: M
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    R && R.observe(h);
    const M = _e && _e(), G = se && se(), j = Y(), K = w.K((te) => {
      te ? k({
        zt: te
      }) : P();
    });
    return () => {
      R && R.disconnect(), M && M(), G && G(), d && d(), j(), K();
    };
  }, ({ It: M, At: G, Dt: j }) => {
    const K = {}, [te] = M("update.ignoreMutation"), [ie, we] = M("update.attributes"), [pe, Ee] = M("update.elementEvents"), [ee, ye] = M("update.debounce"), Ae = Ee || we, xe = G || j, Se = (he) => Re(te) && te(he);
    if (Ae) {
      c && c(), d && d();
      const [he, ge] = Os(T || x, !0, N, {
        ct: Dt(p, ie || []),
        lt: pe,
        it: f,
        _t: (fe, ce) => {
          const { target: $e, attributeName: Me } = fe;
          return (!ce && Me && !I ? Or($e, f, v) : !1) || !!mt($e, `.${He}`) || !!Se(fe);
        }
      });
      d = he(), c = ge;
    }
    if (ye)
      if (k.m(), Ge(ee)) {
        const he = ee[0], ge = ee[1];
        s = je(he) && he, a = je(ge) && ge;
      } else je(ee) ? (s = ee, a = !1) : (s = !1, a = !1);
    if (xe) {
      const he = E(), ge = ne && ne(), fe = c && c();
      he && oe(K, Q(he[0], he[1], xe)), ge && oe(K, S(ge[0], xe)), fe && oe(K, N(fe[0], xe));
    }
    return H(K), K;
  }, O];
}, Mo = (t, e) => Re(e) ? e.apply(0, t) : e, hl = (t, e, n, r) => {
  const s = Zn(r) ? n : r;
  return Mo(t, s) || e.apply(0, t);
}, Ao = (t, e, n, r) => {
  const s = Zn(r) ? n : r, a = Mo(t, s);
  return !!a && (ln(a) ? a : e.apply(0, t));
}, gl = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: r } = e || {}, { T: s, P: a, Z: c } = Ke(), { nativeScrollbarsOverlaid: d, body: i } = c().cancel, u = n ?? d, f = Zn(r) ? i : r, v = (s.x || s.y) && u, p = t && (vn(f) ? !a : f);
  return !!v || !!p;
}, bl = (t, e, n, r) => {
  const s = "--os-viewport-percent", a = "--os-scroll-percent", c = "--os-scroll-direction", { Z: d } = Ke(), { scrollbars: i } = d(), { slot: u } = i, { vt: f, ht: v, U: p, Mt: m, gt: h, wt: x, L: $ } = e, { scrollbars: T } = m ? {} : t, { slot: I } = T || {}, D = [], C = [], V = [], F = Ao([f, v, p], () => $ && x ? f : v, u, I), z = (Y) => {
    if (Zt) {
      const E = new Zt({
        source: h,
        axis: Y
      });
      return {
        kt: (P) => {
          const M = P.Tt.animate({
            clear: ["left"],
            [a]: [0, 1]
          }, {
            timeline: E
          });
          return () => M.cancel();
        }
      };
    }
  }, O = {
    x: z("x"),
    y: z("y")
  }, w = () => {
    const { Rt: Y, Vt: E } = n, R = (P, M) => oo(0, 1, P / (P + M) || 0);
    return {
      x: R(E.x, Y.x),
      y: R(E.y, Y.y)
    };
  }, y = (Y, E, R) => {
    const P = R ? rs : ao;
    ae(Y, (M) => {
      P(M.Tt, E);
    });
  }, L = (Y, E) => {
    ae(Y, (R) => {
      const [P, M] = E(R);
      Lt(P, M);
    });
  }, k = (Y, E, R) => {
    const P = Jn(R), M = P ? R : !0, G = P ? !R : !0;
    M && y(C, Y, E), G && y(V, Y, E);
  }, H = () => {
    const Y = w(), E = (R) => (P) => [P.Tt, {
      [s]: Un(R) + ""
    }];
    L(C, E(Y.x)), L(V, E(Y.y));
  }, S = () => {
    if (!Zt) {
      const { Lt: Y } = n, E = xs(Y, Fe(h)), R = (P) => (M) => [M.Tt, {
        [a]: Un(P) + ""
      }];
      L(C, R(E.x)), L(V, R(E.y));
    }
  }, U = () => {
    const { Lt: Y } = n, E = ks(Y), R = (P) => (M) => [M.Tt, {
      [c]: P ? "0" : "1"
    }];
    L(C, R(E.x)), L(V, R(E.y));
  }, N = () => {
    if ($ && !x) {
      const { Rt: Y, Lt: E } = n, R = ks(E), P = xs(E, Fe(h)), M = (G) => {
        const { Tt: j } = G, K = Vt(j) === p && j, te = (ie, we, pe) => {
          const Ee = we * ie;
          return _o(pe ? Ee : -Ee);
        };
        return [K, K && {
          transform: Fr({
            x: te(P.x, Y.x, R.x),
            y: te(P.y, Y.y, R.y)
          })
        }];
      };
      L(C, M), L(V, M);
    }
  }, Q = (Y) => {
    const E = Y ? "x" : "y", P = pt(`${He} ${Y ? el : tl}`), M = pt(So), G = pt(is), j = {
      Tt: P,
      Ut: M,
      Pt: G
    }, K = O[E];
    return me(Y ? C : V, j), me(D, [Oe(P, M), Oe(M, G), X(wt, P), K && K.kt(j), r(j, k, Y)]), j;
  }, se = X(Q, !0), ne = X(Q, !1), _e = () => (Oe(F, C[0].Tt), Oe(F, V[0].Tt), X(Ie, D));
  return se(), ne(), [{
    Nt: H,
    qt: S,
    Bt: U,
    Ft: N,
    jt: k,
    Yt: {
      Wt: C,
      Xt: se,
      Jt: X(L, C)
    },
    Gt: {
      Wt: V,
      Xt: ne,
      Jt: X(L, V)
    }
  }, _e];
}, wl = (t, e, n, r) => (s, a, c) => {
  const { ht: d, U: i, L: u, gt: f, Kt: v, Ot: p } = e, { Tt: m, Ut: h, Pt: x } = s, [$, T] = ft(333), [I, D] = ft(444), C = (z) => {
    Re(f.scrollBy) && f.scrollBy({
      behavior: "smooth",
      left: z.x,
      top: z.y
    });
  }, V = () => {
    const z = "pointerup pointercancel lostpointercapture", O = `client${c ? "X" : "Y"}`, w = c ? fn : mn, y = c ? "left" : "top", L = c ? "w" : "h", k = c ? "x" : "y", H = (U, N) => (Q) => {
      const { Rt: se } = n, ne = ht(h)[L] - ht(x)[L], Y = N * Q / ne * se[k];
      ze(f, {
        [k]: U + Y
      });
    }, S = [];
    return ve(h, "pointerdown", (U) => {
      const N = mt(U.target, `.${is}`) === x, Q = N ? x : h, se = t.scrollbars, ne = se[N ? "dragScroll" : "clickScroll"], { button: _e, isPrimary: Y, pointerType: E } = U, { pointers: R } = se;
      if (_e === 0 && Y && ne && (R || []).includes(E)) {
        Ie(S), D();
        const M = !N && (U.shiftKey || ne === "instant"), G = X(Cn, x), j = X(Cn, h), K = (ce, $e) => (ce || G())[y] - ($e || j())[y], te = Vn(Cn(f)[w]) / ht(f)[L] || 1, ie = H(Fe(f)[k], 1 / te), we = U[O], pe = G(), Ee = j(), ee = pe[w], ye = K(pe, Ee) + ee / 2, Ae = we - Ee[y], xe = N ? 0 : Ae - ye, Se = (ce) => {
          Ie(fe), Q.releasePointerCapture(ce.pointerId);
        }, he = N || M, ge = p(), fe = [ve(v, z, Se), ve(v, "selectstart", (ce) => Pn(ce), {
          H: !1
        }), ve(h, z, Se), he && ve(h, "pointermove", (ce) => ie(xe + (ce[O] - we))), he && (() => {
          const ce = Fe(f);
          ge();
          const $e = Fe(f), Me = {
            x: $e.x - ce.x,
            y: $e.y - ce.y
          };
          (tn(Me.x) > 3 || tn(Me.y) > 3) && (p(), ze(f, ce), C(Me), I(ge));
        })];
        if (Q.setPointerCapture(U.pointerId), M)
          ie(xe);
        else if (!N) {
          const ce = Ft(cl);
          if (ce) {
            const $e = ce(ie, xe, ee, (Me) => {
              Me ? ge() : me(fe, ge);
            });
            me(fe, $e), me(S, X($e, !0));
          }
        }
      }
    });
  };
  let F = !0;
  return X(Ie, [ve(x, "pointermove pointerleave", r), ve(m, "pointerenter", () => {
    a(Es, !0);
  }), ve(m, "pointerleave pointercancel", () => {
    a(Es, !1);
  }), !u && ve(m, "mousedown", () => {
    const z = Bn();
    (gs(z, Qe) || gs(z, lt) || z === document.body) && nn(X(qn, i), 25);
  }), ve(m, "wheel", (z) => {
    const { deltaX: O, deltaY: w, deltaMode: y } = z;
    F && y === 0 && Vt(m) === d && C({
      x: O,
      y: w
    }), F = !1, a(As, !0), $(() => {
      F = !0, a(As);
    }), Pn(z);
  }, {
    H: !1,
    I: !0
  }), ve(m, "pointerdown", X(ve, v, "click", ho, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), V(), T, D]);
}, yl = (t, e, n, r, s, a) => {
  let c, d, i, u, f, v = ut, p = 0;
  const m = ["mouse", "pen"], h = (E) => m.includes(E.pointerType), [x, $] = ft(), [T, I] = ft(100), [D, C] = ft(100), [V, F] = ft(() => p), [z, O] = bl(t, s, r, wl(e, s, r, (E) => h(E) && se())), { ht: w, Qt: y, wt: L } = s, { jt: k, Nt: H, qt: S, Bt: U, Ft: N } = z, Q = (E, R) => {
    if (F(), E)
      k(Ms);
    else {
      const P = X(k, Ms, !0);
      p > 0 && !R ? V(P) : P();
    }
  }, se = () => {
    (i ? !c : !u) && (Q(!0), T(() => {
      Q(!1);
    }));
  }, ne = (E) => {
    k(Gn, E, !0), k(Gn, E, !1);
  }, _e = (E) => {
    h(E) && (c = i, i && Q(!0));
  }, Y = [F, I, C, $, () => v(), ve(w, "pointerover", _e, {
    A: !0
  }), ve(w, "pointerenter", _e), ve(w, "pointerleave", (E) => {
    h(E) && (c = !1, i && Q(!1));
  }), ve(w, "pointermove", (E) => {
    h(E) && d && se();
  }), ve(y, "scroll", (E) => {
    x(() => {
      S(), se();
    }), a(E), N();
  })];
  return [() => X(Ie, me(Y, O())), ({ It: E, Dt: R, Zt: P, tn: M }) => {
    const { nn: G, sn: j, en: K, cn: te } = M || {}, { Ct: ie, dt: we } = P || {}, { F: pe } = n, { T: Ee } = Ke(), { k: ee, rn: ye } = r, [Ae, xe] = E("showNativeOverlaidScrollbars"), [Se, he] = E("scrollbars.theme"), [ge, fe] = E("scrollbars.visibility"), [ce, $e] = E("scrollbars.autoHide"), [Me, Ct] = E("scrollbars.autoHideSuspend"), [It] = E("scrollbars.autoHideDelay"), [Ht, Rt] = E("scrollbars.dragScroll"), [it, Et] = E("scrollbars.clickScroll"), [Bt, wn] = E("overflow"), yn = we && !R, kn = ye.x || ye.y, Ne = G || j || te || ie || R, xn = K || fe || wn, Ut = Ae && Ee.x && Ee.y, Nt = (st, Tt, Mt) => {
      const Pt = st.includes(bt) && (ge === rt || ge === "auto" && Tt === bt);
      return k(nl, Pt, Mt), Pt;
    };
    if (p = It, yn && (Me && kn ? (ne(!1), v(), D(() => {
      v = ve(y, "scroll", X(ne, !0), {
        A: !0
      });
    })) : ne(!0)), xe && k(Jr, Ut), he && (k(f), k(Se, !0), f = Se), Ct && !Me && ne(!0), $e && (d = ce === "move", i = ce === "leave", u = ce === "never", Q(u, !0)), Rt && k(rl, Ht), Et && k(ol, !!it), xn) {
      const st = Nt(Bt.x, ee.x, !0), Tt = Nt(Bt.y, ee.y, !1);
      k(sl, !(st && Tt));
    }
    Ne && (S(), H(), N(), te && U(), k(Ts, !ye.x, !0), k(Ts, !ye.y, !1), k(Qr, pe && !L));
  }, {}, z];
}, kl = (t) => {
  const e = Ke(), { Z: n, P: r } = e, { elements: s } = n(), { padding: a, viewport: c, content: d } = s, i = ln(t), u = i ? {} : t, { elements: f } = u, { padding: v, viewport: p, content: m } = f || {}, h = i ? t : u.target, x = co(h), $ = h.ownerDocument, T = $.documentElement, I = () => $.defaultView || Ve, D = X(hl, [h]), C = X(Ao, [h]), V = X(pt, ""), F = X(D, V, c), z = X(C, V, d), O = (ee) => {
    const ye = ht(ee), Ae = cn(ee), xe = tt(ee, Qs), Se = tt(ee, eo);
    return Ae.w - ye.w > 0 && !yt(xe) || Ae.h - ye.h > 0 && !yt(Se);
  }, w = F(p), y = w === h, L = y && x, k = !y && z(m), H = !y && w === k, S = L ? T : w, U = L ? S : h, N = !y && C(V, a, v), Q = !H && k, se = [Q, S, N, U].map((ee) => ln(ee) && !Vt(ee) && ee), ne = (ee) => ee && js(se, ee), _e = !ne(S) && O(S) ? S : h, Y = L ? T : S, R = {
    vt: h,
    ht: U,
    U: S,
    ln: N,
    bt: Q,
    gt: Y,
    Qt: L ? $ : S,
    an: x ? T : _e,
    Kt: $,
    wt: x,
    Mt: i,
    L: y,
    un: I,
    yt: (ee) => os(S, Qe, ee),
    St: (ee, ye) => an(S, Qe, ee, ye),
    Ot: () => an(Y, Qe, Wr, !0)
  }, { vt: P, ht: M, ln: G, U: j, bt: K } = R, te = [() => {
    Pe(M, [lt, En]), Pe(P, En), x && Pe(T, [En, lt]);
  }];
  let ie = Rn([K, j, G, M, P].find((ee) => ee && !ne(ee)));
  const we = L ? P : K || j, pe = X(Ie, te);
  return [R, () => {
    const ee = I(), ye = Bn(), Ae = (fe) => {
      Oe(Vt(fe), Rn(fe)), wt(fe);
    }, xe = (fe) => ve(fe, "focusin focusout focus blur", ho, {
      I: !0,
      H: !1
    }), Se = "tabindex", he = ns(j, Se), ge = xe(ye);
    return Je(M, lt, y ? "" : qr), Je(G, jn, ""), Je(j, Qe, ""), Je(K, Cs, ""), y || (Je(j, Se, he || "-1"), x && Je(T, $s, "")), Oe(we, ie), Oe(M, G), Oe(G || M, !y && j), Oe(j, K), me(te, [ge, () => {
      const fe = Bn(), ce = ne(j), $e = ce && fe === j ? P : fe, Me = xe($e);
      Pe(G, jn), Pe(K, Cs), Pe(j, Qe), x && Pe(T, $s), he ? Je(j, Se, he) : Pe(j, Se), ne(K) && Ae(K), ce && Ae(j), ne(G) && Ae(G), qn($e), Me();
    }]), r && !y && (ss(j, Qe, xo), me(te, X(Pe, j, Qe))), qn(!y && x && ye === P && ee.top === ee ? j : ye), ge(), ie = 0, pe;
  }, pe];
}, xl = ({ bt: t }) => ({ Zt: e, _n: n, Dt: r }) => {
  const { xt: s } = e || {}, { $t: a } = n;
  t && (s || r) && Lt(t, {
    [mn]: a && "100%"
  });
}, Sl = ({ ht: t, ln: e, U: n, L: r }, s) => {
  const [a, c] = Le({
    i: Vr,
    o: ws()
  }, X(ws, t, "padding", ""));
  return ({ It: d, Zt: i, _n: u, Dt: f }) => {
    let [v, p] = c(f);
    const { P: m } = Ke(), { ft: h, Ht: x, Ct: $ } = i || {}, { F: T } = u, [I, D] = d("paddingAbsolute");
    (h || p || (f || x)) && ([v, p] = a(f));
    const V = !r && (D || $ || p);
    if (V) {
      const F = !I || !e && !m, z = v.r + v.l, O = v.t + v.b, w = {
        [Zs]: F && !T ? -z : 0,
        [Js]: F ? -O : 0,
        [Xs]: F && T ? -z : 0,
        top: F ? -v.t : 0,
        right: F ? T ? -v.r : "auto" : 0,
        left: F ? T ? "auto" : -v.l : 0,
        [fn]: F && `calc(100% + ${z}px)`
      }, y = {
        [Gs]: F ? v.t : 0,
        [Ws]: F ? v.r : 0,
        [Ys]: F ? v.b : 0,
        [Ks]: F ? v.l : 0
      };
      Lt(e || n, w), Lt(n, y), oe(s, {
        ln: v,
        dn: !F,
        j: e ? y : oe({}, w, y)
      });
    }
    return {
      fn: V
    };
  };
}, $l = (t, e) => {
  const n = Ke(), { ht: r, ln: s, U: a, L: c, Qt: d, gt: i, wt: u, St: f, un: v } = t, { P: p } = n, m = u && c, h = X(qs, 0), x = {
    display: () => !1,
    direction: (E) => E !== "ltr",
    flexDirection: (E) => E.endsWith("-reverse"),
    writingMode: (E) => E !== "horizontal-tb"
  }, $ = Ue(x), T = {
    i: to,
    o: {
      w: 0,
      h: 0
    }
  }, I = {
    i: Jt,
    o: {}
  }, D = (E) => {
    f(ko, !m && E);
  }, C = (E) => {
    if (!$.some((we) => {
      const pe = E[we];
      return pe && x[we](pe);
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
    D(!0);
    const P = Fe(i), M = f(Kr, !0), G = ve(d, bt, (we) => {
      const pe = Fe(i);
      we.isTrusted && pe.x === P.x && pe.y === P.y && po(we);
    }, {
      I: !0,
      A: !0
    });
    ze(i, {
      x: 0,
      y: 0
    }), M();
    const j = Fe(i), K = cn(i);
    ze(i, {
      x: K.w,
      y: K.h
    });
    const te = Fe(i);
    ze(i, {
      x: te.x - j.x < 1 && -K.w,
      y: te.y - j.y < 1 && -K.h
    });
    const ie = Fe(i);
    return ze(i, P), Xn(() => G()), {
      D: j,
      M: ie
    };
  }, V = (E, R) => {
    const P = Ve.devicePixelRatio % 1 !== 0 ? 1 : 0, M = {
      w: h(E.w - R.w),
      h: h(E.h - R.h)
    };
    return {
      w: M.w > P ? M.w : 0,
      h: M.h > P ? M.h : 0
    };
  }, [F, z] = Le(T, X(ls, a)), [O, w] = Le(T, X(cn, a)), [y, L] = Le(T), [k] = Le(I), [H, S] = Le(T), [U] = Le(I), [N] = Le({
    i: (E, R) => pn(E, R, $),
    o: {}
  }, () => Br(a) ? tt(a, $) : {}), [Q, se] = Le({
    i: (E, R) => Jt(E.D, R.D) && Jt(E.M, R.M),
    o: go()
  }), ne = Ft($o), _e = (E, R) => `${R ? zr : jr}${Dr(E)}`, Y = (E) => {
    const R = (M) => [rt, ct, bt].map((G) => _e(G, M)), P = R(!0).concat(R()).join(" ");
    f(P), f(Ue(E).map((M) => _e(E[M], M === "x")).join(" "), !0);
  };
  return ({ It: E, Zt: R, _n: P, Dt: M }, { fn: G }) => {
    const { ft: j, Ht: K, Ct: te, dt: ie, zt: we } = R || {}, pe = ne && ne.V(t, e, P, n, E), { W: Ee, X: ee, J: ye } = pe || {}, [Ae, xe] = al(E, n), [Se, he] = E("overflow"), ge = yt(Se.x), fe = yt(Se.y), ce = !0;
    let $e = z(M), Me = w(M), Ct = L(M), It = S(M);
    xe && p && f(xo, !Ae);
    {
      os(r, lt, en) && D(!0);
      const [fs] = ee ? ee() : [], [qt] = $e = F(M), [zt] = Me = O(M), jt = fo(a), Gt = m && Rr(v()), tr = {
        w: h(zt.w + qt.w),
        h: h(zt.h + qt.h)
      }, ms = {
        w: h((Gt ? Gt.w : jt.w + h(jt.w - zt.w)) + qt.w),
        h: h((Gt ? Gt.h : jt.h + h(jt.h - zt.h)) + qt.h)
      };
      fs && fs(), It = H(ms), Ct = y(V(tr, ms), M);
    }
    const [Ht, Rt] = It, [it, Et] = Ct, [Bt, wn] = Me, [yn, kn] = $e, [Ne, xn] = k({
      x: it.w > 0,
      y: it.h > 0
    }), Ut = ge && fe && (Ne.x || Ne.y) || ge && Ne.x && !Ne.y || fe && Ne.y && !Ne.x, Nt = G || te || we || kn || wn || Rt || Et || he || xe || ce, st = il(Ne, Se), [Tt, Mt] = U(st.k), [Pt, Jo] = N(M), _s = te || ie || Jo || xn || M, [Qo, er] = _s ? Q(C(Pt), M) : se();
    return Nt && (Mt && Y(st.k), ye && Ee && Lt(a, ye(st, P, Ee(st, Bt, yn)))), D(!1), an(r, lt, en, Ut), an(s, jn, en, Ut), oe(e, {
      k: Tt,
      Vt: {
        x: Ht.w,
        y: Ht.h
      },
      Rt: {
        x: it.w,
        y: it.h
      },
      rn: Ne,
      Lt: Ur(Qo, it)
    }), {
      en: Mt,
      nn: Rt,
      sn: Et,
      cn: er || Et,
      pn: _s
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
    j: {
      [Zs]: 0,
      [Js]: 0,
      [Xs]: 0,
      [Gs]: 0,
      [Ws]: 0,
      [Ys]: 0,
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
    k: {
      x: ct,
      y: ct
    },
    rn: {
      x: !1,
      y: !1
    },
    Lt: go()
  }, { vt: a, gt: c, L: d, Ot: i } = e, { P: u, T: f } = Ke(), v = !u && (f.x || f.y), p = [xl(e), Sl(e, s), $l(e, s)];
  return [n, (m) => {
    const h = {}, $ = v && Fe(c), T = $ && i();
    return ae(p, (I) => {
      oe(h, I(m, h) || {});
    }), ze(c, $), T && T(), !d && ze(a, 0), h;
  }, s, e, r];
}, El = (t, e, n, r, s) => {
  let a = !1;
  const c = Ls(e, {}), [d, i, u, f, v] = Cl(t), [p, m, h] = pl(f, u, c, (C) => {
    D({}, C);
  }), [x, $, , T] = yl(t, e, h, u, f, s), I = (C) => Ue(C).some((V) => !!C[V]), D = (C, V) => {
    if (n())
      return !1;
    const { vn: F, Dt: z, At: O, hn: w } = C, y = F || {}, L = !!z || !a, k = {
      It: Ls(e, y, L),
      vn: y,
      Dt: L
    };
    if (w)
      return $(k), !1;
    const H = V || m(oe({}, k, {
      At: O
    })), S = i(oe({}, k, {
      _n: h,
      Zt: H
    }));
    $(oe({}, k, {
      Zt: H,
      tn: S
    }));
    const U = I(H), N = I(S), Q = U || N || !ts(y) || L;
    return a = !0, Q && r(C, {
      Zt: H,
      tn: S
    }), Q;
  };
  return [() => {
    const { an: C, gt: V, Ot: F } = f, z = Fe(C), O = [p(), d(), x()], w = F();
    return ze(V, z), w(), X(Ie, O);
  }, D, () => ({
    gn: h,
    bn: u
  }), {
    wn: f,
    yn: T
  }, v];
}, cs = /* @__PURE__ */ new WeakMap(), Tl = (t, e) => {
  cs.set(t, e);
}, Ml = (t) => {
  cs.delete(t);
}, Do = (t) => cs.get(t), We = (t, e, n) => {
  const { nt: r } = Ke(), s = ln(t), a = s ? t : t.target, c = Do(a);
  if (e && !c) {
    let d = !1;
    const i = [], u = {}, f = (y) => {
      const L = so(y), k = Ft(Pr);
      return k ? k(L, !0) : L;
    }, v = oe({}, r(), f(e)), [p, m, h] = zn(), [x, $, T] = zn(n), I = (y, L) => {
      T(y, L), h(y, L);
    }, [D, C, V, F, z] = El(t, v, () => d, ({ vn: y, Dt: L }, { Zt: k, tn: H }) => {
      const { ft: S, Ct: U, xt: N, Ht: Q, Et: se, dt: ne } = k, { nn: _e, sn: Y, en: E, cn: R } = H;
      I("updated", [w, {
        updateHints: {
          sizeChanged: !!S,
          directionChanged: !!U,
          heightIntrinsicChanged: !!N,
          overflowEdgeChanged: !!_e,
          overflowAmountChanged: !!Y,
          overflowStyleChanged: !!E,
          scrollCoordinatesChanged: !!R,
          contentMutation: !!Q,
          hostMutation: !!se,
          appear: !!ne
        },
        changedOptions: y || {},
        force: !!L
      }]);
    }, (y) => I("scroll", [w, y])), O = (y) => {
      Ml(a), Ie(i), d = !0, I("destroyed", [w, y]), m(), $();
    }, w = {
      options(y, L) {
        if (y) {
          const k = L ? r() : {}, H = Co(v, oe(k, f(y)));
          ts(H) || (oe(v, H), C({
            vn: H
          }));
        }
        return oe({}, v);
      },
      on: x,
      off: (y, L) => {
        y && L && $(y, L);
      },
      state() {
        const { gn: y, bn: L } = V(), { F: k } = y, { Vt: H, Rt: S, k: U, rn: N, ln: Q, dn: se, Lt: ne } = L;
        return oe({}, {
          overflowEdge: H,
          overflowAmount: S,
          overflowStyle: U,
          hasOverflow: N,
          scrollCoordinates: {
            start: ne.D,
            end: ne.M
          },
          padding: Q,
          paddingAbsolute: se,
          directionRTL: k,
          destroyed: d
        });
      },
      elements() {
        const { vt: y, ht: L, ln: k, U: H, bt: S, gt: U, Qt: N } = F.wn, { Yt: Q, Gt: se } = F.yn, ne = (Y) => {
          const { Pt: E, Ut: R, Tt: P } = Y;
          return {
            scrollbar: P,
            track: R,
            handle: E
          };
        }, _e = (Y) => {
          const { Wt: E, Xt: R } = Y, P = ne(E[0]);
          return oe({}, P, {
            clone: () => {
              const M = ne(R());
              return C({
                hn: !0
              }), M;
            }
          });
        };
        return oe({}, {
          target: y,
          host: L,
          padding: k || H,
          viewport: H,
          content: S || H,
          scrollOffsetElement: U,
          scrollEventElement: N,
          scrollbarHorizontal: _e(Q),
          scrollbarVertical: _e(se)
        });
      },
      update: (y) => C({
        Dt: y,
        At: !0
      }),
      destroy: X(O, !1),
      plugin: (y) => u[Ue(y)[0]]
    };
    return me(i, [z]), Tl(a, w), yo(bo, We, [w, p, u]), gl(F.wn.wt, !s && t.cancel) ? (O(!0), w) : (me(i, D()), I("initialized", [w]), w.update(), w);
  }
  return c;
};
We.plugin = (t) => {
  const e = Ge(t), n = e ? t : [t], r = n.map((s) => yo(s, We)[0]);
  return Nr(n), e ? r : r[0];
};
We.valid = (t) => {
  const e = t && t.elements, n = Re(e) && e();
  return rn(n) && !!Do(n.target);
};
We.env = () => {
  const { N: t, T: e, P: n, G: r, st: s, et: a, Z: c, tt: d, nt: i, ot: u } = Ke();
  return oe({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: r,
    staticDefaultInitialization: s,
    staticDefaultOptions: a,
    getDefaultInitialization: c,
    setDefaultInitialization: d,
    getDefaultOptions: i,
    setDefaultOptions: u
  });
};
We.nonce = vl;
function Al() {
  let t;
  const e = A(null), n = Math.floor(Math.random() * 2 ** 32), r = A(!1), s = A([]), a = () => s.value, c = () => t.getSelection(), d = () => s.value.length, i = () => t.clearSelection(!0), u = A(), f = A(null), v = A(null), p = A(null), m = A(null);
  function h() {
    t = new _r({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: V, event: F, isDragging: z }) => {
      if (z)
        t.Interaction._reset(F);
      else {
        r.value = !1;
        const O = e.value.offsetWidth - F.offsetX, w = e.value.offsetHeight - F.offsetY;
        O < 15 && w < 15 && t.Interaction._reset(F), F.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(F);
      }
    }), document.addEventListener("dragleave", (V) => {
      !V.buttons && r.value && (r.value = !1);
    });
  }
  const x = () => dt(() => {
    t.addSelection(
      t.getSelectables()
    ), $();
  }), $ = () => {
    s.value = t.getSelection().map((V) => JSON.parse(V.dataset.item)), u.value(s.value);
  }, T = () => dt(() => {
    const V = a().map((F) => F.path);
    i(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((F) => V.includes(JSON.parse(F.dataset.item).path))
    ), $(), D();
  }), I = (V) => {
    u.value = V, t.subscribe("DS:end", ({ items: F, event: z, isDragging: O }) => {
      s.value = F.map((w) => JSON.parse(w.dataset.item)), V(F.map((w) => JSON.parse(w.dataset.item)));
    });
  }, D = () => {
    f.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (v.value.style.height = e.value.scrollHeight + "px", v.value.style.display = "block") : (v.value.style.height = "100%", v.value.style.display = "none"));
  }, C = (V) => {
    if (!f.value)
      return;
    const { scrollOffsetElement: F } = f.value.elements();
    F.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ce(() => {
    We(p.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: We
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (V) => {
        f.value = V;
      },
      scroll: (V, F) => {
        const { scrollOffsetElement: z } = V.elements();
        e.value.scrollTo({
          top: z.scrollTop,
          left: 0
        });
      }
    }), h(), D(), m.value = new ResizeObserver(D), m.value.observe(e.value), e.value.addEventListener("scroll", C), t.subscribe("DS:scroll", ({ isDragging: V }) => V || C());
  }), Yn(() => {
    t && t.stop(), m.value && m.value.disconnect();
  }), Hs(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: r,
    scrollBar: v,
    scrollBarContainer: p,
    getSelected: a,
    getSelection: c,
    selectAll: x,
    clearSelection: i,
    refreshSelection: T,
    getCount: d,
    onSelect: I
  };
}
function Dl(t, e) {
  const n = A(t), r = A(e), s = A([]), a = A([]), c = A([]), d = A(!1), i = A(5);
  let u = !1, f = !1;
  const v = kt({
    adapter: n,
    storages: [],
    dirname: r,
    files: []
  });
  function p() {
    let I = [], D = [], C = r.value ?? n.value + "://";
    C.length === 0 && (s.value = []), C.replace(n.value + "://", "").split("/").forEach(function(z) {
      I.push(z), I.join("/") !== "" && D.push({
        basename: z,
        name: z,
        path: n.value + "://" + I.join("/"),
        type: "dir"
      });
    }), a.value = D;
    const [V, F] = h(D, i.value);
    c.value = F, s.value = V;
  }
  function m(I) {
    i.value = I, p();
  }
  function h(I, D) {
    return I.length > D ? [I.slice(-D), I.slice(0, -D)] : [I, []];
  }
  function x(I = null) {
    d.value = I ?? !d.value;
  }
  function $() {
    return s.value && s.value.length && !f;
  }
  const T = gt(() => {
    var I;
    return ((I = s.value[s.value.length - 2]) == null ? void 0 : I.path) ?? n.value + "://";
  });
  return Ce(() => {
  }), De(r, p), Ce(p), {
    adapter: n,
    path: r,
    loading: u,
    searchMode: f,
    data: v,
    breadcrumbs: s,
    breadcrumbItems: a,
    limitBreadcrumbItems: m,
    hiddenBreadcrumbs: c,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: x,
    isGoUpAvailable: $,
    parentFolderPath: T
  };
}
const Vl = (t, e) => {
  const n = wr(t.id), r = vr(), s = n.getStore("metricUnits", !1), a = Cr(n, t.theme), c = e.i18n, d = t.locale ?? e.locale, i = (m) => Array.isArray(m) ? m : xr, u = n.getStore("persist-path", t.persist), f = u ? n.getStore("path", t.path) : t.path, v = u ? n.getStore("adapter") : null, p = Al();
  return kt({
    /** 
    * Core properties
    * */
    // app version
    version: Sr,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: r,
    // storage
    storage: n,
    // localization object
    i18n: kr(n, d, r, c),
    // modal state
    modal: Er(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: gt(() => p),
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
    theme: a,
    // unit state - for example: GB or GiB
    metricUnits: s,
    // human readable file sizes
    filesize: s ? Ps : Ns,
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
    fs: Dl(v, f)
  });
}, Ll = { class: "vuefinder__modal-layout__container" }, Ol = { class: "vuefinder__modal-layout__content" }, Fl = { class: "vuefinder__modal-layout__footer" }, Ye = {
  __name: "ModalLayout",
  setup(t) {
    const e = A(null), n = re("ServiceContainer");
    return Ce(() => {
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
    }), (r, s) => (_(), g("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = xt((a) => o(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = l("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      l("div", Ll, [
        l("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = et((a) => o(n).modal.close(), ["self"]))
        }, [
          l("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            l("div", Ol, [
              At(r.$slots, "default")
            ]),
            l("div", Fl, [
              At(r.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Il = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, s] of e)
    n[r] = s;
  return n;
}, Hl = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const r = re("ServiceContainer"), s = A(!1), { t: a } = r.i18n;
    let c = null;
    const d = () => {
      clearTimeout(c), s.value = !0, c = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return Ce(() => {
      r.emitter.on(t.on, d);
    }), Yn(() => {
      clearTimeout(c);
    }), {
      shown: s,
      t: a
    };
  }
}, Rl = { key: 1 };
function Bl(t, e, n, r, s, a) {
  return _(), g("div", {
    class: le(["vuefinder__action-message", { "vuefinder__action-message--hidden": !r.shown }])
  }, [
    t.$slots.default ? At(t.$slots, "default", { key: 0 }) : (_(), g("span", Rl, b(r.t("Saved.")), 1))
  ], 2);
}
const _t = /* @__PURE__ */ Il(Hl, [["render", Bl]]), Ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Nl(t, e) {
  return _(), g("svg", Ul, e[0] || (e[0] = [
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
const Pl = { render: Nl }, ql = { class: "vuefinder__modal-header" }, zl = { class: "vuefinder__modal-header__icon-container" }, jl = {
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
    return (e, n) => (_(), g("div", ql, [
      l("div", zl, [
        (_(), W(Rs(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      l("h3", jl, b(t.title), 1)
    ]));
  }
}, Gl = { class: "vuefinder__about-modal__content" }, Wl = { class: "vuefinder__about-modal__main" }, Kl = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Yl = ["onClick", "aria-current"], Xl = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Zl = { class: "vuefinder__about-modal__description" }, Jl = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Ql = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, ea = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, ta = { class: "vuefinder__about-modal__description" }, na = { class: "vuefinder__about-modal__settings" }, sa = { class: "vuefinder__about-modal__setting flex" }, oa = { class: "vuefinder__about-modal__setting-input" }, ra = { class: "vuefinder__about-modal__setting-label" }, la = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, aa = { class: "vuefinder__about-modal__setting flex" }, ia = { class: "vuefinder__about-modal__setting-input" }, ca = { class: "vuefinder__about-modal__setting-label" }, da = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, ua = { class: "vuefinder__about-modal__setting flex" }, va = { class: "vuefinder__about-modal__setting-input" }, _a = { class: "vuefinder__about-modal__setting-label" }, fa = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, ma = { class: "vuefinder__about-modal__setting flex" }, pa = { class: "vuefinder__about-modal__setting-input" }, ha = { class: "vuefinder__about-modal__setting-label" }, ga = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, ba = { class: "vuefinder__about-modal__setting" }, wa = { class: "vuefinder__about-modal__setting-input" }, ya = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, ka = { class: "vuefinder__about-modal__setting-label" }, xa = ["label"], Sa = ["value"], $a = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Ca = { class: "vuefinder__about-modal__setting-input" }, Ea = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Ta = { class: "vuefinder__about-modal__setting-label" }, Ma = ["label"], Aa = ["value"], Da = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Va = { class: "vuefinder__about-modal__shortcuts" }, La = { class: "vuefinder__about-modal__shortcut" }, Oa = { class: "vuefinder__about-modal__shortcut" }, Fa = { class: "vuefinder__about-modal__shortcut" }, Ia = { class: "vuefinder__about-modal__shortcut" }, Ha = { class: "vuefinder__about-modal__shortcut" }, Ra = { class: "vuefinder__about-modal__shortcut" }, Ba = { class: "vuefinder__about-modal__shortcut" }, Ua = { class: "vuefinder__about-modal__shortcut" }, Na = { class: "vuefinder__about-modal__shortcut" }, Pa = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, qa = { class: "vuefinder__about-modal__description" }, Vo = {
  __name: "ModalAbout",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n, clearStore: r } = e.storage, { t: s } = e.i18n, a = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = gt(() => [
      { name: s("About"), key: a.ABOUT },
      { name: s("Settings"), key: a.SETTINGS },
      { name: s("Shortcuts"), key: a.SHORTCUTS },
      { name: s("Reset"), key: a.RESET }
    ]), d = A("about"), i = async () => {
      r(), location.reload();
    }, u = (I) => {
      e.theme.set(I), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Ps : Ns, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, v = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, m = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = re("VueFinderOptions"), $ = Object.fromEntries(
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
        zhCN: "Simplified Chinese (简体中文)",
        zhTW: "Traditional Chinese (繁體中文)"
      }).filter(([I]) => Object.keys(h).includes(I))
    ), T = gt(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (I, D) => (_(), W(Ye, null, {
      buttons: J(() => [
        l("button", {
          type: "button",
          onClick: D[7] || (D[7] = (C) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(s)("Close")), 1)
      ]),
      default: J(() => [
        l("div", Gl, [
          q(nt, {
            icon: o(Pl),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          l("div", Wl, [
            l("div", null, [
              l("div", null, [
                l("nav", Kl, [
                  (_(!0), g(be, null, ke(c.value, (C) => (_(), g("button", {
                    key: C.name,
                    onClick: (V) => d.value = C.key,
                    class: le([C.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": C.current ? "page" : void 0
                  }, b(C.name), 11, Yl))), 128))
                ])
              ])
            ]),
            d.value === a.ABOUT ? (_(), g("div", Xl, [
              l("div", Zl, b(o(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              l("a", Jl, b(o(s)("Project home")), 1),
              l("a", Ql, b(o(s)("Follow on GitHub")), 1)
            ])) : B("", !0),
            d.value === a.SETTINGS ? (_(), g("div", ea, [
              l("div", ta, b(o(s)("Customize your experience with the following settings")), 1),
              l("div", na, [
                l("fieldset", null, [
                  l("div", sa, [
                    l("div", oa, [
                      ue(l("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": D[0] || (D[0] = (C) => o(e).metricUnits = C),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Wt, o(e).metricUnits]
                      ])
                    ]),
                    l("div", ra, [
                      l("label", la, [
                        Z(b(o(s)("Use Metric Units")) + " ", 1),
                        q(_t, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: J(() => [
                            Z(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", aa, [
                    l("div", ia, [
                      ue(l("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": D[1] || (D[1] = (C) => o(e).compactListView = C),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Wt, o(e).compactListView]
                      ])
                    ]),
                    l("div", ca, [
                      l("label", da, [
                        Z(b(o(s)("Compact list view")) + " ", 1),
                        q(_t, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: J(() => [
                            Z(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", ua, [
                    l("div", va, [
                      ue(l("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": D[2] || (D[2] = (C) => o(e).persist = C),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Wt, o(e).persist]
                      ])
                    ]),
                    l("div", _a, [
                      l("label", fa, [
                        Z(b(o(s)("Persist path on reload")) + " ", 1),
                        q(_t, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: J(() => [
                            Z(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", ma, [
                    l("div", pa, [
                      ue(l("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": D[3] || (D[3] = (C) => o(e).showThumbnails = C),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Wt, o(e).showThumbnails]
                      ])
                    ]),
                    l("div", ha, [
                      l("label", ga, [
                        Z(b(o(s)("Show thumbnails")) + " ", 1),
                        q(_t, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: J(() => [
                            Z(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", ba, [
                    l("div", wa, [
                      l("label", ya, b(o(s)("Theme")), 1)
                    ]),
                    l("div", ka, [
                      ue(l("select", {
                        id: "theme",
                        "onUpdate:modelValue": D[4] || (D[4] = (C) => o(e).theme.value = C),
                        onChange: D[5] || (D[5] = (C) => u(C.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: o(s)("Theme")
                        }, [
                          (_(!0), g(be, null, ke(T.value, (C, V) => (_(), g("option", { value: V }, b(C), 9, Sa))), 256))
                        ], 8, xa)
                      ], 544), [
                        [Dn, o(e).theme.value]
                      ]),
                      q(_t, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: J(() => [
                          Z(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  o(e).features.includes(o(de).LANGUAGE) && Object.keys(o($)).length > 1 ? (_(), g("div", $a, [
                    l("div", Ca, [
                      l("label", Ea, b(o(s)("Language")), 1)
                    ]),
                    l("div", Ta, [
                      ue(l("select", {
                        id: "language",
                        "onUpdate:modelValue": D[6] || (D[6] = (C) => o(e).i18n.locale = C),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: o(s)("Language")
                        }, [
                          (_(!0), g(be, null, ke(o($), (C, V) => (_(), g("option", { value: V }, b(C), 9, Aa))), 256))
                        ], 8, Ma)
                      ], 512), [
                        [Dn, o(e).i18n.locale]
                      ]),
                      q(_t, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: J(() => [
                          Z(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : B("", !0)
                ])
              ])
            ])) : B("", !0),
            d.value === a.SHORTCUTS ? (_(), g("div", Da, [
              l("div", Va, [
                l("div", La, [
                  l("div", null, b(o(s)("Rename")), 1),
                  D[8] || (D[8] = l("kbd", null, "F2", -1))
                ]),
                l("div", Oa, [
                  l("div", null, b(o(s)("Refresh")), 1),
                  D[9] || (D[9] = l("kbd", null, "F5", -1))
                ]),
                l("div", Fa, [
                  Z(b(o(s)("Delete")) + " ", 1),
                  D[10] || (D[10] = l("kbd", null, "Del", -1))
                ]),
                l("div", Ia, [
                  Z(b(o(s)("Escape")) + " ", 1),
                  D[11] || (D[11] = l("div", null, [
                    l("kbd", null, "Esc")
                  ], -1))
                ]),
                l("div", Ha, [
                  Z(b(o(s)("Select All")) + " ", 1),
                  D[12] || (D[12] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Z(" + "),
                    l("kbd", null, "A")
                  ], -1))
                ]),
                l("div", Ra, [
                  Z(b(o(s)("Search")) + " ", 1),
                  D[13] || (D[13] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Z(" + "),
                    l("kbd", null, "F")
                  ], -1))
                ]),
                l("div", Ba, [
                  Z(b(o(s)("Toggle Sidebar")) + " ", 1),
                  D[14] || (D[14] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Z(" + "),
                    l("kbd", null, "E")
                  ], -1))
                ]),
                l("div", Ua, [
                  Z(b(o(s)("Open Settings")) + " ", 1),
                  D[15] || (D[15] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Z(" + "),
                    l("kbd", null, ",")
                  ], -1))
                ]),
                l("div", Na, [
                  Z(b(o(s)("Toggle Full Screen")) + " ", 1),
                  D[16] || (D[16] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Z(" + "),
                    l("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : B("", !0),
            d.value === a.RESET ? (_(), g("div", Pa, [
              l("div", qa, b(o(s)("Reset all settings to default")), 1),
              l("button", {
                onClick: i,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(s)("Reset Settings")), 1)
            ])) : B("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, za = ["title"], Xe = {
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
    const n = e, r = re("ServiceContainer"), { t: s } = r.i18n, a = A(!1), c = A(null), d = A((u = c.value) == null ? void 0 : u.strMessage);
    De(d, () => a.value = !1);
    const i = () => {
      n("hidden"), a.value = !0;
    };
    return (f, v) => (_(), g("div", null, [
      a.value ? B("", !0) : (_(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: le(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        At(f.$slots, "default"),
        l("div", {
          class: "vuefinder__message__close",
          onClick: i,
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
        ]), 8, za)
      ], 2))
    ]));
  }
}, ja = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ga(t, e) {
  return _(), g("svg", ja, e[0] || (e[0] = [
    l("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ]));
}
const Lo = { render: Ga }, Wa = { class: "vuefinder__delete-modal__content" }, Ka = { class: "vuefinder__delete-modal__form" }, Ya = { class: "vuefinder__delete-modal__description" }, Xa = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Za = { class: "vuefinder__delete-modal__file" }, Ja = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qa = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ei = { class: "vuefinder__delete-modal__file-name" }, ti = { class: "vuefinder__delete-modal__warning" }, ds = {
  __name: "ModalDelete",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(e.modal.data.items), s = A(""), a = () => {
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
    return (c, d) => (_(), W(Ye, null, {
      buttons: J(() => [
        l("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-danger"
        }, b(o(n)("Yes, Delete!")), 1),
        l("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        l("div", ti, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: J(() => [
        l("div", null, [
          q(nt, {
            icon: o(Lo),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          l("div", Wa, [
            l("div", Ka, [
              l("p", Ya, b(o(n)("Are you sure you want to delete these files?")), 1),
              l("div", Xa, [
                (_(!0), g(be, null, ke(r.value, (i) => (_(), g("p", Za, [
                  i.type === "dir" ? (_(), g("svg", Ja, d[2] || (d[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), g("svg", Qa, d[3] || (d[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  l("span", ei, b(i.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (_(), W(Xe, {
                key: 0,
                onHidden: d[0] || (d[0] = (i) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : B("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ni = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function si(t, e) {
  return _(), g("svg", ni, e[0] || (e[0] = [
    l("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const Oo = { render: si }, oi = { class: "vuefinder__rename-modal__content" }, ri = { class: "vuefinder__rename-modal__item" }, li = { class: "vuefinder__rename-modal__item-info" }, ai = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ii = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ci = { class: "vuefinder__rename-modal__item-name" }, us = {
  __name: "ModalRename",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(e.modal.data.items[0]), s = A(e.modal.data.items[0].basename), a = A(""), c = () => {
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
          a.value = n(d.message);
        }
      });
    };
    return (d, i) => (_(), W(Ye, null, {
      buttons: J(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Rename")), 1),
        l("button", {
          type: "button",
          onClick: i[2] || (i[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: J(() => [
        l("div", null, [
          q(nt, {
            icon: o(Oo),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          l("div", oi, [
            l("div", ri, [
              l("p", li, [
                r.value.type === "dir" ? (_(), g("svg", ai, i[3] || (i[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (_(), g("svg", ii, i[4] || (i[4] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", ci, b(r.value.basename), 1)
              ]),
              ue(l("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (u) => s.value = u),
                onKeyup: xt(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [St, s.value]
              ]),
              a.value.length ? (_(), W(Xe, {
                key: 0,
                onHidden: i[1] || (i[1] = (u) => a.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(a.value), 1)
                ]),
                _: 1
              })) : B("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ze = {
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
function di(t) {
  const e = (n) => {
    n.code === Ze.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Ze.F2 && t.features.includes(de.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(us, { items: t.dragSelect.getSelected() })), n.code === Ze.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Ze.DELETE && (!t.dragSelect.getCount() || t.modal.open(ds, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Ze.BACKSLASH && t.modal.open(Vo), n.metaKey && n.code === Ze.KEY_F && t.features.includes(de.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Ze.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Ze.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Ze.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
  };
  Ce(() => {
    t.root.addEventListener("keydown", e);
  });
}
const ui = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function vi(t, e) {
  return _(), g("svg", ui, e[0] || (e[0] = [
    l("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const Fo = { render: vi }, _i = { class: "vuefinder__new-folder-modal__content" }, fi = { class: "vuefinder__new-folder-modal__form" }, mi = { class: "vuefinder__new-folder-modal__description" }, pi = ["placeholder"], Io = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, r = A(""), s = A(""), a = () => {
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
    return (c, d) => (_(), W(Ye, null, {
      buttons: J(() => [
        l("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        l("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: J(() => [
        l("div", null, [
          q(nt, {
            icon: o(Fo),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          l("div", _i, [
            l("div", fi, [
              l("p", mi, b(o(n)("Create a new folder")), 1),
              ue(l("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => r.value = i),
                onKeyup: xt(a, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text"
              }, null, 40, pi), [
                [St, r.value]
              ]),
              s.value.length ? (_(), W(Xe, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : B("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function gi(t, e) {
  return _(), g("svg", hi, e[0] || (e[0] = [
    l("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ]));
}
const Ho = { render: gi }, bi = { class: "vuefinder__new-file-modal__content" }, wi = { class: "vuefinder__new-file-modal__form" }, yi = { class: "vuefinder__new-file-modal__description" }, ki = ["placeholder"], xi = {
  __name: "ModalNewFile",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, r = A(""), s = A(""), a = () => {
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
    return (c, d) => (_(), W(Ye, null, {
      buttons: J(() => [
        l("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        l("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: J(() => [
        l("div", null, [
          q(nt, {
            icon: o(Ho),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          l("div", bi, [
            l("div", wi, [
              l("p", yi, b(o(n)("Create a new file")), 1),
              ue(l("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => r.value = i),
                onKeyup: xt(a, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, ki), [
                [St, r.value]
              ]),
              s.value.length ? (_(), W(Xe, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : B("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function Wn(t, e = 14) {
  let n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const Si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function $i(t, e) {
  return _(), g("svg", Si, e[0] || (e[0] = [
    l("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ]));
}
const Ro = { render: $i }, Ci = { class: "vuefinder__upload-modal__content" }, Ei = {
  key: 0,
  class: "pointer-events-none"
}, Ti = {
  key: 1,
  class: "pointer-events-none"
}, Mi = ["disabled"], Ai = ["disabled"], Di = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Vi = ["textContent"], Li = { class: "vuefinder__upload-modal__file-info" }, Oi = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Fi = { class: "vuefinder__upload-modal__file-name md:hidden" }, Ii = {
  key: 0,
  class: "ml-auto"
}, Hi = ["title", "disabled", "onClick"], Ri = {
  key: 0,
  class: "py-2"
}, Bi = ["disabled"], Ui = {
  __name: "ModalUpload",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, a = A({ QUEUE_ENTRY_STATUS: s }), c = A(null), d = A(null), i = A(null), u = A(null), f = A(null), v = A(null), p = A([]), m = A(""), h = A(!1), x = A(!1);
    let $;
    function T(k) {
      return p.value.findIndex((H) => H.id === k);
    }
    function I(k, H = null) {
      H = H ?? (k.webkitRelativePath || k.name), $.addFile({
        name: H,
        type: k.type,
        data: k,
        source: "Local"
      });
    }
    function D(k) {
      switch (k.status) {
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
    const C = (k) => {
      switch (k.status) {
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
    function F() {
      if (!h.value) {
        if (!p.value.filter((k) => k.status !== s.DONE).length) {
          m.value = n("Please select file to upload first.");
          return;
        }
        m.value = "", $.retryAll(), $.upload();
      }
    }
    function z() {
      $.cancelAll({ reason: "user" }), p.value.forEach((k) => {
        k.status !== s.DONE && (k.status = s.CANCELED, k.statusName = n("Canceled"));
      }), h.value = !1;
    }
    function O(k) {
      h.value || ($.removeFile(k.id, "removed-by-user"), p.value.splice(T(k.id), 1));
    }
    function w(k) {
      if (!h.value) {
        if ($.cancelAll({ reason: "user" }), k) {
          const H = [];
          p.value.forEach((S) => {
            S.status !== s.DONE && H.push(S);
          }), p.value = [], H.forEach((S) => {
            I(S.originalFile, S.name);
          });
          return;
        }
        p.value.splice(0);
      }
    }
    function y() {
      e.modal.close();
    }
    function L() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Ce(async () => {
      $ = new fr({
        debug: e.debug,
        restrictions: {
          maxFileSize: $r(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(S, U) {
          if (U[S.id] != null) {
            const Q = T(S.id);
            p.value[Q].status === s.PENDING && (m.value = $.i18n("noDuplicates", { fileName: S.name })), p.value = p.value.filter((se) => se.id !== S.id);
          }
          return p.value.push({
            id: S.id,
            name: S.name,
            size: e.filesize(S.size),
            status: s.PENDING,
            statusName: n("Pending upload"),
            percent: null,
            originalFile: S.data
          }), !0;
        }
      }), $.use(mr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(S, U) {
          let N;
          try {
            N = JSON.parse(S).message;
          } catch {
            N = n("Cannot parse server response.");
          }
          return new Error(N);
        }
      }), $.on("restriction-failed", (S, U) => {
        const N = p.value[T(S.id)];
        O(N), m.value = U.message;
      }), $.on("upload", () => {
        const S = L();
        $.setMeta({ ...S.body });
        const U = $.getPlugin("XHRUpload");
        U.opts.method = S.method, U.opts.endpoint = S.url + "?" + new URLSearchParams(S.params), U.opts.headers = S.headers, delete S.headers["Content-Type"], h.value = !0, p.value.forEach((N) => {
          N.status !== s.DONE && (N.percent = null, N.status = s.UPLOADING, N.statusName = n("Pending upload"));
        });
      }), $.on("upload-progress", (S, U) => {
        const N = Math.floor(U.bytesUploaded / U.bytesTotal * 100);
        p.value[T(S.id)].percent = `${N}%`;
      }), $.on("upload-success", (S) => {
        const U = p.value[T(S.id)];
        U.status = s.DONE, U.statusName = n("Done");
      }), $.on("upload-error", (S, U) => {
        const N = p.value[T(S.id)];
        N.percent = null, N.status = s.ERROR, U.isNetworkError ? N.statusName = n("Network Error, Unable establish connection to the server or interrupted.") : N.statusName = U ? U.message : n("Unknown Error");
      }), $.on("error", (S) => {
        m.value = S.message, h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), $.on("complete", () => {
        h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), f.value.addEventListener("click", () => {
        i.value.click();
      }), v.value.addEventListener("dragover", (S) => {
        S.preventDefault(), x.value = !0;
      }), v.value.addEventListener("dragleave", (S) => {
        S.preventDefault(), x.value = !1;
      });
      function k(S, U) {
        U.isFile && U.file((N) => S(U, N)), U.isDirectory && U.createReader().readEntries((N) => {
          N.forEach((Q) => {
            k(S, Q);
          });
        });
      }
      v.value.addEventListener("drop", (S) => {
        S.preventDefault(), x.value = !1;
        const U = /^[/\\](.+)/;
        [...S.dataTransfer.items].forEach((N) => {
          N.kind === "file" && k((Q, se) => {
            const ne = U.exec(Q.fullPath);
            I(se, ne[1]);
          }, N.webkitGetAsEntry());
        });
      });
      const H = ({ target: S }) => {
        const U = S.files;
        for (const N of U)
          I(N);
        S.value = "";
      };
      d.value.addEventListener("change", H), i.value.addEventListener("change", H);
    }), Bs(() => {
      $ == null || $.close({ reason: "unmount" });
    }), (k, H) => (_(), W(Ye, null, {
      buttons: J(() => [
        l("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: et(F, ["prevent"])
        }, b(o(n)("Upload")), 9, Bi),
        h.value ? (_(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(z, ["prevent"])
        }, b(o(n)("Cancel")), 1)) : (_(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(y, ["prevent"])
        }, b(o(n)("Close")), 1))
      ]),
      default: J(() => [
        l("div", null, [
          q(nt, {
            icon: o(Ro),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          l("div", Ci, [
            l("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: v,
              onClick: V
            }, [
              x.value ? (_(), g("div", Ei, b(o(n)("Release to drop these files.")), 1)) : (_(), g("div", Ti, b(o(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            l("div", {
              ref_key: "container",
              ref: c,
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
                ref: f,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(n)("Select Folders")), 513),
              l("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: H[0] || (H[0] = (S) => w(!1))
              }, b(o(n)("Clear all")), 9, Mi),
              l("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: H[1] || (H[1] = (S) => w(!0))
              }, b(o(n)("Clear only successful")), 9, Ai)
            ], 512),
            l("div", Di, [
              (_(!0), g(be, null, ke(p.value, (S) => (_(), g("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: S.id
              }, [
                l("span", {
                  class: le(["vuefinder__upload-modal__file-icon", D(S)])
                }, [
                  l("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(C(S))
                  }, null, 8, Vi)
                ], 2),
                l("div", Li, [
                  l("div", Oi, b(o(Wn)(S.name, 40)) + " (" + b(S.size) + ")", 1),
                  l("div", Fi, b(o(Wn)(S.name, 16)) + " (" + b(S.size) + ")", 1),
                  l("div", {
                    class: le(["vuefinder__upload-modal__file-status", D(S)])
                  }, [
                    Z(b(S.statusName) + " ", 1),
                    S.status === a.value.QUEUE_ENTRY_STATUS.UPLOADING ? (_(), g("b", Ii, b(S.percent), 1)) : B("", !0)
                  ], 2)
                ]),
                l("button", {
                  type: "button",
                  class: le(["vuefinder__upload-modal__file-remove", h.value ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: h.value,
                  onClick: (U) => O(S)
                }, H[3] || (H[3] = [
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
                ]), 10, Hi)
              ]))), 128)),
              p.value.length ? B("", !0) : (_(), g("div", Ri, b(o(n)("No files selected!")), 1))
            ]),
            m.value.length ? (_(), W(Xe, {
              key: 0,
              onHidden: H[2] || (H[2] = (S) => m.value = ""),
              error: ""
            }, {
              default: J(() => [
                Z(b(m.value), 1)
              ]),
              _: 1
            })) : B("", !0)
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
}, Ni = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Pi(t, e) {
  return _(), g("svg", Ni, e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Bo = { render: Pi }, qi = { class: "vuefinder__unarchive-modal__content" }, zi = { class: "vuefinder__unarchive-modal__items" }, ji = { class: "vuefinder__unarchive-modal__item" }, Gi = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wi = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ki = { class: "vuefinder__unarchive-modal__item-name" }, Yi = { class: "vuefinder__unarchive-modal__info" }, Uo = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(e.modal.data.items[0]), s = A(""), a = A([]), c = () => {
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
    return (d, i) => (_(), W(Ye, null, {
      buttons: J(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Unarchive")), 1),
        l("button", {
          type: "button",
          onClick: i[1] || (i[1] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: J(() => [
        l("div", null, [
          q(nt, {
            icon: o(Bo),
            title: o(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          l("div", qi, [
            l("div", zi, [
              (_(!0), g(be, null, ke(a.value, (u) => (_(), g("p", ji, [
                u.type === "dir" ? (_(), g("svg", Gi, i[2] || (i[2] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (_(), g("svg", Wi, i[3] || (i[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", Ki, b(u.basename), 1)
              ]))), 256)),
              l("p", Yi, b(o(n)("The archive will be unarchived at")) + " (" + b(o(e).fs.data.dirname) + ")", 1),
              s.value.length ? (_(), W(Xe, {
                key: 0,
                onHidden: i[0] || (i[0] = (u) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : B("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Zi(t, e) {
  return _(), g("svg", Xi, e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const No = { render: Zi }, Ji = { class: "vuefinder__archive-modal__content" }, Qi = { class: "vuefinder__archive-modal__form" }, ec = { class: "vuefinder__archive-modal__files vf-scrollbar" }, tc = { class: "vuefinder__archive-modal__file" }, nc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, sc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, oc = { class: "vuefinder__archive-modal__file-name" }, rc = ["placeholder"], Po = {
  __name: "ModalArchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(""), s = A(""), a = A(e.modal.data.items), c = () => {
      a.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: a.value.map(({ path: d, type: i }) => ({ path: d, type: i })),
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
    return (d, i) => (_(), W(Ye, null, {
      buttons: J(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Archive")), 1),
        l("button", {
          type: "button",
          onClick: i[2] || (i[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: J(() => [
        l("div", null, [
          q(nt, {
            icon: o(No),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          l("div", Ji, [
            l("div", Qi, [
              l("div", ec, [
                (_(!0), g(be, null, ke(a.value, (u) => (_(), g("p", tc, [
                  u.type === "dir" ? (_(), g("svg", nc, i[3] || (i[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), g("svg", sc, i[4] || (i[4] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  l("span", oc, b(u.basename), 1)
                ]))), 256))
              ]),
              ue(l("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (u) => r.value = u),
                onKeyup: xt(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, rc), [
                [St, r.value]
              ]),
              s.value.length ? (_(), W(Xe, {
                key: 0,
                onHidden: i[1] || (i[1] = (u) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : B("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function ac(t, e) {
  return _(), g("svg", lc, e[0] || (e[0] = [
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
const vs = { render: ac }, ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function cc(t, e) {
  return _(), g("svg", ic, e[0] || (e[0] = [
    l("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ]));
}
const dc = { render: cc }, uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function vc(t, e) {
  return _(), g("svg", uc, e[0] || (e[0] = [
    l("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ]));
}
const _c = { render: vc }, fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function mc(t, e) {
  return _(), g("svg", fc, e[0] || (e[0] = [
    l("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ]));
}
const pc = { render: mc }, hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function gc(t, e) {
  return _(), g("svg", hc, e[0] || (e[0] = [
    l("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const bc = { render: gc }, wc = { class: "vuefinder__toolbar" }, yc = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, kc = ["title"], xc = ["title"], Sc = ["title"], $c = ["title"], Cc = ["title"], Ec = ["title"], Tc = ["title"], Mc = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Ac = { class: "pl-2" }, Dc = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Vc = { class: "vuefinder__toolbar__controls" }, Lc = ["title"], Oc = ["title"], Fc = {
  __name: "Toolbar",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, { t: r } = e.i18n, s = e.dragSelect, a = A("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      a.value = i;
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
    return (i, u) => (_(), g("div", wc, [
      a.value.length ? (_(), g("div", Mc, [
        l("div", Ac, [
          Z(b(o(r)("Search results for")) + " ", 1),
          l("span", Dc, b(a.value), 1)
        ]),
        o(e).loadingIndicator === "circular" && o(e).fs.loading ? (_(), W(o(vs), { key: 0 })) : B("", !0)
      ])) : (_(), g("div", yc, [
        o(e).features.includes(o(de).NEW_FOLDER) ? (_(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(r)("New Folder"),
          onClick: u[0] || (u[0] = (f) => o(e).modal.open(Io, { items: o(s).getSelected() }))
        }, [
          q(o(Fo))
        ], 8, kc)) : B("", !0),
        o(e).features.includes(o(de).NEW_FILE) ? (_(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(r)("New File"),
          onClick: u[1] || (u[1] = (f) => o(e).modal.open(xi, { items: o(s).getSelected() }))
        }, [
          q(o(Ho))
        ], 8, xc)) : B("", !0),
        o(e).features.includes(o(de).RENAME) ? (_(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: o(r)("Rename"),
          onClick: u[2] || (u[2] = (f) => o(s).getCount() !== 1 || o(e).modal.open(us, { items: o(s).getSelected() }))
        }, [
          q(o(Oo), {
            class: le(o(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Sc)) : B("", !0),
        o(e).features.includes(o(de).DELETE) ? (_(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: o(r)("Delete"),
          onClick: u[3] || (u[3] = (f) => !o(s).getCount() || o(e).modal.open(ds, { items: o(s).getSelected() }))
        }, [
          q(o(Lo), {
            class: le(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, $c)) : B("", !0),
        o(e).features.includes(o(de).UPLOAD) ? (_(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: o(r)("Upload"),
          onClick: u[4] || (u[4] = (f) => o(e).modal.open(Ui, { items: o(s).getSelected() }))
        }, [
          q(o(Ro))
        ], 8, Cc)) : B("", !0),
        o(e).features.includes(o(de).UNARCHIVE) && o(s).getCount() === 1 && o(s).getSelected()[0].mime_type === "application/zip" ? (_(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: o(r)("Unarchive"),
          onClick: u[5] || (u[5] = (f) => !o(s).getCount() || o(e).modal.open(Uo, { items: o(s).getSelected() }))
        }, [
          q(o(Bo), {
            class: le(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ec)) : B("", !0),
        o(e).features.includes(o(de).ARCHIVE) ? (_(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: o(r)("Archive"),
          onClick: u[6] || (u[6] = (f) => !o(s).getCount() || o(e).modal.open(Po, { items: o(s).getSelected() }))
        }, [
          q(o(No), {
            class: le(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Tc)) : B("", !0)
      ])),
      l("div", Vc, [
        o(e).features.includes(o(de).FULL_SCREEN) ? (_(), g("div", {
          key: 0,
          onClick: c,
          class: "mx-1.5",
          title: o(r)("Toggle Full Screen")
        }, [
          o(e).fullScreen ? (_(), W(o(_c), { key: 0 })) : (_(), W(o(dc), { key: 1 }))
        ], 8, Lc)) : B("", !0),
        l("div", {
          class: "mx-1.5",
          title: o(r)("Change View"),
          onClick: u[7] || (u[7] = (f) => a.value.length || d())
        }, [
          o(e).view === "grid" ? (_(), W(o(pc), {
            key: 0,
            class: le(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : B("", !0),
          o(e).view === "list" ? (_(), W(o(bc), {
            key: 1,
            class: le(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : B("", !0)
        ], 8, Oc)
      ])
    ]));
  }
}, Ic = (t, e = 0, n = !1) => {
  let r;
  return (...s) => {
    n && !r && t(...s), clearTimeout(r), r = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Fs = (t, e, n) => {
  const r = A(t);
  return rr((s, a) => ({
    get() {
      return s(), r.value;
    },
    set: Ic(
      (c) => {
        r.value = c, a();
      },
      e,
      n
    )
  }));
}, Hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Rc(t, e) {
  return _(), g("svg", Hc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const Bc = { render: Rc }, Uc = { class: "vuefinder__move-modal__content" }, Nc = { class: "vuefinder__move-modal__description" }, Pc = { class: "vuefinder__move-modal__files vf-scrollbar" }, qc = { class: "vuefinder__move-modal__file" }, zc = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jc = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gc = { class: "vuefinder__move-modal__file-name" }, Wc = { class: "vuefinder__move-modal__target-title" }, Kc = { class: "vuefinder__move-modal__target-directory" }, Yc = { class: "vuefinder__move-modal__target-path" }, Xc = { class: "vuefinder__move-modal__selected-items" }, Kn = {
  __name: "ModalMove",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(e.modal.data.items.from), s = A(""), a = () => {
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
    return (c, d) => (_(), W(Ye, null, {
      buttons: J(() => [
        l("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Yes, Move!")), 1),
        l("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        l("div", Xc, b(o(n)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: J(() => [
        l("div", null, [
          q(nt, {
            icon: o(Bc),
            title: o(n)("Move files")
          }, null, 8, ["icon", "title"]),
          l("div", Uc, [
            l("p", Nc, b(o(n)("Are you sure you want to move these files?")), 1),
            l("div", Pc, [
              (_(!0), g(be, null, ke(r.value, (i) => (_(), g("div", qc, [
                l("div", null, [
                  i.type === "dir" ? (_(), g("svg", zc, d[2] || (d[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), g("svg", jc, d[3] || (d[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                l("div", Gc, b(i.path), 1)
              ]))), 256))
            ]),
            l("h4", Wc, b(o(n)("Target Directory")), 1),
            l("p", Kc, [
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
              l("span", Yc, b(o(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (_(), W(Xe, {
              key: 0,
              onHidden: d[0] || (d[0] = (i) => s.value = ""),
              error: ""
            }, {
              default: J(() => [
                Z(b(s.value), 1)
              ]),
              _: 1
            })) : B("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function Jc(t, e) {
  return _(), g("svg", Zc, e[0] || (e[0] = [
    l("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ]));
}
const Qc = { render: Jc }, ed = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function td(t, e) {
  return _(), g("svg", ed, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const nd = { render: td }, sd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function od(t, e) {
  return _(), g("svg", sd, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const rd = { render: od }, ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function ad(t, e) {
  return _(), g("svg", ld, e[0] || (e[0] = [
    l("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ]));
}
const id = { render: ad }, cd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function dd(t, e) {
  return _(), g("svg", cd, e[0] || (e[0] = [
    l("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ]));
}
const ud = { render: dd }, vd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function _d(t, e) {
  return _(), g("svg", vd, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const fd = { render: _d }, md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function pd(t, e) {
  return _(), g("svg", md, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ]));
}
const bn = { render: pd }, hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function gd(t, e) {
  return _(), g("svg", hd, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ]));
}
const bd = { render: gd }, wd = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function yd(t, e) {
  return _(), g("svg", wd, e[0] || (e[0] = [
    l("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const kd = { render: yd }, xd = { class: "vuefinder__breadcrumb__container" }, Sd = ["title"], $d = ["title"], Cd = ["title"], Ed = ["title"], Td = { class: "vuefinder__breadcrumb__list" }, Md = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Ad = { class: "relative" }, Dd = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Vd = { class: "vuefinder__breadcrumb__search-mode" }, Ld = ["placeholder"], Od = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Fd = ["onDrop", "onClick"], Id = { class: "vuefinder__breadcrumb__hidden-item-content" }, Hd = { class: "vuefinder__breadcrumb__hidden-item-text" }, Rd = {
  __name: "Breadcrumb",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = e.dragSelect, { setStore: s } = e.storage, a = A(null), c = Fs(0, 100);
    De(c, (O) => {
      const w = a.value.children;
      let y = 0, L = 0, k = 5, H = 1;
      e.fs.limitBreadcrumbItems(k), dt(() => {
        for (let S = w.length - 1; S >= 0 && !(y + w[S].offsetWidth > c.value - 40); S--)
          y += parseInt(w[S].offsetWidth, 10), L++;
        L < H && (L = H), L > k && (L = k), e.fs.limitBreadcrumbItems(L);
      });
    });
    const d = () => {
      c.value = a.value.offsetWidth;
    };
    let i = A(null);
    Ce(() => {
      i.value = new ResizeObserver(d), i.value.observe(a.value);
    }), Yn(() => {
      i.value.disconnect();
    });
    const u = (O, w = null) => {
      O.preventDefault(), r.isDraggingRef.value = !1, p(O), w ?? (w = e.fs.hiddenBreadcrumbs.length - 1);
      let y = JSON.parse(O.dataTransfer.getData("items"));
      if (y.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Kn, {
        items: {
          from: y,
          to: e.fs.hiddenBreadcrumbs[w] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, f = (O, w = null) => {
      O.preventDefault(), r.isDraggingRef.value = !1, p(O), w ?? (w = e.fs.breadcrumbs.length - 2);
      let y = JSON.parse(O.dataTransfer.getData("items"));
      if (y.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Kn, {
        items: {
          from: y,
          to: e.fs.breadcrumbs[w] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, v = (O) => {
      O.preventDefault(), e.fs.isGoUpAvailable() ? (O.dataTransfer.dropEffect = "copy", O.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (O.dataTransfer.dropEffect = "none", O.dataTransfer.effectAllowed = "none");
    }, p = (O) => {
      O.preventDefault(), O.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && O.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, m = () => {
      F(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      F(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, x = (O) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: O.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, $ = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, T = {
      mounted(O, w, y, L) {
        O.clickOutsideEvent = function(k) {
          O === k.target || O.contains(k.target) || w.value();
        }, document.body.addEventListener("click", O.clickOutsideEvent);
      },
      beforeUnmount(O, w, y, L) {
        document.body.removeEventListener("click", O.clickOutsideEvent);
      }
    }, I = () => {
      e.showTreeView = !e.showTreeView;
    };
    De(() => e.showTreeView, (O, w) => {
      O !== w && s("show-tree-view", O);
    });
    const D = A(null), C = () => {
      e.features.includes(de.SEARCH) && (e.fs.searchMode = !0, dt(() => D.value.focus()));
    }, V = Fs("", 400);
    De(V, (O) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: O });
    }), De(() => e.fs.searchMode, (O) => {
      O && dt(() => D.value.focus());
    });
    const F = () => {
      e.fs.searchMode = !1, V.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      F();
    });
    const z = () => {
      V.value === "" && F();
    };
    return (O, w) => (_(), g("div", xd, [
      l("span", {
        title: o(n)("Toggle Tree View")
      }, [
        q(o(bd), {
          onClick: I,
          class: le(["vuefinder__breadcrumb__toggle-tree", o(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Sd),
      l("span", {
        title: o(n)("Go up a directory")
      }, [
        q(o(nd), {
          onDragover: w[0] || (w[0] = (y) => v(y)),
          onDragleave: w[1] || (w[1] = (y) => p(y)),
          onDrop: w[2] || (w[2] = (y) => f(y)),
          onClick: h,
          class: le(o(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, $d),
      o(e).fs.loading ? (_(), g("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        q(o(rd), {
          onClick: w[3] || (w[3] = (y) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Ed)) : (_(), g("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        q(o(Qc), { onClick: m })
      ], 8, Cd)),
      ue(l("div", {
        onClick: et(C, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        l("div", null, [
          q(o(id), {
            onDragover: w[4] || (w[4] = (y) => v(y)),
            onDragleave: w[5] || (w[5] = (y) => p(y)),
            onDrop: w[6] || (w[6] = (y) => f(y, -1)),
            onClick: w[7] || (w[7] = (y) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter } }))
          })
        ]),
        l("div", Td, [
          o(e).fs.hiddenBreadcrumbs.length ? ue((_(), g("div", Md, [
            w[13] || (w[13] = l("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("div", Ad, [
              l("span", {
                onDragenter: w[8] || (w[8] = (y) => o(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: w[9] || (w[9] = (y) => o(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                q(o(kd), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [T, $]
          ]) : B("", !0)
        ]),
        l("div", {
          ref_key: "breadcrumbContainer",
          ref: a,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: et(C, ["self"])
        }, [
          (_(!0), g(be, null, ke(o(e).fs.breadcrumbs, (y, L) => (_(), g("div", { key: L }, [
            w[14] || (w[14] = l("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("span", {
              onDragover: (k) => L === o(e).fs.breadcrumbs.length - 1 || v(k),
              onDragleave: (k) => L === o(e).fs.breadcrumbs.length - 1 || p(k),
              onDrop: (k) => L === o(e).fs.breadcrumbs.length - 1 || f(k, L),
              class: "vuefinder__breadcrumb__item",
              title: y.basename,
              onClick: (k) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter, path: y.path } })
            }, b(y.name), 41, Dd)
          ]))), 128))
        ], 512),
        o(e).loadingIndicator === "circular" && o(e).fs.loading ? (_(), W(o(vs), { key: 0 })) : B("", !0)
      ], 512), [
        [qe, !o(e).fs.searchMode]
      ]),
      ue(l("div", Vd, [
        l("div", null, [
          q(o(ud))
        ]),
        ue(l("input", {
          ref_key: "searchInput",
          ref: D,
          onKeydown: xt(F, ["esc"]),
          onBlur: z,
          "onUpdate:modelValue": w[10] || (w[10] = (y) => lr(V) ? V.value = y : null),
          placeholder: o(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Ld), [
          [St, o(V)]
        ]),
        q(o(fd), { onClick: F })
      ], 512), [
        [qe, o(e).fs.searchMode]
      ]),
      ue(l("div", Od, [
        (_(!0), g(be, null, ke(o(e).fs.hiddenBreadcrumbs, (y, L) => (_(), g("div", {
          key: L,
          onDragover: w[11] || (w[11] = (k) => v(k)),
          onDragleave: w[12] || (w[12] = (k) => p(k)),
          onDrop: (k) => u(k, L),
          onClick: (k) => x(y),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          l("div", Id, [
            l("span", null, [
              q(o(bn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            w[15] || (w[15] = Z()),
            l("span", Hd, b(y.name), 1)
          ])
        ], 40, Fd))), 128))
      ], 512), [
        [qe, o(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, qo = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Bd = ["onClick"], Ud = {
  __name: "Toast",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, r = A(n("full-screen", !1)), s = A([]), a = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (i) => {
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
    }), (i, u) => (_(), g("div", {
      class: le(["vuefinder__toast", r.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      q(ar, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: J(() => [
          (_(!0), g(be, null, ke(s.value, (f, v) => (_(), g("div", {
            key: v,
            onClick: (p) => c(v),
            class: le(["vuefinder__toast__message", a(f.type)])
          }, b(f.label), 11, Bd))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Nd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Pd(t, e) {
  return _(), g("svg", Nd, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const qd = { render: Pd }, zd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function jd(t, e) {
  return _(), g("svg", zd, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Gd = { render: jd }, Xt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (_(), g("div", null, [
      t.direction === "asc" ? (_(), W(o(qd), { key: 0 })) : B("", !0),
      t.direction === "desc" ? (_(), W(o(Gd), { key: 1 })) : B("", !0)
    ]));
  }
}, Wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Kd(t, e) {
  return _(), g("svg", Wd, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Yd = { render: Kd }, Xd = { class: "vuefinder__item-icon" }, Mn = {
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
    return (e, n) => (_(), g("span", Xd, [
      t.type === "dir" ? (_(), W(o(bn), {
        key: 0,
        class: le(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (_(), W(o(Yd), {
        key: 1,
        class: le(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, Zd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function Jd(t, e) {
  return _(), g("svg", Zd, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Qd = { render: Jd }, eu = { class: "vuefinder__drag-item__container" }, tu = { class: "vuefinder__drag-item__count" }, nu = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, r) => (_(), g("div", eu, [
      q(o(Qd)),
      l("div", tu, b(e.count), 1)
    ]));
  }
}, su = { class: "vuefinder__text-preview" }, ou = { class: "vuefinder__text-preview__header" }, ru = ["title"], lu = { class: "vuefinder__text-preview__actions" }, au = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, iu = { key: 1 }, cu = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = A(""), s = A(""), a = A(null), c = A(!1), d = A(""), i = A(!1), u = re("ServiceContainer"), { t: f } = u.i18n;
    Ce(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((m) => {
        r.value = m, n("success");
      });
    });
    const v = () => {
      c.value = !c.value, s.value = r.value;
    }, p = () => {
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
    return (m, h) => (_(), g("div", su, [
      l("div", ou, [
        l("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(u).modal.data.item.path
        }, b(o(u).modal.data.item.basename), 9, ru),
        l("div", lu, [
          c.value ? (_(), g("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, b(o(f)("Save")), 1)) : B("", !0),
          o(u).features.includes(o(de).EDIT) ? (_(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (x) => v())
          }, b(c.value ? o(f)("Cancel") : o(f)("Edit")), 1)) : B("", !0)
        ])
      ]),
      l("div", null, [
        c.value ? (_(), g("div", iu, [
          ue(l("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": h[1] || (h[1] = (x) => s.value = x),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [St, s.value]
          ])
        ])) : (_(), g("pre", au, b(r.value), 1)),
        d.value.length ? (_(), W(Xe, {
          key: 2,
          onHidden: h[2] || (h[2] = (x) => d.value = ""),
          error: i.value
        }, {
          default: J(() => [
            Z(b(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : B("", !0)
      ])
    ]));
  }
}, du = { class: "vuefinder__image-preview" }, uu = { class: "vuefinder__image-preview__header" }, vu = ["title"], _u = { class: "vuefinder__image-preview__actions" }, fu = { class: "vuefinder__image-preview__image-container" }, mu = ["src"], pu = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = re("ServiceContainer"), { t: s } = r.i18n, a = A(null), c = A(null), d = A(!1), i = A(""), u = A(!1), f = () => {
      d.value = !d.value, d.value ? c.value = new hr(a.value, {
        crop(p) {
        }
      }) : c.value.destroy();
    }, v = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          i.value = "", u.value = !1;
          const m = new FormData();
          m.set("file", p), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: m
          }).then((h) => {
            i.value = s("Updated."), a.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), f(), n("success");
          }).catch((h) => {
            i.value = s(h.message), u.value = !0;
          });
        }
      );
    };
    return Ce(() => {
      n("success");
    }), (p, m) => (_(), g("div", du, [
      l("div", uu, [
        l("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(r).modal.data.item.path
        }, b(o(r).modal.data.item.basename), 9, vu),
        l("div", _u, [
          d.value ? (_(), g("button", {
            key: 0,
            onClick: v,
            class: "vuefinder__image-preview__crop-button"
          }, b(o(s)("Crop")), 1)) : B("", !0),
          o(r).features.includes(o(de).EDIT) ? (_(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: m[0] || (m[0] = (h) => f())
          }, b(d.value ? o(s)("Cancel") : o(s)("Edit")), 1)) : B("", !0)
        ])
      ]),
      l("div", fu, [
        l("img", {
          ref_key: "image",
          ref: a,
          class: "vuefinder__image-preview__image",
          src: o(r).requester.getPreviewUrl(o(r).modal.data.adapter, o(r).modal.data.item),
          alt: ""
        }, null, 8, mu)
      ]),
      i.value.length ? (_(), W(Xe, {
        key: 0,
        onHidden: m[1] || (m[1] = (h) => i.value = ""),
        error: u.value
      }, {
        default: J(() => [
          Z(b(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : B("", !0)
    ]));
  }
}, hu = { class: "vuefinder__default-preview" }, gu = { class: "vuefinder__default-preview__header" }, bu = ["title"], wu = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e;
    return Ce(() => {
      r("success");
    }), (s, a) => (_(), g("div", hu, [
      l("div", gu, [
        l("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: o(n).modal.data.item.path
        }, b(o(n).modal.data.item.basename), 9, bu)
      ]),
      a[0] || (a[0] = l("div", null, null, -1))
    ]));
  }
}, yu = { class: "vuefinder__video-preview" }, ku = ["title"], xu = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, Su = ["src"], $u = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ce(() => {
      r("success");
    }), (a, c) => (_(), g("div", yu, [
      l("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, ku),
      l("div", null, [
        l("video", xu, [
          l("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Su),
          c[0] || (c[0] = Z(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, Cu = { class: "vuefinder__audio-preview" }, Eu = ["title"], Tu = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Mu = ["src"], Au = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = re("ServiceContainer"), s = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return Ce(() => {
      n("success");
    }), (a, c) => (_(), g("div", Cu, [
      l("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(r).modal.data.item.path
      }, b(o(r).modal.data.item.basename), 9, Eu),
      l("div", null, [
        l("audio", Tu, [
          l("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Mu),
          c[0] || (c[0] = Z(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, Du = { class: "vuefinder__pdf-preview" }, Vu = ["title"], Lu = ["data"], Ou = ["src"], Fu = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ce(() => {
      r("success");
    }), (a, c) => (_(), g("div", Du, [
      l("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, Vu),
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
          }, " Your browser does not support PDFs ", 8, Ou)
        ], 8, Lu)
      ])
    ]));
  }
}, Iu = { class: "vuefinder__preview-modal__content" }, Hu = { key: 0 }, Ru = { class: "vuefinder__preview-modal__loading" }, Bu = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Uu = { class: "vuefinder__preview-modal__details" }, Nu = { class: "font-bold" }, Pu = { class: "font-bold pl-2" }, qu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, zu = ["download", "href"], zo = {
  __name: "ModalPreview",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(!1), s = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), a = e.features.includes(de.PREVIEW);
    return a || (r.value = !0), (c, d) => (_(), W(Ye, null, {
      buttons: J(() => [
        l("button", {
          type: "button",
          onClick: d[6] || (d[6] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(de).DOWNLOAD) ? (_(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, b(o(n)("Download")), 9, zu)) : B("", !0)
      ]),
      default: J(() => [
        l("div", null, [
          l("div", Iu, [
            o(a) ? (_(), g("div", Hu, [
              s("text") ? (_(), W(cu, {
                key: 0,
                onSuccess: d[0] || (d[0] = (i) => r.value = !0)
              })) : s("image") ? (_(), W(pu, {
                key: 1,
                onSuccess: d[1] || (d[1] = (i) => r.value = !0)
              })) : s("video") ? (_(), W($u, {
                key: 2,
                onSuccess: d[2] || (d[2] = (i) => r.value = !0)
              })) : s("audio") ? (_(), W(Au, {
                key: 3,
                onSuccess: d[3] || (d[3] = (i) => r.value = !0)
              })) : s("application/pdf") ? (_(), W(Fu, {
                key: 4,
                onSuccess: d[4] || (d[4] = (i) => r.value = !0)
              })) : (_(), W(wu, {
                key: 5,
                onSuccess: d[5] || (d[5] = (i) => r.value = !0)
              }))
            ])) : B("", !0),
            l("div", Ru, [
              r.value === !1 ? (_(), g("div", Bu, [
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
              ])) : B("", !0)
            ])
          ])
        ]),
        l("div", Uu, [
          l("div", null, [
            l("span", Nu, b(o(n)("File Size")) + ": ", 1),
            Z(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          l("div", null, [
            l("span", Pu, b(o(n)("Last Modified")) + ": ", 1),
            Z(" " + b(o(qo)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(de).DOWNLOAD) ? (_(), g("div", qu, [
          l("span", null, b(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : B("", !0)
      ]),
      _: 1
    }));
  }
}, ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Gu(t, e) {
  return _(), g("svg", ju, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const jo = { render: Gu }, Wu = ["data-type", "data-item", "data-index"], An = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = e.dragSelect, r = t, s = (m) => {
      m.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: m.path } })) : e.modal.open(zo, { adapter: e.fs.adapter, item: m });
    }, a = {
      mounted(m, h, x, $) {
        x.props.draggable && (m.addEventListener("dragstart", (T) => c(T, h.value)), m.addEventListener("dragover", (T) => i(T, h.value)), m.addEventListener("drop", (T) => d(T, h.value)));
      },
      beforeUnmount(m, h, x, $) {
        x.props.draggable && (m.removeEventListener("dragstart", c), m.removeEventListener("dragover", i), m.removeEventListener("drop", d));
      }
    }, c = (m, h) => {
      if (m.altKey || m.ctrlKey || m.metaKey)
        return m.preventDefault(), !1;
      n.isDraggingRef.value = !0, m.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), m.dataTransfer.effectAllowed = "all", m.dataTransfer.dropEffect = "copy", m.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (m, h) => {
      m.preventDefault(), n.isDraggingRef.value = !1;
      let x = JSON.parse(m.dataTransfer.getData("items"));
      if (x.find(($) => $.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Kn, { items: { from: x, to: h } });
    }, i = (m, h) => {
      m.preventDefault(), !h || h.type !== "dir" || n.getSelection().find((x) => x === m.currentTarget) ? (m.dataTransfer.dropEffect = "none", m.dataTransfer.effectAllowed = "none") : m.dataTransfer.dropEffect = "copy";
    };
    let u = null, f = !1;
    const v = () => {
      u && clearTimeout(u);
    }, p = (m) => {
      if (!f)
        f = !0, setTimeout(() => f = !1, 300);
      else
        return f = !1, s(r.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const h = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: m.target.getBoundingClientRect().x,
          clientY: m.target.getBoundingClientRect().y
        });
        m.target.dispatchEvent(h);
      }, 500);
    };
    return (m, h) => ue((_(), g("div", {
      style: dn({ opacity: o(n).isDraggingRef.value && o(n).getSelection().find((x) => m.$el === x) ? "0.5 !important" : "" }),
      class: le(["vuefinder__item", "vf-item-" + o(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: h[0] || (h[0] = (x) => s(t.item)),
      onTouchstart: h[1] || (h[1] = (x) => p(x)),
      onTouchend: h[2] || (h[2] = (x) => v()),
      onContextmenu: h[3] || (h[3] = et((x) => o(e).emitter.emit("vf-contextmenu-show", { event: x, items: o(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      At(m.$slots, "default"),
      o(e).pinnedFolders.find((x) => x.path === t.item.path) ? (_(), W(o(jo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : B("", !0)
    ], 46, Wu)), [
      [a, t.item]
    ]);
  }
}, Ku = { class: "vuefinder__explorer__container" }, Yu = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Xu = { class: "vuefinder__explorer__drag-item" }, Zu = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, Ju = { class: "vuefinder__explorer__item-list-content" }, Qu = { class: "vuefinder__explorer__item-list-name" }, ev = { class: "vuefinder__explorer__item-name" }, tv = { class: "vuefinder__explorer__item-path" }, nv = { class: "vuefinder__explorer__item-list-content" }, sv = { class: "vuefinder__explorer__item-list-name" }, ov = { class: "vuefinder__explorer__item-name" }, rv = { class: "vuefinder__explorer__item-size" }, lv = { class: "vuefinder__explorer__item-date" }, av = { class: "vuefinder__explorer__item-grid-content" }, iv = ["data-src", "alt"], cv = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, dv = { class: "vuefinder__explorer__item-title break-all" }, uv = {
  __name: "Explorer",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = (v) => v == null ? void 0 : v.substring(0, 3), s = A(null), a = A(""), c = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      c.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      a.value = v, v ? e.emitter.emit("vf-fetch", {
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
    const i = kt({ active: !1, column: "", order: "" }), u = (v = !0) => {
      let p = [...e.fs.data.files], m = i.column, h = i.order === "asc" ? 1 : -1;
      if (!v)
        return p;
      const x = ($, T) => typeof $ == "string" && typeof T == "string" ? $.toLowerCase().localeCompare(T.toLowerCase()) : $ < T ? -1 : $ > T ? 1 : 0;
      return i.active && (p = p.slice().sort(($, T) => x($[m], T[m]) * h)), p;
    }, f = (v) => {
      i.active && i.column === v ? (i.active = i.order === "asc", i.column = v, i.order = "desc") : (i.active = !0, i.column = v, i.order = "asc");
    };
    return Ce(() => {
      d = new pr(c.area.value);
    }), Hs(() => {
      d.update();
    }), Bs(() => {
      d.destroy();
    }), (v, p) => (_(), g("div", Ku, [
      o(e).view === "list" || a.value.length ? (_(), g("div", Yu, [
        l("div", {
          onClick: p[0] || (p[0] = (m) => f("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Z(b(o(n)("Name")) + " ", 1),
          ue(q(Xt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [qe, i.active && i.column === "basename"]
          ])
        ]),
        a.value.length ? B("", !0) : (_(), g("div", {
          key: 0,
          onClick: p[1] || (p[1] = (m) => f("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Z(b(o(n)("Size")) + " ", 1),
          ue(q(Xt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [qe, i.active && i.column === "file_size"]
          ])
        ])),
        a.value.length ? B("", !0) : (_(), g("div", {
          key: 1,
          onClick: p[2] || (p[2] = (m) => f("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Z(b(o(n)("Date")) + " ", 1),
          ue(q(Xt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [qe, i.active && i.column === "last_modified"]
          ])
        ])),
        a.value.length ? (_(), g("div", {
          key: 2,
          onClick: p[3] || (p[3] = (m) => f("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          Z(b(o(n)("Filepath")) + " ", 1),
          ue(q(Xt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [qe, i.active && i.column === "path"]
          ])
        ])) : B("", !0)
      ])) : B("", !0),
      l("div", Xu, [
        q(nu, {
          ref_key: "dragImage",
          ref: s,
          count: o(c).getCount()
        }, null, 8, ["count"])
      ]),
      l("div", {
        ref: o(c).scrollBarContainer,
        class: le(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": o(e).view === "grid" }, { "search-active": a.value.length }]])
      }, [
        l("div", {
          ref: o(c).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      l("div", {
        ref: o(c).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area min-h-32",
        onContextmenu: p[4] || (p[4] = et((m) => o(e).emitter.emit("vf-contextmenu-show", { event: m, items: o(c).getSelected() }), ["self", "prevent"]))
      }, [
        o(e).loadingIndicator === "linear" && o(e).fs.loading ? (_(), g("div", Zu)) : B("", !0),
        a.value.length ? (_(!0), g(be, { key: 1 }, ke(u(), (m, h) => (_(), W(An, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: J(() => [
            l("div", Ju, [
              l("div", Qu, [
                q(Mn, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", ev, b(m.basename), 1)
              ]),
              l("div", tv, b(m.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : B("", !0),
        o(e).view === "list" && !a.value.length ? (_(!0), g(be, { key: 2 }, ke(u(), (m, h) => (_(), W(An, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: m.path
        }, {
          default: J(() => [
            l("div", nv, [
              l("div", sv, [
                q(Mn, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", ov, b(m.basename), 1)
              ]),
              l("div", rv, b(m.file_size ? o(e).filesize(m.file_size) : ""), 1),
              l("div", lv, b(o(qo)(m.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : B("", !0),
        o(e).view === "grid" && !a.value.length ? (_(!0), g(be, { key: 3 }, ke(u(!1), (m, h) => (_(), W(An, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: J(() => [
            l("div", null, [
              l("div", av, [
                (m.mime_type ?? "").startsWith("image") && o(e).showThumbnails ? (_(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": o(e).requester.getPreviewUrl(o(e).fs.adapter, m),
                  alt: m.basename,
                  key: m.path
                }, null, 8, iv)) : (_(), W(Mn, {
                  key: 1,
                  type: m.type
                }, null, 8, ["type"])),
                !((m.mime_type ?? "").startsWith("image") && o(e).showThumbnails) && m.type !== "dir" ? (_(), g("div", cv, b(r(m.extension)), 1)) : B("", !0)
              ]),
              l("span", dv, b(o(Wn)(m.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : B("", !0)
      ], 544),
      q(Ud)
    ]));
  }
}, vv = ["href", "download"], _v = ["onClick"], fv = {
  __name: "ContextMenu",
  setup(t) {
    const e = re("ServiceContainer"), n = A(null), r = A([]), s = A(""), a = kt({
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
    }), e.emitter.on("vf-contextmenu-show", ({ event: u, items: f, target: v = null }) => {
      if (a.items = e.contextMenuItems.filter((p) => p.show(e, {
        searchQuery: s.value,
        items: f,
        target: v
      })), s.value)
        if (v)
          e.emitter.emit("vf-context-selected", [v]);
        else
          return;
      else !v && !s.value ? e.emitter.emit("vf-context-selected", []) : f.length > 1 && f.some((p) => p.path === v.path) ? e.emitter.emit("vf-context-selected", f) : e.emitter.emit("vf-context-selected", [v]);
      i(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      a.active = !1;
    });
    const i = (u) => {
      const f = e.dragSelect.area.value, v = e.root.getBoundingClientRect(), p = f.getBoundingClientRect();
      let m = u.clientX - v.left, h = u.clientY - v.top;
      a.active = !0, dt(() => {
        var I;
        const x = (I = n.value) == null ? void 0 : I.getBoundingClientRect();
        let $ = (x == null ? void 0 : x.height) ?? 0, T = (x == null ? void 0 : x.width) ?? 0;
        m = p.right - u.pageX + window.scrollX < T ? m - T : m, h = p.bottom - u.pageY + window.scrollY < $ ? h - $ : h, a.positions = {
          left: m + "px",
          top: h + "px"
        };
      });
    };
    return (u, f) => ue((_(), g("ul", {
      ref_key: "contextmenu",
      ref: n,
      style: dn(a.positions),
      class: "vuefinder__context-menu"
    }, [
      (_(!0), g(be, null, ke(a.items, (v) => (_(), g("li", {
        class: "vuefinder__context-menu__item",
        key: v.title
      }, [
        v.link ? (_(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: c(v),
          download: c(v),
          onClick: f[0] || (f[0] = (p) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          l("span", null, b(v.title(o(e).i18n)), 1)
        ], 8, vv)) : (_(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (p) => d(v)
        }, [
          l("span", null, b(v.title(o(e).i18n)), 1)
        ], 8, _v))
      ]))), 128))
    ], 4)), [
      [qe, a.active]
    ]);
  }
}, mv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function pv(t, e) {
  return _(), g("svg", mv, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const Go = { render: pv }, hv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function gv(t, e) {
  return _(), g("svg", hv, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ]));
}
const bv = { render: gv }, wv = { class: "vuefinder__status-bar__wrapper" }, yv = { class: "vuefinder__status-bar__storage" }, kv = ["title"], xv = { class: "vuefinder__status-bar__storage-icon" }, Sv = ["value"], $v = { class: "vuefinder__status-bar__info" }, Cv = { key: 0 }, Ev = { class: "vuefinder__status-bar__selected-count" }, Tv = { class: "vuefinder__status-bar__actions" }, Mv = ["disabled"], Av = ["title"], Dv = {
  __name: "Statusbar",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { setStore: r } = e.storage, s = e.dragSelect, a = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, c = A("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      c.value = i;
    });
    const d = gt(() => {
      const i = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && i;
    });
    return (i, u) => (_(), g("div", wv, [
      l("div", yv, [
        l("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          l("div", xv, [
            q(o(Go))
          ]),
          ue(l("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (f) => o(e).fs.adapter = f),
            onChange: a,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (_(!0), g(be, null, ke(o(e).fs.data.storages, (f) => (_(), g("option", { value: f }, b(f), 9, Sv))), 256))
          ], 544), [
            [Dn, o(e).fs.adapter]
          ])
        ], 8, kv),
        l("div", $v, [
          c.value.length ? (_(), g("span", Cv, b(o(e).fs.data.files.length) + " items found. ", 1)) : B("", !0),
          l("span", Ev, b(o(e).dragSelect.getCount() > 0 ? o(n)("%s item(s) selected.", o(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      l("div", Tv, [
        o(e).selectButton.active ? (_(), g("button", {
          key: 0,
          class: le(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (f) => o(e).selectButton.click(o(s).getSelected(), f))
        }, b(o(n)("Select")), 11, Mv)) : B("", !0),
        l("span", {
          class: "vuefinder__status-bar__about",
          title: o(n)("About"),
          onClick: u[2] || (u[2] = (f) => o(e).modal.open(Vo))
        }, [
          q(o(bv))
        ], 8, Av)
      ])
    ]));
  }
}, Vv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function Lv(t, e) {
  return _(), g("svg", Vv, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Wo = { render: Lv }, Ov = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Fv(t, e) {
  return _(), g("svg", Ov, e[0] || (e[0] = [
    l("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const Iv = { render: Fv }, Hv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Rv(t, e) {
  return _(), g("svg", Hv, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const Ko = { render: Rv }, Bv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Uv(t, e) {
  return _(), g("svg", Bv, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const Yo = { render: Uv };
function Xo(t, e) {
  const n = t.findIndex((r) => r.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Nv = { class: "vuefinder__folder-loader-indicator" }, Pv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Zo = {
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
    const r = Us(t, "modelValue"), s = A(!1);
    De(
      () => r.value,
      () => {
        var d;
        return ((d = a()) == null ? void 0 : d.folders.length) || c();
      }
    );
    function a() {
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
        Xo(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, i) => {
      var u;
      return _(), g("div", Nv, [
        s.value ? (_(), W(o(vs), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (_(), g("div", Pv, [
          r.value && ((u = a()) != null && u.folders.length) ? (_(), W(o(Yo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : B("", !0),
          r.value ? B("", !0) : (_(), W(o(Ko), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, qv = { class: "vuefinder__treesubfolderlist__item-content" }, zv = ["onClick"], jv = ["title", "onClick"], Gv = { class: "vuefinder__treesubfolderlist__item-icon" }, Wv = { class: "vuefinder__treesubfolderlist__subfolder" }, Kv = {
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
    Ce(() => {
      r.path === r.adapter + "://" && We(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const a = gt(() => {
      var c;
      return ((c = e.treeViewData.find((d) => d.path === r.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, d) => {
      const i = cr("TreeSubfolderList", !0);
      return _(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (_(!0), g(be, null, ke(a.value, (u, f) => (_(), g("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          l("div", qv, [
            l("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (v) => n.value[u.path] = !n.value[u.path]
            }, [
              q(Zo, {
                adapter: t.adapter,
                path: u.path,
                modelValue: n.value[u.path],
                "onUpdate:modelValue": (v) => n.value[u.path] = v
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, zv),
            l("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (v) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r.adapter, path: u.path } })
            }, [
              l("div", Gv, [
                o(e).fs.path === u.path ? (_(), W(o(Wo), { key: 0 })) : (_(), W(o(bn), { key: 1 }))
              ]),
              l("div", {
                class: le(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(e).fs.path === u.path
                }])
              }, b(u.basename), 3)
            ], 8, jv)
          ]),
          l("div", Wv, [
            ue(q(i, {
              adapter: r.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [qe, n.value[u.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, Yv = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, r = A(!1);
    function s(a) {
      a === e.fs.adapter ? r.value = !r.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: a } }), n("adapter", a));
    }
    return (a, c) => (_(), g(be, null, [
      l("div", {
        onClick: c[2] || (c[2] = (d) => s(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        l("div", {
          class: le(["vuefinder__treestorageitem__info", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          l("div", {
            class: le(["vuefinder__treestorageitem__icon", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            q(o(Go))
          ], 2),
          l("div", null, b(t.storage), 1)
        ], 2),
        l("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: c[1] || (c[1] = et((d) => r.value = !r.value, ["stop"]))
        }, [
          q(Zo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: r.value,
            "onUpdate:modelValue": c[0] || (c[0] = (d) => r.value = d)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ue(q(Kv, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [qe, r.value]
      ])
    ], 64));
  }
}, Xv = { class: "vuefinder__folder-indicator" }, Zv = { class: "vuefinder__folder-indicator--icon" }, Jv = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Us(t, "modelValue");
    return (n, r) => (_(), g("div", Xv, [
      l("div", Zv, [
        e.value ? (_(), W(o(Yo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : B("", !0),
        e.value ? B("", !0) : (_(), W(o(Ko), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, Qv = { class: "vuefinder__treeview__header" }, e_ = { class: "vuefinder__treeview__pinned-label" }, t_ = { class: "vuefinder__treeview__pin-text text-nowrap" }, n_ = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, s_ = { class: "vuefinder__treeview__pinned-item" }, o_ = ["onClick"], r_ = ["title"], l_ = ["onClick"], a_ = { key: 0 }, i_ = { class: "vuefinder__treeview__no-pinned" }, c_ = { class: "vuefinder__treeview__storage" }, d_ = {
  __name: "TreeView",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { getStore: r, setStore: s } = e.storage, a = A(190), c = A(r("pinned-folders-opened", !0));
    De(c, (f) => s("pinned-folders-opened", f));
    const d = (f) => {
      e.pinnedFolders = e.pinnedFolders.filter((v) => v.path !== f.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (f) => {
      const v = f.clientX, p = f.target.parentElement, m = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const h = ($) => {
        a.value = m + $.clientX - v, a.value < 50 && (a.value = 0, e.showTreeView = !1), a.value > 50 && (e.showTreeView = !0);
      }, x = () => {
        const $ = p.getBoundingClientRect();
        a.value = $.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", x);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", x);
    }, u = A(null);
    return Ce(() => {
      We(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), De(e.fs.data, (f, v) => {
      const p = f.files.filter((m) => m.type === "dir");
      Xo(e.treeViewData, { path: e.fs.path, folders: p.map((m) => ({
        adapter: m.storage,
        path: m.path,
        basename: m.basename
      })) });
    }), (f, v) => (_(), g(be, null, [
      l("div", {
        onClick: v[0] || (v[0] = (p) => o(e).showTreeView = !o(e).showTreeView),
        class: le(["vuefinder__treeview__overlay", o(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      l("div", {
        style: dn(o(e).showTreeView ? "min-width:100px;max-width:75%; width: " + a.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        l("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          l("div", Qv, [
            l("div", {
              onClick: v[2] || (v[2] = (p) => c.value = !c.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              l("div", e_, [
                q(o(jo), { class: "vuefinder__treeview__pin-icon" }),
                l("div", t_, b(o(n)("Pinned Folders")), 1)
              ]),
              q(Jv, {
                modelValue: c.value,
                "onUpdate:modelValue": v[1] || (v[1] = (p) => c.value = p)
              }, null, 8, ["modelValue"])
            ]),
            c.value ? (_(), g("ul", n_, [
              (_(!0), g(be, null, ke(o(e).pinnedFolders, (p) => (_(), g("li", s_, [
                l("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (m) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: p.storage, path: p.path } })
                }, [
                  o(e).fs.path !== p.path ? (_(), W(o(bn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : B("", !0),
                  o(e).fs.path === p.path ? (_(), W(o(Wo), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : B("", !0),
                  l("div", {
                    title: p.path,
                    class: le(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": o(e).fs.path === p.path
                    }])
                  }, b(p.basename), 11, r_)
                ], 8, o_),
                l("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (m) => d(p)
                }, [
                  q(o(Iv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, l_)
              ]))), 256)),
              o(e).pinnedFolders.length ? B("", !0) : (_(), g("li", a_, [
                l("div", i_, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : B("", !0)
          ]),
          (_(!0), g(be, null, ke(o(e).fs.data.storages, (p) => (_(), g("div", c_, [
            q(Yv, { storage: p }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        l("div", {
          onMousedown: i,
          class: le([(o(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
};
class u_ {
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
    var s, a;
    const r = (c) => c.items.length > 1 && c.items.some((d) => {
      var i;
      return d.path === ((i = c.target) == null ? void 0 : i.path);
    }) ? "many" : c.target ? "one" : null;
    return !(this.options.needsSearchQuery !== !!n.searchQuery || this.options.target !== void 0 && this.options.target !== r(n) || this.options.targetType !== void 0 && this.options.targetType !== ((s = n.target) == null ? void 0 : s.type) || this.options.mimeType !== void 0 && this.options.mimeType !== ((a = n.target) == null ? void 0 : a.mime_type) || this.options.feature !== void 0 && !e.features.includes(this.options.feature) || this.options.show !== void 0 && !this.options.show(e, n));
  }
}
function Be(t, e) {
  return t.map((n) => new u_(n.title, n.action, n.link, {
    ...e,
    feature: n.key
  }));
}
const Te = {
  newfolder: {
    key: de.NEW_FOLDER,
    title: ({ t }) => t("New Folder"),
    action: (t) => t.modal.open(Io)
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
      t.modal.open(ds, { items: e });
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
    action: (t, e) => t.modal.open(zo, { adapter: t.fs.adapter, item: e.value[0] })
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
    action: (t, e) => t.modal.open(Po, { items: e })
  },
  unarchive: {
    key: de.UNARCHIVE,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(Uo, { items: e })
  },
  rename: {
    key: de.RENAME,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(us, { items: e })
  }
}, v_ = [
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
], __ = { class: "vuefinder__main__content" }, f_ = {
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
      default: () => v_
    }
  },
  emits: ["select", "update:path"],
  setup(t, { emit: e }) {
    const n = e, r = t, s = Vl(r, re("VueFinderOptions"));
    dr("ServiceContainer", s);
    const { setStore: a } = s.storage, c = A(null);
    s.root = c;
    const d = s.dragSelect;
    di(s);
    const i = (v) => {
      Object.assign(s.fs.data, v), d.clearSelection(), d.refreshSelection();
    };
    let u;
    s.emitter.on("vf-fetch-abort", () => {
      u.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: v, body: p = null, onSuccess: m = null, onError: h = null, noCloseModal: x = !1 }) => {
      ["index", "search"].includes(v.q) && (u && u.abort(), s.fs.loading = !0), u = new AbortController();
      const $ = u.signal;
      s.requester.send({
        url: "",
        method: v.m || "get",
        params: v,
        body: p,
        abortSignal: $
      }).then((T) => {
        s.fs.adapter = T.adapter, s.persist && (s.fs.path = T.dirname, a("path", s.fs.path)), x || s.modal.close(), i(T), m && m(T);
      }).catch((T) => {
        console.error(T), h && h(T);
      }).finally(() => {
        ["index", "search"].includes(v.q) && (s.fs.loading = !1);
      });
    });
    function f(v) {
      let p = {};
      v && v.includes("://") && (p = {
        adapter: v.split("://")[0],
        path: v
      }), s.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: s.fs.adapter, ...p },
        onError: r.onError ?? ((m) => {
          m.message && s.emitter.emit("vf-toast-push", { label: m.message, type: "error" });
        })
      });
    }
    return Ce(() => {
      f(s.fs.path), De(() => r.path, (v) => {
        f(v);
      }), d.onSelect((v) => {
        n("select", v);
      }), De(() => s.fs.data.dirname, (v) => {
        n("update:path", v);
      });
    }), (v, p) => (_(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: c,
      tabindex: "0"
    }, [
      l("div", {
        class: le(o(s).theme.actualValue)
      }, [
        l("div", {
          class: le([o(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: dn(o(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: p[0] || (p[0] = (m) => o(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (m) => o(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          q(Fc),
          q(Rd),
          l("div", __, [
            q(d_),
            q(uv)
          ]),
          q(Dv)
        ], 38),
        q(ur, { name: "fade" }, {
          default: J(() => [
            o(s).modal.visible ? (_(), W(Rs(o(s).modal.type), { key: 0 })) : B("", !0)
          ]),
          _: 1
        }),
        q(fv)
      ], 2)
    ], 512));
  }
}, S_ = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", f_);
  }
};
export {
  u_ as SimpleContextMenuItem,
  v_ as contextMenuItems,
  S_ as default
};
