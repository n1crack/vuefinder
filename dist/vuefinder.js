var er = Object.defineProperty;
var tr = (t, e, n) => e in t ? er(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var _s = (t, e, n) => tr(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as yt, watch as Me, ref as M, shallowRef as nr, onMounted as xe, onUnmounted as jn, onUpdated as Ls, nextTick as ct, computed as rt, inject as re, openBlock as v, createElementBlock as g, withKeys as $t, unref as o, createElementVNode as a, withModifiers as Ze, renderSlot as Tt, normalizeClass as ae, toDisplayString as b, createBlock as W, resolveDynamicComponent as Fs, withCtx as Q, createVNode as z, Fragment as ge, renderList as ke, createCommentVNode as q, withDirectives as ue, vModelCheckbox as zt, createTextVNode as J, vModelSelect as En, vModelText as kt, onBeforeUnmount as Hs, customRef as sr, vShow as Ue, isRef as or, TransitionGroup as rr, normalizeStyle as rn, mergeModels as ar, useModel as Rs, resolveComponent as lr, provide as ir, Transition as cr } from "vue";
import dr from "mitt";
import ur from "dragselect";
import _r from "@uppy/core";
import vr from "@uppy/xhr-upload";
import fr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import mr from "cropperjs";
var Os;
const yn = (Os = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Os.getAttribute("content");
class pr {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    _s(this, "config");
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
    const s = Object.assign({}, n.headers, r, e.headers), c = Object.assign({}, n.params, e.params), l = e.body, d = n.baseUrl + e.url, i = e.method;
    let u;
    i !== "get" && (l instanceof FormData ? (u = l, n.body != null && Object.entries(this.config.body).forEach(([_, p]) => {
      u.append(_, p);
    })) : (u = { ...l }, n.body != null && Object.assign(u, this.config.body)));
    const m = {
      url: d,
      method: i,
      headers: s,
      params: c,
      body: u
    };
    if (n.transformRequest != null) {
      const _ = n.transformRequest({
        url: d,
        method: i,
        headers: s,
        params: c,
        body: u
      });
      _.url != null && (m.url = _.url), _.method != null && (m.method = _.method), _.params != null && (m.params = _.params ?? {}), _.headers != null && (m.headers = _.headers ?? {}), _.body != null && (m.body = _.body);
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
    const l = await fetch(c, s);
    if (l.ok)
      return await l[r]();
    throw await l.json();
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
  function s(i, u) {
    n[i] = u;
  }
  function c(i) {
    delete n[i];
  }
  function l() {
    Object.keys(n).map((i) => c(i));
  }
  return { getStore: (i, u = null) => n.hasOwnProperty(i) ? n[i] : u, setStore: s, removeStore: c, clearStore: l };
}
async function br(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function wr(t, e, n, r) {
  const { getStore: s, setStore: c } = t, l = M({}), d = M(s("locale", e)), i = (_, p = e) => {
    br(_, r).then((f) => {
      l.value = f, c("locale", _), d.value = _, c("translations", f), Object.values(r).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + _ }), n.emit("vf-language-saved"));
    }).catch((f) => {
      p ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), i(p, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Me(d, (_) => {
    i(_);
  }), !s("locale") && !r.length ? i(e) : l.value = s("translations");
  const u = (_, ...p) => p.length ? u(_ = _.replace("%s", p.shift()), ...p) : _;
  function m(_, ...p) {
    return l.value && l.value.hasOwnProperty(_) ? u(l.value[_], ...p) : u(_, ...p);
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
}, yr = Object.values(de), $r = "2.6.1";
function Bs(t, e, n, r, s) {
  return (e = Math, n = e.log, r = 1024, s = n(t) / n(r) | 0, t / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Is(t, e, n, r, s) {
  return (e = Math, n = e.log, r = 1e3, s = n(t) / n(r) | 0, t / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function kr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const nt = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function xr(t, e) {
  const n = M(nt.SYSTEM), r = M(nt.LIGHT);
  n.value = t.getStore("theme", e ?? nt.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), c = (l) => {
    n.value === nt.DARK || n.value === nt.SYSTEM && l.matches ? r.value = nt.DARK : r.value = nt.LIGHT;
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
    set(l) {
      n.value = l, l !== nt.SYSTEM ? t.setStore("theme", l) : t.removeStore("theme"), c(s);
    }
  };
}
function Sr() {
  const t = nr(null), e = M(!1), n = M();
  return { visible: e, type: t, data: n, open: (c, l = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = c, n.value = l;
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
  let c = n, l;
  const d = (m, _) => {
    const p = c, f = m, h = _ || (r ? !r(p, f) : p !== f);
    return (h || s) && (c = f, l = p), [c, h, l];
  };
  return [e ? (m) => d(e(c, l), m) : d, (m) => [c, !!m, l]];
}, Cr = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, De = Cr ? window : {}, Ns = Math.max, Er = Math.min, An = Math.round, Jt = Math.abs, vs = Math.sign, Us = De.cancelAnimationFrame, Gn = De.requestAnimationFrame, Zt = De.setTimeout, Tn = De.clearTimeout, an = (t) => typeof De[t] < "u" ? De[t] : void 0, Ar = an("MutationObserver"), fs = an("IntersectionObserver"), Qt = an("ResizeObserver"), Kt = an("ScrollTimeline"), Kn = (t) => t === void 0, ln = (t) => t === null, ze = (t) => typeof t == "number", Ot = (t) => typeof t == "string", Wn = (t) => typeof t == "boolean", Re = (t) => typeof t == "function", Pe = (t) => Array.isArray(t), en = (t) => typeof t == "object" && !Pe(t) && !ln(t), Yn = (t) => {
  const e = !!t && t.length, n = ze(e) && e > -1 && e % 1 == 0;
  return Pe(t) || !Re(t) && n ? e > 0 && en(t) ? e - 1 in t : !0 : !1;
}, tn = (t) => !!t && t.constructor === Object, nn = (t) => t instanceof HTMLElement, cn = (t) => t instanceof Element;
function le(t, e) {
  if (Yn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && le(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const qs = (t, e) => t.indexOf(e) >= 0, Mt = (t, e) => t.concat(e), me = (t, e, n) => (!Ot(e) && Yn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), at = (t) => Array.from(t || []), Xn = (t) => Pe(t) ? t : !Ot(t) && Yn(t) ? at(t) : [t], Mn = (t) => !!t && !t.length, Dn = (t) => at(new Set(t)), Fe = (t, e, n) => {
  le(t, (s) => s ? s.apply(void 0, e || []) : !0), !n && (t.length = 0);
}, zs = "paddingTop", Ps = "paddingRight", js = "paddingLeft", Gs = "paddingBottom", Ks = "marginLeft", Ws = "marginRight", Ys = "marginBottom", Xs = "overflowX", Js = "overflowY", dn = "width", un = "height", st = "visible", it = "hidden", gt = "scroll", Tr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, _n = (t, e, n, r) => {
  if (t && e) {
    let s = !0;
    return le(n, (c) => {
      const l = t[c], d = e[c];
      l !== d && (s = !1);
    }), s;
  }
  return !1;
}, Zs = (t, e) => _n(t, e, ["w", "h"]), Wt = (t, e) => _n(t, e, ["x", "y"]), Mr = (t, e) => _n(t, e, ["t", "r", "b", "l"]), dt = () => {
}, X = (t, ...e) => t.bind(0, ...e), ft = (t) => {
  let e;
  const n = t ? Zt : Gn, r = t ? Tn : Us;
  return [(s) => {
    r(e), e = n(() => s(), Re(t) ? t() : t);
  }, () => r(e)];
}, Vn = (t, e) => {
  const { _: n, v: r, p: s, S: c } = e || {};
  let l, d, i, u, m = dt;
  const _ = function(k) {
    m(), Tn(l), u = l = d = void 0, m = dt, t.apply(this, k);
  }, p = ($) => c && d ? c(d, $) : $, f = () => {
    m !== dt && _(p(i) || i);
  }, h = function() {
    const k = at(arguments), E = Re(n) ? n() : n;
    if (ze(E) && E >= 0) {
      const F = Re(r) ? r() : r, x = ze(F) && F >= 0, D = E > 0 ? Zt : Gn, O = E > 0 ? Tn : Us, V = p(k) || k, S = _.bind(0, V);
      let w;
      m(), s && !u ? (S(), u = !0, w = D(() => u = void 0, E)) : (w = D(S, E), x && !l && (l = Zt(f, F))), m = () => O(w), d = i = V;
    } else
      _(k);
  };
  return h.m = f, h;
}, Qs = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Be = (t) => t ? Object.keys(t) : [], oe = (t, e, n, r, s, c, l) => {
  const d = [e, n, r, s, c, l];
  return (typeof t != "object" || ln(t)) && !Re(t) && (t = {}), le(d, (i) => {
    le(i, (u, m) => {
      const _ = i[m];
      if (t === _)
        return !0;
      const p = Pe(_);
      if (_ && tn(_)) {
        const f = t[m];
        let h = f;
        p && !Pe(f) ? h = [] : !p && !tn(f) && (h = {}), t[m] = oe(h, _);
      } else
        t[m] = p ? _.slice() : _;
    });
  }), t;
}, eo = (t, e) => le(oe({}, t), (n, r, s) => {
  n === void 0 ? delete s[r] : n && tn(n) && (s[r] = eo(n));
}), Jn = (t) => !Be(t).length, to = (t, e, n) => Ns(t, Er(e, n)), ut = (t) => Dn((Pe(t) ? t : (t || "").split(" ")).filter((e) => e)), Zn = (t, e) => t && t.getAttribute(e), ms = (t, e) => t && t.hasAttribute(e), Xe = (t, e, n) => {
  le(ut(e), (r) => {
    t && t.setAttribute(r, String(n || ""));
  });
}, Ne = (t, e) => {
  le(ut(e), (n) => t && t.removeAttribute(n));
}, vn = (t, e) => {
  const n = ut(Zn(t, e)), r = X(Xe, t, e), s = (c, l) => {
    const d = new Set(n);
    return le(ut(c), (i) => {
      d[l](i);
    }), at(d).join(" ");
  };
  return {
    O: (c) => r(s(c, "delete")),
    $: (c) => r(s(c, "add")),
    C: (c) => {
      const l = ut(c);
      return l.reduce((d, i) => d && n.includes(i), l.length > 0);
    }
  };
}, no = (t, e, n) => (vn(t, e).O(n), X(Qn, t, e, n)), Qn = (t, e, n) => (vn(t, e).$(n), X(no, t, e, n)), sn = (t, e, n, r) => (r ? Qn : no)(t, e, n), es = (t, e, n) => vn(t, e).C(n), so = (t) => vn(t, "class"), oo = (t, e) => {
  so(t).O(e);
}, ts = (t, e) => (so(t).$(e), X(oo, t, e)), ro = (t, e) => {
  const n = e ? cn(e) && e : document;
  return n ? at(n.querySelectorAll(t)) : [];
}, Dr = (t, e) => {
  const n = e ? cn(e) && e : document;
  return n && n.querySelector(t);
}, On = (t, e) => cn(t) && t.matches(e), ao = (t) => On(t, "body"), Ln = (t) => t ? at(t.childNodes) : [], Dt = (t) => t && t.parentElement, mt = (t, e) => cn(t) && t.closest(e), Fn = (t) => document.activeElement, Vr = (t, e, n) => {
  const r = mt(t, e), s = t && Dr(n, r), c = mt(s, e) === r;
  return r && s ? r === t || s === t || c && mt(mt(t, n), e) !== r : !1;
}, bt = (t) => {
  le(Xn(t), (e) => {
    const n = Dt(e);
    e && n && n.removeChild(e);
  });
}, Oe = (t, e) => X(bt, t && e && le(Xn(e), (n) => {
  n && t.appendChild(n);
})), pt = (t) => {
  const e = document.createElement("div");
  return Xe(e, "class", t), e;
}, lo = (t) => {
  const e = pt();
  return e.innerHTML = t.trim(), le(Ln(e), (n) => bt(n));
}, ps = (t, e) => t.getPropertyValue(e) || t[e] || "", io = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Pt = (t) => io(parseFloat(t || "")), Hn = (t) => Math.round(t * 1e4) / 1e4, co = (t) => `${Hn(io(t))}px`;
function Vt(t, e) {
  t && e && le(e, (n, r) => {
    try {
      const s = t.style, c = ln(n) || Wn(n) ? "" : ze(n) ? co(n) : n;
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
    s = r ? ps(c, e) : at(e).reduce((l, d) => (l[d] = ps(c, d), l), s);
  }
  return s;
}
const hs = (t, e, n) => {
  const r = e ? `${e}-` : "", s = n ? `-${n}` : "", c = `${r}top${s}`, l = `${r}right${s}`, d = `${r}bottom${s}`, i = `${r}left${s}`, u = Qe(t, [c, l, d, i]);
  return {
    t: Pt(u[c]),
    r: Pt(u[l]),
    b: Pt(u[d]),
    l: Pt(u[i])
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
}, $n = (t) => t.getBoundingClientRect(), Rr = (t) => !!t && Lr(t), Rn = (t) => !!(t && (t[un] || t[dn])), _o = (t, e) => {
  const n = Rn(t);
  return !Rn(e) && n;
}, gs = (t, e, n, r) => {
  le(ut(e), (s) => {
    t && t.removeEventListener(s, n, r);
  });
}, _e = (t, e, n, r) => {
  var s;
  const c = (s = r && r.H) != null ? s : !0, l = r && r.I || !1, d = r && r.A || !1, i = {
    passive: c,
    capture: l
  };
  return X(Fe, ut(e).map((u) => {
    const m = d ? (_) => {
      gs(t, u, m, l), n && n(_);
    } : n;
    return t && t.addEventListener(u, m, i), X(gs, t, u, m, l);
  }));
}, vo = (t) => t.stopPropagation(), Bn = (t) => t.preventDefault(), fo = (t) => vo(t) || Bn(t), qe = (t, e) => {
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
  const { D: n, M: r } = t, { w: s, h: c } = e, l = (_, p, f) => {
    let h = vs(_) * f, $ = vs(p) * f;
    if (h === $) {
      const k = Jt(_), E = Jt(p);
      $ = k > E ? 0 : $, h = k < E ? 0 : h;
    }
    return h = h === $ ? 0 : h, [h + 0, $ + 0];
  }, [d, i] = l(n.x, r.x, s), [u, m] = l(n.y, r.y, c);
  return {
    D: {
      x: d,
      y: u
    },
    M: {
      x: i,
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
  const r = (s, c, l) => to(0, 1, (s - l) / (s - c) || 0);
  return {
    x: r(t.x, e.x, n.x),
    y: r(t.y, e.y, n.y)
  };
}, In = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, ys = (t, e) => {
  le(Xn(e), t);
}, Nn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (c, l) => {
    if (c) {
      const d = e.get(c);
      ys((i) => {
        d && d[i ? "delete" : "clear"](i);
      }, l);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, r = (c, l) => {
    if (Ot(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), ys((m) => {
        Re(m) && u.add(m);
      }, l), X(n, c, l);
    }
    Wn(l) && l && n();
    const d = Be(c), i = [];
    return le(d, (u) => {
      const m = c[u];
      m && me(i, r(u, m));
    }), X(Fe, i);
  }, s = (c, l) => {
    le(at(e.get(c)), (d) => {
      l && !Mn(l) ? d.apply(0, l) : d();
    });
  };
  return r(t || {}), [r, n, s];
}, $s = (t) => JSON.stringify(t, (e, n) => {
  if (Re(n))
    throw 0;
  return n;
}), ks = (t, e) => t ? `${e}`.split(".").reduce((n, r) => n && Qs(n, r) ? n[r] : void 0, t) : void 0, Ir = {
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
  return le(r, (s) => {
    const c = t[s], l = e[s];
    if (en(c) && en(l))
      oe(n[s] = {}, po(c, l)), Jn(n[s]) && delete n[s];
    else if (Qs(e, s) && l !== c) {
      let d = !0;
      if (Pe(c) || Pe(l))
        try {
          $s(c) === $s(l) && (d = !1);
        } catch {
        }
      d && (n[s] = l);
    }
  }), n;
}, xs = (t, e, n) => (r) => [ks(t, r), n || ks(e, r) !== void 0], xt = "data-overlayscrollbars", Yt = "os-environment", jt = `${Yt}-scrollbar-hidden`, kn = `${xt}-initialize`, Xt = "noClipping", Ss = `${xt}-body`, ot = xt, Nr = "host", Je = `${xt}-viewport`, Ur = Xs, qr = Js, zr = "arrange", ho = "measuring", Pr = "scrolling", go = "scrollbarHidden", jr = "noContent", Un = `${xt}-padding`, Cs = `${xt}-content`, ss = "os-size-observer", Gr = `${ss}-appear`, Kr = `${ss}-listener`, Wr = "os-trinsic-observer", Yr = "os-theme-none", He = "os-scrollbar", Xr = `${He}-rtl`, Jr = `${He}-horizontal`, Zr = `${He}-vertical`, bo = `${He}-track`, os = `${He}-handle`, Qr = `${He}-visible`, ea = `${He}-cornerless`, Es = `${He}-interaction`, As = `${He}-unusable`, qn = `${He}-auto-hide`, Ts = `${qn}-hidden`, Ms = `${He}-wheel`, ta = `${bo}-interactive`, na = `${os}-interactive`;
let wo;
const sa = () => wo, oa = (t) => {
  wo = t;
};
let xn;
const ra = () => {
  const t = (x, D, O) => {
    Oe(document.body, x), Oe(document.body, x);
    const P = uo(x), V = ht(x), S = ns(D);
    return O && bt(x), {
      x: V.h - P.h + S.h,
      y: V.w - P.w + S.w
    };
  }, e = (x) => {
    let D = !1;
    const O = ts(x, jt);
    try {
      D = Qe(x, "scrollbar-width") === "none" || Qe(x, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return O(), D;
  }, n = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${jt}{scrollbar-width:none!important}.${jt}::-webkit-scrollbar,.${jt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = lo(`<div class="${Yt}"><div></div><style>${n}</style></div>`)[0], c = s.firstChild, l = s.lastChild, d = sa();
  d && (l.nonce = d);
  const [i, , u] = Nn(), [m, _] = Ve({
    o: t(s, c),
    i: Wt
  }, X(t, s, c, !0)), [p] = _(), f = e(s), h = {
    x: p.x === 0,
    y: p.y === 0
  }, $ = {
    elements: {
      host: null,
      padding: !f,
      viewport: (x) => f && ao(x) && x,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, k = oe({}, Ir), E = X(oe, {}, k), R = X(oe, {}, $), F = {
    T: p,
    k: h,
    R: f,
    V: !!Kt,
    L: X(i, "r"),
    U: R,
    P: (x) => oe($, x) && R(),
    N: E,
    q: (x) => oe(k, x) && E(),
    B: oe({}, $),
    F: oe({}, k)
  };
  if (Ne(s, "style"), bt(s), _e(De, "resize", () => {
    u("r", []);
  }), Re(De.matchMedia) && !f && (!h.x || !h.y)) {
    const x = (D) => {
      const O = De.matchMedia(`(resolution: ${De.devicePixelRatio}dppx)`);
      _e(O, "change", () => {
        D(), x(D);
      }, {
        A: !0
      });
    };
    x(() => {
      const [D, O] = m();
      oe(F.T, D), u("r", [O]);
    });
  }
  return F;
}, Ge = () => (xn || (xn = ra()), xn), yo = (t, e) => Re(e) ? e.apply(0, t) : e, aa = (t, e, n, r) => {
  const s = Kn(r) ? n : r;
  return yo(t, s) || e.apply(0, t);
}, $o = (t, e, n, r) => {
  const s = Kn(r) ? n : r, c = yo(t, s);
  return !!c && (nn(c) ? c : e.apply(0, t));
}, la = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: r } = e || {}, { k: s, R: c, U: l } = Ge(), { nativeScrollbarsOverlaid: d, body: i } = l().cancel, u = n ?? d, m = Kn(r) ? i : r, _ = (s.x || s.y) && u, p = t && (ln(m) ? !c : m);
  return !!_ || !!p;
}, rs = /* @__PURE__ */ new WeakMap(), ia = (t, e) => {
  rs.set(t, e);
}, ca = (t) => {
  rs.delete(t);
}, ko = (t) => rs.get(t), da = (t, e, n) => {
  let r = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    r = !0;
  }, l = (d) => {
    if (s && n) {
      const i = n.map((u) => {
        const [m, _] = u || [];
        return [_ && m ? (d || ro)(m, t) : [], _];
      });
      le(i, (u) => le(u[0], (m) => {
        const _ = u[1], p = s.get(m) || [];
        if (t.contains(m) && _) {
          const h = _e(m, _, ($) => {
            r ? (h(), s.delete(m)) : e($);
          });
          s.set(m, me(p, h));
        } else
          Fe(p), s.delete(m);
      }));
    }
  };
  return l(), [c, l];
}, Ds = (t, e, n, r) => {
  let s = !1;
  const { j: c, X: l, Y: d, W: i, J: u, G: m } = r || {}, _ = Vn(() => s && n(!0), {
    _: 33,
    v: 99
  }), [p, f] = da(t, _, d), h = c || [], $ = l || [], k = Mt(h, $), E = (F, x) => {
    if (!Mn(x)) {
      const D = u || dt, O = m || dt, P = [], V = [];
      let S = !1, w = !1;
      if (le(x, (C) => {
        const { attributeName: A, target: B, type: y, oldValue: N, addedNodes: U, removedNodes: ee } = C, se = y === "attributes", ne = y === "childList", pe = t === B, L = se && A, H = L && Zn(B, A || ""), I = Ot(H) ? H : null, j = L && N !== I, T = qs($, A) && j;
        if (e && (ne || !pe)) {
          const K = se && j, G = K && i && On(B, i), te = (G ? !D(B, A, N, I) : !se || K) && !O(C, !!G, t, r);
          le(U, (ie) => me(P, ie)), le(ee, (ie) => me(P, ie)), w = w || te;
        }
        !e && pe && j && !D(B, A, N, I) && (me(V, A), S = S || T);
      }), f((C) => Dn(P).reduce((A, B) => (me(A, ro(C, B)), On(B, C) ? me(A, B) : A), [])), e)
        return !F && w && n(!1), [!1];
      if (!Mn(V) || S) {
        const C = [Dn(V), S];
        return !F && n.apply(0, C), C;
      }
    }
  }, R = new Ar(X(E, !1));
  return [() => (R.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: k,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (p(), R.disconnect(), s = !1);
  }), () => {
    if (s)
      return _.m(), E(!0, R.takeRecords());
  }];
}, xo = {}, So = {}, ua = (t) => {
  le(t, (e) => le(e, (n, r) => {
    xo[r] = e[r];
  }));
}, Co = (t, e, n) => Be(t).map((r) => {
  const { static: s, instance: c } = t[r], [l, d, i] = n || [], u = n ? c : s;
  if (u) {
    const m = n ? u(l, d, e) : u(e);
    return (i || So)[r] = m;
  }
}), Lt = (t) => So[t], _a = "__osOptionsValidationPlugin", va = "__osSizeObserverPlugin", fa = (t, e) => {
  const { k: n } = e, [r, s] = t("showNativeOverlaidScrollbars");
  return [r && n.x && n.y, s];
}, wt = (t) => t.indexOf(st) === 0, ma = (t, e) => {
  const n = (s, c, l, d) => {
    const i = s === st ? it : s.replace(`${st}-`, ""), u = wt(s), m = wt(l);
    return !c && !d ? it : u && m ? st : u ? c && d ? i : c ? st : it : c ? i : m && d ? st : it;
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
}, Eo = "__osScrollbarsHidingPlugin", pa = "__osClickScrollPlugin", Ao = (t, e, n) => {
  const { dt: r } = n || {}, s = Lt(va), [c] = Ve({
    o: !1,
    u: !0
  });
  return () => {
    const l = [], i = lo(`<div class="${ss}"><div class="${Kr}"></div></div>`)[0], u = i.firstChild, m = (_) => {
      const p = _ instanceof ResizeObserverEntry;
      let f = !1, h = !1;
      if (p) {
        const [$, , k] = c(_.contentRect), E = Rn($);
        h = _o($, k), f = !h && !E;
      } else
        h = _ === !0;
      f || e({
        ft: !0,
        dt: h
      });
    };
    if (Qt) {
      const _ = new Qt((p) => m(p.pop()));
      _.observe(u), me(l, () => {
        _.disconnect();
      });
    } else if (s) {
      const [_, p] = s(u, m, r);
      me(l, Mt([ts(i, Gr), _e(i, "animationstart", _)], p));
    } else
      return dt;
    return X(Fe, me(l, Oe(t, i)));
  };
}, ha = (t, e) => {
  let n;
  const r = (i) => i.h === 0 || i.isIntersecting || i.intersectionRatio > 0, s = pt(Wr), [c] = Ve({
    o: !1
  }), l = (i, u) => {
    if (i) {
      const m = c(r(i)), [, _] = m;
      return _ && !u && e(m) && [m];
    }
  }, d = (i, u) => l(u.pop(), i);
  return [() => {
    const i = [];
    if (fs)
      n = new fs(X(d, !1), {
        root: t
      }), n.observe(s), me(i, () => {
        n.disconnect();
      });
    else {
      const u = () => {
        const m = ht(s);
        l(m);
      };
      me(i, Ao(s, u)()), u();
    }
    return X(Fe, me(i, Oe(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, ga = (t, e, n, r) => {
  let s, c, l, d, i, u;
  const m = `[${ot}]`, _ = `[${Je}]`, p = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: f, ht: h, ot: $, gt: k, bt: E, nt: R, wt: F, yt: x, St: D, Ot: O } = t, P = (T) => Qe(T, "direction") === "rtl", V = {
    $t: !1,
    ct: P(f)
  }, S = Ge(), w = Lt(Eo), [C] = Ve({
    i: Zs,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const T = w && w.tt(t, e, V, S, n).ut, G = !(F && R) && es(h, ot, Xt), Y = !R && x(zr), te = Y && Le(k), ie = te && O(), be = D(ho, G), ve = Y && T && T()[0], Se = on($), Z = ns($);
    return ve && ve(), qe(k, te), ie && ie(), G && be(), {
      w: Se.w + Z.w,
      h: Se.h + Z.h
    };
  }), A = Vn(r, {
    _: () => s,
    v: () => c,
    S(T, K) {
      const [G] = T, [Y] = K;
      return [Mt(Be(G), Be(Y)).reduce((te, ie) => (te[ie] = G[ie] || Y[ie], te), {})];
    }
  }), B = (T) => {
    const K = P(f);
    oe(T, {
      Ct: u !== K
    }), oe(V, {
      ct: K
    }), u = K;
  }, y = (T, K) => {
    const [G, Y] = T, te = {
      xt: Y
    };
    return oe(V, {
      $t: G
    }), !K && r(te), te;
  }, N = ({ ft: T, dt: K }) => {
    const Y = !(T && !K) && S.R ? A : r, te = {
      ft: T || K,
      dt: K
    };
    B(te), Y(te);
  }, U = (T, K) => {
    const [, G] = C(), Y = {
      Ht: G
    };
    return B(Y), G && !K && (T ? r : A)(Y), Y;
  }, ee = (T, K, G) => {
    const Y = {
      Et: K
    };
    return B(Y), K && !G && A(Y), Y;
  }, [se, ne] = E ? ha(h, y) : [], pe = !R && Ao(h, N, {
    dt: !0
  }), [L, H] = Ds(h, !1, ee, {
    X: p,
    j: p
  }), I = R && Qt && new Qt((T) => {
    const K = T[T.length - 1].contentRect;
    N({
      ft: !0,
      dt: _o(K, i)
    }), i = K;
  }), j = Vn(() => {
    const [, T] = C();
    r({
      Ht: T
    });
  }, {
    _: 222,
    p: !0
  });
  return [() => {
    I && I.observe(h);
    const T = pe && pe(), K = se && se(), G = L(), Y = S.L((te) => {
      te ? A({
        zt: te
      }) : j();
    });
    return () => {
      I && I.disconnect(), T && T(), K && K(), d && d(), G(), Y();
    };
  }, ({ It: T, At: K, Dt: G }) => {
    const Y = {}, [te] = T("update.ignoreMutation"), [ie, be] = T("update.attributes"), [ve, Se] = T("update.elementEvents"), [Z, Ce] = T("update.debounce"), Ae = Se || be, ye = K || G, Ee = (he) => Re(te) && te(he);
    if (Ae) {
      l && l(), d && d();
      const [he, we] = Ds(E || $, !0, U, {
        j: Mt(p, ie || []),
        Y: ve,
        W: m,
        G: (ce, fe) => {
          const { target: $e, attributeName: Te } = ce;
          return (!fe && Te && !R ? Vr($e, m, _) : !1) || !!mt($e, `.${He}`) || !!Ee(ce);
        }
      });
      d = he(), l = we;
    }
    if (Ce)
      if (A.m(), Pe(Z)) {
        const he = Z[0], we = Z[1];
        s = ze(he) && he, c = ze(we) && we;
      } else ze(Z) ? (s = Z, c = !1) : (s = !1, c = !1);
    if (ye) {
      const he = H(), we = ne && ne(), ce = l && l();
      he && oe(Y, ee(he[0], he[1], ye)), we && oe(Y, y(we[0], ye)), ce && oe(Y, U(ce[0], ye));
    }
    return B(Y), Y;
  }, V];
}, ba = (t, e, n, r) => {
  const s = "--os-viewport-percent", c = "--os-scroll-percent", l = "--os-scroll-direction", { U: d } = Ge(), { scrollbars: i } = d(), { slot: u } = i, { vt: m, ht: _, ot: p, Mt: f, gt: h, wt: $, nt: k } = e, { scrollbars: E } = f ? {} : t, { slot: R } = E || {}, F = [], x = [], D = [], O = $o([m, _, p], () => k && $ ? m : _, u, R), P = (L) => {
    if (Kt) {
      const H = new Kt({
        source: h,
        axis: L
      });
      return {
        kt: (j) => {
          const T = j.Tt.animate({
            clear: ["left"],
            [c]: [0, 1]
          }, {
            timeline: H
          });
          return () => T.cancel();
        }
      };
    }
  }, V = {
    x: P("x"),
    y: P("y")
  }, S = () => {
    const { Rt: L, Vt: H } = n, I = (j, T) => to(0, 1, j / (j + T) || 0);
    return {
      x: I(H.x, L.x),
      y: I(H.y, L.y)
    };
  }, w = (L, H, I) => {
    const j = I ? ts : oo;
    le(L, (T) => {
      j(T.Tt, H);
    });
  }, C = (L, H) => {
    le(L, (I) => {
      const [j, T] = H(I);
      Vt(j, T);
    });
  }, A = (L, H, I) => {
    const j = Wn(I), T = j ? I : !0, K = j ? !I : !0;
    T && w(x, L, H), K && w(D, L, H);
  }, B = () => {
    const L = S(), H = (I) => (j) => [j.Tt, {
      [s]: Hn(I) + ""
    }];
    C(x, H(L.x)), C(D, H(L.y));
  }, y = () => {
    if (!Kt) {
      const { Lt: L } = n, H = ws(L, Le(h)), I = (j) => (T) => [T.Tt, {
        [c]: Hn(j) + ""
      }];
      C(x, I(H.x)), C(D, I(H.y));
    }
  }, N = () => {
    const { Lt: L } = n, H = bs(L), I = (j) => (T) => [T.Tt, {
      [l]: j ? "0" : "1"
    }];
    C(x, I(H.x)), C(D, I(H.y));
  }, U = () => {
    if (k && !$) {
      const { Rt: L, Lt: H } = n, I = bs(H), j = ws(H, Le(h)), T = (K) => {
        const { Tt: G } = K, Y = Dt(G) === p && G, te = (ie, be, ve) => {
          const Se = be * ie;
          return co(ve ? Se : -Se);
        };
        return [Y, Y && {
          transform: Or({
            x: te(j.x, L.x, I.x),
            y: te(j.y, L.y, I.y)
          })
        }];
      };
      C(x, T), C(D, T);
    }
  }, ee = (L) => {
    const H = L ? "x" : "y", j = pt(`${He} ${L ? Jr : Zr}`), T = pt(bo), K = pt(os), G = {
      Tt: j,
      Ut: T,
      Pt: K
    }, Y = V[H];
    return me(L ? x : D, G), me(F, [Oe(j, T), Oe(T, K), X(bt, j), Y && Y.kt(G), r(G, A, L)]), G;
  }, se = X(ee, !0), ne = X(ee, !1), pe = () => (Oe(O, x[0].Tt), Oe(O, D[0].Tt), X(Fe, F));
  return se(), ne(), [{
    Nt: B,
    qt: y,
    Bt: N,
    Ft: U,
    jt: A,
    Xt: {
      Yt: x,
      Wt: se,
      Jt: X(C, x)
    },
    Gt: {
      Yt: D,
      Wt: ne,
      Jt: X(C, D)
    }
  }, pe];
}, wa = (t, e, n, r) => (s, c, l) => {
  const { ht: d, ot: i, nt: u, gt: m, Kt: _, Ot: p } = e, { Tt: f, Ut: h, Pt: $ } = s, [k, E] = ft(333), [R, F] = ft(444), x = (P) => {
    Re(m.scrollBy) && m.scrollBy({
      behavior: "smooth",
      left: P.x,
      top: P.y
    });
  }, D = () => {
    const P = "pointerup pointercancel lostpointercapture", V = `client${l ? "X" : "Y"}`, S = l ? dn : un, w = l ? "left" : "top", C = l ? "w" : "h", A = l ? "x" : "y", B = (N, U) => (ee) => {
      const { Rt: se } = n, ne = ht(h)[C] - ht($)[C], L = U * ee / ne * se[A];
      qe(m, {
        [A]: N + L
      });
    }, y = [];
    return _e(h, "pointerdown", (N) => {
      const U = mt(N.target, `.${os}`) === $, ee = U ? $ : h, se = t.scrollbars, ne = se[U ? "dragScroll" : "clickScroll"], { button: pe, isPrimary: L, pointerType: H } = N, { pointers: I } = se;
      if (pe === 0 && L && ne && (I || []).includes(H)) {
        Fe(y), F();
        const T = !U && (N.shiftKey || ne === "instant"), K = X($n, $), G = X($n, h), Y = (fe, $e) => (fe || K())[w] - ($e || G())[w], te = An($n(m)[S]) / ht(m)[C] || 1, ie = B(Le(m)[A], 1 / te), be = N[V], ve = K(), Se = G(), Z = ve[S], Ce = Y(ve, Se) + Z / 2, Ae = be - Se[w], ye = U ? 0 : Ae - Ce, Ee = (fe) => {
          Fe(ce), ee.releasePointerCapture(fe.pointerId);
        }, he = U || T, we = p(), ce = [_e(_, P, Ee), _e(_, "selectstart", (fe) => Bn(fe), {
          H: !1
        }), _e(h, P, Ee), he && _e(h, "pointermove", (fe) => ie(ye + (fe[V] - be))), he && (() => {
          const fe = Le(m);
          we();
          const $e = Le(m), Te = {
            x: $e.x - fe.x,
            y: $e.y - fe.y
          };
          (Jt(Te.x) > 3 || Jt(Te.y) > 3) && (p(), qe(m, fe), x(Te), R(we));
        })];
        if (ee.setPointerCapture(N.pointerId), T)
          ie(ye);
        else if (!U) {
          const fe = Lt(pa);
          if (fe) {
            const $e = fe(ie, ye, Z, (Te) => {
              Te ? we() : me(ce, we);
            });
            me(ce, $e), me(y, X($e, !0));
          }
        }
      }
    });
  };
  let O = !0;
  return X(Fe, [_e($, "pointermove pointerleave", r), _e(f, "pointerenter", () => {
    c(Es, !0);
  }), _e(f, "pointerleave pointercancel", () => {
    c(Es, !1);
  }), !u && _e(f, "mousedown", () => {
    const P = Fn();
    (ms(P, Je) || ms(P, ot) || P === document.body) && Zt(X(In, i), 25);
  }), _e(f, "wheel", (P) => {
    const { deltaX: V, deltaY: S, deltaMode: w } = P;
    O && w === 0 && Dt(f) === d && x({
      x: V,
      y: S
    }), O = !1, c(Ms, !0), k(() => {
      O = !0, c(Ms);
    }), Bn(P);
  }, {
    H: !1,
    I: !0
  }), _e(f, "pointerdown", X(_e, _, "click", fo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), D(), E, F]);
}, ya = (t, e, n, r, s, c) => {
  let l, d, i, u, m, _ = dt, p = 0;
  const f = (L) => L.pointerType === "mouse", [h, $] = ft(), [k, E] = ft(100), [R, F] = ft(100), [x, D] = ft(() => p), [O, P] = ba(t, s, r, wa(e, s, r, (L) => f(L) && ee())), { ht: V, Qt: S, wt: w } = s, { jt: C, Nt: A, qt: B, Bt: y, Ft: N } = O, U = (L, H) => {
    if (D(), L)
      C(Ts);
    else {
      const I = X(C, Ts, !0);
      p > 0 && !H ? x(I) : I();
    }
  }, ee = () => {
    (i ? !l : !u) && (U(!0), k(() => {
      U(!1);
    }));
  }, se = (L) => {
    C(qn, L, !0), C(qn, L, !1);
  }, ne = (L) => {
    f(L) && (l = i, i && U(!0));
  }, pe = [D, E, F, $, () => _(), _e(V, "pointerover", ne, {
    A: !0
  }), _e(V, "pointerenter", ne), _e(V, "pointerleave", (L) => {
    f(L) && (l = !1, i && U(!1));
  }), _e(V, "pointermove", (L) => {
    f(L) && d && ee();
  }), _e(S, "scroll", (L) => {
    h(() => {
      B(), ee();
    }), c(L), N();
  })];
  return [() => X(Fe, me(pe, P())), ({ It: L, Dt: H, Zt: I, tn: j }) => {
    const { nn: T, sn: K, en: G, cn: Y } = j || {}, { Ct: te, dt: ie } = I || {}, { ct: be } = n, { k: ve } = Ge(), { K: Se, rn: Z } = r, [Ce, Ae] = L("showNativeOverlaidScrollbars"), [ye, Ee] = L("scrollbars.theme"), [he, we] = L("scrollbars.visibility"), [ce, fe] = L("scrollbars.autoHide"), [$e, Te] = L("scrollbars.autoHideSuspend"), [St] = L("scrollbars.autoHideDelay"), [Ft, Ht] = L("scrollbars.dragScroll"), [Rt, lt] = L("scrollbars.clickScroll"), [_t, pn] = L("overflow"), hn = ie && !H, gn = Z.x || Z.y, bn = T || K || Y || te || H, Ie = G || we || pn, wn = Ce && ve.x && ve.y, Ct = (Et, tt, Bt) => {
      const At = Et.includes(gt) && (he === st || he === "auto" && tt === gt);
      return C(Qr, At, Bt), At;
    };
    if (p = St, hn && ($e && gn ? (se(!1), _(), R(() => {
      _ = _e(S, "scroll", X(se, !0), {
        A: !0
      });
    })) : se(!0)), Ae && C(Yr, wn), Ee && (C(m), C(ye, !0), m = ye), Te && !$e && se(!0), fe && (d = ce === "move", i = ce === "leave", u = ce === "never", U(u, !0)), Ht && C(na, Ft), lt && C(ta, !!Rt), Ie) {
      const Et = Ct(_t.x, Se.x, !0), tt = Ct(_t.y, Se.y, !1);
      C(ea, !(Et && tt));
    }
    bn && (B(), A(), N(), Y && y(), C(As, !Z.x, !0), C(As, !Z.y, !1), C(Xr, be && !w));
  }, {}, O];
}, $a = (t) => {
  const e = Ge(), { U: n, R: r } = e, { elements: s } = n(), { padding: c, viewport: l, content: d } = s, i = nn(t), u = i ? {} : t, { elements: m } = u, { padding: _, viewport: p, content: f } = m || {}, h = i ? t : u.target, $ = ao(h), k = h.ownerDocument, E = k.documentElement, R = () => k.defaultView || De, F = X(aa, [h]), x = X($o, [h]), D = X(pt, ""), O = X(F, D, l), P = X(x, D, d), V = (Z) => {
    const Ce = ht(Z), Ae = on(Z), ye = Qe(Z, Xs), Ee = Qe(Z, Js);
    return Ae.w - Ce.w > 0 && !wt(ye) || Ae.h - Ce.h > 0 && !wt(Ee);
  }, S = O(p), w = S === h, C = w && $, A = !w && P(f), B = !w && S === A, y = C ? E : S, N = C ? y : h, U = !w && x(D, c, _), ee = !B && A, se = [ee, y, U, N].map((Z) => nn(Z) && !Dt(Z) && Z), ne = (Z) => Z && qs(se, Z), pe = !ne(y) && V(y) ? y : h, L = C ? E : y, I = {
    vt: h,
    ht: N,
    ot: y,
    ln: U,
    bt: ee,
    gt: L,
    Qt: C ? k : y,
    an: $ ? E : pe,
    Kt: k,
    wt: $,
    Mt: i,
    nt: w,
    un: R,
    yt: (Z) => es(y, Je, Z),
    St: (Z, Ce) => sn(y, Je, Z, Ce),
    Ot: () => sn(L, Je, Pr, !0)
  }, { vt: j, ht: T, ln: K, ot: G, bt: Y } = I, te = [() => {
    Ne(T, [ot, kn]), Ne(j, kn), $ && Ne(E, [kn, ot]);
  }];
  let ie = Ln([Y, G, K, T, j].find((Z) => Z && !ne(Z)));
  const be = C ? j : Y || G, ve = X(Fe, te);
  return [I, () => {
    const Z = R(), Ce = Fn(), Ae = (ce) => {
      Oe(Dt(ce), Ln(ce)), bt(ce);
    }, ye = (ce) => _e(ce, "focusin focusout focus blur", fo, {
      I: !0,
      H: !1
    }), Ee = "tabindex", he = Zn(G, Ee), we = ye(Ce);
    return Xe(T, ot, w ? "" : Nr), Xe(K, Un, ""), Xe(G, Je, ""), Xe(Y, Cs, ""), w || (Xe(G, Ee, he || "-1"), $ && Xe(E, Ss, "")), Oe(be, ie), Oe(T, K), Oe(K || T, !w && G), Oe(G, Y), me(te, [we, () => {
      const ce = Fn(), fe = ne(G), $e = fe && ce === G ? j : ce, Te = ye($e);
      Ne(K, Un), Ne(Y, Cs), Ne(G, Je), $ && Ne(E, Ss), he ? Xe(G, Ee, he) : Ne(G, Ee), ne(Y) && Ae(Y), fe && Ae(G), ne(K) && Ae(K), In($e), Te();
    }]), r && !w && (Qn(G, Je, go), me(te, X(Ne, G, Je))), In(!w && $ && Ce === j && Z.top === Z ? G : Ce), we(), ie = 0, ve;
  }, ve];
}, ka = ({ bt: t }) => ({ Zt: e, _n: n, Dt: r }) => {
  const { xt: s } = e || {}, { $t: c } = n;
  t && (s || r) && Vt(t, {
    [un]: c && "100%"
  });
}, xa = ({ ht: t, ln: e, ot: n, nt: r }, s) => {
  const [c, l] = Ve({
    i: Mr,
    o: hs()
  }, X(hs, t, "padding", ""));
  return ({ It: d, Zt: i, _n: u, Dt: m }) => {
    let [_, p] = l(m);
    const { R: f } = Ge(), { ft: h, Ht: $, Ct: k } = i || {}, { ct: E } = u, [R, F] = d("paddingAbsolute");
    (h || p || (m || $)) && ([_, p] = c(m));
    const D = !r && (F || k || p);
    if (D) {
      const O = !R || !e && !f, P = _.r + _.l, V = _.t + _.b, S = {
        [Ws]: O && !E ? -P : 0,
        [Ys]: O ? -V : 0,
        [Ks]: O && E ? -P : 0,
        top: O ? -_.t : 0,
        right: O ? E ? -_.r : "auto" : 0,
        left: O ? E ? "auto" : -_.l : 0,
        [dn]: O && `calc(100% + ${P}px)`
      }, w = {
        [zs]: O ? _.t : 0,
        [Ps]: O ? _.r : 0,
        [Gs]: O ? _.b : 0,
        [js]: O ? _.l : 0
      };
      Vt(e || n, S), Vt(n, w), oe(s, {
        ln: _,
        dn: !O,
        rt: e ? w : oe({}, S, w)
      });
    }
    return {
      fn: D
    };
  };
}, Sa = (t, e) => {
  const n = Ge(), { ht: r, ln: s, ot: c, nt: l, Qt: d, gt: i, wt: u, St: m, un: _ } = t, { R: p } = n, f = u && l, h = X(Ns, 0), $ = {
    display: () => !1,
    direction: (H) => H !== "ltr",
    flexDirection: (H) => H.endsWith("-reverse"),
    writingMode: (H) => H !== "horizontal-tb"
  }, k = Be($), E = {
    i: Zs,
    o: {
      w: 0,
      h: 0
    }
  }, R = {
    i: Wt,
    o: {}
  }, F = (H) => {
    m(ho, !f && H);
  }, x = (H) => {
    if (!k.some((be) => {
      const ve = H[be];
      return ve && $[be](ve);
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
    F(!0);
    const j = Le(i), T = m(jr, !0), K = _e(d, gt, (be) => {
      const ve = Le(i);
      be.isTrusted && ve.x === j.x && ve.y === j.y && vo(be);
    }, {
      I: !0,
      A: !0
    });
    qe(i, {
      x: 0,
      y: 0
    }), T();
    const G = Le(i), Y = on(i);
    qe(i, {
      x: Y.w,
      y: Y.h
    });
    const te = Le(i);
    qe(i, {
      x: te.x - G.x < 1 && -Y.w,
      y: te.y - G.y < 1 && -Y.h
    });
    const ie = Le(i);
    return qe(i, j), Gn(() => K()), {
      D: G,
      M: ie
    };
  }, D = (H, I) => {
    const j = De.devicePixelRatio % 1 !== 0 ? 1 : 0, T = {
      w: h(H.w - I.w),
      h: h(H.h - I.h)
    };
    return {
      w: T.w > j ? T.w : 0,
      h: T.h > j ? T.h : 0
    };
  }, [O, P] = Ve(E, X(ns, c)), [V, S] = Ve(E, X(on, c)), [w, C] = Ve(E), [A] = Ve(R), [B, y] = Ve(E), [N] = Ve(R), [U] = Ve({
    i: (H, I) => _n(H, I, k),
    o: {}
  }, () => Rr(c) ? Qe(c, k) : {}), [ee, se] = Ve({
    i: (H, I) => Wt(H.D, I.D) && Wt(H.M, I.M),
    o: mo()
  }), ne = Lt(Eo), pe = (H, I) => `${I ? Ur : qr}${Tr(H)}`, L = (H) => {
    const I = (T) => [st, it, gt].map((K) => pe(K, T)), j = I(!0).concat(I()).join(" ");
    m(j), m(Be(H).map((T) => pe(H[T], T === "x")).join(" "), !0);
  };
  return ({ It: H, Zt: I, _n: j, Dt: T }, { fn: K }) => {
    const { ft: G, Ht: Y, Ct: te, dt: ie, zt: be } = I || {}, ve = ne && ne.tt(t, e, j, n, H), { it: Se, ut: Z, _t: Ce } = ve || {}, [Ae, ye] = fa(H, n), [Ee, he] = H("overflow"), we = wt(Ee.x), ce = wt(Ee.y), fe = !0;
    let $e = P(T), Te = S(T), St = C(T), Ft = y(T);
    ye && p && m(go, !Ae);
    {
      es(r, ot, Xt) && F(!0);
      const [ds] = Z ? Z() : [], [It] = $e = O(T), [Nt] = Te = V(T), Ut = uo(c), qt = f && Hr(_()), Qo = {
        w: h(Nt.w + It.w),
        h: h(Nt.h + It.h)
      }, us = {
        w: h((qt ? qt.w : Ut.w + h(Ut.w - Nt.w)) + It.w),
        h: h((qt ? qt.h : Ut.h + h(Ut.h - Nt.h)) + It.h)
      };
      ds && ds(), Ft = B(us), St = w(D(Qo, us), T);
    }
    const [Ht, Rt] = Ft, [lt, _t] = St, [pn, hn] = Te, [gn, bn] = $e, [Ie, wn] = A({
      x: lt.w > 0,
      y: lt.h > 0
    }), Ct = we && ce && (Ie.x || Ie.y) || we && Ie.x && !Ie.y || ce && Ie.y && !Ie.x, Et = K || te || be || bn || hn || Rt || _t || he || ye || fe, tt = ma(Ie, Ee), [Bt, At] = N(tt.K), [Yo, Xo] = U(T), cs = te || ie || Xo || wn || T, [Jo, Zo] = cs ? ee(x(Yo), T) : se();
    return Et && (At && L(tt.K), Ce && Se && Vt(c, Ce(tt, j, Se(tt, pn, gn)))), F(!1), sn(r, ot, Xt, Ct), sn(s, Un, Xt, Ct), oe(e, {
      K: Bt,
      Vt: {
        x: Ht.w,
        y: Ht.h
      },
      Rt: {
        x: lt.w,
        y: lt.h
      },
      rn: Ie,
      Lt: Br(Jo, lt)
    }), {
      en: At,
      nn: Rt,
      sn: _t,
      cn: Zo || _t,
      vn: cs
    };
  };
}, Ca = (t) => {
  const [e, n, r] = $a(t), s = {
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
  }, { vt: c, gt: l, nt: d, Ot: i } = e, { R: u, k: m } = Ge(), _ = !u && (m.x || m.y), p = [ka(e), xa(e, s), Sa(e, s)];
  return [n, (f) => {
    const h = {}, k = _ && Le(l), E = k && i();
    return le(p, (R) => {
      oe(h, R(f, h) || {});
    }), qe(l, k), E && E(), !d && qe(c, 0), h;
  }, s, e, r];
}, Ea = (t, e, n, r, s) => {
  let c = !1;
  const l = xs(e, {}), [d, i, u, m, _] = Ca(t), [p, f, h] = ga(m, u, l, (x) => {
    F({}, x);
  }), [$, k, , E] = ya(t, e, h, u, m, s), R = (x) => Be(x).some((D) => !!x[D]), F = (x, D) => {
    if (n())
      return !1;
    const { pn: O, Dt: P, At: V, hn: S } = x, w = O || {}, C = !!P || !c, A = {
      It: xs(e, w, C),
      pn: w,
      Dt: C
    };
    if (S)
      return k(A), !1;
    const B = D || f(oe({}, A, {
      At: V
    })), y = i(oe({}, A, {
      _n: h,
      Zt: B
    }));
    k(oe({}, A, {
      Zt: B,
      tn: y
    }));
    const N = R(B), U = R(y), ee = N || U || !Jn(w) || C;
    return c = !0, ee && r(x, {
      Zt: B,
      tn: y
    }), ee;
  };
  return [() => {
    const { an: x, gt: D, Ot: O } = m, P = Le(x), V = [p(), d(), $()], S = O();
    return qe(D, P), S(), X(Fe, V);
  }, F, () => ({
    gn: h,
    bn: u
  }), {
    wn: m,
    yn: E
  }, _];
}, je = (t, e, n) => {
  const { N: r } = Ge(), s = nn(t), c = s ? t : t.target, l = ko(c);
  if (e && !l) {
    let d = !1;
    const i = [], u = {}, m = (w) => {
      const C = eo(w), A = Lt(_a);
      return A ? A(C, !0) : C;
    }, _ = oe({}, r(), m(e)), [p, f, h] = Nn(), [$, k, E] = Nn(n), R = (w, C) => {
      E(w, C), h(w, C);
    }, [F, x, D, O, P] = Ea(t, _, () => d, ({ pn: w, Dt: C }, { Zt: A, tn: B }) => {
      const { ft: y, Ct: N, xt: U, Ht: ee, Et: se, dt: ne } = A, { nn: pe, sn: L, en: H, cn: I } = B;
      R("updated", [S, {
        updateHints: {
          sizeChanged: !!y,
          directionChanged: !!N,
          heightIntrinsicChanged: !!U,
          overflowEdgeChanged: !!pe,
          overflowAmountChanged: !!L,
          overflowStyleChanged: !!H,
          scrollCoordinatesChanged: !!I,
          contentMutation: !!ee,
          hostMutation: !!se,
          appear: !!ne
        },
        changedOptions: w || {},
        force: !!C
      }]);
    }, (w) => R("scroll", [S, w])), V = (w) => {
      ca(c), Fe(i), d = !0, R("destroyed", [S, w]), f(), k();
    }, S = {
      options(w, C) {
        if (w) {
          const A = C ? r() : {}, B = po(_, oe(A, m(w)));
          Jn(B) || (oe(_, B), x({
            pn: B
          }));
        }
        return oe({}, _);
      },
      on: $,
      off: (w, C) => {
        w && C && k(w, C);
      },
      state() {
        const { gn: w, bn: C } = D(), { ct: A } = w, { Vt: B, Rt: y, K: N, rn: U, ln: ee, dn: se, Lt: ne } = C;
        return oe({}, {
          overflowEdge: B,
          overflowAmount: y,
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
        const { vt: w, ht: C, ln: A, ot: B, bt: y, gt: N, Qt: U } = O.wn, { Xt: ee, Gt: se } = O.yn, ne = (L) => {
          const { Pt: H, Ut: I, Tt: j } = L;
          return {
            scrollbar: j,
            track: I,
            handle: H
          };
        }, pe = (L) => {
          const { Yt: H, Wt: I } = L, j = ne(H[0]);
          return oe({}, j, {
            clone: () => {
              const T = ne(I());
              return x({
                hn: !0
              }), T;
            }
          });
        };
        return oe({}, {
          target: w,
          host: C,
          padding: A || B,
          viewport: B,
          content: y || B,
          scrollOffsetElement: N,
          scrollEventElement: U,
          scrollbarHorizontal: pe(ee),
          scrollbarVertical: pe(se)
        });
      },
      update: (w) => x({
        Dt: w,
        At: !0
      }),
      destroy: X(V, !1),
      plugin: (w) => u[Be(w)[0]]
    };
    return me(i, [P]), ia(c, S), Co(xo, je, [S, p, u]), la(O.wn.wt, !s && t.cancel) ? (V(!0), S) : (me(i, F()), R("initialized", [S]), S.update(), S);
  }
  return l;
};
je.plugin = (t) => {
  const e = Pe(t), n = e ? t : [t], r = n.map((s) => Co(s, je)[0]);
  return ua(n), e ? r : r[0];
};
je.valid = (t) => {
  const e = t && t.elements, n = Re(e) && e();
  return tn(n) && !!ko(n.target);
};
je.env = () => {
  const { T: t, k: e, R: n, V: r, B: s, F: c, U: l, P: d, N: i, q: u } = Ge();
  return oe({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: r,
    staticDefaultInitialization: s,
    staticDefaultOptions: c,
    getDefaultInitialization: l,
    setDefaultInitialization: d,
    getDefaultOptions: i,
    setDefaultOptions: u
  });
};
je.nonce = oa;
function Aa() {
  let t;
  const e = M(null), n = Math.floor(Math.random() * 2 ** 32), r = M(!1), s = M([]), c = () => s.value, l = () => t.getSelection(), d = () => s.value.length, i = () => t.clearSelection(!0), u = M(), m = M(null), _ = M(null), p = M(null), f = M(null);
  function h() {
    t = new ur({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: D, event: O, isDragging: P }) => {
      if (P)
        t.Interaction._reset(O);
      else {
        r.value = !1;
        const V = e.value.offsetWidth - O.offsetX, S = e.value.offsetHeight - O.offsetY;
        V < 15 && S < 15 && t.Interaction._reset(O), O.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(O);
      }
    }), document.addEventListener("dragleave", (D) => {
      !D.buttons && r.value && (r.value = !1);
    });
  }
  const $ = () => ct(() => {
    t.addSelection(
      t.getSelectables()
    ), k();
  }), k = () => {
    s.value = t.getSelection().map((D) => JSON.parse(D.dataset.item)), u.value(s.value);
  }, E = () => ct(() => {
    const D = c().map((O) => O.path);
    i(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((O) => D.includes(JSON.parse(O.dataset.item).path))
    ), k(), F();
  }), R = (D) => {
    u.value = D, t.subscribe("DS:end", ({ items: O, event: P, isDragging: V }) => {
      s.value = O.map((S) => JSON.parse(S.dataset.item)), D(O.map((S) => JSON.parse(S.dataset.item)));
    });
  }, F = () => {
    m.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (_.value.style.height = e.value.scrollHeight + "px", _.value.style.display = "block") : (_.value.style.height = "100%", _.value.style.display = "none"));
  }, x = (D) => {
    if (!m.value)
      return;
    const { scrollOffsetElement: O } = m.value.elements();
    O.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return xe(() => {
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
      initialized: (D) => {
        m.value = D;
      },
      scroll: (D, O) => {
        const { scrollOffsetElement: P } = D.elements();
        e.value.scrollTo({
          top: P.scrollTop,
          left: 0
        });
      }
    }), h(), F(), f.value = new ResizeObserver(F), f.value.observe(e.value), e.value.addEventListener("scroll", x), t.subscribe("DS:scroll", ({ isDragging: D }) => D || x());
  }), jn(() => {
    t && t.stop(), f.value && f.value.disconnect();
  }), Ls(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: r,
    scrollBar: _,
    scrollBarContainer: p,
    getSelected: c,
    getSelection: l,
    selectAll: $,
    clearSelection: i,
    refreshSelection: E,
    getCount: d,
    onSelect: R
  };
}
function Ta(t, e) {
  const n = M(t), r = M(e), s = M([]), c = M([]), l = M([]), d = M(!1), i = M(5);
  let u = !1, m = !1;
  const _ = yt({
    adapter: n,
    storages: [],
    dirname: r,
    files: []
  });
  function p() {
    let R = [], F = [], x = r.value ?? n.value + "://";
    x.length === 0 && (s.value = []), x.replace(n.value + "://", "").split("/").forEach(function(P) {
      R.push(P), R.join("/") !== "" && F.push({
        basename: P,
        name: P,
        path: n.value + "://" + R.join("/"),
        type: "dir"
      });
    }), c.value = F;
    const [D, O] = h(F, i.value);
    l.value = O, s.value = D;
  }
  function f(R) {
    i.value = R, p();
  }
  function h(R, F) {
    return R.length > F ? [R.slice(-F), R.slice(0, -F)] : [R, []];
  }
  function $(R = null) {
    d.value = R ?? !d.value;
  }
  function k() {
    return s.value && s.value.length && !m;
  }
  const E = rt(() => {
    var R;
    return ((R = s.value[s.value.length - 2]) == null ? void 0 : R.path) ?? n.value + "://";
  });
  return xe(() => {
  }), Me(r, p), xe(p), {
    adapter: n,
    path: r,
    loading: u,
    searchMode: m,
    data: _,
    breadcrumbs: s,
    breadcrumbItems: c,
    limitBreadcrumbItems: f,
    hiddenBreadcrumbs: l,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: $,
    isGoUpAvailable: k,
    parentFolderPath: E
  };
}
const Ma = (t, e) => {
  const n = gr(t.id), r = dr(), s = n.getStore("metricUnits", !1), c = xr(n, t.theme), l = e.i18n, d = t.locale ?? e.locale, i = (p) => Array.isArray(p) ? p : yr, u = n.getStore("persist-path", t.persist), m = u ? n.getStore("path", t.path) : t.path, _ = u ? n.getStore("adapter") : null;
  return yt({
    /** 
    * Core properties
    * */
    // app version
    version: $r,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: r,
    // storage
    storage: n,
    // localization object
    i18n: wr(n, d, r, l),
    // modal state
    modal: Sr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: rt(() => Aa()),
    // http object
    requester: hr(t.request),
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
    fs: Ta(_, m)
  });
}, Da = /* @__PURE__ */ a("div", { class: "vuefinder__modal-layout__overlay" }, null, -1), Va = { class: "vuefinder__modal-layout__container" }, Oa = { class: "vuefinder__modal-layout__content" }, La = { class: "vuefinder__modal-layout__footer" }, Ke = {
  __name: "ModalLayout",
  setup(t) {
    const e = M(null), n = re("ServiceContainer");
    return xe(() => {
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
    }), (r, s) => (v(), g("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = $t((c) => o(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      Da,
      a("div", Va, [
        a("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = Ze((c) => o(n).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            a("div", Oa, [
              Tt(r.$slots, "default")
            ]),
            a("div", La, [
              Tt(r.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Fa = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, s] of e)
    n[r] = s;
  return n;
}, Ha = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const r = re("ServiceContainer"), s = M(!1), { t: c } = r.i18n;
    let l = null;
    const d = () => {
      clearTimeout(l), s.value = !0, l = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return xe(() => {
      r.emitter.on(t.on, d);
    }), jn(() => {
      clearTimeout(l);
    }), {
      shown: s,
      t: c
    };
  }
}, Ra = { key: 1 };
function Ba(t, e, n, r, s, c) {
  return v(), g("div", {
    class: ae(["vuefinder__action-message", { "vuefinder__action-message--hidden": !r.shown }])
  }, [
    t.$slots.default ? Tt(t.$slots, "default", { key: 0 }) : (v(), g("span", Ra, b(r.t("Saved.")), 1))
  ], 2);
}
const vt = /* @__PURE__ */ Fa(Ha, [["render", Ba]]), Ia = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, Na = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
}, null, -1), Ua = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
}, null, -1), qa = [
  Na,
  Ua
];
function za(t, e) {
  return v(), g("svg", Ia, [...qa]);
}
const Pa = { render: za }, ja = { class: "vuefinder__modal-header" }, Ga = { class: "vuefinder__modal-header__icon-container" }, Ka = {
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
    return (e, n) => (v(), g("div", ja, [
      a("div", Ga, [
        (v(), W(Fs(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      a("h3", Ka, b(t.title), 1)
    ]));
  }
}, Wa = { class: "vuefinder__about-modal__content" }, Ya = { class: "vuefinder__about-modal__main" }, Xa = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Ja = ["onClick", "aria-current"], Za = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Qa = { class: "vuefinder__about-modal__description" }, el = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, tl = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, nl = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, sl = { class: "vuefinder__about-modal__description" }, ol = { class: "vuefinder__about-modal__settings" }, rl = { class: "vuefinder__about-modal__setting flex" }, al = { class: "vuefinder__about-modal__setting-input" }, ll = { class: "vuefinder__about-modal__setting-label" }, il = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, cl = { class: "vuefinder__about-modal__setting flex" }, dl = { class: "vuefinder__about-modal__setting-input" }, ul = { class: "vuefinder__about-modal__setting-label" }, _l = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, vl = { class: "vuefinder__about-modal__setting flex" }, fl = { class: "vuefinder__about-modal__setting-input" }, ml = { class: "vuefinder__about-modal__setting-label" }, pl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, hl = { class: "vuefinder__about-modal__setting flex" }, gl = { class: "vuefinder__about-modal__setting-input" }, bl = { class: "vuefinder__about-modal__setting-label" }, wl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, yl = { class: "vuefinder__about-modal__setting" }, $l = { class: "vuefinder__about-modal__setting-input" }, kl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, xl = { class: "vuefinder__about-modal__setting-label" }, Sl = ["label"], Cl = ["value"], El = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Al = { class: "vuefinder__about-modal__setting-input" }, Tl = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Ml = { class: "vuefinder__about-modal__setting-label" }, Dl = ["label"], Vl = ["value"], Ol = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Ll = { class: "vuefinder__about-modal__shortcuts" }, Fl = { class: "vuefinder__about-modal__shortcut" }, Hl = /* @__PURE__ */ a("kbd", null, "F2", -1), Rl = { class: "vuefinder__about-modal__shortcut" }, Bl = /* @__PURE__ */ a("kbd", null, "F5", -1), Il = { class: "vuefinder__about-modal__shortcut" }, Nl = /* @__PURE__ */ a("kbd", null, "Del", -1), Ul = { class: "vuefinder__about-modal__shortcut" }, ql = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Esc")
], -1), zl = { class: "vuefinder__about-modal__shortcut" }, Pl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ a("kbd", null, "A")
], -1), jl = { class: "vuefinder__about-modal__shortcut" }, Gl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ a("kbd", null, "F")
], -1), Kl = { class: "vuefinder__about-modal__shortcut" }, Wl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ a("kbd", null, "E")
], -1), Yl = { class: "vuefinder__about-modal__shortcut" }, Xl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ a("kbd", null, ",")
], -1), Jl = { class: "vuefinder__about-modal__shortcut" }, Zl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ a("kbd", null, "Enter")
], -1), Ql = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, ei = { class: "vuefinder__about-modal__description" }, To = {
  __name: "ModalAbout",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n, clearStore: r } = e.storage, { t: s } = e.i18n, c = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, l = rt(() => [
      { name: s("About"), key: c.ABOUT },
      { name: s("Settings"), key: c.SETTINGS },
      { name: s("Shortcuts"), key: c.SHORTCUTS },
      { name: s("Reset"), key: c.RESET }
    ]), d = M("about"), i = async () => {
      r(), location.reload();
    }, u = (R) => {
      e.theme.set(R), e.emitter.emit("vf-theme-saved");
    }, m = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Is : Bs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, _ = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, f = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = re("VueFinderOptions"), k = Object.fromEntries(
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
    return (R, F) => (v(), W(Ke, null, {
      buttons: Q(() => [
        a("button", {
          type: "button",
          onClick: F[7] || (F[7] = (x) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(s)("Close")), 1)
      ]),
      default: Q(() => [
        a("div", Wa, [
          z(et, {
            icon: o(Pa),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          a("div", Ya, [
            a("div", null, [
              a("div", null, [
                a("nav", Xa, [
                  (v(!0), g(ge, null, ke(l.value, (x) => (v(), g("button", {
                    key: x.name,
                    onClick: (D) => d.value = x.key,
                    class: ae([x.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": x.current ? "page" : void 0
                  }, b(x.name), 11, Ja))), 128))
                ])
              ])
            ]),
            d.value === c.ABOUT ? (v(), g("div", Za, [
              a("div", Qa, b(o(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              a("a", el, b(o(s)("Project home")), 1),
              a("a", tl, b(o(s)("Follow on GitHub")), 1)
            ])) : q("", !0),
            d.value === c.SETTINGS ? (v(), g("div", nl, [
              a("div", sl, b(o(s)("Customize your experience with the following settings")), 1),
              a("div", ol, [
                a("fieldset", null, [
                  a("div", rl, [
                    a("div", al, [
                      ue(a("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": F[0] || (F[0] = (x) => o(e).metricUnits = x),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).metricUnits]
                      ])
                    ]),
                    a("div", ll, [
                      a("label", il, [
                        J(b(o(s)("Use Metric Units")) + " ", 1),
                        z(vt, {
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
                  a("div", cl, [
                    a("div", dl, [
                      ue(a("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": F[1] || (F[1] = (x) => o(e).compactListView = x),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).compactListView]
                      ])
                    ]),
                    a("div", ul, [
                      a("label", _l, [
                        J(b(o(s)("Compact list view")) + " ", 1),
                        z(vt, {
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
                  a("div", vl, [
                    a("div", fl, [
                      ue(a("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": F[2] || (F[2] = (x) => o(e).persist = x),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).persist]
                      ])
                    ]),
                    a("div", ml, [
                      a("label", pl, [
                        J(b(o(s)("Persist path on reload")) + " ", 1),
                        z(vt, {
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
                  a("div", hl, [
                    a("div", gl, [
                      ue(a("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": F[3] || (F[3] = (x) => o(e).showThumbnails = x),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).showThumbnails]
                      ])
                    ]),
                    a("div", bl, [
                      a("label", wl, [
                        J(b(o(s)("Show thumbnails")) + " ", 1),
                        z(vt, {
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
                  a("div", yl, [
                    a("div", $l, [
                      a("label", kl, b(o(s)("Theme")), 1)
                    ]),
                    a("div", xl, [
                      ue(a("select", {
                        id: "theme",
                        "onUpdate:modelValue": F[4] || (F[4] = (x) => o(e).theme.value = x),
                        onChange: F[5] || (F[5] = (x) => u(x.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: o(s)("Theme")
                        }, [
                          (v(!0), g(ge, null, ke(E.value, (x, D) => (v(), g("option", { value: D }, b(x), 9, Cl))), 256))
                        ], 8, Sl)
                      ], 544), [
                        [En, o(e).theme.value]
                      ]),
                      z(vt, {
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
                  o(e).features.includes(o(de).LANGUAGE) && Object.keys(o(k)).length > 1 ? (v(), g("div", El, [
                    a("div", Al, [
                      a("label", Tl, b(o(s)("Language")), 1)
                    ]),
                    a("div", Ml, [
                      ue(a("select", {
                        id: "language",
                        "onUpdate:modelValue": F[6] || (F[6] = (x) => o(e).i18n.locale = x),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: o(s)("Language")
                        }, [
                          (v(!0), g(ge, null, ke(o(k), (x, D) => (v(), g("option", { value: D }, b(x), 9, Vl))), 256))
                        ], 8, Dl)
                      ], 512), [
                        [En, o(e).i18n.locale]
                      ]),
                      z(vt, {
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
            d.value === c.SHORTCUTS ? (v(), g("div", Ol, [
              a("div", Ll, [
                a("div", Fl, [
                  a("div", null, b(o(s)("Rename")), 1),
                  Hl
                ]),
                a("div", Rl, [
                  a("div", null, b(o(s)("Refresh")), 1),
                  Bl
                ]),
                a("div", Il, [
                  J(b(o(s)("Delete")) + " ", 1),
                  Nl
                ]),
                a("div", Ul, [
                  J(b(o(s)("Escape")) + " ", 1),
                  ql
                ]),
                a("div", zl, [
                  J(b(o(s)("Select All")) + " ", 1),
                  Pl
                ]),
                a("div", jl, [
                  J(b(o(s)("Search")) + " ", 1),
                  Gl
                ]),
                a("div", Kl, [
                  J(b(o(s)("Toggle Sidebar")) + " ", 1),
                  Wl
                ]),
                a("div", Yl, [
                  J(b(o(s)("Open Settings")) + " ", 1),
                  Xl
                ]),
                a("div", Jl, [
                  J(b(o(s)("Toggle Full Screen")) + " ", 1),
                  Zl
                ])
              ])
            ])) : q("", !0),
            d.value === c.RESET ? (v(), g("div", Ql, [
              a("div", ei, b(o(s)("Reset all settings to default")), 1),
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
}, ti = ["title"], ni = /* @__PURE__ */ a("svg", {
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
], -1), si = [
  ni
], We = {
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
    const n = e, r = re("ServiceContainer"), { t: s } = r.i18n, c = M(!1), l = M(null), d = M((u = l.value) == null ? void 0 : u.strMessage);
    Me(d, () => c.value = !1);
    const i = () => {
      n("hidden"), c.value = !0;
    };
    return (m, _) => (v(), g("div", null, [
      c.value ? q("", !0) : (v(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: ae(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Tt(m.$slots, "default"),
        a("div", {
          class: "vuefinder__message__close",
          onClick: i,
          title: o(s)("Close")
        }, si, 8, ti)
      ], 2))
    ]));
  }
}, oi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ri = /* @__PURE__ */ a("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), ai = [
  ri
];
function li(t, e) {
  return v(), g("svg", oi, [...ai]);
}
const Mo = { render: li }, ii = { class: "vuefinder__delete-modal__content" }, ci = { class: "vuefinder__delete-modal__form" }, di = { class: "vuefinder__delete-modal__description" }, ui = { class: "vuefinder__delete-modal__files vf-scrollbar" }, _i = { class: "vuefinder__delete-modal__file" }, vi = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fi = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), mi = [
  fi
], pi = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hi = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), gi = [
  hi
], bi = { class: "vuefinder__delete-modal__file-name" }, wi = { class: "vuefinder__delete-modal__warning" }, as = {
  __name: "ModalDelete",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = M(e.modal.data.items), s = M(""), c = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: l, type: d }) => ({ path: l, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (l) => {
          s.value = n(l.message);
        }
      });
    };
    return (l, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, b(o(n)("Yes, Delete!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        a("div", wi, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        a("div", null, [
          z(et, {
            icon: o(Mo),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          a("div", ii, [
            a("div", ci, [
              a("p", di, b(o(n)("Are you sure you want to delete these files?")), 1),
              a("div", ui, [
                (v(!0), g(ge, null, ke(r.value, (i) => (v(), g("p", _i, [
                  i.type === "dir" ? (v(), g("svg", vi, mi)) : (v(), g("svg", pi, gi)),
                  a("span", bi, b(i.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (v(), W(We, {
                key: 0,
                onHidden: d[0] || (d[0] = (i) => s.value = ""),
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
}, yi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, $i = /* @__PURE__ */ a("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), ki = [
  $i
];
function xi(t, e) {
  return v(), g("svg", yi, [...ki]);
}
const Do = { render: xi }, Si = { class: "vuefinder__rename-modal__content" }, Ci = { class: "vuefinder__rename-modal__item" }, Ei = { class: "vuefinder__rename-modal__item-info" }, Ai = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ti = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Mi = [
  Ti
], Di = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vi = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Oi = [
  Vi
], Li = { class: "vuefinder__rename-modal__item-name" }, ls = {
  __name: "ModalRename",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = M(e.modal.data.items[0]), s = M(e.modal.data.items[0].basename), c = M(""), l = () => {
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
    return (d, i) => (v(), W(Ke, null, {
      buttons: Q(() => [
        a("button", {
          type: "button",
          onClick: l,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Rename")), 1),
        a("button", {
          type: "button",
          onClick: i[2] || (i[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        a("div", null, [
          z(et, {
            icon: o(Do),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          a("div", Si, [
            a("div", Ci, [
              a("p", Ei, [
                r.value.type === "dir" ? (v(), g("svg", Ai, Mi)) : (v(), g("svg", Di, Oi)),
                a("span", Li, b(r.value.basename), 1)
              ]),
              ue(a("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (u) => s.value = u),
                onKeyup: $t(l, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [kt, s.value]
              ]),
              c.value.length ? (v(), W(We, {
                key: 0,
                onHidden: i[1] || (i[1] = (u) => c.value = ""),
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
function Fi(t) {
  const e = (n) => {
    n.code === Ye.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Ye.F2 && t.features.includes(de.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(ls, { items: t.dragSelect.getSelected() })), n.code === Ye.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Ye.DELETE && (!t.dragSelect.getCount() || t.modal.open(as, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Ye.BACKSLASH && t.modal.open(To), n.metaKey && n.code === Ye.KEY_F && t.features.includes(de.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Ye.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Ye.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Ye.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
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
}, Ri = /* @__PURE__ */ a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Bi = [
  Ri
];
function Ii(t, e) {
  return v(), g("svg", Hi, [...Bi]);
}
const Vo = { render: Ii }, Ni = { class: "vuefinder__new-folder-modal__content" }, Ui = { class: "vuefinder__new-folder-modal__form" }, qi = { class: "vuefinder__new-folder-modal__description" }, zi = ["placeholder"], Oo = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, r = M(""), s = M(""), c = () => {
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
        onError: (l) => {
          s.value = n(l.message);
        }
      });
    };
    return (l, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        a("div", null, [
          z(et, {
            icon: o(Vo),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          a("div", Ni, [
            a("div", Ui, [
              a("p", qi, b(o(n)("Create a new folder")), 1),
              ue(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => r.value = i),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text"
              }, null, 40, zi), [
                [kt, r.value]
              ]),
              s.value.length ? (v(), W(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
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
}, Pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, ji = /* @__PURE__ */ a("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Gi = [
  ji
];
function Ki(t, e) {
  return v(), g("svg", Pi, [...Gi]);
}
const Lo = { render: Ki }, Wi = { class: "vuefinder__new-file-modal__content" }, Yi = { class: "vuefinder__new-file-modal__form" }, Xi = { class: "vuefinder__new-file-modal__description" }, Ji = ["placeholder"], Zi = {
  __name: "ModalNewFile",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, r = M(""), s = M(""), c = () => {
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
        onError: (l) => {
          s.value = n(l.message);
        }
      });
    };
    return (l, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        a("div", null, [
          z(et, {
            icon: o(Lo),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          a("div", Wi, [
            a("div", Yi, [
              a("p", Xi, b(o(n)("Create a new file")), 1),
              ue(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => r.value = i),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, Ji), [
                [kt, r.value]
              ]),
              s.value.length ? (v(), W(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
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
const Qi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, ec = /* @__PURE__ */ a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), tc = [
  ec
];
function nc(t, e) {
  return v(), g("svg", Qi, [...tc]);
}
const Fo = { render: nc }, sc = { class: "vuefinder__upload-modal__content" }, oc = {
  key: 0,
  class: "pointer-events-none"
}, rc = {
  key: 1,
  class: "pointer-events-none"
}, ac = ["disabled"], lc = ["disabled"], ic = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, cc = ["textContent"], dc = { class: "vuefinder__upload-modal__file-info" }, uc = { class: "vuefinder__upload-modal__file-name hidden md:block" }, _c = { class: "vuefinder__upload-modal__file-name md:hidden" }, vc = {
  key: 0,
  class: "ml-auto"
}, fc = ["title", "disabled", "onClick"], mc = /* @__PURE__ */ a("svg", {
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
], -1), pc = [
  mc
], hc = {
  key: 0,
  class: "py-2"
}, gc = ["disabled"], bc = {
  __name: "ModalUpload",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = M({ QUEUE_ENTRY_STATUS: s }), l = M(null), d = M(null), i = M(null), u = M(null), m = M(null), _ = M(null), p = M([]), f = M(""), h = M(!1), $ = M(!1);
    let k;
    function E(A) {
      return p.value.findIndex((B) => B.id === A);
    }
    function R(A, B = null) {
      B = B ?? (A.webkitRelativePath || A.name), k.addFile({
        name: B,
        type: A.type,
        data: A,
        source: "Local"
      });
    }
    function F(A) {
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
    const x = (A) => {
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
    function D() {
      u.value.click();
    }
    function O() {
      if (!h.value) {
        if (!p.value.filter((A) => A.status !== s.DONE).length) {
          f.value = n("Please select file to upload first.");
          return;
        }
        f.value = "", k.retryAll(), k.upload();
      }
    }
    function P() {
      k.cancelAll({ reason: "user" }), p.value.forEach((A) => {
        A.status !== s.DONE && (A.status = s.CANCELED, A.statusName = n("Canceled"));
      }), h.value = !1;
    }
    function V(A) {
      h.value || (k.removeFile(A.id, "removed-by-user"), p.value.splice(E(A.id), 1));
    }
    function S(A) {
      if (!h.value) {
        if (k.cancelAll({ reason: "user" }), A) {
          const B = [];
          p.value.forEach((y) => {
            y.status !== s.DONE && B.push(y);
          }), p.value = [], B.forEach((y) => {
            R(y.originalFile, y.name);
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
    return xe(async () => {
      k = new _r({
        debug: e.debug,
        restrictions: {
          maxFileSize: kr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(y, N) {
          if (N[y.id] != null) {
            const ee = E(y.id);
            p.value[ee].status === s.PENDING && (f.value = k.i18n("noDuplicates", { fileName: y.name })), p.value = p.value.filter((se) => se.id !== y.id);
          }
          return p.value.push({
            id: y.id,
            name: y.name,
            size: e.filesize(y.size),
            status: s.PENDING,
            statusName: n("Pending upload"),
            percent: null,
            originalFile: y.data
          }), !0;
        }
      }), k.use(vr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(y, N) {
          let U;
          try {
            U = JSON.parse(y).message;
          } catch {
            U = n("Cannot parse server response.");
          }
          return new Error(U);
        }
      }), k.on("restriction-failed", (y, N) => {
        const U = p.value[E(y.id)];
        V(U), f.value = N.message;
      }), k.on("upload", () => {
        const y = C();
        k.setMeta({ ...y.body });
        const N = k.getPlugin("XHRUpload");
        N.opts.method = y.method, N.opts.endpoint = y.url + "?" + new URLSearchParams(y.params), N.opts.headers = y.headers, delete y.headers["Content-Type"], h.value = !0, p.value.forEach((U) => {
          U.status !== s.DONE && (U.percent = null, U.status = s.UPLOADING, U.statusName = n("Pending upload"));
        });
      }), k.on("upload-progress", (y, N) => {
        const U = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        p.value[E(y.id)].percent = `${U}%`;
      }), k.on("upload-success", (y) => {
        const N = p.value[E(y.id)];
        N.status = s.DONE, N.statusName = n("Done");
      }), k.on("upload-error", (y, N) => {
        const U = p.value[E(y.id)];
        U.percent = null, U.status = s.ERROR, N.isNetworkError ? U.statusName = n("Network Error, Unable establish connection to the server or interrupted.") : U.statusName = N ? N.message : n("Unknown Error");
      }), k.on("error", (y) => {
        f.value = y.message, h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), k.on("complete", () => {
        h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), m.value.addEventListener("click", () => {
        i.value.click();
      }), _.value.addEventListener("dragover", (y) => {
        y.preventDefault(), $.value = !0;
      }), _.value.addEventListener("dragleave", (y) => {
        y.preventDefault(), $.value = !1;
      });
      function A(y, N) {
        N.isFile && N.file((U) => y(N, U)), N.isDirectory && N.createReader().readEntries((U) => {
          U.forEach((ee) => {
            A(y, ee);
          });
        });
      }
      _.value.addEventListener("drop", (y) => {
        y.preventDefault(), $.value = !1;
        const N = /^[/\\](.+)/;
        [...y.dataTransfer.items].forEach((U) => {
          U.kind === "file" && A((ee, se) => {
            const ne = N.exec(ee.fullPath);
            R(se, ne[1]);
          }, U.webkitGetAsEntry());
        });
      });
      const B = ({ target: y }) => {
        const N = y.files;
        for (const U of N)
          R(U);
        y.value = "";
      };
      d.value.addEventListener("change", B), i.value.addEventListener("change", B);
    }), Hs(() => {
      k == null || k.close({ reason: "unmount" });
    }), (A, B) => (v(), W(Ke, null, {
      buttons: Q(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: Ze(O, ["prevent"])
        }, b(o(n)("Upload")), 9, gc),
        h.value ? (v(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Ze(P, ["prevent"])
        }, b(o(n)("Cancel")), 1)) : (v(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Ze(w, ["prevent"])
        }, b(o(n)("Close")), 1))
      ]),
      default: Q(() => [
        a("div", null, [
          z(et, {
            icon: o(Fo),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          a("div", sc, [
            a("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: _,
              onClick: D
            }, [
              $.value ? (v(), g("div", oc, b(o(n)("Release to drop these files.")), 1)) : (v(), g("div", rc, b(o(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            a("div", {
              ref_key: "container",
              ref: l,
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
                ref: m,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(n)("Select Folders")), 513),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: B[0] || (B[0] = (y) => S(!1))
              }, b(o(n)("Clear all")), 9, ac),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: B[1] || (B[1] = (y) => S(!0))
              }, b(o(n)("Clear only successful")), 9, lc)
            ], 512),
            a("div", ic, [
              (v(!0), g(ge, null, ke(p.value, (y) => (v(), g("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: y.id
              }, [
                a("span", {
                  class: ae(["vuefinder__upload-modal__file-icon", F(y)])
                }, [
                  a("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(x(y))
                  }, null, 8, cc)
                ], 2),
                a("div", dc, [
                  a("div", uc, b(o(zn)(y.name, 40)) + " (" + b(y.size) + ")", 1),
                  a("div", _c, b(o(zn)(y.name, 16)) + " (" + b(y.size) + ")", 1),
                  a("div", {
                    class: ae(["vuefinder__upload-modal__file-status", F(y)])
                  }, [
                    J(b(y.statusName) + " ", 1),
                    y.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (v(), g("b", vc, b(y.percent), 1)) : q("", !0)
                  ], 2)
                ]),
                a("button", {
                  type: "button",
                  class: ae(["vuefinder__upload-modal__file-remove", h.value ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: h.value,
                  onClick: (N) => V(y)
                }, pc, 10, fc)
              ]))), 128)),
              p.value.length ? q("", !0) : (v(), g("div", hc, b(o(n)("No files selected!")), 1))
            ]),
            f.value.length ? (v(), W(We, {
              key: 0,
              onHidden: B[2] || (B[2] = (y) => f.value = ""),
              error: ""
            }, {
              default: Q(() => [
                J(b(f.value), 1)
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
}, wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, yc = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), $c = [
  yc
];
function kc(t, e) {
  return v(), g("svg", wc, [...$c]);
}
const Ho = { render: kc }, xc = { class: "vuefinder__unarchive-modal__content" }, Sc = { class: "vuefinder__unarchive-modal__items" }, Cc = { class: "vuefinder__unarchive-modal__item" }, Ec = {
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
}, null, -1), Tc = [
  Ac
], Mc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Vc = [
  Dc
], Oc = { class: "vuefinder__unarchive-modal__item-name" }, Lc = { class: "vuefinder__unarchive-modal__info" }, Ro = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = M(e.modal.data.items[0]), s = M(""), c = M([]), l = () => {
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
    return (d, i) => (v(), W(Ke, null, {
      buttons: Q(() => [
        a("button", {
          type: "button",
          onClick: l,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Unarchive")), 1),
        a("button", {
          type: "button",
          onClick: i[1] || (i[1] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        a("div", null, [
          z(et, {
            icon: o(Ho),
            title: o(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          a("div", xc, [
            a("div", Sc, [
              (v(!0), g(ge, null, ke(c.value, (u) => (v(), g("p", Cc, [
                u.type === "dir" ? (v(), g("svg", Ec, Tc)) : (v(), g("svg", Mc, Vc)),
                a("span", Oc, b(u.basename), 1)
              ]))), 256)),
              a("p", Lc, b(o(n)("The archive will be unarchived at")) + " (" + b(o(e).fs.data.dirname) + ")", 1),
              s.value.length ? (v(), W(We, {
                key: 0,
                onHidden: i[0] || (i[0] = (u) => s.value = ""),
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
}, Fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Hc = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Rc = [
  Hc
];
function Bc(t, e) {
  return v(), g("svg", Fc, [...Rc]);
}
const Bo = { render: Bc }, Ic = { class: "vuefinder__archive-modal__content" }, Nc = { class: "vuefinder__archive-modal__form" }, Uc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, qc = { class: "vuefinder__archive-modal__file" }, zc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), jc = [
  Pc
], Gc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Wc = [
  Kc
], Yc = { class: "vuefinder__archive-modal__file-name" }, Xc = ["placeholder"], Io = {
  __name: "ModalArchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = M(""), s = M(""), c = M(e.modal.data.items), l = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: c.value.map(({ path: d, type: i }) => ({ path: d, type: i })),
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
    return (d, i) => (v(), W(Ke, null, {
      buttons: Q(() => [
        a("button", {
          type: "button",
          onClick: l,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Archive")), 1),
        a("button", {
          type: "button",
          onClick: i[2] || (i[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        a("div", null, [
          z(et, {
            icon: o(Bo),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          a("div", Ic, [
            a("div", Nc, [
              a("div", Uc, [
                (v(!0), g(ge, null, ke(c.value, (u) => (v(), g("p", qc, [
                  u.type === "dir" ? (v(), g("svg", zc, jc)) : (v(), g("svg", Gc, Wc)),
                  a("span", Yc, b(u.basename), 1)
                ]))), 256))
              ]),
              ue(a("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (u) => r.value = u),
                onKeyup: $t(l, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Xc), [
                [kt, r.value]
              ]),
              s.value.length ? (v(), W(We, {
                key: 0,
                onHidden: i[1] || (i[1] = (u) => s.value = ""),
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
}, Jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, Zc = /* @__PURE__ */ a("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), Qc = /* @__PURE__ */ a("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), ed = [
  Zc,
  Qc
];
function td(t, e) {
  return v(), g("svg", Jc, [...ed]);
}
const is = { render: td }, nd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, sd = /* @__PURE__ */ a("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), od = [
  sd
];
function rd(t, e) {
  return v(), g("svg", nd, [...od]);
}
const ad = { render: rd }, ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, id = /* @__PURE__ */ a("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), cd = [
  id
];
function dd(t, e) {
  return v(), g("svg", ld, [...cd]);
}
const ud = { render: dd }, _d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, vd = /* @__PURE__ */ a("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), fd = [
  vd
];
function md(t, e) {
  return v(), g("svg", _d, [...fd]);
}
const pd = { render: md }, hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, gd = /* @__PURE__ */ a("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), bd = [
  gd
];
function wd(t, e) {
  return v(), g("svg", hd, [...bd]);
}
const yd = { render: wd }, $d = { class: "vuefinder__toolbar" }, kd = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, xd = ["title"], Sd = ["title"], Cd = ["title"], Ed = ["title"], Ad = ["title"], Td = ["title"], Md = ["title"], Dd = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Vd = { class: "pl-2" }, Od = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Ld = { class: "vuefinder__toolbar__controls" }, Fd = ["title"], Hd = ["title"], Rd = {
  __name: "Toolbar",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, { t: r } = e.i18n, s = e.dragSelect, c = M("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      c.value = i;
    });
    const l = () => {
      e.fullScreen = !e.fullScreen;
    };
    Me(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (i, u) => (v(), g("div", $d, [
      c.value.length ? (v(), g("div", Dd, [
        a("div", Vd, [
          J(b(o(r)("Search results for")) + " ", 1),
          a("span", Od, b(c.value), 1)
        ]),
        o(e).loadingIndicator === "circular" && o(e).fs.loading ? (v(), W(o(is), { key: 0 })) : q("", !0)
      ])) : (v(), g("div", kd, [
        o(e).features.includes(o(de).NEW_FOLDER) ? (v(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(r)("New Folder"),
          onClick: u[0] || (u[0] = (m) => o(e).modal.open(Oo, { items: o(s).getSelected() }))
        }, [
          z(o(Vo))
        ], 8, xd)) : q("", !0),
        o(e).features.includes(o(de).NEW_FILE) ? (v(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(r)("New File"),
          onClick: u[1] || (u[1] = (m) => o(e).modal.open(Zi, { items: o(s).getSelected() }))
        }, [
          z(o(Lo))
        ], 8, Sd)) : q("", !0),
        o(e).features.includes(o(de).RENAME) ? (v(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: o(r)("Rename"),
          onClick: u[2] || (u[2] = (m) => o(s).getCount() !== 1 || o(e).modal.open(ls, { items: o(s).getSelected() }))
        }, [
          z(o(Do), {
            class: ae(o(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Cd)) : q("", !0),
        o(e).features.includes(o(de).DELETE) ? (v(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: o(r)("Delete"),
          onClick: u[3] || (u[3] = (m) => !o(s).getCount() || o(e).modal.open(as, { items: o(s).getSelected() }))
        }, [
          z(o(Mo), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ed)) : q("", !0),
        o(e).features.includes(o(de).UPLOAD) ? (v(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: o(r)("Upload"),
          onClick: u[4] || (u[4] = (m) => o(e).modal.open(bc, { items: o(s).getSelected() }))
        }, [
          z(o(Fo))
        ], 8, Ad)) : q("", !0),
        o(e).features.includes(o(de).UNARCHIVE) && o(s).getCount() === 1 && o(s).getSelected()[0].mime_type === "application/zip" ? (v(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: o(r)("Unarchive"),
          onClick: u[5] || (u[5] = (m) => !o(s).getCount() || o(e).modal.open(Ro, { items: o(s).getSelected() }))
        }, [
          z(o(Ho), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Td)) : q("", !0),
        o(e).features.includes(o(de).ARCHIVE) ? (v(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: o(r)("Archive"),
          onClick: u[6] || (u[6] = (m) => !o(s).getCount() || o(e).modal.open(Io, { items: o(s).getSelected() }))
        }, [
          z(o(Bo), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Md)) : q("", !0)
      ])),
      a("div", Ld, [
        o(e).features.includes(o(de).FULL_SCREEN) ? (v(), g("div", {
          key: 0,
          onClick: l,
          class: "mx-1.5",
          title: o(r)("Toggle Full Screen")
        }, [
          o(e).fullScreen ? (v(), W(o(ud), { key: 0 })) : (v(), W(o(ad), { key: 1 }))
        ], 8, Fd)) : q("", !0),
        a("div", {
          class: "mx-1.5",
          title: o(r)("Change View"),
          onClick: u[7] || (u[7] = (m) => c.value.length || d())
        }, [
          o(e).view === "grid" ? (v(), W(o(pd), {
            key: 0,
            class: ae(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0),
          o(e).view === "list" ? (v(), W(o(yd), {
            key: 1,
            class: ae(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0)
        ], 8, Hd)
      ])
    ]));
  }
}, Bd = (t, e = 0, n = !1) => {
  let r;
  return (...s) => {
    n && !r && t(...s), clearTimeout(r), r = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Vs = (t, e, n) => {
  const r = M(t);
  return sr((s, c) => ({
    get() {
      return s(), r.value;
    },
    set: Bd(
      (l) => {
        r.value = l, c();
      },
      e,
      n
    )
  }));
}, Id = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, Nd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
}, null, -1), Ud = [
  Nd
];
function qd(t, e) {
  return v(), g("svg", Id, [...Ud]);
}
const zd = { render: qd }, Pd = { class: "vuefinder__move-modal__content" }, jd = { class: "vuefinder__move-modal__description" }, Gd = { class: "vuefinder__move-modal__files vf-scrollbar" }, Kd = { class: "vuefinder__move-modal__file" }, Wd = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Xd = [
  Yd
], Jd = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Qd = [
  Zd
], eu = { class: "vuefinder__move-modal__file-name" }, tu = { class: "vuefinder__move-modal__target-title" }, nu = { class: "vuefinder__move-modal__target-directory" }, su = /* @__PURE__ */ a("svg", {
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
], -1), ou = { class: "vuefinder__move-modal__target-path" }, ru = { class: "vuefinder__move-modal__selected-items" }, Pn = {
  __name: "ModalMove",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = M(e.modal.data.items.from), s = M(""), c = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: l, type: d }) => ({ path: l, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (l) => {
          s.value = n(l.message);
        }
      });
    };
    return (l, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Yes, Move!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        a("div", ru, b(o(n)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: Q(() => [
        a("div", null, [
          z(et, {
            icon: o(zd),
            title: o(n)("Move files")
          }, null, 8, ["icon", "title"]),
          a("div", Pd, [
            a("p", jd, b(o(n)("Are you sure you want to move these files?")), 1),
            a("div", Gd, [
              (v(!0), g(ge, null, ke(r.value, (i) => (v(), g("div", Kd, [
                a("div", null, [
                  i.type === "dir" ? (v(), g("svg", Wd, Xd)) : (v(), g("svg", Jd, Qd))
                ]),
                a("div", eu, b(i.path), 1)
              ]))), 256))
            ]),
            a("h4", tu, b(o(n)("Target Directory")), 1),
            a("p", nu, [
              su,
              a("span", ou, b(o(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (v(), W(We, {
              key: 0,
              onHidden: d[0] || (d[0] = (i) => s.value = ""),
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
}, au = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, lu = /* @__PURE__ */ a("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), iu = [
  lu
];
function cu(t, e) {
  return v(), g("svg", au, [...iu]);
}
const du = { render: cu }, uu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, _u = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), vu = [
  _u
];
function fu(t, e) {
  return v(), g("svg", uu, [...vu]);
}
const mu = { render: fu }, pu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, hu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), gu = [
  hu
];
function bu(t, e) {
  return v(), g("svg", pu, [...gu]);
}
const wu = { render: bu }, yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, $u = /* @__PURE__ */ a("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), ku = [
  $u
];
function xu(t, e) {
  return v(), g("svg", yu, [...ku]);
}
const Su = { render: xu }, Cu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, Eu = /* @__PURE__ */ a("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), Au = [
  Eu
];
function Tu(t, e) {
  return v(), g("svg", Cu, [...Au]);
}
const Mu = { render: Tu }, Du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, Vu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Ou = [
  Vu
];
function Lu(t, e) {
  return v(), g("svg", Du, [...Ou]);
}
const Fu = { render: Lu }, Hu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, Ru = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), Bu = [
  Ru
];
function Iu(t, e) {
  return v(), g("svg", Hu, [...Bu]);
}
const mn = { render: Iu }, Nu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
}, Uu = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), qu = /* @__PURE__ */ a("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1), zu = [
  Uu,
  qu
];
function Pu(t, e) {
  return v(), g("svg", Nu, [...zu]);
}
const ju = { render: Pu }, Gu = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, Ku = /* @__PURE__ */ a("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), Wu = [
  Ku
];
function Yu(t, e) {
  return v(), g("svg", Gu, [...Wu]);
}
const Xu = { render: Yu }, Ju = { class: "vuefinder__breadcrumb__container" }, Zu = ["title"], Qu = ["title"], e_ = ["title"], t_ = ["title"], n_ = { class: "vuefinder__breadcrumb__list" }, s_ = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, o_ = /* @__PURE__ */ a("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1), r_ = { class: "relative" }, a_ = /* @__PURE__ */ a("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1), l_ = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], i_ = { class: "vuefinder__breadcrumb__search-mode" }, c_ = ["placeholder"], d_ = { class: "vuefinder__breadcrumb__hidden-dropdown" }, u_ = ["onDrop", "onClick"], __ = { class: "vuefinder__breadcrumb__hidden-item-content" }, v_ = { class: "vuefinder__breadcrumb__hidden-item-text" }, f_ = {
  __name: "Breadcrumb",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = e.dragSelect, { setStore: s } = e.storage, c = M(null), l = Vs(0, 100);
    Me(l, (V) => {
      const S = c.value.children;
      let w = 0, C = 0, A = 5, B = 1;
      e.fs.limitBreadcrumbItems(A), ct(() => {
        for (let y = S.length - 1; y >= 0 && !(w + S[y].offsetWidth > l.value - 40); y--)
          w += parseInt(S[y].offsetWidth, 10), C++;
        C < B && (C = B), C > A && (C = A), e.fs.limitBreadcrumbItems(C);
      });
    });
    const d = () => {
      l.value = c.value.offsetWidth;
    };
    let i = M(null);
    xe(() => {
      i.value = new ResizeObserver(d), i.value.observe(c.value);
    }), jn(() => {
      i.value.disconnect();
    });
    const u = (V, S = null) => {
      V.preventDefault(), r.isDraggingRef.value = !1, p(V), S ?? (S = e.fs.hiddenBreadcrumbs.length - 1);
      let w = JSON.parse(V.dataTransfer.getData("items"));
      if (w.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: w,
          to: e.fs.hiddenBreadcrumbs[S] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, m = (V, S = null) => {
      V.preventDefault(), r.isDraggingRef.value = !1, p(V), S ?? (S = e.fs.breadcrumbs.length - 2);
      let w = JSON.parse(V.dataTransfer.getData("items"));
      if (w.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: w,
          to: e.fs.breadcrumbs[S] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, _ = (V) => {
      V.preventDefault(), e.fs.isGoUpAvailable() ? (V.dataTransfer.dropEffect = "copy", V.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (V.dataTransfer.dropEffect = "none", V.dataTransfer.effectAllowed = "none");
    }, p = (V) => {
      V.preventDefault(), V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, f = () => {
      O(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      O(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, $ = (V) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: V.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, k = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, E = {
      mounted(V, S, w, C) {
        V.clickOutsideEvent = function(A) {
          V === A.target || V.contains(A.target) || S.value();
        }, document.body.addEventListener("click", V.clickOutsideEvent);
      },
      beforeUnmount(V, S, w, C) {
        document.body.removeEventListener("click", V.clickOutsideEvent);
      }
    }, R = () => {
      e.showTreeView = !e.showTreeView;
    };
    Me(() => e.showTreeView, (V, S) => {
      V !== S && s("show-tree-view", V);
    });
    const F = M(null), x = () => {
      e.features.includes(de.SEARCH) && (e.fs.searchMode = !0, ct(() => F.value.focus()));
    }, D = Vs("", 400);
    Me(D, (V) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: V });
    }), Me(() => e.fs.searchMode, (V) => {
      V && ct(() => F.value.focus());
    });
    const O = () => {
      e.fs.searchMode = !1, D.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      O();
    });
    const P = () => {
      D.value === "" && O();
    };
    return (V, S) => (v(), g("div", Ju, [
      a("span", {
        title: o(n)("Toggle Tree View")
      }, [
        z(o(ju), {
          onClick: R,
          class: ae(["vuefinder__breadcrumb__toggle-tree", o(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Zu),
      a("span", {
        title: o(n)("Go up a directory")
      }, [
        z(o(mu), {
          onDragover: S[0] || (S[0] = (w) => _(w)),
          onDragleave: S[1] || (S[1] = (w) => p(w)),
          onDrop: S[2] || (S[2] = (w) => m(w)),
          onClick: h,
          class: ae(o(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, Qu),
      o(e).fs.loading ? (v(), g("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        z(o(wu), {
          onClick: S[3] || (S[3] = (w) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, t_)) : (v(), g("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        z(o(du), { onClick: f })
      ], 8, e_)),
      ue(a("div", {
        onClick: Ze(x, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        a("div", null, [
          z(o(Su), {
            onDragover: S[4] || (S[4] = (w) => _(w)),
            onDragleave: S[5] || (S[5] = (w) => p(w)),
            onDrop: S[6] || (S[6] = (w) => m(w, -1)),
            onClick: S[7] || (S[7] = (w) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter } }))
          })
        ]),
        a("div", n_, [
          o(e).fs.hiddenBreadcrumbs.length ? ue((v(), g("div", s_, [
            o_,
            a("div", r_, [
              a("span", {
                onDragenter: S[8] || (S[8] = (w) => o(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: S[9] || (S[9] = (w) => o(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                z(o(Xu), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [E, k]
          ]) : q("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: Ze(x, ["self"])
        }, [
          (v(!0), g(ge, null, ke(o(e).fs.breadcrumbs, (w, C) => (v(), g("div", { key: C }, [
            a_,
            a("span", {
              onDragover: (A) => C === o(e).fs.breadcrumbs.length - 1 || _(A),
              onDragleave: (A) => C === o(e).fs.breadcrumbs.length - 1 || p(A),
              onDrop: (A) => C === o(e).fs.breadcrumbs.length - 1 || m(A, C),
              class: "vuefinder__breadcrumb__item",
              title: w.basename,
              onClick: (A) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter, path: w.path } })
            }, b(w.name), 41, l_)
          ]))), 128))
        ], 512),
        o(e).loadingIndicator === "circular" && o(e).fs.loading ? (v(), W(o(is), { key: 0 })) : q("", !0)
      ], 512), [
        [Ue, !o(e).fs.searchMode]
      ]),
      ue(a("div", i_, [
        a("div", null, [
          z(o(Mu))
        ]),
        ue(a("input", {
          ref_key: "searchInput",
          ref: F,
          onKeydown: $t(O, ["esc"]),
          onBlur: P,
          "onUpdate:modelValue": S[10] || (S[10] = (w) => or(D) ? D.value = w : null),
          placeholder: o(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, c_), [
          [kt, o(D)]
        ]),
        z(o(Fu), { onClick: O })
      ], 512), [
        [Ue, o(e).fs.searchMode]
      ]),
      ue(a("div", d_, [
        (v(!0), g(ge, null, ke(o(e).fs.hiddenBreadcrumbs, (w, C) => (v(), g("div", {
          key: C,
          onDragover: S[11] || (S[11] = (A) => _(A)),
          onDragleave: S[12] || (S[12] = (A) => p(A)),
          onDrop: (A) => u(A, C),
          onClick: (A) => $(w),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          a("div", __, [
            a("span", null, [
              z(o(mn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            J(),
            a("span", v_, b(w.name), 1)
          ])
        ], 40, u_))), 128))
      ], 512), [
        [Ue, o(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, No = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), m_ = ["onClick"], p_ = {
  __name: "Toast",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, r = M(n("full-screen", !1)), s = M([]), c = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", l = (i) => {
      s.value.splice(i, 1);
    }, d = (i) => {
      let u = s.value.findIndex((m) => m.id === i);
      u !== -1 && l(u);
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
      z(rr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Q(() => [
          (v(!0), g(ge, null, ke(s.value, (m, _) => (v(), g("div", {
            key: _,
            onClick: (p) => l(_),
            class: ae(["vuefinder__toast__message", c(m.type)])
          }, b(m.label), 11, m_))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, h_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, g_ = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), b_ = [
  g_
];
function w_(t, e) {
  return v(), g("svg", h_, [...b_]);
}
const y_ = { render: w_ }, $_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, k_ = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), x_ = [
  k_
];
function S_(t, e) {
  return v(), g("svg", $_, [...x_]);
}
const C_ = { render: S_ }, Gt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (v(), g("div", null, [
      t.direction === "asc" ? (v(), W(o(y_), { key: 0 })) : q("", !0),
      t.direction === "desc" ? (v(), W(o(C_), { key: 1 })) : q("", !0)
    ]));
  }
}, E_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, A_ = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), T_ = [
  A_
];
function M_(t, e) {
  return v(), g("svg", E_, [...T_]);
}
const D_ = { render: M_ }, V_ = { class: "vuefinder__item-icon" }, Sn = {
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
    return (e, n) => (v(), g("span", V_, [
      t.type === "dir" ? (v(), W(o(mn), {
        key: 0,
        class: ae(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (v(), W(o(D_), {
        key: 1,
        class: ae(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, O_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, L_ = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), F_ = [
  L_
];
function H_(t, e) {
  return v(), g("svg", O_, [...F_]);
}
const R_ = { render: H_ }, B_ = { class: "vuefinder__drag-item__container" }, I_ = { class: "vuefinder__drag-item__count" }, N_ = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, r) => (v(), g("div", B_, [
      z(o(R_)),
      a("div", I_, b(e.count), 1)
    ]));
  }
}, U_ = { class: "vuefinder__text-preview" }, q_ = { class: "vuefinder__text-preview__header" }, z_ = ["title"], P_ = { class: "vuefinder__text-preview__actions" }, j_ = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, G_ = { key: 1 }, K_ = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = M(""), s = M(""), c = M(null), l = M(!1), d = M(""), i = M(!1), u = re("ServiceContainer"), { t: m } = u.i18n;
    xe(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((f) => {
        r.value = f, n("success");
      });
    });
    const _ = () => {
      l.value = !l.value, s.value = r.value;
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
      }).then((f) => {
        d.value = m("Updated."), r.value = f, n("success"), l.value = !l.value;
      }).catch((f) => {
        d.value = m(f.message), i.value = !0;
      });
    };
    return (f, h) => (v(), g("div", U_, [
      a("div", q_, [
        a("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(u).modal.data.item.path
        }, b(o(u).modal.data.item.basename), 9, z_),
        a("div", P_, [
          l.value ? (v(), g("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, b(o(m)("Save")), 1)) : q("", !0),
          o(u).features.includes(o(de).EDIT) ? (v(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = ($) => _())
          }, b(l.value ? o(m)("Cancel") : o(m)("Edit")), 1)) : q("", !0)
        ])
      ]),
      a("div", null, [
        l.value ? (v(), g("div", G_, [
          ue(a("textarea", {
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
        ])) : (v(), g("pre", j_, b(r.value), 1)),
        d.value.length ? (v(), W(We, {
          key: 2,
          onHidden: h[2] || (h[2] = ($) => d.value = ""),
          error: i.value
        }, {
          default: Q(() => [
            J(b(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : q("", !0)
      ])
    ]));
  }
}, W_ = { class: "vuefinder__image-preview" }, Y_ = { class: "vuefinder__image-preview__header" }, X_ = ["title"], J_ = { class: "vuefinder__image-preview__actions" }, Z_ = { class: "vuefinder__image-preview__image-container" }, Q_ = ["src"], ev = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = re("ServiceContainer"), { t: s } = r.i18n, c = M(null), l = M(null), d = M(!1), i = M(""), u = M(!1), m = () => {
      d.value = !d.value, d.value ? l.value = new mr(c.value, {
        crop(p) {
        }
      }) : l.value.destroy();
    }, _ = () => {
      l.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          i.value = "", u.value = !1;
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
            i.value = s("Updated."), c.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), m(), n("success");
          }).catch((h) => {
            i.value = s(h.message), u.value = !0;
          });
        }
      );
    };
    return xe(() => {
      n("success");
    }), (p, f) => (v(), g("div", W_, [
      a("div", Y_, [
        a("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(r).modal.data.item.path
        }, b(o(r).modal.data.item.basename), 9, X_),
        a("div", J_, [
          d.value ? (v(), g("button", {
            key: 0,
            onClick: _,
            class: "vuefinder__image-preview__crop-button"
          }, b(o(s)("Crop")), 1)) : q("", !0),
          o(r).features.includes(o(de).EDIT) ? (v(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: f[0] || (f[0] = (h) => m())
          }, b(d.value ? o(s)("Cancel") : o(s)("Edit")), 1)) : q("", !0)
        ])
      ]),
      a("div", Z_, [
        a("img", {
          ref_key: "image",
          ref: c,
          class: "vuefinder__image-preview__image",
          src: o(r).requester.getPreviewUrl(o(r).modal.data.adapter, o(r).modal.data.item),
          alt: ""
        }, null, 8, Q_)
      ]),
      i.value.length ? (v(), W(We, {
        key: 0,
        onHidden: f[1] || (f[1] = (h) => i.value = ""),
        error: u.value
      }, {
        default: Q(() => [
          J(b(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : q("", !0)
    ]));
  }
}, tv = { class: "vuefinder__default-preview" }, nv = { class: "vuefinder__default-preview__header" }, sv = ["title"], ov = /* @__PURE__ */ a("div", null, null, -1), rv = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e;
    return xe(() => {
      r("success");
    }), (s, c) => (v(), g("div", tv, [
      a("div", nv, [
        a("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: o(n).modal.data.item.path
        }, b(o(n).modal.data.item.basename), 9, sv)
      ]),
      ov
    ]));
  }
}, av = { class: "vuefinder__video-preview" }, lv = ["title"], iv = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, cv = ["src"], dv = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return xe(() => {
      r("success");
    }), (c, l) => (v(), g("div", av, [
      a("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, lv),
      a("div", null, [
        a("video", iv, [
          a("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, cv),
          J(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, uv = { class: "vuefinder__audio-preview" }, _v = ["title"], vv = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, fv = ["src"], mv = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = re("ServiceContainer"), s = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return xe(() => {
      n("success");
    }), (c, l) => (v(), g("div", uv, [
      a("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(r).modal.data.item.path
      }, b(o(r).modal.data.item.basename), 9, _v),
      a("div", null, [
        a("audio", vv, [
          a("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, fv),
          J(" Your browser does not support the audio element. ")
        ])
      ])
    ]));
  }
}, pv = { class: "vuefinder__pdf-preview" }, hv = ["title"], gv = ["data"], bv = ["src"], wv = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return xe(() => {
      r("success");
    }), (c, l) => (v(), g("div", pv, [
      a("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, hv),
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
          }, " Your browser does not support PDFs ", 8, bv)
        ], 8, gv)
      ])
    ]));
  }
}, yv = { class: "vuefinder__preview-modal__content" }, $v = { key: 0 }, kv = { class: "vuefinder__preview-modal__loading" }, xv = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Sv = /* @__PURE__ */ a("svg", {
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
], -1), Cv = { class: "vuefinder__preview-modal__details" }, Ev = { class: "font-bold" }, Av = { class: "font-bold pl-2" }, Tv = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Mv = ["download", "href"], Uo = {
  __name: "ModalPreview",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = M(!1), s = (l) => (e.modal.data.item.mime_type ?? "").startsWith(l), c = e.features.includes(de.PREVIEW);
    return c || (r.value = !0), (l, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
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
        }, b(o(n)("Download")), 9, Mv)) : q("", !0)
      ]),
      default: Q(() => [
        a("div", null, [
          a("div", yv, [
            o(c) ? (v(), g("div", $v, [
              s("text") ? (v(), W(K_, {
                key: 0,
                onSuccess: d[0] || (d[0] = (i) => r.value = !0)
              })) : s("image") ? (v(), W(ev, {
                key: 1,
                onSuccess: d[1] || (d[1] = (i) => r.value = !0)
              })) : s("video") ? (v(), W(dv, {
                key: 2,
                onSuccess: d[2] || (d[2] = (i) => r.value = !0)
              })) : s("audio") ? (v(), W(mv, {
                key: 3,
                onSuccess: d[3] || (d[3] = (i) => r.value = !0)
              })) : s("application/pdf") ? (v(), W(wv, {
                key: 4,
                onSuccess: d[4] || (d[4] = (i) => r.value = !0)
              })) : (v(), W(rv, {
                key: 5,
                onSuccess: d[5] || (d[5] = (i) => r.value = !0)
              }))
            ])) : q("", !0),
            a("div", kv, [
              r.value === !1 ? (v(), g("div", xv, [
                Sv,
                a("span", null, b(o(n)("Loading")), 1)
              ])) : q("", !0)
            ])
          ])
        ]),
        a("div", Cv, [
          a("div", null, [
            a("span", Ev, b(o(n)("File Size")) + ": ", 1),
            J(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", Av, b(o(n)("Last Modified")) + ": ", 1),
            J(" " + b(o(No)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(de).DOWNLOAD) ? (v(), g("div", Tv, [
          a("span", null, b(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : q("", !0)
      ]),
      _: 1
    }));
  }
}, Dv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Vv = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Ov = /* @__PURE__ */ a("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1), Lv = [
  Vv,
  Ov
];
function Fv(t, e) {
  return v(), g("svg", Dv, [...Lv]);
}
const qo = { render: Fv }, Hv = ["data-type", "data-item", "data-index"], Cn = {
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
      mounted(f, h, $, k) {
        $.props.draggable && (f.addEventListener("dragstart", (E) => l(E, h.value)), f.addEventListener("dragover", (E) => i(E, h.value)), f.addEventListener("drop", (E) => d(E, h.value)));
      },
      beforeUnmount(f, h, $, k) {
        $.props.draggable && (f.removeEventListener("dragstart", l), f.removeEventListener("dragover", i), f.removeEventListener("drop", d));
      }
    }, l = (f, h) => {
      if (f.altKey || f.ctrlKey || f.metaKey)
        return f.preventDefault(), !1;
      n.isDraggingRef.value = !0, f.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), f.dataTransfer.effectAllowed = "all", f.dataTransfer.dropEffect = "copy", f.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (f, h) => {
      f.preventDefault(), n.isDraggingRef.value = !1;
      let $ = JSON.parse(f.dataTransfer.getData("items"));
      if ($.find((k) => k.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, { items: { from: $, to: h } });
    }, i = (f, h) => {
      f.preventDefault(), !h || h.type !== "dir" || n.getSelection().find(($) => $ === f.currentTarget) ? (f.dataTransfer.dropEffect = "none", f.dataTransfer.effectAllowed = "none") : f.dataTransfer.dropEffect = "copy";
    };
    let u = null, m = !1;
    const _ = () => {
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
    return (f, h) => ue((v(), g("div", {
      style: rn({ opacity: o(n).isDraggingRef.value && o(n).getSelection().find(($) => f.$el === $) ? "0.5 !important" : "" }),
      class: ae(["vuefinder__item", "vf-item-" + o(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: h[0] || (h[0] = ($) => s(t.item)),
      onTouchstart: h[1] || (h[1] = ($) => p($)),
      onTouchend: h[2] || (h[2] = ($) => _()),
      onContextmenu: h[3] || (h[3] = Ze(($) => o(e).emitter.emit("vf-contextmenu-show", { event: $, items: o(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Tt(f.$slots, "default"),
      o(e).pinnedFolders.find(($) => $.path === t.item.path) ? (v(), W(o(qo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : q("", !0)
    ], 46, Hv)), [
      [c, t.item]
    ]);
  }
}, Rv = { class: "vuefinder__explorer__container" }, Bv = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Iv = { class: "vuefinder__explorer__drag-item" }, Nv = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, Uv = { class: "vuefinder__explorer__item-list-content" }, qv = { class: "vuefinder__explorer__item-list-name" }, zv = { class: "vuefinder__explorer__item-name" }, Pv = { class: "vuefinder__explorer__item-path" }, jv = { class: "vuefinder__explorer__item-list-content" }, Gv = { class: "vuefinder__explorer__item-list-name" }, Kv = { class: "vuefinder__explorer__item-name" }, Wv = { class: "vuefinder__explorer__item-size" }, Yv = { class: "vuefinder__explorer__item-date" }, Xv = { class: "vuefinder__explorer__item-grid-content" }, Jv = ["data-src", "alt"], Zv = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, Qv = { class: "vuefinder__explorer__item-title break-all" }, ef = {
  __name: "Explorer",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = (_) => _ == null ? void 0 : _.substring(0, 3), s = M(null), c = M(""), l = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      l.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      c.value = _, _ ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: _
        },
        onSuccess: (p) => {
          p.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const i = yt({ active: !1, column: "", order: "" }), u = (_ = !0) => {
      let p = [...e.fs.data.files], f = i.column, h = i.order === "asc" ? 1 : -1;
      if (!_)
        return p;
      const $ = (k, E) => typeof k == "string" && typeof E == "string" ? k.toLowerCase().localeCompare(E.toLowerCase()) : k < E ? -1 : k > E ? 1 : 0;
      return i.active && (p = p.slice().sort((k, E) => $(k[f], E[f]) * h)), p;
    }, m = (_) => {
      i.active && i.column === _ ? (i.active = i.order === "asc", i.column = _, i.order = "desc") : (i.active = !0, i.column = _, i.order = "asc");
    };
    return xe(() => {
      d = new fr(l.area.value);
    }), Ls(() => {
      d.update();
    }), Hs(() => {
      d.destroy();
    }), (_, p) => (v(), g("div", Rv, [
      o(e).view === "list" || c.value.length ? (v(), g("div", Bv, [
        a("div", {
          onClick: p[0] || (p[0] = (f) => m("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          J(b(o(n)("Name")) + " ", 1),
          ue(z(Gt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ue, i.active && i.column === "basename"]
          ])
        ]),
        c.value.length ? q("", !0) : (v(), g("div", {
          key: 0,
          onClick: p[1] || (p[1] = (f) => m("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          J(b(o(n)("Size")) + " ", 1),
          ue(z(Gt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ue, i.active && i.column === "file_size"]
          ])
        ])),
        c.value.length ? q("", !0) : (v(), g("div", {
          key: 1,
          onClick: p[2] || (p[2] = (f) => m("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          J(b(o(n)("Date")) + " ", 1),
          ue(z(Gt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ue, i.active && i.column === "last_modified"]
          ])
        ])),
        c.value.length ? (v(), g("div", {
          key: 2,
          onClick: p[3] || (p[3] = (f) => m("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          J(b(o(n)("Filepath")) + " ", 1),
          ue(z(Gt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ue, i.active && i.column === "path"]
          ])
        ])) : q("", !0)
      ])) : q("", !0),
      a("div", Iv, [
        z(N_, {
          ref_key: "dragImage",
          ref: s,
          count: o(l).getCount()
        }, null, 8, ["count"])
      ]),
      a("div", {
        ref: o(l).scrollBarContainer,
        class: ae(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": o(e).view === "grid" }, { "search-active": c.value.length }]])
      }, [
        a("div", {
          ref: o(l).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      a("div", {
        ref: o(l).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area min-h-32",
        onContextmenu: p[4] || (p[4] = Ze((f) => o(e).emitter.emit("vf-contextmenu-show", { event: f, items: o(l).getSelected() }), ["self", "prevent"]))
      }, [
        o(e).loadingIndicator === "linear" && o(e).fs.loading ? (v(), g("div", Nv)) : q("", !0),
        c.value.length ? (v(!0), g(ge, { key: 1 }, ke(u(), (f, h) => (v(), W(Cn, {
          item: f,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: Q(() => [
            a("div", Uv, [
              a("div", qv, [
                z(Sn, {
                  type: f.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", zv, b(f.basename), 1)
              ]),
              a("div", Pv, b(f.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0),
        o(e).view === "list" && !c.value.length ? (v(!0), g(ge, { key: 2 }, ke(u(), (f, h) => (v(), W(Cn, {
          item: f,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: f.path
        }, {
          default: Q(() => [
            a("div", jv, [
              a("div", Gv, [
                z(Sn, {
                  type: f.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", Kv, b(f.basename), 1)
              ]),
              a("div", Wv, b(f.file_size ? o(e).filesize(f.file_size) : ""), 1),
              a("div", Yv, b(o(No)(f.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : q("", !0),
        o(e).view === "grid" && !c.value.length ? (v(!0), g(ge, { key: 3 }, ke(u(!1), (f, h) => (v(), W(Cn, {
          item: f,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: Q(() => [
            a("div", null, [
              a("div", Xv, [
                (f.mime_type ?? "").startsWith("image") && o(e).showThumbnails ? (v(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": o(e).requester.getPreviewUrl(o(e).fs.adapter, f),
                  alt: f.basename,
                  key: f.path
                }, null, 8, Jv)) : (v(), W(Sn, {
                  key: 1,
                  type: f.type
                }, null, 8, ["type"])),
                !((f.mime_type ?? "").startsWith("image") && o(e).showThumbnails) && f.type !== "dir" ? (v(), g("div", Zv, b(r(f.extension)), 1)) : q("", !0)
              ]),
              a("span", Qv, b(o(zn)(f.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0)
      ], 544),
      z(p_)
    ]));
  }
}, tf = ["href", "download"], nf = ["onClick"], sf = {
  __name: "ContextMenu",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = M(null), s = M([]), c = M(""), l = yt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = rt(() => l.items.filter((_) => _.key == null || e.features.includes(_.key)));
    e.emitter.on("vf-context-selected", (_) => {
      s.value = _;
    });
    const i = {
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
          e.pinnedFolders = e.pinnedFolders.filter((_) => !s.value.find((p) => p.path === _.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: de.DELETE,
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
        action: () => e.modal.open(ls, { items: s })
      }
    }, u = (_) => {
      e.emitter.emit("vf-contextmenu-hide"), _.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      c.value = _;
    }), e.emitter.on("vf-contextmenu-show", ({ event: _, items: p, target: f = null }) => {
      if (l.items = [], c.value)
        if (f)
          l.items.push(i.openDir), e.emitter.emit("vf-context-selected", [f]);
        else
          return;
      else !f && !c.value ? (l.items.push(i.refresh), l.items.push(i.selectAll), l.items.push(i.newfolder), e.emitter.emit("vf-context-selected", [])) : p.length > 1 && p.some((h) => h.path === f.path) ? (l.items.push(i.refresh), l.items.push(i.archive), l.items.push(i.delete), e.emitter.emit("vf-context-selected", p)) : (f.type === "dir" ? (l.items.push(i.open), e.pinnedFolders.findIndex((h) => h.path === f.path) !== -1 ? l.items.push(i.unpinFolder) : l.items.push(i.pinFolder)) : (l.items.push(i.preview), l.items.push(i.download)), l.items.push(i.rename), f.mime_type === "application/zip" ? l.items.push(i.unarchive) : l.items.push(i.archive), l.items.push(i.delete), e.emitter.emit("vf-context-selected", [f]));
      m(_);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      l.active = !1;
    });
    const m = (_) => {
      const p = e.dragSelect.area.value, f = e.root.getBoundingClientRect(), h = p.getBoundingClientRect();
      let $ = _.clientX - f.left, k = _.clientY - f.top;
      l.active = !0, ct(() => {
        var x;
        const E = (x = r.value) == null ? void 0 : x.getBoundingClientRect();
        let R = (E == null ? void 0 : E.height) ?? 0, F = (E == null ? void 0 : E.width) ?? 0;
        $ = h.right - _.pageX + window.scrollX < F ? $ - F : $, k = h.bottom - _.pageY + window.scrollY < R ? k - R : k, l.positions = {
          left: $ + "px",
          top: k + "px"
        };
      });
    };
    return (_, p) => ue((v(), g("ul", {
      ref_key: "contextmenu",
      ref: r,
      style: rn(l.positions),
      class: "vuefinder__context-menu"
    }, [
      (v(!0), g(ge, null, ke(d.value, (f) => (v(), g("li", {
        class: "vuefinder__context-menu__item",
        key: f.title
      }, [
        f.link ? (v(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: f.link,
          download: f.link,
          onClick: p[0] || (p[0] = (h) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, b(f.title()), 1)
        ], 8, tf)) : (v(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => u(f)
        }, [
          a("span", null, b(f.title()), 1)
        ], 8, nf))
      ]))), 128))
    ], 4)), [
      [Ue, l.active]
    ]);
  }
}, of = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, rf = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), af = [
  rf
];
function lf(t, e) {
  return v(), g("svg", of, [...af]);
}
const zo = { render: lf }, cf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, df = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), uf = [
  df
];
function _f(t, e) {
  return v(), g("svg", cf, [...uf]);
}
const vf = { render: _f }, ff = { class: "vuefinder__status-bar__wrapper" }, mf = { class: "vuefinder__status-bar__storage" }, pf = ["title"], hf = { class: "vuefinder__status-bar__storage-icon" }, gf = ["value"], bf = { class: "vuefinder__status-bar__info" }, wf = { key: 0 }, yf = { class: "vuefinder__status-bar__selected-count" }, $f = { class: "vuefinder__status-bar__actions" }, kf = ["disabled"], xf = ["title"], Sf = {
  __name: "Statusbar",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { setStore: r } = e.storage, s = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, l = M("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      l.value = i;
    });
    const d = rt(() => {
      const i = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && i;
    });
    return (i, u) => (v(), g("div", ff, [
      a("div", mf, [
        a("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          a("div", hf, [
            z(o(zo))
          ]),
          ue(a("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (m) => o(e).fs.adapter = m),
            onChange: c,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (v(!0), g(ge, null, ke(o(e).fs.data.storages, (m) => (v(), g("option", { value: m }, b(m), 9, gf))), 256))
          ], 544), [
            [En, o(e).fs.adapter]
          ])
        ], 8, pf),
        a("div", bf, [
          l.value.length ? (v(), g("span", wf, b(o(e).fs.data.files.length) + " items found. ", 1)) : q("", !0),
          a("span", yf, b(o(e).dragSelect.getCount() > 0 ? o(n)("%s item(s) selected.", o(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      a("div", $f, [
        o(e).selectButton.active ? (v(), g("button", {
          key: 0,
          class: ae(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (m) => o(e).selectButton.click(o(s).getSelected(), m))
        }, b(o(n)("Select")), 11, kf)) : q("", !0),
        a("span", {
          class: "vuefinder__status-bar__about",
          title: o(n)("About"),
          onClick: u[2] || (u[2] = (m) => o(e).modal.open(To))
        }, [
          z(o(vf))
        ], 8, xf)
      ])
    ]));
  }
}, Cf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
}, Ef = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
}, null, -1), Af = [
  Ef
];
function Tf(t, e) {
  return v(), g("svg", Cf, [...Af]);
}
const Po = { render: Tf }, Mf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Df = /* @__PURE__ */ a("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Vf = /* @__PURE__ */ a("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1), Of = [
  Df,
  Vf
];
function Lf(t, e) {
  return v(), g("svg", Mf, [...Of]);
}
const Ff = { render: Lf }, Hf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Rf = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Bf = /* @__PURE__ */ a("path", { d: "M15 12H9M12 9v6" }, null, -1), If = [
  Rf,
  Bf
];
function Nf(t, e) {
  return v(), g("svg", Hf, [...If]);
}
const jo = { render: Nf }, Uf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, qf = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), zf = /* @__PURE__ */ a("path", { d: "M9 12h6" }, null, -1), Pf = [
  qf,
  zf
];
function jf(t, e) {
  return v(), g("svg", Uf, [...Pf]);
}
const Go = { render: jf };
function Ko(t, e) {
  const n = t.findIndex((r) => r.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Gf = { class: "vuefinder__folder-loader-indicator" }, Kf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Wo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ ar({
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
    const r = Rs(t, "modelValue"), s = M(!1);
    Me(
      () => r.value,
      () => {
        var d;
        return ((d = c()) == null ? void 0 : d.folders.length) || l();
      }
    );
    function c() {
      return n.treeViewData.find((d) => d.path === e.path);
    }
    const l = () => {
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
    return (d, i) => {
      var u;
      return v(), g("div", Gf, [
        s.value ? (v(), W(o(is), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (v(), g("div", Kf, [
          r.value && ((u = c()) != null && u.folders.length) ? (v(), W(o(Go), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : q("", !0),
          r.value ? q("", !0) : (v(), W(o(jo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Wf = { class: "vuefinder__treesubfolderlist__item-content" }, Yf = ["onClick"], Xf = ["title", "onClick"], Jf = { class: "vuefinder__treesubfolderlist__item-icon" }, Zf = { class: "vuefinder__treesubfolderlist__subfolder" }, Qf = {
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
    const e = re("ServiceContainer"), n = M([]), r = t, s = M(null);
    xe(() => {
      r.path === r.adapter + "://" && je(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = rt(() => {
      var l;
      return ((l = e.treeViewData.find((d) => d.path === r.path)) == null ? void 0 : l.folders) || [];
    });
    return (l, d) => {
      const i = lr("TreeSubfolderList", !0);
      return v(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (v(!0), g(ge, null, ke(c.value, (u, m) => (v(), g("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          a("div", Wf, [
            a("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (_) => n.value[u.path] = !n.value[u.path]
            }, [
              z(Wo, {
                adapter: t.adapter,
                path: u.path,
                modelValue: n.value[u.path],
                "onUpdate:modelValue": (_) => n.value[u.path] = _
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Yf),
            a("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (_) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r.adapter, path: u.path } })
            }, [
              a("div", Jf, [
                o(e).fs.path === u.path ? (v(), W(o(Po), { key: 0 })) : (v(), W(o(mn), { key: 1 }))
              ]),
              a("div", {
                class: ae(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(e).fs.path === u.path
                }])
              }, b(u.basename), 3)
            ], 8, Xf)
          ]),
          a("div", Zf, [
            ue(z(i, {
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
}, em = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, r = M(!1);
    function s(c) {
      c === e.fs.adapter ? r.value = !r.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: c } }), n("adapter", c));
    }
    return (c, l) => (v(), g(ge, null, [
      a("div", {
        onClick: l[2] || (l[2] = (d) => s(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        a("div", {
          class: ae(["vuefinder__treestorageitem__info", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          a("div", {
            class: ae(["vuefinder__treestorageitem__icon", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            z(o(zo))
          ], 2),
          a("div", null, b(t.storage), 1)
        ], 2),
        a("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: l[1] || (l[1] = Ze((d) => r.value = !r.value, ["stop"]))
        }, [
          z(Wo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: r.value,
            "onUpdate:modelValue": l[0] || (l[0] = (d) => r.value = d)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ue(z(Qf, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [Ue, r.value]
      ])
    ], 64));
  }
}, tm = { class: "vuefinder__folder-indicator" }, nm = { class: "vuefinder__folder-indicator--icon" }, sm = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Rs(t, "modelValue");
    return (n, r) => (v(), g("div", tm, [
      a("div", nm, [
        e.value ? (v(), W(o(Go), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : q("", !0),
        e.value ? q("", !0) : (v(), W(o(jo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, om = { class: "vuefinder__treeview__header" }, rm = { class: "vuefinder__treeview__pinned-label" }, am = { class: "vuefinder__treeview__pin-text text-nowrap" }, lm = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, im = { class: "vuefinder__treeview__pinned-item" }, cm = ["onClick"], dm = ["title"], um = ["onClick"], _m = { key: 0 }, vm = { class: "vuefinder__treeview__no-pinned" }, fm = { class: "vuefinder__treeview__storage" }, mm = {
  __name: "TreeView",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { getStore: r, setStore: s } = e.storage, c = M(190), l = M(r("pinned-folders-opened", !0));
    Me(l, (m) => s("pinned-folders-opened", m));
    const d = (m) => {
      e.pinnedFolders = e.pinnedFolders.filter((_) => _.path !== m.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (m) => {
      const _ = m.clientX, p = m.target.parentElement, f = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const h = (k) => {
        c.value = f + k.clientX - _, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, $ = () => {
        const k = p.getBoundingClientRect();
        c.value = k.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", $);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", $);
    }, u = M(null);
    return xe(() => {
      je(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Me(e.fs.data, (m, _) => {
      const p = m.files.filter((f) => f.type === "dir");
      Ko(e.treeViewData, { path: e.fs.path, folders: p.map((f) => ({
        adapter: f.storage,
        path: f.path,
        basename: f.basename
      })) });
    }), (m, _) => (v(), g(ge, null, [
      a("div", {
        onClick: _[0] || (_[0] = (p) => o(e).showTreeView = !o(e).showTreeView),
        class: ae(["vuefinder__treeview__overlay", o(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      a("div", {
        style: rn(o(e).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        a("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          a("div", om, [
            a("div", {
              onClick: _[2] || (_[2] = (p) => l.value = !l.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              a("div", rm, [
                z(o(qo), { class: "vuefinder__treeview__pin-icon" }),
                a("div", am, b(o(n)("Pinned Folders")), 1)
              ]),
              z(sm, {
                modelValue: l.value,
                "onUpdate:modelValue": _[1] || (_[1] = (p) => l.value = p)
              }, null, 8, ["modelValue"])
            ]),
            l.value ? (v(), g("ul", lm, [
              (v(!0), g(ge, null, ke(o(e).pinnedFolders, (p) => (v(), g("li", im, [
                a("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (f) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: p.storage, path: p.path } })
                }, [
                  o(e).fs.path !== p.path ? (v(), W(o(mn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : q("", !0),
                  o(e).fs.path === p.path ? (v(), W(o(Po), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : q("", !0),
                  a("div", {
                    title: p.path,
                    class: ae(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": o(e).fs.path === p.path
                    }])
                  }, b(p.basename), 11, dm)
                ], 8, cm),
                a("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (f) => d(p)
                }, [
                  z(o(Ff), { class: "vuefinder__treeview__remove-icon" })
                ], 8, um)
              ]))), 256)),
              o(e).pinnedFolders.length ? q("", !0) : (v(), g("li", _m, [
                a("div", vm, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : q("", !0)
          ]),
          (v(!0), g(ge, null, ke(o(e).fs.data.storages, (p) => (v(), g("div", fm, [
            z(em, { storage: p }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        a("div", {
          onMousedown: i,
          class: ae([(o(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, pm = { class: "vuefinder__main__content" }, hm = {
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
    const n = e, r = t, s = Ma(r, re("VueFinderOptions"));
    ir("ServiceContainer", s);
    const { setStore: c } = s.storage, l = M(null);
    s.root = l;
    const d = s.dragSelect;
    Fi(s);
    const i = (_) => {
      Object.assign(s.fs.data, _), d.clearSelection(), d.refreshSelection();
    };
    let u;
    s.emitter.on("vf-fetch-abort", () => {
      u.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: _, body: p = null, onSuccess: f = null, onError: h = null, noCloseModal: $ = !1 }) => {
      ["index", "search"].includes(_.q) && (u && u.abort(), s.fs.loading = !0), u = new AbortController();
      const k = u.signal;
      s.requester.send({
        url: "",
        method: _.m || "get",
        params: _,
        body: p,
        abortSignal: k
      }).then((E) => {
        s.fs.adapter = E.adapter, s.persist && (s.fs.path = E.dirname, c("path", s.fs.path)), $ || s.modal.close(), i(E), f && f(E);
      }).catch((E) => {
        console.error(E), h && h(E);
      }).finally(() => {
        ["index", "search"].includes(_.q) && (s.fs.loading = !1);
      });
    });
    function m(_) {
      let p = {};
      _ && _.includes("://") && (p = {
        adapter: _.split("://")[0],
        path: _
      }), s.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: s.fs.adapter, ...p },
        onError: r.onError ?? ((f) => {
          f.message && s.emitter.emit("vf-toast-push", { label: f.message, type: "error" });
        })
      });
    }
    return xe(() => {
      m(s.fs.path), Me(() => r.path, (_) => {
        m(_);
      }), d.onSelect((_) => {
        n("select", _);
      }), Me(() => s.fs.data.dirname, (_) => {
        n("update:path", _);
      });
    }), (_, p) => (v(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: l,
      tabindex: "0"
    }, [
      a("div", {
        class: ae(o(s).theme.actualValue)
      }, [
        a("div", {
          class: ae([o(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: rn(o(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: p[0] || (p[0] = (f) => o(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (f) => o(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          z(Rd),
          z(f_),
          a("div", pm, [
            z(mm),
            z(ef)
          ]),
          z(Sf)
        ], 38),
        z(cr, { name: "fade" }, {
          default: Q(() => [
            o(s).modal.visible ? (v(), W(Fs(o(s).modal.type), { key: 0 })) : q("", !0)
          ]),
          _: 1
        }),
        z(sf)
      ], 2)
    ], 512));
  }
}, Em = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", hm);
  }
};
export {
  Em as default
};
