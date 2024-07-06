var er = Object.defineProperty;
var tr = (t, e, n) => e in t ? er(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var vs = (t, e, n) => tr(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as St, watch as Be, ref as C, shallowRef as nr, onMounted as Ce, onUnmounted as Kn, onUpdated as Bs, nextTick as ft, computed as ct, inject as ae, openBlock as v, createElementBlock as h, withKeys as Ct, unref as o, createElementVNode as a, withModifiers as at, renderSlot as Lt, normalizeClass as _e, toDisplayString as b, createBlock as W, resolveDynamicComponent as Is, withCtx as ne, createVNode as q, Fragment as ye, renderList as xe, createCommentVNode as P, withDirectives as me, vModelCheckbox as Gt, createTextVNode as Q, vModelSelect as En, vModelText as Et, onBeforeUnmount as Ns, customRef as sr, vShow as qe, isRef as or, TransitionGroup as rr, normalizeStyle as rn, mergeModels as ar, useModel as Us, resolveComponent as lr, provide as ir, Transition as cr } from "vue";
import dr from "mitt";
import ur from "dragselect";
import _r from "@uppy/core";
import vr from "@uppy/xhr-upload";
import fr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import mr from "cropperjs";
var Hs;
const wn = (Hs = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Hs.getAttribute("content");
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
    wn != null && wn !== "" && (r[n.xsrfHeaderName] = wn);
    const s = Object.assign({}, n.headers, r, e.headers), i = Object.assign({}, n.params, e.params), c = e.body, d = n.baseUrl + e.url, l = e.method;
    let u;
    l !== "get" && (c instanceof FormData ? (u = c, n.body != null && Object.entries(this.config.body).forEach(([_, p]) => {
      u.append(_, p);
    })) : (u = { ...c }, n.body != null && Object.assign(u, this.config.body)));
    const m = {
      url: d,
      method: l,
      headers: s,
      params: i,
      body: u
    };
    if (n.transformRequest != null) {
      const _ = n.transformRequest({
        url: d,
        method: l,
        headers: s,
        params: i,
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
    }, i = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let d;
      n.body instanceof FormData ? d = e.body : (d = JSON.stringify(n.body), s.headers["Content-Type"] = "application/json"), s.body = d;
    }
    const c = await fetch(i, s);
    if (c.ok)
      return await c[r]();
    throw await c.json();
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
  const n = St(JSON.parse(e ?? "{}"));
  Be(n, r);
  function r() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(l, u) {
    n[l] = u;
  }
  function i(l) {
    delete n[l];
  }
  function c() {
    Object.keys(n).map((l) => i(l));
  }
  return { getStore: (l, u = null) => n.hasOwnProperty(l) ? n[l] : u, setStore: s, removeStore: i, clearStore: c };
}
async function br(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function wr(t, e, n, r) {
  const { getStore: s, setStore: i } = t, c = C({}), d = C(s("locale", e)), l = (_, p = e) => {
    br(_, r).then((f) => {
      c.value = f, i("locale", _), d.value = _, i("translations", f), Object.values(r).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + _ }), n.emit("vf-language-saved"));
    }).catch((f) => {
      p ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(p, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Be(d, (_) => {
    l(_);
  }), !s("locale") && !r.length ? l(e) : c.value = s("translations");
  const u = (_, ...p) => p.length ? u(_ = _.replace("%s", p.shift()), ...p) : _;
  function m(_, ...p) {
    return c.value && c.value.hasOwnProperty(_) ? u(c.value[_], ...p) : u(_, ...p);
  }
  return St({ t: m, locale: d });
}
const fe = {
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
}, yr = Object.values(fe), $r = "2.5.15";
function Ps(t, e, n, r, s) {
  return (e = Math, n = e.log, r = 1024, s = n(t) / n(r) | 0, t / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function qs(t, e, n, r, s) {
  return (e = Math, n = e.log, r = 1e3, s = n(t) / n(r) | 0, t / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function kr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const st = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function xr(t, e) {
  const n = C(st.SYSTEM), r = C(st.LIGHT);
  n.value = t.getStore("theme", e ?? st.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), i = (c) => {
    n.value === st.DARK || n.value === st.SYSTEM && c.matches ? r.value = st.DARK : r.value = st.LIGHT;
  };
  return i(s), s.addEventListener("change", i), {
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
      n.value = c, c !== st.SYSTEM ? t.setStore("theme", c) : t.removeStore("theme"), i(s);
    }
  };
}
function Sr() {
  const t = nr(null), e = C(!1), n = C();
  return { visible: e, type: t, data: n, open: (i, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = i, n.value = c;
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
const Le = (t, e) => {
  const { o: n, i: r, u: s } = t;
  let i = n, c;
  const d = (m, _) => {
    const p = i, f = m, g = _ || (r ? !r(p, f) : p !== f);
    return (g || s) && (i = f, c = p), [i, g, c];
  };
  return [e ? (m) => d(e(i, c), m) : d, (m) => [i, !!m, c]];
}, zs = typeof window < "u" && typeof document < "u", Me = zs ? window : {}, Gs = Math.max, Cr = Math.min, Tn = Math.round, Qt = Math.abs, fs = Math.sign, js = Me.cancelAnimationFrame, Wn = Me.requestAnimationFrame, Zt = Me.setTimeout, An = Me.clearTimeout, an = (t) => typeof Me[t] < "u" ? Me[t] : void 0, Er = an("MutationObserver"), ms = an("IntersectionObserver"), en = an("ResizeObserver"), Mn = an("ScrollTimeline"), Ks = zs && Node.ELEMENT_NODE, { toString: Tm, hasOwnProperty: yn } = Object.prototype, ln = (t) => t === void 0, Yn = (t) => t === null, Ge = (t) => typeof t == "number", cn = (t) => typeof t == "string", Ws = (t) => typeof t == "boolean", Ie = (t) => typeof t == "function", je = (t) => Array.isArray(t), Ot = (t) => typeof t == "object" && !je(t) && !Yn(t), dn = (t) => {
  const e = !!t && t.length, n = Ge(e) && e > -1 && e % 1 == 0;
  return je(t) || !Ie(t) && n ? e > 0 && Ot(t) ? e - 1 in t : !0 : !1;
}, tn = (t) => {
  if (!t || !Ot(t))
    return !1;
  let e;
  const n = "constructor", r = t[n], s = r && r.prototype, i = yn.call(t, n), c = s && yn.call(s, "isPrototypeOf");
  if (r && !i && !c)
    return !1;
  for (e in t)
    ;
  return ln(e) || yn.call(t, e);
}, nn = (t) => {
  const e = HTMLElement;
  return t ? e ? t instanceof e : t.nodeType === Ks : !1;
}, un = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === Ks : !1;
};
function ce(t, e) {
  if (dn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && ce(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const Xn = (t, e) => t.indexOf(e) >= 0, Qe = (t, e) => t.concat(e), ge = (t, e, n) => (!cn(e) && dn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), ut = (t) => Array.from(t || []), Ys = (t) => je(t) ? t : [t], Dn = (t) => !!t && !t.length, ps = (t) => ut(new Set(t)), Ne = (t, e, n) => {
  ce(t, (s) => s && s.apply(void 0, e || [])), !n && (t.length = 0);
}, Xs = "paddingTop", Js = "paddingRight", Qs = "paddingLeft", Zs = "paddingBottom", eo = "marginLeft", to = "marginRight", no = "marginBottom", Tr = "overflowX", Ar = "overflowY", yt = "width", $t = "height", rt = "visible", _t = "hidden", kt = "scroll", Mr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, _n = (t, e, n, r) => {
  if (t && e) {
    let s = !0;
    return ce(n, (i) => {
      const c = t[i], d = e[i];
      c !== d && (s = !1);
    }), s;
  }
  return !1;
}, so = (t, e) => _n(t, e, ["w", "h"]), Yt = (t, e) => _n(t, e, ["x", "y"]), Dr = (t, e) => _n(t, e, ["t", "r", "b", "l"]), lt = () => {
}, J = (t, ...e) => t.bind(0, ...e), vt = (t) => {
  let e;
  const n = t ? Zt : Wn, r = t ? An : js;
  return [(s) => {
    r(e), e = n(() => s(), Ie(t) ? t() : t);
  }, () => r(e)];
}, Vn = (t, e) => {
  const { _: n, p: r, v: s, m: i } = e || {};
  let c, d, l, u, m = lt;
  const _ = function(w) {
    m(), An(c), u = c = d = void 0, m = lt, t.apply(this, w);
  }, p = ($) => i && d ? i(d, $) : $, f = () => {
    m !== lt && _(p(l) || l);
  }, g = function() {
    const w = ut(arguments), A = Ie(n) ? n() : n;
    if (Ge(A) && A >= 0) {
      const M = Ie(r) ? r() : r, y = Ge(M) && M >= 0, N = A > 0 ? Zt : Wn, z = A > 0 ? An : js, D = p(w) || w, L = _.bind(0, D);
      let V;
      m(), s && !u ? (L(), u = !0, V = N(() => u = void 0, A)) : (V = N(L, A), y && !c && (c = Zt(f, M))), m = () => z(V), d = l = D;
    } else
      _(w);
  };
  return g.S = f, g;
}, oo = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Ze = (t) => t ? Object.keys(t) : [], re = (t, e, n, r, s, i, c) => {
  const d = [e, n, r, s, i, c];
  return (typeof t != "object" || Yn(t)) && !Ie(t) && (t = {}), ce(d, (l) => {
    ce(l, (u, m) => {
      const _ = l[m];
      if (t === _)
        return !0;
      const p = je(_);
      if (_ && tn(_)) {
        const f = t[m];
        let g = f;
        p && !je(f) ? g = [] : !p && !tn(f) && (g = {}), t[m] = re(g, _);
      } else
        t[m] = p ? _.slice() : _;
    });
  }), t;
}, ro = (t, e) => ce(re({}, t), (n, r, s) => {
  n === void 0 ? delete s[r] : n && tn(n) && (s[r] = ro(n));
}), Jn = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, Ln = (t, e, n) => Gs(t, Cr(e, n)), mt = (t) => ut(new Set((je(t) ? t : (t || "").split(" ")).filter((e) => e))), Qn = (t, e) => t && t.getAttribute(e), hs = (t, e) => t && t.hasAttribute(e), Je = (t, e, n) => {
  ce(mt(e), (r) => {
    t && t.setAttribute(r, String(n || ""));
  });
}, Pe = (t, e) => {
  ce(mt(e), (n) => t && t.removeAttribute(n));
}, vn = (t, e) => {
  const n = mt(Qn(t, e)), r = J(Je, t, e), s = (i, c) => {
    const d = new Set(n);
    return ce(mt(i), (l) => {
      d[c](l);
    }), ut(d).join(" ");
  };
  return {
    O: (i) => r(s(i, "delete")),
    $: (i) => r(s(i, "add")),
    C: (i) => {
      const c = mt(i);
      return c.reduce((d, l) => d && n.includes(l), c.length > 0);
    }
  };
}, ao = (t, e, n) => (vn(t, e).O(n), J(Zn, t, e, n)), Zn = (t, e, n) => (vn(t, e).$(n), J(ao, t, e, n)), On = (t, e, n, r) => (r ? Zn : ao)(t, e, n), es = (t, e, n) => vn(t, e).C(n), lo = (t) => vn(t, "class"), io = (t, e) => {
  lo(t).O(e);
}, ts = (t, e) => (lo(t).$(e), J(io, t, e)), co = (t, e) => {
  const n = [], r = e ? un(e) && e : document;
  return r ? ge(n, r.querySelectorAll(t)) : n;
}, Vr = (t, e) => {
  const n = e ? un(e) && e : document;
  return n ? n.querySelector(t) : null;
}, sn = (t, e) => un(t) ? t.matches(e) : !1, uo = (t) => sn(t, "body"), Rn = (t) => t ? ut(t.childNodes) : [], xt = (t) => t && t.parentElement, bt = (t, e) => un(t) && t.closest(e), Fn = (t) => document.activeElement, Lr = (t, e, n) => {
  const r = bt(t, e), s = t && Vr(n, r), i = bt(s, e) === r;
  return r && s ? r === t || s === t || i && bt(bt(t, n), e) !== r : !1;
}, dt = (t) => {
  if (dn(t))
    ce(ut(t), (e) => dt(e));
  else if (t) {
    const e = xt(t);
    e && e.removeChild(t);
  }
}, _o = (t, e, n) => {
  if (n && t) {
    let r = e, s;
    return dn(n) ? (s = document.createDocumentFragment(), ce(n, (i) => {
      i === r && (r = i.previousSibling), s.appendChild(i);
    })) : s = n, e && (r ? r !== e && (r = r.nextSibling) : r = t.firstChild), t.insertBefore(s, r || null), () => dt(n);
  }
  return lt;
}, Oe = (t, e) => _o(t, null, e), gs = (t, e) => _o(xt(t), t && t.nextSibling, e), wt = (t) => {
  const e = document.createElement("div");
  return Je(e, "class", t), e;
}, vo = (t) => {
  const e = wt();
  return e.innerHTML = t.trim(), ce(Rn(e), (n) => dt(n));
}, Or = /^--/, bs = (t, e) => t.getPropertyValue(e) || t[e] || "", ns = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, jt = (t) => ns(parseFloat(t || "")), ws = (t) => `${(ns(t) * 100).toFixed(3)}%`, Hn = (t) => `${ns(t)}px`;
function Rt(t, e) {
  t && e && ce(e, (n, r) => {
    try {
      const s = t.style, i = Ge(n) ? Hn(n) : (n || "") + "";
      Or.test(r) ? s.setProperty(r, i) : s[r] = i;
    } catch {
    }
  });
}
function pt(t, e, n) {
  const r = cn(e);
  let s = r ? "" : {};
  if (t) {
    const i = Me.getComputedStyle(t, n) || t.style;
    s = r ? bs(i, e) : ut(e).reduce((c, d) => (c[d] = bs(i, d), c), s);
  }
  return s;
}
const ys = (t, e, n) => {
  const r = e ? `${e}-` : "", s = n ? `-${n}` : "", i = `${r}top${s}`, c = `${r}right${s}`, d = `${r}bottom${s}`, l = `${r}left${s}`, u = pt(t, [i, c, d, l]);
  return {
    t: jt(u[i]),
    r: jt(u[c]),
    b: jt(u[d]),
    l: jt(u[l])
  };
}, $n = (t, e) => `translate${Ot(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, Rr = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Fr = {
  w: 0,
  h: 0
}, fn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Fr, Hr = (t) => fn("inner", t || Me), Dt = J(fn, "offset"), fo = J(fn, "client"), Bn = J(fn, "scroll"), ss = (t) => {
  const e = parseFloat(pt(t, yt)) || 0, n = parseFloat(pt(t, $t)) || 0;
  return {
    w: e - Tn(e),
    h: n - Tn(n)
  };
}, Vt = (t) => t.getBoundingClientRect(), Br = (t) => !!t && Rr(t), In = (t) => !!(t && (t[$t] || t[yt])), mo = (t, e) => {
  const n = In(t);
  return !In(e) && n;
}, $s = (t, e, n, r) => {
  ce(mt(e), (s) => {
    t && t.removeEventListener(s, n, r);
  });
}, ve = (t, e, n, r) => {
  var s;
  const i = (s = r && r.H) != null ? s : !0, c = r && r.I || !1, d = r && r.A || !1, l = {
    passive: i,
    capture: c
  };
  return J(Ne, mt(e).map((u) => {
    const m = d ? (_) => {
      $s(t, u, m, c), n && n(_);
    } : n;
    return t && t.addEventListener(u, m, l), J($s, t, u, m, c);
  }));
}, po = (t) => t.stopPropagation(), Nn = (t) => t.preventDefault(), ho = (t) => po(t) || Nn(t), ze = (t, e) => {
  const { x: n, y: r } = Ge(e) ? {
    x: e,
    y: e
  } : e || {};
  Ge(n) && (t.scrollLeft = n), Ge(r) && (t.scrollTop = r);
}, Re = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), go = () => ({
  T: {
    x: 0,
    y: 0
  },
  D: {
    x: 0,
    y: 0
  }
}), Ir = (t, e) => {
  const { T: n, D: r } = t, { w: s, h: i } = e, c = (_, p, f) => {
    let g = fs(_) * f, $ = fs(p) * f;
    if (g === $) {
      const w = Qt(_), A = Qt(p);
      $ = w > A ? 0 : $, g = w < A ? 0 : g;
    }
    return g = g === $ ? 0 : g, [g + 0, $ + 0];
  }, [d, l] = c(n.x, r.x, s), [u, m] = c(n.y, r.y, i);
  return {
    T: {
      x: d,
      y: u
    },
    D: {
      x: l,
      y: m
    }
  };
}, ks = ({ T: t, D: e }) => {
  const n = (r, s) => r === 0 && r <= s;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, xs = ({ T: t, D: e }, n) => {
  const r = (s, i, c) => Ln(0, 1, (s - c) / (s - i) || 0);
  return {
    x: r(t.x, e.x, n.x),
    y: r(t.y, e.y, n.y)
  };
}, Un = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, Ss = (t, e) => {
  ce(Ys(e), t);
}, Pn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (i, c) => {
    if (i) {
      const d = e.get(i);
      Ss((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, c);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, r = (i, c) => {
    if (cn(i)) {
      const u = e.get(i) || /* @__PURE__ */ new Set();
      return e.set(i, u), Ss((m) => {
        Ie(m) && u.add(m);
      }, c), J(n, i, c);
    }
    Ws(c) && c && n();
    const d = Ze(i), l = [];
    return ce(d, (u) => {
      const m = i[u];
      m && ge(l, r(u, m));
    }), J(Ne, l);
  }, s = (i, c) => {
    ce(ut(e.get(i)), (d) => {
      c && !Dn(c) ? d.apply(0, c) : d();
    });
  };
  return r(t || {}), [r, n, s];
}, Cs = (t) => JSON.stringify(t, (e, n) => {
  if (Ie(n))
    throw 0;
  return n;
}), Es = (t, e) => t ? `${e}`.split(".").reduce((n, r) => n && oo(n, r) ? n[r] : void 0, t) : void 0, Nr = {
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
}, bo = (t, e) => {
  const n = {}, r = Qe(Ze(e), Ze(t));
  return ce(r, (s) => {
    const i = t[s], c = e[s];
    if (Ot(i) && Ot(c))
      re(n[s] = {}, bo(i, c)), Jn(n[s]) && delete n[s];
    else if (oo(e, s) && c !== i) {
      let d = !0;
      if (je(i) || je(c))
        try {
          Cs(i) === Cs(c) && (d = !1);
        } catch {
        }
      d && (n[s] = c);
    }
  }), n;
}, Ts = (t, e, n) => (r) => [Es(t, r), n || Es(e, r) !== void 0], Tt = "data-overlayscrollbars", Xt = "os-environment", Kt = `${Xt}-scrollbar-hidden`, kn = `${Tt}-initialize`, Jt = "noClipping", As = `${Tt}-body`, it = Tt, Ur = "host", ot = `${Tt}-viewport`, Pr = Tr, qr = Ar, zr = "arrange", wo = "measuring", yo = "scrollbarHidden", Gr = "scrollbarPressed", jr = "noContent", qn = `${Tt}-padding`, Ms = `${Tt}-content`, os = "os-size-observer", Kr = `${os}-appear`, Wr = `${os}-listener`, Yr = "os-trinsic-observer", Xr = "os-theme-none", Fe = "os-scrollbar", Jr = `${Fe}-rtl`, Qr = `${Fe}-horizontal`, Zr = `${Fe}-vertical`, $o = `${Fe}-track`, rs = `${Fe}-handle`, ea = `${Fe}-visible`, ta = `${Fe}-cornerless`, Ds = `${Fe}-interaction`, Vs = `${Fe}-unusable`, zn = `${Fe}-auto-hide`, Ls = `${zn}-hidden`, Os = `${Fe}-wheel`, na = `${$o}-interactive`, sa = `${rs}-interactive`;
let xn;
const oa = () => {
  const t = (x, M, y) => {
    Oe(document.body, x), Oe(document.body, x);
    const N = fo(x), z = Dt(x), R = ss(M);
    return y && dt(x), {
      x: z.h - N.h + R.h,
      y: z.w - N.w + R.w
    };
  }, e = (x) => {
    let M = !1;
    const y = ts(x, Kt);
    try {
      M = pt(x, "scrollbar-width") === "none" || pt(x, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return y(), M;
  }, n = `.${Xt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Xt} div{width:200%;height:200%;margin:10px 0}.${Kt}{scrollbar-width:none!important}.${Kt}::-webkit-scrollbar,.${Kt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = vo(`<div class="${Xt}"><div></div><style>${n}</style></div>`)[0], i = s.firstChild, [c, , d] = Pn(), [l, u] = Le({
    o: t(s, i),
    i: Yt
  }, J(t, s, i, !0)), [m] = u(), _ = e(s), p = {
    x: m.x === 0,
    y: m.y === 0
  }, f = {
    elements: {
      host: null,
      padding: !_,
      viewport: (x) => _ && uo(x) && x,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, g = re({}, Nr), $ = J(re, {}, g), w = J(re, {}, f), A = {
    k: m,
    M: p,
    R: _,
    V: !!Mn,
    L: J(c, "r"),
    P: w,
    U: (x) => re(f, x) && w(),
    N: $,
    q: (x) => re(g, x) && $(),
    B: re({}, f),
    F: re({}, g)
  };
  if (Pe(s, "style"), dt(s), ve(Me, "resize", () => {
    d("r", []);
  }), Ie(Me.matchMedia) && !_ && (!p.x || !p.y)) {
    const x = (M) => {
      const y = Me.matchMedia(`(resolution: ${Me.devicePixelRatio}dppx)`);
      ve(y, "change", () => {
        M(), x(M);
      }, {
        A: !0
      });
    };
    x(() => {
      const [M, y] = l();
      re(A.k, M), d("r", [y]);
    });
  }
  return A;
}, Ke = () => (xn || (xn = oa()), xn), ko = (t, e) => Ie(e) ? e.apply(0, t) : e, ra = (t, e, n, r) => {
  const s = ln(r) ? n : r;
  return ko(t, s) || e.apply(0, t);
}, xo = (t, e, n, r) => {
  const s = ln(r) ? n : r, i = ko(t, s);
  return !!i && (nn(i) ? i : e.apply(0, t));
}, aa = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: r } = e || {}, { M: s, R: i, P: c } = Ke(), { nativeScrollbarsOverlaid: d, body: l } = c().cancel, u = n ?? d, m = ln(r) ? l : r, _ = (s.x || s.y) && u, p = t && (Yn(m) ? !i : m);
  return !!_ || !!p;
}, as = /* @__PURE__ */ new WeakMap(), la = (t, e) => {
  as.set(t, e);
}, ia = (t) => {
  as.delete(t);
}, So = (t) => as.get(t), ca = (t, e, n) => {
  let r = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, i = () => {
    r = !0;
  }, c = (d) => {
    if (s && n) {
      const l = n.map((u) => {
        const [m, _] = u || [];
        return [_ && m ? (d || co)(m, t) : [], _];
      });
      ce(l, (u) => ce(u[0], (m) => {
        const _ = u[1], p = s.get(m) || [];
        if (t.contains(m) && _) {
          const g = ve(m, _, ($) => {
            r ? (g(), s.delete(m)) : e($);
          });
          s.set(m, ge(p, g));
        } else
          Ne(p), s.delete(m);
      }));
    }
  };
  return c(), [i, c];
}, Rs = (t, e, n, r) => {
  let s = !1;
  const { j: i, X: c, Y: d, W: l, J: u, K: m } = r || {}, _ = Vn(() => s && n(!0), {
    _: 33,
    p: 99
  }), [p, f] = ca(t, _, d), g = i || [], $ = c || [], w = Qe(g, $), A = (M, y) => {
    if (!Dn(y)) {
      const N = u || lt, z = m || lt, R = [], D = [];
      let L = !1, V = !1;
      if (ce(y, (E) => {
        const { attributeName: O, target: S, type: k, oldValue: B, addedNodes: F, removedNodes: se } = E, de = k === "attributes", le = k === "childList", H = t === S, ee = de && O, te = ee && Qn(S, O || ""), X = cn(te) ? te : null, ue = ee && B !== X, U = Xn($, O) && ue;
        if (e && (le || !H)) {
          const j = de && ue, G = j && l && sn(S, l), I = (G ? !N(S, O, B, X) : !de || j) && !z(E, !!G, t, r);
          ce(F, (K) => ge(R, K)), ce(se, (K) => ge(R, K)), V = V || I;
        }
        !e && H && ue && !N(S, O, B, X) && (ge(D, O), L = L || U);
      }), f((E) => ps(R).reduce((O, S) => (ge(O, co(E, S)), sn(S, E) ? ge(O, S) : O), [])), e)
        return !M && V && n(!1), [!1];
      if (!Dn(D) || L) {
        const E = [ps(D), L];
        return !M && n.apply(0, E), E;
      }
    }
  }, x = new Er(J(A, !1));
  return [() => (x.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: w,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (p(), x.disconnect(), s = !1);
  }), () => {
    if (s)
      return _.S(), A(!0, x.takeRecords());
  }];
}, Co = {}, Eo = {}, da = (t) => {
  ce(t, (e) => ce(e, (n, r) => {
    Co[r] = e[r];
  }));
}, To = (t, e, n) => Ze(t).map((r) => {
  const { static: s, instance: i } = t[r], [c, d, l] = n || [], u = n ? i : s;
  if (u) {
    const m = n ? u(c, d, e) : u(e);
    return (l || Eo)[r] = m;
  }
}), Ft = (t) => Eo[t], ua = "__osOptionsValidationPlugin", _a = "__osSizeObserverPlugin", va = (t, e) => {
  const { M: n } = e, [r, s] = t("showNativeOverlaidScrollbars");
  return [r && n.x && n.y, s];
}, on = (t) => t.indexOf(rt) === 0, fa = (t, e) => {
  const n = (s, i, c, d) => {
    const l = s === rt ? _t : s.replace(`${rt}-`, ""), u = on(s), m = on(c);
    return !i && !d ? _t : u && m ? rt : u ? i && d ? l : i ? rt : _t : i ? l : m && d ? rt : _t;
  }, r = {
    x: n(e.x, t.x, e.y, t.y),
    y: n(e.y, t.y, e.x, t.x)
  };
  return {
    G: r,
    Z: {
      x: r.x === kt,
      y: r.y === kt
    }
  };
}, Ao = "__osScrollbarsHidingPlugin", ma = "__osClickScrollPlugin", Mo = (t, e, n) => {
  const { dt: r } = n || {}, s = Ft(_a), [i] = Le({
    o: !1,
    u: !0
  });
  return () => {
    const c = [], l = vo(`<div class="${os}"><div class="${Wr}"></div></div>`)[0], u = l.firstChild, m = (_) => {
      const p = _ instanceof ResizeObserverEntry;
      let f = !1, g = !1;
      if (p) {
        const [$, , w] = i(_.contentRect), A = In($);
        g = mo($, w), f = !g && !A;
      } else
        g = _ === !0;
      f || e({
        ft: !0,
        dt: g
      });
    };
    if (en) {
      const _ = new en((p) => m(p.pop()));
      _.observe(u), ge(c, () => {
        _.disconnect();
      });
    } else if (s) {
      const [_, p] = s(u, m, r);
      ge(c, Qe([ts(l, Kr), ve(l, "animationstart", _)], p));
    } else
      return lt;
    return J(Ne, ge(c, Oe(t, l)));
  };
}, pa = (t, e) => {
  let n;
  const r = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, s = wt(Yr), [i] = Le({
    o: !1
  }), c = (l, u) => {
    if (l) {
      const m = i(r(l)), [, _] = m;
      return _ && !u && e(m) && [m];
    }
  }, d = (l, u) => c(u.pop(), l);
  return [() => {
    const l = [];
    if (ms)
      n = new ms(J(d, !1), {
        root: t
      }), n.observe(s), ge(l, () => {
        n.disconnect();
      });
    else {
      const u = () => {
        const m = Dt(s);
        c(m);
      };
      ge(l, Mo(s, u)()), u();
    }
    return J(Ne, ge(l, Oe(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, ha = (t, e, n, r) => {
  let s, i, c, d, l, u;
  const m = `[${it}]`, _ = `[${ot}]`, p = [], f = ["wrap", "cols", "rows"], g = ["id", "class", "style", "open"], { vt: $, ht: w, ot: A, gt: x, bt: M, wt: y, nt: N, yt: z, St: R, Ot: D } = t, L = (T) => pt(T, "direction") === "rtl", V = {
    $t: !1,
    ct: L($)
  }, E = Ke(), O = Ft(Ao), [S] = Le({
    i: so,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const T = O && O.tt(t, e, V, E, n).ut, K = !(z && N) && es(w, it, Jt), Y = !N && R(zr), Z = Y && Re(x), ie = D(wo, K), we = Y && T && T()[0], Se = Bn(A), oe = ss(A);
    return we && we(), ze(x, Z), K && ie(), {
      w: Se.w + oe.w,
      h: Se.h + oe.h
    };
  }), k = y ? f : Qe(g, f), B = Vn(r, {
    _: () => s,
    p: () => i,
    m(T, I) {
      const [K] = T, [Y] = I;
      return [Qe(Ze(K), Ze(Y)).reduce((Z, ie) => (Z[ie] = K[ie] || Y[ie], Z), {})];
    }
  }), F = (T) => {
    const I = L($);
    re(T, {
      Ct: u !== I
    }), re(V, {
      ct: I
    }), u = I;
  }, se = (T, I) => {
    const [K, Y] = T, Z = {
      xt: Y
    };
    return re(V, {
      $t: K
    }), !I && r(Z), Z;
  }, de = ({ ft: T, dt: I }) => {
    const Y = !(T && !I) && E.R ? B : r, Z = {
      ft: T || I,
      dt: I
    };
    F(Z), Y(Z);
  }, le = (T, I) => {
    const [, K] = S(), Y = {
      Ht: K
    };
    return F(Y), K && !I && (T ? r : B)(Y), Y;
  }, H = (T, I, K) => {
    const Y = {
      Et: I
    };
    return F(Y), I && !K && B(Y), Y;
  }, [ee, te] = M ? pa(w, se) : [], X = !N && Mo(w, de, {
    dt: !0
  }), [ue, U] = Rs(w, !1, H, {
    X: g,
    j: Qe(g, p)
  }), j = N && en && new en((T) => {
    const I = T[T.length - 1].contentRect;
    de({
      ft: !0,
      dt: mo(I, l)
    }), l = I;
  }), G = Vn(() => {
    const [, T] = S();
    r({
      Ht: T
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    j && j.observe(w);
    const T = X && X(), I = ee && ee(), K = ue(), Y = E.L((Z) => {
      Z ? B({
        zt: Z
      }) : G();
    });
    return () => {
      j && j.disconnect(), T && T(), I && I(), d && d(), K(), Y();
    };
  }, ({ It: T, At: I, Tt: K }) => {
    const Y = {}, [Z] = T("update.ignoreMutation"), [ie, we] = T("update.attributes"), [Se, oe] = T("update.elementEvents"), [$e, Ee] = T("update.debounce"), He = oe || we, ke = I || K, De = (be) => Ie(Z) && Z(be);
    if (He) {
      c && c(), d && d();
      const [be, pe] = Rs(M || A, !0, le, {
        j: Qe(k, ie || []),
        Y: Se,
        W: m,
        K: (Te, he) => {
          const { target: Ae, attributeName: Ve } = Te;
          return (!he && Ve && !N ? Lr(Ae, m, _) : !1) || !!bt(Ae, `.${Fe}`) || !!De(Te);
        }
      });
      d = be(), c = pe;
    }
    if (Ee)
      if (B.S(), je($e)) {
        const be = $e[0], pe = $e[1];
        s = Ge(be) && be, i = Ge(pe) && pe;
      } else Ge($e) ? (s = $e, i = !1) : (s = !1, i = !1);
    if (ke) {
      const be = U(), pe = te && te(), Te = c && c();
      be && re(Y, H(be[0], be[1], ke)), pe && re(Y, se(pe[0], ke)), Te && re(Y, le(Te[0], ke));
    }
    return F(Y), Y;
  }, V];
}, ga = (t, e, n, r) => {
  const { P: s } = Ke(), { scrollbars: i } = s(), { slot: c } = i, { vt: d, ht: l, ot: u, Dt: m, gt: _, yt: p, nt: f } = e, { scrollbars: g } = m ? {} : t, { slot: $ } = g || {}, w = /* @__PURE__ */ new Map(), A = (U) => Mn && new Mn({
    source: _,
    axis: U
  }), x = {
    x: A("x"),
    y: A("y")
  }, M = xo([d, l, u], () => f && p ? d : l, c, $), y = (U, j) => {
    if (j) {
      const Z = U ? yt : $t, { kt: ie, Mt: we } = j, Se = Vt(we)[Z], oe = Vt(ie)[Z];
      return Ln(0, 1, Se / oe || 0);
    }
    const G = U ? "x" : "y", { Rt: T, Vt: I } = n, K = I[G], Y = T[G];
    return Ln(0, 1, K / (K + Y) || 0);
  }, N = (U, j, G) => {
    const T = y(G, U);
    return 1 / T * (1 - T) * j;
  }, z = (U) => re(U, {
    clear: ["left"]
  }), R = (U) => {
    w.forEach((j, G) => {
      (U ? Xn(Ys(U), G) : !0) && (ce(j || [], (I) => {
        I && I.cancel();
      }), w.delete(G));
    });
  }, D = (U, j, G, T) => {
    const I = w.get(U) || [], K = I.find((Y) => Y && Y.timeline === j);
    K ? K.effect = new KeyframeEffect(U, G, {
      composite: T
    }) : w.set(U, Qe(I, [U.animate(G, {
      timeline: j,
      composite: T
    })]));
  }, L = (U, j, G) => {
    const T = G ? ts : io;
    ce(U, (I) => {
      T(I.Lt, j);
    });
  }, V = (U, j) => {
    ce(U, (G) => {
      const [T, I] = j(G);
      Rt(T, I);
    });
  }, E = (U, j) => {
    V(U, (G) => {
      const { Mt: T } = G;
      return [T, {
        [j ? yt : $t]: ws(y(j))
      }];
    });
  }, O = (U, j) => {
    const { Pt: G } = n, T = j ? "x" : "y", I = x[T], K = ks(G)[T], Y = (Z, ie) => $n(ws(N(Z, K ? ie : 1 - ie, j)), j);
    I ? ce(U, (Z) => {
      const { Mt: ie } = Z;
      D(ie, I, z({
        transform: [0, 1].map((we) => Y(Z, we))
      }));
    }) : V(U, (Z) => [Z.Mt, {
      transform: Y(Z, xs(G, Re(_))[T])
    }]);
  }, S = (U) => f && !p && xt(U) === u, k = [], B = [], F = [], se = (U, j, G) => {
    const T = Ws(G), I = T ? G : !0, K = T ? !G : !0;
    I && L(B, U, j), K && L(F, U, j);
  }, de = () => {
    E(B, !0), E(F);
  }, le = () => {
    O(B, !0), O(F);
  }, H = () => {
    if (f) {
      const { Rt: U, Pt: j } = n, G = ks(j), T = 0.5;
      if (x.x && x.y)
        ce(Qe(F, B), ({ Lt: I }) => {
          if (S(I)) {
            const K = (Y) => D(I, x[Y], z({
              transform: [0, G[Y] ? 1 : -1].map((Z) => $n(Hn(Z * (U[Y] - T)), Y === "x"))
            }), "add");
            K("x"), K("y");
          } else
            R(I);
        });
      else {
        const I = xs(j, Re(_)), K = (Y) => {
          const { Lt: Z } = Y, ie = S(Z) && Z, we = (Se, oe, $e) => {
            const Ee = oe * Se;
            return Hn($e ? Ee : -Ee);
          };
          return [ie, ie && {
            transform: $n({
              x: we(I.x, U.x, G.x),
              y: we(I.y, U.y, G.y)
            })
          }];
        };
        V(B, K), V(F, K);
      }
    }
  }, ee = (U) => {
    const G = wt(`${Fe} ${U ? Qr : Zr}`), T = wt($o), I = wt(rs), K = {
      Lt: G,
      kt: T,
      Mt: I
    };
    return ge(U ? B : F, K), ge(k, [Oe(G, T), Oe(T, I), J(dt, G), R, r(K, se, O, U)]), K;
  }, te = J(ee, !0), X = J(ee, !1), ue = () => (Oe(M, B[0].Lt), Oe(M, F[0].Lt), J(Ne, k));
  return te(), X(), [{
    Ut: de,
    Nt: le,
    qt: H,
    Bt: se,
    Ft: {
      V: x.x,
      jt: B,
      Xt: te,
      Yt: J(V, B)
    },
    Wt: {
      V: x.y,
      jt: F,
      Xt: X,
      Yt: J(V, F)
    }
  }, ue];
}, ba = (t, e, n, r) => (s, i, c, d) => {
  const { ht: l, ot: u, nt: m, gt: _, Jt: p, Ot: f } = e, { Lt: g, kt: $, Mt: w } = s, [A, x] = vt(333), [M, y] = vt(444), [N, z] = vt(), R = J(c, [s], d), D = (S) => {
    Ie(_.scrollBy) && _.scrollBy({
      behavior: "smooth",
      left: S.x,
      top: S.y
    });
  }, L = d ? yt : $t, V = () => {
    const S = "pointerup pointercancel lostpointercapture", k = `client${d ? "X" : "Y"}`, B = d ? "left" : "top", F = d ? "w" : "h", se = d ? "x" : "y", de = (le, H) => (ee) => {
      const { Rt: te } = n, X = Dt($)[F] - Dt(w)[F], U = H * ee / X * te[se];
      ze(_, {
        [se]: le + U
      });
    };
    return ve($, "pointerdown", (le) => {
      const H = bt(le.target, `.${rs}`) === w, ee = H ? w : $, te = t.scrollbars, { button: X, isPrimary: ue, pointerType: U } = le, { pointers: j } = te;
      if (X === 0 && ue && te[H ? "dragScroll" : "clickScroll"] && (j || []).includes(U)) {
        y();
        const T = !H && le.shiftKey, I = J(Vt, w), K = J(Vt, $), Y = (he, Ae) => (he || I())[B] - (Ae || K())[B], Z = Tn(Vt(_)[L]) / Dt(_)[F] || 1, ie = de(Re(_)[se], 1 / Z), we = le[k], Se = I(), oe = K(), $e = Se[L], Ee = Y(Se, oe) + $e / 2, He = we - oe[B], ke = H ? 0 : He - Ee, De = (he) => {
          Ne(Te), ee.releasePointerCapture(he.pointerId);
        }, be = () => f(Gr, !0), pe = be(), Te = [() => {
          const he = Re(_);
          pe();
          const Ae = Re(_), Ve = {
            x: Ae.x - he.x,
            y: Ae.y - he.y
          };
          (Qt(Ve.x) > 3 || Qt(Ve.y) > 3) && (be(), ze(_, he), D(Ve), M(pe));
        }, ve(p, S, De), ve(p, "selectstart", (he) => Nn(he), {
          H: !1
        }), ve($, S, De), ve($, "pointermove", (he) => {
          const Ae = he[k] - we;
          (H || T) && ie(ke + Ae);
        })];
        if (ee.setPointerCapture(le.pointerId), T)
          ie(ke);
        else if (!H) {
          const he = Ft(ma);
          he && ge(Te, he(ie, Y, ke, $e, He));
        }
      }
    });
  };
  let E = !0;
  const O = (S) => S.propertyName.indexOf(L) > -1;
  return J(Ne, [ve(w, "pointermove pointerleave", r), ve(g, "pointerenter", () => {
    i(Ds, !0);
  }), ve(g, "pointerleave pointercancel", () => {
    i(Ds, !1);
  }), !m && ve(g, "mousedown", () => {
    const S = Fn();
    (hs(S, ot) || hs(S, it) || S === document.body) && Zt(J(Un, u), 25);
  }), ve(g, "wheel", (S) => {
    const { deltaX: k, deltaY: B, deltaMode: F } = S;
    E && F === 0 && xt(g) === l && D({
      x: k,
      y: B
    }), E = !1, i(Os, !0), A(() => {
      E = !0, i(Os);
    }), Nn(S);
  }, {
    H: !1,
    I: !0
  }), ve(w, "transitionstart", (S) => {
    if (O(S)) {
      const k = () => {
        R(), N(k);
      };
      k();
    }
  }), ve(w, "transitionend transitioncancel", (S) => {
    O(S) && (z(), R());
  }), ve(g, "pointerdown", J(ve, p, "click", ho, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), V(), x, y, z]);
}, wa = (t, e, n, r, s, i) => {
  let c, d, l, u, m, _ = lt, p = 0;
  const f = (H) => H.pointerType === "mouse", [g, $] = vt(), [w, A] = vt(100), [x, M] = vt(100), [y, N] = vt(() => p), [z, R] = ga(t, s, r, ba(e, s, r, (H) => f(H) && F())), { ht: D, Kt: L, yt: V } = s, { Bt: E, Ut: O, Nt: S, qt: k } = z, B = (H, ee) => {
    if (N(), H)
      E(Ls);
    else {
      const te = J(E, Ls, !0);
      p > 0 && !ee ? y(te) : te();
    }
  }, F = () => {
    (l ? !c : !u) && (B(!0), w(() => {
      B(!1);
    }));
  }, se = (H) => {
    E(zn, H, !0), E(zn, H, !1);
  }, de = (H) => {
    f(H) && (c = l, l && B(!0));
  }, le = [N, A, M, $, () => _(), ve(D, "pointerover", de, {
    A: !0
  }), ve(D, "pointerenter", de), ve(D, "pointerleave", (H) => {
    f(H) && (c = !1, l && B(!1));
  }), ve(D, "pointermove", (H) => {
    f(H) && d && F();
  }), ve(L, "scroll", (H) => {
    g(() => {
      S(), F();
    }), i(H), k();
  })];
  return [() => J(Ne, ge(le, R())), ({ It: H, Tt: ee, Gt: te, Qt: X }) => {
    const { Zt: ue, tn: U, nn: j, sn: G } = X || {}, { Ct: T, dt: I } = te || {}, { ct: K } = n, { M: Y } = Ke(), { G: Z, en: ie } = r, [we, Se] = H("showNativeOverlaidScrollbars"), [oe, $e] = H("scrollbars.theme"), [Ee, He] = H("scrollbars.visibility"), [ke, De] = H("scrollbars.autoHide"), [be, pe] = H("scrollbars.autoHideSuspend"), [Te] = H("scrollbars.autoHideDelay"), [he, Ae] = H("scrollbars.dragScroll"), [Ve, ht] = H("scrollbars.clickScroll"), [Ht, pn] = H("overflow"), hn = I && !ee, gn = ie.x || ie.y, Ue = ue || U || G || T || ee, bn = j || He || pn, Bt = we && Y.x && Y.y, It = (nt, At, Mt) => {
      const Nt = nt.includes(kt) && (Ee === rt || Ee === "auto" && At === kt);
      return E(ea, Nt, Mt), Nt;
    };
    if (p = Te, hn && (be && gn ? (se(!1), _(), x(() => {
      _ = ve(L, "scroll", J(se, !0), {
        A: !0
      });
    })) : se(!0)), Se && E(Xr, Bt), $e && (E(m), E(oe, !0), m = oe), pe && !be && se(!0), De && (d = ke === "move", l = ke === "leave", u = ke === "never", B(u, !0)), Ae && E(sa, he), ht && E(na, Ve), bn) {
      const nt = It(Ht.x, Z.x, !0), At = It(Ht.y, Z.y, !1);
      E(ta, !(nt && At));
    }
    Ue && (O(), S(), k(), E(Vs, !ie.x, !0), E(Vs, !ie.y, !1), E(Jr, K && !V));
  }, {}, z];
}, ya = (t) => {
  const e = Ke(), { P: n, R: r } = e, { elements: s } = n(), { host: i, padding: c, viewport: d, content: l } = s, u = nn(t), m = u ? {} : t, { elements: _ } = m, { host: p, padding: f, viewport: g, content: $ } = _ || {}, w = u ? t : m.target, A = uo(w), x = sn(w, "textarea"), M = w.ownerDocument, y = M.documentElement, N = () => M.defaultView || Me, z = J(ra, [w]), R = J(xo, [w]), D = J(wt, ""), L = J(z, D, d), V = J(R, D, l), E = L(g), O = E === w, S = O && A, k = !O && V($), B = !O && E === k, F = S ? y : E, se = x ? z(D, i, p) : w, de = S ? F : se, le = !O && R(D, c, f), H = !B && k, ee = [H, F, le, de].map((oe) => nn(oe) && !xt(oe) && oe), te = (oe) => oe && Xn(ee, oe), X = te(F) ? w : F, ue = {
    vt: w,
    ht: de,
    ot: F,
    cn: le,
    bt: H,
    gt: S ? y : F,
    Kt: S ? M : F,
    rn: A ? y : X,
    Jt: M,
    wt: x,
    yt: A,
    Dt: u,
    nt: O,
    ln: N,
    St: (oe) => es(F, ot, oe),
    Ot: (oe, $e) => On(F, ot, oe, $e)
  }, { vt: U, ht: j, cn: G, ot: T, bt: I } = ue, K = [() => {
    Pe(j, [it, kn]), Pe(U, kn), A && Pe(y, [kn, it]);
  }], Y = x && te(j);
  let Z = x ? U : Rn([I, T, G, j, U].find((oe) => oe && !te(oe)));
  const ie = S ? U : I || T, we = J(Ne, K);
  return [ue, () => {
    const oe = N(), $e = Fn(), Ee = (pe) => {
      Oe(xt(pe), Rn(pe)), dt(pe);
    }, He = (pe) => ve(pe, "focusin focusout focus blur", ho, {
      I: !0,
      H: !1
    }), ke = "tabindex", De = Qn(T, ke), be = He($e);
    return Je(j, it, O ? "" : Ur), Je(G, qn, ""), Je(T, ot, ""), Je(I, Ms, ""), O || (Je(T, ke, De || "-1"), A && Je(y, As, "")), Y && (gs(U, j), ge(K, () => {
      gs(j, U), dt(j);
    })), Oe(ie, Z), Oe(j, G), Oe(G || j, !O && T), Oe(T, I), ge(K, [be, () => {
      const pe = Fn(), Te = te(T), he = Te && pe === T ? U : pe, Ae = He(he);
      Pe(G, qn), Pe(I, Ms), Pe(T, ot), A && Pe(y, As), De ? Je(T, ke, De) : Pe(T, ke), te(I) && Ee(I), Te && Ee(T), te(G) && Ee(G), Un(he), Ae();
    }]), r && !O && (Zn(T, ot, yo), ge(K, J(Pe, T, ot))), Un(!O && A && $e === U && oe.top === oe ? T : $e), be(), Z = 0, we;
  }, we];
}, $a = ({ bt: t }) => ({ Gt: e, an: n, Tt: r }) => {
  const { xt: s } = e || {}, { $t: i } = n;
  t && (s || r) && Rt(t, {
    [$t]: i && "100%"
  });
}, ka = ({ ht: t, cn: e, ot: n, nt: r }, s) => {
  const [i, c] = Le({
    i: Dr,
    o: ys()
  }, J(ys, t, "padding", ""));
  return ({ It: d, Gt: l, an: u, Tt: m }) => {
    let [_, p] = c(m);
    const { R: f } = Ke(), { ft: g, Ht: $, Ct: w } = l || {}, { ct: A } = u, [x, M] = d("paddingAbsolute");
    (g || p || (m || $)) && ([_, p] = i(m));
    const N = !r && (M || w || p);
    if (N) {
      const z = !x || !e && !f, R = _.r + _.l, D = _.t + _.b, L = {
        [to]: z && !A ? -R : 0,
        [no]: z ? -D : 0,
        [eo]: z && A ? -R : 0,
        top: z ? -_.t : 0,
        right: z ? A ? -_.r : "auto" : 0,
        left: z ? A ? "auto" : -_.l : 0,
        [yt]: z && `calc(100% + ${R}px)`
      }, V = {
        [Xs]: z ? _.t : 0,
        [Js]: z ? _.r : 0,
        [Zs]: z ? _.b : 0,
        [Qs]: z ? _.l : 0
      };
      Rt(e || n, L), Rt(n, V), re(s, {
        cn: _,
        un: !z,
        rt: e ? V : re({}, L, V)
      });
    }
    return {
      _n: N
    };
  };
}, xa = (t, e) => {
  const n = Ke(), { ht: r, cn: s, ot: i, nt: c, Kt: d, gt: l, yt: u, Ot: m, ln: _ } = t, { R: p } = n, f = u && c, g = J(Gs, 0), $ = ["display", "direction", "flexDirection", "writingMode"], w = {
    i: so,
    o: {
      w: 0,
      h: 0
    }
  }, A = {
    i: Yt,
    o: {}
  }, x = (H) => {
    m(wo, !f && H);
  }, M = (H, ee) => {
    const te = Me.devicePixelRatio % 1 !== 0 ? 1 : 0, X = {
      w: g(H.w - ee.w),
      h: g(H.h - ee.h)
    };
    return {
      w: X.w > te ? X.w : 0,
      h: X.h > te ? X.h : 0
    };
  }, [y, N] = Le(w, J(ss, i)), [z, R] = Le(w, J(Bn, i)), [D, L] = Le(w), [V] = Le(A), [E, O] = Le(w), [S] = Le(A), [k] = Le({
    i: (H, ee) => _n(H, ee, $),
    o: {}
  }, () => Br(i) ? pt(i, $) : {}), [B, F] = Le({
    i: (H, ee) => Yt(H.T, ee.T) && Yt(H.D, ee.D),
    o: go()
  }, () => {
    x(!0);
    const H = Re(l), ee = m(jr, !0), te = ve(d, kt, (G) => {
      const T = Re(l);
      G.isTrusted && T.x === H.x && T.y === H.y && po(G);
    }, {
      I: !0,
      A: !0
    });
    ze(l, {
      x: 0,
      y: 0
    }), ee();
    const X = Re(l), ue = Bn(l);
    ze(l, {
      x: ue.w,
      y: ue.h
    });
    const U = Re(l);
    ze(l, {
      x: U.x - X.x < 1 && -ue.w,
      y: U.y - X.y < 1 && -ue.h
    });
    const j = Re(l);
    return ze(l, H), Wn(() => te()), {
      T: X,
      D: j
    };
  }), se = Ft(Ao), de = (H, ee) => `${ee ? Pr : qr}${Mr(H)}`, le = (H) => {
    const ee = (X) => [rt, _t, kt].map((ue) => de(ue, X)), te = ee(!0).concat(ee()).join(" ");
    m(te), m(Ze(H).map((X) => de(H[X], X === "x")).join(" "), !0);
  };
  return ({ It: H, Gt: ee, an: te, Tt: X }, { _n: ue }) => {
    const { ft: U, Ht: j, Ct: G, dt: T, zt: I } = ee || {}, K = se && se.tt(t, e, te, n, H), { it: Y, ut: Z, _t: ie } = K || {}, [we, Se] = va(H, n), [oe, $e] = H("overflow"), Ee = on(oe.x), He = on(oe.y), ke = U || ue || j || G || I || Se;
    let De = N(X), be = R(X), pe = L(X), Te = O(X);
    if (Se && p && m(yo, !we), ke) {
      es(r, it, Jt) && x(!0);
      const [us] = Z ? Z() : [], [Ut] = De = y(X), [Pt] = be = z(X), qt = fo(i), zt = f && Hr(_()), Zo = {
        w: g(Pt.w + Ut.w),
        h: g(Pt.h + Ut.h)
      }, _s = {
        w: g((zt ? zt.w : qt.w + g(qt.w - Pt.w)) + Ut.w),
        h: g((zt ? zt.h : qt.h + g(qt.h - Pt.h)) + Ut.h)
      };
      us && us(), Te = E(_s), pe = D(M(Zo, _s), X);
    }
    const [he, Ae] = Te, [Ve, ht] = pe, [Ht, pn] = be, [hn, gn] = De, [Ue, bn] = V({
      x: Ve.w > 0,
      y: Ve.h > 0
    }), Bt = Ee && He && (Ue.x || Ue.y) || Ee && Ue.x && !Ue.y || He && Ue.y && !Ue.x, It = ue || G || I || gn || pn || Ae || ht || $e || Se || ke, nt = fa(Ue, oe), [At, Mt] = S(nt.G), [, Nt] = k(X), ds = G || T || Nt || bn || X, [Jo, Qo] = ds ? B(X) : F();
    return It && (Mt && le(nt.G), ie && Y && Rt(i, ie(nt, te, Y(nt, Ht, hn)))), x(!1), On(r, it, Jt, Bt), On(s, qn, Jt, Bt), re(e, {
      G: At,
      Vt: {
        x: he.w,
        y: he.h
      },
      Rt: {
        x: Ve.w,
        y: Ve.h
      },
      en: Ue,
      Pt: Ir(Jo, Ve)
    }), {
      nn: Mt,
      Zt: Ae,
      tn: ht,
      sn: Qo || ht,
      dn: ds
    };
  };
}, Sa = (t) => {
  const [e, n, r] = ya(t), s = {
    cn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    un: !1,
    rt: {
      [to]: 0,
      [no]: 0,
      [eo]: 0,
      [Xs]: 0,
      [Js]: 0,
      [Zs]: 0,
      [Qs]: 0
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
      x: _t,
      y: _t
    },
    en: {
      x: !1,
      y: !1
    },
    Pt: go()
  }, { vt: i, gt: c, nt: d } = e, { R: l, M: u } = Ke(), m = !l && (u.x || u.y), _ = [$a(e), ka(e, s), xa(e, s)];
  return [n, (p) => {
    const f = {}, $ = m && Re(c);
    return ce(_, (w) => {
      re(f, w(p, f) || {});
    }), ze(c, $), !d && ze(i, 0), f;
  }, s, e, r];
}, Ca = (t, e, n, r, s) => {
  const i = Ts(e, {}), [c, d, l, u, m] = Sa(t), [_, p, f] = ha(u, l, i, (M) => {
    x({}, M);
  }), [g, $, , w] = wa(t, e, f, l, u, s), A = (M) => Ze(M).some((y) => !!M[y]), x = (M, y) => {
    if (n())
      return !1;
    const { fn: N, Tt: z, At: R, pn: D } = M, L = N || {}, V = !!z, E = {
      It: Ts(e, L, V),
      fn: L,
      Tt: V
    };
    if (D)
      return $(E), !1;
    const O = y || p(re({}, E, {
      At: R
    })), S = d(re({}, E, {
      an: f,
      Gt: O
    }));
    $(re({}, E, {
      Gt: O,
      Qt: S
    }));
    const k = A(O), B = A(S), F = k || B || !Jn(L) || V;
    return F && r(M, {
      Gt: O,
      Qt: S
    }), F;
  };
  return [() => {
    const { rn: M, gt: y } = u, N = Re(M), z = [_(), c(), g()];
    return ze(y, N), J(Ne, z);
  }, x, () => ({
    vn: f,
    hn: l
  }), {
    gn: u,
    bn: w
  }, m];
}, et = (t, e, n) => {
  const { N: r } = Ke(), s = nn(t), i = s ? t : t.target, c = So(i);
  if (e && !c) {
    let d = !1;
    const l = [], u = {}, m = (V) => {
      const E = ro(V), O = Ft(ua);
      return O ? O(E, !0) : E;
    }, _ = re({}, r(), m(e)), [p, f, g] = Pn(), [$, w, A] = Pn(n), x = (V, E) => {
      A(V, E), g(V, E);
    }, [M, y, N, z, R] = Ca(t, _, () => d, ({ fn: V, Tt: E }, { Gt: O, Qt: S }) => {
      const { ft: k, Ct: B, xt: F, Ht: se, Et: de, dt: le } = O, { Zt: H, tn: ee, nn: te, sn: X } = S;
      x("updated", [L, {
        updateHints: {
          sizeChanged: !!k,
          directionChanged: !!B,
          heightIntrinsicChanged: !!F,
          overflowEdgeChanged: !!H,
          overflowAmountChanged: !!ee,
          overflowStyleChanged: !!te,
          scrollCoordinatesChanged: !!X,
          contentMutation: !!se,
          hostMutation: !!de,
          appear: !!le
        },
        changedOptions: V || {},
        force: !!E
      }]);
    }, (V) => x("scroll", [L, V])), D = (V) => {
      ia(i), Ne(l), d = !0, x("destroyed", [L, V]), f(), w();
    }, L = {
      options(V, E) {
        if (V) {
          const O = E ? r() : {}, S = bo(_, re(O, m(V)));
          Jn(S) || (re(_, S), y({
            fn: S
          }));
        }
        return re({}, _);
      },
      on: $,
      off: (V, E) => {
        V && E && w(V, E);
      },
      state() {
        const { vn: V, hn: E } = N(), { ct: O } = V, { Vt: S, Rt: k, G: B, en: F, cn: se, un: de, Pt: le } = E;
        return re({}, {
          overflowEdge: S,
          overflowAmount: k,
          overflowStyle: B,
          hasOverflow: F,
          scrollCoordinates: {
            start: le.T,
            end: le.D
          },
          padding: se,
          paddingAbsolute: de,
          directionRTL: O,
          destroyed: d
        });
      },
      elements() {
        const { vt: V, ht: E, cn: O, ot: S, bt: k, gt: B, Kt: F } = z.gn, { Ft: se, Wt: de } = z.bn, le = (ee) => {
          const { Mt: te, kt: X, Lt: ue } = ee;
          return {
            scrollbar: ue,
            track: X,
            handle: te
          };
        }, H = (ee) => {
          const { jt: te, Xt: X } = ee, ue = le(te[0]);
          return re({}, ue, {
            clone: () => {
              const U = le(X());
              return y({
                pn: !0
              }), U;
            }
          });
        };
        return re({}, {
          target: V,
          host: E,
          padding: O || S,
          viewport: S,
          content: k || S,
          scrollOffsetElement: B,
          scrollEventElement: F,
          scrollbarHorizontal: H(se),
          scrollbarVertical: H(de)
        });
      },
      update: (V) => y({
        Tt: V,
        At: !0
      }),
      destroy: J(D, !1),
      plugin: (V) => u[Ze(V)[0]]
    };
    return ge(l, [R]), la(i, L), To(Co, et, [L, p, u]), aa(z.gn.yt, !s && t.cancel) ? (D(!0), L) : (ge(l, M()), x("initialized", [L]), L.update(!0), L);
  }
  return c;
};
et.plugin = (t) => {
  const e = je(t), n = e ? t : [t], r = n.map((s) => To(s, et)[0]);
  return da(n), e ? r : r[0];
};
et.valid = (t) => {
  const e = t && t.elements, n = Ie(e) && e();
  return tn(n) && !!So(n.target);
};
et.env = () => {
  const { k: t, M: e, R: n, V: r, B: s, F: i, P: c, U: d, N: l, q: u } = Ke();
  return re({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: r,
    staticDefaultInitialization: s,
    staticDefaultOptions: i,
    getDefaultInitialization: c,
    setDefaultInitialization: d,
    getDefaultOptions: l,
    setDefaultOptions: u
  });
};
function Ea() {
  let t;
  const e = C(null), n = Math.floor(Math.random() * 2 ** 32), r = C(!1), s = C([]), i = () => s.value, c = () => t.getSelection(), d = () => s.value.length, l = () => t.clearSelection(!0), u = C(), m = C(null), _ = C(null), p = C(null);
  function f() {
    t = new ur({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: y, event: N, isDragging: z }) => {
      if (z)
        t.Interaction._reset(N);
      else {
        r.value = !1;
        const R = e.value.offsetWidth - N.offsetX, D = e.value.offsetHeight - N.offsetY;
        R < 15 && D < 15 && t.Interaction._reset(N), N.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(N);
      }
    }), document.addEventListener("dragleave", (y) => {
      !y.buttons && r.value && (r.value = !1);
    });
  }
  const g = () => ft(() => {
    t.addSelection(
      t.getSelectables()
    ), $();
  }), $ = () => {
    s.value = t.getSelection().map((y) => JSON.parse(y.dataset.item)), u.value(s.value);
  }, w = () => ft(() => {
    const y = i().map((N) => N.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((N) => y.includes(JSON.parse(N.dataset.item).path))
    ), $(), x();
  }), A = (y) => {
    u.value = y, t.subscribe("DS:end", ({ items: N, event: z, isDragging: R }) => {
      s.value = N.map((D) => JSON.parse(D.dataset.item)), y(N.map((D) => JSON.parse(D.dataset.item)));
    });
  }, x = () => {
    m.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (_.value.style.height = e.value.scrollHeight + "px", _.value.style.display = "block") : (_.value.style.height = "100%", _.value.style.display = "none"));
  }, M = (y) => {
    if (!m.value)
      return;
    const { scrollOffsetElement: N } = m.value.elements();
    N.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ce(() => {
    et(p.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: et
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (y) => {
        m.value = y;
      },
      scroll: (y, N) => {
        const { scrollOffsetElement: z } = y.elements();
        e.value.scrollTo({
          top: z.scrollTop,
          left: 0
        });
      }
    }), f(), x(), new ResizeObserver(x).observe(e.value), e.value.addEventListener("scroll", M), t.subscribe("DS:scroll", ({ isDragging: y }) => y || M());
  }), Kn(() => {
    t && t.stop();
  }), Bs(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: r,
    scrollBar: _,
    scrollBarContainer: p,
    getSelected: i,
    getSelection: c,
    selectAll: g,
    clearSelection: l,
    refreshSelection: w,
    getCount: d,
    onSelect: A
  };
}
function Ta(t, e) {
  const n = C(t), r = C(e), s = C([]), i = C([]), c = C([]), d = C(!1), l = C(5);
  let u = !1, m = !1;
  const _ = St({
    adapter: n,
    storages: [],
    dirname: r,
    files: []
  });
  function p() {
    let x = [], M = [], y = r.value ?? n.value + "://";
    y.length === 0 && (s.value = []), y.replace(n.value + "://", "").split("/").forEach(function(R) {
      x.push(R), x.join("/") !== "" && M.push({
        basename: R,
        name: R,
        path: n.value + "://" + x.join("/"),
        type: "dir"
      });
    }), i.value = M;
    const [N, z] = g(M, l.value);
    c.value = z, s.value = N;
  }
  function f(x) {
    l.value = x, p();
  }
  function g(x, M) {
    return x.length > M ? [x.slice(-M), x.slice(0, -M)] : [x, []];
  }
  function $(x = null) {
    d.value = x ?? !d.value;
  }
  function w() {
    return s.value && s.value.length && !m;
  }
  const A = ct(() => {
    var x;
    return ((x = s.value[s.value.length - 2]) == null ? void 0 : x.path) ?? n.value + "://";
  });
  return Ce(() => {
  }), Be(r, p), Ce(p), {
    adapter: n,
    path: r,
    loading: u,
    searchMode: m,
    data: _,
    breadcrumbs: s,
    breadcrumbItems: i,
    limitBreadcrumbItems: f,
    hiddenBreadcrumbs: c,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: $,
    isGoUpAvailable: w,
    parentFolderPath: A
  };
}
const Aa = (t, e) => {
  const n = gr(t.id), r = dr(), s = n.getStore("metricUnits", !1), i = xr(n, t.theme), c = e.i18n, d = t.locale ?? e.locale, l = n.getStore("adapter"), u = (p) => Array.isArray(p) ? p : yr, m = n.getStore("persist-path", t.persist), _ = m ? n.getStore("path", t.path) : t.path;
  return St({
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
    i18n: wr(n, d, r, c),
    // modal state
    modal: Sr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: ct(() => Ea()),
    // http object
    requester: hr(t.request),
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
    theme: i,
    // unit state - for example: GB or GiB
    metricUnits: s,
    // human readable file sizes
    filesize: s ? qs : Ps,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: m,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: Ta(l, _)
  });
}, Ma = /* @__PURE__ */ a("div", { class: "vuefinder__modal-layout__overlay" }, null, -1), Da = { class: "vuefinder__modal-layout__container" }, Va = { class: "vuefinder__modal-layout__content" }, La = { class: "vuefinder__modal-layout__footer" }, We = {
  __name: "ModalLayout",
  setup(t) {
    const e = C(null), n = ae("ServiceContainer");
    return Ce(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), ft(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const s = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (r, s) => (v(), h("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = Ct((i) => o(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      Ma,
      a("div", Da, [
        a("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = at((i) => o(n).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            a("div", Va, [
              Lt(r.$slots, "default")
            ]),
            a("div", La, [
              Lt(r.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Oa = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, s] of e)
    n[r] = s;
  return n;
}, Ra = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const r = ae("ServiceContainer"), s = C(!1), { t: i } = r.i18n;
    let c = null;
    const d = () => {
      clearTimeout(c), s.value = !0, c = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return Ce(() => {
      r.emitter.on(t.on, d);
    }), Kn(() => {
      clearTimeout(c);
    }), {
      shown: s,
      t: i
    };
  }
}, Fa = { key: 1 };
function Ha(t, e, n, r, s, i) {
  return v(), h("div", {
    class: _e(["vuefinder__action-message", { "vuefinder__action-message--hidden": !r.shown }])
  }, [
    t.$slots.default ? Lt(t.$slots, "default", { key: 0 }) : (v(), h("span", Fa, b(r.t("Saved.")), 1))
  ], 2);
}
const gt = /* @__PURE__ */ Oa(Ra, [["render", Ha]]), Ba = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, Ia = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
}, null, -1), Na = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
}, null, -1), Ua = [
  Ia,
  Na
];
function Pa(t, e) {
  return v(), h("svg", Ba, [...Ua]);
}
const qa = { render: Pa }, za = { class: "vuefinder__modal-header" }, Ga = { class: "vuefinder__modal-header__icon-container" }, ja = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, tt = {
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
    return (e, n) => (v(), h("div", za, [
      a("div", Ga, [
        (v(), W(Is(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      a("h3", ja, b(t.title), 1)
    ]));
  }
}, Ka = { class: "vuefinder__about-modal__content" }, Wa = { class: "vuefinder__about-modal__main" }, Ya = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Xa = ["onClick", "aria-current"], Ja = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Qa = { class: "vuefinder__about-modal__description" }, Za = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, el = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, tl = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, nl = { class: "vuefinder__about-modal__description" }, sl = { class: "vuefinder__about-modal__settings" }, ol = { class: "vuefinder__about-modal__setting flex" }, rl = { class: "vuefinder__about-modal__setting-input" }, al = { class: "vuefinder__about-modal__setting-label" }, ll = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, il = { class: "vuefinder__about-modal__setting flex" }, cl = { class: "vuefinder__about-modal__setting-input" }, dl = { class: "vuefinder__about-modal__setting-label" }, ul = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, _l = { class: "vuefinder__about-modal__setting flex" }, vl = { class: "vuefinder__about-modal__setting-input" }, fl = { class: "vuefinder__about-modal__setting-label" }, ml = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, pl = { class: "vuefinder__about-modal__setting flex" }, hl = { class: "vuefinder__about-modal__setting-input" }, gl = { class: "vuefinder__about-modal__setting-label" }, bl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, wl = { class: "vuefinder__about-modal__setting" }, yl = { class: "vuefinder__about-modal__setting-input" }, $l = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, kl = { class: "vuefinder__about-modal__setting-label" }, xl = ["label"], Sl = ["value"], Cl = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, El = { class: "vuefinder__about-modal__setting-input" }, Tl = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Al = { class: "vuefinder__about-modal__setting-label" }, Ml = ["label"], Dl = ["value"], Vl = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Ll = { class: "vuefinder__about-modal__shortcuts" }, Ol = { class: "vuefinder__about-modal__shortcut" }, Rl = /* @__PURE__ */ a("kbd", null, "F2", -1), Fl = { class: "vuefinder__about-modal__shortcut" }, Hl = /* @__PURE__ */ a("kbd", null, "F5", -1), Bl = { class: "vuefinder__about-modal__shortcut" }, Il = /* @__PURE__ */ a("kbd", null, "Del", -1), Nl = { class: "vuefinder__about-modal__shortcut" }, Ul = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Esc")
], -1), Pl = { class: "vuefinder__about-modal__shortcut" }, ql = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, "A")
], -1), zl = { class: "vuefinder__about-modal__shortcut" }, Gl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, "F")
], -1), jl = { class: "vuefinder__about-modal__shortcut" }, Kl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, "E")
], -1), Wl = { class: "vuefinder__about-modal__shortcut" }, Yl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, ",")
], -1), Xl = { class: "vuefinder__about-modal__shortcut" }, Jl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, "Enter")
], -1), Ql = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Zl = { class: "vuefinder__about-modal__description" }, Do = {
  __name: "ModalAbout",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: n, clearStore: r } = e.storage, { t: s } = e.i18n, i = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = ct(() => [
      { name: s("About"), key: i.ABOUT },
      { name: s("Settings"), key: i.SETTINGS },
      { name: s("Shortcuts"), key: i.SHORTCUTS },
      { name: s("Reset"), key: i.RESET }
    ]), d = C("about"), l = async () => {
      r(), location.reload();
    }, u = (x) => {
      e.theme.set(x), e.emitter.emit("vf-theme-saved");
    }, m = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? qs : Ps, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, _ = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, f = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: g } = ae("VueFinderOptions"), w = Object.fromEntries(
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
      }).filter(([x]) => Object.keys(g).includes(x))
    ), A = ct(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (x, M) => (v(), W(We, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: M[7] || (M[7] = (y) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(s)("Close")), 1)
      ]),
      default: ne(() => [
        a("div", Ka, [
          q(tt, {
            icon: o(qa),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          a("div", Wa, [
            a("div", null, [
              a("div", null, [
                a("nav", Ya, [
                  (v(!0), h(ye, null, xe(c.value, (y) => (v(), h("button", {
                    key: y.name,
                    onClick: (N) => d.value = y.key,
                    class: _e([y.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": y.current ? "page" : void 0
                  }, b(y.name), 11, Xa))), 128))
                ])
              ])
            ]),
            d.value === i.ABOUT ? (v(), h("div", Ja, [
              a("div", Qa, b(o(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              a("a", Za, b(o(s)("Project home")), 1),
              a("a", el, b(o(s)("Follow on GitHub")), 1)
            ])) : P("", !0),
            d.value === i.SETTINGS ? (v(), h("div", tl, [
              a("div", nl, b(o(s)("Customize your experience with the following settings")), 1),
              a("div", sl, [
                a("fieldset", null, [
                  a("div", ol, [
                    a("div", rl, [
                      me(a("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": M[0] || (M[0] = (y) => o(e).metricUnits = y),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Gt, o(e).metricUnits]
                      ])
                    ]),
                    a("div", al, [
                      a("label", ll, [
                        Q(b(o(s)("Use Metric Units")) + " ", 1),
                        q(gt, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: ne(() => [
                            Q(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", il, [
                    a("div", cl, [
                      me(a("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": M[1] || (M[1] = (y) => o(e).compactListView = y),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Gt, o(e).compactListView]
                      ])
                    ]),
                    a("div", dl, [
                      a("label", ul, [
                        Q(b(o(s)("Compact list view")) + " ", 1),
                        q(gt, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: ne(() => [
                            Q(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", _l, [
                    a("div", vl, [
                      me(a("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": M[2] || (M[2] = (y) => o(e).persist = y),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Gt, o(e).persist]
                      ])
                    ]),
                    a("div", fl, [
                      a("label", ml, [
                        Q(b(o(s)("Persist path on reload")) + " ", 1),
                        q(gt, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: ne(() => [
                            Q(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", pl, [
                    a("div", hl, [
                      me(a("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": M[3] || (M[3] = (y) => o(e).showThumbnails = y),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Gt, o(e).showThumbnails]
                      ])
                    ]),
                    a("div", gl, [
                      a("label", bl, [
                        Q(b(o(s)("Show thumbnails")) + " ", 1),
                        q(gt, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: ne(() => [
                            Q(b(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", wl, [
                    a("div", yl, [
                      a("label", $l, b(o(s)("Theme")), 1)
                    ]),
                    a("div", kl, [
                      me(a("select", {
                        id: "theme",
                        "onUpdate:modelValue": M[4] || (M[4] = (y) => o(e).theme.value = y),
                        onChange: M[5] || (M[5] = (y) => u(y.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: o(s)("Theme")
                        }, [
                          (v(!0), h(ye, null, xe(A.value, (y, N) => (v(), h("option", { value: N }, b(y), 9, Sl))), 256))
                        ], 8, xl)
                      ], 544), [
                        [En, o(e).theme.value]
                      ]),
                      q(gt, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: ne(() => [
                          Q(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  o(e).features.includes(o(fe).LANGUAGE) && Object.keys(o(w)).length > 1 ? (v(), h("div", Cl, [
                    a("div", El, [
                      a("label", Tl, b(o(s)("Language")), 1)
                    ]),
                    a("div", Al, [
                      me(a("select", {
                        id: "language",
                        "onUpdate:modelValue": M[6] || (M[6] = (y) => o(e).i18n.locale = y),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: o(s)("Language")
                        }, [
                          (v(!0), h(ye, null, xe(o(w), (y, N) => (v(), h("option", { value: N }, b(y), 9, Dl))), 256))
                        ], 8, Ml)
                      ], 512), [
                        [En, o(e).i18n.locale]
                      ]),
                      q(gt, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: ne(() => [
                          Q(b(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : P("", !0)
                ])
              ])
            ])) : P("", !0),
            d.value === i.SHORTCUTS ? (v(), h("div", Vl, [
              a("div", Ll, [
                a("div", Ol, [
                  a("div", null, b(o(s)("Rename")), 1),
                  Rl
                ]),
                a("div", Fl, [
                  a("div", null, b(o(s)("Refresh")), 1),
                  Hl
                ]),
                a("div", Bl, [
                  Q(b(o(s)("Delete")) + " ", 1),
                  Il
                ]),
                a("div", Nl, [
                  Q(b(o(s)("Escape")) + " ", 1),
                  Ul
                ]),
                a("div", Pl, [
                  Q(b(o(s)("Select All")) + " ", 1),
                  ql
                ]),
                a("div", zl, [
                  Q(b(o(s)("Search")) + " ", 1),
                  Gl
                ]),
                a("div", jl, [
                  Q(b(o(s)("Toggle Sidebar")) + " ", 1),
                  Kl
                ]),
                a("div", Wl, [
                  Q(b(o(s)("Open Settings")) + " ", 1),
                  Yl
                ]),
                a("div", Xl, [
                  Q(b(o(s)("Toggle Full Screen")) + " ", 1),
                  Jl
                ])
              ])
            ])) : P("", !0),
            d.value === i.RESET ? (v(), h("div", Ql, [
              a("div", Zl, b(o(s)("Reset all settings to default")), 1),
              a("button", {
                onClick: l,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(s)("Reset Settings")), 1)
            ])) : P("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ei = ["title"], ti = /* @__PURE__ */ a("svg", {
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
], -1), ni = [
  ti
], Ye = {
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
    const n = e, r = ae("ServiceContainer"), { t: s } = r.i18n, i = C(!1), c = C(null), d = C((u = c.value) == null ? void 0 : u.strMessage);
    Be(d, () => i.value = !1);
    const l = () => {
      n("hidden"), i.value = !0;
    };
    return (m, _) => (v(), h("div", null, [
      i.value ? P("", !0) : (v(), h("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: _e(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Lt(m.$slots, "default"),
        a("div", {
          class: "vuefinder__message__close",
          onClick: l,
          title: o(s)("Close")
        }, ni, 8, ei)
      ], 2))
    ]));
  }
}, si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, oi = /* @__PURE__ */ a("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), ri = [
  oi
];
function ai(t, e) {
  return v(), h("svg", si, [...ri]);
}
const Vo = { render: ai }, li = { class: "vuefinder__delete-modal__content" }, ii = { class: "vuefinder__delete-modal__form" }, ci = { class: "vuefinder__delete-modal__description" }, di = { class: "vuefinder__delete-modal__files vf-scrollbar" }, ui = { class: "vuefinder__delete-modal__file" }, _i = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vi = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), fi = [
  vi
], mi = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pi = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), hi = [
  pi
], gi = { class: "vuefinder__delete-modal__file-name" }, bi = { class: "vuefinder__delete-modal__warning" }, ls = {
  __name: "ModalDelete",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, r = C(e.modal.data.items), s = C(""), i = () => {
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
    return (c, d) => (v(), W(We, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-danger"
        }, b(o(n)("Yes, Delete!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        a("div", bi, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: ne(() => [
        a("div", null, [
          q(tt, {
            icon: o(Vo),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          a("div", li, [
            a("div", ii, [
              a("p", ci, b(o(n)("Are you sure you want to delete these files?")), 1),
              a("div", di, [
                (v(!0), h(ye, null, xe(r.value, (l) => (v(), h("p", ui, [
                  l.type === "dir" ? (v(), h("svg", _i, fi)) : (v(), h("svg", mi, hi)),
                  a("span", gi, b(l.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (v(), W(Ye, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => s.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  Q(b(s.value), 1)
                ]),
                _: 1
              })) : P("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, yi = /* @__PURE__ */ a("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), $i = [
  yi
];
function ki(t, e) {
  return v(), h("svg", wi, [...$i]);
}
const Lo = { render: ki }, xi = { class: "vuefinder__rename-modal__content" }, Si = { class: "vuefinder__rename-modal__item" }, Ci = { class: "vuefinder__rename-modal__item-info" }, Ei = {
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
}, null, -1), Ai = [
  Ti
], Mi = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Di = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Vi = [
  Di
], Li = { class: "vuefinder__rename-modal__item-name" }, is = {
  __name: "ModalRename",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, r = C(e.modal.data.items[0]), s = C(e.modal.data.items[0].basename), i = C(""), c = () => {
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
          i.value = n(d.message);
        }
      });
    };
    return (d, l) => (v(), W(We, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Rename")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: ne(() => [
        a("div", null, [
          q(tt, {
            icon: o(Lo),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          a("div", xi, [
            a("div", Si, [
              a("p", Ci, [
                r.value.type === "dir" ? (v(), h("svg", Ei, Ai)) : (v(), h("svg", Mi, Vi)),
                a("span", Li, b(r.value.basename), 1)
              ]),
              me(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => s.value = u),
                onKeyup: Ct(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Et, s.value]
              ]),
              i.value.length ? (v(), W(Ye, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => i.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  Q(b(i.value), 1)
                ]),
                _: 1
              })) : P("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Xe = {
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
function Oi(t) {
  const e = (n) => {
    n.code === Xe.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Xe.F2 && t.features.includes(fe.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(is, { items: t.dragSelect.getSelected() })), n.code === Xe.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Xe.DELETE && (!t.dragSelect.getCount() || t.modal.open(ls, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Xe.BACKSLASH && t.modal.open(Do), n.metaKey && n.code === Xe.KEY_F && t.features.includes(fe.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Xe.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Xe.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Xe.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
  };
  Ce(() => {
    t.root.addEventListener("keydown", e);
  }), Kn(() => {
    t.root.removeEventListener("keydown", e);
  });
}
const Ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Fi = /* @__PURE__ */ a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Hi = [
  Fi
];
function Bi(t, e) {
  return v(), h("svg", Ri, [...Hi]);
}
const Oo = { render: Bi }, Ii = { class: "vuefinder__new-folder-modal__content" }, Ni = { class: "vuefinder__new-folder-modal__form" }, Ui = { class: "vuefinder__new-folder-modal__description" }, Pi = ["placeholder"], Ro = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, r = C(""), s = C(""), i = () => {
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
    return (c, d) => (v(), W(We, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: ne(() => [
        a("div", null, [
          q(tt, {
            icon: o(Oo),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          a("div", Ii, [
            a("div", Ni, [
              a("p", Ui, b(o(n)("Create a new folder")), 1),
              me(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Ct(i, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text"
              }, null, 40, Pi), [
                [Et, r.value]
              ]),
              s.value.length ? (v(), W(Ye, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => s.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  Q(b(s.value), 1)
                ]),
                _: 1
              })) : P("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, qi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, zi = /* @__PURE__ */ a("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Gi = [
  zi
];
function ji(t, e) {
  return v(), h("svg", qi, [...Gi]);
}
const Fo = { render: ji }, Ki = { class: "vuefinder__new-file-modal__content" }, Wi = { class: "vuefinder__new-file-modal__form" }, Yi = { class: "vuefinder__new-file-modal__description" }, Xi = ["placeholder"], Ji = {
  __name: "ModalNewFile",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, r = C(""), s = C(""), i = () => {
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
    return (c, d) => (v(), W(We, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: ne(() => [
        a("div", null, [
          q(tt, {
            icon: o(Fo),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          a("div", Ki, [
            a("div", Wi, [
              a("p", Yi, b(o(n)("Create a new file")), 1),
              me(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Ct(i, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, Xi), [
                [Et, r.value]
              ]),
              s.value.length ? (v(), W(Ye, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => s.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  Q(b(s.value), 1)
                ]),
                _: 1
              })) : P("", !0)
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
const Qi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Zi = /* @__PURE__ */ a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), ec = [
  Zi
];
function tc(t, e) {
  return v(), h("svg", Qi, [...ec]);
}
const Ho = { render: tc }, nc = { class: "vuefinder__upload-modal__content" }, sc = {
  key: 0,
  class: "pointer-events-none"
}, oc = {
  key: 1,
  class: "pointer-events-none"
}, rc = ["disabled"], ac = ["disabled"], lc = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, ic = ["textContent"], cc = { class: "vuefinder__upload-modal__file-info" }, dc = { class: "vuefinder__upload-modal__file-name hidden md:block" }, uc = { class: "vuefinder__upload-modal__file-name md:hidden" }, _c = {
  key: 0,
  class: "ml-auto"
}, vc = ["title", "disabled", "onClick"], fc = /* @__PURE__ */ a("svg", {
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
], -1), mc = [
  fc
], pc = {
  key: 0,
  class: "py-2"
}, hc = ["disabled"], gc = {
  __name: "ModalUpload",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, r = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, i = C({ QUEUE_ENTRY_STATUS: s }), c = C(null), d = C(null), l = C(null), u = C(null), m = C(null), _ = C(null), p = C([]), f = C(""), g = C(!1), $ = C(!1);
    let w;
    function A(O) {
      return p.value.findIndex((S) => S.id === O);
    }
    function x(O, S = null) {
      S = S ?? (O.webkitRelativePath || O.name), w.addFile({
        name: S,
        type: O.type,
        data: O,
        source: "Local"
      });
    }
    function M(O) {
      switch (O.status) {
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
    const y = (O) => {
      switch (O.status) {
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
    function N() {
      u.value.click();
    }
    function z() {
      if (!g.value) {
        if (!p.value.filter((O) => O.status !== s.DONE).length) {
          f.value = n("Please select file to upload first.");
          return;
        }
        f.value = "", w.retryAll(), w.upload();
      }
    }
    function R() {
      w.cancelAll({ reason: "user" }), p.value.forEach((O) => {
        O.status !== s.DONE && (O.status = s.CANCELED, O.statusName = n("Canceled"));
      }), g.value = !1;
    }
    function D(O) {
      g.value || (w.removeFile(O.id, "removed-by-user"), p.value.splice(A(O.id), 1));
    }
    function L(O) {
      if (!g.value) {
        if (w.cancelAll({ reason: "user" }), O) {
          const S = [];
          p.value.forEach((k) => {
            k.status !== s.DONE && S.push(k);
          }), p.value = [], S.forEach((k) => {
            x(k.originalFile, k.name);
          });
          return;
        }
        p.value.splice(0);
      }
    }
    function V() {
      e.modal.close();
    }
    function E() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Ce(async () => {
      w = new _r({
        debug: e.debug,
        restrictions: {
          maxFileSize: kr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(k, B) {
          if (B[k.id] != null) {
            const se = A(k.id);
            p.value[se].status === s.PENDING && (f.value = w.i18n("noDuplicates", { fileName: k.name })), p.value = p.value.filter((de) => de.id !== k.id);
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
      }), w.use(vr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(k, B) {
          let F;
          try {
            F = JSON.parse(k).message;
          } catch {
            F = n("Cannot parse server response.");
          }
          return new Error(F);
        }
      }), w.on("restriction-failed", (k, B) => {
        const F = p.value[A(k.id)];
        D(F), f.value = B.message;
      }), w.on("upload", () => {
        const k = E();
        w.setMeta({ ...k.body });
        const B = w.getPlugin("XHRUpload");
        B.opts.method = k.method, B.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), B.opts.headers = k.headers, delete k.headers["Content-Type"], g.value = !0, p.value.forEach((F) => {
          F.status !== s.DONE && (F.percent = null, F.status = s.UPLOADING, F.statusName = n("Pending upload"));
        });
      }), w.on("upload-progress", (k, B) => {
        const F = Math.floor(B.bytesUploaded / B.bytesTotal * 100);
        p.value[A(k.id)].percent = `${F}%`;
      }), w.on("upload-success", (k) => {
        const B = p.value[A(k.id)];
        B.status = s.DONE, B.statusName = n("Done");
      }), w.on("upload-error", (k, B) => {
        const F = p.value[A(k.id)];
        F.percent = null, F.status = s.ERROR, B.isNetworkError ? F.statusName = n("Network Error, Unable establish connection to the server or interrupted.") : F.statusName = B ? B.message : n("Unknown Error");
      }), w.on("error", (k) => {
        f.value = k.message, g.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), w.on("complete", () => {
        g.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), m.value.addEventListener("click", () => {
        l.value.click();
      }), _.value.addEventListener("dragover", (k) => {
        k.preventDefault(), $.value = !0;
      }), _.value.addEventListener("dragleave", (k) => {
        k.preventDefault(), $.value = !1;
      });
      function O(k, B) {
        B.isFile && B.file((F) => k(B, F)), B.isDirectory && B.createReader().readEntries((F) => {
          F.forEach((se) => {
            O(k, se);
          });
        });
      }
      _.value.addEventListener("drop", (k) => {
        k.preventDefault(), $.value = !1;
        const B = /^[/\\](.+)/;
        [...k.dataTransfer.items].forEach((F) => {
          F.kind === "file" && O((se, de) => {
            const le = B.exec(se.fullPath);
            x(de, le[1]);
          }, F.webkitGetAsEntry());
        });
      });
      const S = ({ target: k }) => {
        const B = k.files;
        for (const F of B)
          x(F);
        k.value = "";
      };
      d.value.addEventListener("change", S), l.value.addEventListener("change", S);
    }), Ns(() => {
      w == null || w.close({ reason: "unmount" });
    }), (O, S) => (v(), W(We, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: at(z, ["prevent"])
        }, b(o(n)("Upload")), 9, hc),
        g.value ? (v(), h("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: at(R, ["prevent"])
        }, b(o(n)("Cancel")), 1)) : (v(), h("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: at(V, ["prevent"])
        }, b(o(n)("Close")), 1))
      ]),
      default: ne(() => [
        a("div", null, [
          q(tt, {
            icon: o(Ho),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          a("div", nc, [
            a("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: _,
              onClick: N
            }, [
              $.value ? (v(), h("div", sc, b(o(n)("Release to drop these files.")), 1)) : (v(), h("div", oc, b(o(n)("Drag and drop the files/folders to here or click here.")), 1))
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
                ref: m,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(n)("Select Folders")), 513),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: g.value,
                onClick: S[0] || (S[0] = (k) => L(!1))
              }, b(o(n)("Clear all")), 9, rc),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: g.value,
                onClick: S[1] || (S[1] = (k) => L(!0))
              }, b(o(n)("Clear only successful")), 9, ac)
            ], 512),
            a("div", lc, [
              (v(!0), h(ye, null, xe(p.value, (k) => (v(), h("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: k.id
              }, [
                a("span", {
                  class: _e(["vuefinder__upload-modal__file-icon", M(k)])
                }, [
                  a("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(y(k))
                  }, null, 8, ic)
                ], 2),
                a("div", cc, [
                  a("div", dc, b(o(Gn)(k.name, 40)) + " (" + b(k.size) + ")", 1),
                  a("div", uc, b(o(Gn)(k.name, 16)) + " (" + b(k.size) + ")", 1),
                  a("div", {
                    class: _e(["vuefinder__upload-modal__file-status", M(k)])
                  }, [
                    Q(b(k.statusName) + " ", 1),
                    k.status === i.value.QUEUE_ENTRY_STATUS.UPLOADING ? (v(), h("b", _c, b(k.percent), 1)) : P("", !0)
                  ], 2)
                ]),
                a("button", {
                  type: "button",
                  class: _e(["vuefinder__upload-modal__file-remove", g.value ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: g.value,
                  onClick: (B) => D(k)
                }, mc, 10, vc)
              ]))), 128)),
              p.value.length ? P("", !0) : (v(), h("div", pc, b(o(n)("No files selected!")), 1))
            ]),
            f.value.length ? (v(), W(Ye, {
              key: 0,
              onHidden: S[2] || (S[2] = (k) => f.value = ""),
              error: ""
            }, {
              default: ne(() => [
                Q(b(f.value), 1)
              ]),
              _: 1
            })) : P("", !0)
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
}, bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, wc = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), yc = [
  wc
];
function $c(t, e) {
  return v(), h("svg", bc, [...yc]);
}
const Bo = { render: $c }, kc = { class: "vuefinder__unarchive-modal__content" }, xc = { class: "vuefinder__unarchive-modal__items" }, Sc = { class: "vuefinder__unarchive-modal__item" }, Cc = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ec = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Tc = [
  Ec
], Ac = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Mc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Dc = [
  Mc
], Vc = { class: "vuefinder__unarchive-modal__item-name" }, Lc = { class: "vuefinder__unarchive-modal__info" }, Io = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, r = C(e.modal.data.items[0]), s = C(""), i = C([]), c = () => {
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
    return (d, l) => (v(), W(We, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Unarchive")), 1),
        a("button", {
          type: "button",
          onClick: l[1] || (l[1] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: ne(() => [
        a("div", null, [
          q(tt, {
            icon: o(Bo),
            title: o(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          a("div", kc, [
            a("div", xc, [
              (v(!0), h(ye, null, xe(i.value, (u) => (v(), h("p", Sc, [
                u.type === "dir" ? (v(), h("svg", Cc, Tc)) : (v(), h("svg", Ac, Dc)),
                a("span", Vc, b(u.basename), 1)
              ]))), 256)),
              a("p", Lc, b(o(n)("The archive will be unarchived at")) + " (" + b(o(e).fs.data.dirname) + ")", 1),
              s.value.length ? (v(), W(Ye, {
                key: 0,
                onHidden: l[0] || (l[0] = (u) => s.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  Q(b(s.value), 1)
                ]),
                _: 1
              })) : P("", !0)
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
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Rc = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Fc = [
  Rc
];
function Hc(t, e) {
  return v(), h("svg", Oc, [...Fc]);
}
const No = { render: Hc }, Bc = { class: "vuefinder__archive-modal__content" }, Ic = { class: "vuefinder__archive-modal__form" }, Nc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Uc = { class: "vuefinder__archive-modal__file" }, Pc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), zc = [
  qc
], Gc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Kc = [
  jc
], Wc = { class: "vuefinder__archive-modal__file-name" }, Yc = ["placeholder"], Uo = {
  __name: "ModalArchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, r = C(""), s = C(""), i = C(e.modal.data.items), c = () => {
      i.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: i.value.map(({ path: d, type: l }) => ({ path: d, type: l })),
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
    return (d, l) => (v(), W(We, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Archive")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: ne(() => [
        a("div", null, [
          q(tt, {
            icon: o(No),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          a("div", Bc, [
            a("div", Ic, [
              a("div", Nc, [
                (v(!0), h(ye, null, xe(i.value, (u) => (v(), h("p", Uc, [
                  u.type === "dir" ? (v(), h("svg", Pc, zc)) : (v(), h("svg", Gc, Kc)),
                  a("span", Wc, b(u.basename), 1)
                ]))), 256))
              ]),
              me(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => r.value = u),
                onKeyup: Ct(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Yc), [
                [Et, r.value]
              ]),
              s.value.length ? (v(), W(Ye, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => s.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  Q(b(s.value), 1)
                ]),
                _: 1
              })) : P("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Xc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, Jc = /* @__PURE__ */ a("circle", {
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
}, null, -1), Zc = [
  Jc,
  Qc
];
function ed(t, e) {
  return v(), h("svg", Xc, [...Zc]);
}
const cs = { render: ed }, td = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, nd = /* @__PURE__ */ a("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), sd = [
  nd
];
function od(t, e) {
  return v(), h("svg", td, [...sd]);
}
const rd = { render: od }, ad = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, ld = /* @__PURE__ */ a("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), id = [
  ld
];
function cd(t, e) {
  return v(), h("svg", ad, [...id]);
}
const dd = { render: cd }, ud = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, _d = /* @__PURE__ */ a("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), vd = [
  _d
];
function fd(t, e) {
  return v(), h("svg", ud, [...vd]);
}
const md = { render: fd }, pd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, hd = /* @__PURE__ */ a("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), gd = [
  hd
];
function bd(t, e) {
  return v(), h("svg", pd, [...gd]);
}
const wd = { render: bd }, yd = { class: "vuefinder__toolbar" }, $d = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, kd = ["title"], xd = ["title"], Sd = ["title"], Cd = ["title"], Ed = ["title"], Td = ["title"], Ad = ["title"], Md = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Dd = { class: "pl-2" }, Vd = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Ld = { class: "vuefinder__toolbar__controls" }, Od = ["title"], Rd = ["title"], Fd = {
  __name: "Toolbar",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: n } = e.storage, { t: r } = e.i18n, s = e.dragSelect, i = C("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const c = () => {
      e.fullScreen = !e.fullScreen;
    };
    Be(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (l, u) => (v(), h("div", yd, [
      i.value.length ? (v(), h("div", Md, [
        a("div", Dd, [
          Q(b(o(r)("Search results for")) + " ", 1),
          a("span", Vd, b(i.value), 1)
        ]),
        o(e).fs.loading ? (v(), W(o(cs), { key: 0 })) : P("", !0)
      ])) : (v(), h("div", $d, [
        o(e).features.includes(o(fe).NEW_FOLDER) ? (v(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: o(r)("New Folder"),
          onClick: u[0] || (u[0] = (m) => o(e).modal.open(Ro, { items: o(s).getSelected() }))
        }, [
          q(o(Oo))
        ], 8, kd)) : P("", !0),
        o(e).features.includes(o(fe).NEW_FILE) ? (v(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: o(r)("New File"),
          onClick: u[1] || (u[1] = (m) => o(e).modal.open(Ji, { items: o(s).getSelected() }))
        }, [
          q(o(Fo))
        ], 8, xd)) : P("", !0),
        o(e).features.includes(o(fe).RENAME) ? (v(), h("div", {
          key: 2,
          class: "mx-1.5",
          title: o(r)("Rename"),
          onClick: u[2] || (u[2] = (m) => o(s).getCount() !== 1 || o(e).modal.open(is, { items: o(s).getSelected() }))
        }, [
          q(o(Lo), {
            class: _e(o(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Sd)) : P("", !0),
        o(e).features.includes(o(fe).DELETE) ? (v(), h("div", {
          key: 3,
          class: "mx-1.5",
          title: o(r)("Delete"),
          onClick: u[3] || (u[3] = (m) => !o(s).getCount() || o(e).modal.open(ls, { items: o(s).getSelected() }))
        }, [
          q(o(Vo), {
            class: _e(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Cd)) : P("", !0),
        o(e).features.includes(o(fe).UPLOAD) ? (v(), h("div", {
          key: 4,
          class: "mx-1.5",
          title: o(r)("Upload"),
          onClick: u[4] || (u[4] = (m) => o(e).modal.open(gc, { items: o(s).getSelected() }))
        }, [
          q(o(Ho))
        ], 8, Ed)) : P("", !0),
        o(e).features.includes(o(fe).UNARCHIVE) && o(s).getCount() === 1 && o(s).getSelected()[0].mime_type === "application/zip" ? (v(), h("div", {
          key: 5,
          class: "mx-1.5",
          title: o(r)("Unarchive"),
          onClick: u[5] || (u[5] = (m) => !o(s).getCount() || o(e).modal.open(Io, { items: o(s).getSelected() }))
        }, [
          q(o(Bo), {
            class: _e(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Td)) : P("", !0),
        o(e).features.includes(o(fe).ARCHIVE) ? (v(), h("div", {
          key: 6,
          class: "mx-1.5",
          title: o(r)("Archive"),
          onClick: u[6] || (u[6] = (m) => !o(s).getCount() || o(e).modal.open(Uo, { items: o(s).getSelected() }))
        }, [
          q(o(No), {
            class: _e(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ad)) : P("", !0)
      ])),
      a("div", Ld, [
        o(e).features.includes(o(fe).FULL_SCREEN) ? (v(), h("div", {
          key: 0,
          onClick: c,
          class: "mx-1.5",
          title: o(r)("Toggle Full Screen")
        }, [
          o(e).fullScreen ? (v(), W(o(dd), { key: 0 })) : (v(), W(o(rd), { key: 1 }))
        ], 8, Od)) : P("", !0),
        a("div", {
          class: "mx-1.5",
          title: o(r)("Change View"),
          onClick: u[7] || (u[7] = (m) => i.value.length || d())
        }, [
          o(e).view === "grid" ? (v(), W(o(md), {
            key: 0,
            class: _e(["vf-toolbar-icon", i.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : P("", !0),
          o(e).view === "list" ? (v(), W(o(wd), {
            key: 1,
            class: _e(["vf-toolbar-icon", i.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : P("", !0)
        ], 8, Rd)
      ])
    ]));
  }
}, Hd = (t, e = 0, n = !1) => {
  let r;
  return (...s) => {
    n && !r && t(...s), clearTimeout(r), r = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Fs = (t, e, n) => {
  const r = C(t);
  return sr((s, i) => ({
    get() {
      return s(), r.value;
    },
    set: Hd(
      (c) => {
        r.value = c, i();
      },
      e,
      n
    )
  }));
}, Bd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, Id = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
}, null, -1), Nd = [
  Id
];
function Ud(t, e) {
  return v(), h("svg", Bd, [...Nd]);
}
const Pd = { render: Ud }, qd = { class: "vuefinder__move-modal__content" }, zd = { class: "vuefinder__move-modal__description" }, Gd = { class: "vuefinder__move-modal__files vf-scrollbar" }, jd = { class: "vuefinder__move-modal__file" }, Kd = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Yd = [
  Wd
], Xd = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Qd = [
  Jd
], Zd = { class: "vuefinder__move-modal__file-name" }, eu = { class: "vuefinder__move-modal__target-title" }, tu = { class: "vuefinder__move-modal__target-directory" }, nu = /* @__PURE__ */ a("svg", {
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
], -1), su = { class: "vuefinder__move-modal__target-path" }, ou = { class: "vuefinder__move-modal__selected-items" }, jn = {
  __name: "ModalMove",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, r = C(e.modal.data.items.from), s = C(""), i = () => {
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
    return (c, d) => (v(), W(We, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Yes, Move!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        a("div", ou, b(o(n)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: ne(() => [
        a("div", null, [
          q(tt, {
            icon: o(Pd),
            title: o(n)("Move files")
          }, null, 8, ["icon", "title"]),
          a("div", qd, [
            a("p", zd, b(o(n)("Are you sure you want to move these files?")), 1),
            a("div", Gd, [
              (v(!0), h(ye, null, xe(r.value, (l) => (v(), h("div", jd, [
                a("div", null, [
                  l.type === "dir" ? (v(), h("svg", Kd, Yd)) : (v(), h("svg", Xd, Qd))
                ]),
                a("div", Zd, b(l.path), 1)
              ]))), 256))
            ]),
            a("h4", eu, b(o(n)("Target Directory")), 1),
            a("p", tu, [
              nu,
              a("span", su, b(o(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (v(), W(Ye, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => s.value = ""),
              error: ""
            }, {
              default: ne(() => [
                Q(b(s.value), 1)
              ]),
              _: 1
            })) : P("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, au = /* @__PURE__ */ a("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), lu = [
  au
];
function iu(t, e) {
  return v(), h("svg", ru, [...lu]);
}
const cu = { render: iu }, du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, uu = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), _u = [
  uu
];
function vu(t, e) {
  return v(), h("svg", du, [..._u]);
}
const fu = { render: vu }, mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, pu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), hu = [
  pu
];
function gu(t, e) {
  return v(), h("svg", mu, [...hu]);
}
const bu = { render: gu }, wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, yu = /* @__PURE__ */ a("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), $u = [
  yu
];
function ku(t, e) {
  return v(), h("svg", wu, [...$u]);
}
const xu = { render: ku }, Su = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, Cu = /* @__PURE__ */ a("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), Eu = [
  Cu
];
function Tu(t, e) {
  return v(), h("svg", Su, [...Eu]);
}
const Au = { render: Tu }, Mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, Du = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Vu = [
  Du
];
function Lu(t, e) {
  return v(), h("svg", Mu, [...Vu]);
}
const Ou = { render: Lu }, Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, Fu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), Hu = [
  Fu
];
function Bu(t, e) {
  return v(), h("svg", Ru, [...Hu]);
}
const mn = { render: Bu }, Iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
}, Nu = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Uu = /* @__PURE__ */ a("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1), Pu = [
  Nu,
  Uu
];
function qu(t, e) {
  return v(), h("svg", Iu, [...Pu]);
}
const zu = { render: qu }, Gu = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, ju = /* @__PURE__ */ a("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), Ku = [
  ju
];
function Wu(t, e) {
  return v(), h("svg", Gu, [...Ku]);
}
const Yu = { render: Wu }, Xu = { class: "vuefinder__breadcrumb__container" }, Ju = ["title"], Qu = ["title"], Zu = ["title"], e_ = ["title"], t_ = { class: "vuefinder__breadcrumb__list" }, n_ = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, s_ = /* @__PURE__ */ a("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1), o_ = { class: "relative" }, r_ = /* @__PURE__ */ a("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1), a_ = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], l_ = { class: "vuefinder__breadcrumb__search-mode" }, i_ = ["placeholder"], c_ = { class: "vuefinder__breadcrumb__hidden-dropdown" }, d_ = ["onDrop", "onClick"], u_ = { class: "vuefinder__breadcrumb__hidden-item-content" }, __ = { class: "vuefinder__breadcrumb__hidden-item-text" }, v_ = {
  __name: "Breadcrumb",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, r = e.dragSelect, { setStore: s } = e.storage, i = C(null), c = Fs(0, 100);
    Be(c, (R) => {
      const D = i.value.children;
      let L = 0, V = 0, E = 5, O = 1;
      e.fs.limitBreadcrumbItems(E), ft(() => {
        for (let S = D.length - 1; S >= 0 && !(L + D[S].offsetWidth > c.value - 40); S--)
          L += parseInt(D[S].offsetWidth, 10), V++;
        V < O && (V = O), V > E && (V = E), e.fs.limitBreadcrumbItems(V);
      });
    });
    const d = () => {
      c.value = i.value.offsetWidth;
    };
    Ce(() => {
      new ResizeObserver(d).observe(i.value);
    });
    const l = (R, D = null) => {
      R.preventDefault(), r.isDraggingRef.value = !1, _(R), D ?? (D = e.fs.hiddenBreadcrumbs.length - 1);
      let L = JSON.parse(R.dataTransfer.getData("items"));
      if (L.find((V) => V.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(jn, {
        items: {
          from: L,
          to: e.fs.hiddenBreadcrumbs[D] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (R, D = null) => {
      R.preventDefault(), r.isDraggingRef.value = !1, _(R), D ?? (D = e.fs.breadcrumbs.length - 2);
      let L = JSON.parse(R.dataTransfer.getData("items"));
      if (L.find((V) => V.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(jn, {
        items: {
          from: L,
          to: e.fs.breadcrumbs[D] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, m = (R) => {
      R.preventDefault(), e.fs.isGoUpAvailable() ? (R.dataTransfer.dropEffect = "copy", R.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (R.dataTransfer.dropEffect = "none", R.dataTransfer.effectAllowed = "none");
    }, _ = (R) => {
      R.preventDefault(), R.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && R.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, p = () => {
      N(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, f = () => {
      N(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, g = (R) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: R.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, $ = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, w = {
      mounted(R, D, L, V) {
        R.clickOutsideEvent = function(E) {
          R === E.target || R.contains(E.target) || D.value();
        }, document.body.addEventListener("click", R.clickOutsideEvent);
      },
      beforeUnmount(R, D, L, V) {
        document.body.removeEventListener("click", R.clickOutsideEvent);
      }
    }, A = () => {
      e.showTreeView = !e.showTreeView;
    };
    Be(() => e.showTreeView, (R, D) => {
      R !== D && s("show-tree-view", R);
    });
    const x = C(null), M = () => {
      e.features.includes(fe.SEARCH) && (e.fs.searchMode = !0, ft(() => x.value.focus()));
    }, y = Fs("", 400);
    Be(y, (R) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: R });
    }), Be(() => e.fs.searchMode, (R) => {
      R && ft(() => x.value.focus());
    });
    const N = () => {
      e.fs.searchMode = !1, y.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      N();
    });
    const z = () => {
      y.value === "" && N();
    };
    return (R, D) => (v(), h("div", Xu, [
      a("span", {
        title: o(n)("Toggle Tree View")
      }, [
        q(o(zu), {
          onClick: A,
          class: _e(["vuefinder__breadcrumb__toggle-tree", o(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Ju),
      a("span", {
        title: o(n)("Go up a directory")
      }, [
        q(o(fu), {
          onDragover: D[0] || (D[0] = (L) => m(L)),
          onDragleave: D[1] || (D[1] = (L) => _(L)),
          onDrop: D[2] || (D[2] = (L) => u(L)),
          onClick: f,
          class: _e(o(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, Qu),
      o(e).fs.loading ? (v(), h("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        q(o(bu), {
          onClick: D[3] || (D[3] = (L) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, e_)) : (v(), h("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        q(o(cu), { onClick: p })
      ], 8, Zu)),
      me(a("div", {
        onClick: at(M, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        a("div", null, [
          q(o(xu), {
            onDragover: D[4] || (D[4] = (L) => m(L)),
            onDragleave: D[5] || (D[5] = (L) => _(L)),
            onDrop: D[6] || (D[6] = (L) => u(L, -1)),
            onClick: D[7] || (D[7] = (L) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter } }))
          })
        ]),
        a("div", t_, [
          o(e).fs.hiddenBreadcrumbs.length ? me((v(), h("div", n_, [
            s_,
            a("div", o_, [
              a("span", {
                onDragenter: D[8] || (D[8] = (L) => o(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: D[9] || (D[9] = (L) => o(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                q(o(Yu), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [w, $]
          ]) : P("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: i,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: at(M, ["self"])
        }, [
          (v(!0), h(ye, null, xe(o(e).fs.breadcrumbs, (L, V) => (v(), h("div", { key: V }, [
            r_,
            a("span", {
              onDragover: (E) => V === o(e).fs.breadcrumbs.length - 1 || m(E),
              onDragleave: (E) => V === o(e).fs.breadcrumbs.length - 1 || _(E),
              onDrop: (E) => V === o(e).fs.breadcrumbs.length - 1 || u(E, V),
              class: "vuefinder__breadcrumb__item",
              title: L.basename,
              onClick: (E) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter, path: L.path } })
            }, b(L.name), 41, a_)
          ]))), 128))
        ], 512),
        o(e).fs.loading ? (v(), W(o(cs), { key: 0 })) : P("", !0)
      ], 512), [
        [qe, !o(e).fs.searchMode]
      ]),
      me(a("div", l_, [
        a("div", null, [
          q(o(Au))
        ]),
        me(a("input", {
          ref_key: "searchInput",
          ref: x,
          onKeydown: Ct(N, ["esc"]),
          onBlur: z,
          "onUpdate:modelValue": D[10] || (D[10] = (L) => or(y) ? y.value = L : null),
          placeholder: o(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, i_), [
          [Et, o(y)]
        ]),
        q(o(Ou), { onClick: N })
      ], 512), [
        [qe, o(e).fs.searchMode]
      ]),
      me(a("div", c_, [
        (v(!0), h(ye, null, xe(o(e).fs.hiddenBreadcrumbs, (L, V) => (v(), h("div", {
          key: V,
          onDragover: D[11] || (D[11] = (E) => m(E)),
          onDragleave: D[12] || (D[12] = (E) => _(E)),
          onDrop: (E) => l(E, V),
          onClick: (E) => g(L),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          a("div", u_, [
            a("span", null, [
              q(o(mn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            Q(),
            a("span", __, b(L.name), 1)
          ])
        ], 40, d_))), 128))
      ], 512), [
        [qe, o(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Po = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), f_ = ["onClick"], m_ = {
  __name: "Toast",
  setup(t) {
    const e = ae("ServiceContainer"), { getStore: n } = e.storage, r = C(n("full-screen", !1)), s = C([]), i = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (l) => {
      s.value.splice(l, 1);
    }, d = (l) => {
      let u = s.value.findIndex((m) => m.id === l);
      u !== -1 && c(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = u, s.value.push(l), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (l, u) => (v(), h("div", {
      class: _e(["vuefinder__toast", r.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      q(rr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: ne(() => [
          (v(!0), h(ye, null, xe(s.value, (m, _) => (v(), h("div", {
            key: _,
            onClick: (p) => c(_),
            class: _e(["vuefinder__toast__message", i(m.type)])
          }, b(m.label), 11, f_))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, p_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, h_ = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), g_ = [
  h_
];
function b_(t, e) {
  return v(), h("svg", p_, [...g_]);
}
const w_ = { render: b_ }, y_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, $_ = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), k_ = [
  $_
];
function x_(t, e) {
  return v(), h("svg", y_, [...k_]);
}
const S_ = { render: x_ }, Wt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (v(), h("div", null, [
      t.direction === "asc" ? (v(), W(o(w_), { key: 0 })) : P("", !0),
      t.direction === "desc" ? (v(), W(o(S_), { key: 1 })) : P("", !0)
    ]));
  }
}, C_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, E_ = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), T_ = [
  E_
];
function A_(t, e) {
  return v(), h("svg", C_, [...T_]);
}
const M_ = { render: A_ }, D_ = { class: "vuefinder__item-icon" }, Sn = {
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
    return (e, n) => (v(), h("span", D_, [
      t.type === "dir" ? (v(), W(o(mn), {
        key: 0,
        class: _e(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (v(), W(o(M_), {
        key: 1,
        class: _e(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, V_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, L_ = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), O_ = [
  L_
];
function R_(t, e) {
  return v(), h("svg", V_, [...O_]);
}
const F_ = { render: R_ }, H_ = { class: "vuefinder__drag-item__container" }, B_ = { class: "vuefinder__drag-item__count" }, I_ = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, r) => (v(), h("div", H_, [
      q(o(F_)),
      a("div", B_, b(e.count), 1)
    ]));
  }
}, N_ = { class: "vuefinder__text-preview" }, U_ = { class: "vuefinder__text-preview__header" }, P_ = ["title"], q_ = { class: "vuefinder__text-preview__actions" }, z_ = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, G_ = { key: 1 }, j_ = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = C(""), s = C(""), i = C(null), c = C(!1), d = C(""), l = C(!1), u = ae("ServiceContainer"), { t: m } = u.i18n;
    Ce(() => {
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
      c.value = !c.value, s.value = r.value;
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
      }).then((f) => {
        d.value = m("Updated."), r.value = f, n("success"), c.value = !c.value;
      }).catch((f) => {
        d.value = m(f.message), l.value = !0;
      });
    };
    return (f, g) => (v(), h("div", N_, [
      a("div", U_, [
        a("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(u).modal.data.item.path
        }, b(o(u).modal.data.item.basename), 9, P_),
        a("div", q_, [
          c.value ? (v(), h("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, b(o(m)("Save")), 1)) : P("", !0),
          o(u).features.includes(o(fe).EDIT) ? (v(), h("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: g[0] || (g[0] = ($) => _())
          }, b(c.value ? o(m)("Cancel") : o(m)("Edit")), 1)) : P("", !0)
        ])
      ]),
      a("div", null, [
        c.value ? (v(), h("div", G_, [
          me(a("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": g[1] || (g[1] = ($) => s.value = $),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Et, s.value]
          ])
        ])) : (v(), h("pre", z_, b(r.value), 1)),
        d.value.length ? (v(), W(Ye, {
          key: 2,
          onHidden: g[2] || (g[2] = ($) => d.value = ""),
          error: l.value
        }, {
          default: ne(() => [
            Q(b(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : P("", !0)
      ])
    ]));
  }
}, K_ = { class: "vuefinder__image-preview" }, W_ = { class: "vuefinder__image-preview__header" }, Y_ = ["title"], X_ = { class: "vuefinder__image-preview__actions" }, J_ = { class: "vuefinder__image-preview__image-container" }, Q_ = ["src"], Z_ = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = ae("ServiceContainer"), { t: s } = r.i18n, i = C(null), c = C(null), d = C(!1), l = C(""), u = C(!1), m = () => {
      d.value = !d.value, d.value ? c.value = new mr(i.value, {
        crop(p) {
        }
      }) : c.value.destroy();
    }, _ = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          l.value = "", u.value = !1;
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
          }).then((g) => {
            l.value = s("Updated."), i.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), m(), n("success");
          }).catch((g) => {
            l.value = s(g.message), u.value = !0;
          });
        }
      );
    };
    return Ce(() => {
      n("success");
    }), (p, f) => (v(), h("div", K_, [
      a("div", W_, [
        a("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(r).modal.data.item.path
        }, b(o(r).modal.data.item.basename), 9, Y_),
        a("div", X_, [
          d.value ? (v(), h("button", {
            key: 0,
            onClick: _,
            class: "vuefinder__image-preview__crop-button"
          }, b(o(s)("Crop")), 1)) : P("", !0),
          o(r).features.includes(o(fe).EDIT) ? (v(), h("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: f[0] || (f[0] = (g) => m())
          }, b(d.value ? o(s)("Cancel") : o(s)("Edit")), 1)) : P("", !0)
        ])
      ]),
      a("div", J_, [
        a("img", {
          ref_key: "image",
          ref: i,
          class: "vuefinder__image-preview__image",
          src: o(r).requester.getPreviewUrl(o(r).modal.data.adapter, o(r).modal.data.item),
          alt: ""
        }, null, 8, Q_)
      ]),
      l.value.length ? (v(), W(Ye, {
        key: 0,
        onHidden: f[1] || (f[1] = (g) => l.value = ""),
        error: u.value
      }, {
        default: ne(() => [
          Q(b(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : P("", !0)
    ]));
  }
}, ev = { class: "vuefinder__default-preview" }, tv = { class: "vuefinder__default-preview__header" }, nv = ["title"], sv = /* @__PURE__ */ a("div", null, null, -1), ov = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ae("ServiceContainer"), r = e;
    return Ce(() => {
      r("success");
    }), (s, i) => (v(), h("div", ev, [
      a("div", tv, [
        a("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: o(n).modal.data.item.path
        }, b(o(n).modal.data.item.basename), 9, nv)
      ]),
      sv
    ]));
  }
}, rv = { class: "vuefinder__video-preview" }, av = ["title"], lv = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, iv = ["src"], cv = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ae("ServiceContainer"), r = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ce(() => {
      r("success");
    }), (i, c) => (v(), h("div", rv, [
      a("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, av),
      a("div", null, [
        a("video", lv, [
          a("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, iv),
          Q(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, dv = { class: "vuefinder__audio-preview" }, uv = ["title"], _v = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, vv = ["src"], fv = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = ae("ServiceContainer"), s = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return Ce(() => {
      n("success");
    }), (i, c) => (v(), h("div", dv, [
      a("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(r).modal.data.item.path
      }, b(o(r).modal.data.item.basename), 9, uv),
      a("div", null, [
        a("audio", _v, [
          a("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, vv),
          Q(" Your browser does not support the audio element. ")
        ])
      ])
    ]));
  }
}, mv = { class: "vuefinder__pdf-preview" }, pv = ["title"], hv = ["data"], gv = ["src"], bv = /* @__PURE__ */ a("p", null, [
  /* @__PURE__ */ Q(" Your browser does not support PDFs. "),
  /* @__PURE__ */ a("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ Q(". ")
], -1), wv = [
  bv
], yv = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ae("ServiceContainer"), r = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ce(() => {
      r("success");
    }), (i, c) => (v(), h("div", mv, [
      a("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, pv),
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
          }, wv, 8, gv)
        ], 8, hv)
      ])
    ]));
  }
}, $v = { class: "vuefinder__preview-modal__content" }, kv = { key: 0 }, xv = { class: "vuefinder__preview-modal__loading" }, Sv = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Cv = /* @__PURE__ */ a("svg", {
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
], -1), Ev = { class: "vuefinder__preview-modal__details" }, Tv = { class: "font-bold" }, Av = { class: "font-bold pl-2" }, Mv = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Dv = ["download", "href"], qo = {
  __name: "ModalPreview",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, r = C(!1), s = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), i = e.features.includes(fe.PREVIEW);
    return i || (r.value = !0), (c, d) => (v(), W(We, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(fe).DOWNLOAD) ? (v(), h("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, b(o(n)("Download")), 9, Dv)) : P("", !0)
      ]),
      default: ne(() => [
        a("div", null, [
          a("div", $v, [
            o(i) ? (v(), h("div", kv, [
              s("text") ? (v(), W(j_, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => r.value = !0)
              })) : s("image") ? (v(), W(Z_, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => r.value = !0)
              })) : s("video") ? (v(), W(cv, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => r.value = !0)
              })) : s("audio") ? (v(), W(fv, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => r.value = !0)
              })) : s("application/pdf") ? (v(), W(yv, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => r.value = !0)
              })) : (v(), W(ov, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => r.value = !0)
              }))
            ])) : P("", !0),
            a("div", xv, [
              r.value === !1 ? (v(), h("div", Sv, [
                Cv,
                a("span", null, b(o(n)("Loading")), 1)
              ])) : P("", !0)
            ])
          ])
        ]),
        a("div", Ev, [
          a("div", null, [
            a("span", Tv, b(o(n)("File Size")) + ": ", 1),
            Q(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", Av, b(o(n)("Last Modified")) + ": ", 1),
            Q(" " + b(o(Po)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(fe).DOWNLOAD) ? (v(), h("div", Mv, [
          a("span", null, b(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : P("", !0)
      ]),
      _: 1
    }));
  }
}, Vv = {
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
}, null, -1), Ov = /* @__PURE__ */ a("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1), Rv = [
  Lv,
  Ov
];
function Fv(t, e) {
  return v(), h("svg", Vv, [...Rv]);
}
const zo = { render: Fv }, Hv = ["data-type", "data-item", "data-index"], Cn = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = ae("ServiceContainer"), n = e.dragSelect, r = t, s = (f) => {
      f.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: f.path } })) : e.modal.open(qo, { adapter: e.fs.adapter, item: f });
    }, i = {
      mounted(f, g, $, w) {
        $.props.draggable && (f.addEventListener("dragstart", (A) => c(A, g.value)), f.addEventListener("dragover", (A) => l(A, g.value)), f.addEventListener("drop", (A) => d(A, g.value)));
      },
      beforeUnmount(f, g, $, w) {
        $.props.draggable && (f.removeEventListener("dragstart", c), f.removeEventListener("dragover", l), f.removeEventListener("drop", d));
      }
    }, c = (f, g) => {
      if (f.altKey || f.ctrlKey || f.metaKey)
        return f.preventDefault(), !1;
      n.isDraggingRef.value = !0, f.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), f.dataTransfer.effectAllowed = "all", f.dataTransfer.dropEffect = "copy", f.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (f, g) => {
      f.preventDefault(), n.isDraggingRef.value = !1;
      let $ = JSON.parse(f.dataTransfer.getData("items"));
      if ($.find((w) => w.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(jn, { items: { from: $, to: g } });
    }, l = (f, g) => {
      f.preventDefault(), !g || g.type !== "dir" || n.getSelection().find(($) => $ === f.currentTarget) ? (f.dataTransfer.dropEffect = "none", f.dataTransfer.effectAllowed = "none") : f.dataTransfer.dropEffect = "copy";
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
        const g = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: f.target.getBoundingClientRect().x,
          clientY: f.target.getBoundingClientRect().y
        });
        f.target.dispatchEvent(g);
      }, 500);
    };
    return (f, g) => me((v(), h("div", {
      style: rn({ opacity: o(n).isDraggingRef.value && o(n).getSelection().find(($) => f.$el === $) ? "0.5 !important" : "" }),
      class: _e(["vuefinder__item", "vf-item-" + o(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: g[0] || (g[0] = ($) => s(t.item)),
      onTouchstart: g[1] || (g[1] = ($) => p($)),
      onTouchend: g[2] || (g[2] = ($) => _()),
      onContextmenu: g[3] || (g[3] = at(($) => o(e).emitter.emit("vf-contextmenu-show", { event: $, items: o(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Lt(f.$slots, "default"),
      o(e).pinnedFolders.find(($) => $.path === t.item.path) ? (v(), W(o(zo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : P("", !0)
    ], 46, Hv)), [
      [i, t.item]
    ]);
  }
}, Bv = { class: "vuefinder__explorer__container" }, Iv = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Nv = { class: "vuefinder__explorer__drag-item" }, Uv = { class: "vuefinder__explorer__item-list-content" }, Pv = { class: "vuefinder__explorer__item-list-name" }, qv = { class: "vuefinder__explorer__item-name" }, zv = { class: "vuefinder__explorer__item-path" }, Gv = { class: "vuefinder__explorer__item-list-content" }, jv = { class: "vuefinder__explorer__item-list-name" }, Kv = { class: "vuefinder__explorer__item-name" }, Wv = { class: "vuefinder__explorer__item-size" }, Yv = { class: "vuefinder__explorer__item-date" }, Xv = { class: "vuefinder__explorer__item-grid-content" }, Jv = ["data-src", "alt"], Qv = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, Zv = { class: "vuefinder__explorer__item-title break-all" }, ef = {
  __name: "Explorer",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, r = (_) => _ == null ? void 0 : _.substring(0, 3), s = C(null), i = C(""), c = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      c.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      i.value = _, _ ? e.emitter.emit("vf-fetch", {
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
    const l = St({ active: !1, column: "", order: "" }), u = (_ = !0) => {
      let p = [...e.fs.data.files], f = l.column, g = l.order === "asc" ? 1 : -1;
      if (!_)
        return p;
      const $ = (w, A) => typeof w == "string" && typeof A == "string" ? w.toLowerCase().localeCompare(A.toLowerCase()) : w < A ? -1 : w > A ? 1 : 0;
      return l.active && (p = p.slice().sort((w, A) => $(w[f], A[f]) * g)), p;
    }, m = (_) => {
      l.active && l.column === _ ? (l.active = l.order === "asc", l.column = _, l.order = "desc") : (l.active = !0, l.column = _, l.order = "asc");
    };
    return Ce(() => {
      d = new fr(c.area.value);
    }), Bs(() => {
      d.update();
    }), Ns(() => {
      d.destroy();
    }), (_, p) => (v(), h("div", Bv, [
      o(e).view === "list" || i.value.length ? (v(), h("div", Iv, [
        a("div", {
          onClick: p[0] || (p[0] = (f) => m("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Q(b(o(n)("Name")) + " ", 1),
          me(q(Wt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [qe, l.active && l.column === "basename"]
          ])
        ]),
        i.value.length ? P("", !0) : (v(), h("div", {
          key: 0,
          onClick: p[1] || (p[1] = (f) => m("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Q(b(o(n)("Size")) + " ", 1),
          me(q(Wt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [qe, l.active && l.column === "file_size"]
          ])
        ])),
        i.value.length ? P("", !0) : (v(), h("div", {
          key: 1,
          onClick: p[2] || (p[2] = (f) => m("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Q(b(o(n)("Date")) + " ", 1),
          me(q(Wt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [qe, l.active && l.column === "last_modified"]
          ])
        ])),
        i.value.length ? (v(), h("div", {
          key: 2,
          onClick: p[3] || (p[3] = (f) => m("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          Q(b(o(n)("Filepath")) + " ", 1),
          me(q(Wt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [qe, l.active && l.column === "path"]
          ])
        ])) : P("", !0)
      ])) : P("", !0),
      a("div", Nv, [
        q(I_, {
          ref_key: "dragImage",
          ref: s,
          count: o(c).getCount()
        }, null, 8, ["count"])
      ]),
      a("div", {
        ref: o(c).scrollBarContainer,
        class: _e(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": o(e).view === "grid" }, { "search-active": i.value.length }]])
      }, [
        a("div", {
          ref: o(c).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      a("div", {
        ref: o(c).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area",
        onContextmenu: p[4] || (p[4] = at((f) => o(e).emitter.emit("vf-contextmenu-show", { event: f, items: o(c).getSelected() }), ["self", "prevent"]))
      }, [
        i.value.length ? (v(!0), h(ye, { key: 0 }, xe(u(), (f, g) => (v(), W(Cn, {
          item: f,
          index: g,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: ne(() => [
            a("div", Uv, [
              a("div", Pv, [
                q(Sn, {
                  type: f.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", qv, b(f.basename), 1)
              ]),
              a("div", zv, b(f.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : P("", !0),
        o(e).view === "list" && !i.value.length ? (v(!0), h(ye, { key: 1 }, xe(u(), (f, g) => (v(), W(Cn, {
          item: f,
          index: g,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: f.path
        }, {
          default: ne(() => [
            a("div", Gv, [
              a("div", jv, [
                q(Sn, {
                  type: f.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", Kv, b(f.basename), 1)
              ]),
              a("div", Wv, b(f.file_size ? o(e).filesize(f.file_size) : ""), 1),
              a("div", Yv, b(o(Po)(f.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : P("", !0),
        o(e).view === "grid" && !i.value.length ? (v(!0), h(ye, { key: 2 }, xe(u(!1), (f, g) => (v(), W(Cn, {
          item: f,
          index: g,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: ne(() => [
            a("div", null, [
              a("div", Xv, [
                (f.mime_type ?? "").startsWith("image") && o(e).showThumbnails ? (v(), h("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": o(e).requester.getPreviewUrl(o(e).fs.adapter, f),
                  alt: f.basename,
                  key: f.path
                }, null, 8, Jv)) : (v(), W(Sn, {
                  key: 1,
                  type: f.type
                }, null, 8, ["type"])),
                !((f.mime_type ?? "").startsWith("image") && o(e).showThumbnails) && f.type !== "dir" ? (v(), h("div", Qv, b(r(f.extension)), 1)) : P("", !0)
              ]),
              a("span", Zv, b(o(Gn)(f.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : P("", !0)
      ], 544),
      q(m_)
    ]));
  }
}, tf = ["href", "download"], nf = ["onClick"], sf = {
  __name: "ContextMenu",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, r = C(null), s = C([]), i = C(""), c = St({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = ct(() => c.items.filter((_) => _.key == null || e.features.includes(_.key)));
    e.emitter.on("vf-context-selected", (_) => {
      s.value = _;
    });
    const l = {
      newfolder: {
        key: fe.NEW_FOLDER,
        title: () => n("New Folder"),
        action: () => e.modal.open(Ro)
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
        key: fe.DELETE,
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
        key: fe.PREVIEW,
        title: () => n("Preview"),
        action: () => e.modal.open(qo, { adapter: e.fs.adapter, item: s.value[0] })
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
        key: fe.DOWNLOAD,
        link: ct(() => e.requester.getDownloadUrl(e.fs.adapter, s.value[0])),
        title: () => n("Download"),
        action: () => {
        }
      },
      archive: {
        key: fe.ARCHIVE,
        title: () => n("Archive"),
        action: () => e.modal.open(Uo, { items: s })
      },
      unarchive: {
        key: fe.UNARCHIVE,
        title: () => n("Unarchive"),
        action: () => e.modal.open(Io, { items: s })
      },
      rename: {
        key: fe.RENAME,
        title: () => n("Rename"),
        action: () => e.modal.open(is, { items: s })
      }
    }, u = (_) => {
      e.emitter.emit("vf-contextmenu-hide"), _.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      i.value = _;
    }), e.emitter.on("vf-contextmenu-show", ({ event: _, items: p, target: f = null }) => {
      if (c.items = [], i.value)
        if (f)
          c.items.push(l.openDir), e.emitter.emit("vf-context-selected", [f]);
        else
          return;
      else !f && !i.value ? (c.items.push(l.refresh), c.items.push(l.selectAll), c.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : p.length > 1 && p.some((g) => g.path === f.path) ? (c.items.push(l.refresh), c.items.push(l.archive), c.items.push(l.delete), e.emitter.emit("vf-context-selected", p)) : (f.type === "dir" ? (c.items.push(l.open), e.pinnedFolders.findIndex((g) => g.path === f.path) !== -1 ? c.items.push(l.unpinFolder) : c.items.push(l.pinFolder)) : (c.items.push(l.preview), c.items.push(l.download)), c.items.push(l.rename), f.mime_type === "application/zip" ? c.items.push(l.unarchive) : c.items.push(l.archive), c.items.push(l.delete), e.emitter.emit("vf-context-selected", [f]));
      m(_);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const m = (_) => {
      const p = e.dragSelect.area.value, f = e.root.getBoundingClientRect(), g = p.getBoundingClientRect();
      let $ = _.clientX - f.left, w = _.clientY - f.top;
      c.active = !0, ft(() => {
        var y;
        const A = (y = r.value) == null ? void 0 : y.getBoundingClientRect();
        let x = (A == null ? void 0 : A.height) ?? 0, M = (A == null ? void 0 : A.width) ?? 0;
        $ = g.right - _.pageX + window.scrollX < M ? $ - M : $, w = g.bottom - _.pageY + window.scrollY < x ? w - x : w, c.positions = {
          left: $ + "px",
          top: w + "px"
        };
      });
    };
    return (_, p) => me((v(), h("ul", {
      ref_key: "contextmenu",
      ref: r,
      style: rn(c.positions),
      class: "vuefinder__context-menu"
    }, [
      (v(!0), h(ye, null, xe(d.value, (f) => (v(), h("li", {
        class: "vuefinder__context-menu__item",
        key: f.title
      }, [
        f.link ? (v(), h("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: f.link,
          download: f.link,
          onClick: p[0] || (p[0] = (g) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, b(f.title()), 1)
        ], 8, tf)) : (v(), h("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => u(f)
        }, [
          a("span", null, b(f.title()), 1)
        ], 8, nf))
      ]))), 128))
    ], 4)), [
      [qe, c.active]
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
  return v(), h("svg", of, [...af]);
}
const Go = { render: lf }, cf = {
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
  return v(), h("svg", cf, [...uf]);
}
const vf = { render: _f }, ff = { class: "vuefinder__status-bar__wrapper" }, mf = { class: "vuefinder__status-bar__storage" }, pf = ["title"], hf = { class: "vuefinder__status-bar__storage-icon" }, gf = ["value"], bf = { class: "vuefinder__status-bar__info" }, wf = { key: 0 }, yf = { class: "vuefinder__status-bar__selected-count" }, $f = { class: "vuefinder__status-bar__actions" }, kf = ["disabled"], xf = ["title"], Sf = {
  __name: "Statusbar",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, { setStore: r } = e.storage, s = e.dragSelect, i = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, c = C("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const d = ct(() => {
      const l = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, u) => (v(), h("div", ff, [
      a("div", mf, [
        a("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          a("div", hf, [
            q(o(Go))
          ]),
          me(a("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (m) => o(e).fs.adapter = m),
            onChange: i,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (v(!0), h(ye, null, xe(o(e).fs.data.storages, (m) => (v(), h("option", { value: m }, b(m), 9, gf))), 256))
          ], 544), [
            [En, o(e).fs.adapter]
          ])
        ], 8, pf),
        a("div", bf, [
          c.value.length ? (v(), h("span", wf, b(o(e).fs.data.files.length) + " items found. ", 1)) : P("", !0),
          a("span", yf, b(o(e).dragSelect.getCount() > 0 ? o(n)("%s item(s) selected.", o(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      a("div", $f, [
        o(e).selectButton.active ? (v(), h("button", {
          key: 0,
          class: _e(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (m) => o(e).selectButton.click(o(s).getSelected(), m))
        }, b(o(n)("Select")), 11, kf)) : P("", !0),
        a("span", {
          class: "vuefinder__status-bar__about",
          title: o(n)("About"),
          onClick: u[2] || (u[2] = (m) => o(e).modal.open(Do))
        }, [
          q(o(vf))
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
}, null, -1), Tf = [
  Ef
];
function Af(t, e) {
  return v(), h("svg", Cf, [...Tf]);
}
const jo = { render: Af }, Mf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Df = /* @__PURE__ */ a("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Vf = /* @__PURE__ */ a("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1), Lf = [
  Df,
  Vf
];
function Of(t, e) {
  return v(), h("svg", Mf, [...Lf]);
}
const Rf = { render: Of }, Ff = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Hf = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Bf = /* @__PURE__ */ a("path", { d: "M15 12H9M12 9v6" }, null, -1), If = [
  Hf,
  Bf
];
function Nf(t, e) {
  return v(), h("svg", Ff, [...If]);
}
const Ko = { render: Nf }, Uf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Pf = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), qf = /* @__PURE__ */ a("path", { d: "M9 12h6" }, null, -1), zf = [
  Pf,
  qf
];
function Gf(t, e) {
  return v(), h("svg", Uf, [...zf]);
}
const Wo = { render: Gf };
function Yo(t, e) {
  const n = t.findIndex((r) => r.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const jf = { class: "vuefinder__folder-loader-indicator" }, Kf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Xo = {
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
    const e = t, n = ae("ServiceContainer");
    n.i18n;
    const r = Us(t, "modelValue"), s = C(!1);
    Be(
      () => r.value,
      () => {
        var d;
        return ((d = i()) == null ? void 0 : d.folders.length) || c();
      }
    );
    function i() {
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
    return (d, l) => {
      var u;
      return v(), h("div", jf, [
        s.value ? (v(), W(o(cs), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (v(), h("div", Kf, [
          r.value && ((u = i()) != null && u.folders.length) ? (v(), W(o(Wo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : P("", !0),
          r.value ? P("", !0) : (v(), W(o(Ko), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Wf = { class: "vuefinder__treesubfolderlist__item-content" }, Yf = ["onClick"], Xf = ["title", "onClick"], Jf = { class: "vuefinder__treesubfolderlist__item-icon" }, Qf = { class: "vuefinder__treesubfolderlist__subfolder" }, Zf = {
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
    const e = ae("ServiceContainer"), n = C([]), r = t, s = C(null);
    Ce(() => {
      r.path === r.adapter + "://" && et(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const i = ct(() => {
      var c;
      return ((c = e.treeViewData.find((d) => d.path === r.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, d) => {
      const l = lr("TreeSubfolderList", !0);
      return v(), h("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (v(!0), h(ye, null, xe(i.value, (u, m) => (v(), h("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          a("div", Wf, [
            a("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (_) => n.value[u.path] = !n.value[u.path]
            }, [
              q(Xo, {
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
                o(e).fs.path === u.path ? (v(), W(o(jo), { key: 0 })) : (v(), W(o(mn), { key: 1 }))
              ]),
              a("div", {
                class: _e(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(e).fs.path === u.path
                }])
              }, b(u.basename), 3)
            ], 8, Xf)
          ]),
          a("div", Qf, [
            me(q(l, {
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
}, em = { class: "vuefinder__treestorageitem__loader" }, tm = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = ae("ServiceContainer"), n = C(!1);
    return (r, s) => (v(), h(ye, null, [
      a("div", {
        onClick: s[1] || (s[1] = (i) => n.value = !n.value),
        class: "vuefinder__treestorageitem__header"
      }, [
        a("div", {
          class: _e(["vuefinder__treestorageitem__info", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          a("div", {
            class: _e(["vuefinder__treestorageitem__icon", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            q(o(Go))
          ], 2),
          a("div", null, b(t.storage), 1)
        ], 2),
        a("div", em, [
          q(Xo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: n.value,
            "onUpdate:modelValue": s[0] || (s[0] = (i) => n.value = i)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      me(q(Zf, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [qe, n.value]
      ])
    ], 64));
  }
}, nm = { class: "vuefinder__folder-indicator" }, sm = { class: "vuefinder__folder-indicator--icon" }, om = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Us(t, "modelValue");
    return (n, r) => (v(), h("div", nm, [
      a("div", sm, [
        e.value ? (v(), W(o(Wo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : P("", !0),
        e.value ? P("", !0) : (v(), W(o(Ko), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, rm = { class: "vuefinder__treeview__header" }, am = { class: "vuefinder__treeview__pinned-label" }, lm = { class: "vuefinder__treeview__pin-text text-nowrap" }, im = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, cm = { class: "vuefinder__treeview__pinned-item" }, dm = ["onClick"], um = ["title"], _m = ["onClick"], vm = { key: 0 }, fm = { class: "vuefinder__treeview__no-pinned" }, mm = { class: "vuefinder__treeview__storage" }, pm = {
  __name: "TreeView",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, { getStore: r, setStore: s } = e.storage, i = C(190), c = C(r("pinned-folders-opened", !0));
    Be(c, (m) => s("pinned-folders-opened", m));
    const d = (m) => {
      e.pinnedFolders = e.pinnedFolders.filter((_) => _.path !== m.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, l = (m) => {
      const _ = m.clientX, p = m.target.parentElement, f = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const g = (w) => {
        i.value = f + w.clientX - _, i.value < 50 && (i.value = 0, e.showTreeView = !1), i.value > 50 && (e.showTreeView = !0);
      }, $ = () => {
        const w = p.getBoundingClientRect();
        i.value = w.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", $);
      };
      window.addEventListener("mousemove", g), window.addEventListener("mouseup", $);
    }, u = C(null);
    return Ce(() => {
      et(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Be(e.fs.data, (m, _) => {
      const p = m.files.filter((f) => f.type === "dir");
      Yo(e.treeViewData, { path: e.fs.path, folders: p.map((f) => ({
        adapter: f.storage,
        path: f.path,
        basename: f.basename
      })) });
    }), (m, _) => (v(), h(ye, null, [
      a("div", {
        onClick: _[0] || (_[0] = (p) => o(e).showTreeView = !o(e).showTreeView),
        class: _e(["vuefinder__treeview__overlay", o(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      a("div", {
        style: rn(o(e).showTreeView ? "min-width:100px;max-width:75%; width: " + i.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        a("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          a("div", rm, [
            a("div", {
              onClick: _[2] || (_[2] = (p) => c.value = !c.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              a("div", am, [
                q(o(zo), { class: "vuefinder__treeview__pin-icon" }),
                a("div", lm, b(o(n)("Pinned Folders")), 1)
              ]),
              q(om, {
                modelValue: c.value,
                "onUpdate:modelValue": _[1] || (_[1] = (p) => c.value = p)
              }, null, 8, ["modelValue"])
            ]),
            c.value ? (v(), h("ul", im, [
              (v(!0), h(ye, null, xe(o(e).pinnedFolders, (p) => (v(), h("li", cm, [
                a("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (f) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: p.storage, path: p.path } })
                }, [
                  o(e).fs.path !== p.path ? (v(), W(o(mn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : P("", !0),
                  o(e).fs.path === p.path ? (v(), W(o(jo), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : P("", !0),
                  a("div", {
                    title: p.path,
                    class: _e(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": o(e).fs.path === p.path
                    }])
                  }, b(p.basename), 11, um)
                ], 8, dm),
                a("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (f) => d(p)
                }, [
                  q(o(Rf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, _m)
              ]))), 256)),
              o(e).pinnedFolders.length ? P("", !0) : (v(), h("li", vm, [
                a("div", fm, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : P("", !0)
          ]),
          (v(!0), h(ye, null, xe(o(e).fs.data.storages, (p) => (v(), h("div", mm, [
            q(tm, { storage: p }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        a("div", {
          onMousedown: l,
          class: _e([(o(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, hm = { class: "vuefinder__main__content" }, gm = {
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
    const n = e, s = Aa(t, ae("VueFinderOptions"));
    ir("ServiceContainer", s);
    const { setStore: i } = s.storage, c = C(null);
    s.root = c;
    const d = s.dragSelect;
    Oi(s);
    const l = (m) => {
      Object.assign(s.fs.data, m), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return s.emitter.on("vf-fetch-abort", () => {
      u.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: m, body: _ = null, onSuccess: p = null, onError: f = null, noCloseModal: g = !1 }) => {
      ["index", "search"].includes(m.q) && (u && u.abort(), s.fs.loading = !0), u = new AbortController();
      const $ = u.signal;
      s.requester.send({
        url: "",
        method: m.m || "get",
        params: m,
        body: _,
        abortSignal: $
      }).then((w) => {
        s.fs.adapter = w.adapter, s.persist && (s.fs.path = w.dirname, i("path", s.fs.path)), ["index", "search"].includes(m.q) && (s.fs.loading = !1), g || s.modal.close(), l(w), p && p(w);
      }).catch((w) => {
        console.error(w), f && f(w);
      });
    }), Ce(() => {
      let m = {};
      s.fs.path.includes("://") && (m = {
        adapter: s.fs.path.split("://")[0],
        path: s.fs.path
      }), s.emitter.emit("vf-fetch", { params: { q: "index", adapter: s.fs.adapter, ...m } }), d.onSelect((_) => {
        n("select", _);
      });
    }), (m, _) => (v(), h("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: c,
      tabindex: "0"
    }, [
      a("div", {
        class: _e(o(s).theme.actualValue)
      }, [
        a("div", {
          class: _e([o(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: rn(o(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: _[0] || (_[0] = (p) => o(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: _[1] || (_[1] = (p) => o(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          q(Fd),
          q(v_),
          a("div", hm, [
            q(pm),
            q(ef)
          ]),
          q(Sf)
        ], 38),
        q(cr, { name: "fade" }, {
          default: ne(() => [
            o(s).modal.visible ? (v(), W(Is(o(s).modal.type), { key: 0 })) : P("", !0)
          ]),
          _: 1
        }),
        q(sf)
      ], 2)
    ], 512));
  }
}, Am = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", gm);
  }
};
export {
  Am as default
};
