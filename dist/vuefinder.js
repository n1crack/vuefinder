var Jo = Object.defineProperty;
var Zo = (t, e, n) => e in t ? Jo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var us = (t, e, n) => Zo(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as yt, watch as Oe, ref as M, shallowRef as Qo, onMounted as $e, onUnmounted as jn, onUpdated as Ls, nextTick as ct, computed as ot, inject as ae, openBlock as _, createElementBlock as g, withKeys as $t, unref as o, createElementVNode as r, withModifiers as nt, renderSlot as Tt, normalizeClass as ce, toDisplayString as b, createBlock as K, resolveDynamicComponent as Os, withCtx as Q, createVNode as P, Fragment as he, renderList as ge, createCommentVNode as U, withDirectives as _e, vModelCheckbox as Pt, createTextVNode as J, vModelSelect as En, vModelText as kt, onBeforeUnmount as Fs, customRef as er, vShow as Ie, isRef as tr, TransitionGroup as nr, normalizeStyle as rn, mergeModels as sr, useModel as Hs, resolveComponent as or, provide as rr, Transition as ar } from "vue";
import lr from "mitt";
import ir from "dragselect";
import cr from "@uppy/core";
import dr from "@uppy/xhr-upload";
import ur from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import _r from "cropperjs";
var Vs;
const yn = (Vs = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Vs.getAttribute("content");
class vr {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    us(this, "config");
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
    const n = this.config, a = {};
    yn != null && yn !== "" && (a[n.xsrfHeaderName] = yn);
    const s = Object.assign({}, n.headers, a, e.headers), c = Object.assign({}, n.params, e.params), i = e.body, d = n.baseUrl + e.url, l = e.method;
    let u;
    l !== "get" && (i instanceof FormData ? (u = i, n.body != null && Object.entries(this.config.body).forEach(([v, p]) => {
      u.append(v, p);
    })) : (u = { ...i }, n.body != null && Object.assign(u, this.config.body)));
    const f = {
      url: d,
      method: l,
      headers: s,
      params: c,
      body: u
    };
    if (n.transformRequest != null) {
      const v = n.transformRequest({
        url: d,
        method: l,
        headers: s,
        params: c,
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
    const a = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: n.path }
    });
    return a.url + "?" + new URLSearchParams(a.params).toString();
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
    const a = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: n.path }
    });
    return a.url + "?" + new URLSearchParams(a.params).toString();
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
    const n = this.transformRequestParams(e), a = e.responseType || "json", s = {
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
      return await i[a]();
    throw await i.json();
  }
}
function fr(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new vr(e);
}
function mr(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = yt(JSON.parse(e ?? "{}"));
  Oe(n, a);
  function a() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(l, u) {
    n[l] = u;
  }
  function c(l) {
    delete n[l];
  }
  function i() {
    Object.keys(n).map((l) => c(l));
  }
  return { getStore: (l, u = null) => n.hasOwnProperty(l) ? n[l] : u, setStore: s, removeStore: c, clearStore: i };
}
async function pr(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function hr(t, e, n, a) {
  const { getStore: s, setStore: c } = t, i = M({}), d = M(s("locale", e)), l = (v, p = e) => {
    pr(v, a).then((m) => {
      i.value = m, c("locale", v), d.value = v, c("translations", m), Object.values(a).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + v }), n.emit("vf-language-saved"));
    }).catch((m) => {
      p ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(p, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Oe(d, (v) => {
    l(v);
  }), !s("locale") && !a.length ? l(e) : i.value = s("translations");
  const u = (v, ...p) => p.length ? u(v = v.replace("%s", p.shift()), ...p) : v;
  function f(v, ...p) {
    return i.value && i.value.hasOwnProperty(v) ? u(i.value[v], ...p) : u(v, ...p);
  }
  return yt({ t: f, locale: d });
}
const ue = {
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
}, gr = Object.values(ue), br = "2.5.14";
function Rs(t, e, n, a, s) {
  return (e = Math, n = e.log, a = 1024, s = n(t) / n(a) | 0, t / e.pow(a, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Bs(t, e, n, a, s) {
  return (e = Math, n = e.log, a = 1e3, s = n(t) / n(a) | 0, t / e.pow(a, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function wr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, a = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return a[1] * Math.pow(1024, e[a[2].toLowerCase()]);
}
const et = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function yr(t, e) {
  const n = M(et.SYSTEM), a = M(et.LIGHT);
  n.value = t.getStore("theme", e ?? et.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    n.value === et.DARK || n.value === et.SYSTEM && i.matches ? a.value = et.DARK : a.value = et.LIGHT;
  };
  return c(s), s.addEventListener("change", c), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: n,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: a,
    /**
     * @param {Theme} value
     */
    set(i) {
      n.value = i, i !== et.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(s);
    }
  };
}
function $r() {
  const t = Qo(null), e = M(!1), n = M();
  return { visible: e, type: t, data: n, open: (c, i = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = c, n.value = i;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  } };
}
/*!
 * OverlayScrollbars
 * Version: 2.9.1
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const Te = (t, e) => {
  const { o: n, i: a, u: s } = t;
  let c = n, i;
  const d = (f, v) => {
    const p = c, m = f, h = v || (a ? !a(p, m) : p !== m);
    return (h || s) && (c = m, i = p), [c, h, i];
  };
  return [e ? (f) => d(e(c, i), f) : d, (f) => [c, !!f, i]];
}, kr = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Ee = kr ? window : {}, Is = Math.max, xr = Math.min, An = Math.round, Jt = Math.abs, _s = Math.sign, Ns = Ee.cancelAnimationFrame, Gn = Ee.requestAnimationFrame, Zt = Ee.setTimeout, Tn = Ee.clearTimeout, an = (t) => typeof Ee[t] < "u" ? Ee[t] : void 0, Sr = an("MutationObserver"), vs = an("IntersectionObserver"), Qt = an("ResizeObserver"), Kt = an("ScrollTimeline"), Kn = (t) => t === void 0, ln = (t) => t === null, Ue = (t) => typeof t == "number", Lt = (t) => typeof t == "string", Wn = (t) => typeof t == "boolean", Fe = (t) => typeof t == "function", qe = (t) => Array.isArray(t), en = (t) => typeof t == "object" && !qe(t) && !ln(t), Yn = (t) => {
  const e = !!t && t.length, n = Ue(e) && e > -1 && e % 1 == 0;
  return qe(t) || !Fe(t) && n ? e > 0 && en(t) ? e - 1 in t : !0 : !1;
}, tn = (t) => !!t && t.constructor === Object, nn = (t) => t instanceof HTMLElement, cn = (t) => t instanceof Element;
function de(t, e) {
  if (Yn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && de(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const Us = (t, e) => t.indexOf(e) >= 0, Mt = (t, e) => t.concat(e), pe = (t, e, n) => (!Lt(e) && Yn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), rt = (t) => Array.from(t || []), Xn = (t) => qe(t) ? t : !Lt(t) && Yn(t) ? rt(t) : [t], Mn = (t) => !!t && !t.length, Dn = (t) => rt(new Set(t)), Ve = (t, e, n) => {
  de(t, (s) => s && s.apply(void 0, e || [])), !n && (t.length = 0);
}, qs = "paddingTop", Ps = "paddingRight", zs = "paddingLeft", js = "paddingBottom", Gs = "marginLeft", Ks = "marginRight", Ws = "marginBottom", Ys = "overflowX", Xs = "overflowY", dn = "width", un = "height", tt = "visible", it = "hidden", gt = "scroll", Cr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, _n = (t, e, n, a) => {
  if (t && e) {
    let s = !0;
    return de(n, (c) => {
      const i = t[c], d = e[c];
      i !== d && (s = !1);
    }), s;
  }
  return !1;
}, Js = (t, e) => _n(t, e, ["w", "h"]), Wt = (t, e) => _n(t, e, ["x", "y"]), Er = (t, e) => _n(t, e, ["t", "r", "b", "l"]), dt = () => {
}, X = (t, ...e) => t.bind(0, ...e), ft = (t) => {
  let e;
  const n = t ? Zt : Gn, a = t ? Tn : Ns;
  return [(s) => {
    a(e), e = n(() => s(), Fe(t) ? t() : t);
  }, () => a(e)];
}, Vn = (t, e) => {
  const { _: n, p: a, v: s, S: c } = e || {};
  let i, d, l, u, f = dt;
  const v = function(y) {
    f(), Tn(i), u = i = d = void 0, f = dt, t.apply(this, y);
  }, p = ($) => c && d ? c(d, $) : $, m = () => {
    f !== dt && v(p(l) || l);
  }, h = function() {
    const y = rt(arguments), D = Fe(n) ? n() : n;
    if (Ue(D) && D >= 0) {
      const R = Fe(a) ? a() : a, w = Ue(R) && R >= 0, V = D > 0 ? Zt : Gn, q = D > 0 ? Tn : Ns, C = p(y) || y, T = v.bind(0, C);
      let S;
      f(), s && !u ? (T(), u = !0, S = V(() => u = void 0, D)) : (S = V(T, D), w && !i && (i = Zt(m, R))), f = () => q(S), d = l = C;
    } else
      v(y);
  };
  return h.m = m, h;
}, Zs = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Pe = (t) => t ? Object.keys(t) : [], re = (t, e, n, a, s, c, i) => {
  const d = [e, n, a, s, c, i];
  return (typeof t != "object" || ln(t)) && !Fe(t) && (t = {}), de(d, (l) => {
    de(l, (u, f) => {
      const v = l[f];
      if (t === v)
        return !0;
      const p = qe(v);
      if (v && tn(v)) {
        const m = t[f];
        let h = m;
        p && !qe(m) ? h = [] : !p && !tn(m) && (h = {}), t[f] = re(h, v);
      } else
        t[f] = p ? v.slice() : v;
    });
  }), t;
}, Qs = (t, e) => de(re({}, t), (n, a, s) => {
  n === void 0 ? delete s[a] : n && tn(n) && (s[a] = Qs(n));
}), Jn = (t) => !Pe(t).length, eo = (t, e, n) => Is(t, xr(e, n)), ut = (t) => Dn((qe(t) ? t : (t || "").split(" ")).filter((e) => e)), Zn = (t, e) => t && t.getAttribute(e), fs = (t, e) => t && t.hasAttribute(e), Ye = (t, e, n) => {
  de(ut(e), (a) => {
    t && t.setAttribute(a, String(n || ""));
  });
}, Be = (t, e) => {
  de(ut(e), (n) => t && t.removeAttribute(n));
}, vn = (t, e) => {
  const n = ut(Zn(t, e)), a = X(Ye, t, e), s = (c, i) => {
    const d = new Set(n);
    return de(ut(c), (l) => {
      d[i](l);
    }), rt(d).join(" ");
  };
  return {
    O: (c) => a(s(c, "delete")),
    $: (c) => a(s(c, "add")),
    C: (c) => {
      const i = ut(c);
      return i.reduce((d, l) => d && n.includes(l), i.length > 0);
    }
  };
}, to = (t, e, n) => (vn(t, e).O(n), X(Qn, t, e, n)), Qn = (t, e, n) => (vn(t, e).$(n), X(to, t, e, n)), sn = (t, e, n, a) => (a ? Qn : to)(t, e, n), es = (t, e, n) => vn(t, e).C(n), no = (t) => vn(t, "class"), so = (t, e) => {
  no(t).O(e);
}, ts = (t, e) => (no(t).$(e), X(so, t, e)), oo = (t, e) => {
  const n = e ? cn(e) && e : document;
  return n ? rt(n.querySelectorAll(t)) : [];
}, Ar = (t, e) => {
  const n = e ? cn(e) && e : document;
  return n && n.querySelector(t);
}, Ln = (t, e) => cn(t) && t.matches(e), ro = (t) => Ln(t, "body"), On = (t) => t ? rt(t.childNodes) : [], Dt = (t) => t && t.parentElement, mt = (t, e) => cn(t) && t.closest(e), Fn = (t) => document.activeElement, Tr = (t, e, n) => {
  const a = mt(t, e), s = t && Ar(n, a), c = mt(s, e) === a;
  return a && s ? a === t || s === t || c && mt(mt(t, n), e) !== a : !1;
}, bt = (t) => {
  de(Xn(t), (e) => {
    const n = Dt(e);
    e && n && n.removeChild(e);
  });
}, Me = (t, e) => X(bt, t && e && de(Xn(e), (n) => {
  n && t.appendChild(n);
})), pt = (t) => {
  const e = document.createElement("div");
  return Ye(e, "class", t), e;
}, ao = (t) => {
  const e = pt();
  return e.innerHTML = t.trim(), de(On(e), (n) => bt(n));
}, ms = (t, e) => t.getPropertyValue(e) || t[e] || "", lo = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, zt = (t) => lo(parseFloat(t || "")), Hn = (t) => Math.round(t * 1e4) / 1e4, io = (t) => `${Hn(lo(t))}px`;
function Vt(t, e) {
  t && e && de(e, (n, a) => {
    try {
      const s = t.style, c = ln(n) || Wn(n) ? "" : Ue(n) ? io(n) : n;
      a.indexOf("--") === 0 ? s.setProperty(a, c) : s[a] = c;
    } catch {
    }
  });
}
function Je(t, e, n) {
  const a = Lt(e);
  let s = a ? "" : {};
  if (t) {
    const c = Ee.getComputedStyle(t, n) || t.style;
    s = a ? ms(c, e) : rt(e).reduce((i, d) => (i[d] = ms(c, d), i), s);
  }
  return s;
}
const ps = (t, e, n) => {
  const a = e ? `${e}-` : "", s = n ? `-${n}` : "", c = `${a}top${s}`, i = `${a}right${s}`, d = `${a}bottom${s}`, l = `${a}left${s}`, u = Je(t, [c, i, d, l]);
  return {
    t: zt(u[c]),
    r: zt(u[i]),
    b: zt(u[d]),
    l: zt(u[l])
  };
}, Mr = (t, e) => `translate${en(t) ? `(${t.x},${t.y})` : `Y(${t})`}`, Dr = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Vr = {
  w: 0,
  h: 0
}, fn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Vr, Lr = (t) => fn("inner", t || Ee), ht = X(fn, "offset"), co = X(fn, "client"), on = X(fn, "scroll"), ns = (t) => {
  const e = parseFloat(Je(t, dn)) || 0, n = parseFloat(Je(t, un)) || 0;
  return {
    w: e - An(e),
    h: n - An(n)
  };
}, $n = (t) => t.getBoundingClientRect(), Or = (t) => !!t && Dr(t), Rn = (t) => !!(t && (t[un] || t[dn])), uo = (t, e) => {
  const n = Rn(t);
  return !Rn(e) && n;
}, hs = (t, e, n, a) => {
  de(ut(e), (s) => {
    t && t.removeEventListener(s, n, a);
  });
}, fe = (t, e, n, a) => {
  var s;
  const c = (s = a && a.H) != null ? s : !0, i = a && a.I || !1, d = a && a.A || !1, l = {
    passive: c,
    capture: i
  };
  return X(Ve, ut(e).map((u) => {
    const f = d ? (v) => {
      hs(t, u, f, i), n && n(v);
    } : n;
    return t && t.addEventListener(u, f, l), X(hs, t, u, f, i);
  }));
}, _o = (t) => t.stopPropagation(), Bn = (t) => t.preventDefault(), vo = (t) => _o(t) || Bn(t), Ne = (t, e) => {
  const { x: n, y: a } = Ue(e) ? {
    x: e,
    y: e
  } : e || {};
  Ue(n) && (t.scrollLeft = n), Ue(a) && (t.scrollTop = a);
}, De = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), fo = () => ({
  D: {
    x: 0,
    y: 0
  },
  T: {
    x: 0,
    y: 0
  }
}), Fr = (t, e) => {
  const { D: n, T: a } = t, { w: s, h: c } = e, i = (v, p, m) => {
    let h = _s(v) * m, $ = _s(p) * m;
    if (h === $) {
      const y = Jt(v), D = Jt(p);
      $ = y > D ? 0 : $, h = y < D ? 0 : h;
    }
    return h = h === $ ? 0 : h, [h + 0, $ + 0];
  }, [d, l] = i(n.x, a.x, s), [u, f] = i(n.y, a.y, c);
  return {
    D: {
      x: d,
      y: u
    },
    T: {
      x: l,
      y: f
    }
  };
}, gs = ({ D: t, T: e }) => {
  const n = (a, s) => a === 0 && a <= s;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, bs = ({ D: t, T: e }, n) => {
  const a = (s, c, i) => eo(0, 1, (s - i) / (s - c) || 0);
  return {
    x: a(t.x, e.x, n.x),
    y: a(t.y, e.y, n.y)
  };
}, In = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, ws = (t, e) => {
  de(Xn(e), t);
}, Nn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (c, i) => {
    if (c) {
      const d = e.get(c);
      ws((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, a = (c, i) => {
    if (Lt(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), ws((f) => {
        Fe(f) && u.add(f);
      }, i), X(n, c, i);
    }
    Wn(i) && i && n();
    const d = Pe(c), l = [];
    return de(d, (u) => {
      const f = c[u];
      f && pe(l, a(u, f));
    }), X(Ve, l);
  }, s = (c, i) => {
    de(rt(e.get(c)), (d) => {
      i && !Mn(i) ? d.apply(0, i) : d();
    });
  };
  return a(t || {}), [a, n, s];
}, ys = (t) => JSON.stringify(t, (e, n) => {
  if (Fe(n))
    throw 0;
  return n;
}), $s = (t, e) => t ? `${e}`.split(".").reduce((n, a) => n && Zs(n, a) ? n[a] : void 0, t) : void 0, Hr = {
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
}, mo = (t, e) => {
  const n = {}, a = Mt(Pe(e), Pe(t));
  return de(a, (s) => {
    const c = t[s], i = e[s];
    if (en(c) && en(i))
      re(n[s] = {}, mo(c, i)), Jn(n[s]) && delete n[s];
    else if (Zs(e, s) && i !== c) {
      let d = !0;
      if (qe(c) || qe(i))
        try {
          ys(c) === ys(i) && (d = !1);
        } catch {
        }
      d && (n[s] = i);
    }
  }), n;
}, ks = (t, e, n) => (a) => [$s(t, a), n || $s(e, a) !== void 0], xt = "data-overlayscrollbars", Yt = "os-environment", jt = `${Yt}-scrollbar-hidden`, kn = `${xt}-initialize`, Xt = "noClipping", xs = `${xt}-body`, st = xt, Rr = "host", Xe = `${xt}-viewport`, Br = Ys, Ir = Xs, Nr = "arrange", po = "measuring", Ur = "scrolling", ho = "scrollbarHidden", qr = "noContent", Un = `${xt}-padding`, Ss = `${xt}-content`, ss = "os-size-observer", Pr = `${ss}-appear`, zr = `${ss}-listener`, jr = "os-trinsic-observer", Gr = "os-theme-none", Le = "os-scrollbar", Kr = `${Le}-rtl`, Wr = `${Le}-horizontal`, Yr = `${Le}-vertical`, go = `${Le}-track`, os = `${Le}-handle`, Xr = `${Le}-visible`, Jr = `${Le}-cornerless`, Cs = `${Le}-interaction`, Es = `${Le}-unusable`, qn = `${Le}-auto-hide`, As = `${qn}-hidden`, Ts = `${Le}-wheel`, Zr = `${go}-interactive`, Qr = `${os}-interactive`;
let bo;
const ea = () => bo, ta = (t) => {
  bo = t;
};
let xn;
const na = () => {
  const t = (w, V, q) => {
    Me(document.body, w), Me(document.body, w);
    const E = co(w), C = ht(w), T = ns(V);
    return q && bt(w), {
      x: C.h - E.h + T.h,
      y: C.w - E.w + T.w
    };
  }, e = (w) => {
    let V = !1;
    const q = ts(w, jt);
    try {
      V = Je(w, "scrollbar-width") === "none" || Je(w, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return q(), V;
  }, n = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${jt}{scrollbar-width:none!important}.${jt}::-webkit-scrollbar,.${jt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = ao(`<div class="${Yt}"><div></div><style>${n}</style></div>`)[0], c = s.firstChild, i = s.lastChild, d = ea();
  d && (i.nonce = d);
  const [l, , u] = Nn(), [f, v] = Te({
    o: t(s, c),
    i: Wt
  }, X(t, s, c, !0)), [p] = v(), m = e(s), h = {
    x: p.x === 0,
    y: p.y === 0
  }, $ = {
    elements: {
      host: null,
      padding: !m,
      viewport: (w) => m && ro(w) && w,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, y = re({}, Hr), D = X(re, {}, y), O = X(re, {}, $), R = {
    k: p,
    M: h,
    R: m,
    V: !!Kt,
    L: X(l, "r"),
    U: O,
    P: (w) => re($, w) && O(),
    N: D,
    q: (w) => re(y, w) && D(),
    B: re({}, $),
    F: re({}, y)
  };
  if (Be(s, "style"), bt(s), fe(Ee, "resize", () => {
    u("r", []);
  }), Fe(Ee.matchMedia) && !m && (!h.x || !h.y)) {
    const w = (V) => {
      const q = Ee.matchMedia(`(resolution: ${Ee.devicePixelRatio}dppx)`);
      fe(q, "change", () => {
        V(), w(V);
      }, {
        A: !0
      });
    };
    w(() => {
      const [V, q] = f();
      re(R.k, V), u("r", [q]);
    });
  }
  return R;
}, je = () => (xn || (xn = na()), xn), wo = (t, e) => Fe(e) ? e.apply(0, t) : e, sa = (t, e, n, a) => {
  const s = Kn(a) ? n : a;
  return wo(t, s) || e.apply(0, t);
}, yo = (t, e, n, a) => {
  const s = Kn(a) ? n : a, c = wo(t, s);
  return !!c && (nn(c) ? c : e.apply(0, t));
}, oa = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: a } = e || {}, { M: s, R: c, U: i } = je(), { nativeScrollbarsOverlaid: d, body: l } = i().cancel, u = n ?? d, f = Kn(a) ? l : a, v = (s.x || s.y) && u, p = t && (ln(f) ? !c : f);
  return !!v || !!p;
}, rs = /* @__PURE__ */ new WeakMap(), ra = (t, e) => {
  rs.set(t, e);
}, aa = (t) => {
  rs.delete(t);
}, $o = (t) => rs.get(t), la = (t, e, n) => {
  let a = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    a = !0;
  }, i = (d) => {
    if (s && n) {
      const l = n.map((u) => {
        const [f, v] = u || [];
        return [v && f ? (d || oo)(f, t) : [], v];
      });
      de(l, (u) => de(u[0], (f) => {
        const v = u[1], p = s.get(f) || [];
        if (t.contains(f) && v) {
          const h = fe(f, v, ($) => {
            a ? (h(), s.delete(f)) : e($);
          });
          s.set(f, pe(p, h));
        } else
          Ve(p), s.delete(f);
      }));
    }
  };
  return i(), [c, i];
}, Ms = (t, e, n, a) => {
  let s = !1;
  const { j: c, X: i, Y: d, W: l, J: u, G: f } = a || {}, v = Vn(() => s && n(!0), {
    _: 33,
    p: 99
  }), [p, m] = la(t, v, d), h = c || [], $ = i || [], y = Mt(h, $), D = (R, w) => {
    if (!Mn(w)) {
      const V = u || dt, q = f || dt, E = [], C = [];
      let T = !1, S = !1;
      if (de(w, (x) => {
        const { attributeName: L, target: B, type: k, oldValue: I, addedNodes: N, removedNodes: ee } = x, se = k === "attributes", oe = k === "childList", Z = t === B, A = se && L, j = A && Zn(B, L || ""), F = Lt(j) ? j : null, G = A && I !== F, H = Us($, L) && G;
        if (e && (oe || !Z)) {
          const W = se && G, z = W && l && Ln(B, l), ne = (z ? !V(B, L, I, F) : !se || W) && !q(x, !!z, t, a);
          de(N, (ve) => pe(E, ve)), de(ee, (ve) => pe(E, ve)), S = S || ne;
        }
        !e && Z && G && !V(B, L, I, F) && (pe(C, L), T = T || H);
      }), m((x) => Dn(E).reduce((L, B) => (pe(L, oo(x, B)), Ln(B, x) ? pe(L, B) : L), [])), e)
        return !R && S && n(!1), [!1];
      if (!Mn(C) || T) {
        const x = [Dn(C), T];
        return !R && n.apply(0, x), x;
      }
    }
  }, O = new Sr(X(D, !1));
  return [() => (O.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: y,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (p(), O.disconnect(), s = !1);
  }), () => {
    if (s)
      return v.m(), D(!0, O.takeRecords());
  }];
}, ko = {}, xo = {}, ia = (t) => {
  de(t, (e) => de(e, (n, a) => {
    ko[a] = e[a];
  }));
}, So = (t, e, n) => Pe(t).map((a) => {
  const { static: s, instance: c } = t[a], [i, d, l] = n || [], u = n ? c : s;
  if (u) {
    const f = n ? u(i, d, e) : u(e);
    return (l || xo)[a] = f;
  }
}), Ot = (t) => xo[t], ca = "__osOptionsValidationPlugin", da = "__osSizeObserverPlugin", ua = (t, e) => {
  const { M: n } = e, [a, s] = t("showNativeOverlaidScrollbars");
  return [a && n.x && n.y, s];
}, wt = (t) => t.indexOf(tt) === 0, _a = (t, e) => {
  const n = (s, c, i, d) => {
    const l = s === tt ? it : s.replace(`${tt}-`, ""), u = wt(s), f = wt(i);
    return !c && !d ? it : u && f ? tt : u ? c && d ? l : c ? tt : it : c ? l : f && d ? tt : it;
  }, a = {
    x: n(e.x, t.x, e.y, t.y),
    y: n(e.y, t.y, e.x, t.x)
  };
  return {
    K: a,
    Z: {
      x: a.x === gt,
      y: a.y === gt
    }
  };
}, Co = "__osScrollbarsHidingPlugin", va = "__osClickScrollPlugin", Eo = (t, e, n) => {
  const { dt: a } = n || {}, s = Ot(da), [c] = Te({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], l = ao(`<div class="${ss}"><div class="${zr}"></div></div>`)[0], u = l.firstChild, f = (v) => {
      const p = v instanceof ResizeObserverEntry;
      let m = !1, h = !1;
      if (p) {
        const [$, , y] = c(v.contentRect), D = Rn($);
        h = uo($, y), m = !h && !D;
      } else
        h = v === !0;
      m || e({
        ft: !0,
        dt: h
      });
    };
    if (Qt) {
      const v = new Qt((p) => f(p.pop()));
      v.observe(u), pe(i, () => {
        v.disconnect();
      });
    } else if (s) {
      const [v, p] = s(u, f, a);
      pe(i, Mt([ts(l, Pr), fe(l, "animationstart", v)], p));
    } else
      return dt;
    return X(Ve, pe(i, Me(t, l)));
  };
}, fa = (t, e) => {
  let n;
  const a = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, s = pt(jr), [c] = Te({
    o: !1
  }), i = (l, u) => {
    if (l) {
      const f = c(a(l)), [, v] = f;
      return v && !u && e(f) && [f];
    }
  }, d = (l, u) => i(u.pop(), l);
  return [() => {
    const l = [];
    if (vs)
      n = new vs(X(d, !1), {
        root: t
      }), n.observe(s), pe(l, () => {
        n.disconnect();
      });
    else {
      const u = () => {
        const f = ht(s);
        i(f);
      };
      pe(l, Eo(s, u)()), u();
    }
    return X(Ve, pe(l, Me(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, ma = (t, e, n, a) => {
  let s, c, i, d, l, u;
  const f = `[${st}]`, v = `[${Xe}]`, p = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: m, gt: h, ot: $, ht: y, bt: D, nt: O, wt: R, yt: w, St: V, Ot: q } = t, E = (H) => Je(H, "direction") === "rtl", C = {
    $t: !1,
    ct: E(m)
  }, T = je(), S = Ot(Co), [x] = Te({
    i: Js,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const H = S && S.tt(t, e, C, T, n).ut, z = !(R && O) && es(h, st, Xt), Y = !O && w(Nr), ne = Y && De(y), ve = ne && q(), Ce = V(po, z), be = Y && H && H()[0], ke = on($), te = ns($);
    return be && be(), Ne(y, ne), ve && ve(), z && Ce(), {
      w: ke.w + te.w,
      h: ke.h + te.h
    };
  }), L = Vn(a, {
    _: () => s,
    p: () => c,
    S(H, W) {
      const [z] = H, [Y] = W;
      return [Mt(Pe(z), Pe(Y)).reduce((ne, ve) => (ne[ve] = z[ve] || Y[ve], ne), {})];
    }
  }), B = (H) => {
    const W = E(m);
    re(H, {
      Ct: u !== W
    }), re(C, {
      ct: W
    }), u = W;
  }, k = (H, W) => {
    const [z, Y] = H, ne = {
      xt: Y
    };
    return re(C, {
      $t: z
    }), !W && a(ne), ne;
  }, I = ({ ft: H, dt: W }) => {
    const Y = !(H && !W) && T.R ? L : a, ne = {
      ft: H || W,
      dt: W
    };
    B(ne), Y(ne);
  }, N = (H, W) => {
    const [, z] = x(), Y = {
      Ht: z
    };
    return B(Y), z && !W && (H ? a : L)(Y), Y;
  }, ee = (H, W, z) => {
    const Y = {
      Et: W
    };
    return B(Y), W && !z && L(Y), Y;
  }, [se, oe] = D ? fa(h, k) : [], Z = !O && Eo(h, I, {
    dt: !0
  }), [A, j] = Ms(h, !1, ee, {
    X: p,
    j: p
  }), F = O && Qt && new Qt((H) => {
    const W = H[H.length - 1].contentRect;
    I({
      ft: !0,
      dt: uo(W, l)
    }), l = W;
  }), G = Vn(() => {
    const [, H] = x();
    a({
      Ht: H
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    F && F.observe(h);
    const H = Z && Z(), W = se && se(), z = A(), Y = T.L((ne) => {
      ne ? L({
        zt: ne
      }) : G();
    });
    return () => {
      F && F.disconnect(), H && H(), W && W(), d && d(), z(), Y();
    };
  }, ({ It: H, At: W, Dt: z }) => {
    const Y = {}, [ne] = H("update.ignoreMutation"), [ve, Ce] = H("update.attributes"), [be, ke] = H("update.elementEvents"), [te, we] = H("update.debounce"), ye = ke || Ce, xe = W || z, Se = (me) => Fe(ne) && ne(me);
    if (ye) {
      i && i(), d && d();
      const [me, ie] = Ms(D || $, !0, N, {
        j: Mt(p, ve || []),
        Y: be,
        W: f,
        G: (le, Ae) => {
          const { target: He, attributeName: Qe } = le;
          return (!Ae && Qe && !O ? Tr(He, f, v) : !1) || !!mt(He, `.${Le}`) || !!Se(le);
        }
      });
      d = me(), i = ie;
    }
    if (we)
      if (L.m(), qe(te)) {
        const me = te[0], ie = te[1];
        s = Ue(me) && me, c = Ue(ie) && ie;
      } else Ue(te) ? (s = te, c = !1) : (s = !1, c = !1);
    if (xe) {
      const me = j(), ie = oe && oe(), le = i && i();
      me && re(Y, ee(me[0], me[1], xe)), ie && re(Y, k(ie[0], xe)), le && re(Y, N(le[0], xe));
    }
    return B(Y), Y;
  }, C];
}, pa = (t, e, n, a) => {
  const s = "--os-viewport-percent", c = "--os-scroll-percent", i = "--os-scroll-direction", { U: d } = je(), { scrollbars: l } = d(), { slot: u } = l, { vt: f, gt: v, ot: p, Tt: m, ht: h, wt: $, nt: y } = e, { scrollbars: D } = m ? {} : t, { slot: O } = D || {}, R = [], w = [], V = [], q = yo([f, v, p], () => y && $ ? f : v, u, O), E = (A) => {
    if (Kt) {
      const j = new Kt({
        source: h,
        axis: A
      });
      return {
        Mt: (G) => {
          const H = G.kt.animate({
            clear: ["left"],
            [c]: [0, 1]
          }, {
            timeline: j
          });
          return () => H.cancel();
        }
      };
    }
  }, C = {
    x: E("x"),
    y: E("y")
  }, T = () => {
    const { Rt: A, Vt: j } = n, F = (G, H) => eo(0, 1, G / (G + H) || 0);
    return {
      x: F(j.x, A.x),
      y: F(j.y, A.y)
    };
  }, S = (A, j, F) => {
    const G = F ? ts : so;
    de(A, (H) => {
      G(H.kt, j);
    });
  }, x = (A, j) => {
    de(A, (F) => {
      const [G, H] = j(F);
      Vt(G, H);
    });
  }, L = (A, j, F) => {
    const G = Wn(F), H = G ? F : !0, W = G ? !F : !0;
    H && S(w, A, j), W && S(V, A, j);
  }, B = () => {
    const A = T(), j = (F) => (G) => [G.kt, {
      [s]: Hn(F) + ""
    }];
    x(w, j(A.x)), x(V, j(A.y));
  }, k = () => {
    if (!Kt) {
      const { Lt: A } = n, j = bs(A, De(h)), F = (G) => (H) => [H.kt, {
        [c]: Hn(G) + ""
      }];
      x(w, F(j.x)), x(V, F(j.y));
    }
  }, I = () => {
    const { Lt: A } = n, j = gs(A), F = (G) => (H) => [H.kt, {
      [i]: G ? "0" : "1"
    }];
    x(w, F(j.x)), x(V, F(j.y));
  }, N = () => {
    if (y && !$) {
      const { Rt: A, Lt: j } = n, F = gs(j), G = bs(j, De(h)), H = (W) => {
        const { kt: z } = W, Y = Dt(z) === p && z, ne = (ve, Ce, be) => {
          const ke = Ce * ve;
          return io(be ? ke : -ke);
        };
        return [Y, Y && {
          transform: Mr({
            x: ne(G.x, A.x, F.x),
            y: ne(G.y, A.y, F.y)
          })
        }];
      };
      x(w, H), x(V, H);
    }
  }, ee = (A) => {
    const j = A ? "x" : "y", G = pt(`${Le} ${A ? Wr : Yr}`), H = pt(go), W = pt(os), z = {
      kt: G,
      Ut: H,
      Pt: W
    }, Y = C[j];
    return pe(A ? w : V, z), pe(R, [Me(G, H), Me(H, W), X(bt, G), Y && Y.Mt(z), a(z, L, A)]), z;
  }, se = X(ee, !0), oe = X(ee, !1), Z = () => (Me(q, w[0].kt), Me(q, V[0].kt), X(Ve, R));
  return se(), oe(), [{
    Nt: B,
    qt: k,
    Bt: I,
    Ft: N,
    jt: L,
    Xt: {
      Yt: w,
      Wt: se,
      Jt: X(x, w)
    },
    Gt: {
      Yt: V,
      Wt: oe,
      Jt: X(x, V)
    }
  }, Z];
}, ha = (t, e, n, a) => (s, c, i) => {
  const { gt: d, ot: l, nt: u, ht: f, Kt: v, Ot: p } = e, { kt: m, Ut: h, Pt: $ } = s, [y, D] = ft(333), [O, R] = ft(444), w = (E) => {
    Fe(f.scrollBy) && f.scrollBy({
      behavior: "smooth",
      left: E.x,
      top: E.y
    });
  }, V = () => {
    const E = "pointerup pointercancel lostpointercapture", C = `client${i ? "X" : "Y"}`, T = i ? dn : un, S = i ? "left" : "top", x = i ? "w" : "h", L = i ? "x" : "y", B = (I, N) => (ee) => {
      const { Rt: se } = n, oe = ht(h)[x] - ht($)[x], A = N * ee / oe * se[L];
      Ne(f, {
        [L]: I + A
      });
    }, k = [];
    return fe(h, "pointerdown", (I) => {
      const N = mt(I.target, `.${os}`) === $, ee = N ? $ : h, se = t.scrollbars, { button: oe, isPrimary: Z, pointerType: A } = I, { pointers: j } = se;
      if (oe === 0 && Z && se[N ? "dragScroll" : "clickScroll"] && (j || []).includes(A)) {
        Ve(k), R();
        const G = !N && I.shiftKey, H = X($n, $), W = X($n, h), z = (ie, le) => (ie || H())[S] - (le || W())[S], Y = An($n(f)[T]) / ht(f)[x] || 1, ne = B(De(f)[L], 1 / Y), ve = I[C], Ce = H(), be = W(), ke = Ce[T], te = z(Ce, be) + ke / 2, we = ve - be[S], ye = N ? 0 : we - te, xe = (ie) => {
          Ve(me), ee.releasePointerCapture(ie.pointerId);
        }, Se = p(), me = [() => {
          const ie = De(f);
          Se();
          const le = De(f), Ae = {
            x: le.x - ie.x,
            y: le.y - ie.y
          };
          (Jt(Ae.x) > 3 || Jt(Ae.y) > 3) && (p(), Ne(f, ie), w(Ae), O(Se));
        }, fe(v, E, xe), fe(v, "selectstart", (ie) => Bn(ie), {
          H: !1
        }), fe(h, E, xe), fe(h, "pointermove", (ie) => {
          const le = ie[C] - ve;
          (N || G) && ne(ye + le);
        })];
        if (ee.setPointerCapture(I.pointerId), G)
          ne(ye);
        else if (!N) {
          const ie = Ot(va);
          if (ie) {
            const le = ie(ne, z, ye, ke, we);
            pe(me, X(le)), pe(k, X(le, !0));
          }
        }
      }
    });
  };
  let q = !0;
  return X(Ve, [fe($, "pointermove pointerleave", a), fe(m, "pointerenter", () => {
    c(Cs, !0);
  }), fe(m, "pointerleave pointercancel", () => {
    c(Cs, !1);
  }), !u && fe(m, "mousedown", () => {
    const E = Fn();
    (fs(E, Xe) || fs(E, st) || E === document.body) && Zt(X(In, l), 25);
  }), fe(m, "wheel", (E) => {
    const { deltaX: C, deltaY: T, deltaMode: S } = E;
    q && S === 0 && Dt(m) === d && w({
      x: C,
      y: T
    }), q = !1, c(Ts, !0), y(() => {
      q = !0, c(Ts);
    }), Bn(E);
  }, {
    H: !1,
    I: !0
  }), fe(m, "pointerdown", X(fe, v, "click", vo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), V(), D, R]);
}, ga = (t, e, n, a, s, c) => {
  let i, d, l, u, f, v = dt, p = 0;
  const m = (A) => A.pointerType === "mouse", [h, $] = ft(), [y, D] = ft(100), [O, R] = ft(100), [w, V] = ft(() => p), [q, E] = pa(t, s, a, ha(e, s, a, (A) => m(A) && ee())), { gt: C, Qt: T, wt: S } = s, { jt: x, Nt: L, qt: B, Bt: k, Ft: I } = q, N = (A, j) => {
    if (V(), A)
      x(As);
    else {
      const F = X(x, As, !0);
      p > 0 && !j ? w(F) : F();
    }
  }, ee = () => {
    (l ? !i : !u) && (N(!0), y(() => {
      N(!1);
    }));
  }, se = (A) => {
    x(qn, A, !0), x(qn, A, !1);
  }, oe = (A) => {
    m(A) && (i = l, l && N(!0));
  }, Z = [V, D, R, $, () => v(), fe(C, "pointerover", oe, {
    A: !0
  }), fe(C, "pointerenter", oe), fe(C, "pointerleave", (A) => {
    m(A) && (i = !1, l && N(!1));
  }), fe(C, "pointermove", (A) => {
    m(A) && d && ee();
  }), fe(T, "scroll", (A) => {
    h(() => {
      B(), ee();
    }), c(A), I();
  })];
  return [() => X(Ve, pe(Z, E())), ({ It: A, Dt: j, Zt: F, tn: G }) => {
    const { nn: H, sn: W, en: z, cn: Y } = G || {}, { Ct: ne, dt: ve } = F || {}, { ct: Ce } = n, { M: be } = je(), { K: ke, rn: te } = a, [we, ye] = A("showNativeOverlaidScrollbars"), [xe, Se] = A("scrollbars.theme"), [me, ie] = A("scrollbars.visibility"), [le, Ae] = A("scrollbars.autoHide"), [He, Qe] = A("scrollbars.autoHideSuspend"), [St] = A("scrollbars.autoHideDelay"), [Ft, at] = A("scrollbars.dragScroll"), [Ct, pn] = A("scrollbars.clickScroll"), [Ht, hn] = A("overflow"), gn = ve && !j, Re = te.x || te.y, bn = H || W || Y || ne || j, Rt = z || ie || hn, wn = we && be.x && be.y, lt = (Et, _t, Bt) => {
      const At = Et.includes(gt) && (me === tt || me === "auto" && _t === gt);
      return x(Xr, At, Bt), At;
    };
    if (p = St, gn && (He && Re ? (se(!1), v(), O(() => {
      v = fe(T, "scroll", X(se, !0), {
        A: !0
      });
    })) : se(!0)), ye && x(Gr, wn), Se && (x(f), x(xe, !0), f = xe), Qe && !He && se(!0), Ae && (d = le === "move", l = le === "leave", u = le === "never", N(u, !0)), at && x(Qr, Ft), pn && x(Zr, Ct), Rt) {
      const Et = lt(Ht.x, ke.x, !0), _t = lt(Ht.y, ke.y, !1);
      x(Jr, !(Et && _t));
    }
    bn && (B(), L(), I(), Y && k(), x(Es, !te.x, !0), x(Es, !te.y, !1), x(Kr, Ce && !S));
  }, {}, q];
}, ba = (t) => {
  const e = je(), { U: n, R: a } = e, { elements: s } = n(), { padding: c, viewport: i, content: d } = s, l = nn(t), u = l ? {} : t, { elements: f } = u, { padding: v, viewport: p, content: m } = f || {}, h = l ? t : u.target, $ = ro(h), y = h.ownerDocument, D = y.documentElement, O = () => y.defaultView || Ee, R = X(sa, [h]), w = X(yo, [h]), V = X(pt, ""), q = X(R, V, i), E = X(w, V, d), C = (te) => {
    const we = ht(te), ye = on(te), xe = Je(te, Ys), Se = Je(te, Xs);
    return ye.w - we.w > 0 && !wt(xe) || ye.h - we.h > 0 && !wt(Se);
  }, T = q(p), S = T === h, x = S && $, L = !S && E(m), B = !S && T === L, k = x ? D : T, I = x ? k : h, N = !S && w(V, c, v), ee = !B && L, se = [ee, k, N, I].map((te) => nn(te) && !Dt(te) && te), oe = (te) => te && Us(se, te), Z = !oe(k) && C(k) ? k : h, A = x ? D : k, F = {
    vt: h,
    gt: I,
    ot: k,
    ln: N,
    bt: ee,
    ht: A,
    Qt: x ? y : k,
    an: $ ? D : Z,
    Kt: y,
    wt: $,
    Tt: l,
    nt: S,
    un: O,
    yt: (te) => es(k, Xe, te),
    St: (te, we) => sn(k, Xe, te, we),
    Ot: () => sn(A, Xe, Ur, !0)
  }, { vt: G, gt: H, ln: W, ot: z, bt: Y } = F, ne = [() => {
    Be(H, [st, kn]), Be(G, kn), $ && Be(D, [kn, st]);
  }];
  let ve = On([Y, z, W, H, G].find((te) => te && !oe(te)));
  const Ce = x ? G : Y || z, be = X(Ve, ne);
  return [F, () => {
    const te = O(), we = Fn(), ye = (le) => {
      Me(Dt(le), On(le)), bt(le);
    }, xe = (le) => fe(le, "focusin focusout focus blur", vo, {
      I: !0,
      H: !1
    }), Se = "tabindex", me = Zn(z, Se), ie = xe(we);
    return Ye(H, st, S ? "" : Rr), Ye(W, Un, ""), Ye(z, Xe, ""), Ye(Y, Ss, ""), S || (Ye(z, Se, me || "-1"), $ && Ye(D, xs, "")), Me(Ce, ve), Me(H, W), Me(W || H, !S && z), Me(z, Y), pe(ne, [ie, () => {
      const le = Fn(), Ae = oe(z), He = Ae && le === z ? G : le, Qe = xe(He);
      Be(W, Un), Be(Y, Ss), Be(z, Xe), $ && Be(D, xs), me ? Ye(z, Se, me) : Be(z, Se), oe(Y) && ye(Y), Ae && ye(z), oe(W) && ye(W), In(He), Qe();
    }]), a && !S && (Qn(z, Xe, ho), pe(ne, X(Be, z, Xe))), In(!S && $ && we === G && te.top === te ? z : we), ie(), ve = 0, be;
  }, be];
}, wa = ({ bt: t }) => ({ Zt: e, _n: n, Dt: a }) => {
  const { xt: s } = e || {}, { $t: c } = n;
  t && (s || a) && Vt(t, {
    [un]: c && "100%"
  });
}, ya = ({ gt: t, ln: e, ot: n, nt: a }, s) => {
  const [c, i] = Te({
    i: Er,
    o: ps()
  }, X(ps, t, "padding", ""));
  return ({ It: d, Zt: l, _n: u, Dt: f }) => {
    let [v, p] = i(f);
    const { R: m } = je(), { ft: h, Ht: $, Ct: y } = l || {}, { ct: D } = u, [O, R] = d("paddingAbsolute");
    (h || p || (f || $)) && ([v, p] = c(f));
    const V = !a && (R || y || p);
    if (V) {
      const q = !O || !e && !m, E = v.r + v.l, C = v.t + v.b, T = {
        [Ks]: q && !D ? -E : 0,
        [Ws]: q ? -C : 0,
        [Gs]: q && D ? -E : 0,
        top: q ? -v.t : 0,
        right: q ? D ? -v.r : "auto" : 0,
        left: q ? D ? "auto" : -v.l : 0,
        [dn]: q && `calc(100% + ${E}px)`
      }, S = {
        [qs]: q ? v.t : 0,
        [Ps]: q ? v.r : 0,
        [js]: q ? v.b : 0,
        [zs]: q ? v.l : 0
      };
      Vt(e || n, T), Vt(n, S), re(s, {
        ln: v,
        dn: !q,
        rt: e ? S : re({}, T, S)
      });
    }
    return {
      fn: V
    };
  };
}, $a = (t, e) => {
  const n = je(), { gt: a, ln: s, ot: c, nt: i, Qt: d, ht: l, wt: u, St: f, un: v } = t, { R: p } = n, m = u && i, h = X(Is, 0), $ = ["display", "direction", "flexDirection", "writingMode"], y = {
    i: Js,
    o: {
      w: 0,
      h: 0
    }
  }, D = {
    i: Wt,
    o: {}
  }, O = (Z) => {
    f(po, !m && Z);
  }, R = (Z, A) => {
    const j = Ee.devicePixelRatio % 1 !== 0 ? 1 : 0, F = {
      w: h(Z.w - A.w),
      h: h(Z.h - A.h)
    };
    return {
      w: F.w > j ? F.w : 0,
      h: F.h > j ? F.h : 0
    };
  }, [w, V] = Te(y, X(ns, c)), [q, E] = Te(y, X(on, c)), [C, T] = Te(y), [S] = Te(D), [x, L] = Te(y), [B] = Te(D), [k] = Te({
    i: (Z, A) => _n(Z, A, $),
    o: {}
  }, () => Or(c) ? Je(c, $) : {}), [I, N] = Te({
    i: (Z, A) => Wt(Z.D, A.D) && Wt(Z.T, A.T),
    o: fo()
  }, () => {
    O(!0);
    const Z = De(l), A = f(qr, !0), j = fe(d, gt, (z) => {
      const Y = De(l);
      z.isTrusted && Y.x === Z.x && Y.y === Z.y && _o(z);
    }, {
      I: !0,
      A: !0
    });
    Ne(l, {
      x: 0,
      y: 0
    }), A();
    const F = De(l), G = on(l);
    Ne(l, {
      x: G.w,
      y: G.h
    });
    const H = De(l);
    Ne(l, {
      x: H.x - F.x < 1 && -G.w,
      y: H.y - F.y < 1 && -G.h
    });
    const W = De(l);
    return Ne(l, Z), Gn(() => j()), {
      D: F,
      T: W
    };
  }), ee = Ot(Co), se = (Z, A) => `${A ? Br : Ir}${Cr(Z)}`, oe = (Z) => {
    const A = (F) => [tt, it, gt].map((G) => se(G, F)), j = A(!0).concat(A()).join(" ");
    f(j), f(Pe(Z).map((F) => se(Z[F], F === "x")).join(" "), !0);
  };
  return ({ It: Z, Zt: A, _n: j, Dt: F }, { fn: G }) => {
    const { ft: H, Ht: W, Ct: z, dt: Y, zt: ne } = A || {}, ve = ee && ee.tt(t, e, j, n, Z), { it: Ce, ut: be, _t: ke } = ve || {}, [te, we] = ua(Z, n), [ye, xe] = Z("overflow"), Se = wt(ye.x), me = wt(ye.y), ie = !0;
    let le = V(F), Ae = E(F), He = T(F), Qe = L(F);
    we && p && f(ho, !te);
    {
      es(a, st, Xt) && O(!0);
      const [cs] = be ? be() : [], [It] = le = w(F), [Nt] = Ae = q(F), Ut = co(c), qt = m && Lr(v()), Xo = {
        w: h(Nt.w + It.w),
        h: h(Nt.h + It.h)
      }, ds = {
        w: h((qt ? qt.w : Ut.w + h(Ut.w - Nt.w)) + It.w),
        h: h((qt ? qt.h : Ut.h + h(Ut.h - Nt.h)) + It.h)
      };
      cs && cs(), Qe = x(ds), He = C(R(Xo, ds), F);
    }
    const [St, Ft] = Qe, [at, Ct] = He, [pn, Ht] = Ae, [hn, gn] = le, [Re, bn] = S({
      x: at.w > 0,
      y: at.h > 0
    }), Rt = Se && me && (Re.x || Re.y) || Se && Re.x && !Re.y || me && Re.y && !Re.x, wn = G || z || ne || gn || Ht || Ft || Ct || xe || we || ie, lt = _a(Re, ye), [Et, _t] = B(lt.K), [, Bt] = k(F), At = z || Y || Bt || bn || F, [Wo, Yo] = At ? I(F) : N();
    return wn && (_t && oe(lt.K), ke && Ce && Vt(c, ke(lt, j, Ce(lt, pn, hn)))), O(!1), sn(a, st, Xt, Rt), sn(s, Un, Xt, Rt), re(e, {
      K: Et,
      Vt: {
        x: St.w,
        y: St.h
      },
      Rt: {
        x: at.w,
        y: at.h
      },
      rn: Re,
      Lt: Fr(Wo, at)
    }), {
      en: _t,
      nn: Ft,
      sn: Ct,
      cn: Yo || Ct,
      pn: At
    };
  };
}, ka = (t) => {
  const [e, n, a] = ba(t), s = {
    ln: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    dn: !1,
    rt: {
      [Ks]: 0,
      [Ws]: 0,
      [Gs]: 0,
      [qs]: 0,
      [Ps]: 0,
      [js]: 0,
      [zs]: 0
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
    Lt: fo()
  }, { vt: c, ht: i, nt: d, Ot: l } = e, { R: u, M: f } = je(), v = !u && (f.x || f.y), p = [wa(e), ya(e, s), $a(e, s)];
  return [n, (m) => {
    const h = {}, y = v && De(i), D = y && l();
    return de(p, (O) => {
      re(h, O(m, h) || {});
    }), Ne(i, y), D && D(), !d && Ne(c, 0), h;
  }, s, e, a];
}, xa = (t, e, n, a, s) => {
  let c = !1;
  const i = ks(e, {}), [d, l, u, f, v] = ka(t), [p, m, h] = ma(f, u, i, (w) => {
    R({}, w);
  }), [$, y, , D] = ga(t, e, h, u, f, s), O = (w) => Pe(w).some((V) => !!w[V]), R = (w, V) => {
    if (n())
      return !1;
    const { vn: q, Dt: E, At: C, gn: T } = w, S = q || {}, x = !!E || !c, L = {
      It: ks(e, S, x),
      vn: S,
      Dt: x
    };
    if (T)
      return y(L), !1;
    const B = V || m(re({}, L, {
      At: C
    })), k = l(re({}, L, {
      _n: h,
      Zt: B
    }));
    y(re({}, L, {
      Zt: B,
      tn: k
    }));
    const I = O(B), N = O(k), ee = I || N || !Jn(S) || x;
    return c = !0, ee && a(w, {
      Zt: B,
      tn: k
    }), ee;
  };
  return [() => {
    const { an: w, ht: V, Ot: q } = f, E = De(w), C = [p(), d(), $()], T = q();
    return Ne(V, E), T(), X(Ve, C);
  }, R, () => ({
    hn: h,
    bn: u
  }), {
    wn: f,
    yn: D
  }, v];
}, ze = (t, e, n) => {
  const { N: a } = je(), s = nn(t), c = s ? t : t.target, i = $o(c);
  if (e && !i) {
    let d = !1;
    const l = [], u = {}, f = (S) => {
      const x = Qs(S), L = Ot(ca);
      return L ? L(x, !0) : x;
    }, v = re({}, a(), f(e)), [p, m, h] = Nn(), [$, y, D] = Nn(n), O = (S, x) => {
      D(S, x), h(S, x);
    }, [R, w, V, q, E] = xa(t, v, () => d, ({ vn: S, Dt: x }, { Zt: L, tn: B }) => {
      const { ft: k, Ct: I, xt: N, Ht: ee, Et: se, dt: oe } = L, { nn: Z, sn: A, en: j, cn: F } = B;
      O("updated", [T, {
        updateHints: {
          sizeChanged: !!k,
          directionChanged: !!I,
          heightIntrinsicChanged: !!N,
          overflowEdgeChanged: !!Z,
          overflowAmountChanged: !!A,
          overflowStyleChanged: !!j,
          scrollCoordinatesChanged: !!F,
          contentMutation: !!ee,
          hostMutation: !!se,
          appear: !!oe
        },
        changedOptions: S || {},
        force: !!x
      }]);
    }, (S) => O("scroll", [T, S])), C = (S) => {
      aa(c), Ve(l), d = !0, O("destroyed", [T, S]), m(), y();
    }, T = {
      options(S, x) {
        if (S) {
          const L = x ? a() : {}, B = mo(v, re(L, f(S)));
          Jn(B) || (re(v, B), w({
            vn: B
          }));
        }
        return re({}, v);
      },
      on: $,
      off: (S, x) => {
        S && x && y(S, x);
      },
      state() {
        const { hn: S, bn: x } = V(), { ct: L } = S, { Vt: B, Rt: k, K: I, rn: N, ln: ee, dn: se, Lt: oe } = x;
        return re({}, {
          overflowEdge: B,
          overflowAmount: k,
          overflowStyle: I,
          hasOverflow: N,
          scrollCoordinates: {
            start: oe.D,
            end: oe.T
          },
          padding: ee,
          paddingAbsolute: se,
          directionRTL: L,
          destroyed: d
        });
      },
      elements() {
        const { vt: S, gt: x, ln: L, ot: B, bt: k, ht: I, Qt: N } = q.wn, { Xt: ee, Gt: se } = q.yn, oe = (A) => {
          const { Pt: j, Ut: F, kt: G } = A;
          return {
            scrollbar: G,
            track: F,
            handle: j
          };
        }, Z = (A) => {
          const { Yt: j, Wt: F } = A, G = oe(j[0]);
          return re({}, G, {
            clone: () => {
              const H = oe(F());
              return w({
                gn: !0
              }), H;
            }
          });
        };
        return re({}, {
          target: S,
          host: x,
          padding: L || B,
          viewport: B,
          content: k || B,
          scrollOffsetElement: I,
          scrollEventElement: N,
          scrollbarHorizontal: Z(ee),
          scrollbarVertical: Z(se)
        });
      },
      update: (S) => w({
        Dt: S,
        At: !0
      }),
      destroy: X(C, !1),
      plugin: (S) => u[Pe(S)[0]]
    };
    return pe(l, [E]), ra(c, T), So(ko, ze, [T, p, u]), oa(q.wn.wt, !s && t.cancel) ? (C(!0), T) : (pe(l, R()), O("initialized", [T]), T.update(), T);
  }
  return i;
};
ze.plugin = (t) => {
  const e = qe(t), n = e ? t : [t], a = n.map((s) => So(s, ze)[0]);
  return ia(n), e ? a : a[0];
};
ze.valid = (t) => {
  const e = t && t.elements, n = Fe(e) && e();
  return tn(n) && !!$o(n.target);
};
ze.env = () => {
  const { k: t, M: e, R: n, V: a, B: s, F: c, U: i, P: d, N: l, q: u } = je();
  return re({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: a,
    staticDefaultInitialization: s,
    staticDefaultOptions: c,
    getDefaultInitialization: i,
    setDefaultInitialization: d,
    getDefaultOptions: l,
    setDefaultOptions: u
  });
};
ze.nonce = ta;
function Sa() {
  let t;
  const e = M(null), n = Math.floor(Math.random() * 2 ** 32), a = M(!1), s = M([]), c = () => s.value, i = () => t.getSelection(), d = () => s.value.length, l = () => t.clearSelection(!0), u = M(), f = M(null), v = M(null), p = M(null);
  function m() {
    t = new ir({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: w, event: V, isDragging: q }) => {
      if (q)
        t.Interaction._reset(V);
      else {
        a.value = !1;
        const E = e.value.offsetWidth - V.offsetX, C = e.value.offsetHeight - V.offsetY;
        E < 15 && C < 15 && t.Interaction._reset(V), V.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(V);
      }
    }), document.addEventListener("dragleave", (w) => {
      !w.buttons && a.value && (a.value = !1);
    });
  }
  const h = () => ct(() => {
    t.addSelection(
      t.getSelectables()
    ), $();
  }), $ = () => {
    s.value = t.getSelection().map((w) => JSON.parse(w.dataset.item)), u.value(s.value);
  }, y = () => ct(() => {
    const w = c().map((V) => V.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((V) => w.includes(JSON.parse(V.dataset.item).path))
    ), $(), O();
  }), D = (w) => {
    u.value = w, t.subscribe("DS:end", ({ items: V, event: q, isDragging: E }) => {
      s.value = V.map((C) => JSON.parse(C.dataset.item)), w(V.map((C) => JSON.parse(C.dataset.item)));
    });
  }, O = () => {
    f.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (v.value.style.height = e.value.scrollHeight + "px", v.value.style.display = "block") : (v.value.style.height = "100%", v.value.style.display = "none"));
  }, R = (w) => {
    if (!f.value)
      return;
    const { scrollOffsetElement: V } = f.value.elements();
    V.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return $e(() => {
    ze(p.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: ze
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (w) => {
        f.value = w;
      },
      scroll: (w, V) => {
        const { scrollOffsetElement: q } = w.elements();
        e.value.scrollTo({
          top: q.scrollTop,
          left: 0
        });
      }
    }), m(), O(), new ResizeObserver(O).observe(e.value), e.value.addEventListener("scroll", R), t.subscribe("DS:scroll", ({ isDragging: w }) => w || R());
  }), jn(() => {
    t && t.stop();
  }), Ls(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: a,
    scrollBar: v,
    scrollBarContainer: p,
    getSelected: c,
    getSelection: i,
    selectAll: h,
    clearSelection: l,
    refreshSelection: y,
    getCount: d,
    onSelect: D
  };
}
function Ca(t, e) {
  const n = M(t), a = M(e), s = M([]), c = M([]), i = M([]), d = M(!1), l = M(5);
  let u = !1, f = !1;
  const v = yt({
    adapter: n,
    storages: [],
    dirname: a,
    files: []
  });
  function p() {
    let O = [], R = [], w = a.value ?? n.value + "://";
    w.length === 0 && (s.value = []), w.replace(n.value + "://", "").split("/").forEach(function(E) {
      O.push(E), O.join("/") !== "" && R.push({
        basename: E,
        name: E,
        path: n.value + "://" + O.join("/"),
        type: "dir"
      });
    }), c.value = R;
    const [V, q] = h(R, l.value);
    i.value = q, s.value = V;
  }
  function m(O) {
    l.value = O, p();
  }
  function h(O, R) {
    return O.length > R ? [O.slice(-R), O.slice(0, -R)] : [O, []];
  }
  function $(O = null) {
    d.value = O ?? !d.value;
  }
  function y() {
    return s.value && s.value.length && !f;
  }
  const D = ot(() => {
    var O;
    return ((O = s.value[s.value.length - 2]) == null ? void 0 : O.path) ?? n.value + "://";
  });
  return $e(() => {
  }), Oe(a, p), $e(p), {
    adapter: n,
    path: a,
    loading: u,
    searchMode: f,
    data: v,
    breadcrumbs: s,
    breadcrumbItems: c,
    limitBreadcrumbItems: m,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: $,
    isGoUpAvailable: y,
    parentFolderPath: D
  };
}
const Ea = (t, e) => {
  const n = mr(t.id), a = lr(), s = n.getStore("metricUnits", !1), c = yr(n, t.theme), i = e.i18n, d = t.locale ?? e.locale, l = n.getStore("adapter"), u = (p) => Array.isArray(p) ? p : gr, f = n.getStore("persist-path", t.persist), v = f ? n.getStore("path", t.path) : t.path;
  return yt({
    /** 
    * Core properties
    * */
    // app version
    version: br,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: a,
    // storage
    storage: n,
    // localization object
    i18n: hr(n, d, a, i),
    // modal state
    modal: $r(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: ot(() => Sa()),
    // http object
    requester: fr(t.request),
    // active features
    features: u(t.features),
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
    filesize: s ? Bs : Rs,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: f,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: Ca(l, v)
  });
}, Aa = /* @__PURE__ */ r("div", { class: "vuefinder__modal-layout__overlay" }, null, -1), Ta = { class: "vuefinder__modal-layout__container" }, Ma = { class: "vuefinder__modal-layout__content" }, Da = { class: "vuefinder__modal-layout__footer" }, Ge = {
  __name: "ModalLayout",
  setup(t) {
    const e = M(null), n = ae("ServiceContainer");
    return $e(() => {
      const a = document.querySelector(".v-f-modal input");
      a && a.focus(), ct(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const s = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (a, s) => (_(), g("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = $t((c) => o(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      Aa,
      r("div", Ta, [
        r("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = nt((c) => o(n).modal.close(), ["self"]))
        }, [
          r("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            r("div", Ma, [
              Tt(a.$slots, "default")
            ]),
            r("div", Da, [
              Tt(a.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Va = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [a, s] of e)
    n[a] = s;
  return n;
}, La = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const a = ae("ServiceContainer"), s = M(!1), { t: c } = a.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), s.value = !0, i = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return $e(() => {
      a.emitter.on(t.on, d);
    }), jn(() => {
      clearTimeout(i);
    }), {
      shown: s,
      t: c
    };
  }
}, Oa = { key: 1 };
function Fa(t, e, n, a, s, c) {
  return _(), g("div", {
    class: ce(["vuefinder__action-message", { "vuefinder__action-message--hidden": !a.shown }])
  }, [
    t.$slots.default ? Tt(t.$slots, "default", { key: 0 }) : (_(), g("span", Oa, b(a.t("Saved.")), 1))
  ], 2);
}
const vt = /* @__PURE__ */ Va(La, [["render", Fa]]), Ha = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, Ra = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
}, null, -1), Ba = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
}, null, -1), Ia = [
  Ra,
  Ba
];
function Na(t, e) {
  return _(), g("svg", Ha, [...Ia]);
}
const Ua = { render: Na }, qa = { class: "vuefinder__modal-header" }, Pa = { class: "vuefinder__modal-header__icon-container" }, za = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Ze = {
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
    return (e, n) => (_(), g("div", qa, [
      r("div", Pa, [
        (_(), K(Os(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      r("h3", za, b(t.title), 1)
    ]));
  }
}, ja = { class: "vuefinder__about-modal__content" }, Ga = { class: "vuefinder__about-modal__main" }, Ka = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Wa = ["onClick", "aria-current"], Ya = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Xa = { class: "vuefinder__about-modal__description" }, Ja = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Za = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Qa = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, el = { class: "vuefinder__about-modal__description" }, tl = { class: "vuefinder__about-modal__settings" }, nl = { class: "vuefinder__about-modal__setting" }, sl = { class: "vuefinder__about-modal__setting-input" }, ol = { class: "vuefinder__about-modal__setting-label" }, rl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, al = { class: "vuefinder__about-modal__setting" }, ll = { class: "vuefinder__about-modal__setting-input" }, il = { class: "vuefinder__about-modal__setting-label" }, cl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, dl = { class: "vuefinder__about-modal__setting" }, ul = { class: "vuefinder__about-modal__setting-input" }, _l = { class: "vuefinder__about-modal__setting-label" }, vl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, fl = { class: "vuefinder__about-modal__setting" }, ml = { class: "vuefinder__about-modal__setting-input" }, pl = { class: "vuefinder__about-modal__setting-label" }, hl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, gl = { class: "vuefinder__about-modal__setting" }, bl = { class: "vuefinder__about-modal__setting-input" }, wl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, yl = { class: "vuefinder__about-modal__setting-label" }, $l = ["label"], kl = ["value"], xl = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Sl = { class: "vuefinder__about-modal__setting-input" }, Cl = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, El = { class: "vuefinder__about-modal__setting-label" }, Al = ["label"], Tl = ["value"], Ml = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Dl = { class: "vuefinder__about-modal__shortcuts" }, Vl = { class: "vuefinder__about-modal__shortcut" }, Ll = /* @__PURE__ */ r("kbd", null, "F2", -1), Ol = { class: "vuefinder__about-modal__shortcut" }, Fl = /* @__PURE__ */ r("kbd", null, "F5", -1), Hl = { class: "vuefinder__about-modal__shortcut" }, Rl = /* @__PURE__ */ r("kbd", null, "Del", -1), Bl = { class: "vuefinder__about-modal__shortcut" }, Il = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Esc")
], -1), Nl = { class: "vuefinder__about-modal__shortcut" }, Ul = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, "A")
], -1), ql = { class: "vuefinder__about-modal__shortcut" }, Pl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, "F")
], -1), zl = { class: "vuefinder__about-modal__shortcut" }, jl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, "E")
], -1), Gl = { class: "vuefinder__about-modal__shortcut" }, Kl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, ",")
], -1), Wl = { class: "vuefinder__about-modal__shortcut" }, Yl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, "Enter")
], -1), Xl = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Jl = { class: "vuefinder__about-modal__description" }, Ao = {
  __name: "ModalAbout",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: n, clearStore: a } = e.storage, { t: s } = e.i18n, c = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, i = ot(() => [
      { name: s("About"), key: c.ABOUT },
      { name: s("Settings"), key: c.SETTINGS },
      { name: s("Shortcuts"), key: c.SHORTCUTS },
      { name: s("Reset"), key: c.RESET }
    ]), d = M("about"), l = async () => {
      a(), location.reload();
    }, u = (O) => {
      e.theme.set(O), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Bs : Rs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, v = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, m = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = ae("VueFinderOptions"), y = Object.fromEntries(
      Object.entries({
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
      }).filter(([O]) => Object.keys(h).includes(O))
    ), D = ot(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (O, R) => (_(), K(Ge, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: R[7] || (R[7] = (w) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(s)("Close")), 1)
      ]),
      default: Q(() => [
        r("div", ja, [
          P(Ze, {
            icon: o(Ua),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          r("div", Ga, [
            r("div", null, [
              r("div", null, [
                r("nav", Ka, [
                  (_(!0), g(he, null, ge(i.value, (w) => (_(), g("button", {
                    key: w.name,
                    onClick: (V) => d.value = w.key,
                    class: ce([w.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": w.current ? "page" : void 0
                  }, b(w.name), 11, Wa))), 128))
                ])
              ])
            ]),
            d.value === c.ABOUT ? (_(), g("div", Ya, [
              r("div", Xa, b(o(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              r("a", Ja, b(o(s)("Project home")), 1),
              r("a", Za, b(o(s)("Follow on GitHub")), 1)
            ])) : U("", !0),
            d.value === c.SETTINGS ? (_(), g("div", Qa, [
              r("div", el, b(o(s)("Customize your experience with the following settings")), 1),
              r("div", tl, [
                r("fieldset", null, [
                  r("div", nl, [
                    r("div", sl, [
                      _e(r("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": R[0] || (R[0] = (w) => o(e).metricUnits = w),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Pt, o(e).metricUnits]
                      ])
                    ]),
                    r("div", ol, [
                      r("label", rl, [
                        J(b(o(s)("Use Metric Units")) + " ", 1),
                        P(vt, {
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
                  r("div", al, [
                    r("div", ll, [
                      _e(r("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": R[1] || (R[1] = (w) => o(e).compactListView = w),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Pt, o(e).compactListView]
                      ])
                    ]),
                    r("div", il, [
                      r("label", cl, [
                        J(b(o(s)("Compact list view")) + " ", 1),
                        P(vt, {
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
                  r("div", dl, [
                    r("div", ul, [
                      _e(r("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": R[2] || (R[2] = (w) => o(e).persist = w),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Pt, o(e).persist]
                      ])
                    ]),
                    r("div", _l, [
                      r("label", vl, [
                        J(b(o(s)("Persist path on reload")) + " ", 1),
                        P(vt, {
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
                  r("div", fl, [
                    r("div", ml, [
                      _e(r("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": R[3] || (R[3] = (w) => o(e).showThumbnails = w),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Pt, o(e).showThumbnails]
                      ])
                    ]),
                    r("div", pl, [
                      r("label", hl, [
                        J(b(o(s)("Show thumbnails")) + " ", 1),
                        P(vt, {
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
                  r("div", gl, [
                    r("div", bl, [
                      r("label", wl, b(o(s)("Theme")), 1)
                    ]),
                    r("div", yl, [
                      _e(r("select", {
                        id: "theme",
                        "onUpdate:modelValue": R[4] || (R[4] = (w) => o(e).theme.value = w),
                        onChange: R[5] || (R[5] = (w) => u(w.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: o(s)("Theme")
                        }, [
                          (_(!0), g(he, null, ge(D.value, (w, V) => (_(), g("option", { value: V }, b(w), 9, kl))), 256))
                        ], 8, $l)
                      ], 544), [
                        [En, o(e).theme.value]
                      ]),
                      P(vt, {
                        class: "ms-3 flex-shrink-0 flex-grow basis-full",
                        on: "vf-theme-saved"
                      }, {
                        default: Q(() => [
                          J(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  o(e).features.includes(o(ue).LANGUAGE) && Object.keys(o(y)).length > 1 ? (_(), g("div", xl, [
                    r("div", Sl, [
                      r("label", Cl, b(o(s)("Language")), 1)
                    ]),
                    r("div", El, [
                      _e(r("select", {
                        id: "language",
                        "onUpdate:modelValue": R[6] || (R[6] = (w) => o(e).i18n.locale = w),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: o(s)("Language")
                        }, [
                          (_(!0), g(he, null, ge(o(y), (w, V) => (_(), g("option", { value: V }, b(w), 9, Tl))), 256))
                        ], 8, Al)
                      ], 512), [
                        [En, o(e).i18n.locale]
                      ]),
                      P(vt, {
                        class: "ms-3 flex-shrink-0 flex-grow basis-full",
                        on: "vf-language-saved"
                      }, {
                        default: Q(() => [
                          J(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : U("", !0)
                ])
              ])
            ])) : U("", !0),
            d.value === c.SHORTCUTS ? (_(), g("div", Ml, [
              r("div", Dl, [
                r("div", Vl, [
                  r("div", null, b(o(s)("Rename")), 1),
                  Ll
                ]),
                r("div", Ol, [
                  r("div", null, b(o(s)("Refresh")), 1),
                  Fl
                ]),
                r("div", Hl, [
                  J(b(o(s)("Delete")) + " ", 1),
                  Rl
                ]),
                r("div", Bl, [
                  J(b(o(s)("Escape")) + " ", 1),
                  Il
                ]),
                r("div", Nl, [
                  J(b(o(s)("Select All")) + " ", 1),
                  Ul
                ]),
                r("div", ql, [
                  J(b(o(s)("Search")) + " ", 1),
                  Pl
                ]),
                r("div", zl, [
                  J(b(o(s)("Toggle Sidebar")) + " ", 1),
                  jl
                ]),
                r("div", Gl, [
                  J(b(o(s)("Open Settings")) + " ", 1),
                  Kl
                ]),
                r("div", Wl, [
                  J(b(o(s)("Toggle Full Screen")) + " ", 1),
                  Yl
                ])
              ])
            ])) : U("", !0),
            d.value === c.RESET ? (_(), g("div", Xl, [
              r("div", Jl, b(o(s)("Reset all settings to default")), 1),
              r("button", {
                onClick: l,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(s)("Reset Settings")), 1)
            ])) : U("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Zl = ["title"], Ql = /* @__PURE__ */ r("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "vuefinder__message__icon"
}, [
  /* @__PURE__ */ r("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), ei = [
  Ql
], Ke = {
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
    const n = e, a = ae("ServiceContainer"), { t: s } = a.i18n, c = M(!1), i = M(null), d = M((u = i.value) == null ? void 0 : u.strMessage);
    Oe(d, () => c.value = !1);
    const l = () => {
      n("hidden"), c.value = !0;
    };
    return (f, v) => (_(), g("div", null, [
      c.value ? U("", !0) : (_(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: ce(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Tt(f.$slots, "default"),
        r("div", {
          class: "vuefinder__message__close",
          onClick: l,
          title: o(s)("Close")
        }, ei, 8, Zl)
      ], 2))
    ]));
  }
}, ti = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ni = /* @__PURE__ */ r("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), si = [
  ni
];
function oi(t, e) {
  return _(), g("svg", ti, [...si]);
}
const To = { render: oi }, ri = { class: "vuefinder__delete-modal__content" }, ai = { class: "vuefinder__delete-modal__form" }, li = { class: "vuefinder__delete-modal__description" }, ii = { class: "vuefinder__delete-modal__files vf-scrollbar" }, ci = { class: "vuefinder__delete-modal__file" }, di = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ui = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), _i = [
  ui
], vi = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fi = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), mi = [
  fi
], pi = { class: "vuefinder__delete-modal__file-name" }, hi = { class: "vuefinder__delete-modal__warning" }, as = {
  __name: "ModalDelete",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, a = M(e.modal.data.items), s = M(""), c = () => {
      a.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: a.value.map(({ path: i, type: d }) => ({ path: i, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), K(Ge, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, b(o(n)("Yes, Delete!")), 1),
        r("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        r("div", hi, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Ze, {
            icon: o(To),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          r("div", ri, [
            r("div", ai, [
              r("p", li, b(o(n)("Are you sure you want to delete these files?")), 1),
              r("div", ii, [
                (_(!0), g(he, null, ge(a.value, (l) => (_(), g("p", ci, [
                  l.type === "dir" ? (_(), g("svg", di, _i)) : (_(), g("svg", vi, mi)),
                  r("span", pi, b(l.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (_(), K(Ke, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, gi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, bi = /* @__PURE__ */ r("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), wi = [
  bi
];
function yi(t, e) {
  return _(), g("svg", gi, [...wi]);
}
const Mo = { render: yi }, $i = { class: "vuefinder__rename-modal__content" }, ki = { class: "vuefinder__rename-modal__item" }, xi = { class: "vuefinder__rename-modal__item-info" }, Si = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ci = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ei = [
  Ci
], Ai = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ti = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Mi = [
  Ti
], Di = { class: "vuefinder__rename-modal__item-name" }, ls = {
  __name: "ModalRename",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, a = M(e.modal.data.items[0]), s = M(e.modal.data.items[0].basename), c = M(""), i = () => {
      s.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: a.value.path,
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
    return (d, l) => (_(), K(Ge, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Rename")), 1),
        r("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Ze, {
            icon: o(Mo),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          r("div", $i, [
            r("div", ki, [
              r("p", xi, [
                a.value.type === "dir" ? (_(), g("svg", Si, Ei)) : (_(), g("svg", Ai, Mi)),
                r("span", Di, b(a.value.basename), 1)
              ]),
              _e(r("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => s.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [kt, s.value]
              ]),
              c.value.length ? (_(), K(Ke, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(c.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, We = {
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
function Vi(t) {
  const e = (n) => {
    n.code === We.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === We.F2 && t.features.includes(ue.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(ls, { items: t.dragSelect.getSelected() })), n.code === We.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === We.DELETE && (!t.dragSelect.getCount() || t.modal.open(as, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === We.BACKSLASH && t.modal.open(Ao), n.metaKey && n.code === We.KEY_F && t.features.includes(ue.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === We.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === We.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === We.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
  };
  $e(() => {
    t.root.addEventListener("keydown", e);
  }), jn(() => {
    t.root.removeEventListener("keydown", e);
  });
}
const Li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Oi = /* @__PURE__ */ r("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Fi = [
  Oi
];
function Hi(t, e) {
  return _(), g("svg", Li, [...Fi]);
}
const Do = { render: Hi }, Ri = { class: "vuefinder__new-folder-modal__content" }, Bi = { class: "vuefinder__new-folder-modal__form" }, Ii = { class: "vuefinder__new-folder-modal__description" }, Ni = ["placeholder"], Vo = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, a = M(""), s = M(""), c = () => {
      a.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), K(Ge, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Ze, {
            icon: o(Do),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          r("div", Ri, [
            r("div", Bi, [
              r("p", Ii, b(o(n)("Create a new folder")), 1),
              _e(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => a.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text"
              }, null, 40, Ni), [
                [kt, a.value]
              ]),
              s.value.length ? (_(), K(Ke, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ui = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, qi = /* @__PURE__ */ r("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Pi = [
  qi
];
function zi(t, e) {
  return _(), g("svg", Ui, [...Pi]);
}
const Lo = { render: zi }, ji = { class: "vuefinder__new-file-modal__content" }, Gi = { class: "vuefinder__new-file-modal__form" }, Ki = { class: "vuefinder__new-file-modal__description" }, Wi = ["placeholder"], Yi = {
  __name: "ModalNewFile",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, a = M(""), s = M(""), c = () => {
      a.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), K(Ge, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Ze, {
            icon: o(Lo),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          r("div", ji, [
            r("div", Gi, [
              r("p", Ki, b(o(n)("Create a new file")), 1),
              _e(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => a.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, Wi), [
                [kt, a.value]
              ]),
              s.value.length ? (_(), K(Ke, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function Pn(t, e = 14) {
  let n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const Xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Ji = /* @__PURE__ */ r("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), Zi = [
  Ji
];
function Qi(t, e) {
  return _(), g("svg", Xi, [...Zi]);
}
const Oo = { render: Qi }, ec = { class: "vuefinder__upload-modal__content" }, tc = {
  key: 0,
  class: "pointer-events-none"
}, nc = {
  key: 1,
  class: "pointer-events-none"
}, sc = ["disabled"], oc = ["disabled"], rc = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, ac = ["textContent"], lc = { class: "vuefinder__upload-modal__file-info" }, ic = { class: "vuefinder__upload-modal__file-name hidden md:block" }, cc = { class: "vuefinder__upload-modal__file-name md:hidden" }, dc = {
  key: 0,
  class: "ml-auto"
}, uc = ["title", "disabled", "onClick"], _c = /* @__PURE__ */ r("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "vuefinder__upload-modal__file-remove-icon"
}, [
  /* @__PURE__ */ r("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), vc = [
  _c
], fc = {
  key: 0,
  class: "py-2"
}, mc = ["disabled"], pc = {
  __name: "ModalUpload",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, a = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = M({ QUEUE_ENTRY_STATUS: s }), i = M(null), d = M(null), l = M(null), u = M(null), f = M(null), v = M(null), p = M([]), m = M(""), h = M(!1), $ = M(!1);
    let y;
    function D(L) {
      return p.value.findIndex((B) => B.id === L);
    }
    function O(L, B = null) {
      B = B ?? (L.webkitRelativePath || L.name), y.addFile({
        name: B,
        type: L.type,
        data: L,
        source: "Local"
      });
    }
    function R(L) {
      switch (L.status) {
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
    const w = (L) => {
      switch (L.status) {
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
    function q() {
      if (!h.value) {
        if (!p.value.filter((L) => L.status !== s.DONE).length) {
          m.value = n("Please select file to upload first.");
          return;
        }
        m.value = "", y.retryAll(), y.upload();
      }
    }
    function E() {
      y.cancelAll({ reason: "user" }), p.value.forEach((L) => {
        L.status !== s.DONE && (L.status = s.CANCELED, L.statusName = n("Canceled"));
      }), h.value = !1;
    }
    function C(L) {
      h.value || (y.removeFile(L.id, "removed-by-user"), p.value.splice(D(L.id), 1));
    }
    function T(L) {
      if (!h.value) {
        if (y.cancelAll({ reason: "user" }), L) {
          const B = [];
          p.value.forEach((k) => {
            k.status !== s.DONE && B.push(k);
          }), p.value = [], B.forEach((k) => {
            O(k.originalFile, k.name);
          });
          return;
        }
        p.value.splice(0);
      }
    }
    function S() {
      e.modal.close();
    }
    function x() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return $e(async () => {
      y = new cr({
        debug: e.debug,
        restrictions: {
          maxFileSize: wr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: a,
        onBeforeFileAdded(k, I) {
          if (I[k.id] != null) {
            const ee = D(k.id);
            p.value[ee].status === s.PENDING && (m.value = y.i18n("noDuplicates", { fileName: k.name })), p.value = p.value.filter((se) => se.id !== k.id);
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
      }), y.use(dr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(k, I) {
          let N;
          try {
            N = JSON.parse(k).message;
          } catch {
            N = n("Cannot parse server response.");
          }
          return new Error(N);
        }
      }), y.on("restriction-failed", (k, I) => {
        const N = p.value[D(k.id)];
        C(N), m.value = I.message;
      }), y.on("upload", () => {
        const k = x();
        y.setMeta({ ...k.body });
        const I = y.getPlugin("XHRUpload");
        I.opts.method = k.method, I.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), I.opts.headers = k.headers, delete k.headers["Content-Type"], h.value = !0, p.value.forEach((N) => {
          N.status !== s.DONE && (N.percent = null, N.status = s.UPLOADING, N.statusName = n("Pending upload"));
        });
      }), y.on("upload-progress", (k, I) => {
        const N = Math.floor(I.bytesUploaded / I.bytesTotal * 100);
        p.value[D(k.id)].percent = `${N}%`;
      }), y.on("upload-success", (k) => {
        const I = p.value[D(k.id)];
        I.status = s.DONE, I.statusName = n("Done");
      }), y.on("upload-error", (k, I) => {
        const N = p.value[D(k.id)];
        N.percent = null, N.status = s.ERROR, I.isNetworkError ? N.statusName = n("Network Error, Unable establish connection to the server or interrupted.") : N.statusName = I ? I.message : n("Unknown Error");
      }), y.on("error", (k) => {
        m.value = k.message, h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), y.on("complete", () => {
        h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), f.value.addEventListener("click", () => {
        l.value.click();
      }), v.value.addEventListener("dragover", (k) => {
        k.preventDefault(), $.value = !0;
      }), v.value.addEventListener("dragleave", (k) => {
        k.preventDefault(), $.value = !1;
      });
      function L(k, I) {
        I.isFile && I.file((N) => k(I, N)), I.isDirectory && I.createReader().readEntries((N) => {
          N.forEach((ee) => {
            L(k, ee);
          });
        });
      }
      v.value.addEventListener("drop", (k) => {
        k.preventDefault(), $.value = !1;
        const I = /^[/\\](.+)/;
        [...k.dataTransfer.items].forEach((N) => {
          N.kind === "file" && L((ee, se) => {
            const oe = I.exec(ee.fullPath);
            O(se, oe[1]);
          }, N.webkitGetAsEntry());
        });
      });
      const B = ({ target: k }) => {
        const I = k.files;
        for (const N of I)
          O(N);
        k.value = "";
      };
      d.value.addEventListener("change", B), l.value.addEventListener("change", B);
    }), Fs(() => {
      y == null || y.close({ reason: "unmount" });
    }), (L, B) => (_(), K(Ge, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          class: "vuefinder__upload-modal__upload-button",
          disabled: h.value,
          onClick: nt(q, ["prevent"])
        }, b(o(n)("Upload")), 9, mc),
        h.value ? (_(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: nt(E, ["prevent"])
        }, b(o(n)("Cancel")), 1)) : (_(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: nt(S, ["prevent"])
        }, b(o(n)("Close")), 1))
      ]),
      default: Q(() => [
        r("div", null, [
          P(Ze, {
            icon: o(Oo),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          r("div", ec, [
            r("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: v,
              onClick: V
            }, [
              $.value ? (_(), g("div", tc, b(o(n)("Release to drop these files.")), 1)) : (_(), g("div", nc, b(o(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            r("div", {
              ref_key: "container",
              ref: i,
              class: "vuefinder__upload-modal__buttons"
            }, [
              r("button", {
                ref_key: "pickFiles",
                ref: u,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(n)("Select Files")), 513),
              r("button", {
                ref_key: "pickFolders",
                ref: f,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(n)("Select Folders")), 513),
              r("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: B[0] || (B[0] = (k) => T(!1))
              }, b(o(n)("Clear all")), 9, sc),
              r("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: B[1] || (B[1] = (k) => T(!0))
              }, b(o(n)("Clear only successful")), 9, oc)
            ], 512),
            r("div", rc, [
              (_(!0), g(he, null, ge(p.value, (k) => (_(), g("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: k.id
              }, [
                r("span", {
                  class: ce(["vuefinder__upload-modal__file-icon", R(k)])
                }, [
                  r("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(w(k))
                  }, null, 8, ac)
                ], 2),
                r("div", lc, [
                  r("div", ic, b(o(Pn)(k.name, 40)) + " (" + b(k.size) + ")", 1),
                  r("div", cc, b(o(Pn)(k.name, 16)) + " (" + b(k.size) + ")", 1),
                  r("div", {
                    class: ce(["vuefinder__upload-modal__file-status", R(k)])
                  }, [
                    J(b(k.statusName) + " ", 1),
                    k.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (_(), g("b", dc, b(k.percent), 1)) : U("", !0)
                  ], 2)
                ]),
                r("button", {
                  type: "button",
                  class: ce(["vuefinder__upload-modal__file-remove", h.value ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: h.value,
                  onClick: (I) => C(k)
                }, vc, 10, uc)
              ]))), 128)),
              p.value.length ? U("", !0) : (_(), g("div", fc, b(o(n)("No files selected!")), 1))
            ]),
            m.value.length ? (_(), K(Ke, {
              key: 0,
              onHidden: B[2] || (B[2] = (k) => m.value = ""),
              error: ""
            }, {
              default: Q(() => [
                J(b(m.value), 1)
              ]),
              _: 1
            })) : U("", !0)
          ])
        ]),
        r("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        r("input", {
          ref_key: "internalFolderInput",
          ref: l,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}, hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, gc = /* @__PURE__ */ r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), bc = [
  gc
];
function wc(t, e) {
  return _(), g("svg", hc, [...bc]);
}
const Fo = { render: wc }, yc = { class: "vuefinder__unarchive-modal__content" }, $c = { class: "vuefinder__unarchive-modal__items" }, kc = { class: "vuefinder__unarchive-modal__item" }, xc = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Sc = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Cc = [
  Sc
], Ec = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ac = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Tc = [
  Ac
], Mc = { class: "vuefinder__unarchive-modal__item-name" }, Dc = { class: "vuefinder__unarchive-modal__info" }, Ho = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, a = M(e.modal.data.items[0]), s = M(""), c = M([]), i = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: a.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, l) => (_(), K(Ge, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Unarchive")), 1),
        r("button", {
          type: "button",
          onClick: l[1] || (l[1] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Ze, {
            icon: o(Fo),
            title: o(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          r("div", yc, [
            r("div", $c, [
              (_(!0), g(he, null, ge(c.value, (u) => (_(), g("p", kc, [
                u.type === "dir" ? (_(), g("svg", xc, Cc)) : (_(), g("svg", Ec, Tc)),
                r("span", Mc, b(u.basename), 1)
              ]))), 256)),
              r("p", Dc, b(o(n)("The archive will be unarchived at")) + " (" + b(o(e).fs.data.dirname) + ")", 1),
              s.value.length ? (_(), K(Ke, {
                key: 0,
                onHidden: l[0] || (l[0] = (u) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Lc = /* @__PURE__ */ r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Oc = [
  Lc
];
function Fc(t, e) {
  return _(), g("svg", Vc, [...Oc]);
}
const Ro = { render: Fc }, Hc = { class: "vuefinder__archive-modal__content" }, Rc = { class: "vuefinder__archive-modal__form" }, Bc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Ic = { class: "vuefinder__archive-modal__file" }, Nc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Uc = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), qc = [
  Uc
], Pc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zc = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), jc = [
  zc
], Gc = { class: "vuefinder__archive-modal__file-name" }, Kc = ["placeholder"], Bo = {
  __name: "ModalArchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, a = M(""), s = M(""), c = M(e.modal.data.items), i = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: c.value.map(({ path: d, type: l }) => ({ path: d, type: l })),
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, l) => (_(), K(Ge, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Archive")), 1),
        r("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Ze, {
            icon: o(Ro),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          r("div", Hc, [
            r("div", Rc, [
              r("div", Bc, [
                (_(!0), g(he, null, ge(c.value, (u) => (_(), g("p", Ic, [
                  u.type === "dir" ? (_(), g("svg", Nc, qc)) : (_(), g("svg", Pc, jc)),
                  r("span", Gc, b(u.basename), 1)
                ]))), 256))
              ]),
              _e(r("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => a.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Kc), [
                [kt, a.value]
              ]),
              s.value.length ? (_(), K(Ke, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(s.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, Yc = /* @__PURE__ */ r("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), Xc = /* @__PURE__ */ r("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), Jc = [
  Yc,
  Xc
];
function Zc(t, e) {
  return _(), g("svg", Wc, [...Jc]);
}
const is = { render: Zc }, Qc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, ed = /* @__PURE__ */ r("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), td = [
  ed
];
function nd(t, e) {
  return _(), g("svg", Qc, [...td]);
}
const sd = { render: nd }, od = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, rd = /* @__PURE__ */ r("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), ad = [
  rd
];
function ld(t, e) {
  return _(), g("svg", od, [...ad]);
}
const id = { render: ld }, cd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, dd = /* @__PURE__ */ r("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), ud = [
  dd
];
function _d(t, e) {
  return _(), g("svg", cd, [...ud]);
}
const vd = { render: _d }, fd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, md = /* @__PURE__ */ r("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), pd = [
  md
];
function hd(t, e) {
  return _(), g("svg", fd, [...pd]);
}
const gd = { render: hd }, bd = { class: "vuefinder__toolbar" }, wd = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, yd = ["title"], $d = ["title"], kd = ["title"], xd = ["title"], Sd = ["title"], Cd = ["title"], Ed = ["title"], Ad = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Td = { class: "pl-2" }, Md = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Dd = { class: "vuefinder__toolbar__controls" }, Vd = ["title"], Ld = ["title"], Od = {
  __name: "Toolbar",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: n } = e.storage, { t: a } = e.i18n, s = e.dragSelect, c = M("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen;
    };
    Oe(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (l, u) => (_(), g("div", bd, [
      c.value.length ? (_(), g("div", Ad, [
        r("div", Td, [
          J(b(o(a)("Search results for")) + " ", 1),
          r("span", Md, b(c.value), 1)
        ]),
        o(e).fs.loading ? (_(), K(o(is), { key: 0 })) : U("", !0)
      ])) : (_(), g("div", wd, [
        o(e).features.includes(o(ue).NEW_FOLDER) ? (_(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(a)("New Folder"),
          onClick: u[0] || (u[0] = (f) => o(e).modal.open(Vo, { items: o(s).getSelected() }))
        }, [
          P(o(Do))
        ], 8, yd)) : U("", !0),
        o(e).features.includes(o(ue).NEW_FILE) ? (_(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(a)("New File"),
          onClick: u[1] || (u[1] = (f) => o(e).modal.open(Yi, { items: o(s).getSelected() }))
        }, [
          P(o(Lo))
        ], 8, $d)) : U("", !0),
        o(e).features.includes(o(ue).RENAME) ? (_(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: o(a)("Rename"),
          onClick: u[2] || (u[2] = (f) => o(s).getCount() !== 1 || o(e).modal.open(ls, { items: o(s).getSelected() }))
        }, [
          P(o(Mo), {
            class: ce(o(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, kd)) : U("", !0),
        o(e).features.includes(o(ue).DELETE) ? (_(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: o(a)("Delete"),
          onClick: u[3] || (u[3] = (f) => !o(s).getCount() || o(e).modal.open(as, { items: o(s).getSelected() }))
        }, [
          P(o(To), {
            class: ce(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, xd)) : U("", !0),
        o(e).features.includes(o(ue).UPLOAD) ? (_(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: o(a)("Upload"),
          onClick: u[4] || (u[4] = (f) => o(e).modal.open(pc, { items: o(s).getSelected() }))
        }, [
          P(o(Oo))
        ], 8, Sd)) : U("", !0),
        o(e).features.includes(o(ue).UNARCHIVE) && o(s).getCount() === 1 && o(s).getSelected()[0].mime_type === "application/zip" ? (_(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: o(a)("Unarchive"),
          onClick: u[5] || (u[5] = (f) => !o(s).getCount() || o(e).modal.open(Ho, { items: o(s).getSelected() }))
        }, [
          P(o(Fo), {
            class: ce(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Cd)) : U("", !0),
        o(e).features.includes(o(ue).ARCHIVE) ? (_(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: o(a)("Archive"),
          onClick: u[6] || (u[6] = (f) => !o(s).getCount() || o(e).modal.open(Bo, { items: o(s).getSelected() }))
        }, [
          P(o(Ro), {
            class: ce(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ed)) : U("", !0)
      ])),
      r("div", Dd, [
        o(e).features.includes(o(ue).FULL_SCREEN) ? (_(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: o(a)("Toggle Full Screen")
        }, [
          o(e).fullScreen ? (_(), K(o(id), { key: 0 })) : (_(), K(o(sd), { key: 1 }))
        ], 8, Vd)) : U("", !0),
        r("div", {
          class: "mx-1.5",
          title: o(a)("Change View"),
          onClick: u[7] || (u[7] = (f) => c.value.length || d())
        }, [
          o(e).view === "grid" ? (_(), K(o(vd), {
            key: 0,
            class: ce(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : U("", !0),
          o(e).view === "list" ? (_(), K(o(gd), {
            key: 1,
            class: ce(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : U("", !0)
        ], 8, Ld)
      ])
    ]));
  }
}, Fd = (t, e = 0, n = !1) => {
  let a;
  return (...s) => {
    n && !a && t(...s), clearTimeout(a), a = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Ds = (t, e, n) => {
  const a = M(t);
  return er((s, c) => ({
    get() {
      return s(), a.value;
    },
    set: Fd(
      (i) => {
        a.value = i, c();
      },
      e,
      n
    )
  }));
}, Hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, Rd = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
}, null, -1), Bd = [
  Rd
];
function Id(t, e) {
  return _(), g("svg", Hd, [...Bd]);
}
const Nd = { render: Id }, Ud = { class: "vuefinder__move-modal__content" }, qd = { class: "vuefinder__move-modal__description" }, Pd = { class: "vuefinder__move-modal__files" }, zd = { class: "vuefinder__move-modal__file" }, jd = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gd = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Kd = [
  Gd
], Wd = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yd = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Xd = [
  Yd
], Jd = { class: "vuefinder__move-modal__file-name" }, Zd = { class: "vuefinder__move-modal__target-title" }, Qd = { class: "vuefinder__move-modal__target-directory" }, eu = /* @__PURE__ */ r("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ r("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), tu = { class: "vuefinder__move-modal__target-path" }, nu = { class: "vuefinder__move-modal__selected-items" }, zn = {
  __name: "ModalMove",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, a = M(e.modal.data.items.from), s = M(""), c = () => {
      a.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: a.value.map(({ path: i, type: d }) => ({ path: i, type: d })),
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
    return (i, d) => (_(), K(Ge, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Yes, Move!")), 1),
        r("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        r("div", nu, b(o(n)("%s item(s) selected.", a.value.length)), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          P(Ze, {
            icon: o(Nd),
            title: o(n)("Move files")
          }, null, 8, ["icon", "title"]),
          r("div", Ud, [
            r("p", qd, b(o(n)("Are you sure you want to move these files?")), 1),
            r("div", Pd, [
              (_(!0), g(he, null, ge(a.value, (l) => (_(), g("div", zd, [
                r("div", null, [
                  l.type === "dir" ? (_(), g("svg", jd, Kd)) : (_(), g("svg", Wd, Xd))
                ]),
                r("div", Jd, b(l.path), 1)
              ]))), 256))
            ]),
            r("h4", Zd, b(o(n)("Target Directory")), 1),
            r("p", Qd, [
              eu,
              r("span", tu, b(o(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (_(), K(Ke, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => s.value = ""),
              error: ""
            }, {
              default: Q(() => [
                J(b(s.value), 1)
              ]),
              _: 1
            })) : U("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, su = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, ou = /* @__PURE__ */ r("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), ru = [
  ou
];
function au(t, e) {
  return _(), g("svg", su, [...ru]);
}
const lu = { render: au }, iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, cu = /* @__PURE__ */ r("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), du = [
  cu
];
function uu(t, e) {
  return _(), g("svg", iu, [...du]);
}
const _u = { render: uu }, vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, fu = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), mu = [
  fu
];
function pu(t, e) {
  return _(), g("svg", vu, [...mu]);
}
const hu = { render: pu }, gu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, bu = /* @__PURE__ */ r("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), wu = [
  bu
];
function yu(t, e) {
  return _(), g("svg", gu, [...wu]);
}
const $u = { render: yu }, ku = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, xu = /* @__PURE__ */ r("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), Su = [
  xu
];
function Cu(t, e) {
  return _(), g("svg", ku, [...Su]);
}
const Eu = { render: Cu }, Au = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, Tu = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Mu = [
  Tu
];
function Du(t, e) {
  return _(), g("svg", Au, [...Mu]);
}
const Vu = { render: Du }, Lu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, Ou = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), Fu = [
  Ou
];
function Hu(t, e) {
  return _(), g("svg", Lu, [...Fu]);
}
const mn = { render: Hu }, Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
}, Bu = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Iu = /* @__PURE__ */ r("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1), Nu = [
  Bu,
  Iu
];
function Uu(t, e) {
  return _(), g("svg", Ru, [...Nu]);
}
const qu = { render: Uu }, Pu = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, zu = /* @__PURE__ */ r("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), ju = [
  zu
];
function Gu(t, e) {
  return _(), g("svg", Pu, [...ju]);
}
const Ku = { render: Gu }, Wu = { class: "vuefinder__breadcrumb__container" }, Yu = ["title"], Xu = ["title"], Ju = ["title"], Zu = ["title"], Qu = { class: "vuefinder__breadcrumb__list" }, e_ = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, t_ = /* @__PURE__ */ r("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1), n_ = { class: "relative" }, s_ = /* @__PURE__ */ r("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1), o_ = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], r_ = { class: "vuefinder__breadcrumb__search-mode" }, a_ = ["placeholder"], l_ = { class: "vuefinder__breadcrumb__hidden-dropdown" }, i_ = ["onDrop", "onClick"], c_ = { class: "vuefinder__breadcrumb__hidden-item-content" }, d_ = { class: "vuefinder__breadcrumb__hidden-item-text" }, u_ = {
  __name: "Breadcrumb",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, a = e.dragSelect, { setStore: s } = e.storage, c = M(null), i = Ds(0, 100);
    Oe(i, (E) => {
      const C = c.value.children;
      let T = 0, S = 0, x = 5, L = 1;
      e.fs.limitBreadcrumbItems(x), ct(() => {
        for (let B = C.length - 1; B >= 0 && !(T + C[B].offsetWidth > i.value - 40); B--)
          T += parseInt(C[B].offsetWidth, 10), S++;
        S < L && (S = L), S > x && (S = x), e.fs.limitBreadcrumbItems(S);
      });
    });
    const d = () => {
      i.value = c.value.offsetWidth;
    };
    $e(() => {
      new ResizeObserver(d).observe(c.value);
    });
    const l = (E, C = null) => {
      E.preventDefault(), a.isDraggingRef.value = !1, v(E), C ?? (C = e.fs.hiddenBreadcrumbs.length - 1);
      let T = JSON.parse(E.dataTransfer.getData("items"));
      if (T.find((S) => S.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(zn, {
        items: {
          from: T,
          to: e.fs.hiddenBreadcrumbs[C] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (E, C = null) => {
      E.preventDefault(), a.isDraggingRef.value = !1, v(E), C ?? (C = e.fs.breadcrumbs.length - 2);
      let T = JSON.parse(E.dataTransfer.getData("items"));
      if (T.find((S) => S.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(zn, {
        items: {
          from: T,
          to: e.fs.breadcrumbs[C] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, f = (E) => {
      E.preventDefault(), e.fs.isGoUpAvailable() ? (E.dataTransfer.dropEffect = "copy", E.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (E.dataTransfer.dropEffect = "none", E.dataTransfer.effectAllowed = "none");
    }, v = (E) => {
      E.preventDefault(), E.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && E.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, p = () => {
      V(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, m = () => {
      V(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, h = (E) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: E.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, $ = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, y = {
      mounted(E, C, T, S) {
        E.clickOutsideEvent = function(x) {
          E === x.target || E.contains(x.target) || C.value();
        }, document.body.addEventListener("click", E.clickOutsideEvent);
      },
      beforeUnmount(E, C, T, S) {
        document.body.removeEventListener("click", E.clickOutsideEvent);
      }
    }, D = () => {
      e.showTreeView = !e.showTreeView;
    };
    Oe(() => e.showTreeView, (E, C) => {
      E !== C && s("show-tree-view", E);
    });
    const O = M(null), R = () => {
      e.features.includes(ue.SEARCH) && (e.fs.searchMode = !0, ct(() => O.value.focus()));
    }, w = Ds("", 400);
    Oe(w, (E) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: E });
    }), Oe(() => e.fs.searchMode, (E) => {
      E && ct(() => O.value.focus());
    });
    const V = () => {
      e.fs.searchMode = !1, w.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      V();
    });
    const q = () => {
      w.value === "" && V();
    };
    return (E, C) => (_(), g("div", Wu, [
      r("span", {
        title: o(n)("Toggle Tree View")
      }, [
        P(o(qu), {
          onClick: D,
          class: ce(["vuefinder__breadcrumb__toggle-tree", o(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Yu),
      r("span", {
        title: o(n)("Go up a directory")
      }, [
        P(o(_u), {
          onDragover: C[0] || (C[0] = (T) => f(T)),
          onDragleave: C[1] || (C[1] = (T) => v(T)),
          onDrop: C[2] || (C[2] = (T) => u(T)),
          onClick: m,
          class: ce(o(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, Xu),
      o(e).fs.loading ? (_(), g("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        P(o(hu), {
          onClick: C[3] || (C[3] = (T) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Zu)) : (_(), g("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        P(o(lu), { onClick: p })
      ], 8, Ju)),
      _e(r("div", {
        onClick: nt(R, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        r("div", null, [
          P(o($u), {
            onDragover: C[4] || (C[4] = (T) => f(T)),
            onDragleave: C[5] || (C[5] = (T) => v(T)),
            onDrop: C[6] || (C[6] = (T) => u(T, -1)),
            onClick: C[7] || (C[7] = (T) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter } }))
          })
        ]),
        r("div", Qu, [
          o(e).fs.hiddenBreadcrumbs.length ? _e((_(), g("div", e_, [
            t_,
            r("div", n_, [
              r("span", {
                onDragenter: C[8] || (C[8] = (T) => o(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: C[9] || (C[9] = (T) => o(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                P(o(Ku), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [y, $]
          ]) : U("", !0)
        ]),
        r("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: nt(R, ["self"])
        }, [
          (_(!0), g(he, null, ge(o(e).fs.breadcrumbs, (T, S) => (_(), g("div", { key: S }, [
            s_,
            r("span", {
              onDragover: (x) => S === o(e).fs.breadcrumbs.length - 1 || f(x),
              onDragleave: (x) => S === o(e).fs.breadcrumbs.length - 1 || v(x),
              onDrop: (x) => S === o(e).fs.breadcrumbs.length - 1 || u(x, S),
              class: "vuefinder__breadcrumb__item",
              title: T.basename,
              onClick: (x) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter, path: T.path } })
            }, b(T.name), 41, o_)
          ]))), 128))
        ], 512),
        o(e).fs.loading ? (_(), K(o(is), { key: 0 })) : U("", !0)
      ], 512), [
        [Ie, !o(e).fs.searchMode]
      ]),
      _e(r("div", r_, [
        r("div", null, [
          P(o(Eu))
        ]),
        _e(r("input", {
          ref_key: "searchInput",
          ref: O,
          onKeydown: $t(V, ["esc"]),
          onBlur: q,
          "onUpdate:modelValue": C[10] || (C[10] = (T) => tr(w) ? w.value = T : null),
          placeholder: o(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, a_), [
          [kt, o(w)]
        ]),
        P(o(Vu), { onClick: V })
      ], 512), [
        [Ie, o(e).fs.searchMode]
      ]),
      _e(r("div", l_, [
        (_(!0), g(he, null, ge(o(e).fs.hiddenBreadcrumbs, (T, S) => (_(), g("div", {
          key: S,
          onDragover: C[11] || (C[11] = (x) => f(x)),
          onDragleave: C[12] || (C[12] = (x) => v(x)),
          onDrop: (x) => l(x, S),
          onClick: (x) => h(T),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          r("div", c_, [
            r("span", null, [
              P(o(mn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            J(),
            r("span", d_, b(T.name), 1)
          ])
        ], 40, i_))), 128))
      ], 512), [
        [Ie, o(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Io = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), __ = ["onClick"], v_ = {
  __name: "Toast",
  setup(t) {
    const e = ae("ServiceContainer"), { getStore: n } = e.storage, a = M(n("full-screen", !1)), s = M([]), c = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (l) => {
      s.value.splice(l, 1);
    }, d = (l) => {
      let u = s.value.findIndex((f) => f.id === l);
      u !== -1 && i(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = u, s.value.push(l), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (l, u) => (_(), g("div", {
      class: ce(["vuefinder__toast", a.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      P(nr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Q(() => [
          (_(!0), g(he, null, ge(s.value, (f, v) => (_(), g("div", {
            key: v,
            onClick: (p) => i(v),
            class: ce(["vuefinder__toast__message", c(f.type)])
          }, b(f.label), 11, __))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, f_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, m_ = /* @__PURE__ */ r("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), p_ = [
  m_
];
function h_(t, e) {
  return _(), g("svg", f_, [...p_]);
}
const g_ = { render: h_ }, b_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, w_ = /* @__PURE__ */ r("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), y_ = [
  w_
];
function $_(t, e) {
  return _(), g("svg", b_, [...y_]);
}
const k_ = { render: $_ }, Gt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (_(), g("div", null, [
      t.direction === "asc" ? (_(), K(o(g_), { key: 0 })) : U("", !0),
      t.direction === "desc" ? (_(), K(o(k_), { key: 1 })) : U("", !0)
    ]));
  }
}, x_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, S_ = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), C_ = [
  S_
];
function E_(t, e) {
  return _(), g("svg", x_, [...C_]);
}
const A_ = { render: E_ }, T_ = { class: "vuefinder__item-icon" }, Sn = {
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
    return (e, n) => (_(), g("span", T_, [
      t.type === "dir" ? (_(), K(o(mn), {
        key: 0,
        class: ce(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (_(), K(o(A_), {
        key: 1,
        class: ce(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, M_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, D_ = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), V_ = [
  D_
];
function L_(t, e) {
  return _(), g("svg", M_, [...V_]);
}
const O_ = { render: L_ }, F_ = { class: "vuefinder__drag-item__container" }, H_ = { class: "vuefinder__drag-item__count" }, R_ = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, a) => (_(), g("div", F_, [
      P(o(O_)),
      r("div", H_, b(e.count), 1)
    ]));
  }
}, B_ = { class: "vuefinder__text-preview" }, I_ = { class: "vuefinder__text-preview__header" }, N_ = ["title"], U_ = { class: "vuefinder__text-preview__actions" }, q_ = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, P_ = { key: 1 }, z_ = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, a = M(""), s = M(""), c = M(null), i = M(!1), d = M(""), l = M(!1), u = ae("ServiceContainer"), { t: f } = u.i18n;
    $e(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((m) => {
        a.value = m, n("success");
      });
    });
    const v = () => {
      i.value = !i.value, s.value = a.value;
    }, p = () => {
      d.value = "", l.value = !1, u.requester.send({
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
        d.value = f("Updated."), a.value = m, n("success"), i.value = !i.value;
      }).catch((m) => {
        d.value = f(m.message), l.value = !0;
      });
    };
    return (m, h) => (_(), g("div", B_, [
      r("div", I_, [
        r("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(u).modal.data.item.path
        }, b(o(u).modal.data.item.basename), 9, N_),
        r("div", U_, [
          i.value ? (_(), g("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, b(o(f)("Save")), 1)) : U("", !0),
          o(u).features.includes(o(ue).EDIT) ? (_(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = ($) => v())
          }, b(i.value ? o(f)("Cancel") : o(f)("Edit")), 1)) : U("", !0)
        ])
      ]),
      r("div", null, [
        i.value ? (_(), g("div", P_, [
          _e(r("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": h[1] || (h[1] = ($) => s.value = $),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [kt, s.value]
          ])
        ])) : (_(), g("pre", q_, b(a.value), 1)),
        d.value.length ? (_(), K(Ke, {
          key: 2,
          onHidden: h[2] || (h[2] = ($) => d.value = ""),
          error: l.value
        }, {
          default: Q(() => [
            J(b(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : U("", !0)
      ])
    ]));
  }
}, j_ = { class: "vuefinder__image-preview" }, G_ = { class: "vuefinder__image-preview__header" }, K_ = ["title"], W_ = { class: "vuefinder__image-preview__actions" }, Y_ = { class: "vuefinder__image-preview__image-container" }, X_ = ["src"], J_ = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, a = ae("ServiceContainer"), { t: s } = a.i18n, c = M(null), i = M(null), d = M(!1), l = M(""), u = M(!1), f = () => {
      d.value = !d.value, d.value ? i.value = new _r(c.value, {
        crop(p) {
        }
      }) : i.value.destroy();
    }, v = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          l.value = "", u.value = !1;
          const m = new FormData();
          m.set("file", p), a.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: a.modal.data.adapter,
              path: a.modal.data.item.path
            },
            body: m
          }).then((h) => {
            l.value = s("Updated."), c.value.src = a.requester.getPreviewUrl(a.modal.data.adapter, a.modal.data.item), f(), n("success");
          }).catch((h) => {
            l.value = s(h.message), u.value = !0;
          });
        }
      );
    };
    return $e(() => {
      n("success");
    }), (p, m) => (_(), g("div", j_, [
      r("div", G_, [
        r("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(a).modal.data.item.path
        }, b(o(a).modal.data.item.basename), 9, K_),
        r("div", W_, [
          d.value ? (_(), g("button", {
            key: 0,
            onClick: v,
            class: "vuefinder__image-preview__crop-button"
          }, b(o(s)("Crop")), 1)) : U("", !0),
          o(a).features.includes(o(ue).EDIT) ? (_(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: m[0] || (m[0] = (h) => f())
          }, b(d.value ? o(s)("Cancel") : o(s)("Edit")), 1)) : U("", !0)
        ])
      ]),
      r("div", Y_, [
        r("img", {
          ref_key: "image",
          ref: c,
          class: "vuefinder__image-preview__image",
          src: o(a).requester.getPreviewUrl(o(a).modal.data.adapter, o(a).modal.data.item),
          alt: ""
        }, null, 8, X_)
      ]),
      l.value.length ? (_(), K(Ke, {
        key: 0,
        onHidden: m[1] || (m[1] = (h) => l.value = ""),
        error: u.value
      }, {
        default: Q(() => [
          J(b(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : U("", !0)
    ]));
  }
}, Z_ = { class: "vuefinder__default-preview" }, Q_ = { class: "vuefinder__default-preview__header" }, ev = ["title"], tv = /* @__PURE__ */ r("div", null, null, -1), nv = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ae("ServiceContainer"), a = e;
    return $e(() => {
      a("success");
    }), (s, c) => (_(), g("div", Z_, [
      r("div", Q_, [
        r("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: o(n).modal.data.item.path
        }, b(o(n).modal.data.item.basename), 9, ev)
      ]),
      tv
    ]));
  }
}, sv = { class: "vuefinder__video-preview" }, ov = ["title"], rv = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, av = ["src"], lv = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ae("ServiceContainer"), a = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return $e(() => {
      a("success");
    }), (c, i) => (_(), g("div", sv, [
      r("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, ov),
      r("div", null, [
        r("video", rv, [
          r("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, av),
          J(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, iv = { class: "vuefinder__audio-preview" }, cv = ["title"], dv = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, uv = ["src"], _v = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, a = ae("ServiceContainer"), s = () => a.requester.getPreviewUrl(a.modal.data.adapter, a.modal.data.item);
    return $e(() => {
      n("success");
    }), (c, i) => (_(), g("div", iv, [
      r("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(a).modal.data.item.path
      }, b(o(a).modal.data.item.basename), 9, cv),
      r("div", null, [
        r("audio", dv, [
          r("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, uv),
          J(" Your browser does not support the audio element. ")
        ])
      ])
    ]));
  }
}, vv = { class: "vuefinder__pdf-preview" }, fv = ["title"], mv = ["data"], pv = ["src"], hv = /* @__PURE__ */ r("p", null, [
  /* @__PURE__ */ J(" Your browser does not support PDFs. "),
  /* @__PURE__ */ r("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ J(". ")
], -1), gv = [
  hv
], bv = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ae("ServiceContainer"), a = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return $e(() => {
      a("success");
    }), (c, i) => (_(), g("div", vv, [
      r("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, fv),
      r("div", null, [
        r("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          r("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, gv, 8, pv)
        ], 8, mv)
      ])
    ]));
  }
}, wv = { class: "vuefinder__preview-modal__content" }, yv = { key: 0 }, $v = { class: "vuefinder__preview-modal__loading" }, kv = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, xv = /* @__PURE__ */ r("svg", {
  class: "vuefinder__preview-modal__spinner",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ r("circle", {
    class: "vuefinder__preview-modal__spinner-circle",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ r("path", {
    class: "vuefinder__preview-modal__spinner-path",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), Sv = { class: "vuefinder__preview-modal__details" }, Cv = { class: "font-bold" }, Ev = { class: "font-bold pl-2" }, Av = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Tv = ["download", "href"], No = {
  __name: "ModalPreview",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, a = M(!1), s = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(ue.PREVIEW);
    return c || (a.value = !0), (i, d) => (_(), K(Ge, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(ue).DOWNLOAD) ? (_(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, b(o(n)("Download")), 9, Tv)) : U("", !0)
      ]),
      default: Q(() => [
        r("div", null, [
          r("div", wv, [
            o(c) ? (_(), g("div", yv, [
              s("text") ? (_(), K(z_, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => a.value = !0)
              })) : s("image") ? (_(), K(J_, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => a.value = !0)
              })) : s("video") ? (_(), K(lv, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => a.value = !0)
              })) : s("audio") ? (_(), K(_v, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => a.value = !0)
              })) : s("application/pdf") ? (_(), K(bv, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => a.value = !0)
              })) : (_(), K(nv, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => a.value = !0)
              }))
            ])) : U("", !0),
            r("div", $v, [
              a.value === !1 ? (_(), g("div", kv, [
                xv,
                r("span", null, b(o(n)("Loading")), 1)
              ])) : U("", !0)
            ])
          ])
        ]),
        r("div", Sv, [
          r("div", null, [
            r("span", Cv, b(o(n)("File Size")) + ": ", 1),
            J(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          r("div", null, [
            r("span", Ev, b(o(n)("Last Modified")) + ": ", 1),
            J(" " + b(o(Io)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(ue).DOWNLOAD) ? (_(), g("div", Av, [
          r("span", null, b(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : U("", !0)
      ]),
      _: 1
    }));
  }
}, Mv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Dv = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Vv = /* @__PURE__ */ r("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1), Lv = [
  Dv,
  Vv
];
function Ov(t, e) {
  return _(), g("svg", Mv, [...Lv]);
}
const Uo = { render: Ov }, Fv = ["data-type", "data-item", "data-index"], Cn = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = ae("ServiceContainer"), n = e.dragSelect, a = t, s = (m) => {
      m.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: m.path } })) : e.modal.open(No, { adapter: e.fs.adapter, item: m });
    }, c = {
      mounted(m, h, $, y) {
        $.props.draggable && (m.addEventListener("dragstart", (D) => i(D, h.value)), m.addEventListener("dragover", (D) => l(D, h.value)), m.addEventListener("drop", (D) => d(D, h.value)));
      },
      beforeUnmount(m, h, $, y) {
        $.props.draggable && (m.removeEventListener("dragstart", i), m.removeEventListener("dragover", l), m.removeEventListener("drop", d));
      }
    }, i = (m, h) => {
      if (m.altKey || m.ctrlKey || m.metaKey)
        return m.preventDefault(), !1;
      n.isDraggingRef.value = !0, m.dataTransfer.setDragImage(a.dragImage.$el, 0, 15), m.dataTransfer.effectAllowed = "all", m.dataTransfer.dropEffect = "copy", m.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (m, h) => {
      m.preventDefault(), n.isDraggingRef.value = !1;
      let $ = JSON.parse(m.dataTransfer.getData("items"));
      if ($.find((y) => y.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(zn, { items: { from: $, to: h } });
    }, l = (m, h) => {
      m.preventDefault(), !h || h.type !== "dir" || n.getSelection().find(($) => $ === m.currentTarget) ? (m.dataTransfer.dropEffect = "none", m.dataTransfer.effectAllowed = "none") : m.dataTransfer.dropEffect = "copy";
    };
    let u = null, f = !1;
    const v = () => {
      u && clearTimeout(u);
    }, p = (m) => {
      if (!f)
        f = !0, setTimeout(() => f = !1, 300);
      else
        return f = !1, s(a.item), clearTimeout(u), !1;
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
    return (m, h) => _e((_(), g("div", {
      style: rn({ opacity: o(n).isDraggingRef.value && o(n).getSelection().find(($) => m.$el === $) ? "0.5 !important" : "" }),
      class: ce(["vuefinder__item", "vf-item-" + o(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: h[0] || (h[0] = ($) => s(t.item)),
      onTouchstart: h[1] || (h[1] = ($) => p($)),
      onTouchend: h[2] || (h[2] = ($) => v()),
      onContextmenu: h[3] || (h[3] = nt(($) => o(e).emitter.emit("vf-contextmenu-show", { event: $, items: o(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Tt(m.$slots, "default"),
      o(e).pinnedFolders.find(($) => $.path === t.item.path) ? (_(), K(o(Uo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : U("", !0)
    ], 46, Fv)), [
      [c, t.item]
    ]);
  }
}, Hv = { class: "vuefinder__explorer__container" }, Rv = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Bv = { class: "vuefinder__explorer__drag-item" }, Iv = { class: "vuefinder__explorer__item-list-content" }, Nv = { class: "vuefinder__explorer__item-list-name" }, Uv = { class: "vuefinder__explorer__item-name" }, qv = { class: "vuefinder__explorer__item-path" }, Pv = { class: "vuefinder__explorer__item-list-content" }, zv = { class: "vuefinder__explorer__item-list-name" }, jv = { class: "vuefinder__explorer__item-name" }, Gv = { class: "vuefinder__explorer__item-size" }, Kv = { class: "vuefinder__explorer__item-date" }, Wv = { class: "vuefinder__explorer__item-grid-content" }, Yv = ["data-src", "alt"], Xv = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, Jv = { class: "vuefinder__explorer__item-title break-all" }, Zv = {
  __name: "Explorer",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, a = (v) => v == null ? void 0 : v.substring(0, 3), s = M(null), c = M(""), i = e.dragSelect;
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
    const l = yt({ active: !1, column: "", order: "" }), u = (v = !0) => {
      let p = [...e.fs.data.files], m = l.column, h = l.order === "asc" ? 1 : -1;
      if (!v)
        return p;
      const $ = (y, D) => typeof y == "string" && typeof D == "string" ? y.toLowerCase().localeCompare(D.toLowerCase()) : y < D ? -1 : y > D ? 1 : 0;
      return l.active && (p = p.slice().sort((y, D) => $(y[m], D[m]) * h)), p;
    }, f = (v) => {
      l.active && l.column === v ? (l.active = l.order === "asc", l.column = v, l.order = "desc") : (l.active = !0, l.column = v, l.order = "asc");
    };
    return $e(() => {
      d = new ur(i.area.value);
    }), Ls(() => {
      d.update();
    }), Fs(() => {
      d.destroy();
    }), (v, p) => (_(), g("div", Hv, [
      o(e).view === "list" || c.value.length ? (_(), g("div", Rv, [
        r("div", {
          onClick: p[0] || (p[0] = (m) => f("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          J(b(o(n)("Name")) + " ", 1),
          _e(P(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ie, l.active && l.column === "basename"]
          ])
        ]),
        c.value.length ? U("", !0) : (_(), g("div", {
          key: 0,
          onClick: p[1] || (p[1] = (m) => f("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          J(b(o(n)("Size")) + " ", 1),
          _e(P(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ie, l.active && l.column === "file_size"]
          ])
        ])),
        c.value.length ? U("", !0) : (_(), g("div", {
          key: 1,
          onClick: p[2] || (p[2] = (m) => f("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          J(b(o(n)("Date")) + " ", 1),
          _e(P(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ie, l.active && l.column === "last_modified"]
          ])
        ])),
        c.value.length ? (_(), g("div", {
          key: 2,
          onClick: p[3] || (p[3] = (m) => f("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          J(b(o(n)("Filepath")) + " ", 1),
          _e(P(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ie, l.active && l.column === "path"]
          ])
        ])) : U("", !0)
      ])) : U("", !0),
      r("div", Bv, [
        P(R_, {
          ref_key: "dragImage",
          ref: s,
          count: o(i).getCount()
        }, null, 8, ["count"])
      ]),
      r("div", {
        ref: o(i).scrollBarContainer,
        class: ce(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": o(e).view === "grid" }, { "search-active": c.value.length }]])
      }, [
        r("div", {
          ref: o(i).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      r("div", {
        ref: o(i).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area",
        onContextmenu: p[4] || (p[4] = nt((m) => o(e).emitter.emit("vf-contextmenu-show", { event: m, items: o(i).getSelected() }), ["self", "prevent"]))
      }, [
        c.value.length ? (_(!0), g(he, { key: 0 }, ge(u(), (m, h) => (_(), K(Cn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: Q(() => [
            r("div", Iv, [
              r("div", Nv, [
                P(Sn, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", Uv, b(m.basename), 1)
              ]),
              r("div", qv, b(m.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : U("", !0),
        o(e).view === "list" && !c.value.length ? (_(!0), g(he, { key: 1 }, ge(u(), (m, h) => (_(), K(Cn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: m.path
        }, {
          default: Q(() => [
            r("div", Pv, [
              r("div", zv, [
                P(Sn, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", jv, b(m.basename), 1)
              ]),
              r("div", Gv, b(m.file_size ? o(e).filesize(m.file_size) : ""), 1),
              r("div", Kv, b(o(Io)(m.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : U("", !0),
        o(e).view === "grid" && !c.value.length ? (_(!0), g(he, { key: 2 }, ge(u(!1), (m, h) => (_(), K(Cn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: Q(() => [
            r("div", null, [
              r("div", Wv, [
                (m.mime_type ?? "").startsWith("image") && o(e).showThumbnails ? (_(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": o(e).requester.getPreviewUrl(o(e).fs.adapter, m),
                  alt: m.basename,
                  key: m.path
                }, null, 8, Yv)) : (_(), K(Sn, {
                  key: 1,
                  type: m.type
                }, null, 8, ["type"])),
                !((m.mime_type ?? "").startsWith("image") && o(e).showThumbnails) && m.type !== "dir" ? (_(), g("div", Xv, b(a(m.extension)), 1)) : U("", !0)
              ]),
              r("span", Jv, b(o(Pn)(m.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : U("", !0)
      ], 544),
      P(v_)
    ]));
  }
}, Qv = ["href", "download"], ef = ["onClick"], tf = {
  __name: "ContextMenu",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, a = M(null), s = M([]), c = M(""), i = yt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = ot(() => i.items.filter((v) => v.key == null || e.features.includes(v.key)));
    e.emitter.on("vf-context-selected", (v) => {
      s.value = v;
    });
    const l = {
      newfolder: {
        key: ue.NEW_FOLDER,
        title: () => n("New Folder"),
        action: () => e.modal.open(Vo)
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
        key: ue.DELETE,
        title: () => n("Delete"),
        action: () => {
          e.modal.open(as, { items: s });
        }
      },
      refresh: {
        title: () => n("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
        }
      },
      preview: {
        key: ue.PREVIEW,
        title: () => n("Preview"),
        action: () => e.modal.open(No, { adapter: e.fs.adapter, item: s.value[0] })
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
        key: ue.DOWNLOAD,
        link: ot(() => e.requester.getDownloadUrl(e.fs.adapter, s.value[0])),
        title: () => n("Download"),
        action: () => {
        }
      },
      archive: {
        key: ue.ARCHIVE,
        title: () => n("Archive"),
        action: () => e.modal.open(Bo, { items: s })
      },
      unarchive: {
        key: ue.UNARCHIVE,
        title: () => n("Unarchive"),
        action: () => e.modal.open(Ho, { items: s })
      },
      rename: {
        key: ue.RENAME,
        title: () => n("Rename"),
        action: () => e.modal.open(ls, { items: s })
      }
    }, u = (v) => {
      e.emitter.emit("vf-contextmenu-hide"), v.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      c.value = v;
    }), e.emitter.on("vf-contextmenu-show", ({ event: v, items: p, target: m = null }) => {
      if (i.items = [], c.value)
        if (m)
          i.items.push(l.openDir), e.emitter.emit("vf-context-selected", [m]);
        else
          return;
      else !m && !c.value ? (i.items.push(l.refresh), i.items.push(l.selectAll), i.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : p.length > 1 && p.some((h) => h.path === m.path) ? (i.items.push(l.refresh), i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", p)) : (m.type === "dir" ? (i.items.push(l.open), e.pinnedFolders.findIndex((h) => h.path === m.path) !== -1 ? i.items.push(l.unpinFolder) : i.items.push(l.pinFolder)) : (i.items.push(l.preview), i.items.push(l.download)), i.items.push(l.rename), m.mime_type === "application/zip" ? i.items.push(l.unarchive) : i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", [m]));
      f(v);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const f = (v) => {
      const p = e.dragSelect.area.value, m = e.root.getBoundingClientRect(), h = p.getBoundingClientRect();
      let $ = v.clientX - m.left, y = v.clientY - m.top;
      i.active = !0, ct(() => {
        var w;
        const D = (w = a.value) == null ? void 0 : w.getBoundingClientRect();
        let O = (D == null ? void 0 : D.height) ?? 0, R = (D == null ? void 0 : D.width) ?? 0;
        $ = h.right - v.pageX + window.scrollX < R ? $ - R : $, y = h.bottom - v.pageY + window.scrollY < O ? y - O : y, i.positions = {
          left: $ + "px",
          top: y + "px"
        };
      });
    };
    return (v, p) => _e((_(), g("ul", {
      ref_key: "contextmenu",
      ref: a,
      style: rn(i.positions),
      class: "vuefinder__context-menu"
    }, [
      (_(!0), g(he, null, ge(d.value, (m) => (_(), g("li", {
        class: "vuefinder__context-menu__item",
        key: m.title
      }, [
        m.link ? (_(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: m.link,
          download: m.link,
          onClick: p[0] || (p[0] = (h) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          r("span", null, b(m.title()), 1)
        ], 8, Qv)) : (_(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => u(m)
        }, [
          r("span", null, b(m.title()), 1)
        ], 8, ef))
      ]))), 128))
    ], 4)), [
      [Ie, i.active]
    ]);
  }
}, nf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, sf = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), of = [
  sf
];
function rf(t, e) {
  return _(), g("svg", nf, [...of]);
}
const qo = { render: rf }, af = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, lf = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), cf = [
  lf
];
function df(t, e) {
  return _(), g("svg", af, [...cf]);
}
const uf = { render: df }, _f = { class: "vuefinder__status-bar__wrapper" }, vf = { class: "vuefinder__status-bar__storage" }, ff = ["title"], mf = { class: "vuefinder__status-bar__storage-icon" }, pf = ["value"], hf = { class: "vuefinder__status-bar__info" }, gf = { key: 0 }, bf = { class: "vuefinder__status-bar__selected-count" }, wf = { class: "vuefinder__status-bar__actions" }, yf = ["disabled"], $f = ["title"], kf = {
  __name: "Statusbar",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, { setStore: a } = e.storage, s = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), a("adapter", e.fs.adapter);
    }, i = M("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = ot(() => {
      const l = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, u) => (_(), g("div", _f, [
      r("div", vf, [
        r("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          r("div", mf, [
            P(o(qo))
          ]),
          _e(r("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (f) => o(e).fs.adapter = f),
            onChange: c,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (_(!0), g(he, null, ge(o(e).fs.data.storages, (f) => (_(), g("option", { value: f }, b(f), 9, pf))), 256))
          ], 544), [
            [En, o(e).fs.adapter]
          ])
        ], 8, ff),
        r("div", hf, [
          i.value.length ? (_(), g("span", gf, b(o(e).fs.data.files.length) + " items found. ", 1)) : U("", !0),
          r("span", bf, b(o(e).dragSelect.getCount() > 0 ? o(n)("%s item(s) selected.", o(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      r("div", wf, [
        o(e).selectButton.active ? (_(), g("button", {
          key: 0,
          class: ce(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (f) => o(e).selectButton.click(o(s).getSelected(), f))
        }, b(o(n)("Select")), 11, yf)) : U("", !0),
        r("span", {
          class: "vuefinder__status-bar__about",
          title: o(n)("About"),
          onClick: u[2] || (u[2] = (f) => o(e).modal.open(Ao))
        }, [
          P(o(uf))
        ], 8, $f)
      ])
    ]));
  }
}, xf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
}, Sf = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
}, null, -1), Cf = [
  Sf
];
function Ef(t, e) {
  return _(), g("svg", xf, [...Cf]);
}
const Po = { render: Ef }, Af = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Tf = /* @__PURE__ */ r("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Mf = /* @__PURE__ */ r("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1), Df = [
  Tf,
  Mf
];
function Vf(t, e) {
  return _(), g("svg", Af, [...Df]);
}
const Lf = { render: Vf }, Of = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Ff = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Hf = /* @__PURE__ */ r("path", { d: "M15 12H9M12 9v6" }, null, -1), Rf = [
  Ff,
  Hf
];
function Bf(t, e) {
  return _(), g("svg", Of, [...Rf]);
}
const zo = { render: Bf }, If = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Nf = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Uf = /* @__PURE__ */ r("path", { d: "M9 12h6" }, null, -1), qf = [
  Nf,
  Uf
];
function Pf(t, e) {
  return _(), g("svg", If, [...qf]);
}
const jo = { render: Pf };
function Go(t, e) {
  const n = t.findIndex((a) => a.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const zf = { class: "vuefinder__folder-loader-indicator" }, jf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Ko = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ sr({
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
    const e = t, n = ae("ServiceContainer");
    n.i18n;
    const a = Hs(t, "modelValue"), s = M(!1);
    Oe(
      () => a.value,
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
        Go(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, l) => {
      var u;
      return _(), g("div", zf, [
        s.value ? (_(), K(o(is), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (_(), g("div", jf, [
          a.value && ((u = c()) != null && u.folders.length) ? (_(), K(o(jo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : U("", !0),
          a.value ? U("", !0) : (_(), K(o(zo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Gf = { class: "vuefinder__treesubfolderlist__item-content" }, Kf = ["onClick"], Wf = ["title", "onClick"], Yf = { class: "vuefinder__treesubfolderlist__item-icon" }, Xf = { class: "vuefinder__treesubfolderlist__subfolder" }, Jf = {
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
    const e = ae("ServiceContainer"), n = M([]), a = t, s = M(null);
    $e(() => {
      a.path === a.adapter + "://" && ze(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = ot(() => {
      var i;
      return ((i = e.treeViewData.find((d) => d.path === a.path)) == null ? void 0 : i.folders) || [];
    });
    return (i, d) => {
      const l = or("TreeSubfolderList", !0);
      return _(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (_(!0), g(he, null, ge(c.value, (u, f) => (_(), g("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          r("div", Gf, [
            r("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (v) => n.value[u.path] = !n.value[u.path]
            }, [
              P(Ko, {
                adapter: t.adapter,
                path: u.path,
                modelValue: n.value[u.path],
                "onUpdate:modelValue": (v) => n.value[u.path] = v
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Kf),
            r("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (v) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a.adapter, path: u.path } })
            }, [
              r("div", Yf, [
                o(e).fs.path === u.path ? (_(), K(o(Po), { key: 0 })) : (_(), K(o(mn), { key: 1 }))
              ]),
              r("div", {
                class: ce(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(e).fs.path === u.path
                }])
              }, b(u.basename), 3)
            ], 8, Wf)
          ]),
          r("div", Xf, [
            _e(P(l, {
              adapter: a.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [Ie, n.value[u.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, Zf = { class: "vuefinder__treestorageitem__loader" }, Qf = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = ae("ServiceContainer"), n = M(!1);
    return (a, s) => (_(), g(he, null, [
      r("div", {
        onClick: s[1] || (s[1] = (c) => n.value = !n.value),
        class: "vuefinder__treestorageitem__header"
      }, [
        r("div", {
          class: ce(["vuefinder__treestorageitem__info", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          r("div", {
            class: ce(["vuefinder__treestorageitem__icon", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            P(o(qo))
          ], 2),
          r("div", null, b(t.storage), 1)
        ], 2),
        r("div", Zf, [
          P(Ko, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: n.value,
            "onUpdate:modelValue": s[0] || (s[0] = (c) => n.value = c)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      _e(P(Jf, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [Ie, n.value]
      ])
    ], 64));
  }
}, em = { class: "vuefinder__folder-indicator" }, tm = { class: "vuefinder__folder-indicator--icon" }, nm = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Hs(t, "modelValue");
    return (n, a) => (_(), g("div", em, [
      r("div", tm, [
        e.value ? (_(), K(o(jo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : U("", !0),
        e.value ? U("", !0) : (_(), K(o(zo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, sm = { class: "vuefinder__treeview__header" }, om = { class: "vuefinder__treeview__pinned-label" }, rm = { class: "vuefinder__treeview__pin-text text-nowrap" }, am = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, lm = { class: "vuefinder__treeview__pinned-item" }, im = ["onClick"], cm = ["title"], dm = ["onClick"], um = { key: 0 }, _m = { class: "vuefinder__treeview__no-pinned" }, vm = { class: "vuefinder__treeview__storage" }, fm = {
  __name: "TreeView",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, { getStore: a, setStore: s } = e.storage, c = M(190), i = M(a("pinned-folders-opened", !0));
    Oe(i, (f) => s("pinned-folders-opened", f));
    const d = (f) => {
      e.pinnedFolders = e.pinnedFolders.filter((v) => v.path !== f.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, l = (f) => {
      const v = f.clientX, p = f.target.parentElement, m = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const h = (y) => {
        c.value = m + y.clientX - v, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, $ = () => {
        const y = p.getBoundingClientRect();
        c.value = y.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", $);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", $);
    }, u = M(null);
    return $e(() => {
      ze(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Oe(e.fs.data, (f, v) => {
      const p = f.files.filter((m) => m.type === "dir");
      Go(e.treeViewData, { path: e.fs.path, folders: p.map((m) => ({
        adapter: m.storage,
        path: m.path,
        basename: m.basename
      })) });
    }), (f, v) => (_(), g(he, null, [
      r("div", {
        onClick: v[0] || (v[0] = (p) => o(e).showTreeView = !o(e).showTreeView),
        class: ce(["vuefinder__treeview__overlay", o(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      r("div", {
        style: rn(o(e).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        r("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          r("div", sm, [
            r("div", {
              onClick: v[2] || (v[2] = (p) => i.value = !i.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              r("div", om, [
                P(o(Uo), { class: "vuefinder__treeview__pin-icon" }),
                r("div", rm, b(o(n)("Pinned Folders")), 1)
              ]),
              P(nm, {
                modelValue: i.value,
                "onUpdate:modelValue": v[1] || (v[1] = (p) => i.value = p)
              }, null, 8, ["modelValue"])
            ]),
            i.value ? (_(), g("ul", am, [
              (_(!0), g(he, null, ge(o(e).pinnedFolders, (p) => (_(), g("li", lm, [
                r("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (m) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: p.storage, path: p.path } })
                }, [
                  o(e).fs.path !== p.path ? (_(), K(o(mn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : U("", !0),
                  o(e).fs.path === p.path ? (_(), K(o(Po), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : U("", !0),
                  r("div", {
                    title: p.path,
                    class: ce(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": o(e).fs.path === p.path
                    }])
                  }, b(p.basename), 11, cm)
                ], 8, im),
                r("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (m) => d(p)
                }, [
                  P(o(Lf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, dm)
              ]))), 256)),
              o(e).pinnedFolders.length ? U("", !0) : (_(), g("li", um, [
                r("div", _m, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : U("", !0)
          ]),
          (_(!0), g(he, null, ge(o(e).fs.data.storages, (p) => (_(), g("div", vm, [
            P(Qf, { storage: p }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        r("div", {
          onMousedown: l,
          class: ce([(o(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, mm = { class: "vuefinder__main__content" }, pm = {
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
    }
  },
  emits: ["select"],
  setup(t, { emit: e }) {
    const n = e, s = Ea(t, ae("VueFinderOptions"));
    rr("ServiceContainer", s);
    const { setStore: c } = s.storage, i = M(null);
    s.root = i;
    const d = s.dragSelect;
    Vi(s);
    const l = (f) => {
      Object.assign(s.fs.data, f), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return s.emitter.on("vf-fetch-abort", () => {
      u.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: f, body: v = null, onSuccess: p = null, onError: m = null, noCloseModal: h = !1 }) => {
      ["index", "search"].includes(f.q) && (u && u.abort(), s.fs.loading = !0), u = new AbortController();
      const $ = u.signal;
      s.requester.send({
        url: "",
        method: f.m || "get",
        params: f,
        body: v,
        abortSignal: $
      }).then((y) => {
        s.fs.adapter = y.adapter, s.persist && (s.fs.path = y.dirname, c("path", s.fs.path)), ["index", "search"].includes(f.q) && (s.fs.loading = !1), h || s.modal.close(), l(y), p && p(y);
      }).catch((y) => {
        console.error(y), m && m(y);
      });
    }), $e(() => {
      let f = {};
      s.fs.path.includes("://") && (f = {
        adapter: s.fs.path.split("://")[0],
        path: s.fs.path
      }), s.emitter.emit("vf-fetch", { params: { q: "index", adapter: s.fs.adapter, ...f } }), d.onSelect((v) => {
        n("select", v);
      });
    }), (f, v) => (_(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i,
      tabindex: "0"
    }, [
      r("div", {
        class: ce(o(s).theme.actualValue)
      }, [
        r("div", {
          class: ce([o(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: rn(o(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: v[0] || (v[0] = (p) => o(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: v[1] || (v[1] = (p) => o(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          P(Od),
          P(u_),
          r("div", mm, [
            P(fm),
            P(Zv)
          ]),
          P(kf)
        ], 38),
        P(ar, { name: "fade" }, {
          default: Q(() => [
            o(s).modal.visible ? (_(), K(Os(o(s).modal.type), { key: 0 })) : U("", !0)
          ]),
          _: 1
        }),
        P(tf)
      ], 2)
    ], 512));
  }
}, Cm = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", pm);
  }
};
export {
  Cm as default
};
