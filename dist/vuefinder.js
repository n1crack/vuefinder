var er = Object.defineProperty;
var tr = (t, e, n) => e in t ? er(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var vs = (t, e, n) => tr(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as yt, watch as He, ref as T, shallowRef as nr, onMounted as Se, onUnmounted as jn, onUpdated as Ls, nextTick as ct, computed as rt, inject as re, openBlock as v, createElementBlock as g, withKeys as kt, unref as o, createElementVNode as r, withModifiers as st, renderSlot as Mt, normalizeClass as le, toDisplayString as b, createBlock as W, resolveDynamicComponent as Fs, withCtx as Q, createVNode as z, Fragment as ge, renderList as xe, createCommentVNode as q, withDirectives as ue, vModelCheckbox as zt, createTextVNode as J, vModelSelect as En, vModelText as xt, onBeforeUnmount as Hs, customRef as sr, vShow as Ue, isRef as or, TransitionGroup as rr, normalizeStyle as rn, mergeModels as lr, useModel as Rs, resolveComponent as ar, provide as ir, Transition as cr } from "vue";
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
    const n = this.config, l = {};
    yn != null && yn !== "" && (l[n.xsrfHeaderName] = yn);
    const s = Object.assign({}, n.headers, l, e.headers), c = Object.assign({}, n.params, e.params), i = e.body, d = n.baseUrl + e.url, a = e.method;
    let u;
    a !== "get" && (i instanceof FormData ? (u = i, n.body != null && Object.entries(this.config.body).forEach(([_, p]) => {
      u.append(_, p);
    })) : (u = { ...i }, n.body != null && Object.assign(u, this.config.body)));
    const f = {
      url: d,
      method: a,
      headers: s,
      params: c,
      body: u
    };
    if (n.transformRequest != null) {
      const _ = n.transformRequest({
        url: d,
        method: a,
        headers: s,
        params: c,
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
    const l = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: n.path }
    });
    return l.url + "?" + new URLSearchParams(l.params).toString();
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
    const l = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: n.path }
    });
    return l.url + "?" + new URLSearchParams(l.params).toString();
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
    const n = this.transformRequestParams(e), l = e.responseType || "json", s = {
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
      return await i[l]();
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
  He(n, l);
  function l() {
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
function wr(t, e, n, l) {
  const { getStore: s, setStore: c } = t, i = T({}), d = T(s("locale", e)), a = (_, p = e) => {
    br(_, l).then((m) => {
      i.value = m, c("locale", _), d.value = _, c("translations", m), Object.values(l).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + _ }), n.emit("vf-language-saved"));
    }).catch((m) => {
      p ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), a(p, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  He(d, (_) => {
    a(_);
  }), !s("locale") && !l.length ? a(e) : i.value = s("translations");
  const u = (_, ...p) => p.length ? u(_ = _.replace("%s", p.shift()), ...p) : _;
  function f(_, ...p) {
    return i.value && i.value.hasOwnProperty(_) ? u(i.value[_], ...p) : u(_, ...p);
  }
  return yt({ t: f, locale: d });
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
}, yr = Object.values(de), kr = "2.5.16";
function Bs(t, e, n, l, s) {
  return (e = Math, n = e.log, l = 1024, s = n(t) / n(l) | 0, t / e.pow(l, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Is(t, e, n, l, s) {
  return (e = Math, n = e.log, l = 1e3, s = n(t) / n(l) | 0, t / e.pow(l, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function xr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return l[1] * Math.pow(1024, e[l[2].toLowerCase()]);
}
const tt = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Sr(t, e) {
  const n = T(tt.SYSTEM), l = T(tt.LIGHT);
  n.value = t.getStore("theme", e ?? tt.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    n.value === tt.DARK || n.value === tt.SYSTEM && i.matches ? l.value = tt.DARK : l.value = tt.LIGHT;
  };
  return c(s), s.addEventListener("change", c), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: n,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: l,
    /**
     * @param {Theme} value
     */
    set(i) {
      n.value = i, i !== tt.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(s);
    }
  };
}
function $r() {
  const t = nr(null), e = T(!1), n = T();
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
const De = (t, e) => {
  const { o: n, i: l, u: s } = t;
  let c = n, i;
  const d = (f, _) => {
    const p = c, m = f, h = _ || (l ? !l(p, m) : p !== m);
    return (h || s) && (c = m, i = p), [c, h, i];
  };
  return [e ? (f) => d(e(c, i), f) : d, (f) => [c, !!f, i]];
}, Cr = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Te = Cr ? window : {}, Ns = Math.max, Er = Math.min, An = Math.round, Jt = Math.abs, _s = Math.sign, Us = Te.cancelAnimationFrame, Gn = Te.requestAnimationFrame, Zt = Te.setTimeout, Mn = Te.clearTimeout, ln = (t) => typeof Te[t] < "u" ? Te[t] : void 0, Ar = ln("MutationObserver"), fs = ln("IntersectionObserver"), Qt = ln("ResizeObserver"), Kt = ln("ScrollTimeline"), Kn = (t) => t === void 0, an = (t) => t === null, ze = (t) => typeof t == "number", Ot = (t) => typeof t == "string", Wn = (t) => typeof t == "boolean", Re = (t) => typeof t == "function", Pe = (t) => Array.isArray(t), en = (t) => typeof t == "object" && !Pe(t) && !an(t), Yn = (t) => {
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
const qs = (t, e) => t.indexOf(e) >= 0, Tt = (t, e) => t.concat(e), me = (t, e, n) => (!Ot(e) && Yn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), lt = (t) => Array.from(t || []), Xn = (t) => Pe(t) ? t : !Ot(t) && Yn(t) ? lt(t) : [t], Tn = (t) => !!t && !t.length, Dn = (t) => lt(new Set(t)), Le = (t, e, n) => {
  ae(t, (s) => s ? s.apply(void 0, e || []) : !0), !n && (t.length = 0);
}, zs = "paddingTop", Ps = "paddingRight", js = "paddingLeft", Gs = "paddingBottom", Ks = "marginLeft", Ws = "marginRight", Ys = "marginBottom", Xs = "overflowX", Js = "overflowY", dn = "width", un = "height", nt = "visible", it = "hidden", gt = "scroll", Mr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, vn = (t, e, n, l) => {
  if (t && e) {
    let s = !0;
    return ae(n, (c) => {
      const i = t[c], d = e[c];
      i !== d && (s = !1);
    }), s;
  }
  return !1;
}, Zs = (t, e) => vn(t, e, ["w", "h"]), Wt = (t, e) => vn(t, e, ["x", "y"]), Tr = (t, e) => vn(t, e, ["t", "r", "b", "l"]), dt = () => {
}, X = (t, ...e) => t.bind(0, ...e), ft = (t) => {
  let e;
  const n = t ? Zt : Gn, l = t ? Mn : Us;
  return [(s) => {
    l(e), e = n(() => s(), Re(t) ? t() : t);
  }, () => l(e)];
}, Vn = (t, e) => {
  const { _: n, v: l, p: s, S: c } = e || {};
  let i, d, a, u, f = dt;
  const _ = function(w) {
    f(), Mn(i), u = i = d = void 0, f = dt, t.apply(this, w);
  }, p = (S) => c && d ? c(d, S) : S, m = () => {
    f !== dt && _(p(a) || a);
  }, h = function() {
    const w = lt(arguments), D = Re(n) ? n() : n;
    if (ze(D) && D >= 0) {
      const A = Re(l) ? l() : l, $ = ze(A) && A >= 0, V = D > 0 ? Zt : Gn, L = D > 0 ? Mn : Us, O = p(w) || w, k = _.bind(0, O);
      let y;
      f(), s && !u ? (k(), u = !0, y = V(() => u = void 0, D)) : (y = V(k, D), $ && !i && (i = Zt(m, A))), f = () => L(y), d = a = O;
    } else
      _(w);
  };
  return h.m = m, h;
}, Qs = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Be = (t) => t ? Object.keys(t) : [], oe = (t, e, n, l, s, c, i) => {
  const d = [e, n, l, s, c, i];
  return (typeof t != "object" || an(t)) && !Re(t) && (t = {}), ae(d, (a) => {
    ae(a, (u, f) => {
      const _ = a[f];
      if (t === _)
        return !0;
      const p = Pe(_);
      if (_ && tn(_)) {
        const m = t[f];
        let h = m;
        p && !Pe(m) ? h = [] : !p && !tn(m) && (h = {}), t[f] = oe(h, _);
      } else
        t[f] = p ? _.slice() : _;
    });
  }), t;
}, eo = (t, e) => ae(oe({}, t), (n, l, s) => {
  n === void 0 ? delete s[l] : n && tn(n) && (s[l] = eo(n));
}), Jn = (t) => !Be(t).length, to = (t, e, n) => Ns(t, Er(e, n)), ut = (t) => Dn((Pe(t) ? t : (t || "").split(" ")).filter((e) => e)), Zn = (t, e) => t && t.getAttribute(e), ms = (t, e) => t && t.hasAttribute(e), Xe = (t, e, n) => {
  ae(ut(e), (l) => {
    t && t.setAttribute(l, String(n || ""));
  });
}, Ne = (t, e) => {
  ae(ut(e), (n) => t && t.removeAttribute(n));
}, _n = (t, e) => {
  const n = ut(Zn(t, e)), l = X(Xe, t, e), s = (c, i) => {
    const d = new Set(n);
    return ae(ut(c), (a) => {
      d[i](a);
    }), lt(d).join(" ");
  };
  return {
    O: (c) => l(s(c, "delete")),
    $: (c) => l(s(c, "add")),
    C: (c) => {
      const i = ut(c);
      return i.reduce((d, a) => d && n.includes(a), i.length > 0);
    }
  };
}, no = (t, e, n) => (_n(t, e).O(n), X(Qn, t, e, n)), Qn = (t, e, n) => (_n(t, e).$(n), X(no, t, e, n)), sn = (t, e, n, l) => (l ? Qn : no)(t, e, n), es = (t, e, n) => _n(t, e).C(n), so = (t) => _n(t, "class"), oo = (t, e) => {
  so(t).O(e);
}, ts = (t, e) => (so(t).$(e), X(oo, t, e)), ro = (t, e) => {
  const n = e ? cn(e) && e : document;
  return n ? lt(n.querySelectorAll(t)) : [];
}, Dr = (t, e) => {
  const n = e ? cn(e) && e : document;
  return n && n.querySelector(t);
}, On = (t, e) => cn(t) && t.matches(e), lo = (t) => On(t, "body"), Ln = (t) => t ? lt(t.childNodes) : [], Dt = (t) => t && t.parentElement, mt = (t, e) => cn(t) && t.closest(e), Fn = (t) => document.activeElement, Vr = (t, e, n) => {
  const l = mt(t, e), s = t && Dr(n, l), c = mt(s, e) === l;
  return l && s ? l === t || s === t || c && mt(mt(t, n), e) !== l : !1;
}, bt = (t) => {
  ae(Xn(t), (e) => {
    const n = Dt(e);
    e && n && n.removeChild(e);
  });
}, Ve = (t, e) => X(bt, t && e && ae(Xn(e), (n) => {
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
  t && e && ae(e, (n, l) => {
    try {
      const s = t.style, c = an(n) || Wn(n) ? "" : ze(n) ? co(n) : n;
      l.indexOf("--") === 0 ? s.setProperty(l, c) : s[l] = c;
    } catch {
    }
  });
}
function Ze(t, e, n) {
  const l = Ot(e);
  let s = l ? "" : {};
  if (t) {
    const c = Te.getComputedStyle(t, n) || t.style;
    s = l ? ps(c, e) : lt(e).reduce((i, d) => (i[d] = ps(c, d), i), s);
  }
  return s;
}
const hs = (t, e, n) => {
  const l = e ? `${e}-` : "", s = n ? `-${n}` : "", c = `${l}top${s}`, i = `${l}right${s}`, d = `${l}bottom${s}`, a = `${l}left${s}`, u = Ze(t, [c, i, d, a]);
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
} : Fr, Hr = (t) => fn("inner", t || Te), ht = X(fn, "offset"), uo = X(fn, "client"), on = X(fn, "scroll"), ns = (t) => {
  const e = parseFloat(Ze(t, dn)) || 0, n = parseFloat(Ze(t, un)) || 0;
  return {
    w: e - An(e),
    h: n - An(n)
  };
}, kn = (t) => t.getBoundingClientRect(), Rr = (t) => !!t && Lr(t), Rn = (t) => !!(t && (t[un] || t[dn])), vo = (t, e) => {
  const n = Rn(t);
  return !Rn(e) && n;
}, gs = (t, e, n, l) => {
  ae(ut(e), (s) => {
    t && t.removeEventListener(s, n, l);
  });
}, ve = (t, e, n, l) => {
  var s;
  const c = (s = l && l.H) != null ? s : !0, i = l && l.I || !1, d = l && l.A || !1, a = {
    passive: c,
    capture: i
  };
  return X(Le, ut(e).map((u) => {
    const f = d ? (_) => {
      gs(t, u, f, i), n && n(_);
    } : n;
    return t && t.addEventListener(u, f, a), X(gs, t, u, f, i);
  }));
}, _o = (t) => t.stopPropagation(), Bn = (t) => t.preventDefault(), fo = (t) => _o(t) || Bn(t), qe = (t, e) => {
  const { x: n, y: l } = ze(e) ? {
    x: e,
    y: e
  } : e || {};
  ze(n) && (t.scrollLeft = n), ze(l) && (t.scrollTop = l);
}, Oe = (t) => ({
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
  const { D: n, M: l } = t, { w: s, h: c } = e, i = (_, p, m) => {
    let h = _s(_) * m, S = _s(p) * m;
    if (h === S) {
      const w = Jt(_), D = Jt(p);
      S = w > D ? 0 : S, h = w < D ? 0 : h;
    }
    return h = h === S ? 0 : h, [h + 0, S + 0];
  }, [d, a] = i(n.x, l.x, s), [u, f] = i(n.y, l.y, c);
  return {
    D: {
      x: d,
      y: u
    },
    M: {
      x: a,
      y: f
    }
  };
}, bs = ({ D: t, M: e }) => {
  const n = (l, s) => l === 0 && l <= s;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, ws = ({ D: t, M: e }, n) => {
  const l = (s, c, i) => to(0, 1, (s - i) / (s - c) || 0);
  return {
    x: l(t.x, e.x, n.x),
    y: l(t.y, e.y, n.y)
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
  }, l = (c, i) => {
    if (Ot(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), ys((f) => {
        Re(f) && u.add(f);
      }, i), X(n, c, i);
    }
    Wn(i) && i && n();
    const d = Be(c), a = [];
    return ae(d, (u) => {
      const f = c[u];
      f && me(a, l(u, f));
    }), X(Le, a);
  }, s = (c, i) => {
    ae(lt(e.get(c)), (d) => {
      i && !Tn(i) ? d.apply(0, i) : d();
    });
  };
  return l(t || {}), [l, n, s];
}, ks = (t) => JSON.stringify(t, (e, n) => {
  if (Re(n))
    throw 0;
  return n;
}), xs = (t, e) => t ? `${e}`.split(".").reduce((n, l) => n && Qs(n, l) ? n[l] : void 0, t) : void 0, Ir = {
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
  const n = {}, l = Tt(Be(e), Be(t));
  return ae(l, (s) => {
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
}, Ss = (t, e, n) => (l) => [xs(t, l), n || xs(e, l) !== void 0], St = "data-overlayscrollbars", Yt = "os-environment", jt = `${Yt}-scrollbar-hidden`, xn = `${St}-initialize`, Xt = "noClipping", $s = `${St}-body`, ot = St, Nr = "host", Je = `${St}-viewport`, Ur = Xs, qr = Js, zr = "arrange", ho = "measuring", Pr = "scrolling", go = "scrollbarHidden", jr = "noContent", Un = `${St}-padding`, Cs = `${St}-content`, ss = "os-size-observer", Gr = `${ss}-appear`, Kr = `${ss}-listener`, Wr = "os-trinsic-observer", Yr = "os-theme-none", Fe = "os-scrollbar", Xr = `${Fe}-rtl`, Jr = `${Fe}-horizontal`, Zr = `${Fe}-vertical`, bo = `${Fe}-track`, os = `${Fe}-handle`, Qr = `${Fe}-visible`, el = `${Fe}-cornerless`, Es = `${Fe}-interaction`, As = `${Fe}-unusable`, qn = `${Fe}-auto-hide`, Ms = `${qn}-hidden`, Ts = `${Fe}-wheel`, tl = `${bo}-interactive`, nl = `${os}-interactive`;
let wo;
const sl = () => wo, ol = (t) => {
  wo = t;
};
let Sn;
const rl = () => {
  const t = ($, V, L) => {
    Ve(document.body, $), Ve(document.body, $);
    const P = uo($), O = ht($), k = ns(V);
    return L && bt($), {
      x: O.h - P.h + k.h,
      y: O.w - P.w + k.w
    };
  }, e = ($) => {
    let V = !1;
    const L = ts($, jt);
    try {
      V = Ze($, "scrollbar-width") === "none" || Ze($, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return L(), V;
  }, n = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${jt}{scrollbar-width:none!important}.${jt}::-webkit-scrollbar,.${jt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = ao(`<div class="${Yt}"><div></div><style>${n}</style></div>`)[0], c = s.firstChild, i = s.lastChild, d = sl();
  d && (i.nonce = d);
  const [a, , u] = Nn(), [f, _] = De({
    o: t(s, c),
    i: Wt
  }, X(t, s, c, !0)), [p] = _(), m = e(s), h = {
    x: p.x === 0,
    y: p.y === 0
  }, S = {
    elements: {
      host: null,
      padding: !m,
      viewport: ($) => m && lo($) && $,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, w = oe({}, Ir), D = X(oe, {}, w), R = X(oe, {}, S), A = {
    T: p,
    k: h,
    R: m,
    V: !!Kt,
    L: X(a, "r"),
    U: R,
    P: ($) => oe(S, $) && R(),
    N: D,
    q: ($) => oe(w, $) && D(),
    B: oe({}, S),
    F: oe({}, w)
  };
  if (Ne(s, "style"), bt(s), ve(Te, "resize", () => {
    u("r", []);
  }), Re(Te.matchMedia) && !m && (!h.x || !h.y)) {
    const $ = (V) => {
      const L = Te.matchMedia(`(resolution: ${Te.devicePixelRatio}dppx)`);
      ve(L, "change", () => {
        V(), $(V);
      }, {
        A: !0
      });
    };
    $(() => {
      const [V, L] = f();
      oe(A.T, V), u("r", [L]);
    });
  }
  return A;
}, Ge = () => (Sn || (Sn = rl()), Sn), yo = (t, e) => Re(e) ? e.apply(0, t) : e, ll = (t, e, n, l) => {
  const s = Kn(l) ? n : l;
  return yo(t, s) || e.apply(0, t);
}, ko = (t, e, n, l) => {
  const s = Kn(l) ? n : l, c = yo(t, s);
  return !!c && (nn(c) ? c : e.apply(0, t));
}, al = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: l } = e || {}, { k: s, R: c, U: i } = Ge(), { nativeScrollbarsOverlaid: d, body: a } = i().cancel, u = n ?? d, f = Kn(l) ? a : l, _ = (s.x || s.y) && u, p = t && (an(f) ? !c : f);
  return !!_ || !!p;
}, rs = /* @__PURE__ */ new WeakMap(), il = (t, e) => {
  rs.set(t, e);
}, cl = (t) => {
  rs.delete(t);
}, xo = (t) => rs.get(t), dl = (t, e, n) => {
  let l = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    l = !0;
  }, i = (d) => {
    if (s && n) {
      const a = n.map((u) => {
        const [f, _] = u || [];
        return [_ && f ? (d || ro)(f, t) : [], _];
      });
      ae(a, (u) => ae(u[0], (f) => {
        const _ = u[1], p = s.get(f) || [];
        if (t.contains(f) && _) {
          const h = ve(f, _, (S) => {
            l ? (h(), s.delete(f)) : e(S);
          });
          s.set(f, me(p, h));
        } else
          Le(p), s.delete(f);
      }));
    }
  };
  return i(), [c, i];
}, Ds = (t, e, n, l) => {
  let s = !1;
  const { j: c, X: i, Y: d, W: a, J: u, G: f } = l || {}, _ = Vn(() => s && n(!0), {
    _: 33,
    v: 99
  }), [p, m] = dl(t, _, d), h = c || [], S = i || [], w = Tt(h, S), D = (A, $) => {
    if (!Tn($)) {
      const V = u || dt, L = f || dt, P = [], O = [];
      let k = !1, y = !1;
      if (ae($, (C) => {
        const { attributeName: E, target: B, type: x, oldValue: N, addedNodes: U, removedNodes: ee } = C, se = x === "attributes", ne = x === "childList", pe = t === B, F = se && E, H = F && Zn(B, E || ""), I = Ot(H) ? H : null, j = F && N !== I, M = qs(S, E) && j;
        if (e && (ne || !pe)) {
          const K = se && j, G = K && a && On(B, a), te = (G ? !V(B, E, N, I) : !se || K) && !L(C, !!G, t, l);
          ae(U, (ie) => me(P, ie)), ae(ee, (ie) => me(P, ie)), y = y || te;
        }
        !e && pe && j && !V(B, E, N, I) && (me(O, E), k = k || M);
      }), m((C) => Dn(P).reduce((E, B) => (me(E, ro(C, B)), On(B, C) ? me(E, B) : E), [])), e)
        return !A && y && n(!1), [!1];
      if (!Tn(O) || k) {
        const C = [Dn(O), k];
        return !A && n.apply(0, C), C;
      }
    }
  }, R = new Ar(X(D, !1));
  return [() => (R.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: w,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (p(), R.disconnect(), s = !1);
  }), () => {
    if (s)
      return _.m(), D(!0, R.takeRecords());
  }];
}, So = {}, $o = {}, ul = (t) => {
  ae(t, (e) => ae(e, (n, l) => {
    So[l] = e[l];
  }));
}, Co = (t, e, n) => Be(t).map((l) => {
  const { static: s, instance: c } = t[l], [i, d, a] = n || [], u = n ? c : s;
  if (u) {
    const f = n ? u(i, d, e) : u(e);
    return (a || $o)[l] = f;
  }
}), Lt = (t) => $o[t], vl = "__osOptionsValidationPlugin", _l = "__osSizeObserverPlugin", fl = (t, e) => {
  const { k: n } = e, [l, s] = t("showNativeOverlaidScrollbars");
  return [l && n.x && n.y, s];
}, wt = (t) => t.indexOf(nt) === 0, ml = (t, e) => {
  const n = (s, c, i, d) => {
    const a = s === nt ? it : s.replace(`${nt}-`, ""), u = wt(s), f = wt(i);
    return !c && !d ? it : u && f ? nt : u ? c && d ? a : c ? nt : it : c ? a : f && d ? nt : it;
  }, l = {
    x: n(e.x, t.x, e.y, t.y),
    y: n(e.y, t.y, e.x, t.x)
  };
  return {
    K: l,
    Z: {
      x: l.x === gt,
      y: l.y === gt
    }
  };
}, Eo = "__osScrollbarsHidingPlugin", pl = "__osClickScrollPlugin", Ao = (t, e, n) => {
  const { dt: l } = n || {}, s = Lt(_l), [c] = De({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], a = ao(`<div class="${ss}"><div class="${Kr}"></div></div>`)[0], u = a.firstChild, f = (_) => {
      const p = _ instanceof ResizeObserverEntry;
      let m = !1, h = !1;
      if (p) {
        const [S, , w] = c(_.contentRect), D = Rn(S);
        h = vo(S, w), m = !h && !D;
      } else
        h = _ === !0;
      m || e({
        ft: !0,
        dt: h
      });
    };
    if (Qt) {
      const _ = new Qt((p) => f(p.pop()));
      _.observe(u), me(i, () => {
        _.disconnect();
      });
    } else if (s) {
      const [_, p] = s(u, f, l);
      me(i, Tt([ts(a, Gr), ve(a, "animationstart", _)], p));
    } else
      return dt;
    return X(Le, me(i, Ve(t, a)));
  };
}, hl = (t, e) => {
  let n;
  const l = (a) => a.h === 0 || a.isIntersecting || a.intersectionRatio > 0, s = pt(Wr), [c] = De({
    o: !1
  }), i = (a, u) => {
    if (a) {
      const f = c(l(a)), [, _] = f;
      return _ && !u && e(f) && [f];
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
        const f = ht(s);
        i(f);
      };
      me(a, Ao(s, u)()), u();
    }
    return X(Le, me(a, Ve(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, gl = (t, e, n, l) => {
  let s, c, i, d, a, u;
  const f = `[${ot}]`, _ = `[${Je}]`, p = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: m, ht: h, ot: S, gt: w, bt: D, nt: R, wt: A, yt: $, St: V, Ot: L } = t, P = (M) => Ze(M, "direction") === "rtl", O = {
    $t: !1,
    ct: P(m)
  }, k = Ge(), y = Lt(Eo), [C] = De({
    i: Zs,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const M = y && y.tt(t, e, O, k, n).ut, G = !(A && R) && es(h, ot, Xt), Y = !R && $(zr), te = Y && Oe(w), ie = te && L(), be = V(ho, G), _e = Y && M && M()[0], $e = on(S), Z = ns(S);
    return _e && _e(), qe(w, te), ie && ie(), G && be(), {
      w: $e.w + Z.w,
      h: $e.h + Z.h
    };
  }), E = Vn(l, {
    _: () => s,
    v: () => c,
    S(M, K) {
      const [G] = M, [Y] = K;
      return [Tt(Be(G), Be(Y)).reduce((te, ie) => (te[ie] = G[ie] || Y[ie], te), {})];
    }
  }), B = (M) => {
    const K = P(m);
    oe(M, {
      Ct: u !== K
    }), oe(O, {
      ct: K
    }), u = K;
  }, x = (M, K) => {
    const [G, Y] = M, te = {
      xt: Y
    };
    return oe(O, {
      $t: G
    }), !K && l(te), te;
  }, N = ({ ft: M, dt: K }) => {
    const Y = !(M && !K) && k.R ? E : l, te = {
      ft: M || K,
      dt: K
    };
    B(te), Y(te);
  }, U = (M, K) => {
    const [, G] = C(), Y = {
      Ht: G
    };
    return B(Y), G && !K && (M ? l : E)(Y), Y;
  }, ee = (M, K, G) => {
    const Y = {
      Et: K
    };
    return B(Y), K && !G && E(Y), Y;
  }, [se, ne] = D ? hl(h, x) : [], pe = !R && Ao(h, N, {
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
    l({
      Ht: M
    });
  }, {
    _: 222,
    p: !0
  });
  return [() => {
    I && I.observe(h);
    const M = pe && pe(), K = se && se(), G = F(), Y = k.L((te) => {
      te ? E({
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
      const [he, we] = Ds(D || S, !0, U, {
        j: Tt(p, ie || []),
        Y: _e,
        W: f,
        G: (ce, fe) => {
          const { target: ke, attributeName: Me } = ce;
          return (!fe && Me && !R ? Vr(ke, f, _) : !1) || !!mt(ke, `.${Fe}`) || !!Ee(ce);
        }
      });
      d = he(), i = we;
    }
    if (Ce)
      if (E.m(), Pe(Z)) {
        const he = Z[0], we = Z[1];
        s = ze(he) && he, c = ze(we) && we;
      } else ze(Z) ? (s = Z, c = !1) : (s = !1, c = !1);
    if (ye) {
      const he = H(), we = ne && ne(), ce = i && i();
      he && oe(Y, ee(he[0], he[1], ye)), we && oe(Y, x(we[0], ye)), ce && oe(Y, U(ce[0], ye));
    }
    return B(Y), Y;
  }, O];
}, bl = (t, e, n, l) => {
  const s = "--os-viewport-percent", c = "--os-scroll-percent", i = "--os-scroll-direction", { U: d } = Ge(), { scrollbars: a } = d(), { slot: u } = a, { vt: f, ht: _, ot: p, Mt: m, gt: h, wt: S, nt: w } = e, { scrollbars: D } = m ? {} : t, { slot: R } = D || {}, A = [], $ = [], V = [], L = ko([f, _, p], () => w && S ? f : _, u, R), P = (F) => {
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
  }, k = () => {
    const { Rt: F, Vt: H } = n, I = (j, M) => to(0, 1, j / (j + M) || 0);
    return {
      x: I(H.x, F.x),
      y: I(H.y, F.y)
    };
  }, y = (F, H, I) => {
    const j = I ? ts : oo;
    ae(F, (M) => {
      j(M.Tt, H);
    });
  }, C = (F, H) => {
    ae(F, (I) => {
      const [j, M] = H(I);
      Vt(j, M);
    });
  }, E = (F, H, I) => {
    const j = Wn(I), M = j ? I : !0, K = j ? !I : !0;
    M && y($, F, H), K && y(V, F, H);
  }, B = () => {
    const F = k(), H = (I) => (j) => [j.Tt, {
      [s]: Hn(I) + ""
    }];
    C($, H(F.x)), C(V, H(F.y));
  }, x = () => {
    if (!Kt) {
      const { Lt: F } = n, H = ws(F, Oe(h)), I = (j) => (M) => [M.Tt, {
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
    if (w && !S) {
      const { Rt: F, Lt: H } = n, I = bs(H), j = ws(H, Oe(h)), M = (K) => {
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
    const H = F ? "x" : "y", j = pt(`${Fe} ${F ? Jr : Zr}`), M = pt(bo), K = pt(os), G = {
      Tt: j,
      Ut: M,
      Pt: K
    }, Y = O[H];
    return me(F ? $ : V, G), me(A, [Ve(j, M), Ve(M, K), X(bt, j), Y && Y.kt(G), l(G, E, F)]), G;
  }, se = X(ee, !0), ne = X(ee, !1), pe = () => (Ve(L, $[0].Tt), Ve(L, V[0].Tt), X(Le, A));
  return se(), ne(), [{
    Nt: B,
    qt: x,
    Bt: N,
    Ft: U,
    jt: E,
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
}, wl = (t, e, n, l) => (s, c, i) => {
  const { ht: d, ot: a, nt: u, gt: f, Kt: _, Ot: p } = e, { Tt: m, Ut: h, Pt: S } = s, [w, D] = ft(333), [R, A] = ft(444), $ = (P) => {
    Re(f.scrollBy) && f.scrollBy({
      behavior: "smooth",
      left: P.x,
      top: P.y
    });
  }, V = () => {
    const P = "pointerup pointercancel lostpointercapture", O = `client${i ? "X" : "Y"}`, k = i ? dn : un, y = i ? "left" : "top", C = i ? "w" : "h", E = i ? "x" : "y", B = (N, U) => (ee) => {
      const { Rt: se } = n, ne = ht(h)[C] - ht(S)[C], F = U * ee / ne * se[E];
      qe(f, {
        [E]: N + F
      });
    }, x = [];
    return ve(h, "pointerdown", (N) => {
      const U = mt(N.target, `.${os}`) === S, ee = U ? S : h, se = t.scrollbars, ne = se[U ? "dragScroll" : "clickScroll"], { button: pe, isPrimary: F, pointerType: H } = N, { pointers: I } = se;
      if (pe === 0 && F && ne && (I || []).includes(H)) {
        Le(x), A();
        const M = !U && (N.shiftKey || ne === "instant"), K = X(kn, S), G = X(kn, h), Y = (fe, ke) => (fe || K())[y] - (ke || G())[y], te = An(kn(f)[k]) / ht(f)[C] || 1, ie = B(Oe(f)[E], 1 / te), be = N[O], _e = K(), $e = G(), Z = _e[k], Ce = Y(_e, $e) + Z / 2, Ae = be - $e[y], ye = U ? 0 : Ae - Ce, Ee = (fe) => {
          Le(ce), ee.releasePointerCapture(fe.pointerId);
        }, he = U || M, we = p(), ce = [ve(_, P, Ee), ve(_, "selectstart", (fe) => Bn(fe), {
          H: !1
        }), ve(h, P, Ee), he && ve(h, "pointermove", (fe) => ie(ye + (fe[O] - be))), he && (() => {
          const fe = Oe(f);
          we();
          const ke = Oe(f), Me = {
            x: ke.x - fe.x,
            y: ke.y - fe.y
          };
          (Jt(Me.x) > 3 || Jt(Me.y) > 3) && (p(), qe(f, fe), $(Me), R(we));
        })];
        if (ee.setPointerCapture(N.pointerId), M)
          ie(ye);
        else if (!U) {
          const fe = Lt(pl);
          if (fe) {
            const ke = fe(ie, ye, Z, (Me) => {
              Me ? we() : me(ce, we);
            });
            me(ce, ke), me(x, X(ke, !0));
          }
        }
      }
    });
  };
  let L = !0;
  return X(Le, [ve(S, "pointermove pointerleave", l), ve(m, "pointerenter", () => {
    c(Es, !0);
  }), ve(m, "pointerleave pointercancel", () => {
    c(Es, !1);
  }), !u && ve(m, "mousedown", () => {
    const P = Fn();
    (ms(P, Je) || ms(P, ot) || P === document.body) && Zt(X(In, a), 25);
  }), ve(m, "wheel", (P) => {
    const { deltaX: O, deltaY: k, deltaMode: y } = P;
    L && y === 0 && Dt(m) === d && $({
      x: O,
      y: k
    }), L = !1, c(Ts, !0), w(() => {
      L = !0, c(Ts);
    }), Bn(P);
  }, {
    H: !1,
    I: !0
  }), ve(m, "pointerdown", X(ve, _, "click", fo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), V(), D, A]);
}, yl = (t, e, n, l, s, c) => {
  let i, d, a, u, f, _ = dt, p = 0;
  const m = (F) => F.pointerType === "mouse", [h, S] = ft(), [w, D] = ft(100), [R, A] = ft(100), [$, V] = ft(() => p), [L, P] = bl(t, s, l, wl(e, s, l, (F) => m(F) && ee())), { ht: O, Qt: k, wt: y } = s, { jt: C, Nt: E, qt: B, Bt: x, Ft: N } = L, U = (F, H) => {
    if (V(), F)
      C(Ms);
    else {
      const I = X(C, Ms, !0);
      p > 0 && !H ? $(I) : I();
    }
  }, ee = () => {
    (a ? !i : !u) && (U(!0), w(() => {
      U(!1);
    }));
  }, se = (F) => {
    C(qn, F, !0), C(qn, F, !1);
  }, ne = (F) => {
    m(F) && (i = a, a && U(!0));
  }, pe = [V, D, A, S, () => _(), ve(O, "pointerover", ne, {
    A: !0
  }), ve(O, "pointerenter", ne), ve(O, "pointerleave", (F) => {
    m(F) && (i = !1, a && U(!1));
  }), ve(O, "pointermove", (F) => {
    m(F) && d && ee();
  }), ve(k, "scroll", (F) => {
    h(() => {
      B(), ee();
    }), c(F), N();
  })];
  return [() => X(Le, me(pe, P())), ({ It: F, Dt: H, Zt: I, tn: j }) => {
    const { nn: M, sn: K, en: G, cn: Y } = j || {}, { Ct: te, dt: ie } = I || {}, { ct: be } = n, { k: _e } = Ge(), { K: $e, rn: Z } = l, [Ce, Ae] = F("showNativeOverlaidScrollbars"), [ye, Ee] = F("scrollbars.theme"), [he, we] = F("scrollbars.visibility"), [ce, fe] = F("scrollbars.autoHide"), [ke, Me] = F("scrollbars.autoHideSuspend"), [$t] = F("scrollbars.autoHideDelay"), [Ft, Ht] = F("scrollbars.dragScroll"), [Rt, at] = F("scrollbars.clickScroll"), [vt, pn] = F("overflow"), hn = ie && !H, gn = Z.x || Z.y, bn = M || K || Y || te || H, Ie = G || we || pn, wn = Ce && _e.x && _e.y, Ct = (Et, et, Bt) => {
      const At = Et.includes(gt) && (he === nt || he === "auto" && et === gt);
      return C(Qr, At, Bt), At;
    };
    if (p = $t, hn && (ke && gn ? (se(!1), _(), R(() => {
      _ = ve(k, "scroll", X(se, !0), {
        A: !0
      });
    })) : se(!0)), Ae && C(Yr, wn), Ee && (C(f), C(ye, !0), f = ye), Me && !ke && se(!0), fe && (d = ce === "move", a = ce === "leave", u = ce === "never", U(u, !0)), Ht && C(nl, Ft), at && C(tl, !!Rt), Ie) {
      const Et = Ct(vt.x, $e.x, !0), et = Ct(vt.y, $e.y, !1);
      C(el, !(Et && et));
    }
    bn && (B(), E(), N(), Y && x(), C(As, !Z.x, !0), C(As, !Z.y, !1), C(Xr, be && !y));
  }, {}, L];
}, kl = (t) => {
  const e = Ge(), { U: n, R: l } = e, { elements: s } = n(), { padding: c, viewport: i, content: d } = s, a = nn(t), u = a ? {} : t, { elements: f } = u, { padding: _, viewport: p, content: m } = f || {}, h = a ? t : u.target, S = lo(h), w = h.ownerDocument, D = w.documentElement, R = () => w.defaultView || Te, A = X(ll, [h]), $ = X(ko, [h]), V = X(pt, ""), L = X(A, V, i), P = X($, V, d), O = (Z) => {
    const Ce = ht(Z), Ae = on(Z), ye = Ze(Z, Xs), Ee = Ze(Z, Js);
    return Ae.w - Ce.w > 0 && !wt(ye) || Ae.h - Ce.h > 0 && !wt(Ee);
  }, k = L(p), y = k === h, C = y && S, E = !y && P(m), B = !y && k === E, x = C ? D : k, N = C ? x : h, U = !y && $(V, c, _), ee = !B && E, se = [ee, x, U, N].map((Z) => nn(Z) && !Dt(Z) && Z), ne = (Z) => Z && qs(se, Z), pe = !ne(x) && O(x) ? x : h, F = C ? D : x, I = {
    vt: h,
    ht: N,
    ot: x,
    ln: U,
    bt: ee,
    gt: F,
    Qt: C ? w : x,
    an: S ? D : pe,
    Kt: w,
    wt: S,
    Mt: a,
    nt: y,
    un: R,
    yt: (Z) => es(x, Je, Z),
    St: (Z, Ce) => sn(x, Je, Z, Ce),
    Ot: () => sn(F, Je, Pr, !0)
  }, { vt: j, ht: M, ln: K, ot: G, bt: Y } = I, te = [() => {
    Ne(M, [ot, xn]), Ne(j, xn), S && Ne(D, [xn, ot]);
  }];
  let ie = Ln([Y, G, K, M, j].find((Z) => Z && !ne(Z)));
  const be = C ? j : Y || G, _e = X(Le, te);
  return [I, () => {
    const Z = R(), Ce = Fn(), Ae = (ce) => {
      Ve(Dt(ce), Ln(ce)), bt(ce);
    }, ye = (ce) => ve(ce, "focusin focusout focus blur", fo, {
      I: !0,
      H: !1
    }), Ee = "tabindex", he = Zn(G, Ee), we = ye(Ce);
    return Xe(M, ot, y ? "" : Nr), Xe(K, Un, ""), Xe(G, Je, ""), Xe(Y, Cs, ""), y || (Xe(G, Ee, he || "-1"), S && Xe(D, $s, "")), Ve(be, ie), Ve(M, K), Ve(K || M, !y && G), Ve(G, Y), me(te, [we, () => {
      const ce = Fn(), fe = ne(G), ke = fe && ce === G ? j : ce, Me = ye(ke);
      Ne(K, Un), Ne(Y, Cs), Ne(G, Je), S && Ne(D, $s), he ? Xe(G, Ee, he) : Ne(G, Ee), ne(Y) && Ae(Y), fe && Ae(G), ne(K) && Ae(K), In(ke), Me();
    }]), l && !y && (Qn(G, Je, go), me(te, X(Ne, G, Je))), In(!y && S && Ce === j && Z.top === Z ? G : Ce), we(), ie = 0, _e;
  }, _e];
}, xl = ({ bt: t }) => ({ Zt: e, _n: n, Dt: l }) => {
  const { xt: s } = e || {}, { $t: c } = n;
  t && (s || l) && Vt(t, {
    [un]: c && "100%"
  });
}, Sl = ({ ht: t, ln: e, ot: n, nt: l }, s) => {
  const [c, i] = De({
    i: Tr,
    o: hs()
  }, X(hs, t, "padding", ""));
  return ({ It: d, Zt: a, _n: u, Dt: f }) => {
    let [_, p] = i(f);
    const { R: m } = Ge(), { ft: h, Ht: S, Ct: w } = a || {}, { ct: D } = u, [R, A] = d("paddingAbsolute");
    (h || p || (f || S)) && ([_, p] = c(f));
    const V = !l && (A || w || p);
    if (V) {
      const L = !R || !e && !m, P = _.r + _.l, O = _.t + _.b, k = {
        [Ws]: L && !D ? -P : 0,
        [Ys]: L ? -O : 0,
        [Ks]: L && D ? -P : 0,
        top: L ? -_.t : 0,
        right: L ? D ? -_.r : "auto" : 0,
        left: L ? D ? "auto" : -_.l : 0,
        [dn]: L && `calc(100% + ${P}px)`
      }, y = {
        [zs]: L ? _.t : 0,
        [Ps]: L ? _.r : 0,
        [Gs]: L ? _.b : 0,
        [js]: L ? _.l : 0
      };
      Vt(e || n, k), Vt(n, y), oe(s, {
        ln: _,
        dn: !L,
        rt: e ? y : oe({}, k, y)
      });
    }
    return {
      fn: V
    };
  };
}, $l = (t, e) => {
  const n = Ge(), { ht: l, ln: s, ot: c, nt: i, Qt: d, gt: a, wt: u, St: f, un: _ } = t, { R: p } = n, m = u && i, h = X(Ns, 0), S = {
    display: () => !1,
    direction: (H) => H !== "ltr",
    flexDirection: (H) => H.endsWith("-reverse"),
    writingMode: (H) => H !== "horizontal-tb"
  }, w = Be(S), D = {
    i: Zs,
    o: {
      w: 0,
      h: 0
    }
  }, R = {
    i: Wt,
    o: {}
  }, A = (H) => {
    f(ho, !m && H);
  }, $ = (H) => {
    if (!w.some((be) => {
      const _e = H[be];
      return _e && S[be](_e);
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
    A(!0);
    const j = Oe(a), M = f(jr, !0), K = ve(d, gt, (be) => {
      const _e = Oe(a);
      be.isTrusted && _e.x === j.x && _e.y === j.y && _o(be);
    }, {
      I: !0,
      A: !0
    });
    qe(a, {
      x: 0,
      y: 0
    }), M();
    const G = Oe(a), Y = on(a);
    qe(a, {
      x: Y.w,
      y: Y.h
    });
    const te = Oe(a);
    qe(a, {
      x: te.x - G.x < 1 && -Y.w,
      y: te.y - G.y < 1 && -Y.h
    });
    const ie = Oe(a);
    return qe(a, j), Gn(() => K()), {
      D: G,
      M: ie
    };
  }, V = (H, I) => {
    const j = Te.devicePixelRatio % 1 !== 0 ? 1 : 0, M = {
      w: h(H.w - I.w),
      h: h(H.h - I.h)
    };
    return {
      w: M.w > j ? M.w : 0,
      h: M.h > j ? M.h : 0
    };
  }, [L, P] = De(D, X(ns, c)), [O, k] = De(D, X(on, c)), [y, C] = De(D), [E] = De(R), [B, x] = De(D), [N] = De(R), [U] = De({
    i: (H, I) => vn(H, I, w),
    o: {}
  }, () => Rr(c) ? Ze(c, w) : {}), [ee, se] = De({
    i: (H, I) => Wt(H.D, I.D) && Wt(H.M, I.M),
    o: mo()
  }), ne = Lt(Eo), pe = (H, I) => `${I ? Ur : qr}${Mr(H)}`, F = (H) => {
    const I = (M) => [nt, it, gt].map((K) => pe(K, M)), j = I(!0).concat(I()).join(" ");
    f(j), f(Be(H).map((M) => pe(H[M], M === "x")).join(" "), !0);
  };
  return ({ It: H, Zt: I, _n: j, Dt: M }, { fn: K }) => {
    const { ft: G, Ht: Y, Ct: te, dt: ie, zt: be } = I || {}, _e = ne && ne.tt(t, e, j, n, H), { it: $e, ut: Z, _t: Ce } = _e || {}, [Ae, ye] = fl(H, n), [Ee, he] = H("overflow"), we = wt(Ee.x), ce = wt(Ee.y), fe = !0;
    let ke = P(M), Me = k(M), $t = C(M), Ft = x(M);
    ye && p && f(go, !Ae);
    {
      es(l, ot, Xt) && A(!0);
      const [ds] = Z ? Z() : [], [It] = ke = L(M), [Nt] = Me = O(M), Ut = uo(c), qt = m && Hr(_()), Qo = {
        w: h(Nt.w + It.w),
        h: h(Nt.h + It.h)
      }, us = {
        w: h((qt ? qt.w : Ut.w + h(Ut.w - Nt.w)) + It.w),
        h: h((qt ? qt.h : Ut.h + h(Ut.h - Nt.h)) + It.h)
      };
      ds && ds(), Ft = B(us), $t = y(V(Qo, us), M);
    }
    const [Ht, Rt] = Ft, [at, vt] = $t, [pn, hn] = Me, [gn, bn] = ke, [Ie, wn] = E({
      x: at.w > 0,
      y: at.h > 0
    }), Ct = we && ce && (Ie.x || Ie.y) || we && Ie.x && !Ie.y || ce && Ie.y && !Ie.x, Et = K || te || be || bn || hn || Rt || vt || he || ye || fe, et = ml(Ie, Ee), [Bt, At] = N(et.K), [Yo, Xo] = U(M), cs = te || ie || Xo || wn || M, [Jo, Zo] = cs ? ee($(Yo), M) : se();
    return Et && (At && F(et.K), Ce && $e && Vt(c, Ce(et, j, $e(et, pn, gn)))), A(!1), sn(l, ot, Xt, Ct), sn(s, Un, Xt, Ct), oe(e, {
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
  const [e, n, l] = kl(t), s = {
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
  }, { vt: c, gt: i, nt: d, Ot: a } = e, { R: u, k: f } = Ge(), _ = !u && (f.x || f.y), p = [xl(e), Sl(e, s), $l(e, s)];
  return [n, (m) => {
    const h = {}, w = _ && Oe(i), D = w && a();
    return ae(p, (R) => {
      oe(h, R(m, h) || {});
    }), qe(i, w), D && D(), !d && qe(c, 0), h;
  }, s, e, l];
}, El = (t, e, n, l, s) => {
  let c = !1;
  const i = Ss(e, {}), [d, a, u, f, _] = Cl(t), [p, m, h] = gl(f, u, i, ($) => {
    A({}, $);
  }), [S, w, , D] = yl(t, e, h, u, f, s), R = ($) => Be($).some((V) => !!$[V]), A = ($, V) => {
    if (n())
      return !1;
    const { pn: L, Dt: P, At: O, hn: k } = $, y = L || {}, C = !!P || !c, E = {
      It: Ss(e, y, C),
      pn: y,
      Dt: C
    };
    if (k)
      return w(E), !1;
    const B = V || m(oe({}, E, {
      At: O
    })), x = a(oe({}, E, {
      _n: h,
      Zt: B
    }));
    w(oe({}, E, {
      Zt: B,
      tn: x
    }));
    const N = R(B), U = R(x), ee = N || U || !Jn(y) || C;
    return c = !0, ee && l($, {
      Zt: B,
      tn: x
    }), ee;
  };
  return [() => {
    const { an: $, gt: V, Ot: L } = f, P = Oe($), O = [p(), d(), S()], k = L();
    return qe(V, P), k(), X(Le, O);
  }, A, () => ({
    gn: h,
    bn: u
  }), {
    wn: f,
    yn: D
  }, _];
}, je = (t, e, n) => {
  const { N: l } = Ge(), s = nn(t), c = s ? t : t.target, i = xo(c);
  if (e && !i) {
    let d = !1;
    const a = [], u = {}, f = (y) => {
      const C = eo(y), E = Lt(vl);
      return E ? E(C, !0) : C;
    }, _ = oe({}, l(), f(e)), [p, m, h] = Nn(), [S, w, D] = Nn(n), R = (y, C) => {
      D(y, C), h(y, C);
    }, [A, $, V, L, P] = El(t, _, () => d, ({ pn: y, Dt: C }, { Zt: E, tn: B }) => {
      const { ft: x, Ct: N, xt: U, Ht: ee, Et: se, dt: ne } = E, { nn: pe, sn: F, en: H, cn: I } = B;
      R("updated", [k, {
        updateHints: {
          sizeChanged: !!x,
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
        changedOptions: y || {},
        force: !!C
      }]);
    }, (y) => R("scroll", [k, y])), O = (y) => {
      cl(c), Le(a), d = !0, R("destroyed", [k, y]), m(), w();
    }, k = {
      options(y, C) {
        if (y) {
          const E = C ? l() : {}, B = po(_, oe(E, f(y)));
          Jn(B) || (oe(_, B), $({
            pn: B
          }));
        }
        return oe({}, _);
      },
      on: S,
      off: (y, C) => {
        y && C && w(y, C);
      },
      state() {
        const { gn: y, bn: C } = V(), { ct: E } = y, { Vt: B, Rt: x, K: N, rn: U, ln: ee, dn: se, Lt: ne } = C;
        return oe({}, {
          overflowEdge: B,
          overflowAmount: x,
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
        const { vt: y, ht: C, ln: E, ot: B, bt: x, gt: N, Qt: U } = L.wn, { Xt: ee, Gt: se } = L.yn, ne = (F) => {
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
          target: y,
          host: C,
          padding: E || B,
          viewport: B,
          content: x || B,
          scrollOffsetElement: N,
          scrollEventElement: U,
          scrollbarHorizontal: pe(ee),
          scrollbarVertical: pe(se)
        });
      },
      update: (y) => $({
        Dt: y,
        At: !0
      }),
      destroy: X(O, !1),
      plugin: (y) => u[Be(y)[0]]
    };
    return me(a, [P]), il(c, k), Co(So, je, [k, p, u]), al(L.wn.wt, !s && t.cancel) ? (O(!0), k) : (me(a, A()), R("initialized", [k]), k.update(), k);
  }
  return i;
};
je.plugin = (t) => {
  const e = Pe(t), n = e ? t : [t], l = n.map((s) => Co(s, je)[0]);
  return ul(n), e ? l : l[0];
};
je.valid = (t) => {
  const e = t && t.elements, n = Re(e) && e();
  return tn(n) && !!xo(n.target);
};
je.env = () => {
  const { T: t, k: e, R: n, V: l, B: s, F: c, U: i, P: d, N: a, q: u } = Ge();
  return oe({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: l,
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
  const e = T(null), n = Math.floor(Math.random() * 2 ** 32), l = T(!1), s = T([]), c = () => s.value, i = () => t.getSelection(), d = () => s.value.length, a = () => t.clearSelection(!0), u = T(), f = T(null), _ = T(null), p = T(null), m = T(null);
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
        l.value = !1;
        const O = e.value.offsetWidth - L.offsetX, k = e.value.offsetHeight - L.offsetY;
        O < 15 && k < 15 && t.Interaction._reset(L), L.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(L);
      }
    }), document.addEventListener("dragleave", (V) => {
      !V.buttons && l.value && (l.value = !1);
    });
  }
  const S = () => ct(() => {
    t.addSelection(
      t.getSelectables()
    ), w();
  }), w = () => {
    s.value = t.getSelection().map((V) => JSON.parse(V.dataset.item)), u.value(s.value);
  }, D = () => ct(() => {
    const V = c().map((L) => L.path);
    a(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((L) => V.includes(JSON.parse(L.dataset.item).path))
    ), w(), A();
  }), R = (V) => {
    u.value = V, t.subscribe("DS:end", ({ items: L, event: P, isDragging: O }) => {
      s.value = L.map((k) => JSON.parse(k.dataset.item)), V(L.map((k) => JSON.parse(k.dataset.item)));
    });
  }, A = () => {
    f.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (_.value.style.height = e.value.scrollHeight + "px", _.value.style.display = "block") : (_.value.style.height = "100%", _.value.style.display = "none"));
  }, $ = (V) => {
    if (!f.value)
      return;
    const { scrollOffsetElement: L } = f.value.elements();
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
        f.value = V;
      },
      scroll: (V, L) => {
        const { scrollOffsetElement: P } = V.elements();
        e.value.scrollTo({
          top: P.scrollTop,
          left: 0
        });
      }
    }), h(), A(), m.value = new ResizeObserver(A), m.value.observe(e.value), e.value.addEventListener("scroll", $), t.subscribe("DS:scroll", ({ isDragging: V }) => V || $());
  }), jn(() => {
    t && t.stop(), m.value && m.value.disconnect();
  }), Ls(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: l,
    scrollBar: _,
    scrollBarContainer: p,
    getSelected: c,
    getSelection: i,
    selectAll: S,
    clearSelection: a,
    refreshSelection: D,
    getCount: d,
    onSelect: R
  };
}
function Ml(t, e) {
  const n = T(t), l = T(e), s = T([]), c = T([]), i = T([]), d = T(!1), a = T(5);
  let u = !1, f = !1;
  const _ = yt({
    adapter: n,
    storages: [],
    dirname: l,
    files: []
  });
  function p() {
    let R = [], A = [], $ = l.value ?? n.value + "://";
    $.length === 0 && (s.value = []), $.replace(n.value + "://", "").split("/").forEach(function(P) {
      R.push(P), R.join("/") !== "" && A.push({
        basename: P,
        name: P,
        path: n.value + "://" + R.join("/"),
        type: "dir"
      });
    }), c.value = A;
    const [V, L] = h(A, a.value);
    i.value = L, s.value = V;
  }
  function m(R) {
    a.value = R, p();
  }
  function h(R, A) {
    return R.length > A ? [R.slice(-A), R.slice(0, -A)] : [R, []];
  }
  function S(R = null) {
    d.value = R ?? !d.value;
  }
  function w() {
    return s.value && s.value.length && !f;
  }
  const D = rt(() => {
    var R;
    return ((R = s.value[s.value.length - 2]) == null ? void 0 : R.path) ?? n.value + "://";
  });
  return Se(() => {
  }), He(l, p), Se(p), {
    adapter: n,
    path: l,
    loading: u,
    searchMode: f,
    data: _,
    breadcrumbs: s,
    breadcrumbItems: c,
    limitBreadcrumbItems: m,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: S,
    isGoUpAvailable: w,
    parentFolderPath: D
  };
}
const Tl = (t, e) => {
  const n = gr(t.id), l = dr(), s = n.getStore("metricUnits", !1), c = Sr(n, t.theme), i = e.i18n, d = t.locale ?? e.locale, a = n.getStore("adapter"), u = (p) => Array.isArray(p) ? p : yr, f = n.getStore("persist-path", t.persist), _ = f ? n.getStore("path", t.path) : t.path;
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
    emitter: l,
    // storage
    storage: n,
    // localization object
    i18n: wr(n, d, l, i),
    // modal state
    modal: $r(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: rt(() => Al()),
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
    theme: c,
    // unit state - for example: GB or GiB
    metricUnits: s,
    // human readable file sizes
    filesize: s ? Is : Bs,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: f,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: Ml(a, _)
  });
}, Dl = { class: "vuefinder__modal-layout__container" }, Vl = { class: "vuefinder__modal-layout__content" }, Ol = { class: "vuefinder__modal-layout__footer" }, Ke = {
  __name: "ModalLayout",
  setup(t) {
    const e = T(null), n = re("ServiceContainer");
    return Se(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), ct(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const s = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (l, s) => (v(), g("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = kt((c) => o(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = r("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      r("div", Dl, [
        r("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = st((c) => o(n).modal.close(), ["self"]))
        }, [
          r("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            r("div", Vl, [
              Mt(l.$slots, "default")
            ]),
            r("div", Ol, [
              Mt(l.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Ll = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [l, s] of e)
    n[l] = s;
  return n;
}, Fl = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const l = re("ServiceContainer"), s = T(!1), { t: c } = l.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), s.value = !0, i = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return Se(() => {
      l.emitter.on(t.on, d);
    }), jn(() => {
      clearTimeout(i);
    }), {
      shown: s,
      t: c
    };
  }
}, Hl = { key: 1 };
function Rl(t, e, n, l, s, c) {
  return v(), g("div", {
    class: le(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    t.$slots.default ? Mt(t.$slots, "default", { key: 0 }) : (v(), g("span", Hl, b(l.t("Saved.")), 1))
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
  return v(), g("svg", Bl, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ]));
}
const Nl = { render: Il }, Ul = { class: "vuefinder__modal-header" }, ql = { class: "vuefinder__modal-header__icon-container" }, zl = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Qe = {
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
    return (e, n) => (v(), g("div", Ul, [
      r("div", ql, [
        (v(), W(Fs(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      r("h3", zl, b(t.title), 1)
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
}, Ca = { class: "vuefinder__about-modal__setting-label" }, Ea = ["label"], Aa = ["value"], Ma = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Ta = { class: "vuefinder__about-modal__shortcuts" }, Da = { class: "vuefinder__about-modal__shortcut" }, Va = { class: "vuefinder__about-modal__shortcut" }, Oa = { class: "vuefinder__about-modal__shortcut" }, La = { class: "vuefinder__about-modal__shortcut" }, Fa = { class: "vuefinder__about-modal__shortcut" }, Ha = { class: "vuefinder__about-modal__shortcut" }, Ra = { class: "vuefinder__about-modal__shortcut" }, Ba = { class: "vuefinder__about-modal__shortcut" }, Ia = { class: "vuefinder__about-modal__shortcut" }, Na = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Ua = { class: "vuefinder__about-modal__description" }, Mo = {
  __name: "ModalAbout",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n, clearStore: l } = e.storage, { t: s } = e.i18n, c = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, i = rt(() => [
      { name: s("About"), key: c.ABOUT },
      { name: s("Settings"), key: c.SETTINGS },
      { name: s("Shortcuts"), key: c.SHORTCUTS },
      { name: s("Reset"), key: c.RESET }
    ]), d = T("about"), a = async () => {
      l(), location.reload();
    }, u = (R) => {
      e.theme.set(R), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Is : Bs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, _ = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, m = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = re("VueFinderOptions"), w = Object.fromEntries(
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
    ), D = rt(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (R, A) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: A[7] || (A[7] = ($) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(s)("Close")), 1)
      ]),
      default: Q(() => [
        r("div", Pl, [
          z(Qe, {
            icon: o(Nl),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          r("div", jl, [
            r("div", null, [
              r("div", null, [
                r("nav", Gl, [
                  (v(!0), g(ge, null, xe(i.value, ($) => (v(), g("button", {
                    key: $.name,
                    onClick: (V) => d.value = $.key,
                    class: le([$.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": $.current ? "page" : void 0
                  }, b($.name), 11, Kl))), 128))
                ])
              ])
            ]),
            d.value === c.ABOUT ? (v(), g("div", Wl, [
              r("div", Yl, b(o(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              r("a", Xl, b(o(s)("Project home")), 1),
              r("a", Jl, b(o(s)("Follow on GitHub")), 1)
            ])) : q("", !0),
            d.value === c.SETTINGS ? (v(), g("div", Zl, [
              r("div", Ql, b(o(s)("Customize your experience with the following settings")), 1),
              r("div", ea, [
                r("fieldset", null, [
                  r("div", ta, [
                    r("div", na, [
                      ue(r("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": A[0] || (A[0] = ($) => o(e).metricUnits = $),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).metricUnits]
                      ])
                    ]),
                    r("div", sa, [
                      r("label", oa, [
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
                  r("div", ra, [
                    r("div", la, [
                      ue(r("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": A[1] || (A[1] = ($) => o(e).compactListView = $),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).compactListView]
                      ])
                    ]),
                    r("div", aa, [
                      r("label", ia, [
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
                  r("div", ca, [
                    r("div", da, [
                      ue(r("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": A[2] || (A[2] = ($) => o(e).persist = $),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).persist]
                      ])
                    ]),
                    r("div", ua, [
                      r("label", va, [
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
                  r("div", _a, [
                    r("div", fa, [
                      ue(r("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": A[3] || (A[3] = ($) => o(e).showThumbnails = $),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).showThumbnails]
                      ])
                    ]),
                    r("div", ma, [
                      r("label", pa, [
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
                  r("div", ha, [
                    r("div", ga, [
                      r("label", ba, b(o(s)("Theme")), 1)
                    ]),
                    r("div", wa, [
                      ue(r("select", {
                        id: "theme",
                        "onUpdate:modelValue": A[4] || (A[4] = ($) => o(e).theme.value = $),
                        onChange: A[5] || (A[5] = ($) => u($.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: o(s)("Theme")
                        }, [
                          (v(!0), g(ge, null, xe(D.value, ($, V) => (v(), g("option", { value: V }, b($), 9, ka))), 256))
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
                  o(e).features.includes(o(de).LANGUAGE) && Object.keys(o(w)).length > 1 ? (v(), g("div", xa, [
                    r("div", Sa, [
                      r("label", $a, b(o(s)("Language")), 1)
                    ]),
                    r("div", Ca, [
                      ue(r("select", {
                        id: "language",
                        "onUpdate:modelValue": A[6] || (A[6] = ($) => o(e).i18n.locale = $),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: o(s)("Language")
                        }, [
                          (v(!0), g(ge, null, xe(o(w), ($, V) => (v(), g("option", { value: V }, b($), 9, Aa))), 256))
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
            d.value === c.SHORTCUTS ? (v(), g("div", Ma, [
              r("div", Ta, [
                r("div", Da, [
                  r("div", null, b(o(s)("Rename")), 1),
                  A[8] || (A[8] = r("kbd", null, "F2", -1))
                ]),
                r("div", Va, [
                  r("div", null, b(o(s)("Refresh")), 1),
                  A[9] || (A[9] = r("kbd", null, "F5", -1))
                ]),
                r("div", Oa, [
                  J(b(o(s)("Delete")) + " ", 1),
                  A[10] || (A[10] = r("kbd", null, "Del", -1))
                ]),
                r("div", La, [
                  J(b(o(s)("Escape")) + " ", 1),
                  A[11] || (A[11] = r("div", null, [
                    r("kbd", null, "Esc")
                  ], -1))
                ]),
                r("div", Fa, [
                  J(b(o(s)("Select All")) + " ", 1),
                  A[12] || (A[12] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    J(" + "),
                    r("kbd", null, "A")
                  ], -1))
                ]),
                r("div", Ha, [
                  J(b(o(s)("Search")) + " ", 1),
                  A[13] || (A[13] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    J(" + "),
                    r("kbd", null, "F")
                  ], -1))
                ]),
                r("div", Ra, [
                  J(b(o(s)("Toggle Sidebar")) + " ", 1),
                  A[14] || (A[14] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    J(" + "),
                    r("kbd", null, "E")
                  ], -1))
                ]),
                r("div", Ba, [
                  J(b(o(s)("Open Settings")) + " ", 1),
                  A[15] || (A[15] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    J(" + "),
                    r("kbd", null, ",")
                  ], -1))
                ]),
                r("div", Ia, [
                  J(b(o(s)("Toggle Full Screen")) + " ", 1),
                  A[16] || (A[16] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    J(" + "),
                    r("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : q("", !0),
            d.value === c.RESET ? (v(), g("div", Na, [
              r("div", Ua, b(o(s)("Reset all settings to default")), 1),
              r("button", {
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
    const n = e, l = re("ServiceContainer"), { t: s } = l.i18n, c = T(!1), i = T(null), d = T((u = i.value) == null ? void 0 : u.strMessage);
    He(d, () => c.value = !1);
    const a = () => {
      n("hidden"), c.value = !0;
    };
    return (f, _) => (v(), g("div", null, [
      c.value ? q("", !0) : (v(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: le(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Mt(f.$slots, "default"),
        r("div", {
          class: "vuefinder__message__close",
          onClick: a,
          title: o(s)("Close")
        }, _[0] || (_[0] = [
          r("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            r("path", {
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
  return v(), g("svg", za, e[0] || (e[0] = [
    r("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ]));
}
const To = { render: Pa }, ja = { class: "vuefinder__delete-modal__content" }, Ga = { class: "vuefinder__delete-modal__form" }, Ka = { class: "vuefinder__delete-modal__description" }, Wa = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Ya = { class: "vuefinder__delete-modal__file" }, Xa = {
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
    const e = re("ServiceContainer"), { t: n } = e.i18n, l = T(e.modal.data.items), s = T(""), c = () => {
      l.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: l.value.map(({ path: i, type: d }) => ({ path: i, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, b(o(n)("Yes, Delete!")), 1),
        r("button", {
          type: "button",
          onClick: d[1] || (d[1] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        r("div", Qa, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(To),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          r("div", ja, [
            r("div", Ga, [
              r("p", Ka, b(o(n)("Are you sure you want to delete these files?")), 1),
              r("div", Wa, [
                (v(!0), g(ge, null, xe(l.value, (a) => (v(), g("p", Ya, [
                  a.type === "dir" ? (v(), g("svg", Xa, d[2] || (d[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (v(), g("svg", Ja, d[3] || (d[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  r("span", Za, b(a.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (v(), W(We, {
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
  return v(), g("svg", ei, e[0] || (e[0] = [
    r("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
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
    const e = re("ServiceContainer"), { t: n } = e.i18n, l = T(e.modal.data.items[0]), s = T(e.modal.data.items[0].basename), c = T(""), i = () => {
      s.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: l.value.path,
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
    return (d, a) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Rename")), 1),
        r("button", {
          type: "button",
          onClick: a[2] || (a[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Do),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          r("div", ni, [
            r("div", si, [
              r("p", oi, [
                l.value.type === "dir" ? (v(), g("svg", ri, a[3] || (a[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (v(), g("svg", li, a[4] || (a[4] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", ai, b(l.value.basename), 1)
              ]),
              ue(r("input", {
                "onUpdate:modelValue": a[0] || (a[0] = (u) => s.value = u),
                onKeyup: kt(i, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [xt, s.value]
              ]),
              c.value.length ? (v(), W(We, {
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
    n.code === Ye.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Ye.F2 && t.features.includes(de.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(as, { items: t.dragSelect.getSelected() })), n.code === Ye.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Ye.DELETE && (!t.dragSelect.getCount() || t.modal.open(ls, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Ye.BACKSLASH && t.modal.open(Mo), n.metaKey && n.code === Ye.KEY_F && t.features.includes(de.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Ye.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Ye.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Ye.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
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
  return v(), g("svg", ci, e[0] || (e[0] = [
    r("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const Vo = { render: di }, ui = { class: "vuefinder__new-folder-modal__content" }, vi = { class: "vuefinder__new-folder-modal__form" }, _i = { class: "vuefinder__new-folder-modal__description" }, fi = ["placeholder"], Oo = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, l = T(""), s = T(""), c = () => {
      l.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: l.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", l.value) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Vo),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          r("div", ui, [
            r("div", vi, [
              r("p", _i, b(o(n)("Create a new folder")), 1),
              ue(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => l.value = a),
                onKeyup: kt(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text"
              }, null, 40, fi), [
                [xt, l.value]
              ]),
              s.value.length ? (v(), W(We, {
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
  return v(), g("svg", mi, e[0] || (e[0] = [
    r("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ]));
}
const Lo = { render: pi }, hi = { class: "vuefinder__new-file-modal__content" }, gi = { class: "vuefinder__new-file-modal__form" }, bi = { class: "vuefinder__new-file-modal__description" }, wi = ["placeholder"], yi = {
  __name: "ModalNewFile",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, l = T(""), s = T(""), c = () => {
      l.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: l.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", l.value) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Lo),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          r("div", hi, [
            r("div", gi, [
              r("p", bi, b(o(n)("Create a new file")), 1),
              ue(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => l.value = a),
                onKeyup: kt(c, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, wi), [
                [xt, l.value]
              ]),
              s.value.length ? (v(), W(We, {
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
  return v(), g("svg", ki, e[0] || (e[0] = [
    r("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ]));
}
const Fo = { render: xi }, Si = { class: "vuefinder__upload-modal__content" }, $i = {
  key: 0,
  class: "pointer-events-none"
}, Ci = {
  key: 1,
  class: "pointer-events-none"
}, Ei = ["disabled"], Ai = ["disabled"], Mi = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Ti = ["textContent"], Di = { class: "vuefinder__upload-modal__file-info" }, Vi = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Oi = { class: "vuefinder__upload-modal__file-name md:hidden" }, Li = {
  key: 0,
  class: "ml-auto"
}, Fi = ["title", "disabled", "onClick"], Hi = {
  key: 0,
  class: "py-2"
}, Ri = ["disabled"], Bi = {
  __name: "ModalUpload",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, l = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = T({ QUEUE_ENTRY_STATUS: s }), i = T(null), d = T(null), a = T(null), u = T(null), f = T(null), _ = T(null), p = T([]), m = T(""), h = T(!1), S = T(!1);
    let w;
    function D(E) {
      return p.value.findIndex((B) => B.id === E);
    }
    function R(E, B = null) {
      B = B ?? (E.webkitRelativePath || E.name), w.addFile({
        name: B,
        type: E.type,
        data: E,
        source: "Local"
      });
    }
    function A(E) {
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
    const $ = (E) => {
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
    function V() {
      u.value.click();
    }
    function L() {
      if (!h.value) {
        if (!p.value.filter((E) => E.status !== s.DONE).length) {
          m.value = n("Please select file to upload first.");
          return;
        }
        m.value = "", w.retryAll(), w.upload();
      }
    }
    function P() {
      w.cancelAll({ reason: "user" }), p.value.forEach((E) => {
        E.status !== s.DONE && (E.status = s.CANCELED, E.statusName = n("Canceled"));
      }), h.value = !1;
    }
    function O(E) {
      h.value || (w.removeFile(E.id, "removed-by-user"), p.value.splice(D(E.id), 1));
    }
    function k(E) {
      if (!h.value) {
        if (w.cancelAll({ reason: "user" }), E) {
          const B = [];
          p.value.forEach((x) => {
            x.status !== s.DONE && B.push(x);
          }), p.value = [], B.forEach((x) => {
            R(x.originalFile, x.name);
          });
          return;
        }
        p.value.splice(0);
      }
    }
    function y() {
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
      w = new vr({
        debug: e.debug,
        restrictions: {
          maxFileSize: xr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: l,
        onBeforeFileAdded(x, N) {
          if (N[x.id] != null) {
            const ee = D(x.id);
            p.value[ee].status === s.PENDING && (m.value = w.i18n("noDuplicates", { fileName: x.name })), p.value = p.value.filter((se) => se.id !== x.id);
          }
          return p.value.push({
            id: x.id,
            name: x.name,
            size: e.filesize(x.size),
            status: s.PENDING,
            statusName: n("Pending upload"),
            percent: null,
            originalFile: x.data
          }), !0;
        }
      }), w.use(_r, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(x, N) {
          let U;
          try {
            U = JSON.parse(x).message;
          } catch {
            U = n("Cannot parse server response.");
          }
          return new Error(U);
        }
      }), w.on("restriction-failed", (x, N) => {
        const U = p.value[D(x.id)];
        O(U), m.value = N.message;
      }), w.on("upload", () => {
        const x = C();
        w.setMeta({ ...x.body });
        const N = w.getPlugin("XHRUpload");
        N.opts.method = x.method, N.opts.endpoint = x.url + "?" + new URLSearchParams(x.params), N.opts.headers = x.headers, delete x.headers["Content-Type"], h.value = !0, p.value.forEach((U) => {
          U.status !== s.DONE && (U.percent = null, U.status = s.UPLOADING, U.statusName = n("Pending upload"));
        });
      }), w.on("upload-progress", (x, N) => {
        const U = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        p.value[D(x.id)].percent = `${U}%`;
      }), w.on("upload-success", (x) => {
        const N = p.value[D(x.id)];
        N.status = s.DONE, N.statusName = n("Done");
      }), w.on("upload-error", (x, N) => {
        const U = p.value[D(x.id)];
        U.percent = null, U.status = s.ERROR, N.isNetworkError ? U.statusName = n("Network Error, Unable establish connection to the server or interrupted.") : U.statusName = N ? N.message : n("Unknown Error");
      }), w.on("error", (x) => {
        m.value = x.message, h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), w.on("complete", () => {
        h.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), f.value.addEventListener("click", () => {
        a.value.click();
      }), _.value.addEventListener("dragover", (x) => {
        x.preventDefault(), S.value = !0;
      }), _.value.addEventListener("dragleave", (x) => {
        x.preventDefault(), S.value = !1;
      });
      function E(x, N) {
        N.isFile && N.file((U) => x(N, U)), N.isDirectory && N.createReader().readEntries((U) => {
          U.forEach((ee) => {
            E(x, ee);
          });
        });
      }
      _.value.addEventListener("drop", (x) => {
        x.preventDefault(), S.value = !1;
        const N = /^[/\\](.+)/;
        [...x.dataTransfer.items].forEach((U) => {
          U.kind === "file" && E((ee, se) => {
            const ne = N.exec(ee.fullPath);
            R(se, ne[1]);
          }, U.webkitGetAsEntry());
        });
      });
      const B = ({ target: x }) => {
        const N = x.files;
        for (const U of N)
          R(U);
        x.value = "";
      };
      d.value.addEventListener("change", B), a.value.addEventListener("change", B);
    }), Hs(() => {
      w == null || w.close({ reason: "unmount" });
    }), (E, B) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: st(L, ["prevent"])
        }, b(o(n)("Upload")), 9, Ri),
        h.value ? (v(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: st(P, ["prevent"])
        }, b(o(n)("Cancel")), 1)) : (v(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: st(y, ["prevent"])
        }, b(o(n)("Close")), 1))
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Fo),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          r("div", Si, [
            r("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: _,
              onClick: V
            }, [
              S.value ? (v(), g("div", $i, b(o(n)("Release to drop these files.")), 1)) : (v(), g("div", Ci, b(o(n)("Drag and drop the files/folders to here or click here.")), 1))
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
                onClick: B[0] || (B[0] = (x) => k(!1))
              }, b(o(n)("Clear all")), 9, Ei),
              r("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: B[1] || (B[1] = (x) => k(!0))
              }, b(o(n)("Clear only successful")), 9, Ai)
            ], 512),
            r("div", Mi, [
              (v(!0), g(ge, null, xe(p.value, (x) => (v(), g("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: x.id
              }, [
                r("span", {
                  class: le(["vuefinder__upload-modal__file-icon", A(x)])
                }, [
                  r("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b($(x))
                  }, null, 8, Ti)
                ], 2),
                r("div", Di, [
                  r("div", Vi, b(o(zn)(x.name, 40)) + " (" + b(x.size) + ")", 1),
                  r("div", Oi, b(o(zn)(x.name, 16)) + " (" + b(x.size) + ")", 1),
                  r("div", {
                    class: le(["vuefinder__upload-modal__file-status", A(x)])
                  }, [
                    J(b(x.statusName) + " ", 1),
                    x.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (v(), g("b", Li, b(x.percent), 1)) : q("", !0)
                  ], 2)
                ]),
                r("button", {
                  type: "button",
                  class: le(["vuefinder__upload-modal__file-remove", h.value ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: h.value,
                  onClick: (N) => O(x)
                }, B[3] || (B[3] = [
                  r("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ]), 10, Fi)
              ]))), 128)),
              p.value.length ? q("", !0) : (v(), g("div", Hi, b(o(n)("No files selected!")), 1))
            ]),
            m.value.length ? (v(), W(We, {
              key: 0,
              onHidden: B[2] || (B[2] = (x) => m.value = ""),
              error: ""
            }, {
              default: Q(() => [
                J(b(m.value), 1)
              ]),
              _: 1
            })) : q("", !0)
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
  return v(), g("svg", Ii, e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
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
    const e = re("ServiceContainer"), { t: n } = e.i18n, l = T(e.modal.data.items[0]), s = T(""), c = T([]), i = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: l.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, a) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Unarchive")), 1),
        r("button", {
          type: "button",
          onClick: a[1] || (a[1] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Ho),
            title: o(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          r("div", Ui, [
            r("div", qi, [
              (v(!0), g(ge, null, xe(c.value, (u) => (v(), g("p", zi, [
                u.type === "dir" ? (v(), g("svg", Pi, a[2] || (a[2] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (v(), g("svg", ji, a[3] || (a[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", Gi, b(u.basename), 1)
              ]))), 256)),
              r("p", Ki, b(o(n)("The archive will be unarchived at")) + " (" + b(o(e).fs.data.dirname) + ")", 1),
              s.value.length ? (v(), W(We, {
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
  return v(), g("svg", Wi, e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
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
    const e = re("ServiceContainer"), { t: n } = e.i18n, l = T(""), s = T(""), c = T(e.modal.data.items), i = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: c.value.map(({ path: d, type: a }) => ({ path: d, type: a })),
          name: l.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, a) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Archive")), 1),
        r("button", {
          type: "button",
          onClick: a[2] || (a[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Bo),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          r("div", Xi, [
            r("div", Ji, [
              r("div", Zi, [
                (v(!0), g(ge, null, xe(c.value, (u) => (v(), g("p", Qi, [
                  u.type === "dir" ? (v(), g("svg", ec, a[3] || (a[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (v(), g("svg", tc, a[4] || (a[4] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  r("span", nc, b(u.basename), 1)
                ]))), 256))
              ]),
              ue(r("input", {
                "onUpdate:modelValue": a[0] || (a[0] = (u) => l.value = u),
                onKeyup: kt(i, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, sc), [
                [xt, l.value]
              ]),
              s.value.length ? (v(), W(We, {
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
  return v(), g("svg", oc, e[0] || (e[0] = [
    r("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    r("path", {
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
  return v(), g("svg", lc, e[0] || (e[0] = [
    r("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
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
  return v(), g("svg", cc, e[0] || (e[0] = [
    r("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
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
  return v(), g("svg", vc, e[0] || (e[0] = [
    r("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
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
  return v(), g("svg", mc, e[0] || (e[0] = [
    r("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const hc = { render: pc }, gc = { class: "vuefinder__toolbar" }, bc = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, wc = ["title"], yc = ["title"], kc = ["title"], xc = ["title"], Sc = ["title"], $c = ["title"], Cc = ["title"], Ec = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Ac = { class: "pl-2" }, Mc = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Tc = { class: "vuefinder__toolbar__controls" }, Dc = ["title"], Vc = ["title"], Oc = {
  __name: "Toolbar",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, { t: l } = e.i18n, s = e.dragSelect, c = T("");
    e.emitter.on("vf-search-query", ({ newQuery: a }) => {
      c.value = a;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen;
    };
    He(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (a, u) => (v(), g("div", gc, [
      c.value.length ? (v(), g("div", Ec, [
        r("div", Ac, [
          J(b(o(l)("Search results for")) + " ", 1),
          r("span", Mc, b(c.value), 1)
        ]),
        o(e).fs.loading ? (v(), W(o(is), { key: 0 })) : q("", !0)
      ])) : (v(), g("div", bc, [
        o(e).features.includes(o(de).NEW_FOLDER) ? (v(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(l)("New Folder"),
          onClick: u[0] || (u[0] = (f) => o(e).modal.open(Oo, { items: o(s).getSelected() }))
        }, [
          z(o(Vo))
        ], 8, wc)) : q("", !0),
        o(e).features.includes(o(de).NEW_FILE) ? (v(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(l)("New File"),
          onClick: u[1] || (u[1] = (f) => o(e).modal.open(yi, { items: o(s).getSelected() }))
        }, [
          z(o(Lo))
        ], 8, yc)) : q("", !0),
        o(e).features.includes(o(de).RENAME) ? (v(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: o(l)("Rename"),
          onClick: u[2] || (u[2] = (f) => o(s).getCount() !== 1 || o(e).modal.open(as, { items: o(s).getSelected() }))
        }, [
          z(o(Do), {
            class: le(o(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, kc)) : q("", !0),
        o(e).features.includes(o(de).DELETE) ? (v(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: o(l)("Delete"),
          onClick: u[3] || (u[3] = (f) => !o(s).getCount() || o(e).modal.open(ls, { items: o(s).getSelected() }))
        }, [
          z(o(To), {
            class: le(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, xc)) : q("", !0),
        o(e).features.includes(o(de).UPLOAD) ? (v(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: o(l)("Upload"),
          onClick: u[4] || (u[4] = (f) => o(e).modal.open(Bi, { items: o(s).getSelected() }))
        }, [
          z(o(Fo))
        ], 8, Sc)) : q("", !0),
        o(e).features.includes(o(de).UNARCHIVE) && o(s).getCount() === 1 && o(s).getSelected()[0].mime_type === "application/zip" ? (v(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: o(l)("Unarchive"),
          onClick: u[5] || (u[5] = (f) => !o(s).getCount() || o(e).modal.open(Ro, { items: o(s).getSelected() }))
        }, [
          z(o(Ho), {
            class: le(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, $c)) : q("", !0),
        o(e).features.includes(o(de).ARCHIVE) ? (v(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: o(l)("Archive"),
          onClick: u[6] || (u[6] = (f) => !o(s).getCount() || o(e).modal.open(Io, { items: o(s).getSelected() }))
        }, [
          z(o(Bo), {
            class: le(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Cc)) : q("", !0)
      ])),
      r("div", Tc, [
        o(e).features.includes(o(de).FULL_SCREEN) ? (v(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: o(l)("Toggle Full Screen")
        }, [
          o(e).fullScreen ? (v(), W(o(uc), { key: 0 })) : (v(), W(o(ic), { key: 1 }))
        ], 8, Dc)) : q("", !0),
        r("div", {
          class: "mx-1.5",
          title: o(l)("Change View"),
          onClick: u[7] || (u[7] = (f) => c.value.length || d())
        }, [
          o(e).view === "grid" ? (v(), W(o(fc), {
            key: 0,
            class: le(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0),
          o(e).view === "list" ? (v(), W(o(hc), {
            key: 1,
            class: le(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0)
        ], 8, Vc)
      ])
    ]));
  }
}, Lc = (t, e = 0, n = !1) => {
  let l;
  return (...s) => {
    n && !l && t(...s), clearTimeout(l), l = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Vs = (t, e, n) => {
  const l = T(t);
  return sr((s, c) => ({
    get() {
      return s(), l.value;
    },
    set: Lc(
      (i) => {
        l.value = i, c();
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
  return v(), g("svg", Fc, e[0] || (e[0] = [
    r("path", {
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
    const e = re("ServiceContainer"), { t: n } = e.i18n, l = T(e.modal.data.items.from), s = T(""), c = () => {
      l.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: l.value.map(({ path: i, type: d }) => ({ path: i, type: d })),
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
    return (i, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Yes, Move!")), 1),
        r("button", {
          type: "button",
          onClick: d[1] || (d[1] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        r("div", Wc, b(o(n)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(Rc),
            title: o(n)("Move files")
          }, null, 8, ["icon", "title"]),
          r("div", Bc, [
            r("p", Ic, b(o(n)("Are you sure you want to move these files?")), 1),
            r("div", Nc, [
              (v(!0), g(ge, null, xe(l.value, (a) => (v(), g("div", Uc, [
                r("div", null, [
                  a.type === "dir" ? (v(), g("svg", qc, d[2] || (d[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (v(), g("svg", zc, d[3] || (d[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                r("div", Pc, b(a.path), 1)
              ]))), 256))
            ]),
            r("h4", jc, b(o(n)("Target Directory")), 1),
            r("p", Gc, [
              d[4] || (d[4] = r("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "1"
              }, [
                r("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                })
              ], -1)),
              r("span", Kc, b(o(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (v(), W(We, {
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
  return v(), g("svg", Yc, e[0] || (e[0] = [
    r("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ]));
}
const Jc = { render: Xc }, Zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Qc(t, e) {
  return v(), g("svg", Zc, e[0] || (e[0] = [
    r("path", {
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
  return v(), g("svg", td, e[0] || (e[0] = [
    r("path", {
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
  return v(), g("svg", od, e[0] || (e[0] = [
    r("path", {
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
  return v(), g("svg", ad, e[0] || (e[0] = [
    r("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
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
  return v(), g("svg", dd, e[0] || (e[0] = [
    r("path", {
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
  return v(), g("svg", _d, e[0] || (e[0] = [
    r("path", {
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
  return v(), g("svg", md, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ]));
}
const hd = { render: pd }, gd = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function bd(t, e) {
  return v(), g("svg", gd, e[0] || (e[0] = [
    r("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const wd = { render: bd }, yd = { class: "vuefinder__breadcrumb__container" }, kd = ["title"], xd = ["title"], Sd = ["title"], $d = ["title"], Cd = { class: "vuefinder__breadcrumb__list" }, Ed = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Ad = { class: "relative" }, Md = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Td = { class: "vuefinder__breadcrumb__search-mode" }, Dd = ["placeholder"], Vd = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Od = ["onDrop", "onClick"], Ld = { class: "vuefinder__breadcrumb__hidden-item-content" }, Fd = { class: "vuefinder__breadcrumb__hidden-item-text" }, Hd = {
  __name: "Breadcrumb",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, l = e.dragSelect, { setStore: s } = e.storage, c = T(null), i = Vs(0, 100);
    He(i, (O) => {
      const k = c.value.children;
      let y = 0, C = 0, E = 5, B = 1;
      e.fs.limitBreadcrumbItems(E), ct(() => {
        for (let x = k.length - 1; x >= 0 && !(y + k[x].offsetWidth > i.value - 40); x--)
          y += parseInt(k[x].offsetWidth, 10), C++;
        C < B && (C = B), C > E && (C = E), e.fs.limitBreadcrumbItems(C);
      });
    });
    const d = () => {
      i.value = c.value.offsetWidth;
    };
    let a = T(null);
    Se(() => {
      a.value = new ResizeObserver(d), a.value.observe(c.value);
    }), jn(() => {
      a.value.disconnect();
    });
    const u = (O, k = null) => {
      O.preventDefault(), l.isDraggingRef.value = !1, p(O), k ?? (k = e.fs.hiddenBreadcrumbs.length - 1);
      let y = JSON.parse(O.dataTransfer.getData("items"));
      if (y.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: y,
          to: e.fs.hiddenBreadcrumbs[k] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, f = (O, k = null) => {
      O.preventDefault(), l.isDraggingRef.value = !1, p(O), k ?? (k = e.fs.breadcrumbs.length - 2);
      let y = JSON.parse(O.dataTransfer.getData("items"));
      if (y.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: y,
          to: e.fs.breadcrumbs[k] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, _ = (O) => {
      O.preventDefault(), e.fs.isGoUpAvailable() ? (O.dataTransfer.dropEffect = "copy", O.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (O.dataTransfer.dropEffect = "none", O.dataTransfer.effectAllowed = "none");
    }, p = (O) => {
      O.preventDefault(), O.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && O.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, m = () => {
      L(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      L(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, S = (O) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: O.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, w = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, D = {
      mounted(O, k, y, C) {
        O.clickOutsideEvent = function(E) {
          O === E.target || O.contains(E.target) || k.value();
        }, document.body.addEventListener("click", O.clickOutsideEvent);
      },
      beforeUnmount(O, k, y, C) {
        document.body.removeEventListener("click", O.clickOutsideEvent);
      }
    }, R = () => {
      e.showTreeView = !e.showTreeView;
    };
    He(() => e.showTreeView, (O, k) => {
      O !== k && s("show-tree-view", O);
    });
    const A = T(null), $ = () => {
      e.features.includes(de.SEARCH) && (e.fs.searchMode = !0, ct(() => A.value.focus()));
    }, V = Vs("", 400);
    He(V, (O) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: O });
    }), He(() => e.fs.searchMode, (O) => {
      O && ct(() => A.value.focus());
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
    return (O, k) => (v(), g("div", yd, [
      r("span", {
        title: o(n)("Toggle Tree View")
      }, [
        z(o(hd), {
          onClick: R,
          class: le(["vuefinder__breadcrumb__toggle-tree", o(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, kd),
      r("span", {
        title: o(n)("Go up a directory")
      }, [
        z(o(ed), {
          onDragover: k[0] || (k[0] = (y) => _(y)),
          onDragleave: k[1] || (k[1] = (y) => p(y)),
          onDrop: k[2] || (k[2] = (y) => f(y)),
          onClick: h,
          class: le(o(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, xd),
      o(e).fs.loading ? (v(), g("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        z(o(sd), {
          onClick: k[3] || (k[3] = (y) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, $d)) : (v(), g("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        z(o(Jc), { onClick: m })
      ], 8, Sd)),
      ue(r("div", {
        onClick: st($, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        r("div", null, [
          z(o(ld), {
            onDragover: k[4] || (k[4] = (y) => _(y)),
            onDragleave: k[5] || (k[5] = (y) => p(y)),
            onDrop: k[6] || (k[6] = (y) => f(y, -1)),
            onClick: k[7] || (k[7] = (y) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter } }))
          })
        ]),
        r("div", Cd, [
          o(e).fs.hiddenBreadcrumbs.length ? ue((v(), g("div", Ed, [
            k[13] || (k[13] = r("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("div", Ad, [
              r("span", {
                onDragenter: k[8] || (k[8] = (y) => o(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: k[9] || (k[9] = (y) => o(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                z(o(wd), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [D, w]
          ]) : q("", !0)
        ]),
        r("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: st($, ["self"])
        }, [
          (v(!0), g(ge, null, xe(o(e).fs.breadcrumbs, (y, C) => (v(), g("div", { key: C }, [
            k[14] || (k[14] = r("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("span", {
              onDragover: (E) => C === o(e).fs.breadcrumbs.length - 1 || _(E),
              onDragleave: (E) => C === o(e).fs.breadcrumbs.length - 1 || p(E),
              onDrop: (E) => C === o(e).fs.breadcrumbs.length - 1 || f(E, C),
              class: "vuefinder__breadcrumb__item",
              title: y.basename,
              onClick: (E) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter, path: y.path } })
            }, b(y.name), 41, Md)
          ]))), 128))
        ], 512),
        o(e).fs.loading ? (v(), W(o(is), { key: 0 })) : q("", !0)
      ], 512), [
        [Ue, !o(e).fs.searchMode]
      ]),
      ue(r("div", Td, [
        r("div", null, [
          z(o(cd))
        ]),
        ue(r("input", {
          ref_key: "searchInput",
          ref: A,
          onKeydown: kt(L, ["esc"]),
          onBlur: P,
          "onUpdate:modelValue": k[10] || (k[10] = (y) => or(V) ? V.value = y : null),
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
      ue(r("div", Vd, [
        (v(!0), g(ge, null, xe(o(e).fs.hiddenBreadcrumbs, (y, C) => (v(), g("div", {
          key: C,
          onDragover: k[11] || (k[11] = (E) => _(E)),
          onDragleave: k[12] || (k[12] = (E) => p(E)),
          onDrop: (E) => u(E, C),
          onClick: (E) => S(y),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          r("div", Ld, [
            r("span", null, [
              z(o(mn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            k[15] || (k[15] = J()),
            r("span", Fd, b(y.name), 1)
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
    const e = re("ServiceContainer"), { getStore: n } = e.storage, l = T(n("full-screen", !1)), s = T([]), c = (a) => a === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (a) => {
      s.value.splice(a, 1);
    }, d = (a) => {
      let u = s.value.findIndex((f) => f.id === a);
      u !== -1 && i(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (a) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      a.id = u, s.value.push(a), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (a, u) => (v(), g("div", {
      class: le(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      z(rr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Q(() => [
          (v(!0), g(ge, null, xe(s.value, (f, _) => (v(), g("div", {
            key: _,
            onClick: (p) => i(_),
            class: le(["vuefinder__toast__message", c(f.type)])
          }, b(f.label), 11, Rd))), 128))
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
  return v(), g("svg", Id, e[0] || (e[0] = [
    r("path", {
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
  return v(), g("svg", qd, e[0] || (e[0] = [
    r("path", {
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
    return (e, n) => (v(), g("div", null, [
      t.direction === "asc" ? (v(), W(o(Ud), { key: 0 })) : q("", !0),
      t.direction === "desc" ? (v(), W(o(Pd), { key: 1 })) : q("", !0)
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
  return v(), g("svg", jd, e[0] || (e[0] = [
    r("path", {
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
    return (e, n) => (v(), g("span", Wd, [
      t.type === "dir" ? (v(), W(o(mn), {
        key: 0,
        class: le(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (v(), W(o(Kd), {
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
  return v(), g("svg", Yd, e[0] || (e[0] = [
    r("path", {
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
    return (n, l) => (v(), g("div", Zd, [
      z(o(Jd)),
      r("div", Qd, b(e.count), 1)
    ]));
  }
}, tu = { class: "vuefinder__text-preview" }, nu = { class: "vuefinder__text-preview__header" }, su = ["title"], ou = { class: "vuefinder__text-preview__actions" }, ru = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, lu = { key: 1 }, au = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = T(""), s = T(""), c = T(null), i = T(!1), d = T(""), a = T(!1), u = re("ServiceContainer"), { t: f } = u.i18n;
    Se(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((m) => {
        l.value = m, n("success");
      });
    });
    const _ = () => {
      i.value = !i.value, s.value = l.value;
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
      }).then((m) => {
        d.value = f("Updated."), l.value = m, n("success"), i.value = !i.value;
      }).catch((m) => {
        d.value = f(m.message), a.value = !0;
      });
    };
    return (m, h) => (v(), g("div", tu, [
      r("div", nu, [
        r("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(u).modal.data.item.path
        }, b(o(u).modal.data.item.basename), 9, su),
        r("div", ou, [
          i.value ? (v(), g("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, b(o(f)("Save")), 1)) : q("", !0),
          o(u).features.includes(o(de).EDIT) ? (v(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (S) => _())
          }, b(i.value ? o(f)("Cancel") : o(f)("Edit")), 1)) : q("", !0)
        ])
      ]),
      r("div", null, [
        i.value ? (v(), g("div", lu, [
          ue(r("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": h[1] || (h[1] = (S) => s.value = S),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [xt, s.value]
          ])
        ])) : (v(), g("pre", ru, b(l.value), 1)),
        d.value.length ? (v(), W(We, {
          key: 2,
          onHidden: h[2] || (h[2] = (S) => d.value = ""),
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
    const n = e, l = re("ServiceContainer"), { t: s } = l.i18n, c = T(null), i = T(null), d = T(!1), a = T(""), u = T(!1), f = () => {
      d.value = !d.value, d.value ? i.value = new mr(c.value, {
        crop(p) {
        }
      }) : i.value.destroy();
    }, _ = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          a.value = "", u.value = !1;
          const m = new FormData();
          m.set("file", p), l.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: l.modal.data.adapter,
              path: l.modal.data.item.path
            },
            body: m
          }).then((h) => {
            a.value = s("Updated."), c.value.src = l.requester.getPreviewUrl(l.modal.data.adapter, l.modal.data.item), f(), n("success");
          }).catch((h) => {
            a.value = s(h.message), u.value = !0;
          });
        }
      );
    };
    return Se(() => {
      n("success");
    }), (p, m) => (v(), g("div", iu, [
      r("div", cu, [
        r("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(l).modal.data.item.path
        }, b(o(l).modal.data.item.basename), 9, du),
        r("div", uu, [
          d.value ? (v(), g("button", {
            key: 0,
            onClick: _,
            class: "vuefinder__image-preview__crop-button"
          }, b(o(s)("Crop")), 1)) : q("", !0),
          o(l).features.includes(o(de).EDIT) ? (v(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: m[0] || (m[0] = (h) => f())
          }, b(d.value ? o(s)("Cancel") : o(s)("Edit")), 1)) : q("", !0)
        ])
      ]),
      r("div", vu, [
        r("img", {
          ref_key: "image",
          ref: c,
          class: "vuefinder__image-preview__image",
          src: o(l).requester.getPreviewUrl(o(l).modal.data.adapter, o(l).modal.data.item),
          alt: ""
        }, null, 8, _u)
      ]),
      a.value.length ? (v(), W(We, {
        key: 0,
        onHidden: m[1] || (m[1] = (h) => a.value = ""),
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
    const n = re("ServiceContainer"), l = e;
    return Se(() => {
      l("success");
    }), (s, c) => (v(), g("div", mu, [
      r("div", pu, [
        r("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: o(n).modal.data.item.path
        }, b(o(n).modal.data.item.basename), 9, hu)
      ]),
      c[0] || (c[0] = r("div", null, null, -1))
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
    const n = re("ServiceContainer"), l = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Se(() => {
      l("success");
    }), (c, i) => (v(), g("div", bu, [
      r("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, wu),
      r("div", null, [
        r("video", yu, [
          r("source", {
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
    const n = e, l = re("ServiceContainer"), s = () => l.requester.getPreviewUrl(l.modal.data.adapter, l.modal.data.item);
    return Se(() => {
      n("success");
    }), (c, i) => (v(), g("div", Su, [
      r("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(l).modal.data.item.path
      }, b(o(l).modal.data.item.basename), 9, $u),
      r("div", null, [
        r("audio", Cu, [
          r("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Eu),
          i[0] || (i[0] = J(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, Mu = { class: "vuefinder__pdf-preview" }, Tu = ["title"], Du = ["data"], Vu = ["src"], Ou = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), l = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Se(() => {
      l("success");
    }), (c, i) => (v(), g("div", Mu, [
      r("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, Tu),
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
          }, i[0] || (i[0] = [
            r("p", null, [
              J(" Your browser does not support PDFs. "),
              r("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
              J(". ")
            ], -1)
          ]), 8, Vu)
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
    const e = re("ServiceContainer"), { t: n } = e.i18n, l = T(!1), s = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(de.PREVIEW);
    return c || (l.value = !0), (i, d) => (v(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: d[6] || (d[6] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(de).DOWNLOAD) ? (v(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, b(o(n)("Download")), 9, qu)) : q("", !0)
      ]),
      default: Q(() => [
        r("div", null, [
          r("div", Lu, [
            o(c) ? (v(), g("div", Fu, [
              s("text") ? (v(), W(au, {
                key: 0,
                onSuccess: d[0] || (d[0] = (a) => l.value = !0)
              })) : s("image") ? (v(), W(fu, {
                key: 1,
                onSuccess: d[1] || (d[1] = (a) => l.value = !0)
              })) : s("video") ? (v(), W(xu, {
                key: 2,
                onSuccess: d[2] || (d[2] = (a) => l.value = !0)
              })) : s("audio") ? (v(), W(Au, {
                key: 3,
                onSuccess: d[3] || (d[3] = (a) => l.value = !0)
              })) : s("application/pdf") ? (v(), W(Ou, {
                key: 4,
                onSuccess: d[4] || (d[4] = (a) => l.value = !0)
              })) : (v(), W(gu, {
                key: 5,
                onSuccess: d[5] || (d[5] = (a) => l.value = !0)
              }))
            ])) : q("", !0),
            r("div", Hu, [
              l.value === !1 ? (v(), g("div", Ru, [
                d[7] || (d[7] = r("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  r("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  r("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                r("span", null, b(o(n)("Loading")), 1)
              ])) : q("", !0)
            ])
          ])
        ]),
        r("div", Bu, [
          r("div", null, [
            r("span", Iu, b(o(n)("File Size")) + ": ", 1),
            J(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          r("div", null, [
            r("span", Nu, b(o(n)("Last Modified")) + ": ", 1),
            J(" " + b(o(No)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(de).DOWNLOAD) ? (v(), g("div", Uu, [
          r("span", null, b(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
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
  return v(), g("svg", zu, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
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
    const e = re("ServiceContainer"), n = e.dragSelect, l = t, s = (m) => {
      m.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: m.path } })) : e.modal.open(Uo, { adapter: e.fs.adapter, item: m });
    }, c = {
      mounted(m, h, S, w) {
        S.props.draggable && (m.addEventListener("dragstart", (D) => i(D, h.value)), m.addEventListener("dragover", (D) => a(D, h.value)), m.addEventListener("drop", (D) => d(D, h.value)));
      },
      beforeUnmount(m, h, S, w) {
        S.props.draggable && (m.removeEventListener("dragstart", i), m.removeEventListener("dragover", a), m.removeEventListener("drop", d));
      }
    }, i = (m, h) => {
      if (m.altKey || m.ctrlKey || m.metaKey)
        return m.preventDefault(), !1;
      n.isDraggingRef.value = !0, m.dataTransfer.setDragImage(l.dragImage.$el, 0, 15), m.dataTransfer.effectAllowed = "all", m.dataTransfer.dropEffect = "copy", m.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (m, h) => {
      m.preventDefault(), n.isDraggingRef.value = !1;
      let S = JSON.parse(m.dataTransfer.getData("items"));
      if (S.find((w) => w.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, { items: { from: S, to: h } });
    }, a = (m, h) => {
      m.preventDefault(), !h || h.type !== "dir" || n.getSelection().find((S) => S === m.currentTarget) ? (m.dataTransfer.dropEffect = "none", m.dataTransfer.effectAllowed = "none") : m.dataTransfer.dropEffect = "copy";
    };
    let u = null, f = !1;
    const _ = () => {
      u && clearTimeout(u);
    }, p = (m) => {
      if (!f)
        f = !0, setTimeout(() => f = !1, 300);
      else
        return f = !1, s(l.item), clearTimeout(u), !1;
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
    return (m, h) => ue((v(), g("div", {
      style: rn({ opacity: o(n).isDraggingRef.value && o(n).getSelection().find((S) => m.$el === S) ? "0.5 !important" : "" }),
      class: le(["vuefinder__item", "vf-item-" + o(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: h[0] || (h[0] = (S) => s(t.item)),
      onTouchstart: h[1] || (h[1] = (S) => p(S)),
      onTouchend: h[2] || (h[2] = (S) => _()),
      onContextmenu: h[3] || (h[3] = st((S) => o(e).emitter.emit("vf-contextmenu-show", { event: S, items: o(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Mt(m.$slots, "default"),
      o(e).pinnedFolders.find((S) => S.path === t.item.path) ? (v(), W(o(qo), {
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
}, Wu = { class: "vuefinder__explorer__drag-item" }, Yu = { class: "vuefinder__explorer__item-list-content" }, Xu = { class: "vuefinder__explorer__item-list-name" }, Ju = { class: "vuefinder__explorer__item-name" }, Zu = { class: "vuefinder__explorer__item-path" }, Qu = { class: "vuefinder__explorer__item-list-content" }, ev = { class: "vuefinder__explorer__item-list-name" }, tv = { class: "vuefinder__explorer__item-name" }, nv = { class: "vuefinder__explorer__item-size" }, sv = { class: "vuefinder__explorer__item-date" }, ov = { class: "vuefinder__explorer__item-grid-content" }, rv = ["data-src", "alt"], lv = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, av = { class: "vuefinder__explorer__item-title break-all" }, iv = {
  __name: "Explorer",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, l = (_) => _ == null ? void 0 : _.substring(0, 3), s = T(null), c = T(""), i = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      i.area.value.style.height = null;
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
    const a = yt({ active: !1, column: "", order: "" }), u = (_ = !0) => {
      let p = [...e.fs.data.files], m = a.column, h = a.order === "asc" ? 1 : -1;
      if (!_)
        return p;
      const S = (w, D) => typeof w == "string" && typeof D == "string" ? w.toLowerCase().localeCompare(D.toLowerCase()) : w < D ? -1 : w > D ? 1 : 0;
      return a.active && (p = p.slice().sort((w, D) => S(w[m], D[m]) * h)), p;
    }, f = (_) => {
      a.active && a.column === _ ? (a.active = a.order === "asc", a.column = _, a.order = "desc") : (a.active = !0, a.column = _, a.order = "asc");
    };
    return Se(() => {
      d = new fr(i.area.value);
    }), Ls(() => {
      d.update();
    }), Hs(() => {
      d.destroy();
    }), (_, p) => (v(), g("div", Gu, [
      o(e).view === "list" || c.value.length ? (v(), g("div", Ku, [
        r("div", {
          onClick: p[0] || (p[0] = (m) => f("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          J(b(o(n)("Name")) + " ", 1),
          ue(z(Gt, {
            direction: a.order
          }, null, 8, ["direction"]), [
            [Ue, a.active && a.column === "basename"]
          ])
        ]),
        c.value.length ? q("", !0) : (v(), g("div", {
          key: 0,
          onClick: p[1] || (p[1] = (m) => f("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          J(b(o(n)("Size")) + " ", 1),
          ue(z(Gt, {
            direction: a.order
          }, null, 8, ["direction"]), [
            [Ue, a.active && a.column === "file_size"]
          ])
        ])),
        c.value.length ? q("", !0) : (v(), g("div", {
          key: 1,
          onClick: p[2] || (p[2] = (m) => f("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          J(b(o(n)("Date")) + " ", 1),
          ue(z(Gt, {
            direction: a.order
          }, null, 8, ["direction"]), [
            [Ue, a.active && a.column === "last_modified"]
          ])
        ])),
        c.value.length ? (v(), g("div", {
          key: 2,
          onClick: p[3] || (p[3] = (m) => f("path")),
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
      r("div", Wu, [
        z(eu, {
          ref_key: "dragImage",
          ref: s,
          count: o(i).getCount()
        }, null, 8, ["count"])
      ]),
      r("div", {
        ref: o(i).scrollBarContainer,
        class: le(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": o(e).view === "grid" }, { "search-active": c.value.length }]])
      }, [
        r("div", {
          ref: o(i).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      r("div", {
        ref: o(i).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area",
        onContextmenu: p[4] || (p[4] = st((m) => o(e).emitter.emit("vf-contextmenu-show", { event: m, items: o(i).getSelected() }), ["self", "prevent"]))
      }, [
        c.value.length ? (v(!0), g(ge, { key: 0 }, xe(u(), (m, h) => (v(), W(Cn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: Q(() => [
            r("div", Yu, [
              r("div", Xu, [
                z($n, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", Ju, b(m.basename), 1)
              ]),
              r("div", Zu, b(m.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0),
        o(e).view === "list" && !c.value.length ? (v(!0), g(ge, { key: 1 }, xe(u(), (m, h) => (v(), W(Cn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: m.path
        }, {
          default: Q(() => [
            r("div", Qu, [
              r("div", ev, [
                z($n, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", tv, b(m.basename), 1)
              ]),
              r("div", nv, b(m.file_size ? o(e).filesize(m.file_size) : ""), 1),
              r("div", sv, b(o(No)(m.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : q("", !0),
        o(e).view === "grid" && !c.value.length ? (v(!0), g(ge, { key: 2 }, xe(u(!1), (m, h) => (v(), W(Cn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: Q(() => [
            r("div", null, [
              r("div", ov, [
                (m.mime_type ?? "").startsWith("image") && o(e).showThumbnails ? (v(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": o(e).requester.getPreviewUrl(o(e).fs.adapter, m),
                  alt: m.basename,
                  key: m.path
                }, null, 8, rv)) : (v(), W($n, {
                  key: 1,
                  type: m.type
                }, null, 8, ["type"])),
                !((m.mime_type ?? "").startsWith("image") && o(e).showThumbnails) && m.type !== "dir" ? (v(), g("div", lv, b(l(m.extension)), 1)) : q("", !0)
              ]),
              r("span", av, b(o(zn)(m.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0)
      ], 544),
      z(Bd)
    ]));
  }
}, cv = ["href", "download"], dv = ["onClick"], uv = {
  __name: "ContextMenu",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, l = T(null), s = T([]), c = T(""), i = yt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = rt(() => i.items.filter((_) => _.key == null || e.features.includes(_.key)));
    e.emitter.on("vf-context-selected", (_) => {
      s.value = _;
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
          e.pinnedFolders = e.pinnedFolders.filter((_) => !s.value.find((p) => p.path === _.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
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
    }, u = (_) => {
      e.emitter.emit("vf-contextmenu-hide"), _.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      c.value = _;
    }), e.emitter.on("vf-contextmenu-show", ({ event: _, items: p, target: m = null }) => {
      if (i.items = [], c.value)
        if (m)
          i.items.push(a.openDir), e.emitter.emit("vf-context-selected", [m]);
        else
          return;
      else !m && !c.value ? (i.items.push(a.refresh), i.items.push(a.selectAll), i.items.push(a.newfolder), e.emitter.emit("vf-context-selected", [])) : p.length > 1 && p.some((h) => h.path === m.path) ? (i.items.push(a.refresh), i.items.push(a.archive), i.items.push(a.delete), e.emitter.emit("vf-context-selected", p)) : (m.type === "dir" ? (i.items.push(a.open), e.pinnedFolders.findIndex((h) => h.path === m.path) !== -1 ? i.items.push(a.unpinFolder) : i.items.push(a.pinFolder)) : (i.items.push(a.preview), i.items.push(a.download)), i.items.push(a.rename), m.mime_type === "application/zip" ? i.items.push(a.unarchive) : i.items.push(a.archive), i.items.push(a.delete), e.emitter.emit("vf-context-selected", [m]));
      f(_);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const f = (_) => {
      const p = e.dragSelect.area.value, m = e.root.getBoundingClientRect(), h = p.getBoundingClientRect();
      let S = _.clientX - m.left, w = _.clientY - m.top;
      i.active = !0, ct(() => {
        var $;
        const D = ($ = l.value) == null ? void 0 : $.getBoundingClientRect();
        let R = (D == null ? void 0 : D.height) ?? 0, A = (D == null ? void 0 : D.width) ?? 0;
        S = h.right - _.pageX + window.scrollX < A ? S - A : S, w = h.bottom - _.pageY + window.scrollY < R ? w - R : w, i.positions = {
          left: S + "px",
          top: w + "px"
        };
      });
    };
    return (_, p) => ue((v(), g("ul", {
      ref_key: "contextmenu",
      ref: l,
      style: rn(i.positions),
      class: "vuefinder__context-menu"
    }, [
      (v(!0), g(ge, null, xe(d.value, (m) => (v(), g("li", {
        class: "vuefinder__context-menu__item",
        key: m.title
      }, [
        m.link ? (v(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: m.link,
          download: m.link,
          onClick: p[0] || (p[0] = (h) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          r("span", null, b(m.title()), 1)
        ], 8, cv)) : (v(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => u(m)
        }, [
          r("span", null, b(m.title()), 1)
        ], 8, dv))
      ]))), 128))
    ], 4)), [
      [Ue, i.active]
    ]);
  }
}, vv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function _v(t, e) {
  return v(), g("svg", vv, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const zo = { render: _v }, fv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function mv(t, e) {
  return v(), g("svg", fv, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ]));
}
const pv = { render: mv }, hv = { class: "vuefinder__status-bar__wrapper" }, gv = { class: "vuefinder__status-bar__storage" }, bv = ["title"], wv = { class: "vuefinder__status-bar__storage-icon" }, yv = ["value"], kv = { class: "vuefinder__status-bar__info" }, xv = { key: 0 }, Sv = { class: "vuefinder__status-bar__selected-count" }, $v = { class: "vuefinder__status-bar__actions" }, Cv = ["disabled"], Ev = ["title"], Av = {
  __name: "Statusbar",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { setStore: l } = e.storage, s = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), l("adapter", e.fs.adapter);
    }, i = T("");
    e.emitter.on("vf-search-query", ({ newQuery: a }) => {
      i.value = a;
    });
    const d = rt(() => {
      const a = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && a;
    });
    return (a, u) => (v(), g("div", hv, [
      r("div", gv, [
        r("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          r("div", wv, [
            z(o(zo))
          ]),
          ue(r("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (f) => o(e).fs.adapter = f),
            onChange: c,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (v(!0), g(ge, null, xe(o(e).fs.data.storages, (f) => (v(), g("option", { value: f }, b(f), 9, yv))), 256))
          ], 544), [
            [En, o(e).fs.adapter]
          ])
        ], 8, bv),
        r("div", kv, [
          i.value.length ? (v(), g("span", xv, b(o(e).fs.data.files.length) + " items found. ", 1)) : q("", !0),
          r("span", Sv, b(o(e).dragSelect.getCount() > 0 ? o(n)("%s item(s) selected.", o(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      r("div", $v, [
        o(e).selectButton.active ? (v(), g("button", {
          key: 0,
          class: le(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (f) => o(e).selectButton.click(o(s).getSelected(), f))
        }, b(o(n)("Select")), 11, Cv)) : q("", !0),
        r("span", {
          class: "vuefinder__status-bar__about",
          title: o(n)("About"),
          onClick: u[2] || (u[2] = (f) => o(e).modal.open(Mo))
        }, [
          z(o(pv))
        ], 8, Ev)
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
function Tv(t, e) {
  return v(), g("svg", Mv, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Po = { render: Tv }, Dv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Vv(t, e) {
  return v(), g("svg", Dv, e[0] || (e[0] = [
    r("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const Ov = { render: Vv }, Lv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Fv(t, e) {
  return v(), g("svg", Lv, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const jo = { render: Fv }, Hv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Rv(t, e) {
  return v(), g("svg", Hv, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const Go = { render: Rv };
function Ko(t, e) {
  const n = t.findIndex((l) => l.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Bv = { class: "vuefinder__folder-loader-indicator" }, Iv = {
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
    const l = Rs(t, "modelValue"), s = T(!1);
    He(
      () => l.value,
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
      return v(), g("div", Bv, [
        s.value ? (v(), W(o(is), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (v(), g("div", Iv, [
          l.value && ((u = c()) != null && u.folders.length) ? (v(), W(o(Go), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : q("", !0),
          l.value ? q("", !0) : (v(), W(o(jo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Nv = { class: "vuefinder__treesubfolderlist__item-content" }, Uv = ["onClick"], qv = ["title", "onClick"], zv = { class: "vuefinder__treesubfolderlist__item-icon" }, Pv = { class: "vuefinder__treesubfolderlist__subfolder" }, jv = {
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
    const e = re("ServiceContainer"), n = T([]), l = t, s = T(null);
    Se(() => {
      l.path === l.adapter + "://" && je(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = rt(() => {
      var i;
      return ((i = e.treeViewData.find((d) => d.path === l.path)) == null ? void 0 : i.folders) || [];
    });
    return (i, d) => {
      const a = ar("TreeSubfolderList", !0);
      return v(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (v(!0), g(ge, null, xe(c.value, (u, f) => (v(), g("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          r("div", Nv, [
            r("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (_) => n.value[u.path] = !n.value[u.path]
            }, [
              z(Wo, {
                adapter: t.adapter,
                path: u.path,
                modelValue: n.value[u.path],
                "onUpdate:modelValue": (_) => n.value[u.path] = _
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Uv),
            r("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (_) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l.adapter, path: u.path } })
            }, [
              r("div", zv, [
                o(e).fs.path === u.path ? (v(), W(o(Po), { key: 0 })) : (v(), W(o(mn), { key: 1 }))
              ]),
              r("div", {
                class: le(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(e).fs.path === u.path
                }])
              }, b(u.basename), 3)
            ], 8, qv)
          ]),
          r("div", Pv, [
            ue(z(a, {
              adapter: l.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [Ue, n.value[u.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, Gv = { class: "vuefinder__treestorageitem__loader" }, Kv = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = T(!1);
    return (l, s) => (v(), g(ge, null, [
      r("div", {
        onClick: s[1] || (s[1] = (c) => n.value = !n.value),
        class: "vuefinder__treestorageitem__header"
      }, [
        r("div", {
          class: le(["vuefinder__treestorageitem__info", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          r("div", {
            class: le(["vuefinder__treestorageitem__icon", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            z(o(zo))
          ], 2),
          r("div", null, b(t.storage), 1)
        ], 2),
        r("div", Gv, [
          z(Wo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: n.value,
            "onUpdate:modelValue": s[0] || (s[0] = (c) => n.value = c)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ue(z(jv, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [Ue, n.value]
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
    return (n, l) => (v(), g("div", Wv, [
      r("div", Yv, [
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
}, Jv = { class: "vuefinder__treeview__header" }, Zv = { class: "vuefinder__treeview__pinned-label" }, Qv = { class: "vuefinder__treeview__pin-text text-nowrap" }, e_ = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, t_ = { class: "vuefinder__treeview__pinned-item" }, n_ = ["onClick"], s_ = ["title"], o_ = ["onClick"], r_ = { key: 0 }, l_ = { class: "vuefinder__treeview__no-pinned" }, a_ = { class: "vuefinder__treeview__storage" }, i_ = {
  __name: "TreeView",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { getStore: l, setStore: s } = e.storage, c = T(190), i = T(l("pinned-folders-opened", !0));
    He(i, (f) => s("pinned-folders-opened", f));
    const d = (f) => {
      e.pinnedFolders = e.pinnedFolders.filter((_) => _.path !== f.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, a = (f) => {
      const _ = f.clientX, p = f.target.parentElement, m = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const h = (w) => {
        c.value = m + w.clientX - _, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, S = () => {
        const w = p.getBoundingClientRect();
        c.value = w.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", S);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", S);
    }, u = T(null);
    return Se(() => {
      je(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), He(e.fs.data, (f, _) => {
      const p = f.files.filter((m) => m.type === "dir");
      Ko(e.treeViewData, { path: e.fs.path, folders: p.map((m) => ({
        adapter: m.storage,
        path: m.path,
        basename: m.basename
      })) });
    }), (f, _) => (v(), g(ge, null, [
      r("div", {
        onClick: _[0] || (_[0] = (p) => o(e).showTreeView = !o(e).showTreeView),
        class: le(["vuefinder__treeview__overlay", o(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
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
          r("div", Jv, [
            r("div", {
              onClick: _[2] || (_[2] = (p) => i.value = !i.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              r("div", Zv, [
                z(o(qo), { class: "vuefinder__treeview__pin-icon" }),
                r("div", Qv, b(o(n)("Pinned Folders")), 1)
              ]),
              z(Xv, {
                modelValue: i.value,
                "onUpdate:modelValue": _[1] || (_[1] = (p) => i.value = p)
              }, null, 8, ["modelValue"])
            ]),
            i.value ? (v(), g("ul", e_, [
              (v(!0), g(ge, null, xe(o(e).pinnedFolders, (p) => (v(), g("li", t_, [
                r("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (m) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: p.storage, path: p.path } })
                }, [
                  o(e).fs.path !== p.path ? (v(), W(o(mn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : q("", !0),
                  o(e).fs.path === p.path ? (v(), W(o(Po), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : q("", !0),
                  r("div", {
                    title: p.path,
                    class: le(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": o(e).fs.path === p.path
                    }])
                  }, b(p.basename), 11, s_)
                ], 8, n_),
                r("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (m) => d(p)
                }, [
                  z(o(Ov), { class: "vuefinder__treeview__remove-icon" })
                ], 8, o_)
              ]))), 256)),
              o(e).pinnedFolders.length ? q("", !0) : (v(), g("li", r_, [
                r("div", l_, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : q("", !0)
          ]),
          (v(!0), g(ge, null, xe(o(e).fs.data.storages, (p) => (v(), g("div", a_, [
            z(Kv, { storage: p }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        r("div", {
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
    }
  },
  emits: ["select"],
  setup(t, { emit: e }) {
    const n = e, s = Tl(t, re("VueFinderOptions"));
    ir("ServiceContainer", s);
    const { setStore: c } = s.storage, i = T(null);
    s.root = i;
    const d = s.dragSelect;
    ii(s);
    const a = (f) => {
      Object.assign(s.fs.data, f), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return s.emitter.on("vf-fetch-abort", () => {
      u.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: f, body: _ = null, onSuccess: p = null, onError: m = null, noCloseModal: h = !1 }) => {
      ["index", "search"].includes(f.q) && (u && u.abort(), s.fs.loading = !0), u = new AbortController();
      const S = u.signal;
      s.requester.send({
        url: "",
        method: f.m || "get",
        params: f,
        body: _,
        abortSignal: S
      }).then((w) => {
        s.fs.adapter = w.adapter, s.persist && (s.fs.path = w.dirname, c("path", s.fs.path)), ["index", "search"].includes(f.q) && (s.fs.loading = !1), h || s.modal.close(), a(w), p && p(w);
      }).catch((w) => {
        console.error(w), m && m(w);
      });
    }), Se(() => {
      let f = {};
      s.fs.path.includes("://") && (f = {
        adapter: s.fs.path.split("://")[0],
        path: s.fs.path
      }), s.emitter.emit("vf-fetch", { params: { q: "index", adapter: s.fs.adapter, ...f } }), d.onSelect((_) => {
        n("select", _);
      });
    }), (f, _) => (v(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i,
      tabindex: "0"
    }, [
      r("div", {
        class: le(o(s).theme.actualValue)
      }, [
        r("div", {
          class: le([o(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: rn(o(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: _[0] || (_[0] = (p) => o(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: _[1] || (_[1] = (p) => o(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          z(Oc),
          z(Hd),
          r("div", c_, [
            z(i_),
            z(iv)
          ]),
          z(Av)
        ], 38),
        z(cr, { name: "fade" }, {
          default: Q(() => [
            o(s).modal.visible ? (v(), W(Fs(o(s).modal.type), { key: 0 })) : q("", !0)
          ]),
          _: 1
        }),
        z(uv)
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
