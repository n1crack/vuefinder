var Qn = Object.defineProperty;
var Zn = (t, e, s) => e in t ? Qn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var Ao = (t, e, s) => (Zn(t, typeof e != "symbol" ? e + "" : e, s), s);
import { reactive as Pt, watch as pt, ref as H, shallowRef as er, onMounted as Ce, onUnmounted as so, onUpdated as tn, nextTick as vt, computed as tt, inject as le, openBlock as p, createElementBlock as _, withKeys as At, unref as a, createElementVNode as n, withModifiers as lt, renderSlot as It, normalizeClass as fe, toDisplayString as b, createBlock as J, withCtx as se, Fragment as he, renderList as $e, createCommentVNode as z, withDirectives as ve, vModelCheckbox as Qt, createTextVNode as ee, createVNode as W, vModelSelect as Rs, isRef as sn, vModelText as Mt, onBeforeUnmount as on, customRef as tr, vShow as ze, TransitionGroup as sr, normalizeStyle as fs, mergeModels as or, useModel as nr, resolveComponent as rr, provide as ar, Transition as lr, resolveDynamicComponent as ir } from "vue";
import cr from "mitt";
import dr from "dragselect";
import ur from "@uppy/core";
import mr from "@uppy/xhr-upload";
import fr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import hr from "cropperjs";
import "microtip/microtip.css";
var en;
const Ms = (en = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : en.getAttribute("content");
class pr {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    Ao(this, "config");
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
    const s = this.config, r = {};
    Ms != null && Ms !== "" && (r[s.xsrfHeaderName] = Ms);
    const o = Object.assign({}, s.headers, r, e.headers), c = Object.assign({}, s.params, e.params), i = e.body, d = s.baseUrl + e.url, l = e.method;
    let u;
    l !== "get" && (i instanceof FormData ? (u = i, s.body != null && Object.entries(this.config.body).forEach(([f, v]) => {
      u.append(f, v);
    })) : (u = { ...i }, s.body != null && Object.assign(u, this.config.body)));
    const h = {
      url: d,
      method: l,
      headers: o,
      params: c,
      body: u
    };
    if (s.transformRequest != null) {
      const f = s.transformRequest({
        url: d,
        method: l,
        headers: o,
        params: c,
        body: u
      });
      f.url != null && (h.url = f.url), f.method != null && (h.method = f.method), f.params != null && (h.params = f.params ?? {}), f.headers != null && (h.headers = f.headers ?? {}), f.body != null && (h.body = f.body);
    }
    return h;
  }
  /**
   * Get download url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getDownloadUrl(e, s) {
    if (s.url != null)
      return s.url;
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: s.path }
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
  getPreviewUrl(e, s) {
    if (s.url != null)
      return s.url;
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: s.path }
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
    const s = this.transformRequestParams(e), r = e.responseType || "json", o = {
      method: e.method,
      headers: s.headers,
      signal: e.abortSignal
    }, c = s.url + "?" + new URLSearchParams(s.params);
    if (s.method !== "get" && s.body != null) {
      let d;
      s.body instanceof FormData ? d = e.body : (d = JSON.stringify(s.body), o.headers["Content-Type"] = "application/json"), o.body = d;
    }
    const i = await fetch(c, o);
    if (i.ok)
      return await i[r]();
    throw await i.json();
  }
}
function vr(t) {
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
  const s = Pt(JSON.parse(e ?? "{}"));
  pt(s, r);
  function r() {
    Object.keys(s).length ? localStorage.setItem(t + "_storage", JSON.stringify(s)) : localStorage.removeItem(t + "_storage");
  }
  function o(l, u) {
    s[l] = u;
  }
  function c(l) {
    delete s[l];
  }
  function i() {
    Object.keys(s).map((l) => c(l));
  }
  return { getStore: (l, u = null) => s.hasOwnProperty(l) ? s[l] : u, setStore: o, removeStore: c, clearStore: i };
}
async function _r(t, e) {
  const s = e[t];
  return typeof s == "function" ? (await s()).default : s;
}
function br(t, e, s, r) {
  const { getStore: o, setStore: c } = t, i = H({}), d = H(o("locale", e)), l = (f, v = e) => {
    _r(f, r).then((m) => {
      i.value = m, c("locale", f), d.value = f, c("translations", m), Object.values(r).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + f }), s.emit("vf-language-saved"));
    }).catch((m) => {
      v ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(v, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  !o("locale") && !r.length ? l(e) : i.value = o("translations");
  const u = (f, ...v) => v.length ? u(f = f.replace("%s", v.shift()), ...v) : f;
  function h(f, ...v) {
    return i.value && i.value.hasOwnProperty(f) ? u(i.value[f], ...v) : u(f, ...v);
  }
  return { t: h, changeLocale: l, locale: d };
}
const pe = {
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
}, xr = Object.values(pe), yr = "2.5.0";
function nn(t, e, s, r, o) {
  return (e = Math, s = e.log, r = 1024, o = s(t) / s(r) | 0, t / e.pow(r, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "iB" : "B");
}
function rn(t, e, s, r, o) {
  return (e = Math, s = e.log, r = 1e3, o = s(t) / s(r) | 0, t / e.pow(r, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "B" : "B");
}
function wr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const nt = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function kr(t, e) {
  const s = H(nt.SYSTEM), r = H(nt.LIGHT);
  s.value = t.getStore("theme", e ?? nt.SYSTEM);
  const o = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    s.value === nt.DARK || s.value === nt.SYSTEM && i.matches ? r.value = nt.DARK : r.value = nt.LIGHT;
  };
  return c(o), o.addEventListener("change", c), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: s,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: r,
    /**
     * @param {Theme} value
     */
    set(i) {
      s.value = i, i !== nt.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(o);
    }
  };
}
function $r() {
  const t = er(null), e = H(!1), s = H();
  return { visible: e, type: t, data: s, open: (c, i = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = c, s.value = i;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  } };
}
/*!
 * OverlayScrollbars
 * Version: 2.8.3
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const Oe = (t, e) => {
  const { o: s, i: r, u: o } = t;
  let c = s, i;
  const d = (h, f) => {
    const v = c, m = h, g = f || (r ? !r(v, m) : v !== m);
    return (g || o) && (c = m, i = v), [c, g, i];
  };
  return [e ? (h) => d(e(c, i), h) : d, (h) => [c, !!h, i]];
}, an = typeof window < "u" && typeof document < "u", De = an ? window : {}, as = Math.max, Sr = Math.min, Bs = Math.round, ls = Math.abs, Mo = Math.sign, hs = De.cancelAnimationFrame, Ct = De.requestAnimationFrame, Nt = De.setTimeout, Fs = De.clearTimeout, ps = (t) => typeof De[t] < "u" ? De[t] : void 0, Cr = ps("MutationObserver"), To = ps("IntersectionObserver"), is = ps("ResizeObserver"), Is = ps("ScrollTimeline"), ln = an && Node.ELEMENT_NODE, { toString: Nf, hasOwnProperty: Ts } = Object.prototype, vs = (t) => t === void 0, oo = (t) => t === null, je = (t) => typeof t == "number", gs = (t) => typeof t == "string", cn = (t) => typeof t == "boolean", Re = (t) => typeof t == "function", Ge = (t) => Array.isArray(t), Ut = (t) => typeof t == "object" && !Ge(t) && !oo(t), _s = (t) => {
  const e = !!t && t.length, s = je(e) && e > -1 && e % 1 == 0;
  return Ge(t) || !Re(t) && s ? e > 0 && Ut(t) ? e - 1 in t : !0 : !1;
}, cs = (t) => {
  if (!t || !Ut(t))
    return !1;
  let e;
  const s = "constructor", r = t[s], o = r && r.prototype, c = Ts.call(t, s), i = o && Ts.call(o, "isPrototypeOf");
  if (r && !c && !i)
    return !1;
  for (e in t)
    ;
  return vs(e) || Ts.call(t, e);
}, ds = (t) => {
  const e = HTMLElement;
  return t ? e ? t instanceof e : t.nodeType === ln : !1;
}, bs = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === ln : !1;
}, Do = () => performance.now(), Er = (t, e, s, r, o) => {
  let c = 0;
  const i = Do(), d = as(0, s), l = (u) => {
    const h = Do(), v = h - i >= d, m = u ? 1 : 1 - (as(0, i + d - h) / d || 0), g = (e - t) * (Re(o) ? o(m, m * d, 0, 1, d) : m) + t, w = v || m === 1;
    r && r(g, m, w), c = w ? 0 : Ct(() => l());
  };
  return l(), (u) => {
    hs(c), u && l(u);
  };
};
function ae(t, e) {
  if (_s(t))
    for (let s = 0; s < t.length && e(t[s], s, t) !== !1; s++)
      ;
  else
    t && ae(Object.keys(t), (s) => e(t[s], s, t));
  return t;
}
const no = (t, e) => t.indexOf(e) >= 0, Ze = (t, e) => t.concat(e), be = (t, e, s) => (!gs(e) && _s(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), mt = (t) => Array.from(t || []), dn = (t) => Ge(t) ? t : [t], Ns = (t) => !!t && !t.length, Vo = (t) => mt(new Set(t)), Ne = (t, e, s) => {
  ae(t, (o) => o && o.apply(void 0, e || [])), !s && (t.length = 0);
}, ro = "paddingTop", Lt = "paddingRight", Ot = "paddingLeft", Ht = "paddingBottom", Rt = "marginLeft", Bt = "marginRight", kt = "marginBottom", un = "overflowX", mn = "overflowY", ct = "width", bt = "height", at = "visible", ft = "hidden", xt = "scroll", Ar = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, xs = (t, e, s, r) => {
  if (t && e) {
    let o = !0;
    return ae(s, (c) => {
      const i = t[c], d = e[c];
      i !== d && (o = !1);
    }), o;
  }
  return !1;
}, ao = (t, e) => xs(t, e, ["w", "h"]), ss = (t, e) => xs(t, e, ["x", "y"]), Mr = (t, e) => xs(t, e, ["t", "r", "b", "l"]), qe = () => {
}, X = (t, ...e) => t.bind(0, ...e), ht = (t) => {
  let e;
  const s = t ? Nt : Ct, r = t ? Fs : hs;
  return [(o) => {
    r(e), e = s(() => o(), Re(t) ? t() : t);
  }, () => r(e)];
}, Us = (t, e) => {
  const { _: s, p: r, v: o, m: c } = e || {};
  let i, d, l, u, h = qe;
  const f = function(x) {
    h(), Fs(i), u = i = d = void 0, h = qe, t.apply(this, x);
  }, v = (w) => c && d ? c(d, w) : w, m = () => {
    h !== qe && f(v(l) || l);
  }, g = function() {
    const x = mt(arguments), $ = Re(s) ? s() : s;
    if (je($) && $ >= 0) {
      const O = Re(r) ? r() : r, R = je(O) && O >= 0, I = $ > 0 ? Nt : Ct, D = $ > 0 ? Fs : hs, V = v(x) || x, A = f.bind(0, V);
      let C;
      h(), o && !u ? (A(), u = !0, C = I(() => u = void 0, $)) : (C = I(A, $), R && !i && (i = Nt(m, O))), h = () => D(C), d = l = V;
    } else
      f(x);
  };
  return g.S = m, g;
}, fn = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Ke = (t) => t ? Object.keys(t) : [], re = (t, e, s, r, o, c, i) => {
  const d = [e, s, r, o, c, i];
  return (typeof t != "object" || oo(t)) && !Re(t) && (t = {}), ae(d, (l) => {
    ae(l, (u, h) => {
      const f = l[h];
      if (t === f)
        return !0;
      const v = Ge(f);
      if (f && cs(f)) {
        const m = t[h];
        let g = m;
        v && !Ge(m) ? g = [] : !v && !cs(m) && (g = {}), t[h] = re(g, f);
      } else
        t[h] = v ? f.slice() : f;
    });
  }), t;
}, hn = (t, e) => ae(re({}, t), (s, r, o) => {
  s === void 0 ? delete o[r] : s && cs(s) && (o[r] = hn(s));
}), lo = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, Ps = (t, e, s) => as(t, Sr(e, s)), gt = (t) => mt(new Set((Ge(t) ? t : (t || "").split(" ")).filter((e) => e))), io = (t, e) => t && t.getAttribute(e), Lo = (t, e) => t && t.hasAttribute(e), Je = (t, e, s) => {
  ae(gt(e), (r) => {
    t && t.setAttribute(r, String(s || ""));
  });
}, Pe = (t, e) => {
  ae(gt(e), (s) => t && t.removeAttribute(s));
}, ys = (t, e) => {
  const s = gt(io(t, e)), r = X(Je, t, e), o = (c, i) => {
    const d = new Set(s);
    return ae(gt(c), (l) => {
      d[i](l);
    }), mt(d).join(" ");
  };
  return {
    O: (c) => r(o(c, "delete")),
    $: (c) => r(o(c, "add")),
    C: (c) => {
      const i = gt(c);
      return i.reduce((d, l) => d && s.includes(l), i.length > 0);
    }
  };
}, co = (t, e, s) => (ys(t, e).O(s), X(uo, t, e, s)), uo = (t, e, s) => (ys(t, e).$(s), X(co, t, e, s)), zs = (t, e, s, r) => (r ? uo : co)(t, e, s), mo = (t, e, s) => ys(t, e).C(s), pn = (t) => ys(t, "class"), vn = (t, e) => {
  pn(t).O(e);
}, ws = (t, e) => (pn(t).$(e), X(vn, t, e)), gn = (t, e) => {
  const s = [], r = e ? bs(e) && e : document;
  return r ? be(s, r.querySelectorAll(t)) : s;
}, Tr = (t, e) => {
  const s = e ? bs(e) && e : document;
  return s ? s.querySelector(t) : null;
}, us = (t, e) => bs(t) ? t.matches(e) : !1, _n = (t) => us(t, "body"), js = (t) => t ? mt(t.childNodes) : [], Et = (t) => t && t.parentElement, $t = (t, e) => bs(t) && t.closest(e), qs = (t) => document.activeElement, Dr = (t, e, s) => {
  const r = $t(t, e), o = t && Tr(s, r), c = $t(o, e) === r;
  return r && o ? r === t || o === t || c && $t($t(t, s), e) !== r : !1;
}, dt = (t) => {
  if (_s(t))
    ae(mt(t), (e) => dt(e));
  else if (t) {
    const e = Et(t);
    e && e.removeChild(t);
  }
}, bn = (t, e, s) => {
  if (s && t) {
    let r = e, o;
    return _s(s) ? (o = document.createDocumentFragment(), ae(s, (c) => {
      c === r && (r = c.previousSibling), o.appendChild(c);
    })) : o = s, e && (r ? r !== e && (r = r.nextSibling) : r = t.firstChild), t.insertBefore(o, r || null), () => dt(s);
  }
  return qe;
}, Te = (t, e) => bn(t, null, e), Oo = (t, e) => bn(Et(t), t && t.nextSibling, e), St = (t) => {
  const e = document.createElement("div");
  return Je(e, "class", t), e;
}, fo = (t) => {
  const e = St();
  return e.innerHTML = t.trim(), ae(js(e), (s) => dt(s));
}, Vr = /^--/, Ho = (t, e) => t.getPropertyValue(e) || t[e] || "", ho = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Zt = (t) => ho(parseFloat(t || "")), Ro = (t) => `${(ho(t) * 100).toFixed(3)}%`, Gs = (t) => `${ho(t)}px`;
function et(t, e) {
  t && e && ae(e, (s, r) => {
    try {
      const o = t.style, c = je(s) ? Gs(s) : (s || "") + "";
      Vr.test(r) ? o.setProperty(r, c) : o[r] = c;
    } catch {
    }
  });
}
function st(t, e, s) {
  const r = gs(e);
  let o = r ? "" : {};
  if (t) {
    const c = De.getComputedStyle(t, s) || t.style;
    o = r ? Ho(c, e) : mt(e).reduce((i, d) => (i[d] = Ho(c, d), i), o);
  }
  return o;
}
const Bo = (t, e, s) => {
  const r = e ? `${e}-` : "", o = s ? `-${s}` : "", c = `${r}top${o}`, i = `${r}right${o}`, d = `${r}bottom${o}`, l = `${r}left${o}`, u = st(t, [c, i, d, l]);
  return {
    t: Zt(u[c]),
    r: Zt(u[i]),
    b: Zt(u[d]),
    l: Zt(u[l])
  };
}, Ds = (t, e) => `translate${Ut(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, Lr = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Or = {
  w: 0,
  h: 0
}, ks = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Or, Hr = (t) => ks("inner", t || De), _t = X(ks, "offset"), xn = X(ks, "client"), Ks = X(ks, "scroll"), po = (t) => {
  const e = parseFloat(st(t, ct)) || 0, s = parseFloat(st(t, bt)) || 0;
  return {
    w: e - Bs(e),
    h: s - Bs(s)
  };
}, Ft = (t) => t.getBoundingClientRect(), Rr = (t) => !!t && Lr(t), Ws = (t) => !!(t && (t[bt] || t[ct])), yn = (t, e) => {
  const s = Ws(t);
  return !Ws(e) && s;
}, Fo = (t, e, s, r) => {
  ae(gt(e), (o) => {
    t && t.removeEventListener(o, s, r);
  });
}, me = (t, e, s, r) => {
  var o;
  const c = (o = r && r.H) != null ? o : !0, i = r && r.I || !1, d = r && r.A || !1, l = {
    passive: c,
    capture: i
  };
  return X(Ne, gt(e).map((u) => {
    const h = d ? (f) => {
      Fo(t, u, h, i), s && s(f);
    } : s;
    return t && t.addEventListener(u, h, l), X(Fo, t, u, h, i);
  }));
}, vo = (t) => t.stopPropagation(), Ys = (t) => t.preventDefault(), wn = (t) => vo(t) || Ys(t), Ie = (t, e) => {
  const { x: s, y: r } = je(e) ? {
    x: e,
    y: e
  } : e || {};
  je(s) && (t.scrollLeft = s), je(r) && (t.scrollTop = r);
}, He = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), kn = () => ({
  T: {
    x: 0,
    y: 0
  },
  D: {
    x: 0,
    y: 0
  }
}), Br = (t, e) => {
  const { T: s, D: r } = t, { w: o, h: c } = e, i = (f, v, m) => {
    let g = Mo(f) * m, w = Mo(v) * m;
    if (g === w) {
      const x = ls(f), $ = ls(v);
      w = x > $ ? 0 : w, g = x < $ ? 0 : g;
    }
    return g = g === w ? 0 : g, [g + 0, w + 0];
  }, [d, l] = i(s.x, r.x, o), [u, h] = i(s.y, r.y, c);
  return {
    T: {
      x: d,
      y: u
    },
    D: {
      x: l,
      y: h
    }
  };
}, Io = ({ T: t, D: e }) => {
  const s = (r, o) => r === 0 && r <= o;
  return {
    x: s(t.x, e.x),
    y: s(t.y, e.y)
  };
}, No = ({ T: t, D: e }, s) => {
  const r = (o, c, i) => Ps(0, 1, (o - i) / (o - c) || 0);
  return {
    x: r(t.x, e.x, s.x),
    y: r(t.y, e.y, s.y)
  };
}, Xs = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, Uo = (t, e) => {
  ae(dn(e), t);
}, Js = (t) => {
  const e = /* @__PURE__ */ new Map(), s = (c, i) => {
    if (c) {
      const d = e.get(c);
      Uo((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, r = (c, i) => {
    if (gs(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), Uo((h) => {
        Re(h) && u.add(h);
      }, i), X(s, c, i);
    }
    cn(i) && i && s();
    const d = Ke(c), l = [];
    return ae(d, (u) => {
      const h = c[u];
      h && be(l, r(u, h));
    }), X(Ne, l);
  }, o = (c, i) => {
    ae(mt(e.get(c)), (d) => {
      i && !Ns(i) ? d.apply(0, i) : d();
    });
  };
  return r(t || {}), [r, s, o];
}, Po = (t) => JSON.stringify(t, (e, s) => {
  if (Re(s))
    throw 0;
  return s;
}), zo = (t, e) => t ? `${e}`.split(".").reduce((s, r) => s && fn(s, r) ? s[r] : void 0, t) : void 0, Fr = {
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
}, $n = (t, e) => {
  const s = {}, r = Ze(Ke(e), Ke(t));
  return ae(r, (o) => {
    const c = t[o], i = e[o];
    if (Ut(c) && Ut(i))
      re(s[o] = {}, $n(c, i)), lo(s[o]) && delete s[o];
    else if (fn(e, o) && i !== c) {
      let d = !0;
      if (Ge(c) || Ge(i))
        try {
          Po(c) === Po(i) && (d = !1);
        } catch {
        }
      d && (s[o] = i);
    }
  }), s;
}, jo = (t, e, s) => (r) => [zo(t, r), s || zo(e, r) !== void 0], Tt = "data-overlayscrollbars", os = "os-environment", es = `${os}-scrollbar-hidden`, Vs = `${Tt}-initialize`, ns = "noClipping", qo = `${Tt}-body`, it = Tt, Ir = "host", Qe = `${Tt}-viewport`, Nr = un, Ur = mn, Sn = "arrange", Cn = "measuring", En = "scrollbarHidden", Pr = "scrollbarPressed", zr = "noContent", Qs = `${Tt}-padding`, Go = `${Tt}-content`, go = "os-size-observer", jr = `${go}-appear`, _o = `${go}-listener`, qr = `${_o}-scroll`, rs = `${_o}-item`, Ko = `${rs}-final`, Gr = "os-trinsic-observer", Kr = "os-theme-none", Be = "os-scrollbar", Wr = `${Be}-rtl`, Yr = `${Be}-horizontal`, Xr = `${Be}-vertical`, An = `${Be}-track`, bo = `${Be}-handle`, Jr = `${Be}-visible`, Qr = `${Be}-cornerless`, Wo = `${Be}-interaction`, Yo = `${Be}-unusable`, Zs = `${Be}-auto-hide`, Xo = `${Zs}-hidden`, Jo = `${Be}-wheel`, Zr = `${An}-interactive`, ea = `${bo}-interactive`;
let Ls;
const ta = () => {
  const t = (y, O, R) => {
    Te(document.body, y), Te(document.body, y);
    const I = xn(y), D = _t(y), T = po(O);
    return R && dt(y), {
      x: D.h - I.h + T.h,
      y: D.w - I.w + T.w
    };
  }, e = (y) => {
    let O = !1;
    const R = ws(y, es);
    try {
      O = st(y, "scrollbar-width") === "none" || st(y, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return R(), O;
  }, s = `.${os}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${os} div{width:200%;height:200%;margin:10px 0}.${es}{scrollbar-width:none!important}.${es}::-webkit-scrollbar,.${es}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, o = fo(`<div class="${os}"><div></div><style>${s}</style></div>`)[0], c = o.firstChild, [i, , d] = Js(), [l, u] = Oe({
    o: t(o, c),
    i: ss
  }, X(t, o, c, !0)), [h] = u(), f = e(o), v = {
    x: h.x === 0,
    y: h.y === 0
  }, m = {
    elements: {
      host: null,
      padding: !f,
      viewport: (y) => f && _n(y) && y,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, g = re({}, Fr), w = X(re, {}, g), x = X(re, {}, m), $ = {
    k: h,
    M: v,
    R: f,
    V: !!Is,
    L: X(i, "r"),
    P: x,
    U: (y) => re(m, y) && x(),
    N: w,
    q: (y) => re(g, y) && w(),
    B: re({}, m),
    F: re({}, g)
  };
  if (Pe(o, "style"), dt(o), me(De, "resize", () => {
    d("r", []);
  }), Re(De.matchMedia) && !f && (!v.x || !v.y)) {
    const y = (O) => {
      const R = De.matchMedia(`(resolution: ${De.devicePixelRatio}dppx)`);
      me(R, "change", () => {
        O(), y(O);
      }, {
        A: !0
      });
    };
    y(() => {
      const [O, R] = l();
      re($.k, O), d("r", [R]);
    });
  }
  return $;
}, We = () => (Ls || (Ls = ta()), Ls), Mn = (t, e) => Re(e) ? e.apply(0, t) : e, sa = (t, e, s, r) => {
  const o = vs(r) ? s : r;
  return Mn(t, o) || e.apply(0, t);
}, Tn = (t, e, s, r) => {
  const o = vs(r) ? s : r, c = Mn(t, o);
  return !!c && (ds(c) ? c : e.apply(0, t));
}, oa = (t, e) => {
  const { nativeScrollbarsOverlaid: s, body: r } = e || {}, { M: o, R: c, P: i } = We(), { nativeScrollbarsOverlaid: d, body: l } = i().cancel, u = s ?? d, h = vs(r) ? l : r, f = (o.x || o.y) && u, v = t && (oo(h) ? !c : h);
  return !!f || !!v;
}, xo = /* @__PURE__ */ new WeakMap(), na = (t, e) => {
  xo.set(t, e);
}, ra = (t) => {
  xo.delete(t);
}, Dn = (t) => xo.get(t), aa = (t, e, s) => {
  let r = !1;
  const o = s ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    r = !0;
  }, i = (d) => {
    if (o && s) {
      const l = s.map((u) => {
        const [h, f] = u || [];
        return [f && h ? (d || gn)(h, t) : [], f];
      });
      ae(l, (u) => ae(u[0], (h) => {
        const f = u[1], v = o.get(h) || [];
        if (t.contains(h) && f) {
          const g = me(h, f, (w) => {
            r ? (g(), o.delete(h)) : e(w);
          });
          o.set(h, be(v, g));
        } else
          Ne(v), o.delete(h);
      }));
    }
  };
  return i(), [c, i];
}, Qo = (t, e, s, r) => {
  let o = !1;
  const { j: c, X: i, Y: d, W: l, J: u, K: h } = r || {}, f = Us(() => o && s(!0), {
    _: 33,
    p: 99
  }), [v, m] = aa(t, f, d), g = c || [], w = i || [], x = Ze(g, w), $ = (O, R) => {
    if (!Ns(R)) {
      const I = u || qe, D = h || qe, T = [], V = [];
      let A = !1, C = !1;
      if (ae(R, (S) => {
        const { attributeName: M, target: E, type: k, oldValue: F, addedNodes: B, removedNodes: oe } = S, de = k === "attributes", ie = k === "childList", N = t === E, Z = de && M, te = Z && io(E, M || ""), Y = gs(te) ? te : null, ue = Z && F !== Y, P = no(w, M) && ue;
        if (e && (ie || !N)) {
          const q = de && ue, j = q && l && us(E, l), U = (j ? !I(E, M, F, Y) : !de || q) && !D(S, !!j, t, r);
          ae(B, (G) => be(T, G)), ae(oe, (G) => be(T, G)), C = C || U;
        }
        !e && N && ue && !I(E, M, F, Y) && (be(V, M), A = A || P);
      }), m((S) => Vo(T).reduce((M, E) => (be(M, gn(S, E)), us(E, S) ? be(M, E) : M), [])), e)
        return !O && C && s(!1), [!1];
      if (!Ns(V) || A) {
        const S = [Vo(V), A];
        return !O && s.apply(0, S), S;
      }
    }
  }, y = new Cr(X($, !1));
  return [() => (y.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: x,
    subtree: e,
    childList: e,
    characterData: e
  }), o = !0, () => {
    o && (v(), y.disconnect(), o = !1);
  }), () => {
    if (o)
      return f.S(), $(!0, y.takeRecords());
  }];
}, Vn = {}, Ln = {}, la = (t) => {
  ae(t, (e) => ae(e, (s, r) => {
    Vn[r] = e[r];
  }));
}, On = (t, e, s) => Ke(t).map((r) => {
  const { static: o, instance: c } = t[r], [i, d, l] = s || [], u = s ? c : o;
  if (u) {
    const h = s ? u(i, d, e) : u(e);
    return (l || Ln)[r] = h;
  }
}), zt = (t) => Ln[t], ia = "__osOptionsValidationPlugin", Hn = "__osSizeObserverPlugin", ca = {
  [Hn]: {
    static: () => (t, e, s) => {
      const o = "scroll", c = fo(`<div class="${rs}" dir="ltr"><div class="${rs}"><div class="${Ko}"></div></div><div class="${rs}"><div class="${Ko}" style="width: 200%; height: 200%"></div></div></div>`), i = c[0], d = i.lastChild, l = i.firstChild, u = l == null ? void 0 : l.firstChild;
      let h = _t(i), f = h, v = !1, m;
      const g = () => {
        Ie(l, 3333333), Ie(d, 3333333);
      }, w = (y) => {
        m = 0, v && (h = f, e(y === !0));
      }, x = (y) => {
        f = _t(i), v = !y || !ao(f, h), y ? (vo(y), v && !m && (hs(m), m = Ct(w))) : w(y === !1), g();
      }, $ = [Te(t, c), me(l, o, x), me(d, o, x)];
      return ws(t, qr), et(u, {
        [ct]: 3333333,
        [bt]: 3333333
      }), Ct(g), [s ? X(x, !1) : g, $];
    }
  }
}, Rn = (t, e) => {
  const { M: s } = e, [r, o] = t("showNativeOverlaidScrollbars");
  return [r && s.x && s.y, o];
}, ms = (t) => t.indexOf(at) === 0, da = (t, e) => {
  const s = (o, c, i, d) => {
    const l = o === at ? ft : o.replace(`${at}-`, ""), u = ms(o), h = ms(i);
    return !c && !d ? ft : u && h ? at : u ? c && d ? l : c ? at : ft : c ? l : h && d ? at : ft;
  }, r = {
    x: s(e.x, t.x, e.y, t.y),
    y: s(e.y, t.y, e.x, t.x)
  };
  return {
    G: r,
    Z: {
      x: r.x === xt,
      y: r.y === xt
    }
  };
}, yo = "__osScrollbarsHidingPlugin", ua = {
  [yo]: {
    static: () => ({
      tt: (t, e, s, r, o) => {
        const { nt: c, ot: i } = t, { R: d, M: l, k: u } = r, h = !c && !d && (l.x || l.y), [f] = Rn(o, r), v = () => {
          const $ = (D) => {
            const T = st(i, D);
            return [T, T === xt];
          }, [y, O] = $(un), [R, I] = $(mn);
          return {
            G: {
              x: y,
              y: R
            },
            Z: {
              x: O,
              y: I
            }
          };
        }, m = ($) => {
          const { Z: y } = $, O = d || f ? 0 : 42, R = (A, C, S) => [C && !d ? A ? O : S : 0, A && !!O], [I, D] = R(l.x, y.x, u.x), [T, V] = R(l.y, y.y, u.y);
          return {
            st: {
              x: I,
              y: T
            },
            et: {
              x: D,
              y: V
            }
          };
        }, g = ($, { ct: y }, O) => {
          if (!c) {
            const R = re({}, {
              [Bt]: 0,
              [kt]: 0,
              [Rt]: 0
            }), { st: I, et: D } = m($), { x: T, y: V } = D, { x: A, y: C } = I, { rt: S } = e, M = y ? Rt : Bt, E = y ? Ot : Lt, k = S[M], F = S[kt], B = S[E], oe = S[Ht];
            return R[ct] = `calc(100% + ${C + k * -1}px)`, R[M] = -C + k, R[kt] = -A + F, O && (R[E] = B + (V ? C : 0), R[Ht] = oe + (T ? A : 0)), R;
          }
        };
        return {
          lt: m,
          it: ($, y, O) => {
            if (h) {
              const { rt: R } = e, { st: I, et: D } = m($), { x: T, y: V } = D, { x: A, y: C } = I, { ct: S } = s, E = R[S ? Lt : Ot], k = R.paddingTop, F = y.w + O.w, B = y.h + O.h, oe = {
                w: C && V ? `${C + F - E}px` : "",
                h: A && T ? `${A + B - k}px` : ""
              };
              et(i, {
                "--os-vaw": oe.w,
                "--os-vah": oe.h
              });
            }
            return h;
          },
          ut: ($) => {
            if (h) {
              const y = $ || v(), { rt: O } = e, { et: R } = m(y), { x: I, y: D } = R, T = {}, V = (S) => ae(S, (M) => {
                T[M] = O[M];
              });
              I && V([kt, ro, Ht]), D && V([Rt, Bt, Ot, Lt]);
              const A = st(i, Ke(T)), C = co(i, Qe, Sn);
              return et(i, T), [() => {
                et(i, re({}, A, g(y, s, h))), C();
              }, y];
            }
            return [qe];
          },
          _t: g
        };
      }
    })
  }
}, Bn = "__osClickScrollPlugin", ma = {
  [Bn]: {
    static: () => (t, e, s, r, o) => {
      let c = 0, i = qe;
      const d = (l) => {
        i = Er(l, l + r * Math.sign(s), 133, (u, h, f) => {
          t(u);
          const v = e(), m = v + r, g = o >= v && o <= m;
          if (f && !g) {
            if (c)
              d(u);
            else {
              const w = Nt(() => {
                d(u);
              }, 222);
              i = () => {
                clearTimeout(w);
              };
            }
            c++;
          }
        });
      };
      return d(0), () => i();
    }
  }
}, Fn = (t, e, s) => {
  const { dt: r } = s || {}, o = zt(Hn), [c] = Oe({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], l = fo(`<div class="${go}"><div class="${_o}"></div></div>`)[0], u = l.firstChild, h = (f) => {
      const v = f instanceof ResizeObserverEntry;
      let m = !1, g = !1;
      if (v) {
        const [w, , x] = c(f.contentRect), $ = Ws(w);
        g = yn(w, x), m = !g && !$;
      } else
        g = f === !0;
      m || e({
        ft: !0,
        dt: g
      });
    };
    if (is) {
      const f = new is((v) => h(v.pop()));
      f.observe(u), be(i, () => {
        f.disconnect();
      });
    } else if (o) {
      const [f, v] = o(u, h, r);
      be(i, Ze([ws(l, jr), me(l, "animationstart", f)], v));
    } else
      return qe;
    return X(Ne, be(i, Te(t, l)));
  };
}, fa = (t, e) => {
  let s;
  const r = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, o = St(Gr), [c] = Oe({
    o: !1
  }), i = (l, u) => {
    if (l) {
      const h = c(r(l)), [, f] = h;
      return f && !u && e(h) && [h];
    }
  }, d = (l, u) => i(u.pop(), l);
  return [() => {
    const l = [];
    if (To)
      s = new To(X(d, !1), {
        root: t
      }), s.observe(o), be(l, () => {
        s.disconnect();
      });
    else {
      const u = () => {
        const h = _t(o);
        i(h);
      };
      be(l, Fn(o, u)()), u();
    }
    return X(Ne, be(l, Te(t, o)));
  }, () => s && d(!0, s.takeRecords())];
}, ha = (t, e, s, r) => {
  let o, c, i, d, l, u;
  const h = `[${it}]`, f = `[${Qe}]`, v = [], m = ["wrap", "cols", "rows"], g = ["id", "class", "style", "open"], { vt: w, ht: x, ot: $, gt: y, bt: O, wt: R, nt: I, yt: D, St: T, Ot: V } = t, A = (L) => st(L, "direction") === "rtl", C = {
    $t: !1,
    ct: A(w)
  }, S = We(), M = zt(yo), [E] = Oe({
    i: ao,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const L = M && M.tt(t, e, C, S, s).ut, G = !(D && I) && mo(x, it, ns), K = !I && T(Sn), Q = K && He(y), ce = V(Cn, G), ye = K && L && L()[0], Se = Ks($), ne = po($);
    return ye && ye(), Ie(y, Q), G && ce(), {
      w: Se.w + ne.w,
      h: Se.h + ne.h
    };
  }), k = R ? m : Ze(g, m), F = Us(r, {
    _: () => o,
    p: () => c,
    m(L, U) {
      const [G] = L, [K] = U;
      return [Ze(Ke(G), Ke(K)).reduce((Q, ce) => (Q[ce] = G[ce] || K[ce], Q), {})];
    }
  }), B = (L) => {
    const U = A(w);
    re(L, {
      Ct: u !== U
    }), re(C, {
      ct: U
    }), u = U;
  }, oe = (L, U) => {
    const [G, K] = L, Q = {
      xt: K
    };
    return re(C, {
      $t: G
    }), !U && r(Q), Q;
  }, de = ({ ft: L, dt: U }) => {
    const K = !(L && !U) && S.R ? F : r, Q = {
      ft: L || U,
      dt: U
    };
    B(Q), K(Q);
  }, ie = (L, U) => {
    const [, G] = E(), K = {
      Ht: G
    };
    return B(K), G && !U && (L ? r : F)(K), K;
  }, N = (L, U, G) => {
    const K = {
      Et: U
    };
    return B(K), U && !G && F(K), K;
  }, [Z, te] = O ? fa(x, oe) : [], Y = !I && Fn(x, de, {
    dt: !0
  }), [ue, P] = Qo(x, !1, N, {
    X: g,
    j: Ze(g, v)
  }), q = I && is && new is((L) => {
    const U = L[L.length - 1].contentRect;
    de({
      ft: !0,
      dt: yn(U, l)
    }), l = U;
  }), j = Us(() => {
    const [, L] = E();
    r({
      Ht: L
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    q && q.observe(x);
    const L = Y && Y(), U = Z && Z(), G = ue(), K = S.L((Q) => {
      Q ? F({
        zt: Q
      }) : j();
    });
    return () => {
      q && q.disconnect(), L && L(), U && U(), d && d(), G(), K();
    };
  }, ({ It: L, At: U, Tt: G }) => {
    const K = {}, [Q] = L("update.ignoreMutation"), [ce, ye] = L("update.attributes"), [Se, ne] = L("update.elementEvents"), [we, Ee] = L("update.debounce"), Fe = ne || ye, ke = U || G, Ve = (xe) => Re(Q) && Q(xe);
    if (Fe) {
      i && i(), d && d();
      const [xe, ge] = Qo(O || $, !0, ie, {
        j: Ze(k, ce || []),
        Y: Se,
        W: h,
        K: (Ae, _e) => {
          const { target: Me, attributeName: Le } = Ae;
          return (!_e && Le && !I ? Dr(Me, h, f) : !1) || !!$t(Me, `.${Be}`) || !!Ve(Ae);
        }
      });
      d = xe(), i = ge;
    }
    if (Ee)
      if (F.S(), Ge(we)) {
        const xe = we[0], ge = we[1];
        o = je(xe) && xe, c = je(ge) && ge;
      } else
        je(we) ? (o = we, c = !1) : (o = !1, c = !1);
    if (ke) {
      const xe = P(), ge = te && te(), Ae = i && i();
      xe && re(K, N(xe[0], xe[1], ke)), ge && re(K, oe(ge[0], ke)), Ae && re(K, ie(Ae[0], ke));
    }
    return B(K), K;
  }, C];
}, pa = (t, e, s, r) => {
  const { P: o } = We(), { scrollbars: c } = o(), { slot: i } = c, { vt: d, ht: l, ot: u, Dt: h, gt: f, yt: v, nt: m } = e, { scrollbars: g } = h ? {} : t, { slot: w } = g || {}, x = /* @__PURE__ */ new Map(), $ = (P) => Is && new Is({
    source: f,
    axis: P
  }), y = {
    x: $("x"),
    y: $("y")
  }, O = Tn([d, l, u], () => m && v ? d : l, i, w), R = (P, q) => {
    if (q) {
      const Q = P ? ct : bt, { kt: ce, Mt: ye } = q, Se = Ft(ye)[Q], ne = Ft(ce)[Q];
      return Ps(0, 1, Se / ne || 0);
    }
    const j = P ? "x" : "y", { Rt: L, Vt: U } = s, G = U[j], K = L[j];
    return Ps(0, 1, G / (G + K) || 0);
  }, I = (P, q, j) => {
    const L = R(j, P);
    return 1 / L * (1 - L) * q;
  }, D = (P) => re(P, {
    clear: ["left"]
  }), T = (P) => {
    x.forEach((q, j) => {
      (P ? no(dn(P), j) : !0) && (ae(q || [], (U) => {
        U && U.cancel();
      }), x.delete(j));
    });
  }, V = (P, q, j, L) => {
    const U = x.get(P) || [], G = U.find((K) => K && K.timeline === q);
    G ? G.effect = new KeyframeEffect(P, j, {
      composite: L
    }) : x.set(P, Ze(U, [P.animate(j, {
      timeline: q,
      composite: L
    })]));
  }, A = (P, q, j) => {
    const L = j ? ws : vn;
    ae(P, (U) => {
      L(U.Lt, q);
    });
  }, C = (P, q) => {
    ae(P, (j) => {
      const [L, U] = q(j);
      et(L, U);
    });
  }, S = (P, q) => {
    C(P, (j) => {
      const { Mt: L } = j;
      return [L, {
        [q ? ct : bt]: Ro(R(q))
      }];
    });
  }, M = (P, q) => {
    const { Pt: j } = s, L = q ? "x" : "y", U = y[L], G = Io(j)[L], K = (Q, ce) => Ds(Ro(I(Q, G ? ce : 1 - ce, q)), q);
    U ? ae(P, (Q) => {
      const { Mt: ce } = Q;
      V(ce, U, D({
        transform: [0, 1].map((ye) => K(Q, ye))
      }));
    }) : C(P, (Q) => [Q.Mt, {
      transform: K(Q, No(j, He(f))[L])
    }]);
  }, E = (P) => m && !v && Et(P) === u, k = [], F = [], B = [], oe = (P, q, j) => {
    const L = cn(j), U = L ? j : !0, G = L ? !j : !0;
    U && A(F, P, q), G && A(B, P, q);
  }, de = () => {
    S(F, !0), S(B);
  }, ie = () => {
    M(F, !0), M(B);
  }, N = () => {
    if (m) {
      const { Rt: P, Pt: q } = s, j = Io(q), L = 0.5;
      if (y.x && y.y)
        ae(Ze(B, F), ({ Lt: U }) => {
          if (E(U)) {
            const G = (K) => V(U, y[K], D({
              transform: [0, j[K] ? 1 : -1].map((Q) => Ds(Gs(Q * (P[K] - L)), K === "x"))
            }), "add");
            G("x"), G("y");
          } else
            T(U);
        });
      else {
        const U = No(q, He(f)), G = (K) => {
          const { Lt: Q } = K, ce = E(Q) && Q, ye = (Se, ne, we) => {
            const Ee = ne * Se;
            return Gs(we ? Ee : -Ee);
          };
          return [ce, ce && {
            transform: Ds({
              x: ye(U.x, P.x, j.x),
              y: ye(U.y, P.y, j.y)
            })
          }];
        };
        C(F, G), C(B, G);
      }
    }
  }, Z = (P) => {
    const j = St(`${Be} ${P ? Yr : Xr}`), L = St(An), U = St(bo), G = {
      Lt: j,
      kt: L,
      Mt: U
    };
    return be(P ? F : B, G), be(k, [Te(j, L), Te(L, U), X(dt, j), T, r(G, oe, M, P)]), G;
  }, te = X(Z, !0), Y = X(Z, !1), ue = () => (Te(O, F[0].Lt), Te(O, B[0].Lt), X(Ne, k));
  return te(), Y(), [{
    Ut: de,
    Nt: ie,
    qt: N,
    Bt: oe,
    Ft: {
      V: y.x,
      jt: F,
      Xt: te,
      Yt: X(C, F)
    },
    Wt: {
      V: y.y,
      jt: B,
      Xt: Y,
      Yt: X(C, B)
    }
  }, ue];
}, va = (t, e, s, r) => (o, c, i, d) => {
  const { ht: l, ot: u, nt: h, gt: f, Jt: v, Ot: m } = e, { Lt: g, kt: w, Mt: x } = o, [$, y] = ht(333), [O, R] = ht(444), [I, D] = ht(), T = X(i, [o], d), V = (E) => {
    Re(f.scrollBy) && f.scrollBy({
      behavior: "smooth",
      left: E.x,
      top: E.y
    });
  }, A = d ? ct : bt, C = () => {
    const E = "pointerup pointercancel lostpointercapture", k = `client${d ? "X" : "Y"}`, F = d ? "left" : "top", B = d ? "w" : "h", oe = d ? "x" : "y", de = (ie, N) => (Z) => {
      const { Rt: te } = s, Y = _t(w)[B] - _t(x)[B], P = N * Z / Y * te[oe];
      Ie(f, {
        [oe]: ie + P
      });
    };
    return me(w, "pointerdown", (ie) => {
      const N = $t(ie.target, `.${bo}`) === x, Z = N ? x : w, te = t.scrollbars, { button: Y, isPrimary: ue, pointerType: P } = ie, { pointers: q } = te;
      if (Y === 0 && ue && te[N ? "dragScroll" : "clickScroll"] && (q || []).includes(P)) {
        R();
        const L = !N && ie.shiftKey, U = X(Ft, x), G = X(Ft, w), K = (_e, Me) => (_e || U())[F] - (Me || G())[F], Q = Bs(Ft(f)[A]) / _t(f)[B] || 1, ce = de(He(f)[oe], 1 / Q), ye = ie[k], Se = U(), ne = G(), we = Se[A], Ee = K(Se, ne) + we / 2, Fe = ye - ne[F], ke = N ? 0 : Fe - Ee, Ve = (_e) => {
          Ne(Ae), Z.releasePointerCapture(_e.pointerId);
        }, xe = () => m(Pr, !0), ge = xe(), Ae = [() => {
          const _e = He(f);
          ge();
          const Me = He(f), Le = {
            x: Me.x - _e.x,
            y: Me.y - _e.y
          };
          (ls(Le.x) > 3 || ls(Le.y) > 3) && (xe(), Ie(f, _e), V(Le), O(ge));
        }, me(v, E, Ve), me(v, "selectstart", (_e) => Ys(_e), {
          H: !1
        }), me(w, E, Ve), me(w, "pointermove", (_e) => {
          const Me = _e[k] - ye;
          (N || L) && ce(ke + Me);
        })];
        if (Z.setPointerCapture(ie.pointerId), L)
          ce(ke);
        else if (!N) {
          const _e = zt(Bn);
          _e && be(Ae, _e(ce, K, ke, we, Fe));
        }
      }
    });
  };
  let S = !0;
  const M = (E) => E.propertyName.indexOf(A) > -1;
  return X(Ne, [me(x, "pointermove pointerleave", r), me(g, "pointerenter", () => {
    c(Wo, !0);
  }), me(g, "pointerleave pointercancel", () => {
    c(Wo, !1);
  }), !h && me(g, "mousedown", () => {
    const E = qs();
    (Lo(E, Qe) || Lo(E, it) || E === document.body) && Nt(X(Xs, u), 25);
  }), me(g, "wheel", (E) => {
    const { deltaX: k, deltaY: F, deltaMode: B } = E;
    S && B === 0 && Et(g) === l && V({
      x: k,
      y: F
    }), S = !1, c(Jo, !0), $(() => {
      S = !0, c(Jo);
    }), Ys(E);
  }, {
    H: !1,
    I: !0
  }), me(x, "transitionstart", (E) => {
    if (M(E)) {
      const k = () => {
        T(), I(k);
      };
      k();
    }
  }), me(x, "transitionend transitioncancel", (E) => {
    M(E) && (D(), T());
  }), me(g, "pointerdown", X(me, v, "click", wn, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), C(), y, R, D]);
}, ga = (t, e, s, r, o, c) => {
  let i, d, l, u, h, f = qe, v = 0;
  const m = (N) => N.pointerType === "mouse", [g, w] = ht(), [x, $] = ht(100), [y, O] = ht(100), [R, I] = ht(() => v), [D, T] = pa(t, o, r, va(e, o, r, (N) => m(N) && B())), { ht: V, Kt: A, yt: C } = o, { Bt: S, Ut: M, Nt: E, qt: k } = D, F = (N, Z) => {
    if (I(), N)
      S(Xo);
    else {
      const te = X(S, Xo, !0);
      v > 0 && !Z ? R(te) : te();
    }
  }, B = () => {
    (l ? !i : !u) && (F(!0), x(() => {
      F(!1);
    }));
  }, oe = (N) => {
    S(Zs, N, !0), S(Zs, N, !1);
  }, de = (N) => {
    m(N) && (i = l, l && F(!0));
  }, ie = [I, $, O, w, () => f(), me(V, "pointerover", de, {
    A: !0
  }), me(V, "pointerenter", de), me(V, "pointerleave", (N) => {
    m(N) && (i = !1, l && F(!1));
  }), me(V, "pointermove", (N) => {
    m(N) && d && B();
  }), me(A, "scroll", (N) => {
    g(() => {
      E(), B();
    }), c(N), k();
  })];
  return [() => X(Ne, be(ie, T())), ({ It: N, Tt: Z, Gt: te, Qt: Y }) => {
    const { Zt: ue, tn: P, nn: q, sn: j } = Y || {}, { Ct: L, dt: U } = te || {}, { ct: G } = s, { M: K } = We(), { G: Q, en: ce } = r, [ye, Se] = N("showNativeOverlaidScrollbars"), [ne, we] = N("scrollbars.theme"), [Ee, Fe] = N("scrollbars.visibility"), [ke, Ve] = N("scrollbars.autoHide"), [xe, ge] = N("scrollbars.autoHideSuspend"), [Ae] = N("scrollbars.autoHideDelay"), [_e, Me] = N("scrollbars.dragScroll"), [Le, yt] = N("scrollbars.clickScroll"), [jt, Ss] = N("overflow"), Cs = U && !Z, Es = ce.x || ce.y, Ue = ue || P || j || L || Z, As = q || Fe || Ss, qt = ye && K.x && K.y, Gt = (ot, Dt, Vt) => {
      const Kt = ot.includes(xt) && (Ee === at || Ee === "auto" && Dt === xt);
      return S(Jr, Kt, Vt), Kt;
    };
    if (v = Ae, Cs && (xe && Es ? (oe(!1), f(), y(() => {
      f = me(A, "scroll", X(oe, !0), {
        A: !0
      });
    })) : oe(!0)), Se && S(Kr, qt), we && (S(h), S(ne, !0), h = ne), ge && !xe && oe(!0), Ve && (d = ke === "move", l = ke === "leave", u = ke === "never", F(u, !0)), Me && S(ea, _e), yt && S(Zr, Le), As) {
      const ot = Gt(jt.x, Q.x, !0), Dt = Gt(jt.y, Q.y, !1);
      S(Qr, !(ot && Dt));
    }
    Ue && (M(), E(), k(), S(Yo, !ce.x, !0), S(Yo, !ce.y, !1), S(Wr, G && !C));
  }, {}, D];
}, _a = (t) => {
  const e = We(), { P: s, R: r } = e, { elements: o } = s(), { host: c, padding: i, viewport: d, content: l } = o, u = ds(t), h = u ? {} : t, { elements: f } = h, { host: v, padding: m, viewport: g, content: w } = f || {}, x = u ? t : h.target, $ = _n(x), y = us(x, "textarea"), O = x.ownerDocument, R = O.documentElement, I = () => O.defaultView || De, D = X(sa, [x]), T = X(Tn, [x]), V = X(St, ""), A = X(D, V, d), C = X(T, V, l), S = A(g), M = S === x, E = M && $, k = !M && C(w), F = !M && S === k, B = E ? R : S, oe = y ? D(V, c, v) : x, de = E ? B : oe, ie = !M && T(V, i, m), N = !F && k, Z = [N, B, ie, de].map((ne) => ds(ne) && !Et(ne) && ne), te = (ne) => ne && no(Z, ne), Y = te(B) ? x : B, ue = {
    vt: x,
    ht: de,
    ot: B,
    cn: ie,
    bt: N,
    gt: E ? R : B,
    Kt: E ? O : B,
    rn: $ ? R : Y,
    Jt: O,
    wt: y,
    yt: $,
    Dt: u,
    nt: M,
    ln: I,
    St: (ne) => mo(B, Qe, ne),
    Ot: (ne, we) => zs(B, Qe, ne, we)
  }, { vt: P, ht: q, cn: j, ot: L, bt: U } = ue, G = [() => {
    Pe(q, [it, Vs]), Pe(P, Vs), $ && Pe(R, [Vs, it]);
  }], K = y && te(q);
  let Q = y ? P : js([U, L, j, q, P].find((ne) => ne && !te(ne)));
  const ce = E ? P : U || L, ye = X(Ne, G);
  return [ue, () => {
    const ne = I(), we = qs(), Ee = (ge) => {
      Te(Et(ge), js(ge)), dt(ge);
    }, Fe = (ge) => me(ge, "focusin focusout focus blur", wn, {
      I: !0,
      H: !1
    }), ke = "tabindex", Ve = io(L, ke), xe = Fe(we);
    return Je(q, it, M ? "" : Ir), Je(j, Qs, ""), Je(L, Qe, ""), Je(U, Go, ""), M || (Je(L, ke, Ve || "-1"), $ && Je(R, qo, "")), K && (Oo(P, q), be(G, () => {
      Oo(q, P), dt(q);
    })), Te(ce, Q), Te(q, j), Te(j || q, !M && L), Te(L, U), be(G, [xe, () => {
      const ge = qs(), Ae = te(L), _e = Ae && ge === L ? P : ge, Me = Fe(_e);
      Pe(j, Qs), Pe(U, Go), Pe(L, Qe), $ && Pe(R, qo), Ve ? Je(L, ke, Ve) : Pe(L, ke), te(U) && Ee(U), Ae && Ee(L), te(j) && Ee(j), Xs(_e), Me();
    }]), r && !M && (uo(L, Qe, En), be(G, X(Pe, L, Qe))), Xs(!M && $ && we === P && ne.top === ne ? L : we), xe(), Q = 0, ye;
  }, ye];
}, ba = ({ bt: t }) => ({ Gt: e, an: s, Tt: r }) => {
  const { xt: o } = e || {}, { $t: c } = s;
  t && (o || r) && et(t, {
    [bt]: c && "100%"
  });
}, xa = ({ ht: t, cn: e, ot: s, nt: r }, o) => {
  const [c, i] = Oe({
    i: Mr,
    o: Bo()
  }, X(Bo, t, "padding", ""));
  return ({ It: d, Gt: l, an: u, Tt: h }) => {
    let [f, v] = i(h);
    const { R: m } = We(), { ft: g, Ht: w, Ct: x } = l || {}, { ct: $ } = u, [y, O] = d("paddingAbsolute");
    (g || v || (h || w)) && ([f, v] = c(h));
    const I = !r && (O || x || v);
    if (I) {
      const D = !y || !e && !m, T = f.r + f.l, V = f.t + f.b, A = {
        [Bt]: D && !$ ? -T : 0,
        [kt]: D ? -V : 0,
        [Rt]: D && $ ? -T : 0,
        top: D ? -f.t : 0,
        right: D ? $ ? -f.r : "auto" : 0,
        left: D ? $ ? "auto" : -f.l : 0,
        [ct]: D && `calc(100% + ${T}px)`
      }, C = {
        [ro]: D ? f.t : 0,
        [Lt]: D ? f.r : 0,
        [Ht]: D ? f.b : 0,
        [Ot]: D ? f.l : 0
      };
      et(e || s, A), et(s, C), re(o, {
        cn: f,
        un: !D,
        rt: e ? C : re({}, A, C)
      });
    }
    return {
      _n: I
    };
  };
}, ya = (t, e) => {
  const s = We(), { ht: r, cn: o, ot: c, nt: i, Kt: d, gt: l, yt: u, Ot: h, ln: f } = t, { R: v } = s, m = u && i, g = X(as, 0), w = ["display", "direction", "flexDirection", "writingMode"], x = {
    i: ao,
    o: {
      w: 0,
      h: 0
    }
  }, $ = {
    i: ss,
    o: {}
  }, y = (N) => {
    h(Cn, !m && N);
  }, O = (N, Z) => {
    const te = De.devicePixelRatio % 1 !== 0 ? 1 : 0, Y = {
      w: g(N.w - Z.w),
      h: g(N.h - Z.h)
    };
    return {
      w: Y.w > te ? Y.w : 0,
      h: Y.h > te ? Y.h : 0
    };
  }, [R, I] = Oe(x, X(po, c)), [D, T] = Oe(x, X(Ks, c)), [V, A] = Oe(x), [C] = Oe($), [S, M] = Oe(x), [E] = Oe($), [k] = Oe({
    i: (N, Z) => xs(N, Z, w),
    o: {}
  }, () => Rr(c) ? st(c, w) : {}), [F, B] = Oe({
    i: (N, Z) => ss(N.T, Z.T) && ss(N.D, Z.D),
    o: kn()
  }, () => {
    y(!0);
    const N = He(l), Z = h(zr, !0), te = me(d, xt, (j) => {
      const L = He(l);
      j.isTrusted && L.x === N.x && L.y === N.y && vo(j);
    }, {
      I: !0,
      A: !0
    });
    Ie(l, {
      x: 0,
      y: 0
    }), Z();
    const Y = He(l), ue = Ks(l);
    Ie(l, {
      x: ue.w,
      y: ue.h
    });
    const P = He(l);
    Ie(l, {
      x: P.x - Y.x < 1 && -ue.w,
      y: P.y - Y.y < 1 && -ue.h
    });
    const q = He(l);
    return Ie(l, N), Ct(() => te()), {
      T: Y,
      D: q
    };
  }), oe = zt(yo), de = (N, Z) => `${Z ? Nr : Ur}${Ar(N)}`, ie = (N) => {
    const Z = (Y) => [at, ft, xt].map((ue) => de(ue, Y)), te = Z(!0).concat(Z()).join(" ");
    h(te), h(Ke(N).map((Y) => de(N[Y], Y === "x")).join(" "), !0);
  };
  return ({ It: N, Gt: Z, an: te, Tt: Y }, { _n: ue }) => {
    const { ft: P, Ht: q, Ct: j, dt: L, zt: U } = Z || {}, G = oe && oe.tt(t, e, te, s, N), { it: K, ut: Q, _t: ce } = G || {}, [ye, Se] = Rn(N, s), [ne, we] = N("overflow"), Ee = ms(ne.x), Fe = ms(ne.y), ke = P || ue || q || j || U || Se;
    let Ve = I(Y), xe = T(Y), ge = A(Y), Ae = M(Y);
    if (Se && v && h(En, !ye), ke) {
      mo(r, it, ns) && y(!0);
      const [Co] = Q ? Q() : [], [Wt] = Ve = R(Y), [Yt] = xe = D(Y), Xt = xn(c), Jt = m && Hr(f()), Jn = {
        w: g(Yt.w + Wt.w),
        h: g(Yt.h + Wt.h)
      }, Eo = {
        w: g((Jt ? Jt.w : Xt.w + g(Xt.w - Yt.w)) + Wt.w),
        h: g((Jt ? Jt.h : Xt.h + g(Xt.h - Yt.h)) + Wt.h)
      };
      Co && Co(), Ae = S(Eo), ge = V(O(Jn, Eo), Y);
    }
    const [_e, Me] = Ae, [Le, yt] = ge, [jt, Ss] = xe, [Cs, Es] = Ve, [Ue, As] = C({
      x: Le.w > 0,
      y: Le.h > 0
    }), qt = Ee && Fe && (Ue.x || Ue.y) || Ee && Ue.x && !Ue.y || Fe && Ue.y && !Ue.x, Gt = ue || j || U || Es || Ss || Me || yt || we || Se || ke, ot = da(Ue, ne), [Dt, Vt] = E(ot.G), [, Kt] = k(Y), So = j || L || Kt || As || Y, [Yn, Xn] = So ? F(Y) : B();
    return Gt && (Vt && ie(ot.G), ce && K && et(c, ce(ot, te, K(ot, jt, Cs)))), y(!1), zs(r, it, ns, qt), zs(o, Qs, ns, qt), re(e, {
      G: Dt,
      Vt: {
        x: _e.w,
        y: _e.h
      },
      Rt: {
        x: Le.w,
        y: Le.h
      },
      en: Ue,
      Pt: Br(Yn, Le)
    }), {
      nn: Vt,
      Zt: Me,
      tn: yt,
      sn: Xn || yt,
      dn: So
    };
  };
}, wa = (t) => {
  const [e, s, r] = _a(t), o = {
    cn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    un: !1,
    rt: {
      [Bt]: 0,
      [kt]: 0,
      [Rt]: 0,
      [ro]: 0,
      [Lt]: 0,
      [Ht]: 0,
      [Ot]: 0
    },
    Vt: {
      x: 0,
      y: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    G: {
      x: ft,
      y: ft
    },
    en: {
      x: !1,
      y: !1
    },
    Pt: kn()
  }, { vt: c, gt: i, nt: d } = e, { R: l, M: u } = We(), h = !l && (u.x || u.y), f = [ba(e), xa(e, o), ya(e, o)];
  return [s, (v) => {
    const m = {}, w = h && He(i);
    return ae(f, (x) => {
      re(m, x(v, m) || {});
    }), Ie(i, w), !d && Ie(c, 0), m;
  }, o, e, r];
}, ka = (t, e, s, r, o) => {
  const c = jo(e, {}), [i, d, l, u, h] = wa(t), [f, v, m] = ha(u, l, c, (O) => {
    y({}, O);
  }), [g, w, , x] = ga(t, e, m, l, u, o), $ = (O) => Ke(O).some((R) => !!O[R]), y = (O, R) => {
    if (s())
      return !1;
    const { fn: I, Tt: D, At: T, pn: V } = O, A = I || {}, C = !!D, S = {
      It: jo(e, A, C),
      fn: A,
      Tt: C
    };
    if (V)
      return w(S), !1;
    const M = R || v(re({}, S, {
      At: T
    })), E = d(re({}, S, {
      an: m,
      Gt: M
    }));
    w(re({}, S, {
      Gt: M,
      Qt: E
    }));
    const k = $(M), F = $(E), B = k || F || !lo(A) || C;
    return B && r(O, {
      Gt: M,
      Qt: E
    }), B;
  };
  return [() => {
    const { rn: O, gt: R } = u, I = He(O), D = [f(), i(), g()];
    return Ie(R, I), X(Ne, D);
  }, y, () => ({
    vn: m,
    hn: l
  }), {
    gn: u,
    bn: x
  }, h];
}, ut = (t, e, s) => {
  const { N: r } = We(), o = ds(t), c = o ? t : t.target, i = Dn(c);
  if (e && !i) {
    let d = !1;
    const l = [], u = {}, h = (C) => {
      const S = hn(C), M = zt(ia);
      return M ? M(S, !0) : S;
    }, f = re({}, r(), h(e)), [v, m, g] = Js(), [w, x, $] = Js(s), y = (C, S) => {
      $(C, S), g(C, S);
    }, [O, R, I, D, T] = ka(t, f, () => d, ({ fn: C, Tt: S }, { Gt: M, Qt: E }) => {
      const { ft: k, Ct: F, xt: B, Ht: oe, Et: de, dt: ie } = M, { Zt: N, tn: Z, nn: te, sn: Y } = E;
      y("updated", [A, {
        updateHints: {
          sizeChanged: !!k,
          directionChanged: !!F,
          heightIntrinsicChanged: !!B,
          overflowEdgeChanged: !!N,
          overflowAmountChanged: !!Z,
          overflowStyleChanged: !!te,
          scrollCoordinatesChanged: !!Y,
          contentMutation: !!oe,
          hostMutation: !!de,
          appear: !!ie
        },
        changedOptions: C || {},
        force: !!S
      }]);
    }, (C) => y("scroll", [A, C])), V = (C) => {
      ra(c), Ne(l), d = !0, y("destroyed", [A, C]), m(), x();
    }, A = {
      options(C, S) {
        if (C) {
          const M = S ? r() : {}, E = $n(f, re(M, h(C)));
          lo(E) || (re(f, E), R({
            fn: E
          }));
        }
        return re({}, f);
      },
      on: w,
      off: (C, S) => {
        C && S && x(C, S);
      },
      state() {
        const { vn: C, hn: S } = I(), { ct: M } = C, { Vt: E, Rt: k, G: F, en: B, cn: oe, un: de, Pt: ie } = S;
        return re({}, {
          overflowEdge: E,
          overflowAmount: k,
          overflowStyle: F,
          hasOverflow: B,
          scrollCoordinates: {
            start: ie.T,
            end: ie.D
          },
          padding: oe,
          paddingAbsolute: de,
          directionRTL: M,
          destroyed: d
        });
      },
      elements() {
        const { vt: C, ht: S, cn: M, ot: E, bt: k, gt: F, Kt: B } = D.gn, { Ft: oe, Wt: de } = D.bn, ie = (Z) => {
          const { Mt: te, kt: Y, Lt: ue } = Z;
          return {
            scrollbar: ue,
            track: Y,
            handle: te
          };
        }, N = (Z) => {
          const { jt: te, Xt: Y } = Z, ue = ie(te[0]);
          return re({}, ue, {
            clone: () => {
              const P = ie(Y());
              return R({
                pn: !0
              }), P;
            }
          });
        };
        return re({}, {
          target: C,
          host: S,
          padding: M || E,
          viewport: E,
          content: k || E,
          scrollOffsetElement: F,
          scrollEventElement: B,
          scrollbarHorizontal: N(oe),
          scrollbarVertical: N(de)
        });
      },
      update: (C) => R({
        Tt: C,
        At: !0
      }),
      destroy: X(V, !1),
      plugin: (C) => u[Ke(C)[0]]
    };
    return be(l, [T]), na(c, A), On(Vn, ut, [A, v, u]), oa(D.gn.yt, !o && t.cancel) ? (V(!0), A) : (be(l, O()), y("initialized", [A]), A.update(!0), A);
  }
  return i;
};
ut.plugin = (t) => {
  const e = Ge(t), s = e ? t : [t], r = s.map((o) => On(o, ut)[0]);
  return la(s), e ? r : r[0];
};
ut.valid = (t) => {
  const e = t && t.elements, s = Re(e) && e();
  return cs(s) && !!Dn(s.target);
};
ut.env = () => {
  const { k: t, M: e, R: s, V: r, B: o, F: c, P: i, U: d, N: l, q: u } = We();
  return re({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: s,
    scrollTimeline: r,
    staticDefaultInitialization: o,
    staticDefaultOptions: c,
    getDefaultInitialization: i,
    setDefaultInitialization: d,
    getDefaultOptions: l,
    setDefaultOptions: u
  });
};
function $a() {
  let t;
  const e = H(null), s = Math.floor(Math.random() * 2 ** 32), r = H(!1), o = H([]), c = () => o.value, i = () => t.getSelection(), d = () => o.value.length, l = () => t.clearSelection(!0), u = H();
  function h() {
    t = new dr({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: w, event: x, isDragging: $ }) => {
      if ($)
        t.Interaction._reset(x);
      else {
        r.value = !1;
        const y = e.value.offsetWidth - x.offsetX, O = e.value.offsetHeight - x.offsetY;
        y < 15 && O < 15 && t.Interaction._reset(x), x.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(x);
      }
    }), document.addEventListener("dragleave", (w) => {
      !w.buttons && r.value && (r.value = !1);
    });
  }
  const f = () => vt(() => {
    t.addSelection(
      t.getSelectables()
    ), v();
  }), v = () => {
    o.value = t.getSelection().map((w) => JSON.parse(w.dataset.item)), u.value(o.value);
  }, m = () => vt(() => {
    const w = c().map((x) => x.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), t.addSelection(
      t.getSelectables().filter((x) => w.includes(JSON.parse(x.dataset.item).path))
    ), v();
  }), g = (w) => {
    u.value = w, t.subscribe("DS:end", ({ items: x, event: $, isDragging: y }) => {
      o.value = x.map((O) => JSON.parse(O.dataset.item)), w(x.map((O) => JSON.parse(O.dataset.item)));
    });
  };
  return Ce(() => {
    ut({
      target: e.value.parentElement,
      elements: {
        viewport: e.value
      }
    }, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: ut,
        ScrollbarsHidingPlugin: ua,
        SizeObserverPlugin: ca,
        ClickScrollPlugin: ma
      }
    }, {}), h();
  }), so(() => {
    t && t.stop();
  }), tn(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: s,
    isDraggingRef: r,
    getSelected: c,
    getSelection: i,
    selectAll: f,
    clearSelection: l,
    refreshSelection: m,
    getCount: d,
    onSelect: g
  };
}
function Sa(t, e) {
  const s = H(t), r = H(e), o = H([]), c = H([]), i = H([]), d = H(!1), l = H(5);
  let u = !1, h = !1;
  const f = Pt({
    adapter: s,
    storages: [],
    dirname: r,
    files: []
  });
  function v() {
    let y = [], O = [], R = r.value ?? s.value + "://";
    R.length === 0 && (o.value = []), R.replace(s.value + "://", "").split("/").forEach(function(T) {
      y.push(T), y.join("/") !== "" && O.push({
        basename: T,
        name: T,
        path: s.value + "://" + y.join("/"),
        type: "dir"
      });
    }), c.value = O;
    const [I, D] = g(O, l.value);
    i.value = D, o.value = I;
  }
  function m(y) {
    l.value = y, v();
  }
  function g(y, O) {
    return y.length > O ? [y.slice(-O), y.slice(0, -O)] : [y, []];
  }
  function w(y = null) {
    d.value = y ?? !d.value;
  }
  function x() {
    return o.value && o.value.length && !h;
  }
  const $ = tt(() => {
    var y;
    return ((y = o.value[o.value.length - 2]) == null ? void 0 : y.path) ?? s.value + "://";
  });
  return Ce(() => {
  }), pt(r, v), Ce(v), {
    adapter: s,
    path: r,
    loading: u,
    searchMode: h,
    data: f,
    breadcrumbs: o,
    breadcrumbItems: c,
    limitBreadcrumbItems: m,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: w,
    isGoUpAvailable: x,
    parentFolderPath: $
  };
}
const Ca = (t, e) => {
  const s = gr(t.id), r = cr(), o = s.getStore("metricUnits", !1), c = kr(s, t.theme), i = e.i18n, d = t.locale ?? e.locale, l = s.getStore("adapter"), u = (v) => Array.isArray(v) ? v : xr, h = s.getStore("persist-path", t.persist), f = h ? s.getStore("path", t.path) : t.path;
  return Pt({
    /** 
    * Core properties
    * */
    // app version
    version: yr,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: r,
    // storage
    storage: s,
    // localization object
    i18n: tt(() => br(s, d, r, i)),
    // modal state
    modal: $r(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: tt(() => $a()),
    // http object
    requester: vr(t.request),
    // active features
    features: u(t.features),
    // view state
    view: s.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: s.getStore("full-screen", t.fullScreen),
    // show tree view
    showTreeView: s.getStore("show-tree-view", t.showTreeView),
    // pinnedFolders
    pinnedFolders: s.getStore("pinned-folders", t.pinnedFolders),
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
    metricUnits: o,
    // human readable file sizes
    filesize: o ? rn : nn,
    // show large icons in list view
    compactListView: s.getStore("compact-list-view", !0),
    // persist state
    persist: h,
    // show thumbnails
    showThumbnails: s.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: Sa(l, f)
  });
}, Ea = /* @__PURE__ */ n("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), Aa = { class: "fixed z-10 inset-0 overflow-hidden" }, Ma = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Ta = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Ye = {
  __name: "ModalLayout",
  setup(t) {
    const e = H(null), s = le("ServiceContainer");
    return Ce(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), vt(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const o = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: o,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (r, o) => (p(), _("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = At((c) => a(s).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      Ea,
      n("div", Aa, [
        n("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: o[0] || (o[0] = lt((c) => a(s).modal.close(), ["self"]))
        }, [
          n("div", {
            ref_key: "modalBody",
            ref: e,
            class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl w-full"
          }, [
            n("div", Ma, [
              It(r.$slots, "default")
            ]),
            n("div", Ta, [
              It(r.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Da = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [r, o] of e)
    s[r] = o;
  return s;
}, Va = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: s }) {
    const r = le("ServiceContainer"), o = H(!1), { t: c } = r.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), o.value = !0, i = setTimeout(() => {
        o.value = !1;
      }, 2e3);
    };
    return Ce(() => {
      r.emitter.on(t.on, d);
    }), so(() => {
      clearTimeout(i);
    }), {
      shown: o,
      t: c
    };
  }
}, La = { key: 1 };
function Oa(t, e, s, r, o, c) {
  return p(), _("div", {
    class: fe(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !r.shown }]])
  }, [
    t.$slots.default ? It(t.$slots, "default", { key: 0 }) : (p(), _("span", La, b(r.t("Saved.")), 1))
  ], 2);
}
const wt = /* @__PURE__ */ Da(Va, [["render", Oa]]), Ha = { class: "sm:flex sm:items-start select-none" }, Ra = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    }),
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ])
], -1), Ba = { class: "mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full" }, Fa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ia = {
  class: "flex",
  "aria-label": "Tabs"
}, Na = ["onClick", "aria-current"], Ua = {
  key: 0,
  class: "mt-4"
}, Pa = { class: "m-1 text-sm text-gray-500" }, za = {
  href: "https://vuefinder.ozdemir.be",
  class: "block mt-2 text-sm text-blue-500 dark:text-blue-400",
  target: "_blank"
}, ja = {
  href: "https://github.com/n1crack/vuefinder",
  class: "block mt-2 text-sm text-blue-500 dark:text-blue-400",
  target: "_blank"
}, qa = {
  key: 1,
  class: "mt-2"
}, Ga = { class: "m-1 text-sm text-gray-500" }, Ka = { class: "mt-3 text-left" }, Wa = { class: "space-y-2" }, Ya = { class: "flex relative gap-x-3" }, Xa = { class: "h-6 items-center" }, Ja = { class: "flex-1 block text-sm" }, Qa = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, Za = { class: "flex relative gap-x-3" }, el = { class: "h-6 items-center" }, tl = { class: "flex-1 block text-sm" }, sl = {
  for: "large_icons",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, ol = { class: "flex relative gap-x-3" }, nl = { class: "h-6 items-center" }, rl = { class: "flex-1 block text-sm" }, al = {
  for: "persist_path",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, ll = { class: "flex relative gap-x-3" }, il = { class: "h-6 items-center" }, cl = { class: "flex-1 block text-sm" }, dl = {
  for: "show_thumbnails",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, ul = { class: "" }, ml = { class: "h-6 items-center" }, fl = {
  for: "theme",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, hl = { class: "flex text-sm" }, pl = ["label"], vl = ["value"], gl = {
  key: 0,
  class: ""
}, _l = { class: "h-6 items-center" }, bl = {
  for: "language",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm text-nowrap"
}, xl = { class: "flex text-sm" }, yl = ["label"], wl = ["value"], kl = {
  key: 2,
  class: "mt-3"
}, $l = { class: "space-y-2 sm:w-1/2" }, Sl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Cl = /* @__PURE__ */ n("kbd", null, "F2", -1), El = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Al = /* @__PURE__ */ n("kbd", null, "F5", -1), Ml = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Tl = /* @__PURE__ */ n("kbd", null, "Del", -1), Dl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Vl = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Esc")
], -1), Ll = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Ol = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Ctrl"),
  /* @__PURE__ */ ee(" + "),
  /* @__PURE__ */ n("kbd", null, "A")
], -1), Hl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Rl = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Ctrl"),
  /* @__PURE__ */ ee(" + "),
  /* @__PURE__ */ n("kbd", null, "F")
], -1), Bl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Fl = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Ctrl"),
  /* @__PURE__ */ ee(" + "),
  /* @__PURE__ */ n("kbd", null, "E")
], -1), Il = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Nl = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Ctrl"),
  /* @__PURE__ */ ee(" + "),
  /* @__PURE__ */ n("kbd", null, ",")
], -1), Ul = {
  key: 3,
  class: "mt-3"
}, Pl = { class: "m-1 text-sm text-gray-500" }, In = {
  __name: "ModalAbout",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: s, clearStore: r } = e.storage, { t: o, changeLocale: c, locale: i } = e.i18n, d = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, l = tt(() => [
      { name: o("About"), key: d.ABOUT },
      { name: o("Settings"), key: d.SETTINGS },
      { name: o("Shortcuts"), key: d.SHORTCUTS },
      { name: o("Reset"), key: d.RESET }
    ]), u = H("about"), h = async () => {
      r(), location.reload();
    }, f = (R) => {
      e.theme.set(R), e.emitter.emit("vf-theme-saved");
    }, v = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? rn : nn, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, m = () => {
      e.compactListView = !e.compactListView, s("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, g = () => {
      e.showThumbnails = !e.showThumbnails, s("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, w = () => {
      e.persist = !e.persist, s("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: x } = le("VueFinderOptions"), y = Object.fromEntries(
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
      }).filter(([R]) => Object.keys(x).includes(R))
    ), O = tt(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return (R, I) => (p(), J(Ye, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: I[8] || (I[8] = (D) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(a(o)("Close")), 1)
      ]),
      default: se(() => [
        n("div", Ha, [
          Ra,
          n("div", Ba, [
            n("h3", Fa, b("Vuefinder " + a(e).version), 1),
            n("div", null, [
              n("div", null, [
                n("nav", Ia, [
                  (p(!0), _(he, null, $e(l.value, (D) => (p(), _("button", {
                    key: D.name,
                    onClick: (T) => u.value = D.key,
                    class: fe([D.key === u.value ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-sky-500" : "text-gray-500 dark:text-gray-500 hover:text-gray-700 border-gray-300 dark:border-gray-600", "px-3 py-2 border-b font-medium text-sm"]),
                    "aria-current": D.current ? "page" : void 0
                  }, b(D.name), 11, Na))), 128))
                ])
              ])
            ]),
            u.value === d.ABOUT ? (p(), _("div", Ua, [
              n("div", Pa, b(a(o)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              n("a", za, b(a(o)("Project home")), 1),
              n("a", ja, b(a(o)("Follow on GitHub")), 1)
            ])) : z("", !0),
            u.value === d.SETTINGS ? (p(), _("div", qa, [
              n("div", Ga, b(a(o)("Customize your experience with the following settings.")), 1),
              n("div", Ka, [
                n("fieldset", null, [
                  n("div", Wa, [
                    n("div", Ya, [
                      n("div", Xa, [
                        ve(n("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": I[0] || (I[0] = (D) => a(e).metricUnits = D),
                          onClick: v,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Qt, a(e).metricUnits]
                        ])
                      ]),
                      n("div", Ja, [
                        n("label", Qa, [
                          ee(b(a(o)("Use Metric Units")) + " ", 1),
                          W(wt, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: se(() => [
                              ee(b(a(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    n("div", Za, [
                      n("div", el, [
                        ve(n("input", {
                          id: "large_icons",
                          name: "large_icons",
                          type: "checkbox",
                          "onUpdate:modelValue": I[1] || (I[1] = (D) => a(e).compactListView = D),
                          onClick: m,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Qt, a(e).compactListView]
                        ])
                      ]),
                      n("div", tl, [
                        n("label", sl, [
                          ee(b(a(o)("Compact list view")) + " ", 1),
                          W(wt, {
                            class: "ms-3",
                            on: "vf-compact-view-saved"
                          }, {
                            default: se(() => [
                              ee(b(a(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    n("div", ol, [
                      n("div", nl, [
                        ve(n("input", {
                          id: "persist_path",
                          name: "persist_path",
                          type: "checkbox",
                          "onUpdate:modelValue": I[2] || (I[2] = (D) => a(e).persist = D),
                          onClick: w,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Qt, a(e).persist]
                        ])
                      ]),
                      n("div", rl, [
                        n("label", al, [
                          ee(b(a(o)("Persist path on reload")) + " ", 1),
                          W(wt, {
                            class: "ms-3",
                            on: "vf-persist-path-saved"
                          }, {
                            default: se(() => [
                              ee(b(a(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    n("div", ll, [
                      n("div", il, [
                        ve(n("input", {
                          id: "show_thumbnails",
                          name: "show_thumbnails",
                          type: "checkbox",
                          "onUpdate:modelValue": I[3] || (I[3] = (D) => a(e).showThumbnails = D),
                          onClick: g,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Qt, a(e).showThumbnails]
                        ])
                      ]),
                      n("div", cl, [
                        n("label", dl, [
                          ee(b(a(o)("Show thumbnails")) + " ", 1),
                          W(wt, {
                            class: "ms-3",
                            on: "vf-show-thumbnails-saved"
                          }, {
                            default: se(() => [
                              ee(b(a(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    n("div", ul, [
                      n("div", ml, [
                        n("label", fl, b(a(o)("Theme")), 1)
                      ]),
                      n("div", hl, [
                        ve(n("select", {
                          id: "theme",
                          "onUpdate:modelValue": I[4] || (I[4] = (D) => a(e).theme.value = D),
                          onChange: I[5] || (I[5] = (D) => f(D.target.value)),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          n("optgroup", {
                            label: a(o)("Theme")
                          }, [
                            (p(!0), _(he, null, $e(O.value, (D, T) => (p(), _("option", { value: T }, b(D), 9, vl))), 256))
                          ], 8, pl)
                        ], 544), [
                          [Rs, a(e).theme.value]
                        ]),
                        W(wt, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-theme-saved"
                        }, {
                          default: se(() => [
                            ee(b(a(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    a(e).features.includes(a(pe).LANGUAGE) && Object.keys(a(y)).length > 1 ? (p(), _("div", gl, [
                      n("div", _l, [
                        n("label", bl, b(a(o)("Language")), 1)
                      ]),
                      n("div", xl, [
                        ve(n("select", {
                          id: "language",
                          "onUpdate:modelValue": I[6] || (I[6] = (D) => sn(i) ? i.value = D : null),
                          onChange: I[7] || (I[7] = (D) => a(c)(D.target.value)),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          n("optgroup", {
                            label: a(o)("Language")
                          }, [
                            (p(!0), _(he, null, $e(a(y), (D, T) => (p(), _("option", { value: T }, b(D), 9, wl))), 256))
                          ], 8, yl)
                        ], 544), [
                          [Rs, a(i)]
                        ]),
                        W(wt, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: se(() => [
                            ee(b(a(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : z("", !0)
                  ])
                ])
              ])
            ])) : z("", !0),
            u.value === d.SHORTCUTS ? (p(), _("div", kl, [
              n("div", $l, [
                n("div", Sl, [
                  n("div", null, b(a(o)("Rename")), 1),
                  Cl
                ]),
                n("div", El, [
                  n("div", null, b(a(o)("Refresh")), 1),
                  Al
                ]),
                n("div", Ml, [
                  ee(b(a(o)("Delete")) + " ", 1),
                  Tl
                ]),
                n("div", Dl, [
                  ee(b(a(o)("Escape")) + " ", 1),
                  Vl
                ]),
                n("div", Ll, [
                  ee(b(a(o)("Select All")) + " ", 1),
                  Ol
                ]),
                n("div", Hl, [
                  ee(b(a(o)("Search")) + " ", 1),
                  Rl
                ]),
                n("div", Bl, [
                  ee(b(a(o)("Toggle Sidebar")) + " ", 1),
                  Fl
                ]),
                n("div", Il, [
                  ee(b(a(o)("Open Settings")) + " ", 1),
                  Nl
                ])
              ])
            ])) : z("", !0),
            u.value === d.RESET ? (p(), _("div", Ul, [
              n("div", Pl, b(a(o)("Reset all settings to default")), 1),
              n("button", {
                onClick: h,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(a(o)("Reset Settings")), 1)
            ])) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, zl = ["aria-label"], jl = /* @__PURE__ */ n("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ n("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), ql = [
  jl
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
    const s = e, r = le("ServiceContainer"), { t: o } = r.i18n, c = H(!1), i = H(null), d = H((u = i.value) == null ? void 0 : u.strMessage);
    pt(d, () => c.value = !1);
    const l = () => {
      s("hidden"), c.value = !0;
    };
    return (h, f) => (p(), _("div", null, [
      c.value ? z("", !0) : (p(), _("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: fe(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", t.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        It(h.$slots, "default"),
        n("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          "aria-label": a(o)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, ql, 8, zl)
      ], 2))
    ]));
  }
}, Gl = { class: "sm:flex sm:items-start" }, Kl = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Wl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Yl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Xl = { class: "mt-2" }, Jl = { class: "text-sm text-gray-500" }, Ql = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Zl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ei = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ti = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), si = [
  ti
], oi = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ni = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ri = [
  ni
], ai = { class: "ml-1.5" }, li = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, wo = {
  __name: "ModalDelete",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = H(e.modal.data.items), o = H(""), c = () => {
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
          e.emitter.emit("vf-toast-push", { label: s("Files deleted.") });
        },
        onError: (i) => {
          o.value = s(i.message);
        }
      });
    };
    return (i, d) => (p(), J(Ye, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, b(a(s)("Yes, Delete!")), 1),
        n("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(a(s)("Cancel")), 1),
        n("div", li, b(a(s)("This action cannot be undone.")), 1)
      ]),
      default: se(() => [
        n("div", Gl, [
          Kl,
          n("div", Wl, [
            n("h3", Yl, b(a(s)("Delete files")), 1),
            n("div", Xl, [
              n("p", Jl, b(a(s)("Are you sure you want to delete these files?")), 1),
              n("div", Ql, [
                (p(!0), _(he, null, $e(r.value, (l) => (p(), _("p", Zl, [
                  l.type === "dir" ? (p(), _("svg", ei, si)) : (p(), _("svg", oi, ri)),
                  n("span", ai, b(l.basename), 1)
                ]))), 256))
              ]),
              o.value.length ? (p(), J(Xe, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(b(o.value), 1)
                ]),
                _: 1
              })) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ii = { class: "sm:flex sm:items-start" }, ci = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), di = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ui = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, mi = { class: "mt-2" }, fi = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, hi = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pi = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), vi = [
  pi
], gi = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, _i = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), bi = [
  _i
], xi = { class: "ml-1.5" }, ko = {
  __name: "ModalRename",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = H(e.modal.data.items[0]), o = H(e.modal.data.items[0].basename), c = H(""), i = () => {
      o.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: r.value.path,
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is renamed.", o.value) });
        },
        onError: (d) => {
          c.value = s(d.message);
        }
      });
    };
    return (d, l) => (p(), J(Ye, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(a(s)("Rename")), 1),
        n("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        n("div", ii, [
          ci,
          n("div", di, [
            n("h3", ui, b(a(s)("Rename")), 1),
            n("div", mi, [
              n("p", fi, [
                r.value.type === "dir" ? (p(), _("svg", hi, vi)) : (p(), _("svg", gi, bi)),
                n("span", xi, b(r.value.basename), 1)
              ]),
              ve(n("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => o.value = u),
                onKeyup: At(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Mt, o.value]
              ]),
              c.value.length ? (p(), J(Xe, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(b(c.value), 1)
                ]),
                _: 1
              })) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, rt = {
  ESCAPE: "Escape",
  F2: "F2",
  F5: "F5",
  DELETE: "Delete",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF"
};
function yi(t) {
  const e = (s) => {
    s.code === rt.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (s.code === rt.F2 && t.features.includes(pe.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(ko, { items: t.dragSelect.getSelected() })), s.code === rt.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), s.code === rt.DELETE && (!t.dragSelect.getCount() || t.modal.open(wo, { items: t.dragSelect.getSelected() })), s.metaKey && s.code === rt.BACKSLASH && t.modal.open(In), s.metaKey && s.code === rt.KEY_F && t.features.includes(pe.SEARCH) && (t.fs.searchMode = !0, s.preventDefault()), s.metaKey && s.code === rt.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), s.metaKey && s.code === rt.KEY_A && (t.dragSelect.selectAll(), s.preventDefault())));
  };
  Ce(() => {
    t.root.addEventListener("keydown", e);
  }), so(() => {
    t.root.removeEventListener("keydown", e);
  });
}
const wi = { class: "sm:flex sm:items-start" }, ki = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), $i = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Si = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ci = { class: "mt-2" }, Ei = { class: "text-sm text-gray-500" }, Ai = ["placeholder"], Nn = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = le("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = H(""), o = H(""), c = () => {
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
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", r.value) });
        },
        onError: (i) => {
          o.value = s(i.message);
        }
      });
    };
    return (i, d) => (p(), J(Ye, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(a(s)("Create")), 1),
        n("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        n("div", wi, [
          ki,
          n("div", $i, [
            n("h3", Si, b(a(s)("New Folder")), 1),
            n("div", Ci, [
              n("p", Ei, b(a(s)("Create a new folder")), 1),
              ve(n("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: At(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("Folder Name"),
                type: "text"
              }, null, 40, Ai), [
                [Mt, r.value]
              ]),
              o.value.length ? (p(), J(Xe, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(b(o.value), 1)
                ]),
                _: 1
              })) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Mi = { class: "sm:flex sm:items-start" }, Ti = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), Di = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Vi = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Li = { class: "mt-2" }, Oi = { class: "text-sm text-gray-500" }, Hi = ["placeholder"], Ri = {
  __name: "ModalNewFile",
  setup(t) {
    const e = le("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = H(""), o = H(""), c = () => {
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
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", r.value) });
        },
        onError: (i) => {
          o.value = s(i.message);
        }
      });
    };
    return (i, d) => (p(), J(Ye, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(a(s)("Create")), 1),
        n("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        n("div", Mi, [
          Ti,
          n("div", Di, [
            n("h3", Vi, b(a(s)("New File")), 1),
            n("div", Li, [
              n("p", Oi, b(a(s)("Create a new file")), 1),
              ve(n("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: At(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("File Name"),
                type: "text"
              }, null, 40, Hi), [
                [Mt, r.value]
              ]),
              o.value.length ? (p(), J(Xe, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(b(o.value), 1)
                ]),
                _: 1
              })) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function eo(t, e = 14) {
  let s = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(s), "$2..$4");
}
const Bi = { class: "sm:flex sm:items-start" }, Fi = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), Ii = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ni = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ui = { class: "mt-2" }, Pi = {
  key: 0,
  class: "pointer-events-none"
}, zi = {
  key: 1,
  class: "pointer-events-none"
}, ji = ["disabled"], qi = ["disabled"], Gi = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, Ki = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, Wi = ["textContent"], Yi = { class: "ml-1 w-full h-fit" }, Xi = { class: "text-left hidden md:block" }, Ji = { class: "text-left md:hidden" }, Qi = {
  key: 0,
  class: "ml-auto"
}, Zi = ["title", "disabled", "onClick"], ec = /* @__PURE__ */ n("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ n("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), tc = [
  ec
], sc = {
  key: 0,
  class: "py-2"
}, oc = ["disabled"], nc = {
  __name: "ModalUpload",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), o = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = H({ QUEUE_ENTRY_STATUS: o }), i = H(null), d = H(null), l = H(null), u = H(null), h = H(null), f = H(null), v = H([]), m = H(""), g = H(!1), w = H(!1);
    let x;
    function $(M) {
      return v.value.findIndex((E) => E.id === M);
    }
    function y(M, E = null) {
      E = E ?? (M.webkitRelativePath || M.name), x.addFile({
        name: E,
        type: M.type,
        data: M,
        source: "Local"
      });
    }
    function O(M) {
      switch (M.status) {
        case o.DONE:
          return "text-green-600";
        case o.ERROR:
          return "text-red-600";
        case o.CANCELED:
          return "text-red-600";
        case o.PENDING:
        default:
          return "";
      }
    }
    const R = (M) => {
      switch (M.status) {
        case o.DONE:
          return "✓";
        case o.ERROR:
        case o.CANCELED:
          return "!";
        case o.PENDING:
        default:
          return "...";
      }
    };
    function I() {
      u.value.click();
    }
    function D() {
      if (!g.value) {
        if (!v.value.filter((M) => M.status !== o.DONE).length) {
          m.value = s("Please select file to upload first.");
          return;
        }
        m.value = "", x.retryAll(), x.upload();
      }
    }
    function T() {
      x.cancelAll({ reason: "user" }), v.value.forEach((M) => {
        M.status !== o.DONE && (M.status = o.CANCELED, M.statusName = s("Canceled"));
      }), g.value = !1;
    }
    function V(M) {
      g.value || (x.removeFile(M.id, "removed-by-user"), v.value.splice($(M.id), 1));
    }
    function A(M) {
      if (!g.value) {
        if (x.cancelAll({ reason: "user" }), M) {
          const E = [];
          v.value.forEach((k) => {
            k.status !== o.DONE && E.push(k);
          }), v.value = [], E.forEach((k) => {
            y(k.originalFile, k.name);
          });
          return;
        }
        v.value.splice(0);
      }
    }
    function C() {
      e.modal.close();
    }
    function S() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Ce(async () => {
      x = new ur({
        debug: e.debug,
        restrictions: {
          maxFileSize: wr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(k, F) {
          if (F[k.id] != null) {
            const oe = $(k.id);
            v.value[oe].status === o.PENDING && (m.value = x.i18n("noDuplicates", { fileName: k.name })), v.value = v.value.filter((de) => de.id !== k.id);
          }
          return v.value.push({
            id: k.id,
            name: k.name,
            size: e.filesize(k.size),
            status: o.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: k.data
          }), !0;
        }
      }), x.use(mr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(k, F) {
          let B;
          try {
            B = JSON.parse(k).message;
          } catch {
            B = s("Cannot parse server response.");
          }
          return new Error(B);
        }
      }), x.on("restriction-failed", (k, F) => {
        const B = v.value[$(k.id)];
        V(B), m.value = F.message;
      }), x.on("upload", () => {
        const k = S();
        x.setMeta({ ...k.body });
        const F = x.getPlugin("XHRUpload");
        F.opts.method = k.method, F.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), F.opts.headers = k.headers, delete k.headers["Content-Type"], g.value = !0, v.value.forEach((B) => {
          B.status !== o.DONE && (B.percent = null, B.status = o.UPLOADING, B.statusName = s("Pending upload"));
        });
      }), x.on("upload-progress", (k, F) => {
        const B = Math.floor(F.bytesUploaded / F.bytesTotal * 100);
        v.value[$(k.id)].percent = `${B}%`;
      }), x.on("upload-success", (k) => {
        const F = v.value[$(k.id)];
        F.status = o.DONE, F.statusName = s("Done");
      }), x.on("upload-error", (k, F) => {
        const B = v.value[$(k.id)];
        B.percent = null, B.status = o.ERROR, F.isNetworkError ? B.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : B.statusName = F ? F.message : s("Unknown Error");
      }), x.on("error", (k) => {
        m.value = k.message, g.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), x.on("complete", () => {
        g.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), h.value.addEventListener("click", () => {
        l.value.click();
      }), f.value.addEventListener("dragover", (k) => {
        k.preventDefault(), w.value = !0;
      }), f.value.addEventListener("dragleave", (k) => {
        k.preventDefault(), w.value = !1;
      });
      function M(k, F) {
        F.isFile && F.file((B) => k(F, B)), F.isDirectory && F.createReader().readEntries((B) => {
          B.forEach((oe) => {
            M(k, oe);
          });
        });
      }
      f.value.addEventListener("drop", (k) => {
        k.preventDefault(), w.value = !1;
        const F = /^[/\\](.+)/;
        [...k.dataTransfer.items].forEach((B) => {
          B.kind === "file" && M((oe, de) => {
            const ie = F.exec(oe.fullPath);
            y(de, ie[1]);
          }, B.webkitGetAsEntry());
        });
      });
      const E = ({ target: k }) => {
        const F = k.files;
        for (const B of F)
          y(B);
        k.value = "";
      };
      d.value.addEventListener("change", E), l.value.addEventListener("change", E);
    }), on(() => {
      x == null || x.close({ reason: "unmount" });
    }), (M, E) => (p(), J(Ye, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          class: fe(["vf-btn vf-btn-primary", g.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: g.value,
          onClick: lt(D, ["prevent"])
        }, b(a(s)("Upload")), 11, oc),
        g.value ? (p(), _("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: lt(T, ["prevent"])
        }, b(a(s)("Cancel")), 1)) : (p(), _("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: lt(C, ["prevent"])
        }, b(a(s)("Close")), 1))
      ]),
      default: se(() => [
        n("div", Bi, [
          Fi,
          n("div", Ii, [
            n("h3", Ni, b(a(s)("Upload Files")), 1),
            n("div", Ui, [
              n("div", {
                ref_key: "dropArea",
                ref: f,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: I
              }, [
                w.value ? (p(), _("div", Pi, b(a(s)("Release to drop these files.")), 1)) : (p(), _("div", zi, b(a(s)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              n("div", {
                ref_key: "container",
                ref: i,
                class: "text-gray-500 mb-1"
              }, [
                n("button", {
                  ref_key: "pickFiles",
                  ref: u,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, b(a(s)("Select Files")), 513),
                n("button", {
                  ref_key: "pickFolders",
                  ref: h,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, b(a(s)("Select Folders")), 513),
                n("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: g.value,
                  onClick: E[0] || (E[0] = (k) => A(!1))
                }, b(a(s)("Clear all")), 9, ji),
                n("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: g.value,
                  onClick: E[1] || (E[1] = (k) => A(!0))
                }, b(a(s)("Clear only successful")), 9, qi)
              ], 512),
              n("div", Gi, [
                (p(!0), _(he, null, $e(v.value, (k) => (p(), _("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: k.id
                }, [
                  n("span", Ki, [
                    n("span", {
                      class: fe(["text-base m-auto", O(k)]),
                      textContent: b(R(k))
                    }, null, 10, Wi)
                  ]),
                  n("div", Yi, [
                    n("div", Xi, b(a(eo)(k.name, 40)) + " (" + b(k.size) + ")", 1),
                    n("div", Ji, b(a(eo)(k.name, 16)) + " (" + b(k.size) + ")", 1),
                    n("div", {
                      class: fe(["flex break-all text-left", O(k)])
                    }, [
                      ee(b(k.statusName) + " ", 1),
                      k.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (p(), _("b", Qi, b(k.percent), 1)) : z("", !0)
                    ], 2)
                  ]),
                  n("button", {
                    type: "button",
                    class: fe(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", g.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: a(s)("Delete"),
                    disabled: g.value,
                    onClick: (F) => V(k)
                  }, tc, 10, Zi)
                ]))), 128)),
                v.value.length ? z("", !0) : (p(), _("div", sc, b(a(s)("No files selected!")), 1))
              ]),
              m.value.length ? (p(), J(Xe, {
                key: 0,
                onHidden: E[2] || (E[2] = (k) => m.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(b(m.value), 1)
                ]),
                _: 1
              })) : z("", !0)
            ])
          ])
        ]),
        n("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        n("input", {
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
}, rc = { class: "sm:flex sm:items-start" }, ac = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), lc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ic = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, cc = { class: "mt-2" }, dc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, uc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mc = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), fc = [
  mc
], hc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pc = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), vc = [
  pc
], gc = { class: "ml-1.5" }, _c = { class: "my-1 text-sm text-gray-500" }, Un = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = H(e.modal.data.items[0]), o = H(""), c = H([]), i = () => {
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
          e.emitter.emit("vf-toast-push", { label: s("The file unarchived.") });
        },
        onError: (d) => {
          o.value = s(d.message);
        }
      });
    };
    return (d, l) => (p(), J(Ye, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(a(s)("Unarchive")), 1),
        n("button", {
          type: "button",
          onClick: l[1] || (l[1] = (u) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        n("div", rc, [
          ac,
          n("div", lc, [
            n("h3", ic, b(a(s)("Unarchive")), 1),
            n("div", cc, [
              (p(!0), _(he, null, $e(c.value, (u) => (p(), _("p", dc, [
                u.type === "dir" ? (p(), _("svg", uc, fc)) : (p(), _("svg", hc, vc)),
                n("span", gc, b(u.basename), 1)
              ]))), 256)),
              n("p", _c, b(a(s)("The archive will be unarchived at")) + " (" + b(a(e).fs.data.dirname) + ")", 1),
              o.value.length ? (p(), J(Xe, {
                key: 0,
                onHidden: l[0] || (l[0] = (u) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(b(o.value), 1)
                ]),
                _: 1
              })) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, bc = { class: "sm:flex sm:items-start" }, xc = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), yc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, wc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, kc = { class: "mt-2" }, $c = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Sc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Cc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ec = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ac = [
  Ec
], Mc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tc = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Dc = [
  Tc
], Vc = { class: "ml-1.5" }, Lc = ["placeholder"], Pn = {
  __name: "ModalArchive",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = H(""), o = H(""), c = H(e.modal.data.items), i = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: c.value.map(({ path: d, type: l }) => ({ path: d, type: l })),
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file(s) archived.") });
        },
        onError: (d) => {
          o.value = s(d.message);
        }
      });
    };
    return (d, l) => (p(), J(Ye, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(a(s)("Archive")), 1),
        n("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        n("div", bc, [
          xc,
          n("div", yc, [
            n("h3", wc, b(a(s)("Archive the files")), 1),
            n("div", kc, [
              n("div", $c, [
                (p(!0), _(he, null, $e(c.value, (u) => (p(), _("p", Sc, [
                  u.type === "dir" ? (p(), _("svg", Cc, Ac)) : (p(), _("svg", Mc, Dc)),
                  n("span", Vc, b(u.basename), 1)
                ]))), 256))
              ]),
              ve(n("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => r.value = u),
                onKeyup: At(i, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Lc), [
                [Mt, r.value]
              ]),
              o.value.length ? (p(), J(Xe, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(b(o.value), 1)
                ]),
                _: 1
              })) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Hc = /* @__PURE__ */ n("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Rc = [
  Hc
];
function Bc(t, e) {
  return p(), _("svg", Oc, [...Rc]);
}
const Fc = { render: Bc }, Ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Nc = /* @__PURE__ */ n("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Uc = [
  Nc
];
function Pc(t, e) {
  return p(), _("svg", Ic, [...Uc]);
}
const zc = { render: Pc }, jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, qc = /* @__PURE__ */ n("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), Gc = [
  qc
];
function Kc(t, e) {
  return p(), _("svg", jc, [...Gc]);
}
const Wc = { render: Kc }, Yc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Xc = /* @__PURE__ */ n("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), Jc = [
  Xc
];
function Qc(t, e) {
  return p(), _("svg", Yc, [...Jc]);
}
const Zc = { render: Qc }, ed = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, td = /* @__PURE__ */ n("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), sd = [
  td
];
function od(t, e) {
  return p(), _("svg", ed, [...sd]);
}
const nd = { render: od }, rd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ad = /* @__PURE__ */ n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), ld = [
  ad
];
function id(t, e) {
  return p(), _("svg", rd, [...ld]);
}
const cd = { render: id }, dd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ud = /* @__PURE__ */ n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), md = [
  ud
];
function fd(t, e) {
  return p(), _("svg", dd, [...md]);
}
const hd = { render: fd }, pd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, vd = /* @__PURE__ */ n("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), gd = /* @__PURE__ */ n("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), _d = [
  vd,
  gd
];
function bd(t, e) {
  return p(), _("svg", pd, [..._d]);
}
const $o = { render: bd }, xd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, yd = /* @__PURE__ */ n("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), wd = [
  yd
];
function kd(t, e) {
  return p(), _("svg", xd, [...wd]);
}
const $d = { render: kd }, Sd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Cd = /* @__PURE__ */ n("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), Ed = [
  Cd
];
function Ad(t, e) {
  return p(), _("svg", Sd, [...Ed]);
}
const Md = { render: Ad }, Td = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Dd = /* @__PURE__ */ n("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), Vd = [
  Dd
];
function Ld(t, e) {
  return p(), _("svg", Td, [...Vd]);
}
const Od = { render: Ld }, Hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Rd = /* @__PURE__ */ n("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), Bd = [
  Rd
];
function Fd(t, e) {
  return p(), _("svg", Hd, [...Bd]);
}
const Id = { render: Fd }, Nd = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm grow-0" }, Ud = {
  key: 0,
  class: "flex text-center"
}, Pd = ["aria-label"], zd = ["aria-label"], jd = ["aria-label"], qd = ["aria-label"], Gd = ["aria-label"], Kd = ["aria-label"], Wd = ["aria-label"], Yd = {
  key: 1,
  class: "flex text-center"
}, Xd = { class: "pl-2" }, Jd = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Qd = { class: "flex text-center items-center justify-end" }, Zd = ["aria-label"], eu = ["aria-label"], tu = {
  __name: "Toolbar",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, o = e.dragSelect, c = H("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen, e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", s("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    }, d = () => {
      e.view = e.view === "list" ? "grid" : "list", o.refreshSelection(), s("viewport", e.view);
    };
    return (l, u) => (p(), _("div", Nd, [
      c.value.length ? (p(), _("div", Yd, [
        n("div", Xd, [
          ee(b(a(r)("Search results for")) + " ", 1),
          n("span", Jd, b(c.value), 1)
        ]),
        a(e).fs.loading ? (p(), J(a($o), { key: 0 })) : z("", !0)
      ])) : (p(), _("div", Ud, [
        a(e).features.includes(a(pe).NEW_FOLDER) ? (p(), _("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": a(r)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: u[0] || (u[0] = (h) => a(e).modal.open(Nn, { items: a(o).getSelected() }))
        }, [
          W(a(Fc))
        ], 8, Pd)) : z("", !0),
        a(e).features.includes(a(pe).NEW_FILE) ? (p(), _("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": a(r)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[1] || (u[1] = (h) => a(e).modal.open(Ri, { items: a(o).getSelected() }))
        }, [
          W(a(zc))
        ], 8, zd)) : z("", !0),
        a(e).features.includes(a(pe).RENAME) ? (p(), _("div", {
          key: 2,
          class: "mx-1.5",
          "aria-label": a(r)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[2] || (u[2] = (h) => a(o).getCount() !== 1 || a(e).modal.open(ko, { items: a(o).getSelected() }))
        }, [
          W(a(Wc), {
            class: fe(a(o).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, jd)) : z("", !0),
        a(e).features.includes(a(pe).DELETE) ? (p(), _("div", {
          key: 3,
          class: "mx-1.5",
          "aria-label": a(r)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[3] || (u[3] = (h) => !a(o).getCount() || a(e).modal.open(wo, { items: a(o).getSelected() }))
        }, [
          W(a(Zc), {
            class: fe(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, qd)) : z("", !0),
        a(e).features.includes(a(pe).UPLOAD) ? (p(), _("div", {
          key: 4,
          class: "mx-1.5",
          "aria-label": a(r)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[4] || (u[4] = (h) => a(e).modal.open(nc, { items: a(o).getSelected() }))
        }, [
          W(a(nd))
        ], 8, Gd)) : z("", !0),
        a(e).features.includes(a(pe).UNARCHIVE) && a(o).getCount() === 1 && a(o).getSelected()[0].mime_type === "application/zip" ? (p(), _("div", {
          key: 5,
          class: "mx-1.5",
          "aria-label": a(r)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[5] || (u[5] = (h) => !a(o).getCount() || a(e).modal.open(Un, { items: a(o).getSelected() }))
        }, [
          W(a(hd), {
            class: fe(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Kd)) : z("", !0),
        a(e).features.includes(a(pe).ARCHIVE) ? (p(), _("div", {
          key: 6,
          class: "mx-1.5",
          "aria-label": a(r)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[6] || (u[6] = (h) => !a(o).getCount() || a(e).modal.open(Pn, { items: a(o).getSelected() }))
        }, [
          W(a(cd), {
            class: fe(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Wd)) : z("", !0)
      ])),
      n("div", Qd, [
        a(e).features.includes(a(pe).FULL_SCREEN) ? (p(), _("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          "aria-label": a(r)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip"
        }, [
          a(e).fullScreen ? (p(), J(a(Md), { key: 0 })) : (p(), J(a($d), { key: 1 }))
        ], 8, Zd)) : z("", !0),
        n("div", {
          class: "mx-1.5",
          "aria-label": a(r)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: u[7] || (u[7] = (h) => c.value.length || d())
        }, [
          a(e).view === "grid" ? (p(), J(a(Od), {
            key: 0,
            class: fe(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : z("", !0),
          a(e).view === "list" ? (p(), J(a(Id), {
            key: 1,
            class: fe(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : z("", !0)
        ], 8, eu)
      ])
    ]));
  }
}, su = (t, e = 0, s = !1) => {
  let r;
  return (...o) => {
    s && !r && t(...o), clearTimeout(r), r = setTimeout(() => {
      t(...o);
    }, e);
  };
}, Zo = (t, e, s) => {
  const r = H(t);
  return tr((o, c) => ({
    get() {
      return o(), r.value;
    },
    set: su(
      (i) => {
        r.value = i, c();
      },
      e,
      s
    )
  }));
}, ou = { class: "sm:flex sm:items-start" }, nu = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), ru = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, au = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, lu = { class: "text-sm text-gray-500 pb-1" }, iu = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, cu = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, du = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, uu = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), mu = [
  uu
], fu = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hu = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), pu = [
  hu
], vu = { class: "ml-1.5" }, gu = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, _u = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, bu = /* @__PURE__ */ n("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ n("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), xu = { class: "ml-1.5 overflow-auto" }, yu = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, to = {
  __name: "ModalMove",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = H(e.modal.data.items.from), o = H(""), c = () => {
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
          e.emitter.emit("vf-toast-push", { label: s("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (i) => {
          o.value = s(i.message);
        }
      });
    };
    return (i, d) => (p(), J(Ye, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(a(s)("Yes, Move!")), 1),
        n("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(a(s)("Cancel")), 1),
        n("div", yu, b(a(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: se(() => [
        n("div", ou, [
          nu,
          n("div", ru, [
            n("h3", au, b(a(s)("Move files")), 1),
            n("p", lu, b(a(s)("Are you sure you want to move these files?")), 1),
            n("div", iu, [
              (p(!0), _(he, null, $e(r.value, (l) => (p(), _("div", cu, [
                n("div", null, [
                  l.type === "dir" ? (p(), _("svg", du, mu)) : (p(), _("svg", fu, pu))
                ]),
                n("div", vu, b(l.path), 1)
              ]))), 256))
            ]),
            n("h4", gu, b(a(s)("Target Directory")), 1),
            n("p", _u, [
              bu,
              n("span", xu, b(a(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (p(), J(Xe, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => o.value = ""),
              error: ""
            }, {
              default: se(() => [
                ee(b(o.value), 1)
              ]),
              _: 1
            })) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, ku = /* @__PURE__ */ n("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), $u = [
  ku
];
function Su(t, e) {
  return p(), _("svg", wu, [...$u]);
}
const Cu = { render: Su }, Eu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, Au = /* @__PURE__ */ n("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), Mu = [
  Au
];
function Tu(t, e) {
  return p(), _("svg", Eu, [...Mu]);
}
const Du = { render: Tu }, Vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, Lu = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Ou = [
  Lu
];
function Hu(t, e) {
  return p(), _("svg", Vu, [...Ou]);
}
const Ru = { render: Hu }, Bu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, Fu = /* @__PURE__ */ n("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), Iu = [
  Fu
];
function Nu(t, e) {
  return p(), _("svg", Bu, [...Iu]);
}
const Uu = { render: Nu }, Pu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, zu = /* @__PURE__ */ n("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), ju = [
  zu
];
function qu(t, e) {
  return p(), _("svg", Pu, [...ju]);
}
const Gu = { render: qu }, Ku = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, Wu = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Yu = [
  Wu
];
function Xu(t, e) {
  return p(), _("svg", Ku, [...Yu]);
}
const Ju = { render: Xu }, Qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, Zu = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), e0 = [
  Zu
];
function t0(t, e) {
  return p(), _("svg", Qu, [...e0]);
}
const $s = { render: t0 }, s0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
}, o0 = /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), n0 = /* @__PURE__ */ n("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1), r0 = [
  o0,
  n0
];
function a0(t, e) {
  return p(), _("svg", s0, [...r0]);
}
const l0 = { render: a0 }, i0 = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, c0 = /* @__PURE__ */ n("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), d0 = [
  c0
];
function u0(t, e) {
  return p(), _("svg", i0, [...d0]);
}
const m0 = { render: u0 }, f0 = { class: "space-x-0.5 flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm grow-0" }, h0 = ["aria-label"], p0 = ["aria-label"], v0 = ["aria-label"], g0 = ["aria-label"], _0 = { class: "flex leading-6" }, b0 = {
  key: 0,
  class: "flex"
}, x0 = /* @__PURE__ */ n("div", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), y0 = { class: "relative" }, w0 = /* @__PURE__ */ n("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), k0 = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], $0 = { class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full" }, S0 = ["placeholder"], C0 = { class: "z-30 absolute top-[65px] md:top-[75px] left-[90px] rounded -mx-1.5 mt-1 bg-neutral-50 dark:bg-gray-800 max-w-80 max-h-50 shadow overflow-y-auto text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600" }, E0 = ["onDrop", "onClick"], A0 = { class: "flex pointer-events-none" }, M0 = { class: "inline-block w-full text-ellipsis overflow-hidden" }, T0 = {
  __name: "Breadcrumb",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = e.dragSelect, { setStore: o } = e.storage, c = H(null), i = Zo(0, 100);
    pt(i, (T) => {
      const V = c.value.children;
      let A = 0, C = 0, S = 5, M = 1;
      e.fs.limitBreadcrumbItems(S), vt(() => {
        for (let E = V.length - 1; E >= 0 && !(A + V[E].offsetWidth > i.value - 40); E--)
          A += parseInt(V[E].offsetWidth, 10), C++;
        C < M && (C = M), C > S && (C = S), e.fs.limitBreadcrumbItems(C);
      });
    });
    const d = () => {
      i.value = c.value.offsetWidth;
    };
    Ce(() => {
      new ResizeObserver(d).observe(c.value);
    });
    const l = (T, V = null) => {
      T.preventDefault(), r.isDraggingRef.value = !1, f(T), V ?? (V = e.fs.hiddenBreadcrumbs.length - 1);
      let A = JSON.parse(T.dataTransfer.getData("items"));
      if (A.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(to, {
        items: {
          from: A,
          to: e.fs.hiddenBreadcrumbs[V] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (T, V = null) => {
      T.preventDefault(), r.isDraggingRef.value = !1, f(T), V ?? (V = e.fs.breadcrumbs.length - 2);
      let A = JSON.parse(T.dataTransfer.getData("items"));
      if (A.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(to, {
        items: {
          from: A,
          to: e.fs.breadcrumbs[V] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, h = (T) => {
      T.preventDefault(), e.fs.isGoUpAvailable() ? (T.dataTransfer.dropEffect = "copy", T.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (T.dataTransfer.dropEffect = "none", T.dataTransfer.effectAllowed = "none");
    }, f = (T) => {
      T.preventDefault(), T.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && T.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, v = () => {
      I(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, m = () => {
      I(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, g = (T) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: T.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, w = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, x = {
      mounted(T, V, A, C) {
        T.clickOutsideEvent = function(S) {
          T === S.target || T.contains(S.target) || V.value();
        }, document.body.addEventListener("click", T.clickOutsideEvent);
      },
      beforeUnmount(T, V, A, C) {
        document.body.removeEventListener("click", T.clickOutsideEvent);
      }
    }, $ = () => {
      e.showTreeView = !e.showTreeView, o("show-tree-view", e.showTreeView);
    }, y = H(null), O = () => {
      e.features.includes(pe.SEARCH) && (e.fs.searchMode = !0, vt(() => y.value.focus()));
    }, R = Zo("", 400);
    pt(R, (T) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: T });
    }), pt(() => e.fs.searchMode, (T) => {
      T && vt(() => y.value.focus());
    });
    const I = () => {
      e.fs.searchMode = !1, R.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      I();
    });
    const D = () => {
      R.value === "" && I();
    };
    return (T, V) => (p(), _("div", f0, [
      n("span", {
        "aria-label": a(s)("Toggle Tree View"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        W(a(l0), {
          onClick: $,
          class: fe(["h-6 w-6 p-0.5 rounded cursor-pointer text-slate-700", a(e).showTreeView ? "bg-gray-300 dark:bg-gray-700" : ""])
        }, null, 8, ["class"])
      ], 8, h0),
      n("span", {
        "aria-label": a(s)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        W(a(Du), {
          onDragover: V[0] || (V[0] = (A) => h(A)),
          onDragleave: V[1] || (V[1] = (A) => f(A)),
          onDrop: V[2] || (V[2] = (A) => u(A)),
          onClick: m,
          class: fe(a(e).fs.isGoUpAvailable() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500")
        }, null, 8, ["class"])
      ], 8, p0),
      a(e).fs.loading ? (p(), _("span", {
        key: 1,
        "aria-label": a(s)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        W(a(Ru), {
          onClick: V[3] || (V[3] = (A) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, g0)) : (p(), _("span", {
        key: 0,
        "aria-label": a(s)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        W(a(Cu), { onClick: v })
      ], 8, v0)),
      ve(n("div", {
        onClick: lt(O, ["self"]),
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full overflow-hidden"
      }, [
        n("div", null, [
          W(a(Uu), {
            onDragover: V[4] || (V[4] = (A) => h(A)),
            onDragleave: V[5] || (V[5] = (A) => f(A)),
            onDrop: V[6] || (V[6] = (A) => u(A, -1)),
            onClick: V[7] || (V[7] = (A) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(e).fs.adapter } }))
          })
        ]),
        n("div", _0, [
          a(e).fs.hiddenBreadcrumbs.length ? ve((p(), _("div", b0, [
            x0,
            n("div", y0, [
              n("span", {
                onDragenter: V[8] || (V[8] = (A) => a(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: V[9] || (V[9] = (A) => a(e).fs.toggleHiddenBreadcrumbs()),
                class: "text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer"
              }, [
                W(a(m0), { class: "px-1 pointer-events-none" })
              ], 32)
            ])
          ])), [
            [x, w]
          ]) : z("", !0)
        ]),
        n("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "flex leading-6 w-full overflow-hidden",
          onClick: lt(O, ["self"])
        }, [
          (p(!0), _(he, null, $e(a(e).fs.breadcrumbs, (A, C) => (p(), _("div", { key: C }, [
            w0,
            n("span", {
              onDragover: (S) => C === a(e).fs.breadcrumbs.length - 1 || h(S),
              onDragleave: (S) => C === a(e).fs.breadcrumbs.length - 1 || f(S),
              onDrop: (S) => C === a(e).fs.breadcrumbs.length - 1 || u(S, C),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer whitespace-nowrap",
              title: A.basename,
              onClick: (S) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(e).fs.adapter, path: A.path } })
            }, b(A.name), 41, k0)
          ]))), 128))
        ], 512),
        a(e).fs.loading ? (p(), J(a($o), { key: 0 })) : z("", !0)
      ], 512), [
        [ze, !a(e).fs.searchMode]
      ]),
      ve(n("div", $0, [
        n("div", null, [
          W(a(Gu))
        ]),
        ve(n("input", {
          ref_key: "searchInput",
          ref: y,
          onKeydown: At(I, ["esc"]),
          onBlur: D,
          "onUpdate:modelValue": V[10] || (V[10] = (A) => sn(R) ? R.value = A : null),
          placeholder: a(s)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, S0), [
          [Mt, a(R)]
        ]),
        W(a(Ju), { onClick: I })
      ], 512), [
        [ze, a(e).fs.searchMode]
      ]),
      ve(n("div", C0, [
        (p(!0), _(he, null, $e(a(e).fs.hiddenBreadcrumbs, (A, C) => (p(), _("div", {
          key: C,
          onDragover: V[11] || (V[11] = (S) => h(S)),
          onDragleave: V[12] || (V[12] = (S) => f(S)),
          onDrop: (S) => l(S, C),
          onClick: (S) => g(A),
          class: "px-2 py-0.5 hover:bg-gray-400/20 cursor-pointer items-center whitespace-nowrap"
        }, [
          n("div", A0, [
            n("span", null, [
              W(a($s), { class: "h-5 w-5" })
            ]),
            ee(),
            n("span", M0, b(A.name), 1)
          ])
        ], 40, E0))), 128))
      ], 512), [
        [ze, a(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, zn = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), D0 = ["onClick"], V0 = {
  __name: "Toast",
  setup(t) {
    const e = le("ServiceContainer"), { getStore: s } = e.storage, r = H(s("full-screen", !1)), o = H([]), c = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (l) => {
      o.value.splice(l, 1);
    }, d = (l) => {
      let u = o.value.findIndex((h) => h.id === l);
      u !== -1 && i(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      o.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = u, o.value.push(l), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (l, u) => (p(), _("div", {
      class: fe([r.value.value ? "fixed" : "absolute", "max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2 z-10"])
    }, [
      W(sr, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: se(() => [
          (p(!0), _(he, null, $e(o.value, (h, f) => (p(), _("div", {
            onClick: (v) => i(f),
            key: h,
            class: fe([c(h.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, b(h.label), 11, D0))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, L0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, O0 = /* @__PURE__ */ n("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), H0 = [
  O0
];
function R0(t, e) {
  return p(), _("svg", L0, [...H0]);
}
const B0 = { render: R0 }, F0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, I0 = /* @__PURE__ */ n("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), N0 = [
  I0
];
function U0(t, e) {
  return p(), _("svg", F0, [...N0]);
}
const P0 = { render: U0 }, ts = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, s) => (p(), _("div", null, [
      t.direction === "asc" ? (p(), J(a(B0), { key: 0 })) : z("", !0),
      t.direction === "desc" ? (p(), J(a(P0), { key: 1 })) : z("", !0)
    ]));
  }
}, z0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, j0 = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), q0 = [
  j0
];
function G0(t, e) {
  return p(), _("svg", z0, [...q0]);
}
const K0 = { render: G0 }, Os = {
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
    return (e, s) => (p(), _("span", null, [
      t.type === "dir" ? (p(), J(a($s), {
        key: 0,
        class: fe({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"])) : (p(), J(a(K0), {
        key: 1,
        class: fe({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"]))
    ]));
  }
}, W0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, Y0 = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), X0 = [
  Y0
];
function J0(t, e) {
  return p(), _("svg", W0, [...X0]);
}
const Q0 = { render: J0 }, Z0 = { class: "absolute -z-50 -top-96" }, em = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, tm = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (s, r) => (p(), _("div", Z0, [
      W(a(Q0)),
      n("div", em, b(e.count), 1)
    ]));
  }
}, sm = { class: "flex" }, om = ["aria-label"], nm = { class: "ml-auto mb-2" }, rm = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, am = { key: 1 }, lm = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = H(""), o = H(""), c = H(null), i = H(!1), d = H(""), l = H(!1), u = le("ServiceContainer"), { t: h } = u.i18n;
    Ce(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((m) => {
        r.value = m, s("success");
      });
    });
    const f = () => {
      i.value = !i.value, o.value = r.value;
    }, v = () => {
      d.value = "", l.value = !1, u.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: u.modal.data.adapter,
          path: u.modal.data.item.path
        },
        body: {
          content: o.value
        },
        responseType: "text"
      }).then((m) => {
        d.value = h("Updated."), r.value = m, s("success"), i.value = !i.value;
      }).catch((m) => {
        d.value = h(m.message), l.value = !0;
      });
    };
    return (m, g) => (p(), _(he, null, [
      n("div", sm, [
        n("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a(u).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, b(a(u).modal.data.item.basename), 9, om),
        n("div", nm, [
          i.value ? (p(), _("button", {
            key: 0,
            onClick: v,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, b(a(h)("Save")), 1)) : z("", !0),
          a(u).features.includes(a(pe).EDIT) ? (p(), _("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: g[0] || (g[0] = (w) => f())
          }, b(i.value ? a(h)("Cancel") : a(h)("Edit")), 1)) : z("", !0)
        ])
      ]),
      n("div", null, [
        i.value ? (p(), _("div", am, [
          ve(n("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": g[1] || (g[1] = (w) => o.value = w),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh]",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Mt, o.value]
          ])
        ])) : (p(), _("pre", rm, b(r.value), 1)),
        d.value.length ? (p(), J(Xe, {
          key: 2,
          onHidden: g[2] || (g[2] = (w) => d.value = ""),
          error: l.value
        }, {
          default: se(() => [
            ee(b(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : z("", !0)
      ])
    ], 64));
  }
}, im = { class: "flex" }, cm = ["aria-label"], dm = { class: "ml-auto mb-2" }, um = { class: "w-full flex justify-center" }, mm = ["src"], fm = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = le("ServiceContainer"), { t: o } = r.i18n, c = H(null), i = H(null), d = H(!1), l = H(""), u = H(!1), h = () => {
      d.value = !d.value, d.value ? i.value = new hr(c.value, {
        crop(v) {
        }
      }) : i.value.destroy();
    }, f = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (v) => {
          l.value = "", u.value = !1;
          const m = new FormData();
          m.set("file", v), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: m
          }).then((g) => {
            l.value = o("Updated."), c.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), h(), s("success");
          }).catch((g) => {
            l.value = o(g.message), u.value = !0;
          });
        }
      );
    };
    return Ce(() => {
      s("success");
    }), (v, m) => (p(), _(he, null, [
      n("div", im, [
        n("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a(r).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, b(a(r).modal.data.item.basename), 9, cm),
        n("div", dm, [
          d.value ? (p(), _("button", {
            key: 0,
            onClick: f,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, b(a(o)("Crop")), 1)) : z("", !0),
          a(r).features.includes(a(pe).EDIT) ? (p(), _("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: m[0] || (m[0] = (g) => h())
          }, b(d.value ? a(o)("Cancel") : a(o)("Edit")), 1)) : z("", !0)
        ])
      ]),
      n("div", um, [
        n("img", {
          ref_key: "image",
          ref: c,
          class: "max-w-[50vh] max-h-[50vh]",
          src: a(r).requester.getPreviewUrl(a(r).modal.data.adapter, a(r).modal.data.item),
          alt: ""
        }, null, 8, mm)
      ]),
      l.value.length ? (p(), J(Xe, {
        key: 0,
        onHidden: m[1] || (m[1] = (g) => l.value = ""),
        error: u.value
      }, {
        default: se(() => [
          ee(b(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : z("", !0)
    ], 64));
  }
}, hm = { class: "flex" }, pm = ["aria-label"], vm = /* @__PURE__ */ n("div", null, null, -1), gm = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = le("ServiceContainer"), r = e;
    return Ce(() => {
      r("success");
    }), (o, c) => (p(), _(he, null, [
      n("div", hm, [
        n("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a(s).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, b(a(s).modal.data.item.basename), 9, pm)
      ]),
      vm
    ], 64));
  }
}, _m = ["aria-label"], bm = {
  class: "w-full aspect-video",
  preload: "",
  controls: ""
}, xm = ["src"], ym = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = le("ServiceContainer"), r = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ce(() => {
      r("success");
    }), (c, i) => (p(), _("div", null, [
      n("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": a(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, b(a(s).modal.data.item.basename), 9, _m),
      n("div", null, [
        n("video", bm, [
          n("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, xm),
          ee(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, wm = ["aria-label"], km = {
  class: "w-full",
  controls: ""
}, $m = ["src"], Sm = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = le("ServiceContainer"), o = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return Ce(() => {
      s("success");
    }), (c, i) => (p(), _(he, null, [
      n("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": a(r).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, b(a(r).modal.data.item.basename), 9, wm),
      n("div", null, [
        n("audio", km, [
          n("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, $m),
          ee(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, Cm = ["aria-label"], Em = ["data"], Am = ["src"], Mm = /* @__PURE__ */ n("p", null, [
  /* @__PURE__ */ ee(" Your browser does not support PDFs. "),
  /* @__PURE__ */ n("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ ee(" . ")
], -1), Tm = [
  Mm
], Dm = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = le("ServiceContainer"), r = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ce(() => {
      r("success");
    }), (c, i) => (p(), _(he, null, [
      n("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": a(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, b(a(s).modal.data.item.basename), 9, Cm),
      n("div", null, [
        n("object", {
          class: "h-[60vh]",
          data: o(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          n("iframe", {
            class: "border-0",
            src: o(),
            width: "100%",
            height: "100%"
          }, Tm, 8, Am)
        ], 8, Em)
      ])
    ], 64));
  }
}, Vm = { class: "sm:flex sm:items-start" }, Lm = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Om = { key: 0 }, Hm = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Rm = {
  key: 0,
  class: "flex leading-5"
}, Bm = /* @__PURE__ */ n("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ n("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ n("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), Fm = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, Im = { class: "font-bold" }, Nm = { class: "font-bold pl-2" }, Um = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
}, Pm = ["download", "href"], jn = {
  __name: "ModalPreview",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = H(!1), o = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(pe.PREVIEW);
    return c || (r.value = !0), (i, d) => (p(), J(Ye, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(a(s)("Close")), 1),
        a(e).features.includes(a(pe).DOWNLOAD) ? (p(), _("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item),
          href: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item)
        }, b(a(s)("Download")), 9, Pm)) : z("", !0)
      ]),
      default: se(() => [
        n("div", Vm, [
          n("div", Lm, [
            a(c) ? (p(), _("div", Om, [
              o("text") ? (p(), J(lm, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => r.value = !0)
              })) : o("image") ? (p(), J(fm, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => r.value = !0)
              })) : o("video") ? (p(), J(ym, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => r.value = !0)
              })) : o("audio") ? (p(), J(Sm, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => r.value = !0)
              })) : o("application/pdf") ? (p(), J(Dm, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => r.value = !0)
              })) : (p(), J(gm, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => r.value = !0)
              }))
            ])) : z("", !0),
            n("div", Hm, [
              r.value === !1 ? (p(), _("div", Rm, [
                Bm,
                n("span", null, b(a(s)("Loading")), 1)
              ])) : z("", !0)
            ])
          ])
        ]),
        n("div", Fm, [
          n("div", null, [
            n("span", Im, b(a(s)("File Size")) + ": ", 1),
            ee(b(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          n("div", null, [
            n("span", Nm, b(a(s)("Last Modified")) + ": ", 1),
            ee(" " + b(a(zn)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(e).features.includes(a(pe).DOWNLOAD) ? (p(), _("div", Um, [
          n("span", null, b(a(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : z("", !0)
      ]),
      _: 1
    }));
  }
}, zm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, jm = /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), qm = /* @__PURE__ */ n("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1), Gm = [
  jm,
  qm
];
function Km(t, e) {
  return p(), _("svg", zm, [...Gm]);
}
const qn = { render: Km }, Wm = ["data-type", "data-item", "data-index"], Hs = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = le("ServiceContainer"), s = e.dragSelect, r = t, o = (m) => {
      m.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: m.path } })) : e.modal.open(jn, { adapter: e.fs.adapter, item: m });
    }, c = {
      mounted(m, g, w, x) {
        w.props.draggable && (m.addEventListener("dragstart", ($) => i($, g.value)), m.addEventListener("dragover", ($) => l($, g.value)), m.addEventListener("drop", ($) => d($, g.value)));
      },
      beforeUnmount(m, g, w, x) {
        w.props.draggable && (m.removeEventListener("dragstart", i), m.removeEventListener("dragover", l), m.removeEventListener("drop", d));
      }
    }, i = (m, g) => {
      if (m.altKey || m.ctrlKey || m.metaKey)
        return m.preventDefault(), !1;
      s.isDraggingRef.value = !0, m.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), m.dataTransfer.effectAllowed = "all", m.dataTransfer.dropEffect = "copy", m.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, d = (m, g) => {
      m.preventDefault(), s.isDraggingRef.value = !1;
      let w = JSON.parse(m.dataTransfer.getData("items"));
      if (w.find((x) => x.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(to, { items: { from: w, to: g } });
    }, l = (m, g) => {
      m.preventDefault(), !g || g.type !== "dir" || s.getSelection().find((w) => w === m.currentTarget) ? (m.dataTransfer.dropEffect = "none", m.dataTransfer.effectAllowed = "none") : m.dataTransfer.dropEffect = "copy";
    };
    let u = null, h = !1;
    const f = () => {
      u && clearTimeout(u);
    }, v = (m) => {
      if (!h)
        h = !0, setTimeout(() => h = !1, 300);
      else
        return h = !1, o(r.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const g = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: m.target.getBoundingClientRect().x,
          clientY: m.target.getBoundingClientRect().y
        });
        m.target.dispatchEvent(g);
      }, 500);
    };
    return (m, g) => ve((p(), _("div", {
      style: fs({ opacity: a(s).isDraggingRef.value && a(s).getSelection().find((w) => m.$el === w) ? "0.5 !important" : "" }),
      class: fe(["vf-item-" + a(s).explorerId, "relative"]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: g[0] || (g[0] = (w) => o(t.item)),
      onTouchstart: g[1] || (g[1] = (w) => v(w)),
      onTouchend: g[2] || (g[2] = (w) => f()),
      onContextmenu: g[3] || (g[3] = lt((w) => a(e).emitter.emit("vf-contextmenu-show", { event: w, items: a(s).getSelected(), target: t.item }), ["prevent"]))
    }, [
      It(m.$slots, "default"),
      a(e).pinnedFolders.find((w) => w.path === t.item.path) ? (p(), J(a(qn), {
        key: 0,
        class: "absolute top-0 right-0 text-amber-600"
      })) : z("", !0)
    ], 46, Wm)), [
      [c, t.item]
    ]);
  }
}, Ym = { class: "relative flex-auto flex flex-col" }, Xm = {
  key: 0,
  class: "grid grid-cols-12 px-1 bg-neutral-50 dark:bg-gray-800 border-b border-neutral-300 dark:border-gray-700 text-xs select-none divide-x"
}, Jm = { class: "h-full" }, Qm = { class: "relative" }, Zm = { class: "grid grid-cols-12 items-center" }, e1 = { class: "flex col-span-7 items-center" }, t1 = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, s1 = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, o1 = { class: "grid grid-cols-12 items-center" }, n1 = { class: "flex col-span-7 items-center" }, r1 = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, a1 = { class: "col-span-2 text-center" }, l1 = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap px-1 md:px-3" }, i1 = { class: "relative" }, c1 = ["data-src", "alt"], d1 = {
  key: 2,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, u1 = { class: "break-all" }, m1 = {
  __name: "Explorer",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = (f) => f == null ? void 0 : f.substring(0, 3), o = H(null), c = H(""), i = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      i.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: f }) => {
      c.value = f, f ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: f
        },
        onSuccess: (v) => {
          v.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const l = Pt({ active: !1, column: "", order: "" }), u = (f = !0) => {
      let v = [...e.fs.data.files], m = l.column, g = l.order === "asc" ? 1 : -1;
      if (!f)
        return v;
      const w = (x, $) => typeof x == "string" && typeof $ == "string" ? x.toLowerCase().localeCompare($.toLowerCase()) : x < $ ? -1 : x > $ ? 1 : 0;
      return l.active && (v = v.slice().sort((x, $) => w(x[m], $[m]) * g)), v;
    }, h = (f) => {
      l.active && l.column === f ? (l.active = l.order === "asc", l.column = f, l.order = "desc") : (l.active = !0, l.column = f, l.order = "asc");
    };
    return Ce(() => {
      d = new fr(i.area.value);
    }), tn(() => {
      d.update();
    }), on(() => {
      d.destroy();
    }), (f, v) => (p(), _("div", Ym, [
      a(e).view === "list" || c.value.length ? (p(), _("div", Xm, [
        n("div", {
          onClick: v[0] || (v[0] = (m) => h("basename")),
          class: "col-span-7 vf-sort-button"
        }, [
          ee(b(a(s)("Name")) + " ", 1),
          ve(W(ts, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "basename"]
          ])
        ]),
        c.value.length ? z("", !0) : (p(), _("div", {
          key: 0,
          onClick: v[1] || (v[1] = (m) => h("file_size")),
          class: "justify-center col-span-2 vf-sort-button"
        }, [
          ee(b(a(s)("Size")) + " ", 1),
          ve(W(ts, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "file_size"]
          ])
        ])),
        c.value.length ? z("", !0) : (p(), _("div", {
          key: 1,
          onClick: v[2] || (v[2] = (m) => h("last_modified")),
          class: "justify-center col-span-3 vf-sort-button"
        }, [
          ee(b(a(s)("Date")) + " ", 1),
          ve(W(ts, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "last_modified"]
          ])
        ])),
        c.value.length ? (p(), _("div", {
          key: 2,
          onClick: v[3] || (v[3] = (m) => h("path")),
          class: "justify-center col-span-5 vf-sort-button"
        }, [
          ee(b(a(s)("Filepath")) + " ", 1),
          ve(W(ts, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "path"]
          ])
        ])) : z("", !0)
      ])) : z("", !0),
      n("div", Jm, [
        n("div", Qm, [
          W(tm, {
            ref_key: "dragImage",
            ref: o,
            count: a(i).getCount()
          }, null, 8, ["count"])
        ]),
        n("div", {
          ref: a(i).area,
          class: "h-full text-xs p-1 vf-selector-area z-0",
          onContextmenu: v[4] || (v[4] = lt((m) => a(e).emitter.emit("vf-contextmenu-show", { event: m, items: a(i).getSelected() }), ["self", "prevent"]))
        }, [
          c.value.length ? (p(!0), _(he, { key: 0 }, $e(u(), (m, g) => (p(), J(Hs, {
            item: m,
            index: g,
            dragImage: o.value,
            class: "vf-item vf-item-list"
          }, {
            default: se(() => [
              n("div", Zm, [
                n("div", e1, [
                  W(Os, {
                    type: m.type,
                    small: a(e).compactListView
                  }, null, 8, ["type", "small"]),
                  n("span", t1, b(m.basename), 1)
                ]),
                n("div", s1, b(m.path), 1)
              ])
            ]),
            _: 2
          }, 1032, ["item", "index", "dragImage"]))), 256)) : z("", !0),
          a(e).view === "list" && !c.value.length ? (p(!0), _(he, { key: 1 }, $e(u(), (m, g) => (p(), J(Hs, {
            item: m,
            index: g,
            dragImage: o.value,
            class: "vf-item vf-item-list",
            draggable: "true",
            key: m.path
          }, {
            default: se(() => [
              n("div", o1, [
                n("div", n1, [
                  W(Os, {
                    type: m.type,
                    small: a(e).compactListView
                  }, null, 8, ["type", "small"]),
                  n("span", r1, b(m.basename), 1)
                ]),
                n("div", a1, b(m.file_size ? a(e).filesize(m.file_size) : ""), 1),
                n("div", l1, b(a(zn)(m.last_modified)), 1)
              ])
            ]),
            _: 2
          }, 1032, ["item", "index", "dragImage"]))), 128)) : z("", !0),
          a(e).view === "grid" && !c.value.length ? (p(!0), _(he, { key: 2 }, $e(u(!1), (m, g) => (p(), J(Hs, {
            item: m,
            index: g,
            dragImage: o.value,
            class: "vf-item vf-item-grid",
            draggable: "true"
          }, {
            default: se(() => [
              n("div", null, [
                n("div", i1, [
                  (m.mime_type ?? "").startsWith("image") && a(e).showThumbnails ? (p(), _("img", {
                    src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                    class: "lazy h-10 md:h-12 m-auto",
                    "data-src": a(e).requester.getPreviewUrl(a(e).fs.adapter, m),
                    alt: m.basename,
                    key: m.path
                  }, null, 8, c1)) : (p(), J(Os, {
                    key: 1,
                    type: m.type
                  }, null, 8, ["type"])),
                  !((m.mime_type ?? "").startsWith("image") && a(e).showThumbnails) && m.type !== "dir" ? (p(), _("div", d1, b(r(m.extension)), 1)) : z("", !0)
                ]),
                n("span", u1, b(a(eo)(m.basename)), 1)
              ])
            ]),
            _: 2
          }, 1032, ["item", "index", "dragImage"]))), 256)) : z("", !0)
        ], 544),
        W(V0)
      ])
    ]));
  }
}, f1 = ["href", "download"], h1 = ["onClick"], p1 = {
  __name: "ContextMenu",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = H(null), o = H([]), c = H(""), i = Pt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = tt(() => i.items.filter((f) => f.key == null || e.features.includes(f.key)));
    e.emitter.on("vf-context-selected", (f) => {
      o.value = f;
    });
    const l = {
      newfolder: {
        key: pe.NEW_FOLDER,
        title: () => s("New Folder"),
        action: () => e.modal.open(Nn)
      },
      selectAll: {
        title: () => s("Select All"),
        action: () => e.dragSelect.selectAll()
      },
      markFavorite: {
        title: () => s("Pin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.concat(o.value), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      removeFavorite: {
        title: () => s("Unpin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.filter((f) => !o.value.find((v) => v.path === f.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: pe.DELETE,
        title: () => s("Delete"),
        action: () => {
          e.modal.open(wo, { items: o });
        }
      },
      refresh: {
        title: () => s("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
        }
      },
      preview: {
        key: pe.PREVIEW,
        title: () => s("Preview"),
        action: () => e.modal.open(jn, { adapter: e.fs.adapter, item: o.value[0] })
      },
      open: {
        title: () => s("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: o.value[0].path
            }
          });
        }
      },
      openDir: {
        title: () => s("Open containing folder"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: o.value[0].dir
            }
          });
        }
      },
      download: {
        key: pe.DOWNLOAD,
        link: tt(() => e.requester.getDownloadUrl(e.fs.adapter, o.value[0])),
        title: () => s("Download"),
        action: () => {
        }
      },
      archive: {
        key: pe.ARCHIVE,
        title: () => s("Archive"),
        action: () => e.modal.open(Pn, { items: o })
      },
      unarchive: {
        key: pe.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => e.modal.open(Un, { items: o })
      },
      rename: {
        key: pe.RENAME,
        title: () => s("Rename"),
        action: () => e.modal.open(ko, { items: o })
      }
    }, u = (f) => {
      e.emitter.emit("vf-contextmenu-hide"), f.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: f }) => {
      c.value = f;
    }), e.emitter.on("vf-contextmenu-show", ({ event: f, items: v, target: m = null }) => {
      if (i.items = [], c.value)
        if (m)
          i.items.push(l.openDir), e.emitter.emit("vf-context-selected", [m]);
        else
          return;
      else
        !m && !c.value ? (i.items.push(l.refresh), i.items.push(l.selectAll), i.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : v.length > 1 && v.some((g) => g.path === m.path) ? (i.items.push(l.refresh), i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", v)) : (m.type === "dir" ? (i.items.push(l.open), e.pinnedFolders.findIndex((g) => g.path === m.path) !== -1 ? i.items.push(l.removeFavorite) : i.items.push(l.markFavorite)) : (i.items.push(l.preview), i.items.push(l.download)), i.items.push(l.rename), m.mime_type === "application/zip" ? i.items.push(l.unarchive) : i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", [m]));
      h(f);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const h = (f) => {
      const v = e.dragSelect.area.value, m = e.root.getBoundingClientRect(), g = v.getBoundingClientRect();
      let w = f.clientX - m.left, x = f.clientY - m.top;
      i.active = !0, vt(() => {
        var R;
        const $ = (R = r.value) == null ? void 0 : R.getBoundingClientRect();
        let y = ($ == null ? void 0 : $.height) ?? 0, O = ($ == null ? void 0 : $.width) ?? 0;
        w = g.right - f.pageX + window.scrollX < O ? w - O : w, x = g.bottom - f.pageY + window.scrollY < y ? x - y : x, i.positions = {
          left: w + "px",
          top: x + "px"
        };
      });
    };
    return (f, v) => ve((p(), _("ul", {
      ref_key: "contextmenu",
      ref: r,
      style: fs(i.positions),
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded-sm select-none"
    }, [
      (p(!0), _(he, null, $e(d.value, (m) => (p(), _("li", {
        class: "cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: m.title
      }, [
        m.link ? (p(), _("a", {
          key: 0,
          class: "block pl-2 pr-3 py-2",
          target: "_blank",
          href: m.link,
          download: m.link,
          onClick: v[0] || (v[0] = (g) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          n("span", null, b(m.title()), 1)
        ], 8, f1)) : (p(), _("div", {
          key: 1,
          class: "pl-2 pr-3 py-1.5",
          onClick: (g) => u(m)
        }, [
          n("span", null, b(m.title()), 1)
        ], 8, h1))
      ]))), 128))
    ], 4)), [
      [ze, i.active]
    ]);
  }
}, v1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, g1 = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), _1 = [
  g1
];
function b1(t, e) {
  return p(), _("svg", v1, [..._1]);
}
const Gn = { render: b1 }, x1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, y1 = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), w1 = [
  y1
];
function k1(t, e) {
  return p(), _("svg", x1, [...w1]);
}
const $1 = { render: k1 }, S1 = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none grow-0" }, C1 = { class: "flex leading-5 items-center" }, E1 = ["aria-label"], A1 = ["value"], M1 = { class: "ml-3" }, T1 = { key: 0 }, D1 = { class: "ml-1" }, V1 = { class: "flex leading-5 items-center justify-end" }, L1 = ["disabled"], O1 = ["aria-label"], H1 = {
  __name: "Statusbar",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, o = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, i = H("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = tt(() => {
      const l = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, u) => (p(), _("div", S1, [
      n("div", C1, [
        n("div", {
          class: "mx-2",
          "aria-label": a(s)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, [
          W(a(Gn))
        ], 8, E1),
        ve(n("select", {
          "onUpdate:modelValue": u[0] || (u[0] = (h) => a(e).fs.adapter = h),
          onChange: c,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8",
          tabindex: "-1"
        }, [
          (p(!0), _(he, null, $e(a(e).fs.data.storages, (h) => (p(), _("option", { value: h }, b(h), 9, A1))), 256))
        ], 544), [
          [Rs, a(e).fs.adapter]
        ]),
        n("div", M1, [
          i.value.length ? (p(), _("span", T1, b(a(e).fs.data.files.length) + " items found. ", 1)) : z("", !0),
          n("span", D1, b(a(e).dragSelect.getCount() > 0 ? a(s)("%s item(s) selected.", a(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      n("div", V1, [
        a(e).selectButton.active ? (p(), _("button", {
          key: 0,
          class: fe(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (h) => a(e).selectButton.click(a(o).getSelected(), h))
        }, b(a(s)("Select")), 11, L1)) : z("", !0),
        n("span", {
          class: "mr-1",
          "aria-label": a(s)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: u[2] || (u[2] = (h) => a(e).modal.open(In))
        }, [
          W(a($1))
        ], 8, O1)
      ])
    ]));
  }
}, R1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, B1 = /* @__PURE__ */ n("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}, null, -1), F1 = /* @__PURE__ */ n("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1), I1 = [
  B1,
  F1
];
function N1(t, e) {
  return p(), _("svg", R1, [...I1]);
}
const U1 = { render: N1 }, P1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, z1 = /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), j1 = /* @__PURE__ */ n("path", { d: "M15 12H9M12 9v6" }, null, -1), q1 = [
  z1,
  j1
];
function G1(t, e) {
  return p(), _("svg", P1, [...q1]);
}
const K1 = { render: G1 }, W1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Y1 = /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), X1 = /* @__PURE__ */ n("path", { d: "M9 12h6" }, null, -1), J1 = [
  Y1,
  X1
];
function Q1(t, e) {
  return p(), _("svg", W1, [...J1]);
}
const Z1 = { render: Q1 };
function Kn(t, e) {
  const s = t.findIndex((r) => r.path === e.path);
  s > -1 ? t[s] = e : t.push(e);
}
const ef = {
  key: 1,
  class: "cursor-pointer"
}, Wn = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ or({
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
    const e = t, s = le("ServiceContainer");
    s.i18n;
    const r = nr(t, "modelValue"), o = H(!1);
    function c() {
      return r.value = !r.value;
    }
    function i() {
      return s.treeViewData.find((l) => l.path === e.path);
    }
    const d = () => {
      o.value = !0, s.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((l) => {
        Kn(s.treeViewData, { path: e.path, ...l });
      }).catch((l) => {
      }).finally(() => {
        o.value = !1;
      });
    };
    return (l, u) => {
      var h;
      return p(), _("div", {
        class: "h-5 w-5 shrink-0",
        onClick: u[0] || (u[0] = (f) => {
          var v;
          return (!r.value || ((v = i()) == null ? void 0 : v.folders.length)) && c() && (i() || d());
        })
      }, [
        o.value ? (p(), J(a($o), {
          key: 0,
          class: "p-1"
        })) : (p(), _("div", ef, [
          r.value && ((h = i()) != null && h.folders.length) ? (p(), J(a(Z1), {
            key: 0,
            class: "text-gray-600"
          })) : z("", !0),
          r.value ? z("", !0) : (p(), J(a(K1), {
            key: 1,
            class: "text-gray-400"
          }))
        ]))
      ]);
    };
  }
}, tf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
}, sf = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
}, null, -1), of = [
  sf
];
function nf(t, e) {
  return p(), _("svg", tf, [...of]);
}
const rf = { render: nf }, af = { class: "block" }, lf = { class: "flex hover:text-sky-700 dark:hover:text-sky-200/50 rounded" }, cf = { class: "h-5 w-5 shrink-0" }, df = ["onClick"], uf = { class: "h-5 w-5 shrink-0" }, mf = { class: "text-nowrap" }, ff = { class: "pl-4" }, hf = {
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
    const e = le("ServiceContainer"), s = H([]), r = t, o = tt(() => {
      var c;
      return ((c = e.treeViewData.find((i) => i.path === r.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, i) => {
      const d = rr("TreeSubfolderList", !0);
      return p(), _("ul", af, [
        (p(!0), _(he, null, $e(o.value, (l, u) => (p(), _("li", {
          class: "flex flex-col space-x-0.5 py-0.5 text-sm",
          key: l.path
        }, [
          n("div", lf, [
            n("div", cf, [
              W(Wn, {
                adapter: t.adapter,
                path: l.path,
                modelValue: s.value[l.path],
                "onUpdate:modelValue": (h) => s.value[l.path] = h
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ]),
            n("div", {
              class: "flex cursor-pointer",
              onClick: (h) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r.adapter, path: l.path } })
            }, [
              n("div", uf, [
                a(e).fs.path === l.path ? (p(), J(a(rf), { key: 0 })) : (p(), J(a($s), { key: 1 }))
              ]),
              n("div", mf, b(l.basename), 1)
            ], 8, df)
          ]),
          n("div", ff, [
            ve(W(d, {
              adapter: r.adapter,
              path: l.path
            }, null, 8, ["adapter", "path"]), [
              [ze, s.value[l.path]]
            ])
          ])
        ]))), 128))
      ]);
    };
  }
}, pf = { class: "pt-1 px-1 uppercase font-bold text-gray-400 dark:text-gray-500 text-xs flex justify-between" }, vf = { class: "h-5 w-5 shrink-0" }, gf = { class: "mr-3" }, _f = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = le("ServiceContainer"), s = H(!1), r = (o) => {
      e.fs.adapter = o, e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: o } }), e.storage.setStore("adapter", o);
    };
    return (o, c) => (p(), _(he, null, [
      n("div", pf, [
        n("div", {
          class: fe(["flex flex-1 space-x-1 items-center cursor-pointer", t.storage === a(e).fs.adapter ? "text-gray-700/80 dark:text-gray-300/80 text-bold" : ""]),
          onClick: c[0] || (c[0] = (i) => r(t.storage))
        }, [
          n("div", vf, [
            W(a(Gn))
          ]),
          n("div", null, b(t.storage), 1)
        ], 2),
        n("div", gf, [
          W(Wn, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: s.value,
            "onUpdate:modelValue": c[1] || (c[1] = (i) => s.value = i)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ve(W(hf, {
        adapter: t.storage,
        path: t.storage + "://"
      }, null, 8, ["adapter", "path"]), [
        [ze, s.value]
      ])
    ], 64));
  }
}, bf = { class: "p-1 uppercase font-bold text-gray-400 dark:text-gray-400 text-xs flex items-center space-x-1" }, xf = { class: "block" }, yf = { class: "flex pl-2 py-0.5 text-sm space-x-2" }, wf = ["onClick"], kf = ["title"], $f = ["onClick"], Sf = { key: 0 }, Cf = { class: "rounded-lg p-1 bg-gray-100 dark:bg-gray-700 text-xs text-center" }, Ef = {
  __name: "TreeView",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = H(176), o = (d) => {
      e.pinnedFolders = e.pinnedFolders.filter((l) => l.path !== d.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, c = (d) => {
      const l = d.clientX, u = d.target.parentElement, h = u.getBoundingClientRect().width;
      u.classList.remove("transition-[width]"), u.classList.add("transition-none");
      const f = (m) => {
        r.value = h + m.clientX - l, r.value < 50 && (r.value = 0, e.showTreeView = !1), r.value > 50 && (e.showTreeView = !0);
      }, v = () => {
        const m = u.getBoundingClientRect();
        r.value = m.width, u.classList.add("transition-[width]"), u.classList.remove("transition-none"), window.removeEventListener("mousemove", f), window.removeEventListener("mouseup", v);
      };
      window.addEventListener("mousemove", f), window.addEventListener("mouseup", v);
    }, i = H(null);
    return Ce(() => {
      ut(i.value, {});
    }), pt(e.fs.data, (d, l) => {
      const u = d.files.filter((h) => h.type === "dir");
      Kn(e.treeViewData, { path: e.fs.path, folders: u.map((h) => ({
        adapter: h.storage,
        path: h.path,
        basename: h.basename
      })) });
    }), (d, l) => (p(), _(he, null, [
      n("div", {
        onClick: l[0] || (l[0] = (u) => a(e).showTreeView = !a(e).showTreeView),
        class: fe(["w-full h-full bg-gray-300/10 dark:bg-gray-700/10 z-[1]", a(e).showTreeView ? "backdrop-blur-sm absolute md:hidden" : "hidden"])
      }, null, 2),
      n("div", {
        style: fs(a(e).showTreeView ? "min-width:50px;max-width:75%; width: " + r.value + "px" : "width: 0"),
        class: "absolute h-full md:h-auto md:relative shadow-lg shrink-0 transition-[width] ease-in-out duration-200 z-[1] bg-gray-50 dark:bg-[#242f41]"
      }, [
        n("div", {
          ref_key: "treeViewScrollElement",
          ref: i,
          class: "h-full border-r dark:border-gray-600/50 pb-4"
        }, [
          n("div", bf, [
            n("div", null, [
              W(a(qn), { class: "text-amber-600" })
            ]),
            n("div", null, b(a(s)("Pinned Folders")), 1)
          ]),
          n("ul", xf, [
            (p(!0), _(he, null, $e(a(e).pinnedFolders, (u) => (p(), _("li", yf, [
              n("div", {
                class: "flex hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer",
                onClick: (h) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: u.storage, path: u.path } })
              }, [
                W(a($s), { class: "h-5 w-5" }),
                n("div", {
                  title: u.path
                }, b(u.basename), 9, kf)
              ], 8, wf),
              n("div", {
                class: "cursor-pointer",
                onClick: (h) => o(u)
              }, [
                W(a(U1), { class: "p-0.5 text-gray-200 hover:text-gray-400 dark:text-gray-600 hover:dark:text-gray-400" })
              ], 8, $f)
            ]))), 256)),
            a(e).pinnedFolders.length ? z("", !0) : (p(), _("li", Sf, [
              n("div", Cf, b(a(s)("No folders pinned")), 1)
            ]))
          ]),
          (p(!0), _(he, null, $e(a(e).fs.data.storages, (u) => (p(), _("div", null, [
            W(_f, { storage: u }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        n("div", {
          onMousedown: c,
          class: fe([(a(e).showTreeView, ""), "transition-colors ease-in-out duration-200 top-0 hover:bg-slate-600/10 dark:hover:bg-slate-300/10 w-1 h-full absolute -right-0.5 cursor-ew-resize"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, Af = { class: "relative flex overflow-hidden h-full" }, Mf = {
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
    const s = e, o = Ca(t, le("VueFinderOptions"));
    ar("ServiceContainer", o);
    const { setStore: c } = o.storage, i = H(null);
    o.root = i;
    const d = o.dragSelect;
    yi(o);
    const l = (h) => {
      Object.assign(o.fs.data, h), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return o.emitter.on("vf-fetch-abort", () => {
      u.abort(), o.fs.loading = !1;
    }), o.emitter.on("vf-fetch", ({ params: h, body: f = null, onSuccess: v = null, onError: m = null, noCloseModal: g = !1 }) => {
      ["index", "search"].includes(h.q) && (u && u.abort(), o.fs.loading = !0), u = new AbortController();
      const w = u.signal;
      o.requester.send({
        url: "",
        method: h.m || "get",
        params: h,
        body: f,
        abortSignal: w
      }).then((x) => {
        o.fs.adapter = x.adapter, o.persist && (o.fs.path = x.dirname, c("path", o.fs.path)), ["index", "search"].includes(h.q) && (o.fs.loading = !1), g || o.modal.close(), l(x), v && v(x);
      }).catch((x) => {
        console.error(x), m && m(x);
      });
    }), Ce(() => {
      let h = {};
      o.fs.path.includes("://") && (h = {
        adapter: o.fs.path.split("://")[0],
        path: o.fs.path
      }), o.emitter.emit("vf-fetch", { params: { q: "index", adapter: o.fs.adapter, ...h } }), d.onSelect((f) => {
        s("select", f);
      });
    }), (h, f) => (p(), _("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i,
      tabindex: "0"
    }, [
      n("div", {
        class: fe(a(o).theme.actualValue)
      }, [
        n("div", {
          class: fe([a(o).fullScreen ? "fixed w-screen inset-0 z-20" : "relative rounded resize-y ", "overflow-hidden min-h-44 border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 select-none"]),
          style: fs(a(o).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: f[0] || (f[0] = (v) => a(o).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: f[1] || (f[1] = (v) => a(o).emitter.emit("vf-contextmenu-hide"))
        }, [
          W(tu),
          W(T0),
          n("div", Af, [
            W(Ef),
            W(m1)
          ]),
          W(H1)
        ], 38),
        W(lr, { name: "fade" }, {
          default: se(() => [
            a(o).modal.visible ? (p(), J(ir(a(o).modal.type), { key: 0 })) : z("", !0)
          ]),
          _: 1
        }),
        W(p1)
      ], 2)
    ], 512));
  }
}, Uf = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", Mf);
  }
};
export {
  Uf as default
};
